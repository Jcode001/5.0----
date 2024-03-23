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
          <!-- position:absolute;right:0%;top:0%; -->
          <div
            style="width:100%;height:83%;background-color:#fff;border-radius:12px;overflow-x: auto;">
            <!-- <img style="position:absolute;width:100%;height:100%;" id="dataalarm"
              src="~@/assets/a07_zndg/qykzq/pic.png" /> -->

            <div class="mainviewthree-div">
              <div id="alloff" class="Turnoffwithoneclick"
                style="width:24.5%;height:24.5%;font-sdgAllArrize:0.95rem;color:#036ff6;position: relative;"
                @click="alloff()">
                <img style="width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/all_off.png">
                <span style="color:white;font-size:1.6575rem;position: absolute;left: 2vw;top: 2vh;">一键全关</span>
              </div>

              <div id="allon" class="Openoneclick"
                style="width:24.5%;height:24.5%;font-size:0.6875rem;color:#036ff6;position: relative;"
                @click="allon()">
                <img style="width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/all_on.png">
                <span style="color:white;font-size:1.6575rem;position: absolute;left: 2vw;top: 2vh;">一键全开</span>

              </div>
            </div>
            
            <div class="new-dg-item">
              <div class=" new-dg-item-div" :class="'new-dg-item-div' + index" id="btnl1" @click="btnl1(item,index)" v-for="(item, index) in dgAllArr" :key="index" >
                <!-- :style="  'background-image: url(@/assets/a07_zndg/qykzq/ico/btn_01.png);background-size: cover;'" -->
                <!-- <img src="~@/assets/a07_zndg/qykzq/ico/btn_01.png"> -->
                <img v-if ="item" src="@/assets/a07_zndg/qykzq/ico/lt_on.png" />
                <img v-else src="@/assets/a07_zndg/qykzq/ico/lt_off.png" />
                <span style="color:white;font-size:1.2rem">智能灯控&emsp;{{ index + 1 }}</span>
                <span style="color:white;font-size:0.95rem">当前状态：
                  {{ item == 'false' || item == false ? '关' : '开' }}</span>
              </div>
            </div>
            
          </div>
          <!-- position:absolute;left:8.5%;bottom: 0%; -->
          <div style="font-size:17px;color:#036ff6;padding:2vw 7vh">
              从机编号：
              <span id="datadeviceNo"></span>

              <span style="display:none;">
                &emsp;&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span></span>
              <span style="display:none;">库房索引：<span id="StoreId"></span></span>
              <!-- &emsp;&emsp;&emsp;&emsp;库房名称：<span id="StoreName"></span> -->
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
        <!-- <el-footer class="myfooter">

        </el-footer> -->
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
      StoreshandleNodeClickItem:{},
      dgAllArr: [] //灯光模块数据
    };
  },
  mounted() {
    // this.deviceInformation(),
      console.log(this.$route.path, "侧边栏页面查看当前路由");
    setTimeout(() => { this.initGetStoresForLeftMenuShow() }, 500)
    // setInterval(() => {
    //   this.showAuto()
    // }, 60000);
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
    // deviceInformation() {
    //   this.numberOfDevices = []
    //   let indata = {
    //     "warehouseId": "18",
    //     "controllerId": "3"
    //   }
    //   axios.get("http://" + this.ServeIp + ":" + this.ServePort + `/settingDeviceShow/getAll?warehouseId=${sessionStorage.getItem("StoreId")}&controllerId=${sessionStorage.getItem("ACId")}`).then(
    //     success => {
    //       if (success.data.data == null) {
    //         return this.$message.warning("请前往设备中心设置设备数量")
    //       }
    //       let device = Object.keys(success.data.data.devices.ZNDG).length;
    //       for (let i = 1; i < device + 1; i++) {
    //         let deviceFacility = success.data.data.devices.ZNDG[i];
    //         if (deviceFacility == "true") {
    //           this.numberOfDevices.push({
    //             name: i + "号智能灯光控制器",
    //             value: String(i - 1),
    //           })
    //         }
    //       }
    //     },
    //     error => {
    //       console.log(error, '获取库房列表接口--返回失败的数据');
    //     })
    // },
    initGetStoresForLeftMenuShow() {
      // console.log("11111111111");
      var arr = {
        acLx: 0,
      };
      axios
        .get(
          "http://" +
          this.ServeIp +
          ":" +
          this.ServePort +
          "/lightModule/getListInfo"
        )
        .then(
          (success) => {
            console.log(success, "获取智能灯光控制器信息-成功");
            // console.log(success.data.data, "获取智能灯光控制器信息-成功");   [0].moduleList
            // this.StoreList = success.data.data;
            // let arrlist = success.data.data
            this.StoreList = [];
            for (let j = 0 ; j < success.data.data.length ; j++) {
              success.data.data[j].label = success.data.data[j].warehouseName
              success.data.data[j].id = success.data.data[j].warehouseId
              success.data.data[j].level = 1
              success.data.data[j].no = 1
              success.data.data[j].children = success.data.data[j].moduleList
              for (let i = 0 ; i< success.data.data[j].children.length ; i++) {
                success.data.data[j].children[i].label = success.data.data[j].children[i].moduleName
                success.data.data[j].children[i].id = success.data.data[j].children[i].lightModuleId
                success.data.data[j].children[i].level = 2
                success.data.data[j].children[i].no = i + 1
              }
            }
            let arrlist = success.data.data
            this.StoreList.push(...arrlist);
            console.log(this.StoreList+"11111111111111111111111111111111111");
          },
          (error) => {
            console.log(error, "获取智能灯光控制器信息--返回失败的数据");
          }
        );
    },
    StoreshandleNodeClick(data) {
      //
      console.log(data, "data.StoreshandleNodeClick");
      sessionStorage.setItem("ACId", data.id)
      sessionStorage.setItem("StoreId", data.StoreId);
      this.StoreshandleNodeClickItem = data

      this.getLightStatusBySlaveNumber()

      this.deviceInformation()
      if (data.children != undefined) {
        this.StoreSelect = data;
        return;
      }
      
      $("#dataTXZT").html("离线"); //通讯状态
      $("#ACId").html(data.id);

      $("#AcLx").html(data.AcLx);
      // this.showAuto()
    },
    getLightStatusBySlaveNumber () {
      var SetSValueData = {
          "ip": this.StoreshandleNodeClickItem.ip,
          "port": this.StoreshandleNodeClickItem.port,
          "slaveNumber": this.StoreshandleNodeClickItem.slaveNumber
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/lightModule/getLightStatusBySlaveNumber', SetSValueData).then(res => {
        console.log(res,'获取当前模块下所有灯光开关状态');
        if (res.data && res.data.data) {
          this.dgAllArr = res.data.data
          $("#datadeviceNo").html(this.StoreshandleNodeClickItem.slaveNumber+"#");
          $("#HostName").html(this.StoreshandleNodeClickItem.ip);
          $("#ACName").html(data.label);
          
        } else {
          this.dgAllArr = []
          this.StoreshandleNodeClickItem = {}
          $("#datadeviceNo").html("");
          $("#HostName").html("");
          $("#ACName").html("");
          this.$message({
            type: 'info',
            message: res.data.msg,
          });
        }
        console.log(this.dgAllArr,'this.dgAllArr');
        
      }).catch(error=>{
        console.log(error,'error');
      })
    },
    OneControl() {
      this.$router.push("/hjjk1");
    },
    HJexport() {
      this.$router.push("/hjjks1");
    },
    alloff() {
      if (!this.StoreshandleNodeClickItem.ip) {
        this.$message.info('请先选择左侧库房列表')
        return
      }
      // for (let i = 1; i <= 3; i++) {
      var jsonData = {
        ip: this.StoreshandleNodeClickItem.ip,
        port: this.StoreshandleNodeClickItem.port,
        slaveNumber: this.StoreshandleNodeClickItem.slaveNumber,
        batchOperation: false
      };
      axios
        .post("http://" + this.ServeIp + ":" + this.ServePort + "/lightModule/batchSetStatus", jsonData).then(
          (success) => {
            console.log('success',success)
          
              this.$message({
                type: 'success',
                message: '已一键关灯',
              });
              this.getLightStatusBySlaveNumber()
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
      if (!this.StoreshandleNodeClickItem.ip) {
        this.$message.info('请先选择左侧库房列表')
        return
      }
      
      var jsonData = {
        ip: this.StoreshandleNodeClickItem.ip,
        port: this.StoreshandleNodeClickItem.port,
        slaveNumber: this.StoreshandleNodeClickItem.slaveNumber,
        batchOperation: true
      };
      axios
        .post(
          "http://" + this.ServeIp + ":" + this.ServePort + "/lightModule/batchSetStatus",
          jsonData
        )
        .then(
          (success) => {
            console.log('succes',success);
            this.$message({
                type: 'success',
                message: '已一键开灯',
              });
              this.getLightStatusBySlaveNumber()
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
    
    btnl1(data,_index) {
      console.log('data',data)
      let indata = {}
      indata.ip = this.StoreshandleNodeClickItem.ip
      indata.port = this.StoreshandleNodeClickItem.port
      indata.slaveNumber = this.StoreshandleNodeClickItem.slaveNumber
      indata.deviceNumber = _index + 1
      indata.operation = !data
   
      axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/lightModule/setStatus', indata).then(
        success => {
          console.log('success',success)
          if (data) {
            this.$message({
                type: 'success',
                message: '已关灯',
              });
          } else {
            this.$message({
                type: 'success',
                message: '已开灯',
              });
          }
          this.getLightStatusBySlaveNumber()
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
  // background: url("~@/assets/a07_zndg/qykzq/pic.png");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
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

.mainviewthree-div{
      display: flex;
    justify-content: space-evenly;
    margin-top:3vh;
}
.new-dg-item{
  display: flex;
  flex-wrap: wrap;
  position: relative;
  // top:35%;
  padding:2% 8% 0;
  justify-content: space-between;
}
.new-dg-item-div{
  width:23.5%;
  height:20vh;
  position: relative;
  margin-bottom:2vh;
  background-image: url('~@/assets/a07_zndg/qykzq/ico/btn_01.png');
      background-repeat: no-repeat;
  background-size: 100% 100%;
}
.new-dg-item-div1,.new-dg-item-div9,.new-dg-item-div17{
  background-image: url('~@/assets/a07_zndg/qykzq/ico/btn_02.png');
      background-repeat: no-repeat;
  background-size: 100% 100%;
}
.new-dg-item-div2,.new-dg-item-div10,.new-dg-item-div918{
  background-image: url('~@/assets/a07_zndg/qykzq/ico/btn_03.png');
      background-repeat: no-repeat;
  background-size: 100% 100%;
}
.new-dg-item-div3,.new-dg-item-div11,.new-dg-item-div19{
  background-image: url('~@/assets/a07_zndg/qykzq/ico/btn_04.png');
      background-repeat: no-repeat;
  background-size: 100% 100%;
}
.new-dg-item-div4,.new-dg-item-div12,.new-dg-item-div920{
  background-image: url('~@/assets/a07_zndg/qykzq/ico/btn_05.png');
      background-repeat: no-repeat;
  background-size: 100% 100%;
}
.new-dg-item-div5,.new-dg-item-div13,.new-dg-item-div21{
  background-image: url('~@/assets/a07_zndg/qykzq/ico/btn_06.png');
      background-repeat: no-repeat;
  background-size: 100% 100%;
}
.new-dg-item-div6,.new-dg-item-div14,.new-dg-item-div22{
  background-image: url('~@/assets/a07_zndg/qykzq/ico/btn_07.png');
      background-repeat: no-repeat;
  background-size: 100% 100%;
}
.new-dg-item-div7,.new-dg-item-div15,.new-dg-item-div23{
  background-image: url('~@/assets/a07_zndg/qykzq/ico/btn_08.png');
      background-repeat: no-repeat;
  background-size: 100% 100%;
}
.new-dg-item-div img{
  position: absolute;
  right:2vw;
  bottom:3vh;
}
.new-dg-item-div span{
  display: block;
  padding: 1vw 1vw 0;
}
</style>