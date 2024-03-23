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
        <!-- <el-breadcrumb-item>库房管理</el-breadcrumb-item> -->
        <el-breadcrumb-item>密集架控制</el-breadcrumb-item>
    </el-breadcrumb></el-header>
    <el-container style="height: calc(100vh - 120px);">
    <el-aside width="10vw" style="background-color: rgb(238, 241, 246)">
        <!-- <el-header style="text-align: left; font-size: 12px;background-color: white;color: black;">
            <span>档案分类</span>
        </el-header> -->
        <el-header style="text-align: left; border-radius:12px 12px 0 0;">
            <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png"/>
            <span style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:1vw;line-height: 100%;padding-left: 10px;">密集架列表</span>
        </el-header>
        <el-main  style="height: 37.2vw;border:1px solid rgb(103, 146, 240);" class="mjjclass">
          <!-- <el-scrollbar style=" width: 9.9vw;height: 100%;border-bottom: 1px solid  #6792f0;margin-top:1.2vw;border-right: 1px solid  #6792f0;" wrap-class="scrollbar-wrapper"> -->

              <!-- <el-tree
            style="font-size:14px;height: 71.7vh;overflow-y: scroll;color:#000000" 
            :data="MJJList" :props="defaultProps" highlight-current @node-click="MJJhandleNodeClick"></el-tree> -->
          
            <el-menu
                :default-active="activeIndex"
           
                >
                <template v-for="(item) in MJJList">
                    <el-submenu v-if="item.children" :key="item.id" :index="(item.id+1).toString()">
                    <template slot="title">
                        <i class="el-icon-office-building"></i>
                        <el-tooltip placement="top">
                        <div slot="content"> {{ item.label }}</div>
                       <span >{{ item.label }}  </span>
                     </el-tooltip>
                    </template>
                    <el-menu-item
                        v-for="(items, key) in item.children"
                        :key="key"
                        @click="MJJhandleNodeClick(items)"
                    >
                         <i class="el-icon-monitor"></i>
                         <el-tooltip placement="top">
                        <div slot="content"> {{ items.label }}</div>
                       <span >{{ items.label }}  </span>
                     </el-tooltip>
                    </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :key="item.id">
                        <i class="el-icon-office-building"></i>
                        <el-tooltip placement="top">
                        <div slot="content"> {{ item.label }}</div>
                       <span >{{ item.label }}  </span>
                     </el-tooltip>
                    </el-menu-item>
                </template>
            </el-menu>
          <!-- </el-scrollbar> -->
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
<style lang="less"  scoped>
 
   
       .el-submenu{
        width:100%;
    }
  /deep/.el-submenu__title{
    background: #fff;
    color: black !important;
        padding:0;
        padding:0 10px !important;
        height:30px;
        line-height: 30px;
        i{
          color: black !important;
        }
     }
    /deep/.mjjclass .el-menu-item{
      min-width: 0px !important;
    background-color: white !important;
    color: black  !important;
     }
     /deep/.mjjclass .el-menu{
      height: 100% !important;
      background-color: white !important;
     color: black !important;
 }
     /deep/.mjjclass .el-submenu__title:hover{
    background-color: white !important;
    color: black !important;
  }

     .el-menu--inline{
        .el-menu-item{
          padding:0 25px !important;
        }
     }
     li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
        MJJList: [
          {
            label: '数据加载中。。。',
            children: []
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentRow: null,
        activeIndex:"0"
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
      setTimeout(()=>{this.initebVideoCtrlWebVideoCtrlShow()},500)  
    },
    methods:{
        handleClick(row) {
            console.log(row);
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        initebVideoCtrlWebVideoCtrlShow() {
          console.log('11111111111');
          axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/GetStoresMJJForLeftMenuAsc', JSON.parse('{}')).then(
            success => {
              console.log(success, '获取库房密集架信息-成功');
              console.log(success.data.data, '获取库房密集架信息-成功');
              this.MJJList = [];
              let arr=success.data.data
              this.MJJList.push(...arr)
            },
            error => {
              console.log(error, '获取库房密集架信息--返回失败的数据');
            })
        },
        MJJhandleNodeClick(data) {//
          console.log(data, 'data.MJJhandleNodeClick');
          if (data.children == undefined) {
            console.log(data.id, data.label, 'data.id, data.label');
            bus.$emit("ebVideoCtrlWebVideoCtrl", data.id, data.label);
          }
        },
    }
};
</script>
<!-- style="border-radius: 4px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" -->