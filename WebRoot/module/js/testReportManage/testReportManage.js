var re = new RegExp("\"", "g");
$(function() {
	initData();
});
//初始化数据
function initData(){
	$("#table").bootstrapTable({
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
	//	pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
	//	sortName : 'ID',// 定义排序列
	//	sortOrder : 'DESC',// 定义排序方式
		url : 'testReportController/getTestReportWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams: queryParams, //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			width :"1%"// 宽度
		},{
			field : 'ID',// 返回值名称
			title : '检测报告ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			visible : false
		},{
			field : 'receiptlistCode',// 返回值名称
			title : '交接单号',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			
		},{
			field : 'fileID',// 返回值名称
			title : '文件ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			visible : false
	    },{
			field : 'fileName',// 返回值名称
			title : '报告名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'versionNumber',// 返回值名称
			title : '报告版本',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			field : 'companyName',// 返回值名称
			title : '委托单位',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :"10%"// 宽度
		},{
			field : 'uploadTime',// 返回值名称
			title : '上传时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			field : 'state',// 返回值名称
			title : '审核状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			formatter : function(value, row, index) {
				if (value == "二审未通过" || value == "三审未通过") {
					return "<p style='color:#CC3300;margin-top:15px'>" + value + " </p>";
				} else{
					return value;
				}
			}
		},{
			field : 'dismissreason2',// 返回值名称
			title : '二审意见',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			field : 'dismissreason3',// 返回值名称
			title : '三审意见',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			field : 'remarks',// 返回值名称
			title : '备注',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			title : '操作',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			formatter : function(value, row, index) {
				return "<span  onclick='fileDown(\""+row.ID+"\")'  title='下载报告' class='glyphicon glyphicon-arrow-down' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></span> "
				+"<span  onclick='submitReport(\""+row.ID+"\")'  title='提交审核' class='glyphicon glyphicon-ok-sign' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></span> "
				}
		}]
	});
}

//查询
function search(){
	initData();
	refresh();
}

//请求数据时的额外参数
function queryParams() {
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'ID',
		order : 'desc',
		receiptlistCode : $.trim($('#transitreceiptNumber').val()),
		client : $.trim($('#client').val()),
		reportName : $.trim($('#reportName').val()),
		beginTime : $.trim($('#beginTime').val()),
		endTime : $.trim($('#endTime').val()),
		selectPart : $.trim($('#selectPart').val()),
	};
	return searchCondition;
}
//提交审核
function submitReport() {
	var keyID = arguments[0];
	$.post("testReportController/submitReportCheck.do", {
		ID : keyID
	}, function(result) {
		if (result == true || result == "true") {
			$.post("testReportController/submitReport.do", {
				ID : keyID,
			}, function(result) {
				if (result == true || result == "true") {
					alert("提交成功");
				} else {
					alert("提交失败");
				}
				refresh();
			});
		} else {
			alert("此报告不可提交审核");
			refresh();
		}
	});
}

//重新覆盖
function recover() {
	var rows = $("#table").bootstrapTable('getSelections');
	if (rows.length == 0) {
		alert("请选择需要重新覆盖的文件");
		return;
	}
	if (rows.length > 1) {
		alert("请选择一条数据");
		return;
	}
	else{
		fileUploadInit("#file_upload");
		$("#recoverReport").modal("show");
	}
}

// 确认覆盖
function recoverSure() {
	var fileTurnID;
	var rows = $("#table").bootstrapTable('getSelections');
	if (rows[0].fileID == "" || rows[0].fileID == " " || rows[0].fileID == undefined || rows[0].fileID == null) {
		$.post("testReportController/getProjectName.do", {
			ID : rows[0].ID
		}, function(result) {
			result = JSON.parse(result);
			var secondDirectory = result[0].name;
			fileUpload("#file_upload","", 2,"","项目文件", secondDirectory, "报告文件");
		});
	} else {
		$.post("fileOperateController/getFilesInfo.do", {
			ID : rows[0].fileID
		}, function(result) {
			result = JSON.parse(result);
			if (result == null || result == "null") {
				alert("没有记录");
			} else {
				var path = result[0].path;
				var i = path.lastIndexOf("\\");
				path = path.substring(i + 1, length);
				var type = result[0].type;
				fileUpload("#file_upload",path, type);
			}
		});
	}
	setTimeout(function() {
		$("#recoverReport").modal("hide");
		fileTurnID = fielIdReturn();
		var fileVersionNumber = $("#fileVersionNumber").val();
		var fileVersionInfo = $("#fileVersionInfo").val();
		var fileRemarks = $("#fileRemarks").val();
		$.post("testReportController/updateTestReport.do", {
			ID : rows[0].ID,
			async : "false",
			fileID : fileTurnID[0],
			versionNumber : fileVersionNumber,
			versionInfo : fileVersionInfo,
			remarks : fileRemarks
		}, function(result) {
			if (result == true || result == "true") {
				$.post("testReportController/setFileBelongID.do", {
					ID : rows[0].ID,
					fileID : fileTurnID[0]
				}, function(result) {
					if (result == false || result == "false") {
						alert("未成功设置文件覆盖");
						refresh();
					}
				});
			} else {
				alert("上传失败");
			}
		});
		refresh();
	}, 1500);

}

//查看检测报告
function checkReport() {
	var rows = $("#table").bootstrapTable('getSelections');
	if (rows.length == 0) {
		alert("请选择要查看的检测报告");
		return;
	}
	if (rows.length > 1) {
		alert("请选择一条数据");
		return;
	} else {
		var testReportID = rows[0].ID;
		if (testReportID != null && testReportID != undefined && testReportID != "") {
			window.location.href = "module/jsp/testReportManage/testReportView.jsp?testReportID=" + testReportID;
		}
	}
}

// 下载文件
function fileDown() {
	var keyID = arguments[0];
	$.post("testReportController/getFileID.do", {
		ID : keyID
	},function(result) {
		result = result.replace(re, "");
		if (result == null || result == "null" || result == ""|| result == " ") {
			if (confirm("未找到相应文件，是否下载默认模版")) {
				$.post("testReportController/getTemplateFileID.do", {
					ID : keyID
				}, function(result) {
					result = JSON.parse(result);
					if(result == null || result == undefined || result == "null" || result == ""){
						alert("未找到相应模版");
					}else{
						downOneFile(result[0].fileID);
					}
				});
			}
		} else {
			downOneFile(result);
		}
	});
}

//刷新页面
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}
