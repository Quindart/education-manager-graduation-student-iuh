import { EnumIndustryKey, EnumRole } from '@/types/enum';

// exports.checkDegree = (degree) => {
//     switch (degree) {
//         case 'BACHELOR':
//             return 'NCS';
//         case 'MASTER':
//             return 'ThS';
//         case 'DOCTOR':
//             return 'TS';
//         case 'PROFESSOR':
//             return 'PGS. TS';
//         default:
//             return 'ThS';
//     }
// };

export const checkDegree = (value: string) => {
  if (value === 'BACHELOR') return 'Nghiên cứu sinh';
  if (value === 'MASTER') return 'Thạc sĩ';
  if (value === 'PROFESSOR') return 'Phó giáo sư. Tiến sĩ';
  if (value === 'DOCTOR') return 'Tiến sĩ';
  return;
};
export const checkIndustry = (value: string) => {
  if (value === EnumIndustryKey.WEB) return 'Web';
  if (value === EnumIndustryKey.APP) return 'Ứng dụng di động';
  if (value === EnumIndustryKey.SYSTEM) return 'Hệ thống và quản lý';
  if (value === EnumIndustryKey.AI) return 'Trí tuệ nhân tạo';
  if (value === EnumIndustryKey.DATA) return 'Dữ liệu lớn';
  if (value === EnumIndustryKey.SECURITY) return 'Bảo mật & giám sát';
  if (value === EnumIndustryKey.NETWORK) return 'Mạng';
  if (value === EnumIndustryKey.OTHER) return 'Khác';
  return;
};
export const checkRoleLecturer = (value: string) => {
  if (value === EnumRole.LECTURER) return 'Giảng viên';
  if (value === EnumRole.HEAD_LECTURER) return 'Chủ nhiệm ngành';
  if (value === EnumRole.HEAD_COURSE) return 'Chủ quản môn học';
  if (value === EnumRole.ADMIN) return 'Quản trị viên';
  return;
};
export const checkRoleLecturerColor = (value: string) => {
  if (value === EnumRole.LECTURER) return '#207D47';
  if (value === EnumRole.HEAD_LECTURER) return '#F1970F';
  if (value === EnumRole.HEAD_COURSE) return '#3498DB';
  if (value === EnumRole.ADMIN) return '#FF5733';
  return;
};

export const getColorLecturer = (typeEvalution: string) => {
  switch (typeEvalution) {
    case 'ADVISOR':
      return 'green';
    case 'REVIEWER':
      return 'blue';
    case 'SESSION_HOST':
      return 'red';
  }
};
