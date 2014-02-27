
module Model {
    export class Contract {
        public id: string;
        public regNum: string;
        public customer: Model.Customer;
        public signDate: Date;
        public price: number;
        public suppliers: Model.Suplier;
        public products: Product[];
    }
}
/*
{
        "_newestVersion": true,
        "scan": null,
        "number": "2",
        "currentContractStage": "EC",
        "id": "52d7f663f96d7f6f31f25f99",
        "xType": "ordinary",
        "regionCode": "59",
        "signDate": "2012-04-01T00:00:00",
        "modification": {
          "#text": "\n      \n      \n      \n    ",
          "type": "M",
          "description": "Окончание срока действия контракта",
          "base": "Поступившие счета - фактуры"
        },
        "finances": {
          "budgetLevel": {
            "code": "02",
            "#text": "\n        \n        \n      ",
            "name": "бюджет субъекта Российской Федерации"
          },
          "#text": "\n      \n      \n      \n      \n    ",
          "financeSource": "Бюджет Пермского края",
          "budget": {
            "code": "56020359",
            "#text": "\n        \n        \n      ",
            "name": "Бюджет Пермского края"
          },
          "budgetary": {
            "comment": null,
            "KBK": "81010025078990001340",
            "price": 99994.73,
            "month": "6",
            "year": "2012",
            "#text": "\n        \n        \n        \n        \n        \n      "
          }
        },
        "printFormURL": "http://zakupki.gov.ru/pgz/printForm?type=CONTRACT_INFO&id=6981519",
        "documentBase": "Протокол рассмотрения и оценки котировочных заявок №0356200021512000002-1 от 20.03.2012",
        "foundation": {
          "#text": "\n      \n    ",
          "order": {
            "notificationNumber": "0356200021512000002",
            "#text": "\n        \n        \n        \n      ",
            "lotNumber": "1",
            "placing": "4"
          }
        },
        "price": 99994.73,
        "protocolDate": "2012-03-20",
        "publishDate": "2012-10-25T15:59:46Z",
        "regNum": "0356200021512000012",
        "versionNumber": 1,
        "execution": {
          "month": "6",
          "#text": "\n      \n      \n    ",
          "year": "2012"
        },
        "customer": {
          "kpp": "590801001",
          "inn": "5908011905",
          "regNum": "03562000215",
          "tofk": "5600",
          "fullName": "государственное казенное учреждение Пермского края \"Межведомственный центр помощи детям, оставшимся без попечения родителей\"",
          "#text": "\n      \n      \n      \n      \n      \n    "
        },
        "xDataType": "contract",
        "_updateNumber": 0,
        "currency": {
          "code": "RUB",
          "#text": "\n      \n      \n    ",
          "name": "Российский рубль"
        },
        "suppliers": {
          "supplier": {
            "kpp": "590801001",
            "factualAddress": "614113, Россия, Пермский край, г. Пермь, ул. Оборонщиков,8, офис 31",
            "contactInfo": {
              "middleName": "Леонидович",
              "lastName": "Шафронов",
              "#text": "\n          \n          \n          \n        ",
              "firstName": "Артем"
            },
            "organizationName": "Агроторг",
            "organizationForm": "OOO",
            "country": {
              "#text": "\n          \n          \n        ",
              "countryCode": "643",
              "countryFullName": "Российская Федерация"
            },
            "inn": "5908047933",
            "participantType": "U",
            "contactPhone": "8-342-2700909",
            "#text": "\n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n      ",
            "postAddress": "614113, Россия, Пермский край, г. Пермь, ул. Оборонщиков,8, офис 31"
          },
          "#text": "\n      \n    "
        },
        "products": {
          "product": {
            "name": "Молоко питьевое цельное пастеризованное, йогурт, кефир, сметана 20%, творог нежирный, масло сливочное, сыр жирный крупный \"Российский\" \n",
            "OKEI": {
              "code": "796",
              "#text": "\n          \n          \n        ",
              "name": "Штука"
            },
            "sum": "99994.73",
            "OKDP": {
              "code": "1520111",
              "#text": "\n          \n          \n        ",
              "name": "Молоко питьевое цельное пастеризованное нормализованное"
            },
            "#text": "\n        \n        \n        \n        \n        \n        \n      ",
            "price": 99994.73,
            "quantity": "1"
          },
          "#text": "\n      \n    "
        }
      }
*/