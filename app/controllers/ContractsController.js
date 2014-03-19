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
            this._dataForCountChart = [];
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

        ContractsController.prototype.ShowCustomer = function (customer, couldBack, noNeedToShow) {
            console.log("ShowCustomer", customer);
            this._scope.selectedCustomer = customer;
            if (!noNeedToShow) {
                var elem = $('#customerModal');
                elem.easyModal({
                    top: 0,
                    autoOpen: true,
                    overlayOpacity: 0.3,
                    overlayColor: "#333",
                    overlayClose: true,
                    closeOnEscape: true
                });
            }
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
                this.renderCharts(this._scope.selectedCustomer, "customer");
            }.bind(this));
            if (couldBack != null && couldBack) {
                this._scope.couldBack = "ui icon button small green";
            } else {
                this._scope.couldBack = "hide";
            }
        };

        ContractsController.prototype.ShowSupplier = function (supplier, couldBack, noNeedToShow) {
            console.log("ShowSupplier", supplier);
            this._scope.selectedSupplier = supplier;
            if (!noNeedToShow) {
                var elem = $('#supplierModal');
                elem.easyModal({
                    top: 0,
                    autoOpen: true,
                    overlayOpacity: 0.3,
                    overlayColor: "#333",
                    overlayClose: true,
                    closeOnEscape: true
                });
                elem = $("#tableSupplierModal");
                elem.footable();
            }
            setTimeout(function () {
                $('table').trigger('footable_initialize');
            }, 2000);

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
                this.renderCharts(this._scope.selectedSupplier, "supplier");
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
            elem.easyModal({
                top: 0,
                autoOpen: true,
                overlayOpacity: 0.3,
                overlayColor: "#333",
                overlayClose: true,
                closeOnEscape: true
            });
            elem = $("#tableContractModal");
            elem.footable();
            elem = $("#innerTableContractModal");
            elem.footable();
            setTimeout(function () {
                $('table').trigger('footable_initialize');
            }, 2000);

            var requestUri = this._contractUri + contract.regNum;
            console.log("ShowContract request", requestUri);
            var reguest = this.httpService.get(requestUri.toString(), this.header);
            reguest.success(function (data, status) {
                var _this = this;
                console.log("ShowContract success", data, status);
                if (data == "") {
                    return;
                }
                this._scope.selectedContract = data.contracts.data[0];
                this.ShowSupplier(this._scope.selectedContract.suppliers.supplier, false, true);
                this.ShowCustomer(this._scope.selectedContract.customer, false, true);
                setTimeout(function () {
                    _this.renderContractCharts(_this._scope.selectedContract);
                }, 2000);
            }.bind(this));
            if (fromBack != null && fromBack) {
                this.hideContractModal("#supplierModal");
                this.hideContractModal("#customerModal");
            }
        };

        ContractsController.prototype.HideOthers = function () {
            var elem = $('#contractModal');
            elem.trigger('closeModal');
            elem = $('#supplierModal');
            elem.trigger('closeModal');
            elem = $('#customerModal');
            elem.trigger('closeModal');
            $('div').trigger('closeModal');
        };

        ContractsController.prototype.hideContractModal = function (modal) {
            var elem = $(modal);
            elem.removeClass("visible");
            elem.removeClass("active");
        };

        ContractsController.prototype.renderCharts = function (data, type) {
            console.log("renderCharts - " + type, data);
            this._dataForCountChart = [];
            this._dataForPriceChart = [];
            var dict = data.contractsYearStats;
            this._dataForCountChart.push(new ChartData.Stat(2010, dict[2010].contractsCount));
            this._dataForCountChart.push(new ChartData.Stat(2011, dict[2011].contractsCount));
            this._dataForCountChart.push(new ChartData.Stat(2012, dict[2012].contractsCount));
            this._dataForCountChart.push(new ChartData.Stat(2013, dict[2013].contractsCount));
            this._dataForCountChart.push(new ChartData.Stat(2014, dict[2014].contractsCount));
            this._dataForPriceChart.push(new ChartData.Stat(2010, dict[2010].contractsSum));
            this._dataForPriceChart.push(new ChartData.Stat(2011, dict[2011].contractsSum));
            this._dataForPriceChart.push(new ChartData.Stat(2012, dict[2012].contractsSum));
            this._dataForPriceChart.push(new ChartData.Stat(2013, dict[2013].contractsSum));
            this._dataForPriceChart.push(new ChartData.Stat(2014, dict[2014].contractsSum));

            var countSelector = "#" + type + "CountChart";
            var priceSelector = "#" + type + "PriceChart";
            var priceInTotalCustmSelector = "#" + type + "PriceInTotal";
            var priceInTotalSupplSelector = "#" + type + "PriceInTotal";

            if (this.priceChart != null) {
                $(countSelector + ">").remove();
            }
            this.priceChart = new DevExpress.viz.charts.PieChart($(countSelector), {
                dataSource: this._dataForCountChart,
                series: [{
                        argumentField: 'year',
                        valueField: 'value',
                        name: 'шт.',
                        label: {
                            visible: true,
                            connector: {
                                visible: true
                            },
                            customizeText: function (parameters) {
                                return parameters.value + " " + parameters.seriesName;
                            }
                        }
                    }],
                tooltip: {
                    enabled: true,
                    customizeText: function (parameters) {
                        return parameters.value + " " + parameters.seriesName;
                    }
                }
            });
            this.priceChart.render();

            if (this.countChart != null) {
                $(priceSelector + ">").remove();
            }
            this.countChart = new DevExpress.viz.charts.PieChart($(priceSelector), {
                dataSource: this._dataForPriceChart,
                series: [{
                        argumentField: 'year',
                        valueField: 'value',
                        name: 'руб.',
                        label: {
                            visible: true,
                            connector: {
                                visible: true
                            },
                            customizeText: function (parameters) {
                                return parameters.value.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "1,") + " " + parameters.seriesName;
                            }
                        }
                    }],
                tooltip: {
                    enabled: true,
                    customizeText: function (parameters) {
                        return parameters.value.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "1,") + " " + parameters.seriesName;
                    }
                }
            });
            this.countChart.render();
        };

        ContractsController.prototype.renderContractCharts = function (data) {
            console.log("pricePerOKDP", data);
            var data1 = [];

            if (this.pricePerOKDP != null) {
                $("#pricePerOKDP >").remove();
            }
            for (var i = 0; i < data.products.product.length; i++) {
                var wasAdded = false;
                for (var j = 0; j < data1.length; j++) {
                    if (data1[j].name == data.products.product[i].OKDP.name) {
                        wasAdded = true;
                        data1[j].price += data.products.product[i].price;
                        data1[j].prodcount += data.products.product[i].sum;
                    }
                }
                if (!wasAdded) {
                    var product = data.products.product[i];
                    data1.push(new ChartData.PerName(product.OKDP.name, product.price, product.sum));
                }
            }
            console.log("pricePerOKDP", data1);
            this.pricePerOKDP = new DevExpress.viz.charts.Chart($("#pricePerOKDP"), {
                dataSource: data1,
                series: [{
                        argumentField: 'name',
                        valueField: 'price'
                    }]
            });
            this.pricePerOKDP.render();
        };
        return ContractsController;
    })();
    Contracts.ContractsController = ContractsController;
})(Contracts || (Contracts = {}));
//# sourceMappingURL=ContractsController.js.map
