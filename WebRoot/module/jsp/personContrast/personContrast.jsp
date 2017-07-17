<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String qualiyPlanId = request.getParameter("qualiyPlanId");
String personContrastCode = request.getParameter("code");
String personContrastYear = request.getParameter("year");
if (qualiyPlanId != null && qualiyPlanId != ""){
	session.setAttribute("qualiyPlanId", qualiyPlanId);
	session.setAttribute("personContrastCode", personContrastCode);
	session.setAttribute("personContrastYear", personContrastYear);
}else{
	personContrastCode = (String)session.getAttribute("personContrastCode");
	personContrastYear = (String)session.getAttribute("personContrastYear");
}
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
		<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
	<link rel="stylesheet" href="module/css/personContrast/bootstrapValidator.min.css" type="text/css"/>
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" href="module/css/changeACE.css" />
	<link rel="stylesheet" href="module/css/personContrast/PersonContrast.css" />
    <link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
    
    <script src="module/js/sweetalert.min.js"></script>
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
	  <span id="yearvalue" class="hiddenspan"><%=personContrastYear %></span>
	  <span id="codevalue" class="hiddenspan"><%=personContrastCode %></span>
  		<div id="font">
  			<%=personContrastYear %>人员比对建议
  		</div>
  		
  
	    <!-- 搜索框2-->  
	    <div id="head">
	      <p id="Serialnumber">编号:<label><%=personContrastCode %></label></p>
		  <div class="searchbox2">
			  <form class="form-horizontal" role="form">
			  <br>
			  <br>
			  <br>
				  <div class="form-group">
				  
					  <div class="col-xs-4 col-md-4 col-lg-4">
					   <label for="projectCode">比对项目编号:</label>
					  <input type="text" class="form-control" id="projectCode" placeholder="">
					  </div>
					  <div class="col-xs-4 col-md-4 col-lg-4">
					   <label for="projectName">比对项目:</label>
					  <input type="text" class="form-control" id="projectName" placeholder="">
					  </div>
					  
					  <div class="col-xs-4 col-md-4 col-lg-4">
					   <label>比对人员:</label>
					     <input type="text" class="form-control" id="employeeID1" placeholder="">
					  </div>
				  </div>
				  
				  <div class="form-group">  
					 

				
					  <div class="col-xs-4 col-md-4 col-lg-4">
					  	  <label>待比对人员:</label>
					     <input type="text" class="form-control" id="employeeID2" placeholder="">
					  </div>

					  <div class="col-xs-4 col-md-4 col-lg-4">
					  	<label>执行时间:</label>
					  	<div class="input-group date form_datetime timeChooseDiv">
					      <input class="form-control " size="16"
						type="text" value="" readonly="true" id="startTime">
					    <span class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
					     </div>
					  </div>
	
					  <div class="col-xs-4 col-md-4 col-lg-4">
					  	 <label>至:</label>
					  	 <div class="input-group date form_datetime timeChooseDiv">
					     <input class="form-control " size="16"
						type="text" value="" readonly="true" id="endTime">
					     <span class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
					     </div>
					  </div>
				  </div>
				  
				 <div class="form-group">  				  
					  <div class="col-xs-4 col-md-4 col-lg-4">
					  <label>测试装置:</label>
					      <input type="text" class="form-control" id="testDevice" placeholder="">
					  </div>  
					 </div>
			  </form>
		  </div>
  
		    <!-- 表格2-->
		    <div id="restcontent">
		    <button type="button" class="btn btn-primary thisbtn" onclick="addrow(this)">新增</button>
		    <button type="button" class="btn btn-primary thisbtn" onclick="deletelist(this)">删除</button>
		    <button type="button" class="btn btn-primary thisbtn" onclick="updataPersonContrast(this)">修改</button>
		    <button type="button" class="btn btn-primary thisbtn"  id="disappear" onclick="addpersonconTrast()">提交</button>
		    <button type="button" class="btn btn-primary thisbtn"  onclick="refreshAll()">刷新全部</button>	
		    <button type="button" id="" class="btn btn-primary thisbtn " onclick="query()">查询</button>	  	
		  	</div>
		  	<hr>
		  	<table id="table"></table>  
		  		    <div id="restcontent">
		  		    <button type="button" id="asda" class="btn btn-primary thisbtn" data-toggle="modal"  onclick="uploadfile()">&nbsp;上传结果</button>
			   		  </div>
			   		  
			   		  	<hr>
			<div id="bottom">
			   <table id="tablefile">
			    </table>
		  	</div>
		  	<!-- 上传文件弹框-->
  	<div class="modal fade" id="showfilepage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  		<div class="modal-dialog" role="document">
	    		<div class="modal-content" style="height:400px;">
	      			<div class="modal-header">
	        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
	        			<span aria-hidden="true">&times;</span></button>
	        				<h4 class="modal-title" id="myModalLabel">上传文件:</h4>
	      			</div>
	      			<div class="modal-body">
	      			<h4 ></h4>
		      			<form id="adddata" action="personconTrastController/upload.do"
						method="post" enctype="multipart/form-data"
						class="form-horizontal">
						<div id="files">
							<div class="form-group">
								<span for="inputEmail3" class="col-sm-4 control-label">选择文件</span>
								<div class="col-sm-5">
									<input id="fileupload" type="file" name="file"
										placeholder="请选择" />
								</div>
							</div>
							<div class="form-group">
								<span class="col-sm-4 control-label">备注</span>
								<div class="col-sm-8">
								     <input class="form-control" id="remarks"  type="text">
								</div>				
							</div>	
							
							<div class="form-group" style="visibility:hidden;">
								<label for="inputPassword3" class="col-sm-2 control-label">ID</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="belongID"
										name="belongID" readonly="true">
								</div>
							</div>
							<div class="modal-footer">
								<button type="submit" class="btn btn-info thisbtn">确定<tton>
								<button type="button" class="btn btn-info thisbtn"
									data-dismiss="modal">退出<tton>
							</div>
						</div>
					</form>		  				  							  							      			        			
	      			</div>
	   		 </div>
	  	</div>
	</div>
	  	</div>
  	</div>
  </body>
</html>