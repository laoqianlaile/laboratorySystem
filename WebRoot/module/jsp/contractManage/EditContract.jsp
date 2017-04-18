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
						class="form-control narrow" readonly="true"/>
				</div>
				<div class="col-xs-4 col-md-4 col-lg-4">
					<label class="control-label">联系电话:</label> <input type="text"
						id="edit_linkPhone" name="linkPhone" class="form-control"
						onkeyup="if(/\D/.test(this.value)){alert('只能输入数字');}"
						onafterpaste="if(/\D/.test(this.value)){alert('只能输入数字');}" readonly="true"/>
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
						class="form-control classifiedLevel-select">
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
					<button type="button" lass="btn btn-primary" data-toggle="modal" onclick="coverContractFile()">生成合同文件</button>
					&nbsp;<button type="button" lass="btn btn-primary" data-toggle="modal" onclick="showFileUploadModal()">上传合同文件</button>
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
					<button type="button" onclick="openAddItemModal()" class="btn btn-primary">添加细项</button>
				</div>
			</div>
			<div class="bottom">
				<table id="show_contractFileItem">
				</table>
			</div>
		</div>
		<div class="footer">
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
						<button class="btn-primary glyphicon" id="submitFileBtn" >提交</button>
						<button class="btn-primary glyphicon" id="cancel" >取消</button>
					</div>
				</div>
			</div>
		</div>

	<!-- 新增合同细项弹框 -->
  	<div id="addContractItemModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">新增合同细项</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="addContent" class="row">
	      		<div class="col-xs-12 col-md-12">
                   	<label class="control-label">合同细项编号：</label>
                   	<input type="text" id="add_fineItemCode" name="fineItemCode" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12 nameCn">
                   	<label class="control-label">检测项目：</label>
                   	<input type="text" id="add_testProjectName" name="testProjectName"  oninput="addGetTPName()" onpropertychange="addGetTPName()" class="form-control" />
                   	<div class="testProjectName">
	                   
                   </div>
                </div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">是否外包：</label>
                   	<input type="radio" value="0" checked="checked" name="isOutsourcing1" onclick="outChange()"  style="margin:8px 0 0 80px;"/><span>内测</span>
					<input type="radio" value="1" name="isOutsourcing1" onclick="outChange()" style="margin:8px 0 0 127px;"/><span>外包</span>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">计算方式：</label>
                   	<input type="radio" value="0" checked="checked"  name="calculateType1" onclick="calculateType()"  style="margin:8px 0 0 80px;"/><span>按单位算</span>
					<input type="radio" value="1" name="calculateType1" onclick="calculateType()" style="margin:8px 0 0 100px;"/><span>按时间算</span>
                </div>
                <div class="col-xs-12 col-md-12 add_number" >
                   	<label class="control-label fl" style="width:22.5%;">数量/次：</label>
                   	<input type="text" id="add_number" name="number" class="form-control fl" style="width:21%;"
                   	onkeyup="checknum(this)"
						onafterpaste="checknum(this)"/>
                   	<label class="control-label fl" style="width:22.5%;margin-left: 5.5%;">单价/元：</label>
                   	<input type="text" id="add_price1" name="price" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);"
						onafterpaste="checknum(this);"/>
               	</div>
               	<div class="col-xs-12 col-md-12 add_hour" style="display: none;">
                   	<label class="control-label fl" style="width:22.5%;">时间/时：</label>
                   	<input type="text" id="add_hour" name="hour" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);" onafterpaste="checknum(this);"/>
                   	<label class="control-label fl" style="width:22.5%;margin-left: 5.5%;">单价/元：</label>
                   	<input type="text" id="add_price2" name="price" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);" onafterpaste="checknum(this);"/>
                </div>
               	<div class="col-xs-12 col-md-12 departmentName0">
                   	<label class="control-label">检测单位：</label>
                   	<select id="add_departmentName1" name="departmentName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12 departmentName1" style="display: none;">
                   	<label class="control-label">外包单位：</label>
                   	<select id="add_departmentName2" name="departmentName" class="form-control">
						<option value='11'>外包单位</option>
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备注:</label>
                   	<textarea id="add_remarks" name="remarks" style="margin: -34px 0 0 22.5%;" class="form-control"></textarea>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="addItem()">新增</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	      </div>
	    </div>
	  </div>
	</div>
	
  	<!-- 修改合同细项弹框 -->
  	<div id="editContractItemModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">编辑合同细项</h4>
	      </div>
	      <div class="modal-body">
	      	<div id="editContent" class="row">
	      		<div class="col-xs-12 col-md-12" style="display:none;">
                   	<label class="control-label">合同细项ID：</label>
                   	<input type="text" id="edit_fineItemID" name="fineItemID" class="form-control" />
               	</div>
	      		<div class="col-xs-12 col-md-12">
                   	<label class="control-label">合同细项编号：</label>
                   	<input type="text" id="edit_fineItemCode" name="fineItemCode" class="form-control" />
               	</div>
                <div class="col-xs-12 col-md-12 nameCn">
                   	<label class="control-label">检测项目：</label>
                   	<input type="text" id="edit_testProjectName" name="testProjectName"  oninput="editGetTPName()" onpropertychange="editGetTPName()" class="form-control" />
                   	<div class="testProjectName">
	                   
                   </div>
                </div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">是否外包：</label>
                   	<input type="radio" value="0" checked="checked" name="isOutsourcing2" onclick="outChange()"  style="margin:8px 0 0 80px;"/><span>内测</span>
					<input type="radio" value="1" name="isOutsourcing2" onclick="outChange()" style="margin:8px 0 0 127px;"/><span>外包</span>
                </div>
                <div class="col-xs-12 col-md-12">
                   	<label class="control-label">计算方式：</label>
                   	<input type="radio" value="0" checked="checked"  name="calculateType2" onclick="calculateType()"  style="margin:8px 0 0 80px;"/><span>按单位算</span>
					<input type="radio" value="1" name="calculateType2" onclick="calculateType()" style="margin:8px 0 0 100px;"/><span>按时间算</span>
                </div>
                <div class="col-xs-12 col-md-12 edit_number" >
                   	<label class="control-label fl" style="width:22.5%;">数量/次：</label>
                   	<input type="text" id="edit_number" name="number" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);" onafterpaste="checknum(this);"/>
                   	<label class="control-label fl" style="width:22.5%;margin-left:5.5%;">单价/元：</label>
                   	<input type="text" id="edit_price1" name="price" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);" onafterpaste="checknum(this);"/>
               	</div>
               	<div class="col-xs-12 col-md-12 edit_hour" style="display: none;">
                   	<label class="control-label fl" style="width:22.5%;">时间/时：</label>
                   	<input type="text" id="edit_hour" name="hour" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);" onafterpaste="checknum(this);"/>
                   	<label class="control-label fl" style="width:22.5%;margin-left:5.5%;">单价/元：</label>
                   	<input type="text" id="edit_price2" name="price" class="form-control fl" style="width:21%;" 
                   	onkeyup="checknum(this);" onafterpaste="checknum(this);"/>
                </div>
               	<div class="col-xs-12 col-md-12 departmentName3">
                   	<label class="control-label">检测单位：</label>
                   	<select id="edit_departmentName1" name="departmentName" class="form-control">
						
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12 departmentName4" style="display: none;">
                   	<label class="control-label">外包单位：</label>
                   	<select id="edit_departmentName2" name="departmentName" class="form-control">
						<option value='11'>外包单位</option>
		           	</select>
               	</div>
               	<div class="col-xs-12 col-md-12">
                   	<label class="control-label">备注:</label>
                   	<textarea id="edit_remarks" name="remarks" style="margin:-34px 0 0 22.5%;" class="form-control"></textarea>
               	</div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" onclick="editItem()">修改</button>
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
