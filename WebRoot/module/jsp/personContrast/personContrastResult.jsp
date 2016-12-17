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
    
    <title>填写人员比对结果</title>
    
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
    <script src="module/js/personContrast/personContrastResult.js"></script>
    
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
			  
			  <span class="col-sm-1 control-label" for="projectName">比对项目</span>
			  <div class="col-sm-2">
			  <input type="text" class="form-control" id="projectName" placeholder="">
			  </div>
			   <span class="col-sm-1 control-label">比对人员</span>
			  <div class="col-sm-2">
			     <input type="text" class="form-control" id="employeeID1" placeholder="">
			  </div>
			  <button type="button" id="" class="btn btn-info" onclick="refresh()">查询</button>
		  </div>
		  
		  <div class="form-group">  
			 
			  <span class="col-sm-2 control-label">测试装置</span>
			  <div class="col-sm-2">
			      <input type="text" class="form-control" id="testDevice" placeholder="">
			  </div>  
			  <span class="col-sm-1 control-label">计划年度</span>
			  <div class="col-sm-2">
			      <input class="form_datetime form-control" id="startTime" type="text">
			  </div>
			  <span class="col-sm-1 control-label">待比对人员</span>
			  <div class="col-sm-2">
			     <input type="text" class="form-control" id="employeeID2" placeholder="">
			  </div>
		  </div>
		  
	  </form>
  </div>
    <!-- 表格-->
    <div class="tablebox">
    <button type="button" class="btn btn-info " onclick="showpage()">填写结果</button>
    <button type="button" class="btn btn-info " onclick="download()">下载</button>
  	<table id="table">
  	</table>
  	</div>
  	<div id="bottom">
  			<div>
    			<button type="button" id="asda" class="btn btn-info thisbtn" data-toggle="modal"  onclick="getresultID()">&nbsp;上传结果</button>
    		</div>
    		<div class="tablecontent">
    			<table id="tablefile">
    			</table>
    		</div>
  	</div>
  	
  	<!-- 填写结果弹窗-->
  	<div class="modal fade" id="showPage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  		<div class="modal-dialog" role="document">
	    		<div class="modal-content" style="height:400px;">
	      			<div class="modal-header">
	        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
	        			<span aria-hidden="true">&times;</span></button>
	        				<h4 class="modal-title" id="myModalLabel">填写结果:</h4>
	      			</div>
	      			<div class="modal-body">
	      			<h4 ></h4>
		      			<!-- <div id="files">  -->
		      			<form enctype="multipart/form-data" class="form-horizontal" style="margin-right:60px;">
			        		<div class="form-group">
								<span class="col-sm-4 control-label">比对差异</span>
								<div class="col-sm-8">
								    <input class="form-control" id="diffierence" type="text" onchange="changeValue()">
								</div>
							</div>
							<div class="form-group">
								<span class="col-sm-4 control-label">比对结果</span>
								<div class="col-sm-8">
								     <input class="form-control" id="result"  type="text">
								</div>				
							</div>
			        					    		
									
				      		<!-- <div class="form-group" style="visibility:hidden;">
				    			<label for="inputPassword3" class="col-sm-2 control-label">ID</label>
				    			<div class="col-sm-10">
				     			     <input type="text" class="form-control" id="belongID" name="belongID" readonly="true">
				    			</div>
			  				</div>	 -->
			  				
			  				</form>			  				  							
		      		<!-- 	</div>	 -->      							      		
	        			
	      			</div>
	      			<div class="modal-footer">
	      			  <h4 ></h4>
		      			<button type="button" onclick="check()" class="btn btn-primary" style="margin-right:100px;">确定</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" style="margin-right:100px;">退出</button>	
		      		</div>
	   		 </div>
	  	</div>
	</div>
 	        			 <!-- <form id="adddata" action="personconTrastController/upload.do" method="post" enctype="multipart/form-data" class="form-horizontal">
	        			 -->
	        			 <!--  <div class="form-group">
				    				<label for="inputEmail3" class="col-sm-2 control-label">选择文件</label>
				    				<div class="col-sm-10">
				      					<input id="fileupload" type="file" name="file"  placeholder="请选择">
				    				</div>
				    			</div>	  -->	
				    	<!-- </form> -->
  </body>
</html>
