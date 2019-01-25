/* 
Программа печати из одного PDF-файла протоколов защиты ГЭК на обеих сторонах листа и уведомления на одной стороне. 
Автор: Сергей Зайков 
Версия 2.0
*/
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
  if (check_version()) {
    var pages=new Array(this.numPages/step); // число документов для печати
    for(var i=0;i<this.numPages-this.numPages%step;i+=step) { //печатать с первой страницы и до последней страницы, кратной числу листов в группе страницы
      pages[i/step]=[i, i+step-2]; // печтать с первой страницы в группе страниц по предпоследнюю страницу в группе страниц
      } 
    var pp = this.getPrintParams(); // параметры принтера
    pp.DuplexType=pp.constants.duplexTypes.DuplexFlipLongEdge; // печать на обеих сторонах листа
    pp.interactive = pp.constants.interactionLevel.automatic; // не показывать окно печати
    pp.printRange=pages;
    this.print(pp); // вывод страниц на печать (отдельным заданием)
  }
}

/*
Печатает без переворота третью страницу из тройки страниц (уведомление).
*/
function list_of() {
  if (check_version()) {
    var pages=new Array(this.numPages/step); // число документов для печати
    for(var i=step-1;i<this.numPages;i+=step) { //печатать последней страницы во всех группах страниц
      pages[(i+1)/step-1]=[i, i]; //печать последней страницы в группе страниц
      //i+1 делает числитель равным step для целочисленного деления 
      //делится на step без остатка (получается целое число). 
      //Так как первое значение будет 1, оно уменьшается на 1.
      }
    var pp = this.getPrintParams(); // параметры принтера
    pp.DuplexType=pp.constants.duplexTypes.Simplex; // печать на одной стороне листа
    pp.interactive = pp.constants.interactionLevel.automatic; // не показывать окно печати
    pp.printRange=pages;
    this.print(pp); // вывод страниц на печать (отдельным заданием)
  }
}

/* Проверяет версию Acrobat */
function check_version()  {
  if (app.viewerVersion<11.0) { // Версия Акробата меньше 11.0
  app.alert("Требуется Acrobat не ниже 11 версии. У Вас версия "+app.viewerVersion);
  return false;
  }
  return true;
}