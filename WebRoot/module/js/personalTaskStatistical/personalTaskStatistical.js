$(function () {
	// 初始化科室和人员下拉选择框
	$.ajax({
		url:'departmentController/getDepartmentName.do',
		dataType:'json',
		success:function(o){
			var data = JSON.parse(o);
			var html;
			for(var i = 0;i<data.length;i++){
				html += '<option value = "' + data[i].ID + '">' + data[i].departmentName + '</option>'; 
			}
			$('#department').append(html);
	  	}
	});
	
	$('#department').change(function() {
		var employeeID = $(this).val().trim();
		$('#employee').empty();
		$('#employee').append('<option value="-1"></option>');
		$.ajax({
			url:'employeeController/getEmployeeNameInPersonalTask.do',
			dataType:'json',
			data: {
				ID: employeeID
			},
			success:function(o){
				var data = JSON.parse(o);
				var html;
				for(var i = 0;i<data.length;i++){
					html += '<option value = "' + data[i].ID + '">' + data[i].employeeName + '</option>'; 
				}
				$('#employee').append(html);
		  	}
		});
	});
	
	// 获取当前登录人员信息
	var employeeID = '';
	$.ajax({
		url:'employeeController/getEmployeeID.do',
		dataType:'json',
		async:false,
		success:function(data){
			employeeID = data;
	  	}
	});
	
	var type = $('#type').val().trim();
	
	// 初始化检测项目表格
	$('#table').bootstrapTable({
		//定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'task.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'contractFineItemController/getPersonalTaskStatistical.do',//服务器数据的加载地址
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
			    			ID: employeeID,//检测人员ID
			    			type: type
		    			};  
		    			return temp;  
		    	  	},
	  	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,// 禁止多选
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
			field:'sampleName',//返回值名称
			title:'样品名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'25%'//宽度
		},{
			field:'nameCn',//返回值名称
			title:'检测项目中文名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'25%'//宽度
		},{
			field:'nameEn',//返回值名称
			title:'检测项目英文名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'25%'//宽度
		},{
			field:'laborHour',//返回值名称
			title:'工时',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'type',//返回值名称
			title:'任务类型',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	
	// 查询按钮点击事件
	$('#search').click(function(){
		// 获取当前登录人员信息
		var employeeID = '';
		$.ajax({
			url:'employeeController/getEmployeeID.do',
			dataType:'json',
			async:false,
			success:function(data){
				employeeID = data;
		  	}
		});
		
		var type = $('#type').val().trim();
		employeeID = ($('#employee').val() === '-1' ? employeeID : $('#employee').val());
		
		$('#table').bootstrapTable('refresh',{
			silent: true,
			url: 'contractFineItemController/getPersonalTaskStatistical.do',
			query: {
				ID: employeeID,
				type: type
			}
		});
	});
	
	// 刷新按钮点击事件
	$('#refresh').click(function(){
		$('#table').bootstrapTable('refresh',{
			silent: true,
			url: 'contractFineItemController/getPersonalTaskStatistical.do',
			query: {}
		});
	});
	
});
