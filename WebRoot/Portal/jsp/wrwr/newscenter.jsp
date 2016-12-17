<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML >
<html>
<head>
<base href="<%=basePath%>">

<title>实验室简介</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/newsCenter/newsCenter.css" >
	
	<script src="assets/js/jquery-2.0.3.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="Portal/js/newsCenter/newsCenter.js"></script>


</head>

<body>
	<div class="t_body">
		<div class="header content">

	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
    <script src="Portal/js/comment/comment.js"></script>
	<script src="Portal/js/newsCenter/newsCenter.js"></script>
  </head>
  
  <body>
  <div id="login_box" class="login_box">
        <a class="close">×</a>
	    <div class="show_logo container2">
		    <a class="logo_small" href="Portal/jsp/homePage/homePage.jsp">
		    <img src="Portal/images/show_logo.png"/></a>
	    </div>
	    <form class="form-signin container2" role="form" action="#" method="post">
			<input type="text" class="form-control" placeholder="用户名" required autofocus />
			<input type="password" class="form-control" placeholder="密码" required />
			<div class="check_box">
				<input type="checkbox" value="remember-me"> 记住密码
				<a href="#" ><small>注册</small></a>
			</div>
		    <button class="btn btn-lg btn-block" type="submit">登录</button> 
	    </form>
    </div>
    <div id="imask"></div>
	 <div class="header content">
	    <div class="logoline">
	        <a class="logo" href="#"><img src="Portal/images/logo.png"/></a>
	    </div>
	    <div class="line">
	        <ul class="tittleline clearfloat">
	            <li class="item"><a class="item-inner" href="Portal/jsp/homePage/homePage.jsp">首页</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/classicCase/ClassicCase.jsp">典型案例</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/newsCenter/newscenter.jsp">新闻中心</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/selfApplication/apply.jsp">自助申请</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/onlineQuery/onlineQuery.jsp">在线查询</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/aboutUs/Introduction.jsp">关于我们</a></li>
	        </ul>
	        <div class="right-linne clearfloat">
	            <a class="register" href="Portal/jsp/register/register.jsp">注册</a>
		        <a class="h-login" >登陆</a>
	        </div>
	    </div>
    </div>
    <div class="banner clearfloat content">
	   <img src="Portal/images/pressCenter_banner.png"/>
	</div>

		<div class="t_black content clearfloat">
			<div class="t_left">
			  <div class="t_left_title">
					<img src="Portal/images/new_icon.png" id="new_icon"> 
					 <label style="color:#198ac8;margin-left:0px;" >新闻</label> <label class="label2">中心</label> 
					<img src="Portal/images/left_column.png" style="display:block;width:100%;">
			 </div>
			 <div class="left_content">
				<img src="Portal/images/point_circle.png">
				<a style="color:#198ac8;">新闻中心资讯报告</a>
				</div>
			  </div>

	
 <div class="mianContent content clearfloat" >
 
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
 <div class="rightshowimg"> <img src="Portal/images/newsPic.png">
 
</div>
         <div class="t_left2">
				<div class="t_right_title">
					<label>新闻中心资讯报告</label>
				</div>
		        <div class="details1">
		          <div class="details1_1"><img src="Portal/images/newsPic.png"></div>
		          <div class="details1_2">
		             <h4>关于开展关于开展关于开展关于开展关于开展<img alt="" src="Portal/images/redMark.png"></h4>
		             <div class="details1_3"><p>本课程可奠定一般理工学院所需的基本数学能力，将针对单元主要定义或定理作讲解，同时推导定理或公式，并配合例题运用之。
		                                任何具备中学数学程度者皆可学习，将可奠定工程数学、复变函数与高等微积分的学习基础，同时经由演算之过程培养学生逻辑分析之能力。
		                                注：本课程由台湾新竹清华大学提供，因课程视频由提供方上传</p>
		              </div>
		             <a href="Portal/jsp/newsCenter/newsDetail.jsp">&nbsp;查看更多>></a>
		          </div>
		        </div>
		        <div class="details2" id="#midlist">
			        <table class="table table-hover table-condensed">
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				      <tr><td class="td"><a><img src="Portal/images/point_triangle.png"></img><span class="tableDatelies">荣获重庆中小企业评测中心认定.....</span><span class="tableDate">2016-5-12</span></a></td></tr>
				    </table>
		        </div>
			</div>
			<div id="paging">
			       <label style="position:relative;top:-30px;">共<span>3</span>页记录,当前显示第<span>2</span>页</label>
					<ul class="pagination pagination" style="position:relative;left:15px;">
					  <li><a href="#">&laquo;第一页</a></li>
					  <li><a href="#">5</a></li>
					  <li><a href="#">6</a></li>
					  <li class="active"><a href="#">7</a></li>
					  <li><a href="#">8</a></li>
					  <li><a href="#">9</a></li>
					  <li class="disabled"><a href="#">最后一页&raquo;</a></li>
					</ul>
					<div id="tiaozhuan" style="position:relative;left:485px;top:-55px;">
					 <label>跳转到&nbsp;</label>
					 <input class="tiaozhuan" type="text">
					 <input class="go" type="button" value="GO"> 
					 </div>		     
			</div>
		</div>
		<div class="footer content">
	    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
	    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>
        </div>
	</div>
</body>
</html>
