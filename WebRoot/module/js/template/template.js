$(function() {
	init();
});

function init() {

	$(function() {
		$('#table')
				.bootstrapTable(
						{
							striped : true, // 隔行变色效果
							pagination : true,// 在表格底部显示分页条
							pageSize : 10,// 页面数据条数
							pageNumber : 1,// 首页页码
							pageList : [ 3, 5, , 9, 10, 200, 500 ],// 设置可供选择的页面数据条数
							clickToSelect : false,// 设置true 将点击时，自动选择rediobox
							// 和 checkbox
							cache : false,// 禁用AJAX数据缓存
							sortName : 'ID',
							Order : 'asc',
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
											field:'fileID',// 返回值名称
											title:'文件ID',// 列名
											align:'center',// 水平居中显示
											valign:'middle',// 垂直居中显示
											width:'0',// 宽度
											visible:false
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
												var d = "<button  onclick='delTemplate(\""+row.ID+"\")' data-toggle='tooltip' data-placement='top' title='删除'  class='glyphicon glyphicon-remove-sign' style='color: rgb(10, 78, 143);margin-right:8px;'></button>";
												var a = "<button  onclick='downFile(\""+row.fileID+"\")' title='下载'  class='glyphicon glyphicon-save' style='color: rgb(10, 78, 143);margin-right:8px;'></button>";
												return  a + d;
											}
										} ]
							// 列配置项,详情请查看 列参数 表格
							/* 事件 */
							});
		});
	}
/* 刷新方法 */
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}

/* 重置刷新 */
function reSetRefresh(){
	document.getElementById("query_templateName").value=""; 	
	document.getElementById("uPLOADTIME1").value=""; 	
	document.getElementById("uPLOADTIME2").value="";
	
	query();
}


function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

        nAME : $('#query_templateName').val(),
        uPLOADTIME1 : $('#uPLOADTIME1').val(),
    	uPLOADTIME2 : $('#uPLOADTIME2').val(),
		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort: params.sort,  //排序列名  
	    order: params.order//排位命令（desc，asc）  
	// 排位命令（desc，asc）
	};
	return temp;
}

/* 查询方法 */
function query() {

	init();
	refresh();

}

/* 判断是否登录  */
function isLogin(){
	islogin = $('#EMPLOYEEID').val();
	if(islogin === null || islogin === "" || islogin === "null"){
		 alert("您还没登录， 请先登录");
		 return false;
	}
	else{
		return true;
	}
}

/* 检测时间段是否合理 */
function correctTime(){
	var time1 = $('#uPLOADTIME1').val();
	var time2 = $('#uPLOADTIME2').val();
	
	if(time1 === null || time1 === ""){
		alert("不能为空");
		$('#uPLOADTIME1').focus();
	}
	
	if(time1 !== null && time1 !== "" && time2 !== null && time2 !== ""){
		if(time1 > time2){
			alert("小伙是不是逗我哟！\n" + time1 + " 至 " +time2 );
			$('#uPLOADTIME2').focus();
		}
		else{
			query();
		}
	}
	if(time1 === null || time1 === "" && time2 === null || time2 === ""){
		query();
	}
	
}


/* 单个删除方法*/
function delTemplate(){
	if(confirm("确定要删除？")){
		templateIDs = arguments[0];
		alert(templateIDs);
		$.ajax({
			url : 'templateController/delTemplate.do',
			data :{
				templateIDs :templateIDs
			},
			success : function(o) {
				if (o <= 0) {
					alert("删除失败");
				}
				else{
					alert("删除成功");
					refresh();
				}
				
			}
		});
	}
	
		
}
/* 删除多个 方法 */
function delData() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0) {
		alert("请至少选中一条数据");
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
				alert("删除失败");
			}
			else{
				alert("删除成功");
				refresh();
			}
			
		}
	});
}

function openModal(){
	var html = "";
	$("#fileSubtype").find("option").remove();
	$.post("fileOperateController/getFileTypeName.do", {
		ID : $("#fileType").find("option:selected").val()
	}, function(result) {
		result = JSON.parse(result);
		for ( var i = 0; i < result.length; i++) {
			html += "<option>" + result[i].name + "</option>";
		}
		$("#fileSubtype").append(html);
	});
	
	fileUploadInit("#file_upload");
	
	$("#addModal").modal("show");
}

/*上传 文件*/
function upfile(){
	
	path = ""; // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	type = "1"; // 文件类型       该处默认为模板文件
	belongID = "";//文件所属ID
	firstDirectoryName = $('#fileType option:checked').text();// 一级目录
	secondDirectoryName = $('#fileSubtype option:checked').text(); // 二级目录
	thirdDirectoryName = ""; //三级目录
	otherInfo = ""; // 其他参数
	remarks = $('#add_TemplateRemarks').val(); // 备注
	
	fileUpload("#file_upload",path, type, belongID,firstDirectoryName, secondDirectoryName,thirdDirectoryName,
			otherInfo, remarks);

	// 延迟执行
	setTimeout("addTemplate()",3000); 

	
}

function addTemplate(){
	
	var parame = {};
	parame.TemplateName = $('#add_TemplateName').val();
	parame.TemplateRemarks = $('#add_TemplateRemarks').val();
	parame.uploaderID = $('#uploaderID').val();
	
	var templateTypeString =  $('#fileType option:checked').text();
	
	if(templateTypeString === "标准文件"){
		parame.TemplateType = 0;
	}
	if(templateTypeString === "模板文件"){
		parame.TemplateType = 1;
	}
	if(templateTypeString === "项目文件"){
		parame.TemplateType = 2;
	}
	
	parame.fileID = "";
	fileIDs = fielIdReturn();
	if(fileIDs.length == 0){
		alert("出错了");
		
		return;
	}
	else if(fileIDs.length == 1 ){
		parame.fileID = fileIDs[0];
	}
	else {
		for(var i; i < fileIDs.length; i++){
			parame.fileID += fileIDs[i] + ",";
		}
	}
	alert("上传成功");
	
	$.ajax({
		  url:'templateController/addTemplate.do',
		  data:parame,
		  success:function(o){
			  if(o <= 0){
				  alert("新增失败");
			  }
			  $('#addModal').modal('hide');
			  refresh();
		  }
		});
}
/*文件下载*/
function downFile(fileID){
	if(confirm("确认下载？")){
		if(fileID === null || fileID === "" || fileID === undefined){
			alert("没有可下载文件");
		}
		else{
			downOneFile(fileID);
		}
	}
	
	return;
	
}