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
            this._contractUri = "https://clearspending.p.mashape.com/v1/contracts/get/?regnum=0&regnum=";
            this._supplierUri = "https://clearspending.p.mashape.com/v1/suppliers/get/?inn=0&inn=";
            this._cutomerUri = "https://clearspending.p.mashape.com/v1/customers/get/?spzregnum=a&spzregnum=";
            this._wasDisplayed = false;
            this._scope.couldBack = "hide";
            Services.SuplierService.getInstance(this.httpService).SetGrid(this);
        }
        ContractsController.prototype.DisplayGrid = function (data) {
            this._scope.contracts = data;
            if (!this._wasDisplayed) {
                var elem;
                elem = $("#table");
                elem.footable();
                this._wasDisplayed = true;
            }
            setTimeout(function () {
                $('table').trigger('footable_initialize');
            }, 2000);
            console.log("diplkay grid", data);
        };

        ContractsController.prototype.ShowCustomer = function (customer, couldBack) {
            console.log("ShowCustomer", customer);
            this._scope.selectedCustomer = customer;
            var elem = $('#customerModal');
            elem.modal('show');
            this.hideContractModal("#contractModal");
            var requestUri = this._cutomerUri + customer.regNum;
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
        };

        ContractsController.prototype.ShowSupplier = function (supplier, couldBack) {
            console.log("ShowSupplier", supplier);
            this._scope.selectedSupplier = supplier;
            var elem = $('#supplierModal');
            elem.modal('show');
            this.hideContractModal("#contractModal");
            var requestUri = this._supplierUri + supplier.inn + "&kpp=" + supplier.kpp;
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
        };

        ContractsController.prototype.ShowContract = function (contract, fromBack) {
            console.log("ShowContract", contract);
            this._scope.selectedContract = contract;
            var elem = $('#contractModal');
            elem.modal('show');

            var requestUri = this._contractUri + contract.regNum;
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
        };

        ContractsController.prototype.HideOthers = function () {
            var elem = $('#contractModal');
            elem.modal('hide');
            elem = $('#supplierModal');
            elem.modal('hide');
            elem = $('#customerModal');
            elem.modal('hide');
        };

        ContractsController.prototype.hideContractModal = function (modal) {
            var elem = $(modal);
            elem.removeClass("visible");
            elem.removeClass("active");
        };
        return ContractsController;
    })();
    Contracts.ContractsController = ContractsController;
})(Contracts || (Contracts = {}));
//# sourceMappingURL=ContractsController.js.map
