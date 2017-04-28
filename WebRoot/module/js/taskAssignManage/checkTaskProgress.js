$(function () {
	console.log(window.location.href);
	var ID = getUrlParam("ID");// 交接单ID
	var receiptlistCode = getUrlParam("receiptlistCode");// 交接单编号
	$('#receiptlistCode span').text(receiptlistCode);
	console.log(ID);
	console.log(receiptlistCode);
	
	// 初始化表格
	
	$('#table').bootstrapTable({
		  //定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数	
		pageNumber:1,//首页页码
		pageList: [5, 10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'task.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'taskController/getTaskProgressWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						var parame = {};
			            parame.limit = params.limit;
						parame.offset = params.offset;
						parame.search = "";
						parame.sort = params.sort;
						params.order = params.order;
						parame.ID = ID;
						return parame;  
		},
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		undefinedText: '',//当数据为 undefined 时显示的字符
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
			field:'factoryCode',//返回值名称
			title:'出厂编码',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'sampleName',//返回值名称
			title:'样品名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		},{
			field:'specifications',//返回值名称
			title:'规格型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'nameCn',//返回值名称
			title:'检测/校准项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'createTime',//返回值名称
			title:'录入时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'detector',//返回值名称
			title:'检测/校准人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'detectstate',//返回值名称
			title:'检测/校准进度',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

//返回按钮
$('#return').click(function(){
	console.log(window.location.href);
	window.location.href = window.location.href.split("?")[0].replace('checkTaskProgress.jsp','taskAssignManage.jsp');
});

/*通过正则获取url中的参数*/
function getUrlParam(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURI(r[2]); return null;
}