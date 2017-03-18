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

<title>职务管理</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">


<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css"
	href="module/css/fileManage/fileManage.css">
<link rel="stylesheet" type="text/css"
	href="module/css/timecheck/suggest.css">
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
		
	
<script src="assets/js/autoPage.js"></script>

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/fileManage/fileManage.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>

</head>

<style>
span {
	font-size: 20px;
	padding: 0px;
	margin: 0px;
}

.input-group[class*="col-"] {
	float: left;
}

.input-group .form-control {
	float: left;
	margin-bottom: 0;
	position: relative;
	width: 100%;
	z-index: 2;
	float: right;
}

#departin label {
	margin-top: 11px;
	float: left;
	text-indent: 1em;
	font-weight: 500;
	font-size: 18px;
}
 #Jobprofile label {
	margin-top: 11px;
	float: left;
	text-indent: 1em;
	font-weight: 500;
	font-size: 18px;
}

textarea {
	margin-top: 10px;
}

#form {
	width: 100%;
	height: 60px;
	float: left;
	margin-top: 8px;
}

.item {
	width: 30%;
	height: 40%;
	float: left;
}

.item>input {
	display: inline-block;
	width: 60%;
}


#search {
	float: left;
}
	
</style>

<body>
	<div id="form">
		<div class="item">
			<label class="control-label">职务编号:</label> <input
				class="form-control" id="linkdutyCode">
		</div>
		<div class="item">
			<label class="control-label">职务名称:</label> <input
				class="form-control" id="linkdutytName">
		</div>
		<div class="col-md-3.5 column">
		<button id="Import" onclick="" class="btn btn-primary"
					type="button">
					<em class=""></em> 导入
				</button>
				<button id="export" onclick="" class="btn btn-primary"
					type="button">
					<em class=""></em> 导出
				</button>
				
		</div>

	</div>
	<!--功能按钮 -->
	<div class="row clearfix">

		<div class="col-md-3.5 column">
			<div style="float: right;margin-right: 16px;">
				<button id="query" onclick="find()" class="btn btn-primary"
					type="button">
					<em class="glyphicon glyphicon-search"></em> 查询
				</button>
				<button type="button" class="btn btn-primary glyphicon glyphicon-plus"
					data-toggle="modal" data-target="#addModal">&nbsp;新增</button>

				<button class="btn btn-primary" button" id="modify"
					onclick="openModal()">
					<em class="glyphicon glyphicon-pencil"></em> 修改
				</button>

				<button class="btn btn-primary" button" id="del" onclick="delData()">
					<em class="glyphicon glyphicon-trash"></em> 删除
				</button>

				<button class="btn btn-primary" button" id="refresh"
					onclick="refresh()">
					<em class="glyphicon glyphicon-refresh"></em> 全部数据
				</button>

			</div>
		</div>
	</div>
	
	<table id="table">
	</table>
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
					<h4 class="modal-title">添加职务</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>职务编码：</h4>
							<input type="text" id="add_dutyCode" name="dutyCode "
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>职务名称：</h4>
							<input type="text" id="add_dutyName" name="dutyName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div style="margin-top:20px" id="departin">
							<label>&nbsp;职务简介:</label>
							<textarea rows="6" cols="66" id="add_introduction"></textarea>
							<input id="ID" type="hidden"></input>
						</div>
					</div>
				</div>
				<div class="modal-footer">
				
					<button type="button" class="btn btn-primary" onclick="add();">新增</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			
				</div>
			</div>
		</div>
	</div>
	<div id="editModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改职务</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div style="display: none;" class="col-xs-12 col-md-12">
							<h4>流水号1：</h4>
							<input type="text" id="edit_ID" name="ID" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>职务编码：</h4>
							<input type="text" id="edit_dutyCode"
								name="dutyCode " class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>职务名称：</h4>
							<input type="text" id="edit_dutyName"
								name="dutyName" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div style="margin-top:20px"id="Jobprofile" >
							<label>职务简介:</label>
							<textarea rows="7" cols="66" id="edit_introduction"></textarea>
							<input id="ID" type="hidden"></input>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="edit();">修改</button>
				</div>
			</div>
		</div>
	</div>
	</body>



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
		format : 'yyyy-mm-dd'
	});
</script>

<script src="module/js/duty/duty.js"></script>
</html>
	
