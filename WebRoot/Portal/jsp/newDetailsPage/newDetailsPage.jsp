<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>新闻中心</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="Portal/css/newDetailsPage/newDetailsPage.css">
	<script src="assets/js/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="Portal/js/comment/comment.js"></script>
    <script src="Portal/js/newDetailsPage/newDetailsPage.js" type="text/javascript"></script>
  	<link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
    <link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
    <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
  </head>
  
  <body>
  
      <div id="login_box" class="login_box">
        <a class="close">×</a>
	    <div class="show_logo container2">
		    <a class="logo_small" href="Portal/jsp/homePage/homePage.jsp">
		    <img src="Portal/images/show_logo.png"/></a>
	    </div>
	    <form class="form-signin container2" role="form" action="#" method="post">
			<input type="text" class="form-control" id="clientNo" name="clientNo" placeholder="用户名" required autofocus />
			<input type="password" class="form-control" id="password" name="password" placeholder="密码" required />
			<div class="check_box">
			    <input type="checkbox" value="remember-me"> 记住密码
				<a href="#" ><small>注册</small></a>
			</div>
		    <button class="btn btn-lg btn-block" type="button" onclick="login()">登录</button> 
	    </form>
    </div>
    <div id="imask"></div>
    
     <div class="main">
     		
     	<div class="header content">                               <!--头部图片加导航栏-->
		    <div class="logoline">
		        <a class="logo" href="#" ><img src="Portal/images/logo.png"/></a>
		    </div>
		    <div class="line">
		        <ul class="tittleline clearfloat">
	            <li class="item"><a class="item-inner" href="Portal/jsp/homePage/homePage.jsp">首页</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/classicCase/ClassicCase.jsp">典型案例</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/newDetailsPage/newDetailsPage.jsp">新闻中心</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/selfApplication/applied.jsp">自助申请</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/onlineQuery/onlineQuery.jsp">在线查询</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/aboutUs/Introduction.jsp">关于我们</a></li>
	        </ul>
		        <div class="right-linne clearfloat">
	            <a class="register" href="Portal/jsp/register/register.jsp">注册</a>
		        <a class="h-login" href="javascript:void(0)" onclick="document.getElementById('home-login').scrollIntoView();">登陆</a>
	        </div>
		    </div>
    	</div>
    
    

      <div class="titleimg" > <img src="Portal/images/pressCenter_banner.png"  ></div>     <!--头部宣传图片  -->

 <div class="mianContent" >
 
      <div class="left">                                        	<!--左边第一个框  -->
		   <div class="leftline1">
		      <div class="line1img"> <img src="Portal/images/new_icon.png"></div>
		      <div  class="line1word"> <span>新闻</span>中心</div>
		   </div>
		   <div class="hrimg"><img src="Portal/images/left_column.png"></div>
		   <div class="leftline2">
		        <div class="line2img"><img src="Portal/images/point_circle.png"></div>
		        <div  class="line2word">新闻中心质询报告</div>
		        
		   </div>
		   <div class="hr"></div>
		
	  </div>
	  
 <div class="right">      <!--右边第二个框  -->
    <div class="righttitle">新闻中心咨询报告</div> 
    <div class="rightshow">
        <div class="rightshowimg"> <img src="Portal/images/newsPic.png"></div>
        <div class="rightshowword">
          <h4>韩国科学技术院（KAIST）李昌熹教授来校作学术报告</h4>
          <p>9月21日上午，韩国科学技术院（KAIST）李昌熹教授应邀来我校弘毅讲坛电气与电子工程学院分论坛开展学术交流，并在第三实验楼C306会议室以“光通信信息安全”为题向电气学院师生作了一场精彩的学术报告，电气学院副院长赵明富教授主持报告会。</p>
          <button type="button" class="btn">查看更多</button>
 	   </div> 

 
 
  <div class="rightchoose">
 <div class="includetable">
        <table class="table table-hover">
        	<tr>
        		<th>
        			<div class="thimg"><img src="Portal/images/point_triangle.png"></div>
        			<div class="thword"><a >测评中心获"重庆市中小企业公共服务五星级平台"认定.......</a></div>
        			<div class="thtime">1993-05-10</div>
        		</th>
        	</tr>
        	
        	<tr>
        		<th>
        			<div class="thimg"><img src="Portal/images/point_triangle.png"></div>
        			<div class="thword"><a >测评中心获"重庆市中小企业公共服务五星级平台"认定.......</a></div>
        			<div class="thtime">1993-05-10</div>
        		</th>
        	</tr>
        	
        	<tr>
        		<th>
        			<div class="thimg"><img src="Portal/images/point_triangle.png"></div>
        			<div class="thword"><a >测评中心获"重庆市中小企业公共服务五星级平台"认定.......</a></div>
        			<div class="thtime">1993-05-10</div>
        		</th>
        	</tr>
        	
        	<tr>
        		<th>
        			<div class="thimg"><img src="Portal/images/point_triangle.png"></div>
        			<div class="thword"><a >测评中心获"重庆市中小企业公共服务五星级平台"认定.......</a></div>
        			<div class="thtime">1993-05-10</div>
        		</th>
        	</tr>
        	
        	<tr>
        		<th>
        			<div class="thimg"><img src="Portal/images/point_triangle.png"></div>
        			<div class="thword"><a >测评中心获"重庆市中小企业公共服务五星级平台"认定.......</a></div>
        			<div class="thtime">1993-05-10</div>
        		</th>
        	</tr>
        	
        	<tr>
        		<th>
        			<div class="thimg"><img src="Portal/images/point_triangle.png"></div>
        			<div class="thword"><a >测评中心获"重庆市中小企业公共服务五星级平台"认定.......</a></div>
        			<div class="thtime">1993-05-10</div>
        		</th>
        	</tr>
        	
        </table>
  </div>
 </div>
       
                                 

 </div>
 
</div>

</div>
	
	<div class="footer content">    <!--尾部  -->
    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>

    </div>
  	</div>
  </body>
</html>
