<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>自助申请</title>
    
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/selfApplication/application.css">
	
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	
	<script src="assets/js/jquery-3.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="assets/js/bootstrap-suggest.min.js"></script>
	<script src="module/js/jquery.cookie.js"></script> 
    <script src="Portal/js/comment/comment.js"></script>
    <script src="Portal/js/selfApplication/selfApplication.js"></script>
</head>

<body>
   <input type = "text" id ="name" name="name" style="display: none" value=<%=session.getAttribute("clientNo")%>></input>
	<div id="login_box" class="login_box">
        <a class="close">×</a>
	    <div class="show_logo container2">
		    <a class="logo_small" href="Portal/jsp/homePage/homePage.jsp">
		    <img src="Portal/images/show_logo.png"/></a>
	    </div>
	   <div class="form-signin container2" >
			<input type="text" class="form-control" id="clientNo" name="clientNo" placeholder="用户名" autocomplete="off" />
			<input type="text" class="form-control" id="password" name="password" placeholder="密码" onfocus="this.type='password'"/>
			<!--<div class="check_box">
			    <input type="checkbox" value="remember-me"> 记住密码
				<a href="Portal/jsp/register/findPassword.jsp" ><small>找回密码</small></a>
			</div>-->
		    <button class="btn btn-lg btn-block" type="button" onclick="login()">登录</button> 
		    <a href="Portal/jsp/register/findPassword.jsp" class="findPassword"><small>找回密码</small></a>
	    </div>
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
				       <li><a onclick="onloadPerson()">个人信息</a></li>
				       <li><a onclick="onloadPassword()">修改密码</a></li>
				       <li><a href="Portal/jsp/register/findPassword.jsp">找回密码</a></li>
				     </ul>
                  </div>
	        </div>
	    </div>
    </div>
	<div class="banner clearfloat content">
	   <img src="Portal/images/self_application.png"/>
	</div>
	<div class="content clearfloat">
	    <div class="Navigation-bar clearfloat">
	            <div class="notices-h clearfloat">
	                <span class="application-icon"></span>
	                <img src="Portal/images/application_tittle.png"/>
	                <div class="notic-h-bottom"><img src="Portal/images/left_column.png"/></div>
	            </div>
	            <ul class="application-list clearfloat">
	                <li class="application-item">
	                    <span class="application-tittle-icon active2"></span>
	                    <div class="tittle"><a id="selfapply" href="Portal/jsp/selfApplication/apply.jsp">用户自助在线测试申请</a></div>
	                </li>
	                
	                <li class="application-item">
	                    <span class="application-tittle-icon"></span>
	                    <div class="tittle"><a class="active3" href="Portal/jsp/selfApplication/applied.jsp">用户已申请测试项目</a></div>
	                </li>
	            </ul>
	    </div>
	    <div class="application-form clearfloat middle">
	        <div class="form-head">
	            <h3>用户自助在线测试申请</h3>
	        </div>
	        <div class="form-horizontal form-content"  role="form">
	            
	            <div class="form-group">
	                <label class="col-sm-2 control-label">样品名称</label>
	                <div class="col-sm-5">
	                   <input type="text" class="form-control" id="selfSampleName" placeholder="请输入样品名称" onblur="sampleName()" onclick="writeSampleName()">
	                </div>
	                <label class="language" id="sampleNamePrompt"></label>
	            </div>
	            
	            <div class="form-group">
	                <label class="col-sm-2 control-label">测试方法</label>
	                <div class="col-sm-5" >                                                
		                <input type="text" class="form-control" id="selfDetection" placeholder="请输入测试方法" onblur="detection()" onclick="writeDetection()">                                            
						<div class="input-group-btn" >                                                    
						<ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
						</div>                                            
					</div>   
					<label class="language" id="detectionPrompt"></label> 
	            </div>
	            <div class="form-group">
	                <label class="col-sm-2 control-label">联&nbsp;&nbsp;系&nbsp;&nbsp;人</label>
	                <div class="col-sm-5">
	                   <input type="text" class="form-control" id="selfContact" placeholder="请输入联系人" onblur="contact()" onclick="writeContact()">
	                </div>
	                <label class="language" id="contactPrompt"></label>
	            </div>
	            <div class="form-group">
	                <label class="col-sm-2 control-label">联系电话</label>
	                <div class="col-sm-5">
	                   <input type="text" class="form-control" id="selfContactPhone" placeholder="请输入联系电话" onblur="contactPhone()" onclick="writePhone()">
	                </div>
	                <label class="language" id="phonePrompt"></label>
	            </div>

	            <div class="form-group">
	                <label class="col-sm-2 control-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
	                <div class="col-sm-5">
	                   <input type="text" class="form-control" id="selfRemark" placeholder="请输入备注">
	                </div>
	            </div>
	            
	            <div class="form-group">
	                <div class="col-sm-5">
	                <button  id="sumit-btn" class="btn btn-default" onclick="add()">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</button>
	                </div>
	            </div>
	        </div>
	        <div class="selfapplypic"><img src="Portal/images/selfApplicationpic.png"/></div>
	    </div>
	</div>
	<div class="footer content">
	    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
	    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>
    </div>
     <script>
     window.onload=function(){
 	    	checsessoin();
    		/*加载登陆蒙板弹窗*/
    		var loginbox = document.getElementById("login_box");
    		var imask = document.getElementById("imask");
    		var oMask = document.getElementById("imask");
    		var oVerify = document.getElementById("login_box");
    		
    		oMask.style.height = document.documentElement.offsetHeight + "px";
    		oMask.style.width = window.innerWidth + "px";
    		oVerify.style.left=(window.innerWidth - oVerify.offsetWidth)/2 + "px";
    		oVerify.style.top=(window.innerHeight - oVerify.offsetHeight)/2 + "px";
    		
    		$(".h-login").click(function(){
    		
    			loginbox.style.display = "block";
    			imask.style.display = "block";
    			});
    		
    		$(".close").click(function(){
    			loginbox.style.display="none";
    			imask.style.display="none";
    		});
    		
    	  	
    	    window.addEventListener("resize", function(){
    	    	if(document.documentElement.offsetHeight > window.innerHeight){
    	        	oMask.style.height = document.documentElement.offsetHeight + "px";
    	    	}else{

    	        	oMask.style.height = window.innerHeight + "px";
    	    	}
    	    	oMask.style.width = window.innerWidth + "px";
    	    	oVerify.style.left=(window.innerWidth - oVerify.offsetWidth)/2 + "px";
    	    	oVerify.style.top=(window.innerHeight - oVerify.offsetHeight)/2 + "px";
    	    });
    	    checsessoin();
    	};
//判断是否有用户登录
function checsessoin()
  {
	var strSession = '<%=session.getAttribute("clientNo")%>'.toString();
    if(strSession == ""||strSession == 'null')
      {
       login_box.style.display = "block";
       imask.style.display = "block";
       }else{
   	    loginbox.style.display="none";
   		imask.style.display="none";
       }
 /*     else{
  		document.getElementById("loginA").style.display="block";
  		document.getElementById("loginA").innerHTML="欢迎你："+strSession;
  		};*/
   }
    </script>
</body>
</html>
