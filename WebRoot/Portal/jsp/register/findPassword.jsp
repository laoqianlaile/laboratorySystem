<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>找回密码</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="Portal/css/register/register.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/register/findPassword.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
    
	<script src="assets/js/jquery-1.11.1.js"></script>
    <script src="assets/js/jquery.iframe-transport.js"></script>
    <script src="assets/js/jquery.ui.widget.js"></script>
    <script src="assets/js/jquery.fileupload.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="Portal/js/comment/comment.js"></script>
    <script type="text/javascript" src="Portal/js/register/findPassword.js"></script>

    
  </head>
  
  <body>
  	  <!-- 隐藏的input -->
  	   <input type = "text" id ="name" name="name" style="display: none" value=<%=session.getAttribute("clientNo")%>></input>
  	   <input type = "text" id = "clientID" name = "clientID" style="display: none;" value="">
       <input type = "text" id = "companyID" name = "companyID" style="display: none;" value="">
       <input type = "password" id = "password" name = "password" style="display: none;" value="">	  
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
  <div class="main">
    <div class="header content">                               <!--头部图片加导航栏-->
	    <div class="logoline">
	        <a class="logo" href="Portal/jsp/homePage/homePage.jsp" ><img src="Portal/images/logo.png"/></a>
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
    
   <div class="container">   
     <div class="title">                                                                 
         <h3>&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到个人中心:找回密码</h3>
      </div>  
     <div class="container1">
         <div class="form"> 
            <form class="form-horizontal" role="form" >
               <div class="form-group">
                     <label for="clientNo" class="col-sm-2 control-label"><p>账&nbsp;号</p></label>
                     <div class="col-sm-6">
                        <input type="text" class="form-control" id="clientNo1" name="clientNo1" placeholder="请输入账号" onblur="upperCase()" onclick="createInput()">
                     </div>
                      <label for="firstname1" class="col-sm-3 control-label1" id="clientNoPrompt"></label>
              </div>
              
               <div class="form-group">
                     <label for="fixedTelephone" class="col-sm-2 control-label"><p>联系电话</p></label>
                     <div class="col-sm-6">
                        <input type="text" class="form-control" id="fixedTelephone" placeholder="请输入联系电话" onblur="fixedCase()" onclick="fixedInput()">
                     </div>
                      <label for="firstname1" class="col-sm-3 control-label1" id="fixedPrompt"></label>
              </div>
	          <div class="form-group"> 
				 <div class="col-sm-2 col-sm-offset-2"> 
				    <button type = "button" class="btn btn-primary btn-lg btn-block" onclick="findPassword()"><p>确定</p></button> 
				 </div>    
		      </div>
		      <div class="prompt"><p>提示：您的电话号码是您注册或更改过后的电话号码</p></div> 
              </form>
          </div>
      </div>
      
     <div class="container2"> <img src="Portal/images/woman_pic.png" ></div>
  </div>
         
   </div>
   
 
    
    <div class="footer content">    <!--尾部  -->
    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>

</div>
  </body>
</html>
