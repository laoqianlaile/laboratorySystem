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

<title>文件管理</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
<link rel="stylesheet"  type="text/css" href="module/css/wait.css">
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileProcessManage.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/sweetalert.min.js"></script>
<script src="assets/js/autoPage.js"></script>

</head>

<body>
<div class="content">
		<div class="searchArea">
			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>文件名称:</label> <input type="text" name="fileName"
						id="fileName" class="form-control"
						aria-describedby="basic-addon1" placeholder="请输入文件名称查找">
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>项目ID:</label> <input type="text" name="projectID" id="projectID"
						class="form-control" aria-describedby="basic-addon1"
						placeholder="请输入项目ID查找">
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>上传人:</label> <input type="text" name="uploadName"
						id="uploadName" class="form-control"
						aria-describedby="basic-addon1" placeholder="请输入文件上传人姓名查找">
				</div>
			</div>

			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">上传时间:</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" name="beginTime" id="beginTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择上传时间"> <span class="input-group-addon"><span
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
						<input class="form-control" name="endTime" id="endTime" size="16"
							type="text" value="" readonly="true" placeholder="请选择上传时间">
						<span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>文件类型:</label> <select class="form-control" name="selectPart"
						id="selectPart">
						<option value="3">所有情况</option>
						<option value="0">标准文件</option>
						<option value="1">模版文件</option>
						<option value="2">项目文件</option>
					</select>
				</div>
			</div>
		</div>


		<div class="buttonGroup">
			<div>
				<button type="button" class="btn btn-primary " onclick="search()">查询</button>
			</div>
		</div>
	</div>
	
	<!-- 表格 -->
	<table id="table">

	</table>
	
	
	<div id="wait_img">
		<img src="module/img/wait.jpg" style="width:48px;height:48px;" />
	</div>
	<div id="mask"></div>

	<script src="module/js/wait.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
	<script src="module/js/fileManage/fileProcessManage.js"></script>
	<script type="text/javascript">
		$('.form_datetime').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			format : 'yyyy-mm-dd hh:ii:ss'
		});
	</script>
</body>
</html>
