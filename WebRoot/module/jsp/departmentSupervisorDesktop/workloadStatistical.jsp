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
    <link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
    <script src="module/js/sweetalert.min.js"></script>
   <style>
	.list-searcher {
	min-width: 300px;
	height: 40px;
}

.list-searcher input {
	display: inline-block;
	margin-right: 20px;
	width: 200px;
}

.list-searcher span {
	display: inline-block;
	width: 90px;
}

.fixed-table-container .bs-checkbox {
	text-align: center;
	vertical-align: middle;
}

.list-searcher select {
	display: inline-block;
	width: 200px;
}

.input-group {
	margin-top: 10px;
}

.input-group .btn {
	margin-left: 3px;
}

.form-control {
	display: inline;
	width: 70%;
}

.row {
	margin-bottom: 10px;
}

.row label {
	width: 20%;
	min-width: 80px;
}

.timeLabelDiv {
	float: left;
	height: 34px;
	min-width: 80px;
}

.timeLabelDiv label {
	margin-top: 7px;
}

.timeChooseDiv {
	width: 70%;
	margin-top: 0px;
}

.input-group-addon {
	background-color: #fff;
}
   </style>
  </head>
  
  <body>
 	 <div class="container" style="width:100%;">
  		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">检测人员:</label>
				<input class="form-control input-group" id="detector">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">样品名称:</label>
				<input class="form-control" id="sampleName">
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3"></div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" id="search" class="btn btn-primary">查询</button>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">样品编号:</label>
				<input class="form-control" id="factoryCode">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">检测项目:</label>
				<input class="form-control" id="testProject">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4"></div>
		</div>
		<hr/>
		<!-- 表格 -->
 		<table id="table"></table>
 		<br />
 		<hr />
 		<div class="row">
 			<div class="col-xs-11 col-md-11 col-lg-11"></div>
 			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" id="return" class="btn btn-primary">返回</button>
			</div>
		</div>
  	</div>
  </body>
  
  <script src="module/js/departmentSupervisorDesktop/workloadStatistical.js"></script>
  <script src="assets/js/autoPage.js"></script>
</html>
