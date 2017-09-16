<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>仪器设备检验记录管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" href="module/css/changeACE.css" />
	<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/equipmentManage/equipmentVerifyManage.css">
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
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label class="wide">设备出厂编号:</label>
				<input type="text" id="schFactoryCode" name="schFactoryCode" class="form-control narrow" aria-describedby="basic-addon1" placeholder="请输入设备名称查找"/>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>设备名称:</label>
				<input type="text" id="schEquipmentName" name="schEquipmentName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入设备名称查找"/>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>检测员:</label>
				<input type="text" id="schEmployeeName" name="schEmployeeName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入维修员查找"/>
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<label>检测部门:</label>
				<select id="schDepartment" name="schDepartment" class="form-control" aria-describedby="basic-addon1">
				</select>
			</div>
		</div>
	</div>

	<div class="input-group-area">
		<button type="button" onclick="search()" class="btn btn-primary">
			<em class="glyphicon glyphicon-search"></em> 查询
		</button>
  		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addModal">
  			<em class="glyphicon glyphicon-plus"></em> 新增
  		</button>
  		<button type="button" onclick="openModal()" class="btn btn-primary">
  			<em class="glyphicon glyphicon-edit"></em> 修改
  		</button>
  		<button id="del" onclick="delData()" type="button" class="btn btn-primary">
  			<em class="glyphicon glyphicon-trash"></em> 删除
  		</button>
  		<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary">
  			<em class="glyphicon glyphicon-refresh"></em> 刷新
  		</button>
	</div>
  		
  	<!-- 新增弹框 -->
  	<div id="addModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增仪器设备检验记录</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="addContent" class="row1">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备名称:</label>
                   	<input type="text" id="add_equipmentName" name="equipmentName" oninput="addGetEQName()" onpropertychange="addGetEQName()" class="form-control" />
                   	<div class="equipmentName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备出厂编号:</label>
                   	<input type="text" id="add_factoryCode" name="factoryCode" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测项目:</label>
                   	<input type="text" id="add_testProjectName" name="testProjectName" oninput="addGetTPName()" onpropertychange="addGetTPName()" class="form-control" />
                	<div class="testProjectName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测精度:</label>
                   	<select id="add_accuracy" name="accuracy" class="form-control">
						<option value="0">低</option>
						<option value="1">中</option>
						<option value="2">高</option>
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测部门:</label>
                   	<select id="add_departmentName" name="departmentName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
               	   	<label class="control-label">检测员:</label>
               	   	<input type="text" id="add_employeeName" name="employeeName" oninput="addGetEMName()" onpropertychange="addGetEMName()"  class="form-control"/>
                   <div class="employeeN">
	                   
                   </div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测结果:</label>
                   	<select id="add_result" name="result" class="form-control">
						<option value="0">不合格</option>
						<option value="1">合格</option>
		           	</select>
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
	        <h4 class="modal-title">修改仪器设备检验记录</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="editContent" class="row1">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备名称:</label>
                   	<input type="text" id="edit_equipmentName" name="equipmentName" oninput="editGetEQName()" onpropertychange="editGetEQName()" class="form-control" />
                   	<div class="equipmentName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">设备出厂编号:</label>
                   	<input type="text" id="edit_factoryCode" name="factoryCode" class="form-control" readonly/>
               	</div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测项目:</label>
                   	<input type="text" id="edit_testProjectName" name="testProjectName"  oninput="editGetTPName()" onpropertychange="editGetTPName()" class="form-control" />
                   	<div class="testProjectName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测精度:</label>
                   	<select id="edit_accuracy" name="accuracy" class="form-control">
						<option value="0">低</option>
						<option value="1">中</option>
						<option value="2">高</option>
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测部门:</label>
                   	<select id="edit_departmentName" name="departmentName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
               	   	<label class="control-label">检测员:</label>
               	   	<input type="text" id="edit_employeeName" name="employeeName" oninput="editGetEMName()" onpropertychange="editGetEMName()"  class="form-control"/>
                   <div class="employeeN">
	                   
                   </div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测结果:</label>
                   	<select id="edit_result" name="result" class="form-control">
						<option value="0">不合格</option>
						<option value="1">合格</option>
		           	</select>
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
  <script src="module/js/equipmentManage/equipmentVerifyManage.js"></script>
 </html>
