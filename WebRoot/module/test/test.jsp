<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
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
<title>查看/保存/修改用户</title>
<!-- 系统js -->
    <!-- 外部js引用 -->
    <!-- 针对文件上传js，此处顺序不能错，否则无法上传，而且这4个js的版本必须匹配 -->
    <script src="assets/fileupload/jquery-1.11.1.js"></script>
    <script src="assets/fileupload/jquery.iframe-transport.js"></script>
    <script src="assets/fileupload/jquery.ui.widget.js"></script>
    <script src="assets/fileupload/jquery.fileupload.js"></script>
</head>

<body>
	<div
		style="text-align:center;width: 250px;height: 200px;position: relative;">
		<!-- <div id="imgArea" style="width: 200px;height: 150px;">
			<img id="userImg" src="module/img/basic/defaultPhoto.jpg"></img>
		</div> -->

<!-- 		<input type="button" value="上传" />
 --><!-- 			style="width: 66px;height: 25px;position: absolute;left: 35px;top: 165px;" />
 -->		<input id="imgUpload" type="file" name="file" data-url="fileOperateController/imageUpload.do" accept="*.*" />
<!-- 			style="width: 66px;height: 25px;position: absolute;left: 35px;top: 165px;opacity: 0;filter:alpha(opacity=0);">
 -->		<!-- <input type="button" id="emptyImage" value="清空"
			style="width: 66px;height: 25px;position: absolute;left: 105px;top: 165px;" /> -->
		<!-- 用户存储FileID -->
		<input name="HEADPHOTO" id="picture" style="display: none;" />
	</div>

	<script type="text/javascript">
		$(document).ready(function() {
/* 			var form = $("#fm");
 *//* 			var userImg = $("#userImg");
 */            var picture = $("#picture");
			//图片上传
            $('#imgUpload').fileupload({
                dataType: 'json',
                done: function (e, result) {
                	console.info(result.result);
                	alert(result.result);
                     if(result) {
/*                         var data = result.result[0];
 *//*                         userImg.attr("src",data.filePath);
 */                        picture.val(result.result);
                     }
                }
            });
		});
	</script>
</body>
</html>
