<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>标准辅助管理</title>
    
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>

  </head>
  <style>
.col-md-4 input.form-control {
	width:150px;
	display:inline-block;

}
	
</style>
  <body>
   	<body>
	<div class="container" style="width: 100%;">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<div class="row clearfix">
					<div class="col-md-12 column">
						<div class="row clearfix">
							<div class="col-md-4 column">
								<label>标准类别编号：</label> 
								<input id="query_STANDARDTYPECODE" class="form-control" name="STANDARDTYPECODE" oninput="query()"
									onpropertychange="query()" type="text">
							</div>
							<div class="col-md-4 column">
								<label>标准类别名称：</label> 
								<input  id="query_STANDARDTYPENAME" class="form-control" name="STANDARDTYPENAME" oninput="query()"
									onpropertychange="query()" type="text">
							</div>
						</div>
						<div class="row clearfix">
							<div class="col-md-3.5 column">
								<div style="float: right; padding-right:"20px;">
									<button id = "query"  onclick = "query()" class="btn btn-primary" type="button">
										<em class="glyphicon glyphicon-search"></em> 查询
									</button>
									<button class="btn btn-info" type="button" data-toggle="modal"
									data-target="#addModal">
										<em class="glyphicon glyphicon-plus"></em> 新增
									</button>
									<button class="btn btn-success type=" button" id="refresh"
									onclick="reSetRefresh()">
										<em class="glyphicon glyphicon-refresh"></em> 刷新
								</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<table id="table">
				</table>
			</div>
		</div>
	</div>
	<!-- 新增弹窗 -->
	<div id="addModal" class="modal fade" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<input type= "hidden" id = "EMPLOYEEID" value = "<%=session.getAttribute("EMPLOYEEID")  %>" />
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">标准类型新增</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>标准类型编码：</h4>
							<input type="text" id="add_StandardTypeCode" name="StandardTypeCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准类型名称：</h4>
							<input type="text" id="add_StandardTypeName" name="StandardTypeName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="addStandardType()">确认</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 修改弹窗 -->
	<div id="editModal" class="modal fade" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">标准类型新增</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>ID：</h4>
							<input type="text" id="edit_StandardTypeID" name="StandardTypeID"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准类别编码：</h4>
							<input type="text" id="edit_StandardTypeCode" name="StandardTypeCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准类别名称：</h4>
							<input type="text" id="edit_StandardTypeName" name="StandardTypeName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>创建时间：</h4>
							<input type="text" id="edit_CreateTime" name="CreateTime"
								class="form-control" aria-describedby="basic-addon1" disabled="disabled" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="editStandardType()">确认</button>
				</div>
			</div>
		</div>
	</div>
	<script src="module/js/standardManage/standardType.js"></script>
  </body>
</html>
