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
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-table.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-datetimepicker.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/timecheck/TimeCheck.css">
	
	
	
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
  			<br />
  			<br />
  			<div class="headtext">
    			<span class="spanstyle">计划项目编号:</span>
    			<input id="projectcode" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">比对/核查点:</span>
    			<input id="projectpoint" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">计划完成时间:</span>
    			<input id="starttime" type="text" class="form-control text time">
    			<button type="button" class="btn btn-default btn-lg timeStyle" onclick="timeget(1)">
				  <span class="glyphicon glyphicon-time"></span> 
				</button>
				至
				<input id="endtime" type="text" class="form-control text time">
    			<button type="button" class="btn btn-default btn-lg timeStyle" onclick="timeget(2)">
				  <span class="glyphicon glyphicon-time"></span> 
				</button>
    		</div>
    		<div class="headtext">
    			<button id="searchbtn" type="button" class="btn btn-info btncss" onclick="refresh()">搜索</button>
    		</div>
    		<br />
    		<br />
    		<div class="headtext">
    			<span class="spanstyle">项&nbsp;&nbsp;目&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;称:</span>
    			<input id="projectname" type="text" class="form-control text">
    		</div>
    		<div class="headtext">
    			<span class="spanstyle">负&nbsp;&nbsp;责&nbsp;部&nbsp;&nbsp;门:</span>
    			<div class="btn-group">
				  <button type="button" class="btn mystyle btn-default dropdown-toggle" data-toggle="dropdown">
				    <span id="textspan1"></span> <span style="position:absolute;left:175px;top:15px;" class="caret"></span>
				  </button>
				  <ul id="listul1" class="dropdown-menu" role="menu" style="width:200px;">
				  </ul>
				</div>
    		</div>
    		<div class="headtext">
    			<!-- <span class="spanstyle">&nbsp;负&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;责&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人&nbsp;:</span>
    			<div class="btn-group">
				  <button id="listbutton2" class="btn btn-default mystyle dropdown-toggle" type="button" data-toggle="dropdown">
				    <span id="textspan2"></span><span style="position:absolute;left:175px;top:15px;" class="caret"></span>
				  </button>
				  <ul id="listul2" class="dropdown-menu" role="menu" style="width:200px;">

				  </ul>
				</div> -->
    		</div>
    		
  		</div>
  		<hr />
  		<div id="center">
  			<div >
    			<button type="button" class="btn btn-info thisbtn" onclick="deleteTimeCheck()">删除</button>
    			<button type="button" class="btn btn-info thisbtn" onclick="addrow()">新增</button>
    			<button type="button" class="btn btn-info thisbtn" onclick="updata(this)">修改</button>
    			<button type="button" class="btn btn-info thisbtn" onclick="resetAlldata()">全部数据</button>
    			<button type="button" style="display:none" class="btn btn-info thisbtn" onclick="ToAuditJSP()">审核</button>
    			<button type="button" style="display:none" class="btn btn-info thisbtn" onclick="ToResultJSP()">结果</button>
    			<button type="button" class="btn btn-info thisbtn thatbtn" onclick="add(this)">提交</button>
    		</div>
    		<div class="tablecontent">
	    		<table id="table">
	    		</table>
    		</div>
  		</div>                                                                                                                                                                                                             
  		<hr />
  		<div id="bottom">
  			<div>
    			<button type="button" id="asda" class="btn btn-info thisbtn" data-toggle="modal"  onclick="getsugestID()">&nbsp;上传核查记录</button>
    			<button type="button" class="btn btn-info thisbtn" onclick="download()">下载</button>
    		</div>
    		<div class="tablecontent">
    			<table id="tablefile">
    			</table>
    		</div>
  		</div>
  		<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  		<div class="modal-dialog" role="document">
	    		<div class="modal-content">
	      			<div class="modal-header">
	        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        				<h4 class="modal-title" id="myModalLabel">上传文件</h4>
	      			</div>
	      			<div class="modal-body">
	        			<form id="adddata" action="timeCheckController/upload.do" method="post" enctype="multipart/form-data" class="form-horizontal">
	        				<div id="files">
		        				<div class="form-group">
				    				<label for="inputEmail3" class="col-sm-2 control-label">选择文件</label>
				    				<div class="col-sm-10">
				      					<input id="fileupload" type="file" name="file"  placeholder="请选择">
				    				</div>
				    			</div>
				    			<div class="form-group">
	    							<label for="inputPassword3" class="col-sm-2 control-label">备注</label>
	    							<div class="col-sm-10">
	     								<input type="text" class="form-control" id="remarks" name="remark">
	    							</div>
	  							</div>
	  							<div class="form-group" style="visibility:hidden;">
	    							<label for="inputPassword3" class="col-sm-2 control-label">ID</label>
	    							<div class="col-sm-10">
	     								<input type="text" class="form-control" id="belongID" name="belongID" readonly="true">
	    							</div>
	  							</div>
								<div class="modal-footer">
				      				<button type="submit" class="btn btn-primary">确定</button>
					        		<button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>	
		      					</div>
	      					</div>
	        			</form>
	      			</div>
	      			
	   		 </div>
	  	</div>
	</div><!-- 弹出新增部门框 -->
  	</div>
  	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
	<script src="assets/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="assets/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/jquery.uploadify.min.js"></script>
	<script src="module/js/timecheck/TimeCheck.js"></script>
  	<script>
  	function timeget(num){
  		$('.time').datetimepicker({
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
		if(num==1)
			$('#starttime').focus();
		if(num==2)
			$('#endtime').focus();
  	}
  	</script>
  </body>
</html>
