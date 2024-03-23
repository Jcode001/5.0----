<!-- 除湿机界面 -->
<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
			<img style="position:absolute;left:0%;top:0%;width:100%;height:100%" src="./pic2.png" />
			<div
				style="position:absolute;left:70%;top:3.8%;width:25%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
				<el-button type="primary" size="big" @click="devicePage(`/hjjk/wrkfkzq/csqview/index`)"
					disabled>设备页面</el-button>
				<el-button type="primary" size="big" @click="devicePage(`/hjjk/wrkfkzq/csqview/report`)">数据报表</el-button>
				<el-button type="primary" size="big" @click="devicePage(`/hjjk/wrkfkzq/csqview/chart`)">数据曲线</el-button>
			</div>
			<span style="position:absolute;left:13%;top:31%;font-size:28px;color:#036ff6" id="datatemp"></span>
			<span style="position:absolute;left:32%;top:31%;font-size:25px;color:#036ff6" id="pm2_5"></span>
			<span style="position:absolute;left:52%;top:31%;font-size:25px;color:#036ff6" id="datahum"></span>
			<div
				style="position:absolute;left:7%;top:50%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
				开关机
				<el-button id="btnopen" @click="btnopen()"
					style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">开</el-button>
				<el-button id="btnclose" @click="btnclose()"
					style="width:10%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">关</el-button>
				&emsp;&emsp;&emsp;
				模&emsp;式
				<el-button id="btnmode1" @click="btnmode1()"
					style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">手动</el-button>
				<el-button id="btnmode2" @click="btnmode2()"
					style="width:10%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">自动</el-button>
				&emsp;&emsp;&emsp;&emsp;
				除湿状态：
				<span style="color:#036ff6;" id="dataCSZT"></span>
			</div>
			<!-- <div
				style="position:absolute;left:7%;top:60%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
				风&emsp;速
				<el-button id="fsstate0" @click="fsstate0()"
					style="width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px 0 0 20px;font-size:18px;outline:medium">关</el-button>
				<el-button id="fsstate1" @click="fsstate1()"
					style="width:5%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;font-size:18px;outline:medium">低</el-button>
				<el-button id="fsstate2" @click="fsstate2()"
					style="width:5%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;font-size:18px;outline:medium">中</el-button>
				<el-button id="fsstate3" @click="fsstate3()"
					style="width:5%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;font-size:18px;border-radius:0 20px 20px 0;outline:medium">高</el-button>
			</div> -->
			<div
				style="position:absolute;left:7%;top:73%;width:60%;height:40px;border:0px solid red;font-size:19px;line-height:40px;">
				湿度上限
				<input id="maxHum" type="text"
					style="width:23%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"
					value="0" />
				<span style="color:#9f9f9f;">%RH</span>
				<el-button id="btnHumSet" @click="btnHumSet()"
					style="width:10%;height:100%;border:0;color:#ffffff;background-color:#036ff6;font-size:18px;border-radius:20px;">确认</el-button>
			</div>
			<el-select v-model="DeviceType"
				style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none"
				@change="showlist()">
				<el-option label="智能无人库房自控管理控制器" value="0"></el-option>
				<el-option v-for="item in equipmentModel" :value="item.value" :key="item.value" :label="item.name">{{
					item.name
				}}</el-option>
				<!-- <el-option label="净化除酸型除湿加湿一体机" value="1"></el-option>
								<el-option label="健康防护一体机" value="2"></el-option>
								<el-option label="壁挂式新风净化机" value="3"></el-option>
								<el-option label="酸性气体空气净化机" value="4"></el-option>
								<el-option label="加湿机" value="5"></el-option>
								<el-option label="除湿机" value="6" selected></el-option>
								<el-option label="普通一体机" value="7"></el-option>
								<el-option label="红外空调" value="8"></el-option>
								<el-option label="精密空调" value="9"></el-option>
								<el-option label="智能电动窗帘" value="11"></el-option>
								<el-option label="空气质量云测仪" value="12"></el-option>
								<el-option label="自定义设备" value="17"></el-option> -->
			</el-select>
			<div style="position:absolute;left:6%;bottom:8%;font-size:15px;color:#036ff6">
				设备编号：<span id="datadeviceNo"></span>
				&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
				<span style="display:none;">库房索引：<span id="StoreId"></span></span>
				&emsp;&emsp;库房名称：<span id="StoreName"></span>
				<span style="display:none;">设备索引：<span id="ACId"></span></span>
				&emsp;&emsp;设备名称：<span id="ACName"></span>
				<span style="display:none;">IP地址：<span id="HostName"></span></span>
				<span style="display:none;">端口：<span id="HttpPort"></span></span>
				<span style="display:none;"><span id="AcLx"></span></span>
			</div>
			<el-select v-model="DeviceID" id="DeviceID"
				style="position:absolute;right:5%;top:20%;width:25%;height:0;border:1px solid #e6eef8;border-radius:6px;outline:none"
				@change="showAuto()">
				<el-option v-for="items in numberOfDevices" :value="items.value" :key="items.value" :label="items.name">{{
					items.name
				}}</el-option>
				<!-- <option value="0" selected>1号除湿机</option>
								<option value="1">2号除湿机</option>
								<option value="2">3号除湿机</option>
								<option value="3">4号除湿机</option>
								<option value="4">5号除湿机</option>
								<option value="5">6号除湿机</option>
								<option value="6">7号除湿机</option>
								<option value="7">8号除湿机</option>
								<option value="8">9号除湿机</option>
								<option value="9">10号除湿机</option>
								<option value="10">11号除湿机</option>
								<option value="11">12号除湿机</option> -->
			</el-select>
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
			DeviceType: "6",
			DeviceID: "0",
			looptimer: 0,
			equipmentModel: [],//设备信息
			numberOfDevices: [],///设备数量
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

		if ((sessionStorage.getItem('StoreName') != undefined) && (sessionStorage.getItem('ACName') != undefined) && (sessionStorage.getItem('HostName') != undefined)) {
			$("#StoreName").html(sessionStorage.getItem('StoreName'))
			$("#ACName").html(sessionStorage.getItem('ACName'))
			$("#HostName").html(sessionStorage.getItem('HostName'))
			this.showAuto();
			this.loopTime = setInterval(this.showAuto, 1000 * 10);
		}
		bus.$on('hjjkmenu', (data) => {
			this.equipmentModel = []//设备信息
			this.numberOfDevices = []///设备数量
			this.deviceInformation()
			console.log(data, 'data消息传递');
			sessionStorage.setItem("StoreName", data.StoreName)
			sessionStorage.setItem("ACName", data.label)
			sessionStorage.setItem("HostName", data.HostName);
			$("#StoreName").html(data.StoreName)
			$("#ACName").html(data.label)
			$("#HostName").html(data.HostName)
			this.showAuto();
			if (this.loopTime != undefined) {
				clearInterval(this.loopTime);
			}
			this.loopTime = setInterval(this.showAuto, 1000 * 10);
		})
		this.equipmentModel = []//设备信息
		this.numberOfDevices = []///设备数量
		this.deviceInformation();
	},
	beforeDestroy() {
		clearInterval(this.loopTime);
		this.loopTime = undefined;
		bus.$off('hjjkmenu')
	},
	methods: {
		///获取设备信息和设备数量
		deviceInformation() {
			let indata = {
				"warehouseId": "18",
				"controllerId": "3"
			}
			axios.get("http://" + this.ServeIp + ":" + this.ServePort + `/settingDeviceShow/getAll?warehouseId=${sessionStorage.getItem("StoreId")}&controllerId=${sessionStorage.getItem("ACId")}`).then(
				success => {
					if (success.data.data == null) {
						return this.open3("请前往设备中心设置设备数量")
					}
					let device = Object.keys(success.data.data.devices.CSJ).length;
					for (let i = 1; i < device + 1; i++) {
						let deviceFacility = success.data.data.devices.CSJ[i];
						if (deviceFacility == "true") {
							this.numberOfDevices.push({
								name: i + "除湿机",
								value: String(i - 1),
							})
						}
					}
					// this.equipmentModel
					for (let i = 0; i < Object.keys(success.data.data.devices).length; i++) {
						let deviceName = Object.keys(success.data.data.devices)[i];
						let deviceData = success.data.data.devices[deviceName];
						// console.log(deviceName + "=======");
						let flag = false;
						for (let j = 0; j < Object.keys(deviceData).length; j++) {
							let value = deviceData[Object.keys(deviceData)[j]];
							if (value == "true") {
								flag = true;
							}
							// console.log("key:" + Object.keys(deviceData)[j] + "value:" + value);
						}
						if (flag) {
							switch (deviceName) {
								case 'CSXJSCSYTJ':
									this.equipmentModel.push(
										{
											name: "净化除酸型除湿加湿一体机",
											value: "1",
										})
									break;
								case 'JKFHYTJ':
									this.equipmentModel.push(
										{
											name: "健康防护一体机",
											value: "2",
										})
									break;
								case 'BGSXFJ':
									this.equipmentModel.push({
										name: "壁挂式新风净化机",
										value: "3",
									})
									break;
								case 'CSXKQJHJ':
									this.equipmentModel.push({
										name: "酸性气体空气净化机",
										value: "4",
									})
									break;
								case 'JSJ':
									this.equipmentModel.push({
										name: "加湿机",
										value: "5",
									})
									break;
								case 'CSJ':
									this.equipmentModel.push({
										name: "除湿机",
										value: "6",
									})
									break;
								case 'PTYTJ':
									this.equipmentModel.push({
										name: "普通一体机",
										value: "7",
									})
									break;
								case 'HWKT':
									this.equipmentModel.push({
										name: "红外空调",
										value: "8",
									})
									break;
								case 'JMKT':
									this.equipmentModel.push({
										name: "精密空调",
										value: "9",
									})
									break;
								case 'KQZLYCY':
									this.equipmentModel.push({
										name: "空气质量云测仪",
										value: "12",
									})
									break;
								case 'ZNDDCL':
									this.equipmentModel.push({
										name: "智能电动窗帘",
										value: "11",
									})
									break;
								case 'ZDYSB':
									this.equipmentModel.push({
										name: "自定义设备",
										value: "17",
									})
									break;
								default:
									break;
							}

						}
					}
					console.log(this.numberOfDevices);
					console.log(this.equipmentModel);
				},
				error => {
					console.log(error, '获取库房列表接口--返回失败的数据');
				})
		},
		devicePage(page) {
			clearInterval(this.loopTime);
			this.$router.push({ path: this.redirect || page })
		},
		showlist() {
			clearInterval(this.loopTime);
			this.loopTime = undefined;
			let DeviceType = this.DeviceType;
			if (DeviceType == 0) this.devicePage("/hjjk");
			if (DeviceType == 1) this.devicePage("/hjjk/wrkfkzq/ytjview/index");
			if (DeviceType == 2) this.devicePage("/hjjk/wrkfkzq/jkytfhjview/index");
			if (DeviceType == 3) this.devicePage("/hjjk/wrkfkzq/bgsxfjview/index");
			if (DeviceType == 4) this.devicePage("/hjjk/wrkfkzq/sxqtjhjview/index");
			if (DeviceType == 5) this.devicePage("/hjjk/wrkfkzq/jsqview/index");
			if (DeviceType == 6) this.devicePage("/hjjk/wrkfkzq/csqview/index");
			if (DeviceType == 7) this.devicePage("/hjjk/wrkfkzq/ptytjview/index");
			if (DeviceType == 8) this.devicePage("/hjjk/wrkfkzq/hwktview/index");
			if (DeviceType == 9) this.devicePage("/hjjk/wrkfkzq/jmktview/index");
			if (DeviceType == 11) this.devicePage("/hjjk/wrkfkzq/ddclview/index");
			if (DeviceType == 12) this.devicePage("/hjjk/wrkfkzq/ycyview/index");
			if (DeviceType == 17) this.devicePage("/hjjk/wrkfkzq/zdysbview/index");
		},
		showAuto() {
			if ($('#HostName').html() == "") return;
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/getStatus",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\"}"
			}
			this.getdata(indata, 'msg');
		},
		open3(data) {
			this.$message({
				message: data,
				type: 'warning'
			});
		},
		getdata(indata, ctlname) {
			// $("#datadeviceNo").html((Number(this.DeviceID) + 1) + "#");
			// $("#dataTXZT").html("离线");
			// $("#datatemp").html("<i style='color:black'>0<small>°C</small></i>");
			// $("#pm2_5").html("<i style='color:black'>0<small>ug/m³</small></i>");
			// $("#datahum").html("<i style='color:black'>0<small>%RH</small></i>");
			// $("#CO2").html("<i style='color:black'>0<small>ppm</small></i>");
			// $("#fsstate").html("关");
			// $("#btnclose").css("color", "#ffffff");
			// $("#btnclose").css("background-color", "#036ff6");
			// $("#btnopen").css("color", "#036ff6");
			// $("#btnopen").css("background-color", "#ffffff");
			// $("#btnmode1").css("color", "#ffffff");
			// $("#btnmode1").css("background-color", "#036ff6");
			// $("#btnmode2").css("color", "#036ff6");
			// $("#btnmode2").css("background-color", "#ffffff");
			// $("#fsstate0").css("color", "#ffffff");
			// 	$("#fsstate0").css("background-color", "#036ff6");
			// 	$("#fsstate1").css("color", "#036ff6");
			// 	$("#fsstate1").css("background-color", "#ffffff");
			// 	$("#fsstate2").css("color", "#036ff6");
			// 	$("#fsstate2").css("background-color", "#ffffff");
			// 	$("#fsstate3").css("color", "#036ff6");
			// 	$("#fsstate3").css("background-color", "#ffffff");
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					if (success.data?.data == undefined) {
						//return this.open3("没有数据")
						return
					}
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					$("#" + ctlname).html(data);
					var data1 = JSON.stringify(Obj.data);
					if (data1 == undefined) return;
					data1 = data1.replace(/"([^"]*)":/g, "\"data$1\":");
					var obj1 = JSON.parse(data1);
					console.log(data)
					var DeviceID = this.DeviceID;
					console.log(JSON.stringify(obj1.data6[DeviceID]))
					$("#datadeviceNo").html(obj1.data6[DeviceID].datadeviceNo);
					$("#dataTXZT").html(obj1.data6[DeviceID].dataTXZT == 1 ? "离线" : "在线");
					$("#datatemp").html("<i style='color:black'>" + obj1.data6[DeviceID].datatemp + "<small>°C</small></i>");
					$("#datahum").html("<i style='color:black'>" + obj1.data6[DeviceID].datahum + "<small>%RH</small></i>");
					$("#pm2_5").html("<i style='color:black'>" + obj1.data6[DeviceID].datapm2_5 + "<small>ug/m³</small></i>");
					$("#dataCSZT").html(obj1.data6[DeviceID].dataCS == 1 ? "开启" : "关闭");
					$("#maxHum").val(obj1.data6[DeviceID].dataCSSD);
					var fsstate = obj1.data6[DeviceID].dataFJZT;
					this.UpdateFSStates(fsstate);
					if (obj1.data6[DeviceID].datapowerZT == 1) {
						$("#btnopen").css("color", "#ffffff");
						$("#btnopen").css("background-color", "#036ff6");
						$("#btnclose").css("color", "#036ff6");
						$("#btnclose").css("background-color", "#ffffff");
					} else {
						$("#btnclose").css("color", "#ffffff");
						$("#btnclose").css("background-color", "#036ff6");
						$("#btnopen").css("color", "#036ff6");
						$("#btnopen").css("background-color", "#ffffff");
					}
					if (obj1.data6[DeviceID].dataGZMS == 1) {
						$("#btnmode2").css("color", "#ffffff");
						$("#btnmode2").css("background-color", "#036ff6");
						$("#btnmode1").css("color", "#036ff6");
						$("#btnmode1").css("background-color", "#ffffff");
					} else {
						$("#btnmode1").css("color", "#ffffff");
						$("#btnmode1").css("background-color", "#036ff6");
						$("#btnmode2").css("color", "#036ff6");
						$("#btnmode2").css("background-color", "#ffffff");
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		UpdateFSStates(fsstate) {

			if (fsstate == 0) {
				$("#fsstate0").css("color", "#ffffff");
				$("#fsstate0").css("background-color", "#036ff6");
				$("#fsstate1").css("color", "#036ff6");
				$("#fsstate1").css("background-color", "#ffffff");
				$("#fsstate2").css("color", "#036ff6");
				$("#fsstate2").css("background-color", "#ffffff");
				$("#fsstate3").css("color", "#036ff6");
				$("#fsstate3").css("background-color", "#ffffff");
			}
			else if (fsstate == 1) {
				$("#fsstate0").css("color", "#036ff6");
				$("#fsstate0").css("background-color", "#ffffff");
				$("#fsstate1").css("color", "#ffffff");
				$("#fsstate1").css("background-color", "#036ff6");
				$("#fsstate2").css("color", "#036ff6");
				$("#fsstate2").css("background-color", "#ffffff");
				$("#fsstate3").css("color", "#036ff6");
				$("#fsstate3").css("background-color", "#ffffff");
			}
			else if (fsstate == 2) {
				$("#fsstate0").css("color", "#036ff6");
				$("#fsstate0").css("background-color", "#ffffff");
				$("#fsstate1").css("color", "#036ff6");
				$("#fsstate1").css("background-color", "#ffffff");
				$("#fsstate2").css("color", "#ffffff");
				$("#fsstate2").css("background-color", "#036ff6");
				$("#fsstate3").css("color", "#036ff6");
				$("#fsstate3").css("background-color", "#ffffff");
			}
			else if (fsstate == 3) {
				$("#fsstate0").css("color", "#036ff6");
				$("#fsstate0").css("background-color", "#ffffff");
				$("#fsstate1").css("color", "#036ff6");
				$("#fsstate1").css("background-color", "#ffffff");
				$("#fsstate2").css("color", "#036ff6");
				$("#fsstate2").css("background-color", "#ffffff");
				$("#fsstate3").css("color", "#ffffff");
				$("#fsstate3").css("background-color", "#036ff6");
			}
		},
		btnopen() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

			$("#btnopen").css("color", "#ffffff");
			$("#btnopen").css("background-color", "#036ff6");
			$("#btnclose").css("color", "#036ff6");
			$("#btnclose").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedPower",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\":6,\"deviceNo\":\"" + $("#datadeviceNo").html() + "\",\"operaFlag\":1}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnclose() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);
			$("#btnclose").css("color", "#ffffff");
			$("#btnclose").css("background-color", "#036ff6");
			$("#btnopen").css("color", "#036ff6");
			$("#btnopen").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedPower",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\":\"6\",\"deviceNo\":\"" + $("#datadeviceNo").html() + "\",\"operaFlag\":\"0\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnmode1() {

			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);
			if (false) {
				$("#btnmode2").css("color", "#ffffff");
				$("#btnmode2").css("background-color", "#036ff6");
				$("#btnmode1").css("color", "#036ff6");
				$("#btnmode1").css("background-color", "#ffffff");
			}
			else {
				$("#btnmode1").css("color", "#ffffff");
				$("#btnmode1").css("background-color", "#036ff6");
				$("#btnmode2").css("color", "#036ff6");
				$("#btnmode2").css("background-color", "#ffffff");
			}
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedModel",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\":6,\"deviceNo\":\"" + $("#datadeviceNo").html() + "\",\"operaFlag\":0}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnmode2() {

			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);
			if (true) {
				$("#btnmode2").css("color", "#ffffff");
				$("#btnmode2").css("background-color", "#036ff6");
				$("#btnmode1").css("color", "#036ff6");
				$("#btnmode1").css("background-color", "#ffffff");
			}
			else {
				$("#btnmode1").css("color", "#ffffff");
				$("#btnmode1").css("background-color", "#036ff6");
				$("#btnmode2").css("color", "#036ff6");
				$("#btnmode2").css("background-color", "#ffffff");
			}
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedModel",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\":6,\"deviceNo\":\"" + $("#datadeviceNo").html() + "\",\"operaFlag\":1}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		fsstate0() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);
			var operaFlag = 0;
			this.UpdateFSStates(operaFlag)
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedFS",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\":6,\"deviceNo\":\"" + $("#datadeviceNo").html() + "\",\"operaFlag\":" + operaFlag + "}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		fsstate1() {

			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);
			var operaFlag = 1;
			this.UpdateFSStates(operaFlag)
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedFS",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\":6,\"deviceNo\":\"" + $("#datadeviceNo").html() + "\",\"operaFlag\":" + operaFlag + "}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		fsstate2() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);
			var operaFlag = 2;
			this.UpdateFSStates(operaFlag)
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedFS",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\":6,\"deviceNo\":\"" + $("#datadeviceNo").html() + "\",\"operaFlag\":" + operaFlag + "}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		fsstate3() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);
			var operaFlag = 3;
			this.UpdateFSStates(operaFlag)
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedFS",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\":6,\"deviceNo\":\"" + $("#datadeviceNo").html() + "\",\"operaFlag\":" + operaFlag + "}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnHumSet() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedJSCSLimit",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"deviceType\": \"6\",\"deviceNo\": \"" + $("#datadeviceNo").html() + "\",\"maxHum\":" + $("#maxHum").val() + "}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
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
	height: 16.5vw !important;

}

.kfcode {
	width: 100%;
}
</style>











<!-- 

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>除湿器界面</title>
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
				if(DeviceType==0)window.location.href="../wrkfkzqview/index.html"; 
				if(DeviceType==1)window.location.href="../ytjview/index.html"; 
				if(DeviceType==2)window.location.href="../jkytfhjview/index.html"; 
				if(DeviceType==3)window.location.href="../bgsxfjview/index.html"; 
				if(DeviceType==4)window.location.href="../sxqtjhjview/index.html"; 
				if(DeviceType==5)window.location.href="../jsqview/index.html"; 
				if(DeviceType==6)window.location.href="../csqview/index.html"; 
				if(DeviceType==7)window.location.href="../ptytjview/index.html";
				if(DeviceType==8)window.location.href="../hwktview/index.html";
				if(DeviceType==9)window.location.href="../jmktview/index.html";
				if(DeviceType==11)window.location.href="../ddclview/index.html";
				if(DeviceType==12)window.location.href="../ycyview/index.html"; 
				if(DeviceType==17)window.location.href="../zdysbview/index.html";  
			}) 
		})
		$(function(){
			 function onmyload(){
				$("#minHum").val($.cookie('minHum'))
				$("#maxHum").val($.cookie('maxHum'))
				$("#minTemp").val($.cookie('minTemp'))
				$("#maxTemp").val($.cookie('maxTemp'))
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
								if(Obj.data[i].AcLx==2)continue;
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
								item+="   	window.location.href = '/hjjk/qykzq/qykzqview/index.html';";
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
			
		})
	</script>
</head>
 -->