$(function() {
	$('#table').bootstrapTable({
		height : 400,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'ROLEID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url : 'companyController/getCompanyWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		// queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			width : '5'// 宽度
		}, {
			field : 'COMPANYID',// 字段名称
			title : '公司ID',// 列标题文本
			align : 'center',// 对齐方式
			valign : 'middle',// 垂直居中显示
			width : '10',// 宽度
			visible : false
		}, {
			field : 'NAME',// 返回值名称
			title : '公司名',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'CONTACTOR',// 返回值名称
			title : '联系人',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'CONTACTPHONE',// 返回值名称
			title : '联系电话',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'TELEPHONE',// 返回值名称
			title : '固定电话',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'ADDRESS',// 返回值名称
			title : '详细地址',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'SCOPE',// 返回值名称
			title : '经营范围',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'CREATTIME',// 返回值名称
			title : '创建时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'REMARKS',// 返回值名称
			title : '备注',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		} ]
	// 列配置项,详情请查看 列参数 表格
	/* 事件 */
	});
});

// 刷新方法
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}

// 新增
function add() {
	$.ajax({
		url : 'companyController/addCompany.do',
		data : {
			NAME : $('#ADD_NAME').val(),
			CONTACTOR : $('#ADD_CONTACTOR').val(), 
			CONTACTPHONE : $('#ADD_CONTACTPHONE').val(),
			TELEPHONE : $('#ADD_TELEPHONE').val(),
			ADDRESS : $('#ADD_ADDRESS').val(),
			SCOPE : $('#ADD_SCOPE').val(),
			CREATTIMES : $("#ADD_CREATTIME").val(),
			REMARKES : $('#ADD_REMARKS').val()
		},
		success : function(o) {
			if (o <= 0) {
				alert("新增失败");
			}
			$('#addModal').modal('hide');
			refresh();
		}
	});

}

// 查看
function showModal() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}
	$('#SHOW_NAME').val(data[0].NAME);
	$('#SHOW_CONTACTOR').val(data[0].CONTACTOR);
	$('#SHOW_CREATTIME').val(data[0].CREATTIME);
	$('#SHOW_CONTACTPHONE').val(data[0].CONTACTPHONE);
	$('#SHOW_TELEPHONE').val(data[0].TELEPHONE);
	$('#SHOW_ADDRESS').val(data[0].ADDRESS);
	$('#SHOW_SCOPE').val(data[0].SCOPE);
	$('#SHOW_REMARKS').val(data[0].REMARKS);

	$('#showModal input').attr("disabled", "disabled");
	$('#showModal').modal('show');
}
// 打开修改框
function openEdit() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}

	$('#EDIT_NAME').val(data[0].NAME);
	$('#EDIT_CONTACTOR').val(data[0].CONTACTOR);
	$('#EDIT_CREATTIME').val(data[0].CREATTIME);
	$('#EDIT_CONTACTPHONE').val(data[0].CONTACTPHONE);
	$('#EDIT_TELEPHONE').val(data[0].TELEPHONE);
	$('#EDIT_ADDRESS').val(data[0].ADDRESS);
	$('#EDIT_SCOPE').val(data[0].SCOPE);
	$('#EDIT_REMARKS').val(data[0].REMARKS);

	$('#editModal').modal('show');

}

// 修改
function edit() {
	var data = $('#table').bootstrapTable('getSelections');
	$.ajax({
		url : 'companyController/updCompany.do',
		data : {
			COMPANYID : data[0].COMPANYID,
			NAME : $('#EDIT_NAME').val(),
			CONTACTOR : $('#EDIT_CONTACTOR').val(),
			CONTACTPHONE : $('#EDIT_CONTACTPHONE').val(),
			TELEPHONE : $('#EDIT_TELEPHONE').val(),
			ADDRESS : $('#EDIT_ADDRESS').val(),
			SCOPE : $('#EDIT_SCOPE').val(),
			CREATTIMES : $("#EDIT_CREATTIME").val(),
			REMARKES : $('#EDIT_REMARKS').val()
		},
		success : function(o) {
			if (o <= 0) {
				alert("修改失败");
			}
			$('#editModal').modal('hide');
			refresh();
		}
	});
}
// 删除
function del() {
	var data = $('#table').bootstrapTable('getSelections');
	if (data.length == 0) {
		alert("请至少选中一条数据");
		return;
	}
	var ids = "";
	for ( var i = 0; i < data.length; i++) {
		ids += data[i].COMPANYID + ",";
	}
	var ajaxParameter = {
		COMPANYID : ids.substring(0, (ids.length - 1))
	};
	$.ajax({
		url : 'companyController/delCompany.do',
		data : ajaxParameter,
		success : function(o) {
			if (o <= 0) {
				alert("删除失败");
			}
			refresh();
		}
	});
}

// 刷新
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}
