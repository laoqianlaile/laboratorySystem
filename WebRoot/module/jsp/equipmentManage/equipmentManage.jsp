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
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
	<style type="text/css">
	.list-searcher {
		min-width: 300px;
		height: 40px;
		margin-left: 60px;
	}
	.list-searcher input {
		display: inline-block;
		margin-right: 20px;
		width: 200px;
	}
	
	.list-searcher span {
		display: inline-block;
		
	}
	.list-searcher select {
		width:120px;
		display: inline-block;
	}
	.backgray{
	  	background: gray;
	}
	.fixed-table-container .bs-checkbox {
	    text-align: center;
	    vertical-align: middle;
	}
	#searcherArea{
	 	min-width: 1300px;
	}
	.bootstrap-table{
		min-width: 1500px;
	}
	.employeeName{
	 	width:568px;
	 	display:none;
	 	border:1px solid #ccc;
	 	border-top:none;
	 	border-radius:3px;
	}
	.employeeName ul {
		width:567px;
		height:30px;
		border:none;
		margin:0;
		margin-left:-40px;
	}
	.employeeName ul li{
		width:567px;
		height:30px;
		line-height: 30px;
		list-style-type: none;
		text-indent: 12px;
	}
	.employeeName ul li:hover{
		background-color:#dcdcdc;
	}
	</style>
</head>
<body>
  
 	 <!-- 功能按钮 -->
 	 <div id="searcherArea">
		<div class="list-searcher">
			<span>设备类型：</span>
			<select id="schEquipmentType" name="schEquipmentType" class="form-control" >
			</select>
			<span>设备名称：</span><input type="text" id="schEquipmentName" name="schEquipmentName" class="form-control" >
		</div>
		<div class="list-searcher">
		    <span>所属科室：</span>
		    <select id="schDepartment" name="schDepartment" class="form-control" >
			</select>
			<span>购入时间：</span><input type="date" id="schBuyTime" name="schBuyTime" class="form-control" >
		</div>
	</div>
  	 <div class="input-group" style="float: right;margin-bottom: 10px;">
  	 	<button type="button" onclick="searchEquipment()" class="btn btn-primary glyphicon glyphicon-search">&nbsp;查询</button>
  		<button type="button" class="btn btn-primary glyphicon glyphicon-plus" data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
  		<button type="button" onclick="openModal()" class="btn btn-primary glyphicon glyphicon-edit">&nbsp;修改</button>
  		<button id="del" onclick="delData()" type="button" class="btn btn-primary glyphicon glyphicon-remove">&nbsp;删除</button>
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
	      	<div id="adDcontent" class="row">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备名称：</label>
                   	<input type="text" id="add_equipmentName" name="equipmentName" class="form-control" />
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备出厂编号:</label>
				   	<input type="text" id="add_factoryCode" name="factoryCode" class="form-control"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">所属科室：</label>
                   	<select id="add_departmentName" name="departmentName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备类型：</label>
                   	<select id="add_equipmentTypeName" name="equipmentTypeName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备型号：</label>
                   	<input type="text" id="add_model" name="model" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
                  	<label class="control-label" style="margin:8px 0 0 0;">购入时间：</label>
                   	<div class="input-group date form_datetime">
		   				<input id="add_buyTime" class="form-control" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">使用年限:</label>
				   	<input type="text" id="add_useYear" name="useYear" class="form-control" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">证书编号：</label>
                   	<input type="text" id="add_credentials" name="credentials" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12">
                  	<label class="control-label" style="margin:8px 0 0 0;">有效期：</label>
                   	<div class="input-group date form_datetime">
		   				<input id="add_effectiveTime" class="form-control" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
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
	        <h4 class="modal-title">修改设备</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="IDid" class="row">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备名称：</label>
                   	<input type="text" id="edit_equipmentName" name="equipmentName" class="form-control" />
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备出厂编号:</label>
				   	<input type="text" id="edit_factoryCode" name="factoryCode" class="form-control"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">所属科室：</label>
                   	<select id="edit_departmentName" name="departmentName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备类型：</label>
                   	<select id="edit_equipmentTypeName" name="equipmentTypeName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备型号：</label>
                   	<input type="text" id="edit_model" name="model" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
                  	<label class="control-label" style="margin:8px 0 0 0;">购入时间：</label>
                   	<div class="input-group date form_datetime">
		   				<input id="edit_buyTime" class="form-control" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">使用年限:</label>
				   	<input type="text" id="edit_useYear" name="useYear" class="form-control" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">证书编号：</label>
                   	<input type="text" id="edit_credentials" name="credentials" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12">
                  	<label class="control-label" style="margin:8px 0 0 0;">购入时间：</label>
                   	<div class="input-group date form_datetime">
		   				<input id="edit_effectiveTime" class="form-control" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
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
  <script src="module/js/equipmentManage/equipmentManage.js"></script>
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
