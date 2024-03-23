<!-- 智能无人库房自控管理控制器（运行状态） -->
<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<!-- <i class="el-icon-s-home"  /> -->
		<!-- <el-dialog title="库房管理" width="80%" top="10vh" center :visible.sync="isShowSetting" @close="dialogClose()"> -->
		<div style="display:flex;">
			<div style="margin-left:.5vw;position:relative;width: 90vw;">
				<div
					style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
					<img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="./pic2.png" />
					<!-- <div style="position:absolute;left:70%;top:3.8%;width:25%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
							<el-button type="primary" size="big" @click="devicePage(`/hjjk`)" disabled>设备页面</el-button>
							<el-button type="primary" size="big" @click="devicePage(`/hjjk1-3`)">数据报表</el-button>
							<el-button type="primary" size="big" @click="devicePage(`/hjjk1-4`)">数据曲线</el-button>
						</div> -->
					<div style="position:relative;left:5%;top:16%;width:30%;height:5%;">
						<span style="color:black;font-size:23px;text-decoration:none;cursor: pointer;"
							@click='devicePage("/hjjk")'>基础参数</span>&emsp;&emsp;&emsp;
						<span style="color:rgb(64,158,255);font-size:23px;text-decoration:none;cursor: pointer;"
							@click='devicePage("/hjjk1-2")'>运行状态</span>
						<div
							style="position:absolute;left:27.5%;bottom:0%;width:20%;height:4px;background-color:rgb(64,158,255);">
						</div>
					</div>
					<div
						style="position:absolute;left:5%;top:26%;width:60%;height:40px;border:0px solid ;font-size:36;line-height:40px">
						开&ensp;关&ensp;机：

						<el-button id="btnopen" size="big" type="primary" round style="width:5.20vw;"
							@click="btnopen">开</el-button>
						<el-button id="btnclose" size="big" type="primary" round style="width:5.20vw;"
							@click="btnclose">关</el-button>
						&emsp;&emsp;
						设备模式：
						<el-button id="btnmode1" size="big" type="primary" round style="width:5.20vw;"
							@click="btnmode1">手动</el-button>
						<el-button id="btnmode2" size="big" type="primary" round style="width:5.20vw;"
							@click="btnmode2">自动</el-button>
						&emsp;&emsp;
						开关灯：
						<el-button id="btndgopen" size="big" type="primary" round style="width:5.20vw;"
							@click="btndgopen">开</el-button>
						<el-button id="btndgclose" size="big" type="primary" round style="width:5.20vw;"
							@click="btndgclose">关</el-button>
					</div>
					<div
						style="position:absolute;left:5%;top:36%;width:60%;height:40px;border:0px solid ;font-size:36;line-height:40px">
						窗&emsp;&emsp;帘：
						<el-button id="btnclopen" size="big" type="primary" round style="width:5.20vw;"
							@click="btnclopen">开</el-button>
						<el-button id="btnclclose" size="big" type="primary" round style="width:5.20vw;"
							@click="btnclclose">关</el-button>
						&emsp;&emsp;
						窗帘模式：
						<el-button id="btnclmode1" size="big" type="primary" round style="width:5.20vw;"
							@click="btnclmode1">未联动</el-button>
						<el-button id="btnclmode2" size="big" type="primary" round style="width:5.20vw;"
							@click="btnclmode2">联动</el-button>
					</div>
					<div
						style="position:absolute;left:5%;top:45%;width:60%;height:3vw;border:0px solid ;font-size:36;line-height:40px;">
						温度范围：
						<el-input v-model="minTemp" type="text" style="width:3vw;" value="0" />
						~
						<el-input v-model="maxTemp" type="text" style="width:3vw;" value="0" />
						<span style="color:#9f9f9f;"> ℃ </span>
						<el-button id="btnTempSet" size="big" type="primary" round style="width:5.20vw;margin-left:.6vw;"
							@click="btnTempSet">确认</el-button>
					</div>
					<div
						style="position:absolute;left:5%;top:55%;width:60%;height:3vw;border:0px solid ;font-size:36;line-height:40px;">
						湿度范围：
						<el-input v-model="minHum" type="text" style="width:3vw;" value="0" />
						~
						<el-input v-model="maxHum" type="text" style="width:3vw;" value="0" />
						<span style="color:#9f9f9f;">%RH</span>
						<el-button id="btnHumSet" size="big" type="primary" round style="width:5.20vw;"
							@click="btnHumSet">确认</el-button>



					</div>

					<el-select v-model="DeviceType"
						style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none"
						@change="showlist()">
						<el-option label="智能无人库房自控管理控制器" value="0" selected></el-option>
						<el-option v-for="item in equipmentModel" :value="item.value" :key="item.value"
							:label="item.name">{{
								item.name
							}}</el-option>
						<!-- <el-option label="净化除酸型除湿加湿一体机" value="1"></el-option>
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
							<el-option label="自定义设备" value="17"></el-option> -->
					</el-select>
					<div style="position:absolute;left:3%;bottom:7%;font-size:17px;color:#036ff6">
						设备编号：<span id="datadeviceNo"></span>
						&emsp;&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
						<span style="display:none;">库房索引：<span id="StoreId"></span></span>
						&emsp;&emsp;&emsp;&emsp;库房名称：<span id="StoreName"></span>
						<span style="display:none;">&nbsp;设备索引：<span id="ACId"></span></span>
						&emsp;&emsp;&emsp;&emsp;设备名称：<span id="ACName"></span>
						&emsp;&emsp;&emsp;&emsp;IP地址：<span id="HostName"></span>
						<span style="display:none;">端口：<span id="HttpPort"></span></span>
						<span style="display:none;"><span id="AcLx"></span></span>
					</div>
					<el-select v-model="DeviceID"
						style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none;display: none;"
						@change="showAuto()">
						<el-option value="0" label="智能无人库房自控管理控制器界面1" selected></el-option>
					</el-select>
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
			DeviceType: "0",
			DeviceID: "0",
			minTemp: '16',
			maxTemp: '30',
			minHum: '45',
			maxHum: '60',
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
		this.deviceInformation()

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
					// let device = Object.keys(success.data.data.devices.BGSXFJ).length;
					// for (let i = 1; i < device + 1; i++) {
					// 	let deviceFacility = success.data.data.devices.BGSXFJ[i];
					// 	if (deviceFacility == "true") {
					// 		this.numberOfDevices.push({
					// 			name: i + "号壁挂式新风净化机",
					// 			value: String(i)+"#",
					// 		})
					// 	}
					// }
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
				"method": "UnmannedKFPTService/getTotalRunState",
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
			// this.minHum = 0
			// this.maxHum = 0
			// this.minTemp = 0
			// this.maxTemp = 0
			// $("#btnclose").css("color", "#ffffff");
			// $("#btnclose").css("background-color", "#036ff6");
			// $("#btnopen").css("color", "#036ff6")
			// $("#btnopen").css("background-color", "#ffffff");
			// $("#btnmode2").css("color", "#ffffff");
			// $("#btnmode2").css("background-color", "#036ff6");
			// $("#btnmode1").css("color", "#036ff6");
			// $("#btnmode1").css("background-color", "#ffffff");
			// $("#btnclclose").css("color", "#ffffff");
			// $("#btnclclose").css("background-color", "#036ff6");
			// $("#btnclopen").css("color", "#036ff6");
			// $("#btnclopen").css("background-color", "#ffffff");
			// $("#btnclmode1").css("color", "#ffffff");
			// $("#btnclmode1").css("background-color", "#036ff6");
			// $("#btnclmode2").css("color", "#036ff6");
			// $("#btnclmode2").css("background-color", "#ffffff");
			// $("#btndgclose").css("color", "#ffffff");
			// $("#btndgclose").css("background-color", "#036ff6");
			// $("#btndgopen").css("color", "#036ff6");
			// $("#btndgopen").css("background-color", "#ffffff");

			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					if (success.data?.data == undefined) {
						//return this.open3("没有数据")
						return
					}
					let Obj = success.data;
					if (Obj.data == undefined) return;
					var data1 = JSON.stringify(Obj.data.HKYXZT[0]);
					var obj1 = JSON.parse(data1);
					console.log(obj1, 'data11111111111');
					$("#datadeviceNo").html("1#");
					$("#dataTXZT").html(Obj.flag == '1' ? '在线' : "离线");//通讯状态
					var obj2 = Obj.data.SRFCSZT[0];
					this.minHum = obj2.SDKZXX
					this.maxHum = obj2.SDKZSX
					this.minTemp = obj2.WDKZXX
					this.maxTemp = obj2.WDKZSX
					if (obj2.YJKGJ == 0) {
						// alert("设备已撤防");
						$("#btnclose").css("color", "#ffffff");
						$("#btnclose").css("background-color", "#036ff6");
						$("#btnopen").css("color", "#036ff6");
						$("#btnopen").css("background-color", "#ffffff");
					} else {
						$("#btnopen").css("color", "#ffffff");
						$("#btnopen").css("background-color", "#036ff6");
						$("#btnclose").css("color", "#036ff6");
						$("#btnclose").css("background-color", "#ffffff");
					}
					if (obj2.YJSZD == 0) {
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
					if (obj2.YJKGC == 0) {
						$("#btnclclose").css("color", "#ffffff");
						$("#btnclclose").css("background-color", "#036ff6");
						$("#btnclopen").css("color", "#036ff6");
						$("#btnclopen").css("background-color", "#ffffff");
					} else {
						$("#btnclopen").css("color", "#ffffff");
						$("#btnclopen").css("background-color", "#036ff6");
						$("#btnclclose").css("color", "#036ff6");
						$("#btnclclose").css("background-color", "#ffffff");
					}
					if (obj2.CLLD == 0) {
						$("#btnclmode1").css("color", "#ffffff");
						$("#btnclmode1").css("background-color", "#036ff6");
						$("#btnclmode2").css("color", "#036ff6");
						$("#btnclmode2").css("background-color", "#ffffff");
					} else {
						$("#btnclmode2").css("color", "#ffffff");
						$("#btnclmode2").css("background-color", "#036ff6");
						$("#btnclmode1").css("color", "#036ff6");
						$("#btnclmode1").css("background-color", "#ffffff");
					};
					if (obj2.YJKGD == 1) {
						$("#btndgopen").css("color", "#ffffff");
						$("#btndgopen").css("background-color", "#036ff6");
						$("#btndgclose").css("color", "#036ff6");
						$("#btndgclose").css("background-color", "#ffffff");
					} else {
						$("#btndgclose").css("color", "#ffffff");
						$("#btndgclose").css("background-color", "#036ff6");
						$("#btndgopen").css("color", "#036ff6");
						$("#btndgopen").css("background-color", "#ffffff");
					}


				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnopen() {
			// if(false)
			// {
			//    $("#btnclose").css("color","#ffffff");
			//    $("#btnclose").css("background-color","#036ff6");
			//    $("#btnopen").css("color","#ffffff");
			//    $("#btnopen").css("background-color","#036ff6");
			// }
			// else
			// {
			//    $("#btnclose").css("color","#ffffff");
			//    $("#btnclose").css("background-color","#036ff6");
			//    $("#btnopen").css("color","#ffffff");
			//    $("#btnopen").css("background-color","#036ff6");
			// }
			$("#btnopen").css("color", "#ffffff");
			$("#btnopen").css("background-color", "#036ff6");
			$("#btnclose").css("color", "#036ff6");
			$("#btnclose").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllPower",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"operaFlag\":1}"
			}
			console.log(indata);
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnclose() {
			//  if(true)
			// {
			// 	$("#btnclose").css("color","#ffffff");
			//    $("#btnclose").css("background-color","#036ff6");
			//    $("#btnopen").css("color","#ffffff");
			//    $("#btnopen").css("background-color","#036ff6");
			// }
			// else
			// {
			//    $("#btnclose").css("color","#ffffff");
			//    $("#btnclose").css("background-color","#036ff6");
			//    $("#btnopen").css("color","#ffffff");
			//    $("#btnopen").css("background-color","#036ff6");
			// }
			$("#btnopen").css("color", "#036ff6");
			$("#btnopen").css("background-color", "#ffffff");
			$("#btnclose").css("color", "#ffffff");
			$("#btnclose").css("background-color", "#036ff6");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllPower",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"operaFlag\":0}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnmode1() {
			// if (false) {
			// 	$("#btnmode2").css("color", "#ffffff");
			// 	$("#btnmode2").css("background-color", "#036ff6");
			// 	$("#btnmode1").css("color", "#ffffff");
			// 	$("#btnmode1").css("background-color", "#036ff6");
			// }
			// else {
			// 	$("#btnmode2").css("color", "#ffffff");
			// 	$("#btnmode2").css("background-color", "#036ff6");
			// 	$("#btnmode1").css("color", "#ffffff");
			// 	$("#btnmode1").css("background-color", "#036ff6");
			// }
			$("#btnmode2").css("color", "#036ff6");
			$("#btnmode2").css("background-color", "#ffffff");
			$("#btnmode1").css("color", "#ffffff");
			$("#btnmode1").css("background-color", "#036ff6");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllAuto",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"operaFlag\":\"0\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnmode2() {
			// if (true) {
			// 	$("#btnmode2").css("color", "#ffffff");
			// 	$("#btnmode2").css("background-color", "#036ff6");
			// 	$("#btnmode1").css("color", "#ffffff");
			// 	$("#btnmode1").css("background-color", "#036ff6");
			// }
			// else {
			// 	$("#btnmode2").css("color", "#ffffff");
			// 	$("#btnmode2").css("background-color", "#036ff6");
			// 	$("#btnmode1").css("color", "#ffffff");
			// 	$("#btnmode1").css("background-color", "#036ff6");
			// }
			$("#btnmode2").css("color", "#ffffff");
			$("#btnmode2").css("background-color", "#036ff6");
			$("#btnmode1").css("color", "#036ff6");
			$("#btnmode1").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllAuto",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"operaFlag\":\"1\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnclopen() {
			// if (false) {
			// 	$("#btnclclose").css("color", "#ffffff");
			// 	$("#btnclclose").css("background-color", "#036ff6");
			// 	$("#btnclopen").css("color", "#ffffff");
			// 	$("#btnclopen").css("background-color", "#036ff6");
			// }
			// else {
			// 	$("#btnclclose").css("color", "#ffffff");
			// 	$("#btnclclose").css("background-color", "#036ff6");
			// 	$("#btnclopen").css("color", "#ffffff");
			// 	$("#btnclopen").css("background-color", "#036ff6");
			// }
			$("#btnclclose").css("color", "#036ff6");
			$("#btnclclose").css("background-color", "#ffffff");
			$("#btnclopen").css("color", "#ffffff");
			$("#btnclopen").css("background-color", "#036ff6");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllWindows",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"operaFlag\":\"1\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnclclose() {
			// if (true) {
			// 	$("#btnclclose").css("color", "#ffffff");
			// 	$("#btnclclose").css("background-color", "#036ff6");
			// 	$("#btnclopen").css("color", "#ffffff");
			// 	$("#btnclopen").css("background-color", "#036ff6");
			// }
			// else {
			// 	$("#btnclclose").css("color", "#ffffff");
			// 	$("#btnclclose").css("background-color", "#036ff6");
			// 	$("#btnclopen").css("color", "#ffffff");
			// 	$("#btnclopen").css("background-color", "#036ff6");
			// }
			$("#btnclclose").css("color", "#ffffff");
			$("#btnclclose").css("background-color", "#036ff6");
			$("#btnclopen").css("color", "#036ff6");
			$("#btnclopen").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllWindows",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"operaFlag\":\"0\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btndgopen() {
			// if (false) {
			// 	$("#btndgclose").css("color", "#ffffff");
			// 	$("#btndgclose").css("background-color", "#036ff6");
			// 	$("#btndgopen").css("color", "#ffffff");
			// 	$("#btndgopen").css("background-color", "#036ff6");
			// }
			// else {
			// 	$("#btndgclose").css("color", "#ffffff");
			// 	$("#btndgclose").css("background-color", "#036ff6");
			// 	$("#btndgopen").css("color", "#ffffff");
			// 	$("#btndgopen").css("background-color", "#036ff6");
			// }
			$("#btndgclose").css("color", "#036ff6");
			$("#btndgclose").css("background-color", "#ffffff");
			$("#btndgopen").css("color", "#ffffff");
			$("#btndgopen").css("background-color", "#036ff6");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllbulbs",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"operaFlag\":\"1\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btndgclose() {
			// if (true) {
			// 	$("#btndgclose").css("color", "#ffffff");
			// 	$("#btndgclose").css("background-color", "#036ff6");
			// 	$("#btndgopen").css("color", "#ffffff");
			// 	$("#btndgopen").css("background-color", "#036ff6");
			// }
			// else {
			// 	$("#btndgclose").css("color", "#ffffff");
			// 	$("#btndgclose").css("background-color", "#036ff6");
			// 	$("#btndgopen").css("color", "#ffffff");
			// 	$("#btndgopen").css("background-color", "#036ff6");
			// }
			$("#btndgclose").css("color", "#ffffff");
			$("#btndgclose").css("background-color", "#036ff6");
			$("#btndgopen").css("color", "#036ff6");
			$("#btndgopen").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllbulbs",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"operaFlag\":\"0\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnclmode1() {
			// if (false) {
			// 	$("#btnclmode2").css("color", "#ffffff");
			// 	$("#btnclmode2").css("background-color", "#036ff6");
			// 	$("#btnclmode1").css("color", "#ffffff");
			// 	$("#btnclmode1").css("background-color", "#036ff6");
			// }
			// else {
			// 	$("#btnclmode2").css("color", "#ffffff");
			// 	$("#btnclmode2").css("background-color", "#036ff6");
			// 	$("#btnclmode1").css("color", "#ffffff");
			// 	$("#btnclmode1").css("background-color", "#036ff6");
			// }
			$("#btnclmode2").css("color", "#036ff6");
			$("#btnclmode2").css("background-color", "#ffffff");
			$("#btnclmode1").css("color", "#ffffff");
			$("#btnclmode1").css("background-color", "#036ff6");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllCurtainLinkageParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"curtainLinkage\":\"0\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnclmode2() {
			// if (true) {
			// 	$("#btnclmode2").css("color", "#ffffff");
			// 	$("#btnclmode2").css("background-color", "#036ff6");
			// 	$("#btnclmode1").css("color", "#ffffff");
			// 	$("#btnclmode1").css("background-color", "#036ff6");
			// }
			// else {
			// 	$("#btnclmode2").css("color", "#ffffff");
			// 	$("#btnclmode2").css("background-color", "#036ff6");
			// 	$("#btnclmode1").css("color", "#ffffff");
			// 	$("#btnclmode1").css("background-color", "#036ff6");
			// }
			$("#btnclmode2").css("color", "#ffffff");
			$("#btnclmode2").css("background-color", "#036ff6");
			$("#btnclmode1").css("color", "#036ff6");
			$("#btnclmode1").css("background-color", "#ffffff");

			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllCurtainLinkageParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"curtainLinkage\":\"1\"}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
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
				"method": "UnmannedKFPTService/setUnmannedAllHLimit",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"minHum\":" + this.minHum + ",\"maxHum\":" + this.maxHum + "}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnTempSet() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllAirLimit",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"minTemp\":" + this.minTemp + ",\"maxTemp\":" + this.maxTemp + "}"
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						this.$message.success("命令执行成功" + data);
					}
					else {
						this.$message.error("命令执行失败" + data);
					}
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		}
	},
};
</script>
<style lang="scss" scoped></style>