var re = new RegExp("\"", "g");
$(function() {
	initData();
});
//初始化数据
function initData(){
	$("#table").bootstrapTable({
		height : 600,// 定义表格的高度
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
				return 	"<button type='button' title='下载报告' class='btn btn-primary glyphicon glyphicon-arrow-down' onclick='fileDown(\""+row.ID+"\")'>"+
				"</button>&nbsp;"+
				
				"<button type='button' title='提交审核' class='btn btn-success glyphicon glyphicon-ok-sign' onclick='submitReport(\""+row.ID+"\")'>"+
			        	"</button>"
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
function queryParams(){
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

//查看信息
function checkReport() {
	var rows = $("#table").bootstrapTable('getSelections');
	if (rows.length == 0) {
		alert("请选择需要提交的文件");
		return;
	}
	if (rows.length > 1) {
		alert("请选择一条数据");
		return;
	} else {
		if(rows[0].ID != null && rows[0].ID != undefined && rows[0].ID !=""){
		var htmlElment = "";
		var modalTitle = "交接单号: " + rows[0].receiptlistCode;
		$("#receiptlistNumber").text("").append(modalTitle);
		$.post("testReportController/checkTask.do", {
			testReportID : rows[0].ID,
		}, function(result) {
			result = JSON.parse(result);
			if (result.length > 0) {
				var result1 = checkTestReportDetail(result[0]);
				htmlElment = "";
		        htmlElment = "<span>委托单位: <strong>" + result1.companyname+ "</strong></span>" + 
			                 "<span>委托人: <strong>" + result1.linkman + "</strong></span>" + 
			                 "<span>委托时间: <strong>" + result1.createTime + "</strong></span>" + 
			                 "<span>完成时间: <strong>" + result1.completeTime + "</strong></span></br>" + 
			                 "<span>通讯地址: <strong>" + result1.address + "</strong></span>" + 
			                 "<span>联系电话: <strong>" + result1.linkPhone + "</strong></span>" + 
			                 "<span>是否涉密: <strong>" + result1.isClassified + "</strong></span>" + 
			                 "<span>密级: <strong>" + result1.classifiedLevel + "</strong></span>";
		        $("#testReportDetalInfo").text("");
				$("#testReportDetalInfo").append(htmlElment);
			}				
		});
		$.post("testReportController/checkSample.do",{
			testReportID : rows[0].ID
		},function(result){
			result = JSON.parse(result);
		    htmlElment = "";
		    htmlElment = "<p>"+
		                 "<strong>样品信息</strong>"+
			             "</p>"+
			             "<hr/>"+ 	
		    	         "<table border='1'>"+
							"<tr>"+
								"<th>序号</th>"+
								"<th>出场编号</th>"+
								"<th>名称</th>"+
								"<th>型号/规格/代号</th>"+
								"<th>检测/校准项目</th>"+
								"<th>检测/校准人</th>"+
							"</tr>";
			if (result.length > 0) {
				var result1 = {};
				for(var i = 0,orderNumber = 1;i<result.length;i++,orderNumber++){
					result1 = checkSample(result[i]);
					htmlElment += "<tr>"+
								    "<td>"+orderNumber+"</td>"+
								    "<td>"+result1.factoryCode+"</td>"+
								    "<td>"+result1.sampleName+"</td>"+
								    "<td>"+result1.specifications+"</td>"+
								    "<td>"+result1.nameCn+"</td>"+
								    "<td>"+result1.employeeName+"</td>"+
							      "</tr>";
				}
			}
			htmlElment +="</table>";
			$("#sampleInfo").text("");
			$("#sampleInfo").append(htmlElment);
		});
		$.post("testReportController/checkReport.do",{
			testReportID : rows[0].ID
		},function(result){
			result = JSON.parse(result);
		    htmlElment = "";
		    htmlElment =  "<p>"+
                          "<strong>报告信息</strong>"+
                          "</p>"+
                          "<hr/>"+ 	 
		                  "<table border='1' >"+
							"<tr>"+
								"<th>序号</th>"+
								//"<th>文件ID</th>"+
								"<th>附件名</th>"+
								"<th>上传人</th>"+
								"<th>版本号</th>"+
								"<th>版本信息</th>"+
								"<th>上传时间</th>"+
								"<th>审核状态</th>"+
								"<th>备注</th>"+
								"<th>操作</th>"+
							"</tr>";
			if (result.length > 0) {
			  var result1 = {};
				for(var i = 0,orderNumber = 1;i<result.length;i++,orderNumber++){
					result1 = checkTestReport(result[i]);
					htmlElment += "<tr>"+
								    "<td>"+orderNumber+"</td>"+
								    "<td style='display:none' class='ID'>"+result1.ID+"</td>"+
								    "<td style='display:none' class='testReportFileID'>"+result1.fileID+"</td>"+
								    "<td>"+result1.fileName+"</td>"+
								    "<td>"+result1.employeeName+"</td>"+
								    "<td>"+result1.versionNumber+"</td>"+
								    "<td>"+result1.versionInformation+"</td>"+
								    "<td>"+result1.uploadTime+"</td>"+
								    "<td>"+result1.state+"</td>"+
								    "<td>"+result1.remarks+"</td>"+
								    "<td>"+
								    "<button type='button' class='btn btn-default glyphicon glyphicon-download' onclick='downTestReport(this)' >"+
										"下载"+
									"</button>&nbsp"+
									"<button type='button' class='btn btn-default glyphicon glyphicon-search' onclick='onlineView(this)'>"+
										"查看"+
									"</button>&nbsp"+
									"<button type='button' class='btn btn-default glyphicon glyphicon-trash' onclick='deleteTestReport(this)'>"+
										"删除"+
									"</button>"+
									 "</td>"+
							      "</tr>";
				}
			}
			htmlElment +="</table>";
			$("#testReportInfo").text("");
			$("#testReportInfo").append(htmlElment);
			
		});
		$("#checkModal").modal("show");
		} else {
			alert("没有相关的检测报告可以查看");
		}
	}
}

//下载检测报告
function downTestReport(e) {
	var fileID = $(e).parent().prevAll(".testReportFileID").text().trim();
	if (fileID != null || fileID != undefined || fileID != "" || fileID != " ") {
		downOneFile(fileID);
	} else {
		alert("不可以下载");
	}
}

//预览检测报告
function onlineView(e) {
	var fileID = $(e).parent().prevAll(".testReportFileID").text().trim();
	if (fileID == "" || fileID == " " || fileID == null) {
		alert("无法查看");
	} else {
		$.post("fileOperateController/getFilesInfo.do", {
			ID : fileID
		}, function(result) {
			result = JSON.parse(result);
			if (result[0].path != null && result[0].path != "null" && result[0].path != "") {
				var path = result[0].path;
				$.post("fileOperateController/onlinePreview.do", {
					filePath : path
				}, function(result) {
					 result = result.replace(re,"");
					 if (result != null && result!="null"&& result != "")
						{
						 window.location.href = "module/jsp/documentOnlineView.jsp";
						 }
					 else{
							alert("无法查看");
					 }
				});
			}
			else{
				alert("无法查看");
			}
		});
	}
}

//删除检测报告
function deleteTestReport(e) {
	var fileID = $(e).parent().prevAll(".testReportFileID").text().trim();
	var ID = $(e).parent().prevAll(".ID").text().trim();
	deleteFile(fileID);
	deleteOtherTableInfo(ID);
}

//删除其他表的信息
function deleteOtherTableInfo(keyID) {
	$.post("testReportController/deleteOtherTableInfo.do", {
		ID : keyID
	}, function(result) {
		if (result == true || result == "true") {
			alert("删除成功");
		} else {
			alert("删除失败");
		}
	});
	$("#checkModal").modal("hide");
	refresh();
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

// 重新覆盖
function recover() {
	var path = "";
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
					downOneFile(result[0].fileID);
				});
			}
		} else {
			downOneFile(result);
		}
	});
}

//处理检测报告详细信息空值
function checkTestReportDetail(dataObj){
	if (!dataObj.hasOwnProperty("companyname") || dataObj.companyname == null || dataObj.companyname.trim() == "NULL") {
		dataObj.companyname = "";
	}
	if (!dataObj.hasOwnProperty("linkman") || dataObj.linkman == null
			|| dataObj.linkman.trim() == "NULL") {
		dataObj.linkman = "";
	}
	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null
			|| dataObj.createTime.trim() == "NULL") {
		dataObj.createTime = "";
	}
	if (!dataObj.hasOwnProperty("completeTime") || dataObj.completeTime == null
			|| dataObj.completeTime.trim() == "NULL") {
		dataObj.completeTime = "";
	}
	if (!dataObj.hasOwnProperty("address") || dataObj.address == null
			|| dataObj.address.trim() == "NULL") {
		dataObj.address = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null
			|| dataObj.linkPhone.trim() == "NULL") {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("isClassified") || dataObj.isClassified == null
			|| dataObj.isClassified.trim() == "NULL") {
		dataObj.isClassified = "";
	}
	if (!dataObj.hasOwnProperty("classifiedLevel") || dataObj.address == null
			|| dataObj.classifiedLevel.trim() == "NULL") {
		dataObj.classifiedLevel = "";
	}
	return dataObj;
}

//处理样品信息空值
function checkSample(dataObj){
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null || dataObj.factoryCode.trim() == "NULL") {
		dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("sampleName") || dataObj.sampleName == null
			|| dataObj.sampleName.trim() == "NULL") {
		dataObj.sampleName = "";
	}
	if (!dataObj.hasOwnProperty("specifications") || dataObj.specifications == null
			|| dataObj.specifications.trim() == "NULL") {
		dataObj.specifications = "";
	}
	if (!dataObj.hasOwnProperty("nameCn") || dataObj.nameCn == null
			|| dataObj.nameCn.trim() == "NULL") {
		dataObj.nameCn = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null
			|| dataObj.employeeName.trim() == "NULL") {
		dataObj.employeeName = "";
	}
	return dataObj;
}

//处理检测报告空值
function checkTestReport(dataObj){
	if (!dataObj.hasOwnProperty("fileID") || dataObj.fileID == null || dataObj.fileID.trim() == "NULL") {
		dataObj.fileID = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null || dataObj.fileName.trim() == "NULL") {
		dataObj.fileName = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null
			|| dataObj.employeeName.trim() == "NULL") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("versionNumber") || dataObj.versionNumber == null
			|| dataObj.versionNumber.trim() == "NULL") {
		dataObj.versionNumber = "";
	}
	if (!dataObj.hasOwnProperty("versionInformation") || dataObj.versionInformation == null
			|| dataObj.versionInformation.trim() == "NULL") {
		dataObj.versionInformation = "";
	}
	if (!dataObj.hasOwnProperty("uploadTime") || dataObj.uploadTime == null
			|| dataObj.uploadTime.trim() == "NULL") {
		dataObj.uploadTime = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null
			|| dataObj.state.trim() == "NULL") {
		dataObj.state = "";
	}
	if (!dataObj.hasOwnProperty("dismissreason2") || dataObj.dismissreason2 == null
			|| dataObj.dismissreason2.trim() == "NULL") {
		dataObj.dismissreason2 = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks.trim() == "NULL") {
	    dataObj.remarks = "";	
	}
	return dataObj;
}

//刷新页面
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}

