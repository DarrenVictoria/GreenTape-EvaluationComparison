import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BidData } from '../models/bid-comparison.model';
import { ShortlistCommitteeData } from '../models/shortlist-committee.model';
import { AwarderFullData } from '../models/awarder.model';
import { ScoreSheetData } from '../models/score-sheet.model';
import { TenderDetails } from '../models/tender-details.model';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const tenderDetails: TenderDetails = {
      TenderID: "HAY-7-TEN-61",
      TenderName: "TEN#301 - Supply of Office Supplies",
      TenderModel: "RFP (Request for Proposal)",
      CreatedBy: "Hayleys Advantis | info@affnohayleys.lk",
      CreatedOn: "01/10/2021 : 10:15:00 AM",
      InvitedParticipants: 15,
      Participated: 12,
      NotSubmitted: 2,
      RejectedTender: 1,
      RroductCount: 18,
      CommitteeMembers: 3,
      CompletedDate: "20/10/2021 15:00"
    };

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

    const shortlistCommitteeData: ShortlistCommitteeData = {

      "generalQuestions": [
        { "category": "Company Information", "question": "How long has your company been in business?" },
        { "category": "Services", "question": "What warranty do you offer on your products?" },
        { "category": "Support", "question": "Do you provide technical support 24/7?" }
      ],
      "companies": [
        {
          "name": "Office Hub Ltd",
          "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "10 years",
            "What warranty do you offer on your products?": "2 years",
            "Do you provide technical support 24/7?": "Yes, phone and email support available."
          },
          "committeeMembers": [
            {
              "name": "Hisham Amar",
              "role": "Member",
              "score": "85%",
              "comment": "Reliable and well-established company.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "75%",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            }
          ]
        },
        {
          "name": "Supplies Unlimited",
          "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "5 years",
            "What warranty do you offer on your products?": "1 year",
            "Do you provide technical support 24/7?": "No, only during business hours."
          },
          "committeeMembers": [
            {
              "name": "Dinusha Hewage",
              "role": "Member",
              "score": "65%",
              "comment": "Limited warranty and support.",
              "shortlisted": "NO"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "60%",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            }
          ]
        },
        {
          "name": "Tech World Inc",
          "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "20 years",
            "What warranty do you offer on your products?": "3 years",
            "Do you provide technical support 24/7?": "Yes, 24/7 phone support."
          },
          "committeeMembers": [
            {
              "name": "Dinusha Hewage",
              "role": "Member",
              "score": "90%",
              "comment": "Long-standing company with excellent support.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "85%",
              "comment": "Great warranty and support.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            }
          ]
        }
      ],
      "products": [
        {
          "name": "Traditional Laptops",
          "generalQuestions": [
            { "category": "Financial", "question": "Total price for this product/service" },
            { "category": "Technical", "question": "Do you have data controls?" }
          ],
          "companies": [
            {
              "name": "Office Hub Ltd",
              "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "15000",
                "Do you have data controls?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "66%",
                  "comment": "Ok. Guarantee period and maintenance clause is acceptable.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "81%",
                  "comment": "On both projects before this, the supplier has provided the best quality products. Email proof from user included.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "YES"
                }
              ]
            },
            {
              "name": "Supplies Unlimited",
              "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "89000",
                "Do you have data controls?": "No"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "15%",
                  "comment": "Not Short Listed, since the warranty period of the product was less than required period.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "25%",
                  "comment": "Not Short Listed, since the warranty period of the product was less than required period.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            },
            {
              "name": "Tech World Inc",
              "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "50000",
                "Do you have data controls?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "99%",
                  "comment": "On both projects before this, the supplier has provided the best quality products. Email proof from user included.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "28%",
                  "comment": "The delivery charges are too high compared to other suppliers. Not Approved.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
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
          "companies": [
            {
              "name": "Office Hub Ltd",
              "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2000",
                "Is the bottle BPA-free?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "80%",
                  "comment": "Durable and BPA-free. Good value for money.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "75%",
                  "comment": "Reasonably priced but limited color options.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "YES"
                }
              ]
            },
            {
              "name": "Supplies Unlimited",
              "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2500",
                "Is the bottle BPA-free?": "No"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "40%",
                  "comment": "Not BPA-free and overpriced.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "30%",
                  "comment": "Too expensive for the quality offered.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            },
            {
              "name": "Tech World Inc",
              "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2200",
                "Is the bottle BPA-free?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "85%",
                  "comment": "Good quality and BPA-free. A bit pricey.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "50%",
                  "comment": "Decent product but could be cheaper.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            }
          ]
        }
      ]

    };

    const shortlistCommittee2Data: ShortlistCommitteeData = {

      "generalQuestions": [
        { "category": "Company Information", "question": "How long has your company been in business?" },
        { "category": "Services", "question": "What warranty do you offer on your products?" },
        { "category": "Support", "question": "Do you provide technical support 24/7?" }
      ],
      "companies": [
        {
          "name": "Office Hub Ltd",
          "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "10 years",
            "What warranty do you offer on your products?": "2 years",
            "Do you provide technical support 24/7?": "Yes, phone and email support available."
          },
          "committeeMembers": [
            {
              "name": "Jude Victoria",
              "role": "Member",
              "score": "85%",
              "comment": "Reliable and well-established company.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "75%",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            }
          ]
        },
        {
          "name": "Supplies Unlimited",
          "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "5 years",
            "What warranty do you offer on your products?": "1 year",
            "Do you provide technical support 24/7?": "No, only during business hours."
          },
          "committeeMembers": [
            {
              "name": "Dinusha Hewage",
              "role": "Member",
              "score": "65%",
              "comment": "Limited warranty and support.",
              "shortlisted": "NO"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "60%",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            }
          ]
        },
        {
          "name": "Tech World Inc",
          "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "20 years",
            "What warranty do you offer on your products?": "3 years",
            "Do you provide technical support 24/7?": "Yes, 24/7 phone support."
          },
          "committeeMembers": [
            {
              "name": "Dinusha Hewage",
              "role": "Member",
              "score": "90%",
              "comment": "Long-standing company with excellent support.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "85%",
              "comment": "Great warranty and support.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            }
          ]
        }
      ],
      "products": [
        {
          "name": "Traditional Laptops",
          "generalQuestions": [
            { "category": "Financial", "question": "Total price for this product/service" },
            { "category": "Technical", "question": "Do you have data controls?" }
          ],
          "companies": [
            {
              "name": "Office Hub Ltd",
              "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "15000",
                "Do you have data controls?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "66%",
                  "comment": "Ok. Guarantee period and maintenance clause is acceptable.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "81%",
                  "comment": "On both projects before this, the supplier has provided the best quality products. Email proof from user included.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "YES"
                }
              ]
            },
            {
              "name": "Supplies Unlimited",
              "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "89000",
                "Do you have data controls?": "No"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "15%",
                  "comment": "Not Short Listed, since the warranty period of the product was less than required period.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "25%",
                  "comment": "Not Short Listed, since the warranty period of the product was less than required period.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            },
            {
              "name": "Tech World Inc",
              "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "50000",
                "Do you have data controls?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "99%",
                  "comment": "On both projects before this, the supplier has provided the best quality products. Email proof from user included.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "28%",
                  "comment": "The delivery charges are too high compared to other suppliers. Not Approved.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
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
          "companies": [
            {
              "name": "Office Hub Ltd",
              "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2000",
                "Is the bottle BPA-free?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "80%",
                  "comment": "Durable and BPA-free. Good value for money.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "75%",
                  "comment": "Reasonably priced but limited color options.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "YES"
                }
              ]
            },
            {
              "name": "Supplies Unlimited",
              "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2500",
                "Is the bottle BPA-free?": "No"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "40%",
                  "comment": "Not BPA-free and overpriced.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "30%",
                  "comment": "Too expensive for the quality offered.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            },
            {
              "name": "Tech World Inc",
              "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2200",
                "Is the bottle BPA-free?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "85%",
                  "comment": "Good quality and BPA-free. A bit pricey.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "50%",
                  "comment": "Decent product but could be cheaper.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            }
          ]
        }
      ]

    };

    const preawardCommitteeData: ShortlistCommitteeData = {

      "generalQuestions": [
        { "category": "Company Information", "question": "How long has your company been in business?" },
        { "category": "Services", "question": "What warranty do you offer on your products?" },
        { "category": "Support", "question": "Do you provide technical support 24/7?" }
      ],
      "companies": [
        {
          "name": "Office Hub Ltd",
          "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "10 years",
            "What warranty do you offer on your products?": "2 years",
            "Do you provide technical support 24/7?": "Yes, phone and email support available."
          },
          "committeeMembers": [
            {
              "name": "Ballok Singh",
              "role": "Member",
              "score": "85%",
              "comment": "Reliable and well-established company.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "75%",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            }
          ]
        },
        {
          "name": "Office Hub Ltd",
          "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "10 years",
            "What warranty do you offer on your products?": "2 years",
            "Do you provide technical support 24/7?": "Yes, phone and email support available."
          },
          "committeeMembers": [
            {
              "name": "Ballok Singh",
              "role": "Member",
              "score": "85%",
              "comment": "Reliable and well-established company.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "75%",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            }
          ]
        },
        {
          "name": "Office Hub Ltd",
          "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "10 years",
            "What warranty do you offer on your products?": "2 years",
            "Do you provide technical support 24/7?": "Yes, phone and email support available."
          },
          "committeeMembers": [
            {
              "name": "Ballok Singh",
              "role": "Member",
              "score": "85%",
              "comment": "Reliable and well-established company.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "75%",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            }
          ]
        },
        {
          "name": "Office Hub Ltd",
          "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "10 years",
            "What warranty do you offer on your products?": "2 years",
            "Do you provide technical support 24/7?": "Yes, phone and email support available."
          },
          "committeeMembers": [
            {
              "name": "Ballok Singh",
              "role": "Member",
              "score": "85%",
              "comment": "Reliable and well-established company.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "75%",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "Good warranty terms, but higher pricing.",
              "shortlisted": "YES"
            }
          ]
        },
        {
          "name": "Supplies Unlimited",
          "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "5 years",
            "What warranty do you offer on your products?": "1 year",
            "Do you provide technical support 24/7?": "No, only during business hours."
          },
          "committeeMembers": [
            {
              "name": "Dinusha Hewage",
              "role": "Member",
              "score": "65%",
              "comment": "Limited warranty and support.",
              "shortlisted": "NO"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "60%",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            }
          ]
        },
        {
          "name": "Tech World Inc",
          "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
          "answers": {
            "How long has your company been in business?": "20 years",
            "What warranty do you offer on your products?": "3 years",
            "Do you provide technical support 24/7?": "Yes, 24/7 phone support."
          },
          "committeeMembers": [
            {
              "name": "Dinusha Hewage",
              "role": "Member",
              "score": "90%",
              "comment": "Long-standing company with excellent support.",
              "shortlisted": "YES"
            },
            {
              "name": "Aaliyah Mohamed",
              "role": "Member",
              "score": "85%",
              "comment": "Great warranty and support.",
              "shortlisted": "YES"
            },
            {
              "name": "Daniel Perera",
              "role": "Nominee",
              "score": "Not Applicable",
              "comment": "New company with less experience.",
              "shortlisted": "NO"
            }
          ]
        }
      ],
      "products": [
        {
          "name": "Traditional Laptops",
          "generalQuestions": [
            { "category": "Financial", "question": "Total price for this product/service" },
            { "category": "Technical", "question": "Do you have data controls?" }
          ],
          "companies": [
            {
              "name": "Office Hub Ltd",
              "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "15000",
                "Do you have data controls?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "66%",
                  "comment": "Ok. Guarantee period and maintenance clause is acceptable.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "81%",
                  "comment": "On both projects before this, the supplier has provided the best quality products. Email proof from user included.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "YES"
                }
              ]
            },
            {
              "name": "Supplies Unlimited",
              "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "89000",
                "Do you have data controls?": "No"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "15%",
                  "comment": "Not Short Listed, since the warranty period of the product was less than required period.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "25%",
                  "comment": "Not Short Listed, since the warranty period of the product was less than required period.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            },
            {
              "name": "Tech World Inc",
              "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "50000",
                "Do you have data controls?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "99%",
                  "comment": "On both projects before this, the supplier has provided the best quality products. Email proof from user included.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "28%",
                  "comment": "The delivery charges are too high compared to other suppliers. Not Approved.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
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
          "companies": [
            {
              "name": "Office Hub Ltd",
              "shortlistedMembers": "2 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2000",
                "Is the bottle BPA-free?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "80%",
                  "comment": "Durable and BPA-free. Good value for money.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "75%",
                  "comment": "Reasonably priced but limited color options.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "YES"
                }
              ]
            },
            {
              "name": "Supplies Unlimited",
              "shortlistedMembers": "0 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2500",
                "Is the bottle BPA-free?": "No"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "40%",
                  "comment": "Not BPA-free and overpriced.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "30%",
                  "comment": "Too expensive for the quality offered.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            },
            {
              "name": "Tech World Inc",
              "shortlistedMembers": "1 / 2 Members Shortlisted this Supplier",
              "answers": {
                "Total price for this product/service": "2200",
                "Is the bottle BPA-free?": "Yes"
              },
              "committeeMembers": [
                {
                  "name": "Dinusha Hewage",
                  "role": "Member",
                  "score": "85%",
                  "comment": "Good quality and BPA-free. A bit pricey.",
                  "shortlisted": "YES"
                },
                {
                  "name": "Aaliyah Mohamed",
                  "role": "Member",
                  "score": "50%",
                  "comment": "Decent product but could be cheaper.",
                  "shortlisted": "NO"
                },
                {
                  "name": "Daniel Perera",
                  "role": "Nominee",
                  "score": "Not Applicable",
                  "comment": "Lorem ipsum thought about it",
                  "shortlisted": "NO"
                }
              ]
            }
          ]
        }
      ]

    };

    const awarderData: AwarderFullData = {
      shortlistedProducts: {
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
              },
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
      },
      rejectedProducts: {
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
      },
      lowestPriceQuoted: [
        { product: 'Traditional Laptops', supplier: 'Office Hub Ltd', price: 15000 },
        { product: 'Water Bottle', supplier: 'Office Hub Ltd', price: 2000 },
      ],
      amendedProductQuantities: [
        { product: 'Traditional Laptops', initialQuantity: 100, amendedQuantity: 150, remarks: 'Increased due to high demand' },
        { product: 'Water Bottle', initialQuantity: 500, amendedQuantity: 450, remarks: 'Reduced due to budget constraints' },
      ]
    };

    const scoreSheetData: ScoreSheetData = {
      committees: [
        {
          name: "Committee 1",
          scoreRange: { start: 0, end: 10 },
          members: [
            {
              name: 'Jack',
              categories: [
                {
                  name: 'General',
                  sections: [
                    {
                      name: 'Approach and Methodology',
                      sectionWeight: 30,
                      questions: [
                        { id: 'How do you plan to manage and mitigate potential risks associated with this project?', weight: 50 },
                        { id: 'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?', weight: 50 }
                      ]
                    },
                    {
                      name: 'Experience',
                      sectionWeight: 70,
                      questions: [
                        {
                          id: 'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?', weight: 40
                        },
                        { id: 'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?', weight: 30 }
                      ]
                    }
                  ]
                },
                {
                  name: 'Product',
                  sections: [
                    {
                      name: 'Financial',
                      sectionWeight: 20,
                      questions: [
                        {
                          id: 'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?', weight: 10
                        },
                        { id: 'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?', weight: 10 },
                        { id: 'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?', weight: 80 }
                      ]
                    },
                    {
                      name: 'Technical',
                      sectionWeight: 20,
                      questions: [
                        { id: 'What is your proposed timeline for project implementation, including key milestones and deliverables?', weight: 70 },
                        { id: 'How does your solution address scalability and future technological advancements?', weight: 30 }
                      ]
                    },
                    {
                      name: 'General',
                      sectionWeight: 60,
                      questions: [
                        {
                          id: 'What is your companies approach to quality control and assurance?', weight: 50
                        },
                        { id: 'Can you provide details on your supply chain management and logistics capabilities?', weight: 25 },
                        { id: 'How does your pricing structure compare to industry standards, and what value-added services do you offer?', weight: 25 }
                      ]
                    }
                  ]
                }
              ],
              suppliers: [
                {
                  name: 'Supplier 1',
                  scorePercentage: '40%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
                {
                  name: 'Supplier 2',
                  scorePercentage: '70%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
                {
                  name: 'Supplier 3',
                  scorePercentage: '90%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },

              ]
            },
            {
              name: 'Mark Smith Waterbottle',
              categories: [
                {
                  name: 'General',
                  sections: [
                    {
                      name: 'Approach and Methodology',
                      sectionWeight: 30,
                      questions: [
                        { id: 'How do you plan to manage and mitigate potential risks associated with this project?', weight: 50 },
                        { id: 'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?', weight: 50 }
                      ]
                    },
                    {
                      name: 'Experience',
                      sectionWeight: 70,
                      questions: [
                        {
                          id: 'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?', weight: 40
                        },
                        { id: 'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?', weight: 30 }
                      ]
                    }
                  ]
                },
                {
                  name: 'Product',
                  sections: [
                    {
                      name: 'Financial',
                      sectionWeight: 20,
                      questions: [
                        {
                          id: 'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?', weight: 10
                        },
                        { id: 'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?', weight: 10 },
                        { id: 'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?', weight: 80 }
                      ]
                    },
                    {
                      name: 'Technical',
                      sectionWeight: 20,
                      questions: [
                        { id: 'What is your proposed timeline for project implementation, including key milestones and deliverables?', weight: 70 },
                        { id: 'How does your solution address scalability and future technological advancements?', weight: 30 }
                      ]
                    },
                    {
                      name: 'General',
                      sectionWeight: 60,
                      questions: [
                        {
                          id: 'What is your companies approach to quality control and assurance?', weight: 50
                        },
                        { id: 'Can you provide details on your supply chain management and logistics capabilities?', weight: 25 },
                        { id: 'How does your pricing structure compare to industry standards, and what value-added services do you offer?', weight: 25 }
                      ]
                    }
                  ]
                }
              ],
              suppliers: [
                {
                  name: 'Supplier 1',
                  scorePercentage: '40%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
                {
                  name: 'Supplier 2',
                  scorePercentage: '70%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
                {
                  name: 'Supplier 3',
                  scorePercentage: '90%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
              ]
            },
          ]
        },
        {
          name: "Committee 2",
          scoreRange: { start: 0, end: 12 },
          members: [
            {
              name: 'Jack',
              categories: [
                {
                  name: 'General',
                  sections: [
                    {
                      name: 'Approach and Methodology',
                      sectionWeight: 30,
                      questions: [
                        { id: 'How do you plan to manage and mitigate potential risks associated with this project?', weight: 50 },
                        { id: 'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?', weight: 50 }
                      ]
                    },
                    {
                      name: 'Experience',
                      sectionWeight: 70,
                      questions: [
                        {
                          id: 'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?', weight: 40
                        },
                        { id: 'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?', weight: 30 }
                      ]
                    }
                  ]
                },
                {
                  name: 'Product',
                  sections: [
                    {
                      name: 'Financial',
                      sectionWeight: 20,
                      questions: [
                        {
                          id: 'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?', weight: 10
                        },
                        { id: 'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?', weight: 10 },
                        { id: 'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?', weight: 80 }
                      ]
                    },
                    {
                      name: 'Technical',
                      sectionWeight: 20,
                      questions: [
                        { id: 'What is your proposed timeline for project implementation, including key milestones and deliverables?', weight: 70 },
                        { id: 'How does your solution address scalability and future technological advancements?', weight: 30 }
                      ]
                    },
                    {
                      name: 'General',
                      sectionWeight: 60,
                      questions: [
                        {
                          id: 'What is your companies approach to quality control and assurance?', weight: 50
                        },
                        { id: 'Can you provide details on your supply chain management and logistics capabilities?', weight: 25 },
                        { id: 'How does your pricing structure compare to industry standards, and what value-added services do you offer?', weight: 25 }
                      ]
                    }
                  ]
                }
              ],
              suppliers: [
                {
                  name: 'Supplier 1',
                  scorePercentage: '40%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
                {
                  name: 'Supplier 2',
                  scorePercentage: '70%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
                {
                  name: 'Supplier 3',
                  scorePercentage: '90%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },

              ]
            },
            {
              name: 'Mark',
              categories: [
                {
                  name: 'General',
                  sections: [
                    {
                      name: 'Approach and Methodology',
                      sectionWeight: 30,
                      questions: [
                        { id: 'How do you plan to manage and mitigate potential risks associated with this project?', weight: 50 },
                        { id: 'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?', weight: 50 }
                      ]
                    },
                    {
                      name: 'Experience',
                      sectionWeight: 70,
                      questions: [
                        {
                          id: 'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?', weight: 40
                        },
                        { id: 'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?', weight: 30 }
                      ]
                    }
                  ]
                },
                {
                  name: 'Product',
                  sections: [
                    {
                      name: 'Financial',
                      sectionWeight: 20,
                      questions: [
                        {
                          id: 'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?', weight: 10
                        },
                        { id: 'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?', weight: 10 },
                        { id: 'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?', weight: 80 }
                      ]
                    },
                    {
                      name: 'Technical',
                      sectionWeight: 20,
                      questions: [
                        { id: 'What is your proposed timeline for project implementation, including key milestones and deliverables?', weight: 70 },
                        { id: 'How does your solution address scalability and future technological advancements?', weight: 30 }
                      ]
                    },
                    {
                      name: 'General',
                      sectionWeight: 60,
                      questions: [
                        {
                          id: 'What is your companies approach to quality control and assurance?', weight: 50
                        },
                        { id: 'Can you provide details on your supply chain management and logistics capabilities?', weight: 25 },
                        { id: 'How does your pricing structure compare to industry standards, and what value-added services do you offer?', weight: 25 }
                      ]
                    }
                  ]
                }
              ],
              suppliers: [
                {
                  name: 'Supplier 1',
                  scorePercentage: '40%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
                {
                  name: 'Supplier 2',
                  scorePercentage: '70%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
                {
                  name: 'Supplier 3',
                  scorePercentage: '90%',

                  data: [
                    {
                      answers: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                      },
                      scores: {
                        'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                        'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                      },
                      categoryScore: 67.3,
                      sectionScore: 22.5
                    },
                    {
                      answers: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                      },
                      scores: {
                        'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                        'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                      },
                      categoryScore: 67.3,
                      sectionScore: 44.8
                    },
                    {
                      answers: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                      },
                      scores: {
                        'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                        'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                        'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                      },
                      categoryScore: 76.3,
                      sectionScore: 15.8
                    },
                    {
                      answers: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                        'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                      },
                      scores: {
                        'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                        'How does your solution address scalability and future technological advancements?': 7
                      },
                      categoryScore: 76.3,
                      sectionScore: 17
                    },
                    {
                      answers: {
                        'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                        'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                      },
                      scores: {
                        'What is your companies approach to quality control and assurance?': 9,
                        'Can you provide details on your supply chain management and logistics capabilities?': 7,
                        'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                      },
                      categoryScore: 76.3,
                      sectionScore: 43.5
                    }
                  ]
                },
              ]
            },
          ]
        },
      ]
    };

    return { tenderDetails, bidData, shortlistCommitteeData, awarderData, shortlistCommittee2Data, preawardCommitteeData, scoreSheetData };

  }
}