<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>文档分类管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-table.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/documentClassification/documentClassifif.css">
  </head>
  
  <body>
   	<div id="main">
   		<div id="head">
   			<div class="headtext">
    			<span class="spanstyle">编号:</span>
    			<input id="sdocumentCode" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">类别:</span>
    			<input id="sdocumenTypeName" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<button type="button" class="btn btn-info btncss" onclick="search()">查询</button>
    		</div>
    		<div class="special">
    			<button type="button" class="btn btn-info btncss" data-toggle="modal" data-target=".bs-example-modal-lg" onclick="showInfo(2)" >新增</button>
    			<button type="button" id="upbtn" class="btn btn-info btncss" data-toggle="modal" data-target=".bs-example-modal-lg" onclick="showInfo(1)" >修改</button>
    			<button type="button" class="btn btn-info btncss" onclick="detel()">删除</button>
    		</div>
   		</div>
   		<div id="content">
   			<table id="table">
   			</table>
   		</div>
   		<!-- 弹窗 -->
   		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		  <div class="modal-dialog modal-lg">
		    <div class="modal-content">
		      	<div class="modal-header">
	        		<h4 class="modal-title" id="myModalLabel"></h4>
	      		</div>
	      		<div class="modal-body">
	        			<form id="adddata" class="form-horizontal">
	        				<div id="files">
		        				<div class="form-group">
				    				<label for="inputPassword3" class="col-sm-2 control-label">编号</label>
				    				<div class="col-sm-10 filetextdiv">
				      					<input id="documentTypeCode" type="text" name="file" class="form-control" placeholder="编号">
				    				</div>
				    			</div>
				    			<div class="form-group">
	    							<label for="inputPassword3" class="col-sm-2 control-label">名称</label>
	    							<div class="col-sm-10">
	     								<input type="text" class="form-control" id="documentTypeName" name="documenTypeName" placeholder="名称 ">
	    							</div>
	  							</div>
	  							<div class="form-group">
	    							<label for="inputPassword3" class="col-sm-2 control-label">试用范围</label>
	    							<div class="col-sm-10">
	     								<input type="text" class="form-control" id="scope" name="scope" placeholder="试用范围 ">
	    							</div>
	  							</div>
								<div class="modal-footer">
				      				<button id="surebtn" type="button" class="btn btn-primary" data-dismiss="modal" onclick="add()">确定</button>
					        		<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>	
		      					</div>
	      					</div>
	        			</form>
	      			</div>
		    </div>
		  </div>
		</div>
	</div>
    <script src="assets/js/jquery-3.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script src="assets/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="module/js/documentclassification/documentclassifi.js"></script>
  </body>
</html>
