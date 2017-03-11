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
			<div id="bottom">
			  	<button type="button" id="asda" class="btn btn-info thisbtn" data-toggle="modal"  onclick="uploadfile()">&nbsp;上传结果</button>
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