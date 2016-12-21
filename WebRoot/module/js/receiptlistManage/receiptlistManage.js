/**
 * 
 */

var param = {
	reCode : $('#schReCode').val(),// 初始化搜索文字 schReCode
	coCode : $('#schCoCode').val(),
	companyName : $("#schCompnyName").val(),
	reType : $('#schReType').val(),
	linkMan : $('#schLinkMan').val(),
	startTime : $('#schStratTime').val(),
	endTime : $("#schEndTime").val(),
	state : $("#schState").val()
}
var globl = {
	proID : "",
}
/* 初始化数据 */
$(function() {
	// public JSONObject getReceiptlistWithPaging(String reCode,String
	// coCode,String companyName,String reType,String linkMan,String
	// startTime,String endTime,String state,int limit, int offset, String
	// order, String sort){

	$('#table')
			.bootstrapTable(
					{
						// 定义表格的高度height: 500,
						striped : true,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 3,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 3, 5, 9, 10 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
												// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'ID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
						url : '/laboratorySystem/receiptlistController/getReceiptlistWithPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						method : "post",
						contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : function queryParams(params) {
							param.limit = params.limit;// 页面大小
							param.offset = params.offset; // 偏移量
							param.search = "";
							param.sort = params.sort; // 排序列名
							param.order = params.order; // 排位命令（desc，asc）
							return param;
						}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						// 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名
						onLoadSuccess : function(data) {
							console.log(data);
						},
						columns : [
								{
									checkbox : true,
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									formatter : function(value, row, index) {
										 checkData(row);									}
								},
								{
									field : 'reID',// 返回值名称
									title : '交接单ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'coID',// 返回值名称
									title : '合同ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'proID',// 返回值名称
									title : '项目ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'reCode',// 返回值名称
									title : '交接单号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%'// 宽度
								},
								{
									field : 'coCode',// 返回值名称
									title : '合同编号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%'// 宽度
								},
								{
									field : 'companyName',// 返回值名称
									title : '委托单位',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'linkMan',// 返回值名称
									title : '委托人',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'linkPhone',// 返回值名称
									title : '联系电话',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'startTime',// 返回值名称
									title : '履行时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'endTime',// 返回值名称
									title : '结束时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'employeeName',// 返回值名称
									title : '样品管理员',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'reType',// 返回值名称
									title : '类型',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '3%'// 宽度
								},
								{
									field : 'state',// 返回值名称
									title : '检测/校准进度',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								},
								{
									field : 'remarks',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '12%',// 宽度
									formatter : function(value, row, index) {
										var look = "", edit = "", cancel = "";
										if(row.ID != ""){ 
											
										look = '<span onclick= "lookRe(\''
												+ row.ID
												+ '\')" data-toggle="tooltip" data-toggle="top"  title="查看"  class="icon-eye-open" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
										if(row.isEditSample == 1)
										{    
											if(row.reType != "接受")
											  edit = '<span  onclick= "editRe(\''
												+ row.ID+"\' , \'"+row.coID+"\',\'"+row.comID+"\',\'"+row.coCode+"\',\'"+row.reCode+"\',\'"+"recive\'"
												+ ')" data-toggle="tooltip" data-placement="top" title="修改" class="glyphicon glyphicon-edit" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span> ';
											else  edit = '<span  onclick= "editRe(\''
												+ row.ID+"\' , \'"+row.coID+"\',\'"+row.comID+"\',\'"+row.coCode+"\',\'"+row.reCode+"\',\'"+"return\'"
												+ ')" data-toggle="tooltip" data-placement="top" title="修改" class="glyphicon glyphicon-edit" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span> ';
										
										}
											  if (row.state == "未检测")
											cancel = '<span onclick= "deleteRe(\''
													+ row.ID
													+ '\')" data-toggle="tooltip" data-placement="top" title="删除"  class="glyphicon glyphicon-remove" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>'
										}
										return look + edit + cancel;
									}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
});
// 有合同新增
function addRe() {
	var data = $('#table').bootstrapTable('getSelections');
	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}
	// error
	var result = initAddReceiptlist(data[0],"yes");
	console.log(data);
	console.log(data[0]);
	window.location.href = "./addRecelist.jsp?reID="+result.reID+"&coID=" + data[0].coID + "&comID="
			+ data[0].comID + "&coCode=" + data[0].coCode
			+ "&addState=yes&reCode=" + result.reCode;

}
function initAddReceiptlist(data,state) {
	var param = deepCopy(data);
	var result ;
	    param.state = state;
          $.ajax({
				url : '/laboratorySystem/receiptlistController/addReceiptList.do',
				dataType : "json",
				type : "post",
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
				async : false,
				data : param,
				success : function(o) {
					 result  = JSON.parse(o);
					console.log(result);
				},
				error : function() {
					alert(" initAddReceipt faile");
				}
          });
          return result;
}
// 无合同新增
function addReNo() {
	// 在这里创建新的合同
	var result = initAddReceiptlist({},"no");
	window.location.href = "./addRecelist.jsp?reID="+result.reID+"&coID=" + result.coID + "&comID="
			+ "" + "&coCode=" + result.coCode
			+ "&addState=no&reCode=" + result.reCode;
}


// 新增退还交接单
function returnSample() {
	var data = $('#table').bootstrapTable('getSelections');
	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}
	window.location.href = "receiptlistReturn.jsp";
}
// 查看页面
function lookRe(id) {
	
	window.location = "./receiptlistView.jsp?reID=" + id;
	
}
// 获取浏览器传入的参数并创建对象(这边未作异常处理)

function editRe(reID,coID,comID,coCode,reCode,state) {
	window.location.href = "./addRecelist.jsp?reID="+reID+"&coID=" + coID + "&comID="
	+ comID + "&coCode=" + coCode
	+ "&addState=no&reCode=" + reCode+"&lookState=edit";
	if(state == "recive")  //接受交接单编辑的页面
		window.location = "./receiptlistView.jsp?reID=" + id;
		else { //退还样品-交接单编辑的页面
			
		}
}
/* 查询方法 */
function seacher() {
	// 查询的时候 他的limit 会依据页面上的数保留 不会变0
	var param = {};
	param.reCode = $('#schReCode').val();// 初始化搜索文字
	param.coCode = $('#schCoCode').val();
	param.companyName = $("#schCompnyName").val();
	param.reType = $('#schReType').val();
	param.linkMan = $('#schLinkMan').val();
	param.startTime = $('#schStratTime').val();
	param.endTime = $("#schEndTime").val();
	param.state = $("#schState").val();
	$('#table')
			.bootstrapTable(
					'refresh',
					{
						silent : true,
						url : "/laboratorySystem/receiptlistController/getReceiptlistWithPaging.do",
						query : param
					});
}

/* 刷新方法 */
function refresh() {
	/*
	 * $("#schSampleName").val(""); $('#schSampleType').val("");
	 * $('#schStartTime').val(""); $('#schEndTime').val("");
	 */
	var param = {};
	param.reCode = "";// 初始化搜索文字
	param.coCode = "";
	param.companyName = "";
	param.reType = "";
	param.linkMan = "";
	param.startTime = "";
	param.endTime = "";
	param.state = "";
	$('#table')
			.bootstrapTable(
					'refresh',
					{
						silent : false,
						url : "/laboratorySystem/receiptlistController/getReceiptlistWithPaging.do",
						query : param
					});
}

/* 删除方法 */
function deleteRe(id) {
	var isDelete = confirm("确认删除");
	if (isDelete == true) {
		$.ajax({
			url : '/laboratorySystem/receiptlistController/delReceiptlist.do',
			dataType : "json",
			data : {
				reID : id
			},
			success : function(o) {
				if (o == false) {
					alert("删除失败");
				} else {
					alert("删除成功");
					$('#table').bootstrapTable('refresh',null);
				}
				
			}
		});

	}

}


// 检查数据是否合理
function checkData(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("proID") || dataObj.proID == null
			|| dataObj.proID.trim() == "NULL") {
		dataObj.proID = "";
	}
	
	if (!dataObj.hasOwnProperty("coCode") || dataObj.coCode == null
			|| dataObj.coCode.trim() == "NULL") {
		dataObj.coCode = "";
	}
	if (!dataObj.hasOwnProperty("isEditSample") || dataObj.isEditSample == null //|| dataObj.isEditSample.trim() == "NULL" 
			) {
		dataObj.isEditSample = "1";
	}
	if (!dataObj.hasOwnProperty("comID") || dataObj.comID == null
			|| dataObj.comID.trim() == "NULL") {
		dataObj.comID = "";
	}
	if (!dataObj.hasOwnProperty("reCode") || dataObj.reCode == null
			|| dataObj.reCode.trim() == "NULL") {
		dataObj.reCode = "";
	}
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null
			|| dataObj.companyName.trim() == "NULL") {
		dataObj.companyName = "";
	}
	if (!dataObj.hasOwnProperty("linkMan") || dataObj.linkMan == null
			|| dataObj.linkMan.trim() == "NULL") {
		dataObj.linkMan = "";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null
			|| dataObj.startTime.trim() == "NULL") {
		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("endTime") || dataObj.endTime == null
			|| dataObj.endTime.trim() == "NULL") {
		dataObj.endTime = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null
			|| dataObj.employeeName.trim() == "NULL") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null
			|| dataObj.linkPhone.trim() == "NULL") {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("reType") || dataObj.reType == null
			|| dataObj.reType.trim() == "NULL") {
		dataObj.reType = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null
			|| dataObj.state.trim() == "NULL") {
		dataObj.state = "";
	}
}
/*function fillLookEdit(id) {
	var dataS = getOneDate(id);
	alert("2");
	console.log(dataS);
	checkData(dataS);

	// 填充查看页面的
	$('#lookSampleName').val(dataS.name);
	$('#lookSampleType').val(dataS.type);
	$('#lookUnit').val(dataS.unit);
	$('#lookRemarks').val(dataS.remarks);
	$('#lookCreateTime').val(dataS.createTime);
	$('#lookTakeMan').val(dataS.takeMan);
	$('#lookGiveMan').val(dataS.giveMan);
	$("#lookFactoryCode").val(dataS.factoryCode);
	$('#lookReceiptlistCode').val(dataS.receiptlistCode);
	// 填充编辑页面的
	$('#editSampleName').val(dataS.name);
	$('#editSampleType').val(dataS.type);
	$('#editUnit').val(dataS.unit);
	$('#editRemarks').val(dataS.remarks);
	$('#editCreateTime').val(dataS.createTime);
	$('#editTakeMan').val(dataS.takeMan);
	$('#editGiveMan').val(dataS.giveMan);
	$("#editFactoryCode").val(dataS.factoryCode);
	$('#editReceiptlistCode').val(dataS.receiptlistCode);

}*/
/*function getOneDate(id) {
	var dataS;
	$.ajax({
		type : "post",
		async : false,
		url : '/laboratorySystem/sampleController/getSample.do',
		contentType : "application/x-www-form-urlencoded; charset=UTF-8", // 中文乱码
		data : {
			sampleID : id
		},
		dataType : "json",
		success : function(data) {
			dataS = eval("(" + data + ")");
		}
	});
	return dataS;
}*/
/* 弹出修改弹框方法 */
/*function openModal() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}
	// var ids = data[0].ROLEID;
	fillLookEdit(data[0].ID);
	$('#editModal').modal('show');
}*/
