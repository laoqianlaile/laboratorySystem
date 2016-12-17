<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>首页</title>
    
    <meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/homePage/homepage.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/jquery.cookie.js"></script> 
	<script src="Portal/js/homePage/homePage.js"></script>
    <script src="Portal/js/comment/comment.js"></script>
</head>
  
  <body>
    <input type = "text" id ="name" name="name" style="display: none" value=<%=session.getAttribute("clientNo")%>></input>
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
	        <a class="logo" href="Portal/jsp/homePage/homePage.jsp">
	        <img src="Portal/images/logo.png"/></a>
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
		        <a class="h-login" href="javascript:void(0)">登录</a>
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
	   <img src="Portal/images/index_banner.png"/>
	</div>
	<div class="content clearfloat">
	    <div class="line-1 clearfloat">
	        <div class="laboratory clearfloat">
	            <div class="lab-img clearfloat carousel slide" id="myCarousel" data-ride="carousel">
	                <ol class="carousel-indicators">
	                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
	                    <li data-target="#myCarousel" data-slide-to="1"></li>
	                    <li data-target="#myCarousel" data-slide-to="2"></li>
	                </ol>
	                <div class="carousel-inner">
	                    <div class="item active">
	                       <img src="Portal/images/recommendPic.png" alt="First slide">
	                    </div>
	                    <div class="item">
	                       <img src="Portal/images/carousel2.png" alt="Second slide">
	                    </div>
	                    <div class="item">
	                       <img src="Portal/images/carousel3.png" alt="Third slide">
	                    </div>
	               </div>
	               <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
	               <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
	            </div>
	            <div class="lab-brief clearfloat">
	                <div class="tittle"><img src="Portal/images/bt.png"/><h3>实验室简介</h3>
	                </div>
	                <div class="brief-content">
	                    <div class="text" id="labProfile" value="西南计算机软件测评中心简介"></div>
	                    <a class="detail" href="Portal/jsp/aboutUs/Introduction.jsp">详情>></a>
	                </div>
	            </div>
	        </div>
	        <div class="notices">
	            <div class="notices-h clearfloat">
	                <span class="notices-icon"></span>
	                <img src="Portal/images/hot-case-t.png" />
	                <a class="more" href="Portal/jsp/classicCase/ClassicCase.jsp">更多>></a>
	                <div class="notic-h-bottom"><img src="Portal/images/index_column1.png"/></div>
	            </div>
	            <ul class="notices-list clearfloat" id="hot-case" value="热门案例">
	            </ul>
	            <span></span>
	        </div>
	    </div>
	    <div class="line-2 clearfloat">
	        <div class="news">
	            <div class="notices-h clearfloat">
	                <span class="news-icon"></span>
	                <img src="Portal/images/news_tittle.png"/>
	                <a class="more" href="Portal/jsp/newsPage/newsPage.jsp">更多>></a>
	                <div class="notic-h-bottom"><img src="Portal/images/index_column1.png"/></div>
	            </div>
	            <ul class="notices-list clearfloat" id="newslist" value="新闻资讯">
	                
	            </ul>
	            <span></span>
	        </div>
	        <div class="case">
	            <div class="case-h clearfloat">
	                <span class="case-icon"></span>
	                <img src="Portal/images/case_tittle.png"/>
	                <a class="more" href="Portal/jsp/classicCase/ClassicCase.jsp">更多>></a>
	                <div class="case-h-bottom"><img src="Portal/images/left_column.png"/></div>
	            </div>
	            <ul class="case-content clearfloat" id="classiccase" value="典型案例">
	               <!--  <li class="case-item">
	                    <a href="#">
	                        <img class="img-case" src="Portal/images/indexPic1.png">
	                        <div class="case-name">信息系统工程验收测试</div>
	                    </a>
	                </li> -->
	                 
	            </ul>
	        </div>
	    </div>
	    <div class="line-3 clearfloat">
<!-- 	        <div class="login" id="home-login" name="home-login">
	            <div class="notices-h clearfloat">
	                    <span class="login-icon"></span>
	                    <img src="Portal/images/login_tittle1.png"/>
	                    <div class="notic-h-bottom"><img src="Portal/images/index_column1.png"/></div>
	            </div>
	            <form action="#" method="post">
					<div class="form-group">
						<div class="col-xs-12  ">
							<div class="input-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
								<input type="text" id="username" name="username" class="form-control" placeholder="用户名">
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-xs-12  ">
							<div class="input-group">
								<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
								<input type="text" id="password" name="password" class="form-control" placeholder="密码">
							</div>
						</div>
					</div>
					<div class="form-group form-actions">
						<div class="col-xs-4 ">
							<button type="submit" class="btn btn-sm btn-info"><span class="glyphicon glyphicon-off"></span> 登录</button>
						</div>
					</div>
					<div class="login_bottom">
						<p class="text-center remove-margin"><a href="javascript:void(0)" ><small>忘记密码？</small></a></p>
						<p class="text-center remove-margin"><a href="javascript:void(0)" ><small>注册</small></a></p>
					</div> 
				</form>
	        </div> -->
	        <div class="img-show clearfloat">
	            <!-- <div class="case-h clearfloat">
	               <div class="case-h-bottom"></div>
	           </div> -->
	       </div>
	    </div>
	    <div class="friendshiplink clearfloat">
	        <div class="friendshiplink-h clearfloat">
	            <span class="friendshiplink-icon"></span>
	            <img src="Portal/images/friend_tittle.png"/>
	            <!-- <a class="more" href="#">更多>></a> -->
	            <div class="case-h-bottom"><img src="Portal/images/left_column.png"/></div>
	        </div>
	        <ul class="clearfloat" style = "padding-left:80px;">
	            <li class="friendshiplink-item">
	            <a href="http://www.itesting.cn/"><img src="Portal/images/1.png"></a>
	            </li>
	            <li class="friendshiplink-item">
	            <a href="http://www.sdstc.net/"><img src="Portal/images/2.png"></a>
	            </li>
	            <li class="friendshiplink-item">
	            <a href="http://www.bstqc.com/"><img src="Portal/images/3.png"></a>
	            </li>
	            <li class="friendshiplink-item">
	            <a href="http://www.httc.cn/"><img src="Portal/images/4.png"></a>
	            </li>
	            <li class="friendshiplink-item">
	            <a href="http://www.tsia.com.cn/"><img src="Portal/images/5.png"></a>
	            </li>
	            <li class="friendshiplink-item">
	            <a href="http://www.csia.org.cn/htm/index.html"><img src="Portal/images/6.png"></a>
	            </li>
	        </ul>
	    </div>
	</div>
	<div class="footer content">
	    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
	    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>
    </div>
    
</body>
</html>