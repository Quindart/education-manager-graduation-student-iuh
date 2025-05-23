import { MajorResponse } from './../../types/entities/major';
import {
  createMajor,
  deleteMajor,
  getAllMajor,
  getMajorById,
  updateMajor,
} from '@/services/apiMajor';
import { RootState } from '@/store';
import { setAllMajor } from '@/store/slice/major.slice';
import Major from '@/types/entities/major';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { queryClient } from '@/providers/ReactQueryClientProvider';

export enum QueryKeysMajor {
  getAllMajor = 'getAllMajor',
  getMajorById = 'getMajorById',
  getMajorsRender = 'getMajorsRender',
}

export const useMajor = () => {
  const majorStore = useSelector((state: RootState) => state.majorSlice);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  //[GET RENDER]
  const handleGetAllMajorsRender = () => {
    return useQuery([QueryKeysMajor.getAllMajor], () => getAllMajor(), {
      onSuccess(data: MajorResponse) {
        dispatch(setAllMajor(data.majors));
      },
    });
  };
  //[GET ALL]
  const handleGetAllMajor = () => {
    return useQuery([QueryKeysMajor.getAllMajor], () => getAllMajor(), {
      onSuccess(data: Pick<MajorResponse, 'majors'>) {
        dispatch(setAllMajor(data.majors));
      },
    });
  };
  //[GET ALL]
  const handleGetMajorById = (id: string) => {
    return useQuery([QueryKeysMajor.getMajorById, id], () => getMajorById(id), {
      onSuccess(data: Pick<MajorResponse, 'major' | 'message' | 'success'>) {
        // dispatch(setAllMajor(data.major))
      },
    });
  };

  //[CREATE]
  const onCreateMajor = () => {
    return useMutation((data: Pick<Major, 'name'>) => createMajor(data), {
      onSuccess: (data: any) => {
        if (data.success) {
          enqueueSnackbar('Thêm chuyên ngành thành công', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: [QueryKeysMajor.getAllMajor] });
        }
      },
      onError(err: any) {
        if (err.status < 500) enqueueSnackbar(err.message, { variant: 'error' });
        else enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' });
      },
    });
  };

  //[UPDATE]
  const onUpdateMajor = (id: string) => {
    return useMutation((data: Pick<Major, 'name'>) => updateMajor(id, data), {
      onSuccess: (data: any) => {
        if (data.success) {
          enqueueSnackbar('Cập nhật chuyên ngành thành công', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: [QueryKeysMajor.getMajorById, id] });
          queryClient.invalidateQueries({ queryKey: [QueryKeysMajor.getAllMajor] });
        }
      },
      onError(err: any) {
        if (err.status < 500) enqueueSnackbar(err.message, { variant: 'error' });
        else enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' });
      },
    });
  };
  //[UPDATE]
  const onDeleteMajor = (id: string) => {
    return useMutation(() => deleteMajor(id), {
      onSuccess: (data: any) => {
        if (data.success) {
          enqueueSnackbar('Xóa chuyên ngành thành công', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: [QueryKeysMajor.getAllMajor] });
        }
      },
      onError(err: any) {
        if (err.status < 500) enqueueSnackbar(err.message, { variant: 'error' });
        else enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' });
      },
    });
  };
  return {
    handleGetAllMajor,
    handleGetAllMajorsRender,
    handleGetMajorById,
    onCreateMajor,
    onUpdateMajor,
    onDeleteMajor,
    majorStore,
  };
};
