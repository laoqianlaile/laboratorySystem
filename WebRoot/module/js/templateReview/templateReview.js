$(function() {
	init();
});

function init() {

	$(function() {
		$('#table')
				.bootstrapTable(
						{
							striped : true, // 隔行变色效果
							pagination : true,// 在表格底部显示分页条
							pageSize : 10,// 页面数据条数
							pageNumber : 1,// 首页页码
							pageList : [ 3, 5, , 9, 10, 200, 500 ],// 设置可供选择的页面数据条数
							clickToSelect : true,// 设置true 将点击时，自动选择rediobox
							// 和 checkbox
							cache : false,// 禁用AJAX数据缓存
							sortName : 'ID',
							sortOrder : 'asc',
							url : 'templateController/getTemplateWithPage.do',
							sidePagination : 'server',
							contentType : 'application/json',
							dataType : 'json',
							offset : 0,
							queryParams : queryParams, // 参数
							queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
							showRefresh : false, // 显示刷新按钮

							columns : [
										{
											checkbox : true,
											width : '5%'// 宽度
										},
										{
											field : '',
											title : '序号',
											width : '5%',
											align : 'center',
											valign : 'middle',
											formatter : function(value, row, index) {
												return index + 1;
											}
										},
										{
											field : 'ID',// 返回值名称
											title : '模板管理id',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%',// 宽度
											visible : false
										},
										{
											field : 'NAME',// 返回值名称
											title : '模板名称',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%',// 宽度
										},
										{
											field : 'UPLOADER',// 返回值名称
											title : '上传人',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'REVIEWER',// 返回值名称
											title : '审核人',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'SUGGEST',// 返回值名称
											title : '审核意见',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'TEMPLATETYPE',// 返回值名称
											title : '模板类型',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'STATE',// 返回值名称
											title : '状态',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'UPLOADTIME',// 返回值名称
											title : '上传时间',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : '',
											title : '操作',
											align : 'center',
											valign : 'middle',
											width : '10%',
											formatter : function(value, row, index) {
												var d = '<span onclick= "NoPassModal(\''+row.ID+'\',\''+row.SUGGEST+'\')" data-toggle="tooltip" data-placement="top" title="作废" class="glyphicon glyphicon-remove" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
												var a = '<span  data-toggle="tooltip" data-placement="top" title="通过" onclick="PassModal(\''+row.ID+'\',\''+row.SUGGEST+'\')" class="glyphicon glyphicon-ok" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
												return  a + d;
											}
										} ]
							// 列配置项,详情请查看 列参数 表格
							/* 事件 */
							});
		});
	}
/* 刷新方法 */
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}

function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

        NAME : $('#query_NAME').val(),
		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort : params.offter, // 排序列名
		sortOrder : params.order
	// 排位命令（desc，asc）
	};
	return temp;
}

/* 查询方法 */
function query() {

	init();
	refresh();

}
function lookfile(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
		var parame = {};
		parame.ID = $('#ID').val(data[0].ID);

		$.ajax({	
			  url:'templateController/lookfiletemplate.do',
			  data:parame,
			  success:function(o){
				  if(o<=0){
					  alert("查看失败");
				  }
			  }
			});	
		
		
}
/* 查找方法 */
function find(){
	var parame = {};
	parame.nAME = $('#query_STANDARDCODE').val();
	parame.STATE = $('#state').val();
	parame.uPLOADTIME1=$('#uPLOADTIME1').val();
	parame.uPLOADTIME2=$('#uPLOADTIME2').val();


	
	$('#table').bootstrapTable('refresh', {
		silent:true,
		url:"templateController/getTemplateWithPage.do",
		query:parame
	});
}




function NoPassModal(ID,SUGGEST){

	$("#fileSubtype").find("option").remove();
	$("#NoPassModal").modal("show");
	$('#Nopasstemplate').val(SUGGEST);
	$('#ID').val(ID);
	
	
}
function PassModal(ID,SUGGEST){

	$("#fileSubtype").find("option").remove();
	$("#PassModal").modal("show");
	$('#passtemplate').val(SUGGEST);
	$('#ID').val(ID);
	
	
}
function NoPass(){
	var parame = {};
	parame.ID = $('#ID').val();
	parame.SUGGEST = $('#Nopasstemplate').val();
	parame.verifyMan=$('#verifyMan').val();
	
	$.ajax({	
		  url:'templateController/updNoPasstemplate.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("审核失败");
			  }
			  $('#NoPassModal').modal('hide');
			  refresh();
		  }
		});	
	
	
}
function Pass(){
	var parame = {};
	parame.ID = $('#ID').val();
	parame.SUGGEST = $('#Passtemplate').val();
	parame.verifyMan=$('#verifyMan').val();
	
	$.ajax({	
		  url:'templateController/updPasstemplate.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("审核失败");
			  }
			  $('#PassModal').modal('hide');
			  refresh();
		  }
		});	
	
	
}



