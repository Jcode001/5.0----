<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>空气质量云测仪界面</title>
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
		　		//　t = setInterval("showAuto()", 1000*5);
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
						console.log(JSON.stringify(obj1.data7[DeviceID]))
						$("#datadeviceNo").html(obj1.data7[DeviceID].datadeviceNo);
						$("#dataTXZT").html(obj1.data7[DeviceID].dataTXZT==1?"离线":"在线");
						$("#datatemp").html("<i>"+obj1.data7[DeviceID].datatemp+"<small>°C</small></i>");
						$("#pm2_5").html("<i>"+obj1.data7[DeviceID].datapm2_5+"<small>ug/m³</small></i>");
						$("#datahum").html("<i>"+obj1.data7[DeviceID].datahum+"<small>%RH</small></i>");
						$("#TVOC").html("<i>"+obj1.data7[DeviceID].dataTVOC+"<small>mg/m³</small></i>");
						$("#pm10").html("<i>"+obj1.data7[DeviceID].datapm10+"<small>ug/m³</small></i>");
						
						$("#HCHO").html("<i>"+obj1.data7[DeviceID].dataHCHO+"<small>mg/m³</small></i>");
						$("#CO2").html("<i>"+obj1.data7[DeviceID].dataCO2+"<small>ppm</small></i>");
						$("#pm1").html("<i>"+obj1.data7[DeviceID].datapm1+"<small>ug/m³</small></i>");
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
  <span style="position:absolute;left:13.5%;top:33%;font-size:30px;color:#036ff6" id="datatemp"></span>
  <span style="position:absolute;left:32%;top:33%;font-size:28px;color:#036ff6" id="pm2_5"></span>
  <span style="position:absolute;left:52.6%;top:33%;font-size:28px;color:#036ff6" id="datahum"></span>
  <span style="position:absolute;left:22%;top:56%;font-size:16px;color:#51de90" id="TVOC"></span>
  <span style="position:absolute;left:54%;top:56%;font-size:16px;color:#ff3f78" id="pm10"></span>
  <span style="position:absolute;left:22%;top:66%;font-size:16px;color:#18d7cb" id="HCHO"></span>
  <span style="position:absolute;left:54%;top:66%;font-size:16px;color:#036ff6" id="CO2"></span>
  <span style="position:absolute;left:22%;top:77%;font-size:16px;color:#f76060" id="pm1"></span>
  <span style="position:absolute;left:54%;top:77%;font-size:16px;color:#2898ca" id="SO2">0mg/m³</span>
  
  <select id="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	<option value="0">区域控制器</option>
	<option value="1">净化除酸型除湿加湿一体机</option>
  	<option value="2">健康防护一体机</option>
  	<option value="3">壁挂式新风净化机</option>
	<option value="4">酸性气体空气净化机</option>
  	<option value="5">红外空调</option>
  	<option value="6" >精密空调</option>
  	<option value="7" selected>空气质量云测仪</option>
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
  	<option value="0" selected>1号空气质量云测仪</option>
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
  	<option value="14">15号空气质量云测仪</option>
  </select>
</div></body>
</html>