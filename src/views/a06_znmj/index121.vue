<template>
    <el-container style="height: 100%; ">
        <el-header style="text-align: left; font-size: 12px;background-color: white;">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;
    font-size: 1rem;
    text-decoration: none;
    color: #000000;
    border-bottom: 0.125rem solid #258AD9;
    ">
                <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <!-- <el-breadcrumb-item>库房管理</el-breadcrumb-item> -->
                <el-breadcrumb-item>智能门禁</el-breadcrumb-item>
            </el-breadcrumb></el-header>
        <el-container style="height: calc(100vh - 120px);">
            <el-aside style="width:10vw;background-color: rgb(238, 241, 246);border-radius:12px 12px 0 0;">
                <el-header style="text-align: left; border-radius:12px 12px 0 0;">
                    <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png" />
                    <span
                        style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:1vw;line-height: 100%;padding-left: 10px;">库房列表</span>
                </el-header>
                <el-main style="height: 37.2vw;border:1px solid rgb(103, 146, 240);" class="znmjclass">
                    <el-menu :default-active="activeIndex">
                        <template v-for="(item) in KFList">
                            <el-submenu v-if="item.children" :key="item.id" :index="(item.id + 1).toString()">
                                <template slot="title">
                                    <i class="el-icon-office-building"></i>
                                    <!-- {{ item.label }} -->

                                    <el-tooltip placement="top">
                                        <div slot="content"> {{ item.label }}</div>
                                        <span>{{ item.label }} </span>
                                    </el-tooltip>
                                </template>
                                <el-menu-item v-for="(items, key) in item.children" :key="key"
                                    @click="handleNodeClick(items)">
                                    <i class="el-icon-monitor"></i>
                                    <!-- {{ items.label }} -->

                                    <el-tooltip placement="top">
                                        <div slot="content"> {{ items.label }}</div>
                                        <span>{{ items.label }} </span>
                                    </el-tooltip>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :key="item.id">
                                <i class="el-icon-office-building"></i>
                                <el-tooltip placement="top">
                                    <div slot="content"> {{ item.label }}</div>
                                    <span>{{ item.label }} </span>
                                </el-tooltip>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-main>

            </el-aside>

            <el-container>
                <!-- ///////////////////////////////////////////////获取员工信息 -->
                <div id="employeeInformation" style="width:65vw; border: 1px solid #000;display:none;background:#4b79f5">
                    <div>
                        <div @click="addPersonnel()" id="addPersonnel">
                            <img src="./usemanage.png" alt=""
                                style="width: 30px;height: 30px;margin-top: 10px;vertical-align: top;">
                            <span style="vertical-align: middle;">添加</span>
                        </div>

                        <a href="#"><span style="color: #fff;" class="closeOne" @click="closeOne()">返回</span></a>

                    </div>
                    <div style="overflow-y:auto;background-color: #fff;width: 100%;height: 83%;">
                        <table id="show" class="table-bordered">

                        </table>
                    </div>
                    <nav aria-label="Page navigation;" style="display: flex;align-items: center;padding-left: 30px;">
                        <span class="pages">共<span id="pages"></span>页</span>
                        <ul class="pagination" id="skip" @click="skip(this)">

                        </ul>
                    </nav>
                </div>
                <!-- ///////////////////////////////////////////////////////下载弹框 -->
                <div id="ownloadDounced" style="display:none">
                    <div style="font-weight: bold;font-size: 20px;padding: 3px 0;background-color: #004095;color: #FFF;">
                        文件下载
                        <span style="float: right;margin: 2px 10px 0 0;" class="shutDown" @click="shutDown()">X</span>
                    </div>
                    <div id="theStartTime" style="margin-top: 6%;">开始时间:<input type="date"></div>
                    <div id="theOverTime" style="margin-top: 6%;">结束时间:<input type="date"></div>
                    <button id="history" @click="history()">下载</button>
                </div>
                <!-- //////////////////////////////////////////////用户管理模块  start-->
                <div style="position: absolute;top: 30%;right: 45%;">
                    <!-- /////////////////////////////////////////添加员工 -->
                    <div id="addEmployees">
                        <div id="diamond"
                            style="font-weight: bold;font-size: 20px;padding: 3px 0;background-color: #004095;color: #FFF;">
                            <span id="diamondO">添加</span>
                            <span style="float: right;margin: 2px 10px 0 0;color: #fff;" class="shutDown"
                                @click="shutDown()">X</span>
                        </div>
                        <div style="margin-top: 10%;"><span>名字:</span> <input type="text" id="addName"
                                onkeyup="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" /></div>

                        <div style="margin-top: 2rem;">
                            <span style="margin-left: -52.5%;">上传图片:</span>
                            <a href="javascript:file.click();" class="delectImg"
                                style="background:url(./To_upload_pictures.png) no-repeat;width:110px;height:70px;display:block;margin-left: 34%;">
                                <input type="file" id="file" accept="image/jpg" style="display:none;"
                                    onchange="gome(this)" />
                            </a>
                        </div>
                        <p style="margin-top: 0.4rem;color: rgb(172, 166, 166);">提示:需小于200KB内存和jpg格式图片</p>
                        <button id="storage" @click="storage()" style="text-align: center;margin-left: 45%;">提交</button>
                        <button id="storageOne" @click="storageOne()"
                            style="margin-left: 45%;margin-top:5%;width: 15%;height: 10%;border:1px solid #0049a5;color:#ffffff;background-color:#33cc66;line-height: 100%;background-color: #009519;outline:medium;display: nonde;">修改</button>
                    </div>
                </div>
                <!-- //////////////////////////////////////////////用户管理模块  over-->

                <div style="    position: absolute;
    right: 1%;
    top: 13%;
    width: 85%;
    height: 79.2%;
    border: 1px solid rgb(103, 146, 240);
    background-color: rgb(229, 238, 247);">
                    <img style="position:absolute;right:0%;top:0%; width:100%;height:100%;" id="dataalarm" src="./pic.png">
                    <!--        <img id="btnopendoor" src="/znmjview/btnOpenDoor.png" style="position:absolute;left:2%;top:4%;width:14%;height:60px;border:1px solid #e6eef8;border-radius:6px;outline:none">-->
                    <div style="position:absolute;left:29%;bottom:1%;font-size:18px;color:#036ff6">
                        <!-- 设备编号：<span id="datadeviceNo">未知</span> 通讯状态： -->
                        <!-- <span id="dataTXZT">离线</span> -->
                        <!-- 库房索引：
                <span id="StoreId"></span>  -->
                        库房名称：
                        <span id="StoreName"></span> 门禁索引：
                        <span id="DId"></span> 门禁名称：
                        <span id="DName"></span> IP地址：
                        <span id="DIP"></span>
                        <!-- 端口：
                <span id="DPort"></span> -->
                        <span id="DType"></span>
                        <span id="password" style="display: none;"></span>
                        <span id="port" style="display: none;"></span>

                    </div>
                </div>
                <div id="door" @click="door()"
                    style="outline:medium;position: absolute;top: 16.5%;left: 19.5%;z-index: 10;width: 200px;height: 50px;background-color: #408ef7;border-radius: 10px;font-size: 20px;color: #ffffff;font-weight: bold;text-align: center;line-height: 50px;display: none;">
                    <img src="./door.png" alt="" style="width: 30px;height: 30px;margin-top: 12px;vertical-align: top;">
                    <span style="vertical-align: middle;">开门</span>
                </div>
                <div id="historyToolsPeople" @click="historyToolsPeople()"
                    style="outline:medium;position: absolute;top: 16.5%;left: 31.5%;z-index: 10;width: 200px;height: 50px;background-color: #7bd583;border-radius: 10px;font-size: 20px;color: #ffffff;font-weight: bold;text-align: center;line-height: 50px;display: none;">
                    <img src="./downlooad.png" alt=""
                        style="width: 30px;height: 30px;margin-top: 12px;vertical-align: top;">
                    <span style="vertical-align: middle;">下载记录</span>
                </div>
                <!-- <div id="emptyRecord" style="outline:medium;position: absolute;top: 16.5%;left: 43.3%;z-index: 10;width: 200px;height: 50px;background-color: #de6961;border-radius: 10px;font-size: 20px;color: #ffffff;font-weight: bold;text-align: center;line-height: 43px;">
            <img src="/znmjview/clear.png" alt="" style="width: 30px;height: 30px;margin-top: 10px;vertical-align: top;">
            <span style="vertical-align: middle;">清空记录</span>
        </div> -->
                <!-- 删除记录弹框 -->
                <div id="bounced"
                    style="position: absolute;left: 40%;top: 40%;border: #004095 solid 1px;width: 300px;height: 150px;background-color: #ffffff;z-index: 11;color: #fff;display: none;">
                    <div style="width: 100%;height: 25px;text-align: center;line-height: 25px;background-color: #004095;">
                        <span>提示</span><span style="float: right;margin-right: 3px;" id="cancelOne"
                            @click="cancelOne()">X</span>
                    </div>
                    <p style="color: #000;text-align: center;">是否确定删除门禁记录?</p>
                    <div style="text-align: center;margin-top: 45px;">
                        <button style="background-color: #004095;color: #e5eef7;margin-left: -5px;">确定</button>
                        <button id="cancel" @click="cancel()" style="margin-left: 50px;">取消</button>
                    </div>
                </div>
                <div id="userControl" @click="userControlA(this)"
                    style="outline:medium;position: absolute;top: 16.5%;left:43.3%;z-index: 10;width: 200px;height: 50px;background-color: #4b79f5;border-radius: 10px;font-size: 20px;color: #ffffff;font-weight: bold;text-align: center;line-height: 50px; display: none;">
                    <img src="./usemanage.png" alt=""
                        style="width: 30px;height: 30px;margin-top: 12px;vertical-align: top;">
                    <span style="vertical-align: middle;">用户管理</span>
                </div>

                <img id="imgOn" src="./lock.png" alt=""
                    style="position: absolute;top: 49.5%;left: 39.2%;width: 120px;height: 120px;">
                <img id="imgOff" src="./unlockingdevice.png" alt=""
                    style="position: absolute;top: 49.5%;left: 39.5%;width: 120px;height: 120px;display: none;">
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import axios from "axios";
import $ from 'jquery';
import bus from '@/utils/bus'
export default {
    data() {
        return {
            activeIndex: "0",
            idAdd: "",
            ipAddress: "",
            passworda: "",
            porta: "",
            entranceId: 0,
            jumpVariable: 1,
            KFList: [],
        };
    },
    computed: {
        routes() {
            // return this.$router.options.routes
            return this.$route.path;
        },
        ServeIp() {
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },

        mounted(){


this.init()
    },
    methods: {
        backToNext() {
            window.history.back()
        },
        init() {
            var tempdata = {
            }
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetStoresDoorForLeftMenuAsc', tempdata).then(
                success => {
                    console.log(success, '获取门禁库房列表接口-成功1111111111');
                    this.KFList = [];
                    let arr=success.data.data
                    this.KFList.push(...arr)
                    console.log(this.KFList);
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })
        },
        handleNodeClick(data) {
            let level = data.level;
            console.log(data, "点击了data111111111111");
            if (level == 2) {
                this.entranceGuardNavigation(1, data.id, data.dip, data.dpwd, data.dport, data.StoreName, data.label)
            }
        },
        /////////////////////////////////////////// 文件下载和二级导航中的li的函数
        entranceGuardNavigation(a, id, ip, password, port, storeName, label) {
            $("#StoreName").text(storeName)
            $("#DId ").text(id)
            $("#DIP").text(ip)
            $("#DName").text(label)
            $("#password").text(password)
            $("#port").text(port)
            $('#menutree').find('span').css({ color: '#eee' })
            $(a).find('span').css({ color: 'yellow' })
            $("#userControl").css("display", "block");
            $("#addPersonnel").css("display", "block");
            $("#historyToolsPeople").css("display", "block");
            $("#door").css("display", "block");
            this.idAdd = id;
            this.ipAddress = ip;
            this.passworda = password;
            this.porta = port;
        },
        //开门模块
        door() {
            console.log($("#DId").text());
            var indata = {
                "id": this.idAdd
            }
            // $.ajax({
            //     type: "get",
            //     url: 'http://' + this.ServeIp + ":" + this.ServePort + "/acs/openTheDoor",
            //     data: indata,
            //     dataType: "json",
            //     contentType: "application/json",
            //     success: function (response) {
            //         if (response.code == 200) {
            //             $("#imgOn").css("display", "none");
            //             $("#imgOff").css("display", "block");
            //             setInterval(function () {
            //                 $("#imgOn").css("display", "block");
            //                 $("#imgOff").css("display", "none");
            //             }, 1000 * 10);
            //             alert("开门成功")
            //         } else {
            //             alert(response.message)
            //         }
            //     }
            // });
            axios.get('http://' + this.ServeIp + ":" + this.ServePort + "/acs/openTheDoor?id=" + this.idAdd).then(
                success => {
                    let response = success.data
                    if (response.code == 200) {
                        $("#imgOn").css("display", "none");
                        $("#imgOff").css("display", "block");
                        setInterval(function () {
                            $("#imgOn").css("display", "block");
                            $("#imgOff").css("display", "none");
                        }, 1000 * 10);
                        this.$message.success("开门成功");
                        //alert("开门成功")
                    } else {
                        alert(response.message)
                    }
                },
                error => {
                    console.log(error, '返回失败的数据');
                })

        },
        historyToolsPeople() {
            console.log("as");
            $("#ownloadDounced").toggle();
        },
        //     ////////////////////////////////////////////////////下载记录
        history() {
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
            var url = 'http://' + this.ServeIp + ":" + this.ServePort + "/acs/getRecord?endTime=" + endTime + "T00:00:00" + "&id=" + this.idAdd + "&startTime=" + startTime + "T00:00:00" + "";
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
        },
        cancel() {
            $("#bounced").hide();
        },
        emptyRecord() {
            $("#bounced").show();
        },
        cancelOne() {
            $("#bounced").hide();
        },
        closeOne() {
            $("#employeeInformation").css("display", "none");
        },
        // ///////////////////////////////////////////////获取员工信息
        userControlA() {
            $("#employeeInformation").css("display", "block")
            let indata = {
                "data": this.idAdd,
                "pageNumber": "1",
                "pageSize": "12"
            }
            $.ajax({
                type: "post",
                url: 'http://' + this.ServeIp + ":" + this.ServePort + "/acs/getAllEmployee",
                data: JSON.stringify(indata),
                dataType: "json",
                contentType: "application/json",
                success: function (obj) {
                    this.jumpVariable = 1;
                    let page = obj.count;
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
                    if (obj.data == undefined) return;
                    for (let i = 0; i < obj.data.UserInfoSearch.UserInfo.length; i++) {
                        let toll = "";
                        if (obj.data.UserInfoSearch.UserInfo[i].name == "null" || obj.data.UserInfoSearch.UserInfo[i].name == "undefined") {
                            toll = ''
                        } else {
                            toll = obj.data.UserInfoSearch.UserInfo[i].name
                        }
                        let item = "<tr style='text-align:center' @click='delimitToDraw(this)'>";
                        item += "<td style='color:#000;font-size:16px;padding-right:3px'>" + (i + 1) + "</td>";
                        item += "<td style='color:#000;font-size:16px;'>" + toll + "</td>";
                        item += "<td style='color:#000;font-size:16px;'>" + obj.data.UserInfoSearch.UserInfo[i].employeeNo + "</td>";
                        item += "<td style='color:#000;font-size:16px;'><a href='#'  class='changed' @click='deletea(this," + obj.data.UserInfoSearch.UserInfo[i].employeeNo + ")'>删除</a>/<a href='#' class='changed' @click='amend(this," + obj.data.UserInfoSearch.UserInfo[i].employeeNo + ")'>修改</a></td>";
                        // item += "<td style='color:#000;font-size:16px;'><div style='background:#337ab7;color:#fff;width:30%;margin:0 auto' onclick='modify(this)'>修改</div></td>";
                        item += "</tr>";
                        $("#show").append(item);
                    }
                }
            });
        },
        // //////////////////////////////////////点击按钮跳转
        skip(a) {
            let jump = parseInt($(a).text());
            this.jumpVariable = jump;
            console.log(jumpVariable);
            modals();
            homefaber();
            discolor();
        },
        ////////////////////////////按钮组的显示
        modals() {
            if (page < 6) {
                $("#skip").empty();
                $("#skip").append('<li><a href="#" aria-label="Previous" onclick="skipLeft()"><span aria-hidden="true">&laquo;</span></a></li>')
                for (let index = 1; index < page + 1; index++) {
                    $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
                }
                $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight()"><span aria-hidden="true">&raquo;</span></a></li>')
            } else if (page > 2 + jumpVariable) {
                if (this.jumpVariable < 3) {
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
                    for (let index = this.jumpVariable - 2; index < jumpVariable; index++) {
                        $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
                    }
                    for (let index = jumpVariable; index < this.jumpVariable + 3; index++) {
                        $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
                    }
                    $("#skip").append('<li><a href="#">...</a></li>')
                    $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight()"><span aria-hidden="true">&raquo;</span></a></li>')
                }
            } else if (page == this.jumpVariable + 2 || page < this.jumpVariable + 2) {
                $("#skip").empty();
                $("#skip").append('<li><a href="#" aria-label="Previous" onclick="skipLeft()"><span aria-hidden="true">&laquo;</span></a></li>')
                for (let index = page - 4; index < page + 1; index++) {
                    $("#skip").append('<li><a href="#" onclick="skip(this,' + page + ')">' + index + '</a></li>')
                }
                $("#skip").append('<li><a href="#" aria-label="Next" onclick="skipRight()"><span aria-hidden="true">&raquo;</span></a></li>')
            }

        },
        //////////////////点击按钮组发送的请求在显示到页面中
        homefaber() {
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
                    if (obj.data == undefined) return;
                    for (let i = 0; i < obj.data.UserInfoSearch.UserInfo.length; i++) {
                        let item = "<tr style='text-align:center' @click='delimitToDraw(this)'>";
                        item += "<td style='color:#000;font-size:16px;padding-right:3px'>" + (i + 1) + "</td>";
                        item += "<td style='color:#000;font-size:16px;'>" + obj.data.UserInfoSearch.UserInfo[i].name + "</td>";
                        item += "<td style='color:#000;font-size:16px;'>" + obj.data.UserInfoSearch.UserInfo[i].employeeNo + "</td>";
                        item += "<td style='color:#000;font-size:16px;'><a href='#'  class='changed' @click='deletea(this," + obj.data.UserInfoSearch.UserInfo[i].employeeNo + ")'>删除</a>/<a href='#' class='changed' @click='amend(this," + obj.data.UserInfoSearch.UserInfo[i].employeeNo + ")'>修改</a></td>";
                        // item += "<td style='color:#000;font-size:16px;'><div style='background:#337ab7;color:#fff;width:30%;margin:0 auto' onclick='modify(this)'>修改</div></td>";
                        item += "</tr>";
                        $("#show").append(item);
                    }
                }
            })
        },
        ////////////////////////点击按钮组使其高亮显示
        discolor() {
            let son = $("#skip").children()
            for (let index = 0; index < son.length; index++) {
                let jumpVariablea = parseInt(son.eq(index).text());
                if (jumpVariablea == jumpVariable) {
                    son.eq(index).children().css({ "background": "#0049a5", "color": "#ffffff" })
                }
            }
        },
        ///////////////////////////按钮组上一页
        skipLeft() {
            if (this.jumpVariable == 1) {
                return
            }
            this.jumpVariable = this.jumpVariable - 1;
            modals();
            homefaber();
            discolor();

        },
        /////////////////////////////按钮组下一页
        skipRight() {
            if (this.jumpVariable == page) {
                return
            }
            this.jumpVariable = this.jumpVariable + 1;
            modals();
            homefaber();
            discolor();

        },
        ///////////////////////////////////////////////////////点击员工信息时高亮显示
        delimitToDraw(a) {
            $("tr").css("background-color", "#fff");
            $(a).css("background-color", "#d9edf7");
        },
        ////////////////////////////////////////////////删除员工信息
        deletea(a, b) {
            console.log("111111111111123456787677777");
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

        },
        addPersonnel() {
            //////////////////////////////////////////////////添加员工信息
            $("#addName").val('');
            $("#file").val('');

            $("#addEmployees").css("display", "block");
            $("#storage").css("display", "block");
            $("#storageOne").css("display", "none");
            $("#addPassword").val('');
            $("#addName").val('');
            $("#diamondO").text('添加');
            $(".delectImg").css("background", "url(/kfdhview/To_upload_pictures.png)")


        },
        shutDown() {
            $("#addEmployees").css("display", "none");
            $("#ownloadDounced").css("display", "none");
            $("#addmodify").css("display", "none");
        },
        storage(e) {
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
        },
        //////////////////////////////////////////////修改
        modify(a) {
            $("#addEmployees").css("display", "block");
            $("#addName").val($($(a).parent().prev().prev().prev()).text());
            $("#addPassword").val($($(a).parent().prev().prev()).text());
        },
        /////////////////////////////////////////////上传图片
        gome(target) {
            fileSize = target.files[0].size;
            var size = fileSize / 1024;
            if (size > 200) {
                alert("附件不能大于200kb");
                target.value = "";
                return
            }
        },
        fileChangea(target) {
            fileSize = target.files[0].size;
            var size = fileSize / 1024;
            if (size > 200) {
                alert("附件不能大于200kb");
                target.value = "";
                return
            }
        },
        /////////////////////////////////////显示选中的图片
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        gome(obj) {
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
        },
        //////////////////////////////////修改员工
        amend(a, b) {
            let c = $(a).parents("tr").children().eq(1).text()
            $("#addName").val(c);
            $("#file").val('');
            $("#diamondO").text('修改');
            $("#storage").css("display", "none");
            $("#storageOne").css("display", "block");
            $("#addmodify").css("display", "block");
            $("#addEmployees").css("display", "block");
            $(".delectImg").css("background", "url(/kfdhview/To_upload_pictures.png)")
            storageB = b
        },
        storageOne() {
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
                return showmsg("请输入用户名")
                var indata = {
                    "acsId": idAdd,
                    "employeeFaceImageName": fileVal,
                    "employeeNo": storageB,
                }
            } else if ($("#addName").val() !== '' && fileVal !== "null") {
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
        }
    }
};



</script>

<style  scoped lang="less">
.mainviewone {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('~@/assets/a06_znmj/pic.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    /* 
    overflow: hidden;
    
    background-repeat: no-repeat;
    min-height: calc(100vh - 7vh);  */
}

li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/deep/.znmjclass .el-menu {
   height: 100% !important;
    background-color: white !important;
    color: black;
    // min-height: calc(100% - 0px);
    z-index: 0;
}

/deep/.znmjclass .el-menu-item {
    min-width: 0px !important;
    background-color: white !important;
    color: black !important;
}

/deep/.znmjclass .el-submenu__title:hover {
    background-color: white !important;
    color: black !important;
}

.znmjclass .el-menu-item:hover {
    background-color: white;
    color: black;
}

.znmjclass .el-footer {
    background-color: white;
    color: black;
    line-height: 60px;
    text-align: center;
    z-index: 0;
}

.znmjclass i {
    background-color: white;
    color: black;
}

/deep/.znmjclass .el-submenu__title {
    background-color: white !important;
    color: black !important;
}

/deep/.znmjclass .el-submenu__title i {
    background-color: white;
    color: black !important;
}

.myfooter {
    background-color: white;
    color: black;
}

.znmjclass li span {
    color: #000 !important;
}

a {
    color: #bdc3d3;
    text-decoration: none;
}

a:hover {
    color: #bdc3d3;
    text-decoration: none;
}


/* a:visited {
    color: #bdc3d3
} */

#msgbox {
    position: absolute;
    z-index: 99;
    display: none;
    border: 0;
    background: #036ff6;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    filter: alpha(Opacity=80);
    -moz-opacity: 0.5;
    opacity: 0.7;
    border-radius: 20px;
    line-height: 50px;
}

/deep/#employeeInformation {
    display: none;
    background-color: #fff;
    color: 000;
    position: absolute;
    right: 15%;
    top: 8%;
    width: 80%;
    height: 82%;
    border-radius: 12px;
    z-index: 11;
}

#addPersonnel {
    display: none;
    outline: medium;
    width: 200px;
    height: 50px;
    background-color: #4b79f5;
    border-radius: 10px;
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    line-height: 43px;
    float: left;
    margin: 20px;
}

.closeOne {
    float: right;
    margin: 20px;
    font-size: 18px;
    color: #000;
}

li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#show {
    list-style: none;
    width: 100%;
}

#ownloadDounced {
    position: absolute;
    top: 40%;
    left: 40%;
    height: 200px;
    width: 400px;
    z-index: 12;
    background-color: #fff;
    text-align: center;
    border: 1px solid #004095;
    display: none;
}

#addEmployees {
    position: absolute;
    top: 30%;
    left: 40%;
    height: 300px;
    width: 400px;
    z-index: 12;
    background-color: #fff;
    text-align: center;
    border: 1px solid #004095;
    display: none;
    position: relative;
    z-index: 15;
}

#storage {
    margin-top: 3%;
    width: 15%;
    height: 10%;
    border: 1px solid #0049a5;
    color: #ffffff;
    background-color: #33cc66;
    line-height: 100%;
    background-color: #009519;
    outline: medium;
}

#history {
    margin-top: 3%;
    width: 15%;
    height: 10%;
    border: 1px solid #0049a5;
    color: #ffffff;
    background-color: #33cc66;
    line-height: 100%;
    background-color: #009519;
}

#show tr {
    height: 50px;
}

#skip {
    // margin-top: -0.05%;
    margin: 0;
    padding: 0;
    margin-left: 4%;
    display: flex;
}

#skip li {
    list-style: none;
    width: 40px;
}

.pages {
    // position: absolute;
    // bottom: 2.2%;
    // left: 2.8%;
}

.changed:visited {
    color: rgb(97, 95, 97);
}

.changed:hover {
    color: rgb(165, 19, 19);
}

.el-menu-demo-wsc {

    .el-submenu__title {
        // padding:0;
        // padding:0 10px !important;
        height: 35px !important;
        line-height: 35px !important;

        i {
            color: #909399;
        }
    }

    .el-menu-item {
        height: 35px;
        line-height: 35px;

    }

    .el-menu--inline {
        .el-menu-item {
            //   padding:0 25px !important;
        }
    }
}
</style>