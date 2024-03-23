<template>
  <el-container style="height: 100%">
    <el-header
      style="text-align: left; font-size: 12px; background-color: white"
    >
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="
          display: inline-block;
          font-size: 1rem;
          text-decoration: none;
          color: #000000;
          border-bottom: 0.125rem solid #258ad9;
        "
      >
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>库房管理</el-breadcrumb-item> -->
        <el-breadcrumb-item>智能门禁</el-breadcrumb-item>
      </el-breadcrumb></el-header
    >
    <el-container style="height: calc(100vh - 120px)">
      <el-aside
        style="
          width: 10vw;
          background-color: rgb(238, 241, 246);
          border-radius: 12px 12px 0 0;
        "
      >
        <el-header style="text-align: left; border-radius: 12px 12px 0 0">
          <img
            style="vertical-align: middle"
            src="~@/assets/a06_znmj/home.png"
          />
          <span
            style="
              vertical-align: middle;
              width: 90%;
              color: #fff;
              text-align: left;
              font-size: 1vw;
              line-height: 100%;
              padding-left: 10px;
            "
            >库房列表</span
          >
        </el-header>
        <el-main
          style="height: 37vw; border: 1px solid rgb(103, 146, 240)"
          class="znmjclass"
        >
          <el-menu :default-active="activeIndex">
            <template v-for="item in KFList">
              <el-submenu
                v-if="item.children"
                :key="item.id"
                :index="(item.id + 1).toString()"
              >
                <template slot="title">
                  <i class="el-icon-office-building"></i>
                  <!-- {{ item.label }} -->

                  <el-tooltip placement="top">
                    <div slot="content">{{ item.label }}</div>
                    <span>{{ item.label }} </span>
                  </el-tooltip>
                </template>
                <el-menu-item
                  v-for="(items, key) in item.children"
                  :key="key"
                  @click="handleNodeClick(items)"
                >
                  <i class="el-icon-monitor"></i>
                  <!-- {{ items.label }} -->

                  <el-tooltip placement="top">
                    <div slot="content">{{ items.label }}</div>
                    <span>{{ items.label }} </span>
                  </el-tooltip>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :key="item.id">
                <i class="el-icon-office-building"></i>
                <el-tooltip placement="top">
                  <div slot="content">{{ item.label }}</div>
                  <span>{{ item.label }} </span>
                </el-tooltip>
              </el-menu-item>
            </template>
          </el-menu>
        </el-main>
      </el-aside>
      <!-- content -->
      <el-container>
        <div
          style="
            position: absolute;
            left: 19%;
            bottom: 7%;
            font-size: 18px;
            color: #036ff6;
          "
        >
          <!-- 设备编号：<span id="datadeviceNo">未知</span> 通讯状态： -->
          <!-- <span id="dataTXZT">离线</span> -->
          <!-- 库房索引：
                <span id="StoreId"></span>  -->
          库房名称：
          <span id="StoreName">123</span> 门禁索引：
          <span id="DId"></span> 门禁名称： <span id="DName"></span> IP地址：
          <span id="DIP"></span>
          <!-- 端口：
                <span id="DPort"></span> -->
          <span id="DType"></span>
          <span id="password" style="display: none"></span>
          <span id="port" style="display: none"></span>
        </div>
        <div v-show="!user" class="openImg">
          <!-- 开门按钮 -->
          <div class="door" @click="door()">
            <img src="./door.png" alt="" />
            <span>开门</span>
          </div>

          <!-- 下载记录按钮 -->
          <div class="historyToolsPeople" @click="centerDialogVisible = true">
            <img src="./downlooad.png" alt="" />
            <span>下载记录</span>
          </div>
          <!-- 下载记录弹框 -->
          <el-dialog
            title="下载记录"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
          >
            <div class="block" style="text-align: center">
              <span class="demonstration">开始时间：</span>
              <!-- <input type="date" v-model="startTime"> -->
              <el-date-picker
                v-model="startTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
            <div class="block" style="text-align: center; margin-top: 2vh">
              <span class="demonstration">结束时间：</span>
              <el-date-picker
                v-model="endTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <!-- <input type="date" v-model="endTime"> -->
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="history">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 用户管理 -->
          <div class="userControl" @click="userControlA(this)">
            <img src="./usemanage.png" alt="" />
            <span>用户管理</span>
          </div>
          <img id="imgOn" :src="imgOnOff" alt="" />
        </div>
        <div class="userTabulation" v-show="user">
          <!-- 添加用户 -->
          <div @click="addPersonnel()" id="addPersonnel" class="door">
            <img src="./usemanage.png" alt="" />
            <span>添加</span>
          </div>
          <div
            style="float: right; margin-right: 5%; margin-top: 3vh"
            @click="fanhui"
          >
            <span>返回</span>
          </div>
          <div class="userTable">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column
                  prop="date"
                  label="序号"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="address" label="员工编号">
                </el-table-column>
                <!-- <el-table-column label="操作"  fixed="right">
                                    <template slot-scope="scope">
                                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button size="mini" type="danger"
                                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column> -->
                <el-table-column
                  label="操作"
                  fixed="right"
                  width="200"
                  hidden="100"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                      >编辑</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
                <el-dialog
                  title="编辑"
                  :modal-append-to-body="true"
                  :append-to-body="true"
                  :visible.sync="edit"
                  width="30%"
                  center
                >
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名：">
                      <el-input v-model="form.input1"></el-input>
                    </el-form-item>
                  </el-form>
                  <div style="text-align: center">
                    <el-upload
                      accept="jpg"
                      ref="uploadOne"
                      class="upload-demo"
                      drag
                      :auto-upload="false"
                      name="file"
                      :limit="1"
                      :on-exceed="handleExceed"
                      :on-change="handleChange"
                      action=""
                      :on-preview="handlePreview"
                      :http-request="handleRequest"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      :file-list="fileList"
                    >
                      <i class="element-icons el-icon-upload"></i>
                      <div class="el-upload__text">
                        将图片拖到此处，
                        <div>或<em>点击上传</em></div>
                      </div>
                    </el-upload>
                    <el-dialog
                      :visible.sync="dialogVisible"
                      :modal-append-to-body="true"
                      :append-to-body="true"
                    >
                      <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="edit = false">取 消</el-button>
                    <el-button type="primary" @click="addOk">确 定</el-button>
                  </span>
                </el-dialog>
              </el-table>
            </template>
          </div>
          <div class="block">
            <span class="demonstration"></span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 50, 100, 200]"
              :page-size="20"
              layout="total, sizes, prev, pager, next, jumper"
              :total="numPeople"
              style="text-align: right; margin-right: 5%"
            >
            </el-pagination>
          </div>
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      user: false,
      centerDialogVisible: false, ////下载弹框
      edit: false, ////编辑弹框
      imgOnOffObj: {
        on: require("@/views/a06_znmj/unlockingdevice.png"),
        off: require("@/views/a06_znmj/lock.png"),
      },
      imgOnOff: require("@/views/a06_znmj/lock.png"),

      //日期
      startTime: "", ///开始
      endTime: "", ////结束
      idAdd: "",
      // ServeIp: '',
      // ServePort: '',
      tableData: [], //列表
      currentPage: 1, //列表默认页数
      numPeople: 0, //列表总数
      activeIndex: "0",
      idAdd: "20",
      ipAddress: "",
      passworda: "",
      porta: "",
      entranceId: 0,
      jumpVariable: 1,
      KFList: [], ////左侧导航数据
      handleSize: 20,
      form: {
        input1: "",
        delivery: false,
      }, //上传姓名
      fileList: [], ///上传图
      tool: "", ///编辑或删除的参数
      carouselImages1: "", ///保存图
      add: 0, ///判断添加或者修改
      handleRequest: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  computed: {
    routes() {
      // return this.$router.options.routes
      return this.$route.path;
    },
    ServeIp() {
      return this.$store.state.user.ServeIp;
    },
    ServePort() {
      return this.$store.state.user.ServePort;
    },
  },
  watch: {
    carouselImages1(newPosts) {
      this.carouselImage();
    },
    // 'tempHumTimeData'(newPosts) {
    //   this.curve()
    // },
  },
  mounted() {
    this.init();
  },
  methods: {
    /////返回开门的
    fanhui() {
      this.user = false;
    },
    ////上传图
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },
    handleChange(file, fileList) {
      this.fileList = file;
      // console.log(fileList,file);
    },
    //////添加列表信息
    addOk() {
      if (this.form.input1 == "") {
        return this.$message({
          type: "info",
          message: "未填写姓名",
        });
      }
      const formData = new FormData();
      formData.append("file", this.fileList.raw);
      axios
        .post(
          "http://" +
            this.ServeIp +
            ":" +
            this.ServePort +
            "/acs/uploadEmployeeFace",
          formData
        )
        .then(
          (success) => {
            this.carouselImages1 = success.data.data;
          },
          (error) => {
            // console.log(error, '获取库房列表接口--返回失败的数据');
          }
        );
    },

    ////上传表单
    carouselImage() {
      if (this.add == 1) {
        if ((this.fileList = [])) {
          var indata = {
            acsId: this.idAdd,
            employeeName: this.form.input1,
            employeeNo: this.tool,
          };
        } else {
          var indata = {
            acsId: this.idAdd,
            employeeName: this.form.input1,
            employeeFaceImageName: this.carouselImages1,
            employeeNo: this.tool,
          };
        }
        axios
          .post(
            "http://" +
              this.ServeIp +
              ":" +
              this.ServePort +
              "/acs/updateEmployee",
            indata
          )
          .then(
            (success) => {
              let response = success.data;
              if (response.code == 200) {
                this.handleCurrentChange(this.currentPage);
                this.$message({
                  type: "success",
                  message: "上传成功!",
                });
                this.edit = false;
              } else {
                return this.$message({
                  type: "error",
                  message: "上传失败!",
                });
              }
            },
            (error) => {
              console.log(error, "返回失败的数据");
            }
          );
      } else {
        var indata = {
          acsId: this.idAdd,
          employeeName: this.form.input1,
          employeeFaceImageName: this.carouselImages1,
          // "employeeNo": this.tool,
        };
        axios
          .post(
            "http://" +
              this.ServeIp +
              ":" +
              this.ServePort +
              "/acs/addEmployee",
            indata
          )
          .then(
            (success) => {
              let response = success.data;
              if (response.code == 200) {
                this.handleCurrentChange(this.currentPage);
                this.$message({
                  type: "success",
                  message: "上传成功!",
                });
                this.edit = false;
              } else {
                return this.$message({
                  type: "error",
                  message: "上传失败!",
                });
              }
            },
            (error) => {
              console.log(error, "返回失败的数据");
            }
          );
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.handleSize = val;
    },
    ///////获取列表数据
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.currentPage, "current-pagecurrent-pagecurrent-page");
      this.tableData = [];
      let indata = {
        data: this.idAdd,
        pageNumber: val,
        pageSize: this.handleSize,
      };
      axios
        .post(
          "http://" +
            this.ServeIp +
            ":" +
            this.ServePort +
            "/acs/getAllEmployee",
          indata
        )
        .then(
          (success) => {
            let response = success.data;
            if (response.code == 200) {
              this.numPeople = response.data.UserInfoSearch.totalMatches;
              for (
                let index = 0;
                index < response.data.UserInfoSearch.UserInfo.length;
                index++
              ) {
                this.tableData.push({
                  date: index + 1,
                  name: response.data.UserInfoSearch.UserInfo[index].name,
                  address:
                    response.data.UserInfoSearch.UserInfo[index].employeeNo,
                });
              }
            } else {
              return;
            }
          },
          (error) => {
            console.log(error, "返回失败的数据");
          }
        );

      // console.log(`当前页: ${val}`);
    },
    // 开门
    door() {
      var indata = {
        id: this.idAdd,
      };
      axios
        .get(
          "http://" +
            this.ServeIp +
            ":" +
            this.ServePort +
            "/acs/openTheDoor?id=" +
            this.idAdd
        )
        .then(
          (success) => {
            let response = success.data;
            if (response.code == 200) {
              this.imgOnOff = this.imgOnOffObj.on;
              setTimeout(() => {
                this.imgOnOff = this.imgOnOffObj.off;
              }, 3000);
            } else {
              alert(response.message);
            }
          },
          (error) => {
            console.log(error, "返回失败的数据");
          }
        );
    },
    ///下载
    history() {
      console.log(this.endTime);
      var url = `http://${this.ServeIp}:${this.ServePort}/acs/getRecord?endTime=${this.endTime}T00:00:00&id=${this.idAdd}&startTime=${this.startTime}T00:00:00`;
      console.log(url);
      let startTime = this.startTime;
      let endTime = this.endTime;
      //+ "&startTime=" + startTime + "&endTime=" + endTime;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true); //get请求，请求地址，是否异步
      xhr.responseType = "blob"; // 返回类型blob
      xhr.onload = function () {
        // 请求完成处理函数
        if (this.status === 200) {
          var blob = this.response; // 获取返回值
          var a = document.createElement("a");
          a.download = `门禁记录${startTime}~${endTime}.csv`;
          a.href = window.URL.createObjectURL(blob);
          a.click();
        }
      };
      // 发送ajax请求
      xhr.send();
    },
    ////删除
    handleDelete(a, obj) {
      // console.log(a, obj);
      let indata = {
        acsId: this.idAdd,
        employeeNoList: [obj.address],
      };
      console.log(indata);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .post(
              "http://" +
                this.ServeIp +
                ":" +
                this.ServePort +
                "/acs/deleteEmployee",
              indata
            )
            .then(
              (success) => {
                let response = success.data;
                if (response.code == 200) {
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                  this.handleCurrentChange(this.currentPage);
                }
              },
              (error) => {
                console.log(error, "返回失败的数据");
              }
            );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    ///编辑
    handleEdit(a, obj) {
      console.log(obj.name);
      this.form.input1 = obj.name;
      this.tool = obj.address;
      this.edit = true;
      this.add = 1;
      this.fileList = [];
    },
    /////添加
    addPersonnel() {
      // console.log("tianjia");
      this.form.input1 = "";
      this.edit = true;
      this.add = 0;
      this.fileList = [];
    },

    ////显示用户管理列表
    userControlA() {
      this.user = true;
      this.handleCurrentChange(this.currentPage);
    },
    backToNext() {
      window.history.back();
    },
    /////左侧导航数据
    init() {
      var tempdata = {};
      axios
        .post(
          "http://" +
            this.ServeIp +
            ":" +
            this.ServePort +
            "/GetStoresDoorForLeftMenuAsc",
          tempdata
        )
        .then(
          (success) => {
            console.log(success, "获取库房列表接口-成功");
            this.KFList = [];
            this.KFList.push(...success.data.data);
            console.log(this.KFList);
          },
          (error) => {
            console.log(error, "获取库房列表接口--返回失败的数据");
          }
        );
    },
    handleNodeClick(data) {
      let level = data.level;
      console.log(data, "点击了data111111111111");
      if (level == 2) {
        this.entranceGuardNavigation(
          1,
          data.id,
          data.dip,
          data.dpwd,
          data.dport,
          data.StoreName,
          data.label
        );
      }
    },
    /////////////////////////////////////////// 文件下载和二级导航中的li的函数
    entranceGuardNavigation(a, id, ip, password, port, storeName, label) {
      $("#StoreName").text(storeName);
      $("#DId ").text(id);
      $("#DIP").text(ip);
      $("#DName").text(label);
      $("#password").text(password);
      $("#port").text(port);
      // $('#menutree').find('span').css({ color: '#eee' })
      // $(a).find('span').css({ color: 'yellow' })
      // $("#userControl").css("display", "block");
      // $("#addPersonnel").css("display", "block");
      // $("#historyToolsPeople").css("display", "block");
      // $("#door").css("display", "block");
      this.idAdd = id;
      this.ipAddress = ip;
      this.passworda = password;
      this.porta = port;
    },
    pickerOptions: {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          },
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          },
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          },
        },
      ],
    },
  },
};
</script>

<style  scoped lang="less">
.openImg {
  width: 100%;
  border: #258ad9 solid 1px;
  background: url(./pic.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

// 开门按钮
.door {
  outline: medium;
  position: absolute;
  top: 16.5%;
  left: 19.5%;
  z-index: 10;
  width: 200px;
  height: 50px;
  background-color: #408ef7;
  border-radius: 10px;
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  cursor: pointer;

  // display: none;
  img {
    width: 30px;
    height: 30px;
    // margin-top: 12px;
    vertical-align: middle;
  }

  span {
    vertical-align: top;
  }
}

// 下载记录按钮
.historyToolsPeople {
  outline: medium;
  position: absolute;
  top: 16.5%;
  left: 31.5%;
  z-index: 10;
  width: 200px;
  height: 50px;
  background-color: #7bd583;
  border-radius: 10px;
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  cursor: pointer;

  // display: none;
  img {
    width: 30px;
    height: 30px;
    // margin-top: 12px;
    vertical-align: middle;
  }

  span {
    vertical-align: top;
  }
}

//用户管理按钮
.userControl {
  outline: medium;
  position: absolute;
  top: 16.5%;
  left: 43.3%;
  z-index: 10;
  width: 200px;
  height: 50px;
  background-color: #4b79f5;
  border-radius: 10px;
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
  cursor: pointer;

  // display: none;
  img {
    width: 30px;
    height: 30px;
    // margin-top: 12px;
    vertical-align: middle;
  }

  span {
    vertical-align: top;
  }
}

#imgOn {
  position: absolute;
  top: 49.5%;
  left: 39.2%;
  width: 120px;
  height: 120px;
}

.userTabulation {
  width: 100%;
  border: #258ad9 solid 1px;
  background-color: rgb(249 249 249);
}

.userTable {
  margin-top: 11vh;
  width: 90%;
  margin-left: 5%;
  background-color: #fff;
  height: 63vh;
  border-radius: 10px;
  overflow: scroll;
}

.userTable::-webkit-scrollbar {
  display: none;
}

.mainviewone {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("~@/assets/a06_znmj/pic.png");
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

// #addPersonnel {
//     // display: none;
//     outline: medium;
//     width: 200px;
//     height: 50px;
//     background-color: #4b79f5;
//     border-radius: 10px;
//     font-size: 20px;
//     color: #ffffff;
//     font-weight: bold;
//     text-align: center;
//     line-height: 43px;
//     float: left;
//     margin: 20px;
// }

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