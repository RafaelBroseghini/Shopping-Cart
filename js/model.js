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
class Item {
  constructor(id, name, quantity, priority, store, section, price) {
    this._purchased = false;

    this.id        = id;
    this.name      = name;
    this.quantity  = quantity;
    this.priority  = priority;
    this.store     = store;
    this.section   = section;
    this.price     = price;

  }

  get purchased() {
    return this._purchased
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

  addItem(elem) {
    this.items.push(elem)
    //Publish calls fns in models handlers and passes msg.
    this.publish("Added Item", this)
  }

  deleteItem(elem) {
    let idx = this.items.indexOf(elem)
    this.items.splice(idx, 1)
    this.publish("Deleted Item", this)
  }
}

// var shoppingCart = new Cart();
