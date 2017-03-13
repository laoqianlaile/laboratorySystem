<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>西计实验室管理系统</title>
<link rel="stylesheet" type="text/css" href="../../css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../../css/bootstrap-table.css">

<script src="../../js/jquery-2.1.1.min.js"></script>
<script src="../../js/bootstrap.js"></script>
<script src="../../js/bootstrap-table.js"></script>
<script src="../../js/bootstrap-table-zh-CN.js"></script>
<script src="../../../assets/js/autoPage.js"></script>
<link rel="stylesheet" href="../../css/changeACE.css" />
<link rel="stylesheet" href="../../css/sampleRoom/sampleRoom.css" />
<link rel="stylesheet" type="text/css" href="../../css/commonSystem/commonSystem.css" />

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
			onclick="seacher()">&nbsp;查询</button>
		<button type="button" class="btn btn-primary glyphicon glyphicon-plus"
			data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
	<!-- 	<button type="button" onclick="showModal()"
			class="btn btn-primary glyphicon glyphicon-show">&nbsp;查看</button>
		<button type="button" onclick="openModal()"
			class="btn btn-primary glyphicon glyphicon-edit">&nbsp;修改</button> -->
		<button id="del" onclick="delData()" type="button"
			class="btn btn-primary glyphicon glyphicon-remove">&nbsp;删除</button>
		<button id="refresh" onclick="refresh()" type="button"
			class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;刷新</button>
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
							<h4>出厂编号：</h4>
							<input type="text" id="addFactoryCode" name="addFactoryCode"
								class="form-control" aria-describedby="basic-addon1"
								  onblur="isExitFactory('add')"/> <!-- onpropertychange="set_alert_wb_comment(this,'onp')" oninput="set_alert_wb_comment(this,'oni')" -->
							<div class="tip-factory  ">
							     <div class="tip-factory-content"></div>
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品名称：</h4>
							<input type="text" id="addSampleName" name="addSampleName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>规格/型号：</h4>
							<input type="text" id="addSampleType" name="addSampleType"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<h4>交接单号：</h4>
							<input type="text" id="addReceiptlistCode" name="addReceiptlistCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div> -->
						<div class="col-xs-12 col-md-12">
							<h4>单位：</h4>
							<select id="addUnit" name="addUnit" class="form-control"
								aria-describedby="basic-addon1">
								<option>个</option>
								<option>件</option>
								<option>套</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>备注：</h4>
							<input type="text" id="addRemarks" name="addRemarks"
								class="form-control" aria-describedby="basic-addon1" />
						</div>

					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="add()">新增</button>
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
							<h4>出厂编号：</h4>
							<input type="text" id="lookFactoryCode" name="lookFactoryCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品名称：</h4>
							<input type="text" id="lookSampleName" name="lookSampleName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>规格/型号：</h4>
							<input type="text" id="lookSampleType" name="lookSampleType"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<h4>交接单号：</h4>
							<input type="text" id="lookReceiptlistCode" name="lookReceiptlistCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div> -->
						<div class="col-xs-12 col-md-12">
							<h4>单位：</h4>
							<select id="lookUnit" name="lookUnit" class="form-control"
								aria-describedby="basic-addon1">
								<option>个</option>
								<option>件</option>
								<option>套</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>备注：</h4>
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
							<h4>出厂编号：</h4>
							<input type="text" id="editFactoryCode" name="editFactoryCode"
								class="form-control" aria-describedby="basic-addon1"
								onblur="isExitFactory('edit')" />
							<div class="tip-factory  ">
							     <div class="tip-factory-content"></div>
							</div>
							<input type="hidden" id="editSampleID">
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品名称：</h4>
							<input type="text" id="editSampleName" name="editSampleName"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>规格/型号：</h4>
							<input type="text" id="editSampleType" name="editSampleType"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<!-- <div class="col-xs-12 col-md-12">
							<h4>交接单号：</h4>
							<input type="text" id="editReceiptlistCode" name="editReceiptlistCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div> -->
						<div class="col-xs-12 col-md-12">
							<h4>单位：</h4>
							<select id="editUnit" name="editUnit" class="form-control"
								aria-describedby="basic-addon1">
								<option>个</option>
								<option>件</option>
								<option>套</option>
							</select>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>备注：</h4>
							<input type="text" id="editRemarks" name="editRemarks"
								class="form-control" aria-describedby="basic-addon1" />
						</div>

					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="edit()">修改</button>
				</div>
			</div>
		</div>
	</div>


	<table id="table">
	</table>


</body>
<script src="../../js/sampleRoom/sampleRoom.js"></script>
</html>