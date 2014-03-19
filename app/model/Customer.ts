module Model {

    export class Customer {
        public id: string;
        public ogrn: string;
        public inn: string;
        public accounts: Account;
        public factualAddres: CustomerAddress;
        public timeZoneOlson: string;
        public fullName: string;
        public timeZoneUtcOffset: string;
        public contractsSum: number;
        public contractsCount: number;
        public organizationType: OrganizationType;
        public regionCode: number;
        public OKVED: string;
        public text: string;
        public email: string;
        public okogu: Okogu;
        public fax: string;
        public contractsYearStats: ContractsYearStat[];
        public contactPerson: Contact;
        public phone: string;
        public okopf: Okopf;
        public shortName: string;
        public postalAddress: string;
        public kpp: number;
        public orderingAgency: Agency;
        public actual: boolean;
        public organizationRole: string;
        public register: boolean;
        public OKPO: string;
        public headAgency: Agency;
        public regNum: number;
        public budgets: Budget[];
        public timeZone: number;
    }
}