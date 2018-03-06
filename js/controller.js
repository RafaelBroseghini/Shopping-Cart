var shoppingCart = new Cart();

var view = new View(shoppingCart);
view._model.subscribe(view.redrawTable)



function clickedOn() {
  let ids = ["prodName","prodQty","prodPriority", "prodStore", "prodSection", "prodPrice"],
      id  = Math.random()*Math.random();
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
  console.log(this);
  this.parentElement.parentElement.classList.toggle("strike")
  var timeoutID;

  for(var product of shoppingCart.items) {
    if (product["_id"] == this.value) {
      product["_purchased"] = !product["_purchased"]
      if (product["_purchased"] === true) {
        startTimeOut(product)
      } else {
        clearTimeOut()
      }
    }
  }
}


function startTimeOut(param1) {
  timeoutID = window.setTimeout(callDeleteItem, 2000, param1);
}

function callDeleteItem(param1) {
  shoppingCart.deleteItem(param1)
}

function clearTimeOut() {
  window.clearTimeout(timeoutID);
}
