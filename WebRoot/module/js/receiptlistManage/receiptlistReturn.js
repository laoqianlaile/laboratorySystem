var reID, conID, comID, state;
state = getUrlParam("state");

$(function() {
	initPageData();
});

function initPageData() {
	if (state == "add") {
		init();
		initSample();
	}

	if (state == "edit") {
		reID = getUrlParam("reID");

		$("#receiptlistID").val(reID);
		getReceiptlistInforInReturn(reID);
		initSample();
	}
}

function getReceiptlistInforInReturn(reID) {
	$.ajax({
		url : 'receiptlistController/getReceiptlistInforInReturn.do',
		data : {
			"ID" : reID
		},
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			$('#show_receiptlistCode').val(data[0].receiptlistCode);
			$('#show_contractCode').val(data[0].contractCode);
			$("#show_contractCode").attr("disabled", true);
			$('#show_linkMan').val(data[0].linkMan);
			$('#show_companyName').val(data[0].companyName);
			$("#show_companyName").attr("disabled", true);
			$('#show_linkPhone').val(data[0].linkPhone);
		}
	});
}

function initSample() {
	$('#sampleTable')
			.bootstrapTable(
					{
						striped : true,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 5,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 1, 3, 5 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
						// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						// sortName : 'task.ID',// 定义排序列
						// sortOrder : 'asc',// 定义排序方式
						url : 'taskController/getReceiptlistSampleInforWithPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						contentType : 'application/json',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : function queryParams(params) { // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
							var ID = $("#receiptlistID").val();
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
						columns : [
								{
									title : '序号',
									field : 'Number',
									formatter : function(value, row, index) {
										return index + 1;
									}
								},
								{
									field : 'factoryCode',// 返回值名称
									title : '出厂编号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '18%'// 宽度
								},
								{
									field : 'ID',// 返回值名称
									title : 'ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'taskID',// 返回值名称
									title : 'taskID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'testID',// 返回值名称
									title : 'testID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '0',// 宽度
									visible : false
								},
								{
									field : 'sampleName',// 返回值名称
									title : '名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '18%'// 宽度
								},
								{
									field : 'specifications',// 返回值名称
									title : '型号/规格/代号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '18%'// 宽度
								},
								{
									field : 'testName',// 返回值名称
									title : '检测/校准项目',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '18%'// 宽度
								},
								{
									field : 'createTime',// 返回值名称
									title : '录入时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '18%'// 宽度
								},
								{
									field : 'operate',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%',// 宽度
									formatter : function(value, row, index) {
										var btn_show = '<button type="button" onclick="showModal('
												+ row.ID
												+ ',\''
												+ row.factoryCode
												+ '\',\''
												+ row.sampleName
												+ '\',\''
												+ row.specifications
												+ '\',\''
												+ row.testName
												+ '\',\''
												+ row.createTime
												+ '\')" class="btn btn-primary glyphicon glyphicon-show">&nbsp;查看</button>&nbsp';
										var btn_edit = '<button type="button" onclick="edit('
												+ row.ID
												+ ',\''
												+ row.testID
												+ '\',\''
												+ row.factoryCode
												+ '\',\''
												+ row.sampleName
												+ '\',\''
												+ row.specifications
												+ '\',\''
												+ row.testName
												+ '\',\''
												+ row.createTime
												+ '\')" class="btn btn-primary glyphicon glyphicon-edit">&nbsp;编辑</button>&nbsp';
										var btn_del = '<button type="button" onclick="del('
												+ row.ID
												+ ',\''
												+ row.taskID
												+ '\')" class="btn btn-primary glyphicon glyphicon-remove">&nbsp;删除</button>&nbsp';
										return btn_show + btn_edit + btn_del;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
}

function init() {
	$.ajax({
		url : 'receiptlistController/addReceiptListInReturn.do',
		scriptCharset : "utf-8",
		async : false,
		contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			$("#receiptlistID").val(data.reID);
			$("#show_receiptlistCode").val(data.reCode);
		}
	});
}

$(document).on("blur", "#show_contractCode", function() {
	if (state == "add") {
		if ($("#show_contractCode").val() == "")
			alert("样品编号不能为空");
		if ($("#show_contractCode").val() != "")
			isExit($("#show_contractCode").val());
	}
});

function isExit(contractCode) {
	var parame = {};
	var data;
	parame.contractCode = contractCode;
	$.ajax({
		url : 'contractController/getcompanyInforByCode.do',
		scriptCharset : "utf-8",
		contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
		data : parame,
		dataType : 'json',
		success : function(o) {
			data = JSON.parse(o);
			if (typeof data[0] !== 'undefined') {
				$("#show_companyName").val(data[0].companyName);
				$("#show_companyName").attr("disabled", true);
				conID = data[0].conID;
			} else {
				alert("非法合同编号");
			}
		}
	});
}

// 查看样品信息
function showModal(ID, factoryCode, sampleName, specifications, testName,
		createTime) {
	// console.log(factoryCode);
	// console.log(createTime) ;
	$('#showModal').modal('show');
	$('#show_factoryCode').val(factoryCode);
	$('#show_sampleName').val(sampleName);
	$('#show_specifications').val(specifications);
	$('#show_nameCn').val(testName);
	$('#show_createTimes').val(createTime);
	$('#showModal input').attr("disabled", "disabled");
}

// 修改样品信息
function edit(ID,testID, factoryCode, sampleName, specifications,
		testName, createTime) {
	$('#editModal').modal('show');
	$('#edit_factoryCode').val(factoryCode);
	$('#edit_sampleName').val(sampleName);
	$('#edit_specifications').val(specifications);
	$('#edit_nameCn').val(testName);
	$('#edit_createTimes').val(createTime);

	$('#edit').click(function() {
		var parame = {};
		parame.ID = ID;
		parame.testID = testID;
		parame.factoryCode = $('#edit_factoryCode').val();
		parame.sampleName = encodeURI($('#edit_sampleName').val());
		parame.specifications = $('#edit_specifications').val();
		parame.nameCn = encodeURI($('#edit_nameCn').val());
		parame.createTime = $('#edit_createTimes').val();
        if(checkSampledata(parame)){
		$.ajax({
			url : 'taskController/updReceiptlistSampleInForInReturn.do',
			scriptCharset: "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : parame,
			dataType : 'json',
			success : function(o) {
				if (o <= 0) {
					alert("修改失败");
				}
				$('#editModal').modal('hide');
				refresh();
			}
		});
        }
	});
}

function checkSampledata(data) {
	if (data.factoryCode == "" || data.factoryCode == "null") {
		alert("出厂编号不能为空");
		return false;
	}

	if (data.sampleName == "" || data.sampleName == "null") {
		alert("样品名称不能为空");
		return false;
	}

	if (data.specifications == "" || data.specifications == "null") {
		alert("型号/规格/代号不能为空");
		return false;
	}

	if (data.nameCn == "" || data.nameCn == "null") {
		alert("检测/校准项目不能为空");
		return false;
	}

	if (data.createTime == "" || data.createTime == "null") {
		alert("录入时间不能为空");
		return false;
	}
	
	return true;

}

// 刷新
function refresh() {
	$('#sampleTable').bootstrapTable('refresh', null);
}

// 删除交接单中的样品
function del(ID, taskID) {
	var parame = {};
	// parame.ID=ID;
	parame.taskID = taskID;
	var isDelete = confirm("确认删除");
	if (isDelete == true) {
		$.ajax({
			url : 'receiptlistController/deleteTaskByID.do',
			data : parame,
			dataType : "json",
			success : function(o) {
				if (o == false) {
					alert("删除失败");
				}
				refresh();
			}
		});
	}
}

// 扫描录入样品
function automaticadd() {
	var qrcode = 1;
	var ID;
	if (qrcode == null) {
		alert("录入失败，可选择手动录入");
	}
	var parame = {};
	parame.qrcode = qrcode;
	$.ajax({
		url : 'sampleController/getSampleInfor.do',
		data : parame,
		dataType : "json",
		success : function(o) {
			var data = JSON.parse(o);
			ID = data[0].ID;
			add(ID);
		}
	});

}

// 手动录入样品
function manualadd() {
	$('#add').modal('show');
}

function addSample() {
	ID = $('#add_ID').val();
	add(ID);
}

// 录入样品
function add(ID) {
	var parame = {};
	parame.ID = ID;
	parame.receiptlistID = $('#receiptlistID').val();
	$.ajax({
		url : 'taskController/addTaskSample.do',
		data : parame,
		dataType : "json",
		success : function(o) {
			if (o == false) {
				alert("添加失败");
			}
			$('#add').modal('hide');
			refresh();
		}
	});

}

// 修改交接单信息
function sure() {

	if (state == "edit") {
		var parame = {};
		parame.ID = $('#receiptlistID').val();
		parame.linkMan = encodeURI($('#show_linkMan').val());
		parame.linkPhone = $('#show_linkPhone').val();
		parame.createTime = $('#show_createTime').val();
		if (checklistData(parame)) {
			$.ajax({
						url : 'receiptlistController/updReceiptlistInforInReturn.do',
						contentType : "application/x-www-form-urlencoded; charset=UTF-8", // 中文乱码
						data : parame,
						dataType : 'json',
						success : function(o) {
							if (o <= 0) {
								alert("修改失败");
							}
						}
					});
			 window.location.href =
			 window.location.href.split("?")[0].replace(
			 'receiptlistReturn.jsp', 'receiptlistManage.jsp');
		}
	}

	if (state == "add") {
		var parame = {};
		parame.reID = $('#receiptlistID').val();
		parame.linkMan = encodeURI($('#show_linkMan').val());
		parame.linkPhone = $('#show_linkPhone').val();
		parame.createTime = $('#show_createTime').val();
		parame.conID = conID;
		if (checklistData(parame)) {
			$
					.ajax({
						url : 'receiptlistController/updRelistInforInReturn.do',
						contentType : "application/x-www-form-urlencoded; charset=UTF-8", // 中文乱码
						data : parame,
						dataType : 'json',
						success : function(o) {
							if (o <= 0) {
								alert("操作失败");
							}
						}
					});
			 window.location.href =
			 window.location.href.split("?")[0].replace(
			 'receiptlistReturn.jsp', 'receiptlistManage.jsp');
		}
	}

}

function checklistData(data) {
	if (data.linkMan == "" || data.linkMan == "null") {
		alert("交接人不能为空");
		return false;
	}
	if (data.linkPhone == "" || data.linkPhone == "null") {
		alert("联系电话不能为空");
		return false;
	}
	var phone = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
	if (!phone.test(data.linkPhone)) {
		alert("联系人电话格式不正确");
		return false;
	}
	if (data.createTime == "" || data.createTime == "null") {
		alert("录入时间不能为空");
		return false;
	}
	if (data.conID == "" || data.conID == "null") {
		alert("合同编号不能为空");
		return false;
	}
	
	return true;
}

function checkeditdata(data) {
	if (data.linkMan == "" || data.linkMan == "null") {
		alert("交接人不能为空");
		return false;
	}

	var phone = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
	if (!phone.test(data.linkPhone)) {
		alert("联系人电话格式不正确");
		return false;
	}

	if (!isNoramlPhone(data.linkPhone)) {
		alert("联系人电话格式不正确");
		return false;
	}
	if (data.createTime == "" || data.createTime == "null") {
		alert("录入时间不能为空");
		return false;
	}
	
	return true;
}

function remove() {
	var parame = {};
	parame.reID = $('#receiptlistID').val();
	$.ajax({
		url : 'taskController/deleteTaskByCondition.do',
		data : parame,
		dataType : "json",
		success : function(o) {
			if (o == false) {
				alert("操作失败");
			}
			dele();
		}
	});

}

function dele() {

	if (state == "edit") {
		window.location.href = window.location.href.split("?")[0].replace(
			'receiptlistReturn.jsp', 'receiptlistManage.jsp');
	}

	if (state =="add") {
		var parame = {};
		parame.reID = $('#receiptlistID').val();
		$.ajax({
			url : 'receiptlistController/delReceiptlist.do',
			data : parame,
			dataType : "json",
			success : function(o) {
				if (o == true) {
					window.location.href = window.location.href.split("?")[0]
						.replace('receiptlistReturn.jsp',
								'receiptlistManage.jsp');
				}
			}
		});
	}
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
}