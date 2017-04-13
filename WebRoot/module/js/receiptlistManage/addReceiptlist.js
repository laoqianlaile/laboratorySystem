/**
 * //接受传过来的参数
 */
var obj = {
	reID : "12265656565",
	reCode : "xiji-2016-15-34",
	proID : "",
	coCode : "",
	coID : "",
	state : "",
	comID : "",
	isCreate : false
}
/**
 * 上传文件所用的参数
 */
var fileObj = {};
$(function() {
	initData();
	initEvent();
	autoHeightWidth();
});
// 初始化数据
function initData() {
	fileUploadInit("#file_upload"); //初始化上传文件功能
	initPageData(); //展示页面页头数据
	initSample();  //展示任务表的数据
	initFile();//展示交接单附件的数据
	
}


//初始页面数据
function initPageData() {
	/**
	 * 获取参数
	 */
	var dara = getURLParameter();
	obj.reID = dara.reID;
	obj.reCode = dara.reCode;
	obj.proID = dara.proID;
	obj.coID = dara.coID;
	obj.state = dara.state;
	obj.comID = dara.comID;

	$('.headTitel').children().eq(1).children().eq(1).text(obj.reCode); // 设置交接单编码
	$("#coCode").val(dara.coCode);// 设置合同编码
	$("#coCode").attr("disabled", true);// 不可编辑
	$("#address").attr("disabled", true); //公司地址都是不能编辑
	if (dara.state == "yes") {// 有合同
		dealHaveCom(dara); // 处理公司
	} else if (dara.state == "no") { // 无合同新增，不做操作
		;
	} else { // 编辑状态
		var reInformation = getReceiptByReID(dara.reID);
		$("#linkMan").val(reInformation.linkMan);
		$("#startTime").val(reInformation.startTime);
		$("#endTime").val(reInformation.endTime);
		$("#accordingDoc").val(reInformation.accordingDoc);
		$("#linkPhone").val(reInformation.linkPhone);
		dealHaveCom(dara); 
		obj.isCreate = true; //不删除
	}
	
	
}
//上传文件预处理
function submitFile() {
	// loadingData();
	fileObj.path = "";// filePath; //
	// 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	fileObj.fileTypeNumber = "1";// fileTypeNumber; // 文件类型
	fileObj.firstDirectoryName = "项目文件";// fileFirstDirectory; // 一级目录
	fileObj.secondDirectoryName = obj.proID;// fileSecondDirectory; // 二级目录
	fileObj.thirdDirectoryName = "交接单文件";// fileThirdDirectory //三级目录
	fileObj.belongtoID = obj.reID;
	fileObj.otherInfo = "";// fileOtherInfo; // 其他参数
	fileObj.remarks = $("#fileremarks-u").val();// fileRemarks; // 备注
	// 文件上传
	fileUpload("#file_upload", fileObj.filePath, fileObj.fileTypeNumber,
			fileObj.belongtoID, fileObj.firstDirectoryName,
			fileObj.secondDirectoryName, fileObj.thirdDirectoryName,
			fileObj.otherInfo, fileObj.remarks);
	setTimeout(refrehFileTable, 1000);

}
//文件上传成功后操作
function refrehFileTable() {
	$('#fileTable').bootstrapTable('refresh', null);
	$('#file_uploadModal').modal("hide");
}
/**
 * 获取交接单的信息
 * 
 * @param reID
 * @returns
 */
function getReceiptByReID(reID) {
	var data;
	$.ajax({
		url : '/laboratorySystem/receiptlistController/getReceiptByReID.do',
		dataType : "json",
		async : false,
		data : {
			reID : reID
		},
		success : function(o) {
			data = JSON.parse(o);
		},
		error : function() {
			return false;
		}
	});
	return data;
}
// 有公司展示--有合同新增，编辑状态
function dealHaveCom(dara) {
	var data;
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
				checkCompany(data);
				$("#companyName").val(data.companyName);
				$("#address").val(data.address);
			}
			console.log(typeof data);
			console.log(data);
		},
		error : function() {
			return false;
		}
	});
	$("#companyName").attr("disabled", true);
	$("#address").attr("disabled", true);
}

/**
 * 检测项目的事件-遮罩，点击，选取
 */
function initTestProject_event() {

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

// 自动搜索样品编号
function set_alert_wb_comment(the, state) {
	var sampleCode = $(the).val();
	var html = '<ul class="list_sampleCode">';
	var list_data;
	$(".tip-factory .tip-factory-content").html("");// 清空原来的数据
	$.ajax({
		url : '/laboratorySystem/sampleController/getSampleListByCodeLimit.do',
		dataType : "json",
		async : false,
		data : {
			sampleCode : sampleCode
		},
		success : function(o) {
			list_data = JSON.parse(o);
			console.log(list_data);
		},
		error : function() {
			return false;
		}
	});
	for (var i = 0; i < list_data.length; i++) {
		html += '<li onclick="selectSample(this,\'' + state + '\',\''
				+ list_data[i].ID + '\')">' + list_data[i].sampleCode + '</li>';
	}
	html += '</ul>';
	if(list_data != null && list_data.length > 0)
	{
		$(".tip-factory .tip-factory-content").html(html);
		$(".tip-factory").css("display", "block");
	}
	else{
		$(".tip-factory").css("display", "none");
	}
}
//选择搜索出来的样品后的操作
function selectSample(the, state, sampleID) {
	var sampleCode = $(the).text();
	if (state == "add") {

		$("#addSampleCode").val(sampleCode);
		$("#addSampleID").val(sampleID);
	} else {
		$("#editSampleCode").val(sampleCode);
		$("#editSampleID").val(sampleID);
	}
	$(the).parent().css("display", "none"); // 隐藏搜索面板
	isExitSample(sampleCode); // 填充数据--并设置相关属性--避免搜索后不选择

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
	initTestProject_event(); // 检测项目的事件-遮罩，点击，选取
	initAddTask_event();// 打开新增任务框清除数据事件
	initSampleCode_event();// 初始出厂编码填写框失去焦点事件
	initSaveAndSubmitRe_event(); // 保存或提交交接单
	window.onbeforeunload = function() {
		onbeforeunload_handler();
		return;
	};
}
// 删除之前操作新增的数据
function onbeforeunload_handler() {
	var param = {};
	if (obj.isCreate == true)  //不删除
		param.create = 0;
	else {
		param.create = 1;
		param.reID = obj.reID;
		param.coID = obj.coID;
		param.proID = obj.proID;
		param.state = obj.state;
		$.ajax({
					url : '/laboratorySystem/receiptlistController/deleteNewReceipt.do',
					dataType : "json",
					type : "post",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
					async : false,
					data : param,
					success : function(o) {
					       ;
					},
					error : function() {
						sweetAlert(""," 保存交接单失败","error");
					}

				});
	}
}
function initSaveAndSubmitRe_event() {
	$("#linkPhone").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "") {
			sweetAlert("联系人电话不能为空");
		} else if (!isNoramlPhone($(this).val().trim())) {
			sweetAlert("联系人电话格式不正确");
		}
	});

	$("#linkMan").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "") {
			sweetAlert("联系人不能为空");
			return;
		}
	});
	
	 $("#companyName").blur(function() {
		 setTimeout("hideCpmpanyOver()" ,1000);
		 
     });
	 
	$("#address").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "")
			sweetAlert("公司通讯地址不能为空");
	});

	$(".footer button").click(function() { // 保存和提交按钮的点击操作
		dealReSave();

	});
}
function hideCpmpanyOver(){
	$("#companyContainer").css("display","none");
	//处理输入没有的公司
	obj.comID = "";
	$("#address").val("");
}
// 处理交接单的保存和提交事件
function dealReSave() {
	var btnName = "";
	var param = {};
	var data;
	btnName = $(this).text();

	param.addState = obj.state;
	param.companyName = $("#companyName").val().trim();
	param.address = $("#address").val().trim();
	param.linkMan = $("#linkMan").val().trim();
	param.startTime = $("#startTime").val().trim();
	param.endTime = $("#endTime").val().trim();
	param.linkPhone = $("#linkPhone").val().trim();
	param.accordingDoc = $("#accordingDoc").val().trim();
	param.reID = obj.reID;
	param.coID = obj.coID;
	param.comID = obj.comID;
	if (vaildInputData(param) == false) {
		return;
	}
	obj.isCreate = true;
	if (btnName == "保存")
		param.saveState = "save";
	else {
		param.saveState = "submit";
	}
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
					sweetAlert(" 保存交接单失败");
				}

			});

}
// 验证数据是否合理或者是否输入
function vaildInputData(param) {
	if (param.linkMan == null || param.linkMan == undefined
			|| param.linkMan == "") {
		sweetAlert("联系人为空");
		return false;
	}
	if (param.startTime == null || param.startTime == undefined
			|| param.startTime == "") {
		sweetAlert("委托时间为空");
		return false;
	}

	if (param.endTime == null || param.endTime == undefined
			|| param.endTime == "") {
		sweetAlert("结束时间为空");
		return false;
	}
	if (param.endTime <= param.startTime) {
		sweetAlert("时间先后顺序选择错误");
		return false;
	}
	if(param.comID == null || param.comID == undefined
			|| param.comID == "") {
		sweetAlert("请选择已存在的委托单位");
		return false;
	}
	
	/*if (param.address == null || param.address == undefined
			|| param.address == "") {
		sweetAlert("通讯地址为空");
		return false;
	}*/

	if (!isNoramlPhone(param.linkPhone)) {
		sweetAlert("联系人电话格式不正确");
		return false;
	}
	return true;
}
// 搜索公司名称
function searchCompany() {
	var companyName = $("#companyName").val();
	if (companyName != null && companyName != "") {
		$.ajax({
			url : '/laboratorySystem/companyController/getComListByName.do',
			dataType : "json",
			type : "post",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
			async : false,
			data : {
				companyName : companyName
			},
			success : function(o) {
				data = JSON.parse(o);
				// $(".tip-factory").css("display","none"); //隐藏下面的提示搜索框
				if (data != null && data.length != 0)
					showCompanylist(data);
			},
			error : function() {
				sweetAlert(" 没有搜索到该样品");
			}
		});
	}
}
//展示在DOM树中
function showCompanylist(data){
	$("#companyContainer").css("display","block");
	$("#over_company ul").html("");//清空以前的列表数据
	var html = "";
	for (var i = 0; i < data.length; i++) {
		 html += "<li onclick='selectedCompany(" + JSON.stringify(data[i]) + ")'>"
			+ data[i].companyName + "</li>";
	}
	$("#over_company ul").html(html);
}
//选择公司名字后处理
function selectedCompany(company){

	$("#companyName").val(company.companyName);
	obj.comID = company.ID;
	$("#address").val(company.address);
	$("#companyContainer").css("display","none");
}
// 输入样品编号检查样品库是否存在--避免选择后重新输入没有的样品
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
			// $(".tip-factory").css("display","none"); //隐藏下面的提示搜索框
		},
		error : function() {
			sweetAlert(" 没有搜索到该样品");
		}
	});
	if (data != false) {
		// 填充数据-新增
		$("#editSampleID").val(data.sampleID);
		$("#editSampleName").val(data.sampleName);
		$("#editSampleStyle").val(data.sampleStyle);
		$("#editUnit").val(data.unit);
		// 填充数据-编辑
		$("#addSampleID").val(data.sampleID);
		$("#addSampleName").val(data.sampleName);
		$("#addSampleStyle").val(data.sampleStyle);
		$("#addUnit").val(data.unit);
		// 设置不可编辑--编辑
		$("#editSampleName").attr("disabled", true);
		$("#editSampleStyle").attr("disabled", true);
		$("#editUnit").attr("disabled", true);
		// 设置不可编辑--新增
		$("#addSampleName").attr("disabled", true); // $("#addSampleName").attr("readonly",
		// true);
		$("#addSampleStyle").attr("disabled", true);
		$("#addUnit").attr("disabled", true);

	} else {
		// 清除数据-新增
		$("#editSampleID").val("");
		$("#editSampleName").val("");
		$("#editSampleStyle").val("");
		// 清除数据-编辑
		$("#addSampleID").val("");
		$("#addSampleName").val("");
		$("#addSampleStyle").val("");
		// 设置可编辑--编辑
		$("#editSampleName").attr("disabled", false);
		$("#editSampleStyle").attr("disabled", false);
		$("#editUnit").attr("disabled", false);
		// 设置可编辑--新增
		$("#addSampleName").attr("disabled", false);
		$("#addSampleStyle").attr("disabled", false);
		$("#addUnit").attr("disabled", false);

	}
}
// 初始出厂编码填写框失去焦点事件
function initSampleCode_event() {
    
	    
	  var fn1 = $("#editSampleCode").blur(function(){
		    var self = this.id ;
		    setTimeout("hideSampleOver('"+self+"')",1000);
		  
	     });
	  var fn2 = $("#addSampleCode").blur(function(){
		  var self = this.id ;
		    setTimeout("hideSampleOver('"+self+"')",1000);
		 
	     });
	/* if($("#editSampleCode").val() == "") { // sweetAlert("样品编号不能为空");
	 //sample_global.isAddEdit = false;
	 //$(".tip-factory").css("display","none"); //隐藏下面的提示搜索框 } else
	 setTimeout(isExitSample($("#addSampleCode").val()),400); }); var fn1 =
	 $(document).on("blur", "#editSampleCode", function() { //需要blur事件填充剩余的数据
	 
	 if($("#editSampleCode").val() == "") { // sweetAlert("样品编号不能为空");
	 //sample_global.isAddEdit = false;
	 //$(".tip-factory").css("display","none"); //隐藏下面的提示搜索框 } else
	 isExitSample($("#editSampleCode").val()); }); var fn2 =
	 $("#addSampleCode").blur(function(){ if($("#addSampleCode").val() == "") {
	 //sweetAlert("样品编号不能为空"); //sample_global.isAddEdit = false;
	 //$(".tip-factory").css("display","none"); //隐藏下面的提示搜索框 } else
	 setTimeout(isExitSample($("#addSampleCode").val()),400); });*/
	 
	/*
	 * var fn2 = $(document).on("blur", "#addSampleCode", function() {
	 * if($("#addSampleCode").val() == "") { //sweetAlert("样品编号不能为空");
	 * //sample_global.isAddEdit = false;
	 * //$(".tip-factory").css("display","none"); //隐藏下面的提示搜索框 } else
	 * isExitSample($("#addSampleCode").val()); });
	 */
	/*
	 * setTimeout(fn1,200); setTimeout(fn2,200);
	 */
}
// 离开出厂编号搜索框处理
function hideSampleOver(id){
	    $(".tip-factory").css("display", "none");  //隐藏面板
	    var val = $("#"+id).val();
	     isExitSample(val); //输入不点击搜索面板
}
/**
 * 打开新增任务框清除数据事件
 */
function initAddTask_event() {
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
// 时间验证
function vaildSelected(startTime, endTime) {
	if (endTime > startTime)
		return true;
	else
		return false;
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
						url : '/laboratorySystem/receiptlistController/getRelateFiletByReID.do',// 服务器数据的加载地址
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
										var dele = "", edit = "", download = "";
										download = "<img src=\"./module/img/download_icon.png\" alt=\"下载\" title=\"下载\"  onclick='download(\""
												+ row.ID + "\")'>";
										edit = "<img src=\"./module/img/edit_icon.png\"  alt=\"编辑\" title=\"编辑\"  onclick='editFile(\""
												+ row.ID + "\")'>";
										dele = "<img src=\"./module/img/delete_icon.png\" alt=\"删除\" title=\"删除\"  onclick='deleteFile(\""
												+ row.ID + "\")'>";
										return edit + dele + download;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
}
/**
 * 下载文件
 * 
 * @param fileID
 */
function download(fileID) {
	downOneFile(fileID);
}

// 初始样品数据表格
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
								},{
									field : 'unit',// 返回值名称
									title : '单位',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5',// 宽度
								
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
									width : '13%'// 宽度
								},
								{
									field : '',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '12%',// 宽度
									formatter : function(value, row, index) {
										var dele = "", edit = "", print = "";
										edit = "<button onclick='editTask("
												+ JSON.stringify(row)
												+ ")'"
												+ " data-toggle='tooltip' data-toggle='top'  title='编辑'  class='glyphicon glyphicon-edit' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></button>";
										remove = '<button  onclick= "deleteTask(\''
												+ row.ID
												+ '\')" data-toggle="tooltip" data-placement="top" title="删除" class="glyphicon glyphicon-remove" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></button> ';
										print = "<img src=\"./module/img/printbarcode_icon.png\" alt=\"打印条形码\" title=\"打印条形码\" onclick='print(\""
												+ row.qrcode + "\")'>";

										edit = "<img src=\"./module/img/edit_icon.png\"  alt=\"编辑\" title='编辑' onclick='editTask("
												+ JSON.stringify(row) + ")'>";
										dele = "<img src=\"./module/img/delete_icon.png\" alt=\"删除\" title='删除' onclick='deleteTask(\""
												+ row.ID + "\")'>";
										return edit + dele + print;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});

}

// 编辑任务框打开
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
// 新增任务框按钮确定
function addTaskModel() {
	// 获取数据
	var param = {};
	var data;
	param.sampleCode = $("#addSampleCode").val(); // 后面方法验证
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
							$('#sampleTable').bootstrapTable('refresh', null);
							sweetAlert("任务新增成功");

						} else
							sweetAlert("","任务新增失败","error");
					},
					error : function() {
						return false;
					}
				});
	} else { // 失败处理

	}

}
// 验证样品的编号和名称的数据
function valTaskData(data) {

	if (data.sampleCode == "" || data.sampleCode == "null") {
		sweetAlert("出厂编号不能为空");
		return false;
	}
	if (data.sampleName == "" || data.sampleName == "null") {
		sweetAlert("样品名称不能为空");
		return false;
	}
	return true;
}
// 编辑任务弹框确认
function editTaskModel() {

	// 获取数据
	var param = {};
	var data;
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
		$
				.ajax({
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
							sweetAlert("编辑任务成功");
							$('#sampleTable').bootstrapTable('refresh', null);
						} else
							sweetAlert("","编辑任务失败","error");
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
// 获取选择的检测项目ID和名字列表
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
// 编辑文件弹框确认
function editFileModel() {
	var param = {};
	var data;
	param.fileID = $("#editFileID").val();
	param.remarks = $("#fileremarks-e").val();
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
					
							$('#fileTable').bootstrapTable('refresh', null);
						}
					} else
						sweetAlert("","文件更新失败","error");
				},
				error : function() {
					return false;
				}

			});

	// 获取ID
	// 返回结果
}
// 编辑文件备注信息框打开
function editFile(fileID) {
	$("#editFileID").val(fileID);
	$('#editFileModal').modal('show');
}
// 删除交接单的文件
function deleteFile(fileID) {
	sweetAlert({
		  title: "Are you sure?",
		  text: "是否删除交接单文件!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否"
		
		}, function(isConfirm){
			if(isConfirm){
				var data;
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
							
							sweetAlert({
								title:"文件删除成功",
								type:"success",
								timer:100
								});
						} else {
							sweetAlert("","文件删除失败 ","error");
						}
					},
					error : function() {
						sweetAlert("","文件删除失败","error");
						return false;
					}
				});
				$('#fileTable').bootstrapTable('refresh', null);

			}else{
				
			}
			});
	
	
}
// 删除任务
function deleteTask(taskID) {
	sweetAlert({
		  title: "Are you sure?",
		  text: "是否删除任务！",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否"
		
		}, function(isConfirm){
			if(isConfirm){
				var data;
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
							sweetAlert("任务删除成功 ");
						} else {
							sweetAlert("","任务删除失败","error");
						}
					},
					error : function() {
						sweetAlert("","任务删除失败","error");
						return false;
					}
				});
				$('#sampleTable').bootstrapTable('refresh', null);
			}else{
				
			}
			});
	
}
// 检查任务数据和文件数据是否合理
function checkDate(data, who) {
	if (who == "file")
		chenkDataFile(data);
	else
		chenkDataTask(data);

}
function checkCompany(dataObj){
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null
			|| dataObj.companyName.trim() == "NULL" || dataObj.companyName == undefined) {
		dataObj.companyName = "";
	}
	if (!dataObj.hasOwnProperty("address") || dataObj.address == null
			|| dataObj.address.trim() == "NULL") {
		dataObj.address = "";
	}
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
		dataObj.askFor = "";
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