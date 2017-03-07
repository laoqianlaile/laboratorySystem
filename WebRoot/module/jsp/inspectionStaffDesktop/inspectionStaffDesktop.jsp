<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>西计实验室管理系统</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
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

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>

<style type="text/css">
.form-control {
	display: inline;
	width: 60%;
}

.row {
	margin-bottom: 10px;
}

.row label {
	width: 30%;
	min-width: 80px;
}

.headHr {
	border: 1px solid black;
	margin-bottom: 5px;
	margin-top: 0px;
}

.row .btn {
	width: 150px;
}

#table {
	border: 1px solid;
	text-align: center;
}

.col-xs-12 textarea {
	width: 90%;
}
</style>
</head>

<body>
	<div id="left" class="container" style="width:70%;float:left">
		<div class="row">
			<div class="col-xs-6">
				<label>当前任务编号 ： </label> <input type="text" id="taskCode" name="taskCode"
					class="form-control" readonly />
			</div>
			<div class="col-xs-6">
				<label>所属交接单编号 ： </label> <input type="text" id="receiptlistCode"
					name="receiptlistCode" class="form-control" readonly />
			</div>
		</div>
		<div class="row ">
			<div class="col-xs-12">
				<label>依据的技术文件 （代号、名称）及客户要求： </label>
				<textarea id="accordingDoc" name="accordingDoc" class="form-control"
					type="text" rows="3" readonly style="border:0px;"></textarea>
			</div>
		</div>
		<hr class="headHr">
		<div class="row ">
			<div class="col-xs-4">
				<button type="button" class="btn btn-primary glyphicon "
					onclick="register()">设备登记</button>
			</div>
			<div class="col-xs-4">
				<button type="button" class="btn btn-primary glyphicon "
					onclick="download()">下载初始报告</button>
			</div>
			<div class="col-xs-4">
				<button type="button" class="btn btn-primary glyphicon "
					onclick="submit()">提交审核</button>
			</div>
		</div>
		<div class="row ">
			<div class="col-xs-4">
				<button type="button" class="btn btn-primary glyphicon "
					onclick="viewTask()">查看正在审核的任务</button>
			</div>

			<div class="col-xs-4">
				<button type="button" class="btn btn-primary glyphicon "
					onclick="viewReport()">查看报告</button>
			</div>
			<div class="col-xs-4">
				<button type="button" class="btn btn-primary glyphicon "
					onclick="upload()">上传报告</button>
			</div>
		</div>
		<table id="taskTable">
		</table>
	</div>

	<div id="right" class="container" style="width:30%;float:right">
		<div class="footer">
			<sapn>消息提示</sapn>
			<table id="messageTable"></table>
		</div>
	</div>
</body>
<script src="module/js/inspectionStaffDesktop/inspectionStaffDesktop.js"></script>
</html>
