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
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
	<link rel="stylesheet" href="module/css/changeACE.css" />
	 
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
    <script src="assets/js/autoPage.js"></script>
   
  </head>
  
  <body>
    <span id="receiptlistID" style="display:none"></span>
	<div class="container" style="width:100%">
  		<div class="row">
			<div class="col-xs-10 col-md-10 col-lg-10">
				<h4>修改检测人/监督员</h4>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<h5 id="factoryCode">样品编号:&nbsp;<span></span></h5>
			</div>
		</div>
		<!-- 表格 -->
  		<table id="table">
  		</table>
		<div class="row">
			<div class="col-xs-11 col-md-11 col-lg-11">
			</div>
  			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" class="btn btn-primary" id="return">返回</button>
			</div>
		</div>
	</div>
	<hr>
	
  	<!-- 分配弹框 -->
	<div id="assignPeopleModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<div class="row">
						<div class="col-xs-11 col-md-11 col-lg-11">
							<h4 >修改人员</h4>
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
						<div class="col-xs-5 col-md-5 col-lg-5"></div>
						<div class="col-xs-3 col-md-3 col-lg-3">
							<h5 >样品编号：<span id="sampleCode"></span></h5>
						</div>
					</div>
					<span style="display:none" id="departmentID"></span>
					<span style="display:none" id="assignType"></span>
					<div class="row">
						<div id="assignTable" class="col-xs-12 col-md-12 col-lg-12" >
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
  </body>
  
  <script src="module/js/taskAssignManage/editAssignPeople.js"></script>
  
</html>
