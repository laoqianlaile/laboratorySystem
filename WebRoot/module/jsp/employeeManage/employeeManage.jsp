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

<title>员工管理</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>


<style type="text/css">
.form-control {
	display: inline;
	width: 70%;
}

.row {
	margin-bottom: 10px;
}

.row label {
	width: 20%;
	min-width: 80px;
}

#searchArea {
	min-width: 1300px;
	margin: 0 auto;
}

.input-group {
	margin-top: 10px;
}

.input-group .btn {
	margin-left: 3px;
}

.headHr {
	border: 1px solid black;
	margin-bottom: 5px;
	margin-top: 0px;
}

#table {
	border: 1px solid;
	text-align: center;
}
</style>
</head>

<body>
	<!-- 功能 -->
	<div id="searchArea">
		<div class="row">
			<div class="col-xs-4">
				<label>员工姓名 ： </label> <input type="text" id="search_employeeName"
					name="employeeName" class="form-control" placeholder="请输入名称查找" />
			</div>
			<div class="col-xs-4">
				<label>员工编码 ： </label> <input type="text" id="search_employeeCode"
					name="employeeCode" class="form-control" placeholder="请输入员工编码查找" />
			</div>
			<div class="col-xs-4">
				<label>登录名 ： </label> <input type="text" id="search_loginName"
					name="loginName" class="form-control" placeholder="请输入登录名查找" />
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4">
				<label>电话号码 ： </label> <input type="text" id="search_phoneNumber"
					name="phoneNumber" class="form-control" placeholder="请输入电话号码查找" />
			</div>
			<div class="col-xs-4">
				<label>部门 ： </label> <select id="search_departmentName"
					name="departmentName" class="form-control" >
					<option value=""></option>
				</select>
			</div>
		</div>
		<hr class="headHr">
		<div class="input-group" style="float:right;margin-bottom: 10px;">
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-search"
				onclick="seacher()">&nbsp;查询</button>
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-plus" onclick="add()">&nbsp;新增</button>
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-remove" onclick="del()">&nbsp;删除</button>
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-edit"
				onclick="openedit()">&nbsp;编辑</button>
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-show" onclick="view()">&nbsp;查看</button>
			<button type="button"
				class="btn btn-primary glyphicon glyphicon-refresh"
				onclick="reflesh()">&nbsp;刷新</button>
		</div>
	</div>
	<table id="table">
	</table>

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
					<h4 class="modal-title">人员信息</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>姓名:</h4>
							<input type="text" id="add_employeeName" name="employeeName"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>员工编号:</h4>
							<input type="text" id="add_employeeCode" name="employeeCode"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<input type="radio" name="sex" value="1" checked />男 <input
								type="radio" name="sex" value="0" />女
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>邮箱:</h4>
							<input type="text" id="add_email" name="email"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>手机号码:</h4>
							<input type="text" id="add_phoneNumber" name="phoneNumber"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>地址:</h4>
							<input type="text" id="add_address" name="address"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>职务:</h4>
							<select id="add_dutyName" name="dutyName" class="form-control">
								<option value="-1"></option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>角色:</h4>
							<select id="add_name" name="name" class="form-control">
								<option value="-1"></option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>部门:</h4>
							<select id="add_departmentName" name="departmentName"
								class="form-control">
								<option value="-1"></option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"
						onclick="save_continue()">保存并继续</button>
					<button type="button" class="btn btn-primary" onclick="save()">保存</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>
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
					<h4 class="modal-title">人员信息</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h5>姓名:</h5>
							<input type="text" id="employeeName" name="employeeName"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h5>员工编号:</h5>
							<input type="text" id="employeeCode" name="employeeCode"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<input type="radio" name="sex1" value="1" checked />男 <input
								type="radio" name="sex1" value="0" />女
						</div>
						<div class="col-xs-12 col-md-12">
							<h5>邮箱:</h5>
							<input type="text" id="email" name="email" class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h5>手机号码:</h5>
							<input type="text" id="phoneNumber" name="phoneNumber"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h5>地址:</h5>
							<input type="text" id="address" name="address"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h5>职务:</h5>
							<input type="text" id="dutyName" name="dutyName"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h5>角色:</h5>
							<input type="text" id="name" name="name" class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h5>部门:</h5>
							<input type="text" id="departmentName" name="departmentName"
								class="form-control" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>
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
					<h4 class="modal-title">人员信息</h4>
				</div>
				<div class="modal-body">
					<div class="row">
					    <div class="col-xs-12 col-md-12" style="display:none;;">
							<input type="text" id="edit_ID" name="ID"
								class="form-control"/>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>姓名:</h4>
							<input type="text" id="edit_employeeName" name="employeeName"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>员工编号:</h4>
							<input type="text" id="edit_employeeCode" name="employeeCode"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<input type="radio" name="sex2" value="1" checked />男 <input
								type="radio" name="sex2" value="0" />女
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>邮箱:</h4>
							<input type="text" id="edit_email" name="email"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>手机号码:</h4>
							<input type="text" id="edit_phoneNumber" name="phoneNumber"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>地址:</h4>
							<input type="text" id="edit_address" name="address"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>职务:</h4>
							<select id="edit_dutyName" name="dutyName" class="form-control">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>角色:</h4>
							<select id="edit_name" name="name" class="form-control">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>部门:</h4>
							<select id="edit_departmentName" name="departmentName"
								class="form-control">
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="edit()">修改</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="module/js/employeeManage/employeeManage.js"></script>
</html>
