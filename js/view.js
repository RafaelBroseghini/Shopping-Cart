// var dummyStores   = ["Walmart","Target","Cotsco","Price Chopper", "Quillins"],
//     dummySections = ["Produce", "Canned Goods", "Fruits", "Meat", "Dairy", "Deli"];

class View {
  constructor(model) {
    this._model = model
  }

  colorByPriority() {
    let colorPriorities = document.querySelectorAll(".prioritize");

    for (let i of colorPriorities){
      if (i.textContent === "3") {
        i.parentElement.classList.add("alert-danger")
      } else if (i.textContent === "2") {
        i.parentElement.classList.add("alert-warning")
      } else {
        i.parentElement.classList.add("alert-success")
      }
      // } else if (i.textContent === "1"){
      //   i.parentElement.classList.add("alert-success")
      // }
    }
  }

  redrawTable(scope) {
    let form = document.querySelector("form")
    let tbBody = document.querySelector("#prodTableBody")

    tbBody.textContent = "";

    for(var product of scope._items){
      let row = document.createElement("tr")
      for(var property in product){
        if (property == "_purchased") {
          let rowCol = document.createElement("td")
          var cb = document.createElement("input")
          cb.type = 'checkbox'
          cb.onclick = checkedBox;
          rowCol.appendChild(cb)
          row.appendChild(rowCol)
        } else if (property == "_id") {
          cb.value = product[property]
          let rowCol = document.createElement("td")
          rowCol.className = "hidden"
          rowCol.textContent = product[property]
          row.appendChild(rowCol)
        } else if (property == "_priority") {
          let rowCol = document.createElement("td")
          rowCol.className = "prioritize"
          rowCol.textContent = product[property]
          row.appendChild(rowCol)
        }
          else {
          let rowCol = document.createElement("td")
          rowCol.textContent = product[property]
          row.appendChild(rowCol)
        }
      }
      tbBody.appendChild(row)
      view.colorByPriority();
      form.reset();
    }
  }
}

var view = new View(shoppingCart);


//subscribe to _model
view._model.subscribe(view.redrawTable)
