import Table from '@/components/ui/Table/Table';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import DeleteModal from '../Modal/DeleteModal';
import { useNavigate } from 'react-router-dom';

function TableManagamentLecturer(props: any) {
  const { rows, totalItems, limit, handleChangeLimit, totalPage, page, handleChangePage } = props;

  const [openDeleteModal, setOpenDeleteModal] = useState({
    lecturerTermId: '',
    name: '',
    isOpen: false,
  });

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal({ ...openDeleteModal, isOpen: false });
  };
  const handleOpenDeleteModal = (lecturerTermId: string, name: string) => {
    setOpenDeleteModal({ lecturerTermId, name, isOpen: true });
  };

  const navigate = useNavigate();

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Mã GV',
      field: 'username',
      flex: 0.6,
      headerAlign: 'right',
      align: 'right',
      renderCell(params) {
        return (
          <Typography variant='body1' fontWeight={400}>
            {params.row.username}
          </Typography>
        );
      },
    },
    {
      headerName: 'Họ & tên đệm',
      field: 'firstName',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
    },
    {
      headerName: 'Tên',
      field: 'lastName',
      flex: 0.5,
      headerAlign: 'left',
      align: 'left',
    },
    {
      headerName: 'Chuyên ngành',
      field: 'majorName',
      flex: 0.8,
      headerAlign: 'left',
      align: 'left',
    },
    {
      headerName: 'Số đề tài',
      field: 'totalTopics',
      flex: 0.5,
      headerAlign: 'right',
      align: 'right',
    },
    {
      headerName: 'Số nhóm SV Hướng dẫn',
      field: 'totalGroupStudents',
      flex: 1,
      headerAlign: 'right',
      align: 'right',
    },
    {
      headerName: 'Số nhóm SV Phản biện',
      field: 'totalReviewers',
      flex: 1,
      headerAlign: 'right',
      align: 'right',
    },
    {
      headerName: 'Số nhóm SV Hội đồng/Poster',
      field: 'totalReporters',
      flex: 1.2,
      headerAlign: 'right',
      align: 'right',
    },
    {
      headerName: 'Chức năng',
      field: 'updateTing',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip
            onClick={() => navigate(`/lecturer-terms/detail/${params.row.id}`)}
            title='Xem Chi tiết'
          >
            <IconButton color='primary'>
              <Icon width={20} icon='flat-color-icons:view-details' />
            </IconButton>
          </Tooltip>
          <Tooltip
            onClick={() => handleOpenDeleteModal(params.row.id, params.row.fullName)}
            title='Xóa giảng viên khỏi học kì'
          >
            <IconButton color='error'>
              <Icon width={20} icon='carbon:close-filled' style={{ color: ' #f2365b' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Table
        rows={rows}
        isLimit={true}
        sx={{
          bgcolor: 'white',
          width: '100%',
          minHeight: 600,
        }}
        columns={basicColumns}
        totalItems={totalItems}
        totalPages={totalPage}
        handleChangeLimit={handleChangeLimit}
        handleChangePage={handleChangePage}
        page={page}
        limit={limit}
        disableColumnFilter
      />

      <DeleteModal
        lecturerTermId={openDeleteModal.lecturerTermId}
        open={openDeleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        name={openDeleteModal.name}
      />
    </>
  );
}

export default TableManagamentLecturer;
