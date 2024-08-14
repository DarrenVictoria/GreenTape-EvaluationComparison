import { Component, ViewChild } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { BidComparisonTableComponent } from '../bid-comparison-table/bid-comparison-table.component';

@Component({
  selector: 'app-evaluation-comparison-tabs',
  templateUrl: './evaluation-comparison-tabs.component.html',
  styleUrls: ['./evaluation-comparison-tabs.component.css']
})
export class EvaluationComparisonTabsComponent {
  @ViewChild(BidComparisonTableComponent) bidComparisonTableComponent: BidComparisonTableComponent;

  activeTab: number = 0;
  tabs = [
    { title: 'Bid Comparison', component: 'BidComparisonTableComponent' },
    { title: 'Tab 2', component: 'PlaceholderComponent' },
    { title: 'Tab 3', component: 'PlaceholderComponent' },
    { title: 'Tab 4', component: 'PlaceholderComponent' },
    { title: 'Tab 5', component: 'PlaceholderComponent' },
    { title: 'Tab 6', component: 'PlaceholderComponent' }
  ];

  constructor() { }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  async exportAllToExcel() {
    const workbook = new ExcelJS.Workbook();

    // Export the Bid Comparison tab
    if (this.bidComparisonTableComponent) {
      const worksheet = await this.bidComparisonTableComponent.getWorksheet();
      const newWorksheet = workbook.addWorksheet('Bid Comparison');

      // Copy styles and column widths
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        const newRow = newWorksheet.getRow(rowNumber);
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const newCell = newRow.getCell(colNumber);
          newCell.value = cell.value;
          newCell.style = JSON.parse(JSON.stringify(cell.style)); // Deep copy of style
        });
        newRow.height = row.height;
      });

      // Copy column widths
      worksheet.columns.forEach((col: any, index: number) => {
        if (col.width) {
          newWorksheet.getColumn(index + 1).width = col.width;
        }
      });

      // Highlight lowest prices and total quoted values
      this.highlightLowestPrices(newWorksheet);
      this.highlightLowestTotalQuoted(newWorksheet);
    }

    // Optionally export other tabs
    // ...

    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'EvaluationComparison.xlsx');
    });
  }

  private highlightLowestPrices(worksheet: ExcelJS.Worksheet) {
    const priceQuestionText = 'Total price for this product/service';
    let inPricingSection = false;
    let priceRow: ExcelJS.Row | null = null;

    worksheet.eachRow((row, rowNumber) => {
      const firstCell = row.getCell(1);
      const secondCell = row.getCell(2);

      if (firstCell.value === 'Pricing') {
        inPricingSection = true;
      } else if (firstCell.value && firstCell.value !== 'Pricing') {
        inPricingSection = false;
      }

      if (inPricingSection && secondCell.value === priceQuestionText) {
        priceRow = row;
        this.highlightLowestPrice(priceRow);
      }
    });
  }

  private highlightLowestTotalQuoted(worksheet: ExcelJS.Worksheet) {
    const totalQuotedText = 'Total Quoted';
    let totalQuotedRow: ExcelJS.Row | null = null;

    worksheet.eachRow((row, rowNumber) => {
      const firstCell = row.getCell(1);
      const secondCell = row.getCell(2);

      if (secondCell.value === totalQuotedText) {
        totalQuotedRow = row;
        this.highlightLowestTotalQuotedValues(totalQuotedRow);
      }
    });
  }

  private highlightLowestTotalQuotedValues(row: ExcelJS.Row | null) {
    if (!row) return;

    const totals: number[] = [];
    const totalCells: { cell: ExcelJS.Cell; value: number }[] = [];

    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      if (colNumber > 2) {
        const value = Number(cell.value);
        if (!isNaN(value)) {
          totals.push(value);
          totalCells.push({ cell, value });
        }
      }
    });

    if (totals.length > 0) {
      const lowestTotal = Math.min(...totals);
      totalCells.forEach(({ cell, value }) => {
        if (value === lowestTotal) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD9F3AD' } // Light green fill
          };
        } else {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' } // White (no fill)
          };
        }
      });
    }
  }

  private highlightLowestPrice(row: ExcelJS.Row) {
    const prices: number[] = [];
    const priceCells: { cell: ExcelJS.Cell; price: number }[] = [];

    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      if (colNumber > 2) {
        const price = Number(cell.value);
        if (!isNaN(price)) {
          prices.push(price);
          priceCells.push({ cell, price });
        }
      }
    });

    if (prices.length > 0) {
      const lowestPrice = Math.min(...prices);
      priceCells.forEach(({ cell, price }) => {
        if (price === lowestPrice) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD9F3AD' } // Light green fill
          };
        } else {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFFFF' } // White (no fill)
          };
        }
      });
    }
  }
}
