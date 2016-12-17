window.onload=function(){
	
	window.addEventListener("resize", positionAndSize);  //设置监听器
	
	/*加载登陆蒙板弹窗*/
	var loginbox = document.getElementById("login_box");
	var imask = document.getElementById("imask");
	
	var oMask = document.getElementById("imask");
	
	var oVerify = document.getElementById("login_box"); 
	
	function positionAndSize()   //窗体位置居中，遮面大小始终等于窗体大小
	{
		if(oVerify.offsetWidth != 0 && oVerify.offsetHeight != 0){

			if(document.documentElement.offsetHeight > window.innerHeight){
            	oMask.style.height = document.documentElement.offsetHeight + "px";
        	}else{

            	oMask.style.height = window.innerHeight + "px";
        	}
        	oMask.style.width = window.innerWidth + "px";
        	oVerify.style.left=(window.innerWidth - oVerify.offsetWidth)/2 + "px";
        	oVerify.style.top=(window.innerHeight - oVerify.offsetHeight)/2 + "px";
			
		}
	}
	
	$(".h-login").click(function(){
		loginbox.style.display = "block";
		imask.style.display = "block";
		positionAndSize();
		});
	
	$(".close").click(function(){
		loginbox.style.display="none";
		imask.style.display="none";
	});
};

function login(){
	var loginbox = document.getElementById("login_box");
	var imask = document.getElementById("imask");
	var password = $('#password').val(); 
	var clientNo = $('#clientNo').val();
	if(password == '' || typeof(password) == "undefined"
		|| clientNo == '' || typeof(clientNo) =="undefined"){ 
		alert("用户名或密码不能为空！"); 
	}else{
		var parame = {};
		parame.password = $('#password').val();
		parame.clientNo = $('#clientNo').val();
		$.ajax({
		  url:'clientController/clientLogin.do',
		  data:parame,
		  success:function(o){
			  if(o == "0"){
				  alert("用户名或密码错误或您的账户还未通过审核");
			  }else{
				  alert("登录成功，请继续操作！");
				  $('#login_box').hide();
				  loginbox.style.display="none";
				  imask.style.display="none";
				  window.location.href="/laboratorySystem/Portal/jsp/homePage/homePage.jsp";
			  }
		  }
		});
	}
}
$(function(){
	var name= $('#name').val();
	if(name == "null"||name==""||name == undefined){
		  $('#loginDivOne').show();
		  $('#loginDivTwo').hide();
	}
	else{
		 $('#loginA').html("欢迎您:"+name);
		 $('#loginDivOne').hide();	
		 $('#loginDivTwo').show();	
	}
	// window.location.reload();
});

function logout(){
	$.ajax({
		  url:'clientController/logout.do',
		  success:function(o){
			  if(o == 1){
				  $('#name').val("");
				  window.location.reload();
			  }
			  else
				  alert("注销失败！");
		  }
		});
}
$(document).ready(function(){
	$('#loginA'). mouseover(function(){
		$('#ulDiv').show();
	});
});
$(document).ready(function(){
	$('#loginA'). mouseout(function(){
		$('#ulDiv').hide();
	});
});
$(document).ready(function(){
	$('#ulDiv'). mouseover(function(){
		$('#ulDiv').show();
	});
});
$(document).ready(function(){
	$('#ulDiv'). mouseout(function(){
		$('#ulDiv').hide();
	});
});