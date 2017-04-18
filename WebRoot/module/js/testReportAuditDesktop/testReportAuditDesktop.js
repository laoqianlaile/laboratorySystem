var obj = {
	reID : "",
	order_c : 0,
	order_f : 0,
	order_t : 0
}

$(function () {
	// 获取当前登录人员的部门ID和部门名称
	$.ajax({
		url:'employeeController/getDepartmentInfo.do',
		dataType:'json',
		success:function(o){
			var data = JSON.parse(o);
			$('#departmentID').text(data[0].ID);
	  	}
	});
	
	// 初始化交接单表格
	initTable();
	
	// 初始化提醒信息表格
	initTidingsTable();
	
	initEvent();
	
	// 查看检测报告列表按钮点击事件
	$('#viewReportList').click(function (){
		var data = $('#table').bootstrapTable('getSelections');
		
		if(data.length==0 || data.length>1){
			swal({
				title: "请选中一条数据",
				type: 'warning'
			});
			return;
		}
		var receiptlistID = data[0].ID;
		window.location.href = window.location.href.replace('testReportAuditDesktop/testReportAuditDesktop.jsp','testReportManage/testReportManage.jsp') + '?ID='+receiptlistID;
	});
	
	// 审核检测报告按钮点击事件
	$('#auditReport').click(function (){
		var data = $('#table').bootstrapTable('getSelections');
		
		if(data.length==0 || data.length>1){
			swal({
				title: "请选中一条数据",
				type: 'warning'
			});
			return;
		}
		
		var ID = data[0].ID;
		window.location.href = window.location.href.replace('testReportAuditDesktop/testReportAuditDesktop.jsp','testReportSecondAuditManage/testReportSecondAuditManage.jsp') + '?ID='+ID;
	});
	
	// 打印报告按钮点击事件
	$('#printReport').click(function (){
		var data = $('#table').bootstrapTable('getSelections');                                      
		
		if(data.length==0 || data.length>1){
			swal({
				title: "请选中一条数据",
				type: 'warning'
			});
			return;
		}
		
		var ID = data[0].ID;
//		window.location.href = window.location.href.replace('departmentSupervisorDesktop/departmentSupervisorDesktop.jsp','taskAssignManage/taskAssign.jsp') + '?ID='+ID;
	});
	
	// 查看文档按钮点击事件
	$('#viewFile').click(function() {
		var data = $('#fileTable').bootstrapTable('getSelections');
		
		if(data.length == 0 || data.length > 1){
			swal({
				title: "请选择一个文档查看",
				type: 'warning'
			});
			return;
		} else {
			var fileID = data[0]; // 得到预览文件ID
			onlineView(fileID);
		}
	});
	
	// 下载文档按钮点击事件
	$('#downloadFile').click(function() {
		var data = $('#fileTable').bootstrapTable('getSelections');
		
		if (data.length == 0 || data.length > 1) {
			swal({
				title: "请选择一个文件下载",
				type: 'warning'
			});
			return;
		} else {
			var fileID = data[0].fileID;
			
			downOneFile(fileID);
		}
	});
});

// 初始化交接单表格
function initTable(){
	var departmentID = $('#departmentID').text();
	
	var parame = {};
	
	parame.state = -1;
	parame.assignState = -1;
	parame.ID = departmentID;
	
	$('#table').bootstrapTable({
		//定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'receiptlist.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'receiptlistController/getReceiptlistWithPagingInTaskAssign.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
			            parame.limit = params.limit;
						parame.offset = params.offset;
						parame.search = "";
						parame.sort = params.sort;
						parame.order = params.order;
						return parame;  
		},
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,//禁止多选
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'ID',//返回值名称
			title:'交接单ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'testReportCode',//返回值名称
			title:'检测报告编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'',//返回值名称
			title:'序号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
			formatter : function(value,row,index){
							return index+1;
						}
		},{
			field:'receiptlistCode',//返回值名称
			title:'交接单号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'70%'//宽度
		},{
			field:'assignState',//返回值名称
			title:'状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		}],//列配置项,详情请查看 列参数 表格
		/*事件*/
		onClickRow: function (row, tr) {
			$('#currentReportCode').text(row.testReportCode);
			refreshFileTable(row.ID);
		}
	});
}

// 刷新文件信息表格
function refreshFileTable(receiptlistID){
	$('#fileTable').bootstrapTable('destroy');
	$('#fileTable').bootstrapTable({
		//定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1, 3, 5],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'fileInformation.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'fileInformationController/getFileInTaskWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		    			var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
		    				limit: params.limit, //页面大小  
		    				offset: params.offset, //偏移量
			    			search: "",//初始化搜索文字
			    			sort: params.sort, //排序列名  
			    			order: params.order, //排位命令（desc，asc）
			    			ID:receiptlistID
		    			};  
		    			return temp;  
		    	  	},
	  	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,//禁止多选
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'',//返回值名称
			title:'序号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
			formatter : function(value,row,index){
							return index+1;
						}
		},{
			field:'ID',//返回值名称
			title:'文件ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'fileName',//返回值名称
			title:'文件名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'90%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
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
						url : 'messageController/getMessageByUserID.do',// 服务器数据的加载地址
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
										if (value === "未查看")
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
		    			url : 'messageController/readedMessageByID.do',
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

//验证提示信息数据
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

function onlineView() {
	displayDiv();
	var fileID = arguments[0];
	$.post("fileOperateController/onlinePreview.do", 
	{
		ID : fileID
	}, 
	function(result) {
		result = JSON.parse(result); 
		if (result != null && result != "null" && result != "") {
			window.location.href = "module/jsp/documentOnlineView.jsp";
		} else {
			hideDiv();
			alert("无法查看");
		}
	});
}
