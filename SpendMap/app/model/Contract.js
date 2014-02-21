var Contracts;
(function (Contracts) {
    var Contract = (function () {
        function Contract(request, http) {
            this._request = request;
            this._http = http;
        }
        Contract.prototype.SuccessCallback = function (data) {
            this.text = data.toString();
        };
        return Contract;
    })();
    Contracts.Contract = Contract;
})(Contracts || (Contracts = {}));
//# sourceMappingURL=Contract.js.map
