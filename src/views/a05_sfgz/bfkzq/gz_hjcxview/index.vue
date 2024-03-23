<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>环境超限专用报警器界面</title>
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
	#ulbj{
	  position:absolute;
	  left:0.6%;
	  top:6%;
	  width:80%;
	  height:82%;
	}
	#ulbj>li{
	 display:inline-block;
	 position:relative;
	 margin:25px;
	 width:100px;
	 height:120px;
	}
	button:hover {
		transform: scale(0.9);
    }
    button:hover:after {
	 transform: scale(1);
   }
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
				if(DeviceType==5)window.location.href="../gz_bfkzqview/index.html"; 
				if(DeviceType==6)window.location.href="../jmktview/index.html"; 
				if(DeviceType==7)window.location.href="../ycyview/index.html";
				if(DeviceType==8)window.location.href="../ycyview/index.html";
				if(DeviceType==9)window.location.href="../ycyview/index.html";
				if(DeviceType==10)window.location.href="../ycyview/index.html";
				if(DeviceType==11)window.location.href="../ycyview/index.html"; 
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
							item+="if("+Obj.data[i].AcLx+"==3)";
							item+="{";
							item+="   	window.location.href = '/webroot/bfgz/wrkfkzq/gz_wrkfkzqview/index.html';";
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
							      "method":"KFPTService/prevent/getStatus",
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
						console.log(JSON.stringify(obj1.data7[DeviceID]))
						$("#datadeviceNo").html(obj1.data7[DeviceID].datadeviceNo);
						$("#dataTXZT").html(obj1.data7[DeviceID].dataTXZT==1?"离线":"在线");
						
						$("#datatemp").html(obj1.data7[DeviceID].datatemp);
						$("#datahum").html(obj1.data7[DeviceID].datahum);
						$("#dataTVOC").html(obj1.data7[DeviceID].dataTVOC);
						
						$("#dataPM10").html(obj1.data7[DeviceID].dataPM10);
						$("#dataHCHO").html(obj1.data7[DeviceID].dataHCHO);
						$("#dataPM1").html(obj1.data7[DeviceID].dataPM1);
						
						$("#dataPM2_5").html(obj1.data7[DeviceID].dataPM2_5);
						$("#dataCO2").html(obj1.data7[DeviceID].dataCO2);
						$("#dataSO2").html("0");
						if(obj1.datatotalAlarmState.dataSDS==1)
						{
						   $("#SDS").attr("src","ico/ico_fgsyj_on.png");
						}
						else
						{
						   $("#SDS").attr("src","ico/ico_fgsyj_off.png");
						}
						if(obj1.datatotalAlarmState.dataSDX==1)
						{
						   $("#SDX").attr("src","ico/ico_fdsyj_on.png");
						}
						else
						{
						   $("#SDX").attr("src","ico/ico_fdsyj_off.png");
						}
						
						if(obj1.datatotalAlarmState.dataWDS==1)
						{
						   $("#WDS").attr("src","ico/ico_fgwyj_on.png");
						}
						else
						{
						   $("#WDS").attr("src","ico/ico_fgwyj_off.png");
						}
						
						if(obj1.datatotalAlarmState.dataWDX==1)
						{
						   $("#WDX").attr("src","ico/ico_fdwyj_on.png");
						}
						else
						{
						   $("#WDX").attr("src","ico/ico_fdwyj_off.png");
						}
						
						if(obj1.datatotalAlarmState.dataWCS==1)
						{
						   $("#WCS").attr("src","ico/ico_fcyj_on.png");
						}
						else
						{
						   $("#WCS").attr("src","ico/ico_fcyj_off.png");
						}
						
						if(obj1.datatotalAlarmState.dataFFS==1)
						{
						   $("#FFS").attr("src","ico/ico_ffyj_on.png");
						}
						else
						{
						   $("#FFS").attr("src","ico/ico_ffyj_off.png");
						}
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
  <img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="pic0.png"></img>
  <img style="position:absolute;left:4.1%;top:10%;width:6.5%;height:15%;" id="SDS" src="ico/ico_fgsyj_off.png"></img>
  <img style="position:absolute;left:14.3%;top:10%;width:6.5%;height:15%;" id="SDX" src="ico/ico_fdsyj_off.png"></img>
  <img style="position:absolute;left:24.7%;top:10%;width:6.5%;height:15%;" id="WDS" src="ico/ico_fgwyj_off.png"></img>
  <img style="position:absolute;left:35.1%;top:10%;width:6.5%;height:15%;" id="WDX" src="ico/ico_fdwyj_off.png"></img>
  <img style="position:absolute;left:45.8%;top:10%;width:6.5%;height:15%;" id="WCS" src="ico/ico_fcyj_off.png"></img>
  <img style="position:absolute;left:56.2%;top:10%;width:6.5%;height:15%;" id="FFS" src="ico/ico_ffyj_on.png"></img>
 
  <div id="datatemp" style="position:absolute;left:17%;top:33%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">65</div>
  <div id="datahum" style="position:absolute;left:36%;top:33%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">65</div>
  <div id="dataTVOC" style="position:absolute;left:54%;top:33%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">0.02</div>
  <div id="dataPM10" style="position:absolute;left:17%;top:44%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">65</div>
  <div id="dataHCHO" style="position:absolute;left:36%;top:44%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">65</div>
  <div id="dataPM1" style="position:absolute;left:54%;top:44%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">0.02</div>
  
  <div id="dataPM2_5" style="position:absolute;left:17%;top:55%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">65</div>
  <div id="dataCO2" style="position:absolute;left:36%;top:55%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">65</div>
  <div id="dataSO2" style="position:absolute;left:54%;top:55%;width:40px;height:30px;border-radius:12px;font-size:25px;color:#237deb;">0</div>
  
  <div style="position:absolute;left:5%;top:66%;width:60%;height:40px;border:0px solid red;font-size:36;line-height:40px;">
  	湿度范围
  	<input id="minHum" type="text" style="width:13%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	~
  	<input id="maxHum" type="text" style="width:13%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	<span style="color:#9f9f9f;">%RH</span>
	&emsp;&emsp;&emsp;&emsp;
	温度范围
  	<input id="minTemp" type="text" style="width:13%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	~
  	<input id="maxTemp" type="text" style="width:13%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	<span style="color:#9f9f9f;">℃</span>
  </div>
  <div style="position:absolute;left:5%;top:76%;width:60%;height:40px;border:0px solid red;font-size:36;line-height:40px;">
  	防尘上限
  	<input id="minHum" type="text" style="width:29%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	<span style="color:#9f9f9f;">ug/m³</span>
	&emsp;&emsp;&emsp;&ensp;
	防腐上限
  	<input id="minTemp" type="text" style="width:29%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	<span style="color:#9f9f9f;">mg/m³</span>
  </div>
  <div style="position:absolute;left:26%;top:86%;width:20%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	 <button id="btnmode2" style="width:40%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">取消</button>
     <button id="btnok" style="width:40%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:18px;outline:medium">确定</button>
  </div>
  <select id="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	<option value="5" >智能八防控制器</option>
	<option value="4" selected>环境超限专用报警器</option>
	<option value="0" >防盗报警器</option>
	<option value="1" >漏水报警器</option>
  	<option value="2" >烟感报警器</option>
  	<option value="3">防光报警器</option>
  </select>
  <div style="position:absolute;left:6%;bottom:5%;font-size:15px;color:#036ff6">
	设备编号：<span id="datadeviceNo"></span>
  	&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
  	<span style="display:none;">库房索引：<span id="StoreId" ></span></span>
	&emsp;&emsp;库房名称：<span id="StoreName" ></span>
	<span style="display:none;">设备索引：<span id="ACId" ></span></span>
	&emsp;&emsp;设备名称：<span id="ACName" ></span>
	<span style="display:none;">IP地址：<span id="HostName" ></span></span>
	<span style="display:none;">端口：<span id="HttpPort" ></span></span>
	<span style="display:none;"><span id="AcLx" ></span></span>
  </div>
  <select id="DeviceID" style="position:absolute;right:5%;top:10%;width:25%;height:0;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	<option value="0" selected>1号环境超限专用报警器</option>
  	<option value="1">2号环境超限专用报警器</option>
  	<option value="2">3号环境超限专用报警器</option>
  	<option value="3">4号环境超限专用报警器</option>
  	<option value="4">5号环境超限专用报警器</option>
  </select>
</div></body>
</html>