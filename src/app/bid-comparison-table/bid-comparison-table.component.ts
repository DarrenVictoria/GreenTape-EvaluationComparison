import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { BidComparisonDataService } from '../services/bid-comparison-data.service';
import { BidComparisonConvertorService } from '../convertors/bid-comparison-convertor.service';
import { BidData } from '../models/bid-comparison.model';

@Component({
  selector: 'app-bid-comparison-table',
  templateUrl: './bid-comparison-table.component.html',
  styleUrls: ['./bid-comparison-table.component.css']
})
export class BidComparisonTableComponent implements OnInit {
  bidData: BidData;
  companyTotals: number[] = [];

  constructor(
    private dataService: BidComparisonDataService,
    private convertorService: BidComparisonConvertorService
  ) { }

  ngOnInit(): void {
    this.loadBidData();
  }

  private loadBidData(): void {
    this.dataService.getProcessedBidData().subscribe(
      ({ bidData, companyTotals }) => {
        this.bidData = bidData;
        this.companyTotals = companyTotals;
      },
      error => console.error('Error loading bid data:', error)
    );
  }

  getLowestPrice(prices: (string | number)[]): number {
    return this.convertorService.getLowestPrice(prices);
  }

  isLowestPrice(price: string | number, prices: (string | number)[]): boolean {
    return this.convertorService.isLowestPrice(price, prices);
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

      category.sections.forEach((section, sectionIndex) => {
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

  async exportToExcel(): Promise<void> {
    const worksheet = await this.getWorksheet();
    const workbook = worksheet.workbook;

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'bid_comparison.xlsx');
    });
  }
}