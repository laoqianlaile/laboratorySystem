<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String qualiyPlanId = request.getParameter("qualiyPlanId");
if(qualiyPlanId!=null&&qualiyPlanId!="")
	session.setAttribute("qualiyPlanId",qualiyPlanId);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>建议</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="module/css/timecheck/TimeCheck.css">
	<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
 	<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
	<link rel="stylesheet"  type="text/css" href="module/css/wait.css">
	<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" /> 
	<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
	
	
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
	<script src="module/js/jquery.uploadify.min.js"></script>
	<script src="module/js/sweetalert.min.js"></script>
  </head>
  
  <body>
  	<div id="main">
  		<span id="yearvalue" class="hiddenspan"><%=request.getParameter("year") %></span><span id="codevalue" class="hiddenspan"><%=request.getParameter("code") %></span>
  		<div id="showdiv1" class="alert alert-danger tan"></div>
  		<div id="font">
  			<%=request.getParameter("year") %>年度检测/校准结果质量保证/期间核查建议
  		</div>
  		<div id="head">
  			<p id="Serialnumber">编号:<label><%=request.getParameter("code") %></label></p>
  			<br>
  			<br>
  			<br>
  			<div class="row">
  			<div class="col-xs-4 col-md-4 col-lg-4">
    			<label>计划项目编号:</label>
    			<input id="projectcode" type="text" class="form-control text">
    		</div>
    		<div class="col-xs-4 col-md-4 col-lg-4">
    			<label>比对/核查点:</label>
    			<input id="projectpoint" type="text" class="form-control text">
    		</div>
    		 <div class="col-xs-4 col-md-4 col-lg-4">
    			<label class="spanstyle">项目名称:</label>
    			<input id="projectname" type="text" class="form-control text">
    		</div>
    		</div>
    		
    		<div class="row">
    		<div class="col-xs-4 col-md-4 col-lg-4">
    			<label>计划完成时间:</label>
    				<div class="input-group date form_datetime timeChooseDiv">
    				<input class="form-control" id="starttime" size="16"
						type="text" value="" readonly="true">
						<span class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
						</div>
    		</div>
  		  		<div class="col-xs-4 col-md-4 col-lg-4">
  		    		<label>至:</label>
  		    			<div class="input-group date form_datetime timeChooseDiv">
  		    		<input id="endtime" type="text" class="form-control">
						<span class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
						</div>
  		    	</div>
    		    <div class="col-xs-4 col-md-4 col-lg-4">
	    			<label class="spanstyle">负责部门:</label>
	    			<div class="btn-group" style="width:70%;">
					  <button type="button" class="btn mystyle btn-default dropdown-toggle" data-toggle="dropdown" style="width: 100%">
					    <span id="textspan1"></span> <span style="position: absolute;left: 271px;top: 12px;" class="caret"></span>
					  </button>
					  <ul id="listul1" class="dropdown-menu" role="menu" style="width:100%;">
					  </ul>
				    </div>
    		    </div>
    		</div>
    	<!-- style="float: right;" -->
<!--   			<div class="row">
    		<div class="col-xs-4 col-md-4 col-lg-4">
    			
    		</div>
    		</div> -->
    		
  		</div>
  		<div id="center">
  			<div id="restcontent">
    			<button type="button" class="btn btn-primary thisbtn" onclick="deleteTimeCheck()">删除</button>
    			<button type="button" class="btn btn-primary thisbtn" onclick="addrow()">新增</button>
    			<button type="button" class="btn btn-primary thisbtn" onclick="updata(this)">修改</button>
    			<button type="button" class="btn btn-primary thisbtn" onclick="resetAlldata()">全部数据</button>
    			<button type="button"  class="btn btn-primary thisbtn" onclick="ToAuditJSP()">审核</button>
    			<button type="button"  class="btn btn-primary thisbtn" onclick="ToResultJSP()">结果</button>
    			<button id="searchbtn" type="button"  class="btn btn-primary thisbtn" onclick="refresh()">搜索</button>
    			<button type="button" class="btn btn-primary thisbtn thatbtn" onclick="add(this)">提交</button>
    		</div>
  		</div>  
  		<hr />
  			<div class="tablecontent">
	    		<table id="table">
	    		</table>
    		</div>     
    		
    		<div id="restcontent">
    			<button type="button" id="asda" class="btn btn-primary thisbtn" data-toggle="modal"  onclick="openModal()">&nbsp;上传核查记录</button>
    			<button type="button" class="btn btn-primary thisbtn" onclick="download()">下载</button>
    		</div>                                                                                                                                                                                                      
  		<hr />
  		<div id="bottom">
    		<div class="tablecontent">
    			<table id="tablefile">
    			</table>
    		</div>
  		</div>
	<!-- 新增弹框 -->
	<div id="addModal" class="modal fade" role="dialog" style="display: none;"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" >
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">上传</h4>
				</div>
				<div class="modal-body">
					<input type= "hidden" id = "EMPLOYEEID" value = "<%=session.getAttribute("EMPLOYEEID")%>" />
					<div class="row">
						<div class ="col-md-6 column">
							<label>模板名称：</label> <input type="text" id="add_TemplateName"
								name="TemplateName" class="form-control" />
						</div>
						
						<div id="fileInfo" class="col-md-6 column">
							<div id="fileQueue">
								<input type="file" name="files" id="files" style="display:none" onchange="checkFile(this)">
							</div>
							<button type="button" id="chooseFile" name="chooseFile" class="btn btn-default">
								<span class="glyphicon glyphicon-folder-open "></span> 选择文件
							</button>
							<span id="fileName"></span>
							
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 column">
							<label>备注信息</label>
							<textarea id="add_TemplateRemarks" name = "TemplateReamarks"class="form-control" style="margin-left: -32px;height: 147px;"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" id="cancel" name="cancel" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" id="ensure" name="ensure" >确定</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 弹出新增部门框 -->
  	</div>
  	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script src="assets/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="assets/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/timecheck/TimeCheck.js"></script>
	<script src="module/js/wait.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script> 
	<script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
  	<script>
	$('.form_datetime').datetimepicker({
		minView:'month',
		format: 'yyyy-mm-dd',
		weekStart:1,
		todayBtn:1,
		autoclose:1,
		todayHighlight:1,
		startView:2,
		forceParse:0,
		showMeridian:1,
		language:'zh-CN'      /*此属性是显示顺序，还有显示顺序是mm-dd-yyyy*/
	});
	$('#chooseFile').click(function() {
		$('#files').click();

	});
	$('#cancel').click(function() {
		if (confirm("是否取消上传?")) {
			reload();
		}
	});
  	</script>
  </body>
</html>
