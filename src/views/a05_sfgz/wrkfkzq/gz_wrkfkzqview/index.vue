<template>
	<el-container style="height: 100%; border: 1px solid #eee">
		<div style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
			<img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="./pic01.png" />
			<div style="position:absolute;left:5%;top:16%;width:30%;height:5%;">
				<span  style="color:blue;font-size:23px;text-decoration:none;cursor: pointer;" @click='devicePage("/sfgz")'>基本参数</span>&emsp;&emsp;&emsp;
				<div style="position:absolute;left:0%;bottom:0%;width:20%;height:4px;background-color:blue;"></div>
				<span 
					style="color:black;font-size:23px;text-decoration:none;cursor: pointer;" @click='devicePage("/sfgz/wrkfkzq/gz_wrkfkzqview/index1")'>运行状态</span>
			</div>
			<img style="position:absolute;left:5%;top:28%;width:9%;height:16%;" id="FS" src="./ico/ico_fsyj_off.png">
			<img style="position:absolute;left:15%;top:28%;width:9%;height:16%;" id="FH" src="./ico/ico_fhyj_off.png">
			<img style="position:absolute;left:25%;top:28%;width:9%;height:16%;" id="FD" src="./ico/ico_fdyj_off.png">
			<img style="position:absolute;left:35%;top:28%;width:9%;height:16%;" id="FC" src="./ico/ico_fcyj_off.png">
			<img style="position:absolute;left:45%;top:28%;width:9%;height:16%;" id="FDS" src="./ico/ico_fdsyj_off.png">
			<img style="position:absolute;left:55%;top:28%;width:9%;height:16%;" id="FGS" src="./ico/ico_fgsyj_off.png">

			<img style="position:absolute;left:5%;top:47%;width:9%;height:16%;" id="FF" src="./ico/ico_ffyj_off.png">
			<img style="position:absolute;left:15%;top:47%;width:9%;height:16%;" id="FG" src="./ico/ico_fgyj_off.png">
			<img style="position:absolute;left:25%;top:47%;width:9%;height:16%;" id="FZ" src="./ico/ico_fzyj_off.png">
			<img style="position:absolute;left:35%;top:47%;width:9%;height:16%;" id="FZH" src="./ico/ico_fzhyj_off.png">
			<img style="position:absolute;left:45%;top:47%;width:9%;height:16%;" id="FDW" src="./ico/ico_fgwyj_off.png">
			<img style="position:absolute;left:55%;top:47%;width:9%;height:16%;" id="FGW" src="./ico/ico_fdwyj_off.png">

			<div
				style="position:absolute;left:6%;top:68%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
				窗帘联动：
				<el-button id="btnclmode1" @click="btnclmode1"
					style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">未联动</el-button>
				<el-button id="btnclmode2" @click="btnclmode2"
					style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">联动</el-button>
				&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
				环控数据联动：
				<el-button id="btnyxcsmode1" @click="btnyxcsmode1"
					style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">未联动</el-button>
				<el-button id="btnyxcsmode2" @click="btnyxcsmode2"
					style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">联动</el-button>
			</div>
			<div
				style="position:absolute;left:6%;top:78%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
				门禁运行状态：
				<el-button id="btnmjyxmode1" @click="btnmjyxmode1"
					style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">布防</el-button>
				<el-button id="btnmjyxmode2" @click="btnmjyxmode2"
					style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">撤防</el-button>
				&emsp;&emsp;&emsp;&emsp;&emsp;
				定时布防设置：
				<el-button id="btndsbfmode1" @click="btndsbfmode1"
					style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff; border-radius:20px;font-size:18px;outline:medium">启用定时</el-button>
				<el-button id="btndsbfmode2" @click="btndsbfmode2"
					style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">取消定时</el-button>
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
			<!-- <el-button @click="YJDC()" style="position:absolute;right:100px;top:25px">预警导出</el-button> -->
			<div style="position:absolute;left:3%;bottom:7%;font-size:16px;color:#036ff6">
				设备编号：<span id="datadeviceNo"></span>
				&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
				<span style="display:none;">库房索引：<span id="StoreId"></span> </span>
				&emsp;&emsp;&emsp;库房名称：<span id="StoreName"></span>
				<span style="display:none;">设备索引：<span id="ACId"></span></span>
				&emsp;&emsp;&emsp;设备名称：<span id="ACName"></span>
				&emsp;&emsp;IP地址：<span id="HostName"></span>
				<span style="display:none;">端口：<span id="HttpPort"></span></span>
				<span style="display:none;"><span id="AcLx"></span></span>
			</div>
			<select id="DeviceID"
				style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none;display: none;">
				<option value="0" selected>智能无人库房自控管理控制器</option>
			</select>
		</div>




		<el-dialog @close="showExportList()" center title="预警导出" :visible.sync="showOne" width="60%">
			<div style="height: 24vw;">
				<div style="display: flex;z-index: 101;">
					<div style="display: flex;align-items: baseline">
						<span>起止时间:</span>
						<div style="margin-left: 1vw;" class="block">

							<el-date-picker value-format="yyyy-MM-dd-HH-mm-ss" v-model="startTime" type="datetime"
								placeholder="选择日期时间">
							</el-date-picker>
						</div>
					</div>


					<div style="margin-left: 1vw;display: flex;align-items: baseline">
						<span>结束时间:</span>
						<div style="margin-left: 1vw;" class="block">

							<el-date-picker value-format="yyyy-MM-dd-HH-mm-ss" v-model="endTime" type="datetime"
								placeholder="选择日期时间">
							</el-date-picker>
						</div>
					</div>

					<div style="font-size:16px;margin-left:2vw"> <input type="checkbox" id="selectall"
							@change="checkAll()" /> 全选</div>

					<div style="margin-left:12vw;display: flex;align-items: baseline">
						<el-button type="primary" @click="deleteInfo()" style="margin-left:1rem">清空数据</el-button>
						<el-button type="primary" id="btnchange" style="" @click="exportTo()">导出</el-button>
					</div>
				</div>


				<div id="fielda"
					style="border: 1px solid rgb(12, 63, 231);margin-top:1vw;width:100%;height:100%;overflow-y: scroll;;background-color: #ffffff;">
					<fieldset v-for="(item) in deviceList" :key="item.name" style="margin-top:1rem;">
						<legend>{{ item.name }}</legend>
						<span v-for="(itemOne, indexOne) in item.list">
							<input type="checkbox" :id="itemOne.id" @change="changeCheck(itemOne)"
								:checked="itemOne.isChecked">{{ indexOne + 1 }}号{{ item.name }}
						</span>
					</fieldset>

				</div>
			</div>
			<div slot="footer" style="margin-top: 3vw;">
				<el-button @click="showOne = false">取 消</el-button>
				<el-button type="primary" @click="showOne = false">确 定</el-button>
			</div>
		</el-dialog>












		<!-- <div id="disappear"
			style="position: absolute;top: 15%;left: 20%;background-color: #fff;z-index: 100;width: 60%;height: 65%;border: 1px solid #0049a5;"
			v-if="showOne">
		
		</div> -->
		<!-- <div id="delete"></div> -->
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
			dialogshow: false,
			ACId: '',
			StoreId: '',

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
			rightNowClickIp: '',
			showOne: false,
			startTime: '',
			endTime: '',
			rightNowClickInfoList: '',
			deviceList: [
				{
					name: '环境超限报警器',
					list: []
				},
				{
					name: '漏水报警器',
					list: []
				},
				{
					name: '烟感报警器',
					list: []
				},
				{
					name: '防盗报警器',
					list: []
				},
				{
					name: '防光报警器',
					list: []
				},
				{
					name: '震动报警器',
					list: []
				},
				{
					name: '驱鼠报警器',
					list: []
				}
			],
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

		if (sessionStorage.getItem('StoreId') != undefined && sessionStorage.getItem('ACId') != undefined) {
			this.ACId = sessionStorage.getItem('ACId')
			this.StoreId = sessionStorage.getItem('StoreId')

		}


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
					// let device = Object.keys(success.data.data.devices.HWSJ).length;
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
		checkAll() {
			let index = $('#selectall').is(':checked');
			$("input[type='checkbox']").prop('checked', index)
			this.deviceList.forEach(item => {
				if (item.list.length > 0) {
					item.list.forEach(itemOne => {
						itemOne.isChecked = index
					})
				}
			})
		},
		changeCheck(itemOne) {
			itemOne.isChecked = !itemOne.isChecked
		},
		exportTo() {
			if (this.startTime == '' || this.endTime == '') {
				this.$message.error('请选择正确数据')
				return
			}


			this.rightNowClickInfoList = sessionStorage.getItem('HostName')
			console.log(this.rightNowClickInfoList, 'device/unmanned/download/alarmdevice/unmanned/download/alarm');
			let obj = {
				deviceList: [],
				endTime: [this.endTime],
				startTime: [this.startTime],
				ip: [this.rightNowClickInfoList]
			}
			this.deviceList.forEach(item => {
				if (item.list.length > 0) {
					item.list.forEach(itemOne => {
						if (itemOne.isChecked) {
							obj.deviceList.push(itemOne.id)
						}
					})
				}
			})
			var myDate = new Date;
			var year = myDate.getFullYear(); //获取当前年
			var mon = myDate.getMonth() + 1; //获取当前月
			var date = myDate.getDate(); //获取当前日
			var h = myDate.getHours(); //获取当前小时数(0-23)
			var m = myDate.getMinutes(); //获取当前分钟数(0-59)
			var s = myDate.getSeconds(); //获取当前秒
			let currenttime = year + "年" + mon + "月" + date + "日" + h + ":" + m + ":" + s
			var url = 'http://' + this.ServeIp + ":" + this.ServePort + "/device/unmanned/download/alarm";
			var xhr = new XMLHttpRequest();
			xhr.open('POST', url, true); //get请求，请求地址，是否异步
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.responseType = "blob"; // 返回类型blob
			xhr.onload = function () { // 请求完成处理函数
				if (this.status === 200) {
					$("#loding").animate({ width: '20%' });
					// clearInterval(timing);
					// val = 1;
					setTimeout(function () {
						$("#delete").empty()
						$("#stratumLucidum").remove()
					}, 2000);
					var blob = this.response; // 获取返回值
					var a = document.createElement('a');
					a.download = `${$('#DeviceID option:selected').text()}` + currenttime + '.csv';
					a.href = window.URL.createObjectURL(blob);
					a.click();
				} else {
					setTimeout(function () {
						$("#delete").empty()
						$("#stratumLucidum").remove()
					}, 2000);
					this.$message.error("导出失败")
				}
			}
			console.log(obj, 'HostNameHostNameHostNameHostNameHostNameHostName')
			xhr.send(JSON.stringify(obj));
		},
		deleteInfo() {
			if (confirm('请确认是否要清空')) {
				axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/user/clearEnvironmentAlarmRecords').then(res => {
					if (res.data.code != 200) {
						this.$message.error(res.data.message)
						return
					}
					this.$message({
						message: res.data.message,
						type: 'success'
					})
				}, err => { })
			}
		},
		showExportList() {
			this.showOne = false
			this.startTime = ''
			this.endTime = ''
		},
		YJDC() {

			if (sessionStorage.getItem('StoreId') == undefined && sessionStorage.getItem('ACId') == undefined) {
				this.$message.error('请选择库房和控制器')
				return

			}
			this.ACId = sessionStorage.getItem('ACId')
			this.StoreId = sessionStorage.getItem('StoreId')
			this.deviceInformation()







			this.showOne = true
			axios.get('http://' + this.ServeIp + ":" + this.ServePort + '/settingDeviceShow/get?warehouseId=' + this.StoreId + '&controllerId=' + this.ACId).then(res => {

				if (res.data.code != 200) {
					this.$message.error('操作失败')
					return
				}
				console.log(res);
				this.deviceList[0].list = []
				this.deviceList[1].list = []
				this.deviceList[2].list = []
				this.deviceList[3].list = []
				this.deviceList[4].list = []
				this.deviceList[5].list = []
				this.deviceList[6].list = []

				res.data.data.forEach(item => {
					switch (item.deviceType) {
						case 13:
							item.isChecked = false
							this.deviceList[0].list.push(item)
							break;
						case 14:
							item.isChecked = false
							this.deviceList[1].list.push(item)
							break;
						case 15:
							item.isChecked = false
							this.deviceList[2].list.push(item)
							break;
						case 16:
							item.isChecked = false
							this.deviceList[3].list.push(item)
							break;
						case 17:
							item.isChecked = false
							this.deviceList[4].list.push(item)
							break;
						case 18:
							item.isChecked = false
							this.deviceList[5].list.push(item)
							break;
						case 19:
							item.isChecked = false
							this.deviceList[6].list.push(item)
							break;
					}
				})
			}, err => { })
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
		getdata(indata, ctlname) {
			// $("#datadeviceNo").html(this.DeviceID+"#");
			// $("#dataTXZT").html("离线");//通讯状态
			// $("#FS").attr("src", require("./ico/ico_fsyj_off.png"));
			// $("#FH").attr("src", require("./ico/ico_fhyj_off.png"));
			// $("#FD").attr("src", require("./ico/ico_fdyj_off.png"));
			// $("#FC").attr("src", require("./ico/ico_fcyj_off.png"));
			// $("#FDS").attr("src", require("./ico/ico_fdsyj_off.png"));
			// $("#FGS").attr("src", require("./ico/ico_fgsyj_off.png"));
			// $("#FF").attr("src", require("./ico/ico_ffyj_off.png"));
			// $("#FG").attr("src", require("./ico/ico_fgyj_off.png"));
			// $("#FZ").attr("src", require("./ico/ico_fzyj_off.png"));
			// $("#FZH").attr("src", require("./ico/ico_fzhyj_off.png"));
			// $("#FDW").attr("src", require("./ico/ico_fdwyj_off.png"));
			// $("#FGW").attr("src", require("./ico/ico_fgwyj_off.png"));

			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
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
					if (Obj.data == undefined) return;
					$("#" + ctlname).html(data);
					var data1 = JSON.stringify(Obj.data);
					var obj2 = Obj.data.SRFCSZT[0];
					console.log(JSON.stringify(obj2))
					if (obj2.FS == 1) {
						$("#FS").attr("src", require("./ico/ico_fsyj_on.png"));
					}
					else {
						$("#FS").attr("src", require("./ico/ico_fsyj_off.png"));
					}
					if (obj2.FH == 1) {
						$("#FH").attr("src", require("./ico/ico_fhyj_on.png"));
					}
					else {
						$("#FH").attr("src", require("./ico/ico_fhyj_off.png"));
					}
					if (obj2.FD == 1) {
						$("#FD").attr("src", require("./ico/ico_fdyj_on.png"));
					}
					else {
						$("#FD").attr("src", require("./ico/ico_fdyj_off.png"));
					}
					if (obj2.FC == 1) {
						$("#FC").attr("src", require("./ico/ico_fcyj_on.png"));
					}
					else {
						$("#FC").attr("src", require("./ico/ico_fcyj_off.png"));
					}
					if (obj2.SD == 2) {
						$("#FDS").attr("src", require("./ico/ico_fdsyj_on.png"));
					}
					else {
						$("#FDS").attr("src", require("./ico/ico_fdsyj_off.png"));
					}
					if (obj2.SD == 1) {
						$("#FGS").attr("src", require("./ico/ico_fgsyj_on.png"));
					}
					else {
						$("#FGS").attr("src", require("./ico/ico_fgsyj_off.png"));
					}

					if (obj2.FF == 1) {
						$("#FF").attr("src", require("./ico/ico_ffyj_on.png"));
					}
					else {
						$("#FF").attr("src", require("./ico/ico_ffyj_off.png"));
					}
					if (obj2.FG == 1) {
						$("#FG").attr("src", require("./ico/ico_fgyj_on.png"));
					}
					else {
						$("#FG").attr("src", require("./ico/ico_fgyj_off.png"));
					}
					if (obj2.FZ == 1) {
						$("#FZ").attr("src", require("./ico/ico_fzyj_on.png"));
					}
					else {
						$("#FZ").attr("src", require("./ico/ico_fzyj_off.png"));
					}
					if (obj2.FHai == 1) {
						$("#FZH").attr("src", require("./ico/ico_fzhyj_on.png"));
					}
					else {
						$("#FZH").attr("src", require("./ico/ico_fzhyj_off.png"));
					}
					if (obj2.WD == 2) {
						$("#FDW").attr("src", require("./ico/ico_fdwyj_on.png"));
					}
					else {
						$("#FDW").attr("src", require("./ico/ico_fdwyj_off.png"));
					}
					if (obj2.WD == 1) {
						$("#FGW").attr("src", require("./ico/ico_fgwyj_on.png"));
					}
					else {
						$("#FGW").attr("src", require("./ico/ico_fgwyj_off.png"));
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
		btnclmode1() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

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
		btnclmode2() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

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
				},
				error => {
					console.log(error, '返回失败的数据');
				})
		},
		btnyxcsmode1() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

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
		btnyxcsmode2() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

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
		btnmjyxmode1() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

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
		btnmjyxmode2() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

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
		btndsbfmode1() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

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
		btndsbfmode2() {
			clearInterval(this.looptimer);
			this.looptimer = setInterval(this.showAuto, 1000 * 60);

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
