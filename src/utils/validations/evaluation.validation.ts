export const getTypeEvaluation = (typeEvaluation: string) => {
  switch (typeEvaluation) {
    case 'ADVISOR':
      return 'Hướng dẫn';
    case 'REVIEWER':
      return 'Phản biện';
    case 'REPORT':
      return 'Hội đồng (Báo cáo)';
  }
  return;
};

export const getFileNameToExportDocx = (typeEvaluation: string) => {
  switch (typeEvaluation) {
    case 'ADVISOR':
      return 'HuongDan_PhieuChamDiem_CuoiKy_KLTN';
    case 'REVIEWER':
      return ' PB_PhieuChamDiem_CuoiKy_KLTN';
    case 'REPORT':
      return 'BaoCao_PhieuChamDiem_CuoiKy_KLTN';
    case 'REPORT_POSTER':
      return 'BaoCao_PhieuChamDiem_CuoiKy_KLTN';
    case 'REPORT_COUNCIL':
      return 'BaoCao_PhieuChamDiem_CuoiKy_KLTN';
  }
  return;
};
