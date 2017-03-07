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

<title>模板审核 </title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">


<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
 <link rel="stylesheet" href="module/css/changeACE.css" />
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
.bs-checkbox {
	width: 5%;
}
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
label{
	float:left;
}
.col-md-2 {
    width: 23%;
    }
  .col-md-3{
   width: 20%;
  }
</style>

<body>
	<div class="container" style="width: 100%;">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<div class="row clearfix">
					<div class="col-md-12 column">
						<div class="row clearfix">
							<div class="col-md-3 column" style="margin-top:8px;">
								<label>模板名称&nbsp;： </label>
								<input id="query_STANDARDCODE" name="STANDARDCODE"
									class="form-control" type="text"
									style="display: inline; width:57%;">
							</div>
							<input type= "hidden" id = "verifyMan" value = "<%=session.getAttribute("EmployeeID")  %>" />
							<div class="input-group date form_datetime col-md-2 column "
								style="margin-top:8px;">
								<label>上传时间： </label> <input class="form-control" size="10" type="text" id="uPLOADTIME1" value="" readonly
									style="display: inline; width:55%;">
									<span class="input-group-addon"><i class="glyphicon glyphicon-remove"></i></span>
									<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
							</div>
							<div class="input-group date form_datetime col-md-2 column "
								style="margin-top: 8px;">
								<label style="">至:</label> <input
									class="form-control" size="20" type="text" id="uPLOADTIME2" value="" readonly
									style="display: inline; width:65%;"> <span
									class="input-group-addon"><i
									class="glyphicon glyphicon-remove"></i></span> <span
									class="input-group-addon"><i
									class="glyphicon glyphicon-calendar"></i></span>
							</div>
							<div class="col-md-3 column" style="margin-top:12px;">
								<label>状态&nbsp;： </label>
								<select id="state">
								<option ></option>
								<option value="0">待审核</option>
								<option value="1">通过</option>
								<option value="3">驳回</option>
							</select>
							</div>
						</div>
						<div class="row clearfix">

							<div class="col-md-3.5 column">
								<div style="float: right;">
									<button id="query" onclick="find()"
										class="btn btn-primary" type="button">
										<em class="glyphicon glyphicon-search"></em> 查询
									</button>

									

									<button class="btn btn-primary" button" id="look"
										onclick="lookfile()">
										<em class="glyphicon glyphicon-search"></em> 查看模板
									</button>
									
									<!-- <button class="btn btn-success type=" button" id="pass"
										onclick="">
										<em class="glyphicon glyphicon-ok"></em> 通过
									</button>
									
									<button class="btn btn-warning type=" button" id="NOPass"
										onclick="">
										<em class="glyphicon glyphicon-trash"></em> 作废
									</button> -->
									
									

									<button class="btn btn-primary" button" id="refresh"
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

	<!-- 作废弹框 -->
	<div id="NoPassModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">驳回审核意见</h4>
				</div>
			
				
							<div style="margin-top:20px">
								<label>描述:</label>
								<textarea rows="6" cols="40" id="Nopasstemplate"></textarea>
								<input id="ID" type="hidden"></input>
							</div>
							
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure" onclick="NoPass()">确定</button>
				</div>
						</div>
					</div>
	</div>
	<!-- 通过弹框 -->
	<div id="PassModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">通过审核意见</h4>
				</div>
			
				
							<div style="margin-top:20px">
								<label>描述:</label>
								<textarea rows="6" cols="40" id="Passtemplate"></textarea>
								<input id="ID" type="hidden"></input>
							</div>
							
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure" onclick="Pass()">确定</button>
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

<script src="module/js/templateReview/templateReview.js"></script>
</html>
