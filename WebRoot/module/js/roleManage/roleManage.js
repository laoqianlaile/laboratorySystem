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
			width:'5%'//宽度
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
		},{
			field:'',//返回值名称
			title:'操作',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%',//宽度
			formatter : function(value, row, index) { //操作按钮的设置
				  var view = "", edit = "", dele = ""; 
				  	if(row.ID != ""){   //没有交接单---就没有任何编辑，查看，删除等功能
				  		view = "<img src=\"module/img/view_icon.png\" alt=\"查看\" onclick='lookModal("+JSON.stringify(row)+")' >";
				        edit = "<img src=\"module/img/edit_icon.png\" alt=\"编辑\" onclick='openModal("+JSON.stringify(row)+")'>";
				        dele = "<img src=\"module/img/delete_icon.png\" alt=\"删除\" onclick='delRole(\""+row.ID+"\")'>";
				 
					return view + edit + dele;
				}
		    }
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
		sweetAlert("请至少选中一条数据");
		return;
	}
	
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += data[i].ID + ",";
	}
	

    var roleIDs= ids.substring(0, (ids.length-1))
	delRole(roleIDs);

}
function delRole(roleIDs){
	sweetAlert({
		  title: "Are you sure?",
		  text: "是否删除角色!",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "是",
		  cancelButtonText: "否"
		
		}, function(isConfirm){
			if(isConfirm){
				
			}else{
				$.ajax({
					  url:'roleController/delRole.do',
					  dataType:"json",
					  data:{
						  roleIDs : roleIDs
					  },
					  success:function(o){
						  console.log( typeof o);
						  if(o == "false"){
							  sweetAlert("没有权限");
						  }else{
								sweetAlert({
									title:"删除成功",
									type:"success",
									timer:1000
									});
						  }
						  refresh();
					  },
					  error:function(o){
						  sweetAlert("","删除失败","error");
					  }
					});
			}
		});
	
}
/* 新增方法 */
function add(){
	
	var name = $('#add_roleName').val(); 
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		sweetAlert("角色名不能为空！"); 
	}else {
		var parame = {};
		parame.roleName = name;
		parame.description = $('#add_description').val();
		
		$.ajax({
		  url:'roleController/addRole.do',
		  dataType:"json",
		  data:parame,
		  success:function(o){
			  if(o == "该角色已经存在"){
				  sweetAlert("该角色已经存在");
			  }else{
				  sweetAlert({
					title:"删除成功",
					type:"success",
					timer:1000
					});
			  $('#addModal').modal('hide');
			  refresh();
			  }
		  }
		});
	}
	
}

/* 弹出查看弹框方法 */
function lookModal(data){
    
/*	var data = $('#table').bootstrapTable('getSelections');*/
	
	/*if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}*/
	//填充数据
	$('#show_roleID').val(data.ID);
	$('#show_roleName').val(data.roleName);
	$('#show_creator').val(data.creator);
	$('#show_createTime').val(data.createTime);
	$('#show_describtion').val(data.description);
	//设置不可编辑
//	$('#show_roleID').attr("disabled", true);//不可编辑
	$('#show_roleName').attr("disabled", true);//不可编辑
 	$('#show_creator').attr("disabled", true);//不可编辑
	$('#show_createTime').attr("disabled", true);//不可编辑
	$('#show_describtion').attr("disabled", true);//不可编辑
	$('#showModal').modal('show');
}


/* 弹出修改弹框方法 */
function openModal(data){
/*	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	*/
	//var ids =  data[0].ROLEID;
	
	//
	$('#edit_roleName').val(data.roleName);
	$('#edit_description').val(data.description);
	$('#edit_roleID').val(data.ID);
	
	$('#editModal').modal('show');
}


/* 修改方法 */
function edit(){
	var name = $('#edit_roleName').val(); 
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		sweetAlert("角色名不能为空！"); 
	}else {
		
		var ids =  $('#edit_roleID').val();
		var parame = {};
		parame.roleID = ids;
		parame.roleName = $('#edit_roleName').val();
		parame.description = $('#edit_description').val();
		$.ajax({
		  url:'roleController/updRole.do',
		  data:parame,
		  dataType:"json",
		  success:function(o){
			  if(o<=0){
				  sweetAlert("修改失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  }
		});
	}
	
}