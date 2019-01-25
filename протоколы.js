/* 
��������� ������ �� ������ PDF-����� ���������� ������ ��� �� ����� �������� ����� � ����������� �� ����� �������. 
�����: ������ ������ 
������ 2.0
*/
var step =3; // ����� ������ � ������ �������
// � ���� ����������� ������� "������ ��� ���"
app.addSubMenu({ cName: "GEK", cUser: "������ ��� ���", cParent: "File", nPos: 0 }); 
// � ������� "������ ��� ���" ����������� ��� ������: "������ ���������� �� ����� ��������" � "������ ����������� �� ����� �������"
app.addMenuItem({ cName: "Protocol", cUser: "������ ���������� �� ����� ��������", cParent: "GEK",
cExec: "protocol()",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});
app.addMenuItem({ cName: "List_of", cUser: "������ ����������� �� ����� �������", cParent: "GEK",
cExec: "list_of()",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});


/*
�������� � ����������� (�� ����� �������� �����) ������ � ������ �������� (�������� ���) �� ������ �������.
�������� (������) � ����� ��������� (��������� ����) �� ��������.
*/
function protocol() {
  if (check_version()) {
    var pages=new Array(this.numPages/step); // ����� ���������� ��� ������
    for(var i=0;i<this.numPages-this.numPages%step;i+=step) { //�������� � ������ �������� � �� ��������� ��������, ������� ����� ������ � ������ ��������
      pages[i/step]=[i, i+step-2]; // ������� � ������ �������� � ������ ������� �� ������������� �������� � ������ �������
      } 
    var pp = this.getPrintParams(); // ��������� ��������
    pp.DuplexType=pp.constants.duplexTypes.DuplexFlipLongEdge; // ������ �� ����� �������� �����
    pp.interactive = pp.constants.interactionLevel.automatic; // �� ���������� ���� ������
    pp.printRange=pages;
    this.print(pp); // ����� ������� �� ������ (��������� ��������)
  }
}

/*
�������� ��� ���������� ������ �������� �� ������ ������� (�����������).
*/
function list_of() {
  if (check_version()) {
    var pages=new Array(this.numPages/step); // ����� ���������� ��� ������
    for(var i=step-1;i<this.numPages;i+=step) { //�������� ��������� �������� �� ���� ������� �������
      pages[(i+1)/step-1]=[i, i]; //������ ��������� �������� � ������ �������
      //i+1 ������ ��������� ������ step ��� �������������� ������� 
      //������� �� step ��� ������� (���������� ����� �����). 
      //��� ��� ������ �������� ����� 1, ��� ����������� �� 1.
      }
    var pp = this.getPrintParams(); // ��������� ��������
    pp.DuplexType=pp.constants.duplexTypes.Simplex; // ������ �� ����� ������� �����
    pp.interactive = pp.constants.interactionLevel.automatic; // �� ���������� ���� ������
    pp.printRange=pages;
    this.print(pp); // ����� ������� �� ������ (��������� ��������)
  }
}

/* ��������� ������ Acrobat */
function check_version()  {
  if (app.viewerVersion<11.0) { // ������ �������� ������ 11.0
  app.alert("��������� Acrobat �� ���� 11 ������. � ��� ������ "+app.viewerVersion);
  return false;
  }
  return true;
}