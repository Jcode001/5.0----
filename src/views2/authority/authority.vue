﻿<template>
    <div style="width:100%;height:100vh">
        <div style="width: 90%;background-color: darkblue;margin: 0 auto;padding-top: 1% ;">
        <!-- 左侧导航栏 start-->
        <div id="Left_navigation_bar">
            导航
        </div>
        <div class="Right_con">
            <div class="downMenu">
                <select id="theMenu"> 

                </select>
                <div id="PermissionsModule">
                    <p>全选所有权限<input type="checkbox" @change="selectAllAuthority()"></p>
                    <p>全选所有授权<input type="checkbox" @change="selectAllAuthorization()"></p>
                </div>
            </div>
            <div id="authoritys"></div>
        </div>
        </div>
        <el-button @click="showData()">提交</el-button>
    </div>
</template>
<script>
import axios from "axios";
import $ from "jquery"
export default {
    data() {
        return {
            indata:{
            "code": 200,
            "data": [{
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 2,
                            "text": "添加门禁",
                            "haveAuthority": false
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 3,
                            "text": "下载门禁excel记录",
                            "haveAuthority": false
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": false,
                    "haveAuthorizationAuthority": false,
                    "id": 1,
                    "text": "门禁模块",
                    "haveAuthority": false
                },
                {
                    "nodes": [{
                        "currentRoleHaveAuthorizationAuthority": false,
                        "haveAuthorizationAuthority": false,
                        "id": 5,
                        "text": "查看大数据页面",
                        "haveAuthority": false
                    }],
                    "currentRoleHaveAuthorizationAuthority": false,
                    "haveAuthorizationAuthority": false,
                    "id": 4,
                    "text": "大数据模块",
                    "haveAuthority": false
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 7,
                            "text": "查询设备",
                            "haveAuthority": false
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 8,
                            "text": "获取设备",
                            "haveAuthority": false
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 9,
                            "text": "下载设备excel数据",
                            "haveAuthority": false
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 7,
                            "text": "查询设备",
                            "haveAuthority": false
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 8,
                            "text": "获取设备",
                            "haveAuthority": false
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 9,
                            "text": "下载设备excel数据",
                            "haveAuthority": false
                        }, {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 7,
                            "text": "查询设备",
                            "haveAuthority": false
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 8,
                            "text": "获取设备",
                            "haveAuthority": false
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": false,
                            "id": 9,
                            "text": "下载设备excel数据",
                            "haveAuthority": false
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": false,
                    "haveAuthorizationAuthority": false,
                    "id": 6,
                    "text": "设备模块",
                    "haveAuthority": false
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": false,
                            "id": 11,
                            "text": "查询摄像头",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": false,
                            "haveAuthorizationAuthority": true,
                            "id": 12,
                            "text": "更新摄像头",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": false,
                            "id": 13,
                            "text": "添加摄像头",
                            "haveAuthority": false
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 10,
                    "text": "摄像头模块",
                    "haveAuthority": false
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 15,
                            "text": "为角色绑定权限",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 16,
                            "text": "权限管理页面",
                            "haveAuthority": true
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 14,
                    "text": "权限模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 18,
                            "text": "修改角色",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 19,
                            "text": "删除角色",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 20,
                            "text": "查询用户创建的角色",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 21,
                            "text": "添加角色",
                            "haveAuthority": true
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 17,
                    "text": "角色模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 23,
                            "text": "添加或更新自定义设备",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 24,
                            "text": "查询设备",
                            "haveAuthority": true
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 22,
                    "text": "自定义设备模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                        "currentRoleHaveAuthorizationAuthority": true,
                        "haveAuthorizationAuthority": true,
                        "id": 26,
                        "text": "查看智能灯光页面",
                        "haveAuthority": true
                    }],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 25,
                    "text": "智能灯光模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                        "currentRoleHaveAuthorizationAuthority": true,
                        "haveAuthorizationAuthority": true,
                        "id": 28,
                        "text": "查看十二防页面",
                        "haveAuthority": true
                    }],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 27,
                    "text": "十二防模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 30,
                            "text": "修改角色",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 31,
                            "text": "删除角色",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 32,
                            "text": "添加用户",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 33,
                            "text": "查看首页",
                            "haveAuthority": true
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 29,
                    "text": "用户模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 35,
                            "text": "查询录像机",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 36,
                            "text": "删除录像机",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 37,
                            "text": "查询所有录像机",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 38,
                            "text": "添加录像机",
                            "haveAuthority": true
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 34,
                    "text": "录像机模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                        "currentRoleHaveAuthorizationAuthority": true,
                        "haveAuthorizationAuthority": true,
                        "id": 40,
                        "text": "查看视频监控页面",
                        "haveAuthority": true
                    }],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 39,
                    "text": "视频监控模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 42,
                            "text": "更新库房数据",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 43,
                            "text": "删除库房",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 44,
                            "text": "获取库房列表",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 45,
                            "text": "添加库房",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 46,
                            "text": "获取库房包含控制器列表",
                            "haveAuthority": true
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 41,
                    "text": "库房模块",
                    "haveAuthority": true
                },
                {
                    "nodes": [{
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 48,
                            "text": "查询库房信息",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 49,
                            "text": "修改库房导航信息",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 50,
                            "text": "删除库房导航信息",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 51,
                            "text": "添加库房导航信息",
                            "haveAuthority": true
                        },
                        {
                            "currentRoleHaveAuthorizationAuthority": true,
                            "haveAuthorizationAuthority": true,
                            "id": 52,
                            "text": "查看库房导航页面",
                            "haveAuthority": true
                        }
                    ],
                    "currentRoleHaveAuthorizationAuthority": true,
                    "haveAuthorizationAuthority": true,
                    "id": 47,
                    "text": "库房导航模块",
                    "haveAuthority": true
                }
            ],
            "message": "成功"
            },
            jsonData:[]
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
    mounted() {
      this.init();
    },
    methods: {
        init(){
            let myurl='http://' + this.ServeIp + ":" + this.ServePort + "/role/list"
            console.log(myurl, 'myurl');
            $.ajax({
                type: "GET",
                url: myurl,
                success: function(obj) {
                    console.log(JSON.stringify(obj), '获取接口-成功');
                    for (let index = 0; index < obj.data.length; index++) {
                        $("#theMenu").append("<option value='" + obj.data[index].id + "'>" + obj.data[index].name + "</option>");
                    }

                }
            });
            let indata=this.indata;
            for (let i = 0; i < indata.data.length; i++) {
                let authority = indata.data[i];
                let permissions = "<div  class='permissions' id='permissions" + (i + 1) + "'>"
                permissions += "<div name=" + authority.id + "  class='left_content checked_box' id='left_content" + i + "'>"
                if (authority.currentRoleHaveAuthorizationAuthority == true) {
                    if (authority.haveAuthorizationAuthority == true) {
                        permissions += "<input type='checkbox' checked='true' @change=\"cbchange()\">";
                    } else {
                        permissions += "<input type='checkbox' @change=\"cbchange()\">";
                    }
                    if (authority.haveAuthority == true) {
                        permissions += "<input type='checkbox' checked='true' @change=\"cbchange()\">";
                    } else {
                        permissions += "<input type='checkbox' @change=\"cbchange()\">";
                    }
                    permissions += "<span>" + authority.text + "</span>";
                }


                permissions += "</div>";
                permissions += "<div class='right_content checked_box' id='right_content" + i + "'>"
                for (let n = 0; n < authority.nodes.length; n++) {
                    let sonAuthority = authority.nodes[n];
                    permissions += "<div name=" + sonAuthority.id + " >"

                    if (sonAuthority.currentRoleHaveAuthorizationAuthority == true) {
                        if (sonAuthority.haveAuthorizationAuthority == true) {
                            permissions += "<input type='checkbox' checked='true' @change=\"cbchange()\">";
                        } else {
                            permissions += "<input type='checkbox' @change=\"cbchange()\">";
                        }
                        if (sonAuthority.haveAuthority == true) {
                            permissions += "<input type='checkbox' checked='true' @change=\"cbchange()\">";
                        } else {
                            permissions += "<input type='checkbox' @change=\"cbchange()\">";
                        }
                        permissions += "<span >" + sonAuthority.text + "</span>";
                    }

                    permissions += "</div>";

                }
                permissions += "</div>";
                permissions += "<p style='background-color: #646464;display: inline-block;width:90%;height:1px;'></p>";
                permissions += "</div>";


                $("#authoritys").append(permissions);
                $(".left_content").css({ "float": "left", "width": "13%", "height": "100 %" });
                $(".right_content").css({ "float": "left", "width": "87%" });
                $(".right_content").find("div").css({ "display": "inline-block", "float": "left", "margin-right": "10px", "width": "23%" });
                console.log($("#permissions" + (i + 1) + "").find("input").val());
                if ($("#permissions" + (i + 1) + "").find("input").val() == undefined) {
                    $("#permissions" + (i + 1) + "").remove()
                }
                }
        },
        showData(){
            this.jsonData.length = 0;
            for (let i = 0; i < $("#authoritys").children("div").length; i++) {
                let authorityDiv = $("#authoritys").children("div").eq(i);
                this.getData($(authorityDiv).children("div").eq(0));

                let authoritySonNode = $(authorityDiv).children("div").eq(1);

                for (let v = 0; v < $(authoritySonNode).children().length; v++) {
                    this.getData($(authoritySonNode).children().eq(v));
                }
            }
            console.log(this.jsonData);
        },
        getData(authorityDiv) {
            let roleAuthorityId = $(authorityDiv).attr("name");
            let authorityNextLevel = 0;
            let json = {};
            for (let k = 0; k < $(authorityDiv).children().length - 1; k++) {
                let authorityInput = $(authorityDiv).children().eq(k);

                if (k == 0) {
                    if (!$(authorityInput).prop('checked')) {
                        return;
                    }
                } else {
                    authorityNextLevel = $(authorityInput).prop('checked') == true ? 1 : 0;
                }
            }
            json.authorityId = roleAuthorityId;
            json.authorityNextLevel = authorityNextLevel;
            //===========================================================
            //===============   这个roleid要用户自己选择角色   ================
            json.roleId = 1;
            this.jsonData.push(json);
        },
        selectAllAuthority() {
            console.log("selectAllAuthority");
            if ($("#selectAllAuthority").prop("checked") == true) {
                $(".checked_box").find("input:even").prop('checked', true)


            } else {
                $(".checked_box").find("input").prop('checked', false)
            }
        },
        selectAllAuthorization() {
            console.log("selectAllAuthorization");
            let flag = this.checked;
            $("input:checkbox").each(function(i, checkbox) {
                // console.log($(checkbox).attr("id"));

                if ($(checkbox).attr("id") == 'selectAllAuthority') {

                } else if ($(checkbox).attr("disabled") == undefined) {
                    checkbox.checked = flag;
                }
            });
        },
        cbchange() {
            console.log("cbchange");
            let isChecked = this.checked;
            if ($(this).next().attr("type") != undefined) {
                if (isChecked == false) {
                    console.log($(this).next().html());
                    $(this).parent().children().eq(1).attr("checked", false)
                }
            } else if ($(this).prev().attr("type") != undefined) {
                console.log(isChecked);
                if (isChecked == true) {
                    console.log($(this).parent().eq(0).html());
                    $(this).prev().prop("checked", "true")
                }
            }
        }
    }
}
</script>
<style scoped>
#Left_navigation_bar {
    float: left;
    width: 15%;
    height: 100%;
    background-color: aqua;
    clear: none;
}

#left_content {
    float: left;
    width: 200px;
    background: #231c85;
    height: 100%;
}

#permissions {
    width: 100%;
    background-color: rgb(174, 0, 255);
    height: 100%;
}

#right_content {
    float: right;
    width: 87%;
    background-color: rgb(0, 255, 98);
    height: 100%;
}

.Right_con {
    float: right;
    width: 85%;
}

.downMenu {
    width: 100%;
    height: 70px;
}

.Left_cont {
    margin: 20px 1% 40px 3%;
}

.right_cont {
    margin: 20px 1%;
}

#showData {
    z-index: 100;
}

#theMenu {
    width: 15%;
    height: 40px;
    border: 1px solid #e6eef8;
    border-radius: 6px;
    outline: none;
    margin: 1% 0 0 5%;
}

#authoritys {
    margin-top: 1%;
}

#PermissionsModule {
    position: absolute;
    right: 7%;
    top: 5%;
}
</style>