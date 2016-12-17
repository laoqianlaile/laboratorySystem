<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>检测报告审核管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
	<link rel="stylesheet" type="text/css" href="module/css/testReportManage/testReportManage.css">
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
  </head>
  
  <body>
   <div style="min-width:1200px">
	<div class="form-group form-inline" id="searchArea">
	 <div style="float:left" id="searchTextArea" >
		<div id="searchAreaTop" >
		<label class="control-label">交接单号:</label>
		  <input type="text" class="form-control" name="transitreceiptNumber" id="transitreceiptNumber"> 
	    <label class="control-label">委托单位:</label>
		   <input type="text" class="form-control" name="client" id="client">
	    <label  class="control-label">报告名称:</label> 
	    <input type="text" class="form-control" name="reportName" id="reportName" style="margin-right:0">
	  </div> 
	  
	<div id="searchAreaBottom">
	<div class="date form_datetime time input-group">
    	<label class="control-label">开始时间:</label>
          <input type="text"  name="beginTime" id="beginTime">
          <span class="input-group-addon" style="display:inline">
		     <span class="glyphicon glyphicon-remove">
		     </span>
		  </span> 
          <span class="input-group-addon" style="display:inline">
			 <span class="glyphicon glyphicon-th">
			</span>
		</span>   
    </div> 
    
   <div  class="date form_datetime time input-group">
    	<label class="control-label">结束时间:</label>
          <input type="text" name="endTime" id="endTime" >
          <span class="input-group-addon" style="display:inline">
		     <span class="glyphicon glyphicon-remove">
		     </span>
		  </span>
          <span class="input-group-addon" style="display:inline">
			 <span class="glyphicon glyphicon-th">
			 </span>
		</span>   
    </div> 
    

    

	</div>
		
	</div>
	 <div style="margin-top:15px">
	    <button type="button" class="btn btn-default" onclick="search()">
			<span class="glyphicon glyphicon-search"></span> 查询
		</button>	    
	</div>
	</div>
	<!-- 功能按钮 -->
	<div class="input-group" id="functionButton"  style="margin-top:24px;margin-bottom:15px;min-width:170px">
		<button type="button" class="btn btn-primary glyphicon glyphicon-arrow-down" onclick="filelDown()">下载
		</button>
		&nbsp;
		<button type="button" class="btn btn-info glyphicon glyphicon-search" onclick="checkReport()">查看
		</button>
	</div>
</div>

<div id="checkModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:1350px;">
			<div class="modal-content">

				<div class="modal-header">
						<h4 class="modal-title" id="receiptlistNumber" style="float:right"></h4>
						<h4 class="modal-title"><strong>查看检测报告</strong></h4>
				</div>

				<div class="modal-body" id="entrustInfo">

					<div class="row" id="testReportDetalInfo">
					</div>
					
					<div class="row rowStyle" id="sampleInfo">
				    </div>
				 
				 
				 <div class="row rowStyle" id="testReportInfo">
				</div>
				
				
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	

   
   <div id="secondAuditRejectModal" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:450px; ">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					</button>
					<h4 class="modal-title"><strong>填写驳回意见</strong></h4>
				</div>
				<div class="modal-body" id="entrustInfo">
					<hr />
					<div class="row" style="text-align:center">
					<span id="testReportID" style="display:none"></span>
					  <textarea id="rejectReson" class="form-control" style="">
					 </textarea>
					</div>
					<hr />
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="secondAuditRejectSure()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>



 	<!-- 表格 -->
	<table id="table">

	</table>


<script src="module/js/testReportSecondAuditManage/testReportSecondAuditManage.js"></script>
<script src="module/js/fileManage/fileManage.js"></script>
	<script type="text/javascript">
		$('.form_datetime').datetimepicker({
			language : 'zh-CN',
			weekStart : 1,
			todayBtn : 1,
			autoclose : 1,
			todayHighlight : 1,
			startView : 2,
			minView : 2,
			forceParse : 0,
			format : 'yyyy-mm-dd hh:ii:ss'
		});
	</script>
  </body>
</html>
