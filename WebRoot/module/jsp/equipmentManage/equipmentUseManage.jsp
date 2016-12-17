<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>仪器设备使用记录</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
	<style type="text/css">
	.list-searcher {
		min-width: 300px;
		height: 40px;
		margin-left: 60px;
	}
	.list-searcher input {
		display: inline-block;
		margin-right: 20px;
		width: 200px;
	}
	
	.list-searcher span {
		display: inline-block;
		
	}
	.list-searcher select {
		width:120px;
		display: inline-block;
	}
	.backgray{
	  	background: gray;
	}
	.fixed-table-container .bs-checkbox {
	    text-align: center;
	    vertical-align: middle;
	}
	#searcherArea{
	 	min-width: 1300px;
	}
	.bootstrap-table{
		min-width: 1500px;
	}
	</style>
</head>
<body>
  
 	 <!-- 功能按钮 -->
 	 <div id="searcherArea">
		<div class="list-searcher">
			<span>样品名称：</span><input type="text" id="schSampleName" name="schSampleName" class="form-control" >
			<span>检测项目：</span><input type="text" id="schTestProject" name="schTestProject" class="form-control" >
			<span>使用人：</span><input type="text" id="schApplicat" name="schApplicat" class="form-control" >
		</div>
		<div class="list-searcher">
		    <span>设备名称：</span><input type="text" id="schEquipmentName" name="schEquipmentName" class="form-control" >
			<span>使用时间：</span><input type="date" id="schStartTime" name="schStartTime" class="form-control" > 
			<span>至</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="date" id="schEndTime" name="schEndTime" class="form-control" >
		</div>
	</div>
  	 <div class="input-group" style="float: right;margin-bottom: 10px;">
  	 	<button type="button" onclick="search()" class="btn btn-primary glyphicon glyphicon-search">&nbsp;查询</button>
  		<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
  		</div> 
  		
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/equipmentManage/equipmentUseManage.js"></script>
 </html>
