import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress, Switch, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { validationTermGroupSchema } from '../context';
import dayjs from 'dayjs';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { TypeTermStatus } from '@/services/apiTerm';
import DateTimeCalendar from '@/components/ui/Calendar/DateTimeCalendar';

function EditInstruction(props: any) {
  const { onClose, open, termId } = props;
  const { handleGetTermDetailWithType, onUpdateTermWithType } = useTerm();
  const { mutate: updateTerm, isLoading: loadingUpdate } = onUpdateTermWithType(
    termId,
    TypeTermStatus.DISCUSSION,
  );

  const {
    data,
    isLoading: loadingDetail,
    isSuccess: successDetail,
    isFetching,
  } = handleGetTermDetailWithType(termId, TypeTermStatus.DISCUSSION);
  const [isCheckedOpenGroup, setCheckedOpenGroup] = useState(true);

  const handleChangeStatusInstruction = () => {
    setCheckedOpenGroup(!isCheckedOpenGroup);
  };

  const handleSubmit = (data: any) => {
    updateTerm({
      startDate: dayjs(data.startDate.$d).format('YYYY-MM-DD HH:mm:ss'),
      endDate: dayjs(data.endDate.$d).format('YYYY-MM-DD HH:mm:ss'),
    });
    handleClose();
  };

  const handleClose = () => {
    onClose();
    if (data?.termDetail) {
      const checked: boolean =
        dayjs(data.termDetail.startDate).diff() <= 0 && dayjs(data.termDetail.endDate).diff() >= 0;
      setCheckedOpenGroup(checked);
    }
  };

  useEffect(() => {
    if (data?.termDetail) {
      const checked: boolean =
        dayjs(data.termDetail.startDate).diff() <= 0 && dayjs(data.termDetail.endDate).diff() >= 0;
      setCheckedOpenGroup(checked);
    }
  }, [successDetail, isFetching]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box px={10}>
        <TitleManager
          mb={10}
          variant='h6'
          icon='ant-design:field-time-outlined'
          textTransform={'uppercase'}
        >
          Cập nhật thời gian phản biện
        </TitleManager>
        {loadingDetail || isFetching ? (
          <Box
            justifyContent={'center'}
            display={'flex'}
            alignItems={'center'}
            width={'100%'}
            height={200}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            key={termId}
            onSubmit={(values: any) => handleSubmit(values)}
            validationSchema={validationTermGroupSchema}
            initialValues={{
              startDate: data?.termDetail.startDate ? dayjs(data?.termDetail.startDate) : null,
              endDate: data?.termDetail.endDate ? dayjs(data?.termDetail.endDate) : null,
            }}
          >
            {({ touched, values, handleSubmit, errors, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box gap={10} display={'flex'} mt={6}>
                  <Box flex={1}>
                    <DateTimeCalendar
                      onChange={(value) => {
                        setFieldValue('startDate', value);
                      }}
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Thời gian bắt đầu'
                      name='startDate'
                      format='DD/MM/YYYY hh:mm:ss A'
                      value={values.startDate}
                      disabled={!isCheckedOpenGroup}
                      error={touched.startDate && errors.startDate ? true : false}
                    />
                  </Box>
                  <Box flex={1}>
                    <DateTimeCalendar
                      onChange={(value) => {
                        setFieldValue('endDate', value);
                      }}
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Thời gian kết thúc'
                      name='endDate'
                      format='DD/MM/YYYY hh:mm:ss A'
                      value={values.endDate}
                      disabled={!isCheckedOpenGroup}
                      error={touched.endDate && errors.endDate ? true : false}
                    />
                  </Box>
                </Box>
                <Box mt={6}>
                  <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
                    Trạng thái
                  </Typography>
                  <Switch
                    onChange={() => {
                      handleChangeStatusInstruction();
                      setFieldValue('endDate', dayjs());
                    }}
                    checked={isCheckedOpenGroup}
                    color='success'
                  />
                  <Typography
                    component={'span'}
                    variant='h6'
                    color={isCheckedOpenGroup ? 'primary' : 'error'}
                  >
                    {isCheckedOpenGroup ? 'Đang mở' : 'Đã đóng hoặc Sắp diễn ra'}
                  </Typography>
                </Box>
                <Box mt={20} mb={6} justifyContent={'end'} gap={8} display={'flex'}>
                  <Button variant='contained' color='primary' onClick={handleClose}>
                    <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
                    Hủy
                  </Button>
                  <Button variant='contained' color='success' type='submit'>
                    <Icon width={20} icon='material-symbols:save-outline' />
                    Lưu
                    {loadingUpdate && (
                      <CircularProgress
                        size={'small'}
                        sx={{ width: 20, height: 20, color: 'white' }}
                      />
                    )}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </Modal>
  );
}

export default React.memo(EditInstruction);
