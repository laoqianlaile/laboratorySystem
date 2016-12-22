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
  <div class="main">
      <span id="yearvalue" class="hiddenspan"><%=request.getParameter("year") %></span>
	  <span id="codevalue" class="hiddenspan"><%=request.getParameter("code") %></span>
  		<div id="font">
  			<%=request.getParameter("year") %>人员比对审核
  		</div>
        <div id="showdiv1" class="alert alert-danger tan"></div>
        
         <div id="head">
	      <p id="Serialnumber">编号:<label><%=request.getParameter("code") %></label></p>
		    <!-- 搜索框2-->  
		  <div class="searchbox2">
			  <form class="form-horizontal" role="form">
				  <div class="form-group">
					  <span class="col-sm-2 control-label" for="projectCode">比对项目编号</span>
					  <div class="col-sm-2">
					  <input type="text" class="form-control" id="projectCode" placeholder="">
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
				  
				  <div class="form-group">
				   <span class="col-sm-2 control-label">比对科室</span>
					  <div class="col-sm-2">
					    <button type="button" class="btn dropdown-toggle" id="" data-toggle="dropdown">
					    <span id="departmentID"></span>
					        <span id="caret"></span>
					    </button>
					    <ul id="list2" class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
					    </ul>
					  </div>
				    <span  class="col-sm-1 control-label">是否通过</span>
					  <div class="col-sm-1">
					    <button  style="margin-left:0px;" type="button" class="btn dropdown-toggle" id="result" data-toggle="dropdown">
					    <span id="pass1"></span>
					     <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu pull-right" id="list1" role="menu" aria-labelledby="dropdownMenu1">
						    <li onclick="changgedata(3)" role="presentation">&nbsp;&nbsp;</li>
						    <li onclick="changgedata(0)" role="presentation">未审核</li>
						    <li onclick="changgedata(1)" role="presentation">通过</li>
			                <li onclick="changgedata(2)" role="presentation">不通过</li>
					    </ul>	
					  </div>
					  <div class="col-sm-3 location"> 
					  <button type="button" id="" class="btn btn-info" onclick="refresh()">查询</button>
					  </div>	
				  
				  
				   			 
			     </div>
			  </form>
		  </div>
		  </div>
	    <!-- 表格2-->
	    <div class="tablebox">
	    <button type="button" class="btn btn-info " onclick="pass()">通过</button>
	    <button type="button" class="btn btn-info " onclick="showModal()">不通过</button>
	    <button type="button" class="btn btn-info"  onclick="refreshAll()">刷新全部</button>	
	  	<table id="table">
	  	</table></div>
	  	
	  	<!-- 不通过原因弹窗-->
	  	<div id="showModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
		  <div class="modal-dialog" role="document">
		    	<div class="modal-content">
				<div class="modal-header">
				<h4 class="modal-title">填写不通过原因</h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="list_upload" style="text-align:center;width:600px">
							<div class="col-xs-12 col-md-12">
								<label style="width:100px;float:left">不通过原因：</label>
								<textarea rows="5" cols="5"
									style="width:250px;float:left;margin-top:20px;" id="reason"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button id="updateReason" type="button" class="btn btn-info thisbtn" onclick="unpass()">确定</button>
				</div>
			</div>

	  	  </div>
	    </div>
	    
  	</div>
  </body>
</html>
