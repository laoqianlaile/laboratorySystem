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
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
	<link rel="stylesheet" type="text/css" href="module/css/changeACE.css" />
	<link rel="stylesheet" href="module/css/contractManage/EditContract.css" />
	<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
	
	<script src="assets/js/jquery-2.0.3.min.js" type="text/javascript"></script>
	<script src="module/js/bootstrap.js" type="text/javascript"></script>
	<script src="module/js/bootstrap-table.js" type="text/javascript"></script>
	<script src="module/js/bootstrap-table-zh-CN.js" type="text/javascript"></script>
	<script src="module/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js" type="text/javascript"></script>
	<script src="module/js/sweetalert.min.js" type="text/javascript"></script>
</head>
<body>
	<div class="main">
		<div class="showContract">
			<div class="top">
				<div class="contract_title"><img src="module/img/editContract_icon.png" alt="editContract_icon" />编辑合同资料</div>
				<div class="contract_code">
					<div id="contractID" >
						 <label>合同ID：</label>
						 <input type="text" id="edit_contractID" name="contractID" class="form-control" />
					</div>
					<div class="contractCode fr">
						<label>合同编号：</label>
						<label class="code-label" id="edit_contractCode" name="contractCode"></label>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="control-label">合同名称:</label> <input type="text"
						id="edit_contractName" name="contractName" class="form-control" />
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="control-label">甲方:</label>
					<input type="text" id="edit_companyName" name="companyName" oninput="editShowMsg()"
						onpropertychange="editShowMsg()" class="form-control" />
					<div class="companyN"></div>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="control-label">单位地址:</label>
					<input type="text" id="edit_address" name="address" class="form-control" readonly="true"/>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="wide">甲方法定代表人(代理人):</label> <input
						type="text" id="edit_oppositeMen" name="oppositeMen"
						class="form-control narrow"/>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="control-label">联系电话:</label> <input type="text"
						id="edit_linkPhone" name="linkPhone" class="form-control"
						onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');}"
						onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');}"/>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="control-label">签约地点:</label> <input type="text"
						id="edit_signAddress" name="signAddress" class="form-control"/>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="wide">乙方法定代表人(代理人):</label> <input
						type="text" id="edit_employeeName" name="employeeName"
						oninput="editGetEName()" onpropertychange="editGetEName()"
						class="form-control narrow" />
					<div class="employeeN"></div>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">履行时间:</label>
					</div>
					<div class="input-group date form_datetime_edit_Time timeChooseDiv">
						<input class="form-control" name="edit_startTime" id="edit_startTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择开始时间"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">至</label>
					</div>
					<div class="input-group date form_datetime_edit_Time timeChooseDiv">
						<input class="form-control" name="edit_endTime" id="edit_endTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择结束时间"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<div class="timeLabelDiv">
						<label class="control-label">签订时间:</label>
					</div>
					<div class="input-group date form_datetime_edit_Time timeChooseDiv">
						<input class="form-control" name="edit_signTime" id="edit_signTime"
							size="16" type="text" value="" readonly="true"
							placeholder="请选择签订时间"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="control-label">合同金额:</label>
					<input type="text" id="edit_contractAmount" name="contractAmount" class="form-control" readonly="true"/>
				</div>
				<div class="col-xs-2a col-md-2 col-lg-2">
					<label class="isClassified-label">是否涉密:</label>
					<input id="r1" type="radio" value="1" name="isClassified" onclick="classifiedSth()" /><span>是</span>
					<input id="r2" type="radio" value="0" name="isClassified" onclick="classifiedSth()" /><span>否</span>
				</div>
				<div class="col-xs-1a col-md-2 col-lg-2">
					<label class="classifiedLevel-label">密级:</label> <select
						id="edit_classifiedLevel" name="classifiedLevel"
						class="form-control classifiedLevel-select" onchange="classifiedLevelSth()">
						<option id="Level3" value="3">无密级</option>
						<option class="Level3" value="0">秘密</option>
						<option class="Level3" value="1">机密</option>
						<option class="Level3" value="2">绝密</option>
					</select>
				</div>
			</div>
		</div>
		<div class="contractFile">
			<div class="top">
				<div class="contract_title"><img src="module/img/ContractFile_icon.png" alt="ContractFile_icon" />编辑合同文件</div>
				<div class="btnAdd fr">
					<button type="button" class="btn btn-primary" onclick="openTemplateModal()">选择模版文件</button>
					&nbsp;<button type="button" class="btn btn-primary" onclick="showFileUploadModal()">上传合同文件</button>
				</div>
			</div>
			<div class="bottom">
				<table id="show_contractFile">
				</table>
			</div>
		</div>
		<div class="contractFileItem">
			<div class="top">
				<div class="contractFileItem_title"><img src="module/img/contractDetail_icon.png" alt="contractDetail_icon" />编辑合同细项</div>
				<div class="btnAdd fr">
					<button id="ItemModal1" type="button" onclick="openAddItemModal1()" class="btn btn-primary">添加检测细项</button>
					<button id="ItemModal2" type="button" onclick="openAddItemModal2()" class="btn btn-primary">添加校准细项</button> 	
				</div>
			</div>
			<div class="bottom">
				<table id="show_contractFileItem">
				</table>
			</div>
		</div>
		<div class="footer">
			<button type="button" id="btn-back" onclick="goback()">返回</button>
			<button type="button" id="btn-edit" onclick="edit()">保存</button>
			<button type="button" id="btn-audit" onclick="submitAudit()">提交审核</button>
		</div>

		<!-- 新增弹框 -->
		<div id="file_uploadModal" class="modal" role="dialog" aria-labelledby="gridSystemModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<p>上传文件</p>
					</div>
					<div class="modal-body">
					 	<div id="fileQueue">
							<input type="file" name="files" id="files" style="display:none" onchange="checkFile(this)">
						</div>
						<div>
						<button type="button" id="chooseFile" name="chooseFile" class="btn btn-default">
							<span class="glyphicon glyphicon-folder-open "></span> 选择文件
						</button>
						<span id="fileName"></span>
						</div>
						<div style="margin-top:10px;">
					  	<label class="control-label" style="width:12%;">备注:</label>
						<input type="text" id="fileRemarks" name="fileRemarks" class="form-control" style="width:85%;"/>
					</div></div>
					<div class="modal-footer">
						<button class="btn btn-primary" id="submitFileBtn" >提交</button>
						<button class="btn btn-default" id="cancel" >取消</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 选择模版文件弹框 -->
		<div id="templateModal" class="modal" role="dialog"
			aria-labelledby="gridSystemModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<p>选择模版文件</p>
					</div>
					<div class="modal-body">
						<div class="input-group-area" style="margin-bottom: 20px;">
  							<button type="button" onclick="coverContractFile()" class="btn btn-primary glyphicon glyphicon-show">&nbsp;生成合同文件</button>
  							<button onclick="tdownFile()" type="button" class="btn btn-primary glyphicon glyphicon-down">&nbsp;下载</button>
  							<button id="refresh" onclick="refrehContractTemplateTable()" type="button" class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
						</div>
						<table id="show_template">
						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 新增检测合同细项弹框 -->
  	<div id="addContractItemModal1" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增检验合同细项</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="addContent" class="row">
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">是否外包:</label>
                   	<input type="radio" value="0" checked="checked"  name="isOutsourcing1" style="margin:0 0 0 80px;vertical-align: text-top;"/><span>内测</span>
					<input type="radio" value="1" name="isOutsourcing1" style="margin:0 0 0 80px;vertical-align: text-top;"/><span>外包</span>
                </div>
                <div class="col-xs-12 col-md-12 nameCn">
                   	<label class="control-label">检测项目：</label>
                   	<input type="text" id="add_testProjectName" name="testProjectName"  oninput="addGetTPName()" onpropertychange="addGetTPName()" class="form-control" />
                   	<div class="testProjectName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测项目标准：</label>
                   	<input type="text" id="add_testStandard" name="testStandard" class="form-control" />
                   <div class="testStandard">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12" >
                   	<label class="control-label fl" style="width:22.5%;">数量：</label>
                   	<input type="text" id="add_number" name="number" class="form-control fl" style="width:21%;"
                   	onkeyup="this.value=this.value.replace(/\D/g,'')"
						onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
                   	<label class="control-label fl" style="width:22.5%;margin-left: 5.5%;">单价：</label>
                   	<input type="text" id="add_price" name="price" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);"
						onafterpaste="checknum(this);"/>
               	</div>
               <!-- 	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测单位：</label>
                   	<select id="add_departmentName" name="departmentName" class="form-control">
						
		           	</select>
               	</div> -->
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备注:</label>
                   	<textarea id="add_remarks1" name="remarks" style="margin: -34px 0 0 22.5%;" class="form-control"></textarea>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="addItem1()">新增</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<div id="addContractItemModal2" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增校准合同细项</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="addContent" class="row">
	      		<div class="col-xs-12 col-md-12">
                   	<label class="control-label">样品编码：</label>
                   	<input type="text" id="add_factoryCode" name="factoryCode"  oninput="addGetSName()" onpropertychange="addGetSName()" class="form-control" placeholder="请输入样品编码或样品名称进行搜索样品"/>
                   	<div class="sample">
	                   
                   </div>
               	</div>
                <div class="col-xs-12 col-md-12 nameCn">
                   	<label class="control-label">样品名称：</label>
                   	<input type="text" id="add_sampleName" name="sampleName" class="form-control" readonly="true"/>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">样品型号:</label>
                   	<input type="text" id="add_specifications" name="specifications" class="form-control" readonly="true"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">金额:</label>
                   	<input type="text" id="add_money" name="money" onkeyup="checknum(this);"
						onafterpaste="checknum(this);" class="form-control" />
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备注:</label>
                   	<textarea id="add_remarks2" name="remarks" style="margin: -34px 0 0 22.5%;" class="form-control"></textarea>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="addItem2()">新增</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<!-- 修改检测合同细项弹框 -->
  	<div id="editContractItemModal1" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">修改检验合同细项</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="editContent" class="row">
	      		<div class="col-xs-12 col-md-12" style="display:none;">
                   	<label class="control-label">合同细项ID：</label>
                   	<input type="text" id="edit_fineItemID1" name="fineItemID1" class="form-control" />
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">是否外包:</label>
                   	<input type="radio" value="0" checked="checked"  name="isOutsourcing2" style="margin:0 0 0 80px;vertical-align: text-top;"/><span>内测</span>
					<input type="radio" value="1" name="isOutsourcing2" style="margin:0 0 0 80px;vertical-align: text-top;"/><span>外包</span>
                </div>
                <div class="col-xs-12 col-md-12 nameCn">
                   	<label class="control-label">检测项目：</label>
                   	<input type="text" id="edit_testProjectName" name="testProjectName"  oninput="editGetTPName()" onpropertychange="editGetTPName()" class="form-control" />
                   	<div class="testProjectName">
	                   
                   </div>
                </div>
                <div class="col-xs-12 col-md-12" >
                   	<label class="control-label fl" style="width:22.5%;">数量：</label>
                   	<input type="text" id="edit_number" name="number" class="form-control fl" style="width:21%;"
                   onkeyup="this.value=this.value.replace(/\D/g,'')"
						onafterpaste="this.value=this.value.replace(/\D/g,'')"/>
                   	<label class="control-label fl" style="width:22.5%;margin-left: 5.5%;">单价：</label>
                   	<input type="text" id="edit_price" name="price" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);"
						onafterpaste="checknum(this);"/>
               	</div>
               	<!-- <div class="col-xs-12 col-md-12">
                   	<label class="control-label">检测单位：</label>
                   	<select id="edit_departmentName" name="departmentName" class="form-control">
						
		           	</select>
               	</div> -->
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备注:</label>
                   	<textarea id="edit_remarks1" name="remarks" style="margin: -34px 0 0 22.5%;" class="form-control"></textarea>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="editItem1()">修改</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<div id="editContractItemModal2" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">修改校准合同细项</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="editContent" class="row">
	      		<div class="col-xs-12 col-md-12" style="display:none;">
                   	<label class="control-label">合同细项ID：</label>
                   	<input type="text" id="edit_fineItemID2" name="fineItemID2" class="form-control" />
               	</div>
	      		<div class="col-xs-12 col-md-12">
                   	<label class="control-label">样品编码：</label>
                   	<input type="text" id="edit_factoryCode" name="factoryCode"  oninput="editGetSName()" onpropertychange="editGetSName()" class="form-control" />
                   	<div class="sample">
	                   
                   </div>
               	</div>
                <div class="col-xs-12 col-md-12 nameCn">
                   	<label class="control-label">样品名称：</label>
                   	<input type="text" id="edit_sampleName" name="sampleName" class="form-control" readonly="true"/>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">样品型号:</label>
                   	<input type="text" id="edit_specifications" name="specifications" class="form-control" readonly="true"/>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">金额:</label>
                   	<input type="text" id="edit_money" name="money" onkeyup="checknum(this);"
						onafterpaste="checknum(this);" class="form-control" />
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备注:</label>
                   	<textarea id="edit_remarks2" name="remarks" style="margin: -34px 0 0 22.5%;" class="form-control"></textarea>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="editItem2()">修改</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>
	
  </div>
</body>
  <script src="module/js/contractManage/EditContract.js"  type="text/javascript"></script>
  <script src="module/js/fileManage/fileManage.js" type="text/javascript"></script>
  <script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
  <script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script>
  <script type="text/javascript" src="assets/fileupload/jquery.fileupload.js"></script>
  <script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
  <script>
   $('#chooseFile').click(function() {
		$('#files').click();
	});
	$('#cancel').click(function() {
		swal({
		title: "是否取消上传?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
		},
		function(){
			refresh();
		});
	});
  </script>
 </html>
