<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>期间核查计划</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap2.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap-table.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/qualityPlan/QualityPlan.css">
	
	
    
    
  </head>
  
  <body>
    <div id="main">
     <div id="searcherArea">
    	<div id="showdiv1" class="alert alert-danger tan"></div>
    	    <div class="row">
	    	  <div class="col-xs-4 col-md-4 col-lg-4">
	    			<label class="spanstyle">计划名称:</label>
	    			<input id="type" type="text" class="form-control text">
	    		</div>
	    		<div class="col-xs-4 col-md-4 col-lg-4">
	    			<label class="spanstyle">执行年度:</label>
	    			<input id="year" type="text" class="form-control text">
	    		</div>
	    		<div class="col-xs-4 col-md-4 col-lg-4">
	    			<label class="spanstyle">计划编号:</label>
	    			<input id="code" type="text" class="form-control text">
	    		</div>
	        </div>
	      <div class="row">
	    	<div class="col-xs-4 col-md-4 col-lg-4">
    			<label class="spanstyle" style="display:inline-block;margin-left:13px;">审核人:</label>
    			<div class="btn-group" style="width: 70%">
				  <button type="button" class="btn mystyle btn-default dropdown-toggle" data-toggle="dropdown" style="width:100%;margin-left: -11px;">
				    <span id="textspan1"></span> <span style="position:absolute;left:95%;top:15px;" class="caret"></span>
				  </button>
				  <ul id="listul2" class="dropdown-menu" role="menu" style="width:100%;">
				  </ul>
				</div>
    		</div>
	       </div>
    
    	<div id="restcontent">
    		<!-- //综合管理室的人则是新增（提交），删除，修改，全部数据，详情
    		//技术主管审核
    		//其他各个科室则是新增建议页面
    		//综合管理室+技术主管新增（提交），删除，修改，全部数据，详情，审核 -->
    			<button type="button" class="btn btn-primary btncss" onclick="refresh()">搜索</button>
    			<button type="button" class="btn btn-primary Addbtn" onclick="addrow()">新增</button>
    			<button type="button" class="btn btn-primary Allbtn" onclick="resetAlldata()">全部数据</button>
    			<button type="button" class="btn btn-primary detailsbtn" onclick="ToResultJSP()">计划详情</button>
    			<button type="button" class="btn btn-primary delbtn" onclick="deletequalityPlan()">删除</button>
    			<button type="button" class="btn btn-primary changebtn" onclick="updataqualityPlan(this)">修改</button>    			
    			<button type="button" class="btn btn-primary thisbtn thatbtn" onclick="addQualityPlan(this)">提交</button>
    	</div>
    </div>
    		<hr />
		<div id="tablecontent">
			<table id="table">
			</table>
		</div>
	</div>
    <script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/bootstrap-table.min.js"></script>
	<script src="assets/js/bootstrap-table-zh-CN.min.js"></script>
	<script src="module/js/qualityPlan/QualityPlan.js"></script>
    <script>
  	function timeget(){
  		$('#year').datetimepicker({
  			minView:'year',
			format: 'yyyy',
			autoclose:1,
			todayHighlight:1,
			startView:2,
			forceParse:0,
			showMeridian:1,
			language:'zh-CN'      /*此属性是显示顺序，还有显示顺序是mm-dd-yyyy*/
		});
		$('#year').focus();
  	}
  	</script>
  </body>
</html>
