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

<title>查看交接单</title>

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
	href="module/css/receiptlistManage/receiptlistView.css">
<link rel="stylesheet" type="text/css"
	href="module/css/commonSystem/commonSystem.css" />
	
<script src="assets/js/autoPage.js"></script>
<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>


</head>

<body>
	<div class="container" style="width: 100%;">
		<div class="headTitel">
			<label>查看交接单</label> <label><span>交接单编号：</span> <input
				id="show_receiptlistCode" name="receiptlistCode"
				class="form-control" type="text" readonly style="border:0px;" /></label>
			<hr class="headHr">
		</div>
		<div class="header">
			<div class="row">
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>合同编号：</label> <input name="contractCode"
						id="show_contractCode" class="form-control" type="text" readonly
						style="border:0px;">
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>委托人：</label> <input id="show_linkMan" name="linkMan"
						class="form-control" type="text" readonly style="border:0px;" />
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>委托时间：</label> <input id="show_createTime" name="createTime"
						class="form-control" type="text" readonly style="border:0px;" />
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>完成时间：</label> <input id="show_completeTime"
						name="completeTime" class="form-control" type="text" readonly
						style="border:0px;" />
				</div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-md-6 col-lg-6">
					<label>委托单位：</label> <input id="show_companyName"
						name="companyName" class="form-control" type="text" readonly
						style="border:0px;" />
				</div>

				<div class="col-xs-3 col-md-3 col-lg-3"></div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>联系电话：</label> <input id="show_linkPhone" name="linkPhone"
						class="form-control" type="text" readonly style="border:0px;" />
				</div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-md-6 col-lg-6">
					<label>通讯地址：</label> <input id="show_address" name="address"
						class="form-control" type="text" readonly style="border:0px;" />
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3"></div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</label> <input
						id="show_classifiedLevel" name="classifiedLevel"
						class="form-control" type="text" readonly style="border:0px;" />
				</div>
			</div>
			<div class="row ">
				<div class="col-md-12 colum">
					<label>依据的技术文件 （代号、名称）及客户要求： </label>
					<textarea id="show_accordingDoc" name="accordingDoc"
						class="form-control" type="text" rows="6" readonly
						style="border:0px;"></textarea>
				</div>
			</div>
			<hr class="headHr">

			<div class="main">
				<div class="sampleTable">
					<div class=" row mainTitel">
						<label>样品信息</label>
						<hr class="headHr">
					</div>
					<table id="sampleTable">
					</table>
					<hr class="headHr">
				</div>
				<div class="filetable">
					<div class="row secondTitel">
						<label>其他文件</label>
						<hr class="headHr">
					</div>
					<table id="fileTable">
					</table>
					<hr class="headHr">

				</div>
			</div>
		</div>
		
		<div class="footer">
			<div class="col-md-12 colum">
				<div style="float: right;">
					<button type="button" onclick="sure()" class="btn btn-primary">&nbsp;确定</button>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="module/js/receiptlistManage/receiptlistView.js"></script>
</html>
