$(function() {
	var ID = getUrlParam("taskID");
	$.post("taskController/checkTaskClientInfo.do", {
		taskID : ID
	}, function(result) {
		result = JSON.parse(result);
		if (result != null && result != "null" && result != "") {
			$("#schFactoryCode").text(result[0].receiptlistCode);
			$("#clientCompany").text(result[0].companyName);
			$("#clientPerson").text(result[0].linkMan);
			$("#clientTime").text(result[0].createTime);
			$("#finishTime").text(result[0].completeTime);
			$("#contactNumber").text(result[0].linkPhone);
			$("#contactAddress").text(result[0].address);
			$("#isClassified").text(result[0].isClassified);
			$("#secretLevel").text(result[0].classifiedLevel);
			$("#accordingInfo").text(result[0].requires);
		}
	})
	

	$.post("taskController/getSampleManageInfo.do",{
		taskID : ID
	},function(result){
		result = JSON.parse(result);
		$("#sampleManage").text(result[0].employeeName);
		$("#sampleCreateTime").text(result[0].createTime);
	});
	
	$("#sampleInfoTable").bootstrapTable({
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
     	pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
    	sortName : 'ID',// 定义排序列
    	sortOrder : 'DESC',// 定义排序方式
		url : 'taskController/getSampleInfoWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams: queryParams, //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [{

			checkbox : true,
			width :"1%"// 宽度
		},{
			field : 'ID',// 返回值名称
			title : '任务ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
			visible : false
		},{
			field : 'factoryCode',// 返回值名称
			title : '出厂编号',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		},{
			field : 'sampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		},{
			field : 'specifications',// 返回值名称
			title : '型号/规格/代号',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		},{
			field : 'testProjectName',// 返回值名称
			title : '检测/校准项目',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		},{
			field : 'getMan',// 返回值名称
			title : '领样人',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		},{
			field : 'getTime',// 返回值名称
			title : '领样时间',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		},{
			field : 'returnMan',// 返回值名称
			title : '退样人',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		},{
			field : 'returnTime',// 返回值名称
			title : '退样时间',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		},{
			field : 'detectstate',// 返回值名称
			title : '检测状态',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "11%",// 宽度
		}]
	});
	
	// 请求数据时的额外参数
	function queryParams(){
		var searchCondition = {
			limit : 5,
			offset : 0,
			sort : 'ID',
			order : 'DESC',
			taskID :ID
		};
	    return searchCondition;
	}
	
	// 得到交接单对应文件的信息
	$("#taskFile").bootstrapTable({
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
     	pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
    	sortName : 'ID',// 定义排序列
    	sortOrder : 'DESC',// 定义排序方式
		url : 'fileInformationController/getFileInSampleWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams : search,
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		columns : [ {
			checkbox : true,
			width :"1%"// 宽度
		},{
			field : 'ID',// 返回值名称
			title : '文件ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '25%',// 宽度
			visible : false
		},{
			field : 'fileName',// 返回值名称
			title : '文件名',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '25%'// 宽度
		}, {
			field : 'uploadTime',// 返回值名称
			title : '上传时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '25%'// 宽度
		}, {
			field : 'remarks',// 返回值名称
			title : '备注',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '25%'// 宽度
		},{
			title : '操作',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			formatter : function(value, row, index) {
					return 	"<button type='button' title='下载'   class='btn btn-default' onclick='fileDown(\""+row.ID+"\")'>"+
				   "<span class='glyphicon glyphicon-download'>下载</span>"+
					"</button>"
				}
		}]
	});
	
	// 请求数据时的额外参数
	function search(){
		var searchCondition = {
			limit : 5,
			offset : 0,
			sort : 'uploadTime',
			order : 'DESC',
			taskID :ID
		};
	    return searchCondition;
	}
	
});

// 获取地址栏的任务ID
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	} else {
		return null;
	}
}

//确定登记的设备
function sure() {
	var equipmentArray = [];
	var ID = getUrlParam("taskID");
	$(".equipmentList input[type=checkbox]").each(function(){
	    if(this.checked){
	    	equipmentArray.push($(this).val());
	    }
	});
	$.ajax({
		url : 'taskEquipmentController/saveTaskEquipment.do',
		type : 'POST',
		data : {
			taskID : ID,
			equipmentIDs : equipmentArray
		},
		traditional : true,
		success : function(result) {
			if (result == true || result == "true") {
				alert("设备登记成功");
			} else {
				alert("设备登记失败");
			}
		}
	});
	$("#equipmentInfo").modal("hide");
}

//设备登记
function equipmentRegister(){
	$.post("equipmentController/getEquipmentInfo.do",function(result){
		result = JSON.parse(result);
		if (result != null && result != "null" && result != "") {
			var htmlElement = "";
			for(var i = 0;i<result.length;i++){
				htmlElement += "<div class='col-xs-4 col-md-4 col-lg-4'>"+
				                 "<input type='checkbox' name='equipment' name='equipment' value="+result[i].ID+">"+
				                 "<label>"+result[i].equipmentInfo+"</label>"+
			                	"</div>"
			}
			$(".equipmentList").text("");
			$(".equipmentList").append(htmlElement);
		}
	});
	$("#equipmentInfo").modal("show");	
}

// 上传报告
function uploadTestReport() {
	fileUploadInit("#file_upload");
	var ID = getUrlParam("taskID");
	$.post("taskController/recoverFileCheck.do", {
		taskID : ID
	}, function(result) {
		if (result == true || result == "true") {
			$("#uploadReport").modal("show");
		}else{
			alert("当前审核状态不可以上传报告");
		}
	});
}

// 确定上传
function uploadSure() {
	var ID = getUrlParam("taskID");
	var fileSummaryInfo = $.trim($("#fileSummaryInfo").val());
	var remarksInfo = $.trim($("#remarksInfo").val());
	$.post("taskController/getProjectName.do", {
		taskID : ID
	}, function(result) {
		if (result != null && result != "null" && result != "") {
			result = JSON.parse(result);
			fileUpload("#file_upload", "", 2, ID, "项目文件", result[0].name,"报告文件", "", fileSummaryInfo);
			$.post("taskController/setTaskDetectState.do", {
				taskID : ID
			}, function(result) {
				if (result == false || result == "false") {
					alert("未成功设置上传的检测报报告");
				}
			});
		} else {
			alert("无法上传");
		}
	});
	setTimeout(function() {
		setTestReportInfo(ID,remarksInfo);
	}, 1500);
}

// 添加或更新检测报告信息
function setTestReportInfo() {
	$.post("taskController/setTestReportInfo.do", {
		taskID : arguments[0],
		remarks : arguments[1]
	}, function(result) {
	});
	$("#uploadReport").modal("hide");
	refresh();
}


//提交审核
function submitReport() {
	if (confirm("确定要提交审核?")) {
		$.post("taskController/submitReport.do", {
			taskID : getUrlParam("taskID")
		}, function(result) {
			if (result == true || result == "true") {
				alert("提交审核成功");
			} else {
				alert("当前状态不能提交审核");
			}
			refresh();
		});
	}
}

// 下载
function fileDown() {
	var fileID = arguments[0];
	if (fileID != null && fileID != undefined && fileID != "" && fileID != " ") {
		downOneFile(fileID);
	}
}

//刷新
function refresh(){
	$("#taskFile").bootstrapTable("refresh", null);
	$("#sampleInfoTable").bootstrapTable("refresh", null);
}