<template>
    <div class="navbar">
        <hamburger v-show="isShow" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <!-- <breadcrumb class="breadcrumb-container" /> -->
        <span class="breadcrumb-container">智慧档案馆管理总平台{{ systemName }}</span
            >
            <div class="right-menu">
              <span>您好！</span>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <h2>admin</h2>
                <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar"> -->
                <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown" style="top: 45px">
                <router-link to="/">
                    <el-dropdown-item> 修改密码 </el-dropdown-item>
                </router-link>
                <!-- <a target="_blank" href="www.baidu.com">
                    <el-dropdown-item>版本升级</el-dropdown-item>
                </a>
                <a target="_blank" href="www.baidu.com">
                    <el-dropdown-item>账户注销</el-dropdown-item>
                </a> -->
                <el-dropdown-item divided @click.native="logout">
                    <span style="display: block">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <img v-show="isShowBack" src="../../assets/btnMGoBack.png" style="width: 2vw; margin-right: 1vw" alt="" @click="GoHome()" />
        <img src="../../assets/btnMSet.png" style="width: 2vw; margin-right: 1vw" alt="" @click="setting()" />
        <img src="../../assets/btnMSX.png" style="width: 2vw; margin-right: 1vw" alt="" @click="toFullOrExit()" />
        <img src="../../assets/btnMClose.png" style="width: 2vw; margin-right: 1vw" alt="" @click="logout()" />
        <!-- <i class="el-icon-s-home"  /> -->
        <el-dialog title="库房管理" width="80%" top="10vh" center :visible.sync="isShowSetting" @close="dialogClose()">
            <div style="display:flex;">
                <div  style="border-right:1px dotted #000;">
                    <div style="width:100%;background:rgb(42,103,205);text-align:center;color: #fff;font-size:1vw;">库房</div>
                    <vue-context-menu style="width: 11vw; background: #eee" :contextMenuData="contextMenuData" @addFLVueContextMenu="addFLVueContextMenu" @deleteVueContextMenu="deleteVueContextMenu" @amendVueContextMenu="amendVueContextMenu"></vue-context-menu>
                    <div  @contextmenu="showMenu">
                        <el-tree :data="KFList" :props="defaultProps" style="background:#fff;color:#000; width:8vw;margin-top:1vw;" highlight-current @node-click="handleNodeClick"></el-tree>
                    </div>
                    <el-dialog width="30%" title="库房信息编辑" :visible.sync="innerVisible" append-to-body>
                        <el-form>
                            <el-form-item label="库房名称：" :label-width="formLabelWidth">
                                <el-input v-model="KFname" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="库房代码：" :label-width="formLabelWidth">
                                <el-input v-model="KFcode" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer" style="text-aline: center">
                            <el-button @click="innerVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submitKF()">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog width="30%" title="库房信息编辑" :visible.sync="innerVisible2" append-to-body>
                        <el-form>
                            <el-form-item label="库房名称：" :label-width="formLabelWidth">
                                <el-input v-model="KFname2" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="库房代码：" :label-width="formLabelWidth">
                                <el-input v-model="KFcode2" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer" style="text-aline: center">
                            <el-button @click="innerVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="submitKF2()">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div style="margin-left:.5vw;">
                    <el-tabs style="width: 66vw" v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="库房环境" name="1">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_add()">添加</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_amend()">修改</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="danger" @click="KFHJ_delete()">删除</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_deviceGL()">设备管理</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_relevancy()">关联摄像头</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_test()">测试连通</el-button>
                                </div>
                            </div>
                            <el-table @select-all="handleSelectKFHJ" :data="storeEnvironmentList" @selection-change="SelectionChangeKFHJ" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                                <el-table-column prop="address" label="通信地址" align="center"></el-table-column>
                                <el-table-column prop="port" label="通信端口" align="center"></el-table-column>
                                <el-table-column prop="type" label="类型" align="center"></el-table-column>
                                <el-table-column prop="recordTime" label="记录时间" align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="视频监控" name="2">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="SPJK_add()">添加</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="SPJK_amend()">修改</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="danger" @click="SPJK_delete()">删除</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="SPJK_VCR()">录像机</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="SPJK_camera()">摄像头</el-button>
                                </div>
                            </div>
                            <el-table @select-all="handleSelectSPJK" :data="videoSurveillanceList" @selection-change="SelectionChangeSPJK" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="type" label="类型" align="center"></el-table-column>
                                <el-table-column prop="name" label="摄像头名称" align="center"></el-table-column>
                                <el-table-column prop="address" label="IP地址" align="center"></el-table-column>
                                <el-table-column prop="port" label="端口" align="center"></el-table-column>
                                <el-table-column prop="number" label="通道号" align="center"></el-table-column>
                                <el-table-column prop="time" label="时间" align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="门禁机" name="3">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="MJKQJ_add()">添加</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="MJKQJ_amend()">修改</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="MJKQJ_userManage()">用户管理</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="danger" @click="MJKQJ_delete()">删除</el-button>
                                </div>
                            </div>
                            <el-table @select-all="handleSelectMJKQJ" :data="MJKQJList" @selection-change="SelectionChangeMJKQJ" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="type" label="类型" align="center"></el-table-column>
                                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                                <el-table-column prop="address" label="通信地址" align="center"></el-table-column>
                                <el-table-column prop="port" label="通信端口" align="center"></el-table-column>
                                <el-table-column prop="password" label="通信密码" align="center"></el-table-column>
                                <el-table-column prop="JNumber" label="设备机号" align="center"></el-table-column>
                                <el-table-column prop="recordTime" label="记录时间" align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="档案参数设置" name="4">
                            <div style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">单据打印机设置</el-divider>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">打 印 机 ： </span>
                                    <el-select v-model="printValue" clearable placeholder="请选择">
                                        <el-option v-for="item in printOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">纸张大小：</span>
                                    <el-select v-model="sizeValue" clearable placeholder="请选择">
                                        <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">条码打印机设置</el-divider>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">打 印 机 ： </span>
                                    <el-select v-model="TMprintValue" clearable placeholder="请选择">
                                        <el-option v-for="item in TMprintOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">标签大小：</span>
                                    <el-select v-model="TMsizeValue" clearable placeholder="请选择">
                                        <el-option v-for="item in TMsizeOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">RFID工作站设置</el-divider>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">串口 ： </span>
                                    <el-select v-model="serialPortValue" clearable placeholder="请选择">
                                        <el-option v-for="item in serialPortOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span style="color:#000;font-size:1vw;margin-left:1vw;">协议：</span>
                                    <el-select v-model="agreementValue" clearable placeholder="请选择">
                                        <el-option v-for="item in agreementOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">RFID标签打印机设置</el-divider>
                                <div style="margin-left:2vw;">
                                    <el-input placeholder="请输入IP地址" style="width:16vw;" v-model="PrintSetIPinput" clearable>
                                        <template slot="prepend">IP地址：</template>
                                    </el-input>
                                    <el-input placeholder="请输入端口" style="margin-left: 1vw; width:16vw;" v-model="PrintSetPortinput" clearable>
                                        <template slot="prepend">端口：</template>
                                    </el-input>
                                </div>
                            </div>
                            <div style="display: flex;align-items: center;justify-content: center;">
                                <el-button type="primary" style="margin-top:.5vw;" @click="apply()">应用</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="密集架设置" name="5">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_add()">添 加</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_search()">查 询</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="success" size="mini" @click="MJJ_export()">导 出</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_barCodeManage()">层架条码管理</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_filterReset()">滤网复位</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_relevancy()">关联摄像头</el-button>
                                </div>
                            </div>
                            <el-table @select-all="handleSelectMJJ" :data="MJJSetList" @selection-change="SelectionChangeMJJ" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="type" label="密集架类型" width="100" align="center"></el-table-column>
                                <el-table-column prop="Knumber" label="库号" width="130" align="center"></el-table-column>
                                <el-table-column prop="Qnumber" label="区号" align="center"></el-table-column>
                                <el-table-column prop="Qname" label="区名称" align="center"></el-table-column>
                                <el-table-column prop="Lno" label="列数" align="center"></el-table-column>
                                <el-table-column prop="Jno" label="节数" align="center"></el-table-column>
                                <el-table-column prop="Cno" label="层数" align="center"></el-table-column>
                                <el-table-column prop="capacity" label="每格容量" width="100" align="center"></el-table-column>
                                <el-table-column prop="GLno" label="固定列号" align="center"></el-table-column>
                                <el-table-column prop="GLip" label="固定列IP" align="center"></el-table-column>
                                <el-table-column prop="GLport" label="固定列端口" width="100" align="center"></el-table-column>
                                <el-table-column prop="QSLno" label="起始列号" align="center"></el-table-column>
                                <el-table-column prop="QSLRule" label="起始列规则" width="100" align="center"></el-table-column>
                                <el-table-column prop="admin" label="用户名" align="center"></el-table-column>
                                <el-table-column prop="password" label="密码" align="center"></el-table-column>
                                <el-table-column prop="people" label="录入人" align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="通道门设置" name="6">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="TDM_add()">添 加</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="TDM_relevancy()">关联摄像头</el-button>
                                </div>
                            </div>
                            <el-table @select-all="handleSelectTDM" :data="TDMList" @selection-change="SelectionChangeTDM" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="number" label="编号" align="center"></el-table-column>
                                <el-table-column prop="name" label="通道门名称" align="center"></el-table-column>
                                <el-table-column prop="ip" label="IP" align="center"></el-table-column>
                                <el-table-column prop="port" label="端口" width="100" align="center"></el-table-column>
                                <el-table-column prop="people" label="录入人" align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </el-dialog>
    </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import axios from "axios";

export default {
    components: {
        Breadcrumb,
        Hamburger,
    },
    data() {
        return {
            isShow: true, //是否展示
            isShowBack: true, //是否展示返回
            systemName: "",
            activeName: "1", //在借档案tabs
            isShowSetting: false, //设置弹框显示
            innerVisible:false,//添加库房的小弹框
            KFname:'',
            KFcode:'',
            innerVisible2:false,//修改的小弹框
            KFname2:'',
            KFcode2:'',
             formLabelWidth: "100px",
             tempKFaxiosData:[],//点击左侧库房列表存放数据
            //在借档案盒tab
            FileonloanTable: [{
                date: "1",
                name: "在借档号盒1",
                address: "在借档号盒1",
            }, ],
            //在借档案tab
            borrowingfilebox: [{
                date: "1",
                name: "在借档案1",
                address: "在借档案1",
            }, ],
            zaijielishi: [], //
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
                        fnHandler: "addFLVueContextMenu",
                        btnName: "添加",
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
            KFList: [{
                    label: "演示库房 1",
                    children: [{
                        label: "二级 1-1",
                        children: [{
                            label: "三级 1-1-1",
                        }, ],
                    }, ],
                },
                {
                    label: "演示库房 2",
                    children: [{
                            label: "二级 2-1",
                            children: [{
                                label: "三级 2-1-1",
                            }, ],
                        },
                        {
                            label: "二级 2-2",
                            children: [{
                                label: "三级 2-2-1",
                            }, ],
                        },
                    ],
                },
                {
                    label: "演示库房 3",
                    children: [{
                            label: "二级 3-1",
                            children: [{
                                label: "三级 3-1-1",
                            }, ],
                        },
                        {
                            label: "二级 3-2",
                            children: [{
                                label: "三级 3-2-1",
                            }, ],
                        },
                    ],
                },
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
            storeEnvironmentList: [{
                name: '区域控制器',
                address: '172.16.17.120',
                port: '3000',
                type: '普通控制器',
                recordTime: '2023-10-09',
            }, {
                name: '区域控制器',
                address: '172.16.17.120',
                port: '3000',
                type: '普通控制器',
                recordTime: '2023-10-09',
            }, {
                name: '区域控制器',
                address: '172.16.17.120',
                port: '3000',
                type: '普通控制器',
                recordTime: '2023-10-09',
            }, {
                name: '区域控制器',
                address: '172.16.17.120',
                port: '3000',
                type: '普通控制器',
                recordTime: '2023-10-09',
            }],
            videoSurveillanceList: [{
                type: '海康威视',
                name: '因朵摄像头',
                address: '172.16.17.120',
                port: '8000',
                number: 1,
                time: '2023-10-09',
            }, {
                type: '海康威视',
                name: '因朵摄像头',
                address: '172.16.17.120',
                port: '8000',
                number: 2,
                time: '2023-10-09',
            }, {
                type: '海康威视',
                name: '因朵摄像头',
                address: '172.16.17.120',
                port: '8000',
                number: 3,
                time: '2023-10-09',
            }, {
                type: '海康威视',
                name: '因朵摄像头',
                address: '172.16.17.120',
                port: '8000',
                number: 4,
                time: '2023-10-09',
            }],
            MJKQJList: [{
                    type: '海康威视',
                    name: '海康',
                    address: '172.16.17.120',
                    port: '8000',
                    password: 1,
                    JNumber: '2023-10-09',
                    recordTime: '2023-10-09',
                },
                {
                    type: '海康威视',
                    name: '海康',
                    address: '172.16.17.120',
                    port: '8000',
                    password: 1,
                    JNumber: '2023-10-09',
                    recordTime: '2023-10-09',
                },
                {
                    type: '海康威视',
                    name: '海康',
                    address: '172.16.17.120',
                    port: '8000',
                    password: 1,
                    JNumber: '2023-10-09',
                    recordTime: '2023-10-09',
                },
                {
                    type: '海康威视',
                    name: '海康',
                    address: '172.16.17.120',
                    port: '8000',
                    password: 1,
                    JNumber: '2023-10-09',
                    recordTime: '2023-10-09',
                },
                {
                    type: '海康威视',
                    name: '海康',
                    address: '172.16.17.120',
                    port: '8000',
                    password: 1,
                    JNumber: '2023-10-09',
                    recordTime: '2023-10-09',
                },
            ],
                printOptions: [{
                value: '选项1',
                label: '导出为WPS PDF'
                }, {
                value: '选项2',
                label: 'OneNote(Desktop)'
                }, {
                value: '选项3',
                label: 'ToDesk Printer'
                }, {
                value: '选项4',
                label: 'Microsoft XPS Document Writer'
                }, {
                value: '选项5',
                label: 'Microsoft Print to PDF'
                },{
                value: '选项6',
                label: 'HWSealPrinter'
                },{
                value: '选项7',
                label: 'HP582219 (HP OfficeJet Pro 7730 series)'
                },{
                value: '选项8',
                label: 'Fax'
                },
            ],
            printValue:'',
            sizeOptions: [{
                value: '选项1',
                label: 'A4'
            }],
            sizeValue:'A4',
             TMprintOptions: [{
                value: '选项1',
                label: '导出为WPS PDF'
                }, {
                value: '选项2',
                label: 'OneNote(Desktop)'
                }, {
                value: '选项3',
                label: 'ToDesk Printer'
                }, {
                value: '选项4',
                label: 'Microsoft XPS Document Writer'
                }, {
                value: '选项5',
                label: 'Microsoft Print to PDF'
                },{
                value: '选项6',
                label: 'HWSealPrinter'
                },{
                value: '选项7',
                label: 'HP582219 (HP OfficeJet Pro 7730 series)'
                },{
                value: '选项8',
                label: 'Fax'
                },
            ],
            TMprintValue:'',
            TMsizeOptions: [{
                value: '选项1',
                label: '50 X 25'
            }],
            TMsizeValue:'50 X 25',

            serialPortOptions: [{
                value: '选项1',
                label: 'COM1'
            }],
            serialPortValue:'COM1',

            
            agreementOptions: [{
                value: '选项1',
                label: '一代协议'
            },{
                value: '选项2',
                label: '二代协议'
            }
        ],
            agreementValue:'二代协议',
            PrintSetIPinput:'10.168.1.205',
            PrintSetPortinput:'9100',
            MJJSetList: [{
                    type: '海康威视',
                    Knumber: '172.16.17.111',
                    Qnumber: '8000',
                    Qname: '因朵四楼',
                    Lno: '1',
                    Jno: '2',
                    Cno: '3',
                    capacity: '9',
                    GLno: '20',
                    GLip: '172.16.17.120',
                    GLport: '9000',
                    QSLno: '1',
                    QSLRule: '从左到右',
                    admin: 'admin',
                    password: '123456',
                    people: 'admin',
                },
                {
                    type: '海康威视',
                    Knumber: '172.16.17.111',
                    Qnumber: '8000',
                    Qname: '因朵四楼',
                    Lno: '1',
                    Jno: '2',
                    Cno: '3',
                    capacity: '9',
                    GLno: '20',
                    GLip: '172.16.17.120',
                    GLport: '9000',
                    QSLno: '1',
                    QSLRule: '从左到右',
                    admin: 'admin',
                    password: '123456',
                    people: 'admin',
                },
                {
                    type: '海康威视',
                    Knumber: '172.16.17.111',
                    Qnumber: '8000',
                    Qname: '因朵四楼',
                    Lno: '1',
                    Jno: '2',
                    Cno: '3',
                    capacity: '9',
                    GLno: '20',
                    GLip: '172.16.17.120',
                    GLport: '9000',
                    QSLno: '1',
                    QSLRule: '从左到右',
                    admin: 'admin',
                    password: '123456',
                    people: 'admin',
                },
                {
                    type: '海康威视',
                    Knumber: '172.16.17.111',
                    Qnumber: '8000',
                    Qname: '因朵四楼',
                    Lno: '1',
                    Jno: '2',
                    Cno: '3',
                    capacity: '9',
                    GLno: '20',
                    GLip: '172.16.17.120',
                    GLport: '9000',
                    QSLno: '1',
                    QSLRule: '从左到右',
                    admin: 'admin',
                    password: '123456',
                    people: 'admin',
                },
            ],
            TDMList: [{
                    number: '11',
                    name: '因朵四楼通道门',
                    ip: '172.16.17.120',
                    port: '9000',
                    people: 'admin',
                },
                {
                    number: '12',
                    name: '因朵一楼通道门',
                    ip: '172.16.17.120',
                    port: '9000',
                    people: 'admin',
                },
                {
                    number: '13',
                    name: '因朵二楼通道门',
                    ip: '172.16.17.120',
                    port: '9000',
                    people: 'admin',
                },
                {
                    number: '14',
                    name: '因朵三楼通道门',
                    ip: '172.16.17.120',
                    port: '9000',
                    people: 'admin',
                },
                {
                    number: '15',
                    name: '因朵四楼通道门',
                    ip: '172.16.17.122',
                    port: '9000',
                    people: 'admin',
                },
            ],
        };
    },
     computed: {
  },
    computed: {
        ...mapGetters(["sidebar", "avatar"]),
        routes() {
            // return this.$router.options.routes
            return this.$route.path;
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
                console.log(newVal, "newVal导航导航导航");
                console.log(oldVal, "oldVal---导航");
                if (newVal == "/home") {
                    this.isShow = false;
                    // this.$router.go(0)
                } else {
                    this.isShow = true;
                    // this.$router.go(0)
                }
            },
        },
    },
    created() {
        console.log(this.sidebar, "this.sidebar");
        console.log(this.$route.path, "this.$route.paththis.$route.path");
        if (this.$route.path == "/home") {
            this.isShow = false;
        } else if (this.$route.path == "/form") {} else if (this.$route.path == "/example/environmentMonitor") {
            this.isShow = false;
            this.systemName = " ● 智能环境监控系统";
        } else if (this.$route.path == "/example/table") {
            this.systemName = " ● 库房档案管理系统";
        } else if (this.$route.path == "/example/DenseFrameControl") {
            this.systemName = " ● 智能密集架控制系统";
        } else if (this.$route.path == "/example/videoSurveillance") {
            this.systemName = " ● 智能视频监控系统";
        } else if (this.$route.path == "/example/EightPrevention") {
            this.systemName = " ● 智能十防感知系统";
        } else if (this.$route.path == "/example/intelligentDoor") {
            this.isShow = false;
            this.systemName = " ● 智能指纹门禁系统";
        } else if (this.$route.path == "/example/intelligentLight") {
            this.isShow = false;
            this.systemName = " ● 智能灯光控制系统";
        } else if (this.$route.path == "/example/WarehouseNavigate") {
            this.isShow = false;
            this.systemName = " ● 智能库房布局系统";
        }
    },
    methods: {
        toggleSideBar() {
            console.log("toggleSideBar~~~~~~~~~~~~~~~~~~~~~~~~~~");
            this.$store.dispatch("app/toggleSideBar");
        },
        logout() {
            this.$store.dispatch("user/logout");
            this.$router.push(`/login`);
            // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            setTimeout(() => {
                this.$router.push(`/login`);
                this.$router.go(0);
            }, 100);
    
            sessionStorage.clear()

        },
        GoHome() {
            this.$router.push(`/home`);
        },
        setting() {//设置
            this.isShowSetting = true;
            this.getKFList();


        },
        getKFList(){
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetStoresForLeftMenu', JSON.parse('{}')).then(
            success => {
                // console.log(success, '获取库房列表接口-成功');
                // console.log(success.data.data, '11111111');
                this.KFList=[];
                this.KFList=success.data.data;
            },
            error => {
                console.log(error, '获取库房列表接口--返回失败的数据');
            })

        },
        dialogClose(){
             this.KFList=[];
        },
        requestFullScreen() {
            //全屏
            let de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        },
        exitFullscreen() {
            //退出全屏
            let de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        },
        toFullOrExit() {
            //全屏/退出全屏
            this.isFull = !this.isFull;
            if (this.isFull) {
                this.requestFullScreen();
            } else {
                this.exitFullscreen();
            }
        },
        danganyuqi() {},
        handleNodeClick(data) {
            console.log(data, "点击了data");
            this.tempKFaxiosData=data;

        },
        handleClick(tab, event) {
            console.log(tab, event, "tab切换");
        },
        handleSelectKFHJ() { //库房环境选中所有
            console.log('库房环境选中所有');
        },
        SelectionChangeKFHJ() { //库房环境--选中
            console.log('库房环境--选中');
        },
        handleSelectSPJK() { //SPJK选中所有
            console.log('SPJK选中所有');
        },
        SelectionChangeSPJK() { //SPJK--选中
            console.log('SPJK--选中');
        },
        handleSelectMJKQJ() { //门禁机--选中所有
            console.log('门禁机--选中所有');
        },
        SelectionChangeMJKQJ() { //门禁机----选中
            console.log('门禁机----选中');
        },
        handleSelectMJJ() { //密集架设置--选中所有
            console.log('密集架设置--选中所有');
        },
        SelectionChangeMJJ() { //密集架设置----选中
            console.log('密集架设置----选中');
        },
        handleSelectTDM() { //通道门设置--选中所有
            console.log('通道门设置--选中所有');
        },
        SelectionChangeTDM() { //通道门设置----选中
            console.log('通道门设置----选中');
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
        addFLVueContextMenu(){
            console.log('添加库房');
            this.innerVisible=true;
            this.KFname='';
            this.KFcode='';

        },
        amendVueContextMenu(){
            console.log(this.tempKFaxiosData,'当前要修改库房的数据');
            console.log('修改库房');
          
            this.innerVisible2=true;
            this.KFname2=this.tempKFaxiosData.label;

        },
        deleteVueContextMenu(){
            console.log(this.tempKFaxiosData,'122121212121212112');
            var StoreId =this.tempKFaxiosData.id;
            console.log(StoreId,'StoreId删除库房');
            if (this.tempKFaxiosData.length == 0) {
                this.$notify.error({
                title: '错误提示',
                message: "请选择库房",
                offset: 100,
                duration: 2000
                });
                return;
            }

            this.$confirm("将要删除该库房" + ", 是否继续?", "删除", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
            axios.get('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/delete?id='+StoreId).then(
                success => {
                    console.log(success);
                    if(success.data.code==666) {
                        this.$notify.error({
                        title: '错误提示',
                        message: success.data.message,
                        offset: 100,
                        duration: 2000
                        });
                        return;
                    }
                    this.$notify.success({
                        title: '提示',
                        message: success.data.message,
                        offset: 100,
                        duration: 1000
                        });
                    this.getKFList();
                },
                error => {
                    this.$notify.error({
                        title: '错误提示',
                        message: error,
                        offset: 100,
                        duration: 2000
                        });
                        return;
                })
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除",
            });
            });
            
        },
        apply(){
            this.$message.success("应用");
        },
        submitKF() {//添加库房
            var StoreId =this.KFcode;
            var StoreName =this.KFname;
            var StoreNewName =this.KFname;
            var reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
            if (!reg.test(StoreNewName)) {
                this.$notify.error({
                title: '错误提示',
                message: "不能输入特殊字符",
                offset: 100,
                duration: 2000
                });
                return;
            }
            if (StoreNewName == "") {
                this.$notify.error({
                title: '错误提示',
                message: "名称不能为空，请输入分类名称",
                offset: 100,
                duration: 2000
                });
                return;
            }
            if (StoreId ==  "") {
                    this.$notify.error({
                    title: '错误提示',
                    message: "库房代码不能为空，请输入代码",
                    offset: 100,
                    duration: 2000
                    });
                    return;
                }
            var jsonData = {
                "storeName": StoreNewName,
                "storeCode": "1"
            }
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/save', jsonData).then(
                success => {
                    if(success.data.code==666)
                    {
                        this.$notify.success({
                        title: '错误提示',
                        message: success.data.message,
                        offset: 100,
                        duration: 2000
                        });
                        return;
                    }
                    this.$notify.success({
                        title: '添加成功',
                        message: success.data.message,
                        offset: 100,
                        duration: 1000
                        });
                        this.getKFList();
                        this.innerVisible=false;
                },
                error => {
                    this.$notify.error({
                        title: '错误提示',
                        message: error,
                        offset: 100,
                        duration: 2000
                        });
                        return;
                })
        },
        submitKF2(){//修改库房
            var StoreId =this.tempKFaxiosData.id;
            var StoreName =this.KFname2;
            var StoreNewName =this.KFname2;
              if (this.tempKFaxiosData.length == 0) {
                this.$notify.error({
                title: '错误提示',
                message: "请选择库房",
                offset: 100,
                duration: 2000
                });
                return;
            }
            if (StoreNewName == "") {
                    this.$notify.error({
                    title: '错误提示',
                    message: "名称不能为空，请输入名称",
                    offset: 100,
                    duration: 2000
                    });
                    return;
                }
                if (StoreId ==  "") {
                    this.$notify.error({
                    title: '错误提示',
                    message: "库房代码不能为空，请输入代码",
                    offset: 100,
                    duration: 2000
                    });
                    return;
                }
                var jsonData = {
                    "StoreId": StoreId,
                    "storeName":StoreNewName,
                    "storeCode":this.KFcode2,
                }
                axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/update', jsonData).then(
                success => {
                    console.log(success,'111111111111111111111111`````````````````');
                    if(success.data.code==666)
                    {
                        this.$notify.error({
                        title: '错误提示',
                        message: success.data.message,
                        offset: 100,
                        duration: 2000
                        });
                        return;
                    }
                    this.$notify.success({
                        title: '提示',
                        message: success.data.message,
                        offset: 100,
                        duration: 1000
                        });
                        this.getKFList();
                        this.innerVisible2=false;
                },
                error => {
                    this.$notify.error({
                        title: '错误提示',
                        message: error,
                        offset: 100,
                        duration: 2000
                        });
                        return;
                })
        },
        KFHJ_test(){this.$message.success("库房环境--测试连通")},
        KFHJ_relevancy(){this.$message.success("库房环境--关联摄像头")},
        KFHJ_deviceGL(){this.$message.success("库房环境--设备管理")},
        KFHJ_delete(){this.$message.success("库房环境--删除")},
        KFHJ_amend(){this.$message.success("库房环境--修改")},
        KFHJ_add(){this.$message.success("库房环境--添加")},

        SPJK_camera(){this.$message.success("视频监控--摄像头")},
        SPJK_VCR(){this.$message.success("视频监控--录像机")},
        SPJK_delete(){this.$message.success("视频监控--删除")},
        SPJK_amend(){this.$message.success("视频监控--修改")},
        SPJK_add(){this.$message.success("视频监控--添加")},
        
        MJKQJ_userManage(){this.$message.success("门禁机--用户管理")},
        MJKQJ_delete(){this.$message.success("门禁机--删除")},
        MJKQJ_amend(){this.$message.success("门禁机--修改")},
        MJKQJ_add(){this.$message.success("门禁机--添加")},
        
        MJJ_relevancy(){this.$message.success("密集架设置--关联摄像头")},
        MJJ_filterReset(){this.$message.success("密集架设置--滤网复位")},
        MJJ_barCodeManage(){this.$message.success("密集架设置--层架条码管理")},
        MJJ_export(){this.$message.success("密集架设置--导出")},
        MJJ_search(){this.$message.success("密集架设置--查询")},
        MJJ_add(){this.$message.success("密集架设置--添加")},
        
        TDM_relevancy(){this.$message.success("通道门设置--关联摄像头")},
        TDM_add(){this.$message.success("通道门设置--添加")},
    },
};
</script>
<style lang="scss" scoped>
.navbar {
    height: 5vh;
    overflow: hidden;
    position: relative; // background: #fff;
    background: url("../../assets/welcom_bg.png");
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .hamburger-container {
        line-height: 2.8vw; //左侧伸缩按钮
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
        color: #fff;
        &:hover {
            // background: rgba(0, 0, 0, .025)
            background: rgba(250, 250, 250, 0.025);
        }
    }
    .breadcrumb-container {
        float: left;
        font-size: 1.2vw;
        line-height: 2.8vw;
        color: #fff;
    }
    .right-menu {
        float: right;
        height: 100%;
        line-height: 5vh;
        display: flex;
        align-items: center;
        span {
            color: #fff;
            font-size: 20px;
        }
        &:focus {
            outline: none;
        }
        .el-icon-s-home {
            cursor: pointer;
            font-size: 1.4vw;
            color: #fff;
            margin-right: 1vw;
        }
        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66; // color: #fff;;
            vertical-align: text-bottom;
            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;
                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }
        .avatar-container {
            margin-right: 3vw;
            .avatar-wrapper {
                margin-top: 5px;
                position: relative;
                color: #fff;
                .user-avatar {
                    cursor: pointer;
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 0.8vw;
                    font-size: 18px;
                }
            }
        }
    }
}
.Modeldesign {
    width: 100%;
    height: 6vh;
    display: flex;
    align-items: center;
}
.el-dropdown-menu el-popper user-dropdown {
    top: 56px !important;
}
</style>
