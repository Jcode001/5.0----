<template>
  <div v-title data-title="智慧档案馆管理总平台 " class="container">
    <el-container style="height: 100vh;width: 100%; border: 1px solid #eee">
      <el-header class="myel-header" style="text-align: left; font-size: 12px;background-color: transparent;">
        <el-row>
          <el-col :span="2">
            <!-- <img  style="height: 40px;margin: 10px;" alt="公司LOGO" src="~@/assets/logo.png"> -->
          </el-col>
          <el-col :span="17">
            <span style="width:80%;text-align: left; line-height: 60px;font-size:28px;">智慧档案馆管理总平台</span>
          </el-col>
          <el-col :span="5">
            <span
              style="width:15%;text-align: left; line-height: 60px;font-size:18px;float: left;position:relative;left:10rem;">您好！</span>
            <el-dropdown class="avatar-container" trigger="click"
              style="width:20%;float: left;position:relative;left:10rem;">
              <div class="avatar-wrapper">
                <div style="width:10vw;text-align: left; line-height: 60px;font-size:18px;color: white;">
                  {{ user.name }}<i class="el-icon-caret-bottom" /></div>
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
                <!-- <el-dropdown-item divided @click.native="download" @click="download()">
                  <span style="display:block;">下载安装包</span>
                </el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
            <div style="margin-top: 7px;float: left;position:relative;left:-2rem;">
              <img v-show="isShowBack" src="~@/assets/btnMGoBack.png" style="width:1.2vw;margin-right:1vw;" alt=""
                @click="GoHome()">
              <img src="~@/assets/btnMSX.png" style="width:1.2vw;margin-right:1vw;" alt="" @click="toFullOrExit()">
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container style="     padding-left: 3vw;   margin: auto;
    width: 75vw;;  height: calc(100vh - 120px);">
        <el-main style="
   height: 66vh;margin:auto;">
          <div class="imgs" style="margin-top:0vw;">
            <img src="~@/assets/menu/btn_hjjk.png" alt="" @click="huanJingJianKong()">
            <img src="~@/assets/menu/btn_dagl.png" alt="" @click="danganguanli()">
            <img src="~@/assets/menu/btn_mjjkz.png" alt="" @click="DenseFrameControl()">
            <img src="~@/assets/menu/btn_spjk.png" alt="" @click="shiPinJiankong()">
          </div>
          <div class="imgs">
            <img src="~@/assets/menu/btn_bfgz.png" @click="baFangGanZhi()">
            <img src="~@/assets/menu/btn_znmj.png" @click="zhiNengMenJin()">
            <img src="~@/assets/menu/btn_zndg.png" @click="zhiNengDengGuang()">
            <img src="~@/assets/menu/btn_dsjpt.png" @click="kuFangDaoHang()">
          </div>
        </el-main>
      </el-container>
      <!-- <el-footer class="myel-footer" style="background-color: transparent;">
          版权所有：河北因朵科技有限公司   服务热线：4008313008
        </el-footer> -->
    </el-container>
      <el-dialog
        title="灯光设置"
        :visible.sync="isDengguang"
        width="30%">
          <dengguangSet @closeDgSet="closeDgSet" />
      </el-dialog>
    
  </div>
</template>

<script>
import dengguangSet from "@/layout/components/dengguangSet.vue"  //设置灯光 新旧版本
import axios from 'axios'
export default {
  components: { dengguangSet },
  data() {
    return {
      isShowBack: false,
      isDengguang: false,
      user: {}
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  methods: {
    closeDgSet() {
      this.isDengguang = false
    },
    download() {
      var fileName = 'PDC.apk';
      console.log(fileName, 'fileNamefileName');
      const fileUrl = '/' + fileName; // 文件的URL地址
      console.log(fileUrl, 'fileUrl');
      axios.get(fileUrl, { responseType: 'blob' })
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
    huanJingJianKong() {//环境监控
      this.$router.push({ path: this.redirect || '/hjjk' })
    },
    danganguanli() {//档案管理

      // let encryptionPassword=this.$md5('888')

      // window.location.href = `http://222.222.123.72:18081/sso?loginCode=gly&password=${encryptionPassword}`;
   
      this.$router.push({ path: this.redirect || '/dagl' })
    },
    DenseFrameControl() {//密集架控制
      this.$router.push({ path: this.redirect || '/mjjkz' })
    },
    shiPinJiankong() {//视频监控
      this.$router.push({ path: this.redirect || '/spjk' })
    },
    baFangGanZhi() {//十防感知
      this.$router.push({ path: this.redirect || '/sfgz' })
    },
    zhiNengMenJin() {//智能门禁
      this.$router.push({ path: this.redirect || '/znmj' })
    },
    zhiNengDengGuang() {//智能灯光
      let _ServeIp=localStorage.getItem('serip')
      let _ServePort=localStorage.getItem('serport')
      axios.get('http://' + _ServeIp + ':' + _ServePort + '/custom/get?key=moduleType').then(res => {
        console.log(res,'获取灯光模块');
        if (res.data.data.content == '1') {
          this.$router.push({ path: this.redirect || '/zndgNew' })
        } else {
          this.$router.push({ path: this.redirect || '/zndg' })
        }
      }).catch(error=>{
        console.log(error,'error');
      })
    },
    kuFangDaoHang() {//库房导航
      // this.$router.push({ path: this.redirect || '/dsj3' })
      location.href="http://172.16.17.15:6611"
  
    },
    logout() {
      //location.reload();
      this.$router.push({ path: this.redirect || '/' })
      sessionStorage.clear()
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
    setting() {
      this.$router.push({ path: this.redirect || '/storeedit' })
      setTimeout(() => {
        this.$router.go(0)
      }, 100)
    },
  },
  computed: {
  },
};
</script>
<style  lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  /*50 = navbar  */
  /* 设置显示主体内容窗口的高度 */
  background: url('~@/assets/welcom_bg.png') 100% 100%;
  min-height: calc(100vh - 7vh);
}

.myel-header {
  color: #ffffff;
  line-height: 60px;
}

.myel-footer {
  color: #ffffff;
  line-height: 60px;
  text-align: center;
  z-index: 0;
}

.imgs {
  margin-left: .1vw;
}

.imgs img {
  margin-top: 1vw;
  margin-right: 3vw;
  width: 14vw;
  /* height: 33vh; */
}

.imgs img:active {
  transform: scale(0.95, 0.95);
  /*增加图片点击动画*/
}
</style>