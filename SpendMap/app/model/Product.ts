module Model {
    export class Product {
        public name: string;
        public price: number;
        public sum: number;
        public OKDP: OKDP;
        public OKEI: OKEI;
    }

    export class OKDP {
        public code: number;
        public name: string;
    }

    export class OKEI {
        public code: number;
        public name: string;
    }
}
