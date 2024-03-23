<template>
  <div class="app-container">

    <div class="header">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        text-color="000" active-text-color="#ffd04b">
        <!-- 著录 -->
        <el-menu-item index="1">
          <div @click="DAH_Record()" class="headerzhulu">
            <i class="el-icon-document-checked"></i>
            清空档案盒
          </div>
        </el-menu-item>
        <el-menu-item index="2">
          <div style="margin-left:1vw" @click="DA_Record()" class="headerzhulu">
            <i class="el-icon-document-checked"></i>
            清空档案
          </div>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 表格档案盒 -->
    <div v-show="dapingshowone" class="containerone">

      <div class="TableHeader">
        <div>
          <div style="    margin-left: 1vw;
    margin-top: 0.3vw;"><img src="~@/assets/a02_dagl/档案盒.png" alt="" style="height: 1.9vh;"></div>
          <el-tag type="success" style="background:none;margin-right: 1vw;margin-left: -0.3vw;">档案盒信息</el-tag>
        </div>

        <el-select style="margin-left:0.5vw" v-model="DAH_optionsvalue" placeholder="请选择搜索项" clearable="">
          <el-option v-for="item in DAH_options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input
          style="border-radius: 5.5px; border: 0.8px solid #8A8A8A;width: 10vw; margin-left: 1vw; margin-right: 1vw"
          v-model.trim="inputlist" clearable=""></el-input>
        <el-button style="height:1.6vw;width:4vw;" type="primary" icon="el-icon-search" @click="SearchDAH()">
          <div style="color:#fff;margin-top:-0.7vw;margin-left:0.5vw; font-size:0.8vw;">查询</div>

        </el-button>


        <div :class="dapingshow ? 'quanpingone' : 'quanpingoneone'" @click="bigping()"> </div>
      </div>


      <div style="display:flex;position: relative;">

  

        <el-table @row-click="handleRowClick" id="table-listone" ref="multipleTable"
          :class="newclass ? 'newclass' : 'oldclass'" height="200" :data="tableBodyInfoList"
          @selection-change="handleSelectallboxes" border>
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>
          <el-table-column :width="item.width" v-for="( item, idx ) in  columnInfoList " :key="idx" :prop="item.prop"
            :show-overflow-tooltip="true" :label="item.label" header-align="center" align="center">
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right" header-align="center" align="center">
            <template slot-scope="scope">
              <div style="display:flex">
                <!-- <el-button size="mini" type="warning"
                  @click="fileboxforloanClick(scope.$index, scope.row)">盒借阅</el-button> -->


                <!-- <el-button size="mini" type="warning" @click="separateBox(scope.$index, scope.row)">拆盒</el-button> -->
                <!-- <el-button size="mini" type="success" @click="OnShelf(scope.$index, scope.row)">上架</el-button> -->
                <!-- <el-button size="mini" type="primary" v-if="tableBodyInfoList[scope.$index].ads != '0区0列右侧0节0层0格'"
                  @click="DownShelf(scope.$index, scope.row)">下架</el-button> -->
                <el-button size="mini" @click="DAHhuifu(scope.$index, scope.row)">档案盒撤回</el-button>
                <!-- <el-button size="mini" type="success" @click="handlesaomiao(scope.$index, scope.row)">RFID写入</el-button> -->
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">永久删除</el-button>

              </div>

            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 0.3vw;float: right">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pIndex_dah"
          :page-sizes="[10, 50, 100, 200]" :page-size=pSize_dah layout="total, sizes, prev, pager, next, jumper"
          :total="count_DAH">
        </el-pagination>
      </div>

    </div>
    <div style="height:0.5vh"></div>
    <!-- 表格档案 -->
    <div v-show="dapingshow" class="containertwo">
      <div class="TableHeader">
        <div>
          <div style="    margin-left: 1vw;
    margin-top: 0.3vw;"><img src="~@/assets/a02_dagl/档案卷.png" alt="" style="height: 1.9vh;"></div>
          <el-tag type="success" style="background:none;margin-right: 1vw;margin-left: -0.3vw;">档案信息</el-tag>
        </div>
        <el-select style="margin-left:0.5vw" v-model="DAoptionsvalue" placeholder="请选择搜索项" clearable="">
          <el-option v-for=" item  in  DAoptions " :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width: 10vw; margin-left: 1vw; margin-right: 1vw" v-model.trim="DAinputlist" clearable=""></el-input>
        <div style="margin-left:0.6vw"> <el-button type="primary" icon="el-icon-search" @click="SearchDA()">
            <div style="color:#fff;margin-top:-0.7vw;margin-left:0.5vw;font-size: 0.8vw;height: 0.6vw;
    width: 2vw;">查询</div>
          </el-button></div>



        <div :class="dapingshowone ? 'quanpingtwo' : 'quanpingonetwo'" @click="bigpingone()"> </div>
      </div>

      <div style="display:flex;">


        <el-table id="table-listoneDA" :class="newclassone ? 'newclassone' : 'oldclassone'" height="200"
          @selection-change="handleSelectionChange" :data="DAtableBodyInfoList" border ref="multipleTableone"
          style="width: 100%;font-size: 14px;overflow-x:visible; white-space: nowrap;">
          <el-table-column type="selection" header-align="center" align="center">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" :width="item.width" v-for="( item, idx ) in  DAcolumnInfoList "
            :key="idx" :prop="item.prop" :label="item.label" header-align="center" align="center">
          </el-table-column>
          <el-table-column width="200" fixed="right" label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="DAhuifu(scope.$index, scope.row)">档案撤回</el-button>
              <el-button size="mini" type="danger" @click="handleDeleteS(scope.$index, scope.row)">永久删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="float: right;">
        <el-pagination @size-change="handleSizeChangeone" @current-change="handleCurrentChangeone"
          :current-page="pIndex_da" :page-sizes="[10, 50, 100, 200]" :page-size="pSize_da"
          layout="total, sizes, prev, pager, next, jumper" :total="count_DA">
        </el-pagination>
      </div>
    </div>

    <el-dialog center title="自定义分组设置" :visible.sync="dialogVisiblesetting" width="80%">
      <div>
        <div v-if="top">
          <div class="box_cm">
            <div class="box_cm_list">
              <el-table :data="tableData" height="65vh" border ref="tableLeft" :row-key="getRowKeys">
                <el-table-column label="未选著录项">
                  <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
                  <el-table-column align="center" show-overflow-tooltip v-for="(item, oks) in tableLabel" :key="oks"
                    :label="item.label" :min-width="item.width ? item.width : 118">
                    <template slot-scope="scope">
                      <div>
                        {{ scope.row[item.prop] }}
                      </div>

                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>

            <div class="box_cm_list_cm">
              <div>
                <el-button @click="Right" type="primary" style="background:#1890ff;color:white">
                  右移
                </el-button>
              </div>
              <div>
                <el-button @click="Left" :disabled="!selectedStaffData.length" type="primary"
                  style="background:#1890ff;color:white">左移</el-button>
              </div>
              <!-- <div>
                <el-button @click="Right" :disabled="!selectedStaffData.length" type="primary"
                  style="background:#1890ff;color:white" >上移</el-button>
              </div>
              <div>
                <el-button @click="Right" :disabled="!selectedStaffData.length" type="primary"
                  style="background:#1890ff;color:white">下移</el-button>
              </div> -->
            </div>

            <div class="box_cm_list">
              <el-table :data="selectedStaffList" height="65vh" border ref="tableRight" :row-key="getRowKeys"
                @selection-change="handleSelectedStaffChange">
                <el-table-column label="已选著录项">
                  <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
                  <el-table-column align="center" show-overflow-tooltip v-for="item in tableLabel" :key="item.prop"
                    :label="item.label" :min-width="item.width ? item.width : 118">
                    <template slot-scope="scope">
                      <div>
                        {{ scope.row[item.prop] }}
                      </div>

                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="140">
                    <template slot-scope="scope">
                      <el-button type="text" @click="moveUp(scope.$index, scope.row)">上移</el-button>
                      <el-button type="text" @click="moveDown(scope.$index, scope.row)">下移</el-button>
                    </template>
                  </el-table-column>

                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-else></div>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblesetting = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisiblesetting = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 高级搜索 -->
    <el-dialog width="60%" title="高级搜索" :visible.sync="muitisearchVisible" append-to-body>
      <el-form>
        <el-form-item>
          <el-descriptions title="搜索条件" border>
            <template slot="extra">
              <el-button type="primary" icon="el-icon-refresh-right" circle @click="reset()"></el-button>复位
              <el-button type="success" icon="el-icon-folder-add" circle @click="add()"></el-button>添加搜索条件
              <el-button type="danger" icon="el-icon-folder-remove" circle @click="remove()"></el-button>删除搜索条件
            </template>
            <template v-for="(item, index) in RecordInputListearch">
              <el-descriptions-item :key="index">
                <template slot="label">
                  <i class="el-icon-tickets" />搜索条件{{ item.label }}
                </template>
                <el-select v-model="item.sel" style="width: 10vw;margin-left: auto;" placeholder="请选择著录项"
                  @change="DQxuanzhong">
                  <el-option v-for="(item, index) in DAH_options" :label="item.label" :value="item.label"></el-option>
                </el-select>
                <el-select v-model="item.chse" style="width: 10vw;margin-left: auto;" placeholder="请选择判断条件">
                  <el-option label="等于" value="="></el-option>
                  <el-option label="不等于" value="<>"></el-option>
                  <el-option label="包含" value="like"></el-option>
                  <el-option label="不包含" value="not like"></el-option>
                  <el-option label="大于" value=">"></el-option>
                  <el-option label="小于" value="<"></el-option>
                </el-select>
                <el-input style="width: 10vw;margin-left: auto;" v-model="item.input"></el-input>
              </el-descriptions-item>
            </template>
          </el-descriptions>
        </el-form-item>
        <!-- <el-option v-for="(item,index) in selectvaluelist" :label="item.label"></el-option>  -->
        <!-- <el-option v-show="this.selectvalue==''||'0'" label="包含" value="beijing"></el-option>  -->
        <el-form-item>
          <el-descriptions title="排序方式" border>

            <template slot="extra">
              <el-button type="primary" icon="el-icon-refresh-right" circle @click="resetpaixu()"></el-button>复位
              <el-button type="success" icon="el-icon-folder-add" circle @click="addpaixu()"></el-button>添加搜索条件
              <el-button type="danger" icon="el-icon-folder-remove" circle @click="removepaixu()"></el-button>删除排序条件
            </template>
            <template v-for="(item, index) in RecordInputListone">
              <el-descriptions-item :key="index">
                <template slot="label">
                  <i class="el-icon-tickets" />搜索条件{{ item.label }}
                </template>
                <el-select v-model="item.sel" placeholder="请选择著录项">
                  <el-option v-for="(item, index) in DAH_options" :label="item.label" :value="item.label"></el-option>
                </el-select>
                <el-select v-model="item.value" placeholder="请选择排序方式">
                  <el-option label="升序" value="asc"></el-option>
                  <el-option label="降序" value="desc"></el-option>
                </el-select>
              </el-descriptions-item>
            </template>
          </el-descriptions>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline: center">
        <el-button type="primary" @click="muitisearchVisible = false">取 消</el-button>
        <el-button type="danger" @click="mutisearch()">搜索</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import axios from "axios";
import bus from '../../utils/bus'
import FileSaver from "file-saver";
import XLSX from "xlsx";
import moment from 'moment';
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
      kaiguanflage:false,
      kaiguanflageDA:false,
      valuetwotwotwo: '',
      valueoneoneone: '',
      selectvalue: '',
      value1: '',
      ColCn: 5,
      muitisearchVisible: false,
      RecordInputListearch: [
        {
          label: "1",
          value: "32",
          sel: "",
          chse: "",
          input: ""
        }
      ],
      RecordInputListone: [
        {
          label: "1",
          sel: "题名",
          value: "asc"

        }
      ],
      boxinarchfalg: false,
      mutisearchflag: false,
      DAHlist: [],
      yidonghezi: false,
      yidonghezione: false,
      count_DAH: 0,
      count_DA: 0,



      // pageindex_dah:1,
      // pagesize_dah:20,
      // totalcount_dah:0,
      // pageindex:1,
      // pagesize:20,
      // totalcount:0,

      archivalinformationdangan: false,
      archivalinformationhgl: false,
      settinging: true,
      settingingtwo: true,
      top: false,
      tableData: [
        {
          fnumber: '56-01-01',
          corptype: '无',
          corpte: '广东xxx国际xxx公司',
          corppe: '李xx',
          crptype11: 'xx省xx市xx镇',
          id: 1,
        },
        {
          fnumber: '56-02-02',
          corptype: '无',
          corpte: '福建xxx国际xxx公司',
          corppe: '何xx',
          crptype11: 'xx省xx市xx镇',
          id: 2,
        },
        {
          fnumber: '56-03-03',
          corptype: '无',
          corpte: '广西xxx国际xxx公司',
          corppe: '陈xx',
          crptype11: 'xx省xx市xx镇',
          id: 3,
        },
        {
          fnumber: '56-04-04',
          corptype: '无',
          corpte: '江西xxx国际xxx公司',
          corppe: '林xx',
          crptype11: 'xx省xx市xx镇',
          id: 4,
        },
        {
          fnumber: '56-05-05',
          corptype: '有',
          corpte: '山西xxx国际xxx公司',
          corppe: '马xx',
          crptype11: 'xx省xx市xx镇',
          id: 5,
        }
      ],
      selectedStaffList: [],
      selectedStaffData: [],
      tableLabel: [ //对应table表格字段，名称，宽度
        {
          prop: "fnumber",
          label: "档号",
          width: 110,
        },
        {
          prop: "corptype",
          label: "案卷题名",
          width: 90,
        },
        {
          prop: "corpte",
          label: "企业名称",
          width: 110,
        },
        {
          prop: "corppe",
          label: "法人代表",
          width: 110,
        },
        {
          prop: "crptype11",
          label: "企业地址",
          width: 110,
        },
      ],
      dialogVisiblesetting: false,
      isCollapse: false,
      isCollapseone: false,
      sideWidth: 0,
      datatwo: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      dataone: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultPropsone: {
        children: 'children',
        label: 'label'
      },
      options: [{
        value: '自定义选项',
        label: '自定义选项'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      optionsone: [{
        value: '自定义选项',
        label: '自定义选项'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      newvaluelaji:'',
      value: '',
      valueone: '自定义选项',
      valuetwo: '自定义选项',
      currentPage_DAH: 1,
      pIndex_da: 1,
      putongpIndex_DA:1,
      pSize_da: 10,
      pIndex_dah: 1,
      putongpIndex_dah:1,
      pSize_dah: 10,
      indehao: 0,
      indehaoone: 0,
      newclass: false,
      dapingshow: true,
      newclassone: false,
      dapingshowone: true,
      title: '档案盒归还',//
      linshiTablename: '',//
      linshiCODE: '',//
      jieyuelishijilu: [],//
      jieyuelishijiludangan: [],//
      danganheCODE: '',//
      danganheTable_name: '',//
      danganCODE: '',//
      danganTable_name: '',//
      jieyuelishitable_name: '',//
      jieyueliCODE: '',//
      radio: '1',//
      deletelist: [],//
      arrlist: '', //
      filebiaotou: [], //RFID通道门记录表头数组


      danganhedanxuan: '',//档案盒单选  
      dangandanxuan: '',//档案单选  

      danganhequanxuan: [],//档案盒全选列表 
      danganquanxuan: [],//档案全选列表  
      zaijielishi: [], //
      zaijielishihgl: [],//

      quickygridData: [{
        Serialnumber: '1',
        Barcodenumber: '2352156156',
        Message: '在借',
        adtaid: '12312513',
        category: '1',
        Filestatus: '归还',
        position: '库房一区二节',
      }, {
        Serialnumber: '1',
        Barcodenumber: '2352156156',
        Message: '在借',
        adtaid: '12312513',
        category: '1',
        Filestatus: '归还',
        position: '库房一区二节',
      }, {
        Serialnumber: '1',
        Barcodenumber: '2352156156',
        Message: '在借',
        adtaid: '12312513',
        category: '1',
        Filestatus: '归还',
        position: '库房一区二节',
      }, {
        Serialnumber: '1',
        Barcodenumber: '2352156156',
        Message: '在借',
        adtaid: '12312513',
        category: '1',
        Filestatus: '归还',
        position: '库房一区二节',
      }],
      archivalinformationImport: false, //Excel普通导入
      archivalinformation: false, //档案著录
      fileboxforloan: false, //档案盒借阅
      quickcodescan: false, //快速扫码
      fileboxreturn: false, //档案盒归还
      filepopupwindow: false, //在借档案
      filepopupwindowcheckcar: false, //盘点车
      filepopupwindowRFID: false, //RFID
      borrowinghistory: false, //借阅历史记录
      activeName: "first", //在借档案tabs
      activeNameLs: "first", //借阅记录tabs
      activeNameRecord: "first", //著录


      activeIndex2: '',
      // 档案盒上架
      OnShelfdialogFormVisible: false,
      OnShelfForm: {
        QuNo: '',
        ColNo: '',
        LeNo: '',//节
        DivNo: '',
        ZyNo: '1',
        SxNo: '',//顺序
        poscode: '',
      },
      formLabelWidth: '80px',
      ONShelf_CODE_HGL: '',
      ONShelf_status: '',


      valueRFIDTime: '',
      dialogVisibleRFID: false,
      PDTitle: '盘点添加',
      DAarchive: '档案借阅', //档案借阅 弹框title提示
      inputghRFID: "", //盘点添加input
      valueRFIDJHR: "admin", //盘点添盘点
      PDPId: "",//盘点计划中修改接口中传递的数据
      optionsRFID: [
        {
          value: "admin",
          label: "admin",
        },
      ],
      //在借档案盒tab
      FileonloanTable: [
        {
          date: "1",
          name: "在借档号盒1",
          address: "在借档号盒1",
        },
      ],
      //RDID表格
      fileTableRFID: [
        {
          date: "RFID",
          name: "RFID1",
          address: "RFID1",
        },
      ],
      //盘点车表格
      fileTableRFIDcheckcar: [
        {
          date: "盘点车",
          name: "盘点车1",
          address: "盘点车1",
        },
      ],
      //借阅历史档案盒tab
      loanhistoryTable: [
        {
          date: "1",
          name: "借阅历史档案盒1",
          address: "借阅历史档案盒1",
        },
      ],
      //在借档案tab
      borrowingfilebox: [
        {
          date: "1",
          name: "在借档案1",
          address: "在借档案1",
        },
      ],
      //借阅历史档案tab
      borrowhistoryfiles: [
        {
          date: "1",
          name: "借阅历史档案1",
          address: "借阅历史档案1",
        },
      ],
      //档案盒归还
      fileboxforloanList: [
        // {
        //   date: "归还",
        //   name: "归还",
        //   address: "归还",
        // },
      ],
      //档案盒借阅
      DAH_ID: '',
      DA_ID: '',
      filelendingTble: [
        {
          index: "借阅11111111111",
          name: "借阅",
          number: "借阅",
          barCode: "借阅",
          address: "借阅",
        },
      ],
      inputlist: "", //档案信息input
      DAinputlist: "", //档案信息input
      inputdanghao: "", //档号input
      inputhemahao: "", //盒马号input
      inputgh: "", //档案盒归还人
      inputjbr: "admin", //档案盒经办人
      inputphone: "", //档案盒手机号码
      inputjgddh: "", //档案盒固定电话
      inputcfwz: "", //档案盒存放位置
      valuegrriqi: "", //档案盒日期

      //档案盒借阅
      Fileboxesloan: {
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
      },
      //档案盒借阅结尾

      // Excel普通导入
      uploadlistdata: [
      ],

      //通道门过门记录
      filetelist: {
        beconfirmed: "1",
        // confirmed: "2",
        selectall: true,
        filepandian: "",
      },

      //档案著录
      Putdownloan: {
        Descriptiontest: "1",
        Descriptionyear: "2",
        Boxbarcode: "3",

        Describoxptionyear: "4",
        Descriptionboxyear: "5",
        archBoxbarcode: "6",
      },

      RecordInputList: [],
      DA_RecordInputList: [],
      //档案著录

      columnInfoList: [], //档案表格数据
      tableBodyInfoList: [], //档案表格数据
      DAcolumnInfoList: [], //档案表格数据
      DAtableBodyInfoList: [], //档案表格数据


      // 
      DAcolumnInfoPDClist: [], //盘点车表格数据 
      fileTableRFIDcheckcar: [],  //盘点车 

      //结尾
      DAoptions: [
        {
          value: "0",
          label: "所有搜索项",
        },
      ],
      DAoptionsvalue: "",
      selectvaluelist: [],
      DAH_options: [
        {
          value: "0",
          label: "所有搜索项",
        },
      ],
      DAH_optionsvalue: "",

      //档案盒归还
      optionsgh: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      value: "",
      Bus_MLId: '',
      Bus_MLName: '',
      Bus_FatherKey: '',
      Bus_MLGS: '',
      DATableDesignTittle: '',
      DAH_TableDesignTittle: '',

      multiSelectallboxes: [],  //档案盒权限val
      multiSelectallboxesList: [],  //档案权限val
      CODE_HGL: "",
      CODE: "",
      uploadlist_add_Visible: false,
      formLabelWidth: "150px",
      UpLoadListSelect: [],
      uploadlist_add: {
        filesort: 1,
        filename: "",
        startpos: 0,
        totalcnt: 0,
        exceltype: "0"
      },
      uploadlist_edit_Visible: false,
      uploadlist_edit: {
        filesort: 1,
        filename: "",
        tablename: "",
        startpos: 0,
        totalcnt: 0,
        exceltype: "0"
      },
      uploadfile_Visible: false,
      upload_filename: "",
      upload_mlname: "",
      upload_tablename: "",
      inportdataing_Visible: false,
      inportchecking_Visible: false,
      inportdataingrate: 0,
      inportdataingmsg: "",
      inportdataingcurrent: 0,
      inportdataingtotalcnt: 0,
      inportdataingcheckingmsg: "",
    };
  },
  created() {

  },
  mounted() {
     bus.$off('changeEvent');
    bus.$on('changeEvent', (MLId, MLName, FatherKey, MLGS) => {
      console.log(MLId, MLName, FatherKey, MLGS, '消息通信');
      this.Bus_MLId = MLId;
      this.Bus_MLName = MLName;
      this.Bus_FatherKey = FatherKey;
      this.Bus_MLGS = MLGS;
      this.boxinarchfalg = false;
      this.mutisearchflag = false;
      this.getDATableName();
      this.getDAH_TableName();
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

    //借阅历史档案盒时间转换
    DAHdateFormat(row, jieyuelishijilu) {
      if (jieyuelishijilu.property === 'lenddate' || jieyuelishijilu.property === 'returndate') {
        //       返回格式化的列
        row[jieyuelishijilu.property] = this.formateDate(row[jieyuelishijilu.property])
        return row[jieyuelishijilu.property]
      } else {
        //       返回不需要惊醒格式化列源
        return row[jieyuelishijilu.property]
      }
    },
    //借阅历史档案时间转换
    DAdateFormat(row, jieyuelishijiludangan) {
      if (jieyuelishijiludangan.property === 'lenddate' || jieyuelishijiludangan.property === 'returndate') {
        //       返回格式化的列
        row[jieyuelishijiludangan.property] = this.formateDate(row[jieyuelishijiludangan.property])
        return row[jieyuelishijiludangan.property]
      } else {
        //       返回不需要惊醒格式化列源
        return row[jieyuelishijiludangan.property]
      }
    },

    // 时间格式转换
    formateDate(time) {
      // 使用dayjs 把世界标准时间转换为北京时间
      let date = this.dayjs(time).format();
      console.log(date) // 2020-09-30T02:02:02+08:00
      // 把2020-09-30T02:02:02+08:00 截取出 '2020-9-30 2:2:2'
      const arr = date.split("T");
      const d = arr[0];
      const darr = d.split("-");

      const t = arr[1];
      const tarr = t.split(".000");
      const marr = tarr[0].split(":");

      const dd =
        parseInt(darr[0]) +
        "-" +
        parseInt(darr[1]) +
        "-" +
        parseInt(darr[2]) +
        " " +
        parseInt(marr[0]) +
        ":" +
        parseInt(marr[1]) +
        ":" +
        parseInt(marr[2]);
      console.log(dd) // 2020-9-30 2:2:2
      return dd;
    },
    //通道门过门记录时间转换
    DOORguomenFormat(row, filebiaotou) {
      if (filebiaotou.property == 'RecordTime') {
        //       返回格式化的列
        row[filebiaotou.property] = this.formateDate(row[filebiaotou.property])
        return row[filebiaotou.property]
      } else {
        //       返回不需要惊醒格式化列源
        return row[filebiaotou.property]
      }
    },


    DQxuanzhong(val) {
      //   console.log(val.target,'eeeeeeeeeeeeeeeeeeeeeeeeee');
      //   console.log(val.target.innerHTML,'eeeeeeeeeeeeeeeeeeeeeeeeee');
      //   // console.log(value,'valuevaluevaluevalue');
      //   this.selectvaluelist=[]
      //   console.log(val,'sssssssssssssssssssssssssssssssssssssssssss');
      //   // this.selectvalue=val
      // this.DAH_options.forEach((item)=>{
      //          if(item.label==val){
      //              console.log(item,'item.xlx');
      //           this.selectvalue=item.type

      //          }             
      // })
      // if(this.selectvalue==1||this.selectvalue==2){
      //   this.selectvaluelist.push(
      //     {
      //       label:'等于',
      //       value:'等于'
      //     },
      //     {
      //       label:'小于',
      //       value:'小于'
      //     },
      //     {
      //       label:'大于',
      //       value:'大于'
      //     },
      //     {
      //       label:'不等于',
      //       value:'不等于'
      //     }
      //   )
      // }else{
      //   this.selectvaluelist.push(
      //     {
      //       label:'包含',
      //       value:'包含'
      //     },
      //     {
      //       label:'等于',
      //       value:'等于'
      //     },

      //   )
      // }
    },
    reset() {


      this.RecordInputListearch = [

      ]
    },
    resetpaixu() {
      this.RecordInputListone = [
        {
          label: "1",
          value: "123123"
        }
      ]
    },
    add() {
      var data = {};
      data.label = (this.RecordInputListearch.length + 1) + "";
      data.value = "123";
      data.sel = "";
      data.chse = "";
      data.input = "";
      this.RecordInputListearch.push(data)
    },
    addpaixu() {
      var data = {};
      data.label = (this.RecordInputListone.length + 1) + "";
      data.value = "123";
      this.RecordInputListone.push(data)
    },
    remove() {
      this.RecordInputListearch.pop();
    },
    removepaixu() {
      this.RecordInputListone.pop();
    },
    shubiaoyiru() {
      this.yidonghezi = true
      console.log('移入了');
    },
    shubiaoyichu() {
      this.yidonghezi = false
      console.log('移出了');
    },
    shubiaoyiruone() {
      this.yidonghezione = true
      console.log('移入了');
    },
    shubiaoyichuone() {
      this.yidonghezione = false
      console.log('移出了');
    },
    xialaone1(val) {
      console.log(val, 'sssssssssssssssssssss');
      if (val == '自定义选项') {
        this.settinging = true
      } else {
        this.settinging = false
      }
    },
    xialatwo2(val) {
      console.log(val, 'sssssssssssssssssssss');
      if (val == '自定义选项') {
        this.settingingtwo = true
      }
    },
    // 按钮上移动作
    moveUp(index) {
      let that = this;
      if (index > 0) {
        let upDate = that.selectedStaffList[index - 1];
        that.selectedStaffList.splice(index - 1, 1);
        that.selectedStaffList.splice(index, 0, upDate);
      } else {
        this.$message.error('已经是第一条，不可上移');
      }
    },

    // 按钮下移
    moveDown(index) {
      let that = this;
      if ((index + 1) === that.selectedStaffList.length) {
        this.$message.error('已经是最后一条，不可下移');
      } else {
        let downDate = that.selectedStaffList[index + 1];
        that.selectedStaffList.splice(index + 1, 1);
        that.selectedStaffList.splice(index, 0, downDate);
      }
    },




    getRowKeys() {

    },
    //将右边表格选择项存入selectedStaffData中
    handleSelectedStaffChange(rows) {
      this.selectedStaffData = [];
      if (rows) {
        rows.forEach((row) => {
          if (row) {
            this.selectedStaffData.push(row);
          }
        });
      }
    },
    //左到右
    Right() {
      console.log('左表格数据', this.$refs.tableLeft.selection);
      if (this.$refs.tableLeft.selection.length === 0) {
        this.$message({
          message: '请选择左边表格数据',
          type: 'warning'
        });
        return;
      } else {
        this.selectedStaffList = this.selectedStaffList.concat(this.$refs.tableLeft.selection);
        // 复制数组对象
        let selectList = JSON.parse(
          JSON.stringify(this.$refs.tableLeft.selection)
        );
        selectList.forEach((item) => {
          let index = this.tableData.findIndex((_item) => _item.id === item.id);
          if (index !== undefined) {
            this.tableData.splice(index, 1);
          }
        });
        this.$refs.tableLeft.clearSelection();
      }
    },
    //右到左
    Left() {
      setTimeout(() => {
        this.$refs["tableLeft"].clearSelection();
        this.$refs["tableRight"].clearSelection();
      }, 0);
      this.selectedStaffData.forEach((item) => {
        this.tableData.push(item);
      });
      //  console.log(22,this.selectedStaffList );
      //  console.log(33,this.selectedStaffData );
      let arr = this.selectedStaffList.filter((v) => this.selectedStaffData.every((val) => val.id != v.id))
      console.log('--111', arr)
      this.selectedStaffList = arr
    },





    setting() {
      this.dialogVisiblesetting = true
      this.top = true
    },
    settingtwo() {
      this.dialogVisiblesetting = true
      this.top = false
    },
    handleRowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    collapse() {
      //collapse为false时展开，为true时折叠。
      this.isCollapse = !this.isCollapse
    },
    collapseone() {
      //collapse为false时展开，为true时折叠。
      this.isCollapseone = !this.isCollapseone
    },
    handleNodeClick(data) {
      console.log(data);
    },

    //表格档案盒分页
    handleSizeChange(val) {
      this.pSize_dah = val;
      console.log(`每页 ${val} 条`);
      if (this.mutisearchflag)
        this.mutisearch()
      else
        this.SearchDAH()
    },
    updateDAHData() {
      if (this.mutisearchflag)
        this.mutisearch()
      else
        this.SearchDAH()
    },
    //表格档案盒分页
    handleCurrentChange(val) {
      this.pIndex_dah = val
      this.putongpIndex_dah = val
      this.kaiguanflage = !this.kaiguanflage
      this.updateDAHData();
    },
    //表格档案分页
    handleSizeChangeone(val) {
      this.pSize_da = val
      console.log(`每页 ${val} 条`);
      if (this.boxinarchfalg) {
        this.getInBoxArch();
      }
      else {
        this.SearchDA()

      }
    },
    //表格档案分页
    handleCurrentChangeone(val) {
      this.pIndex_da = val
      this.putongpIndex_DA = val
      this.kaiguanflageDA = !this.kaiguanflageDA
      console.log(`当前页: ${val}`);
      if (this.boxinarchfalg) {
        this.getInBoxArch();
      }
      else {
        this.SearchDA()

      }
    },
    getDATableName() {//获取档案的表名
      var tempData = {};
      tempData.Table_name = "a01_archdata";
      tempData.MLId = this.Bus_MLId || 1;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAFLMLTableName', tempData).then(//根据MLID获取档案表名称
        success => {
          console.log(success, '根据MLID获取档案表名称-成功');
          if (success.data.code == 200) {
            this.DATableDesignTittle = success.data.data
            this.getDATableList(this.pIndex_dah, this.pSize_dah);
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
            this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
            this.getDAH_SearchX();//获取档案盒-搜索项

          }
        },
        error => {
          console.log(error, '根据MLID获取档案（盒）表名称--返回失败的数据');
        })
    },
    getDATableList(valindex, valsize) {
      var data = {
        Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
        pIndex: valindex,
        pSize: valsize,
        MLIdList: this.Bus_MLId || 1,
        filter_hgl: "",
      };
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas", data).then(
        (res) => {
          console.log(res, '成功获取档案列表数据');
          this.DAtableBodyInfoList = [];
          this.DAcolumnInfoList = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);
            return;
          }
          this.DAtableBodyInfoList = res.data.data.table;
          //数据更新后执行
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
              this.$refs.multipleTableone.doLayout();
            }
          })
          console.log(res.data.data.Count, 'res.data.data.count');
          this.totalcount = res.data.data.Count;
          this.count_DA = res.data.data.Count;
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
    getInBoxArch() {
      this.boxinarchfalg = true;

      console.log(this.multiSelectallboxes, 'multiSelectallboxes');

      if (this.multiSelectallboxes.length > 0) {
        // let code="";
        var data = {
          Table_name: this.DAH_TableDesignTittle,
          pIndex: this.pIndex_da,
          pSize: this.pSize_da,
          Code: this.multiSelectallboxes[0].CODE_HGL,
        };
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetInBoxArch", data).then(
          (res) => {
            console.log(res, '成功获取档案列表数据');
            this.DAtableBodyInfoList = [];
            this.DAcolumnInfoList = [];
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
              return;
            }
            this.DAtableBodyInfoList = res.data.data.table;
            //数据更新后执行
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                this.$refs.multipleTableone.doLayout();
              }
            })
            console.log(res.data.data.Count, 'res.data.data.count');
            this.totalcount = res.data.data.Count;
            this.count_DA = res.data.data.Count;
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
      } else {
        this.$message.error('请选择一条档案')
      }

    },
    getDAHTableList(valindex, valsize) {
      var data = {
        Table_name: this.DAH_TableDesignTittle || "a01_hgldata_1_1",
        pIndex: valindex,
        pSize: valsize,
        MLIdList: this.Bus_MLId || 1,
        filter_hgl: "",
      };
      console.log(data, '请求参数档案盒列表数据');
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas_hgl", data).then(
        (res) => {
          console.log(res, '成功获取档案盒列表数据');
          this.tableBodyInfoList = [];
          this.columnInfoList = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);

            return;
          }
          this.tableBodyInfoList = res.data.data.table;
          console.log(res.data.data.Count, 'res.data.data.count');
          // this.totalcount_dah = res.data.data.Count;
          this.count_DAH = res.data.data.Count;
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
              width: res.data.data.headerwidth[i],
            };
            this.columnInfoList.push(obj);
            this.count_DAH = res.data.data.Count
            //数据更新后执行
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                this.$refs.multipleTable.doLayout();
              }
            })
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
          this.DAoptions = [];
          success.data.data.forEach((item, index) => {
            this.DAoptions.push({
              value: item.xbyname,
              label: item.xbyname,//著录项
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

                label: item.xbyname,//著录项
                type: item.xlx,//类型
                // length: item.MaxLength,//长度
                // need: need,//必填项
                // Hook: item.gjxname,//挂接
                RFIDHook: item.rfidgjx,//RFID挂接项
                // XName: item.XName,//
                // Table_Name: item.Table_Name,//表名
              })
            });
          console.log(this.DAH_options, 'this.DAH_optionsthis.DAH_options');
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


    SearchDA(x) {
      this.boxinarchfalg = 0;
      let tempFilter_item = "";
      console.log(this.DAoptions, 'this.DAoptionsthis.DAoptions');
      this.DAoptions.forEach((item, key) => {
        console.log(item.label,this.DAoptionsvalue,'1111111' );
        if (item.label == this.DAoptionsvalue) {
          tempFilter_item = item.label;
        }
      });


if(x==1){
  var data = {
            Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
            pIndex: this.pIndex_da,
            pSize: this.pSize_da,
            MLIdList: this.Bus_MLId || 1,
            filter_hgl: "",
            "filter_item": tempFilter_item,
            "filter_value": this.DAinputlist
          };
          console.log(data, '查询盒内数据查询盒内数据');
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas1", data).then(//查询 档案 数据
            (res) => {
              console.log(res, '成功获取档案列表数据');
              this.DAtableBodyInfoList = [];
              this.DAcolumnInfoList = [];
              if (res.data.code != 200) {
                this.$message.error(res.data.message);
                return;
              }
              //数据更新后执行
              this.$nextTick(() => {
                // myTable是表格的ref属性值
                if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                  this.$refs.multipleTableone.doLayout();
                }
              })
              this.DAtableBodyInfoList = res.data.data.table;
              console.log(res.data.data.Count, 'res.data.data.count');
              this.totalcount = res.data.data.Count;
              this.count_DA = res.data.data.Count;
              for (let i = 0; i < res.data.data.headernames.length; i++) {
                let obj = {
                  prop: res.data.data.headernames[i],
                  label: res.data.data.headertexts[i],
                  width: res.data.data.headerwidth[i],
                };
                this.DAcolumnInfoList.push(obj);
              }
            },
            (err) => {
              console.log(err);
            }
          );
}else{
      // console.log(tempFilter_item,'tempFilter_itemtempFilter_item');
      if (tempFilter_item == "" && this.DAinputlist == '') {
        this.kaiguanflageDA = !this.kaiguanflageDA
        if (this.kaiguanflageDA) {
          this.pIndex_da = 1
          var data = {
            Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
            pIndex: this.pIndex_da,
            pSize: this.pSize_da,
            MLIdList: this.Bus_MLId || 1,
            filter_hgl: "",
            "filter_item": tempFilter_item,
            "filter_value": this.DAinputlist
          };
          console.log(data, '查询盒内数据查询盒内数据');
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas1", data).then(//查询 档案 数据
            (res) => {
              console.log(res, '成功获取档案列表数据');
              this.DAtableBodyInfoList = [];
              this.DAcolumnInfoList = [];
              if (res.data.code != 200) {
                this.$message.error(res.data.message);
                return;
              }
              //数据更新后执行
              this.$nextTick(() => {
                // myTable是表格的ref属性值
                if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                  this.$refs.multipleTableone.doLayout();
                }
              })
              this.DAtableBodyInfoList = res.data.data.table;
              console.log(res.data.data.Count, 'res.data.data.count');
              this.totalcount = res.data.data.Count;
              this.count_DA = res.data.data.Count;
              for (let i = 0; i < res.data.data.headernames.length; i++) {
                let obj = {
                  prop: res.data.data.headernames[i],
                  label: res.data.data.headertexts[i],
                  width: res.data.data.headerwidth[i],
                };
                this.DAcolumnInfoList.push(obj);
              }
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          var data = {
            Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
            pIndex: this.putongpIndex_DA,
            pSize: this.pSize_da,
            MLIdList: this.Bus_MLId || 1,
            filter_hgl: "",
            "filter_item": tempFilter_item,
            "filter_value": this.DAinputlist
          };
          console.log(data, '查询盒内数据查询盒内数据');
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas1", data).then(//查询 档案 数据
            (res) => {
              console.log(res, '成功获取档案列表数据');
              this.DAtableBodyInfoList = [];
              this.DAcolumnInfoList = [];
              if (res.data.code != 200) {
                this.$message.error(res.data.message);
                return;
              }
              //数据更新后执行
              this.$nextTick(() => {
                // myTable是表格的ref属性值
                if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                  this.$refs.multipleTableone.doLayout();
                }
              })
              this.DAtableBodyInfoList = res.data.data.table;
              console.log(res.data.data.Count, 'res.data.data.count');
              this.totalcount = res.data.data.Count;
              this.count_DA = res.data.data.Count;
              for (let i = 0; i < res.data.data.headernames.length; i++) {
                let obj = {
                  prop: res.data.data.headernames[i],
                  label: res.data.data.headertexts[i],
                  width: res.data.data.headerwidth[i],
                };
                this.DAcolumnInfoList.push(obj);
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
        this.kaiguanflageDA = false
      } else {
        this.kaiguanflageDA = !this.kaiguanflageDA
        if (this.kaiguanflageDA) {
          this.pIndex_da = 1
          var data = {
            Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
            pIndex: 1,
            pSize: this.pSize_da,
            MLIdList: this.Bus_MLId || 1,
            filter_hgl: "",
            "filter_item": tempFilter_item,
            "filter_value": this.DAinputlist
          };
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas1", data).then(//查询 档案 数据
            (res) => {
              console.log(res, '成功获取档案列表数据');
              this.DAtableBodyInfoList = [];
              this.DAcolumnInfoList = [];
              if (res.data.code != 200) {
                this.$message.error(res.data.message);
                return;
              }
              //数据更新后执行
              this.$nextTick(() => {
                // myTable是表格的ref属性值
                if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                  this.$refs.multipleTableone.doLayout();
                }
              })
              this.DAtableBodyInfoList = res.data.data.table;
              console.log(res.data.data.Count, 'res.data.data.count');
              this.totalcount = res.data.data.Count;
              this.count_DA = res.data.data.Count;
              for (let i = 0; i < res.data.data.headernames.length; i++) {
                let obj = {
                  prop: res.data.data.headernames[i],
                  label: res.data.data.headertexts[i],
                  width: res.data.data.headerwidth[i],
                };
                this.DAcolumnInfoList.push(obj);
              }
            },
            (err) => {
              console.log(err);
            }
          )
        } else {
          var data = {
            Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
            pIndex: this.putongpIndex_DA,
            pSize: this.pSize_da,
            MLIdList: this.Bus_MLId || 1,
            filter_hgl: "",
            "filter_item": tempFilter_item,
            "filter_value": this.DAinputlist
          };
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas1", data).then(//查询 档案 数据
            (res) => {
              console.log(res, '成功获取档案列表数据');
              this.DAtableBodyInfoList = [];
              this.DAcolumnInfoList = [];
              if (res.data.code != 200) {
                this.$message.error(res.data.message);
                return;
              }
              //数据更新后执行
              this.$nextTick(() => {
                // myTable是表格的ref属性值
                if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                  this.$refs.multipleTableone.doLayout();
                }
              })
              this.DAtableBodyInfoList = res.data.data.table;
              console.log(res.data.data.Count, 'res.data.data.count');
              this.totalcount = res.data.data.Count;
              this.count_DA = res.data.data.Count;
              for (let i = 0; i < res.data.data.headernames.length; i++) {
                let obj = {
                  prop: res.data.data.headernames[i],
                  label: res.data.data.headertexts[i],
                  width: res.data.data.headerwidth[i],
                };
                this.DAcolumnInfoList.push(obj);
              }
            },
            (err) => {
              console.log(err);
            }
          )
        }
        this.kaiguanflageDA = false
      }
      // 精华代码
}














    },










    // SearchDA() {
    //   this.boxinarchfalg = false;
    //   var tempFilter_item = "";
    //   this.DAoptions.forEach((item, key) => {
    //     console.log(item, 'itemitemitemitem');
    //     console.log(this.DAoptionsvalue, 'this.DAoptionsvalue');
    //     if (key + 1 == this.DAoptionsvalue) {
    //       tempFilter_item = item.label;
    //     }
    //   });
    //   var data = {
    //     Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
    //     pIndex: this.pIndex_da,
    //     pSize: this.pSize_da,
    //     MLIdList: this.Bus_MLId || 1,
    //     filter_hgl: "",
    //     "filter_item": tempFilter_item,
    //     "filter_value": this.DAinputlist
    //   };


    //   console.log(data, '查询盒内数据查询盒内数据');
    //   axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas1", data).then(//查询 档案 数据
    //     (res) => {
    //       console.log(res, '成功获取档案列表数据');
    //       this.DAtableBodyInfoList = [];
    //       this.DAcolumnInfoList = [];
    //       if (res.data.code != 200) {
    //         this.$message.error(res.data.message);
    //         return;
    //       }
    //       //数据更新后执行
    //       this.$nextTick(() => {
    //         // myTable是表格的ref属性值
    //         if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
    //           this.$refs.multipleTableone.doLayout();
    //         }
    //       })
    //       this.DAtableBodyInfoList = res.data.data.table;
    //       console.log(res.data.data.Count, 'res.data.data.count');
    //       this.totalcount = res.data.data.Count;
    //       this.count_DA = res.data.data.Count;
    //       for (let i = 0; i < res.data.data.headernames.length; i++) {
    //         let obj = {
    //           prop: res.data.data.headernames[i],
    //           label: res.data.data.headertexts[i],
    //           // width: res.data.data.headerwidth[i],
    //         };
    //         this.DAcolumnInfoList.push(obj);
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // },
    // SearchDAH() {
    //   this.mutisearchflag = false;
    //   // if (this.DAH_optionsvalue == '') {
    //   //   this.$message.error("请选择搜索项");
    //   //   return;
    //   // }


    //  if(this.DAH_optionsvalue==''&&this.inputlist=='') {
    //   var tempFilter_item = "";
    //   this.DAH_options.forEach((item, key) => {
    //     if (key + 1 == this.DAH_optionsvalue) {
    //       tempFilter_item = item.label;
    //     }
    //   });
    //   var data = {
    //     "Table_name": this.DAH_TableDesignTittle,
    //     "MLIdList": this.Bus_MLId,
    //     pIndex: this.pIndex_dah,
    //     pSize: this.pSize_dah,
    //     "filter_item": tempFilter_item,
    //     "filter_value": this.inputlist
    //   };
    //   console.log(data, '查询盒内数据查询盒内数据');
    //   axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas_hgl1", data).then(//查询盒内数据
    //     (res) => {
    //       console.log(res, '成功获取档案盒列表数据');
    //       this.tableBodyInfoList = [];
    //       this.columnInfoList = [];
    //       if (res.data.code != 200) {
    //         this.$message.error(res.data.message);

    //         return;
    //       }
    //       //数据更新后执行
    //       this.$nextTick(() => {
    //         // myTable是表格的ref属性值
    //         if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
    //           this.$refs.multipleTable.doLayout();
    //         }
    //       })
    //       this.tableBodyInfoList = res.data.data.table;
    //       console.log(res.data.data.Count, 'res.data.data.count');
    //       this.totalcount_dah = res.data.data.Count;
    //       this.count_DAH = res.data.data.Count;
    //       for (let i = 0; i < res.data.data.headernames.length; i++) {
    //         let obj = {
    //           prop: res.data.data.headernames[i],
    //           label: res.data.data.headertexts[i],
    //           // width: res.data.data.headerwidth[i],
    //         };
    //         this.columnInfoList.push(obj);
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    //  }else{
    //   var tempFilter_item = "";
    //   this.DAH_options.forEach((item, key) => {
    //     if (key + 1 == this.DAH_optionsvalue) {
    //       tempFilter_item = item.label;
    //     }
    //   });
    //   var data = {
    //     "Table_name": this.DAH_TableDesignTittle,
    //     "MLIdList": this.Bus_MLId,
    //     pIndex: this.pIndex_dah,
    //     pSize: this.pSize_dah,
    //     "filter_item": tempFilter_item,
    //     "filter_value": this.inputlist
    //   };
    //   console.log(data, '查询盒内数据查询盒内数据');
    //   axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas_hgl1", data).then(//查询盒内数据
    //     (res) => {
    //       console.log(res, '成功获取档案盒列表数据');
    //       this.tableBodyInfoList = [];
    //       this.columnInfoList = [];
    //       if (res.data.code != 200) {
    //         this.$message.error(res.data.message);

    //         return;
    //       }
    //       //数据更新后执行
    //       this.$nextTick(() => {
    //         // myTable是表格的ref属性值
    //         if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
    //           this.$refs.multipleTable.doLayout();
    //         }
    //       })
    //       this.tableBodyInfoList = res.data.data.table;
    //       console.log(res.data.data.Count, 'res.data.data.count');
    //       this.totalcount_dah = res.data.data.Count;
    //       this.count_DAH = res.data.data.Count;
    //       for (let i = 0; i < res.data.data.headernames.length; i++) {
    //         let obj = {
    //           prop: res.data.data.headernames[i],
    //           label: res.data.data.headertexts[i],
    //           // width: res.data.data.headerwidth[i],
    //         };
    //         this.columnInfoList.push(obj);
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    //  }


    

    // },

    SearchDAH(x) {
      //1代表上下架等操作  
      var tempFilter_item = "";
      this.DAH_options.forEach((item, key) => {
        if (key + 1 == this.DAH_optionsvalue) {
          tempFilter_item = item.label;
        }
      });
      if (x == 1) {
        console.log(this.putongpIndex_dah, 'this.putongpIndex_dahthis.putongpIndex_dah');
        console.log('进来了1');
        var data = {
          "Table_name": this.DAH_TableDesignTittle,
          "MLIdList": this.Bus_MLId,
          pIndex: this.pIndex_dah,
          // pIndex: this.putongpIndex_dah||1,
          pSize: this.pSize_dah,
          "filter_item": tempFilter_item,
          "filter_value": this.inputlist
        };
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas_hgl1", data).then(//查询盒内数据
          (res) => {
            console.log(res, '成功获取档案盒列表数据');
            this.tableBodyInfoList = [];
            this.columnInfoList = [];


            if (res.data.code != 200) {
              this.$message.error(res.data.message);

              return;
            }

            this.tableBodyInfoList = res.data.data.table;
            console.log(res.data.data.Count, 'res.data.data.count');
            // this.totalcount_dah = res.data.data.Count;
            this.count_DAH = res.data.data.Count;

            for (let i = 0; i < res.data.data.headernames.length; i++) {
              let obj = {
                prop: res.data.data.headernames[i],
                label: res.data.data.headertexts[i],
                width: res.data.data.headerwidth[i],
              };
              this.columnInfoList.push(obj);
            }
            //数据更新后执行
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                this.$refs.multipleTable.doLayout();
              }
            })


          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.mutisearchflag = 0;
        console.log(tempFilter_item, 'tempFilter_itemtempFilter_item');
        //不带搜索项的普通搜索
        if (tempFilter_item == '' && this.inputlist == '') {
          this.kaiguanflage = !this.kaiguanflage
          if (this.kaiguanflage) {
            this.pIndex_dah = 1
            var data = {
              "Table_name": this.DAH_TableDesignTittle,
              "MLIdList": this.Bus_MLId,
              pIndex: this.pIndex_dah,
              // pIndex: this.putongpIndex_dah||1,
              pSize: this.pSize_dah,
              "filter_item": tempFilter_item,
              "filter_value": this.inputlist
            };
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas_hgl1", data).then(//查询盒内数据
              (res) => {
                console.log(res, '成功获取档案盒列表数据');
                this.tableBodyInfoList = [];
                this.columnInfoList = [];

                console.log(this.pIndex_dah, ' this.pIndex_dah this.pIndex_dah this.pIndex_dah');
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);

                  return;
                }

                this.tableBodyInfoList = res.data.data.table;
                console.log(res.data.data.Count, 'res.data.data.count');
                this.totalcount_dah = res.data.data.Count;
                this.count_DAH = res.data.data.Count;

                for (let i = 0; i < res.data.data.headernames.length; i++) {
                  let obj = {
                    prop: res.data.data.headernames[i],
                    label: res.data.data.headertexts[i],
                    width: res.data.data.headerwidth[i],
                  };
                  this.columnInfoList.push(obj);
                }
                //  this.putongpIndex_dah = 1
                //数据更新后执行
                this.$nextTick(() => {
                  // myTable是表格的ref属性值
                  if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                    this.$refs.multipleTable.doLayout();
                  }
                })

              },
              (err) => {
                console.log(err);
              }
            )
          } else {
            var data = {
              "Table_name": this.DAH_TableDesignTittle,
              "MLIdList": this.Bus_MLId,
              pIndex: this.putongpIndex_dah || 1,
              // pIndex: this.putongpIndex_dah||1,
              pSize: this.pSize_dah,
              "filter_item": tempFilter_item,
              "filter_value": this.inputlist
            };
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas_hgl1", data).then(//查询盒内数据
              (res) => {
                console.log(res, '成功获取档案盒列表数据');
                this.tableBodyInfoList = [];
                this.columnInfoList = [];

                console.log(this.pIndex_dah, ' this.pIndex_dah this.pIndex_dah this.pIndex_dah');
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);

                  return;
                }

                this.tableBodyInfoList = res.data.data.table;
                console.log(res.data.data.Count, 'res.data.data.count');
                // this.totalcount_dah = res.data.data.Count;
                this.count_DAH = res.data.data.Count;

                for (let i = 0; i < res.data.data.headernames.length; i++) {
                  let obj = {
                    prop: res.data.data.headernames[i],
                    label: res.data.data.headertexts[i],
                    width: res.data.data.headerwidth[i],
                  };
                  this.columnInfoList.push(obj);
                }
                //  this.putongpIndex_dah = 1
                //数据更新后执行
                this.$nextTick(() => {
                  // myTable是表格的ref属性值
                  if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                    this.$refs.multipleTable.doLayout();
                  }
                })

              },
              (err) => {
                console.log(err);
              }
            )
          }
          this.kaiguanflage = false
        }
        else {
          //带有搜索项的普通搜索
          //kaiguanflage开关为带有搜索项的普通搜索时置为true
          console.log(this.kaiguanflage, 'this.kaonethis.kaonethis.kaonethis.kaone')
          this.kaiguanflage = !this.kaiguanflage
          console.log(this.kaiguanflage, 'this.kaiguanflagethis.kaiguanflage')
          if (this.kaiguanflage) {
            console.log(this.putongpIndex_dah, 'this.putongpIndex_dahthis.putongpIndex_dah')
            this.pIndex_dah = 1

            var data = {
              "Table_name": this.DAH_TableDesignTittle,
              "MLIdList": this.Bus_MLId,
              pIndex: 1,
              // pIndex: this.putongpIndex_dah||1,
              pSize: this.pSize_dah,
              "filter_item": tempFilter_item,
              "filter_value": this.inputlist
            }


            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas_hgl1", data).then(//查询盒内数据
              (res) => {
                console.log(res, '成功获取档案盒列表数据');
                this.tableBodyInfoList = [];
                this.columnInfoList = [];
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                  return;
                }

                this.tableBodyInfoList = res.data.data.table;
                console.log(res.data.data.Count, 'res.data.data.count');
                // this.totalcount_dah = res.data.data.Count;
                this.count_DAH = res.data.data.Count;

                for (let i = 0; i < res.data.data.headernames.length; i++) {
                  let obj = {
                    prop: res.data.data.headernames[i],
                    label: res.data.data.headertexts[i],
                    width: res.data.data.headerwidth[i],
                  };
                  this.columnInfoList.push(obj);
                }
                //  this.putongpIndex_dah = 1
                //数据更新后执行
                this.$nextTick(() => {
                  // myTable是表格的ref属性值
                  if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                    this.$refs.multipleTable.doLayout();
                  }
                })

              },
              (err) => {
                console.log(err);
              }
            );
          }

          else {
            console.log(this.putongpIndex_dah, '1111222222222222222222222222222222222222222222222222222')
            var data = {
              "Table_name": this.DAH_TableDesignTittle,
              "MLIdList": this.Bus_MLId,
              pIndex: this.putongpIndex_dah,
              // pIndex: this.putongpIndex_dah||1,
              pSize: this.pSize_dah,
              "filter_item": tempFilter_item,
              "filter_value": this.inputlist
            }


            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDARecycleDatas_hgl1", data).then(//查询盒内数据
              (res) => {
                console.log(res, '成功获取档案盒列表数据');
                this.tableBodyInfoList = [];
                this.columnInfoList = [];
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                  return;
                }

                this.tableBodyInfoList = res.data.data.table;
                console.log(res.data.data.Count, 'res.data.data.count');
                // this.totalcount_dah = res.data.data.Count;
                this.count_DAH = res.data.data.Count;

                for (let i = 0; i < res.data.data.headernames.length; i++) {
                  let obj = {
                    prop: res.data.data.headernames[i],
                    label: res.data.data.headertexts[i],
                    // width: res.data.data.headerwidth[i],
                  };
                  this.columnInfoList.push(obj);
                }
                //  this.putongpIndex_dah = 1
                //数据更新后执行
                this.$nextTick(() => {
                  // myTable是表格的ref属性值
                  if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                    this.$refs.multipleTable.doLayout();
                  }
                })

              },
              (err) => {
                console.log(err);
              }
            );
          }
          this.kaiguanflage = false










        }
      }

    },





    //档案盒信息全屏
    bigping() {

      if (this.indehao == 0) {
        this.dapingshow = false
        this.newclass = true
        this.indehao = 1
      }
      else {
        this.indehao = 0
        this.dapingshow = true
        this.newclass = false
      }
    },
    bigpingone() {

      if (this.indehaoone == 0) {
        this.dapingshowone = false
        this.newclassone = true
        this.indehaoone = 1
      }
      else {
        this.indehaoone = 0
        this.dapingshowone = true
        this.newclassone = false
      }
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
    //导出档案在借历史
    DA_zaijiedaochu() {
      let table = document.querySelector('#ZJDAdaochu').cloneNode(true);
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      // table.removeChild(table.querySelector(".el-table__fixed-right"));
      // table.removeChild(table.querySelector(".el-table__fixed"));
      let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          '在借档案表格数据' + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //导出档案盒在借历史
    DHA_zaijiedaochu() {
      let table = document.querySelector('#ZJDAHdaochu').cloneNode(true);
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      // table.removeChild(table.querySelector(".el-table__fixed-right"));
      // table.removeChild(table.querySelector(".el-table__fixed"));
      let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          '在借档案盒表格数据' + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //导出档案盒借阅历史
    DHA_jieyuedaochu() {
      let table = document.querySelector('#JYDAHdaochu').cloneNode(true);
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      // table.removeChild(table.querySelector(".el-table__fixed-right"));
      // table.removeChild(table.querySelector(".el-table__fixed"));
      let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          '借阅历史档案盒表格数据' + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //导出档案借阅历史
    DH_jieyuedaochu() {
      let table = document.querySelector('#JYDAdaochu').cloneNode(true);
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      // table.removeChild(table.querySelector(".el-table__fixed-right"));
      // table.removeChild(table.querySelector(".el-table__fixed"));
      let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          '借阅历史档案表格数据' + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //导出当前
    Exceloutput() {
      let table = document.querySelector('#table-listone').cloneNode(true);
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      table.removeChild(table.querySelector(".el-table__fixed-right"));
      // table.removeChild(table.querySelector(".el-table__fixed"));
      let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          '档案盒表格数据' + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    //导出档案
    ExceloutputDA() {

      let table = document.querySelector('#table-listoneDA').cloneNode(true);
      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      table.removeChild(table.querySelector(".el-table__fixed-right"));
      // table.removeChild(table.querySelector(".el-table__fixed"));
      let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          '档案表格数据' + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    ExcelImport() {
      console.log('Excel普通导入');
      this.archivalinformationImport = true;
      this.getUpLoadList();
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
    handleClickimport(index) {//Excel普通导入
      console.log(JSON.stringify(index))
      this.upload_filename = index.filename
      this.upload_mlname = index.mlname
      this.upload_tablename = index.tablename
      this.uploadfile_Visible = true;
    },
    uploadFile(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('filename', this.upload_filename)
      formData.append('mlname', this.upload_mlname)
      formData.append('tablename', this.upload_tablename)
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/upload', formData)
        .then(response => {
          console.log(response.data)
          this.getUpLoadList();
          this.$message.success(response.data);
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    downloadFile(index) {
      let fileName = index.filepath  // 要下载的文件名
      console.log(fileName, "fileName")
      //window.open('http://' + this.ServeIp + ':' + this.ServePort + '/download?fileName=' + fileName)
      let jsondata = {}
      axios.get('http://' + this.ServeIp + ':' + this.ServePort + '/download?fileName=' + fileName, jsondata, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error(error);
        });
    },
    inportcheck(index) {
      let jsondata = {
        filepath: index.filepath,
        filename: index.filename,
        tablename: index.tablename,
      }
      console.log(JSON.stringify(jsondata), "jsondata")
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/inportcheck', jsondata)
        .then(response => {
          console.log(response.data)
          if (response.data.code != 200) {
            this.$message.error(response.data.message);
            return;
          }
          this.inportchecking_Visible = true;
          let loop = setInterval(() => {
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/inportchecking', jsondata)
              .then(response => {
                console.log(response.data)
                if (response.data.code != 200) {
                  this.$message.error(response.data.message);
                  clearInterval(loop);
                  this.inportchecking_Visible = false;
                  return;
                }
                this.inportchecking_Visible = true;
                console.log(response.data.data.msg)
                console.log(response.data.data.isruning)
                console.log(response.data.data.currentcnt)
                console.log(response.data.data.totalcnt)
                console.log(response.data.data.checkingmsg)
                if (response.data.data.totalcnt == 0)
                  this.inportdataingrate = 0;
                else
                  this.inportdataingrate = (response.data.data.currentcnt * 100 / response.data.data.totalcnt).toFixed(2);
                this.inportdataingmsg = response.data.data.msg
                this.inportdataingcurrent = response.data.data.currentcnt
                this.inportdataingtotalcnt = response.data.data.totalcnt
                this.inportdataingcheckingmsg = response.data.data.checkingmsg
                if (!response.data.data.isruning) {
                  setTimeout(() => {
                    clearInterval(loop);
                  }, 2000);
                }
              })
              .catch(error => {
                clearInterval(loop);
                this.inportdataing_Visible = false;
                console.log(error.response.data)
              })
          }, 1000);
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    inportdata(index) {
      let jsondata = {
        filepath: index.filepath,
        filename: index.filename,
        tablename: index.tablename,
      }
      console.log(JSON.stringify(jsondata), "jsondata")
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/inportdata', jsondata)
        .then(response => {
          console.log(response.data)
          if (response.data.code != 200) {
            this.$message.error(response.data.message);
            return;
          }
          this.inportdataing_Visible = true;
          let loop = setInterval(() => {
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/inportdataing', jsondata)
              .then(response => {
                console.log(response.data)
                if (response.data.code != 200) {
                  this.$message.error(response.data.message);
                  clearInterval(loop);
                  this.inportdataing_Visible = false;
                  return;
                }
                this.inportdataing_Visible = true;
                console.log(response.data.data.msg)
                console.log(response.data.data.isruning)
                console.log(response.data.data.currentcnt)
                console.log(response.data.data.totalcnt)
                if (response.data.data.totalcnt == 0)
                  this.inportdataingrate = 0;
                else
                  this.inportdataingrate = (response.data.data.currentcnt * 100 / response.data.data.totalcnt).toFixed(2);
                this.inportdataingmsg = response.data.data.msg
                this.inportdataingcurrent = response.data.data.currentcnt
                this.inportdataingtotalcnt = response.data.data.totalcnt
                if (!response.data.data.isruning) {
                  clearInterval(loop);
                  this.inportdataing_Visible = false;
                }
              })
              .catch(error => {
                clearInterval(loop);
                this.inportdataing_Visible = false;
                console.log(error.response.data)
              })
          }, 1000);
        })
        .catch(error => {
          console.log(error.response.data)
        })
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
        this.jieyuelishitable_name = val[0].tablename
        this.jieyueliCODE = val[0].code
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
              label: item.xbyname,//著录项
              type: item.xlx,//类型
              // length: item.MaxLength,//长度
              // need: need,//必填项
              // Hook: item.gjxname,//挂接
              RFIDHook: item.rfidgjx,//RFID挂接项
              XName: item.xname,//
              Table_Name: item.table_name,//表名
            })
            // console.log(this.DA_RecordInputList,'this.DA_RecordInputListthis.DA_RecordInputListthis.DA_RecordInputList');
          });

        },
        error => {
          console.log(error, '获取著录项（档案）著录项列表数据--返回失败的数据');
        })
    },
    RecordForEdit() {
      var data = {};
      data.Table_name = this.DATableDesignTittle;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData', data).then(
        success => {
          console.log(success, '获取著录项（档案）著录项列表数据-成功');
          this.DA_RecordInputList = [];
          success.data.data.forEach((item, index) => {
            this.DA_RecordInputList.push({
              value: '',
              label: item.xbyname,//著录项
              type: item.xlx,//类型
              // length: item.MaxLength,//长度
              // need: need,//必填项
              // Hook: item.gjxname,//挂接
              RFIDHook: item.rfidgjx,//RFID挂接项
              XName: item.xname,//
              Table_Name: item.table_name,//表名
            })
            // console.log(this.DA_RecordInputList,'this.DA_RecordInputListthis.DA_RecordInputListthis.DA_RecordInputList');
          });

        },
        error => {
          console.log(error, '获取著录项（档案）著录项列表数据--返回失败的数据');
        })
    },

    DAH_RecordForEdit() {
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
              label: item.xbyname,//著录项
              type: item.xlx,//类型
              // length: item.MaxLength,//长度
              // need: need,//必填项
              // Hook: item.gjxname,//挂接
              RFIDHook: item.rfidgjx,//RFID挂接项
              XName: item.xname,//
              Table_Name: item.table_name,//表名
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
          this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
          this.archivalinformation = false;
        },
        error => {
          console.log(error, '添加一条新档案（盒）信息--返回失败的数据');
        })
    },
    applyDA() {
      console.log(this.DA_RecordInputList, '添加档案应用的点击');
      var tempSetData = '';
      var tempTable_Name = '';
      this.DA_RecordInputList.forEach(item => {
        console.log(item, 'item');
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
          this.getDATableList(this.pIndex_da, this.pSize_da);
          this.archivalinformation = false;
        },
        error => {
          console.log(error, '添加一条新档案（盒）信息--返回失败的数据');
        })
    },
    DAH_Record() {//点击清空档案盒
      if (this.Bus_MLId == '') {
        this.$message.warning("请选择分类")
        return;
      }
      if (this.multiSelectallboxes.length < 1) {
        this.$message.warning("请选择要清空的档案盒")
        return;
      }

      this.multiSelectallboxes.forEach((item, index) => {
        const handleDeleteList = {};
        handleDeleteList.Code = item.CODE_HGL;
        handleDeleteList.Table_name = this.DAH_TableDesignTittle;
        console.log(handleDeleteList, '传递的数据');

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelArchData', handleDeleteList).then(//删除档案信息 (档案盒)
          success => {
            console.log(index, this.multiSelectallboxes.length, 'ssssssssssssssssssssssssssssssssssssssssssssssssssss');
            if (index == 0)
              this.$message.success(success.data.message);
            this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
          },
          error => {
            console.log(error, '删除档案信息（档案盒）--返回失败的数据');
          })


      })







    },
    DA_Record() {//点击清空档案
      if (this.Bus_MLId == '') {
        this.$message.warning("请选择分类")
        return;
      }
      if (this.multiSelectallboxesList.length < 1) {
        this.$message.warning("请选择要清空的档案")
        return;
      }

      this.multiSelectallboxesList.forEach((item, index) => {
        var handleDeleteListoneone = {};

        handleDeleteListoneone.Code = item.CODE;
        handleDeleteListoneone.Table_name = this.DATableDesignTittle;

        console.log(handleDeleteListoneone, '传递的数据');
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DelArchData', handleDeleteListoneone).then(//删除档案信息 (档案)
          success => {
            if (index == 0)
              this.$message.success(success.data.message);
            this.getDATableList(this.pIndex_da, this.pSize_da);

          },
          error => {
            console.log(error, '删除档案信息（档案）--返回失败的数据');
          })
      })


      console.log('清空档案');
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
      // this.linshiTablename = val[0].tablename
      // this.linshiCODE = val[0].code
      // this.inputcfwz = val[0].address
      // console.log(this.linshiCODE, this.linshiTablename, this.inputcfwz);
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
      console.log(this.arrlist, 'this.arrlistthis.arrlist');
      if (this.arrlist.length < 1) {
        this.$message.error("请选择要确认通道门记录")
        return;
      }


      this.arrlist.forEach((item, index) => {
        var arr = {
          "ArchCode": item.ArchCode
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/ConfirmDoorData', arr).then(res => {
          this.$message.success('确认成功')

        }).catch(error => {
          console.log(error);
        })
      })

    },


    // deletest() { //删除通道门记录
    //   console.log(this.arrlist, 'this.arrlistthis.arrlist');
    //   if (this.arrlist.length<1) {
    //     this.$message.error("请选择要删除的通道门记录")
    //     return;
    //   }
    //   var arr = {
    //     "ArchCode": this.arrlist
    //   }
    //   axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DeleteDoorData', arr).then(res => {
    //     this.$message.success('删除成功')
    //     this.filepopupwindowRFID = false;

    //   }).catch(error => {
    //     console.log(error);
    //   }
    //   )


    //   if (this.deletelist.length > 0) {//批量删除通道门记录
    //     this.deletelist.forEach((item, index) => {
    //       var arr = {
    //         "ArchCode": item.archcode
    //       }
    //       if (this.deletelist.length < 1) {
    //         this.$message.success('操作成功')
    //       }
    //       axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/DeleteDoorData', arr).then(res => {


    //       }
    //       ).catch(error => {
    //         console.log(error);
    //       }
    //       )
    //     })
    //   }




    // },



    //
    // 档案恢复
    DAhuifu(index, row) {
      const handleDeleteList = {};
      handleDeleteList.Code = row.CODE;
      handleDeleteList.Table_name = this.DATableDesignTittle;
      console.log(handleDeleteList, '传递的数据');
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/backRecycleArchData', handleDeleteList).then(//删除档案信息 (档案)
        success => {
          console.log(success, '恢复档案信息（档案）-成功');
          this.$message.success(success.data.data);
          this.SearchDA(1)
        },
        error => {
          console.log(error, '删除档案信息（档案）--返回失败的数据');
        })
    },
    //档案盒恢复
    DAHhuifu(index, row) {
      var handleDeleteListone = {};
      handleDeleteListone.Code = row.CODE_HGL;
      handleDeleteListone.Table_name = this.DAH_TableDesignTittle;
      console.log(handleDeleteListone, '传递的数据');

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/backRecycleArchData', handleDeleteListone).then(//删除档案信息 (档案盒)
        success => {
          console.log(success, '恢复档案信息（档案盒）-成功');
          this.$message.success(success.data.data);
          this.SearchDAH(1)
          this.lajicount()
        },
        error => {
          console.log(error, '恢复档案信息（档案盒）--返回失败的数据');
        })



















      // this.DAH_RecordForEdit();
      // this.archivalinformationhgl = true
      // var arr = [];
      // for (let i in row) {
      //   let o = {};
      //   o[i] = row[i];
      //   arr.push(o)

      //   console.log(i, "i")
      //   if (i == 'CODE_HGL') [i];
      // }
      // console.log(index, arr, 'index,rowindex,row')
      // this.Putdownloan.Boxbarcode = row.CODE_HGL;
      // console.log(this.Putdownloan.Boxbarcode, 'this.Putdownloan.Boxbarcode')
      // setTimeout(() => {
      //   console.log(this.RecordInputList, 'this.RecordInputList11111')
      //   this.RecordInputList.forEach((item, index) => {
      //     arr.forEach((itemmmm, indexxxx) => {
      //       for (const key in itemmmm) {
      //         if (item.XName == key) {
      //           item.value = itemmmm[key]
      //         }
      //       }

      //     })
      //   })
      //   console.log(this.RecordInputList, 'this.RecordInputList222222')

      // }, 1000)


      // alert("档案盒修改");
    },

    //档案盒修改应用按钮
    editDAH() {
      console.log(this.RecordInputList, '编辑档案盒应用的点击');
      var tempSetData = '';
      var tempTable_Name = '';
      this.RecordInputList.forEach(item => {
        // console.log(item, 'item');
        tempSetData = tempSetData + item.XName + "='" + item.value + "',";
        tempTable_Name = item.Table_Name;
      });
      tempSetData = tempSetData.substring(0, tempSetData.length - 1);
      var data = {
        "Table_name": tempTable_Name,
        "CODE": this.Putdownloan.Boxbarcode,
        "SetData": tempSetData,
      };
      console.log(data, '...............');

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchData', data).then(//添加一条新档案（盒）信息
        success => {
          console.log(success, '编辑档案盒档案（盒）信息-成功');
          this.$message.success(success.data.data);
          this.getDAHTableList(this.pIndex_da, this.pSize_da);
          this.archivalinformation = false;
        },
        error => {
          console.log(error, '编辑档案盒档案（盒）信息--返回失败的数据');
        })
    },
    //档案修改应用按钮
    editdangan() {
      console.log(this.DA_RecordInputList, '编辑档案应用的点击');
      var tempSetData = '';
      var tempTable_Name = '';
      this.DA_RecordInputList.forEach(item => {
        // console.log(item, 'item');
        // tempSetData = tempSetData + item.Prop + "='" + item.value + "',";
        tempSetData = tempSetData + item.XName + "='" + item.value + "',";
        // tempTable_Name = item.Table_Name;
      });
      tempSetData = tempSetData.substring(0, tempSetData.length - 1);
      var data = {
        "Table_name": this.DATableDesignTittle,
        "CODE": this.Putdownloan.archBoxbarcode,
        "SetData": tempSetData,
      };
      console.log(data, '...............');

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchData', data).then(//添加一条新档案（盒）信息
        success => {
          console.log(success, '编辑档案档案信息-成功');
          this.$message.success(success.data.message);
          this.getDATableList(this.pIndex_da, this.pSize_da);
          this.archivalinformation = false;
        },
        error => {
          console.log(error, '编辑档案档案信息--返回失败的数据');
        })

    },
    //档案盒rfid写入
    handlesaomiao() {
      // this.DAHlist[0]


      if (localStorage.getItem('arrip') != undefined && localStorage.getItem('arrprot') != undefined && localStorage.getItem('arrip').length > 0 && localStorage.getItem('arrprot').length > 0) {
        var arrip = localStorage.getItem('arrip')
        var arrport = localStorage.getItem('arrprot')
        var url = arrip + ':' + arrport

        // console.log(this.DAHlist.length, '数据111111111111111');
        if (this.DAHlist.length >= 2) {
          this.$message.error('只能选择一本档案进行写入')
          return
        }
        if (this.DAHlist.length == 0) {
          this.$message.error('请选择一本档案进行写入')
          return
        }
        var rfid = "BBBBBBBB" + this.DAHlist[0].CODE_HGL
        console.log(this.DAH_TableDesignTittle, 'DAH_TableDesignTittleDAH_TableDesignTittle');
        console.log(url, 'urlurlurlurlurlurlurl');

        var arrone = {
          'cmd': '2',   //2代表写  1代表读 0代表测试蜂鸣器
          'rfid': rfid,
          'tcpclient': url
        }
        var testcnt = 0;
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/initreader', arrone).then(//写入rfid
          success => {
            setTimeout(() => {
              var arrtwo = {
                'tcpclient': '10.10.10.79:8160'
              }
              // axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/getdata', arrtwo).then( //获取写入状态
              //   success => {
              //     setTimeout(()=>{
              var arr =
              {
                'cmd': '1',
                "tcpclient": url
              }
              axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/initreader', arr).then( //初始化
                success => {
                  var loop = setInterval(() => {
                    var arr =
                    {
                      'tcpclient': url
                    }

                    axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/getdata', arr).then(  //读值rfid
                      success => {
                        if (success.data.code != 200) {
                          this.$message.error(success.data.message);
                          clearInterval(loop);
                          return;
                        }
                        else if (success.data.data.isruning) {
                          this.$message.success(success.data.data.msg);
                          if (testcnt++ > 10) {
                            this.$message.error("通讯超时");
                            clearInterval(loop);
                            return;
                          }
                        }
                        else {
                          clearInterval(loop);
                          if (success.data.data.rfid == rfid) {
                            var list = {
                              "Table_name": this.DAH_TableDesignTittle,
                              "CODE": this.DAHlist[0].CODE_HGL,
                              'rfid': rfid
                            }
                            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchRfidData', list).then(
                              success => {
                                //  console.log('更新成功了');
                                this.$message.success('标签写入成功')
                                this.updateDAHData();
                              }
                            ).catch(
                              error => {
                                console.log(error, 'error');
                              }
                            )
                          } else {
                            this.$message.error('标签写入成功后对比失败' + rfid + success.data.data.rfid)
                          }
                        }
                        //  success.data.data.rfid== rfid
                      },
                      error => {
                        this.$message.error(error);
                      })
                  }, 1000)
                }).catch(
                  error => {
                    this.$message.error(error);
                  })
            }, 2000)
          },
          error => {
            this.$message.error(error);
          })
      } else {
        this.$message.error('请配置ip和端口')
      }


    },
    //查看盒内文件
    showboxWJ() {

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
          this.lajicount()
          this.SearchDAH(1)
        },
        error => {
          console.log(error, '删除档案信息（档案盒）--返回失败的数据');
        })
    },

    //档案盒快速归还
    kuaisuguihuan() {

    },
    //档案盒快速借阅
    kuaisujieyue() {

    },
    lajicount(){
          console.log('走来了');
     const arr={}
     axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDARecycleCount', arr).then(//根据摄像头id获取摄像头信息
       success => {
        //  console.log(success, '垃圾总数量-成功');
         this.newvaluelaji=success.data.data
         localStorage.setItem('newvaluelaji',this.newvaluelaji)
       },
       error => {
        //  console.log(error, '垃圾总数量-返回失败的数据');
       })


   },
    //档案盒 盒借阅
    fileboxforloanClick() {


      if (this.multiSelectallboxes.length < 1) {
        this.$message.error('请选择要借阅的档案盒')
        return
      }
      if (this.multiSelectallboxes.length > 1) {
        this.$message.error('只能选择一条借阅的档案盒')
        return
      }

      this.DAarchive = '档案盒借阅'
      this.fileboxforloan = true;
      this.CODE_HGL = this.multiSelectallboxes[0].CODE_HGL;
      this.DAH_ID = this.multiSelectallboxes[0].id;
      this.filelendingTble = [];
      this.filelendingTble.push({
        index: this.multiSelectallboxes[0].no,
        name: this.multiSelectallboxes[0].user,
        number: this.multiSelectallboxes[0].FileCount,
        barCode: this.multiSelectallboxes[0].CODE_HGL,
        address: this.multiSelectallboxes[0].ads,
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

    DA_fileboxforloanClick() {
      console.log(this.multiSelectallboxesList, 'this.multiSelectallboxesListthis.multiSelectallboxesList');
      if (this.multiSelectallboxesList.length < 1) {
        this.$message.error('请选择要借阅的档案')
        return
      }
      if (this.multiSelectallboxesList.length > 1) {
        this.$message.error('只能选择一条借阅的档案')
        return
      }


      this.fileboxforloan = true
      this.DAarchive = '档案借阅'
      this.CODE = this.multiSelectallboxesList[0].CODE;
      this.DA_ID = this.multiSelectallboxesList[0].id;
      this.filelendingTble = [];
      this.filelendingTble.push({
        index: this.multiSelectallboxesList[0].no,
        name: this.multiSelectallboxesList[0].user,
        number: this.multiSelectallboxesList[0].C00004,
        barCode: this.multiSelectallboxesList[0].CODE,
        address: this.multiSelectallboxesList[0].status,
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
            this.getDATableList(this.pIndex_da, this.pSize_da);
            this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
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
              this.getDATableList(this.pIndex_da, this.pSize_da);
              this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
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
              this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
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



    OnShelf() {//档案盒 上架
      // console.log(row, '要上架的档案数据');
      // this.DAHlist
      this.OnShelfdialogFormVisible = true;
      // this.ONShelf_CODE_HGL = row.CODE_HGL;
      // this.ONShelf_status = row.status;
    },
    DownShelf() {//档案盒 下架

      this.DAHlist.forEach((item, index) => {

        // console.log(row, '要下架的档案数据');
        // this.ONShelf_CODE_HGL = row.CODE_HGL;
        // this.ONShelf_status = row.status;
        // if (item.ads == '0区0列右侧0节0层0格') {
        //   this.$message.error("档案盒未上架，不能进行下架操作哦~")
        //   return;
        // }

        // this.$confirm('是否下架' + ', 是否继续?', '下架', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        var data = {
          "Table_name": this.DAH_TableDesignTittle,
          "Code": item.CODE_HGL,
          "BoxCode": "",
          "StoreId": 0,
          "QuNo": 0,
          "ColNo": 0,
          "LeNo": 0,//节
          "DivNo": 0,
          "ZyNo": 0,
          "SxNo": 0,//顺序
          "status": 0
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchData123 ', data).then(//下架（档案盒）
          success => {
            console.log(success, '下架（档案盒）-成功');
            if (success.data.code == 200) {
              console.log(index, 'ssssssss');
              if (index == 0) {
                this.$message.success("下架成功");
                this.updateDAHData();
              }


            }
          },
          error => {
            console.log(error, '上架/下架（档案盒）--返回失败的数据');
          })
      })
      // .catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消下架'
      //   });
      // });
      //   })


    },
    OnShelfSumbit() {
      this.DAHlist.forEach((item, index) => {
        var tempStatus = '';
        if (item.status == "存档") {
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
          "Code": item.CODE_HGL,
          "BoxCode": "",
          "StoreId": 18,
          "QuNo": this.OnShelfForm.QuNo,
          "ColNo": this.OnShelfForm.ColNo,
          "LeNo": this.OnShelfForm.LeNo,//节
          "DivNo": this.OnShelfForm.DivNo,
          "ZyNo": this.OnShelfForm.ZyNo,
          "SxNo": this.OnShelfForm.SxNo,//顺序
          "status": 1,//tempStatus
        }
        console.log(data, '上架前传递的数据');

        // this.$confirm('是否上架到' + this.OnShelfForm.QuNo + '区' + this.OnShelfForm.ColNo + '列' + this.OnShelfForm.LeNo + '节' + this.OnShelfForm.DivNo + '层' + ', 是否继续?', '再次确认', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchData123', data).then(//上架/下架（档案盒）
          success => {
            console.log(success, '上架/下架（档案盒）-成功');
            if (success.data.code == 200) {
              console.log(index, 'indexindex');
              if (index == 0) {
                this.$message.success("上架成功");
                this.OnShelfdialogFormVisible = false
                this.updateDAHData();
              }

            }

          },
          error => {
            console.log(error, '上架/下架（档案盒）--返回失败的数据');
          })
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消上架'
        //   });
        // });
      })
      // // console.log('');
      // var tempStatus = '';
      // if (this.ONShelf_status == "存档") {
      //   tempStatus = 1;
      // } else {
      //   tempStatus = 0;
      // }
      // if (this.OnShelfForm.QuNo == '' || this.OnShelfForm.ColNo == '' || this.OnShelfForm.LeNo == '' || this.OnShelfForm.DivNo == '' || this.OnShelfForm.ZyNo == '' || this.OnShelfForm.SxNo == '') {
      //   this.$message.warning("请输入要上架的存位信息")
      //   return;
      // }
      // var data = {
      //   "Table_name": this.DAH_TableDesignTittle,
      //   "Code": this.ONShelf_CODE_HGL,
      //   "BoxCode": "",
      //   "StoreId": 18,
      //   "QuNo": this.OnShelfForm.QuNo,
      //   "ColNo": this.OnShelfForm.ColNo,
      //   "LeNo": this.OnShelfForm.LeNo,//节
      //   "DivNo": this.OnShelfForm.DivNo,
      //   "ZyNo": this.OnShelfForm.ZyNo,
      //   "SxNo": this.OnShelfForm.SxNo,//顺序
      //   "status": tempStatus
      // }
      // console.log(data, '上架前传递的数据');

      // this.$confirm('是否上架到' + this.OnShelfForm.QuNo + '区' + this.OnShelfForm.ColNo + '列' + this.OnShelfForm.LeNo + '节' + this.OnShelfForm.DivNo + '层' + ', 是否继续?', '再次确认', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchData123 ', data).then(//上架/下架（档案盒）
      //     success => {
      //       console.log(success, '上架/下架（档案盒）-成功');
      //       if (success.data.code == 200) {
      //         this.$message.success("上架成功");
      //         this.OnShelfdialogFormVisible = false
      //         this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
      //       }

      //     },
      //     error => {
      //       console.log(error, '上架/下架（档案盒）--返回失败的数据');
      //     })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消上架'
      //   });
      // });




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

        var data = {
          "Table_name": this.DAH_TableDesignTittle,
          "DAID": this.DAH_ID,//档案ID                      ~~~~~~~~~~~
          "CODE": this.CODE_HGL,
          "FATHERKEY": this.Bus_FatherKey,
          "LENDTYPE": this.Bus_MLId,//门类ID   
          "SERIALNO": this.Fileboxesloan.loannumber,//序列号
          "Address": this.filelendingTble[0].address,//存放位置    
          // "info": tempInfo,//信息项                      ~~~~~~~~~~~
          // "number": tempNumber,//编号项        ~~~~~~~~~~~
          "MLName": this.Bus_MLName,//门类名称
          "LENDUNAME": this.Fileboxesloan.borrower,//借阅人名称
          "MOBILE": this.Fileboxesloan.Borrowphone,//手机号
          "TEL": this.Fileboxesloan.loanphone,//电话号
          "EMAIL": this.Fileboxesloan.Emailaddress,
          "LYMD": this.Fileboxesloan.Putilization,//利用目的
          "LENDDATE": this.Fileboxesloan.loandate,//借阅日期
          "LENDDAYS": this.Fileboxesloan.Loandays//借阅天数
        }

        console.log(this.Fileboxesloan, 'Fileboxesloan表单中的内容');
        console.log(data, '借阅接口需要传递的数据');


        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddLendData_hgl ', data).then(//添加档案盒借阅信息
          success => {
            console.log(success, '添加档案盒借阅信息-成功');
            if (success.data.code == 200) {
              this.$message.success("借阅成功");
              this.fileboxforloan = false;
              this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
            }

          },
          error => {
            console.log(error, '添加档案盒借阅信息--返回失败的数据');
          })

      }
      else {
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
        // var GetXXBH_Data = {};
        // GetXXBH_Data.Table_name = this.DATableDesignTittle;
        // GetXXBH_Data.CODE = this.CODE;
        // axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetXXBH', GetXXBH_Data).then(//获取信息编号(档案)
        //   success => {
        //     console.log(success, '获取信息编号(档案)-成功');
        //     tempNumber = success.data.data.number;
        //     tempInfo = success.data.data.info;
        //   },
        //   error => {
        //     console.log(error, '获取信息编号(档案)--返回失败的数据');
        //   })

        var GetXXBH_Data = {
          "Table_name": this.DATableDesignTittle,
          "DAID": this.DA_ID,//档案ID   
          "CODE": this.CODE,
          "FATHERKEY": this.Bus_FatherKey,
          "LENDTYPE": this.Bus_MLId,//门类ID   
          "SERIALNO": this.Fileboxesloan.loannumber,//序列号
          "Address": this.filelendingTble.address,//存放位置    
          // "info": tempInfo,//信息项                      ~~~~~~~~~~~
          // "number": tempNumber,//编号项        ~~~~~~~~~~~
          "MLName": this.Bus_MLName,//门类名称
          "LENDUNAME": this.Fileboxesloan.borrower,//借阅人名称
          "MOBILE": this.Fileboxesloan.Borrowphone,//手机号
          "TEL": this.Fileboxesloan.loanphone,//电话号
          "EMAIL": this.Fileboxesloan.Emailaddress,
          "LYMD": this.Fileboxesloan.Putilization,//利用目的
          "LENDDATE": this.Fileboxesloan.loandate,//借阅日期
          "LENDDAYS": this.Fileboxesloan.Loandays//借阅天数
        }
        console.log(GetXXBH_Data, '档案借阅需要传递的数据');
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddLendData', GetXXBH_Data).then(//借阅(档案)
          success => {
            if (success.data.code == 200) {
              this.$message.success("借阅成功");
              this.fileboxforloan = false;
              this.getDATableList(this.pIndex_da, this.pSize_da);
            }

          },
          error => {
            console.log(error, '借阅(档案)--返回失败的数据');
          })
      }


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
        
          this.SearchDA(1)

        },
        error => {
          console.log(error, '删除档案信息（档案）--返回失败的数据');
        })
    },

    //档案盒全选
    handleSelectallboxes(val) {
      console.log(val, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      this.multiSelectallboxes = val;
      console.log(this.multiSelectallboxes, 'this.DAHlistthis.DAHlistthis.DAHlist');
      console.log();
      if (val.length < 1)
        return;
      this.DAHlist = []
      this.DAHlist.push(...val) //这里会改变了原始的val数据

      // console.log(val, 'cccccccccccccccc');
      // console.log(val[0], 'cccccccccccccccc');


      this.CODE_HGL = val[0].CODE_HGL
    },
    //档案全选
    handleSelectionChange(val) {
      this.multiSelectallboxesList = val;
      console.log(this.multiSelectallboxesList, 'multiSelectallboxesListmultiSelectallboxesList');
      if (val.length < 1)
        return;
      console.log(val[0], 'cccccccccccccccc');


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

    //通道门记录档案盒待确认单选
    handleSelectionChange_TDM(val) {
      this.arrlist = []
      console.log(val, 'shadbasdjasbds111111');
      if (val.length < 1)
        return
      this.arrlist.push(...val)
      //  console.log(this.arrlist,'sdasdshdbsfjsdbjf');
    },

    handleSelectionChangehonghgl(val) {  //在借历史档案盒单选  //

      this.fileboxforloanList = []
      this.fileboxforloanList.push(...val)
      console.log(this.fileboxforloanList, ' 在借历史档案盒单选.在借历史档案盒单选 在借历史档案盒单选.在借历史档案盒单选');
      console.log(val, 'sagdvghsdgsghsvfhs');
      if (val.length > 0) {
        this.danganheCODE = val[0].code
        this.danganheTable_name = val[0].tablename
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
      this.dangandanxuan = val[0].archcode
    },



    handleSelectionChangehonghgldangan(val) {//档案单选归还
      this.fileboxforloanList = []
      this.fileboxforloanList.push(...val)
      console.log(this.fileboxforloanList, ' 档案单选档案单选档案单选');

      if (val.length > 0) {
        this.danganCODE = val[0].code
        this.danganTable_name = val[0].tablename
      } else {
        this.danganCODE = '',
          this.danganTable_name = ''
      }
    },


    //档案盒或者档案的归还按钮  
    huihuantijiao() {
      console.log(this.title, 'this.titlethis.title');

      if (this.fileboxforloanList.length == 0) {
        this.$message.error("请选择要归还的档案或档案盒")
        return;
      }

      if (this.title == '档案盒归还') {
        var arr = {
          "Table_name": this.danganheTable_name,
          "CODE": this.danganheCODE,
          "RETURNDATE": this.valuegrriqi,
          "GHR": this.inputgh,
          "GHRSJ": this.inputphone,
          "GHRDH": this.inputjgddh,
          // 'inputcfwz':this.inputcfwz
          // inputcfwz: "", //档案盒存放位置
        }
        console.log('')
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

        var arr = {
          "Table_name": this.danganTable_name,
          "CODE": this.danganCODE,
          "RETURNDATE": this.valuegrriqi,
          "GHR": this.inputgh,
          "GHRSJ": this.inputphone,
          "GHRDH": this.inputjgddh,
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAGH', arr).then(res => {
          console.log(res, '档案归还操作成功操作成功');
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

    //档案模板下载
    DAMBExceldownload() {
      var jsondata = {
        "Table_name": this.DATableDesignTittle,
      }
      let fileName = this.Bus_MLName + "_" + this.Bus_MLId + "_档案_Excel模板.xls";
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/excel/downdamb', jsondata, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error(error);
        });
    },
    //档案盒模板下载
    DAMBHExceldownload() {
      var jsondata = {
        "Table_name": this.DAH_TableDesignTittle,
      }
      let fileName = this.Bus_MLName + "_" + this.Bus_MLId + "_档案盒_Excel模板.xls";
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/excel/downdahmb', jsondata, { responseType: 'blob' })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error(error);
        });
    },
    UpLoadList_handleSelectionChange(val) {
      console.log(val, 'Excel数据--列表选中的项发生变化');
      this.UpLoadListSelect = val;
    },
    //获取Excel数据导入列表数据
    getUpLoadList() {
      var data = {};
      data.Table_name = "'" + this.DATableDesignTittle + "','" + this.DAH_TableDesignTittle + "'";
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/getUpLoadList', data).then(
        success => {
          this.uploadlistdata = [];
          console.log(success, '获取Excel数据导入列表数据-成功');
          success.data.data.forEach(item => {
            console.log(item, '233241232');
            this.uploadlistdata.push({
              id: item.id,
              index: item.filesort,
              filename: item.filename,
              filepath: item.filepath,
              startpos: item.startpos,
              endpos: item.endpos,
              totalcnt: item.totalcnt,
              mlname: item.mlname,
              mlid: item.mlid,
              tablename: item.tablename,
              inportokcnt: item.inportokcnt,
              inporterrcnt: item.inporterrcnt,
              noinportcnt: item.noinportcnt,
              updatetime: item.updatetime,
              createtime: item.createtime,
            })
          });
        },
        error => {
          console.log(error, '获取Excel数据导入列表数据--返回失败的数据');
        })
    },
    editUpLoadList() {
      console.log(this.UpLoadListSelect, '选中删除Excel数据的列表');
      if (this.UpLoadListSelect.length == 0) {
        this.$message.error("请选择要删除的Excel数据")
        return;
      }
      this.UpLoadListSelect.forEach(item => {
        this.uploadlist_edit.filename = item.filename;
        this.uploadlist_edit.tablename = item.tablename;
        this.uploadlist_edit.filesort = item.index;
        this.uploadlist_edit.startpos = item.startpos;
        this.uploadlist_edit.totalcnt = item.totalcnt;
      });
      this.uploadlist_edit_Visible = true;
    },
    deleteUpLoadList() {

      console.log(this.UpLoadListSelect, '选中删除Excel数据的列表');
      if (this.UpLoadListSelect.length == 0) {
        this.$message.error("请选择要删除的Excel数据")
        return;
      }
      var data = {};
      this.UpLoadListSelect.forEach(item => {
        data.filename = item.filename;
      });
      data.Table_name = "'" + this.DATableDesignTittle + "','" + this.DAH_TableDesignTittle + "'";
      console.log(data, '删除Excel数据');
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/deleteUpLoadList', data).then(//删除著录项（档案）
        success => {
          console.log(success, '删除Excel数据-成功');
          if (success.data.code == 200) {
            this.$message.success(success.data.data)//删除著录项（档案）
            // 删除成功之后重新获取数据
            this.getUpLoadList();
          }
          else {
            this.$message.error(success.data.message)
          }
        },
        error => {
          console.log(error, '删除Excel数据--返回失败的数据');
        })
    },
    addSumbitUpLoadList() {
      console.log(this.addDAhookname, 'addDAhookname');
      console.log(this.addDAOPtionvalue, 'addDAOPtionvalue');
      var data = {};
      data.filesort = this.uploadlist_add.filesort;
      data.filename = this.uploadlist_add.filename;
      data.startpos = this.uploadlist_add.startpos;
      data.totalcnt = this.uploadlist_add.totalcnt;
      data.tablename = (this.uploadlist_add.exceltype == "0") ? this.DAH_TableDesignTittle : this.DATableDesignTittle;
      data.mlname = this.Bus_MLName;
      data.mlid = this.Bus_MLId;

      console.log(data, '添加Excel数据信息  ---shuju');
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SaveUpLoadData', data).then(//添加或更新挂接项（档案盒）
        success => {
          console.log(success, '添加或更新Excel数据-成功');
          if (success.data.code == 200) {
            this.$message.success("添加成功")//添加或更新挂接项（档案盒）
            this.zlx_add_Visible = false;
            setTimeout(() => {
              this.getUpLoadList();
            }, 500);
          }
          else {
            this.$message.error(success.data.message)
          }

        },
        error => {
          console.log(error, '添加或更新Excel数据--返回失败的数据');
        })
    },
    editSumbitUpLoadList() {
      console.log(this.addDAhookname, 'addDAhookname');
      console.log(this.addDAOPtionvalue, 'addDAOPtionvalue');
      var data = {};
      data.filesort = this.uploadlist_edit.filesort;
      data.filename = this.uploadlist_edit.filename;
      data.startpos = this.uploadlist_edit.startpos;
      data.totalcnt = this.uploadlist_edit.totalcnt;
      data.tablename = this.uploadlist_edit.tablename;
      data.mlname = this.Bus_MLName;
      data.mlid = this.Bus_MLId;
      console.log(data, '更新Excel数据信息  ---shuju');
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/SaveUpLoadData', data).then(//添加或更新挂接项（档案盒）
        success => {
          console.log(success, '添加或更新Excel数据-成功');
          if (success.data.code == 200) {
            this.$message.success("添加成功")//添加或更新挂接项（档案盒）
            this.zlx_add_Visible = false;
            setTimeout(() => {
              this.getUpLoadList();
            }, 500);
          }
          else {
            this.$message.error(success.data.message)
          }

        },
        error => {
          console.log(error, '添加或更新Excel数据--返回失败的数据');
        })
    },
    mutisearch() {
      this.mutisearchflag = true;
      var data = {
        Table_name: this.DAH_TableDesignTittle || "a01_hgldata_1_1",
        pIndex: this.pIndex_dah,
        pSize: this.pSize_dah,
        MLIdList: this.Bus_MLId || 1,
        condition: this.RecordInputListearch,
        orderby: this.RecordInputListone,
      };
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/mutisearch', data).then(//高级搜索
        res => {
          console.log(res, '高级搜索-成功');
          if (res.data.code != 200) {
            this.$message.error(res.data.message)
            return;
          }
          this.tableBodyInfoList = [];
          this.columnInfoList = [];
          this.tableBodyInfoList = res.data.data.table;
          console.log(res.data.data.Count, 'res.data.data.count');
          // this.totalcount_dah = res.data.data.Count;
          this.count_DAH = res.data.data.Count;
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
              width: res.data.data.headerwidth[i],
            };
            this.columnInfoList.push(obj);
            this.count_DAH = res.data.data.Count
            //数据更新后执行
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                this.$refs.multipleTable.doLayout();
              }
            })
            this.muitisearchVisible = false;
          }
        },
        error => {
          console.log(error, '高级搜索--返回失败的数据');
        })
    },
    adspostocode() {
      this.OnShelfForm.poscode =
        this.prefixZero(this.OnShelfForm.QuNo, 2) + "-" +
        this.prefixZero(this.OnShelfForm.ColNo, 2) + "-" +
        this.prefixZero(this.OnShelfForm.ZyNo, 2) + "-" +
        this.prefixZero(this.OnShelfForm.LeNo, 2) + "-" +
        this.prefixZero(this.OnShelfForm.DivNo, 2) + "-" +
        this.prefixZero(this.OnShelfForm.SxNo, 2);
    },
    prefixZero(n, m) {
      var _a = (Array(m).join('0') + n).slice(-m);
      return _a;
    }
  }
};
</script>

<style scoped lang="scss">
// .mainview{
//   //  background: #fff;
//   // z-index: 9999; 
// }
// .el-scrollbar__wrap {
//   overflow-x: hidden !important;;
// }

// .overllow{
//   width: 85vw;
//   overflow-x: auto;
// }
// .el-table.el-table--border {
//   height: 20vw !important;
// }
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

  .headermoshi {
    margin-left: 0.5vw;
  }

  .headerzhulu {
    margin-left: -.1vw;
    color: #000;
  }
}

.TableHeader {
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  background: rgb(232, 233, 235);
}

.containerone {
  // width: 50%;
  // max-height: 50vh;

  // background-color: red;
  // float: left;
}

.containertwo {
  // width: 50%;
  // max-height: 50vh;
  // overflow-y: scroll;
  // float: left;
  // background-color: orange;
}

.el-table thead {
  color: #000 !important;
}

.el-table {
  color: #000 !important;

  .el-table__body-wrapper {
    overflow: hidden;
    position: relative;
    // height: 50vh ;
    overflow-y: scroll;
  }

  :hover::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.Modeldesign {
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;

  button {
    margin-left: 1vw;
  }
}

.Modeldesignlist {
  width: 100%;
  height: 50vh;
}

.Modeldesignlists {
  width: 100%;
  display: flex;
  margin-bottom: 1vh;

  button {
    margin-left: 1vw;
  }
}

.quicky {
  width: 100%;
  height: 5vh;
  // background: orange;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .quicykone {
    display: flex;
    align-items: center;

    input {
      margin-left: 10px;
    }
  }
}

.quickylen {
  width: 100%;
  height: 10vh;

  .quickylenone {
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    padding: 0 20px;

    div {
      color: #2a67cd;
      font-weight: bold;
    }
  }

  .quickylentwo {
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    padding: 0 20px;

    div {
      color: #2a67cd;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

.archPutdown {
  width: 100%;
  height: 40vh;
  margin-bottom: 1vh;

  .archPutdownone {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 40px;
  }
}

// 档案著录
.ModelInput {
  width: 100%;
  height: 20vh;
  margin-bottom: 1vh;

  .ModelInputone {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
  }

  .ModelInputtow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 2vh;
  }

  .ModelInputthree {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 2vh;
  }
}

//档案盒借阅
.fileboxloanpage {
  width: 100%;
  height: 40vh;
  margin-bottom: 1vh;

  .fileboxloanpageone {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
  }

  .fileboxloanpagetwo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 2vh;
  }

  .fileboxloanpagethree {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 2vh;
  }

  .fileboxloanpagefor {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 2vh;
  }

  .fileboxloanpagefix {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 2vh;
  }

  .fileboxloanpagesix {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    margin-top: 2vh;
  }
}

.footerbuttons {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
  top: 10px;

  button {
    margin: 0 10vw;
  }
}

.avatar-containers {
  display: flex;
  align-items: center;

  .headerzhulu {
    font-size: 16px;
  }
}

.footernewVal {
  width: 100%;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filetongdao {
  width: 100%;
  height: 5vh;
  // background: orange;
  display: flex;
  align-items: center;

  div:nth-child(2) {
    margin-left: 1vw;
  }

  div:nth-child(3) {
    margin-left: 1vw;
  }
}

.v-modal {
  display: none;
}

// 
::-webkit-scrollbar {
  width: 6px; //滚动条宽度
  height: 5px; //滚动条的高度

}

// 滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: #ececec; //设置滚动条的颜色
  border-radius: 3px; // 设置滚动条的圆角
}

// 修改表格(el-table)的滚动条
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

// 滚动条的滑块
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ececec;
  border-radius: 3px;
}

.el-menu-demo {
  // border: 1px solid #8A8A8A!important;
}

.el-table--border,
.el-table--group {
  border: 1px solid #8A8A8A !important;
}

// .el-table td,
// .el-table th {
//   border: .1px solid rgb(0, 0, 0);
// }
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  /*滚动条宽度*/
  height: 8px;
  /*滚动条高度*/
}

.el-table__body-wrapper::-webkit-scrollbar-track {

  border-radius: 10px;
  /*滚动条的背景区域的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.3);
  background-color: #eeeeee;
  /*滚动条的背景颜色*/
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {

  border-radius: 10px;
  /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(145, 143, 0143, 0.3);
  background-color: rgb(145, 143, 143);
  /*滚动条的背景颜色*/
}

.el-menu {
  height: 5vh !important;

  // background: #f8f8f8 !important;
  z-index: 98;
}

element.style {
  border-bottom-color: transparent;
}

.el-table .el-table__body-wrapper {
  overflow: scroll !important;
  position: none !important;
  // height: 29vh !important;
}

// .el-table__body-wrapper .is-scrolling-left{
//   height: 20vw !important;
// }

.el-table td {
  padding: 0 !important;
}

.el-input__inner {
  // border: 1px solid #000 !important;
  // height: 1.6vw !important;
}

.el-icon-search {
  position: relative;
  left: -18px;
  top: 1px;
}

.newclass {
  // height: 37vw !important;
  height: 63.6vh !important;
  // z-index: 99999;
}

.oldclass {
  height: 30vh !important;
  // z-index: 99999;
}

.newclassone {
  height: 65vh !important;
  // z-index: 99999;
}

.oldclassone {
  height: 26vh !important;
  // z-index: 99999;
}

.quanpingone {
  margin-left: 49.5vw;
  width: 1.5vw;
  height: 3vh;
  background: url(../../assets/全屏.png);
  background-size: 100% 100%;

}

.quanpingtwo {
  margin-left: 49.5vw;
  width: 1.5vw;
  height: 3vh;
  background: url(../../assets/全屏.png);
  background-size: 100% 100%;

}

.quanpingoneone {
  margin-left: 39vw;
  width: 1.5vw;
  height: 3vh;
  background: url(../../assets/缩屏.png);
  background-size: 100% 100%;

}

.quanpingonetwo {
  margin-left: 45vw;
  width: 1.5vw;
  height: 3vh;
  background: url(../../assets/缩屏.png);
  background-size: 100% 100%;

}


.zhedian {
  // margin-left: 0.5vw;
  // margin-top: 8vw;
  // position: fixed;
  // left: 16.5vw;
  // top: 38vh;
  width: 1vw;
  height: 2vw;
  border: 1px solid #000;
  background-color: #ede7e7;
  border-radius: 4.5px;
  position: relative;
  right: 0;
  top: 6vw;
  background-image: url(../../assets/折叠6.png);
  background-size: 100% 100%;
}

.zhedianone {
  // position: absolute;
  //   left: 232px;
  //   top: 29vh;
  margin-left: 0.5vw;
  margin-top: 6vw;
  width: 1vw;
  height: 2vw;
  border: 1px solid #000;
  background-color: #ede7e7;
  border-radius: 4.5px;
  background-image: url(../../assets/折叠5.png);
  background-size: 100% 100%;
}

.zhediantwo {
  // // margin-left: 0.5vw;
  // // margin-top: 8vw;
  // position: absolute;
  // left: 12vw;
  // top: 34vw;
  // width: 1.4vw;
  // height: 2vw;
  // border: 1px solid #000;
  // background-color: #ede7e7;
  // border-radius: 8px;
  // background-image: url(../../assets/折叠6.png);
  // background-size: 80% 100%;

  margin-left: 0.5vw;
  margin-top: 5vw;
  width: 1vw;
  height: 2vw;
  border: 1px solid #000;
  background-color: #ede7e7;
  border-radius: 4.5px;
  background-image: url(../../assets/折叠6.png);
  background-size: 100% 100%;
}

.zhedianonetwo {
  // position: absolute;
  //   left: 232px;
  //   top: 29vh;
  margin-left: 0.5vw;
  margin-top: 5vw;
  width: 1vw;
  height: 2vw;
  border: 1px solid #000;
  background-color: #ede7e7;
  border-radius: 4.5px;
  background-image: url(../../assets/折叠5.png);
  background-size: 85% 100%;
}

// .zhedian img {
//   width: 100%;
//   height: 100%;
// }

.zhankaizhedian {
  display: flex;
  height: 100%;
}

.shezhianniu {
  margin-left: 0.2vw;
  ;
  margin-top: 0.2vw;
  ;
  width: 1.2vw;
  height: 1.2vw
}

.shezhianniu img {
  width: 90%;
  height: 90%;
}

.newisCollapse {
  position: relative;
  display: flex;
  height: 100%;


}

.newisCollapseone {
  display: flex;
  // height: 100%;

}

.el-table .el-table__body-wrapper .is-scrolling-none {
  height: 300px !important;
  background: red;
}

// .el-table td.is-hidden > *,
//     .el-table th.is-hidden > * {
//         visibility: visible;
//     }
// .quanpingone img{
//   width: 100%;
//   height: 100%;
// }

.box_cm {
  display: flex;
}

.box_cm .box_cm_list {
  width: 48%;
  height: 65vh;
}

.box_cm .box_cm_list_cm {
  width: 6%;
  height: 50vh;
  text-align: center;
  padding-top: 14vh;
}

.box_cm .box_cm_list_cm div {
  line-height: 7vh;

}

.newstyle {
  border: 1px solid #000;
  z-index: 9999999999;
  width: 40vw;
  height: 14vh;
  background: #f6f7f8;
  position: absolute;
  top: 23vh;
  left: 20vw
}

.oldstyle {
  border: 1px solid #000;
  z-index: 9999999999;
  width: 40vw;
  height: 14vh;
  background: #f6f7f8;
  position: absolute;
  top: 63vh;
  left: 20vw
}

// .el-dialog {
// margin-top: 9vh !important;
// }
// .el-descriptions__table {
//   height: 20vw !important;
// padding-bottom: 2vw !important;
.el-tag.el-tag--success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #337af5;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-icon-minus,
.el-icon-plus {
  color: #000;
}
</style>