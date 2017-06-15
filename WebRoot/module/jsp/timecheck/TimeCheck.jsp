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
    			<label class="spanstyle">项&nbsp;&nbsp;目&nbsp;&nbsp;&nbsp;名&nbsp;&nbsp;称:</label>
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
    			<label class="spanstyle">负&nbsp;&nbsp;责&nbsp;部&nbsp;&nbsp;门:</label>
    			<div class="btn-group">
				  <button type="button" class="btn mystyle btn-default dropdown-toggle" data-toggle="dropdown">
				    <span id="textspan1"></span> <span style="position: absolute;left: 271px;top: 12px;" class="caret"></span>
				  </button>
				  <ul id="listul1" class="dropdown-menu" role="menu" style="width:200px;">
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
    			<button type="button" id="asda" class="btn btn-primary thisbtn" data-toggle="modal"  onclick="getsugestID()">&nbsp;上传核查记录</button>
    			<button type="button" class="btn btn-primary thisbtn" onclick="download()">下载</button>
    		</div>                                                                                                                                                                                                      
  		<hr />
  		<div id="bottom">
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
	  							<div class="form-group" style="visibility:hidden;">
	    							<label for="inputPassword3" class="col-sm-2 control-label">year</label>
	    							<div class="col-sm-10">
	     								<input type="text" class="form-control" id="belongID" name="year" readonly="true" value=<%=request.getParameter("year") %>>
	    							</div>
	  							</div>
	  							<div class="form-group" style="visibility:hidden;">
	    							<label for="inputPassword3" class="col-sm-2 control-label">code</label>
	    							<div class="col-sm-10">
	     								<input type="text" class="form-control" id="belongID" name="code" readonly="true" value=<%=request.getParameter("code") %>>
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
  	</script>
  </body>
</html>
