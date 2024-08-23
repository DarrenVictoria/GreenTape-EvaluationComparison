export interface CommitteeMember {
    name: string;
    role: string;
    score: string;
    comment: string;
    shortlisted: string;
}

export interface Company {
    name: string;
    awardedUnits: number;
    shortlistedMembers: string;
    answers: { [key: string]: string | number };
    committeeMembers: CommitteeMember[];
    isLowestPrice?: boolean;
}

export interface Product {
    name: string;
    unitCount: number;
    generalQuestions: { category: string; question: string }[];
    companies: Company[];
}

export interface AwarderData {
    products: Product[];
}

export interface RejectedSupplier {
    name: string;
    answers: { [key: string]: string | number };
    committeeMembers: CommitteeMember[];
    isLowestPrice?: boolean;
}

export interface RejectedProduct {
    name: string;
    generalQuestions: { category: string; question: string }[];
    suppliers: RejectedSupplier[];
}

export interface RejectedProductsData {
    products: RejectedProduct[];
}

export interface LowestPriceQuoted {
    product: string;
    supplier: string;
    price: number;
}

export interface AmendedProductQuantity {
    product: string;
    initialQuantity: number;
    amendedQuantity: number;
    remarks: string;
}

export interface AwarderFullData {
    shortlistedProducts: AwarderData;
    rejectedProducts: RejectedProductsData;
    lowestPriceQuoted: LowestPriceQuoted[];
    amendedProductQuantities: AmendedProductQuantity[];
}