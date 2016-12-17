$(function() {
	//var ID = getUrlParam("ID");
    var ID=1;
	// 得到交接单信息
	$.ajax({
		url : 'receiptlistController/getReceiptlistInformationInView.do',
		data : {
			"ID" : ID
		},
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			$('#show_receiptlistCode').val(data[0].receiptlistCode);
			$('#show_contractCode').val(data[0].contractCode);
			$('#show_linkMan').val(data[0].linkMan);
			$('#show_createTime').val(data[0].createTime);
			$('#show_completeTime').val(data[0].completeTime);
			$('#show_companyName').val(data[0].companyName);
			$('#show_linkPhone').val(data[0].linkPhone);
			$('#show_address').val(data[0].address);
			$('#show_classifiedLevel').val(data[0].classifiedLevel);
			$('#show_accordingDoc').val(data[0].accordingDoc);
		}
	});

	// 得到交接单对应样品的信息
	$('#sampleTable').bootstrapTable({
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : 1,// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'task.ID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url : 'taskController/getReceiptlistSampleInforWithPaging.do',// 服务器数据的加载地址
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
				ID : ID
			};
			return temp;
		},
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
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
			title : '出厂编号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'sampleName',// 返回值名称
			title : '名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'specifications',// 返回值名称
			title : '型号/规格/代号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'testName',// 返回值名称
			title : '检测/校准项目',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'require',// 返回值名称
			title : '要求描述',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		}, {
			field : 'createTime',// 返回值名称
			title : '录入时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '16%'// 宽度
		} ]
	// 列配置项,详情请查看 列参数 表格
	/* 事件 */
	});

	// 得到交接单对应文件的信息
	$('#fileTable').bootstrapTable({
		// 定义表格的高度height: 500,
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 1, 3, 5 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'fileInformation.ID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url : 'fileInformationController/getFileInReceiptlistWithPaging.do',// 服务器数据的加载地址
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
				ID : ID
			};
			return temp;
		},
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		// selectItemName:'',//radio or checkbox 的字段名
		columns : [ {
			title : '序号',
			field : 'Number',
			formatter : function(value, row, index) {
				return index + 1;
			}
		}, {
			field : 'fileName',// 返回值名称
			title : '文件名',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '30%'// 宽度
		}, {
			field : 'uploadTime',// 返回值名称
			title : '上传时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '25%'// 宽度
		}, {
			field : 'remarks',// 返回值名称
			title : '备注',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '35%'// 宽度
		} ]
	// 列配置项,详情请查看 列参数 表格
	/* 事件 */
	});
});


function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
}

function sure(){
	window.location.href = window.location.href.split("?")[0]
	.replace('receiptlistView.jsp',
			'receiptlistManage.jsp');
}


