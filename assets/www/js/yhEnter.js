/**
 * Created by Administrator on 2014/4/2.
 */

var serverPath = "http://192.168.1.105:8080/DataService/";
var mainDeptId;

function initYhLevel() {
    $.ajax({
        url: serverPath + "baseInfo/41",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhLevel",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhLevelSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function initYhType() {
    $.ajax({
        url: serverPath + "baseInfo/1",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhType",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhTypeSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function initPcPerson() {
    $.ajax({
        url: serverPath + "yhEnter/pcPerson",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "pcPerson",
        success: function (data) {
            if (data != undefined && data != null && data != "null") {
//                alert(data.personNumber + "," + data.personName);
                $("#pcPersonNumber").val(data.personNumber);
                $("#pcPersonName").val(data.personName);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function initYhzy() {
    $.ajax({
        url: serverPath + "baseInfo/116",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhzy",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhzySelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 根据输入的部门编码查询隐患依据、危险源、责任单位、排查地点
 */
function getYhBasis() {
    var deptNumber = $("#deptNumber").val();

    if (deptNumber == undefined || deptNumber == null || deptNumber == "") {
        alert("请输入部门编码！");
        return;
    }

    mainDeptId = deptNumber;

    // 查询隐患依据
    $.ajax({
        url: serverPath + "yhEnter/yhBasis/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhBasis",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhBasisSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].yhId + "'>" + data[i].yhContent + "</option>";

                }
                $(selectStr).appendTo(select);

            } else {
                alert("没有数据！");
            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 查询危险源
    $.ajax({
        url: serverPath + "yhEnter/hazard/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "hazard",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#hazardSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].hNumber + "'>" + data[i].hContent + "</option>";

                }
                $(selectStr).appendTo(select);

            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 查询责任单位
    $.ajax({
        url: serverPath + "yhEnter/zrdw/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "zrdw",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#zrdwSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].deptNumber + "'>" + data[i].deptName + "</option>";

                }
                $(selectStr).appendTo(select);

            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 查询排查地点
    $.ajax({
        url: serverPath + "yhEnter/place/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "place",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#placeSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].placeid + "'>" + data[i].placename + "</option>";

                }
                $(selectStr).appendTo(select);

            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function selectBasis(selectVal) {
//    alert(selectVal.options[selectVal.selectedIndex].text);
    var selectText = selectVal.options[selectVal.selectedIndex].text;
    $.ajax({
        url: serverPath + "yhEnter/yhBasisLevel/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhBasisLevel",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhLevelSelect");
                select.val(data);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    $.ajax({
        url: serverPath + "yhEnter/yhBasisType/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "yhBasisType",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#yhTypeSelect");
                select.val(data);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    $.ajax({
        url: serverPath + "yhEnter/basisHazard/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "basisHazard",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#hazardSelect");
                select.val(data);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    $("#yhContent").val(selectText);
}

function selectZrdw(selectVal) {
//    alert(selectVal.value);

    $.ajax({
        url: serverPath + "yhEnter/zrr/deptId/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "zrr",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#zrrSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].personId + "'>" + data[i].name + "</option>";

                }
                $(selectStr).appendTo(select);

            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function selectPcType(selectVal) {
    if (selectVal.value == 4 || selectVal.value == 7) {
        $("#yhzyDiv").show();
    } else {
        $("#yhzyDiv").hide();
    }
}

function selectZgfs(selectVal) {
    if (selectVal.value == "新增") {
        $("#xqzgDiv").show();
    } else {
        $("#xqzgDiv").hide();
    }
}

function submitInfo() {
    if (confirm("确认提交？")) {

    }
}

