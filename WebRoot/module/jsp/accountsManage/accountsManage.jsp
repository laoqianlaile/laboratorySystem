
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>账目管理</title>
    
    <link rel = "stylesheet" type= "text/css" href="module/css/bootstrap.min.css">
    <link rel = "stylesheey" type= "text/css" href="module/css/bootstrap-table.css">
    <link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
    <link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" /> 
    
    <script type="text/javascript" src="module/js/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="module/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="module/js/bootstrap-table.js"></script>
    <script type="text/javascript" src="module/js/bootstrap-table-zh-CN.js"></script>
    <script type="text/javascript" src="module/js/bootstrap-datetimepicker.fr.js"></script>
	<script type="text/javascript" src="module/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<!-- 提示弹框 -->
	<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
	<script src="module/js/sweetalert.min.js"></script>
  </head>
  <style>
.col-md-4{
	padding:0px;
}  

.col-md-12 .col-md-4 input{
	width:230px;
	display: inline-block;
}

.col-md-12 .col-md-4 span{
	padding: 9px 12px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.col-md-4 label{
	margin-top: 8px;
}
.col-md-4 span{
}
.col-md-4 .date_left{
	float:left;
}
.querySideleft {
	float:left;
}
.col-md-6 input{
	width:200px;
	display:inline-block;
}
.col-md-6  select{
	width:200px;
	display: inline-block;
}
#menu{
    background-color: rgb(232,243,249);
    padding-top: 20px;
    padding-bottom: 20px;
    width: 101%;
    margin-bottom: 30px;
}
#menu button{
	  margin-right: 2%;
}
#menu button:hover {
  border: none;
  color: #fff;
  background-color: rgb(255, 173, 51);
}

#addModal .row .form-control{
    display: initial;
    width:80%;
}
#addModal .row .labelName{
	margin: 2%;
	text-align: center;
}
#editModal .row .form-control{
    display: initial;
    width:80%;
}
#editModal .row .labelName{
	margin: 2%;
	text-align: center;
}
</style>
  <body>
  	<div class="container" style="width:100%;">
		<div class="row clearfix" >
				<div class="col-md-12" style=" margin-bottom: 10px;">
					<div class = "col-md-4 ">
					  	<label>合同编号：</label>
						<input  type = "text" id="query_contractCode" name = "contractCode" class="form-control"/>
					</div>
					<div class = "col-md-4 ">
						<label>合同名称：</label>
						<input  type = "text" id="query_contractName" name = "contractName" class="form-control"/>
					</div>
					
				</div>
				<div class="col-md-12" style=" margin-bottom: 10px;">
					<div class="col-md-4 input-group date form_datetime" style="float:left;" >
						<label class="date_left" style="padding-right: 3px;">录入日期： </label>
						<div class="date_left">
						<input class="form-control" id= "checkTime1" name= "checkTime1" type="text" readonly style="width:150px;">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-remove"></i>
							</span> 
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>
						</div>
					</div>
					<div class="col-md-4 input-group date form_datetime" style="float:left;">
						<label class="date_left" style="padding-right: 47px;">至： </label> 
						<div class="date_left">
						<input class="form-control" type="text" id= "checkTime2" name= "checkTime2" value="" readonly style="width:150px;"> 
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-remove"></i>
							</span> 
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-calendar"></i>
							</span>
						</div>
					</div>
				</div>
				<div id= "menu" class="col-md-12" >
					<div>
						<button class="btn btn-primary type=" button" id="refresh"
							onclick="query()">
							<em class="glyphicon glyphicon-search"></em> 查询
						</button>
						<button class="btn btn-primary type=" button" id="refresh"
							onclick="openAddModal()">
							<em class="glyphicon glyphicon-plus"></em> 新增标准
						</button>
						<button class="btn btn-primary" type="button">
							<em class="glyphicon glyphicon-circle-arrow-up"></em> 导入
						</button>

						<button class="btn btn-primary" type="button">
							<em class="glyphicon glyphicon-circle-arrow-down"></em> 导出
						</button>
						<button class="btn btn-primary type=" button" id="refresh"
							onclick="refresh()">
							<em class="glyphicon glyphicon-refresh"></em> 刷新
						</button>
					</div>
			</div>
			<table id="table" class="table table-hover table-striped table-bordered">
			</table>
		</div>
	</div>

	<!-- 新增弹窗 -->
	<div id="addModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">报账专员</label> 
							<input type="hidden" id="employeeID" name = "employeeID"/>
							<input type="text" id="add_employeeName" name="employeeName" disabled="disabled" class="form-control" aria-describedby="basic-addon1"/>
						</div>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">合同编码</label>
							<select id="add_contractCode" name="contractCode" oninput="contractCodeChange('add')"
									onpropertychange="contractCodeChange('add')" class="form-control">
							</select>
						</div>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">合同名称</label> 
							<input type="text" id="add_contractName" name="contractName" disabled="disabled"  class="form-control" aria-describedby="basic-addon1"/>
						</div>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">合同金额</label> 
							<input type="text" id="add_contractAmount" name="contractAmount" disabled="disabled"  class="form-control" aria-describedby="basic-addon1"/>
						</div>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName" style="position: relative;bottom: 25px;">　备注　</label> 
							<textarea id="add_remarks" name="remarks"  class="form-control" aria-describedby="basic-addon1"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="addAccounts()">确认</button>
				</div>
			</div>
		</div>
	</div>
	<!--编辑弹窗 -->
	<div id="editModal" class="modal fade"">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">编辑账目</h4>
				</div>
				<div class="modal-body">
					<div class="row" id="edit">
						<input type="hidden" id="edit_accountsID" name="accountsID"/>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">报账专员：</label> 
							<input type="text" id="edit_employeeName" name="employeeName"  disabled="disabled" class="form-control" aria-describedby="basic-addon1" readonly/>
						</div>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">合同编码：</label>
							<input type="text" id="edit_contractCode" name="contractCode"  class="form-control"  readonly/>
						</div>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">录入时间：</label> 
							<input type="text" id="edit_checkinTime" name="checkinTime"  class="form-control"  readonly aria-describedby="basic-addon1"/>
						</div>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">合同名称：</label> 
							<input type="text" id="edit_contractName" name="contractName" disabled="disabled"  class="form-control" aria-describedby="basic-addon1"/>
						</div>
						<div class ="col-xs-12 col-md-12">
							<label class="labelName">合同金额：</label> 
							<input type="text" id="edit_contractAmount" name="contractAmount" disabled="disabled" class="form-control" aria-describedby="basic-addon1"/>
						</div>
					
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="editAccounts()">确认</button>
				</div>
			</div>
		</div>
	</div>
  </body>
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
		format : 'yyyy-mm-dd'
	});
</script>
<script type="text/javascript" src="module/js/accountsManage/accountsManage.js"></script>
</html>
