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
	<link rel="stylesheet" href="module/css/changeACE.css" />
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/equipmentManage/equipmentManage.css">
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
	<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="module/js/sweetalert.min.js"></script>
</head>
<body>
	<div id="searcherArea">
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>样品名称:</label>
				<input type="text" id="schSampleName" name="schSampleName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入样品名称">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>检测项目:</label>
				<input type="text" id="schTestProject" name="schTestProject" class="form-control" aria-describedby="basic-addon1" placeholder="请输入检测项目">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>登记人:</label>
				<input type="text" id="schApplicat" name="schApplicat" class="form-control" aria-describedby="basic-addon1" placeholder="请输入登记人">
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>设备名称:</label>
				<input type="text" id="schEquipmentName" name="schEquipmentName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入设备名称">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">使用时间:</label>
				<div class="input-group date form_datetime timeChooseDiv"> 
   					<input class="form-control" id="schStartTime" size="16" type="text" value="" readonly="true" placeholder="请选择使用时间">
    				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 </div>
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">至</label>
				<div class="input-group date form_datetime timeChooseDiv"> 
   					<input class="form-control" id="schEndTime" size="16" type="text" value="" readonly="true" placeholder="请选择使用时间">
    				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 </div>
			</div>
		</div>
	</div>

	<div class="input-group-area" >
  	 	<button type="button" onclick="search()" class="btn btn-primary glyphicon glyphicon-search">&nbsp;查询</button>
  		<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
	</div>
  		
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/equipmentManage/equipmentUseManage.js"></script>
 </html>
