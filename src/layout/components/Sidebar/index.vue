<!-- 侧边栏 -->
<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo :collapse="isCollapse" />
    <!-- -------------档案管理页面----------- -->
    <div v-if="isShow">
      <!-- 搜索档案门类 -->
      <el-dialog title="门类检索" center :visible.sync="dialogList">
        <el-form :model="form">
          <el-form-item label="门类名称" :label-width="formLabelWidth">
            <el-input v-model="formone.classificatio" autocomplete="off"></el-input>
            <el-button style="margin-left: 1vw" type="primary" @click="onSubmit">检索</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-aline: center">
          <el-button @click="dialogList = false">取 消</el-button>
          <el-button type="primary" @click="dialogList = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加档案分类 -->
      <el-dialog title="添加档案分类" @close="amendclose()" center :visible.sync="addFLVisible">
        <el-form :model="form">
          <el-form-item label="分类名称：" :label-width="formLabelWidth">
            <el-input v-model="form.classificatio" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="分类说明：" :label-width="formLabelWidth">
            <el-input v-model="form.Instructions" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-aline: center">
          <el-button @click="addFLVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSumbit(0)">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 添加档案门类 -->
      <el-dialog title="添加档案门类" @close="amendclose()" center :visible.sync="addFormVisible">
        <el-form :model="form">
          <el-form-item label="门类名称：" :label-width="formLabelWidth">
            <el-input v-model="form.classificatio" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="说明：" :label-width="formLabelWidth">
            <el-input v-model="form.Instructions" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-aline: center">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSumbit(1)">提 交</el-button>
        </div>
      </el-dialog>
      <!-- 模型设计 -->
      <el-dialog title="模型设计" center :visible.sync="ModelDesignVisible">
        <el-tabs v-model="ModelDesignActiveName" @tab-click="handleClick">
          <el-tab-pane label="档案盒" name="1">
            <div class="Modeldesign">
              <div style="margin-left: -1vw">
                <el-button type="primary" @click="DAH_innerVisible = true">添加</el-button>

                <el-dialog width="30%" title="添加档案盒挂接项" :visible.sync="DAH_innerVisible" append-to-body>
                  <el-form>
                    <el-form-item label="挂接项名称：" :label-width="formLabelWidth">
                      <el-input v-model="addDAH_hookname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="挂接项类型：" :label-width="formLabelWidth">
                      <el-select v-model="addDAOPtionvalue" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer" style="text-aline: center">
                    <el-button @click="DAH_innerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSumbitDAH_Hook()">添 加</el-button>
                  </div>
                </el-dialog>
              </div>
              <div><el-button type="info">修改</el-button></div>
              <div><el-button type="danger" @click="deleteDAH_Hook()">删除</el-button></div>
              <div><el-button type="primary">上移</el-button></div>
              <div><el-button type="primary">下移</el-button></div>
            </div>
            <el-table :data="DAH_HookList" @selection-change="DAH_handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column property="index" label="序号" width="150"></el-table-column>
              <el-table-column property="name" label="挂接项名称" width="200"></el-table-column>
              <el-table-column property="type" label="挂接项类型" width="150"></el-table-column>
            </el-table>
            <div class="footerbuttons">
              <el-button @click=" ModelDesignVisible = false" type="primary">确认</el-button>
              <el-button @click=" ModelDesignVisible = false">取消</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="档案" name="2">
            <div class="Modeldesign">
              <div style="margin-left: -1vw">
                <el-button type="primary" @click="innerVisible = true;">添加</el-button>

                <el-dialog width="30%" title="添加档案挂接项" :visible.sync="innerVisible" append-to-body>
                  <el-form>
                    <el-form-item label="挂接项名称：" :label-width="formLabelWidth">
                      <el-input v-model="addDAhookname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="挂接项类型：" :label-width="formLabelWidth">
                      <el-select v-model="addDAOPtionvalue" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer" style="text-aline: center">
                    <el-button @click="innerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSumbitDAHook()">添 加</el-button>
                  </div>
                </el-dialog>
              </div>
              <div><el-button type="info">修改</el-button></div>
              <div><el-button type="danger" @click="deleteDAHook()">删除</el-button></div>
              <div><el-button type="primary">上移</el-button></div>
              <div><el-button type="primary">下移</el-button></div>
            </div>
            <el-table :data="DAHookList" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column property="index" label="序号" width="150"></el-table-column>
              <el-table-column property="name" label="挂接项名称" width="200"></el-table-column>
              <el-table-column property="type" label="挂接项类型" width="150"></el-table-column>
            </el-table>
            <div class="footerbuttons">
              <el-button @click=" ModelDesignVisible = false" type="primary">确认</el-button>
              <el-button @click=" ModelDesignVisible = false">取消</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
      <!-- 表设计  -->
      <el-dialog :title=DATableDesign center :visible.sync="SubTableDesignVisible">
        <el-tabs v-model="activeNameone" @tab-click="handleClickone">
          <el-tab-pane label="档案盒" name="first">
            <div class="Modeldesign">
              <div style="margin-left: -1vw">
                <el-button type="primary">添加</el-button>
              </div>
              <div><el-button type="info">修改</el-button></div>
              <div><el-button type="danger" @click="deleteDAH_Record()">删除</el-button></div>
              <div><el-button type="primary">上移</el-button></div>
              <div><el-button type="primary">下移</el-button></div>
              <div style="margin-left: 1vw">
                <el-button type="primary">同步表结构</el-button>
              </div>
              <div style="margin-left: 1vw">
                <el-button type="primary">更换表结构</el-button>
              </div>
            </div>
            <el-table :data="DAH_RecordList" @selection-change="DAH_Record_handleSelectionChange" border="">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column property="index" label="序号" width="50"></el-table-column>
              <el-table-column property="record" label="著录项" width="100"></el-table-column>
              <el-table-column property="type" label="类型"></el-table-column>
              <el-table-column property="length" label="长度"></el-table-column>
              <el-table-column property="need" label="必填项"></el-table-column>
              <el-table-column property="Hook" label="挂接"></el-table-column>
              <el-table-column property="RFIDHook" label="RFID挂接项" width="200"></el-table-column>
            </el-table>
            <div class="footerbuttons">
              <el-button @click="SubTableDesignVisible = false" type="primary">确认</el-button>
              <el-button @click="SubTableDesignVisible = false">取消</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="档案" name="second">
            <div class="Modeldesign">
              <div style="margin-left: -1vw">
                <el-button type="primary">添加</el-button>
              </div>
              <div><el-button type="info">修改</el-button></div>
              <div><el-button type="danger" @click="deleteDA_Record()">删除</el-button></div>
              <div><el-button type="primary">上移</el-button></div>
              <div><el-button type="primary">下移</el-button></div>
              <div style="margin-left: 1vw">
                <el-button type="primary">同步表结构</el-button>
              </div>
              <div style="margin-left: 1vw">
                <el-button type="primary">更换表结构</el-button>
              </div>
            </div>
            <el-table :data="DA_RecordList" @selection-change="DA_Record_handleSelectionChange" border="">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column property="index" label="序号" width="50"></el-table-column>
              <el-table-column property="record" label="著录项" width="100"></el-table-column>
              <el-table-column property="type" label="类型"></el-table-column>
              <el-table-column property="length" label="长度"></el-table-column>
              <el-table-column property="need" label="必填项"></el-table-column>
              <el-table-column property="Hook" label="挂接"></el-table-column>
              <el-table-column property="RFIDHook" label="RFID挂接项" width="200"></el-table-column>
            </el-table>
            <div class="footerbuttons">
              <el-button @click="SubTableDesignVisible = false" type="primary">确认</el-button>
              <el-button @click="SubTableDesignVisible = false">取消</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
      <!-- 修改档案分类 -->
      <el-dialog title="修改档案分(门)类" @close="amendclose()" center :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称：" :label-width="formLabelWidth">
            <el-input v-model="form.classificatio" autocomplete="off" clearable=""></el-input>
          </el-form-item>

          <el-form-item label="说明：" :label-width="formLabelWidth">
            <el-input v-model="form.Instructions" autocomplete="off" clearable=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-aline: center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="amendSave()">保 存</el-button>
        </div>
      </el-dialog>
      <!-- background: red; -->
      <div @contextmenu="showMenu" style=" width: 100%;height: 100%;margin-top: 20px;">

        <el-scrollbar style="margin-top:1.2vw;" wrap-class="scrollbar-wrapper">
          <div style="text-align: center;margin-top: 1vw;">
            <el-badge :value="catalogueNumber" class="item" type="primary">
              <el-button size="small" type="primary" style="font-size:1vw;width:10vw;">档案目录</el-button>
            </el-badge>
          </div>

          <el-tree :data="FLList" :props="defaultProps" highlight-current @node-click="handleNodeClick"></el-tree>
          <vue-context-menu style="width: 11vw;background: #eee;" :contextMenuData="contextMenuData"
            @SearchMLVueContextMenu="SearchMLVueContextMenu" @addFLVueContextMenu="addFLVueContextMenu"
            @addMLVueContextMenu="addMLVueContextMenu" @ModelDesignVueContextMenu="ModelDesignVueContextMenu"
            @SubTableDesignVueContextMenu="SubTableDesignVueContextMenu" @amendVueContextMenu="amendVueContextMenu"
            @deleteVueContextMenu="deleteVueContextMenu"></vue-context-menu>
        </el-scrollbar>
      </div>
    </div>
    <!-------------- 视频监控页面------------ -->
    <div v-if="videoShow" style="width: 100%;height: 100%;margin-top: 20px;">
      <el-scrollbar style="margin-top:1.2vw;" wrap-class="scrollbar-wrapper">
        <div style="text-align: center;margin-top: 1vw;">
          <el-badge class="item" type="primary">
            <el-button size="small" type="primary" style="font-size:1vw;width:10vw;">库房选择</el-button>
          </el-badge>
        </div>
        <el-tree :data="KFList" :props="defaultProps" highlight-current @node-click="KFhandleNodeClick"></el-tree>
      </el-scrollbar>
    </div>
    <!-------------- 密集架控制页面------------ -->
    <div v-if="ebVideoCtrlWebVideoCtrlShow" style="width: 100%;height: 100%;margin-top: 20px;">
      <el-scrollbar style="margin-top:1.2vw;" wrap-class="scrollbar-wrapper">
        <el-tree :data="MJJList" :props="defaultProps" highlight-current @node-click="MJJhandleNodeClick"></el-tree>
      </el-scrollbar>
    </div>
    <!-------------- 库房灯光控制页面------------ -->
    <div v-if="kufangdengguang" style="width: 100%;height: 100%;margin-top: 20px;">
      <el-scrollbar style="margin-top:1.2vw;" wrap-class="scrollbar-wrapper">
        <el-tree :data="KFDGList" :props="defaultProps" highlight-current @node-click="KFDGNodeClick"></el-tree>
      </el-scrollbar>
    </div>

    <!-------------- 库房导航页面------------ -->
    <div v-if="warehouseShow" style="width: 100%;height: 100%;margin-top: 20px;">
      <el-scrollbar style="margin-top:1.2vw;" wrap-class="scrollbar-wrapper">
        <div style="text-align: center;margin-top: 1vw;">
          <el-badge class="item" type="primary">
            <el-button size="small" type="primary" style="font-size:1vw;width:10vw;">全景库房选择</el-button>
          </el-badge>
        </div>
        <el-tree style="margin-left:1.5vw;" :data="warehouseList" :props="defaultProps" highlight-current
          @node-click="warehousehandleNodeClick"></el-tree>
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
// import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import bgimg from '../../../assets/welcom_bg.png'
import axios from 'axios'
import { parse } from 'path-to-regexp'
import { Table } from 'element-ui'

import bus from '../../../utils/bus'

export default {
  components: { Logo },
  data() {
    return {
      img: bgimg,
      catalogueNumber: '',
      FLList: [
        {
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
          },
          {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }


      ],
      KFDGList: [


      ],
      KFList: [
        {
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
          },
          {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }


      ],
      MJJList: [
        {
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
          },
          {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }


      ],
      warehouseList: [
        {
          label: '演示库房 1',
          children: [{
            label: '演示库房 1-1',
            children: [
              {
                label: '大厅'
              },
              {
                label: '档案阅览区'
              },
              {
                label: '库房'
              },
              {
                label: '办公室'
              },
            ]
          }]
        }, {
          label: '演示库房 2',
          children: [{
            label: '一楼',
            children: [{
              label: '一楼库房 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '演示库房 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          },
          {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }


      ],

      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isShow: false,//是否展示
      videoShow: false,//是否展示
      warehouseShow: false,//是否展示
      ebVideoCtrlWebVideoCtrlShow: false,//是否展示
      kufangdengguang: false,//是否展示
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
      formLabelWidth: "100px",


      dialogFormVisible: false,//修改档案分类


      addFormVisible: false, //添加档案门类
      addFLVisible: false,//添加档案分类

      form: {
        classificatio: "",
        Instructions: "",
      },
      formLabelWidth: "100px",
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
        label: '文本'
      }, {
        value: '1',
        label: '整数'
      }, {
        value: '2',
        label: '小数'
      }, {
        value: '3',
        label: '时间'
      }, {
        value: '4',
        label: '下拉框'
      }, {
        value: '5',
        label: '范围'
      }
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
    };
  },
  computed: {
    ...mapGetters([
      'sidebar', 'ServeIp'
    ]),
    routes() {
      // return this.$router.options.routes
      return this.$route.path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    ServeIp() {
      return this.$store.state.user.ServeIp
    },
    ServePort() {
      return this.$store.state.user.ServePort
    }
  },
  watch: {
    routes: {
      handler(newVal, oldVal) {
        console.log(newVal, 'newVal');
        console.log(oldVal, 'oldVal');

        if (newVal == '/home') {
          this.isShow = false;
          this.$router.go(0)

        } else {
          this.isShow = true;
          this.$router.go(0)
        }

      }
    }
  },
  created() {
  },
  mounted() {
    console.log(this.$route.path, '侧边栏页面查看当前路由');
    if (this.$route.path == "/example/a02_dagl") {
      this.isShow = true;
      this.init();

    } else if (this.$route.path == "/example/a04_spjk") {
      this.videoShow = true;
      this.inits();
    }
    else if (this.$route.path == "/example/a03_mjjkz") {
      this.ebVideoCtrlWebVideoCtrlShow = true;
      this.initebVideoCtrlWebVideoCtrlShow();
    }
    else if (this.$route.path == "/example/a07_zndg") {
      this.kufangdengguang = true;
      this.initKFDGlShow();
    }
    else if (this.$route.path == "/example/a06_znmj") {//门禁
      this.kufangdengguang = true;
      this.initKFDGlShow();
    }
    else if (this.$route.path == "/example/a05_sfgz") {//十防
      this.kufangdengguang = true;
      this.initKFDGlShow();
    }
    else if (this.$route.path == "/example/a01_hjjk") {//环境监控
      this.kufangdengguang = true;
      this.initKFDGlShow();
    }
    else if (this.$route.path == "/example/a09_kfdh") {
      this.warehouseShow = true;
      // this.initebVideoCtrlWebVideoCtrlShow();
    }
  },

  methods: {
    init() {
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAMLData1', JSON.parse('{}')).then(
        success => {
          console.log(success, '获取获取档案门类信息（获取所有门类）-成功');

          this.FLList = [];
          var cityList = success.data.data;
          this.catalogueNumber = cityList.length;

          cityList.forEach(r => {
            r.label = r.MLName;
            r.children = cityList.filter(re =>
              re.FatherKey === r.MLId
            )
            if (r.FatherKey == 0) {
              this.FLList.push(r)
            }
          })
          // success.data.data.forEach((item, index) => {
          //   console.log(item, '11111111111');
          //   if (item.FatherKey == 0) {
          //     this.FLList.push({
          //       label: item.MLName,
          //       MLId: item.MLId,
          //     })
          //   }
          //   else {
          //     console.log(this.FLList, '22222222222');
          //     this.FLList.forEach((i, key) => {
          //       if (i.MLId == item.FatherKey) {//二级
          //         console.log(this.FLList[key], 'i,this.FLList[key]');
          //         if (this.FLList[key].children == undefined) {
          //           this.FLList[key].children = [];
          //         }
          //         this.FLList[key].children.push(
          //           {
          //             label: item.MLName,
          //             MLId: item.MLId,
          //           }
          //         );
          //         console.log(this.FLList, '准备三级查看');



          //       }
          //     });

          //     this.FLList.forEach((y, yKey) => {
          //       console.log(y.children, '111111111))))))))))))))))))))))))))))))))))))');
          //     });
          //   }
          // });

          // console.log(this.FLList, '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        },
        error => {
          console.log(error, '获取获取档案门类信息（获取所有门类）--返回失败的数据');
        })
    },
    inits() {
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetStoresForLeftMenuAsc1', JSON.parse('{}')).then(
        success => {
          console.log(success, '获取库房信息-成功');
          this.FLList = [];
          this.KFList = success.data.data;
        },
        error => {
          console.log(error, '获取库房信息--返回失败的数据');
        })
    },
    initebVideoCtrlWebVideoCtrlShow() {
      console.log('11111111111');
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetStoresMJJForLeftMenuAsc', JSON.parse('{}')).then(
        success => {
          console.log(success, '获取库房密集架信息-成功');
          console.log(success.data.data, '获取库房密集架信息-成功');
          this.MJJList = [];
          this.MJJList = success.data.data;
        },
        error => {
          console.log(error, '获取库房密集架信息--返回失败的数据');
        })
    },
    initKFDGlShow() {
      console.log('11111111111');
      var arr = {
        "acLx": 1
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetStoresACSForLeftMenuAsc', arr).then(
        success => {
          console.log(success, '获取灯光库房信息-成功');
          console.log(success.data.data, '获取灯光库房信息-成功');
          this.KFDGList = [];
          // success.data.data.forEach((item,index)=>{
          //   item.label=item.StoreName
          // })
          this.KFDGList.push(...success.data.data);
        },
        error => {
          console.log(error, '获取灯光库房信息--返回失败的数据');
        })
    },
    handleNodeClick(data) {
      console.log(data, 'data');
      console.log(data.MLName, "门类ID:" + data.MLId, "父级：" + data.FatherKey, '点击了');
      this.paramList.MLName = data.MLName;
      this.paramList.MLId = data.MLId;
      this.paramList.FatherKey = data.FatherKey;
      this.paramList.MLGS = data.MLGS;


      bus.$emit("changeEvent", this.paramList.MLId, this.paramList.MLName, this.paramList.FatherKey, this.paramList.MLGS);

    },
    KFhandleNodeClick(data) {
      console.log(data, 'data');
      if (data.children == undefined) {
        bus.$emit("videoSurveillance", data.id, data.label);
      }

    },
    MJJhandleNodeClick(data) {//
      console.log(data, 'data.MJJhandleNodeClick');
      if (data.children == undefined) {
        console.log(data.id, data.label, 'data.id, data.label');
        bus.$emit("ebVideoCtrlWebVideoCtrl", data.id, data.label);
      }

    },
    KFDGNodeClick(data) {
      // console.log(data.id, data.label, 'data.id, data.label');
      bus.$emit("KFDG", data.HostName);
      console.log(data, 'ssssssssssssssssssssssssssssssssssssssss');
    },
    warehousehandleNodeClick(data) {//
      console.log(data, 'data.warehousehandleNodeClick');
      // if (data.children == undefined) {
      //   console.log(data.id, data.label, 'data.id, data.label');
      //   bus.$emit("ebVideoCtrlWebVideoCtrl", data.id, data.label);
      // }

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
              this.init();
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
            this.init();
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
              this.init();
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
            console.log(success, '添加们类-成功');
            if (success.data.code == 200) {
              this.$message.success(success.data.data)//添加成功
              this.addFormVisible = false
              this.init();
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
            var tempType = '';
            switch (item.XLx) {
              case 0: tempType = '文本'; break;
              case 1: tempType = '整数'; break;
              case 2: tempType = '小数'; break;
              case 3: tempType = '时间'; break;
              case 4: tempType = '下拉框'; break;
              case 5: tempType = '范围'; break;
              default: break;
            };
            this.DAHookList.push({
              id: item.id,
              index: item.ListIndex + 1,
              name: item.XName,
              type: tempType,
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

          success.data.data.forEach(item => {
            console.log(item, '1111111111');
            // 0：文本；1：整数；2：小数，3：时间；4：下拉框；5：范围：
            var tempType = '';
            switch (item.XLx) {
              case 0: tempType = '文本'; break;
              case 1: tempType = '整数'; break;
              case 2: tempType = '小数'; break;
              case 3: tempType = '时间'; break;
              case 4: tempType = '下拉框'; break;
              case 5: tempType = '范围'; break;
              default: break;
            };
            this.DAH_HookList.push({
              id: item.id,
              index: item.ListIndex + 1,
              name: item.XName,
              type: tempType,
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
            switch (item.XLx) {
              case 0: tempType = '文本'; break;
              case 1: tempType = '整数'; break;
              case 2: tempType = '小数'; break;
              case 3: tempType = '时间'; break;
              case 4: tempType = '下拉框'; break;
              case 5: tempType = '范围'; break;
              default: break;
            };
            if (item.IsNotNull) {
              need = '是';
            } else {
              need = "否";
            }
            this.DA_RecordList.push({
              index: item.ListIndex + 1,
              record: item.XByName,//著录项
              type: tempType,//类型
              length: item.MaxLength,//长度
              need: need,//必填项
              Hook: item.gjxname,//挂接
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
            switch (item.XLx) {
              case 0: tempType = '文本'; break;
              case 1: tempType = '整数'; break;
              case 2: tempType = '小数'; break;
              case 3: tempType = '时间'; break;
              case 4: tempType = '下拉框'; break;
              case 5: tempType = '范围'; break;
              default: break;
            };
            if (item.IsNotNull) {
              need = '是';
            } else {
              need = "否";
            }
            this.DAH_RecordList.push({
              index: item.ListIndex + 1,
              record: item.XByName,//著录项
              type: tempType,//类型
              length: item.MaxLength,//长度
              need: need,//必填项
              Hook: item.gjxname,//挂接
              RFIDHook: item.rfidgjx,//RFID挂接项
              XName: item.XName,//
              Table_Name: item.Table_Name,//表名
            })




          });



        },
        error => {
          console.log(error, '获取著录项（档案盒）著录项列表数据--返回失败的数据');
        })
    },
    deleteDAH_Record() {//著录项--档案盒--删除
      console.log(this.DAH_Record_ListSelect, '选中删除著录项的列表');
      if (this.DAH_Record_ListSelect.length == 0) {
        this.$message.error("请选择要删除的著录项")
        return;
      }
      var data = {};
      this.DAH_Record_ListSelect.forEach(item => {
        data.XName = item.XName;
        data.Table_Name = item.Table_Name;
      });
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

    },
    deleteDA_Record() {//著录项--档案--删除
      console.log(this.DA_Record_ListSelect, '选中删除著录项的列表');
      if (this.DA_Record_ListSelect.length == 0) {
        this.$message.error("请选择要删除的著录项")
        return;
      }
      var data = {};
      this.DA_Record_ListSelect.forEach(item => {
        data.XName = item.XName;
        data.Table_Name = item.Table_Name;

      });
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

    },

  }
}
</script>
<style lang="scss" >
.el-tree {
  background: url('../../../assets/welcom_bg.png');
  color: #fff;
  font-size: 3vw;
}

.el-tree-node__content:hover {
  background-color: rgba(95, 160, 235, 0.6);
}

.el-tree-node:focus>.el-tree-node__content {
  background-color: rgba(95, 102, 235, 0.6);
}

.vue-contextmenu-listWrapper .context-menu-list[data-v-1931f86e] {
  left: -2.3vw;
}

.btn-wrapper-simple[data-v-1931f86e] {
  height: 1.5vw !important;
  line-height: 1.2vw !important;
}

.nav-name-right[data-v-1931f86e] {
  line-height: 1vw !important;
}

.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: #2f73c0;
}
</style>
