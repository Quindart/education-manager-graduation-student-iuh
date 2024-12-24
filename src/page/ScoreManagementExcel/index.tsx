import { Box, Button, Paper } from '@mui/material';
import React, { useState } from 'react';
import TableScoreManagement from './Table';
import { ENUM_SCORE_STUDENT } from '@/utils/validations/transcript.validation';
import TitleManager from '@/components/ui/Title';
import DropDown from '@/components/ui/Dropdown';
import { useTerm } from '@/hooks/api/useQueryTerm';
import ExportTranscriptWord from './Modal/ExportTranscriptWord';

function ScoreManagementExcel() {
  const { termStore } = useTerm();
  const [typeScoreStudent, setTypeScoreStudent] = useState<string>(`${ENUM_SCORE_STUDENT[0]?._id}`);
  const checkTimeToScored = (type) => {
    if (
      (type === 'REVIEWER' || type === 'ADVISOR') &&
      termStore.partCurrentTerm.isDiscussion === true
    )
      return true;
    if (
      (type === 'REPORT' || type === 'REPORT_POSTER' || type === 'REPORT_COUNCIL') &&
      termStore.partCurrentTerm.isReport === true
    )
      return true;
    return false;
  };
  const handleChangeTypeScoreStudent = (typeScoreStudent: string) => {
    setTypeScoreStudent(typeScoreStudent);
  };

  return (
    <Paper elevation={0} sx={{ px: 2, py: 4 }}>
      <Box mb={4} display={'flex'} alignItems={'center'} gap={2}>
        <TitleManager sx={{ mx: 4 }}>Bảng điểm danh sách sinh viên </TitleManager>
        <Box width={170}>
          <DropDown
            onChange={(e: any) => {
              handleChangeTypeScoreStudent(e.target.value);
            }}
            value={typeScoreStudent}
            options={ENUM_SCORE_STUDENT}
          />
        </Box>
      </Box>
      <Box>
        <TableScoreManagement
          isInTimeScore={checkTimeToScored(typeScoreStudent)}
          typeScoreStudent={typeScoreStudent}
        />
      </Box>
    </Paper>
  );
}

export default ScoreManagementExcel;
