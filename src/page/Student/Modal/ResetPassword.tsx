import Modal from '@/components/ui/Modal';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';

function ResetPassword(props: any) {
  const { onClose, open, studentId, name } = props;
  const { onResetPassword } = useStudent();
  const { mutate: reset, isSuccess } = onResetPassword();
  const handleSubmit = () => {
    reset(studentId);
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={10}
        py={12}
      >
        <Box borderRadius='50%' padding={10} sx={{ background: 'rgba(49, 155, 255, 0.2)' }}>
          <Icon color='#094f7482' height={70} width={70} icon='teenyicons:key-outline' />{' '}
        </Box>
        <Typography variant='h3' textAlign={'center'} mt={10}>
          Cấp lại mật khẩu cho sinh viên{' '}
          <Typography variant='h6' component={'span'} fontWeight={'bold'} color='success.main'>
            {' '}
            {name}
          </Typography>{' '}
          ?
        </Typography>
        <Typography variant='body1' color='error.main' mb={14}>
          *Lưu ý: mật khẩu cấp lại mặc định sẽ là: 12345678
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '20%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            type='submit'
            onClick={handleSubmit}
            sx={{ width: '80%' }}
            color='success'
            variant='contained'
          >
            <Icon width={20} style={{ marginRight: 4 }} icon='teenyicons:key-outline' />
            Cấp lại mật khẩu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ResetPassword;
