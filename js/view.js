
class View {
  constructor(model) {
    //Subscribe to shoppingCart model passing redrawTable.
    //Every time that a change is made to the model
    //the view calls functions in models handlers, which in
    //this case redraws the table.
    model.subscribe(this.redrawTable.bind(this))
  }

  makeRow(it) {
      let row = document.createElement("tr")
      row.className = it["priority"]

      let rowCol = document.createElement("td")
      let cb = document.createElement("input")
      cb.type = "checkbox"
      cb.onclick = checkedBox;
      cb.id = it["id"];


      rowCol.appendChild(cb)
      row.appendChild(rowCol)
      
      if (it.purchased) {
        cb.checked = true;
        row.className = "strike"
      }

      var interestedIds = ["name","quantity", "store", "section", "price"];

      for(var property of interestedIds){
        let rowCol = document.createElement("td")
        rowCol.textContent = it[property]
        row.appendChild(rowCol)
      }
      return row
  }

  addRow(parent, child) {
    parent.appendChild(child)
  }

  redrawTable(shoppingCart, msg) {
    let form = document.querySelector("form")
    let tbBody = document.querySelector("#prodTableBody")

    tbBody.textContent = "";

    for(var product of shoppingCart.items){
      this.addRow(tbBody, this.makeRow(product))
    }
    form.reset();
  }
}
