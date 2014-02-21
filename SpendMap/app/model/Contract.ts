
module Contracts {
    export class Contract {
        private _request: IRequestConfig;
        private _http: IHttpService;

        constructor(request: IRequestConfig, http: IHttpService) {
            this._request = request;
            this._http = http;
        }

        private SuccessCallback(data: any) {
            this.text = data.toString();
        }

        public id: string;
        public regNum: string;
        public customer: Model.Customer;
        public signDate: Date;
        public supliers: Model.Suplier[];
        public text: string;
        public products: Product[];
    }
}