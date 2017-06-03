<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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

<title>西计实验室管理系统</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css"
	href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css"
	href="module/css/manhourManage/testManHour.css" />
</head>

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">

<script src="module/js/sweetalert.min.js"></script>
<script src="module/js/alert.js"></script>
<script src="assets/js/autoPage.js"></script>
</body>
<!-- 功能 -->
<div class="container">
	<div class="searchArea">
		<div class="head">
			<div class="content">
				<div class="row" style="margin-top:10px;">
					<div class="col-xs-4 col-md-4 col-lg-4">
						<label class="control-label">实验类别:</label> <select
							id="search_name" name="name" class="form-control">
							<option value=""></option>
						</select>
					</div>
					<div class="col-xs-4 col-md-4 col-lg-4">
						<label class="control-label">检测项目名称: </label> <input type="text"
							id="search_testName" name="testName" class="form-control"
							placeholder="请输入实验类别查找" />
					</div>
				</div>
			</div>
		</div>
		<div class="top">
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-search btn3"
				onclick="search()">查询</button>
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-plus btn3"
				onclick="add()">新增</button>
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-remove btn3"
				onclick="deleteData()">删除</button>
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-refresh btn3"
				onclick="reflesh()">刷新</button>
		</div>
	</div>
	<div class="table">
		<table id="table" class="table table-hover">
		</table>
	</div>

	<!--新增弹框 -->
	<div id="addModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<label class="modal-title">新增工时</label>
				</div>
				<div class="modal-body">
					<div class="row1">
						<div class="col-xs-12 col-md-12" style="display:none">
							<input type="text" id="edit_ID" name="ID" class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>实验类别:</label> <select id="add_name" name="name"
								class="form-control">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>检测项目:</label> <input type="text" id="add_testName"
								name="testName" class="form-control" oninput="addByTestName()"
								onpropertychange="addByTestName()" />
							<div class="testName"></div>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时:</label> <input
								type="text" id="add_laborHour" name="laborHour"
								class="form-control" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="ensure()">确定</button>
					<button style="background:#fff;color:#333;" type="button"
						class="btn btn-primary" data-dismiss="modal">退出</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 修改弹框 -->
	<div id="editModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<label class="modal-title">编辑工时</label>
				</div>
				<div class="modal-body">
					<div class="col-xs-12 col-md-12" style="display:none">
						<input type="text" id="add_ID" name="ID" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>实验类别:</label> <select id="edit_name" name="name"
							class="form-control">
						</select>
					</div>
					<div class="col-xs-12 col-md-12">
						<label>检测项目:</label> <input type="text" id="edit_testName"
							name="testName" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时:</label> <input
							type="text" id="edit_laborHour" name="laborHour"
							class="form-control" />
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="edit()">修改</button>
					<button type="button" style="background:#fff;color:#333;"
						class="btn btn-primary" data-dismiss="modal">退出</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 查看他弹框 -->
	<div id="showModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<label class="modal-title">查看工时</label>
				</div>
				<div class="modal-body">
					<div class="col-xs-12 col-md-12">
						<label>实&nbsp;&nbsp;验&nbsp;&nbsp;类&nbsp;&nbsp;别:</label> <input
							type="text" id="name" name="name" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>项目中文名称:</label> <input type="text" id="nameCn"
							name="nameCn" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>项目英文名称:</label> <input type="text" id="nameEn"
							name="nameEn" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时:</label>
						<input type="text" id="laborHour" name="laborHour"
							class="form-control" />
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" style="background:#fff;color:#333;"
						class="btn btn-primary" data-dismiss="modal">退出</button>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="module/js/testManHour/testManHour.js"></script>
</html>
