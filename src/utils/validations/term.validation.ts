import dayjs from 'dayjs';

enum ENUM_STATUS_OF_DATE_TERM {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export const statusOfDate = (startDate: string, endDate: string): ENUM_STATUS_OF_DATE_TERM => {
  const dayOfStartDate = dayjs(startDate);
  const dayOfEndDate = dayjs(endDate);

  if (dayOfStartDate.diff() > 0) return ENUM_STATUS_OF_DATE_TERM.INACTIVE;
  if (dayOfEndDate.diff() < 0) return ENUM_STATUS_OF_DATE_TERM.EXPIRED;
  return ENUM_STATUS_OF_DATE_TERM.ACTIVE;
};
