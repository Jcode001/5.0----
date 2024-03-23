<!-- 智能无人库房自控管理控制器（基础参数） -->
<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<!-- <i class="el-icon-s-home"  /> -->
		<!-- <el-dialog title="库房管理" width="80%" top="10vh" center :visible.sync="isShowSetting" @close="dialogClose()"> -->
		<div style="display:flex;">
			<!-- <KFListComonent></KFListComonent> -->
			<div style="margin-left:.5vw;position:relative;width: 90vw;">
				<div
					style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
					<img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="./pic1.png" />
					<!-- <div
						style="position:absolute;left:70%;top:3.8%;width:25%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
						<el-button type="primary" size="big" @click="devicePage(`/hjjk`)" disabled>设备页面</el-button>
						<el-button type="primary" size="big" @click="devicePage(`/hjjk1-3`)">数据报表</el-button>
						<el-button type="primary" size="big" @click="devicePage(`/hjjk1-4`)">数据曲线</el-button>
					</div> -->
					<div style="position:absolute;left:5%;top:16%;width:30%;height:5%;">
						<span @click='devicePage("/hjjk")'
							style="color:rgb(64,158,255);font-size:23px;text-decoration:none;cursor: pointer;">基础参数</span>&emsp;&emsp;&emsp;
						<div
							style="position:absolute;left:0%;bottom:0%;width:20%;height:4px;background-color:rgb(64,158,255);">
						</div>
						<span style="color:black;font-size:23px;text-decoration:none;cursor: pointer;"
							@click='devicePage("/hjjk1-2")'>运行状态</span>
					</div>
					<span style="position:absolute;right:82.5%;top:26.5%;font-size:20px;color:#036ff6"
						id="datatemp">0</span>
					<span style="position:absolute;right:62.5%;top:26.5%;font-size:20px;color:#036ff6" id="datahum">0</span>
					<span style="position:absolute;right:42%;top:26.5%;font-size:20px;color:#036ff6" id="TVOC">0</span>

					<span style="position:absolute;right:82.5%;top:35.5%;font-size:20px;color:#036ff6" id="pm10">0</span>
					<span style="position:absolute;right:62.5%;top:35.5%;font-size:20px;color:#036ff6" id="HCHO">0</span>
					<span style="position:absolute;right:42%;top:35.5%;font-size:20px;color:#036ff6" id="pm1">0</span>

					<span style="position:absolute;right:82.5%;top:44.5%;font-size:20px;color:#036ff6" id="pm2_5">0</span>
					<span style="position:absolute;right:62.5%;top:44.5%;font-size:20px;color:#036ff6" id="CO2">0</span>
					<span style="position:absolute;right:42%;top:44.5%;font-size:20px;color:#036ff6" id="SO2">0</span>

					<img id="JSZZT" style="position:absolute;left:5%;top:53%;width:9%;height:16.5%;"
						src="./ico/ico_js_off.png" />
					<img id="ZLZZT" style="position:absolute;left:14.8%;top:53%;width:9%;height:16.5%;"
						src="./ico/ico_zl_off.png" />
					<img id="XFZZT" style="position:absolute;left:24.8%;top:53%;width:9%;height:16.5%;"
						src="./ico/ico_xf_off.png" />
					<img id="CSZZT" style="position:absolute;left:34.7%;top:53%;width:9%;height:16.5%;"
						src="./ico/ico_cs_off.png" />
					<img id="ZRZZT" style="position:absolute;left:44.6%;top:53%;width:9%;height:16.5%;"
						src="./ico/ico_zr_off.png" />
					<img id="JHZZT" style="position:absolute;left:54.4%;top:53%;width:9%;height:16.5%;"
						src="./ico/ico_jh_off.png" />

					<img id="WCJHZZT" style="position:absolute;left:5%;top:71%;width:9%;height:16.5%;"
						src="./ico/ico_wjh_off.png" />
					<img id="DKZZT" style="position:absolute;left:14.8%;top:71%;width:9%;height:16.5%;"
						src="./ico/ico_dg_off.png" />
					<img id="CLZZT" style="position:absolute;left:24.8%;top:71%;width:9%;height:16.5%;"
						src="./ico/ico_cl_off.png" />
					<img id="QTJHZZT" style="position:absolute;left:34.7%;top:71%;width:9%;height:16.5%;"
						src="./ico/ico_qtjh_off.png" />
					<img id="ZNPSZZT" style="position:absolute;left:44.6%;top:71%;width:9%;height:16.5%;"
						src="./ico/ico_znps_off.png" />
					<img id="XFPYZZT" style="position:absolute;left:54.4%;top:71%;width:9%;height:16.5%;"
						src="./ico/ico_xfpy_off.png" />

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
						style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none;display: none;">
						<!-- @change="showAuto()" -->
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
// import KFListComonent from '@/components/environmental_control/hjjkmenu.vue'
import bus from '@/utils/bus'
import { render } from "nprogress";
export default {
	components: {
		// KFListComonent,
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
			this.loopTime=setInterval(this.showAuto, 1000*10);
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

			// $("#ACId").html(data.id)
			// $("#StoreId").html(data.StoreId)
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
	// bus.$off('hjjkmenu')
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
			//http://127.0.0.1:8080/#/kfgl
			//http://127.0.0.1:8080/a01/#/kfgl
			//http://10.10.10.77/#/kfgl
			//http://10.10.10.77/kfgl/#/kfgl
			//http://10.10.10.77/kfgl
			//http://10.10.10.77/
			this.$router.push({ path: this.redirect || page })
			//this.$router.push({ path: this.redirect || page })
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
			// $("#datatemp").html("0");
			// $("#datahum").html("0");
			// $("#TVOC").html("0");
			// $("#pm10").html("0");
			// $("#HCHO").html("0");
			// $("#pm1").html("0");
			// $("#pm2_5").html("0");
			// $("#CO2").html("0");
			// $("#SO2").html("0");
			// $("#JSZZT").attr("src", require("./ico/ico_js_off.png"));
			// $("#ZLZZT").attr("src", require("./ico/ico_zl_off.png"));
			// $("#XFZZT").attr("src", require("./ico/ico_xf_off.png"));
			// $("#CSZZT").attr("src", require("./ico/ico_cs_off.png"));
			// $("#ZRZZT").attr("src", require("./ico/ico_zr_off.png"));
			// $("#JHZZT").attr("src", require("./ico/ico_jh_off.png"));
			// $("#WCJHZZT").attr("src", require("./ico/ico_wjh_off.png"));
			// $("#DKZZT").attr("src", require("./ico/ico_dg_off.png"));
			// $("#CLZZT").attr("src", require("./ico/ico_cl_off.png"));
			// $("#QTJHZZT").attr("src", require("./ico/ico_qtjh_off.png"));
			// $("#ZNPSZZT").attr("src", require("./ico/ico_znps_off.png"));
			// $("#XFPYZZT").attr("src", require("./ico/ico_xfpy_off.png"));
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
					var data1 = JSON.stringify(Obj.data.HKYXZT[0]);
					var obj1 = JSON.parse(data1);

					console.log(obj1, 'data11111111111');

					$("#datadeviceNo").html("1#");
					$("#dataTXZT").html(Obj.flag == '1' ? '在线' : "离线");//通讯状态
					$("#datatemp").html(obj1.Temp);
					$("#datahum").html(obj1.Hum);
					$("#TVOC").html(obj1.TVOC);
					$("#pm10").html(obj1.pm10);
					$("#HCHO").html(obj1.HCHO);
					$("#pm1").html(obj1.pm1);
					$("#pm2_5").html(obj1.pm2_5);
					$("#CO2").html(obj1.CO2);
					$("#SO2").html(obj1.SO2);

					var obj2 = Obj.data.HKYXZT[0];

					if (obj2.JSZZT == 1) {
						$("#JSZZT").attr("src", require("./ico/ico_js_on.png"));
					}
					else {
						$("#JSZZT").attr("src", require("./ico/ico_js_off.png"));
					}
					if (obj2.ZLZZT == 1) {
						$("#ZLZZT").attr("src", require("./ico/ico_zl_on.png"));
					}
					else {
						$("#ZLZZT").attr("src", require("./ico/ico_zl_off.png"));
					}
					if (obj2.XFZZT == 1) {
						$("#XFZZT").attr("src", require("./ico/ico_xf_on.png"));
					}
					else {
						$("#XFZZT").attr("src", require("./ico/ico_xf_off.png"));
					}
					if (obj2.CSZZT == 1) {
						$("#CSZZT").attr("src", require("./ico/ico_cs_on.png"));
					}
					else {
						$("#CSZZT").attr("src", require("./ico/ico_cs_off.png"));
					}
					if (obj2.ZRZZT == 1) {
						$("#ZRZZT").attr("src", require("./ico/ico_zr_on.png"));
					}
					else {
						$("#ZRZZT").attr("src", require("./ico/ico_zr_off.png"));
					}
					if (obj2.JHZZT == 1) {
						$("#JHZZT").attr("src", require("./ico/ico_jh_on.png"));
					}
					else {
						$("#JHZZT").attr("src", require("./ico/ico_jh_off.png"));
					}

					if (obj2.WCJHZZT == 1) {
						$("#WCJHZZT").attr("src", require("./ico/ico_wjh_on.png"));
					}
					else {
						$("#WCJHZZT").attr("src", require("./ico/ico_wjh_off.png"));
					}
					if (obj2.DKZZT == 1) {
						$("#DKZZT").attr("src", require("./ico/ico_dg_on.png"));
					}
					else {
						$("#DKZZT").attr("src", require("./ico/ico_dg_off.png"));
					}
					if (obj2.CLZZT == 1) {
						$("#CLZZT").attr("src", require("./ico/ico_cl_on.png"));
					}
					else {
						$("#CLZZT").attr("src", require("./ico/ico_cl_off.png"));
					}
					if (obj2.QTJHZZT == 1) {
						$("#QTJHZZT").attr("src", require("./ico/ico_qtjh_on.png"));
					}
					else {
						$("#QTJHZZT").attr("src", require("./ico/ico_qtjh_off.png"));
					}
					if (obj2.ZNPSZZT == 1) {
						$("#ZNPSZZT").attr("src", require("./ico/ico_znps_on.png"));
					}
					else {
						$("#ZNPSZZT").attr("src", require("./ico/ico_znps_off.png"));
					}
					if (obj2.XFPYZZT == 1) {
						$("#XFPYZZT").attr("src", require("./ico/ico_xfpy_on.png"));
					}
					else {
						$("#XFPYZZT").attr("src", require("./ico/ico_xfpy_off.png"));
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
