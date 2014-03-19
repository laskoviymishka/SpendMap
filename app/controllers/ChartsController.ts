
module Contracts {
    export interface ChartScope extends ng.IScope {
        contracts: Contract[];
        VM: ChartsController;
        countPerData: ChartData.PerDate[];
        countPerSup: ChartData.PerName[];
        countPerCust: ChartData.PerName[];
    }

    export class ChartsController {
        private httpService: IHttpService;
        private serviceConfig: IRequestConfig;
        private _scope: ChartScope;
        private _supliersService: Services.SuplierService;
        private header: any;
        private _contractsData: Model.Contract[];
        private _pricePerMonth: DevExpress.viz.charts.Chart;
        private _countPerMonth: DevExpress.viz.charts.Chart;

        constructor($scope: ChartScope, $http: IHttpService) {
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
            this._supliersService = Services.SuplierService.getInstance($http);
            this._supliersService.SetChart(this);
            this._scope.countPerData = [];
            this._scope.countPerSup = [];
            this._scope.countPerCust = [];
        }

        public PushContractData(data: Model.Contract[]) {
            this._contractsData = data;
            console.log("PushContractData", this._contractsData);
            for (var i = 0; i < this._contractsData.length; i++) {
                var month = this._contractsData[i].signDate.toString().substr(0, 7);
                var supname = this._contractsData[i].suppliers.supplier.organizationName;
                var custname = this._contractsData[i].customer.fullName;
                var wasAddedCust = false;
                var wasAddedSup = false;
                var wasAdded = false;
                for (var j = 0; j < this._scope.countPerData.length; j++) {
                    if (this._scope.countPerData[j].date.toString().substr(0, 7) == month) {
                        this._scope.countPerData[j].price += this._contractsData[i].price;
                        this._scope.countPerData[j].prodcount += this._contractsData[i].products.length;
                        this._scope.countPerData[j].count++;
                        wasAdded = true;
                    }
                }

                for (var j = 0; j < this._scope.countPerCust.length; j++) {
                    if (this._scope.countPerCust[j].name == custname) {
                        this._scope.countPerCust[j].price += this._contractsData[i].price;
                        this._scope.countPerCust[j].prodcount += this._contractsData[i].products.length;
                        this._scope.countPerCust[j].count++;
                        wasAddedCust = true;
                    }
                }

                for (var j = 0; j < this._scope.countPerData.length; j++) {
                    if (this._scope.countPerSup[j].name == supname) {
                        this._scope.countPerSup[j].price += this._contractsData[i].price;
                        this._scope.countPerSup[j].prodcount += this._contractsData[i].products.length;
                        this._scope.countPerSup[j].count++;
                        wasAddedSup = true;
                    }
                }

                if (!wasAdded) {
                    this._scope.countPerData.push(new ChartData.PerDate(this._contractsData[i].signDate, this._contractsData[i].price, this._contractsData[i].products.length));
                }
                if (!wasAddedCust) {
                    this._scope.countPerCust.push(new ChartData.PerName(this._contractsData[i].customer.fullName, this._contractsData[i].price, this._contractsData[i].products.length));
                }
                if (!wasAddedSup) {
                    this._scope.countPerSup.push(new ChartData.PerName(this._contractsData[i].suppliers.supplier.organizationName, this._contractsData[i].price, this._contractsData[i].products.length));
                }
            }
            console.log("countPerData", this._scope.countPerData, this._scope.countPerSup, this._scope.countPerCust);
        }

        public ShowChart() {
            this._pricePerMonth = new DevExpress.viz.charts.Chart($('#chart1'), {
                dataSource: this._scope.countPerSup,
                series: [{
                    argumentField: 'name',
                    valueField: 'price',
                    name: 'My oranges',
                    type: 'bar',
                    color: '#ffa500'
                }]
            });
            this._pricePerMonth.render();
            this._scope.$apply();
        }
    }
} 