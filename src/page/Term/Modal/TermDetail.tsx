import DateTimeCalendar from '@/components/ui/Calendar/DateTimeCalendar';
import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import React from 'react';

function TermDetail(props: any) {
  const { onClose, open, termId } = props;
  const { handleGetTermById } = useTerm();
  const { data, isLoading, isFetching } = handleGetTermById(termId);
  return (
    <Modal open={open} onClose={onClose}>
      <Box pb={5} px={10}>
        <TitleManager
          mb={10}
          variant='h6'
          icon='ant-design:field-time-outlined'
          textTransform={'uppercase'}
        >
          Thông tin chi tiết học kỳ
        </TitleManager>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <Formik
            onSubmit={() => {}}
            initialValues={{
              name: `${data?.term ? data?.term?.name : ''}`,
              startDate: data?.term?.startDate,
              endDate: data?.term?.endDate,
              startChooseGroupDate: data?.term?.startChooseGroupDate,
              endChooseGroupDate: data?.term?.endChooseGroupDate,
              startPublicTopicDate: data?.term?.startPublicTopicDate,
              endPublicTopicDate: data?.term?.endPublicTopicDate,
              startChooseTopicDate: data?.term?.startChooseTopicDate,
              endChooseTopicDate: data?.term?.endChooseTopicDate,
              startDiscussionDate: data?.term?.endChooseTopicDate,
              endDiscussionDate: data?.term?.endDiscussionDate,
              startReportDate: data?.term?.startReportDate,
              endReportDate: data?.term?.endReportDate,
              startPublicResultDate: data?.term?.startPublicResultDate,
              endPublicResultDate: data?.term?.endPublicResultDate,
            }}
          >
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <CustomTextField label='Tên học kì' value={values.name} placeholder='Tên học kì' />
                <Box gap={10} display={'flex'} mt={6}>
                  <Box flex={1}>
                    <DateTimeCalendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Thời gian bắt đầu'
                      name='startDate'
                      format='DD/MM/YYYY hh:mm:ss A'
                      value={dayjs(values.startDate)}
                      disabled
                    />
                  </Box>
                  <Box flex={1}>
                    <DateTimeCalendar
                      sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                      label='Thời gian kết thúc'
                      name='endDate'
                      format='DD/MM/YYYY hh:mm:ss A'
                      value={dayjs(values.endDate)}
                      disabled
                    />
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'} fontStyle={'italic'}>
                      Đăng ký nhóm
                    </Typography>
                  </Box>
                  <Box gap={10} display={'flex'} mt={6}>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian bắt đầu'
                        name='startChooseGroupDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.startChooseGroupDate)}
                        disabled
                      />
                    </Box>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian kết thúc'
                        name='endChooseGroupDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.endChooseGroupDate)}
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'} fontStyle={'italic'}>
                      Công bố đề tài
                    </Typography>
                  </Box>
                  <Box gap={10} display={'flex'} mt={6}>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian bắt đầu'
                        name='startPublicTopicDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.startPublicTopicDate)}
                        disabled
                      />
                    </Box>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian kết thúc'
                        name='endPublicTopicDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.endPublicTopicDate)}
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'} fontStyle={'italic'}>
                      Đăng ký đề tài
                    </Typography>
                  </Box>
                  <Box gap={10} display={'flex'} mt={6}>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian bắt đầu'
                        name='startChooseTopicDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.startChooseTopicDate)}
                        disabled
                      />
                    </Box>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian kết thúc'
                        name='endChooseTopicDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.endChooseTopicDate)}
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'} fontStyle={'italic'}>
                      Phản biện
                    </Typography>
                  </Box>
                  <Box gap={10} display={'flex'} mt={6}>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian bắt đầu'
                        name='startDiscussionDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.startDiscussionDate)}
                        disabled
                      />
                    </Box>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian kết thúc'
                        name='endDiscussionDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.endDiscussionDate)}
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'} fontStyle={'italic'}>
                      Báo cáo hội đồng/poster
                    </Typography>
                  </Box>
                  <Box gap={10} display={'flex'} mt={6}>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian bắt đầu'
                        name='startReportDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.startReportDate)}
                        disabled
                      />
                    </Box>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian kết thúc'
                        name='endReportDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.endReportDate)}
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>
                <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant='h5' fontWeight={'bold'} fontStyle={'italic'}>
                      Công bố kết quả
                    </Typography>
                  </Box>
                  <Box gap={10} display={'flex'} mt={6}>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian bắt đầu'
                        name='startPublicResultDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.startPublicResultDate)}
                        disabled
                      />
                    </Box>
                    <Box flex={1}>
                      <DateTimeCalendar
                        sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                        label='Thời gian kết thúc'
                        name='endPublicResultDate'
                        format='DD/MM/YYYY hh:mm:ss A'
                        value={dayjs(values.endPublicResultDate)}
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>
                <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                  <Button variant='contained' color='primary' onClick={onClose}>
                    <Icon icon='mdi:close-outline' />
                    Thoát
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

export default React.memo(TermDetail);
