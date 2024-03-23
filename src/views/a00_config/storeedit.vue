<!-- 库房管理   页面 -->
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
                <!-- <el-breadcrumb-item>系统设置</el-breadcrumb-item> -->
                <el-breadcrumb-item>库房管理</el-breadcrumb-item>
            </el-breadcrumb></el-header>
        <el-container style="height: calc(100vh - 120px);">
            <!-- <i class="el-icon-s-home"  /> -->
            <!-- <el-dialog title="库房管理" width="80%" top="10vh" center :visible.sync="isShowSetting" @close="dialogClose()"> -->
            <div style="display:flex;">
                <div>
                    <el-header style="text-align: left; border-radius:12px 12px 0 0;">
                        <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png" />
                        <span
                            style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:1vw;line-height: 100%;padding-left: 10px;">库房列表</span>
                    </el-header>
                    <div style="border: 1px solid rgb(103, 146, 240);height:33.8vw;">
                        <vue-context-menu style="width: 15vw; background: #eee" :contextMenuData="contextMenuData"
                            @addFLVueContextMenu="addFLVueContextMenu" @deleteVueContextMenu="deleteVueContextMenu"
                            @amendVueContextMenu="amendVueContextMenu"></vue-context-menu>
                        <div @contextmenu="showMenu">
                            <el-tree :data="KFList" :props="defaultProps"
                                style=" background:#fff;color:#000; width:8vw;margin-top:1vw;" highlight-current
                                @node-click="handleNodeClick"></el-tree>
                        </div>
                    </div>

                    <el-dialog width="30%" title="新增库房信息" :visible.sync="innerVisible" append-to-body>
                        <el-form>
                            <el-form-item label="库房名称：" :label-width="formLabelWidth">
                                <el-input v-model="KFname" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="库房代码：" :label-width="formLabelWidth">
                                <el-input-number class="kfcode" v-model="KFcode" controls-position="right" :min="1"
                                    :max="100"></el-input-number>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer" style="text-aline: center">
                            <el-button @click="innerVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submitKF()">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog width="30%" title="编辑库房信息" :visible.sync="innerVisible2" append-to-body>
                        <el-form>
                            <el-form-item label="库房名称：" :label-width="formLabelWidth">
                                <el-input v-model="KFname2" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="库房代码：" :label-width="formLabelWidth">
                                <el-input-number class="kfcode" v-model="KFcode2" controls-position="right" :min="1"
                                    :max="100"></el-input-number>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer" style="text-aline: center">
                            <el-button @click="innerVisible2 = false">取 消</el-button>
                            <el-button type="primary" @click="submitKF2()">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div style="margin-left:.5vw;">
                    <el-tabs style="width: 88vw" v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="库房环境" name="1">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_add()">添加</el-button>
                                    <el-dialog width="30%" title="添加库房控制器" :visible.sync="acs_add_Visible" append-to-body>
                                        <el-form :model="acs_add">

                                            <el-form-item label="库房索引：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_add.StoreId" placeholder="请选择列表"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="库房名称：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_add.StoreName" placeholder="请选择列表"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="设备索引：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_add.ACId" placeholder="请输入索引"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="名称：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_add.ACName" placeholder="请输入名称"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="IP地址：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_add.HostName" placeholder="请输入IP地址"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="端口：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_add.HttpPort" placeholder="请输入端口"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="类型" :label-width="formLabelWidth">
                                                <el-select v-model="acs_add.AcLx" placeholder="请选择">
                                                    <el-option label="区域控制器" value="1"></el-option>
                                                    <el-option label="十防控制器" value="2"></el-option>
                                                    <el-option label="库房控制器" value="3"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer" style="text-aline: center">
                                            <el-button @click="acs_add_Visible = false">取 消</el-button>
                                            <el-button type="primary" @click="addacs()">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_amend()">修改</el-button>
                                    <el-dialog width="30%" title="修改库房控制器" :visible.sync="acs_edit_Visible" append-to-body>
                                        <el-form :model="acs_edit">

                                            <el-form-item label="库房索引：" :label-width="formLabelWidth">
                                                <el-tag type="danger" style="width: 100%;">{{ acs_edit.StoreId }}</el-tag>
                                            </el-form-item>
                                            <el-form-item label="库房名称：" :label-width="formLabelWidth">
                                                <el-tag type="danger" style="width: 100%;">{{ acs_edit.StoreName }}</el-tag>
                                            </el-form-item>
                                            <el-form-item label="设备索引：" :label-width="formLabelWidth">
                                                <el-tag type="danger" style="width: 100%;">{{ acs_edit.ACId }}</el-tag>
                                            </el-form-item>
                                            <el-form-item label="名称：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_edit.ACName" placeholder="请输入名称"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="IP地址：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_edit.HostName" placeholder="请输入IP地址"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="端口：" :label-width="formLabelWidth">
                                                <el-input v-model="acs_edit.HttpPort" placeholder="请输入端口"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="类型" :label-width="formLabelWidth">
                                                <el-select v-model="acs_edit.AcLx" placeholder="请选择">
                                                    <el-option label="区域控制器" value="1"></el-option>
                                                    <el-option label="十防控制器" value="2"></el-option>
                                                    <el-option label="库房控制器" value="3"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer" style="text-aline: center">
                                            <el-button @click="acs_edit_Visible = false">取 消</el-button>
                                            <el-button type="primary" @click="editacs()">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="danger" @click="KFHJ_delete()">删除</el-button>
                                </div>
                                <!-- <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_deviceGL()">设备管理</el-button>
                                </div> -->
                                <!-- <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_relevancy()">关联摄像头</el-button>
                                </div> -->
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="ceshiyemian()">测试密集架页面</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="KFHJ_test()">测试连通</el-button>
                                </div>
                            </div>
                            <el-table height="600" @select-all="handleSelectKFHJ" :data="storeEnvironmentList"
                                @selection-change="SelectionChangeKFHJ" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="acname" label="名称" align="center"></el-table-column>
                                <el-table-column prop="hostname" label="通信地址" align="center"></el-table-column>
                                <el-table-column prop="httpport" label="通信端口" align="center"></el-table-column>
                                <el-table-column prop="aclx" label="类型" align="center"></el-table-column>
                                <el-table-column :formatter="KFtimer" prop="createtime" label="记录时间"
                                    align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="视频监控" name="2">
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
                            <el-table height="600" @select-all="handleSelectSPJK" :data="videoSurveillanceList"
                                @selection-change="SelectionChangeSPJK" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="CameraType" label="类型" align="center"></el-table-column>
                                <el-table-column prop="CameraName" label="摄像头名称" align="center"></el-table-column>
                                <el-table-column prop="HostName" label="IP地址" align="center"></el-table-column>
                                <el-table-column prop="HttpPort" label="端口" align="center"></el-table-column>
                                <el-table-column prop="Channel1" label="通道号" align="center"></el-table-column>
                                <el-table-column prop="CreateTime" label="时间" align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane> -->
                        <el-tab-pane label="门禁机" name="3">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="MJKQJ_add()">添加</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="MJKQJ_amend()">修改</el-button>
                                </div>
                                <!-- <div style="margin-left: 1vw">
                                    <el-button type="primary" @click="MJKQJ_userManage()">用户管理</el-button>
                                </div> -->
                                <div style="margin-left: 1vw">
                                    <el-button type="danger" @click="MJKQJ_delete()">删除</el-button>
                                </div>
                            </div>
                            <el-table height="600" @select-all="handleSelectMJKQJ" :data="MJKQJList"
                                @selection-change="SelectionChangeMJKQJ" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="did" label="类型ID" align="center"></el-table-column>
                                <el-table-column prop="dtype" label="类型" align="center"></el-table-column>
                                <el-table-column prop="dname" label="名称" align="center"></el-table-column>
                                <el-table-column prop="dip" label="通信地址" align="center"></el-table-column>
                                <el-table-column prop="dport" label="通信端口" align="center"></el-table-column>
                                <el-table-column prop="dpwd" label="通信密码" align="center"></el-table-column>
                                <el-table-column prop="machinenumber" label="设备机号" align="center"></el-table-column>
                                <el-table-column :formatter="MJJtimer" prop="dcreatetime" label="记录时间"
                                    align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="档案参数设置" name="4">
                            <!-- <div
                                style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">单据打印机设置</el-divider>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">打 印 机 ： </span>
                                    <el-select v-model="printValue" clearable placeholder="请选择">
                                        <el-option v-for="item in printOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">纸张大小：</span>
                                    <el-select v-model="sizeValue" clearable placeholder="请选择">
                                        <el-option v-for="item in sizeOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div
                                style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">条码打印机设置</el-divider>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">打 印 机 ： </span>
                                    <el-select v-model="TMprintValue" clearable placeholder="请选择">
                                        <el-option v-for="item in TMprintOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">标签大小：</span>
                                    <el-select v-model="TMsizeValue" clearable placeholder="请选择">
                                        <el-option v-for="item in TMsizeOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div> -->

                            <!-- YJJ -->
                            <div
                                style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">RFID打印机设置</el-divider>
                                        <!-- yjj -->
                                        <div style="margin-left:2vw;">
                                    <el-input placeholder="请输入" style="width:20vw;" v-model="px" clearable>
                                        <template slot="prepend">左侧距离：</template>
                                    </el-input>
                                    <el-input placeholder="请输入" style="margin-left: 1vw; width:22vw;"
                                        v-model="py" clearable>
                                        <template slot="prepend">顶部距离：</template>
                                    </el-input>
                                </div>
                                <!-- yjj -->
                                <div style="margin-left:2vw;">
                                    <el-input placeholder="请输入IP地址" style="width:20vw;" v-model="IpPrinter" clearable>
                                        <template slot="prepend">打印机IP地址：</template>
                                    </el-input>
                                    <el-input placeholder="请输入端口" style="margin-left: 1vw; width:22vw;"
                                        v-model="PortPrinter" clearable>
                                        <template slot="prepend">打印机端口：</template>
                                    </el-input>
                                </div>
                                <div style="margin-left:2vw;">
                                    <el-input placeholder="请输入打印机服务IP" style="width:20vw;" v-model="IpPrinterServe"
                                        clearable>
                                        <template slot="prepend">打印机服务IP地址：</template>
                                    </el-input>
                                    <el-input placeholder="请输入打印机服务端口" style="margin-left: 1vw; width:22vw;"
                                        v-model="PortPrinterServe" clearable>
                                        <template slot="prepend">打印机服务端口：</template>
                                    </el-input>
                                    <!-- <el-button type="success" style="margin-left:1vw" @click="savePrinter()">保存</el-button> -->
                                </div>
                            </div>
                            <!-- YJJ -->






                            <!-- <div
                                style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">RFID工作站设置</el-divider>
                                <div style="margin-left:2vw;">
                                    <span style="color:#000;font-size:1vw;">串口 ： </span>
                                    <el-select v-model="serialPortValue" clearable placeholder="请选择">
                                        <el-option v-for="item in serialPortOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <span style="color:#000;font-size:1vw;margin-left:1vw;">协议：</span>
                                    <el-select v-model="agreementValue" clearable placeholder="请选择">
                                        <el-option v-for="item in agreementOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div> -->
                            <div
                                style="border-left:1px solid rgb(228,231,237);border-bottom:1px solid rgb(228,231,237);border-right:1px solid rgb(228,231,237);">
                                <el-divider content-position="left" style="width:80%">RFID工作站设置</el-divider>
                                <div style="margin-left:2vw;">
                                    <el-input placeholder="请输入IP地址" style="width:16vw;" v-model="PrintSetIPinput" clearable>
                                        <template slot="prepend">IP地址：</template>
                                    </el-input>
                                    <el-input placeholder="请输入端口" style="margin-left: 1vw; width:16vw;"
                                        v-model="PrintSetPortinput" clearable>
                                        <template slot="prepend">端口：</template>

                                    </el-input>
                                    <el-button type="primary" style="margin-left:1vw" @click="rearder()">测试蜂鸣器</el-button>
                                    <el-button type="primary" style="margin-left:1vw"
                                        @click="readRFID()">读取RFID标签</el-button>
                                        <el-button type="success" style="margin-left:1vw" @click="savePrinter()">保存</el-button>
                                    <!-- <el-button type="success" style="margin-top:.5vw;" @click="apply()">保存</el-button> -->

                                </div>

                            </div>

                        </el-tab-pane>
                        <el-tab-pane label="密集架设置" name="5">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_add()">添 加</el-button>
                                    <el-dialog width="36%" title="添加密集架" :visible.sync="mjj_add_Visible" append-to-body>
                                        <el-form :model="mjj_add">
                                            <div style="display:flex;">
                                            <div>
                                                <el-form-item label="库房索引：" :label-width="formLabelWidth">
                                                    <el-input v-model="mjj_add.StoreId" placeholder="请选择列表"
                                                        autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="库房名称：" :label-width="formLabelWidth">
                                                    <el-input v-model="mjj_add.StoreName" placeholder="请选择列表"
                                                        autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="区类型：" :label-width="formLabelWidth">
                                                    <el-select v-model="mjj_add.type" @change="QuTypeChange" placeholder="请选择">
                                                        <el-option label="密集架" value="0"></el-option>
                                                        <el-option label="货架" value="1"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item v-if="!QuTypeShow" label="密集架类型：" :label-width="formLabelWidth">
                                                    <el-select v-model="mjj_add.mjjtype" placeholder="请选择">
                                                        <el-option label="天骄" value="1"></el-option>
                                                        <el-option label="云涌" value="2"></el-option>
                                                        <el-option label="北泰" value="3"></el-option>
                                                        <el-option label="方德" value="4"></el-option>
                                                        <el-option label="杨展" value="5"></el-option>
                                                        <el-option label="奎牛" value="6"></el-option>
                                                        <el-option label="国伟" value="7"></el-option>
                                                        <el-option label="蔡甸" value="8"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                                <el-form-item label="库号：" :label-width="formLabelWidth">
                                                    <el-input v-model="mjj_add.storeno" placeholder="请选择列表"
                                                        autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="区号：" :label-width="formLabelWidth">
                                                    <el-input v-model="mjj_add.quno" placeholder="请选择列表"
                                                        autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="区名称：" :label-width="formLabelWidth">
                                                    <el-input v-model="mjj_add.quname" placeholder="请选择列表"
                                                        autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="列数：" :label-width="formLabelWidth">
                                                    <el-input v-model="mjj_add.colcn" placeholder="请输入索引"
                                                        autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="节数：" :label-width="formLabelWidth">
                                                    <el-input v-model="mjj_add.lecn" placeholder="请输入名称"
                                                        autocomplete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="层数：" :label-width="formLabelWidth">
                                                    <el-input v-model="mjj_add.divcn" placeholder="请输入IP地址"
                                                        autocomplete="off"></el-input>
                                                </el-form-item>
                                            </div>
                                            <div style="margin-left:1vw;">
                                            <el-form-item label="格数：" v-if="QuTypeShow" :label-width="formLabelWidth">
                                                <el-input v-model="mjj_add.gridno" placeholder="请输入格数"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="每格容量：" :label-width="formLabelWidth">
                                                <el-input v-model="mjj_add.rlcn" placeholder="请输入IP地址"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="固定列号：" :label-width="formLabelWidth">
                                                <el-input v-model="mjj_add.gdlno" placeholder="请输入IP地址"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="固定列IP：" :label-width="formLabelWidth">
                                                <el-input v-model="mjj_add.hostname" placeholder="请输入IP地址"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="固定列端口：" :label-width="formLabelWidth">
                                                <el-input v-model="mjj_add.httpport" placeholder="请输入端口"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="用户名：" :label-width="formLabelWidth">
                                                <el-input v-model="mjj_add.username" placeholder="请输入端口"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="密码：" :label-width="formLabelWidth">
                                                <el-input v-model="mjj_add.password" placeholder="请输入端口"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="起始列号：" :label-width="formLabelWidth">
                                                <el-input v-model="mjj_add.firstcolno" placeholder="请输入端口"
                                                    autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="列编码规则：" :label-width="formLabelWidth">
                                                <el-select v-model="mjj_add.colnorule" placeholder="请选择">
                                                    <el-option label="从左到右" value="1"></el-option>
                                                    <el-option label="从右到左" value="2"></el-option>
                                                    <el-option label="虚拟列号" value="3"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                        </div>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer" style="text-aline: center">
                                            <el-button @click="mjj_add_Visible = false">取 消</el-button>
                                            <el-button type="primary" @click="addmjj()">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_edit()">修改</el-button>
                                    <el-dialog center width="36%" title="编辑密集架" :visible.sync="mjj_edit_Visible"
                                        append-to-body>
                                        <el-form :model="mjj_edit">
                                            <div style="display:flex">
                                                <div>
                                                    <el-form-item label="库房索引：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.StoreId" placeholder="请选择列表"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="库房名称：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.StoreName" placeholder="请选择列表"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="区类型：" :label-width="formLabelWidth">
                                                        <el-select v-model="mjj_edit.type" @change="QuTypeChange1" placeholder="请选择">
                                                            <el-option label="密集架" value="0"></el-option>
                                                            <el-option label="货架" value="1"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                    <el-form-item v-if="!QuTypeShow1"  label="密集架类型：" :label-width="formLabelWidth">
                                                        <el-select v-model="mjj_edit.mjjtype" placeholder="请选择">
                                                            <el-option label="天骄" value="1"></el-option>
                                                            <el-option label="云涌" value="2"></el-option>
                                                            <el-option label="北泰" value="3"></el-option>
                                                            <el-option label="方德" value="4"></el-option>
                                                            <el-option label="杨展" value="5"></el-option>
                                                            <el-option label="奎牛" value="6"></el-option>
                                                            <el-option label="国伟" value="7"></el-option>
                                                            <el-option label="蔡甸" value="8"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                    <el-form-item label="库号：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.storeno" placeholder="请选择列表"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="区号：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.quno" placeholder="请选择列表"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="区名称：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.quname" placeholder="请选择列表"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="列数：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.colcn" placeholder="请输入索引"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="节数：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.lecn" placeholder="请输入名称"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="层数：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.divcn" placeholder="请输入IP地址"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                </div>
                                                <div>
                                                    <el-form-item label="格数：" v-if="QuTypeShow1" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.gridno" placeholder="请输入格数"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="每格容量：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.rlcn" placeholder="请输入IP地址"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="固定列号：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.gdlno" placeholder="请输入IP地址"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="固定列IP：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.hostname" placeholder="请输入IP地址"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="固定列端口：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.httpport" placeholder="请输入端口"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="用户名：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.username" placeholder="请输入端口"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="密码：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.password" placeholder="请输入端口"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="起始列号：" :label-width="formLabelWidth">
                                                        <el-input v-model="mjj_edit.firstcolno" placeholder="请输入端口"
                                                            autocomplete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="列编码规则：" :label-width="formLabelWidth">
                                                        <el-select v-model="mjj_edit.colnorule" placeholder="请选择">
                                                            <el-option label="从左到右" value="1"></el-option>
                                                            <el-option label="从右到左" value="2"></el-option>
                                                            <el-option label="虚拟列号" value="3"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </div>
                                            </div>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer" style="text-aline:right">
                                            <el-button @click="mjj_edit_Visible = false">取 消</el-button>
                                            <el-button type="primary" @click="editmjj()">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_delete()">删除</el-button>
                                </div>
                                <!-- <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_search()">查 询</el-button>
                                </div> -->
                                <div style="margin-left: 1vw">
                                    <el-button type="success" size="mini" @click="MJJ_export()">导出</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_barCodeManage()">层架条码管理</el-button>
                                </div>
                                <!-- <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_filterReset()">滤网复位</el-button>
                                </div> -->
                                <!-- <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="MJJ_relevancy()">关联摄像头</el-button>
                                </div> -->
                            </div>
                            <el-table id="MJJ" height="600" @select-all="handleSelectMJJ" :data="MJJSetList" :header-cell-style="{color:'#000'}"
                                @selection-change="SelectionChangeMJJ" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="45" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="mjjtype" label="密集架类型" width="100" align="center">
                                    <template slot-scope="{row}">
                                        <span v-if="row.type==1">/</span>
                                        <span v-if="row.type==0">{{ row.mjjtype }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="区类型" width="100" align="center">
                                    <template slot-scope="{row}">
                                        <span v-if="row.type==1">货架区</span>
                                        <span v-if="row.type==0">密集架区</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="storeno" label="库号" width="50" align="center"></el-table-column>
                                <el-table-column prop="quno" label="区号" width="50" align="center"></el-table-column>
                                <el-table-column prop="quname" label="区名称" align="center"></el-table-column>
                                <el-table-column prop="colcn" label="列数" width="50" align="center"></el-table-column>
                                <el-table-column prop="lecn" label="节数" width="50" align="center"></el-table-column>
                                <el-table-column prop="divcn" label="层数" width="50" align="center"></el-table-column>
                                <el-table-column prop="gridno" label="格数" width="50"  align="center">
                                    <template slot-scope="{row}">
                                        <span v-if="row.type==0">/</span>
                                        <span v-if="row.type==1">{{ row.gridno }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="rlcn" label="每格容量" width="100" align="center"></el-table-column>
                                <el-table-column prop="gdlno" label="固定列号" width="80" align="center"></el-table-column>
                                <el-table-column prop="hostname" label="固定列IP" align="center"></el-table-column>
                                <el-table-column prop="httpport" label="固定列端口" width="100" align="center"></el-table-column>
                                <el-table-column prop="firstcolno" label="起始列号" width="80" align="center"></el-table-column>
                                <el-table-column prop="colnorule" label="起始列规则" width="100" align="center"></el-table-column>
                                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                                <el-table-column prop="password" label="密码" align="center"></el-table-column>
                                <el-table-column prop="userid" label="录入人" align="center"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <!-- <el-tab-pane label="通道门设置" name="6">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="TDM_add()">添加</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="TDM_edit()">修改</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="TDM_sahnchu()">删除</el-button>
                                </div>
                                <div style="margin-left: 1vw"> -->
                                    <!-- <el-button type="primary" size="mini" @click="TDM_relevancy()">关联摄像头</el-button> -->
                                <!-- </div>
                            </div> -->
                            <!-- <el-table height="600" @select-all="handleSelectTDM" :data="TDMList"
                                @selection-change="SelectionChangeTDM" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="no" label="编号" align="center"></el-table-column>
                                <el-table-column prop="name" label="通道门名称" align="center"></el-table-column>
                                <el-table-column prop="hostname" label="IP" align="center"></el-table-column>
                                <el-table-column prop="httpport" label="端口" width="100" align="center"></el-table-column>

                            </el-table> -->
                        <!-- </el-tab-pane> -->
                        <el-tab-pane label="智能灯光设置" v-if="isZndgNew" name="7">
                            <div class="Modeldesign">
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="DG_add()">添加</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="primary" size="mini" @click="DG_edit()">修改</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <el-button type="danger" size="mini" @click="DG_sahnchu()">删除</el-button>
                                </div>
                                <div style="margin-left: 1vw">
                                    <!-- <el-button type="primary" size="mini" @click="TDM_relevancy()">关联摄像头</el-button> -->
                                </div>
                            </div>
                            <el-table height="600" @select-all="handleSelectDG" :data="DGList"
                                @selection-change="SelectionChangeDG" border>
                                <el-table-column type="selection" width="40" align="center"></el-table-column>
                                <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
                                <el-table-column prop="slaveNumber" label="从机编号" width="100" align="center"></el-table-column>
                                <el-table-column prop="moduleName" label="模块名称" align="center"></el-table-column>
                                <el-table-column prop="ip" label="IP" align="center" width="300"></el-table-column>
                                <el-table-column prop="port" label="端口" width="100" align="center"></el-table-column>
                                <el-table-column prop="deviceType" label="类型" width="150" align="center">
                                    <template slot-scope="scope">
                                            {{scope.row.deviceType + '路'}}
                                        </template>
                                </el-table-column>

                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="RFID标签值:" class="rfidmark">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="消息提醒:" class="rfidmark">
                        {{ rfidreadmsg }}
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">

                    <el-button type="primary" @click="edit()">退出</el-button>
                </span>
            </el-dialog>
            <!-- </el-dialog> -->
            <!-- 层架条码管理 -->
            <el-dialog center title="层架条码管理" :visible.sync="cengjiatiaomashow" width="60%">
                <div style="display:flex;height:20vw">
                    <div style="width:11vw;height:20vw;border: 1px solid rgb(0, 0, 0);overflow-y: scroll;">
                        <el-tree :data="cengjiadata" :props="defaultProps" @node-click="handleNodeClickcengjia"></el-tree>
                    </div>
                    <div style="margin-left: 1vw;">
                        <div style="display:flex">
                            <el-radio @input="left" v-model="radio" label="1">左侧</el-radio>
                            <el-radio @input="right" v-model="radio" label="0">右侧</el-radio>

                            <div style="display:flex;margin-left: 20vw;">
                                <el-button type="primary" @click="resetcengjia()">清空所有层架信息</el-button>
                                <el-button type="primary" @click="shengchengcengjia()">生成所有层架信息</el-button>
                                <el-button type="primary" @click="Exceloutput()">导出</el-button>
                            </div>


                        </div>
                        <div style="flex:1;width:100%;position: relative;">
                            <div style="margin-top:2vw;   position:absolute; width:100%;">
                                <el-table   ref="apk" @row-click="cengjiahang" id="tableoneone" height="200" class="cengjiabiaoge" 
                                    :data="cengjialist" @selection-change="cengjiadanxuan" border>
                                    <el-table-column type="selection" width="40" align="center"></el-table-column>
                                    <el-table-column width="60" prop="no" label="序号" align="center"></el-table-column>
                                    <el-table-column prop="name" label="存放位置" align="center"></el-table-column>
                                    <el-table-column prop="code" label="层架标签" align="center"></el-table-column>
                                    <el-table-column prop="state" label="标签状态" align="center"></el-table-column>
                                    <el-table-column label="操作" width="200" fixed="right" header-align="center"
                                        align="center">
                                        <template slot-scope="scope">
                                            <div style="display:flex">
                                                <el-button size="success"
                                                    @click="addcengjiabiaoqian(scope.row)">生成层架标签</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>


                    </div>

                </div>

            </el-dialog>

            <el-dialog :title="diotitle" width="50%" center :visible.sync="archivalinformationhgl">


                <el-descriptions class="margin-top" style="margin-bottom:2vh;" :column="2" :size="size" border>


                    <el-descriptions-item>
                        <template slot="label">
                            通道门编号
                        </template>
                        <el-input v-if="this.bianhaoshow" v-model="bianhao" placeholder="请输入编号"></el-input>
                        <el-input v-else disabled v-model="bianhao" placeholder="请输入编号"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            通道门名称
                        </template>
                        <el-input v-model="tdmname" placeholder="通道门名称"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            通道门IP
                        </template>
                        <el-input v-model="tdmip" placeholder="请输入IP"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            通道门端口
                        </template>
                        <el-input v-model="tdmport" placeholder="请输入端口"></el-input>
                    </el-descriptions-item>

                </el-descriptions>
                <div style="margin:auto;width:4vw;display:flex">
                    <el-button type="primary" @click="tdmtianjiasave()">保存</el-button>
                    <el-button @click="archivalinformationhgl = false">取消</el-button>
                </div>

            </el-dialog>

            <el-dialog :title="diotitle" width="50%" center :visible.sync="archivalinformationhglDG">


                <el-descriptions class="margin-top" style="margin-bottom:2vh;" :column="2" :size="size" border>

                    <el-descriptions-item>
                        <template slot="label">
                            从机编号
                        </template>
                        <el-input type="number" v-model="dengguangForm.slaveNumber" placeholder="请输入slaveNumber"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            模型
                        </template>
                        <el-select v-model="dengguangForm.deviceType" placeholder="请选择">
                            <el-option label="8路" :value="8"></el-option>
                            <el-option label="16路" :value="16"></el-option>
                            <el-option label="32路" :value="32"></el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            网关IP
                        </template>
                        <el-input v-model="dengguangForm.ip" placeholder="请输入IP"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            端口
                        </template>
                        <el-input v-model="dengguangForm.port" placeholder="请输入端口"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            模块名称
                        </template>
                        <el-input v-model="dengguangForm.moduleName" placeholder="请输入编号"></el-input>
                        <!-- <el-input v-else disabled v-model="dengguangForm.moduleName" placeholder="请输入编号"></el-input> -->
                    </el-descriptions-item>
                </el-descriptions>
                <div style="margin:auto;width:4vw;display:flex">
                    <el-button type="primary" @click="tdmtianjiasaveDG()">保存</el-button>
                    <el-button @click="archivalinformationhglDG = false">取消</el-button>
                </div>

            </el-dialog>


            <el-dialog center title="生成层架信息" width="30%" :visible.sync="inportcheck" append-to-body>
                <el-form>
                    <el-form-item style="margin:0 auto">
                        <el-progress type="circle" :percentage="inportd" style="margin:0 auto"></el-progress>
                    </el-form-item>
                    <el-form-item style="margin:0 auto">
                        <span style="margin:0 auto"> {{ inportdataingmsg }}</span>
                    </el-form-item>
                    <el-form-item prop="desc">
                        <el-input type="textarea" v-model="inportdataingcheckingmsg"></el-input>
                    </el-form-item>
                </el-form>
                <div class="footerbuttons">
                    <el-button @click="inportcheck = false" type="primary">退出</el-button>
                </div>
            </el-dialog>








            <el-dialog :title="MJdiotitle" width="30%" center :visible.sync="menjinshow">

                <div>
                    <div style="display:flex">
                        <div>类型</div>
                        <el-select style="width:14vw;margin-left:1vw" v-model="MJvalue" placeholder="请选择">
                            <el-option v-for="item in MJoptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <div style="display:flex;align-items:center">
                        <div>名称</div> <el-input style="width:14vw;margin-left:1vw;margin-top:0.5vw" v-model="inputname"
                            placeholder="请输入名称"></el-input>
                    </div>
                    <div style="display:flex;align-items:center">
                        <div>地址</div> <el-input style="width:14vw;margin-left:1vw;margin-top:0.5vw" v-model="inputdizhi"
                            placeholder="请输入地址"></el-input>
                    </div>
                    <div style="display:flex;align-items:center">
                        <div>端口</div><el-input style="width:14vw;margin-left:1vw;margin-top:0.5vw" v-model="inputport"
                            placeholder="请输入端口"></el-input>
                    </div>
                    <div style="display:flex;align-items:center">
                        <div>密码</div><el-input style="width:14vw;margin-left:1vw;margin-top:0.5vw" v-model="inputpwd"
                            placeholder="请输入密码"></el-input>
                    </div>
                    <div style="display:flex;align-items:center">
                        <div>机号</div> <el-input style="width:14vw;margin-left:1vw;margin-top:0.5vw" v-model="inputnumber"
                            placeholder="请输入机号"></el-input>
                    </div>
                </div>

                <div style="margin-top:2vw;width:4vw;display:flex;margin-left:6vw">
                    <el-button type="primary" @click="MJsave()">保存</el-button>
                    <el-button @click="menjinshow = false">取消</el-button>
                </div>

            </el-dialog>




        </el-container>
    </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import axios from "axios";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    components: {
        Breadcrumb,
        Hamburger,
    },
    data() {
        return {
            Level:'',
            ZyNo:'',
            LeNo:'',
            DivNo:'',
            QuNo:'',
            ColNo:'',
            inportdataingcheckingmsg: '',
            inportcheck: false,
            inportdataingmsg: '',
            inportd: '',
            MJXIUGAIlist: '',
            MJvalue: '',
            inputname: '',
            inputdizhi: '',
            inputport: '',
            inputpwd: '',
            inputnumber: '',
            MJoptions: [
                {
                    value: '海康威视',
                    label: '海康威视'
                },
                {
                    value: '中控智慧',
                    label: '中控智慧'
                },
                {
                    value: '熵基门禁',
                    label: '熵基门禁'
                },
                {
                    value: '大华门禁',
                    label: '大华门禁'
                },
            ],
            px:'',//yjj
            py:'',//yjj
            MJid: '',
            MJdiotitle: '门禁考勤机-添加',
            IpPrinter: '',//YJJ
            PortPrinter: '',//YJJ
            IpPrinterServe: '',//YJJ
            PortPrinterServe: '',//YJJ
            menjinshow: false,
            bianhaoshow: true,
            bianhaoshowDG: true,
            diotitle: '',
            TDMdanxuan: [],
            DGdanxuan: [],
            tdmstoreid: '',
            size: '',
            lururen: '',
            tdmport: '',
            tdmip: '',
            tdmname: '',
            bianhao: '',
            xuhao: '',
            storeid:'',
            archivalinformationhgl: false,
            archivalinformationhglDG: false,
            zystatus: '1',
            cengjiatablelist: [],//层架绑定的表头
            radio: '1',
            cengjiadata: [
            ],
            cengjialist: [],//层架表格数据
            cengjiatiaomashow: false,
            rfidreadmsg: "",
            input: '',
            dialogVisible: false,
            viewpageno: 0, //当前显示的号
            isShow: true, //是否展示
            isShowBack: true, //是否展示返回
            systemName: "",
            activeName: "1", //在借档案tabs
            isShowSetting: true, //设置弹框显示
            innerVisible: false,//添加库房的小弹框
            KFname: '',
            KFcode: '',
            innerVisible2: false,//修改的小弹框
            KFname2: '',
            KFcode2: '',
            formLabelWidth: "100px",
            tempKFaxiosData: [],//点击左侧库房列表存放数据
            //在借档案盒tab
            FileonloanTable: [{
                date: "1",
                name: "在借档号盒1",
                address: "在借档号盒1",
            },],
            //在借档案tab
            borrowingfilebox: [{
                date: "1",
                name: "在借档案1",
                address: "在借档案1",
            },],
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
            KFList: [
                {
                    label: '数据加载中。。。',
                    children: []
                }
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
            storeEnvironmentList: [],
            videoSurveillanceList: [],
            MJKQJList: [
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
            }, {
                value: '选项6',
                label: 'HWSealPrinter'
            }, {
                value: '选项7',
                label: 'HP582219 (HP OfficeJet Pro 7730 series)'
            }, {
                value: '选项8',
                label: 'Fax'
            },
            ],
            printValue: '',
            sizeOptions: [{
                value: '选项1',
                label: 'A4'
            }],
            sizeValue: 'A4',
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
            }, {
                value: '选项6',
                label: 'HWSealPrinter'
            }, {
                value: '选项7',
                label: 'HP582219 (HP OfficeJet Pro 7730 series)'
            }, {
                value: '选项8',
                label: 'Fax'
            },
            ],
            TMprintValue: '',
            TMsizeOptions: [{
                value: '选项1',
                label: '50 X 25'
            }],
            TMsizeValue: '50 X 25',

            serialPortOptions: [{
                value: '选项1',
                label: 'COM1'
            }],
            serialPortValue: 'COM1',


            agreementOptions: [{
                value: '选项1',
                label: '一代协议'
            }, {
                value: '选项2',
                label: '二代协议'
            }
            ],

            agreementValue: '二代协议',
            PrintSetIPinput: '',
            PrintSetPortinput: '',
            MJJSetList: [
            ],
            TDMList: [
            ],
            DGList:[],
            acs_add_Visible: false,
            acs_add: {
                StoreId: 0,
                StoreName: "",
                ACId: 0,
                ACName: "",
                HostName: "",
                HttpPort: "",
                AcLx: "3"
            },
            acs_edit_Visible: false,
            acs_edit: {
                StoreId: 0,
                StoreName: "",
                ACId: 0,
                ACName: "",
                HostName: "",
                HttpPort: "",
                AcLx: "3"
            },
            ACSSelect: [],
            mjj_add_Visible: false,
            mjj_add: {
                StoreId: 0,
                StoreName: "",
                mjjtype: "8",
                type: "0",
                storeno: 0,
                quno: 0,
                quname: "",
                colcn: 0,
                lecn: 0,
                divcn: 0,
                rlcn: 15,
                gdlno: 1,
                hostname: "127.0.0.1",
                httpport: 9000,
                username: "",
                password: "",
                firstcolno: 1,
                colnorule: "1",
                gridno:10,
            },
            QuTypeShow:false,
            QuTypeShow1:false,
            mjj_edit_Visible: false,
            mjj_edit: {
                StoreId: 0,
                StoreName: "",
                mjjtype: "8",
                storeno: 0,
                quid: 0,
                quno: 0,
                quname: "",
                colcn: 0,
                lecn: 0,
                divcn: 0,
                rlcn: 15,
                gridno:0,
                gdlno: 1,
                hostname: "127.0.0.1",
                httpport: 9000,
                username: "",
                password: "",
                firstcolno: 1,
                colnorule: "1",
            },
            MJJSelect: [],
            dengguangForm:{
                ip:'',
                port:'',
                deviceType:'8',
                moduleName:'',
                slaveNumber:''
            },
            isZndgNew: false
        };
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
        } else if (this.$route.path == "/form") { } else if (this.$route.path == "/example/environmentMonitor") {
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

        this.getKFList();
        this.zhiNengDengGuang()
    },
    mounted() {

        if (localStorage.getItem('arrip') == null || localStorage.getItem('arrprot') == null)
            return
        if (localStorage.getItem('arrip').length > 0 && localStorage.getItem('arrprot').length > 0) {

            this.PrintSetIPinput = localStorage.getItem('arrip')
            this.PrintSetPortinput = localStorage.getItem('arrprot')
        }

    },
    methods: {

   // yjj
   savePrinter(){
            if(this.IpPrinter==''||this.PortPrinter==''){
                this.$message.error("请输入要保存的IP或端口");
                return;
            }
            localStorage.setItem('IpPrinter', this.IpPrinter)
            localStorage.setItem('PortPrinter', this.PortPrinter)
            localStorage.setItem('PortPrinterServe', this.PortPrinterServe);
            localStorage.setItem('IpPrinterServe', this.IpPrinterServe);
            localStorage.setItem('px', this.px);
            localStorage.setItem('py', this.py);

            var SetSValueData = {
                "item": "RFIDPrinter1",
                "value": this.px+'-'+this.py+'-'+this.IpPrinter+'-'+this.PortPrinter+'-'+this.IpPrinterServe+'-'+this.PortPrinterServe+'-'+this.PrintSetIPinput+'-'+this.PrintSetPortinput,
                "mark": "左侧距离-顶部距离-打印机IP-打印机端口-打印机服务ip-打印机服务端口-rfidip-rfid端口"
            }
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/SetSValue', SetSValueData).then(
                success => {
                    console.log(success, '设置 RFID打印机的值-成功');
                    console.log(success.data.data, '11111111');
                     this.$message.success("保存成功");
                },
                error => {
                    console.log(error, '设置 RFID打印机的值--返回失败的数据');
                })
        },
        // // yjj结尾



        MJsave() {

            if (this.MJdiotitle == '门禁考勤机-添加') {
                const arr = {
                    "did": '0',
                    'storeid': this.MJid,
                    "dtype": this.MJvalue,
                    "dname": this.inputname,
                    "dip": this.inputdizhi,
                    "dport": this.inputport,
                    "machinenumber": this.inputnumber,
                    "dpwd": this.inputpwd,
                    "duserid": '10'
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/SaveDoors', arr).then(
                    success => {
                        this.$message.success(success.data.data)
                        this.menjinshow = false
                        this.getMJJ()

                    },
                    error => {
                        this.$message.error(success.data.data)
                    })
            } else {
                console.log('编辑保存');
                const arr = {
                    "did": this.MJXIUGAIlist[0].did,
                    'storeid': this.MJid,
                    "dtype": this.MJvalue,
                    "dname": this.inputname,
                    "dip": this.inputdizhi,
                    "dport": this.inputport,
                    "machinenumber": this.inputnumber,
                    "dpwd": this.inputpwd,
                    "duserid": '10'
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/SaveDoors', arr).then(
                    success => {
                        this.$message.success(success.data.data)
                        this.menjinshow = false
                        this.getMJJ()

                    },
                    error => {
                        this.$message.error(success.data.data)
                    })
            }





        },

        getMJJ() {

            var jsonData = {
                "storeid": this.MJid,
            }
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetDoorsData', jsonData).then(
                success => {
                    console.log(success, '获取门禁信息列表接口-成功');
                    console.log(success.data.data, '11111111');
                    this.MJKQJList = [];
                    this.MJKQJList = success.data.data;
                },
                error => {
                    console.log(error, '获取门禁信息列表接口--返回失败的数据');
                })
        },

        cengjiahang(row, col, event){
    row.flag = !row.flag;
      this.$refs.apk.toggleRowSelection(row, row.flag);
        },
 
   
        // YJJ
        tdmtianjiasave() {

            if (this.diotitle == '添加通道门设置') {
                const arr = {
                    'StoreId': this.tdmstoreid,
                    'HttpPort': this.tdmport,
                    'HostName': this.tdmip,
                    'Name': this.tdmname,
                    'No': this.bianhao,
                }
                console.log(arr, '添加要传的数据');
                axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/rfiddoor/SaveRfidDoor", arr).then(res => {
                    console.log(res, '添加成功返回信息');
                    if (res.data.code != 200) {
                        return
                    }
                    this.$message.success(res.data.data)
                    setTimeout(() => {
                        const jsonData = {
                            "StoreId": this.tdmstoreid,
                        }
                        axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetRfidDoorData', jsonData).then(
                            success => {
                                console.log(success, '获取通道门信息列表接口-成功');
                                console.log(success.data.data, '11111111');
                                this.TDMList = [];
                                this.TDMList = success.data.data;
                            },
                            error => {
                                console.log(error, '获取通道门信息列表接口--返回失败的数据');
                            })
                    }, 500)
                    this.archivalinformationhgl = false
                }).catch(
                    error => {
                        console.log(error);
                    })


            } else {



                const arr = {
                    'StoreId': this.tdmstoreid,
                    'HttpPort': this.tdmport,
                    'HostName': this.tdmip,
                    'Name': this.tdmname,
                    'No': this.bianhao,
                }
                console.log(arr, '修改通道门要传的数据');
                axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/rfiddoor/SaveRfidDoor", arr).then(res => {
                    console.log(res, '修改成功返回信息');
                    if (res.data.code != 200) {
                        return
                    }
                    this.$message.success(res.data.data)
                    setTimeout(() => {
                        const jsonData = {
                            "StoreId": this.tdmstoreid,
                        }
                        axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetRfidDoorData', jsonData).then(
                            success => {
                                console.log(success, '获取通道门信息列表接口-成功');
                                console.log(success.data.data, '11111111');
                                this.TDMList = [];
                                this.TDMList = success.data.data;
                            },
                            error => {
                                console.log(error, '获取通道门信息列表接口--返回失败的数据');
                            })
                    }, 500)


                    this.archivalinformationhgl = false
                }).catch(
                    error => {
                        console.log(error);
                    })



            }

        },
        cengjiadanxuan(val) {
          console.log(val, 'ccccccccccccccccccccccccccccccccccc');
          this.ZyNo=val[0].zyno
          this.LeNo=val[0].leno
          this.DivNo=val[0].divno
          this.QuNo=val[0].quno
          this.ColNo=val[0].colno
    console.log( this.ZyNo,'this.ZyNo this.ZyNo this.ZyNo');

        },
        // cengjiaquanxuan(val) {
        //     console.log(val, '111111111111111111111111111111');
        // },

        Exceloutput() {
            let table = document.querySelector('#tableoneone').cloneNode(true);

            table.removeChild(table.querySelector(".el-table__fixed-right"));
            // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉

            //   table.removeChild(table.querySelector(".el-table__fixed"));
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
                    '层架信息数据' + ".xlsx"
                );
            } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
            }
            return wbout;
        },
        shengchengcengjia() {
            this.inportd = 0
            this.inportdataingcheckingmsg = ''
            this.inportdataingmsg = ''
            this.inportcheck = true

            var data = {}

            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/cengbiao/creatcb", data).then(
                (res) => {
                    console.log('生成层架列表数据初始化成功', res);

                    var dataone = {}
                    let looping = setInterval(() => {
                        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/cengbiao/creatcbing", dataone).then(
                            (res) => {
                                console.log(res, '成功获取生成层架列表数据');
                                //   this.cengjialist = [];
                                //   this.cengjiatablelist = [];
                                if (res.data.code != 200) {
                                    this.$message.error(res.data.msg);
                                    return;
                                }
                                if (res.data.data.msg == '') {
                                    clearInterval(looping);
                                }

                                this.inportd = 10






                                //   this.inportd=50
                                //   this.inportd=60
                                //   this.inportd=70
                                //   this.inportd=80
                                //   this.inportd=90

                                //   for (let index = 1; index < 9; index++) {
                                //     setTimeout(()=>{ this.inportd=(10*index)},(100*index))

                                //   }

                                this.inportdataingcheckingmsg = res.data.data.msg
                                if (!res.data.data.isruning) {
                                    this.inportd = 100

                                    this.inportdataingmsg = res.data.data.msg
                                    clearInterval(looping);
                                }

                                //   this.$message.success(res.data.data.msg);


                                //   this.cengjialist = res.data.data.table;
                                //   console.log(res.data.data.Count, 'res.data.data.count');

                                //   for (let i = 0; i < res.data.data.headernames.length; i++) {
                                //     let obj = {
                                //       prop: res.data.data.headernames[i],
                                //       label: res.data.data.headertexts[i],
                                //     };
                                //     this.cengjiatablelist.push(obj);
                                //     //数据更新后执行
                                //     this.$nextTick(() => {
                                //       // myTable是表格的ref属性值
                                //       if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                                //         this.$refs.multipleTable.doLayout();
                                //       }
                                //     })
                                //   }


                            }).catch(err => {
                                //   clearInterval(looping);
                                console.log('获取生成层架列表数据失败', err);
                            }
                            );
                    }, 1000)

                }).catch(err => {

                    console.log('生成层架列表数据初始化失败', err);
                }
                );




        },
        // 清空所有层架信息
        resetcengjia() {
            var arr = {}
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/cengbiao/DeleteMjjxxData', arr).then(
                success => {
                    this.$message.success(success.data.data)

                },
                error => {
                    this.$message.error(success.data.data)
                })
        },
        right(val) {
            console.log(val, '右边')
            this.zystatus = val
            //  this.handleNodeClickcengjia()
        },
        left(val) {
            this.zystatus = val
            console.log(val, '左边')
            // this.handleNodeClickcengjia()
        },


        edit() {
            this.dialogVisible = false
            this.input = ''
        },

        rearder() {
            //         var arrip=localStorage.getItem('arrip')
            //    var arrport=localStorage.getItem('arrprot')
            var url = this.PrintSetIPinput + ':' + this.PrintSetPortinput
            var arr =
            {
                'cmd': '0',
                "tcpclient": url
            }

            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/initreader', arr).then(
                success => {
                    //  console.log('更新成功了');
                    this.$message.success('蜂鸣器测试指令已发送')
                    // this.getDAHTableList(this.page_DAH, this.size_DAH);
                }
            ).catch(
                error => {
                    console.log(error, 'error');
                }
            )
        },
        readRFID() {
            this.dialogVisible = true
            this.input = "";
            this.rfidreadmsg = "";
            var url = this.PrintSetIPinput + ':' + this.PrintSetPortinput
            var arr =
            {
                'cmd': '1',
                "tcpclient": url
            }
            var testcnt = 0;
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/initreader', arr).then( //初始化
                success => {
                    if (success.data.code != 200) {
                        this.$message.success(success.data.message);
                        return;
                    }
                    var loop = setInterval(() => {
                        var arr =
                        {
                            'tcpclient': url
                        }

                        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/getdata', arr).then(  //读值rfid
                            success => {
                                if (success.data.code != 200) {
                                    this.rfidreadmsg = success.data.message;
                                    clearInterval(loop);
                                    return;
                                }
                                else if (success.data.data.isruning) {
                                    this.rfidreadmsg = success.data.data.msg;
                                    if (testcnt++ > 10) {
                                        this.$message.error("通讯超时");
                                        clearInterval(loop);
                                        return;
                                    }
                                }
                                else {
                                    this.input = success.data.data.rfid
                                    this.rfidreadmsg = success.data.data.msg;
                                    clearInterval(loop);
                                }
                                //  success.data.data.rfid== rfid
                            },
                            error => {
                                this.$message.error(error);
                            })
                    }, 1000)

                })
        },
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
        },
        GoHome() {
            this.$router.push(`/home`);
        },
        setting() {//设置
            this.isShowSetting = true;
            this.getKFList();


        },
        getKFList() {
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetStoresForLeftMenu', JSON.parse('{}')).then(
                success => {
                    console.log(success, '获取库房列表接口-成功');
                    console.log(success.data.data, '11111111');
                    this.KFList = [];
                    this.KFList = success.data.data;
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })

        },
        dialogClose() {
            this.KFList = [];
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
        danganyuqi() { },
        //库房环境时间转换
        KFtimer(row, storeEnvironmentList) {
            if (storeEnvironmentList.property === 'createtime') {
                //       返回格式化的列
                row[storeEnvironmentList.property] = this.formateDate(row[storeEnvironmentList.property])
                return row[storeEnvironmentList.property]
            } else {
                //       返回不需要惊醒格式化列源
                return row[storeEnvironmentList.property]
            }
        },
        //门禁机时间转换
        MJJtimer(row, MJKQJList) {
            if (MJKQJList.property === 'dcreatetime') {
                //       返回格式化的列
                row[MJKQJList.property] = this.formateDate(row[MJKQJList.property])
                return row[MJKQJList.property]
            } else {
                //       返回不需要惊醒格式化列源
                return row[MJKQJList.property]
            }
        },
        // 时间格式转换
        formateDate(time) {
            // 使用dayjs 把世界标准时间转换为北京时间
            let date = this.dayjs(time).format();

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

        handleNodeClickcengjia(data) {
            this.storeid=data.storeid
            this.Level=data.Level
            console.log(data,'datadatadatadatadatadatadata');
            console.log( this.storeid, ' this.storeid this.storeid this.storeid');
            console.log(this.zystatus, 'this.zystatusthis.zystatusthis.zystatusthis.zystatus');
            console.log(data.Level,'data.Leveldata.Leveldata.Leveldata.Level');
            this.cengjialist = []
            if (data.Level == 0) {
              return
            }
            else if (data.Level == 1) {
              return
            }
             else if (data.Level == 2) {
                console.log('进来了列');
                const arrone = {
                    'StoreId': data.storeid,
                    'ZyNo': this.zystatus,
                    'Level': data.Level,
                    'QuNo': data.quno,
                    'ColCn': data.id
                }
                console.log(arrone, 'arronearronearrone');
                axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/cengbiao/getcengbiaodata", arrone).then(
                    (res) => {
                        console.log(res, '成功获取区列表数据');

                        //   this.tableBodyInfoList = [];
                        //   this.columnInfoList = [];
                        if (res.data.code != 200) {
                            this.$message.error(res.data.message);

                            return;
                        }
                        console.log();
                        this.cengjialist = res.data.data.data
                        //     //数据更新后执行
                        this.$nextTick(() => {
                            // myTable是表格的ref属性值
                            if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                                this.$refs.multipleTable.doLayout();
                            }
                        })
                        //   }


                    },
                    (err) => {
                        console.log(err);
                    }
                );
            } else {
                console.log('进来了列');
                const arrone = {
                    'StoreId': data.storeid,
                    'ZyNo': this.zystatus,
                    'Level': data.Level,
                    'QuNo': data.quno,
                    'ColCn': data.id
                }
                console.log(arrone, 'arronearronearrone');
                axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/cengbiao/getcengbiaodata", arrone).then(
                    (res) => {
                        console.log(res, '成功获取列的列表数据');

                        //   this.tableBodyInfoList = [];
                        //   this.columnInfoList = [];
                        if (res.data.code != 200) {
                            this.$message.error(res.data.message);

                            return;
                        }
                        console.log();
                        this.cengjialist = res.data.data.data
                        //     //数据更新后执行
                        this.$nextTick(() => {
                            // myTable是表格的ref属性值
                            if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                                this.$refs.multipleTable.doLayout();
                            }
                        })
                        //   }


                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }






            console.log(data, "点击了data");
        },
        handleNodeClick(data) {

            console.log(data, "点击了data111111111111222222222222222222222222222222222");
            this.tdmstoreid = data.id
            this.tempKFaxiosData = data;

            if (this.viewpageno == 0) {
                console.log(data, "我想获取控制器信息的数据哦");
                var jsonData = {
                    "StoreId": data.id,
                    "acLx": 0,
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetACSDataByStoreId', jsonData).then(
                    success => {
                        console.log(success, '获取控制器信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.storeEnvironmentList = [];
                        this.storeEnvironmentList = success.data.data;
            //                         if(this.storeEnvironmentList[0].aclx=="1"){
            //     this.acs_edit.AcLx=="区域控制器"
            // }else if(this.ACSSelect[0].aclx=="2"){
            //     this.acs_edit.AcLx=="十防控制器"
            // }else if(this.ACSSelect[0].aclx==3){
            //     this.acs_edit.AcLx=="库房控制器"
            // }

                    },
                    error => {
                        console.log(error, '获取控制器信息列表接口--返回失败的数据');
                    })
                //
            }

            if (this.viewpageno == 1) {
                this.MJid = data.id
                console.log(data, "我想获取门禁信息的数据哦");
                var jsonData = {
                    "storeid": data.id,
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetDoorsData', jsonData).then(
                    success => {
                        console.log(success, '获取门禁信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.MJKQJList = [];
                        this.MJKQJList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取门禁信息列表接口--返回失败的数据');
                    })
                //
            }
        
            if (this.viewpageno == 3) {
                console.log(data, "我想获取密集架信息的数据哦");
                if(this.tdmstoreid==''){
                    this.$message.error('请选择库房')
                    return
                }
                var jsonData = {
                    "StoreId": data.id,
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetQUData', jsonData).then(
                    success => {
                        console.log(success, '获取密集架信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.MJJSetList = [];
                        this.MJJSetList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取密集架信息列表接口--返回失败的数据');
                    })
                //
            }
            if (this.viewpageno == 4) {
                console.log(data, "我想获取通道门信息的数据哦");
                console.log(data.id, "data.id");
                
                var jsonData = {
                    "StoreId": data.id,
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetRfidDoorData', jsonData).then(
                    success => {
                        console.log(success, '获取通道门信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.TDMList = [];
                        this.TDMList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取通道门信息列表接口--返回失败的数据');
                    })
                //
            }
            if (this.viewpageno == 5) {
                console.log(data, "我想获取通道门信息的数据哦");
                console.log(data.id, "data.id");
                axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/lightModule/getInfoById?id=' + this.tdmstoreid).then(
                    success => {
                        // if(success.data.code!==200){
                        //     return 
                        // }
                        console.log(success, '获取通道门信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.DGList = [];
                        this.DGList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取通道门信息列表接口--返回失败的数据');
                    })
            }
        },
        QuTypeChange1(val){
            console.log(val,'bvalbalblalbalbalblal1111111111111111111');
            if(val==1){
                this.QuTypeShow1=true;
            }else{
                console.log(this.QuTypeShow1,'~~~~~~~~~~~~~~~~~~~~~~~~~');
                this.QuTypeShow1=false;
            }
        },
        QuTypeChange(val){
            console.log(val,'bvalbalblalbalbalblal');
            if(val==1){
                this.QuTypeShow=true;
            }else{
                this.QuTypeShow=false;
            }
        },
        handleClick(tab, event) {
            console.log(tab, event, "tab切换");
            this.viewpageno = tab.index;
            if (this.viewpageno == 0) {
                if(this.tdmstoreid==''){
                    this.$message.error('请选择库房')
                    return
                }
                var jsonData = {
                    "StoreId": this.tdmstoreid,
                    "acLx": 0,
                }

                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetACSDataByStoreId', jsonData).then(
                    success => {
                        console.log(success, '获取控制器信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.storeEnvironmentList = [];
                        this.storeEnvironmentList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取控制器信息列表接口--返回失败的数据');
                    })
                //
            }
            if (this.viewpageno == 1) {
                if(this.tdmstoreid==''){
                    this.$message.error('请选择库房')
                    return
                }
                var jsonData = {
                    "storeid": this.tdmstoreid,

                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetDoorsData', jsonData).then(
                    success => {
                        this.MJKQJList = [];
                        this.MJKQJList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取控制器信息列表接口--返回失败的数据');
                    })
                //
            }
            if (this.viewpageno == 2) {
                var getRFIDPrinterData = {
                    "item": "RFIDPrinter1",
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetSValue', getRFIDPrinterData).then(
                    success => {
                        console.log(success.data.data,'读取设置的RFID值');
                        var res=success.data.data;
                        const datas=res.value.split("-");
                        console.log(datas,'datas');
                        this.px=datas[0];
                        this.py=datas[1];
                        this.IpPrinter=datas[2];
                        this.PortPrinter=datas[3];
                        this.IpPrinterServe=datas[4];
                        this.PortPrinterServe=datas[5];
                        this.PrintSetIPinput=datas[6];
                        this.PrintSetPortinput=datas[7];
                    },
                    error => {
                        console.log(error, '获取控制器信息列表接口--返回失败的数据');
                })
     
            }
            if (this.viewpageno == 3) {
                if(this.tdmstoreid==''){
                    this.$message.error('请选择库房')
                    return
                }
                console.log(localStorage.getItem('IpPrinter'), 'IpPrinterIpPrinterIpPrinter');

                var jsonData = {
                    "StoreId": this.tdmstoreid,
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetQUData', jsonData).then(
                    success => {
                        console.log(success, '获取密集架信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.MJJSetList = [];
                        this.MJJSetList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取密集架信息列表接口--返回失败的数据');
                    })
                //
            }
            if (this.viewpageno == 4) {
                if(this.tdmstoreid==''){
                    this.$message.error('请选择库房')
                    return
                }

                var jsonData = {
                    "StoreId": this.tdmstoreid,
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetRfidDoorData', jsonData).then(
                    success => {
                        console.log(success, '获取通道门信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.TDMList = [];
                        this.TDMList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取通道门信息列表接口--返回失败的数据');
                    })
                //
            }
            if (this.viewpageno == 5) {
                if(this.tdmstoreid==''){
                    this.$message.error('请选择库房')
                    return
                }

                // var jsonData = {
                //     "StoreId": this.tdmstoreid,
                // }
                axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/lightModule/getInfoById?id=' + this.tdmstoreid).then(
                    success => {
                        // console.log(success.data.data.code+"得黄那是偶的还搜丢啊收到后个阿嫂凡事都打");
                        if(success.data.code!==200){
                            return 
                        }
                        console.log(success, '获取通道门信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.DGList = [];
                        this.DGList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取通道门信息列表接口--返回失败的数据');
                    })
                //
            }
            console.log(this.viewpageno, "tab切换到的页面");
        },
        handleSelectKFHJ() { //库房环境选中所有
            console.log('库房环境选中所有');
        },
        SelectionChangeKFHJ(val) {//库房环境--选中
            console.log(val, '库房环境--列表选中的项发生变化');
            this.ACSSelect = val;
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
        SelectionChangeMJKQJ(val) { //门禁机----选中
            this.MJXIUGAIlist = val
            console.log(this.MJXIUGAIlist, '门禁机----选中数据');
        },
        handleSelectMJJ(val) { //密集架设置--选中所有
            console.log('密集架设置--选中所有');
        },
        SelectionChangeMJJ(val) { //密集架设置----选中
            console.log('密集架设置----选中');
            this.MJJSelect = val;
        },
        handleSelectTDM() { //通道门设置--选中所有
            console.log('通道门设置--选中所有');
        },
        SelectionChangeTDM(val) { //通道门设置----选中
            this.TDMdanxuan = val
            console.log(this.TDMdanxuan, '通道门设置----选中');
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
        addFLVueContextMenu() {
            console.log('添加库房');

            this.innerVisible = true;
            this.KFname = '';
            this.KFcode = '';

        },
        amendVueContextMenu() {
            console.log(this.tempKFaxiosData, '当前要修改库房的数据');
            console.log('修改库房');

            this.innerVisible2 = true;
            this.KFname2 = this.tempKFaxiosData.label;
            this.KFcode2 = this.tempKFaxiosData.storecode;

        },
        deleteVueContextMenu() {
            console.log(this.tempKFaxiosData, '122121212121212112');
            var StoreId = this.tempKFaxiosData.id;
            console.log(StoreId, 'StoreId删除库房');
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
                    axios.get('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/delete?id=' + StoreId).then(
                        success => {
                            console.log(success);
                            if (success.data.code == 666) {
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
                            setTimeout(() => {
                                this.getKFList();
                            }, 100);
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
        apply() {

            localStorage.setItem('arrip', this.PrintSetIPinput)
            localStorage.setItem('arrprot', this.PrintSetPortinput)


            this.$message.success("应用");
        },
        submitKF() {//添加库房
            var StoreId = this.KFcode;
            var StoreName = this.KFname;
            var StoreNewName = this.KFname;
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
            if (StoreId == "") {
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
                "storeCode": this.KFcode,
            }
            console.log(jsonData, 'adfasfadf`````````````````');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/save', jsonData).then(
                success => {
                    if (success.data.code == 666) {
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
                    this.innerVisible = false;
                    setTimeout(() => {
                        this.getKFList();

                    }, 100);
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
        submitKF2() {//修改库房
            var StoreId = this.tempKFaxiosData.id;
            var StoreName = this.KFname2;
            var StoreNewName = this.KFname2;
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
            if (StoreId == "") {
                this.$notify.error({
                    title: '错误提示',
                    message: "库房代码不能为空，请输入代码",
                    offset: 100,
                    duration: 2000
                });
                return;
            }
            var jsonData = {
                "storeId": StoreId,
                "storeName": StoreNewName,
                "storeCode": this.KFcode2,
            }
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/update', jsonData).then(
                success => {
                    console.log(success, '111111111111111111111111`````````````````');
                    if (success.data.code == 666) {
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
                    setTimeout(() => {
                        this.getKFList();
                    }, 100);
                    this.innerVisible2 = false;
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
        KFHJ_test() {
            if (this.ACSSelect.length != 1) {
                this.$message.error('请选择一条数据进行连通')
                return
            }
            const arr = {
                "ip": this.ACSSelect[0].hostname,
                "port": this.ACSSelect[0].httpport
            }
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/ping', arr).then(
                success => {
                    console.log(success, 'ping-成功');
                    if (success.data.data) {
                        this.$message.success('连通成功')
                    } else {
                        this.$message.error('连通失败')
                    }


                },
                error => {
                    this.$message.error('连通失败')
                    console.log(error, 'ping--返回失败的数据');
                })

        },
        KFHJ_relevancy() { this.$message.success("库房环境--关联摄像头") },
        ceshiyemian() {
            this.$router.push('./ceshi')
        },
        KFHJ_deviceGL() { this.$message.success("库房环境--设备管理") },
        KFHJ_delete() {
            if (this.ACSSelect.length != 1) {
                this.$message.error('请选择一条数据进行删除')
            }

            console.log(this.ACSSelect, '122121212121212112');
            var ACId = this.ACSSelect[0].acid;
            console.log(ACId, 'ACId删除库房控制器');

            this.$confirm("将要删除该库房控制器" + ", 是否继续?", "删除", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    var data = {};
                    data.ACId = ACId;
                    axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/delACS', data).then(//添加或更新挂接项（档案盒）
                        success => {
                            console.log(success, '删除库房控制器-成功');
                            if (success.data.code == 200) {
                                this.$message.success("删除成功")//添加或更新挂接项（档案盒）
                                setTimeout(() => {
                                    var jsonData = {
                                        "StoreId": this.tempKFaxiosData.id,
                                        "acLx": 0,
                                    }
                                    axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetACSDataByStoreId', jsonData).then(
                                        success => {
                                            console.log(success, '获取控制器信息列表接口-成功');
                                            console.log(success.data.data, '11111111');
                                            this.storeEnvironmentList = [];
                                            this.storeEnvironmentList = success.data.data;
                                        },
                                        error => {
                                            console.log(error, '获取控制器信息列表接口--返回失败的数据');
                                        })
                                }, 500);
                            }
                            else {
                                this.$message.error(success.data.message)
                            }

                        },
                        error => {
                            console.log(error, '添加库房控制器--返回失败的数据');
                        })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        KFHJ_amend() {

            if (this.ACSSelect.length != 1) {
                this.$message.error('请选择一条数据')
            }
            console.log(this.ACSSelect, '122121212121212112');
            var ACId = this.ACSSelect[0].acid;
            console.log(ACId, 'ACId编辑库房控制器');
            // if (this.ACSSelect.length == 0) {
            //     this.$notify.error({
            //         title: '错误提示',
            //         message: "请选择库房控制器",
            //         offset: 100,
            //         duration: 2000
            //     });
            //     return;
            // }
            this.acs_edit_Visible = true;
            this.acs_edit.StoreId = this.tempKFaxiosData.id;
            this.acs_edit.StoreName = this.tempKFaxiosData.label;
            this.acs_edit.ACId = this.ACSSelect[0].acid;
            this.acs_edit.ACName = this.ACSSelect[0].acname;
            this.acs_edit.HostName = this.ACSSelect[0].hostname;
            this.acs_edit.HttpPort = this.ACSSelect[0].httpport;

            this.acs_edit.AcLx = this.ACSSelect[0].aclx;
        },
        KFHJ_add() {

            if (this.tdmstoreid == '') {
                this.$message.error('请选择库房')
                return
            }
            this.acs_add_Visible = true;
            this.acs_add.StoreId = this.tempKFaxiosData.id;
            this.acs_add.StoreName = this.tempKFaxiosData.label;
        },
        addacs() {
            var data = {};
            data.cmd = 50016;
            data.localip = "127.0.0.1";
            data.UserId = 10;
            data.StoreId = this.acs_add.StoreId;
            data.ACName = this.acs_add.ACName;   //encodeURI();
            data.HostName = this.acs_add.HostName;
            data.HttpPort = this.acs_add.HttpPort;
            data.AcLx = this.acs_add.AcLx;

            console.log(data, '添加库房控制器  ---shuju');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/addACS', data).then(//添加或更新挂接项（档案盒）
                success => {
                    console.log(success, '添加库房控制器-成功');
                    if (success.data.code == 200) {
                        this.$message.success("添加成功")//添加或更新挂接项（档案盒）
                        this.zlx_dah_add_Visible = false;
                        setTimeout(() => {
                            var jsonData = {
                                "StoreId": this.tempKFaxiosData.id,
                                "acLx": 0,
                            }
                            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetACSDataByStoreId', jsonData).then(
                                success => {
                                    console.log(success, '获取控制器信息列表接口-成功');
                                    console.log(success.data.data, '11111111');
                                    this.storeEnvironmentList = [];
                                    this.storeEnvironmentList = success.data.data;
                                },
                                error => {
                                    console.log(error, '获取控制器信息列表接口--返回失败的数据');
                                })
                        }, 500);
                    }
                    else {
                        this.$message.error(success.data.message)
                    }

                },
                error => {
                    console.log(error, '添加库房控制器--返回失败的数据');
                })
        },
        editacs() {
            var data = {};
            data.cmd = 50016;
            data.localip = "127.0.0.1";
            data.UserId = 10;
            data.StoreId = this.acs_edit.StoreId;
            data.ACName = this.acs_edit.ACName;   //encodeURI();
            data.HostName = this.acs_edit.HostName;
            data.HttpPort = this.acs_edit.HttpPort;
            data.AcLx = this.acs_edit.AcLx;
            data.ACId = this.acs_edit.ACId;
            console.log(data, '编辑库房控制器  ---shuju');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/warehouse/editACS', data).then(//添加或更新挂接项（档案盒）
                success => {
                    console.log(success, '编辑库房控制器-成功');
                    if (success.data.code == 200) {
                        this.$message.success("编辑成功")//添加或更新挂接项（档案盒）
                        this.zlx_dah_add_Visible = false;
                        setTimeout(() => {
                            var jsonData = {
                                "StoreId": this.tempKFaxiosData.id,
                                "acLx": 0,
                            }
                            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetACSDataByStoreId', jsonData).then(
                                success => {
                                    console.log(success, '获取控制器信息列表接口-成功');
                                    console.log(success.data.data, '11111111');
                                    this.storeEnvironmentList = [];
                                    this.storeEnvironmentList = success.data.data;
                                },
                                error => {
                                    console.log(error, '获取控制器信息列表接口--返回失败的数据');
                                })
                        }, 500);
                    }
                    else {
                        this.$message.error(success.data.message)
                    }

                },
                error => {
                    console.log(error, '编辑库房控制器--返回失败的数据');
                })
        },
        SPJK_camera() { this.$message.success("视频监控--摄像头") },
        SPJK_VCR() { this.$message.success("视频监控--录像机") },
        SPJK_delete() { this.$message.success("视频监控--删除") },
        SPJK_amend() { this.$message.success("视频监控--修改") },
        SPJK_add() { this.$message.success("视频监控--添加") },

        MJKQJ_userManage() { this.$message.success("门禁机--用户管理") },
        MJKQJ_delete() {
            if (this.MJid == '') {
                this.$message.error('请选择库房')
                return
            }
            if (this.MJXIUGAIlist.length != 1) {
                this.$message.error('请选择一条数据')
                return
            }
            this.$confirm("确定删除该条数据?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
        }).then(() => {
               const jsonData = {
                "did": this.MJXIUGAIlist[0].did,
            }
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/DeleteDoors', jsonData).then(
                success => {
                    if (success.data.code == 200) {
                        this.$message.success('数据删除成功')
                        this.getMJJ()
                    }

                },
                error => {
                    console.log(error, '获取通道门信息列表接口--返回失败的数据');
                })
        }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });

            // this.$confirm("将要删除该门禁机" + ", 是否继续?", "删除", {
            //     confirmButtonText: "确定",
            //     cancelButtonText: "取消",
            //     type: "warning",
            // }).then(() => {
            // const jsonData = {
            //     "did": this.MJXIUGAIlist[0].did,
            // }
            // axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/DeleteDoors', jsonData).then(
            //     success => {
            //         if (success.data.code == 200) {
            //             this.$message.success('数据删除成功')
            //             this.getMJJ()
            //         }

            //     },
            //     error => {
            //         console.log(error, '获取通道门信息列表接口--返回失败的数据');
            //     })
            // })
        },
        MJKQJ_amend() {
            if (this.MJid == '') {
                this.$message.error('请选择库房')
                return
            }
            if (this.MJXIUGAIlist.length != 1) {
                this.$message.error('请选择一条数据')
                return
            }
            this.MJvalue = this.MJXIUGAIlist[0].dtype
            this.inputname = this.MJXIUGAIlist[0].dname,
                this.inputdizhi = this.MJXIUGAIlist[0].dip,
                this.inputport = this.MJXIUGAIlist[0].dport,
                this.inputpwd = this.MJXIUGAIlist[0].dpwd,
                this.inputnumber = this.MJXIUGAIlist[0].machinenumber,
                this.MJdiotitle = '门禁考勤机-编辑'

            this.menjinshow = true
        },
        MJKQJ_add() {
            if (this.MJid == '') {
                this.$message.error('请选择库房')
                return
            }
            this.MJvalue = ''
            this.inputname = '',
                this.inputdizhi = '',
                this.inputport = '',
                this.inputpwd = '',
                this.inputnumber = '',

                this.MJdiotitle = '门禁考勤机-添加'
            this.menjinshow = true

        },
//    addcengjiabiaoqian(val){
//                 console.log(val,'1111111111111111111');
//             let axii=val.code
//         if (localStorage.getItem('arrip') != undefined && localStorage.getItem('arrprot') != undefined ) {
//             var arrip = localStorage.getItem('arrip')
//             var arrport = localStorage.getItem('arrprot')
//             var url = arrip + ':' + arrport
//             let arr =
//                   {
//                     'cmd': '1',
//                     "tcpclient": url
//                   }
//              var testcnt = 0;
//                 axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/initreader', arr).then( //初始化成功
//                     res=>{

//              if(res.data.code==200){
//              console.log(res, '初始化成功ressssssssssssssssssssssssssssssssssss');
//              console.log(axii,'val[0]val[0]val[0]val[0]');
//              let rfid = "BB" + axii
//              let arrone = {
//               'cmd': '2',   //2代表写  1代表读 0代表测试蜂鸣器
//               'rfid': rfid,
//               'tcpclient': url
//             }
//              setTimeout(()=>{
//                 axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/initreader', arrone).then(res=>{//写入成功
//                 if(res.data.code==200){
//                     console.log(res, '写入第一次成功ressssssssssssssssssssssssssssssssssss');
//                     var loop = setInterval(() => {
//                         var arr =
//                         {
//                           'tcpclient': url
//                         }

//                         axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/getdata', arr).then(  //读值rfid
//                           success => {
//                             if (success.data.code != 200) {
//                               this.$message.error(success.data.message);
//                               clearInterval(loop);
//                               return;
//                             }
//                             else if (success.data.data.isruning) {
//                               this.$message.success(success.data.data.msg);
//                               if (testcnt++ > 10) {
//                                 this.$message.error("通讯超时");
//                                 clearInterval(loop);
//                                 return;
//                               }
//                             }
//                             else {
//                               clearInterval(loop);
//                               if (success.data.data.rfid == rfid) {
//                                this.$message.success('标签写入成功')
//                                 // var list = {
//                                 //   "Table_name": this.DAH_TableDesignTittle,
//                                 //   "CODE": axii,
//                                 //   'rfid': rfid
//                                 // }
//                                 // axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchRfidData', list).then(
//                                 //   success => {
//                                 //     //  console.log('更新成功了');

//                                 //     this.kaiguanflage = true
//                                 //     this.updateDAHData();
//                                 //   }
//                                 // ).catch(
//                                 //   error => {
//                                 //     console.log(error, 'error');
//                                 //   }
//                                 // )
//                               } else {
//                                 // this.$message.error('标签写入成功后对比失败' + rfid + success.data.data.rfid)
//                               }
//                             }
//                             //  success.data.data.rfid== rfid
//                           },
//                           error => {
//                             this.$message.error(error);
//                           })
//                       }, 1000)
//                 }
//              }).catch(error=>{
//                 console.log(error);
//              })//写入rfid
//             },2000)

//              }











//                     }
//                 ).catch(error=>{
//                     console.log(error,'errorerrorerrorerrorerror');
//                 }) //初始化











//             }
//              },
        addcengjiabiaoqian(val) {

            let date = new Date();
            let year = date.getFullYear() // 年
            let month = date.getMonth() + 1; // 月
            let day = date.getDate(); // 日
            let hour = date.getHours(); // 时
            let minutes = date.getMinutes(); // 分
            let seconds = date.getSeconds() //秒
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                day = "0" + day;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            // 'CC1010101020110101010201BB' + 
            var indata={
        item: "RFIDPrinter1"
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetSValue', indata).then(//写入rfid
          success => {
              let arrWorkstation=success.data.data.value.split('-')
            let _newEPC = 'BB' + year + month + day + hour + minutes + seconds + '00000000';
            if (arrWorkstation[6] != undefined && arrWorkstation[7] != undefined) {
                // var arrip = localStorage.getItem('arrip')
                // var arrport = localStorage.getItem('arrprot')
                var url = arrWorkstation[6] + ':' + arrWorkstation[7]

                var rfid = "BB" + val.code
                console.log(this.DAH_TableDesignTittle, 'DAH_TableDesignTittleDAH_TableDesignTittle');
                console.log(url, 'urlurlurlurlurlurlurl');

                var arrone = {
                    'cmd': '2',   //2代表写  1代表读 0代表测试蜂鸣器
                    'rfid': _newEPC,
                    'tcpclient': url
                }
                var testcnt = 0;
                axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/scan/initreader', arrone).then(//写入rfid
                    success => {
                        setTimeout(() => {
                            // var arrtwo = {
                            //   'tcpclient': '10.10.10.79:8160'
                            // }
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
                                                    console.log(success.data.data.rfid,_newEPC, '对比值');
                                                    clearInterval(loop);
                                                    if (success.data.data.rfid == _newEPC) {
                                                        var writeCJData = {
                                                            "ColNo": this.ColNo,//列号
                                                            "QuNo": this.QuNo,//区号
                                                            "StoreId": this.storeid,//库房编号
                                                            "localip": "127.0.0.1",
                                                            "DivNo": this.DivNo,//层号
                                                            "LeNo": this.LeNo,//节号
                                                            "ZyNo": this.ZyNo,//左/右
                                                            "cmd": 50003,
                                                            "newEPC": _newEPC
                                                        }
                                        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/KFPTService/getRfid', writeCJData).then(//层标管理写入标签
                                               success => {
                                                console.log(success, '层标管理写入标签-返回的数据');
                                                if (success.data.status == 0) {
                                                   this.$message.success("层架标签写入成功");
                                                    this.gettiaoma()
                                                    // this.getData();
                                                    }
                                                 },
                                            error => {
                                         this.$message.error("服务器连接异常");
                                            console.log(error, '层标管理写入标签-服务器连接异常');
                                                            })









                                          
                                                        // var list = {
                                                        //   "Table_name": this.DAH_TableDesignTittle,
                                                        //   "CODE": this.DAHlist[0].CODE_HGL,
                                                        //   'rfid': rfid
                                                        // }
                                                        // axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchRfidData', list).then(
                                                        //   success => {
                                                        //     //  console.log('更新成功了');
                                                        //     this.$message.success('标签写入成功')
                                                        //     this.kaiguanflage = true
                                                        //     this.updateDAHData();
                                                        //   }
                                                        // ).catch(
                                                        //   error => {
                                                        //     console.log(error, 'error');
                                                        //   }
                                                        // )
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
        },error => {
                    console.log(error, 'error');
                })
        },

      gettiaoma(){


        const arrone = {
                    'StoreId': this.storeid,
                    'ZyNo':this.zystatus,
                    'Level': this.Level,
                    'QuNo': this.QuNo,
                    'ColCn': this.ColNo
                }
                console.log(arrone, 'arronearronearrone');
                axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/cengbiao/getcengbiaodata", arrone).then(
                    (res) => {
                        console.log(res, '成功获取区列表数据');

                        //   this.tableBodyInfoList = [];
                        //   this.columnInfoList = [];
                        if (res.data.code != 200) {
                            this.$message.error(res.data.message);

                            return;
                        }
                        console.log();
                        this.cengjialist = res.data.data.data
                        //     //数据更新后执行
                        this.$nextTick(() => {
                            // myTable是表格的ref属性值
                            if (this.$refs.multipleTable && this.$refs.multipleTable.doLayout) {
                                this.$refs.multipleTable.doLayout();
                            }
                        })
                        //   }


                    },
                    (err) => {
                        console.log(err);
                    }
                );
      },

        MJJ_relevancy() { this.$message.success("密集架设置--关联摄像头") },
        MJJ_filterReset() { this.$message.success("密集架设置--滤网复位") },
        MJJ_barCodeManage() {
            this.cengjiadata = []
            var arr = {}
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/cengbiao/getleftmenu', arr).then(//获取库房密集架
                success => {
                    console.log(success.data.data.data, '获取库房-成功');
                    var a = []
                    a = success.data.data.data
                    this.cengjiadata.push(...a)

                },
                error => {
                    console.log(error, '获取库房--返回失败的数据');
                })
            this.zystatus = '1'
            this.cengjiatiaomashow = true
        },
        MJJ_export() {
            let table = document.querySelector('#MJJ').cloneNode(true);
            // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
            // table.removeChild(table.querySelector(".el-table__fixed-right"));
            // table.removeChild(table.querySelector(".el-table__fixed"));
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
                    '密集架信息数据' + ".xlsx"
                );
            } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
            }
            return wbout;
        },
        MJJ_search() { this.$message.success("密集架设置--查询") },
        MJJ_delete() {
            if (this.tdmstoreid == '') {
                this.$message.error('请选择库房')
                return
            }
            if (this.MJJSelect.length != 1) {
                this.$message.error('请选择一条数据进行删除')
                return
            }


            console.log(this.MJJSelect, '122121212121212112');
            var quid = this.MJJSelect[0].quid;
            console.log(quid, 'mjjid删除智能密集架');
            // if (this.MJJSelect.length == 0) {
            //     this.$notify.error({
            //         title: '错误提示',
            //         message: "请选择智能密集架",
            //         offset: 100,
            //         duration: 2000
            //     });
            //     return;
            // }
            this.$confirm("将要删除该智能密集架" + ", 是否继续?", "删除", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    var data = {};
                    data.quid = quid;
                    axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/Qu/delQu', data).then(//添加或更新挂接项（档案盒）
                        success => {
                            console.log(success, '删除智能密集架-成功');
                            if (success.data.code == 200) {
                                this.$message.success("删除成功")//添加或更新挂接项（档案盒）
                                setTimeout(() => {
                                    var jsonData = {
                                        "StoreId": this.tempKFaxiosData.id,
                                        "acLx": 0,
                                    }
                                    axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetQUData', jsonData).then(
                                        success => {
                                            console.log(success, '获取智能密集架列表接口-成功');
                                            console.log(success.data.data, '11111111');
                                            this.MJJSetList = [];
                                            this.MJJSetList = success.data.data;
                                        },
                                        error => {
                                            console.log(error, '获取智能密集架列表接口--返回失败的数据');
                                        })
                                }, 500);
                            }
                            else {
                                this.$message.error(success.data.message)
                            }

                        },
                        error => {
                            console.log(error, '获取智能密集架列表接口--返回失败的数据');
                        })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        MJJ_edit() {
            if (this.tdmstoreid == '') {
                this.$message.error('请选择库房')
                return
            }
            if (this.MJJSelect.length != 1) {
                this.$message.error('请选择一条数据进行修改')
                return
            }
            console.log(this.MJJSelect, '122121212121212112');
            this.mjj_edit_Visible = true;
            this.mjj_edit.StoreId = this.tempKFaxiosData.id;
            this.mjj_edit.StoreName = this.tempKFaxiosData.label;
            this.mjj_edit.quid = this.MJJSelect[0].quid;
            this.mjj_edit.mjjtype = this.MJJSelect[0].mjjtype;
            this.mjj_edit.storeno = this.MJJSelect[0].storeno;
            this.mjj_edit.quno = this.MJJSelect[0].quno;
            this.mjj_edit.type = String(this.MJJSelect[0].type);
            if(this.mjj_edit.type=='1'){
                this.QuTypeShow1=true;
            }else{
                this.QuTypeShow1=false;
            }
            this.mjj_edit.gridno = this.MJJSelect[0].gridno;
            this.mjj_edit.quname = this.MJJSelect[0].quname;
            this.mjj_edit.colcn = this.MJJSelect[0].colcn;
            this.mjj_edit.lecn = this.MJJSelect[0].lecn;
            this.mjj_edit.divcn = this.MJJSelect[0].divcn;
            this.mjj_edit.rlcn = this.MJJSelect[0].rlcn;
            this.mjj_edit.gdlno = this.MJJSelect[0].gdlno;
            this.mjj_edit.hostname = this.MJJSelect[0].hostname;
            this.mjj_edit.httpport = this.MJJSelect[0].httpport;
            this.mjj_edit.username = this.MJJSelect[0].username;
            this.mjj_edit.password = this.MJJSelect[0].password;
            this.mjj_edit.firstcolno = this.MJJSelect[0].firstcolno;
            this.mjj_edit.colnorule = this.MJJSelect[0].colnorule;
        },
        MJJ_add() {

            if (this.tdmstoreid == '') {
                this.$message.error('请选择库房')
                return
            }

            this.mjj_add_Visible = true;
            this.mjj_add.StoreId = this.tempKFaxiosData.id;
            this.mjj_add.StoreName = this.tempKFaxiosData.label;
        },
        addmjj() {
            // mjj_add:{
            //     StoreId:0,
            //     StoreName:"", 
            //     mjjtype:"8",
            //     storeno:0,
            //     quno:0,
            //     quname:"", 
            //     colcn:0,
            //     lecn:0,
            //     divcn:0,
            //     rlcn:15,
            //     gdlno:1,
            //     hostname:"127.0.0.1",
            //     httpport:9000,
            //     username:"",
            //     password:"",
            //     firstcolno:1,
            //     colnorule:"1",
            // },
            var data = this.mjj_add;
            console.log(data, '添加库房密集架  ---shuju');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/Qu/addQu', data).then(//添加或更新库房密集架
                success => {
                    console.log(success, '添加库房密集架-成功');
                    if (success.data.code == 200) {
                        this.$message.success("添加成功")//添加或更新库房密集架
                        this.zlx_dah_add_Visible = false;
                        this.mjj_add_Visible = false;
                        setTimeout(() => {
                            var jsonData = {
                                "StoreId": this.tempKFaxiosData.id,
                                "acLx": 0,
                            }
                            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetQUData', jsonData).then(
                                success => {
                                    console.log(success, '获取密集架信息列表接口-成功');
                                    console.log(success.data.data, '11111111');
                                    this.MJJSetList = [];
                                    this.MJJSetList = success.data.data;
                                },
                                error => {
                                    console.log(error, '获取密集架信息列表接口--返回失败的数据');
                                })
                        }, 500);
                    }
                    else {
                        this.$message.error(success.data.message)
                    }

                },
                error => {
                    console.log(error, '添加库房控制器--返回失败的数据');
                })
        },
        editmjj() {
            var data = this.mjj_edit;
            console.log(data, '更新库房密集架  ---shuju');
            axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/Qu/editQu', data).then(//更新库房密集架
                success => {
                    console.log(success, '更新库房密集架-成功');
                    if (success.data.code == 200) {
                        this.$message.success("更新库房密集架成功")//添加或更新库房密集架
                        this.zlx_dah_add_Visible = false;
                        setTimeout(() => {
                            var jsonData = {
                                "StoreId": this.tempKFaxiosData.id,
                                "acLx": 0,
                            }
                            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetQUData', jsonData).then(
                                success => {
                                    console.log(success, '更新库房密集架-成功');
                                    console.log(success.data.data, '11111111');
                                    this.MJJSetList = [];
                                    this.MJJSetList = success.data.data;
                                    this.mjj_edit_Visible = false
                                },
                                error => {
                                    console.log(error, '更新库房密集架--返回失败的数据');
                                })
                        }, 500);
                    }
                    else {
                        this.$message.error(success.data.message)
                    }

                },
                error => {
                    console.log(error, '添加库房控制器--返回失败的数据');
                })
        },
        TDM_relevancy() { this.$message.success("通道门设置--关联摄像头") },
        TDM_add() {
            if (this.tdmstoreid == '') {
                this.$message.error('请选择左侧库房')
                return
            }

            this.bianhaoshow = true
            this.diotitle = '添加通道门设置'
            console.log(this.tdmstoreid, 'sssssssssssssssss');

            this.archivalinformationhgl = true


        },
        TDM_sahnchu() {
            if (this.tdmstoreid == '') {
                this.$message.error('请选择左侧库房')
                return
            }
            if (this.TDMdanxuan.length < 1) {
                this.$message.error('请选择一条数据')
                return
            }
            if (this.TDMdanxuan.length > 1) {
                this.$message.error('只能选择一条数据进行删除')
                return
            }
            this.$confirm("确定删除该条数据?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
        }).then(() => {
            const arr = {
                'StoreId': this.tdmstoreid,
                'No': this.TDMdanxuan[0].no,
            }
            console.log(arr, '添加要传的数据');
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/rfiddoor/delRfiddoor", arr).then(res => {
                console.log(res, '删除通道门返回信息成功');
                if (res.data.code != 200) {
                    return
                }
                this.$message.success(res.data.data)
                const jsonData = {
                    "StoreId": this.tdmstoreid,
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetRfidDoorData', jsonData).then(
                    success => {
                        console.log(success, '获取通道门信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.TDMList = [];
                        this.TDMList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取通道门信息列表接口--返回失败的数据');
                    })
                this.archivalinformationhgl = false
            }).catch(
                error => {
                    console.log(error);
                })
        }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
            // this.delRfiddoor[0].no
           



        },
        TDM_edit() {

            if (this.tdmstoreid == '') {
                this.$message.error('请选择左侧库房')
                return
            }
            if (this.TDMdanxuan.length < 1) {
                this.$message.error('请选择一条数据')
                return
            }
            if (this.TDMdanxuan.length > 1) {
                this.$message.error('只能选择一条数据进行修改')
                return
            }


            this.bianhaoshow = false
            this.bianhao = this.TDMdanxuan[0].no
            this.tdmname = this.TDMdanxuan[0].name
            this.tdmip = this.TDMdanxuan[0].hostname
            this.tdmport = this.TDMdanxuan[0].httpport
            this.diotitle = '修改通道门设置'
            this.archivalinformationhgl = true


        },
        zhiNengDengGuang() {//智能灯光
            axios.get('http://' + this.ServeIp + ':' + this.ServePort + '/custom/get?key=moduleType').then(res => {
                console.log(res,'获取灯光模块');
                if (res.data.data.content == '1') {
                    this.isZndgNew = true
                } else {
                    this.isZndgNew = false
                }
            }).catch(error=>{
                console.log(error,'error');
            })
        },
        DG_add() {
            if (this.tdmstoreid == '') {
                this.$message.error('请选择左侧库房')
                return
            }

            this.bianhaoshowDG = true
            this.diotitle = '添加智能灯光设置'
            console.log(this.tdmstoreid, 'sssssssssssssssss');
            this.archivalinformationhglDG = true

            this.dengguangForm.ip = ''
            this.dengguangForm.port = ''
            this.dengguangForm.deviceType = 8
            this.dengguangForm.moduleName = ''
            this.dengguangForm.slaveNumber = ''
            
        },
        DG_sahnchu() {
            if (this.tdmstoreid == '') {
                this.$message.error('请选择左侧库房')
                return
            }
            if (this.DGdanxuan.length < 1) {
                this.$message.error('请选择一条数据')
                return
            }
            if (this.DGdanxuan.length > 1) {
                this.$message.error('只能选择一条数据进行删除')
                return
            }

            // this.delRfiddoor[0].no
            const arr = {
                'StoreId': this.tdmstoreid,
                'No': this.DGdanxuan[0].no,
            }
            console.log(arr, '添加要传的数据');
            axios.get("http://" + this.ServeIp + ":" + this.ServePort + "/lightModule/delete?id="+this.DGdanxuan[0].lightModuleId+"").then(res => {
                console.log(res, '删除通道门返回信息成功');
                if (res.data.code != 200) {
                    this.$message.error(res.data.message)
                    return
                }
                this.$message.success('删除成功')
                
                axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/lightModule/getInfoById?id=' + this.tdmstoreid).then(
                    success => {
                        console.log(success, '获取通道门信息列表接口-成功');
                        console.log(success.data.data, '11111111');
                        this.DGList = [];
                        this.DGList = success.data.data;
                    },
                    error => {
                        console.log(error, '获取通道门信息列表接口--返回失败的数据');
                    })
                this.archivalinformationhglDG = false
            }).catch(
                error => {
                    console.log(error);
                })



        },
        DG_edit() {

            if (this.tdmstoreid == '') {
                this.$message.error('请选择左侧库房')
                return
            }
            if (this.DGdanxuan.length < 1) {
                this.$message.error('请选择一条数据')
                return
            }
            if (this.DGdanxuan.length > 1) {
                this.$message.error('只能选择一条数据进行修改')
                return
            }


            this.bianhaoshowDG = false
            this.dengguangForm.moduleName = this.DGdanxuan[0].moduleName
            // this.tdmname = this.DGdanxuan[0].name
            this.dengguangForm.ip = this.DGdanxuan[0].ip
            this.dengguangForm.port = this.DGdanxuan[0].port
            this.dengguangForm.slaveNumber = this.DGdanxuan[0].slaveNumber
            this.dengguangForm.deviceType = this.DGdanxuan[0].deviceType
            this.diotitle = '修改智能灯光设置'
            this.archivalinformationhglDG = true
        },
        // 灯光
        tdmtianjiasaveDG() {
            if (this.dengguangForm.port == '') {
                this.$message.error('请输入端口')
                return
            }
            if (this.dengguangForm.ip == '') {
                this.$message.error('请输入网关ip')
                return
            }
            if (this.dengguangForm.slaveNumber == '') {
                this.$message.error('请输入从机编号')
                return
            }
            if (this.dengguangForm.moduleName == '') {
                this.$message.error('请输入模块名称')
                return
            }
            if (this.diotitle == '添加智能灯光设置') {
                const arr = {
                    'warehouseId': this.tdmstoreid,
                    'port': this.dengguangForm.port,
                    'ip': this.dengguangForm.ip,
                    'slaveNumber': this.dengguangForm.slaveNumber,
                    'deviceType': this.dengguangForm.deviceType,
                    'moduleName': this.dengguangForm.moduleName
                }
                console.log(arr, '添加要传的数据');
                axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/lightModule/save", arr).then(res => {
                    console.log(res, '添加成功返回信息');
                    if (res.data.code != 200) {
                        this.$message.success(res.data.message)
                        return
                    }
                    this.$message.success('添加成功')
                    setTimeout(() => {
                        // const jsonData = {
                        //     "StoreId": this.tdmstoreid,
                        // }
                        axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/lightModule/getInfoById?id=' + this.tdmstoreid).then(
                            success => {
                                console.log(success, '获取通道门信息列表接口-成功');
                                console.log(success.data.data, '11111111');
                                this.DGList = [];
                                this.DGList = success.data.data;
                            },
                            error => {
                                console.log(error, '获取通道门信息列表接口--返回失败的数据');
                            })
                    }, 500)
                    this.archivalinformationhglDG = false
                }).catch(
                    error => {
                        console.log(error);
                    })


            } else {
                const arr = {
                    'warehouseId': this.tdmstoreid,
                    'port': this.dengguangForm.port,
                    'ip': this.dengguangForm.ip,
                    'slaveNumber': this.dengguangForm.slaveNumber,
                    'deviceType': this.dengguangForm.deviceType,
                    'moduleName': this.dengguangForm.moduleName,
                    'lightModuleId': this.DGdanxuan[0].lightModuleId
                }
                console.log(arr, '修改通道门要传的数据');
                axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/lightModule/update", arr).then(res => {
                    console.log(res, '修改成功返回信息');
                    if (res.data.code != 200) {
                        this.$message.success(res.data.message)
                        return
                    }
                    this.$message.success('修改成功')
                    setTimeout(() => {
                        // const jsonData = {
                        //     "StoreId": this.tdmstoreid,
                        // }
                        axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/lightModule/getInfoById?id=' + this.tdmstoreid).then(
                            success => {
                                console.log(success, '获取通道门信息列表接口-成功');
                                console.log(success.data.data, '11111111');
                                this.DGList = [];
                                this.DGList = success.data.data;
                            },
                            error => {
                                console.log(error, '获取通道门信息列表接口--返回失败的数据');
                            })
                    }, 500)
 

                    this.archivalinformationhglDG = false
                }).catch(
                    error => {
                        console.log(error);
                    })
            }

        },
        handleSelectDG() { //通道门设置--选中所有
            console.log('通道门设置--选中所有');
        },
        SelectionChangeDG(val) { //通道门设置----选中
            console.log(val, '通道门设置----选中');
            this.DGdanxuan = val
            
        },
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

.rfidmark {
    .el-input--small {
        width: 20vw !important;
        // z-index:9999999!important
    }
}

.el-dropdown-menu el-popper user-dropdown {
    top: 56px !important;
}

.cengjiabiaoge {
    height: 16.5vw !important;

}

.kfcode {
    width: 100%;
}
</style>
  