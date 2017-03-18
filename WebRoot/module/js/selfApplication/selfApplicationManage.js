
$(function () {
	// 设置
	  initTable();
	 
});
/*function change(){
	 if($('#selfSampleName').val() == "" && $('#selfCompanyName').val() == ""){
		 $("#isTouchReviewStatus").val("not first");
	 }
	 else{
		 $("#isTouchReviewStatus").val("");
	 }
}*/
function initTable(){
	$('#table').bootstrapTable({
		height: 400,//定义表格的高度
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize:5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5,10,15],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'selfApplyID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'selfapplicationController/getSelfApplicationWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    queryParams:queryParams,
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			field:'ID',
			valign: 'middle'
		},{
			field:'selfCompanyName',//返回值名称
			title:'公司名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'selfSampleName',//返回值名称
			title:'样品名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'selfDetection',//返回值名称
			title:'检测方法',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'selfContact',//返回值名称
			title:'联系人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'selfContactPhone',//返回值名称
			title:'联系电话',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'selfEntryData',//返回值名称
			title:'录入日期',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'selfHasContact',//返回值名称
			title:'是否已联系',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},
		{
			field:'opration',///返回值名称
			title:'操作',//列名	
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		}]//列配置项,详情请查看 列参数 表格
	});
	function queryParams(pageReqeust) {  
	    //console.log("-----params-----"); 
	    pageReqeust.userName = "admin";  //
	    pageReqeust.querys = $(".input-outline").val(); 
	    pageReqeust.pageNo = this.offset;  
	    pageReqeust.pageSize = this.pageNumber;  
	    pageReqeust.length = 6;
	//直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，
	    
	   /* if($("#isTouchReviewStatus").val()==""||$("#isTouchReviewStatus").val().length==0)
       	 pageReqeust.isTouchReviewStatus = encodeURI("null");
       else
	    pageReqeust.isTouchReviewStatus =  encodeURI($("#isTouchReviewStatus").val()) ;*/
	    
        if($("#selfSampleName").val()=="")
        	 pageReqeust.selfSampleName = "null";
        else
	    pageReqeust.selfSampleName =  encodeURI($("#selfSampleName").val()) ;//传递中文参数乱码的解决方法
	  
	    if($("#selfCompanyName").val()=="")
	    	pageReqeust.selfCompanyName = "null";
	    else
	    pageReqeust.selfCompanyName =  encodeURI($("#selfCompanyName").val());
	    if($('select').val()=="")
	    	 pageReqeust.selfHasContact = "null";
	    else
	    	pageReqeust.selfHasContact = encodeURI($('select').val());
	    console.log(pageReqeust);
	    return pageReqeust;  
	}
}
/* 刷新方法 */
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

/*是否只是审核状态筛选事件*/
function changeIsTouchReviewStatus(){
	/*$("#isTouchReviewStatus").val("not first");*/
	 $('#table').bootstrapTable('destroy');
	  initTable();
	  change();
}

/* 弹出联系弹框方法 */
function contactModal(){
	var frameSrc = "module/jsp/roleManage/testFrame.html";
    $("#NoPermissioniframe").attr("src", frameSrc);
    $('#NoPermissionModal').modal({ show: true, backdrop: 'static' });
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 ){
		alert("请选中一条数据");
		return;
	}
	else if(data.length>1){
		alert("一次只能选中上一条数据");
		return;
	}
	$('#selfApplyID').val(data[0].selfApplyID);
	$('#selfCompanyId').val(data[0].selfCompanyId);
	$('#show_selfCompanyName').val(data[0].selfCompanyName);
	$('#show_selfSampleName').val(data[0].selfSampleName);
	$('#selfDetection').val(data[0].selfDetection);
	$('#selfContact').val(data[0].selfContact);
	$('#selfContactPhone').val(data[0].selfContactPhone);
	$('#selfEntryData').val(data[0].selfEntryData);
	$('#selfHasContact').val(data[0].selfHasContact);
	$('#selfRemork').val(data[0].selfRemork);
	$('#contactModal').modal('show');
    $('#contactModal').modal({ show: true, backdrop: 'static' });
}

function formSearch1(){
	 selfSampleName = $("#selfSampleName").val();
	 selfCompanyName = $("#selfCompanyName").val();
	 selfHasContact = $('select').val();
	  $('#table').bootstrapTable('destroy');
	  initTable();
}


  /*表单查询方法*/
 function formSearch(){ 
	 var selfSampleName = $("#selfSampleName").val();
	 var selfCompanyName = $("#selfCompanyName").val();
	 var selfHasContact = $('select').val();
	 ajaxParameter = {
				"selfSampleName":"sb",
				"selfCompanyName":selfCompanyName,
				"selfHasContact":selfHasContact,
	};
	 $.ajax({
		  url:'selfapplicationController/getSelfApplicationWithPaging.do',
		  data:{"selfSampleName":"sb","selfCompanyName":"sb","selfHasContact":"sb",},
		  dataType:'json',
		  success:function(o){
			  if(o<=0){
				  alert("查询失败");
			  }
			  alert("mmm");
			  alert(o);
			  refresh();
		  }
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

function contact(){
	if($('#selfHasContact').val() == '是'){
		alert("该申请已联系！");
		return;
	}
	var parame = {};
	parame.selfApplyID = $('#selfApplyID').val();
	$.ajax({
		  url:'selfapplicationController/contact.do',
		  data:parame,
		  success:function(o){
			  if(o == 1){
				  alert("修改成功");
			  }
			  $('#contactModal').modal('hide');
			  $('#contactModal').modal({ show: false, backdrop: 'static' });
			  refresh();
		  }
		});
}
function displayAll(){
	 $("#selfSampleName").val("");
	 $("#selfCompanyName").val("");
	 $('select').val("全部");
	 $('#table').bootstrapTable('destroy');
	 initTable();
}
/* //打开模态框
function openModal1(){
	  alert("openModal()");
  var fatherBody = $(window.top.document.body);
  var id = 'pages';
  var dialog = $('#' + id);
  if (dialog.length == 0) {
      dialog = $('<div class="modal fade" role="dialog" id="' + id + '">ssbb</div>');
      dialog.appendTo(fatherBody);
  }
  dialog.load("/laboratorySystem/index.jsp", function() {
      dialog.modal({
        backdrop: false
      });
  });
  fatherBody.append("<div id='backdropId' class='modal-backdrop fade in'></div>");
}

//关闭模态框
function closeModal(){
  var fatherBody = $(window.top.document.body);
  fatherBody.find("#pages").on('hidden.bs.modal', function (e) {
      fatherBody.find("#backdropId").remove();
  });
}
*/


