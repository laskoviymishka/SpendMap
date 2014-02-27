
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
          "description": "��������� ����� �������� ���������",
          "base": "����������� ����� - �������"
        },
        "finances": {
          "budgetLevel": {
            "code": "02",
            "#text": "\n        \n        \n      ",
            "name": "������ �������� ���������� ���������"
          },
          "#text": "\n      \n      \n      \n      \n    ",
          "financeSource": "������ ��������� ����",
          "budget": {
            "code": "56020359",
            "#text": "\n        \n        \n      ",
            "name": "������ ��������� ����"
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
        "documentBase": "�������� ������������ � ������ ������������ ������ �0356200021512000002-1 �� 20.03.2012",
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
          "fullName": "��������������� �������� ���������� ��������� ���� \"���������������� ����� ������ �����, ���������� ��� ��������� ���������\"",
          "#text": "\n      \n      \n      \n      \n      \n    "
        },
        "xDataType": "contract",
        "_updateNumber": 0,
        "currency": {
          "code": "RUB",
          "#text": "\n      \n      \n    ",
          "name": "���������� �����"
        },
        "suppliers": {
          "supplier": {
            "kpp": "590801001",
            "factualAddress": "614113, ������, �������� ����, �. �����, ��. �����������,8, ���� 31",
            "contactInfo": {
              "middleName": "����������",
              "lastName": "��������",
              "#text": "\n          \n          \n          \n        ",
              "firstName": "�����"
            },
            "organizationName": "��������",
            "organizationForm": "OOO",
            "country": {
              "#text": "\n          \n          \n        ",
              "countryCode": "643",
              "countryFullName": "���������� ���������"
            },
            "inn": "5908047933",
            "participantType": "U",
            "contactPhone": "8-342-2700909",
            "#text": "\n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n      ",
            "postAddress": "614113, ������, �������� ����, �. �����, ��. �����������,8, ���� 31"
          },
          "#text": "\n      \n    "
        },
        "products": {
          "product": {
            "name": "������ �������� ������� ���������������, ������, �����, ������� 20%, ������ ��������, ����� ���������, ��� ������ ������� \"����������\" \n",
            "OKEI": {
              "code": "796",
              "#text": "\n          \n          \n        ",
              "name": "�����"
            },
            "sum": "99994.73",
            "OKDP": {
              "code": "1520111",
              "#text": "\n          \n          \n        ",
              "name": "������ �������� ������� ��������������� ���������������"
            },
            "#text": "\n        \n        \n        \n        \n        \n        \n      ",
            "price": 99994.73,
            "quantity": "1"
          },
          "#text": "\n      \n    "
        }
      }
*/