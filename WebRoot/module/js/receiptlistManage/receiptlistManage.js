
$(function () {
	// 设置
	  initTable();
});
function initTable(){
	  //隐藏不需要展示的列
	
	$('#table').bootstrapTable({
		height: 400,//定义表格的高度
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize:5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5,10,20, 100, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'clientController/getRegistryWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    queryParams:queryParams,
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			field:'ID'
		},{
			field:'id',//返回值名称
			title:'clientId',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'companyName',//返回值名称
			title:'公司名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'address',//返回值名称
			title:'通讯地址',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'clientNo',//返回值名称
			title:'登录名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'password',//返回值名称
			title:'密码',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'reviewStatus',//返回值名称
			title:'审核状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},/*{
			field:'fileID1',//返回值名称
			title:'执照图',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'fileID2',///返回值名称
			title:'资质图',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},*/{
			field:'mobilePhone',///返回值名称
			title:'联系电话',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'scope',///返回值名称
			title:'经营范围',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'legal',///返回值名称
			title:'法定代表',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'companyType',///返回值名称
			title:'公司类型',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		},{
			field:'companyRemarks',///返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
		}]//列配置项,详情请查看 列参数 表格
	});
	$('#table').bootstrapTable('hideColumn', 'id');
    $('#table').bootstrapTable('hideColumn', 'address');
    $('#table').bootstrapTable('hideColumn', 'password');
    $('#table').bootstrapTable('hideColumn', 'businessLicence');
    $('#table').bootstrapTable('hideColumn', 'qulicationPic');
    $('#table').bootstrapTable('hideColumn', 'scope');
    $('#table').bootstrapTable('hideColumn', 'legal');
	function queryParams(pageReqeust) {  
	    //console.log("-----params-----"); 
	    pageReqeust.userName = "admin";  //
	    pageReqeust.querys = $(".input-outline").val(); 
	    pageReqeust.pageNo = this.offset;  
	    pageReqeust.pageSize = this.pageNumber;  
	    pageReqeust.length = 6;
	//form表单的按钮要刷新页面，直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，
	    if($("#isTouchReviewStatus").val()==""||$("#isTouchReviewStatus").val().length==0)
       	 pageReqeust.isTouchReviewStatus = encodeURI("null");
       else
	    pageReqeust.isTouchReviewStatus =  encodeURI($("#isTouchReviewStatus").val()) ;
	    
	    
        if($("#companyName").val()==""||$("#companyName").val().length==0)
        	 pageReqeust.companyName = encodeURI("null");
        else
	    pageReqeust.companyName =  encodeURI($("#companyName").val()) ;//传递中文参数乱码的解决方法
	  
	    if($("#clientNo").val()==""||$("#clientNo").val().length==0)
    	pageReqeust.clientNo = encodeURI("null");
	    else
	    pageReqeust.clientNo =  encodeURI($("#clientNo").val());
	    var options=$("#reviewStatus option:selected");  //获取选中的项
	    reviewStatus = options.val();
		   pageReqeust.reviewStatus = encodeURI(reviewStatus);
	    /*if($('select').val()==""||$('select').val().length==0)
	    	 pageReqeust.reReviewStatus = encodeURI("null");
	    else
	    	pageReqeust.reReviewStatus = encodeURI($('select').val());*/
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
	$("#isTouchReviewStatus").val("not first");
	 $('#table').bootstrapTable('destroy');
	  initTable();
	  $("#isTouchReviewStatus").val("");
	
}


/* 弹出注册详情弹框 */
function registerModal(){
	var frameSrc = "module/jsp/roleManage/testFrame.html";
    $("#NoPermissioniframe").attr("src", frameSrc);
    $('#NoPermissionModal').modal({ show: true, backdrop: 'static' });
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	
	$('#show_companyName').val(data[0].companyName);
	$('#address').val(data[0].address);
	$('#show_clientNo').val(data[0].clientNo);
	$('#password').val(data[0].password);
	$('#reviewStatus1').val(data[0].reviewStatus);
	$('#phoneNumber').val(data[0].mobilePhone);
	$('#scope').val(data[0].scope);
	$('#legal').val(data[0].legal);
	$('#type').val(data[0].companyType);
	$("#show_qulicationPic").attr('src',data[0].path1);
	$("#show_businessLicence").attr('src',data[0].path2);
	$('#remarks').val(data[0].companyRemarks);
	$('#contactModal').modal('show');
   $('#contactModal').modal({ show: true, backdrop: 'static' });
}
/*弹出审核详情弹框*/
function checkModal(){
	var frameSrc = "module/jsp/roleManage/testFrame.html";
    $("#NoPermissioniframe").attr("src", frameSrc);
    $('#NoPermissionModal').modal({ show: true, backdrop: 'static' });
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	if(data[0].reviewStatus=="审核成功"||data[0].reviewStatus=="审核失败"){
		alert("请选择未审核数据");
		return;
	}
	
		
	$('#check_clientId').val(data[0].id);
	$('#check_companyName').val(data[0].companyName);
	$('#check_address').val(data[0].address);
	$('#check_clientNo').val(data[0].clientNo);
	$('#check_password').val(data[0].password);
	$('#check_phoneNumber').val(data[0].mobilePhone);
	$('#check_scope').val(data[0].scope);
	$('#check_legal').val(data[0].legal);
	$('#check_type').val(data[0].companyType);
	$('#check_remarks').val(data[0].companyRemarks);
	$("#check_qulicationPic").attr('src',data[0].path2);
	$("#check_businessLicence").attr('src',data[0].path1);
	$('#checkModal').modal('show');
   $('#checkModal').modal({ show: true, backdrop: 'static' });
}

/*表单查询方法
 * function:根据表单数据查询后，返回值显示在表格中*/
function formSearch1(){
	 /*companyName = $("#companyName").val();
	 clientNo = $("#clientNo").val();*/
	/* reviewStatus = $('reviewStatus').val();*/
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
 /*修改审核状态,并发送短信*/
 function updateStatus(){
	 var options=$("#check_reviewStatus option:selected");  //获取选中的项
	 check_reviewStatus = options.val();
	 check_clientId = $("#check_clientId").val();
	 if(check_reviewStatus=="通过")
		  check_reviewStatus="1";
		 else
		  check_reviewStatus="2"; 
	 /*alert("审核："+check_reviewStatus);//审核状态 0:未审核  1：审核成功  2：审核失败*/		
	    var ajaxParameter = {
				"reviewStatus":encodeURI(check_reviewStatus),
				"clientID":check_clientId,
		};
		check_phoneNumber = $("#check_phoneNumber").val();
		check_clientNo = $("#check_clientNo").val();
		check_password = $("#check_password").val();
		$.ajax({
		  url:'clientController/updateStatus.do',
		  data:ajaxParameter,
		  success:function(o){
			  if(o<=0){
				  alert("更新失败");
			  }
			  alert("更新审核状态成功");
			  refresh();
			  if(check_reviewStatus=="1"){//发送审核成功的短信
				  alert("进入审核成功发短信");
			  $.ajax({
				  url:'contractController/sendMessage.do',//审核完后给用户发短信
				  data:{"phnumber":check_phoneNumber,"accountName":encodeURI(check_clientNo),"password":check_password},
				  success:function(o){
					  alert("发送短信返回值："+o);
					  
				  }
				});
			  }else{
				  $.ajax({//发送审核失败的短信
					  url:'contractController/sendFailureMessage.do',//审核完后给用户发短信
					  data:{"phnumber":check_phoneNumber,"accountName":encodeURI(check_clientNo)},
					  success:function(o){
						  alert("发送短信返回值："+o);
					  }
					});
				  
			  }
			  
		  }
		});
	}
 
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


