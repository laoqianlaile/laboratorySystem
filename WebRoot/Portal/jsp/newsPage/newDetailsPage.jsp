<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String ID = request.getParameter("articleID");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <base href="<%=basePath%>">
    
    <title>新闻中心详情</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/newsPage/newDetialsPage.css">
	
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
    <script src="Portal/js/comment/comment.js"></script>
    <script src="Portal/js/newsPage/newDetialsPage.js"></script>
  </head>
    

  
  <body>
  <!-- 隐藏ID -->
  <input type = "text" id ="name" name="name" style="display: none" value=<%=session.getAttribute("clientNo")%>></input>
  <input id="articleID" type="text" value="<%=ID %>" style="display:none;">
  <div id="login_box" class="login_box">
        <a class="close">×</a>
	    <div class="show_logo container2">
		    <a class="logo_small" href="Portal/jsp/homePage/homePage.jsp">
		    <img src="Portal/images/show_logo.png"/></a>
	    </div>
	    <form class="form-signin container2" role="form" action="#" method="post">
			<input type="text" class="form-control" id="clientNo" name="clientNo" placeholder="用户名" autocomplete="off" />
			<input type="text" class="form-control" id="password" name="password" placeholder="密码" onfocus="this.type='password'"/>
		   <!--<div class="check_box">
			    <input type="checkbox" value="remember-me"> 记住密码
				<a href="Portal/jsp/register/findPassword.jsp" ><small>找回密码</small></a>
			</div>-->
		    <button class="btn btn-lg btn-block" type="button" onclick="login()">登录</button> 
		    <a href="Portal/jsp/register/findPassword.jsp" class="findPassword"><small>找回密码</small></a>
	    </form>
    </div>
    <div id="imask"></div>
    
  <div class="header content">
	    <div class="logoline">
	        <a class="logo" href="Portal/jsp/homePage/homePage.jsp"><img src="Portal/images/logo.png"/></a>
	    </div>
	    <div class="line">
	        <ul class="tittleline clearfloat">
	            <li class="item"><a class="item-inner" href="Portal/jsp/homePage/homePage.jsp">首页</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/classicCase/ClassicCase.jsp">典型案例</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/newsPage/newsPage.jsp">新闻中心</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/selfApplication/applied.jsp">自助申请</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/onlineQuery/onlineQuery.jsp">在线查询</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/aboutUs/Introduction.jsp">关于我们</a></li>
	        </ul>
	  <div class="right-linne clearfloat" id="loginDivOne">
	            <a class="register" href="Portal/jsp/register/register.jsp">注册</a>
		        <a class="h-login" href="javascript:void(0)" onclick="document.getElementById('home-login').scrollIntoView();">登录</a>
	        </div>
	        <div class="right-linne clearfloat" id="loginDivTwo" style="display: none;">
	            <p class="h-login"  onclick="logout()">注销</p>
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
    <div class="banner clearfloat content">
	   <img src="Portal/images/classicCase_banner.png"/>
	</div>
	<div class="content clearfloat">
	 <div id="leftlist">
		<div class="lefttable panel panel-default">
		   <div class="panel-heading">
		   <img src="Portal/images/project_icon.png"></img><span>新闻</span>中心
		   </div>
		   <table class="table">
		      <tr><td><img src="Portal/images/point_circle.png" style="float: left;margin-top: 6px"></img><a href="Portal/jsp/newsPage/newsPage.jsp" style="float: left;">新闻中心咨询报告</a></td></tr>
		   </table>
	    </div>
	 </div>
		<div id="rightlist">
		 <div class="righttable panel panel-default">
			   <div class="panel-heading"><span>新闻中心咨询报告</span></div>
			   <div id="artContent"></div>
			  <!--  <table class="table" id="rigTable"></table> -->
			   <div class="panel-body">
			        <img src="Portal/images/picture.png">
			        <div class="newsTitleDiv">
			          <h3 id="newsTitle"></h3>
			        </div>
			        <div class="newsColumnDiv">
			          <p id="newsColumn"></p>
			        </div>

					<!-- <h3 class="newsTitle"style="text-align:center;">FZK-CTC分散自律调度集中系统</h3>
					<h5 style="position:relative; top:20px;">【项目简介】</h5>
					<h5 style="position:relative; top:100px;">【测试内容】</h5>
					<h5 style="position:relative; top:180px;">【功能测试】</h5>
					<h5 style="position:relative; top:280px;">【效果及总结】</h5> -->
			   </div>   
		</div>		
	   </div>
	</div>
      <div class="footer content">
	    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
	    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>
      </div>
  </body>
</html>