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
            <el-breadcrumb-item :to="{ path: '/toArchiveHome' }">档案管理</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
           <div class="col-10 contentRight" style="height:100%;width:85%">
                <div style="height:100%">
                    <!-- 个人中心 -->
                    <div class="RightHeaderindex">
                        <!-- 个人中心左侧 -->
                        <div class="headerindexone">
                            <div class="headerimglist" id="heraderImgFile">
                                <img src="https://img1.baidu.com/it/u=1960110688,1786190632&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686762000&t=69ed7daebe41ded740e5bb3d65e14090"
                                    class="img-thumbnail" id="teroneimg">
                            </div>
                            <div class="headerusername">
                                <div class="iconfont icon-tongxunlu">用户名称:</div>
                                <div id="username">{{ userInfo.name }}</div>
                            </div>
                            <div class="headerusername">
                                <div class="iconfont icon-dianhua">手机号码:</div>
                                <div id="phoneNumber">{{ userInfo.phone ? userInfo.phone : '暂无' }}</div>
                            </div>
                            <div class="headerusername">
                                <div class="iconfont icon-youxiang">用户邮箱:</div>
                                <div id="emaillist">{{ userInfo.email ? userInfo.email : '暂无' }}</div>
                            </div>
                            <!-- <div class="headerusername">
                                <div class="iconfont icon-jiaose">所属角色:</div>
                                <div id="rolename">{{ userInfo.email ? userInfo.email : '' }}</div>
                            </div> -->
                            <!-- <div class="headerusername">
                                <div class="iconfont icon-riqi">创建日期:</div>
                                <div id="Creationdate">{{ userInfo.createtime ? userInfo.createtime.split('.')[0].replace('T', ' ') : '' }}</div>
                            </div> -->
                        </div>
                        <!-- 个人中心右侧 -->
                        <div class="headerindextow">
                            <div class="tab-container">
                                <ul class="tab-nav">
                                    <li id="tabone" @click="tabNavClick(1)" :class="tabNavIndex == '1' ? 'active' : ''">基本资料</li>
                                    <li id="tabtwo" @click="tabNavClick(2)" :class="tabNavIndex == '2' ? 'active' : ''">修改密码</li>
                                    <li id="tabthree" @click="tabNavClick(3)" :class="tabNavIndex == '3' ? 'active' : ''">LOGO设置</li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-panel" :class="tabNavIndex == '1' ? 'active' : ''" style="margin-top: 50px;">

                                        <div class="demo-input-suffix">
                                            <span style="color: red;">*</span>
                                            <label for="Username" class="form-label">用户名称:</label>
                                            <el-input type="email" v-model="formData.name" class="form-control" id="Username"
                                                    placeholder="请输入"></el-input>
                                        </div>
                                        <div class="demo-input-suffix">
                                            <span style="color: red;">*</span>
                                            <label for="Mobilephonepassword" class="form-label">手机号码:</label>
                                            <el-input type="tel" class="form-control" v-model="formData.phone" id="Mobilephonepassword"
                                                    placeholder="请输入"></el-input>
                                        </div>
                                        <div class="demo-input-suffix">
                                            <span style="color: red;">*</span>
                                            <label for="mailbox" class="form-label">邮箱:</label>
                                            <el-input type="email" v-model="formData.email" class="form-control" id="mailbox" placeholder="请输入"></el-input>
                                        </div>
                                        <div class="demo-input-suffix">
                                            <label for="sex" class="form-label">性别:</label>
                                            <el-select class="form-select" id="sex"
                                                    aria-label="Default select example" v-model="formData.sex">
                                                    <el-option value="男">男</el-option>
                                                    <el-option value="女">女</el-option>
                                                </el-select>
                                        </div>

                                        <!-- <div style="display: flex; margin-top:20px;margin-bottom: 20px;">
                                            <div class="mb-1">
                                                <span style="color: red;">*</span>
                                                <label for="Username" class="form-label">用户名称:</label>
                                                <el-input type="email" class="form-control" id="Username"
                                                    placeholder="请输入"></el-input>
                                            </div>
                                            <div class="mb-1" style="margin-left: 17vw;">
                                                <span style="color: red;">*</span>
                                                <label for="Mobilephonepassword" class="form-label">手机号码:</label>
                                                <el-input type="tel" class="form-control" id="Mobilephonepassword"
                                                    placeholder="请输入"></el-input>
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="mb-1">
                                                <span style="color: red;">*</span>
                                                <label for="mailbox" class="form-label">邮箱:</label>
                                                <el-input type="email" class="form-control" id="mailbox" placeholder="请输入"></el-input>
                                            </div>
                                            <div class="mb-1" style="margin-left: 17vw;">
                                                <label for="sex" class="form-label">性别:</label>
                                                <el-select class="form-select" id="sex"
                                                    aria-label="Default select example">
                                                    <el-option value="1" selected>男</el-option>
                                                    <el-option value="0">女</el-option>
                                                </el-select>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="tab-panel" :class="tabNavIndex == '2' ? 'active' : ''" style="margin-top: 50px;">
                                        <div class="mb-3">
                                            <span style="color: red;">*</span>
                                            <label for="oldpassword" class="form-label">旧密码:</label>
                                            <el-input type="password" style="width: 100%;" class="form-control"
                                                id="oldpassword" placeholder="请输入旧密码" v-model="formData.oldPassword"></el-input>
                                            <div style="display: inline" id="tip1"></div>
                                        </div>
                                        <div class="mb-3">
                                            <span style="color: red;">*</span>
                                            <label for="passwordone" class="form-label">新密码:</label>
                                            <el-input type="password" style="width: 100%;" class="form-control"
                                                id="passwordone" placeholder="新密码为字母加数字的组合以及长度在6到18位数之间" v-model="formData.newPassword"></el-input>
                                            <div style="display: inline" id="tip2"></div>
                                        </div>
                                        <div class="mb-3">
                                            <span style="color: red;">*</span>
                                            <label for="passwordtow" class="form-label">确认新密码:</label>
                                            <el-input type="password" style="width: 100%;" class="form-control"
                                                id="passwordtow" placeholder="新密码为字母加数字的组合以及长度在6到18位数之间" v-model="formData.newPwd1"></el-input>
                                            <div style="display: inline" id="tip3"></div>
                                        </div>
                                    </div>
                                    <div class="tab-panel" :class="tabNavIndex == '3' ? 'active' : ''" style="margin-top: 50px;">
                                        <div class="mb-3">
                                            <label for="Systemname" class="form-label">系统名称:</label>
                                            <el-input type="email" style="width: 100%;" class="form-control"
                                                id="Systemname" placeholder="请输入" v-model="formData.content"></el-input>
                                        </div>
                                    </div>
                                    <div class="tab-headerbutton" style="margin-top:100px;text-align: center;">

                                        <el-button style="width:300px;margin-right: 10px;" type="primary"
                                            class="btn btn-outline-primary" @click="personagesave()">保存</el-button>

                                        <!-- <el-button style="width:100px; margin-right: 10px;" type="button"
                                            class="btn btn-outline-primary" @click="Jumptohomepage()">关闭</el-button> -->
                                    </div>
                                </div>
                            </div>
                        </div>
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


<style>
.tree {
    margin: 0 auto;
}
html::-webkit-scrollbar {display:none}

.addFile p {
    font-size: 1.1rem;
    margin-left: 5.3rem;
    color: #FFFFFF80;

}

.addFile .current {
    color: white;
    padding-top: 0.2rem;
}

.RightHeaderindex{
    height: 90%;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}

.headerindexone{
    width: 25%;
    height: 90%;
    background: #F5F5F5;
    position: relative;
}

.headerimglist{
    height: 35%;
}

.headerimglist img{
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    position: absolute;
    left: 33%;
    top: 9%;
}

.headerusername{
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid #DDDDDD;
    font-size: 0.7vw;
}


.headerindextow{
    width: 69%;
    height: 90%;
    margin-left: 20px;
}

.tab-nav {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }
  .tab-nav li {
    width: 100%;
    height: 2.5vw;
    line-height: 2.7vw;
    text-align: center;
    cursor: pointer;
    color: #323232;
    background: #F5F5F5;
    font-weight: 800;
}
  .tab-nav li.active {
    background: #498DFB;
    color: #ffffff;
  }
  .tab-panel {
    display: none;
  }
  .tab-panel.active {
    display: block;
  }
  .tab-panel.active .demo-input-suffix,.tab-panel.active .mb-3{
    margin-bottom:30px;
  }

  .form-control{
      /* width: 200%; */
  }

  .form-select{
      /* width: 620%; */
      width:100%;
  }
.headerbutton button{
    margin-right: 20px;
}



.contentRight>div>div:nth-child(2){
    background-color: #fff;
    height: 90%;
    border-radius: 0.8rem;
}


    
</style>
<script>
import axios from "axios";
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

            multipleSelection: [],

            tabNavIndex:'1',
            formData: {
                name:'',
                phone:'',
                email:'',
                sex:''
            },
            userInfo:JSON.parse(sessionStorage.getItem('userInfo'))

        }
    },
    mounted() {
        this.formData.name = this.userInfo.name
        this.formData.phone = this.userInfo.phone
        this.formData.email = this.userInfo.email
        this.formData.sex = this.userInfo.sex
        
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
        serchlist() {
            console.log('serchlist!');
        },

        //基本资料 修改密码 logo设置切换
        tabNavClick (index) {
            this.tabNavIndex = index
            if (this.tabNavIndex == '1') {
                this.formData = {
                    name:this.userInfo.username,
                    phone:this.userInfo.phonenumber,
                    email:this.userInfo.email,
                    roleId:this.userInfo.sex
                }
            } else if (this.tabNavIndex == '2') {
                this.formData = {
                    oldPassword:'',
                    newPassword:'',
                    newPwd1:''
                }
            } else if (this.tabNavIndex == '3') {
                this.getContent()
                this.formData = {
                    content:''
                }
            }
        },
        //保存
        personagesave () {
            console.log('form',this.formData)
            this.getPersonagesave(this.formData)
        },
        //保存接口
        getPersonagesave (tempdata) {
            let _url = '/user/update'
            if (this.tabNavIndex == '1') {
                tempdata.id = this.userInfo.id
                var reg = /^1[3456789]\d{9}$/;
                var regEmail = /^([a-zA-Z0-9_]-*\.*)+@([a-zA-Z0-9_]-?)+(\.[a-zA-Z]{2,3}){1,2}$/
                if (tempdata.name == '') {
                    this.$message.info('请输入用户名称')
                    return
                }
                if (tempdata.phone == '') {
                    this.$message.info('请输入手机号码')
                    return
                } else if (!reg.test(tempdata.phone)) {
                    this.$message.info('手机号码不正确')
                    return
                }
                if (tempdata.email == '') {
                    this.$message.info('请输入邮箱')
                    return
                } else if (!regEmail.test(tempdata.email)) {
                    this.$message.info('邮箱格式不正确')
                    return
                }
            } else if (this.tabNavIndex == '2') {
                _url = '/user/changePassword'
                
                if (tempdata.oldPwd == '') {
                    this.$message.info('请输入旧密码')
                    return
                }
                if (tempdata.newPassword == '') {
                    this.$message.info('请输入新密码')
                    return
                }
                var regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
                let _pwd = regex.test(tempdata.newPassword)
                console.log('_pwd',_pwd)
                if (!_pwd || tempdata.newPassword.length < 6 || tempdata.newPassword.length > 18) {
                    this.$message.info('新密码为字母加数字的组合以及长度在6到18位数之间')
                    return
                }
                if (tempdata.newPassword !== tempdata.newPwd1) {
                    this.$message.info('两次新密码输入不一致')
                    return
                }
                
                if (tempdata.oldPassword !== this.userInfo.password) {
                    this.$message.info('旧密码输入错误')
                    return
                }
                let _oldPassword = tempdata.oldPassword
                let _newPassword = tempdata.newPassword
                tempdata = {}
                tempdata.oldPassword = _oldPassword
                tempdata.id = this.userInfo.id
                tempdata.newPassword = _newPassword
            } else if (this.tabNavIndex == '3') {
                _url = '/custom/add'
                tempdata.name = 'pageTitle'
            } 

            axios.post('http://' + this.ServeIp + ":" + this.ServePort + _url,tempdata).then(
                success => {
                    console.log(success, '获取库房列表接口-成功');
                    
                    if(success.data.code==200){
                        if (this.tabNavIndex == '1') {
                            this.$message.success('保存成功')
                            this.userInfo.name = tempdata.name
                            this.userInfo.phone = tempdata.phone
                            this.userInfo.email = tempdata.email
                            this.userInfo.sex = tempdata.sex
                            sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo))
                        } else if (this.tabNavIndex == '2') {
                            // this.userInfo.password = tempdata.newPassword
                            // sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo))
                            this.$message.success('密码修改成功，即将跳转到登陆页面')
                            setTimeout(() => {
                                this.logout()
                            }, 1500);
                            
                        }
                        
                    }else{
                        this.$message.error(success.data.message)
                    }
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })
        },
        logout(){
            location.href="/";
            // setTimeout(() => {
            //   this.$router.go(0)
            // }, 100)
        },
        getContent () {
            axios.get('http://' + this.ServeIp + ":" + this.ServePort + "/custom/get?key=pageTitle").then(
                success => {
                    console.log(success, '获取库房列表接口-成功11111');
                    
                    if(success.data.code==200){
                        this.formData.content = success.data.data.content
                    }else{
                        this.$message.error(success.data.message)
                    }
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })
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