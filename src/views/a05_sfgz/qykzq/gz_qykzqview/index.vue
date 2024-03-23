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
				if(DeviceType==0)window.location.href="../gz_qykzqview/index.html"; 
				if(DeviceType==1)window.location.href="../gz_fdview/index.html"; 
				if(DeviceType==2)window.location.href="../gz_lsview/index.html"; 
				if(DeviceType==3)window.location.href="../gz_ygview/index.html"; 
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
							item+="if("+Obj.data[i].AcLx+"==2)";
							item+="{";
							item+="   	window.location.href = '/webroot/bfgz/bfkzq/gz_bfkzqview/index.html';";
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
		  　looptimer = setInterval("showAuto()", 1000*60);
		   
		    $("#btnmjyxmode1").bind("click",function(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btnmjyxmode1").css("color","#ffffff");
				 $("#btnmjyxmode1").css("background-color","#036ff6");
				 $("#btnmjyxmode2").css("color","#036ff6");
				 $("#btnmjyxmode2").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setDoorDefence",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"operaFlag\":\"0\"}"
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
			$("#btnmjyxmode2").bind("click",function(){
				 clearInterval(looptimer);
				 looptimer= setInterval("showAuto()",1000*60); 
			    
			     $("#btnmjyxmode2").css("color","#ffffff");
				 $("#btnmjyxmode2").css("background-color","#036ff6");
				 $("#btnmjyxmode1").css("color","#036ff6");
				 $("#btnmjyxmode1").css("background-color","#ffffff");
		    	 var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/setDoorDefence",
							     "jsonin":"{\"ip\":\""+$('#HostName').html()+"\",\"operaFlag\":\"1\"}"
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
		})
		function showAuto(){
		　　var indata={
			            	"cmd":60001,
			            	"localip":"127.0.0.1",
			            	"hostname":"10.168.1.39",
			            	"port":"8066",
							      "method":"KFPTService/getTotalRunState",
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
						var obj1=JSON.parse(data1);
						//console.log(data)
						console.log(JSON.stringify(obj1.datatotalAlarmState))
						if(obj1.MJ==1)
						{
						   $("#mj").attr("src","ico/ico_mjbj_on.png");
						}
						else
						{
						   $("#mj").attr("src","ico/ico_mjbj_off.png");
						}
						if(obj1.LS==1)
						{
						   $("#ls").attr("src","ico/ico_lsbj_on.png");
						}
						else
						{
						   $("#ls").attr("src","ico/ico_lsbj_off.png");
						}
						if(obj1.YG==1)
						{
						   $("#yg").attr("src","ico/ico_ygbj_on.png");
						}
						else
						{
						   $("#yg").attr("src","ico/ico_ygbj_off.png");
						}
						/**
						if(obj1.YG)
						{
							 $("#btnmjyxmode1").css("color","#ffffff");
							 $("#btnmjyxmode1").css("background-color","#036ff6");
							 $("#btnmjyxmode2").css("color","#036ff6");
							 $("#btnmjyxmode2").css("background-color","#ffffff");
						}
						else 
						{
						     $("#btnmjyxmode2").css("color","#ffffff");
							 $("#btnmjyxmode2").css("background-color","#036ff6");
							 $("#btnmjyxmode1").css("color","#036ff6");
							 $("#btnmjyxmode1").css("background-color","#ffffff");
						}**/
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
	<li style="padding-top:10px;padding-bottom:10px;"><span>八防控制器1</span><a id="a1" hidden>123123</a></li>
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
  <img style="position:absolute;left:7%;top:17.5%;width:16.2%;height:21%;" id="mj" src="ico/ico_mjbj_off.png"></img>
  <img style="position:absolute;left:26%;top:17.5%;width:16.2%;height:21%;" id="ls" src="ico/ico_lsbj_off.png"></img>
  <img style="position:absolute;left:45%;top:17.5%;width:16.2%;height:21%;" id="yg" src="ico/ico_ygbj_off.png"></img>
  <div style="position:absolute;left:7%;top:42%;width:60%;height:40px;border:0px solid red;font-size:20px;line-height:40px;">
  	门禁运行状态：
  	<button id="btnmjyxmode1" style="width:13%;height:100%;border:3px solid #036ff6;color:#ffffff;background-color:#036ff6;border-radius:20px;font-size:18px;outline:medium">布防</button>
    <button id="btnmjyxmode2" style="width:13%;height:100%;border:3px solid #036ff6;color:#036ff6;background-color:#ffffff;border-radius:20px;font-size:18px;outline:medium">撤防</button>
  </div>
  <select id="DeviceType" style="position:absolute;left:2.3%;top:3.8%;width:15%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none">
  	 <option value="0" selected>区域控制器</option>  
    <option value="1" >防盗报警器</option>
	<option value="2">漏水报警器</option>
  	<option value="3">烟感报警器</option>
  </select>
  <div style="position:absolute;left:3%;bottom:2%;font-size:16px;color:#036ff6">
	设备编号：<span id="datadeviceNo"></span>
	&emsp;&emsp;通讯状态：<span id="dataTXZT"></span></span>
	<span style="display:none;">库房索引：<span id="StoreId" ></span></span>
	&emsp;&emsp;库房名称：<span id="StoreName" ></span>
	<span style="display:none;">设备索引：<span id="ACId" ></span></span>
	&emsp;&emsp;设备名称：<span id="ACName" ></span>
	&emsp;&emsp;IP地址：<span id="HostName" ></span>
	<span style="display:none;">&emsp;&emsp;端口：<span id="HttpPort" ></span></span>
	<span style="display:none;"><span id="AcLx" ></span></span>
  </div>
  <select id="DeviceID" style="position:absolute;right:5%;top:20%;width:25%;height:40px;border:1px solid #e6eef8;border-radius:6px;outline:none;display: none;">
  	<option value="0" selected>智能区域控制器</option>
  </select>
</div> 
</body>
</html>