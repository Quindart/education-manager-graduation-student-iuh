import Table from '@/components/ui/Table/Table';
import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import CommentEventModal from '../../CommentModal';
import { env } from '@/utils/env';

function TableEdit(props) {
  const { rows, totalItems, totalPage, eventId } = props;
  const [openComment, setOpenComment] = useState({
    id: '',
    groupId: '',
    name: '',
    isOpen: false,
    oldComment: '',
  });
  const handleOpenComment = (id: string, groupId: string, name: string, oldComment: string) => {
    setOpenComment({
      id,
      groupId,
      name,
      isOpen: true,
      oldComment,
    });
  };
  const handleCloseComment = () => {
    setOpenComment((prev) => ({ ...prev, isOpen: false }));
  };
  const basicColumns: GridColDef[] = useMemo(
    () => [
      {
        headerName: 'Mã nhóm',
        field: 'name',
        flex: 0.6,
        align: 'center',
        headerAlign: 'center',
      },
      {
        headerName: 'Tên đề tài',
        field: 'topicName',
        flex: 2,
        align: 'left',
        headerAlign: 'left',
      },
      {
        headerName: 'Minh chứng',
        field: 'link',
        flex: 1.2,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
          <>
            {params.row.link ? (
              <Typography
                component={'a'}
                variant='body1'
                target='_blank'
                href={`${env.API_URL}/${params.value}`}
                color='primary.main'
              >
                Xem minh chứng
              </Typography>
            ) : (
              <Typography variant='body1' color='initial'>
                Chưa cập nhật
              </Typography>
            )}
          </>
        ),
      },
      {
        headerName: 'Nhận xét',
        field: 'comment',
        flex: 1,
        headerAlign: 'left',
        renderCell: (params) => (
          <>
            {params.value ? (
              <Box px={2} py={4} width={'100%'}>
                <Typography variant='body1' component={'i'} color='initial'>
                  {params.row.comment}
                </Typography>
                <Button
                  sx={{ float: 'right' }}
                  color='warning'
                  onClick={() =>
                    handleOpenComment(eventId, params.row.id, params.row.name, params.row.comment)
                  }
                >
                  Sửa nhận xét
                </Button>
              </Box>
            ) : (
              <Button
                sx={{ fontStyle: 'italic' }}
                onClick={() =>
                  handleOpenComment(eventId, params.row.id, params.row.name, params.row.comment)
                }
              >
                Chưa có nhận xét, thêm nhận xét
              </Button>
            )}
          </>
        ),
      },
    ],
    [],
  );
  return (
    <>
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
          width: '100%',
          height: 400,
          minHeight: '300px!important',
        }}
        rowHeight={70}
        columns={basicColumns}
        totalItems={totalItems}
        totalPages={totalPage}
        disableColumnFilter
        isPanigation={false}
        disableDensitySelector
        disableColumnMenu
        disableVirtualization
        disableColumnSelector
      />
      <CommentEventModal
        onClose={handleCloseComment}
        name={openComment.name}
        groupId={openComment.groupId}
        id={openComment.id}
        open={openComment.isOpen}
        oldComment={openComment.oldComment}
      />
    </>
  );
}

export default TableEdit;
