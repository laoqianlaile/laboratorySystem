<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String qualiyPlanId = request.getParameter("qualiyPlanId");
if(qualiyPlanId!=null&&qualiyPlanId!="")
	session.setAttribute("qualiyPlanId",qualiyPlanId);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>审核</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-table.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/timecheck/TimeCheck.css">
	
	
    
    
  </head>
  
  <body>
   <div id="main">
   		<div id="showdiv1" class="alert alert-danger tan"></div>
  		<div id="font">
  			<%=request.getParameter("year") %>年度检测/校准结果质量保证/期间核查建议
  		</div>
  		<div id="head">
  			<p id="Serialnumber">编号:<label><%=request.getParameter("code") %></label></p>
  			<br />
  			<br />
  			<div class="headtext">
    			<span class="spanstyle">计划项目编号:</span>
    			<input id="projectcode" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">比对/核查点:</span>
    			<input id="projectpoint" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">计划完成时间:</span>
    			<input id="starttime" type="text" class="form-control text time">
    			<button type="button" class="btn btn-default btn-lg timeStyle" onclick="timeget(1)">
				  <span class="glyphicon glyphicon-time"></span> 
				</button>
				至
				<input id="endtime" type="text" class="form-control text time">
    			<button type="button" class="btn btn-default btn-lg timeStyle" onclick="timeget(2)">
				  <span class="glyphicon glyphicon-time"></span> 
				</button>
    		</div>
    		<div class="headtext">
    			<button id="searchbtn" type="button" class="btn btn-info btncss" onclick="refresh()">搜索</button>
    		</div>
    		<br />
    		<br />
    		<div class="headtext">
    			<span class="spanstyle">项&nbsp;&nbsp;目&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;称:</span>
    			<input id="projectname" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">负&nbsp;&nbsp;责&nbsp;部&nbsp;&nbsp;门:</span>
    			<div class="btn-group">
				  <button class="btn btn-default mystyle dropdown-toggle" type="button" data-toggle="dropdown">
				    <span id="textspan1"></span> <span style="position:absolute;left:175px;top:15px;" class="caret"></span>
				  </button>
				  <ul id="listul1" class="dropdown-menu" role="menu" style="width:200px;">

				  </ul>
				</div>
    		</div>
    		<div class="headtext">
    			<!-- <span class="spanstyle">负&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;责&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人&nbsp;:</span>
    			<div class="btn-group">
				  <button id="listbutton2" class="btn btn-default mystyle dropdown-toggle" type="button" data-toggle="dropdown">
				    <span id="textspan2"></span><span style="position:absolute;left:175px;top:15px;" class="caret"></span>
				  </button>
				  <ul id="listul2" class="dropdown-menu" role="menu" style="width:200px;">

				  </ul>
				</div> -->
    		</div>
  		</div>
  		<hr />
  		<div id="center">
  			<div >
  				<button type="button" class="btn btn-info thisbtn" onclick="resetAlldata()">全部数据</button>
    			<button type="button" class="btn btn-info thisbtn" onclick="onupdataaudit(1)">通过</button>
    			<button type="button" class="btn btn-info thisbtn" onclick="onupdataaudit(2)">不通过</button>
    		</div>
    		<div class="tablecontent">
	    		<table id="table">
	    		</table>
    		</div>
  		</div>
  		<hr />
  		<div id="bottom">
  		</div>
  	</div>
  	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script src="assets/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="assets/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/jquery.uploadify.min.js"></script>
	<script src="module/js/timecheck/TimeCheckAudit.js"></script>
  	<script>
  	function timeget(num){
  		$('.time').datetimepicker({
  			minView:'month',
			format: 'yyyy-mm-dd',
			weekStart:1,
			todayBtn:1,
			autoclose:1,
			todayHighlight:1,
			startView:2,
			forceParse:0,
			showMeridian:1,
			language:'zh-CN'      /*此属性是显示顺序，还有显示顺序是mm-dd-yyyy*/
		});
		if(num==1)
			$('#starttime').focus();
		if(num==2)
			$('#endtime').focus();
  	}
  	</script>
  </body>
</html>
