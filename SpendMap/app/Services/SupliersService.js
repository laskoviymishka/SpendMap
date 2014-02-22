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
            this.baseUri = "https://clearspending.p.mashape.com";
            this.method = "/v1/contracts/search/";
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

        SuplierService.prototype.SetDictionaries = function (dictionaries) {
            this._dictionaries = dictionaries;
        };

        SuplierService.prototype.LoadSuplierFromQuyery = function (query) {
            var result;
            result = [];
            this.BuildQuery(query);
            var reguest = this._http.get(this.baseUri + this.method + this.query, this.header);
            console.log(this.baseUri + this.method + this.query, this.header);
            reguest.success(function (data, status) {
                console.log("LoadSupliers success", data, status);
                if (data == "") {
                    return;
                }
                this._supliers = [];
                this._dictionaries.SetTotalResult(data.contracts.total);
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

            if (query.customerkpp != undefined || query.customerkpp == "") {
                this.query += "&customerkpp=" + query.customerkpp;
            }
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
