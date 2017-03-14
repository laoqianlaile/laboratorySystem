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
	
	//初始化交接单表格
	initTable();

	// 初始化提醒信息表格
	initMessageTable()
	
	// 查看报告按钮点击事件
	$('#viewReport').click(function (){
		
//		chen.alert('操作成功');
		
		chen.confirm('vvvv').then(isConfirm => {
			if (isConfirm) {
				// 点击删除按钮后要干的事
				chen.alert('操作成功');
			} else { // 点击取消按钮
				// 点击取消按钮后要干的事
			}
		}).catch(err => {
			console.log(err);
		});
		
//		var data = $('#table').bootstrapTable('getSelections');
//		
//		if(data.length==0 || data.length>1){
//			chen.alert("请选中一条数据");
//			return;
//		}
//		var receiptlistID = data[0].ID;
//		window.location.href = window.location.href.replace('departmentSupervisorDesktop/departmentSupervisorDesktop.jsp','testReportManage/testReportManage.jsp') + '?ID='+receiptlistID;
	});
	
	// 工作量统计按钮点击事件
	$('#workloadStatistical').click(function (){
		var data = $('#table').bootstrapTable('getSelections');
		
		if(data.length==0 || data.length>1){
			chen.alert("请选中一条数据");
			return;
		}
		
		var ID = data[0].ID;
		window.location.href = window.location.href.replace('departmentSupervisorDesktop.jsp','workloadStatistical.jsp') + '?ID='+ID;
	});
	
	// 分配任务按钮点击事件
	$('#assignTask').click(function (){
		var data = $('#table').bootstrapTable('getSelections');
		
		if(data.length==0 || data.length>1){
			chen.alert("请选中一条数据");
			return;
		}
		
		var ID = data[0].ID;
		window.location.href = window.location.href.replace('departmentSupervisorDesktop/departmentSupervisorDesktop.jsp','taskAssignManage/taskAssign.jsp') + '?ID='+ID;
	});
	
	// 查看文档按钮点击事件
	$('#viewFile').click(function() {
		var data = $('#fileTable').bootstrapTable('getSelections');
		
		if (data.length == 0 || data.length > 1) {
			chen.alert("请选择一个文档查看");
			return;
		} else {
			// todo...
		}
	});
	
	// 下载文档按钮点击事件
	$('#downloadFile').click(function() {
		var data = $('#fileTable').bootstrapTable('getSelections');
		
		if (data.length == 0) {
			chen.alert("请选择一个或多个文件下载");
			return;
		}
		if (data.length == 1) {
			var fileID = data[0].fileID;
			downOneFile(fileID);
			return;
		} else {
			var ids = [];
			var fileIDs = [];
			for ( var i = 0; i < data.length; i++) {
				ids.push(data[i].fileID);
			}
			fileDownAll(ids);
		}
		refresh();
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
			title:'分配状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		}],//列配置项,详情请查看 列参数 表格
		/*事件*/
		onClickRow: function (row, tr) {
			$('#receiptlistCode').text(row.receiptlistCode);
			
			refreshFileTable(row.ID);
		}
	});
}

// 刷新文件信息表格
function refreshFileTable(receiptlistID){
	$('#fileTable').bootstrapTable('destroy');
	$('#fileTable').bootstrapTable({
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

//初始化提醒信息表格
function initMessageTable() {
	var order = 1;
	$('#messageTable').bootstrapTable({
		//定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
//		sortName:'message.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'messageController/getMessageByUserID.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,//禁止多选
		columns : [{
			title : '序号 ',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '5%',// 宽度
			visible : true,
			formatter : function(value, row, index) {
				checkDataTiding(row);
				return order++;
			}
		},{
			field : 'mnID',// 返回值名称
			title : 'messageNoticeID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '0',// 宽度
			visible : false
		},{
			field : 'mID',// 返回值名称
			title : 'message ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '0',// 宽度
			visible : false
		},{
			field : 'content',// 返回值名称
			title : '消息内容',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '50%',// 宽度
		},{
			field : 'createTime',// 返回值名称
			title : '时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '35%'// 宽度
		},{
			field : 'state',// 返回值名称
			title : '操作',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			formatter : function(value, row, index) {
				if (value == "未查看")
					var look = "", edit = "", download = "";
				look = '<span onclick= "lookMessage(\''
						+ row.mnID
						+ '\')" data-toggle="tooltip" data-placement="top" title="确认查看"  class="icon-eye-open" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
				return look;
			}
		}]
	});
}

function lookMessage(ID){
	var isLook = confirm("确认已经查看信息！");
	if(isLook == true){
		$.ajax({
			url : 'messageController/readedMessageByID.do',
			dataType : "json",
			type : "post",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
			async : false,
			data : {
				messageNoticeID:ID
			},
			success : function(o) {
				
			},
			error : function() {
			}
		});
		$('#messageTable').bootstrapTable( 'refresh',null);
	}
}

//验证提示信息数据
function checkDataTiding(dataObj){
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
			|| dataObj.state.trim() == "NULL") {
		dataObj.remarks = "未查看";
	}
}


