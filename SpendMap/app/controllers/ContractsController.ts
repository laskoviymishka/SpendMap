import IHttpService = ng.IHttpService;
import IRequestConfig = ng.IRequestConfig;
import Contract = Model.Contract;
module Contracts {
    export interface Scope extends ng.IScope {
        contracts: Contract[];
        VM: ContractsController;
        selectedCustomer: any;
        selectedSupplier: any;
        selectedContract: any;
    }

    export class ContractsController {
        private httpService: IHttpService;
        private serviceConfig: IRequestConfig;
        private _scope: Scope;
        private header: any;
        private _cutomerUri: string;
        private _supplierUri: string;
        private _contractUri: string;

        constructor($scope: Scope, $http: IHttpService) {
            this.httpService = $http;
            this._scope = $scope;
            this._scope.contracts = [];
            this._scope.VM = this;
            this.header = {
                method: "GET",
                headers: {
                    "X-Mashape-Authorization": "FudXLyfZSg3Q1DPtCAnr4t4DJh5cjmHw",
                    "If-None-Match": "dc68bf7b0e24f6912ffdac1ab707bb52929c8b2a"
                }
            };
            this._contractUri = "https://clearspending.p.mashape.com/v1/contracts/get/?regnum=";
            this._supplierUri = "https://clearspending.p.mashape.com/v1/suppliers/get/?inn=";
            this._cutomerUri = "https://clearspending.p.mashape.com/v1/customers/get/?spzregnum=a&spzregnum=";

            Services.SuplierService.getInstance(this.httpService).SetGrid(this);
        }

        public DisplayGrid(data: Model.Contract[]) {
            this._scope.contracts = data;
            this._scope.$apply();
            var elem: any;
            elem = $("#table");
            elem.dataTable({
                "sDom": 'T<"clear">lfrtip',
                "oTableTools": {
                    "sSwfPath": "/swf/copy_csv_xls_pdf.swf"
                }
            });
            console.log("diplkay grid", data);
        }

        public ShowCustomer(customer: Model.Customer) {
            console.log("ShowCustomer", customer);
            this._scope.selectedCustomer = customer;
            var elem: any = $('#customerModal');
            elem.modal('show');

            var requestUri: string = this._cutomerUri + customer.regNum;
            console.log("ShowCustomer request", requestUri);
            var reguest = this.httpService.get(requestUri.toString(), this.header);
            reguest.success(function (data, status) {
                console.log("ShowCustomer success", data, status);
                if (data == "") {
                    return;
                }
                this._scope.selectedCustomer = data.customers.data[0];
            }.bind(this));
        }

        public ShowSupplier(supplier: Model.SuplierData) {
            console.log("ShowSupplier", supplier);
            this._scope.selectedSupplier = supplier;
            var elem: any = $('#supplierModal');
            elem.modal('show');
        }

        public ShowContract(contract: Model.Contract) {
            console.log("ShowContract", contract);
            this._scope.selectedContract = contract;
            var elem: any = $('#contractModal');
            elem.modal('show');
        }
    }
}