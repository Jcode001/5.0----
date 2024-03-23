<template>
  <div style="width:95.5%;height:91%;padding: 2rem;background-color: gray;">
      <!-- <div style="width:100%;height:100%;" id="divPlugin"> </div> -->
      <!-- <iframe src="http://127.0.0.1:5503/jsmpeg.js_ffmpeg_websocket_node/rtsp-video-canvas/index.html?ip=192.168.2.169&port=554&username=admin&password=111...aaa&channel=1&streamtype=2&nodeserver=172.16.17.28"></iframe> -->
      <iframe style="width:100%;height:100%;" src="http://172.16.17.28/camera?ip=192.168.2.169&port=554&username=admin&password=111...aaa&channel=1&streamtype=2&nodeserver=172.16.17.28"></iframe>
  </div>
</template>

<script>
import axios from "axios";
import bus from '../../utils/bus'
import $ from 'jquery'
// import { asdbasd, clickLogin, clickLogout, clickStartRealPlay, clickStopRealPlay } from '../../utils/jiankong.js'
import { Loading } from 'element-ui';
export default {

  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {

    }
  },
  created() {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  },
  mounted() {

    //asdbasd();

    bus.$on('videoSurveillance', (id, label) => {
      console.log(id, label, '消息通信11111111');
      let loadingInstance = Loading.service({ 
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 73, 167, 0.8)',
          fullscreen: false 
        });
      // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      //   loadingInstance.close();
      // });
     setTimeout(() => {
        loadingInstance.close();
        console.log( "加载完成！");
        }, 10000)
      var tempData = {};
      tempData.cameraId = id;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetCameraDataByCameraId', tempData).then(//根据摄像头id获取摄像头信息
        success => {
          console.log(success, '根据摄像头id获取摄像头信息-成功');
          if (success.data.code == 200) {
            console.log(success.data.data, '根据摄像头id获取摄像头信息根据摄像头id获取摄像头信息');
            var ip=success.data.data.HostName;
            var port=success.data.data.HttpPort;
            var user=success.data.data.UserName;
            var password=success.data.data.PassWord;
            var Channel=success.data.data.Channel1;
            var CameraId=success.data.data.CameraId;
            // clickLogout()
            setTimeout(() => {
            
                   clickLogin(ip,port,user,password,Channel,CameraId)
            }, 1000);
       

          }
        },
        error => {
          console.log(error, '根据摄像头id获取摄像头信息--返回失败的数据');
        })


    })

  },
  computed: {
    ServeIp() {
      return this.$store.state.user.ServeIp;
    },
    ServePort() {
      return this.$store.state.user.ServePort;
    },
  },
  methods: {
    // yulan(){
    //   clickStartRealPlay()
    // },
    getDATableName() {//获取档案的表名
      var tempData = {};
      tempData.Table_name = "a01_archdata";
      tempData.MLId = this.Bus_MLId || 1;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAFLMLTableName', tempData).then(//根据MLID获取档案表名称
        success => {
          console.log(success, '根据MLID获取档案表名称-成功');
          if (success.data.code == 200) {
            this.DATableDesignTittle = success.data.data
            this.getDATableList();
            this.getDASearchX();//获取档案搜索项
          }
        },
        error => {
          console.log(error, '根据MLID获取档案表名称--返回失败的数据');
        })
    },
    getDAH_TableName() {//获取档案盒的表名
      var tempData = {};
      tempData.Table_name = "a01_hgldata";
      tempData.MLId = this.Bus_MLId || 1;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAFLMLTableName', tempData).then(//根据MLID获取档案（盒）表名称
        success => {
          console.log(success, '根据MLID获取档案（盒）表名称-成功');
          if (success.data.code == 200) {
            this.DAH_TableDesignTittle = success.data.data
            this.getDAHTableList();
            this.getDAH_SearchX();//获取档案盒-搜索项

          }
        },
        error => {
          console.log(error, '根据MLID获取档案（盒）表名称--返回失败的数据');
        })
    },
    getDATableList() {
      var data = {
        Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
        pIndex: 1,
        pSize: 20,
        MLIdList: this.Bus_MLId || 1,
        filter_hgl: "",
      };
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas", data).then(
        (res) => {
          console.log(res, '成功获取档案列表数据');
          this.DAtableBodyInfoList = [];
          this.DAcolumnInfoList = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);
            return;
          }
          this.DAtableBodyInfoList = res.data.data.table;
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
            };
            this.DAcolumnInfoList.push(obj);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getDAHTableList() {
      var data = {
        Table_name: this.DAH_TableDesignTittle || "a01_hgldata_1_1",
        pIndex: 1,
        pSize: 20,
        MLIdList: this.Bus_MLId || 1,
        filter_hgl: "",
      };
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl", data).then(
        (res) => {
          console.log(res, '成功获取档案盒列表数据');
          this.tableBodyInfoList = [];
          this.columnInfoList = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);

            return;
          }
          this.tableBodyInfoList = res.data.data.table;
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
            };
            this.columnInfoList.push(obj);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getDASearchX() {
      var data = {};
      data.Table_name = this.DATableDesignTittle;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData', data).then(
        success => {
          console.log(success, '获取著录项（档案）著录项列表数据-成功');
          this.DAoptionsvalue = '';
          this.DAoptions = [],
            success.data.data.forEach((item, index) => {
              this.DAoptions.push({
                value: String(index + 1),
                label: item.XByName,//著录项
                // type: tempType,//类型
                // length: item.MaxLength,//长度
                // need: need,//必填项
                // Hook: item.gjxname,//挂接
                RFIDHook: item.rfidgjx,//RFID挂接项
                // XName: item.XName,//
                // Table_Name: item.Table_Name,//表名
              })
            });
        },
        error => {
          console.log(error, '获取著录项（档案）著录项列表数据--返回失败的数据');
        })
    },
    getDAH_SearchX() {
      var data = {};
      data.Table_name = this.DAH_TableDesignTittle;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData_hgl', data).then(
        success => {
          console.log(success, '获取著录项（档案盒）著录项列表数据-成功');
          this.DAH_optionsvalue = '';
          this.DAH_options = [],
            success.data.data.forEach((item, index) => {
              this.DAH_options.push({
                value: String(index + 1),
                label: item.XByName,//著录项
                // type: tempType,//类型
                // length: item.MaxLength,//长度
                // need: need,//必填项
                // Hook: item.gjxname,//挂接
                RFIDHook: item.rfidgjx,//RFID挂接项
                // XName: item.XName,//
                // Table_Name: item.Table_Name,//表名
              })
            });
        },
        error => {
          console.log(error, '获取著录项（档案盒）著录项列表数据--返回失败的数据');
        })
    },
    onSubmit() {
      this.$message("submit!");
    },

    // 借阅部分 获取RFID挂接项信息（档案） //
    getidRfiddangan(DATableDesignTittle) {
      console.log(DATableDesignTittle);
      var table_name = {
        'Table_name': DATableDesignTittle
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData', table_name).then(res => {
        console.log(res, '获取信息项)');
      }).catch(error => {
        console.log(error);
      }
      )

      // var MLxxx={
      //   "Table_name":DATableDesignTittle,
      //   "rfidgjx": Bus_rfidgjx

      // }
      // axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetRfidGjxInfo',MLxxx).then(res=>{
      //   console.log(res,'获取RFID挂接项信息档案)');
      // }).catch(error=>{
      //   console.log(error);
      // }  
      // )
    },
    SearchDA() {
      if (this.DAoptionsvalue == '') {
        this.$message.error("请选择搜索项");
        return;
      }
      if (this.DAinputlist == '') {
        this.$message.error("请输入要搜索档案的关键字");
        return;
      }


      var tempFilter_item = "";
      this.DAoptions.forEach((item, key) => {
        console.log(item, 'itemitemitemitem');
        console.log(this.DAoptionsvalue, 'this.DAoptionsvalue');
        if (key + 1 == this.DAoptionsvalue) {
          tempFilter_item = item.label;
          console.log('222222222');
        }
      });
      var data = {
        "Table_name": this.DATableDesignTittle,
        "MLIdList": this.Bus_MLId,
        "pSize": "20",
        "filter_item": tempFilter_item,
        "filter_value": this.DAinputlist
      };
      console.log(data, '查询盒内数据查询盒内数据');
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas1", data).then(//查询 档案 数据
        (res) => {
          console.log(res, '成功获取档案列表数据');
          this.DAtableBodyInfoList = [];
          this.DAcolumnInfoList = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);
            return;
          }
          this.DAtableBodyInfoList = res.data.data.table;
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
            };
            this.DAcolumnInfoList.push(obj);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    SearchDAH() {
      if (this.DAH_optionsvalue == '') {
        this.$message.error("请选择搜索项");
        return;
      }
      if (this.inputlist == '') {
        this.$message.error("请输入要搜索档案盒的关键字");
        return;
      }
      var tempFilter_item = "";
      this.DAH_options.forEach((item, key) => {
        if (key + 1 == this.DAH_optionsvalue) {
          tempFilter_item = item.label;
        }
      });
      var data = {
        "Table_name": this.DAH_TableDesignTittle,
        "MLIdList": this.Bus_MLId,
        "pSize": "20",
        "filter_item": tempFilter_item,
        "filter_value": this.inputlist
      };
      console.log(data, '查询盒内数据查询盒内数据');
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl1", data).then(//查询盒内数据
        (res) => {
          console.log(res, '成功获取档案盒列表数据');
          this.tableBodyInfoList = [];
          this.columnInfoList = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);

            return;
          }
          this.tableBodyInfoList = res.data.data.table;
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
            };
            this.columnInfoList.push(obj);
          }
        },
        (err) => {
          console.log(err);
        }
      );

    },

    openShelfManage() {
      this.$message.warning("开架管理");
    },
    statistics() {
      this.$message.warning("统计");
    },
    barCodePrint() {
      this.$message.warning("barCodePrint条码打印");
    },
    ExcelImport() {
      console.log('Excel普通导入');
      this.archivalinformationImport = true;
    },

    TopList() {
      if (this.Bus_MLId == '') {
        this.$message.warning("请选择分类")
        return;
      }
      this.$message.error("当前列表为空");
    },

    //借阅管理在借历史tab切换 //
    handleClick(tab) {
      this.zaijielishihgl = []
      this.zaijielishi = [];
      this.fileboxforloanList = [];
      console.log(tab.name, 'sssssssssssssssssssssssssssssssssssssss');
      if (tab.name == 'first') {  //档案盒
        this.zaijielishihgl = []
        var data = {
          "Table_name": "a01_hgldata",
          "pIndex": 0,
          "pSize": 20,
          "type": 0
        };

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZaiJieDatas_hgl', data).then(
          success => {
            console.log(success, '获取档案盒全部列表数据-成功');
            this.FileonloanTable = success.data.data.table;
            for (let i = 0; i < success.data.data.headernames.length; i++) {
              let obj = {
                prop: success.data.data.headernames[i],
                label: success.data.data.headertexts[i],
              };
              this.zaijielishihgl.push(obj);
            }

          },
          error => {
            console.log(error, '获取档案盒列表数据--返回失败的数据');
          })
      } else if (tab.name == 'second') { //档案

        var data = {
          "Table_name": "a01_archdata",
          "pIndex": 0,
          "pSize": 20,
          "type": 0
        };

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZaiJieDatas', data).then(
          success => {
            console.log(success, '获取档案全部列表数据-成功');
            this.borrowingfilebox = success.data.data.table;
            for (let i = 0; i < success.data.data.headernames.length; i++) {
              let obj = {
                prop: success.data.data.headernames[i],
                label: success.data.data.headertexts[i],
              };
              this.zaijielishi.push(obj);
            }

          },
          console.log(this.zaijielishi, 'eeeeeeeeeeeeeeeeeeee'),
          error => {
            console.log(error, '获取档案列表数据--返回失败的数据');
          })
      } else { }
    },

    BrrowHistoryDAH() {
      this.jieyuelishi = []
      this.jieyuelishijilu = []
      var data = {
        // "Table_name":"",
        "pIndex": 0,
        "pSize": 20
      };

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetJieYueHisDatas_hgl', data).then(
        success => {
          console.log(success, '借阅历史记录档案盒-成功');
          this.loanhistoryTable = success.data.data.table;
          for (let i = 0; i < success.data.data.headernames.length; i++) {
            let obj = {
              prop: success.data.data.headernames[i],
              label: success.data.data.headertexts[i],
            };
            this.jieyuelishijilu.push(obj);
          }

        },
        error => {
          console.log(error, '获取档案盒列表数据--返回失败的数据');
        })
    },


    handleClickimport(index, row) {//Excel普通导入
      console.log(index, row, 'Excel普通导入');
    },
    //借阅历史记录
    handleClickLs(tab, event) {
      this.borrowhistoryfiles = []
      this.jieyuelishijiludangan = []
      this.jieyuelishi = []
      this.jieyuelishijilu = []
      console.log(tab.name, 'sssssssssssssssssssssssssssssssssssssss');
      if (tab.name == 'first') {  //借阅历史记录档案盒
        this.BrrowHistoryDAH();
      } else if (tab.name == 'second') { //档案
        this.borrowhistoryfiles = []
        this.jieyuelishijiludangan = []
        var data = {
          // "Table_name":"",
          "pIndex": 0,
          "pSize": 20
        };

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetJieYueHisDatas', data).then(
          success => {
            console.log(success, '获取借阅历史档案全部列表数据-成功');
            this.borrowhistoryfiles = success.data.data.table;
            for (let i = 0; i < success.data.data.headernames.length; i++) {
              let obj = {
                prop: success.data.data.headernames[i],
                label: success.data.data.headertexts[i],
              };
              this.jieyuelishijiludangan.push(obj);
            }

          },

          error => {
            console.log(error, '获取借阅历史档案全部列表数据--返回失败的数据');
          })
      } else { }
    },
    jieyuelishi(val) {

    },//
    jieyuelishichange(val) {
      console.log(val, 'ssssssssssssssss');
      if (val.length > 0) {
        this.jieyuelishitable_name = val[0].TableName
        this.jieyueliCODE = val[0].CODE
      } else {
        this.danganheCODE = '',
          this.danganheTable_name = ''
      }


    }, //借阅历史的档案盒 //
    jieyuelishichangedanan() { }, //借阅历史的档案//
    jieyuelishiall() { },//

    jieyuedanganhe() {  //借阅盒内文件


      if (this.jieyuelishitable_name == '') {
        this.$message.error("请选择要查看的盒内文件")
        return
      }

      else {
        this.loanhistoryTable = []
        this.jieyuelishijilu = []
        console.log(this.jieyuelishitable_name, 'this.danganheTable_name');
        var aaa = this.jieyuelishitable_name.slice(0, 4)
        var bbb = this.jieyuelishitable_name.slice(7, 16)
        var ccc = aaa + 'arch' + bbb
        console.log(aaa, 'asdsadfdjhbdjhbjdfsdf');
        console.log(bbb, 'dasdsdfsdfdfgd');
        var arr = {
          "pIndex": 0,
          "pSize": 20,
          "BoxCode": this.jieyueliCODE,
          "Table_name": ccc
        }

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetHNFileList', arr).then(success => {
          this.$message.success(success.data.message)
          this.loanhistoryTable = success.data.data.table;
          for (let i = 0; i < success.data.data.headernames.length; i++) {
            let obj = {
              prop: success.data.data.headernames[i],
              label: success.data.data.headertexts[i],
            };
            this.jieyuelishijilu.push(obj);
          }

          // this.filepopupwindowRFID = false
        }).catch(error => {
          console.log(error);
        }
        )
        console.log(arr, 'sadadasdasdasadcxz');
      }

    },//

    //档案著录
    Putdowntabs(tab, event) {
      console.log(tab, event, '档案著录');
      if (tab.name == 'second') {
        console.log('档案著录');
        this.DARecord();
      } else {
        this.DAH_Record();
      }
    },

    DARecord() {
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetNewCode', JSON.parse('{}')).then(//获取条码号
        success => {
          console.log(success, '获取条码号-成功');
          this.Putdownloan.archBoxbarcode = success.data.data.Code;
          this.Putdownloan.Boxbarcode = success.data.data.BoxCode;

        },
        error => {
          console.log(error, '获取条码号--返回失败的数据');
        })


      var data = {};
      data.Table_name = this.DATableDesignTittle;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData', data).then(
        success => {
          console.log(success, '获取著录项（档案）著录项列表数据-成功');
          this.DA_RecordInputList = [];
          success.data.data.forEach((item, index) => {
            this.DA_RecordInputList.push({
              value: '',
              label: item.XByName,//著录项
              type: item.XLx,//类型
              // length: item.MaxLength,//长度
              // need: need,//必填项
              // Hook: item.gjxname,//挂接
              RFIDHook: item.rfidgjx,//RFID挂接项
              XName: item.XName,//
              Table_Name: item.Table_Name,//表名
            })
          });

        },
        error => {
          console.log(error, '获取著录项（档案）著录项列表数据--返回失败的数据');
        })
    },

    DAH_Record() {
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetNewCode', JSON.parse('{}')).then(//获取条码号
        success => {
          console.log(success, '获取条码号-成功');
          this.Putdownloan.archBoxbarcode = success.data.data.Code;
          this.Putdownloan.Boxbarcode = success.data.data.BoxCode;

        },
        error => {
          console.log(error, '获取条码号--返回失败的数据');
        })


      console.log(this.Bus_MLId, '档案盒--著录--门类ID');
      console.log(this.DAH_TableDesignTittle, '档案盒--著录--表名');

      var data = {};
      data.Table_name = this.DAH_TableDesignTittle;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData_hgl', data).then(
        success => {
          console.log(success, '获取著录项（档案盒）著录项列表数据-成功');
          this.RecordInputList = [];
          success.data.data.forEach((item, index) => {

            this.RecordInputList.push({
              value: '',
              label: item.XByName,//著录项
              type: item.XLx,//类型
              // length: item.MaxLength,//长度
              // need: need,//必填项
              // Hook: item.gjxname,//挂接
              RFIDHook: item.rfidgjx,//RFID挂接项
              XName: item.XName,//
              Table_Name: item.Table_Name,//表名
            })
          });

          console.log(this.RecordInputList, ' this.RecordInputList');
        },
        error => {
          console.log(error, '获取著录项（档案盒）著录项列表数据--返回失败的数据');
        })
    },

    applyDAH() {
      console.log(this.RecordInputList, 'applyDAH档案盒应用的点击');
      var tempSetData = '';
      var tempTable_Name = '';
      this.RecordInputList.forEach(item => {
        tempSetData = tempSetData + item.XName + "='" + item.value + "',";
        tempTable_Name = item.Table_Name;
      });
      tempSetData = tempSetData.substring(0, tempSetData.length - 1);

      var data = {
        "Table_name": tempTable_Name,
        "CODE": this.Putdownloan.Boxbarcode,
        "SetData": tempSetData,
        "DATYPE": this.Bus_MLId,
        "UserID": "10"
      };

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddArchData', data).then(//添加一条新档案（盒）信息
        success => {
          console.log(success, '添加一条新档案（盒）信息-成功');
          this.$message.success(success.data.data);
          this.getDAHTableList();
          this.archivalinformation = false;
        },
        error => {
          console.log(error, '添加一条新档案（盒）信息--返回失败的数据');
        })
    },
    applyDA() {
      console.log(this.DA_RecordInputList, 'applyDA档案应用的点击');
      var tempSetData = '';
      var tempTable_Name = '';
      this.DA_RecordInputList.forEach(item => {
        tempSetData = tempSetData + item.XName + "='" + item.value + "',";
        tempTable_Name = item.Table_Name;
      });
      tempSetData = tempSetData.substring(0, tempSetData.length - 1);

      var data = {
        "Table_name": tempTable_Name,
        "CODE": this.Putdownloan.archBoxbarcode,
        "SetData": tempSetData,
        "DATYPE": this.Bus_MLId,
        "UserID": "10"
      };
      console.log(data, '...............');

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddArchData', data).then(//添加一条新档案（盒）信息
        success => {
          console.log(success, '添加一条新档案（盒）信息-成功');
          this.$message.success(success.data.data);
          this.getDATableList();
          this.archivalinformation = false;
        },
        error => {
          console.log(error, '添加一条新档案（盒）信息--返回失败的数据');
        })
    },
    Record() {//点击著录
      if (this.Bus_MLId == '') {
        this.$message.warning("请选择分类")
        return;
      }
      this.archivalinformation = true
      this.DAH_Record();

    },
    RecordClose() {
      console.log('关闭---著录--前的回调');
      this.RecordInputList = [];
      this.Putdownloan = {};

    },


    //借阅管理下拉列表
    // handleCommand(command) {
    //   if (command == "a") {//在借历史
    //     this.filepopupwindow = true;

    //     var arr = {
    //       name: 'first'
    //     }
    //     this.handleClick(arr)
    //   } else if (command == "b") {//借阅历史
    //     this.BrrowHistoryDAH();
    //     this.borrowinghistory = true;
    //   }
    // },
    atRorrowHistory() {//在借历史
      this.filepopupwindow = true;
      var arr = {
        name: 'first'
      }
      this.handleClick(arr)
    },
    onRorrowHistory() {//借阅历史
      this.BrrowHistoryDAH();
      this.borrowinghistory = true;
    },


    // handleCommandList(command) {
    //   if (command == "1") {//导出选中
    //     console.log('导出选中');
    //   } else if (command == "2") {//导出当前
    //     console.log('导出当前');
    //   }
    //   else if (command == "3") {//Excel普通导入
    //     console.log('Excel普通导入');
    //     this.archivalinformationImport = true;
    //   }
    //   else if (command == "4") {//Excel模板下载
    //     console.log('Excel模板下载');
    //   }
    // },

    // 
    jieyuedanganguihuan() {
      // this.danganhedanxuan

      this.fileboxreturn = true;
    },
    OnBrrowClose() {
      this.activeName = "first";
    },

    danganhefileboxreturn() {//档案盒归还 //
      // this.danganhedanxuan
      this.linshiTablename = ''
      this.linshiCODE = ''
      this.inputcfwz = ''
      this.valuegrriqi = ''
      this.inputcfwz = ''
      this.inputjgddh = ''
      this.inputphone = ''
      this.inputgh = ''
      this.title = '档案盒归还'
      console.log(this.fileboxforloanList, 'sadsadfdgdfgfd');
      if (this.fileboxforloanList.length > 0) {
        this.fileboxreturn = true

      } else {
        this.$message.error("请选择要归还的档案盒")
      }

    },
    danganfileboxreturn() {//档案归还
      this.linshiTablename = ''
      this.linshiCODE = ''
      this.inputcfwz = ''
      this.valuegrriqi = ''
      this.inputcfwz = ''
      this.inputjgddh = ''
      this.inputphone = ''
      this.inputgh = ''

      this.title = '档案归还'
      console.log(this.fileboxforloanList, 'fileboxforloanList');
      if (this.fileboxforloanList.length > 0) {
        this.fileboxreturn = true

      } else {
        this.$message.error("请选择要归还的档案")
      }


    },
    danxuanguihuankuang(val) {//
      console.log(val, 'sdasdadadasfdgdfgfg');
      this.linshiTablename = val[0].TableName
      this.linshiCODE = val[0].CODE
      this.inputcfwz = val[0].Address
      console.log(this.linshiCODE, this.linshiTablename, this.inputcfwz);
      // this.linshiTablename = val[0].ArchCode
    },
    yuqidanganhe() {
      this.FileonloanTable = []
      this.zaijielishihgl = []
      var data = {
        "Table_name": "a01_hgldata",
        "pIndex": 0,
        "pSize": 20,
        "type": 1
      };

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZaiJieDatas_hgl', data).then(
        success => {
          console.log(success, '获取逾期档案盒全部列表数据-成功');
          this.FileonloanTable = success.data.data.table;
          for (let i = 0; i < success.data.data.headernames.length; i++) {
            let obj = {
              prop: success.data.data.headernames[i],
              label: success.data.data.headertexts[i],
            };
            this.zaijielishihgl.push(obj);
          }

        },
        error => {
          console.log(error, '获取逾期档案盒列表数据--返回失败的数据');
        })
    },
    //
    weiyuqi() {
      this.FileonloanTable = []
      this.zaijielishihgl = []
      var data = {
        "Table_name": "a01_hgldata",
        "pIndex": 0,
        "pSize": 20,
        "type": 2
      };

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZaiJieDatas_hgl', data).then(
        success => {
          console.log(success, '获取未逾期档案盒全部列表数据-成功');
          this.FileonloanTable = success.data.data.table;
          for (let i = 0; i < success.data.data.headernames.length; i++) {
            let obj = {
              prop: success.data.data.headernames[i],
              label: success.data.data.headertexts[i],
            };
            this.zaijielishihgl.push(obj);
          }

        },
        error => {
          console.log(error, '获取未逾期档案盒列表数据--返回失败的数据');
        })
    },
    //
    danganhequanbu() {//档案盒全部
      var arr = {
        name: 'first'
      }
      this.handleClick(arr)
    },
    //
    danganquanbu() {//档案-全部
      var arr = {
        name: 'second'
      }
      this.handleClick(arr) //
    },
    //
    danganyuqi() {
      this.borrowingfilebox = []
      this.zaijielishi = []
      var data = {
        "Table_name": "a01_hgldata",
        "pIndex": 0,
        "pSize": 20,
        "type": 1
      };

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZaiJieDatas', data).then(
        success => {
          console.log(success, '获取逾期档案全部列表数据-成功');
          this.borrowingfilebox = success.data.data.table;
          for (let i = 0; i < success.data.data.headernames.length; i++) {
            let obj = {
              prop: success.data.data.headernames[i],
              label: success.data.data.headertexts[i],
            };
            this.zaijielishi.push(obj);
          }

        },
        error => {
          console.log(error, '获取逾期档案列表数据--返回失败的数据');
        })
    },
    //
    danganweiyuqi() {
      this.borrowingfilebox = []
      this.zaijielishi = []
      var data = {
        "Table_name": "a01_hgldata",
        "pIndex": 0,
        "pSize": 20,
        "type": 2
      };

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZaiJieDatas', data).then(
        success => {
          console.log(success, '获取未逾期档案全部列表数据-成功');
          this.borrowingfilebox = success.data.data.table;
          for (let i = 0; i < success.data.data.headernames.length; i++) {
            let obj = {
              prop: success.data.data.headernames[i],
              label: success.data.data.headertexts[i],
            };
            this.zaijielishi.push(obj);
          }

        },
        error => {
          console.log(error, '获取未逾期档案列表数据--返回失败的数据');
        })
    },
    //
    heneiwenjian() {//再借盒内文件
      // this.danganheCODE=val[0].CODE
      // this.danganheTable_name=val[0].TableName
      // this.FileonloanTable=[]
      if (this.danganheCODE == '' || this.danganheTable_name == undefined) {
        this.$message.error("请选择要查看的盒")
        return;
      } else {
        this.FileonloanTable = []
        this.zaijielishihgl = []
        console.log(this.danganheTable_name, 'this.danganheTable_name');
        var aaa = this.danganheTable_name.slice(0, 4)
        var bbb = this.danganheTable_name.slice(7, 16)
        var ccc = aaa + 'arch' + bbb
        console.log(aaa, 'asdsadfdjhbdjhbjdfsdf');
        console.log(bbb, 'dasdsdfsdfdfgd');
        var arr = {
          "pIndex": 0,
          "pSize": 20,
          "BoxCode": this.danganheCODE,
          "Table_name": ccc
        }

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetHNFileList', arr).then(success => {
          this.$message.success(success.data.message)
          this.FileonloanTable = success.data.data.table;
          for (let i = 0; i < success.data.data.headernames.length; i++) {
            let obj = {
              prop: success.data.data.headernames[i],
              label: success.data.data.headertexts[i],
            };
            this.zaijielishihgl.push(obj);
          }

          // this.filepopupwindowRFID = false
        }).catch(error => {
          console.log(error);
        })
        console.log(arr, 'sadadasdasdasadcxz');
      }
    },
    //RFID下拉列表 //

    // handleCommandRFID(command) {
    //   if (command == "c") {
    //     this.radio = '1'
    //     this.daiqueren()
    //     this.filepopupwindowRFID = true
    //   } else if (command == "d") {
    //     // 
    //     this.getPDResultList();
    //   }
    // },

    RFIDtdmRecord() {
      this.radio = '1'
      this.daiqueren()
      this.filepopupwindowRFID = true
    },


    getPDResultList() {
      this.filepopupwindowcheckcar = true;

      var dataRFID = {
        pIndex: 0,
        pSize: 100,

      };
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDPlanList", dataRFID).then(
        (res) => {
          console.log(res, '成功获取盘点车列表数据');
          this.fileTableRFIDcheckcar = [];
          this.DAcolumnInfoPDClist = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);
            return;
          }
          this.fileTableRFIDcheckcar = res.data.data.table;
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
            };
            this.DAcolumnInfoPDClist.push(obj);
          }

          console.log(this.DAcolumnInfoPDClist, 'this.DAcolumnInfoPDClist');
          console.log(this.fileTableRFIDcheckcar, 'this.fileTableRFIDcheckcar');
        },
        (err) => {
          console.log(err);
        }
      );
    },

    queren() {//通道门的确认
      //  console.log(val[0].ArchCode, 'ssssssssssssssssssssssssssssssssssss');

      console.log(this.arrlist, 'this.arrlistthis.arrlist');
      if (this.arrlist == '') {
        this.$message.error("请选择要确认通道门记录")
        return;
      }

      var arr = {
        "ArchCode": this.arrlist
      }
      // axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/ConfirmDoorData', arr).then(res => {
      //   this.$message.success('操作成功')

      // }).catch(error => {
      //   console.log(error);
      // })
    },


    deletest() { //删除通道门记录
      console.log(this.arrlist, 'this.arrlistthis.arrlist');
      if (this.arrlist == '') {
        this.$message.error("请选择要删除的通道门记录")
        return;
      }
      var arr = {
        "ArchCode": this.arrlist
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DeleteDoorData', arr).then(res => {
        this.$message.success('删除成功')
        this.filepopupwindowRFID = false;

      }).catch(error => {
        console.log(error);
      }
      )


      if (this.deletelist.length > 0) {//批量删除通道门记录
        this.deletelist.forEach((item, index) => {
          var arr = {
            "ArchCode": item.ArchCode
          }
          if (this.deletelist.length < 1) {
            this.$message.success('操作成功')
          }
          axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DeleteDoorData', arr).then(res => {


          }
          ).catch(error => {
            console.log(error);
          }
          )
        })
      }




    },



    //
    //档案盒修改
    handleEdit(index, row) {
      this.archivalinformation = true
      // alert("档案盒修改");
    },
    //档案盒删除
    handleDelete(index, row) {
      var handleDeleteList = {};
      handleDeleteList.Code = row.CODE_HGL;
      handleDeleteList.Table_name = this.DAH_TableDesignTittle;
      console.log(handleDeleteList, '传递的数据');

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelArchData', handleDeleteList).then(//删除档案信息 (档案盒)
        success => {
          console.log(success, '删除档案信息（档案盒）-成功');
          this.$message.success(success.data.data);
          this.getDAHTableList();
        },
        error => {
          console.log(error, '删除档案信息（档案盒）--返回失败的数据');
        })
    },
    //档案盒 盒借阅
    fileboxforloanClick(index, row) {
      this.DAarchive = '档案盒借阅'
      this.fileboxforloan = true;
      console.log(index, row, '当前选中的档案盒信息');
      this.CODE_HGL = row.CODE_HGL;
      this.DAH_ID = row.id;
      this.filelendingTble = [];
      this.filelendingTble.push({
        index: row.no,
        name: row.user,
        number: row.FileCount,
        barCode: row.CODE_HGL,
        address: row.ads,
      })
      var change = new Date(new Date().getTime());
      var Y = change.getFullYear() + "";
      var M = (change.getMonth() + 1 < 10 ? "0" + (change.getMonth() + 1) : change.getMonth() + 1) + "";
      var D = (change.getDate() < 10 ? "0" + (change.getDate()) : change.getDate()) + "";
      var h = (change.getHours() < 10 ? "0" + (change.getHours()) : change.getHours()) + "";
      var m = (change.getMinutes() < 10 ? "0" + (change.getMinutes()) : change.getMinutes()) + "";
      var s = (change.getSeconds() < 10 ? "0" + (change.getSeconds()) : change.getSeconds());
      var newDate = Y + M + D + h + m + s;
      this.Fileboxesloan.loannumber = newDate;


    },
    DA_fileboxforloanClick(index, row) {
      console.log(row, '数据数据数据数据数据数据数据数据数据数据数据');
      this.fileboxforloan = true
      this.DAarchive = '档案借阅'
      this.CODE = row.CODE;
      this.DA_ID = row.id;
      this.filelendingTble = [];
      this.filelendingTble.push({
        index: row.no,
        name: row.user,
        number: row.C00004,
        barCode: row.CODE,
        address: row.status,
      })

      var change = new Date(new Date().getTime());
      var Y = change.getFullYear() + "";
      var M = (change.getMonth() + 1 < 10 ? "0" + (change.getMonth() + 1) : change.getMonth() + 1) + "";
      var D = (change.getDate() < 10 ? "0" + (change.getDate()) : change.getDate()) + "";
      var h = (change.getHours() < 10 ? "0" + (change.getHours()) : change.getHours()) + "";
      var m = (change.getMinutes() < 10 ? "0" + (change.getMinutes()) : change.getMinutes()) + "";
      var s = (change.getSeconds() < 10 ? "0" + (change.getSeconds()) : change.getSeconds());
      var newDate = Y + M + D + h + m + s;
      this.Fileboxesloan.loannumber = newDate;
    },
    BrrowClose() {
      this.Fileboxesloan = {
        loannumber: "",
        loanphone: "",
        borrower: "",
        Borrowphone: "",
        Emailaddress: "",
        loandate: "",
        Loandays: "1",
        Borrowingnote: "",
        Putilization: "",
        agent: "",
        agentname: "admin",
      };
    },
    DA_OnBox(index, row) {//装盒
      if (this.multiSelectallboxes.length != 1) {
        this.$message.error("请选择一个档案盒装盒")
        return;
      }

      var data = {
        "Table_name": this.DATableDesignTittle,
        "id": row.id,
        "BoxCode": this.multiSelectallboxes[0].CODE_HGL
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateBoxCode', data).then(//装盒
        success => {
          console.log(success, '装盒-成功');
          if (success.data.code == 200) {
            this.$message.success(success.data.data);
            this.getDATableList();
            this.getDAHTableList();
          }
        },
        error => {
          console.log(error, '装盒--返回失败的数据');
        })




    },
    DA_OutBox(index, row) {//档案 移出盒
      console.log(index, row, '要移出的信息');
      console.log(this.DATableDesignTittle, 'this.DAH_TableDesignTittle');
      console.log(row.CODE, 'CODE_HGL');


      this.$confirm('是否将档案移出盒子' + ', 是否继续?', '移出盒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          "Table_name": this.DATableDesignTittle,
          "Code": row.CODE
        }
        console.log(data, '档案移出盒传递的数据');
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelBoxCode', data).then(//档案移出盒
          success => {
            console.log(success, '档案移出盒-成功');
            if (success.data.code == 200) {
              this.$message.success(success.data.data);
              this.getDATableList();
              this.getDAHTableList();
            }
          },
          error => {
            console.log(error, '档案移出盒--返回失败的数据');
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移出盒'
        });
      });

    },
    separateBox(index, row) {//档案盒 拆盒
      console.log(index, row, '要拆盒的信息');
      console.log(this.DAH_TableDesignTittle, 'this.DAH_TableDesignTittle');
      console.log(row.CODE_HGL, 'CODE_HGL');

      this.$confirm('正在拆盒' + ', 是否继续?', '拆盒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          "Table_name": this.DAH_TableDesignTittle,
          "BoxCode": row.CODE_HGL
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/ClearBoxCode ', data).then(//档案盒拆盒
          success => {
            console.log(success, '档案盒拆盒-成功');
            if (success.data.code == 200) {
              this.$message.success(success.data.data);
              this.getDAHTableList();
            }
          },
          error => {
            console.log(error, '档案盒拆盒--返回失败的数据');
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消拆盒'
        });
      });





    },



    OnShelf(index, row) {//档案盒 上架
      console.log(row, '要上架的档案数据');
      this.OnShelfdialogFormVisible = true;
      this.ONShelf_CODE_HGL = row.CODE_HGL;
      this.ONShelf_status = row.status;
    },
    DownShelf(index, row) {//档案盒 下架
      console.log(row, '要下架的档案数据');
      this.ONShelf_CODE_HGL = row.CODE_HGL;
      this.ONShelf_status = row.status;
      if (row.ads == '0区0列右侧0节0层0格') {
        this.$message.error("档案盒未上架，不能进行下架操作哦~")
        return;
      }
      this.$confirm('是否下架' + ', 是否继续?', '下架', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = {
          "Table_name": this.DAH_TableDesignTittle,
          "Code": this.ONShelf_CODE_HGL,
          "BoxCode": "",
          "StoreId": 0,
          "QuNo": 0,
          "ColNo": 0,
          "LeNo": 0,//节
          "DivNo": 0,
          "ZyNo": 0,
          "SxNo": 0,//顺序
          "status": 1
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchData123 ', data).then(//下架（档案盒）
          success => {
            console.log(success, '下架（档案盒）-成功');
            if (success.data.code == 200) {
              this.$message.success("下架成功");
              this.getDAHTableList();
            }
          },
          error => {
            console.log(error, '上架/下架（档案盒）--返回失败的数据');
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下架'
        });
      });

    },
    OnShelfSumbit() {

      console.log('');
      var tempStatus = '';
      if (this.ONShelf_status == "存档") {
        tempStatus = 1;
      } else {
        tempStatus = 0;
      }
      if (this.OnShelfForm.QuNo == '' || this.OnShelfForm.ColNo == '' || this.OnShelfForm.LeNo == '' || this.OnShelfForm.DivNo == '' || this.OnShelfForm.ZyNo == '' || this.OnShelfForm.SxNo == '') {
        this.$message.warning("请输入要上架的存位信息")
        return;
      }
      var data = {
        "Table_name": this.DAH_TableDesignTittle,
        "Code": this.ONShelf_CODE_HGL,
        "BoxCode": "",
        "StoreId": 18,
        "QuNo": this.OnShelfForm.QuNo,
        "ColNo": this.OnShelfForm.ColNo,
        "LeNo": this.OnShelfForm.LeNo,//节
        "DivNo": this.OnShelfForm.DivNo,
        "ZyNo": this.OnShelfForm.ZyNo,
        "SxNo": this.OnShelfForm.SxNo,//顺序
        "status": tempStatus
      }
      console.log(data, '上架前传递的数据');

      this.$confirm('是否上架到' + this.OnShelfForm.QuNo + '区' + this.OnShelfForm.ColNo + '列' + this.OnShelfForm.LeNo + '节' + this.OnShelfForm.DivNo + '层' + ', 是否继续?', '再次确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchData123 ', data).then(//上架/下架（档案盒）
          success => {
            console.log(success, '上架/下架（档案盒）-成功');
            if (success.data.code == 200) {
              this.$message.success("上架成功");
              this.OnShelfdialogFormVisible = false
              this.getDAHTableList();
            }

          },
          error => {
            console.log(error, '上架/下架（档案盒）--返回失败的数据');
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上架'
        });
      });




    },
    DAH_Borrow() {

      if (this.DAarchive == "档案盒借阅") {
        console.log(this.RecordInputList.RFIDHook, 'RFIDHookRFIDHook');
        console.log(new Date(), '222222222222');
        // console.log(, '111111111111111111');


        if (this.Fileboxesloan.Borrowphone == '') {
          this.$message.error("请输入手机号码")
          return
        }
        if (this.Fileboxesloan.borrower == '') {
          this.$message.error("请输入借阅人")
          return
        }
        if (this.Fileboxesloan.Loandays == '') {
          this.$message.error("请输入借阅天数")
          return
        }

        var tempNumber = ''
        var tempInfo = ''
        var GetXXBH_hglData = {};
        GetXXBH_hglData.Table_name = this.DAH_TableDesignTittle;
        GetXXBH_hglData.CODE = this.CODE_HGL;


        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetXXBH_hgl', GetXXBH_hglData).then(//获取信息编号(档案盒)
          success => {
            console.log(success, '获取信息编号(档案盒)-成功');
            tempNumber = success.data.data.number;
            tempInfo = success.data.data.info;
            console.log(tempInfo, 'tempInfo');
            console.log(tempNumber, 'tempNumber');
          },
          error => {
            console.log(error, '获取信息编号(档案盒)--返回失败的数据');
          })


        var data = {
          "Table_name": this.DAH_TableDesignTittle,
          "DAID": this.DAH_ID,//档案ID                      ~~~~~~~~~~~
          "CODE": this.CODE_HGL,
          "FATHERKEY": this.Bus_FatherKey,
          "LENDTYPE": this.Bus_MLId,//门类ID   
          "SERIALNO": this.Fileboxesloan.loannumber,//序列号
          "Address": this.filelendingTble.address,//存放位置    
          "info": tempInfo,//信息项                      ~~~~~~~~~~~
          "number": tempNumber,//编号项        ~~~~~~~~~~~
          "MLName": this.Bus_MLName,//门类名称
          "LENDUNAME": this.Fileboxesloan.borrower,//借阅人名称
          "MOBILE": this.Fileboxesloan.Borrowphone,//手机号
          "TEL": this.Fileboxesloan.loanphone,//电话号
          "EMAIL": this.Fileboxesloan.Emailaddress,
          "LYMD": this.Fileboxesloan.Putilization,//利用目的
          "LENDDATE": "2023-09-12 14:02:57",//借阅日期
          "LENDDAYS": this.Fileboxesloan.Loandays//借阅天数
        }
        // "DAID":19,档案ID
        // "LENDTYPE": 0,门类ID
        // "SERIALNO":"",序列号
        // "Address":"123",存放位置
        // "info":"132",信息项
        // "number":"15101638669",编号项
        // "MLName":"测试分类三3",门类名称
        // "LENDUNAME":"yzm",借阅人名称     borrower
        // "MOBILE":"15012315641",手机号    Borrowphone
        // "TEL":"123",电话号          loanphone
        // "EMAIL":"123",      Emailaddress
        // "LYMD":"1231",利用目的           Putilization
        // "LENDDATE":"2022-11-19 14:02:57",借阅日期   loandate 
        // "LENDDAYS":"1"借阅天数  Loandays
        console.log(this.Fileboxesloan, 'Fileboxesloan表单中的内容');
        console.log(data, '借阅接口需要传递的数据');


        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddLendData_hgl ', data).then(//添加档案盒借阅信息
          success => {
            console.log(success, '添加档案盒借阅信息-成功');
            if (success.data.code == 200) {
              this.$message.success("借阅成功");
              this.fileboxforloan = false;
              this.getDAHTableList();
            }

          },
          error => {
            console.log(error, '添加档案盒借阅信息--返回失败的数据');
          })

      } else {
        if (this.Fileboxesloan.Borrowphone == '') {
          this.$message.error("请输入手机号码")
          return
        }
        if (this.Fileboxesloan.borrower == '') {
          this.$message.error("请输入借阅人")
          return
        }
        if (this.Fileboxesloan.Loandays == '') {
          this.$message.error("请输入借阅天数")
          return
        }
        var tempNumber = ''
        var tempInfo = ''
        var GetXXBH_Data = {};
        GetXXBH_Data.Table_name = this.DATableDesignTittle;
        GetXXBH_Data.CODE = this.CODE;
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetXXBH', GetXXBH_Data).then(//获取信息编号(档案)
          success => {
            console.log(success, '获取信息编号(档案)-成功');
            tempNumber = success.data.data.number;
            tempInfo = success.data.data.info;
          },
          error => {
            console.log(error, '获取信息编号(档案)--返回失败的数据');
          })

        var GetXXBH_Data = {
          "Table_name": this.DATableDesignTittle,
          "DAID": this.DA_ID,//档案ID   
          "CODE": this.CODE,
          "FATHERKEY": this.Bus_FatherKey,
          "LENDTYPE": this.Bus_MLId,//门类ID   
          "SERIALNO": this.Fileboxesloan.loannumber,//序列号
          "Address": this.filelendingTble.address,//存放位置    
          "info": tempInfo,//信息项                      ~~~~~~~~~~~
          "number": tempNumber,//编号项        ~~~~~~~~~~~
          "MLName": this.Bus_MLName,//门类名称
          "LENDUNAME": this.Fileboxesloan.borrower,//借阅人名称
          "MOBILE": this.Fileboxesloan.Borrowphone,//手机号
          "TEL": this.Fileboxesloan.loanphone,//电话号
          "EMAIL": this.Fileboxesloan.Emailaddress,
          "LYMD": this.Fileboxesloan.Putilization,//利用目的
          "LENDDATE": "2023-09-12 14:02:57",//借阅日期
          "LENDDAYS": this.Fileboxesloan.Loandays//借阅天数
        }
        console.log(GetXXBH_Data, '档案借阅需要传递的数据');
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddLendData', GetXXBH_Data).then(//借阅(档案)
          success => {
            if (success.data.code == 200) {
              this.$message.success("借阅成功");
              this.fileboxforloan = false;
              this.getDATableList();
            }

          },
          error => {
            console.log(error, '借阅(档案)--返回失败的数据');
          })
      }


    },
    // 档案修改
    handleEditS(index, row) {
      console.log(index, row);
    },
    //档案删除
    handleDeleteS(index, row) {
      console.log(row, '1111111111111111111111111');
      var handleDeleteList = {};

      handleDeleteList.Code = row.CODE;
      handleDeleteList.Table_name = this.DATableDesignTittle;

      console.log(handleDeleteList, '传递的数据');
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelArchData', handleDeleteList).then(//删除档案信息 (档案)
        success => {
          console.log(success, '删除档案信息（档案）-成功');
          this.$message.success(success.data.data);
          this.getDATableList();

        },
        error => {
          console.log(error, '删除档案信息（档案）--返回失败的数据');
        })
    },

    //档案盒全选
    handleSelectallboxes(val) {
      console.log(val[0], 'cccccccccccccccc');
      this.multiSelectallboxes = val;
      this.CODE_HGL = val[0].CODE_HGL
    },
    //档案全选
    handleSelectionChange(val) {
      console.log(val[0], 'cccccccccccccccc');
      this.multiSelectallboxesList = val;
      this.CODE_HGL = val[0].CODE_HGL
    },
    //


    //
    //盘点车全选
    handleSelectionPandian(val) {
      console.log(val);
    },
    addPDRFID() {
      this.dialogVisibleRFID = true;
      this.PDTitle = '盘点添加'
    },
    //盘点车更新
    handleEditRFID(index, row) {
      this.dialogVisibleRFID = true;
      this.PDTitle = "盘点修改"
      this.inputghRFID = row.PName;
      this.PDPId = row.no;
    },
    //盘点车删除
    handleDeleteRIFD(index, row) {
      console.log(row, '1111111111111111111111');
      var handleDeleteRFID = {};

      handleDeleteRFID.PDPId = row.no;
      console.log(handleDeleteRFID, '传递的数据');

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelPDPlanData', handleDeleteRFID).then(//删除档案信息 (档案盒)
        success => {
          console.log(success, '盘点删除-成功');
          this.$message.success(success.data.data);
          // this.filepopupwindowcheckcar = false
          this.getPDResultList()
        },
        error => {
          console.log(error, '删除盘点）--返回失败的数据');
        })
    },
    //

    //
    daiqueren(val) {
      this.fileTableRFID = []
      this.filebiaotou = []
      this.filepopupwindowRFID = true;
      var nmbj = {

        "pIndex": 0,
        "pSize": 100,
        "IsConfirm": 0

      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDoorList', nmbj).then(res => {
        console.log(res, 'rfid表头成功了)');
        // this.fileTableRFID.push(res.data.data)
        this.fileTableRFID = res.data.data.table;
        for (let i = 0; i < res.data.data.headernames.length; i++) {
          let obj = {
            prop: res.data.data.headernames[i],
            label: res.data.data.headertexts[i],
          };
          this.filebiaotou.push(obj);
        }
        // console.log(   this.fileTableRFID[0].headertexts,'sdddddddddddddddddddddddddddddd');
        console.log(this.filebiaotou, ' this.fileTableRFID this.fileTableRFID');
        console.log(this.fileTableRFID, '  this.fileTableRFIDdsadasdasd');

      }).catch(error => {
        console.log(error);
      })
      console.log(val);
    },
    //
    //
    yiqueren() {
      this.fileTableRFID = []
      this.filebiaotou = []
      var nmbj = {

        "pIndex": 0,
        "pSize": 100,
        "IsConfirm": 1

      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDoorList', nmbj).then(res => {
        console.log(res, 'rfid表头成功了)');
        // this.fileTableRFID.push(res.data.data)
        this.fileTableRFID = res.data.data.table;
        for (let i = 0; i < res.data.data.headernames.length; i++) {
          let obj = {
            prop: res.data.data.headernames[i],
            label: res.data.data.headertexts[i],
          };
          this.filebiaotou.push(obj);
        }
        // console.log();
        // console.log(   this.fileTableRFID[0].headertexts,'sdddddddddddddddddddddddddddddd');

        console.log(this.filebiaotou, ' this.fileTableRFID this.fileTableRFID');
        console.log(this.fileTableRFID, '  this.fileTableRFIDdsadasdasd');

      }).catch(error => {
        console.log(error);
      }
      )
    },
    //

    //
    handleSelectionChange_TDM(val) {
      // console.log(val,'shadbasdjasbds');
      this.arrlist = val[0].ArchCode
      //  console.log(this.arrlist,'sdasdshdbsfjsdbjf');
    },

    handleSelectionChangehonghgl(val) {  //在借历史档案盒单选  //

      this.fileboxforloanList = []
      this.fileboxforloanList.push(...val)
      console.log(this.fileboxforloanList, ' 在借历史档案盒单选.在借历史档案盒单选 在借历史档案盒单选.在借历史档案盒单选');
      console.log(val, 'sagdvghsdgsghsvfhs');
      if (val.length > 0) {
        this.danganheCODE = val[0].CODE
        this.danganheTable_name = val[0].TableName
      } else {
        this.danganheCODE = '',
          this.danganheTable_name = ''
      }
      //  console.log(val[0].TableName,'sdddddddddd');
      //  console.log(val[0].CODE,'asdsaczcxzxczx');
    },
    handleSelecthonghgl(val) {//档案盒全选   
    },
    handleSelecthongdangan(val) {//档案全选  
      this.dangandanxuan = val[0].ArchCode
    },



    handleSelectionChangehonghgldangan(val) {//档案单选  
      this.fileboxforloanList = []
      this.fileboxforloanList.push(...val)
      console.log(this.fileboxforloanList, ' 档案单选档案单选档案单选');
    },


    //档案盒或者档案的归还按钮  
    huihuantijiao() {
      console.log(this.title, 'this.titlethis.title');

      if (this.fileboxforloanList.length == 0) {
        this.$message.error("请选择要归还的档案或档案盒")
        return;
      }

      if (this.title == '档案盒归还') {
        // console.log(this.arrlist, 'this.arrlistthis.arrlist');
        var arr = {
          "Table_name": this.linshiTablename,
          "CODE": this.linshiCODE,
          "RETURNDATE": this.valuegrriqi,
          "GHR": this.inputgh,
          "GHRSJ": this.inputphone,
          "GHRDH": this.inputjgddh,
          // 'inputcfwz':this.inputcfwz
          // inputcfwz: "", //档案盒存放位置
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAGH_hgl', arr).then(res => {
          console.log(res, '操作成功操作成功');
          this.$message.success('档案盒归还操作成功')
          this.fileboxreturn = false
          this.danganhequanbu()
        }).catch(error => {
          console.log(error);
        }
        )


        // if (this.deletelist.length > 0) {
        //   this.deletelist.forEach((item, index) => {
        //     var arr = {
        //       "ArchCode": item.ArchCode
        //     }
        //     if(this.deletelist.length<1){
        //       this.$message.success('操作成功')
        //     }
        //     axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DeleteDoorData', arr).then(res => {


        //     }
        //     ).catch(error => {
        //       console.log(error);
        //     }
        //     )
        //   })
        // }
      } else if (this.title == '档案归还') {
        console.log('进来了');
        console.log(this.linshiTablename, 'this.linshiTablename');
        // var aaa= this.linshiTablename.slice(0,4)
        //      var bbb= this.linshiTablename.slice(7,16)
        //      var ccc =aaa+'arch'+bbb
        "2023-09-04T16:00:00.000Z"
        "2023-01-01 00:00:00"
        var arr = {
          "Table_name": this.linshiTablename,
          "CODE": this.linshiCODE,
          "RETURNDATE": this.valuegrriqi,
          "GHR": this.inputgh,
          "GHRSJ": this.inputphone,
          "GHRDH": this.inputjgddh,
          // 'inputcfwz':this.inputcfwz
          // inputcfwz: "", //档案盒存放位置
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAGH', arr).then(res => {
          console.log(res, '操作成功操作成功');
          // var arr={
          //   name:'second'
          // }
          // this.handleClick(arr)
          this.$message.success('档案归还操作成功')
          this.fileboxreturn = false
          this.danganquanbu()
        }).catch(error => {
          console.log(error);
        }
        )
      } else { }



    },
    //
    quanxuan() {
      console.log(this.deletelist, 'sssssssssssssssssssss');
      // this.handleSelect(row)

    },


    handleSelect(row) {

      this.deletelist = []
      console.log(row, 'rowrowrow');
      this.deletelist.push(...row)
      console.log(this.deletelist, 'rowrowrowrowrowrow');
    },
    // 
    dialogVisibleadd() {
      if (this.PDTitle == '盘点修改') {
        console.log('盘点修改');

        if (this.inputghRFID == '') {
          this.$message.error("请输入档案计划名称")
          return;
        }

        var dataRFIdaa1 = {
          "PName": this.inputghRFID,
          "PDPId": this.PDPId,
          "UserId": "10"
        }
        console.log(dataRFIdaa1, '修改盘点计划--传递的数据');

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdatePDPlanData', dataRFIdaa1).then(//修改盘点计划
          success => {
            console.log(success, '修改盘点计划-成功');

            if (success.data.data == "已添加！") {
              this.$message.success("修改成功");
              this.dialogVisibleRFID = false
              this.getPDResultList()
            }

          },
          error => {
            console.log(error, '修改盘点计划--返回失败的数据');
          })
      }
      else {//盘点添加的确定按钮
        if (this.inputghRFID == '') {
          this.$message.error("请输入档案计划名称")
          return;
        }
        var dataRFIdaa = {
          "PName": this.inputghRFID,
          "PResult": "0",
          "UserId": "10",
        }
        console.log(dataRFIdaa, '传递的数据');

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddPDPlanData', dataRFIdaa).then(//添加盘点计划
          success => {
            console.log(success, '添加盘点计划-成功');
            this.$message.success(success.data.data);
            this.dialogVisibleRFID = false
            this.getPDResultList()
          },
          error => {
            console.log(error, '添加盘点计划--返回失败的数据');
          })
      }

    },
    PDClose() {
      console.log('PDClosePDClose');
      this.inputghRFID = '';
    },
    OnShelfClose() {
      console.log('OnShelfClose');
      this.OnShelfForm = {};
    },

    // 



  },
};
</script>

<style lang="scss">


</style>