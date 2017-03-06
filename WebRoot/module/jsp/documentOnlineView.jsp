<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String swfFilePath = (String)request.getSession().getAttribute("swfFilePath");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>查看文件</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!-- <link rel="stylesheet" type="text/css" href="styles.css">	-->
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<style type="text/css" media="screen">
body {
	margin: 0;
	padding: 0;
	overflow: auto;
}

#onlineViewFile {
	width: 1050px;
	height: 855px;
	margin: 20px auto;
	border: 1px solid #ccc;
	margin: 20px auto;
}

#onlineViewMainContent {
	width: 1000px;
	margin: 0 auto;
}

#onlineViewFile h3 {
	margin-left: 25px;
}

#onlineViewFile hr {
	width: 1000px;
	margin: 15px auto;
}

#turnBackButton {
	float: right;
	margin-right: 25px;
}
</style>

</head>

<body onunload="cloase()">

	<div id="onlineViewFile">
		<h3>查看文件</h3>
		<hr />
		<div id="onlineViewMainContent">
			<div id="flashContent"></div>
			<hr />
		</div>
		<button type="button" id="turnBackButton" class="btn btn-default" onclick="turnBack()">
			<span class="glyphicon "></span> 返回
		</button>
	</div>

    <script src="module/js/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="module/js/documentOnlineView.js"></script>
	<script type="text/javascript" src="module/js/swfobject/swfobject.js"></script>
	<script type="text/javascript" src="module/js/flexpaper_flash.js"></script>
	<script type="text/javascript"> 
            <!-- For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. --> 
            var swfVersionStr = "10.0.0";
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = { 
                  SwfFile :"<%=swfFilePath%>",
				  Scale : 0.6, 
				  ZoomTransition : "easeOut",
				  ZoomTime : 0.5,
  				  ZoomInterval : 0.1,
  				  FitPageOnLoad : false,
  				  FitWidthOnLoad : true,
  				  PrintEnabled : true,
  				  FullScreenAsMaxWindow : false,
  				  ProgressiveLoading : true,
  				  PrintToolsVisible : true,
  				  ViewModeToolsVisible : true,
  				  ZoomToolsVisible : true,
  				  FullScreenVisible : true,
  				  NavToolsVisible : true,
  				  CursorToolsVisible : true,
  				  SearchToolsVisible : true, 
  				  localeChain: "en_US"
				  };
			 var params = {

			    }
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "sameDomain";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.id = "Diyflexpaper";
            attributes.name = "Diyflexpaper";
            swfobject.embedSWF(
                "module/js/Diyflexpaper.swf", "flashContent", 
                "1000", "700",
                swfVersionStr, xiSwfUrlStr, 
                flashvars, params, attributes);
        </script>
</body>
</html>
