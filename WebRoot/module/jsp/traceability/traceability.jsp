<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String qualiyPlanId = request.getParameter("qualiyPlanId");
	if (qualiyPlanId != null && qualiyPlanId != "")
		session.setAttribute("qualiyPlanId", qualiyPlanId);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>量值溯源计划</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link rel="stylesheet" type="text/css"
	href="module/css/traceability/traceability.css">
<link rel="stylesheet" href="module/css/traceability/bootstrap.min.css"
	type="text/css"></link>
<link rel="stylesheet" href="module/css/traceability/bootstrap.css"
	type="text/css"></link>
<!-- <link rel="stylesheet" href="module/css/bootstrap.css" type="text/css"></link> -->

<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap-theme.min.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap-datetimepicker.min.css">

<script type="text/javascript" src="assets/js/jquery-3.1.1.min.js"></script>
<!-- <script type="text/javascript"
	src="assets/fileupload/jquery.ui.widget.js"></script>
<script type="text/javascript"
	src="assets/fileupload/jquery.iframe-transport.js"></script>
<script type="text/javascript"
	src="assets/fileupload/jquery.fileupload.js"></script>
 -->

<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/bootstrap-table.min.js"></script>
<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
<script src="module/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script src="assets/js/bootstrap-datetimepicker.fr.js"></script>
<script type="text/javascript"
	src="module/js/traceability/traceability.js"></script>
<body>
	<!-- 功能按钮 -->
	<div class="wrapper">
		<div style="height:70px">
			<span id="yearvalue" hidden><%=request.getParameter("year")%></span><span
				id="codevalue" hidden><%=request.getParameter("code")%></span>
	<!-- 		<div id="showdiv1" class="alert alert-danger tan"></div> -->
			<div id="font">
				<h3 style="text-align:center"><%=request.getParameter("year")%>年度检测/量值溯源建议</h3>
			</div>
			<p style="float:right;">编号:<label><%=request.getParameter("code") %></label></p>
		</div>
		<div id="searcherArea">
		
			<div class="list-searcher">
				<span>设备名称：</span><input type="text" id="equipmentName"
					name="equipmentName" class="form-control"
					aria-describedby="basic-addon1"> <span>规格型号：</span><input
					type="text" id="model" name="model"
					class="form-control" aria-describedby="basic-addon1"> <span>审核状态：</span><select
					id="auditState" name="auditState" class="form-control"><option>全部</option>
					<option>未审核</option>
					<option>审核通过</option>
					<option>审核不通过</option>

				</select>
				<button type="button" id="artSearch" class="btn btn-info thisbtn"
					onclick="search()">搜索</button>
			</div>
			<div class="list-searcher">
				<span>仪器编号：</span><input type="text" id="equipmentCode"
					name="equipmentCode" class="form-control"
					aria-describedby="basic-addon1"> <span>校准服务机构：</span><input
					type="text" id="correctOrgan" name="correctOrgan"
					class="form-control" aria-describedby="basic-addon1"><span
					style="width:80px">校验时间：</span><input type="date"
					style="width: 140px;" id="startTime" name="startTime"
					class="form-control" aria-describedby="basic-addon1" /><span
					style="width:20px;">至</span><input type="date"
					style="width: 140px;" id="endTime" name="endTime"
					class="form-control" aria-describedby="basic-addon1" />
			</div>
		</div>

		<div class="mainTableDate">
			<div class="form-group">
				<button type="button" id="artShow"
					class="btn btn-info thisbtn glyphicon glyphicon-plus"
					onclick="add()">&nbsp;新增</button>
				<button type="button" id="artEdit"
					class="btn btn-info thisbtn glyphicon glyphicon-edit"
					onclick="Updatesubmit()">&nbsp;修改</button>
				<button type="button" id="artDel"
					class="btn btn-info thisbtn glyphicon glyphicon-remove"
					onclick="del()">&nbsp;刪除</button>
				<button type="button" id="AddSubmit"
					class="btn btn-info thisbtn glyphicon glyphicon-ok"
					onclick="addSubmit()" style="float:right;display:none">&nbsp;提交</button>
				<button type="button" id="uploadTable"
					class="btn btn-info thisbtn glyphicon glyphicon-upload"
					onclick="Upload()">上传检测记录表</button>
				<button type="button" id="upload_Table"
					class="btn btn-info thisbtn glyphicon glyphicon-list-alt"
					onclick="allData()">全部数据</button>
			</div>
			<table id="table" class="table">
			</table>
		</div>
		<div class="Upload">
			<label>相关附件</label><br />
			<!-- 	<button type="button"
				class="btn btn-info thisbtn glyphicon glyphicon-upload">上传</button> -->
			<table id="filetable"></table>
		</div>
	</div>
	<div class="modal fade" id="UploadModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">上传文件</h4>
				</div>
				<div class="modal-body">
					<form id="adddata" action="traceabilityController/upload.do"
						method="post" enctype="multipart/form-data"
						class="form-horizontal">
						<div id="files">
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">选择文件</label>
								<div class="col-sm-10">
									<input id="fileupload" type="file" name="file"
										placeholder="请选择">
								</div>
							</div>
							<div class="form-group">
								<label for="inputPassword3" class="col-sm-2 control-label">送检方式</label>
								<div class="col-sm-10">
									<select class="form-control" id="type" name="type">
										<option>自检</option>
										<option>外检</option>
										</select>
								</div>
							</div>
							<div class="form-group">
								<label for="inputPassword3" class="col-sm-2 control-label">备注</label>
								<div class="col-sm-10">
									<textarea rows="3" class="form-control" name="remark"
										id="remark"></textarea>
								</div>
							</div>
							<div class="form-group" style="visibility:hidden;">
								<label for="inputPassword3" class="col-sm-2 control-label">ID</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="belongID"
										name="belongID" readonly="true">
								</div>
							</div>
							<div class="modal-footer">
								<button type="submit" class="btn btn-info thisbtn">确定</button>
								<button type="button" class="btn btn-info thisbtn"
									data-dismiss="modal">退出</button>
							</div>
						</div>
					</form>
				</div>

			</div>
		</div>
	</div>
</body>
</html>
