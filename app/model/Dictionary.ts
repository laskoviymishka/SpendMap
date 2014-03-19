module Dictionaries {

    export class Opfm {
        id: string;
        opf: string;
    }

    export class Region {
        public codeISO3166: string;
        public codeKLADR: string;
        public codeOKATO: string;
        public id: string;
        public name: string;
        public subjectCode: number;
    }

    export class BudgetLevel {
        budgetLevelCode: number;
        budgetLevelName: string;
        id: string;
    }

    export class Placing {
        code: number;
        description: string;
        id: string;
    }
} 