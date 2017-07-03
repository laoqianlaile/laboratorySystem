/*
 * 交接单搜索条件参数设置
 */

var param = {
	reCode : $('#schReCode').val(),// 
	coCode : $('#schCoCode').val(),
	companyName : $("#schCompnyName").val(),
	reType : $('#schReType').val(),
	linkMan : $('#schLinkMan').val(),
	startTime : $('#schStratTime').val(),
	endTime : $("#schEndTime").val(),
	state : $("#schState").val()
	
}

/* 初始化数据 */
$(function() {
	
	$('#table') .bootstrapTable(
					{
						// 定义表格的高度height: 500,
						striped : true,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 5,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 5, 10, 15 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和	// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'ID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
						url : '/laboratorySystem/contractController/getMakeContractPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						method : "post",
						contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : function queryParams(params) {
							param.limit = params.limit;// 页面大小
							param.offset = params.offset; // 偏移量
							param.search = "";
							param.sort = params.sort; // 排序列名
							param.order = params.order; // 排位命令（desc，asc）
							return param;
						}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名
						onLoadSuccess : function(data) {
							console.log(data);
						},
						columns : [
								{
									checkbox : true,
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									formatter : function(value, row, index) {
										 checkData(row);	 //验证数据合理性					
								    }
								},
								{
									field : 'ID',// 返回值名称
									title : '交接单ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'coID',// 返回值名称
									title : '合同ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'proID',// 返回值名称
									title : '项目ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'reCode',// 返回值名称
									title : '交接单号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%'// 宽度
								},
								{
									field : 'coCode',// 返回值名称
									title : '合同编号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10%'// 宽度
								},
								{
									field : 'companyName',// 返回值名称
									title : '委托单位',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'linkMan',// 返回值名称
									title : '委托人',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'linkPhone',// 返回值名称
									title : '联系电话',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'startTime',// 返回值名称
									title : '履行时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'endTime',// 返回值名称
									title : '结束时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'employeeName',// 返回值名称
									title : '样品管理员',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'reType',// 返回值名称
									title : '类型',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '3%'// 宽度
								},
								{
									field : 'state',// 返回值名称
									title : '检测/校准进度',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								},
								{
									field : 'isInput',// 返回值名称
									title : '是否补录合同',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								}
								,
								{
									field : 'remarks',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '12%',// 宽度
									formatter : function(value, row, index) {
										
										
											var a = "<img src='../../../module/img/submit_icon.png' onclick='PassModal(\""+ row.coID+ "\",\""+ row.isInput+ "\")' title='可以'   style='cursor:pointer;margin-right:8px;' />";
											return  a;
										}
								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
});
/* 查询方法 */
function seacher() {
	// 查询的时候 他的limit 会依据页面上的数保留 不会变0
	var param = {};
	param.reCode = $('#schReCode').val();// 初始化搜索文字
	param.coCode = $('#schCoCode').val();
	param.companyName = $("#schCompnyName").val();
	param.reType = $('#schReType').val();
	param.linkMan = $('#schLinkMan').val();
	param.startTime = $('#schStratTime').val();
	param.endTime = $("#schEndTime").val();
	param.state = $("#schState").val();
	$('#table') .bootstrapTable( 'refresh',
					{
						silent : true,
						url : "/laboratorySystem/contractController/getMakeContractPaging.do",
						query : param
					});
}
/* 刷新方法 */
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}
//检查交接单数据是否合理并处理
function checkData(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null || dataObj.ID.trim() == "NULL") {
	    
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("proID") || dataObj.proID == null 	|| dataObj.proID.trim() == "NULL") {
		  dataObj.proID = "";
	}
	if (!dataObj.hasOwnProperty("coState") || dataObj.coState == null || dataObj.coState == undefined ) {
		dataObj.coState = "0"; //没有合同文件
	}
	if (!dataObj.hasOwnProperty("coCode") || dataObj.coCode == null || dataObj.coCode.trim() == "NULL") {
		 dataObj.coCode = "";
	}
	if (!dataObj.hasOwnProperty("isEditSample") || dataObj.isEditSample == null || dataObj.isEditSample == undefined ) {
		dataObj.isEditSample = "1"; //能编辑
	}
	if (!dataObj.hasOwnProperty("comID") || dataObj.comID == null || dataObj.comID.trim() == "NULL") {
		dataObj.comID = "";
	}
	if (!dataObj.hasOwnProperty("reCode") || dataObj.reCode == null || dataObj.reCode.trim() == "NULL") {
		dataObj.reCode = "";
	}
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null || dataObj.companyName.trim() == "NULL") {
		dataObj.companyName = "";
	}
	if (!dataObj.hasOwnProperty("linkMan") || dataObj.linkMan == null || dataObj.linkMan.trim() == "NULL") {
		dataObj.linkMan = "";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null || dataObj.startTime.trim() == "NULL") {
		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("endTime") || dataObj.endTime == null || dataObj.endTime.trim() == "NULL") {
		dataObj.endTime = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null || dataObj.employeeName.trim() == "NULL") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null || dataObj.linkPhone.trim() == "NULL") {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("reType") || dataObj.reType == null || dataObj.reType.trim() == "NULL") {
		dataObj.reType = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null || dataObj.state.trim() == "NULL") {
		dataObj.state = "";
	}
	if (!dataObj.hasOwnProperty("isInput") || dataObj.isInput == null || dataObj.isInput.trim() == "NULL") {
		dataObj.isInput = "";
	}
}
function PassModal(coID,isInput){
if(isInput=="不可以"){
	 var parame = {};
	 parame.ID=coID;
	 swal({
			title : "是否允许补录合同?",
			text : "",
			type : "warning",
			showCancelButton : true,
			cancelButtonText:"不可以",
			confirmButtonColor : "#DD6B55",
			confirmButtonText : "可以",
			closeOnConfirm : false
		}, function() {
	 $.ajax({	
		  url:"/laboratorySystem/contractController/passMakeContract.do",
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  swal("审核失败");
			  }
			  swal("操作成功");
			  refresh();
		  }
		});	
		});
}else swal("只能操作不可以补录的合同");
	
   }
   