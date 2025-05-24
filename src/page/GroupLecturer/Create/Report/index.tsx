import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CardLecturer from '../Card/CardLecturer';
import { Icon } from '@iconify/react';
import DropDown from '@/components/ui/Dropdown';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import { useTerm } from '@/hooks/api/useQueryTerm';
import SekeletonUI from '@/components/ui/Sekeleton';
import {
  ENUM_GROUP_LECTURER_REPORT,
  ENUM_STATUS_LECTURER,
} from '@/utils/validations/groupLecturer.validation';
import SearchInput from './SearchInput';

import {
  getUniqueKeywords,
  convertLecturerGroup,
  handleSearch,
} from '@/page/GroupLecturer/Context';
import ChipTag from '@/components/ui/Badge';

const checkColorByIndex = (index: number) => {
  if (index == 1) return '#c36d0c';
  if (index == 2) return '#ca2a2a';
  if (index == 3) return '#168b0c';
};
const checkRoleOfMember = (type: 'report_poster' | 'report_council' | string, index: number) => {
  if (type === 'report_poster') {
    return ` Thành viên ${index}`;
  }
  if (index === 1) return 'Chủ tịch';
  if (index === 2) return 'Ủy viên';
  if (index === 3) return 'Thư ký';
};

const NoMemberPosterContent = () => {
  return (
    <>
      <Typography
        variant='body1'
        px={10}
        py={4}
        width={'100%'}
        bgcolor={'#fff0df'}
        color='grey.600'
      >
        Thành viên 1
      </Typography>
      <Typography
        variant='body1'
        px={10}
        py={4}
        width={'100%'}
        bgcolor={'#fee2e2'}
        color='grey.600'
      >
        Thành viên 2
      </Typography>
      <Typography
        variant='body1'
        px={10}
        py={4}
        width={'100%'}
        bgcolor={'#f4fff3'}
        color='grey.600'
      >
        Thành viên 3
      </Typography>
    </>
  );
};
const NoMemberCouncilContent = () => {
  return (
    <>
      <Typography   variant='body1'
        px={10}
        py={4}
        width={'100%'}
        textAlign={'center'}
        color='grey.600'>Danh sách thành viên trống</Typography>
    </>
  );
};

function CreateReportGroupPage() {
  const [currentGroup, setCurrentGroup] = useState<string>(
    `${ENUM_GROUP_LECTURER_REPORT ? ENUM_GROUP_LECTURER_REPORT[0]?._id : ''}`,
  );
  const [task, setTask] = useState<any[]>();
  const { onCreateGroupLecturer } = useGroupLecturer();
  const { handleGetListLecturerTerms } = useLecturerTerm();
  const { termStore } = useTerm();

  //TODO: POST DATA
  const { mutate: create, isSuccess: successCreate } = onCreateGroupLecturer(`${currentGroup}`);
  
  const handleCreateGroup = () => {
    let dataLecturerGradingAssembly = task?.filter(
      (data: any) => data.status === ENUM_STATUS_LECTURER.HAVE_GROUP,
    );
    // 1. president 2. secretary 3.member
    const persidentId = dataLecturerGradingAssembly.find(lec => lec.role === 'president').lecturerId
    const secretaryId = dataLecturerGradingAssembly.find(lec => lec.role === 'secretary').lecturerId
    const memberId = dataLecturerGradingAssembly.find(lec => lec.role === 'member').lecturerId
    const keywords = getUniqueKeywords(dataLecturerGradingAssembly).join(',');
    const lecturers = [persidentId,memberId,secretaryId]
    
    create({ termId: termStore.currentTerm.id,lecturers , keywords });
  };

  //TODO: [GET DATA]
  const {
    data: listLecturersDefault,
    isFetched,
    isLoading,
  } = handleGetListLecturerTerms('default');
  const { data: listLecturersKey } = handleGetListLecturerTerms('keyword');

  useEffect(() => {
    setTask(convertLecturerGroup(listLecturersKey?.lecturerTerms));
  }, [successCreate, listLecturersDefault, listLecturersKey, currentGroup]);

  const handleOnDrageStart = (evt: any) => {
    let element = evt.currentTarget;
    element.classList.add('dragged');
    evt.dataTransfer.setData('text/plain', evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = 'move';
  };
  const handleOnDrageEnd = (evt: any) => {
    evt.currentTarget.classList.remove('dragged');
  };

  const handleOnDragEnter = (evt: any) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add('dragged-over');
    evt.dataTransfer.dropEffect = 'move';
  };
  const handleOnDragLeave = (evt: any) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget) return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove('dragged-over');
  };
  const handleOnDragOver = (evt: any) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };
  const handleOnDrop = (evt: any, value: any, status: any) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged-over');
    let data = evt.dataTransfer.getData('text/plain');

    let updated = task?.map((task: any) => {
      if (task?.lecturerId?.toString() === data.toString()) {
        task.status = status;
        task.role = null
      }
      return task;
    });
    setTask(updated);
  };
  let dataLecturerGradingAssembly = task?.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.HAVE_GROUP,
  );
  let dataLecturerNoGroup = task?.filter(
    (data: any) => data.status === ENUM_STATUS_LECTURER.NO_GROUP,
  );
  //TODO: handle search
  const [keywords, setKeywords] = useState('');
  const changeSearch = (s: string) => {
    setKeywords(s);
  };

  return (
    <Box display={'flex'} gap={5} justifyContent={'space-between'}>
      <Paper
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.NO_GROUP)}
        sx={{
          flex: 1,
          minWidth: 500,
        }}
        elevation={0}
      >
        {' '}
        <Box px={4} bgcolor={'grey.100'} py={2} mb={4}>
          <Box mt={10}>
            <SearchInput
              sx={{ bgcolor: 'white' }}
              changeSearch={changeSearch}
              keywords={keywords}
            />
          </Box>
        </Box>
        <Box sx={{ overflowY: 'auto', px: 20, bgcolor: 'grey.50' }} height={500} px={2}>
          {isLoading || !isFetched ? (
            <SekeletonUI />
          ) : (
            <Box>
              {handleSearch(keywords, dataLecturerNoGroup)?.map((task: any) => (
                <CardLecturer
                  key={task.lecturerId}
                  id={task.lecturerId}
                  lecturer={task}
                  keywords={task.keywords}
                  draggable
                  onDragStart={(e: any) => handleOnDrageStart(e)}
                  onDragEnd={(e: any) => handleOnDrageStart(e)}
                />
              ))}
            </Box>
          )}
        </Box>
      </Paper>
      <Paper
        sx={{
          flex: 1,
          px: 8,
          height: 500,
          py: 10,
        }}
        elevation={0}
        onDragLeave={(e: any) => handleOnDragLeave(e)}
        onDragEnter={(e) => handleOnDragEnter(e)}
        onDragEnd={(e) => handleOnDrageEnd(e)}
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={(e) => handleOnDrop(e, false, ENUM_STATUS_LECTURER.HAVE_GROUP)}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <DropDown
            value={currentGroup}
            onChange={(e: any) => {
              setCurrentGroup(e.target.value);
            }}
            options={ENUM_GROUP_LECTURER_REPORT}
          />
        </Box>
        <Box>
          <Box sx={{ justifyContent: 'end', display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {getUniqueKeywords(dataLecturerGradingAssembly).map((keyword: any) => (
              <>
                <ChipTag
                  sx={{ mx: 1, my: 2, fontSize: 10 }}
                  color='info'
                  size='small'
                  label={keyword}
                />
              </>
            ))}
          </Box>
        </Box>
        {dataLecturerGradingAssembly && dataLecturerGradingAssembly.length < 1 ? (
          <Box display={'flex'} flexDirection={'column'}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              gap={4}
              alignItems={'center'}
              height={300}
            >
              {' '}
              {/* <img width={150} src='/images/nodata.webp' /> */}
              
              {currentGroup === 'report_council' ? (
                <NoMemberCouncilContent />
              ) : (
                <>
                <Typography color='grey.600' variant='h6' mt={1}>
                Để chọn giảng viên cần tạo nhóm, vui lòng kéo thả vào bảng này. *Lưu ý: chức vụ của
                giảng viên đảm nhận trong nhóm chấm tuân theo thứ tự ở phía bên dưới:
              </Typography>
              <NoMemberPosterContent />

                </>
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={{ height: 500 }}>
            {dataLecturerGradingAssembly?.map((task: any, index: number) => (
              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  my: 6,
                  py: 4,
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  border: '2px solid #fefefe',
                  ':hover': {
                    border: '2px solid #00B1A2',
                    boxShadow: '1px 1px 1px 1px #E6E6E6',
                    transition: '0.1s ease-in',
                    backgroundColor: '#D3FFEF',
                  },
                }}
                key={task.lecturerId}
                id={task.lecturerId}
                draggable
                onDragStart={(e) => handleOnDrageStart(e)}
                onDragEnd={(e) => handleOnDrageStart(e)}
              >
                <Box px={10}>
                  <DropDown 
                  onChange={(e)=>{task.role = e.target.value}}
                  defaultOpen
                  options={[
                    {
                      name:"Chủ tịch",
                      _id: 'president'
                    },
                    {
                      name:"Thư kí",
                      _id:'secretary'
                    },
                    {
                      name:"Ủy viên",
                      _id:'member'
                    }
                  ]}/>
                  <Typography mt={3 } variant='h6' fontWeight={600} color='grey.700'>
                    Giảng viên
                    <Typography mx={4} fontSize={14} component='span'>
                      {task.fullName} - {task.username}
                    </Typography>
                  </Typography>
                  <Typography variant='body1' color={'grey.600'}>
                    Ngành: <Typography component='span'>{task.majorName}</Typography>
                  </Typography>

               
                </Box>
              </Paper>
            ))}{' '}
            {dataLecturerGradingAssembly?.length === 3 && (
              <Typography
                component={'span'}
                variant='body1'
                mt={10}
                fontWeight={'500'}
                color='warning.main'
              >
                !Chú thích: Nhóm đã đủ số lượng thành viên
              </Typography>
            )}
            {dataLecturerGradingAssembly?.length > 0 && (
              <>
                <Typography variant='h6' mt={2} fontWeight={'bold'} color='grey.800'>
                  Số lượng :{' '}
                  <Typography component={'span'} variant='body1' mt={10} color='initial'>
                    {dataLecturerGradingAssembly?.length} /3 thành viên
                  </Typography>
                </Typography>
                <Box display={'flex'} justifyContent={'end'} mt={10} mr={4}>
                  <Button
                    color='success'
                    variant='contained'
                    disabled={dataLecturerGradingAssembly && dataLecturerGradingAssembly.length > 3}
                    onClick={handleCreateGroup}
                  >
                    <Icon icon='dashicons:saved' />
                    Tạo nhóm
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CreateReportGroupPage;
