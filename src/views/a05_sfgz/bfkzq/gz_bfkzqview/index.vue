<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>智能八防控制器界面</title>
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
   #menu .qhbg{background-color: #999;border:2px solid #999; color:#fff}
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
		　  t = setInterval("showAuto()", 1000*60);
		$("#HostName").html(sessionStorage.getItem('HostName'))
			var sysname=decodeURIComponent($.cookie('sysname'))
            var sysname=sysname.replace(/\+/g,"&ensp;")
            $("#sysname").html(sysname)
			showAuto();
		  　looptimer = setInterval("showAuto()", 1000*60);
		   

		  //btnok
		  //$('#menu li ul li span').click(function(){
			//		$('#menu li ul li').removeClass('qhbg');
			//		$(this).parent().addClass('qhbg');
			//		//alert($(this).text())
			//		alert($(this).parent().find('#a1').text())
		  // })
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
						//console.log(data)
						console.log(JSON.stringify(obj1.datatotalAlarmState))
						
						$("#dataSDX").val(obj1.dataaverageEnvironmentData.dataSDX);
						$("#dataSDS").val(obj1.dataaverageEnvironmentData.dataSDS);
						$("#dataWDX").val(obj1.dataaverageEnvironmentData.dataWDX);
						$("#dataWDS").val(obj1.dataaverageEnvironmentData.dataWDS);
						
						
						$("#dataFCS").val(obj1.dataaverageEnvironmentData.dataFCS);
						$("#dataFGS").val(obj1.dataaverageEnvironmentData.dataFGS);
						$("#dataFFS").val(obj1.dataaverageEnvironmentData.dataFFS);
						

						
						if(obj1.datatotalAlarmState.dataMJ==1)
						{
						   $("#MJ").attr("src","ico/ico_mjbj_on.png");
						}
						else
						{
						   $("#MJ").attr("src","ico/ico_mjbj_off.png");
						}
						if(obj1.datatotalAlarmState.dataLS==1)
						{
						   $("#LS").attr("src","ico/ico_lsbj_on.png");
						}
						else
						{
						   $("#LS").attr("src","ico/ico_lsbj_off.png");
						}
						if((obj1.datatotalAlarmState.dataWDS==1)||(obj1.datatotalAlarmState.dataWDX==1))
						{
						   $("#WD").attr("src","ico/ico_wdbj_on.png");
						}
						else
						{
						   $("#WD").attr("src","ico/ico_wdbj_off.png");
						}
						if((obj1.datatotalAlarmState.dataSDS==1)||(obj1.datatotalAlarmState.dataSDX==1))
						{
						   $("#SD").attr("src","ico/ico_sdbj_on.png");
						}
						else
						{
						   $("#SD").attr("src","ico/ico_sdbj_off.png");
						}
						
						if(obj1.datatotalAlarmState.dataYG==1)
						{
						   $("#YG").attr("src","ico/ico_ygbj_on.png");
						}
						else
						{
						   $("#YG").attr("src","ico/ico_ygbj_off.png");
						}
						if(obj1.datatotalAlarmState.dataWCS==1)
						{
						   $("#WC").attr("src","ico/ico_wcbj_on.png");
						}
						else
						{
						   $("#WC").attr("src","ico/ico_wcbj_off.png");
						}
						if(obj1.datatotalAlarmState.dataFFS==1)
						{
						   $("#FF").attr("src","ico/ico_ffbj_on.png");
						}
						else
						{
						   $("#FF").attr("src","ico/ico_ffbj_off.png");
						}
						if(obj1.datatotalAlarmState.dataGZS==1)
						{
						   $("#FG").attr("src","ico/ico_fgbj_on.png");
						}
						else
						{
						   $("#FG").attr("src","ico/ico_fgbj_off.png");
						}
						
						var DeviceID=$("#DeviceID").val();
						console.log(JSON.stringify(obj1.data10[DeviceID]))
						$("#datadeviceNo").html(obj1.data10[DeviceID].datadeviceNo);
						$("#dataTXZT").html(obj1.data10[DeviceID].dataTXZT==1?"离线":"在线");
						if(obj1.data10[DeviceID].dataalarm=="0")
						$("#dataalarm").attr('src','pic0.png');
						else
						$("#dataalarm").attr('src','pic.png');
						if(obj1.data1[DeviceID].datapowerZT==1)
						{
						   $("#btnmode1").css("color","#ffffff");
						   $("#btnmode1").css("background-color","#036ff6");
						   $("#btnmode2").css("color","#036ff6");
						   $("#btnmode2").css("background-color","#ffffff");
						}
						else
						{
						   $("#btnmode2").css("color","#ffffff");
						   $("#btnmode2").css("background-color","#036ff6");
						   $("#btnmode1").css("color","#036ff6");
						   $("#btnmode1").css("background-color","#ffffff");
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
<!--<li><span>演示库房</span>
	<ul style="padding-left:10px;background-color:#0049a5;font-size:18px;color:#ffffff;list-style-type:null;list-style-image:url(hjkzq.png);">
	<li style="padding-top:10px;padding-bottom:10px;"><span>环境控制器1</span></li>
	<li style="padding-top:10px;padding-bottom:10px;">环境控制器2</li>
	</ul>
</li>
<li><span>演示库房2</span>
	<ul style="padding-left:10px;background-color:#0049a5;font-size:18px;color:#ffffff;list-style-type:null;list-style-image:url(bfkzq.png);">
	<li style="padding-top:10px;padding-bottom:10px;"><span>八防控制器1</span><a id="a1" hidden>123123</a></li>
	<li style="padding-top:10px;padding-bottom:10px;">八防控制器2</li>
	</ul>
</li>-->
</ul>
</div>
<div style="position:absolute;left:2%;top:0%;width:14%;height:8%;background-color:#004095;border-radius:12px 12px 0 0;">
<img style="position:absolute;left:5%;top:30%;vertical-align:middle;" src="home.png"></img>
<span style="width:90%;color:#7df9fa;position:absolute;left:25%;top:26%;text-align:left;font-size:20px">库房列表</span>
</div>
<div style="position:absolute;right:2%;top:0%;width:80%;height:100%;background-color:#e5eef7;border-radius:12px">
  <img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="pic0.png"></img>
  <div style="position:absolute;left:5%;top:16%;width:30%;height:5%;">
  <a href="index.html"  style="color:blue;font-size:23px;text-decoration:none;">基本参数</a>&emsp;&emsp;&emsp;
  <div style="position:absolute;left:0%;bottom:0%;width:20%;height:4px;background-color:blue;"></div>
  <a href="index1.html" style="color:black;font-size:23px;text-decoration:none;">定时运行</a>
  </div>
  <img style="position:absolute;left:5.1%;top:24.7%;width:12.2%;height:16%;" id="MJ" src="ico/ico_mjbj_off.png"></img>
  <img style="position:absolute;left:19.3%;top:24.7%;width:12.2%;height:16%;" id="LS" src="ico/ico_lsbj_off.png"></img>
  <img style="position:absolute;left:33.5%;top:24.7%;width:12.2%;height:16%;" id="WD" src="ico/ico_wdbj_off.png"></img>
  <img style="position:absolute;left:47.7%;top:24.7%;width:12.2%;height:16%;" id="SD" src="ico/ico_sdbj_off.png"></img>
  
  <img style="position:absolute;left:5.1%;top:43%;width:12.2%;height:16%;" id="YG" src="ico/ico_ygbj_off.png"></img>
  <img style="position:absolute;left:19.3%;top:43%;width:12.2%;height:16%;" id="WC" src="ico/ico_wcbj_off.png"></img>
  <img style="position:absolute;left:33.5%;top:43%;width:12.2%;height:16%;" id="FF" src="ico/ico_ffbj_off.png"></img>
  <img style="position:absolute;left:47.7%;top:43%;width:12.2%;height:16%;" id="FG" src="ico/ico_fgbj_off.png"></img>
 
  <div style="position:absolute;left:5%;top:61%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	湿度范围：
  	<input id="dataSDX" type="text" style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="dataSDS" type="text" style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<span style="color:#9f9f9f;">%RH</span>
	&emsp;&emsp;&emsp;&emsp;&emsp;
	温度范围：
  	<input id="dataWDX" type="text" style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="dataWDS" type="text" style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<span style="color:#9f9f9f;">℃</span>
  </div>
  <div style="position:absolute;left:5%;top:69.5%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	防尘上限：
  	<input id="dataFCS" type="text" style="width:22%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<span style="color:#9f9f9f;">ug/m³</span>
	&emsp;&emsp;&emsp;&emsp;&emsp;
	防光上限：
  	<input id="dataFGS" type="text" style="width:22%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<span style="color:#9f9f9f;">v/m³</span>
  </div>
   <div style="position:absolute;left:5%;top:78%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	防腐上限：
  	<input id="dataFFS" type="text" style="width:22%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<span style="color:#9f9f9f;">mg/m³</span>
	&emsp;&emsp;&emsp;&emsp;&emsp;
    门禁设置：
  	<button id="btnmjyxmode1" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">布防</button>
    <button id="btnmjyxmode2" style="width:10%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">撤防</button>
    <button id="btnmode2" style="width:10%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">定时</button>
  </div>
   <div style="position:absolute;left:26%;top:86%;width:20%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	 <button id="btnmode2" style="width:40%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">取消</button>
     <button id="btnok" style="width:40%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:18px;outline:medium">确定</button>
   </div>
  <select id="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	<option value="5" selected>智能八防控制器</option>
	<option value="4" >环境超限专用报警器</option>
	<option value="0" >防盗报警器</option>
	<option value="1" >漏水报警器</option>
  	<option value="2" >烟感报警器</option>
  	<option value="3">防光报警器</option>
  </select>
  <div style="position:absolute;left:3%;bottom:1.9%;font-size:16px;color:#036ff6">
  	设备编号：<span id="datadeviceNo"></span>
  	&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
  	<span style="display:none;">库房索引：<span id="StoreId" ></span></span>
	&emsp;&emsp;库房名称：<span id="StoreName" ></span>
	<span style="display:none;">设备索引：<span id="ACId" ></span></span>
	&emsp;&emsp;设备名称：<span id="ACName" ></span>
	&emsp;&emsp;IP地址：<span id="HostName" ></span>
	<span style="display:none;">&emsp;端口：<span id="HttpPort" ></span></span>
	<span style="display:none;"><span id="AcLx" ></span></span>
  </div>
  <select id="DeviceID" style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none;display: none;">
  	<option value="0" selected>智能八防控制器</option>
  </select>
</div>
</body>
</html>