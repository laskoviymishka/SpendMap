var Services;
(function (Services) {
    var SuplierService = (function () {
        function SuplierService(http) {
            if (SuplierService._instance) {
                throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
            }
            this._http = http;
            this.header = {
                method: "GET",
                headers: {
                    "X-Mashape-Authorization": "FudXLyfZSg3Q1DPtCAnr4t4DJh5cjmHw",
                    "If-None-Match": "dc68bf7b0e24f6912ffdac1ab707bb52929c8b2a"
                }
            };
            this._supliers = [];
            this._data = [];
            this.baseUri = "https://clearspending.p.mashape.com";
            this.method = "/v1/contracts/select/";
            this.query = "?customerregion=23&returnfields=suppliers";
            this.supliersUri = this.baseUri + this.method + this.query;
        }
        SuplierService.getInstance = function (http) {
            if (SuplierService._instance === null) {
                SuplierService._instance = new SuplierService(http);
            }
            return SuplierService._instance;
        };

        SuplierService.prototype.SetMap = function (map) {
            this._map = map;
        };

        SuplierService.prototype.SetGrid = function (grid) {
            this._grid = grid;
        };

        SuplierService.prototype.SetDictionaries = function (dictionaries) {
            this._dictionaries = dictionaries;
        };

        SuplierService.prototype.LoadSuplierFromQuyery = function (query) {
            var result;
            result = [];
            this._supliers = [];
            this._data = [];
            this.BuildQuery(query);
            this.ExecQuery(this.query, 1);
            return result;
        };

        SuplierService.prototype.UpdateDisplayProgress = function (currentItem) {
            this._dictionaries.UpdateProgress(currentItem);
        };

        SuplierService.prototype.LoadSupliers = function () {
            var result;
            result = [];
            var reguest = this._http.get(this.supliersUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadSupliers success", data, status);
                if (data == "") {
                    return;
                }
                this._supliers = [];
                for (var i = 0; i < data.contracts.data.length; i++) {
                    if (data.contracts.data[i].suppliers != null) {
                        var item = { factualAddres: data.contracts.data[i].suppliers.supplier.factualAddress };
                        this._supliers.push(item);
                    }
                }
                this._map.DisplaySupliers(this._supliers);
            }.bind(this));
            return result;
        };

        SuplierService.prototype.MapRegion = function (region) {
            this._map.MapRegion(region);
        };

        SuplierService.prototype.ShowContract = function (contract) {
            this._grid.ShowContract(contract, false);
        };

        SuplierService.prototype.BuildQuery = function (query) {
            this.query = "?perpage=100";

            if (query.productsearch != undefined || query.productsearch == "") {
                this.query += "&productsearch=" + query.productsearch;
            }

            if (query.budgetlevel != undefined || query.budgetlevel == "") {
                this.query += "&budgetlevel=" + query.budgetlevel;
            }

            if (query.customerinn != undefined || query.customerinn == "") {
                this.query += "&customerinn=" + query.customerinn;
            }

            if (query.customerregion != undefined || query.customerregion == "") {
                this.query += "&customerregion=" + query.customerregion;
            }

            if (query.okdp != undefined || query.okdp == "") {
                this.query += "&okdp=" + query.okdp;
            }

            if (query.placing != undefined || query.placing == "") {
                this.query += "&placing=" + query.placing;
            }

            if (query.regnum != undefined || query.regnum == "") {
                this.query += "&regnum=" + query.regnum;
            }
        };

        SuplierService.prototype.ExecQuery = function (query, page) {
            console.log("ExecQuery", this.baseUri + this.method + this.query + "&page=" + page);
            var reguest = this._http.get(this.baseUri + this.method + this.query + "&page=" + page, this.header);
            reguest.success(function (data, status) {
                console.log("LoadSupliers success", data, status);
                if (data.contracts == null || data == "") {
                    this._dictionaries.SetTotalResult(0);
                    return;
                }
                this._dictionaries.SetTotalResult(data.contracts.total);
                for (var i = 0; i < data.contracts.data.length; i++) {
                    if (data.contracts.data[i].suppliers != null) {
                        this._data.push(data.contracts.data[i]);
                        var item = {
                            factualAddres: data.contracts.data[i].suppliers.supplier.factualAddress,
                            regNum: data.contracts.data[i].regNum
                        };
                        this._supliers.push(item);
                    }
                }
                if (data.contracts.total > data.contracts.perpage * data.contracts.page && page < 2) {
                    this.ExecQuery(query, ++page);
                } else {
                    this._map.DisplaySupliers(this._supliers);
                    this._grid.DisplayGrid(this._data);
                }
            }.bind(this));
        };
        SuplierService._instance = null;
        return SuplierService;
    })();
    Services.SuplierService = SuplierService;

    angular.module('Services.SuplierService', []).factory('SuplierService', function ($http) {
        return SuplierService.getInstance($http);
    });
})(Services || (Services = {}));
//# sourceMappingURL=SupliersService.js.map
