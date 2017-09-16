<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>西计实验室管理系统</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css"
	href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-select.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-select.min.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css"
	href="module/css/employeeManage/employeeManage.css" />
	
<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-select.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<script src="module/js/jquery.uploadify.min.js"></script>
<script src="module/js/sweetalert.min.js"></script>
<script src="module/js/alert.js"></script>
<script src="assets/js/autoPage.js"></script>


<style type="text/css">
</style>
</head>

<body>
	<!-- 功能 -->
		<div class="searchArea">
			<div class="head">
				<div class="content">
					<div class="row" style="margin-top:10px;">
						<div class="col-xs-4 col-md-4 col-lg-4">
							<label class="control-label">员工姓名 ： </label> <input type="text"
								id="search_employeeName" name="employeeName"
								class="form-control" placeholder="请输入名称查找" />
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4">
							<label class="control-label">员工编码 ： </label> <input type="text"
								id="search_employeeCode" name="employeeCode"
								class="form-control" placeholder="请输入员工编码查找" />
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4">
							<label class="control-label">登录名 ： </label> <input type="text"
								id="search_loginName" name="loginName" class="form-control"
								placeholder="请输入登录名查找" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-4 col-md-4 col-lg-4">
							<label class="control-label">电话号码 ： </label> <input type="text"
								id="search_phoneNumber" name="phoneNumber" class="form-control"
								placeholder="请输入电话号码查找" />
						</div>
						<div class="col-xs-4 col-md-4 col-lg-4">
							<label class="control-label">部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门 &nbsp;&nbsp;:</label> <select
								id="search_departmentName" name="departmentName"
								class="form-control">
								<option value=""></option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="top">
				<button type="button" class="btn btn-primary glyphicon btn3 glyphicon glyphicon-refresh"
					onclick="reflesh()">刷新</button>
				<button type="button" class="btn btn-primary glyphicon btn3 glyphicon glyphicon-search"
					onclick="search()">查询</button>
				<button type="button" class="btn btn-primary glyphicon btn3 glyphicon glyphicon-plus"
					style="hover:#ffad33" onclick="add()">新增</button>
				<button type="button" class="btn btn-primary glyphicon btn3"
					onclick="reset()">重置</button>
				<button type="button" class="btn btn-primary glyphicon btn3"
					onclick="exportReport()">导出</button>
			</div>
		</div>
		<div class="table">
			<table id="table" class="table table-hover">
			</table>
		</div>

	<!--新增弹框 -->
	<div id="addModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<label class="modal-title">添加人员</label>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label> <input
								type="text" id="add_employeeName" name="employeeName"
								class="form-control" onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>员工编号:</label> <input type="text" id="add_employeeCode"
								name="employeeCode" class="form-control" onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</label> <input
								style="color:#5dafe5;font-size:14px;width:10px;height:10px; margin-left:40px;"
								type="radio" name="sex" value="1" />男 <input type="radio"
								style="color:#666;font-size:14px;width:10px;height:10px;margin-left:40px;"
								name="sex" value="0" />女
						</div>
						<div class="col-xs-6 col-md-6">
							<label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label> <input
								type="text" id="add_email" name="email" class="form-control" onkeypress="if(event.keyCode==13) focusNextInput(this);" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>手机号码:</label> <input type="text" id="add_phoneNumber"
								name="phoneNumber" class="form-control"  onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</label> <input
								type="text" id="add_address" name="address" class="form-control"  onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>身份证号:</label> <input type="text" id="add_IDCard"
								name="IDCard" class="form-control"  onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>毕业学校:</label> <input type="text" id="add_graduate"
								name="graduate" class="form-control" onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<div class="timeLabelDiv">
								<label class="control-label">出生日期:</label>
							</div>
							<div class="input-group date form_datetime timeChoose">
								<input class="form-control" id="add_birthday" size="16"
									type="text" value="" readonly="true" if(event.keyCode==13) focusNextInput(this);> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-calendar"></span></span>
							</div>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</label><select
								id="add_jobTitle" name="jobTitle" class="form-control">
								<option value="0">无</option>
								<option value="1">初级工程师</option>
								<option value="2">中级工程师</option>
								<option value="3">高级工程师</option>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:</label> <select
								id="add_name" name="name" class="selectpicker show-tick"
								multiple data-live-search="false" multiple
								data-selected-text-format="">
							</select>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>文化程度:</label> </label><select
								id="add_eduLevel" name="eduLevel" class="form-control">
								<option value="0">初中</option>
								<option value="1">高中</option>
								<option value="2">大专</option>
								<option value="3">本科</option>
								<option value="4">硕士</option>
								<option value="5">博士</option>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</label> <select
								id="add_dutyName" name="dutyName" class="form-control">
								<option value="-1"></option>
							</select>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</label> <select
								id="add_departmentName" name="departmentName"
								class="form-control">
								<option value="-1"></option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"
						onclick="save_continue()">继续</button>
					<button type="button" class="btn btn-primary" onclick="save()">保存</button>
					<button style="background:#fff;color:#333;" type="button"
						class="btn btn-primary" data-dismiss="modal">退出</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 查看他弹框 -->
	<div id="showModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<label class="modal-title">查看人员</label>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label> <input
								type="text" id="employeeName" name="employeeName"
								class="form-control" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>员工编号:</label> <input type="text" id="employeeCode"
								name="employeeCode" class="form-control" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</label> <input
								style="color:#5dafe5;font-size:14px;width:10px;height:10px;"
								type="radio" name="sex1" value="1" />男 <input type="radio"
								style="color:#666;font-size:14px;width:10px;height:10px;"
								name="sex1" value="0" />女
						</div>
						<div class="col-xs-6 col-md-6">
							<label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label> <input
								type="text" id="email" name="email" class="form-control" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>手机号码:</label> <input type="text" id="phoneNumber"
								name="phoneNumber" class="form-control" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</label> <input
								type="text" id="address" name="address" class="form-control" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>身份证号:</label> <input type="text" id="IDCard"
								name="IDCard" class="form-control" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>毕业学校:</label> <input type="text" id="graduate"
								name="graduate" class="form-control" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>出生日期:</label> <input type="text" id="birthday"
								name="birthday" class="form-control" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</label> <input type="text" id="jobTitle"
								name="jobTitle" class="form-control" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:</label> <input type="text" id="name"
								name="name" class="form-control" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>文化程度:</label> <input type="text" id="eduLevel"
								name="eduLevel" class="form-control" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</label> <input type="text" id="dutyName"
								name="dutyName" class="form-control" />
						</div>
						<div class="col-xs-6 col-md-6">
							<label>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</label> <input type="text" id="departmentName"
								name="departmentName" class="form-control" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" style="background:#fff;color:#333;"
						class="btn btn-primary" data-dismiss="modal">退出</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 修改弹框 -->
	<div id="editModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<label class="modal-title">修改人员</label>
				</div>
				<div class="modal-body">
					<div class="col-xs-12 col-md-12" style="display:none;;">
						<input type="text" id="edit_ID" name="ID" class="form-control" />
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label> <input
								type="text" id="edit_employeeName" name="employeeName"
								class="form-control" onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>员工编号:</label> <input type="text" id="edit_employeeCode"
								name="employeeCode" class="form-control" onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</label> <input
								style="color:#5dafe5;font-size:14px;width:10px;height:10px; margin-left:40px;"
								type="radio" name="sex2" value="1" />男 <input type="radio"
								style="color:#666;font-size:14px;width:10px;height:10px;margin-left:40px;"
								name="sex2" value="0" />女
						</div>
						<div class="col-xs-6 col-md-6">
							<label>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:</label> <input
								type="text" id="edit_email" name="email" class="form-control" onkeypress="if(event.keyCode==13) focusNextInput(this);" />
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>手机号码:</label> <input type="text" id="edit_phoneNumber"
								name="phoneNumber" class="form-control"  onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</label> <input
								type="text" id="edit_address" name="address" class="form-control"  onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>身份证号:</label> <input type="text" id="edit_IDCard"
								name="IDCard" class="form-control"  onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>毕业学校:</label> <input type="text" id="edit_graduate"
								name="graduate" class="form-control" onkeypress="if(event.keyCode==13) focusNextInput(this);"/>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<div class="timeLabelDiv">
								<label class="control-label">出生日期:</label>
							</div>
							<div class="input-group date form_datetime timeChoose">
								<input class="form-control" id="edit_birthday" size="16"
									type="text" value="" readonly="true" if(event.keyCode==13) focusNextInput(this);> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-calendar"></span></span>
							</div>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:</label><select
								id="edit_jobTitle" name="jobTitle" class="form-control">
								<option value="0">无</option>
								<option value="1">初级工程师</option>
								<option value="2">中级工程师</option>
								<option value="3">高级工程师</option>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:</label> <select
								id="edit_name" name="name" class="selectpicker show-tick"
								multiple data-live-search="false" multiple
								data-selected-text-format="">
							</select>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>文化程度:</label> </label><select
								id="edit_eduLevel" name="eduLevel" class="form-control">
								<option value="0">初中</option>
								<option value="1">高中</option>
								<option value="2">大专</option>
								<option value="3">本科</option>
								<option value="4">硕士</option>
								<option value="5">博士</option>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-6 col-md-6">
							<label>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务:</label> <select
								id="edit_dutyName" name="dutyName" class="form-control">
								<option value="-1"></option>
							</select>
						</div>
						<div class="col-xs-6 col-md-6">
							<label>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</label> <select
								id="edit_departmentName" name="departmentName"
								class="form-control">
								<option value="-1"></option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="edit()">修改</button>
					<button type="button" style="background:#fff;color:#333;"
						class="btn btn-primary" data-dismiss="modal">退出</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="importExcel" class="modal fade" role="dialog"  
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:450px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">导入Excel文件</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="fileInfo" style="text-align:left">
							<div id="file">
								<input type="file" name="files" id="files" style="display:none" onchange="checkFile(this)">
							</div>
							
							<button type="button" id="chooseFile" name="chooseFile" class="btn btn-default">
								<span class="glyphicon glyphicon-folder-open "></span> 选择文件
							</button>
							<span id="fileName"></span>
						</div>
					</div>
				</div>
				<div class="modal-footer">

					<button type="button" class="btn btn-primary" id="ensure" name="ensure" onclick="importExcel()">确定</button>
					<button type="button" style="background:#fff;color:#333;"
						class="btn btn-primary" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
		$('.form_datetime').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			format : 'yyyy-mm-dd hh:ii:ss'
		});
		
		$('#chooseFile').click(function() {
			$('#files').click();

		});
	</script>
</body>
<script src="module/js/employeeManage/employeeManage.js"></script>
</html>
