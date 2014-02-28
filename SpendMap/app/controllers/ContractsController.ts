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
        couldBack: string;
    }

    export class ContractsController {
        private httpService: IHttpService;
        private serviceConfig: IRequestConfig;
        private _scope: Scope;
        private header: any;
        private _cutomerUri: string;
        private _supplierUri: string;
        private _contractUri: string;
        private _wasDisplayed: boolean;

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
            this._contractUri = "https://clearspending.p.mashape.com/v1/contracts/get/?regnum=0&regnum=";
            this._supplierUri = "https://clearspending.p.mashape.com/v1/suppliers/get/?inn=0&inn=";
            this._cutomerUri = "https://clearspending.p.mashape.com/v1/customers/get/?spzregnum=a&spzregnum=";
            this._wasDisplayed = false;
            this._scope.couldBack = "hide";
            Services.SuplierService.getInstance(this.httpService).SetGrid(this);
        }

        public DisplayGrid(data: Model.Contract[]) {
            this._scope.contracts = data;
            if (!this._wasDisplayed) {
                var elem: any;
                elem = $("#table");
                elem.footable();
                this._wasDisplayed = true;
            }
            setTimeout(() => {
                $('table').trigger('footable_initialize');
            }, 2000);
            console.log("diplkay grid", data);
        }

        public ShowCustomer(customer: Model.Customer, couldBack: boolean) {
            console.log("ShowCustomer", customer);
            this._scope.selectedCustomer = customer;
            var elem: any = $('#customerModal');
            elem.modal('show');
            this.hideContractModal("#contractModal");
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
            if (couldBack != null && couldBack) {
                this._scope.couldBack = "ui icon button small green";
            } else {
                this._scope.couldBack = "hide";
            }
        }

        public ShowSupplier(supplier: Model.SuplierData, couldBack: boolean) {
            console.log("ShowSupplier", supplier);
            this._scope.selectedSupplier = supplier;
            var elem: any = $('#supplierModal');
            elem.modal('show');
            this.hideContractModal("#contractModal");
            var requestUri: string = this._supplierUri + supplier.inn + "&kpp=" + supplier.kpp;
            console.log("ShowSupplier request", requestUri);
            var reguest = this.httpService.get(requestUri.toString(), this.header);
            reguest.success(function (data, status) {
                console.log("ShowSupplier success", data, status);
                if (data == "") {
                    return;
                }
                this._scope.selectedSupplier = data.suppliers.data[0];
            }.bind(this));
            if (couldBack != null && couldBack) {
                this._scope.couldBack = "ui icon button small green";
            } else {
                this._scope.couldBack = "hide";
            }
        }

        public ShowContract(contract: Model.Contract, fromBack: boolean) {
            console.log("ShowContract", contract);
            this._scope.selectedContract = contract;
            var elem: any = $('#contractModal');
            elem.modal('show');

            var requestUri: string = this._contractUri + contract.regNum;
            console.log("ShowContract request", requestUri);
            var reguest = this.httpService.get(requestUri.toString(), this.header);
            reguest.success(function (data, status) {
                console.log("ShowContract success", data, status);
                if (data == "") {
                    return;
                }
                this._scope.selectedContract = data.contracts.data[0];
            }.bind(this));
            if (fromBack != null && fromBack) {
                this.hideContractModal("#supplierModal");
                this.hideContractModal("#customerModal");
            }
        }

        public HideOthers() {
            var elem: any = $('#contractModal');
            elem.modal('hide');
            elem = $('#supplierModal');
            elem.modal('hide');
            elem = $('#customerModal');
            elem.modal('hide');
        }

        private hideContractModal(modal: string) {
            var elem = $(modal);
            elem.removeClass("visible");
            elem.removeClass("active");
        }

    }
}