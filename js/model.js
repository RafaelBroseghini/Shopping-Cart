"use strict"

class Subject {
  constructor() {
    this._handlers = [];
  }

  subscribe(fn) {
    this._handlers.push(fn);
  }

  publish(msg, someobj){
    var scope = someobj || window;

    for (let fn of this._handlers){
      console.log(msg);
      fn(scope, msg)
    }
  }
}


// Item/Product Model.
class Item {
  constructor(id, name, quantity, priority, store, section, price) {
    this._purchased = false;

    this._id       = id;
    this.name      = name;
    this.quantity  = quantity;
    this.priority  = priority;
    this.store     = store;
    this.section   = section;
    this.price     = price;

  }
}

// Shopping Cart Model.
class Cart extends Subject {
  constructor() {
    super()
    this.items = [];
    this.oldItems = [];
  }

  addItem(elem) {
    this.items.push(elem)
    this.publish("Added Item", this)
  }

  deleteItem(elem) {
    this.items.splice(this.items.indexOf(elem), 1)
    this.publish("Deleted Item", this)
  }
}

// var shoppingCart = new Cart();
