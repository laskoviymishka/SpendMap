var Contract = Contracts.Contract;

var Contracts;
(function (Contracts) {
    var Scope = (function () {
        function Scope() {
        }
        return Scope;
    })();
    Contracts.Scope = Scope;

    var ContractsController = (function () {
        function ContractsController($scope, $http) {
            this.httpService = $http;
            $scope.contract = new Contracts.Contract(this.serviceConfig, this.httpService);
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
        ContractsController.prototype.LoadData = function () {
            var test = this.httpService.get('https://clearspending.p.mashape.com/v1/contracts/search/?customerinn=6504020670', this.header);
            test.success(function (data, status) {
                console.log("success", data, status);
            }.bind(this));
        };
        return ContractsController;
    })();
    Contracts.ContractsController = ContractsController;
})(Contracts || (Contracts = {}));
//# sourceMappingURL=ContractsController.js.map
