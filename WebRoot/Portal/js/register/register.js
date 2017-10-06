var verify = "";
function checkTextName(){
 
	 var strReg=""; 
     var r; 
     var strText= document.getElementById("input1").value;
     if(strText=="" || strText==null)
     {
    	 		
   $(".notnonecontainer1").html($(".notnonetextname").html());

     }
     else {
    	 $(".notnonecontainer1").html($(".notnonehave").html());
     }
}

function checkTextAddress(){
	 
	 var strReg=""; 
    var r; 
    var strText= document.getElementById("input2").value;
    if(strText=="" || strText==null)
    {
   	 		
  $(".notnonecontainer2").html($(".notnonetextaddress").html());

    }
    else {
   	 $(".notnonecontainer2").html($(".notnonehave").html());
    }
}

function checkTextPerson(){
	 
   var strReg=""; 
   var r; 
   var strText= document.getElementById("input2").value;
   if(strText=="" || strText==null)
   {
  	 		
 $(".notnonecontainer3").html($(".notnonetextperson").html());

   }
   else {
  	 $(".notnonecontainer3").html($(".notnonehave").html());
   }
}
//执照图上传方法
function openModal(idCard){
	document.getElementById('uploadfileQueue').innerHTML = '';
	document.getElementById('add_TemplateName').value = '';
	document.getElementById('add_TemplateRemarks').value = '';
	fileUploadInit("#file_upload",idCard);
	$("#addModal").modal("show");
}
/*上传 文件*/
function upfile(){
	
	path = $("#file_upload").val(); // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	type = "0" // 文件类型       该处默认为模板文件
	belongID = "";//文件所属ID
	firstDirectoryName = $('#fileType option:checked').text();// 一级目录
	secondDirectoryName = $('#fileSubtype option:checked').text(); // 二级目录
	thirdDirectoryName = ""; //三级目录
	otherInfo = ""; // 其他参数
	remarks = $('#add_TemplateRemarks').val(); // 备注
	
	fileUpload("#file_upload",path, type, belongID,firstDirectoryName, secondDirectoryName,thirdDirectoryName,
			otherInfo, remarks);

	// 延迟执行
	setTimeout("addTemplate()",1500); 
	
}


//人员信息注册方法
function add(){
    if(upperCase()&&passwordCase()&&companyCase()&&mobileCase()&&fixedCase()&&check()){
    	var parame = {};
		parame.clientNo = encodeURI($('#clientNo1').val());
		parame.password = encodeURI($('#password1').val());
		parame.companyName = encodeURI($('#companyID').val());
		parame.address = encodeURI($('#mobilePhone').val());
		parame.mobilePhone = encodeURI($('#fixedTelephone').val());
		parame.scope = encodeURI($('#manage').val());
		parame.legal = encodeURI($('#representative').val());
		parame.companyType = encodeURI($('#companyType').val());
		parame.remarks = encodeURI($('#remarks').val());
		parame.fileID1 = encodeURI($('#idCard1').val());
		parame.fileID2 =encodeURI($('#idCard2').val());
		$.ajax({
		  url:'clientController/addPersonnel.do',
		  data:parame,
		  success:function(o){
				  alert("注册成功");
				  $('#clientNo1').val("");
				  $('#password1').val("");
				  $('#companyID').val("");
				  $('#mobilePhone').val("");
				  $('#fixedTelephone').val("");
				  $('#remarks').val("");
				  $('#idCard1').val("");
				  $('#idCard2').val("");
				  $('#manage').val("");
				  $('#representative').val("");
				  $('#companyType').val("");
				  window.location.reload();
				  window.location.href="/laboratorySystem/Portal/jsp/homePage/homePage.jsp";
		  }
		});
    }
		else{
			alert("注册未能成功,请检查表单填写！");
			return;
		}
}

function verifyClientNo(){
	var parame = {};
	parame.clientNo = encodeURI($('#clientNo1').val());
	$.ajax({
		  url:'clientController/verifyClientNo.do',
		  data:parame,
		  type : 'POST',// 提交方式
		  dataType : 'json',// 返回数据的类型
		  success:function(o){
			    verify = o;
				if(verify == "false"){
					$("#clientNoPrompt").html("*该账户已经被使用！");
					verify = "false";
				}
				else
					verify ="true";
		  }
		});
}
//注册表单输入验证函数
function upperCase(){
	var clientNo1 = $("#clientNo1").val();
	if(clientNo1== ""){
		$("#clientNoPrompt").html("*账户不能为空");
		return false;
	}
	else if(clientNo1.length < 6){
		$("#clientNoPrompt").html("*账户至少为6位");
		return false;
	}
	verifyClientNo();
	if(verify == "false"){
		return false;
	}
	return true;
}
function createInput(){
	$("#clientNoPrompt").html("");
}
function passwordCase(){
	var password = $("#password1").val();
	if(password.length < 6){
		$("#passwordPrompt").html("*密码长度至少为6位");
		return false;
	}
	return true;
}
function passwordInput(){
	$("#passwordPrompt").html("");
}
function companyCase(){
	var companyID = $("#companyID").val();
	if(companyID == ""){
		$("#companyPrompt").html("*公司名称不能为空");
		return false;
	}
	return true;
}
function companyInput(){
	$("#companyPrompt").html("");
}
function mobileCase(){
	var mobilePhone = $("#mobilePhone").val();
	if(mobilePhone == ""){
		$("#mobilePrompt").html("*通讯地址不能为空");
		return false;
	}
	return true;
}
function mobileInput(){
	$("#mobilePrompt").html("");
}
function fixedCase(){
	
	var fixedTelephone = $("#fixedTelephone").val();
//	var ab=/^([0-9]{11})?$/; 
	var ab=/^(13|15|18)\d{9}$/i;
	if(fixedTelephone == ""){
		$("#fixedPrompt").html("*电话号码不能为空");	
		return false;
	}
	else if(!ab.test(fixedTelephone)){
		$("#fixedPrompt").html("*电话号码格式不正确");
		return false;
	}
	return true;
}
function fixedInput(){
	$("#fixedPrompt").html("");
}
function check(){
	var idCard1 = $('#idCard1').val();
	var idCard2 = $('#idCard2').val();
	if(idCard1 == ""){
		$("#licensePrompt").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*执照图必须上传");
		return false;
	}
	if(idCard2 == ""){
		$("#aptitudePrompt").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*资质图必须上传");
		return false;
	}
	return true;
}
function manageCase(){
	var password = $("#manage").val();
	if(password == ""){
		$('#managePrompt').html("*经营范围不能为空");
		return false;
	}
	return true;
}
function manageInput(){
	$("#managePrompt").html("");
}
function representativeCase(){
	var representative = $("#representative").val();
	if(representative == ""){
		$('#representativePrompt').html("*法定代表不能为空");
		return false;
	}
	return true;
}
function representativeInput(){
	$("#representativePrompt").html("");
}

function companyTypeCase(){
	var companyType = $("#companyType").val();
	if(companyType == ""){
		$('#companyTypePrompt').html("*公司类型不能为空");
		return false;
	}
	else if(!(companyType >='0'&&companyType <='9')){
		$('#companyTypePrompt').html("*公司类型必须为1-9的数字");
		return false;
	}
	return true;
}
function companyTypeInput(){
	$("#companyTypePrompt").html("");
}