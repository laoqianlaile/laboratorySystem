
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

<title>流水账目</title>

<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap.min.css">
<link rel="stylesheey" type="text/css"
	href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-datetimepicker.css">


<script type="text/javascript" src="module/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="module/js/bootstrap.min.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript"
	src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script type="text/javascript"
	src="module/js/bootstrap-datetimepicker.js"></script>
<script type="text/javascript"
	src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>

<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<script src="module/js/sweetalert.min.js"></script>
</head>
<style>
.col-md-4 {
	padding: 0px;
}

.col-md-12 .col-md-4 input {
	width: 230px;
	display: inline-block;
}

.col-md-12 .col-md-4 select {
	width: 230px;
	display: inline-block;
}

.col-md-12 .col-md-4 span {
	padding: 9px 12px;
	font-size: 14px;
	font-weight: normal;
	line-height: 1;
	color: #555;
	text-align: center;
	background-color: #eee;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.col-md-4 label {
	margin-top: 8px;
}

.col-md-4 span {
	
}

.col-md-4 .date_left {
	float: left;
}

.querySideleft {
	float: left;
}

.col-md-6 input {
	width: 200px;
	display: inline-block;
}

.col-md-6  select {
	width: 200px;
	display: inline-block;
}

#addChooseModal .modal-body button {
	width: 200px;
	height: 150px;
	border-radius: 40px;
}

#menu {
	background-color: rgb(232, 243, 249);
	padding-top: 20px;
	padding-bottom: 20px;
	width: 101%;
}

#menu button {
	margin-right: 2%;
}

#menu button:hover {
	border: none;
	color: #fff;
	background-color: rgb(255, 173, 51);
}
</style>
<body>
	<div class="container" style="width:100%;">
		<div class="row">
			<div class="col-md-12  row">
				<div class="col-md-4 ">
					<label>发票编号：</label> <input type="text" id="query_invoice"
						name="invoice" class="form-control" />
				</div>
				<div class="col-md-4 ">
					<label>发票状态：</label> <select id="query_state" name="state"
						class="form-control">
						<option value="0" class="form-control">支出</option>
						<option value="1" class="form-control">收入</option>
					</select>
				</div>

			</div>
			<div class="col-md-12 row">
				<div class="col-md-4 input-group date form_datetime"
					style="float:left;">
					<label class="date_left" style="padding-right: 3px;">录入日期：
					</label>
					<div class="date_left">
						<input class="form-control" id="checkTime1" name="checkTime1"
							type="text" readonly style="width:150px;"> <span
							class="input-group-addon"> <i
							class="glyphicon glyphicon-remove"></i>
						</span> <span class="input-group-addon"> <i
							class="glyphicon glyphicon-calendar"></i>
						</span>
					</div>
				</div>
				<div class="col-md-4 input-group date form_datetime"
					style="float:left;">
					<label class="date_left" style="padding-right: 47px;">至： </label>
					<div class="date_left">
						<input class="form-control" type="text" id="checkTime2"
							name="checkTime2" value="" readonly style="width:150px;">
						<span class="input-group-addon"> <i
							class="glyphicon glyphicon-remove"></i>
						</span> <span class="input-group-addon"> <i
							class="glyphicon glyphicon-calendar"></i>
						</span>
					</div>
				</div>
			</div>
			<div id="menu" class="col-md-12 row">
				<div>
					<button class="btn btn-warning" type=" button" onclick="backstep()">
						<em class="glyphicon glyphicon-arrow-left"></em> 返回
					</button>
					<button class="btn btn-primary " type=" button" onclick="query()">
						查询</button>
					<button class="btn btn-primary " type=" button"
						onclick="openChooseModal()">新增</button>
					<button class="btn btn-primary" type="button">导入</button>

					<button class="btn btn-primary" type="button">导出</button>
					<button class="btn btn-primary type=" button" id="refresh"
						onclick="reSetRefresh()">刷新</button>

				</div>
			</div>
			<table id="table"
				class="table table-hover table-striped table-bordered">
			</table>
		</div>
	</div>
	<!-- 获取当前操作人的ID -->
	<input type="hidden" id="employeeID" name="employeeID"
		value="<%=session.getAttribute("EMPLOYEEID")%>" />
	<!-- 新增选择弹窗 -->
	<div id="addChooseModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增</h4>
				</div>
				<div class="modal-body" style="text-align: center;">
					<div id="IncomeorPayment">
						<input type="radio" name="isIncomeorPayment" value="0">收入
						<input type="radio" name="isIncomeorPayment" value="1">支出
					</div>
					<!-- 
					<button type="button" class="btn btn-info" onclick="addIncome()">收入</button>
					<button type="button" class="btn btn btn-warning" onclick="addPayMent()">支出</button>
					 -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary"
						onclick="addIncomeorPayment()">确认</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 新增弹窗 -->
	<div id="addModal" class="modal fade">
		<div class="modal-dialog">
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
						<div class="col-xs-6 col-md-6">
							<label>合同编码：</label> <input type="text" id="add_contractCode"
								name="contractCode" disabled="disabled" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>合同名称：</label> <input type="text" id="add_contractName"
								name="contractName" disabled="disabled" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>发票编码：</label> <input type="text" id="add_invoice"
								name="invoice" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>金额： </label> <input type="text" id="add_money"
								name="money" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div id="displayFineItem" class="col-xs-6 col-md-6">
							<label>合同细项：</label> <select id="add_contractFineItem"
								name="contractFineItem" class="form-control">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>备注： </label> <input type="text" id="add_remarks"
								name="remarks" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary"
						onclick="addJouranlAccounts()">确认</button>
				</div>
			</div>
		</div>
	</div>
	<!--编辑弹窗 -->
	<div id="editModal" class="modal fade"">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增</h4>
				</div>
				<div class="modal-body">
					<input type="hidden" id="jouranlAccountID" name="jouranlAccountID"/ >
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>合同编码：</label> <input type="text" id="edit_contractCode"
								name="contractCode" disabled="disabled" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>合同名称：</label> <input type="text" id="edit_contractName"
								name="contractName" disabled="disabled" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>发票编码：</label> <input type="text" id="edit_invoice"
								name="invoice" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>金额： </label> <input type="text" id="edit_money"
								name="money" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label><input name="edit_isIncome" type="radio" value="0" />收入
							</label> <label><input name="edit_isIncome" type="radio"
								value="1" />支出 </label>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>备注： </label> <input type="text" id="edit_remarks"
								name="remarks" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary"
						onclick="editJouranlAccounts()">确认</button>
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
<script type="text/javascript"
	src="module/js/accountsManage/jouranlAccounts.js"></script>
</html>
