$(function () {
	var ID = getURLParameter().ID;//检测项目ID
	
	// 初始化表格
	var parame = {};
	
	parame.contractCode = $('#contractCode').val();
	parame.receiptlistCode = $('#receiptlistCode').val();
	parame.companyName = $('#companyName').val();
	parame.startTime = $('#acceptSampleTime_start').val();
	parame.endTime = $('#acceptSampleTime_end').val();
	parame.sampleName = $('#sampleName').val();
	
	$('#table').bootstrapTable({
		  //定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择 rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'contract.contractCode',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'contractFineItemController/getTaskStatisticalDetail.do',//服务器数据的加载地址
		sidePagination:'server',//   送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
			            parame.limit = params.limit;
						parame.offset = params.offset;
						parame.search = "";
						parame.sort = params.sort;
						parame.order = params.order;
						parame.ID = ID;// 检测项目ID
						return parame;  
		},
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'ID',//返回值名称
			title:'合同细项ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'contractCode',//返回值名称
			title:'合同编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'receiptlistCode',//返回值名称
			title:'交接单号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		},{
			field:'companyName',//返回值名称
			title:'甲方单位',//列名
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
			field:'factoryCode',//返回值名称
			title:'样品编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'sampleName',//返回值名称
			title:'样品名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'specifications',//返回值名称
			title:'型号/规格/代号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'detector',//返回值名称
			title:'检测人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'startTime',//返回值名称
			title:'开始时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'completeTime',//返回值名称
			title:'完成时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	
	// 查询按钮点击事件
	$('#search').click(function (){
		var parame1 = {};
		
		parame1.contractCode = $('#contractCode').val();
		parame1.receiptlistCode = $('#receiptlistCode').val();
		parame1.companyName = $('#companyName').val();
		parame1.acceptSampleTime_start = $('#acceptSampleTime_start').val();
		parame1.acceptSampleTime_end = $('#acceptSampleTime_end').val();
		parame1.sampleName = $('#sampleName').val();
		
		$('#table').bootstrapTable('refresh',{
			silent: true,
			url: 'contractFineItemController/getTaskStatisticalDetail.do',
			query: parame1
		});
	});
	
	//返回按钮
	$('#return').click(function(){
		window.location.href = window.location.href.split("?")[0].replace('taskStatisticalDetail.jsp','taskStatistical.jsp');
	});
});
