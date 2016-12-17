//页面验证码
$(function(){
	$.ajax({
	   url:'employeeController/getRandcode.do',
	   success:function(){
		   $('#randomCode').attr('src',"employeeController/getRandcode.do?id=+ Math.random()");
		   //alert('验证码初始化！');
	   }
	});
	
});

function login(){
	var loginName = $('#username').val();

	var employeeid = $('#employeeid').val();
	
	var code = $('#encode').val();
	
	var autoLogin = $(".isAuto").is(":checked");
	

	if(loginName==''||loginName==null||employeeid==''||employeeid==null)
			{
			  alert('请检查用户名和密码是否填写完整');
			}
	else if(code==''||code==null){
		
	            alert('请检查用户名和密码是否填写完整');
           }
	else{
	$.ajax({
		url:'employeeController/employeeLogin.do',
		type:'post',
		data:{
			LOGINNAME:loginName,
			PASSWORD:employeeid,
			codeValue:code,
			autoLogin:autoLogin
		},
		success:function(result){
			
			result = eval(result );
			
			console.log('登录连接数据库成功');
			if(result == "1"){
				window.location.href = "index.jsp";
			}else if(result == "-1"){
				alert('账号不存在！');
			}else if(result == "-2"){
				alert('账号禁用');
			}else if(result=="-3"){
				alert("请检查用户名和密码是否正确！");
			}
			else if(result =="-4"){
				alert('验证码出错！');
			}else if(result =="-5"){
				alert('账号未分配使用用户！');
			}
		
		},
		error:function(){
			alert('连接后台失败！');
			
		}
	});
	
	}
}



$("#randomCode").click(
		function() {
			$(this).attr(
					"src",
					"employeeController/getRandcode.do?id="
							+ Math.random());
		});
