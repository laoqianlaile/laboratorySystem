$(function(){
	init();
});


function init(){
	

	$(function(){
		$('#table').bootstrapTable({
			striped:false, // 隔行变色效果
			pagination:true,// 在表格底部显示分页条
			pageSize:3,// 页面数据条数
			pageNumber: 1,// 首页页码
			pageList: [3,5,,9,10,200,500],// 设置可供选择的页面数据条数
			clickToSelect : true,// 设置true 将点击时，自动选择rediobox 和 checkbox
			cache:false,// 禁用AJAX数据缓存
			sortName:'ID',
			sortOrder:'asc',
			url:'standardTypeController/getStandardTypeWithPaging.do',
			sidePagination:'server',
			contentType : 'application/json',
			dataType : 'json',
			offset: 0,
			queryParams: queryParams, //参数  
			queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
			showRefresh: false,  // 显示刷新按钮
			
			columns:[
			{
				  field: '',
	              title: '序号',
	              width:'10%',
	              align:'center',
	              valign:'middle',
	              formatter: function (value, row, index) {
	                  return index+1;
	              }
			},{
				field:'ID',// 返回值名称
				title:'标准类型ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'STANDARDTYPECODE',// 返回值名称
				title:'标准类型编码',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'20%',// 宽度
			},{
				field:'STANDARDTYPENAME',// 返回值名称
				title:'标准类型名称',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'20%'// 宽度
			},{
				field:'CREATETIME',// 返回值名称
				title:'创建时间',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'24%'// 宽度
			},{
				field:'',
				title:'操作',
				align:'center',
				valign:'middle',
				width:'20%',
				 formatter:function(value,row,index){ 
					 var a = "<img src ='module/img/edit_icon.png' onclick='openEditModal("+JSON.stringify(row)+")' title='修改' style='cursor:pointer;margin-right:8px;' >"
//					 var e = "<img src = 'module/img/delete_icon.png' onclick='delStandardType(\""+row.ID+"\")' title='删除' style='cursor:pointer;margin-right:8px;'  />"
	                 return a ;    
	             }   
			}]// 列配置项,详情请查看 列参数 表格
			/* 事件 */
		});
	});
}

function queryParams(params) {  //配置参数 

    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
    
      STANDARDTYPECODE: $('#query_STANDARDTYPECODE').val(),  
      STANDARDTYPENAME: $('#query_STANDARDTYPENAME').val(),  
      limit: params.limit,   //页面大小  
      offset: params.offset,  //页码   
      sort: params.offter,  //排序列名  
      sortOrder: params.order//排位命令（desc，asc）  
    };  
    return temp;  
  }



///*删除标准类型*/
//function delStandardType(data){
//	 if(confirm("确定要删除？")){
//		 StandardTypeIDs = arguments[0];
//		 $.ajax({
//				url: 'standardTypeController/delStandardType.do',
//				data:{
//					StandardTypeIDs : StandardTypeIDs
//				},
//				success:function(o){
//					if(o <= 0){
//						alert("修改失败");
//					}
//					$('#editModal').modal('hide');
//					refresh();
//				}
//           });
//	 }
//}

function openEditModal(){
	
	$('#edit_StandardTypeID').val(arguments[0].ID);
	$('#edit_StandardTypeCode').val(arguments[0].STANDARDTYPECODE);
	$('#edit_StandardTypeName').val(arguments[0].STANDARDTYPENAME);
	$('#edit_CreateTime').val(arguments[0].CREATETIME);
		
	$('#editModal').modal('show');
	
}
// 判空或者判空字符串
function  checkNull(){
	
	if(arguments[0].StandardTypeCode == null || arguments[0].StandardTypeCode == ""){
		swal({  title: "标准类别编码不能为空", type: "error",});
		return true;
	}
	if(arguments[0].StandardTypeName == null ||arguments[0].StandardTypeName == ""){
		swal({  title: "标准类别名称不能为空", type: "error",});
		return true;
	}
	return false;
}
function editStandardType(){
	var parme = {};
	parme.StandardTypeID = $('#edit_StandardTypeID').val();
	parme.StandardTypeCode = $('#edit_StandardTypeCode').val();
	parme.StandardTypeName = $('#edit_StandardTypeName').val();
	if(checkNull(parme))return;
	$.ajax({
		url: 'standardTypeController/upStandardType.do',
		data:parme,
		success:function(o){
			if(o<=0){
				swal({  title: "修改失败", type: "error",});
			}
			$('#editModal').modal('hide');
			refresh();
		}
	});
}

/*  新增      */
function addStandardType(){
	
	var parme = {};
	parme.StandardTypeCode = $('#add_StandardTypeCode').val();
	parme.StandardTypeName = $('#add_StandardTypeName').val();
	if(checkNull(parme))return;
	
	$.ajax({
		url: 'standardTypeController/addStandardType.do',
		data:parme,
		success:function(o){
			if(o<=0){
				swal({  title: "新增失败", type: "error",});
			}
			$('#addModal').modal('hide');
			refresh();
		}
	});
}

/* 刷新方法 */
function refresh(){
	window.location.href = "module/jsp/standardManage/standardType.jsp";
}

/* 重置刷新 */
function reSetRefresh(){
	document.getElementById("query_STANDARDTYPECODE").value=""; 	
	document.getElementById("query_STANDARDTYPENAME").value=""; 	
	refresh();
}

/* 查询方法 */
function query(){
	init();
	$('#table').bootstrapTable('refresh', null);
}