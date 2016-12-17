<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>文档管理</title>
    
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
	<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/documentClassification/documentClassifif.css">
  </head>
  
  <div id="main">
   		<div id="head">
   			<div class="headtext">
    			<span class="spanstyle">编号:</span>
    			<input id="sdocumentCode" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">名称:</span>
    			<input id="sdocumentName" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">类别:</span>    			
   				<select id="sdocumentTypeName" class="form-control text" onchange="agreementSubtypeOption()">
					<option value ="" selected="selected">未分类</option>		
				</select> 
    		</div>
    		<div class="headtext">
    			<button type="button" class="btn btn-info btncss" onclick="search()">查询</button>
    		</div>
    		<div class="special">
    			<button type="button" class="btn btn-info btncss" data-toggle="modal" data-target=".bs-example-modal-lg" onclick="showInfo()" >新增</button>
    			<button type="button" class="btn btn-info btncss"  data-target=".bs-example-modal-lg" onclick="download()" >下载</button>
    			<button type="button" class="btn btn-info btncss"  data-target=".bs-example-modal-lg" onclick="wordView()" >预览</button>
    			<button type="button" class="btn btn-info btncss"  data-target=".bs-example-modal-lg" onclick="del()" >删除</button>
    		</div>
   		</div>
   		<div id="content">
   			<table id="table" class="table">
   			</table>
   		</div>
   		<!-- 弹窗 -->
   		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		  <div class="modal-dialog modal-lg">
		    <div class="modal-content">
		      	<div class="modal-header">
	        		<h4 class="modal-title" id="myModalLabel">文档新增</h4>
	      		</div>
	      		<div class="modal-body">
	        			<form id="adddata" class="form-horizontal" method="post" action="documentController/addDocument.do" enctype="multipart/form-data">
	        				<div id="files">
	        					<div class="form-group"><!-- style="display:none" -->
				    				<label for="inputPassword3" class="col-sm-2 control-label">ID</label>
				    				<div class="col-sm-10 filetextdiv">
				      					<input id="documentID" type="text" name="ID" class="form-control" placeholder="ID">
				    				</div>
				    			</div>
		        				<div class="form-group">
				    				<label for="inputPassword3" class="col-sm-2 control-label">编号</label>
				    				<div class="col-sm-10 filetextdiv">
				      					<input id="documentCode" type="text" name="documentCode" class="form-control" placeholder="编号">
				    				</div>
				    			</div>
				    			<div class="form-group">
	    							<label for="inputPassword3" class="col-sm-2 control-label">名称</label>
	    							<div class="col-sm-10">
	     								<input type="text" class="form-control" id="documentName" name="documentName" placeholder="名称 ">
	    							</div>
	  							</div>
	  							<div class="form-group">
	    							<label  for="name" class="col-sm-2 control-label">类别</label>
	    							<div class="col-sm-10">
	     								<select id="documentTypeID" name="documentTypeID" class="form-control">
										</select> 
										
	    							</div>
	  							</div>
	  							<div class="form-group">
	    							<label for="inputPassword3" class="col-sm-2 control-label">上传文档</label>
	    							<input type="file" id="files" name="files" multiple="multiple">
	  							</div>
	  							
								<div class="form-group">
									<label  for="inputPassword3" class="col-sm-2 control-label">备注信息</label>
									<textarea rows="2" cols="6" style="width:80%;margin-left:106px;" class="form-control"  id="remark" name="remark"
										></textarea>
								</div>
	  							<div class="form-group">
	    							<label for="inputPassword3" class="col-sm-2 control-label">文档描述</label>
	    							<div class="col-sm-10">
	     								<input type="text" class="form-control" id="description" name="description" placeholder="文档描述 ">
	    							</div>
	  							</div>
								<div class="modal-footer">
				      				<button id="surebtn" type="submit" class="btn btn-primary"  >确定</button>
					        		<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>	
		      					</div>
	      					</div>
	        			</form>
	      			</div>
		    </div>
		  </div>
		</div>
		
		<!-- 下载预览 -->
		<div class="modal fade" id="NoPermissionModal">  
		    <div class="modal-dialog" style="width:900px;">  
		        <div class="modal-content" style="width:900px;height:650px;margin:0 auto;">  
		            <div class="modal-header">  
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>  
		              
		                <h4 class="modal-title" id="NoPermissionModalLabel">预览</h4>  
		            </div>  
		            <div class="modal-body" style="height:500px;">  
		                <iframe id="NoPermissioniframe" width="100%" height="100%" frameborder="0"></iframe>  
		            </div>  
		            <div class="modal-footer">  
		               <button type="button" class="btn btn-default " data-dismiss="modal">    关  闭    </button>  
		              <!--   <button class="btn btn-default"  type="button" onclick="aaa();" > 关  闭  </button>   -->
		            </div>  
		        </div>  
		    </div>  
		</div>  
	
		
	</div>
    <script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script src="assets/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="module/js/documentManage/documentManage.js"></script>
	<script src="module/js/jquery.uploadify.min.js"></script>
  </body>
</html>
