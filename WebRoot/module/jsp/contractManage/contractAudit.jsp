<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>合同管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" href="module/css/changeACE.css" />
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
    <style type="text/css">
	.list-searcher {
		min-width: 300px;
		height: 40px;
	}
	.list-searcher input {
		display: inline-block;
		margin-right: 20px;
		width: 200px;
	}
	
	.list-searcher span {
		display: inline-block;
		
	}
	.list-searcher select {
		width:110px;
		display: inline-block;
	}
	.backgray{
	  background: gray;
	}
	.fixed-table-container .bs-checkbox {
	    text-align: center;
	    vertical-align: middle;
	}
	#searcherArea{
	 min-width: 1300px;
	}
	.bootstrap-table{
	 min-width: 1500px;
	}
	</style>
</head>
<body>
  
 	 <!-- 功能按钮 -->
	 <div id="searcherArea">
		<div class="list-searcher">
			<span>合同编号：</span><input type="text" id="schContractCode" name="schContractCode" class="form-control">
			<span>乙方法定代表人/代理人：</span><input type="text" id="schEmployeeName" name="schEmployeeName" class="form-control" >
			<span>签订时间：</span><input type="date" id="schStartTime" name="schStartTime" class="form-control" > 
			<span>至</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="date" id="schEndTime" name="schEndTime" class="form-control" >
		</div>
		<div class="list-searcher">
			<span>签约单位：</span><input type="text" id="schCompanyName" name="schCompanyName" class="form-control" >
			<span>甲方法定代表人/代理人：</span><input type="text" id="schOppositeMen" name="schOppositeMen" class="form-control" >
			<span>联系电话：</span><input type="text" id="schLinkPhone" name="schLinkPhone" class="form-control" > 
		    <span>状态：</span>
		    <select id="schState" name="schState" class="form-control" >
				<option value="2">审核中</option>
				<option value="1">未提交</option>
				<option value="3">驳回</option>
				<option value="4">审核通过</option>
				<option value="5">执行中</option>
				<option value="6">执行完成</option>
				<option value="7">异常终止</option>
				<option value="8">全部合同</option>
			</select>
		</div>
	</div>
	
  	 <div class="input-group" style="float: right;margin-bottom: 10px;">
  	 	<button type="button" onclick="searchContract()" class="btn btn-primary glyphicon glyphicon-search">&nbsp;查询</button>
  		<button type="button" onclick="showContractA()" class="btn btn-primary glyphicon glyphicon-show">&nbsp;审查</button>
  		<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
  	</div> 
  	
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/contractManage/contractManage.js"></script>
  <script src="module/js/contractManage/contractAudit.js"></script>
 </html>
