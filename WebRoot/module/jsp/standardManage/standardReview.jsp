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

<title>标准审核管理</title>

<meta http-equiv="Content-Type" content="text/html;charset=utf-8">

<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">


<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>

</head>

 <style>
.col-md-3 input.form-control, .col-md-3 select.form-control{
	width:150px;
	display:inline-block;
}
.col-md-6 select.form-control{
	width:150px;
	display:inline-block;
}
	
</style>

<body>
	<div class="container" style="width: 100%;">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<div class="row clearfix">
					<div class="col-md-12 column">
						<div class="row clearfix">
						<input type= "hidden" id = "EMPLOYEEID" value = "<%=session.getAttribute("EMPLOYEEID")  %>" />
							<div class="col-md-3 column">
								<label>编码 ： </label> <input
									id="query_STANDARDCODE" class ="form-control" name="STANDARDCODE" oninput="query()"
									onpropertychange="query()" type="text">
							</div>
							<div class="col-md-3 column">
								<label>名称 ： </label> <input
									id="query_STANDARDNAME" class ="form-control"  name="STANDARDNAME" oninput="query()"
									onpropertychange="query()" type="text">
							</div>
							<div class="col-md-3 column">
								<label>状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;： </label> <select
									id="query_STATE"  class ="form-control"  name="STATE" oninput="query()"
									onpropertychange="query()">
									<option value="">全部</option>
									<option value="0" selected="selected">待审核</option>
									<option value="1">通过</option>
									<option value="2">已废弃</option>
									<option value="3">驳回</option>
								</select>
							</div>
						</div>
						<div class="row clearfix">
							<div class="col-md-6 column">
								<label>类别 ： </label> <select
									id="query_TYPE"  class ="form-control"  name="TYPE" oninput="query()"
									onpropertychange="query()">
									<option value="">全部</option>
								</select>
							</div>
							<div class="col-md-6 column">
								<label>标准类型 ： </label> <select id="query_APPLICATIONTYPE"
									name="APPLICATIONTYPE" class ="form-control"  oninput="query()"
									onpropertychange="query()">
									<option value="">全部</option>
									<option value="0">国家标准</option>
									<option value="1">企业标准</option>
									<option value="2">作业指导书</option>
								</select>
							</div>
						</div>
						<div class="col-md-3.5 column">
							<div style="float: right;">
								<button id="query" onclick="query()" class="btn btn-primary"
									type="button">
									<em class="glyphicon glyphicon-search"></em> 查询
								</button>

								<button class="btn btn-info" type="button">
									<em class="glyphicon glyphicon-plus"></em> 查看
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
	<!-- 审核弹窗 -->
	<div id="Modal" class="modal fade" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">填写标准审核意见</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div style="display: none;" class="col-xs-12 col-md-12">
							<h4>ID：</h4>
							<input type="text" id="StandardID" name="StandardID"
								class="form-control" aria-describedby="basic-addon1" ></input>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>原因：</h4>
							<textarea id="Suggest" name="Suggest"
								class="form-control" aria-describedby="basic-addon1"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button id = "AuditStandard" type="button" class="btn btn-primary" onclick="AuditStandard()">确认</button>
				</div>
			</div>
		</div>
	</div>
	<script src="module/js/standardManage/standardReview.js"></script>
</body>
</html>
