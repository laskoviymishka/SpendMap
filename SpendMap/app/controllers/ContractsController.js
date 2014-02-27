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
            this._contractUri = "https://clearspending.p.mashape.com/v1/contracts/get/?regnum=";
            this._supplierUri = "https://clearspending.p.mashape.com/v1/suppliers/get/?inn=";
            this._cutomerUri = "https://clearspending.p.mashape.com/v1/customers/get/?spzregnum=a&spzregnum=";

            Services.SuplierService.getInstance(this.httpService).SetGrid(this);
        }
        ContractsController.prototype.DisplayGrid = function (data) {
            this._scope.contracts = data;
            this._scope.$apply();
            var elem;
            elem = $("#table");
            elem.dataTable({
                "sDom": 'T<"clear">lfrtip',
                "oTableTools": {
                    "sSwfPath": "/swf/copy_csv_xls_pdf.swf"
                }
            });
            console.log("diplkay grid", data);
        };

        ContractsController.prototype.ShowCustomer = function (customer) {
            console.log("ShowCustomer", customer);
            this._scope.selectedCustomer = customer;
            var elem = $('#customerModal');
            elem.modal('show');

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
        };

        ContractsController.prototype.ShowSupplier = function (supplier) {
            console.log("ShowSupplier", supplier);
            this._scope.selectedSupplier = supplier;
            var elem = $('#supplierModal');
            elem.modal('show');
        };

        ContractsController.prototype.ShowContract = function (contract) {
            console.log("ShowContract", contract);
            this._scope.selectedContract = contract;
            var elem = $('#contractModal');
            elem.modal('show');
        };
        return ContractsController;
    })();
    Contracts.ContractsController = ContractsController;
})(Contracts || (Contracts = {}));
//# sourceMappingURL=ContractsController.js.map
