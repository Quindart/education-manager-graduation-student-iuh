import { RoleCheck } from '@/types/enum';
import { convertRowEvaluations } from '@/utils/convertDataTable';
import {
  BorderStyle,
  Document,
  HeightRule,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  UnderlineType,
  VerticalAlign,
  WidthType,
} from 'docx';

function docTranscriptCouncil({
  topicName,
  groupStudentName,
  students,
  evaluatorFullName,
  lecturerSupport,
  evaluations,
  fileType = 'many',
  role,
}: any) {
  const rows = convertRowEvaluations(evaluations);
  const fileName = 'Phiếu chấm Nhóm sv_' + groupStudentName + '_' + evaluatorFullName;
  const lineSpacing = 80;
  const isLecturer = role === RoleCheck.LECTURER;
  const nameEvaluatorExport = isLecturer ? evaluatorFullName : evaluatorFullName.split('_')[1];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 600, // 0.5 inch
              bottom: 500, // 0.5 inch
              left: 720, // 0.5 inch
              right: 720, // 0.5 inch
            },
          },
        },
        children: [
          new Paragraph({
            alignment: 'center',
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: 'TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: '\nKHOA CÔNG NGHỆ THÔNG TIN',
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { after: 50 },
            children: [
              new TextRun({
                text: '=========//=========',
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { before: 50, after: 50 },
            children: [
              new TextRun({
                text: 'PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: `1. Tên đề tài: ${topicName} `,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: `2. Giáo viên hướng dẫn : ${lecturerSupport}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: `3. Nhóm thực hiện: ${groupStudentName}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: `      Mã SV 1: ${students && students[0]?.username}                                                Họ tên sinh viên 1: ${students && students[0]?.fullName}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: `      Mã SV 2: ${students && students.length > 1 ? students[1].username : '................'}                                                 Họ tên sinh viên 2: ${students && students.length > 1 ? students[1].fullName : '................'}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: `4. Họ và tên người đánh giá : ${fileType === 'many' ? nameEvaluatorExport : evaluatorFullName}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: '5. Vai trò của người đánh giá: Thành viên HĐ',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: 'NỘI DUNG',
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            columnWidths: [4000, 5505],
            rows: [
              new TableRow({
                height: {
                  value: 820,
                  rule: HeightRule.EXACT,
                },
                children: [
                  new TableCell({
                    width: {
                      size: 6,
                      type: WidthType.PERCENTAGE,
                    },
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb',
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'LO', size: 20 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 46,
                      type: WidthType.PERCENTAGE,
                    },
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb',
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Nội dung', size: 20 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 4,
                      type: WidthType.PERCENTAGE,
                    },
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb',
                    },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Điểm tối đa', size: 20 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      type: WidthType.PERCENTAGE,
                      size: 12,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb',
                    },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Điểm đánh giá sinh viên 1', size: 20 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb',
                    },
                    width: {
                      type: WidthType.PERCENTAGE,
                      size: 12,
                    },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Điểm đánh giá sinh viên 2', size: 20 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      type: WidthType.PERCENTAGE,
                      size: 20,
                    },
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb',
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: 'center',
                        children: [
                          new TextRun({ text: 'Nhận xét', size: 20 }),
                          new TextRun({ text: '(nếu có)', size: 20 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              ...rows.map(
                (row, index) =>
                  new TableRow({
                    height: {
                      value: 800,
                      rule: HeightRule.EXACT,
                    },
                    children: [
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: 'center',
                            children: [new TextRun({ text: (row?.key).toString(), size: 23 })],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            children: [new TextRun({ text: row?.name || '', size: 23 })],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: 'center',
                            children: [
                              new TextRun({ text: (row?.scoreMax || '').toString(), size: 23 }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: 'center',
                            children: [new TextRun({ text: '', size: 23 })],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: 'center',
                            children: [new TextRun({ text: '', size: 23 })],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({ children: [new TextRun({ text: '', size: 23 })] }),
                        ],
                      }),
                    ],
                  }),
              ),
              new TableRow({
                height: {
                  value: 600,
                  rule: HeightRule.EXACT,
                },
                children: [
                  new TableCell({
                    width: {
                      size: 5,
                      type: WidthType.PERCENTAGE,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: '', size: 23 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 40,
                      type: WidthType.PERCENTAGE,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Cộng', size: 23, bold: true })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 15,
                      type: WidthType.PERCENTAGE,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: '100', size: 23, bold: true })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      type: WidthType.PERCENTAGE,
                      size: 10,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: '', size: 23 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      type: WidthType.PERCENTAGE,
                      size: 10,
                    },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: '', size: 23 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      type: WidthType.PERCENTAGE,
                      size: 20,
                    },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: '', size: 23 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              new TextRun({
                text: '  Các góp ý cho khóa luận:',
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '.............................................................................................................................................................................',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '.............................................................................................................................................................................',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '.............................................................................................................................................................................',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100, after: 100 },
            alignment: 'center',
            children: [
              new TextRun({
                text: '                                                                                                   TP. Hồ Chí Minh, ngày     tháng      năm    \n',
                italics: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',

            children: [
              new TextRun({
                text: '                                                                                                                    Người đánh giá',
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { before: 800 },
            children: [
              new TextRun({
                text: `                                                                                                                        ${fileType === 'many' ? nameEvaluatorExport : evaluatorFullName}`,
                size: 24,
              }),
            ],
          }),
        ],
      },
    ],
  });

  return fileType === 'many' ? { doc, fileName } : doc;
}

export default docTranscriptCouncil;
