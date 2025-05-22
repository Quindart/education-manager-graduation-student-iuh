import { checkMemberType } from '@/utils/validations/groupLecturer.validation';
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

function convertStudentScores(students) {
  const result = [];
  students?.forEach((student) => {
    student.evaluations?.forEach((evaluation) => {
      let existingEvaluation = result?.find((item) => item.evaluationId === evaluation.id);
      if (!existingEvaluation) {
        existingEvaluation = {
          evaluationId: evaluation.id,
          evaluationName: evaluation.name,
          evaluationKey: evaluation.key,
          scoreMax: evaluation.scoreMax,
        };
        students?.forEach((student, index) => {
          existingEvaluation[`student_${student.username}_score`] = 0;
        });

        result?.push(existingEvaluation);
      }
      existingEvaluation[`student_${student.username}_score`] = evaluation.score;
    });
  });
  return result;
}

export default function docResultTranscript({
  groupStudentId,
  groupName,
  topicName,
  lecturerSupport,
  evaluatorName,
  position,
  comment,
  students,
  fileType = 'many',
  type,
}: any) {
  const vnPosition = checkMemberType(position);
  const fileName = 'PB_NhómSV' + groupName + '_' + vnPosition + '_' + evaluatorName;
  const rows = convertStudentScores(students).sort(
    (a, b) => parseInt(a.evaluationKey.split('LO')[1]) - parseInt(b.evaluationKey.split('LO')[1]),
  );
  const lineSpacing = 80;
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
            spacing: { after: lineSpacing },
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
            spacing: { after: lineSpacing },
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
                text: `2. Giáo viên hướng dẫn: ${lecturerSupport}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: `3. Nhóm thực hiện: ${groupName}`,
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
                text: `      Mã SV 2: ${students && students[1] ? students[1].username : '................'}                                                Họ tên sinh viên 2: ${students && students[1] ? students[1].fullName : '................'}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: ` 4. Họ và tên người đánh giá : ${fileType === 'many' && evaluatorName}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: lineSpacing },
            children: [
              new TextRun({
                text: `5. Vai trò của người đánh giá: ${type === 'ADVISOR' ? 'Hướng dẫn' : vnPosition}`,
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
                      size: 8,
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
                      size: 30,
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
                      size: 10,
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
                            children: [new TextRun({ text: row?.evaluationKey, size: 23 })],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            children: [new TextRun({ text: row.evaluationName, size: 23 })],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: 'center',
                            children: [new TextRun({ text: `${row?.scoreMax}`, size: 23 })],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: 'center',
                            children: [
                              new TextRun({
                                text: `${row[`student_${students[0].username}_score`]}`,
                                size: 23,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: 'center',
                            children: [
                              new TextRun({
                                text: `${students.length > 1 ? row[`student_${students[1].username}_score`] : ''}`,
                                size: 23,
                              }),
                            ],
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
                        children: [
                          new TextRun({
                            text: `${Number(students[0]?.evaluations?.map((e) => e.score)?.reduce((a, b) => a + b)).toFixed(1)}`,
                            size: 23,
                          }),
                        ],
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
                        children: [
                          new TextRun({
                            text: `${students.length > 1 ? Number(students[1]?.evaluations?.map((e) => e.score)?.reduce((a, b) => a + b)).toFixed(1) : ''}`,
                            size: 23,
                          }),
                        ],
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
                text: 'Các góp ý cho khóa luận:',
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 200, after: 150 },
            children: [
              new TextRun({
                text: `   ${comment}`,
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
                text: `                                                                                                                        ${fileType === 'many' && evaluatorName}`,
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
