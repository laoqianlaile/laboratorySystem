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

<title>西计实验室管理系统</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css"
	href="module/css/moduleManage/moduleManage.css">


<link rel="stylesheet" type="text/css" href="module/css/jquery.fonticonpicker.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/fontello-7275ca86/css/fontello.css" />
<link rel="stylesheet" type="text/css" href="module/css/themes/grey-theme/jquery.fonticonpicker.grey.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/themes/dark-grey-theme/jquery.fonticonpicker.darkgrey.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/themes/bootstrap-theme/jquery.fonticonpicker.bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/themes/inverted-theme/jquery.fonticonpicker.inverted.min.css" />

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-treeview.js"></script>
<script src="module/js/moduleManage/jquery.fonticonpicker.min.js"></script>
<script src="assets/js/autoPage.js"></script>
<style type="text/css">
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
	min-width:1200px;
/* 	float: left;
	margin-left: 40px; */
}
#tree{
min-width: 300px;
width:20%;
float:left ;
}
#moduleTable{
    min-width: 1200px;
    /* float: left; */
    margin-left: 10px;
    display: inline-block;
    width: 79%;
    margin-top: 10px;
}
.container{
   margin : 0 auto;
  min-width: 1600px;
  width: 100%;
}
.btn-primary{
margin-left: 3px;
} 
.fixed-table-body #table .bs-checkbox {
vertical-align: middle;
}   
</style>
</head>

<body>

	<!-- 功能按钮 -->
	<div class="container">
	<div class="input-group" style="float: right;margin-right: 10px">
		<button type="button" class="btn btn-primary glyphicon glyphicon-plus"
			data-toggle="modal" data-target="#addModal"
			onclick="sel('#add_PARENT')">&nbsp;新增</button>
		<button type="button" onclick="showModal()"
			class="btn btn-primary glyphicon glyphicon-show">&nbsp;查看</button>
		<button type="button" onclick="openModal()"
			class="btn btn-primary glyphicon glyphicon-edit">&nbsp;修改</button>
		<button id="del" onclick="delData()" type="button"
			class="btn btn-primary glyphicon glyphicon-remove">&nbsp;删除</button>
		<button id="refresh" onclick="refresh()" type="button"
			class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
	</div>

	<!-- 新增弹框 -->
	<div id="addModal" class="modal fade" module="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" module="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>模块名称：</h4>
							<input type="text" id="add_TEXT" name="TEXT" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>href：</h4>
							<input type="text" id="add_HREF" name="HREF" class="form-control"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>所属模块：</h4>
							<select id="add_PARENT" name="PARENT" class="form-control"
								aria-describedby="basic-addon1">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>图标：</h4>
							<input id="add_ICON" name="add_ICON" class="form-control"
								aria-describedby="basic-addon1">
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>是否展示：</h4>

							<select id="add_ISSHOW" name="ISSHOW" class="form-control"
								aria-describedby="basic-addon1">
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="add()">新增</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 查看弹框 -->
	<div id="showModal" class="modal fade" module="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog"="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">查看</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>模块名：</h4>
							<input type="text" id="show_TEXT" name="TEXT"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>href：</h4>
							<input type="text" id="show_HREF" name="HREF"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">

							<h4>所属模块：</h4>
							<input type="text" id="show_PARENT" name="PARENT"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">

							<h4>图标：</h4>
							<i  id="show_icon" name="show_icon" 
								class="form-control" aria-describedby="basic-addon1" ></i>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>是否展示：</h4>
							  <input  type="text" id="show_ISSHOW" name="ISSHOW" class="form-control" aria-describedby="basic-addon1"/> 

						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">确定</button>
					<!--  <button type="button" class="btn btn-primary" onclick="edit()">修改</button> -->
				</div>
			</div>
		</div>
	</div>

	<!-- 修改弹框 -->
	<div id="editModal" class="modal fade" module="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" module="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>模块名：</h4>
							<input type="text" id="edit_TEXT" name="TEXT"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>所属模块：</h4>
							<select id="edit_PARENT" name="PARENT" class="form-control"
								aria-describedby="basic-addon1">
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>href：</h4>
							<!--  <input  type="text" id="edit_PARENT" name="PARENT" class="form-control" aria-describedby="basic-addon1"/> -->
							<input id="edit_HREF" name="edit_HREF" class="form-control" type="text"
								aria-describedby="basic-addon1">
							
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>图标：</h4>
							<input type="text" id="edit_ICON" name="edit_ICON"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>是否展示：</h4>
							<select id="edit_ISSHOW" name="ISSHOW" class="form-control"
								aria-describedby="basic-addon1">
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="edit()">修改</button>
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
		jQuery(document).ready(
				function($) {
					$('edit_ICON').fontIconPicker();
					$('#edit_ICON').fontIconPicker(
							{
								theme : 'fip-bootstrap',
								source : [ "glyphicon glyphicon-ban-circle",
										"glyphicon glyphicon-backward",
										"glyphicon glyphicon-asterisk",
										"icon-mail-alt", "icon-heart",
										"icon-heart-empty", "icon-star",
										"icon-star-empty", "icon-star-half",
										"icon-star-half-alt", "icon-user",
										"icon-users", "icon-male",
										"icon-female", "icon-video",
										"icon-videocam", "icon-picture",
										"icon-camera", "icon-camera-alt",
										"icon-th-large", "icon-th",
										"icon-th-list", "icon-ok",
										"icon-ok-circled", "icon-ok-circled2",
										"icon-ok-squared", "icon-cancel",
										"icon-cancel-circled",
										"icon-cancel-circled2", "icon-plus",
										"icon-plus-circled",
										"icon-plus-squared",
										"icon-plus-squared-small",
										"icon-minus", "icon-minus-circled",
										"icon-minus-squared",
										"icon-minus-squared-alt",
										"icon-minus-squared-small",
										"icon-help", "icon-help-circled",
										"icon-info-circled", "icon-info",
										"icon-home", "icon-link",
										"icon-unlink", "icon-link-ext",
										"icon-link-ext-alt", "icon-attach",
										"icon-lock", "icon-lock-open",
										"icon-lock-open-alt", "icon-pin",
										"icon-eye", "icon-eye-off", "icon-tag",
										"icon-tags", "icon-bookmark",
										"icon-bookmark-empty", "icon-flag",
										"icon-flag-empty",
										"icon-flag-checkered",
										"icon-thumbs-up", "icon-thumbs-down",
										"icon-thumbs-up-alt",
										"icon-thumbs-down-alt",
										"icon-download", "icon-upload",
										"icon-download-cloud",
										"icon-upload-cloud", "icon-reply",
										"icon-reply-all", "icon-forward",
										"icon-quote-left", "icon-quote-right",
										"icon-code", "icon-export",
										"icon-export-alt", "icon-pencil",
										"icon-pencil-squared", "icon-edit",
										"icon-print", "icon-retweet",
										"icon-keyboard", "icon-gamepad",
										"icon-comment", "icon-chat",
										"icon-chat-empty", "icon-bell",
										"icon-bell-alt", "ion-android-alert",
										"ion-android-apps" ],
								emptyIcon : true,//是否显示空
								emptyIconValue : "none",//空值
								iconsPerPage : 30, //每页显示图标的个数，默认20
								hasSearch : true,//是否显示试试框，默认true
							}); // Load with default options
				});

		jQuery(document).ready(
				function($) {
					$('add_ICON').fontIconPicker();
					$('#add_ICON').fontIconPicker(
							{
								theme : 'fip-bootstrap',
								source : [ "icon-music", "icon-search",
										"icon-mail", "icon-mail-alt",
										"icon-heart", "icon-heart-empty",
										"icon-star", "icon-star-empty",
										"icon-star-half", "icon-star-half-alt",
										"icon-user", "icon-users", "icon-male",
										"icon-female", "icon-video",
										"icon-videocam", "icon-picture",
										"icon-camera", "icon-camera-alt",
										"icon-th-large", "icon-th",
										"icon-th-list", "icon-ok",
										"icon-ok-circled", "icon-ok-circled2",
										"icon-ok-squared", "icon-cancel",
										"icon-cancel-circled",
										"icon-cancel-circled2", "icon-plus",
										"icon-plus-circled",
										"icon-plus-squared",
										"icon-plus-squared-small",
										"icon-minus", "icon-minus-circled",
										"icon-minus-squared",
										"icon-minus-squared-alt",
										"icon-minus-squared-small",
										"icon-help", "icon-help-circled",
										"icon-info-circled", "icon-info",
										"icon-home", "icon-link",
										"icon-unlink", "icon-link-ext",
										"icon-link-ext-alt", "icon-attach",
										"icon-lock", "icon-lock-open",
										"icon-lock-open-alt", "icon-pin",
										"icon-eye", "icon-eye-off", "icon-tag",
										"icon-tags", "icon-bookmark",
										"icon-bookmark-empty", "icon-flag",
										"icon-flag-empty",
										"icon-flag-checkered",
										"icon-thumbs-up", "icon-thumbs-down",
										"icon-thumbs-up-alt",
										"icon-thumbs-down-alt",
										"icon-download", "icon-upload",
										"icon-download-cloud",
										"icon-upload-cloud", "icon-reply",
										"icon-reply-all", "icon-forward",
										"icon-quote-left", "icon-quote-right",
										"icon-code", "icon-export",
										"icon-export-alt", "icon-pencil",
										"icon-pencil-squared", "icon-edit",
										"icon-print", "icon-retweet",
										"icon-keyboard", "icon-gamepad",
										"icon-comment", "icon-chat",
										"icon-chat-empty", ],
								emptyIcon : true,//是否显示空
								emptyIconValue : "none",//空值
								iconsPerPage : 30, //每页显示图标的个数，默认20
								hasSearch : true,//是否显示试试框，默认true
							}); // Load with default options
				});

		//如果有树需加上下面这样初始化树代码
		//初始化树
		$.ajax({
			type : 'POST',
			url : 'moduleController/getTree.do',
			success : function(value) {

				var trees = JSON.parse(value);
				$('#tree').treeview({
					data : trees,
					showIcon : true,
					levels : 2
				});
			},
			dataType : 'text'
		});
	</script>

	
	

	

</body>

<script src="module/js/moduleManage/moduleManage.js"></script>

</html>
