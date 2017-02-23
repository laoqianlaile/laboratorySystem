// 请求数据时的额外参数
var param = {};

$(function() {
	$("#table").bootstrapTable({
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'ID',// 定义排序列
		sortOrder : 'ASC',// 定义排序方式
		url : 'testReportController/getTestReporThirdtAuditWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			return param;
		},
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			width :'1%'// 宽度
		},{
			field : 'ID',// 返回值名称
			title : '检测报告ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			visible : false
		},{
			field : 'taskID',// 返回值名称
			title : '任务ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			visible : false
		},{
			field : 'receiptlistCode',// 返回值名称
			title : '交接单号',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			
		},{
			field : 'fileID',// 返回值名称
			title : '文件ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			visible : false
	    },{
			field : 'fileName',// 返回值名称
			title : '报告名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '20%',// 宽度
		},{
			field : 'versionNumber',// 返回值名称
			title : '报告版本',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '5%'// 宽度
		},{
			field : 'companyName',// 返回值名称
			title : '委托单位',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :'15%'// 宽度
		},{
			field : 'uploadTime',// 返回值名称
			title : '上传时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		},{
			field : 'state',// 返回值名称
			title : '审核状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			formatter : function(value, row, index) {
				if (value == "二审未通过" || value == "三审未通过") {
					return "<p style='color:#CC3300;margin-top:15px'>" + value + " </p>";
				}else{
					return value;
				}
			}
		},{
			field : 'remarks',// 返回值名称
			title : '备注',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '20%'// 宽度
		},{
			title : '操作',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			formatter : function(value, row, index) {
						return "<span  onclick='thirdAuditPass(\""+row.ID+"\",\""+row.taskID+"\",\""+row.fileName+"\")'   title='通过审核' class='glyphicon glyphicon-ok-sign' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></span> "
					+"<span  onclick='thirdAuditReject(\""+row.ID+"\",\""+row.taskID+"\",\""+row.fileName+"\")'   title='驳回检测报告' class='glyphicon glyphicon-remove' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></span> ";
					
			}
		}]
	});
});

// 查询
function search() {
	var additionalCondition = {
		receiptlistCode : $.trim($('#transitreceiptNumber').val()),
		client : $.trim($('#client').val()),
		reportName : $.trim($('#reportName').val()),
		beginTime : $.trim($('#beginTime').val()),
		endTime : $.trim($('#endTime').val()),
	};
	$('#table').bootstrapTable('refresh', {
		silent : true,
		url : "testReportController/getTestReporThirdtAuditWithPaging.do",
		query : additionalCondition
	});
}

// 下载文件
function filelDown() {
	var rows = $('#table').bootstrapTable('getSelections');
	if (rows.length == 0) {
		alert("请选择一个或多个文件下载");
		return;
	}
	if (rows.length == 1) {
		var fileID = rows[0].fileID;
		downOneFile(fileID);
		return;
	} else {
		var ids = [];
		var fileIDs = [];
		for ( var i = 0; i < rows.length; i++) {
			ids.push(rows[i].fileID);
		}
		fileDownAll(ids);
	}
	refresh();
}

// 查看检测报告
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
			window.location.href = "module/jsp/testReportManage/testReportView.jsp?testReportID="
					+ testReportID;
		}
	}
}

// 三审通过
function thirdAuditPass() {
	var keyID = arguments[0];
	var taskID = arguments[1];
	var fileName = arguments[2];
	if (confirm("是否通过审核?")) {
		$.post("testReportController/thirdPassReport.do",
						{
							ID : keyID,
							taskID : taskID
						},
						function(result) {
							if (result == true || result == "true") {
								alert("审核通过成功");
								$.post("messageController/addReportThirdAuditPassMessage.do",
												{
													fileName : fileName
												},
												function(result) {
													var re = new RegExp("\"","g");
													result = result.replace(re,"");
													$.post("messageNoticeController/addReportAuditMessageNotice.do",
																	{
																		messageID : result,
																		testreportID : keyID
																	});
												});
							} else {
								alert("通过审核失败");
							}
							refresh();
						});
	}
}

// 三次审核驳回
function thirdAuditReject() {
	var keyID = arguments[0];
	var taskID = arguments[1];
	var fileName = arguments[2];
	$("#testReportID").text(keyID);
	$("#taskID").text(taskID);
	$("#fileName").text(fileName);
	$("#thirdAuditRejectModal").modal("show");
}

// 确认驳回
function thirdAuditRejectSure() {
	var keyID = $("#testReportID").text();
	var taskID = $("#taskID").text();
	var fileName = $("#fileName").text();
	$.post("testReportController/thirdRejectReport.do",
					{
						ID : keyID,
						taskID : taskID,
						dismissreason : $("#rejectReason").val()
					},
					function(result) {
						if (result == true || result == "true") {
							refresh();
							alert("驳回成功");
							$.post("messageController/addReportThirdAuditRejectMessage.do",
											{
												fileName : fileName
											},
											function(result) {
												var re = new RegExp("\"", "g");
												result = result.replace(re, "");
												$.post("messageNoticeController/addReportAuditMessageNotice.do",
																{
																	messageID : result,
																	testreportID : keyID
																});
											});
						} else {
							refresh();
							alert("驳回失败");
						}
					});
	$("#thirdAuditRejectModal").modal("hide");
}

// 刷新页面
function refresh() {
	var additionalCondition = {
		receiptlistCode : "",
		client : "",
		reportName : "",
		beginTime : "",
		endTime : "",
	};
	$("#table").bootstrapTable('refresh', {
		silent : true,
		url : "testReportController/getTestReporThirdtAuditWithPaging.do",
		query : additionalCondition
	});
}