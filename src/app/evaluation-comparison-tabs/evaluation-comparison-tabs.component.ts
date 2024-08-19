// import { Component, ViewChild } from '@angular/core';
// import * as ExcelJS from 'exceljs';
// import * as FileSaver from 'file-saver';
// import { BidComparisonTableComponent } from '../bid-comparison-table/bid-comparison-table.component';
// import { ShortlistCommitteeComponent } from '../shortlist-committee/shortlist-committee.component';
// import { ShortlistCommittee2Component } from '../shortlist-committee-2/shortlist-committee-2.component';
// import { PreawardCommitteeComponent } from '../preaward-committee/preaward-committee.component';
// import { AwarderComponent } from '../awarder/awarder.component';
// import { ScoreSheetComponent } from '../score-sheet/score-sheet.component';

// @Component({
//   selector: 'app-evaluation-comparison-tabs',
//   templateUrl: './evaluation-comparison-tabs.component.html',
//   styleUrls: ['./evaluation-comparison-tabs.component.css']
// })
// export class EvaluationComparisonTabsComponent {
//   @ViewChild(BidComparisonTableComponent) bidComparisonTableComponent: BidComparisonTableComponent;
//   @ViewChild(ShortlistCommitteeComponent) shortlistCommitteeComponent: ShortlistCommitteeComponent;
//   @ViewChild(ShortlistCommittee2Component) shortlistCommittee2Component: ShortlistCommittee2Component;
//   @ViewChild(PreawardCommitteeComponent) preawardCommitteeComponent: PreawardCommitteeComponent;
//   @ViewChild(AwarderComponent) awarderComponent: AwarderComponent;
//   @ViewChild(ScoreSheetComponent) scoreSheetComponent: ScoreSheetComponent;

//   activeTab: number = 0;
//   tabs = [
//     { title: 'Bid Comparison', component: 'BidComparisonTableComponent' },
//     { title: 'Shortlist Committee 1', component: 'ShortlistCommitteeComponent' },
//     { title: 'Shortlist Committee 2', component: 'ShortlistCommittee2Component' },
//     { title: 'Preaward Committee', component: 'PreawardCommitteeComponent' },
//     { title: 'Awarder', component: 'AwarderComponent' },
//     { title: 'Score Sheet', component: 'ScoreSheetComponent' }
//   ];

//   constructor() { }

//   ngAfterViewInit() {
//     console.log('Bid Comparison Component:', this.bidComparisonTableComponent);
//     console.log('Shortlist Committee Component:', this.shortlistCommitteeComponent);
//     console.log('Shortlist Committee 2 Component:', this.shortlistCommittee2Component);
//     console.log('Preaward Committee Component:', this.preawardCommitteeComponent);
//     console.log('Award Committee Component:', this.awarderComponent);
//     console.log('Score Sheet Component:', this.scoreSheetComponent);
//   }

//   setActiveTab(index: number) {
//     this.activeTab = index;
//   }

//   async exportToExcel() {
//     console.log('Starting export process');
//     const workbook = new ExcelJS.Workbook();

//     // Export Bid Comparison tab
//     console.log('Attempting to export Bid Comparison');
//     if (this.bidComparisonTableComponent) {
//       console.log('Bid Comparison component found');
//       try {
//         const bidComparisonWorksheet = await this.bidComparisonTableComponent.getWorksheet();
//         console.log('Bid Comparison worksheet obtained');
//         this.copyWorksheet(bidComparisonWorksheet, workbook, 'Bid Comparison');
//         console.log('Bid Comparison worksheet copied to workbook');

//         // Apply additional formatting
//         const bidComparisonSheet = workbook.getWorksheet('Bid Comparison');
//         this.highlightLowestPrices(bidComparisonSheet);
//         this.highlightLowestTotalQuoted(bidComparisonSheet);
//         console.log('Bid Comparison formatting applied');
//       } catch (error) {
//         console.error('Error exporting Bid Comparison:', error);
//       }
//     } else {
//       console.log('Bid Comparison component not found');
//     }

//     // Export Shortlist Committee 1 tab
//     console.log('Attempting to export Shortlist Committee 1');
//     if (this.shortlistCommitteeComponent) {
//       console.log('Shortlist Committee component found');
//       try {
//         const shortlistCommitteeWorksheet = await this.shortlistCommitteeComponent.getWorksheet();
//         console.log('Shortlist Committee worksheet obtained');
//         this.copyWorksheet(shortlistCommitteeWorksheet, workbook, 'Shortlist Committee 1');
//         console.log('Shortlist Committee worksheet copied to workbook');
//       } catch (error) {
//         console.error('Error exporting Shortlist Committee:', error);
//       }
//     } else {
//       console.log('Shortlist Committee component not found');
//     }

//     // Export Shortlist Committee 2 tab
//     console.log('Attempting to export Shortlist Committee 2');
//     if (this.shortlistCommittee2Component) {
//       console.log('Shortlist Committee 2 component found');
//       try {
//         const shortlistCommittee2Worksheet = await this.shortlistCommittee2Component.getWorksheet();
//         console.log('Shortlist Committee 2 worksheet obtained');
//         this.copyWorksheet(shortlistCommittee2Worksheet, workbook, 'Shortlist Committee 2');
//         console.log('Shortlist Committee 2 worksheet copied to workbook');
//       } catch (error) {
//         console.error('Error exporting Shortlist Committee 2:', error);
//       }
//     } else {
//       console.log('Shortlist Committee 2 component not found');
//     }

//     // Export Preaward Committee tab
//     console.log('Attempting to export Preaward Committee');
//     if (this.preawardCommitteeComponent) {
//       console.log('Preaward Committee component found');
//       try {
//         const preawardCommitteeWorksheet = await this.preawardCommitteeComponent.getWorksheet();
//         console.log('Preaward Committee worksheet obtained');
//         this.copyWorksheet(preawardCommitteeWorksheet, workbook, 'Preaward Committee');
//         console.log('Preaward Committee worksheet copied to workbook');
//       } catch (error) {
//         console.error('Error exporting Preaward Committee:', error);
//       }
//     } else {
//       console.log('Preaward Committee component not found');
//     }

//     // Export PreAward (Awarder) tab
//     console.log('Attempting to export PreAward (Awarder)');
//     if (this.awarderComponent) {
//       console.log('PreAward Committee component found');
//       try {
//         const preawardCommitteeWorksheet = await this.awarderComponent.getWorksheet();
//         console.log('PreAward Committee worksheet obtained');
//         this.copyWorksheet(preawardCommitteeWorksheet, workbook, 'Awarder');
//         console.log('PreAward Committee worksheet copied to workbook');
//       } catch (error) {
//         console.error('Error exporting PreAward Committee:', error);
//       }
//     } else {
//       console.log('PreAward Committee component not found');
//     }

//     // Export Score Sheet tab
//     console.log('Attempting to export Score Sheet');
//     if (this.scoreSheetComponent) {
//       console.log('Score Sheet component found');
//       try {
//         const scoreSheetWorksheet = await this.scoreSheetComponent.getWorksheet();
//         console.log('Score Sheet worksheet obtained');
//         this.copyWorksheet(scoreSheetWorksheet, workbook, 'Score Sheet');
//         console.log('Score Sheet worksheet copied to workbook');
//       } catch (error) {
//         console.error('Error exporting Score Sheet:', error);
//       }
//     } else {
//       console.log('Score Sheet component not found');
//     }

//     // Generate and save the Excel file
//     console.log('Generating Excel file');
//     try {
//       const buffer = await workbook.xlsx.writeBuffer();
//       const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       FileSaver.saveAs(blob, 'Evaluation Comparison.xlsx');
//       console.log('Excel file saved successfully');
//     } catch (error) {
//       console.error('Error saving Excel file:', error);
//     }
//   }

//   private copyWorksheet(sourceWorksheet: ExcelJS.Worksheet, targetWorkbook: ExcelJS.Workbook, sheetName: string) {
//     const newWorksheet = targetWorkbook.addWorksheet(sheetName);

//     // Copy rows and cells
//     sourceWorksheet.eachRow((row, rowNumber) => {
//       const newRow = newWorksheet.getRow(rowNumber);
//       row.eachCell((cell, colNumber) => {
//         const newCell = newRow.getCell(colNumber);
//         newCell.value = cell.value;
//         newCell.style = JSON.parse(JSON.stringify(cell.style)); // Deep copy of style
//       });
//       newRow.height = row.height;
//     });

//     // Copy column properties
//     sourceWorksheet.columns.forEach((col, index) => {
//       const newCol = newWorksheet.getColumn(index + 1);
//       Object.assign(newCol, col);
//     });

//     // Copy worksheet properties
//     newWorksheet.properties = Object.assign({}, sourceWorksheet.properties);
//     newWorksheet.views = sourceWorksheet.views.map(view => Object.assign({}, view));
//   }

//   private highlightLowestPrices(worksheet: ExcelJS.Worksheet) {
//     const priceQuestionText = 'Total price for this product/service';
//     let inPricingSection = false;
//     let priceRow: ExcelJS.Row | null = null;

//     worksheet.eachRow((row, rowNumber) => {
//       const firstCell = row.getCell(1);
//       const secondCell = row.getCell(2);

//       if (firstCell.value === 'Pricing') {
//         inPricingSection = true;
//       } else if (firstCell.value && firstCell.value !== 'Pricing') {
//         inPricingSection = false;
//       }

//       if (inPricingSection && secondCell.value === priceQuestionText) {
//         priceRow = row;
//         this.highlightLowestPrice(priceRow);
//       }
//     });
//   }

//   private highlightLowestTotalQuoted(worksheet: ExcelJS.Worksheet) {
//     const totalQuotedText = 'Total Quoted';
//     let totalQuotedRow: ExcelJS.Row | null = null;

//     worksheet.eachRow((row, rowNumber) => {
//       const firstCell = row.getCell(1);
//       const secondCell = row.getCell(2);

//       if (secondCell.value === totalQuotedText) {
//         totalQuotedRow = row;
//         this.highlightLowestTotalQuotedValues(totalQuotedRow);
//       }
//     });
//   }

//   private highlightLowestTotalQuotedValues(row: ExcelJS.Row | null) {
//     if (!row) return;

//     const totals: number[] = [];
//     const totalCells: { cell: ExcelJS.Cell; value: number }[] = [];

//     row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
//       if (colNumber > 2) {
//         const value = Number(cell.value);
//         if (!isNaN(value)) {
//           totals.push(value);
//           totalCells.push({ cell, value });
//         }
//       }
//     });

//     if (totals.length > 0) {
//       const lowestTotal = Math.min(...totals);
//       totalCells.forEach(({ cell, value }) => {
//         if (value === lowestTotal) {
//           cell.fill = {
//             type: 'pattern',
//             pattern: 'solid',
//             fgColor: { argb: 'FFD9F3AD' } // Light green fill
//           };
//         } else {
//           cell.fill = {
//             type: 'pattern',
//             pattern: 'solid',
//             fgColor: { argb: 'FFFFFFFF' } // White (no fill)
//           };
//         }
//       });
//     }
//   }

//   private highlightLowestPrice(row: ExcelJS.Row) {
//     const prices: number[] = [];
//     const priceCells: { cell: ExcelJS.Cell; price: number }[] = [];

//     row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
//       if (colNumber > 2) {
//         const price = Number(cell.value);
//         if (!isNaN(price)) {
//           prices.push(price);
//           priceCells.push({ cell, price });
//         }
//       }
//     });

//     if (prices.length > 0) {
//       const lowestPrice = Math.min(...prices);
//       priceCells.forEach(({ cell, price }) => {
//         if (price === lowestPrice) {
//           cell.fill = {
//             type: 'pattern',
//             pattern: 'solid',
//             fgColor: { argb: 'FFD9F3AD' } // Light green fill
//           };
//         } else {
//           cell.fill = {
//             type: 'pattern',
//             pattern: 'solid',
//             fgColor: { argb: 'FFFFFFFF' } // White (no fill)
//           };
//         }
//       });
//     }
//   }
// }

import { Component, ViewChild } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { BidComparisonTableComponent } from '../bid-comparison-table/bid-comparison-table.component';
import { ShortlistCommitteeComponent } from '../shortlist-committee/shortlist-committee.component';
import { ShortlistCommittee2Component } from '../shortlist-committee-2/shortlist-committee-2.component';
import { PreawardCommitteeComponent } from '../preaward-committee/preaward-committee.component';
import { AwarderComponent } from '../awarder/awarder.component';
import { ScoreSheetComponent } from '../score-sheet/score-sheet.component';

@Component({
  selector: 'app-evaluation-comparison-tabs',
  templateUrl: './evaluation-comparison-tabs.component.html',
  styleUrls: ['./evaluation-comparison-tabs.component.css']
})
export class EvaluationComparisonTabsComponent {
  @ViewChild(BidComparisonTableComponent) bidComparisonTableComponent: BidComparisonTableComponent;
  @ViewChild(ShortlistCommitteeComponent) shortlistCommitteeComponent: ShortlistCommitteeComponent;
  @ViewChild(ShortlistCommittee2Component) shortlistCommittee2Component: ShortlistCommittee2Component;
  @ViewChild(PreawardCommitteeComponent) preawardCommitteeComponent: PreawardCommitteeComponent;
  @ViewChild(AwarderComponent) awarderComponent: AwarderComponent;
  @ViewChild(ScoreSheetComponent) scoreSheetComponent: ScoreSheetComponent;

  activeTab: number = 0;
  tabs = [
    { title: 'Bid Comparison', component: 'BidComparisonTableComponent' },
    { title: 'Shortlist Committee 1', component: 'ShortlistCommitteeComponent' },
    { title: 'Shortlist Committee 2', component: 'ShortlistCommittee2Component' },
    { title: 'Preaward Committee', component: 'PreawardCommitteeComponent' },
    { title: 'Awarder', component: 'AwarderComponent' },
    { title: 'Score Sheet', component: 'ScoreSheetComponent' }
  ];

  bidData = {
    "tenderDetails": {
      "TenderID": "HAY-7-TEN-61",
      "TenderName": "TEN#301 - Supply of Office Supplies",
      "TenderModel": "RFP (Request for Proposal)",
      "CreatedBy": "Hayleys Advantis | info@affnohayleys.lk",
      "CreatedOn": "01/10/2021 : 10:15:00 AM",
      "InvitedParticipants": 15,
      "Participated": 12,
      "NotSubmitted": 2,
      "RejectedTender": 1,
      "RroductCount": 18,
      "CommitteeMembers": 3,
      "CompletedDate": "20/10/2021 15:00"
    },
  };

  constructor() { }

  ngAfterViewInit() {
    console.log('Bid Comparison Component:', this.bidComparisonTableComponent);
    console.log('Shortlist Committee Component:', this.shortlistCommitteeComponent);
    console.log('Shortlist Committee 2 Component:', this.shortlistCommittee2Component);
    console.log('Preaward Committee Component:', this.preawardCommitteeComponent);
    console.log('Award Committee Component:', this.awarderComponent);
    console.log('Score Sheet Component:', this.scoreSheetComponent);
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  async exportToExcel() {
    console.log('Starting export process');
    const workbook = new ExcelJS.Workbook();

    // Define logo image (update with actual base64 data)
    const logoId = workbook.addImage({
      base64: 'data:image/png;base64,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',
      extension: 'png',
    });

    // Export each tab
    await this.exportTab(this.bidComparisonTableComponent, workbook, 'Bid Comparison', logoId);
    await this.exportTab(this.shortlistCommitteeComponent, workbook, 'Shortlist Committee 1', logoId);
    await this.exportTab(this.shortlistCommittee2Component, workbook, 'Shortlist Committee 2', logoId);
    await this.exportTab(this.preawardCommitteeComponent, workbook, 'Preaward Committee', logoId);
    await this.exportTab(this.awarderComponent, workbook, 'Awarder', logoId);
    await this.exportTab(this.scoreSheetComponent, workbook, 'Score Sheet', logoId);

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

  private async exportTab(component: any, workbook: ExcelJS.Workbook, sheetName: string, logoId: number) {
    if (component) {
      console.log(`Attempting to export ${sheetName}`);
      try {
        const worksheet = await component.getWorksheet();
        console.log(`${sheetName} worksheet obtained`);
        const newWorksheet = workbook.addWorksheet(sheetName);
        console.log(`New worksheet created for ${sheetName}`);

        // Add header
        this.addHeader(newWorksheet, logoId);

        // Add tender details
        const nextRow = await this.addTenderDetailsTable(newWorksheet, 4); // Start after header

        // Copy content from the component's worksheet, starting from the row after tender details
        this.copyWorksheetContent(worksheet, newWorksheet, nextRow);

        // Add footer
        this.addFooter(newWorksheet);

        // Apply additional formatting if needed
        if (sheetName === 'Bid Comparison') {
          this.highlightLowestPrices(newWorksheet);
          this.highlightLowestTotalQuoted(newWorksheet);
        }

        console.log(`${sheetName} formatting applied`);
      } catch (error) {
        console.error(`Error exporting ${sheetName}:`, error);
      }
    } else {
      console.log(`${sheetName} component not found`);
    }
  }

  private shiftContentDown(worksheet: ExcelJS.Worksheet, startRow: number) {
    const rowsToShift = worksheet.rowCount - startRow + 1;
    worksheet.spliceRows(startRow, 0, ...Array(rowsToShift).fill(null));
  }

  private addHeader(worksheet: ExcelJS.Worksheet, logoId: number) {
    // Set the height of the first row to accommodate the image
    worksheet.getRow(1).height = 40;

    // Add logo
    worksheet.addImage(logoId, {
      tl: { col: 0, row: 0 },
      ext: { width: 100, height: 50 }
    });

    // Add header text
    const headerRow = worksheet.getRow(2);
    headerRow.getCell(1).value = 'Evaluation Comparison Report';
    headerRow.getCell(1).font = { color: { argb: 'FF000000' }, bold: true, size: 16 };
    worksheet.mergeCells(2, 1, 2, 6);

    // Add a single empty row for minimal spacing
    worksheet.addRow([]);
  }

  private async addTenderDetailsTable(worksheet: ExcelJS.Worksheet, startRow: number): Promise<number> {
    const titleRow = worksheet.getRow(startRow);
    titleRow.getCell(1).value = 'Tender Details';
    titleRow.getCell(1).font = { bold: true, size: 14 };
    titleRow.getCell(1).alignment = { horizontal: 'left' };
    worksheet.mergeCells(startRow, 1, startRow, 2); // Merge only 2 cells

    startRow++;

    Object.entries(this.bidData.tenderDetails).forEach(([key, value]) => {
      const row = worksheet.getRow(startRow++);
      row.getCell(1).value = key;
      row.getCell(2).value = value;

      // Style the first cell (key)
      const firstCell = row.getCell(1);
      firstCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF00B050' } // Green color
      };
      firstCell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      firstCell.alignment = { vertical: 'middle' };

      // Style the second cell (value)
      const secondCell = row.getCell(2);
      secondCell.alignment = { vertical: 'middle' };
    });

    this.applyTableStyling(worksheet, startRow - Object.keys(this.bidData.tenderDetails).length, startRow - 1);

    return startRow; // Return the next available row immediately after the tender details
  }

  private applyTableStyling(worksheet: ExcelJS.Worksheet, startRow: number, endRow: number) {
    for (let i = startRow; i <= endRow; i++) {
      const row = worksheet.getRow(i);
      row.eachCell((cell, colNumber) => {
        if (colNumber > 1) { // Skip the first column
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



  private addFooter(worksheet: ExcelJS.Worksheet) {
    // Find the last row
    const lastRowNumber = worksheet.lastRow.number + 2; // Add space before footer
    const footerRow = worksheet.getRow(lastRowNumber);
    footerRow.getCell(1).value = 'Generated by Green Tape Enterprise';
    footerRow.getCell(1).font = { color: { argb: 'FF008C72' }, bold: true };
    worksheet.mergeCells(lastRowNumber, 1, lastRowNumber, this.tabs.length + 1);
  }

  private copyWorksheetContent(sourceWorksheet: ExcelJS.Worksheet, targetWorksheet: ExcelJS.Worksheet, startRow: number) {
    sourceWorksheet.eachRow((row, rowNumber) => {
      const newRow = targetWorksheet.getRow(startRow + rowNumber - 1);
      row.eachCell((cell, colNumber) => {
        const newCell = newRow.getCell(colNumber);
        newCell.value = cell.value;
        newCell.style = JSON.parse(JSON.stringify(cell.style)); // Deep copy of style
      });
      newRow.height = row.height;
    });

    // Copy column properties
    sourceWorksheet.columns.forEach((col, index) => {
      const newCol = targetWorksheet.getColumn(index + 1);
      Object.assign(newCol, col);
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

    const minTotal = Math.min(...totals);
    totalCells.forEach(({ cell, value }) => {
      if (value === minTotal) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF92D050' }, // Light green background
        };
      }
    });
  }

  private highlightLowestPrice(row: ExcelJS.Row | null) {
    if (!row) return;

    const prices: number[] = [];
    const priceCells: { cell: ExcelJS.Cell; value: number }[] = [];

    row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      if (colNumber > 2) {
        const value = Number(cell.value);
        if (!isNaN(value)) {
          prices.push(value);
          priceCells.push({ cell, value });
        }
      }
    });

    const minPrice = Math.min(...prices);
    priceCells.forEach(({ cell, value }) => {
      if (value === minPrice) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF92D050' }, // Light green background
        };
      }
    });
  }
}



