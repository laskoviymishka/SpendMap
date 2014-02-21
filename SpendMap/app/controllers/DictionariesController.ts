module Dictionaries {

    export class DictionaryScope {
        VM: DictionaryController;
        Opfms: Opfm[];
        Regions: Region[];
        Placings: Placing[];
        BudgetLevels: BudgetLevel[];
        SelectedBudgetLevels: BudgetLevel[];
    }

    export class DictionaryController {
        private httpService: IHttpService;
        private serviceConfig: IRequestConfig;
        private scope: DictionaryScope;
        private header: any;
        private baseUri: string;
        private opfmUri: string;
        private regionsUri: string;
        private placingUri: string;
        private budgetlevelsUri: string;


        constructor($scope: DictionaryScope, $http: IHttpService) {
            this.httpService = $http;
            this.scope = $scope;
            this.scope.VM = this;
            this.header = {
                method: "GET",
                headers: {
                    "X-Mashape-Authorization": "FudXLyfZSg3Q1DPtCAnr4t4DJh5cjmHw",
                    "If-None-Match": "dc68bf7b0e24f6912ffdac1ab707bb52929c8b2a"
                }
            };
            this.baseUri = "https://clearspending.p.mashape.com";
            this.opfmUri = this.baseUri + "/v1/opf/select/?opf=all";
            this.regionsUri = this.baseUri + "/v1/regions/select/?regioncode=all";
            this.placingUri = this.baseUri + "/v1/placing/select/?code=all";
            this.budgetlevelsUri = this.baseUri + "/v1/budgetlevels/select/?level=all";
            this.scope.BudgetLevels = [];
            this.scope.Opfms = [];
            this.scope.Placings = [];
            this.scope.Regions = [];
            this.LoadOpfm();
            this.LoadBudgetLevels();
            this.LoadPlacing();
            this.LoadRegions();
        }

        public LoadOpfm() {
            var reguest = this.httpService.get(this.opfmUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadOpfm success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.opf.data.length; i++) {
                    var item = new Opfm();
                    item.opf = data.opf.data[i].opf;
                    item.id = data.opf.data[i].id;
                    this.scope.Opfms.push(item);
                }
            }.bind(this));
        }

        public LoadPlacing() {
            var reguest = this.httpService.get(this.placingUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadPlacing success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.placing.data.length; i++) {
                    var item = new Placing();
                    item.code = data.placing.data[i].code;
                    item.description = data.placing.data[i].description;
                    item.id = data.placing.data[i].id;
                    this.scope.Placings.push(item);
                }
            }.bind(this));
        }

        public LoadRegions() {
            var reguest = this.httpService.get(this.regionsUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadRegions success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.regions.data.length; i++) {
                    var item = new Region();
                    item.codeISO3166 = data.regions.data[i].codeISO3166;
                    item.codeKLADR = data.regions.data[i].codeKLADR;
                    item.codeOKATO = data.regions.data[i].codeOKATO;
                    item.name = data.regions.data[i].name;
                    item.subjectCode = data.regions.data[i].subjectCode;
                    item.id = data.regions.data[i].id;
                    this.scope.Regions.push(item);
                }
            }.bind(this));
        }

        public LoadBudgetLevels() {
            var reguest = this.httpService.get(this.budgetlevelsUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadBudgetLevels success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.budgetlevels.data.length; i++) {
                    var item = new BudgetLevel();
                    item.budgetLevelCode = data.budgetlevels.data[i].budgetLevelCode;
                    item.budgetLevelName = data.budgetlevels.data[i].budgetLevelName;
                    item.id = data.budgetlevels.data[i].id;
                    this.scope.BudgetLevels.push(item);
                }
            }.bind(this));
        }
    }
}