module Model {

    export class Account {
        public paymentAccount: number;
        public bankName: string;
        public personalAccount: string;
        public corrAccount: string;
        public bankAddress: string;
        public bik: string;
    }

    export class CustomerAddress {
        public building: number;
        public city: City;
        public zip: number;
        public addressLine: string;
        public office: string;
        public country: Country;
        public region: Region;
        public OKATO: string;
        public shortStreet: string;
        public filledManually: string;
        public subordinationType: SubordinationType;
    }

    export class City {
        public kladrType: string;
        public fullName: string;
        public kladrCode: number;
    }

    export class Country {
        public countryFullName: string;
        public countryCode: number;
    }

    export class Region {
        public kladrType: string;
        public fullName: string;
        public kladrCode: number;
    }

    export class SubordinationType {
        public id: number;
        public description: string;
    }

    export class OrganizationType {
        public id: number;
        public description: string;
        public name: string;
    }

    export class Okogu {
        public code: number;
        public name: string;
    }

    export class ContractsYearStat {
        public year: number;
        public contractsSum: number;
        public contractsCount: number;
    }

    export class Contact {
        public middleName: string;
        public lastName: string;
        public firstName: string;
    }

    export class Okopf {
        public fullName: string;
        public code: number;
    }

    export class Agency {
        public fullName: string;
        public regNum: number;
    }

    export class Budget {
        public name: string;
        public code: number;
    }
} 