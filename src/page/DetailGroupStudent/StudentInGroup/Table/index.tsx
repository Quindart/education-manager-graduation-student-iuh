import SekeletonUI from '@/components/ui/Sekeleton';
import Table from '@/components/ui/Table/Table';
import { convertGroupMembersTable } from '@/utils/convertDataTable';
import { getStatusGroup, getStatusStudentStyle } from '@/utils/validations/groupStudent.validation';
import { Icon } from '@iconify/react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import EditStatusStudentTerm from '@/components/Page/DetailGroupStudent/Modal/EditStatus';
import StudentLeaveGroup from '@/components/Page/DetailGroupStudent/Modal/LeaveGroup';
import AddStudentModal from '@/components/Page/DetailGroupStudent/Modal/AddStudent';

function TableStudentInGroup({ members }: any) {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grStudentId = `${current[current.length - 1]}`;
  const { handleUiRender } = useGroupStudent();
  const currentRole = handleUiRender();

  const [openAddStudentModal, setOpenModalAddStudent] = useState(false);

  const handleOpenModalAddStudent = () => {
    setOpenModalAddStudent(true);
  };
  const handleCloseModalAddStudent = () => {
    setOpenModalAddStudent(false);
  };

  const [openStatusStudentModal, setOpenModalStatusStudent] = useState({
    isOpen: false,
    studentId: '',
    status: '',
  });
  const handleOpenModalStatusStudent = (studentId: string, status: string) => {
    setOpenModalStatusStudent({
      studentId: studentId,
      status: status,
      isOpen: true,
    });
  };
  const handleCloseModalStatusStudent = (studentId: string, status: string) => {
    setOpenModalStatusStudent((pre) => ({
      ...pre,
      isOpen: false,
    }));
  };
  const [openStudentLeaveGroup, setOpenStudentLeaveGroup] = useState({
    studentId: '',
    isOpen: false,
  });

  const handleCloseStudentLeaveGroup = () => {
    setOpenStudentLeaveGroup({ ...openStudentLeaveGroup, isOpen: false });
  };
  const handleOpenStudentLeaveGroup = (studentId: string) => {
    setOpenStudentLeaveGroup({ studentId: studentId, isOpen: true });
  };
  const basicColumns: GridColDef[] = [
    {
      headerName: 'Thông tin chung',
      field: 'name',
      flex: 1.5,
      headerAlign: 'left',
      renderCell: (params: any) => {
        return (
          <Box gap={2} display={'flex'} alignItems={'center'}>
            <Box>
              <Typography component={'span'} color='primary'>
                {params.row.isAdmin ? 'Trưởng Nhóm' : ''}
              </Typography>
              <Typography fontWeight={600} variant='body1'>
                {params.row.fullName}
              </Typography>

              <Typography>
                Mã SV: {'  '}
                <Typography component={'span'}>{params.row.username}</Typography>
              </Typography>
            </Box>
          </Box>
        );
      },
    },

    {
      headerName: 'Điểm Hướng dẫn',
      field: 'advisorScore',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
    },
    {
      headerName: 'Điểm Phản biện',
      field: 'reviewerScore',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
    },
    {
      headerName: 'Điểm Báo cáo',
      field: 'reportScore',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
    },
    {
      headerName: 'Điểm cộng',
      field: 'bonusScore',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
    },
    {
      headerName: 'Điểm Trung bình',
      field: 'totalAvgScore',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
    },
    {
      headerName: 'Tình trạng',
      field: 'abc',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => {
        return (
          <Box display={'flex'}>
            <Typography
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1,
                textAlign: 'center',
              }}
              color={getStatusStudentStyle(params.row.status)}
              bgcolor={getStatusStudentStyle(params.row.status)}
              variant='body1'
            >
              {getStatusGroup(params.row.status)}
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: '',
      field: 'name8',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Box display={'flex'} gap={2}>
          <Tooltip
            title='Cập nhật trạng thái sinh viên'
            onClick={() => handleOpenModalStatusStudent(params.row.studentId, params.row.status)}
          >
            <IconButton size='small'>
              <Icon width={20} style={{ color: '#1e4990' }} icon='mdi:user-edit' />
            </IconButton>
          </Tooltip>
          <Tooltip
            title='Xóa khỏi nhóm'
            onClick={() => handleOpenStudentLeaveGroup(params.row.studentId)}
          >
            <IconButton size='small' color='primary'>
              <Icon icon='clarity:remove-solid' style={{ color: '#d63b3b' }} width={20} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <>
      <Box>
        <Box>
          <Box display={'flex'} mt={6} mb={4} justifyContent={'end'}>
            <Button
              disabled={members.length >= 2}
              size='small'
              color='error'
              variant='contained'
              onClick={handleOpenModalAddStudent}
            >
              <Icon icon='material-symbols:add' width={16} style={{ marginRight: 4 }} />
              Thêm Sinh viên
            </Button>
          </Box>
          <Table
            rows={convertGroupMembersTable(members)}
            sx={{
              bgcolor: 'white',
            }}
            minHeight={350}
            rowHeight={80}
            columns={basicColumns}
            totalItems={members?.length}
            isPanigation={false}
            disableColumnFilter
          />
        </Box>
      </Box>
      <>
        <EditStatusStudentTerm
          open={openStatusStudentModal.isOpen}
          studentId={openStatusStudentModal.studentId}
          status={openStatusStudentModal.status}
          onClose={handleCloseModalStatusStudent}
        />
        <StudentLeaveGroup
          studentId={openStudentLeaveGroup.studentId}
          open={openStudentLeaveGroup.isOpen}
          onClose={handleCloseStudentLeaveGroup}
        />
        <AddStudentModal
          groupStudentId={grStudentId}
          onClose={handleCloseModalAddStudent}
          open={openAddStudentModal}
        />
      </>
    </>
  );
}

export default TableStudentInGroup;
