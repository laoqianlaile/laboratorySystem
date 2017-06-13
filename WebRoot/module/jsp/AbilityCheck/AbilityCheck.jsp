<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>能力验证计划</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="module/css/AbilityCheck/messenger.css">
	<link rel="stylesheet" type="text/css" href="module/css/AbilityCheck/messenger-theme-future.css">
	<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
	<link rel="stylesheet" type="text/css" href="module/css/AbilityCheck/AbilityCheck.css">


	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="module/js/AbilityCheck/messenger.js"></script>
  </head>
  
  <body>
 
 <div class="row">
		<div class="col-xs-4">
			<label>组织者:</label>
			<input type="text" class="form-control"  id="Organizer" aria-describedby="basic-addon1" placeholder="请输入名字"  >
		</div>
		<div class="col-xs-4">
				<label>设备名称:</label>
					<select class="form-control" id="Devicename"></select>
			</div>
			
			<div class="col-xs-4">
				<label>实施类型:</label>
				<select class="form-control" id="Implement">
						<option>测量审核</option>
						<option>能力验证</option>
				</select>
			</div>
		
	</div>
	<div class="row">
	<div class="col-xs-4">
				<label class="wide">计划执行时间:</label>
				<div class="input-group date form_datetime timeChooseDiv">
				<input type="text" class="form-control"  id="Executiontime" size="16" type="text" value="" 
				readonly="true" placeholder="请输入开始时间" > <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div> 
		</div>
		
		<div class="col-xs-4">
			<label>至:</label>
			<div class="input-group date form_datetime timeChooseDiv">
			<input type="text" class="form-control"  id="Executiontime2" size="16" type="text" value="" 
			readonly="true" placeholder="请输入开始时间" ><span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div> 
		</div>
		<div class="col-xs-1 col-md-1 col-lg-1">
		<button onclick="find()"  class="btn btn-primary glyphicon glyphicon-search" >&nbsp;查找&nbsp;</button>
		</div>
	</div>

		<!-- 确认删除 -->
  	<div id="delModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	 		   <div class="modal-body">
	 		   <h5>是否确认删除</h5>
	 		   </div>
	 		    <div class="modal-footer">
	 		    <button type="button" onclick="deletePlan()" class="btn btn-primary tanSureButton">确定</button>
	 		  	<button type="button" class="btn btn-default tanCancelButton" data-dismiss="modal">取消</button>
	        	 </div>
	     </div>
	     </div>
	   </div>
	      
		<!-- 审核弹框 -->
  	<div id="checkModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header" style="height:40px;">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span style="color: #ffffff;" aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" style="margin-top: -5px;">审核</h4>
	      </div>
	      <div class="modal-body">
	      	<div class="row">
		       <div class="col-xs-12 col-md-12">
                   <h4>结果：</h4>
                   <select class="form-control" id="check_Result">
                   <option>满意</option>
                   <option>不满意</option>
                   </select>
               </div>
               
				<div class="col-xs-12 col-md-12">
                   <h4>实施类型：</h4>
                  <select class="form-control" id="get_Type">
                  <option>测量审核</option>
                  <option>能力验证</option>
                  </select>
               </div>
   
               <form action="abilityCheckController/imageUpload.do" method="post" enctype="multipart/form-data">
               <div class="col-xs-12 col-md-12">
 				<input  id="cID" type="hidden" name="fileID" value=""></input>
               	<input  id="cstate" type="hidden" name="state" value="0"></input>
   				<h4>上传文件：</h4>
             	<input id="fileName" class="form-control fileText" type="text" value="">
             	<img  class="fileImage" src="module/img/upload_icon.png">
       			 <div style="position:relative;">
             	<div class="fileFont">
             	<h4>添加文件</h4>
             	</div>
             </div>
 				<input id="file" name="file" type="file" value="" class="fileClick" onchange="change()">
             	</div>
             	<button type="submit" style="display:none;">

             </div>
	      </div>
	      <div class="modal-footer">
	             <button type="button" onclick="check()" class="btn btn-primary tanSureButton">提交</button>
	        <button type="button" class="btn btn-default tanCancelButton" data-dismiss="modal">取消</button>
	     </form> 
	      </div>
	    	
	    </div>
	  </div>
	</div>
	
		<div class="input-group" style="float: left;margin-bottom: 10px;">
  		<button type="button" onclick="add()" class="btn btn-primary glyphicon glyphicon-plus newButton">&nbsp;制定计划</button>
  		<button type="button" onclick="editPlan()" class="btn btn-primary glyphicon glyphicon-edit newButton">&nbsp;修改计划</button>
		<button type="button" onclick="deleteModal()" class="btn btn-primary glyphicon glyphicon-remove newButton">&nbsp;删除计划</button>
  		<button onclick="download()"  class="btn btn-primary glyphicon glyphicon-download-alt newButton">&nbsp;下载报告</button>
  		<button onclick="checkTable()" type="button" class="btn btn-primary glyphicon glyphicon-file newButton" >&nbsp;填写结果</button>
  		<button class='btn btn-primary glyphicon glyphicon-refresh newButton' onclick="refresh2()" type='button'>&nbsp;刷新&nbsp;</button>
  		</div> 
  			<button id="uploading" style="float:right;" class="btn btn-primary glyphicon glyphicon-ok newButton" onclick="addPlan(this)" type="button">&nbsp提交制定计划&nbsp</button>
		<table class="table table-bordered table-hover"  id="table">
		</table>

		
</body>

  <script type="text/javascript" src="module/js/AbilityCheck/AbilityCheck.js"></script>
  <script type="text/javascript">
$('#Implement').val("");
$('#Organizer').val("");

</script>
</html>
