<template>
     <div class="container">
      <el-container style="height: 100vh;width: 100%; border: 1px solid #eee">
        <el-header style="text-align: left; font-size: 12px">
          <el-row>
                  <el-col :span="2" >
                    <!-- <img  style="height: 40px;margin: 10px;" alt="公司LOGO" src="~@/assets/logo.png"> -->
                    <i class="el-icon-s-unfold" @click="buttonclick()" style="color: white;font-size:25px;line-height: 80px; position: absolute;"></i>
                  </el-col>
                  <el-col :span="17" >
                    <span style="margin-left:2vw;width:80%;text-align: left; line-height: 60px;font-size:28px;">智慧档案馆管理平台</span>
                  </el-col>
                  
                  <el-col :span="5">
                    <span style="width:15%;text-align: left; line-height: 60px;font-size:18px;float: left;position:relative;left:10rem;">您好！</span>
                      <el-dropdown class="avatar-container" trigger="click" style="width:20%;float: left;position:relative;left:10rem;">
                        <div class="avatar-wrapper">
                          <div style="width:10vw;text-align: left; line-height: 60px;font-size:18px;color: white;">{{ user.name }}<i class="el-icon-caret-bottom" /></div>
                        </div>
                        <el-dropdown-menu slot="dropdown" class="user-dropdown" style="top:45px;">
                          <router-link to="/user/userzhong">
                            <el-dropdown-item>
                              个人中心
                            </el-dropdown-item>
                          </router-link>
                          <!-- <a target="_blank" href="#">
                            <el-dropdown-item>版本升级</el-dropdown-item>
                          </a>
                          <a target="_blank" href="#">
                            <el-dropdown-item>账户注销</el-dropdown-item>
                          </a> -->
                          <el-dropdown-item>
                            <span style="display:block;" @click="isDengguang = true">灯光设置</span>
                          </el-dropdown-item>
                          <el-dropdown-item divided @click.native="logout" @click="logout()">
                            <span style="display:block;">退出登录</span>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <div style="width: 6vw;margin-top: 7px;position: absolute;right: 6.5rem;">
                        <img v-show="isShowBack" src="~@/assets/btnMGoBack.png" style="width:1.2vw;margin-right:1vw;" alt=""
                        @click="GoHome()">
                        <img src="~@/assets/btnMSX.png" style="width:1.2vw;margin-right:1vw;" alt="" @click="toFullOrExit()">
                      </div>
                  </el-col>
          </el-row>
        </el-header>
        <el-container style="height: calc(100vh - 120px);">
          <el-main style="background-color:aliceblue;">
              <div style="float: left;height: 100%; width: 60px;">
                <el-menu
                  style="height: 50%;"
                 class="el-menu-vertical-demo"  :collapse="isCollapse"
                  :default-active="this.$route.path"
                  @select="handleSelect"
                >
                  <el-submenu index="0">
                    <template slot="title">
                      <i class="el-icon-s-promotion"></i>
                      <span slot="title">快速导航</span>
                    </template>
                      <el-menu-item index="/welcome">
                        <i class="el-icon-house"></i>
                        首页</el-menu-item>
                  </el-submenu>
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-folder-opened"></i>
                      <span slot="title">档案管理</span>
                    </template>
                      <el-menu-item index="/dagl">
                        <i class="el-icon-document"></i>
                        档案信息</el-menu-item>
                        <el-menu-item index="/mobanset">
                        <i class="el-icon-setting"></i>
                        模板设置</el-menu-item>
                        <el-menu-item index="/mobansettwo">
                        <i class="el-icon-setting"></i>
                        箱式档案</el-menu-item>
                      <el-menu-item index="/recycle">
                        <el-badge :value="newvaluelaji" class="item">
                          <i class="el-icon-delete"></i>
                           回收站
                        </el-badge>
                        </el-menu-item>
                  </el-submenu>
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="el-icon-office-building"></i>
                      <span slot="title">库房管理</span>
                    </template>
                      <el-menu-item index="/hjjk">环境监控</el-menu-item>
                      <el-menu-item index="/mjjkz">密集架控制</el-menu-item>
                      <el-menu-item index='/spjk'>视频监控</el-menu-item>
                      <el-menu-item index='/sfgz'>十二防感知</el-menu-item>
                      <el-menu-item index='/znmj'>智能门禁</el-menu-item>
                      <el-menu-item index="/zndg">智能灯光</el-menu-item>
                      <el-menu-item index="/dsj">大数据</el-menu-item>
                      <!-- <el-menu-item index="/kfdh">库房导航</el-menu-item> -->
                  </el-submenu>
                  <!-- <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-data-analysis"></i>
                      <span slot="title">大数据</span>
                    </template>
                      
                  </el-submenu> -->
                  <el-submenu index="4">
                    <template slot="title">
                      <i class="el-icon-monitor"></i>
                      <span slot="title">系统日志</span>
                    </template>
                      <el-menu-item index="/systemLog/userLog">用户操作日志</el-menu-item>
                      <el-menu-item index="/systemLog/systemLog">系统错误日志</el-menu-item>
                      <!-- <el-menu-item index="/systemLog/archiveAmendLog">档案修改日志</el-menu-item> -->
                      <!-- <el-menu-item index="/user/jiankong">监控报警记录</el-menu-item> -->
                  </el-submenu>
                  <el-submenu index="5">
                    <template slot="title">
                      <i class="el-icon-set-up"></i>
                      <span slot="title">权限管理</span>
                    </template>
                      <!-- <el-menu-item index="/role/toRole">角色管理</el-menu-item> -->
                      <el-menu-item index="/user/toUser">用户管理</el-menu-item>
                  </el-submenu>
                  <el-submenu index="6">
                    <template slot="title">
                      <i class="el-icon-setting"></i>
                      <span slot="title">系统设置</span>
                    </template>
                    <el-menu-item index="/storeedit">库房管理</el-menu-item>
                    <el-menu-item index="/config_wr">设备中心</el-menu-item>
                    <!-- <el-menu-item index="/userConfig/toUserConfig">通知配置</el-menu-item> -->
                  </el-submenu>
                  <el-submenu index="7">
                    <template slot="title">
                      <i class="el-icon-user"></i>
                      <span slot="title">个人中心</span>
                    </template>
                      <el-menu-item index="/user/userzhong">个人中心</el-menu-item>
                      <!-- <el-menu-item index="/user/memessage">我的消息</el-menu-item> -->
                  </el-submenu>
                </el-menu>
            
              </div>
              <div :style="isCollapse ? 'width:calc(100% - 70px);' : 'width:calc(100% - 205px);'" style="float: right;height:calc(100% - 6px);border-radius: 15px;overflow: hidden;background-color: white;">
                <router-view/>
              </div>
          </el-main>
        </el-container>
        <el-footer>
          <!-- 版权所有：河北因朵科技有限公司   服务热线：4008313008 -->
        </el-footer>
      </el-container>


     
      <el-dialog
        title="灯光设置"
        :visible.sync="isDengguang"
        width="30%">
          <dengguangSet @closeDgSet="closeDgSet" />
      </el-dialog>
     </div>
</template>
<style>
  .container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  /* 隐藏滚动条 */
::-webkit-scrollbar {
  /* display: none; */
}

/* 确保内容可以滚动 */
::-webkit-scrollbar-track {
  display: none;
}

/* 确保滚动条轨道可见 */
::-webkit-scrollbar-thumb {
  background: transparent;
}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    
    overflow-y: scroll;
      width: 200px;
      min-height: calc(100% - 0px);
  }
  .el-header {
    background-color: rgba(0, 73, 167, 1);
    color: #ffffff;
    line-height: 60px;
  }
  .el-main {
    width: 100%;
    /* height: calc(100vh - 60px); */
    /* background-color: #03050C; */
    /* overflow: hidden; */
    margin: 0;
    padding: 0;
  }
  .el-menu{
    background-color: rgba(0, 73, 167, 1);
    color: #ffffff;
    min-height: calc(100% - 0px);
    z-index: 99;
  }

  .el-menu-item{
    background-color:rgba(0, 73, 167, 1);
    color: #ffffff;
  }
  .el-submenu__title:hover{
    background-color: rgba(53, 91, 196, 1);
    color: #ffffff;
  }
  .el-menu-item:hover{
    background-color: rgba(53, 91, 196, 1);
    color: #ffffff;
  } 
  .el-footer {
    background-color: rgba(0, 73, 167, 1);
    color: #ffffff;
    line-height: 60px;
    text-align: center;
    z-index: 0;
  }
  i{
    color: #ffffff;
  }
  .el-submenu__title{
    background-color:rgba(0, 73, 167, 1);
    color: #ffffff;
  }
  .el-submenu__title i {
    color: #ffffff;
  }
  .el-dialog__header{
    background-color:rgba(0, 73, 167, 1);
  }
  .el-dialog__title{
    color: #ffffff;
  }
</style>
<script>
import dengguangSet from "@/layout/components/dengguangSet.vue" //设置灯光 新旧版本
import axios from "axios";
import { Loading } from 'element-ui';
export default {
  components: { dengguangSet },
  data() {
      return {
        newvaluelaji:0,
        isCollapse: true,
        isShowBack:true,
        isDengguang: false,
        user:{}
      };
    },
    mounted() {
      this.ServeIp=localStorage.getItem('serip'),
     this.ServePort=localStorage.getItem('serport')
      this.user = JSON.parse(sessionStorage.getItem('userInfo'))
     setInterval(()=>{
     if(localStorage.getItem('newvaluelaji')!=null)
 this.newvaluelaji=localStorage.getItem('newvaluelaji')
},4000)

setTimeout(()=>{
  this.lajicount()
},2000)




      let loadingInstance = Loading.service({ 
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 73, 167, 0.2)',
          fullscreen: false 
        });
      // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      //   loadingInstance.close();
      // });
     setTimeout(() => {
        loadingInstance.close();
        console.log( "加载完成！");
        }, 1000)
    },
    methods: {
    closeDgSet() {
      this.isDengguang = false
    },
   lajicount(){
          
     const arr={}
     axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetDARecycleCount', arr).then(//根据摄像头id获取摄像头信息
       success => {
        //  console.log(success, '垃圾总数量-成功');
         this.newvaluelaji=success.data.data
       },
       error => {
        //  console.log(error, '垃圾总数量-返回失败的数据');
       })


   },
      
      GoHome() {
        this.$router.go(-1)
        // setTimeout(() => {
        //     this.$router.go(0)
        //   }, 200)
      },
      buttonclick(){
        this.isCollapse=!this.isCollapse;
      },
      requestFullScreen() {//全屏
        let de = document.documentElement
        if (de.requestFullscreen) {
          de.requestFullscreen()
        } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen()
        } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen()
        }
      },
      exitFullscreen() {//退出全屏
        let de = document
        if (de.exitFullscreen) {
          de.exitFullscreen()
        } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen()
        } else if (de.webkitCancelFullScreen) {
          de.webkitCancelFullScreen()
        }
      },
      toFullOrExit() {//全屏/退出全屏
        this.isFull = !this.isFull
        if (this.isFull) {
          this.requestFullScreen()
        } else {
          this.exitFullscreen()
        }
      },
      logout(){
        // document.cookie = 'username=;'
          location.href="/";
          // setTimeout(() => {
          //   this.$router.go(0)
          // }, 100)
          sessionStorage.clear()

      },
      handleSelect(url,url_arr){
        console.log('url', url)
        if (url == '/zndg') {
          axios.get('http://' + this.ServeIp + ':' + this.ServePort + '/custom/get?key=moduleType').then(res => {
            console.log(res,'获取灯光模块');
            if (res.data.data.content == '1') {
              this.$router.push('/zndgNew')
            } else {
              this.$router.push(url);
            }
          }).catch(error=>{
            console.log(error,'error');
          })
        } else {
          this.$router.push(url);
        }
        // setTimeout(() => {
        //   this.$router.go(0)
        // }, 500)
      }
  },
  computed: {
    },
};
</script>