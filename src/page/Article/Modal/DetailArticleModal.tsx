import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import useArticle from '@/hooks/api/useQueryArticle';
import { env } from '@/utils/env';
import { Icon } from '@iconify/react';
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';
import TitleManager from '@/components/ui/Title';
import dayjs from 'dayjs';

function DetailArticleModal({ open, onClose, articleId }) {
  const { handleGetArticleById } = useArticle();
  const { data: fetchArticle, isLoading } = handleGetArticleById(articleId);

  return (
    <Modal maxWidth={'md'} open={open} onClose={onClose}>
      <DialogTitle>
        <TitleManager
          textTransform={'uppercase'}
          variant='h2'
          icon='hugeicons:quill-write-02'
          color='primary'
        >
          Chi tiết bài báo
        </TitleManager>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <></>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {' '}
            <CustomTextField
              value={dayjs(fetchArticle?.article.date).format('DD/MM/YYYY') || ''}
              label='Ngày đăng báo'
            />
            <CustomTextField value={fetchArticle?.article.name} label='Tên bài báo' />
            <CustomTextField value={fetchArticle?.article.author} label='Các tác giả chính' />
            <CustomTextField value={fetchArticle?.article.bonusScore} label='Điểm cộng' />
            <Box sx={{ display: 'flex', gap: 10 }}>
              <CustomTextField value={fetchArticle?.article.username} label='Mã sinh viên ' />
              <Box flex={1}>
                <CustomTextField value={fetchArticle?.article.fullName} label='Người nộp' />
              </Box>
            </Box>
            <Typography
              component={'a'}
              my={10}
              href={`${env.API_URL}${fetchArticle?.article.link}`}
              target='_blank'
              variant='body1'
              color='primary'
            >
              <Icon width={30} color='red' icon='dashicons:pdf' />
              Xem minh chứng
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Modal>
  );
}

export default DetailArticleModal;
