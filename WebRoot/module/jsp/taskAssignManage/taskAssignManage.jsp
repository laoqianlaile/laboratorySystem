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
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css" href="module/css/changeACE.css" />

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="assets/js/autoPage.js"></script>
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
	width: 20%;
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
.row {
	margin-left: 0;
	margin-right: 0;
}

.button-wrap {
	height: 70px;
	background-color: #e8f3f9;
	position: relative;
}

#search {
	position: absolute;
	right: 30px;
	top: 50%;
	margin-top: -17px;
}

#all {
	position: absolute;
	right: 110px;
	top: 50%;
	margin-top: -17px;
}

#search:hover {
	background: #ffc773;
}

#all:hover {
	background: #ffc773;
}

</style>

</head>

<body>
	<div id="searcherArea">
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>交接单号：</label><input type="text" id="receiptlistCode"
					name="receiptlistCode" class="form-control"
					aria-describedby="basic-addon1">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>合同编号：</label><input type="text" id="contractCode"
					name="contractCode" class="form-control"
					aria-describedby="basic-addon1">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>委托单位：</label><input type="text" id="companyName"
					name="companyName" class="form-control"
					aria-describedby="basic-addon1">
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>委托人：</label><input type="text" id="linkMan" name="linkMan"
					class="form-control" aria-describedby="basic-addon1">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<div class="timeLabelDiv">
					<label class="control-label">委托时间:</label>
				</div>
				<div class="input-group date form_datetime timeChooseDiv">
					<input class="form-control" id="acceptSampleTime_start" size="16"
						type="text" value="" readonly="true"> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<div class="timeLabelDiv">
					<label class="control-label">至:</label>
				</div>
				<div class="input-group date form_datetime timeChooseDiv">
					<input class="form-control" id="acceptSampleTime_end" size="16"
						type="text" value="" readonly="true"> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>检测/校准进度：</label><select id="state" name="state"
					class="form-control" aria-describedby="basic-addon1">
					<option value="-1"></option>
					<option value="1">检测中</option>
					<option value="2">已完成</option>
				</select>
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>分配状态：</label><select id="assignState" name="assignState"
					class="form-control" aria-describedby="basic-addon1">
					<option value="-1"></option>
					<option value="1">未分配</option>
					<option value="2">已分配</option>
				</select>
			</div>
		</div>
		<div class="button-wrap">
			<button type="button" id="all" class="btn btn-primary">全部</button>
			<button type="button" id="search" class="btn btn-primary">查询</button>
		</div>
		</div>
	</div>
	<hr />
	<!-- 表格 -->
	<table id="table"></table>
	<span id="departmentID" style="display:none;"></span>
</body>

<script src="module/js/taskAssignManage/taskAssignManage.js"></script>

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
