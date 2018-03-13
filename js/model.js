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
    if (this._purchased == false) {
      this._purchased = nv
      this.publish("Will remove this Item.",this)
    } else {
      this._purchased = false;
      clearTimeout(this.to)
      this.publish("Did not remove this Item.", this)
    }
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
    this.items.push(it)
    let self = this;
    it.subscribe(function(a,b) {
      self.publish('Countdown 2s.', self)
      if(it.purchased == true) {
        it.to = setTimeout(function() {
            self.deleteItem(it);
        }, 2000)
      }
    });
    //Publish calls fns in models handlers and passes msg.
    this.publish("Added Item", this)
  }

  deleteItem(it) {
    let idx = this.items.indexOf(it)
    this.items.splice(idx, 1)
    this.publish("Deleted Item", this)
  }

  emptyCart() {
    this.items = []
    this.publish("Empty Cart", this)
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
