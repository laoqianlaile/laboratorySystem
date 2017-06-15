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
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
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
        <br />
         <div id="head">
	      <p id="Serialnumber">编号:<label><%=request.getParameter("code") %></label></p>
		    <!-- 搜索框2-->  
		   <br />
		  <div class="searchbox2">
			  <form class="form-horizontal" role="form">
				  <div class="row">
					  <div class="col-xs-4 col-md-4 col-lg-4">
		    			<label style="width:25%">比对项目编号:</label>
					 	 <input type="text" class="form-control" id="projectCode" placeholder="">
		    		  </div>
		    		  <div class="col-xs-4 col-md-4 col-lg-4">
			    		<div class="timeLabelDiv">
							<label style="width: 100%">计划完成时间:</label>
						</div>
		    			<div class="input-group date form_datetime timeChooseDiv">
							<input class="form-control" id="starttime" size="16"
								type="text" value="" readonly="true"> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-remove"></span></span> <span
								class="input-group-addon"><span
								class="glyphicon glyphicon-calendar"></span></span>
						</div>
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4">
					    		<div class="timeLabelDiv" style="width: 23%;">
									<label>至:</label>
								</div>
				    			<div class="input-group date form_datetime timeChooseDiv">
									<input class="form-control" id="endtime" size="16"
										type="text" value="" readonly="true"> <span
										class="input-group-addon"><span
										class="glyphicon glyphicon-remove"></span></span> <span
										class="input-group-addon"><span
										class="glyphicon glyphicon-calendar"></span></span>
								</div>
						</div>
				<!-- 	<span class="col-sm-1 control-label">执行时间</span>
					  <div class="col-sm-2">
					      <input class="form_datetime form-control " type="text" id="startTime">
					  </div>
					  <span class="to">至</span>
					  <div class="col-sm-2">
					     <input class="form_datetime form-control " type="text" id="endTime">
					  </div>	 -->
				  </div>
				  <div class="row">
				  	<div class="col-xs-4 col-md-4 col-lg-4">
				  		<label class="spanstyle" style="width: 25%">比对科室:</label>
						  <div class="btn-group"  style="width: 70%;">
						    <button type="button" class="btn dropdown-toggle" id="" data-toggle="dropdown" style="width: 100%;height: 34px;">
						    <span id="departmentID" style="width:100%;margin-left: 0px;"></span>
						        <span id="caret"></span>
						    <span style="position:absolute;left:95%;top:15px;" class="caret"></span>
						    </button>
						    <ul id="list2" class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1" style="width:100%;">
						    </ul>
						  </div>
					 </div>
					<div class="col-xs-4 col-md-4 col-lg-4">
						<label style="width: 25%;">是否通过:</label>
						 <div class="btn-group"  style="width: 70%;">
						    <button  style="margin-left:0px;width: 100%;height: 34px;" type="button" class="btn dropdown-toggle" id="result" data-toggle="dropdown">
						     <span id="pass1"></span>
						     <span class="caret" style="position:absolute;left:95%;top:15px;"></span>
						    </button>
						    <ul class="dropdown-menu pull-right" id="list1" role="menu" aria-labelledby="dropdownMenu1" style="width:100%;">
							    <li onclick="changgedata(3)" role="presentation">&nbsp;&nbsp;</li>
							    <li onclick="changgedata(0)" role="presentation">未审核</li>
							    <li onclick="changgedata(1)" role="presentation">通过</li>
				                <li onclick="changgedata(2)" role="presentation">不通过</li>
						    </ul>	
						  </div>
					</div>
				  </div>
			  </form>
			  <div id="restcontent">
			  	<button type="button" id="" class="btn btn-primary btncss" onclick="refresh()">查询</button>
			    <button type="button" class="btn btn-primary OKbtn" onclick="pass()">通过</button>
			    <button type="button" class="btn btn-primary NObtn" onclick="showModal()">不通过</button>
			    <button type="button" class="btn btn-primary Allbtn"  onclick="refreshAll()">刷新全部</button>	
			  </div>
		  </div>
		  </div>
		 <hr />
	    <!-- 表格2-->
	    <div class="tablebox">
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
