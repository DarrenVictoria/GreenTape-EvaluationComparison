import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { AwarderService } from '../services/awarder.service';
import { AwarderConvertorService } from '../convertors/awarder-convetor.service';
import { AwarderFullData, Product, RejectedProduct } from '../models/awarder.model';

@Component({
  selector: 'app-awarder',
  templateUrl: './awarder.component.html',
  styleUrls: ['./awarder.component.css']
})
export class AwarderComponent implements OnInit {
  awarderData: AwarderFullData;

  constructor(
    private awarderService: AwarderService,
    private awarderConvertorService: AwarderConvertorService
  ) { }

  ngOnInit() {
    this.loadAwarderData();
  }

  loadAwarderData() {
    this.awarderService.getAwarderData().subscribe(
      data => {
        this.awarderData = this.awarderConvertorService.highlightLowestPrices(data);
      },
      error => console.error('Error loading awarder data:', error)
    );
  }
  async getWorksheet(): Promise<ExcelJS.Worksheet> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Awarder Report');

    let currentRow = 1;

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 69;
    for (let i = 3; i <= 60; i++) {
      worksheet.getColumn(i).width = 40;
    }

    currentRow = await this.addShortlistedSuppliers(worksheet, currentRow);
    worksheet.addRow([]);
    currentRow++;

    currentRow = await this.addRejectedSuppliers(worksheet, currentRow);
    worksheet.addRow([]);
    currentRow++;

    currentRow = await this.addAdditionalTables(worksheet, currentRow);

    return worksheet;
  }

  async addShortlistedSuppliers(worksheet: ExcelJS.Worksheet, startRow: number): Promise<number> {
    const titleRow = worksheet.addRow(['', 'Shortlisted Suppliers']);
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'left' };
    startRow++;

    this.awarderData.shortlistedProducts.products.forEach((product: Product) => {
      const productHeaderRow = worksheet.addRow([
        '',
        `${product.name} (${product.unitCount} units)`,
        ...product.companies.map(c => c.name)
      ]);
      this.styleHeaderRow(productHeaderRow);

      const awardedUnitsRow = worksheet.addRow([
        '',
        'Awarded Units',
        ...product.companies.map(c => `${c.awardedUnits} / ${product.unitCount} units`)
      ]);

      product.generalQuestions.forEach(question => {
        const row = worksheet.addRow([
          question.category,
          question.question,
          ...product.companies.map(company => company.answers[question.question] as string)
        ]);
        this.styleCategoryCell(row.getCell(1));

        if (question.question === 'Total price for this product/service') {
          row.eachCell((cell, colNumber) => {
            if (colNumber > 2 && product.companies[colNumber - 3].isLowestPrice) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD9F3AD' }
              };
            }
          });
        }
      });

      ['Committee Member', 'Comment'].forEach(category => {
        const row = worksheet.addRow([
          '',
          category,
          ...product.companies.map(company => {
            const committeeMember = company.committeeMembers[0];
            return category === 'Committee Member'
              ? `${committeeMember.name} (${committeeMember.role})`
              : committeeMember.comment;
          })
        ]);
        row.getCell(2).font = { bold: true };
      });

      worksheet.addRow([]);
    });

    this.applyTableStyling(worksheet, startRow, worksheet.rowCount);
    return worksheet.rowCount + 1;
  }

  async addRejectedSuppliers(worksheet: ExcelJS.Worksheet, startRow: number): Promise<number> {
    const titleRow = worksheet.addRow(['', 'Rejected Suppliers']);
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'left' };
    startRow++;

    this.awarderData.rejectedProducts.products.forEach((product: RejectedProduct) => {
      const productHeaderRow = worksheet.addRow([
        '',
        product.name,
        ...product.suppliers.map(s => s.name)
      ]);
      this.styleHeaderRow(productHeaderRow);

      product.generalQuestions.forEach(question => {
        const row = worksheet.addRow([
          question.category,
          question.question,
          ...product.suppliers.map(supplier => supplier.answers[question.question] as string)
        ]);
        this.styleCategoryCell(row.getCell(1));

        if (question.question === 'Total price for this product/service') {
          row.eachCell((cell, colNumber) => {
            if (colNumber > 2 && product.suppliers[colNumber - 3].isLowestPrice) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD9F3AD' }
              };
            }
          });
        }
      });

      ['Committee Member', 'Comment'].forEach(category => {
        const row = worksheet.addRow([
          '',
          category,
          ...product.suppliers.map(supplier => {
            const committeeMember = supplier.committeeMembers[0];
            return category === 'Committee Member'
              ? `${committeeMember.name} (${committeeMember.role})`
              : committeeMember.comment;
          })
        ]);
        row.getCell(2).font = { bold: true };
      });

      worksheet.addRow([]);
    });

    this.applyTableStyling(worksheet, startRow, worksheet.rowCount);
    return worksheet.rowCount + 1;
  }

  async addAdditionalTables(worksheet: ExcelJS.Worksheet, startRow: number): Promise<number> {
    const tables = [
      {
        title: 'Lowest Price Quoted',
        headers: ['Product', 'Supplier', 'Price'],
        data: this.awarderData.lowestPriceQuoted
      },
      {
        title: 'Amended Product Quantities',
        headers: ['Product', 'Original Quantity', 'New Quantity', 'Remarks'],
        data: this.awarderData.amendedProductQuantities
      },
    ];

    for (const table of tables) {
      const titleRow = worksheet.addRow(['', table.title]);
      titleRow.getCell(2).font = { bold: true, size: 14 };
      startRow++;

      const headerRow = worksheet.addRow(['', ...table.headers]);
      this.styleHeaderRow(headerRow);
      startRow++;

      for (const row of table.data) {
        worksheet.addRow(['', ...Object.values(row)]);
        startRow++;
      }

      this.applyTableStyling(worksheet, startRow - table.data.length, startRow);

      worksheet.addRow([]);
      startRow++;
    }

    return startRow;
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
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
    });
  }

  styleCategoryCell(cell: ExcelJS.Cell) {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9D9D9' }
    };
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle' };
  }

  applyTableStyling(worksheet: ExcelJS.Worksheet, startRow: number, endRow: number) {
    for (let i = startRow; i <= endRow; i++) {
      const row = worksheet.getRow(i);
      row.eachCell((cell, colNumber) => {
        if (colNumber > 1) {
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
}