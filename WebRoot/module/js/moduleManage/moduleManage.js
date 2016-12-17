$(function () {
	// 设置
	$('#table').bootstrapTable({
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [10, 20, 50, 100, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'moduleController/getModulesWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams: function queryParams(params) {
			var param = {};
		 param.limit= params.limit;//页面大小  
		 param.offset= params.offset; //偏移量 
		 param.search = "";
		 param.sort= params.sort; //排序列名  
		 param.order= params.order; //排位命令（desc，asc）
		 return param;
	}, //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名
		onLoadSuccess:function(data){
			console.log(data);
		},
		columns:[{
			checkbox:true,
			width:'5%'
			
		},{
			field:'ID',//返回值名称
			title:'模块ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible : false
		},{
			field:'text',//返回值名称
			title:'模块名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'
		
		},{
			field:'parentText',//返回值名称
			title:'所属模块名字',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'
		},{
			field:'parentCode',//返回值名称
			title:'所属模块编码',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'
		},{
			field:'moduleCode',//返回值名称
			title:'模块编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'
		},{
			field:'isShow',//返回值名称
			title:'是否展示',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'
		},{
			field:'href',//返回值名称
			title:'路径',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'30%'
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});
/* 刷新方法 */
function refresh(){
	//$("#addModal").attr("value","");
	$('#table').bootstrapTable('refresh', null);
	$.ajax({
		type : 'POST',
		url : 'moduleController/getTree.do',
		success : function(value) {
		
			var trees = JSON.parse(value);
			$('#tree').treeview({
				data : trees,
				showIcon : true,
				collapsed:false,
				levels : 1,
			});
		},
		dataType : 'text'
	});
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
		ids += data[i].ID + ",";
	}
	
	var ajaxParameter = {
			IDs:ids.substring(0, (ids.length-1))			
	};
	
	$.ajax({
	  url:'moduleController/deleteModule.do',
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
	
	sel("#add_PARENT","add");
	var text = $('#add_text').val(); 
	if (!text && typeof(name)!="undefined" && text=='') 
	{ 
		alert("角色名不能为空！"); 
	}else {
		var parame = {};
		parame.text = $('#add_TEXT').val();
		parame.href = $('#add_HREF').val();
		parame.icon =$('#add_ICON').val();
		parame.isShow =$('#add_ISSHOW').val();
		parame.parent = $('#add_PARENT').val();
	
		$.ajax({
		  type:'post',
		  url:'moduleController/addModule.do',
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
	
	$('#show_TEXT').val(data[0].text);
	$('#show_HREF').val(data[0].href);
	$('#show_MODULECODE').val(data[0].moduleCode);
	$('#show_PARENT').val(data[0].parentText);
	$('#show_ISSHOW').val(data[0].isShow);
	$("#show_icon").addClass(data[0].icon);
	
	
	$('#show_TEXT').attr("disabled", true);
	$('#show_HREF').attr("disabled", true);
	$('#show_MODULECODE').attr("disabled", true);
	$('#show_PARENT').attr("disabled", true);
	$('#show_ISSHOW').attr("disabled", true);
	
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
	sel("#edit_PARENT",data[0].parentID);
	
	$('#edit_TEXT').val(data[0].text);
	//$('#edit_PARENT').val(data[0].parent);
	//$('#edit_MODULECODE').val(data[0].moduleCode);
	$('#edit_ICON').val(data[0].icon);
	$('#edit_HREF').val(data[0].href);
	
	if( data[0].isShow == null || data[0].isShow == undefined)
	$('#edit_ISSHOW').val(0);
	else  $('#edit_ISSHOW').val(data[0].isShow);
	
	$('#editModal').modal('show');
} 

function sel(ID,checkID) {
	$.ajax({
		  url:'moduleController/getText.do',
		  success:function(data){
			  var mod = eval(data);
			  
			  var text="<option value='0'>" + "模块管理" + "</option>";
			  for (i = 0; i < mod.length; i++) {
				  if(checkID == mod[i].ID)
			       text+="<option  selected='selected'  value='" + mod[i].ID + "'>" + mod[i].text + "</option>";
				  else text+="<option value='" + mod[i].ID + "'>" + mod[i].text + "</option>";
			  }
			 
			
			  $(ID).html($(text));
		  }
		});
}



/* 修改方法 */
function edit(){
	var text = $('#edit_TEXT').val(); 
	if (!text && typeof(name)!="undefined" && text=='') 
	{ 
		alert("模块名不能为空！"); 
	}else {
		var data = $('#table').bootstrapTable('getSelections');
		var ids =  data[0].ID;
		var parame = {};
		parame.ID = ids;
		parame.text = $('#edit_TEXT').val();
		parame.parent = $('#edit_PARENT').val();
		parame.icon = $('#edit_ICON').val();
		parame.isShow = $('#edit_ISSHOW').val();
		parame.href = $('#edit_HREF').val();
		
		$.ajax({
		  type:'post',
		  url:'moduleController/updateModule.do',
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

