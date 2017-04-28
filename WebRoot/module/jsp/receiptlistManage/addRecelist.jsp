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
<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/changeACE.css" />
<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">
<link rel="stylesheet" type="text/css" href="module/css/receiptlistManage/addReceiptlist.css">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" /> 

<script type="text/javascript" src="./module/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="./module/js/bootstrap.js"></script>
<script type="text/javascript" src="./module/js/bootstrap-table.js"></script>
<script type="text/javascript"
	src="./module/js/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript" src="./module/js/commonTool.js"></script>

<script src="module/js/jquery.uploadify.min.js" type="text/javascript"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
<script src="assets/js/autoPage.js"></script>
<script src="module/js/sweetalert.min.js"></script>
<script src="module/js/alert.js"></script>
<script src="module/js/fileManage/fileManage.js" type="text/javascript"></script>

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
						onpropertychange="searchCompany()" oninput="searchCompany()"
						class="form-control">
					<div id="companyContainer">
						<div id="over_company">
							<ul>
								<!--   <li>vdfgvfd</li>
					    <li>vdfgvfd</li>
					      <li>vdfgvfd</li>
					        <li>vdfgvfd</li>
					          <li>vdfgvfd</li> -->
							</ul>
						</div>
					</div>
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
					<!-- &nbsp;&nbsp;QRX-1型雷达光电望远镜按《QRX-1型雷达光电望远镜系统更新技术状态鉴定试验大纲WLDGA》和《GJB50.11A-2009军用设备实验室环境实验方法第II部分：盐雾实验》进行24h喷雾，24h干燥，两种状态，供240h的盐雾实验 -->


					<textarea type="text" id="accordingDoc" rows="6">	</textarea>
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

		
			<!--文件上传框  -->
			<div id="file_uploadModal" class="modal fade" role="dialog"
				aria-labelledby="gridSystemModalLabel">
				<div class="modal-dialog" role="document" style="width:450px">
					<div class="modal-content">
						<div class="modal-header">
							<p class="modal-title">上传附件</p>
						</div>
						<div class="modal-body">
							<div class="row">
								<div id="files" style="text-align:left">
									<div id="uploadfileQueue"></div>
									<input type="file" id="file_upload" name="file_upload"
										class="btn-primary" multiple="multiple">
									<div class="uploadFileText">
										<label>备注信息:</label>
										<textarea rows="3" class="form-control" name="fileRemarks-u"
											id="fileRemarks-u"></textarea>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">

							<button type="button" class="btn btn-primary" id="ensure"
								name="ensure" onclick="submitFile()">确定</button>
							<button type="button" class="btn btn-default"
								data-dismiss="modal"
								onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
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
							<p class="modal-title">样品分配信息</p>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-xs-12 col-md-12">
									<p>出厂编号：</p>
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
									<p>样品名称：</p>
									<input type="text" id="addSampleName" name="sampleName"
										placeholder="输入样品名称" class="form-control"
										aria-describedby="basic-addon1" />
								</div>
								<div class="col-xs-12 col-md-12">
									<p>型号/规格/代号：</p>
									<input type="text" id="addSampleStyle" name="sampleStyle"
										class="form-control" aria-describedby="basic-addon1" />
								</div>
								<div class="col-xs-12 col-md-12">
									<div class="col-md-6 col-xs-6 ">
										<p>检测/校准项目：</p>
										<!-- 	<textarea id="addTestProject" rows="3" cols="30"
										class="testProjectName" placeholder="选择检测项目"></textarea> -->
										<div  class="testProjectName displayChecked" id="displayChecked"  name="add"
											placeholder="选择检测项目"></div>
										<!-- 	<ul>
										<li><input type="checkbox">检测项目
										</li>
										<li><input type="checkbox">检测项目</li>
										</ul> -->
									</div>
									<div class="col-md-6 col-xs-6 ">
										<div>
											<p class="labelName">搜索查询添加检测项目</p>
											<input type="text" id="addsearchTestProjects"
												class="form-control" placeholder="选择所需检测项目"
												oninput="searchTestProject('add')"
												onpropertychange="searchTestProject('add')" />
										</div>
										<div class="showTestProjects" name="add"></div>
									</div>
								</div>
								<!-- 选择检测项目 -->
								<div class="over" id="addOver">
									<div class="overChoose  ">
										<!-- 隐藏滑动条 -->
										<div class="choose">
											<div class="row"></div>
										</div>
									</div>
								</div>

								<div class="col-xs-12 col-md-12">
									<p>样品单位：</p>
									<select id="addUnit">
										<option value="个">个</option>
										<option value="件">件</option>
										<option value="套">套</option>
									</select>
								</div>
								<div class="col-xs-12 col-md-12">
									<p>要求描述：</p>
									<textarea id="addAskFor" name="REMARKS" cols="30" rows="3" /></textarea>
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
							<p class="modal-title">样品分配信息</p>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-xs-12 col-md-12">
									<p>出厂编号：</p>
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
									<p>样品名称：</p>
									<input type="text" id="editSampleName" name="sampleName"
										placeholder="输入样品名称" class="form-control"
										aria-describedby="basic-addon1" />
								</div>
								<div class="col-xs-12 col-md-12">
									<p>型号/规格/代号：</p>
									<input type="text" id="editSampleStyle" name="sampleStyle"
										class="form-control" aria-describedby="basic-addon1" />
								</div>

								<div class="col-xs-12 col-md-12">
									<div class="col-md-6 col-xs-6 ">
										<p>检测/校准项目：</p>
										<div id="displayChecked" class="testProjectName" name="edit"
											placeholder="选择检测项目"></div>

									</div>
									<div  class="col-md-6 col-xs-6 ">
										<div>
											<p class="labelName">搜索查询添加仪器</p>
											<input type="text" id="editsearchTestProjects" name="edit"
												class="form-control" placeholder="选择所需仪器"
												oninput="searchTestProject('edit')"
												onpropertychange="searchTestProject('edit')" />
										</div>
										<div class="showTestProjects" name="edit"></div>
									</div>
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
									<p>样品单位：</p>
									<select id="editUnit">
										<option value="个">个</option>
										<option value="件">件</option>
										<option value="套">套</option>
									</select>
								</div>
								<div class="col-xs-12 col-md-12">
									<p>要求描述：</p>
									<textarea id="editAskFor" name="REMARKS" cols="30" rows="3" /></textarea>
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
							<p class="modal-title">编辑文件信息</p>
						</div>
						<div class="modal-body">
							<div class="row">
								<div class="col-xs-12 col-md-12">
									<p>备注：</p>
									<input type="hidden" id="editFileID" name="fileID"
										class="form-control" aria-describedby="basic-addon1" />
									<textarea rows="6" cols="30" id="fileremarks-e"></textarea>
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
		minView : 3,
		forceParse : 0,
		format : 'yyyy-mm-dd'
	});
</script>
</html>
