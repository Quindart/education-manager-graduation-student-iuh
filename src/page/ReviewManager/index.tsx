import { Box, Button, Paper, Tooltip } from '@mui/material';
import TableManagerReviewScore from './Table';
import { useState } from 'react';
import DropDown from '@/components/ui/Dropdown';
import TitleManager from '@/components/ui/Title';
import ModalUpload from '@/components/ui/UploadExcel';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';
import useEvaluation from '@/hooks/api/useQueryEvalutaion';
import SekeletonUI from '@/components/ui/Sekeleton';
import { convertEvalutationTable } from '@/utils/convertDataTable';
import { TypeEvaluation } from '@/services/apiEvaluation';
import { Icon } from '@iconify/react';
import AddEvaluationModal from './Modal/Add';
import ContextReviewManager from './Context';
import ExportWordModal from './Modal/ExportWord';
import ExportExcelButton from '@/components/ui/Export';
import ExampleExcel from './Modal/ExampleExcel';

function ReviewManagerPage() {
  const [currentTypeReview, setCurrentTypeReview] = useState(TypeEvaluation.ADVISOR);
  const { termStore } = useTerm();
  const { handleGetEvalutationByType, handleUiRender } = useEvaluation();
  const currentRole = handleUiRender();
  const { data, isLoading, isSuccess } = handleGetEvalutationByType(
    termStore.currentTerm.id,
    currentTypeReview,
  );
  const [openModalCreateEvaluation, setOpenCreateEvaluationModal] = useState({
    isOpen: false,
  });
  const [openModalExport, setOpenExportModal] = useState({
    isOpen: false,
  });
  const [openModalExampleExcel, setOpenExampleExcelModal] = useState({
    isOpen: false,
  });

  const handleOpenExportModal = () => {
    setOpenExportModal({ isOpen: true });
  };
  const handleCloseExportModal = () => {
    setOpenExportModal({ isOpen: false });
  };

  const handleOpenCreateEvaluationModal = () => {
    setOpenCreateEvaluationModal({ isOpen: true });
  };
  const handleCloseCreateEvaluationModal = () => {
    setOpenCreateEvaluationModal({ ...openModalCreateEvaluation, isOpen: false });
  };

  const handleOpenExampleExcelModal = () => {
    setOpenExampleExcelModal({ isOpen: true });
  };
  const handleCloseExampleExcelModal = () => {
    setOpenExampleExcelModal({ isOpen: false });
  };

  return (
    <>
      <ContextReviewManager>
        <Paper sx={{ py: 10, px: 10 }} elevation={0}>
          <Box my={0} display={'flex'} justifyContent={'space-between'} gap={2}>
            <TitleManager icon='quill:list'>Tiêu chí Đánh giá</TitleManager>
            <Box display={'flex'} gap={2}>
              <DropDown
                value={currentTypeReview}
                onChange={(e: any) => {
                  setCurrentTypeReview(e.target.value);
                }}
                options={[
                  {
                    name: 'Tiêu chí dành cho GV Hướng dẫn',
                    _id: 'ADVISOR',
                  },
                  {
                    name: 'Tiêu chí  dành cho GV Phản biện',
                    _id: 'REVIEWER',
                  },
                  {
                    name: 'Tiêu chí  dành cho GV Hội đồng',
                    _id: 'REPORT',
                  },
                ]}
              />
              {currentRole.includes('all') && (
                <>
                  <Tooltip title='Thêm tiêu chí'>
                    <Button
                      size='small'
                      color='error'
                      variant='contained'
                      onClick={handleOpenCreateEvaluationModal}
                    >
                      <Icon width={20} icon='ic:baseline-plus' />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Xuất mẫu excel đánh giá'>
                    <Button
                      size='small'
                      color='primary'
                      variant='contained'
                      onClick={handleOpenExampleExcelModal}
                    >
                      <Icon width={20} icon='ri:download-line' />
                    </Button>
                  </Tooltip>
                  <ModalUpload
                    label=''
                    labelToolTip='Thêm tiêu chí bằng file excel'
                    fileNameModel='Mẫu file excel tiêu chí đánh giá KLTN'
                    sheetName='tiêu chí'
                    title='Tải xuống mẫu file'
                    disabled={isSuccess && convertEvalutationTable(data.evaluations).length > 0}
                    entityUpload={TypeEntityUpload.EVALUATION}
                    termId={termStore.currentTerm.id}
                    typeEvaluation={currentTypeReview}
                    havedModelExcel={true}
                  />
                </>
              )}

              <Tooltip title='Xuất phiếu chấm'>
                <Button
                  disabled={data?.evaluations.length < 1}
                  size='small'
                  color='success'
                  variant='contained'
                  onClick={handleOpenExportModal}
                >
                  <Icon width={20} icon='material-symbols:export-notes' />
                </Button>
              </Tooltip>
              {/* )} */}
            </Box>
          </Box>

          <Box mt={4}>
            {isLoading ? (
              <SekeletonUI />
            ) : (
              <>
                <TableManagerReviewScore
                  termId={termStore.currentTerm.id}
                  type={currentTypeReview}
                  currentRole={currentRole}
                  rows={convertEvalutationTable(data.evaluations)}
                />
                <Paper elevation={0} sx={{ px: 2, py: 3, mt: 2 }}>
                  <TitleManager variant='body1'>Tổng điểm: 100</TitleManager>
                </Paper>
              </>
            )}
          </Box>
          {/* {currentRole.includes('crud') && ( */}
          <>
            <ExportWordModal
              permissions={currentRole}
              onClose={handleCloseExportModal}
              termId={`${termStore.currentTerm.id}`}
              typeEvaluation={currentTypeReview}
              open={openModalExport.isOpen}
              evaluations={data?.evaluations}
            />
          </>
          {/* )} */}
          {currentRole.includes('all') && (
            <>
              <AddEvaluationModal
                open={openModalCreateEvaluation.isOpen}
                termId={termStore.currentTerm.id}
                type={currentTypeReview}
                onClose={handleCloseCreateEvaluationModal}
              />
              <ExampleExcel
                typeEvaluation={currentTypeReview}
                open={openModalExampleExcel.isOpen}
                onClose={handleCloseExampleExcelModal}
              />
            </>
          )}
        </Paper>
      </ContextReviewManager>
    </>
  );
}

export default ReviewManagerPage;
