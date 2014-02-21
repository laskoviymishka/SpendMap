var Services;
(function (Services) {
    var SuplierService = (function () {
        function SuplierService(http) {
            this._http = http;
            this.header = {
                method: "GET",
                headers: {
                    "X-Mashape-Authorization": "FudXLyfZSg3Q1DPtCAnr4t4DJh5cjmHw",
                    "If-None-Match": "dc68bf7b0e24f6912ffdac1ab707bb52929c8b2a"
                }
            };
            this.baseUri = "https://clearspending.p.mashape.com";
            this.supliersUri = this.baseUri + "/v1/suppliers/select/?regioncode=23";
        }
        SuplierService.prototype.LoadSupliers = function (model) {
            var result;
            result = [];
            var reguest = this._http.get(this.supliersUri, this.header);
            reguest.success(function (data, status) {
                console.log("LoadSupliers success", data, status);
                if (data == "") {
                    return;
                }
                for (var i = 0; i < data.suppliers.data.length; i++) {
                    var item = new Model.Suplier();
                    item.factualAddres = data.opf.data[i].factualAddres;
                    this.push(item);
                }
            }.bind(model));
            return result;
        };
        return SuplierService;
    })();
    Services.SuplierService = SuplierService;

    angular.module('Services.SuplierService', []).factory('SuplierService', function ($http) {
        return new SuplierService($http);
    });
})(Services || (Services = {}));
//# sourceMappingURL=SupliersService.js.map
