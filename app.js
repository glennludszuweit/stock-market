class Stock {
  id = String;
  price = Number;

  history = [
    {
      date: Date,
      price: Number,
    },
  ];

  constructor(id, price) {
    this.id = id;
    this.price = Math.floor(Math.random() * 1000);
    this.history = [
      { date: new Date(), price: Math.random() * 1000 },
      { date: new Date(), price: Math.random() * 1000 },
    ]; // << this would be individual to each stock
  }
}

class BoughtStock extends Stock {
  boughtAt = 0;
  quantity = 0;

  constructor(id, quantity) {
    super(id);

    this.quantity = quantity;
    this.boughtAt = this.price;

    // replace this to use Portfolio::addBoughtStock
    PORTFOLIO.addBoughtStock(this);
    PORTFOLIO.recaclulateBalance();
  }
}

class Portfolio {
  // cash = 10000;
  // balance = 10000;

  constructor(cash, balance) {
    this.cash = cash;
    this.balance = balance;
    this.stocks = [];
  }

  addBoughtStock(boughtStock) {
    this.stocks.push(boughtStock);
    this.cash = this.cash - boughtStock.price * boughtStock.quantity;
  }

  recaclulateBalance() {
    // let accumulatedStockValue = 0;
    // this.stocks.forEach((stock) => {
    //   accumulatedStockValue += stock.quantity * stock.price;
    // });
    let accumulatedStockValue = this.stocks.reduce((acc, stock) => {
      return acc + stock.price * stock.quantity;
    }, 0);
    this.balance = this.cash + accumulatedStockValue;
  }
}

const PORTFOLIO = new Portfolio(10000, 10000);

let apple = new Stock('a', 500);
let spaceX = new Stock('b', 300);

let b1 = new BoughtStock('spaceX', 2);
let b2 = new BoughtStock('apple', 1);

console.log(PORTFOLIO);
