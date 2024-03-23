<template>
    <el-container style="height: 100%; border: 0px solid #eee">
        <el-header style="text-align: left; font-size: 12px;background-color: white;">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;
    font-size: 1rem;
    text-decoration: none;
    color: #000000;
    border-bottom: 0.125rem solid #258AD9;
    ">
                <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>库房管理</el-breadcrumb-item>
                <el-breadcrumb-item>环境监控</el-breadcrumb-item>
            </el-breadcrumb></el-header>
        <el-container style="height: calc(100vh - 120px);">
            <iframe style="width:100%;height:100%;" src="/webroot/bfgz/wrkfkzq/gz_wrkfkzqview/index.html"></iframe>
        </el-container>
    </el-container>
</template>
<script>
import { Loading } from 'element-ui';
import Logo from '@/layout/components/Sidebar/Logo.vue';
import { mapGetters } from 'vuex'
import axios from 'axios'
import bus from '@/utils/bus'
import $ from 'jquery'
export default {
    data() {
        return {
            
        }
    },
    mounted() {
      
    },
    computed: {
        ServeIp() {
            console.log(this.$store, "1231231231321");
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },
    methods: {
    }
}
</script>
<style>
.mainviewsix {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 30px;
    /* 
    overflow: hidden;
    
    background-repeat: no-repeat;
    min-height: calc(100vh - 7vh);  */
}

.leftmenu .el-menu {
    background-color: white;
    color: black;
    min-height: calc(100% - 0px);
    z-index: 0;
}

.leftmenu .el-menu-item {
    background-color: white;
    color: black;
}

.leftmenu .el-submenu__title:hover {
    background-color: white;
    color: black;
}

.leftmenu .el-menu-item:hover {
    background-color: white;
    color: black;
}

.leftmenu .el-footer {
    background-color: white;
    color: black;
    line-height: 60px;
    text-align: center;
    z-index: 0;
}

.leftmenu i {
    background-color: white;
    color: black;
}

.leftmenu .el-submenu__title {
    background-color: white;
    color: black;
}

.leftmenu .el-submenu__title i {
    background-color: white;
    color: black;
}

.myfooter {
    background-color: white;
    color: black;
}
</style>