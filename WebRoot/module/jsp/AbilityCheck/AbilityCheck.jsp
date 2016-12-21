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
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/AbilityCheck/fileinput.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/AbilityCheck/messenger.css">
	<link rel="stylesheet" type="text/css" href="module/css/AbilityCheck/messenger-theme-future.css">
	<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">


	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js" charset="UTF-8"></script>
	<script src="module/js/AbilityCheck/messenger.js"></script>
	<style type="text/css">
	<script src="module/js/fileManage/fileManage.js"></script>
	<script src="module/js/jquery.uploadify.min.js"></script>
	.Forbid:hover{
	cursor:not-allowed;
	}
	.inputWidth{
	width:70%;
	}
	.span4{
	width: 710px;
    height: 50px;
    padding: 7px 5px;
    float:left;
	}
	.newButton{
	height: 40px;
    margin: 5px;
	}
	</style>
  </head>
  
  <body>
 
 <div class="container-fluid">
		<div class="span4">
			<div class="form-group">
			<label for="firstname" class="col-sm-2 control-label">组织者</label>
			<div class="col-sm-10">
			<input type="text" class="form-control inputWidth"  id="Organizer" placeholder="请输入名字"  >
			</div>
			</div>
		</div>
		<div class="span4">
			<div class="form-group">
				<label for="firstname" class="col-sm-2 control-label">设备名称</label>
				<div class="col-sm-10">
					<select class="form-control inputWidth" id="Devicename"></select>
				</div>
			</div>
			</div>
		<div class="span4">
			<div class="form-group">
				<label for="firstname" class="col-sm-2 control-label">计划执行时间</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" style="width:32.5%;float:left;" id="Executiontime" placeholder="请输入开始时间" >
					<span style="width: 5%;float: left;font-size: 20px;text-align: center;line-height: 30px;">至</span>
					<input type="text" class="form-control" style="width:32.5%;float:left;" id="Executiontime2" placeholder="请输入结束时间" >
				</div>
			</div>
		</div>
		
			<div class="span4">
			<div class="form-group">
				<label for="firstname" class="col-sm-2 control-label">实施类型</label>
				<div class="col-sm-10">
					<select class="form-control inputWidth" id="Implement">
						<option>测量审核</option>
						<option>能力验证</option>
					</select>
				</div>
			</div>
		</div>
		
		<div class="span4">
		<button onclick="find()" style="width: 85px;" class="btn btn-success glyphicon glyphicon-search" >查找</button>
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
	 		    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        	<button type="button" onclick="deletePlan()" class="btn btn-primary">确定</button>
	 		   </div>
	     </div>
	     </div>
	   </div>
	      
		<!-- 审核弹框 -->
  	<div id="checkModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">审核</h4>
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
             	<div style="margin-top: 15px;">
             	<input id="file" name="file" type="file" value=""></div> 
             	<button type="submit" style="display:none;">
               </div>
             </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" onclick="check()" class="btn btn-primary">提交</button>
	     </form> 
	      </div>
	    	
	    </div>
	  </div>
	</div>
	
		<div class="input-group" style="float: left;margin-bottom: 10px;">
  		<button type="button" onclick="add()" class="btn btn-info glyphicon glyphicon-plus newButton">&nbsp;制定计划</button>
  		<button type="button" onclick="editPlan()" class="btn btn-info glyphicon glyphicon-edit newButton">&nbsp;修改计划</button>
		<button type="button" onclick="deleteModal()" class="btn btn-info glyphicon glyphicon-remove newButton">&nbsp;删除计划</button>
  		<button onclick="download()"  class="btn btn-info glyphicon glyphicon-download-alt newButton">&nbsp;下载报告</button>
  		<button onclick="checkTable()" type="button" class="btn btn-info glyphicon glyphicon-file newButton" >&nbsp;填写结果</button>
  		<button class='btn btn-info glyphicon glyphicon-refresh newButton' onclick="refresh2()" type='button'>&nbsp;刷新&nbsp;</button>
  		</div> 
  			<button id="uploading" style="float:right;display: none;" class="btn btn-primary glyphicon glyphicon-arrow-up" onclick="addPlan(this)" type="button">&nbsp提交&nbsp</button>
		<table class="table table-bordered table-hover"  id="table"></table>

		
</body>

  <script type="text/javascript" src="module/js/AbilityCheck/AbilityCheck.js"></script>
  <script type="text/javascript">
$('#Implement').val("");
$('#Organizer').val("");
$('#Executiontime').val("");

</script>
</html>
