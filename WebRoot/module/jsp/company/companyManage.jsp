5<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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

<title>外包公司管理</title>

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
	href="module/css/bootstrap-datetimepicker.css">


<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>

</head>

<body>
	<a href="companyController/dowload.do">下载</a>
	<form action="companyController/upload.do" method="post"
		enctype="multipart/form-data"
		style="float:left;margin-top:10px;margin-bottom:15px">
		<input type="file" name="file" /> <input type="submit" value="Submit" />
	</form>


	<!-- 功能按钮 -->
	<div class="input-group"
		style="float: right;margin-top:10px;margin-bottom:15px">

		<button type="button" class="btn btn-primary glyphicon glyphicon-plus"
			data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
		<button type="button" class="btn btn-primary glyphicon glyphicon-show"
			onclick="showModal()">&nbsp;查看</button>
		<button type="button" class="btn btn-primary glyphicon glyphicon-edit"
			onclick="openEdit()">&nbsp;修改</button>
		<button type="button"
			class="btn btn-primary glyphicon glyphicon-remove" onclick="del()">&nbsp;删除</button>
		<button type="button"
			class="btn btn-primary glyphicon glyphicon-refresh"
			onclick="refresh()">&nbsp;刷新</button>
	</div>

	<!-- 新增弹框 -->
	<div id="addModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增:</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>公司名:</h4>
							<input type="text" id="ADD_NAME" name="ADD_NAME"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>联系人:</h4>
							<input type="text" id="ADD_CONTACTOR" name="ADD_CONTACTOR"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>创建时间:</h4>
							<div class="input-group date form_datetime col-md-12">
								<input class="form-control" size="16" type="text" value=""
									id="ADD_CREATTIME" name="ADD_CREATTIME" disabled> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-th"></span></span>
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>联系电话:</h4>
							<input type="text" id="ADD_CONTACTPHONE" name="ADD_CONTACTPHONE"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>固定电话:</h4>

							<input type="text" id="ADD_TELEPHONE" name="ADD_TELEPHONE"
								class="form-control" />
						</div>

						<div class="col-xs-12 col-md-12">
							<h4>详细地址:</h4>
							<input type="text" id="ADD_ADDRESS" name="ADD_ADDRESS"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>经营范围:</h4>
							<input type="text" id="ADD_SCOPE" name="ADD_SCOPE"
								class="form-control" />
						</div>

						<div class="col-xs-12 col-md-12">
							<h4>备注:</h4>
							<input type="text" id="ADD_REMARKS" name="ADD_REMARKS"
								class="form-control">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="add()">确定</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 查看弹框 -->
	<div id="showModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增:</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>公司名:</h4>
							<input type="text" id="SHOW_NAME" name="SHOW_NAME"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>联系人:</h4>
							<input type="text" id="SHOW_CONTACTOR" name="SHOW_CONTACTOR"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>创建时间:</h4>
							<input class="form-control" size="16" type="text" value=""
								id="SHOW_CREATTIME" name="SHOW_CREATTIME" readonly>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>联系电话:</h4>
							<input type="text" id="SHOW_CONTACTPHONE"
								name="SHOW_CONTACTPHONE" class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>固定电话:</h4>
							<input type="text" id="SHOW_TELEPHONE" name="SHOW_TELEPHONE"
								class="form-control" />
						</div>

						<div class="col-xs-12 col-md-12">
							<h4>详细地址:</h4>
							<input type="text" id="SHOW_ADDRESS" name="SHOW_ADDRESS"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>经营范围:</h4>
							<input type="text" id="SHOW_SCOPE" name="SHOW_SCOPE"
								class="form-control" />
						</div>

						<div class="col-xs-12 col-md-12">
							<h4>备注:</h4>
							<input type="text" id="SHOW_REMARKS" name="SHOW_REMARKS"
								class="form-control">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
					<h4 class="modal-title">修改</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>公司名:</h4>
							<input type="text" id="EDIT_NAME" name="EDIT_NAME"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>联系人:</h4>
							<input type="text" id="EDIT_CONTACTOR" name="EDIT_CONTACTOR"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>创建时间:</h4>
							<div class="input-group date form_datetime col-md-12">
								<input class="form-control" size="16" type="text" value=""
									id="EDIT_CREATTIME" name="EDIT_CREATTIME" disabled> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-th"></span></span>
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>联系电话:</h4>
							<input type="text" id="EDIT_CONTACTPHONE"
								name="EDIT_CONTACTPHONE" class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>固定电话:</h4>
							<input type="text" id="EDIT_TELEPHONE" name="EDIT_TELEPHONE"
								class="form-control" />
						</div>

						<div class="col-xs-12 col-md-12">
							<h4>详细地址:</h4>
							<input type="text" id="EDIT_ADDRESS" name="EDIT_ADDRESS"
								class="form-control" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>经营范围:</h4>
							<input type="text" id="EDIT_SCOPE" name="EDIT_SCOPE"
								class="form-control" />
						</div>

						<div class="col-xs-12 col-md-12">
							<h4>备注:</h4>
							<input type="text" id="EDIT_REMARKS" name="EDIT_REMARKS"
								class="form-control">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="edit()">确定</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 表格 -->
	<table id="table">

	</table>
















	<script src="module/js/companyManage/companyManage.js"></script>
	<script type="text/javascript">
		$('.form_datetime').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			format : 'yyyy-mm-dd hh:ii:ss'
		});
	</script>
</body>
</html>
