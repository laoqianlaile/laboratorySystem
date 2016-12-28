/**
 * 
 */
var obj = {
		reID:"20161126113025319"
}
$(function(){
	initData();
	initEvent();
});
/*
 * 初始化表格数据
 */
function initData(){
	initContractTable();
	initFileTable();
	initTidingsTable();
}
function initContractTable(){
	var order ;
	$('.contractTable').bootstrapTable({
						// 定义表格的高度height: 500,
				striped : true,// 隔行变色效果
				pagination : true,// 在表格底部显示分页条
				pageSize : 5,// 页面数据条数
				pageNumber : 1,// 首页页码
				pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
				clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
				cache : false,// 禁用 AJAX 数据缓存
				sortName : 'ID',// 定义排序列
				sortOrder : 'desc',// 定义排序方式 getRceiptlistWithPaging
				url : '/laboratorySystem/receiptlistController/getReceiptlistAll.do',// 服务器数据的加载地址
				sidePagination : 'server',// 设置在哪里进行分页
				method : "post",
				dataType : "json",// 服务器返回的数据类型
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				queryParams : function queryParams(params) {
					var param = {};
					param.limit = params.limit;// 页面大小 param.offset=
					// params.offset; //偏移量
					param.search = "";
					param.offset = params.offset;
					order = params.offset + 1; // 偏移量是从0开始
					param.sort = params.sort; // 排序列名
					param.order = params.order;// 排位命令（desc，asc）
					return param;
				}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
				selectItemName : '',// radio or checkbox 的字段名
				onClickRow : function(row,$element,field){
					getCurrentFile(row.reID);
					/*console.log(row);
					console.log($element);
					console.log(field);*/
					
				},
				onLoadSuccess : function(data) {
					console.log(data);
				},
				columns : [
						{
							title : '序号',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '5%',// 宽度
							visible : true,
							formatter : function(value, row, index) {
								checkData("cAndRe",row);
								return order++;
							}
						},{
							field : 'reID',// 返回值名称
							title : '交接单ID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'cID',// 返回值名称
							title : 'cID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'cCode',// 返回值名称
							title : '合同编号',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '25%',// 宽度
						},
						{
							field : 'cName',// 返回值名称
							title : '合同名称',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '20%'// 宽度
						},
						{
							field : 'reCode',// 返回值名称
							title : '交接单编码',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '35%'// 宽度
						},
						/*{
							field : 'cState',// 返回值名称
							title : '上传时间',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '15%'// 宽度
						},*/
						{
							field : 'reState',// 返回值名称
							title : '状态',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '15%'// 宽度
					
						} ]
			// 列配置项,详情请查看 列参数 表格
			/* 事件 */
			});
}
function initFileTable(){
	$('.fileTable').bootstrapTable(
			{
						// 定义表格的高度height: 500,
				striped : true,// 隔行变色效果
				pagination : true,// 在表格底部显示分页条
				pageSize : 5,// 页面数据条数
				pageNumber : 1,// 首页页码
				pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
				clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
				// checkbox
				cache : false,// 禁用 AJAX 数据缓存
				sortName : 'ID',// 定义排序列
				sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
				url : '/laboratorySystem/receiptlistController/getReFiletByReID.do',// 服务器数据的加载地址
				sidePagination : 'server',// 设置在哪里进行分页
				method : "post",
				dataType : "json",// 服务器返回的数据类型
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				queryParams : function queryParams(params) {
					var param = {};
					param.limit = params.limit;// 页面大小 param.offset=
					// params.offset; //偏移量
					param.search = "";
					param.offset = params.offset;
					order = params.offset + 1; // 偏移量是从0开始
					param.sort = params.sort; // 排序列名
					param.order = params.order;// 排位命令（desc，asc）
					param.reID = obj.reID;
					return param;
				}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
				selectItemName : '',// radio or checkbox 的字段名
				onLoadSuccess : function(data) {
					console.log(data);
				},
				columns : [
						{
							title : '序号',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '5%',// 宽度
							visible : true,
							formatter : function(value, row, index) {
								checkData("file",row);
								return order++;
							}
						},
						{
							field : 'ID',// 返回值名称
							title : 'fileID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'fileName',// 返回值名称
							title : '文件名',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '35%',// 宽度
						},
						{
							field : 'remarks',// 返回值名称
							title : '备注',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '30%'// 宽度
						},
						/*{
							field : 'uploadName',// 返回值名称
							title : '上传人',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '15%'// 宽度
						},*/
						{
							field : 'uploadTime',// 返回值名称
							title : '上传时间',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '30%'// 宽度
						}]
			// 列配置项,详情请查看 列参数 表格
			/* 事件 */
			});
}
function initTidingsTable(){
	$('.tidingsTable').bootstrapTable( 
			{
						// 定义表格的高度height: 500,
				striped : true,// 隔行变色效果
				pagination : true,// 在表格底部显示分页条
				pageSize : 5,// 页面数据条数
				pageNumber : 1,// 首页页码
				pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
				clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
				// checkbox
				cache : false,// 禁用 AJAX 数据缓存
				sortName : 'ID',// 定义排序列
				sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
				url : '/laboratorySystem/messageController/getMessageByUserID.do',// 服务器数据的加载地址
				sidePagination : 'server',// 设置在哪里进行分页
				method : "post",
				dataType : "json",// 服务器返回的数据类型
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				queryParams : function queryParams(params) {
					var param = {};
					param.limit = params.limit;// 页面大小 param.offset=
					// params.offset; //偏移量
					param.search = "";
					param.offset = params.offset;
					order = params.offset + 1; // 偏移量是从0开始
					param.sort = params.sort; // 排序列名
					param.order = params.order;// 排位命令（desc，asc）
					return param;
				}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
				selectItemName : '',// radio or checkbox 的字段名
				onLoadSuccess : function(data) {
					console.log(data);
				},
				columns : [
						{
							title : '序号 ',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '5%',// 宽度
							visible : true,
							formatter : function(value, row, index) {
								checkData("tiding",row);
								return order++;
							}
						},
						{
							field : 'mnID',// 返回值名称
							title : 'messageNoticeID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'mID',// 返回值名称
							title : 'message ID',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '10%',// 宽度
							visible : false
						},
						{
							field : 'content',// 返回值名称
							title : '消息内容',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '15%',// 宽度
						},
						{
							field : 'createTime',// 返回值名称
							title : '时间',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '20%'// 宽度
						},
						{
							field : 'state',// 返回值名称
							title : '操作',// 列名
							align : 'center',// 水平居中显示
							valign : 'middle',// 垂直居中显示
							width : '20%',// 宽度
							formatter : function(value, row, index) {
								if(value == "未查看")
								var look = "", edit = "", download = "";
								look = '<button onclick= "lookMessage(\''
										+ row.ID
										+ '\')" data-toggle="tooltip" data-placement="top" title="确认查看"  class="icon-eye-open" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></button>';
								return look;
							}
						} ]
			// 列配置项,详情请查看 列参数 表格
			/* 事件 */
			});
}
function getCurrentFile(reID){
	$('.fileTable').bootstrapTable( 'refresh',
			{
				silent : false,
				url : "/laboratorySystem/receiptlistController/getReFiletByReID.do",
				query : {
					reID : reID
				}
	
			});
}
function initEvent(){
	
}
function lookMessage(ID){
	var isLook = confirm("确认已经查看信息！");
	if(isLook == true){
		$.ajax({
			url : '/laboratorySystem/receiptlistController/addTaskAndSampleWithEdit.do',
			dataType : "json",
			type : "post",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
			async : false,
			data : {
				ID:ID
			},
			success : function(o) {
				$('.fileTable').bootstrapTable( 'refresh',null);
			},
			error : function() {
			}
		});
	}
}
function checkData(who,dataObj){
	switch (who){
		case "cAndRe" :checkDataRe(dataObj); break;
		case "file" : checkDataFile(dataObj);break;
		case "tiding" :checkDataTiding(dataObj); break;
		default : break;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
		
	}
}

//验证合同交接单数据
function checkDataRe(dataObj){
	if (!dataObj.hasOwnProperty("reID") || dataObj.reID == null
			|| dataObj.reID.trim() == "NULL") {
		dataObj.reID = "";
	}
	if (!dataObj.hasOwnProperty("reState") || dataObj.reState == null
			|| dataObj.reState.trim() == "NULL") {
		dataObj.reState = "无交接单";
	}
	if (!dataObj.hasOwnProperty("reCode") || dataObj.reCode == null
			|| dataObj.reCode.trim() == "NULL") {
		dataObj.reCode = "";
	}
	if (!dataObj.hasOwnProperty("cID") || dataObj.cID == null
			|| dataObj.cID.trim() == "NULL") {
		dataObj.cID = "";
	}
	if (!dataObj.hasOwnProperty("cCode") || dataObj.cCode == null
			|| dataObj.cCode.trim() == "NULL") {
		dataObj.cCode = "";
	}
	if (!dataObj.hasOwnProperty("cName") || dataObj.cName == null
			|| dataObj.cName.trim() == "NULL") {
		dataObj.cName = "";
	}
	/*if (!dataObj.hasOwnProperty("cState") || dataObj.cState == null
			|| dataObj.cState.trim() == "NULL") {
		dataObj.cState = "";
	}*/ //数字不能trim()
	
}

//验证交接单文件信息数据
function checkDataFile(dataObj){
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
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
//验证提示信息数据
function checkDataTiding(dataObj){
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("content") || dataObj.content == null
			|| dataObj.content.trim() == "NULL") {
		dataObj.content = "";
	}
	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null
			|| dataObj.createTime.trim() == "NULL") {
		dataObj.createTime = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null
			|| dataObj.state.trim() == "NULL") {
		dataObj.remarks = "未查看";
	}
}
