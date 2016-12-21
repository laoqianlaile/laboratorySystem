var verify = "";
//加载修改密码界面
function findPassword(){
	if(upperCase()&&fixedCase()){
	var parame = {};
	parame.clientNo = $('#clientNo1').val();
	parame.mobilePhone = $('#fixedTelephone').val();
	$.ajax({
		url :'clientController/findPassword.do',
		data :parame,
		type : 'POST',// 提交方式
		dataType : 'json',// 返回数据的类型
		success:function(o) {// 后台处理数据成功后的回调函数
			if(o == "1"){
				alert("尊敬的用户，您的密码已通过短信发送到您的手机，请妥善保管您的密码！");
				 window.location.href="/laboratorySystem/Portal/jsp/homePage/homePage.jsp";
			}
			else{
				alert("您输入的账户有误或电话与注册是不一致!");
			}
		},
	});
    }
	else{
		alert("密码找回未能成功,请检查您填写的数据！");
		return;
	}
};
//检查用户名是否存在
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
					verify = "false";
				}
				else{
					verify ="true";
					$("#clientNoPrompt").html("*该账户不存在！");
				}
		  }
		});
}

//判断表单是否填写正确
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
	if(verify == "true"){
		return false;
	}
	return true;
}
function createInput(){
	$("#clientNoPrompt").html("");
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