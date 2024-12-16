import { Box, Paper, TableBody, TableHead, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './style';
import { convertRowEvaluations } from '@/utils/convertDataTable';

function SheetTranscriptCouncil(props: any) {
  const { topicName, students, evaluatorFullName, evaluations } = props;
  return (
    <Paper sx={{ p: 4, overflowY: 'auto', height: 650 }} elevation={3}>
      <Box display={'flex'} mx={10} justifyContent={'space-between'} gap={10}>
        <Typography textAlign={'center'} variant='body2' color='initial'>
          INDUSTRIAL UNIVERSITY OF HO CHI MINH CITY <br />
          FACULTY OF INFORMATION TECHNOLOGY <br />
          SOFTWARE ENGINEER MAJOR
        </Typography>
        <Typography textAlign={'center'} variant='body2' color='initial'>
          CONG HOA XA HOI CHU NGHIA VIETNAM <br />
          Doc lap - Tu do - Hanh phuc
        </Typography>
      </Box>
      <Box>
        <Typography textAlign={'center'} my={3} variant='body1' fontWeight={800} color='initial'>
          PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP
        </Typography>
      </Box>
      <Box mx={6}>
        <Typography my={3} variant='body1' color='initial'>
          1. Tên đề tài {topicName}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          2. Giáo viên hướng dẫn : {evaluatorFullName}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          3. Nhóm thực hiện:: {students[0].fullName}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography my={3} variant='body1' color='initial'>
            Họ tên sinh viên 1: {students[0].fullName}
          </Typography>
          <Typography my={3} variant='body1' color='initial'>
            Mã SV 1: {students[0].username}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography my={3} variant='body1' color='initial'>
            Họ tên sinh viên 2: {students[1].fullName}
          </Typography>
          <Typography my={3} variant='body1' color='initial'>
            Mã SV 2: {students[1].username}
          </Typography>
        </Box>
        <Typography my={3} variant='body1' color='initial'>
          4. Họ và tên người đánh giá : {evaluatorFullName}
        </Typography>
        <Typography my={3} variant='body1' color='initial'>
          5. Vai trò của người đánh giá: Thành viên HĐ
        </Typography>

        <Box>
          <Box component={'section'}>
            <TableHead>
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
                (row: { id: string; name: string; scoreMax: number }, index: number) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell align='center'>{index + 1}</StyledTableCell>
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
            ....................................................................................................................................................................................
            ....................................................................................................................................................................................
            ....................................................................................................................................................................................
          </Typography>
          <Box display={'flex'} justifyContent={'end'}>
            <Typography component={'i'} textAlign={'center'} my={3} variant='body2' color='initial'>
              TP. Hồ Chí Minh, ngày tháng năm
              <br />
              Người đánh giá
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default SheetTranscriptCouncil;
