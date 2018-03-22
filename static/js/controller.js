var dummyStores   = ["Walmart","Target","Cotsco","Price Chopper",
                    "Quillins", "Fareway", "Publix", "CVS","Wallgreens"],

    dummySections = ["Produce", "Canned Goods", "Fruits", "Meat",
                    "Dairy", "Deli", "Health and Beauty","Cleaning Supplies",
                    "Home", "Dry Goods"];

var shoppingCart = new Cart();
var view = new View(shoppingCart);
var savelocal = new RemoteStorage(shoppingCart, "Cart")

function clickedOn() {
  let ids = ["prodName","prodQty","prodPriority", "prodStore", "prodSection", "prodPrice"];
  let vals = {}
  for(var i of ids){
    vals[i] = document.getElementById(i).value;
  }
  let item = new Item(vals.prodName, vals.prodQty,
                      vals.prodPriority, vals.prodStore,
                      vals.prodSection, vals.prodPrice);
  shoppingCart.addItem(item)
}

function emptyShoppingCart() {
  shoppingCart.emptyCart()
}

function sortList(col){
  let property = col.textContent.toLowerCase();
  shoppingCart.sortItems(property)
}

function populateSelect(id, arr) {
  let selectDropDown = document.getElementById(id)
  for(var opt of arr.sort()){
    let option = document.createElement("option")
    option.textContent = opt;
    selectDropDown.appendChild(option);
  }
}

populateSelect("prodStore", dummyStores)
populateSelect("prodSection", dummySections)
