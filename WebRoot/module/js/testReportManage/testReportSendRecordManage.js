$(function() {
	initData();
});

//初始化数据
function initData(){
	$("#table").bootstrapTable({
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
	//	pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
	//	sortName : 'ID',// 定义排序列
	//	sortOrder : 'DESC',// 定义排序方式
		url : 'testReportController/getTestReportSendRecord.do',// 服务器数据的加载地址
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
			field : 'fileID',// 返回值名称
			title : '文件ID',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			visible : false
		},{
			field : 'receiptlistCode',// 返回值名称
			title : '交接单号',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "15%",// 宽度
			
		},{
			field : 'companyName',// 返回值名称
			title : '委托单位',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "15%"// 宽度
		},{
			field : 'fileName',// 返回值名称
			title : '报告名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "15%"// 宽度
	    },{
			field : 'versionNumber',// 返回值名称
			title : '报告版本',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'sendMan',// 返回值名称
			title : '发送人',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			field : 'sendTime',// 返回值名称
			title : '发送时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :"15%"// 宽度
		},{
			field : 'receiveMan',// 返回值名称
			title : '接受人',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			title : '操作',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			formatter : function(value, row, index) {
				return "<span  onclick='pigeonholeReport(\""+row.ID+"\")'  title='归档' class='glyphicon glyphicon-folder-close' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></span> "
				+"<span  onclick='checkReport(\""+row.ID+"\")'  title='查看' class='glyphicon glyphicon-zoom-in' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></span> "
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
function queryParams() {
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
		receiveManName : $.trim($('#receiveManName').val()),
	};
	return searchCondition;
}

// 归档
function pigeonholeReport() {
	var testReportID = arguments[0];
	if (confirm("是否设置归档?")) {
		$.post("testReportController/pigeonholeReport.do", {
			ID : testReportID
		}, function(result) {
			if (result == true || result == "true") {
				alert("设置归档成功");
			} else {
				alert("设置归档失败");
			}
			refresh();
		});
	}
}

// 查看检测报告
function checkReport() {
}

// 刷新页面
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}
