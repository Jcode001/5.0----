<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>精密空调界面</title>
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
   button:hover {
		transform: scale(0.9);
	}
   button:hover:after {
	 transform: scale(1);
	}
</style>
<script> 
var objDiv;
function showmsg(msg) { 
    objDiv = $("#msgbox"); 
	/**
	   这里我们可以使用ajax从数据库获取数据动态改变提示框里的内容
	   $.post('./test.php',{act:"ajax_get_ifo", goods_id:goods_id}, function (res){
					objDiv.html("<br>"+res.data+"<br>");
				}, 'json');
	**/
	$(objDiv).css("display","block"); 
	// e=e||window.event;  // 兼容firefox
	$(objDiv).css("left", "50%");   // 初始化，防止叠加
	$(objDiv).css("top", "5%"); 
	//var e = window.event || arguments.callee.caller.arguments[0];
	//$(objDiv).css("left", e.clientX + 30); 
	//$(objDiv).css("top", e.clientY - 45); 
	$(objDiv).html("&emsp;&emsp;"+msg+"&emsp;&emsp;");
	t = setTimeout("hide()", 2000);
} 
function hide() {
    var objDiv = $("#msgbox");  
	$(objDiv).css("display", "none"); 
} 
</script> 
<div id="msgbox" style="position:absolute;z-index:99;display:none;border:0;background:#036ff6;border-radius:5px;color:white;font-size:16px;filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.7;border-radius:20px;line-height:50px;"></div> 

<script>
	    $(document).ready(function(){ 
			$('#DeviceID').change(function(){ 
			   showAuto();
			})
			$('#DeviceType').change(function(){ 
				//alert($(this).val()+$(this).children('option:selected').text());
				DeviceType=$(this).val();
				if(DeviceType==0)window.location.href="../qykzqview/index.html"; 
				if(DeviceType==1)window.location.href="../ytjview/index.html"; 
				if(DeviceType==2)window.location.href="../jkytfhjview/index.html"; 
				if(DeviceType==3)window.location.href="../bgsxfjview/index.html"; 
				if(DeviceType==4)window.location.href="../sxqtjhjview/index.html"; 
				if(DeviceType==5)window.location.href="../hwktview/index.html"; 
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
							    if(Obj.data[i].AcLx==2)continue;
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
								item+="if("+Obj.data[i].AcLx+"==3)";
								item+="{";
								item+="   	window.location.href = '/hjjk/wrkfkzq/wrkfkzqview/index.html';";
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
		　　looptimer = setInterval("showAuto()", 1000*60);//界面刷新时间30S
			$("#btnopen").bind("click",function(){
			     clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60);
			     $("#btnopen").css("color","#ffffff");
				 $("#btnopen").css("background-color","#036ff6");
				 $("#btnclose").css("color","#036ff6");
				 $("#btnclose").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setPower",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"deviceType\":6,\"deviceNo\":\""+$("#datadeviceNo").html()+"\",\"operaFlag\":1}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
					},
					error:function(msg){
						
					}
				})
			});
			$("#btnclose").bind("click",function(){
			     clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
				 $("#btnclose").css("color","#ffffff");
				 $("#btnclose").css("background-color","#036ff6");
				 $("#btnopen").css("color","#036ff6");
				 $("#btnopen").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setPower",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"deviceType\":6,\"deviceNo\":\""+$("#datadeviceNo").html()+"\",\"operaFlag\":0}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
					},
					error:function(msg){
						
					}
				})
			});
			$("#btnmode1").bind("click",function(){
			     clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60);
			     $("#btnmode1").css("color","#ffffff");
				 $("#btnmode1").css("background-color","#036ff6");
				 $("#btnmode2").css("color","#036ff6");
				 $("#btnmode2").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setModel",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"deviceType\":6,\"deviceNo\":\""+$("#datadeviceNo").html()+"\",\"operaFlag\":0}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
					},
					error:function(msg){
						
					}
				})
			});
			$("#btnmode2").bind("click",function(){
			     clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
				 $("#btnmode2").css("color","#ffffff");
				 $("#btnmode2").css("background-color","#036ff6");
				 $("#btnmode1").css("color","#036ff6");
				 $("#btnmode1").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setModel",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"deviceType\":6,\"deviceNo\":\""+$("#datadeviceNo").html()+"\",\"operaFlag\":1}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
					},
					error:function(msg){
						
					}
				})
			});
			$("#btnHumSet").bind("click",function(){
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setJSCSLimit",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"deviceType\":6,\"deviceNo\":\""+$("#datadeviceNo").html()+"\",\"minHum\":"+$("#minHum").val()+",\"maxHum\":"+$("#maxHum").val()+"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
						else
						{
							alert(Obj.msg);
						}
					},
					error:function(msg){
						
					}
				})
			});
			$("#btnTempSet").bind("click",function(){
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setZLZRLimit",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"deviceType\":6,\"deviceNo\":\""+$("#datadeviceNo").html()+"\",\"minTemp\":"+$("#minTemp").val()+",\"maxTemp\":"+$("#maxTemp").val()+"}"
			            }
			     $.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						if(Obj.flag=="1")
						{
							//alert("命令执行成功"+data)
							showmsg("命令执行成功"+data);
						}
						else
						{
							alert(Obj.msg);
						}
					},
					error:function(msg){
						
					}
				})
			});
		})
		function showAuto(){
		　　var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/getStatus",
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
						console.log(JSON.stringify(obj1.data6[DeviceID]))
						$("#datadeviceNo").html(obj1.data6[DeviceID].datadeviceNo);
						$("#dataTXZT").html(obj1.data6[DeviceID].dataTXZT==1?"离线":"在线");
						$("#datatemp").html("<i>"+obj1.data6[DeviceID].datatemp+"<small>°C</small></i>");
						$("#datahum").html("<i>"+obj1.data6[DeviceID].datahum+"<small>%RH</small></i>");
						
						$("#dataZRZT").html(obj1.data6[DeviceID].dataZRZT==1?"开启":"关闭");
						$("#dataZLZT").html(obj1.data6[DeviceID].dataZLZT==1?"开启":"关闭");
						$("#dataJSZT").html(obj1.data6[DeviceID].dataJSZT==1?"开启":"关闭");
						$("#dataCSZT").html(obj1.data6[DeviceID].dataCSZT==1?"开启":"关闭");
						
						$("#minHum").val(obj1.data6[DeviceID].dataminHum);
						$("#maxHum").val(obj1.data6[DeviceID].datamaxHum);
						$("#minTemp").val(obj1.data6[DeviceID].dataminTemp);
						$("#maxTemp").val(obj1.data6[DeviceID].datamaxTemp);
						
					},
					error:function(msg){
						
					}
			})
		}
	</script>
</head>
<body style="margin:0;padding:0">

<div style="position:absolute;left:2%;top:8%;width:14%;height:92%;background-color:#0049a5;border-radius:12px">
  <ul style="position:absolute;left:1%;top:8%;width:76%;height:80%;background-color:#0049a5;font-size:20px;color:#ffffff;list-style-type:null;list-style-image:url(kf.png);" id="menutree">
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
  <img style="position:absolute;left:0%;top:0%;width:100%;height:100%" src="pic2.png"></img>
  <div style="position:absolute;left:70%;top:3.8%;width:25%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
    <button style="width:32%;height:100%;border:3px solid #0049a5;color:#ffffff;background-color:#0049a5;border-radius:6px;outline:medium">设备页面</button>
	<a href="report.html"><button style="width:32%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">数据报表</button></a>
	<a href="chart.html"><button id="btncharts" style="width:32%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">数据曲线</button></a>
  </div>
  <span style="position:absolute;left:16%;top:26%;font-size:56px;color:#ffffff" id="datatemp"></span>
  <span style="position:absolute;left:45%;top:26%;font-size:54px;color:#ffffff" id="datahum"></span>
  <div style="position:absolute;left:5.5%;top:45%;width:60%;height:40px;font-size:20px;line-height:40px">
  开关机&emsp;
  <button id="btnopen" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">开</button>
  <button id="btnclose" style="width:10%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">关</button>
  &emsp;&emsp;&emsp;&emsp;
  制热状态:
  <span style="color:#036ff6;" id="dataZRZT"></span>
  &emsp;&emsp;
  &emsp;&emsp;制冷状态:
  <span style="color:#036ff6;" id="dataZLZT"></span>
  </div>
  <div style="position:absolute;left:5.5%;top:55%;width:60%;height:40px;font-size:20px;line-height:40px">
  模&emsp;式&emsp;
  <button id="btnmode1" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">手动</button>
  <button id="btnmode2" style="width:10%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">自动</button>
  &emsp;&emsp;&emsp;&emsp;
  加湿状态:
  <span style="color:#036ff6;" id="dataJSZT"></span>
  &emsp;&emsp;
  &emsp;&emsp;除湿状态:
  <span style="color:#036ff6;" id="dataCSZT"></span>
  </div>
  <div style="position:absolute;left:7%;top:70%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	湿度范围
  	<input id="minHum" type="text" style="width:23%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	&emsp;~&emsp;
  	<input id="maxHum" type="text" style="width:23%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<span style="color:#9f9f9f;">%RH</span>
	<button id="btnHumSet" style="width:10%;height:100%;border:0;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">确认</button>
	&emsp;&emsp;&emsp;
  </div>
  <div style="position:absolute;left:7%;top:80%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	温度范围
  	<input id="minTemp" type="text" style="width:23%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	&emsp;~&emsp;
  	<input id="maxTemp" type="text" style="width:23%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	<span style="color:#9f9f9f;">℃</span>
	<button id="btnTempSet" style="width:10%;height:100%;border:0;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">确认</button>
	&emsp;&emsp;&emsp;&emsp;&ensp;
  </div>
   <select id="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	<option value="0">区域控制器</option>
	<option value="1">净化除酸型除湿加湿一体机</option>
  	<option value="2">健康防护一体机</option>
  	<option value="3">壁挂式新风净化机</option>
	<option value="4">酸性气体空气净化机</option>
  	<option value="5">红外空调</option>
  	<option value="6" selected>精密空调</option>
  	<option value="7" >空气质量云测仪</option>
  </select>
  <div style="position:absolute;left:6%;bottom:8%;font-size:15px;color:#036ff6">
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
  <select id="DeviceID" style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	<option value="0" selected>精密空调1</option>
  	<option value="1">精密空调2</option>
  	<option value="2">精密空调3</option>
  	<option value="3">精密空调4</option>
  	<option value="4">精密空调5</option>
  </select>
</div></body>
</html>