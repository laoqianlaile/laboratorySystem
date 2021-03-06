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
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
	<link rel="stylesheet" href="module/css/changeACE.css" />
	 
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
    <!--<script src="assets/js/autoPage.js"></script> -->
    <link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
    <script src="module/js/sweetalert.min.js"></script>
  </head>
  
  <body>
	<div class="container" style="width:100%">
		<div class="row">
			<div class="col-xs-1 col-md-1 col-lg-1">
				<h5>科室:</h5>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<select class="form-control" id="department">
					<option value="-1"></option>
				</select>
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<h5>人员:</h5>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<select class="form-control" id="employee">
					<option value="-1"></option>
				</select>
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<h5>任务类型:</h5>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<select class="form-control" id="type">
					<option value="-1"></option>
					<option value="0">检测</option>
					<option value="1">校准</option>
				</select>
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" id="search" class="btn btn-primary">查询</button>
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" id="refresh" class="btn btn-primary">刷新</button>
			</div>
		</div>
		<br />
		<hr />
		<!-- 表格 -->
		<table id="table">
		</table>
	</div>
	<hr>
  </body>
  
  <script src="module/js/personalTaskStatistical/personalTaskStatistical.js"></script>
</html>
