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

<title>检测项目管理</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">


<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" /> 
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-select.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-select.min.css">


<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<script src="module/js/sweetalert.min.js"></script>
<script src="module/js/bootstrap-select.js"></script>
</head><style>

.choose {
	height: 300px;
	overflow-x: hidden;
	overflow-y: scroll;
	width: 290px;
}

.overChoose {
	display: none;
	height: 300px;
	left: 200px;
	margin: 0 auto;
	min-width: 124px;
	overflow: hidden;
	position: absolute;
	top: 150px;
	width: 260px;
	z-index: 9999;
	/* color: #fff; */
	background: #fff;
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
.col-xs-12 input.chooseInput,.col-md-12 input.chooseInput {
	width: 20px;
	display: inline-block;
	vertical-align: middle;
	margin-left: 70px;
}

.col-xs-12 label.fontStyle,.col-md-12 label.fontStyle {
	margin: 10px 0 0;
}
.col-md-4 input.form-control, .col-md-3 select.form-control {
	width:150px;
	display:inline-block;

}
#menu{
    background-color: rgb(232,243,249);
    padding-top: 20px;
    padding-bottom: 20px;
    width: 101%;
}
#menu button{
	margin-right:2%;
}
#menu button:hover {
  border: none;
  color: #fff;
  background-color: rgb(255, 173, 51);
}
.row .labelName{
	margin: 2%;
	text-align: center;
}
#displayChecked {
	width: 100%;
	height: 100px;
	border: 1px solid;
	overflow-y:auto;
}
#displayChecked .spanTag{
	border: 1px solid #a5d24a;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    display: block;
    float: left;
    padding: 5px;
    text-decoration: none;
    background: #cde69c;
    color: #638421;
    margin-right: 5px;
    margin-bottom: 5px;
    font-family: helvetica;
    font-size: 13px;
}
#displayChecked .spanTag a{
	font-weight: bold;
    color: #82ad2b;
    text-decoration: none;
    font-size: 11px;
}
.showEquipments{
	margin-left: 6.65%;
	position:absolute;
	width:74%;
	height:auto;
	max-height:120px;
	display:none;
	border:1px solid #ccc;
	border-top:none;
	border-radius:3px;
	background-color:#fff;
	z-index: 10;
	overflow-x:hidden;
	overflow-y:hidden;
}
.showEquipments ul {
	border:none;
	max-height:120px;
	overflow-y:auto;
	margin:0;
	margin-left:-40px;
}
.showEquipments ul li{
	height:30px;
	line-height: 30px;
	list-style-type: none;
	text-indent: 12px;
	background-color:#fff;
}
.showEquipments ul li.noDate{
 	color: red;
}
.showEquipments ul li:hover{
	background-color:#dcdcdc;
}
</style>
<body>
	<div class="container" style="width: 100%;">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<div class="row clearfix">
					<div class="col-md-12 column">
						<div class="row clearfix">
							<div class="col-md-4 column">
								<label>项目名称： </label> <input id="query_nameCnORnameEn"
									name="nameCnORnameEn" class="form-control"  type="text">
							</div>
							<div class="col-md-3 column">
								<label>所属科室： </label>
								<select id="query_departmentID" class="form-control" name="departmentID" >
									<option value="">全部</option>
								</select>
							</div>
						</div>
						<div id = "menu" class="row clearfix">
							<div class="col-md-4 column">
								<button id="query" onclick="query()" class="btn btn-primary"
									type="button">
									<em class="glyphicon glyphicon-search"></em> 查询
								</button>

								<button class="btn btn-primary" type="button" id="addmodel"
									onclick="addModal()">
									<em class="glyphicon glyphicon-plus"></em> 新增
								</button>

								<button class="btn btn-primary type=" button" id="del"
									onclick="delData()">
									<em class="glyphicon glyphicon-trash"></em> 删除
								</button>

								<button class="btn btn-primary type=" button" id="refresh"
									onclick="refresh()">
									<em class="glyphicon glyphicon-refresh"></em> 刷新
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<table id="table">
			</table>
		</div>
	</div>
	<!-- 新增弹窗 -->
	<div id="addModal" class="modal fade" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增检测项目</h4>
				</div>
				<div class="modal-body" >
					<div class="row">
						<div class="col-md-12 col-xs-12" >
							<div class="col-md-6 col-xs-6">
								<label class="labelName">中文名称</label>
								<input type=" text" id="add_NAMECN" name="NAMECN"
									class="form-control" aria-describedby="basic-addon1" />
							</div>
							<div class="col-md-6 col-xs-6">
								<label class="labelName">英文名称</label>
								<input type=" text" id="add_NAMEEN" name="NAMEEN"
									class="form-control" aria-describedby="basic-addon1" />
							<!-- 	<label class="labelName">环境要求</label>
								<input type=" text" id="add_ENVIRONMENTALREQUIREMENTS"
									name="ENVIRONMENTALREQUIREMENTS" class="form-control"
									aria-describedby="basic-addon1" /> -->
							</div>
						</div>
						<div class="col-md-12 col-xs-12">
							<label class="labelName">检测部门</label>
							<select id="add_DEPARTMENTID" name="DEPARTMENTID" class="selectpicker show-tick" multiple data-live-search="false" multiple data-selected-text-format="">
							</select>
						</div>
						
						<!-- <div class="col-md-12 col-xs-12" style="padding-bottom:10px;">
							<div class="col-md-6 col-xs-6 " >
								<label class="labelName">所需仪器</label>
								<div id="displayChecked" name="add" ></div>
							</div>
							新模式
							<div id="equipmentsBox" class = "col-md-6 col-xs-6 "  >
								<div >
									<label class="labelName">搜索查询添加仪器</label>
									<input type = "text" id ="AddsearchEquipments" name="add" class="form-control" placeholder="选择所需仪器"  onblur="hideSearch('add')" onfocus="showPartEquipment()"  oninput="searchEquipment('add')"
											onpropertychange="searchEquipment('add')"/>
								</div>
								<div   class="showEquipments" name = "add"></div>
							</div>
						</div> -->
						<div class="col-md-12 col-xs-12">
							<label class="labelName">依据标准</label>
							<select id="add_STANDARDID" name="STANDARDID" class="selectpicker show-tick" multiple data-live-search="false" multiple data-selected-text-format="">
							</select>
						</div>
						<div class="col-md-6 col-xs-6">
								<label class="labelName">检测类别</label>
								<select  id="add_type" name="type"class="form-control">
								</select>
						</div>
						
						<div class="col-md-12 col-xs-12 ">
							<label class="labelName">标准描述</label>
							<textarea  id="add_DESCRIBE" name="DESCRIBE"
								class="form-control" aria-describedby="basic-addon1"></textarea>
						</div>
						<div class="col-md-12 col-xs-12 ">
								<label class="labelName">　备注　</label>
								<textarea  id="add_REMARKS" name="REMARKS"
								class="form-control" aria-describedby="basic-addon1"></textarea>
						</div>	
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary"
						onclick="addTestProject()">新增</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 修改弹窗 -->
	<div class="modal fade" id="editModal" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">检测项目修改</h4>
				</div>
					<div class="row">
						<div class="col-md-12 col-xs-12 ">
						 		<!-- 检测项目id -->
							<input type=" hidden" id="edit_testProjectID" name="testProjectID"
								class="form-control" aria-describedby="basic-addon1" style="display: none;" />
								<!-- 检测标准id --> 
							<input type=" hidden" id="edit_testStandardID" name="testStandardID"
								class="form-control" aria-describedby="basic-addon1" style="display: none;" />
							<input type=" hidden" id="edit_testDepartmentID" name="testDepartmentID"
								class="form-control" aria-describedby="basic-addon1" style="display: none;" />
								<!-- 检测仪器id  -->
							<!-- <input type=" hidden" id="edit_testInstumentID" name="testInstumentID"
								class="form-control" aria-describedby="basic-addon1" style="display: none;" /> -->
							<div  class="col-md-6 col-xs-6">
								<label class="labelName">中文名称</label>
								<input type=" text" id="edit_NAMECN" name="NAMECN"
									class="form-control" aria-describedby="basic-addon1" />
							</div>
							<div class="col-md-6 col-xs-6">
								<label class="labelName">英文名称</label>
								<input type=" text" id="edit_NAMEEN" name="NAMEEN"
									class="form-control" aria-describedby="basic-addon1" />
							</div>
							
						</div>	
						<div class="col-md-12 col-xs-12">
							<label class="labelName">检测部门</label>
							<select id="edit_DEPARTMENTID" name="DEPARTMENTID" class="selectpicker show-tick" multiple data-live-search="false" multiple data-selected-text-format="">
							</select>
						</div>
						<!-- <div class="col-md-12 col-xs-12" style="padding-bottom:10px;">
							<div class="col-md-6 col-xs-6 " >
								<label class="labelName">所需仪器</label>
								<div id="displayChecked" name="edit"></div>
							</div>
							<div id="equipmentsBox" class = "col-md-6 col-xs-6 "  >
								<div >
									<label class="labelName">搜索查询添加仪器</label>
									<input type = "text" id ="EditsearchEquipments" name ="edit" class="form-control" placeholder="选择所需仪器" onblur="hideSearch('edit')" onfocus="showPartEquipment()"  oninput="searchEquipment('Edit')"
											onpropertychange="searchEquipment('Edit')"/>
								</div>
								<div   class="showEquipments" name="edit" ></div>
							</div>
						</div> -->
					
					<div class="col-md-12 col-xs-12">
							<label class="labelName">依据标准</label>
							<select id="edit_STANDARDID" name="STANDARDID" class="selectpicker show-tick" multiple data-live-search="false" multiple data-selected-text-format="">
							</select>
						</div>
					<div class="col-md-6 col-xs-6">
							<label class="labelName">检测类别</label>
							<select  id="edit_type" name="type"class="form-control">
							</select>
					</div>
					<div class="col-md-12 column">
						<label class="labelName">标准描述</label>
						<textarea type=" text" id="edit_DESCRIBE" name="DESCRIBE"
							class="form-control" aria-describedby="basic-addon1" ></textarea>
						<label>　备注　</label>
						<textarea type=" text" id="edit_REMARKS" name="REMARKS"
							class="form-control" aria-describedby="basic-addon1"></textarea>
					</div>
				</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" onclick="editTestProject()">确定</button>
			</div>
		</div>
	</div>
	</div>
<script src="module/js/testProject/testProject.js"></script>
</body>
</html>
