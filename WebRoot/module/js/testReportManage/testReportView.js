$(function() {
	var ID = getUrlParam("testReportID");
	$.post("testReportController/getCilentInfo.do", {
		testReportID : ID
	}, function(result) {
		result = JSON.parse(result);
		if (result != null && result != "null" && result != "") {
			$("#schFactoryCode").text(result[0].receiptlistCode);
			$("#clientCompany").text(result[0].companyname);
			$("#clientPerson").text(result[0].linkman);
			$("#clientTime").text(result[0].createTime);
			$("#finishTime").text(result[0].completeTime);
			$("#contactNumber").text(result[0].linkPhone);
			$("#contactAddress").text(result[0].address);
			$("#isClassified").text(result[0].isClassified);
			$("#secretLevel").text(result[0].classifiedLevel);
			$("#accordingInfo").text(result[0].requires);
		}
	});
	
	$("#sampleInfoTable").bootstrapTable({
		striped : true,// 隔行变色效果
     	pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
    	sortName : 'ID',// 定义排序列
    	sortOrder : 'DESC',// 定义排序方式
		url : 'testReportController/getSampleInfoWithPaging.do',// 服务器数据的加载地址
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
			field : 'factoryCode',// 返回值名称
			title : '出厂编号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "19%"// 宽度
		},{
			field : 'sampleName',// 返回值名称
			title : '名称',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "20%",// 宽度
		},{
			field : 'specifications',// 返回值名称
			title : '型号/规格/代号',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "20%",// 宽度
		},{
			field : 'testProjectName',// 返回值名称
			title : '检测/校准项目',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "20%",// 宽度
		},{
			field : 'employeeName',// 返回值名称
			title : '检测/校准人',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "20%",// 宽度
		}]
	});
	
	// 请求数据时的额外参数
	function queryParams(){
		var searchCondition = {
			limit : 5,
			offset : 0,
			sort : 'ID',
			order : 'asc',
			testReportID :ID
		};
	    return searchCondition;
	}
	
	// 得到检测报告对应文件的信息
	$("#testReportFile").bootstrapTable({
		striped : true,// 隔行变色效果
     	pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
    	sortName : 'ID',// 定义排序列
    	sortOrder : 'DESC',// 定义排序方式
		url : 'testReportController/getTestReportFileInfoWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams : search,
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		columns : [ {
			checkbox : true,
			width :"1%",// 宽度
			formatter : function(value, row, index) {
					 checkData(row);	 // 验证数据合理性
			  }
		},{
			field : 'ID',// 返回值名称
			title : '检测报告ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			visible : false
		},{
			field : 'fileID',// 返回值名称
			title : '文件ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			visible : false
		},{
			field : 'taskID',// 返回值名称
			title : '任务ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			visible : false
		},{
			field : 'fileName',// 返回值名称
			title : '文件名',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '12%'// 宽度
		}, {
			field : 'uploadTime',// 返回值名称
			title : '上传时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '12%'// 宽度
		}, {
			field : 'versionNumber',// 返回值名称
			title : '版本号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		}, {
			field : 'versionInformation',// 返回值名称
			title : '版本信息',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '12%'// 宽度
		}, {
			field : 'uploadTime',// 返回值名称
			title : '上传时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '12%'// 宽度
		}, {
			field : 'state',// 返回值名称
			title : '审核状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '12%'// 宽度
		}, {
			field : 'remarks',// 返回值名称
			title : '备注信息',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '12%'// 宽度
		},{
			title : '操作',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%',// 宽度
			formatter : function(value, row, index) {
					return 	"<button type='button' title='下载'  class='btn btn-default' onclick='downTestReport(\""+row.fileID+"\")'>"+
				              "<span class='glyphicon glyphicon-download'>下载</span>"+
					        "</button>&nbsp;"+
					        "<button type='button' title='查看'  class='btn btn-default' onclick='onlineView(\""+row.fileID+"\",\""+row.ID+"\")'>"+
					          "<span class='glyphicon glyphicon-download'>查看</span>"+
					        "</button>&nbsp;"+
					        "<button type='button' title='删除'  class='btn btn-default' onclick='deleteTestReport(\""+row.fileID+"\",\""+row.ID+"\",\""+row.taskID+"\")'>"+
						      "<span class='glyphicon glyphicon-download'>删除</span>"+
					        "</button>"
				}
		}]
	});
		// 请求数据时的额外参数
	function search() {
		var searchCondition = {
			limit : 5,
			offset : 0,
			sort : 'ID',
			order : 'asc',
			testReportID : ID
		};
		return searchCondition;
	}

});

// 下载检测报告
function downTestReport() {
	var fileID = arguments[0];
	downOneFile(fileID);
}

//预览检测报告
function onlineView() {
	var fileID = arguments[0];
	$.post("fileOperateController/onlinePreview.do", {
		ID : fileID
	}, function(result) {
		if (result != null && result != "null") {
			window.location.href = "module/jsp/documentOnlineView.jsp";
		} else {
			alert("无法查看");
		}
	});
}

// 删除检测报告
function deleteTestReport() {
	var fileID = arguments[0];
	var testReportID = arguments[1];
	var taskID = arguments[2];
	if (confirm("确定删除?")) {
		$.post("testReportController/deleteCheck.do", {
			ID : testReportID
		}, function(result) {
			if (result == true || result == "true") {
				deleteFile(fileID);
				$.post("testReportController/deleteOtherTableInfo.do", {
					ID : testReportID,
					taskID : taskID
				});
			} else {
				alert("当前审核状态不能删除");
			}
		});
	}
	refresh();
}

// 获取地址栏的检测报告ID
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	} else {
		return null;
	}
}

// 刷新页面
function refresh() {
	$('#sampleInfoTable').bootstrapTable('refresh', null);
	$('#testReportFile').bootstrapTable('refresh', null);
}

function checkData(dataObj) {
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileID") || dataObj.fileID == null
			|| dataObj.fileID.trim() == "NULL") {
		dataObj.fileID = "";
	}
	if (!dataObj.hasOwnProperty("versionNumber")
			|| dataObj.versionNumber == null
			|| dataObj.versionNumber == undefined) {
		dataObj.versionNumber = ""; 
	}
	if (!dataObj.hasOwnProperty("versionInformation")
			|| dataObj.versionInformation == null
			|| dataObj.versionInformation.trim() == "NULL") {
		dataObj.versionInformation = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null
			|| dataObj.state == undefined) {
		dataObj.state = ""; 
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks.trim() == "NULL") {
		dataObj.remarks = "";
	}
	if (!dataObj.hasOwnProperty("taskID") || dataObj.taskID == null
			|| dataObj.taskID.trim() == "NULL") {
		dataObj.taskID = "";
	}
	if (!dataObj.hasOwnProperty("uploadTime") || dataObj.uploadTime == null
			|| dataObj.uploadTime.trim() == "NULL") {
		dataObj.uploadTime = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null
			|| dataObj.fileName.trim() == "NULL") {
		dataObj.fileName = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null
			|| dataObj.employeeName.trim() == "NULL") {
		dataObj.employeeName = "";
	}
}