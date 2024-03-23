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
            <el-breadcrumb-item>系统日志</el-breadcrumb-item>
            <el-breadcrumb-item>档案修改日志</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" >
            <el-form-item>
                <span style="margin-left:4vw;">操作用户：</span>
                <el-input v-model="formInline.nickNamelist" style="width:10vw;" placeholder="请输入操作用户ID"></el-input>
            </el-form-item>
            <el-form-item>
                <span>发送请求主机ID：</span>
                <el-input v-model="formInline.nickNamelist" style="width:10vw;" placeholder="请输入发送请求主机IP"></el-input>
            </el-form-item>
            <el-form-item style="position: absolute; right:6%;">
                <el-date-picker
                    v-model="value2"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :default-time="['12:00:00', '08:00:00']">
    </el-date-picker>
            </el-form-item>
            <el-form-item style="position: absolute; right: 2.5%;">
                <el-button type="primary" @click="serchlist" style="background-color: #66b1ff;border:1px solid #66b1ff;line-height: 1.2vh;border-radius: 0;">查询</el-button>
                <el-button type="success" @click="serchlist" style="background-color: #66b1ff;border:1px solid #66b1ff;line-height: 1.2vh;border-radius: 0;">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" height="500" border>
            <el-table-column type="selection" width="55"  align="center">
            </el-table-column>
            <el-table-column  prop="id" label="序号" align="center" >
        </el-table-column>
        <el-table-column prop="describe" label="操作用户"  align="center"> </el-table-column>
        <el-table-column  prop="result" label="门类"  align="center"> </el-table-column>
        <el-table-column  prop="type" label="档案ID"  align="center"> </el-table-column>
        <el-table-column  prop="ip" label="数据ID"  align="center"> </el-table-column>
        <el-table-column  prop="zjip" label="发生请求主机IP"  align="center"> </el-table-column>
        <el-table-column  prop="time" label="操作时间" align="center" > </el-table-column>
        <el-table-column label="操作" align="center">
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
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
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
</style>
<script>
export default {
    data() {
        return {
            formInline: {
                user: '',
                region: ''
            },
            value2: '',

            value: '全部',
             options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '成功'
        }, {
          value: '选项3',
          label: '失败'
        }, ],
            value1: '全部',
             options1: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: 'GET'
        }, {
          value: '选项3',
          label: 'POST'
        }, ],

            tableData: [{
                id: '5',
                describe: '增删改档案列',
                result: '失败',
                type: 'POST',
                ip: '172.16.21.41',
                zjip: '172.16.21.00',
                time: '2023-10-11 09:29:37',
            }, {
                id: '5',
                describe: '增删改档案列',
                result: '失败',
                type: 'POST',
                ip: '172.16.21.41',
                zjip: '172.16.21.00',
                time: '2023-10-11 09:29:37',
            }, {
                id: '15',
                describe: '导出档案数据excel',
                result: '失败',
                type: 'POST',
                ip: '172.16.21.41',
                zjip: '172.16.21.00',
                time: '2023-10-11 09:29:37',
            }, {
               id: '3',
                describe: '增删改档案列',
                result: '失败',
                type: 'POST',
                ip: '172.16.21.41',
                zjip: '172.16.21.00',
                time: '2023-10-11 09:29:37',
            }, {
                id: '7',
                describe: '导出档案数据excel',
                result: '成功',
                type: 'POST',
                ip: '172.16.21.34',
                zjip: '172.16.21.00',
                time: '2023-10-11 09:29:37',
            }, {
                id: '9',
                describe: '增删改档案列',
                result: '失败',
                type: 'POST',
                ip: '172.16.21.22',
                zjip: '172.16.21.00',
                time: '2023-10-11 09:29:37',
            }, {
               id: '1',
                describe: '增删改档案列',
                result: '失败',
                type: 'POST',
                ip: '172.16.21.41',
                zjip: '172.16.21.00',
                time: '2023-10-11 09:29:37',
            }],
            multipleSelection: []
        }
    },
    methods: {
        serchlist() {
            console.log('serchlist!');
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