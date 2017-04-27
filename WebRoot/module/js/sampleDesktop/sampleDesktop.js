/**
 * 
 */
var obj = {
	reID : "",
	order_c : 0,
	order_f : 0,
	order_t : 0
}
$(function() {
	initData();
	initEvent();
});
/*
 * 初始化表格数据
 */
function initData() {
	initContractTable();
	initFileTable();
	initTidingsTable();
}

function initContractTable() {

	$('.contractTable').bootstrapTable({
		striped : false,// 隔行变色效果
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
			obj.order_c = params.offset + 1; // 偏移量是从0开始
			param.sort = params.sort; // 排序列名
			param.order = params.order;// 排位命令（desc，asc）
			return param;
		}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',
		onClickRow : function(row, $element, field) { //更换选择的交接单获取相关文件
			$(".leftArea .row span").eq(1).text(row.coCode);
			if(row.reID != null && row.reID != undefined && row.reID != "")
			   {
				 getCurrentFile(row.reID);
			   }
		},
		onLoadSuccess : function(data) {
			console.log(data);
			if (data.total == 0) {  //展示第一个合同编号
				$(".leftArea .row span").eq(1).text("无");

			}
		},
		columns : [ {
			checkbox : true,
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '5%',// 宽度
			formatter : function(value, row, index) {
				checkData("cAndRe", row); // 验证数据合理性
			}
		}, {
			title : '序号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '5%',// 宽度
			visible : true,
			formatter : function(value, row, index) {

				if (index == 0 && row != null) {
					$(".leftArea .row span").eq(1).text(row.coCode);
					obj.reID = row.reID;
					
					if(row.reID != null && row.reID != undefined && row.reID != "")
					   {
						 getCurrentFile(row.reID);
					   }
				}
				return obj.order_c++;
			}
		}, {
			field : 'reID',// 返回值名称
			title : '交接单ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			visible : false
		}, {
			field : 'coID',// 返回值名称
			title : 'coID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			visible : false
		}, {
			field : 'proID',// 返回值名称
			title : '项目ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			visible : false
		}, {
			field : 'coCode',// 返回值名称
			title : '合同编号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '25%'// 宽度
		}, {
			field : 'cName',// 返回值名称
			title : '合同名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '20%'// 宽度
		}, {
			field : 'reCode',// 返回值名称
			title : '交接单编码',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '30%'// 宽度
		}, {
			field : 'reType',// 返回值名称
			title : '交接单类型',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '35%',// 宽度
			visible : false
		}, {
			field : 'allotState',// 返回值名称
			title : '状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '15%',// 宽度
			visible : false

		} ,
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
function initFileTable() {
	$('.fileTable')
			.bootstrapTable(
					{
						// 定义表格的高度height: 500,
						striped : false,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 5,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'ID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
						url : '/laboratorySystem/receiptlistController/getRelateFiletByReID.do',// 服务器数据的加载地址
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
							obj.order_f = params.offset + 1; // 偏移量是从0开始
							param.sort = params.sort; // 排序列名
							param.order = params.order;// 排位命令（desc，asc）
							param.reID = obj.reID;
							return param;
						}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名
						onClickRow : function(row, $element, field) {
							$(".RightArea .row .col-xs-7 span").eq(1).text(row.fileName);

						},
						onLoadSuccess : function(data) {
							if (data.total == 0) {
								$(".RightArea .row .col-xs-7 span").eq(1).text("无");
							}
						},
						columns : [
								{
									title : '序号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									visible : true,
									formatter : function(value, row, index) {
										checkData("file", row);
										if (index == 0 && row != null) {
											$(".RightArea .row .col-xs-7 span").eq(1).text(row.fileName);
										}
										return obj.order_f++;
									}
								}, {
									field : 'ID',// 返回值名称
									title : 'fileID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%',// 宽度
									visible : false
								}, {
									field : 'fileName',// 返回值名称
									title : '文件名',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '35%',// 宽度
								}, {
									field : 'remarks',// 返回值名称
									title : '备注',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '30%'// 宽度
								},
								{
									field : 'uploadTime',// 返回值名称
									title : '上传时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '30%'// 宽度
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
}
function initTidingsTable() {
	$('.tidingsTable')
			.bootstrapTable(
					{
						striped : false,// 隔行变色效果
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
							obj.order_t = params.offset + 1; // 偏移量是从0开始
							param.sort = params.sort; // 排序列名
							param.order = params.order;// 排位命令（desc，asc）
							param.isRead = false;
							return param;
						}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名
						onLoadSuccess : function(data) {
						},
						columns : [
								{
									title : '序号 ',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									visible : true,
									formatter : function(value, row, index) {
										checkData("tiding", row);
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
// 得到交接单的关联文件
function getCurrentFile(reID) {
	if (reID == "" || reID == undefined || reID == null) {
                  
	} else {
		obj.reID = reID;
		$('.fileTable').bootstrapTable('refresh',
						{
							silent : false,
							url : "/laboratorySystem/receiptlistController/getRelateFiletByReID.do",
							query : {
								reID : reID
							}
						});
	}
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
/*
 * 
 * 
 * 按钮图标选择事件
 */
// 查看交接单
function viewRe() {
	var data = $('.contractTable').bootstrapTable('getSelections');
	// 弹出确认框
	if (data.length == 1) {
			 window.location = "module/jsp/receiptlistManage/receiptlistView.jsp?reID="
				+ data[0].reID;
		return;
	} else {
		sweetAlert("请选中一条数据");
		return;
	}

}
//查看检测进度
function showTestProcess(){
	
	var datas = $('.contractTable').bootstrapTable('getSelections');
	if(datas.length == 1){
		var data = datas[0];
		dealColorShow(data);
		$("#testProcessModal").modal('show');
	}else{
		sweetAlert("请选中一条数据");
	}
	

	
}
//
function dealColorShow(data){
	var reState = data.reState;
	var allotState = data.allotState;
	if(reState != "无交接单"){
		switch (allotState)
		  {
		  case 0:
			  $(".lineImg").removeClass("fail");
			  $(".iconImg").removeClass("fail");
			  for(var i = 1 ; i <= 5 ;i++){
				  $(".lineImg").eq(i).addClass("fail");
				  $(".iconImg").eq(i).addClass("fail");
			  }
			  $(".iconImg").eq(6).addClass("fail");
		    break;
		  case 1:
			  $(".lineImg").removeClass("fail");
			  $(".iconImg").removeClass("fail");
			  for(var i = 3 ; i <= 5 ;i++){
				  $(".lineImg").eq(i).addClass("fail");
				  $(".iconImg").eq(i).addClass("fail");
			  }
			  $(".iconImg").eq(6).addClass("fail");
		    break;
		  case 2:
			  switch (reState)
			  {
			  case "无交接单":
				  $(".lineImg").addClass("fail");
				  $(".iconImg").addClass("fail");
			    break;
			  case "未检测":
				  $(".lineImg").removeClass("fail");
				  $(".iconImg").removeClass("fail");
				  for(var i = 2 ; i <= 5 ;i++){
					  $(".lineImg").eq(i).addClass("fail");
					  $(".iconImg").eq(i).addClass("fail");
				  }
				  $(".iconImg").eq(6).addClass("fail");
			    break;
			  case "检测中":
				  $(".lineImg").removeClass("fail");
				  $(".iconImg").removeClass("fail");
				  $(".iconImg").eq(6).addClass("fail");
			    break;
			  case "检测完成":
				  $(".lineImg").removeClass("fail");
				  $(".iconImg").removeClass("fail");

			    break;
			  
			  }
		    break;
		 
		  }
	}else{
		 $(".lineImg").addClass("fail");
		 $(".iconImg").addClass("fail");
	}
	
}
// 编辑交接单
function editRe() {
	var data = $('.contractTable').bootstrapTable('getSelections');

	// 弹出确认框
	if (data.length == 1) {
		var reObj = data[0];
		if (reObj.reType == "接受")
			window.location.href = "./addRecelist.jsp?reID=" + reObj.reID
					+ "&coID=" + reObj.coID + "&comID=" + reObj.comID
					+ "&coCode=" + reObj.coCode + "&addState=no&reCode="
					+ reObj.reCode + "&lookState=edit";
		// 退还样品-交接单编辑的页面
		else {
			window.location.href = "./receiptlistReturn.jsp?reID=" + reObj.reID
					+ "&coID=" + reObj.coID + "&comID=" + reObj.comID
					+ "&coCode=" + reObj.coCode + "&state=edit";
		}
	} else {
		sweetAlert("请选中一条数据");
		return;
	}

}
// 发送检测报告页面
function sendTestreport() {
	window.location.href = "module/jsp/testReportManage/testReportSendRecordManage.jsp"
}
//内部领样-退样管理
function takeSample(){
	window.location.href= "module/jsp/sampleRecordManage/sampleRecordManage.jsp";
}
//查看检测报告列表
function viewTestreport(){
	window.location.href= "module/jsp/testReportManage/testReportManage.jsp";
}
// 有合同新增--接受类交接单
function addRe() {
	var data = $('.contractTable').bootstrapTable('getSelections');
	if (data.length == 0 || data.length > 1) {
		sweetAlert("请选中一条数据");
		return;
	}
	sweetAlert({
		  title: "Are you sure?",
		  text: "确认有合同新增交接单!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否"
		
		}, function(isConfirm){
		        if(isConfirm){
		        	var result = initAddReceiptlist(data[0], "yes"); // 创建交接单跳转
		        	window.location.href = "./addRecelist.jsp?reID=" + result.reID + "&coID="
		        			+ data[0].coID + "&comID=" + data[0].comID + "&coCode="
		        			+ data[0].coCode + "&addState=yes&reCode=" + result.reCode
		        			+ "&proID=" + data[0].proID;
		        }
		});


}
// 创建交接单 --各种类型
function initAddReceiptlist(data, state) {
	var param = deepCopy(data);
	var result;
	param.state = state;
	$.ajax({
		url : '/laboratorySystem/receiptlistController/addReceiptList.do',
		dataType : "json",
		type : "post",
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
		async : false,
		data : param,
		success : function(o) {
			result = JSON.parse(o);
			console.log(result);
		},
		error : function() {
			sweetAlert(""," 创建交接单失败 ","error");
		}
	});
	return result;
}
// 无合同新增--接受类交接单
function addReNo() {
	// 在这里创建新的合同
	
	sweetAlert({
		  title: "Are you sure?",
		  text: "确认无合同新增交接单!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否"
		
		}, function(isConfirm){
		        if(isConfirm){
		        	var result = initAddReceiptlist({}, "no"); // 创建交接单跳转
		        	window.location.href = "./addRecelist.jsp?reID=" + result.reID + "&coID="
		        			+ result.coID + "&comID=" + "" + "&coCode=" + result.coCode
		        			+ "&addState=no&reCode=" + result.reCode + "&proID=" + result.proID;
		        }
		});

}

// 有合同--退还类交接单
function returnSample() {
	var data = $('.contractTable').bootstrapTable('getSelections');
	if (data.length == 0 || data.length > 1) {
		sweetAlert("请选中一条数据");
		return;
	}
	if (data[0].comID == null || data[0].comID == "") {
		sweetAlert("此时你还没有样品可以退");
	}
	
	sweetAlert({
		  title: "Are you sure?",
		  text: "确认新增退还交接单!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否"
		
		}, function(isConfirm){
		        if(isConfirm){
		        	var result = initAddReceiptlist(data[0], "return");
		        	window.location.href = "../../receiptlistManage/receiptlistReturn.jsp?reID=" + result.reID
		        			+ "&coID=" + result.coID + "&comID=" + "" + "&coCode="
		        			+ result.coCode + "&state=add&reCode=" + result.reCode;
		        }
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
function checkData(who, dataObj) {
	switch (who) {
	case "cAndRe":
		checkDataRe(dataObj);
		break;
	case "file":
		checkDataFile(dataObj);
		break;
	case "tiding":
		checkDataTiding(dataObj);
		break;
	default:
		break;
	}
}

// 验证合同交接单数据
function checkDataRe(dataObj) {
	if (!dataObj.hasOwnProperty("reID") || dataObj.reID == null
			|| dataObj.reID.trim() == "NULL") {
		dataObj.reID = "";
	}
	if (!dataObj.hasOwnProperty("reState") || dataObj.reState == null
			|| dataObj.reState.trim() == "NULL") {
		dataObj.reState = "无交接单";
	}
	if (!dataObj.hasOwnProperty("reType") || dataObj.reType == null
			|| dataObj.reType.trim() == "NULL") {
		dataObj.reType = "接受";
	}
	if (!dataObj.hasOwnProperty("reCode") || dataObj.reCode == null
			|| dataObj.reCode.trim() == "NULL") {
		dataObj.reCode = "";
	}
	if (!dataObj.hasOwnProperty("coID") || dataObj.coID == null
			|| dataObj.coID.trim() == "NULL") {
		dataObj.coID = "";
	}
	if (!dataObj.hasOwnProperty("coCode") || dataObj.coCode == null
			|| dataObj.coCode.trim() == "NULL") {
		dataObj.coCode = "";
	}
	if (!dataObj.hasOwnProperty("cName") || dataObj.cName == null
			|| dataObj.cName.trim() == "NULL") {
		dataObj.cName = "";
	}

}

// 验证交接单文件信息数据
function checkDataFile(dataObj) {
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
// 验证提示信息数据
function checkDataTiding(dataObj) {
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
