var step =3; // число листов в группе страницы
app.addSubMenu({ cName: "GEK", cUser: "Печать для ГЭК", cParent: "File", nPos: 0 });
app.addMenuItem({ cName: "Protocol", cUser: "Печать протоколов на обеих сторонах", cParent: "GEK",
cExec: "protocol()",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});

app.addMenuItem({ cName: "List_of", cUser: "Печать приложений на одной стороне", cParent: "GEK",
cExec: "list_of()",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});


/*Печатает с переворотом первую и вторую страницы из тройки страниц */
function protocol() {
  var pp = this.getPrintParams(); // параметры принтера
  pp.DuplexType=pp.constants.duplexTypes.DuplexFlipLongEdge;
  pp.interactive = pp.constants.interactionLevel.automatic;
  for(var i=0;i<this.numPages;i+=step) {
    pp.firstPage=i;
    pp.lastPage=i+step-2;
    this.print(pp);
    } 

}

/*Печатает без переворота третью страницу из тройки страниц */
function list_of() {
  var pp = this.getPrintParams(); // параметры принтера
  pp.DuplexType=pp.constants.duplexTypes.Simplex;
  pp.interactive = pp.constants.interactionLevel.automatic;
  for(var i=step-1;i<this.numPages;i+=step) {
    pp.firstPage=i;
    pp.lastPage=i;
    this.print(pp);
    } 
}

