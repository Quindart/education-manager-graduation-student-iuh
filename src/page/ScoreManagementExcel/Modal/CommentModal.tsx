import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import useComment from '@/hooks/api/useQueryComment';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';

function CommentModal(props: any) {
  const { onClose, open, type, groupId, topicName, groupName } = props;
  const [comment, setComment] = useState<string>('Chưa có nhận xét');
  const [commentId, setCommentId] = useState<string>(null);
  const { onCreateComment, onUpdateComment, handleGetComment } = useComment();
  const { mutate: handleCreateComment, isSuccess: successCreateComment } = onCreateComment();
  const { mutate: handleUpdateComment, isSuccess: successUpdatecomment } = onUpdateComment();
  const { data: fetchComment, isSuccess: successFetchComment } = handleGetComment(type, groupId);
  useLayoutEffect(() => {
    if (fetchComment) {
      setComment(
        `${fetchComment?.comment?.content ? fetchComment?.comment?.content : 'Chưa có nhận xét'}`,
      );
      setCommentId(`${fetchComment?.comment?.id}`);
    }
  }, [groupId, fetchComment]);

  useEffect(() => {
    if (successUpdatecomment || successUpdatecomment) {
      onClose();
    }
  }, [successUpdatecomment, successCreateComment]);
  return (
    <Modal onClose={onClose} open={open}>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={10}
        py={12}
      >
        <Box borderRadius='50%' padding={6} sx={{ background: 'rgba(49, 128, 255, 0.2)' }}>
          <Icon
            color='#0F4C9BD4'
            height={70}
            width={70}
            icon='material-symbols:mode-comment-outline-sharp'
          />
        </Box>
        <Typography variant='h5' textAlign={'center'} mt={10} mb={14}>
          <Typography variant='h3' fontWeight={'500'} color='primary.main'>
            {' '}
            Nhóm {groupName} {topicName}
          </Typography>
        </Typography>
        <Box width={'100%'}>
          <CustomTextField
            placeholder='Nội dung nhận xét'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            label='Nội dung nhận xét'
            multiline
            rows={4}
          />
        </Box>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            sx={{ width: '50%' }}
            onClick={() => {
              !fetchComment?.comment?.id
                ? handleCreateComment({
                    type: type,
                    groupStudentId: groupId,
                    content: comment,
                  })
                : handleUpdateComment({
                    id: commentId,
                    content: comment,
                  });
            }}
            color='success'
            variant='contained'
          >
            <Icon width={20} style={{ marginRight: 4 }} icon='subway:tick' />
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default CommentModal;
