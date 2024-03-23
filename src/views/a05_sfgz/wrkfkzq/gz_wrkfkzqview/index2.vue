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
                <div style="border-right:1px dotted #000;">
                    <div style="width:100%;background:rgb(42,103,205);text-align:center;color: #fff;font-size:1vw;">库房列表</div>
                    <div>
                        <el-tree :data="KFList" :props="defaultProps"
                            style="background:#fff;color:#000; width:8vw;margin-top:1vw;" highlight-current
                            @node-click="handleNodeClick"></el-tree>
                    </div>
                </div>
                <div style="margin-left:.5vw;position:relative;width: 90vw;">
						<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
							<img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="./pic01.png"/>
							<div style="position:absolute;left:5%;top:16%;width:30%;height:5%;">
							<a href="/#/sfgz"  style="color:blue;font-size:23px;text-decoration:none;">基本参数</a>&emsp;&emsp;&emsp;
							<div style="position:absolute;left:0%;bottom:0%;width:20%;height:4px;background-color:blue;"></div>
							<a href="/#/sfgz/wrkfkzq/gz_wrkfkzqview/index1" style="color:black;font-size:23px;text-decoration:none;">运行状态</a>
							</div>
							<img style="position:absolute;left:5%;top:28%;width:9%;height:16%;" id="FS" src="./ico/ico_fsyj_off.png"></img>
							<img style="position:absolute;left:15%;top:28%;width:9%;height:16%;" id="FH" src="./ico/ico_fhyj_off.png"></img>
							<img style="position:absolute;left:25%;top:28%;width:9%;height:16%;" id="FD" src="./ico/ico_fdyj_off.png"></img>
							<img style="position:absolute;left:35%;top:28%;width:9%;height:16%;" id="FC" src="./ico/ico_fcyj_off.png"></img>
							<img style="position:absolute;left:45%;top:28%;width:9%;height:16%;" id="FDS" src="./ico/ico_fdsyj_off.png"></img>
							<img style="position:absolute;left:55%;top:28%;width:9%;height:16%;" id="FGS" src="./ico/ico_fgsyj_off.png"></img>
							
							<img style="position:absolute;left:5%;top:47%;width:9%;height:16%;" id="FF" src="./ico/ico_ffyj_off.png"></img>
							<img style="position:absolute;left:15%;top:47%;width:9%;height:16%;" id="FG" src="./ico/ico_fgyj_off.png"></img>
							<img style="position:absolute;left:25%;top:47%;width:9%;height:16%;" id="FZ" src="./ico/ico_fzyj_off.png"></img>
							<img style="position:absolute;left:35%;top:47%;width:9%;height:16%;" id="FZH" src="./ico/ico_fzhyj_off.png"></img>
							<img style="position:absolute;left:45%;top:47%;width:9%;height:16%;" id="FDW" src="./ico/ico_fgwyj_off.png"></img>
							<img style="position:absolute;left:55%;top:47%;width:9%;height:16%;" id="FGW" src="./ico/ico_fdwyj_off.png"></img>
							
							<div style="position:absolute;left:6%;top:68%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
								窗帘联动：
								<el-button id="btnclmode1" @click="btnclmode1" style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">未联动</el-button>
								<el-button id="btnclmode2"  @click="btnclmode2" style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">联动</el-button>
								&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
								环控数据联动：
								<el-button id="btnyxcsmode1" @click="btnyxcsmode1" style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">未联动</el-button>
								<el-button id="btnyxcsmode2" @click="btnyxcsmode2" style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">联动</el-button>
							</div>
							<div style="position:absolute;left:6%;top:78%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
								门禁运行状态：
								<el-button id="btnmjyxmode1" @click="btnmjyxmode1" style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">布防</el-button>
								<el-button id="btnmjyxmode2" @click="btnmjyxmode2" style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">撤防</el-button>
								&emsp;&emsp;&emsp;&emsp;&emsp;
								定时布防设置：
								<el-button id="btndsbfmode1" @click="btndsbfmode1" style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff; border-radius:20px;font-size:18px;outline:medium">启用定时</el-button>
								<el-button id="btndsbfmode2" @click="btndsbfmode2" style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">取消定时</el-button>
							</div>
							<el-select  v-model="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none" @change="showlist()">
							<el-option label="智能无人库房自控管理控制器" value="5" selected></el-option>
							<el-option label="环境超限专用报警器" value="4"></el-option>
							<el-option label="防盗报警器" value="0"></el-option>
							<el-option label="漏水报警器" value="1"></el-option>
							<el-option label="烟感报警器" value="2"></el-option>
							<el-option label="防光报警器" value="3"></el-option>
							<el-option label="震动报警器" value="6"></el-option>
							<el-option label="驱鼠报警器" value="7"></el-option>
							</el-select>
							<div style="position:absolute;left:3%;bottom:1.7%;font-size:16px;color:#036ff6">
								设备编号：<span id="datadeviceNo"></span>
								&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
								<span style="display:none;">库房索引：<span id="StoreId" ></span> </span>
							&emsp;&emsp;&emsp;库房名称：<span id="StoreName" ></span>
							<span style="display:none;">设备索引：<span id="ACId" ></span></span>
							&emsp;&emsp;&emsp;设备名称：<span id="ACName" ></span>
							&emsp;&emsp;IP地址：<span id="HostName" ></span>
							<span style="display:none;">端口：<span id="HttpPort" ></span></span>
							<span style="display:none;"><span id="AcLx" ></span></span>
							</div>
							<select id="DeviceID" style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none;display: none;">
								<option value="0" selected>智能无人库房自控管理控制器</option>
							</select>
						</div>
                </div>
            </div>
        </el-container>
    </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import $ from 'jquery';
export default {
    components: {
    },
    data() {
        return {
            KFList: [
                {
                    label: '数据加载中。。。',
                    children: []
                }
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
			DeviceType:"5",
			DeviceID:"0"
        };
    },
    computed: {
        ...mapGetters(["sidebar", "avatar"]),
        routes() {
            // return this.$router.options.routes
            return this.$route.path;
        },
        ServeIp() {
            return this.$store.state.user.ServeIp
        },
        ServePort() {
            return this.$store.state.user.ServePort
        }
    },
    watch: {
        routes: {
            handler(newVal, oldVal) {
                console.log(newVal, "newVal导航导航导航");
                console.log(oldVal, "oldVal---导航");
                if (newVal == "/home") {
                    this.isShow = false;
                    // this.$router.go(0)
                } else {
                    this.isShow = true;
                    // this.$router.go(0)
                }
            },

        },
    },
    created() {
        this.onmyload();
	
    },
    mounted() {
		this.showAuto();
		let t=setInterval(this.showAuto, 1000*10);
    },
    methods: {
		showlist(){
            clearInterval(this.loopTime);	
	    this.loopTime=undefined;
			let DeviceType=this.DeviceType;
			if(DeviceType==0)this.devicePage("/sfgz/wrkfkzq/gz_fdview/index"); 
			if(DeviceType==1)this.devicePage("/sfgz/wrkfkzq/gz_lsview/index"); 
			if(DeviceType==2)this.devicePage("/sfgz/wrkfkzq/gz_ygview/index"); 
			if(DeviceType==3)this.devicePage("/sfgz/wrkfkzq/gz_fgview/index"); 
			if(DeviceType==4)this.devicePage("/sfgz/wrkfkzq/gz_hjcxview/index"); 
			if(DeviceType==5)this.devicePage("/sfgz"); 
			if(DeviceType==6)this.devicePage("/sfgz/wrkfkzq/gz_zdview/index"); 
			if(DeviceType==7)this.devicePage("/sfgz/wrkfkzq/gz_qsview/index");
		},
		onmyload(){
			var jsonin={
				"cmd":30014,
				"localip":"127.0.0.1",
				"UserId":10
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid',jsonin).then(
                success => {
                    console.log(success, '获取库房列表接口-成功');
                    let Obj=success.data;
					this.KFList = [];
					for(let i=0;i<Obj.data.length;i++)
					{
						let item={};
						item.id=Obj.data[i].StoreId;
						item.no=i;
						item.label=Obj.data[i].StoreName;
						item.level=1;
						item.children=[];
						this.KFList.push(item);
					}
					console.log(this.KFList);
                },
                error => {
                    console.log(error, '获取库房列表接口--返回失败的数据');
                })
		},
		handleNodeClick(data) {
			let StoreId=data.id;
			let StoreName=data.label;
			let level=data.level;
			let no=data.no;
			console.log(data, "点击了data111111111111");
			console.log(data.id, "点击了data111111111111");
			if(level==1)
			{
				var jsonin={
				"cmd":50015,
				"localip":"127.0.0.1",
				"UserId":10,
				"StoreId":StoreId,
				"pageno":1,
				"pagesize":10,
				}
				axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid',jsonin).then(
					success => {
						console.log(success, '获取库房列表接口-成功');
						let Obj=success.data;
						this.KFList[no].children=[];
						for(let i=0;i<Obj.data.length;i++)
						{
							if(Obj.data[i].AcLx==2)continue;
							let item={};
							item.id=Obj.data[i].ACId;
							item.no=i;
							item.label=Obj.data[i].ACName;
							item.level=2;
							item.StoreId=StoreId;
							item.StoreName=StoreName;
							item.HostName=Obj.data[i].HostName;
							item.HttpPort=Obj.data[i].HttpPort;
							item.AcLx=Obj.data[i].AcLx;
							this.KFList[no].children.push(item);
							if(item.AcLx==1)
							{
								window.location.href = '/hjjk/qykzq/qykzqview/index.html';
							}
							
							// item+="sessionStorage.setItem('StoreName','"+StoreName+"');";
							// item+="sessionStorage.setItem('ACName','"+Obj.data[i].ACName+"');";
							// item+="sessionStorage.setItem('HostName','"+Obj.data[i].HostName+"');";
							// item+="if("+Obj.data[i].AcLx+"==1)";
							// item+="{";
							// item+="   	
							// item+="}";
							// item+="showAuto();";
							// item+="});";
						}
						console.log(this.KFList);
					},
					error => {
						console.log(error, '获取库房列表接口--返回失败的数据');
					})
				}
				else{
					$("#StoreName").html(data.StoreName)
					$("#ACName").html(data.label)
					$("#HostName").html(data.HostName)

					// var sysname=decodeURIComponent($.cookie('sysname'))
					// var sysname=sysname.replace(/\+/g,"&ensp;")
					// $("#sysname").html(sysname)
					//$("#HostName").html($.cookie('HostName'))
					this.showAuto();
				}
        },
		showAuto(){
			if($('#HostName').html()=="")return;
			var indata={
				"cmd":60001,
				"localip":"127.0.0.1",
				"hostname":"10.168.1.39",
				"port":"8066",
				"method":"UnmannedKFPTService/getTotalRunState",
				"jsonin":"{\"ip\":\""+$('#HostName').html()+"\"}"
			}
			this.getdata(indata,'msg');
		},
		open3(data) {
			this.$message({
				message: data,
				type: 'warning'
			});
		},
		getdata(indata, ctlname) {
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					if (success.data?.data == undefined) {
						//return this.open3("没有数据")
						return
					}
						let Obj=success.data;
						var data=JSON.stringify(Obj)
						if(Obj.data==undefined)return;
						$("#"+ctlname).html(data);
						var data1=JSON.stringify(Obj.data);
						var obj2=Obj.data.SRFCSZT[0];
						console.log(JSON.stringify(obj2))	
						if(obj2.FS==1)
						{
						   $("#FS").attr("src","ico/ico_fsyj_on.png");
						}
						else
						{
						   $("#FS").attr("src","ico/ico_fsyj_off.png");
						}
						if(obj2.FH==1)
						{
						   $("#FH").attr("src","ico/ico_fhyj_on.png");
						}
						else
						{
						   $("#FH").attr("src","ico/ico_fhyj_off.png");
						}
						if(obj2.FD==1)
						{
						   $("#FD").attr("src","ico/ico_fdyj_on.png");
						}
						else
						{
						   $("#FD").attr("src","ico/ico_fdyj_off.png");
						}
						if(obj2.FC==1)
						{
						   $("#FC").attr("src","ico/ico_fcyj_on.png");
						}
						else
						{
						   $("#FC").attr("src","ico/ico_fcyj_off.png");
						}
						if(obj2.SD==2)
						{
						   $("#FDS").attr("src","ico/ico_fdsyj_on.png");
						}
						else
						{
						   $("#FDS").attr("src","ico/ico_fdsyj_off.png");
						}
						if(obj2.SD==1)
						{
						   $("#FGS").attr("src","ico/ico_fgsyj_on.png");
						}
						else
						{
						   $("#FGS").attr("src","ico/ico_fgsyj_off.png");
						}
						
						if(obj2.FF==1)
						{
						   $("#FF").attr("src","ico/ico_ffyj_on.png");
						}
						else
						{
						   $("#FF").attr("src","ico/ico_ffyj_off.png");
						}
						if(obj2.FG==1)
						{
						   $("#FG").attr("src","ico/ico_fgyj_on.png");
						}
						else
						{
						   $("#FG").attr("src","ico/ico_fgyj_off.png");
						}
						if(obj2.FZ==1)
						{
						   $("#FZ").attr("src","ico/ico_fzyj_on.png");
						}
						else
						{
						   $("#FZ").attr("src","ico/ico_fzyj_off.png");
						}
						if(obj2.FHai==1)
						{
						   $("#FZH").attr("src","ico/ico_fzhyj_on.png");
						}
						else
						{
						   $("#FZH").attr("src","ico/ico_fzhyj_off.png");
						}
						if(obj2.WD==2)
						{
						   $("#FDW").attr("src","ico/ico_fdwyj_on.png");
						}
						else
						{
						   $("#FDW").attr("src","ico/ico_fdwyj_off.png");
						}
						if(obj2.WD==1)
						{
						   $("#FGW").attr("src","ico/ico_fgwyj_on.png");
						}
						else
						{
						   $("#FGW").attr("src","ico/ico_fgwyj_off.png");
						}
						  
						//var DeviceID=$("#DeviceID").val();
						//console.log(JSON.stringify(obj1.data10[DeviceID]))
						//$("#datadeviceNo").html(obj1.data10[DeviceID].datadeviceNo);
						//$("#dataTXZT").html(obj1.data10[DeviceID].dataTXZT==1?"离线":"在线");
						//if(obj1.data10[DeviceID].dataalarm=="0")
						//$("#dataalarm").attr('src','pic0.png');
						//else
						//$("#dataalarm").attr('src','pic.png');
					},
					error => {
						console.log(error, '返回失败的数据');
					})
		},
		btnclmode1(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btnclmode1").css("color","#ffffff");
				 $("#btnclmode1").css("background-color","#036ff6");
				 $("#btnclmode2").css("color","#036ff6");
				 $("#btnclmode2").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/setAllCurtainLinkageParams",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"curtainLinkage\":\"0\"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
							
					},
					error:function(msg){
						
					}
				})
			},
			btnclmode2(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btnclmode2").css("color","#ffffff");
				 $("#btnclmode2").css("background-color","#036ff6");
				 $("#btnclmode1").css("color","#036ff6");
				 $("#btnclmode1").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/setAllCurtainLinkageParams",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"curtainLinkage\":\"1\"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
							
					},
					error:function(msg){
						
					}
				})
			},
			btnyxcsmode1(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btnyxcsmode1").css("color","#ffffff");
				 $("#btnyxcsmode1").css("background-color","#036ff6");
				 $("#btnyxcsmode2").css("color","#036ff6");
				 $("#btnyxcsmode2").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/setAllHKDataLinkageParams",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"hkDataLinkage\":\"0\"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
							
					},
					error:function(msg){
						
					}
				})
			},
			btnyxcsmode2(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btnyxcsmode2").css("color","#ffffff");
				 $("#btnyxcsmode2").css("background-color","#036ff6");
				 $("#btnyxcsmode1").css("color","#036ff6");
				 $("#btnyxcsmode1").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/setAllHKDataLinkageParams",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"hkDataLinkage\":\"1\"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
							
					},
					error:function(msg){
						
					}
				})
			},
			btnmjyxmode1(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btnmjyxmode1").css("color","#ffffff");
				 $("#btnmjyxmode1").css("background-color","#036ff6");
				 $("#btnmjyxmode2").css("color","#036ff6");
				 $("#btnmjyxmode2").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/setAllPreventStatusParams",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"preventStatus\":\"1\"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
							
					},
					error:function(msg){
						
					}
				})
			},
			btnmjyxmode2(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btnmjyxmode2").css("color","#ffffff");
				 $("#btnmjyxmode2").css("background-color","#036ff6");
				 $("#btnmjyxmode1").css("color","#036ff6");
				 $("#btnmjyxmode1").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/setAllPreventStatusParams",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"preventStatus\":\"0\"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
							
					},
					error:function(msg){
						
					}
				})
			},
			btndsbfmode1(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btndsbfmode1").css("color","#ffffff");
				 $("#btndsbfmode1").css("background-color","#036ff6");
				 $("#btndsbfmode2").css("color","#036ff6");
				 $("#btndsbfmode2").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/setAllTimingSettingParams",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"timingSetting\":\"1\"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
							
					},
					error:function(msg){
						
					}
				})
			},
			btndsbfmode2(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btndsbfmode2").css("color","#ffffff");
				 $("#btndsbfmode2").css("background-color","#036ff6");
				 $("#btndsbfmode1").css("color","#036ff6");
				 $("#btndsbfmode1").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/setAllTimingSettingParams",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"timingSetting\":\"0\"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
							
					},
					error:function(msg){
						
					}
				})
			}
    },
};
</script>
<style lang="scss" scoped>
.navbar {
    height: 5vh;
    overflow: hidden;
    position: relative; // background: #fff;
    background: url("@/assets/welcom_bg.png");
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 2.8vw; //左侧伸缩按钮
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
        color: #fff;

        &:hover {
            // background: rgba(0, 0, 0, .025)
            background: rgba(250, 250, 250, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
        font-size: 1.2vw;
        line-height: 2.8vw;
        color: #fff;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 5vh;
        display: flex;
        align-items: center;

        span {
            color: #fff;
            font-size: 20px;
        }

        &:focus {
            outline: none;
        }

        .el-icon-s-home {
            cursor: pointer;
            font-size: 1.4vw;
            color: #fff;
            margin-right: 1vw;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66; // color: #fff;;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 3vw;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;
                color: #fff;

                .user-avatar {
                    cursor: pointer;
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 0.8vw;
                    font-size: 18px;
                }
            }
        }
    }
}

.Modeldesign {
    width: 100%;
    height: 6vh;
    display: flex;
    align-items: center;
}

.rfidmark {
    .el-input--small {
        width: 20vw !important;
        // z-index:9999999!important
    }
}

.el-dropdown-menu el-popper user-dropdown {
    top: 56px !important;
}
.cengjiabiaoge {
    height:16.5vw !important;
  
}
.kfcode {
    width: 100%;
}
</style>

<!-- <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>智能无人库房自控管理控制器界面</title>
<script type="text/javascript" src="/assets/js/jquery-1.11.3.min.js" ></script>
<script type="text/javascript" src="/assets/js/jquery.md5.js" ></script>
<script type="text/javascript" src="/assets/js/jquery.cookie.min.js" ></script>
<style>
   a{
	 color: #bdc3d3;
     text-decoration:none;
	 } 
   a:hover{
	 color: #bdc3d3;
	 text-decoration:none;
   } 
   a:visited{color: #bdc3d3}
   #menu .qhbg{background-color: #999;border:2px solid #999; color:#fff}
   button:hover {
		transform: scale(0.9);
   }
   button:hover:after {
	 transform: scale(1);
   }
</style>
<script> 
var objDiv;
function showmsg(msg) { 
    objDiv = $("#msgbox"); 
	/**
	   这里我们可以使用ajax从数据库获取数据动态改变提示框里的内容
	   $.post('./test.php',{act:"ajax_get_ifo", goods_id:goods_id}, function (res){
					objDiv.html("<br>"+res.data+"<br>");
				}, 'json');
	**/
	$(objDiv).css("display","block"); 
	// e=e||window.event;  // 兼容firefox
	$(objDiv).css("left", "50%");   // 初始化，防止叠加
	$(objDiv).css("top", "5%"); 
	//var e = window.event || arguments.callee.caller.arguments[0];
	//$(objDiv).css("left", e.clientX + 30); 
	//$(objDiv).css("top", e.clientY - 45); 
	$(objDiv).html("&emsp;&emsp;"+msg+"&emsp;&emsp;");
	t = setTimeout("hide()", 2000);
} 
function hide() {
    var objDiv = $("#msgbox");  
	$(objDiv).css("display", "none"); 
} 
</script> 
<div id="msgbox" style="position:absolute;z-index:99;display:none;border:0;background:#036ff6;border-radius:5px;color:white;font-size:16px;filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.7;border-radius:20px;line-height:50px;"></div> 

<script>
		$(document).ready(function(){ 
			$('#DeviceID').change(function(){ 
			   showAuto();
			})
			$('#DeviceType').change(function(){ 
				//alert($(this).val()+$(this).children('option:selected').text());
				DeviceType=$(this).val();
			}) 
		})
		$(function(){
		function onmyload(){
				 $.ajax({
			            type: "GET",
			            url: "http://127.0.0.1:4444/getRfid",
			            data: {
			            	"cmd":30014,
			            	"localip":"127.0.0.1",
			            	"UserId":$.cookie('UserId')
			            },
			            success: function(Obj,status){
			            	$("#menutree").html("");
			            	for(i=0;i<Obj.data.length;i++)
			            	{
			            		var item="<li class='active'>";
			            		item+="<a id='treenode_"+Obj.data[i].StoreId+"'>";
			            		item+="<i class='icon-desktop'></i>";
			            		item+="<span class='menu-text'> "+Obj.data[i].StoreName+" </span>";
			            		item+="</a>";	
			            		item+="<ul class='submenu' id='treenode_submenu"+Obj.data[i].StoreId+"'>";
			            		item+="</li>";
			            		item+="<script>";	
			            		item+="$('#treenode_"+Obj.data[i].StoreId+"').bind('click',function(){";
			            		item+="$().treeclick("+Obj.data[i].StoreId+",'"+Obj.data[i].StoreName+"')";
			            		item+="});";
			            		$("#menutree").append(item);
			            		$("#menutree").append("</script"+">");
			            		$("#menutree").append("</li>");
			            		//$("#menutree").after(item);
			            	}
			            },
			    		error:function(msg){
			    			alert(msg.status);//状态码
			    		}
			        })
		   }
		   onmyload();
		  $.fn.treeclick=function(StoreId,StoreName)
			{
				//alert(StoreId+StoreName);
				$.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: {
						"cmd":50015,
						"localip":"127.0.0.1",
						"UserId":$.cookie('UserId'),
						"StoreId":StoreId,
						"pageno":1,
						"pagesize":10,
					},
					success: function(Obj,status){
						var itemObj="#treenode_submenu"+StoreId;
						$(itemObj).html("");
						//alert(JSON.stringify(Obj))
						for(i=0;i<Obj.data.length;i++)
						{
							var item="<li class='active'>";
							item+="<a id='treenode_"+Obj.data[i].ACId+"'>";
							item+="<i class='icon-list-alt'></i>";
							item+="<span class='menu-text'> "+Obj.data[i].ACName+" </span>";
							item+="</a>";	
							item+="<script>";	
							item+="$('#treenode_"+Obj.data[i].ACId+"').bind('click',function(){";
							item+="$('#StoreId').html("+StoreId+");";
							item+="$('#StoreName').html('"+StoreName+"');";
							item+="$('#ACId').html("+Obj.data[i].ACId+");";
							item+="$('#ACName').html('"+Obj.data[i].ACName+"');";
							item+="$('#HostName').html('"+Obj.data[i].HostName+"');";
							item+="$('#HttpPort').html('"+Obj.data[i].HttpPort+"');";
							item+="$('#AcLx').html('"+Obj.data[i].AcLx+"');";
							item+="sessionStorage.setItem('HostName','"+Obj.data[i].HostName+"');";
							item+="if("+Obj.data[i].AcLx+"==1)";
							item+="{";
							item+="   	window.location.href = '/bfgz/qykzq/gz_qykzqview/index.html';";
							item+="}";
							item+="if("+Obj.data[i].AcLx+"==2)";
							item+="{";
							item+="   	window.location.href = '/webroot/bfgz/bfkzq/gz_bfkzqview/index.html';";
							item+="}";
							item+="showAuto();";
							item+="});";
							$(itemObj).append(item);
							$(itemObj).append('</script'+">");
							$(itemObj).append("</li>");
							//$("#menutree").after(item);
						}
					},
					error:function(msg){
						alert(msg.status);//状态码
					}
				})
			}
			$("#HostName").html(sessionStorage.getItem('HostName'))
			var sysname=decodeURIComponent($.cookie('sysname'))
            var sysname=sysname.replace(/\+/g,"&ensp;")
            $("#sysname").html(sysname)
			showAuto();
		　  looptimer = setInterval("showAuto()", 1000*60);
		    
		  //btnok
		  //$('#menu li ul li span').click(function(){
			//		$('#menu li ul li').removeClass('qhbg');
			//		$(this).parent().addClass('qhbg');
			//		//alert($(this).text())
			//		alert($(this).parent().find('#a1').text())
		  // })
		})
		function showAuto(){
		　　
			getdata(indata,'msg');
		}
		function getdata(indata,ctlname)
		{
			$.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						
					},
					error:function(msg){
						
					}
			})
		}
	</script>
</head> -->