import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ShortlistCommittee2Service } from '../services/shortlist-committee2.service';
import { ShortlistCommittee2ConvertorService } from '../convertors/shortlist-committee-2-convertor.service';
import { ShortlistCommitteeData, Company, Product } from '../models/shortlist-committee.model';

type TableCell = {
  text?: string;
  colSpan?: number;
  rowSpan?: number;
  fillColor?: string;
  style?: string;
};

@Component({
  selector: 'app-shortlist-committee-2',
  templateUrl: './shortlist-committee-2.component.html',
  styleUrls: ['./shortlist-committee-2.component.css']
})
export class ShortlistCommittee2Component implements OnInit {
  data: ShortlistCommitteeData | null = null;
  companyTotals: number[] = [];
  companyAvgScores: number[] = [];

  constructor(
    private shortlistCommittee2Service: ShortlistCommittee2Service,
    private convertorService: ShortlistCommittee2ConvertorService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.shortlistCommittee2Service.getShortlistCommittee2Data().subscribe(
      (data: ShortlistCommitteeData) => {
        this.data = data;
        this.companyTotals = this.convertorService.calculateCompanyTotals(this.data);
        this.companyAvgScores = this.convertorService.calculateCompanyAvgScores(this.data);
        this.highlightLowestPrice();
      },
      error => {
        console.error('Error loading shortlist committee 2 data:', error);
      }
    );
  }

  highlightLowestPrice(): void {
    this.data.products.forEach(product => {
      let lowestPrice = Infinity;
      const lowestPriceQuestion = "Total price for this product/service";

      (product.companies as any).forEach(company => {
        const price = parseFloat(company.answers[lowestPriceQuestion] as string);
        if (price < lowestPrice) {
          lowestPrice = price;
        }
      });

      (product.companies as any).forEach(company => {
        (company as any).isLowestPrice = parseFloat(company.answers[lowestPriceQuestion] as string) === lowestPrice;
      });
    });
  }

  findLowestPrice(prices: string[]): number {
    const numericPrices = prices.map(price => parseFloat(price)).filter(price => !isNaN(price));
    return Math.min(...numericPrices);
  }

  isLowestPrice(price: number, prices: number[]): boolean {
    return price === Math.min(...prices);
  }

  convertAnswerToNumber(answer: string): number {
    return parseFloat(answer);
  }

  getShortlistedMembersCount(company: Company): number {
    return company.committeeMembers.filter(member => member.shortlisted === 'YES').length;
  }

  getTotalMembersCount(company: Company): number {
    return company.committeeMembers.length;
  }

  calculateAverageScore(company: Company): string {
    const scores = company.committeeMembers
      .map(member => {
        const score = parseFloat(member.score);
        return isNaN(score) ? 0 : score;
      })
      .filter(score => score > 0);

    if (scores.length === 0) return 'N/A';

    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return average.toFixed(2) + '%';
  }

  async getWorksheet(): Promise<ExcelJS.Worksheet> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Shortlist Committee');

    let currentRow = 1;

    worksheet.getColumn(1).width = 36;
    worksheet.getColumn(2).width = 69;

    for (let i = 3; i <= 60; i++) {
      worksheet.getColumn(i).width = 42;
    }

    const emptyRow = worksheet.addRow([]);
    this.applyTableStyling(worksheet, currentRow, currentRow);
    currentRow++;

    currentRow = await this.addGeneralQuestionsTable(worksheet, currentRow);

    for (const product of this.data.products) {
      worksheet.addRow([]);
      worksheet.addRow([]);
      currentRow += 2;

      currentRow = await this.addProductTable(worksheet, product, currentRow);
    }

    worksheet.addRow([]);
    worksheet.addRow([]);
    currentRow += 2;

    currentRow = await this.addFinalSummaryTable(worksheet, currentRow);

    return worksheet;
  }

  styleHeaderRow(row: ExcelJS.Row) {
    row.eachCell((cell, colNumber) => {
      if (colNumber > 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF00B050' }
        };
        cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      }
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  }

  styleCategoryCell(cell: ExcelJS.Cell) {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9D9D9' }
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF000000' } },
      left: { style: 'thin', color: { argb: 'FF000000' } },
      bottom: { style: 'thin', color: { argb: 'FF000000' } },
      right: { style: 'thin', color: { argb: 'FF000000' } }
    };
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle' };
  }

  applyTableStyling(worksheet: ExcelJS.Worksheet, startRow: number, endRow: number) {
    for (let i = startRow; i <= endRow; i++) {
      const row = worksheet.getRow(i);
      row.eachCell((cell) => {
        if (cell.value !== null && cell.value !== '') {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FF006100' } },
            left: { style: 'thin', color: { argb: 'FF006100' } },
            bottom: { style: 'thin', color: { argb: 'FF006100' } },
            right: { style: 'thin', color: { argb: 'FF006100' } }
          };
        }
      });
    }
  }

  async addGeneralQuestionsTable(worksheet: ExcelJS.Worksheet, startRow: number): Promise<number> {
    const titleRow = worksheet.addRow(['', 'General Questions']);
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'left' };

    const headerRow = worksheet.addRow([
      '',
      'General Questions',
      ...this.data.companies.reduce((acc: string[], c: Company) => acc.concat(['', c.name, '']), [])
    ]);
    this.styleHeaderRow(headerRow);
    this.data.companies.forEach((_, index) => {
      worksheet.mergeCells(startRow + 1, index * 3 + 3, startRow + 1, index * 3 + 5);
    });

    const shortlistedRow = worksheet.addRow([
      '',
      '',
      ...this.data.companies.reduce((acc: string[], c: Company) => acc.concat([c.shortlistedMembers, '', '']), [])
    ]);
    shortlistedRow.getCell(1).font = { bold: true };
    this.data.companies.forEach((_, index) => {
      worksheet.mergeCells(startRow + 2, index * 3 + 3, startRow + 2, index * 3 + 5);
    });

    this.data.generalQuestions.forEach(question => {
      const row = worksheet.addRow([
        question.category,
        question.question,
        ...this.data.companies.reduce((acc: string[], company: Company) => acc.concat([company.answers[question.question], '', '']), [])
      ]);
      this.styleCategoryCell(row.getCell(1));
      this.data.companies.forEach((_, index) => {
        worksheet.mergeCells(row.number, index * 3 + 3, row.number, index * 3 + 5);
      });
    });

    ['Committee Member', 'Score', 'Comment', 'Shortlisted'].forEach(category => {
      const row = worksheet.addRow([
        '',
        category,
        ...this.data.companies.reduce((acc: string[], company: Company) =>
          acc.concat(company.committeeMembers.map(member =>
            category === 'Committee Member' ? `${member.name} (${member.role})` : (member[category.toLowerCase()] || '')
          )), [])
      ]);
      row.getCell(2).font = { bold: true };
    });

    const avgScoreRow = worksheet.addRow([
      '',
      'Average Score',
      ...this.data.companies.reduce((acc: string[], company: Company) => acc.concat([this.calculateAverageScore(company), '', '']), [])
    ]);
    avgScoreRow.getCell(2).font = { bold: true };
    this.data.companies.forEach((_, index) => {
      worksheet.mergeCells(avgScoreRow.number, index * 3 + 3, avgScoreRow.number, index * 3 + 5);
    });

    this.applyTableStyling(worksheet, startRow, worksheet.rowCount);

    return worksheet.rowCount + 1;
  }

  async addProductTable(worksheet: ExcelJS.Worksheet, product: Product, startRow: number): Promise<number> {
    const titleRow = worksheet.addRow(['', product.name]);
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'center' };

    worksheet.addRow([]);

    const headerRow = worksheet.addRow([
      'Category',
      'Question',
      ...product.companies.reduce((acc: string[], c: Company) => acc.concat(['', c.name, '']), [])
    ]);
    this.styleHeaderRow(headerRow);

    product.companies.forEach((_, index) => {
      worksheet.mergeCells(startRow, index * 3 + 3, startRow, index * 3 + 5);
    });

    const shortlistedRow = worksheet.addRow([
      '',
      '',
      ...product.companies.reduce((acc: string[], c: Company) => acc.concat([c.shortlistedMembers, '', '']), [])
    ]);
    product.companies.forEach((_, index) => {
      worksheet.mergeCells(shortlistedRow.number, index * 3 + 3, shortlistedRow.number, index * 3 + 5);
    });

    product.generalQuestions.forEach(question => {
      const row = worksheet.addRow([
        question.category,
        question.question,
        ...product.companies.reduce((acc: string[], company: Company) => acc.concat([
          company.answers[question.question],
          '',
          ''
        ]), [])
      ]);
      this.styleCategoryCell(row.getCell(1));

      product.companies.forEach((_, index) => {
        worksheet.mergeCells(row.number, index * 3 + 3, row.number, index * 3 + 5);
      });

      if (question.question === 'Total price for this product/service') {
        const prices = product.companies.map(company => parseFloat(company.answers[question.question]));
        const lowestPrice = Math.min(...prices);
        row.eachCell((cell, colNumber) => {
          if (colNumber > 2 && colNumber % 3 === 0 && parseFloat(cell.value as string) === lowestPrice) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFD9F3AD' }
            };
          }
        });
      }
    });

    const memberRow = worksheet.addRow([
      '',
      'Committee Member',
      ...product.companies.reduce((acc: string[], company: Company) =>
        acc.concat(company.committeeMembers.map(member => `${member.name} (${member.role})`))
        , [])
    ]);
    memberRow.getCell(1).font = { bold: true };

    ['Score', 'Comment', 'Shortlisted'].forEach(category => {
      const row = worksheet.addRow([
        '',
        category,
        ...product.companies.reduce((acc: string[], company: Company) =>
          acc.concat(company.committeeMembers.map(member => member[category.toLowerCase()]))
          , [])
      ]);
      row.getCell(1).font = { bold: true };
    });

    this.applyTableStyling(worksheet, startRow, worksheet.rowCount);

    return worksheet.rowCount + 1;
  }

  async addFinalSummaryTable(worksheet: ExcelJS.Worksheet, startRow: number): Promise<number> {
    const titleRow = worksheet.addRow(['', 'Final Summary']);
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'center' };

    worksheet.addRow([]);

    const headerRow = worksheet.addRow(['', '', ...this.data.companies.map((c: Company) => c.name)]);
    this.styleHeaderRow(headerRow);

    const totalQuotedValues = this.companyTotals;
    const totalQuotedRow = worksheet.addRow(['', 'Total Quoted', ...totalQuotedValues]);
    this.styleCategoryCell(totalQuotedRow.getCell(2));
    totalQuotedRow.getCell(1).font = { bold: true };
    totalQuotedRow.eachCell((cell, colNumber) => {
      if (colNumber > 2) {
        cell.alignment = { horizontal: 'center' };
        if (this.isLowestPrice(parseFloat(cell.value as string), totalQuotedValues)) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF92D050' }
          };
        }
      }
    });

    const avgScoreValues = this.companyAvgScores.map((score: number) => `${score.toFixed(2)}%`);
    const avgScoreRow = worksheet.addRow(['', 'Avg Score %', ...avgScoreValues]);
    this.styleCategoryCell(avgScoreRow.getCell(2));
    avgScoreRow.getCell(1).font = { bold: true };
    avgScoreRow.eachCell((cell, colNumber) => {
      if (colNumber > 2) {
        cell.alignment = { horizontal: 'center' };
      }
    });

    this.applyTableStyling(worksheet, startRow, worksheet.rowCount);

    return worksheet.rowCount;
  }

  private readonly COMPANIES_PER_PAGE = 3;

  exportPDF(): void {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Shortlist Committee Report', style: 'header' },
        ...this.generateGeneralQuestionsTables(),
        ...this.generateProductTables(),
        this.generateFinalSummaryTable()
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'white',
          fillColor: '#00B050'
        }
      },
      defaultStyle: {
        fontSize: 10
      }
    };

    pdfMake.createPdf(docDefinition).download('ShortlistCommitteeReport.pdf');
  }

  private generateGeneralQuestionsTables() {
    const tables = [];
    for (let i = 0; i < this.data.companies.length; i += this.COMPANIES_PER_PAGE) {
      const companiesGroup = this.data.companies.slice(i, i + this.COMPANIES_PER_PAGE);
      tables.push(this.createGeneralQuestionsTable(companiesGroup, i === 0));
    }
    return tables;
  }

  private createGeneralQuestionsTable(companies, isFirstTable) {
    const table = {
      table: {
        headerRows: 2,
        body: [
          [
            { text: 'Category', style: 'tableHeader', rowSpan: 2 },
            { text: 'General Questions', style: 'tableHeader', rowSpan: 2 },
            { text: 'Companies', style: 'tableHeader', colSpan: companies.length * 3 },
            ...Array(companies.length * 3 - 1).fill({})
          ],
          [
            {}, {},
            ...companies.flatMap(company => [
              { text: company.name, style: 'tableHeader', colSpan: 3 },
              {}, {}
            ])
          ],
          [
            { text: 'Number of Members Shortlisted', colSpan: 2 },
            {},
            ...companies.flatMap(company => [
              { text: company.shortlistedMembers, colSpan: 3 },
              {}, {}
            ])
          ]
        ]
      }
    };

    this.data.generalQuestions.forEach(question => {
      table.table.body.push([
        question.category,
        question.question,
        ...companies.reduce((acc, company) =>
          acc.concat([{ text: company.answers[question.question], colSpan: 3 }, {}, {}]), [])
      ]);
    });

    ['Committee Member', 'Score', 'Comment', 'Shortlisted'].forEach(row => {
      table.table.body.push([
        { text: row, colSpan: 2 },
        {},
        ...companies.reduce((acc, company) =>
          acc.concat(company.committeeMembers.map(member =>
            row === 'Committee Member' ? `${member.name} (${member.role})` : member[row.toLowerCase()]
          )), [])
      ]);
    });

    table.table.body.push([
      { text: 'Average Score', colSpan: 2 },
      {},
      ...companies.map(company => ({ text: this.calculateAverageScore(company), colSpan: 3 })),
      ...Array(companies.length * 2).fill({})
    ]);

    return [
      { text: isFirstTable ? 'General Questions' : 'General Questions (Continued)', style: 'subheader', pageBreak: isFirstTable ? undefined : 'before' },
      table
    ];
  }

  private generateProductTables() {
    return this.data.products.reduce((acc, product) => {
      const tables = [];
      for (let i = 0; i < product.companies.length; i += this.COMPANIES_PER_PAGE) {
        const companiesGroup = product.companies.slice(i, i + this.COMPANIES_PER_PAGE);
        tables.push(this.createProductTable(product, companiesGroup, i === 0));
      }
      return acc.concat(tables);
    }, []);
  }

  private createProductTable(product, companies, isFirstTable) {
    const table = {
      table: {
        headerRows: 2,
        body: [
          [
            { text: 'Category', style: 'tableHeader', rowSpan: 2 } as TableCell,
            { text: 'Question', style: 'tableHeader', rowSpan: 2 } as TableCell,
            { text: 'Companies', style: 'tableHeader', colSpan: companies.length * 3 } as TableCell,
            ...Array(companies.length * 3 - 1).fill({})
          ],
          [
            {}, {},
            ...companies.flatMap(company => [
              { text: company.name, style: 'tableHeader', colSpan: 3 } as TableCell,
              {}, {}
            ])
          ],
          [
            { text: 'Number of Members Shortlisted', colSpan: 2 } as TableCell,
            {},
            ...companies.flatMap(company => [
              { text: company.shortlistedMembers, colSpan: 3 } as TableCell,
              {}, {}
            ])
          ]
        ] as TableCell[][]
      }
    };

    product.generalQuestions.forEach(question => {
      const row: TableCell[] = [
        { text: question.category } as TableCell,
        { text: question.question } as TableCell,
        ...companies.reduce((acc: TableCell[], company) => {
          const cell: TableCell = { text: company.answers[question.question], colSpan: 3 };
          if (question.question === 'Total price for this product/service' && company.isLowestPrice) {
            cell.fillColor = '#D9F3AD';
          }
          return acc.concat([cell, {}, {}]);
        }, [])
      ];
      table.table.body.push(row);
    });

    ['Committee Member', 'Score', 'Comment', 'Shortlisted'].forEach(rowLabel => {
      const row: TableCell[] = [
        { text: rowLabel, colSpan: 2 } as TableCell,
        {},
        ...companies.reduce((acc: TableCell[], company) =>
          acc.concat(company.committeeMembers.map(member =>
            ({ text: rowLabel === 'Committee Member' ? `${member.name} (${member.role})` : member[rowLabel.toLowerCase()] } as TableCell)
          )), [])
      ];
      table.table.body.push(row);
    });

    return [
      { text: isFirstTable ? product.name : `${product.name} (Continued)`, style: 'subheader', pageBreak: 'before' },
      table
    ];
  }

  private generateFinalSummaryTable() {
    const table = {
      table: {
        headerRows: 1,
        body: [
          [
            { text: '', style: 'tableHeader' },
            ...this.data.companies.map(company => ({ text: company.name, style: 'tableHeader' }))
          ],
          [
            'Total Quoted',
            ...this.companyTotals.map((total, index) => ({
              text: total.toFixed(2),
              fillColor: this.isLowestPrice(total, this.companyTotals) ? '#92D050' : null
            }))
          ],
          [
            'Avg Score %',
            ...this.companyAvgScores.map(score => score.toFixed(2) + '%')
          ]
        ]
      }
    };

    return [
      { text: 'Final Summary', style: 'subheader', pageBreak: 'before' },
      table
    ];
  }
}