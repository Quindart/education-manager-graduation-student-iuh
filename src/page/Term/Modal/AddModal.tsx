import DateTimeCalendar from '@/components/ui/Calendar/DateTimeCalendar';
import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import React from 'react';
import { validationTermSchema } from '../context';

function AddModal(props: any) {
  const { onClose, open } = props;
  const { onCreateTerm } = useTerm();
  const { mutate: createTerm, isLoading } = onCreateTerm();
  const { majorStore } = useMajor();
  const handleSubmitTerm = (values: any) => {
    createTerm({
      name: values.name,
      majorId: values.majorId,
      startDate: dayjs(values.startDate).format('YYYY-MM-DD HH:mm:ss'),
      endDate: dayjs(values.endDate).format('YYYY-MM-DD HH:mm:ss'),
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box pb={5} px={10}>
        <TitleManager
          mb={10}
          variant='h6'
          icon='ant-design:field-time-outlined'
          textTransform={'uppercase'}
        >
          Tạo học kì mới
        </TitleManager>
        {isLoading ? (
          <Box height={300} my={'auto'} mx={'auto'}>
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            validationSchema={validationTermSchema}
            onSubmit={(values) => handleSubmitTerm(values)}
            initialValues={{
              name: '',
              majorId: majorStore.currentMajor.id,
              startDate: null,
              endDate: null,
            }}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleSubmit,
              handleBlur,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit}>
                <CustomTextField
                  label='Tên học kì'
                  required={true}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name ? true : false}
                  helperText={errors.name}
                  name='name'
                  placeholder='VD: HK1_2023-2024'
                />
                <CustomTextField
                  label='Chuyên ngành'
                  required={true}
                  value={majorStore.currentMajor.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled
                  name='name'
                />
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
                      error={touched.endDate && errors.endDate ? true : false}
                    />
                  </Box>
                </Box>
                <Box justifyContent={'end'} gap={4} display={'flex'} mt={10}>
                  <Button type='submit' variant='contained' color='primary' onClick={onClose}>
                    <Icon width={20} icon='mdi:close-outline' />
                    Hủy
                  </Button>
                  <Button variant='contained' color='success' type='submit'>
                    <Icon width={20} icon='material-symbols:save-outline' />
                    Lưu
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

export default React.memo(AddModal);
