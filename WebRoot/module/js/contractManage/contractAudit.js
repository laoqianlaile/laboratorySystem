// 请求数据时的额外参数
var param = {};

$(function() {
	initData();
});

//初始化数据
function initData(){
	$("#table").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5,10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'contractCode',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'contractController/getContractAuditWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.contractCode = $.trim($('#schContractCode').val());
			param.employeeName = $.trim($('#schEmployeeName').val());
			param.companyName = $.trim($('#schCompanyName').val());
			param.startTime = $.trim($('#schStartTime').val());
			param.endTime = $.trim($('#schEndTime').val());
			param.oppositeMen = $.trim($('#schOppositeMen').val());
			param.linkPhone = $.trim($('#schLinkPhone').val());
			param.state = $.trim($('#schState').val());
			return param;
		}, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :'3%',// 宽度
			formatter : function(value, row, index) {
				 checkData(row);	 //验证数据合理性					
		    }
		},{
			field:'ID',//返回值名称
			title:'合同ID',//列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			visible : false
		},{
			field:'fileID',//返回值名称
			title:'文件ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
			visible:false
		},{
			field:'contractCode',//返回值名称
			title:'合同编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%',//宽度
		},{
			field:'contractName',//返回值名称
			title:'合同名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%',//宽度
		},{
			field:'companyName',//返回值名称
			title:'甲方',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'oppositeMen',//返回值名称
			title:'甲方代表',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
		},{
			field:'linkPhone',//返回值名称
			title:'联系电话',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'7%',//宽度
		},{
			field:'employeeName',//返回值名称
			title:'乙方代表',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
		},{
			field:'signAddress',//返回值名称
			title:'签订地点',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%',//宽度
		},{
			field:'signTime',//返回值名称
			title:'签订时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'startTime',//返回值名称
			title:'履行开始时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'endTime',//返回值名称
			title:'履行结束时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'contractAmount',//返回值名称
			title:'合同金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
		},{
			field:'isClassified',//返回值名称
			title:'是否涉密',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'3%',//宽度
			visible:false
		},{
			field:'classifiedLevel',//返回值名称
			title:'涉密等级',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'3%',//宽度
			visible:false
		},{
			field:'state',//返回值名称
			title:'合同状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'viewpoint',//返回值名称
			title:'审核意见',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'4%',//宽度
			visible:false
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//检查合同数据是否合理并处理
function checkData(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null || dataObj.ID.trim() == "" || dataObj.ID == undefined) {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileID") || dataObj.fileID == null || dataObj.fileID.trim() == "") {
		  dataObj.fileID = "";
	}
	if (!dataObj.hasOwnProperty("contractCode") || dataObj.contractCode == null || dataObj.contractCode == undefined ) {
		dataObj.contractCode = ""; //没有合同文件
	}
	if (!dataObj.hasOwnProperty("contractName") || dataObj.contractName == null || dataObj.contractName.trim() == "") {
		 dataObj.contractName = "";
	}
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null || dataObj.companyName == undefined ) {
		dataObj.companyName = ""; //能编辑
	}
	if (!dataObj.hasOwnProperty("oppositeMen") || dataObj.oppositeMen == null || dataObj.oppositeMen.trim() == "") {
		dataObj.oppositeMen = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null) {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null || dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("signAddress") || dataObj.signAddress == null || dataObj.signAddress.trim() == "") {
		dataObj.signAddress = "";
	}
	if (!dataObj.hasOwnProperty("signTime") || dataObj.signTime == null || dataObj.signTime.trim() == "") {
		dataObj.signTime = "";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null || dataObj.startTime.trim() == "") {
		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("endTime") || dataObj.endTime == null || dataObj.endTime.trim() == "") {
		dataObj.endTime = "";
	}
	if (!dataObj.hasOwnProperty("contractAmount") || dataObj.contractAmount == null) {
		dataObj.contractAmount = "0";
	}
	if (!dataObj.hasOwnProperty("isClassified") || dataObj.isClassified == null || dataObj.isClassified.trim() == "") {
		dataObj.isClassified = "";
	}
	if (!dataObj.hasOwnProperty("classifiedLevel") || dataObj.classifiedLevel == null || dataObj.classifiedLevel.trim() == "") {
		dataObj.classifiedLevel = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null || dataObj.state.trim() == "") {
		dataObj.state = "";
	}
	if (!dataObj.hasOwnProperty("viewpoint") || dataObj.viewpoint == null || dataObj.viewpoint.trim() == "") {
		dataObj.viewpoint = "";
	}
}

/**
 * 搜索方法
 */
function searchContract(){
	initData();
	$('#table').bootstrapTable('refresh', null);
}

/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/contractManage/contractAudit.jsp";
}

/**
 * 使页面跳转到查看合同页面(审核)
 */
function showContractA(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	var ID = data[0].ID;
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		window.location.href="module/jsp/contractManage/contractView.jsp?ID="+ ID + "&type=1";
	}
}

/**
 * 弹出编辑意见的方法 
 */
function writeModal1(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	var ID = data[0].ID;
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		$('#approveCause').attr({'name' : "" + ID + ""});
		$('#writeModal1').modal('show');
	}
	
}

/**
 * 弹出编辑意见的方法 
 */
function writeModal2(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	var ID = data[0].ID;
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		$('#rejecteCause').attr({'name' : "" + ID + ""});
		$('#writeModal2').modal('show');
	}
}


/**
 * 提交审核意见（通过）
 */
function approved(){
	var approveCause = $('#approveCause').val(); 
	if (!approveCause || typeof(approveCause)=="undefined" || approveCause.trim() == "") 
	{ 
		swal("审核意见不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#approveCause').attr("name");
		parame.viewpoint = $('#approveCause').val();
		parame.state = 4;
		
		$.ajax({
		  url:'contractController/auditContract.do',
		  data:parame,
		  success:function(o){
			  
			  if(o <= 0){
				  swal("操作失败！");
			  }
			  $('#writeModal1').modal('hide');
			  refresh();
		  }
		});
	}
}

/**
 * 提交审核意见（未通过）
 */
function rejected(){
	var rejecteCause = $('#rejecteCause').val(); 
	if (!rejecteCause || typeof(rejecteCause)=="undefined" || rejecteCause.trim() == "") 
	{ 
		swal("审核意见不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#rejecteCause').attr("name");
		parame.viewpoint = $('#rejecteCause').val();
		parame.state = 3;
		
		$.ajax({
		  url:'contractController/auditContract.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  swal("操作失败！");
			  }
			  $('#writeModal2').modal('hide');
			  refresh();
		  }
		});
	}
}

$('.form_datetime_schTime').datetimepicker({
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
