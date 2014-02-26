
module Model {
    export class Contract {
        public id: string;
        public regNum: string;
        public customer: Model.Customer;
        public signDate: Date;
        public price: number;
        public supliers: Model.Suplier[];
        public products: Product[];
    }
}
