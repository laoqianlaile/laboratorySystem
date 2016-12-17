\<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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

<title>标准管理</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">

<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/fileManage/fileManage.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>
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
							<div class="col-md-3 column">
								<label>编码： </label> <input id="query_STANDARDCODE"
									name="STANDARDCODE" class="form-control" oninput="query()"
									onpropertychange="query()" type="text">
							</div>
							<div class="col-md-3 column">
								<label>名称： </label> <input id="query_STANDARDNAME"
									name="STANDARDNAME"  class="form-control" oninput="query()"
									onpropertychange="query()" type="text">
							</div>
							<div class="col-md-3 column">
								<label>状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ： </label> <select
									id="query_STATE" name="STATE" class="form-control" oninput="query()"
									onpropertychange="query()">
									<option value="">全部</option>
									<option value="0">待审核</option>
									<option value="1">通过</option>
									<option value="2">已废弃</option>
									<option value="3">驳回</option>
								</select>
							</div>
						</div>
						<div class="row clearfix">
							<div class="col-md-6 column">
								<label>类别： </label> <select id="query_TYPE" name="TYPE"
									oninput="query()" class="form-control" onpropertychange="query()">
									<option value="">全部</option>
								</select>
							</div>
							<div class="col-md-6 column">
								<label>标准类型： </label> <select id="query_APPLICATIONTYPE"
									name="APPLICATIONTYPE" class="form-control" oninput="query()"
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

								<button class="btn btn-warning type="
									button" data-toggle="modal" onclick="openAddmodal('upfile')">
									<em class="glyphicon glyphicon-arrow-up"></em> 上传文件
								</button>

								<button class="btn btn-info" type="button" data-toggle="modal"
									onclick="openAddmodal('add')">
									<em class="glyphicon glyphicon-plus"></em> 新增标准
								</button>

								<button class="btn btn-danger type=" button" id="del"
									onclick="applyMondal()">
									<em class="glyphicon glyphicon-trash"></em> 废弃
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
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增</h4>
				</div>
				<div class="modal-body">
					<input type= "hidden" id = "uploaderID" value = "<%=session.getAttribute("EMPLOYEEID")  %>" />
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>标准编号：</h4>
							<input type="text" id="add_STANDARDCODE" name="STANDARDCODE"
								class="form-control" required aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准名称：</h4>
							<input type="text" id="add_STANDARDNAME" name="STANDARDNAME"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>类别：</h4>
							<select id="add_TYPE" name="TYPE" class="form-control"
								aria-describedby="basic-addon1">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>适用范围：</h4>
							<input type="text" id="add_SCOPE" name="SCOPE"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>引用类型：</h4>
							<select id="add_APPLICATIONTYPE" name="APPLICATIONTYPE"
								class="form-control" aria-describedby="basic-addon1">
								<option class="form-control" value="0">国家标准</option>
								<option class="form-control" value="1">企业标准</option>
								<option class="form-control" value="2">作业指导书</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>编辑状态：</h4>
							<select id="add_EDITSTATE" name="EDITSTATE" class="form-control"
								aria-describedby="basic-addon1">
								<option class="form-control" value="0">不可编辑</option>
								<option class="form-control" value="1">可编辑</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>描述：</h4>
							<textarea type="" id="add_DESCRIPTION" name="DESCRIPTION"
								class="form-control" aria-describedby="basic-addon1"></textarea>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>文件上传：</h4>
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								>
							<div class="col-md-6 column">
								<select id="fileType">
									<option value="17">标准文件</option>
								</select>

							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="add()">新增</button>
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
					<div class="row" id="edit">
						<div style="display: none;" class="col-xs-12 col-md-12">
							<h4>ID：</h4>
							<input type="text" id="edit_STANDARDID" name="STANDARDID"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准编码：</h4>
							<input type="text" id="edit_STANDARDCODE" readonly
								name="STANDARDCODE" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准名称：</h4>
							<input type="text" id="edit_STANDARDNAME" name="STANDARDNAME"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>类别：</h4>

							<select id="edit_TYPE" name="TYPE" class="form-control"
								aria-describedby="basic-addon1">
								<option class="form-control" value="1111">电磁学</option>
								<option class="form-control" value="1112">化学校验</option>
								<option class="form-control" value="1113">物理模型</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>适用范围：</h4>
							<input type="text" id="edit_SCOPE" name="SCOPE"
								class="form-control" aria-describedby="basic-addon1" />

						</div>
						<div class="col-xs-12 col-md-12">
							<h4>引用类型：</h4>
							<select id="edit_APPLICATIONTYPE" name="APPLICATIONTYPE"
								class="form-control" aria-describedby="basic-addon1">
								<option class="form-control" value="0">国家标准</option>
								<option class="form-control" value="1">企业标准</option>
								<option class="form-control" value="2">作业指导书</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>编辑状态：</h4>
							<select id="edit_EDITSTATE" name="EDITSTATE" class="form-control"
								aria-describedby="basic-addon1">
								<option class="form-control" value="0">不可编辑</option>
								<option class="form-control" value="1">可编辑</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>审核意见：</h4>
							<input type="text" id="edit_SUGGEST" name="SUGGEST"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>状态：</h4>
							<select id="edit_STATE" name="STATE" class="form-control"
								aria-describedby="basic-addon1">
								<option class="form-control" value="0">待审核</option>
								<option class="form-control" value="1">通过</option>
								<option class="form-control" value="2">已废弃</option>
								<option class="form-control" value="3">驳回</option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="edit()">修改</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 申请废弃弹窗 -->
	<div id="applyModal" class="modal fade" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">废弃申请</h4>
				</div>
				<div class="modal-body" id="apply">
					<div class="row">
						<div class="col-xs-12 col-md-12" style="display: none;">
							<h4>标准ID：</h4>
							<input type="text" id="apply_STANDARDID" name="STANDARDID"
								class="form-control" readonly aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准编号：</h4>
							<input type="text" id="apply_STANDARDCODE" name="STANDARDCODE"
								class="form-control" readonly aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准名称：</h4>
							<input type="text" id="apply_STANDARDNAME" name="STANDARDNAME"
								class="form-control" readonly aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>标准类别：</h4>
							<select id="apply_TYPE" name="TYPE" class="form-control"
								aria-describedby="basic-addon1">
								<option class="form-control" value="1111">电磁学</option>
								<option class="form-control" value="1112">化学校验</option>
								<option class="form-control" value="1113">物理模型</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>引用类型：</h4>
							<select id="apply_APPLICATIONTYPE" name="APPLICATIONTYPE"
								class="form-control" aria-describedby="basic-addon1">
								<option class="form-control" value="0">国家标准</option>
								<option class="form-control" value="1">企业标准</option>
								<option class="form-control" value="2">作业指导书</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>申请人：</h4>
							<input type="text" id="apply_ABANDONAPPLYMAN"
								name="ABANDONAPPLYMAN" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>申请时间：</h4>
							<input type="text" id="apply_ABANDONAPPLYTIME"
								name="ABANDONAPPLYTIME" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>申请理由：</h4>
							<textarea type="" id="apply_ABANDONAPPLYREASON"
								name="ABANDONAPPLYREASON" class="form-control"
								aria-describedby="basic-addon1"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="apply()">确认申请</button>
				</div>
			</div>
		</div>
	</div>
		<!-- 上传文件弹框 -->
	<div id="upfileModal" class="modal fade" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>文件上传：</h4>
							<div id="uploadfileQueue"></div>
							<input type="file" id="upFile" name="upFile"
								multiple="multiple">
							<div class="col-md-6 column">
								<select id="fileType">
									<option value="17">标准文件</option>
								</select>

							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="addfile()">新增</button>
				</div>
			</div>
		</div>
	</div>
	
</body>
<script src="module/js/standardManage/standard.js"></script>
<script type="text/javascript">
	$(function() {
		$("[data-toggle='tooltip']").tooltip();
	});
</script>
</html>
