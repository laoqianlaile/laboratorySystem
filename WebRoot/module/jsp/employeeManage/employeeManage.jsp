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
<link rel="stylesheet" type="text/css"
	href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css"
	href="module/css/employeeManage/employeeManage.css" />
<script src="assets/js/autoPage.js"></script>

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>


<style type="text/css">
</style>
</head>

<body>
	<!-- 功能 -->
	<div class="container">
	<div class="searchArea">
		<div class="head">
			<div class="content">
				<div class="row" style="margin-top:10px;">
					<div class="col-xs-3 col-md-3 col-lg-3">
						<label>员工姓名 ： </label> <input type="text" id="search_employeeName"
							name="employeeName" class="form-control" placeholder="请输入名称查找" />
					</div>
					<div class="col-xs-3 col-md-3 col-lg-3">
						<label>员工编码 ： </label> <input type="text" id="search_employeeCode"
							name="employeeCode" class="form-control" placeholder="请输入员工编码查找" />
					</div>
					<div class="col-xs-3 col-md-3 col-lg-3">
						<label>登&nbsp;&nbsp;录&nbsp;&nbsp;名 ： </label> <input type="text" id="search_loginName"
							name="loginName" class="form-control" placeholder="请输入登录名查找" />
					</div>
				</div>
				<div class="row">
					<div class="col-xs-3 col-md-3 col-lg-3">
						<label>电话号码 ： </label> <input type="text" id="search_phoneNumber"
							name="phoneNumber" class="form-control" placeholder="请输入电话号码查找" />
					</div>
					<div class="col-xs-3 col-md-3 col-lg-3">
						<label>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门 ： </label> <select
							id="search_departmentName" name="departmentName"
							class="form-control">
							<option value=""></option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="top">
			<button type="button" class="btn btn-primary glyphicon btn3"
				onclick="reflesh()">刷新</button>
			<button type="button" class="btn btn-primary glyphicon btn3"
				onclick="search()">查询</button>
			<button type="button" class="btn btn-primary glyphicon btn3"
				style="hover:#ffad33" onclick="add()">新增</button>
		</div>
	</div>
	<div class="table">
		<table id="table" class="table table-hover">

		</table>
	</div>
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
					<label class="modal-title">添加人员</label>
				</div>
				<div class="modal-body">
					<div class="col-xs-12 col-md-12">
						<label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label> <input
							type="text" id="add_employeeName" name="employeeName"
							class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>员工编号:</label> <input type="text" id="add_employeeCode"
							name="employeeCode" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</label> <input
							style="color:#5dafe5;font-size:14px;width:10px;height:10px;"
							type="radio" name="sex" value="1" checked />男 <input
							type="radio"
							style="color:#666;font-size:14px;width:10px;height:10px;"
							name="sex" value="0" />女
					</div>
					<div class="col-xs-12 col-md-12">
						<label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label> <input
							type="text" id="add_email" name="email" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>手机号码:</label> <input type="text" id="add_phoneNumber"
							name="phoneNumber" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</label> <input
							type="text" id="add_address" name="address" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</label> <select
							id="add_dutyName" name="dutyName" class="form-control">
							<option value="-1"></option>
						</select>
					</div>
					<div class="col-xs-12 col-md-12">
						<label>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:</label> <select
							id="add_name" name="name" class="form-control">
							<option value="-1"></option>
						</select>
					</div>
					<div class="col-xs-12 col-md-12">
						<label>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</label> <select
							id="add_departmentName" name="departmentName"
							class="form-control">
							<option value="-1"></option>
						</select>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"
						onclick="save_continue()">继续</button>
					<button type="button" class="btn btn-primary" onclick="save()">保存</button>
					<button style="background:#fff;color:#333;" type="button"
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
					<label class="modal-title">查看人员</label>
				</div>
				<div class="modal-body">
					<div class="col-xs-12 col-md-12">
						<label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label> <input
							type="text" id="employeeName" name="employeeName"
							class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>员工编号:</label> <input type="text" id="employeeCode"
							name="employeeCode" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</label> <input
							style="color:#5dafe5;font-size:14px;width:10px;height:10px;"
							type="radio" name="sex1" value="1" checked />男 <input
							type="radio"
							style="color:#666;font-size:14px;width:10px;height:10px;"
							name="sex1" value="0" />女
					</div>
					<div class="col-xs-12 col-md-12">
						<label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label> <input
							type="text" id="email" name="email" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>手机号码:</label> <input type="text" id="phoneNumber"
							name="phoneNumber" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</label> <input
							type="text" id="address" name="address" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</label> <input
							type="text" id="dutyName" name="dutyName" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:</label> <input
							type="text" id="name" name="name" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</label> <input
							type="text" id="departmentName" name="departmentName"
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
					<label class="modal-title">修改人员</label>
				</div>
				<div class="modal-body">
					<div class="col-xs-12 col-md-12" style="display:none;;">
						<input type="text" id="edit_ID" name="ID" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label> <input
							type="text" id="edit_employeeName" name="employeeName"
							class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>员工编号:</label> <input type="text" id="edit_employeeCode"
							name="employeeCode" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</label> <input
							style="color:#5dafe5;font-size:14px;width:10px;height:10px;"
							type="radio" name="sex2" value="1" checked />男 <input
							type="radio"
							style="color:#666;font-size:14px;width:10px;height:10px;"
							name="sex2" value="0" />女
					</div>
					<div class="col-xs-12 col-md-12">
						<label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label> <input
							type="text" id="edit_email" name="email" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>手机号码:</label> <input type="text" id="edit_phoneNumber"
							name="phoneNumber" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</label> <input
							type="text" id="edit_address" name="address" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</label> <select
							id="edit_dutyName" name="dutyName" class="form-control">
						</select>
					</div>
					<div class="col-xs-12 col-md-12">
						<label>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:</label> <select
							id="edit_name" name="name" class="form-control">
						</select>
					</div>
					<div class="col-xs-12 col-md-12">
						<label>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</label> <select
							id="edit_departmentName" name="departmentName"
							class="form-control">
						</select>
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
</body>
<script src="module/js/employeeManage/employeeManage.js"></script>
</html>
