<!-- 档案借阅 页面 -->
<template>
  <div>
    <div>
      <Navbar :name="message" />
    </div>
    <div class="top">
      <div class="top-button">
        <el-col :span="9" class="span_right">
          <el-cascader v-model="configFormData" :options="options" :props="cascadeProps" :show-all-levels="false"
            placeholder="请选择档案分类" clearable @focus="focusdafl" @visible-change="getvisible_change"></el-cascader>
          <el-select v-model="sousuox" placeholder="请选择搜索项">
            <el-option label="所有搜索项" value="所有搜索项">
            </el-option>
            <el-option v-for="item in options1" :key="item.XName" :label="item.label" :value="item.XName">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input placeholder="请输入关键词" v-model="queryInfo.query" clearable @clear="geclearable"></el-input>
        </el-col>
        <el-button type="primary" slot="append" icon="el-icon-search" :loading="loading" style="width:7vw;"
          @click="getSearchList('chaxun',currentPage_m,pageSize)">查询</el-button>
        <el-button type="danger" icon="el-icon-folder-delete" @click="getEmpty">清空</el-button>

          <el-button type="primary" icon="el-icon-notebook-2" @click="daHjy()">档案盒查询</el-button>
      </div>
    </div>
    <div class="container">
      <div style="height:25rem">
        <!-- border  tooltip-effect="dark" stripe-->

        <el-table ref="multipleTable" :data="tableData" align="center" max-height="600" height="600"
          :header-cell-style="{ background: '#F3F4F7', color: '#000', border: '1px solid rgb(84, 83, 83)' }"
          highlight-current-row style="width: 100%" @select-all="selectAll" @selection-change="handleSelectionChange"
          @row-click="rowClick" :row-style="rowStyle" :row-class-name="rowClassName">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <!-- 自定义索引 -->
          <el-table-column type="index" label="序号" width="70" align="center">
          </el-table-column>
          <el-table-column prop="xinxi" label="信息" width="850" align="center">
          </el-table-column>
          <el-table-column prop="bianhao" label="编号" width="150" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="weizhi" label="位置" width="350" align="center">
          </el-table-column>
          <el-table-column prop="zhuangtai" label="状态" width="150" align="center">
          </el-table-column>
          <el-table-column ref="multipleButton" label="操作" width="300" align="center">
            <!-- <el-button size="" type="xiangxixinxi" @click="getMessage(scope.$index, scope.row)">详细信息</el-button> -->
            <template slot-scope="scope">
              <!-- <el-button size="" type="xiangxixinxi" @click="getMessage(scope.$index, scope.row)">详细信息</el-button> -->
              <el-dialog title="详细信息" :visible.sync="centerDialogVisible" width="30%" center>
                <div>存位：{{ cunAds }}</div>
                <div><!-- 盒号： -->{{ HeNumber }}</div>
                <div><!-- 存放状态： -->{{ cunfangStatus }}</div>
                <div><!-- 标签写入状态： -->{{ biaoqianWriteStatus }}</div>
                <div><!-- 著录日期： -->{{ riqi }}</div>
              <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
              </span> -->
              </el-dialog>
              <el-button size="mini" type="primary" @click="caozuoKaijia(scope.$index, scope.row)">开架</el-button>
              <!-- <el-button size="" type="ziSe" @click="handleSouxun(scope.$index, scope.row)">搜寻</el-button> -->
              <!-- <el-dialog title="正在扫描" :visible.sync="centerDialogVisible1" width="30%" center>
                <div>搜寻中……</div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="centerDialogVisible1 = false">取 消</el-button>
                </span>
              </el-dialog> -->
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
            </template>


          </el-table-column>
        </el-table>

      </div>

      <div class="footer">
        <div class="fyq">
          <!--page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的-->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage_m"
            :page-sizes="[10, 20, 30, 40,50,100]" :page-size="pageSize" background layout="total, sizes, prev, pager, next, jumper"
            ref="pageGroup" :total="total">
          </el-pagination>
        </div>
        <el-button type="primary" :disabled="isDisable" @click="quanxuan">全 选</el-button>
        <el-button type="primary" :disabled="isDisable" @click="noquanxaun">取消选择</el-button>
        <!-- <el-button type="primary" :disabled="isDisable" @click="onSubmit">借阅</el-button> -->
        <el-dialog title="办理借阅手续" :visible.sync="dialogFormVisible" center>
          <el-form :model="form" :inline="true" class="dialogForm">

            <el-form-item label="流水号:" :label-width="formLabelWidth">
              <el-input v-model="form.liushuiNo" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item :required="true" label="借阅人:" :label-width="formLabelWidth">
              <el-input ref="JYNameInput" v-model="form.JYName" autocomplete="off" clearable maxlength="10"
                placeholder="请输入借阅人"></el-input>
            </el-form-item>

            <el-form-item :required="true" label="手机号:" :label-width="formLabelWidth">
              <el-input ref="PhoneInput" v-model="form.Phone" autocomplete="off" clearable maxlength="11"
                placeholder="请输入您的手机号"></el-input>
            </el-form-item>


            <el-form-item label="固定电话:" :label-width="formLabelWidth">
              <el-input v-model="form.Tel" autocomplete="off" clearable maxlength="11" placeholder="请输入您的固定电话"></el-input>
            </el-form-item>


            <el-form-item label="EMail:" :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off" clearable maxlength="20"
                placeholder="请输入您的EMail"></el-input>
            </el-form-item>

            <el-form-item label="利用目的:" :label-width="formLabelWidth">
              <el-input v-model="form.purpose" autocomplete="off" clearable maxlength="20"
                placeholder="请输入您的利用目的"></el-input>
            </el-form-item>

            <el-form-item label="借阅天数:" :label-width="formLabelWidth">
              <el-input v-model="form.JYday" autocomplete="off" clearable maxlength="20"
                placeholder="请输入您的借阅天数"></el-input>
            </el-form-item>

            <el-form-item label="借阅日期:" :label-width="formLabelWidth">
              <el-input v-model="form.JYdate" autocomplete="off" clearable :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="经办日期:" :label-width="formLabelWidth">
              <el-input v-model="form.JBdate" autocomplete="off" clearable :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="备注:" :label-width="formLabelWidth">
              <el-input v-model="form.comment" autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                clearable maxlength="50" show-word-limit placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>

        <!-- <el-button type="primary" @click="onCancel">返 回</el-button> -->
      </div>
    </div>
  </div>
</template>
    
<script>
import  Navbar  from "./Navbar.vue";
import { mapGetters } from "vuex";
import axios from 'axios'
import { getDanganMenlei, getSearchXiang, getSearchDanganHe, getCodeInfo, getSouXun } from '@/api/request.js'//引入请求

export default {
  components: {
    Navbar,
  },

  data() {
    return {
      message: "档案卷查询", //标题栏标题
      isRunning: "true",//扫描按钮是否被点击
      isScan: "true",//扫描按钮是否被点击
      loading: false,//查询按钮是否被点击
      isDisable: true,//按钮是否禁用;初始状态为非禁用状态
      tableData: [],
      multipleSelection: [],
      configFormData: [],
      cascadeProps: {
        emitPath: true,//在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值
        multiple: false,//是否多选
        expandTrigger: 'hover',//次级菜单的展开方式
        checkStrictly: true,//是否严格的遵守父子节点不互相关联
        // 启用懒加载
        // lazy: true,
        // 远程数据访问
        // lazyLoad: async (node, resolve) => {
        //   const { configFormData, level } = node
        //   const parentCode = level === 0 ? '000' : configFormData.nodeCode
        //   const nodes = await this.getRemoteData(parentCode, level)
        //   // 去除重复节点
        //   let nodeFilter = nodes.filter(n => {
        //     if (!this.optionList.includes(n.value)) {
        //       return n
        //     }
        //   })
        //   resolve(nodeFilter)
        // },
      },
      options: [],//选择档案分类
      options1: [//选择搜索项，默认是所有的搜索项
        // {
        //   value: "所有搜索项",
        //   label: "所有搜索项"
        // }
      ],
      sousuox: '所有搜索项',//搜索项
      // 获取列表的参数对象
      queryInfo: {//查询参数
        query: "",// 输入框中的内容
        pagenum: 1,// 每页显示条数
        pagesize: 2,
      },
      centerDialogVisible: false,//控制“详细信息”按钮的对话框
      centerDialogVisible1: false,//控制“搜寻”按钮的对话框
      cunAds: '',//存位
      HeNumber: '',//盒号
      cunfangStatus: '',//存放状态
      biaoqianWriteStatus: '',//标签写入状态
      riqi: '',//著录日期
      dialogFormVisible: false,
      form: {
        liushuiNo: '',//流水号
        JYName: '',//借阅人
        Phone: '',//手机号
        Tel: '',//固定电话
        email: '',//EMail
        purpose: '',//利用目的
        JYday: '1',//借阅天数
        JYdate: '',//借阅日期
        JBdate: '',//经办日期
        comment: ''//备注
      },
      formLabelWidth: '80px',
      url:'127.0.0.1:8080',
      ServeIp:'127.0.0.1',
      ServePort:'8080',
      timer:null,
      buttonSatausTimer:null,
      currentPage_m: 1,//默认开始页面
      total: 0,//共多少条数据
      pageSize: 10,//总共多少页
      seniorSearchAxiosData:{},//高级搜索接口需要传递的参数
      cur_MLId:'',//当前选择的MLId
      isSearchOrSeniorSearch:true,//用来判断是普通搜索还是高级搜索(true表示为普通搜索)
      HandleState:false,// HandleState：当前是连续扫描的状态
      HandleFlag:false, // HandleFlag：一直按着按钮会变成true
      isSearch_OrSenior_OrScan:'',//1代表是普通搜索，2代表是高级搜索，3代表是扫描
    
    };
  },
  computed: {//计算属性
    ...mapGetters(["name"]),
  },

  watch: {
    tableData: { //监听tableData数据,每当数据改变时，这个函数会执行
      handler(newValue, oldValue) {
        // console.log(newValue, oldValue, 'jianting1111111');
        // console.log(newValue.length, 'newValue');
        if (newValue.length > 0) {//如果表中数据为空，则设置按钮禁用
          this.isDisable = false;
        } else {
          this.isDisable = true;
        }
      },
      // deep: true,// 深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
    },
    options1: { //监听options1数据,每当数据改变时，这个函数会执行
      handler(newValue, oldValue) {
        console.log(newValue, oldValue, '监听');
        // this.sousuox.[]=newValue;
      },
      // deep: true,// 深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
    },
    sousuox: { //监听options1数据,每当数据改变时，这个函数会执行
      handler(newValue, oldValue) {
        console.log(newValue, oldValue, '监听22222222222');
        // this.sousuox.[]=newValue;
      },
      // deep: true,// 深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
    }
  },
  created() {
    this.ServeIp=this.$store.state.user.ServeIp;
    this.ServePort=this.$store.state.user.ServePort;
    this.ServeRfid=this.$store.state.user.vuexRfid;
    this.url=this.$store.state.user.ServeIp+':'+this.$store.state.user.ServePort;
    this.showGetData();
  },
  destroyed(){
    clearInterval(this.timer);
    this.timer=null;
  },
  methods: {
    daHjy(){
      this.$router.push(`/mjjShow`);
    },
    showGetData() {
      // console.log('发送请求 1111111111');
      let data = {
        cmd: '30025',//卷管理，获取到的搜索项
        UserId: '10',
        localip: "10.168.2.60"
      };
      getSearchXiang(data,this.url).then(rs => {
        this.options1 = rs.data
        // for (let i = 0; i < rs.data.length; i++) {
        //   this.options1.push({
        //     value: rs.data[i].XName,
        //     label: rs.data[i].XName,
        //   })
        // }
      })
        .catch(err => {
          // console.log(err, '请求失败111111111');
        })
    },
    getvisible_change(Val) {//下拉框出现/隐藏时触发
      if (Val) {//下拉框“出现”时触发
        if (this.options.length == 0) {//如果有值，则不请求
          // console.log('8888888888888888888888888888888888888888888');
          let data = {
            cmd: '50001',
            localip: "10.168.2.60"//内容填啥无影响
          };
          getDanganMenlei(data,this.url).then(rs => {
            console.log(rs, '档案分类————返回的数据');
            // console.log(rs.data.subdata.length,'1234567890');
            for (let i = 0; i < rs.data.length; i++) {//第一层
              // console.log(i, 'i^^^^^^^^^^^^^^');
              if (rs.data[i].subdata.length > 0) {
                this.options.push({
                  value: rs.data[i].MLName,
                  label: rs.data[i].MLName,
                  children: [],
                })
                // this.$set(this.configFormData, 0, rs.data[i].MLName)
              } else {
                this.options.push({
                  value: rs.data[i].MLName,
                  label: rs.data[i].MLName,
                })
              }
              // this.options[i].label = rs.data[i].MLName;
              // this.options[i].value = rs.data[i].MLName;
              for (let j = 0; j < rs.data[i].subdata.length; j++) {//第二层
                // console.log(j, 'j--------------');
                if (rs.data[i].subdata[j].subdata.length > 0) {
                  this.options[i].children.push({
                    value: rs.data[i].subdata[j].MLName,
                    label: rs.data[i].subdata[j].MLName,
                    children: [],
                  })
                } else {
                  this.options[i].children.push({
                    value: rs.data[i].subdata[j].MLName,
                    label: rs.data[i].subdata[j].MLName,
                  })
                }
                //   this.options[i].children[j].label = rs.data[i].subdata[j].MLName;
                //   this.options[i].children[j].value = rs.data[i].subdata[j].MLName;
                for (let m = 0; m < rs.data[i].subdata[j].subdata.length; m++) {//第三层
                  // console.log(m, 'm~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                  if (rs.data[i].subdata[j].subdata[m].subdata.length > 0) {
                    this.options[i].children[j].children.push({
                      value: rs.data[i].subdata[j].subdata[m].MLName,
                      label: rs.data[i].subdata[j].subdata[m].MLName,
                      children: [],
                    })
                  } else {
                    this.options[i].children[j].children.push({
                      value: rs.data[i].subdata[j].subdata[m].MLName,
                      label: rs.data[i].subdata[j].subdata[m].MLName,
                    })
                  }
                  for (let n = 0; n < rs.data[i].subdata[j].subdata[m].subdata.length; n++) {//第四层
                    // console.log(n, 'mnnnnnnnnnnnn')
                    if (rs.data[i].subdata[j].subdata[m].subdata[n].subdata.length > 0) {
                      this.options[i].children[j].children[m].children.push({
                        value: rs.data[i].subdata[j].subdata[m].subdata[n].MLName,
                        label: rs.data[i].subdata[j].subdata[m].subdata[n].MLName,
                        children: [],
                      })
                    } else {
                      this.options[i].children[j].children[m].children.push({
                        value: rs.data[i].subdata[j].subdata[m].subdata[n].MLName,
                        label: rs.data[i].subdata[j].subdata[m].subdata[n].MLName,
                      })
                    }
                  }
                }
              }
            }
          })
            .catch(err => {
              console.log(err, '请求失败111111111');
            })
        }
      } else {//下拉框“隐藏”时触发
        console.log('下拉框“隐藏”时触发');
        // this.options = [];//失去焦点后清空数据
      }
    },
    focusdafl() {//“请选择档案分类”当获得焦点时触发
    },
    onSubmit() {//借阅选中
      // console.log('1111111')
      console.log(this.multipleSelection, '借阅选中')
      if (this.multipleSelection.length == 0) {
        this.$notify.warning({
          title: '警告',
          message: '请您选择要借阅的档案',
          offset: 80,//偏移量
        });
      }

      // else if(this.multipleSelection){

      // } 
      else {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].zhuangtai == "未上架") {
            this.$message.error("包含未上架档案无法办理借阅业务，请移除未上架档案！");
            // i=this.multipleSelection.length+1;//只要有一个是在借，所有的档案都不可以借阅
            return;
          }
          if (this.multipleSelection[i].zhuangtai == "在借") {
            this.$message.error("包含在借档案无法办理借阅业务，请移除在借档案！");
            i=this.multipleSelection.length+1;//只要有一个是在借，所有的档案都不可以借阅
            return;
          }
          else {
            this.dialogFormVisible = true;
            var date = new Date();
            var time = date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, 0) + '' + date.getDate().toString().padStart(2, 0) + '' + date.getHours().toString().padStart(2, 0) + '' + date.getMinutes().toString().padStart(2, 0) + '' + date.getSeconds().toString().padStart(2, 0);
            this.form.liushuiNo = time;
            var time1 = date.getFullYear() + '/' + (date.getMonth() + 1).toString().padStart(2, 0) + '/' + date.getDate().toString().padStart(2, 0) + ' ' + date.getHours().toString().padStart(2, 0) + ':' + date.getMinutes().toString().padStart(2, 0) + ':' + date.getSeconds().toString().padStart(2, 0);
            this.form.JYdate = time1;
            this.form.JBdate = time1;
          }
        }


      }
    },
    submit() {//档案借阅手续的提交按钮
      console.log(this.form.Phone, 'this.form.Phone');
      console.log(this.form.Phone.length, 'this.form.Phonelength');
      console.log('this.form.JYName', this.form.JYName);

      if (this.form.Phone == ' ' || this.form.Phone.length != 11) {
        this.$message.error("请输入正确格式的手机号");
        this.$refs.PhoneInput.focus();//如果输入的格式不对，则手机号输入框获取焦点
      }
      else if (this.form.JYName == '') {
        this.$message.error("请输入借阅人")
        this.$refs.JYNameInput.focus();//如果输入框中借阅人没有信息，则获取焦点
      }
      else {
        console.log(this.multipleSelection, 'multipleSelectionmultipleSelectionmultipleSelection');
        for (let i = 0; i < this.multipleSelection.length; i++) {
          let data = {
            "Code": this.multipleSelection[i].Code,
            "cmd": 30010,//30035档案借阅
            "et_daylen": this.form.JYday,
            "et_email": this.form.email,
            "et_jbdate": this.form.JBdate,
            "et_jydate": this.form.JYdate,
            "et_mudi": this.form.purpose,
            "et_name": this.form.JYName,
            "et_no": this.form.liushuiNo,
            "et_phone": this.form.Phone,
            "localip": "127.0.0.1"
          };
          console.log(data, '要提交的数据');
          getSearchXiang(data,this.url).then(rs => {//这里的函数名字没有换，因为里边内容都是一样的，不一样的地方就是data中
            console.log(rs, '请求返回的数据');
            if (rs.status == '0') {
              this.$message.success("借阅成功");
              this.getSearchList();
            }
          })
            .catch(err => {
              console.log(err, '档案借阅--请求失败111111111');
            })
        }
        this.dialogFormVisible = false
      }
    },

    onCancel() {//返回
      this.$router.push(`/home`);
    },
    quanxuan() {//全选按钮
      this.$refs.multipleTable.toggleAllSelection();
    },
    noquanxaun() {//取消全选
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {//当选择项发生变化时会触发该事件
      this.multipleSelection = val;
      console.log(val, "函数调用中val的值");
    },
    selectAll(selection) {//表格中的 全选
      console.log("全选函数被执行");
    },
    getSearchList(type,pIndex,pSize) {//搜索
      console.log("触发了搜索按钮的点击事件");
      // console.log(this.queryInfo.query)
      let i = this.configFormData.length - 1;
      console.log(this.configFormData[i], '999999999999999999999');
      if (this.queryInfo.query == '') {
        this.voiceBroadcast('请输入搜索的关键字');
        this.$message.error('请输入搜索的关键字');
      }
      else if (this.configFormData[i] == undefined) {
        this.voiceBroadcast('请选择档案分类');
        this.$message.error('请选择档案分类');
      }
      else {
        this.tableData = [];//让表格数据的内容为空

        if (this.sousuox == undefined) {
          var xname = this.options1[0].label;
        } else {
          var xname = this.sousuox;
        }
        let data = {
          MLName: this.configFormData[i],
          XName: xname,
          "cmd": 30026,
          "localip": "10.168.2.51",
          "pageno": pIndex||1,
          "pagesize": pSize||10,
          "txtSearch": this.queryInfo.query
        };
        console.log(this.options1, 'options1');
        console.log(this.sousuox, 'sousuox');
        axios.post('http://'+this.ServeIp+':'+this.ServePort+'/KFPTService/getRfid',data).then(rs=>{
          console.log(rs, '30026接口返回的数据1');
          var rs=rs.data;
          this.total=rs.count;

            if(rs.data.length==0){
            this.$message.warning("暂无数据")
            return;
          }
          for (let i = 0; i < rs.data.length; i++) {
            switch (rs.data[i].States) {
              case 0: var status = "未上架"; break;
              case 1: var status = "在库"; break;
              case 2: var status = "在借"; break;
              default: break;
            }
            var T_Number='';
            var T_Info='';
            if (rs.data[i].Number == '') {//处理后端返回的状态数据
              T_Number = "暂无编号"
            }else{
              T_Number=rs.data[i].Number
            }
            if (rs.data[i].Info == '') {//处理后端返回的状态数据
              T_Info = "暂无信息"
            }else{
              T_Info=rs.data[i].Info
            }
            this.tableData.push({
              xuhao: rs.data[i].No,
              xinxi: T_Info,
              bianhao: T_Number,
              weizhi: rs.data[i].Ads,
              zhuangtai: status,
              Code: rs.data[i].Code,
              RFID: rs.data[i].rfid
            })
          }
          this.loading = false;//取消按钮 加载中 的状态
        })
          .catch(err => {
            console.log(err, '请求失败111111111');
          })
      }
    },
    geclearable() { //清空输入框
      console.log("触发了清空输入框的点击事件");
    },
    getEmpty() {//清空
      console.log("触发了清空按钮的点击事件");
      this.tableData = [];//让表格数据的内容为空
    },
    rowStyle({ row, rowIndex }) {//行的style的回调方法
      Object.defineProperty(row, 'rowIndex', { //给每一行添加不可枚举属性rowIndex来标识当前行
        value: rowIndex,
        writable: true,
        enumerable: false
      })
    },
    rowClick(row, column, event) {//【当某一行被点击时会触发该事件】监听row-click事件，实现选中
      let multipleTable = this.$refs.serveTable; // 获取表格对象
      let findRow = this.multipleSelection.find(c => c.rowIndex == row.rowIndex);  //找到选中的行
      if (findRow) {
        // this.$refs.multipleTable.toggleRowSelection(row);
        this.$refs.multipleTable.toggleRowSelection(row, false);  //如果重复选中，则取消选中
        return;
      }
      this.$refs.multipleTable.toggleRowSelection(row, true); // 实现选中行中选中事件
    },
    rowClassName({ row, rowIndex }) {//【行的className的回调方法，也可以使用字符串为所有行设置一个固定的className】实现选中高亮
      let rowName = "",
        findRow = this.multipleSelection.find(c => c.rowIndex === row.rowIndex);
      if (findRow) {
        rowName = "current-row ";
      }
      return rowName; //也可以再加上其他类名 如果有需求的话
    },
    getMessage(index, row) {//“详细信息” 点击事件
      // console.log('111111111111');
      this.centerDialogVisible = true;
      // this.$message('详细信息的点击事件');
      // console.log(index, row, 'index,row');
      // console.log(this.'');
      let data = {
        "cmd": 30027,//30027通过Code获取档案位置信息(档案详细信息)
        "Code": row.Code,
        "localip": "127.0.0.1"
      };
      getCodeInfo(data,this.url).then(rs => {
        this.cunAds = rs.data.SouXunMJJXXAds;
        var str = rs.data.SouXunFileBox;
        var strs = str.split('\n');
        // console.log(strs, '111111111111111111');
        this.HeNumber = strs[0];
        this.cunfangStatus = strs[1];
        this.biaoqianWriteStatus = strs[2];
        this.riqi = strs[3];
        // console.log(rs, '30032接口返回的数据');
      })
        .catch(err => {
          console.log(err, '请求失败111111111');
        })
    },
    caozuoKaijia(index, row) {//开架操作
      console.log('开架的点击事件');
    console.log(index, row);
    let data = {
        "Code": row.Code,
        "cmd": 40025,
        "localip": "127.0.0.1",
    }
    getSearchXiang(data,this.url).then(rs => {
        console.log(rs, '档案盒管理--开架接口返回的数据');
        if (rs === 1) {
            this.$message({
                message: "开架成功",
                type: "success",
            });
            // this.getSearchList()
        } else if (rs == 102) {
            this.$message({
                message: "未找到密集架信息",
                type: "error",
            });
        } else if (rs == 101) {
            this.$message({
                message: "未找到门类名称",
                type: "error",
            });
        } else if (rs == 102) {
            this.$message({
                message: "未找到档案盒",
                type: "error",
            });
        } else {
            this.$message({
                message: "操作错误",
                type: "error",
            });
        }
    }).catch(err => {
        console.log(err, '档案盒管理--开架请求失败111111111');
    })

    },
    handleSouxun(index, row) {//搜寻
      this.centerDialogVisible1 = true;
      console.log(row, '这里！！！！！！！！！');
      let data = {
        "cmd": 30033,//30033 通过RFID获取档案盒位置
        "SouXunFileEPC": row.RFID,
        "localip": "127.0.0.1"
      };
      getSouXun(data,this.url).then(rs => {
        console.log(rs, '搜寻返回的数据');
      })
        .catch(err => {
          console.log(err, '请求失败111111111');
        })
    },
    handleDelete(index, row) {//移除
      // console.log('index,row',index,row);
      // this.$message('移除的点击事件');
      // console.log(this.tableData,'shuju');
      this.tableData.splice(index, 1);
    },
    handleSizeChange(val) {//处理页码大小//分页器
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      if(this.isSearchOrSeniorSearch){//如果是true表示普通搜索
        this.getSearchList('chaxun',this.currentPage_m,val);
      }else{
        this.getSeniorSearchList(this.seniorSearchAxiosData,this.currentPage_m,val);//高级搜索
      }
    },
    handleCurrentChange(val) {//当前页变动时触发
      console.log(`当前页: ${val}`);
      this.currentPage_m=val;
      if(this.isSearchOrSeniorSearch){//如果是true表示普通搜索
        this.getSearchList('chaxun',val,this.pageSize);//搜索
      }else{
        this.getSeniorSearchList(this.seniorSearchAxiosData,val,this.pageSize);//高级搜索
      }
      if (this.currentPage_m == 1) {//如果当前页码为1，则设置按钮禁用
        console.log('444444444');
        this.isDisablePervious = true;//设置禁用状态
      }
    },

  },
};
</script>
    
<style lang="scss" scoped>
::v-deep .el-table__body tr.current-row>td {
  //修改当前行高亮色
  background: #d3d3d3 !important;
}

::v-deep .el-table__row>td {
  //设置表格内边框
  border: .0313rem solid rgb(84, 83, 83);
}

.el-button--ziSe {
  //新增按钮的type类型颜色
  background: #9400D3 !important;
  border-color: #9400D3 !important;
  color: rgb(255, 255, 255);
}

.el-button--xiangxixinxi {
  background: #00C5CD !important;
  border-color: #00C5CD !important;
  color: rgb(255, 255, 255);
}
.el-button{
  font-size: 1.2vw;
}
::v-deep .el-input__inner{
  font-size: 1.2vw !important;
  height:2.7vw !important;
  line-height: 2.7vw !important;
}
.el-select-dropdown__item{
  font-size: 1.2vw;
}
::v-deep .el-cascader-menu__list{
  font-size: 1vw !important;
}

::v-deep .el-dialog--center .el-dialog__body{
  font-size: 1vw;
}
::v-deep .el-dialog__title {
    font-size: 1.2vw ;
}

::v-deep .el-input__inner{
  font-size: 1.2vw !important;
  height:2.7vw !important;
  line-height: 2.7vw !important;
}

::v-deep .el-input__inner{
  font-size: 1.2vw !important;
  height:2.7vw !important;
  line-height: 2.7vw !important;
}
.el-select-dropdown__item{
  font-size: 1.2vw;
}
::v-deep .el-cascader-menu__list{
  font-size: 1vw !important;
}
::v-deep .el-pagination__total{
    font-size: 1.2vw !important;
  }
::v-deep .el-pagination__jump{
    font-size: 1.2vw !important;
  }

::v-deep .el-pagination .el-select .el-input{
    width: 10vw;
  }
::v-deep .el-select-dropdown__item{
    font-size: 1vw !important;
  }
::v-deep .el-pager li{
    font-size: 1.5vw;
    height: 2vw;
    line-height: 2vw;
  }
::v-deep .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  width: 3vw;
  height: 2vw;
  font-size: 1.5vw;
}
::v-deep .el-pagination .btn-prev .el-icon, .el-pagination .btn-prev .el-icon{//下一页图标
  font-size: 1.2vw;
}
::v-deep .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{//下一页小箭头
  width: 3vw;
  height: 2vw;
  font-size: 1.5vw;
}

::v-deep .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{//下一页图标
  font-size: 1.2vw;
}
.el-select-dropdown__item{
  font-size: 1.2vw;
}
::v-deep .el-cascader-menu__list{
  font-size: 1vw !important;
}
.top {
  margin-top: 1.25rem;
  margin-left: 20px;

  .block {
    display: inline;
  }
}

.span_right {
  margin-left: 10px;

  .el-select {
    margin-left: 1.25rem;
  }
}

.container {
  height: 83vh;
  .el-table {
    font-size: 1.2vw;
    margin-top: 2.25vw;
  }

  .el-button {
    margin-right: 0.4vw;
    // width: 6vw;
    // height: 3vw;
    font-size: 1vw;
  }

  .el-form {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .footer {
    width: 100%;
    text-align: center; //实现按钮居中效果
    position: relative;
    bottom: -14vw;
    .fyq {//分页器
      text-align: right;
      margin-right: 6vw;
      margin-bottom: 2vw;
    }
  }

  
}
</style>
    