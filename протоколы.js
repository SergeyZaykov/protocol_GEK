/* 
Программа печати из одного PDF-файла протоколов защиты ГЭК на обеих сторонах листа и уведомления на одной стороне. 
Автор: Сергей Зайков 
Версия 2.1
*/
var step = 3; // число листов в группе страниц
// В Файл добавляется подменю "Печать для ГЭК"
app.addSubMenu({ cName: "GEK", cUser: "Печать для ГЭК", cParent: "File", nPos: 0 }); 
// Для печати протоколов
app.addMenuItem({cName: "all_Protocol", cUser: "Печатать все протоколы", cParent: "GEK", cExec: "VKR_print(this, 0, this.numPages, 0)", cEnable: "event.rc = (event.target != null);"});
app.addMenuItem({cName: "end_print", cUser: "Напечатать с текущего протокола до последнего", cParent: "GEK", cExec: "VKR_print(this, this.pageNum, this.numPages, 0)", cEnable: "event.rc = (event.target != null);"});
app.addMenuItem({cName: "cur_print", cUser: "Напечатать текущий протокол", cParent: "GEK", cExec: "VKR_print(this, this.pageNum, (parseInt(this.pageNum / step) + 1) * step, 0)", cEnable: "event.rc = (event.target != null);"});
// разделитель меню
app.addMenuItem({cName:"-", cParent:"GEK", cExec:" "}); 
// Для печати уведомлений
app.addMenuItem({cName: "all_List_of", cUser: "Печатать все уведомления", cParent: "GEK", cExec: "VKR_print(this, 0, this.numPages, 11)", cEnable: "event.rc = (event.target != null);"});
app.addMenuItem({cName: "end_List_of", cUser: "Напечатать с текущего уведомлени до последнего", cParent: "GEK", cExec: "VKR_print(this, this.pageNum, this.numPages, 11)", cEnable: "event.rc = (event.target != null);"});
app.addMenuItem({cName: "cur_List_of", cUser: "Напечатать текущее уведомление", cParent: "GEK", cExec: "VKR_print(this, this.pageNum, (parseInt(this.pageNum / step) + 1) * step, 11)", cEnable: "event.rc = (event.target != null);"});

// Check if a string consists of the digit characters (0-9)
// https://gist.github.com/Alex1990/af34154bf90e904ff949
function isDigit(str) {
    return str && !/[^\d]/.test(str);
}

/*
Печатает из единого файла протоколов и уведомлений отдельно протоколы или уведомления.
При what == 0:
Печатает с переворотом (на обеих сторонах листа) первую и вторую страницы (протокол ГЭК) из тройки страниц.
Страницу (пустую) в конце документа (некратную трем) не печатает.
При what != 0:
Печатает без переворота третью страницу из тройки страниц (уведомление).
Аргументы:
start_page - первая страница, считается от нуля. Может не быть первой страницей в тройке страниц, будет выровнена.
end_page - последняя страница, считается от единицы. Может не быть последней страницей в тройке страниц, будет выровнена.
what - что печатать: 0 - протоколы, не 0 - уведомления.
*/
function VKR_print(doc, start_page, end_page, what) {
  // проверка версии Акробата
  if (check_version()) {  // годная для работы версия
    //фактическая первая страница, которая печатается. Отсчитывается с нуля. Это первая страница в тройке страниц.
    var virt_start_page = parseInt(start_page / step) * step; 
    //фактическая последняя страница, которая печатается. Отсчитывается с единицы. Отрезаются страницы, которые не входят в последнюю тройку страниц.
    var virt_end_page = end_page - end_page % step;
    // массив страниц множества наборов страниц. 
    var pages = new Array((virt_end_page - virt_start_page) / step);
    // составление массива номеров страниц для печати множества наборов страниц
    for(var i=virt_start_page; i<virt_end_page; i+=step) { //печатать с начальной страницы и до последней страницы, кратной числу листов в тройке страницы
        pages[(i-virt_start_page)/step] = ((what == 0) ? [i, i+step-2]: [i+step-1, i+step-1]); // печатать с первой страницы в группе страниц по предпоследнюю страницу в тройке страниц или печать последней страницы в тройке страниц
    } 
    // задание параметров печати
    var pp = doc.getPrintParams(); // прочитать параметры печати в переменную
    pp.DuplexType = ((what == 0) ? pp.constants.duplexTypes.DuplexFlipLongEdge : pp.constants.duplexTypes.Simplex); // задать печать на обеих сторонах листа или на одной стороне листа
    pp.interactive = pp.constants.interactionLevel.automatic; // не показывать окно печати
    pp.printRange = pages;  //  указать множества наборов страниц
    // вывести страницы на печать (одним заданием)
    doc.print(pp); 
  } else {
    app.alert("Требуется Acrobat не ниже 11 версии. У Вас версия "+app.viewerVersion);
  }
}


/* Проверяет версию Acrobat */
function check_version()  {
  return !app.viewerVersion<11.0  // Версия Акробата меньше 11.0
}