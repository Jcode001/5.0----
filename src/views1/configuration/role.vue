<template>
<div style="width:100%;height:100vh">
    <el-breadcrumb separator-class="el-icon-arrow-right"
    style="display: inline-block;
    margin-top: 0.5rem;
    font-size: 1rem;
    text-decoration: none;
    color: #000000;
    border-bottom: 0.125rem solid #258AD9;
    margin-bottom: 1rem;
    padding: 0.3rem;
    "
    >
        <el-breadcrumb-item :to="{ path: '/toArchiveHome' }">档案管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
            <el-button type="primary" @click="serchlist" style="background-color: rgb(60, 138, 231);border:1px solid rgb(60, 138, 231);line-height:  1.2vh;border-radius: 0;">添加</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="serchlist" style="background-color: rgb(237, 95, 95);border:1px solid rgb(237, 95, 95);line-height:  1.2vh;border-radius: 0;">删除</el-button>
        </el-form-item>
        <el-form-item style="position: absolute; right: 2.5%;">
            <el-input v-model="formInline.nickNamelist" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item style="position: absolute; right: 2.5%;">
            <el-button type="primary" @click="serchlist" style="background-color: #66b1ff;border:1px solid #66b1ff;line-height: 1.2vh;border-radius: 0;">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        >
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        label="角色id"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
        prop="name"
        label="角色名称"
        width="120">
        </el-table-column>
        <el-table-column
        prop="name"
        label="创建时间"
        width="120">
        </el-table-column>
        <el-table-column label="操作">
         <template slot-scope="scope">
            <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
        </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
        <div
            style="margin-left:2vw;float: left;margin-top: 0.25rem;height: 2.5rem;line-height: 2.5rem;display: flex;align-items: center;">
            <span>展示数量:</span>
            <select class="form-select" aria-label="Default select example"
                style="width: 5rem;float: right; " id="exhibition" onchange="exhibition(this)">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
        </div>
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <div style="margin-right:4vw">
            <div class="row" style="float: right;margin-left: 2rem;">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                    </ul>
                </nav>
            </div>
            <div class="row"
                style="float: right;margin-top: 0.25rem;width: 10rem;margin-left:2rem ;">
                <input class="form-control form-control-sm" type="text" placeholder="" id="jumpVal"
                    aria-label=".form-control-sm example" style="width: 5rem;"
                    onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
                <button type="button" class="btn col-5  btn-primary amend"
                    style="width: 3rem;font-size: 0.8rem;margin-left: 1rem;" onclick="jump()">GO
                </button>
            </div>
        </div>
    </div>
                    <!-- 
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                                data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">修改</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="fromtime">
                                                <div class="row  align-items-center a adda">
                                                    <div class="col-auto col-3" style="text-align:right;">
                                                        <label class="col-form-label"><span style="color:red">*</span>账号:</label>
                                                    </div>
                                                    <div class="col-auto col-9">
                                                        <input id="usernamenumber" class="form-control form-control-sm"
                                                            type="text" placeholder=""
                                                            aria-label=".form-control-sm example">
                                                    </div>
                                                </div>

                                                <div class="row  align-items-center a adda" id="usercipher">
                                                    <div class="col-auto col-3" style="text-align:right;">
                                                        <label class="col-form-label"><span style="color:red">*</span>密码:</label>
                                                    </div>
                                                    <div class="col-auto col-9">
                                                        <input id="passworduser" class="form-control form-control-sm"
                                                            type="password" placeholder=""
                                                            aria-label=".form-control-sm example">
                                                    </div>
                                                </div>

                                                <div class="row align-items-center a adda">
                                                    <div class="col-auto col-3" style="text-align:right;">
                                                        <label class="col-form-label"><span style="color:red">*</span>昵称:</label>
                                                    </div>
                                                    <div class="col-auto col-9">
                                                        <input id="nickname" class="form-control form-control-sm"
                                                            type="text" placeholder=""
                                                            aria-label=".form-control-sm example">
                                                    </div>
                                                </div>

                                                <div class="row align-items-center a adda">
                                                    <div class="col-auto col-3" style="text-align:right;">
                                                        <label class="col-form-label"><span style="color:red">*</span>头像:</label>
                                                    </div>
                                                    <div class="col-auto col-9">
                                                        <input type="file" name="img" id="file">
                                                        <img src="" id="userimg" style="margin-top:10px;width: 5.5vw;
                                                        height: 5.5vw;
                                                        border-radius: 50%;"
                                                            accept="image/jpg,image/jpeg,image/png,image/PNG">
                                                    </div>
                                                </div>

                                                <div class="row align-items-center a adda" id="userInfolist">
                                                    <div class="col-auto col-3" style="text-align:right;">
                                                        <label class="col-form-label"><span style="color:red">*</span>角色:</label>
                                                    </div>
                                                    <div class="col-auto col-9">
                                                        <input id="roleuserId" class="form-control form-control-sm"
                                                            type="text" placeholder=""
                                                            aria-label=".form-control-sm example">
                                                    </div>
                                                    <div class="col-12">
                                                        <select class="form-select form-select-sm userInfo"
                                                            aria-label=".form-select-sm example"
                                                            style="width: 20rem;height: 32px;margin-left: 25.6%;">
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                                onclick="">取消
                                            </button>
                                            <button type="button" id="modelist" class="btn btn btn-info"
                                                onclick="addlist()">确定
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
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
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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