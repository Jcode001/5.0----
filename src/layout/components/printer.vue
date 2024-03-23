<template>
  <div class="app">
    <el-form>
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <el-button
        style="margin-left: 40%; width: 6vw; height: 3vw; font-size: 1vw"
        >取消</el-button
      >

      <!-- <el-button
                icon="el-icon-printer"
                type="primary"
                size="mini"
                style="width: 6vw; height: 3vw; font-size: 1vw"
                @click="mutisearchDA()"
                >打印</el-button
                > -->
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
export default {
  name: "printer",
  props: ["IpPortPrinter_s", "getValue"],
  data() {
    return {
      value1: "1",
      value2: "8888",
      printerIp: "", //打印机的IP
      printerPort: "", //打印机的端口
      printerText: "", //打印的内容（文字）
      printerRFIDvalue: "", //打印的标签值
      IpPrinterServe: "", //打印服务的Ip
      PortPrinterServe: "", //打印服务的端口
      activities: [],
      px: "",
      py: "",
      flag:'',
      timer:null,
    };
  },
  mounted() {
    localStorage.setItem('PrintText_writeRFID_Flag','');
    this.init();
    this.getFlag();
  },
  computed: {
    ServeIp() {
      return this.$store.state.user.ServeIp;
    },
    ServePort() {
      return this.$store.state.user.ServePort;
    },
  },
  watch: {
  },
  destroyed () {
    clearInterval(this.timer);
    this.timer=null;
  },
  methods: {
    getFlag(){
      this.timer=setInterval(() => {
        console.log(localStorage.getItem("PrintText_writeRFID_Flag"),'~~~~~~~~~~~~~~~~~~~');
        var flag=localStorage.getItem("PrintText_writeRFID_Flag");
        var RFID_ValueTemp=localStorage.getItem("RFID_Value");
        if(flag=='true'){
          console.log(flag,'flag1');
          var emitData={};
          emitData.flag=true;
          emitData.RFID_Value=RFID_ValueTemp;
          this.$emit('getValue',emitData)
          // this.getValue("true", true);
        }
        else if(flag==''){
          console.log('当前写入状态为空');
        }
        else if(flag=="false"){
          console.log(flag,'flag2');
          var emitData={};
          emitData.flag=false;
          emitData.RFID_Value=RFID_ValueTemp;
          this.$emit('getValue',emitData)
          // this.getValue("false", false);
        }
      }, 1000);
    },
    initDate() {
      var now = new Date();
      var year = now.getFullYear(); //获取完整的年份(4位,1970-????)
      var month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var day = now.getDate(); //获取当前日(1-31)
      var hour = now.getHours(); //获取当前小时数(0-23)
      var minute = now.getMinutes(); //获取当前分钟数(0-59)
      var second = now.getSeconds(); //获取当前秒数(0-59)
      this.activities = [];
      this.activities.push(
        {
          content: "连接打印机中...",
          timestamp:
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second,
          size: "large",
          type: "primary",
          icon: "el-icon-success",
        },
        {
          content: "打印文字中...",
          timestamp:
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second,
          color: "#0bbd87",
          type: "primary",
          icon: "el-icon-success",
        },
        {
          content: "写入标签中...",
          timestamp:
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second,
          size: "large",
          color: "#0bbd87",
          icon: "el-icon-success",
        }
      );
    },
    init() {
      this.initDate();
      console.log(this.IpPortPrinter_s, "发送请求的IP和端口");
      var tempa = this.IpPortPrinter_s.split("/");
      console.log(tempa, "进入到打印标签文件传递的数据");
      // this.printerIp = String(tempa[0]); //打印机的IP
      // this.printerPort = String(tempa[1]); //打印机的端口
      // this.IpPrinterServe = String(tempa[4]); //打印服务的Ip
      // this.PortPrinterServe = String(tempa[5]); //打印服务的端口

      var getRFIDPrinterData = {
        item: "RFIDPrinter1",
      };
      axios
        .post(
          "http://" + this.ServeIp + ":" + this.ServePort + "/GetSValue",
          getRFIDPrinterData
        )
        .then(
          (success) => {
            console.log(success.data.data, "读取设置的RFID值");
            var res = success.data.data;
            const datas = res.value.split("-");
            console.log(datas, "datas");
            this.px = datas[0];
            this.py = datas[1];
            this.printerIp = datas[2];
            this.printerPort = datas[3];
            this.IpPrinterServe = datas[4];
            this.PortPrinterServe = datas[5];
          },
          (error) => {
            console.log(error, "读取设置的RFID值--返回失败的数据");
          }
        );

      this.printerText = String(tempa[2]); //打印的内容（文字）
      this.printerRFIDvalue = String(tempa[3]); //打印的标签值
      console.log(JSON.parse(tempa[6]), "批量打印");
      var tempTextCodes = JSON.parse(tempa[6]);
      tempTextCodes.forEach((item) => {
        setTimeout(() => {
          this.PrintText_writeRFID(item.text, item.code);
        }, 1000);
      });
    },
    test() {
      console.log("212222222222222testtesttest");
    },
    async PrintText_writeRFID(text, code) {
      console.log(text, code, "进入到吸入打印文字方法中---");
      var PrintText_writeRFID_Flag=false;
      var data = {};
      data.reqParam = "1";
      var block = "1"; // 写入 EPC
      var start_addr = 0; //从 EPC 0 地址开始写
      var len = 12; //写入长度为 4
      var data_mode = "0"; //写入数据格式为 hex,hex 要求写入长度为 4 的倍数//写入数据格式为 ACSII 码
      var buf2 = "";
      // buf2="BB2345678912345678901234";
      buf2 = "BBBBBBBB" + code;
      var printparamsJsonArray = [];
      printparamsJsonArray.push({
        PTK_Connect: this.printerIp + "," + this.printerPort,
      });
      // printparamsJsonArray.push({ "PTK_Connect": "172.16.17.151,9100" });
      printparamsJsonArray.push({ PTK_ClearBuffer: "" }); //清空缓存
      printparamsJsonArray.push({
        PTK_WriteRFID:
          +start_addr + "," + block + "," + len + "," + data_mode + "," + buf2,
      });
      //设置打印方向 B为从底部开始打印 T为从顶部开始打印
      printparamsJsonArray.push({ PTK_SetDirection: "b" });
      //设置打印速度  最高速度由打印机的型号决定
      printparamsJsonArray.push({ PTK_SetPrintSpeed: "4" });
      //设置打印黑度 最大打印黑度20 树脂碳带一般设置15左右
      printparamsJsonArray.push({ PTK_SetDarkness: "15" });
      //必须正确设置标签的宽高--防止内容打偏     宽高可用尺子量取也可以查看标签的规格   一般桌面型打印机的最大打印宽度为110毫米 实际有效打印宽度根据打印机的参数决定
      printparamsJsonArray.push({ PTK_SetLabelHeight: "98,12,0,false" });
      printparamsJsonArray.push({ PTK_SetLabelWidth: 720 });
      //打印一行微软雅黑的文字 具体的参数函数请参考开发文档
      //  printparamsJsonArray.push({"PTK_DrawText_TrueType" : "580,580,64,0,微软雅黑,1,700,0,0,0,"+$("#printlabel").val()});
      printparamsJsonArray.push({ PTK_SetCharSets: "8,U,001" });
      // printparamsJsonArray.push({"PTK_DrawText":"280,280,0,97,2,2,N,12121indoor"});
      // printparamsJsonArray.push({ PTK_DrawText: "350,210,0,97,2,2,N," + text });
      printparamsJsonArray.push({
        PTK_DrawText: this.px + "," + this.py + ",0,97,2,2,N," + text
      });
      //打印一行思源黑体的文字 具体的参数函数请参考开发文档，请下载正版字体
      // printparamsJsonArray.push({"PTK_DrawTextTrueTypeW" : "10,60,40,40,4,0,0,0,0,/opt/apps/cn.com.postek.print.server/files/postekprintserver/Font/思源黑体.ttf,打印测试boside博思得,1"});
      //执行打印  必须有PTK_PrintLabel 否则不执行打印
      printparamsJsonArray.push({ PTK_PrintLabel: "1,1" });
      //执行打印完关闭打印机USB端口
      //printparamsJsonArray.push({"ClosePort" : ""});
      printparamsJsonArray.push({ PTK_CloseConnect: "" });
      data.printparams = JSON.stringify(printparamsJsonArray);
      // data.printparams = printparamsJsonArray;
      console.log(data, "网络连接打印文字传递的数据");
      // axios.post('http://' + this.IpPrinterServe + ':' + this.PortPrinterServe + '/postek/print', data, "json",).then(
      // success => {
      //     console.log(success.data,'网络连接打印文字--成功的数据');
      // },
      // error => {
      //     console.log(error, '网络连接打印文字--返回失败的数据');
      // })
      this.initDate();

      await $.ajax({
        type: "POST",
        url:
          "http://" +
          this.IpPrinterServe +
          ":" +
          this.PortPrinterServe +
          "/postek/print",
        data: data,
        dataType: "json",
        timeout: 30000, // in milliseconds
        //retval==0为成功 否则为失败 失败的原因请查看msg
        success: function (result) {
          console.log(result, "打印文字接口返回的数据");
          if (result.retval == "0") {
            var now = new Date();
            var year = now.getFullYear(); //获取完整的年份(4位,1970-????)
            var month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            var day = now.getDate(); //获取当前日(1-31)
            var hour = now.getHours(); //获取当前小时数(0-23)
            var minute = now.getMinutes(); //获取当前分钟数(0-59)
            var second = now.getSeconds(); //获取当前秒数(0-59)
            // this.activities.push({
            //   content: "档号：" + text + "写入打印成功",
            //   size: "large",
            //   color: "#0bbd87",
            //   timestamp:
            //     year +
            //     "-" +
            //     month +
            //     "-" +
            //     day +
            //     " " +
            //     hour +
            //     ":" +
            //     minute +
            //     ":" +
            //     second,
            //   icon: "el-icon-success",
            // });
            PrintText_writeRFID_Flag = true;
            // if (flag) {
              // this.getValue("true", true);
            // } else {
            //   this.getValue("false", false);
            // }
          } else {
          }
        },
        //如果程序进入error 1、请查看打印服务是否启动 2、请查看json字段中是否有空格  3、请检查参数是否有多余或者缺少 4、timeout设置太短，未有数据返回
        error: function (request, status, err) {
          console.log(request, "request, , ");
          console.log(status, ", status, ");
          console.log(err, ", , err");
          // this.getValue('printer',false);
          PrintText_writeRFID_Flag = false;
          localStorage.setItem('PrintText_writeRFID_Flag',PrintText_writeRFID_Flag);
          // $("#webpack-dev-server-client-overlay-div").css("opacity", "0");
          if (status == "timeout") {
            console.log("打印服务器连接超时，请检查");
            alert("打印服务器连接超时，请检查");
          }
          if (status == "error") {
            console.log("打印服务器连接错误，请检查");
            alert("打印服务器连接错误，请检查");
          }
        },
      });
      console.log(PrintText_writeRFID_Flag,"flagflagflagflagflagflagflagflagflag");
      localStorage.setItem('PrintText_writeRFID_Flag',PrintText_writeRFID_Flag);
      localStorage.setItem('RFID_Value',buf2);
      // if (flag) {
      //   this.getValue("printer", true);
      // } else {
      //   this.getValue("printer", false);
      // }
    },
    errorMeothed(text) {
      this.$message.error(text);
    },
    // writeRFID(){
    //     console.log('进入到写入标签方法');
    //     var data = {};
    //     data.reqParam = "1";
    //     var printparamsJsonArray = [];
    //     var block = "1"; // 写入 EPC
    //     var start_addr = 0;//从 EPC 0 地址开始写
    //     var len = 12; //写入长度为 4
    //     var data_mode = "0";//写入数据格式为 hex,hex 要求写入长度为 4 的倍数//写入数据格式为 ACSII 码
    //     var buf2="";
    //     // buf2="BB2345678912345678901234";
    //     buf2=this.printerRFIDvalue;

    //     printparamsJsonArray.push({ "PTK_Connect": this.printerIp+","+this.printerPort });
    //     printparamsJsonArray.push({ "PTK_ClearBuffer": "" });
    //     printparamsJsonArray.push({"PTK_WriteRFID" : +start_addr+","+block+","+len+","+data_mode+","+buf2});
    //     printparamsJsonArray.push({ "PTK_PrintLabel": "1,1" });
    //     printparamsJsonArray.push({ "PTK_CloseConnect": "" });

    //     data.printparams = JSON.stringify(printparamsJsonArray);
    //     console.log(data, '写入标签--传递的数据');
    //     // axios.post('http://' + this.IpPrinterServe + ':' + this.PortPrinterServe + '/postek/print', data).then(
    //     // success => {
    //     //     console.log(success,'写入标签成功--成功的数据');
    //     // },
    //     // error => {
    //     //     console.log(error, '写入标签--返回失败的数据');
    //     // })
    //     $.ajax({
    // 				type: "POST",
    // 				url: "http://"+ this.IpPrinterServe + ':' + this.PortPrinterServe + "/postek/print",
    // 				data: data,
    // 				dataType: "json",
    // 				timeout: 5000, // in milliseconds
    // 				//retval==0为成功 否则为失败 失败的原因请查看msg
    // 				success: function (result) {
    // 					console.log(result, '写入标签成功--返回的数据');

    // 				},
    // 				//如果程序进入error 1、请查看打印服务是否启动 2、请查看json字段中是否有空格  3、请检查参数是否有多余或者缺少 4、timeout设置太短，未有数据返回
    // 				error: function (request, status, err) {

    // 					$("#tip").html("请求失败，请重试").css("color", "#D20B2C");
    // 					$("#tip").fadeIn();
    // 					$("#printBtn").text("打印文字");
    // 					$("#printBtn").removeAttr("disabled");
    // 					$("#tip").delay(3000).hide(0);
    // 				}
    // 			});
    // },
  },
};
</script>

<style>
.app {
  /* background: red; */
  height: 30vw;
}
</style>
