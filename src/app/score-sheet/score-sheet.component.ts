
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ScoreSheetService } from '../services/score-sheet.service';
import { ScoreSheetConverterService } from '../convertors/score-sheet-convertor.service';
import { ScoreSheetData, Committee, Member, Category, Section } from '../models/score-sheet.model';

@Component({
  selector: 'app-score-sheet',
  templateUrl: './score-sheet.component.html',
  styleUrls: ['./score-sheet.component.css']
})
export class ScoreSheetComponent implements OnInit, AfterViewInit {
  @ViewChild('tableBody') tableBody: ElementRef;

  scoreSheetData: ScoreSheetData;
  expandedSuppliers: { [committeeIndex: number]: { [supplierName: string]: boolean } } = {};

  constructor(
    private router: Router,
    private scoreSheetService: ScoreSheetService,
    private converterService: ScoreSheetConverterService
  ) { }

  ngOnInit() {
    this.loadScoreSheetData();
  }

  ngAfterViewInit() {
    this.adjustSupplierColumnHeight();
  }

  loadScoreSheetData() {
    this.scoreSheetService.getScoreSheetData().subscribe(
      (data: ScoreSheetData) => {
        this.scoreSheetData = data;
        this.scoreSheetData.committees.forEach(committee => {

        });
      },
      error => console.error('Error loading score sheet data:', error)
    );
  }

  adjustSupplierColumnHeight() {
    setTimeout(() => {
      const rows = this.tableBody.nativeElement.querySelectorAll('tr');
      let currentMember = '';
      let memberHeight = 0;

      rows.forEach((row: HTMLElement) => {
        const memberNameCell = row.querySelector('td:first-child');
        if (memberNameCell) {
          const memberName = memberNameCell.textContent.trim();
          if (memberName !== currentMember) {
            // New member, update heights for previous member
            if (currentMember) {
              this.updateSupplierColumnHeight(currentMember, memberHeight);
            }
            currentMember = memberName;
            memberHeight = 0;
          }
        }
        memberHeight += row.offsetHeight;
      });

      // Update height for the last member
      if (currentMember) {
        this.updateSupplierColumnHeight(currentMember, memberHeight);
      }
    });
  }

  updateSupplierColumnHeight(memberName: string, height: number) {
    const supplierColumns = this.tableBody.nativeElement.querySelectorAll(`.supplier-column[data-member="${memberName}"]`);
    supplierColumns.forEach((column: HTMLElement) => {
      column.style.height = `${height}px`;
      const nameSpan = column.querySelector('.supplier-name') as HTMLElement;
      if (nameSpan) {
        nameSpan.style.height = `${height - 48}px`; // Subtract space for buttons
      }
    });
  }

  getTotalRows(member: any): number {
    return member.categories.reduce((sum: number, cat: any) => sum + cat.sections.length, 0);
  }

  isSupplierExpanded(supplierName: string, committeeIndex: number): boolean {
    if (this.expandedSuppliers[committeeIndex] &&
      this.expandedSuppliers[committeeIndex][supplierName] !== undefined) {
      return this.expandedSuppliers[committeeIndex][supplierName];
    }
    return false;
  }

  toggleSupplier(supplierName: string, committeeIndex: number, event: Event) {
    event.stopPropagation();
    if (!this.expandedSuppliers[committeeIndex]) {
      this.expandedSuppliers[committeeIndex] = {};
    }
    this.expandedSuppliers[committeeIndex][supplierName] =
      !this.expandedSuppliers[committeeIndex][supplierName];
  }

  goToSupplierDetails(supplier: any, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/supplier', supplier.name]);
  }

  getCombinedIndex(categoryIndex: number, sectionIndex: number, member: any): number {
    let index = 0;
    for (let i = 0; i < categoryIndex; i++) {
      index += member.categories[i].sections.length;
    }
    return index + sectionIndex;
  }

  trackByMember(index: number, member: Member): string {
    return member.name;
  }

  trackByCategory(index: number, category: Category): string {
    return category.name;
  }

  trackBySection(index: number, section: Section): string {
    return section.name;
  }

  applyTableStyling(worksheet: ExcelJS.Worksheet, startRow: number, endRow: number) {
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

  async getWorksheet(): Promise<ExcelJS.Worksheet> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Score Sheet');

    // Define column widths
    worksheet.columns = [
      { width: 22 },  // Member
      { width: 40 },  // Category
      { width: 20 },  // Section
      { width: 15 },  // Section Weight
      { width: 50 },  // Questions
      { width: 18 },  // Question Weight
    ];


    let currentRow = 1;

    for (const committee of this.scoreSheetData.committees) {
      // Add committee information
      worksheet.getCell(`A${currentRow}`).value = committee.name;
      worksheet.getCell(`A${currentRow + 1}`).value = `Score Range ${committee.scoreRange.start} - ${committee.scoreRange.end}`;

      currentRow += 3; // Leave a blank row after committee info

      // Add header row
      const headerRow = worksheet.getRow(currentRow);
      headerRow.values = [
        'Member', 'Category', 'Section', 'Section Weight', 'Questions', 'Question Weight',
        ...committee.members[0].suppliers.reduce((acc, supplier) => {
          acc.push(
            'Supplier (Score)',
            'Answers',
            'Score per Question',
            'Score per Category',
            'Score per Section'
          );
          return acc;
        }, [])
      ];

      // Style header row (same as before)
      this.styleHeaderRow(headerRow);

      currentRow++;

      // Add data rows
      for (const member of committee.members) {
        for (const category of member.categories) {
          for (const section of category.sections) {
            const questionIds = section.questions.map(q => q.id).join('\n---------\n');
            const questionWeights = section.questions.map(q => q.weight + '%').join('\n---------\n');

            const baseRow = [
              member.name,
              category.name,
              section.name,
              section.sectionWeight + '%',
              questionIds,
              questionWeights
            ];

            for (const supplier of member.suppliers) {
              const supplierData = supplier.data.find(d =>
                d.answers && Object.keys(d.answers).some(key => section.questions.some(q => q.id === key))
              );

              if (supplierData) {
                const answers = section.questions.map(q => supplierData.answers[q.id] || '').join('\n---------\n');
                const scores = section.questions.map(q => supplierData.scores[q.id] || '').join('\n---------\n');

                baseRow.push(
                  `${supplier.name} (${supplier.scorePercentage})`,
                  answers,
                  scores,
                  supplierData.categoryScore.toString(),
                  supplierData.sectionScore.toString()
                );
              } else {
                baseRow.push(`${supplier.name} (${supplier.scorePercentage})`, '', '', '', '');
              }
            }

            const row = worksheet.addRow(baseRow);
            this.styleDataRow(row);
            currentRow++;
          }
        }
      }

      // Add some space between committees
      currentRow += 2;
    }

    return worksheet;
  }

  // Helper methods for styling
  private styleHeaderRow(row: ExcelJS.Row) {
    row.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF00B050' }  // Green color
      };
      cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  }

  private styleDataRow(row: ExcelJS.Row) {
    row.eachCell((cell, colNumber) => {
      cell.alignment = { vertical: 'top', wrapText: true };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      if ([5, 6].includes(colNumber) || colNumber > 7) {
        cell.alignment.wrapText = true;
      }
      if (colNumber > 6 && (colNumber - 7) % 5 === 0) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE6FFE6' }  // Light green color
        };
      }
    });
  }

}