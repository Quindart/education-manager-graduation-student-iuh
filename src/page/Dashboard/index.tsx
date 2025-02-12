import DashboardOfAdmin from '@/components/Page/Dashboard/Admin';
import EventManagement from '@/components/Page/Dashboard/EventManagement';
import DashboardOfLecturer from '@/components/Page/Dashboard/Lecturer';
import { useAuth } from '@/hooks/api/useAuth';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { RoleCheck } from '@/types/enum';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';

function DashBoardTemplate() {
  const { lecturerStore } = useAuth();
  const currentRole = lecturerStore.currentRoleRender;

  return <>{currentRole === RoleCheck.LECTURER ? <DashboardOfLecturer /> : <DashboardOfAdmin />}</>;
}

export default DashBoardTemplate;
