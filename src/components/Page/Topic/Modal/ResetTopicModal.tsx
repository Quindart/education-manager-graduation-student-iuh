import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useTopic } from '@/hooks/api/useQueryTopic';

function ResetTopicModal(props: any) {
  const { onClose, open, topicId, name } = props;
  const { onUpdateStatusTopic } = useTopic();
  const [note, setNote] = useState('Reset duyệt đề tài.');
  const { mutate: updateAccept } = onUpdateStatusTopic(topicId as string);
  const handleSubmit = () => {
    updateAccept({ status: 'PENDING', note: note });
    onClose();
  };
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
        <Box borderRadius='50%' padding={6} sx={{ background: 'rgba(255, 210, 49, 0.2)' }}>
          <Icon color='#F5AD3AD4' height={70} width={70} icon='material-symbols-light:refresh' />
        </Box>
        <Typography variant='h3' textAlign={'center'} mt={10} mb={14}>
          Bạn muốn Reset trạng thái của đề tài{' '}
          <Typography variant='h3' component={'span'} fontWeight={'bold'} color='primary.dark'>
            {name}
          </Typography>{' '}
          ?
        </Typography>
        <Box width={'100%'}>
          <CustomTextField
            placeholder='Lí do'
            onChange={(e) => setNote(e.target.value)}
            value={note}
            label='Lý do'
            multiline
            rows={4}
          />
        </Box>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '20%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button onClick={handleSubmit} sx={{ width: '80%' }} color='warning' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='material-symbols-light:refresh' />
            Reset
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default ResetTopicModal;
