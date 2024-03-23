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
        <el-breadcrumb-item>智能灯光</el-breadcrumb-item>
    </el-breadcrumb></el-header>
    <el-container style="height: calc(100vh - 120px);">
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-header style="text-align: left; border-radius:12px 12px 0 0;">
            <img style="vertical-align:middle;" src="~@/assets/a06_znmj/home.png"/>
            <span style="vertical-align:middle;width:90%;color:#fff;text-align:left;font-size:22px;line-height: 100%;padding-left: 10px;">库房列表</span>
        </el-header>
        <el-main class="leftmenu">
            <el-menu :default-openeds="['1']">
            <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            </el-submenu>
            <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
            </el-submenu>
            <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            </el-submenu>
        </el-menu>
      </el-main>  
   
    </el-aside>
    
    <el-container>
      <el-main  class="mainviewfour">
        <div style="display: flex;position: absolute;z-index: 1000;right: 0rem;width: 420px;top: 5rem;">
            <div style="flex: 3;">
                <input type="text" class="form-control" id="modifyNameBySelf">
            </div>
            <div style="flex: 1;">
                <button class="btn btn-primary" type="button" onclick="modifyBySelf()">修改</button>
            </div>
        </div>
        <div style="position:absolute;right:0%;top:0%;width:100%;height:100%;background-color:#e5eef7;border-radius:12px">
            <img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="~@/assets/a07_zndg/qykzq/pic.png"/>

            <div id="alloff"
                style="position:absolute;left:8%;top:11%;width:20%;height:20%;font-size:0.75rem;color:#036ff6;">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/all_off.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1.4575rem">一键全关</span>
            </div>
            <div id="allon"
                style="position:absolute;left:38%;top:11%;width:20%;height:20%;font-size:0.6875rem;color:#036ff6;">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/all_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1.4575rem">一键全开</span>
            </div>

            <div style="position:absolute;left:4.5%;top:42%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
                id="btnl1">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_01.png"></img>
                <img id="lt1" style="position:absolute;left:50%;top:40%;width:40%;height:50%;"
                    src="~@/assets/a07_zndg/qykzq/ico/lt_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;1</span>
                <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span
                        id="dg1">开</span></span>
            </div>

            <div style="position:absolute;left:19.7%;top:42%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
                id="btnl2">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_02.png"></img>
                <img id="lt2" style="position:absolute;left:50%;top:40%;width:40%;height:50%;"
                    src="~@/assets/a07_zndg/qykzq/ico/lt_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;2</span>
                <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span
                        id="dg2">开</span></span>
            </div>

            <div style="position:absolute;left:35.1%;top:42%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
                id="btnl3">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_03.png"></img>
                <img id="lt3" style="position:absolute;left:50%;top:40%;width:40%;height:50%;"
                    src="~@/assets/a07_zndg/qykzq/ico/lt_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;3</span>
                <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span
                        id="dg3">开</span></span>
            </div>

            <div style="position:absolute;left:50.2%;top:42%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
                id="btnl4">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_04.png"></img>
                <img id="lt4" style="position:absolute;left:50%;top:40%;width:40%;height:50%;"
                    src="~@/assets/a07_zndg/qykzq/ico/lt_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;4</span>
                <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span
                        id="dg4">开</span></span>
            </div>

            <div style="position:absolute;left:4.5%;top:70%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
                id="btnl5">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_05.png"></img>
                <img id="lt5" style="position:absolute;left:50%;top:40%;width:40%;height:50%;"
                    src="~@/assets/a07_zndg/qykzq/ico/lt_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;5</span>
                <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span
                        id="dg5">开</span></span>
            </div>

            <div style="position:absolute;left:19.7%;top:70%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
                id="btnl6">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_06.png"></img>
                <img id="lt6" style="position:absolute;left:50%;top:40%;width:40%;height:50%;"
                    src="~@/assets/a07_zndg/qykzq/ico/lt_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;6</span>
                <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span
                        id="dg6">开</span></span>
            </div>

            <div style="position:absolute;left:35.1%;top:70%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
                id="btnl7">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_07.png"></img>
                <img id="lt7" style="position:absolute;left:50%;top:40%;width:40%;height:50%;"
                    src="~@/assets/a07_zndg/qykzq/ico/lt_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;7</span>
                <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span
                        id="dg7">开</span></span>
            </div>

            <div style="position:absolute;left:50.2%;top:70%;width:13%;height:19%;font-size:1.6875rem;color:#036ff6;"
                id="btnl8">
                <img style="position:absolute;width:100%;height:100%;" src="~@/assets/a07_zndg/qykzq/ico/btn_08.png"></img>
                <img id="lt8" style="position:absolute;left:50%;top:40%;width:40%;height:50%;"
                    src="~@/assets/a07_zndg/qykzq/ico/lt_on.png"></img>
                <span style="color:white;position:absolute;left:5%;top:13%;font-size:1rem">智能灯控&emsp;8</span>
                <span style="color:white;position:absolute;left:5%;top:33%;font-size:0.75rem">当前状态：<span
                        id="dg8">开</span></span>
            </div>
          
            <select id="DeviceID"
                style="position:absolute;right:4%;top:5%;width:25%;height:30px;border:1px solid #e6eef8;border-radius:6px;outline:none">
                <!-- <option value="0" selected>智能灯光模块1</option>
            <option value="1">智能灯光模块2</option> -->
                <!--<option value="2">智能灯光模块3</option>
            <option value="3">智能灯光模块4</option>
            <option value="4">智能灯光模块5</option>-->
            </select>
        </div>


      </el-main>
      <el-footer class="myfooter">
        <div style="font-size:1.6875rem;color:#036ff6">
                <span>设备编号：<span id="datadeviceNo"></span></span> &emsp;&emsp;
                <span>通讯状态：<span id="dataTXZT"></span></span>
                <span style="display:none;">库房索引：<span id="StoreId"></span></span>&emsp;&emsp;
                <span>库房名称：</span> <span id="StoreName"></span>
                <span style="display:none;">设备索引：<span id="ACId"></span></span>&emsp;&emsp;
                <span>设备名称：</span> <span id="ACName"></span>
                <span>IP地址：<span id="HostName"></span></span>
                <span style="display:none;">端口：<span id="HttpPort"></span></span>
                <span><span id="AcLx"></span></span>
                <span style="display:none;">请求方法：<span id="url"></span></span>
                <span style="display:none;">请求参数：<span id="jsonin"></span></span>
                <span style="display:none;"><span id="stime"></span></span>
            </div>
      </el-footer>
    </el-container>
</el-container>
</el-container> 
</template>
<script>
</script>
<style lang="scss">
.mainviewfour{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('~@/assets/a07_zndg/qykzq/pic.png');
    background-size:100% 100%;
    background-repeat: no-repeat;
    border-radius: 30px;
    /* 
    overflow: hidden;
    
    background-repeat: no-repeat;
    min-height: calc(100vh - 7vh);  */
}
.leftmenu .el-menu{
    background-color: white;
    color: black;
    min-height: calc(100% - 0px);
    z-index: 0;
  }

.leftmenu .el-menu-item{
    background-color: white;
    color: black;
  }
  .leftmenu .el-submenu__title:hover{
    background-color: white;
    color: black;
  }
  .leftmenu .el-menu-item:hover{
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
  .leftmenu i{
    background-color: white;
    color: black;
  }
  .leftmenu .el-submenu__title{
    background-color: white;
    color: black;
  }
  .leftmenu .el-submenu__title i {
    background-color: white;
    color: black;
  }
  .myfooter{
    background-color: white;
    color: black;
  }
</style>