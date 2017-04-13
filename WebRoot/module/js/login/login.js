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
			swal({title:"请检查用户名和密码是否填写完整",  type:"warning",});
			}
	else if(code==''||code==null){
			swal({title:"请检查用户名和密码是否填写完整",  type:"warning",});
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
			
			if(result == "1"){
				window.location.href = "index.jsp";
			}else if(result == "-1"){
				swal({title:"账号不存在！",  type:"warning",});
			}else if(result == "-2"){
				swal({title:"账号禁用！",  type:"warning",});
			}else if(result=="-3"){
				swal({title:"请检查用户名和密码是否正确！",  type:"warning",});
			}
			else if(result =="-4"){
				swal({title:"验证码出错！",  type:"warning",});
			}else if(result =="-5"){
				swal({title:"账号未分配使用用户！",  type:"error",});
			}
		
		},
		error:function(){
			swal({title:"连接后台失败！",  type:"error",});
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
