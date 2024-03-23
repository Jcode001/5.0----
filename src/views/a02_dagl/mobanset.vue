<template>
  <div v-title data-title="智慧档案馆管理总平台" style="height:calc(100% - 30px)">
    <div class="moban-set">
      <div class="moban-set-left">
        <span @click="referenceSet('hgl')" :class="referenceIndex=='hgl'? 'moban-set-left-active' : '' ">档案盒规则设置</span>
        <span @click="referenceSet('arch')" :class="referenceIndex=='arch'? 'moban-set-left-active' : '' ">档号规则设置</span>
      </div>
      <div class="moban-set-right">
        <div class="moban-set-right-top">
          <el-button size="small" type="primary" @click="dialogFormVisibleCli">新建</el-button>
        </div>
        <div>
          <el-table
          height="700"
            :data="tableBodyInfoList"
            border
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%;height:500px;">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="xtype"
              label="获取方式"
              width="80">
            </el-table-column>
            <el-table-column
              prop="xname"
              label="著录项名称"
              min-width="120">
              <template slot-scope="scope">
                {{ scope.row.xname ? scope.row.xbyname : '' }}
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="xbyname"
              label="著录项中文描述"
              max-width="200">
            </el-table-column> -->
            <el-table-column
              prop="xvalue"
              label="固定值"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="xoffset"
              label="截取长度"
              width="80">
            </el-table-column>
            <el-table-column
              prop="notes"
              label="描述"
              min-width="200">
            </el-table-column>
             <el-table-column
              prop="userid"
              label="维护人ID"
              width="80">
            </el-table-column>
             <el-table-column
              prop="createtime"
              label="维护时间"
              width="150">
              <template slot-scope="scope">
                {{ scope.row.createtime.split('.')[0].replace('T', ' ') }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="280">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdithgl(scope.$index, scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                <el-button size="mini" @click="handleshangyi(scope.$index, scope.row)">上移</el-button>
                <el-button size="mini" @click="handlexiayi(scope.$index, scope.row)">下移</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- <div style="margin-top: 0.3vw;float: right">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pIndex_dah"
            :page-sizes="[20, 50, 100]" :page-size="pSize_dah" layout="total, sizes, prev, pager, next, jumper"
            :total="count_DAH">
          </el-pagination>
        </div> -->

      </div>
    </div>
    <el-dialog :title="visibleTitle" :visible.sync="dialogFormVisible" width="30%" custom-class="dangao-visible">
      <el-form :model="form">
        <el-form-item label="获取方式" :label-width="formLabelWidth">
          <el-select v-model="form.xtype" placeholder="请选择" @change="hqfsChang">
            <el-option v-for="(item,index) in hqfsData" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="著录项" :label-width="formLabelWidth">
           <!-- @change="zlxDataChange" -->
          <el-select :disabled="this.form.xtype=='固定值'" ref="zlxDataRef" v-model="form.xname" placeholder="请选择">
            <el-option v-for="(item, index) in zlxData" :key="index" :label="item.xbyname" :value="item.xname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="固定值" :label-width="formLabelWidth">
          <el-input :disabled="this.form.xtype=='著录项值'" v-model="form.xvalue"></el-input>
        </el-form-item>
        <!-- <el-form-item label="截取长度" :label-width="formLabelWidth">
          <el-input v-model="form.offset" placeholder="添加'_'代表从当前截取"></el-input>
        </el-form-item> -->
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.notes"></el-input>
        </el-form-item>
        <!-- <el-form-item label="数据字段" :label-width="formLabelWidth">
          <el-select v-model="form.jszd" placeholder="请选择">
            <el-option v-for="item in sjzdData" :key="item.mlid" :label="item.mlname" :value="item.mlid"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item v-if="this.visibleTitle == '档号规则编辑'" label="维护人ID" :label-width="formLabelWidth">
          <el-input v-model="form.userid" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="this.visibleTitle == '档号规则编辑'" label="维护时间" :label-width="formLabelWidth">
          <el-input v-model="form.createtime" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import bus from '../../utils/bus'
// YJJ
export default {


  // YJJ
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '80px',
      pIndex_dah: 1,
      pSize_dah: 20,
      count_DAH: 0,
      form: {
        xtype: '',
        xname: '',
        // xbyname: '',
        xvalue: '',
        // offset: '',
        notes: '',
        userid: '',
        createtime: '',
        // jszd:''
      },
      hqfsData:[], //获取方式
      zlxData:[], //著录项
      // sjzdData:[], //数据字段
      tableBodyInfoList: [],
      visibleTitle:'',
      Bus_MLId:'',
      danganhe_table_name: '',
      indexData:1,
      referenceIndex:'hgl'
    };

  },
  created() {

  },
  mounted() {
    this.getTableData()
         bus.$off('changeEvent');
    bus.$on('changeEvent', (MLId, MLName, FatherKey, MLGS, danganjieyueflag) => {
      console.log(MLId, MLName, FatherKey, MLGS, '消息通信');
      this.Bus_MLId = MLId;
      // 这里会循环调好多次 所以判断一下
      this.indexData = 1
      if (this.indexData == 1) {
        this.getDATableName();
      }
      return
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
    //获取方式切换
    hqfsChang (val) {
      console.log('aaa',val)
      if (val == '著录项值') {
        this.form.xvalue = ''
      } else {
        this.form.xname = ''
      }
    },
    //获取数据
    getTableData () {
      if (this.danganhe_table_name == '') {
        this.tableBodyInfoList = []
        return
      }
      let data = {
        "pSize": 50,
        "pIndex": 1
      }
      if (this.referenceIndex == 'hgl') {
        data.Table_name = this.danganhe_table_name
      } else {
        data.Table_name = this.danganhe_table_name.replace('hgl', 'arch')
      }
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/getDHRulesList", data).then(//查询盒内数据
        (res) => {
          console.log('wwww',res)
          this.tableBodyInfoList = res.data.data
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //获取 获取方式
    getDataHqfs () {
      this.hqfsData = [
        {name:'著录项值',value:'著录项值'},
        {name:'固定值',value:'固定值'}
      ]
      if (this.visibleTitle == '档号规则编辑') {
        for (let i = 0 ; i < this.hqfsData.length ; i++) {
          if (this.hqfsData[i].value == this.form.xtype) {
            this.form.xtype = this.hqfsData[i].value
          }
        }
      }
      // let data = {}
      // axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDAMLData1", data).then(//查询盒内数据
      //   (res) => {
      //     console.log('获取方式',res)
          
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
    },
    //获取 著录项
    getDataZlx () {
      let data = {}
      let _url = ''
      if (this.referenceIndex == 'hgl') {
        data.Table_name = this.danganhe_table_name //"a01_hgldata_14_4"
        _url = '/GetZLXData1_hgl'
      } else {
        data.Table_name = this.danganhe_table_name.replace('hgl', 'arch')
        _url = '/GetZLXData'
      }
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + _url, data).then(//查询盒内数据
        (res) => {
          console.log('著录项',res)
          this.zlxData = res.data.data
          if (this.visibleTitle == '档号规则编辑') {
            if (this.form.xname == '') {
              this.form.xname = ''
            } else  {
              for (let i = 0 ; i < this.zlxData.length ; i++) {
                if (this.zlxData[i].xname == this.form.xname) {
                  this.form.xname = this.zlxData[i].xname
                }
              }
            }
            
          }
          
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // // //著录项 change事件 
    // zlxDataChange (value) {
    //   console.log('qqqq',value)
    //   // console.log('qqqq',this.$refs.zlxDataRef.selected.label)
    // },
    //获取 数据字段
    // getDataSjzd () {
    //   let data = {}
    //   axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDAMLData1", data).then(//查询盒内数据
    //     (res) => {
    //       console.log('数据字段',res)
    //       this.sjzdData = res.data.data
    //       if (this.visibleTitle == '档号规则编辑') {
    //         this.form.jszd = 15
    //         for (let i = 0 ; i < this.zlxData.length ; i++) {
    //           if (this.zlxData[i].mlid == this.form.jszd) {
    //             this.form.jszd = this.zlxData[i].mlid
    //           }
    //         }
    //       }
          
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // },
    //新建
    dialogFormVisibleCli() {
      if (this.danganhe_table_name == '') {
        this.$message({
          type: 'info',
          message: '请先选择左侧的门类!'
        });
        return
      }
      this.visibleTitle = '档号规则设置'
      this.form = {
        xtype: '',
        xname: '',
        // xbyname: '',
        xvalue: '',
        xoffset: '',
        notes: '',
        userid: '',
        createtime: ''
      },
      this.getDataHqfs()
      // this.getDataSjzd()
      this.getDataZlx()
      this.dialogFormVisible = true
    },
    //弹框确认
    dialogFormVisibleOk () {
      console.log('qqqq',this.form)
      console.log('qqqq',this.$refs.zlxDataRef.selected.label)
      console.log('qqqq',this.$refs.zlxDataRef.selected.value)
      if (this.form.xtype == '') {
        this.$message({
          type: 'info',
          message: '请选择获取方式!'
        });
        return
      } else if (this.form.xtype == '著录项值' && this.form.xname == '') {
        this.$message({
          type: 'info',
          message: '请选择著录项!'
        });
        return
      } else if (this.form.xtype == '固定值' && this.form.xvalue == '') {
        this.$message({
          type: 'info',
          message: '请输入固定值!'
        });
        return
      }
      let data = {}
      if (this.visibleTitle == '档号规则编辑') {
        data.id = this.form.id
        // data.userid = this.form.userid
        // data.createtime = this.form.createtime
      } else {
        data.id = 0
      }
      if (this.$refs.zlxDataRef.selected.label && this.$refs.zlxDataRef.selected.value) { //著录项
        data.xname = this.form.xname
        data.xbyname = this.$refs.zlxDataRef.selected.label //this.form.xbyname
      } else {
         data.xbyname = ''
         data.xname = ''
      }
      data.xtype = this.form.xtype
      data.xvalue = this.form.xvalue
      data.xoffset = '0' //this.form.offset
      data.notes = this.form.notes

      if (this.referenceIndex == 'hgl') {
        data.Table_name = this.danganhe_table_name
      } else {
        data.Table_name = this.danganhe_table_name.replace('hgl', 'arch')
      }
      
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/SaveDHRules", data).then(//查询盒内数据
        (res) => {
          console.log('保存编辑',res)
          if (res.data.code == 200) {
            this.getTableData()
            this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.dialogFormVisible = false
          } else {
            this.$message({
                type: 'info',
                message: '操作错误!'
              });
          }

        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('数据删除后将无法恢复，请谨慎操作', '确定要删除该条数据吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: row.id,
        }
        if (this.referenceIndex == 'hgl') {
          data.Table_name = this.danganhe_table_name
        } else {
          data.Table_name = this.danganhe_table_name.replace('hgl', 'arch')
        }
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/delDHRulesList ", data).then(//查询盒内数据
          (res) => {
            console.log('删除该条数据',res)
            if (res.data.code == 200) {
              this.getTableData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 修改
    handleEdithgl(index, row) {
      this.visibleTitle = '档号规则编辑'
      this.form = row
      this.form.createtime = this.form.createtime.split('.')[0].replace('T', ' ')
      this.getDataHqfs()
      // this.getDataSjzd()
      this.getDataZlx()
      this.dialogFormVisible = true
    },
    getDATableName() {//获取档案的表名
      var tempData = {};
      tempData.Table_name = "a01_hgldata" //"a01_archdata";  //a01_hgldata
      tempData.MLId = this.Bus_MLId || 1;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAFLMLTableName', tempData).then(//根据MLID获取档案表名称
        success => {
          console.log(success, '根据MLID获取档案盒名称-成功---------------------------');
          if (success.data.code == 200) {
            this.danganhe_table_name = success.data.data
            this.indexData = 2
            this.getTableData()
          }
        },
        error => {
          console.log(error, '根据MLID获取档案表名称--返回失败的数据');
        })
    },
    //上移
    handleshangyi (index, row) {
      console.log('row',row)
      console.log('index',index)
      if (index == 0) {
        this.$message({
          type: 'info',
          message: '已经是第一个啦!'
        });
        return
      }
      let ids = []
      ids.push(row.id,this.tableBodyInfoList[index-1].id)
      // ids.push(this.tableBodyInfoList[index-1].id)
      let xsorts = []
      xsorts.push(this.tableBodyInfoList[index-1].xsort,row.xsort)
      // xsorts.push(row.xsort)
      
      let data = {
          ids: ids.toString(),
          xsorts: xsorts.toString()
        }
        if (this.referenceIndex == 'hgl') {
          data.Table_name = this.danganhe_table_name
        } else {
          data.Table_name = this.danganhe_table_name.replace('hgl', 'arch')
        }
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/updateDHRules1", data).then(//查询盒内数据
          (res) => {
            console.log('删除该条数据',res)
            if (res.data.code == 200) {
              this.getTableData()
              this.$message({
                type: 'success',
                message: '移动成功!'
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    //下移
    handlexiayi (index, row) {
      console.log('row',row)
      console.log('index',index)
      if (index == this.tableBodyInfoList.length -1) {
        this.$message({
          type: 'info',
          message: '已经是最后一个啦!'
        });
        return
      }
      let ids = []
      ids.push(row.id,this.tableBodyInfoList[index+1].id)
      // ids.push(this.tableBodyInfoList[index-1].id)
      let xsorts = []
      xsorts.push(this.tableBodyInfoList[index+1].xsort,row.xsort)
      let data = {
          ids: ids.toString(),
          xsorts: xsorts.toString()
        }
        if (this.referenceIndex == 'hgl') {
          data.Table_name = this.danganhe_table_name
        } else {
          data.Table_name = this.danganhe_table_name.replace('hgl', 'arch')
        }
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/updateDHRules1", data).then(//查询盒内数据
          (res) => {
            console.log('删除该条数据',res)
            if (res.data.code == 200) {
              this.getTableData()
              this.$message({
                type: 'success',
                message: '移动成功!'
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    //档案盒 档案号 切换
    referenceSet (type) {
      this.referenceIndex = type
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.pIndex_dah = val;
      console.log(val, 'putongpIndex_dah');
    },
    //每页条数
    handleSizeChange(val) {
      // this.pSize_dah = val;
      console.log(val, 'putongpIndex_dah');
    },
  }
};
</script>

<style  scoped lang="scss">
.moban-set{
  display: flex;
  height: 100%;
  width:100%;
  .moban-set-left{
    width:120px;
    font-size:14px;
    height:95%;
    padding-top:30px;
    border-right: 1px solid #eee;
    .moban-set-left-active{
      color:#409EFF;
    }
    span{
      height:40px;
      display: block;
      // width:100%;
      line-height: 40px;
      cursor:pointer;
    }
  }
  .moban-set-right{
    padding:0 10px;
    width:calc(100% - 120px);
    .moban-set-right-top{
      padding-bottom:10px;
    }
  }
}
.dangao-visible{
  .el-select{
    width:100%;
  }
}
.el-submenu__title {
  height: 48px !important;
  line-height: 48px !important
}

.el-menu--horizontal>.el-menu-item {
  height: 48px !important;
  line-height: 48px !important
}

.header {
  width: 100%;
  height: 5vh;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  margin-bottom: 1vh;
}

.el-table thead {
  color: #000 !important;
}
.el-table--border,
.el-table--group {
  border: 1px solid #8A8A8A !important;
}
.el-table__body-wrapper{
  padding-bottom:10px;
  height:450px;
}
</style>