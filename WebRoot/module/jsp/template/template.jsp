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
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" /> 
<link rel="stylesheet"  type="text/css" href="module/css/wait.css">

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
	height: 50px;
    line-height: 50px;
    background-color: rgb(232,243,249);
    margin-bottom: 30px;
}
#menu button{
	margin-left:26px;
}
#menu button:hover {
  border: none;
  color: #fff;
  background-color: rgb(255, 173, 51);
}
#showTestProject{
	margin-left: 6.65%;
	position:absolute;
	width:83%;
	height:auto;
	max-height:120px;
	display:none;
	border:1px solid #ccc;
	border-top:none;
	border-radius:3px;
	background-color:#fff;
	z-index: 10;
	overflow-x:hidden;
	overflow-y:hidden;
}
#showTestProject ul {
	border:none;
	max-height:120px;
	overflow-y:auto;
	margin:0;
	margin-left:-40px;
}
#showTestProject ul li{
	height:30px;
	line-height: 30px;
	list-style-type: none;
	text-indent: 12px;
	background-color:#fff;
}
#showTestProject ul li.noDate{
 	color: red;
}
#showTestProject ul li:hover{
	background-color:#dcdcdc;
}
#add_TestProjectNameCn {
	width: 100%;
	height: 100px;
	border: 1px solid;
	overflow-y:auto;
}
#add_TestProjectNameCn .spanTag{
	
   -webkit-border-radius: 2px;
    display: block;
    float: left;
    padding: 5px;
    text-decoration: none;
    background: #e7e7e7;
    color: #0044cc;
    margin-right: 5px;
    margin-bottom: 5px;
    font-family: helvetica;
    font-size: 1px;
}
#add_TestProjectNameCn .spanTag a{
	font-weight: bold;
    color: rgb(255, 0, 0);
    text-decoration: none;
    font-size: 11px;
}
#add_TestProjectNameCn span{
	font-size: 1px;
}
</style>

<body>
	<input type= "hidden" id = "uploaderID" value = "<%=session.getAttribute("EMPLOYEEID")  %>" />
	<div class="container" style="width: 100%;">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<div class="row clearfix">
					<div class="col-md-12 column">
						<div class="row clearfix" style=" margin-bottom: 10px;">
							<div class="col-md-3 column" >
								<label>模板名称:</label>
								<input id="query_templateName" name="templateName"
									class="form-control" type="text" 
									style="display: inline; width:40%;">
							</div>
							<div class="input-group date form_datetime col-md-3 column "
								style="text-align: center;">
								<label style="margin-top: 8px;">上传时间:</label> <input
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
								<label style="margin-top: 8px;">至:</label> 
								<input class="form-control" size="10" id = "uPLOADTIME2" type="text" value="" readonly
									style="display: inline; width:50%;" oninput="correctTime()"
									onpropertychange="correctTime()" onchange="correctTime()"> 
									<span class="input-group-addon">
									<i class="glyphicon glyphicon-remove"></i></span> 
									<span class="input-group-addon">
									<i class="glyphicon glyphicon-calendar"></i></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
	</div>
			<div id="menu" class= "">
					<div >
						<button id="query" onclick="query()"
							class="btn btn-primary" type="button">
							<em class="glyphicon glyphicon-search"></em> 查询
						</button>

						<button class="btn btn-primary" type="button" id="addmodel"
							onclick="openModal()">
							<em class="glyphicon glyphicon-plus"></em> 上传
						</button>

						<button class="btn btn-primary" type="button" id="addmodel"
							onclick="submit()">
							<em class="glyphicon glyphicon-check"></em> 提交审核
						</button>
							
						<button class="btn btn-primary type=" button" id=""
							onclick="ViewDoc()">
							<em class="glyphicon glyphicon-search"></em> 查看
						</button>

						<button class="btn btn-primary  type=" button" id="del" onclick="delData()">
							<em class="glyphicon glyphicon-trash"></em> 删除
						</button>

						<button class="btn btn-primary type=" button" id="refresh"
							onclick="refresh()">
							<em class="glyphicon glyphicon-refresh"></em> 刷新
						</button>
					</div>
			</div>
			<table id="table">
			</table>
	
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
					<button type="button" class="btn btn-primary" onclick="addTestproject()" >确定</button>
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
							<label>检测项目：</label>
							 <div id="add_TestProjectNameCn" class="form-control" placeholder="当为报告模板时有值"  ></div>
						</div>
					</div>
					<div class="row">
						<div id="fileInfo" class="col-md-12 column" style="margin-top: 12px;">
						<!-- 	<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								multiple="multiple"> -->
							<div id="fileQueue">
								<input type="file" name="files" id="files" style="display:none" onchange="checkFile(this)">
							</div>
							<button type="button" id="chooseFile" name="chooseFile" class="btn btn-default">
								<span class="glyphicon glyphicon-folder-open "></span> 选择文件
							</button>
							<span id="fileName"></span>
							
						</div>
						<div class="col-md-6 column" style="margin-top:12px;margin-bottom: 12px;">
								<label id="fileType" class="form-control" style="display: inline;width: 41%;padding-top: 9px;padding-bottom: 7px;">
									<!-- <option  class="form-control" value = "">模板文件</option> -->
									模板文件
								</label>
								<select id="fileSubtype" oninput="isReport()"
									onpropertychange="isReport()" class="form-control" style="display: inline;width: 50%;" >
									<option class="form-control">交接单模板</option>
									<option class="form-control">检测合同模板</option>
									<option class="form-control">校准合同模板</option>
									<option class="form-control">检测报告模板</option>
									<option class="form-control">校准报告模板</option>
								</select>
								<img id ="editReportImg" src ='module/img/edit_icon.png' onclick=''  title="修改报告模板" style='cursor:pointer;margin-right:8px;display: none'/>
						</div>
						<div class="col-md-6 column" >
							<!-- <select class= "form-control" style="width: 47%;position: absolute;top: -36px;">
									<option class="form-control">交接单模板</option>
									<option class="form-control">检测合同模板</option>
									<option class="form-control">校准合同模板</option>
									<option class="form-control">检测报告模板</option>
									<option class="form-control">校准报告模板</option>
							</select> -->
							<input id="editReprotSearch" type="text" class="form-control" placeholder="检测标准搜索"  style="margin-top: 12px;display: none" onblur="hideSearch()" onfocus="showPartTestproject()"  oninput="showPartTestproject()"
											onpropertychange="showPartTestproject()"/>
							<div   id="showTestProject" ></div>
						</div>
							<div class="col-md-12 column">
								<label>备注信息</label>
								<textarea id="add_TemplateRemarks" name = "TemplateReamarks"class="form-control"></textarea>
							</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="cancel" name="cancel" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" id="ensure" name="ensure" >确定</button>
				</div>
			</div>
		</div>
	</div>
</body>



<div id="wait_img">
	<img src="module/img/wait.jpg" style="width:48px;height:48px;" />
</div>
<div id="mask"></div>

<script src="module/js/wait.js"></script>
<script src="module/js/template/template.js"></script>
<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script> 
<script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
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
	$('#chooseFile').click(function() {
		$('#files').click();

	});
	$('#cancel').click(function() {
		if (confirm("是否取消上传?")) {
			reload();
		}
	});
</script>
</html>
