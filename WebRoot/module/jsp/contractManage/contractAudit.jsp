<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>合同审核</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/contractManage/contractManage.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
</head>
<body>
  
 	 <!-- 功能按钮 -->
	 <div class="content">
		<div class="searchArea">
			<div class="row">
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>合同编号:</label>
					<input type="text" id="schContractCode" name="schContractCode" class="form-control" aria-describedby="basic-addon1" placeholder="请输入合同编号查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label class="wide">乙方法定代表人(代理人):</label><input type="text" id="schEmployeeName" name="schEmployeeName" class="form-control narrow" aria-describedby="basic-addon1"  placeholder="请输入员工名查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<div class="timeLabelDiv">
						<label class="control-label">签订时间:</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" name="schStartTime" id="schStartTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择签订时间"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<div class="timeLabelDiv">
						<label class="control-label">至</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" name="schEndTime" id="schEndTime" size="16"
							type="text" value="" readonly="true" placeholder="请选择签订时间">
						<span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>甲方:</label><input type="text" id="schCompanyName" name="schCompanyName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入甲方公司名查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label class="wide">甲方法定代表人(代理人):</label><input type="text" id="schOppositeMen" name="schOppositeMen" class="form-control narrow" aria-describedby="basic-addon1" placeholder="请输入甲方代理人查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>联系电话:</label><input type="text" id="schLinkPhone" name="schLinkPhone" class="form-control" aria-describedby="basic-addon1" placeholder="请输入联系电话查找"/> 
		  		</div>
		  		<div class="col-xs-3 col-md-3 col-lg-3">
		   		 	<label>状态:</label>
		    		<select id="schState" name="schState" class="form-control" aria-describedby="basic-addon1">
		    			<option value="2">审核中</option>
		    			<option value="8">全部合同</option>
						<option value="1">未提交</option>
						<option value="3">驳回</option>
						<option value="4">审核通过</option>
						<option value="5">执行中</option>
						<option value="6">执行完成</option>
						<option value="7">异常终止</option>
					</select>
				</div>
			</div>
		</div>


		<div class="buttonGroup">
			<div>
  	 			<button type="button" onclick="searchContract()" class="btn btn-primary">查询</button>
  				&nbsp;<button type="button" onclick="showContractA()" class="btn btn-primary">审查</button>
  				&nbsp;<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary">刷新</button>
			</div>
		</div>
	</div>
  	
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/contractManage/contractManage.js"></script>
 </html>
