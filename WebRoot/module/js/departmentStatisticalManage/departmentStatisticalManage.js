$(function () {
	
	// 初始化检测项目表格
	$('#table').bootstrapTable({
		//定义表格的高度height: 500,
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1, 3, 5],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'department.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'contractFineItemController/getContentInDepartmentStatisticalManage.do',//服务器数据的加载地址
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
		    			};  
		    			return temp;  
		    	  	},
	  	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			width:'10%'//宽度
		},{
			field:'ID',//返回值名称
			title:'科室ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'departmentName',//返回值名称
			title:'科室名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'25%'//宽度
		},{
			field:'money',//返回值名称
			title:'金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'number',//返回值名称
			title:'数目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'operate',//返回值名称
			title:'操作',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'25%',//宽度
			formatter:function(value,row,index){  
				var btn_detail = '<button type="button" onclick="viewDetail(\''+ row.ID +'\')" class="btn btn-primary glyphicon glyphicon-show">&nbsp;查看详细</button>&nbsp';
					return btn_detail;  
            } 
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});

	// 刷新按钮点击事件
	$('#refresh').click(function(){
		$('#table').bootstrapTable('refresh',{
			silent: true,
			url: 'contractFineItemController/getContentInDepartmentStatisticalManage.do',
			query: {}
		});
	});
});

//查看详情
function viewDetail(ID){
	window.location.href = window.location.href.replace('departmentStatisticalManage.jsp','departmentStatisticalManageDetail.jsp') + '?ID='+ID ;
}
