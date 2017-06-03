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
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<link rel="stylesheet" type="text/css"
	href="module/css/manhourManage/checkManHour.css" />

<script src="module/js/sweetalert.min.js"></script>
<script src="module/js/alert.js"></script>
<script src="assets/js/autoPage.js"></script>
<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
</head>

<body>
	<!-- 功能 -->
	<div class="container">
		<div class="searchArea">
			<div class="head">
				<div class="content">
					<div class="row" style="margin-top:10px;">
						<div class="col-xs-4 col-md-4 col-lg-4">
							<label class="control-label">样品编号 ： </label> <input type="text"
								id="search_factoryCode" name="factoryCode" class="form-control"
								placeholder="请输入样品编号查找" />
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4">
							<label class="control-label">样品名称 ： </label> <input type="text"
								id="search_sampleName" name="sampleName" class="form-control"
								placeholder="请输入样品名称查找" />
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4">
							<label class="control-label">样品型号： </label> <input type="text"
								id="search_specifications" name="specifications"
								class="form-control" placeholder="请输入样品型号查找" />
						</div>
					</div>
				</div>
			</div>
			<div class="top">
				<button type="button"
					class="btn btn-primary glyphicon  glyphicon-search btn3"
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
			<table id="table">
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
					<label class="modal-title">新增工时</label>
				</div>
				<div class="modal-body">
					<div class="row1">
						<div class="col-xs-12 col-md-12" style="display:none">
							<input type="text" id="add_ID" name="ID" class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>样品编号:</label> <input type="text" id="add_factoryCode"
								name="factoryCode" class="form-control"
								oninput="addByfactoryCode()"
								onpropertychange="addByfactoryCode()" />
							<div class="factoryCode"></div>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>样品名称:</label> <input type="text" id="add_sampleName"
								name="sampleName" class="form-control"
								oninput="addBysampleName()" onpropertychange="addBysampleName()" />
							<div class="sampleName"></div>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label> <input
								type="text" id="add_specifications" name="specifications"
								class="form-control" oninput="addByspecifications()"
								onpropertychange="addByspecifications()" />
							<div class="specifications"></div>
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
						<label>样品编号:</label> <input type="text" id="factoryCode"
							name="factoryCode" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>样品名称:</label> <input type="text" id="sampleName"
							name="sampleName" class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label> <input
							type="text" id="specifications" name="specifications"
							class="form-control" />
					</div>
					<div class="col-xs-12 col-md-12">
						<label>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时:</label> <input
							type="text" id="laborHour" name="laborHour" class="form-control" />
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
					<label class="modal-title">编辑工时</label>
				</div>
				<div class="modal-body">
					<div class="row1">
						<div class="col-xs-12 col-md-12" style="display:none">
							<input type="text" id="edit_ID" name="ID" class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>样品编号:</label> <input type="text" id="edit_factoryCode"
								name="factoryCode" class="form-control"
								oninput="editByfactoryCode()"
								onpropertychange="editByfactoryCode()" />
							<div class="factoryCode"></div>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>样品名称:</label> <input type="text" id="edit_sampleName"
								name="sampleName" class="form-control" readonly="true" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label> <input
								type="text" id="edit_specifications" name="specifications"
								class="form-control" readonly="true"/>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时:</label> <input
								type="text" id="edit_laborHour" name="laborHour"
								class="form-control" />
						</div>
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
<script src="module/js/checkManHour/checkManHour.js"></script>
</html>
