<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String qualiyPlanId = request.getParameter("qualiyPlanId");
	String traceabilityCode = request.getParameter("code");
	String traceabilityYear = request.getParameter("year");
	if (qualiyPlanId != null && qualiyPlanId != ""){
		session.setAttribute("qualiyPlanId", qualiyPlanId);
		session.setAttribute("traceabilityCode", traceabilityCode);
		session.setAttribute("traceabilityYear", traceabilityYear);
	}else{
		traceabilityCode = (String)session.getAttribute("traceabilityCode");
		traceabilityYear = (String)session.getAttribute("traceabilityYear");
	}
		
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

			<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">

<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap-theme.min.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" type="text/css"
	href="module/css/traceability/traceability.css">
	
	
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
	<div>
		<div style="height:70px">
			<span id="yearvalue" hidden><%=traceabilityYear %></span><span
				id="codevalue" hidden><%=traceabilityCode %></span>
	<!-- 		<div id="showdiv1" class="alert alert-danger tan"></div> -->
			<div id="font">
				<h3 style="text-align:center"><%=traceabilityYear %>年度检测/量值溯源建议</h3>
			</div>
			<p style="float:right;">编号:<label><%=traceabilityCode %></label></p>
		</div>
		
		<br>
		<br>
		<div id="searcherArea">
		
			<div class="list-searcher">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>设备名称：</label>
				<input type="text" id="equipmentName"
					name="equipmentName" class="form-control"
					aria-describedby="basic-addon1"></div>
					
					<div class="col-xs-4 col-md-4 col-lg-4">
					 <label>规格型号：</label><input
					type="text" id="model" name="model"
					class="form-control" aria-describedby="basic-addon1"> </div>
					<div class="col-xs-4 col-md-4 col-lg-4">
					<label>审核状态：</label><select
					id="auditState" name="auditState" class="form-control"><option>全部</option>
					<option>未审核</option>
					<option>审核通过</option>
					<option>审核不通过</option>
					</select></div>
				
			</div>
			
			<div class="list-searcher">
					<div class="col-xs-4 col-md-4 col-lg-4">
					 <label>校准服务机构：</label><input
					type="text" id="correctOrgan" name="correctOrgan"
					class="form-control" aria-describedby="basic-addon1"></div>
					<div class="col-xs-4 col-md-4 col-lg-4">
					<label>校验时间：</label>
					 <div class="input-group date form_datetime timeChooseDiv"> <input 
					 id="startTime" name="startTime"
					class="form-control" size="16"
						type="text" value="" readonly="true" />
					 <span class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
					</div></div>
					
					<div class="col-xs-4 col-md-4 col-lg-4">
					<label>至</label>					
					<div class="input-group date form_datetime timeChooseDiv"><input
					 id="endTime" name="endTime"
					class="form-control" size="16"
						type="text" value="" readonly="true" />
					    <span class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
					</div>
			</div>
		</div>
		
		<div class="list-searcher">
				<div class="col-xs-4 col-md-4 col-lg-4" style="clear: both;">
				<label>仪器编号：</label>
				<input type="text" id="equipmentCode"
					name="equipmentCode" class="form-control"
					aria-describedby="basic-addon1"></div>
			</div>
		    <div id="restcontent">
		    <button type="button" id="artSearch" class="btn btn-primary thisbtn"
					onclick="search()">搜索</button>
				<button type="button" id="artShow"
					class="btn btn-primary thisbtn"
					onclick="add()">&nbsp;新增</button>
				<button type="button" id="artEdit"
					class="btn btn-primary thisbtn"
					onclick="Updatesubmit()">&nbsp;修改</button>
				<button type="button" id="artDel"
					class="btn btn-primary thisbtn"
					onclick="del()">&nbsp;刪除</button>
				<button type="button" id="AddSubmit"
					class="btn btn-primary thisbtn"
					onclick="addSubmit()" style="float:right;display:none">&nbsp;提交</button>
				<button type="button" id="uploadTable"
					class="btn btn-primary thisbtn"
					onclick="Upload()">上传检测记录表</button>
				<button type="button" id="upload_Table"
					class="btn btn-primary thisbtn"
					onclick="allData()">全部数据</button>
		    </div>
		    <hr>
		<div class="mainTableDate">
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
	<script>
	$('.form_datetime').datetimepicker({
		minView:'month',
		format: 'yyyy-mm-dd',
		weekStart:1,
		todayBtn:1,
		autoclose:1,
		todayHighlight:1,
		startView:2,
		forceParse:0,
		showMeridian:1,
		language:'zh-CN'      /*此属性是显示顺序，还有显示顺序是mm-dd-yyyy*/
	});
  	</script>
</html>
