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
<link rel="stylesheet" type="text/css"
	href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css"
	href="module/css/inspectionStaffDesktop/inspectionStaffDesktop.css" />
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">

<script src="module/js/sweetalert.min.js"></script>
<script src="assets/js/autoPage.js"></script>

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>

</head>

<body>
	<div id="container">
		<div id="left">
			<div class="head">
				<img src="module/img/inspectionStaffDesktop/title.png" /> <label>任务信息</label>
			</div>
			<div class="top">
				<div class="col-xs-12">
					<label>所属交接单编号：</label> <input type="text" id="receiptlistCode"
						name="receiptlistCode" class="form-control" disabled />
				</div>
				<div class="col-xs-12">
					<label
						style="margin-top:20px;margin-right:16px;  vertical-align: top;">依据技术文件</label>
					<textarea id="accordingDoc" name="accordingDoc"
						class="form-control" type="text" rows="3" readonly></textarea>
				</div>
			</div>
			<div class="buttons">
				<div class="row">
					<div class="task_button task_button1">
						<input type="image"
							src="module/img/inspectionStaffDesktop/equipmentregister-_icon.png"
							onclick="register()">
						<p>设备登记</p>
					</div>
					<div class="task_button task_button2">
						<input type="image"
							src="module/img/inspectionStaffDesktop/downloadinitialreport_icon.png"
							onclick="download()">
						<p>下载初始报告</p>
					</div>
					<div class="task_button task_button3">
						<input type="image"
							src="module/img/inspectionStaffDesktop/submitAudit_icon.png"
							onclick="submit()">
						<p>提交审核</p>
					</div>
				</div>
				<div class="row">
					<div class="task_button task_button4">
						<input type="image"
							src="module/img/inspectionStaffDesktop/viewAudit_icon.png"
							onclick="viewTask()">
						<p>查看正审核任务</p>
					</div>
					<div class="task_button task_button5">
						<input type="image"
							src="module/img/inspectionStaffDesktop/checkReport_icon.png"
							onclick="viewReport()">
						<p>查看报告</p>
					</div>
					<div class="task_button task_button6">
						<input type="image" type="image"
							src="module/img/inspectionStaffDesktop/uploadreport_icon.png"
							onclick="upload()">
						<p>上传报告</p>
					</div>
				</div>
			</div>
			<div class="table">
				<table id="taskTable">
				</table>
			</div>
		</div>

		<div id="right">
			<div class="tidings">
					<div class="tidingHead">
					<ul>
						<li class=" selected ">提示信息</li>
						<li>已读信息</li>
					</ul>
					</div>
					<div class="tidingsTable"></div>
			</div>
		</div>
	</div>
</body>
<script src="module/js/inspectionStaffDesktop/inspectionStaffDesktop.js"></script>
</html>
