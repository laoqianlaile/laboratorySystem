<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>仪器设备报废记录管理</title>
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
	.equipmentName{
	 	width:568px;
	 	display:none;
	 	border:1px solid #ccc;
	 	border-top:none;
	 	border-radius:3px;
	}
	.equipmentName ul {
		width:567px;
		height:30px;
		border:none;
		margin:0;
		margin-left:-40px;
	}
	.equipmentName ul li{
		width:567px;
		height:30px;
		line-height: 30px;
		list-style-type: none;
		text-indent: 12px;
	}
	.equipmentName ul li:hover{
		background-color:#dcdcdc;
	}
	.employeeN{
	 	width:568px;
	 	display:none;
	 	border:1px solid #ccc;
	 	border-top:none;
	 	border-radius:3px;
	}
	.employeeN ul {
		width:567px;
		height:30px;
		border:none;
		margin:0;
		margin-left:-40px;
	}
	.employeeN ul li{
		width:567px;
		height:30px;
		line-height: 30px;
		list-style-type: none;
		text-indent: 12px;
	}
	.employeeN ul li:hover{
		background-color:#dcdcdc;
	}
	</style>
</head>
<body>
  
 	 <!-- 功能按钮 -->
 	 <div id="searcherArea">
		<div class="list-searcher">
			<span>设备型号：</span><input type="text" id="schModel" name=schModel class="form-control" >
			<span>设备名称：</span><input type="text" id="schEquipmentName" name="schEquipmentName" class="form-control" >
			<span>检测部门：</span>
		    <select id="schDepartment" name="schDepartment" class="form-control" >
			</select>
		</div>
	</div>
  	 <div class="input-group" style="float: right;margin-bottom: 10px;">
  	 	<button type="button" onclick="search()" class="btn btn-primary glyphicon glyphicon-search">&nbsp;查询</button>
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
	        <h4 class="modal-title">新增仪器设备报废记录</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="addContent" class="row">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备名称：</label>
                   	<input type="text" id="add_equipmentName" name="equipmentName" oninput="addGetEQName()" onpropertychange="addGetEQName()" class="form-control" />
                   	<div class="equipmentName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备出厂编号：</label>
                   	<input type="text" id="add_factoryCode" name="factoryCode" class="form-control" />
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备购入时间：</label>
                   	<input type="text" id="add_buyTime" name="buyTime" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12">
                  	<label class="control-label" style="margin:8px 0 0 0;">设备报销登记时间：</label>
                   	<div class="input-group date form_datetime">
		   				<input id="add_checkinTime" class="form-control" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
               	</div>
               	<div class="col-xs-12 col-md-12">
               	   	<label class="control-label" style="margin:8px 0 0 0;">检测员:</label>
               	   	<input type="text" id="add_employeeName" name="employeeName" oninput="addGetEMName()" onpropertychange="addGetEMName()"  class="form-control"/>
                   <div class="employeeN">
	                   
                   </div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">备注:</label>
				   	<input type="text" id="add_remarks" name="remarks" class="form-control"/>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="addGetUseTime()">新增</button>
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
	        <h4 class="modal-title">修改仪器设备报销记录</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="editContent" class="row">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备名称：</label>
                   	<input type="text" id="edit_equipmentName" name="equipmentName" oninput="editGetEQName()" onpropertychange="editGetEQName()" class="form-control" />
                   	<div class="equipmentName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备出厂编号：</label>
                   	<input type="text" id="edit_factoryCode" name="factoryCode" class="form-control" readonly/>
               	</div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">设备购入时间：</label>
                   	<input type="text" id="edit_buyTime" name="buyTime" class="form-control" readonly/>
               	</div>
                <div class="col-xs-12 col-md-12">
                  	<label class="control-label" style="margin:8px 0 0 0;">设备报销登记时间：</label>
                   	<div class="input-group date form_datetime">
		   				<input id="edit_checkinTime" class="form-control" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
               	</div>
               	<div class="col-xs-12 col-md-12">
               	   	<label class="control-label" style="margin:8px 0 0 0;">检测员:</label>
               	   	<input type="text" id="edit_employeeName" name="employeeName" oninput="editGetEMName()" onpropertychange="editGetEMName()" class="form-control"/>
                   <div class="employeeN">
	                   
                   </div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">备注:</label>
				   	<input type="text" id="edit_remarks" name="remarks" class="form-control"/>
               	</div>
             </div>
	      </div>
	  	   <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="editGetUseTime()">修改</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
		</div>
	  </div>
	</div>
  	
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/equipmentManage/equipmentScrapManage.js"></script>
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
