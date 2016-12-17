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
    
    <title>审核人员比对计划</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="module/css/personContrast/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" href="module/css/changeACE.css" />
	<link rel="stylesheet" href="module/css/personContrast/PersonContrast.css" />
	<link rel="stylesheet" href="module/css/personContrast/auditcontrast.css" />
	 
	<script src="assets/js/jquery-3.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="module/js/personContrast/personContrastAudit.js"></script>
    
  </head>
  
  <body>
  
  <div id="showdiv1" class="alert alert-danger tan"></div>
    <!-- 搜索框2-->  
  <div class="searchbox2">
	  <form class="form-horizontal" role="form">
		  <div class="form-group">
			  <span class="col-sm-2 control-label" for="projectCode">比对项目编号</span>
			  <div class="col-sm-2">
			  <input type="text" class="form-control" id="projectCode" placeholder="">
			  </div>
			  <span  class="col-sm-1 control-label">是否通过</span>
			  <div class="col-sm-1">
			    <button  style="margin-left:0px;" type="button" class="btn dropdown-toggle" id="result" data-toggle="dropdown">
			    <span id="pass1"></span>
			     <span class="caret"></span>
			    </button>
			    <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
				    <li onclick="changgedata(3)" role="presentation">...</li>
				    <li onclick="changgedata(1)" role="presentation">通过</li>
	                <li onclick="changgedata(2)" role="presentation">不通过</li>
			    </ul>	
			  </div>	 
			  <button type="button" id="" class="btn btn-info" onclick="refresh()">查询</button>
		  </div>
		  
		  <div class="form-group">
		   <span class="col-sm-2 control-label">计划执行时间</span>
			  <div class="col-sm-2">
			      <input class="form_datetime form-control" type="text" id="startTime">
			  </div>
		  
		  <span class="col-sm-1 control-label">比对科室</span>
			  <div class="col-sm-2">
			    <button type="button" class="btn dropdown-toggle" id="" data-toggle="dropdown">
			    <span id="departmentID"></span>
			        <span id="caret"></span>
			    </button>
			    <ul id="list2" class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
			    </ul>
			  </div>
	     </div>
	  </form>
  </div>
    <!-- 表格2-->
    <div class="tablebox">
    <button type="button" class="btn btn-info " onclick="pass()">通过</button>
    <button type="button" class="btn btn-info " onclick="showModal()">不通过</button>
  	<table id="table">
  	</table></div>
  	
  	<!-- 不通过原因弹窗-->
  	<div id="showModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
		  	<div class="reason">
			  	<h3 class="tittle">不通过原因:</h3>
			  	<div class="center">
				  <div class="form-group">
				    <label for="name">原因</label>
				    <textarea id="reason" class="form-control" rows="3"></textarea>
				  </div>				
			  	</div>
			  	<button type="button" class="btn"  onclick="unpass()">确定</button>
			  	<button type="button" class="btn" id="disapper" onclick="disapper()">取消</button>
		  	</div>
  	    </div>
  	  </div>
    </div>
  	
  </body>
</html>
