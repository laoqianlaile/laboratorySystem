$(function () {
	
	//加载时间控件
	$(".form_datetime").datetimepicker({
        minView: 'month',            //设置时间选择为年月日 去掉时分秒选择
        format:'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        language: 'zh-CN'              //设置时间控件为中文
    }); 	
	
   //加载表格
   $('#table').bootstrapTable({
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 3,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [3, 5, 9, 10, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'personconTrastController/getAuditPersonconTrastWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams : queryParams, // 参数
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		showRefresh : false, // 显示刷新按钮
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			width:'5'//宽度
		},{
			title : '序号',
			field: 'Number',
			formatter: function (value, row, index) {
			return index+1;
			}
		},{
			field:'projectCode',//返回值名称
			title:'比对项目编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5',//宽度
//			visible:false
		},{
			field:'projectName',//返回值名称
			title:'比对项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'testDevice',//返回值名称
			title:'测试装置',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'departmentName',//返回值名称
			title:'比对人员科室',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'Name1',//返回值名称
			title:'比对标准人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'Name2',//返回值名称
			title:'待比对人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'diffierence',//返回值名称
			title:'比对差异',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'result',//返回值名称
			title:'比对人员结果',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'startTime',//返回值名称
			title:'执行时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'state',//返回值名称
			title:'状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'auditState',//返回值名称
			title:'审核状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'reason',//返回值名称
			title:'不通过原因',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'ID',
			title:'',
			align:'center',
			valign:'middle',
			width:'100',
		    visible:false,
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

/*,{
    field:'fileName',
    title:'结果报告',
    align:'center',
    valign:'middle',
    width:'100',
}*/


function refresh(){
	$('#table').bootstrapTable('refresh', null);
}
function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

			projectCode : $('#projectCode').val(),
			projectName : encodeURI($('#projectName').val(),"utf-8"),
			employeeID1 : encodeURI($('#employeeID1').val(),"utf-8"),
			testDevice : $('#testDevice').val(),
			startTime : $('#startTime').val(),
			employeeID2 : encodeURI($('#employeeID2').val(),"utf-8"),
			state:"",
			departmentName:"",
			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			sort : params.sort, // 排序列名
			order : params.order
		// 排位命令（desc，asc）
		};
		return temp;
}