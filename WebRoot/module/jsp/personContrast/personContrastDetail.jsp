<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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
    
    <title>查看人员比对计划详情</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="module/css/personContrast/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" href="module/css/changeACE.css" />
	<link rel="stylesheet" href="module/css/personContrast/PersonContrast.css" />
	 
	<script src="assets/js/jquery-3.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="module/js/personContrast/personContrastDetail.js"></script>
    
  </head>
  
  <body>
    <!-- 搜索框2-->  
  <div class="searchbox2">
	  <form class="form-horizontal" role="form">
		  <div class="form-group">
		  
			  <span class="col-sm-2 control-label" for="projectCode">比对项目编号</span>
			  <div class="col-sm-2">
			  <input type="text" class="form-control" id="projectCode" placeholder="">
			  </div>
			  
			  <span class="col-sm-1 control-label" for="projectName">比对项目</span>
			  <div class="col-sm-2">
			  <input type="text" class="form-control" id="projectName" placeholder="">
			  </div>
			   <span class="col-sm-1 control-label">比对人员</span>
			  <div class="col-sm-2">
			     <input type="text" class="form-control" id="employeeID1" placeholder="">
			  </div>
			  <button type="button" id="" class="btn btn-info" onclick="refresh()">查询</button>
		  </div>
		  
		  <div class="form-group">  
			 
			  <span class="col-sm-2 control-label">测试装置</span>
			  <div class="col-sm-2">
			      <input type="text" class="form-control" id="testDevice" placeholder="">
			  </div>  
			  <span class="col-sm-1 control-label">计划年度</span>
			  <div class="col-sm-2">
			      <input class="form_datetime form-control" id="startTime" type="text">
			  </div>
			  <span class="col-sm-1 control-label">待比对人员</span>
			  <div class="col-sm-2">
			     <input type="text" class="form-control" id="employeeID2" placeholder="">
			  </div>
		  </div>
		  
	  </form>
  </div>
    <!-- 表格-->
    <div class="tablebox">
    <button type="button" class="btn btn-info " onclick="download()">下载</button>
  	<table id="table">
  	</table></div>
  </body>
</html>
