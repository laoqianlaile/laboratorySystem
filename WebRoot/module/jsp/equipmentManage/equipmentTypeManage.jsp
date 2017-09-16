<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>仪器设备类型管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" href="module/css/changeACE.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/equipmentManage/equipmentTypeManage.css">
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
	<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/sweetalert.min.js"></script>
</head>
<body>
	<div class="searchArea">
		<div class="row">
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>设备类型编号:</label>
				<input type="text" id="schEquipmentTypeCode" name="schEquipmentTypeCode" class="form-control" aria-describedby="basic-addon1" placeholder="请输入设备名称查找"/>
			</div>
			<div class="col-xs-4 col-md-4 col-lg-4">
				<label>设备类型名称:</label>
				<input type="text" id="schEquipmentTypeName" name="schEquipmentTypeName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入设备名称查找"/>
			</div>
		</div>
	</div>

	<div class="input-group-area">
		<button type="button" onclick="search()" class="btn btn-primary">
			<em class="glyphicon glyphicon-search"></em> 查询
		</button>
  		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addModal">
  			<em class=" glyphicon glyphicon-plus"></em> 新增
  		</button>
  		<button type="button" onclick="openModal()" class="btn btn-primary ">
  			<em class=" glyphicon glyphicon-edit"></em> 修改
  		</button>
  		<button id="del" onclick="delData()" type="button" class="btn btn-primary">
  			<em class=" glyphicon glyphicon-trash"></em> 删除
  		</button>
  		<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary">
  			<em class=" glyphicon glyphicon-refresh"></em> 刷新
  		</button>
	</div>
  		
  	<!-- 新增弹框 -->
  	<div id="addModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增设备类型</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="adDcontent" class="row1">
	      		<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备类型编号:</label>
                   	<input type="text" id="add_equipmentTypeCode" name="equipmentTypeCode" onblur="isCodeExistA()" class="form-control" />
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备类型名称:</label>
                   	<input type="text" id="add_equipmentTypeName" name="equipmentTypeName" onblur="isTypeExistA()" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备注:</label>
				   	<input type="text" id="add_remarks" name="remarks" class="form-control"/>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="add()">新增</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
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
	        <h4 class="modal-title">修改设备类型</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="IDid" class="row1">
	      		<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备类型编号:</label>
                   	<input type="text" id="edit_equipmentTypeCode" name="equipmentTypeCode" onblur="isCodeExistE()" class="form-control" />
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备类型名称:</label>
                   	<input type="text" id="edit_equipmentTypeName" name="equipmentTypeName" onblur="isTypeExistE()" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备注:</label>
				   	<input type="text" id="edit_remarks" name="remarks" class="form-control"/>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="edit()">修改</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>

  	
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/equipmentManage/equipmentTypeManage.js"></script>
 </html>
