<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link href="module/css/bootstrap.css" rel="stylesheet">
<link href="./module/css/bootstrap-table.css" rel="stylesheet"
	type="text/css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script type="text/javascript" src="./module/js/bootstrap-table.js"></script>
<script type="text/javascript"
	src="./module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/sampleDesktop/sampleDesktop.js"></script>
<script src="assets/js/autoPage.js"></script>

<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
#container {
	min-width: 1400px;
}

.tableArea {
	width: 900px;
}

.row {
	margin-bottom: 10px;
	margin-left: 0px;
}

.curentNav .col-xs-1 .btn-primary {
	margin-right: 0px;
	float: right;
	margin-bottom: 5px;
	min-width: 90px;
}

.curentNav .col-md-1 .btn-primary {
	margin-right: 0px;
	float: right;
	margin-bottom: 5px;
	min-width: 90px;
}

.curentNav .col-lg-1 .btn-primary {
	margin-right: 0px;
	float: right;
	margin-bottom: 5px;
	min-width: 90px;
}

.list-button .row .btn-primary {
	min-width: 120px;
	margin-right: 5px;
}

.tidings {
	margin-top: 35PX;
}

.col-lg-3,.col-xs-4,.col-sm-4,.col-md-4,.col-lg-4,.col-xs-5,.col-sm-5,.col-md-5,.col-lg-5,.col-xs-6,.col-sm-6,.col-md-6,.col-lg-6,.col-xs-7,.col-sm-7,.col-md-7,.col-lg-7,.col-xs-8,.col-sm-8,.col-md-8,.col-lg-8,.col-xs-9,.col-sm-9,.col-md-9,.col-lg-9,.col-xs-10,.col-sm-10,.col-md-10,.col-lg-10,.col-xs-11,.col-sm-11,.col-md-11,.col-lg-11,.col-xs-12,.col-sm-12,.col-md-12,.col-lg-12
	{
	position: relative;
	min-height: 1px;
	padding-right: 15px;
	padding-left: 0px;
}

.leftArea {
	width: 60%;
    display: inline-block;
    margin-right: 20px;
    float: left;
}

.RightArea {
	display:inline-block;
	width: 38%;
}
.fixed-table-body #table .bs-checkbox {
vertical-align: middle;
}   
.RightArea .row .col-xs-7 span + sapn, .leftArea .row span + sapn{
    font-style: italic;
    font-family: fantasy;
}

.leftArea .row span:FIRST-CHILD {
	font-size: 18;
}
</style>
</head>

<body>
	<div id="container">
		<div class="leftArea">
			<div class="row">
				<span index="0">当前合同编号：</span> <span index="1">XJHJ-226-14-1013-PAT</span>
			</div>
			<div class="list-button">
				<div class="row">
					<button class="btn btn-primary">查看交接单</button>
					<button class="btn btn-primary">领样</button>
					<button class="btn btn-primary">退样</button>
					<button class="btn btn-primary">新增交接单</button>
					<button class="btn btn-primary">查看报告列表</button>
					<button class="btn btn-primary">打印报告</button>
				</div>
				<div class="row">
					<button class="btn btn-primary">修改交接单</button>
					<button class="btn btn-primary">还样</button>
					<button class="btn btn-primary">发报告</button>
					<button class="btn btn-primary">退还交接单</button>
					<button class="btn btn-primary">查看检测进度</button>
					<button class="btn btn-primary">无合同新增交接单</button>
				</div>
			</div>
			
				<div class="contractTable"></div>
			
		</div>
		<div class="RightArea">
			<div class="row">
				<div class="col-xs-7 col-md-7 col-lg-7">
					<span index="0">当前文档名称：</span> <span index="1">XJHJ-226-14-1013-PAT</span>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<button class="btn btn-primary  ">查看</button>
				</div>
				<div class="col-xs-1 col-md-1 col-lg-1">
					<button class="btn btn-primary  ">下载</button>
				</div>
			</div>
			<div class="fileTable"></div>
			<div class="tidings">
				<div class="tidingHead">提示信息</div>
				<div class="tidingsTable"></div>
			</div>

		</div>
	</div>
</body>
</html>
