
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
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-select.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-select.min.css">

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

<!-- 提示弹框 -->
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

#editDraw option,#addDraw option {
	width: 200px;
	margin: 0xp;
	padding: 0px;
	z-index: 100;
}

#editDraw div,#addDraw div {
	position: relative;
	width: 200px;
	margin: 0px;
	padding: 0px;
	border: 0px;
	z-index: 100;
}

option.form-control:hover {
	background-color: #ccc;
	color: #6fb3e0;
}

#editDraw ul:hover,#addDraw ul:hover {
	color: red;
}

#menu {
	height: 50px;
	line-height: 50px;
	background-color: rgb(232, 243, 249);
	margin-bottom: 30px;
}

#menu button {
	margin-left: 26px;
}

#menu button:hover {
	border: none;
	color: #fff;
	background-color: rgb(255, 173, 51);
}

#addModal .row .form-control {
	display: initial;
	width: 80%;
}

#addModal .row .labelName {
	margin: 2%;
	text-align: center;
}

#editModal .row .form-control {
	display: initial;
	width: 80%;
}

#editModal .row .labelName {
	margin: 2%;
	text-align: center;
}

.DrawData {
	margin-left: 17.65%;
	position: absolute;
	width: 74%;
	height: auto;
	max-height: 120px;
	display: none;
	border: 1px solid #ccc;
	border-top: none;
	border-radius: 3px;
	background-color: #fff;
	z-index: 10;
	overflow-x: hidden;
	overflow-y: hidden;
}

.DrawData ul {
	border: none;
	max-height: 120px;
	overflow-y: auto;
	margin: 0;
	margin-left: -40px;
}

.DrawData ul li {
	height: 30px;
	line-height: 30px;
	list-style-type: none;
	text-indent: 12px;
	background-color: #fff;
}

.DrawData ul li.noDate {
	color: red;
}

.DrawData ul li:hover {
	background-color: #dcdcdc;
}
</style>
<body>
	<div class="container" style="width:100%;">
		<div id="menu" class="col-md-12 row">
			<div>
				<button class="btn btn-primary type=" button" id="refresh"
					onclick="openAddModal()">
					<em class="glyphicon glyphicon-plus"></em> 新增详细
				</button>
				<button class="btn btn-primary type=" button" id="refresh"
					onclick="refresh()">
					<em class="glyphicon glyphicon-refresh"></em> 刷新
				</button>
				<button class="btn btn-warning" type=" button" onclick="backstep()">
					<em class="glyphicon glyphicon-arrow-left"></em> 返回
				</button>
			</div>
		</div>
		<table id="table" >
		</table>
	</div>
	<!-- 获取当前操作人的ID -->
	<input type="hidden" id="employeeID" name="employeeID"
		value="<%=session.getAttribute("EMPLOYEEID")%>" />
	<!-- 新增弹窗 -->
	<div id="addModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增支付详情</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<label class="labelName">委托单位</label> <input type="text"
								id="add_companyName" name="companyName" disabled="disabled"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">发票编号</label> <input type="text"
								id="add_invoice" name="invoice" disabled="disabled"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">交接单号</label> <select
								id="add_receiptlistID" name="receiptlistCode"
								class="form-control"></select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">支付金额</label> <input type="text"
								id="add_payMoney" name="payMoney" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">领取人 </label> <input type="hidden"
								id="add_drawID" name="add_drawID"> <input type="text"
								id="add_drawName" name="add_drawName" class="form-control"
								aria-describedby="basic-addon1" oninput="matchEmployee('add')"
								onpropertychange="matchEmployee('add')" />
							<div id="addDraw" class="DrawData"></div>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName" style="position: relative;bottom: 25px;">
								备注 </label>
							<textarea type="text" id="add_remarks" name="remarks"
								class="form-control" aria-describedby="basic-addon1"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary"
						onclick="addPaymentDetail()">确认</button>
				</div>
			</div>
		</div>
	</div>
	<!--编辑弹窗 -->
	<div id="editModal" class="modal fade"">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">编辑支付详细</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<input type="hidden" id="payMentDetailID"> <input
							type="hidden" id="receiptlistID">
						<div class="col-xs-12 col-md-12">
							<label class="labelName">委托单位</label> <input type="text"
								id="edit_companyName" name="companyName" disabled="disabled"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">发票编号</label> <input type="text"
								id="edit_invoice" name="invoice" disabled="disabled"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">交接单号</label> <select
								id="edit_receiptlistCode" name="receiptlistCode"
								class="form-control"></select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">支付金额</label> <input type="text"
								id="edit_payMoney" name="payMoney" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName">领取人 </label> <input type="hidden"
								id="edit_drawID" name="edit_drawID"> <input type="text"
								id="edit_drawName" name="edit_drawName" class="form-control"
								aria-describedby="basic-addon1" oninput="matchEmployee('edit')"
								onpropertychange="matchEmployee('edit')" />
							<div id="editDraw" class="DrawData" style="position: fixed;">
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<label class="labelName" style="position: relative;bottom: 25px;">
								备注 </label>
							<textarea type="text" id="edit_remarks" name="remarks"
								class="form-control" aria-describedby="basic-addon1"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary"
						onclick="editPaymentDetail()">确认</button>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript"
	src="module/js/accountsManage/paymentDetail.js"></script>
</html>
