<!-- 智能无人库房自控管理控制器（数据报表） -->
<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        
            <!-- <i class="el-icon-s-home"  /> -->
            <!-- <el-dialog title="库房管理" width="80%" top="10vh" center :visible.sync="isShowSetting" @close="dialogClose()"> -->
            <div style="display:flex;">
                
						
					<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
					<div style="position:absolute;left:50%;top:2%;width:50%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
						<el-button type="primary" size="big" @click="devicePage(`/hjjk`)">设备页面</el-button>
						<el-button type="primary" size="big" @click="devicePage(`/hjjk1-3`)" disabled>数据报表</el-button>
						<el-button type="primary" size="big" @click="devicePage(`/hjjk1-4`)">数据曲线</el-button>
						<el-select  v-model="sttime" size="big" style="width:25%;height:100%;margin-left:.2vw;" @change="showAuto()">
							<el-option label="近24小时" value="0" selected></el-option>
							<el-option label="近7天" value="1"></el-option>
							<el-option label="近30天" value="2"></el-option>
							<el-option label="近一年" value="3"></el-option>
						</el-select>
						<!-- <el-button type="primary" size="big" @click="">清空记录</el-button> -->
						<el-button type="primary" size="big" @click="DA_zaijiedaochu">数据导出</el-button>
					</div>
					<div style="position:absolute;left:4%;top:2%;width:20%;height:50px;">设备类型:
						<el-select  v-model="DeviceType" style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none" @change="showlist()">
							<el-option label="智能无人库房自控管理控制器" value="0" selected></el-option>
							<el-option label="净化除酸型除湿加湿一体机" value="1"></el-option>
							<el-option label="健康防护一体机" value="2"></el-option>
							<el-option label="壁挂式新风净化机" value="3"></el-option>
							<el-option label="酸性气体空气净化机" value="4"></el-option>
							<el-option label="加湿机" value="5"></el-option>
							<el-option label="除湿机" value="6"></el-option>
							<el-option label="普通一体机" value="7"></el-option>
							<el-option label="红外空调" value="8"></el-option>
							<el-option label="精密空调" value="9"></el-option>
							<el-option label="智能电动窗帘" value="11"></el-option>
							<el-option label="空气质量云测仪" value="12"></el-option>
							<el-option label="自定义设备" value="17"></el-option>
						</el-select>
					</div>
					<div style="position:absolute;left:24%;top:2%;width:20%;height:50px;">设备编号:
					<el-select v-model="DeviceID" style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none" @change="showAuto()">
					<el-option value="1#" label="1号智能无人库房自控管理控制器"  selected></el-option>
					<el-option value="2#" label="2号智能无人库房自控管理控制器"  ></el-option>
					<el-option value="3#" label="3号智能无人库房自控管理控制器"  ></el-option>
					<el-option value="4#" label="4号智能无人库房自控管理控制器"  ></el-option>
					<el-option value="5#" label="5号智能无人库房自控管理控制器"  ></el-option>
					</el-select>
					</div>
					<div style="position:absolute;left:2.5%;top:10%;width:95%;height:80%;overflow-y:auto;">
					
					<el-table :data="tableData" style="position:relative;width:98%;" border id="ZJDAdaochu">
						
						<el-table-column
							prop="temp"
							label="温度(℃)"
							align="center">
						</el-table-column>
						<el-table-column
							prop="hum"
							label="湿度(%RH)"
							align="center">
						</el-table-column >
						<el-table-column
							prop="PM1"
							label="PM1(ug/m³)"
							align="center">
						</el-table-column>
						<el-table-column
							prop="PM2_5"
							label="PM2.5(ug/m³)"
							align="center">
						</el-table-column>
						<el-table-column
							prop="PM10"
							label="PM10(ug/m³)"
							align="center">
						</el-table-column>
						<el-table-column
							prop="TVOC"
							label="TVOC(mg/m³)"
							align="center">
						</el-table-column>
						<el-table-column
							prop="CO2"
							label="CO₂(ppm)"
							align="center">
						</el-table-column>
						<el-table-column
							prop="HCHO"
							label="HCHO(mg/m³)"
							align="center">
						</el-table-column>
						<el-table-column
							prop="SO2"
							label="SO₂(mg/m³)"
							align="center">
						</el-table-column>
						<el-table-column
							prop="insert_time"
							label="记录时间"
							:formatter="dateFormat"
							align="center"
							>
						</el-table-column>
					</el-table>
					</div>
					<div style="position:absolute;left:3%;bottom:2%;font-size:15px;color:#036ff6">
						设备编号：<span id="datadeviceNo"></span>
						&emsp;&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
						<span style="display:none;">库房索引：<span id="StoreId" ></span></span>
						&emsp;&emsp;&emsp;&emsp;库房名称：<span id="StoreName" ></span>
						<span style="display:none;">设备索引：<span id="ACId" ></span></span>
						&emsp;&emsp;&emsp;&emsp;设备名称：<span id="ACName" ></span>
						<span style="display:none;">IP地址：<span id="HostName" ></span></span>
						<span style="display:none;">端口：<span id="HttpPort" ></span></span>
						<span style="display:none;"><span id="AcLx" ></span></span>
						<span style="display:none;">请求方法：<span id="url"></span></span>
						<span style="display:none;">请求参数：<span id="jsonin"></span></span>
						<span style="display:none;"><span id="stime"></span></span>
					</div>
					
					</div>
                </div>
    </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import $ from 'jquery';
import bus from '@/utils/bus'
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
			DeviceType:"0",
			DeviceID:"1#",
			tableData:[],
			loopTime:undefined,
			sttime:"0",
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
    },
     mounted() {
		if((sessionStorage.getItem('StoreName')!=undefined) &&(sessionStorage.getItem('ACName')!=undefined) &&(sessionStorage.getItem('HostName')!=undefined) ){
			$("#StoreName").html(sessionStorage.getItem('StoreName'))
			$("#ACName").html(sessionStorage.getItem('ACName'))
			$("#HostName").html(sessionStorage.getItem('HostName'))
			this.showAuto();
			this.loopTime=setInterval(this.showAuto, 1000*10);
		}
		bus.$on('hjjkmenu', (data) => {
			this.equipmentModel = []//设备信息
		this.numberOfDevices = []///设备数量
		this.deviceInformation()
			console.log(data,'data消息传递');
			sessionStorage.setItem("StoreName",data.StoreName)
			sessionStorage.setItem("ACName",data.label)
			sessionStorage.setItem("HostName",data.HostName);
			$("#StoreName").html(data.StoreName)
			$("#ACName").html(data.label)
			$("#HostName").html(data.HostName)
			this.showAuto();
			if(this.loopTime!=undefined){
				clearInterval(this.loopTime);
			}
			this.loopTime=setInterval(this.showAuto, 1000*10);
		})
    },
	beforeDestroy () {
		clearInterval(this.loopTime);	
		this.loopTime=undefined;
	},
    methods: {
		devicePage(page){
            clearInterval(this.loopTime);
			this.$router.push({ path: this.redirect || page })
		},
		dateFormat(row, column,cellValue,index) {
			let date = new Date(parseInt(cellValue));
			if(isNaN(date)) return '--'
			let Y = date.getFullYear() + '-';
			let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
			let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
			let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
			let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
			let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return Y + M + D + h + m + s;
		},
		showlist(){
            clearInterval(this.loopTime);	
	    this.loopTime=undefined;
			let DeviceType=this.DeviceType;
			if(DeviceType==0)this.devicePage("/hjjk"); 
			if(DeviceType==1)this.devicePage("/hjjk/wrkfkzq/ytjview/report"); 
			if(DeviceType==2)this.devicePage("/hjjk/wrkfkzq/jkytfhjview/report"); 
			if(DeviceType==3)this.devicePage("/hjjk/wrkfkzq/bgsxfjview/report"); 
			if(DeviceType==4)this.devicePage("/hjjk/wrkfkzq/sxqtjhjview/report"); 
			if(DeviceType==5)this.devicePage("/hjjk/wrkfkzq/jsqview/report"); 
			if(DeviceType==6)this.devicePage("/hjjk/wrkfkzq/csqview/report"); 
			if(DeviceType==7)this.devicePage("/hjjk/wrkfkzq/ptytjview/report");
			if(DeviceType==8)this.devicePage("/hjjk/wrkfkzq/hwktview/report");
			if(DeviceType==9)this.devicePage("/hjjk/wrkfkzq/jmktview/report");
			if(DeviceType==11)this.devicePage("/hjjk/wrkfkzq/ddclview/report");
			if(DeviceType==12)this.devicePage("/hjjk/wrkfkzq/ycyview/report"); 
			if(DeviceType==17)this.devicePage("/hjjk/wrkfkzq/zdysbview/report"); 
		},
		getTime(date){
			var year = date.getFullYear();
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			var hour = date.getHours()< 10 ? "0" + date.getHours() : date.getHours();
			return year+'/'+month+'/'+day+' '+hour;
		},
		showAuto(){
		    var endDate = new Date();
			var startDate=new Date();
			if(this.sttime==0)
				startDate=new Date(endDate.getTime()-86400000);
			else if(this.sttime==1)
				startDate=new Date(endDate.getTime()-86400000*7);
			else if(this.sttime==2)
				startDate=new Date(endDate.getTime()-86400000*30);
			else if(this.sttime==3)
				startDate=new Date(endDate.getTime()-86400000*365);
			var startdate=this.getTime(startDate)
			var enddate=this.getTime(endDate)
				
			var indata={}
			indata['cmd']='60001';
			indata['localip']='127.0.0.1';
			indata['hostname']='222.222.126.240';
			indata['port']='8006';
			indata['method']='UnmannedKFPTService/getHJSJBySpecific';
			indata['jsonin']='{"ip":"'+$('#HostName').html()+'","deviceType":"12","deviceNo":"'+this.DeviceID+'","startDate": "'+startdate+'","endDate": "'+enddate+'"}';
			//console.log(indata)
			console.log(JSON.stringify(indata))
			$('#url').html(indata['method']);
			$('#jsonin').html(indata['jsonin']);
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid',indata).then(
                success => {

						let Obj=success.data;

						$("#datadeviceNo").html(this.DeviceID+"#");
						$("#dataTXZT").html(Obj.flag=='1'?'在线':"离线");//通讯状态

						
						if(Obj.flag==1)
						{
							//this.$message.success('数据获取成功！');
							this.tableData=Obj.data.list;
						}
						else 
						{
							this.$message.error(Obj.msg);
						}
                },
                error => {
                    console.log(error, '数据获取失败！');
                })
		},
    },
};
</script>
<style lang="scss" scoped>
</style>