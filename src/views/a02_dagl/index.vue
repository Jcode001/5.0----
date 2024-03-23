<template>
  <div v-title data-title="智慧档案馆管理总平台 " class="app-container">
    <el-dialog title="档案信息添加" @close="RecordClose()" width="50%" center :visible.sync="archivalinformation">
      <el-tabs v-model="activeNameRecord" @tab-click="Putdowntabs">
        <el-tab-pane label="档案盒" name="first">

          <!-- <div class="Modeldesign">
            <label>基本信息</label>
          </div>
          <div class="archPutdown">
            <div class="archPutdownone">
              <div v-for="(item, index) in RecordInputList" :key="index">
                <label>{{ item.label }}：</label>
                <el-input style="width: 7vw;margin-left: auto;" v-model="item.value"></el-input>
              </div>
            </div>
          </div> -->
          <div style="height:20vw;overflow-y: scroll;">
            <el-descriptions title="基本信息" border>
              <template v-for="(item, index) in RecordInputList">

                <el-descriptions-item v-if="item.type == 1" :key="index">
                  <template slot="label">
                    <span v-if="item.need == 1" style="color:red">*</span>
                    <i class="el-icon-tickets" />{{ item.label }}
                  </template>
                  <el-input type="number" style="width: 100%;margin-left: auto;" v-model="item.value"></el-input>

                </el-descriptions-item>


                <el-descriptions-item v-else :key="index">
                  <template slot="label">
                    <span v-if="item.need == 1" style="color:red">*</span>

                    <i class="el-icon-tickets" />{{ item.label }}

                  </template>
                  <el-input style="width: 100%;margin-left: auto;" v-model="item.value"></el-input>
                </el-descriptions-item>


              </template>
            </el-descriptions>

          </div>
          <div class="footernewVal">
            <div>
              <el-button type="primary" @click="applyDAH()">应用</el-button>
              <el-button @click="archivalinformation = false">取消</el-button>
            </div>
            <div>
              <!-- <el-button style="margin-right: 1vw" type="primary">打印条码</el-button> -->
              <span>盒条码号:
                <el-input style="width: 14vw; margin-left: 1vw; margin-right: 1vw"
                  v-model="Putdownloan.Boxbarcode"></el-input>
              </span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="档案" name="second">
          <div style="height:20vw;overflow-y: scroll;">
            <el-descriptions title="基本信息" border>
              <template v-for="(item, index) in DA_RecordInputList">
                <el-descriptions-item v-if="item.type == 1" :key="index">
                  <template slot="label">
                    <span v-if="item.need == 1" style="color:red">*</span>
                    <i class="el-icon-tickets" />{{ item.label }}
                  </template>
                  <el-input type="number" style="width: 100%;margin-left: auto;" v-model="item.value"></el-input>
                </el-descriptions-item>
                <el-descriptions-item v-else :key="index">
                  <template slot="label">
                    <span v-if="item.need == 1" style="color:red">*</span>
                    <i class="el-icon-tickets" />{{ item.label }}
                  </template>
                  <el-input style="width: 100%;margin-left: auto;" v-model="item.value"></el-input>
                </el-descriptions-item>
              </template>
            </el-descriptions>

          </div>
          <div class="footernewVal">
            <div>
              <el-button type="primary" @click="applyDA()">应用</el-button>
              <el-button @click="archivalinformation = false">取消</el-button>
            </div>
            <div>
              <!-- <el-button style="margin-right: 1vw" type="primary">打印条码</el-button> -->
              <span>条码号:
                <el-input style="width: 14vw; margin-left: 1vw; margin-right: 1vw"
                  v-model="Putdownloan.archBoxbarcode"></el-input>
              </span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog title="Excel普通导入" @close="importClose()" width="90%" center :visible.sync="archivalinformationImport">
      <div class="Modeldesign">
        <div style="margin-left: -1vw"><el-button type="primary" @click="getUpLoadList()">刷新</el-button></div>
        <div>
          <el-button type="primary" @click="uploadlist_add_Visible = true">添加</el-button>
          <el-dialog width="30%" title="添加Excel文件信息" :visible.sync="uploadlist_add_Visible" append-to-body>
            <el-form :model="uploadlist_add">
              <el-form-item label="Excel类型" :label-width="formLabelWidth">
                <el-select v-model="uploadlist_add.exceltype" placeholder="请选择">
                  <el-option label="档案盒" value="0"></el-option>
                  <el-option label="档案" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="序号：" :label-width="formLabelWidth">
                <el-input v-model="uploadlist_add.filesort" autocomplete="off" clearable=""></el-input>
              </el-form-item>
              <el-form-item label="文件名称：" :label-width="formLabelWidth">
                <el-input v-model="uploadlist_add.filename" autocomplete="off" clearable=""></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-aline: center">
              <el-button @click="uploadlist_add_Visible = false">取 消</el-button>
              <el-button type="primary" @click="addSumbitUpLoadList()">添 加</el-button>
            </div>
          </el-dialog>
        </div>

        <div><el-button type="danger" @click="editUpLoadList()">修改</el-button>
          <el-dialog width="30%" title="修改Excel文件信息" :visible.sync="uploadlist_edit_Visible" append-to-body>
            <el-form :model="uploadlist_edit">
              <el-form-item label="序号：" :label-width="formLabelWidth">
                <el-input v-model="uploadlist_edit.filesort" autocomplete="off" clearable=""></el-input>
              </el-form-item>
              <el-form-item label="文件名称：" :label-width="formLabelWidth">
                <el-tag type="danger" style="width: 100%;">{{ uploadlist_edit.filename }}</el-tag>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-aline: center">
              <el-button @click="uploadlist_edit_Visible = false">取 消</el-button>
              <el-button type="primary" @click="editSumbitUpLoadList()">更 新</el-button>
            </div>
          </el-dialog>
        </div>
        <div><el-button type="info" @click="deleteUpLoadList()">删除</el-button></div>
      </div>
      <el-table :data="uploadlistdata" @selection-change="UpLoadList_handleSelectionChange" border style="width: 100%"
        max-height="400">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column fixed prop="index" label="顺序" width="60" align="center"></el-table-column>
        <el-table-column fixed prop="id" label="文件索引" width="120" align="center"></el-table-column>
        <el-table-column fixed prop="filename" label="文件名称" width="120" align="center"></el-table-column>
        <el-table-column fixed prop="filepath" label="文件路径" width="120" align="center"></el-table-column>
        <el-table-column fixed prop="startpos" label="导前数据量" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="endpos" label="导后数据量" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="totalcnt" label="总条数" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="mlname" label="门类名称" width="120" align="center"></el-table-column>
        <el-table-column fixed prop="mlid" label="门类索引" width="80" align="center"></el-table-column>
        <el-table-column fixed prop="tablename" label="表名" width="160" align="center"></el-table-column>
        <el-table-column fixed prop="inportokcnt" label="成功条数" width="100" align="center"></el-table-column>
        <!-- <el-table-column fixed prop="inporterrcnt" label="失败条数" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="noinportcnt" label="未导入条数" width="100" align="center"></el-table-column> -->
        <el-table-column fixed prop="createtime" label="创建时间" width="100" align="center"></el-table-column>
        <el-table-column fixed prop="updatetime" label="更新时间" width="100" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClickimport(scope.row)">上传</el-button>
            <el-button type="text" size="small" style="margin-left:1rem" @click="inportcheck(scope.row)">检查</el-button>
            <el-button type="text" size="small" style="margin-left:1rem" @click="inportdata(scope.row)">导入</el-button>
            <!-- <el-button type="text" size="small" style="margin-left:1rem" @click="downloadFile(scope.row)">下载</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="footerbuttons">
        <el-button @click="archivalinformationImport = false" type="primary">确认</el-button>
        <el-button @click="archivalinformationImport = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="30%" title="上传Excel数据文件" :visible.sync="uploadfile_Visible" append-to-body>
      <el-form>
        <el-form-item label="门类名称：" :label-width="formLabelWidth">
          <el-tag type="danger" style="width: 100%;">{{ upload_mlname }}</el-tag>
        </el-form-item>
        <el-form-item label="文件名称：" :label-width="formLabelWidth">
          <el-tag type="danger" style="width: 100%;">{{ upload_filename }}</el-tag>
        </el-form-item>
        <el-form-item label="数据表名称：" :label-width="formLabelWidth">
          <el-tag type="danger" style="width: 100%;">{{ upload_tablename }}</el-tag>
        </el-form-item>
        <el-form-item label="数据表名称：" :label-width="formLabelWidth">
          <input type="file" @change="uploadFile">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline: center">
        <el-button type="primary" @click="uploadfile_Visible = false">退 出</el-button>
      </div>
    </el-dialog>
    <el-dialog width="30%" :label-position="top" :visible.sync="inportdataing_Visible" append-to-body>
      <el-form>
        <el-form-item style="margin:0 auto">
          <el-progress type="circle" :percentage="inportdataingrate" style="margin:0 auto"></el-progress>
        </el-form-item>
        <el-form-item style="margin:0 auto">
          <span style="margin:0 auto"> {{ inportdataingmsg }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="30%" :label-position="top" :visible.sync="inportchecking_Visible" append-to-body>
      <el-form>
        <el-form-item style="margin:0 auto">
          <el-progress type="circle" :percentage="inportdataingrate" style="margin:0 auto"></el-progress>
        </el-form-item>
        <el-form-item style="margin:0 auto">
          <span style="margin:0 auto"> {{ inportdataingmsg }}</span>
        </el-form-item>
        <el-form-item prop="desc">
          <el-input type="textarea" v-model="inportdataingcheckingmsg"></el-input>
        </el-form-item>
      </el-form>
      <div class="footerbuttons">
        <el-button @click="inportchecking_Visible = false" type="primary">退出</el-button>
      </div>
    </el-dialog>
    <!-- 在借历史弹窗 -->
    <el-dialog title="在借档案" width="75%" center :visible.sync="filepopupwindow" @close="OnBrrowClose()">
      <el-tabs style="width:73vw" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="档案盒" name="first">
          <div class="Modeldesign">
            <div style="margin-left: -1vw">
              <el-button @click="DHA_zaijiedaochu" type="primary">导出</el-button>
            </div>
            <div><el-button type="info" @click="danganhefileboxreturn">归还</el-button></div>
            <div><el-button type="danger" @click="danganhequanbu">全部</el-button></div>
            <div><el-button type="primary" @click="yuqidanganhe">逾期档案盒</el-button></div>
            <div><el-button type="primary" @click="weiyuqi">未逾期档案盒</el-button></div>
            <div><el-button type="primary" @click="heneiwenjian">盒内文件</el-button></div>
          </div>

          <el-table ref="zaijielishitable" border height="450" id="ZJDAHdaochu" @select-all="handleSelecthonghgl"
            :data="FileonloanTable" @selection-change="handleSelectionChangehonghgl">
            <el-table-column type="selection"></el-table-column>
            <el-table-column show-overflow-tooltip :formatter="zaijieDAH" :prop="item.prop" :label="item.label"
              width="100" v-for="(item, index) in zaijielishihgl" :key="index"></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="档案" name="second">
          <div class="Modeldesign">
            <div style="margin-left: -1vw">
              <el-button type="primary" @click="DA_zaijiedaochu">导出</el-button>
            </div>
            <div><el-button type="info" @click="danganfileboxreturn">归还</el-button></div>
            <div><el-button type="danger" @click="danganquanbu">全部</el-button></div>
            <div><el-button type="primary" @click="danganyuqi">逾期档案</el-button></div>
            <div><el-button type="primary" @click="danganweiyuqi">未逾期档案</el-button></div>
          </div>

          <el-table ref="zaijielishitable_DA" border height="450" id="ZJDAdaochu" @select-all="handleSelecthongdangan"
            :data="borrowingfilebox" @selection-change="handleSelectionChangehonghgldangan">
            <el-table-column type="selection"></el-table-column>
            <el-table-column :formatter="zaijieDA" :show-overflow-tooltip='true' :prop="item.prop" :label="item.label"
              width="100" v-for="(item, index) in zaijielishi" :key="index"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div v-if="heneishow">
        <div v-if="DAFYshow" style="float: right;">
          <el-pagination @size-change="DAHFYhandleSizeChangeone" @current-change="DAHFYhandleCurrentChangeone"
            :current-page="DAHFYpIndex_da" :page-sizes="[20, 50, 100]" :page-size="DAHFYpSize_da"
            layout="total, sizes, prev, pager, next, jumper" :total="DAHFYcount_DA">
          </el-pagination>
        </div>
        <div v-else style="float: right;">
          <el-pagination @size-change="D_AFYhandleSizeChangeone" @current-change="D_AFYhandleCurrentChangeone"
            :current-page="D_AFYpIndex_da" :page-sizes="[20, 50, 100]" :page-size="D_AFYpSize_da"
            layout="total, sizes, prev, pager, next, jumper" :total="D_AFYcount_DA">
          </el-pagination>
        </div>
      </div>

    </el-dialog>

    <!-- 借阅历史弹窗 -->
    <el-dialog title="借阅历史记录" width="75%" center :visible.sync="borrowinghistory">
      <el-tabs style="width:73vw" v-model="activeNameLs" @tab-click="handleClickLs">
        <el-tab-pane label="档案盒" name="first">
          <div class="Modeldesign">
            <div style="margin-left: -1vw">
              <el-button type="primary" @click="DHA_jieyuedaochu">导出</el-button>
            </div>
            <div><el-button type="primary" @click="jieyuedanganhe">盒内文件</el-button></div>
          </div>
          <el-table ref="jieyuelishi_DAH" border height="450" id="JYDAHdaochu" max-height="400"
            @selection-change="jieyuelishichange" :data="loanhistoryTable">

            <el-table-column type="selection"> </el-table-column>

            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column :show-overflow-tooltip='true' :formatter="DAHdateFormat" :prop="item.prop"
              :label="item.label" v-for="(item, index) in jieyuelishijilu" :key="index">

            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="档案" name="second">
          <div class="Modeldesign">
            <div style="margin-left: -1vw">
              <el-button type="primary" @click="DH_jieyuedaochu">导出</el-button>
            </div>
          </div>
          <el-table ref="jieyuelishi_DA" border height="450" id="JYDAdaochu" max-height="400"
            @selection-change="jieyuelishichangedanan" :data="borrowhistoryfiles">
            <el-table-column type="selection"> </el-table-column>

            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column :show-overflow-tooltip='true' :formatter="DAdateFormat" :prop="item.prop" :label="item.label"
              v-for="(item, index) in jieyuelishijiludangan" :key="index"></el-table-column>


          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div v-if="jieyueshowshowtrue">


        <div v-if="jieyueDAFYshow" style="float: right;">
          <el-pagination @size-change="jieyueDAHFYhandleSizeChangeone" @current-change="jieyueDAHFYhandleCurrentChangeone"
            :current-page="jieyueDAHFYpIndex_da" :page-sizes="[10, 20, 50, 100]" :page-size="jieyueDAHFYpSize_da"
            layout="total, sizes, prev, pager, next, jumper" :total="jieyueDAHFYcount_DA">
          </el-pagination>
        </div>
        <div v-else style="float: right;">
          <el-pagination @size-change="jieyueD_AFYhandleSizeChangeone" @current-change="jieyueD_AFYhandleCurrentChangeone"
            :current-page="jieyueD_AFYpIndex_da" :page-sizes="[10, 20, 50, 100]" :page-size="jieyueD_AFYpSize_da"
            layout="total, sizes, prev, pager, next, jumper" :total="jieyueD_AFYcount_DA">
          </el-pagination>
        </div>




      </div>

    </el-dialog>
    <!-- 档案盒借阅 -->
    <el-dialog :title="DAarchive" center :visible.sync="fileboxforloan" @close="BrrowClose()">
      <div class="Modeldesignlists">
        <div style="margin-left: -1vw">
          <el-button type="primary" @click="DAH_Borrow()">借阅</el-button>
        </div>
        <!-- <div><el-button type="primary">打开</el-button></div>
        <div><el-button type="primary">借阅单</el-button></div> -->
      </div>
      <div class="fileboxloanpage">
        <div class="fileboxloanpageone">
          <div style="margin-left: -2vw">
            <label>借阅流水号:</label>
            <el-input style="width: 10vw; margin-left: 1vw" v-model="Fileboxesloan.loannumber"></el-input>
          </div>
          <div>
            <label>固定电话:</label>
            <el-input style="width: 10vw; margin-left: 1vw; margin-right: 1vw"
              v-model="Fileboxesloan.loanphone"></el-input>
          </div>
        </div>

        <div class="fileboxloanpagetwo">
          <div>
            <label>借阅人:</label>
            <el-input style="width: 10vw; margin-left: 0.5vw; margin-right: 0.2vw"
              v-model="Fileboxesloan.borrower"></el-input>
            <span style="color: red">*</span>
          </div>
          <div>
            <label>手机号码:</label>
            <el-input style="width: 10vw; margin-left: 1vw; margin-right: 0.6vw"
              v-model="Fileboxesloan.Borrowphone"></el-input>
            <span style="color: red">*</span>
          </div>
        </div>

        <div class="fileboxloanpagethree">
          <div style="margin-left: -0.8vw">
            <label>电子邮箱:</label>
            <el-input style="width: 10vw; margin-left: 0.5vw; margin-right: 0.2vw"
              v-model="Fileboxesloan.Emailaddress"></el-input>
          </div>
          <div>
            <label>备注:</label>
            <el-input style="width: 10vw; margin-left: 1vw; margin-right: 1vw"
              v-model="Fileboxesloan.Borrowingnote"></el-input>
          </div>
        </div>

        <div class="fileboxloanpagefor">
          <div style="margin-left: -0.8vw">
            <label>借阅天数:</label>
            <el-input style="width: 10vw; margin-left: 0.5vw; margin-right: 0.2vw"
              v-model="Fileboxesloan.Loandays"></el-input>
            <span style="color: red">*</span>
          </div>
          <div>
            <label>经办人:</label>
            <el-input style="width: 10vw; margin-left: 1vw; margin-right: 1vw" v-model="Fileboxesloan.agent"></el-input>
          </div>
        </div>

        <div class="fileboxloanpagefix">
          <div style="margin-left: -0.8vw">
            <label>利用目的:</label>
            <el-input style="width: 10vw; margin-left: 0.5vw; margin-right: 0.2vw"
              v-model="Fileboxesloan.Putilization"></el-input>
          </div>
          <div>
            <label>借阅日期:</label>
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" style="margin-left: 1vw" v-model="Fileboxesloan.loandate"
              type="datetime" placeholder="选择日期时间">
            </el-date-picker>
            <span style="color: red">*</span>
          </div>
        </div>

        <div class="fileboxloanpagesix">
          <div style="margin-left: -0.8vw">
            <label>经办日期:</label>
            <el-date-picker style="margin-left: 1vw" v-model="Fileboxesloan.agentname" type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </div>
      </div>
      <!-- <el-table :data="filelendingTble">
          <el-table-column property="index" label="序号" header-align="center" align="center"></el-table-column>
          <el-table-column property="name" label="信息" header-align="center" align="center"></el-table-column>
          <el-table-column property="number" label="编号" header-align="center" align="center"></el-table-column>
          <el-table-column property="barCode" label="条形码" header-align="center" align="center"></el-table-column>
          <el-table-column property="address" label="存放位置" header-align="center" align="center"></el-table-column>
        </el-table> -->
    </el-dialog>
    <el-dialog @close="kuaisusaomaclose()" title="快速扫码" width="70%" center :visible.sync="quickcodescan">
      <div class="Modeldesignlists">
        <div style="margin-left: -1vw">
          <el-button type="primary" @click="kuaisujieyue(0)">借阅</el-button>
        </div>
        <div><el-button type="primary" @click="kuaisuguihuan(0)">归还</el-button></div>
      </div>
      <div class="quicky">
        <!-- <div class="quicykone">
          <label style="width: 3vw">盒ID:</label>
          <el-input v-model="Fileboxesloan.loannumber"></el-input>
        
        </div> -->

        <div>

          <el-button type="primary" @click="qingchset()">清除</el-button>
          <el-button type="primary" @click="rederfid()">读RFID码</el-button>
          <el-button type="primary" @click="showheneiwenjian()">盒内文件</el-button>
        </div>
      </div>
      <div class="quickylen">
        <div class="quickylenone">
          <div>盒内档案总数</div>
          <div style="margin-right: 0.5vw;">在借数量</div>
          <div style="margin-right: 0.5vw;">档案盒状态</div>
        </div>
        <div class="quickylentwo">
          <div style="
                width: 5vw;
                height: 5vh;
                line-height: 5vh;
                background: rgb(243, 240, 238);
              ">
            {{ heneizongcount }}
          </div>
          <div style="
                width: 5vw;
                height: 5vh;
                line-height: 5vh;
                background: rgb(243, 240, 238);
              ">
            {{ zaijiecount }}
          </div>
          <div style="
                width: 5vw;
                height: 5vh;
                line-height: 5vh;
                background: rgb(243, 240, 238);
              ">
            {{ heneistatus }}
          </div>
        </div>
      </div>
      <div class="quickyle" style="margin-top: 1vh;">
        <el-table ref="saomalist" @row-click="statussaoma" height="350" @selection-change="jieyuedanyuan"
          :data="quickygridData" border="">
          <el-table-column type="selection"> </el-table-column>
          <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
          <el-table-column prop="code" label="条码号" width="100" header-align="center" align="center"></el-table-column>
          <el-table-column prop="MLName" label="门类" width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="info" label="信息" width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="number" label="编号" width="200" header-align="center" align="center"></el-table-column>

          <el-table-column prop="status" label="档案状态" width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="ads" :show-overflow-tooltip='true' label="位置" width="200" header-align="center"
            align="center"></el-table-column>
        </el-table>

      </div>
    </el-dialog>


    <el-dialog title="通道门过门记录" width="70%" center :visible.sync="filepopupwindowRFID">
      <div class="Modeldesign">
        <div style="margin-left: -1vw">
          <el-button v-if="querenshow" @click="queren" type="primary">确认</el-button>
        </div>
        <!-- <div><el-button type="danger" @click="deletest">删除</el-button></div> -->
        <!-- <div><el-button type="primary">刷新</el-button></div>
          <div><el-button type="primary">查看录像</el-button></div>
          <div><el-button type="primary">升级过门记录</el-button></div> -->
      </div>
      <div class="filetongdao">

        <div>
        </div>
        <div>
          <el-radio @input="daiqueren" v-model="radio" label="1">待确认</el-radio>
        </div>
        <div>
          <el-radio @input="yiqueren" v-model="radio" label="2">已确认</el-radio>
        </div>
      </div>


      <el-table border height="400" @select-all="handleSelect" @selection-change="handleSelectionChange_TDM"
        ref="multipleTable" :data="fileTableRFID" tooltip-effect="dark" style="width: 100%"> <el-table-column
          type="selection" width="55">
        </el-table-column>
        <el-table-column property="position" label="全选" width="90"></el-table-column>
        <el-table-column :show-overflow-tooltip='true' :formatter="DOORguomenFormat" :prop="item.prop" :label="item.label"
          width="125" v-for="(item, index) in filebiaotou" :key="index">
          <!-- <template slot-scope="scope">{{ scope.row.data }}</template> -->
        </el-table-column>

      </el-table>
      <div v-if="TDMdaiqueren" style="float: right;">
        <el-pagination @size-change="TDMSizeChangeone" @current-change="TDMCurrentChangeone"
          :current-page="TDMDAHFYpIndex_da" :page-sizes="[10, 20, 50, 100]" :page-size="TDMDAHFYpSize_da"
          layout="total, sizes, prev, pager, next, jumper" :total="TDMDAHFYcount_DA">
        </el-pagination>
      </div>
      <div v-else style="float: right;">
        <el-pagination @size-change="WQRhandleSizeChangeone" @current-change="WQRYhandleCurrentChangeone"
          :current-page="WQRpIndex_da" :page-sizes="[10, 20, 50, 100]" :page-size="WQRpSize_da"
          layout="total, sizes, prev, pager, next, jumper" :total="WQRcount_DA">
        </el-pagination>
      </div>
    </el-dialog>
    <!--  -->
    <el-dialog @close="pandianjihuaclose()" title="档案盘点计划" width="70%" center :visible.sync="filepopupwindowcheckcar">
      <div class="Modeldesign">
        <div style="margin-left: -1vw">
          <el-button type="primary" @click="addPDRFID()">添加</el-button>
        </div>
        <div><el-button type="primary" @click="pandianjieguo()">盘点结果</el-button></div>
        <div>
          <el-input style="width: 15vw; margin-left: 1vw; margin-right: 0.5vw" v-model.trim="filetelist.filepandian"
            placeholder="请输入要查询的盘点计划名称" clearable></el-input>
          <el-button type="primary" @click='pandiansearch()'>查询</el-button>
        </div>
      </div>

      <el-dialog :title="PDTitle" :visible.sync="dialogVisibleRFID" width="30%" center @close="PDClose()">
        <div class="ModelInput">
          <div class="ModelInputone">
            <div>
              <label>档案计划名称:</label>
              <el-input style="width: 15vw; margin-left: 1vw; margin-right: 0.5vw" v-model="inputghRFID"></el-input>
            </div>
          </div>
          <div class="ModelInputone" style="margin-top: 1vh;">
            <div>
              <label>计划人:</label>
              <el-select v-model="valueRFIDJHR" clearable placeholder="请选择" style="width: 15vw;margin-left: 3.3vw;">
                <el-option v-for="item in optionsRFID" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="ModelInputone" style="margin-top: 1vh;">
            <div>
              <label>计划时间:</label>
              <el-date-picker style="width: 15vw;margin-left: 2.5vw;" v-model="valueRFIDTime" type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleRFID = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibleadd()">确 定</el-button>
        </span>
      </el-dialog>
      <el-table ref="xyese" :data="fileTableRFIDcheckcar" height="450" border @selection-change="handleSelectionPandian">
        <el-table-column type="selection" width="55" header-align="center" align="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="55" header-align="center" align="center">
        </el-table-column>
        <el-table-column :show-overflow-tooltip='true' v-for="(item, idx) in DAcolumnInfoPDClist" :key="idx"
          :prop="item.prop" :label="item.label" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditRFID(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteRIFD(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="pandianjisuashow" style="float: right;">
        <el-pagination @size-change="pandiansizechange" @current-change="pandianCurrentChangeone"
          :current-page="pandianpIndex_da" :page-sizes="[10, 20, 50, 100]" :page-size="pandianSize_da"
          layout="total, sizes, prev, pager, next, jumper" :total="pandiancount_DA">
        </el-pagination>
      </div>
      <div v-else style="float: right;">
        <el-pagination @size-change="searchsizechange" @current-change="searchCurrentChangeone"
          :current-page="searchpIndex_da" :page-sizes="[10, 20, 50, 100]" :page-size="searchSize_da"
          layout="total, sizes, prev, pager, next, jumper" :total="searchcount_DA">
        </el-pagination>
      </div>
    </el-dialog>
    <!-- RFID结尾 -->
    <!-- 档案盒归还 -->
    <!--  -->
    <el-dialog :title="title" center :visible.sync="fileboxreturn">
      <div class="Modeldesignlists">
        <div style="margin-left: 1vw">
          <el-button type="primary" @click="huihuantijiao">归 还</el-button>
        </div>
        <!-- <div><el-button type="primary">打开</el-button></div>
          <div><el-button type="primary">归还单</el-button></div> -->
      </div>
      <div class="ModelInput">
        <div class="ModelInputone">
          <div>
            <label>归还人:</label>
            <el-input style="width: 10vw; margin-left: 1vw; margin-right: 0.5vw" v-model="inputgh"></el-input>
            <span style="color: red">*</span>
          </div>
          <div>
            <label>经办人:</label>

            <el-input disabled style="width: 10vw; margin-left: 1vw; margin-right: 1vw" v-model="inputjbr"></el-input>
            <!--  -->
          </div>
        </div>

        <div class="ModelInputtow">
          <div>
            <label>手机号码:</label>
            <el-input style="width: 10vw; margin-left: 0.5vw; margin-right: 0.2vw" v-model="inputphone"></el-input>
            <span style="color: red">*</span>
          </div>
          <div>
            <label>固定电话:</label>
            <el-input style="width: 10vw; margin-left: 1vw; margin-right: 1vw" v-model="inputjgddh"></el-input>
          </div>
        </div>

        <div class="ModelInputthree">
          <div>
            <label>归还日期:</label>
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="valuegrriqi" type="datetime"
              placeholder="选择日期时间"></el-date-picker>
            <span style="color: red">*</span>
          </div>
          <!--  -->
          <!-- <div>
              <label>存放位置:</label>
              <el-input style="width: 10vw; margin-left: 1vw; margin-right: 1vw" v-model="inputcfwz"></el-input>
            </div> -->
        </div>
      </div>
      <!-- <el-table :data="fileboxforloanList" @selection-change="danxuanguihuankuang">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column property="ID" label="序号"></el-table-column>
        <el-table-column property="Info" label="信息"></el-table-column>
        <el-table-column property="Number" label="编号"></el-table-column>
        <el-table-column property="CODE" label="条码号"></el-table-column>
        <el-table-column property="Address" label="存放位置"></el-table-column>
      </el-table> -->
    </el-dialog>
    <!--  -->
    <!-- 档案盒上架 -->
    <el-dialog width="60%" title="档案盒上架" center :visible.sync="OnShelfdialogFormVisible" @close="OnShelfClose()">
      <el-descriptions title="" :model="OnShelfForm" direction="vertical" :column="7" border>
        <el-descriptions-item label="库房：">
          <el-input-number v-model="OnShelfForm.storeno" :min="1" :max="100" label="库房"
            @change="adspostocode()"></el-input-number>
        </el-descriptions-item>
        <el-descriptions-item label="区：">
          <el-input-number v-model="OnShelfForm.QuNo" :min="1" :max="100" label="区"
            @change="adspostocode()"></el-input-number>
        </el-descriptions-item>
        <el-descriptions-item label="列：">
          <el-input-number v-model="OnShelfForm.ColNo" :min="1" :max="100" label="列"
            @change="adspostocode()"></el-input-number>
        </el-descriptions-item>
        <el-descriptions-item label="面：" :span="1">
          <el-select v-model="OnShelfForm.ZyNo" placeholder="架体方向" @change="adspostocode()">
            <el-option label="左" value="1"></el-option>
            <el-option label="右" value="0"></el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="节：">
          <el-input-number v-model="OnShelfForm.LeNo" :min="1" :max="7" label="节"
            @change="adspostocode()"></el-input-number>
        </el-descriptions-item>
        <el-descriptions-item label="层：">
          <el-input-number v-model="OnShelfForm.DivNo" :min="1" :max="7" label="层"
            @change="adspostocode()"></el-input-number>
        </el-descriptions-item>
        <el-descriptions-item label="格：">
          <el-input-number v-model="OnShelfForm.SxNo" :min="1" :max="100" label="格"
            @change="adspostocode()"></el-input-number>
        </el-descriptions-item>
        <el-descriptions-item label="位置编码:" :span="5">
          <el-input style="width:100%" v-model="OnShelfForm.poscode" :disabled="true"></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="OnShelfdialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="OnShelfSumbit()">上 架</el-button>
      </div>
    </el-dialog>

    <div class="header">
      <!-- yanjiajie -->
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        text-color="000" active-text-color="#ffd04b">
        <!-- 著录 -->
        <el-menu-item index="1">
          <div @click="Record()" class="headerzhulu">
            <i class="el-icon-edit"></i>
            著录
          </div>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-film"></i> <span style="color:#000">列表</span> </template>
          <el-submenu index="2-1">
            <template slot="title"><span style="color:#000"> 导出选中</span></template>
            <el-menu-item index="2-1-1" style="color:#000" @click="ExceloutputchangeDA()">档案</el-menu-item>
            <el-menu-item index="2-1-2" style="color:#000" @click="Exceloutputchange()">档案盒</el-menu-item>
          </el-submenu>
          <el-menu-item index="2-2" style="color:#000" @click="Exceloutput()">导出当前</el-menu-item>
          <el-menu-item index="2-3" @click="ExcelImport()" style="color:#000">Excel普通导入</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title"> <span style="color:#000">Excel模板下载</span> </template>
            <el-menu-item index="2-1-1" @click="DAMBExceldownload()" style="color:#000">档案</el-menu-item>
            <el-menu-item index="2-1-2" @click="DAMBHExceldownload()" style="color:#000">档案盒</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-s-management"></i><span style="color:#000"> 借阅管理</span></template>
          <el-menu-item index="3-1" @click="atRorrowHistory()" style="color:#000">在借历史</el-menu-item>
          <el-menu-item index="3-2" @click="onRorrowHistory()" style="color:#000">借阅历史</el-menu-item>
        </el-submenu>
        <!-- 条码打印 -->
        <!-- <el-menu-item index="4">
          <div style="color:#000" class="headerzhulu" @click="barCodePrint()">
            <i class="el-icon-s-fold"></i> 条码打印
          </div>
        </el-menu-item> -->
        <!-- 统计 -->
        <el-menu-item index="5">
          <div @click="statistics()" class="headerzhulu">
            <i class="el-icon-pie-chart"></i>统计
          </div>
        </el-menu-item>
        <!-- 开架管理 -->
        <!-- <el-menu-item index="6">
          <div class="headerzhulu" @click="openShelfManage()"><i class="el-icon-s-tools"></i>开架管理</div>
        </el-menu-item> -->
        <!-- 快速扫码 -->
        <el-menu-item index="7">
          <div @click="saomakuaisu" class="headerzhulu">
            <i class="el-icon-magic-stick"></i>快速扫码
          </div>
        </el-menu-item>
        <el-submenu index="8">
          <template slot="title"><i class="el-icon-cpu"></i> <span style="color:#000"> RFID</span></template>
          <el-menu-item index="8-1" @click="RFIDtdmRecord()" style="color:#000">RFID通道门记录</el-menu-item>
          <el-menu-item index="8-2" @click="getPDResultList()" style="color:#000">RFID盘点计划</el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="9">

        </el-submenu>
        <el-submenu index="10">

        </el-submenu> -->
      </el-menu>
      <!-- yanjiajie -->

      <!-- 模型设计 -->
      <!-- <div class="headerzhulu" @click="TopList()"><i class="el-icon-s-fold"></i>列表</div> -->
      <!-- <el-dropdown @command="handleCommandList" class="avatar-containers" trigger="click">
        <div class="avatar-wrapper">
          <div class="headerzhulu" style="color: #000000">
            <i class="el-icon-s-fold"></i>列表
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="1"> 导出选中 </el-dropdown-item>
          <el-dropdown-item command="2"> 导出当前 </el-dropdown-item>
          <el-dropdown-item command="3"> Excel普通导入 </el-dropdown-item>
          <el-dropdown-item command="4"> Excel模板下载 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <!-- 借阅管理 -->
      <!-- <el-dropdown @command="handleCommand" class="avatar-containers" trigger="click">
        <div class="avatar-wrapper">
          <div class="headerzhulu" style="color: #000000">
            <i class="el-icon-s-fold"></i>借阅管理
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="a"> 在借历史 </el-dropdown-item>
          <el-dropdown-item command="b"> 借阅历史 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->



      <!-- RFID -->
      <!-- <el-dropdown @command="handleCommandRFID" class="avatar-containers" trigger="click">
        <div class="avatar-wrapper">
          <div class="headerzhulu" style="color: #000000">
            <i class="el-icon-s-fold"></i>RFID
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="c"> RFID通道门记录 </el-dropdown-item>
          <el-dropdown-item command="d"> RFID盘点计划</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
    <!-- 表格档案盒 -->
    <div v-if="dapingshowone" class="containerone">

      <div class="TableHeader">
        <div>
          <div style="margin-left: 1vw; margin-top: .4vw;"><img src="~@/assets/a02_dagl/档案盒.png" alt=""
              style="height: 1.9vh;"></div>

        </div>

        <div @mouseleave="shubiaoyichu()" @mouseenter="shubiaoyiru()"
          style="border-radius: 0.3vw;font-size:0.65vw;  height: 3.4vh;width: 4vw;display: flex;align-items: center;justify-content: center;color:#fff;background:#1890ff;margin-left:0.5vw"
          class="menuselect">
          菜单
        </div>
        <!-- <div v-show="yidonghezi" style="position: absolute;top:23vh;left:20vw"><img src="../../assets/小三角.png" alt=""></div> -->
        <!-- <el-button style="margin-right: 1vw" type="primary" @click="DAH_Message()">档案盒信息</el-button> -->
        <el-select style="margin-left:0.5vw" v-model="DAH_optionsvalue" placeholder="请选择搜索项" clearable="">
          <el-option v-for="item in DAH_options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input
          style="border-radius: 5.5px; border: 0.8px solid #8A8A8A;width: 10vw; margin-left: 1vw; margin-right: 1vw"
          v-model.trim="inputlist" clearable=""></el-input>
        <el-button style="height:1.65vw;width:4vw;" type="primary" icon="el-icon-search" @click="SearchDAH()">
          <div style="color:#fff;margin-top:-0.6vw;margin-left:0.5vw; font-size:0.65vw;">查询</div>

        </el-button>
        <el-button style="height:1.6vw;width:5vw;" type="primary" @click="gaojisousou()">
          <div style="color:#fff; font-size:0.65vw;">高级搜索</div>

        </el-button>
        <!-- <el-button style="height:1.6vw;width:5vw;" type="primary" @click="DAH_tongji()  ">
          <div style="color:#fff; font-size:0.65vw;">档案盒统计</div>

        </el-button> -->

        <div :class="dapingshow ? 'quanpingone' : 'quanpingoneone'" @click="bigping()"> </div>
      </div>


      <div style="display:flex;position: relative;">
        <!-- 档案盒菜单下拉部分 -->
        <div @mouseenter="shubiaoyiru()" @mouseleave="shubiaoyichu()" v-show="yidonghezi"
          style="border: 1px solid #6792f0;z-index:999;width:40vw;height:12vh;background:#e0e4ec;position: absolute;top:-0.7vh;left:0vw">
          <div style="width:4vw;height:4vh;">
            <div style="display:flex;margin:1vw">
              <el-button size="medium" type="success" @click="OnShelf()">上架</el-button>
              <el-button size="medium" type="primary" @click="DownShelf()">下架</el-button>
              <el-button size="mini" type="success" @click="handlesaomiao()">RFID写入</el-button>
              <!-- <el-button size="mini" type="primary" @click="getInBoxArch(0)">查看盒内文件</el-button> -->
              <el-button size="mini" type="success" @click="fileboxforloanClick(1)">盒借阅</el-button>
              <el-button size="mini" type="primary" @click="openShelfManage()">开架管理</el-button>
              <!-- YJJ -->
              <el-button size="mini" type="warning" @click="PrinterCode()">标签打印</el-button>
              <el-button size="mini" type="warning" @click="generateGeferenc('hgl')">生成档案盒</el-button>
          
              <el-dialog title="标签打印" :visible.sync="PrinterCodeDialog" width="50%" height="500" center>
                <printer :IpPortPrinter_s="this.IpPortPrinter_s" @getValue="getValue" @flag="flagChange(arguments)"
                  v-if="PrinterCodeDialog" />
              </el-dialog>
              <!-- YJJ -->
            </div>
            <div style="display:flex;margin:1vw">
              <el-button size="medium" type="warning" @click="zhuangxiang()">装箱</el-button>
              <el-button size="medium" type="warning" @click="chaixiang()">拆箱</el-button>
              <!-- <el-button size="medium" type="warning" @click="chuku()">出库</el-button> -->
            </div>

          </div>
        </div>

        <CustomOptionSet v-if="this.DAH_TableDesignTittle != ''" :isCustomOptionSet="isCustomOptionSet"
          :MlId="this.Bus_MLId" :classOne="newclass" :tableName="this.DAH_TableDesignTittle"
          @change="receiveSonMessage($event)" :key="refreshSon"></CustomOptionSet>
        <div @click="collapse()" :class="isCollapse ? 'zhedian' : 'zhedianone'"></div>
        <!-- yjj -->

        <el-table id="table-listone" ref="multipleTable" @row-click="btnDHA" :class="newclass ? 'newclass' : 'oldclass'"
          height="400" :data="tableBodyInfoList" @selection-change="handleSelectallboxes" border>
          <el-table-column v-if="this.tableBodyInfoList.length != 0" type="selection" header-align="center"
            align="center">
          </el-table-column>
          <el-table-column :width="item.width" v-for="( item, idx ) in  columnInfoList " :key="idx" :prop="item.prop"
            :show-overflow-tooltip="true" :label="item.label" header-align="center" align="center">
          </el-table-column>
          <el-table-column v-if="this.tableBodyInfoList.length != 0" label="操作" width="140" fixed="right"
            header-align="center" align="center">
            <template slot-scope="scope">
              <div style="display:flex;">
                <el-button size="mini" @click="handleEdithgl(scope.$index, scope.row)">修改</el-button>
                <!-- <el-button size="mini" type="success" @click="handlesaomiao(scope.$index, scope.row)">RFID写入</el-button> -->
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">回收</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 0.3vw;float: right">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pIndex_dah"
          :page-sizes="[10, 20, 50, 100]" :page-size=pSize_dah layout="total, sizes, prev, pager, next, jumper"
          :total="count_DAH">
        </el-pagination>
      </div>

    </div>
    <div style="height:0.5vh"></div>
    <!-- 表格档案 -->
    <div v-show="dapingshow" class="containertwo">
      <div class="TableHeader">
        <div>
          <div style="margin-left: 1vw; margin-top: .5vw;"><img src="~@/assets/a02_dagl/档案卷.png" alt=""
              style="height: 1.9vh;"></div>

        </div>
        <div @mouseleave="shubiaoyichuone()" @mouseenter="shubiaoyiruone()"
          style="border-radius: 0.3vw;font-size:0.65vw;  height: 3.4vh;width: 4vw;display: flex;  align-items: center;justify-content: center;color:#fff;background:#1890ff; margin-top:.5vh;margin-left:0.5vw"
          class="menuselect">
          菜单
        </div>
        <!-- <div v-show="yidonghezi" style="position: absolute;top:23vh;left:20vw"><img src="../../assets/小三角.png" alt=""></div> -->
        <!-- <div   :class="dapingshowone ? 'oldstyle':'newstyle'" @mouseenter="shubiaoyiruone()"  @mouseleave="shubiaoyichuone()"   v-show="yidonghezione" style=""></div> -->
        <el-select style="margin-left:0.5vw" v-model="DAoptionsvalue" placeholder="请选择搜索项" clearable="">
          <el-option v-for=" item  in  DAoptions " :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width: 10vw; margin-left: 1vw; margin-right: 1vw" v-model.trim="DAinputlist"
          clearable=""></el-input>

        <el-button style="height:1.65vw;width:4vw;" type="primary" icon="el-icon-search" @click="SearchDA()">
          <div style="color:#fff;margin-top:-0.6vw;margin-left:0.5vw; font-size:0.65vw;">查询</div>

        </el-button>

        <!-- <el-button type="primary " style="margin-top:0vw;font-size:0.65vw;height:1.7vw">未装盒文件</el-button> -->
        <el-button style="height:1.6vw;width:5vw;" type="primary" @click="gaojisousouDA()">
          <div style="color:#fff; font-size:0.65vw;">高级搜索</div>

        </el-button>
        <!-- <el-button style="height:1.6vw;width:5vw;" type="primary" @click="DA_tongji()  ">
          <div style="color:#fff; font-size:0.65vw;">档案统计</div>

        </el-button> -->

        <div :class="dapingshowone ? 'quanpingtwo' : 'quanpingonetwo'" @click="bigpingone()"> </div>
      </div>

      <div style="display:flex;position: relative;">
        <!-- 档案菜单下拉部分 -->
        <div
          style="position: absolute;left:0;top:-0.5vh;background:#e0e4ec; border: 1px solid #6792f0;z-index:9999999999;width:40vw;height:8vh;"
          @mouseenter="shubiaoyiruone()" @mouseleave="shubiaoyichuone()" v-show="yidonghezione">
          <div style="width:4vw;height:4vh;">
            <div style="display:flex;margin:1vw">
              <el-button size="mini" type="success" @click="DA_fileboxforloanClick(1)">借阅</el-button>
              <el-button size="mini" type="warning" @click="generateGeferenc('arch')">生成档号</el-button>
            </div>
          </div>
        </div>
        <!-- <div v-show="isCollapseone" :class="isCollapseone ? 'newisCollapseone' : ''">
          <div>
            <el-select @change="xialatwo2" v-model="valueone" placeholder="请选择">
              <el-option v-for=" item  in  optionsone " :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div><el-tree style="background:#fff;color:#000;height:22vh;overflow-y: scroll;" :data="dataone"
                :props="defaultPropsone" @node-click="handleNodeClickone"></el-tree></div>
          </div>
          <div v-show="settingingtwo" @click="settingtwo()" style="border: 1px solid #000;width: 1.6vw;height: 1.6vw">
            <div class="shezhianniu"><img src="../../assets/设置 (4).png" alt=""></div>
          </div>
        </div>
        <div @click="collapseone" :class="isCollapseone ? 'zhediantwo' : 'zhedianonetwo'"></div> -->




        <!-- yanjiajie -->
        <DA_CustomOptionSet v-if="this.DATableDesignTittle != ''" :isCustomOptionSet_DA="isCustomOptionSet_DA"
          :MlId="this.Bus_MLId" :newclassone="newclassone" :tableName="this.DATableDesignTittle"
          @change="DA_receiveSonMessage($event)" :key="refreshSon1"></DA_CustomOptionSet>
        <div @click="collapseone()" :class="isCollapseone ? 'zhediantwo' : 'zhedianonetwo'"></div>
        <!-- yanjiajie -->


        <!-- yanjiajie -->
        <el-table @row-click="btnDA" id="table-listoneDA" :class="newclassone ? 'newclassone' : 'oldclassone'"
          height="400" @selection-change="handleSelectionChange" :data="DAtableBodyInfoList" border ref="multipleTableone"
          style="width: 100%;overflow-x:visible; white-space: nowrap;">
          <!-- yanjiajie -->
          <el-table-column v-if="this.DAtableBodyInfoList.length != 0" type="selection" header-align="center"
            align="center">
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" :width="item.width" v-for="( item, idx ) in  DAcolumnInfoList "
            :key="idx" :prop="item.prop" :label="item.label" header-align="center" align="center">
          </el-table-column>
          <!-- yanjiajie -->
          <el-table-column v-if="this.DAtableBodyInfoList.length != 0" width="150" fixed="right" label="操作"
            header-align="center" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEditS(scope.$index, scope.row)">修改</el-button>
              <!-- <el-button size="mini" type="warning" v-if="DAtableBodyInfoList[scope.$index].status == '已装盒'"
                @click="DA_fileboxforloanClick(scope.$index, scope.row)">借阅</el-button> -->
              <!-- <el-button size="mini" type="warning" v-if="DAtableBodyInfoList[scope.$index].status == '已装盒'"
                @click="DA_OutBox(scope.$index, scope.row)">移出盒</el-button>
              <el-button size="mini" type="success" v-if="DAtableBodyInfoList[scope.$index].status == '未装盒'"
                @click="DA_OnBox(scope.$index, scope.row)">装盒</el-button> -->
              <el-button size="mini" type="danger" @click="handleDeleteS(scope.$index, scope.row)">回收</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="float: right;">
        <el-pagination @size-change="handleSizeChangeone" @current-change="handleCurrentChangeone"
          :current-page="pIndex_da" :page-sizes="[10, 20, 50, 100]" :page-size="pSize_da"
          layout="total, sizes, prev, pager, next, jumper" :total="count_DA">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="档案盒信息编辑" width="50%" center :visible.sync="archivalinformationhgl">
      <el-tabs v-model="activeNameRecord">
        <div style="border: 1px solid #000; height:20vw;overflow-y: scroll;">
          <el-descriptions title="" border>
            <template v-for="(item, index) in RecordInputList">
              <el-descriptions-item :key="index">
                <template slot="label">

                  <i class="el-icon-tickets" />{{ item.label }}
                </template>
                <el-input style="width: 100%;margin-left: auto;" v-model="item.value"></el-input>
              </el-descriptions-item>
            </template>
          </el-descriptions>

        </div>
        <div class="footernewVal">
          <div>
            <el-button type="primary" @click="editDAH()">应用</el-button>
            <el-button @click="archivalinformationhgl = false">取消</el-button>
          </div>
          <div>
            <!-- <el-button style="margin-right: 1vw" type="primary">打印条码</el-button> -->
            <span>盒条码号:
              <el-input style="width: 14vw; margin-left: 1vw; margin-right: 1vw"
                v-model="Putdownloan.Boxbarcode"></el-input>
            </span>
          </div>
        </div>


      </el-tabs>
    </el-dialog>
    <el-dialog title="档案信息编辑" width="50%" center :visible.sync="archivalinformationdangan">
      <el-tabs v-model="activeNameRecord">

        <div style="border: 1px solid #000; height:20vw;overflow-y: scroll;">
          <el-descriptions title="" border>
            <template v-for="(item, index) in DA_RecordInputList">
              <el-descriptions-item :key="index">
                <template slot="label">
                  <i class="el-icon-tickets" />{{ item.label }}
                </template>
                <el-input style="width: 100%;margin-left: auto;" v-model="item.value"></el-input>
              </el-descriptions-item>
            </template>
          </el-descriptions>

        </div>



        <div class="footernewVal">
          <div>
            <el-button type="primary" @click="editdangan()">应用</el-button>
            <el-button @click="archivalinformationdangan = false">取消</el-button>
          </div>
          <div>
            <!-- <el-button style="margin-right: 1vw" type="primary">打印条码</el-button> -->
            <span>条码号:
              <el-input style="width: 14vw; margin-left: 1vw; margin-right: 1vw"
                v-model="Putdownloan.archBoxbarcode"></el-input>
            </span>
          </div>
        </div>


      </el-tabs>
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
                <el-select v-model="item.sel" style="width: 10vw;margin-left: auto;" placeholder="请选择著录项">
                  <el-option v-for="(item, index) in DAH_options" :label="item.label" :key="index"
                    :value="item.label"></el-option>
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
                  <el-option v-for="(item, index) in DAH_options" :label="item.label" :key="index"
                    :value="item.label"></el-option>
                </el-select>
                <el-select v-model="item.value" placeholder="请选择排序方式">
                  <el-option label="升序" value="asc"></el-option>
                  <el-option label="降序" value="desc"></el-option>
                </el-select>
              </el-descriptions-item>
            </template>
          </el-descriptions>
        </el-form-item>
        <el-form-item label="快捷操作">
          <el-button type="primary" @click="chatongjuan()" plain round>传统卷</el-button>
          <el-button type="success" @click="jianhuajuan()" plain round>简化卷</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline: center">
        <el-button type="primary" @click="muitisearchVisible = false">取 消</el-button>
        <el-button type="danger" @click="mutisearch()">搜索</el-button>
      </div>
    </el-dialog>

    <!-- 档案高级搜索 -->
    <el-dialog width="60%" title="高级搜索" :visible.sync="muitisearchVisibleDA" append-to-body>
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
                <el-select v-model="item.sel" style="width: 10vw;margin-left: auto;" placeholder="请选择著录项">

                  <el-option v-for="(item, index) in DAoptions" :label="item.label" :key="index"
                    :value="item.label"></el-option>
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
                  <el-option v-for="(item, index) in DAoptions" :label="item.label" :key="index"
                    :value="item.label"></el-option>
                </el-select>
                <el-select v-model="item.value" placeholder="请选择排序方式">
                  <el-option label="升序" value="asc"></el-option>
                  <el-option label="降序" value="desc"></el-option>
                </el-select>
              </el-descriptions-item>
            </template>
          </el-descriptions>
        </el-form-item>
        <el-form-item label="快捷操作">
          <el-button type="primary" @click="chatongjuan()" plain round>传统卷</el-button>
          <el-button type="success" @click="jianhuajuan()" plain round>简化卷</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-aline: center">
        <el-button type="primary" @click="muitisearchVisibleDA = false">取 消</el-button>
        <el-button type="danger" @click="mutisearchDA()">搜索</el-button>
      </div>
    </el-dialog>


    <el-dialog :append-to-body="true" center title="统计" :visible.sync="tongjishow" width="60%">
      <div style="height: 30vh;">

        <div>
          <el-descriptions title="档案盒" :column="3" border>
            <el-descriptions-item label="总数量" label-class-name="my-label">{{ DAH_con }}</el-descriptions-item>
            <el-descriptions-item label="已上架" label-class-name="my-label">{{ DAH_yishngjia }}</el-descriptions-item>
            <el-descriptions-item label="未上架" label-class-name="my-label">{{ DAH_weishngjia }}</el-descriptions-item>
            <el-descriptions-item label="待归还" label-class-name="my-label">{{ DAH_daiguihuan }}</el-descriptions-item>
            <!-- <el-descriptions-item label="逾期未归还" label-class-name="my-label" >{{DAH_yuqiweiguihuan}}</el-descriptions-item> -->
          </el-descriptions>
        </div>


        <div>
          <el-descriptions title="档案" :column="3" border>
            <el-descriptions-item label="总数量" label-class-name="my-label">{{ con }}</el-descriptions-item>
            <el-descriptions-item label="已上架" label-class-name="my-label">{{ yishngjia }}</el-descriptions-item>
            <el-descriptions-item label="未上架" label-class-name="my-label">{{ weishngjia }}</el-descriptions-item>
            <el-descriptions-item label="待归还" label-class-name="my-label">{{ daiguihuan }}</el-descriptions-item>
            <!-- <el-descriptions-item label="逾期未归还"label-class-name="my-label" >{{yuqiweiguihuan}}</el-descriptions-item> -->
          </el-descriptions>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="tongjishow = false">取 消</el-button>
        <el-button type="primary" @click="tongjishow = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog center title="盒内数据" :visible.sync="heneishuju" width="80%">
      <div style="height: 55vh;">
        <div class="Modeldesignlists">
          <div style="margin-left: -1vw">
            <el-button type="primary" @click="kuaisujieyue(1)">档案借阅</el-button>
          </div>
        </div>
        <div style="margin-top:2vw">
          <el-table id="table-listoneDA" height="500" @selection-change="handleSelectionChange"
            :data="kuaisujieyueheineitable" border ref="multipleTableone"
            style="width: 100%;font-size: 14px;overflow-x:visible; white-space: nowrap;">
            <el-table-column type="selection" header-align="center" align="center">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" v-for="( item, idx ) in  kuaisujieyueheinei " :key="idx"
              :prop="item.prop" :label="item.label" header-align="center" align="center">
            </el-table-column>
          </el-table>
        </div>



      </div>

    </el-dialog>
    <el-dialog center title="箱数据" :visible.sync="zhuangx" width="60%">
      <div style="height: 55vh;">
        <el-input
          style="border-radius: 5.5px; border: 0.8px solid #8A8A8A;width: 10vw;margin-right: 1vw"
          v-model.trim="boxvalue" clearable=""></el-input>
           <el-button style="height:1.65vw;width:4vw;" type="primary"  @click="chaxunxbox()">搜索</el-button>
          <!-- <div style="color:#fff;margin-top:-0.6vw;margin-left:0.5vw; font-size:0.65vw;">查询</div> -->
          <div>
          <el-table ref="xyese" :data="boxliebiao" height="450" border @selection-change="handleSelectionbox">
        <el-table-column type="selection" width="55" header-align="center" align="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="55" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="dacode" label="档案箱编码"  align="center"></el-table-column>
        <el-table-column prop="datm" label="档案箱名"  align="center"></el-table-column>
        <el-table-column prop="posads" label="位置信息" align="center"></el-table-column>
        <el-table-column label="操作"  align="center">

          <template  slot-scope="scope">
            <el-button size="mini" @click="boxzhuangru(scope.$index, scope.row)">装入</el-button>
      
          </template>
   
        </el-table-column> 
      </el-table>
          </div>
          


      </div>


    </el-dialog>
    <printertwo :visible="cartlength" @closessssss="losedion()"></printertwo>

  </div>
</template>

<script>
import axios from "axios";
import bus from '../../utils/bus'
import FileSaver from "file-saver";
import XLSX from "xlsx";
// YJJ
import printer from "@/layout/components/printer.vue";
import printertwo from "@/layout/components/pandainjieguo.vue";
import CustomOptionSet from "@/layout/components/CustomOptionSet.vue";
import DA_CustomOptionSet from "@/layout/components/DA_CustomOptionSet.vue";//yanjiajie
// YJJ
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
  // yanjiajie
  components: {
    printer,
    printertwo,
    CustomOptionSet,
    DA_CustomOptionSet

  },
  // yanjiajie
  data() {
    return {
   
      PortPrinterServe:'',
      IpPrinterServe:'',
      PortPrinter:'',
      IpPrinter:'',
      showinfo: {},
      showinfoDA: {},
      heneishow: true,
      pandianjisuashow: true,
      searchcount_DA: 3,
      searchSize_da: 10,
      searchpIndex_da: 1,
      pandiancount_DA: 0,
      pandianSize_da: 10,
      pandianpIndex_da: 1,
      WQRpSize_da: 10,
      WQRcount_DA: 0,
      WQRpIndex_da: 1,
      TDMDAHFYpIndex_da: 1,
      TDMDAHFYpSize_da: 10,
      TDMDAHFYcount_DA: 0,
      TDMdaiqueren: true,
      jieyueDAFYshow: true,
      DAFYshow: true,
      D_AFYcount_DA: 0,
      pandianid: [],
      cartlength: false,
      kuaisujieyueheineitable: [],
      kuaisujieyueheinei: [],
      heneishuju: false,
      zhuangx:false,
      PrinterCodeDialog: false,//YJJ
      IpPortPrinter_s: '',//YJJ
      zhongwenbiaotoulist_DA: [],
      zhongwenbiaotoulist: [],
      yinwenbiaotoulist_DA: [],
      yinwenbiaotoulist: [],
      querenshow: false,
      kuaisusaomalist: [],
      CODE_HGL_kuaisujieyue: '',
      DAH_ID_kuaisujieyue: '',
      kuisujieyuerfid: '',
      niandupIndex_dah: 0,
      niandupIndex_da: 0,
      putongpIndex_dah: 0,
      putongpIndex_DA: 1,
      // muitisearchVisibleDA:fasle,
      shuxinglabel: '',
      shuxinglabelone: '',
      kuaisuhejieyue: '0',
      tongjititle: '',
      DAH_yuqiweiguihuan: '',
      DAH_daiguihuan: '',
      DAH_weishngjia: '',
      DAH_yishngjia: '',
      DAH_con: '',
      yuqiweiguihuan: '',
      daiguihuan: '',
      weishngjia: '',
      yishngjia: '',
      con: '',
      muitisearchVisibleDA: false,

      tongjishow: false,
      mouseOffset: false,
      mouseFlag: false,
      valuetwotwotwo: '',
      valueoneoneone: '',
      selectvalue: '',
      value1: '',
      ColCn: 5,
      muitisearchVisible: false,
      RecordInputListearch: [
        {
          label: "1",
          value: "",
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
      boxinarchfalg: 0,
      mutisearchflag: 0,
      DAHlist: [],
      yidonghezi: false,
      yidonghezione: false,
      count_DAH: 0,
      count_DA: 0,
      xiajiaflag: 0,


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
      heneizongcount: 0,
      zaijiecount: 0,
      heneistatus: '',
      newvaluelaji: '',
      selectedStaffData: [],
      isCollapse: false,
      isCollapseone: false,
      sideWidth: 0,
      linshiabiaotoulist_da: [],
      datatwo: [],
      dataone: [],
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
      }
        // , {
        //   value: '选项2',
        //   label: '双皮奶'
        // }, {
        //   value: '选项3',
        //   label: '蚵仔煎'
        // }, {
        //   value: '选项4',
        //   label: '龙须面'
        // }, {
        //   value: '选项5',
        //   label: '北京烤鸭'
        // }
      ],
      boxarrlist:[],//装
      chaixianglist:[],//拆
      boxvalue:'',
      optionsone: [{
        value: '自定义选项',
        label: '自定义选项'
      }],
      value: '',
      valueone: '自定义选项',
      valuetwo: '自定义选项',
      jieyueshowshowtrue: true,
      DAHFYcount_DA: 0,
      DAHFYpSize_da: 20,
      D_AFYpSize_da: 20,
      DAHFYpIndex_da: 1,
      D_AFYpIndex_da: 1,
      jieyueDAHFYpSize_da: 10,
      jieyueDAHFYcount_DA: 0,
      jieyueD_AFYcount_DA: 0,
      jieyueDAHFYpIndex_da: 1,
      jieyueD_AFYpIndex_da: 1,
      jieyueD_AFYpSize_da: 10,
      currentPage_DAH: 1,
      pIndex_da: 1,
      pSize_da: 10,
      pIndex_dah: 1,
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

      quickygridData: [],
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
        storeno: '1',
        QuNo: '1',
        ColNo: '1',
        LeNo: '1',//节
        DivNo: '1',
        ZyNo: '1',
        SxNo: '1',//顺序
        poscode: '',
      },
      formLabelWidth: '80px',
      ONShelf_CODE_HGL: '',
      ONShelf_status: '',
      boxcode:'',

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
      //箱数据
      boxliebiao:[
        // {
        //   date: "盘点车",
        //   name: "盘点车1",
        //   address: "盘点车1",
        // },
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
      fileboxforloanList: [],
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
      kaiguanflage: false, //控制档案盒搜索状态
      kaiguanflageDA: false,//控制档案搜索状态
      //结尾
      DAoptions: [],
      DAoptionsvalue: "",
      selectvaluelist: [],
      DAH_options: [
      ],
      DAH_optionsvalue: "",
      shangjiaflag: 1,
      xieruflag: 1,
      //档案盒归还
      optionsgh: [],
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
      kuaisujieyueflag: 0,
      danganjieyueflag: 0,
      isCustomOptionSet: false,//是否展示自定义设置组件
      refreshSon: null,//刷新自定义设置组件
      isCustomOptionSet_DA: false,//是否展示自定义设置组件yanjiajie
      refreshSon: null,//刷新自定义设置组件
      refreshSon1: null,//刷新自定义设置组件yanjiajie
      tempParam: [],
    };

  },
  created() {
  },
  mounted() {
         bus.$off('changeEvent');
    bus.$on('changeEvent', (MLId, MLName, FatherKey, MLGS, danganjieyueflag) => {
      console.log(MLId, MLName, FatherKey, MLGS, '消息通信档案模块');
      this.isCollapse=false
      this.isCollapseone=false
      this.Bus_MLId = MLId;
      this.Bus_MLName = MLName;
      this.Bus_FatherKey = FatherKey;
      this.Bus_MLGS = MLGS;
      this.boxinarchfalg = 0;
      this.mutisearchflag = 0;
      this.danganjieyueflag = danganjieyueflag;
      this.getDATableName();
      this.getDAH_TableName();
      this.isCustomOptionSet = false;//是否展示自定义设置组件YJJ
      this.isCustomOptionSet_DA = false;//是否展示自定义设置组件yanjiajie
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
    losedion() {
      this.cartlength = false
    },
    pandianjieguo() {

      if (this.pandianid.length != 1) {
        this.$message.error('请选择一条数据')
        return
      }

      this.cartlength = true

      bus.$emit('pandianid', this.pandianid)
    },

    //档案盒选中行勾选该数据
    btnDHA(row, col, event) {
      row.flag = !row.flag;
      this.$refs.multipleTable.toggleRowSelection(row, row.flag);
      console.log(row.flag, 'row.flagrow.flagrow.flagrow.flag');
      if (row.flag == false && this.multiSelectallboxes.length == 0) {

        this.SearchDA()  //档案搜索

      }
    },
    //档案选中行勾选该数据
    btnDA(row, col, event) {
      row.flag = !row.flag;
      this.$refs.multipleTableone.toggleRowSelection(row, row.flag);
    },
    //快速扫码选中行勾选该数据
    statussaoma(row, col, event) {
      row.flag = !row.flag;
      this.$refs.saomalist.toggleRowSelection(row, row.flag);
    },
    //快速扫码关闭弹框事件
    kuaisusaomaclose() {
      this.multiSelectallboxesList = []
      this.quickygridData = []
    },
    //快速档案盒借阅和快速扫码的档案借阅
    kuaisujieyue(index) {
      if (index == 0) {
        this.kuaisujieyueflag = 1
        this.fileboxforloanClick()
      } else {
        this.kuaisujieyueflag = 2
        this.fileboxforloanClick()
      }

    },
    //快速扫码的表格勾选事件
    jieyuedanyuan(val) {
      this.kuaisusaomalist = val
      if (val.length != 1) {
        this.heneizongcount = 0
        this.heneistatus = ''
        this.zaijiecount = 0
        return
      }
      this.CODE_HGL_kuaisujieyue = val[0].code
      this.biaoqianstatus()
      console.log(this.kuaisusaomalist, 'this.kuaisusaomalist.lengththis.kuaisusaomalist.length');
    },
    //获取该标签的总数量等
    biaoqianstatus() {
      const arr = {
        "Code": this.CODE_HGL_kuaisujieyue,
        "Table_name": this.DAH_TableDesignTittle
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/getQSSMBoxInfo', arr).then(res => {
        if (res.data.code == 200) {
          this.heneizongcount = res.data.data.count
          this.zaijiecount = res.data.data.count_out
          this.heneistatus = res.data.data.status
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }


      }).catch(error => {
        console.log('获取标签的状态resresresresresresres失败');
      })
    },
    //在借档案盒时间转换
    zaijieDAH(row, zaijielishihgl) {
      if (zaijielishihgl.property === 'lenddate' || zaijielishihgl.property === 'returndate') {
        //       返回格式化的列
        row[zaijielishihgl.property] = this.formateDate(row[zaijielishihgl.property])
        return row[zaijielishihgl.property]
      } else {
        //       返回不需要惊醒格式化列源
        return row[zaijielishihgl.property]
      }
    },
    //在借档案时间转换
    zaijieDA(row, zaijielishi) {
      if (zaijielishi.property === 'lenddate' || zaijielishi.property === 'returndate') {
        //       返回格式化的列
        row[zaijielishi.property] = this.formateDate(row[zaijielishi.property])
        return row[zaijielishi.property]
      } else {
        //       返回不需要惊醒格式化列源
        return row[zaijielishi.property]
      }
    },
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
    //时间格式转换方法
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
    //档案盒统计
    DAH_tongji() {
      this.tongjishow = true
      const arr = {
        'Table_name': this.DAH_TableDesignTittle
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetMainArchData1', arr).then(res => {
        this.DAH_daiguihuan = res.data.data.cksl,
          this.DAH_weishngjia = res.data.data.wcdsl,
          this.DAH_yishngjia = res.data.data.zksl,
          this.DAH_con = res.data.data.zsl
      }).catch(error => {
        console.log('获取档案盒统计失败');
      })

    },
    //档案统计
    DA_tongji() {
      const arr = {
        'Table_name': this.DATableDesignTittle
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetMainArchData1', arr).then(res => {
        this.daiguihuan = res.data.data.cksl,
          this.weishngjia = res.data.data.wcdsl,
          this.yishngjia = res.data.data.zksl,
          this.con = res.data.data.zsl
      }).catch(error => {
        console.log('获取档案统计失败');
      })



    },
    //档案盒高级搜索按钮点击
    gaojisousou() {
      this.muitisearchVisible = true
      this.pIndex_dah = 1
    },
    //档案高级搜索按钮点击
    gaojisousouDA() {
      this.muitisearchVisibleDA = true
      this.pIndex_da = 1
    },
    //档案盒高级搜索搜索条件重置按钮
    reset() {
      this.RecordInputListearch = [
        {
          label: '1',
          sel: '',
          chse: '',
          input: ''
        }
      ]
    },
    //高级搜索传统卷按钮
    chatongjuan() {
      this.RecordInputListearch = [
        {
          label: "1",
          value: "",
          sel: "全宗号",
          chse: "=",
          input: "XX"
        },
        {
          label: "2",
          value: "",
          sel: "目录号",
          chse: "=",
          input: ""
        }
      ];
      this.RecordInputListone = [
        {
          label: "1",
          sel: "案卷号",
          value: "asc"
        },
      ]
    },
    //高级搜索简化卷按钮
    jianhuajuan() {
      this.RecordInputListearch = [
        {
          label: "1",
          value: "",
          sel: "全宗号",
          chse: "=",
          input: "XX"
        },
        {
          label: "2",
          value: "",
          sel: "保管期限",
          chse: "=",
          input: ""
        }
      ];
      this.RecordInputListone = [
        {
          label: "1",
          sel: "盒号",
          value: "asc"
        },
      ]
    },
    //高级搜索排序方式复位按钮
    resetpaixu() {
      this.RecordInputListone = [
        {
          label: "1",
          value: ""
        }
      ]
    },
    //高级搜索搜索条件添加按钮
    add() {
      var data = {};
      data.label = (this.RecordInputListearch.length + 1) + "";
      data.value = "";
      data.sel = "";
      data.chse = "";
      data.input = "";
      this.RecordInputListearch.push(data)
    },
    //高级搜索排序方式添加按钮
    addpaixu() {
      var data = {};
      data.label = (this.RecordInputListone.length + 1) + "";
      data.value = "";
      this.RecordInputListone.push(data)
    },
    //高级搜索搜索条件删除按钮
    remove() {
      this.RecordInputListearch.pop();
    },
    //高级搜索排序方式删除按钮
    removepaixu() {
      this.RecordInputListone.pop();
    },
    //档案盒鼠标移入事件
    shubiaoyiru() {
      this.yidonghezi = true
      console.log('移入了');
    },
    //档案盒鼠标移出事件
    shubiaoyichu() {
      this.yidonghezi = false
      console.log('移出了');
      this.PrinterCodeDialog = false;//YJJ
    },
    //档案鼠标移入事件
    shubiaoyiruone() {
      this.yidonghezione = true
      console.log('移入了');
    },
    //档案鼠标移出事件
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
    //标签打印
    PrinterCode() {
      
      console.log('PrinterCodePrinterCodePrinterCode');
      if (this.multiSelectallboxes.length < 1) {
        this.$message.error("请选择一本档案盒");
        return
      }
      // if (localStorage.getItem('IpPrinter') == null) {
      //   this.$message.error("请设置RFID打印机的IP和端口")
      //   return;
      // }
      console.log(this.multiSelectallboxes, 'multiSelectallboxesmultiSelectallboxes');
      this.tempParam = [];
      this.multiSelectallboxes.forEach(item => {
        this.tempParam.push({
          text: item.dh,//提醒李工，这里可以修改，标签打印机打印的字段内容--
          code: item.CODE_HGL
        })
      }); 
var _this=this;
      var getRFIDPrinterData = {
                    "item": "RFIDPrinter1",
                }
                axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/GetSValue', getRFIDPrinterData).then(
                    success => {
                        console.log(success.data.data,'读取设置的RFID值');
                        // var px,py,IpPrinter,PortPrinter,IpPrinterServe,PortPrinterServe,PrintSetIPinput,PrintSetPortinput;
                        var res=success.data.data;
                        const datas=res.value.split("-");
                        console.log(datas,'datas');
            
                        _this.IpPrinter=datas[2];
                        _this.PortPrinter=datas[3];
                        _this.IpPrinterServe=datas[4];
                        _this.PortPrinterServe=datas[5];
          
               
                    },
                    error => {
                        console.log(error, '获取控制器信息列表接口--返回失败的数据');
                })

console.log(_this.IpPrinter,'sssssssssssssssssss1111111111111111111111111111111111111111111111111111');
      this.IpPortPrinter_s = _this.IpPrinter + "/" + _this.PortPrinter + "/" + this.multiSelectallboxes[0].dh + "/" + this.multiSelectallboxes[0].CODE_HGL + "/"
        + _this.IpPrinterServe + "/" + _this.PortPrinterServe + "/" + JSON.stringify(this.tempParam);//ip/端口/档号/RFID标签值
      this.PrinterCodeDialog = true;

    },
    flagChange(val) {//标签打印后子组件传递消息
      consloe.log(val, 'val');
      this.writeRFIDToSQLtwo(val);
    },
    getValue(val) {
      console.log(val, 'valvalvalvalvalvalvalvalvalval');
      this.tempParam.forEach((item, index) => {
        console.log(item, index, 'item,index');
        setTimeout(() => {
          var aaa = "BBBBBBBB" + item.code;
          this.writeRFIDToSQLtwo(item.code, aaa);
        }, 1000 * index);

      });
      this.PrinterCodeDialog = false;

    },
    writeRFIDToSQL(code ) {//写入RFID标签值到数据库
      console.log(code, '写入RFID标签值到数据库')
      var list = {
        "Table_name": this.DAH_TableDesignTittle,
        "CODE": code.slice(8),
        'rfid': code
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchRfidData', list).then(
        success => {
          //  console.log('更新成功了');
          this.$message.success('标签写入成功')
          this.kaiguanflage = true
          this.updateDAHData();
        }
      ).catch(
        error => {
          console.log(error, 'error');
        }
      )
    },
    writeRFIDToSQLtwo(code ) {//写入RFID标签值到数据库
      console.log(code, '写入RFID标签值到数据库')
      var list = {
        "Table_name": this.DAH_TableDesignTittle,
        "CODE": code,
        'rfid': "BBBBBBBB"+code
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchRfidData', list).then(
        success => {
          //  console.log('更新成功了');
          this.$message.success('标签写入成功')
          this.kaiguanflage = true
          this.updateDAHData();
        }
      ).catch(
        error => {
          console.log(error, 'error');
        }
      )
    },


    //生成档号
    generateGeferenc(type) {  // arch 档号生成  hgl 档案盒生成
      if (this.DAH_TableDesignTittle == '') {
        this.$message({
          type: 'info',
          message: '请先选择门类!'
        });
        return
      }
      console.log('this.DAH_TableDesignTittle', this.DAH_TableDesignTittle)
      this.$confirm('请确认是否执行生成档号?', '生成档号（未选择条目即为全部条目生成）', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {}
        let _url = ''
        if (type == 'arch') {
          data.Table_name = this.DAH_TableDesignTittle.replace('hgl', 'arch')
          _url = '/updateDH'
        } else {
          data.Table_name = this.DAH_TableDesignTittle
          _url = '/updateDH_hgl'
        }
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + _url, data).then(//查询盒内数据
          (res) => {
            console.log('删除该条数据', res)
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '生成档号成功!'
              })
              if (_url == '/updateDH_hgl') {
                console.log('1111111111111111111111111111112222222222222222')
                this.updateDAHData();
              } else {
                console.log('22222222222222222222222222222222')

                if (this.boxinarchfalg == 1) {
                  this.getInBoxArch(0); //盒内文件
                }
                else if (this.boxinarchfalg == 0) {
                  this.SearchDA()  //档案搜索
                } else if (this.boxinarchfalg == 2) {
                  this.mutisearchDA()  //档案高级搜索
                } else if (this.boxinarchfalg == 3) {
                  this.niandufangfaDA()
                }
                else if (this.boxinarchfalg == 4) {
                  this.DA_receiveSonMessage(this.showinfoDA)
                }
              }




            } else {
              this.$message({
                type: 'info',
                message: res.data.message
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
          message: '已取消'
        });
      });
    },

    chuku(){},
    chaixiang(){
      let arr=[...this.chaixianglist]
       axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/boxManage/unboxing', arr).then(
        success => {
          if(success.data.code==200){
            this.$message.success('拆箱成功')
            this.chaixianglist=[]
            this.SearchDAH()
          }

        },
        error => {
          this.$message.error('拆箱失败')
        })
    },
    zhuangxiang(){
      
      if (this.multiSelectallboxes.length == 0) {

      this.$message.error('请选择档案盒装箱')

       return
     }

      this.zhuangx=true
      this.boxliebiao=[]
      let arr={
        "txtSearch":this.multiSelectallboxes,"pIndex":1,"pSize":10
      }
       axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/boxManage/getAllBoxInfo', arr).then(
        success => {
          this.boxliebiao=success.data.data.table
                     console.log(success.data.data,'99999999999999999999999');
                     console.log( this.boxliebiao,'his.boxliebiao');
        },
        error => {
          console.log(error, '开架管理--返回失败的数据');
        })
    },
    //查询箱信息
    chaxunxbox(){
      this.boxliebiao=[]
      let arr={
        "txtSearch":this.boxvalue,"pIndex":1,"pSize":10
      }
       axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/boxManage/getAllBoxInfo', arr).then(
        success => {
          this.boxliebiao=success.data.data.table
                     console.log(success.data.data,'99999999999999999999999');
                     console.log( this.boxliebiao,'his.boxliebiao');
        },
        error => {
          console.log(error, '查询--返回失败的数据');
        })
    },
    boxzhuangru(index,item){
    console.log(item,'9999999999999999999999');
     

     if(this.boxcode==''){
      this.$message.error('请选择一个箱子进行装入')
      return
     }



    let arr=[...this.boxarrlist]
     console.log(arr,'988888888888888888888888888');
      
       axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/boxManage/archivePacking ', arr).then(
        success => {
          if(success.data.code==200){
            this.$message.success('装箱成功')
            this.zhuangx=false
            this.boxcode=''
            this.SearchDAH()
          }
   
        },
        error => {
          this.$message.success('装箱失败')
        })
 




    },
    //档案盒开架管理
    openShelfManage() {
      if (this.multiSelectallboxes.length < 1) {
        this.$message.error("请选择一本档案盒");
        return
      }
      if (this.multiSelectallboxes.length > 1) {
        this.$message.error("请选择一本档案盒");
        return
      }
      // this.$message.warning("开架管理");
      console.log(this.multiSelectallboxes, 'this.multiSelectallboxesthis.multiSelectallboxes');
      const arr = {
        'Code': this.multiSelectallboxes[0].CODE_HGL,
        "cmd": '40024',
        'localip': "127.0.0.1"
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/KFPTService/getRfid', arr).then(
        success => {
          if (success.data == 102) {
            this.$message.error('未找到密集架信息')
          } else if (success.data == 101) {
            this.$message.error('未找到门类名称')
          } else if (success.data == 1) {
            this.$message.success('开架成功')
          }
          else if (success.data == 0) {
            this.$message.error('密集架通讯失败')
          } else {

          }
        },
        error => {
          console.log(error, '开架管理--返回失败的数据');
        })
    },
    settingtwo() {
      this.isCustomOptionSet_DA = true//yanjiajie
    },


    setting() {
      this.isCustomOptionSet = true
      console.log('设置按钮点击');
      this.refreshSon = new Date().getTime();
    },
    settingtwo() {
      this.isCustomOptionSet = true
    },
    //YJJ
    receiveSonMessage(value) {
      this.mutisearchflag = 3

      this.showinfo = value

      // this.pIndex_dah


      this.kaiguanflage = !this.kaiguanflage
      if (this.kaiguanflage) {

        this.pIndex_dah = 1
        this.pSize_dah = 10
        this.showinfo.pIndex = this.pIndex_dah
        this.showinfo.pSize = this.pSize_dah
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl", this.showinfo).then(//（盒）根据自定义项获取档案数据
          (res) => {
            // var res=success.data.data;
            console.log(res.data.data, '（盒）根据自定义项获取档案数据');

            this.tableBodyInfoList = [];
            this.columnInfoList = [];
            if (res.data.data == null) {
              this.$message.warning("暂无数据");
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
        this.showinfo.pIndex = this.pIndex_dah
        this.showinfo.pSize = this.pSize_dah
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl", this.showinfo).then(//（盒）根据自定义项获取档案数据
          (res) => {
            // var res=success.data.data;
            console.log(res.data.data, '（盒）根据自定义项获取档案数据');

            this.tableBodyInfoList = [];
            this.columnInfoList = [];
            if (res.data.data == null) {
              this.$message.warning("暂无数据");
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
      }
      this.kaiguanflage = false







    },
    // yanjiajie
    DA_receiveSonMessage(value) {
      console.log(value, 'valuevaluevalue')
      this.boxinarchfalg = 4
      this.showinfoDA = value
      this.kaiguanflageDA = !this.kaiguanflageDA
      if (this.kaiguanflageDA) {
        this.pIndex_da = 1
        this.pSize_da = 10
        this.showinfoDA.pIndex = this.pIndex_da
        this.showinfoDA.pSize = this.pSize_da
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas", this.showinfoDA).then(//（档案）根据自定义项获取档案数据
          (res) => {
            // var res=success.data.data;
            console.log(res.data.data, '（档案）根据自定义项获取档案数据');
            this.DAtableBodyInfoList = [];
            this.DAcolumnInfoList = [];
            if (res.data.data == null) {
              this.$message.warning("暂无数据");
              return;
            }
            this.DAtableBodyInfoList = res.data.data.table;
            console.log(res.data.data.Count, 'res.data.data.count');
            // this.totalcount_dah = res.data.data.Count;
            this.count_DA = res.data.data.Count;
            for (let i = 0; i < res.data.data.headernames.length; i++) {
              let obj = {
                prop: res.data.data.headernames[i],
                label: res.data.data.headertexts[i],
                width: res.data.data.headerwidth[i],
              };
              this.DAcolumnInfoList.push(obj);
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
        this.showinfoDA.pIndex = this.pIndex_da
        this.showinfoDA.pSize = this.pSize_da
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas", this.showinfoDA).then(//（档案）根据自定义项获取档案数据
          (res) => {
            // var res=success.data.data;
            console.log(res.data.data, '（档案）根据自定义项获取档案数据');
            this.DAtableBodyInfoList = [];
            this.DAcolumnInfoList = [];
            if (res.data.data == null) {
              this.$message.warning("暂无数据");
              return;
            }
            this.DAtableBodyInfoList = res.data.data.table;
            console.log(res.data.data.Count, 'res.data.data.count');
            // this.totalcount_dah = res.data.data.Count;
            this.count_DA = res.data.data.Count;
            for (let i = 0; i < res.data.data.headernames.length; i++) {
              let obj = {
                prop: res.data.data.headernames[i],
                label: res.data.data.headertexts[i],
                width: res.data.data.headerwidth[i],
              };
              this.DAcolumnInfoList.push(obj);
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
      }

      this.kaiguanflageDA = false






    },
    //档案盒左侧年度搜索
    collapse() {
      if (this.DAH_TableDesignTittle == '') {
        this.$message.error("请选择档案分类");
        return;
      }
      //collapse为false时展开，为true时折叠。
      this.isCollapse = !this.isCollapse
      this.datatwo = []
      console.log(this.isCollapse, 'this.isCollaps');
      if (this.isCollapse) {//展开
        this.isCustomOptionSet = true;
        this.refreshSon = new Date().getTime();
      } else {
        this.isCustomOptionSet = false;
        this.refreshSon = new Date().getTime();
      }



    },
    //档案左侧
    collapseone() {//yanjiajie
      if (this.DATableDesignTittle == '') {
        this.$message.error("请选择档案分类");
        return;
      }
      //collapse为false时展开，为true时折叠。
      this.isCollapseone = !this.isCollapseone
      this.dataone = []
      console.log(this.isCollapseone, 'this.isCollapseone');
      if (this.isCollapseone) {//展开
        this.isCustomOptionSet_DA = true;
        this.refreshSon1 = new Date().getTime();
      } else {
        this.isCustomOptionSet_DA = false;
        this.refreshSon1 = new Date().getTime();
      }
    },
    //表格档案盒每页条数
    handleSizeChange(val) {
      this.pSize_dah = val;
      console.log(`每页 ${val} 条`);
      if (this.mutisearchflag == 1)
        this.mutisearch()  //高级搜索
      else if (this.mutisearchflag == 0)
        this.SearchDAH()  //普通搜索
      else if (this.mutisearchflag == 2) {
        this.niandufangfaDA_H() //年度搜索
      } else if (this.mutisearchflag == 3) {
        this.receiveSonMessage(this.showinfo)
      } else {

      }

    },
    DAHFYhandleSizeChangeone(val) {
      this.DAHFYpSize_da = val
      const tab = {
        'name': 'first'
      }
      this.handleClick(tab)
    },
    DAHFYhandleCurrentChangeone(val) {
      this.DAHFYpIndex_da = val
      const tab = {
        'name': 'first'
      }
      this.handleClick(tab)
    },
    pandianCurrentChangeone(val) {
      this.pandianpIndex_da = val
      this.getPDResultList()
    },
    searchsizechange(val) {

      this.searchSize_da = val
      this.pandiansearch()
    },
    searchCurrentChangeone(val) {
      this.searchpIndex_da = val
      this.pandiansearch()
    },
    pandiansizechange(val) {
      this.pandianSize_da = val
      this.getPDResultList()
    },
    WQRhandleSizeChangeone(val) {
      this.WQRpSize_da = val
      this.yiqueren()
    },
    WQRYhandleCurrentChangeone(val) {
      this.WQRpIndex_da = val
      this.yiqueren()
    },
    TDMCurrentChangeone(val) {
      this.TDMDAHFYpIndex_da = val
      this.daiqueren()
    },
    TDMSizeChangeone(val) {
      this.TDMDAHFYpSize_da = val
      this.daiqueren()
    },

    D_AFYhandleSizeChangeone(val) {
      this.D_AFYpSize_da = val
      const tab = {
        'name': 'second'
      }
      this.handleClick(tab)
    },
    D_AFYhandleCurrentChangeone(val) {

      this.D_AFYpIndex_da = val
      const tab = {
        'name': 'second'
      }
      this.handleClick(tab)

    },
    jieyueDAHFYhandleSizeChangeone(val) {
      this.jieyueDAHFYpSize_da = val
      const tab = {
        'name': 'first'
      }
      this.handleClickLs(tab)
    },
    jieyueDAHFYhandleCurrentChangeone(val) {
      this.jieyueDAHFYpIndex_da = val
      const tab = {
        'name': 'first'
      }
      this.handleClickLs(tab)
    },
    jieyueD_AFYhandleSizeChangeone(val) {
      this.jieyueD_AFYpSize_da = val
      const tab = {
        'name': 'second'
      }

      this.handleClickLs(tab)
    },
    jieyueD_AFYhandleCurrentChangeone(val) {
      this.jieyueD_AFYpIndex_da = val
      const tab = {
        'name': 'second'
      }

      this.handleClickLs(tab)
    },
    updateDAHData() {
      if (this.mutisearchflag == 1)
        this.mutisearch()  //高级搜索
      else if (this.mutisearchflag == 0) {
        this.SearchDAH()  //普通搜索
      } else if (this.mutisearchflag == 2) {
        this.niandufangfaDA_H() //年度搜索
      } else if (this.mutisearchflag == 3) {
        this.receiveSonMessage(this.showinfo)
      } else {

      }
    },
    //表格档案盒分页
    handleCurrentChange(val) {
      this.pIndex_dah = val
      this.putongpIndex_dah = val
      this.kaiguanflage = !this.kaiguanflage
      this.updateDAHData();
      console.log(this.pIndex_dah, 'this.pIndex_dah');
      console.log(this.putongpIndex_dah, 'this.putongpIndex_dah');
    },
    handleNodeClick(data) {
      this.mutisearchflag = 2
      console.log(data);
      this.shuxinglabel = data.label
      console.log(this.pIndex_dah, 'this.pIndex_dahthis.pIndex_dahthis.pIndex_dah')
      const dataone = {
        "Table_name": this.DAH_TableDesignTittle,
        "MLIdList": this.Bus_MLId,
        pIndex: this.niandupIndex_dah || 1,
        pSize: this.pSize_dah,
        "filter_item": '年度',
        "filter_value": data.label
      };
      // console.log(data, '查询盒内数据查询盒内数据');
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl1", dataone).then(//查询盒内数据
        (res) => {
          this.pIndex_dah = 1
          console.log(this.pIndex_dah, 'this.pIndex_dahtwo')
          console.log(res, '成功获取档案盒年度列表数据');
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

    },
    handleNodeClickone(data) {
      this.boxinarchfalg = 3
      console.log(data);
      this.shuxinglabelone = data.label
      const dataoneone = {
        Table_name: this.DATableDesignTittle,
        pIndex: this.niandupIndex_da || 1,
        pSize: this.pSize_da,
        MLIdList: this.Bus_MLId || 1,
        filter_hgl: "",
        "filter_item": '年度',
        "filter_value": this.shuxinglabelone
      };


      console.log(data, '查询盒内数据查询盒内数据');

      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas1", dataoneone).then(//查询 档案 数据
        (res) => {
          this.pIndex_da = 1
          console.log(res, '成功获取档案列表数据');
          this.DAtableBodyInfoList = [];
          this.DAcolumnInfoList = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);
            return;
          }

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
          //数据更新后执行
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
              this.$refs.multipleTableone.doLayout();
            }
          })
        },
        (err) => {
          console.log(err);
        }
      );
    },

    //年度方法档案盒
    niandufangfaDA_H() {
      const dataone = {
        "Table_name": this.DAH_TableDesignTittle,
        "MLIdList": this.Bus_MLId,
        pIndex: this.pIndex_dah,
        pSize: this.pSize_dah,
        "filter_item": '年度',
        "filter_value": this.shuxinglabel
      };
      // console.log(data, '查询盒内数据查询盒内数据');
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl1", dataone).then(//查询盒内数据
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
          this.niandupIndex_dah = 1
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
    },
    //表格档案分页
    handleSizeChangeone(val) {
      this.pSize_da = val
      // this.kaiguanflageDA=!this.kaiguanflageDA
      console.log(`每页 ${val} 条`);
      if (this.boxinarchfalg == 1) {
        this.getInBoxArch(0);  //盒内文件
      }
      else if (this.boxinarchfalg == 0) {
        this.SearchDA() //档案搜索

      } else if (this.boxinarchfalg == 2) {
        this.mutisearchDA() //档案高级搜索
      } else if (this.boxinarchfalg == 3) {
        this.niandufangfaDA()
      }
      else if (this.boxinarchfalg == 4) {
        this.DA_receiveSonMessage(this.showinfoDA)
      }
    },
    update_DA() {
      if (this.boxinarchfalg == 1) {
        this.getInBoxArch(0);  //盒内文件
      }
      else if (this.boxinarchfalg == 0) {
        this.SearchDA() //档案搜索

      } else if (this.boxinarchfalg == 2) {
        this.mutisearchDA() //档案高级搜索
      } else if (this.boxinarchfalg == 3) {
        this.niandufangfaDA()
      }
      else if (this.boxinarchfalg == 4) {
        this.DA_receiveSonMessage(this.showinfoDA)
      }
    },
    //年度方法档案
    niandufangfaDA() {
      const dataoneone = {
        Table_name: this.DATableDesignTittle,
        pIndex: this.pIndex_da,
        pSize: this.pSize_da,
        MLIdList: this.Bus_MLId || 1,
        filter_hgl: "",
        "filter_item": '年度',
        "filter_value": this.shuxinglabelone
      };
      axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas1", dataoneone).then(//查询 档案 数据
        (res) => {
          console.log(res, '成功获取档案列表数据');
          this.DAtableBodyInfoList = [];
          this.DAcolumnInfoList = [];
          if (res.data.code != 200) {
            this.$message.error(res.data.message);
            return;
          }

          this.DAtableBodyInfoList = res.data.data.table;
          console.log(res.data.data.Count, 'res.data.data.count');
          this.totalcount = res.data.data.Count;
          this.count_DA = res.data.data.Count;
          this.niandupIndex_da = 1
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
              width: res.data.data.headerwidth[i],
            };
            this.DAcolumnInfoList.push(obj);
          }
          //数据更新后执行
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
              this.$refs.multipleTableone.doLayout();
            }
          })
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //表格档案分页
    handleCurrentChangeone(val) {
      this.pIndex_da = val
      this.putongpIndex_DA = val
      this.kaiguanflageDA = !this.kaiguanflageDA
      console.log(`当前页: ${val}`);
      if (this.boxinarchfalg == 1) {
        this.getInBoxArch(0); //盒内文件
      }
      else if (this.boxinarchfalg == 0) {
        this.SearchDA()  //档案搜索
      } else if (this.boxinarchfalg == 2) {
        this.mutisearchDA()  //档案高级搜索
      } else if (this.boxinarchfalg == 3) {
        this.niandufangfaDA()
      }
      else if (this.boxinarchfalg == 4) {
        this.DA_receiveSonMessage(this.showinfoDA)
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
            this.getDATableList(this.pIndex_da, this.pSize_da);
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
      if (this.danganjieyueflag == 2) {
        // this.pIndex_da=1
        var data = {
          Table_name: this.DATableDesignTittle || "a01_archdata_1_1",
          pIndex: valindex,
          pSize: valsize,
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
          pIndex: 1,
          pSize: valsize,
          MLIdList: this.Bus_MLId || 1,
          filter_hgl: "",
        };
        this.zhongwenbiaotoulist_DA = []
        this.yinwenbiaotoulist_DA = []
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas", data).then(
          (res) => {
            this.pIndex_da = 1
            console.log(res, '成功获取档案列表数据');
            this.DAtableBodyInfoList = [];
            this.DAcolumnInfoList = [];
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
              return;
            }
            this.zhongwenbiaotoulist_DA = res.data.data.headertexts
            this.yinwenbiaotoulist_DA = res.data.data.headernames
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

    },
    getInBoxArch(index) {

      if (index == 0) {
        this.boxinarchfalg = 1;

        if (this.multiSelectallboxes.length == 0) {

          this.$message.error('请选择一条档案盒')

          return
        }

        if (this.multiSelectallboxes.length >= 1) {
          // this.$message.error('只能选择一条档案盒')
          // return
          this.DAtableBodyInfoList = [];
          this.multiSelectallboxes.forEach((item, index) => {
            let data = {
              Table_name: this.DAH_TableDesignTittle,
              pIndex: this.pIndex_da,
              pSize: this.pSize_da,
              Code: item.CODE_HGL,
            };
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetInBoxArch", data).then(
              (res) => {
                this.DAtableBodyInfoList = [];
                console.log(res, '成功获取盒内档案列表数据');
                // this.DAtableBodyInfoList = [];
                this.DAcolumnInfoList=[]
                // this.DAcolumnInfoList = [];
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                  return;
                }

                this.DAtableBodyInfoList.push(...res.data.data.table);
                //数据更新后执行
                this.$nextTick(() => {
                  // myTable是表格的ref属性值
                  if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                    this.$refs.multipleTableone.doLayout();
                  }
                })

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







          })
        }



      } else if (index == 1) {

        console.log(this.kuaisusaomalist.length, 'this.kuaisusaomalist.length')

        if (this.kuaisusaomalist.length != 1) {
          this.$message.error('请选择一条档案盒')
          return
        }
        this.heneishuju = true
        var data = {
          Table_name: this.DAH_TableDesignTittle,
          pIndex: 1,
          pSize: 10,
          Code: this.CODE_HGL_kuaisujieyue,
        };
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetInBoxArch", data).then(
          (res) => {
            console.log(res, '成功获取盒内档案列表数据1');
            this.kuaisujieyueheineitable = [];
            this.kuaisujieyueheinei = [];
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
              return;
            }
            this.kuaisujieyueheineitable = res.data.data.table;
            //数据更新后执行
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                this.$refs.multipleTableone.doLayout();
              }
            })

            this.totalcount = res.data.data.Count;
            this.count_DA = res.data.data.Count;
            for (let i = 0; i < res.data.data.headernames.length; i++) {
              let obj = {
                prop: res.data.data.headernames[i],
                label: res.data.data.headertexts[i],
                // width: res.data.data.headerwidth[i],
              };
              this.kuaisujieyueheinei.push(obj);
            }
          },
          (err) => {
            console.log(err);
          }
        );

      } else {

      }


    },
    getDAHTableList(valindex, valsize) {
      if (this.danganjieyueflag == 2) {
        var data = {
          Table_name: this.DAH_TableDesignTittle || "a01_hgldata_1_1",
          pIndex: valindex,
          pSize: valsize,
          MLIdList: this.Bus_MLId || 1,
          filter_hgl: "",
        };
        console.log(data, '请求参数档案盒列表数据');
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
      } else {
        var data = {
          Table_name: this.DAH_TableDesignTittle || "a01_hgldata_1_1",
          pIndex: 1,
          pSize: valsize,
          MLIdList: this.Bus_MLId || 1,
          filter_hgl: "",
        };
        console.log(data, '请求参数档案盒列表数据');
        this.zhongwenbiaotoulist = []
        this.yinwenbiaotoulist = []
        axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl", data).then(
          (res) => {
            this.pIndex_dah = 1
            console.log(res, '成功获取档案盒列表数据');
            this.tableBodyInfoList = [];
            this.columnInfoList = [];
            if (res.data.code != 200) {
              this.$message.error(res.data.message);

              return;
            }
            this.zhongwenbiaotoulist = res.data.data.headertexts
            this.yinwenbiaotoulist = res.data.data.headernames
            // console.log(this.zhongwenbiaotoulist,this.yinwenbiaotoulist,'this.yinwenbiaotoulistthis.yinwenbiaotoulist');
            this.tableBodyInfoList = res.data.data.table;
            // console.log(res.data.data.Count, 'res.data.data.count');
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
      }




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
              type: item.xlx,//类型
              // length: item.MaxLength,//长度
              need: item.isnotnull,//必填项
              // Hook: item.gjxname,//挂接
              RFIDHook: item.rfidgjx,//RFID挂接项
              // XName: item.XName,//
              // Table_Name: item.Table_Name,//表名
            })
          });
          bus.$emit('DAoptions', this.DAoptions)
        },
        error => {
          console.log(error, '获取著录项（档案）著录项列表数据--返回失败的数据');
        })

    },
    getDAH_SearchX() {
      var data = {};
      data.Table_name = this.DAH_TableDesignTittle;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData1_hgl', data).then(
        success => {
          console.log(success, '获取著录项（档案盒）著录项列表数据-成功');
          this.DAH_optionsvalue = '';
          this.DAH_options = [],
            this.inputlist = ''

          //           axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData1_hgl', data).then(res=>{
          // console.log(res,'resresresresresresresresresresresresresresresres')
          //           }).catch(error=>{

          //           })


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
    },

    // 精华代码
    SearchDA() {
      console.log('222222222222222');
           if(this.Bus_MLId==''&&this.DATableDesignTittle==''){
            this.$message.error('请选择左侧分类')
            return
           }
      this.boxinarchfalg = 0;
      var tempFilter_item = "";
      console.log(this.DAoptions, 'this.DAoptionsthis.DAoptions');
      this.DAoptions.forEach((item, key) => {
        if (item.label == this.DAoptionsvalue) {
          tempFilter_item = item.label;
        }
      });
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
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas1", data).then(//查询 档案 数据
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
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas1", data).then(//查询 档案 数据
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


 //带有部分搜索项的普通搜索
         if (tempFilter_item != '' && this.DAinputlist == '') { 
            this.$message.warning('请选择完整搜索条件')
            return
          } else if (this.DAinputlist != '' && tempFilter_item == '') {

            this.$message.warning('请选择搜索项')
            return
          }

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
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas1", data).then(//查询 档案 数据
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
          axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas1", data).then(//查询 档案 数据
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



    },
    // 精华代码
    SearchDAH(x) {
      console.log('222222222222222');
           if(this.Bus_MLId==''&&this.DAH_TableDesignTittle==''){
            this.$message.error('请选择左侧分类')
            return
           }
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
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl1", data).then(//查询盒内数据
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
            axios.post("http://" + this.ServeIp + ":" + this.ServePort + "/GetDADatas_hgl1", data).then(//查询盒内数据
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
          //带有部分搜索项的普通搜索
          if (tempFilter_item != '' && this.inputlist == '') {
            this.$message.warning('请选择完整搜索条件')
            return
          } else if (this.inputlist != '' && tempFilter_item == '') {

            this.$message.warning('请选择搜索项')
            return
          }

          //带有全部搜索项的普通搜索
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
    // 精华代码


    //档案盒信息全屏
    bigping() {
      // this.isCollapse=false
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
      // this.isCollapseone=false
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
      if (this.multiSelectallboxes.length < 1) {
        this.$message.error("请选择一本档案盒");
        return
      }
      if (this.multiSelectallboxes.length > 1) {
        this.$message.error("请选择一本档案盒");
        return
      }

      // this.$message.warning("开架管理");
      console.log(this.multiSelectallboxes, 'this.multiSelectallboxesthis.multiSelectallboxes');
      const arr = {
        'Code': this.multiSelectallboxes[0].CODE_HGL,
        "cmd": '40024',
        'localip': "127.0.0.1"
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/KFPTService/getRfid', arr).then(
        success => {
          if (success.data == 102) {
            this.$message.error('未找到密集架信息')
          } else if (success.data == 101) {
            this.$message.error('未找到门类名称')
          } else if (success.data == 1) {
            this.$message.success('开架成功')
          }
          else if (success.data == 0) {
            this.$message.error('密集架通讯失败')
          } else {

          }
        },
        error => {
          console.log(error, '开架管理--返回失败的数据');
        })



    },
    statistics() {
      if (this.Bus_MLId == '') {
        this.$message.warning('请选择分类')
        // return
      } else {

        this.DAH_tongji()
        this.DA_tongji()
      }

      this.yuqiweiguihuan = '',
        this.daiguihuan = '',
        this.weishngjia = '',
        this.yishngjia = '',
        this.con = ''
      this.DAH_yuqiweiguihuan = '',
        this.DAH_daiguihuan = '',
        this.DAH_weishngjia = '',
        this.DAH_yishngjia = '',
        this.DAH_con = ''


    },
    handleRowClick(val) {

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

    // 档案盒数据写入excel
    export2Excel() {
      var that = this
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/export2Excel') // 这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const tHeader = this.zhongwenbiaotoulist // 导出的excel的表头字段可自定义
        const filterVal = this.yinwenbiaotoulist // 对象属性，对应于tHeader，即prop的值，可自定义导出字段
        const list = that.excelData // json数组对象，接口返回的数据
        const data = that.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '档案盒选中数据')// 导出的表格名称，可自定义
      })
    },
    //档案盒格式转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 档案数据写入excel
    export2Excel_DA() {
      var that = this
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/export2Excel') // 这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const tHeader = this.zhongwenbiaotoulist_DA // 导出的excel的表头字段可自定义
        const filterVal = this.yinwenbiaotoulist_DA // 对象属性，对应于tHeader，即prop的值，可自定义导出字段
        const list = that.excelDatatwo // json数组对象，接口返回的数据
        const data = that.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '档案选中数据')// 导出的表格名称，可自定义
      })
    },
    //档案格式转换
    formatJson_DA(filterVal, jsonDataone) {
      return jsonDataone.map(v => filterVal.map(j => v[j]))
    },
    //导出部分档案盒选中
    Exceloutputchange() {

      if (this.DAHlist.length < 1) {
        this.$message.error('请选择要导出的数据')
        return
      }
      this.excelData = this.DAHlist
      this.export2Excel()
    },


    //导出部分档案选中
    ExceloutputchangeDA() {

      if (this.multiSelectallboxesList.length < 1) {
        this.$message.error('请选择要导出的档案数据')
        return
      }
      this.excelDatatwo = this.multiSelectallboxesList
      this.export2Excel_DA()

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
    // ExceloutputDA() {

    //   let table = document.querySelector('#table-listoneDA').cloneNode(true);
    //   // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
    //   table.removeChild(table.querySelector(".el-table__fixed-right"));
    //   // table.removeChild(table.querySelector(".el-table__fixed"));
    //   let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
    //   /* get binary string as output */
    //   var wbout = XLSX.write(wb, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array",
    //   });
    //   try {
    //     FileSaver.saveAs(
    //       new Blob([wbout], { type: "application/octet-stream" }),
    //       '档案表格数据' + ".xlsx"
    //     );
    //   } catch (e) {
    //     if (typeof console !== "undefined") console.log(e, wbout);
    //   }
    //   return wbout;
    // },
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
      this.heneishow = true
      this.zaijielishihgl = []
      this.zaijielishi = [];
      this.fileboxforloanList = [];
      console.log(tab.name, 'sssssssssssssssssssssssssssssssssssssss');
      if (tab.name == 'first') {  //档案盒
        this.DAFYshow = true
        this.zaijielishihgl = []
        var data = {
          "Table_name": this.DAH_TableDesignTittle,
          "pIndex": this.DAHFYpIndex_da,
          "pSize": this.DAHFYpSize_da,
          "type": 0
        };

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZaiJieDatas_hgl', data).then(
          success => {
            console.log(success, '获取档案盒全部列表数据-成功');

            this.FileonloanTable = success.data.data.table;
            this.DAHFYcount_DA = success.data.data.Count
            for (let i = 0; i < success.data.data.headernames.length; i++) {
              let obj = {
                prop: success.data.data.headernames[i],
                label: success.data.data.headertexts[i],
              };
              this.zaijielishihgl.push(obj);
            }
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.zaijielishitable && this.$refs.zaijielishitable.doLayout) {
                this.$refs.zaijielishitable.doLayout();
              }
            })
          },
          error => {
            console.log(error, '获取档案盒列表数据--返回失败的数据');
          })
      } else if (tab.name == 'second') { //档案
        this.DAFYshow = false
        var data = {
          "Table_name": this.DATableDesignTittle,
          "pIndex": this.D_AFYpIndex_da,
          "pSize": this.D_AFYpSize_da,
          "type": 0
        };

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZaiJieDatas', data).then(
          success => {
            console.log(success, '获取档案全部列表数据-成功');
            this.borrowingfilebox = success.data.data.table;
            this.D_AFYcount_DA = success.data.data.Count
            for (let i = 0; i < success.data.data.headernames.length; i++) {
              let obj = {
                prop: success.data.data.headernames[i],
                label: success.data.data.headertexts[i],
              };
              this.zaijielishi.push(obj);
            }
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.zaijielishitable_DA && this.$refs.zaijielishitable_DA.doLayout) {
                this.$refs.zaijielishitable_DA.doLayout();
              }
            })
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
        "pIndex": this.jieyueDAHFYpIndex_da,
        "pSize": this.jieyueDAHFYpSize_da
      };

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetJieYueHisDatas_hgl', data).then(
        success => {
          console.log(success, '借阅历史记录档案盒-成功');
          this.loanhistoryTable = success.data.data.table;
          this.jieyueDAHFYcount_DA = success.data.data.Count
          for (let i = 0; i < success.data.data.headernames.length; i++) {
            let obj = {
              prop: success.data.data.headernames[i],
              label: success.data.data.headertexts[i],
            };
            this.jieyuelishijilu.push(obj);
          }
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.jieyuelishi_DAH && this.$refs.jieyuelishi_DAH.doLayout) {
              this.$refs.jieyuelishi_DAH.doLayout();
            }
          })
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
        this.jieyueshowshowtrue = true
        this.jieyueDAFYshow = true

        this.BrrowHistoryDAH();
      } else if (tab.name == 'second') { //档案
        this.jieyueshowshowtrue = true
        this.jieyueDAFYshow = false
        this.borrowhistoryfiles = []
        this.jieyuelishijiludangan = []
        var data = {
          // "Table_name":"",
          "pIndex": this.jieyueD_AFYpIndex_da,
          "pSize": this.jieyueD_AFYpSize_da
        }

        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetJieYueHisDatas', data).then(
          success => {
            console.log(success, '获取借阅历史档案全部列表数据-成功');
            this.borrowhistoryfiles = success.data.data.table;
            this.jieyueD_AFYcount_DA = success.data.data.Count
            for (let i = 0; i < success.data.data.headernames.length; i++) {
              let obj = {
                prop: success.data.data.headernames[i],
                label: success.data.data.headertexts[i],
              };
              this.jieyuelishijiludangan.push(obj);
            }
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.jieyuelishi_DA && this.$refs.jieyuelishi_DA.doLayout) {
                this.$refs.jieyuelishi_DA.doLayout();
              }
            })
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

      this.jieyueshowshowtrue = false
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
        this.$nextTick(() => {
          // myTable是表格的ref属性值
          if (this.$refs.jieyuelishi_DAH && this.$refs.jieyuelishi_DAH.doLayout) {
            this.$refs.jieyuelishi_DAH.doLayout();
          }
        })
        // this.filepopupwindowRFID = false
      }).catch(error => {
        console.log(error);
      }
      )
      console.log(arr, 'sadadasdasdasadcxz');


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
              value: item.xlx == '1' ? 0 : '',
              label: item.xbyname,//著录项
              type: item.xlx,//类型
              // length: item.MaxLength,//长度
              need: item.isnotnull,//必填项
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
              need: item.isnotnull,//必填项
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
      // console.log(this.Bus_MLId, '档案盒--著录--门类ID');
      // console.log(this.DAH_TableDesignTittle, '档案盒--著录--表名');
      var data = {};
      data.Table_name = this.DAH_TableDesignTittle;
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetZLXData_hgl', data).then(
        success => {
          console.log(success, '获取著录项（档案盒）著录项列表数据-成功');
          this.RecordInputList = [];
          success.data.data.forEach((item, index) => {
            this.RecordInputList.push({
              value: item.xlx == '1' ? 0 : '',
              label: item.xbyname,//著录项
              type: item.xlx,//类型
              // length: item.MaxLength,//长度
              need: item.isnotnull,//必填项
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
    //档案盒编辑
    DAH_RecordForEdit() {
      // console.log(this.Bus_MLId, '档案盒--著录--门类ID');
      // console.log(this.DAH_TableDesignTittle, '档案盒--著录--表名');
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
        },
        error => {
          console.log(error, '获取著录项（档案盒）著录项列表数据--返回失败的数据');
        })
    },
    //档案盒应用
    applyDAH() {
      console.log(this.RecordInputList, 'applyDAH档案盒应用的点击');
      let tempSetData = '';
      let tempTable_Name = '';
      for (let index = 0; index < this.RecordInputList.length; index++) {
        tempSetData = tempSetData + this.RecordInputList[index].XName + "='" + this.RecordInputList[index].value + "',";
        tempTable_Name = this.RecordInputList[index].Table_Name;
      }
      tempSetData = tempSetData.substring(0, tempSetData.length - 1);
      let data = {
        "Table_name": tempTable_Name,
        "CODE": this.Putdownloan.Boxbarcode,
        "SetData": tempSetData,
        "DATYPE": this.Bus_MLId,
        "UserID": "10"
      };
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddArchData', data).then(//添加一条新档案（盒）信息
        success => {
          if (success.data.code != 200) {
            this.$message.error('添加失败,请检查所填数据')
            return;
          }

          console.log(success, '添加一条新档案（盒）信息-成功');
          this.$message.success(success.data.data);
          this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
          this.archivalinformation = false;
        })
    },
    //档案应用
    applyDA() {
      console.log(this.DA_RecordInputList, '添加档案应用的点击');
      let tempSetData = '';
      let tempTable_Name = '';
      for (let index = 0; index < this.DA_RecordInputList.length; index++) {
        tempSetData = tempSetData + this.DA_RecordInputList[index].XName + "='" + this.DA_RecordInputList[index].value + "',";
        tempTable_Name = this.DA_RecordInputList[index].Table_Name;
      }

      tempSetData = tempSetData.substring(0, tempSetData.length - 1);
      console.log(tempSetData, 'tempSetDatatempSetData11111111111111');
      let data = {
        "Table_name": tempTable_Name,
        "CODE": this.Putdownloan.archBoxbarcode,
        "SetData": tempSetData,
        "DATYPE": this.Bus_MLId,
        "UserID": "10"
      };
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddArchData', data).then(//添加一条新档案（盒）信息
        success => {
          if (success.data.code != 200) {
            this.$message.error('添加失败,请检查所填数据')
            return;
          }
          console.log(success, '添加一条新档案（盒）信息-成功');
          this.$message.success(success.data.data);
          this.getDATableList(this.pIndex_da, this.pSize_da);
          this.archivalinformation = false;
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

      if (this.Bus_MLId == '') {
        this.$message.warning('请选择分类')
        return
      }
      this.filepopupwindow = true;
      var arr = {
        name: 'first'
      }
      this.handleClick(arr)
    },
    onRorrowHistory() {//借阅历史
      if (this.Bus_MLId == '') {
        this.$message.warning('请选择分类')
        return
      }
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
      this.heneishow = true
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
      this.heneishow = true
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
      this.heneishow = false

      this.FileonloanTable = []
      this.zaijielishihgl = []
      var data = {
        "Table_name": "a01_hgldata",
        "pIndex": 1,
        "pSize": 200,
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
          //数据更新后执行
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.zaijielishitable && this.$refs.zaijielishitable.doLayout) {
              this.$refs.zaijielishitable.doLayout();
            }
          })
        },
        error => {
          console.log(error, '获取逾期档案盒列表数据--返回失败的数据');
        })
    },
    //
    weiyuqi() {
      this.heneishow = false
      this.FileonloanTable = []
      this.zaijielishihgl = []
      var data = {
        "Table_name": "a01_hgldata",
        "pIndex": 1,
        "pSize": 200,
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
          //数据更新后执行
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.zaijielishitable && this.$refs.zaijielishitable.doLayout) {
              this.$refs.zaijielishitable.doLayout();
            }
          })
        },
        error => {
          console.log(error, '获取未逾期档案盒列表数据--返回失败的数据');
        })
    },
    //
    danganhequanbu() {//档案盒全部
      this.heneishow = true
      var arr = {
        name: 'first'
      }
      this.handleClick(arr)
    },
    //
    danganquanbu() {//档案-全部
      this.heneishow = true
      var arr = {
        name: 'second'
      }
      this.handleClick(arr) //
    },
    //
    danganyuqi() {
      this.heneishow = false
      this.borrowingfilebox = []
      this.zaijielishi = []
      var data = {
        "Table_name": "a01_hgldata",
        "pIndex": 1,
        "pSize": 200,
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
          //数据更新后执行
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.zaijielishitable_DA && this.$refs.zaijielishitable_DA.doLayout) {
              this.$refs.zaijielishitable_DA.doLayout();
            }
          })
        },
        error => {
          console.log(error, '获取逾期档案列表数据--返回失败的数据');
        })
    },
    //
    danganweiyuqi() {
      this.heneishow = false
      this.borrowingfilebox = []
      this.zaijielishi = []
      var data = {
        "Table_name": "a01_hgldata",
        "pIndex": 1,
        "pSize": 200,
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
          //数据更新后执行
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.zaijielishitable_DA && this.$refs.zaijielishitable_DA.doLayout) {
              this.$refs.zaijielishitable_DA.doLayout();
            }
          })
        },
        error => {
          console.log(error, '获取未逾期档案列表数据--返回失败的数据');
        })
    },
    //
    saomakuaisu() {
      if (this.Bus_MLId == '') {
        this.$message.warning('请选择分类')
        return
      }
      this.quickcodescan = true
    },
    heneiwenjian() {//再借盒内文件
      this.heneishow = false
      // this.danganheCODE=val[0].CODE
      // this.danganheTable_name=val[0].TableName
      // this.FileonloanTable=[]
      if (this.danganheCODE == '' || this.danganheTable_name == undefined) {
        this.$message.error("请选择要查看的盒")
        return;
      } else {
        this.heneishow = false
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
      this.pandianjisuashow = true
      this.filepopupwindowcheckcar = true;

      var dataRFID = {
        pIndex: this.pandianpIndex_da,
        pSize: this.pandianSize_da,

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
          this.pandiancount_DA = res.data.data.Count
          this.fileTableRFIDcheckcar = res.data.data.table;
          for (let i = 1; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
            };

            this.DAcolumnInfoPDClist.push(obj);
          }
          this.$nextTick(() => {
            // myTable是表格的ref属性值
            if (this.$refs.xyese && this.$refs.xyese.doLayout) {
              this.$refs.xyese.doLayout();
            }
          })
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
          this.daiqueren()
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
    // 档案修改
    handleEditS(index, row) {
      // if(this.multiSelectallboxesList.length<1){
      //   this.$message.error('请选择一条数据进行修改')
      //   return
      // }
      // if(this.multiSelectallboxesList.length>1){
      //   this.$message.error('请选择一条数据进行修改')
      //   return
      // }
      console.log(index, row);
      this.RecordForEdit();
      setTimeout(() => {
        console.log(this.DA_RecordInputList, 'DA_RecordInputListDA_RecordInputListDA_RecordInputList');
        this.archivalinformationdangan = true
        var arr = [];
        this.DA_RecordInputList.forEach((item) => {
          for (const key in row) {
            if (item.XName == key) {
              item.value = row[key]
            }
          }
        })
        this.Putdownloan.archBoxbarcode = row.CODE;
        console.log(this.Putdownloan.Boxbarcode, 'this.Putdownloan.Boxbarcode')


        console.log(this.DA_RecordInputList, 'DA_RecordInputListDA_RecordInputList');
      }, 1000)

      // setTimeout(() => {
      //   console.log(this.DA_RecordInputList, 'this.RecordInputList11111')
      //   this.DA_RecordInputList.forEach((item, index) => {
      //     arr.forEach((itemmmm, indexxxx) => {
      //       for (const key in itemmmm) {
      //         if (item.XName == key) {
      //           item.value = itemmmm[key]
      //         }
      //       }

      //     })
      //   })
      //   console.log(this.DA_RecordInputList, 'this.RecordInputList222222')

      // }, 1000)
    },
    //档案盒修改
    handleEdithgl(index, row) {
      // if( this.DAHlist.length>1){
      //   this.$message.error('请选择一条数据进行修改')
      //   return
      // }
      // if( this.DAHlist.length<1){
      //   this.$message.error('请选择一条数据进行修改')
      //   return
      // }

      this.DAH_RecordForEdit();
      this.archivalinformationhgl = true
      var arr = [];
      for (let i in row) {
        let o = {};
        o[i] = row[i];
        arr.push(o)

        console.log(i, "i")
        if (i == 'CODE_HGL') [i];
      }
      console.log(index, arr, 'index,rowindex,row')
      this.Putdownloan.Boxbarcode = row.CODE_HGL;
      console.log(this.Putdownloan.Boxbarcode, 'this.Putdownloan.Boxbarcode')
      setTimeout(() => {
        console.log(this.RecordInputList, 'this.RecordInputList11111')
        this.RecordInputList.forEach((item, index) => {
          arr.forEach((itemmmm, indexxxx) => {
            for (const key in itemmmm) {
              if (item.XName == key) {
                item.value = itemmmm[key]
              }
            }

          })
        })
        console.log(this.RecordInputList, 'this.RecordInputList222222')

      }, 1000)


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
          this.kaiguanflage = true
          if (this.mutisearchflag == 1)
            this.mutisearch()
          else if (this.mutisearchflag == 0) {
            this.SearchDAH()
          } else if (this.mutisearchflag == 3) {
            this.receiveSonMessage(this.showinfo)
          }


          this.archivalinformationhgl = false;
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
          this.kaiguanflageDA = true
          this.update_DA()
          this.archivalinformationdangan = false;
        },
        error => {
          console.log(error, '编辑档案档案信息--返回失败的数据');
        })

    },
    //档案盒rfid写入
    handlesaomiao() {
      // this.DAHlist[0]
      this.xieruflag = 1
      var indata={
        item: "RFIDPrinter1"
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetSValue', indata).then(//写入rfid
          success => {
              let arrWorkstation=success.data.data.value.split('-')
              if (arrWorkstation[6] != undefined && arrWorkstation[7] != undefined) {
        // var arrip = localStorage.getItem('arrip')
        // var arrport = localStorage.getItem('arrprot')
        var url = arrWorkstation[6] + ':' + arrWorkstation[7]

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
                          clearInterval(loop);
                          if (success.data.data.rfid == rfid) {
                            this.writeRFIDToSQL(rfid)
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
          error => {
            this.$message.error(error);
          })



    },
    //查看盒内文件
    showboxWJ() {

    },
    //档案盒删除
    handleDelete(index, row) {
      // if( this.DAHlist.length>1){
      //   this.$message.error('请选择一条数据进行回收')
      //   return
      // }
      // if( this.DAHlist.length<1){
      //   this.$message.error('请选择一条数据进行回收')
      //   return
      // }
      var handleDeleteList = {};
      handleDeleteList.Code = row.CODE_HGL;
      handleDeleteList.Table_name = this.DAH_TableDesignTittle;
      console.log(handleDeleteList, '传递的数据');

      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/goRecycleArchData', handleDeleteList).then(//删除档案信息 (档案盒)
        success => {
          console.log(success, '删除档案信息（档案盒）-成功');
          this.$message.success(success.data.data);
          this.lajicount()


          this.kaiguanflage = true
          if (this.mutisearchflag == 1)
            this.mutisearch()
          else if (this.mutisearchflag == 0) {
            this.SearchDAH()
          } else if (this.mutisearchflag == 3) {
            this.receiveSonMessage(this.showinfo)
          }

        },
        error => {
          console.log(error, '删除档案信息（档案盒）--返回失败的数据');
        })
    },
    lajicount() {
      console.log('走来了');
      const arr = {}
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDARecycleCount', arr).then(//根据摄像头id获取摄像头信息
        success => {
          //  console.log(success, '垃圾总数量-成功');
          this.newvaluelaji = success.data.data
          localStorage.setItem('newvaluelaji', this.newvaluelaji)
        },
        error => {
          //  console.log(error, '垃圾总数量-返回失败的数据');
        })


    },
    //档案盒快速归还
    kuaisuguihuan() {
      this.title = '档案盒快速归还'
      this.linshiTablename = ''
      this.linshiCODE = ''
      this.inputcfwz = ''
      this.valuegrriqi = ''
      this.inputcfwz = ''
      this.inputjgddh = ''
      this.inputphone = ''
      this.inputgh = ''
      console.log(this.kuaisusaomalist, 'sadsadfdgdfgfd');
      if (this.CODE_HGL_kuaisujieyue > 0) {
        this.fileboxreturn = true

      } else {
        this.$message.error("请选择要归还的档案盒")
      }
    },

    showheneiwenjian() {
      this.getInBoxArch(1)

    },
    //档案盒快速借阅读取rfid
    rederfid() {


      var indata={
        item: "RFIDPrinter1"
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetSValue', indata).then(//写入rfid
          success => {
              let arrWorkstation=success.data.data.value.split('-')
      if (arrWorkstation[6] == undefined || arrWorkstation[7] == undefined) {
        this.$message.warning('请前往库房管理中心配置RFID---ip-----端口')
        return
      }
      var testcnt = 1

      // var arrip = localStorage.getItem('arrip')
      // var arrport = localStorage.getItem('arrprot')
      const url = arrWorkstation[6] + ':' + arrWorkstation[7]
      var arr =
      {
        'cmd': '1', //1代表初始化
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
                  this.$message.success('标签读取成功')
                  //  console.log(success.data.data.rfid,'success.data.data.rfid ');
                  this.kuisujieyuerfid = success.data.data.rfid
                  const arrlist = {
                    "Table_name": this.DAH_TableDesignTittle,
                    "rfid": this.kuisujieyuerfid,
                  }
                  axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDADatasByRfid', arrlist).then(res => {
                    console.log(res, '根据rfid获取数据成功');
                    console.log(res.data.data, '根据rfid获取数据成功');


                    this.quickygridData.push(
                      {
                        'MLName': '',
                        'ads': '',
                        'code': '',
                        'info': '',
                        'number': '',
                        'status': '',
                      }
                    )
                    this.quickygridData[0].MLName = res.data.data.MLName
                    this.quickygridData[0].ads = res.data.data.ads
                    this.quickygridData[0].code = res.data.data.code
                    this.quickygridData[0].info = res.data.data.info
                    this.quickygridData[0].number = res.data.data.number
                    this.quickygridData[0].status = res.data.data.status

                  })
                    .catch(error => {

                    })  //根据rfid
                  // console.log(this.quickygridData, 'this.quickygridDatathis.quickygridData')




                }
              },
              error => {
                this.$message.error(error);
              })
          }, 1000)
        }).catch(
          error => {
            this.$message.error(error);
          })
        },
        error => {
            this.$message.error(error);
          })
    },
    //档案盒快速借阅清除rfid
    qingchset() {
      this.quickygridData = []
    },
    //档案盒 盒借阅
    fileboxforloanClick(index) {


      if (index == 1) {
        this.danganjieyueflag = 2

        if (this.multiSelectallboxes.length != 1) {
          this.$message.error('请选择要借阅的档案盒')
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
      } else if (this.kuaisujieyueflag == 1) {
        this.DAarchive = '档案盒快速借阅'
        if (this.kuaisusaomalist.length < 1) {
          this.$message.error('请选择要借阅的档案盒')
          return
        }
        if (this.kuaisusaomalist.length > 1) {
          this.$message.error('只能选择一条借阅的档案盒')
          return
        }
        this.fileboxforloan = true;
        var change = new Date(new Date().getTime());
        var Y = change.getFullYear() + "";
        var M = (change.getMonth() + 1 < 10 ? "0" + (change.getMonth() + 1) : change.getMonth() + 1) + "";
        var D = (change.getDate() < 10 ? "0" + (change.getDate()) : change.getDate()) + "";
        var h = (change.getHours() < 10 ? "0" + (change.getHours()) : change.getHours()) + "";
        var m = (change.getMinutes() < 10 ? "0" + (change.getMinutes()) : change.getMinutes()) + "";
        var s = (change.getSeconds() < 10 ? "0" + (change.getSeconds()) : change.getSeconds());
        var newDate = Y + M + D + h + m + s;
        this.Fileboxesloan.loannumber = newDate;


      } else if (this.kuaisujieyueflag == 2) {
        this.DA_fileboxforloanClick(2)
      }






    },

    DA_fileboxforloanClick(index) {

      this.danganjieyueflag = 1
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


      if (index == 2) {
        this.DAarchive = '档案快速借阅'
      } else {
        this.DAarchive = '档案借阅'
      }


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
      this.kuaisuhejieyue = '0',
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
      this.shangjiaflag = 1
      if (this.DAHlist.length < 1) {
        this.$message.error('要选择要上架的档案数据')
        return
      }
      this.OnShelfdialogFormVisible = true;

    },
    DownShelf() {//档案盒 下架
      if (this.DAHlist.length < 1) {
        this.$message.error('请选择要下架的档案数据')
        return
      }
      this.xiajiaflag = 1
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
          "storeno": 0,
          "QuNo": 0,
          "ColNo": 0,
          "LeNo": 0,//节
          "DivNo": 0,
          "ZyNo": 0,
          "SxNo": 0,//顺序
          "status": 0,
          'cmd': 1
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/UpdateArchData123 ', data).then(//下架（档案盒）
          success => {
            console.log(success, '下架（档案盒）-成功');
            if (success.data.code == 200) {
              console.log(index, 'ssssssss');
              if (index == 0) {
                this.$message.success("下架成功");
                this.kaiguanflage = true
                if (this.mutisearchflag == 1)
                  this.mutisearch()
                else if (this.mutisearchflag == 0) {
                  if (this.xiajiaflag == 1) {
                    this.SearchDAH()
                  } else {
                    this.SearchDAH(1)
                  }




                } else if (this.mutisearchflag == 2) {

                  this.niandufangfaDA_H()
                }
                else if (this.mutisearchflag == 3) {
                  this.receiveSonMessage(this.showinfo)
                }


                // this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
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
        if (this.DAHlist.length < 1) {
          this.$message.warning("请输入要上架的档案")
        }
        if (this.OnShelfForm.storeno == '' || this.OnShelfForm.QuNo == '' || this.OnShelfForm.ColNo == '' || this.OnShelfForm.LeNo == '' || this.OnShelfForm.DivNo == '' || this.OnShelfForm.ZyNo == '' || this.OnShelfForm.SxNo == '') {
          this.$message.warning("请输入要上架的存位信息")
          return;
        }
        var data = {
          "Table_name": this.DAH_TableDesignTittle,
          "Code": item.CODE_HGL,
          "BoxCode": "",
          "storeno": this.OnShelfForm.storeno,
          "QuNo": this.OnShelfForm.QuNo,
          "ColNo": this.OnShelfForm.ColNo,
          "LeNo": this.OnShelfForm.LeNo,//节
          "DivNo": this.OnShelfForm.DivNo,
          "ZyNo": this.OnShelfForm.ZyNo,
          "SxNo": this.OnShelfForm.SxNo,//顺序
          "status": 1,//tempStatus
          'cmd': 0
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
                this.kaiguanflage = true

                if (this.mutisearchflag == 1)
                  this.mutisearch()
                else if (this.mutisearchflag == 0) {

                  if (this.shangjiaflag == 1) {
                    this.SearchDAH()
                  } else {
                    this.SearchDAH(1)
                  }

                } else if (this.mutisearchflag == 2) {

                  this.niandufangfaDA_H()
                } else if (this.mutisearchflag == 3) {
                  this.receiveSonMessage(this.showinfo)
                }



                //  }



                //  if(this.shangjiaflag==1){

                //  }else{
                //    this.SearchDAH(1)
                //  }




                this.OnShelfdialogFormVisible = false
                // this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
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
    //最后借阅按钮
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
        if (this.Fileboxesloan.loandate == '') {
          this.$message.error("请输入借阅日期")
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
        console.log(data, '档案盒借阅接口需要传递的数据');


        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddLendData_hgl', data).then(//添加档案盒借阅信息
          success => {
            console.log(success, '添加档案盒借阅信息-成功');
            if (success.data.code == 200) {
              this.$message.success("借阅成功");
              this.fileboxforloan = false;
              this.kaiguanflage = true

              if (this.mutisearchflag == 1)
                this.mutisearch()
              else if (this.mutisearchflag == 0) {
                this.SearchDAH()
                //  if(this.shangjiaflag==1){

                //  }else{
                //    this.SearchDAH(1)
                //  }

              } else if (this.mutisearchflag == 2) {
                this.niandufangfaDA_H()
              } else if (this.mutisearchflag == 3) {
                this.receiveSonMessage(this.showinfo)
              }



              this.SearchDA()  //档案搜索



              //       if(this.danganjieyueflag==2){

              //        this.getDAHTableList(this.pIndex_dah, this.pSize_dah);

              // }else{
              //   this.getDAHTableList(1, 10);
              // }








            }

          },
          error => {
            console.log(error, '添加档案盒借阅信息--返回失败的数据');
          })

      }


      else if (this.DAarchive == '档案借阅') {
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
              this.$message.success("档案借阅成功");
              this.fileboxforloan = false;
              this.kaiguanflageDA = true
              this.update_DA()


            }

          },
          error => {
            console.log(error, '档案借阅-返回失败的数据');
          })
      }
      else if (this.DAarchive == '档案盒快速借阅') {
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
          // "DAID": this.DAH_ID_kuaisujieyue,//档案ID                      ~~~~~~~~~~~
          "CODE": this.CODE_HGL_kuaisujieyue,
          "FATHERKEY": this.Bus_FatherKey,
          "LENDTYPE": this.Bus_MLId,//门类ID   
          "SERIALNO": this.Fileboxesloan.loannumber,//序列号
          // "Address": this.filelendingTble[0].address,//存放位置    
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
        console.log(data, '档案盒快速借阅接口需要传递的数据');


        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddLendData_hgl', data).then(
          success => {
            console.log(success, '添加档案盒借阅信息-成功');
            if (success.data.code == 200) {
              this.$message.success("借阅成功");
              this.fileboxforloan = false;
              // this.kaiguanflage = true
              // this.updateDAHData();
              this.getDAHTableList(this.pIndex_dah, this.pSize_dah);
            }

          },
          error => {
            console.log(error, '添加档案盒借阅信息--返回失败的数据');
          })
      }
      else if (this.DAarchive == '档案快速借阅') {
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
        console.log(GetXXBH_Data, '档案快速借阅需要传递的数据');
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/AddLendData', GetXXBH_Data).then(//借阅(档案)
          success => {
            if (success.data.code == 200) {
              this.$message.success("档案借阅成功");
              this.fileboxforloan = false;
              this.kaiguanflageDA = true
              this.getInBoxArch(1)


            }

          },
          error => {
            console.log(error, '档案借阅-返回失败的数据');
          })
      } else {

      }


    },

    //档案删除
    handleDeleteS(index, row) {
      // if(this.multiSelectallboxesList.length<1){
      //   this.$message.error('请选择一条数据进行删除')
      //   return
      // }
      // if(this.multiSelectallboxesList.length>1){
      //   this.$message.error('请选择一条数据进行删除')
      //   return
      // }
      console.log(row, '1111111111111111111111111');
      var handleDeleteList = {};

      handleDeleteList.Code = row.CODE;
      handleDeleteList.Table_name = this.DATableDesignTittle;

      console.log(handleDeleteList, '传递的数据');
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/goRecycleArchData', handleDeleteList).then(//删除档案信息 (档案)
        success => {
          console.log(success, '删除档案信息（档案）-成功');
          this.$message.success(success.data.data);

          this.kaiguanflageDA = true
          // this.lajicount()
          this.update_DA()

        },
        error => {
          console.log(error, '删除档案信息（档案）--返回失败的数据');
        })
    },

    //档案盒全选
    handleSelectallboxes(val) {
      this.DAHlist = val

      console.log(val, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      this.multiSelectallboxes = val;
      if (val.length < 1) {
        this.SearchDA()
        return
      }
      console.log(this.DAHlist, 'cccccccccccccccc1111111111111111111111111');
      this.boxarrlist=[]
      this.chaixianglist=[]
      this.DAHlist.forEach((item)=>{
        this.boxarrlist.push(
          {
            "boxCode":'',
            "archiveTableName":this.DAH_TableDesignTittle,
            "archiveId":item.id
          }
        )
        this.chaixianglist.push({
             "archiveTableName":this.DAH_TableDesignTittle,
             "archiveId":item.id
        })
      })
      this.getInBoxArch(0)
    },
    //档案全选
    handleSelectionChange(val) {
      this.multiSelectallboxesList = val;
      console.log(this.multiSelectallboxesList, 'this.multiSelectallboxesListthis.multiSelectallboxesList');
      //       if(this.multiSelectallboxes.length==0){



      //  }
      if (val.length < 1)
        //档案搜索
        return;
      // console.log(val[0], 'cccccccccccccccc');


    },
    //


    //
    //盘点车全选
    handleSelectionPandian(val) {
      console.log(val);
      this.pandianid = val
      console.log(this.pandianid, 'this.pandianidthis.pandianid');
    },
    handleSelectionbox(val){
      console.log(val,'箱信息');
      if(val.length>1){
        // val=[]
        this.$message.error('单次只能放入一个箱子')
        return
      }
      this.boxcode=val[0].dacode
      this.boxarrlist.forEach((item,index)=>{
        item.boxCode=this.boxcode
      })
       
    },

    addPDRFID() {
      this.dialogVisibleRFID = true;
      this.PDTitle = '盘点添加'
    },
    //盘点计划查询
    pandiansearch() {
      if (this.filetelist.filepandian != '') {
        this.pandianjisuashow = false
        const arr = {
          'Fiter': this.filetelist.filepandian,
          "pIndex": this.searchpIndex_da,
          "pSize": this.searchSize_da

        }
        this.fileTableRFIDcheckcar = []
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDPlanList', arr).then(//查询盘点结果 (档案盒)
          success => {
            console.log(success, '查询盘点结果成功');
            if (success.data.code == 200) {
              // this.$message.success('查询成功');
              this.fileTableRFIDcheckcar = success.data.data.table
              this.searchcount_DA = success.data.data.Count
            }

            // this.getPDResultList()
          },
          error => {
            console.log(error, '查询盘点结果--返回失败的数据');
          })
      } else {
        this.pandianjisuashow = true
        this.searchpIndex_da = 1
        this.pandianpIndex_da = 1
        const arr = {
          'Fiter': this.filetelist.filepandian,
          "pIndex": this.pandianpIndex_da,
          "pSize": this.searchSize_da

        }
        this.fileTableRFIDcheckcar = []
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDPlanList', arr).then(//查询盘点结果 (档案盒)
          success => {
            console.log(success, '查询盘点结果成功');
            if (success.data.code == 200) {
              // this.$message.success('查询成功');
              this.fileTableRFIDcheckcar = success.data.data.table
              this.searchcount_DA = success.data.data.Count
            }

            // this.getPDResultList()
          },
          error => {
            console.log(error, '查询盘点结果--返回失败的数据');
          })
      }

    },
    pandianjihuaclose() {
      this.filetelist.filepandian = ''
      this.searchpIndex_da = 1
      this.pandianpIndex_da = 1
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
          if (this.pandianjisuashow) {
            this.getPDResultList()
          } else {
            this.pandiansearch()
          }
        },
        error => {
          console.log(error, '删除盘点）--返回失败的数据');
        })
    },
    //

    //
    daiqueren(val) {
      this.TDMdaiqueren = true
      this.querenshow = true
      this.fileTableRFID = []
      this.filebiaotou = []
      this.filepopupwindowRFID = true;
      var nmbj = {
        "pIndex": this.TDMDAHFYpIndex_da,
        "pSize": this.TDMDAHFYpSize_da,
        "IsConfirm": 0

      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDoorList', nmbj).then(res => {
        console.log(res, 'rfid表头成功了)');
        // this.fileTableRFID.push(res.data.data)
        this.fileTableRFID = res.data.data.table;
        this.TDMDAHFYcount_DA = res.data.data.Count
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
      this.TDMdaiqueren = false
      this.querenshow = false
      this.fileTableRFID = []
      this.filebiaotou = []
      var arr = {
        "pIndex": this.WQRpIndex_da,
        "pSize": this.WQRpSize_da,
        "IsConfirm": 1

      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDoorList', arr).then(res => {
        console.log(res, 'rfid表头成功了)');
        // this.fileTableRFID.push(res.data.data)
        this.fileTableRFID = res.data.data.table;
        this.WQRcount_DA = res.data.data.Count
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

      if (this.title == '档案盒快速归还') {


        if (this.inputgh == '') {
          this.$message.error('请输入归还人')
          return
        }

        if (this.inputphone == '') {
          this.$message.error('请输入手机号码')
          return
        }

        if (this.valuegrriqi == '') {
          this.$message.error('请输入归还日期')
          return
        }







        const arr = {
          "Table_name": this.DAH_TableDesignTittle,
          "CODE": this.CODE_HGL_kuaisujieyue,
          "RETURNDATE": this.valuegrriqi,
          "GHR": this.inputgh,
          "GHRSJ": this.inputphone,
          "GHRDH": this.inputjgddh,
          // 'inputcfwz':this.inputcfwz
          // inputcfwz: "", //档案盒存放位置
        }
        console.log('')
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDAGH_hgl', arr).then(res => {
          this.$message.success('档案盒快速归还操作成功')
          this.fileboxreturn = false

        }).catch(error => {
          console.log(error);
        }
        )
      } else {


        if (this.title == '档案盒归还') {

          if (this.inputgh == '') {
            this.$message.error('请输入归还人')
            return
          }

          if (this.inputphone == '') {
            this.$message.error('请输入手机号码')
            return
          }

          if (this.valuegrriqi == '') {
            this.$message.error('请输入归还日期')
            return
          }




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
        } else if (this.title == '档案归还') {
          console.log('进来了');

          if (this.inputgh == '') {
            this.$message.error('请输入归还人')
            return
          }

          if (this.inputphone == '') {
            this.$message.error('请输入手机号码')
            return
          }

          if (this.valuegrriqi == '') {
            this.$message.error('请输入归还日期')
            return
          }












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

      }






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
              this.pandianjisuashow = true

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

            this.pandianjisuashow = true
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
      // this.OnShelfForm = {};
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
    //Excel普通导入修改按钮
    editUpLoadList() {
      console.log(this.UpLoadListSelect, '选中删除Excel数据的列表');
      if (this.UpLoadListSelect.length == 0) {
        this.$message.error("请选择要修改的Excel数据")
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
    //Excel普通导入删除按钮
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
    //添加Excel文件信息按钮
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
    //修改Excel文件信息更新按钮
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
    //档案盒高级搜索
    mutisearch() {
      this.mutisearchflag = 1;
      var data = {
        Table_name: this.DAH_TableDesignTittle || "a01_hgldata_1_1",
        pIndex: this.pIndex_dah,
        pSize: this.pSize_dah,
        MLIdList: this.Bus_MLId || 1,
        condition: this.RecordInputListearch,
        orderby: this.RecordInputListone,
      };
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/mutisearch_hgl', data).then(//高级搜索
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
            // this.pIndex_dah='1'
            // this.pSize_dah
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
    // 档案高级搜索
    mutisearchDA() {
      this.boxinarchfalg = 2
      var data = {
        Table_name: this.DATableDesignTittle,
        pIndex: this.pIndex_da,
        pSize: this.pSize_da,
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
          this.DAtableBodyInfoList = [];
          this.DAcolumnInfoList = [];
          this.DAtableBodyInfoList = res.data.data.table;
          console.log(res.data.data.Count, 'res.data.data.count');
          // this.totalcount_dah = res.data.data.Count;
          this.count_DA = res.data.data.Count;
          for (let i = 0; i < res.data.data.headernames.length; i++) {
            let obj = {
              prop: res.data.data.headernames[i],
              label: res.data.data.headertexts[i],
              width: res.data.data.headerwidth[i],
            };
            this.DAcolumnInfoList.push(obj);
            this.count_DA = res.data.data.Count
            // this.pIndex_dah='1'
            // this.pSize_dah
            //数据更新后执行
            this.$nextTick(() => {
              // myTable是表格的ref属性值
              if (this.$refs.multipleTableone && this.$refs.multipleTableone.doLayout) {
                this.$refs.multipleTableone.doLayout();
              }
            })
            this.muitisearchVisibleDA = false;
          }
        },
        error => {
          console.log(error, '高级搜索--返回失败的数据');
        })
    },
    adspostocode() {
      this.OnShelfForm.poscode =
        this.prefixZero(this.OnShelfForm.storeno, 2) + "-" +
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

<style  lang="less">
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
  margin-left: 1.2vw;
  width: 98.5%;
  height: 5vh;
  display: flex;
  align-items: center;
  background: rgb(232, 233, 235);
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
  justify-content: flex-end;

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
  background-color: #ececec !important;
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
  // height: 5vh !important;

  // background: #f8f8f8 !important;
  // min-height: calc(100% - 0px);
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
  width: 100% !important;
}

.oldclassone {
  height: 26vh !important;
  // z-index: 99999;
  width: 100% !important;
}

.quanpingone {
  margin-left: 39vw;
  width: 1.5vw;
  height: 3vh;
  background: url(../../assets/btnMSX.png);
  background-size: 100% 100%;

}

.quanpingtwo {
  margin-left: 39vw;
  width: 1.5vw;
  height: 3vh;
  background: url(../../assets/btnMSX.png);
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
  margin-left: 39vw;
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
  width: 0.7vw;
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

  // margin-left: 0.5vw;
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
  width: 0.7vw;
  height: 2vw;
  border: 1px solid #000;
  background-color: #ede7e7;
  border-radius: 4.5px;
  background-image: url(../../assets/折叠5.png);
  background-size: 85% 100%;
}

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

.my-label {
  color: #000 !important;

}

.el-descriptions__header {
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
  margin-bottom: 20px !important;
}</style>