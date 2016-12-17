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

<title>下载文件</title>

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

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>



<style>
a,input {
	cursor: pointer;
}
</style>
</head>

<body>

	<div class="input-group" style="margin-top:10px;margin-bottom:15px">
		<button type="button" class="btn btn-default " data-toggle="modal"
			onclick="agreementOption()">
			<span class="glyphicon glyphicon-upload"></span> 上传
		</button>
		<button type="button" class="btn btn-default " onclick="fileDownAll()">
			<span class="glyphicon glyphicon-download"></span> 下载
		</button>
		<button type="button" class="btn btn-default " onclick="deleteFile()">
			<span class="glyphicon glyphicon-trash"></span> 删除
		</button>
	</div>

	<!-- 新增弹框 -->
	<div id="addModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">上传</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="files">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								multiple="multiple">
							<div>
								<select id="fileType" onchange="agreementSubtypeOption()">
								</select> 
								<select id="fileSubtype">
								</select>
							</div>
							<div style="margin-top:20px">
								<label>文件内容</label>
								<textarea rows="3" cols="20" id="fileContent"
									onmousedown="mouseFoucs(event,this)"></textarea>
							</div>
							<div style="margin-top:20px">
								<label>备注信息</label>
								<textarea rows="3" cols="20" id="fileRemarks"
									onmousedown="mouseFoucs(event,this)"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure"
						onclick="fileUpload();">确定</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 表格 -->
	<table id="table">

	</table>

	<script src="module/js/fileManage/fileManage.js"></script>
</body>
</html>
