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
    this._purchased = false
    this._id        = id
    this._name      = name
    this._quantity  = quantity
    this._priority  = priority
    this._store     = store
    this._section   = section
    this._price     = price
  }
}

// Shopping Cart Model.
class Cart extends Subject {
  constructor() {
    super()
    this._items = [];
  }

  addItem(elem) {
    this._items.push(elem)
    this.publish("Added Item", this)
  }

  deleteItem(elem) {
    this._items.splice(this._items.indexOf(elem), 1)
    this.publish("Deleted Item", this)
  }
}

var shoppingCart = new Cart();
