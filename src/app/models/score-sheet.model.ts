export interface Question {
    id: string;
    weight: number;
}

export interface Section {
    name: string;
    sectionWeight: number;
    questions: Question[];
}

export interface Category {
    name: string;
    sections: Section[];
}

export interface SupplierData {
    answers: { [questionId: string]: string };
    scores: { [questionId: string]: number };
    categoryScore: number;
    sectionScore: number;
}

export interface Supplier {
    name: string;
    scorePercentage: string;
    data: SupplierData[];
}

export interface Member {
    name: string;
    categories: Category[];
    suppliers: Supplier[];
}

export interface Committee {
    name: string;
    scoreRange: { start: number; end: number };
    members: Member[];
}

export interface ScoreSheetData {
    committees: Committee[];
}