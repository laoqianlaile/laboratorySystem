$(function () {
	var ID = getURLParameter().ID;//科室ID
	
	// 初始化表格
	var parame = {};
	
	$('#table').bootstrapTable({
		  //定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择 rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'testProject.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'contractFineItemController/getTestProjectInDepartmentTaskStatistical.do',//服务器数据的加载地址
		sidePagination:'server',//   送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
			            parame.limit = params.limit;
						parame.offset = params.offset;
						parame.search = "";
						parame.sort = params.sort;
						parame.order = params.order;
						parame.ID = ID;// 科室ID
						return parame;  
		},
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
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
			width:'20%'//宽度
		},{
			field:'nameEn',//返回值名称
			title:'检测项目英文名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'money',//返回值名称
			title:'金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'amount',//返回值名称
			title:'数目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'operate',//返回值名称
			title:'操作',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%',//宽度
			formatter:function(value,row,index){  
				var btn_detail = '<span class="glyphicon glyphicon-search" onclick="viewDetail(\''+ ID + '\',\'' + row.ID +'\')" data-toggle="tooltip" data-placement="top" title="查看详细" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
		  			return btn_detail;  
            } 
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

//查看详情
function viewDetail(ID,testProjectID){
	window.location.href = window.location.href.replace('departmentStatisticalManageDetail.jsp','departmentStatisticalManageDetailPage.jsp') + '&testProjectID=' + testProjectID;
}

//返回按钮
$('#return').click(function(){
	window.location.href = window.location.href.split("?")[0].replace('departmentStatisticalManageDetail.jsp','departmentStatisticalManage.jsp');
});
