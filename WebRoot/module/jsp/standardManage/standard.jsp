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

<title>标准管理</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">

<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" /> 

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/fileManage/fileManage.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<script src="module/js/sweetalert.min.js"></script>
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
#menu{
    background-color: rgb(232,243,249);
    padding-top: 20px;
    padding-bottom: 20px;
    width: 101%;
}
#menu button{
	  margin-right: 2%;
}
#menu button:hover {
  border: none;
  color: #fff;
  background-color: rgb(255, 173, 51);
}
#addModal .row .form-control{
    display: initial;
    width:80%;
}
#addModal .row .labelName{
	margin: 2%;
	text-align: center;
}
#editModal .row .form-control{
    display: initial;
    width:80%;
    height: 35px;
}
#editModal .row .labelName{
	margin: 2%;
	text-align: center;
}
#applyModal .row .form-control{
    display: initial;
    width:80%;
    height: 35px;
}

#applyModal .row .labelName{
	margin: 2%;
	text-align: center;
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
									name="STANDARDCODE" class="form-control"  type="text">
							</div>
							<div class="col-md-3 column">
								<label>名称： </label> <input id="query_STANDARDNAME"
									name="STANDARDNAME"  class="form-control"  type="text">
							</div>
							<div class="col-md-3 column">
								<label>状态&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ： </label> <select
									id="query_STATE" name="STATE" class="form-control">
									<option value="">全部</option>
									<option value="0">未提交</option>
									<option value="1">待审核</option>
									<option value="2">通过</option>
									<option value="3">驳回</option>
									<option value="4">废弃待审核</option>
									<option value="5">已废弃</option>
								</select>
							</div>
						</div>
						<div class="row clearfix">
							<div class="col-md-6 column">
								<label>类别： </label> <select id="query_TYPE" name="TYPE"
									 class="form-control" >
									<option value="">全部</option>
								</select>
							</div>
							<div class="col-md-6 column">
								<label>标准类型： </label> <select id="query_APPLICATIONTYPE"
									name="APPLICATIONTYPE" class="form-control">
									<option value="">全部</option>
									<option value="0">国家标准</option>
									<option value="1">企业标准</option>
									<option value="2">作业指导书</option>
								</select>
							</div>
						</div>
						<div id = "menu" class="row clearfix">
							<div class="col-md-6 column">
								<button id="query" onclick="query()" class="btn btn-primary"
									type="button">
									<em class="glyphicon glyphicon-search"></em> 查询
								</button>

								<button class="btn btn-primary type="
									button" data-toggle="modal" onclick="openAddmodal('upfile')">
									<em class="glyphicon glyphicon-arrow-up"></em> 覆盖上传
								</button>

								<button class="btn btn-primary" type="button" data-toggle="modal"
									onclick="openAddmodal('add')">
									<em class="glyphicon glyphicon-plus"></em> 新增标准
								</button>
								
								<button class="btn btn-primary" type="button" onclick="submitStandard()">
									<em class="glyphicon glyphicon-check"></em> 提交审核
								</button>
										

								<button class="btn btn-primary type=" button" id="del"
									onclick="applyMondal()">
									<em class="glyphicon glyphicon-trash"></em> 废弃
								</button>

								<button class="btn btn-primary type=" button" id="refresh"
									onclick="refresh()">
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
					<div class="row" >
						<div class="col-xs-12 col-md-12">
							<label class="labelName">标准编号</label>
							<input type="text" id="add_STANDARDCODE" name="STANDARDCODE"
								class="form-control"   />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">标准名称</label>
							<input type="text" id="add_STANDARDNAME" name="STANDARDNAME"
								class="form-control"  />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">　类别　</label>
							<select id="add_TYPE" name="TYPE" class="form-control"
								aria-describedby="basic-addon1">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">适用范围</label>
							<input type="text" id="add_SCOPE" name="SCOPE"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">引用类型</label>
							<select id="add_APPLICATIONTYPE" name="APPLICATIONTYPE"
								class="form-control" aria-describedby="basic-addon1">
								<option class="form-control" value="0">国家标准</option>
								<option class="form-control" value="1">企业标准</option>
								<option class="form-control" value="2">作业指导书</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">编辑状态</label>
							<select id="add_EDITSTATE" name="EDITSTATE" class="form-control"
								aria-describedby="basic-addon1">
								<option class="form-control" value="0">不可编辑</option>
								<option class="form-control" value="1">可编辑</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName" style="position: relative;bottom: 25px;">　描述　</label>
							<textarea type="" id="add_DESCRIPTION" name="DESCRIPTION"
								class="form-control" aria-describedby="basic-addon1"></textarea>
						</div>
						<div class="col-xs-12 col-md-12">
							<div id="fileInfo">
								<div id="fileQueue">
									<input type="file" name="files" id="files" style="display:none" onchange="checkFile(this)">
								</div>
								<button type="button" id="chooseFile" name="chooseFile" class="btn btn-default">
									<span class="glyphicon glyphicon-folder-open "></span> 选择文件
								</button>
								<span id="fileName"></span>
								
							</div>
						</div>
						<div class="col-md-6 column">
							<select id="fileType">
								<option value="17">标准文件</option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id = "ensure" name ="ensure">新增</button>
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
							<label class="labelName" >标准编码</label>
							<input type="text" id="edit_STANDARDCODE" readonly
								name="STANDARDCODE" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">标准名称</label>
							<input type="text" id="edit_STANDARDNAME" name="STANDARDNAME"
								class="form-control"  />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">　类别　</label>
							<select id="edit_TYPE" name="TYPE" class="form-control" >
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">适用范围</label>
							<input type="text" id="edit_SCOPE" name="SCOPE" class="form-control"  />

						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">引用类型</label>
							<select id="edit_APPLICATIONTYPE" name="APPLICATIONTYPE" class="form-control" >
								<option class="form-control" value="0">国家标准</option>
								<option class="form-control" value="1">企业标准</option>
								<option class="form-control" value="2">作业指导书</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName" >编辑状态</label>
							<select id="edit_EDITSTATE" name="EDITSTATE" class="form-control"
								aria-describedby="basic-addon1">
								<option class="form-control" value="0">不可编辑</option>
								<option class="form-control" value="1">可编辑</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName" >审核意见</label>
							<input type="text" id="edit_SUGGEST" name="SUGGEST" readonly
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<label class="labelName" >　状态　</label>
							<select id="edit_STATE" name="STATE" class="form-control"
								aria-describedby="basic-addon1">
								<option class="form-control" value="0">待审核</option>
								<option class="form-control" value="1">通过</option>
								<option class="form-control" value="2">已废弃</option>
								<option class="form-control" value="3">驳回</option>
							</select>
						</div> -->
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" id="editbtn" onclick="edit()">修改</button>
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
							<label class="labelName" >标准编号</label>
							<input type="text" id="apply_STANDARDCODE" name="STANDARDCODE"
								class="form-control" readonly aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName" >标准名称</label>
							<input type="text" id="apply_STANDARDNAME" name="STANDARDNAME"
								class="form-control" readonly aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName" >标准类别</label>
							<select id="apply_TYPE" name="TYPE" class="form-control">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName" >引用类型</label>
							<select id="apply_APPLICATIONTYPE" name="APPLICATIONTYPE"
								class="form-control" aria-describedby="basic-addon1">
								<option class="form-control" value="0">国家标准</option>
								<option class="form-control" value="1">企业标准</option>
								<option class="form-control" value="2">作业指导书</option>
							</select>
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<label class="labelName" >申请人　</label>
							<input type="text" id="apply_ABANDONAPPLYMAN"
								name="ABANDONAPPLYMAN" class="form-control"
								aria-describedby="basic-addon1" />
						</div> -->
						<div class="col-xs-12 col-md-12">
							<label class="labelName" style="position: relative;bottom: 13px;" >申请理由</label>
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
	
	<div id="recoverStandard" class="modal fade" role="dialog"  
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:450px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">重新覆盖检测报告</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="fileInfo" style="text-align:left">
							<div id="recoverfileQueue">
								<input type="file" name="recoverFiles" id="recoverFiles" style="display:none" onchange="checkRecoverFile(this)">
							</div>
							<button type="button" id="recoverButton" name="recoverButton" class="btn btn-default">
								<span class="glyphicon glyphicon-folder-open "></span> 选择文件
							</button>
							<span id="recoverFileName"></span>
						</div>
					</div>
				</div>
				<div class="modal-footer">

					
					<button type="button" class="btn btn-default" id="revocerCancel" name="revocerCancel">取消</button>
					<button type="button" class="btn btn-primary" id="recoverEnsure" name="recoverEnsure">确定</button>
				</div>
			</div>
		</div>
	</div>
	
</body>
<script src="module/js/standardManage/standard.js"></script>
<script src="module/js/fileManage/fileManage.js"></script>
<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script> 
<script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
<script type="text/javascript">
	$('#chooseFile').click(function() {
		$('#files').click();
	});
	$('#recoverButton').click(function() {
		$('#recoverFiles').click();
	});
	$('#cancel').click(function() {
		if (confirm("是否取消上传?")) {
			reload();
		}
	});
</script>
</html>
