<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh-CN">
  <head>
    <base href="<%=basePath%>">
    
    <title>合同查询</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" href="module/css/bootstrap-theme.min.css">	
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/onlineQuery/onlineQuery.css">

	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.0/bootstrap-table.min.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
    <script src="module/js/bootstrap-table-zh-CN.js"></script> 
    <script src="module/js/jquery.cookie.js"></script> 
    <script src="Portal/js/onlineQuery/onlineQuery.js"></script>
    <script src="Portal/js/comment/comment.js"></script>
    
  </head>
  <body>
		<script>
			window.onload=function(){
			/*加载蒙板弹窗*/
			var showdiv = document.getElementById("showdiv");
			var imask = document.getElementById("imask");
			var con = document.getElementById("contenttable");
			/*var usershowid = document.getElementById("usershowid");
			var loginshow = document.getElementById("h-loginshow");*/
			var loginbox = document.getElementById("login_box");
			var sHeight = document.documentElement.scrollHeight;
			var sWidth = document.documentElement.scrollWidth;
				wHeight = document.documentElement.clientHeight;
				
			var oMask = document.getElementById("imask");
				oMask.style.height=sHeight+"px";
				oMask.style.width=sWidth+"px";
				
				
			var oVerify = document.getElementById("showdiv");
				dHeight = oVerify.offsetHeight;
				dWidth = oVerify.offsetWidth;
				lastwidth = sWidth - dWidth;
				lastheight = wHeight-dHeight;
				
			$(".fixed-table-pagination").addClass("IchangeStyle");
		
			oVerify.style.left=lastwidth/2 + "px";
			oVerify.style.top=(lastheight-100)/2 + "px";
			loginbox.style.left=(window.innerWidth - oVerify.offsetWidth)/2 + "px";
			loginbox.style.top=(window.innerHeight - oVerify.offsetHeight)/2 + "px";
			showdiv.style.display="none";
			imask.style.display="none";
			loginbox.style.display="none";
		
			$(".h-login").click(function(){
				
				loginbox.style.display = "block";
				imask.style.display = "block";
				});
			
			$(".close").click(function(){
				loginbox.style.display="none";
				imask.style.display="none";
			});
			
			//判断是否有用户登录
			var id='<%=session.getAttribute("clientNo")%>';
			if(id==""||id=='null'){
				loginbox.style.display = "block";
				imask.style.display = "block";
			}else{
				imask.style.display = "none";
				loadingtable();
				/*usershowid.style.display="block";
				loginshow.style.display="none";
				usershowid.innerHTML=""+id+"";*/
			}
			

			window.addEventListener("resize", function(){
				oMask.style.height=document.documentElement.scrollHeight+"px";
				oMask.style.width=document.documentElement.scrollWidth;+"px";
				loginbox.style.left = (window.innerWidth - loginbox.offsetWidth)/2 + "px";
				loginbox.style.top = (window.innerHeight - loginbox.offsetHeight)/2 + "px";
			});
			
		};
		</script>
		  <input type = "text" id ="name" name="name" style="display: none" value=<%=session.getAttribute("clientNo")%>></input>
 		  <!-- 登陆DIV -->
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
  	<!-- 整个内容的DIV -->
	<div id="main">
		<!-- 消息提示DIV -->
		<div id="showdiv1" class="alert alert-danger tan"></div>
		<!-- 手机验证DIV -->
    	<div id="showdiv">
        	<div id="show_top">
            	用户验证
                <div id="delet">
                	<img id="delete1" src="Portal/images/delete.png" onclick="colse123()" />
                </div>
            </div>
            
            	<div class="part1">
                    <span class="fontstyle">手机号码</span><input id="phonenumber" name="phonenumber" type="text" required="required">
                </div>
                <div class="part1"> 
                    <span class="fontstyle">验&nbsp;证&nbsp;码</span>
                    <input id="verify"  name="verify"  type="text">
                    <input id="recesms" type="button" class="verifybutton verifybutton2" value="获取验证码">
                </div>
                <div id="part2">
                    <button id="determine" type="button" class="dikbutton verifybutton" value="1111">确定</button>
                    <button type="button" class="dikbutton verifybutton" onclick="colse123()">取消</button>
                </div>
            
        </div>
        <!-- 目录DIV -->
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
    <!-- 背景DIV -->
	<div class="banner clearfloat content">
	   <img src="Portal/images/onlineInquiry_banner.png"/>
	</div>
	<!-- 中间内容DIV -->
    <div id="middle" class="clearfloat content contentbody">
                <div id="contentbody_left">
                    <div class="contentlistfirst">
                    	<div id="contentlist1">
                            <div class="contentlist2">
                                <span style="color:#198ac8;font-size:16px;">在线</span><span>查询</span>
                            </div>
                        </div>
                        <div class="contentlist">
	                        <a>检测合同在线查询</a>
	                    </div>
                        <div class="contentlist3">
	                        <a href="Portal/jsp/onlineQuery/processDetail.jsp" class="specialtitle">检测流程进度查询</a>
	                    </div> 
                    </div>
                </div>
                <div id="contentbody_right">
                    <div class="contenttitle">检测合同在线查询</div>
                    <div id="table_before">
	                  	<div id="contenttable">
	                    	<table id="table">
	                        </table>
	                    </div> 
                    </div>
                </div>
        </div>
        <div class="footer content">
		    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
		    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>
       </div>
    </div>
    <!-- 遮罩 -->
    <div id="imask"></div>
  </body>
</html>
