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

<title>模板管理</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">


<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
 
<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/fileManage/fileManage.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>

<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<script src="module/js/sweetalert.min.js"></script>
</head>

<style>
span {
	font-size: 20px;
	padding: 0px;
	margin: 0px;
}

.input-group[class*="col-"] {
	float: left;
}

.input-group .form-control {
	float: left;
	margin-bottom: 0;
	position: relative;
	width: 100%;
	z-index: 2;
	float: right;
}
#menu{
    background-color: rgb(232,243,249);
    padding-top: 20px;
    padding-bottom: 20px;
    width: 101%;
}
#menu button{
	margin-right:2%;
}
#menu button:hover {
  border: none;
  color: #fff;
  background-color: rgb(255, 173, 51);
}
</style>

<body>
	<input type= "hidden" id = "uploaderID" value = "<%=session.getAttribute("EMPLOYEEID")  %>" />
	<div class="container" style="width: 100%;">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<div class="row clearfix">
					<div class="col-md-12 column">
						<div class="row clearfix">
							<div class="col-md-3 column" >
								<label>模板名称： </label>
								<input id="query_templateName" name="templateName"
									class="form-control" type="text" oninput="query()"
									onpropertychange="query()"
									style="display: inline; width:40%;">
							</div>
							<div class="input-group date form_datetime col-md-3 column "
								style="text-align: center;">
								<label style="margin-top: 8px;">上传时间： </label> <input
									class="form-control" size="10" id = "uPLOADTIME1" type="text" value="" readonly
									style="display: inline; width:50%;" oninput="correctTime()"
									onpropertychange="correctTime()" onchange="correctTime()"> <span
									class="input-group-addon"><i
									class="glyphicon glyphicon-remove"></i></span> <span
									class="input-group-addon"><i
									class="glyphicon glyphicon-calendar"></i></span>
							</div>
							<div class="input-group date form_datetime col-md-3 column "
								style="text-align: center;">
								<label style="margin-top: 8px;">至： </label> 
								<input class="form-control" size="10" id = "uPLOADTIME2" type="text" value="" readonly
									style="display: inline; width:50%;" oninput="correctTime()"
									onpropertychange="correctTime()" onchange="correctTime()"> 
									<span class="input-group-addon">
									<i class="glyphicon glyphicon-remove"></i></span> 
									<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i></span>
							</div>
						</div>
						<div id="menu" class= "row clearfix">
								<div class="col-md-4 column">
									<button id="query" onclick="query()"
										class="btn btn-primary" type="button">
										<em class="glyphicon glyphicon-search"></em> 查询
									</button>

									<button class="btn btn-primary" type="button" id="addmodel"
										onclick="openModal()">
										<em class="glyphicon glyphicon-plus"></em> 上传
									</button>

									<button class="btn btn-primary type=" button" id=""
										onclick="">
										<em class="glyphicon glyphicon-trash"></em> 查看
									</button>

									<button class="btn btn-primary  type=" button" id="del" onclick="delData()">
										<em class="glyphicon glyphicon-trash"></em> 删除
									</button>

									<button class="btn btn-primary type=" button" id="refresh"
										onclick="reSetRefresh()">
										<em class="glyphicon glyphicon-refresh"></em> 刷新
									</button>
								</div>
						</div>
					</div>
				</div>
				<table id="table">
				</table>
			</div>
		</div>
	</div>
	<!-- 检测项目弹框 -->
	<div id="testProjectModal" class="modal fade" role="dialog" style="display: none;"
		aria-labelledby="gridSystemModalLabel ">
		<div class="modal-dialog" role="document" style="width:75%;">
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
						<table id= "testProject">
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure" onclick="addTestproject()">确定</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 新增弹框 -->
	<div id="addModal" class="modal fade" role="dialog" style="display: none;"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" >
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">上传</h4>
				</div>
				<div class="modal-body">
					<input type= "hidden" id = "EMPLOYEEID" value = "<%=session.getAttribute("EMPLOYEEID")%>" />
					<div class="row">
						<div class ="col-md-6 column">
							<label>模板名称：</label> <input type="text" id="add_TemplateName"
								name="TemplateName" class="form-control" />
						</div>
						<div class ="col-md-6 column">
							<input type="hidden" id="add_TestProjectID" name ="TestProject"/>
							<label>检测项目：</label> <input type="text" id="add_TestProjectNameCn"
								name="TestProjectNameCn" class="form-control" placeholder="当为报告模板时有值"  disabled="disabled"/>
						</div>
					</div>
					<div class="row">
						<div id="files">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								multiple="multiple">
							<div class="col-md-6 column">
								<select id="fileType">
									<option value = "13">模板文件</option>
								</select> 
								<select id="fileSubtype" oninput="isReport()"
									onpropertychange="isReport()" >
								</select>
							</div>
							<div class="col-md-12 column">
								<label>备注信息</label>
								<textarea id="add_TemplateRemarks" name = "TemplateReamarks"class="form-control"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure" onclick="upfile();">确定</button>
				</div>
			</div>
		</div>
	</div>
</body>



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
		format : 'yyyy-mm-dd'
	});
</script>

<script src="module/js/template/template.js"></script>
</html>
