var Maps;
(function (Maps) {
    var MapScope = (function () {
        function MapScope() {
        }
        return MapScope;
    })();
    Maps.MapScope = MapScope;

    var MapController = (function () {
        function MapController($scope, $http) {
            this._http = $http;
            this._scope = $scope;
            var mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(55.764213, 37.619505)
            };
            this._map = new google.maps.Map(document.getElementById('map'), mapOptions);
            this._geocode = new google.maps.Geocoder();
            this._customers = [];
            this._supliers = [];
            var testCustomer = new Model.Customer();
            testCustomer.postalAddress = "mogilev";
            this._customers.push(testCustomer);
            this._scope.VM = this;
            this._scope.query = "?productsearch=suppliers";
            this._supliersService = Services.SuplierService.getInstance(this._http);
            this._supliersService.SetMap(this);
        }
        MapController.prototype.Load = function () {
        };

        MapController.prototype.GetSupliers = function () {
        };

        MapController.prototype.DisplayCustomers = function () {
            for (var i = 0; i < this._customers.length; i++) {
                var geocodeRequest = {
                    address: this._customers[i].postalAddress
                };
                this._geocode.geocode(geocodeRequest, function (results, status) {
                    console.log("DisplayCustomers", this._customers[i], results, status);
                    var marker = new google.maps.Marker();
                    marker.setPosition(results[0].geometry.location);
                    marker.setMap(this._map);
                    this._map.setCenter(results[0].geometry.location);
                }.bind(this));
            }
        };

        MapController.prototype.DisplaySupliers = function (model) {
            this._supliers = model;
            console.log("LoadSupliers success", this._supliers);
            var index = 0;
            this.GeocodeAndDisplay(index);
        };

        MapController.prototype.GeocodeAndDisplay = function (index) {
            var _this = this;
            var suplier = this._supliers[index];
            var map = this._map;
            setTimeout(function () {
                var geocodeRequest = {
                    address: suplier.factualAddres
                };
                _this._geocode.geocode(geocodeRequest, function (results, status) {
                    console.log("LoadSupliers success", results, status);
                    if (index <= this._supliers.length) {
                        this.GeocodeAndDisplay(index + 1);
                    }

                    if (results == null || results.length == 0) {
                        return;
                    } else {
                        var marker = new google.maps.Marker();
                        marker.setMap(this._map);
                        marker.setPosition(results[0].geometry.location);
                    }
                }.bind(_this));
            }, 100 + index * 30);
        };
        return MapController;
    })();
    Maps.MapController = MapController;
})(Maps || (Maps = {}));
//# sourceMappingURL=MapController.js.map
