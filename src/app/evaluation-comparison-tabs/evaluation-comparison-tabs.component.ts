import { Component, ViewChild } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
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
        const newRow = newWorksheet.addRow(row.values);
        newRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const sourceCell = row.getCell(colNumber);
          newRow.getCell(colNumber).font = sourceCell.font;
          newRow.getCell(colNumber).fill = sourceCell.fill;
          newRow.getCell(colNumber).border = sourceCell.border;
          newRow.getCell(colNumber).alignment = { horizontal: 'left', vertical: 'middle' }; // Left alignment
        });
      });

      // Copy column widths
      worksheet.columns.forEach((col, index) => {
        newWorksheet.getColumn(index + 1).width = col.width;
      });
    }

    // Optionally export other tabs
    // Example:
    // const placeholderSheet = workbook.addWorksheet('Placeholder Tab');
    // placeholderSheet.addRow(['Placeholder Content']);

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'EvaluationComparison.xlsx');
    });
  }


}
