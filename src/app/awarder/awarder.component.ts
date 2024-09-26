import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { AwarderService } from '../services/awarder.service';
import { AwarderConvertorService } from '../convertors/awarder-convetor.service';
import { AwarderFullData, Product, RejectedProduct } from '../models/awarder.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';



(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  exportPDF() {
    const docDefinition: any = {
      content: [
        { text: 'Awarder Report', style: 'header' },
        ...this.getShortlistedSuppliersContent(),
        ...this.getRejectedSuppliersContent(),
        ...this.getLowestPriceQuotedContent(),
        ...this.getAmendedProductQuantitiesContent()
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
      },
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60]
    };

    pdfMake.createPdf(docDefinition).download('awarder-report.pdf');
  }

  private getShortlistedSuppliersContent(): any[] {
    const content: any[] = [
      { text: 'Shortlisted Suppliers', style: 'subheader' }
    ];

    this.awarderData.shortlistedProducts.products.forEach((product: Product) => {
      content.push({ text: `${product.name} (${product.unitCount} units)`, style: 'subheader' });

      const chunks = this.chunkArray(product.companies, 3);
      chunks.forEach((chunk, index) => {
        const tableBody = this.getTableBody(product, chunk);
        content.push({
          table: {
            headerRows: 1,
            body: tableBody
          },
          layout: {
            fillColor: (rowIndex: number, node: any, columnIndex: number) => {
              return (rowIndex === 0) ? '#00B050' : null;
            }
          },
          margin: [0, 0, 0, (index < chunks.length - 1) ? 10 : 20]
        });
      });
    });

    return content;
  }

  private getRejectedSuppliersContent(): any[] {
    const content: any[] = [
      { text: 'Rejected Suppliers', style: 'subheader' }
    ];

    this.awarderData.rejectedProducts.products.forEach((product: RejectedProduct) => {
      content.push({ text: product.name, style: 'subheader' });

      const chunks = this.chunkArray(product.suppliers, 3);
      chunks.forEach((chunk, index) => {
        const tableBody = this.getRejectedTableBody(product, chunk);
        content.push({
          table: {
            headerRows: 1,
            body: tableBody
          },
          layout: {
            fillColor: (rowIndex: number, node: any, columnIndex: number) => {
              return (rowIndex === 0) ? '#00B050' : null;
            }
          },
          margin: [0, 0, 0, (index < chunks.length - 1) ? 10 : 20]
        });
      });
    });

    return content;
  }

  private getTableBody(product: Product, companies: any[]): any[][] {
    const tableBody = [
      ['Question', ...companies.map(c => c.name)],
      ['Awarded Units', ...companies.map(c => `${c.awardedUnits} / ${product.unitCount} units`)]
    ];

    product.generalQuestions.forEach(question => {
      const row = [question.question, ...companies.map(company => company.answers[question.question] as string)];
      tableBody.push(row);
    });

    ['Committee Member', 'Comment'].forEach(category => {
      const row = [category, ...companies.map(company => {
        const committeeMember = company.committeeMembers[0];
        return category === 'Committee Member'
          ? `${committeeMember.name} (${committeeMember.role})`
          : committeeMember.comment;
      })];
      tableBody.push(row);
    });

    return tableBody;
  }

  private getRejectedTableBody(product: RejectedProduct, suppliers: any[]): any[][] {
    const tableBody = [
      ['Question', ...suppliers.map(s => s.name)]
    ];

    product.generalQuestions.forEach(question => {
      const row = [question.question, ...suppliers.map(supplier => supplier.answers[question.question] as string)];
      tableBody.push(row);
    });

    ['Committee Member', 'Comment'].forEach(category => {
      const row = [category, ...suppliers.map(supplier => {
        const committeeMember = supplier.committeeMembers[0];
        return category === 'Committee Member'
          ? `${committeeMember.name} (${committeeMember.role})`
          : committeeMember.comment;
      })];
      tableBody.push(row);
    });

    return tableBody;
  }

  private getLowestPriceQuotedContent(): any[] {
    return [
      { text: 'Lowest Price Quoted', style: 'subheader' },
      {
        table: {
          headerRows: 1,
          body: [
            ['Product', 'Supplier', 'Price'],
            ...this.awarderData.lowestPriceQuoted.map(item => [item.product, item.supplier, item.price])
          ]
        },
        layout: {
          fillColor: (rowIndex: number, node: any, columnIndex: number) => {
            return (rowIndex === 0) ? '#00B050' : null;
          }
        }
      }
    ];
  }

  private getAmendedProductQuantitiesContent(): any[] {
    return [
      { text: 'Amended Product Quantities', style: 'subheader' },
      {
        table: {
          headerRows: 1,
          body: [
            ['Product', 'Original Quantity', 'New Quantity', 'Remarks'],
            ...this.awarderData.amendedProductQuantities.map(item => [
              item.product, item.initialQuantity, item.amendedQuantity, item.remarks
            ])
          ]
        },
        layout: {
          fillColor: (rowIndex: number, node: any, columnIndex: number) => {
            return (rowIndex === 0) ? '#00B050' : null;
          }
        }
      }
    ];
  }

  private chunkArray(array: any[], chunkSize: number): any[][] {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  }

}