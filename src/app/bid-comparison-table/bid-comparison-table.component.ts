import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface TenderDetails {
  tenderID: string;
  tenderName: string;
  tenderModel: string;
  createdBy: string;
  createdOn: string;
  invitedParticipants: number;
  participated: number;
  notSubmitted: number;
  rejectedTender: number;
  productCount: number;
  committeeMembers: number;
  completedDate: string;
}

@Component({
  selector: 'app-bid-comparison-table',
  templateUrl: './bid-comparison-table.component.html',
  styleUrls: ['./bid-comparison-table.component.css']
})
export class BidComparisonTableComponent implements OnInit {
  bidData = {
    tenderDetails: {
      tenderID: 'HAY-7-TEN-60',
      tenderName: 'TEN#300 - Supply of IT equipment ',
      tenderModel: 'RFI (Request for Information)',
      createdBy: 'Hayleys Advantis | info@affnohayleys.lk',
      createdOn: '20/09/2020 : 09:21:43 PM',
      invitedParticipants: 20,
      participated: 15,
      notSubmitted: 3,
      rejectedTender: 2,
      productCount: 22,
      committeeMembers: 4,
      completedDate: '10/10/2020 17:30'
    },
    companies: ['Matix Lanka', 'Silicon Limited', 'Tech Pod Inc', 'Cloud Tech Solutions', 'DigiQue Solutions', 'Oteq Lanka Pvt Limited'],
    generalQuestions: [
      { question: 'Are you ISO certified?', answers: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes'] },
      { question: 'How many employees in your company?', answers: [12, 2, 11, 25, 3, 35] },
      { question: 'Please list Service Level Agreements', answers: ['Document attached', 'Attached', 'Uploaded Soft Copy', 'Document Number 1 - Attached', 'Documents named Service Agreement uploaded', 'Document attached'] },
    ],
    productQuestions: [
      {
        category: 'Smart Televisions',
        items: [
          { question: 'Total price for this product/service', answers: [325000, 255000, 82000, 250000, 'NA', 250000] },
          { question: 'What is the display size', answers: ['25*55', '250*550', '25/52/250', '250x550', '500*750', '250x570'] },
        ]
      },
      {
        category: 'Projectors',
        items: [
          { question: 'Total price for this product/service', answers: [90000, 73000, 90000, 95000, 35000, 90000] },
          { question: 'What is the brightness level?', answers: ['yes', 'no', 'yes', 'yes', 'yes', 'yes'] },
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void { }

  public async getWorksheet(): Promise<ExcelJS.Worksheet> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Bid Comparison');

    // Define styles
    const headerStyle: Partial<ExcelJS.Style> = {
      font: { color: { argb: 'FFFFFFFF' }, bold: true },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4CAF50' } },
      alignment: { horizontal: 'left', vertical: 'middle' } // Left alignment
    };

    const borderStyle: Partial<ExcelJS.Borders> = {
      top: { style: 'thin', color: { argb: 'FF008C72' } },
      left: { style: 'thin', color: { argb: 'FF008C72' } },
      bottom: { style: 'thin', color: { argb: 'FF008C72' } },
      right: { style: 'thin', color: { argb: 'FF008C72' } }
    };

    const tenderDetailStyle: Partial<ExcelJS.Style> = {
      font: { color: { argb: 'FFFFFFFF' }, bold: true },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4CAF50' } },
      alignment: { horizontal: 'left', vertical: 'middle' } // Left alignment
    };

    // Add tender details at the top
    this.addTenderDetails(worksheet, headerStyle, tenderDetailStyle, borderStyle);

    // Add general questions section
    worksheet.addRow([]);
    this.addGeneralQuestions(worksheet, headerStyle, borderStyle);

    // Add product questions section
    worksheet.addRow([]);
    this.addProductQuestions(worksheet, headerStyle, borderStyle);

    // Set column widths
    worksheet.getColumn(1).width = 69; // Tender Details first column width
    worksheet.getColumn(2).width = 35; // General Questions column width

    // Adjust widths for company columns
    const companyStartColumn = 3; // Adjust based on your table layout
    const numCompanyColumns = this.bidData.companies.length;

    for (let i = companyStartColumn; i < companyStartColumn + numCompanyColumns; i++) {
      worksheet.getColumn(i).width = 35; // Width for company columns
    }

    // Set left alignment for all cells
    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'left', vertical: 'middle' }; // Left alignment
      });
    });

    return worksheet;
  }




  private addTenderDetails(worksheet: ExcelJS.Worksheet, headerStyle: Partial<ExcelJS.Style>, tenderDetailStyle: Partial<ExcelJS.Style>, borderStyle: Partial<ExcelJS.Borders>) {
    const details = this.bidData.tenderDetails;
    const detailsLayout = [
      ['Tender ID', details.tenderID],
      ['Tender Name', details.tenderName],
      ['Tender Model', details.tenderModel],
      ['Created By', details.createdBy],
      ['Created On', details.createdOn],
      ['Invited Participants', details.invitedParticipants],
      ['Participated', details.participated],
      ['Not Submitted', details.notSubmitted],
      ['Rejected Tender', details.rejectedTender],
      ['Product Count', details.productCount],
      ['Committee Members', details.committeeMembers],
      ['Completed Date', details.completedDate]
    ];

    detailsLayout.forEach((row, index) => {
      const excelRow = worksheet.addRow(row);
      excelRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (colNumber === 1) {
          cell.font = tenderDetailStyle.font;
          cell.fill = tenderDetailStyle.fill;
          cell.alignment = tenderDetailStyle.alignment;
        } else {
          cell.font = { bold: true };
        }
        cell.border = borderStyle;
      });
    });

    // Add border to the tender details section
    this.addBorders(worksheet, 1, 1, detailsLayout.length, 2);
  }

  private addGeneralQuestions(worksheet: ExcelJS.Worksheet, headerStyle: Partial<ExcelJS.Style>, borderStyle: Partial<ExcelJS.Borders>) {
    const generalQuestions = this.bidData.generalQuestions;

    // Add header row
    const headerRow = worksheet.addRow(['General Questions', ...this.bidData.companies]);
    headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber === 1) {
        cell.font = headerStyle.font;
        cell.fill = headerStyle.fill;
        cell.alignment = headerStyle.alignment;
      } else {
        cell.font = headerStyle.font;
        cell.fill = headerStyle.fill;
        cell.alignment = headerStyle.alignment;
      }
      cell.border = borderStyle;
    });

    generalQuestions.forEach(question => {
      const row = worksheet.addRow([question.question, ...question.answers]);
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = borderStyle;
      });
    });
  }

  private addProductQuestions(worksheet: ExcelJS.Worksheet, headerStyle: Partial<ExcelJS.Style>, borderStyle: Partial<ExcelJS.Borders>) {
    this.bidData.productQuestions.forEach(category => {
      const categoryRow = worksheet.addRow([category.category]);
      categoryRow.font = { bold: true };
      categoryRow.getCell(1).border = borderStyle;

      const headerRow = worksheet.addRow(['Question', ...this.bidData.companies]);
      headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (colNumber === 1) {
          cell.font = headerStyle.font;
          cell.fill = headerStyle.fill;
          cell.alignment = headerStyle.alignment;
        } else {
          cell.font = headerStyle.font;
          cell.fill = headerStyle.fill;
          cell.alignment = headerStyle.alignment;
        }
        cell.border = borderStyle;
      });

      category.items.forEach(item => {
        const row = worksheet.addRow([item.question, ...item.answers]);
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = borderStyle;
        });
      });

      worksheet.addRow([]); // Add an empty row for spacing
    });
  }

  private addBorders(worksheet: ExcelJS.Worksheet, startRow: number, startCol: number, endRow: number, endCol: number) {
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const cell = worksheet.getCell(row, col);
        cell.border = {
          top: { style: 'thin', color: { argb: 'FF008C72' } },
          left: { style: 'thin', color: { argb: 'FF008C72' } },
          bottom: { style: 'thin', color: { argb: 'FF008C72' } },
          right: { style: 'thin', color: { argb: 'FF008C72' } }
        };
      }
    }
  }
}
