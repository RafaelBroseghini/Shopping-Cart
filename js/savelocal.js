class LocalStorageSaver {
  constructor(model, lsname) {
    this.lsname = lsname;
    let self = this;

    model.subscribe(function(lst, msg){
      self.saveTolst(lst)
    })

    if (JSON.parse(localStorage.getItem(self.lsname))) {
      let saved_lst = JSON.parse(localStorage.getItem(self.lsname))
      console.log(saved_lst);
      for(let it of saved_lst){
        let newit = new Item(it.id, it.name,
          it.quantity, it.priority,
          it.store, it.section, it.price)

          model.addItem(newit)
        }
      }
  }

  saveTolst(lst) {
    let new_lst = JSON.stringify(lst.items)
    localStorage.setItem(this.lsname, new_lst)
  }
}
