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

<title>新闻中心详情</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" type="text/css"
	href="assets/css/bootstrap.min.css">


<link rel="stylesheet" type="text/css"
	href="Portal/css/comment/reset.css">
<link rel="stylesheet" type="text/css"
	href="Portal/css/comment/comment.css">
<link rel="stylesheet" type="text/css"
	href="Portal/css/newsCenter/newsDetail.css">

<script src="assets/js/jquery-2.0.3.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>

</head>

<body>
	<div class="t_body">
		<div class="header content">
			<div class="logoline">
				<a class="logo" href="#"><img src="Portal/images/logo.png" /></a>
			</div>
			<div class="line">
				<ul class="tittleline clearfloat">
					<li class="item"><a class="item-inner"
						href="Portal/jsp/homePage/homePage.jsp">首页</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/classicCase/ClassicCase.jsp">典型案例</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/newsCenter/newscenter.jsp">新闻中心</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/selfApplication/apply.jsp">自助申请</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/onlineQuery/onlineQuery.jsp">在线查询</a><span>|</span></li>
					<li class="item"><a class="item-inner"
						href="Portal/jsp/aboutUs/Introduction.jsp">关于我们</a></li>
				</ul>
				<div class="right-linne clearfloat">
					<a class="register" href="Portal/jsp/register/register.jsp">注册</a>
					<a class="h-login" href="javascript:void(0)"
						onclick="document.getElementById('home-login').scrollIntoView();">登陆</a>
				</div>
			</div>
		</div>
		<div class="banner clearfloat content">
			<img src="Portal/images/pressCenter_banner.png" />
		</div>
		<div class="t_black content clearfloat">
			<div class="t_left">
				<div class="t_left_title">
					<img src="Portal/images/new_icon.png" id="new_icon"> <label
						style="color:#198ac8;margin-left:0px;">新闻</label> <label
						class="label2">中心</label> <img src="Portal/images/left_column.png"
						style="display:block;width:100%;">
				</div>
				<div class="left_content">
					<img src="Portal/images/point_circle.png"> <a
						style="color:#198ac8;">新闻中心资讯报告</a>
				</div>

			</div>

			<div class="t_left2">

				<div class="t_right_title">
					<label>新闻中心资讯报告</label>
				</div>


				<div class="t_left2_comtent">
					<div class="t_left2_box">
						<div class="t_left2_img">
							<img src="Portal/images/newDetailPic.png">
						</div>
						<div class="t_left2_comtent_box">
							<h2>评测中心获涉密信息系统集成资质</h2>
							<div class="t_left2_img_font"><p>今年5月，寿县张某正玩着微信，被一陌生人拉入了一个名为“武当山北京慈善”的微信群。微信群有400多人，群主每天都会推荐一些赚钱项目，并附上刻有公章的红头文件印证，价格从几十元到万余元不等，群主承诺这些项目会有很高收益而且零风险，群里的成员异常活跃，一会儿就有百余条未读信息。</p></div>
						</div>
					</div>
					<div class="t_left2_font">
						<p>这些项目包括，“交1100元报名费，成为三民城会员，等中国流失在48个国家的巨额财产解冻后，每个三民城的会员就会得到一笔善款以及坐飞机只要1块钱等特权。”“投资3600元就可成为巨龙公司国内原始股东，得到从美国花旗银行解冻的1000万人民币、南宁市住房一套、轿车一辆、每个月还会得到1万5千元生活费”等等。汽车自上个世纪末诞生以来，已经走过了风风雨雨的一百多年。从卡尔.本茨造出的第一辆三轮汽车以每小时18公里的速度，跑到现在，竟然诞生了从速度为零到加速到100公里/小时只需要三秒钟多一点的超级跑车。这一百年，汽车发展的速度是如此惊人！同时，汽车工业也造就了多位巨人，他们一手创建了通用、福特、丰田、本田这样一些在各国经济中举足轻重的著名公司。让我们一起来回望这段历史，品味其中的辛酸与喜悦，体会汽车给我们带来的种种欢乐与梦想„„</p>
						
					</div>
					<div class="t_left2_font">
						<p>张某开始还不相信，但想到这些项目都有国家红头文件作证，应该不会有假，禁不住诱惑，陆续购买单价1100元的“三民城项目”，单价3600元的“巨龙国际项目”，单价139元的“精准扶贫项目”46份，单价13元的“外币转为人民币转账费项目”100多份等等，共计花费2.5万余元。汽车自上个世纪末诞生以来，已经走过了风风雨雨的一百多年。从卡尔.本茨造出的第一辆三轮汽车以每小时18公里的速度，跑到现在，竟然诞生了从速度为零到加速到100公里/小时只需要三秒钟多一点的超级跑车。这一百年，汽车发展的速度是如此惊人！同时，汽车工业也造就了多位巨人，他们一手创建了通用、福特、丰田、本田这样一些在各国经济中举足轻重的著名公司。让我们一起来回望这段历史，品味其中的辛酸与喜悦，体会汽车给我们带来的种种欢乐与梦想„„</p>
						
					</div>
					<div class="t_left2_font">
						<p>这些项目包括，“交1100元报名费，成为三民城会员，等中国流失在48个国家的巨额财产解冻后，每个三民城的会员就会得到一笔善款以及坐飞机只要1块钱等特权。”“投资3600元就可成为巨龙公司国内原始股东，得到从美国花旗银行解冻的1000万人民币、南宁市住房一套、轿车一辆、每个月还会得到1万5千元生活费”等等。汽车自上个世纪末诞生以来，已经走过了风风雨雨的一百多年。从卡尔.本茨造出的第一辆三轮汽车以每小时18公里的速度，跑到现在，竟然诞生了从速度为零到加速到100公里/小时只需要三秒钟多一点的超级跑车。这一百年，汽车发展的速度是如此惊人！同时，汽车工业也造就了多位巨人，他们一手创建了通用、福特、丰田、本田这样一些在各国经济中举足轻重的著名公司。让我们一起来回望这段历史，品味其中的辛酸与喜悦，体会汽车给我们带来的种种欢乐与梦想„„</p>
						
					</div>



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
