var dummyStores   = ["Walmart","Target","Cotsco","Price Chopper", "Quillins"],
    dummySections = ["Produce", "Canned Goods", "Fruits", "Meat", "Dairy", "Deli"];

var lastNumber = 0;
function randomNumber() {
    var getRandomNumber = Math.random();
    if(getRandomNumber != lastNumber){
      return getRandomNumber
        lastNumber = getRandomNumber;
    } else{
        randomNumber();
    }
};


var shoppingCart = new Cart();
var view = new View(shoppingCart);
var savelocal = new LocalStorageSaver(shoppingCart, "Cart")

function clickedOn() {
  let ids = ["prodName","prodQty","prodPriority", "prodStore", "prodSection", "prodPrice"],
      id  = randomNumber();
  let vals = {}
  for(var i of ids){
    vals[i] = document.getElementById(i).value;
  }
  vals["id"] = id;
  let item = new Item(vals.id, vals.prodName, vals.prodQty,
                      vals.prodPriority, vals.prodStore,
                      vals.prodSection, vals.prodPrice);
  console.log("clicked");
  shoppingCart.addItem(item)
}

function showShoppingCart() {
  shoppingCart.showCart()
}

function checkedBox() {
  this.parentElement.parentElement.classList.toggle("strike")
  var timeoutID;

  for(var product of shoppingCart.items) {
    if (product["id"] == this.id) {
      product.purchased = !product.purchased
      if (product.purchased === true) {
        startTimeOut(product)
      } else {
        clearTimeOut()
      }
    }
  }
}

function sortList(col){
  let property = col.textContent.toLowerCase();
  shoppingCart.sortItems(property)
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

function populateSelect(id, arr) {
  let selectDropDown = document.getElementById(id)
  for(var opt of arr){
    let option = document.createElement("option")
    option.textContent = opt;
    selectDropDown.appendChild(option);
  }
}

populateSelect("prodStore", dummyStores)
populateSelect("prodSection", dummySections)
