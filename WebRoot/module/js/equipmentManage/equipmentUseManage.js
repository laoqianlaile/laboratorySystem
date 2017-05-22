// 请求数据时的额外参数
var param = {};

$(function() {
	initData();
});

//初始化数据
function initData(){
	$("#table").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : false,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 3,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 3,5,10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'equipmentFactoryCode',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'equipmentUseController/getEquipmentUseWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.sampleName = $.trim($('#schSampleName').val());
			param.equipmentName = $.trim($('#schEquipmentName').val());
			param.testProject = $.trim($('#schTestProject').val());
			param.applicat = $.trim($('#schApplicat').val());
			param.startTime = $.trim($('#schStartTime').val());
			param.endTime = $.trim($('#schEndTime').val());
			return param;
		}, //参数
		queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		onLoadSuccess : function(data) {
			checkDate(data,"con");
			console.log(data);
		},
		columns : [/* {
			checkbox : true,
			width :'3%'// 宽度
		},*/{
			field:'ID',//返回值名称
			title:'仪器设备使用记录ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'equipmentID',//返回值名称
			title:'仪器设备ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'equipmentFactoryCode',//返回值名称
			title:'设备出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'14%',//宽度
//			visible:false
		},{
			field:'equipmentName',//返回值名称
			title:'设备名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'12%'//宽度
		},{
			field:'model',//返回值名称
			title:'设备型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'7%'//宽度
		},{
			field:'testProjectID',//返回值名称
			title:'检测项目ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'nameCn',//返回值名称
			title:'检测项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'sampleID',//返回值名称
			title:'样品ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'sampleName',//返回值名称
			title:'样品名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'factoryCode',//返回值名称
			title:'样品出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
//			visible:false
		},{
			field:'applyTime',//返回值名称
			title:'使用时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%'//宽度
		},{
			field:'application',//返回值名称
			title:'使用人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'登记人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'7%'//宽度
		},{
			field:'departmentName',//返回值名称
			title:'使用人所属科室',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%'//宽度
		},{
			field:'',
			title:'操作',
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',
			 formatter:function(value,row,index){
				 var a = "<img src ='module/img/delete_icon.png' onclick='delData(\""+ row.ID + "\",\"" + row.equipmentName +"\")' title='删除设备' style='cursor:pointer;padding-right:8px;'></img>";
                 return a;    
             }   
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//检查合同数据、合同文件数据和合同细项是否合理
function checkDate(data, who) {
	if (who == "con"){
		chenkDataCon(data);
	}
}
//检查仪器使用数据是否合理并处理
function chenkDataCon(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null || dataObj.ID == undefined || dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("equipmentID") || dataObj.equipmentID == null || dataObj.equipmentID == undefined || dataObj.equipmentID.trim() == "") {
		dataObj.equipmentID = "";
	}
	if (!dataObj.hasOwnProperty("equipmentFactoryCode") || dataObj.equipmentFactoryCode == null || dataObj.equipmentFactoryCode == undefined || dataObj.equipmentFactoryCode.trim() == "") {
		  dataObj.equipmentFactoryCode = "";
	}
	if (!dataObj.hasOwnProperty("equipmentName") || dataObj.equipmentName == null || dataObj.equipmentName == undefined || dataObj.equipmentName.trim() == "") {
		dataObj.equipmentName = "";
	}
	if (!dataObj.hasOwnProperty("testProjectID") || dataObj.testProjectID == null || dataObj.testProjectID == undefined || dataObj.testProjectID.trim() == "") {
		dataObj.testProjectID = "";
	}
	if (!dataObj.hasOwnProperty("nameCn") || dataObj.nameCn == null || dataObj.nameCn == undefined || dataObj.nameCn.trim() == "") {
		dataObj.nameCn = "";
	}
	if (!dataObj.hasOwnProperty("sampleID") || dataObj.sampleID == null || dataObj.sampleID == undefined || dataObj.sampleID.trim() == "") {
		dataObj.sampleID = "";
	}
	if (!dataObj.hasOwnProperty("departmentName") || dataObj.departmentName == null || dataObj.departmentName == undefined  || dataObj.departmentName.trim() == "") {
		dataObj.departmentName = "";
	}
	if (!dataObj.hasOwnProperty("sampleName") || dataObj.sampleName == null || dataObj.sampleName == undefined || dataObj.sampleName.trim() == "") {
		dataObj.sampleName = "";
	}
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null || dataObj.factoryCode == undefined || dataObj.factoryCode.trim() == "") {
		  dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("applyTime") || dataObj.applyTime == null || dataObj.applyTime == undefined || dataObj.applyTime.trim() == "") {
		dataObj.applyTime = "";
	}
	if (!dataObj.hasOwnProperty("application") || dataObj.application == null || dataObj.application == undefined || dataObj.application.trim() == "") {
		dataObj.application = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null || dataObj.employeeName == undefined || dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null || dataObj.remarks == undefined || dataObj.remarks.trim() == "") {
		dataObj.remarks = "";
	}
}
/*//请求数据时的额外参数
function queryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'equipmentFactoryCode',
		order : 'asc',
		sampleName : $.trim($('#schSampleName').val()),
		equipmentName : $.trim($('#schEquipmentName').val()),
		testProject : $.trim($('#schTestProject').val()),
		applicat : $.trim($('#schApplicat').val()),
		startTime : $.trim($('#schStartTime').val()),
		endTime : $.trim($('#schEndTime').val())
	};
    return searchCondition;
}*/

/**
 * 搜索方法
 */
function search(){
	initData();
	$('#table').bootstrapTable('refresh', null);
}
/*刷新表格*/
function refrehTable() {
	$('#table').bootstrapTable('refresh', null);
}
/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/equipmentManage/equipmentUseManage.jsp";
}


/* 删除方法 */
function delData(id,equipmentName){
	if (confirm("确认删除：" + equipmentName)) {
		var Ids = "ID = '" + id + "'";
		var ajaxParameter = {
				equipmentUseId : id	
		};
		
		$.ajax({
		  url:'equipmentUseController/delEquipmentUse.do',
		  type:"post",
		  data:ajaxParameter,
		  success:function(o){
			  switch (o) {
				case '1':swal("删除成功！");
					refrehTable();
					break;
				case '0':swal("删除失败！");
					break;
				default:swal("出现未知错误，请重试！");
					break;
			  }
		  }
		});
	}else{
		return;
	}
}

$('.form_datetime').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    format: 'yyyy.mm.dd'
});
