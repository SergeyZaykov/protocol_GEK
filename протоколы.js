var step =3; // число листов в группе страниц
// В Файл добавляется подменю "Печать для ГЭК"
app.addSubMenu({ cName: "GEK", cUser: "Печать для ГЭК", cParent: "File", nPos: 0 }); 
// В подменю "Печать для ГЭК" добавляются два пункта: "Печать протоколов на обеих сторонах" и "Печать уведомлений на одной стороне"
app.addMenuItem({ cName: "Protocol", cUser: "Печать протоколов на обеих сторонах", cParent: "GEK",
cExec: "protocol()",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});
app.addMenuItem({ cName: "List_of", cUser: "Печать уведомлений на одной стороне", cParent: "GEK",
cExec: "list_of()",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});


/*
Печатает с переворотом (на обеих сторонах листа) первую и вторую страницы (протокол ГЭК) из тройки страниц.
Страницу (пустую) в конце документа (некратную трем) не печатает.
*/
function protocol() {
  var pp = this.getPrintParams(); // параметры принтера
  pp.DuplexType=pp.constants.duplexTypes.DuplexFlipLongEdge; // печать на обеих сторонах листа
  pp.interactive = pp.constants.interactionLevel.automatic; // не показывать окно печати
  for(var i=0;i<this.numPages-this.numPages%step;i+=step) { //печатать с первой страницы и до последней страницы, кратной числу листов в группе страницы
    pp.firstPage=i;  // печтать с первой страницы в группе страниц
    pp.lastPage=i+step-2; // по предпоследнюю страницу в группе страниц
    this.print(pp); // вывод страниц на печать (отдельным заданием)
    } 

}

/*
Печатает без переворота третью страницу из тройки страниц (уведомление).
*/
function list_of() {
  var pp = this.getPrintParams(); // параметры принтера
  pp.DuplexType=pp.constants.duplexTypes.Simplex; // печать на одной стороне листа
  pp.interactive = pp.constants.interactionLevel.automatic; // не показывать окно печати
  for(var i=step-1;i<this.numPages;i+=step) { //печатать последней страницы во всех группах страниц
    pp.firstPage=i;  //печать последней страницы в группе страниц
    pp.lastPage=i;
    this.print(pp); // вывод страницы на печать (отдельным заданием)
    } 
}

