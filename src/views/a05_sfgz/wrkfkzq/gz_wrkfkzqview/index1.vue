<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
			<img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="./pic01.png" />
			<div style="position:relative;left:5%;top:16%;width:30%;height:5%;">
				<span  style="color:black;font-size:23px;text-decoration:none;cursor: pointer;" @click='devicePage("/sfgz")'>基本参数</span>&emsp;&emsp;&emsp;
				<span
					style="color:blue;font-size:23px;text-decoration:none;cursor: pointer;" @click='devicePage("/sfgz/wrkfkzq/gz_wrkfkzqview/index1")'>运行状态</span>
				<div style="position:absolute;left:27.5%;bottom:0%;width:20%;height:4px;background-color:blue;"></div>
			</div>
			<div
				style="position:absolute;left:6%;top:27%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
				湿度范围：
				<input id="dataSDX" type="text"
					style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 2%;display: inline-block;">~</span>
				<input id="dataSDS" type="text"
					style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 6%;display: inline-block;">%RH</span>
				<button id="btnSetSD" @click="btnSetSD"
					style="margin-left: 1rem;margin-right:1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>
				温度范围：
				<input id="dataWDX" type="text"
					style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 2%;display: inline-block;">~</span>
				<input id="dataWDS" type="text"
					style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 6%;display: inline-block;">℃</span>
				<button id="btnSetWD" @click="btnSetWD"
					style="margin-left: 1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>&emsp;
			</div>
			<div
				style="position:absolute;left:6%;top:36%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
				防尘上限：
				<input id="dataFCS" type="text"
					style="width:22.5%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 6%;display: inline-block;">ug/m³</span>
				<button id="btnSetFCSX"  @click="btnSetFCSX"
					style="margin-left: 1rem;margin-right:1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>
				防尘回差：
				<input id="dataFCHC" type="text"
					style="width:22.5%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 6%;display: inline-block;">ug/m³</span>
				<button id="btnSetFCHC" @click="btnSetFCHC"
					style="margin-left: 1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>&emsp;
			</div>

			<div
				style="position:absolute;left:6%;top:45%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
				防光上限：
				<input id="dataFGS" type="text"
					style="width:22.5%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 6%;display: inline-block;">v/m³</span>
				<button id="btnSetFGSX" @click="btnSetFGSX"
					style="margin-left: 1rem;margin-right:1.1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>
				防光回差：
				<input id="dataFGHC" type="text"
					style="width:22.5%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 6%;display: inline-block;">v/m³</span>
				<button id="btnSetFGXX" @click="btnSetFGXX"
					style="margin-left: 1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>&emsp;

			</div>

			<div
				style="position:absolute;left:6%;top:53%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
				防腐上限：
				<input id="dataFFS" type="text"
					style="width:22.5%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 6%;display: inline-block;">mg/m³</span>
				<button id="btnSetFFSX" @click="btnSetFFSX"
					style="margin-left:1rem;margin-right:1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>
				防腐回差：
				<input id="dataFFHC" type="text"
					style="width:22.5%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />
				<span style="color:#9f9f9f;width: 6%;display: inline-block;">ug/m³</span>
				<button id="btnSetFFHC" @click="btnSetFFHC"
					style="margin-left:1rem;margin-right:1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>&emsp;

			</div>
			<div
				style="position:absolute;left:6%;top:62%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
				湿度回差：
				<input id="dataSDHC" type="text"
					style="width:22.5%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />

				<span style="color:#9f9f9f;width: 6%;display: inline-block;">%RH</span>
				<button id="btnSetSDHC" @click="btnSetSDHC"
					style="margin-left:1rem;margin-right:1.2rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>
				温度回差：
				<input id="dataWDHC" type="text"
					style="width:22.5%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" />

				<span style="color:#9f9f9f;width: 5.7%;display: inline-block;">℃</span>
				<button id="btnSetWDHC" @click="btnSetWDHC"
					style="margin-left:1rem;width:5%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:12px;outline:medium">设置</button>&emsp;


			</div>
			<el-select v-model="DeviceType"
				style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none"
				@change="showlist()">
				<el-option label="智能无人库房自控管理控制器" value="5" selected></el-option>
				<el-option v-for="item in equipmentModel" :value="item.value" :key="item.value" :label="item.name">{{
					item.name
				}}</el-option>
				<!-- <el-option label="环境超限专用报警器" value="4"></el-option>
							<el-option label="防盗报警器" value="0"></el-option>
							<el-option label="漏水报警器" value="1"></el-option>
							<el-option label="烟感报警器" value="2"></el-option>
							<el-option label="防光报警器" value="3"></el-option>
							<el-option label="震动报警器" value="6"></el-option>
							<el-option label="驱鼠报警器" value="7"></el-option> -->
			</el-select>
			<div style="position:absolute;left:3%;bottom:7%;font-size:16px;color:#036ff6">
				设备编号：<span id="datadeviceNo"></span> &emsp;&emsp;&emsp;通讯状态：
				<span id="dataTXZT"></span>
				<span style="display:none;">库房索引：<span id="StoreId"></span> </span>
				&emsp;&emsp;&emsp;库房名称：<span id="StoreName"></span>
				<span style="display:none;">设备索引：<span id="ACId"></span></span>
				&emsp;&emsp;&emsp;设备名称：<span id="ACName"></span> &emsp;&emsp;IP地址：
				<span id="HostName"></span>
				<span style="display:none;">端口：<span id="HttpPort"></span></span>
				<span style="display:none;"><span id="AcLx"></span></span>
			</div>
			<select id="DeviceID"
				style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;display: none;outline:none">
				<option value="0" selected>智能无人库房自控管理控制器</option>
			</select>
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
			DeviceType: "5",
			DeviceID: "0",
			loopTime: undefined,
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
		bus.$on('bfgzmenu', (data) => {
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
		bus.$off('bfgzmenu')
	},
	methods: {
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
					let device = Object.keys(success.data.data.devices.HWSJ).length;
					// for (let i = 1; i < device + 1; i++) {
					// 	let deviceFacility = success.data.data.devices.HWSJ[i];
					// 	if (deviceFacility == "true") {
					// 		this.numberOfDevices.push({
					// 			name: i + "防盗报警器",
					// 			value: String(i) ,
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
								case 'FHQS':
									this.equipmentModel.push(
										{
											name: "驱鼠报警器",
											value: "7",
										})

									break;
								case 'HJCX':
									this.equipmentModel.push(
										{
											name: "环境超限专用报警器",
											value: "4",
										})

									break;
								case 'HWSJ':
									this.equipmentModel.push(
										{
											name: "防盗报警器",
											value: "0",
										})

									break;
								case 'LSMK':
									this.equipmentModel.push(
										{
											name: "漏水报警器",
											value: "1",
										})

									break;
								case 'YGMK':
									this.equipmentModel.push(
										{
											name: "烟感报警器",
											value: "2",
										})

									break;
								case 'ZDJD':
									this.equipmentModel.push(
										{
											name: "震动报警器",
											value: "6",
										})

									break;
								case 'ZNGGTCQ':
									this.equipmentModel.push(
										{
											name: "防光报警器",
											value: "3",
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
			if (DeviceType == 0) this.devicePage("/sfgz/wrkfkzq/gz_fdview/index");
			if (DeviceType == 1) this.devicePage("/sfgz/wrkfkzq/gz_lsview/index");
			if (DeviceType == 2) this.devicePage("/sfgz/wrkfkzq/gz_ygview/index");
			if (DeviceType == 3) this.devicePage("/sfgz/wrkfkzq/gz_fgview/index");
			if (DeviceType == 4) this.devicePage("/sfgz/wrkfkzq/gz_hjcxview/index");
			if (DeviceType == 5) this.devicePage("/sfgz");
			if (DeviceType == 6) this.devicePage("/sfgz/wrkfkzq/gz_zdview/index");
			if (DeviceType == 7) this.devicePage("/sfgz/wrkfkzq/gz_qsview/index");
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
			// $("#datadeviceNo").html(this.DeviceID+"#");
			// $("#dataTXZT").html("离线");//通讯状态
			// $("#dataSDX").val("0");
			// $("#dataSDS").val("0");
			// $("#dataWDX").val("0");
			// $("#dataWDS").val("0");
			// $("#dataFCS").val("0");
			// $("#dataFCHC").val("0");
			// $("#dataFGS").val("0");
			// $("#dataFGHC").val("0");
			// $("#dataFFS").val("0");
			// $("#dataFFHC").val("0");
			// $("#dataSDHC").val("0");
			// $("#dataWDHC").val("0");
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					if (success.data?.data == undefined) {
						//return this.open3("没有数据")
						return
					}
					let Obj = success.data;
					if (Obj.flag == 0) {
						this.$message.error(Obj.msg);
						$("#datadeviceNo").html("1#");
						$("#dataTXZT").html("离线");//通讯状态
						return;
					}
					if (Obj.data == undefined) return;
					$("#datadeviceNo").html("1#");
					$("#dataTXZT").html(Obj.flag == '1' ? '在线' : "离线");//通讯状态
					var data = JSON.stringify(Obj)
					$("#" + ctlname).html(data);
					var data1 = JSON.stringify(Obj.data);
					var obj2 = Obj.data.SRFCSZT[0];
					console.log(JSON.stringify(obj2))

					$("#dataSDX").val(obj2.SDXX);
					$("#dataSDS").val(obj2.SDSX);

					$("#dataWDX").val(obj2.WDXX);
					$("#dataWDS").val(obj2.WDSX);

					$("#dataFCS").val(obj2.FCSX);
					$("#dataFCHC").val(obj2.FCHC);

					$("#dataFGS").val(obj2.FGSX);
					$("#dataFGHC").val(obj2.FGHC);

					$("#dataFFS").val(obj2.FFSX);
					$("#dataFFHC").val(obj2.FFHC);


					$("#dataSDHC").val(obj2.SDHC);
					$("#dataWDHC").val(obj2.WDHC);


				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnSetSD() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllHParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"minHum\":\"" + $("#dataSDX").val() + "\",\"maxHum\":\"" + $("#dataSDS").val() + "\"}"
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
		btnSetWD() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setUnmannedAllAirParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"minTemp\":\"" + $("#dataWDX").val() + "\",\"maxTemp\":\"" + $("#dataWDS").val() + "\"}"
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
		btnSetFCSX() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllAntiDustParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"maxAntiDust\":\"" + $("#dataFCS").val() + "\"}"
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
		btnSetFCHC() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllAntiDustHCParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"antiDustHC\":\"" + $("#dataFCHC").val() + "\"}"
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
		btnSetFGSX() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllLightProofParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"lightProof\":\"" + $("#dataFGS").val() + "\"}"
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
		btnSetFGXX() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllLightHCParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"lightHC\":\"" + $("#dataFGHC").val() + "\"}"
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
		btnSetFFSX() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllAntisepticParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"maxAntiseptic\":\"" + $("#dataFFS").val() + "\"}"
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
		btnSetFFHC() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllAntisepticHCParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"antisepticHC\":\"" + $("#dataFGHC").val() + "\"}"
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
		btnSetSDHC() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllHumHCParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"humHC\":\"" + $("#dataSDHC").val() + "\"}"
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
		btnSetWDHC() {
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllTempHCParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"tempHC\":\"" + $("#dataWDHC").val() + "\"}"
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
<style lang="scss" scoped></style>