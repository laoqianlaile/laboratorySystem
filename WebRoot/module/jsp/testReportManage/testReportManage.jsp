<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>检测报告管理</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!-- <link rel="stylesheet" type="text/css" href="styles.css"> -->

<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/testReportManage/testReportManage.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="module/js/jquery.uploadify.min.js"></script>



</head>

<body>
<div style="min-width:1300px">
	<div class="form-group form-inline" id="searchArea">
	 <div style="float:left" id="searchTextArea" >
		<div id="searchAreaTop" >
		<label class="control-label">交接单号:</label>
		  <input type="text" class="form-control" name="transitreceiptNumber" id="transitreceiptNumber"> 
	    <label class="control-label">委托单位:</label>
		   <input type="text" class="form-control" name="client" id="client">
	    <label  class="control-label">报告名称:</label> 
	    <input type="text" class="form-control" name="reportName" id="reportName" style="margin-right:15px">
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
	          <input type="text" name="endTime" id="endTime">
	          <span class="input-group-addon"  style="display:inline">
			     <span class="glyphicon glyphicon-remove">
			     </span>
			  </span>
	          <span class="input-group-addon" style="display:inline">
				 <span class="glyphicon glyphicon-th">
				 </span>
			</span>   
	    </div> 
    
	   	<div class="form-group form-inline" style="display:inline">
		    <label class="control-label">审核状态:</label> 
		    <select class="form-control" id="selectPart" >
		        <option value="6">所有情况</option>
				<option value="0">未提交</option>
				<option value="1">审核中</option>
				<option value="2">审核未通过</option>
				<option value="3">审核通过</option>
				<option value="4">归档</option>
				<option value="5">报告未上传</option>
			</select>
		  
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
	<div class="input-group" id="functionButton" >
		
		<button type="button" class="btn btn-info glyphicon glyphicon-search" onclick="checkReport()">查看
		</button>
		&nbsp;
		<button type="button" class="btn btn-danger glyphicon glyphicon-align-justify" onclick="recoat()">合并
		</button>
		&nbsp;
	    <button type="button" class="btn btn-warning glyphicon glyphicon-edit" onclick="recover()">重新覆盖
		</button>
	</div>
</div>

    <!-- 上传文件 -->
	<div id="recoverReport" class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:350px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">上传检测报告</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="files" style="text-align:left">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload" multiple="multiple">

							<div class="uploadFileText">
								<label >版本号码:</label>
								<input type="text"  class="form-control" name="fileVersionNumber" id="fileVersionNumber" "></textarea>
							</div>
							<div class="uploadFileText">
								<label >版本信息:</label>
								<textarea rows="3" class="form-control"  name="fileVersionInfo" id="fileVersionInfo" ></textarea>
							</div>
							<div class="uploadFileText">
								<label >备注信息:</label>
								<textarea rows="3"  class="form-control"  name="fileRemarks" id="fileRemarks"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
				
					<button type="button" class="btn btn-primary" id="ensure"name="ensure"
						onclick="recoverSure()">确定</button>
					<button type="button" class="btn btn-default" data-dismiss="modal"
						onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
				</div>
			</div>
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
					<div class="row" id="testReportDetalInfo"></div>

					<div class="row rowStyle" id="sampleInfo"></div>

					<div class="row rowStyle" id="testReportInfo"></div>

				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	

	<!-- 表格 -->
	<table id="table">

	</table>

<script src="module/js/testReportManage/testReportManage.js"></script>
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
