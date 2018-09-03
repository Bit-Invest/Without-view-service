import { Utils } from '@common/Utils';

export const GET_PRODUCTS = 'marketplace/GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'marketplace/GET_PRODUCTS_SUCCESS';
export const GET_HISTORY = 'marketplace/GET_HISTORY';
export const GET_HISTORY_SUCCESS = 'marketplace/GET_HISTORY_SUCCESS';

const initialState = {
  products: [
    {
      "followersCount": 10,
      "id": "5bdw1dc6d7272vd4c3b9bc41",
      "info": "ZIMMERMAN product information",
      "name": "MARK",
      "nameProduct": "Product",
      "stockName": "binance",
      "surname": "ZIMMERMAN",
      raitingTrader: {
        raiting: 1.7,
        comment: 110
      },
      statesTrader: {
        month: '-30',
        week: '60'
      } 
    },
    {
      "followersCount": 50,
      "id": "6bdw1dc6d7272vd4c3b9bc41",
      "info": "JEFFERY product information",
      "name": "EDWARD",
      "nameProduct": "Product",
      "stockName": "binance",
      "surname": "JEFFERY",
      raitingTrader: {
        raiting: 4.3,
        comment: 15
      },
      statesTrader: {
        month: '-10',
        week: '15'
      } 
    },
    {
      "followersCount": 2,
      "id": "7bdw1dc6d7272vd4c3b9bc41",
      "info": "COURTENAY product information",
      "name": "CURTIS",
      "nameProduct": "Product",
      "stockName": "binance",
      "surname": "COURTENAY",
      raitingTrader: {
        raiting: 4.7,
        comment: 11
      },
      statesTrader: {
        month: '-10',
        week: '-45'
      } 
    },
    {
      "followersCount": 23,
      "id": "8bdw1dc6d7272vd4c3b9bc41",
      "info": "HOWARD product information",
      "name": "KERMIT",
      "nameProduct": "Product",
      "stockName": "binance",
      "surname": "HOWARD",
      raitingTrader: {
        raiting: 2.9,
        comment: 53
      },
      statesTrader: {
        month: '45',
        week: '31'
      } 
    },
    {
      "followersCount": 11,
      "id": "9bdw1dc6d7272vd4c3b9bc41",
      "info": "CHESHIRE product information",
      "name": "EMIL",
      "nameProduct": "Product",
      "stockName": "binance",
      "surname": "CHESHIRE",
      raitingTrader: {
        raiting: 3.3,
        comment: 1
      },
      statesTrader: {
        month: '-43',
        week: '17'
      } 
    },
    // {
    //   "followersCount": 32,
    //   "id": "11dw1dc6d7272vd4c3b9bc41",
    //   "info": "TANNER product information",
    //   "name": "ANWAR",
    //   "nameProduct": "Product",
    //   "stockName": "binance",
    //   "surname": "TANNER",
    //   statesTrader: {
    //     month: '15',
    //     week: '-25'
    //   } 
    // },
  ],
  historyData: {
    "5bdw1dc6d7272vd4c3b9bc41": [
      {
        "date": new Date('2018, 07, 20'),
        "close": 0.003863733336399995
      }, {
        "date": new Date('2018, 07, 21'),
        "close": 0.0016858158840599995
      }, {
        "date": new Date('2018, 07, 22'),
        "close": 0.0026892821663899997
      }, {
        "date": new Date('2018, 07, 23'),
        "close": 0.0026916759659099997
      }, {
        "date": new Date('2018, 07, 24'),
        "close": 0.0036860886021600004
      }, {
        "date": new Date('2018, 07, 25'),
        "close": 0.0046862122981600005
      }, {
        "date": new Date('2018, 07, 26'),
        "close": 0.0056883055328400006
      }, {
        "date": new Date('2018, 07, 27'),
        "close": 0.0066889292348900007
      }, {
        "date": new Date('2018, 07, 28'),
        "close": 0.0076994679478900005
      }, {
        "date": new Date('2018, 07, 29'),
        "close": 0.0081918703866800004
      }, {
        "date": new Date('2018, 07, 30'),
        "close": 0.0084916744050799997
      }, {
        "date": new Date('2018, 07, 31'),
        "close": 0.00858212111908
      }, {
        "date": new Date('2018, 08, 1'),
        "close": 0.00838272712788
      }, {
        "date": new Date('2018, 08, 2'),
        "close": 0.00778988938344
      }, {
        "date": new Date('2018, 08, 3'),
        "close": 0.00379071465844
      }, {
        "date": new Date('2018, 08, 4'),
        "close": 0.0027366349671999995
      }, {
        "date": new Date('2018, 08, 5'),
        "close": 0.00263874833216
      }, {
        "date": new Date('2018, 08, 6'),
        "close": 0.0036514954247200003
      }, {
        "date": new Date('2018, 08, 7'),
        "close": 0.0056503453315200004
      }, {
        "date": new Date('2018, 08, 8'),
        "close": 0.0066904522125200005
      }, {
        "date": new Date('2018, 08, 9'),
        "close": 0.0076432422535400003
      }, {
        "date": new Date('2018, 08, 10'),
        "close": 0.0086552015880000005
      }, {
        "date": new Date('2018, 08, 11'),
        "close": 0.00765743762904
      }, {
        "date": new Date('2018, 08, 12'),
        "close": 0.0056569937032400004
      }, {
        "date": new Date('2018, 08, 13'),
        "close": 0.00366253638032
      }, {
        "date": new Date('2018, 08, 14'),
        "close": 0.0056627657938200003
      }, {
        "date": new Date('2018, 08, 15'),
        "close": 0.0056659179475400003
      }, {
        "date": new Date('2018, 08, 16'),
        "close": 0.0066662698272400006
      }, {
        "date": new Date('2018, 08, 17'),
        "close": 0.0047658821602800003
      }, {
        "date": new Date('2018, 08, 18'),
        "close": 0.0066670624654800005
      }, {
        "date": new Date('2018, 08, 19'),
        "close": 0.0077832549870800004
      }, {
        "date": new Date('2018, 08, 20'),
        "close": 0.0087844865776
      }, {
        "date": new Date('2018, 08, 21'),
        "close": 0.0097822490909200004
      }, {
        "date": new Date('2018, 08, 22'),
        "close": 0.00778230225852
      }, {
        "date": new Date('2018, 08, 23'),
        "close": 0.005792759456
      }, {
        "date": new Date('2018, 08, 24'),
        "close": 0.0049792759456
      }, {
        "date": new Date('2018, 08, 25'),
        "close": 0.003792759456
      }
    ],
    '6bdw1dc6d7272vd4c3b9bc41': [
      {
        "date": new Date('2018, 07, 20'),
        "close": 0.003863733336399995
      }, {
        "date": new Date('2018, 07, 21'),
        "close": 0.0016858158840599995
      }, {
        "date": new Date('2018, 07, 22'),
        "close": 0.0026892821663899997
      }, {
        "date": new Date('2018, 07, 23'),
        "close": 0.0026916759659099997
      }, {
        "date": new Date('2018, 07, 24'),
        "close": 0.0036860886021600004
      }, {
        "date": new Date('2018, 07, 25'),
        "close": 0.0046862122981600005
      }, {
        "date": new Date('2018, 07, 26'),
        "close": 0.0056883055328400006
      }, {
        "date": new Date('2018, 07, 27'),
        "close": 0.0066889292348900007
      }, {
        "date": new Date('2018, 07, 28'),
        "close": 0.0076994679478900005
      }, {
        "date": new Date('2018, 07, 29'),
        "close": 0.0081918703866800004
      }, {
        "date": new Date('2018, 07, 30'),
        "close": 0.0084916744050799997
      }, {
        "date": new Date('2018, 07, 31'),
        "close": 0.00858212111908
      }, {
        "date": new Date('2018, 08, 1'),
        "close": 0.00838272712788
      }, {
        "date": new Date('2018, 08, 2'),
        "close": 0.00778988938344
      }, {
        "date": new Date('2018, 08, 3'),
        "close": 0.00379071465844
      }, {
        "date": new Date('2018, 08, 4'),
        "close": 0.0027366349671999995
      }, {
        "date": new Date('2018, 08, 5'),
        "close": 0.00263874833216
      }, {
        "date": new Date('2018, 08, 6'),
        "close": 0.0036514954247200003
      }, {
        "date": new Date('2018, 08, 7'),
        "close": 0.0056503453315200004
      }, {
        "date": new Date('2018, 08, 8'),
        "close": 0.0066904522125200005
      }, {
        "date": new Date('2018, 08, 9'),
        "close": 0.0076432422535400003
      }, {
        "date": new Date('2018, 08, 10'),
        "close": 0.0086552015880000005
      }, {
        "date": new Date('2018, 08, 11'),
        "close": 0.00765743762904
      }, {
        "date": new Date('2018, 08, 12'),
        "close": 0.0056569937032400004
      }, {
        "date": new Date('2018, 08, 13'),
        "close": 0.00366253638032
      }, {
        "date": new Date('2018, 08, 14'),
        "close": 0.0056627657938200003
      }, {
        "date": new Date('2018, 08, 15'),
        "close": 0.0056659179475400003
      }, {
        "date": new Date('2018, 08, 16'),
        "close": 0.0066662698272400006
      }, {
        "date": new Date('2018, 08, 17'),
        "close": 0.0047658821602800003
      }, {
        "date": new Date('2018, 08, 18'),
        "close": 0.0066670624654800005
      }, {
        "date": new Date('2018, 08, 19'),
        "close": 0.0077832549870800004
      }, {
        "date": new Date('2018, 08, 20'),
        "close": 0.0087844865776
      }, {
        "date": new Date('2018, 08, 21'),
        "close": 0.0097822490909200004
      }, {
        "date": new Date('2018, 08, 22'),
        "close": 0.00778230225852
      }, {
        "date": new Date('2018, 08, 23'),
        "close": 0.005792759456
      }, {
        "date": new Date('2018, 08, 24'),
        "close": 0.0049792759456
      }, {
        "date": new Date('2018, 08, 25'),
        "close": 0.003792759456
      }
    ],
    '7bdw1dc6d7272vd4c3b9bc41': [
      {
        "date": new Date('2018, 07, 20'),
        "close": 0.003863733336399995
      }, {
        "date": new Date('2018, 07, 21'),
        "close": 0.0016858158840599995
      }, {
        "date": new Date('2018, 07, 22'),
        "close": 0.0026892821663899997
      }, {
        "date": new Date('2018, 07, 23'),
        "close": 0.0026916759659099997
      }, {
        "date": new Date('2018, 07, 24'),
        "close": 0.0036860886021600004
      }, {
        "date": new Date('2018, 07, 25'),
        "close": 0.0046862122981600005
      }, {
        "date": new Date('2018, 07, 26'),
        "close": 0.0056883055328400006
      }, {
        "date": new Date('2018, 07, 27'),
        "close": 0.0066889292348900007
      }, {
        "date": new Date('2018, 07, 28'),
        "close": 0.0076994679478900005
      }, {
        "date": new Date('2018, 07, 29'),
        "close": 0.0081918703866800004
      }, {
        "date": new Date('2018, 07, 30'),
        "close": 0.0084916744050799997
      }, {
        "date": new Date('2018, 07, 31'),
        "close": 0.00858212111908
      }, {
        "date": new Date('2018, 08, 1'),
        "close": 0.00838272712788
      }, {
        "date": new Date('2018, 08, 2'),
        "close": 0.00778988938344
      }, {
        "date": new Date('2018, 08, 3'),
        "close": 0.00379071465844
      }, {
        "date": new Date('2018, 08, 4'),
        "close": 0.0027366349671999995
      }, {
        "date": new Date('2018, 08, 5'),
        "close": 0.00263874833216
      }, {
        "date": new Date('2018, 08, 6'),
        "close": 0.0036514954247200003
      }, {
        "date": new Date('2018, 08, 7'),
        "close": 0.0056503453315200004
      }, {
        "date": new Date('2018, 08, 8'),
        "close": 0.0066904522125200005
      }, {
        "date": new Date('2018, 08, 9'),
        "close": 0.0076432422535400003
      }, {
        "date": new Date('2018, 08, 10'),
        "close": 0.0086552015880000005
      }, {
        "date": new Date('2018, 08, 11'),
        "close": 0.00765743762904
      }, {
        "date": new Date('2018, 08, 12'),
        "close": 0.0056569937032400004
      }, {
        "date": new Date('2018, 08, 13'),
        "close": 0.00366253638032
      }, {
        "date": new Date('2018, 08, 14'),
        "close": 0.0056627657938200003
      }, {
        "date": new Date('2018, 08, 15'),
        "close": 0.0056659179475400003
      }, {
        "date": new Date('2018, 08, 16'),
        "close": 0.0066662698272400006
      }, {
        "date": new Date('2018, 08, 17'),
        "close": 0.0047658821602800003
      }, {
        "date": new Date('2018, 08, 18'),
        "close": 0.0066670624654800005
      }, {
        "date": new Date('2018, 08, 19'),
        "close": 0.0077832549870800004
      }, {
        "date": new Date('2018, 08, 20'),
        "close": 0.0087844865776
      }, {
        "date": new Date('2018, 08, 21'),
        "close": 0.0097822490909200004
      }, {
        "date": new Date('2018, 08, 22'),
        "close": 0.00778230225852
      }, {
        "date": new Date('2018, 08, 23'),
        "close": 0.005792759456
      }, {
        "date": new Date('2018, 08, 24'),
        "close": 0.0049792759456
      }, {
        "date": new Date('2018, 08, 25'),
        "close": 0.003792759456
      }
    ],
    '8bdw1dc6d7272vd4c3b9bc41': [
      {
        "date": new Date('2018, 07, 20'),
        "close": 0.003863733336399995
      }, {
        "date": new Date('2018, 07, 21'),
        "close": 0.0016858158840599995
      }, {
        "date": new Date('2018, 07, 22'),
        "close": 0.0026892821663899997
      }, {
        "date": new Date('2018, 07, 23'),
        "close": 0.0026916759659099997
      }, {
        "date": new Date('2018, 07, 24'),
        "close": 0.0036860886021600004
      }, {
        "date": new Date('2018, 07, 25'),
        "close": 0.0046862122981600005
      }, {
        "date": new Date('2018, 07, 26'),
        "close": 0.0056883055328400006
      }, {
        "date": new Date('2018, 07, 27'),
        "close": 0.0066889292348900007
      }, {
        "date": new Date('2018, 07, 28'),
        "close": 0.0076994679478900005
      }, {
        "date": new Date('2018, 07, 29'),
        "close": 0.0081918703866800004
      }, {
        "date": new Date('2018, 07, 30'),
        "close": 0.0084916744050799997
      }, {
        "date": new Date('2018, 07, 31'),
        "close": 0.00858212111908
      }, {
        "date": new Date('2018, 08, 1'),
        "close": 0.00838272712788
      }, {
        "date": new Date('2018, 08, 2'),
        "close": 0.00778988938344
      }, {
        "date": new Date('2018, 08, 3'),
        "close": 0.00379071465844
      }, {
        "date": new Date('2018, 08, 4'),
        "close": 0.0027366349671999995
      }, {
        "date": new Date('2018, 08, 5'),
        "close": 0.00263874833216
      }, {
        "date": new Date('2018, 08, 6'),
        "close": 0.0036514954247200003
      }, {
        "date": new Date('2018, 08, 7'),
        "close": 0.0056503453315200004
      }, {
        "date": new Date('2018, 08, 8'),
        "close": 0.0066904522125200005
      }, {
        "date": new Date('2018, 08, 9'),
        "close": 0.0076432422535400003
      }, {
        "date": new Date('2018, 08, 10'),
        "close": 0.0086552015880000005
      }, {
        "date": new Date('2018, 08, 11'),
        "close": 0.00765743762904
      }, {
        "date": new Date('2018, 08, 12'),
        "close": 0.0056569937032400004
      }, {
        "date": new Date('2018, 08, 13'),
        "close": 0.00366253638032
      }, {
        "date": new Date('2018, 08, 14'),
        "close": 0.0056627657938200003
      }, {
        "date": new Date('2018, 08, 15'),
        "close": 0.0056659179475400003
      }, {
        "date": new Date('2018, 08, 16'),
        "close": 0.0066662698272400006
      }, {
        "date": new Date('2018, 08, 17'),
        "close": 0.0047658821602800003
      }, {
        "date": new Date('2018, 08, 18'),
        "close": 0.0066670624654800005
      }, {
        "date": new Date('2018, 08, 19'),
        "close": 0.0077832549870800004
      }, {
        "date": new Date('2018, 08, 20'),
        "close": 0.0087844865776
      }, {
        "date": new Date('2018, 08, 21'),
        "close": 0.0097822490909200004
      }, {
        "date": new Date('2018, 08, 22'),
        "close": 0.00778230225852
      }, {
        "date": new Date('2018, 08, 23'),
        "close": 0.005792759456
      }, {
        "date": new Date('2018, 08, 24'),
        "close": 0.0049792759456
      }, {
        "date": new Date('2018, 08, 25'),
        "close": 0.003792759456
      }
    ],
    '9bdw1dc6d7272vd4c3b9bc41': [
      {
        "date": new Date('2018, 07, 20'),
        "close": 0.003863733336399995
      }, {
        "date": new Date('2018, 07, 21'),
        "close": 0.0016858158840599995
      }, {
        "date": new Date('2018, 07, 22'),
        "close": 0.0026892821663899997
      }, {
        "date": new Date('2018, 07, 23'),
        "close": 0.0026916759659099997
      }, {
        "date": new Date('2018, 07, 24'),
        "close": 0.0036860886021600004
      }, {
        "date": new Date('2018, 07, 25'),
        "close": 0.0046862122981600005
      }, {
        "date": new Date('2018, 07, 26'),
        "close": 0.0056883055328400006
      }, {
        "date": new Date('2018, 07, 27'),
        "close": 0.0066889292348900007
      }, {
        "date": new Date('2018, 07, 28'),
        "close": 0.0076994679478900005
      }, {
        "date": new Date('2018, 07, 29'),
        "close": 0.0081918703866800004
      }, {
        "date": new Date('2018, 07, 30'),
        "close": 0.0084916744050799997
      }, {
        "date": new Date('2018, 07, 31'),
        "close": 0.00858212111908
      }, {
        "date": new Date('2018, 08, 1'),
        "close": 0.00838272712788
      }, {
        "date": new Date('2018, 08, 2'),
        "close": 0.00778988938344
      }, {
        "date": new Date('2018, 08, 3'),
        "close": 0.00379071465844
      }, {
        "date": new Date('2018, 08, 4'),
        "close": 0.0027366349671999995
      }, {
        "date": new Date('2018, 08, 5'),
        "close": 0.00263874833216
      }, {
        "date": new Date('2018, 08, 6'),
        "close": 0.0036514954247200003
      }, {
        "date": new Date('2018, 08, 7'),
        "close": 0.0056503453315200004
      }, {
        "date": new Date('2018, 08, 8'),
        "close": 0.0066904522125200005
      }, {
        "date": new Date('2018, 08, 9'),
        "close": 0.0076432422535400003
      }, {
        "date": new Date('2018, 08, 10'),
        "close": 0.0086552015880000005
      }, {
        "date": new Date('2018, 08, 11'),
        "close": 0.00765743762904
      }, {
        "date": new Date('2018, 08, 12'),
        "close": 0.0056569937032400004
      }, {
        "date": new Date('2018, 08, 13'),
        "close": 0.00366253638032
      }, {
        "date": new Date('2018, 08, 14'),
        "close": 0.0056627657938200003
      }, {
        "date": new Date('2018, 08, 15'),
        "close": 0.0056659179475400003
      }, {
        "date": new Date('2018, 08, 16'),
        "close": 0.0066662698272400006
      }, {
        "date": new Date('2018, 08, 17'),
        "close": 0.0047658821602800003
      }, {
        "date": new Date('2018, 08, 18'),
        "close": 0.0066670624654800005
      }, {
        "date": new Date('2018, 08, 19'),
        "close": 0.0077832549870800004
      }, {
        "date": new Date('2018, 08, 20'),
        "close": 0.0087844865776
      }, {
        "date": new Date('2018, 08, 21'),
        "close": 0.0097822490909200004
      }, {
        "date": new Date('2018, 08, 22'),
        "close": 0.00778230225852
      }, {
        "date": new Date('2018, 08, 23'),
        "close": 0.005792759456
      }, {
        "date": new Date('2018, 08, 24'),
        "close": 0.0049792759456
      }, {
        "date": new Date('2018, 08, 25'),
        "close": 0.003792759456
      }
    ],
    '11dw1dc6d7272vd4c3b9bc41': [
      {
        "date": new Date('2018, 07, 20'),
        "close": 0.003863733336399995
      }, {
        "date": new Date('2018, 07, 21'),
        "close": 0.0016858158840599995
      }, {
        "date": new Date('2018, 07, 22'),
        "close": 0.0026892821663899997
      }, {
        "date": new Date('2018, 07, 23'),
        "close": 0.0026916759659099997
      }, {
        "date": new Date('2018, 07, 24'),
        "close": 0.0036860886021600004
      }, {
        "date": new Date('2018, 07, 25'),
        "close": 0.0046862122981600005
      }, {
        "date": new Date('2018, 07, 26'),
        "close": 0.0056883055328400006
      }, {
        "date": new Date('2018, 07, 27'),
        "close": 0.0066889292348900007
      }, {
        "date": new Date('2018, 07, 28'),
        "close": 0.0076994679478900005
      }, {
        "date": new Date('2018, 07, 29'),
        "close": 0.0081918703866800004
      }, {
        "date": new Date('2018, 07, 30'),
        "close": 0.0084916744050799997
      }, {
        "date": new Date('2018, 07, 31'),
        "close": 0.00858212111908
      }, {
        "date": new Date('2018, 08, 1'),
        "close": 0.00838272712788
      }, {
        "date": new Date('2018, 08, 2'),
        "close": 0.00778988938344
      }, {
        "date": new Date('2018, 08, 3'),
        "close": 0.00379071465844
      }, {
        "date": new Date('2018, 08, 4'),
        "close": 0.0027366349671999995
      }, {
        "date": new Date('2018, 08, 5'),
        "close": 0.00263874833216
      }, {
        "date": new Date('2018, 08, 6'),
        "close": 0.0036514954247200003
      }, {
        "date": new Date('2018, 08, 7'),
        "close": 0.0056503453315200004
      }, {
        "date": new Date('2018, 08, 8'),
        "close": 0.0066904522125200005
      }, {
        "date": new Date('2018, 08, 9'),
        "close": 0.0076432422535400003
      }, {
        "date": new Date('2018, 08, 10'),
        "close": 0.0086552015880000005
      }, {
        "date": new Date('2018, 08, 11'),
        "close": 0.00765743762904
      }, {
        "date": new Date('2018, 08, 12'),
        "close": 0.0056569937032400004
      }, {
        "date": new Date('2018, 08, 13'),
        "close": 0.00366253638032
      }, {
        "date": new Date('2018, 08, 14'),
        "close": 0.0056627657938200003
      }, {
        "date": new Date('2018, 08, 15'),
        "close": 0.0056659179475400003
      }, {
        "date": new Date('2018, 08, 16'),
        "close": 0.0066662698272400006
      }, {
        "date": new Date('2018, 08, 17'),
        "close": 0.0047658821602800003
      }, {
        "date": new Date('2018, 08, 18'),
        "close": 0.0066670624654800005
      }, {
        "date": new Date('2018, 08, 19'),
        "close": 0.0077832549870800004
      }, {
        "date": new Date('2018, 08, 20'),
        "close": 0.0087844865776
      }, {
        "date": new Date('2018, 08, 21'),
        "close": 0.0097822490909200004
      }, {
        "date": new Date('2018, 08, 22'),
        "close": 0.00778230225852
      }, {
        "date": new Date('2018, 08, 23'),
        "close": 0.005792759456
      }, {
        "date": new Date('2018, 08, 24'),
        "close": 0.0049792759456
      }, {
        "date": new Date('2018, 08, 25'),
        "close": 0.003792759456
      }
    ],
  }
}

initialState.historyData['6bdw1dc6d7272vd4c3b9bc41'] = initialState.historyData['6bdw1dc6d7272vd4c3b9bc41'].map(el => {
  return { date: el.date, close: Math.random() * 0.001 }
})

initialState.historyData['7bdw1dc6d7272vd4c3b9bc41'] = initialState.historyData['7bdw1dc6d7272vd4c3b9bc41'].map(el => {
  return { date: el.date, close: Math.random() * 0.001 }
})

initialState.historyData['8bdw1dc6d7272vd4c3b9bc41'] = initialState.historyData['8bdw1dc6d7272vd4c3b9bc41'].map(el => {
  return { date: el.date, close: Math.random() * 0.001 }
})

initialState.historyData['9bdw1dc6d7272vd4c3b9bc41'] = initialState.historyData['9bdw1dc6d7272vd4c3b9bc41'].map(el => {
  return { date: el.date, close: Math.random() * 0.001 }
})

initialState.historyData['11dw1dc6d7272vd4c3b9bc41'] = initialState.historyData['11dw1dc6d7272vd4c3b9bc41'].map(el => {
  return { date: el.date, close: Math.random() * 0.001 }
})

export const marketplace = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: state.products.concat(action.payload.data)
      };
    case GET_HISTORY_SUCCESS:
      const history = Utils.parseTradeHistory(action.payload.data.graph[0]);
      return {
        ...state,
        historyData: {
          ...state.historyData,
          [action.payload.data.productId]: history
        }
      };
    default:
      return state;
  }
}

export const getProducts = () => {
  return {
    type: GET_PRODUCTS,
    payload: {
      request: {
        method: 'GET',
        url: '/api/getproducts'
      }
    }
  };
}

export const tradeHistory = (data) => {
  return {
    type: GET_HISTORY,
    payload: {
      request: {
        method: 'POST',
        url: '/api/tradehistorygraph',
        data: data
      }
    }
  }
}
