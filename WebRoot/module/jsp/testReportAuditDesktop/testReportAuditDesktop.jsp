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
	<link rel="stylesheet"  type="text/css" href="module/css/wait.css">
	 
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
    .tidings {
		margin-top: 35PX;
	}
	.tidingHead ul li:FIRST-CHILD {
	margin-left:-33px;
	}
	.tidingHead ul li {
		float:left;
		width:80px;
		list-style:none;
		color: #fff;
	    border-radius: 5px;
	    padding-left: 13px;
	    margin-right: 10px;
	    margin-bottom: 4px;
	    background: #c5d0dc;
	}
	.tidingHead ul li:hover {
		
	}
	.tidingHead ul li.selected {
		 background: #0a8fe7;
	}
    </style>
    
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
		<div class="container" style="min-height:200px;;width:100%;">
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
			<div class="tidings">
				<div class="tidingHead">
					<ul>
						<li class=" selected ">提示信息</li>
						<li>已读信息</li>
					</ul>
				</div>
				<br />
				<br />
				<div class="tidingsTable"></div>
			</div>
		</div>
	</div>
	
	<div id="wait_img" style="display:none">
		<img src="module/img/wait.jpg" style="width:48px;height:48px;" />
	</div>
	<div id="mask" style="display:none"></div>
	
  </body>
  
  <script src="module/js/testReportAuditDesktop/testReportAuditDesktop.js"></script>
  <script src="module/js/wait.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script> 
	<script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
</html>
