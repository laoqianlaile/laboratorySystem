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
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<script src="module/js/sweetalert.min.js"></script>
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
									name="nameCnORnameEn" class="form-control" oninput="query()"
									onpropertychange="query()" type="text">
							</div>
							<div class="col-md-3 column">
								<label>所属科室： </label>
								<select id="query_departmentID" class="form-control" name="departmentID" oninput="query()"
									onpropertychange="query()">
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
									onclick="reSetRefresh()">
									<em class="glyphicon glyphicon-refresh"></em> 刷新
								</button>
							</div>
						</div>
					</div>
				</div>
				<table id="table">
				</table>
			</div>
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
				<div>
					<div class="col-md-12">
						<div class="col-md-6 column">
							<h4>中文名称：</h4>
							<input type=" text" id="add_NAMECN" name="NAMECN"
								class="form-control" aria-describedby="basic-addon1" />
							<h4>所属科室：</h4>
							<select class="form-control" id="add_DEPARTMENTID"
								name="DEPARTMENTID"></select>
							<h4>所属标准：</h4>
							<select class="form-control" id="add_STANDARDID"
								name="STANDARDID"></select>
						</div>
						<div class="col-md-6 column">
							<h4>英文名称：</h4>
							<input type=" text" id="add_NAMEEN" name="NAMEEN"
								class="form-control" aria-describedby="basic-addon1" />
							<h4>环境要求：</h4>
							<input type=" text" id="add_ENVIRONMENTALREQUIREMENTS"
								name="ENVIRONMENTALREQUIREMENTS" class="form-control"
								aria-describedby="basic-addon1" />

						</div>
					</div>
					<div class="col-md-12 column">
						<h4>标准描述：</h4>
						<input type=" text" id="add_DESCRIBE" name="DESCRIBE"
							class="form-control" aria-describedby="basic-addon1" />
						<h4>备注：</h4>
						<input type=" text" id="add_REMARKS" name="REMARKS"
							class="form-control" aria-describedby="basic-addon1" />
					</div>	
					<div class="col-xs-12 col-md-12">
						<h4>所需仪器：</h4>
						<textarea id= "addTestProject" rows="6" cols="30" class="testProjectName" placeholder="选择所需仪器"></textarea>
					</div>
					
					<!-- 所需仪器 -->
					<div class="over" id ="addOver">
						<div class="overChoose">
							<!-- 隐藏滑动条 -->
							<div class="choose">
								<div class="row">
								</div>
							</div>
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
				<div>
					<div class="col-md-12">
						<div class="col-md-6 column">
						 	<!--	检测项目id  -->
							<input type=" text" id="edit_testProjectID" name="testProjectID"
								class="form-control" aria-describedby="basic-addon1" style="display: none;" />
							<!--	检测标准id  -->
							<input type=" text" id="edit_testStandardID" name="testStandardID"
								class="form-control" aria-describedby="basic-addon1" style="display: none;" />
							<!--	检测仪器id  -->
							<input type=" text" id="edit_testInstumentID" name="testInstumentID"
								class="form-control" aria-describedby="basic-addon1" style="display: none;" />
								
							<h4>中文名称：</h4>
							<input type=" text" id="edit_NAMECN" name="NAMECN"
								class="form-control" aria-describedby="basic-addon1" />
							<h4>所属科室：</h4>
							<select class="form-control" id="edit_DEPARTMENTID"
								name="DEPARTMENTID"></select>
							<h4>所属标准：</h4>
							<select class="form-control" id="edit_STANDARDID"
								name="STANDARDID"></select>
						</div>
						<div class="col-md-6 column">
							<h4>英文名称：</h4>
							<input type=" text" id="edit_NAMEEN" name="NAMEEN"
								class="form-control" aria-describedby="basic-addon1" />
							<h4>环境要求：</h4>
							<input type=" text" id="edit_ENVIRONMENTALREQUIREMENTS"
								name="ENVIRONMENTALREQUIREMENTS" class="form-control"
								aria-describedby="basic-addon1" />

						</div>
					</div>
					<div class="col-md-12 column">
						<h4>标准描述：</h4>
						<input type=" text" id="edit_DESCRIBE" name="DESCRIBE"
							class="form-control" aria-describedby="basic-addon1" />
						<h4>备注：</h4>
						<input type=" text" id="edit_REMARKS" name="REMARKS"
							class="form-control" aria-describedby="basic-addon1" />
					</div>
					<div class="col-xs-12 col-md-12">
						<h4>所需仪器：</h4>
						<textarea id= "editTestProject" rows="6" cols="30" class="testProjectName" placeholder="选择所需仪器"></textarea>
					</div>
					
					<!-- 所需仪器 -->
					<div class="over" id ="editOver">
						<div class="overChoose">
							<!-- 隐藏滑动条 -->
							<div class="choose">
								<div class="row">
									
								</div>
							</div>
						</div>
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
