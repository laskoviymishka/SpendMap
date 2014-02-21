module Maps {

    export class MapScope {
        VM: MapController;
        SuplierCount: number;
    }

    export class MapController {
        private _map: google.maps.Map;
        private _geocode: google.maps.Geocoder;
        private _scope: MapScope;
        private _customers: Model.Customer[];
        private _supliers: Model.Suplier[];
        private _http: ng.IHttpService;
        private _supliersService: Services.SuplierService;

        constructor($scope: MapScope, $http: ng.IHttpService) {
            this._http = $http;
            this._scope = $scope;
            var mapOptions: google.maps.MapOptions = {
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

        Load(): void {
        }

        public GetSupliers(): void {
            this._supliersService.LoadSupliers();
            this._scope.SuplierCount = this._supliers.length;
        }

        public DisplayCustomers(): void {
            for (var i = 0; i < this._customers.length; i++) {
                var geocodeRequest: google.maps.GeocoderRequest = {
                    address: this._customers[i].postalAddress
                };
                this._geocode.geocode(
                    geocodeRequest,
                    function (
                        results: google.maps.GeocoderResult[],
                        status: google.maps.GeocoderStatus) {
                        console.log("DisplayCustomers", this._customers[i], results, status);
                        var marker = new google.maps.Marker();
                        marker.setPosition(results[0].geometry.location);
                        marker.setMap(this._map);
                        this._map.setCenter(results[0].geometry.location);
                    }.bind(this));
            }
        }

        public DisplaySupliers(model: Model.Suplier[]): void {
            this._supliers = model;
            for (var i = 0; i < this._supliers.length; i++) {
                var geocodeRequest: google.maps.GeocoderRequest = {
                    address: this._supliers[i].factualAddres
                };
                this._geocode.geocode(
                    geocodeRequest,
                    function (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) {
                        if (results == null || results.length == 0) {
                            return;
                        }
                        var marker = new google.maps.Marker();
                        marker.setPosition(results[0].geometry.location);
                        marker.setMap(this._map);
                        this._map.setCenter(results[0].geometry.location);
                    }.bind(this));
            }
        }

    }
} 
