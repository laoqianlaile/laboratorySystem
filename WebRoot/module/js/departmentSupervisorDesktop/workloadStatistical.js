$(function () {
	var ID = window.location.search.match(/\d+/i)[0];//交接单ID
	
	// 初始化表格
	var parame = {};
	
	parame.detector = $('#detector').val();
	parame.sampleName = $('#sampleName').val();
	parame.factoryCode = $('#factoryCode').val();
	parame.testProject = $('#testProject').val();
	
	$('#table').bootstrapTable({
		  //定义表格的高度height: 500,
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [3, 5, 10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'task.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'taskController/getWorkloadStatistical.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
			            parame.limit = params.limit;
						parame.offset = params.offset;
						parame.search = "";
						parame.sort = params.sort;
						parame.order = params.order;
						parame.ID = ID;
						return parame;  
		},
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'ID',//返回值名称
			title:'任务ID',//列名
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
			field:'detector',//返回值名称
			title:'检测人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		},{
			field:'factoryCode',//返回值名称
			title:'样品编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'sampleName',//返回值名称
			title:'名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'specifications',//返回值名称
			title:'型号/规格/代号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'nameCn',//返回值名称
			title:'检测/校准项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	
	// 搜索按钮点击事件
	$('#search').click(function (){
		var parame1 = {};
		
		parame1.detector = $('#detector').val();
		parame1.sampleName = $('#sampleName').val();
		parame1.factoryCode = $('#factoryCode').val();
		parame1.testProject = $('#testProject').val();
		
		$('#table').bootstrapTable('refresh',{
			silent: true,
			url: 'taskController/getWorkloadStatistical.do',
			query: parame1
		});
	});
	
	// 返回按钮
	$('#return').click(function(){
		window.location.href = window.location.href.split("?")[0].replace('workloadStatistical.jsp','departmentSupervisorDesktop.jsp');
	});
});
