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
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
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
	.companyName{
	 	width:568px;
	 	display:none;
	 	border:1px solid #ccc;
	 	border-top:none;
	 	border-radius:3px;
	}
	.companyName ul {
		width:567px;
		height:30px;
		border:none;
		margin:0;
		margin-left:-40px;
	}
	.companyName ul li{
		width:567px;
		height:30px;
		line-height: 30px;
		list-style-type: none;
		text-indent: 12px;
	}
	.companyName ul li:hover{
		background-color:#dcdcdc;
	}
	.employeeName{
	 	width:568px;
	 	display:none;
	 	border:1px solid #ccc;
	 	border-top:none;
	 	border-radius:3px;
	}
	.employeeName ul {
		width:567px;
		height:30px;
		border:none;
		margin:0;
		margin-left:-40px;
	}
	.employeeName ul li{
		width:567px;
		height:30px;
		line-height: 30px;
		list-style-type: none;
		text-indent: 12px;
	}
	.employeeName ul li:hover{
		background-color:#dcdcdc;
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
		    	<option value="8">全部合同</option>
				<option value="1">未提交</option>
				<option value="2">审核中</option>
				<option value="3">驳回</option>
				<option value="4">审核通过</option>
				<option value="5">执行中</option>
				<option value="6">执行完成</option>
				<option value="7">异常终止</option>
			</select>
		</div>
	</div>
  	 <div class="input-group" style="float: right;margin-bottom: 10px;">
  	 	<button type="button" onclick="searchContract()" class="btn btn-primary glyphicon glyphicon-search">&nbsp;查询</button>
  		<button type="button" class="btn btn-primary glyphicon glyphicon-plus" data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
  		<button type="button" onclick="showContractM()" class="btn btn-primary glyphicon glyphicon-show">&nbsp;查看</button>
  		<button type="button" onclick="EditContract()" class="btn btn-primary glyphicon glyphicon-edit">&nbsp;修改</button>
  		<button id="del" onclick="delData()" type="button" class="btn btn-primary glyphicon glyphicon-remove">&nbsp;删除</button>
  		<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
  		</div> 
  		
  	<!-- 新增弹框 -->
  	<div id="addModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="adDcontent" class="row">
	      		<div class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">合同名称：</label>
                   <input type="text" id="add_contractName" name="contractName" class="form-control" required="required"/>
               </div>
               <div class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">签订单位：</label>
                   <input type="text" id="add_companyName" name="add_companyName" class="form-control"/>
		       </div>
		       <div id="add_Address1" class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">签订单位地址：</label>
                   <input type="text" id="add_Address" name="Address" class="form-control"/>
               </div>
               <div id="add_Address2" class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">签约地点：</label>
                   <input type="text" id="add_signAddress" name="signAddress" class="form-control"/>
               </div>
               <div id="add_LinkMen" class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">甲方法定代表人或代理人：</label>
                   <input type="text" id="add_oppositeMen" name="oppositeMen" class="form-control"/>
               </div>
               <div id="add_Phone"" class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">联系电话：</label>
                   <input type="text" id="add_linkPhone" name="linkPhone" class="form-control" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
               </div>
               <div class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">乙方法定代表人或代理人：</label>
                   <input type="text" id="add_employeeName" name="add_employeeName" oninput="addGetEName()" onpropertychange="addGetEName()"  class="form-control" required="required"/>
                   <div class="employeeName">
	                   
                   </div>
               </div>
               <div class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">签订时间:</label>
					<div class="input-group date form_datetime">
		   				<input id="add_signTime" class="form-control" id="acceptSampleTime_start" size="16" type="text" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
               </div>
               <div class="col-xs-12 col-md-12">
               <label class="control-label" style="margin:8px 0 0 0;">履行起始时间:</label>
					<div class="input-group date form_datetime">
		   				<input id="add_startTime" class="form-control" id="acceptSampleTime_start" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
               </div>
               <div class="col-xs-12 col-md-12">
                   <label class="control-label" style="margin:8px 0 0 0;">履行结束时间:</label>
					<div class="input-group date form_datetime">
		   				<input id="add_endTime" class="form-control" id="acceptSampleTime_start" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
               </div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="add()">新增</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>
  	
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/contractManage/contractManage.js"></script>
 <script type="text/javascript">
	$('.form_datetime').datetimepicker({
	    language: 'zh-CN',
	    weekStart: 1,
	    todayBtn: 1,
	    autoclose: 1,
	    todayHighlight: 1,
	    startView: 2,
	    minView: 2,
	    forceParse: 0,
	    format: 'yyyy.mm.dd'
	});
	</script>
 </html>
