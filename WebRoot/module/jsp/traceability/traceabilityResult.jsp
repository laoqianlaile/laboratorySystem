<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String qualiyPlanId = request.getParameter("qualiyPlanId");
	if(qualiyPlanId!=null&&qualiyPlanId!="")
		session.setAttribute("qualiyPlanId",qualiyPlanId);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>完善量值溯源计划表</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css"
	href="module/css/traceability/traceabilityResult.css">
<link rel="stylesheet" href="module/css/bootstrap.min.css"
	type="text/css"></link>
<link rel="stylesheet" href="module/css/bootstrap.css" type="text/css"></link>
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">
<script type="text/javascript" src="module/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table.js"></script>
<script type="text/javascript" src="module/js/bootstrap.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript"
	src="module/js/traceability/traceabilityResult.js"></script>
</head>

<body>
	<div class="wrapper">
		<div id="searcherArea">
			<div class="list-searcher" style="float:left">
				<span>检测/校验部门名称：</span><select id="departmentName" class="form-control"></select>
			</div>
			<div class="list-searcher" style="float:right">
				<span>送检方式：</span><select class="form-control" id="type"><option>自检</option><option>外检</option></select>
			</div>
		</div>
		<div class="content">
			<table id="table"></table>
		</div>
		<div id="download">
		<label>相关附件</label><br />
			<table id="filetable"></table>
		</div>
	</div>
</body>
</html>
