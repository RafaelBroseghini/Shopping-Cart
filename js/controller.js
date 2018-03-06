// var shoppingCart = new Cart();


function clickedOn() {
  let ids = ["prodName","prodQty","prodPriority", "prodStore", "prodSection", "prodPrice"],
      id  = shoppingCart.items.length;

  let vals = {}

  for(var i of ids){
    vals[i] = document.getElementById(i).value;
  }

  vals["id"] = id;

  let item = new Item(vals.id, vals.prodName, vals.prodQty,
                      vals.prodPriority, vals.prodStore,
                      vals.prodSection, vals.prodPrice);
  shoppingCart.addItem(item)
}

function checkedBox() {
  this.parentElement.parentElement.classList.toggle("strike")
  var timeoutID;

  for(var product of shoppingCart.items) {
    for(var property in product) {
      if (property === "_id") {
        if (product[property] == this.value) {
          product["_purchased"] = !product["_purchased"]
          if (product["_purchased"] === true) {
            startTimeOut(product)
          } else {
            clearTimeOut()
          }
        }
      }
    }
  }
}


function startTimeOut(param1) {
  timeoutID = window.setTimeout(callDeleteItem, 2000, param1);
}

function callDeleteItem() {
  shoppingCart.deleteItem()
}

function clearTimeOut() {
  window.clearTimeout(timeoutID);
}
