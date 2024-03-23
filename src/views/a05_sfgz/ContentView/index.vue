<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-header style="text-align: left; font-size: 12px;background-color: white;">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;
            font-size: 1rem;
            text-decoration: none;
            color: #000000;
            border-bottom: 0.125rem solid #258AD9;
            ">
                <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>十二防感知</el-breadcrumb-item>
                
            </el-breadcrumb></el-header>
        <el-container style="height: calc(100vh - 120px);">
            <!-- <i class="el-icon-s-home"  /> -->
            <!-- <el-dialog title="库房管理" width="80%" top="10vh" center :visible.sync="isShowSetting" @close="dialogClose()"> -->
            <div style="display:flex;">
				<leftMenu></leftMenu>
                <div style="margin-left:.5vw;position:relative;width: 90vw;">
						<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
                            <router-view>

                            </router-view>
						</div>
                </div>
            </div>
        </el-container>
    </el-container>
</template>

<script>
import axios from "axios";
import bus from '@/utils/bus'
import leftMenu from '@/components/environmental_control/bfgzmenu.vue'
export default {
    components: {
		leftMenu,
    },
  data() {
    return {
        viewNo:1,
    };
  },
  watch: {
  
  },
    computed: {
        routes() {
            return this.$route.path;
        },
        ServeIp() {
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },
  created() {
  },
  mounted () {
    console.log(this.routes,'routesroutesroutesroutes');
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>
