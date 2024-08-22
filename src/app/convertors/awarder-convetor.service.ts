import { Injectable } from '@angular/core';
import { AwarderFullData, Product, RejectedProduct } from '../models/awarder.model';

@Injectable()
export class AwarderConvertorService {
  highlightLowestPrices(data: AwarderFullData): AwarderFullData {
    data.shortlistedProducts.products = this.highlightLowestPriceForProducts(data.shortlistedProducts.products);
    data.rejectedProducts.products = this.highlightLowestPriceForRejectedProducts(data.rejectedProducts.products);
    return data;
  }

  private highlightLowestPriceForProducts(products: Product[]): Product[] {
    return products.map(product => {
      const lowestPrice = Math.min(...product.companies.map(company =>
        parseFloat(company.answers['Total price for this product/service'] as string)
      ));

      product.companies = product.companies.map(company => ({
        ...company,
        isLowestPrice: parseFloat(company.answers['Total price for this product/service'] as string) === lowestPrice
      }));

      return product;
    });
  }

  private highlightLowestPriceForRejectedProducts(products: RejectedProduct[]): RejectedProduct[] {
    return products.map(product => {
      const lowestPrice = Math.min(...product.suppliers.map(supplier =>
        parseFloat(supplier.answers['Total price for this product/service'] as string)
      ));

      product.suppliers = product.suppliers.map(supplier => ({
        ...supplier,
        isLowestPrice: parseFloat(supplier.answers['Total price for this product/service'] as string) === lowestPrice
      }));

      return product;
    });
  }
}