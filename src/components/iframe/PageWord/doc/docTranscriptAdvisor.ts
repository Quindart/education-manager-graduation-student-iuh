import { convertRowEvaluations } from '@/utils/convertDataTable';
import {
  Document,
  HeightRule,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';

export default function docTranscriptAdvisor(evaluations: any, topic: any, lecturerSupportName: any, groupStudentName: any, lecturerToScoreName: any, groupMember: any) {
  const rows = convertRowEvaluations(evaluations);
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch
              bottom: 720, // 0.5 inch
              left: 720, // 0.5 inch
              right: 720, // 0.5 inch
            },
          },
        },
        children: [
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: 'TRƯỜNG ĐH CÔNG NGHIỆP TP. HCM',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: '\nKHOA CÔNG NGHỆ THÔNG TIN',
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: '=======//======',
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { before: 300, after: 300 },
            children: [
              new TextRun({
                text: 'PHIẾU ĐÁNH GIÁ KHÓA LUẬN TỐT NGHIỆP',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: '1.Tên đề tài:  ' + `${topic?.name}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '2. Giáo viên hướng dẫn:   ' + `${lecturerSupportName}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '3. Nhóm thực hiện:  ' + `${groupStudentName}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: ` Mã SV 1:  ${groupMember && groupMember[0]?.student?.username}                                                Họ tên sinh viên 1:  ${groupMember && groupMember[0]?.student?.fullName}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: ` Mã SV 2: ${groupMember && groupMember[1]?.student?.username}                                                  Họ tên sinh viên 2:   ${groupMember && groupMember[1]?.student?.fullName}                                                      `,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `4. Họ và tên người đánh giá:  ${lecturerToScoreName}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '5. Vai trò của người đánh giá:   Hướng dẫn ',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: 'NỘI DUNG ĐÁNH GIÁ',
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 200, after: 200 },
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
                  value: 800,
                  rule: HeightRule.EXACT,
                },
                children: [
                  new TableCell({
                    width: {
                      size: 8,
                      type: WidthType.PERCENTAGE,
                    },
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb', // Màu nền
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'LO', size: 26 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    width: {
                      size: 40,
                      type: WidthType.PERCENTAGE,
                    },
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb', // Màu nền
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Nội dung', size: 23 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 15,
                      type: WidthType.PERCENTAGE,
                    },
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb', // Màu nền
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
                      size: 10,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb', // Màu nền
                    },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Điểm đánh giá sinh viên 1', size: 23 })],
                        alignment: 'center',
                      }),
                    ],
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    shading: {
                      type: ShadingType.SOLID,
                      color: '#d9ecfb', // Màu nền
                    },
                    width: {
                      type: WidthType.PERCENTAGE,
                      size: 10,
                    },
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Điểm đánh giá sinh viên 2', size: 23 })],
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
                      color: '#d9ecfb', // Màu nền
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: 'center',
                        children: [
                          new TextRun({ text: 'Nhận xét  ', size: 20 }),
                          new TextRun({ text: '(nếu có)', size: 23 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              ...rows.map(
                (row: any, index: number) =>
                  new TableRow({
                    height: {
                      value: 900,
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
                          new Paragraph({ children: [new TextRun({ text: row.name, size: 23 })] }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: 'center',
                            children: [new TextRun({ text: row.scoreMax.toString(), size: 23 })],
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
                        children: [new TextRun({ text: 'Total', size: 23, bold: true })],
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
                    width: {
                      type: WidthType.PERCENTAGE,
                      size: 20,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: 'center',
                        children: [new TextRun({ text: ' ', size: 20 })],
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
                text: 'Các ý kiến khác: ',
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
            spacing: { before: 200, after: 150 },
            alignment: 'center',
            children: [
              new TextRun({
                text: '                                                                                                   TP. Hồ Chí Minh, ngày      tháng      năm    \n',
                italics: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            children: [
              new TextRun({
                text: '                                                                                                                      Người đánh giá',
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { before: 600 },
            children: [
              new TextRun({
                text: `                                                                                                                       ${lecturerSupportName}`,
                size: 24,
              }),
            ],
          }),
        ],
      },
    ],
  });
  return doc;
}
