<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>合同信息</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/contractManage/contractView.css" />
	<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/sweetalert.min.js"></script>
</head>
<body>
  <div class="main">
	<div class="showContract">
		<div class="top">
			<div class="contract_title"><img src="module/img/editContract_icon.png" alt="editContract_icon" />合同基本信息</div>
			<div class="contractId" style="display:none;">
                   <label id="contractID"></label><!-- 合同ID -->
				   <label id="fileID"></label><!-- 文件ID -->
				</div>
			<div class="contract-code">
	        	<div class="state">
                   <label class="control-label">合同状态:</label>
				   <label id="show_state"></label>
				</div>
	        	<div class="contractCode">
                   <label class="control-label">合同编号:</label>
				   <label id="show_contractCode"></label>
				</div>
	        </div>
		</div>
		<div class="bottom">
			<div class="col-xs-4 col-md-4">
               <label class="control-label">合同名称:</label>
			   <label id="show_contractName"></label>
			</div>
	       	<div class="col-xs-4 col-md-4">
               <label class="control-label">签约地点:</label>
			   <label id="show_signAddress"></label>
			</div>
			<div class="col-xs-4 col-md-4">
               <label class="control-label">甲方:</label>
			   <label id="show_companyName"></label>
			</div>
	       	<div class="col-xs-4 col-md-4">
               <label class="control-label">甲方法定代表人(代理人):</label>
			   <label id="show_oppositeMen"></label>
			</div>
            <div class="col-xs-4 col-md-4">
               <label class="control-label">联系电话:</label>
			   <label id="show_linkPhone"></label>
			</div>
	       	<div class="col-xs-4 col-md-4">
                <label class="control-label">签订时间:</label>
				<label id="show_signTime"></label>
			</div>
			<div class="col-xs-4 col-md-4">
                <label class="control-label">乙方法定代表人(代理人):</label>
				<label id="show_employeeName"></label>
			</div>
			<div class="col-xs-4 col-md-4">
               <label class="control-label">履行时间:</label>
			   <label id="show_startTime"></label>
			</div>
			<div class="col-xs-4 col-md-4">
			   <label class="control-label">至</label>
			   <label id="show_endTime"></label>
			</div>
            <div class="col-xs-4 col-md-4">
                <label class="control-label">合同金额:</label>
				<label id="show_contractAmount"></label>
			</div>
	       	<div class="col-xs-4 col-md-4">
                <label class="control-label">是否涉密:</label>
				<label id="show_isClassified"></label>
			</div>
			<div class="col-xs-4 col-md-4">
                <label class="control-label">涉密等级:</label>
				<label id="show_classifiedLevel"></label>
			</div>
		</div>
	</div>
	<div class="footer">
		<button type="button" id="btn-goback" onclick="goback()">返回</button>
	    <button type="button" id="btn-writeModal2" onclick="writeModal2()">驳回</button>
	    <button type="button" id="btn-writeModal1" onclick="writeModal1()">通过</button>
	    <button type="button" id="btn-show" onclick="showContractFile()">查看合同文件</button>
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
	        <button type="button" class="btn btn-primary" onclick="approved()">通过</button>
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
  </body>
  <script src="module/js/contractManage/contractView.js"></script>
  
 </html>
