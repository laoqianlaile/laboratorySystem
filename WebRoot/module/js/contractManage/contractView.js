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
		    		chenkDataCon(myobj);
		    		if(myobj[0].ID == undefined){
		    			$('#contractID').html(myobj.ID);
		    		}else{
		    			$('#contractID').html(myobj[0].ID);
		    		}
		    		if(myobj[0].fileID == undefined){
		    			$('#fileID').html(myobj.fileID);
		    		}else{
		    			$('#fileID').html(myobj[0].fileID);
		    		}
		    		if(myobj[0].show_state == undefined){
		    			$('#show_state').html(myobj.state);
		    		}else{
		    			$('#show_state').html(myobj[0].state);
		    		}
		    		if(myobj[0].contractCode == undefined){
		    			$('#show_contractCode').html(myobj.contractCode);
		    		}else{
		    			$('#show_contractCode').html(myobj[0].contractCode);
		    		}
		    		if(myobj[0].contractName == undefined){
		    			$('#show_contractName').html(myobj.contractName);
		    		}else{
		    			$('#show_contractName').html(myobj[0].contractName);
		    		}
		    		if(myobj[0].address == undefined){
		    			$('#show_address').html(myobj.address);
		    		}else{
		    			$('#show_address').html(myobj[0].address);
		    		}
		    		if(myobj[0].signAddress == undefined){
		    			$('#show_signAddress').html(myobj.signAddress);
		    		}else{
		    			$('#show_signAddress').html(myobj[0].signAddress);
		    		}
		    		if(myobj[0].companyName == undefined){
		    			$('#show_companyName').html(myobj.companyName);
		    		}else{
		    			$('#show_companyName').html(myobj[0].companyName);
		    		}
		    		if(myobj[0].oppositeMen == undefined){
		    			$('#show_oppositeMen').html(myobj.oppositeMen);
		    		}else{
		    			$('#show_oppositeMen').html(myobj[0].oppositeMen);
		    		}
		    		if(myobj[0].linkPhone == undefined){
		    			$('#show_linkPhone').html(myobj.linkPhone);
		    		}else{
		    			$('#show_linkPhone').html(myobj[0].linkPhone);
		    		}
		    		if(myobj[0].startTime == undefined){
		    			$('#show_startTime').html(myobj.startTime);
		    		}else{
		    			$('#show_startTime').html(myobj[0].startTime);
		    		}
		    		if(myobj[0].endTime == undefined){
		    			$('#show_endTime').html(myobj.endTime);
		    		}else{
		    			$('#show_endTime').html(myobj[0].endTime);
		    		}
		    		if(myobj[0].employeeName == undefined){
		    			$('#show_employeeName').html(myobj.employeeName);
		    		}else{
		    			$('#show_employeeName').html(myobj[0].employeeName);
		    		}
		    		if(myobj[0].signTime == undefined){
		    			$('#show_signTime').html(myobj.signTime);
		    		}else{
		    			$('#show_signTime').html(myobj[0].signTime);
		    		}
		    		if(myobj[0].contractAmount == undefined){
		    			$('#show_contractAmount').html(myobj.contractAmount);
		    		}else{
		    			$('#show_contractAmount').html(myobj[0].contractAmount);
		    		}
		    		if(myobj[0].technicalContent == undefined){
		    			$('#show_technical').html(myobj.technicalContent);
		    		}else{
		    			$('#show_technical').html(myobj[0].technicalContent);
		    		}
		    		if(myobj[0].isClassified == undefined){
		    			switch (myobj.isClassified) {
			    		case 0: $('#show_isClassified').html("非涉密");break;
			    		case 1: $('#show_isClassified').html("涉密");break;
			    		default:
			    			break;
			    		}
		    		}else{
		    			switch (myobj[0].isClassified) {
			    		case 0: $('#show_isClassified').html("非涉密");break;
			    		case 1: $('#show_isClassified').html("涉密");break;
			    		default:
			    			break;
			    		}
		    		}
		    		if(myobj[0].classifiedLevel == undefined){
		    			switch (myobj.classifiedLevel) {
			    		case 0: $('#show_classifiedLevel').html("秘密");break;
			    		case 1: $('#show_classifiedLevel').html("机密");break;
			    		case 2: $('#show_classifiedLevel').html("绝密");break;
			    		case 3: $('#show_classifiedLevel').html("无密级");break;
			    		default:
			    			break;
			    		}
		    		}else{
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
		    	 }
		});
	}
}

//检查合同文件数据是否合理
function chenkDataCon(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("contractCode") || dataObj.contractCode == null || dataObj.contractCode == undefined || dataObj.contractCode.trim() == "") {
		dataObj.contractCode = ""; //没有合同文件
	}
	if (!dataObj.hasOwnProperty("contractName") || dataObj.contractName == null || dataObj.contractName == undefined || dataObj.contractName.trim() == "") {
		 dataObj.contractName = "";
	}
	if (!dataObj.hasOwnProperty("companyID") || dataObj.companyID == null || dataObj.companyID == undefined || dataObj.companyID.trim() == "") {
		dataObj.companyID = ""; 
	}
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null || dataObj.companyName == undefined || dataObj.companyName.trim() == "") {
		dataObj.companyName = "没有该公司,请新增";
	}
	if (!dataObj.hasOwnProperty("oppositeMen") || dataObj.oppositeMen == null || dataObj.oppositeMen == undefined || dataObj.oppositeMen.trim() == "") {
		dataObj.oppositeMen = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null || dataObj.linkPhone == undefined ) {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("employeeID") || dataObj.employeeID == null || dataObj.employeeID == undefined || dataObj.employeeID.trim() == "") {
		dataObj.employeeID = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null || dataObj.contractCode == undefined || dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("address") || dataObj.address == null || dataObj.address == undefined || dataObj.address.trim() == "") {
		dataObj.address = "";
	}
	if (!dataObj.hasOwnProperty("signAddress") || dataObj.signAddress == null || dataObj.signAddress == undefined || dataObj.signAddress.trim() == "") {
		dataObj.signAddress = "";
	}
	if (!dataObj.hasOwnProperty("signTime") || dataObj.signTime == null || dataObj.signTime == undefined || dataObj.signTime.trim() == "") {
		dataObj.signTime = "";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null || dataObj.startTime == undefined || dataObj.startTime.trim() == "") {
		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("endTime") || dataObj.endTime == null || dataObj.endTime == undefined || dataObj.endTime.trim() == "") {
		dataObj.endTime = "";
	}
	if (!dataObj.hasOwnProperty("contractAmount") || dataObj.contractAmount == null || dataObj.contractAmount == undefined ) {
		dataObj.contractAmount = "0";
	}
	if (!dataObj.hasOwnProperty("technicalID") || dataObj.technicalID == null || dataObj.technicalID == undefined || dataObj.technicalID.trim() == "") {
		dataObj.technicalID = "";
	}
	if (!dataObj.hasOwnProperty("technicalContent") || dataObj.technicalContent == null || dataObj.technicalContent == undefined || dataObj.technicalContent.trim() == "") {
		dataObj.technicalContent = "";
	}
	if (!dataObj.hasOwnProperty("isClassified") || dataObj.isClassified == null || dataObj.isClassified == undefined || dataObj.isClassified.trim() == "") {
		dataObj.isClassified = "0";
	}
	if (!dataObj.hasOwnProperty("classifiedLevel") || dataObj.classifiedLevel == null || dataObj.classifiedLevel == undefined || dataObj.classifiedLevel.trim() == "") {
		dataObj.classifiedLevel = "3";
	}
	if (!dataObj.hasOwnProperty("contractType") || dataObj.contractType == null || dataObj.contractType == undefined) {
		dataObj.contractType = "0";
	}
	if (!dataObj.hasOwnProperty("contractType") || dataObj.contractType == null || dataObj.contractType == undefined) {
		dataObj.contractType = "0";
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
			result = eval(result);
			if (result != null && result != "null") {
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