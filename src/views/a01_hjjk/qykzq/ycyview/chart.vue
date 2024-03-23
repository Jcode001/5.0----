<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>环境曲线界面</title>
		<!--<script type="text/javascript" src="/assets/js/jquery-1.11.3.min.js" ></script>-->
		<script type="text/javascript" src="/assets/js/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="/assets/js/jquery.md5.js" ></script>
		<script type="text/javascript" src="/assets/js/jquery.cookie.min.js" ></script>
		<script type="text/javascript" src="/assets/js/highcharts.js"></script>
		<script type="text/javascript" src="/assets/js/exporting.js"></script>
		<script type="text/javascript" src="/assets/js/highcharts-zh_CN.js"></script>
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
        var fsstate=0;
		$(document).ready(function(){ 
			$('#DeviceID').change(function(){
			   showAuto();
			})
			$('#sttime').change(function(){
			   showAuto();
			})
			$('#DeviceType').change(function(){ 
				//alert($(this).val()+$(this).children('option:selected').text());
				DeviceType=$(this).val();
				if(DeviceType==0)window.location.href="../qykzqview/chart.html"; 
                if(DeviceType==1)window.location.href="../ytjview/chart.html"; 
                if(DeviceType==2)window.location.href="../jkytfhjview/chart.html"; 
                if(DeviceType==3)window.location.href="../bgsxfjview/chart.html"; 
                if(DeviceType==4)window.location.href="../sxqtjhjview/chart.html"; 
                if(DeviceType==5)window.location.href="../hwktview/chart.html"; 
                if(DeviceType==6)window.location.href="../jmktview/chart.html"; 
                if(DeviceType==7)window.location.href="../ycyview/chart.html";
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
								item+="if("+Obj.data[i].AcLx+"==1)";
								item+="{";
								item+="   	window.location.href = '/hjjk/qykzq/qykzqview/index.html';";
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
		})
		function getTime(date)
		{
			var year = date.getFullYear();
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			var hour = date.getHours()< 10 ? "0" + date.getHours() : date.getHours();
			return year+'/'+month+'/'+day+' '+hour;
		}
		function showAuto()
		{
			Highcharts.setOptions({
			    global: {
			        useUTC: false
			    }
			    ,
			    colors:"#c63cff,#1c81ef".split(","),
			    symbols: ["circle","circle"],
			});
			
			
			var endDate = new Date();
			var startDate=new Date();
			if($('#sttime').val()==0)
			   startDate=new Date(endDate.getTime()-86400000);
			else if($('#sttime').val()==1)
			   startDate=new Date(endDate.getTime()-86400000*7);
			else if($('#sttime').val()==2)
			   startDate=new Date(endDate.getTime()-86400000*30);
			else if($('#sttime').val()==3)
			   startDate=new Date(endDate.getTime()-86400000*365);
			var startdate=getTime(startDate)
			var enddate=getTime(endDate)
			 
			var indata={}
			indata['cmd']='60001';
			indata['localip']='127.0.0.1';
			indata['hostname']='222.222.126.240';
			indata['port']='8006';
			indata['method']='KFPTService/getHJSJBySpecific';
			indata['jsonin']='{"ip":"'+$('#HostName').html()+'","deviceType":"7","deviceNo":"'+$('#DeviceID').val()+'","startDate": "'+startdate+'","endDate": "'+enddate+'"}';
			//console.log(indata)
			console.log(JSON.stringify(indata))
			$('#url').html('http://'+indata['hostname']+':'+indata['port']+"/"+indata['method']);
			$('#jsonin').html(indata['jsonin']);
			
			$.ajax({
					type: "POST",
					url: "http://127.0.0.1:4444/getRfid",
					data: indata,
					success: function(Obj,status){
						if(Obj==null)return;
						console.log(JSON.stringify(Obj))
						if(Obj.flag==1)
						{
							showmsg('数据获取成功！');
							var datas=Obj.data;
							$('#record').html('');
							var x,y,index;
							var options = {
							    chart: {
							        renderTo: 'container',
							        type: 'line',
							        //backgroundColor: 'rgba(0,0,0,0)',
							        //marginRight: 10,
									margin: [40,40,40, 40],
							        events: {
							            load: function() {
							                // set up the updating of the chart each second
							                // var series = this.series[0];
							                
							            }
							        }
							    },
							    title: {
							        text: ''
							    },
							    subtitle: {
							        text: " "
							    },
							    credits: {
							        enabled: false
							    },
							    xAxis: {
							        type: 'datetime',
							        //tickPixelInterval: 80,
							        allowDecimals: false,
							    	labels:{
							    		style:{
							    			color: '#0',
									        //fontWeight: "blod",
									        fontFamily: "微软雅黑"
							    		}
							    	},
							    },
							    yAxis: {
							        title: {
							            text: ''
							        },
							        labels: {
							            formatter: function () {
							                return this.value;
							            },
							        	style:{
							    			color: '#0',
									        fontFamily: "微软雅黑"
							    		}
							        }
							    },
							    tooltip: {
							        formatter: function() {
							            return '<b>' + this.series.name + '</b><br/>' +
							                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + '<span style="color:#08c">' +
							                Highcharts.numberFormat(this.y, 2) + '' + '</span>';
							        }
							    },
							    plotOptions: {
							        area: {
							            marker: {
							                enabled: true,
							                symbol: 'circle',
							                radius: 0,
							                states: {
							                    hover: {
							                        enabled: true
							                    }
							                }
							            }
							        }
							    },
							    legend: {
							        enabled: true,
									align: 'left', //水平方向位置
								　　verticalAlign: 'top', //垂直方向位置
							    },
							    exporting: {
							        enabled: false
							    },
							    series: [{
							        name: '温度（ ℃)',
							        data: (function() {
							            // generate an array of random data
							            data1 = [];
										for(i=0;i<datas.length;i++)
										{
											itemdata=datas[i];
											data1.push({
											    x: (new Date(itemdata.recordTime)).getTime(),
											    y: Number(itemdata.temp)
											});
										}
							            return data1;
							        })()
							    }, {
							        name: '湿度(%RH)',
							        data: (function() {
							            // generate an array of random data
							           // generate an array of random data
							           data1 = [];
							           for(i=0;i<datas.length;i++)
							           {
							           	itemdata=datas[i];
							           	data1.push({
							           	    x: (new Date(itemdata.recordTime)).getTime(),
							           	    y: Number(itemdata.hum)
							           	});
							           }
							            return data1;
							        })()
							    }]
							};
							chart = new Highcharts.Chart(options);
							
						}
						else 
						{
							showmsg(Obj.msg);
						}
					},
					error:function(msg){
						showmsg('数据获取失败！'+msg.status);//状态码
					}
			})
		}
		
	</script>
</head>
<body style="margin:0;padding:0">

<div style="position:absolute;left:2%;top:8%;width:14%;height:92%;background-color:#0049a5;border-radius:12px">
<ul style="position:absolute;left:1%;top:8%;width:76%;height:80%;background-color:#0049a5;font-size:20px;color:#ffffff;list-style-type:null;list-style-image:url(kf.png);" id="menutree">

</ul>
</div>
<div style="position:absolute;left:2%;top:0%;width:14%;height:8%;background-color:#004095;border-radius:12px 12px 0 0;">
<img style="position:absolute;left:5%;top:30%;vertical-align:middle;" src="home.png"></img>
<span style="width:90%;color:#7df9fa;position:absolute;left:25%;top:26%;text-align:left;font-size:20px">库房列表</span>
</div>
<div style="position:absolute;right:2%;top:0%;width:80%;height:100%;background-color:#e5eef7;border-radius:12px">
  <img style="position:absolute;left:0%;top:0%;width:100%;height:100%" src="chart.png"></img>
  <div style="position:absolute;left:50%;top:2%;width:50%;height:40px;border:0px solid red;font-size:20px;line-height:40px">
  <a href="index.html"><button style="width:15%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">设备页面</button></a>
  <a href="report.html"><button style="width:15%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">数据报表</button></a>
  <button id="btncharts" style="width:15%;height:100%;border:3px solid #0049a5;color:#ffffff;background-color:#0049a5;border-radius:6px;outline:medium">数据曲线</button>
  <select id="sttime" style="width:15%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium;border-radius:6px;outline:none">
  	<option value="0" selected>近24小时</option>
  	<option value="1">近7天</option>
  	<option value="2">近30天</option>
  	<option value="3">近一年</option>
  </select>
  <button id="btnclear" style="width:15%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">清空记录</button>
  <button id="btnexport" style="width:15%;height:100%;border:3px solid #0049a5;color:#0049a5;background-color:#ffffff;border-radius:6px;outline:medium">数据导出</button>
  </div>
  <div style="position:absolute;left:4%;top:2%;width:20%;height:50px;">设备类型:
  <select id="DeviceType" style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none">
    <option value="0" >智能区域控制器</option>
	<option value="1">净化除酸型除湿加湿一体机</option>
  	<option value="2">健康防护一体机</option>
  	<option value="3">壁挂式新风净化机</option>
  	<option value="4">酸性气体空气净化机</option>
  	<option value="5">红外空调</option>
  	<option value="6">精密空调</option>
  	<option value="7" selected>空气质量云测仪</option>
  </select>
  </div>
  <div style="position:absolute;left:24%;top:2%;width:20%;height:50px;">设备编号:
   <select id="DeviceID" style="width:70%;height:100%;border:1px solid #e6eef8;border-radius:6px;outline:none">
	<option value="1#" selected>1号空气质量云测仪</option>
  	<option value="2#">2号空气质量云测仪</option>
  	<option value="3#">3号空气质量云测仪</option>
  	<option value="4#">4号空气质量云测仪</option>
  	<option value="5#">5号空气质量云测仪</option>
	<option value="6#">6号空气质量云测仪</option>
  	<option value="7#">7号空气质量云测仪</option>
  	<option value="8#">8号空气质量云测仪</option>
  	<option value="9#">9号空气质量云测仪</option>
  	<option value="10#">10号空气质量云测仪</option>
	<option value="11#">11号空气质量云测仪</option>
  	<option value="12#">12号空气质量云测仪</option>
  	<option value="13#">13号空气质量云测仪</option>
  	<option value="14#">14号空气质量云测仪</option>
  	<option value="15#">15号空气质量云测仪</option>
   </select>
  </div>
  <div id="container" style="position:absolute;left:3%;top:11%;width:94%;height:83%;"></div>
  
  <div style="position:absolute;left:3%;bottom:2%;font-size:15px;color:#036ff6">
  	设备编号：<span id="datadeviceNo"></span>
  	&emsp;&emsp;&emsp;&emsp;通讯状态：<span id="dataTXZT"></span>
  	<span style="display:none;">库房索引：<span id="StoreId" ></span></span>
  	&emsp;&emsp;&emsp;&emsp;库房名称：<span id="StoreName" ></span>
  	<span style="display:none;">设备索引：<span id="ACId" ></span></span>
  	&emsp;&emsp;&emsp;&emsp;设备名称：<span id="ACName" ></span>
  	<span style="display:none;">IP地址：<span id="HostName" ></span></span>
  	<span style="display:none;">端口：<span id="HttpPort" ></span></span>
  	<span style="display:none;"><span id="AcLx" ></span></span>
  	<span style="display:none;">请求方法：<span id="url"></span></span>
  	<span style="display:none;">请求参数：<span id="jsonin"></span></span>
  	<span style="display:none;"><span id="stime"></span></span>
  </div>
</div> </body>
</html>