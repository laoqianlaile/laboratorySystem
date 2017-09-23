<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>查看任务</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-editable.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-treeview.css" >
<link rel="stylesheet"  type="text/css" href="module/css/wait.css">
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css" href="module/css/taskManage/taskView.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-editable.js"></script>
<script src="module/js/bootstrap-treeview.js"></script>
<script src="module/js/sweetalert.min.js"></script>
<script src="assets/js/autoPage.js"></script>
<style>
.choose ul {
	height: 120px;
	max-height: 120px;
	min-height: 114px;
	overflow-y: auto;
}

.sortTree {
	width: 90%;
	margin: 0 auto;
	border: 1px solid #000;
}

#testProjectTree {
	width: 260px;
	float: left;
	margin-left: 400px;
	margin-top: 10px;
	max-height: 700px;
	overflow: auto;
	padding-left: 0px;
}

#standardTree {
	width: 260px;
	float: left;
	margin-top: 10px;
	height: auto;
	max-height: 700px;
	overflow: auto;
	padding: 0
}

.treeview .list-group-item {
	cursor: pointer
}

.treeview span.indent {
	margin-left: 10px;
	margin-right: 10px
}

.treeview span.icon {
	width: 12px;
	margin-right: 5px
}

.treeview .node-disabled {
	color: silver;
	cursor: not-allowed
}

.node-treeview-checkable {
	
}

.node-treeview-checkable:not     (.node-disabled     ):hover {
	background-color: #F5F5F5;
}

.orginalDataInfo .row label {
	float: left;
	width: 25%;
	maring-top: 6px;
	margin-left: 10px;
}

.orginalDataInfo .row input {
	display: inline;
	width: 70%;
}
</style>
</head>

<body>
	<div class="content">
		<div class="title">
			<label>查看任务</label> <label style="float:right"> <span>交接单编号：</span>
				<span name="schFactoryCode" id="schFactoryCode"></span>
			</label>
			<hr class="hrStyle">
		</div>
		<div class="clientInfo">
			<div class="row ">
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>委托单位:</label> <span name="clientCompany" id="clientCompany"></span>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>委托人:</label> <span name="clientPerson" id="clientPerson"></span>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>委托时间:</label> <span name="clientTime" id="clientTime"></span>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>完成时间:</label> <span name="finishTime" id="finishTime"></span>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>联系电话:</label> <span name="contactNumber" id="contactNumber"></span>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>通讯地址:</label> <span name="contactAddress"
						id="contactAddress"></span>
				</div>

				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>是否涉密:</label> <span name="isClassified" id="isClassified"></span>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>密级:</label> <span name="secretLevel" id="secretLevel"></span>
				</div>
			</div>

			<div class="row">
				<label class="col-xs-6 col-md-6 col-lg-6">依据的技术文件（代号、名称）及客户要求:</label>
				<textarea class="form-control textRequire" name="accordingInfo"
					id="accordingInfo" disabled="disabled"></textarea>
			</div>
			<hr class="hrStyle">
		</div>

		<div class="sampleInfo">
			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="col-xs-5 col-md-5 col-lg-5 sampleInfo" >
						<label>样品管理员:</label> <span name="sampleManage" id="sampleManage"></span>
					</div>
					<div class="col-xs-7 col-md-7 col-lg-7">
						<label>接收时间:</label> <span name="sampleCreateTime"
							id="sampleCreateTime"></span>
					</div>
				</div>
				<div class="col-xs-8 col-md-8 col-lg-8 buttonGroup">
					<!-- <button type="button" class="btn btn-primary"
						onclick="registeTestProject()"> -->
						<button type="button" class="btn btn-primary"
						onclick="getTaskType()">
						<span class="glyphicon glyphicon-edit"></span> 检测项目登记
					</button>
					<button type="button" class="btn btn-primary"
						onclick="downReportTemplate()">
						<span class="glyphicon glyphicon-arrow-down"></span>生成或下载报告
					</button>
					<button type="button" class="btn btn-primary"
						onclick="uploadOriginalData()">
						<span class="glyphicon glyphicon-arrow-up"></span>上传原始数据
					</button>
					<button type="button" class="btn btn-primary"
						onclick="uploadTestReport()">
						<span class="glyphicon glyphicon-upload"></span> 上传报告
					</button>
					<button type="button" class="btn btn-primary"
						onclick="onlineViewReport()">
						<span class="glyphicon glyphicon-search"></span> 查看报告
					</button>
					<button type="button" class="btn btn-primary"
						onclick="submitReport()">
						<span class="glyphicon glyphicon-ok-sign"></span> 提交审核
					</button>
				</div>
			</div>
			<div class="row sampleInfoDiv">
				<table name="sampleInfoTable" id="sampleInfoTable">
				</table>
			</div>
			<hr class="hrStyle">
		</div>

		<div class="otherFile">
			<div>
				<label>历史文件</label>
				<hr class="hrStyle">
				<div>
					<table id="taskFile">
					</table>
				</div>
			</div>
		</div>

		<div class="footer">
			<div class="col-xs-12 col-md-12 col-lg-12 ">
				<div style="float:right;margin-top:10px;">
					<button type="button" onclick="turnBack()" class="btn btn-primary">返回</button>
				</div>
			</div>
		</div>

	</div>
	
	<div id="equipmentInfo" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:800px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">设备登记</h4>
				</div>
				<div class="modal-body">
					<div class="row equipmentList"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure" onclick="sure()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<div id="testprojectInfo" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:600px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">检测项目登记</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<ul id="testProjectTree" style="margin-left:40;">
						</ul>

						<ul id="standardTree" style="margin-left:0;">
						</ul>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" style="background-color:#238bc8" onclick="sureRegisteTestProject()">确定</button>

					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<div id="uploadReport" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:500px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">上传或重新覆盖报告</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="fileInfo" style="text-align:left">
							<div id="fileQueue">
								<input type="file" name="files" id="files" style="display:none" onchange="checkFile(this)">
							</div>
							
							<button type="button" id="chooseFile" name="chooseFile" class="btn btn-default">
								<span class="glyphicon glyphicon-folder-open "></span> 选择文件
							</button>
							<span id="fileName"></span>
						</div>
						<div class="fileSummary">
							<label>附件概述:</label>
							<textarea class="form-control" name="fileSummaryInfo"
								id="fileSummaryInfo"></textarea>
						</div>
						<div class="remarks">
							<label>备注:</label>
							<textarea class="form-control" name="remarksInfo"
								id="remarksInfo"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
				    <button type="button" class="btn btn-primary" id="ensureUpload" name="ensureUpload">确定</button>
					<button type="button" class="btn btn-default" id="cancel" name="cancel">取消</button>
				</div>
			</div>
		</div>
	</div>

	<div id="originalDataModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:500px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">上传原始数据</h4>
				</div>
				<div class="modal-body">
					<div class="orginalDataInfo">
						<div class="row" style="margin-bottom:10px">
							<label>图片插入标签名 :</label> <input type="text" id="mark" name="mark"
								class="form-control" placeholder="请输入图片插入标签" />
						</div>

						<div class="row" style="margin-bottom:10px">
							<label>原始数据名称 :</label> <input type="text" id="originalName"
								name="originalName" class="form-control" placeholder="请输入意见" />
						</div>

						<div class="row" style="margin-bottom:10px">
							<label>原始数据编号 :</label> <input type="text" id="originaldataCode"
								name="originaldataCode" class="form-control"
								placeholder="请输入原始数据编号" />
						</div>
						
						
						<div class="row" style="margin-bottom:10px">
							<label>意见 :</label> <input type="text" id="suggest"
								name="suggest" class="form-control" placeholder="请输入原始数据前面的标号" />
						</div>
						
						<div class="row" style="margin-bottom:10px">
							<label>标号 :</label> <input type="text" id="codeOne"
								name="codeOne" class="form-control" placeholder="请输入原始数据前面的标号" />
						</div>

						<div class="row" style="margin-bottom:10px">
							<label>编号 :</label> <input type="text" id="codeTwo"
								name="codeTwo" class="form-control" placeholder="请输入原始数据后面的编号" />
						</div>

						<div class="row" style="margin-bottom:10px">
							<label>备注 :</label> <input type="text" id="originalRemarks"
								name="originalRemarks" class="form-control" placeholder="请输入备注" />
						</div>

						<div class="row">
							<label>原始数据 :</label>
							<img id="defaultPhoto" src="module/img/file/defaultPhoto.jpg" data-holder-rendered="true" " style="widhth:70%;height:230px"/> 
							<input class="originalDataImag" type="file" name="files" id="files"
								onchange="previewImage(this,'defaultPhoto')"
								accept="image/png, image/gif, image/jpg, image/jpeg"
								style="width:66px;height:25px;position:absolute;left:10px;top:155px;opacity: 0;filter: alpha(opacity = 0);" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="ensureUploadOriginalData"
						name="ensureUploadOriginalData">确定</button>
					<button type="button" class="btn btn-default" id="cancelUploadOriginalData"
						name="cancelUploadOriginalData">取消</button>
				</div>
			</div>
		</div>
	</div>







	<div id="wait_img">
		<img src="module/img/wait.jpg" style="width:48px;height:48px;" />
	</div>
	<div id="mask"></div>

	<script src="module/js/wait.js"></script>
	<script src="module/js/taskManage/taskView.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.fileupload.js"></script>
	<script type="text/javascript">
		$('#chooseFile').click(function() {
			$('#files').click();

		});
		$('#cancel,#cancelUploadOriginalData').click(function() {
			if (confirm("是否取消上传?")) {
				reload();
			}
		});
		$('#mask').click(function() {
			hideDiv();
		});
		$('#defaultPhoto').click(function() {
			$('.originalDataImag').click();
		});
	</script>
</body>
</html>
