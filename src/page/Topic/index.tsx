import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import TableManagamentTopic from './Table';
import HeaderTopic from './Header';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import SekeletonUI from '@/components/ui/Sekeleton';
import useParams from '@/hooks/ui/useParams';
import { useDispatch } from 'react-redux';
import { setParamTotalPage } from '@/store/slice/topic.slice';
import { GridCellModes } from '@mui/x-data-grid';
import { useMajor } from '@/hooks/api/useQueryMajor';

function TopicPage() {
  const dispatch = useDispatch();
  const { majorStore } = useMajor();
  const { handleSearchTopic, paramTotalPage, handleGetCountOfTopic } = useTopic();

  //[FETCH]
  const { data, isLoading, refetch } = handleSearchTopic();
  const { data: countFetch, isSuccess: countSuccess } = handleGetCountOfTopic();

  //[PARAMS]
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const { setLimit, setPage, getQueryField, setTotalPage } = useParams();
  //[CHANGE PARAMS]
  const handleChangePage = (value: number) => {
    setCurrentPage(value);
  };
  const handleChangeLimit = (value: number) => {
    setCurrentLimit(value);
  };

  useEffect(() => {
    setLimit(currentLimit);
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLimit(currentLimit);
    refetch();
  }, [currentLimit]);
  useEffect(() => {
    if (data !== null) {
      const total = data ? data.params.totalPage : 0;
      dispatch(setParamTotalPage(total));
      setTotalPage(total);
    }
  }, [data]);

  useEffect(() => {
    setLimit(currentLimit);
    setPage(1);
    if (getQueryField('keywords') === '') {
      refetch();
    }
  }, [getQueryField('keywords')]);
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={0}>
      <Box justifyContent={'space-between'} display={'flex'} mb={8} mt={2}>
        <TitleManager icon='quill:list'>
          Quản lý đề tài của ngành {majorStore?.currentMajor ? majorStore.currentMajor.name : ''}
        </TitleManager>
        <Typography variant='body1' color={'grey.600'} fontWeight={500} mt={4}>
          Số lượng
          <Typography
            component={'span'}
            ml={1}
            mr={1}
            variant='body1'
            fontWeight={'bold'}
            color='grey.700'
          >
            {countSuccess && countFetch?.count}
          </Typography>
          đề tài
        </Typography>
      </Box>

      <HeaderTopic />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <Box width={'100%'} my={4}>
          <TableManagamentTopic
            isApprovePermission={true}
            rows={data?.topics ? data.topics.map((topic: any) => ({ ...topic })) : []}
            handleChangeLimit={handleChangeLimit}
            handleChangePage={handleChangePage}
            page={currentPage}
            limit={currentLimit}
            totalPage={paramTotalPage}
          />
        </Box>
      )}
    </Paper>
  );
}

export default TopicPage;
