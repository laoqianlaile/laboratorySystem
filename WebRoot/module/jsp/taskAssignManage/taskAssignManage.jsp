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

<link rel="stylesheet" href="module/css/changeACE.css" />
<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>

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

#searcherArea {
	min-width: 1300px;
}

.bootstrap-table {
	min-width: 1500px;
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
	<div id="searcherArea">
		<div class="row">
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>交接单号：</label><input type="text" id="receiptlistCode"
					name="receiptlistCode" class="form-control"
					aria-describedby="basic-addon1">
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>合同编号：</label><input type="text" id="contractCode"
					name="contractCode" class="form-control"
					aria-describedby="basic-addon1">
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>委托单位：</label><input type="text" id="companyName"
					name="companyName" class="form-control"
					aria-describedby="basic-addon1">
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>委托人：</label><input type="text" id="linkMan" name="linkMan"
					class="form-control" aria-describedby="basic-addon1">
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-md-3 col-lg-3">
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
			<div class="col-xs-3 col-md-3 col-lg-3">
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
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>检测/校准进度：</label><select id="state" name="state"
					class="form-control" aria-describedby="basic-addon1">
					<option value="-1"></option>
					<option value="1">检测中</option>
					<option value="2">已完成</option>
				</select>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>分配状态：</label><select id="assignState" name="assignState"
					class="form-control" aria-describedby="basic-addon1">
					<option value="-1"></option>
					<option value="1">未分配</option>
					<option value="2">已分配</option>
				</select>
			</div>
			<div class="row">
				<div class="<col-xs-11></col-xs-11> col-md-11 col-lg-11"></div>
				<div class="col-xs-1 col-md-1 col-lg-1">
					<button type="button" id="search" class="btn btn-primary">查询</button>
				</div>
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
