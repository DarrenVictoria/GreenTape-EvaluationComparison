import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

interface CommitteeMember {
  name: string;
  role: string;
  score: string;
  comment: string;
  shortlisted: string;
}

interface Product {
  name: string;
  unitCount: number;
  generalQuestions: { category: string; question: string }[];
  companies: Company[];
}

interface Company {
  name: string;
  awardedUnits: number;
  answers: { [key: string]: string | number };
  committeeMembers: CommitteeMember[];
  isLowestPrice?: boolean;
}

interface RejectedSupplier {
  name: string;
  answers: { [key: string]: string | number };
  committeeMembers: CommitteeMember[];
  isLowestPrice?: boolean;
}

interface RejectedProduct {
  name: string;
  generalQuestions: { category: string; question: string }[];
  suppliers: RejectedSupplier[];
}

interface RejectedProductsData {
  products: RejectedProduct[];
}

@Component({
  selector: 'app-awarder',
  templateUrl: './awarder.component.html',
  styleUrls: ['./awarder.component.css']
})
export class AwarderComponent implements OnInit {
  companyTotals: number[];
  companyAvgScores: number[];

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
      "CommitteeMembers": 1,
      "CompletedDate": "20/10/2021 15:00"
    },
  };

  shortlistedproducts = {
    "products": [
      {
        "name": "Traditional Laptops",
        "unitCount": 100,
        "generalQuestions": [
          { "category": "Financial", "question": "Total price for this product/service" },
          { "category": "Technical", "question": "Do you have data controls?" }
        ],
        "companies": [
          {
            "name": "Office Hub Ltd",
            "awardedUnits": 50,
            "shortlistedMembers": "1 / 1 Member Shortlisted this Supplier",
            "answers": {
              "Total price for this product/service": "15000",
              "Do you have data controls?": "Yes"
            },
            "committeeMembers": [
              {
                "name": "Dinusha Hewage",
                "role": "Award Nominee",
                "score": "66%",
                "comment": "Ok. Guarantee period and maintenance clause is acceptable.",
                "shortlisted": "YES"
              }
            ]
          },
          {
            "name": "Supplies Unlimited",
            "awardedUnits": 50,
            "shortlistedMembers": "0 / 1 Member Shortlisted this Supplier",
            "answers": {
              "Total price for this product/service": "89000",
              "Do you have data controls?": "No"
            },
            "committeeMembers": [
              {
                "name": "Matthew Bolt",
                "role": "Award Nominee",
                "score": "15%",
                "comment": "Not Short Listed, since the warranty period of the product was less than required period.",
                "shortlisted": "NO"
              }
            ]
          },
          {
            "name": "Tech World Inc",
            "awardedUnits": 0,
            "shortlistedMembers": "1 / 1 Member Shortlisted this Supplier",
            "answers": {
              "Total price for this product/service": "50000",
              "Do you have data controls?": "Yes"
            },
            "committeeMembers": [
              {
                "name": "John Mark",
                "role": "Award Nominee",
                "score": "99%",
                "comment": "On both projects before this, the supplier has provided the best quality products. Email proof from user included.",
                "shortlisted": "YES"
              }
            ]
          }
        ]
      },
      {
        "name": "Water Bottle",
        "unitCount": 100,
        "generalQuestions": [
          { "category": "Financial", "question": "Total price for this product/service" },
          { "category": "Technical", "question": "Is the bottle BPA-free?" }
        ],
        "companies": [
          {
            "name": "Office Hub Ltd",
            "awardedUnits": 50,
            "shortlistedMembers": "1 / 1 Member Shortlisted this Supplier",
            "answers": {
              "Total price for this product/service": "2000",
              "Is the bottle BPA-free?": "Yes"
            },
            "committeeMembers": [
              {
                "name": "Janitha Thisara",
                "role": "Award Nominee",
                "score": "80%",
                "comment": "Durable and BPA-free. Good value for money.",
                "shortlisted": "YES"
              }
            ]
          },
          {
            "name": "Supplies Unlimited",
            "awardedUnits": 25,
            "shortlistedMembers": "0 / 1 Member Shortlisted this Supplier",
            "answers": {
              "Total price for this product/service": "2500",
              "Is the bottle BPA-free?": "No"
            },
            "committeeMembers": [
              {
                "name": "Isuru Bandara",
                "role": "Award Nominee",
                "score": "40%",
                "comment": "Not BPA-free and overpriced.",
                "shortlisted": "NO"
              }
            ]
          },
          {
            "name": "Tech World Inc",
            "awardedUnits": 25,
            "shortlistedMembers": "1 / 1 Member Shortlisted this Supplier",
            "answers": {
              "Total price for this product/service": "2200",
              "Is the bottle BPA-free?": "Yes"
            },
            "committeeMembers": [
              {
                "name": "Gayan Perera",
                "role": "Award Nominee",
                "score": "85%",
                "comment": "Good quality and BPA-free. A bit pricey.",
                "shortlisted": "YES"
              }
            ]
          }
        ]
      }
    ]
  }

  rejectproducts: RejectedProductsData = {
    "products": [
      {
        "name": "Traditional Laptops",
        "generalQuestions": [
          { "category": "Financial", "question": "Total price for this product/service" },
          { "category": "Technical", "question": "Do you have data controls?" }
        ],
        "suppliers": [
          {
            "name": "Darren Pvt Ltd",
            "answers": {
              "Total price for this product/service": "15000",
              "Do you have data controls?": "Yes"
            },
            "committeeMembers": [
              {
                "name": "Bukkoj Nazeer",
                "role": "Pre-Award Nominee",
                "score": "Not Applicable",
                "comment": "Ok. Guarantee period and maintenance clause is acceptable.",
                "shortlisted": "YES"
              }
            ]
          },
          {
            "name": "Supplies Unlimited",

            "answers": {
              "Total price for this product/service": "89000",
              "Do you have data controls?": "No"
            },
            "committeeMembers": [
              {
                "name": "Wadhihah Nazeer",
                "role": "Pre-Award Nominee",
                "score": "15%",
                "comment": "Not Short Listed, since the warranty period of the product was less than required period.",
                "shortlisted": "NO"
              }
            ]
          },
          {
            "name": "Tech World Inc",

            "answers": {
              "Total price for this product/service": "50000",
              "Do you have data controls?": "Yes"
            },
            "committeeMembers": [
              {
                "name": "Donatello Mark",
                "role": "Pre-Award Nominee",
                "score": "99%",
                "comment": "On both projects before this, the supplier has provided the best quality products. Email proof from user included.",
                "shortlisted": "YES"
              }
            ]
          }
        ]
      },
      {
        "name": "Water Bottle",
        "generalQuestions": [
          { "category": "Financial", "question": "Total price for this product/service" },
          { "category": "Technical", "question": "Is the bottle BPA-free?" }
        ],
        "suppliers": [
          {
            "name": "Darren Pvt Ltd",

            "answers": {
              "Total price for this product/service": "2000",
              "Is the bottle BPA-free?": "Yes"
            },
            "committeeMembers": [
              {
                "name": "Mohamed Shafraz",
                "role": "Pre-Award Nominee",
                "score": "80%",
                "comment": "Durable and BPA-free. Good value for money.",
                "shortlisted": "YES"
              }
            ]
          },
          {
            "name": "Supplies Unlimited",

            "answers": {
              "Total price for this product/service": "2500",
              "Is the bottle BPA-free?": "No"
            },
            "committeeMembers": [
              {
                "name": "Naji Sarvanaba",
                "role": "Pre-Award Nominee",
                "score": "40%",
                "comment": "Not BPA-free and overpriced.",
                "shortlisted": "NO"
              }
            ]
          },
          {
            "name": "Tech World Inc",

            "answers": {
              "Total price for this product/service": "2200",
              "Is the bottle BPA-free?": "Yes"
            },
            "committeeMembers": [
              {
                "name": "Hewage Danushka",
                "role": "Pre-Award Nominee",
                "score": "85%",
                "comment": "Good quality and BPA-free. A bit pricey.",
                "shortlisted": "YES"
              }
            ]
          }
        ]
      }
    ]
  }

  lowestPriceQuoted = [
    { product: 'Traditional Laptops', supplier: 'Office Hub Ltd', price: 15000 },
    { product: 'Water Bottle', supplier: 'Office Hub Ltd', price: 2000 },
  ];

  amendedProductQuantities = [
    { product: 'Traditional Laptops', initialQuantity: 100, amendedQuantity: 150, remarks: 'Increased due to high demand' },
    { product: 'Water Bottle', initialQuantity: 500, amendedQuantity: 450, remarks: 'Reduced due to budget constraints' },
  ];

  constructor() { }

  ngOnInit() {
    this.highlightLowestPriceShortlisted();
    this.highlightLowestPriceRejected();
  }

  highlightLowestPriceShortlisted() {
    this.shortlistedproducts.products.forEach((product: Product) => {
      let lowestPrice = Infinity;
      const lowestPriceQuestion = "Total price for this product/service";

      product.companies.forEach((company: Company) => {
        const price = parseFloat(company.answers[lowestPriceQuestion] as string);
        if (price < lowestPrice) {
          lowestPrice = price;
        }
      });

      product.companies.forEach((company: Company) => {
        company.isLowestPrice = parseFloat(company.answers[lowestPriceQuestion] as string) === lowestPrice;
      });
    });
  }

  highlightLowestPriceRejected() {
    this.rejectproducts.products.forEach((product: RejectedProduct) => {
      let lowestPrice = Infinity;
      const lowestPriceQuestion = "Total price for this product/service";

      product.suppliers.forEach((supplier: RejectedSupplier) => {
        const price = parseFloat(supplier.answers[lowestPriceQuestion] as string);
        if (price < lowestPrice) {
          lowestPrice = price;
        }
      });

      product.suppliers.forEach((supplier: RejectedSupplier) => {
        (supplier as any).isLowestPrice = parseFloat(supplier.answers[lowestPriceQuestion] as string) === lowestPrice;
      });
    });
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

  styleAdditionalHeaderRow(row: ExcelJS.Row) {
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

  async getWorksheet(): Promise<ExcelJS.Worksheet> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Preaward Committee');

    let currentRow = 1;

    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 69;
    for (let i = 3; i <= 60; i++) {
      worksheet.getColumn(i).width = 70;
    }

    const emptyRow = worksheet.addRow([]);
    this.applyTableStyling(worksheet, currentRow, currentRow);
    currentRow++;

    currentRow = await this.addPreAwardShortlistedSuppliers(worksheet, currentRow);

    worksheet.addRow([]);

    currentRow = await this.addPreAwardRejectedSuppliers(worksheet, currentRow);

    worksheet.addRow([]);

    currentRow = await this.addAdditionalTables(worksheet, currentRow);

    return worksheet;
  }

  async addPreAwardShortlistedSuppliers(worksheet: ExcelJS.Worksheet, startRow: number): Promise<number> {
    const titleRow = worksheet.addRow(['', 'Pre Award Shortlisted Suppliers']);
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'left' };

    startRow++;

    this.shortlistedproducts.products.forEach((product: Product, productIndex: number) => {
      const productHeaderRow = worksheet.addRow([
        '',
        `${product.name} (${product.unitCount} units)`,
        ...product.companies.map(c => c.name)
      ]);
      this.styleHeaderRow(productHeaderRow);

      const shortlistedRow = worksheet.addRow([
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
          const prices = product.companies.map(company => parseFloat(company.answers[question.question] as string));
          const lowestPrice = Math.min(...prices);
          row.eachCell((cell, colNumber) => {
            if (colNumber > 2 && parseFloat(cell.value as string) === lowestPrice) {
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
              : (committeeMember[category.toLowerCase()] || '');
          })
        ]);
        row.getCell(2).font = { bold: true };
      });
    });

    this.applyTableStyling(worksheet, startRow, worksheet.rowCount);

    return worksheet.rowCount + 1;
  }

  async addPreAwardRejectedSuppliers(worksheet: ExcelJS.Worksheet, startRow: number): Promise<number> {
    const titleRow = worksheet.addRow(['', 'Pre Award Rejected Suppliers']);
    titleRow.font = { bold: true, size: 16 };
    titleRow.alignment = { horizontal: 'left' };

    startRow++;

    this.rejectproducts.products.forEach((product: RejectedProduct, productIndex: number) => {
      const productHeaderRow = worksheet.addRow([
        '',
        product.name,
        ...product.suppliers.map(s => s.name)
      ]);
      this.styleHeaderRow(productHeaderRow);

      const rejectedRow = worksheet.addRow([
        '',
        'Product Question ↓',
        ...product.suppliers.map(() => 'Rejected')
      ]);

      product.generalQuestions.forEach(question => {
        const row = worksheet.addRow([
          question.category,
          question.question,
          ...product.suppliers.map(supplier => supplier.answers[question.question] as string)
        ]);
        this.styleCategoryCell(row.getCell(1));

        if (question.question === 'Total price for this product/service') {
          const prices = product.suppliers.map(supplier => parseFloat(supplier.answers[question.question] as string));
          const lowestPrice = Math.min(...prices);
          row.eachCell((cell, colNumber) => {
            if (colNumber > 2 && parseFloat(cell.value as string) === lowestPrice) {
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
              : (committeeMember[category.toLowerCase()] || '');
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
        data: this.lowestPriceQuoted
      },
      {
        title: 'Amended Product Quantities',
        headers: ['Product', 'Original Quantity', 'New Quantity', 'Remarks'],
        data: this.amendedProductQuantities
      },
    ];

    for (const table of tables) {
      const titleRow = worksheet.addRow(['', table.title]);
      titleRow.getCell(2).font = { bold: true, size: 14 };
      startRow++;

      const headerRow = worksheet.addRow(['', ...table.headers]);
      this.styleAdditionalHeaderRow(headerRow);
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

  async exportToExcel(): Promise<void> {
    const worksheet = await this.getWorksheet();
    const workbook = worksheet.workbook;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Preaward_Committee_Report.xlsx');
  }
}