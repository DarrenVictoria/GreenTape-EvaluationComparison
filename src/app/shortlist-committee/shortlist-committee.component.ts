import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { ShortlistCommitteeService } from '../services/shortlist-committee.service';
import { ShortlistCommitteeConvertorService } from '../convertors/shortlist-committee-convertor.service';
import { ShortlistCommitteeData, Company, Product } from '../models/shortlist-committee.model';

@Component({
  selector: 'app-shortlist-committee',
  templateUrl: './shortlist-committee.component.html',
  styleUrls: ['./shortlist-committee.component.css']
})
export class ShortlistCommitteeComponent implements OnInit {
  data: ShortlistCommitteeData | null = null;
  companyTotals: number[] = [];
  companyAvgScores: number[] = [];

  constructor(
    private shortlistCommitteeService: ShortlistCommitteeService,
    private convertorService: ShortlistCommitteeConvertorService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.shortlistCommitteeService.getShortlistCommitteeData().subscribe(
      (data: ShortlistCommitteeData) => {
        this.data = data;
        this.companyTotals = this.convertorService.calculateCompanyTotals(this.data);
        this.companyAvgScores = this.convertorService.calculateCompanyAvgScores(this.data);
      },
      error => {
        console.error('Error loading shortlist committee data:', error);
        // You can add more detailed error handling here
      }
    );
  }
  // calculateCompanyTotals(): void {
  //   this.companyTotals = this.data.companies.map((company: Company) => {
  //     return this.data.products.reduce((total: number, product: Product) => {
  //       const companyProduct = product.companies.find(c => c.name === company.name);
  //       return total + (companyProduct ? parseFloat(companyProduct.answers['Total price for this product/service'] || '0') : 0);
  //     }, 0);
  //   });
  // }

  // calculateCompanyAvgScores(): void {
  //   if (this.data.products.length === 0 || this.data.products[0].companies.length === 0) {
  //     this.companyAvgScores = [];
  //     return;
  //   }

  //   const initialScores = new Array(this.data.products[0].companies.length).fill(0);

  //   this.companyAvgScores = this.data.products.reduce((acc: number[], product: Product) => {
  //     const productScores = product.companies.map(company => {
  //       const validScores = company.committeeMembers
  //         .map(member => parseFloat(member.score))
  //         .filter(score => !isNaN(score) && score > 0);

  //       return validScores.length > 0
  //         ? validScores.reduce((a, b) => a + b) / validScores.length
  //         : 0;
  //     });

  //     return acc.map((sum, idx) => sum + productScores[idx]);
  //   }, initialScores);

  //   const productCount = this.data.products.length;
  //   this.companyAvgScores = this.companyAvgScores.map(totalScore => totalScore / productCount);
  // }

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
    if (!this.data) {
      throw new Error('Data not loaded');
    }

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
}