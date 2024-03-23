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
						@click="devicePage(`/sfgz/wrkfkzq/gz_fgview/index`)">设备页面</el-button>
					<el-button type="primary" size="big" @click="devicePage(`/sfgz/wrkfkzq/gz_fgview/report`)"
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
							<el-option label="防盗报警器" value="0" selected></el-option>
							<el-option label="漏水报警器" value="1"></el-option>
							<el-option label="烟感报警器" value="2"></el-option>
							<el-option label="防光报警器" value="3"></el-option>
							<el-option label="震动报警器" value="6"></el-option>
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
						<!-- <el-option label="1号防光报警器" value="0" selected></el-option>
							<el-option label="2号防光报警器" value="1" ></el-option>
							<el-option label="3号防光报警器" value="2" ></el-option>
							<el-option label="4号防光报警器" value="3"></el-option>
							<el-option label="5号防光报警器" value="4"></el-option>
							<el-option label="6号防光报警器" value="5"></el-option>
							<el-option label="7号防光报警器" value="6"></el-option>
							<el-option label="8号防光报警器" value="7"></el-option>
                            <el-option label="9号防光报警器" value="8" ></el-option>
							<el-option label="10号防光报警器" value="9" ></el-option>
							<el-option label="11号防光报警器" value="10"></el-option>
							<el-option label="12号防光报警器" value="11"></el-option>
							<el-option label="13号防光报警器" value="12"></el-option>
							<el-option label="14号防光报警器" value="13"></el-option>
							<el-option label="15号防光报警器" value="14"></el-option>
                            <el-option label="16号防光报警器" value="15"></el-option> -->
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
			DeviceType: "3",
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
					`防光报警器${year}${mounth}${day}${hours}${minutes}${seconds}` + ".xlsx"
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
					let device = Object.keys(success.data.data.devices.ZNGGTCQ).length;
					for (let i = 1; i < device + 1; i++) {
						let deviceFacility = success.data.data.devices.ZNGGTCQ[i];
						if (deviceFacility == "true") {
							this.numberOfDevices.push({
								name: i + "防光报警器",
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
			indata['jsonin'] = '{"ip":"' + $('#HostName').html() + '","deviceType":"16","deviceNo":"' + this.DeviceID + '#","startDate": "' + startdate + '","endDate": "' + enddate + '"}';
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
								var awacs = "防光预警"
							}else{
								var awacs = "无"
							}
							this.tableData.push({
								xuhao: i + 1,
								siren: "防光报警器",
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
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>防光预警器</title>
    <script type="text/javascript" src="/bfgz/wrkfkzq/index.js"></script>
    <script type="text/javascript" src="/assets/js/jquery-1.11.3.min.js"></script>
    <link rel="stylesheet" href="/hjjk/wrkfkzq/bgsxfjview/css/report.css">
    <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
    <div id="msgbox"
        style="position:absolute;z-index:99;display:none;border:0;background:#036ff6;border-radius:5px;color:white;font-size:16px;filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.7;border-radius:20px;line-height:50px;">
    </div>

    <script>
        let index_One = Number(localStorage.getItem('rightnowpositionindex'))
        deviceTypeNumber = 17;
        siren = "防光预警器";
        awacs = "防光预警";
        interfase = "UnmannedKFPTService/getHJSJBySpecific";


        function changeFontsize() {
            $('#record').find('td').css({ width: '23.53rem' })
            $('th').css({ 'fontSize': '1.5rem' })
            $('td').css({ 'fontSize': '1.5rem' })
        }
        $(function () {
            setTimeout(() => {
                changeFontsize()
            }, 1300)
            $('#DeviceID').change(function () {
                setTimeout(()=>{changeFontsize()},500)
            })
            $('#sttime').change(function () {
                setTimeout(()=>{changeFontsize()},500)
            })
            $("#btnexport").bind("click", function () {
                var endDate = new Date();
                var startDate = new Date();
                let startdate = '';
                let enddate = ''
                let index = false
                if ($('#sttime').val() == 0) {
                    startDate = new Date(endDate.getTime() - 86400000);
                }
                else if ($('#sttime').val() == 1) {
                    startDate = new Date(endDate.getTime() - 86400000 * 7);
                }
                else if ($('#sttime').val() == 2) {
                    startDate = new Date(endDate.getTime() - 86400000 * 30);
                }
                else if ($('#sttime').val() == 3) {
                    startDate = new Date(endDate.getTime() - 86400000 * 365);
                }
                else if ($('#sttime').val() == 4) {
                    index = true
                }
                if (index) {
                    startDate = ""
                    endDate = ""
                } else if (index == false) {
                    startdate = getTime(startDate)
                    enddate = getTime(endDate)
                }
                var myDate = new Date;
                var year = myDate.getFullYear(); //获取当前年
                var mon = myDate.getMonth() + 1; //获取当前月
                var date = myDate.getDate(); //获取当前日
                var h = myDate.getHours(); //获取当前小时数(0-23)
                var m = myDate.getMinutes(); //获取当前分钟数(0-59)
                var s = myDate.getSeconds(); //获取当前秒
                currenttime = year + "年" + mon + "月" + date + "日" + h + ":" + m + ":" + s
                var url = "/unmanned/fg/exportToExcel12";
                var xhr = new XMLHttpRequest();
                var params = {}
                let num=Number($('#DeviceID').val().replace('#',''))
                let checkIndex =classifyList[index_One].arr.findIndex(item=>{
                    return item.deviceSerialNumber==num
                })
                if(checkIndex!=-1){
                    num=checkIndex
                }else{
                    alert('出错了')
                    return
                }
                params['urlpath'] = "/UnmannedKFPTService/getHJSJBySpecific";
                if(startdate != '' && enddate != ''){
                    startdate += ':00';
                    enddate += ':00';
                }
                params['requestParams'] = '{"ip": "' + HostName + '","deviceType": "17","deviceNo": "' + classifyList[index_One].arr[num].deviceSerialNumber + '#","startDate": "' + startdate + '","endDate": "' + enddate + '"}';
                xhr.open('POST', url, true); //get请求，请求地址，是否异步
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.responseType = "blob"; // 返回类型blob
                xhr.onload = function () { // 请求完成处理函数
                    if (this.status === 200) {
                        var blob = this.response; // 获取返回值
                        var a = document.createElement('a');
                        a.download = `${$('#DeviceID option:selected').text()}` + currenttime + '.csv';
                        a.href = window.URL.createObjectURL(blob);
                        a.click();
                    }
                };
                xhr.send(JSON.stringify(params));
            });

        })
        $(document).ready(function () { //删除数据 start
            $("#empty-qr").click(function () {
                var indata = {}
                indata['cmd'] = '60001';
                indata['localip'] = '127.0.0.1';
                indata['hostname'] = '222.222.126.240';
                indata['port'] = '8006';
                indata['method'] = 'UnmannedKFPTService/clearBJSJ';
                // indata['method']='UnmannedKFPTService/deleteHJSJ';
                indata['jsonin'] = '{"ip":"' + HostName + '","type":"8"}';
                //console.log(indata)
                // console.log(JSON.stringify(indata))
                $.ajax({
                    type: "POST",
                    url: "/getRfid",
                    data: indata,
                    success: function (Obj, status) {
                        location.reload();
                    },
                    error: function (msg) {
                        alert('数据删除失败！' + msg.status)
                        showmsg('数据删除失败！' + msg.status); //状态码
                    }
                })
                $("#popup").hide();
            });
            $("#empty-qx").click(function () {
                $("#popup").hide();
            });
            $("#btnclear").click(function () {
                $("#popup").show();
            });
        });

    </script>
    <script src="/bfgz/wrkfkzq/gz_fdview/js/publicFunctionsb.js"></script>
</head>

<body style="margin:0;padding:0">
    <div style="position:absolute;left:0%;top:0%;width:100%;height:100%;background-color:#023580">
    </div>
    <div
        style="position:absolute;left:0%;top:0%;width:100%;height:8%;background-image:url(/bfgz/wrkfkzq/gz_fdview/header.png);">
    </div>
    <div style="position:absolute;left:2%;top:13%;width:14%;height:82%;background-color:#0049a5;border-radius:12px">

        <ul style="position:absolute;left:1%;top:10%;width:76%;height:80%;background-color:#0049a5;font-size:20px;color:#ffffff;list-style-type:null;list-style-image:url(/bfgz/wrkfkzq/gz_fdview/kf.png);"
            id="menutree">

        </ul>
    </div>
    <div
        style="position:absolute;left:2%;top:13%;width:14%;height:8%;background-color:#004095;border-radius:12px 12px 0 0;">
        <img style="position:absolute;left:5%;top:30%;vertical-align:middle;"
            src="/bfgz/wrkfkzq/gz_fdview/home.png"></img>
        <span
            style="width:90%;color:#7df9fa;position:absolute;left:25%;top:26%;text-align:left;font-size:20px">库房列表</span>
    </div>
    <div style="position:absolute;right:2%;top:13%;width:80%;height:82%;background-color:#e5eef7;border-radius:12px">
        <img style="position:absolute;left:0%;top:0%;width:100%;height:100%"
            src="/bfgz/wrkfkzq/gz_fdview/chart.png"></img>
        <div
            style="position:absolute;right:0%;top:2%;width:45%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
            <a href="/twelvePrevent/toDevice?pageName=wrkfkzq/gz_fgview"><button
                    style="width:18%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">设备页面</button></a>

            <button id="btnreports"
                style="width:18%;height:100%;border:3px solid #0049a5;color:#ffffff;background-color:#0049a5;border-radius:6px;outline:medium">数据报表</button>

            <select id="sttime"
                style="position:relative;top:-3.7px;width:18%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium;border-radius:6px;outline:none">

                <option value="0" selected>近24小时</option>
                <option value="1">近7天</option>
                <option value="2">近30天</option>
                <option value="3">近一年</option>
                <option value="4">所有</option>
            </select>

            <button id="btnclear"
                style="width:18%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">清空记录</button>
            <button id="btnexport"
                style="width:18%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">数据导出</button>
        </div>
        <div id="popup"
            style="position: fixed;top: 40%;left: 45%;z-index: 2;border: 1px solid #0049a5;width: 17rem;height:10rem;border-radius: 5%;display: none;background: #ffffff;">
            <!--  确认删除数据弹框 start -->
            <div
                style="text-align: center;background-color: #1163cf;color: #ffffff;padding: 3% 0;border-radius:  10% 10% 0 0">
                提示窗口</div>
            <div style="text-align: center;padding: 1.5rem 0 1.5rem 0;">是否删除全部数据</div>
            <div style="text-align: center;padding: 0rem 0 1rem 0;">
                <button id="empty-qr"
                    style="margin-right:1.5rem;background-color: #257ae2;border: 1px solid #257ae2;color: #ffffff;width: 3rem;height: 1.5rem;border-radius: 10%">确定</button>
                <button id="empty-qx"
                    style="margin-right:0.1rem;;border: 1px solid #000000;width: 3rem;height: 1.5rem;border-radius: 10%">取消</button>
            </div>
        </div>
        <!-- 确认删除数据弹框 over-->
        <!-- 表单跳转 start -->
        <div class="buttonSet">
            <nav aria-label="Page navigation;">
                <ul class="pagination" id="skip">
                </ul>
            </nav>
        </div>
        <!-- 表单跳转 over -->

        <div style="position:absolute;left:4%;top:2%;width:20%;height:50px;">设备类型:
            <select id="DeviceType"
                style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none">

            </select>
        </div>
        <div style="position:absolute;left:24%;top:2%;width:20%;height:50px;">设备编号:
            <select id="DeviceID" style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none">

            </select>
        </div>
        <div style="position:absolute;left:2.5%;top:10%;width:95%;height:80%;overflow-y:auto;">
            <table style="position:relative;width:98%;">
                <thead id="title">
                    <tr style="position:fixed;left: 19.9%;  height:3rem;font-size: 0.6rem;">
                        <th style="width: 23.53rem;">序号</th>
                        <th style="width: 23.53rem;">设备类型</th>
                        <th style="width: 23.53rem;">设备编号</th>
                        <th style="width: 23.53rem;">预警状态</th>
                        <th style="width: 23.53rem;">光照度</th>
                        <th style="width: 23.53rem;">预警时间</th>
                    </tr>
                </thead>
                <tbody id="record"></tbody>
            </table>
        </div>
        <div style="position:absolute;left:3%;bottom:2%;font-size:15px;color:#036ff6">
            <span style="display: none;">设备编号：<span id="datadeviceNo"></span></span> &emsp;&emsp;
            <span style="display: none;">通讯状态：<span id="dataTXZT"></span></span>
            <span style="display:none;">库房索引：<span id="StoreId"></span></span>&emsp;&emsp;
            <span>库房名称：</span> <span id="StoreName"></span>
            <span style="display:none;">设备索引：<span id="ACId"></span></span>&emsp;&emsp;
            <span>设备名称：</span> <span id="ACName"></span>
            <span>IP地址：<span id="HostName"></span></span>
            <span style="display:none;">端口：<span id="HttpPort"></span></span>
            <span><span id="AcLx"></span></span>
            <span style="display:none;">请求方法：<span id="url"></span></span>
            <span style="display:none;">请求参数：<span id="jsonin"></span></span>
            <span style="display:none;"><span id="stime"></span></span>
        </div>

    </div>
    <img style="position:absolute;left:2%;top:1.5%;" src="/bfgz/wrkfkzq/gz_fdview/menu.png" id="backToNext"></img>
    <span id="pageTitle"
        style="width:90%;color:#7df9fa;position:absolute;left:5%;top:1%;text-align:left;font-size:20px">INDOOR&emsp;因朵科技&emsp;智慧档案馆管理总平台</span>
    <span style="width:90%;color:#bdc3d3;position:absolute;left:2%;top:8.5%;text-align:left;font-size:16px"><a
            target="_self" href="/viewMainMenu.html">档案馆管理总控平台</a>>安防报警</span>
    <span class="copyright" id='sysname'
        style="width:100%;color:#8dabfb;position:absolute;left:0%;bottom:1%;text-align:center;font-size:18px">版权所有：河北因朵科技有限公司
        服务热线：4008313008 版本:V5.0</span>
</body>

</html>