// src/app/convertors/shortlist-committee-2-convertor.service.ts

import { Injectable } from '@angular/core';
import { ShortlistCommitteeData, Company, Product } from '../models/shortlist-committee.model';

@Injectable()
export class ShortlistCommittee2ConvertorService {
  calculateCompanyTotals(data: ShortlistCommitteeData): number[] {
    return data.companies.map((company: Company) => {
      return data.products.reduce((total: number, product: Product) => {
        const companyProduct = product.companies.find(c => c.name === company.name);
        return total + (companyProduct ? parseFloat(companyProduct.answers['Total price for this product/service'] || '0') : 0);
      }, 0);
    });
  }

  calculateCompanyAvgScores(data: ShortlistCommitteeData): number[] {
    if (data.products.length === 0 || data.products[0].companies.length === 0) {
      return [];
    }

    const initialScores = new Array(data.companies.length).fill(0);

    const totalScores = data.products.reduce((acc: number[], product: Product) => {
      const productScores = product.companies.map(company => {
        const validScores = company.committeeMembers
          .map(member => parseFloat(member.score))
          .filter(score => !isNaN(score) && score > 0);

        return validScores.length > 0
          ? validScores.reduce((a, b) => a + b) / validScores.length
          : 0;
      });

      return acc.map((sum, idx) => sum + productScores[idx]);
    }, initialScores);

    return totalScores.map(totalScore => totalScore / data.products.length);
  }
}