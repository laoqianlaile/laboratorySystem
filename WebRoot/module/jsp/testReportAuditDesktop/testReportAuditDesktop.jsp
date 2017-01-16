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
	<div id="left" class="container" style="width:60%;float:left">
		<div class="row">
			<div class="col-xs-12 col-md-12 col-lg-12">
				<h4>当前检测报告编号: <span id="currentReportCode"></span></h4>
			</div>
		</div>
		<br />	
		<div class="row">
			<div class="col-xs-2 col-md-2 col-lg-2">
				<button type="button" id="viewReportList" class="btn btn-primary">查看检测报告列表</button>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3"></div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<button type="button" id="auditReport" class="btn btn-primary">审核检测报告</button>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3"></div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<button type="button" id="printReport" class="btn btn-primary">打印报告</button>
			</div>
		</div>
		<br />
		<hr />
		<!-- 表格 -->
		<table id="table">
		</table>
	</div>
	<span id="departmentID" style="display:none"></span>
	<div id="right" style="width:40%;float:right">
		<div class="container" style="height:350px;width:100%;">
			<div class="row">
				<div class="col-xs-2 col-md-2 col-lg-2">
					<h4>文档: </h4>
				</div>
				<div class="col-xs-6 col-md-6 col-lg-6"></div>
				<div class="col-xs-2 col-md-2 col-lg-2">
					<button type="button" id="viewFile" class="btn btn-primary">查看</button>
				</div>
				<div class="col-xs-2 col-md-2 col-lg-2">
					<button type="button" id="downloadFile" class="btn btn-primary">下载</button>
				</div>
			</div>
			<hr />
			<!-- 文件表格 -->
	  		<table id="fileTable">
	  		</table>
		</div>
		<div class="container" style="width:100%;">
			<!-- 提醒消息表格 -->
	  		<table id="messageTable">
	  		</table>
		</div>
	</div>
  </body>
  
  <script src="module/js/testReportAuditDesktop/testReportAuditDesktop.js"></script>
  <script src="module/js/fileManage/fileManage.js"></script>
</html>
