var dummyStores   = ["Walmart","Target","Cotsco","Price Chopper", "Quillins"],
    dummySections = ["Produce", "Canned Goods", "Fruits", "Meat", "Dairy", "Deli"];

//Instances of Model and View classes.
////////////////////////////////////
var shoppingCart = new Cart();

var view = new View(shoppingCart);
///////////////////////////////////


//Adds item to shoppingCart model.
function clickedOn() {
  let ids = ["prodName","prodQty","prodPriority", "prodStore", "prodSection", "prodPrice"],
      id  = Math.random()* Math.random();
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

//Crosses off row and after two seconds deletes row if purchased=true.
function checkedBox() {
  console.log(this);
  this.parentElement.parentElement.classList.toggle("strike")
  var timeoutID;

  for(var product of shoppingCart.items) {
    if (product["id"] == this.id) {
      product["_purchased"] = !product["_purchased"]
      if (product["_purchased"] === true) {
        startTimeOut(product)
      } else {
        clearTimeOut()
      }
    }
  }
}

//Function that waits two seconds and then calls model.deleteItem.
function startTimeOut(param1) {
  timeoutID = window.setTimeout(callDeleteItem, 2000, param1);
}

function callDeleteItem(param1) {
  shoppingCart.deleteItem(param1)
}

function clearTimeOut() {
  window.clearTimeout(timeoutID);
}

//Populate select dropdowns from js file.
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
