import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface TenderDetails {
  tenderID: string;
  tenderName: string;
  tenderModel: string;
  createdBy: string;
  createdOn: string;
  invitedParticipants: number;
  participated: number;
  notSubmitted: number;
  rejectedTender: number;
  productCount: number;
  committeeMembers: number;
  completedDate: string;
}

interface Question {
  question: string;
  answers: (string | number)[];
}

interface Section {
  name: string;
  questions: Question[];
}

interface ProductCategory {
  category: string;
  sections: Section[];
}

interface BidData {
  tenderDetails: TenderDetails;
  companies: string[];
  generalQuestions: Section[];
  productQuestions: ProductCategory[];
}


@Component({
  selector: 'app-bid-comparison-table',
  templateUrl: './bid-comparison-table.component.html',
  styleUrls: ['./bid-comparison-table.component.css']
})
export class BidComparisonTableComponent implements OnInit {
  bidData = {
    tenderDetails: {
      tenderID: 'HAY-7-TEN-60',
      tenderName: 'TEN#300 - Supply of IT equipment ',
      tenderModel: 'RFI (Request for Information)',
      createdBy: 'Hayleys Advantis | info@affnohayleys.lk',
      createdOn: '20/09/2020 : 09:21:43 PM',
      invitedParticipants: 20,
      participated: 15,
      notSubmitted: 3,
      rejectedTender: 2,
      productCount: 22,
      committeeMembers: 4,
      completedDate: '10/10/2020 17:30'
    },
    companies: ['Matix Lanka', 'Silicon Limited', 'Tech Pod Inc', 'Cloud Tech Solutions', 'DigiQue Solutions', 'Oteq Lanka Pvt Limited'],

    generalQuestions: [
      {
        name: 'Company Information',
        questions: [
          { question: 'Are you ISO certified?', answers: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes'] },
          { question: 'How many employees in your company?', answers: [12, 2, 11, 25, 3, 35] },
        ]
      },
      {
        name: 'Documentation',
        questions: [
          { question: 'Please list Service Level Agreements', answers: ['Document attached', 'Attached', 'Uploaded Soft Copy', 'Document Number 1 - Attached', 'Documents named Service Agreement uploaded', 'Document attached'] },
        ]
      },
    ],
    productQuestions: [
      {
        category: 'Smart Televisions',
        sections: [
          {
            name: 'Pricing',
            questions: [
              { question: 'Total price for this product/service', answers: [325000, 255000, 82000, 250000, 82000, 250000] },
            ]
          },
          {
            name: 'Specifications',
            questions: [
              { question: 'What is the display size', answers: ['25 x 55', '250 x 550', '25 x 250', '250 x 550', '500 x 750', '250 x 570'] },
            ]
          },
        ]
      },
      {
        category: 'Projectors',
        sections: [
          {
            name: 'Pricing',
            questions: [
              { question: 'Total price for this product/service', answers: [90000, 73000, 90000, 95000, 35000, 90000] },
            ]
          },
          {
            name: 'Specifications',
            questions: [
              { question: 'What is the brightness level?', answers: ['yes', 'no', 'yes', 'yes', 'yes', 'yes'] },
            ]
          },

        ]
      },
      {
        category: 'Fridge',
        sections: [
          {
            name: 'Pricing',
            questions: [
              { question: 'Total price for this product/service', answers: [90000, 73000, 90000, 95000, 35000, 90000] },
            ]
          },
          {
            name: 'Specifications',
            questions: [
              { question: 'What is the brightness level?', answers: ['yes', 'no', 'yes', 'yes', 'yes', 'yes'] },
            ]
          },

        ]
      }
    ]
  };

  constructor() { }

  companyTotals: number[] = [];

  ngOnInit(): void {
    this.calculateTotals();
  }

  public async getWorksheet(): Promise<ExcelJS.Worksheet> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bid Comparison');

    const headerStyle: Partial<ExcelJS.Style> = {
      font: { color: { argb: 'FFFFFFFF' }, bold: true },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4CAF50' } },
      alignment: { horizontal: 'left', vertical: 'middle' }
    };

    const borderStyle: Partial<ExcelJS.Borders> = {
      top: { style: 'thin', color: { argb: 'FF008C72' } },
      left: { style: 'thin', color: { argb: 'FF008C72' } },
      bottom: { style: 'thin', color: { argb: 'FF008C72' } },
      right: { style: 'thin', color: { argb: 'FF008C72' } }
    };

    worksheet.addRow([]);
    this.addGeneralQuestions(worksheet, headerStyle, borderStyle);

    worksheet.addRow([]);
    this.addProductQuestions(worksheet, headerStyle, borderStyle);

    worksheet.getColumn(1).width = 26;
    worksheet.getColumn(2).width = 69;

    const companyStartColumn = 3;
    const numCompanyColumns = this.bidData.companies.length;

    for (let i = companyStartColumn; i < companyStartColumn + numCompanyColumns; i++) {
      worksheet.getColumn(i).width = 20;
    }

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
      });
    });

    return worksheet;
  }

  private addGeneralQuestions(worksheet: ExcelJS.Worksheet, headerStyle: Partial<ExcelJS.Style>, borderStyle: Partial<ExcelJS.Borders>): void {
    const labelRow = worksheet.addRow(['General Questions']);
    labelRow.getCell(1).font = { bold: true, size: 14 };
    worksheet.addRow([]);

    const headerRow = worksheet.addRow(['', 'Question', ...this.bidData.companies]);
    headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber > 1) {
        Object.assign(cell, headerStyle);
        cell.border = borderStyle;
      }
    });

    let currentSection = '';
    let sectionStartRow = 0;

    this.bidData.generalQuestions.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        const rowIndex = worksheet.rowCount + 1;
        const row = worksheet.addRow(['', question.question, ...question.answers]);

        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = borderStyle;
        });

        if (section.name !== currentSection) {
          if (currentSection !== '') {
            this.mergeSectionCells(worksheet, sectionStartRow, rowIndex - 1, currentSection);
          }
          currentSection = section.name;
          sectionStartRow = rowIndex;
        }

        if (sectionIndex === this.bidData.generalQuestions.length - 1 && questionIndex === section.questions.length - 1) {
          this.mergeSectionCells(worksheet, sectionStartRow, rowIndex, currentSection);
        }
      });
    });
  }

  private addProductQuestions(worksheet: ExcelJS.Worksheet, headerStyle: Partial<ExcelJS.Style>, borderStyle: Partial<ExcelJS.Borders>): void {
    const companyCount = this.bidData.companies.length;
    const companyTotals: number[] = new Array(companyCount).fill(0);

    this.bidData.productQuestions.forEach(category => {
      const categoryRow = worksheet.addRow([category.category]);
      categoryRow.getCell(1).font = { bold: true, size: 14 };
      worksheet.addRow([]);

      const headerRow = worksheet.addRow(['', 'Question', ...this.bidData.companies]);
      headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (colNumber > 1) {
          Object.assign(cell, headerStyle);
          cell.border = borderStyle;
        }
      });

      let currentSection = '';
      let sectionStartRow = worksheet.rowCount;

      category.sections.forEach((section: Section, sectionIndex: number) => {
        section.questions.forEach((question: Question, questionIndex: number) => {
          const rowIndex = worksheet.rowCount + 1;
          const row = worksheet.addRow(['', question.question, ...question.answers]);

          row.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = borderStyle;
          });

          if (section.name !== currentSection) {
            if (currentSection !== '') {
              this.mergeSectionCells(worksheet, sectionStartRow, rowIndex - 1, currentSection);
            }
            currentSection = section.name;
            sectionStartRow = rowIndex;
          }

          if (section.name === 'Pricing' && question.question === 'Total price for this product/service') {
            const priceAnswers = question.answers.map(price =>
              typeof price === 'number' ? Math.floor(price) :
                (typeof price === 'string' && price !== '' ? Math.floor(Number(price)) : null)
            );
            const validPrices = priceAnswers.filter((price): price is number => price !== null && !isNaN(price));
            const lowestPrice = validPrices.length > 0 ? Math.min(...validPrices) : null;

            question.answers.forEach((price, index) => {
              const cell = row.getCell(index + 3);
              const numericPrice = typeof price === 'number' ? price :
                (typeof price === 'string' ? parseFloat(price) : 0);
              cell.value = numericPrice;
              cell.numFmt = '#,##0';
              if (numericPrice === lowestPrice) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9CFF9C' } };
              }
              companyTotals[index] += numericPrice;
            });
          }

          if (sectionIndex === category.sections.length - 1 && questionIndex === section.questions.length - 1) {
            this.mergeSectionCells(worksheet, sectionStartRow, rowIndex, currentSection);
          }
        });
      });

      worksheet.addRow([]);
    });

    const totalQuotedRow = worksheet.addRow(['', 'Total Quoted', ...companyTotals]);
    totalQuotedRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber > 1) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffffffff' } };
        cell.font = { bold: true };
        cell.border = borderStyle;
      }
    });
  }

  private mergeSectionCells(worksheet: ExcelJS.Worksheet, startRow: number, endRow: number, sectionName: string): void {
    worksheet.mergeCells(startRow, 1, endRow, 1);
    const mergedCell = worksheet.getCell(startRow, 1);
    mergedCell.value = sectionName;
    mergedCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E0E0' } };
    mergedCell.alignment = { textRotation: 270, vertical: 'middle', horizontal: 'center' };
    mergedCell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  }

  calculateTotals(): void {
    this.companyTotals = new Array(this.bidData.companies.length).fill(0);

    this.bidData.productQuestions.forEach(category => {
      const pricingSection = category.sections.find(function (s) { return s.name === 'Pricing'; });
      if (pricingSection) {
        const priceQuestion = (pricingSection.questions as any[]).find(function (q) {
          return q.question === 'Total price for this product/service';
        });
        if (priceQuestion) {
          (priceQuestion.answers as any[]).forEach((price: any, index: number) => {
            const numPrice = typeof price === 'number' ? price :
              (typeof price === 'string' ? parseFloat(price) : 0);
            if (!isNaN(numPrice)) {
              this.companyTotals[index] += numPrice;
            }
          });
        }
      }
    });
  }

  getLowestPrice(prices: (string | number)[]): number {
    const numPrices = prices.map(p => typeof p === 'number' ? p : parseFloat(p));
    return Math.min(...numPrices.filter(p => !isNaN(p)));
  }

  isLowestPrice(price: string | number, prices: (string | number)[]): boolean {
    const numPrice = typeof price === 'number' ? price : parseFloat(price);
    return numPrice === this.getLowestPrice(prices);
  }
}

