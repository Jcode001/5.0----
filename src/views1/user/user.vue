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
        padding: 0.3rem;">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
     
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="账号">
                <el-input clearable v-model.trim="zhanghao" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input clearable v-model.trim="nicheng" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchgetuserlist" style="background-color: #66b1ff;border:1px solid #66b1ff;line-height: 1.2vh;border-radius: 0;">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="serchlistadd" style="background-color: rgb(60, 138, 231);border:1px solid rgb(60, 138, 231);line-height: 1.2vh;border-radius: 0;">添加</el-button>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary" @click="serchlistdelete" style="background-color: rgb(237, 95, 95);border:1px solid rgb(237, 95, 95);line-height: 1.2vh;border-radius: 0;">删除</el-button>
            </el-form-item> -->
        </el-form>
        <el-table
        border
            height="620"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            
            >
            <el-table-column
            type="selection"
            width>
            </el-table-column>

            <el-table-column
            type="index"
            label="序号"
            width>
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>


            <el-table-column
            prop="name"
            label="账号"
            width>
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column
            prop="nickname"
            label="昵称"
            width>
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width>
            </el-table-column>
            <el-table-column
            prop="phone"
            label="电话"
            width>
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
                        :current-page="pagesNo"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="zongtotal">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog
            :title="this.title"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form label-width="60px">
                <el-form-item label="账号">
                    <el-input v-model="username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item v-if="this.title=='添加操作'" label="密码">
                    <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="inputtwo" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="inputEmail" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="inputPhone" placeholder="请输入电话"></el-input>
                </el-form-item>
            </el-form>
            <!-- <el-descriptions :column="2"  title="">
                <el-descriptions-item label="账号"><el-input style="width:8vw" v-model="username" placeholder="请输入账号"></el-input></el-descriptions-item>  
                <el-descriptions-item label="密码"><el-input style="width:8vw" v-model="password" placeholder="请输入密码"></el-input></el-descriptions-item>
                <el-descriptions-item label="昵称"><el-input style="width:8vw" v-model="inputtwo" placeholder="请输入昵称"></el-input></el-descriptions-item>
                <el-descriptions-item label="邮箱"><el-input style="width:8vw" v-model="inputEmail" placeholder="请输入昵称"></el-input></el-descriptions-item>
                <el-descriptions-item label="电话"><el-input style="width:8vw" v-model="inputPhone" placeholder="请输入昵称"></el-input></el-descriptions-item>
            </el-descriptions> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="this.title=='添加操作'" type="primary" @click="queren()">添加</el-button>
                <el-button v-else-if="this.title=='编辑操作'" type="primary" @click="queren()">确定</el-button>
            </span>
        </el-dialog>

    </div>
    
</template>
<script>
import axios from 'axios';
export default {
    data() {
      return {
        zhanghao:'',
        nicheng:'',
        userid:'',
        title:'',
        password:'',
        username:'',
        inputtwo:'',
        inputEmail:'',
        inputPhone:'',
        dialogVisible:false,
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        multipleSelection: [],
        // pages:{
            pagesNo:1,
            pageSize:10,
   
        zongtotal:0,
        // currentPageActive:1,
      }
    },
  
    mounted(){
        this.getuserlist()
  
    },
    computed: {
        ServeIp() {
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },
    methods: {
    serchlistadd(){
        this.username=''
        this.inputtwo=''
        this.password = ''
        this.inputEmail = ''
        this.inputPhone = ''
       this.title='添加操作'
       this.dialogVisible=true
    },
    queren(){
        var reg = /^1[3456789]\d{9}$/;
        var regEmail = /^([a-zA-Z0-9_]-*\.*)+@([a-zA-Z0-9_]-?)+(\.[a-zA-Z]{2,3}){1,2}$/
        if (this.username == '') {
            this.$message.info('账号不能为空')
            return
        } else if (this.username.match(/^\s+$/)) {
            this.$message.info('账号输入错误')
            return
        }
        
        if (this.inputtwo == '') {
            this.$message.info('昵称不能为空')
            return
        } else if (this.inputtwo.match(/^\s+$/)) {
            this.$message.info('昵称输入错误')
            return
        }
        if (!reg.test(this.inputPhone) && this.inputPhone != '') {
            this.$message.info('手机号码不正确')
            return
        }
        if (!regEmail.test(this.inputEmail) && this.inputEmail != '') {
            this.$message.info('邮箱格式不正确')
            return
        }
        if(this.title=='添加操作'){
         const arr ={
           "name":  this.username, 
           "nickname":this.inputtwo,
           "password": this.password,
           "email":this.inputEmail,
           "phone": this.inputPhone
         }
         if (this.password == '') {
            this.$message.info('密码不能为空')
            return
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort +'/user/save',arr).then(
        res=>{
            if(res.data.code==200){
             this.$message.success('数据添加成功')
             this.dialogVisible=false
             this.getuserlist()
             this.username='',
             this.inputtwo='',
             this.password='',
             this.inputEmail='',
             this.inputPhone=''
            }else{
                this.$message.error(res.data.message)
            }
            

            }
        ).catch()
        }else{
            const arr ={
            'id':   this.userid,
           "name": this.username, 
           "nickname": this.inputtwo, 
        //    "password": this.password,
           "email":this.inputEmail,
           "phone": this.inputPhone
         }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort +'/user/update',arr).then(
        res=>{
            if(res.data.code==200){
             this.$message.success('编辑成功')
             this.dialogVisible=false
             this.getuserlist()
     
            }else{
                this.$message.error(res.data.message)
            }
            

            }
        ).catch()
        }
 
    },
    serchlist() {
        console.log('serchlist!');
      },
      handleDelete(index,row){
        console.log(row,'/user/delete/user/delete');
        this.$confirm('是否要删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            const arr=row.id
            axios.get('http://' + this.ServeIp + ':' + this.ServePort + '/user/delete?id='+arr).then(res=>{
                if(res.data.code==200){
                    this.$message.success('删除成功')
                    this.getuserlist()
                }
                console.log(this.tableData,'this.tableDatathis.tableDatathis.tableData');
                    }).catch(error=>{
                console.log(error);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      handleEdit(index,row){
        console.log(row,'rowrow');
        this.title='编辑操作'
        this.dialogVisible=true
        this.inputtwo=row.nickname,
        this.inputEmail=row.email,
        this.inputPhone=row.phone,
        this.username=row.name
        this.userid=row.id
        // this.password=row.password
      },
      getuserlist(){
        const arr ={

        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/user/list/' + this.pagesNo + '/' + this.pageSize, arr).then(res=>{
            console.log(this.tableData,'this.tableDatathis.tableDatathis.tableData');
            this.tableData = res.data.data
            this.zongtotal = res.data.lineCount
        }).catch(error=>{
            console.log(error);
        })
      },
      searchgetuserlist(){

if(this.zhanghao==''||this.nicheng==''){
    this.pagesNo=1;
    const arr ={
          'name':this.zhanghao,
          'nickname':this.nicheng
        };
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/user/list/' +  this.pagesNo + '/' + this.pageSize,arr).then(res=>{
      
            this.tableData=[]
            res.data.data.forEach((item,index)=>{
                this.tableData.push(item)
            })
            this.zongtotal = res.data.lineCount
            console.log(this.tableData,'this.tableDatathis.tableDatathis.tableData');
        }).catch(error=>{
            console.log(error);
        })

        console.log(this.pagesNo,'```````````````````````````');

}else{
         const arr ={
          'name':this.zhanghao,
          'nickname':this.nicheng
        }
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/user/list/' + this.pagesNo + '/' + this.pageSize,arr).then(res=>{

            this.tableData=[]
            res.data.data.forEach((item,index)=>{
                this.tableData.push(item)
            })
            this.zongtotal = res.data.lineCount
            console.log(this.tableData,'this.tableDatathis.tableDatathis.tableData');
        }).catch(error=>{
            console.log(error);
        }) 
}
  
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getuserlist()
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagesNo = val
        this.getuserlist()
    }
    },
}
</script>

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
