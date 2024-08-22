import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BidData } from '../models/bid-comparison-model';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const bidData: BidData = {

      companies: ['Matix Lanka', 'Silicon Limited', 'Tech Pod Inc', 'Cloud Tech Solutions', 'DigiQue Solutions', 'Oteq Lanka Pvt Limited'],
      generalQuestions: [
        {
          name: 'Company Information',
          questions: [
            { question: 'Are you ISO certified?', answers: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes'] },
            { question: 'How many employees in your company?', answers: [12, 2, 11, 25, 3, 35] },
          ]
        },
        {
          name: 'Documentation',
          questions: [
            { question: 'Please list Service Level Agreements', answers: ['Document attached', 'Attached', 'Uploaded Soft Copy', 'Document Number 1 - Attached', 'Documents named Service Agreement uploaded', 'Document attached'] },
          ]
        },
      ],
      productQuestions: [
        {
          category: 'Smart Televisions',
          sections: [
            {
              name: 'Pricing',
              questions: [
                { question: 'Total price for this product/service', answers: [325000, 255000, 82000, 250000, 82000, 250000] },
              ]
            },
            {
              name: 'Specifications',
              questions: [
                { question: 'What is the display size', answers: ['25 x 55', '250 x 550', '25 x 250', '250 x 550', '500 x 750', '250 x 570'] },
              ]
            },
          ]
        },
        {
          category: 'Projectors',
          sections: [
            {
              name: 'Pricing',
              questions: [
                { question: 'Total price for this product/service', answers: [90000, 73000, 90000, 95000, 35000, 90000] },
              ]
            },
            {
              name: 'Specifications',
              questions: [
                { question: 'What is the brightness level?', answers: ['yes', 'no', 'yes', 'yes', 'yes', 'yes'] },
              ]
            },
          ]
        },
        {
          category: 'Fridge',
          sections: [
            {
              name: 'Pricing',
              questions: [
                { question: 'Total price for this product/service', answers: [90000, 73000, 90000, 95000, 35000, 90000] },
              ]
            },
            {
              name: 'Specifications',
              questions: [
                { question: 'What is the brightness level?', answers: ['yes', 'no', 'yes', 'yes', 'yes', 'yes'] },
              ]
            },
          ]
        }
      ]
    };

    return { bidData };
  }
}