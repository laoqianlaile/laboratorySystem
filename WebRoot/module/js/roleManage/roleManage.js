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
			width:'10%'//宽度
		},{
			field:'ID',//返回值名称
			title:'角色ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
			visible:false
		},{
			field:'roleName',//返回值名称
			title:'角色名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'creator',//返回值名称
			title:'负责人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'createTime',//返回值名称
			title:'创建时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'description',//返回值名称
			title:'角色简介',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
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
	
	if(data.length ==0){
		alert("请至少选中一条数据");
		return;
	}
	
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += data[i].ID + ",";
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
	
	var name = $('#add_roleName').val(); 
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		alert("角色名不能为空！"); 
	}else {
		var parame = {};
		parame.roleName = name;
		parame.description = $('#add_description').val();
		
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
function lookModal(){
    
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	//填充数据
	$('#show_roleID').val(data[0].ID);
	$('#show_roleName').val(data[0].roleName);
	$('#show_creator').val(data[0].creator);
	$('#show_createTime').val(data[0].createTime);
	$('#show_describtion').val(data[0].description);
	//设置不可编辑
//	$('#show_roleID').attr("disabled", true);//不可编辑
	$('#show_roleName').attr("disabled", true);//不可编辑
 	$('#show_creator').attr("disabled", true);//不可编辑
	$('#show_createTime').attr("disabled", true);//不可编辑
	$('#show_describtion').attr("disabled", true);//不可编辑
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
	
	//
	$('#edit_roleName').val(data[0].roleName);
	$('#edit_description').val(data[0].description);
	
	$('#editModal').modal('show');
}


/* 修改方法 */
function edit(){
	var name = $('#edit_roleName').val(); 
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		alert("角色名不能为空！"); 
	}else {
		var data = $('#table').bootstrapTable('getSelections');
		var ids =  data[0].ID;
		var parame = {};
		parame.roleID = id;
		parame.roleName = $('#edit_roleName').val();
		parame.description = $('#edit_description').val();
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