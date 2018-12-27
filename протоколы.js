var step =3; // ����� ������ � ������ ��������
app.addSubMenu({ cName: "GEK", cUser: "������ ��� ���", cParent: "File", nPos: 0 });
app.addMenuItem({ cName: "Protocol", cUser: "������ ���������� �� ����� ��������", cParent: "GEK",
cExec: "protocol()",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});

app.addMenuItem({ cName: "List_of", cUser: "������ ���������� �� ����� �������", cParent: "GEK",
cExec: "list_of()",
cEnable: "event.rc = (event.target != null);",
nPos: 0
});


/*�������� � ����������� ������ � ������ �������� �� ������ ������� */
function protocol() {
  var pp = this.getPrintParams(); // ��������� ��������
  pp.DuplexType=pp.constants.duplexTypes.DuplexFlipLongEdge;
  pp.interactive = pp.constants.interactionLevel.automatic;
  for(var i=0;i<this.numPages;i+=step) {
    pp.firstPage=i;
    pp.lastPage=i+step-2;
    this.print(pp);
    } 

}

/*�������� ��� ���������� ������ �������� �� ������ ������� */
function list_of() {
  var pp = this.getPrintParams(); // ��������� ��������
  pp.DuplexType=pp.constants.duplexTypes.Simplex;
  pp.interactive = pp.constants.interactionLevel.automatic;
  for(var i=step-1;i<this.numPages;i+=step) {
    pp.firstPage=i;
    pp.lastPage=i;
    this.print(pp);
    } 
}

