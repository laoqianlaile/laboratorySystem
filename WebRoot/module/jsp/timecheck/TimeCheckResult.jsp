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
    
    <title>满意</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
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
  			<div class="row">
  			<div class="col-xs-4 col-md-4 col-lg-4">
    			<label style="width: 25%">计划项目编号:</label>
    			<input id="projectcode" type="text" class="form-control text">
    		</div>
    		<div class="col-xs-4 col-md-4 col-lg-4">
    			<label>比对/核查点:</label>
    			<input id="projectpoint" type="text" class="form-control text">
    		</div>
   			<div class="col-xs-4 col-md-4 col-lg-4">
    			<label>负责部门:</label>
    			<div class="btn-group" style="width: 70%">
				  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" style="width: 100%;height: 34px;">
				    <span id="textspan1"></span> <span style="position:absolute;left:95%;top:15px;" class="caret"></span>
				  </button>
				  <ul id="listul1" class="dropdown-menu" role="menu" style="width:100%;">
				  </ul>
				</div>
    		</div>
    		</div>
    		
    		<div class="row">
    		<div class="col-xs-4 col-md-4 col-lg-4">
    			<div class="timeLabelDiv" style="width: 26%">
					<label style="width: 100%">计划完成时间:</label>
				</div>
    			<div class="input-group date form_datetime timeChooseDiv">
					<input class="form-control" id="starttime" size="16"
						type="text" value="" readonly="true"> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
				</div>
    			<!-- <input id="starttime" type="text" class="form-control text time">
    			<button type="button" class="btn btn-default btn-lg timeStyle" onclick="timeget(1)">
				  <span class="glyphicon glyphicon-time"></span> 
				</button> -->
    		</div>
    		
    		<div class="col-xs-4 col-md-4 col-lg-4">
	    		<div class="timeLabelDiv" style="width: 21%;">
	    			<label>至</label>
	    		</div>
    		    <div class="input-group date form_datetime timeChooseDiv">
					<input class="form-control" id="endtime" size="16"
						type="text" value="" readonly="true"> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
				</div>
			<!-- 	<input id="endtime" type="text" class="form-control text time">
    			<button type="button" class="btn btn-default btn-lg timeStyle" onclick="timeget(2)">
				  <span class="glyphicon glyphicon-time"></span> 
				</button> -->
    		</div>
    		<div class="col-xs-4 col-md-4 col-lg-4">
    			<label>项目名称:</label>
    			<input id="projectname" type="text" class="form-control">
    		</div>
    		</div>
    		
    		<!-- <div class="headtext">
    			<span class="spanstyle">负&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;责&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人&nbsp;:</span>
    			<div class="btn-group">
				  <button id="listbutton2" class="btn btn-default mystyle dropdown-toggle" type="button" data-toggle="dropdown">
				    <span id="textspan2"></span><span style="position:absolute;left:175px;top:15px;" class="caret"></span>
				  </button>
				  <ul id="listul2" class="dropdown-menu" role="menu" style="width:200px;">

				  </ul>
				</div>
    		</div> -->
  		</div>
  		<div id="restcontent">
  				<button type="button" class="btn btn-primary Allbtn" onclick="resetAlldata()">全部数据</button>
    			<button type="button" class="btn btn-primary OKbtn" onclick="onupdataaudit(8)">满意</button>
    			<button type="button" class="btn btn-primary NObtn" onclick="onupdataaudit(9)">不满意</button>
  			    <button id="searchbtn" type="button" class="btn btn-primary btncss" onclick="refresh()">搜索</button>
  		</div>
  		<hr />
  		<div id="center">
    		<div class="tablecontent">
	    		<table id="table">
	    		</table>
    		</div>
  		</div>
  		<hr />
  		<div id="bottom">
  			<div>
    			<button type="button" class="btn btn-primary thisbtn" onclick="download()">下载</button>
    		</div>
    		<div class="tablecontent">
    			<table id="tablefile">
    			</table>
    		</div>
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
	<script src="module/js/timecheck/TimeCheckResult.js"></script>
  	<script>
/*   	 function timeget(num){
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
			language:'zh-CN'     
		});
		if(num==1)
			$('#starttime').focus();
		if(num==2)
			$('#endtime').focus();
  	}  */
	$('.form_datetime').datetimepicker({
	    language: 'zh-CN',
	    weekStart: 1,
	    todayBtn: 1,
	    autoclose: 1,
	    todayHighlight: 1,
	    startView: 2,
	    minView: 2,
	    forceParse: 0,
	    format: 'yyyy-mm-dd'
	});
  	</script>
  </body>
</html>
