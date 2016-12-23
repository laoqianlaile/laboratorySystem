<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'addRecelist.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link rel="stylesheet" type="text/css" href="./module/css/bootstrap.css">
<link rel="stylesheet" type="text/css"
	href="./module/css/bootstrap-table.css">
<link rel="stylesheet" href="./module/css/changeACE.css" />
<link rel="stylesheet" type="text/css"
	href="./module/css/fileManage/fileManage.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css"
	href="module/css/bootstrap-datetimepicker.css">

<script type="text/javascript" src="./module/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="./module/js/bootstrap.js"></script>
<script type="text/javascript" src="./module/js/bootstrap-table.js"></script>
<script type="text/javascript"
	src="./module/js/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript" src="./module/js/commonTool.js"></script>
<script src="./module/js/receiptlistManage/fileUpload.js"
	type="text/javascript"></script>
<script src="./module/js/jquery.uploadify.min.js" type="text/javascript"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>

<style type="text/css">
body {
	margin: 0 auto;
}

.container {
	min-width: 1300px;
	width: 100%;
	margin: 0 auto;
}

.row {
	margin-bottom: 7px;
}

.col-xs-6 input {
	width: 74%;
}

.col-xs-12 textarea {
	width: 90%;
}

.col-xs-12 label {
	vertical-align: top;
}

.headTitel label {
	text-align: right;
	display: inline-block;
	width: 49.5%;
	font-family: cursive;
	font-size: larger;
}

.headHr {
	border: 1px solid black;
	margin-bottom: 5px;
	margin-top: 0px;
}

.headTitel label:FIRST-CHILD {
	text-align: left;
}

.form-control {
	display: inline;
	width: 70%;
}

.main {
	margin-top: 25px;
}

.mainTitel,.secondTitel {
	padding-left: 15px;
	padding-right: 15px;
	position: relative;
	margin-top: 10px;
}

.mainTitel button,.secondTitel button {
	position: absolute;
	right: 15px;
	margin-top: -13px;
}

table {
	width: 100%;
}

#sampleTable th,#fileTable th {
	border: 1px solid;
	text-align: center;
}

#sampleTable td,#fileTable td {
	border: 1px solid;
	text-align: center;
}

.second {
	margin-top: 30px;
}

.footer {
	margin-top: 20px;
}

.footer button {
	float: right;
	margin-right: 20px;
	width: 90px;
	height: 36px;
}

.choose {
	height: 300px;
	overflow-x: hidden;
	overflow-y: scroll;
	width: 290px;
}

.overChoose {
	display: none;
	height: 300px;
	left: 200px;
	margin: 0 auto;
	min-width: 124px;
	overflow: hidden;
	position: absolute;
	top: 150px;
	width: 260px;
	z-index: 9999;
	/* color: #fff; */
	background: #fff;
}

.over {
	background: #808080 none repeat scroll 0 0;
	color: #333;
	display: block;
	opacity: 1;
	position: fixed;
	top: 0px;
	z-index: 9999;
}

.col-xs-12 input,.col-md-12 input,.col-xs-12 select {
	display: block;
	width: 100%;
	display: block;
	width: 90%;
	height: 34px;
}

h4,.h4 {
	font-size: 20px;
	font-weight: bold;
}

.col-xs-12 input.chooseInput,.col-md-12 input.chooseInput {
	width: 20px;
	display: inline-block;
	vertical-align: middle;
	margin-left: 70px;
}

.col-xs-12 label.fontStyle,.col-md-12 label.fontStyle {
	margin: 10px 0 0;
}

.glyphicon {
	margin-right: 5px;
}

.mainTitel button:FIRST-CHILD {
	margin-right: 95px;
}

.file-box {
	position: relative;
	width: 340px;
}

.txt {
	height: 22px;
	border: 1px solid #cdcdcd;
	width: 180px;
}

#file_uploadModal .filebtn {
	background-color: #FFF;
	border: 1px solid #CDCDCD;
	height: 24px;
	width: 70px;
}

.file {
	position: absolute;
	top: 0;
	right: 80px;
	height: 24px;
	filter: alpha(opacity : 0);
	opacity: 0;
	width: 260px;
}

#submitFileBtn {
	height: 30px;
	width: 80px;
	border-radius: 5px;
}

#loading {
	position: fixed;
	left: 48%;
	top: 45%;
	width: 150px;
	height: 150px;
	z-index: 9999;
}

#loading img {
	width: 150px;
	height: 150px;
}

.row label {
	min-width: 80px;
}

.timeLabelDiv {
	float: left;
	height: 34px;
	min-width: 80px;
}

.timeLabelDiv label {
	margin-top: 7px;
}

.timeChooseDiv {
	width: 70%;
	margin-top: 0px;
}

.input-group-addon {
	background-color: #fff;
}

.tip-factory {
	width: 90%; /* 和上面的一样  */
	height: auto;
	position: absolute;
	z-index: 9999;
}

.tip-factory-content {
	/* width:100%; 这里设置后，后面的margin-right:就不起作用*/
	height: auto;
	z-index: 9999;
	margin-right: 27px; /* 598 * 0.9 568 *0.9  30 * 0.9 */
	border-radius: 5px;
	background: rgba(182, 176, 176, 1);
}

.tip-factory-content li {
	display: block;
	list-style-type: none;
	height: 30px;
	vertical-align: middle;
	padding-top: 7px;
}
</style>
</head>
<body>
	<div class="container">
		<div class='headTitel'>
			<label>新增检测/校准交接单</label> <label> <span>交接单编号：</span> <span>XJHJ-226-16-1014-TET</span>
			</label>
			<hr class="headHr">
		</div>
		<div class="header">
			<div class="row">
				<div class="headModeal col-xs-3">
					<label>合同编号：</label><input type="text" id="coCode"
						class="form-control">
				</div>
				<div class="headModeal col-xs-3">
					<label>委托人：</label><input type="text" id="linkMan"
						class="form-control">
				</div>
				<!-- <div class="headModeal col-xs-3">
					<label>委托时间：</label><input type="date" id="startTime"
						class="form-control">
				</div> -->
				<div class="headModeal col-xs-3 col-md-3 col-lg-3">
					<div class="timeLabelDiv">
						<label class="control-label">委托时间:</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" id="startTime" size="16" type="text"
							value="" readonly="true"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="headModeal col-xs-3 col-md-3 col-lg-3">
					<div class="timeLabelDiv">
						<label class="control-label">至:</label>
					</div>
					<div class="input-group date form_datetime timeChooseDiv">
						<input class="form-control" id="endTime" size="16" type="text"
							value="" readonly="true"> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
							class="input-group-addon"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<!-- <div class="headModeal col-xs-3">
					<label>完成时间：</label><input type="date" id="endTime"
						class="form-control">
				</div> -->
			</div>
			<div class="row">
				<div class="col-xs-6">
					<label>委托单位：</label><input type="text" id="companyName"
						class="form-control">
				</div>
				<div class=" col-xs-3"></div>
				<div class=" col-xs-3">
					<label>联系电话：</label><input type="text" id="linkPhone"
						class="form-control">
				</div>
			</div>
			<div class="row">
				<div class=" col-xs-6">
					<label>通讯地址：</label><input type="text" id="address"
						class="form-control">
				</div>
			</div>
			<div class="row">
				<div class=" col-xs-12">
					<label class="kemiche ">依据的技术文件(代号、名称)及客户要求：</label>
					<textarea type="text" id="accordingDoc" rows="6"><!-- &nbsp;&nbsp;QRX-1型雷达光电望远镜按《QRX-1型雷达光电望远镜系统更新技术状态鉴定试验大纲WLDGA》和《GJB50.11A-2009军用设备实验室环境实验方法第II部分：盐雾实验》进行24h喷雾，24h干燥，两种状态，供240h的盐雾实验 --></textarea>
				</div>
			</div>
			<hr class="headHr">
			<div class="main">
				<div class="row mainTitel">
					<label>样品信息</label>
					<button class="btn btn-primary glyphicon btnEnterSample"
						style="margin-right: 95px;" id="handDeal">手动录入</button>
					<button class="btn btn-primary glyphicon btnEnterSample"
						id="machineDeal">扫描录入</button>
					<hr class="headHr">
				</div>
				<table id="sampleTable">
					<!-- 	<tr>
						<th>序号</th>
						<th>出厂编号</th>
						<th>名称</th>
						<th>型号/规格/代号</th>
						<th>检测/校准项目</th>
						<th>录入时间</th>
						<th>操作</th>
					</tr>
 -->
				</table>
			</div>
			<div class="second">
				<div class="row secondTitel">
					<label>其他文件</label>
					<button type="button"
						class="btn btn-primary glyphicon glyphicon-plus"
						data-toggle="modal" data-target="#file_uploadModal">&nbsp;添加附件</button>
					<!-- <button type="file" id="file_upload"
						name="file_upload" class="btn btn-primary glyphicon "
						multiple="multiple" value="添加附件" title="添加附件"> -->
					<hr class="headHr">

				</div>
				<table id="fileTable">
					<!-- <tr>
						<th>序号</th>
						<th>文件名称</th>
						<th>备注</th>
						<th>上传时间</th>
						<th>操作</th>
					</tr>
					<tr>
						<td>序号</td>
						<td>出厂编号</td>
						<td>检测/校准项目</td>
						<td>录入时间</td>
						<td>操作</td>
					</tr>
					<tr>
						<td>序号</td>
						<td>出厂编号</td>
						<td>检测/校准项目</td>
						<td>录入时间</td>
						<td>操作</td>
					</tr> -->
				</table>
			</div>
			<div class="footer">
				<hr class="headHr">
				<button class="btn btn-primary glyphicon " id="saveReceipt">保存</button>
				<button class="btn btn-primary glyphicon " id="submitReceipt">提交</button>
			</div>

			<div id="file_uploadModal" class="modal" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<p>上传附件</p>
						</div>
						<div class="modal-body">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								onchanage="chooseFileNum(this)" multiple="multiple">
						</div>
						<div class="modal-footer">
							<button class="btn-primary glyphicon" id="submitFileBtn"
								onclick="submitFile()">提交</button>
						</div>
					</div>
				</div>
			</div>

			<!-- 新增任务弹框 -->
			<div id="addTaskModal" class="modal fade" role="dialog"
				aria-labelledby="gridSystemModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title">样品分配信息</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-xs-12 col-md-12">
									<h4>出厂编号：</h4>
									<input type="text" id="addSampleCode" name="sampleCode"
										placeholder="输入出厂编码" class="form-control"
										aria-describedby="basic-addon1"
										onpropertychange="set_alert_wb_comment(this,'add')"
										oninput="set_alert_wb_comment(this,'add')" /> <input
										type="hidden" id="addSampleID" name="sampleID"
										class="form-control" aria-describedby="basic-addon1" />
									<div class="tip-factory  ">
										<div class="tip-factory-content"></div>
									</div>
								</div>
								<div class="col-xs-12 col-md-12">
									<h4>样品名称：</h4>
									<input type="text" id="addSampleName" name="sampleName"
										placeholder="输入样品名称" class="form-control"
										aria-describedby="basic-addon1" />
								</div>
								<div class="col-xs-12 col-md-12">
									<h4>型号/规格/代号：</h4>
									<input type="text" id="addSampleStyle" name="sampleStyle"
										class="form-control" aria-describedby="basic-addon1" />
								</div>
								<div class="col-xs-12 col-md-12">
									<h4>检测/校准项目：</h4>
									<textarea id="addTestProject" rows="6" cols="30"
										class="testProjectName" placeholder="选择检测项目"></textarea>
								</div>
								<!-- 选择检测项目 -->
								<div class="over" id="addOver">
									<div class="overChoose  ">
										<!-- 隐藏滑动条 -->
										<div class="choose">
											<div class="row">
												<!-- <div class="col-xs-12 col-md-12">
													<input type="checkbox" value="123" name="task"
														class="chooseInput"><label class="fontStyle">电磁兼容</label>
												</div>

												<div class="col-xs-12 col-md-12">
													<input type="checkbox" value="1234" name="task"
														class="chooseInput"><label class="fontStyle">电压传导</label>
												</div>
												<div class="col-xs-12 col-md-12">
													<input type="checkbox" value="1235" name="task"
														class="chooseInput"><label class="fontStyle">环境测验</label>
												</div> -->
											</div>
										</div>
									</div>
								</div>

								<div class="col-xs-12 col-md-12">
									<h4>样品单位：</h4>
									<select id="addUnit">
										<option value="个">个</option>
										<option value="件">件</option>
										<option value="套">套</option>
									</select>
								</div>
								<div class="col-xs-12 col-md-12">
									<h4>要求描述：</h4>
									<textarea id="addAskFor" name="REMARKS" cols="30" rows="6" /></textarea>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								 onclick="addTaskModel()">确定</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
			</div>



			<!-- 编辑任务弹框 -->
			<div id="editTaskModal" class="modal fade" role="dialog"
				aria-labelledby="gridSystemModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title">样品分配信息</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-xs-12 col-md-12">
									<h4>出厂编号：</h4>
									<input type="text" id="editSampleCode" name="sampleCode"
										placeholder="输入出厂编码" class="form-control"
										aria-describedby="basic-addon1"
										onpropertychange="set_alert_wb_comment(this,'edit')"
										oninput="set_alert_wb_comment(this,'edit')" /> <input
										type="hidden" id="editSampleID" name="sampleID"
										class="form-control" aria-describedby="basic-addon1" /> <input
										type="hidden" id="editTaskID" name="taskID"
										class="form-control" aria-describedby="basic-addon1" />
									<div class="tip-factory  ">
										<div class="tip-factory-content"></div>
									</div>
								</div>
								<div class="col-xs-12 col-md-12">
									<h4>样品名称：</h4>
									<input type="text" id="editSampleName" name="sampleName"
										placeholder="输入样品名称" class="form-control"
										aria-describedby="basic-addon1" />
								</div>
								<div class="col-xs-12 col-md-12">
									<h4>型号/规格/代号：</h4>
									<input type="text" id="editSampleStyle" name="sampleStyle"
										class="form-control" aria-describedby="basic-addon1" />
								</div>
								<div class="col-xs-12 col-md-12">
									<h4>检测/校准项目：</h4>
									<textarea id="editTestProject" rows="6" cols="30"
										class="testProjectName" placeholder="选择检测项目"></textarea>
								</div>
								<!-- 选择检测项目 -->
								<div class="over" id="editOver">
									<div class="overChoose  ">
										<!-- 隐藏滑动条 -->
										<div class="choose">
											<div class="row">
												<div class="col-xs-12 col-md-12">
													<input type="checkbox" value="123" name="task"
														class="chooseInput"><label class="fontStyle">电磁兼容</label>
												</div>

												<div class="col-xs-12 col-md-12">
													<input type="checkbox" value="1234" name="task"
														class="chooseInput"><label class="fontStyle">电压传导</label>
												</div>
												<div class="col-xs-12 col-md-12">
													<input type="checkbox" value="1235" name="task"
														class="chooseInput"><label class="fontStyle">环境测验</label>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-xs-12 col-md-12">
									<h4>样品单位：</h4>
									<select id="editUnit">
										<option value="个">个</option>
										<option value="件">件</option>
										<option value="套">套</option>
									</select>
								</div>
								<div class="col-xs-12 col-md-12">
									<h4>要求描述：</h4>
									<textarea id="editAskFor" name="REMARKS" cols="30" rows="6" /></textarea>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								onclick="editTaskModel()">确定</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
			</div>

			<!-- 编辑文件信息弹框 -->
			<div id="editFileModal" class="modal fade" role="dialog"
				aria-labelledby="gridSystemModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title">编辑文件信息</h4>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-xs-12 col-md-12">
									<h4>备注：</h4>
									<input type="hidden" id="editFileID" name="fileID"
										class="form-control" aria-describedby="basic-addon1" />
									<textarea rows="6" cols="30" id="fileRemarks"></textarea>
								</div>

							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								onclick="editFileModel()">确定</button>
							<!--  <button type="button" class="btn btn-primary" onclick="edit()">修改</button> -->
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- 总container -->

</body>
<script src="./module/js/receiptlistManage/addReceiptlist.js"
	type="text/javascript"></script>
<script type="text/javascript">
	$('.form_datetime').datetimepicker({
		language : 'zh-CN',
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		minView : 1,
		forceParse : 0,
		format : 'yyyy-mm-dd HH:ii:ss'
	});
</script>
</html>
