import { checkVietNamTypeEvaluation } from '@/utils/validations/transcript.validation';
import { Box, Button, Link, TableBody, TableHead, Typography } from '@mui/material';
import useTranscript from '@/hooks/api/useQueryTranscript';
import { StyledTableCell, StyledTableRow } from '@/components/iframe/PageWord/style';
import { useTerm } from '@/hooks/api/useQueryTerm';
import SekeletonTable from '@/components/ui/Sekeleton';
import ExportExcelButton from '@/components/ui/Export';
import { rest } from 'lodash';
import ExportWordModal from '@/page/ReviewManager/Modal/ExportWord';
import useEvaluation from '@/hooks/api/useQueryEvalutaion';
import { useState } from 'react';
import { Icon } from '@iconify/react';

/**
 * ? bây giờ groupStudent sẽ số dòng
 * ? còn số cột sẽ là CLO evaluation
 */

function randomColor(index: number) {
  return index % 2 ? '#f9fcff' : '#ffffff';
}
const totalScores = (scores: any[]) => {
  if (!scores) return 0;
  return scores.reduce((score1, score2) => score1 + score2, 0);
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

const columnsExcelTranscripts = (evaluations, type) => {
  const init = [
    { header: 'Mã nhóm', key: 'groupName', width: 10 },
    { header: 'Mã sinh viên', key: 'username', width: 12 },
    { header: 'Họ và tên', key: 'studentName', width: 30 },
    { header: 'Giảng viên chấm điểm', key: 'lecturerName', width: 30 },
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
    .sort((a, b) => a.key.localeCompare(b.key));
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
        lecturerName: transcript.lecturerName ? transcript.lecturerName : '',
        status: transcript.status,
      };
      transcript?.evaluations
        .sort((a, b) => a.key.localeCompare(b.key))
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
const setEvaluationKeyAndScoreMaxHeaderExcel = (evls) => {
  if (evls.length === 0 || evls == null) return [];
  return evls?.map((e) => ({ key: e.key, scoreMax: e.scoreMax }));
};

const allTotalTranscriptOfStudents = (transcripts) => {
  if (!transcripts) {
    return null;
  }
  let advisor = setEvaluationKeyAndScoreMaxHeaderExcel(transcripts[0]['evaluationAdvisor'])?.map(
    (ev) => ({
      header: `${ev.key} (${ev.scoreMax})`,
      key: 'evaluationAdvisor' + `${ev.key}`,
      width: 10,
    }),
  );
  let review1 = setEvaluationKeyAndScoreMaxHeaderExcel(transcripts[0]['evaluationReviewer1'])?.map(
    (ev) => ({
      header: `${ev.key} (${ev.scoreMax})`,
      key: 'evaluationReviewer1' + `${ev.key}`,
      width: 10,
    }),
  );

  let review2 = setEvaluationKeyAndScoreMaxHeaderExcel(transcripts[0]['evaluationReviewer2'])?.map(
    (ev) => ({
      header: `${ev.key} (${ev.scoreMax})`,
      key: 'evaluationReviewer2' + `${ev.key}`,
      width: 10,
    }),
  );

  let report1 = setEvaluationKeyAndScoreMaxHeaderExcel(transcripts[0]['evaluationReport1'])?.map(
    (ev) => ({
      header: `${ev.key} (${ev.scoreMax})`,
      key: 'evaluationReport1' + `${ev.key}`,
      width: 10,
    }),
  );

  let report2 = setEvaluationKeyAndScoreMaxHeaderExcel(transcripts[0]['evaluationReport2'])?.map(
    (ev) => ({
      header: `${ev.key} (${ev.scoreMax})`,
      key: 'evaluationReport2' + `${ev.key}`,
      width: 10,
    }),
  );

  let report3 = setEvaluationKeyAndScoreMaxHeaderExcel(transcripts[0]['evaluationReport3'])?.map(
    (ev) => ({
      header: `${ev.key} (${ev.scoreMax})`,
      key: 'evaluationReport3' + `${ev.key}`,
      width: 10,
    }),
  );

  const header = [
    { header: 'Mã sinh viên', key: 'username', width: 15 },
    { header: 'Họ và tên', key: 'fullName', width: 26 },
    { header: 'Mã nhóm', key: 'groupName', width: 15 },
    { header: 'Tên đề tài', key: 'topicName', width: 50 },
    { header: 'GVHD', key: 'GVHD', width: 24 },
    { header: 'GVPB1', key: 'GVPB1', width: 24 },
    { header: 'GVPB2', key: 'GVPB2', width: 24 },
    { header: 'GVHĐ1', key: 'GVHĐ1', width: 24 },
    { header: 'GVHĐ2', key: 'GVHĐ2', width: 24 },
    { header: 'GVHĐ3', key: 'GVHĐ3', width: 24 },
    ...advisor,
    { header: 'Tổng điểm GVHD', key: 'Tổng điểm GVHD', width: 20 },
    ...review1,
    { header: 'Tổng điểm GVPB1', key: 'Tổng điểm GVPB1', width: 20 },
    ...review2,
    { header: 'Tổng điểm GVPB2', key: 'Tổng điểm GVPB2', width: 20 },
    ...report1,
    { header: 'Tổng điểm GVHĐ1', key: 'Tổng điểm GVHĐ1', width: 20 },
    ...report2,
    { header: 'Tổng điểm GVHĐ2', key: 'Tổng điểm GVHĐ2', width: 20 },
    ...report3,
    { header: 'Tổng điểm GVHĐ3', key: 'Tổng điểm GVHĐ3', width: 20 },
    { header: 'Điểm TB GVHD', key: 'Điểm TB GVHD', width: 20 },
    { header: 'Điểm TB GVPB1', key: 'Điểm TB GVPB1', width: 20 },
    { header: 'Điểm TB GVPB2', key: 'Điểm TB GVPB2', width: 20 },
    { header: 'Điểm TB GVHĐ1', key: 'Điểm TB GVHĐ1', width: 20 },
    { header: 'Điểm TB GVHĐ2', key: 'Điểm TB GVHĐ2', width: 20 },
    { header: 'Điểm TB GVHĐ3', key: 'Điểm TB GVHĐ3', width: 20 },
    { header: 'Điểm TB', key: 'Điểm TB', width: 10 },
    { header: 'Điểm Cộng', key: 'Điểm Cộng', width: 10 },
    { header: 'Tổng Điểm', key: 'Tổng Điểm', width: 10 },
  ];

  let flatTranscript = transcripts.map((transcript) => {
    const flattenEvaluation = (key) => {
      return Object.fromEntries(transcript[key].map((ev, index) => [`${key}${ev.key}`, ev.score]));
    };

    const flatObject = {
      username: transcript['username'],
      fullName: transcript['fullName'],
      groupName: transcript['groupName'],
      topicName: transcript['topicName'],
      GVHD: transcript['GVHD'],
      GVPB1: transcript['GVPB1'],
      GVPB2: transcript['GVPB2'],
      GVHĐ1: transcript['GVHĐ1'],
      GVHĐ2: transcript['GVHĐ2'],
      GVHĐ3: transcript['GVHĐ3'],
    };

    Object.assign(flatObject, flattenEvaluation('evaluationAdvisor'));
    flatObject['Tổng điểm GVHD'] = transcript['Tổng điểm GVHD'];
    Object.assign(flatObject, flattenEvaluation('evaluationReviewer1'));
    flatObject['Tổng điểm GVPB1'] = transcript['Tổng điểm GVPB1'];
    Object.assign(flatObject, flattenEvaluation('evaluationReviewer2'));
    flatObject['Tổng điểm GVPB2'] = transcript['Tổng điểm GVPB2'];
    Object.assign(flatObject, flattenEvaluation('evaluationReport1'));
    flatObject['Tổng điểm GVHĐ1'] = transcript['Tổng điểm GVHĐ1'];
    Object.assign(flatObject, flattenEvaluation('evaluationReport2'));
    flatObject['Tổng điểm GVHĐ2'] = transcript['Tổng điểm GVHĐ2'];
    Object.assign(flatObject, flattenEvaluation('evaluationReport3'));
    flatObject['Tổng điểm GVHĐ3'] = transcript['Tổng điểm GVHĐ3'];

    // Thêm các trường cuối
    flatObject['Điểm TB'] = transcript['Điểm TB'];
    flatObject['Điểm Cộng'] = transcript['Điểm Cộng'];
    flatObject['Tổng Điểm'] = transcript['Tổng Điểm'];

    return flatObject;
  });

  return { header, transcript: flatTranscript };
};
function TableScoreManagement({ typeScoreStudent }: any) {
  const { termStore } = useTerm();
  const { handleGetEvalutationByType, handleUiRender } = useEvaluation();
  const currentRole = handleUiRender();
  const { data } = handleGetEvalutationByType(termStore.currentTerm.id, typeScoreStudent);
  //[Handler update/ create transcript of group student]
  const { handleExportTranscripts, hanleGetEvalutaionsForScoring, handleExportAllTranscripts } =
    useTranscript();

  const { data: evaluationFetch } = hanleGetEvalutaionsForScoring(typeScoreStudent);
  //![Get group student need score]
  const { data: groupTranscripts, isLoading } = handleExportTranscripts(typeScoreStudent);
  const columnsExcel = columnsExcelTranscripts(evaluationFetch?.evaluations, typeScoreStudent);
  const { data: allTotalFetch, isLoading: allTotalLoading } = handleExportAllTranscripts();

  const [openModalExport, setOpenExportModal] = useState({
    isOpen: false,
  });


  const handleOpenExportModal = () => {
    setOpenExportModal({ isOpen: true });
  };
  const handleCloseExportModal = () => {
    setOpenExportModal({ isOpen: false });
  };
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 4, mb: 4 }}>
          {typeScoreStudent !== 'ADVISOR' && (
            <Button
              disabled={data?.evaluations.length < 1}
              size='small'
              color='primary'
              variant='contained'
              onClick={handleOpenExportModal}
              startIcon={<Icon width={20} icon='material-symbols:export-notes' />}
            >
              Xuất phiếu {checkVietNamTypeEvaluation(typeScoreStudent)}
            </Button>
          )}
          <ExportExcelButton
            headerSetup={columnsExcel}
            data={grScoresToExportExcel(groupTranscripts?.transcripts)}
            entity='transcriptsOfLecturerScoring'
            label={`Xuất bảng điểm ${checkVietNamTypeEvaluation(typeScoreStudent)}`}
          />
          <ExportExcelButton
            headerSetup={allTotalTranscriptOfStudents(allTotalFetch?.students)?.header}
            data={allTotalTranscriptOfStudents(allTotalFetch?.students)?.transcript}
            entity='allTotalTranscripts'
            label='Xuất bảng điểm tổng kết'
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
                  ?.sort((a, b) => a.key.localeCompare(b.key))
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
            </TableHead>
            {/* Table body -> rows loading groupStudents */}{' '}
            {convertRowStudents(groupTranscripts?.transcripts)?.length > 0 ? (
              <TableBody>
                {convertRowStudents(groupTranscripts?.transcripts)?.map(
                  (rows: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
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
                          {rows?.lecturerName && (
                            <Typography variant='body1' fontWeight={'500'} color='success.main'>
                              Giảng viên chấm điểm:
                              <Typography
                                variant='body1'
                                mx={2}
                                component={'span'}
                                color='grey.600'
                              >
                                {rows?.lecturerName}
                              </Typography>
                            </Typography>
                          )}
                        </StyledTableCell>
                        <StyledTableCell sx={{ color: 'grey.600', width: '10%', fontSize: 14 }}>
                          {rows?.fullName}
                          {rows.status.split('_')[0] === 'FAIL' && (
                            <Typography variant='body1' color='error'>
                              -Không chấm-
                            </Typography>
                          )}
                        </StyledTableCell>
                        <>
                          {rows?.evaluations.map((evaluation: any, index: number) => (
                            <StyledTableCell
                              key={index}
                              sx={{
                                color: 'grey.700',
                                width: '1%',
                                px: 4,
                                fontSize: 14,
                              }}
                            >
                              {evaluation.score}
                            </StyledTableCell>
                          ))}
                        </>
                        <StyledTableCell sx={{ color: 'error.main', width: '1%' }}>
                          {rows.totalScores}
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
      <>
        <ExportWordModal
          permissions={currentRole}
          onClose={handleCloseExportModal}
          termId={`${termStore.currentTerm.id}`}
          typeEvaluation={typeScoreStudent}
          open={openModalExport.isOpen}
          evaluations={data?.evaluations}
        />
      </>
    </>
  );
}

export default TableScoreManagement;
