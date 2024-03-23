<template>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-header style="text-align: left; font-size: 12px;background-color: white;">
    <el-breadcrumb separator-class="el-icon-arrow-right"
    style="display: inline-block;
    font-size: 1rem;
    text-decoration: none;
    color: #000000;
    border-bottom: 0.125rem solid #258AD9;
    "
    >
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>库房管理</el-breadcrumb-item>
        <el-breadcrumb-item>视频监控</el-breadcrumb-item>
    </el-breadcrumb></el-header>
    <el-container style="height: calc(100vh - 120px);">
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <!-- <el-header style="text-align: left; font-size: 12px;background-color: white;color: black;">
            <span>档案分类</span>
        </el-header> -->
        <el-header style="text-align: left; border-radius:12px 12px 0 0;">
            <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png"/>
            <span style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:22px;line-height: 100%;padding-left: 10px;">摄像头列表</span>
        </el-header>
        <el-main class="leftmenu" style="background-color: white;color: black;">
          <el-scrollbar style="margin-top:1.2vw;" wrap-class="scrollbar-wrapper">
            <el-tree
            style="font-size:22px;height: 100vh;overflow: hidden;" 
            :data="SPJKList" :props="defaultProps" highlight-current @node-click="SPJKhandleNodeClick"></el-tree>
          </el-scrollbar>
      </el-main>  
   
    </el-aside>
    
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>
<style>
.el-header {
    /* background-color: #B3C0D1; */
    /* color: #333; */
    line-height: 60px;
}
.el-tree-node__label{
  font-size:22px;
}

</style>
  
<script>
import Logo from '@/layout/components/Sidebar/Logo.vue';
import { mapGetters } from 'vuex'
import axios from 'axios'
import bus from '@/utils/bus'
export default {
    data() {
    // const item = {
    //     date: '2016-05-02',
    //     name: '王小虎',
    //     address: '上海市普陀区金沙江路 1518 弄'
    // };
    return {
        SPJKList: [
          {
            label: '数据加载中。。。',
            children: []
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentRow: null
    }
    },
    computed: {
      ServeIp() {
        console.log(this.$store,"1231231231321");
        return this.$store.state.user.ServeIp
      },
      ServePort() {
        return this.$store.state.user.ServePort
      }
    },
    mounted() {
      console.log(this.$route.path, '侧边栏页面查看当前路由');
      this.initebVideoCtrlWebVideoCtrlShow();
    },
    methods:{
        initebVideoCtrlWebVideoCtrlShow() {
          axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetCamerasForLeftMenuAsc', JSON.parse('{}')).then(
          success => {
            console.log(success, '获取库房信息-成功');
            this.SPJKList = [];
            this.SPJKList = success.data.data;
          },
          error => {
            console.log(error, '获取库房信息--返回失败的数据');
          })
        },
        SPJKhandleNodeClick(data) {//
          console.log(data, 'data');
          if (data.children == undefined) {
            bus.$emit("videoSurveillance", data.id, data.label);
          }
        },
    }
};
</script>
<!-- style="border-radius: 4px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" -->