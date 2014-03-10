var ChartData;
(function (ChartData) {
    var PerDate = (function () {
        function PerDate(date, price, prodcount) {
            this.date = date;
            this.price = price;
            this.count = 1;
            this.prodcount = prodcount;
        }
        return PerDate;
    })();
    ChartData.PerDate = PerDate;

    var PerName = (function () {
        function PerName(name, price, prodcount) {
            this.name = name;
            this.price = price;
            this.count = 1;
            this.prodcount = prodcount;
        }
        return PerName;
    })();
    ChartData.PerName = PerName;

    var Stat = (function () {
        function Stat(year, value) {
            this.year = year;
            this.value = value;
        }
        return Stat;
    })();
    ChartData.Stat = Stat;
})(ChartData || (ChartData = {}));
//# sourceMappingURL=ChartData.js.map
