import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { stripHtmlTags } from '@/utils/convertHtmlText';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import React from 'react';

function InfoModal(props: any) {
  const { onClose, open, topicId } = props;
  const { handleTopicById } = useTopic();
  const { data, isLoading } = handleTopicById(topicId);
  return (
    <Modal maxWidth={'md'} open={open} onClose={onClose}>
      <Box pb={5} px={10}>
        <TitleManager mb={10} variant='h6' icon='ion:document' textTransform={'uppercase'}>
          Thông tin chi tiết Đề tài
        </TitleManager>
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <Box>
            <CustomTextField
              label='Tên đề tài'
              value={data?.topic?.name}
              placeholder='Tên đề tài'
            />
            <CustomTextField
              value={data?.topic?.keywords}
              label='Từ khóa'
              name='keywords'
              placeholder='Từ khóa'
            />
            <Box display={'flex'} width={'100%'} gap={8}>
              <Box flex={1}>
                <CustomTextField
                  type='number'
                  value={data?.topic?.quantityGroupMax}
                  label='Số lượng nhóm sinh viên tối đa'
                  placeholder='Số lượng đề tài'
                />
              </Box>

              <Box flex={1}>
                <CustomTextField
                  sx={{ flex: 1 }}
                  label='Giảng viên phụ trách'
                  value={data?.topic?.lecturerTerm.lecturer.fullName}
                  placeholder='tên giảng viên'
                />
              </Box>
            </Box>
            <CustomTextField
              label='Mô tả đề tài'
              multiline
              value={stripHtmlTags(data?.topic?.description)}
              maxRows={8}
              placeholder='Nhập vào Mô tả đề tài'
            />

            <CustomTextField
              multiline
              value={stripHtmlTags(data?.topic?.expectedResult)}
              maxRows={8}
              label='Dự kiến sản phẩm nghiên cứu của Đề tài và khả năng ứng dụng'
              placeholder='Dự kiến sản phẩm nghiên cứu của Đề tài và khả năng ứng dụng'
            />
            <CustomTextField
              multiline
              value={stripHtmlTags(data?.topic?.target)}
              maxRows={8}
              label='Mục tiêu đề tài'
              placeholder='Mục tiêu đề tài'
            />
            <CustomTextField
              multiline
              maxRows={8}
              label='Yêu cầu đầu vào'
              value={stripHtmlTags(data?.topic?.requireInput)}
              placeholder='Yêu cầu đầu vào'
            />
            <CustomTextField
              multiline
              maxRows={10}
              label='Chuẩn đầu ra'
              value={stripHtmlTags(data?.topic?.standardOutput)}
              placeholder='Chuẩn đầu ra'
            />
            <CustomTextField
              multiline
              value={stripHtmlTags(data?.topic?.note)}
              maxRows={8}
              label='Ghi chú đề tài'
              placeholder='Ghi chú đề tài'
            />
            <Box mt={10} justifyContent={'end'} gap={8} display={'flex'}>
              <Button variant='contained' color='primary' onClick={onClose}>
                <Icon icon='mdi:close-outline' />
                Thoát
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default InfoModal;
