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
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" href="module/css/contractManage/EditContract.css" />
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	
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
  <div class="main">
	<div id="showContract" class="header">
		<div class="top">
			<span><b>编辑合同资料</b></span>
			<div class="contract-title">
				<div id="contractID" style="display:none;">
				   <input type="text" id="edit_contractID" name="contractID" class="form-control fl" />
				   <label class="control-label fl">合同ID：</label>
				</div>
	        	<div class="contractCode">
				   <input type="text" id="edit_contractCode" name="contractCode" class="form-control fl" />
				   <label class="control-label fl">合同编号：</label>
				</div>
	        </div>
		</div>
		<div class="bottom">
			<div class="contractName">
			   <label class="control-label fl">合同名称：</label>
			   <input type="text" id="edit_contractName" name="contractName" class="form-control fl" />
			</div>
			<div class="companyName">
               <label class="control-label fl">签约单位：</label>
			   <input type="text" id="edit_companyName" name="companyName" oninput="editShowMsg()" onpropertychange="editShowMsg()" class="form-control fl" />
			   <div class="companyN fl">
	                   
               </div>
			</div>
			<div class="address">
               <label class="control-label fl">单位地址：</label>
			   <input type="text" id="edit_address" name="address" class="form-control fl" />
			</div>
	       	<div class="oppositeMen">
               <label class="control-label fl">甲方法定代表人或代理人：</label>
			   <input type="text" id="edit_oppositeMen" name="oppositeMen" class="form-control fl" />
			</div>
            <div class="linkPhone">
               <label class="control-label fl">联系电话：</label>
			   <input type="text" id="edit_linkPhone" name="linkPhone" class="form-control fl"  onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');}" />
			</div>
			<div class="signAddress">
               <label class="control-label fl">签约地点：</label>
			   <input type="text" id="edit_signAddress" name="signAddress" class="form-control fl" />
			</div>
			<div class="employeeName">
                <label class="control-label fl">乙方法定代表人或代理人：</label>
				<input type="text" id="edit_employeeName" name="employeeName" oninput="editGetEName()" onpropertychange="editGetEName()" class="form-control fl" />
				<div class="employeeN fl">
	                   
                </div>
			</div>
	       	<div class="Time">
               <label class="control-label fl">履行时间：</label>
			   <div class="input-group date form_datetime fl">
		   			<input id="edit_startTime" class="form-control" size="16" type="text" readonly>
		    		<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
			   </div>
			   <div class="bsp fl">至</div>
			   <div class="input-group date form_datetime fl">
		   			<input id="edit_endTime" class="form-control" size="16" type="text" readonly>
		    		<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
			   </div>
			</div>
	       	<div class="signTime">
                <label class="control-label fl">签订时间：</label>
				<div class="input-group date form_datetime fl">
		   				<input id="edit_signTime" class="form-control" size="16" type="text" value="" readonly>
		    			<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
						<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</div>
			</div>
            <div class="contractAmount">
                <label class="control-label fl">合同金额：</label>
				<input type="text" id="edit_contractAmount" name="contractAmount" class="form-control fl" onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}" onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}"/>
			</div>
	       	<div class="isClassified">
                <label class="control-label fl">是否涉密：</label>
				<input type="radio" value="1" name="isClassified"/><span>是</span>
				<input type="radio" value="0" name="isClassified"/><span>否</span>
			</div>
			<div class="classifiedLevel">
                <label class="control-label fl">涉密等级：</label>
				<select id="edit_classifiedLevel" name="classifiedLevel" class="form-control fl" >
					<option value="3">无密级</option>
					<option value="0">秘密</option>
					<option value="1">机密</option>
					<option value="2">绝密</option>
		        </select>
			</div>
		</div>
	</div>
	<div class="contractFile">
		<div class="top">
			<span><b>合同文件</b></span>
			<div class="btnAdd fr">
             	<button type="button" class="btn btn-primary glyphicon glyphicon-plus" data-toggle="modal" data-target="#addFile">&nbsp;新增</button>
            </div>
		</div>
		<div class="bottom">
			<div id="show_contractFile">
			
			</div>
		</div>
	</div>
	<div class="contractFileItem">
		<div class="top">
			<span><b>合同细项</b></span>
		</div>
		<div class="bottom">
			<div id="show_contractFileItem">
             	
            </div>
		</div>
	</div>
	<div class="footer">
		<button type="button" id="btn-goback" onclick="goback()">返回</button>
		<button type="button" id="btn-edit" onclick="edit()">修改基本信息</button>
	    <button type="button" id="btn-writeModal2" onclick="writeModal2()">确认修改</button>
	    <button type="button" id="btn-writeModal1" onclick="writeModal1()">取消</button>
	</div>
	
	<!-- 新增弹框 -->
  	<div id="addModal_contractFile" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增合同文件</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="addContractFile" class="row">
               	<div class="col-xs-12 col-md-12">
                   	
					<input type="file" id="file_upload" name="file_upload" multiple="multiple">
					<div style="margin-top:20px">
						<label>文件内容</label>
						<textarea rows="3" cols="20" id="fileContent" onmousedown="mouseFoucs(event,this)"></textarea>
					</div>
				</div>
				<div class="col-xs-12 col-md-12">
					<label class="control-label" style="margin:8px 0 0 0;">文件名称：</label>
                   	<input type="text" id="add_fileName" name="fileName" class="form-control" />
                </div>
               	<div class="col-xs-12 col-md-12">
               	   	<label class="control-label" style="margin:8px 0 0 0;">上传人:</label>
               	   	<input type="text" id="add_employeeName" name="employeeName" oninput="addGetEMName()" onpropertychange="addGetEMName()"  class="form-control"/>
                   <div class="employeeN">
	                   
                   </div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">状态:</label>
				   	<select id="add_state" name="state" class="form-control">
						<option value="0">未提交</option>
						<option value="1">待审核</option>
						<option value="2">审核通过</option>
						<option value="3">驳回</option>
		           	</select>
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
  	<div id="editModal_contractFileItem" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">编辑合同细项</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="editContent" class="row">
	      		<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">合同细项编号：</label>
                   	<input type="text" id="edit_fineItemCode" name="fineItemCode" class="form-control" />
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">是否外包：</label>
                   	<input type="text" id="edit_isOutsourcing" name="isOutsourcing" oninput="editGetEQName()" onpropertychange="editGetEQName()" class="form-control" />
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">检测项目：</label>
                   	<input type="text" id="edit_testProjectName" name="testProjectName"  oninput="editGetTPName()" onpropertychange="editGetTPName()" class="form-control" />
                   	<div class="testProjectName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">检测精度：</label>
                   	<select id="edit_accuracy" name="accuracy" class="form-control">
						<option class="accuracy"></option>
						<option value="0">低</option>
						<option value="1">中</option>
						<option value="2">高</option>
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">检测部门：</label>
                   	<select id="edit_departmentName" name="departmentName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
               	   	<label class="control-label" style="margin:8px 0 0 0;">检测员:</label>
               	   	<input type="text" id="edit_employeeName" name="employeeName" oninput="editGetEMName()" onpropertychange="editGetEMName()"  class="form-control"/>
                   <div class="employeeN">
	                   
                   </div>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label" style="margin:8px 0 0 0;">检测结果：</label>
                   	<select id="edit_result" name="result" class="form-control">
						<option class="result"></option>
						<option value="0">不合格</option>
						<option value="1">合格</option>
		           	</select>
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
	
	<div id="addFile" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">上传</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="files">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								multiple="multiple">
							
							<div style="margin-top:20px">
								<label>文件内容</label>
								<textarea rows="3" cols="20" id="fileContent"
									onmousedown="mouseFoucs(event,this)"></textarea>
							</div>
							<div style="margin-top:20px">
								<label>备注信息</label>
								<textarea rows="3" cols="20" id="fileRemarks"
									onmousedown="mouseFoucs(event,this)"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure"
						onclick="fileUpload();">确定</button>
				</div>
			</div>
		</div>
	</div>
  </div>
  </body>
  <script src="module/js/contractManage/EditContract.js"></script>
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
