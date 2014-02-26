var Contract = Model.Contract;

var Contracts;
(function (Contracts) {
    var ContractsController = (function () {
        function ContractsController($scope, $http) {
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
        ContractsController.prototype.DisplayGrid = function (data) {
            this._scope.contracts = data;
            this._scope.$apply();
            console.log("diplkay grid", data);
        };
        return ContractsController;
    })();
    Contracts.ContractsController = ContractsController;
})(Contracts || (Contracts = {}));
//# sourceMappingURL=ContractsController.js.map
