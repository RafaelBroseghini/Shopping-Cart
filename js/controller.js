
function clickedOn() {
  let name      = document.querySelector("#prodName").value,
      qty       = document.querySelector("#prodQty").value,
      priority  = document.querySelector("#prodPriority").value,
      store     = document.querySelector("#prodStore").value,
      section   = document.querySelector("#prodSection").value,
      price     = document.querySelector("#prodPrice").value,
      id        = shoppingCart._items.length;

  const item = new Item(id, name, qty, priority, store, section, price);
  shoppingCart.addItem(item)
  // view.add2List(item)
}

function checkedBox() {
  this.parentElement.parentElement.classList.toggle("strike")
  var timeoutID;

  for(var product of shoppingCart._items) {
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
