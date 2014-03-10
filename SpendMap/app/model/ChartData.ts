module ChartData {

    export class PerDate {

        constructor(date: Date, price: number, prodcount: number) {
            this.date = date;
            this.price = price;
            this.count = 1;
            this.prodcount = prodcount;
        }

        public date: Date;
        public price: number;
        public count: number;
        public prodcount: number;
    }

    export class PerName {

        constructor(name: string, price: number, prodcount: number) {
            this.name = name;
            this.price = price;
            this.count = 1;
            this.prodcount = prodcount;
        }

        public name: string;
        public price: number;
        public count: number;
        public prodcount: number;
    }

    export class Stat {

        constructor(year: number, value: number) {
            this.year = year;
            this.value = value;
        }

        public year: number;
        public value: number;
    }
} 