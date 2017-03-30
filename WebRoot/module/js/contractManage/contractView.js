$(document).ready(function(){ 
	getContractByID();
}); 

//得到地址栏参数的值
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)
    	 return  unescape(r[2]);
     return null;
}

//得到合同的信息
function getContractByID(){
	var type = GetQueryString("type");
	var goback = document.getElementById("btn-goback");
	var writeModal1 = document.getElementById("btn-writeModal1");
	var writeModal2 = document.getElementById("btn-writeModal2");
	if(type == 0){
		goback.style.display = "block";
		writeModal1.style.display = "none";
		writeModal2.style.display = "none";
	  
	}else if(type == 1){
		goback.style.display = "inline-block";
		writeModal1.style.display = "inline-block";
		writeModal2.style.display = "inline-block";
	}
	var ID = GetQueryString("ID");
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		$.ajax({  
		     url:'contractController/getContractByID.do',// 跳转到 action
		     type:'post', 
		     data:parame,
		     dataType:'json',
		     success:getid=function(data){
		    	 if (data) {
		    		var myobj = JSON.parse(data);
		    		$('#contractID').html(myobj[0].ID);
		    		$('#fileID').html(myobj[0].fileID);
		    		$('#show_state').html(myobj[0].state);
		    		$('#show_contractCode').html(myobj[0].contractCode);
		    		$('#show_contractName').html(myobj[0].contractName);
		    		$('#show_signAddress').html(myobj[0].signAddress);
		    		$('#show_companyName').html(myobj[0].companyName);
		    		$('#show_oppositeMen').html(myobj[0].oppositeMen);
		    		$('#show_linkPhone').html(myobj[0].linkPhone);
		    		$('#show_startTime').html(myobj[0].startTime);
		    		$('#show_endTime').html(myobj[0].endTime);
		    		$('#show_employeeName').html(myobj[0].employeeName);
		    		$('#show_signTime').html(myobj[0].signTime);
		    		$('#show_contractAmount').html(myobj[0].contractAmount);
		    		switch (myobj[0].isClassified) {
		    		case 0: $('#show_isClassified').html("非涉密");break;
		    		case 1: $('#show_isClassified').html("涉密");break;
		    		default:
		    			break;
		    		}
		    		switch (myobj[0].classifiedLevel) {
		    		case 0: $('#show_classifiedLevel').html("秘密");break;
		    		case 1: $('#show_classifiedLevel').html("机密");break;
		    		case 2: $('#show_classifiedLevel').html("绝密");break;
		    		case 3: $('#show_classifiedLevel').html("无密级");break;
		    		default:
		    			break;
		    		}
		    		}
		    	 }
		});
	}
}

//返回函数
function goback(){
	window.history.back(-1); 
}

function showContractFile(){
	var ID = GetQueryString("ID");
	var parame = {};
	parame.ID = ID;
	$.ajax({  
	     url:'contractController/isContractFile.do',// 跳转到 action
	     type:'post', 
	     data:parame,
	     dataType:'json',
	     success:function(data){
	    	 if (data == 0) {
	    		swal("该合同没有合同文件！");
	    	}else if (data == 1){
	    		showFile();
	    	}
	     }
	});
}
	
function showFile(){
	var ID = $('#fileID').html();
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("文件ID不能为空！"); 
	}else{
		$.post("fileOperateController/onlinePreview.do", {
			ID : ID
		}, function(result) {
			if (result != null || result != "null") {
				window.location.href = "module/jsp/documentOnlineView.jsp";
			} else {
				swal("无法查看");
			}
		});
	}
}

/**
 * 弹出编辑意见的方法 
 */
function writeModal1(){
	
	$('#writeModal1').modal('show');
	$('#showModal').modal('hide');
}

/**
 * 弹出编辑意见的方法 
 */
function writeModal2(){
	
	$('#writeModal2').modal('show');
	$('#showModal').modal('hide');
}


/**
 * 提交审核意见（通过）
 */
function approved(){
	var approveCause = $('#approveCause').val(); 
	if (!approveCause || typeof(approveCause)=="undefined" || approveCause.trim() == "NULL") 
	{ 
		swal("审核意见不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#contractID').text();
		parame.viewpoint = $('#approveCause').val();
		parame.state = 4;
		
		$.ajax({
		  url:'contractController/auditContract.do',
		  data:parame,
		  success:function(o){
			  
			  if(o <= 0){
				  swal("操作失败！");
			  }
			  goback();
		  }
		});
	}
}

/**
 * 提交审核意见（未通过）
 */
function rejected(){
	var rejecteCause = $('#rejecteCause').val(); 
	if (!rejecteCause || typeof(rejecteCause)=="undefined" || rejecteCause.trim() == "NULL") 
	{ 
		swal("审核意见不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#contractID').text();
		parame.viewpoint = $('#rejecteCause').val();
		parame.state = 3;
		
		$.ajax({
		  url:'contractController/auditContract.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  swal("操作失败！");
			  }
			  goback();
		  }
		});
	}
}