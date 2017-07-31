<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>西计实验室管理系统</title>
<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../../css/bootstrap-table.css">
<link rel="stylesheet" href="../../css/changeACE.css" />
<link rel="stylesheet" href="../../css/sampleRoom/sampleRoom.css" />
<link rel="stylesheet" type="text/css" href="../../css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css" href="../../css/sweetalert.css">
<link rel="stylesheet" type="text/css" href="../../css/bootstrap-datetimepicker.css">

  
<script src="../../js/jquery-2.1.1.min.js"></script>
<script src="../../js/bootstrap.js"></script>
<script src="../../js/bootstrap-table.js"></script>
<script src="../../js/bootstrap-table-zh-CN.js"></script>
<script src="../../../assets/js/autoPage.js"></script>
<script src="../../js/sweetalert.min.js"></script>
<script src="../../js/bootstrap-datetimepicker.js"></script>
<script src="../../js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="../../js/bootstrap-datetimepicker.fr.js"></script>


</head>
<body>

	<!-- 功能按钮 -->
	<div id="searcherArea">
		<div class="row">
			<div class=" col-xs-4 col-md-4 col-lg-4">
				<label>出厂编码：</label><input type="text" id="schFactoryCode"
					name="schFactoryCode" class="form-control"
					aria-describedby="basic-addon1">
			</div>
			<div class=" col-xs-4 col-md-4 col-lg-4">
				<label>样品名称：</label><input type="text" id="schSampleName"
					name="schSampleName" class="form-control"
					aria-describedby="basic-addon1">
			</div>
			<div class=" col-xs-4 col-md-4 col-lg-4">
				<label>样品型号：</label><input type="text" id="schSampleType"
					name="schSampleType" class="form-control"
					aria-describedby="basic-addon1">
			</div>
		</div>
		<div class="row">
			<div class=" col-xs-4 col-md-4 col-lg-4">
				<div class="timeLabelDiv">
					<label class="control-label">委托时间:</label>
				</div>
				<div class="input-group date form_datetime timeChooseDiv">
					<input class="form-control" id="schStartTime" name="schStartTime"
						size="16" type="text" value="" readonly="true"> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
			<div class=" col-xs-4 col-md-4 col-lg-4">
				<div class="timeLabelDiv">
					<label class="control-label">至:</label>
				</div>
				<div class="input-group date form_datetime timeChooseDiv">
					<input class="form-control" id="schEndTime" name="schEndTime"
						size="16" type="text" value="" readonly="true"> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon"><span
						class="glyphicon glyphicon-calendar"></span></span>
				</div>
			</div>
			<!-- 	<div class=" col-xs-4 col-md-4 col-lg-4">  <label>交接单号：</label><input type="text" id="schReceiptlistCode" name="schReceiptlistCode" class="form-control" aria-describedby="basic-addon1"></div>
	 -->
		</div>
	</div>
	<div class="input-group-area" >
		<button type="button"
			class="btn btn-primary glyphicon glyphicon-search"
			onclick="seacher()">查询</button>
		<button type="button" class="btn btn-primary glyphicon glyphicon-plus"
			onclick="addSample()">新增</button>
	 	<button type="button" onclick="importSample()"
			class="btn btn-primary glyphicon glyphicon-upload">导入</button>
		<button type="button" onclick="exportSample()" 
			class="btn btn-primary glyphicon glyphicon-download">导出</button> 
		<button id="del" onclick="delData()" type="button"
			class="btn btn-primary glyphicon glyphicon-remove">删除</button>
		<button id="refresh" onclick="refresh()" type="button"
			class="btn btn-primary glyphicon glyphicon-refresh">刷新</button>
	</div>

	<!-- 新增弹框 -->
	<div id="addModal" class="modal fade" module="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<label>出厂编号：</label>
							<input type="text" id="addFactoryCode" name="addFactoryCode"
								class="form-control" aria-describedby="basic-addon1"
								  value=""/>
							<div class="tip-factory  ">
							     <div class="tip-factory-content"></div>
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>样品名称：</label>
							<input type="text" id="addSampleName" name="addSampleName"
								class="form-control" aria-describedby="basic-addon1" value=""/>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>规格/型号：</label>
							<input type="text" id="addSampleType" name="addSampleType"
								class="form-control" aria-describedby="basic-addon1" value=""/>
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<h4>交接单号：</h4>
							<input type="text" id="addReceiptlistCode" name="addReceiptlistCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div> -->
						<div class="col-xs-12 col-md-12">
							<label>单位：</label>
							<select id="addUnit" name="addUnit" class="form-control"
								aria-describedby="basic-addon1">
								<option>个</option>
								<option>件</option>
								<option>套</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>备注：</label>
							<input type="text" id="addRemarks" name="addRemarks"
								class="form-control" aria-describedby="basic-addon1" value=""/>
						</div>

					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="add()">新增</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				
				</div>
			</div>
		</div>
	</div>

	<!-- 查看弹框 -->
	<div id="showModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">查看</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<label>出厂编号：</label>
							<input type="text" id="lookFactoryCode" name="lookFactoryCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>样品名称：</label>
							<input type="text" id="lookSampleName" name="lookSampleName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>规格/型号：</label>
							<input type="text" id="lookSampleType" name="lookSampleType"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<h4>交接单号：</h4>
							<input type="text" id="lookReceiptlistCode" name="lookReceiptlistCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div> -->
						<div class="col-xs-12 col-md-12">
							<label>单位：</label>
							<select id="lookUnit" name="lookUnit" class="form-control"
								aria-describedby="basic-addon1">
								<option>个</option>
								<option>件</option>
								<option>套</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>备注：</label>
							<input type="text" id="lookRemarks" name="lookRemarks"
								class="form-control" aria-describedby="basic-addon1" />
						</div>

					</div>
				</div>


				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">确定</button>
					<!--  <button type="button" class="btn btn-primary" onclick="edit()">修改</button> -->
				</div>
			</div>
		</div>
	</div>

	<!-- 修改弹框 -->
	<div id="editModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<label>出厂编号：</label>
							<input type="text" id="editFactoryCode" name="editFactoryCode"
								class="form-control" aria-describedby="basic-addon1"
								 />
							<div class="tip-factory  ">
							     <div class="tip-factory-content"></div>
							</div>
							<input type="hidden" id="editSampleID">
						</div>
						<div class="col-xs-12 col-md-12">
							<label>样品名称：</label>
							<input type="text" id="editSampleName" name="editSampleName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<label>规格/型号：</label>
							<input type="text" id="editSampleType" name="editSampleType"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<h4>交接单号：</h4>
							<input type="text" id="editReceiptlistCode" name="editReceiptlistCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div> -->
						<div class="col-xs-12 col-md-12">
							<label>单位：</label>
							<select id="editUnit" name="editUnit" class="form-control"
								aria-describedby="basic-addon1">
								<option>个</option>
								<option>件</option>
								<option>套</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<label>备注：</label>
							<input type="text" id="editRemarks" name="editRemarks"
								class="form-control" aria-describedby="basic-addon1" />
						</div>

					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" onclick="edit()">修改</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					
				</div>
			</div>
		</div>
	</div>
    
    <div id="importSampleModal" class="modal fade" role="dialog"  
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document" style="width:450px">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">导入Excel文件</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div id="fileInfo" style="text-align:left">
							<div id="file2">
								<input type="file" name="files" id="files" style="display:none" onchange="vaildFileType(this)">
							</div>
							
							<button type="button" id="submitFile" name="submitFile" class="btn btn-default">
								<span class="glyphicon glyphicon-folder-open ">选择文件</span> 
							</button>
							<span id="fileName"></span>
						</div>
					</div>
				</div>
				<div class="modal-footer">

					<button class="btn btn-primary" id="submitFileBtn" >提交</button> 
					<button type="button" style="background:#fff;color:#333;"
						class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
		

	<table id="table">
	</table>


</body>

<script src="../../js/fileManage/fileManage.js" type="text/javascript"></script>
<script type="text/javascript" src="../../../assets/fileupload/jquery.iframe-transport.js"></script>
<script type="text/javascript" src="../../../assets/fileupload/jquery.ui.widget.js"></script>
<script type="text/javascript" src="../../../assets/fileupload/jquery.fileupload.js"></script>
<script src="../../js/sampleRoom/sampleRoom.js"></script>

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
	$('#submitFile').click(function() {
		$('#files').click();
	});
	</script>
</html>