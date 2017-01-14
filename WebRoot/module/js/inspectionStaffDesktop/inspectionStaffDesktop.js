/*初始化页面*/
$(function() {
	init();
});

function init() {
	$('#taskTable').bootstrapTable({
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [3,5],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'task.ID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		//onDblClickCell : onDblClickCell,
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
		columns : [  {
				radio : true,
				align : 'center',// 水平居中显示
				valign : 'middle',// 垂直居中显示
				width : '3%'// 宽度
		}, {
			title : '序号',
			field : 'Number',
			formatter : function(value, row, index) {
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
			field : 'factoryCode',// 返回值名称
			title : '样品出厂编号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'sampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'specifications',// 返回值名称
			title : '型号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'testName',// 返回值名称
			title : '检测项目',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'employeeName',// 返回值名称
			title : '检测人',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'detectState',// 返回值名称
			title : '状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		} ]
	// 列配置项,详情请查看 列参数 表格
	/* 事件 */
	});
}

/*表格单击事件*/
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
	window.location.href = window.location.href.split("?")[0].replace(
			'InspectionStaffDesktop.jsp', 'equipmentRegistration.jsp');
}

/* 下载初始报告 */
function download() {
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	var testReportID = data[0].testReportID;
	window.location.href = window.location.href.replace('InspectionStaffDesktop.jsp','testReportManage/testReportView.jsp') + '?testReportID='+testReportID;
}

/* 提交审核 */
function submit() {
var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	var testReportID = data[0].testReportID;
	window.location.href = window.location.href.replace('InspectionStaffDesktop.jsp','testReportManage/testReportView.jsp') + '?testReportID='+testReportID;
}

/* 查看正审核任务 */
function viewTask() {
	window.location.href = window.location.href.split("?")[0]
	.replace('InspectionStaffDesktop.jsp',
			'viewAuditTask.jsp');
}

/* 查看报告 */
function viewReport() {
var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	var receiptlistID = data[0].ID;
	window.location.href = window.location.href.replace('InspectionStaffDesktop.jsp','testReportManage/testReportManage.jsp') + '?ID='+receiptlistID;
}


/* 上传报告 */
function upload() {
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	var receiptlistID = data[0].ID;
	window.location.href = window.location.href.replace('InspectionStaffDesktop.jsp','testReportManage/testReportManage.jsp') + '?ID='+receiptlistID;
}

