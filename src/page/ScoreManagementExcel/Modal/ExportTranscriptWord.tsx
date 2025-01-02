import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Box, Button, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useDocx from '@/hooks/ui/useDocx';
import { Icon } from '@iconify/react';
import { Form, Formik } from 'formik';
import CustomTextField from '@/components/ui/CustomTextField';
import {
  getFileNameToExportDocx,
  getTypeEvaluation,
} from '@/utils/validations/evaluation.validation';
import useTranscript from '@/hooks/api/useQueryTranscript';
import docResultTranscript from '@/components/iframe/PageWord/doc/docResultTranscriptReviewer';
import { useAuth } from '@/hooks/api/useAuth';
interface ExportTranscriptWordProps {
  open: boolean;
  onClose: () => void;
  typeEvaluation: string;
  evaluations?: any;
  permissions?: any[];
}
const docsTranscriptFiles = (transcripts, type) => {
  if (
    type === 'REVIEWER' ||
    type == 'REPORT' ||
    type === 'REPORT_POSTER' ||
    type === 'REPORT_COUNCIL' ||
    type === 'ADVISOR'
  ) {
    return transcripts?.map((transcript) => docResultTranscript({ ...transcript, type: type }));
  }
};

function ExportTranscriptWord(props: ExportTranscriptWordProps) {
  const { open, onClose, typeEvaluation } = props;
  const { lecturerStore } = useAuth();
  const typeGroupLecturer =
    typeEvaluation === 'REPORT_COUNCIL' || typeEvaluation === 'REPORT_POSTER'
      ? 'REPORT'
      : typeEvaluation;
  //TODO: HOOKS
  const [fileName, setFileName] = useState(getFileNameToExportDocx(typeGroupLecturer));

  const { onExportMultiDocxFiles } = useDocx();

  const { handleGetTranscriptByLecturerId } = useTranscript();
  const { data, refetch } = handleGetTranscriptByLecturerId(
    lecturerStore.me.user.id,
    typeEvaluation,
  );

  //TODO: [HANDLE EXPORT MULTI DOCX FILE]
  const files = docsTranscriptFiles(data?.transcripts, typeEvaluation);

  //TODO: [Handler submit]
  const handleSubmit = (fileName) => {
    return onExportMultiDocxFiles(fileName, fileName, files);
  };
  useEffect(() => {
    refetch();
  }, [open]);

  return (
    <Modal maxWidth='sm' open={open} onClose={onClose}>
      <Box pb={6}>
        <TitleManager
          mx={10}
          variant='h6'
          textTransform={'uppercase'}
          icon='vscode-icons:file-type-word2'
        >
          Xuất phiếu điểm {getTypeEvaluation(typeEvaluation)} của nhóm sinh viên
        </TitleManager>

        <Box display={'flex'} mt={10} gap={10} px={10}>
          <Paper elevation={0} sx={{ width: '100%', px: 4, pt: 2, flexShrink: 0 }}>
            <Formik initialValues={{}} onSubmit={() => {}}>
              {({ values, handleBlur }) => (
                <Form>
                  <Box>
                    <Box>
                      <CustomTextField
                        placeholder='VD:PhieuChamDiem_CuoiKy_KLTN'
                        onChange={(e) => {
                          setFileName(e.target.value);
                        }}
                        defaultValue={getFileNameToExportDocx(typeGroupLecturer)}
                        onBlur={handleBlur}
                        label='Tên file'
                      />
                    </Box>
                    {/* //![SUBMIT] */}
                    <Box mt={4} mx={2}>
                      <Button
                        variant='contained'
                        type={'submit'}
                        color='primary'
                        sx={{ float: 'right' }}
                        onClick={() => handleSubmit(getFileNameToExportDocx(typeGroupLecturer))}
                      >
                        <Icon width={20} icon='line-md:download-outline-loop' />
                        Xuất phiếu
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
}

export default ExportTranscriptWord;
