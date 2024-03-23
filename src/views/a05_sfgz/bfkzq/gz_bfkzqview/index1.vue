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
</style>
<script>
		$(document).ready(function(){ 
			//$('#DeviceType').on('change',function(){
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
							      "jsonin":"{\"ip\":\"10.168.1.5\"}"
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
						console.log(data1)
						//var DeviceID=$("#DeviceID").val();
						//console.log(JSON.stringify(obj1.data10[DeviceID]))
						//$("#datadeviceNo").html(obj1.data10[DeviceID].datadeviceNo);
						//$("#dataTXZT").html(obj1.data10[DeviceID].dataTXZT==1?"离线":"在线");
						pos=0;
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime11").val(opentime);
						$("#closetime11").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime12").val(opentime);
						$("#closetime12").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime21").val(opentime);
						$("#closetime21").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime22").val(opentime);
						$("#closetime22").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime31").val(opentime);
						$("#closetime31").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime32").val(opentime);
						$("#closetime32").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime41").val(opentime);
						$("#closetime41").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime42").val(opentime);
						$("#closetime42").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime51").val(opentime);
						$("#closetime51").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime52").val(opentime);
						$("#closetime52").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime61").val(opentime);
						$("#closetime61").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime62").val(opentime);
						$("#closetime62").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime71").val(opentime);
						$("#closetime71").val(opentime);
						
						opentime=obj1.datatimedGuardSetting[pos].dataopenHour+":"+obj1.datatimedGuardSetting[pos].dataopenMinute;
						closetime=obj1.datatimedGuardSetting[pos].datacloseHour+":"+obj1.datatimedGuardSetting[pos++].datacloseMinute;
						$("#opentime72").val(opentime);
						$("#closetime72").val(opentime);
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
	<li style="padding-top:10px;padding-bottom:10px;"><span>八防控制器1</span></li>
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
  <img style="position:absolute;width:100%;height:100%;" id="dataalarm" src="pic1.png"></img>
  <div style="position:relative;left:5%;top:16%;width:30%;height:5%;">
  <a href="index.html"  style="color:black;font-size:23px;text-decoration:none;">基本参数</a>&emsp;&emsp;&emsp;
  <a href="index1.html" style="color:blue;font-size:23px;text-decoration:none;">定时运行</a>
  <div style="position:absolute;left:32%;bottom:0%;width:20%;height:4px;background-color:blue;"></div>
  </div>
  <table style="position:relative;left:5%;top:16%;width:60%;">
  <tr><th style="height:50px;font-size:23px;color:blue;width:60%;">时段一</th><th style="height:50px;font-size:23px;color:blue;width:40%;">时段二</th></tr>
  <tr >
    <td style="height:50px;font-size:23px;">
    星期日:
	<input id="opentime11" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime11" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
	<td style="height:50px;font-size:23px;">
	<input id="opentime12" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime12" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
  </tr>
  <tr >
    <td style="height:50px;font-size:23px;">
    星期一:
	<input id="opentime21" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime21" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
	<td style="height:50px;font-size:23px;">
	<input id="opentime22" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime22" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
  </tr>
  <tr >
    <td style="height:50px;font-size:23px;">
    星期二:
	<input id="opentime31" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime31" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
	<td style="height:50px;font-size:23px;">
	<input id="opentime32" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime32" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
  </tr>
  <tr >
    <td style="height:50px;font-size:23px;">
    星期三:
	<input id="opentime41" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime41" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
	<td style="height:50px;font-size:23px;">
	<input id="opentime42" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime42" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
  </tr>
  <tr >
    <td style="height:50px;font-size:23px;">
    星期四:
	<input id="opentime51" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime51" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
	<td style="height:50px;font-size:23px;">
	<input id="opentime52" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime52" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
  </tr>
  <tr >
    <td style="height:50px;font-size:23px;">
    星期五:
	<input id="opentime61" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime61" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
	<td style="height:50px;font-size:23px;">
	<input id="opentime62" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime62" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
  </tr>
  <tr >
    <td style="height:50px;font-size:23px;">
    星期六:
	<input id="opentime71" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime71" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
	<td style="height:50px;font-size:23px;">
	<input id="opentime72" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	~
  	<input id="closetime72" type="text" style="width:25%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;"/>
  	<button id="btnmode2" style="width:60px;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">启用</button>
	</td>
  </tr>
  </table>
  <div style="position:absolute;left:26%;top:80%;width:20%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	 <button id="btnmode2" style="width:40%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:5px;font-size:18px;outline:medium">取消</button>
     <button id="btnmode1" style="width:40%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:5px;font-size:18px;outline:medium">确定</button>
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
  <!--<select id="DeviceID" style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	<option value="0" selected>智能八防控制器</option>
  </select>-->
</div></body>
</html>