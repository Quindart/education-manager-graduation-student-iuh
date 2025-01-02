import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from 'react-query';
import * as CommentService from '@/services/apiComment';
import { useTerm } from './useQueryTerm';
import { queryClient } from '@/providers/ReactQueryClientProvider';
enum QueryKeysComment {
  GET_COMMENT_BY_GROUP_STUDENT = 'getCommentByGroupStudent',
}
function useComment() {
  const { termStore } = useTerm();
  const termId = termStore.currentTerm.id;
  const { enqueueSnackbar } = useSnackbar();
  const handleGetComment = (type: string, groupStudentId: string) => {
    return useQuery(
      [QueryKeysComment.GET_COMMENT_BY_GROUP_STUDENT, type, termId, groupStudentId],
      () => CommentService.getCommentById(termId, type, groupStudentId),
      {
        refetchOnMount: true,
      },
    );
  };
  const onCreateComment = () => {
    return useMutation(
      (data: { type: string; groupStudentId: string; content: string }) =>
        CommentService.createComment(termId, data.type, data.groupStudentId, data.content),
      {
        onSuccess: (data) => {
          if (data.success === true) {
            queryClient.invalidateQueries(QueryKeysComment.GET_COMMENT_BY_GROUP_STUDENT);
            enqueueSnackbar('Nhận xét thành công', { variant: 'success' });
          } else {
            enqueueSnackbar('Nhận xét thất bại', { variant: 'error' });
          }
        },
      },
    );
  };
  const onUpdateComment = () => {
    return useMutation(
      (data: { id: string; content: string }) =>
        CommentService.updateComment(data.id, data.content),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(QueryKeysComment.GET_COMMENT_BY_GROUP_STUDENT);
          if (data.success === true) {
            enqueueSnackbar('Cập nhật nhận xét thành công', { variant: 'success' });
          } else {
            enqueueSnackbar('Nhận xét thất bại', { variant: 'error' });
          }
        },
      },
    );
  };
  return {
    handleGetComment,
    onUpdateComment,
    onCreateComment,
  };
}

export default useComment;
