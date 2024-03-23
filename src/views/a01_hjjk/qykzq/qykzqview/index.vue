<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>智能环境区域控制器界面</title>
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
				$("#minHum").val($.cookie('minHum')==undefined?"40":$.cookie('minHum'))
				$("#maxHum").val($.cookie('maxHum')==undefined?"60":$.cookie('maxHum'))
				$("#minTemp").val($.cookie('minTemp')==undefined?"16":$.cookie('minTemp'))
				$("#maxTemp").val($.cookie('maxTemp')==undefined?"24":$.cookie('maxTemp'))
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
		　  looptimer = setInterval("showAuto()", 1000*5);
			$("#btnopen").bind("click",function(){
				            $("#btnopen").css("color","#ffffff");
						    $("#btnopen").css("background-color","#036ff6");
						    $("#btnclose").css("color","#ffffff");
						    $("#btnclose").css("background-color","#036ff6");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setAllPower",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"operaFlag\":1}"
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
				            $("#btnopen").css("color","#ffffff");
						    $("#btnopen").css("background-color","#036ff6");
						    $("#btnclose").css("color","#ffffff");
						    $("#btnclose").css("background-color","#036ff6");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setAllPower",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"operaFlag\":0}"
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
				$("#btnmode1").css("color","#ffffff");
				 $("#btnmode1").css("background-color","#036ff6");
				 $("#btnmode2").css("color","#ffffff");
				 $("#btnmode2").css("background-color","#036ff6");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setAllAuto",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"operaFlag\":0}"
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
				$("#btnmode1").css("color","#ffffff");
				 $("#btnmode1").css("background-color","#036ff6");
				 $("#btnmode2").css("color","#ffffff");
				 $("#btnmode2").css("background-color","#036ff6");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setAllAuto",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"operaFlag\":1}"
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
			$("#btnon").bind("click",function(){
				$("#btnon").css("color","#ffffff");
				 $("#btnon").css("background-color","#036ff6");
				 $("#btnoff").css("color","#ffffff");
				 $("#btnoff").css("background-color","#036ff6");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setAllbulbs",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"operaFlag\":1}"
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
			$("#btnoff").bind("click",function(){
				$("#btnon").css("color","#ffffff");
				 $("#btnon").css("background-color","#036ff6");
				 $("#btnoff").css("color","#ffffff");
				 $("#btnoff").css("background-color","#036ff6");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setAllbulbs",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"operaFlag\":0}"
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
							      "method":"KFPTService/setAllHLimit",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"minHum\":"+$("#minHum").val()+",\"maxHum\":"+$("#maxHum").val()+"}"
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
							$.cookie('minHum', $("#minHum").val(), { expires: 7 });
							$.cookie('maxHum', $("#maxHum").val(), { expires: 7 });
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
							      "method":"KFPTService/setAllAirLimit",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"minTemp\":"+$("#minTemp").val()+",\"maxTemp\":"+$("#maxTemp").val()+"}"
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
							$.cookie('minTemp', $("#minTemp").val(), { expires: 7 });
							$.cookie('maxTemp', $("#maxTemp").val(), { expires: 7 });
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
		    if($('#HostName').html()=="")return;
		　　var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/getStatus",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\"}"
			}
			getdata(indata,'msg');
			
			　var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/getTotalRunState",
							      "jsonin":"{\"ip\":\""+$('#HostName').html()+"\"}"
			}
			getdata1(indata,'msg');
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
						console.log(data1)
						data1=data1.replace(/"([^"]*)":/g, "\"data$1\":");
						var obj1=JSON.parse(data1);
						console.log(data)
						var DeviceID=$("#DeviceID").val();
						console.log(JSON.stringify(obj1.data7[DeviceID]))
						$("#datadeviceNo").html(obj1.data7[DeviceID].datadeviceNo);
						$("#dataTXZT").html(obj1.data7[DeviceID].dataTXZT==1?"离线":"在线");
						$("#datatemp").html("<i>"+obj1.data7[DeviceID].datatemp+"<small>°C</small></i>");
						$("#datahum").html("<i>"+obj1.data7[DeviceID].datahum+"<small>%RH</small></i>");
					},
					error:function(msg){
						
					}
			})
		}
		function getdata1(indata,ctlname)
		{
			$.ajax({
					type: "GET",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						var data=JSON.stringify(Obj)
						$("#"+ctlname).html(data);
						var data1=JSON.stringify(Obj.data);
						console.log(data1)
						var obj1=JSON.parse(data1);
						if(obj1.Hot==1)
						{
						   $("#Hot").attr("src","ico/ico_zr_on.png");
						}
						else
						{
						   $("#Hot").attr("src","ico/ico_zr_off.png");
						}
						if(obj1.Cool==1)
						{
						   $("#Cool").attr("src","ico/ico_zl_on.png");
						}
						else
						{
						   $("#Cool").attr("src","ico/ico_zl_off.png");
						}
						if(obj1.CS==1)
						{
						   $("#CS").attr("src","ico/ico_cs_on.png");
						}
						else
						{
						   $("#CS").attr("src","ico/ico_cs_off.png");
						}
						if(obj1.JS==1)
						{
						   $("#JS").attr("src","ico/ico_js_on.png");
						}
						else
						{
						   $("#JS").attr("src","ico/ico_js_off.png");
						}
  
						if(obj1.ZJH==1)
						{
						   $("#ZJH").attr("src","ico/ico_zjh_on.png");
						}
						else
						{
						   $("#ZJH").attr("src","ico/ico_zjh_off.png");
						}
						if(obj1.WJH==1)
						{
						   $("#WJH").attr("src","ico/ico_wjh_on.png");
						}
						else
						{
						   $("#WJH").attr("src","ico/ico_wjh_off.png");
						}
						if(obj1.XF==1)
						{
						   $("#XF").attr("src","ico/ico_xf_on.png");
						}
						else
						{
						   $("#XF").attr("src","ico/ico_xf_off.png");
						}
						if(obj1.JH==1)
						{
						   $("#JH").attr("src","ico/ico_jh_on.png");
						}
						else
						{
						   $("#JH").attr("src","ico/ico_jh_off.png");
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
  <span style="position:absolute;left:15%;top:24%;font-size:50px;color:#ffffff" id="datatemp"></span>
  <span style="position:absolute;left:45%;top:24%;font-size:50px;color:#ffffff" id="datahum"></span>
  
  <img id="Hot" style="position:absolute;left:5.8%;top:39.8%;width:12.2%;height:16%;" src="ico/ico_zr_off.png"></img>
  <img id="Cool" style="position:absolute;left:20.3%;top:39.8%;width:12.2%;height:16%;" src="ico/ico_zl_off.png"></img>
  <img id="CS" style="position:absolute;left:34.8%;top:39.8%;width:12.2%;height:16%;" src="ico/ico_cs_off.png"></img>
  <img id="JS" style="position:absolute;left:49.3%;top:39.8%;width:12.2%;height:16%;" src="ico/ico_js_off.png"></img>
  
  
  <img id="ZJH" style="position:absolute;left:5.8%;top:58%;width:12.2%;height:16%;" src="ico/ico_zjh_off.png"></img>
  <img id="WJH" style="position:absolute;left:20.3%;top:58%;width:12.2%;height:16%;" src="ico/ico_wjh_off.png"></img>
  <img id="XF" style="position:absolute;left:34.8%;top:58%;width:12.2%;height:16%;" src="ico/ico_xf_off.png"></img>
  <img id="JH" style="position:absolute;left:49.3%;top:58%;width:12.2%;height:16%;" src="ico/ico_jh_off.png"></img>
  <div style="position:absolute;left:5%;top:77%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
  开关机
  <button id="btnopen" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">开</button>
  <button id="btnclose" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">关</button>
  <!--<button id="btnopen" style="width:10%;height:100%;border:0;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">开</button>
  <button id="btnclose" style="width:10%;height:100%;border:0;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">关</button>-->
  &emsp;&emsp;
  模&emsp;式
  <button id="btnmode1" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">手动</button>
  <button id="btnmode2" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">自动</button>
  &emsp;&emsp;
  开关灯
  <button id="btnon" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">开</button>
  <button id="btnoff" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">关</button>
  <!--<button id="btnon" style="width:10%;height:100%;border:0;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">开</button>
  <button id="btnoff" style="width:10%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:18px;font-size:18px;outline:medium">关</button>-->
  </div>
  <div style="position:absolute;left:5%;top:86%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	湿度范围
  	<input id="minHum" type="text" style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	~
  	<input id="maxHum" type="text" style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	<span style="color:#9f9f9f;">%RH</span>
	<button id="btnHumSet" style="width:8%;height:100%;border:0;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">确认</button>
    &emsp;&emsp;
	温度范围
  	<input id="minTemp" type="text" style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	~
  	<input id="maxTemp" type="text" style="width:10%;height:100%;color:#9f9f9f;background-color:#ebf4fb;border:2px solid #9f9f9f;text-align:center;font-size:18px;" value="0"/>
  	<span style="color:#9f9f9f;">℃</span>
	<button id="btnTempSet" style="width:8%;height:100%;border:0;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">确认</button>
  </div>
   <select id="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	<option value="0" selected>区域控制器</option>
	<option value="1">净化除酸型除湿加湿一体机</option>
  	<option value="2">健康防护一体机</option>
  	<option value="3">壁挂式新风净化机</option>
	<option value="4">酸性气体空气净化机</option>
  	<option value="5">红外空调</option>
  	<option value="6" >精密空调</option>
  	<option value="7" >空气质量云测仪</option>
  </select>
  <div style="position:absolute;left:3.06%;bottom:2.4%;font-size:16px;color:#036ff6">
  	设备编号：<span id="datadeviceNo"></span>
  	&nbsp&nbsp&nbsp&nbsp&nbsp通讯状态：<span id="dataTXZT"></span>
  	<span style="display:none;">库房索引：<span id="StoreId" ></span></span>
		&nbsp&nbsp&nbsp&nbsp&nbsp库房名称：<span id="StoreName" ></span>
		<span style="display:none;">设备索引：<span id="ACId" ></span></span>
		&nbsp&nbsp&nbsp&nbsp&nbsp设备名称：<span id="ACName" ></span>
		&nbsp&nbsp&nbsp&nbsp&nbsp&nbspIP地址：<span id="HostName" ></span>
		<span style="display:none;">&nbsp端口：<span id="HttpPort" ></span></span>
		<span style="display:none;"><span id="AcLx" ></span></span>
  </div>
  <select id="DeviceID" style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none;display: none;">
  	<option value="0" selected>智能环境区域控制器1</option>
  </select>
</div></body>
</html>