var pName     = document.querySelector("#prodName"),
    qty       = document.querySelector("#prodQty"),
    priority  = document.querySelector("#prodPriority"),
    store     = document.querySelector("#prodStore"),
    section   = document.querySelector("#prodSection"),
    price     = document.querySelector("#prodPrice"),
    tbBody    = document.querySelector("#prodTableBody"),
    form      = document.querySelector("form");

// var properties = [pName, store, section, qty, price, priority];

var allProducts = [];

var dummyStores   = ["Walmart","Target","Cotsco","Price Chopper", "Quillins"],
    dummySections = ["Produce", "Canned Goods", "Fruits", "Meat", "Dairy", "Deli"]

var prioritiesObj = {"1":"Low", "2":"Medium", "3":"High"};


addOptionsToDropdown(dummyStores, store);
addOptionsToDropdown(dummySections, section);

// Adding Items to the list.

function add2List() {
  tbBody.innerHTML = "";
  allProducts.push({checkBox:"", productName:pName.value, productStore: store.value, productSection: section.value,
                    productQty: qty.value, productPrice: price.value, productPriority: priority.value, id:allProducts.length,
                   });
  sortByPriority();
  createAndPopulateTableElements();
  addClickToIcons();
  deleteFromList();
  colorByPriority();
  form.reset();
}


function appendChildToParent(parent, child) {
  return parent.appendChild(child)
}


// Refactor this.

// Create the List.

function createAndPopulateTableElements(){
  for (var object of allProducts) {
    var tbRow = document.createElement("tr");
    tbBody.appendChild(tbRow);

    for(var key in object){
      var td = document.createElement('td')
      if (key === "checkBox") {
        checkCircleIcon = document.createElement("i")
        td.className = "checkOff"
        checkCircleIcon.className = "far fa-check-circle"
        appendChildToParent(td, checkCircleIcon)
        appendChildToParent(tbRow, td)
      } else if (key === "id") {
        trashIcon = document.createElement("i");
        td.className = "deleteFromTable";
        td.value = object[key]
        trashIcon.className = "far fa-trash-alt"
        appendChildToParent(td, trashIcon)
        appendChildToParent(tbRow, td)
      } else {
        if (key === "productPriority") {
          td.className = "prioritize"
        }
        td.textContent = object[key];
        tbRow.appendChild(td);
      }
    }
  }
}

// Delete from the list.

function deleteFromList() {
  let allTrashes = document.querySelectorAll(".deleteFromTable")

  for (var icon of allTrashes){
    icon.addEventListener("click", function(){
      let parent = this.parentElement;
      for (var p of allProducts){
        for(var properties in p){
          if (properties === "id" && p["id"] === this.value) {
            allProducts.splice(allProducts.indexOf(p),1)
            }
          }
        }
        parent.parentElement.removeChild(parent)
      })
  }
}

// Add linethrough functionality to check circles.

function addClickToIcons(){
  var allCheckCircles = document.querySelectorAll(".checkOff")
  for (var icon of allCheckCircles){
    icon.addEventListener('click', function(){
      this.parentElement.classList.toggle("strike")
    })
    }
}

// Sort items on list by priority.
function sortByPriority() {
  allProducts.sort(function(a,b){
    return b.productPriority - a.productPriority
  })
}

// Colors items on shopping list by priority.
function colorByPriority() {
  let colorPriorities = document.querySelectorAll(".prioritize");

  for (let i of colorPriorities){
    if (i.textContent === "3") {
      i.textContent = prioritiesObj[i.textContent]
      i.parentElement.classList.toggle("bg-danger")
    } else if (i.textContent === "2") {
      i.textContent = prioritiesObj[i.textContent]
      i.parentElement.classList.toggle("bg-warning")
    } else if (i.textContent === "1"){
      i.textContent = prioritiesObj[i.textContent]
      i.parentElement.classList.toggle("bg-success")
    }
  }
}

// Populates the dropdown menus with content from global array.
function addOptionsToDropdown(arr, parentNode) {
  for (let choice of arr){
    let optionCreated = document.createElement("option");
    optionCreated.textContent = choice;
    parentNode.appendChild(optionCreated);
  }
}
