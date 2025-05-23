import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Box } from '@mui/material';
import { useAuth } from '@/hooks/api/useAuth';
import Loading from '@/components/ui/Loading';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import BreadCrumbRouting from '@/components/ui/BreadCrumb';
import useSidebar from '@/hooks/ui/useSidebar';
import GlobalLoading from '@/components/ui/Loading/GlobalLoading';
import { useSnackbar } from 'notistack';
import { useMajor } from '@/hooks/api/useQueryMajor';

function MainLayout() {
  const { handleGetMe, lecturerStore } = useAuth();
  const { isLoading, isFetching } = handleGetMe();
  const { isOpen } = useSidebar();
  const { majorStore } = useMajor();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (majorStore?.currentMajor?.name)
      enqueueSnackbar(`Xin chào, bạn đang đăng nhập vào ngành ${majorStore.currentMajor.name}`, {
        variant: 'success',
      });
  }, [majorStore?.currentMajor]);
  return (
    <>
      {isLoading || isFetching ? (
        <Box>
          <Loading />
        </Box>
      ) : (
        <>
          {lecturerStore.currentRoleRender.length > 0 &&
          getValueFromLocalStorage('refreshToken') ? (
            <Box
              display='flex'
              sx={{
                height: '100%',
                overflowX: 'hidden',
              }}
            >
              <AdminSidebar />
              <Box
                height='100%'
                component='section'
                sx={{
                  maxWidth: '100vw',
                  width: '100%',
                  minHeight: '100vh',
                  backgroundColor: 'grey.100',
                }}
              >
                <Box
                  pt={12}
                  pb={6}
                  mt={20}
                  sx={{
                    height: '100%',
                    width: 'auto',
                    transition: 'all 0.2s ease-in',
                    marginLeft: isOpen ? '270px' : '90px',
                    marginRight: 10,
                  }}
                >
                  <Navbar />

                  <Box mt={8} mb={4}>
                    <BreadCrumbRouting />
                  </Box>
                  <React.Suspense fallback={<GlobalLoading />}>
                    <Outlet />
                  </React.Suspense>
                </Box>
              </Box>
            </Box>
          ) : (
            <Navigate to='/auth/role' />
          )}
        </>
      )}
    </>
  );
}

export default MainLayout;
