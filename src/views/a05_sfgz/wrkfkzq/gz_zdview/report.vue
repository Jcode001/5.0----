<!-- 智能无人库房自控管理控制器（数据报表） -->
<template>
	<el-container style="height: 100%; border: 1px solid #eee">

		<!-- <i class="el-icon-s-home"  /> -->
		<!-- <el-dialog title="库房管理" width="80%" top="10vh" center :visible.sync="isShowSetting" @close="dialogClose()"> -->
		<div style="display:flex;">


			<div
				style="position:absolute;right:2%;top:0%;width:98%;height:100%;background-color:#e5eef7;border-radius:12px">
				<div
					style="position:absolute;left:50%;top:2%;width:50%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
					<el-button type="primary" size="big"
						@click="devicePage(`/sfgz/wrkfkzq/gz_zdview/index`)">设备页面</el-button>
					<el-button type="primary" size="big" @click="devicePage(`/sfgz/wrkfkzq/gz_zdview/report`)"
						disabled>数据报表</el-button>
					<el-select v-model="sttime" size="big" style="width:25%;height:100%;margin-left:.2vw;"
						@change="showAuto()">
						<el-option label="近24小时" value="0" selected></el-option>
						<el-option label="近7天" value="1"></el-option>
						<el-option label="近30天" value="2"></el-option>
						<el-option label="近一年" value="3"></el-option>
					</el-select>
					<!-- <el-button type="primary" size="big" @click="">清空记录</el-button> -->
					<el-button type="primary" size="big" @click="DA_zaijiedaochu">数据导出</el-button>
				</div>
				<div style="position:absolute;left:4%;top:2%;width:20%;height:50px;">设备类型:
					<el-select v-model="DeviceType"
						style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none"
						@change="showlist()">
						<el-option label="智能无人库房自控管理控制器" value="5"></el-option>
						<el-option v-for="item in equipmentModel" :value="item.value" :key="item.value"
							:label="item.name">{{
								item.name
							}}</el-option>
						<!-- <el-option label="环境超限专用报警器" value="4" ></el-option>
							<el-option label="防盗报警器" value="0" ></el-option>
							<el-option label="漏水报警器" value="1"></el-option>
							<el-option label="烟感报警器" value="2"></el-option>
							<el-option label="防光报警器" value="3"></el-option>
							<el-option label="震动报警器" value="18" selected></el-option>
							<el-option label="驱鼠报警器" value="7"></el-option> -->
					</el-select>
				</div>
				<div style="position:absolute;left:24%;top:2%;width:20%;height:50px;">设备编号:
					<el-select id="DeviceID" v-model="DeviceID"
						style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none"
						@change="showAuto()">
						<el-option v-for="items in numberOfDevices" :value="items.value" :key="items.value"
							:label="items.name">{{
								items.name
							}}</el-option>
						<!-- <el-option label="1号震动报警器" value="0" selected></el-option>
							<el-option label="2号震动报警器" value="1" ></el-option>
							<el-option label="3号震动报警器" value="2" ></el-option>
							<el-option label="4号震动报警器" value="3"></el-option>
							<el-option label="5号震动报警器" value="4"></el-option>
							<el-option label="6号震动报警器" value="5"></el-option>
							<el-option label="7号震动报警器" value="6"></el-option>
							<el-option label="8号震动报警器" value="7"></el-option>
                            <el-option label="9号震动报警器" value="8" ></el-option>
							<el-option label="10号震动报警器" value="9" ></el-option>
							<el-option label="11号震动报警器" value="10"></el-option>
							<el-option label="12号震动报警器" value="11"></el-option>
							<el-option label="13号震动报警器" value="12"></el-option>
							<el-option label="14号震动报警器" value="13"></el-option>
							<el-option label="15号震动报警器" value="14"></el-option>
                            <el-option label="16号震动报警器" value="15"></el-option> -->
					</el-select>
				</div>
				<div style="position:absolute;left:2.5%;top:10%;width:95%;height:80%;overflow-y:auto;">
					<!-- <th style="width: 23.53rem;">序号</th>
                        <th style="width: 23.53rem;">设备类型</th>
                        <th style="width: 23.53rem;">设备编号</th>
                        <th style="width: 23.53rem;">预警状态</th>
                        <th style="width: 23.53rem;">预警类型</th>
                        <th style="width: 23.53rem;">预警时间</th> -->
						<el-table :data="tableData" style="position:relative;width:98%;" border id="ZJDAdaochu">
						<el-table-column prop="xuhao" label="序号" align="center">
						</el-table-column>
						<el-table-column prop="siren" label="设备类型" align="center">
						</el-table-column>
						<el-table-column prop="deviceNo" label="设备编号" align="center">
						</el-table-column>
						<el-table-column prop="isAlarm" label="预警状态" align="center">
						</el-table-column>
						<el-table-column prop="awacs" label="预警类型" align="center">
						</el-table-column>
						<el-table-column prop="alarmTime" label="预警时间" align="center">
						</el-table-column>
					</el-table>
				</div>
				<div style="position:absolute;left:3%;bottom:7%;font-size:15px;color:#036ff6">
					设备编号：<span id="datadeviceNo"></span>
					&emsp;&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
					<span style="display:none;">库房索引：<span id="StoreId"></span></span>
					&emsp;&emsp;&emsp;&emsp;库房名称：<span id="StoreName"></span>
					<span style="display:none;">设备索引：<span id="ACId"></span></span>
					&emsp;&emsp;&emsp;&emsp;设备名称：<span id="ACName"></span>
					<span style="display:none;">IP地址：<span id="HostName"></span></span>
					<span style="display:none;">端口：<span id="HttpPort"></span></span>
					<span style="display:none;"><span id="AcLx"></span></span>
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
import bus from '@/utils/bus';
import FileSaver from "file-saver";
import XLSX from "xlsx";
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
			DeviceID: "1",
			tableData: [],
			loopTime: undefined,
			sttime: "0",
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
			this.loopTime = setInterval(this.showAuto, 1000 * 60);
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
			this.loopTime = setInterval(this.showAuto, 1000 * 60);
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
		////导出
		DA_zaijiedaochu() {
			let timeDate = new Date();
			let year = timeDate.getFullYear();
			let mounth = timeDate.getMonth() + 1;
			let day = timeDate.getDate();
			let hours = timeDate.getHours();
			hours = hours >= 10 ? hours : "0" + hours;
			let minutes = timeDate.getMinutes();
			minutes = minutes >= 10 ? minutes : "0" + minutes;
			let seconds = timeDate.getSeconds();
			seconds = seconds >= 10 ? seconds : "0" + seconds;
			let table = document.querySelector('#ZJDAdaochu').cloneNode(true);
			// 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
			// table.removeChild(table.querySelector(".el-table__fixed-right"));
			// table.removeChild(table.querySelector(".el-table__fixed"));
			let wb = XLSX.utils.table_to_book(table, { raw: true }); //mytable为表格的id名
			/* get binary string as output */
			var wbout = XLSX.write(wb, {
				bookType: "xlsx",
				bookSST: true,
				type: "array",
			});
			try {
				FileSaver.saveAs(
					new Blob([wbout], { type: "application/octet-stream" }),
					`震动报警器${year}${mounth}${day}${hours}${minutes}${seconds}` + ".xlsx"
				);
			} catch (e) {
				if (typeof console !== "undefined") console.log(e, wbout);
			}
			return wbout;
		},
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
								value: String(i),
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
		dateFormat(row, column, cellValue, index) {
			let date = new Date(parseInt(cellValue));
			if (isNaN(date)) return '--'
			let Y = date.getFullYear() + '-';
			let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
			let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
			let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
			let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
			let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return Y + M + D + h + m + s;
		},
		showlist() {
			clearInterval(this.loopTime);
			this.loopTime = undefined;
			let DeviceType = this.DeviceType;
			if (DeviceType == 0) this.devicePage("/sfgz/wrkfkzq/gz_fdview/report");
			if (DeviceType == 1) this.devicePage("/sfgz/wrkfkzq/gz_lsview/report");
			if (DeviceType == 2) this.devicePage("/sfgz/wrkfkzq/gz_ygview/report");
			if (DeviceType == 3) this.devicePage("/sfgz/wrkfkzq/gz_fgview/report");
			if (DeviceType == 4) this.devicePage("/sfgz/wrkfkzq/gz_hjcxview/index");
			if (DeviceType == 5) this.devicePage("/sfgz");
			if (DeviceType == 6) this.devicePage("/sfgz/wrkfkzq/gz_zdview/report");
			if (DeviceType == 7) this.devicePage("/sfgz/wrkfkzq/gz_qsview/report");
		},
		getTime(date) {
			var year = date.getFullYear();
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			return year + '/' + month + '/' + day + ' ' + hour+":00:00";
		},
		showAuto() {
			var endDate = new Date();
			var startDate = new Date();
			if (this.sttime == 0)
				startDate = new Date(endDate.getTime() - 86400000);
			else if (this.sttime == 1)
				startDate = new Date(endDate.getTime() - 86400000 * 7);
			else if (this.sttime == 2)
				startDate = new Date(endDate.getTime() - 86400000 * 30);
			else if (this.sttime == 3)
				startDate = new Date(endDate.getTime() - 86400000 * 365);
			var startdate = this.getTime(startDate)
			var enddate = this.getTime(endDate)
			var indata = {}
			indata['cmd'] = '60001';
			indata['localip'] = '127.0.0.1';
			indata['hostname'] = '222.222.126.240';
			indata['port'] = '8006';
			indata['method'] = 'UnmannedKFPTService/getHJSJBySpecific';
			indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"18","deviceNo":"' + this.DeviceID + '#","startDate": "' + startdate + '","endDate": "' + enddate + '"}';
			//console.log(indata)
			console.log(JSON.stringify(indata))
			$('#url').html(indata['method']);
			$('#jsonin').html(indata['jsonin']);
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					this.tableData = []
					let Obj = success.data;
					$("#datadeviceNo").html(this.DeviceID+"#");
					$("#dataTXZT").html(Obj.flag == '1' ? '在线' : "离线");//通讯状态
					if (Obj.flag == 1) {
						//this.$message.success('数据获取成功！');
						// this.tableData = Obj.data.list;
						for (let i = 0; i < Obj.data.list.length; i++) {
							let isAlarmS = Obj.data.list[i].isAlarm == 0 ? "解除" : "预警"
							if (Obj.data.list[i].isAlarm == 1) {
								var awacs = "震动预警"
							}else{
								var awacs = "无"
							}
							this.tableData.push({
								xuhao: i + 1,
								siren: "防震报警器",
								deviceNo: Obj.data.list[i].deviceNo,
								isAlarm: isAlarmS,
								awacs: awacs,
								alarmTime: Obj.data.list[i].alarmTime
							})
						}
					} else {
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
<style lang="scss" scoped></style>