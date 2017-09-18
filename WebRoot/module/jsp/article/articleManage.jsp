<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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

<title>文章管理</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

<link rel="stylesheet" href="module/css/bootstrap.min.css"
	type="text/css"></link>
<link rel="stylesheet" href="module/css/bootstrap.css" type="text/css"></link>
<link rel="stylesheet" href="module/css/bootstrap-table.css"
	type="text/css"></link>
<link rel="stylesheet" href="module/css/bootstrap-theme.min.css"
	type="text/css"></link>
<link type="text/css" rel="stylesheet"
	href="PorUeditor/themes/default/css/ueditor.css" />
<link type="text/css" rel="stylesheet" href="module/css/fileinput.css" />
<link type="text/css" rel="stylesheet"
	href="PorUeditor/third-party/SyntaxHighlighter/shCoreDefault.css" />
<link rel="stylesheet" href="module/css/article/articleManage.css"
	type="text/css"></link>
	
<script type="text/javascript" src="module/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="module/js/article/articleManage.js"></script>
<script type="text/javascript" src="module/js/bootstrap.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table.js"></script>
<script type="text/javascript" src="module/js/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript" src="module/js/fileinput.js"></script>
<script type="text/javascript" src="module/js/zh.js"></script>
<script type="text/javascript" src="module/js/article/articleProcess.js"></script>
<script type="text/javascript" src="PorUeditor/ueditor.config.js"></script>
<script type="text/javascript" src="PorUeditor/ueditor.all.js"></script>

</head>

<body>
	<div class="wrapper">
		<form class="form-inline" role="form">
			<div class="input-group col-xs-12 col-md-3" style="width:250px">
				<span class="input-group-addon">文章栏目</span> <select
					class="form-control" id="search_artColumn">
					<option>检测案例</option>
					<option>新闻中心</option>
					<option>实验室简介</option>
					<option>荣誉资质</option>
				</select>
			</div>
			<div class="input-group col-xs-12 col-md-4" style="width:320px">
				<span class="input-group-addon">文章名称</span> <input type="text"
					class="form-control" id="search_artTitle" placeholder="请输入要搜索的文章名称">
			</div>
			<div class="input-group col-xs-12 col-md-4" style="width:320px">
				<span class="input-group-addon">发布人</span> <input type="text"
					class="form-control" id="search_artPublisher"
					placeholder="请输入要搜索的文章发布人">
			</div>
			<button type="button" id="artSearch" style="margin-left:50px"class="btn btn-primary glyphicon glyphicon-search"
				onclick="search()">&nbsp;查询</button>
		</form>
		<div class="mainTableDate">
			<div class="form-group">
				<button type="button" id="artShow"
					class="btn btn-sm btn-primary glyphicon glyphicon-check"
					onclick="showModal()">&nbsp;查看</button>
				<button type="button" id="artAdd"
					class="btn btn-sm btn-primary glyphicon glyphicon-plus"
					data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
				<button type="button" id="artEdit"
					class="btn btn-sm btn-primary glyphicon glyphicon-edit"
					onclick="openModal()">&nbsp;修改</button>
				<button type="button" id="artDel"
					class="btn btn-sm btn-primary glyphicon glyphicon-remove"
					onclick="del()">&nbsp;刪除</button>
				<button type="button" id="artView" class="btn btn-primary glyphicon"
					onclick="view()">全部数据</button>
			</div>
			<table id="table" class="table">
			</table>
		</div>
		
		<!-- 新增弹框 -->
		<div id="addModal" class="modal fade" role="dialog"
			aria-labelledby="gridSystemModalLabel">
			<div class="modal-dialog" role="document" style = "width:980px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">新增文章</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-xs-12 col-md-6" style="float:left;">
								<label>文章栏目:</label> <select class="form-control"
									id="add_artColumn">
									<option></option>
									<option>新闻中心</option>
									<option>检测案例</option>
									<option>实验室简介</option>
									<option>荣誉资质</option>
								</select>
							</div>
							<div id="rightFormDiv"
								style="float:right;margin-right:30px;margin-top:30px;">
								<div id="imgAreaDiv"
									style="width: 250px;height: 150px;margin-bottom:10px;">						
										<img id="weixin_show" style="height:100%;width: 100%;"  src="module/img/file/defaultPhoto.jpg" data-holder-rendered="true">  
								</div>
								
								 <input id="upload" type="button" value="上传"
									style="width: 66px;height: 25px;margin-left:30px;" /> <input
									id="imgUpload" type="file" name="file"
									onchange="previewImage(this,'weixin_show')"
									 multiple
									accept="image/png, image/gif, image/jpg, image/jpeg"
									style="width: 66px;height: 25px;position: absolute;left: 10px;top: 155px;opacity: 0;filter:alpha(opacity=0);" />
								<input type="button" id="emptyImage" value="清空"
									style="width: 66px;height: 25px;" /> 
								<!-- 用户存储FileID -->
								<input name="artPicturegis" id="artPicturegis" style="display: none;" />
							</div>
							<div class="col-xs-12 col-md-6" style="float:left;">
								<label>文章名称:</label> <input class="form-control"
									id="add_artTitle" />
							</div>
							<div class="col-xs-12 col-md-6 add_artCaseType"
								style="float:left;">
								<label>案例类型:</label> <select class="form-control"
									id="add_artCaseType">
									<option>典型案例</option>
									<option>普通案例</option>
								</select>
							</div>

							<div class="col-xs-12 col-md-12">
								<label>内容:</label>
								<div name="add_artContent" id="add_artContent"></div>
							</div>
							<div class="col-xs-12 col-md-12">
								<label>备注:</label>
								<textarea id="add_artRemark" name="add_artRemark"
									class="col-xs-12 col-md-12" rows="5"></textarea>
							</div>
						</div>

					</div>
					<div class="modal-footer">
						<button id="addarticle" type="button" class="btn btn-primary sure">新增</button>
						<button type="button" class="btn btn-default newButton" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 查看弹框 -->
		<div id="showModal" class="modal fade" role="dialog"
			aria-labelledby="gridSystemModalLabel">
			<div class="modal-dialog" role="document" style = "width:980px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">查看文章</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-xs-12 col-md-6" style="float:left;">
								<label>文章栏目:</label> <select class="form-control"
									id="show_artColumn" aria-describedby="basic-addon1">
									<option></option>
								</select>
							</div>
							<div id="show_artPicturegis" class="form-control col-xs-12 col-md-6 " style="height:150px;width: 250px;margin-bottom:8px;float:right;margin-right:30px;margin-top:30px;">
							   <img id="show-image" style="height:100%;width: 100%;"  src="module/img/file/defaultPhoto.jpg" data-holder-rendered="true">  
							 </div>
							<div class="col-xs-12 col-md-6 " style="float:left;">
								<label>文章名称:</label> <input class="form-control"
									id="show_artTitle" disabled />
							</div>
							<div class="col-xs-12 col-md-6 show_artCaseType" style="float:left;">
								<label>案例类型:</label> <select class="form-control"
									id="show_artCaseType">
									<option></option>
								</select>
							</div>
							
							<div class="col-xs-12 col-md-12">
								<label>内容:</label>
								<div name="artContent" id="show_artContent" disabled></div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default sure" data-dismiss="modal">确定</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 修改弹框 -->
		<div id="editModal" class="modal fade" role="dialog"
			aria-labelledby="gridSystemModalLabel">
			<div class="modal-dialog" role="document" style = "width:980px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">修改文章</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<!-- 隐藏文章ID -->
							<input id="edit_articleID" style="display:none;" />
							<div class="col-xs-12 col-md-6" style="float:left;">
								<label>文章栏目:</label> <select class="form-control"
									id="edit_artColumn">
									<option></option>
									<option>检测案例</option>
									<option>新闻中心</option>
									<option>实验室简介</option>
									<option>荣誉资质</option>
								</select>
							</div>
							<div id="edit_artPicturegis" class="form-control col-xs-12 col-md-6 " style="height:150px;width: 250px;margin-bottom:8px;float:right;margin-right:30px;margin-top:30px;">
							    <img id="edit-image" style="height:100%;width: 100%;"  src="module/img/file/defaultPhoto.jpg" data-holder-rendered="true">  
							</div>
							<div class="col-xs-12 col-md-6" style="float:left;">
								<label>文章名称:</label> <input class="form-control"
									id="edit_artTitle" />
							</div>
							<div class="col-xs-12 col-md-6 edit_artCaseType" >
								<label>案例类型:</label> <select class="form-control"
									id="edit_artCaseType">
									<option>典型案例</option>
									<option>热门案例</option>
									<option>普通案例</option>
								</select>
							</div>
							<div class="col-xs-12 col-md-12">
								<label>内容:</label>
								<div name="artContent" id="edit_artContent"></div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary sure" onclick="edit()">修改</button>
						<button type="button" class="btn btn-default newButton" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script>
	<script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
	<script type="text/javascript">
	   //var $THUMBNAIL = $('#THUMBNAIL');
		$("#emptyImage").click(function() {
		//$('#imgAreaDiv').css("background-image","url(module/img/file/defaultPhoto.jpg)");
			$('#weixin_show').attr("src", "module/img/file/defaultPhoto.jpg");
			//$THUMBNAIL.val("");
		});

		$("#upload").click(function() {
			$('#imgUpload').click();
		});
	</script>
</body>
</html>
