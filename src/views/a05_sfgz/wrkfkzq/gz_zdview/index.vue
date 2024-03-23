
<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
			<img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="./pic0.png" />
			<div
				style="position:absolute;left:73%;top:1.5%;width:20%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
				<el-button type="primary" size="big" @click="devicePage(`/sfgz/wrkfkzq/gz_zdview/index`)"
					disabled>设备页面</el-button>
				<el-button type="primary" size="big" @click="devicePage(`/sfgz/wrkfkzq/gz_zdview/report`)">数据报表</el-button>
			</div>
			<el-select v-model="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;outline:none"
				@change="showlist()">
				<el-option label="智能无人库房自控管理控制器" value="5"></el-option>
				<el-option v-for="item in equipmentModel" :value="item.value" :key="item.value" :label="item.name">{{
					item.name
				}}</el-option>
				<!-- <el-option label="环境超限专用报警器" value="4"></el-option>
							<el-option label="防盗报警器" value="0"></el-option>
							<el-option label="漏水报警器" value="1"></el-option>
							<el-option label="烟感报警器" value="2"></el-option>
							<el-option label="防光报警器" value="3"></el-option>
							<el-option label="震动报警器" value="6" selected></el-option>
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
			<el-select id="DeviceID" v-model="DeviceID" @change="showAuto()"
				style="position:absolute;right:5%;top:10%;width:25%;height:0;border:1px solid #e6eef8;border-radius:6px;outline:none">
				<el-option v-for="items in numberOfDevices" :value="items.value" :key="items.value" :label="items.name">{{
					items.name
				}}</el-option>
				<!-- <option value="0" selected>1号震动报警器</option>
								<option value="1">2号震动报警器</option>
								<option value="2">3号震动报警器</option>
								<option value="3">4号震动报警器</option>
								<option value="4">5号震动报警器</option>
								<option value="5">6号震动报警器</option>
								<option value="6">7号震动报警器</option>
								<option value="7">8号震动报警器</option> -->
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
		this.onmyload();

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
					let device = Object.keys(success.data.data.devices.ZDJD).length;
					for (let i = 1; i < device + 1; i++) {
						let deviceFacility = success.data.data.devices.ZDJD[i];
						if (deviceFacility == "true") {
							this.numberOfDevices.push({
								name: i + "震动报警器",
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
			else {
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
			// $("#dataalarm").attr('src', require('./pic0.png'));
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					if (success.data?.data == undefined) {
						//return this.open3("没有数据")
						return
					}
					let Obj = success.data
					var data = JSON.stringify(Obj)
					$("#" + ctlname).html(data);
					var data1 = JSON.stringify(Obj.data);
					data1 = data1.replace(/"([^"]*)":/g, "\"data$1\":");
					var obj1 = JSON.parse(data1);
					console.log(data)
					var DeviceID = this.DeviceID;
					console.log(JSON.stringify(obj1.data18[DeviceID]))
					$("#datadeviceNo").html(obj1.data18[DeviceID].datadeviceNo);
					$("#dataTXZT").html(obj1.data18[DeviceID].dataTXZT == 1 ? "离线" : "在线");
					if (obj1.data18[DeviceID].dataisAlarm == "0")
						$("#dataalarm").attr('src', require('./pic0.png'));
					else
						$("#dataalarm").attr('src', require('./pic.png'));
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnclmode1() {
			clearInterval(looptimer);
			looptimer = setInterval("showAuto()", 1000 * 60);

			$("#btnclmode1").css("color", "#ffffff");
			$("#btnclmode1").css("background-color", "#036ff6");
			$("#btnclmode2").css("color", "#036ff6");
			$("#btnclmode2").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllCurtainLinkageParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"curtainLinkage\":\"0\"}"
			}
			$.ajax({
				type: "GET",
				url: "http://127.0.0.1:4444/getRfid",
				data: indata,
				success: function (Obj, status) {
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						//alert("命令执行成功"+data)
						showmsg("命令执行成功" + data);
					}

				},
				error: function (msg) {

				}
			})
		},
		btnclmode2() {
			clearInterval(looptimer);
			looptimer = setInterval("showAuto()", 1000 * 60);

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
			$.ajax({
				type: "GET",
				url: "http://127.0.0.1:4444/getRfid",
				data: indata,
				success: function (Obj, status) {
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						//alert("命令执行成功"+data)
						showmsg("命令执行成功" + data);
					}

				},
				error: function (msg) {

				}
			})
		},
		btnyxcsmode1() {
			clearInterval(looptimer);
			looptimer = setInterval("showAuto()", 1000 * 60);

			$("#btnyxcsmode1").css("color", "#ffffff");
			$("#btnyxcsmode1").css("background-color", "#036ff6");
			$("#btnyxcsmode2").css("color", "#036ff6");
			$("#btnyxcsmode2").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllHKDataLinkageParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"hkDataLinkage\":\"0\"}"
			}
			$.ajax({
				type: "GET",
				url: "http://127.0.0.1:4444/getRfid",
				data: indata,
				success: function (Obj, status) {
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						//alert("命令执行成功"+data)
						showmsg("命令执行成功" + data);
					}

				},
				error: function (msg) {

				}
			})
		},
		btnyxcsmode2() {
			clearInterval(looptimer);
			looptimer = setInterval("showAuto()", 1000 * 60);

			$("#btnyxcsmode2").css("color", "#ffffff");
			$("#btnyxcsmode2").css("background-color", "#036ff6");
			$("#btnyxcsmode1").css("color", "#036ff6");
			$("#btnyxcsmode1").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllHKDataLinkageParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"hkDataLinkage\":\"1\"}"
			}
			$.ajax({
				type: "GET",
				url: "http://127.0.0.1:4444/getRfid",
				data: indata,
				success: function (Obj, status) {
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						//alert("命令执行成功"+data)
						showmsg("命令执行成功" + data);
					}

				},
				error: function (msg) {

				}
			})
		},
		btnmjyxmode1() {
			clearInterval(looptimer);
			looptimer = setInterval("showAuto()", 1000 * 60);

			$("#btnmjyxmode1").css("color", "#ffffff");
			$("#btnmjyxmode1").css("background-color", "#036ff6");
			$("#btnmjyxmode2").css("color", "#036ff6");
			$("#btnmjyxmode2").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllPreventStatusParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"preventStatus\":\"1\"}"
			}
			$.ajax({
				type: "GET",
				url: "http://127.0.0.1:4444/getRfid",
				data: indata,
				success: function (Obj, status) {
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						//alert("命令执行成功"+data)
						showmsg("命令执行成功" + data);
					}

				},
				error: function (msg) {

				}
			})
		},
		btnmjyxmode2() {
			clearInterval(looptimer);
			looptimer = setInterval("showAuto()", 1000 * 60);

			$("#btnmjyxmode2").css("color", "#ffffff");
			$("#btnmjyxmode2").css("background-color", "#036ff6");
			$("#btnmjyxmode1").css("color", "#036ff6");
			$("#btnmjyxmode1").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllPreventStatusParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"preventStatus\":\"0\"}"
			}
			$.ajax({
				type: "GET",
				url: "http://127.0.0.1:4444/getRfid",
				data: indata,
				success: function (Obj, status) {
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						//alert("命令执行成功"+data)
						showmsg("命令执行成功" + data);
					}

				},
				error: function (msg) {

				}
			})
		},
		btndsbfmode1() {
			clearInterval(looptimer);
			looptimer = setInterval("showAuto()", 1000 * 60);

			$("#btndsbfmode1").css("color", "#ffffff");
			$("#btndsbfmode1").css("background-color", "#036ff6");
			$("#btndsbfmode2").css("color", "#036ff6");
			$("#btndsbfmode2").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllTimingSettingParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"timingSetting\":\"1\"}"
			}
			$.ajax({
				type: "GET",
				url: "http://127.0.0.1:4444/getRfid",
				data: indata,
				success: function (Obj, status) {
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						//alert("命令执行成功"+data)
						showmsg("命令执行成功" + data);
					}

				},
				error: function (msg) {

				}
			})
		},
		btndsbfmode2() {
			clearInterval(looptimer);
			looptimer = setInterval("showAuto()", 1000 * 60);

			$("#btndsbfmode2").css("color", "#ffffff");
			$("#btndsbfmode2").css("background-color", "#036ff6");
			$("#btndsbfmode1").css("color", "#036ff6");
			$("#btndsbfmode1").css("background-color", "#ffffff");
			var indata = {
				"cmd": 60001,
				"localip": "127.0.0.1",
				"hostname": "10.168.1.39",
				"port": "8066",
				"method": "UnmannedKFPTService/setAllTimingSettingParams",
				"jsonin": "{\"ip\":\"" + $('#HostName').html() + "\",\"timingSetting\":\"0\"}"
			}
			$.ajax({
				type: "GET",
				url: "http://127.0.0.1:4444/getRfid",
				data: indata,
				success: function (Obj, status) {
					var data = JSON.stringify(Obj)
					if (Obj.flag == "1") {
						//alert("命令执行成功"+data)
						showmsg("命令执行成功" + data);
					}

				},
				error: function (msg) {

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
	height: 16.5vw !important;

}

.kfcode {
	width: 100%;
}
</style>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>震动报警器界面</title>
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
</style>
<script>
		$(document).ready(function(){ 
			$('#DeviceID').change(function(){ 
			   showAuto();
			})
			$('#DeviceType').change(function(){ 
				//alert($(this).val()+$(this).children('option:selected').text());
				DeviceType=$(this).val();
				if(DeviceType==0)window.location.href="../gz_fdview/index.html"; 
				if(DeviceType==1)window.location.href="../gz_lsview/index.html"; 
				if(DeviceType==2)window.location.href="../gz_ygview/index.html"; 
				if(DeviceType==3)window.location.href="../gz_fgview/index.html"; 
				if(DeviceType==4)window.location.href="../gz_hjcxview/index.html"; 
				if(DeviceType==5)window.location.href="../gz_wrkfkzqview/index.html"; 
				if(DeviceType==6)window.location.href="../gz_zdview/index.html"; 
				if(DeviceType==7)window.location.href="../gz_qsview/index.html";
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
		　　t = setInterval("showAuto()", 1000*5);
		})
		function showAuto(){
		　　var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"UnmannedKFPTService/getStatus",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\"}"
			}
			getdata(indata,'msg');
		}
		function getdata(indata,ctlname)
		{
			$.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						$("#"+ctlname).html(data);
						var data1=JSON.stringify(Obj.data);
						data1=data1.replace(/"([^"]*)":/g, "\"data$1\":");
						var obj1=JSON.parse(data1);
						console.log(data)
						var DeviceID=$("#DeviceID").val();
						console.log(JSON.stringify(obj1.data18[DeviceID]))
						$("#datadeviceNo").html(obj1.data18[DeviceID].datadeviceNo);
						$("#dataTXZT").html(obj1.data18[DeviceID].dataTXZT==1?"离线":"在线");
						if(obj1.data18[DeviceID].dataisAlarm=="0")
						$("#dataalarm").attr('src','pic0.png');
						else
						$("#dataalarm").attr('src','pic.png');
					},
					error:function(msg){
						
					}
			})
		}
	</script>
</head>
<body style="margin:0;padding:0">

<div style="position:absolute;left:2%;top:8%;width:14%;height:92%;background-color:#0049a5;border-radius:12px">
<ul id="menutree" style="position:absolute;left:1%;top:8%;width:76%;height:80%;background-color:#0049a5;font-size:20px;color:#ffffff;list-style-type:null;list-style-image:url(kf.png);">
<li><span>演示库房</span>
	<ul style="padding-left:10px;background-color:#0049a5;font-size:18px;color:#ffffff;list-style-type:null;list-style-image:url(hjkzq.png);">
	<li style="padding-top:10px;padding-bottom:10px;"><span>环境控制器1</span></li>
	<li style="padding-top:10px;padding-bottom:10px;">环境控制器2</li>
	</ul>
</li>
<li><span>演示库房2</span>
	<ul style="padding-left:10px;background-color:#0049a5;font-size:18px;color:#ffffff;list-style-type:null;list-style-image:url(bfkzq.png);">
	<li style="padding-top:10px;padding-bottom:10px;"><span>八防控制器1</span></li>
	<li style="padding-top:10px;padding-bottom:10px;">八防控制器2</li>
	</ul>
</li>
</ul>
</div>
<div style="position:absolute;left:2%;top:0%;width:14%;height:8%;background-color:#004095;border-radius:12px 12px 0 0;">
<img style="position:absolute;left:5%;top:30%;vertical-align:middle;" src="home.png"></img>
<span style="width:90%;color:#7df9fa;position:absolute;left:25%;top:26%;text-align:left;font-size:20px">库房列表</span>
</div>
<div style="position:absolute;right:2%;top:0%;width:80%;height:100%;background-color:#e5eef7;border-radius:12px">
  
</div> 
</body>
</html>