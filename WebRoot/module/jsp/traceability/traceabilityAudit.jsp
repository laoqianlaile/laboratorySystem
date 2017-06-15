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

	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="module/css/traceability/traceabilityAudit.css">

	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script src="assets/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="assets/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script type="text/javascript" src="module/js/traceability/traceabilityAudit.js"></script>
</head>

<body>
	<div class="wrapper">
	<div style="height:70px">
			<span id="yearvalue" hidden><%=request.getParameter("year")%></span><span
				id="codevalue" hidden><%=request.getParameter("code")%></span>
	<!-- 		<div id="showdiv1" class="alert alert-danger tan"></div> -->
			<div id="font">
				<h3 style="text-align:center"><%=request.getParameter("year")%>年度检测/量值溯源建议</h3>
			</div>
			<p style="float:right;">编号:<label><%=request.getParameter("code") %></label></p>
		</div>
		<div id="searcherArea">
			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
	    			<label class="spanstyle">设备名称:</label>
	    			<input type="text" id="equipmentName" name="equipmentName" class="form-control text" aria-describedby="basic-addon1"> 
	    		</div>
	    		<div class="col-xs-4 col-md-4 col-lg-4">
	    			<label class="spanstyle">仪器编号:</label>
	    			<input type="text" id="equipmentCode" name="equipmentCode" class="form-control text" aria-describedby="basic-addon1">
	    		</div>
	    		<div class="col-xs-4 col-md-4 col-lg-4">
	    			<label class="spanstyle">审核状态:</label>
	    			<select id="auditState" name="auditState" class="form-control text"><option>全部</option>
						<option>未审核</option>
						<option>审核通过</option>
						<option>审核不通过</option>
					</select>
	    		</div>
			</div>
			<div class="row">
				<div class="col-xs-4 col-md-4 col-lg-4">
						<div class="timeLabelDiv">
							<label>时间:</label>
						</div>
		    			<div class="input-group date form_datetime timeChooseDiv">
							<input class="form-control" id="startTime" size="16"
								type="text" value="" readonly="true"> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-remove"></span></span> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-calendar"></span></span>
						</div>    		
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
						<div class="timeLabelDiv">
							<label>至:</label>
						</div>
		    			<div class="input-group date form_datetime timeChooseDiv">
							<input class="form-control" id="endtime" size="16"
								type="text" value="" readonly="true"> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-remove"></span></span> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-calendar"></span></span>
						</div>		
     			</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
	    			<label class="spanstyle">部门名称：</label>
					<select id="departmentName" class="form-control text"></select>				
				</div>
			</div>
			<div id="restcontent">
				<button type="button" id="search" class="btn btn-primary btncss" onclick="search()">搜索</button>
				<button type="button" id="pass" class="btn btn-primary OKbtn" onclick="pass()">&nbsp;通过</button>
				<button type="button" id="noPass" class="btn btn-primary NObtn" onclick="noPass()">&nbsp;不通过</button>
				<button type="button" id="noPass" class="btn btn-primary Allbtn" style="float:right;" onclick="allData()">&nbsp;全部数据</button>
			</div>
		</div>
		<hr />
		<div class="content" style="margin-top:30px">
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
	  	<script>
			$('.form_datetime').datetimepicker({
			    language: 'zh-CN',
			    weekStart: 1,
			    todayBtn: 1,
			    autoclose: 1,
			    todayHighlight: 1,
			    startView: 2,
			    minView: 2,
			    forceParse: 0,
			    format: 'yyyy-mm-dd'
			});
  	</script>
</body>
</html>
