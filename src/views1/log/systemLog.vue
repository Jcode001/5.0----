<template>
    <div style="width:100%;height:100vh">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;
        margin-top: 0.5rem;
        font-size: 1rem;
        text-decoration: none;
        color: #000000;
        border-bottom: 0.125rem solid #258AD9;
        margin-bottom: 1rem;
        padding: 0.3rem;
        ">
            <el-breadcrumb-item :to="{ path: '/welcome' }">主页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>系统日志</el-breadcrumb-item> -->
            <el-breadcrumb-item>系统错误日志</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" >
            <!-- <el-form-item>
                <span>操作结果：</span>
                 <el-select v-model="value" style="width:8vw;" clearable placeholder="请选择操作结果">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <span>请求类型：</span>
                <el-select v-model="value1" clearable style="width:8vw;" placeholder="请选择请求类型">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <!-- <el-form-item>
                <span style="margin-left:4vw;">类型：</span>
                <el-input v-model="formInline.status" style="width:10vw;" placeholder="请输入类型"></el-input>
            </el-form-item>
            <el-form-item>
                <span>状态：</span>
                <el-input v-model="formInline.type" style="width:10vw;" placeholder="请输入状态"></el-input>
            </el-form-item> -->
            <el-form-item style="">
                <el-date-picker
                    v-model="value2"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    value-format="yyyy-MM-dd">
    </el-date-picker>
            </el-form-item>
            <el-form-item style="">
                <el-button type="primary" @click="serchlist" style="background-color: #66b1ff;border:1px solid #66b1ff;line-height: 1.2vh;border-radius: 0;">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" height="65%" border>
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
        <el-table-column  prop="type" label="类型" width="200" align="center"> </el-table-column>
        <el-table-column  prop="status" label="状态" width="200" align="center" >
            <template slot-scope="scope">
                <span v-if="scope.row.status == '1'">成功</span>
                <span v-else-if="scope.row.status == '0'">失败</span>
                <span v-else></span>
            </template>
        </el-table-column>
        <el-table-column prop="content" label="内容"  align="center"> </el-table-column>
        <el-table-column  prop="insertTime" label="请求时间" align="center" >
            <template slot-scope="scope">
                {{ scope.row.insertTime ? scope.row.insertTime.replace('T', ' ') : '' }}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                    详情</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
        <div style="margin-right:4vw">
            <!-- <div class="row" style="float: right;margin-left: 2rem;">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                    </ul>
                </nav>
            </div> -->
            <div class="row" style="float:right; ">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPageActive"
                    :page-sizes="[20, 50, 100, 200]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="zongtotal">
                </el-pagination>
            </div>
        </div>
    </div>
    <el-dialog
        title="详情"
        :visible.sync="dialogVisible"
        width="30%"
        custom-class="editLog">
        <div class="editdialog">类型: {{ editData.type }}</div>
        <div class="editdialog">状态:
            <span v-if="editData.status == '1'">成功</span>
            <span v-else-if="editData.status == '0'">失败</span>
            <span v-else></span>
        </div>
        <div class="editdialog">内容: {{ editData.content }}</div>
        <div class="editdialog">请求时间: {{ editData.insertTime ? editData.insertTime.replace('T', ' ') : '' }}</div>
        <!-- <div class="editdialog">ID: {{ editData.id }}</div> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
 </div>
</template>
<style>
.RightHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
html::-webkit-scrollbar {
    display: none
}
.RightHeader ul {
    display: flex;
}
.RightHeader ul li {
    margin-left: 10px;
}
.from {
    display: flex;
    align-items: center;
    margin-left: 1.4vw;
    margin-top: -1.5vh;
}
.from div {
    margin-left: 10px;
}
.from label {
    margin-left: 10px;
    font-size: 15px;
    white-space: nowrap;
    font-weight: 700;
}
.btn-primary {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}
.btn-danger {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}
.btn-light {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}
.cnterTable {
    width: 100%;
    padding: 5px 10px;
}
.form-select {
    height: 30px;
    font-size: 13px;
}
.modal-body {
    max-height: 30.5rem;
    max-width: 30.5rem;
    overflow-y: scroll;
}
.tree {
    margin: 0 auto;
}
.RightCenter {
    overflow-y: scroll;
}
.RightCenter::-webkit-scrollbar {
    width: 8px;
}
.RightCenter::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
}
.RightCenter::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}
.form-control {
    height: 32px;
    font-size: 13px;
    border-radius: 0;
}
.btn-success {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
    border-radius: 0;
}
.btn-outline-primary {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}
.btn-outline-danger {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}
.btn-secondary {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}
.btn-info {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}
.Centerbutton {
    display: flex;
    padding: 5px 10px;
}
.Centerbutton div {
    margin-left: 10px;
    margin-top: 10px;
}
.fromtime div {
    padding: 3px 5px;
}
.headfrom {
    width: 56%;
    max-height: 300px;
    margin-left: 6px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    margin-bottom: 5px;
}
.permissionInput {
    margin-left: 15px;
}
.contentHeader {
    display: flex;
    align-items: center;
}
.modal-body::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
}
.modal-body::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
}
.modal-body:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 53%, 0.4);
}
.modal-body:hover::-webkit-scrollbar-track {
    background: hsla(0, 0%, 53%, 0.1);
}
.FooterPageindex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.editLog .el-dialog__header{
    background: #fff;
}
.editLog .el-dialog__title{
    color: #606266;
}
.editdialog{
    padding-bottom:10px;
}
</style>
<script>
import axios from "axios";
export default {
    data() {
        return {
            formInline: {
                status: '',
                type: ''
            },
            value2: '',

            value: '全部',
            options: [{
                value: '全部',
                label: '全部'
                }, {
                value: 'true',
                label: '成功'
                }, {
                value: 'false',
                label: '失败'
            }],
            value1: '全部',
                options1: [{
                value: '全部',
                label: '全部'
                }, {
                value: 'get',
                label: 'GET'
                }, {
                value: 'post',
                label: 'POST'
            }],

            tableData: [],
            multipleSelection: [],
            zongtotal:0,
            currentPageActive:1,
            pages:{
                pagesNo:1,
                pageSize:20
            },
            dialogVisible: false,
            editData:{}
        }
    },
    computed: {
        ServeIp() {
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },
    mounted(){
        this.getTableData()
    },
    methods: {
        serchlist() {
            console.log('serchlist!');
            this.getTableData()
        },
        //table数据接口
        getTableData () {
            let tempdata = {
                pageNumber: this.pages.pagesNo,
                pageSize: this.pages.pageSize
            }
            // if (this.formInline.status) {
            //     tempdata.status = this.formInline.status
            // }
            // if (this.formInline.type) {
            //     tempdata.type = this.formInline.type
            // }
            // if (this.value != '全部' && this.value != '') {
            //     tempdata.status = this.value
            // }
            if (this.value == 'true') {
                tempdata.status = 1
            }
            if (this.value == 'false') {
                tempdata.status = 0
            }
            if (this.value1 != '全部' && this.value1 != '') {
                tempdata.type = this.value1
            }
            if (this.value2) {
                tempdata.startTime = this.value2[0] + ' 00:00:00'
                tempdata.endTime = this.value2[1] + ' 00:00:00'
            }
            axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/systemLog/list',tempdata).then(
                success => {
                    console.log(success, '获取库房列表接口-成功');
                    this.tableData = success.data.data
                    this.zongtotal = success.data.lineCount
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })
        },
        //详情
        handleEdit (index,row) {
            console.log('qqq',index,row)
            this.dialogVisible = true
            this.editData = row
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pages.pageSize = val
            this.getTableData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pages.pagesNo = val
            this.getTableData()
        }
    },
    toggleSelection(rows) {
        if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    }
}
</script>