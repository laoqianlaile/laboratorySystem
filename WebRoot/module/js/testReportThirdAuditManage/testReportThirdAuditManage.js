// 请求数据时的额外参数
var param = {};

$(function() {
	$("#table").bootstrapTable({
		striped : false,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 10,20 ],// 设置可供选择的页面数据条数
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
			width :'1%',// 宽度
			formatter : function(value, row, index) {
				 checkData(row);	 // 验证数据合理性
		  }
		},{
			field: '',
	        title: '序号',
	        width:'1%',
	        align:'center',
	        valign:'middle',
	        formatter: function (value, row, index) {
	              return index+1;
	        }
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
			width : '9%',// 宽度
			
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
						return "<img src ='module/img/update_icon.png'  onclick='thirdAuditPass(\""+row.ID+"\",\""+row.taskID+"\",\""+row.fileName+"\")'   title='通过审核' style='cursor:pointer;padding-right:8px;'></span> "
					+"<img src ='module/img/forbidden_icon.png' onclick='thirdAuditReject(\""+row.ID+"\",\""+row.taskID+"\",\""+row.fileName+"\")'   title='驳回检测报告'  style='cursor:pointer;padding-right:8px;'></span> ";
					
			}
		}]
	});

});

// 上传图片
function uploadImage(selectorName) {
	$(selectorName).fileupload({
		autoUpload : true,
		url : 'fileOperateController/upload.do?TypeNumber=' + 3,
		dataType : 'text',
		add : function(e, data) {
			$("#ensureUploadImg").click(function() {
				data.submit();
			});
		},
	}).bind('fileuploaddone', function(e, data) {
		var fileID = eval(data.result);
		if (fileID != null && fileID != "null") {
			$.post("employeeController/addSignatrueAndStamp.do", {
				fileID : fileID,
				selectorName : selectorName
			}, function(result) {
				reload();
			});
		}
	});
}

// 查询
function search() {
	var additionalCondition = {
		receiptlistCode : $.trim($('#transitreceiptNumber').val()),
		client : $.trim($('#client').val()),
		reportName : $.trim($('#reportName').val()),
		beginTime : $.trim($('#beginTime').val()),
		endTime : $.trim($('#endTime').val()),
		selectPart : $.trim($('#selectPart').val())
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
		if (testReportID != "") {
			window.location.href = "module/jsp/testReportManage/testReportView.jsp?testReportID="
					+ testReportID;
		}
	}
}

// 三审通过
function thirdAuditPass() {
	var keyID = arguments[0],
	    taskID = arguments[1],
	    fileName = arguments[2],
	    auditPassAgreement = $("#PassReason").val();
	if (confirm("是否通过审核")) {
		$("#PassTestReportID").text(keyID);
		$("#PassTaskID").text(taskID);
		$("#PassFileName").text(fileName);
		$.post("testReportController/thirdAuditOperateCheck.do", {
			ID : keyID
		}, function(result) {
			if (result == true || result == "true") {
				$("#PassReason").val("");
				uploadImage("#singnatureImg");
				uploadImage("#stampImg");
				$("#thirdAuditPassModal").modal("show");
			} else {
				alert("当前报告不允许设置审核通过");
			}
		});
	}
}

// 上传图片
function previewImage(file,imgArea)
{	  
	  if (file.files && file.files[0])
	  {
	      var img = document.getElementById(imgArea);
	      var reader = new FileReader();
	      reader.onload = function(evt)
	      {
	    	  img.src = evt.target.result;
	      }
	      reader.readAsDataURL(file.files[0]);
	  }
	  else //兼容IE
	  {
		  var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
          file.select();
          var src = document.selection.createRange().text;
          var img = document.getElementById(imgArea);
          img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	  }
}

// 确认审核通过
function thirdAuditPassSure(){
	var keyID = $("#PassTestReportID").text(),
	    taskID = $("#PassTaskID").text(),
	    fileName = $("#PassFileName").text(),
	    auditPassAgreement = $("#PassReason").val();
	$.post("testReportController/thirdPassReport.do",
			{
				ID : keyID,
				taskID : taskID,
				passAgreement : auditPassAgreement
			},
			function(result) {
				if (result == true || result == "true") {
					refresh();
					$("#thirdAuditPassModal").modal("hide");
					$.post("messageController/addReportThirdAuditPassMessage.do",
									{
										fileName : fileName
									},
									function(result) {
										result = eval(result);
										$.post("messageNoticeController/addReportAuditMessageNotice.do",
														{
															messageID : result,
															testreportID : keyID
														});
									});
					setTimeout(reloadPage,1000);
					alert("审核通过成功");
				} else {
					refresh();
					alert("通过审核失败");
				}
			});
	
	
}

//重新加载页面
function reloadPage() {
	window.location.reload();
}


// 三次审核驳回
function thirdAuditReject() {
	var keyID = arguments[0],
	    taskID = arguments[1],
	    fileName = arguments[2];
	if (confirm("是否驳回报告")) {
		$("#testReportID").text(keyID);
		$("#taskID").text(taskID);
		$("#fileName").text(fileName);
		$.post("testReportController/thirdAuditOperateCheck.do", {
			ID : keyID
		}, function(result) {
			if (result == true || result == "true") {
				$("#rejectReason").val("");
				$("#thirdAuditRejectModal").modal("show");
			} else {
				alert("当前报告不允许驳回审核");
			}
		});
	}
}

// 确认驳回
function thirdAuditRejectSure() {
	var keyID = $("#testReportID").text(),
	    taskID = $("#taskID").text(),
	    fileName = $("#fileName").text();
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

//刷新页面
function refresh() {
	var additionalCondition = {
		receiptlistCode : "",
		client : "",
		reportName : "",
		beginTime : "",
		endTime : "",
		selectPart : "",
	};
	$("#table").bootstrapTable('refresh', {
		silent : true,
		url : "testReportController/getTestReporThirdtAuditWithPaging.do",
		query : additionalCondition
	});
}

// 重新加载页面
function reload() {
	window.location.reload();
}

//检查数据合理性
function checkData(dataObj) {
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("taskID") || dataObj.taskID == null
			|| dataObj.taskID.trim() == "NULL") {
		dataObj.taskID = "";
	}
	if (!dataObj.hasOwnProperty("receiptlistCode")
			|| dataObj.receiptlistCode == null
			|| dataObj.receiptlistCode == undefined) {
		dataObj.receiptlistCode = "";
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
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null
			|| dataObj.companyName.trim() == "NULL") {
		dataObj.companyName = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null
			|| dataObj.fileName.trim() == "NULL") {
		dataObj.fileName = "";
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