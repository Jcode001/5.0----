<!-- 智能无人库房自控管理控制器（数据曲线） -->
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
						@click="devicePage(`/hjjk/wrkfkzq/hwktview/index`)">设备页面</el-button>
					<el-button type="primary" size="big"
						@click="devicePage(`/hjjk/wrkfkzq/hwktview/report`)">数据报表</el-button>
					<el-button type="primary" size="big" @click="devicePage(`/hjjk/wrkfkzq/hwktview/chart`)"
						disabled>数据曲线</el-button>
					<el-select v-model="sttime" size="big" style="width:25%;height:100%;margin-left:.2vw;"
						@change="showAuto()">
						<el-option label="近24小时" value="0" selected></el-option>
						<el-option label="近7天" value="1"></el-option>
						<el-option label="近30天" value="2"></el-option>
						<el-option label="近一年" value="3"></el-option>
					</el-select>
					<!-- <el-button type="primary" size="big" @click="">清空记录</el-button> -->
					<!-- <el-button type="primary" size="big" @click="DA_zaijiedaochu">数据导出</el-button> -->
				</div>
				<div style="position:absolute;left:4%;top:2%;width:20%;height:50px;">设备类型:
					<el-select v-model="DeviceType"
						style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none"
						@change="showlist()">
						<el-option label="智能无人库房自控管理控制器" value="0"></el-option>
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
							<el-option label="空气质量云测仪" value="12" selected></el-option> -->
					</el-select>
				</div>
				<div style="position:absolute;left:24%;top:2%;width:20%;height:50px;">设备编号:
					<el-select v-model="DeviceID"
						style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none"
						@change="showAuto()">
						<!-- <el-option value="1#" label="1号红外空调"  selected></el-option>
							<el-option value="2#" label="2号红外空调"  ></el-option>
							<el-option value="3#" label="3号红外空调"  ></el-option>
							<el-option value="4#" label="4号红外空调"  ></el-option>
							<el-option value="5#" label="5号红外空调"  ></el-option>
							<el-option value="6#" label="6号红外空调"  ></el-option>
							<el-option value="7#" label="7号红外空调"  ></el-option>
							<el-option value="8#" label="8号红外空调"  ></el-option>
							<el-option value="9#" label="9号红外空调"  ></el-option>
							<el-option value="10#" label="10号红外空调"  ></el-option>
							<el-option value="11#" label="11号红外空调"  ></el-option>
							<el-option value="12#" label="12号红外空调"  ></el-option>
							<el-option value="13#" label="13号红外空调"  ></el-option>
							<el-option value="14#" label="14号红外空调"  ></el-option>
							<el-option value="15#" label="15号红外空调"  ></el-option>
							<el-option value="16#" label="16号红外空调"  ></el-option> -->
						<el-option v-for="items in numberOfDevices" :value="items.value" :key="items.value"
							:label="items.name">{{
								items.name
							}}</el-option>
					</el-select>
				</div>
				<div class="pieChart" id="temperatureHumidity" ref="temperatureHumidity"
					style="position:absolute;left:3%;top:11%;width:94%;height:83%;"></div>
				<div style="position:absolute;left:3%;bottom:2%;font-size:15px;color:#036ff6">
					设备编号：<span id="datadeviceNo"></span>
					&emsp;&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
					<span style="display:none;">库房索引：<span id="StoreId"></span></span>
					&emsp;&emsp;&emsp;&emsp;库房名称：<span id="StoreName"></span>
					<span style="display:none;">设备索引：<span id="ACId"></span></span>
					&emsp;&emsp;&emsp;&emsp;设备名称：<span id="ACName"></span>
					&emsp;&emsp;IP地址：<span id="HostName"></span>
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
import * as echarts from 'echarts'
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
			DeviceType: "8",
			DeviceID: "1#",
			xDateData: [],
			TempEchatsData: [],
			HumEchatsData: [],
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
					let device = Object.keys(success.data.data.devices.HWKT).length;
					for (let i = 1; i < device + 1; i++) {
						let deviceFacility = success.data.data.devices.HWKT[i];
						if (deviceFacility == "true") {
							this.numberOfDevices.push({
								name: i + "红外空调",
								value: String(i) + "#",
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
		dateFormat(cellValue) {
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
			if (DeviceType == 0) this.devicePage("/hjjk");
			if (DeviceType == 1) this.devicePage("/hjjk/wrkfkzq/ytjview/chart");
			if (DeviceType == 2) this.devicePage("/hjjk/wrkfkzq/jkytfhjview/chart");
			if (DeviceType == 3) this.devicePage("/hjjk/wrkfkzq/bgsxfjview/chart");
			if (DeviceType == 4) this.devicePage("/hjjk/wrkfkzq/sxqtjhjview/chart");
			if (DeviceType == 5) this.devicePage("/hjjk/wrkfkzq/jsqview/chart");
			if (DeviceType == 6) this.devicePage("/hjjk/wrkfkzq/csqview/chart");
			if (DeviceType == 7) this.devicePage("/hjjk/wrkfkzq/ptytjview/chart");
			if (DeviceType == 8) this.devicePage("/hjjk/wrkfkzq/hwktview/chart");
			if (DeviceType == 9) this.devicePage("/hjjk/wrkfkzq/jmktview/chart");
			if (DeviceType == 11) this.devicePage("/hjjk/wrkfkzq/ddclview/index");
			if (DeviceType == 12) this.devicePage("/hjjk/wrkfkzq/ycyview/chart");
			if (DeviceType == 17) this.devicePage("/hjjk/wrkfkzq/zdysbview/chart");
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
			indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"8","deviceNo":"' + this.DeviceID + '","startDate": "' + startdate + '","endDate": "' + enddate + '"}';
			//console.log(indata)
			console.log(JSON.stringify(indata))
			$('#url').html(indata['method']);
			$('#jsonin').html(indata['jsonin']);
			axios.post('http://' + this.ServeIp + ":" + this.ServePort + '/getRfid', indata).then(
				success => {
					let Obj = success.data;
					if (Obj == null) return;
					console.log(JSON.stringify(Obj))
					if (Obj.flag == 1) {
						//this.$message.success('数据获取成功！');
						var datas = Obj.data.list;
						console.log(datas);
						$("#datadeviceNo").html(this.DeviceID+"#");
						$("#dataTXZT").html(Obj.flag == '1' ? '在线' : "离线");//通讯状态
						this.xDateData = []
						this.TempEchatsData = []
						this.HumEchatsData = []
						datas.forEach(item => {
							var tempTime = this.dateFormat(item.insert_time);
							this.xDateData.unshift(tempTime);
							this.TempEchatsData.unshift(item.temp);
							this.HumEchatsData.unshift(item.hum);
						});
						this.updateChart();
					}
					else {
						this.$message.error(Obj.msg);
					}
				},
				error => {
					console.log(error, '数据获取失败！');
				})
		},
		updateChart() {
			// const myChart = echarts.init(document.getElementById("temperatureHumidity"));
			const myChart = echarts.init(this.$refs.temperatureHumidity);
			var option = {
				backgroundColor: "#fff",
				title: {
					// text: "数据曲线",
					// textStyle: {
					//     color: "#062D87",
					// },
				},
				tooltip: {
					trigger: "axis",
				},
				legend: {
					data: ["温度", "湿度"],
					textStyle: {
						color: "#000",
					},
				},
				grid: {
					top: "middle",
					left: "8%",
					right: "4%",
					bottom: "3%",
					height: "80%",
					containLabel: false,
				},
				toolbox: {
					show: false, //右上角的工具
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ["line", "bar"] },
						restore: { show: true },
						saveAsImage: { show: true },
					},
				},
				calculable: true,
				xAxis: [{
					type: "category",
					boundaryGap: false,
					data: this.xDateData,
					axisTick: {
						show: true, //隐藏X轴刻度
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: "#062D87", //X轴文字颜色
						},
					},
				},],
				yAxis: [{
					type: "value",
					name: "℃'",
					nameTextStyle: {
						color: "#062D87",
					},
					axisLabel: {
						formatter: "{value}℃",
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: "#062D87",
						},
					},
					splitLine: {
						lineStyle: {
							type: "dashed",
							color: "#062D87",
						},
					},
				},],
				series: [{
					name: "温度",
					type: "line",
					min: 10,
					max: 40,
					data: this.TempEchatsData,
					markPoint: {
						data: [{ name: "周最高", value: 39, xAxis: 2, yAxis: 39 }],
					},
					lineStyle: {
						normal: {
							width: 5,
							color: {
								type: "linear",
								colorStops: [{
									offset: 0,
									color: "#AAF487", // 0% 处的颜色
								},
								{
									offset: 0.4,
									color: "#47D8BE", // 100% 处的颜色
								},
								{
									offset: 1,
									color: "#47D8BE", // 100% 处的颜色
								},
								],
								globalCoord: false, // 缺省为 false
							},
							shadowColor: "rgba(71,216,190, 0.5)",
							shadowBlur: 10,
							shadowOffsetY: 7,
						},
					},
					itemStyle: {
						normal: {
							color: "#062D87",
							borderWidth: 10,
							/*shadowColor: 'rgba(72,216,191, 0.3)',
							shadowBlur: 100,*/
							borderColor: "#062D87",
						},
					},
					smooth: true,
					markLine: {
						data: [{ type: "average", name: "平均值" }],
					},
				},
				{
					name: "湿度",
					type: "line",
					min: 10,
					max: 40,
					data: this.HumEchatsData,
					markPoint: {
						data: [{ name: "周最低", value: this.HumEchatsData[2], xAxis: 1, yAxis: 22 }],
					},
					lineStyle: {
						normal: {
							width: 5,
							color: {
								type: "linear",
								colorStops: [{
									offset: 0,
									color: "#EEEE00", // 0% 处的颜色
								},
								{
									offset: 0.4,
									color: "#FFFF00", // 40% 处的颜色
								},
								{
									offset: 1,
									color: "#FFFF33", // 100% 处的颜色
								},
								],
								globalCoord: false, // 缺省为 false
							},
							shadowColor: "rgba(249,165,137, 0.5)",
							shadowBlur: 10,
							shadowOffsetY: 7,
						},
					},
					itemStyle: {
						normal: {
							color: "#F6D06F",
							borderWidth: 10,
							/*shadowColor: 'rgba(72,216,191, 0.3)',
																 shadowBlur: 100,*/
							borderColor: "#F6D06F",
						},
					},
					smooth: true,
					markLine: {
						data: [{ type: "average", name: "平均值" }],
					},
				},
				],
			};
			myChart.setOption(option);
		},
	},
};
</script>
<style lang="scss" scoped></style>
