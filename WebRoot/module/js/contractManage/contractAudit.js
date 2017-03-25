/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/contractManage/contractAudit.jsp";
}

/**
 * 使页面跳转到查看合同页面(审核)
 */
function showContractA(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	var ID = data[0].ID;
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		window.location.href="module/jsp/contractManage/contractView.jsp?ID="+ ID + "&type=1";
	}
}

/**
 * 弹出编辑意见的方法 
 */
function writeModal1(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	var ID = data[0].ID;
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		$('#approveCause').attr({'name' : "" + ID + ""});
		$('#writeModal1').modal('show');
	}
	
}

/**
 * 弹出编辑意见的方法 
 */
function writeModal2(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	var ID = data[0].ID;
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		$('#rejecteCause').attr({'name' : "" + ID + ""});
		$('#writeModal2').modal('show');
	}
}


/**
 * 提交审核意见（通过）
 */
function approved(){
	var approveCause = $('#approveCause').val(); 
	if (!approveCause && typeof(approveCause)!="undefined" && approveCause=='') 
	{ 
		swal("审核意见不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#approveCause').attr("name");
		parame.viewpoint = $('#approveCause').val();
		parame.state = 4;
		
		$.ajax({
		  url:'contractController/auditContract.do',
		  data:parame,
		  success:function(o){
			  
			  if(o <= 0){
				  swal("操作失败！");
			  }
			  $('#writeModal1').modal('hide');
			  refresh();
		  }
		});
	}
}

/**
 * 提交审核意见（未通过）
 */
function rejected(){
	var rejecteCause = $('#rejecteCause').val(); 
	if (!rejecteCause && typeof(rejecteCause)!="undefined" && rejecteCause=='') 
	{ 
		swal("审核意见不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#rejecteCause').attr("name");
		parame.viewpoint = $('#rejecteCause').val();
		parame.state = 3;
		
		$.ajax({
		  url:'contractController/auditContract.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  swal("操作失败！");
			  }
			  $('#writeModal2').modal('hide');
			  refresh();
		  }
		});
	}
}