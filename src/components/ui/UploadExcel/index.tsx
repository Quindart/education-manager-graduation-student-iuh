import React, { useState } from 'react';
import Modal from '../Modal';
import { Box, Button, Card, Paper, Skeleton, Tooltip, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import TitleManager from '../Title';
import styled from '@emotion/styled';
import useUploadExcel, { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { useAuth } from '@/hooks/api/useAuth';
import ExportExcelModelButton from './Model';
import LinearProgressWithLabel from './LinearProgress';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '100%',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: '100%',
  backgroundColor: 'red',
});

interface ModalUploadPropsType {
  entityUpload: TypeEntityUpload;
  termId?: string;
  typeEvaluation?: string;
  disabled?: boolean;
  majorId?: string;
  label?: string;
  labelToolTip?: string;
  sheetName?: string;
  title?: string;
  fileNameModel?: string;
  havedModelExcel?: boolean;
}

function ModalUpload(props: ModalUploadPropsType) {
  const {
    entityUpload,
    typeEvaluation,
    label = 'Tải dữ liệu lên từ Excel',
    labelToolTip = '',
    disabled = false,
    title,
    sheetName,
    fileNameModel,
    havedModelExcel = true,
  } = props;

  const { termStore } = useTerm();
  const { majorStore } = useMajor();
  const { lecturerStore } = useAuth();

  //TODO: event Modal
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenUpload = () => {
    setIsOpen(true);
  };
  const handleCloseUpload = () => {
    setIsOpen(false);
    handleClearData();
  };
  const handleClearData = () => {
    setFileName('');
    setTotalSize('');
    setValueLoading('');
    setCurrentFile(undefined);
  };

  //TODO: HOOK LOGIC UPLOAD EXCEL
  const {
    importExcel,
    valueLoading,
    totalSize,
    currentFile,
    savedFileToDatabase,
    setFileName,
    setTotalSize,
    setCurrentFile,
    setValueLoading,
    fileName,
  } = useUploadExcel({
    entityUpload: entityUpload,
    termId: termStore.currentTerm.id,
    majorId: majorStore.currentMajor.id,
    me: lecturerStore.me.user,
    typeEvaluation: typeEvaluation,
    handleCloseUpload: handleCloseUpload,
  });

  return (
    <Box>
      <Tooltip arrow title={labelToolTip}>
        <Button
          size='small'
          disabled={disabled}
          onClick={handleOpenUpload}
          variant='contained'
          color='primary'
        >
          <Icon icon='uiw:file-excel' style={{ marginRight: 2 }} width={20} />
          {label}
        </Button>
      </Tooltip>
      <Modal maxWidth={'md'} open={isOpen} onClose={handleCloseUpload}>
        <Paper sx={{ px: 10, pb: 4 }} elevation={3}>
          <Box display={'flex'} gap={4}>
            <TitleManager
              mb={4}
              variant='h6'
              icon='streamline:file-add-alternate-solid'
              textTransform={'uppercase'}
            >
              Nhập dữ liệu bằng file excel
            </TitleManager>
          </Box>
          <Paper elevation={1} sx={{ px: 10, py: 12, mb: 6 }}>
            <Box
              sx={{ border: 2, borderColor: 'primary.main', borderRadius: 1 }}
              style={{
                borderStyle: 'dashed',
              }}
            >
              {!currentFile ? (
                <Button
                  component='label'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    py: 30,
                  }}
                >
                  <VisuallyHiddenInput
                    type='file'
                    onChange={(e) => {
                      importExcel(e);
                    }}
                  />

                  <Box
                    bgcolor='rgb(0,82,177,0.2)'
                    p={20}
                    borderRadius={'50%'}
                    width={150}
                    height={150}
                  >
                    <Icon
                      color='rgb(0,82,177,0.7)'
                      width={'full'}
                      height={'full'}
                      icon='iwwa:box'
                    />
                  </Box>

                  <Typography color='grey.600' mt={6} variant='h5'>
                    Chưa có file được import
                    <Icon style={{ marginLeft: 2 }} icon='fluent-emoji:sad-but-relieved-face' />
                  </Typography>
                </Button>
              ) : (
                <Box
                  height={300}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Icon color='#40bb92' width={150} icon='icon-park-solid:file-success' />
                  <Typography mt={6} variant='h5' color='grey.600'>
                    <Icon icon='teenyicons:tick-circle-solid' /> Đã tải file lên thành công, Vui
                    lòng lưu dữ liệu vào hệ thống.
                  </Typography>
                  <Button
                    sx={{
                      mt: 5,
                    }}
                    color='success'
                    variant='contained'
                    disabled={currentFile === undefined}
                    onClick={() => {
                      savedFileToDatabase(currentFile);
                    }}
                  >
                    <Icon width={20} style={{ marginRight: 10 }} icon='el:hand-right' />
                    Lưu ngay
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>

          <Box>
            {currentFile !== undefined ? (
              <Card sx={{ p: 6, borderRadius: 2 }}>
                <Box gap={2} alignItems={'center'} display={'flex'}>
                  <Icon width={50} icon='vscode-icons:file-type-excel' color='rgb(0,82,177,0.8)' />
                  <Box>
                    <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
                      Tên file:{' '}
                      <Typography component='span' variant='h6' color='grey.800'>
                        {fileName}
                      </Typography>
                    </Typography>
                    <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
                      Kích thước:{' '}
                      <Typography component='span' variant='h6' color='grey.800'>
                        {totalSize}
                      </Typography>
                    </Typography>
                  </Box>
                  <Box></Box>
                </Box>

                <Typography mt={8} variant='body1' color='initial'>
                  Tiến độ lưu: {valueLoading * 100} %
                </Typography>
                <LinearProgressWithLabel value={valueLoading * 100} />
                {valueLoading === 1 && (
                  <Typography textAlign={'end'} variant='h6' fontWeight={700} color='success.main'>
                    Lưu thành công
                    <Icon icon='mdi:tick-outline' width={18} />
                  </Typography>
                )}
              </Card>
            ) : (
              <Skeleton />
            )}
          </Box>

          {havedModelExcel && (
            <Box mt={10}>
              <ExportExcelModelButton
                entityName={entityUpload}
                fileName={fileNameModel}
                title={title}
                sheetName={sheetName}
              />
            </Box>
          )}

          <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
            <Button variant='contained' color='primary' onClick={handleCloseUpload}>
              <Icon icon='mdi:close-outline' />
              Thoát
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}

export default ModalUpload;
