module Maps {

    export class MapScope {
        VM: MapController;
        query: string;
        SuplierCount: number;
        proccessedItems: number;
    }

    export class MapController {
        private _map: google.maps.Map;
        private _geocode: google.maps.Geocoder;
        private _scope: MapScope;
        private _customers: Model.Customer[];
        private _supliers: Model.SuplierData[];
        private _http: ng.IHttpService;
        private _supliersService: Services.SuplierService;

        constructor($scope: MapScope, $http: ng.IHttpService) {
            this._http = $http;
            this._scope = $scope;
            var mapOptions: google.maps.MapOptions = {
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

        Load(): void {
        }

        public GetSupliers(): void {
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
                        marker.addListener(marker, "click", () => { console.log("asdasdasd") });
                        this._map.setCenter(results[0].geometry.location);
                    }.bind(this));
            }
        }

        public DisplaySupliers(model: Model.SuplierData[]): void {
            this._supliers = model;
            console.log("LoadSupliers success", this._supliers);
            var index = 0;
            this.GeocodeAndDisplay(index);
        }

        public MapRegion(region: Dictionaries.Region) {
            var geocodeRequest: google.maps.GeocoderRequest = {
                address: region.name
            };
            console.log("geocodeRequest", geocodeRequest);
            this._geocode.geocode(
                geocodeRequest,
                function (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) {
                    console.log("geocodeRequest response", results, status, region);
                    this._map.setCenter(results[0].geometry.location);
                }.bind(this));
        }

        private GeocodeAndDisplay(index: number) {
            var suplier = this._supliers[index];
            var timeOut = 100 + index * 50;
            if (timeOut > 600) {
                timeOut = 600;
            }
            setTimeout(() => {
                var geocodeRequest: google.maps.GeocoderRequest = {
                    address: suplier.factualAddres
                };
                this._geocode.geocode(
                    geocodeRequest,
                    function (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) {
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
                    }.bind(this));
            }, timeOut);
            this._supliersService.UpdateDisplayProgress(index);
        }
    }
} 
