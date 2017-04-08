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
	href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css"
	href="module/css/receiptlistManage/receiptlistReturn.css">
<link rel="stylesheet" type="text/css"
	href="module/css/commonSystem/commonSystem.css" />
<script src="assets/js/autoPage.js"></script>
<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/receiptlistManage/receiptlistReturn.js"></script>

</head>
<body>
	<div class="container" style="width: 100%;">
		<div class="headTitle">
			<label><sapn>退还样品交接单</sapn> <input id="receiptlistID"
				name="receiptlistID" class="" type="text" style="visibility:hidden"></label>

			<label> <span>交接单编号 : </span> <input
				id="show_receiptlistCode" name="receiptlistCode" class=""
				type="text" style="border:0px;" />
			</label>
			<hr class="headHr">
		</div>
		<!-- 交接单信息 -->
		<div class="header">
			<div class="row">
				<div class="col-xs-4">
					<label>合同编号 : </label> <input id="show_contractCode"
						name="contractCode" class="form-control" type="text" />
				</div>
				<div class="col-xs-4">
					<label>交接人 : </label> <input id="show_linkMan" name="linkMan"
						class="form-control" type="text" />
				</div>
				<div class="col-xs-4">
					<div class="timeLabelDiv">
						<label class="control-label">录入时间 :</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" id="show_createTime" size="16"
							type="text" value="" readonly="true"> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-8">
					<label>委托单位 : </label> <input id="show_companyName"
						name="companyName" class="form-control" size="20" type="text" />
				</div>
				<div class="col-xs-4">
					<label>联系电话 : </label> <input id="show_linkPhone" name="linkPhone"
						class="form-control" type="text" "/>
				</div>
			</div>
		</div>
		<hr class="headHr">

		<!-- 样品信息 -->
		<div class="sample">
			<div class="row Title">
				<label>样品信息</label>
				<button type="button" ;
				class="btn btn-primary"
					onclick="manualadd()" style="margin-right: 95px;">手动录入</button>
				<button type="button" ;
				class="btn btn-primary"
					onclick="automaticadd()">扫描录入</button>
				<hr class="headHr">
			</div>
			<table id="sampleTable" class="table">
			</table>
			<hr class="headHr">
		</div>

		<div class="footer">
			<div class="col-md-12 colum">
				<div style="float: right;">
					<button type="button" class="btn btn-primary" onclick="remove()">&nbsp;取消</button>
					<button type="button" onclick="sure()" class="btn btn-primary">&nbsp;确定</button>
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
						<h4 class="modal-title">查看:</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-xs-12 col-md-12">
								<h4>出厂编号:</h4>
								<input type="text" id="show_factoryCode" name="factoryCode"
									class="form-control" />
							</div>
							<div class="col-xs-12 col-md-12">
								<h4>名称:</h4>
								<input type="text" id="show_sampleName" name="sampleName"
									class="form-control" />
							</div>
							<div class="col-xs-12 col-md-12">
								<h4>型号/规格/代号:</h4>
								<input class="form-control" type="text" id="show_specifications"
									name="specifications">
							</div>
							<div class="col-xs-12 col-md-12">
								<h4>录入时间:</h4>
								<input type="text" id="show_createTimes" name="createTimes"
									class="form-control" />
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 编辑弹框 -->
		<div id="editModal" class="modal fade" role="dialog"
			aria-labelledby="gridSystemModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">编辑:</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-xs-12 col-md-12" style="display:none;;">
								<input type="text" id="edit_ID" name="ID" class="form-control" />
							</div>
							<div class="col-xs-12 col-md-12">
								<h4>出厂编号:</h4>
								<input type="text" id="edit_factoryCode" name="factoryCode"
									class="form-control" />
							</div>
							<div class="col-xs-12 col-md-12">
								<h4>名称:</h4>
								<input type="text" id="edit_sampleName" name="sampleName"
									class="form-control" />
							</div>
							<div class="col-xs-12 col-md-12">
								<h4>录入时间:</h4>
								<div class="input-group date form_datetime col-md-12">
									<input class="form-control" size="16" type="text" value=""
										id="edit_createTimes" name="createTimes" disabled> <span
										class="input-group-addon"><span
										class="glyphicon glyphicon-remove"></span></span> <span
										class="input-group-addon"><span
										class="glyphicon glyphicon-th"></span></span>
								</div>
							</div>
							<div class="col-xs-12 col-md-12">
								<h4>型号/规格/代号:</h4>
								<input class="form-control" type="text" id="edit_specifications"
									name="specifications" />
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" onclick="edit()">确定</button>
					</div>
				</div>
			</div>
		</div>

		<!--手动录入样品框 -->
		<div id="add" class="modal fade" role="dialog"
			aria-labelledby="gridSystemModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">录入样品:</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-xs-12 col-md-12">
								<h4>样品编号:</h4>
								<input type="text" id="add_sampleCode" name="sampleCode"
									class="form-control" />
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary"
							onclick="addSample()">确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>

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
