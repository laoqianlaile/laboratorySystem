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
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID不能为空！"); 
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
		    		alert(myobj[0].contractName);
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
		    		$('#show_isClassified').html(myobj[0].isClassified);
		    		$('#show_classifiedLevel').html(myobj[0].classifiedLevel);
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
	var ID = $('#fileID').html();
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID不能为空！"); 
	}else{
		$.post("fileOperateController/onlinePreview.do", {
			ID : id
		}, function(result) {
			if (result != null && result != "null") {
				window.location.href = "module/jsp/documentOnlineView.jsp";
			} else {
				alert("无法查看");
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
	if (!approveCause && typeof(approveCause)!="undefined" && approveCause=='') 
	{ 
		alert("审核意见不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#show_ID').text();
		parame.viewpoint = $('#approveCause').val();
		parame.state = 4;
		
		$.ajax({
		  url:'contractController/auditContract.do',
		  data:parame,
		  success:function(o){
			  
			  if(o <= 0){
				  alert("操作失败！");
			  }
			  $('#writeModal1').modal('hide');
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
		alert("审核意见不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#show_ID').text();
		parame.viewpoint = $('#rejecteCause').val();
		parame.state = 3;
		
		$.ajax({
		  url:'contractController/auditContract.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("操作失败！");
			  }
			  $('#writeModal2').modal('hide');
		  }
		});
	}
}