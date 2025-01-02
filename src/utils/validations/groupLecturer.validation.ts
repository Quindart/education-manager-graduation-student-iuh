import { EnumRoleOfMemberCouncil, EnumRoleOfMemberPoster } from '@/types/enum';

export const checktTypeGroupLecturer = (type: string) => {
  switch (type) {
    case 'reviewer':
      return 'Nhóm chấm Phản biện';
    case 'report_poster':
      return 'Nhóm chấm Poster';
    case 'report_council':
      return 'Nhóm chấm Hội đồng';
  }
  return;
};

export const ENUM_STATUS_LECTURER = {
  NO_GROUP: 'NO_GROUP',
  HAVE_GROUP: 'HAVE_GROUP',
};
export const ENUM_GROUP_LECTURER_REPORT = [
  {
    _id: 'report_poster',
    name: 'Nhóm chấm poster',
  },
  {
    _id: 'report_council',
    name: 'Nhóm chấm hội đồng',
  },
];
export const ENUM_GROUP_LECTURER = [
  {
    name: 'Chấm Phản biện',
    _id: 'reviewer',
  },
  {
    name: 'Chấm Poster',
    _id: 'report_poster',
  },
  {
    name: 'Chấm Hội đồng',
    _id: 'report_council',
  },
];
export const checkMemberType = (type: string) => {
  switch (type) {
    case EnumRoleOfMemberCouncil.PRESIDENT:
      return 'Chủ tịch';
    case EnumRoleOfMemberCouncil.VICE_PRESIDENT:
      return 'Ủy viên';
    case EnumRoleOfMemberCouncil.SECRETARY:
      return 'Thư ký';
    case EnumRoleOfMemberPoster.MEMBER_ONE:
      return 'Thành viên 1';
    case EnumRoleOfMemberPoster.MEMBER_TWO:
      return 'Thành viên 2';
  }
  return;
};
