var obj = {
	reID : "",
	order_c : 0,
	order_f : 0,
	order_t : 0
}


/*初始化页面*/
$(function() {
	init();
	initTidingsTable();
	initEvent();

});
function init() {
	$('#taskTable').bootstrapTable({
		striped : false,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 3, 5 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'task.ID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		singleSelect:true,//禁止多选
		// onDblClickCell : onDblClickCell,
		onClickRow : onClickRow,
		url : 'taskController/getTaskInfoWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams : function queryParams(params) { // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
			var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit : params.limit, // 页面大小
				offset : params.offset, // 偏移量
				search : "",// 初始化搜索文字
				sort : params.sort, // 排序列名
				order : params.order, // 排位命令（desc，asc）
			};
			return temp;
		},
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '3%'// 宽度
		}, {
			title : '序号',
			field : 'Number',
			formatter : function(value, row, index) {
				checkData(row);
				return index + 1;
			}
		}, {
			field : 'ID',// 返回值名称
			title : 'ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : 0,// 宽度
			visible : false
		}, {
			field : 'receiptlistID',// 返回值名称
			title : 'receiptlistID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : 0,// 宽度
			visible : false
		}, {
			field : 'factoryCode',// 返回值名称
			title : '样品出厂编号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '19%'// 宽度
		}, {
			field : 'sampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '19%'// 宽度
		}, {
			field : 'specifications',// 返回值名称
			title : '型号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '19%'// 宽度
		}, {
			field : 'testName',// 返回值名称
			title : '检测项目',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '19%'// 宽度
		}, {
			field : 'detectState',// 返回值名称
			title : '状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '19%'// 宽度
		} ]
	// 列配置项,详情请查看 列参数 表格
	/* 事件 */
	});
}
/* 表格单击事件 */
function onClickRow(row) {
	var ID = row.ID;
	$.ajax({
		url : 'taskController/getTaskInfor.do',
		scriptCharset : "utf-8",
		data : {
			"ID" : ID
		},
		dataType : 'json',
		success : function(o) {
			$('input[type="text"]').val("");
			$('#accordingDoc').val("");
			var datas = JSON.parse(o);
			$('#taskCode').val(datas[0].taskCode);
			$('#receiptlistCode').val(datas[0].receiptlistCode);
			$('#accordingDoc').val(datas[0].accordingDoc);
		}
	});
}
/* 设备登记 */
function register() {
	turnout();
}

/* 下载初始报告 */
function download() {
	turnout();
}

/* 提交审核 */
function submit() {
	turnout();
}

/* 查看正审核任务 */
function viewTask() {
	window.location.href = window.location.href.split("?")[0].replace(
			'inspectionStaffDesktop.jsp', 'viewAuditTask.jsp');
}
/* 查看报告 */
function viewReport() {
	turnout();
}
/* 上传报告 */
function upload() {
	turnout();
}

function turnout() {
	var data = $('#taskTable').bootstrapTable('getSelections');
	if (data.length == 0 || data.length > 1) {
		swal({
			title : "请选择一条数据",
			type : 'warning'
		});
		return;
	}
	var taskID = data[0].ID;
	window.location.href = window.location.href.replace(
			'inspectionStaffDesktop/inspectionStaffDesktop.jsp',
			'taskManage/taskView.jsp')
			+ '?taskID=' + taskID;
}

function initTidingsTable() {
	$('.tidingsTable')
			.bootstrapTable(
					{
						striped : false,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 5,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 3, 5, 8 ],// 设置可供选择的页面数据条数
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
							obj.order_t = params.offset + 1; // 偏移量是从0开始
							param.sort = params.sort; // 排序列名
							param.order = params.order;// 排位命令（desc，asc）
							param.isRead = false;
							return param;
						}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名
						onLoadSuccess : function(data) {
							//加上    <span class="badge pull-right">42</span>首页 在消息上面
						},
						columns : [
								{
									title : '序号 ',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									visible : true,
									formatter : function(value, row, index) {
										checkDatas(row);
										return obj.order_t++;
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
									title : 'messageID',// 列名
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
									title : '通知时间',// 列名
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
										if (value == "未查看")
											var look = "", edit = "", download = "";
										look = '<span onclick= "lookMessage(\''
												+ row.mnID
												+ '\')" data-toggle="tooltip" data-placement="top" title="确认查看"  class="glyphicon glyphicon-eye-open" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
										return look;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
}

function initEvent() {
	initMessage(); //消息按钮的颜色切换
}
function initMessage() {
	$(".tidingHead ul li").click(function() {
		$(".tidingHead ul li").toggleClass("selected");
		refrehMessage($(this).text());
	});
}
function refrehMessage(text) { //读取通知信息
	var param = {};
	if (text == "提示信息")
		param.isRead = false;
	else
		param.isRead = true;
	$('.tidingsTable').bootstrapTable('refresh', {
		silent : true,
		url : "/laboratorySystem/messageController/getMessageByUserID.do",
		query : param
	});
}

function lookMessage(ID) {
	sweetAlert({
		  title: "Are you sure?",
		  text: "确认已经查看信息!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否"
		
		}, function(isConfirm){
		        if(isConfirm){
		        	$.ajax({
		    			url : '/laboratorySystem/messageController/readedMessageByID.do',
		    			dataType : "json",
		    			type : "post",
		    			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
		    			async : false,
		    			data : {
		    				messageNoticeID : ID
		    			},
		    			success : function(o) {

		    			},
		    			error : function() {
		    			}
		    		});
		    		$('.tidingsTable').bootstrapTable('refresh', null);
		        }
		});
	
}

function checkDatas(dataObj){
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
			|| typeof dataObj.state == undefined) {
		dataObj.remarks = "未查看";
	}
}

function checkData(dataObj) {
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null
			|| dataObj.factoryCode.trim() == "NULL") {
		dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("sampleName") || dataObj.sampleName == null
			|| dataObj.sampleName.trim() == "NULL") {
		dataObj.sampleName = "";
	}
	if (!dataObj.hasOwnProperty("specifications")
			|| dataObj.specifications == null
			|| dataObj.specifications.trim() == "NULL") {
		dataObj.specifications = "";
	}
	if (!dataObj.hasOwnProperty("testName") || dataObj.testName == null
			|| dataObj.testName.trim() == "NULL") {
		dataObj.testName = "";
	}
	if (!dataObj.hasOwnProperty("detectState") || dataObj.detectState == null
			|| dataObj.detectState.trim() == "NULL") {
		dataObj.detectState = "";
	}
}
