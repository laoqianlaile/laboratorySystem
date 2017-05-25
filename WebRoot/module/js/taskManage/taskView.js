var param = {
	taskID : ""
};

$(function() {
	var ID = getUrlParam("taskID"); 		
	
	// 获取所有的检测项目信息
	$.post("testProjectController/getAllTestProject.do",
			function(result) {
				result = JSON.parse(result);
				if (result != null && result != "null" && result != "") {
					var htmlElement = "";
					for ( var i = 0,len = result.length;i <len ; i++) {
						htmlElement += "<div class='col-xs-4 col-md-4 col-lg-4'>"
			                        	+ "<input type='checkbox' name='testproject" + i + "' id='testproject" + i + "' value=" + result[i].ID + ">" 
			                        	+ "<label for='testproject" + i + "' >"
				                        +  result[i].testprojectName 
				                        + "</label>" 
				                        + "</div>";
					}
					$(".testprojectList").append(htmlElement);
				}
			});
	
	getTaskTestprojectID(ID);
	
	// 获取设备的信息
	$.post("equipmentController/getEquipmentInfo.do",
			function(result) {
				result = JSON.parse(result);
				if (result != null && result != "null" && result != "") {
					var htmlElement = "";
					for ( var i = 0,len = result.length;i <len ; i++) {
						htmlElement += "<div class='col-xs-4 col-md-4 col-lg-4'>"
			                        	+ "<input type='checkbox' name='equipment" + i + "' id='equipment" + i + "' value=" + result[i].ID + ">" 
			                        	+ "<label for='equipment" + i + "' >"
				                        +  result[i].equipmentInfo 
				                        + "</label>" 
				                        + "</div>";
					}
					$(".equipmentList").append(htmlElement);
				}
			});

	getTaskEquipmentID(ID);
	
	$.post("taskController/checkTaskClientInfo.do", {
		taskID : ID
	}, function(result) {
		result = JSON.parse(result);
		result = checkTaskData(result[0]);
		$("#schFactoryCode").text(result.receiptlistCode);
		$("#clientCompany").text(result.companyName);
		$("#clientPerson").text(result.linkMan);
		$("#clientTime").text(result.createTime);
		$("#finishTime").text(result.completeTime);
		$("#contactNumber").text(result.linkPhone);
		$("#contactAddress").text(result.address);
		$("#isClassified").text(result.isClassified);
		$("#secretLevel").text(result.classifiedLevel);
		$("#accordingInfo").text(result.requires);

	});
	
	$.post("taskController/getSampleManageInfo.do", {
		taskID : ID
	}, function(result) {
		result = JSON.parse(result);
		if (result != null && result != "null" && result != "") {
			$("#sampleManage").text(result[0].employeeName);
			$("#sampleCreateTime").text(result[0].createTime);
		}
	});
	
	// 获取样品相关信息
	$("#sampleInfoTable").bootstrapTable({
		striped : false,// 隔行变色效果
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
		queryParams : function queryParams(params) { // 请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.taskID = ID;
			return param;
		},
		queryParamsType : "limit",
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			width : "1%",// 宽度
			formatter : function(value, row, index) {
				checkSampleData(row); // 验证数据合理性
			}
		}, {
			field : '',
			title : '序号',
			width : '1%',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {
				return index + 1;
			}
		}, {
			field : 'ID',// 返回值名称
			title : '任务ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			visible : false
		}, {
			field : 'factoryCode',// 返回值名称
			title : '出厂编号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "18%",// 宽度
		}, {
			field : 'sampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "20%",// 宽度
		}, {
			field : 'specifications',// 返回值名称
			title : '型号/规格/代号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "20%",// 宽度
		}, {
			field : 'testProjectName',// 返回值名称
			title : '检测/校准项目',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "20%",// 宽度
		}, {
			field : 'detectstate',// 返回值名称
			title : '检测状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "20%",// 宽度
		} ]
	});

	// 请求数据时的额外参数
	function queryParams() {
		var searchCondition = {
			limit : 5,
			offset : 0,
			sort : 'ID',
			order : 'DESC',
			taskID : ID
		};
		return searchCondition;
	}

	param.taskID = ID;

	
	// 得到任务对应文件的信息
	$("#taskFile")
			.bootstrapTable(
					{
						striped : false,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 5,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 5, 10 ],
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
												// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'uploadTime',// 定义排序列
						sortOrder : 'DESC',// 定义排序方式
						url : 'fileInformationController/getFileInTaskViewWithPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						contentType : 'application/json',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : function queryParams(params) { // 请求服务器数据时,添加一些额外的参数
							param.limit = params.limit;// 页面大小
							param.offset = params.offset; // 偏移量
							param.sort = params.sort; // 排序列名
							param.order = params.order; // 排位方式
							return param;
						},
						queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
						columns : [
								{
									checkbox : true,
									width : "1%",// 宽度
									formatter : function(value, row, index) {
										checkFileData(row); // 验证数据合理性
									}
								},
								{
									field : '',
									title : '序号',
									width : '1%',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row, index) {
										return index + 1;
									}
								},
								{
									field : 'ID',// 返回值名称
									title : '文件ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '25%',// 宽度
									visible : false
								},
								{
									field : 'fileName',// 返回值名称
									title : '文件名',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '24%'// 宽度
								},
								{
									field : 'uploadTime',// 返回值名称
									title : '上传时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '25%'// 宽度
								},
								{
									field : 'remarks',// 返回值名称
									title : '备注',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '25%'// 宽度
								},
								{
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%",// 宽度
									formatter : function(value, row, index) {
										return "<img src ='module/img/download_icon.png' title='下载'  onclick='fileDown(\""
												+ row.ID
												+ "\")' style='cursor:pointer;'>"
												+ "</img>";
									}
								} ]
					});
	uploadFile();
});

// 获取任务所选择的检测项目
function getTaskTestprojectID() {
	var ID = arguments[0];
	$.post("taskController/getTestprojectOfTask.do", 
	{
		taskID : ID
	}, function(result) {
		result = JSON.parse(result);
		for ( var i = 0, len = result.length; i < len; i++) {
			$(".testprojectList input[type=checkbox]").each(function() {
				if (result[i].ID == $(this).val()) {
					$(this).attr("checked", "checked");
				}
			});
			continue;
		}
	});
}

// 获取任务所登记的设备ID
function getTaskEquipmentID() {
	var ID = arguments[0];
	$.post("taskEquipmentController/getTaskEquipmentID.do", 
	{
		taskID : ID
	}, function(result) {
		result = JSON.parse(result);
		for ( var i = 0, len = result.length; i < len; i++) {
			$(".equipmentList input[type=checkbox]").each(function() {
				if (result[i].equipmentID == $(this).val()) {
					$(this).attr("checked", "checked");
				}
			});
			continue;
		}
	});
}

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

// 初始化上传文件的方法
function uploadFile() {
	$("#files").fileupload({
		autoUpload : true,
		url : 'fileOperateController/upload.do',
		dataType : 'json',
		add : function(e, data) {
			$("#ensureUpload").click(function() {
				data.submit();
			});
		},
	}).bind('fileuploaddone', function(e, data) {
		var fileID = JSON.parse(data.result);
		var ID = param.taskID;
		if (fileID != null && fileID != "null" && fileID != "") {
			$.post("taskController/setTaskDetectState.do", 
			{
				taskID : ID
			}, 
			function(result) {
				if (result == true || result == "true") {
					$.post("taskController/setTestReportInfo.do", 
					{
						taskID : ID,
						remarks : $.trim($("#remarksInfo").val())
					}, function(result) {
						reload();
					});
				}
			});
		}
	});

	// 文件上传前触发事件
	$('#files').bind('fileuploadsubmit', function(e, data) {
		data.formData = {
			filePath : param.path,
			TypeNumber : param.type,
			belongtoID : param.taskID,
			firstDirectory : param.firstDirectory,
			remark : param.fileSummaryInfo
		};
	});
}

// 检测项目登记
function testProjectRegister() {
	$("#testprojectInfo").modal("show");
}

// 设备登记
function equipmentRegister() {
	$("#equipmentInfo").modal("show");
}

// 确认登记的检测项目 
function registTestprojectSure() {
	var testprojectChooseArray = [],
	testprojectArray = [], 
	temporary = [];
	ID = param.taskID;
	$(".testprojectList input[type=checkbox]").each(function() { // 遍历已选中的选项
		if (this.checked) {
			testprojectChooseArray.push($(this).val());
		}
	});
	$.post("taskController/getTestprojectOfTask.do",
	{
		taskID : ID
	},
	function(result) {
		result = JSON.parse(result);
		var testprojectChooseLen = testprojectChooseArray.length;
		var resultLen = result.length
		if(testprojectChooseLen == resultLen && testprojectChooseLen == 0) {
			refresh();
			alert("没有登记的检测项目");
		} else {
			for (var index = 0; index < resultLen; index++) {  // 原来登记的检测项目保存到一个数组中
				temporary.push(result[index].ID);
				}
			if(result.length === 0) {
				for (var k = 0, len = testprojectChooseLen; k < len; k++) {
					testprojectArray.push(testprojectChooseArray[k]); // 如果没有登记检测项目，直接添加到testprojectArray
					}
				alterTestproject(testprojectArray);
			} else {
				if(testprojectChooseLen > resultLen) { // 保存新添加的设备
					for (var i = 0, tArryLen = testprojectChooseLen; i < tArryLen; i++) { // 去除已登记的检测项目
						if ($.inArray(testprojectChooseArray[i], temporary) == -1) {
							testprojectArray.push(testprojectChooseArray[i]);
						}
					}
					alterTestproject(testprojectArray);
				} else {
					$.ajax({
						url : 'taskController/deleteTaskTestproject.do',
						type : 'POST',
						data : {
							testprojectIDs : temporary,
						},
						traditional : true,
						success : function(result) {
							result = JSON.parse(result);
							if(result == false || result == "false") {
								alert("修改登记检测项目出错");
							} else {
								alterTestproject(testprojectChooseArray); // 登记修改过后新检测项目
							}
						}
					});
				}
			}
		}		
	});
}

// 修改登记的检测项目
function alterTestproject(testprojectArray) {
	$.ajax({
		url : 'taskController/saveTaskTestproject.do',
		type : 'POST',
		data : {
			taskID : ID,
			testprojectIDs : testprojectArray
		},
		traditional : true,
		success : function(result) {
			result = JSON.parse(result);
			if (result == true || result == "true") {
				getTaskTestprojectID();
				$("#testprojectInfo").modal("hide");
				refresh();
				alert("检测项目登记或修改成功");
			} else {
				refresh();
				alert(result);
			}
		}
	});
}

// 确定登记的设备
function sure() {
	var equipmentChooseArray = [],
	 	equipmentArray = [], 
		temporary = [];
		ID = param.taskID;
	$(".equipmentList input[type=checkbox]").each(function() { // 遍历已选中的选项
		if (this.checked) {
			equipmentChooseArray.push($(this).val());
		}
	});
	$.post("taskEquipmentController/getTaskEquipmentID.do",
	{
		taskID : ID
	},
	function(result) {
		result = JSON.parse(result);
		var equipmentChooseLen = equipmentChooseArray.length;
		var resultLen = result.length
		if(equipmentChooseLen == resultLen) {
			alert("没有新登记的设备");
		} else {
			for (var index = 0; index < resultLen; index++) {  // 原来登记的设备保存到一个数组中
				temporary.push(result[index].equipmentID);
				}
			if(result.length === 0) {
				for (var k = 0, len = equipmentChooseArray.length; k < len; k++) {
					equipmentArray.push(equipmentChooseArray[k]); // 如果没有登记设备，直接添加到equipmentArray
					}
				alterEquipment(equipmentArray);
			} else {
				if(equipmentChooseLen > resultLen) { // 保存新添加的设备
					for (var i = 0, eArryLen = equipmentChooseArray.length; i < eArryLen; i++) { // 去除已登记的设备
						if ($.inArray(equipmentChooseArray[i], temporary) == -1) {
							equipmentArray.push(equipmentChooseArray[i]);
						}
					}
					alterEquipment(equipmentArray);
				} else {
					$.ajax({
						url : 'taskEquipmentController/deleteTaskEquipmentID.do',
						type : 'POST',
						data : {
							taskIDs : temporary,
						},
						traditional : true,
						success : function(result) {
							result = JSON.parse(result);
							if(result == false || result == "false") {
								alert("修改登记设备失败");
							} else {
								alterEquipment(equipmentChooseArray); // 登记修改过后新设备
							}
						}
					});
				}
			}
		}		
	});
	
}

// 修改登记设备
function alterEquipment(equipmentArray) {
	$.ajax({
		url : 'taskEquipmentController/saveTaskEquipment.do',
		type : 'POST',
		data : {
			taskID : ID,
			equipmentIDs : equipmentArray
		},
		traditional : true,
		success : function(result) {
			result = JSON.parse(result);
			if (result == true || result == "true") {
				getTaskEquipmentID();
				$("#equipmentInfo").modal("hide");
				alert("设备登记或修改成功");
				
			} else {
				alert(result);
			}
		}
	});
}

// 下载报告模版
function downReportTemplate() {
	var ID = getUrlParam("taskID");
	$.post("taskController/getFileIdOfTask.do", 
	{
		taskID : ID
	}, 
	function(fileID) {
		fileID = JSON.parse(fileID);
		if (fileID == null || fileID == "null" || fileID == "") {
			$.post("taskController/getTestprojectOfTask.do", 
			{
				taskID : ID
			},
			function(result) {
				result = JSON.parse(result);
				if (result == null || result == "null" || result == "") {
					alert("生成报告前请先登记检测项目");
				} else {
					$.post("taskController/downReportTemplate.do", 
					{
						taskID : ID
					},
					function(fileID) {
						fileID = JSON.parse(fileID);
						if (fileID != null && fileID != "null" && fileID != "") {
							refresh();
							downOneFile(fileID);
						} else {
							alert("下载出错,请确定模版是否上传或系统是否正常允许");
						}
					});
				}
			});
		} else {
			downOneFile(fileID);
		}
	});
}

// 检查文件类型
function checkFile(o) {
	$("#chooseFile").attr("disabled", "disabled");
	var filePath = $(o).val();
	if (filePath != "" && filePath != undefined) {
		var arr = filePath.split('\\');
		var fileName = arr[arr.length - 1];
		$("#fileName").html(fileName);
	}
	if (o.value.indexOf('.doc') < 0 && o.value.indexOf('.docx') < 0) {
		alert("不能将此类型文档作为检测报告上传");
	}
} 

// 上传报告
function uploadTestReport() {
	var ID = param.taskID;
	$.post("taskController/recoverFileCheck.do", {
		taskID : ID
	}, function(result) {
		if (result == true || result == "true") {
			$("#chooseFile").removeAttr("disabled");
			$("#fileName").html("");
			param.path = "";
			param.type = 2;
			param.firstDirectory = "报告文件";
			param.fileSummaryInfo = $.trim($("#fileSummaryInfo").val());
			$("#uploadReport").modal("show");
		} else {
			alert("当前审核状态不可以上传报告");
		}
	});
}

// 查看报告
function onlineViewReport() {
	displayDiv();
	var taskID = getUrlParam("taskID");
	$.post("taskController/getReportFileID.do", 
	{
		taskID : taskID
	}, 
	function(result) {
		result = JSON.parse(result);
		if(result != null && result != "null" && result != ""){
			var fileID = result[0].ID;
			$.post("fileOperateController/onlinePreview.do", 
			{
				ID : fileID
			}, function(result) {
				result = JSON.parse(result);
				if(result != null && result != "null" && result != ""){
					window.location.href = "module/jsp/documentOnlineView.jsp";
				} else {
					hideDiv();
					alert("无法查看");
				}
			});
		} else {
			hideDiv();
			alert("无法查看");
		}
	});
}

// 提交审核
function submitReport() {
	if (confirm("确定要提交审核?")) {
    var taskID = getUrlParam("taskID");
    $.post("taskController/submitReport.do",
    {
    	taskID : taskID
    },
    function(result) {
    	if (result == true || result == "true") {
    		$.post("testReportController/getReportInfo.do",
    		{
    			taskID : taskID
    		},function(result) {
    			result = JSON.parse(result);
    			if(result != null && result != "null" && result != ""){
    				$.post("messageController/addReportAudiPersontMessage.do",
    				{
    					fileName : result[0].fileName
    			    },
    			    function(messageID) {
    			    	messageID = JSON.parse(messageID);
    			    	$.post("messageNoticeController/addReportAuditMessageNotice.do",
    					{
    			    		messageID : messageID,
    			    		employeeID : result[0].levelTwo
    			    		});
    			    	});
    				}
    			});
    			refresh();
    			alert("提交审核成功");
    			} else {
    				refresh();
    				alert("当前状态不能提交审核!请核对报告审核状态或者指定审核人");
    				}
    		});
    }
}
				
// 下载
function fileDown() {
	var fileID = arguments[0];
	downOneFile(fileID);
}

// 返回
function turnBack() {
	window.history.back(-1);
}

// 重新加载页面
function reload() {
	window.location.reload();
}

// 刷新
function refresh() {
	$("#taskFile").bootstrapTable("refresh", null);
	$("#sampleInfoTable").bootstrapTable("refresh", null);
}

// 检查任务数据
function checkTaskData(dataObj) {
	if (!dataObj.hasOwnProperty("receiptlistCode")
			|| dataObj.receiptlistCode == null
			|| dataObj.receiptlistCode.trim() == "NULL") {
		dataObj.receiptlistCode = "";
	}
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null
			|| dataObj.companyName.trim() == "NULL") {
		dataObj.companyName = "";
	}
	if (!dataObj.hasOwnProperty("linkMan") || dataObj.linkMan == null
			|| dataObj.linkMan == undefined) {
		dataObj.linkMan = "";
	}
	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null
			|| dataObj.createTime.trim() == "NULL") {
		dataObj.createTime = "";
	}
	if (!dataObj.hasOwnProperty("completeTime") || dataObj.completeTime == null
			|| dataObj.completeTime.trim() == "NULL") {
		dataObj.completeTime = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null
			|| dataObj.linkPhone.trim() == "NULL") {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("address") || dataObj.address == null
			|| dataObj.address.trim() == "NULL") {
		dataObj.address = "";
	}
	if (!dataObj.hasOwnProperty("isClassified") || dataObj.isClassified == null
			|| dataObj.isClassified.trim() == "NULL") {
		dataObj.isClassified = "";
	}
	if (!dataObj.hasOwnProperty("classifiedLevel")
			|| dataObj.classifiedLevel == null
			|| dataObj.classifiedLevel.trim() == "NULL") {
		dataObj.classifiedLevel = "";
	}
	if (!dataObj.hasOwnProperty("requires") || dataObj.requires == null
			|| dataObj.requires.trim() == "NULL") {
		dataObj.requires = "";
	}
	return dataObj;
}

// 检查样品相关数据
function checkSampleData(dataObj) {
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null
			|| dataObj.factoryCode.trim() == "NULL") {
		dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("sampleName") || dataObj.sampleName == null
			|| dataObj.sampleName == undefined) {
		dataObj.sampleName = "";
	}
	if (!dataObj.hasOwnProperty("specifications")
			|| dataObj.specifications == null
			|| dataObj.specifications.trim() == "NULL") {
		dataObj.specifications = "";
	}
	if (!dataObj.hasOwnProperty("returnTime") || dataObj.returnTime == null
			|| dataObj.returnTime.trim() == "NULL") {
		dataObj.returnTime = "";
	}
	if (!dataObj.hasOwnProperty("getMan") || dataObj.getMan == null
			|| dataObj.getMan.trim() == "NULL") {
		dataObj.getMan = "";
	}
	if (!dataObj.hasOwnProperty("getTime") || dataObj.getTime == null
			|| dataObj.getTime.trim() == "NULL") {
		dataObj.getTime = "";
	}
	if (!dataObj.hasOwnProperty("returnMan") || dataObj.returnMan == null
			|| dataObj.returnMan.trim() == "NULL") {
		dataObj.returnMan = "";
	}
	if (!dataObj.hasOwnProperty("testProjectName")
			|| dataObj.testProjectName == null
			|| dataObj.testProjectName.trim() == "NULL") {
		dataObj.testProjectName = "";
	}
	if (!dataObj.hasOwnProperty("detectstate") || dataObj.detectstate == null
			|| dataObj.detectstate.trim() == "NULL") {
		dataObj.detectstate = "";
	}
}

// 检查文件数据
function checkFileData(dataObj) {
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null
			|| dataObj.fileName.trim() == "NULL") {
		dataObj.fileName = "";
	}
	if (!dataObj.hasOwnProperty("uploadTime") || dataObj.uploadTime == null
			|| dataObj.uploadTime == undefined) {
		dataObj.uploadTime = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks.trim() == "NULL") {
		dataObj.remarks = "";
	}
}