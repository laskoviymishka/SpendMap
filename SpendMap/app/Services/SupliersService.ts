module Services {

    export class SuplierService {
        private static _instance: SuplierService = null;
        private header: any;
        private baseUri: string;
        private supliersUri: string;
        private _http: ng.IHttpService;
        private _supliers: Model.Suplier[];
        private _map: Maps.MapController;
        private _dictionaries: Dictionaries.DictionaryController;
        private _grid: Contracts.ContractsController;
        private query: string;
        private method: string;
        private _data: Model.Contract[];


        public static getInstance(http: ng.IHttpService): SuplierService {
            if (SuplierService._instance === null) {
                SuplierService._instance = new SuplierService(http);
            }
            return SuplierService._instance;
        }

        constructor(http: ng.IHttpService) {
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

        public SetMap(map: Maps.MapController) {
            this._map = map;
        }

        public SetGrid(grid: Contracts.ContractsController) {
            this._grid = grid;
        }

        public SetDictionaries(dictionaries: Dictionaries.DictionaryController) {
            this._dictionaries = dictionaries;
        }

        public LoadSuplierFromQuyery(query: Model.ContractQuery) {
            var result: Model.Suplier[];
            result = [];
            this._supliers = [];
            this._data = [];
            this.BuildQuery(query);
            this.ExecQuery(this.query, 1);
            return result;
        }

        public UpdateDisplayProgress(currentItem: number) {
            this._dictionaries.UpdateProgress(currentItem);
        }

        public LoadSupliers() {
            var result: Model.Suplier[];
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
        }

        public MapRegion(region: Dictionaries.Region) {
            this._map.MapRegion(region);
        }

        public ShowContract(contract: Model.Contract) {
            this._grid.ShowContract(contract, false);
        }

        private BuildQuery(query: Model.ContractQuery) {
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
        }

        private ExecQuery(query: string, page: number) {
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
                if (data.contracts.total > data.contracts.perpage * data.contracts.page || page < 4) {
                    this.ExecQuery(query, ++page);
                } else {
                    this._map.DisplaySupliers(this._supliers);
                    this._grid.DisplayGrid(this._data);
                }
            }.bind(this));
        }

    }

    angular.module('Services.SuplierService', []).factory('SuplierService', ($http: ng.IHttpService) => {
        return SuplierService.getInstance($http);
    });
}
