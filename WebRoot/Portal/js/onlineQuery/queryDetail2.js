window.onload=function(){
	$(".fixed-table-pagination").addClass("IchangeStyle");
};
$(function(){
	$('#table').bootstrapTable({
		height:500,
		classes:'table table-hover table-condensed',
		clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect:true,
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'fileInformationController/getWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名//设置True 将禁止多选
		onClickRow:onClickRow,
	    columns:[{
	    	checkbox:true,
	    	visible:false
	    },{
	    	field:'ID',
	    	visible:false
	    },{
	    	field:'filename',
	    	visible:false
	    },{
	        field:'fileName',
	    }]
	});
});

function onClickRow(row){
	var fileID;
	fileID=row.ID;
	window.location.href="fileOperateController/filedownload.do?ID="+fileID;
}




