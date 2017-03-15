var setcount;
$(function(){
	$('#table').bootstrapTable({
		height:500,
		classes:'table table-hover',
		striped: true,
		clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect:true, //禁止多行选择
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1,5, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
	//	sortName:'taskname',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'taskController/getWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名//设置True 将禁止多选
	    columns: [{
	        field:'taskname',
	        title:'<span class="columns_titlefont" name="chang_title">检测报告</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:'120',
	    },{
	        field: '1',
	        title:'<span class="columns_titlefont" name="chang_title">委托单登记</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:''
	    },{
	        field: '2',
	        title:'<span class="columns_titlefont" name="chang_title">检测方案确定</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:''
	    },{
	        field: '3',
	        title:'<span  class="columns_titlefont" name="chang_title">样品领用</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:'60'
	    },{
	        field: '4',
	        title:'<span class="columns_titlefont" name="chang_title">检验</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:'80'
	    },{
	        field: '5',
	        title:'<span class="columns_titlefont" name="chang_title">录入原始数据</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:''
	    },{
	        field: '6',
	        title:'<span class="columns_titlefont" name="chang_title">原始数据审核</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:''
	    },{
	        field: '7',
	        title:'<span class="columns_titlefont" name="chang_title">生成检测报告</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:''
	    },{
	        field: '8',
	        title:'<span class="columns_titlefont" name="chang_title">检测报告审核</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:''
	    },{
	        field: '9',
	        title:'<span class="columns_titlefont" name="chang_title">打印报告</span>',
	        align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
	        width:''
	    }]
	});
	$(".columns_titlefont").parent().css({"background":"#f6f6f6"});
	changestyle();
});

function changestyle(){
	clearTimeout(setcount);
	$(".liucheng").parent().css({"background":"#198ac8","opacity":"0.4","filter":"alpha(opacity=75)"});
	setcount=setTimeout("changestyle()",900);
}