<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>西计实验室管理系统</title>
    
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
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
	<link rel="stylesheet" href="module/css/changeACE.css" />
	 
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
    <script src="assets/js/autoPage.js"></script>
    <link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
    <script src="module/js/sweetalert.min.js"></script>
    
    <style>
    #btn-assign:hover {
    	background: #ffc773;
    }
     #return:hover {
    	background: #ffc773;
    }
    </style>
  </head>
  
  <body>
  	<span id="receiptlistID" style="display:none"></span>
  	<div class="container" style="width:100%">
  		<div class="row">
			<div class="col-xs-8 col-md-8 col-lg-8">
				<h4 >任务分配</h4>
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<h5 id="receiptlistCode">交接单号:&nbsp;<span></span></h5>
			</div>
		</div>
		<hr />
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<span id="companyName">委托单位:&nbsp;<span></span></span>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<span id="linkMan">委托人:&nbsp;<span></span></span>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<span id="acceptSampleTime">委托时间:&nbsp;<span></span></span>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<span id="endTime">完成时间:&nbsp;<span></span></span>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<span id="linkPhone">联系电话:&nbsp;<span></span></span>
			</div>
		</div>
		<br />
		<div class="row">
			<div class="col-xs-8 col-md-8 col-lg-8">
				<span id="address">通讯地址:&nbsp;<span></span></span>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<span id="isClassified">是否涉密:&nbsp;<span></span></span>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<span id="classifiedLevel">密级:&nbsp;<span></span></span>
			</div>
		</div>
		<br />
		<div class="row">
			<div class="col-xs-2 col-md-2 col-lg-2">
				<span>依据的技术文件（代号、名称）及客户要求:</span>
			</div>
			<div class="col-xs-10 col-md-10 col-lg-10">
				<span id="accordingDoc"></span>
			</div>
		</div>
		<hr />
		<div class="row">
			<div class="col-xs-2 col-md-2 col-lg-2">
				<span id="employeeName">样品管理员:&nbsp;<span></span></span>
			</div>
			<div class="col-xs-8 col-md-8 col-lg-8"></div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button id="btn-laborHour" type="button" class="btn btn-primary" >修改工时</button>
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button id="btn-assign" type="button" class="btn btn-primary" >分配人员</button>
			</div>
		</div>
		<br />
		<!-- 任务表格 -->
  		<table id="taskTable">
  		</table>
  		<hr />
  		<div class="row">
  			<div class="col-xs-12 col-md-12 col-lg-2">
				<h5>其他文件</h5>
			</div>
		</div>
		<hr />
		<!-- 文件表格 -->
  		<table id="fileTable">
  		</table>
  		<hr />
		<div class="row">
			<div class="col-xs-11 col-md-11 col-lg-11">
			</div>
  			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" class="btn btn-primary" id="return">返回</button>
			</div>
		</div>
  	</div>
  	
	<!-- 分配弹框 -->
	<div id="assignPeopleModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<div class="row">
						<div class="col-xs-11 col-md-11 col-lg-11">
							<h4>分配人员</h4>
						</div>
						<div class="col-xs-1 col-md-1 col-lg-1">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					</div>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-4 col-md-4 col-lg-4">
							<h4><span id="departmentPeople"></span>部门所有人员：</h4>
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4">
							<div>
								<input type="radio" name="assignType" value="1" checked>检测/校准员&nbsp;
								<input type="radio" name="assignType" value="0">监督员
							</div>
						</div>
						<div class="col-xs-1 col-md-1 col-lg-1"></div>
						<div class="col-xs-3 col-md-3 col-lg-3">
							<h5 >样品编号：<span id="sampleCode"></span></h5>
						</div>
					</div>
					<span style="display:none" id="taskID"></span>
					<span style="display:none" id="type"></span>
					<span style="display:none" id="departmentID"></span>
					<div class="row">
						<div id="assignTable" class="col-xs-10 col-md-10 col-lg-10" >
						</div>	
					</div>
				</div>
				<div class="modal-footer">
					<button id="assign" type="button" class="btn btn-primary">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 修改工时弹框 -->
	<div id="editHourModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<div class="row">
						<div class="col-xs-11 col-md-11 col-lg-11">
							<h4>修改工时</h4>
						</div>
						<div class="col-xs-1 col-md-1 col-lg-1">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"> 
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					</div>
				</div>
				<div class="modal-body">
					<form id="a" class="form-horizontal">
        				<div class="form-group">
		    				<label for="" class="col-xs-3 col-md-3 col-lg-3 control-label">请输入工时：</label>
		    				<div class="col-xs-4 col-md-4 col-lg-4">
		      					<input type="text" class="form-control" id="laborhour" name="" required/>
		    				</div>
		    				<div class="col-xs-5 col-md-5 col-lg-5">
		    			</div>
		    		</form>
				</div>
				<div class="modal-footer">
					<button id="edit-hour" type="button" class="btn btn-primary">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
</body>
  
  <script src="module/js/taskAssignManage/taskAssign.js"></script>
  <script src="module/js/fileManage/fileManage.js"></script>
  <script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
  <script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script> 
  <script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
</html>
