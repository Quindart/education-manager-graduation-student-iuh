import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
const ROUTE_LABELS: { [key: string]: string } = {
  '/': ' ',
  '/terms': 'Quản lý Học kì',
  '/terms/new': 'Thêm Học kì mới',
  '/terms/:termId': 'Chi tiết Học kì',
  '/terms/edit': 'Chỉnh sửa Học kì',
  '/majors': 'Quản lý Chuyên ngành',
  '/lecturers': 'Quản lý Giảng viên',
  '/lecturers/detail': 'Chi tiết Giảng viên',
  '/authorizations': 'Quản lý phân quyền',
  '/scores': 'Quản lý Chấm điểm',

  '/students': 'Quản lý Sinh viên',
  '/notifications': 'Quản lý Thông báo',
  '/notifications/create': 'Tạo thông báo',
  '/my-group-lecturers': 'Nhóm giảng viên',
  '/my-group-lecturers/detail': 'Chi tiết Nhóm giảng viên của tôi',
  '/group-students': 'Quản lý Nhóm sinh viên',
  '/group-students/detail': 'Chi tiết nhóm',
  '/group-lecturers': 'Quản lý Nhóm giảng viên',
  '/group-lecturers/details': 'Chi tiết Nhóm giảng viên',
  '/group-lecturers/group-support': 'Hỗ trợ nhóm',
  '/group-lecturers/group-report': 'Phân công Chấm điểm',
  '/group-lecturers/create': 'Tạo nhóm Giảng viên',

  '/topics': 'Quản lý Đề tài',
  '/reviews': 'Quản lý Tiêu chí đánh giá',

  '/group-supports': 'Quản lý Nhóm hướng dẫn',
  '/group-supports/detail': 'Chi tiết Nhóm hướng dẫn',
  '/group-supports/score': 'Điểm Nhóm hướng dẫn',
  '/group-supports/score/group_student_id': 'Chi tiết điểm nhóm',
  '/files': 'Tệp đã tải lên',
  '/users': 'Quản lý người dùng',
  '/users/:userId': 'Chi tiết người dùng',

  '/profile': 'Thông tin cá nhân',
  '/profile/update-password': 'Cập nhật mật khẩu',
  '/auth/register': 'Đăng ký',
  '/auth/login': 'Đăng nhập',
  '/auth/role': 'Vai trò',
  '/auth/forgot-password': 'Quên mật khẩu',
  '/auth/success': 'Thành công',
  '/404': 'Không tìm thấy',
};

const findBreadcrumbName = (path: string) => {
  for (const route in ROUTE_LABELS) {
    if (matchPath(route, path)) {
      return ROUTE_LABELS[route];
    }
  }
  return null;
};
function BreadCrumbRouting() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const validPaths = pathnames
    .map((value, index) => `/${pathnames.slice(0, index + 1).join('/')}`)
    .filter((path) => ROUTE_LABELS[path]);

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {validPaths.map((path, index) => {
        const breadcrumbName = findBreadcrumbName(path);
        return index === validPaths.length - 1 ? (
          <Typography color='grey.600' fontWeight={'600'} fontSize={12} variant='h6' key={path}>
            {breadcrumbName}
          </Typography>
        ) : (
          <Link style={{ color: '#0052b1', fontWeight: '500', fontSize: 14 }} to={path} key={path}>
            {breadcrumbName}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadCrumbRouting;
