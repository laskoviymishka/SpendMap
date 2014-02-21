import IHttpService = ng.IHttpService;
import IRequestConfig = ng.IRequestConfig;
import Contract = Contracts.Contract;

module Contracts {
    export class Scope {
        contract: Contract;
        greetingText: string;
        VM : ContractsController;
    }

    export class ContractsController {
        private httpService: IHttpService;
        private serviceConfig: IRequestConfig;
        private scope: Scope;
        private header : any;

        constructor($scope: Scope, $http: IHttpService) {
            this.httpService = $http;
            $scope.contract= new Contract(this.serviceConfig, this.httpService);
            this.scope = $scope;
            this.scope.contract.id = "Hello";
            this.scope.contract.text = "test";
            this.scope.VM = this;
            this.header = {
                headers: {
                    "X-Mashape-Authorization": "ZTExHMnKp7vSq7DNGaOxFisBZN8AGJWU"
                }
            };
        }

        public LoadData(): void {
            var test = this.httpService.get('https://clearspending.p.mashape.com/v1/contracts/search/?customerinn=6504020670', this.header);
            test.success(function (data, status) {
                console.log("success", data, status);
            }.bind(this));
        }
    }
}