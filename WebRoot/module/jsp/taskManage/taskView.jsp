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
    <link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
    <link rel="stylesheet" type="text/css" href="module/css/taskManage/taskView.css">
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
    <script src="module/js/jquery.uploadify.min.js"></script>
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
				<textarea class="form-control textRequire" name="accordingInfo" id="accordingInfo" disabled="disabled"></textarea>
			</div>
			<hr class="hrStyle">
		</div>

		<div class="sampleInfo">
			<div class="row">
				<div class="col-xs-6 col-md-6 col-lg-6">
					<div class="col-xs-6 col-md-6 col-lg-6">
						<label>样品管理员:</label> <span name="sampleManage" id="sampleManage"></span>
					</div>
					<div class="col-xs-6 col-md-6 col-lg-6">
						<label>接收时间:</label> <span name="sampleCreateTime"
							id="sampleCreateTime"></span>
					</div>
				</div>
				<div class="col-xs-6 col-md-6 col-lg-6">
					<button type="button" class="btn btn-primary" onclick="equipmentRegister()">
						<span class="glyphicon glyphicon-edit"></span> 设备登记
					</button>
					<button type="button" class="btn btn-primary" onclick="">
						<span class="glyphicon glyphicon-arrow-down"></span> 下载报告模版
					</button>
					<button type="button" class="btn btn-primary" onclick="uploadTestReport()">
						<span class="glyphicon glyphicon-upload"></span> 上传报告
					</button>
					<button type="button" class="btn btn-primary" onclick="">
						<span class="glyphicon glyphicon-search"></span> 查看报告
					</button>
					<button type="button" class="btn btn-primary" onclick="submitReport()">
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
	</div>
	</div>
	
	<div id="equipmentInfo" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:800px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">设备登记</h4>
				</div>
				<div class="modal-body">
					<div class="row equipmentList">  
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="ensure" name="ensure" onclick="sure()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="uploadReport" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:500px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">上传报告</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="files" style="text-align:left">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload" multiple="multiple">
						</div>
				<!-- 		<div class="originalNumber">
							<label>原始记录编号:</label> 
							<input type="text" class="form-control"> 
							<label>字&nbsp;&nbsp;&nbsp;&nbsp;第</label> 
							<input type="text" class="form-control"> 
							<label>号</label>
						</div> -->
						<div class="fileSummary">
							<label >附件概述:</label> 
							<textarea class="form-control" name="fileSummaryInfo" id="fileSummaryInfo"></textarea>
						</div>
						<div class="remarks">
							<label >备注:</label> 
							<textarea class="form-control" name="remarksInfo" id="remarksInfo"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
				
					<button type="button" class="btn btn-primary" id="ensure"name="ensure"
						onclick="uploadSure()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal"
						onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
				</div>
			</div>
		</div>
	</div>
		
	
	<script src="module/js/taskManage/taskView.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
</body>
</html>
