/* 
��������� ������ �� ������ PDF-����� ���������� ������ ��� �� ����� �������� ����� � ����������� �� ����� �������. 
�����: ������ ������ 
������ 2.1
*/
var step = 3; // ����� ������ � ������ �������
// � ���� ����������� ������� "������ ��� ���"
app.addSubMenu({ cName: "GEK", cUser: "������ ��� ���", cParent: "File", nPos: 0 }); 
// ��� ������ ����������
app.addMenuItem({cName: "all_Protocol", cUser: "�������� ��� ���������", cParent: "GEK", cExec: "VKR_print(this, 0, this.numPages, 0)", cEnable: "event.rc = (event.target != null);"});
app.addMenuItem({cName: "end_print", cUser: "���������� � �������� ��������� �� ����������", cParent: "GEK", cExec: "VKR_print(this, this.pageNum, this.numPages, 0)", cEnable: "event.rc = (event.target != null);"});
app.addMenuItem({cName: "cur_print", cUser: "���������� ������� ��������", cParent: "GEK", cExec: "VKR_print(this, this.pageNum, (parseInt(this.pageNum / step) + 1) * step, 0)", cEnable: "event.rc = (event.target != null);"});
// ����������� ����
app.addMenuItem({cName:"-", cParent:"GEK", cExec:" "}); 
// ��� ������ �����������
app.addMenuItem({cName: "all_List_of", cUser: "�������� ��� �����������", cParent: "GEK", cExec: "VKR_print(this, 0, this.numPages, 11)", cEnable: "event.rc = (event.target != null);"});
app.addMenuItem({cName: "end_List_of", cUser: "���������� � �������� ���������� �� ����������", cParent: "GEK", cExec: "VKR_print(this, this.pageNum, this.numPages, 11)", cEnable: "event.rc = (event.target != null);"});
app.addMenuItem({cName: "cur_List_of", cUser: "���������� ������� �����������", cParent: "GEK", cExec: "VKR_print(this, this.pageNum, (parseInt(this.pageNum / step) + 1) * step, 11)", cEnable: "event.rc = (event.target != null);"});

// Check if a string consists of the digit characters (0-9)
// https://gist.github.com/Alex1990/af34154bf90e904ff949
function isDigit(str) {
    return str && !/[^\d]/.test(str);
}

/*
�������� �� ������� ����� ���������� � ����������� �������� ��������� ��� �����������.
��� what == 0:
�������� � ����������� (�� ����� �������� �����) ������ � ������ �������� (�������� ���) �� ������ �������.
�������� (������) � ����� ��������� (��������� ����) �� ��������.
��� what != 0:
�������� ��� ���������� ������ �������� �� ������ ������� (�����������).
���������:
start_page - ������ ��������, ��������� �� ����. ����� �� ���� ������ ��������� � ������ �������, ����� ���������.
end_page - ��������� ��������, ��������� �� �������. ����� �� ���� ��������� ��������� � ������ �������, ����� ���������.
what - ��� ��������: 0 - ���������, �� 0 - �����������.
*/
function VKR_print(doc, start_page, end_page, what) {
  // �������� ������ ��������
  if (check_version()) {  // ������ ��� ������ ������
    //����������� ������ ��������, ������� ����������. ������������� � ����. ��� ������ �������� � ������ �������.
    var virt_start_page = parseInt(start_page / step) * step; 
    //����������� ��������� ��������, ������� ����������. ������������� � �������. ���������� ��������, ������� �� ������ � ��������� ������ �������.
    var virt_end_page = end_page - end_page % step;
    // ������ ������� ��������� ������� �������. 
    var pages = new Array((virt_end_page - virt_start_page) / step);
    // ����������� ������� ������� ������� ��� ������ ��������� ������� �������
    for(var i=virt_start_page; i<virt_end_page; i+=step) { //�������� � ��������� �������� � �� ��������� ��������, ������� ����� ������ � ������ ��������
        pages[(i-virt_start_page)/step] = ((what == 0) ? [i, i+step-2]: [i+step-1, i+step-1]); // �������� � ������ �������� � ������ ������� �� ������������� �������� � ������ ������� ��� ������ ��������� �������� � ������ �������
    } 
    // ������� ���������� ������
    var pp = doc.getPrintParams(); // ��������� ��������� ������ � ����������
    pp.DuplexType = ((what == 0) ? pp.constants.duplexTypes.DuplexFlipLongEdge : pp.constants.duplexTypes.Simplex); // ������ ������ �� ����� �������� ����� ��� �� ����� ������� �����
    pp.interactive = pp.constants.interactionLevel.automatic; // �� ���������� ���� ������
    pp.printRange = pages;  //  ������� ��������� ������� �������
    // ������� �������� �� ������ (����� ��������)
    doc.print(pp); 
  } else {
    app.alert("��������� Acrobat �� ���� 11 ������. � ��� ������ "+app.viewerVersion);
  }
}


/* ��������� ������ Acrobat */
function check_version()  {
  return !app.viewerVersion<11.0  // ������ �������� ������ 11.0
}