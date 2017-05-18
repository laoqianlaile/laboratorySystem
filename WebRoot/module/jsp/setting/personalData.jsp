<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>个人资料</title>
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
	<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" /> 
	<link rel="stylesheet"  type="text/css" href="module/css/wait.css">
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
	<script src="module/js/jquery.uploadify.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	
	<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
	<script src="module/js/sweetalert.min.js"></script>
	<style>
.ahead{
	 border: 1px solid rgba(59,194,29,.7);
    color: #42c02e!important;    padding: 4px 12px;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    border-radius: 40px;
    background: none;"
    }
    
#table .table td{ 
	padding: 20px 0;
	min-width: 200px
}
#signatureTable  td{
    border-top: 0px solid;
	padding: 20px 0;
	min-width: 100px;
}
#stampTable  td{
    border-top: 0px solid;
	padding: 20px 0;
	min-width: 100px;
}
</style>
  </head>

  <body>
	<div class="container" style="margin-left: 100px;">
		<div class="row clearfix">
			<div class="col-md-4 column">
				<div id ="side">
			        <ul class="nav nav-pills nav-stacked">
			      		<li class="active"><a onclick="">设置</a></li>
			            <li><a onclick="personal(this)">个人设置</a></li>
			            <li><a onclick="editPWD(this)">密码修改</a></li>
			             <li><a onclick="signature(this)">电子签名</a></li>
			             <li><a onclick="stamp(this)">电子盖章</a></li>
			        </ul>
				</div>
			</div>
			<div class="col-md-8 column" >
				<div  id = "table" style="display: none">
					<table class="table">
					  <tbody id = "tablebody"></tbody>
					</table>
				</div>
				<div class="signature" style="display: none">
					<table class="table">
					  <tbody id ="signatureTable">
					  		<tr>
					  			<td>电子签名</td>
					  			<td>
					  				<div>
					  					 <img id="Img1"  src="upload/img/20170516161016_20170516223037727.png"data-holder-rendered="true"/>
										 <input class="singnatureImg" type="file" name="files" id="files" onchange="previewImage(this,'Img1')"
											accept="image/png, image/gif, image/jpg, image/jpeg"
											style="width:66px;height:25px;position:absolute;left:10px;top:155px;opacity: 0;filter: alpha(opacity = 0);" />  
					  				</div>
					  			</td>
					  		</tr>
					  </tbody>
					</table>
				</div> 
				 <div class="stamp" style="display: none"> 
				 	<table class="table">
					  <tbody id ="stampTable">
					  		<tr>
					  			<td>电子盖章</td>
					  			<td>
					  				<div>
					  					  <img id="Img2"  src="upload/img/person3.png" data-holder-rendered="true""/>
										<input class="stampImg" type="file" name="files" id="files" onchange="previewImage(this,'Img2')"
											accept="image/png, image/gif, image/jpg, image/jpeg" 
											style="width:66px;height:25px;position:absolute;left:10px;top:155px;opacity: 0;filter: alpha(opacity = 0);" />
					  				</div>
					  			</td>
					  		</tr>
					  </tbody>
					</table>
				</div> 
	</div>
  </body>
  
<script src="module/js/wait.js"></script>
<script src="module/js/setting/personalData.js"></script>
<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script> 
<script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
<script type="text/javascript">
	$('#chooseFile').click(function() {
		$('#files').click();

	});
	$('#cancel').click(function() {
		if (confirm("是否取消上传?")) {
			reload();
		}
	});
	$('#Img1').on('click', function() {
		$('.singnatureImg').click();
	});
	$('#Img2').on('click', function() {
		$('.stampImg').click();
	});
</script>
</html>
