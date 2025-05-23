import Table from '@/components/ui/Table/Table';
import { statusOfDate } from '@/utils/validations/term.validation';
import { Icon } from '@iconify/react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useState } from 'react';
import EditGroupRegister from '../Modal/EditGroupRegister';
import EditInstruction from '../Modal/EditInstruction';
import EditPreviewTopic from '../Modal/EditPreviewTopic';
import EditPublicResult from '../Modal/EditPublicResult';
import EditTermDate from '../Modal/EditTermDate';
import EditTopicRegister from '../Modal/EditTopicRegister';
import EditTopicReport from '../Modal/EditTopicReport';
import TermDetail from '../Modal/TermDetail';

const checkStatusGroup = (startDate: any, endDate: any) => {
  let data: {
    mess: string;
    color: string;
  };
  if (startDate && endDate) {
    if (statusOfDate(startDate, endDate) === 'EXPIRED') data = { mess: 'Đã đóng', color: 'error' };
    else if (statusOfDate(startDate, endDate) === 'INACTIVE')
      data = { mess: 'Sắp diễn ra', color: 'primary' };
    else data = { mess: 'Đang mở', color: 'success.main' };
  } else {
    data = { mess: 'Chưa cập nhật', color: '' };
  }

  return (
    <Typography variant='body1' color={data.color}>
      {data.mess}
    </Typography>
  );
};

function TableManagamentTerm(props: any) {
  const { rows, totalItems, totalPages, page, handelChangePage, ...rest } = props;

  //Handle
  const [openModalEditTermDate, setOpenModalEditTermDate] = useState({
    isOpen: false,
    termId: 0,
  });
  const handleCloseEditTermDate = () => {
    setOpenModalEditTermDate({
      ...openModalEditTermDate,
      isOpen: false,
    });
  };
  const handleOpenEditTermDate = (termId: any) => {
    setOpenModalEditTermDate({
      termId,
      isOpen: true,
    });
  };

  //Handle
  const [openModalEditGroupRegister, setOpenModalEditGroupRegister] = useState({
    isOpen: false,
    termId: 0,
  });
  const handleCloseEditGroupRegister = () => {
    setOpenModalEditGroupRegister({
      ...openModalEditGroupRegister,
      isOpen: false,
    });
  };
  const handleOpenEditGroupRegister = (termId: any) => {
    setOpenModalEditGroupRegister({
      termId,
      isOpen: true,
    });
  };

  //Hanlde
  const [openModalEditTopicRegister, setOpenModalEditTopicRegister] = useState({
    isOpen: false,
    termId: 0,
  });
  const handleCloseEditTopicRegister = () => {
    setOpenModalEditTopicRegister({
      ...openModalEditTopicRegister,
      isOpen: false,
    });
  };
  const handleOpenEditTopicRegister = (termId: any) => {
    setOpenModalEditTopicRegister({ termId: termId, isOpen: true });
  };

  //Handle
  const [openModalPublicTopicRegister, setOpenModalPublicTopicRegister] = useState({
    isOpen: false,
    termId: 0,
  });
  const handleClosePublicTopicRegister = () => {
    setOpenModalPublicTopicRegister({
      ...openModalPublicTopicRegister,
      isOpen: false,
    });
  };
  const handleOpenPublicTopicRegister = (termId: any) => {
    setOpenModalPublicTopicRegister({ termId: termId, isOpen: true });
  };

  //Handle
  const [openModalInstruction, setOpenModalInstruction] = useState({
    isOpen: false,
    termId: 0,
  });

  const handleCloseInstruction = () => {
    setOpenModalInstruction({
      ...openModalInstruction,
      isOpen: false,
    });
  };

  const handleOpenInstruction = (termId: any) => {
    setOpenModalInstruction({ termId: termId, isOpen: true });
  };
  //Handle
  const [openModalTopicReport, setOpenModalTopicReport] = useState({
    isOpen: false,
    termId: 0,
  });

  const handleCloseTopicReport = () => {
    setOpenModalTopicReport({
      ...openModalTopicReport,
      isOpen: false,
    });
  };

  const handleOpenTopicReport = (termId: any) => {
    setOpenModalTopicReport({ termId: termId, isOpen: true });
  };

  //Handle
  const [openModalPublicResult, setOpenModalPublicResult] = useState({
    isOpen: false,
    termId: 0,
  });

  const handleClosePublicResult = () => {
    setOpenModalPublicResult({
      ...openModalPublicResult,
      isOpen: false,
    });
  };

  const handleOpenPublicResult = (termId: any) => {
    setOpenModalPublicResult({ termId: termId, isOpen: true });
  };
  const [openModalTermDetail, setOpenModalTermDetail] = useState({
    isOpen: false,
    termId: 0,
  });

  //handle
  const handleCloseTermDetail = () => {
    setOpenModalTermDetail({
      ...openModalTermDetail,
      isOpen: false,
    });
  };
  const handleOpenTermDetail = (termId: number) => {
    setOpenModalTermDetail({ termId, isOpen: true });
  };

  const basicColumns: GridColDef[] = [
    {
      headerName: 'Tên học kỳ',
      field: 'name',
      flex: 1.2,
      headerAlign: 'left',
      align: 'left',
    },

    {
      headerName: 'Thời gian học kỳ',
      field: 'startDate',
      flex: 1.7,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <>
            <Typography>{dayjs(params.row.startDate).format('DD/MM/YYYY')}</Typography>
            <Typography mx={4} component={'span'} variant='body1' color='initial'>
              {' '}
              -{' '}
            </Typography>
            <Typography>{dayjs(params.row.endDate).format('DD/MM/YYYY')}</Typography>
            <Tooltip title='Cập nhật thời gian học kì'>
              <IconButton
                onClick={() => handleOpenEditTermDate(params.row.id)}
                color='primary'
                size='small'
              >
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    {
      headerName: 'Đăng ký nhóm',
      field: 'name5',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4}>
            {checkStatusGroup(params.row.startChooseGroupDate, params.row.endChooseGroupDate)}
            <Tooltip
              onClick={() => handleOpenEditGroupRegister(params.row.id)}
              title='Cập nhật thời gian đăng ký nhóm'
            >
              <IconButton color='primary' size='small'>
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: 'Công bố đề tài',
      field: 'startPublicTopicDate',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4}>
            {checkStatusGroup(params.row.startPublicTopicDate, params.row.endPublicTopicDate)}
            <Tooltip
              onClick={() => handleOpenPublicTopicRegister(params.row.id)}
              title='Cập nhật thời gian công bố đề tài'
            >
              <IconButton color='primary' size='small'>
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: 'Đăng ký đề tài',
      field: 'startChooseTopicDate',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4}>
            {checkStatusGroup(params.row.startChooseTopicDate, params.row.endChooseTopicDate)}
            <Tooltip
              onClick={() => handleOpenEditTopicRegister(params.row.id)}
              title='Cập nhật thời gian đăng ký đề tài'
            >
              <IconButton color='primary' size='small'>
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: 'Phản biện',
      field: 'startDiscussionDate',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4}>
            {checkStatusGroup(params.row.startDiscussionDate, params.row.endDiscussionDate)}
            <Tooltip
              onClick={() => handleOpenEditTopicRegister(params.row.id)}
              title='Cập nhật thời gian phản biện'
            >
              <IconButton
                onClick={() => handleOpenInstruction(params.row.id)}
                color='primary'
                size='small'
              >
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: 'Báo cáo hội đồng/poster',
      field: 'startPublicResultDate',
      flex: 1.5,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4}>
            {checkStatusGroup(params.row.startReportDate, params.row.endReportDate)}
            <Tooltip
              onClick={() => handleOpenTopicReport(params.row.id)}
              title='Cập nhật thời gian báo cáo hội đồng/poster'
            >
              <IconButton color='primary' size='small'>
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: 'Công bố kết quả',
      field: 'name8',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Box display={'flex'} gap={4}>
            {checkStatusGroup(params.row.startPublicResultDate, params.row.endPublicResultDate)}
            <Tooltip
              onClick={() => handleOpenPublicResult(params.row.id)}
              title='Cập nhật thời gian công bố kết quả'
            >
              <IconButton
                onClick={() => handleOpenPublicResult(params.row.id)}
                color='primary'
                size='small'
              >
                <Icon icon='flat-color-icons:info' />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      headerName: 'Chức năng',
      field: 'feature',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={6}>
          <Tooltip
            onClick={() => {
              handleOpenTermDetail(params.row.id);
            }}
            title='Xem thông tin học kì'
          >
            <IconButton size='small'>
              <Icon width={20} icon='flat-color-icons:view-details' />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title='Xóa học kì'>
            <IconButton
              onClick={() => {
                handleOpenDeleteTermModal(params.row.id);
              }}
              size='small'
              color='error'
            >
              <Icon icon='mdi:trash' />
            </IconButton>
          </Tooltip> */}
        </Box>
      ),
    },
  ];
  return (
    <Box {...rest}>
      {' '}
      <Table
        rows={rows}
        sx={{
          bgcolor: 'white',
        }}
        minHeight={350}
        columns={basicColumns}
        totalItems={rows.length}
        isPanigation={false}
        handleChangePage={() => {}}
        disableColumnFilter
      />
      <EditTermDate
        termId={openModalEditTermDate.termId}
        open={openModalEditTermDate.isOpen}
        onClose={handleCloseEditTermDate}
      />
      <EditGroupRegister
        id={openModalEditGroupRegister.termId}
        open={openModalEditGroupRegister.isOpen}
        onClose={handleCloseEditGroupRegister}
        termId={openModalEditGroupRegister.termId}
      />
      <EditPreviewTopic
        id={openModalPublicTopicRegister.termId}
        termId={openModalPublicTopicRegister.termId}
        open={openModalPublicTopicRegister.isOpen}
        onClose={handleClosePublicTopicRegister}
      />
      <EditTopicRegister
        id={openModalEditTopicRegister.termId}
        termId={openModalEditTopicRegister.termId}
        open={openModalEditTopicRegister.isOpen}
        onClose={handleCloseEditTopicRegister}
      />
      <EditInstruction
        onClose={handleCloseInstruction}
        open={openModalInstruction.isOpen}
        termId={openModalInstruction.termId}
      />
      <EditTopicReport
        onClose={handleCloseTopicReport}
        open={openModalTopicReport.isOpen}
        termId={openModalTopicReport.termId}
      />
      <EditPublicResult
        open={openModalPublicResult.isOpen}
        termId={openModalPublicResult.termId}
        onClose={handleClosePublicResult}
      />
      {/* <DeleteModal onClose={handleCloseDeleteTermModal} open={openDeleteTermModal.isOpen} /> */}
      <TermDetail
        termId={openModalTermDetail.termId}
        onClose={handleCloseTermDetail}
        open={openModalTermDetail.isOpen}
      />
    </Box>
  );
}

export default TableManagamentTerm;
