import { Box, Paper, TableBody, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './style';
import { convertRowEvaluations } from '@/utils/convertDataTable';
import { useGlobalContextReview } from '@/page/ReviewManager/Context';
import { getStatusGroup } from '@/utils/validations/groupStudent.validation';

function SheetTranscriptAdvisor(props: any) {
  const { evaluations } = props;
  const { topic, lecturerSupportName, groupStudentName, lecturerToScoreName, groupMember } =
    useGlobalContextReview();

  return (
    <Paper sx={{ px: 4, overflowY: 'auto', height: '100%' }} elevation={1}>
      <Box>
        <Typography textAlign={'center'} my={3} variant='body1' fontWeight={800} color='initial'>
          PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP{' '}
        </Typography>
      </Box>
      <Box mx={6}>
        <Typography my={3} variant='body1' color='initial'>
          1. Tên đề tài: {topic?.name}
          <br />
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          2. Giảng viên hướng dẫn: {lecturerSupportName}
          <br />
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          3. Nhóm thực hiện: {groupStudentName}
          <br />
          <Box color={groupMember[0]?.status === 'FAIL_ADVISOR' ? 'red' : 'black'}>
            <Typography component={'span'} variant='body1' fontWeight={'500'}>
              Họ tên sinh viên 1:{' '}
            </Typography>
            {groupMember ? groupMember[0]?.student?.fullName : '......................'}{' '}
            {groupMember[0]?.status === 'FAIL_ADVISOR'
              ? `(${getStatusGroup(groupMember[0].status)})`
              : ''}
            <Box ml={14} display={'inline'}>
              Mã sinh viên 1:
              {groupMember ? groupMember[0]?.student?.username : '......................'}
            </Box>
          </Box>
          {groupMember.length > 1 && (
            <Box color={groupMember[1]?.status === 'FAIL_ADVISOR' ? 'red' : 'black'}>
              <Typography component={'span'} variant='body1' fontWeight={'500'}>
                Họ tên sinh viên 2:{' '}
              </Typography>
              {groupMember ? groupMember[1]?.student?.fullName : '......................'}{' '}
              {groupMember[1]?.status === 'FAIL_ADVISOR'
                ? `(${getStatusGroup(groupMember[1].status)})`
                : ''}
              <Box ml={14} display={'inline'}>
                Mã sinh viên 2:
                {groupMember ? groupMember[1]?.student?.username : '......................'}
              </Box>
            </Box>
          )}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          4. Họ tên người đánh giá: {lecturerToScoreName}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          5. Vai trò người đánh giá: Hướng dẫn
        </Typography>
        <Box>
          <Typography
            textAlign={'center'}
            my={3}
            variant='body1'
            fontWeight={'bold'}
            color='initial'
          >
            NỘI DUNG ĐÁNH GIÁ
          </Typography>
          <Box component={'section'}>
            <TableHead sx={{ bgcolor: '#d8ecfc' }}>
              <StyledTableRow>
                <StyledTableCell>LO </StyledTableCell>
                <StyledTableCell align='center'>Nội dung</StyledTableCell>
                <StyledTableCell align='center'>Điểm tối đa</StyledTableCell>
                <StyledTableCell align='center'>Điểm đánh giá sinh viên 1</StyledTableCell>
                <StyledTableCell align='center'>Điểm đánh giá sinh viên 2</StyledTableCell>
                <StyledTableCell align='center'>Nhận xét (nếu có)</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {convertRowEvaluations(evaluations)?.map(
                (
                  row: { id: string; key: string; name: string; scoreMax: number },
                  index: number,
                ) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell align='center'>{row.key}</StyledTableCell>
                    <StyledTableCell component='th' scope='row'>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align='center'>{row.scoreMax}</StyledTableCell>
                    <StyledTableCell align='center'>{''}</StyledTableCell>
                    <StyledTableCell align='center'>{''}</StyledTableCell>
                    <StyledTableCell align='center'>{''}</StyledTableCell>
                  </StyledTableRow>
                ),
              )}
            </TableBody>
          </Box>
          <Typography my={3} variant='body2' fontWeight={'bold'} color='initial'>
            Các góp ý cho khóa luận:
          </Typography>
          <Typography variant='body1' color='initial'>
            ................................................................................................................
          </Typography>
          <Box display={'flex'} justifyContent={'end'}>
            <Typography component={'i'} textAlign={'center'} my={3} variant='body2' color='initial'>
              TP. Hồ Chí Minh, ngày tháng năm
              <Typography component={'b'} fontWeight={'bold'}>
                {' '}
                Người đánh giá
              </Typography>
              <br />
              <br />
              .........
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default SheetTranscriptAdvisor;
