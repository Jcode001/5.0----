<!-- 空气质量云测仪界面 -->
<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
			<img style="position:absolute;left:0%;top:0%;width:100%;height:100%" src="./pic2.png" />
			<div
				style="position:absolute;left:70%;top:3.8%;width:25%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
				<el-button type="primary" size="big" @click="devicePage(`/hjjk/wrkfkzq/ycyview/index`)"
					disabled>设备页面</el-button>
				<el-button type="primary" size="big" @click="devicePage(`/hjjk/wrkfkzq/ycyview/report`)">数据报表</el-button>
				<el-button type="primary" size="big" @click="devicePage(`/hjjk/wrkfkzq/ycyview/chart`)">数据曲线</el-button>
			</div>
			<span style="position:absolute;left:13.5%;top:33%;font-size:30px;color:#036ff6" id="datatemp"></span>
			<span style="position:absolute;left:33%;top:33%;font-size:27px;color:#036ff6" id="pm2_5"></span>
			<span style="position:absolute;left:53%;top:33%;font-size:27px;color:#036ff6" id="datahum"></span>
			<span style="position:absolute;left:22%;top:56%;font-size:16px;color:#51de90" id="TVOC"></span>
			<span style="position:absolute;left:54%;top:56%;font-size:16px;color:#ff3f78" id="pm10"></span>
			<span style="position:absolute;left:22%;top:66%;font-size:16px;color:#18d7cb" id="HCHO"></span>
			<span style="position:absolute;left:54%;top:66%;font-size:16px;color:#036ff6" id="CO2"></span>
			<span style="position:absolute;left:22%;top:77%;font-size:16px;color:#f76060" id="pm1"></span>
			<span style="position:absolute;left:54%;top:77%;font-size:16px;color:#2898ca" id="SO2">0mg/m³</span>
			<el-select v-model="DeviceType"
				style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none"
				@change="showlist()">
				<el-option label="智能无人库房自控管理控制器" value="0"></el-option>
				<el-option v-for="item in equipmentModel" :value="item.value" :key="item.value" :label="item.name">{{
					item.name
				}}</el-option>
				<!-- <el-option label="净化除酸型除湿加湿一体机" value="1"></el-option>
								<el-option label="健康防护一体机" value="2"></el-option>
								<el-option label="壁挂式新风净化机" value="3" ></el-option>
								<el-option label="酸性气体空气净化机" value="4"></el-option>
								<el-option label="加湿机" value="5"></el-option>
								<el-option label="除湿机" value="6"></el-option>
								<el-option label="普通一体机" value="7"></el-option>
								<el-option label="红外空调" value="8"></el-option>
								<el-option label="精密空调" value="9"></el-option>
								<el-option label="智能电动窗帘" value="11"></el-option>
								<el-option label="空气质量云测仪" value="12" selected></el-option>
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
			<el-select v-model="DeviceID" @change="showAuto()" id="DeviceID"
				style="position:absolute;right:5%;top:20%;width:25%;height:0;border:1px solid #e6eef8;border-radius:6px;outline:none">
				<el-option v-for="items in numberOfDevices" :value="items.value" :key="items.value" :label="items.name">{{
					items.name
				}}</el-option>
				<!-- <option value="0" selected>1号空气质量云测仪</option>
								<option value="1">2号空气质量云测仪</option>
								<option value="2">3号空气质量云测仪</option>
								<option value="3">4号空气质量云测仪</option>
								<option value="4">5号空气质量云测仪</option>
								<option value="5">6号空气质量云测仪</option>
								<option value="6">7号空气质量云测仪</option>
								<option value="7">8号空气质量云测仪</option>
								<option value="8">9号空气质量云测仪</option>
								<option value="9">10号空气质量云测仪</option>
								<option value="10">11号空气质量云测仪</option>
								<option value="11">12号空气质量云测仪</option>
								<option value="12">13号空气质量云测仪</option>
								<option value="13">14号空气质量云测仪</option>
								<option value="14">15号空气质量云测仪</option> -->
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
			DeviceType: "12",
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
					let device = Object.keys(success.data.data.devices.KQZLYCY).length;
					for (let i = 1; i < device + 1; i++) {
						let deviceFacility = success.data.data.devices.KQZLYCY[i];
						if (deviceFacility == "true") {
							this.numberOfDevices.push({
								name: i + "空气质量云测仪",
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
		onmyload() {
			var jsonin = {
				"cmd": 30014,
				"localip": "127.0.0.1",
				"UserId": 10
			}
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', jsonin).then(
				success => {
					console.log(success, '获取库房列表接口-成功');
					let Obj = success.data;
					this.KFList = [];
					for (let i = 0; i < Obj.data.length; i++) {
						let item = {};
						item.id = Obj.data[i].StoreId;
						item.no = i;
						item.label = Obj.data[i].StoreName;
						item.level = 1;
						item.children = [];
						this.KFList.push(item);
					}
					console.log(this.KFList);
				},
				error => {
					console.log(error, '获取库房列表接口--返回失败的数据');
				})
		},
		handleNodeClick(data) {
			let StoreId = data.id;
			let StoreName = data.label;
			let level = data.level;
			let no = data.no;
			console.log(data, "点击了data111111111111");
			console.log(data.id, "点击了data111111111111");
			if (level == 1) {
				var jsonin = {
					"cmd": 50015,
					"localip": "127.0.0.1",
					"UserId": 10,
					"StoreId": StoreId,
					"pageno": 1,
					"pagesize": 10,
				}
				axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', jsonin).then(
					success => {
						console.log(success, '获取库房列表接口-成功');
						let Obj = success.data;
						this.KFList[no].children = [];
						for (let i = 0; i < Obj.data.length; i++) {
							if (Obj.data[i].AcLx == 2) continue;
							let item = {};
							item.id = Obj.data[i].ACId;
							item.no = i;
							item.label = Obj.data[i].ACName;
							item.level = 2;
							item.StoreId = StoreId;
							item.StoreName = StoreName;
							item.HostName = Obj.data[i].HostName;
							item.HttpPort = Obj.data[i].HttpPort;
							item.AcLx = Obj.data[i].AcLx;
							this.KFList[no].children.push(item);
							if (item.AcLx == 1) {
								window.location.href = '/hjjk/qykzq/qykzqview/index.html';
							}
						}
						console.log(this.KFList);
					},
					error => {
						console.log(error, '获取库房列表接口--返回失败的数据');
					})
			}
			else {
				$("#StoreName").html(data.StoreName)
				$("#ACName").html(data.label)
				$("#HostName").html(data.HostName)
				this.showAuto();
			}
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
			// $("#datatemp").html("<i style='color: black;'>0<small>°C</small></i>");
			// $("#pm2_5").html("<i style='color: black;'>0<small>ug/m³</small></i>");
			// $("#datahum").html("<i style='color: black;'>0<small>%RH</small></i>");
			// $("#TVOC").html("<i style='color: black;'>0<small>mg/m³</small></i>");
			// $("#pm10").html("<i style='color: black;'>0<small>ug/m³</small></i>");
			// $("#HCHO").html("<i style='color: black;'>0<small>mg/m³</small></i>");
			// $("#CO2").html("<i style='color: black;'>0<small>ppm</small></i>");
			// $("#pm1").html("<i style='color: black;'>0<small>ug/m³</small></i>");
			// $("#SO2").html("<i style='color: black;'>0<small>ug/m³</small></i>");
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
					console.log(JSON.stringify(obj1.data12[DeviceID]))
					$("#datadeviceNo").html(obj1.data12[DeviceID].datadeviceNo);
					$("#dataTXZT").html(obj1.data12[DeviceID].dataTXZT == 1 ? "离线" : "在线");
					$("#datatemp").html("<i style='color: black;'>" + obj1.data12[DeviceID].datatemp + "<small>°C</small></i>");
					$("#pm2_5").html("<i style='color: black;'>" + obj1.data12[DeviceID].datapm2_5 + "<small>ug/m³</small></i>");
					$("#datahum").html("<i style='color: black;'>" + obj1.data12[DeviceID].datahum + "<small>%RH</small></i>");
					$("#TVOC").html("<i style='color: black;'>" + obj1.data12[DeviceID].dataTVOC + "<small>mg/m³</small></i>");
					$("#pm10").html("<i style='color: black;'>" + obj1.data12[DeviceID].datapm10 + "<small>ug/m³</small></i>");

					$("#HCHO").html("<i style='color: black;'>" + obj1.data12[DeviceID].dataHCHO + "<small>mg/m³</small></i>");
					$("#CO2").html("<i style='color: black;'>" + obj1.data12[DeviceID].dataCO2 + "<small>ppm</small></i>");
					$("#pm1").html("<i style='color: black;'>" + obj1.data12[DeviceID].datapm1 + "<small>ug/m³</small></i>");
					let dataSO2 = obj1.data12[DeviceID].dataSO2;
					$("#SO2").html("<i style='color: black;'>" + (dataSO2 == undefined ? 0 : dataSO2) + "<small>ug/m³</small></i>");
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
	},
};
</script>
<style lang="scss" scoped>
i {
	color: black;
}
</style>