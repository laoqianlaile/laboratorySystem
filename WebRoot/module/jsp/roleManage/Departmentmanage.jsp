<%@ page language="java" import="java.util.*" pageEncoding="utf-8" contentType="text/html; charset=UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN">
  <head>
    <base href="<%=basePath%>">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>部门</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" href="module/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" href="module/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/Departmentmanage.css">
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
    <script src="module/js/bootstrap-table-zh-CN.js"></script>
    <script src="module/js/Departmentmanage/Departmentmanage.js"></script>
  </head>
  
  <body>
  <div id="showdiv1" class="alert alert-info tan">
  </div>
  <div id="hote">
    <form class="form-inline" id="lform">
	  <div class="form-group">
	    <label for="exampleInputName2">部门编码：</label>
	    <input type="text" class="form-control" id="chaxunid" placeholder="部门编码">
	  </div>
	  <div class="form-group abc">
	    <label for="exampleInputEmail2">部门名称：</label>
	    <input type="text" class="form-control" id="chaxunname" placeholder="部门名称">
	  </div>
	  <div class="form-group abc">
	    <label for="exampleInputName2">负责人：</label>
	    <input type="text" class="form-control" id="chargep" placeholder="负责人">
	  </div>
  		<button type="button" onclick="chaxun()" class="btn btn-primary subadd glyphicon glyphicon-hand-right">&nbsp;查询/刷新</button>
	</form>	
		<div class="input-group" style="float: right;">
			<button type="button" class="btn btn-primary glyphicon glyphicon-plus" data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
			<button type="button" onclick="check()" class="btn btn-primary glyphicon glyphicon-list">&nbsp;查看</button>
	  		<button type="button" onclick="showwindow()" class="btn btn-primary glyphicon glyphicon-edit">&nbsp;编辑</button>
	  		<button id="del" onclick="deletedepart()" type="button" class="btn btn-primary glyphicon glyphicon-remove">&nbsp;删除</button>
		</div>
		
		
		
		<!-- 弹出"新增部门框" -->
		<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  		<div class="modal-dialog" role="document">
	    		<div class="modal-content">
	      			<div class="modal-header">
	        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        				<h4 class="modal-title" id="myModalLabel">新增部门</h4>
	      			</div>
	      			<div class="modal-body">
	        			<form id="adddata" class="form-horizontal">
	        				<div class="form-group">
			    				<label for="inputEmail3" class="col-sm-2 control-label">部门编码</label>
			    				<div class="col-sm-10">
			      					<input type="text" class="form-control" id="add_departmentid" name="departmentid" placeholder="部门编码" required/>
			    				</div>
			    			</div>
			    			<div class="form-group">
    							<label for="inputPassword3" class="col-sm-2 control-label">部门名称</label>
    							<div class="col-sm-10">
     								<input type="text" class="form-control" id="add_name" name="name" placeholder="部门名称">
    							</div>
  							</div>
  							<div class="form-group">
    							<label for="inputPassword3" class="col-sm-2 control-label">部门简介</label>
    							<div class="col-sm-10">
     								<textarea class="form-control" id="add_introduction" name="introduction" rows="3"></textarea>
    							</div>
  							</div>
  							<div class="form-group">
  								<label for="inputPassword3" class="col-sm-2 control-label">负责人</label>
  								<div class="col-sm-10">
  									<input type="text" class="form-control" id="add_head" name="head" placeholder="部门名称">
							 		<!-- <select class="form-control" id="head" name="head">
										  <option>fu</option>
										  <option>Ketchup</option>
										  <option>Relish</option>
									</select> -->
							    </div>
							</div>
							<div class="form-group">
  								<label for="inputPassword3" class="col-sm-2 control-label">上级部门</label>
  								<div class="col-sm-10">
  									<input type="text" class="form-control" id="add_superior" name="superior" placeholder="部门名称">
							 		<!-- <select class="form-control" id="superior" name="superior">
										  <option>fu</option>
										  <option>Ketchup</option>
										  <option>Relish</option>
									</select> -->
							    </div>
							</div>
							<div class="modal-footer">
			      				<button type="button" class="btn btn-primary" onclick="addde()">保存</button>
				        		<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>	
	      					</div>
	        			</form>
	      			</div>
	      			
	   		 </div>
	  	</div>
	</div><!-- 弹出新增部门框 -->
	
	<!-- 弹出编辑部门框 -->
	<div class="modal fade" id="checkModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  		<div class="modal-dialog" role="document">
	    		<div class="modal-content">
	      			<div class="modal-header">
	        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        				<h4 class="modal-title" id="myModalLabel">编辑部门</h4>
	      			</div>
	      			<div class="modal-body">
	        			<form id="adddata" class="form-horizontal">
	        				<div class="form-group">
			    				<label for="inputEmail3" class="col-sm-2 control-label">部门编码</label>
			    				<div class="col-sm-10">
			      					<input  type="text" class="form-control" id="Bdepartmentid" name="departmentid" placeholder="部门编码" required/>
			    				</div>
			    			</div>
			    			<div class="form-group">
    							<label for="inputPassword3" class="col-sm-2 control-label">部门</label>
    							<div class="col-sm-10">
     								<input  type="text" class="form-control" id="Bname" name="name" placeholder="部门名称">
    							</div>
  							</div>
  							<div class="form-group">
    							<label for="inputPassword3" class="col-sm-2 control-label">部门简介</label>
    							<div class="col-sm-10">
     								<textarea  class="form-control" id="Bintroduction" name="introduction" rows="3"></textarea>
    							</div>
  							</div>
  							<div class="form-group">
  								<label for="inputPassword3" class="col-sm-2 control-label">负责人</label>
  								<div class="col-sm-10">
  									<input type="text" class="form-control" id="Bhead" name="head" placeholder="部门编码"  required/>
							 		<!-- <select class="form-control" id="head" name="head">
										  <option>fu</option>
										  <option>Ketchup</option>
										  <option>Relish</option>
									</select> -->
							    </div>
							</div>
							<div class="form-group">
  								<label for="inputPassword3" class="col-sm-2 control-label">上级部门</label>
  								<div class="col-sm-10">
  									<input type="text" class="form-control" id="Bsuperior" name="superior" placeholder="部门编码"  required/>
							 		<!-- <select class="form-control" id="superior" name="superior">
										  <option>fu</option>
										  <option>Ketchup</option>
										  <option>Relish</option>
									</select> -->
							    </div>
							</div>
							<div class="modal-footer">
			      				<button type="button" id="save" onclick="changeway()" class="btn btn-primary">保存</button>
				        		<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>	
	      					</div>
	        			</form>
	      			</div>
	      			
	   		 </div>
	  	</div>
	</div><!-- 弹出编辑部门框 -->
	
	<!-- 弹出查看部门框 -->
	<div class="modal fade" id="showModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  		<div class="modal-dialog" role="document">
	    		<div class="modal-content">
	      			<div class="modal-header">
	        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        				<h4 class="modal-title" id="myModalLabel">查看部门</h4>
	      			</div>
	      			<div class="modal-body">
	        			<form id="adddata" class="form-horizontal">
	        				<div class="form-group">
			    				<label for="inputEmail3" class="col-sm-2 control-label">部门编码</label>
			    				<div class="col-sm-10">
			      					<input type="text" class="form-control" id="check_departmentid" name="departmentid" readonly="true" placeholder="部门编码"  required/>
			    				</div>
			    			</div>
			    			<div class="form-group">
    							<label for="inputPassword3" class="col-sm-2 control-label">部门</label>
    							<div class="col-sm-10">
     								<input type="text" class="form-control" id="check_name" name="name" readonly="true" placeholder="部门名称">
    							</div>
  							</div>
  							<div class="form-group">
    							<label for="inputPassword3" class="col-sm-2 control-label">部门简介</label>
    							<div class="col-sm-10">
     								<textarea class="form-control" id="check_introduction" name="introduction" readonly="true" rows="3"></textarea>
    							</div>
  							</div>
  							<div class="form-group">
  								<label for="inputPassword3" class="col-sm-2 control-label">负责人</label>
  								<div class="col-sm-10">
							 		<input type="text" class="form-control" id="check_head" name="head" readonly="true" placeholder="部门名称">
							    </div>
							</div>
							<div class="form-group">
  								<label for="inputPassword3" class="col-sm-2 control-label">上级部门</label>
  								<div class="col-sm-10">
							 		<input type="text" class="form-control" id="check_superior" name="superior" readonly="true" placeholder="部门名称">
							    </div>
							</div>
							<div class="modal-footer">
				        		<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>	
	      					</div>
	        			</form>
	      			</div>
	      			
	   		 </div>
	  	</div>
	</div><!-- 弹出查看部门框 -->
	
	<!-- 分隔线 -->
	<hr class="hr" />
	
	<!-- 表格整体 -->
		<div id="hote-right">
			<table id="table">
  			</table>
		</div>
	</div>
    
  </body>
</html>
