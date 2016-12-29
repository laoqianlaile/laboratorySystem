<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>用户管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	
	<link rel="stylesheet" href="module/css/changeACE.css" />
	 
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
   <style type="text/css">
   .input-group  .btn-primary{
     margin-right: 5px;
   }
   </style>
  </head>
  
  <body>
  	<!-- 功能按钮 -->
  	 <div class="input-group" style="float: right;margin-bottom: 10px;">
  		<button type="button" class="btn btn-primary glyphicon glyphicon-plus" data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
  		<button type="button" onclick="lookModal()" class="btn btn-primary glyphicon glyphicon-show">&nbsp;查看</button>
  		<button type="button" onclick="openModal()" class="btn btn-primary glyphicon glyphicon-edit">&nbsp;修改</button>
  		<button id="del" onclick="delData()" type="button" class="btn btn-primary glyphicon glyphicon-remove">&nbsp;删除</button>
  		<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
  		</div> 
  		
  	<!--  tanchuyemian -->
  	 <!-- <div class="modal-dialog" role="document" style="overflow: auto;height:100px;">
	    <div class="modal-content">
	      <div class="modal-header">
               	<div class="modal-body" class="modal fade">
                  <iframe id="NoPermissioniframe" width="100%" height="50%" frameborder="0" scrolling="auto" ></iframe>
    </div>
    </div></div></div> -->
  	<!-- 新增弹框 -->
  	<div id="addModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="row">
               <div class="col-xs-12 col-md-12">
                   <h4>角色名：</h4>
                   <input type="text" id="add_roleName" name="roleNam" class="form-control" aria-describedby="basic-addon1"/>
               </div>
               <div class="col-xs-12 col-md-12">
                   <h4>角色简介：</h4>
                   <textarea   id="add_description" name="description" class="form-control" aria-describedby="basic-addon1"></textarea>
               </div>
             </div>
             
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" class="btn btn-primary" onclick="add()">新增</button>
	      </div>
	    </div>
	  </div>
	</div>
  	
  	<!-- 查看弹框 -->
  	<div id="showModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">查看</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="row">
	      	   <div class="col-xs-12 col-md-12">
               <!--     <h4>用户ID：</h4> -->
                   <input  type="hidden" id="show_roleID" name="roleID" class="form-control" aria-describedby="basic-addon1"/>
               </div>
		       <div class="col-xs-12 col-md-12">
                   <h4>角色名：</h4>
                   <input  type="text" id="show_roleName" name="roleName" class="form-control" aria-describedby="basic-addon1"/>
               </div>
               <div class="col-xs-12 col-md-12">
                   <h4>创建人：</h4>
                   <input  type="text" id="show_creator" name="creator" class="form-control" aria-describedby="basic-addon1"/>
               </div>
                <div class="col-xs-12 col-md-12">
                   <h4>创建人：</h4>
                   <input  type="text" id="show_createTime" name="createTime" class="form-control" aria-describedby="basic-addon1"/>
               </div>
               <div class="col-xs-12 col-md-12">
                   <h4>角色简介：</h4>
                   <textarea  cols="6" id="show_describtion" name="describtion" class="form-control" aria-describedby="basic-addon1" ></textarea>
               </div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">确定</button>
	       <!--  <button type="button" class="btn btn-primary" onclick="edit()">修改</button> -->
	      </div>
	    </div>
	  </div>
	</div>
  	
  	<!-- 修改弹框 -->
  	<div id="editModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">修改</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="row">
		       <div class="col-xs-12 col-md-12">
                   <h4>角色名：</h4>
                   <input  type="text" id="edit_roleName" name="NAME" class="form-control" aria-describedby="basic-addon1"/>
               </div>
               <div class="col-xs-12 col-md-12">
                   <h4>角色简介：</h4>
                   <textarea    id="edit_description"  cols="6"   name="description" class="form-control" aria-describedby="basic-addon1"></textarea>
               </div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary" onclick="edit()">修改</button>
	      </div>
	    </div>
	  </div>
	</div>
  	
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  
  <script src="module/js/roleManage/roleManage.js"></script>
</html>
