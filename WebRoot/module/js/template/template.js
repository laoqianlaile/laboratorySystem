var fileParam = {};
$(function() {
	init();
});

function init() {
	$(function() {
		$('#table')
				.bootstrapTable(
						{
							striped : false, // 隔行变色效果
							pagination : true,// 在表格底部显示分页条
							pageSize : 10,// 页面数据条数
							pageNumber : 1,// 首页页码
							pageList : [ 3, 5, 10 ],// 设置可供选择的页面数据条数
							clickToSelect : true,// 设置true 将点击时，自动选择rediobox
							// 和 checkbox
							cache : false,// 禁用AJAX数据缓存
							sortName : 'UPLOADTIME',
							sortOrder : 'desc',
							url : 'templateController/getTemplateWithPage.do',
							sidePagination : 'server',
							contentType : 'application/json',
							dataType : 'json',
							offset : 0,
							queryParams : queryParams, // 参数
							queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
							showRefresh : false, // 显示刷新按钮

							columns : [
									{
										checkbox : true,
										width : '1%'// 宽度
									},
									{
										field : '',
										title : '序号',
										width : '2%',
										align : 'center',
										valign : 'middle',
										formatter : function(value, row, index) {
											return index + 1;
										}
									},
									{
										field : 'ID',// 返回值名称
										title : '模板管理id',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
									{
										field : 'fileID',// 返回值名称
										title : '文件ID',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
									{
										field : 'NAME',// 返回值名称
										title : '模板名称',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%',// 宽度
									},
									{
										field : 'UPLOADER',// 返回值名称
										title : '上传人',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'REVIEWER',// 返回值名称
										title : '审核人',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'SUGGEST',// 返回值名称
										title : '审核意见',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '18%'// 宽度
									},
									{
										field : 'TEMPLATETYPE',// 返回值名称
										title : '模板类型',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'STATE',// 返回值名称
										title : '状态',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'UPLOADTIME',// 返回值名称
										title : '上传时间',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'remarks',// 返回值名称
										title : '备注',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : '',
										title : '操作',
										align : 'center',
										valign : 'middle',
										width : '8%',
										formatter : function(value, row, index) {
											var d = "<img src = 'module/img/delete_icon.png' onclick='delTemplate(\""+ row.ID+ "\")'  title='删除'   style='cursor:pointer;margin-right:8px;' />";
											var a = "<img src='module/img/download_icon.png' onclick='downFile(\""+ row.fileID+ "\")' title='下载'   style='cursor:pointer;margin-right:8px;' />";
											return a + d;
										}
									} ]
						// 列配置项,详情请查看 列参数 表格
						/* 事件 */
						});
	});
	uploadFile();
}
/* 刷新方法 */
function refresh() {
	window.location.href = "module/jsp/template/template.jsp";
}

//重新加载页面
function reload() {
	window.location.reload();
}

function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

		nAME : $('#query_templateName').val(),
		uPLOADTIME1 : $('#uPLOADTIME1').val(),
		uPLOADTIME2 : $('#uPLOADTIME2').val(),
		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort : params.sort, // 排序列名
		order : params.order
	// 排位命令（desc，asc）
	// 排位命令（desc，asc）
	};
	console.log(temp);
	return temp;
}

/* 查询方法 */
function query() {
	init();
	$('#table').bootstrapTable('refresh', null);
}
/* 检测时间段是否合理 */
function correctTime() {
	var time1 = $('#uPLOADTIME1').val();
	var time2 = $('#uPLOADTIME2').val();

	if (time1 === null || time1 === "") {
		swal({ title: "不能为空", type: "warning",});
		$('#uPLOADTIME1').focus();
	}

	if (time1 !== null && time1 !== "" && time2 !== null && time2 !== "") {
		if (time1 > time2) {
			swal({ title: "时间选择错误\n"+ time1 + " 至 " + time2, type: "warning",});
			$('#uPLOADTIME2').focus();
		} else {
			query();
		}
	}
	if (time1 === null || time1 === "" && time2 === null || time2 === "") {
		query();
	}

}

/* 单个删除方法 */
function delTemplate() {
	templateID = arguments[0];//获取模板ID
	swal({
		  title: "确定要删除 ?",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "确定",
		  closeOnConfirm: false
		},
		function(){
			$.ajax({
				url : 'templateController/delTemplate.do',
				data : {
					templateIDs : templateID
				},
				success : function(o) {
					if (o <= 0) {
						swal({title:"删除失败",type:"error"});
					} else {
						swal({title:"删除成功",type:"success"});
						refresh();
					}

				}
			});
		});
}

//检查文件类型
function checkFile(o) {
	$("#chooseFile").attr("disabled", "disabled");
	var filePath = $(o).val();
	if (filePath != "" && filePath != undefined) {
		var arr = filePath.split('\\');
		var fileName = arr[arr.length - 1];
		$("#fileName").html(fileName);
	}
	if (o.value.indexOf('.doc') < 0 && o.value.indexOf('.docx') < 0) {
		swal("不能将此类型文档作为模板文件上传!");
	}
} 

/* 删除多个 方法 */
function delData() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0) {
		swal("请至少选中一条数据!");
		return;
	}

	var ids = "";
	for (var i = 0; i < data.length; i++) {
		console.log(data[i].ID);
		ids += data[i].ID + ",";
	}

	console.log(ids);
	var ajaxParameter = {};
	ajaxParameter.templateIDs = ids.substring(0, (ids.length - 1))

	$.ajax({
		url : 'templateController/delTemplate.do',
		data : ajaxParameter,
		success : function(o) {
			if (o <= 0) {
				swal({title:"删除失败",type:"error"});
			} else {
				swal({title:"删除成功",type:"success"});
				refresh();
			}

		}
	});
}

function openModal() {
	
	/*二级目录填充*/
/*	var html = "";
	$("#fileSubtype").find("option").remove();
	$.post("fileOperateController/getFileTypeName.do", {
		ID : $("#fileType").find("option:selected").val()
	}, function(result) {
		result = JSON.parse(result);
		for (var i = 0; i < result.length; i++) {
			html += "<option>" + result[i].name + "</option>";
		}
		$("#fileSubtype").append(html);
	});*/
	
	$("#chooseFile").removeAttr("disabled");
	$("#fileName").html("");
	fileParam.firstDirectoryName = $('#fileType option:checked').text();// 一级目录
	fileParam.type = 1 ;
	fileParam.remarks = $('#add_TemplateRemarks').val(); // 备注
	$("#addModal").modal("show");
	
}

//上传文件
function uploadFile() {
	$("#files").fileupload({
				autoUpload : true,
				url : 'fileOperateController/upload.do',
				dataType : 'json',
				add : function(e, data) {
					$("#ensure").click(function() {
						fileParam.secondDirectoryName = $('#fileSubtype option:checked').text(); // 二级目录
						data.submit();
					});
				},
			}).bind('fileuploaddone',function(e, data) {
						var fileID = data.result;
						if (fileID != null && fileID != "null" && fileID != "") {
							// 传过来的fileID 与数据库不匹配
							addTemplate(fileID);
							
						} else {
							swal({title:"上传失败! 网路繁忙",  type:"error",});
						} 
					});

	// 文件上传前触发事件,如果需要额外添加参数可以在这里添加
	$('#files').bind('fileuploadsubmit', function(e, data) {
		data.formData = {
			firstDirectory : fileParam.firstDirectoryName,
			secondDirectory : fileParam.secondDirectoryName,
			TypeNumber : fileParam.type,
			remark : fileParam.remarks
		}
	});
}

// 判空处理
function checkNull(){
	if(arguments[0].TemplateName == ""){
		swal({title:"模板名称不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].fileID == ""){
		swal({title:"请选择一个模板文件上传",  type:"warning",});
		return true;
	}
}
// 新增模板方法
function addTemplate(fileID) {

	var parame = {};
	parame.TemplateName = $('#add_TemplateName').val();
	parame.TemplateRemarks = $('#add_TemplateRemarks').val();
	parame.uploaderID = $('#EMPLOYEEID').val();//上传人ID
	parame.TestProjectIDs = "";
	parame.fileID = fileID;
	var templateTypeString = $('#fileSubtype option:checked').text();

	if (templateTypeString === "检测合同模板") {
		parame.TemplateType = 0;
	}
	if (templateTypeString === "校准合同模板") {
		parame.TemplateType = 3; // 新增
	}
	if (templateTypeString === "报告模板") {
		parame.TemplateType = 1;
		parame.TestProjectIDs = getTestProjectIDs();
		console.log(parame.TestProjectIDs);
	}
	if (templateTypeString === "交接单模板") {
		parame.TemplateType = 2;
	}
	
	if(checkNull(parame))return;
	
	var Content = "新的"+templateTypeString+":"+parame.TemplateName+"(模板名称)需要审核。"
	
	$.ajax({
		url : 'templateController/addTemplate.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				swal({title:"新增失败!",  type:"error",});
				return;
			}
			else{
				sendMessage(Content, "模板审核人");
				$('#addModal').modal('hide');
				swal({title:"上传成功!",  type:"success",});
				refresh();
			}
		}
	});
}

/* 文件下载 */
function downFile(fileID) {
	if(fileID === null || fileID === "" || fileID === "null"){
		swal({  title: "文件丢失了", type: "error",});
		return;
	}
	else{
		swal({
			  title: "确定下载?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "确认",
			  cancelButtonText: "取消",
			  closeOnConfirm: false,
			  closeOnCancel: false
			},
			function(isConfirm){
			  if (isConfirm) {
				//下载文件
				downOneFile(fileID);
			  } else {
			    swal("Cancelled", "", "error");
			  }
			});
		return;
	}
}
//消息推送
function  sendMessage(Content,recipient){
	$.ajax({
		url:'messageController/addMessage.do',
		data:{
			content:Content
		},
		success:function(o){
			  if(o == ""){
				 swal({title:"信息新增失败（1）",type:"error",});
			  }
			  else{
				  var messageID = o;
				  messageID = messageID.substring(1,messageID.length-1);
				  $.ajax({
					  url:'messageNoticeController/addMessageNotice.do?MessageID='+messageID+'&recipient='+recipient,
					  success:function(s){
						  if(s <= 0){
							  if(s == -1){
								  swal({title:"信息新增失败（2）",text:"不存在该角色名"+recipient,type:"error",});
							  }
							  else{
								 swal({title:"正在全力维护...",type:"error",});
							  }
						  }
					  }
				  });
			  }
		  }
	});
}
/*// 报告文件模板选项
function testProjectModal() {

	$('#testProject')
			.bootstrapTable(
					{
						striped : true, // 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 5,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 5, 10],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将点击时，自动选择rediobox
						// 和 checkbox
						cache : false,// 禁用AJAX数据缓存
						sortName : 'testProject.createTime',
						order : 'desc',
						url : 'testProjectController/getTestProjectWithPaging.do',
						sidePagination : 'server',
						contentType : 'application/json',
						dataType : 'json',
						offset : 0,
						queryParams : queryParams, // 参数
						queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
						showRefresh : false, // 显示刷新按钮

						columns : [
								{
									checkbox : true,
									width : '1%'// 宽度
								},
								{
									field : '',
									title : '序号',
									width : '5%',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row, index) {
										return index + 1;
									}
								},
								{
									field : 'testProjectID',// 返回值名称
									title : '检测项目id',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'testStandardID',// 返回值名称
									title : '检测标准id',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'testInstumentID',// 返回值名称
									title : '检测仪器id',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'DEPARTMENTID',// 返回值名称
									title : '部门ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'STANDARDID',// 返回值名称
									title : '标准ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'EQUIPMENTID',// 返回值名称
									title : '设备ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'NAMECN',// 返回值名称
									title : '中文名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%',// 宽度
								},
								{
									field : 'NAMEEN',// 返回值名称
									title : '英文名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'ENVIRONMENTALREQUIREMENTS',// 返回值名称
									title : '环境要求',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'STANDARDCODE',// 返回值名称
									title : '所属标准',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'DEPARTMENTNAME',// 返回值名称
									title : '所属科室',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%'// 宽度
								},
								{
									field : 'describes',// 返回值名称
									title : '标准描述',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%'// 宽度
								},
								{
									field : 'EQUIPMENTNAME',// 返回值名称
									title : '所属仪器',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%'// 宽度
								},
								{
									field : 'createTime',// 返回值名称
									title : '创建时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
							
								 ]
					// 列配置项,详情请查看 列参数 表格
					 事件 
					});
	$('#addModal').modal('hide');
	$('#testProjectModal').modal('show');

}*/
/**
 * 判断是否是报告模板
 * 
 */
function isReport(){
	if($('#fileSubtype option:checked').text() === "报告模板"){
//		testProjectModal();
		$('#editReportImg').show();
		$('#editReprotSearch').show();
	}
	else{
		$('#add_TestProjectNameCn').empty();
		$('#editReportImg').hide();
		$('#editReprotSearch').hide();
	}
}
/**
 * 填充数据
 * 
 */
function fullTestProjectData(data){
	
	console.log(data);
	var html = "<ul>";
	if(data.length == 0){
		html += "<li class='noDate'>没有查到数据</li>"
	}
	else{
		for(var i = 0; i < data.length; i++){
			html+="<li  id ='"+data[i].ID+"' onclick='displayChecked(this)'>" + data[i].testName+ "</li>"
		}
	}
	html +="</ul>";
	$('#showTestProject').html(html);
	$('#showTestProject').show();
}
/**
 * 获得焦点时,模糊匹配展示搜索检测项目
 */
function showPartTestproject(){
	var data = getTestproject();
	fullTestProjectData(data);
}
/**
 * 点击检测项目时，添加到被选中的input里
 * 
 */
function displayChecked(testProject){
	
	if(isSameID(testProject.id)){
		html='<span class = "spanTag"><span class= "singleE" id ="'+testProject.id+'" >'+ testProject.innerHTML +'&nbsp;&nbsp;</span><a  onclick="moveSingleE(this)">x</a></span>'
		
		$('#add_TestProjectNameCn').append(html);
		$('#showTestProject').hide();
	}
	else{
		swal("请不要重复选中同一检测项目");
	}
}

/**
 * 失去焦点隐藏搜索
 * 
 * @param type
 */
function hideSearch(){
	setTimeout(function(){
		$('#showTestProject').hide();
	},500); 
}
/**
 * 删除点中的span
 * 
 */
function moveSingleE(SingleEInfo){
	console.log(SingleEInfo);
	$(SingleEInfo).parent().remove();
}
/**
 * 判断是否有重复的检测项目
 * 
 */
function isSameID(checkID){
	
	var allTestProjects =$('#add_TestProjectNameCn span.singleE');
	
	if(allTestProjects.length == 0){
		return true;
	}
	else{
		for(var i=0;i<allTestProjects.length;i++){
			if(allTestProjects[i].id === checkID){
				return false;
			}
		}
		return true;
	}
}

/**
 * 获取所有检测项目ID
 * 
 */

//获取所有被选中仪器的id
function getTestProjectIDs(){
	var total = ""
	var allTestProjectIDs =$('#add_TestProjectNameCn span.singleE');
	if(allTestProjectIDs.length == 0){
		swal("请至少选中一个仪器设备");
		return;
	}
	else{
		for(var i=0;i<allTestProjectIDs.length;i++){
			total += allTestProjectIDs[i].id+" , ";
		}
		return total;
	}
}
/**
 * 向后台发出请求获取检测项目数据
 * 
 */
function getTestproject(){
	var matchName = "";
	matchName = $('#editReprotSearch').val();
	console.log(matchName);
	var date;
	$.ajax({
		url : 'testProjectController/getTestProjectListByName.do',
		dataType : "json",
		async : false,
		data : {matchName:matchName},
		success :function(o){
			date = JSON.parse(o);
		},
		error : function(){
			return false;
		}
	});
	
	return date;
}
$(function () { $('#testProjectModal').on('hide.bs.modal', function () {
    $('#addModal').modal('show');
	})
 });

function addTestproject(){
	var  testProjectDate = $('#testProject').bootstrapTable('getSelections');
	
	
	var NameCn ="";
	var testProjectID = "";
	if(testProjectDate.length >= 1){
		for(var i = 0; i < testProjectDate.length; i ++ ){
			if(i == testProjectDate.length - 1){
				NameCn += testProjectDate[i].NAMECN;
				testProjectID += testProjectDate[i].testProjectID;
			}
			else{
				NameCn += testProjectDate[i].NAMECN +","
				testProjectID += testProjectDate[i].testProjectID + ",";
			}
			
		}
		//先把上次选中的清空下。	
		$('#add_TestProjectNameCn').attr("value","");
		$('#add_TestProjectID').attr("value","");
		
		$('#add_TestProjectNameCn').val(NameCn)
		$('#add_TestProjectID').val(testProjectID);
		$('#testProjectModal').modal('hide');
		return;
	}
	swal("至少选中一个");
}


//查看word
function ViewDoc(){
	var rows = $('#table').bootstrapTable('getSelections');
	if(rows.length > 1 || rows.length == 0){
		swal("请选择且只能选择一条数据查看");
	} else {
		displayDiv();
		var fileID = rows[0].fileID;
		$.post("fileOperateController/onlinePreview.do", {
			ID : fileID
		}, function(result) {
			result = JSON.parse(result);
			if(result != null && result != "null" && result != ""){
				window.location.href = "module/jsp/documentOnlineView.jsp";
			} else {
				hideDiv();
				swal("无法查看");
			}
		});
	}
}

function submit(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data == 0){
		swal("至少选中一条");
		return;
	}
	var ids  = "";
	
	for(var i=0; i<data.length; i++){
		if(data[i].STATE != "未提交"){
			swal(data[i].NAME + "当前状态不能提交");
			return;
		}
		if(i == data.length - 1){
			ids += data[i].ID
		}
		else{
			ids += data[i].ID + ",";
		}
	}
	
	$.ajax({
		url : 'templateController/upSubmitTemplate.do',
		data : {templateIDs : ids},
		success : function(o) {
			if (o <= 0) {
				swal({title:"操作失败",type:"error"});
			} else {
				swal({title:"操作成功",type:"success"});
				refresh();
			}

		}
	});
}
