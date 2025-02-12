import { StyledTableCell, StyledTableRow } from '@/components/iframe/PageWord/style';
import CustomTextField from '@/components/ui/CustomTextField';
import ScoreInput from '@/components/ui/ScoreInput';
import SekeletonUI from '@/components/ui/Sekeleton';
import useComment from '@/hooks/api/useQueryComment';
import useMemberGroupStudent from '@/hooks/api/useQueryMemberGroupStudent';
import { useTerm } from '@/hooks/api/useQueryTerm';
import useTranscript from '@/hooks/api/useQueryTranscript';
import { BodyEvaluation } from '@/services/apiTranscipts';
import { EnumStatusStudent } from '@/types/enum';
import { getStatusGroup } from '@/utils/validations/groupStudent.validation';
import { Box, Button, Link, Paper, TableBody, TableHead, Typography } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';

export type MemberScore = {
  studentId: string;
  transcriptId?: string;
  username?: string;
  score: string;
};

export type TranscriptWithEvaluation = {
  evaluationId?: string;
  evaluationName?: string;
  evaluationKey?: string;
  scoreMax?: number;
  score?: number;
  students?: MemberScore[];
};

export type InitTranscriptType = {
  transcripts: TranscriptWithEvaluation[];
  total: number;
  isExistTranscripts: boolean;
};

//[Helper score]
const convertSCore = (score: string) => {
  return score == '' ? 0 : parseInt(score);
};

export const handleTotalScores = (transcripts: TranscriptWithEvaluation[]) => {
  let totalScores: { [key: string]: number }[] = [];
  transcripts.map((transcript: TranscriptWithEvaluation) => {
    transcript['students']?.map((member: { studentId: string; score: string }) => {
      if (!totalScores[`${member?.studentId}`])
        totalScores[`${member?.studentId}`] = convertSCore(member.score);
      else totalScores[`${member?.studentId}`] += convertSCore(member.score);
    });
  });

  return totalScores;
};

const NO_SCORE_STATUS_LIST = [
  EnumStatusStudent.FAIL_ADVISOR,
  EnumStatusStudent.FAIL_REVIEWER,
  EnumStatusStudent.FAIL_REPORT,
];

//[Helper merge groupstudent and evaluation ]
export var convertEvaluations = (evaluations: any, groupStudent: any) => {
  let transcripts: TranscriptWithEvaluation[] = [];
  if (evaluations) {
    evaluations.map((evl: any) => {
      transcripts.push({
        evaluationId: evl.id,
        evaluationName: evl.name,
        evaluationKey: evl.key,
        scoreMax: evl.scoreMax,
        students: groupStudent?.map((mem: any) => ({ studentId: mem.student.id, score: '' })),
      });
    });
  }
  return transcripts;
};

//[Helper convert data to request ]
export const convertDataRequest = (
  data: TranscriptWithEvaluation[],
  termId: string,
): BodyEvaluation[] => {
  const convertedScores: BodyEvaluation[] = [];
  data.map((evaluation: TranscriptWithEvaluation) => {
    evaluation?.students?.map((member: MemberScore) => {
      convertedScores.push({
        score: parseInt(member.score) || 0,
        evaluationId: evaluation.evaluationId,
        studentId: member.studentId,
        termId: termId,
      });
    });
  });

  return convertedScores;
};

function TranscriptOfGroupStudent(props: any) {
  const { evaluations, groupStudent, transcriptType } = props;
  const { termStore } = useTerm();

  //[Create constructor of initTranscripts]
  const [initTranscripts, setInitTranscripts] = useState<InitTranscriptType>({
    transcripts: [],
    total: 0,
    isExistTranscripts: false,
  });

  //[Get member of group student need score]
  const { handleGetMemberInGroupStudent } = useMemberGroupStudent();
  const {
    data: memberFetch,
    isFetching: fetchingMembers,
    isSuccess: successMember,
    refetch: refetchMembers,
  } = handleGetMemberInGroupStudent(groupStudent.id);

  //[Handler update/ create transcript of group student]
  const { onCreateTranscripts, onUpdateTranscripts, handleGetTranscriptOfStudentInGroup } =
    useTranscript();
  const { mutate: createTranscripts, isSuccess: successCreate } = onCreateTranscripts(
    groupStudent.id,
  );
  const { mutate: updateTranscripts, isSuccess: successUpdate } = onUpdateTranscripts();

  //[Get transcript of group in database]
  const {
    data: transcriptFetch,
    isSuccess: successTranscript,
    isLoading: loadingTranscript,
    isFetching: fetchingTranscript,
    refetch: refetchTranscript,
  } = handleGetTranscriptOfStudentInGroup(transcriptType, groupStudent.id);

  //[Set initTranscripts when fetching success]
  useEffect(() => {
    setScoreStudent([]);
    if (successTranscript && successMember) {
      setInitTranscripts((pre) => ({
        ...pre,
        isExistTranscripts: transcriptFetch.transcripts.length > 0,
        transcripts:
          transcriptFetch.transcripts.length > 0
            ? transcriptFetch.transcripts.sort(
                (a, b) =>
                  parseInt(a.evaluationKey.split('LO')[1]) -
                  parseInt(b.evaluationKey.split('LO')[1]),
              )
            : convertEvaluations(evaluations, memberFetch?.members).sort(
                (a, b) =>
                  parseInt(a.evaluationKey.split('LO')[1]) -
                  parseInt(b.evaluationKey.split('LO')[1]),
              ),
      }));
      setScoreStudent(handleTotalScores(transcriptFetch?.transcripts));
    }
  }, [fetchingTranscript, fetchingMembers, groupStudent.id]);

  //[Toggle total score of students to update]
  //create
  const [scoreStudent, setScoreStudent] = useState<any[]>([]);

  //[Handle Event onChange of score input]
  const handleChangeScore = (studentId: string, score: string, evaluationId: string) => {
    const updateTranscript: TranscriptWithEvaluation[] = initTranscripts.transcripts.map((e) => {
      if (e.evaluationId === evaluationId) {
        return {
          ...e,
          students: e?.students?.map((member) =>
            member.studentId === studentId ? { ...member, score: score } : member,
          ),
        };
      }
      return e;
    });
    setInitTranscripts((pre: any) => ({ ...pre, transcripts: updateTranscript }));
    setScoreStudent(handleTotalScores(updateTranscript));
  };
  //[Saved Create or Update ]
  const handleSubmit = () => {
    let data = convertDataRequest(initTranscripts.transcripts, termStore.currentTerm.id);
    !initTranscripts.isExistTranscripts ? createTranscripts(data) : updateTranscripts(data);
  };
  useEffect(() => {
    if (successCreate || successUpdate) {
      refetchTranscript();
    }
  }, [successCreate, successUpdate]);

  const [comment, setComment] = useState<string>('Chưa có nhận xét');
  const [commentId, setCommentId] = useState<string>(null);
  const { onCreateComment, onUpdateComment, handleGetComment } = useComment();
  const { mutate: handleCreateComment, isSuccess: successCreateComment } = onCreateComment();
  const { mutate: handleUpdateComment, isSuccess: successUpdatecomment } = onUpdateComment();
  const { data: fetchComment, isSuccess: successFetchComment } = handleGetComment(
    transcriptType,
    groupStudent.id,
  );

  useEffect(() => {
    if (fetchComment) {
      setComment(
        `${fetchComment?.comment?.content ? fetchComment?.comment?.content : 'Chưa có nhận xét'}`,
      );
      setCommentId(`${fetchComment?.comment?.id}`);
    }
  }, [fetchingTranscript, fetchComment, fetchingMembers, groupStudent.id]);
  return (
    <>
      {loadingTranscript || fetchingTranscript ? (
        <SekeletonUI />
      ) : (
        <Paper
          elevation={0}
          sx={{
            mt: 10,
          }}
        >
          <Box mx={6}>
            <Typography fontWeight={600} mb={4} variant='h3'>
              Đề tài {groupStudent?.topicName}{' '}
              <>
                {groupStudent?.link ? (
                  <Link
                    href={`${groupStudent?.link}`}
                    sx={{ fontStyle: 'italic', fontWeight: 400, cursor: 'pointer' }}
                    mx={2}
                    target='_blank'
                  >
                    Xem tài liệu{' '}
                  </Link>
                ) : (
                  <Typography mx={2} component={'span'} variant='body1' color='initial'>
                    (Chưa nộp tài liệu)
                  </Typography>
                )}
              </>
              <Typography fontWeight={400} variant='body2' color='grey.700'>
                Trạng thái:{' '}
                <Typography
                  variant='body2'
                  width={120}
                  component={'span'}
                  textAlign={'center'}
                  marginRight={4}
                  sx={{ borderRadius: 4 }}
                  color={initTranscripts.isExistTranscripts ? 'success.main' : 'error.dark'}
                >
                  {initTranscripts.isExistTranscripts ? 'Đã chấm' : 'Chưa chấm'}
                </Typography>
              </Typography>
            </Typography>

            <Box>
              <Box component={'section'}>
                {/****
                 * HEADER TRANSCRIPT
                 */}
                <TableHead sx={{ bgcolor: '#132e65' }}>
                  <StyledTableRow>
                    <StyledTableCell sx={{ color: 'grey.300', width: '3%', fontSize: 14 }}>
                      CLO{' '}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: 'grey.300', width: '40%', fontSize: 14 }}
                      align='center'
                    >
                      Contents
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: 'grey.300', width: '14%', fontSize: 14 }}
                      align='center'
                    >
                      Max score
                    </StyledTableCell>
                    {!initTranscripts.isExistTranscripts
                      ? memberFetch?.members?.map((st: any) => (
                          <StyledTableCell
                            sx={{ color: 'grey.300', width: '20%', fontSize: 14 }}
                            align='center'
                          >
                            {st.student.fullName}
                            <Typography variant='body1' color='error.main'>
                              {NO_SCORE_STATUS_LIST.some((stt) => stt === st?.status)
                                ? getStatusGroup(st?.status)
                                : ''}
                            </Typography>
                          </StyledTableCell>
                        ))
                      : initTranscripts?.transcripts[0]?.students?.map((st: any) => (
                          <StyledTableCell
                            sx={{ color: 'grey.300', width: '20%', fontSize: 14 }}
                            align='center'
                          >
                            {st.fullName}
                          </StyledTableCell>
                        ))}
                  </StyledTableRow>
                </TableHead>
                {/****
                 * UPDATE TRANSCRIPT OF STUDENTS
                 */}
                {initTranscripts.isExistTranscripts === true ? (
                  <TableBody>
                    {initTranscripts?.transcripts.map((row: any, index: number) => (
                      <>
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell align='center'>{row.evaluationKey}</StyledTableCell>
                          <StyledTableCell component='th' sx={{ fontSize: 14 }} scope='row'>
                            {row.evaluationName}
                          </StyledTableCell>
                          <StyledTableCell align='center' sx={{ fontSize: 14 }}>
                            {row.scoreMax}
                          </StyledTableCell>
                          {row?.students.map((st: any) => (
                            <StyledTableCell sx={{ p: 0 }} align='center'>
                              <ScoreInput
                                handleChangeScore={handleChangeScore}
                                evaluationId={row.evaluationId}
                                studentId={st.studentId}
                                oldScore={st.score}
                                scoreMax={row.scoreMax}
                              />
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      </>
                    ))}
                    <StyledTableRow>
                      <StyledTableCell align='center'></StyledTableCell>{' '}
                      <StyledTableCell align='center' sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        Total
                      </StyledTableCell>{' '}
                      <StyledTableCell align='center' sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        100
                      </StyledTableCell>{' '}
                      {initTranscripts.transcripts[0]?.students?.map((st: any) => (
                        <StyledTableCell align='center' sx={{ fontSize: 14 }}>
                          <Typography variant='h6' fontWeight={'600'} color='error.dark'>
                            {scoreStudent[`${st.studentId}`]}
                          </Typography>
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {/****
                     * CREATE TRANSCRIPT OF STUDENTS
                     */}
                    {initTranscripts.transcripts.map((row: any, index: number) => (
                      <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <StyledTableCell align='center'>{row.evaluationKey}</StyledTableCell>
                        <StyledTableCell component='th' sx={{ fontSize: 14 }} scope='row'>
                          {row.evaluationName}
                        </StyledTableCell>
                        <StyledTableCell align='center' sx={{ fontSize: 14 }}>
                          {row.scoreMax}
                        </StyledTableCell>
                        {memberFetch?.members?.map((st: any) => (
                          <StyledTableCell sx={{ p: 0 }} align='center'>
                            <ScoreInput
                              handleChangeScore={handleChangeScore}
                              evaluationId={row.evaluationId}
                              studentId={st.student.id}
                              oldScore={0}
                              scoreMax={row.scoreMax}
                            />
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
                    <StyledTableRow>
                      <StyledTableCell align='center'></StyledTableCell>{' '}
                      <StyledTableCell align='center' sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        Total
                      </StyledTableCell>{' '}
                      <StyledTableCell align='center' sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        100
                      </StyledTableCell>{' '}
                      {/**
                       * Total score
                       */}
                      {successMember &&
                        memberFetch.members.map((st: any) => (
                          <StyledTableCell align='center' sx={{ fontSize: 14 }}>
                            <Typography variant='h6' fontWeight={'600'} color='error.dark'>
                              {scoreStudent[`${st.student.id}`]}
                            </Typography>
                          </StyledTableCell>
                        ))}
                    </StyledTableRow>
                  </TableBody>
                )}
                <Box mt={4} justifyContent={'end'} alignItems={'center'} display={'flex'}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mr: 10 }}>
                    <CustomTextField
                      placeholder='Chưa có nhận xét'
                      sx={{ width: 500, mt: 8 }}
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                    <Button
                      onClick={() =>
                        !fetchComment?.comment?.id
                          ? handleCreateComment({
                              type: transcriptType,
                              groupStudentId: groupStudent?.id,
                              content: comment,
                            })
                          : handleUpdateComment({
                              id: commentId,
                              content: comment,
                            })
                      }
                      color='error'
                      variant='contained'
                    >
                      Nhận xét
                    </Button>
                  </Box>
                  <Button
                    onClick={handleSubmit}
                    color={initTranscripts.isExistTranscripts ? 'warning' : 'primary'}
                    type='submit'
                    variant='contained'
                  >
                    {initTranscripts.isExistTranscripts ? 'Cập nhật điểm' : 'Chấm điểm'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default TranscriptOfGroupStudent;
