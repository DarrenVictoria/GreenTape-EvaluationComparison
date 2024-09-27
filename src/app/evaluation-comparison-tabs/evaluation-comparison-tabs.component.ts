
import { Component, ViewChild, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { BidComparisonTableComponent } from '../bid-comparison-table/bid-comparison-table.component';
import { ShortlistCommitteeComponent } from '../shortlist-committee/shortlist-committee.component';
import { ShortlistCommittee2Component } from '../shortlist-committee-2/shortlist-committee-2.component';
import { PreawardCommitteeComponent } from '../preaward-committee/preaward-committee.component';
import { AwarderComponent } from '../awarder/awarder.component';
import { ScoreSheetComponent } from '../score-sheet/score-sheet.component';
import { TenderDetailsService } from '../services/tender-details.service';
import { TenderDetailsConverterService } from '../convertors/tender-details-convertor.service';
import { TenderDetails } from '../models/tender-details.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-evaluation-comparison-tabs',
  templateUrl: './evaluation-comparison-tabs.component.html',
  styleUrls: ['./evaluation-comparison-tabs.component.css']
})
export class EvaluationComparisonTabsComponent implements OnInit {
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

  tenderDetails: { [key: string]: string | number };

  constructor(
    private tenderDetailsService: TenderDetailsService,
    private tenderDetailsConverterService: TenderDetailsConverterService
  ) { }

  ngOnInit() {
    this.loadTenderDetails();
  }

  loadTenderDetails() {
    this.tenderDetailsService.getTenderDetails().subscribe(
      (data: TenderDetails) => {
        this.tenderDetails = this.tenderDetailsConverterService.convertToDisplayFormat(data);
      },
      error => console.error('Error loading tender details:', error)
    );
  }

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

    const logoId = workbook.addImage({
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
    worksheet.mergeCells(startRow, 1, startRow, 2);

    startRow++;

    Object.entries(this.tenderDetails).forEach(([key, value]) => {
      const row = worksheet.getRow(startRow++);
      row.getCell(1).value = key;
      row.getCell(2).value = value;

      // Style the first cell (key)
      const firstCell = row.getCell(1);
      firstCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF00B050' }
      };
      firstCell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      firstCell.alignment = { vertical: 'middle' };

      // Style the second cell (value)
      const secondCell = row.getCell(2);
      secondCell.alignment = { vertical: 'middle' };
    });

    this.applyTableStyling(worksheet, startRow - Object.keys(this.tenderDetails).length, startRow - 1);

    return startRow;
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
    footerRow.getCell(1).value = 'Generated by Green Tape';
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

  async exportAllPDF(): Promise<void> {
    console.log('Starting PDF export process');
    try {
      const componentsToExport = [
        { component: this.bidComparisonTableComponent, title: 'Bid Comparison' },
        { component: this.shortlistCommitteeComponent, title: 'Shortlist Committee 1' },
        { component: this.shortlistCommittee2Component, title: 'Shortlist Committee 2' },
        { component: this.preawardCommitteeComponent, title: 'Preaward Committee' },
        { component: this.awarderComponent, title: 'Awarder' },
      ];

      const pdfDocuments = await Promise.all(
        componentsToExport.map(({ component, title }) =>
          this.getPdfFromComponent(component, title)
        )
      );

      // Generate merged PDF
      const mergedDocDefinition = this.mergePdfContent(pdfDocuments);
      if (mergedDocDefinition.content.length > 0) {
        pdfMake.createPdf(mergedDocDefinition).download('Evaluation_Comparison_Report.pdf');
      } else {
        console.error('No content in merged PDF definition');
      }

    } catch (error) {
      console.error('Error in PDF export process:', error);
    }
  }

  private async getPdfFromComponent(component: any, title: string): Promise<any> {
    console.log(`Getting PDF definition for ${title}`);
    if (component && typeof component.exportPDF === 'function') {
      try {
        const content = await component.exportPDF();
        return { title, content };
      } catch (error) {
        console.error(`Error getting PDF definition for ${title}:`, error);
        return { title, content: null };
      }
    } else {
      console.warn(`Component ${title} does not have an exportPDF method`);
      return { title, content: null };
    }
  }

  private mergePdfContent(documents: any[]): any {
    const mergedContent = {
      content: [],
      styles: {},
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
    };

    documents.forEach((doc, index) => {
      if (doc.content) {
        if (index > 0) {
          mergedContent.content.push({ text: '', pageBreak: 'before' });
        }

        // Add the title only if it's not already the first item in the content
        if (Array.isArray(doc.content.content) &&
          (doc.content.content.length === 0 ||
            doc.content.content[0].text !== doc.title)) {
          mergedContent.content.push({ text: doc.title, style: 'header', margin: [0, 0, 0, 10] });
        }

        // Merge the content
        if (Array.isArray(doc.content.content)) {
          mergedContent.content = mergedContent.content.concat(doc.content.content);
        } else {
          mergedContent.content.push(doc.content);
        }

        // Merge the styles
        if (doc.content.styles) {
          mergedContent.styles = { ...mergedContent.styles, ...doc.content.styles };
        }
      }
    });

    // Add a common header and footer
    mergedContent['header'] = (currentPage, pageCount) => ({
      text: `Evaluation Comparison Report - Page ${currentPage} of ${pageCount}`,
      alignment: 'right',
      margin: [40, 20, 40, 0],
      fontSize: 10
    });

    mergedContent['footer'] = (currentPage, pageCount) => ({
      text: `Generated by Green Tape - Page ${currentPage} of ${pageCount}`,
      alignment: 'center',
      margin: [40, 0, 40, 20],
      fontSize: 10
    });

    return mergedContent;
  }

}



