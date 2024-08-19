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

    // Export Shortlist Committee 2 tab
    console.log('Attempting to export Shortlist Committee 2');
    if (this.shortlistCommittee2Component) {
      console.log('Shortlist Committee 2 component found');
      try {
        const shortlistCommittee2Worksheet = await this.shortlistCommittee2Component.getWorksheet();
        console.log('Shortlist Committee 2 worksheet obtained');
        this.copyWorksheet(shortlistCommittee2Worksheet, workbook, 'Shortlist Committee 2');
        console.log('Shortlist Committee 2 worksheet copied to workbook');
      } catch (error) {
        console.error('Error exporting Shortlist Committee 2:', error);
      }
    } else {
      console.log('Shortlist Committee 2 component not found');
    }

    // Export Preaward Committee tab
    console.log('Attempting to export Preaward Committee');
    if (this.preawardCommitteeComponent) {
      console.log('Preaward Committee component found');
      try {
        const preawardCommitteeWorksheet = await this.preawardCommitteeComponent.getWorksheet();
        console.log('Preaward Committee worksheet obtained');
        this.copyWorksheet(preawardCommitteeWorksheet, workbook, 'Preaward Committee');
        console.log('Preaward Committee worksheet copied to workbook');
      } catch (error) {
        console.error('Error exporting Preaward Committee:', error);
      }
    } else {
      console.log('Preaward Committee component not found');
    }

    // Export PreAward (Awarder) tab
    console.log('Attempting to export PreAward (Awarder)');
    if (this.awarderComponent) {
      console.log('PreAward Committee component found');
      try {
        const preawardCommitteeWorksheet = await this.awarderComponent.getWorksheet();
        console.log('PreAward Committee worksheet obtained');
        this.copyWorksheet(preawardCommitteeWorksheet, workbook, 'Awarder');
        console.log('PreAward Committee worksheet copied to workbook');
      } catch (error) {
        console.error('Error exporting PreAward Committee:', error);
      }
    } else {
      console.log('PreAward Committee component not found');
    }

    // Export Score Sheet tab
    console.log('Attempting to export Score Sheet');
    if (this.scoreSheetComponent) {
      console.log('Score Sheet component found');
      try {
        const scoreSheetWorksheet = await this.scoreSheetComponent.getWorksheet();
        console.log('Score Sheet worksheet obtained');
        this.copyWorksheet(scoreSheetWorksheet, workbook, 'Score Sheet');
        console.log('Score Sheet worksheet copied to workbook');
      } catch (error) {
        console.error('Error exporting Score Sheet:', error);
      }
    } else {
      console.log('Score Sheet component not found');
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
