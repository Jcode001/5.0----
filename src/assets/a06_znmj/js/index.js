$(function () {
    $('#backToNext').click(function(){
        window.history.back()
    })
    $.ajax({
        type: "get",
        url: "/custom/get",
        data: {
            "key": "pageTitle"
        },
        dataType: "json",
        success: function (response) {
            $("#pageTitle").text("" + response.data.content + "")
        }
    });
    $.ajax({
        type: "get",
        url: "/custom/get",
        data: {
            "key": "copyright"
        },
        dataType: "json",
        success: function (response) {
            $(".copyright").text("" + response.data.content + "")
        }
    });
})
var objDiv;
function showmsg(msg) {
    objDiv = $("#msgbox");
    $(objDiv).css("display", "block");
    // e=e||window.event;  // 兼容firefox
    $(objDiv).css("left", "50%"); // 初始化，防止叠加
    $(objDiv).css("top", "5%");
    //var e = window.event || arguments.callee.caller.arguments[0];
    //$(objDiv).css("left", e.clientX + 30); 
    //$(objDiv).css("top", e.clientY - 45); 
    $(objDiv).html("&emsp;&emsp;" + msg + "&emsp;&emsp;");
    t = setTimeout("hide()", 2000);
}
function hide() {
    var objDiv = $("#msgbox");
    $(objDiv).css("display", "none");
}
//////////////////////////////////////////////////左侧导航
$(function () {
    $.ajax({
        type: "GET",
        url: " /acs/getAll ",
        success: function (result) {
            for (let index = 0; index < result.data.length; index++) {
                var item = '<ul>';
                item += '<li id="treenode1_' + result.data[index].warehouse.storeId + '">';
                item += '<span>' + result.data[index].warehouse.storeName + '</span>';
                item += '<ul class="warehouseNavigation">';
                for (let i = 0; i < result.data[index].objectList.length; i++) {
                    item += "<li class='toolMan' name='" + index + "' objectList='" + i + "'  onclick='entranceGuardNavigation(this,\"" + result.data[index].objectList[i].id + "\",\"" + result.data[index].objectList[i].ip + "\",\"" + result.data[index].objectList[i].password + "\",\"" + result.data[index].objectList[i].port + "\")' id='treenode1_" + result.data[index].objectList[i].id + "'>";

                    item += '<span>' + result.data[index].objectList[i].name + '</span>';
                }
                item += '</ul>';
                item += '</li>';
                $("#menutree").append(item)
                $(".warehouseNavigation").css("display", "none")
                $("#treenode1_" + result.data[index].warehouse.storeId + "").click(function () {
                    $(".warehouseNavigation").css("display", "none")
                    $(this).children("ul").css("display", "block")
                })
                for (let n = 0; n < result.data[index].objectList.length; n++) {
                    $("#treenode1_" + result.data[index].objectList[n].id + "").click(function () {
                        $("#StoreName").text(result.data[index].warehouse.storeName)
                        $("#DId ").text(result.data[index].objectList[n].name)
                        $("#DIP").text(result.data[index].objectList[n].ip)
                        $("#password").text(result.data[index].objectList[n].password)
                        $("#port").text(result.data[index].objectList[n].port)
                        entranceId = result.data[index].objectList[n].id;
                        // showAuto()
                    })
                }

            }
            firstIndex = $(".toolMan").eq(0).attr("name")
            objectList = $(".toolMan").eq(0).attr("objectList")
            entranceGuardNavigation(1, result.data[firstIndex].objectList[objectList].id, result.data[firstIndex].objectList[objectList].ip, result.data[firstIndex].objectList[objectList].password, result.data[firstIndex].objectList[objectList].port)
        }

    });
    ////////////////////////////////////////////////////开门模块
    $("#door").click(function () {
        console.log($("#DId").text());
        var indata = {
            "id": idAdd
        }
        $.ajax({
            type: "get",
            url: "/acs/openTheDoor",
            data: indata,
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response.code == 200) {
                    $("#imgOn").css("display", "none");
                    $("#imgOff").css("display", "block");
                    setInterval(function () {
                        $("#imgOn").css("display", "block");
                        $("#imgOff").css("display", "none");
                    }, 1000 * 10);
                    showmsg("开门成功")
                } else {
                    alert(response.message)
                }
            }
        });
    })
    $("#cancel").click(function () {
        $("#bounced").hide();
    });
    $("#emptyRecord").click(function () {
        $("#bounced").show();
    });
    $("#cancelOne").click(function () {
        $("#bounced").hide();
    });
    $(".closeOne").click(function () {
        $("#employeeInformation").css("display", "none");
    })
})

/////////////////////////////////////////// 文件下载和二级导航中的li的函数
function entranceGuardNavigation(a, id, ip, password, port) {
    $("#userControl").css("display", "block");
    $("#addPersonnel").css("display", "block");
    $("#historyToolsPeople").css("display", "block");
    $("#door").css("display", "block");
    idAdd = id;
    ipAddress = ip;
    passworda = password;
    porta = port;


}
$(function () {


    $("#historyToolsPeople").click(function () {
        console.log("as");
        $("#ownloadDounced").toggle();
    })
    ////////////////////////////////////////////////////下载记录
    $("#history").click(function () {
        // if ($("#theStartTime").val() == '') {
        //     alert("开始时间不能为空")
        //     return;
        // } else if ($("#theOverTime").val() == '') {
        //     alert("结束时间不能为空")
        //     return;
        // }

        //2000-01-01T00:00:00+8:00
        var startTime = $("#theStartTime").children().val();
        var endTime = $("#theOverTime").children().val();
        console.log(startTime, endTime + "T00:00:00+8:00");
        var url = "/acs/getRecord?endTime=" + endTime + "T00:00:00" + "&id=" + idAdd + "&startTime=" + startTime + "T00:00:00" + "";
        console.log(url);
        //+ "&startTime=" + startTime + "&endTime=" + endTime;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true); //get请求，请求地址，是否异步
        xhr.responseType = "blob"; // 返回类型blob
        xhr.onload = function () { // 请求完成处理函数
            if (this.status === 200) {
                var blob = this.response; // 获取返回值

                var a = document.createElement('a');
                a.download = 'data.csv';
                a.href = window.URL.createObjectURL(blob);
                a.click();
            }

        };
        // 发送ajax请求
        xhr.send();
    });
})
///////////////////////////////////////////////获取员工信息
function userControlA() {
    $("#employeeInformation").css("display", "block")
    let indata = {
        "data": idAdd,
        "pageNumber": "1",
        "pageSize": "12"
    }
    $.ajax({
        type: "post",
        url: "/acs/getAllEmployee",
        data: JSON.stringify(indata),
        dataType: "json",
        contentType: "application/json",
        success: function (obj) {
            jumpVariable = 1;
            page = obj.count;
            $("#pages").text(page)
            $("#skip").empty()
            if (page < 6) {
                $("#skip").append('<li><a href="#" aria-label="Previous"  onclick="skipLeft(' + page + ')"><span aria-hidden="true">&laquo;</span></a></li>')
                for (let index = 1; index < page + 1; index++) {
                    $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
                }
                $("#skip").children().eq(1).children().css({ "background": "#0049a5", "color": "#ffffff" })
                $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight()"><span aria-hidden="true">&raquo;</span></a></li>')
            } else if (page > 6 || page == 6) {
                $("#skip").append('<li><a href="#" aria-label="Previous"  onclick="skipLeft(' + page + ')"><span aria-hidden="true">&laquo;</span></a></li>')
                for (let index = 1; index < 6; index++) {
                    $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
                }
                $("#skip").children().eq(1).children().css({ "background": "#0049a5", "color": "#ffffff" })
                $("#skip").append('<li><a href="#">...</a></li>')
                $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight(' + page + ')"><span aria-hidden="true">&raquo;</span></a></li>')
            }
            $("#show").empty()
            let itema = '<tr style="text-align: center;font-weight: bold;">';
            itema += '<td style="width: 25%;">序号</td>';
            itema += '<td style="width: 25%;">姓名</td>';
            itema += '<td style="width: 25%;">员工编号</td>';
            itema += '<td style="width: 25%;"></td>';
            // itema += '<td style="width: 20%;"></td>';
            itema += '</tr>';
            $("#show").append(itema);
            for (let i = 0; i < obj.data.UserInfoSearch.UserInfo.length; i++) {
               if(obj.data.UserInfoSearch.UserInfo[i].name=="null" || obj.data.UserInfoSearch.UserInfo[i].name=="undefined"){
                   toll=''
               }else{
                   toll=obj.data.UserInfoSearch.UserInfo[i].name
               }
                let item = "<tr style='text-align:center' onclick='delimitToDraw(this)'>";
                item += "<td style='color:#000;font-size:16px;padding-right:3px'>" + (i + 1) + "</td>";
                item += "<td style='color:#000;font-size:16px;'>" + toll + "</td>";
                item += "<td style='color:#000;font-size:16px;'>" + obj.data.UserInfoSearch.UserInfo[i].employeeNo + "</td>";
                item += "<td style='color:#000;font-size:16px;'><a href='#'  class='changed' onclick='deletea(this," + obj.data.UserInfoSearch.UserInfo[i].employeeNo + ")'>删除</a>/<a href='#' class='changed' onclick='amend(this," + obj.data.UserInfoSearch.UserInfo[i].employeeNo + ")'>修改</a></td>";
                // item += "<td style='color:#000;font-size:16px;'><div style='background:#337ab7;color:#fff;width:30%;margin:0 auto' onclick='modify(this)'>修改</div></td>";
                item += "</tr>";
                $("#show").append(item);
            }
        }
    });
}
//////////////////////////////////////点击按钮跳转
function skip(a) {
    let jump = parseInt($(a).text());
    jumpVariable = jump;
    console.log(jumpVariable);
    modals();
    homefaber();
    discolor();
}
////////////////////////////按钮组的显示
function modals() {
    if (page < 6) {
        $("#skip").empty();
        $("#skip").append('<li><a href="#" aria-label="Previous" onclick="skipLeft()"><span aria-hidden="true">&laquo;</span></a></li>')
        for (let index = 1; index < page + 1; index++) {
            $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
        }
        $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight()"><span aria-hidden="true">&raquo;</span></a></li>')
    } else if (page > 2 + jumpVariable) {
        if (jumpVariable < 3) {
            $("#skip").empty();
            $("#skip").append('<li><a href="#" aria-label="Previous" onclick="skipLeft()"><span aria-hidden="true">&laquo;</span></a></li>')
            for (let index = 1; index < 6; index++) {
                $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
            }
            $("#skip").append('<li><a href="#">...</a></li>')
            $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight()"><span aria-hidden="true">&raquo;</span></a></li>')
        } else {
            $("#skip").empty();
            $("#skip").append('<li><a href="#" aria-label="Previous" onclick="skipLeft()"><span aria-hidden="true">&laquo;</span></a></li>')
            for (let index = jumpVariable - 2; index < jumpVariable; index++) {
                $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
            }
            for (let index = jumpVariable; index < jumpVariable + 3; index++) {
                $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
            }
            $("#skip").append('<li><a href="#">...</a></li>')
            $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight()"><span aria-hidden="true">&raquo;</span></a></li>')
        }
    } else if (page == jumpVariable + 2 || page < jumpVariable + 2) {
        $("#skip").empty();
        $("#skip").append('<li><a href="#" aria-label="Previous" onclick="skipLeft()"><span aria-hidden="true">&laquo;</span></a></li>')
        for (let index = page - 4; index < page + 1; index++) {
            $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
        }
        $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight()"><span aria-hidden="true">&raquo;</span></a></li>')
    }

}
//////////////////点击按钮组发送的请求在显示到页面中
function homefaber() {
    let indata = {
        "data": idAdd,
        "pageNumber": jumpVariable,
        "pageSize": "12"
    }
    $.ajax({
        type: "post",
        url: "/acs/getAllEmployee",
        data: JSON.stringify(indata),
        dataType: "json",
        contentType: "application/json",
        success: function (obj) {
            $("#show").empty()
            let itema = '<tr style="text-align: center;font-weight: bold;">';
            itema += '<td style="width: 25%;">序号</td>';
            itema += '<td style="width: 25%;">姓名</td>';
            itema += '<td style="width: 25%;">员工编号</td>';
            itema += '<td style="width: 25%;"></td>';
            // itema += '<td style="width: 20%;"></td>';
            itema += '</tr>';
            $("#show").append(itema);
            for (let i = 0; i < obj.data.UserInfoSearch.UserInfo.length; i++) {
                let item = "<tr style='text-align:center' onclick='delimitToDraw(this)'>";
                item += "<td style='color:#000;font-size:16px;padding-right:3px'>" + (i + 1) + "</td>";
                item += "<td style='color:#000;font-size:16px;'>" + obj.data.UserInfoSearch.UserInfo[i].name + "</td>";
                item += "<td style='color:#000;font-size:16px;'>" + obj.data.UserInfoSearch.UserInfo[i].employeeNo + "</td>";
                item += "<td style='color:#000;font-size:16px;'><a href='#'  class='changed' onclick='deletea(this," + obj.data.UserInfoSearch.UserInfo[i].employeeNo + ")'>删除</a>/<a href='#' class='changed' onclick='amend(this," + obj.data.UserInfoSearch.UserInfo[i].employeeNo + ")'>修改</a></td>";
                // item += "<td style='color:#000;font-size:16px;'><div style='background:#337ab7;color:#fff;width:30%;margin:0 auto' onclick='modify(this)'>修改</div></td>";
                item += "</tr>";
                $("#show").append(item);
            }
        }
    })
}
////////////////////////点击按钮组使其高亮显示
function discolor() {
    let son = $("#skip").children()
    for (let index = 0; index < son.length; index++) {
        let jumpVariablea = parseInt(son.eq(index).text());
        if (jumpVariablea == jumpVariable) {
            son.eq(index).children().css({ "background": "#0049a5", "color": "#ffffff" })
        }
    }
}
///////////////////////////按钮组上一页
function skipLeft() {
    if (jumpVariable == 1) {
        return
    }
    jumpVariable = jumpVariable - 1;
    modals();
    homefaber();
    discolor();

}
/////////////////////////////按钮组下一页
function skipRight() {
    if (jumpVariable == page) {
        return
    }
    jumpVariable = jumpVariable + 1;
    modals();
    homefaber();
    discolor();

}
///////////////////////////////////////////////////////点击员工信息时高亮显示
function delimitToDraw(a) {
    $("tr").css("background-color", "#fff");
    $(a).css("background-color", "#d9edf7");
}
////////////////////////////////////////////////删除员工信息
function deletea(a, b) {
    var r = confirm("确认是否删除？")
    if (r == false) { return; }
    let indata = {
        "acsId": idAdd,
        "employeeNoList": [
            b
        ],
    }
    $.ajax({
        type: "post",
        url: "/acs/deleteEmployee",
        data: JSON.stringify(indata),
        dataType: "json",
        contentType: "application/json",
        success: function (obj) {
            showmsg("删除成功")
            userControlA();
        }
    });

}

function addPersonnel() {
    //////////////////////////////////////////////////添加员工信息
    $("#addName").val('');
    $("#file").val('');

    $("#addEmployees").css("display", "block");
    $("#storage").css("display", "block");
    $("#storageOne").css("display", "none");
    $("#addPassword").val('');
    $("#addName").val('');
    $("#diamondO").text('添加');
    $(".delectImg").css("background","url(/kfdhview/To_upload_pictures.png)")


}
$(function () {
    $(".shutDown").click(function () {
        $("#addEmployees").css("display", "none");
        $("#ownloadDounced").css("display", "none");
        $("#addmodify").css("display", "none");
    })
    $("#storage").click(function (e) {
        if ($("#addName").val() == '') {
            alert("请填写名称")
            return;
        } else if ($("#addPassword").val() == '') {
            alert("请输入密码")
            return;
        }
        var fileInput = $('#file').get(0).files[0];
        if (fileInput) {
            $("#filea").submit();
        } else {
            alert("请选择上传文件！");
        }
        $("#addEmployees").hide();
        var fromData = new FormData();
        var imgFile = $("#file");
        var fileObj = imgFile[0].files[0];
        fromData.append("file", fileObj);
        $.ajax({
            type: "post",
            url: "/acs/uploadEmployeeFace",
            contentType: false,
            processData: false,
            data: fromData,
            success: function (obj) {
                ////////////////////////////////////////提交员工信息
                let indata = {
                    "acsId": idAdd,
                    "employeeFaceImageName": obj.data,
                    "employeeName": $("#addName").val(),
                }
                $.ajax({
                    type: "post",
                    url: "/acs/addEmployee",
                    data: JSON.stringify(indata),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (obg) {
                        showmsg("上传成功")
                        userControlA();
                    }
                });
            }
        });
    })
})
//////////////////////////////////////////////修改
function modify(a) {
    $("#addEmployees").css("display", "block");
    $("#addName").val($($(a).parent().prev().prev().prev()).text());
    $("#addPassword").val($($(a).parent().prev().prev()).text());
}
/////////////////////////////////////////////上传图片
function gome(target) {
    fileSize = target.files[0].size;
    var size = fileSize / 1024;
    if (size > 200) {
        alert("附件不能大于200kb");
        target.value = "";
        return
    }
}

function fileChangea(target) {
    fileSize = target.files[0].size;
    var size = fileSize / 1024;
    if (size > 200) {
        alert("附件不能大于200kb");
        target.value = "";
        return
    }
}
/////////////////////////////////////显示选中的图片
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function gome(obj) {
    fileSize = obj.files[0].size;
    var size = fileSize / 1024;
    if (size > 200) {
        alert("附件不能大于200kb");
        obj.value = "";
        return
    }
    var objUrl = getObjectURL(obj.files[0]); //获取图片的路径，该路径不是图片在本地的路径
    if (objUrl) {
        $(obj).parent().css({ "background": "url(" + objUrl + ") no-repeat", "background-size": "100px 100px" }); //将图片路径存入src中，显示出图片
    }
}
//////////////////////////////////修改员工
function amend(a, b) {
    let c = $(a).parents("tr").children().eq(1).text()
    $("#addName").val(c);
    $("#file").val('');
    $("#diamondO").text('修改');
    $("#storage").css("display", "none");
    $("#storageOne").css("display", "block");
    $("#addmodify").css("display", "block");
    $("#addEmployees").css("display", "block");
    $(".delectImg").css("background","url(/kfdhview/To_upload_pictures.png)")
    storageB = b
}
$(function () {
    $("#storageOne").click(function () {
        // $("#addEmployees").hide();
        var r = confirm("确认是否修改")
        if (r == false) return;
        var fromData = new FormData();
        var imgFile = $("#file");
        var fileObj = imgFile[0].files[0];
        fromData.append("file", fileObj);
        $.ajax({
            type: "post",
            url: "/acs/uploadEmployeeFace",
            contentType: false,
            processData: false,
            async: false,
            data: fromData,
            success: function (obj) {
                fileVal = obj.data;
            }
        });
        console.log(fileVal);
        console.log($("#addName").val());
        if (fileVal == "null" && $("#addName").val() == '') {
            return alert("修改失败");
        }
            if (fileVal == "null") {
            var indata = {
                "acsId": idAdd,
                "employeeName": $("#addName").val(),
                "employeeNo": storageB,
            }
        }
            if ($("#addName").val() == '') {
                return  showmsg("请输入用户名")
            var indata = {
                "acsId": idAdd,
                "employeeFaceImageName": fileVal,
                "employeeNo": storageB,
            }
        }else if($("#addName").val() !== '' && fileVal !== "null"){
                var indata = {
                    "acsId": idAdd,
                    "employeeName": $("#addName").val(),
                    "employeeFaceImageName": fileVal,
                    "employeeNo": storageB,
                }
            }

        console.log(JSON.stringify(indata));
        $.ajax({
            type: "post",
            url: "/acs/updateEmployee",
            data: JSON.stringify(indata),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                showmsg("修改成功")
                userControlA();
                $("#addEmployees").css("display", "none")
            }
        });
    })
})