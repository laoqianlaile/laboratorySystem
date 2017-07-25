<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>合同审核</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
	<link rel="stylesheet" type="text/css" href="module/css/changeACE.css" />
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/contractManage/contractAudit.css">
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
</head>
<body>
  
 	 <!-- 功能按钮 -->
	<div id="searcherArea">
			<div class="row">
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>合同编号:</label>
					<input type="text" id="schContractCode" name="schContractCode" class="form-control" aria-describedby="basic-addon1" placeholder="请输入合同编号查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>乙方代表:</label><input type="text" id="schEmployeeName" name="schEmployeeName" class="form-control" aria-describedby="basic-addon1"  placeholder="请输入员工名查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>签订时间:</label>
					<div class="input-group date form_datetime_schTime timeChooseDiv"> 
   						<input class="form-control" id="schStartTime" size="16" type="text" value="" readonly="true" placeholder="请选择签订时间">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>至</label>
					<div class="input-group date form_datetime_schTime timeChooseDiv"> 
   						<input class="form-control" id="schEndTime" size="16" type="text" value="" readonly="true" placeholder="请选择签订时间">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>甲方:</label><input type="text" id="schCompanyName" name="schCompanyName" class="form-control" aria-describedby="basic-addon1" placeholder="请输入甲方公司名查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>甲方代表:</label><input type="text" id="schOppositeMen" name="schOppositeMen" class="form-control" aria-describedby="basic-addon1" placeholder="请输入甲方代理人查找"/>
				</div>
				<div class="col-xs-3 col-md-3 col-lg-3">
					<label>联系电话:</label><input type="text" id="schLinkPhone" name="schLinkPhone" class="form-control" aria-describedby="basic-addon1" placeholder="请输入联系电话查找"/> 
		  		</div>
		  		<div class="col-xs-3 col-md-3 col-lg-3">
		   		 	<label>状态:</label>
		    		<select id="schState" name="schState" class="form-control" aria-describedby="basic-addon1">
		    			<option value="2">待审核</option>
		    			<option value="9">全部合同</option>
						<option value="3">驳回</option>
						<option value="4">审核通过</option>
						<option value="5">执行中</option>
						<option value="6">执行完成</option>
						<option value="7">异常终止</option>
					</select>
				</div>
			</div>
		</div>

		<div class="input-group-area">
  	 			<button type="button" onclick="searchContract()" class="btn btn-primary ">
					<em class="glyphicon glyphicon-search"></em> 查询
					</button>
  				<button type="button" onclick="showContractA()" class="btn btn-primary">
  					<em class="glyphicon glyphicon-show"></em> 审查
  					</button>
  				<button type="button" onclick="writeModal1()" class="btn btn-primary ">
  					<em class="glyphicon glyphicon-ok"></em> 通过
  					</button>
  				<button type="button" onclick="writeModal2()" class="btn btn-primary ">
  					<em class="glyphicon glyphicon-remove"></em> 驳回
  					</button>
  				<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary ">
  					<em class="glyphicon glyphicon-refresh"></em> 刷新
  					</button>
			</div>
		</div>
  	
  	<!-- 填写审核意见弹框 -->
  	<div id="writeModal1" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">填写合同资料审核意见(通过)</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="row1">
	      		<div>
                   	<label class="control-label">审核意见:</label>
               	 	<input id="approveCause" name="approveCause"class="form-control" />
               	</div>
	      	</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary glyphicon glyphicon-ok" onclick="approved()">通过</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	  </div>
	</div>
	</div>
	
	<!-- 填写审核意见弹框 -->
  	<div id="writeModal2" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	    <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">填写合同资料审核意见(驳回)</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="row1">
	      		<div>
                   	<label class="control-label">审核意见:</label>
               		<input id="rejecteCause" name="rejecteCause" class="form-control"/>
               	</div>
	      	</div>
	      	</div>
	      <div class="modal-footer">
	      <button type="button" class="btn btn-primary" onclick="rejected()">驳回</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	  </div>
	</div>
	</div>
	
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/contractManage/contractAudit.js"></script>
 </html>
