import {
  getTermDetailWithType,
  getTermById,
  updateTermById,
  getAllTermByMajor,
  TypeTermStatus,
  getTermsByLecturer,
} from './../../services/apiTerm';
import { RootState } from '@/store';
import { createTerm, getAllTerm, getCurrentTerm, updateTermWithType } from '@/services/apiTerm';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAllTerm, setCurrentTerm } from '@/store/slice/term.slice';
import { useSnackbar } from 'notistack';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import { useMajor } from './useQueryMajor';
import { Term } from '@/types/entities/term';
import { useAuth } from './useAuth';
import { RoleCheck } from '@/types/enum';

export enum TermQueryKey {
  allTerm = 'allTerm',
  allTermWithMajor = 'allTermWithMajor',
  currentTerm = 'currentTerm',
  getTermDetailWithType = 'getTermDetailWithType',
  getTermDetailById = 'getTermDetailById',
  getTermsByLecturer = 'getTermsByLecturer',
}
export function useTerm() {
  const termStore = useSelector((state: RootState) => state.termSlice);
  const { majorStore } = useMajor();
  const { lecturerStore } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  //[GET ALL]
  const handleGetAllTerm = () => {
    return useQuery([TermQueryKey.allTerm], () => getAllTerm(), {
      onSuccess: (data) => {
        dispatch(setAllTerm(data.terms));
      },
      onError(err: any) {
        if (err.status < 500) enqueueSnackbar(err.message, { variant: 'error' });
        else enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' });
      },
    });
  };

  //[GET ALL]
  const handleGetAllTermByMajor = (majorId?: string) => {
    const majorIdCallApi = majorId ? majorId : majorStore.currentMajor.id;
    return useQuery(
      [TermQueryKey.allTermWithMajor, majorIdCallApi],
      () => getAllTermByMajor(majorIdCallApi),
      {
        onSuccess: (data) => {
          dispatch(setAllTerm([]));
          dispatch(setAllTerm(data.terms));
        },
      },
    );
  };

  //[GET CURRENT]
  const handleGetCurrentTerm = (majorId: string) => {
    return useQuery([TermQueryKey.currentTerm, majorId], () => getCurrentTerm(majorId), {
      onSuccess: (data) => {
        dispatch(setCurrentTerm(data.term));
      },
      enabled: !!majorId,
    });
  };
  const handleGetTermsByLecturer = () => {
    return useQuery([TermQueryKey.getTermsByLecturer], () => getTermsByLecturer());
  };

  //[GET BY ID]
  const handleGetTermById = (termId: string) => {
    return useQuery([TermQueryKey.getTermDetailById, termId], () => getTermById(termId), {
      enabled: !!termId,
    });
  };

  //[GET DETAIL WITH TYPE]
  const handleGetTermDetailWithType = (termId: string, type: TypeTermStatus) => {
    return useQuery(
      [TermQueryKey.getTermDetailById, type, termId],
      () => getTermDetailWithType(termId, type),
      {
        enabled: !!termId,
      },
    );
  };

  //[CREATE]
  const onCreateTerm = () => {
    return useMutation(
      (data: Pick<Term, 'startDate' | 'endDate' | 'name' | 'majorId'>) => createTerm(data),
      {
        onSuccess() {
          enqueueSnackbar('Tạo học kì mới thành công', { variant: 'success' });
          queryClient.invalidateQueries({
            queryKey: [TermQueryKey.allTermWithMajor, majorStore.currentMajor.id],
          });
        },
        onError(err: any) {
          if (err.status < 500) enqueueSnackbar(err.message, { variant: 'error' });
          else enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' });
        },
      },
    );
  };

  //[UPDATE WITH TYPE]
  const onUpdateTermWithType = (termId: string, type: TypeTermStatus) => {
    return useMutation(
      (data: Pick<Term, 'startDate' | 'endDate'>) => updateTermWithType(termId, type, data),
      {
        onSuccess() {
          enqueueSnackbar('Cập nhật trạng thái học kì thành công', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor] });
          queryClient.invalidateQueries({
            queryKey: [TermQueryKey.getTermDetailById, type, termId],
          });
        },
        onError(err: any) {
          if (err.status < 500) enqueueSnackbar(err.message, { variant: 'error' });
          else enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' });
        },
      },
    );
  };

  //[UPDATE WITH ID]
  const onUpdateTermWithTermId = (termId: string) => {
    return useMutation(
      (data: Pick<Term, 'startDate' | 'endDate'>) => updateTermById(termId, data),
      {
        onSuccess() {
          enqueueSnackbar('Cập nhật trạng thái học kì thành công', { variant: 'success' });
          queryClient.invalidateQueries({
            queryKey: [TermQueryKey.allTermWithMajor, majorStore.currentMajor.id],
          });
          queryClient.invalidateQueries({ queryKey: [TermQueryKey.getTermDetailById, termId] });
        },
        onError(err: any) {
          if (err.status < 500) enqueueSnackbar(err.message, { variant: 'error' });
          else enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' });
        },
      },
    );
  };

  return {
    termStore,
    handleGetTermById,
    handleGetTermsByLecturer,
    handleGetAllTerm,
    handleGetCurrentTerm,
    handleGetTermDetailWithType,
    onUpdateTermWithTermId,
    onCreateTerm,
    onUpdateTermWithType,
    handleGetAllTermByMajor,
  };
}
