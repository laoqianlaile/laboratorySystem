$(function () {
	$('#table').bootstrapTable({
		                          //定义表格的高度height: 500,
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 3,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [3, 5, 9, 10, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'roleController/getRoleWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			width:'5'//宽度
		},{
			field:'DEPARTMENTID',//返回值名称
			title:'部门编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
//			visible:false
		},{
			field:'NAME',//返回值名称
			title:'部门名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'HEAD',//返回值名称
			title:'负责人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'INTRODUCTION',//返回值名称
			title:'部门介绍',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'CREATTIME',//返回值名称
			title:'创建时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'SUPERIOR',//返回值名称
			title:'上级部门',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

/* 刷新方法 */
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}


/* 删除方法 */
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0){
		alert("请至少选中一条数据");
		return;
	}
	
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += data[i].ROLEID + ",";
	}
	
	var ajaxParameter = {
			roleIDs:ids.substring(0, (ids.length-1))
	};
	
	$.ajax({
	  url:'roleController/delRole.do',
	  data:ajaxParameter,
	  success:function(o){
		  if(o<=0){
			  alert("删除失败");
		  }
		  refresh();
	  }
	});
}

/* 新增方法 */
function add(){
	
	

	var name = $('#add_NAME').val(); 
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		alert("角色名不能为空！"); 
	}else {
		var parame = {};
		parame.NAME = $('#add_NAME').val();
		parame.REMARKS = $('#add_REMARKS').val();
		parame.CREATOR = 'xjuc';
		
		$.ajax({
		  url:'roleController/addRole.do',
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
	
}

/* 弹出查看弹框方法 */
function showModal(){
	/*var frameSrc = "module/jsp/roleManage/testFrame.html";
    $("#NoPermissioniframe").attr("src", frameSrc);
    $('#NoPermissionModal').modal({ show: true, backdrop: 'static' });*/
    
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	
	$('#show_ROLEID').val(data[0].ROLEID);
	$('#show_NAME').val(data[0].NAME);
	$('#show_CREATOR').val(data[0].CREATOR);
	$('#show_REMARKS').val(data[0].REMARKS);
	
	$('#showModal').modal('show');
}


/* 弹出修改弹框方法 */
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	
	//var ids =  data[0].ROLEID;
	
	
	$('#edit_NAME').val(data[0].NAME);
	$('#edit_REMARKS').val(data[0].REMARKS);
	
	$('#editModal').modal('show');
}


/* 修改方法 */
function edit(){
	var name = $('#edit_NAME').val(); 
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		alert("角色名不能为空！"); 
	}else {
		var data = $('#table').bootstrapTable('getSelections');
		var ids =  data[0].ROLEID;
		var parame = {};
		parame.ROLEID = ids;
		parame.NAME = $('#edit_NAME').val();
		parame.REMARKS = $('#edit_REMARKS').val();
		
		$.ajax({
		  url:'roleController/updRole.do',
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
	
}