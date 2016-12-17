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
							pageList : [ 3, 5, 9, 10, 200, 500 ],// 设置可供选择的页面数据条数
							clickToSelect : true,// 设置true 将点击时，自动选择rediobox
							// 和 checkbox
							cache : false,// 禁用AJAX数据缓存
							sortName : 'ID',
							sortOrder : 'asc',
							url : 'dutyController/getDutyWithPage.do',
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
											title : '职务id',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%',// 宽度
											visible : false
										},
										{
											field : 'dutyCode',// 返回值名称
											title : '职务编号',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%',// 宽度
										},
										{
											field : 'dutyName',// 返回值名称
											title : '职务名称',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'introduction',// 返回值名称
											title : '职务简介',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'createTime',// 返回值名称
											title : '创建时间',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										
										]
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

    
		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort : params.offter, // 排序列名
		sortOrder : params.order
	// 排位命令（desc，asc）
	};
	return temp;
}
/* 新增方法 */
function add(){
	var parame = {};
	parame.dutyCode = $('#add_dutyCode').val();
	parame.dutyName = $('#add_dutyName').val();
	parame.introduction = $('#add_introduction').val();
	
	$("input").val("");
	$.ajax({
	  url:'dutyController/addDuty.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  alert("新增失败");
		  }
		  $('#addModal').modal('hide');
		  refresh();
	  }
	});
}
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0){
		alert("请至少选中一条数据");
		return;
	}
	
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += data[i].ID + ",";
	}
	
	var ajaxParameter = {
			IDs:ids.substring(0, (ids.length-1))
	};
	
	$.ajax({
	  url:'dutyController/delDuty.do',
	  data:ajaxParameter,
	  success:function(o){
		  if(o<=0){
			  alert("删除失败");
		  }
		  refresh();
	  }
	});
}
/* 弹出修改弹框方法 */
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	//$("div#only1 .form-control").attr({"disabled":false});
	$('#edit_ID').val(data[0].ID);
	$('#edit_dutyCode').val(data[0].dutyCode);
	$('#edit_dutyName').val(data[0].dutyName);
	$('#edit_introduction').val(data[0].introduction);
	$('#editModal').modal('show');
}
function edit(){
	var parame = {};
	parame.ID=$('#edit_ID').val();
	parame.dutyCode = $('#edit_dutyCode').val();
	parame.dutyName = $('#edit_dutyName').val();
	parame.introduction = $('#edit_introduction').val();
	$.ajax({	
		  url:'dutyController/updDuty.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("修改失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  }
		});	
}
function find(){
	var parame = {};
	parame.dutyCode = $('#linkdutyCode').val();
	parame.dutyName = $('#linkdutytName').val();
	
	
	$('#table').bootstrapTable('refresh', {
		silent:true,
		url:"dutyController/getDutyWithPage.do",
		query:parame
	});
}
