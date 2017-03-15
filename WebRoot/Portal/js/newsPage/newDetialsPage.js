/*var count = 60; //计数器变量
var deletDJ=0;	//判断事件变量
var setTID; //setTimeout容器
window.onload=function(){
	加载蒙板弹窗
	var showdiv = document.getElementById("showdiv");
	var imask = document.getElementById("imask");
	var loginbox = document.getElementById("login_box");
	var sHeight = document.documentElement.scrollHeight;
	var sWidth = document.documentElement.scrollWidth;
		wHeight = document.documentElement.clientHeight;
		
	var oMask = document.getElementById("imask");
		oMask.style.height=sHeight+"px";
		oMask.style.width=sWidth+"px";
		
		
	var oVerify = document.getElementById("showdiv");
		dHeight = oVerify.offsetHeight;
		dWidth = oVerify.offsetWidth;
		lastwidth = sWidth - dWidth;
		lastheight = wHeight-dHeight;
		
	$(".fixed-table-pagination").addClass("IchangeStyle");

	oVerify.style.left=lastwidth/2 + "px";
	oVerify.style.top=(lastheight-100)/2 + "px";
	loginbox.style.left=lastwidth/2 + "px";
	loginbox.style.top="202px";
	showdiv.style.display="none";
	imask.style.display="none";
	loginbox.style.display="none";

	$(".h-login").click(function(){
		
		loginbox.style.display = "block";
		imask.style.display = "block";
		});
	
	$(".close").click(function(){
		loginbox.style.display="none";
		imask.style.display="none";
	});
	
};

//登录方法
function login(){
	var password = $('#password').val(); 
	var clientNo = $('#clientNo').val(); 
	var showdiv = document.getElementById("showdiv");
	var imask = document.getElementById("imask");
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
				  alert("用户名或密码错误！");
			  }else{
				  alert("登录成功，请继续操作！");
				  $('#login_box').hide();
				  loginbox.style.display="none";
				  imask.style.display="none";
			  }
			  refresh();
		  }
		});
	}
}
*/
$(function(){
	var parame = {};
	parame.articleID = $('#articleID').val();
	$.ajax({
		url :'articleController/getArticle.do',
		data :parame,
		type : 'POST',// 提交方式
		dataType : 'json',// 返回数据的类型
		success:function(o) {// 后台处理数据成功后的回调函数
			var json = eval(o);
			$('#newsTitle').html(json[0]['artTitle']);
			$('#newsColumn').html(json[0]['artContent']);
		},
	});
});
