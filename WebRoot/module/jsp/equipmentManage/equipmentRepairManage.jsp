<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>仪器设备维修记录管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="module/css/equipmentManage/equipmentRepairManage.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
</head>
<body>
	<div class="content">
		<div class="searchArea">
			<div class="row">
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>设备型号:</label>
					<input type="text" id="schModel" name="schModel" class="form-control" aria-describedby="basic-addon1" placeholder="请输入设备型号查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>设备名称:</label>
					<input type="text" id="schEquipmentName" name="schEquipmentName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入设备名称查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>维修员:</label>
					<input type="text" id="schEmployeeName" name="schEmployeeName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入维修员查找"/>
				</div>
			</div>
		</div>

		<div class="buttonGroup">
			<div>
  	 			<button type="button" onclick="search()" class="btn btn-primary">查询</button>
  				&nbsp;<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addModal">新增</button>
  				&nbsp;<button type="button" onclick="openModal()" class="btn btn-primary">修改</button>
  				&nbsp;<button id="del" onclick="delData()" type="button" class="btn btn-primary">删除</button>
  				&nbsp;<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary">刷新</button>
			</div>
		</div>
	</div>
  		
  	<!-- 新增弹框 -->
  	<div id="addModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增仪器设备维修记录</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="addContent" class="row1">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备名称:</label>
                   	<input type="text" id="add_equipmentName" name="equipmentName" oninput="addGetEQName()" onpropertychange="addGetEQName()" class="form-control" />
                   	<div class="equipmentName">
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备出厂编号:</label>
                   	<input type="text" id="add_factoryCode" name="factoryCode" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">维修前状态:</label>
                   	<input type="text" id="add_beforeStatus" name="beforeStatus" class="form-control" />
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">所用零配件:</label>
                   	<input type="text" id="add_mounting" name="mounting" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
               	   	<label class="control-label" style="margin:8px 0 0 0;">维修人员:</label>
               	   	<input type="text" id="add_employeeName" name="employeeName" oninput="addGetEMName()" onpropertychange="addGetEMName()"  class="form-control"/>
                   <div class="employeeN">
	                   
                   </div>
               	</div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">维修后状态:</label>
                   	<input type="text" id="add_afterStatus" name="afterStatus" class="form-control" />
                </div>
                <div class="col-xs-12 col-md-12">
              	 	<div class="timeLabelDiv1" style="margin:3px 4px 0 0;">
						<label class="control-label">设备维修时间:</label>
					</div>
                  	<div class="input-group date form_datetime timeChooseDiv1" style="margin:3px 0 0 0;">
						<input class="form-control" name="add_repairTime" id="add_repairTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择设备维修时间"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">维修费用:</label>
				   	<input type="text" id="add_money" name="money" class="form-control" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">备注:</label>
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
	        <h4 class="modal-title">修改仪器设备维修记录</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="editContent" class="row1">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备名称:</label>
                   	<input type="text" id="edit_equipmentName" name="equipmentName" oninput="editGetEQName()" onpropertychange="editGetEQName()" class="form-control" />
                   	<div class="equipmentName">
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备出厂编号:</label>
                   	<input type="text" id="edit_factoryCode" name="factoryCode" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">维修前状态:</label>
                   	<input type="text" id="edit_beforeStatus" name="beforeStatus" class="form-control" />
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">所用零配件:</label>
                   	<input type="text" id="edit_mounting" name="mounting" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
               	   	<label class="control-label" style="margin:8px 0 0 0;">维修人员:</label>
               	   	<input type="text" id="edit_employeeName" name="employeeName" oninput="editGetEMName()" onpropertychange="editGetEMName()"  class="form-control"/>
                   <div class="employeeN">
                   </div>
               	</div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">维修后状态:</label>
                   	<input type="text" id="edit_afterStatus" name="afterStatus" class="form-control" />
                </div>
                <div class="col-xs-12 col-md-12">
                  	<div class="timeLabelDiv1" style="margin:3px 4px 0 0;">
						<label class="control-label">设备维修时间:</label>
					</div>
                  	<div class="input-group date form_datetime timeChooseDiv1" style="margin:3px 0 0 0;">
						<input class="form-control" name="edit_repairTime" id="edit_repairTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择设备维修时间"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">维修费用:</label>
				   	<input type="text" id="edit_money" name="money" class="form-control" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">备注:</label>
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
  <script src="module/js/equipmentManage/equipmentRepairManage.js"></script>
  <script type="text/javascript">
	$('.form_datetime').datetimepicker({
	    language: 'zh-CN',
	    weekStart: 1,
	    todayBtn: 1,
	    autoclose: 1,
	    todayHighlight: 1,
	    startView: 2,
	    minView: 2,
	    forceParse: 0,
	    format: 'yyyy.mm.dd'
	});
	</script>
 </html>
