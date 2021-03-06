<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" href="module/css/changeACE.css" />

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/commonTool.js"></script>
<!-- <script src="assets/js/autoPage.js"></script> -->
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

.button-wrap {
	height: 70px;
	background-color: #e8f3f9;
	position: relative;
}

#all {
	position: absolute;
	right: 190px;
	top: 50%;
	margin-top: -17px;
}

#search {
	position: absolute;
	right: 110px;
	top: 50%;
	margin-top: -17px;
}

#return {
	position: absolute;
	right: 30px;
	top: 50%;
	margin-top: -17px;
}

.btn:hover {
	background: #ffc773;
}

</style>
</head>

<body>
	<div class="container" style="width:100%">
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">合同编号:</label> <input
					class="form-control" id="contractCode">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label my-label">交接单号:</label> <input
					class="form-control" id="receiptlistCode">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">委托单位:</label> <input
					class="form-control" id="companyName">
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label timeLabelDiv">委托时间:</label>
				<div class="input-group date form_datetime timeChooseDiv">
					<input class="form-control" id="acceptSampleTime_start" size="16"
						type="text" value="" readonly> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label timeLabelDiv">至:</label>
				<div class="input-group date form_datetime timeChooseDiv">
					<input class="form-control" id="acceptSampleTime_end" size="16"
						type="text" value="" readonly> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label class="control-label">样品名称</label> <input
					class="form-control" id="sampleName">
			</div>
		</div>
		<div class="button-wrap">
			<button type="button" id="all" class="btn btn-primary">全部</button>
			<button type="button" id="search" class="btn btn-primary">查询</button>
			<button type="button" id="return" class="btn btn-primary">返回</button>
		</div>
	</div>
	<br />
	<!-- 表格 -->
	<table id="table">
	</table>
</body>

<script src="module/js/taskStatistical/taskStatisticalDetail.js"></script>

<script type="text/javascript">
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
</html>
