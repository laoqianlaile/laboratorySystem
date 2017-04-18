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
	
	// 初始化表格
	var parame = {};
	
	parame.receiptlistCode = $('#receiptlistCode').val();
	parame.contractCode = $('#contractCode').val();
	parame.companyName = $('#companyName').val();
	parame.linkMan = $('#linkMan').val();
	parame.acceptSampleTime_start = $('#acceptSampleTime_start').val();
	parame.acceptSampleTime_end = $('#acceptSampleTime_end').val();
	parame.state = parseInt($('#state').val());
	parame.assignState = parseInt($('#assignState').val());
	parame.departmentID = $('#departmentID').text();
	
	$('#table').bootstrapTable({
		  //定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
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
			field:'contractCode',//返回值名称
			title:'合同编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'receiptlistCode',//返回值名称
			title:'交接单号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		},{
			field:'companyName',//返回值名称
			title:'委托单位',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'linkMan',//返回值名称
			title:'委托人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'createTime',//返回值名称
			title:'委托时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'completeTime',//返回值名称
			title:'完成时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'employeeName',//返回值名称
			title:'样品管理员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'state',//返回值名称
			title:'检测/校准进度',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'assignState',//返回值名称
			title:'分配状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'operate',//返回值名称
			title:'操作',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
			formatter:function(value,row,index){  
				var temp = '';
				if(row.assignState === "未分配"){
					var btn_assign = '<img src="module/img/edit_icon.png" onclick="taskAssign(\'' + row.ID + '\')" data-toggle="tooltip" data-placement="top" title="分配" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></img>';
					var btn_viewProgress = '<img src="module/img/view_icon.png" onclick="checkTaskProgress(\'' + row.ID + '\',\'' + row.receiptlistCode + '\')" data-toggle="tooltip" ddata-placement="top"  title="查看任务进度"  style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></img>';
					temp += btn_assign + btn_viewProgress;
				}else{
					var btn_viewProgress = '<img src="module/img/view_icon.png" onclick="checkTaskProgress(\'' + row.ID + '\',\'' + row.receiptlistCode + '\')" data-toggle="tooltip" data-placement="top"  title="查看任务进度" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></img>';
					temp += btn_viewProgress;
				}
		  		return temp;
          } 
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	
	// 查询按钮点击事件
	$('#search').click(function (){
		var parame1 = {};
		
		parame1.receiptlistCode = $('#receiptlistCode').val();
		parame1.contractCode = $('#contractCode').val();
		parame1.companyName = $('#companyName').val();
		parame1.linkMan = $('#linkMan').val();
		parame1.acceptSampleTime_start = $('#acceptSampleTime_start').val();
		parame1.acceptSampleTime_end = $('#acceptSampleTime_end').val();
		parame1.state = parseInt($('#state').val());
		parame1.assignState = parseInt($('#assignState').val()); 
		
		$('#table').bootstrapTable('refresh',{
			silent: true,
			url: 'receiptlistController/getReceiptlistWithPagingInTaskAssign.do',
			query: parame1
		});
	});
	
	// 刷新显示全部信息点击事件
	$('#all').click(function() {
		var parame1 = {};
		
		parame1.receiptlistCode = '';
		parame1.contractCode = '';
		parame1.companyName = '';
		parame1.linkMan = '';
		parame1.acceptSampleTime_start = '';
		parame1.acceptSampleTime_end = '';
		parame1.state = -1;
		parame1.assignState = -1;
		
		$('#table').bootstrapTable('refresh',{
			silent: true,
			url: 'receiptlistController/getReceiptlistWithPagingInTaskAssign.do',
			query: parame1
		});
		
		// 清空输入表单
		$('input').val('');
		$('select').val(-1);
	});
	
});

// 任务分配方法
function taskAssign(ID){
	window.location.href = window.location.href.replace('taskAssignManage.jsp','taskAssign.jsp') + '?ID='+ID;
}	

// 查看交接单进度
function checkTaskProgress(ID,receiptlistCode){
	window.location.href = window.location.href.replace('taskAssignManage.jsp','checkTaskProgress.jsp') + '?ID='+ID + '&receiptlistCode='+receiptlistCode;
}
