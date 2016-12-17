var verify = "";
$(function(){
	var parame = {};
	var name = $('#name').val();
	parame.clientNo = $('#name').val();
	if(name == "null"||name==""||name == undefined){
		  alert("您还未登录");
	    }
	else{
		$.ajax({
			url :'clientController/getPersonage.do',
			data :parame,
			type : 'POST',// 提交方式
			dataType : 'json',// 返回数据的类型
			success:function(o) {// 后台处理数据成功后的回调函数
				var obj = new Array();//jsonO[0].stuName[0].name
				obj = eval(o);
				$('#clientNo1').val(obj.client[0].clientNo);
				$('#companyName').val(obj.client[0].companyName);
				$('#mobilePhone').val(obj.client[0].address);
				$('#fixedTelephone').val(obj.client[0].phoneNumber);	
				$('#manage').val(obj.client[0].scope);
				$('#representative').val(obj.client[0].legal);
				$('#companyType').val(obj.client[0].type);
				$('#idCard1').val(obj.client[0].qulicationPic);
				$('#idCard2').val(obj.client[0].businessLicence);
				$('#remarks').val(obj.client[0].remarks);
				$('#companyID').val(obj.client[0].companyID);
				$("#image1").attr("src",obj.client[0].qulicationPic);
				$("#image2").attr("src",obj.client[0].businessLicence);
				$('#clientPassword').val(obj.client[0].password);
				$('#clientID').val(obj.client[0].ID);
			},
		});
	}
});

//执照图上传方法
$(document).ready(function() {
   $('#license').fileupload({
         dataType: 'json',
         done: function (e, result) {
              if(result != null) {
            	  $('#idCard1').val(result.result);
                  /*$("#image1").attr("src",obj.client[0].legal);*/
            	  $("#licensePrompt").html("");
            	  $('#shang').text("上传成功，点击可更改");
              }
              else
            	  alert("上传失败！");
         }
     });
});
//资质图上传方法
$(document).ready(function() {
		   $('#aptitude').fileupload({
		         dataType: 'json',
		         done: function (e, result) {
		              if(result != null) {
		              		$('#idCard2').val(result.result) ;
		              		$("#aptitudePrompt").html("");
		              		$('#shangchuan').text("上传成功，点击可更改");
		              }
		              else
		            	  alert("上传失败！");
		         }
		     });
		});


//提交修改的个人信息
function change(){
	if(upperCase()&&companyCase()&&mobileCase()&&fixedCase()&&check()&&representativeCase()&&manageCase()&&companyTypeCase()){
		var parame = {};
		parame.clientNo = encodeURI($('#clientNo1').val());
		parame.clientID = encodeURI($('#clientID').val());
		parame.clientPassword = encodeURI($('#clientPassword').val());
    	parame.companyID = encodeURI($('#companyID').val());
		parame.companyName = encodeURI($('#companyName').val());
		parame.mobilePhone = encodeURI($('#mobilePhone').val());
		parame.fixedTelephone = encodeURI($('#fixedTelephone').val());
		parame.manage = encodeURI($('#manage').val());
		parame.representative = encodeURI($('#representative').val());
		parame.companyType = encodeURI($('#companyType').val());
		parame.remarks = encodeURI($('#remarks').val());
		parame.idCardLicense = $('#idCard1').val();
		parame.idCardAptitude = $('#idCard2').val();
		$.ajax({
		  url:'clientController/changePersonnel.do',
		  data:parame,
		  success:function(o){
				  alert("修改成功");
				  window.location.href="/laboratorySystem/Portal/jsp/homePage/homePage.jsp";
		  }
		});
    }
		else{
			alert("修改未能成功,请检查表单填写！");
			return;
		}
}

function verifyClientNo(){
	var parame = {};
	if($('#clientNo1').val() == $('#name').val()){
		verify ="true";
	}
	else{
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
					else{
						verify ="true";
					}
			  }
			});
	}
}
//个人信息验证
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
function companyCase(){
	var companyName = $("#companyName").val();
	if(companyName == ""){
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
	var ab=/^([0-9]{11})?$/; 
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
	var manage = $("#manage").val();
	if(manage == ""){
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
