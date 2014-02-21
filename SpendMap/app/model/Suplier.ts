module Model {

    export class Suplier {
        public id: string;
        public inn: string;
        public factualAddres: string;
        public postalAddress: string;
        public allNames: string[];
        public contractsSum: number;
        public contractsCount: number;
        public organizationForm: string;
        public regionCode: number;
        public contractsYearStats: ContractsYearStat[];
        public contactInfo: Contact;
        public contactPhone: string;
        public kpp: number;
    }
}