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

<title>弹出窗口</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<script type="text/javascript" src="module/js/jquery-2.1.1.min.js"></script>
<link rel="stylesheet" href="module/css/article/articleProcess.css"
	type="text/css"></link>
<link rel="stylesheet" href="module/css/bootstrap.min.css"
	type="text/css"></link>
<link rel="stylesheet" href="module/css/bootstrap-table.css"
	type="text/css"></link>
<link rel="stylesheet" href="module/css/bootstrap-theme.min.css"
	type="text/css"></link>
<link type="text/css" rel="stylesheet" href="module/css/fileinput.css" />



<!-- <script src="//cdn.bootcss.com/bootstrap-table/1.11.0/locale/bootstrap-table-zh-CN.js"></script> -->
<script type="text/javascript" src="module/js/fileinput.js"></script>
<%-- <script type="text/javascript" src="${ctx}/components/fileinput/js/fileinput_locale_zh.js"></script> --%>
<script type="text/javascript" src="module/js/zh.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table.js"></script>
<script type="text/javascript" src="module/js/article/articleProcess.js"></script>
<script type="text/javascript" src="module/js/bootstrap.js"></script>
</head>

<body>
	<div class="wrapper">
		<div class="left-form">
			<form class="form-inline" role="form">
				<div class="form-group">
					<label>文章栏目:</label> <select class="form-control" id="artColumn">
						<option>典型案例</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</div>
				<div class="form-group">
					<label>文章名称:</label> <select class="form-control" id="artTitle">
						<option>典型案例</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</div>
				<div class="form-group">
					<label>案例类型:</label> <select class="form-control" id="artCaseType">
						<option>典型案例</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</select>
				</div>
				<div class="form-group form-inline">
					<label>内容:</label>
					<div name="content" id="container"></div>
				</div>
			</form>
		</div>
		<div class="right-form">
			<div class="right-up">
				<input type="file" name="image" class="artPicturegis" 
					value="${deal.image}" />
			</div>
			<div class="right-down">
				<button type="button" class="btn btn-info">确定</button>
				<button type="button" class="btn btn-info">取消</button>
			</div>
		</div>
	</div>
</body>
<script id="container" name="content" type="text/plain">
        这里写你的初始化内容
    </script>
<!-- 配置文件 -->
<script type="text/javascript" src="ueditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script type="text/javascript" src="ueditor.all.js"></script>
<script type="text/javascript">
	var ue = UE.getEditor('container');
</script>
</html>
