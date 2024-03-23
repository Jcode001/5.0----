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
          <!-- <el-breadcrumb-item>档案管理</el-breadcrumb-item> -->
          <el-breadcrumb-item>档案回收站</el-breadcrumb-item>
      </el-breadcrumb></el-header>
      <el-container style="height: calc(100vh - 120px);">
      <el-aside  :class="newblue ? 'newclassoneone':'oldclassoneone'" >
          <!-- <el-header style="text-align: left; font-size: 12px;background-color: white;color: black;">
              <span>档案分类</span>
          </el-header> -->
          <el-header style="text-align: left; border-radius:12px 12px 0 0;">
              <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png"/>
              <span style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:1vw;line-height: 100%;padding-left: 10px;">档案分类</span>
          </el-header>
          <el-main class="leftmenu"  style="background-color: white;color: black;">
            <!-- background: red; -->
           <div @contextmenu="showMenu" style=" border-bottom: 1px solid  #6792f0;margin-top:0.1vw; border-right: 1px solid  #6792f0;
      width: 9.9vw;height: 100%;">
            <el-scrollbar style="" wrap-class="scrollbar-wrapper">
              <el-tree
              style="font-size:14px;height: 70vh;overflow-y: scroll;color:#000000" 
              :data="FLList" :props="defaultProps" highlight-current @node-click="kfdahandleNodeClick">
              <span class="tree-text" v-if="node.label.length <= 10" slot-scope="{node}"> {{ node.label }}</span>
                  <el-tooltip v-else effect="dark" :content="node.label" placement="top">
                    <span class="tree-text"> {{ node.label }}</span>
                  </el-tooltip>
              </el-tree>
  
            </el-scrollbar>
          </div>
        </el-main>  
     
      </el-aside>
      <div @click="zhediandianji" :class="newblue ? 'tubiaoico':'tubiaoicoone'">
        
      </div>
      <el-main class="mainview">
     
        <router-view/>
      </el-main>
      </el-container>
    </el-container>
  </template>
  <style>
  .el-header {
      /* background-color: #B3C0D1; */
      /* color: #333; */
      line-height: 60px;
  }
  .el-tree-node__label{
    font-size:14px;
  }
  .mainview .el-menu-item{
    background-color: #f8f8f8;
  }
  .mainview .el-submenu__title{
    background-color: #f8f8f8;
  }
  .mainview .el-submenu__title i{
    color: #909399;
  }
  </style>
    
  <script>
  import Logo from '@/layout/components/Sidebar/Logo.vue';
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import bus from '@/utils/bus'
  export default {
      data() {
      // const item = {
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      // };
      return {
        newblue:false,
          FLList: [
            {
              label: '数据加载中。。。',
              children: []
            }
          ],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          paramList: {//传递数据的存储
            MLName: '',
            MLId: '',
            FatherKey: '',
            MLGS: '',
          },
          // 菜单数据
          contextMenuData: {
            menuName: "demo",
            //菜单显示的位置
            axis: {
              x: null,
              y: null,
            },
            //菜单选项
            menulists: [
              {
                fnHandler: "SearchMLVueContextMenu",
                btnName: "搜索档案门类",
              },
              {
                fnHandler: "addFLVueContextMenu",
                btnName: "添加档案分类",
              },
              {
                fnHandler: "addMLVueContextMenu",
                btnName: "添加档案门类",
              },
              {
                fnHandler: "ModelDesignVueContextMenu",
                btnName: "模型设计",
              },
              {
                fnHandler: "SubTableDesignVueContextMenu",
                btnName: "分表设计",
              },
              {
                fnHandler: "amendVueContextMenu",
                btnName: "修改",
              },
              {
                fnHandler: "deleteVueContextMenu",
                btnName: "删除",
              },
            ],
        },
         // 搜索档案门类
         dialogList: false, //门类检索点击事件
          formone: {
            classificatio: "",
            Instructions: "",
          },
          formLabelWidth: "150px",
  
  
          dialogFormVisible: false,//修改档案分类
          zlx_dah_add_Visible:false,
          dfrmDAZlxAdd_hgl:{
            xsort:1,
            xname:'',
            xbyname:'',
            xlx:'0',
            maxlength:'100',
            isnotnull:'0',
            colwidth:'100',
            gjxname:'0',
            rfidgjx :'0',
            halign:'0',
          },
          zlx_dah_edit_Visible:false,
          dfrmDAZlxedit_hgl:{
            xsort:1,
            xname:'',
            xbyname:'',
            xlx:'0',
            maxlength:'100',
            isnotnull:'0',
            colwidth:'100',
            gjxname:'0',
            rfidgjx :'0',
            halign:'0',
          },
          zlx_add_Visible:false,
          dfrmDAZlxAdd:{
            xsort:1,
            xname:'',
            xbyname:'',
            xlx:'0',
            maxlength:'100',
            isnotnull:'0',
            colwidth:'100',
            gjxname:'0',
            rfidgjx :'0',
            halign:'0',
          },
          zlx_edit_Visible:false,
          dfrmDAZlxedit:{
            xsort:1,
            xname:'',
            xbyname:'',
            xlx:'0',
            maxlength:'100',
            isnotnull:'0',
            colwidth:'100',
            gjxname:'0',
            rfidgjx :'0',
            halign:'0',
          },
          addFormVisible: false, //添加档案门类
          addFLVisible: false,//添加档案分类
  
          form: {
            classificatio: "",
            Instructions: "",
          },
          //添加档案门类
          //
  
          // 模型设计
          ModelDesignVisible: false, //模型设计
          innerVisible: false, //模型设计中添加档案的挂接项
          DAH_innerVisible: false, //模型设计中添加档案的挂接项
          addDAhookname: '',
          addDAH_hookname: '',
          options: [{
            value: '0',
            label: '字符型'
          }, {
            value: '1',
            label: '数值型'
          }, {
            value: '2',
            label: '浮点型'
          }, {
            value: '3',
            label: '时间型'
          }, {
            value: '4',
            label: '选择型'
          }, {
            value: '5',
            label: '范围型'
          }
          ],
          rfidgjxoptions: [{
            value: '0',
            label: '无挂接'
          }, {
            value: '1',
            label: '信息项'
          }, {
            value: '2',
            label: '编号项'
          },
          ],
          gjxoptions: [{
            value: '0',
            label: '无挂接'
          },
          ],
          gjxoptions_hgl: [{
            value: '0',
            label: '无挂接'
          },
          ],
          ysxoptions: [{
            value: '0',
            label: '选填'
          },
          {
            value: '1',
            label: '必填'
          },
          ],
          addDAOPtionvalue: '',
  
          DAListSelect: [],
          DAH_ListSelect: [],
          DA_Record_ListSelect: [],
          DAH_Record_ListSelect: [],
  
          ModelDesignActiveName: "1", //tabs切换  模型设计 (设置默认选中)
  
          //模型设计档案盒
          DAH_HookList: [
            {
              index: "1",
              name: "档号1",
              type: "文本1",
            },
          ],
  
          //模型设计档案
          DAHookList: [
            {
              index: "2",
              name: "档号2",
              type: "文本2",
            },
            {
              index: "1",
              name: "档号21",
              type: "文本1112",
            },
          ],
          //档案表设计档案盒
          DAH_RecordList: [
            {
              date: "3",
              name: "档号3",
              address: "文本3",
            },
          ],
          //档案表设计档案
          DA_RecordList: [
            {
              date: "4",
              name: "档号4",
              address: "文本4",
            },
          ],
          //档案盒借阅
          fileboxforloanList: [
            {
              date: "5",
              name: "档号5",
              address: "文本5",
            },
          ],
          SubTableDesignVisible: false, //档案表设计
          DATableDesign: '档案表设计',
          DATableDesignTittle: '',
          activeNameone: "first", //tabs切换  模型设计
        }
      },
      computed: {
        ServeIp() {
          console.log(this.$store,"1231231231321");
          return this.$store.state.user.ServeIp
        },
        ServePort() {
          return this.$store.state.user.ServePort
        }
      },
      mounted() {
        console.log(this.$route.path, '侧边栏页面查看当前路由');
        setTimeout(()=>{this.initebKFDAShow()},500) 
      },
      methods:{
        zhediandianji(){
          this.newblue=!this.newblue
        },
          handleClick(row) {
              console.log(row);
          },
          setCurrent(row) {
              this.$refs.singleTable.setCurrentRow(row);
          },
          handleCurrentChange(val) {
              this.currentRow = val;
          },
          initebKFDAShow() {
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAMLData1', JSON.parse('{}')).then(
                success => {
                  console.log(success, '获取获取档案门类信息（获取所有门类）-成功xxxxxxxxxxxx');
  
                  this.FLList = [];
                  var cityList = success.data.data;
                  this.catalogueNumber = cityList.length;
  
                  cityList.forEach(r => {
                    r.label = r.mlname;
                    r.children = cityList.filter(re =>
                      re.fatherkey === r.mlid
                    )
                    if (r.fatherkey == 0) {
                      this.FLList.push(r)
                    }
                  })
                },
                error => {
                  console.log(error, '获取获取档案门类信息（获取所有门类）--返回失败的数据');
                })
          },
          kfdahandleNodeClick(data) {//
            console.log(data, 'data');
            console.log(data.mlname, "门类ID:" + data.mlid, "父级：" + data.fatherkey, '点击了');
            this.paramList.MLName = data.mlname;
            this.paramList.MLId = data.mlid;
            this.paramList.FatherKey = data.fatherkey;
            this.paramList.MLGS = data.mlgs;
            bus.$emit("changeEvent", this.paramList.MLId, this.paramList.MLName, this.paramList.FatherKey, this.paramList.MLGS);
          },
          showMenu() {
            event.preventDefault();
            var x = event.clientX;
            var y = event.clientY;
            // Get the current location
            this.contextMenuData.axis = {
              x,
              y,
            };
          },
          SearchMLVueContextMenu() {
            console.log("搜索档案门类!");
            this.dialogList = true
          },
          addFLVueContextMenu() {
            console.log("添加档案分类!");
            this.addFLVisible = true
  
          },
          addMLVueContextMenu() {
            console.log("添加档案门类!");
            if (this.paramList.MLName == '') {
              this.$message.error("请选择要添加到的分类")
              return;
            }
            this.addFormVisible = true;
          },
          ModelDesignVueContextMenu() {
            console.log("模型设计!");
            this.ModelDesignVisible = true;
          },
          SubTableDesignVueContextMenu() {
            console.log("分表设计!");
            console.log(this.paramList, '111111111111');
            var data = {
              // 'MLGS': this.paramList.MLGS,
              'MLGS': 2,
              'FatherKey': this.paramList.MLId
            }
            if (this.paramList.MLId == '') {
              this.$message.error("请选择分类")
              return;
            }
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAMLData', data).then(//根据当前门类信息查看是否有下级的门类接口；
              success => {
                console.log(success, '根据当前门类信息查看是否有下级的门类接口；-成功');
                console.log(success.data.data, '根据当前门类信息查看是否有下级的门类接口；-成功');
                if (success.data.data.length == 0) {
                  this.SubTableDesignVisible = true;
                  var tempData = {};
                  tempData.Table_name = "a01_hgldata";
                  tempData.MLId = this.paramList.MLId;
                  axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAFLMLTableName', tempData).then(//根据MLID获取档案（盒）表名称
                    success => {
                      console.log(success, '根据MLID获取档案（盒）表名称-成功');
                      if (success.data.code == 200) {
                        this.DATableDesignTittle = success.data.data
                        this.DATableDesign = success.data.data + '档案表设计';
                        this.getDAH_RecordList();
                      }
                    },
                    error => {
                      console.log(error, '根据MLID获取档案（盒）表名称--返回失败的数据');
                    })
  
                } else {
                  this.$message.error("当前节点下含有子节点")
                }
  
              },
              error => {
                console.log(error, '根据当前门类信息查看是否有下级的门类接口；--返回失败的数据');
              })
  
          },
          amendVueContextMenu() {
            console.log("修改!");
            if (this.paramList.MLName == '') {
              this.$message.error("请选择分类")
              return;
            }
            this.dialogFormVisible = true
            this.form.classificatio = this.paramList.MLName;
            var data = {
              "MLId": this.paramList.MLId,
              "MLNAME": this.paramList.MLName
            }
  
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAMLDatabyMLId', data).then(
              success => {
                console.log(success, '获取门类的说明-成功');
                if (success.data.code == 200) {
                  this.form.Instructions = success.data.data.Remark;
                }
  
              },
              error => {
                console.log(error, '获取门类的说明--返回失败的数据');
              })
  
  
          },
          deleteVueContextMenu() {
            console.log("删除!");
            if (this.paramList.MLId == '' || this.paramList.MLName == '') {
              this.$message.error("请选择要删除的门类")
              return;
            }
  
            this.$confirm('此操作将永久删除：“' + this.paramList.MLName + '” 是否继续?', '提示', {
              dangerouslyUseHTMLString: true
            }, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var data = {
                "MLId": this.paramList.MLId,
                "MLNAME": this.paramList.MLName
              }
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelDAMLData', data).then(
                success => {
                  console.log(success, '删除门类-成功');
                  if (success.data.code == 200) {
                    this.dialogFormVisible = false
                    this.initebKFDAShow();
                    this.paramList = {//清空之前选中的值
                      MLName: '',
                      MLId: '',
                      FatherKey: ''
                    };
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  }
                  else {
                    this.$message.error(success.data.message)
                  }
                },
                error => {
                  console.log(error, '删除门类--返回失败的数据');
                })
            }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '已取消删除'
              // });
            });
  
          },
          amendclose() {
            console.log('关闭档案分类前的回调');
            this.form.classificatio = '';
            this.form.Instructions = '';
          },
          amendSave() {//修改档案分类 保存
            if (this.form.classificatio == '' || this.form.Instructions == '') {
              this.$message.error("请填写修改的内容")
              return
            }
            var data = {
              "MLId": this.paramList.MLId,
              "MLNAME": this.form.classificatio,
              "Remark": this.form.Instructions
            }
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateDAMLData', data).then(
              success => {
                console.log(success, '修改门类-成功');
                if (success.data.code == 200) {
                  this.$message.success(success.data.data)//更新成功
                  this.dialogFormVisible = false
                  this.initebKFDAShow();
                  this.paramList = {//清空之前选中的值
                    MLName: '',
                    MLId: '',
                    FatherKey: ''
                  };
  
                }
                else {
                  this.$message.error(success.data.message)
                }
  
              },
              error => {
                console.log(error, '修改门类--返回失败的数据');
              })
  
          },
          addSumbit(key) {//添加档案门(分)类 提交
            if (this.form.classificatio == '' || this.form.Instructions == '') {
              this.$message.error("请填写提交的内容")
              return
            }
            if (!key) {//1代表门类，0代表分类
              var data = {
                "MLNAME": this.form.classificatio,
                "REMARK": this.form.Instructions,
                "FATHERKEY": 0,
                "MLGS": 1,//门类格式 1=分类 2=门类
                "MLTYPE": 1,//门类类型 1=分类 4=门类
              }
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddDAMLData', data).then(
                success => {
                  console.log(success, '添加分类-成功');
                  if (success.data.code == 200) {
                    this.$message.success(success.data.data)//添加成功
                    this.addFLVisible = false
                    this.initebKFDAShow();
                    this.paramList = {//清空之前选中的值
                      MLName: '',
                      MLId: '',
                      FatherKey: ''
                    };
                  }
                  else {
                    this.$message.error(success.data.message)
                  }
  
                },
                error => {
                  console.log(error, '添加分类--返回失败的数据');
                })
            } else {
              var data = {
                "MLNAME": this.form.classificatio,
                "REMARK": this.form.Instructions,
                "FATHERKEY": this.paramList.MLId,
                "MLGS": 2,//门类格式 1=分类 2=门类
                "MLTYPE": 4,//门类类型 1=分类 4=门类
              }
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddDAMLData', data).then(
                success => {
                  console.log(success, '添加门类-成功');
                  if (success.data.code == 200) {
                    this.$message.success(success.data.data)//添加成功
                    this.addFormVisible = false
                    this.initebKFDAShow();
                    this.paramList = {//清空之前选中的值
                      MLName: '',
                      MLId: '',
                      FatherKey: ''
                    };
                  }
                  else {
                    this.$message.error(success.data.message)
                  }
  
                },
                error => {
                  console.log(error, '添加门类--返回失败的数据');
                })
            }
  
  
          },
          onSubmit() {
            console.log("onSubmittij提交!");
          },
  
          getDAHookList() {//获取档案--挂接项列表数据
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetGJXData', JSON.parse('{}')).then(
              success => {
                console.log(success, '获取挂接项（档案）-成功');
                this.DAHookList = [];
  
                success.data.data.forEach(item => {
                  console.log(item, '1111111111');
                  // 0：文本；1：整数；2：小数，3：时间；4：下拉框；5：范围：
                  var temptype = '';
                  switch (item.xlx) {
                    case 0: temptype = '文本'; break;
                    case 1: temptype = '整数'; break;
                    case 2: temptype = '小数'; break;
                    case 3: temptype = '时间'; break;
                    case 4: temptype = '下拉框'; break;
                    case 5: temptype = '范围'; break;
                    default: break;
                  };
                  this.DAHookList.push({
                    id: item.id,
                    index: item.listindex + 1,
                    name: item.xname,
                    type: temptype,
                  })
                });
              },
              error => {
                console.log(error, '获取挂接项（档案）--返回失败的数据');
              })
          },
          getDAH_HookList() {//获取档案盒挂接项列表数据
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetGJXData_hgl', JSON.parse('{}')).then(
              success => {
                console.log(success, '获取挂接项（档案盒）-成功');
                this.DAH_HookList = [];
                if(success.data.data==null)return;
                success.data.data.forEach(item => {
                  console.log(item, '1111111111');
                  // 0：文本；1：整数；2：小数，3：时间；4：下拉框；5：范围：
                  var temptype = '';
                  switch (item.xlx) {
                    case 0: temptype = '文本'; break;
                    case 1: temptype = '整数'; break;
                    case 2: temptype = '小数'; break;
                    case 3: temptype = '时间'; break;
                    case 4: temptype = '下拉框'; break;
                    case 5: temptype = '范围'; break;
                    default: break;
                  };
                  this.DAH_HookList.push({
                    id: item.id,
                    index: item.listindex + 1,
                    name: item.xname,
                    type: temptype,
                  })
                });
              },
              error => {
                console.log(error, '获取挂接项（档案盒）--返回失败的数据');
              })
          },
  
          handleClick(tab, event) {//模型设计Tab  切换
            console.log(tab, event);
            console.log(tab.label, '11111111111111111111111111111');
            if (tab.name == '2') {
              this.getDAHookList();
            } else {
              this.getDAH_HookList();
            }
          },
          deleteDAHook() {//挂接项--档案
            console.log(this.DAListSelect, '选中删除挂接项的列表');
            var data = {};
            this.DAListSelect.forEach(item => {
              console.log(item.name, '11111');
              console.log(item.type, '22222');
              var tempXLx = '';//挂接项类型
              switch (item.type) {
                case '文本': tempXLx = 0; break;
                case '整数': tempXLx = 1; break;
                case '小数': tempXLx = 2; break;
                case '时间': tempXLx = 3; break;
                case '下拉框': tempXLx = 4; break;
                case '范围': tempXLx = 5; break;
                default: break;
              }
              data.XName = item.name;
              data.XLx = tempXLx;
  
            });
            console.log(data, '删除挂接项（档案）传递的数据');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelGJXData', data).then(//删除挂接项（档案）
              success => {
                console.log(success, '删除挂接项（档案）-成功');
                if (success.data.code == 200) {
                  this.$message.success(success.data.data)//删除挂接项（档案）
                  // 删除成功之后重新获取数据
                  this.getDAHookList();
                }
                else {
                  this.$message.error(success.data.message)
                }
              },
              error => {
                console.log(error, '删除挂接项（档案）--返回失败的数据');
              })
  
          },
          handleSelectionChange(val) {
            console.log(val, '档案列表选中的项发生变化');
            this.DAListSelect = val;
          },
          DAH_handleSelectionChange(val) {
            console.log(val, '档案盒--列表选中的项发生变化');
            this.DAH_ListSelect = val;
          },
          DA_Record_handleSelectionChange(val) {
            console.log(val, '档案--著录项--列表选中的项发生变化');
            this.DA_Record_ListSelect = val;
          },
          DAH_Record_handleSelectionChange(val) {
            console.log(val, '档案盒--著录项--列表选中的项发生变化');
            this.DAH_Record_ListSelect = val;
          },
          addSumbitDAHook() {//添加档案的挂接项
            console.log(this.addDAhookname, 'addDAhookname');
            console.log(this.addDAOPtionvalue, 'addDAOPtionvalue');
            var data = {};
            data.XName = this.addDAhookname;
            data.XLx = this.addDAOPtionvalue;
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SaveGJXData', data).then(//添加或更新挂接项（档案）
              success => {
                console.log(success, '添加或更新挂接项（档案）-成功');
                if (success.data.code == 200) {
                  this.$message.success("添加成功")//添加或更新挂接项（档案）
                  this.innerVisible = false;
                  this.getDAHookList();
                }
                else {
                  this.$message.error(success.data.message)
                }
              },
              error => {
                console.log(error, '添加或更新挂接项（档案）--返回失败的数据');
              })
          },
          deleteDAH_Hook() {//删除挂接项--档案盒
            console.log(this.DAH_ListSelect, '选中删除挂接项的列表');
            var data = {};
            this.DAH_ListSelect.forEach(item => {
              console.log(item.name, '11111');
              console.log(item.type, '22222');
              var tempXLx = '';//挂接项类型
              switch (item.type) {
                case '文本': tempXLx = 0; break;
                case '整数': tempXLx = 1; break;
                case '小数': tempXLx = 2; break;
                case '时间': tempXLx = 3; break;
                case '下拉框': tempXLx = 4; break;
                case '范围': tempXLx = 5; break;
                default: break;
              }
  
              data.XName = item.name;
              data.XLx = tempXLx;
  
            });
            console.log(data, '删除挂接项（档案盒）传递的数据');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelGJXData_hgl', data).then(//删除挂接项（档案盒）
              success => {
                console.log(success, '删除挂接项（档案盒）-成功');
                if (success.data.code == 200) {
                  this.$message.success(success.data.data)//删除挂接项（档案盒）
                  // 删除成功之后重新获取数据
                  this.getDAH_HookList();
  
                }
                else {
                  this.$message.error(success.data.message)
                }
  
              },
              error => {
                console.log(error, '删除挂接项（档案盒）--返回失败的数据');
              })
          },
          addSumbitDAH_Hook() {//添加档案盒挂接项
            console.log(this.addDAhookname, 'addDAhookname');
            console.log(this.addDAOPtionvalue, 'addDAOPtionvalue');
            var data = {};
            data.XName = this.addDAH_hookname;
            data.XLx = this.addDAOPtionvalue;
            console.log(data, '添加档案盒挂接项  ---shuju');
  
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SaveGJXData_hgl', data).then(//添加或更新挂接项（档案盒）
              success => {
                console.log(success, '添加或更新挂接项（档案盒）-成功');
                if (success.data.code == 200) {
                  this.$message.success("添加成功")//添加或更新挂接项（档案盒）
                  this.DAH_innerVisible = false;
                  this.getDAH_HookList();
                }
                else {
                  this.$message.error(success.data.message)
                }
  
              },
              error => {
                console.log(error, '添加或更新挂接项（档案盒）--返回失败的数据');
              })
  
          },
          //添加档案著录项
          addSumbitDA_ZLX() {
            console.log(this.addDAhookname, 'addDAhookname');
            console.log(this.addDAOPtionvalue, 'addDAOPtionvalue');
            var data = {};
            data.xsort = this.dfrmDAZlxAdd.xsort;
            data.xname = this.dfrmDAZlxAdd.xname;
            data.xbyname = this.dfrmDAZlxAdd.xbyname;
            data.xlx = this.dfrmDAZlxAdd.xlx;
            data.maxlength = this.dfrmDAZlxAdd.maxlength;
            data.isnotnull = this.dfrmDAZlxAdd.isnotnull;
            data.colwidth = this.dfrmDAZlxAdd.colwidth;
            data.gjxname = this.dfrmDAZlxAdd.gjxname;
            data.rfidgjx = this.dfrmDAZlxAdd.rfidgjx;
            data.halign = this.dfrmDAZlxAdd.halign;
            data.table_name=this.DATableDesignTittle;
            data.datatype=1;
            console.log(data, '添加档案盒录项  ---shuju');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SaveZlxData', data).then(//添加或更新挂接项（档案盒）
              success => {
                console.log(success, '添加或更新著录项（档案）-成功');
                if (success.data.code == 200) {
                  this.$message.success("添加成功")//添加或更新挂接项（档案盒）
                  this.zlx_add_Visible = false;
                  setTimeout(() => {
                    this.getDA_RecordList();
                  }, 500);
                }
                else {
                  this.$message.error(success.data.message)
                }
  
              },
              error => {
                console.log(error, '添加或更新挂接项（档案盒）--返回失败的数据');
              })
          },
          //添加档案盒著录项
          addSumbitDAH_ZLX() {
            console.log(this.addDAhookname, 'addDAhookname');
            console.log(this.addDAOPtionvalue, 'addDAOPtionvalue');
            var data = {};
            data.xsort = this.dfrmDAZlxAdd_hgl.xsort;
            data.xname = this.dfrmDAZlxAdd_hgl.xname;
            data.xbyname = this.dfrmDAZlxAdd_hgl.xbyname;
            data.xlx = this.dfrmDAZlxAdd_hgl.xlx;
            data.maxlength = this.dfrmDAZlxAdd_hgl.maxlength;
            data.isnotnull = this.dfrmDAZlxAdd_hgl.isnotnull;
            data.colwidth = this.dfrmDAZlxAdd_hgl.colwidth;
            data.gjxname = this.dfrmDAZlxAdd_hgl.gjxname;
            data.rfidgjx = this.dfrmDAZlxAdd_hgl.rfidgjx;
            data.halign = this.dfrmDAZlxAdd_hgl.halign;
            data.table_name=this.DATableDesignTittle;
            data.datatype=1;
            console.log(data, '添加档案盒著录项  ---shuju');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SaveZlxData_hgl', data).then(//添加或更新挂接项（档案盒）
              success => {
                console.log(success, '添加或更新著录项（档案盒）-成功');
                if (success.data.code == 200) {
                  this.$message.success("添加成功")//添加或更新挂接项（档案盒）
                  this.zlx_dah_add_Visible = false;
                  setTimeout(() => {
                    this.getDAH_RecordList();
                  }, 500);
                }
                else {
                  this.$message.error(success.data.message)
                }
  
              },
              error => {
                console.log(error, '添加或更新挂接项（档案盒）--返回失败的数据');
              })
          },
          //编辑档案著录项
          editSumbitDA_ZLX() {
            console.log(this.addDAhookname, 'addDAhookname');
            console.log(this.addDAOPtionvalue, 'addDAOPtionvalue');
            var data = {};
            data.xsort = this.dfrmDAZlxedit.xsort;
            data.xname = this.dfrmDAZlxedit.xname;
            data.xbyname = this.dfrmDAZlxedit.xbyname;
            data.xlx = this.dfrmDAZlxedit.xlx;
            data.maxlength = this.dfrmDAZlxedit.maxlength;
            data.isnotnull = this.dfrmDAZlxedit.isnotnull;
            data.colwidth = this.dfrmDAZlxedit.colwidth;
            data.gjxname = this.dfrmDAZlxedit.gjxname;
            data.rfidgjx = this.dfrmDAZlxedit.rfidgjx;
            data.halign = this.dfrmDAZlxedit.halign;
            data.table_name=this.DATableDesignTittle;
            data.datatype=1;
            console.log(data, '编辑档案著录项  ---shuju');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SaveZlxData', data).then(//添加或更新挂接项（档案盒）
              success => {
                console.log(success, '添加或更新著录项（档案）-成功');
                if (success.data.code == 200) {
                  this.$message.success("添加成功")//添加或更新挂接项（档案盒）
                  this.zlx_edit_Visible = false;
                  setTimeout(() => {
                    this.getDA_RecordList();
                  }, 500);
                }
                else {
                  this.$message.error(success.data.message)
                }
  
              },
              error => {
                console.log(error, '添加或更新挂接项（档案盒）--返回失败的数据');
              })
          },
          //编辑档案盒著录项
          editSumbitDAH_ZLX() {
            console.log(this.addDAhookname, 'addDAhookname');
            console.log(this.addDAOPtionvalue, 'addDAOPtionvalue');
            var data = {};
            data.xsort = this.dfrmDAZlxedit_hgl.xsort;
            data.xname = this.dfrmDAZlxedit_hgl.xname;
            data.xbyname = this.dfrmDAZlxedit_hgl.xbyname;
            data.xlx = this.dfrmDAZlxedit_hgl.xlx;
            data.maxlength = this.dfrmDAZlxedit_hgl.maxlength;
            data.isnotnull = this.dfrmDAZlxedit_hgl.isnotnull;
            data.colwidth = this.dfrmDAZlxedit_hgl.colwidth;
            data.gjxname = this.dfrmDAZlxedit_hgl.gjxname;
            data.rfidgjx = this.dfrmDAZlxedit_hgl.rfidgjx;
            data.halign = this.dfrmDAZlxedit_hgl.halign;
            data.table_name=this.DATableDesignTittle;
            data.datatype=1;
            console.log(data, '编辑档案盒著录项  ---shuju');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SaveZlxData_hgl', data).then(//添加或更新挂接项（档案盒）
              success => {
                console.log(success, '添加或更新著录项（档案盒）-成功');
                if (success.data.code == 200) {
                  this.$message.success("添加成功")//添加或更新挂接项（档案盒）
                  this.zlx_dah_edit_Visible = false;
                  setTimeout(() => {
                    this.getDAH_RecordList();
                  }, 500);
                }
                else {
                  this.$message.error(success.data.message)
                }
  
              },
              error => {
                console.log(error, '添加或更新挂接项（档案盒）--返回失败的数据');
              })
          },
          handleClickone(tab, event) {
            console.log(tab, event, '著录项tab切换');
            if (tab.name == 'second') {
              this.getDA_RecordList();
              var tempData = {};
              tempData.Table_name = "a01_archdata";
              tempData.MLId = this.paramList.MLId;
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAFLMLTableName', tempData).then(//根据MLID获取档案表名称
                success => {
                  console.log(success, '根据MLID获取档案表名称-成功');
                  if (success.data.code == 200) {
                    this.DATableDesignTittle = success.data.data
                    this.DATableDesign = success.data.data + '档案表设计';
                    this.getDA_RecordList();
                  }
                },
                error => {
                  console.log(error, '根据MLID获取档案表名称--返回失败的数据');
                })
            } else {
              this.getDAH_RecordList();
              var tempData = {};
              tempData.Table_name = "a01_hgldata";
              tempData.MLId = this.paramList.MLId;
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAFLMLTableName', tempData).then(//根据MLID获取档案（盒）表名称
                success => {
                  console.log(success, '根据MLID获取档案（盒）表名称-成功');
                  if (success.data.code == 200) {
                    this.DATableDesignTittle = success.data.data
                    this.DATableDesign = success.data.data + '档案表设计';
                    this.getDAH_RecordList();
                  }
  
                },
                error => {
                  console.log(error, '根据MLID获取档案（盒）表名称--返回失败的数据');
                })
            }
          },
          handleClicktwo(tab, event) {
            console.log(tab, event);
          },
  
  
          getDA_RecordList() {//获取档案--著录项列表数据
            var data = {};
            data.Table_name = this.DATableDesignTittle;
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData', data).then(
              success => {
                this.DA_RecordList = [];
                console.log(success, '获取著录项（档案）著录项列表数据-成功');
                success.data.data.forEach(item => {
                  console.log(item, '233241232');
                  var tempType = '';
                  var need = '';
                  switch (item.xlx) {
                    case 0: tempType = '文本'; break;
                    case 1: tempType = '整数'; break;
                    case 2: tempType = '小数'; break;
                    case 3: tempType = '时间'; break;
                    case 4: tempType = '下拉框'; break;
                    case 5: tempType = '范围'; break;
                    default: break;
                  };
                  console.log(item.IsNotNull, '约束性');
                  if (item.isnotnull==0) {
                    need = '选填';
                  } else {
                    need = "必填";
                  }
                  this.DA_RecordList.push({
                    index: item.xsort,
                    record1: item.xname,//著录项
                    record: item.xbyname,//著录项
                    type: tempType,//类型
                    length: item.maxlength,//长度
                    need: need,//必填项
                    Hook: item.gjxname,//挂接
                    RFIDHook: item.rfidgjx,//RFID挂接项
                    XName: item.xname,//
                    Table_Name: item.table_name,//表名
                    colwidth:item.colwidth,//列宽
                  })
                });
              },
              error => {
                console.log(error, '获取著录项（档案）著录项列表数据--返回失败的数据');
              })
          },
          getDAH_RecordList() {//获取档案盒--著录项列表数据
            var data = {};
            data.Table_name = this.DATableDesignTittle;
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData_hgl', data).then(
              success => {
                this.DAH_RecordList = [];
                console.log(success, '获取著录项（档案盒）著录项列表数据-成功');
                success.data.data.forEach(item => {
                  console.log(item, '233241232');
                  var tempType = '';
                  var need = '';
                  switch (item.xlx) {
                    case 0: tempType = '文本'; break;
                    case 1: tempType = '整数'; break;
                    case 2: tempType = '小数'; break;
                    case 3: tempType = '时间'; break;
                    case 4: tempType = '下拉框'; break;
                    case 5: tempType = '范围'; break;
                    default: break;
                  };
                  if (item.isnotnull==0) {
                    need = '选填';
                  } else {
                    need = "必填";
                  }
                  this.DAH_RecordList.push({
                    index: item.xsort,
                    record1: item.xname,//缩写
                    record: item.xbyname,//著录项
                    type: tempType,//类型
                    length: item.maxlength,//长度
                    need: need,//必填项
                    Hook: item.gjxname,//挂接
                    RFIDHook: item.rfidgjx,//RFID挂接项
                    XName: item.xname,//
                    Table_Name: item.table_name,//表名
                    colwidth:item.colwidth,//列宽
                  })
                });
              },
              error => {
                console.log(error, '获取著录项（档案盒）著录项列表数据--返回失败的数据');
              })
          },
          editDAH_Record(){
            console.log(this.DAH_Record_ListSelect, '选中修改著录项的列');
            if (this.DAH_Record_ListSelect.length == 0) {
              this.$message.error("请选择要修改的著录项")
              return;
            }
            this.DAH_Record_ListSelect.forEach(item => {
              console.log(item, '选中修改著录项的列item');
              this.dfrmDAZlxedit_hgl.xsort = item.index;
              this.dfrmDAZlxedit_hgl.xname = item.XName;
              this.dfrmDAZlxedit_hgl.xbyname = item.record;
              let xlx='0';
              switch (item.type) {
                    case '文本': xlx ='0' ; break;
                    case '整数': xlx ='1' ;  break;
                    case '小数': xlx ='2' ;  break;
                    case '时间': xlx ='3' ;  break;
                    case '下拉框': xlx ='4' ;  break;
                    case '范围': xlx ='5' ;  break;
                    default: break;
              };
              this.dfrmDAZlxedit_hgl.xlx = xlx;
              console.log(this.dfrmDAZlxedit_hgl.xlx, 'item.type');
              let isnotnull='0';
              switch (item.need) {
                    case '选填': isnotnull ='0' ; break;
                    case '必填': isnotnull ='1' ;  break;
                    default: break;
              };
              this.dfrmDAZlxedit_hgl.isnotnull =  isnotnull;
              this.dfrmDAZlxedit_hgl.maxlength =  item.length;
              this.dfrmDAZlxedit_hgl.colwidth =  item.colwidth;
              // this.dfrmDAZlxedit_hgl.gjxname =  item.colwidth;
              // this.dfrmDAZlxedit_hgl.rfidgjx =  item.colwidth;
              // this.dfrmDAZlxedit_hgl.halign =  item.colwidth;
            });
            this.getgjxoptions_hgl(this.dfrmDAZlxedit_hgl.xlx);
            this.zlx_dah_edit_Visible = true;
          },
          editDA_Record(){
            console.log(this.DA_Record_ListSelect, '选中修改著录项的列');
            if (this.DA_Record_ListSelect.length == 0) {
              this.$message.error("请选择要修改的著录项")
              return;
            }
            this.DA_Record_ListSelect.forEach(item => {
              console.log(item, '选中修改著录项的列item');
             
              this.dfrmDAZlxedit.xsort = item.index;
              this.dfrmDAZlxedit.xname = item.XName;
              this.dfrmDAZlxedit.xbyname = item.record;
              let xlx='0';
              switch (item.type) {
                    case '文本': xlx ='0' ; break;
                    case '整数': xlx ='1' ;  break;
                    case '小数': xlx ='2' ;  break;
                    case '时间': xlx ='3' ;  break;
                    case '下拉框': xlx ='4' ;  break;
                    case '范围': xlx ='5' ;  break;
                    default: break;
              };
              this.dfrmDAZlxedit.xlx = xlx;
              console.log(this.dfrmDAZlxedit.xlx, 'item.type');
              let isnotnull='0';
              switch (item.need) {
                    case '选填': isnotnull ='0' ; break;
                    case '必填': isnotnull ='1' ;  break;
                    default: break;
              };
              this.dfrmDAZlxedit.isnotnull =  isnotnull;
              this.dfrmDAZlxedit.maxlength =  item.length;
              this.dfrmDAZlxedit.colwidth =  item.colwidth;
              // this.dfrmDAZlxedit_hgl.gjxname =  item.colwidth;
              // this.dfrmDAZlxedit_hgl.rfidgjx =  item.colwidth;
              // this.dfrmDAZlxedit_hgl.halign =  item.colwidth;
            });
            this.getgjxoptions(this.dfrmDAZlxedit.xlx);
            this.zlx_edit_Visible = true;
          },
          deleteDAH_Record() {//著录项--档案盒--删除
            console.log(this.DAH_Record_ListSelect, '选中删除著录项的列表');
            if (this.DAH_Record_ListSelect.length == 0) {
              this.$message.error("请选择要删除的著录项")
              return;
            }
            
            //this.$refs.DAH_RecordTable.selection.forEach(item => {
            this.DAH_Record_ListSelect.forEach(item => {
              var data = {};
              data.XName = item.XName;
              data.Table_Name = item.Table_Name;
              console.log(data, '删除著录项（档案盒）传递的数据');
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelZlxData_hgl', data).then(//删除著录项（档案盒）
                success => {
                  console.log(success, '删除著录项（档案盒）-成功');
                  if (success.data.code == 200) {
                    this.$message.success(success.data.data)//删除著录项（档案盒）
                    // 删除成功之后重新获取数据
                    this.getDAH_RecordList();
                  }
                  else {
                    this.$message.error(success.data.message)
                  }
                },
                error => {
                  console.log(error, '删除著录项（档案盒）--返回失败的数据');
                })
            });
          },
          deleteDA_Record() {//著录项--档案--删除
            console.log(this.DA_Record_ListSelect, '选中删除著录项的列表');
            if (this.DA_Record_ListSelect.length == 0) {
              this.$message.error("请选择要删除的著录项")
              return;
            }
          
            this.DA_Record_ListSelect.forEach(item => {
              var data = {};
              data.XName = item.XName;
              data.Table_Name = item.Table_Name;
              console.log(data, '删除著录项（档案）传递的数据');
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelZlxData', data).then(//删除著录项（档案）
                success => {
                  console.log(success, '删除著录项（档案）-成功');
                  if (success.data.code == 200) {
                    this.$message.success(success.data.data)//删除著录项（档案）
                    // 删除成功之后重新获取数据
                    this.getDA_RecordList();
                  }
                  else {
                    this.$message.error(success.data.message)
                  }
                },
                error => {
                  console.log(error, '删除著录项（档案盒）--返回失败的数据');
                })
            });
          },
          DASyncTbStructure(){
            console.log(this.DA_Record_ListSelect, '同步表结构');
            var data = {};
            data.Table_name = this.DATableDesignTittle;
          
            console.log(data, '同步表结构');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SyncTbStructure', data).then(//同步表结构
              success => {
                console.log(success, '同步表结构-成功');
                if (success.data.code == 200) {
                  this.$message.success(success.data.data)//删除著录项（档案）
                }
                else {
                  this.$message.error(success.data.message)
                }
              },
              error => {
                console.log(error, '同步表结构--返回失败的数据');
              })
          },
          DAHSyncTbStructure(){
            console.log(this.DA_Record_ListSelect, '同步表结构');
            var data = {};
            data.Table_name = this.DATableDesignTittle;
          
            console.log(data, '同步表结构');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SyncTbStructure_hgl', data).then(//同步表结构
              success => {
                console.log(success, '同步表结构-成功');
                if (success.data.code == 200) {
                  this.$message.success(success.data.data)//删除著录项（档案）
                }
                else {
                  this.$message.error(success.data.message)
                }
              },
              error => {
                console.log(error, '同步表结构--返回失败的数据');
              })
          },
          clearalldata()
          {
            console.log(this.DA_Record_ListSelect, '清空表内所有数据');
            var data = {};
            data.Table_name = this.DATableDesignTittle;
          
            console.log(data, '清空表内所有数据传递的数据');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/clearalldata', data).then(//删除著录项（档案）
              success => {
                console.log(success, '清空表内所有数据-成功');
                if (success.data.code == 200) {
                  this.$message.success(success.data.data)//删除著录项（档案）
                  // 删除成功之后重新获取数据
                  this.getDA_RecordList();
                }
                else {
                  this.$message.error(success.data.message)
                }
              },
              error => {
                console.log(error, '清空表内所有数据--返回失败的数据');
              })
          },
          getgjxoptions_hgl(xlx){
            var data={};
            data.XLx=xlx;
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetGJXData_hgl1', data).then(//获取著录项列
              success => {
                console.log(success, '获取著录项列-成功');
                if (success.data.code == 200) {
                  if(success.data.data==null)return;
                  console.log(success.data.data)//获取著录项列
                  this.gjxoptions_hgl =  [{
                    value: '无挂接',
                    label: '无挂接'
                  },
                  ];
                  success.data.data.forEach(item => {
                    this.gjxoptions_hgl.push({
                      value: item.xname,
                      label: item.xname,
                    })
                  });
                  console.log(this.gjxoptions_hgl, 'this.gjxoptions_hgl');
                }
                else {
                  this.$message.error(success.data.message)
                }
              },
              error => {
                console.log(error, '清空表内所有数据--返回失败的数据');
              })
          },
          getgjxoptions(xlx){
            var data={};
            data.XLx=xlx;
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetGJXData1', data).then(//获取著录项列
              success => {
                console.log(success, '获取著录项列-成功');
                if (success.data.code == 200) {
                  if(success.data.data==null)return;
                  console.log(success.data.data)//获取著录项列
                  this.gjxoptions =  [{
                    value: '无挂接',
                    label: '无挂接'
                  },
                  ];
                  success.data.data.forEach(item => {
                    this.gjxoptions.push({
                      value: item.xname,
                      label: item.xname,
                    })
                  });
                  console.log(this.gjxoptions, 'this.gjxoptions');
                }
                else {
                  this.$message.error(success.data.message)
                }
              },
              error => {
                console.log(error, '清空表内所有数据--返回失败的数据');
              })
          }
      }
  };
  </script>
  <!-- style="border-radius: 4px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" -->
  <style lang="scss">
  .oldclassoneone{
  
    height: 80vh;
    // border: 1px solid #000;
    width:10vw !important;
    background-color: #fff
  }
  .newclassoneone{
    display:none;
    
    height: 80vh;
    width:15vw;
    background-color: #fff
  }
  .tubiaoico{
    margin-top: 16vw;
    margin-left:-0.05vw;
    width: 1vw;
    height: 2vw;;
    border: 1px solid #000;
    background-color: #ede7e7;
    border-radius: 4.5px;
    background-image: url(../../assets/折叠5.png);
    background-size: 100% 100%;
  }
  .tubiaoicoone{
    margin-top: 16vw;
    margin-left:-0.1vw;
    width: 1vw;
    height: 2vw;;
    border: 1px solid #000;
    background-color: #ede7e7;
    border-radius: 4.5px;
    background-image: url(../../assets/折叠6.png);
    background-size: 100% 100%;
  }
  </style>
  
