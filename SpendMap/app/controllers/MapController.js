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
                center: new google.maps.LatLng(-34.397, 150.644)
            };
            this._map = new google.maps.Map(document.getElementById('map'), mapOptions);
            this._geocode = new google.maps.Geocoder();
            this._customers = [];
            this._supliers = [];
            var testCustomer = new Model.Customer();
            testCustomer.postalAddress = "могилев ул. Ленинская 81а";
            this._customers.push(testCustomer);
            this._scope.VM = this;
            this._supliersService = new Services.SuplierService(this._http, this);
        }
        MapController.prototype.Load = function () {
        };

        MapController.prototype.GetSupliers = function () {
            this._supliersService.LoadSupliers();
            this._scope.SuplierCount = this._supliers.length;
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
            for (var i = 0; i < this._supliers.length; i++) {
                var geocodeRequest = {
                    address: this._supliers[i].factualAddres
                };
                this._geocode.geocode(geocodeRequest, function (results, status) {
                    if (results == null || results.length == 0) {
                        return;
                    }
                    var marker = new google.maps.Marker();
                    marker.setPosition(results[0].geometry.location);
                    marker.setMap(this._map);
                    this._map.setCenter(results[0].geometry.location);
                }.bind(this));
            }
        };
        return MapController;
    })();
    Maps.MapController = MapController;
})(Maps || (Maps = {}));
//# sourceMappingURL=MapController.js.map
