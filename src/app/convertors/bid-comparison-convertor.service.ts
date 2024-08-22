import { Injectable } from '@angular/core';
import { BidData } from '../models/bid-comparison-model';

@Injectable()

export class BidComparisonConvertorService {

  constructor() { }

  calculateTotals(bidData: BidData): number[] {
    const companyTotals = new Array(bidData.companies.length).fill(0);

    bidData.productQuestions.forEach(category => {
      const pricingSection = category.sections.find(s => s.name === 'Pricing');
      if (pricingSection) {
        const priceQuestion = pricingSection.questions.find(q => q.question === 'Total price for this product/service');
        if (priceQuestion) {
          priceQuestion.answers.forEach((price, index) => {
            const numPrice = typeof price === 'number' ? price : parseFloat(price as string);
            if (!isNaN(numPrice)) {
              companyTotals[index] += numPrice;
            }
          });
        }
      }
    });

    return companyTotals;
  }

  getLowestPrice(prices: (string | number)[]): number {
    const numPrices = prices.map(p => typeof p === 'number' ? p : parseFloat(p as string));
    return Math.min(...numPrices.filter(p => !isNaN(p)));
  }

  isLowestPrice(price: string | number, prices: (string | number)[]): boolean {
    const numPrice = typeof price === 'number' ? price : parseFloat(price as string);
    return numPrice === this.getLowestPrice(prices);
  }
}