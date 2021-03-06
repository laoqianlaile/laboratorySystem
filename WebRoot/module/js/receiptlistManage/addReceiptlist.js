/**
 * //接受传过来的参数
 */
var obj = {
	reID : "",
	reCode : "",
	proID : "",
	coCode : "",
	coID : "",
	state : "",
	comID : "",
	isSelectedCom:false,
	isSelectedSample:false,
	departmentData :[],
	isCreate : false
}
var tableData;
/**
 * 上传文件所用的参数
 */
var fileObj = {};
var EventUtil = {  //事件工具类
		getEvent:function(event){
			return event ? event : window.event;
		},
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},
		getSource:function(event){
			return  event.srcElement || event.target;
		}
};
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
	obj.departmentData=getDataDepartment();
	
}
function  getDataDepartment(){ //获取部门列表
	var data;
	$.ajax({
		url : '/laboratorySystem/departmentController/getDepartmentName.do',
		dataType : "json",
		async : false,
		data : {
			
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
	obj.contractType = dara.contractType;
	$('.headTitel').children().eq(1).children().eq(1).text(obj.reCode); // 设置交接单编码
	$("#coCode").val(dara.coCode);// 设置合同编码
	$("#coCode").attr("disabled", true);// 不可编辑
	$("#address").attr("disabled", true); //公司地址都是不能编辑
	if (dara.state == "yes") {// 有合同
		dealHaveCom(dara); // 处理公司
		dealTestStandard(dara.coID); //依据的技术文件标准
	} else if (dara.state == "no") { // 无合同新增，不做操作
		;
	} else { // 编辑状态
		var reInformation = getReceiptByReID(dara.reID,dara.coID);
		$("#linkMan").val(reInformation.linkMan);
		$("#startTime").val(reInformation.startTime);
		$("#endTime").val(reInformation.endTime);
		$("#accordingDoc").val(reInformation.accordingDoc);
		$("#linkPhone").val(reInformation.linkPhone);
		dealHaveCom(dara); 
		obj.isCreate = true; //不删除
	}
	
	
}
function dealTestStandard(coID){ //获取合同的技术标准号和标准名称
	var data;
	$.ajax({
		url : '/laboratorySystem/contractController/getStandardByContractID.do',
		dataType : "json",
		async : false,
		data : {
			coID : coID
		},
		success : function(o) {
			console.log(o);
			$("#accordingDoc").val(o);
		},
		error : function() {
			return false;
		}
	});
	
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
	setTimeout(refrehFileTable, 800);

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
function getReceiptByReID(reID,coID) {
	var data = {};
	data.reID = reID;
	data.coID = coID;
	$.ajax({
		url : '/laboratorySystem/receiptlistController/getReceiptByReID.do',
		dataType : "json",
		async : false,
		data : data,
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
	$("#companyName").prop("disabled", true);
	$("#address").prop("disabled", true);
}


function handleSearchSample(){
	curral(searchSampleCode,window,arguments);
}

// 自动搜索样品编号
function searchSampleCode(args) {
	
	var sampleCode = $(args[0]).val();
	if(args[1] == "add"){
		$("#addSammpleID").val("");
	}else{
		$("#editSammpleID").val("");
	}
	
	var html = '<ul class="list_sampleCode"  onclick="selectSample(this,event)" data-state="'+args[1]+'"  >';
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
			
		},
		error : function() {
			return false;
		}
	});
	for (var i = 0; i < list_data.length; i++) {
		html += '<li id="'+list_data[i].ID+'" data-sample =\''+ JSON.stringify(list_data[i])+'\'>' + list_data[i].sampleCode +' ~~ '+list_data[i].sampleName+ '</li>';
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
function selectSample(self,event) {
	var source = event.srcElement || event.target;
	var sample ;
	var sampleID = source.id;
	var state = self.dataset.state;
	if(source.className == "list_sampleCode"){ //点击到ul中，却没有点击到li中
		 
		return ;
	}
	
	if(source.dataset){
		sample = source.dataset.sample;
	}else{
		sample = source.getAttribute("data-sample");
	}
	sample = JSON.parse(sample);
	
	
	if (state == "add") {
		// 填充数据-新增
		$("#addSampleName").val(sample.sampleName);
		$("#addSampleStyle").val(sample.sampleStyle);
		$("#addUnit").val(sample.unit);
		$("#addSampleCode").val(sample.sampleCode);
		$("#addSampleID").val(sampleID);
		// 设置不可编辑--新增
		$("#addSampleName").prop("disabled", true); 
		$("#addSampleStyle").prop("disabled", true);
		$("#addUnit").prop("disabled", true);
	} else {
		// 填充数据-编辑
		$("#editSampleName").val(sample.sampleName);
		$("#editSampleStyle").val(sample.sampleStyle);
		$("#editUnit").val(data.datasset.unit);
		$("#editSampleCode").val(data.datasset.sampleCode);
		$("#editSampleID").val(sampleID);
		$("#editDepartment").val(sample.department);
		// 设置不可编辑--编辑
		$("#editSampleName").prop("disabled", true);
		$("#editSampleStyle").prop("disabled", true);
		$("#editUnit").prop("disabled", true);
	}
	obj.isSelectedSample = true ;
	EventUtil.stopPropagation(event);
	//$(self).parent().css("display", "none"); // 隐藏搜索面板 不需要，因为出厂编号输入框失去焦点也会隐藏
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
	//initTestProject_event(); // 检测项目的事件-遮罩，点击，选取
	initAddTask_event();// 打开新增任务框清除数据事件
	initSampleCode_event();// 初始出厂编码填写框失去焦点事件
	initSearchTestProject();
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
						swal(""," 保存交接单失败","error");
					}

				});
	}
}
function initSaveAndSubmitRe_event() {
	$("#linkPhone").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "") {
			swal("联系人电话不能为空");
		} else if (!isNoramlPhone($(this).val().trim())) {
			swal("联系人电话格式不正确");
		}
	});

	$("#linkMan").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "") {
			swal("联系人不能为空");
			return;
		}
	});
	
	$("#companyName").blur(function() {
		 setTimeout("hideCpmpanyOver()" ,700);
		 
     });
	 
	$("#address").blur(function() {
		if ($(this).val() == null || $(this).val().trim() == "")
			swal("公司通讯地址不能为空");
	});

	$(".footer button").click(function() { // 保存和提交按钮的点击操作
		dealReSave(this);

	});
}
function hideCpmpanyOver(){
	$("#companyContainer").css("display","none");
	//处理输入没有的公司
	if(obj.isSelectedCom == true){
		;
	}else{
		obj.isSelectedCom = false;
		obj.comID = "";
		$("#address").val("");
	}
	
	
}
// 处理交接单的保存和提交事件
function dealReSave(self) {
	var btnName = "";
	var param = {};
	var data;
	btnName = $(self).text();

	param.addState = obj.state;
	param.companyName = $("#companyName").val().trim();
	param.address = $("#address").val().trim();
	param.linkMan = $("#linkMan").val().trim();
	param.startTime = $("#startTime").val().trim();
	param.endTime = $("#endTime").val().trim();
	param.linkPhone = $("#linkPhone").val().trim();
	param.accordingDoc = $("#accordingDoc").val().trim();
	param.reCode = $(".headTitel label span:last-child")[0].innerText ;
	param.reID = obj.reID;
	param.coID = obj.coID;
	param.comID = obj.comID;
	if (vaildInputData(param) == false) {
		return;
	}
	if(unselectedDepartment()){
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
						{
						   window.history.back(); 
						//  window.location = "./module/jsp/receiptlistManage/receiptlistManage.jsp";
						}
				},
				error : function() {
					swal(" 保存交接单失败");
				}

			});

}
//判断是否选中咳嗽
function unselectedDepartment(){
	for(i=0;i<tableData.rows.length;i++){
		if(tableData.rows[i].departmentName == undefined || tableData.rows[i].departmentName == ""){
			swal("请检查您的样品信息是否选择了检测科室");
			return true;
		}
	}
	return false;
}
// 验证数据是否合理或者是否输入
function vaildInputData(param) {
	if (param.linkMan == null || param.linkMan == undefined
			|| param.linkMan == "") {
		swal("联系人为空");
		return false;
	}
	if (param.startTime == null || param.startTime == undefined
			|| param.startTime == "") {
		swal("委托时间为空");
		return false;
	}

	if (param.endTime == null || param.endTime == undefined
			|| param.endTime == "") {
		swal("结束时间为空");
		return false;
	}
	if (param.endTime <= param.startTime) {
		swal("时间先后顺序选择错误");
		return false;
	}
	if(param.comID == null || param.comID == undefined
			|| param.comID == "") {
		swal("请选择已存在的委托单位");
		return false;
	}
	if (!isNoramlPhone(param.linkPhone)) {
		swal("联系人电话格式不正确");
		return false;
	}
	return true;
}
function handleCompany(){
	curral(searchCompany,window,arguments);
}
//函数节流处理 --减少执行次数
function curral(method,context,args){
	clearTimeout(method.tid);
	method.tid = setTimeout(function(){
		method.call(context,args); //虽然传过去是数组，但是函数处理还是和原来一样(args0,arrgs1); apply(是把数组中的每个值都是当作参数处理) 和 call(把args当成一个数组参数传过去) 函数处理也不一样 
	},400); 
}

// 搜索公司名称
function searchCompany() {
	var companyName = $("#companyName").val();
	obj.comID = "" ; //重新输入 公司清空
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
				swal(" 没有搜索到该样品");
			}
		});
	}
}
//展示在DOM树中
function showCompanylist(data){
	$("#companyContainer").css("display","block");
	$("#over_company ul").html("");//清空以前的列表数据  onclick='selectedCompany(" + JSON.stringify(data[i]) + ")'
	var html = "";
	for (var i = 0; i < data.length; i++) {
		 html += "<li  data-address=\'"+data[i].address+"\' id=\'"+data[i].ID+"\'>"
			+ data[i].companyName + "</li>";
	}
	
	$("#over_company ul").html(html);
}
//选择公司名字后处理
function selectedCompany(event){
    var source = EventUtil.getSource(event);
    var tagName = source.tagName ;
    if(tagName == "UL" || tagName == "ul"){
    	return ;
    }
	$("#companyName").val(source.innerText);
	obj.comID = source.id;
	$("#address").val(source.getAttribute("data-address"));
	obj.isSelectedCom = true;
	$("#companyContainer").css("display","none");
	EventUtil.stopPropagation(event);
	
}
/*// 输入样品编号检查样品库是否存在--避免选择后重新输入没有的样品
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
			swal(" 没有搜索到该样品");
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
}*/
//检测项目方法失去焦点隐藏展示列表
function initSearchTestProject() {

var fn3 = $("#addsearchTestProjects").blur(function(){
	 setTimeout("hideTestList",700);
	
  
 });
var fn4 = $("#editsearchTestProjects").blur(function(){
	 setTimeout("hideTestList",700);
 
 });
}
function hideTestList(){
	$('.showTestProjects[name = "add"]').hide();
	$('.showTestProjects[name = "edit"]').hide();
}
// 初始出厂编码填写框失去焦点事件
function initSampleCode_event() {
    
	    
	  var fn1 = $("#editSampleCode").blur(function(){
		   // var self = this.id ;
		    setTimeout("hideSampleOver('edit')",700);
		  
	     });
	  var fn2 = $("#addSampleCode").blur(function(){
		  //var self = this.id ;
		    setTimeout("hideSampleOver('add')",700);
		 
	     });

}
// 离开出厂编号搜索框处理
function hideSampleOver(state){
	    $(".tip-factory").css("display", "none");  //隐藏面板
	    var sampleID = $("#"+state+"SampleID").val();
	    if(state = "add"){
	    	if(sampleID == "" ||  sampleID == null){
	    		// 设置可编辑--新增
	    		$("#addSampleName").prop("disabled", false); 
	    		$("#addSampleStyle").prop("disabled", false);
	    		$("#addUnit").prop("disabled", false);
	    	}
	    }else{
	    	if(sampleID == "" ||  sampleID == null){
	    		// 设置可编辑--编辑
	    		$("#editSampleName").prop("disabled", false);
	    		$("#editSampleStyle").prop("disabled", false);
	    		$("#editUnit").prop("disabled", false);
	    		
	    	}
	    }
	  
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
		$('#displayChecked[name = "add"]').empty();
		addDepartmentList("add");
		$("#addTaskModal").modal('show');
		showAddTaskModal();
	});
}
function showAddTaskModal(){
	// 清空以前填写的数据
	$("#addSampleCode").val("");
	$("#addSampleName").val("");
	$("#addSampleID").val("");
	$("#addAskFor").val("");
	$('#displayChecked[name = "add"]').empty();
	addDepartmentList("add");
	if(obj.contractType == "1"){
//		$("#assayType").hide();
		$("#searchAssay").hide();
		$("#calibrationItems").hide();
	}
	$("#addTaskModal").modal('show');
}
function addDepartmentList(par){
	var html = "";
	var data = obj.departmentData ;
	$("#"+par+"Department").html(html);
	for(var i = 0; i < data.length ; i++){
		html+="<option value='"+data[i].ID+"'>"+data[i].departmentName+"</option>";
	}
	$("#"+par+"Department").html(html);
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
						pageList : [ 3, 5, 8 ],// 设置可供选择的页面数据条数
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
							tableData = data;
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
									field : 'testProjectID',// 返回值名称
									title : '检测项目ID',// 列名
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
									width : '12%'// 宽度
								},
								{
									field : 'sampleName',// 返回值名称
									title : '样品名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '11%'// 宽度
								},
								{
									field : 'sampleStyle',// 返回值名称
									title : '型号/规格/代号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								},{
									field : 'unit',// 返回值名称
									title : '单位',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '4%',// 宽度
								
								},
								{
									field : 'testProjectName',// 返回值名称
									title : '校准/检测项目',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '13%'// 宽度
								},
								{
									field : 'departmentName',// 返回值名称
									title : '校准/检测科室',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '13%'// 宽度
								},
								
								{
									field : 'askFor',// 返回值名称
									title : '备注',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%'// 宽度
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
										var dele = "", edit = "", confirm = "", print = "";
										print = "<img src=\"./module/img/printbarcode_icon.png\" alt=\"打印条形码\" title=\"打印条形码\" onclick='print(\""
												+ row.qrcode + "\")'>";

										edit = "<img src=\"./module/img/edit_icon.png\"  alt=\"编辑\" title='编辑' onclick='editTask("
												+ JSON.stringify(row) + ")'>";
										
										if(row.saveState == 0)
										{ 
											confirm = "<img src=\"./module/img/submit_icon.png\"  alt=\"确认\" title='确认' onclick='confirmTask()'>";
										}
											
										dele = "<img src=\"./module/img/delete_icon.png\" alt=\"删除\" title='删除' onclick='deleteTask(\""
												+ row.ID + "\")'>";
										return edit + dele + confirm + print;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});

}

//确认查看样品信息
function confirmTask(){
	var source = event.target || event.srcElement;
	source.style.display = "none"; 
	//后面保存处理过
	
}
// 编辑任务框打开
function editTask() {
	var data = arguments[0];
	var html="";
	// 填充数据
	$("#editSampleCode").val(data.factoryCode);
	$("#editSampleName").val(data.sampleName);
	$("#editSampleStyle").val(data.sampleStyle);
	$("#editSampleID").val(data.sampleID);
	$("#editTaskID").val(data.ID);
	editDepartmentList("edit",data.departmentName);
	html='<span class = "spanTag"><span class= "singleE" id ="'+data.testProjectID+'" >'+ data.testProjectName +'&nbsp;&nbsp;</span><a  onclick="moveSingleE(this)">x</a></span>'
	$('#displayChecked[name = "edit"]').empty();
	$('#displayChecked[name = "edit"]').append(html);
	if(obj.contractType == "1"){
//		$("#assayType").hide();
		$("#searchAssay1").hide();
		$("#calibrationItems1").hide();
	}
	else{
	$(".testProjectName").val(data.testName);}
	$("#editUnit").val(data.unit);
//	$("#editAskFor").val(data.askFor);
	$('#editTaskModal').modal('show');
}
function editDepartmentList(par,departmentName){
	var html = "";
	var data = obj.departmentData ;
	$("#"+par+"Department").html(html);
	for(var i = 0; i < data.length ; i++){
		if(departmentName == data[i].departmentName)
			html+="<option value='"+data[i].ID+"'  selected ='selected'>" + data[i].departmentName + "</option>";
		else
			html+="<option value='"+data[i].ID+"'>"+data[i].departmentName+"</option>";
	}
	$("#"+par+"Department").html(html);
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
	if(obj.contractType == "0"){
	param.testProjects = getTestProjectID();
	console.log(param.testProject);
	}
	param.unit = $("#addUnit").val();
//	param.type = $("input[name='addTaskType']").val();
	param.departmentID = $("#addDepartment").val();
	console.log("departmentID:"+param.departmentID);
	param.require = $("#addAskFor").val();
	param.reID = obj.reID;
	param.state = "add";
	console.log(param);
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
							$('#sampleTable').bootstrapTable('refresh', null);
							swal("任务新增成功");
							showAddTaskModal();
							$("#addTaskModal").modal('hide');
						} else
							swal("","任务新增失败","error");
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
		swal("出厂编号不能为空");
		return false;
	}
	if (data.sampleName == "" || data.sampleName == "null") {
		swal("样品名称不能为空");
		return false;
	}
	if (data.departmentID == "" || data.departmentID == "null") {
		swal("科室不能为空");
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
	if(obj.contractType == "0"){
	param.testProjects = getTestProjectID();
	console.log(param.testProject);
	}
	param.type = $("input[name='editTaskType']").val();
	param.departmentID = $("#editDepartment").val();
	param.unit = $("#editUnit").val();
	param.require = $("#editAskFor").val();
	param.reID = obj.reID;
	param.state = "edit";
	console.log(param);
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
							swal("编辑任务成功");
							$('#sampleTable').bootstrapTable('refresh', null);
						} else
							swal("","编辑任务失败","error");
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
						swal("","文件更新失败","error");
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
	swal({
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
							
							swal({
								title:"文件删除成功",
								type:"success",
								timer:100
								});
						} else {
							swal("","文件删除失败 ","error");
						}
					},
					error : function() {
						swal("","文件删除失败","error");
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
	swal({
		  title: "Are you sure?",
		  text: "是否删除任务！",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否",
		  closeOnConfirm:false
		
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
							swal("任务删除成功 ");
						} else {
							swal("","任务删除失败","error");
						}
						$('#sampleTable').bootstrapTable('refresh', null);
					},
					error : function() {
						swal("","任务删除失败","error");
						return false;
					}
				});
				
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

//搜索展示检测项目列表
function searchTestProject(type){
	fullTestProjects(matchTestProject(type));
}
//匹配检测项目  返回数据
function matchTestProject(type){
//	$('.showTestProjects[name = "add"]').css("display","block");
	var matchName = $('#'+type+'searchTestProjects').val();
	console.log(matchName);
	console.log(obj.coID);
	var data;
	$.ajax({
		url : '/laboratorySystem/testProjectController/getTestProjectListByName.do',
		dataType : "json",
		async : false,
		data : {
			matchName:matchName,
			contractID:obj.coID
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
//填充检测数据
function fullTestProjects(testProjectDate){
	
	var html = "<ul onclick='displayChecked(event)'>";
	if(testProjectDate.length == 0){
		html += "<li class='noDate'>没有查到数据</li>";
	}
	else{
		for(var i = 0; i < testProjectDate.length; i++){
			html+="<li  id ='"+testProjectDate[i].ID+"' >" + testProjectDate[i].testName+ "</li>"
		}
	}
	html +="</ul>";
	if($("#editTaskModal").is(":visible")){
		$('.showTestProjects[name = "edit"]').html(html);
		$('.showTestProjects[name = "edit"]').show();
	}
	if($("#addTaskModal").is(":visible")){
		$('.showTestProjects[name = "add"]').html(html);
		$('.showTestProjects[name = "add"]').show();
	}
}
//展示被选中的检测项目
function displayChecked(event){
    var source = EventUtil.getSource(event);
    var testName = $(source).text();
    EventUtil.stopPropagation(event);
	if(isSameID(source.id)){
		html='<span class = "spanTag"><span class= "singleE" id ="'+source.id+'" >'+ testName +'&nbsp;&nbsp;</span><a  onclick="moveSingleE(this)">x</a></span>'
		if($("#editTaskModal").is(":visible")){
			$('#displayChecked[name = "edit"]').append(html);
			$('.showTestProjects[name = "edit"]').hide();
		}
		if($("#addTaskModal").is(":visible")){
			$('#displayChecked[name = "add"]').append(html);
			$('.showTestProjects[name = "add"]').hide();
		}
	}
	else{
		swal("请不要重复选中同一检测项目方法");
	}
}
//检测是否有重复的ID检测项目
function isSameID(checkID){
	var allTestProjectIDs ;
	if($("#editTaskModal").is(":visible")){
		  allTestProjectIDs =$('#displayChecked[name= "edit"] span.singleE');
	}
	if($("#addTaskModal").is(":visible")){
		  allTestProjectIDs =$('#displayChecked[name= "add"] span.singleE');
	}
	if(allTestProjectIDs.length == 0){
		return true;
	}
	else{
		for(var i=0;i<allTestProjectIDs.length;i++){
			if(allTestProjectIDs[i].id === checkID){
				return false;
			}
		}
		return true;
	}
	
}
function moveSingleE(SingleEInfo){
	console.log(SingleEInfo);
	$(SingleEInfo).parent().remove();
}
//获取所有被选中检测项目的id
function getTestProjectID(){
	var total = "" ;
	var allTestprojectIDs ;
	if($("#editTaskModal").is(":visible")){
		allTestprojectIDs =$('#displayChecked[name= "edit"] span.singleE');
	}
	if($("#addTaskModal").is(":visible")){
		allTestprojectIDs =$('#displayChecked[name= "add"] span.singleE');
	}
	if(allTestprojectIDs.length == 0){
		//swal("请至少选中一个检测项目");
		return;
	}
	else if(allTestprojectIDs.length == 0){
		total += allTestprojectIDs[i].id;
	}
	else{
		for(var i=0;i<allTestprojectIDs.length;i++){
			total += allTestprojectIDs[i].id+",";
		}
		return total;
	}
}