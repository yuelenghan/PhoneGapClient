/**
 * Created by Administrator on 2014/4/10.
 */

var serverPath = "http://192.168.1.105:8080/DataService/";
var mainDeptId;

function initSwLevel() {
    $.ajax({
        url: serverPath + "baseInfo/46",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "swLevel",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#swLevelSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function initSwType() {
    $.ajax({
        url: serverPath + "baseInfo/102",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "swType",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#swTypeSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function initSwPro() {
    $.ajax({
        url: serverPath + "baseInfo/106",
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "swPro",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#swProSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function initPcPerson() {
    $.ajax({
        url: serverPath + "swEnter/pcPerson",
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

function getSwBasis() {
    var deptNumber = $("#deptNumber").val();

    if (deptNumber == undefined || deptNumber == null || deptNumber == "") {
        alert("请输入部门编码！");
        return;
    }

    mainDeptId = deptNumber;

    // 查询三违依据
    $.ajax({
        url: serverPath + "swEnter/swBasis/deptNumber/" + deptNumber,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "swBasis",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#swBasisSelect");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].swId + "'>" + data[i].swContent + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);

                $.ajax({
                    url: serverPath + "swEnter/swBasisLevel/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "swBasisLevel",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#swLevelSelect");
                            select.val(data);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });

                $.ajax({
                    url: serverPath + "swEnter/swBasisType/" + select.val(),
                    dataType: "jsonp",
                    type: "post",
                    jsonpCallback: "swBasisType",
                    success: function (data) {
                        if (data != undefined && data != null && data.length > 0) {
                            var select = $("#swTypeSelect");
                            select.val(data);
                            select.selectmenu('refresh', true);
                        }
                    },
                    error: function () {
                        alert("error!");
                    }
                });

                $.ajax({
                    url: serverPath + "swEnter/basisHazard/" + select.val(),
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

                var selectText = select.find("option:selected").text();
                $("#swContent").val(selectText);
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
        url: serverPath + "swEnter/hazard/deptNumber/" + deptNumber,
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
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    // 查询排查地点
    $.ajax({
        url: serverPath + "swEnter/place/deptNumber/" + deptNumber,
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
                select.selectmenu('refresh', true);
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
        url: serverPath + "swEnter/swBasisLevel/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "swBasisLevel",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#swLevelSelect");
                select.val(data);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    $.ajax({
        url: serverPath + "swEnter/swBasisType/" + selectVal.value,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "swBasisType",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#swTypeSelect");
                select.val(data);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });

    $.ajax({
        url: serverPath + "swEnter/basisHazard/" + selectVal.value,
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

    $("#swContent").val(selectText);
}

function getSwry() {
    var name = $("#querySwry").val();
    if (name == undefined || name == null || name == "") {
        alert("请输入人员姓名！")
        return;
    }

    if (mainDeptId == undefined || mainDeptId == null || mainDeptId == "") {
        alert("请先输入部门编码进行查询之后再录入三违数据！")
    }

    $.ajax({
        url: serverPath + "swEnter/person/" + mainDeptId + "/" + name,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "person",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#swry");
                select.html("");
                var selectStr = "";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].personnumber + "'>" + data[i].name + "</option>";

                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function submitInfo() {
    if (confirm("确认提交？")) {
        var swyj = $("#swBasisSelect").val();
        var swxz = $("#swLevelSelect").val();
        var swlx = $("#swTypeSelect").val();
        var swzy = $("#swProSelect").val();
        var wxy = $("#hazardSelect").val();
        var swms = $("#swContent").val();
        var swry = $("#swry").val();
        var pcry = $("#pcPersonNumber").val();
        var pcdd = $("#placeSelect").val();
        var mxdd = $("#placeDetail").val();
        var pcsj = $("#pcTime").val();
        var pcbc = $("#pcbc").val();
        var jcfs = $("#jcType").val();

        if (swms == undefined || swms == null || swms == "") {
            alert("请填写三违描述！");
            return;
        }
        if (swry == undefined || swry == null || swry == "") {
            alert("请选择三违人员！");
            return;
        }
        if (pcsj == undefined || pcsj == null || pcsj == "") {
            alert("请填写排查时间！");
            return;
        }
        if (pcry == undefined || pcry == null || pcry == "") {
            alert("排查人员无法获取，请登录！");
            return;
        }

        if (mxdd == undefined || mxdd == null || mxdd == "") {
            mxdd = "null";
        }

        /*        alert("swyj = " + swyj + ", swxz = " + swxz + ", swlx = " + swlx + ", swzy = " + swzy + ", wxy = " + wxy + ", swms = " + swms + ", swry = " + swry
         + ", pcry = " + pcry + ", pcdd = " + pcdd + ", mxdd = " + mxdd + ", pcsj = " + pcsj + ", pcbc = " + pcbc + ", jcfs = " + jcfs);*/

        $.ajax({
            url: serverPath + "swEnter/insertInfo/" + swyj + "/" + swxz + "/" + swlx + "/" + swzy + "/" + wxy + "/" + swms + "/" + swry + "/" + pcry + "/" + pcdd + "/" + mxdd + "/" + pcsj + "/" + pcbc + "/" + jcfs + "/" + mainDeptId,
            dataType: "jsonp",
            type: "post",
            jsonpCallback: "insertInfo",
            success: function (data) {
                if (data == "success") {
                    alert("录入成功！")
                } else {
                    alert("录入失败！");
                }
            },
            error: function () {
                alert("error!");
            }
        });
    }
}