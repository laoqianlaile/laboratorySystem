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
$(document).ready(function() {
   $('#license').fileupload({
         dataType: 'json',
         done: function (e, result) {
              if(result == null) {
            	  alert("上传失败");
              }
              else if(result.result == "false"){
            	  alert("您上传图片的格式不正确");
              }
              else{
            	  $('#idCard1').val(result.result);
            	  $("#licensePrompt").html("");
            	  $('#shang').text("上传成功，点击可更改"); 	 
              }
         }
     });
});
//资质图上传方法
$(document).ready(function() {
		   $('#aptitude').fileupload({
		         dataType: 'json',
		         done: function (e, result) {
		              if(result == null) {
		            	  alert("上传失败");
		              }
		              else if(result.result == "false"){
		            	  alert("您上传图片的格式不正确");
		              }
		              else{
		            	  $('#idCard2').val(result.result) ;
		              	  $("#aptitudePrompt").html("");
		              	  $('#shangchuan').text("上传成功，点击可更改");
		              }
		         }
		     });
		});

//人员信息注册方法
function add(){
    if(upperCase()&&passwordCase()&&companyCase()&&mobileCase()&&fixedCase()&&check()){
    	var parame = {};
		parame.clientNo = encodeURI($('#clientNo1').val());
		parame.password = encodeURI($('#password1').val());
		parame.companyID = encodeURI($('#companyID').val());
		parame.mobilePhone = encodeURI($('#mobilePhone').val());
		parame.fixedTelephone = encodeURI($('#fixedTelephone').val());
		parame.manage = encodeURI($('#manage').val());
		parame.representative = encodeURI($('#representative').val());
		parame.companyType = encodeURI($('#companyType').val());
		parame.remarks = encodeURI($('#remarks').val());
		parame.idCardLicense = encodeURI($('#idCard1').val());
		parame.idCardAptitude =encodeURI($('#idCard2').val());
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