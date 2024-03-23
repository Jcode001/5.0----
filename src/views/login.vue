<template>
    <div v-title data-title="智慧档案馆管理总平台 " class="container">  
      <div class="bg-img" style="width:100%;height:100%;position:absolute;left:0%;top:0%;background-repeat:no-repeat;background-size:100% 100%;"></div>
      <h1 style="width:26%;color:#ffffff;position:absolute;left:64%;top:17%;text-align:center;font-size: 3.6vh;font-family: Source Han Sans SC;">
        智慧档案馆管理总平台   <div @click="shezhibutton()" style="width:1.5vw;height:1.5vw;top:0.2vw;right:2.2vw;position: absolute;">
          <img style="width:100%;height:100%" src="../assets/setting.png" alt=""></div></h1>
      
        <div
        style="opacity: 0.99;width: 21%;height: 50%;position: absolute;left: 67.5%;top: 25%;border-radius:2px;background-image: linear-gradient(to left bottom,#fff ,#c3e9fc,#c8e6fc);">
        <div style="width: 70%;height: 70%;margin: 15%;font-family: Source Han Sans SC;">
            <div style="width: 100%;height: 15%;line-height:15% ;">
                <div style="width: 33.3%;height: 0.1vh;background-color:#989898;float: left;"></div>
                <div style="width: 33.3%;float: left;text-align: center;font-size: 2vh;">
                    用户登录</div>
                <div style="width: 33.3%;height:  0.1vh;background-color:#989898;float: left;"></div>
            </div>
            <div style="margin-top: 5%;font-size: 2vh;margin-left: 0.5vw;"><span style="padding-right: 0.5vw;"><img
                        src="~@/assets/img/user.png" alt="" style="height: 1.9vh;"></span>用户名<span
                    style="color: red;">*</span></div>
            <div style="margin-top: 5%; height: 12%;">
                <el-input v-model="yhm" autocomplete="off" onkeyup="this.value=this.value.replace(/\s/g,'')" placeholder="请输入用户名"
                ></el-input>
            </div>
            <div style="margin-top: 5%;font-size: 2vh;margin-left: 0.5vw;"><span style="padding-right: 0.5vw;"><img
                        src="~@/assets//img/password.png" alt="" style="height: 1.9vh;"></span>密码<span
                    style="color: red;">*</span></div>
            <div style="margin-top: 5%;height: 12%;">
                <el-input v-model="pwd" autocomplete="off" show-password onkeyup="this.value=this.value.replace(/\s/g,'')" placeholder="请输入密码"
                ></el-input>
            </div>
            <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin"
            style="width: 96%;
            height: 5.5vh;
            background: #1F75FE;
            box-shadow: 0px 5px 17px 0px rgba(31,117,254,0.5);
            text-align: center;
            margin-top: 15%;
            font-size: 1.6vh;color: #ffffff;cursor: pointer;
            border: 0;
            border-radius: 5px; margin-left: 0.3vw;">
                登&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;录</el-button>
        </div>
        <br>
        </div>
        <el-dialog center title="配置" :visible.sync="settingdialogVisible" width="30%">
      
      <div>
       <div style="display:flex;align-items: center;margin-left:3vw"><div>服务IP:</div> <el-input style="width:40%;margin-left:1.2vw" v-model="serip" placeholder="请输入内容"></el-input></div>
       <div style="display:flex;margin-top:1vw;align-items: center;margin-left:3vw"><div>服务端口:</div> <el-input style="width:40%;margin-left:0.5vw" v-model="serport" placeholder="请输入内容"></el-input></div>

      </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="settingsave()">保存</el-button>
                </span>
            </el-dialog>
    </div> 
</template>
<style>
.container {

  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.bg-img {
		position: fixed;
		z-index: -1;
    background-image:url('~@/assets/img/loginone.png');
	}
</style>
<script>

import axios from "axios";
import bus from '@/utils/bus'
import $ from 'jquery'
import { Loading } from 'element-ui';
export default {
  data() {
    return {
      serport:'',
      serip:'',
      settingdialogVisible:false,
      loading:false,
      yhm:"admin",
      pwd:"yd123456"
      // pwd:"yd123456"
    }
  },
  computed: {
        routes() {
            // return this.$router.options.routes
            return this.$route.path;
        },
        // ServeIp() {
        //     return this.$store.state.user.ServeIp
        // },
        // ServePort() {
        //     return this.$store.state.user.ServePort
        // }
  },
  mounted(){
   console.log(sessionStorage.getItem('userInfo'),'22222222222222222222')
    console.log(localStorage.getItem('serport'));
    console.log(localStorage.getItem('serip'));

    this.ServeIp=localStorage.getItem('serip'),
    this.ServePort=localStorage.getItem('serport')
  },
  methods: {
    shezhibutton(){
     this.settingdialogVisible=true
     this.serip=localStorage.getItem('serip'),
     this.serport=localStorage.getItem('serport')
    },
    settingsave(){ 
      if (!this.serip) {
        this.$message.info('ip不能为空');
        return
      }
      if (!this.serport) {
        this.$message.info('端口不能为空');
        return
      }
      localStorage.setItem('serip',this.serip)
      localStorage.setItem('serport',this.serport)
      this.$message.success('保存成功')
      this.settingdialogVisible=false
      this.ServeIp=localStorage.getItem('serip'),
     this.ServePort=localStorage.getItem('serport')
        console.log(this.ServeIp,this.ServePort,'this.ServePortthis.ServePortthis.ServePort')
    },
    handleLogin() {
      console.log('ServeIp',this.ServeIp)
      console.log('ServePort',this.ServePort)
      if (this.ServeIp == '' || this.ServeIp == 'null' || this.ServeIp == null) {
        this.$message.info('请先配置ip和端口');
        return
      }
      if (this.ServePort == '' || this.ServePort == 'null' || this.ServePort == null) {
        this.$message.info('请先配置端口');
        return
      }
      var jsonData = {
          "yhm": this.yhm,
          "pwd": this.pwd,
          // "pwd": this.$md5(this.pwd),
      }
      axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/user/login', jsonData).then(//根据摄像头id获取摄像头信息
        success => {
          console.log(success, '登录接口-成功');
          if (success.data.code == 200) {
            console.log(success.data.data, '登录接口');
            
            this.$store.commit('user/SET_ServeIp',{ServeIp:this.ServeIp,ServePort:this.ServePort})
            sessionStorage.setItem('userInfo',JSON.stringify(success.data.data.user))
            sessionStorage.setItem('userInfoAll',JSON.stringify(success.data.data))
            // document.cookie = "username=" + success.data.data.user.name
            this.$router.push({ path: '/welcome' });
            this.loading=false;
          }else
          {
            this.$message.error(success.data.message);
          }
        },
        error => {
          console.log(error, '登录接口--返回失败的数据');
        })
    }
  }
};
</script>