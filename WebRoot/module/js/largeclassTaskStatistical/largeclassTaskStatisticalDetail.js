$(function () {
	var ID = getURLParameter().ID;//大类ID
	var departmentID = getURLParameter().departmentID;//科室ID
	
	// 初始化表格
	
	$('#table').bootstrapTable({
		//定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'testProject.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'contractFineItemController/getLargeclassTaskStatisticalDetail.do',//服务器数据的加载地址
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
			    			ID: ID,//大类ID
			    			departmentID: departmentID//科室ID
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
			field:'ID',//返回值名称
			title:'检测项目ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'nameCn',//返回值名称
			title:'检测项目中文名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'30%'//宽度
		},{
			field:'nameEn',//返回值名称
			title:'检测项目英文名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'30%'//宽度
		},{
			field:'money',//返回值名称
			title:'金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

//返回按钮
$('#return').click(function(){
	window.location.href = window.location.href.split("?")[0].replace('largeclassTaskStatisticalDetail.jsp','largeclassTaskStatistical.jsp');
});
