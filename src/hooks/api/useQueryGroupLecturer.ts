import { queryClient } from '@/providers/ReactQueryClientProvider';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from 'react-query';
import { useTerm } from './useQueryTerm';
import { useAuth } from './useAuth';
import { RoleCheck } from '@/types/enum';
import * as GroupLecturerServices from '@/services/apiGroupLecturer';

export enum QueryKeysGroupLecturer {
  getAllGroupLecturerByTypeGroup = 'getAllGroupLecturerByTypeGroup',
  getLecturerNoGroupByTypeGroup = 'getLecturerNoGroupByTypeGroup',
  getGroupLecturerByLecturerId = 'getGroupLecturerByLecturerId',
  getCountOfGroupLecturer = 'getCountOfGroupLecturer',
  getGroupLecturerById = 'getGroupLecturerById',
  managerActionGroupLecturer = 'managerActionGroupLecturer',
  createGroupLecturer = 'createGroupLecturer',
  searchGroupLecturerByField = 'searchGroupLecturerByField',
  searchGroupLecturerByName = 'searchGroupLecturerByName',
}

export const useGroupLecturer = () => {
  //[REDUX]
  const { termStore } = useTerm();
  const { lecturerStore } = useAuth();
  const termId = termStore.currentTerm.id;

  //[OTHER]
  const { enqueueSnackbar } = useSnackbar();

  //[GET]
  const handleGetCountOfGroupLecturer = () => {
    return useQuery(
      [QueryKeysGroupLecturer.getCountOfGroupLecturer, termId],
      () => GroupLecturerServices.getCountOfGroupLecturer(termId),
      {
        staleTime: 1000 * 60 * 20,
      },
    );
  };

  //[UI]
  const handleUiRender = (): string[] => {
    const currentRole = lecturerStore.currentRoleRender;
    var permissions: string[] = [];
    if (currentRole === RoleCheck.HEAD_LECTURER || currentRole === RoleCheck.HEAD_COURSE) {
      permissions.push('all');
      permissions.push('crud');
    } else if (currentRole === RoleCheck.LECTURER) {
      permissions.push('crud');
    } else {
      permissions.push('readOnly');
    }
    return permissions;
  };

  //[GET]
  const handleGetAllGroupLecturerByTypeGroup = (type: string) => {
    const termId = termStore.currentTerm.id;
    return useQuery([QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, type, termId], () =>
      GroupLecturerServices.getGroupLecturerByType(termId, type),
    );
  };

  //[GET]
  const handleGetLecturerNoGroupByTypeGroup = (type: string) => {
    const termId = termStore.currentTerm.id;
    return useQuery([QueryKeysGroupLecturer.getLecturerNoGroupByTypeGroup, type, termId], () =>
      GroupLecturerServices.getLecturerNoGroupByTypeGroup(type, termId),
    );
  };
  const handleGetGroupLecturerSearchByName = (name: string) => {
    return useQuery([QueryKeysGroupLecturer.searchGroupLecturerByName, termId, name], () =>
      GroupLecturerServices.searchGroupLecturerByName(termId, name),
    );
  };

  //[GET]
  const handleGetGroupLecturerByLecturerId = (type?: string, lecturerId?: string) => {
    const termId = termStore.currentTerm.id;
    const lecturerIdToSend = lecturerId ? lecturerId : lecturerStore.me.user.id;
    return useQuery(
      [QueryKeysGroupLecturer.getGroupLecturerByLecturerId, termId, lecturerId, type],
      () => GroupLecturerServices.getGroupLecturerByLecturerId(termId, lecturerIdToSend, type),
      {
        enabled: !!lecturerIdToSend,
        refetchOnMount: true,
      },
    );
  };

  //[GET]
  const handleGetGroupLecturerById = (id: string) => {
    return useQuery(
      [QueryKeysGroupLecturer.getGroupLecturerById, id],
      () => GroupLecturerServices.getGroupLecturerById(id),
      {
        enabled: !!id,
        refetchOnMount: true,
      },
    );
  };

  //[POST]
  const onCreateGroupLecturer = (type: string) => {
    return useMutation((data: any) => GroupLecturerServices.createGroupLecturer(type, data), {
      onSuccess: () => {
        enqueueSnackbar('Tạo nhóm Giảng viên thành công', { variant: 'success' });
        queryClient.invalidateQueries({
          queryKey: [
            QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup,
            type,
            termStore.currentTerm.id,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            QueryKeysGroupLecturer.getLecturerNoGroupByTypeGroup,
            type,
            termStore.currentTerm.id,
          ],
        });
        queryClient.invalidateQueries(QueryKeysGroupLecturer.getGroupLecturerById);
        queryClient.invalidateQueries(QueryKeysGroupLecturer.getGroupLecturerByLecturerId);
      },
      onError(err: any) {
        if (err.status < 500) {
          enqueueSnackbar(err.message, { variant: 'error' });
        } else enqueueSnackbar('Tạo nhóm thất bại', { variant: 'warning' });
      },
    });
  };

  const onUpdateTimeAndLocation = () => {
    return useMutation(
      (data: { id: string; startDate: string; endDate: string; location: string }) =>
        GroupLecturerServices.updateGroupLecturerTimeAndLocation(data.id, data),
      {
        onSuccess: () => {
          enqueueSnackbar('Cập nhật thời gian và địa điểm thành công', { variant: 'success' });
          queryClient.invalidateQueries(QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup);
          queryClient.invalidateQueries(QueryKeysGroupLecturer.getLecturerNoGroupByTypeGroup);
          queryClient.invalidateQueries(QueryKeysGroupLecturer.getGroupLecturerById);
          queryClient.invalidateQueries(QueryKeysGroupLecturer.getGroupLecturerByLecturerId);
        },
        onError(err: any) {
          if (err.status < 500) {
            enqueueSnackbar(err.message, { variant: 'error' });
          } else enqueueSnackbar('Cập nhật thời gian và địa điểm thất bại', { variant: 'warning' });
        },
      },
    );
  };
  const onDeleteGroupLecturer = () => {
    return useMutation((id: string) => GroupLecturerServices.deleteGroupLecturerById(id), {
      onSuccess: () => {
        enqueueSnackbar('Xóa nhóm giảng viên thành công', { variant: 'success' });
        queryClient.invalidateQueries(QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup);
        queryClient.invalidateQueries(QueryKeysGroupLecturer.getLecturerNoGroupByTypeGroup);
        queryClient.invalidateQueries(QueryKeysGroupLecturer.getGroupLecturerById);
        queryClient.invalidateQueries(QueryKeysGroupLecturer.getGroupLecturerByLecturerId);
      },
      onError(err: any) {
        if (err.status < 500) {
          enqueueSnackbar(err.message, { variant: 'error' });
        } else enqueueSnackbar('Xóa nhóm thất bại', { variant: 'warning' });
      },
    });
  };

  return {
    handleGetCountOfGroupLecturer,
    handleGetGroupLecturerSearchByName,
    handleGetLecturerNoGroupByTypeGroup,
    handleGetAllGroupLecturerByTypeGroup,
    handleGetGroupLecturerById,
    handleGetGroupLecturerByLecturerId,
    handleUiRender,
    onUpdateTimeAndLocation,
    onCreateGroupLecturer,
    onDeleteGroupLecturer,
  };
};
