<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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

<title>部门管理</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">


<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css"href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css"href="module/css/fileManage/fileManage.css">
<link rel="stylesheet" type="text/css"href="module/css/timecheck/suggest.css">
<link rel="stylesheet" type="text/css" href="module/css/jquery.fonticonpicker.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/fontello.css" />
<link rel="stylesheet" type="text/css" href="module/css/fontello-7275ca86/css/fontello.css" />
<link rel="stylesheet" type="text/css" href="module/css/themes/grey-theme/jquery.fonticonpicker.grey.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/themes/dark-grey-theme/jquery.fonticonpicker.darkgrey.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/themes/bootstrap-theme/jquery.fonticonpicker.bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/themes/inverted-theme/jquery.fonticonpicker.inverted.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
 <link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
 		
<script src="module/js/sweetalert.min.js"></script>
<script src="assets/js/autoPage.js"></script>
<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/fileManage/fileManage.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-treeview.js"></script>
<script src="module/js/moduleManage/jquery.fonticonpicker.min.js"></script>



 

</head>
<script> 
window.onload = inifA; 
function inifA(){ 
document.getElementById("tree").onclick = function(){return false}
} 
</script>

<style>
span {
	font-size: 20px;
	padding: 0px;
	margin: 0px;
}
.mystyle {
    height: 34px;
    width: 200px;
}
#listul1 li {
    text-align: center;
}
#listul2 li {
    text-align: center;
}
li:hover {
    cursor: pointer;
    background: #F5F5F5;
    font-color: black;
}

.input-group[class*="col-"] {
	float: left;
}

.input-group .form-control {
	float: left;
	margin-bottom: 0;
	position: relative;
	width: 100%;
	z-index: 2;
	float: right;
}

#departin label {
	margin-top: 11px;
	float: left;
	 margin-left: 15px;
}
#departin1 label {
	margin-top: 11px;
	float: left;
	 margin-left: 15px;
}

textarea {
	margin-top: 10px;
	padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}

#form {
	width: 100%;
	height: 60px;
	float: left;
	margin-top: 8px;
}

.item {
	width: 30.5%;;
	height: 40%;
	float: left;
}

.item>input {
	display: inline-block;
	width: 60%;
}


#search {
	float: left;
}
.dropdown-menu{
	width: 159px;
    height: 77px;
    overflow: hidden;
    overflow-y: scroll;
}
		.choose {
	height: 300px;
	overflow-x: hidden;
	overflow-y: scroll;
	width: 290px;
}


.over {
	background: #808080 none repeat scroll 0 0;
	color: #333;
	display: block;
	opacity: 1;
	position: fixed;
	top: 0px;
	z-index: 9999;
}

.col-xs-12 input,.col-md-12 input,.col-xs-12 select {
	display: block;
	width: 100%;
	display: block;
	width: 90%;
	height: 34px;
}

h4,.h4 {
	font-size: 20px;
	font-weight: bold;
}

.col-xs-12 input.chooseInput,.col-md-12 input.chooseInput {
	width: 20px;
	display: inline-block;
	vertical-align: middle;
	margin-left: 70px;
}

.col-xs-12 label.fontStyle,.col-md-12 label.fontStyle {
	margin: 10px 0 0;
}
.col-xs-12 label.fontStyle1,.col-md-12 label.fontStyle1 {
	margin: 10px 0 0;
}
.fip-box i {
	display: block;
	margin-top: 13px;
}
.icons-selector .fip-icon-block:BEFORE{
    margin-top: 10px;
}

.icons-selector .fip-icon-down-dir:BEFORE {
    margin-top: 10px;
}

.icons-selector .fip-icon-search:BEFORE {
    margin-top: 10px;
}
table {
	width: 1020px;
	min-width:800px;
}
#tree{
margin-top: 10px;
min-width: 100px;
width:15%;
float:left ;
}
#moduleTable{
    min-width: 500px;
     float: left; 
    margin-left: 10px;
    display: inline-block;
    width: 84%;
    margin-top: 10px;
    
}
.container{
   margin : 0 auto;
  min-width: 100%;
  width: 100%;
}
.btn-primary{
margin-left: 3px;
}

span {
   /*  font-weight: bold; */
}
#add_department{
    margin-top:8px
}
#edit_department{
	margin-top:8px
}
	.employeeN{
	 	width:509px;
	 	display:none;
	 	border:1px solid #ccc;
	 	border-top:none;
	 	border-radius:3px;
	 	 position:absolute;
	 	 z-index:99999;
	 	 background: #fff;
	 	 overflow-y: scroll;
       max-height: 80px;
        overflow-x: hidden;
	}
	.employeeN ul {
		width:509px;
		height:30px;
		border:none;
		margin:0;
		margin-left:-40px;
		
	}
	.employeeN ul li{
		width:509px;
		height:30px;
		line-height: 30px;
		list-style-type: none;
		text-indent: 12px;
	}
	.employeeN ul li:hover{
		background-color:#dcdcdc;
	}
	#table thead{
	background-color:#364760 !important;
	color:#fff;
	font-szie:blod 14px;
}
label {
   
    font-size: 16px;
    color: #333;
}
#responsibleMan{
position:relative;
}
.btn-primary:hover {
    background-color: #ffad33;
}
 .row .btn{
margin: 16px;
}
.btn-primary {
    background-color: #089beb;
  
}
#bl{
padding-top:12px;
padding-bottom:12px;
}

#bl button{
margin-left:16px;
}

		
		
</style>

<body>
<div class="container">
	<div id="form">
		<div class="item">
			<label class="control-label">部门编号:</label> <input
				class="form-control" id="linkdepartmentCode">
		</div>
		<div class="item">
			<label class="control-label">部门名称:</label> <input
				class="form-control" id="linkdepartmentName">
		</div>
		<div class="item">
			<label class="control-label">负责人:</label> <input class="form-control"
				id="linkemployeeID">
		</div>

	</div>
	<!--功能按钮 -->
	
	<div class="row clearfix">

		<div class="col-md-3.5 column">
			<div style="float: left;width:100%;background: #9abdd0;" id="bl">
				<button id="query" onclick="find()" class="btn btn-primary"
					type="button">
					<em class="glyphicon glyphicon-search"></em> 查询
				</button>
				<button type="button" class="btn btn-primary 	glyphicon glyphicon-plus "
					data-toggle="modal" data-target="#addModal">&nbsp;新增</button>

				<button class="btn btn-primary" button" id="del"
					onclick="openModal()">
					<em class="glyphicon glyphicon-pencil"></em> 修改
				</button>

				<button class="btn btn-primary" button" id="del" onclick="delData() ">
					<em class="glyphicon glyphicon-trash"></em> 删除
				</button>

				<button class="btn btn-primary" button" id="refresh"
					onclick="query()">
					<em class="glyphicon glyphicon-refresh"></em> 全部
				</button>

			</div>
		</div>
	</div>
	
	

	<div id="addModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">添加部门</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<label>部门编码：</label>
							<input type="text" id="add_departmentCode" name="departmentCode "
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>部门名称：</label>
							<input type="text" id="add_departmentName" name="departmentName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div style="margin-top:20px" id="departin">
							<label>部门简介:</label>
							<textarea rows="7" cols="57" id="add_remarks"></textarea>
							<input id="ID" type="hidden"></input>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>科室类型：</label>
							 <select name="property" id="add_property" class="form-control" >
									<option value="0">检测</option>
									<option value="1">校准</option>
									<option value="2">其他</option>
								</select>
							</div>
						
						<div class="col-xs-12 col-md-12">
							<label>负责人：</label>
							<input type="text" id="add_responsibleMan" name="responsibleMan"
								oninput="addGetEMName()" onpropertychange="addGetEMName()" class="form-control" aria-describedby="basic-addon1" />
								<div class="employeeN">
	                   
                   </div>
						</div>
						
						
						<div class="col-xs-12 col-md-12" id="add_department">
							<span class="spanstyle">上级部门:</span>
							<div class="btn-group">
								<button type="button" onclick="getdepartment()" 
									class="btn mystyle btn-default dropdown-toggle"
									data-toggle="dropdown">
									<span id="textspan1"></span> <span
										style="position:absolute;left:175px;top:15px;" class="caret"></span>
								</button>
								<ul id="listul1" class="dropdown-menu" role="menu"
									style="width:200px;">
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="addText();">新增</button>
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
					<h4 class="modal-title">修改信息</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div style="display: none;" class="col-xs-12 col-md-12">
							<h4>流水号1：</h4>
							<input type="text" id="edit_ID" name="ID" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>部门编码：</label>
							<input type="text" id="edit_departmentCode"
								name="EdepartmentCode " class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>部门名称：</label>
							<input type="text" id="edit_departmentName"
								name="EdepartmentName" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div style="margin-top:20px"id="departin1" >
							<label>部门简介:</label>
							<textarea rows="7" cols="57" id="edit_remarks"></textarea>
							<input id="ID" type="hidden"></input>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>科室类型：</label>
							 <select name="property" id="edit_property" class="form-control" >
									<option value="0">检测</option>
									<option value="1">校准</option>
									<option value="2">其他</option>
								</select>
							</div>
						<div class="col-xs-12 col-md-12">
							<label>负责人：</label>
							<input type="text" id="edit_employee" name="Eemployee"
								oninput="editGetEMName()" onpropertychange="editGetEMName()" class="form-control" aria-describedby="basic-addon1" />
								<div class="employeeN">
	                   
                   </div>
						</div>
						<div class="col-xs-12 col-md-12"id="edit_department">
							<span class="spanstyle">上级部门:</span>
							<div class="btn-group">
								<button type="button" onclick="getdepartment1()"
									class="btn mystyle btn-default dropdown-toggle"
									data-toggle="dropdown">
									<span id="textspan2"></span> <span
										style="position:absolute;left:175px;top:15px;" class="caret"></span>
								</button>
								<ul id="listul2" class="dropdown-menu" role="menu"
									style="width:200px;">
								</ul>
							</div>
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<h4>上级部门：</h4>
							<input type="text" id="edit_parent" name="parent"
								class="form-control" aria-describedby="basic-addon1" />
						</div> -->
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="edit();">修改</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 结构树 -->
	<div id="tree" >
	  </div>
    <div id="moduleTable">
       <table id="table"></table>
    </div>
		</div>
	<script type="text/javascript">
		

		//如果有树需加上下面这样初始化树代码
		//初始化树
		$.ajax({
			type : 'POST',
			url : 'departmentController/getTree.do',
			success : function(value) {

				var trees = JSON.parse(value);
				$('#tree').treeview({
					data : trees,
					showIcon : true,
					levels : 5,
				});
			},
			dataType : 'text'
		});
	</script>
	
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

<script src="module/js/department/department.js"></script>
</html>
