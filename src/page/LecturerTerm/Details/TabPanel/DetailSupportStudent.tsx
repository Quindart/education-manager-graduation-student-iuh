import { TabPanel, TabPanelProps } from '@mui/lab';
import React from 'react';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent.js';
import { useLocation } from 'react-router-dom';
import TableDetailGroupStudentOfLecturer from './TableSupportStudent.tsx';

function DetailSupportStudent(props: any) {
  const { value, lecturerId } = props;
  const { pathname } = useLocation();
  const current = pathname.split('/');

  const { handleGetGroupStudentByLecturerByTerm } = useGroupStudent();
  const { data, isFetching, isLoading } = handleGetGroupStudentByLecturerByTerm(lecturerId);
  return (
    <TabPanel value={value} sx={{ my: 4 }}>
      <TableDetailGroupStudentOfLecturer rows={data ? data.groupStudents : []} />
    </TabPanel>
  );
}

export default DetailSupportStudent;
