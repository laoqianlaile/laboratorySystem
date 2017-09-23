var param = {
	taskID : "",
	testProjectID : "",
	standards : [],
	fileID : "",
	mark : ""
};

$(function() {
	var ID = getUrlParam("taskID"); 

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
			field : 'sampleID',// 返回值名称
			title : '样品',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			visible : false
		}, {
			field : 'factoryCode',// 返回值名称
			title : '出厂编号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "15%",// 宽度
		}, {
			field : 'sampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "15%",// 宽度
			formatter : function(value, row, index) {
				  return '<a href="#" class="sampleName" name="'+row.sampleID+ '">' + row.sampleName + '</a>';
			},
		}, {
			field : 'specifications',// 返回值名称
			title : '型号/规格/代号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "15%",// 宽度
		}, {
			field : 'testProjectName',// 返回值名称
			title : '检测/校准项目',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "18%",// 宽度
			
		}, {
			field : 'standardName',// 返回值名称
			title : '标准',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "18%",// 宽度
		}, {
			field : 'detectstate',// 返回值名称
			title : '检测状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "15%",// 宽度
		} ],
	    onClickRow: function (row, $element) {
			  param.curRow = row;
          },
        onLoadSuccess: function () {
            $(".sampleName").editable({
                url: function (params) {
                   var ID = $(this).attr("name");
                   var Name = $.trim(params.value);
                   $.post("sampleController/updateSampleNameByID.do",
                   {
                	   sampleID : ID,
                	   sampleName : Name
                   },function(result) {
                	   refresh();
                	   }
                   );
                },
            	title: "修改样品名",
                type: 'text',
                validate: function (value) { // 字段验证
                	if (!$.trim(value)) {
                		return '不能为空';
                		} 
                	}
            });
        }
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
	uploadOriginalDataFile();
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

// 初始化上传原始数据的方法
function uploadOriginalDataFile() {
	$(".originalDataImag").fileupload({
		autoUpload : true,
		url : 'fileOperateController/upload.do?TypeNumber=' + 3,
		dataType : 'text',
		add : function(e, data) {
			$("#ensureUploadOriginalData").click(function() {
				var mark = $.trim($("#mark").val());
				if(mark == "" || mark == undefined) {
					return;
				} else {
					param.mark =  mark;
					data.submit();
				}
			});
		},
	}).bind('fileuploaddone', function(e, data) {
		var returnFileID = JSON.parse(data.result);
		if (returnFileID != null && returnFileID != "null" && returnFileID != "") {
			$.post("taskController/addOriginalDataImag.do", {
				taskID : param.taskID,
				fileID : param.fileID,
				mark : param.mark,
				originalName : $.trim($("#originalName").val()),
				originaldataCode : $.trim($("#originaldataCode").val()),
				suggest : $.trim($("#suggest").val()),
				codeOne : $.trim($("#codeOne").val()),
				codeTwo : $.trim($("#codeTwo").val()),
				originalRemarks : $.trim($("#originalRemarks").val())
			}, function(result) {
				result = JSON.parse(result);
				if(result == "true" || result == true) {
					reload();
				} else {
					swal({title:result + "",  type:"success",});
				}
			});
		} else {
			swal({title:"图片上传失败",  type:"error",});
		}
	});
}

// 检测项目登记
function registeTestProject() {
	var ID = param.taskID;
	$.post("taskController/checkTaskTypeIsCalibration.do",
	{
		taskID :ID
	},
	function(result) {
		result = JSON.parse(result);
		if (result == "true" || result == true) {
			initTestprojectTree();
			$("#testprojectInfo").modal("show");
		} else {
			swal({title:result + "",});
		}
	});
}

function getTaskType(){
	var taskID = param.taskID;
	$.post("taskController/getTaskType.do",
	{
		taskID:taskID
	},
	function(result){
		initTestprojectTree(result);
	});
}


// 确认登记的检测项目
function sureRegisteTestProject() {
	if (param.testProjectID !== "" && param.standards.length > 0) {
		if( param.standards.length > 1){
			swal({title:"只能选择一个检测标准！", type:"warning",});
			return ;
		}
		$('#testprojectInfo').modal('hide');
		$.ajax({
			url : 'taskController/registeTestPeojcetAndStandardOfTask.do',
			type : 'POST',
			data : {
				taskID : param.taskID,
				testProjectID : param.testProjectID,
				standards : param.standards
			},
			traditional : true,
			async : false,
			success : function(result) {
				result = JSON.parse(result);
				if (result == true || result == "true") {
					$('#sampleInfoTable').bootstrapTable('refresh');
					swal({title:"成功登记或修改检测项目和标准", type:"succeuss"});
				} else {
					swal({title:"系统运行出错", type:"error"});
				}
			}
		});
	} else {
		swal({title:"请确定检测项目和标准都已登记", type:"warning"});
		return;
	}
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
					swal({title:"生成报告前请先登记检测项目", type:"warning"});
				} else {
					displayDiv();
					$.post("taskController/downReportTemplate.do", 
					{
						taskID : ID
					},
					function(fileID) {
						hideDiv();
						fileID = JSON.parse(fileID);
						if (fileID != null && fileID != "null" && fileID != "") {
							refresh();
							downOneFile(fileID);
						} else {
							swal({title:"下载出错,请确定模版是否上传或系统是否运行正常", type:"error"});
							
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
		swal({title:"不能将此类型文档作为检测报告上传", type:"warning"});
	}
} 

// 上传报告
function uploadTestReport() {
	var ID = param.taskID;
	$.post("taskController/taskDectstateCheck.do", {
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
			swal({title:"当前审核状态不可以上传报告", type:"warning"});
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
					swal({title:"无法查看", type:"error"});
				}
			});
		} else {
			hideDiv();
			swal({title:"无法查看", type:"error"});
		}
	});
}

// 提交审核
function submitReport() {	if (confirm("确定要提交审核?")) {
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
				swal({title:"提交审核成功", type:"success"});
    			} else {
    				refresh();
    				swal({title:"当前状态不能提交审核!请核对报告审核状态或者指定审核人", type:"warning"});
    				}
    		});
    }
}

// 初始化检测项目数
function initTestprojectTree(type) {
	var data;
	if(type == 0){
		data = getNodeByID();
	}else if(type == 1){
		data = getTestProjectTree();
	}
	$('#testProjectTree').treeview({
		collapsed : false,
		data : data,
		showIcon : true,
		showCheckbox : true,
		onNodeChecked : function(event, node) {// 一个节点被checked
			var thisId = node.nodeId;
			var thisParentId = node.parentId;
			var total = "";
			if (node.id == undefined || node.id == "") { // 点击所有模块
				$('#testProjectTree').treeview('checkAll', {
					silent : true
				});
				swal({title:"不可以同时选择多个检测项目同时登记标准", type:"warning"});
				return;
			} else {
				$('#testProjectTree').treeview('uncheckAll', { silent: false });
				$('#testProjectTree').treeview('checkNode', [ thisId, { silent: true } ]);
				param.testProjectID = node.id;
				initStandardTreeByTestProjectID(param.testProjectID,node.text);
			}
		},
		onNodeUnchecked : function(event, node) { // 一个节点取消选择
			var thisId = node.nodeId;
			var thisParentId = node.parentId;
			var total = ""; // 最后一个节点才用
			if (node.id == undefined || node.id == "") { // 所有节点
				$('#testProjectTree').treeview('uncheckAll', {
					silent : true
				}); // 选择的勾不会去掉
			}
			param.testProjectID = "";
			return;
		}
	});
	$('#testprojectInfo').modal('show');
}

function getNodeByID(){       //只得到该检测项目一个节点，data为该检测项目的ID
	var ab;
	$.ajax({
		type:'post',
		url:'taskController/getNodeByID.do',
		data:{'taskID':param.taskID},
		async : false,           //设为同步否则返回值可能为undefined
		dataType:'text',
		success:function (result){
			ab = JSON.parse(result);
		}
	});
	return ab;
}

//获取检测项目树
function getTestProjectTree() {
	var trees;
	$.ajax({
		type : 'POST',
		dataType : 'text',
		url : 'taskController/getTestProjectTree.do',
		async : false,
		success : function(value) {
			trees = JSON.parse(value);
		}
	});
	return trees;
}

//初始化相应检测项目对应的标准树
function initStandardTreeByTestProjectID(testProjectID, testprojectName) {
	param.standards.splice(0,param.standards.length);
	
	$.post("taskController/getStandardByProjectID.do", {
		testProjectID : testProjectID,
		testprojectName : testprojectName
	}, function(result) {
		result = JSON.parse(result);
		if (result !== null && result !== "null" && result !== "") {
			$('#standardTree').treeview({ // 初始化标准树
				collapsed : false,
				data : result,
				showIcon : true,
				showCheckbox : true,
				onNodeChecked : function(event, node) {// 一个节点被checked
					var thisId = node.nodeId;
					if(param.testProjectID  == "" ||  param.testProjectID  == null){
						swal({title:"请先选择检测项目",  type:"warning",});
						return ;
					}
					if (node.id == undefined || node.id == "") { // 点击所有模块 
						$('#standardTree').treeview('checkAll', {
							silent : true
						});
						if (node.nodes !== null && node.nodes !== "null") {
							var len = node.nodes.length
							for ( var i = 0; i < len; i++) {
								param.standards.push(node.nodes[i].id);
							}
						}
					} else {
						$('#standardTree').treeview('checkNode', [ 0, { silent: true } ]);
						param.standards.push(node.id);
					}
				},
				onNodeUnchecked : function(event, node) { // 一个节点取消选择
					var thisId = node.nodeId;
					var thisParentId = node.parentId;
					var total = ""; // 最后一个节点才用
					if (node.id == undefined || node.id == "") { // 所有节点
						$('#standardTree').treeview('uncheckAll', {
							silent : true
						});
						param.standards.splice(0,param.standards.length);
					} else {
						for(var i = 0, len = param.standards.length; i < len; i++){
				            if (param.standards[i] == node.id) {
				            	param.standards.splice(i,1);
				            	} 
				            }
					}
				}
			});
			setRegistedStandardSelected(result); // 将相应标准选中
		} else {
			swal({title:"没有找到该检测项目所对应的标准",  type:"error",});
		}
	});
}

// 将已登记的标准选中
function setRegistedStandardSelected(result) {
	param.standards.splice(0,param.standards.length);
	$.post("taskController/getRegistedStandard.do",
	{
		taskID : param.taskID,
		testProjectID : param.testProjectID
	}, function(o) {
		o = JSON.parse(o);
		if(o !== null && o.length > 0) {
			var selectedStandardID, standardID;  
			for(var j = 0, selectedStandardLen = o.length; j < selectedStandardLen ; j ++) {
				selectedStandardID = o[j].testStandard;
				for(var i = 0, nodeid = 1, len = result[0].nodes.length; i < len ; i ++, nodeid ++) {
					if(isContains(selectedStandardID,result[0].nodes[i].id)) {
						param.standards.push(result[0].nodes[i].id);
						$('#standardTree').treeview('checkNode', [ 0, { silent: true } ]);
						$('#standardTree').treeview('checkNode', [ nodeid, { silent: true } ]);  //怕把所有子节点的模块都选中
					}
				}
			}		
		}
	});
}

// 上传原始数据
function uploadOriginalData() {
	$.post("taskController/taskDectstateCheck.do", {
		taskID : param.taskID
	}, function(result) {
		if (result == true || result == "true") {
			$.post("taskController/getFileIdOfTask.do", 
			{
				taskID : param.taskID
			}, function(fileID) {
				fileID = JSON.parse(fileID);
				if (fileID == null || fileID == "null" || fileID == "") {
					swal({title:"上传原始数据前请确定已生成或上传了报告",  type:"warning",});
				} else {
					param.fileID = fileID;
					$("#originalDataModal").modal("show");
				}
			});
		} else {
			swal({title:"当前审核状态不可以上传原始数据图片",  type:"error",});
		}
	});
}

// 预览图片
function previewImage(file, imgArea) {
	if (file.files && file.files[0]) {
		var fileSuffixName = file.value.toLowerCase();
		if (fileSuffixName.indexOf('.jpg') < 0 && fileSuffixName.indexOf('.gif') < 0 &&  fileSuffixName.indexOf('.png') < 0) {
			swal({title:"不能将此类型文件作为原始数据上传上传",  type:"error",});
			return ;
		}
		var img = document.getElementById(imgArea);
		var reader = new FileReader();
		reader.onload = function(evt) {
			img.src = evt.target.result;
		}
		reader.readAsDataURL(file.files[0]);
	} else // 兼容IE
	{
		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		file.select();
		var src = document.selection.createRange().text;
		var img = document.getElementById(imgArea);
		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	}
}

// 下载
function fileDown() {
	var fileID = arguments[0];
	downOneFile(fileID);
}

// 返回
function turnBack() {
	window.location.href = window.location.href.split("?")[0].replace(
			'taskView.jsp', 'taskManage.jsp');
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

// 判断字符串是否包含字串
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
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