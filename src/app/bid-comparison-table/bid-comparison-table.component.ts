import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { BidComparisonDataService } from '../services/bid-comparison-data.service';
import { BidComparisonConvertorService } from '../convertors/bid-comparison-convertor.service';
import { BidData } from '../models/bid-comparison.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

type TableCell = string | number | { text: string; fillColor?: string };

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


  exportPDF(): void {
    const maxCompaniesPerPage = 5;
    const content = [];

    // Helper function to create a table
    const createTable = (headers: string[], body: TableCell[][]): any => ({
      table: {
        headerRows: 1,
        widths: ['auto', 'auto', ...headers.slice(2).map(() => 'auto')],
        body: [headers, ...body]
      },
      layout: {
        fillColor: (rowIndex: number, node: any, columnIndex: number) => {
          if (rowIndex === 0) return '#4caf50';
          const cellValue = node.table.body[rowIndex][columnIndex];
          return typeof cellValue === 'object' && cellValue.fillColor ? cellValue.fillColor : null;
        },
        hLineColor: () => '#008c72',
        vLineColor: () => '#008c72',
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        paddingLeft: () => 5,
        paddingRight: () => 5,
        paddingTop: () => 5,
        paddingBottom: () => 5
      }
    });

    // Helper function to paginate a single table
    const paginateTable = (title: string, headers: string[], body: TableCell[][]): void => {
      content.push({ text: title, style: 'subheader', margin: [0, 10, 0, 5] });

      for (let i = 0; i < this.bidData.companies.length; i += maxCompaniesPerPage) {
        if (i > 0) {
          content.push({ text: `${title} (Continued)`, style: 'subheader', margin: [0, 10, 0, 5] });
        }

        const companyGroup = this.bidData.companies.slice(i, i + maxCompaniesPerPage);
        const paginatedHeaders = ['Section', 'Question', ...companyGroup];
        const paginatedBody = body.map(row => [
          row[0],
          row[1],
          ...row.slice(2 + i, 2 + i + maxCompaniesPerPage)
        ]);

        content.push(createTable(paginatedHeaders, paginatedBody));
      }
    };

    // General Questions table
    const generalQuestionsBody = this.bidData.generalQuestions.reduce((acc, section) => {
      return acc.concat(section.questions.map((q, index) => [
        index === 0 ? section.name : '',
        q.question,
        ...q.answers
      ]));
    }, []);
    paginateTable('General Questions', ['Section', 'Question', ...this.bidData.companies], generalQuestionsBody);

    // Product Questions tables
    this.bidData.productQuestions.forEach(category => {
      const productBody = category.sections.reduce((acc, section) => {
        return acc.concat(section.questions.map((q, index) => {
          const row: TableCell[] = [
            index === 0 ? section.name : '',
            q.question,
            ...q.answers
          ];
          if (section.name === 'Pricing' && q.question === 'Total price for this product/service') {
            const lowestPrice = this.getLowestPrice(q.answers);
            row.forEach((cell, cellIndex) => {
              if (cellIndex >= 2 && cell === lowestPrice) {
                row[cellIndex] = { text: cell.toString(), fillColor: '#9CFF9C' };
              }
            });
          }
          return row;
        }));
      }, [] as TableCell[][]);
      paginateTable(category.category, ['Section', 'Question', ...this.bidData.companies], productBody);
    });

    // Total Quoted table
    const totalQuotedBody = [['Comparison', 'Total Quoted', ...this.companyTotals]];
    paginateTable('Comparison', ['', 'Total Quoted', ...this.bidData.companies], totalQuotedBody);

    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
      header: {
        columns: [
          {
            width: 65,
            style: 'headerStyle'
          }
        ],
        margin: [40, 20, 40, 0]
      },
      footer: (currentPage, pageCount) => ({
        columns: [
          { text: `Page ${currentPage} of ${pageCount}`, alignment: 'right', style: 'footerStyle' }
        ]
      }),
      content: [
        { text: 'Bid Comparison', style: 'header', margin: [0, 0, 0, 10] },
        ...content
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color: '#4caf50'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          color: '#008c72'
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'white',
          fillColor: '#4caf50'
        },
        headerStyle: {
          fontSize: 16,
          bold: true,
          color: '#008c72'
        },
        footerStyle: {
          fontSize: 10,
          color: '#008c72'
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('BidComparison.pdf');
  }


}