$(function(){
	init();
});


function init(){
	

	$(function(){
		$('#table').bootstrapTable({
			striped:true, // 隔行变色效果
			pagination:true,// 在表格底部显示分页条
			pageSize:10,// 页面数据条数
			pageNumber: 1,// 首页页码
			pageList: [3,5,9,10,200,500],// 设置可供选择的页面数据条数
			clickToSelect : false,// 设置true 将点击时，自动选择rediobox 和 checkbox
			cache:false,// 禁用AJAX数据缓存
			sortName:'standard.ID',
			Order:'asc',
			url:'standardController/getStandardWithPaging.do',
			sidePagination:'server',
			contentType : 'application/json',
			dataType : 'json',
			offset: 0,
			queryParams: queryParams, //参数  
			queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
			showRefresh: false,  // 显示刷新按钮
			
			columns:[{
				checkbox:true,
				width:''// 宽度
			},{
				  field: '',
	              title: '序号',
	              width:'1%',
	              align:'center',
	              valign:'middle',
	              formatter: function (value, row, index) {
	                  return index+1;
	              }
			},{
				field:'ID',// 返回值名称
				title:'标准ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'fileID',// 返回值名称
				title:'文件ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'TYPE',// 返回值名称
				title:'类型(关联standardtype主键)',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'STANDARDCODE',// 返回值名称
				title:'标准编码',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'5%',// 宽度
	// visible:false
			},{
				field:'STANDARDNAME',// 返回值名称
				title:'标准名称',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'20%'// 宽度
			},{
				field:'standardTypeName',// 返回值名称
				title:'类别',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'8%'// 宽度
			},{
				field:'DESCRIPTION',// 返回值名称
				title:'描述',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'15%'// 宽度
			},{
				field:'SCOPE',// 返回值名称
				title:'适用范围',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'11%'// 宽度
			},{
				field:'APPLICATIONTYPE',// 返回值名称
				title:'引用类型',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'8%'// 宽度
			},{
				field:'EDITSTATE',// 返回值名称
				title:'编辑状态',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'8%'// 宽度
			},{
				field:'SUGGEST',// 返回值名称
				title:'审核意见',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'8%'// 宽度
			},{
				field:'STATE',// 返回值名称
				title:'状态',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'6%'// 宽度
			},{
				field:'',
				title:'操作',
				align:'center',
				valign:'middle',
				width:'13%',
				 formatter:function(value,row,index){    
	                 var e = '<button  onclick="downFile('+row.fileID+')"  title="下载" class="glyphicon glyphicon-save" style="cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;"></button> ';
	                 var a = "<button  onclick='openEditModal("+JSON.stringify(row)+")'"+" title='修改'  class='glyphicon glyphicon-edit' style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'></button>";
	                 return e+a;    
	             }   
			}]// 列配置项,详情请查看 列参数 表格
			/* 事件 */
		});
	});
}

/* 刷新方法 */
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}


window.onload = function(){
	getStandardType("query_TYPE");
	getStandardType("add_TYPE");
}

function queryParams(params) {  //配置参数 

    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
    
      STANDARDCODE: $('#query_STANDARDCODE').val(),  
      STANDARDNAME: $('#query_STANDARDNAME').val(),  
      TYPE: $('#query_TYPE').val(),  
      STATE: $('#query_STATE').val(), 
      APPLICATIONTYPE: $('#query_APPLICATIONTYPE').val(),
      limit: params.limit,   //页面大小  
      offset: params.offset,  //页码   
      sort: params.sort,  //排序列名  
      order: params.order//排位命令（desc，asc）  
    };  
    return temp;  
  }  

/* 查询方法 */
function query(){
	
	init();
	refresh();		
}


/* 重置刷新 */
function reSetRefresh(){
	document.getElementById("query_STANDARDCODE").value=""; 	
	document.getElementById("query_STANDARDNAME").value=""; 	
	document.getElementById("query_STATE").value="";
	document.getElementById("query_TYPE").value=""; 	
	document.getElementById("query_APPLICATIONTYPE").value="";
	
	query();
}
function isLogin(){
	 islogin = $('#uploaderID').val();
	 if(islogin === null || islogin === "" || islogin === "null"){
		 alert("您还没登录， 请先登录");
		 return false;
	 }
	 else{
		 return true;
	 }
}

function openAddmodal(){
	if( ! isLogin()){
		return;
	}
	else{
		
		if(arguments[0] === "add"){
			fileUploadInit("#file_upload");
			$('#addModal').modal('show');
		}
		else{
			fileUploadInit("#upFile");
			$('#upfileModal').modal('show');
		}
	}
}
// 文件上传
function add(){
	
	path = ""; // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	type = "0"; // 文件类型       该处默认为模板文件
	belongID = "";//文件所属ID
	firstDirectoryName = $('#fileType option:checked').text();// 一级目录
	secondDirectoryName = ""; // 二级目录
	thirdDirectoryName = ""; //三级目录
	otherInfo = ""; // 其他参数
	remarks = ""; // 备注
	
	fileUpload("#file_upload",path, type, belongID,firstDirectoryName, secondDirectoryName,thirdDirectoryName,
			otherInfo, remarks);
	
	// 延迟执行
	setTimeout("addstandard()",3000); 
	
	
}
/*   只上传文件       */
function addfile(){
	path = ""; // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	type = "0"; // 文件类型       该处默认为模板文件
	belongID = "";//文件所属ID
	firstDirectoryName = $('#fileType option:checked').text();// 一级目录
	secondDirectoryName = ""; // 二级目录
	thirdDirectoryName = ""; //三级目录
	otherInfo = ""; // 其他参数
	remarks = ""; // 备注
	
	fileUpload("#upFile",path, type, belongID,firstDirectoryName, secondDirectoryName,thirdDirectoryName,
			otherInfo, remarks);
	
	// 延迟执行
	setTimeout("addstandard()",3000); 
}

//新增标准（处理文件ID）
function addstandard(){
	
	var parame = {};
	parame.uploaderID = ($('#uploaderID').val());
	parame.STANDARDCODE = ($('#add_STANDARDCODE').val());
	parame.STANDARDNAME = ($('#add_STANDARDNAME').val());//
	parame.TYPE = $('#add_TYPE').val();
	parame.SCOPE = $('#add_SCOPE').val();
	parame.APPLICATIONTYPE = $('#add_APPLICATIONTYPE').val();
	parame.EDITSTATE = $('#add_EDITSTATE').val();
	parame.DESCRIPTION = $('#add_DESCRIPTION').val();//
	parame.fileID = "";
	fileIDs = fielIdReturn();
	if(fileIDs.length == 0){
		alert("出错了");
		
		return;
	}
	else if(fileIDs.length == 1 ){
		parame.fileID = fileIDs[0];
	}
	else {
		for(var i; i < fileIDs.length; i++){
			parame.fileID += fileIDs[i] + ",";
		}
	}
	
	$.ajax({
		  url:'standardController/addStandard.do',
		  data:parame,
		  success:function(o){
			  if(o <= 2){
				  alert("新增失败");
			  }
			  $('#addModal').modal('hide');
			  refresh();
		  }
		});
}

/* 废弃申请弹窗*/
function applyMondal(){
	
	if(! isLogin()){
		return;
	}
	else{
		var data = $('#table').bootstrapTable('getSelections');
		
		if(data.length == 0 || data.length > 1){
			alert("请选中一条数据");
			return;
		}
		
		$('#apply_STANDARDID').val(data[0].ID);
		
		$('#apply_STANDARDCODE').val(data[0].STANDARDCODE);
		$('#apply_STANDARDCODE').attr("disabled","disabled");
		
		$('#apply_STANDARDNAME').val(data[0].STANDARDNAME);
		$('#apply_STANDARDNAME').attr("disabled","disabled");
		
		$('#apply_TYPE').val(data[0].TYPE);
		$('#apply_TYPE').attr("disabled","disabled");
		
		/* 应用类型处理*/
		if(data[0].APPLICATIONTYPE == "国家标准"){
			$('#apply_APPLICATIONTYPE').val("0");		
		}
		if(data[0].APPLICATIONTYPE == "企业标准"){
			$('#apply_APPLICATIONTYPE').val("1");	
		}
		if(data[0].APPLICATIONTYPE == "作业指导书"){
			$('#apply_APPLICATIONTYPE').val("2");	
		} 
		$('#apply_APPLICATIONTYPE').attr("disabled","disabled"); 
		
		$('#apply_SUGGEST').val(data[0].SUGGEST);
		$('#apply_SUGGEST').attr("disabled","disabled"); 
		
		
		$('#applyModal').modal('show');
	}
}
/* 废弃申请*/
function apply(){
	
	var parame = {};
	parame.ID = $('#apply_STANDARDID').val();
	parame.ABANDONAPPLYMAN = $('#apply_ABANDONAPPLYMAN').val();
	parame.ABANDONAPPLYTIME = $('#apply_ABANDONAPPLYTIME').val();
	parame.ABANDONAPPLYREASON = $('#apply_ABANDONAPPLYREASON').val();
	$.ajax({
	  url:'standardController/upStandard.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  alert("修改失败");
		  }
		  $('#applyModal').modal('hide');
		  refresh();
	  }
	});

}

/*文件下载*/
function downFile(fileID){
	if( ! isLogin()){
		return;
	}
	else{
		if(confirm("确定下载？")){
			if(fileID === null || fileID === "" || fileID === "null"){
				alert("该文件不存在");
				return;
			}
			else{
				downOneFile(fileID);
				return;
			}
		}
	}
}


/* 弹出修改弹框方法 */
function openEditModal(){

	if(! isLogin()){
		return ;
	}
	else{
		$('#edit_STANDARDID').val(arguments[0].ID);
		$('#edit_STANDARDCODE').val(arguments[0].STANDARDCODE);
		$('#edit_STANDARDNAME').val(arguments[0].STANDARDNAME);
		$('#edit_TYPE').val(arguments[0].TYPE);
		$('#edit_SCOPE').val(arguments[0].SCOPE);
		/* 应用类型处理*/
		if(arguments[0].APPLICATIONTYPE == "国家标准"){
			$('#edit_APPLICATIONTYPE').val("0");		
		}
		if(arguments[0].APPLICATIONTYPE == "企业标准"){
			$('#edit_APPLICATIONTYPE').val("1");	
		}
		if(arguments[0].APPLICATIONTYPE == "作业指导书"){
			$('#edit_APPLICATIONTYPE').val("2");	
		}
		/*是否编辑处理 */
		
		if(arguments[0].EDITSTATE == "可编辑"){
			$('#edit_EDITSTATE').val("1");
			$("div#edit .form-control").attr("disabled",false);
		}
		if(arguments[0].EDITSTATE == "不可编辑"){
			$('#edit_EDITSTATE').val("0");
			$("div#edit .form-control").attr("disabled","disabled"); 
		}
		
		
		$('#edit_SUGGEST').val(arguments[0].SUGGEST);
		
		/* 状态处理*/
		
		if(arguments[0].STATE == "待审核"){
			$('#edit_STATE').val("0");
		}
		if(arguments[0].STATE == "通过"){
			$('#edit_STATE').val("1");
		}
		if(arguments[0].STATE == "已废弃"){
			$('#edit_STATE').val("2");
		}
		if(arguments[0].STATE == "驳回"){
			$('#edit_STATE').val("3");
		}
		$('#edit_DESCRIPTION').val(arguments[0].DESCRIPTION);
		
		
		$('#editModal').modal('show');
	}
	
	
}
/**/
function edit(){
	var parame = {};
	parame.ID = $('#edit_STANDARDID').val();
	parame.STANDARDCODE = $('#edit_STANDARDCODE').val();
	parame.STANDARDNAME = $('#edit_STANDARDNAME').val();
	parame.TYPE = $('#edit_TYPE').val();
	parame.SCOPE = $('#edit_SCOPE').val();
	parame.APPLICATIONTYPE = $("#edit_APPLICATIONTYPE").val();
	parame.EDITSTATE = $('#edit_EDITSTATE').val();
	parame.SUGGEST = $('#edit_SUGGEST').val();
	parame.STATE = $('#edit_STATE').val();
	
	$.ajax({
	  url:'standardController/upStandard.do',
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

/* 获取标准类型信息*/
function getStandardType(id){
	$.ajax({
		url : 'standardController/getStandardType.do',
		success : function(o) {
			
			if($('#' + id + '').children().length >= 0)
			{
				var data = JSON.parse(o);
				
				for (var i=0; i<data.length;i++)
				{
					$('#' + id + '').append("<option value='" + data[i].ID + "' >" +data[i].standardTypeName + " </option>");
				}
			}
			
		}

	});
}
