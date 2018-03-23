class RemoteStorage {
  constructor(model) {
    let self = this;

    model.subscribe(function(lst, msg){
      self.saveTolst(lst)
    })

    console.log("Get request.")

    fetch("/getlist").then(function(response){
      return response.json()
    })
    .then(function(data){
      self.addToModel(data, model)
      })
  }

  addToModel(data, model){
    for(let it of data){
      let newit = new Item(it.name,
            it.quantity, it.priority,
            it.store, it.section, it.price)

      model.addItem(newit)
    }
  }

  saveTolst(lst) {
    let config = {};
    config.method = "POST"
    config.body = JSON.stringify(lst.items)
    config.headers = {"Content-Type": "application/json",
                      "Accept": "application/json"}

    fetch("/savelist", config)
  }
}
