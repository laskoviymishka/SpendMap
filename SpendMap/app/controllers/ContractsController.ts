import IHttpService = ng.IHttpService;
import IRequestConfig = ng.IRequestConfig;
import Contract = Model.Contract;

module Contracts {
    export interface Scope extends ng.IScope {
        contracts: Contract[];
        VM: ContractsController;
    }

    export class ContractsController {
        private httpService: IHttpService;
        private serviceConfig: IRequestConfig;
        private _scope: Scope;
        private header: any;

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
            Services.SuplierService.getInstance(this.httpService).SetGrid(this);
        }

        public DisplayGrid(data: Model.Contract[]) {
            this._scope.contracts = data;
            this._scope.$apply();
            console.log("diplkay grid", data);
        }
    }
}