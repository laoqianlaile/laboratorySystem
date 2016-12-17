/**
 * 
 */
var obj = {
	reID : "12265656565",
	reCode : "xiji-2016-15-34",
	coCode : "",
	coID : "",
	addState : "",
	lookState:"",
	comID : ""
}
var fileObj = {};
$(function() {
	initData();
	initEvent();
	autoHeightWidth();
});
// 初始化数据
function initData() {
	
	initPageData();
	initSample();
	initFile();
	/*
	 * if(isEmptyObject(dara) == true){ addNoCo(); }else{ add(dara); }
	 */
}
//是否展示上传的按钮
function isShowButton(size){
	if(size <= 0){
		$("#submitFileBtn").css("display","none");
	}else{
		$("#submitFileBtn").css("display","inline");
	}
}
//上传文件预处理
function submitFile(){
	//loadingData();
	fileObj.path = "E:/";//filePath; // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	fileObj.fileTypeNumber = "1";//fileTypeNumber; // 文件类型
	fileObj.firstDirectoryName = "项目文件";//fileFirstDirectory; // 一级目录
	fileObj.secondDirectoryName = "子项目具体文件";//fileSecondDirectory; // 二级目录
	fileObj.thirdDirectoryName = "交接单文件";//fileThirdDirectory //三级目录
	fileObj.belongtoID = obj.reID;
 	fileObj.otherInfo = "没有";//fileOtherInfo; // 其他参数
	fileObj.remarks = "文件啊";//fileRemarks; // 备注
	//文件上传
	 fileUpload(fileObj.filePath, fileObj.fileTypeNumber, fileObj.firstDirectoryName, fileObj.secondDirectoryName,fileObj.thirdDirectoryName,
			 fileObj.belongtoID, fileObj.otherInfo, fileObj.remarks) ;

	 //旋转图片延缓
	//setTimeout("dealUploadFile()",5000);
	/* $.ajaxSetup({
			global:false,
			cache:false,
			beforeSend:function(){
				loadingData();
			},
			complete:function(){
				removeLoadingData();
				$('#fileTable').bootstrapTable('refresh',null);
			},
			timeout:10000,
		});*/
}
function dealFileID(){
  $('#fileTable').bootstrapTable('refresh',null);
	/* var fileIDArray = fielIdReturn();
	 console.log(fileIDArray);
	 var ids = "";
	 if(fileIDArray.length == 0)
		 return ;
	 for(var i = 0 ; i < fileIDArray.length ; i++)
		  ids+=fileIDArray[i]+",";
	 ids=ids.substring(0, ids.length-1);
	 $.ajax({
			url : '/laboratorySystem/fileOperateController/setBelongtoID.do',
			dataType : "json",
			async : false,
			data : {
				fileIDS:ids,
				belongtoID : obj.reID
			},
			success : function(o) {
				console.log(JSON.parse(o));
				
			},
			error : function() {
				return false;
			}
		 });
	 $('#file_uploadModal').modal("hide");
	 $('#fileTable').bootstrapTable('refresh',null); */
	 
} 
function initPageData(){
	var dara = getURLParameter();
	 obj.reID = dara.reID;
	 obj.reCode  = dara.reCode;
	 obj.coID  = dara.coID;
	 obj.addState  = dara.addState;
	 obj.lookState = dara.lookState;
	 obj.comID  = dara.comID;
	 
	$('.headTitel').children().eq(1).children().eq(1).text(obj.reCode);
	console.log(dara);
	$("#coCode").val(dara.coCode);
	$("#coCode").attr("disabled", true);
	if (dara.addState == "yes") {
		dealHaveCom(dara);
	}
	if(dara.lookState == "edit"){
		dealHaveCom(dara);
		var reInformation = getReceiptByReID(dara.reID);
		$("#linkMan").val(reInformation.linkMan);
		$("#startTime").val(reInformation.startTime);
		$("#endTime").val(reInformation.endTime);
		$("#linkPhone").val(reInformation.linkPhone);
	}
}
function getReceiptByReID(reID){
	var data ;
 $.ajax({
	url : '/laboratorySystem/receiptlistController/getReceiptByReID.do',
	dataType : "json",
	async : false,
	data : {
		reID : reID
	},
	success : function(o) {
		 data = JSON.parse(o);
		alert(typeof data);
		console.log(data);
	},
	error : function() {
		return false;
	}
 });
	return data;
}
// 有合同新增
function dealHaveCom(dara) {
	var data ;

	$.ajax({
		url : '/laboratorySystem/companyController/getCompanyInformation.do',
		dataType : "json",
		async : false,
		data : {
			comID : dara.comID
		},
		success : function(o) {
			 data = JSON.parse(o);
			if (data != false) {
				$("#companyName").val(data.companyName);
				$("#address").val(data.address);
			}
			alert(typeof data);
			console.log(data);
		},
		error : function() {
			return false;
		}
	});
	$("#companyName").attr("disabled", true);
	$("#address").attr("disabled", true);
}
function chooseFileNum(edu){
	alert($(edu).val());
	console.log(edu);
	alert(edu.val());
	alert(edu.value());
}
function initTestProject() {

	$(document).on("click", "#addOver", function(event) {
		event.stopPropagation();
		$(".over").css("display", "none");
		$(".over").css("width", "0");
		$(".over").css("height", "0");
		var names = getTestTatol("add").names;
		$("#addTestProject").val("");
		$("#addTestProject").val(names.substring(0, names.length - 3));

	});
	$(document).on("click", "#editOver", function(event) {
		event.stopPropagation();
		$(".over").css("display", "none");
		$(".over").css("width", "0");
		$(".over").css("height", "0");
		var names = getTestTatol("edit").names;
		$("#editTestProject").val("");
		$("#editTestProject").val(names.substring(0, names.length - 3));

	});
	$(document).on("click", ".chooseInput", function(event) {
		event.stopPropagation();
	});
	$(document).on("click", ".fontStyle", function(event) {
		event.stopPropagation();
		// this == event.target
		$(event.target).prev().click();
	});
	/*
	 * $(document).on("click",".choose .row .col-xs-12",function(event){
	 * $(this).children("input.chooseInput").click(); event.stopPropagation();
	 * });
	 */
	$(".choose  .row  .col-xs-12").click(function(event) {
		$(this).children("input.chooseInput").click();
		event.stopPropagation();
	});

	// 检测项目的选取
	$("#addTestProject").focus(function(event) {
		var testNamevalue = $("#addTestProject").val();
		var data = getTestLisk(); // 获取检测项目列表
		var htmlP = "";
		if (data != false) {
			htmlP = playTestProjectHtml(data, testNamevalue, "add");// 拼装项目列表html
			$("#addOver .overChoose .choose .row ").empty(); // 清空子元素
			$("#addOver .overChoose .choose .row ").html(htmlP);
		}
		// 显示第二层遮罩
		$(".overChoose").css("display", "block");
		$(".over").css("display", "block");
		var docWidth = $("#addTaskModal .modal-dialog").width();
		var docHeight = $("#addTaskModal .modal-dialog").height();
		$(".over").css("width", docWidth);
		$(".over").css("height", docHeight);

	});
	$("#editTestProject").focus(function(event) {
		var testNamevalue = $("#editTestProject").val();
		var data = getTestLisk(); // 获取检测项目列表
		var htmlP = "";
		if (data != false) {
			htmlP = playTestProjectHtml(data, testNamevalue, "edit");// 拼装项目列表html
			$("#editOver .overChoose .choose .row ").empty(); // 清空子元素
			$("#editOver .overChoose .choose .row ").html(htmlP);
		}
		// 显示第二层遮罩
		$(".overChoose").css("display", "block");
		$(".over").css("display", "block");
		var docWidth = $("#editTaskModal .modal-dialog").width();
		var docHeight = $("#editTaskModal .modal-dialog").height();
		$(".over").css("width", docWidth);
		$(".over").css("height", docHeight);

	});

}
// 拼装项目列表html
function playTestProjectHtml(data, testNamevalue, isAdd) {
	var html = "";
	var checkName = ""
	if (isAdd == "add")
		checkName = "addTask";
	else
		checkName = "editTask";
	for (var i = 0; i < data.length; i++) {
		html += '<div class="col-xs-12  col-md-12" >';
		if (isContains(testNamevalue, data[i].testName))
			html += '<input type="checkbox"  checked="chenked" value="'
					+ data[i].ID + '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle">'
					+ data[i].testName + '</label></div>';
		else
			html += '<input type="checkbox"   value="' + data[i].ID
					+ '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle">'
					+ data[i].testName + '</label></div>';
	}
	return html;
}
// 判断字符串是否包含字串
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
// 获取检测项目列表ID和名字
function getTestLisk() {
	var data;
	$.ajax({
		url : '/laboratorySystem/testProjectController/getTestProjectList.do',
		dataType : "json",
		async : false,
		data : {},
		success : function(o) {
			data = JSON.parse(o);
		},
		error : function() {
			return false;
		}
	});
	return data;
}
// 初始事件
function initEvent() {
	initTestProject();
	initAddTask();
	initSampleCode();// 保存或提交交接单
	initSaveAndSubmitRe(); // 保存或提交交接单

}
function initSaveAndSubmitRe() {
	$("#linkPhone").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "")
			alert("联系人电话不能为空");
		else if (!isNoramlPhone($(this).val().trim()))
			alert("联系人电话格式不正确");
	});

	$("#linkMan").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "")
			alert("联系人不能为空");
	});
	$("#companyName").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "")
			alert("公司名字不能为空");
	});
	$("#address").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "")
			alert("公司通讯地址不能为空");
	});

	$(".footer button")
			.click(
					function() {
						var btnName = "";
						var param = {};
						var data ;
						btnName = $(this).text();
						alert(btnName);
						if (btnName == "保存")
							param.saveState = "save";
						else
							param.saveState = "submit";
						param.addState = obj.addState;
						param.companyName = $("#companyName").val().trim();
						param.address = $("#address").val().trim();
						/*
						 * if(param.addState == "no"){ if(param.companyName ==
						 * null || param.companyName=="") alert("公司名字不能为空");
						 * if(param.address == null || param.address=="")
						 * alert("公司通讯地址不能为空"); }
						 */param.linkMan = $("#linkMan").val();
						/*
						 * if(param.linkMan == null || param.linkMan=="")
						 * alert("联系人不能为空");
						 */
						param.startTime = $("#startTime").val();
						param.endTime = $("#endTime").val();
						param.linkPhone = $("#linkPhone").val();
						/*
						 * if(param.linkPhone == null || param.linkPhone=="")
						 * alert("联系人电话不能为空"); else if(
						 * !isNoramlPhone(param.linkPhone)){
						 * alert("联系人电话格式不正确"); }
						 */
						param.accordingDoc = $("#accordingDoc").val();
						param.reID = obj.reID;
						param.coID = obj.coID;
						$.ajax({
									url : '/laboratorySystem/receiptlistController/saveSubmitReceipt.do',
									dataType : "json",
									type : "post",
									contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
									async : false,
									data : param,
									success : function(o) {
										 data = JSON.parse(o);
										if (data == true)
											window.location = "./module/jsp/receiptlistManage/receiptlistManage.jsp";
									},
									error : function() {
										alert(" getSampleByCode faile");
									}

								});

					});
}
// 输入样品编号样品库是否存在
function isExitSample(sampleCode) {
	var data;
	$.ajax({
		url : '/laboratorySystem/sampleController/getSampleByCode.do',
		dataType : "json",
		type : "post",
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
		async : false,
		data : {
			sampleCode : sampleCode
		},
		success : function(o) {
			data = JSON.parse(o);
		},
		error : function() {
			alert(" getSampleByCode faile");
		}
	});
	if (data != false) {
		console.log("--------------");
		console.log(data);
		// 填充数据
		$("#editSampleID").val(data.sampleID);
		$("#editSampleName").val(data.sampleName);
		$("#editSampleStyle").val(data.sampleStyle);
		$("#editUnit").val(data.unit);
		$("#addSampleID").val(data.sampleID);
		$("#addSampleName").val(data.sampleName);
		$("#addSampleStyle").val(data.sampleStyle);
		$("#addUnit").val(data.unit);
		// 设置不可编辑
		$("#editSampleName").attr("disabled", true);
		$("#editSampleStyle").attr("disabled", true);
		$("#editUnit").attr("disabled", true);
		$("#addSampleName").attr("disabled", true);
		$("#addSampleName").attr("readonly", true);
		$("#addSampleStyle").attr("disabled", true);
		$("#addUnit").attr("disabled", true);

	} else {

		// 设置可编辑
		$("#editSampleName").attr("disabled", false);
		$("#editSampleStyle").attr("disabled", false);
		$("#editUnit").attr("disabled", false);
		$("#addSampleName").attr("disabled", false);
		$("#addSampleName").attr("readonly", false);
		$("#addSampleStyle").attr("disabled", false);
		$("#addUnit").attr("disabled", false);

	}
}
// 初始出厂编码事件
function initSampleCode() {
	var sampleCode = "";
	$(document).on("blur", "#editSampleCode", function() {
		if($("#editSampleCode").val() == "")
		    alert("样品编号不能为空");
		isExitSample($("#editSampleCode").val());
	});
	$(document).on("blur", "#addSampleCode", function() {
		if($("#addSampleCode").val() == "")
		    alert("样品编号不能为空");
		isExitSample($("#addSampleCode").val());
	});
}
function initAddTask() {
	$(document).on("click", "#handDeal", function(event) {
		// 清空以前填写的数据
		$("#addSampleCode").val("");
		$("#addSampleName").val("");
		$("#addSampleID").val("");
		$("#addAskFor").val("");
		$("#addTestProject").val("");
		$("#addTaskModal").modal('show');
	});
}
// 初始文件
function initFile() {
	var order = 0;
	$('#fileTable')
			.bootstrapTable(
					{
						// 定义表格的高度height: 500,
						striped : true,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 5,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
						// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'ID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
						url : '/laboratorySystem/receiptlistController/getReFiletByReID.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						method : "post",
						dataType : "json",// 服务器返回的数据类型
						contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
						queryParams : function queryParams(params) {
							var param = {};
							param.limit = params.limit;// 页面大小 param.offset=
							// params.offset; //偏移量
							param.search = "";
							param.offset = params.offset;
							order = params.offset + 1; // 偏移量是从0开始
							param.sort = params.sort; // 排序列名
							param.order = params.order;// 排位命令（desc，asc）
							param.reID = obj.reID;
							return param;
						}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名
						onLoadSuccess : function(data) {
							checkDate(data, "file");
							console.log(data);
						},
						columns : [
								{
									title : '序号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									visible : true,
									formatter : function(value, row, index) {
										chenkDataFile(row);
										return order++;
									}
								},
								{
									field : 'ID',// 返回值名称
									title : 'fileID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%',// 宽度
									visible : false
								},
								{
									field : 'fileName',// 返回值名称
									title : '文件名',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%',// 宽度
								},
								{
									field : 'remarks',// 返回值名称
									title : '备注',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'uploadName',// 返回值名称
									title : '上传人',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%'// 宽度
								},
								{
									field : 'uploadTime',// 返回值名称
									title : '上传时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%'// 宽度
								},
								{
									field : '',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%',// 宽度
									formatter : function(value, row, index) {
										var remove = "", edit = "", download = "";
										download = '<button onclick= "download(\''
												+ row.ID
												+ '\')" data-toggle="tooltip" data-placement="top" title="下载"  class="glyphicon glyphicon-save" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></button>';
										edit = '<button onclick= "editFile(\''
												+ row.ID
												+ '\')" data-toggle="tooltip" data-toggle="top"  title="编辑"  class="glyphicon glyphicon-edit" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></button>';
										remove = '<button  onclick= "deleteFile(\''
												+ row.ID
												+ '\')" data-toggle="tooltip" data-placement="top" title="删除" class="glyphicon glyphicon-remove" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></button> ';
										return download + edit + remove;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
}
//
function download(fileID){
	downOneFile(fileID) ;
}

// 初始样品
function initSample() {
	var order = 0;
	$('#sampleTable')
			.bootstrapTable(
					{
						// 定义表格的高度height: 500,
						striped : true,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 5,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
						// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'ID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
						url : '/laboratorySystem/receiptlistController/getTasklistByReID.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						method : "post",
						dataType : "json",// 服务器返回的数据类型
						contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
						queryParams : function queryParams(params) {
							var param = {};
							param.limit = params.limit;// 页面大小 param.offset=
							// params.offset; //偏移量
							param.search = "";
							param.offset = params.offset;
							order = params.offset + 1; // 偏移量是从0开始
							param.sort = params.sort; // 排序列名
							param.order = params.order;// 排位命令（desc，asc）
							param.reID = obj.reID;
							return param;
						}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名
						onLoadSuccess : function(data) {
							// checkDate(data,"task");
							console.log(data);
						},
						columns : [
								{
									title : '序号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									visible : true,
									formatter : function(value, row, index) {
										chenkDataTask(row);
										return order++;
									}
								},
								{
									field : 'ID',// 返回值名称
									title : 'taskID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'reID',// 返回值名称
									title : '交接单ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'sampleID',// 返回值名称
									title : '样品ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'factoryCode',// 返回值名称
									title : '出厂编号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '13%'// 宽度
								},
								{
									field : 'sampleName',// 返回值名称
									title : '样品名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '12%'// 宽度
								},
								{
									field : 'sampleStyle',// 返回值名称
									title : '型号/规格/代号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%'// 宽度
								},
								{
									field : 'testName',// 返回值名称
									title : '校准/检测项目',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%'// 宽度
								},
								{
									field : 'askFor',// 返回值名称
									title : '要求描述',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%'// 宽度
								},
								{
									field : 'startTime',// 返回值名称
									title : '录入时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%'// 宽度
								},
								{
									field : '',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%',// 宽度
									formatter : function(value, row, index) {
										var remove = "", edit = "", print = "";
										edit = "<button onclick='editTask("
												+ JSON.stringify(row)
												+ ")'"
												+ " data-toggle='tooltip' data-toggle='top'  title='编辑'  class='glyphicon glyphicon-edit' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></button>";
										/*
										 * edit = '<button
										 * onclick="editTask('+row.ID+","+row.sampleID+","+row.factoryCode+","+
										 * row.sampleName+","+row.sampleStyle+","+row.testName+",\'"+row.askFor+'\')"
										 * data-toggle="tooltip"
										 * data-toggle="top" title="编辑"
										 * class="glyphicon glyphicon-edit"
										 * style="cursor:pointer;color: rgb(10,
										 * 78, 143);padding-right:8px;"></button>';
										 */remove = '<button  onclick= "deleteTask(\''
												+ row.ID
												+ '\')" data-toggle="tooltip" data-placement="top" title="删除" class="glyphicon glyphicon-remove" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></button> ';
										print = '<button onclick= "print('
												+ row.qrcode
												+ ')" data-toggle="tooltip" data-placement="top" title="打印条形码"  class="glyphicon glyphicon-save" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></button>';
										return edit + remove + print;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});

}

// 编辑任务
function editTask() {
	var data = arguments[0];
	// 填充数据
	$("#editSampleCode").val(data.factoryCode);
	$("#editSampleName").val(data.sampleName);
	$("#editSampleStyle").val(data.sampleStyle);
	$("#editSampleID").val(data.sampleID);
	$("#editTaskID").val(data.ID);
	$(".testProjectName").val(data.testName);
	$("#editUnit").val(data.unit);
	$("#editAskFor").val(data.askFor);
	$('#editTaskModal').modal('show');
}
function addTaskModel() {
	// 获取数据
	var param = {};
	var data ;
	param.sampleCode = $("#addSampleCode").val(); //已经用了blur事件
	param.sampleName = $("#addSampleName").val();
	param.sampleStyle = $("#addSampleStyle").val();
	param.sampleID = $("#addSampleID").val();
	param.testProject = getTestTatol("add").ids;
	console.log(param.testProject);
	param.unit = $("#addUnit").val();
	param.require = $("#addAskFor").val();
	param.reID = obj.reID;
	param.state = "add";
	// 验证数据
	if (valTaskData(param)) {
		// 传输数据

		$.ajax({
					url : '/laboratorySystem/receiptlistController/addTaskAndSampleWithEdit.do',
					dataType : "json",
					type : "post",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
					async : false,
					data : param,
					success : function(o) {
						 data = JSON.parse(o);
						if (data == true) {
							$('#addTaskModal').modal('hide');
							 $('#sampleTable').bootstrapTable('refresh',null);
							alert("sucueessful");
							
						} else
							alert("faile");
					},
					error : function() {
						return false;
					}
				});
	} else { // 失败处理

	}
	 

}
// 验证任务框的数据
function valTaskData(data) {

	if (data.sampleCode == "" || data.sampleCode == "null") {
		alert("出厂编号不能为空");
		return false;
	}
	if (data.sampleName == "" || data.sampleName == "null") {
		alert("样品名称不能为空");
		return false;
	}
	return true;
}
// 编辑任务弹框确认
function editTaskModel() {

	// 获取数据
	var param = {};
	var data ;
	param.sampleCode = $("#editSampleCode").val();
	param.sampleName = $("#editSampleName").val();
	param.sampleStyle = $("#editSampleStyle").val();
	param.sampleID = $("#editSampleID").val();
	param.taskID = $("#editTaskID").val();
	param.testProject = getTestTatol("edit").ids;
	console.log(param.testProject);
	param.unit = $("#editUnit").val();
	param.require = $("#editAskFor").val();
	param.reID = obj.reID;
	param.state = "edit";
	// 验证数据是否合理
	if (valTaskData(param)) {
		$.ajax({
					url : '/laboratorySystem/receiptlistController/addTaskAndSampleWithEdit.do',
					dataType : "json",
					type : "post",
					async : false,
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
					data : param,
					success : function(o) {
						 data = JSON.parse(o);
						if (data == true) {
								$('#editTaskModal').modal('hide');
								alert("sucueessful");
								$('#sampleTable').bootstrapTable('refresh',null);
						} else
							alert("faile");
					},
					error : function() {
						return false;
					}
				});
	} else {

	}
	  
	// $('#taskModal').modal('show');
	// 返回结果信息
}
// 获取选择的检测项目ID和名字
function getTestTatol(isAdd) {
	var total = {};
	var checkboxName = "";
	if (isAdd == "add") {
		checkboxName = "addTask";
	} else
		checkboxName = "editTask";
	var cbs = $("input[name='" + checkboxName + "']:checked");
	var ids = "", names = "";
	for (var i = 0; cbs && i < cbs.length; i++) {
		ids += $(cbs[i]).val() + " , ";
		names += $(cbs[i]).next().text() + "  ,  ";
	}
	total.ids = ids;
	total.names = names;
	console.log(total);
	return total;
}
// 编辑任务弹框确认
function editFileModel() {
	var param = {};
	var data ;
	param.fileID = $("#editFileID").val();
	param.remarks = $("#fileRemarks").val();
	$
			.ajax({
				url : '/laboratorySystem/fileInformationController/updateRemarksByID.do',
				dataType : "json",
				type : "post",
				async : false,
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				data : param,
				success : function(o) {
			 		data = JSON.parse(o);
					if (data == true) {
						{
							$('#editFileModal').modal('hide');
							alert("sucueessful");
						}
					} else
						alert("FILE faire");
				},
				error : function() {
					return false;
				}

			});
	  $('#fileTable').bootstrapTable('refresh',null);
	// 获取ID
	// 返回结果
}
// 编辑文件
function editFile(fileID) {
	$("#editFileID").val(fileID);
	$('#editFileModal').modal('show');
}
//删除交接单的文件
function deleteFile(fileID) {
	var data ;
   $.ajax({
	url : '/laboratorySystem/fileInformationController/deleteFileByID.do',
	dataType : "json",
	async : false,
	data : {
		fileID : fileID
	},
	success : function(o) {
		 data = JSON.parse(o); // error
		if (data == true) {
			alert("delete sunceesul");
		} else {
			alert("delete faire");
		}
	},
	error : function() {
		return false;
	}
   });
   $('#fileTable').bootstrapTable('refresh',null);

}
// 删除任务
function deleteTask(taskID) {
	var data ;
	$.ajax({
		url : '/laboratorySystem/receiptlistController/deleteTaskByID.do',
		dataType : "json",
		async : false,
		data : {
			taskID : taskID
		},
		success : function(o) {
			 data = JSON.parse(o); // error
			if (data == true) {
				alert("delete sunceesul");
			} else {
				alert("delete faire");
			}
		},
		error : function() {
			return false;
		}
	});
	  $('#sampleTable').bootstrapTable('refresh',null);
}
// 检查数据是否合理
function checkDate(data, who) {
	if (who == "file")
		chenkDataFile(data);
	else
		chenkDataTask(data);

}
// 检查任务数据是否合理
function chenkDataTask(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("reID") || dataObj.reID == null
			|| dataObj.reID.trim() == "NULL") {
		dataObj.reID = "";
	}
	if (!dataObj.hasOwnProperty("sampleID") || dataObj.sampleID == null
			|| dataObj.sampleID.trim() == "NULL") {
		dataObj.sampleID = "";
	}
	if (!dataObj.hasOwnProperty("askFor") || dataObj.askFor == null
			|| dataObj.askFor.trim() == "NULL") {
		dataObj.askFor = "no have";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null
			|| dataObj.startTime == undefined
			|| dataObj.startTime.trim() == "NULL") {

		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("sampleName") || dataObj.sampleName == null
			|| dataObj.sampleName.trim() == "NULL") {
		dataObj.sampleName = "";
	}
	if (!dataObj.hasOwnProperty("qrcode") || dataObj.qrcode == null
			|| dataObj.qrcode == undefined || dataObj.qrcode.trim() == "NULL") {
		dataObj.qrcode = "";
	}
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null
			|| dataObj.factoryCode.trim() == "NULL") {
		dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("style") || dataObj.style == null
			|| dataObj.style.trim() == "NULL") {
		dataObj.type = "";
	}
	if (!dataObj.hasOwnProperty("unit") || dataObj.unit == null
			|| dataObj.unit.trim() == "NULL") {
		dataObj.unit = "";
	}
	if (!dataObj.hasOwnProperty("testName") || dataObj.testName == null
			|| dataObj.testName.trim() == "NULL") {
		dataObj.testName = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks.trim() == "NULL") {
		dataObj.remarks = "";
	}
}
// 检查文件数据是否合理
function chenkDataFile(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null
			|| dataObj.fileName.trim() == "NULL") {
		dataObj.fileName = "";
	}
	if (!dataObj.hasOwnProperty("uploadName") || dataObj.uploadName == null
			|| dataObj.uploadName.trim() == "NULL") {
		dataObj.uploadName = "";
	}
	if (!dataObj.hasOwnProperty("uploadTime") || dataObj.uploadTime == null
			|| dataObj.uploadTime.trim() == "NULL") {
		dataObj.uploadTime = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks.trim() == "NULL") {
		dataObj.remarks = "";
	}
}