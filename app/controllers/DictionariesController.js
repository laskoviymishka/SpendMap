var Dictionaries;
(function (Dictionaries) {
    var DictionaryController = (function () {
        function DictionaryController($scope, $http) {
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
            this._loadCount = 0;
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
            this.scope.cQuery = new Model.ContractQuery();
            this._supliersService = Services.SuplierService.getInstance($http);
            this._supliersService.SetDictionaries(this);
            this.scope.totalResult = 0;
            this.scope.progress = 0;
            this.scope.dimmerClass = "ui dimmer";
        }
        DictionaryController.prototype.LoadOpfm = function () {
            var reguest = this.httpService.get(this.opfmUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadOpfm success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.opf.data.length; i++) {
                    var item = new Dictionaries.Opfm();
                    item.opf = data.opf.data[i].opf;
                    item.id = data.opf.data[i].id;
                    this.scope.Opfms.push(item);
                }
                this.TryToChozen();
            }.bind(this));
        };

        DictionaryController.prototype.LoadPlacing = function () {
            var reguest = this.httpService.get(this.placingUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadPlacing success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.placing.data.length; i++) {
                    var item = new Dictionaries.Placing();
                    item.code = data.placing.data[i].code;
                    item.description = data.placing.data[i].description;
                    item.id = data.placing.data[i].id;
                    this.scope.Placings.push(item);
                }
                this.TryToChozen();
            }.bind(this));
        };

        DictionaryController.prototype.LoadRegions = function () {
            var reguest = this.httpService.get(this.regionsUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadRegions success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.regions.data.length; i++) {
                    var item = new Dictionaries.Region();
                    item.codeISO3166 = data.regions.data[i].codeISO3166;
                    item.codeKLADR = data.regions.data[i].codeKLADR;
                    item.codeOKATO = data.regions.data[i].codeOKATO;
                    item.name = data.regions.data[i].name;
                    item.subjectCode = data.regions.data[i].subjectCode;
                    item.id = data.regions.data[i].id;
                    this.scope.Regions.push(item);
                }
                this.TryToChozen();
            }.bind(this));
        };

        DictionaryController.prototype.LoadBudgetLevels = function () {
            var reguest = this.httpService.get(this.budgetlevelsUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadBudgetLevels success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.budgetlevels.data.length; i++) {
                    var item = new Dictionaries.BudgetLevel();
                    item.budgetLevelCode = data.budgetlevels.data[i].budgetLevelCode;
                    item.budgetLevelName = data.budgetlevels.data[i].budgetLevelName;
                    item.id = data.budgetlevels.data[i].id;
                    this.scope.BudgetLevels.push(item);
                }
                this.TryToChozen();
            }.bind(this));
        };

        DictionaryController.prototype.BuildQuery = function () {
            this.scope.dimmerClass = "ui active dimmer";
            console.log("BuildQuery", this.scope.cQuery);
            if (this.scope.SelectedRegion != null) {
                this.scope.cQuery.customerregion = this.scope.SelectedRegion.subjectCode.toString();
                this._supliersService.MapRegion(this.scope.SelectedRegion);
            }
            if (this.scope.SelectedBudgetLevels != null) {
                this.scope.cQuery.budgetlevel = this.scope.SelectedBudgetLevels.budgetLevelCode.toString();
            }
            if (this.scope.SelectedPlacings != null) {
                this.scope.cQuery.placing = this.scope.SelectedPlacings.description.toString();
            }
            this.scope.processedProgress = 0;
            this.scope.progress = 0;
            this._supliersService.LoadSuplierFromQuyery(this.scope.cQuery);
        };

        DictionaryController.prototype.SetTotalResult = function (totalResult) {
            this.scope.totalResult = totalResult;
        };

        DictionaryController.prototype.UpdateProgress = function (currentItem) {
            this.scope.dimmerClass = "ui dimmer";
            this.scope.processedProgress = currentItem;
            this.scope.progress = (this.scope.processedProgress / this.scope.totalResult) * 100;
            this.scope.$apply();
        };

        DictionaryController.prototype.TryToChozen = function () {
            this._loadCount++;
            if (this._loadCount >= 4) {
                setTimeout(function () {
                    console.log("TryToChozen success");
                    var elem;
                    elem = $("#cznSelectedBudgetLevels");
                    elem.chosen();
                    elem = $("#cznSelectedPlacings");
                    elem.chosen();
                    elem = $("#cznRegions");
                    elem.chosen();
                }, 1500);
            }
        };
        return DictionaryController;
    })();
    Dictionaries.DictionaryController = DictionaryController;
})(Dictionaries || (Dictionaries = {}));
//# sourceMappingURL=DictionariesController.js.map
