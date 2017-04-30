<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>合同管理</title>
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
	<link rel="stylesheet" type="text/css" href="module/css/contractManage/contractManage.css">
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
		    			<option value="8">全部合同</option>
		    			<option value="0">未上传合同文件</option>
						<option value="1">未提交</option>
						<option value="2">审核中</option>
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
			<div>
  	 			<button type="button" onclick="searchContract()" class="btn btn-primary glyphicon glyphicon-search">&nbsp;查询</button>
  				<button type="button" class="btn btn-primary glyphicon glyphicon-plus" data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
  				<button type="button" onclick="showContractM()" class="btn btn-primary glyphicon glyphicon-show">&nbsp;查看</button>
  				<button type="button" onclick="EditContract()" class="btn btn-primary glyphicon glyphicon-edit">&nbsp;修改</button>
  				<button id="del" onclick="delData()" type="button" class="btn btn-primary glyphicon glyphicon-remove">&nbsp;删除</button>
  				<button onclick="wdownFile()" type="button" class="btn btn-primary glyphicon glyphicon-down">&nbsp;下载</button>
  				<button id="refresh" onclick="refresh()" type="button" class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
			</div>
		</div>
  		
  	<!-- 新增弹框 -->
  	<div id="addModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="adDcontent" class="row1">
	      		<div class="col-xs-12 col-md-12">
                   <label class="control-label">合同名称:</label>
                   <input type="text" id="add_contractName" name="contractName" class="form-control" required="required"/>
               </div>
               <div class="col-xs-12 col-md-12">
                   <label class="control-label">甲方:</label>
                   <input type="text" id="add_companyName" name="add_companyName" oninput="addShowMsg()"
						onpropertychange="addShowMsg()" class="form-control" />
					<div class="companyN"></div>
		       </div>
		       <div id="add_Address1" class="col-xs-12 col-md-12">
                   <label class="control-label">签订单位地址:</label>
                   <input type="text" id="add_address" name="address" class="form-control" readonly="true"/>
               </div>
               <div id="add_Address2" class="col-xs-12 col-md-12">
                   <label class="control-label">签约地点:</label>
                   <input type="text" id="add_signAddress" name="signAddress" class="form-control"/>
               </div>
               <div id="add_LinkMen" class="col-xs-12 col-md-12">
                   <label class="control-label wide">甲方代表:</label>
                   <input type="text" id="add_oppositeMen" name="oppositeMen" class="form-control narrow1" readonly="true"/>
               </div>
               <div id="add_Phone"" class="col-xs-12 col-md-12">
                   <label class="control-label">联系电话:</label>
                   <input type="text" id="add_linkPhone" name="linkPhone" class="form-control" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"  readonly="true"/>
               </div>
                <div class="col-xs-12 col-md-12">
                   <label class="control-label">乙方代表:</label>
                   <input type="text" id="add_employeeName" name="add_employeeName" oninput="addGetEName()" onpropertychange="addGetEName()"  class="form-control narrow1" required="required"/>
                   <div class="employeeName">
                   </div>
               </div>
               <div class="col-xs-12 col-md-12">
					<label class="control-label">签订时间:</label>
					<div class="input-group date form_datetime_addTime timeChooseDiv1"> 
   						<input class="form-control" id="add_signTime" size="16" type="text" value="" readonly="true" placeholder="请选择签订时间">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div>
               </div>
               <div class="col-xs-12 col-md-12">
					<label class="control-label">履行起始时间:</label>
					<div class="input-group date form_datetime_addTime timeChooseDiv1"> 
   						<input class="form-control" id="add_startTime" size="16" type="text" value="" readonly="true" placeholder="请选择履行起始时间">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div>
               </div>
               <div class="col-xs-12 col-md-12">
					<label class="control-label">履行结束时间:</label>
					<div class="input-group date form_datetime_addTime timeChooseDiv1"> 
   						<input class="form-control" id="add_endTime" size="16" type="text" value="" readonly="true" placeholder="请选择履行结束时间">
    					<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 	</div>
               </div>
               <div class="col-xs-12 col-md-12">
					<label class="control-label">是否涉密:</label>
					<input id="r1" type="radio" value="1" name="isClassified" onclick="classifiedSth()" /><span>是</span>
					<input id="r2" type="radio" value="0" name="isClassified" onclick="classifiedSth()" checked/><span>否</span>
				</div>
				<div class="col-xs-12 col-md-12">
					<label class="control-label">涉密等级:</label>
					<select id="add_classifiedLevel" name="classifiedLevel" class="form-control classifiedLevel-select">
						<option id="Level3" value="3">无密级</option>
						<option class="Level3" value="0">秘密</option>
						<option class="Level3" value="1">机密</option>
						<option class="Level3" value="2">绝密</option>
					</select>
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
  	
  	<!-- 表格 -->
  	<table id="table">
  	</table>
  </body>
  <script src="module/js/contractManage/contractManage.js"></script>
  <script src="module/js/fileManage/fileManage.js" type="text/javascript"></script>
 </html>
