<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>查看详情</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	
	<link rel="stylesheet" href="module/css/changeACE.css" />
	
	<style>
		#form {
			width:1250px;
			height:110px;
			float:left;
		}
		.item {
			width:25%;
			height:50%;
			float:left;
		}
		.item>input{
			display: inline-block;
			width:60%;
		}
		.date-control div{
			folat:left;
			width:60%;
		}
		.date-control .date >span{
			height:34px;
		}
		.date-control > label {
			float:left;
			margin-right:5px;
		}
		.item select{
			display: inline-block;
			width:40%;
			margin-left:10%;
		}
		#search {
			float:left;
		}
	</style>
	 
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="module/js/commonTool.js"></script>
   
  </head>
  
  <body>
	<!-- <div id="form">
		<div class="item">
			<label class="control-label">合同编号:</label>
	  		<input class="form-control" id="contractCode">
  		</div>
		<div class="item">
			<label class="control-label">交接单号:</label>
	  		<input class="form-control" id="receiptlistCode">
  		</div>
  		<div class="item">
			<label class="control-label">委托单位:</label>
	  		<input class="form-control" id="companyName">
  		</div>
  		<div class="item date-control">
			<label class="control-label" style="margin:8px 0 0 0;">委托时间:</label>
			<div class="input-group date form_datetime">
   				<input class="form-control" id="acceptSampleTime_start" size="16" type="text" value="" readonly>
    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
			</div>
		</div>
  		<div class="item date-control">
			<label class="control-label" style="margin:8px 50px 0 0;">至</label>
	  		<div class="input-group date form_datetime">
   				<input class="form-control" id="acceptSampleTime_end" size="16" type="text" value="" readonly>
    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
				<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
			</div>
  		</div>
  		<div class="item">	
			<label class="control-label">样品名称</label>
	  		<input class="form-control" id="sampleName">
  		</div>
	</div>
	<button type="button" id="search" class="btn btn-primary">查询</button>
	<button type="button" id="return" class="btn btn-primary">返回</button> -->
	
	<div class="container" style="width:100%">
  		<div class="row">
			<div class="col-xs-2 col-md-2 col-lg-2">
				<label class="control-label">合同编号:</label>
				<input class="form-control" id="contractCode">
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<label class="control-label">交接单号:</label>
				<input class="form-control input-group" id="receiptlistCode">
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<label class="control-label">委托单位:</label>
				<input class="form-control" id="companyName">
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4"></div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" id="search" class="btn btn-primary">查询</button>
			</div>
			<div class="col-xs-1 col-md-1 col-lg-1">
				<button type="button" id="return" class="btn btn-primary">返回</button>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-2 col-md-2 col-lg-2">
				<label class="control-label" style="margin:8px 0 0 0;">委托时间:</label>
				<div class="input-group date form_datetime">
   					<input class="form-control" id="acceptSampleTime_start" size="16" type="text" value="" readonly>
    				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<label class="control-label" style="margin:8px 50px 0 0;">至</label>
	  			<div class="input-group date form_datetime">
	   				<input class="form-control" id="acceptSampleTime_end" size="16" type="text" value="" readonly>
	    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
			<div class="col-xs-2 col-md-2 col-lg-2">
				<label class="control-label">样品名称</label>
	  			<input class="form-control" id="sampleName">
			</div>
		</div>
	</div>
	<br/>
	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  
  <script src="module/js/taskStatistical/taskStatisticalDetail.js"></script>
  
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
	    format: 'yyyy-mm-dd'
	});
	</script>
</html>
