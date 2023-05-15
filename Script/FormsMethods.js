function GetPartialView(Url, Container) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            debugger;
            document.getElementById(Container).innerHTML = this.responseText;
        }
    };

    request.open('GET', (ApplicationUrl + Url), true);
    request.send();
}

function RenderPartialViewModal(Url, Success = null) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('_ModalContent').innerHTML = this.responseText;
            $('#_Modal').modal('show');
            if (Success != null) {
                window[Success]();
            }
        }
    };
    request.open('GET', (ApplicationUrl + Url), true);
    request.send();
}

function GetResponseString(Url, Success) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window[Success](this.responseText);
        }
    };
    request.open('GET', (ApplicationUrl + Url), true);
    request.send();
}




function RegisterDateTimepicker() {
    $('.form-control.DatePicker').datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        orientation: "bottom auto"
    });
}

/*
        DropDownList
*/

var DropDownList = function (ID) {
    this.DDL = document.getElementById(ID);
    this.SelectedIndex = this.DDL.selectedIndex;
    if (this.SelectedIndex > -1) {
        this.SelectedValue = this.DDL.options[this.SelectedIndex].value;
        this.SelectedText = this.DDL.options[this.SelectedIndex].text;
    }
    else {
        this.SelectedValue = null;
        this.SelectedText = null;
    }

}

DropDownList.prototype.Add = function (Value, Display) {
    var Count = this.DDL.options.length;
    this.DDL.options[Count] = new Option(Display, Value);
}

DropDownList.prototype.AddRange = function (SelectList, Value, Display) {
    if (SelectList.hasOwnProperty('length')) {
        for (var Index = 0; Index < SelectList.length; Index++) {
            var Count = this.DDL.options.length;
            this.DDL.options[Count] = new Option(SelectList[Index][Display], SelectList[Index][Value]);
        }
    }
}
/**/
DropDownList.prototype.AddRangeFromRequest = function (Url, Value, Display, Default) {

    var DDL_Id = this.DDL.id;
    document.getElementById(DDL_Id).options.length = 0;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            var SelectList = JSON.parse(this.responseText);
            if (SelectList.hasOwnProperty('length')) {
                var DDL = document.getElementById(DDL_Id);
                if (Default != '') {
                    DDL.options[0] = new Option(Default, '');
                }
                for (var Index = 0; Index < SelectList.length; Index++) {
                    var Count = DDL.options.length;
                    DDL.options[Count] = new Option(SelectList[Index][Display], SelectList[Index][Value]);
                }
                
                if (Default == '') {
                    DDL.selectedIndex = "0";
                }
            }
        }
    };
    request.open('GET', (ApplicationUrl + Url), true);
    request.send();
}
/**/


DropDownList.prototype.Clear = function () {
    this.DDL.options.length = 0;
}


function GetOffSet(Element) {
    var _x = 0;
    var _y = 0;
    while (Element && !isNaN(Element.offsetLeft) && !isNaN(Element.offsetTop)) {
        _x += Element.offsetLeft - Element.scrollLeft;
        _y += Element.offsetTop - Element.scrollTop;
        Element = Element.offsetParent;
    }
    return { Top: _y, Left: _x };
}