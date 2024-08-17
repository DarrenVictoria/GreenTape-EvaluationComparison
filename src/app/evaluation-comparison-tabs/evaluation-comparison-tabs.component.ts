import { Component, ViewChild } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { BidComparisonTableComponent } from '../bid-comparison-table/bid-comparison-table.component';
import { ShortlistCommitteeComponent } from '../shortlist-committee/shortlist-committee.component';
import { PreawardCommitteeComponent } from '../preaward-committee/preaward-committee.component';

@Component({
  selector: 'app-evaluation-comparison-tabs',
  templateUrl: './evaluation-comparison-tabs.component.html',
  styleUrls: ['./evaluation-comparison-tabs.component.css']
})
export class EvaluationComparisonTabsComponent {
  @ViewChild(BidComparisonTableComponent) bidComparisonTableComponent: BidComparisonTableComponent;
  @ViewChild(ShortlistCommitteeComponent) shortlistCommitteeComponent: ShortlistCommitteeComponent;
  @ViewChild(PreawardCommitteeComponent) preawardCommitteeComponent: PreawardCommitteeComponent;

  activeTab: number = 0;
  tabs = [
    { title: 'Bid Comparison', component: 'BidComparisonTableComponent' },
    { title: 'Shortlist Committee 1', component: 'ShortlistCommitteeComponent' },
    { title: 'Shortlist 2 Commitee', component: 'PlaceholderComponent' },
    { title: 'Preaward Commitee', component: 'PlaceholderComponent' },
    { title: 'Awarder', component: 'PreawardCommitteeComponent' },
    { title: 'Score Sheet ', component: 'PlaceholderComponent' }
  ];

  constructor() { }

  ngAfterViewInit() {
    console.log('Bid Comparison Component:', this.bidComparisonTableComponent);
    console.log('Shortlist Committee Component:', this.shortlistCommitteeComponent);
    console.log('Award Committee Component:', this.preawardCommitteeComponent);
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  // async exportAllToExcel() {
  //   const workbook = new ExcelJS.Workbook();

  //   // Export the Bid Comparison tab
  //   if (this.bidComparisonTableComponent) {
  //     const worksheet = await this.bidComparisonTableComponent.getWorksheet();
  //     const newWorksheet = workbook.addWorksheet('Bid Comparison');

  //     // Copy styles and column widths
  //     worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
  //       const newRow = newWorksheet.getRow(rowNumber);
  //       row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
  //         const newCell = newRow.getCell(colNumber);
  //         newCell.value = cell.value;
  //         newCell.style = JSON.parse(JSON.stringify(cell.style)); // Deep copy of style
  //       });
  //       newRow.height = row.height;
  //     });

  //     // Copy column widths
  //     worksheet.columns.forEach((col: any, index: number) => {
  //       if (col.width) {
  //         newWorksheet.getColumn(index + 1).width = col.width;
  //       }
  //     });

  //     // Highlight lowest prices and total quoted values
  //     this.highlightLowestPrices(newWorksheet);
  //     this.highlightLowestTotalQuoted(newWorksheet);
  //   }

  //   // Optionally export other tabs
  //   // ...

  //   workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
  //     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     FileSaver.saveAs(blob, 'EvaluationComparison.xlsx');
  //   });
  // }

  // async exportAllToExcel() {
  //   const workbook = new ExcelJS.Workbook();

  //   // Export the Bid Comparison tab
  //   if (this.bidComparisonTableComponent) {
  //     const bidComparisonWorksheet = await this.bidComparisonTableComponent.getWorksheet();
  //     this.copyWorksheet(bidComparisonWorksheet, workbook, 'Bid Comparison');

  //     // Apply additional formatting (if needed)
  //     const newWorksheet = workbook.getWorksheet('Bid Comparison');
  //     this.highlightLowestPrices(newWorksheet);
  //     this.highlightLowestTotalQuoted(newWorksheet);
  //   }

  //   // Export the Shortlist Committee tab
  //   if (this.shortlistCommitteeComponent) {
  //     const shortlistCommitteeWorksheet = await this.shortlistCommitteeComponent.getWorksheet();
  //     this.copyWorksheet(shortlistCommitteeWorksheet, workbook, 'Shortlist Committee');
  //   }

  //   // Generate and save the Excel file
  //   const buffer = await workbook.xlsx.writeBuffer();
  //   const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   FileSaver.saveAs(blob, 'EvaluationComparison.xlsx');
  // }S

  async exportBidComparisonAndShortlistToExcel() {
    console.log('Starting export process');
    const workbook = new ExcelJS.Workbook();

    // Export Bid Comparison tab
    console.log('Attempting to export Bid Comparison');
    if (this.bidComparisonTableComponent) {
      console.log('Bid Comparison component found');
      try {
        const bidComparisonWorksheet = await this.bidComparisonTableComponent.getWorksheet();
        console.log('Bid Comparison worksheet obtained');
        this.copyWorksheet(bidComparisonWorksheet, workbook, 'Bid Comparison');
        console.log('Bid Comparison worksheet copied to workbook');

        // Apply additional formatting
        const bidComparisonSheet = workbook.getWorksheet('Bid Comparison');
        this.highlightLowestPrices(bidComparisonSheet);
        this.highlightLowestTotalQuoted(bidComparisonSheet);
        console.log('Bid Comparison formatting applied');
      } catch (error) {
        console.error('Error exporting Bid Comparison:', error);
      }
    } else {
      console.log('Bid Comparison component not found');
    }

    // Export Shortlist Committee 1 tab
    console.log('Attempting to export Shortlist Committee 1');
    if (this.shortlistCommitteeComponent) {
      console.log('Shortlist Committee component found');
      try {
        const shortlistCommitteeWorksheet = await this.shortlistCommitteeComponent.getWorksheet();
        console.log('Shortlist Committee worksheet obtained');
        this.copyWorksheet(shortlistCommitteeWorksheet, workbook, 'Shortlist Committee 1');
        console.log('Shortlist Committee worksheet copied to workbook');
      } catch (error) {
        console.error('Error exporting Shortlist Committee:', error);
      }
    } else {
      console.log('Shortlist Committee component not found');
    }

    // Export PreAward (Awarder) tab
    console.log('Attempting to export PreAward (Awarder)');
    if (this.preawardCommitteeComponent) {
      console.log('PreAward Committee component found');
      try {
        const preawardCommitteeWorksheet = await this.preawardCommitteeComponent.getWorksheet();
        console.log('PreAward Committee worksheet obtained');
        this.copyWorksheet(preawardCommitteeWorksheet, workbook, 'Awarder');
        console.log('PreAward Committee worksheet copied to workbook');
      } catch (error) {
        console.error('Error exporting PreAward Committee:', error);
      }
    } else {
      console.log('PreAward Committee component not found');
    }

    // Generate and save the Excel file
    console.log('Generating Excel file');
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Evaluation Comparison.xlsx');
      console.log('Excel file saved successfully');
    } catch (error) {
      console.error('Error saving Excel file:', error);
    }
  }

  private copyWorksheet(sourceWorksheet: ExcelJS.Worksheet, targetWorkbook: ExcelJS.Workbook, sheetName: string) {
    const newWorksheet = targetWorkbook.addWorksheet(sheetName);

    // Copy rows and cells
    sourceWorksheet.eachRow((row, rowNumber) => {
      const newRow = newWorksheet.getRow(rowNumber);
      row.eachCell((cell, colNumber) => {
        const newCell = newRow.getCell(colNumber);
        newCell.value = cell.value;
        newCell.style = JSON.parse(JSON.stringify(cell.style)); // Deep copy of style
      });
      newRow.height = row.height;
    });

    // Copy column properties
    sourceWorksheet.columns.forEach((col, index) => {
      const newCol = newWorksheet.getColumn(index + 1);
      Object.assign(newCol, col);
    });

    // Copy worksheet properties
    newWorksheet.properties = Object.assign({}, sourceWorksheet.properties);
    newWorksheet.views = sourceWorksheet.views.map(view => Object.assign({}, view));
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
