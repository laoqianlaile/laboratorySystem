<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String qualiyPlanId = request.getParameter("qualiyPlanId");
	if(qualiyPlanId!=null&&qualiyPlanId!="")
		session.setAttribute("qualiyPlanId",qualiyPlanId);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>审核建议信息</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css"
	href="module/css/traceability/traceabilityAudit.css">
<link rel="stylesheet" href="module/css/bootstrap.min.css"
	type="text/css"></link>
<link rel="stylesheet" href="module/css/bootstrap.css" type="text/css"></link>
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">
<script type="text/javascript" src="module/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table.js"></script>
<script type="text/javascript" src="module/js/bootstrap.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript"
	src="module/js/traceability/traceabilityAudit.js"></script>
</head>

<body>
	<div class="wrapper">
		<div id="searcherArea">
			<div class="list-searcher">
				<span>设备名称：</span><input type="text" id="equipmentName"
					name="equipmentName" class="form-control"
					aria-describedby="basic-addon1"> <span>仪器编号：</span><input
					type="text" id="equipmentCode" name="equipmentCode"
					class="form-control" aria-describedby="basic-addon1"> <span>审核状态：</span><select
					id="auditState" name="auditState" class="form-control"><option>全部</option>
					<option>未审核</option>
					<option>审核通过</option>
					<option>审核不通过</option>

				</select>
			</div>
			<div class="list-searcher">
				<span>时间：</span><input type="date" id="startTime" name="startTime"
					class="form-control"> <span>至：</span><input type="date"
					id="endTime" name="endTime" class="form-control"> <span>部门名称：</span><select
					id="departmentName" class="form-control"></select>
				<button type="button" id="search" class="btn btn-info thisbtn"
					onclick="search()">搜索</button>
			</div>
		</div>
		<div class="content" style="margin-top:30px">
			<div class="form-group">
				<button type="button" id="pass" class="btn btn-info thisbtn"
					onclick="pass()">&nbsp;通过</button>
				<button type="button" id="noPass" class="btn btn-info thisbtn"
					onclick="noPass()">&nbsp;不通过</button>
				<button type="button" id="noPass" class="btn btn-info thisbtn"
					style="float:right;" onclick="allData()">&nbsp;全部数据</button>
			</div>
			<table id="table"></table>
		</div>
	</div>
	<!-- 	填写不通过原因 -->
	<div id="noPassModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">填写不通过原因</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="list_upload" style="text-align:center;width:600px">
							<div class="col-xs-12 col-md-12">
								<label style="width:100px;float:left">不通过原因：</label>
								<textarea rows="5" cols="5"
									style="width:250px;float:left;margin-top:20px;" id="reason"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="updateReason" type="button" class="btn btn-info thisbtn">确定</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
