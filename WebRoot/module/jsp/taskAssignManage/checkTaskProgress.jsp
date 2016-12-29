<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>西计实验室管理系统</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	
	<link rel="stylesheet" href="module/css/changeACE.css" />
	 
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
   
  </head>
  
  <body>
	<div class="container" style="width:100%">
  		<div class="row">
			<div class="col-xs-10 col-md-10 col-lg-10">
				<h4>查看任务交接单进度</h4>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<h5 id="receiptlistCode">交接单号:&nbsp;<span></span></h5>
			</div>
		</div>
		<br />
		<!-- 表格 -->
  		<table id="table">
  		</table>
  		<br/>
		<div class="row">
			<div class="col-xs-11 col-md-11 col-lg-11">
			</div>
  			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" class="btn btn-primary" id="return">返回</button>
			</div>
		</div>
	</div>
	<hr/>
  </body>
  
  <script src="module/js/taskAssignManage/checkTaskProgress.js"></script>
</html>
