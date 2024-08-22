import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as ExcelJS from 'exceljs';

interface Question {
  id: string;
  weight: number;
}

interface Section {
  name: string;
  sectionWeight: number;
  questions: Question[];
}

interface Category {
  name: string;
  sections: Section[];
}

interface SupplierData {
  answers: { [questionId: string]: string };
  scores: { [questionId: string]: number };
  categoryScore: number;
  sectionScore: number;
}

interface Supplier {
  name: string;
  expanded: boolean;
  scorePercentage: string;
  data: SupplierData[];
}

interface Member {
  name: string;
  categories: Category[];
  suppliers: Supplier[];
}

@Component({
  selector: 'app-score-sheet',
  templateUrl: './score-sheet.component.html',
  styleUrls: ['./score-sheet.component.css']
})
export class ScoreSheetComponent implements OnInit, AfterViewInit {
  @ViewChild('tableBody') tableBody: ElementRef;




  committeeScoreRanges = [
    { committee: 1, start: 0, end: 10 },
  ];

  expandedSuppliers: { [committeeIndex: number]: { [supplierName: string]: boolean } } = {};

  committees = [
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
              expanded: false,
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
              expanded: false,
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
              expanded: false,
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
              expanded: false,
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
              expanded: false,
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
              expanded: false,
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
      scoreRange: { start: 11, end: 20 },
      members: [
        {
          name: 'Matt',
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
              expanded: false,
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
              expanded: false,
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
              expanded: false,
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
          name: 'John',
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
              expanded: false,
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
              expanded: false,
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
              expanded: false,
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
  ];

  constructor(private router: Router) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.adjustSupplierColumnHeight();
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
      { width: 30 },  // Category
      { width: 20 },  // Section
      { width: 15 },  // Section Weight
      { width: 50 },  // Questions
      { width: 18 },  // Question Weight
    ];


    let currentRow = 1;

    for (const committee of this.committees) {
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