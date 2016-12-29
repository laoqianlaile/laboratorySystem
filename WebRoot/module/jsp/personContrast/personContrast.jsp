<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String qualiyPlanId = request.getParameter("qualiyPlanId");
if(qualiyPlanId!=null&&qualiyPlanId!="")
	session.setAttribute("qualiyPlanId",qualiyPlanId);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>人员比对计划建议制定</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="module/css/personContrast/bootstrap.min.css">
	<link rel="stylesheet" href="module/css/personContrast/bootstrapValidator.min.css" type="text/css"/>
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" href="module/css/changeACE.css" />
	<link rel="stylesheet" href="module/css/personContrast/PersonContrast.css" />
	 
	<script src="assets/js/jquery-1.8.3.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="module/js/personContrast/bootstrapValidator.min.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="module/js/personContrast/personContrast.js"></script>
    
 
  
  </head>
  
  <body>
  <div class="main">
	  <span id="yearvalue" class="hiddenspan"><%=request.getParameter("year") %></span>
	  <span id="codevalue" class="hiddenspan"><%=request.getParameter("code") %></span>
  		<div id="font">
  			<%=request.getParameter("year") %>人员比对建议
  		</div>
  		
  
	    <!-- 搜索框2-->  
	    <div id="head">
	      <p id="Serialnumber">编号:<label><%=request.getParameter("code") %></label></p>
		  <div class="searchbox2">
			  <form class="form-horizontal" role="form">
				  <div class="form-group">
				  
					  <span class="col-sm-1 control-label" for="projectCode">比对项目编号</span>
					  <div class="col-sm-2">
					  <input type="text" class="form-control" id="projectCode" placeholder="">
					  </div>
					  
					  <span class="col-sm-1 control-label" for="projectName">比对项目</span>
					  <div class="col-sm-2">
					  <input type="text" class="form-control" id="projectName" placeholder="">
					  </div>
					   <span class="col-sm-1 control-label">比对人员</span>
					  <div class="col-sm-2">
					     <input type="text" class="form-control" id="employeeID1" placeholder="">
					  </div>
					  <button type="button" id="" class="btn btn-info " onclick="query()">查询</button>
				  </div>
				  
				  <div class="form-group">  
					 
					  <span class="col-sm-1 control-label">测试装置</span>
					  <div class="col-sm-2">
					      <input type="text" class="form-control" id="testDevice" placeholder="">
					  </div>  
					  <span class="col-sm-1 control-label">待比对人员</span>
					  <div class="col-sm-2">
					     <input type="text" class="form-control" id="employeeID2" placeholder="">
					  </div>
					  <span class="col-sm-1 control-label">执行时间</span>
					  <div class="col-sm-2">
					      <input class="form_datetime form-control " type="text" id="startTime">
					  </div>
					  <span class="to">至</span>
					  <div class="col-sm-2">
					     <input class="form_datetime form-control " type="text" id="endTime">
					  </div>
				  </div>
				  
			  </form>
		  </div>
  
		    <!-- 表格2-->
		    <div class="tablebox">
		    <button type="button" class="btn btn-info " onclick="addrow(this)">新增</button>
		    <button type="button" class="btn btn-info " onclick="deletelist(this)">删除</button>
		    <button type="button" class="btn btn-info " onclick="updataPersonContrast(this)">修改</button>
		    <button type="button" class="btn btn-info disappear"  id="disappear" onclick="addpersonconTrast()">提交</button>
		    <button type="button" class="btn btn-info"  onclick="refreshAll()">刷新全部</button>		  	
		  	<table id="table"></table>  	
		  	</div>

	  	</div>
  	</div>
  </body>
</html>
