<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
			<img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="./pic0.png" />
			<div
				style="position:absolute;left:73%;top:1.5%;width:20%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
				<el-button type="primary" size="big" @click="devicePage(`/sfgz/wrkfkzq/gz_fdview/index`)"
					disabled>设备页面</el-button>
				<el-button type="primary" size="big" @click="devicePage(`/sfgz/wrkfkzq/gz_fdview/report`)">数据报表</el-button>
			</div>
			<el-select v-model="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;outline:none"
				@change="showlist()">
				<el-option label="智能无人库房自控管理控制器" value="5"></el-option>
				<el-option v-for="item in equipmentModel" :value="item.value" :key="item.value" :label="item.name">{{
					item.name
				}}</el-option>
				<!-- <el-option label="环境超限专用报警器" value="4" ></el-option>
							<el-option label="防盗报警器" value="0" selected></el-option>
							<el-option label="漏水报警器" value="1"></el-option>
							<el-option label="烟感报警器" value="2"></el-option>
							<el-option label="防光报警器" value="3"></el-option>
							<el-option label="震动报警器" value="6"></el-option>
							<el-option label="驱鼠报警器" value="7"></el-option> -->
			</el-select>
			<div style="position:absolute;left:6%;bottom:7%;font-size:15px;color:#036ff6">
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
			<el-select v-model="DeviceID" @change="showAuto()"
				style="position:absolute;right:5%;top:10%;width:25%;height:0;border:1px solid #e6eef8;border-radius:6px;outline:none">
				<el-option v-for="items in numberOfDevices" :value="items.value" :key="items.value" :label="items.name">{{
					items.name
				}}</el-option>
				<!-- <option value="0" selected>1号防盗报警器</option>
								<option value="1">2号防盗报警器</option>
								<option value="2">3号防盗报警器</option>
								<option value="3">4号防盗报警器</option>
								<option value="4">5号防盗报警器</option>
								<option value="5">6号防盗报警器</option>
								<option value="6">7号防盗报警器</option>
								<option value="7">8号防盗报警器</option>
								<option value="8">9号防盗报警器</option>
								<option value="9">10号防盗报警器</option>
								<option value="10">11号防盗报警器</option>
								<option value="11">12号防盗报警器</option>
								<option value="12">13号防盗报警器</option>
								<option value="13">14号防盗报警器</option>
								<option value="14">15号防盗报警器</option>
								<option value="15">16号防盗报警器</option> -->
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
			DeviceType: "0",
			DeviceID: "0",
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
					for (let i = 1; i < device + 1; i++) {
						let deviceFacility = success.data.data.devices.HWSJ[i];
						if (deviceFacility == "true") {
							this.numberOfDevices.push({
								name: i + "防盗报警器",
								value: String(i - 1),
							})
						}
					}
					console.log(this.numberOfDevices);
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
				"method": "UnmannedKFPTService/getStatus",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\"}"
			}
			this.getdata(indata, 'msg');
		},
		getdata(indata, ctlname) {
			// $("#datadeviceNo").html((Number(this.DeviceID) + 1) + "#");
			// $("#dataTXZT").html("离线");
			// $("#dataalarm").attr('src', require('./pic0.png'));
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					if (success.data?.data == undefined) {
						////return this.open3("没有数据")
						return
						return
					}
					let Obj = success.data;
					if (Obj.data == undefined) return;
					var data = JSON.stringify(Obj)
					$("#" + ctlname).html(data);
					var data1 = JSON.stringify(Obj.data);
					data1 = data1.replace(/"([^"]*)":/g, "\"data$1\":");
					var obj1 = JSON.parse(data1);
					console.log(data)
					var DeviceID = this.DeviceID;
					console.log(JSON.stringify(obj1.data16[DeviceID]))
					$("#datadeviceNo").html(obj1.data16[DeviceID].datadeviceNo);
					$("#dataTXZT").html(obj1.data16[DeviceID].dataTXZT == 1 ? "离线" : "在线");
					if (obj1.data16[DeviceID].dataisAlarm == "0")
						$("#dataalarm").attr('src', require('./pic0.png'));
					else
						$("#dataalarm").attr('src', require('./pic.png'));
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
	},
};
</script>
<style lang="scss" scoped></style>