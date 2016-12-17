<%@ page language="java" import="java.util.*,java.net.*;" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%
/* request.setCharacterEncoding("utf-8")
String username = null;
String PASSWORD = null;
response.setContentType("text/html;charset=utf-8"); 
try{
Cookie[] cookies = request.getCookies();
if(cookies!=null){
	for(int i=0; i<cookies.length; i++){
		if(cookies[i].getName().equals("user")){
			username = cookies[i].getValue().split("-")[0];
			 PASSWORD = cookies[i].getValue().split("-")[1];
			 username =  URLDecoder.decode(username,"utf-8");
			request.setAttribute("LOGINNAME", username);
			request.setAttribute("PASSWORD", PASSWORD);
		}
	}
}
}
catch(Exception e){
	e.printStackTrace(); 
}*/
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>登录页面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	
	<link rel="stylesheet" href="module/css/bootstrap.min.css">	
	<link rel="stylesheet" type="text/css" href="module/css/login/login.css">
	<link rel="stylesheet" type="text/css" href="module/css/login/style.css">
	

  </head>
  
  <body >
     <div class="content">
        <div class="left-part">
           <div  class="left-content">
             <div class="title">
                <img  class="logo1" src="module/img/login/logo.png">
                <img  class="logo2" src="module/img/login/logohead.png">
             </div>
             <div class="User-info">
             	
             	<div style="height: 10px; width: 6px;"></div>
                <div class="form-group has-feedback ">
                		
                	<span class="glyphicon glyphicon-user form-control-feedback"  style="left:0;color: rgb(0, 0, 0);"></span>
                    <input class="form-control" name="username"  id="username" required="" type='text' style="border-radius: 10px; padding-left:35px;">
          			<label alt='请输入账号' placeholder='账号'></label>
                </div>
                <!--<div >
                  <input type="text" name="username" id="username" value="" class="user-input" class="readonly" placeholder="请输入邮箱/用户名/已验证手机 "/>
                </div> 
                -->
             </div>
             <div class="User-info">
                <div class="input-gruop has-feedback">
               		<span class="glyphicon glyphicon-lock form-control-feedback" style="left:0;color: rgb(0, 0, 0);"></span>
	                <input class="form-control" required=""  name="password" id="employeeid" type="password" style="border-radius: 10px; padding-left:35px;">
	          		<label alt='请输入密码' placeholder='密码'></label>
                </div> 
               <!-- <div >
                  <input type="password" name="password" id="employeeid" value="" class="user-input" placeholder="请输入密码 "/>
                </div> 
                --> 
             </div>
             <div class="code">
                <div class="code-info" style="float: left;">
	                <div class="input-group has-feedback">
	                  <span class="glyphicon glyphicon-ok-sign form-control-feedback" style="z-index:3;left:0;color: rgb(0, 0, 0);"></span>
	                  <input class="form-control"  id="encode" type="text" placeholder="请输入验证码" style="padding-left:35px;padding-right:0px;border-radius:10px;">
	                </div>
	                <!-- <input type="text" id="encode" placeholder="请输入验证码"/> -->
	            </div>
                <div >
                  <img src="employeeController/getRandcode.do" id="randomCode"  class="codePicture" alt="验证码" />
                </div>
             </div>
              <div style="height: 60;line-height:3">
               <input type="checkbox" name="autoLogin" class="isAuto" value="记住密码" >记住密码
             </div>
             <div>
               <button class="btn btn-info" name="login"  onclick="login()" style="width:320px;border-radius:10px;font-size:18px;">登录</button>
             </div>
           </div>
        </div>
        <div class="right-part">
            　                    <img src="module/img/login/line.png" class="line"/>
           <div>
              <img src="module/img/login/test_border.png" class="right-content"/>
           </div>
        </div>
     </div>
     
     <script src="module/js/jquery-2.1.1.min.js"></script>
     <script src="module/js/login/login.js"></script>      
     <script src="module/js/bootstrap.min.js"></script>
  </body>
</html>
