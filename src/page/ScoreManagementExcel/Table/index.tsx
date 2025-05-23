import {
  checkTypeEvaluation,
  checkVietNamTypeEvaluation,
} from '@/utils/validations/transcript.validation';
import {
  Box,
  Button,
  CircularProgress,
  Link,
  TableBody,
  TableHead,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useTranscript from '@/hooks/api/useQueryTranscript';
import { StyledTableCell, StyledTableRow } from '@/components/iframe/PageWord/style';
import ScoreInput from '@/components/ui/ScoreInput';
import { Icon } from '@iconify/react';
import { EnumStatusStudent } from '@/types/enum';
import { useTerm } from '@/hooks/api/useQueryTerm';
import SekeletonTable from '@/components/ui/Sekeleton';
import ExportExcelButton from '@/components/ui/Export';
import CommentModal from '../Modal/CommentModal';
import ExportTranscriptWord from '../Modal/ExportTranscriptWord';

/**
 * ? bây giờ groupStudent sẽ số dòng
 * ? còn số cột sẽ là CLO evaluation
 */
function randomColor(index: number) {
  return index % 2 ? '#f9fcff' : '#ffffff';
}
const totalScores = (scores: any[]) => {
  if (!scores) return 0;
  return scores.reduce((score1, score2) => parseFloat(score1 + score2), 0);
};
const convertRowStudents = (groupStudents: any[]) => {
  if (groupStudents?.length === 0) return [];
  return groupStudents?.map((student: any, index: number) => {
    return {
      ...student,
      colorRow: randomColor(index),
      totalScores: totalScores(student?.evaluations.map((std: any) => std.score)),
    };
  });
};
const convertTotalOfEvaluationsByStd = (groupStudents: any[]) => {
  if (groupStudents?.length === 0) return [];
  return groupStudents?.map((student: any, index: number) => {
    return {
      id: student.id,
      evaluations: student.evaluations.map((evaluation: any) => ({
        id: evaluation.id,
        score: evaluation.score,
      })),
      totalScores: totalScores(student?.evaluations.map((std: any) => std.score)),
    };
  });
};
const columnsExcelTranscripts = (evaluations, type) => {
  const init = [
    { header: 'Mã nhóm', key: 'groupName', width: 10 },
    { header: 'Tên đề tài', key: 'topicName', width: 60 },
    { header: 'Mã sinh viên', key: 'username', width: 12 },
    { header: 'Họ và tên', key: 'studentName', width: 30 },
  ];
  if (!evaluations) return [...init];
  const evalColumns = evaluations
    ?.map((evaluation) => {
      return {
        header: `${evaluation.key} (${evaluation.scoreMax})`,
        key: evaluation.key,
        width: 10,
      };
    })
    .sort((a, b) => parseInt(a.key.split('LO')[1]) - parseInt(b.key.split('LO')[1]));
  const totalScores = {
    header: `Tổng điểm (${checkVietNamTypeEvaluation(type)})`,
    key: 'totalScores',
    width: 14,
  };
  return [...init, ...evalColumns, totalScores];
};

const grScoresToExportExcel = (tranScripts) => {
  return tranScripts
    ?.map((transcript) => {
      let student = {
        username: transcript.username,
        studentName: transcript.fullName,
        groupName: transcript.groupName,
        topicName: transcript.topicName,
        status: transcript.status,
      };
      transcript?.evaluations
        .sort((a, b) => parseInt(a.key.split('LO')[1]) - parseInt(b.key.split('LO')[1]))
        .map((evaluation) => {
          student = {
            ...student,
            [evaluation.key]: evaluation.score,
          };
        });
      return {
        ...student,
        totalScores: totalScores(transcript?.evaluations.map((std: any) => std.score)),
      };
    })
    .flat();
};

function TableScoreManagement({ typeScoreStudent, isInTimeScore }: any) {
  const { termStore } = useTerm();
  const termId = termStore.currentTerm.id;
  //[Handler update/ create transcript of group student]
  const {
    onCreateTranscriptTypeExcelUI,
    onUpdateTranscripts,
    handleGetTranscriptByTypeAssign,
    hanleGetEvalutaionsForScoring,
  } = useTranscript();
  const {
    mutate: createTranscripts,
    isSuccess: successCreate,
    isLoading: loadingCreate,
  } = onCreateTranscriptTypeExcelUI();
  const {
    mutate: updateTranscripts,
    isSuccess: successUpdate,
    isLoading: loadingUpdate,
  } = onUpdateTranscripts();

  const { data: evaluationFetch } = hanleGetEvalutaionsForScoring(
    checkTypeEvaluation(typeScoreStudent),
  );
  //![Get group student need score]
  const {
    data: groupTranscripts,
    isLoading,
    isSuccess,
    refetch: refetchTranscript,
  } = handleGetTranscriptByTypeAssign(typeScoreStudent);

  const [scoreStds, setScoreStds] = useState<any[]>([]);
  const [totalList, setTotalList] = useState<any[]>([]);

  useEffect(() => {
    if (isSuccess && groupTranscripts?.transcripts) {
      setTotalList(convertTotalOfEvaluationsByStd(groupTranscripts?.transcripts));
    }
  }, [groupTranscripts]);

  const handleChangeScore = (id: string, score: string, evaluationId: string) => {
    const scoreStudent = {
      studentId: id,
      evaluationId: evaluationId,
      score: score,
      termId: termId,
    };
    const index = scoreStds.findIndex(
      (scoreStd) => scoreStd.studentId === id && scoreStd.evaluationId === evaluationId,
    );
    if (index === -1) {
      setScoreStds([...scoreStds, scoreStudent]);
    } else {
      const newScoreStds = [...scoreStds];
      newScoreStds[index] = scoreStudent;
      setScoreStds(newScoreStds);
    }
    setTotalList((totalList) =>
      totalList.map((std) => {
        if (std.id === id) {
          std.evaluations.map((evaluation) => {
            if (evaluation.id === evaluationId) {
              evaluation.score = parseFloat(score);
            }
          });
        }
        return std;
      }),
    );
  };

  //!Handle submit
  const handleSubmitCreateTranscipts = (id: string) => {
    const preTranscripts = evaluationFetch?.evaluations?.map((e) => {
      return {
        studentId: id,
        evaluationId: e.id,
        score: 0,
        termId: termId,
      };
    });
    const transcript = scoreStds.filter((scoreStd) => scoreStd.studentId === id);
    const dataSend = preTranscripts.map((e) => {
      let eId = e?.evaluationId;
      let evlHaveScore = transcript?.find((e) => e.evaluationId === eId);
      if (evlHaveScore) {
        e.score = evlHaveScore.score;
      }
      return e;
    });
    createTranscripts(dataSend);
  };
  const handleSubmitUpdateTranscipts = (id: string) => {
    const transcript = scoreStds.filter((scoreStd) => scoreStd.studentId === id);
    updateTranscripts(transcript);
  };
  useEffect(() => {
    if (successCreate || successUpdate) {
      refetchTranscript();
    }
  }, [successCreate, successUpdate]);
  const columnsExcel = columnsExcelTranscripts(evaluationFetch?.evaluations, typeScoreStudent);

  //Modal
  const [openCommentModal, setOpenCommentModal] = useState({
    groupName: '',
    groupId: '',
    type: '',
    topicName: '',
    isOpen: false,
  });
  const handleOpenCommentModal = (
    groupName: string,
    groupId: string,
    topicName: string,
    type: string,
  ) => {
    setOpenCommentModal({
      groupName,
      groupId,
      type,
      topicName,
      isOpen: true,
    });
  };
  const handleCloseCommentModal = () => {
    setOpenCommentModal((pre) => ({ ...pre, isOpen: false }));
  };
  const [openExportTranscriptWord, setOpenExportTranscriptWord] = useState(false);
  const handleOpenExportTranscriptWord = () => {
    setOpenExportTranscriptWord(true);
  };
  const handleCloseExportTranscriptWord = () => {
    setOpenExportTranscriptWord(false);
  };
  return (
    <>
      {(loadingCreate || loadingUpdate) && (
        <Box
          sx={{
            position: 'fixed',
            bgcolor: 'rgba(0, 0, 0, 0.2)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', mb: 4, gap: 4 }}>
          <Button variant='contained' onClick={handleOpenExportTranscriptWord}>
            Xuất phiếu điểm CLO
          </Button>
          <ExportExcelButton
            headerSetup={columnsExcel}
            data={grScoresToExportExcel(groupTranscripts?.transcripts)}
            entity='transcriptsOfLecturerScoring'
            label='Xuất bảng điểm'
          />
        </Box>
        {isLoading ? (
          <SekeletonTable />
        ) : (
          <Box>
            {/* Table head -> loading CLO của evalution */}
            <TableHead sx={{ bgcolor: '#132e65' }}>
              <StyledTableCell sx={{ color: 'grey.300', width: '5%', fontSize: 14 }}>
                Thông tin nhóm sinh viên
              </StyledTableCell>
              <StyledTableCell sx={{ color: 'grey.300', width: '3%', fontSize: 14 }}>
                Họ tên sinh viên
              </StyledTableCell>
              <>
                {evaluationFetch?.evaluations
                  ?.sort((a, b) => parseInt(a.key.split('LO')[1]) - parseInt(b.key.split('LO')[1]))
                  .map((evaluation: any) => (
                    <StyledTableCell
                      key={evaluation._id}
                      sx={{ color: 'grey.300', width: '1%', fontSize: 14 }}
                    >
                      {evaluation?.key} ({evaluation?.scoreMax})
                    </StyledTableCell>
                  ))}
              </>
              <StyledTableCell sx={{ color: 'grey.300', width: '3%', fontSize: 14 }}>
                Tổng điểm
              </StyledTableCell>
              <StyledTableCell sx={{ color: 'grey.300', width: '1%', fontSize: 14 }}>
                Chức năng
              </StyledTableCell>
            </TableHead>
            {/* Table body -> rows loading groupStudents */}{' '}
            {convertRowStudents(groupTranscripts?.transcripts)?.length > 0 ? (
              <TableBody>
                {convertRowStudents(groupTranscripts?.transcripts)?.map(
                  (rows: any, index: number) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell
                          sx={{
                            color: 'grey.700',
                            backgroundColor: rows?.colorRow,
                            width: '28%',
                            padding: 2,
                          }}
                        >
                          <Typography color='grey.700' mb={1} fontWeight={'bold'}>
                            {' '}
                            Nhóm {rows?.groupName}
                          </Typography>
                          <Typography color='grey.700'>
                            {' '}
                            {rows?.topicName}
                            <>
                              {rows?.link ? (
                                <Link
                                  href={`${rows?.link}`}
                                  sx={{ fontStyle: 'italic', fontWeight: 500, cursor: 'pointer' }}
                                  mx={2}
                                  target='_blank'
                                >
                                  Xem tài liệu{' '}
                                </Link>
                              ) : (
                                <Typography
                                  mx={2}
                                  component={'span'}
                                  variant='body1'
                                  color='initial'
                                >
                                  (Chưa nộp tài liệu)
                                </Typography>
                              )}
                            </>
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell sx={{ color: 'grey.600', width: '10%', fontSize: 12 }}>
                          {rows?.isAdmin ? (
                            <Typography variant='body2' color='primary.main'>
                              Trưởng nhóm
                            </Typography>
                          ) : (
                            ''
                          )}
                          {rows?.fullName}
                          {rows.status.split('_')[0] === 'FAIL' && (
                            <Typography variant='body1' color='error'>
                              -Không chấm-
                            </Typography>
                          )}
                        </StyledTableCell>
                        <>
                          {rows?.evaluations.map((evaluation: any, index: number) => (
                            <Tooltip title={`${evaluation.key}: ${evaluation.name}`}>
                              <StyledTableCell
                                sx={{
                                  color: 'grey.700',
                                  width: '1%',
                                  p: 0,
                                  ':hover': {
                                    background: 'rgb(234, 240, 245)',
                                    transition: 'all 0.3s ease 0s',
                                  },
                                }}
                              >
                                <ScoreInput
                                  handleChangeScore={handleChangeScore}
                                  evaluationId={evaluation.id}
                                  studentId={rows?.id}
                                  oldScore={evaluation.score}
                                  disabled={!isInTimeScore}
                                  scoreMax={evaluation.scoreMax}
                                />
                              </StyledTableCell>
                            </Tooltip>
                          ))}
                        </>
                        <StyledTableCell sx={{ color: 'success.dark', width: '1%' }}>
                          {Number(
                            totalScores(
                              totalList
                                ?.find((std) => std.id === rows?.id)
                                ?.evaluations.map((e) => e.score),
                            ),
                          ).toFixed(1)}
                        </StyledTableCell>
                        <StyledTableCell sx={{ color: 'grey.700', width: '3%', fontSize: 14 }}>
                          {rows?.isScored ? (
                            <Button
                              onClick={() => handleSubmitUpdateTranscipts(rows?.id)}
                              color='warning'
                              disabled={!isInTimeScore}
                              startIcon={<Icon icon={'emojione-monotone:writing-hand'} />}
                            >
                              Cập nhật
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleSubmitCreateTranscipts(rows?.id)}
                              startIcon={<Icon icon={'emojione-monotone:writing-hand'} />}
                              disabled={!isInTimeScore}
                            >
                              Chấm
                            </Button>
                          )}
                          {rows?.isAdmin ? (
                            <Tooltip title={`Nhận xét nhóm ${rows?.groupName}`}>
                              <Button
                                onClick={() =>
                                  handleOpenCommentModal(
                                    rows?.groupName,
                                    rows?.groupStudentId,
                                    rows?.topicName,
                                    typeScoreStudent,
                                  )
                                }
                                disabled={!isInTimeScore}
                                color='primary'
                              >
                                Nhận xét
                              </Button>
                            </Tooltip>
                          ) : (
                            ''
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  },
                )}
              </TableBody>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  py: 20,
                }}
              >
                <Box>
                  <img src='/images/nodata.webp' width={200} height={200} alt='' />
                  <Typography variant='body1' textAlign={'center'} color='grey.600'>
                    Bảng điểm trống
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
      <CommentModal
        onClose={handleCloseCommentModal}
        open={openCommentModal.isOpen}
        type={openCommentModal.type}
        topicName={openCommentModal.topicName}
        groupId={openCommentModal.groupId}
        groupName={openCommentModal.groupName}
      />
      <ExportTranscriptWord
        onClose={handleCloseExportTranscriptWord}
        open={openExportTranscriptWord}
        typeEvaluation={typeScoreStudent}
      />
    </>
  );
}

export default TableScoreManagement;
