<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>仪器设备管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" href="module/css/changeACE.css" />
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/equipmentManage/equipmentManage.css">
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
	<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="module/js/sweetalert.min.js"></script>
<body>
	<div id="searcherArea">
		<div class="row">
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>设备类型:</label>
				<select id="schEquipmentType" name="schEquipmentType" class="form-control"  aria-describedby="basic-addon1">
				</select>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>设备名称:</label>
				<input type="text" id="schEquipmentName" name="schEquipmentName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入设备名称查找"/>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>所属科室:</label>
				<select id="schDepartment" name="schDepartment" class="form-control"  aria-describedby="basic-addon1">
				</select>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label class="control-label">购入时间:</label>
				<div class="input-group date form_datetime timeChooseDiv"> 
   					<input class="form-control" id="schBuyTime" size="16" type="text" value="" readonly="true" placeholder="请选择购入时间">
    				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 </div> 
			</div>
		</div>
	</div>

	<div class="input-group-area" >
  	 	<button type="button" onclick="searchEquipment()" class="btn btn-primary glyphicon glyphicon-search">&nbsp;查询</button>
  		<button type="button" class="btn btn-primary glyphicon glyphicon-plus" data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
  		<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
	</div>
  		
  	<!-- 新增弹框 -->
  	<div id="addModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增设备</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="adDcontent" class="row1">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备名称:</label>
                   	<input type="text" id="add_equipmentName" name="equipmentName" class="form-control wide" />
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">出厂编号:</label>
				   	<input type="text" id="add_factoryCode" name="factoryCode" class="form-control"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">所属科室:</label>
                   	<select id="add_departmentName" name="departmentName" class="form-control">
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备类型:</label>
                   	<select id="add_equipmentTypeName" name="equipmentTypeName" class="form-control">
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备型号:</label>
                   	<input type="text" id="add_model" name="model" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
					<label class="control-label">购入时间:</label>
					<div class="input-group date form_datetime timeChooseDiv1"> 
   						<input class="form-control" id="add_buyTime" size="16" type="text" value="" readonly="true" placeholder="请选择购入时间">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div> 
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">使用年限:</label>
				   	<input type="text" id="add_useYear" name="useYear" class="form-control" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">证书编号:</label>
                   	<input type="text" id="add_credentials" name="credentials" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12">
					<label class="control-label">有 &nbsp;效 &nbsp;期:</label>
					<div class="input-group date form_datetime_TR timeChooseDiv1"> 
   						<input class="form-control" id="add_effectiveTime" size="16" type="text" value="" readonly="true" placeholder="请选择有效期">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div> 
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 注:</label>
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
	        <h4 class="modal-title">修改设备</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="IDid" class="row1">
	     	 	<div class="col-xs-12 col-md-12" style="display:none;">
                   	<label class="control-label">设备ID:</label>
                   	<input type="text" id="edit_ID" name="ID" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备名称:</label>
                   	<input type="text" id="edit_equipmentName" name="equipmentName" class="form-control" />
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备出厂编号:</label>
				   	<input type="text" id="edit_factoryCode" name="factoryCode" class="form-control"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">所属科室:</label>
                   	<select id="edit_departmentName" name="departmentName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备类型:</label>
                   	<select id="edit_equipmentTypeName" name="equipmentTypeName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备型号:</label>
                   	<input type="text" id="edit_model" name="model" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
					<label class="control-label">购入时间:</label>
					<div class="input-group date form_datetime timeChooseDiv1"> 
   						<input class="form-control" id="edit_buyTime" size="16" type="text" value="" readonly="true" placeholder="请选择购入时间">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div> 
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">使用年限:</label>
				   	<input type="text" id="edit_useYear" name="useYear" class="form-control" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">证书编号:</label>
                   	<input type="text" id="edit_credentials" name="credentials" class="form-control" />
               	</div>
                 <div class="col-xs-12 col-md-12">
					<label class="control-label">有 &nbsp;效&nbsp; 期:</label>
					<div class="input-group date form_datetime_TR timeChooseDiv1"> 
   						<input class="form-control" id="edit_effectiveTime" size="16" type="text" value="" readonly="true" placeholder="请选择有效期">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div> 
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 注:</label>
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
  <script src="module/js/equipmentManage/equipmentManage.js"></script>
</html>
