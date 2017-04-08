<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../../css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="../../css/fileManage/fileManage.css">
<link rel="stylesheet" href="../../css/changeACE.css" />
<link rel="stylesheet" type="text/css" href="../../css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="../../../assets/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="../../css/receiptlistManage/receiptlistManage.css">
<link rel="stylesheet" type="text/css" href="../../css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css" href="../../css/sweetalert.css">

<script src="../../js/jquery-2.1.1.min.js"></script>
<script src="../../js/bootstrap.js"></script>
<script src="../../js/bootstrap-table.js"></script>
<script src="../../js/commonTool.js"></script>
<script src="../../js/bootstrap-table-zh-CN.js"></script>
<script src="../../js/jquery.uploadify.min.js"></script>
<script src="../../js/bootstrap-datetimepicker.js"></script>
<script src="../../js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="../../js/bootstrap-datetimepicker.fr.js"></script>
<script src="../../js/fileManage/fileManage.js" type="text/javascript"></script>
<script src="../../js/sweetalert.min.js"></script>



</head>
<body>
	
	<!-- 功能按钮 -->
	<div id="searcherArea">
		<div class="row">
			<div class="col-xs-3 col-md-3 col-lg-3"><label>交接单号：</label><input type="text" id="schReCode" name="schFactoryCode" class="form-control" aria-describedby="basic-addon1"></div>
			<div class="col-xs-3 col-md-3 col-lg-3"><label>合同编号：</label><input type="text" id="schCoCode" name="schSampleName" class="form-control" aria-describedby="basic-addon1"> </div>
			<div class="col-xs-3 col-md-3 col-lg-3"><label>委托单位：</label><input type="text" id="schCompnyName" name="schCompnyName" class="form-control" aria-describedby="basic-addon1"></div>
	        <div class="col-xs-3 col-md-3 col-lg-3"> <label>类型：</label><select id="schReType" name="schReType" class="form-control" aria-describedby="basic-addon1">
	        <option value="2">所有</option>
	        <option value='0'>接受</option>
	        <option value="1">退还</option>
	         </select></div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-md-3 col-lg-3"><label>委托人：</label><input  type="text" id="schLinkMan" name="schStartTime" class="form-control" aria-describedby="basic-addon1"> </div>
			<!-- <span>委托时间：</span><input type="date" id="schStratTime" name="schStratTime" class="form-control" aria-describedby="basic-addon1">
		    <span>至：</span><input type="date" id="schEndTime" name="schEndTime" class="form-control" aria-describedby="basic-addon1">
	 -->	  <div class="col-xs-3 col-md-3 col-lg-3">
				<!-- <div class="timeLabelDiv"> --><label class="control-label" >委托时间:</label><!-- </div>  -->  
			<div class="input-group date form_datetime timeChooseDiv"> 
   					<input class="form-control" id="schStratTime" size="16" type="text" value="" readonly="true">
    				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				 </div> 
			</div>
			<div class="col-xs-3 col-md-3 col-lg-3">
				<!-- <div class="timeLabelDiv"> --><label class="control-label" >至:</label><!-- </div> -->
				<div class="input-group date form_datetime timeChooseDiv">
   					<input class="form-control" id="schEndTime" size="16" type="text" value="" readonly="true">
    				<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
					<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
		   <div class="col-xs-3 col-md-3 col-lg-3"> <label>状态：</label><select id="schState" name="schState" class="form-control" aria-describedby="basic-addon1">
		       <option value="4">所有</option>
		       <option value='0'>未检测</option>
		       <option value="1">检测中</option>
		       <option value="2">检测完成</option>
		       <option value="3">异常终止</option>
		    </select>
		</div>
	</div>
	</div>
	<div class="input-group-area" >
		<button type="button" class="btn btn-primary glyphicon glyphicon-search"
			onclick="seacher()">&nbsp;查询</button>
		<button type="button" class="btn btn-primary glyphicon glyphicon-plus"
			onclick="addRe()">&nbsp;新增交接单</button>
		<button type="button" class="btn btn-primary glyphicon glyphicon-show"
		    onclick="addReNo()" >&nbsp;无合同新增</button>
		<button type="button" class="btn btn-primary glyphicon glyphicon-edit"
		    onclick="returnSample()">&nbsp;退还样品</button>
		    <button type="button" class="btn btn-primary glyphicon glyphicon-remove"
		    onclick="deleteRe()">&nbsp;删除</button>
		<button id="refresh" onclick="refresh()" type="button"
			class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
	</div>

	<!-- 表格-->
	<table id="table">
	</table>


</body>
<script src="../../js/receiptlistManage/receiptlistManage.js"></script>
<script type="text/javascript">
	$('.form_datetime').datetimepicker({
	    language: 'zh-CN',
	    weekStart: 1,
	    todayBtn: 1,
	    autoclose: 1,
	    todayHighlight: 1,
	    startView: 2,
	    minView: 2,
	    maxView: 3,
	    forceParse: 0,
	    format: 'yyyy-mm-dd'
	});
	</script>
</html>