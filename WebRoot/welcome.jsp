<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>西计实验室管理系统</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
body{
  margin: 0px;
}
 #imgArea img{
   
    width: 100%;
    }
</style>
<script type="text/javascript">
	window.onload = function() {
		 var imgare = document.getElementById("bg_img");
		 var iframeElement = window.top.frames.document.getElementById("content_frame");
		 var hight = window.top.document.documentElement.clientHeight;

		 var retainHeight = hight -  (148 + 5);
		 if(hight >= 1600)
		 {
			 imgare.setAttribute("src","module/img/welcomepic_md.png");
		 }
		 imgare.style.height = (retainHeight - 10)+"px";
		 iframeElement.style.height= retainHeight+"px";
		
	}
</script>
</head>

<body>
	<div id="imgArea">
		
		<img  id="bg_img" src="module/img/welcomepic_sm.png">
	</div>

</body>
</html>
