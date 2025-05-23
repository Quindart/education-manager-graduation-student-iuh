import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { Box, Button, Paper } from '@mui/material';
import React, { useState } from 'react';
import TableManagementMajor from './Table';
import { Icon } from '@iconify/react';
import AddMajorModal from './Modal/AddModal';
import { useDispatch } from 'react-redux';
import { setAllMajor } from '@/store/slice/major.slice';

function MajorPage() {
  const { handleGetAllMajorsRender } = useMajor();
  const { data, isLoading, isSuccess, isFetching } = handleGetAllMajorsRender();
  const dispatch = useDispatch();
  if (isSuccess) {
    dispatch(setAllMajor(data.majors));
  }

  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseModal = () => {
    setOpenAddModal(false);
  };
  return (
    <>
      <Paper sx={{ py: 10, px: 10 }} elevation={0}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <TitleManager mb={4} mt={2}>
            Danh sách tất cả Chuyên ngành
          </TitleManager>
          <Button onClick={handleOpenAddModal} color='error' variant='contained' size='small'>
            <Icon width={16} icon='material-symbols:add' />
            Thêm chuyên ngành{' '}
          </Button>
        </Box>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <Box width={'full'} my={4}>
            <TableManagementMajor rows={data?.majors} />
          </Box>
        )}
        <>
          <AddMajorModal open={openAddModal} onClose={handleCloseModal} />
        </>
      </Paper>
    </>
  );
}

export default MajorPage;
