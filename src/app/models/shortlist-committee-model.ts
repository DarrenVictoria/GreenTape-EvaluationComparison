export interface GeneralQuestion {
    category: string;
    question: string;
}

export interface CommitteeMember {
    name: string;
    role: string;
    score: string;
    comment: string;
    shortlisted: string;
}

export interface Company {
    name: string;
    shortlistedMembers: string;
    answers: { [key: string]: string };
    committeeMembers: CommitteeMember[];
}

export interface Product {
    name: string;
    generalQuestions: GeneralQuestion[];
    companies: Company[];
}

export interface BidData {
    generalQuestions: GeneralQuestion[];
    companies: Company[];
    products: Product[];
}
