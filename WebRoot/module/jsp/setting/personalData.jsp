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
	<link rel="stylesheet"  type="text/css" href="module/css/setting/style.css"/>
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/setting/cropbox.js"></script>
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
    background: none;
    cursor:pointer;
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
.imgHead {
	width: 120px;
    height: 120px;
    border-radius: 100px;
    box-shadow: 0px 0px 12px #7E7E7E;
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
					  					 <img id="Img1"  src="module/img/file/defaultPhoto.jpg" style="max-width:300px;" data-holder-rendered="true"/>
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
					  					<img id="Img2"  src="module/img/file/defaultPhoto.jpg" style="max-width:300px;" data-holder-rendered="true""/>
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
	<!-- 图片编辑弹窗 -->
	<div id="CropModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content" style="width:650px;">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">头像裁切</h4>
				</div>
				<div class="modal-body">
					<div class="imageBox">
					  <div class="thumbBox"></div>
					  <div class="spinner" style="display: none">Loading...</div>
					</div>
					<div class="action"> 
					  <!-- <input type="file" id="file" style=" width: 200px">-->
					    <div class="new-contentarea tc"> 
					    	<a href="javascript:void(0)" class="upload-img">
					   	    	<label for="upload-file">上传图像</label>
					    	</a>
					      	<input type="file" class="" name="upload-file" id="upload-file" />
					    </div>
						    <input type="button" id="btnCrop"  class="Btnsty_peyton" value="裁切">
						    <input type="button" id="btnZoomIn" class="Btnsty_peyton" value="+"  >
						    <input type="button" id="btnZoomOut" class="Btnsty_peyton" value="-" >
					 	 </div>
					  <div class="cropped"></div>
					</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id="btnheadCrop">确认</button>
				</div>
			</div>
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
