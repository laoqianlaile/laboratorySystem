<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>任务管理</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/taskManage/taskManage.css">
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/sweetalert.min.js"></script>
<script src="assets/js/autoPage.js"></script>

</head>

<body>

	<div class="content">
		<div class="searchArea">
			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>交接单号:</label> <input type="text" name="schFactoryCode"
						id="schFactoryCode" class="form-control"
						aria-describedby="basic-addon1" placeholder="请输入交接单号查找">
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>样品名称:</label> <input type="text" name="sampleName"
						id="sampleName" class="form-control"
						aria-describedby="basic-addon1" placeholder="请输入样品名称查找">
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>检测项目：</label>
					<div id="testItemDiv">
						<input type="text" name="testItem" id="testItem"
							class="form-control" aria-describedby="basic-addon1"
							style="width:100%" placeholder="请输入检测项目名称查找">
						<ul id="dropDownList">
						</ul>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">委托时间:</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" name="beginTime" id="beginTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择开始时间"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>

				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">至: </label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" name="endTime" id="endTime" size="16"
							type="text" value="" readonly="true" placeholder="请选择结束时间">
						<span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label>检测/校准进度:</label> <select class="form-control "
						name="testProcess" id="testProcess">
						<option value="7">所有情况</option>
						<option value="0">无报告</option>
						<option value="1">未提交</option>
						<option value="2">二审审核中</option>
						<option value="3">二审未通过</option>
						<option value="4">三审审核中</option>
						<option value="5">三审未通过</option>
						<option value="6">审核通过</option>
					</select>

				</div>
			</div>
		</div>


		<div class="buttonGroup">
			<button type="button" class="btn btn-primary glyphicon " onclick="search()">查询</button>
			&nbsp;
			<button type="button" class="btn btn-primary glyphicon " onclick="refresh()">刷新</button>
		</div>
	</div>

	<div id="taskAuditPerson" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:700px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="taskID" name="taskID"
						style="float:right;display:none"></h4>
					<h4 class="modal-title" id="sampleCodeName" name="sampleCodeName"
						style="float:right;"></h4>
					<h4 class="modal-title">分配审核人</h4>
				</div>
				<div class="modal-body" style="width:94%;margin:0 auto;">
					<div class="row">
						<table id="taskAuditPersonTable">
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="ensure" name="ensure" onclick="setAuditPerson()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>

	<table id="table">

	</table>



	<script type="text/javascript" src="module/js/taskManage/taskManage.js"></script>
	<script type="text/javascript">
		$('.form_datetime').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 1,
			maxView : 3,
			forceParse : 0,
			format : 'yyyy-mm-dd hh:ii:ss'
		});
	</script>
</body>
</html>
