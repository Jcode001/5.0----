<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header style="text-align: left; font-size: 12px;background-color: white;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;
    font-size: 1rem;
    text-decoration: none;
    color: #000000;
    border-bottom: 0.125rem solid #258AD9;
    ">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>库房管理</el-breadcrumb-item> -->
        <el-breadcrumb-item>智能灯光</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>无人库房控制器</el-breadcrumb-item> -->
      </el-breadcrumb></el-header>
    <el-container style="height: calc(100vh - 120px);">
      <el-aside style="width:10vw;background-color: rgb(238, 241, 246);border-radius:12px 12px 0 0;">
        <el-header style="text-align: left; border-radius:12px 12px 0 0;">
          <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png" />
          <span
            style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:1vw;line-height: 100%;padding-left: 10px;">库房列表</span>
        </el-header>
        <el-main style="border: 1px solid rgb(103, 146, 240);height:37vw;background-color: #fff; overflow-y: auto;"
          class="zndgclass">
          <!-- <el-scrollbar style="margin-top:1.2vw;" wrap-class="scrollbar-wrapper">
                <el-tree style="font-size:22px;" :data="StoreList" :props="defaultProps" highlight-current
                    @node-click="StoreshandleNodeClick"></el-tree>
            </el-scrollbar> -->

          <!-- <initOnlist :props="aaa" ></initOnlist> -->
          <el-menu>
            <template v-for="(item) in StoreList">
              <el-submenu v-if="item.children" :key="item.id" :index="(item.id + 1).toString()">
                <template slot="title">
                  <i class="el-icon-office-building"></i>
                  <el-tooltip placement="top">
                    <div slot="content"> {{ item.label }}</div>
                    <span>{{ item.label }} </span>
                  </el-tooltip>
                </template>
                <el-menu-item v-for="(items, key) in item.children" :key="key" @click="StoreshandleNodeClick(items)">
                  <i class="el-icon-monitor"></i>
                  <el-tooltip placement="top">
                    <div slot="content"> {{ items.label }}</div>
                    <span style="width:2vw;">{{ items.label }} </span>
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
        <el-main class="mainviewthree">
          <div
            style="position:absolute;right:0%;top:0%;width:100%;height:100%;background-color:#e5eef7;border-radius:12px">
            <img style="position:absolute;width:100%;height:100%;" id="dataalarm"
              src="~@/assets/a07_zndg/qykzq/pic.png" />


            <div id="alloff" class="Turnoffwithoneclick"
              style="position:absolute;left:8%;top:11%;width:20%;height:20%;font-size:0.75rem;color:#036ff6;"
              @click="alloff()">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/all_off.png">
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1.4575rem">一键全关</span>
            </div>


            <div id="allon" class="Openoneclick"
              style="position:absolute;left:38%;top:11%;width:20%;height:20%;font-size:0.6875rem;color:#036ff6;"
              @click="allon()">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/all_on.png">
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1.4575rem">一键全开</span>

            </div>

            <div style="position:absolute;left:4.5%;top:42%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
              id="btnl1" class="lamphole" @click="btnl1">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_01.png">
              <img :src="lt1.img" style="position:absolute;left:50%;top:40%;width:40%;height:50%;" />
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;1</span>
              <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span id="dg1">{{
                this.lt1.name }}</span></span>
            </div>

            <div style="position:absolute;left:19.7%;top:42%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
              id="btnl2" class="lamphole" @click="btnl2">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_02.png">
              <img :src="lt2.img" style="position:absolute;left:50%;top:40%;width:40%;height:50%;" />
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;2</span>
              <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span id="dg2">{{
                this.lt2.name }}</span></span>
            </div>

            <div style="position:absolute;left:35.1%;top:42%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
              id="btnl3" class="lamphole" @click="btnl3">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_03.png">
              <img :src="lt3.img" style="position:absolute;left:50%;top:40%;width:40%;height:50%;" />
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;3</span>
              <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span id="dg3">{{
                this.lt3.name }}</span></span>
            </div>

            <div style="position:absolute;left:50.2%;top:42%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
              id="btnl4" class="lamphole" @click="btnl4">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_04.png">
              <img :src="lt4.img" style="position:absolute;left:50%;top:40%;width:40%;height:50%;" />
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;4</span>
              <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span id="dg4">{{
                this.lt4.name }}</span></span>
            </div>

            <div style="position:absolute;left:4.5%;top:70%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
              id="btnl5" class="lamphole" @click="btnl5">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_05.png">
              <img :src="lt5.img" style="position:absolute;left:50%;top:40%;width:40%;height:50%;" />
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;5</span>
              <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span id="dg5">{{
                this.lt5.name }}</span></span>
            </div>

            <div style="position:absolute;left:19.7%;top:70%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
              id="btnl6" class="lamphole" @click="btnl6">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_06.png">
              <img :src="lt6.img" style="position:absolute;left:50%;top:40%;width:40%;height:50%;" />
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;6</span>
              <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span id="dg6">{{
                this.lt6.name }}</span></span>
            </div>

            <div style="position:absolute;left:35.1%;top:70%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
              id="btnl7" class="lamphole" @click="btnl7">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_07.png">
              <img :src="lt7.img" style="position:absolute;left:50%;top:40%;width:40%;height:50%;" />
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;7</span>
              <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span id="dg7">{{
                this.lt7.name }}</span></span>
            </div>

            <div style="position:absolute;left:50.2%;top:70%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
              id="btnl8" class="lamphole" @click="btnl8">
              <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_08.png">
              <img :src="lt8.img" style="position:absolute;left:50%;top:40%;width:40%;height:50%;" />
              <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;8</span>
              <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span id="dg8">{{
                this.lt8.name }}</span></span>
            </div>

            <el-select id="DeviceID" v-model="DeviceID"
              style="position:absolute;right:4%;top:5%;width:25%;height:30px;border:1px solid #e6eef8;border-radius:6px;outline:none"
              @change="showAuto()">
              <!-- <option value="1" selected>1号智能灯光控制器</option>

                <option value="2">2号智能灯光控制器</option>
                <option value="3">3号智能灯光控制器</option> -->
              <el-option v-for="items in numberOfDevices" :value="items.value" :key="items.value" :label="items.name">{{
                items.name
              }}</el-option>
            </el-select>
          </div>
          <div style="font-size:17px;color:#036ff6;position:absolute;left:4%;bottom: 0%;">
            设备编号：<span id="datadeviceNo"></span>

            <span style="display:none;">
              &emsp;&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span></span>
            <span style="display:none;">库房索引：<span id="StoreId"></span></span>
            &emsp;&emsp;&emsp;&emsp;库房名称：<span id="StoreName"></span>
            <span style="display:none;">&nbsp;设备索引：<span id="ACId"></span></span>
            &emsp;&emsp;&emsp;&emsp;设备名称：<span id="ACName"></span>
            &emsp;&emsp;&emsp;&emsp;IP地址：<span id="HostName"></span>
            <span style="display:none;">端口：<span id="HttpPort"></span></span>
            <span style="display:none;"><span id="AcLx"></span></span>
            <span style="display:none;">请求方法：<span id="url"></span></span>
            <span style="display:none;">请求参数：<span id="jsonin"></span></span>
            <span style="display:none;"><span id="stime"></span></span>
          </div>

        </el-main>
        <el-footer class="myfooter">

        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { Loading } from "element-ui";
import Logo from "@/layout/components/Sidebar/Logo.vue";
import { mapGetters } from "vuex";
import axios from "axios";
import bus from "@/utils/bus";
// import initOnlist from "../../initOnlist.vue";
import $ from "jquery";
export default {
  //   components: { initOnlist },
  data() {
    return {
      activeIndex: 1,
      DeviceID: "0",
      aaa: "123456789",
      numberOfDevices: [],
      onOff: {
        on: "开",
        off: "关"
      },
      ltObj: {
        on: require("@/assets/a07_zndg/qykzq/ico/lt_on.png"),
        off: require("@/assets/a07_zndg/qykzq/ico/lt_off.png"),
      },
      lt1: {
        name: "关",
        img: require("@/assets/a07_zndg/qykzq/ico/lt_off.png")
      },
      lt2: {
        name: "关",
        img: require("@/assets/a07_zndg/qykzq/ico/lt_off.png")
      },
      lt3: {
        name: "关",
        img: require("@/assets/a07_zndg/qykzq/ico/lt_off.png")
      },
      lt4: {
        name: "关",
        img: require("@/assets/a07_zndg/qykzq/ico/lt_off.png")
      },
      lt5: {
        name: "关",
        img: require("@/assets/a07_zndg/qykzq/ico/lt_off.png")
      },
      lt6: {
        name: "关",
        img: require("@/assets/a07_zndg/qykzq/ico/lt_off.png")
      },
      lt7: {
        name: "关",
        img: require("@/assets/a07_zndg/qykzq/ico/lt_off.png")
      },
      lt8: {
        name: "关",
        img: require("@/assets/a07_zndg/qykzq/ico/lt_off.png")
      },
      StoreList: [
        {
          label: "数据加载中。。。",
          children: [],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    this.deviceInformation(),
      console.log(this.$route.path, "侧边栏页面查看当前路由");
    setTimeout(() => { this.initGetStoresForLeftMenuShow() }, 500)
    setInterval(() => {
      this.showAuto()
    }, 60000);
  },
  computed: {
    ServeIp() {
      console.log(this.$store, "1231231231321");
      return this.$store.state.user.ServeIp;
    },
    ServePort() {
      return this.$store.state.user.ServePort;
    },
  },
  methods: {
    deviceInformation() {
      this.numberOfDevices = []
      let indata = {
        "warehouseId": "18",
        "controllerId": "3"
      }
      axios.get("http://" + this.ServeIp + ":" + this.ServePort + `/settingDeviceShow/getAll?warehouseId=${sessionStorage.getItem("StoreId")}&controllerId=${sessionStorage.getItem("ACId")}`).then(
        success => {
          if (success.data.data == null) {
            return this.$message.warning("请前往设备中心设置设备数量")
          }
          let device = Object.keys(success.data.data.devices.ZNDG).length;
          for (let i = 1; i < device + 1; i++) {
            let deviceFacility = success.data.data.devices.ZNDG[i];
            if (deviceFacility == "true") {
              this.numberOfDevices.push({
                name: i + "号智能灯光控制器",
                value: String(i - 1),
              })
            }
          }
        },
        error => {
          console.log(error, '获取库房列表接口--返回失败的数据');
        })
    },
    initGetStoresForLeftMenuShow() {
      // console.log("11111111111");
      var arr = {
        acLx: 0,
      };
      axios
        .post(
          "http://" +
          this.ServeIp +
          ":" +
          this.ServePort +
          "/GetStoresACSForLeftMenuAsc",
          arr
        )
        .then(
          (success) => {
            // console.log(success, "获取智能灯光控制器信息-成功");
            // console.log(success.data.data, "获取智能灯光控制器信息-成功");
            this.StoreList = [];
            let arrlist = success.data.data
            this.StoreList.push(...arrlist);
          },
          (error) => {
            console.log(error, "获取智能灯光控制器信息--返回失败的数据");
          }
        );
    },
    StoreshandleNodeClick(data) {
      //
      // console.log(data, "data.StoreshandleNodeClick");
      sessionStorage.setItem("ACId", data.id)
      sessionStorage.setItem("StoreId", data.StoreId);

      this.deviceInformation()
      if (data.children != undefined) {
        this.StoreSelect = data;
        return;
      }

      // console.log(this.StoreSelect, "this.StoreSelect", "左键按下啦啦啦啦啦");
      // console.log(
      //   data.id,
      //   data.label,
      //   "data.id, data.label",
      //   "左键按下啦啦啦啦啦"
      // );
      // console.log(
      //   data.AcLx,
      //   data.HostName,
      //   data.HttpPort,
      //   "data.AcLx, data.HostName, data.HttpPort",
      //   "左键按下啦啦啦啦啦"
      // );
      $("#datadeviceNo").html(this.DeviceID+"#");
      $("#dataTXZT").html("离线"); //通讯状态
      $("#ACId").html(data.id);
      $("#ACName").html(data.label);
      $("#StoreName").html(data.StoreName);
      $("#HostName").html(data.HostName);
      $("#HttpPort").html(data.HttpPort);
      $("#AcLx").html(data.AcLx);
      this.showAuto()
    },
    OneControl() {
      this.$router.push("/hjjk1");
    },
    HJexport() {
      this.$router.push("/hjjks1");
    },
    alloff() {
      let AcLx = $("#AcLx").html();
      console.log($("#ACId").html(), "#ACId");
      let HostName = $("#HostName").html();
      if (AcLx != 3) return;
      // for (let i = 1; i <= 3; i++) {
      var jsonData = {
        cmd: 60001,
        localip: "",
        hostname: "",
        port: 0,
        method: "UnmannedKFPTService/setUnmannedDGPower",
        jsonin:
          '{"ip":"' +
          HostName +
          '","deviceType":"10","deviceNo":"' +
          $("#datadeviceNo").html() +
          '","operaFlag": "00000000"}', //$("#datadeviceNo").html()
      };
      axios
        .post("http://" + this.ServeIp + ":" + this.ServePort + "/getRfid", jsonData).then(
          (success) => {
            if (success.data.code == 666) {
              this.$notify.success({
                title: "错误提示",
                message: success.data.message,
                offset: 100,
                duration: 2000,
              });
              return;
            }
            // var data = success.data;
            // if (data.data == undefined) return;
            if (success.data.flag == "1") {
              this.lt1.name = this.onOff.off
              this.lt1.img = this.ltObj.off
              this.lt2.name = this.onOff.off
              this.lt2.img = this.ltObj.off
              this.lt3.name = this.onOff.off
              this.lt3.img = this.ltObj.off
              this.lt4.name = this.onOff.off
              this.lt4.img = this.ltObj.off
              this.lt5.name = this.onOff.off
              this.lt5.img = this.ltObj.off
              this.lt6.name = this.onOff.off
              this.lt6.img = this.ltObj.off
              this.lt7.name = this.onOff.off
              this.lt7.img = this.ltObj.off
              this.lt8.name = this.onOff.off
              this.lt8.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已一键关灯',
              });

            }
            return;
          },
          (error) => {
            this.$notify.success({
              title: "错误提示",
              message: error,
              offset: 100,
              duration: 2000,
            });
            return;
          }
        );
      // }
    },
    allon() {
      let AcLx = $("#AcLx").html();
      let HostName = $("#HostName").html();
      if (AcLx != 3) return;
      // for (let i = 1; i <= 3; i++) {
      var jsonData = {
        cmd: 60001,
        localip: "",
        hostname: "",
        port: 0,
        method: "UnmannedKFPTService/setUnmannedDGPower",
        jsonin:
          '{"ip":"' +
          HostName +
          '","deviceType":"10","deviceNo":"' +
          $("#datadeviceNo").html() +
          '","operaFlag": "11111111"}', //$("#datadeviceNo").html()
      };
      axios
        .post(
          "http://" + this.ServeIp + ":" + this.ServePort + "/getRfid",
          jsonData
        )
        .then(
          (success) => {
            console.log(success);
            if (success.data.code == 666) {
              this.$notify.success({
                title: "错误提示",
                message: success.data.message,
                offset: 100,
                duration: 2000,
              });
              return;
            }
            // var data = success.data;
            // if (data.data == undefined) return;

            if (success.data.flag == "1") {
              this.lt1.name = this.onOff.on
              this.lt1.img = this.ltObj.on
              this.lt2.name = this.onOff.on
              this.lt2.img = this.ltObj.on
              this.lt3.name = this.onOff.on
              this.lt3.img = this.ltObj.on
              this.lt4.name = this.onOff.on
              this.lt4.img = this.ltObj.on
              this.lt5.name = this.onOff.on
              this.lt5.img = this.ltObj.on
              this.lt6.name = this.onOff.on
              this.lt6.img = this.ltObj.on
              this.lt7.name = this.onOff.on
              this.lt7.img = this.ltObj.on
              this.lt8.name = this.onOff.on
              this.lt8.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已一键开灯',
              });
            }
            return;
          },
          (error) => {
            this.$notify.success({
              title: "错误提示",
              message: error,
              offset: 100,
              duration: 2000,
            });
            return;
          }
        );
      // }
    },
    showAuto() {

      if ($('#HostName').html() == "") return;
      var indata = {
        "cmd": 60001,
        "localip": "127.0.0.1",
        "hostname": "10.168.1.39",
        "port": "8066",
        "method": "UnmannedKFPTService/getStatus",
        "jsonin": "{\"ip\":\"" + $('#HostName').html() + "\"}"
      }
      this.getdata(indata, 'msg');
    },
    getdata(indata, ctlname) {
      this.lt1.name = this.onOff.off
      this.lt1.img = this.ltObj.off
      this.lt2.name = this.onOff.off
      this.lt2.img = this.ltObj.off
      this.lt3.name = this.onOff.off
      this.lt3.img = this.ltObj.off
      this.lt4.name = this.onOff.off
      this.lt4.img = this.ltObj.off
      this.lt5.name = this.onOff.off
      this.lt5.img = this.ltObj.off
      this.lt6.name = this.onOff.off
      this.lt6.img = this.ltObj.off
      this.lt7.name = this.onOff.off
      this.lt7.img = this.ltObj.off
      this.lt8.name = this.onOff.off
      this.lt8.img = this.ltObj.off
      $("#datadeviceNo").html((Number(this.DeviceID) + 1) + "#");
      $("#dataTXZT").html("离线");
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data?.data == undefined) {
            //return this.open3("没有数据")
            return
          }
          let Obj = success.data;
          var data = JSON.stringify(Obj)
          $("#" + ctlname).html(data);
          var data1 = JSON.stringify(Obj.data);
          if (data1 == undefined) return;
          data1 = data1.replace(/"([^"]*)":/g, "\"data$1\":");
          var obj1 = JSON.parse(data1);
          // console.log(data)
          var DeviceID = this.DeviceID;
          console.log(obj1.data10[DeviceID].dataDGZTS.charAt(0));
          $("#datadeviceNo").html(obj1.data10[DeviceID].datadeviceNo);
          $("#dataTXZT").html(obj1.data10[DeviceID].dataTXZT == 1 ? "离线" : "在线");
          if (obj1.data10[DeviceID].dataDGZTS.charAt(0) == 0) {
            this.lt1.name = this.onOff.off
            this.lt1.img = this.ltObj.off
          } else {
            this.lt1.name = this.onOff.on
            this.lt1.img = this.ltObj.on
          }
          if (obj1.data10[DeviceID].dataDGZTS.charAt(1) == 0) {
            this.lt2.name = this.onOff.off
            this.lt2.img = this.ltObj.off
          } else {
            this.lt2.name = this.onOff.on
            this.lt2.img = this.ltObj.on
          }
          if (obj1.data10[DeviceID].dataDGZTS.charAt(2) == 0) {
            this.lt3.name = this.onOff.off
            this.lt3.img = this.ltObj.off
          } else {
            this.lt3.name = this.onOff.on
            this.lt3.img = this.ltObj.on
          }
          if (obj1.data10[DeviceID].dataDGZTS.charAt(3) == 0) {
            this.lt4.name = this.onOff.off
            this.lt4.img = this.ltObj.off
          } else {
            this.lt4.name = this.onOff.on
            this.lt4.img = this.ltObj.on
          }
          if (obj1.data10[DeviceID].dataDGZTS.charAt(4) == 0) {
            this.lt5.name = this.onOff.off
            this.lt5.img = this.ltObj.off
          } else {
            this.lt5.name = this.onOff.on
            this.lt5.img = this.ltObj.on
          }
          if (obj1.data10[DeviceID].dataDGZTS.charAt(5) == 0) {
            this.lt6.name = this.onOff.off
            this.lt6.img = this.ltObj.off
          } else {
            this.lt6.name = this.onOff.on
            this.lt6.img = this.ltObj.on
          }
          if (obj1.data10[DeviceID].dataDGZTS.charAt(6) == 0) {
            this.lt7.name = this.onOff.off
            this.lt7.img = this.ltObj.off
          } else {
            this.lt7.name = this.onOff.on
            this.lt7.img = this.ltObj.on
          }
          if (obj1.data10[DeviceID].dataDGZTS.charAt(7) == 0) {
            this.lt8.name = this.onOff.off
            this.lt8.img = this.ltObj.off
          } else {
            this.lt8.name = this.onOff.on
            this.lt8.img = this.ltObj.on
          }

        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
    btnl1() {
      var listatus = "1";
      if (this.lt1.name == "开") listatus = '0';
      var indata = {}
      indata['cmd'] = '60001';
      indata['localip'] = '127.0.0.1';
      indata['hostname'] = '222.222.126.240';
      indata['port'] = '8006';
      indata['method'] = 'UnmannedKFPTService/setUnmannedDGPower2';
      indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"10","deviceNo":"' + $("#datadeviceNo").html() + '","bulbNo":"1","operaFlag": "' + listatus + '"}';
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data.flag == 1) {
            if (listatus == 1) {
              this.lt1.name = this.onOff.on
              this.lt1.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已开灯',
              });
            } else {
              this.lt1.name = this.onOff.off
              this.lt1.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已关灯',
              });
            }
          }
        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
    btnl2() {
      var listatus = "1";
      if (this.lt2.name == "开") listatus = '0';
      var indata = {}
      indata['cmd'] = '60001';
      indata['localip'] = '127.0.0.1';
      indata['hostname'] = '222.222.126.240';
      indata['port'] = '8006';
      indata['method'] = 'UnmannedKFPTService/setUnmannedDGPower2';
      indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"10","deviceNo":"' + $("#datadeviceNo").html() + '","bulbNo":"2","operaFlag": "' + listatus + '"}';
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data.flag == 1) {
            if (listatus == 1) {
              this.lt2.name = this.onOff.on
              this.lt2.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已开灯',
              });
            } else {
              this.lt2.name = this.onOff.off
              this.lt2.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已关灯',
              });
            }
          }
        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
    btnl3() {
      var listatus = "1";
      if (this.lt3.name == "开") listatus = '0';
      var indata = {}
      indata['cmd'] = '60001';
      indata['localip'] = '127.0.0.1';
      indata['hostname'] = '222.222.126.240';
      indata['port'] = '8006';
      indata['method'] = 'UnmannedKFPTService/setUnmannedDGPower2';
      indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"10","deviceNo":"' + $("#datadeviceNo").html() + '","bulbNo":"3","operaFlag": "' + listatus + '"}';
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data.flag == 1) {
            if (listatus == 1) {
              this.lt3.name = this.onOff.on
              this.lt3.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已开灯',
              });
            } else {
              this.lt3.name = this.onOff.off
              this.lt3.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已关灯',
              });
            }
          }
        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
    btnl4() {
      var listatus = "1";
      if (this.lt4.name == "开") listatus = '0';
      var indata = {}
      indata['cmd'] = '60001';
      indata['localip'] = '127.0.0.1';
      indata['hostname'] = '222.222.126.240';
      indata['port'] = '8006';
      indata['method'] = 'UnmannedKFPTService/setUnmannedDGPower2';
      indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"10","deviceNo":"' + $("#datadeviceNo").html() + '","bulbNo":"4","operaFlag": "' + listatus + '"}';
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data.flag == 1) {
            if (listatus == 1) {
              this.lt4.name = this.onOff.on
              this.lt4.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已开灯',
              });
            } else {
              this.lt4.name = this.onOff.off
              this.lt4.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已关灯',
              });
            }
          }
        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
    btnl5() {
      var listatus = "1";
      if (this.lt5.name == "开") listatus = '0';
      var indata = {}
      indata['cmd'] = '60001';
      indata['localip'] = '127.0.0.1';
      indata['hostname'] = '222.222.126.240';
      indata['port'] = '8006';
      indata['method'] = 'UnmannedKFPTService/setUnmannedDGPower2';
      indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"10","deviceNo":"' + $("#datadeviceNo").html() + '","bulbNo":"5","operaFlag": "' + listatus + '"}';
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data.flag == 1) {
            if (listatus == 1) {
              this.lt5.name = this.onOff.on
              this.lt5.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已开灯',
              });
            } else {
              this.lt5.name = this.onOff.off
              this.lt5.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已关灯',
              });
            }
          }
        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
    btnl6() {
      var listatus = "1";
      if (this.lt6.name == "开") listatus = '0';
      var indata = {}
      indata['cmd'] = '60001';
      indata['localip'] = '127.0.0.1';
      indata['hostname'] = '222.222.126.240';
      indata['port'] = '8006';
      indata['method'] = 'UnmannedKFPTService/setUnmannedDGPower2';
      indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"10","deviceNo":"' + $("#datadeviceNo").html() + '","bulbNo":"6","operaFlag": "' + listatus + '"}';
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data.flag == 1) {
            if (listatus == 1) {
              this.lt6.name = this.onOff.on
              this.lt6.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已开灯',
              });
            } else {
              this.lt6.name = this.onOff.off
              this.lt6.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已关灯',
              });
            }
          }
        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
    btnl7() {
      var listatus = "1";
      if (this.lt7.name == "开") listatus = '0';
      var indata = {}
      indata['cmd'] = '60001';
      indata['localip'] = '127.0.0.1';
      indata['hostname'] = '222.222.126.240';
      indata['port'] = '8006';
      indata['method'] = 'UnmannedKFPTService/setUnmannedDGPower2';
      indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"10","deviceNo":"' + $("#datadeviceNo").html() + '","bulbNo":"7","operaFlag": "' + listatus + '"}';
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data.flag == 1) {
            if (listatus == 1) {
              this.lt7.name = this.onOff.on
              this.lt7.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已开灯',
              });
            } else {
              this.lt7.name = this.onOff.off
              this.lt7.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已关灯',
              });
            }
          }
        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
    btnl8() {
      var listatus = "1";
      if (this.lt8.name == "开") listatus = '0';
      var indata = {}
      indata['cmd'] = '60001';
      indata['localip'] = '127.0.0.1';
      indata['hostname'] = '222.222.126.240';
      indata['port'] = '8006';
      indata['method'] = 'UnmannedKFPTService/setUnmannedDGPower2';
      indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"10","deviceNo":"' + $("#datadeviceNo").html() + '","bulbNo":"8","operaFlag": "' + listatus + '"}';
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
        success => {
          if (success.data.flag == 1) {
            if (listatus == 1) {
              this.lt8.name = this.onOff.on
              this.lt8.img = this.ltObj.on
              this.$message({
                type: 'success',
                message: '已开灯',
              });
            } else {
              this.lt8.name = this.onOff.off
              this.lt8.img = this.ltObj.off
              this.$message({
                type: 'success',
                message: '已关灯',
              });
            }
          }
        },
        error => {
          console.log(error, '返回失败的数据');
        })
    },
  },
};
</script>
<style scoped lang="less">
.mainviewthree {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("~@/assets/a07_zndg/qykzq/pic.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 30px;
  /* 
    overflow: hidden;
    
    background-repeat: no-repeat;
    min-height: calc(100vh - 7vh);  */
}

/deep/.zndgclass .el-menu {
  height: 100% !important;
  background-color: white;
  color: black;
  // min-height: calc(100% - 0px);
  z-index: 0;
}

/deep/.zndgclass .el-menu-item {
  background-color: white;
  color: black;
  //   font-size: 10px;
}

.zndgclass .el-submenu__title:hover {
  background-color: white;
  color: black;
}

.zndgclass .el-menu-item:hover {
  background-color: white;
  color: black;
}

.zndgclass .el-footer {
  background-color: white;
  color: black;
  line-height: 60px;
  text-align: center;
  z-index: 0;
}

.zndgclass i {
  background-color: white;
  color: black;
}

/deep/.zndgclass .el-submenu__title {

  padding-left: 4px;
  background-color: white !important;
  color: black;
}

/deep/.zndgclass .el-submenu__title i {
  background-color: white !important;
  color: black !important;
  ;
}

.myfooter {
  background-color: white;
  color: black;
}

/deep/.Turnoffwithoneclick:active {
  transform: scale(0.9) !important;
}

/deep/.Openoneclick:active {
  transform: scale(0.9) !important;
}

/deep/.lamphole:active {
  transform: scale(0.9) !important;

}

li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>