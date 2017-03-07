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

<title>My JSP 'permissionAssign.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link href="module/css/bootstrap.css" rel="stylesheet">
<link href="module/css/bootstrap-treeview.css" rel="stylesheet">
<link href="module/css/glyphicons.css" rel="stylesheet">
<link href="module/css/permissionAssign/permissionAssign.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />


</head>
<body>
	<div class="sortTree">
		<ul id="treeRole">
		</ul>
		<ul id="treeModule">
		</ul>
	</div>

</body>
<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-treeview.js"></script>
<script src="module/js/permissionAssign/permissionAssign.js"></script>
</body>
</html>
