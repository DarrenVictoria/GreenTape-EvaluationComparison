export interface Question {
    question: string;
    answers: (string | number)[];
}

export interface Section {
    name: string;
    questions: Question[];
}

export interface ProductCategory {
    category: string;
    sections: Section[];
}

export interface BidData {
    companies: string[];
    generalQuestions: Section[];
    productQuestions: ProductCategory[];
}