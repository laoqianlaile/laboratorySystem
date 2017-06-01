//var reID, conID, comID, state;
//state = getUrlParam("state");

var reID = getUrlParam("reID");
var coID = getUrlParam("coID");
var comID = getUrlParam("comID");
var coCode = getUrlParam("coCode");
var state = getUrlParam("state");
var reCode = getUrlParam("reCode");
var param = {};
param.reCode = reCode;
param.coCode = coCode;
$(function() {
	initPageData();
});

function initPageData() {
	init();
}

function init() {
	getReceiptlistInforInReturn(reID);
	if (state == "edit") {
		$("#receiptlistID").val(reID);
		getReceiptlistInforInReturn(reID);
	} else if (state == "add") {
		$("#receiptlistID").val(reID);
		getReceiptlistInforInReturn(reID);
	}
	initSample();
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
										checkSamplesData(row);
										return index + 1;
									}
								},
								{
									field : 'factoryCode',// 返回值名称
									title : '出厂编号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
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
									width : '20%'// 宽度
								},
								{
									field : 'specifications',// 返回值名称
									title : '型号/规格/代号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'createTime',// 返回值名称
									title : '录入时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'operate',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%',// 宽度
									formatter : function(value, row, index) {
										var btn_edit;
										var btn_view;
										var btn_dele;
										btn_edit = "<input type=\"image\" src=\"module/img/receiptlistManage/edit_icon.png\" style=\"margin-left:10px;\"  onclick='openEdit("
												+ JSON.stringify(row) + ")'>";
										btn_view = "<input type=\"image\" src=\"module/img/receiptlistManage/view_icon.png\" style=\"margin-left:10px;\"  onclick='showModal("
												+ JSON.stringify(row) + ")'>";
										btn_dele = "<input type=\"image\" src=\"module/img/receiptlistManage/delete_icon.png\" style=\"margin-left:10px;\"  onclick='del("
												+ JSON.stringify(row) + ")'>";
										return btn_edit + btn_view + btn_dele;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
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
			$('#show_createTime').val(data[0].createTime);
			$("#show_companyName").attr("disabled", true);
			$('#show_linkPhone').val(data[0].linkPhone);
		}
	});
}

function getCompanyName() {
	var parame = {};
	var data;
	parame.contractCode = coCode;
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
			}
		}
	});
}
// 查看样品信息
function showModal(data) {
	// console.log(factoryCode);
	// console.log(createTime) ;
	$('#showModal').modal('show');
	$('#show_factoryCode').val(data.factoryCode);
	$('#show_sampleName').val(data.sampleName);
	$('#show_specifications').val(data.specifications);
	$('#show_createTimes').val(data.createTime);
	$('#showModal input').attr("disabled", "disabled");
}

// 修改样品信息
function openEdit(data) {
	$('#editModal').modal('show');
	$('#edit_factoryCode').val(data.factoryCode);
	$('#edit_sampleName').val(data.sampleName);
	$('#edit_specifications').val(data.specifications);
	$('#edit_nameCn').val(data.testName);
	$('#edit_createTimes').val(data.createTime);
	$('#edit_ID').val(data.ID);
}

function edit() {
	var parame = {};
	parame.factoryCode = $('#edit_factoryCode').val();
	parame.sampleName = encodeURI($('#edit_sampleName').val());
	parame.specifications = $('#edit_specifications').val();
	parame.createTime = $('#edit_createTimes').val();
	parame.ID = $('#edit_ID').val();
	if (checkSampledata(parame)) {
		$.ajax({
			url : 'taskController/updReceiptlistSampleInForInReturn.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : parame,
			dataType : 'json',
			success : function(o) {
				if (o <= 0) {
					swal({
						title : "修改失败",
						type : 'warning'
					});
				} else {
					swal({
						title : "修改成功",
						type : 'success'
					});
				}
				$('#editModal').modal('hide');
				refresh();
			}
		});
	}
}

function checkSampledata(data) {
	if (data.factoryCode == "" || data.factoryCode == "null") {
		swal("出厂编号不能为空");
		return false;
	}

	if (data.sampleName == "" || data.sampleName == "null") {
		swal("样品名称不能为空");
		return false;
	}

	if (data.specifications == "" || data.specifications == "null") {
		swal("型号/规格/代号不能为空");
		return false;
	}

	if (data.createTime == "" || data.createTime == "null") {
		swal("录入时间不能为空");
		return false;
	}

	return true;

}

// 刷新
function refresh() {
	$('#sampleTable').bootstrapTable('refresh', null);
}

// 删除交接单中的样品
function del(data) {
	var parame = {};
	// parame.ID=ID;
	parame.taskID = data.taskID;
	swal({
		title : "操作提示", // 弹出框的title
		text : "确定删除吗？", // 弹出框里面的提示文本
		type : "warning", // 弹出框类型
		showCancelButton : true, // 是否显示取消按钮
		confirmButtonColor : "#DD6B55",// 确定按钮颜色
		cancelButtonText : "取消",// 取消按钮文本
		confirmButtonText : "是的，确定删除！",// 确定按钮上面的文档
		closeOnConfirm : false
	}, function() {
		$.ajax({
			url : 'receiptlistController/deleteTaskByID.do',
			data : parame,
			dataType : "json",
			success : function(o) {
				if (o == false) {
					swal({
						title : "删除失败",
						type : 'warning'
					});
				}
				swal({
					title : "删除成功",
					type : 'success'
				});
				refresh();
			}
		});
	});
}

// 扫描录入样品
function automaticadd() {
	var qrcode;
	var ID;
	if (qrcode == null) {
		swal("录入失败，可选择手动录入");
	}
	var parame = {};
	parame.qrcode = qrcode;
	$.ajax({
		url : 'sampleController/getSampleInfor.do',
		data : parame,
		dataType : "json",
		success : function(o) {
			var data = JSON.parse(o);
			ID = data.ID;
			add(ID);
		}
	});

}

// 手动录入样品
function manualadd() {
	// $('input[type="text"]').val("");
	$('#add').modal('show');
}

function addSample() {
	var sampleCode = $('#add_sampleCode').val();
	isExitSample(sampleCode);
}

// 录入样品
function isExitSample(sampleCode) {
	var data;
	$.ajax({
		url : '/laboratorySystem/sampleController/getSampleByCode.do',
		dataType : "json",
		type : "post",
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
		async : false,
		data : {
			sampleCode : sampleCode
		},
		success : function(o) {
			var datas = JSON.parse(o);
			var ID = datas.sampleID;
			if (typeof ID !== 'undefined') {
				add(ID);
			} else {
				swal("该样品不存在");
			}
		}
	});
}

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
				swal({
					title : "添加失败",
					type : 'warning'
				});
			}
			$('#add').modal('hide');
			refresh();
		}
	});

}

// 修改交接单信息
function sure() {
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
					swal({
						title : "修改失败",
						type : 'warning'
					});
				} else {
					turnBack();
				}
			}
		});
	}
}

function checklistData(data) {
	if (data.linkMan == "" || data.linkMan == "null") {
		swal("交接人不能为空");
		return false;
	}
	if (data.linkPhone == "" || data.linkPhone == "null") {
		swal("联系电话不能为空");
		return false;
	}
	var phone = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
	if (!phone.test(data.linkPhone)) {
		swal("联系人电话格式不正确");
		return false;
	}
	if (data.createTime == "" || data.createTime == "null") {
		swal("录入时间不能为空");
		return false;
	}

	return true;
}

function checkeditdata(data) {
	if (data.linkMan == "" || data.linkMan == "null") {
		swal("交接人不能为空");
		return false;
	}

	var phone = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
	if (!phone.test(data.linkPhone)) {
		swal("联系人电话格式不正确");
		return false;
	}

	if (!isNoramlPhone(data.linkPhone)) {
		swal("联系人电话格式不正确");
		return false;
	}
	if (data.createTime == "" || data.createTime == "null") {
		swal("录入时间不能为空");
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
			if (o <= 0) {
				swal({
					title : "操作失败",
					type : 'warning'
				});
			} else {
				dele();
			}
		}
	});

}

function dele() {

	if (state == "edit") {
		turnBack();
	}

	if (state == "add") {
		$.ajax({
			url : '/laboratorySystem/receiptlistController/delReceiptlist.do',
			dataType : "json",
			data : {
				reIDs : reID
			},
			success : function(o) {
				if (o == false) {
					sweetAlert("", "删除失败", "error");
				} else {
					turnBack();
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

function checkData(dataObj) {
	if (!dataObj.hasOwnProperty("receiptlistCode")
			|| dataObj.receiptlistCode == null || dataObj.ID.trim() == "NULL") {
		dataObj.receiptlistCode = "";
	}
	if (!dataObj.hasOwnProperty("contractCode") || dataObj.contractCode == null
			|| dataObj.contractCode.trim() == "NULL") {
		dataObj.contractCode = "";
	}

	if (!dataObj.hasOwnProperty("linkMan") || dataObj.linkMan == null
			|| dataObj.linkMan.trim() == "NULL") {
		dataObj.linkMan = "";
	}

	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null
			|| dataObj.companyName.trim() == "NULL") {
		dataObj.companyName = "";
	}

	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null
			|| dataObj.linkPhone.trim() == "NULL") {
		dataObj.linkPhone = "";
	}

}

function checkSamplesData(dataObj) {
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

	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null
			|| dataObj.createTime.trim() == "NULL") {
		dataObj.createTime = "";
	}

}

// 返回
function turnBack() {
	window.history.back(-1);
}
