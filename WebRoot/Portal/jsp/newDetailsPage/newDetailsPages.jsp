<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>新闻详情</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="Portal/css/newDetailsPage/newDetailsPages.css">
	<link href="assets/css/bootstrap.min.css" type="text/css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
    <script src="assets/js/jquery-1.10.2.min.js" type="text/javascript"></script>
    <script src="assets/js/bootbox.min.js" type="text/javascript"></script>
    <script src="Portal/js/comment/comment.js"></script>
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
		        <a class="h-login"  href="javascript:void(0)" onclick="document.getElementById('home-login').scrollIntoView();">登陆</a>
	        </div>
	    </div>
    </div>	

	<div class="titleimg"><img src="Portal/images/pressCenter_banner.png" /></div>      <!--头部宣传图片  -->
	
	
<div class="container" >
	
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
	
	<div  class="right">    									 <!--右边第二个框  -->
		<div class="righttitle">新闻中心质询报告</div>
		<div  class="rightcontainer">      <!-- 新闻详细信息展示 -->
			<div  class="rightimg"><img src="Portal/images/newDetailPic.png" ></div>
			<div class="rightdetails">
				<h3>校领导部署学生活动中心投用工作</h3>
				<p>近日，副校长杜华、副校长曾宪军在学生处、国资处、招标与采购管理中心、基建后勤处等部门负责人陪同下深入学生活动中心，召开现场工作会，部署项目投用工作。</p>
				<p>副校长杜华、副校长曾宪军要求抓紧督促施工单位整改工程方面的问题，积极沟通协调主管部门开展相关验收；尽快统筹部署入驻部门的设施设备需求，并及时组织招标、采购、配送、安装；同时要求有关部门对项目后期装饰工程及效果进行研究讨论，组织作品征集及标识标牌制作等，努力营造优良的活动场所。</p>
				<p>学生活动中心于8月底全面完成主体工程、重点部位精装修、声光电、BA智能控制系统、中央空调、影剧场座椅以及室外管网、消防道路、园林景观等工作任务。目前已经完成空气、水质、照度、功能密度、空调系统、管网系统、消防系统等相关检测，已完成结构验收、防雷验收、环保验收、消防验收，正在开展规划验收（勘测院已测绘面积，待出报告）、节能验收（已进行节能分步验收及能效测评，待出报告）、档案验收（市城建档案管已进行初步验收，待施工单位整改）、竣工验收（等前述节能验收通过后即可进行）。近期，基建后勤处将大力开展协调沟通工作，加快推进有关验收，力争十月上旬投入使用。</p>
				<p>2016年6月10日，《重庆日报》“理论头条”刊发了我校管理学院夏文汇教授的研究成果《“渝新欧”国际铁路物流系统的不足和对策》，该成果同时获得了副市长陈绿平的批示。</p>
				<p>016年8月，市政府参事、我校经济金融学院王筱欣教授依托市科委决策咨询与管理创新项目《重庆高校科技成果转化引入风投基金的创新机制及政策支持体系研究》撰写的《关于夯实高校创投基金基础助推科技成果有效转化的建议》得到翁杰明、吴刚、沐华平三位市领导的批示。市委常委、市政府常务副市长翁杰明更是正面批示：“王教授作了深入研究。市教委、科委、财政、金融办、国资委、人社局等可作为落实措施出台实施办法。”同时，该项目的另一研究成果，由我校经济金融学院邱冬阳教授撰写的项目研究报告《夯实高校创投基金机制 助推科技成果有效转化》被重庆市社科成果要报收录。</p>
				<p>　南山书院里，老师们身着旗袍，向留学生讲解了中国的古筝和古琴，并即兴演奏《渔舟唱晚》和《笑傲江湖》助兴，留学生们在优雅的音乐中感受着中国文化的博大精深。期间，几位留学生在老师的指导下学习了一小段古筝曲的演奏，整个茶院洋溢着中国古文化的气息。</p>
				<p>这一系列被批示的研究成果都是聚焦国家、重庆市在科技成果转化、一带一路发展以及创新创业等方面面临的现实问题进行决策咨询研究形成的，集中体现了我校社科研究的咨政能力和影响力不断提升。</p>
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
