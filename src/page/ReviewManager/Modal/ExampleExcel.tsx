import Modal from '@/components/ui/Modal';
import React from 'react';
import TitleManager from '@/components/ui/Title';
import { getTypeEvaluation } from '@/utils/validations/evaluation.validation';
import { TypeEvaluation } from '@/services/apiEvaluation';
import { Box, Button } from '@mui/material';
import { Icon } from '@iconify/react';

const handleDownload = (typeEvaluation: string) => {
  const files = ['/export/evaluations-instructor.xlsx', '/export/evaluations-reviewer.xlsx'];
  const filesToDownload = typeEvaluation === TypeEvaluation.ADVISOR ? [files[0]] : files;
  filesToDownload.forEach((filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || 'download.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

interface ExampleExcelPropsType {
  open: boolean;
  typeEvaluation: string;
  onClose: () => void;
}
function ExampleExcel({ open, typeEvaluation, onClose }: ExampleExcelPropsType) {
  return (
    <Modal maxWidth='sm' open={open} onClose={onClose}>
      <TitleManager mx={10} variant='h6' textTransform={'uppercase'}></TitleManager>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={6}
        pt={12}
        pb={4}
      >
        <Box borderRadius='50%' padding={10} sx={{ background: 'rgba(21, 124, 234, 0.2)' }}>
          <Icon color='white' height={70} width={70} icon='ri:download-line' />{' '}
        </Box>
        <Box mt={10} style={{ padding: '1rem', width: '100%' }}>
          <Button
            size='large'
            variant='contained'
            fullWidth
            onClick={() => handleDownload(`${typeEvaluation}`)}
          >
            Xuất file mẫu tiêu chí đánh giá {getTypeEvaluation(typeEvaluation)}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ExampleExcel;
