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

<title>My JSP 'sampleDesktop.jsp' starting page</title>

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
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
#container {
	min-width: 1400px;
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
.tidings{
    margin-top: 35PX;
}

</style>
</head>

<body>
	<div id="container">
		<div class="row curentNav">
			<div class="col-xs-7 col-md-7 col-lg-7">
				<span index="0">当前合同编号：</span> <span index="1">XJHJ-226-14-1013-PAT</span>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<span index="0">当前文档名称：</span> <span index="1">XJHJ-226-14-1013-PAT</span>
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button class="btn btn-primary  ">查看</button>
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button class="btn btn-primary  ">下载</button>
			</div>
			<div class="row">
				<div class="col-xs-7 col-md-7 col-lg-7">
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
					<div class="tableArea">
						<div class="contractTable"></div>
					</div>
				</div>
				<div class="col-xs-5 col-md-5 col-lg-5">
					<div class="fileTable"></div>
					<div class="tidings">
					     <div class="tidingHead">提示信息</div>
					     <div class="tidingsTable"></div>
					</div>
				</div>
			</div>
</body>
</html>
