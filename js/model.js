"use strict"
class Subject {
  constructor() {
    this.handlers = [];
  }

  subscribe(fn) {
    this.handlers.push(fn);
  }

  publish(msg, someobj){
    var scope = someobj || window;

    for (let fn of this.handlers){
      console.log(msg);
      fn(scope, msg)
    }
  }
}


// Item/Product Model.
class Item extends Subject {
  constructor(id, name, quantity, priority, store, section, price) {
    super()

    this._purchased = false;

    this.id        = id;
    this.name      = name;
    this.quantity  = Number(quantity);
    this.priority  = priority;
    this.store     = store;
    this.section   = section;
    this.price     = Number(price);

  }

  get purchased() {
    return this._purchased;
  }

  set purchased(nv) {
    this._purchased = nv
  }

}

// Shopping Cart Model.
class Cart extends Subject {
  constructor() {
    super()
    this.items = [];
    this.oldItems = [];
  }

  addItem(it) {
    if (localStorage.getItem("Cart") == null) {
      this.items.push(it)
      let stringified = JSON.stringify(this.items)
      localStorage.setItem("Cart",stringified)
    } else {
      var temp = JSON.parse(localStorage.getItem("Cart"));
      this.items = [];

      for(var prod of temp){
        var newit = new Item(prod.id, prod.name,
                             prod.quantity, prod.priority,
                             prod.store, prod.section, prod.price)

        this.items.push(newit)
      }

      this.items.push(it)
      let stringified = JSON.stringify(this.items)
      localStorage.setItem("Cart",stringified)
    }
    //Publish calls fns in models handlers and passes msg.
    this.publish("Added Item", this)
  }

  deleteItem(it) {
    let idx = this.items.indexOf(it)
    this.items.splice(idx, 1)

    let stringified = JSON.stringify(this.items)
    localStorage.setItem("Cart",stringified)

    this.publish("Deleted Item", this)
  }

  showCart() {
    if (localStorage.getItem("Cart") !== null) {

      var temp = JSON.parse(localStorage.getItem("Cart"));
      this.items = [];

      for(var prod of temp){
        var newit = new Item(prod.id, prod.name,
          prod.quantity, prod.priority,
          prod.store, prod.section, prod.price)

          this.items.push(newit)
        }

        let stringified = JSON.stringify(this.items)
        localStorage.setItem("Cart",stringified)
        this.publish("Displaying Cart", this)
    }
  }

  sortItems(property) {
    if (typeof(this.items[0][property]) == "string") {
      this.items.sort(function(a,b) {
        a = a[property].toLowerCase();
        b = b[property].toLowerCase();
        if( a == b) return 0;
        return b < a ? -1 : 1;
      });
    } else {
      this.items.sort(function(a, b){
        return b[property] - a[property]
      })
    }
    this.publish("Sorted Items", this)
  }
}
