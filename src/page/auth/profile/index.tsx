import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import TitleManager from '@/components/ui/Title';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { EnumGender } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { convertMajorDropDown } from '@/utils/convertDataTable';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { useAuth } from '@/hooks/api/useAuth';
import { validateSchemaLecturer } from '@/page/Lecturer/context';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

const GENDERS = [
  {
    _id: EnumGender.FEMALE,
    name: 'Nữ',
  },
  {
    _id: EnumGender.MALE,
    name: 'Nam',
  },
];

const DEGREES = [
  { name: 'Tiến sĩ', _id: 'DOCTOR' },
  { name: 'Thạc sĩ', _id: 'MASTER' },
  { name: 'Phó giáo sư. Tiến sĩ', _id: 'PROFESSOR' },
];

function ProfilePage() {
  const { majorStore } = useMajor();
  const { lecturerStore, onUpdateMe } = useAuth();
  const { mutate: updateLecturer } = onUpdateMe();

  const handleSubmitEditLecturer = (values: any) => {
    const data = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
    };
    updateLecturer(data);
  };

  const navigate = useNavigate();
  return (
    <>
      <Paper elevation={0} sx={{ width: '80%', mx: 'auto', mt: 8, position: 'relative' }}>
        <Box
          sx={{
            width: '100%',
            height: '20px',
            borderRadius: '4px 4px 0 0 ',
            backgroundSize: 'cover',
            position: 'absolute',
            zIndex: 1,
            opacity: 0.6,
          }}
        ></Box>

        <Box sx={{ px: 10, pt: 10, zIndex: 10, position: 'relative' }}>
          <TitleManager icon='vaadin:user-card' variant='h6' textTransform={'uppercase'}>
            Thông tin giảng viên
          </TitleManager>
          <Box py={10} px={5}>
            <Formik
              onSubmit={(values) => {
                handleSubmitEditLecturer(values);
              }}
              validationSchema={validateSchemaLecturer}
              initialValues={{
                fullName: `${lecturerStore.me.user.fullName}`,
                username: `${lecturerStore.me.user.username}`,
                email: `${lecturerStore.me.user.email}`,
                phone: `${lecturerStore.me.user.phone}`,
                gender: `${lecturerStore.me.user.gender}`,
                degree: `${lecturerStore.me.user.degree}`,
                majorId: `${lecturerStore.me.user.majorId}`,
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit, errors, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <Box display={'flex'} gap={10}>
                    <Box flex={1}>
                      <CustomTextField
                        required
                        value={values.username}
                        name='username'
                        label='Mã giảng viên'
                        placeholder='Nhập vào mã giảng viên'
                        disabled
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.username ? true : false}
                        helperText={errors.username}
                      />
                      <Box display={'flex'} gap={4} mt={4}>
                        <Box width={'100%'}>
                          <CustomTextField
                            required
                            value={values.fullName}
                            name='fullName'
                            label='Họ và tên'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Nhập vào họ và tên'
                            error={errors.fullName ? true : false}
                            helperText={errors.fullName}
                          />
                        </Box>
                        <Box width={200}>
                          <Typography variant='body1' fontWeight={'bold'} mb={2}>
                            Giới tính<span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <DropDown
                            value={`${values.gender}`}
                            onChange={(e) => {
                              setFieldValue('gender', e.target.value);
                            }}
                            options={GENDERS}
                          />
                        </Box>
                      </Box>
                      <Box width={'full'}>
                        <Typography variant='body1' fontWeight={'bold'} mb={2}>
                          Trình độ<span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <DropDown
                          value={values.degree}
                          disabled
                          onChange={(e) => {
                            setFieldValue('degree', e.target.value);
                          }}
                          options={DEGREES}
                        />
                      </Box>
                    </Box>
                    <Box flex={1}>
                      <CustomTextField
                        required
                        name='phone'
                        value={values.phone}
                        label='Số điện thoại'
                        placeholder='Nhập vào số điện thoại'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.phone ? true : false}
                        helperText={errors.phone}
                      />
                      <CustomTextField
                        required
                        value={values.email}
                        name='email'
                        label='Email'
                        placeholder='Nhập vào email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email ? true : false}
                        helperText={errors.email}
                      />
                      <Box mt={4} width={'full'}>
                        <Typography variant='body1' fontWeight={'bold'} mb={2}>
                          Chuyên ngành
                        </Typography>
                        <DropDown
                          value={values.majorId}
                          disabled
                          onChange={(e) => {
                            setFieldValue('majorId', e.target.value);
                          }}
                          options={convertMajorDropDown(majorStore.allMajor)}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => navigate('/profile/update-password')}
                    >
                      Đổi mật khẩu <Icon width={20} icon='carbon:password' />
                    </Button>

                    <Button variant='contained' color='success' type='submit'>
                      Cập nhật
                      <Icon width={20} icon='ic:twotone-update' />
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default ProfilePage;
