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

<title>注册页面</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" type="text/css"
	href="Portal/css/register/register.css">
<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
	href="Portal/css/comment/reset.css">
<link rel="stylesheet" type="text/css"
	href="Portal/css/comment/comment.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<link rel="stylesheet" type="text/css"
	href="module/css/fileManage/fileManage.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="Portal/js/fileManage/fileManage.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/sweetalert.min.js"></script>
<script src="Portal/js/comment/comment.js"></script>
<script type="text/javascript" src="Portal/js/register/register.js"></script>


</head>

<body>
	<!-- 隐藏的input -->
	<input type="text" id="idCard1" name="idCard1" style="display: none"
		value=""></input>
	<input type="text" id="idCard2" name="idCard2" style="display: none"
		value=""></input>
	<input type="text" id="name" name="name" style="display: none"
		value=<%=session.getAttribute("clientNo")%>></input>
	<div id="login_box" class="login_box">
		<a class="close">×</a>
		<div class="show_logo container2">
			<a class="logo_small" href="Portal/jsp/homePage/homePage.jsp"> <img
				src="Portal/images/show_logo.png" /></a>
		</div>
		<form class="form-signin container2" role="form" action="#"
			method="post">
			<input type="text" class="form-control" id="clientNo" name="clientNo"
				placeholder="用户名" autocomplete="off" /> <input type="text"
				class="form-control" id="password" name="password" placeholder="密码"
				onfocus="this.type='password'" />
			<!--<div class="check_box">
			    <input type="checkbox" value="remember-me"> 记住密码
				<a href="Portal/jsp/register/findPassword.jsp" ><small>找回密码</small></a>
			</div>-->
			<button class="btn btn-lg btn-block" type="button" onclick="login()">登录</button>
			<a href="Portal/jsp/register/findPassword.jsp" class="findPassword"><small>找回密码</small></a>
		</form>
	</div>
	<div id="imask"></div>
	<div class="main">
		<div class="header content">
			<!--头部图片加导航栏-->
			<div class="logoline">
				<a class="logo" href="Portal/jsp/homePage/homePage.jsp"><img
					src="Portal/images/logo.png" /></a>
			</div>
			<div class="line">
				<ul class="tittleline clearfloat">
					<li class="item"><a class="item-inner"
						href="Portal/jsp/homePage/homePage.jsp">首页</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/classicCase/ClassicCase.jsp">典型案例</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/newsPage/newsPage.jsp">新闻中心</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/selfApplication/applied.jsp">自助申请</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/onlineQuery/onlineQuery.jsp">在线查询</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/aboutUs/Introduction.jsp">关于我们</a></li>
				</ul>
				<div class="right-linne clearfloat" id="loginDivOne">
					<a class="register" href="Portal/jsp/register/register.jsp">注册</a>
					<a class="h-login" href="javascript:void(0)"
						onclick="document.getElementById('home-login').scrollIntoView();">登录</a>
				</div>
				<div class="right-linne clearfloat" id="loginDivTwo"
					style="display: none;">
					<p class="h-login" onclick="logout()">注销</p>
					<p class="register" id="loginA"></p>
					<div class="ulDiv" id="ulDiv" style="display: none">
						<ul>
							<li><a href="Portal/jsp/register/personalCenter.jsp">个人信息</a></li>
							<li><a href="Portal/jsp/register/changePassword.jsp">修改密码</a></li>
							<li><a href="Portal/jsp/register/findPassword.jsp">找回密码</a></li>
						</ul>
					</div>
				</div>
			</div>

		</div>
		<div class="container">
			<div class="title">
				<h4>&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到注册页面,请如实填写个人信息</h4>
			</div>
			<div class="container1">
				<div class="form">
					<form class="form-horizontal" role="form">

						<div class="form-group">
							<label for="clientNo1" class="col-sm-2 control-label">账&nbsp;号</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="clientNo1"
									name="clientNo1" placeholder="请输入账号" onblur="upperCase()"
									onclick="createInput()">
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="clientNoPrompt"></label>
						</div>


						<div class="form-group">
							<label for="password1" class="col-sm-2 control-label">密&nbsp;码</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="password1"
									placeholder="请输入密码" maxlength="16" onblur="passwordCase()"
									onclick="passwordInput()" onfocus="this.type='password'" />
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="passwordPrompt"></label>
						</div>

						<div class="form-group">
							<label for="companyID" class="col-sm-2 control-label">公司名称</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="companyID"
									placeholder="请输入公司名称" onblur="companyCase()"
									onclick="companyInput()">
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="companyPrompt"></label>
						</div>

						<div class="form-group">
							<label for="mobilePhone" class="col-sm-2 control-label">通讯地址</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="mobilePhone"
									placeholder="请输入通讯地址" onblur="mobileCase()"
									onclick="mobileInput()">
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="mobilePrompt"></label>
						</div>



						<div class="form-group">
							<label for="businessLicence" class="col-sm-2 control-label">执照图</label>
							<div class="col-sm-2">
								<button class="btn btn-info" type="button" id="addmodel"
									onclick="openModal(1)">
									<em class="glyphicon glyphicon-plus"></em> 上传
								</button>
							</div>
							<label for="firstname" class="col-sm-3 control-label1"></label> <label
								for="firstname" class="col-sm-3 control-label1"
								id="licensePrompt" style="margin-left:50px;"></label>

						</div>

						<div class="form-group">
							<label for="firstname" class="col-sm-2 control-label">资质图</label>
							<div class="col-sm-2">
								<button class="btn btn-info" type="button" id="addmodel"
									onclick="openModal(2)">
									<em class="glyphicon glyphicon-plus"></em> 上传
								</button>
							</div>
							<label for="firstname" class="col-sm-3 control-label1"></label> <label
								for="firstname" class="col-sm-3 control-label1"
								id="aptitudePrompt" style="margin-left:50px;"></label>
						</div>

						<div class="form-group">
							<label for="fixedTelephone" class="col-sm-2 control-label">联系电话</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="fixedTelephone"
									placeholder="请输入联系电话" onblur="fixedCase()"
									onfocus="fixedInput()">
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="fixedPrompt"></label>
						</div>

						<div class="form-group">
							<label for="scope" class="col-sm-2 control-label">经营范围</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="manage"
									placeholder="请输入经营范围" onblur="manageCase()"
									onfocus="manageInput()">
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="managePrompt"></label>
						</div>

						<div class="form-group">
							<label for="legal" class="col-sm-2 control-label">法定代表</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="representative"
									placeholder="请输入法定代表" onblur="representativeCase()"
									onfocus="representativeInput()">
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="representativePrompt"></label>
						</div>

						<div class="form-group">
							<label for="linkMan" class="col-sm-2 control-label">代理人</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="linkman"
									placeholder="请输入代理人" onblur="linkmanCase()"
									onfocus="linkmanInput()">
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="linkmanPrompt"></label>
						</div>

						<div class="form-group">
							<label for="type" class="col-sm-2 control-label" maxlength="1">公司类型</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="companyType"
									placeholder="请输入公司类型" onblur="companyTypeCase()"
									onfocus="companyTypeInput()">
							</div>
							<label class="col-sm-3 control-label1" id="companyTypePrompt"></label>
						</div>

						<div class="form-group">
							<label for="email" class="col-sm-2 control-label">公司邮箱</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="email"
									placeholder="请输入公司邮箱" onblur="emailCase()"
									onfocus="emailInput()">
							</div>
							<label class="col-sm-3 control-label1" id="emailPrompt"></label>
						</div>

						<div class="form-group">
							<label for="fax" class="col-sm-2 control-label">公司传真</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="fax"
									placeholder="请输入公司传真" onblur="faxCase()" onfocus="faxInput()">
							</div>
							<label class="col-sm-3 control-label1" id="faxPrompt"></label>
						</div>

						<div class="form-group">
							<label for="remarks" class="col-sm-2 control-label">备注</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="remarks"
									placeholder="请输入备注">
							</div>
							<label for="firstname1" class="col-sm-3 control-label1"
								id="remarksPrompt"></label>
						</div>

						<div class="form-group">
							<div class="col-sm-2 col-sm-offset-2">
								<button type="button" class="btn btn-primary btn-lg btn-block"
									onclick="add()">提交</button>
							</div>
						</div>
					</form>
				</div>
			</div>

			<div class="container2">
				<img src="Portal/images/woman_pic.png">
			</div>
		</div>

	</div>



	<div class="footer content">
		<!--尾部  -->
		<p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
		<p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>
	</div>

	<!--弹框 -->
	<div id="addModal" class="modal fade" role="dialog"
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
					<input type="hidden" id="EMPLOYEEID"
						value="<%=session.getAttribute("EMPLOYEEID")%>" />
					<div class="row">
						<div class="col-md-6 column">
							<label>图片名称：</label> <input type="text" id="add_TemplateName"
								name="TemplateName" class="form-control" />
						</div>
					</div>
					<div class="row">
						<div id="files">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								multiple="multiple" />
							<div class="col-md-12 column">
								<label>备注信息</label>
								<textarea id="add_TemplateRemarks" name="TemplateReamarks"
									class="form-control"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure" onclick="upfile();">确定</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
