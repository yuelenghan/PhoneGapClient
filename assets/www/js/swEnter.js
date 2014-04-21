/**
 * 三违录入js
 * Created by Administrator on 2014/4/10.
 */

var serverPath = "http://192.168.1.105:8080/DataService/";
var mainDeptId;
var loading = false;

/**
 * 初始化三违性质
 */
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

                var filterSelect = $("#swyjLevel");
                filterSelect.html("");
                var filterSelectStr = "<option value='null'>--全部--</option>";
                for (var i = 0; i < data.length; i++) {
                    filterSelectStr += "<option value='" + data[i].infoid + "'>" + data[i].infoname + "</option>";
                }
                $(filterSelectStr).appendTo(filterSelect);
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

/**
 * 初始化三违类型
 */
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

/**
 * 初始化三违专业
 */
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

/**
 * 初始化排查人员（登录人员）
 */
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

                // 登录人员为领导，初始化部门列表
                if (data.roleLevel == 1) {
                    $.ajax({
                        url: serverPath + "yhEnter/department",
                        dataType: "jsonp",
                        type: "post",
                        jsonpCallback: "department",
                        success: function (data) {
                            if (data != undefined && data != null && data.length > 0) {
                                var select = $("#deptSelect");
                                select.html("");
                                var selectStr = "";
                                for (var i = 0; i < data.length; i++) {
                                    selectStr += "<option value='" + data[i].deptNumber + "'>" + data[i].deptName + "</option>";
                                }
                                $(selectStr).appendTo(select);
                                select.selectmenu('refresh', true);

                                mainDeptId = select.val();

                                // 显示部门列表
                                $("#deptSelectDiv").show();
                            }
                        },
                        error: function () {
                            alert("error!");
                        }
                    });
                } else {
                    mainDeptId = data.mainDeptId;
                    // 隐藏部门列表
                    $("#deptSelectDiv").hide();

//                    initDeptList();
                }
            }
        },
        error: function () {
            alert("error!");
        }
    });
}

function initDeptList() {
    $.ajax({
        url: serverPath + "swEnter/department/" + mainDeptId,
        dataType: "jsonp",
        type: "post",
        jsonpCallback: "deptList",
        success: function (data) {
            if (data != undefined && data != null && data.length > 0) {
                var select = $("#deptList");
                select.html("");
                var selectStr = "<option value='null'>--全部--</option>";
                for (var i = 0; i < data.length; i++) {
                    selectStr += "<option value='" + data[i].deptNumber + "'>" + data[i].deptName + "</option>";
                }
                $(selectStr).appendTo(select);
                select.selectmenu('refresh', true);
            } else {
                $.mobile.loading("hide");
                loading = false;
                alert("没有部门数据！");
            }
        },
        error: function () {
            $.mobile.loading("hide");
            loading = false;
            alert("error!");
        }
    });
}

/**
 * 根据输入的部门编码查询三违依据、危险源、排查地点
 */
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

                // 根据选中的三违依据初始化三违性质
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

                // 根据选中的三违依据初始化三违类型
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

                // 根据选中的三违依据初始化危险源
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

/**
 * 根据选中的三违依据初始化三违性质、三违类型、危险源
 * @param selectVal 选中的三违依据
 */
function selectBasis(selectVal) {
//    alert(selectVal.options[selectVal.selectedIndex].text);
    var selectText = selectVal.options[selectVal.selectedIndex].text;

    // 初始化三违性质
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

    // 初始化三违类型
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

    // 初始化危险源
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

/**
 * 根据输入的过滤条件查询三违人员列表
 */
function getSwry() {
    /* var name = $("#querySwry").val();
     if (name == undefined || name == null || name == "") {
        alert("请输入人员姓名！");
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
     });*/

    initDeptList();

    $.mobile.changePage("#swry-filter", {transition: "flip"});
}

/**
 * 提交三违信息，插入数据库
 */
function submitInfo() {
    if (confirm("确认提交？")) {
        if (loading == false) {
            $.mobile.loading("show", {text: "正在录入...", textVisible: true});
            loading = true;

            var swyj = $("#swBasisValue").val();   // 三违依据
            var swxz = $("#swLevelSelect").val();   // 三违性质
            var swlx = $("#swTypeSelect").val();    // 三违类型
            var swzy = $("#swProSelect").val();     // 三违专业
            var wxy = $("#hazardValue").val();     // 危险源
            var swms = $("#swContent").val();       // 三违描述
            var swry = $("#swryNumber").val();            // 三违人员
            var pcry = $("#pcPersonNumber").val();  // 排查人员
            var pcdd = $("#placeSelect").val();     // 排查地点
            var mxdd = $("#placeDetail").val();     // 明细地点
            var pcsj = $("#pcTime").val();          // 排查时间
            var pcbc = $("#pcbc").val();            // 排查班次
            var jcfs = $("#jcType").val();          // 检查方式

            if (swyj == undefined || swyj == null || swyj == "") {
                alert("请填写三违依据！");
                return;
            }
            if (wxy == undefined || wxy == null || wxy == "") {
                alert("请填写危险源！");
                return;
            }

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

            /*                alert("swyj = " + swyj + ", swxz = " + swxz + ", swlx = " + swlx + ", swzy = " + swzy + ", wxy = " + wxy + ", swms = " + swms + ", swry = " + swry
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
                    $.mobile.loading("hide");
                    loading = false;
                },
                error: function () {
                    $.mobile.loading("hide");
                    loading = false;
                    alert("error!");
                }
            });
        }

    }
}

/**
 * 过滤三违依据
 */
function filterSwyj() {
    if (loading == false) {
        $.mobile.loading("show", {text: "正在获取...", textVisible: true});
        loading = true;

        // 过滤条件
        var swyjLevel = $("#swyjLevel").val();
        var swyjText = $("#swyjText").val();

        if (swyjLevel == undefined || swyjLevel == null || swyjLevel == "") {
            swyjLevel = "null";
        }
        if (swyjText == undefined || swyjText == null || swyjText == "") {
            swyjText = "null";
        }

        $.ajax({
            url: serverPath + "swEnter/swBasis/deptNumber/" + mainDeptId + "/" + swyjLevel + "/" + swyjText,
            dataType: "jsonp",
            type: "post",
            jsonpCallback: "swBasis",
            success: function (data) {
                if (data != undefined && data != null && data.length > 0) {
                    var select = $("#swyjList");
                    select.html("");
                    var selectStr = "";
                    for (var i = 0; i < data.length; i++) {
                        selectStr += "<option value='" + data[i].swId + "'>" + data[i].swContent + "</option>";
                    }
                    $(selectStr).appendTo(select);
                    select.selectmenu('refresh', true);

                    /*// 根据选中的三违依据初始化三违性质
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

                     // 根据选中的三违依据初始化三违类型
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

                     // 根据选中的三违依据初始化危险源
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
                     $("#swContent").val(selectText);*/
                } else {
                    alert("没有三违依据数据！");
                }

                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $.mobile.loading("hide");
                loading = false;
                alert("error!");
            }
        });
    }

}

/**
 * 过滤危险源
 */
function filterHazard() {
    // 过滤条件
    var arg = $("#hazardFilter").val();
    if (arg == undefined || arg == null || arg == "") {
        return;
    }

    $.ajax({
        url: serverPath + "swEnter/hazard/deptNumber/" + mainDeptId + "/" + arg,
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
}

/**
 * 过滤地点
 */
function filterPlace() {
    if (loading == false) {
        $.mobile.loading("show", {text: "正在获取...", textVisible: true});
        loading = true;

        // 过滤条件
        var arg = $("#placeFilter").val();
        if (arg == undefined || arg == null || arg == "") {
            arg = "null";
        }

        $.ajax({
            url: serverPath + "swEnter/place/deptNumber/" + mainDeptId + "/" + arg,
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

                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $.mobile.loading("hide");
                loading = false;
                alert("error!");
            }
        });
    }
}

function selectDept(deptId) {
//    alert(deptId);
    mainDeptId = deptId;
}

function returnSwyj() {
    var swyj = $("#swyjList").val();
    var swyjText = $("#swyjList").find("option:selected").text();
//    alert(yhyj);

//    $('#yhyj-filter-dialog').dialog('close');
    $.mobile.changePage("#swEnter1", {transition: "flip"});

    if (swyj != undefined && swyj != null && swyj != "") {
        /*   var select = $("#yhBasisSelect");
         select.val(yhyj);
         select.selectmenu('refresh', true);*/

        $("#swBasisValue").val(swyj);
        $("#swBasisText").val(swyjText);

        // 根据选中的三违依据初始化三违性质
        $.ajax({
            url: serverPath + "swEnter/swBasisLevel/" + swyj,
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

        // 根据选中的三违依据初始化三违类型
        $.ajax({
            url: serverPath + "swEnter/swBasisType/" + swyj,
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

        // 根据选中的三违依据初始化危险源
        $.ajax({
            url: serverPath + "swEnter/basisHazard/" + swyj,
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

        $("#swContent").val(swyjText);
    }
}

function filterWxy() {
    if (loading == false) {
        $.mobile.loading("show", {text: "正在获取...", textVisible: true});
        loading = true;

        var wxyLevel = $("#wxyLevel").val();
        var wxyText = $("#wxyText").val();

        if (wxyLevel == undefined || wxyLevel == null || wxyLevel == "") {
            wxyLevel = "null";
        }
        if (wxyText == undefined || wxyText == null || wxyText == "") {
            wxyText = "null";
        }

        $.ajax({
            url: serverPath + "swEnter/hazard/deptNumber/" + mainDeptId + "/" + wxyLevel + "/" + wxyText,
            dataType: "jsonp",
            type: "post",
            jsonpCallback: "hazard",
            success: function (data) {
                if (data != undefined && data != null && data.length > 0) {
                    var select = $("#wxyList");
                    select.html("");
                    var selectStr = "";
                    for (var i = 0; i < data.length; i++) {
                        selectStr += "<option value='" + data[i].hNumber + "'>" + data[i].hContent + "</option>";
                    }
                    $(selectStr).appendTo(select);
                    select.selectmenu('refresh', true);

                } else {
                    alert("没有危险源数据！");
                }

                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $.mobile.loading("hide");
                loading = false;
                alert("error!");

            }
        });
    }

}

function returnWxy() {
    var wxy = $("#wxyList").val();
    var wxyText = $("#wxyList").find("option:selected").text();
//    alert(wxy);

//    $('#wxy-filter-dialog').dialog('close');

    $.mobile.changePage("#swEnter1", {transition: "flip"});

    /*    var select = $("#hazardSelect");
     select.val(wxy);
     select.selectmenu('refresh', true);*/

    $("#hazardValue").val(wxy);
    $("#hazardText").val(wxyText);

}

function filterSwry() {
    if (loading == false) {
        $.mobile.loading("show", {text: "正在获取...", textVisible: true});
        loading = true;

        var shortName = $("#swryText").val();
        var deptId = $("#deptList").val();

        if (shortName == undefined || shortName == null || shortName == "") {
            shortName = "null";
        }
        if (deptId == undefined || deptId == null || deptId == "") {
            deptId = "null";
        }

        $.ajax({
            url: serverPath + "swEnter/person/" + deptId + "/" + shortName,
            dataType: "jsonp",
            type: "post",
            jsonpCallback: "swry",
            success: function (data) {
                if (data != undefined && data != null && data.length > 0) {
                    var select = $("#swryList");
                    select.html("");
                    var selectStr = "";
                    for (var i = 0; i < data.length; i++) {
                        selectStr += "<option value='" + data[i].personnumber + "'>" + data[i].name + "</option>";
                    }
                    $(selectStr).appendTo(select);
                    select.selectmenu('refresh', true);

                } else {
                    alert("没有三违人员数据！");
                }

                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $.mobile.loading("hide");
                loading = false;
                alert("error!");

            }
        });
    }

}

function returnSwry() {
    var swryNumber = $("#swryList").val();
    var swryName = $("#swryList").find("option:selected").text();

//    alert(swryNumber + ", " + swryName);

    $.mobile.changePage("#swEnter1", {transition: "flip"});

    $("#swryNumber").val(swryNumber);
    $("#swryName").val(swryName);
}