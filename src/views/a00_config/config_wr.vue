<template>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header style="text-align: left; font-size: 12px;background-color: white;">
    <el-breadcrumb separator-class="el-icon-arrow-right"
    style="display: inline-block;
    font-size: 1rem;
    text-decoration: none;
    color: #000000;
    border-bottom: 0.125rem solid #258AD9;
    "
    >
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>系统设置</el-breadcrumb-item> -->
        <el-breadcrumb-item>设备中心</el-breadcrumb-item>
    </el-breadcrumb></el-header>
    <el-container style="height: calc(100vh - 120px);">
    <el-aside style="width:10vw;background-color: rgb(238, 241, 246);border-radius:12px 12px 0 0;">
        <el-header style="text-align: left; border-radius:12px 12px 0 0;">
            <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png" />
 <span style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:1vw;line-height: 100%;padding-left: 10px;">库房列表</span>
        </el-header>
        <el-main style="border: 1px solid rgb(103, 146, 240);height:34vw;background-color: #fff; overflow-y: auto;"  class="newliebiao">
            <!-- <el-scrollbar style="margin-top:1.2vw;" wrap-class="scrollbar-wrapper">
                <el-tree style="font-size:22px;" :data="StoreList" :props="defaultProps" highlight-current
                    @node-click="StoreshandleNodeClick"></el-tree>
            </el-scrollbar> -->
            <el-menu style="background-color: #fff;" :default-active="activeIndex" >
                <template v-for="(item) in StoreList">
                    <el-submenu v-if="item.children" :key="item.id" :index="(item.id+1).toString()">
                    <template slot="title">
                        <i class="el-icon-office-building"></i>
                        <!-- {{ item.label }} -->
                        <el-tooltip placement="top">
                        <div slot="content"> {{ item.label }}</div>
                       <span >{{ item.label }}  </span>
                     </el-tooltip>
                    </template>
                    <el-menu-item
                        v-for="(items, key) in item.children"
                        :key="key"
                        @click="StoreshandleNodeClick(items)"
                    >
                         <i class="el-icon-monitor"></i>
                         <el-tooltip placement="top">
                        <div slot="content"> {{ items.label }}</div>
                       <span style="width:2vw;">{{ items.label }}  </span>
                     </el-tooltip>
             
                    </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="item.id">
                        <i class="el-icon-office-building"></i>
                        <!-- {{ item.label }} -->
                        <el-tooltip placement="top">
                        <div slot="content"> {{ item.label }}</div>
                       <span >{{ item.label }}  </span>
                    </el-tooltip>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-main>

    </el-aside>
    
    <el-container>
      <el-main  class="mainviewthree">
        <div style="position:absolute;right:0%;top:0%;width:100%;height:100%;background-color:#e5eef7;">
            <div
                style="align-items: center; display: flex;position:absolute;left:3%;top:1.5%;width:94%;height:40px;font-size:25px;line-height:40px">
                <span>设备中心</span>
                <span style="position:absolute;right:13%;">
                    <el-checkbox v-model="selectallflag" @change="selectall()">全选</el-checkbox>
                </span>
                <el-button type="primary" round @click="btnchange" style="position:absolute;right:3%;width:8%;">更新</el-button>
            </div>
            <div
                style="border: 1px solid rgb(103, 146, 240);;padding:0.5vw;position:absolute;left:2.5%;top:10%;width:95%;height:86%;overflow-y:auto;background-color: #ffffff;">

                <fieldset id="csxjscsytj"></fieldset>
                <fieldset id="jkfhytj"></fieldset>
                <fieldset id="bgsxfj"></fieldset>
                <fieldset id="csxkqjhj"></fieldset>
                <fieldset id="jsj"></fieldset>
                <fieldset id="csj"></fieldset>
                <fieldset id="ptytj"></fieldset>
                <fieldset id="hwkt"></fieldset>
                <fieldset id="jmkt"></fieldset>
                <fieldset id="zndg"></fieldset>
                <fieldset id="znddcl"></fieldset>
                <fieldset id="kqzlycy"></fieldset>
                <fieldset id="hjcx"></fieldset>
                <fieldset id="lsmk"></fieldset>
                <fieldset id="ygmk"></fieldset>
                <fieldset id="hwsj"></fieldset>
                <fieldset id="znggtcq"></fieldset>
                <fieldset id="zdjd"></fieldset>
                <fieldset id="fhqs"></fieldset>
                <!-- <fieldset id="dxmk"></fieldset> -->
                <!-- <fieldset id="bjzj"></fieldset> -->
                <!-- <fieldset id="zdysb"></fieldset> -->
            </div>
        </div>
      </el-main>
      <el-footer class="myfooter">
           <div style="  font-size:15px;color:#036ff6">
                <span style="display:none;">库房索引：<span id="StoreId"></span></span>
                &emsp;&emsp;&emsp;&emsp;库房名称：<span id="StoreName"></span>
                <span  style="display:none;">设备索引：<span id="ACId"></span></span>
                &emsp;&emsp;&emsp;&emsp;设备名称：<span id="ACName"></span>
           
                <!-- <span><span id="AcLx"></span></span> -->
          
            </div>
      </el-footer>
    </el-container>
</el-container>
</el-container> 
</template>
<script>
import { Loading } from 'element-ui';
import Logo from '@/layout/components/Sidebar/Logo.vue';
import { mapGetters } from 'vuex'
import axios from 'axios'
import bus from '@/utils/bus'
import $ from 'jquery'
export default {
    data() {
        return {
            activeIndex:"0",
            selectallflag:false,
            StoreList: [
                {
                    label: '数据加载中。。。',
                    children: []
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }
    },
    mounted() {
            this.initGetStoresForLeftMenuShow();
            this.onInit($('#csxjscsytj'), "除酸型除湿加湿一体机", 16, "");
            this.onInit($('#jkfhytj'), "健康防护一体机", 16, "");
            this.onInit($('#bgsxfj'), "壁挂式新风机", 16, "");
            this.onInit($('#csxkqjhj'), "除酸性空气净化机", 12, "");
            this.onInit($('#jsj'), "加湿机", 12, "");
            this.onInit($('#csj'), "除湿机", 12, "");
            this.onInit($('#ptytj'), "普通一体机", 12, "");
            this.onInit($('#hwkt'), "红外空调", 16, "");
            this.onInit($('#jmkt'), "精密空调", 16, "");
            this.onInit($('#zndg'), "智能灯光控制器", 8, "");
            this.onInit($('#znddcl'), "智能电动窗帘", 12, "");
            this.onInit($('#kqzlycy'), "空气质量云测仪", 33, "");
            this.onInit($('#hjcx'), "环境超限", 8, "");
            this.onInit($('#lsmk'), "漏水模块", 16, "");
            this.onInit($('#ygmk'), "烟感模块", 24, "");
            this.onInit($('#hwsj'), "红外双鉴", 16, "");
            this.onInit($('#znggtcq'), "智能光感探测器", 12, "");
            this.onInit($('#zdjd'), "震动节点", 8, "");
            this.onInit($('#fhqs'), "防害驱鼠", 8, "");
    },
    computed: {
        ServeIp() {
            console.log(this.$store, "1231231231321");
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },
    methods: {
        initGetStoresForLeftMenuShow() {
            console.log('11111111111');
            var arr = {
                "acLx": 0
            }
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetStoresACSForLeftMenuAsc', arr).then(
                success => {
                    console.log(success, '获取控制器信息-成功');
                    console.log(success.data.data, '获取控制器信息-成功');
                    this.StoreList = [];
                    this.StoreList.push(...success.data.data);
                },
                error => {
                    console.log(error, '获取控制器信息--返回失败的数据');
                })
        },
        StoreshandleNodeClick(data) {//
            console.log(data, 'data.StoreshandleNodeClick');
            if (data.children != undefined) 
            {
                this.StoreSelect=data;
                return;
            }
            console.log(this.StoreSelect, 'this.StoreSelect', "左键按下啦啦啦啦啦");
            console.log(data.id, data.label, 'data.id, data.label', "左键按下啦啦啦啦啦");
            console.log(data.AcLx, data.HostName, data.HttpPort, 'data.AcLx, data.HostName, data.HttpPort', "左键按下啦啦啦啦啦");
            $('#StoreId').text(data.StoreId);
            $('#StoreName').text(data.StoreName);
            $('#ACId').text(data.id);
            $('#ACName').text(data.label);
            $('#SostName').text(data.HostName);
            $('#SttpPort').text(data.HttpPort);
            // $('#AcLx').text(data.AcLx);
            this.showAuto()
        },
        onInit(obj, name, count, id) {
            obj.append("<legend>" + name + "</legend>");
            for (var i = 1; i < count + 1; i++) {
                obj.append('<input type="checkbox" id=' + id + i + '>' + (i) + '#&ensp;&ensp;');
            }
        },
        onInitchoose(obj, name, count, data) {
            $(obj).append("<legend>" + name + "</legend>");
            for (var i = 1; i < count + 1; i++) {
                var isChoose = data[i];
                if (isChoose == "true") {
                    $(obj).append('<input type="checkbox" checked id=' + i + '>' + (i) + '#&ensp;&ensp;');
                } else {
                    $(obj).append('<input type="checkbox" id=' + i + '>' + (i) + '#&ensp;&ensp;');
                }
            }
        },
        addDevice(data, node, name) {
            $(node).empty();
            for (var i = 1; i <= 50; i++) {
                // console.log(data);
                if (data[i] == undefined) {
                    this.onInitchoose(node, name, (i - 1), data)
                    break;
                }
            }

        },
        showAuto() {
            // var indata={
            //         "warehouseId": $('#StoreId').text(),
            //         "controllerId": $('#ACId').text()
            //     }
            // console.log(indata, 'indata');
            axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/settingDeviceShow/getAll?warehouseId='+ $('#StoreId').text()+"&controllerId="+$('#ACId').text(),{headers: {'Content-Type': 'application/json'}}).then(
                success => {
                    let obj=success.data;
                    console.log(obj, '返回的数据');
                    console.log("全选啦啦啦啦啦绿绿绿绿");
                    if (obj.code == 666) {
                        // alert("该库房没有数据,请选择需要的设备并点击修改")
                        let flag = this.selectallflag;
                        $('input:checkbox').each(function (i, checkbox) {
                            checkbox.checked = flag;
                        });
                        return;
                    }
                    console.log("全选啦啦啦啦啦绿绿绿绿");
                    this.addDevice(obj.data.devices.CSXJSCSYTJ,$("#csxjscsytj"), "除酸性除湿加湿一体机");
                    this.addDevice(obj.data.devices.JKFHYTJ, $("#jkfhytj"), "健康防护一体机");
                    this.addDevice(obj.data.devices.BGSXFJ, $("#bgsxfj"), "壁挂式新风机");
                    this.addDevice(obj.data.devices.CSXKQJHJ, $("#csxkqjhj"), "除酸性空气净化机");
                    this.addDevice(obj.data.devices.JSJ, $("#jsj"), "加湿机");
                    this.addDevice(obj.data.devices.CSJ, $("#csj"), "除湿机");
                    this.addDevice(obj.data.devices.PTYTJ, $("#ptytj"), "普通一体机");
                    this.addDevice(obj.data.devices.HWKT, $("#hwkt"), "红外空调");
                    this.addDevice(obj.data.devices.JMKT, $("#jmkt"), "精密空调");
                    this.addDevice(obj.data.devices.ZNDG, $("#zndg"), "智能灯光控制器");
                    this.addDevice(obj.data.devices.ZNDDCL, $("#znddcl"), "智能电动窗帘");
                    this.addDevice(obj.data.devices.KQZLYCY, $("#kqzlycy"), "空气质量云测仪");
                    this.addDevice(obj.data.devices.HJCX, $("#hjcx"), "环境超限");
                    this.addDevice(obj.data.devices.LSMK, $("#lsmk"), "漏水模块");
                    this.addDevice(obj.data.devices.YGMK, $("#ygmk"), "烟感模块");
                    this.addDevice(obj.data.devices.HWSJ, $("#hwsj"), "红外双鉴");
                    this.addDevice(obj.data.devices.ZNGGTCQ, $("#znggtcq"), "智能光感探测器");
                    this.addDevice(obj.data.devices.ZDJD, $("#zdjd"), "震动节点");
                    this.addDevice(obj.data.devices.FHQS, $("#fhqs"), "防害驱鼠");
                    // addDevice(obj.data.devices.DXMK, $("#dxmk"), "短信模块");
                    // addDevice(obj.data.devices.BJZJ, $("#bjzj"), "预警主机");
                    // addDevice(obj.data.devices.ZDYSB, $("#zdysb"), "自定义设备");
                    },
                error => {
                    console.log(error, '返回失败的数据');
                })
            // $.ajax({
            //     type: "GET",
            //     url: 'http://' + this.ServeIp + ":" + this.ServePort + "/settingDeviceShow/getAll",
            //     data: {
            //         "warehouseId": $('#StoreId').text(),
            //         "controllerId": $('#ACId').text()
            //     },
            //     dataType: "json",
            //     contentType: "application/json",
            //     success: function (obj) {
            //         // console.log(obj.code);
          
            //     },
            //     error: function (obj) {
            //         console.log(obj)
            //     },
            // })
    
      },
      selectall() {
                let flag = this.selectallflag;
                $('input:checkbox').each(function (i, checkbox) {
                    checkbox.checked = flag;
                });
            },
      btnchange() {
                var devices = {}
                var CSXJSCSYTJ = {};
                var JKFHYTJ = {};
                var BGSXFJ = {};
                var CSXKQJHJ = {};
                var JSJ = {};
                var CSJ = {};
                var PTYTJ = {};
                var HWKT = {};
                var JMKT = {};
                var ZNDG = {};
                var ZNDDCL = {};
                var KQZLYCY = {};
                var HJCX = {};
                var LSMK = {};
                var YGMK = {};
                var HWSJ = {};
                var ZNGGTCQ = {};
                var ZDJD = {};
                var FHQS = {};
                // DXMK = {};
                // BJZJ = {};
                // ZDYSB = {};
                var custom = {
                    "warehouseId": $('#StoreId').html(),
                    "controllerId": $('#ACId').html(),
                    devices
                }
                $("#csxjscsytj").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        CSXJSCSYTJ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#jkfhytj").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        JKFHYTJ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#bgsxfj").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        BGSXFJ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#csxkqjhj").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        CSXKQJHJ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#jsj").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        JSJ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#csj").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        CSJ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#ptytj").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        PTYTJ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#hwkt").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        HWKT[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#jmkt").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        JMKT[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#zndg").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        ZNDG[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#znddcl").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        ZNDDCL[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#kqzlycy").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        KQZLYCY[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#hjcx").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        HJCX[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#lsmk").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        LSMK[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#ygmk").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        YGMK[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#hwsj").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        HWSJ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#znggtcq").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        ZNGGTCQ[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#zdjd").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        ZDJD[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                $("#fhqs").children().each(function (i, n) {
                    var obj = $(n);
                    if (obj[0].type == "checkbox") {
                        FHQS[obj[0].id] = "" + obj[0].checked; + ""
                    }
                });
                // $("#dxmk").children().each(function(i, n) {
                //     var obj = $(n);
                //     if (obj[0].type == "checkbox") {
                //         DXMK[obj[0].id] = "" + obj[0].checked; + ""
                //     }
                // });
                // $("#bjzj").children().each(function(i, n) {
                //     var obj = $(n);
                //     if (obj[0].type == "checkbox") {
                //         BJZJ[obj[0].id] = "" + obj[0].checked; + ""
                //     }
                // });
                // $("#zdysb").children().each(function(i, n) {
                //     var obj = $(n);
                //     if (obj[0].type == "checkbox") {
                //         ZDYSB[obj[0].id] = "" + obj[0].checked; + ""
                //     }
                // });
                devices['CSXJSCSYTJ'] = CSXJSCSYTJ;
                devices['JKFHYTJ'] = JKFHYTJ;
                devices['BGSXFJ'] = BGSXFJ;
                devices['CSXKQJHJ'] = CSXKQJHJ;
                devices['JSJ'] = JSJ;
                devices['CSJ'] = CSJ;
                devices['PTYTJ'] = PTYTJ;
                devices['HWKT'] = HWKT;
                devices['JMKT'] = JMKT;
                devices['ZNDG'] = ZNDG;
                devices['ZNDDCL'] = ZNDDCL;
                devices['KQZLYCY'] = KQZLYCY;
                devices['HJCX'] = HJCX;
                devices['LSMK'] = LSMK;
                devices['YGMK'] = YGMK;
                devices['HWSJ'] = HWSJ;
                devices['ZNGGTCQ'] = ZNGGTCQ;
                devices['ZDJD'] = ZDJD;
                devices['FHQS'] = FHQS;
                // devices['DXMK'] = DXMK;
                // devices['BJZJ'] = BJZJ;
                // devices['ZDYSB'] = ZDYSB;
                // console.log(JSON.stringify(custom));
                //  var indata=data;
                var indata = custom;
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/settingDeviceShow/update',indata,{headers: {'Content-Type': 'application/json'}}).then(
                success => {
                    let obj=success.data;
                    this.$message.success("操作成功");
                },
                error => {
                    console.log(error, '返回失败的数据');
                })
                // $.ajax({
                //     type: "POST",
                //     url: 'http://' + this.ServeIp + ":" + this.ServePort + "",
                //     data: (JSON.stringify()),
                //     dataType: "json",
                //     async: true,
                //     contentType: "application/json",
                //     success: function (obj) {
                       
                //     },
                //     error: function (obj) {
                //         console.log(obj)
                //     },
                //     beforeSend: function (params) {
                //         // let objDiv = $("#msgbox");
                //         // $(objDiv).css("display", "block");
                //         // $(objDiv).css("left", "50%");
                //         // $(objDiv).css("top", "5%");
                //         // $(objDiv).html("&emsp;&emsp;" + "正在更新...请稍等" + "&emsp;&emsp;");
                //         // t = setTimeout("hide()", 3000);
                //     }
                // })
            }
    }
}
</script>
<style scoped lang="less" >
.mainviewthree{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    // background: url('~@/assets/a07_zndg/qykzq/pic.png');
    // background-size:100% 100%;
    // background-repeat: no-repeat;

    /* 
    overflow: hidden;
    
    background-repeat: no-repeat;
    min-height: calc(100vh - 7vh);  */
}
/deep/.newliebiao .el-menu{
    height: 100% !important;
    background-color: white;
    color: black;
    min-height: calc(100% - 0px);
    z-index: 0;
  }

/deep/.newliebiao .el-menu-item{

    background-color: white;
    color: black;
  }
  .newliebiao .el-submenu__title:hover{
    background-color: white;
    color: black;
  }
  .newliebiao .el-menu-item:hover{
    background-color: white;
    color: black;
  } 
//   .newliebiao .el-footer {
//     background-color: white;
//     color: black;
//     line-height: 60px;
//     text-align: center;
//     z-index: 0;
//   }
  .newliebiao i{
    background-color: white;
    color: black;
  }
  /deep/.newliebiao .el-submenu__title{
    padding-left: 4px;
    background-color: white !important;
    color: black;
  }
  /deep/.newliebiao .el-submenu__title i {
    background-color: white !important;
    color: black  !important;;
  }
  /deep/.myfooter{
    background-color: rgb(229, 238, 247) !important;
    color: black  !important;
  }
  a {
        color: #bdc3d3;
        text-decoration: none;
      
    }

    a:hover {
        color: #bdc3d3;
        text-decoration: none;
    }

    a:visited {
        color: #bdc3d3
    }

    button:hover {
        transform: scale(0.9);
    }

    button:hover:after {
        transform: scale(1);
    }

    table {
        border-collapse: collapse;
        border: none;
    }

    th,
    td {
        border: #e6eef8 solid 2px;
        text-align: center;
        height: 3rem;
        font-size: 0.6rem;
    }

    #record {
        position: absolute;
        margin-top: 3.3rem;
        z-index: 1;
    }

    #record td {
        width: 7.53rem;
    }

    #title>tr {
        z-index: 100;
    }

    #title th {
        width: 7.53rem;
        background-color: #f5f6f7 !important;
    }
    li{
  white-space:nowrap;
overflow: hidden;
text-overflow:ellipsis; 
    }
</style>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>无人库房控制器设备管理</title>
    <script type="text/javascript" src="/assets/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/assets/js/jquery.md5.js"></script>
    <script type="text/javascript" src="/assets/js/jquery.cookie.min.js"></script>
    <style>
       
    </style>
    <script>
      


    <script>
        $(function () {
            $.ajax({
                type: "GET",
                url: "/warehouse/detailList",
                success: function (result) {
                    for (let index = 0; index < result.data.length; index++) {
                        var item = "<li class='active1' id='treenode1_" + result.data[index].warehouse.storeId + "'>";
                        item += "<span class='menu-text' name='" + result.data[index].warehouse.storeId + "'> " + result.data[index].warehouse.storeName + " </span>";
                        for (let i = 0; i < result.data[index].objectList.length; i++) {
                            item += "<ul class='warehouseNavigation'>";
                            item += "<li class='active' id='treenode_" + result.data[index].objectList[i].aCId + "' >";
                            item += "<span class='menu-text' name='" + result.data[index].objectList[i].aCId + "'> " + result.data[index].objectList[i].aCName + " </span>";
                            item += "</li>";
                            item += "</ul>";
                        }
                        item += "</li>";
                        $("#menutree").append(item);
                        $(".warehouseNavigation").css("display", "none")
                        $("#treenode1_" + result.data[index].warehouse.storeId + "").click(function () {
                            $(".warehouseNavigation").css("display", "none")
                            $(this).children("ul").css("display", "block")
                        })
                        for (let n = 0; n < result.data[index].objectList.length; n++) {
                            $("#treenode_" + result.data[index].objectList[n].aCId + "").click(function () {
                                $('#StoreId').text(result.data[index].objectList[n].storeId);
                                $('#StoreName').text(result.data[index].objectList[n].storeName);
                                $('#ACId').text(result.data[index].objectList[n].aCId);
                                $('#ACName').text(result.data[index].objectList[n].aCName);
                                $('#SostName').text(result.data[index].objectList[n].hostName);
                                $('#SttpPort').text(result.data[index].objectList[n].httpPort);
                                // $('#AcLx').text(result.data[index].objectList[n].acLx);
                                showAuto()
                            })
                        }

                    }
                }
            });
            
        })

       
        }
    </script>
</head>
