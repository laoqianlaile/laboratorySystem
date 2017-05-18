var EmployeeInfo = getEmployeeInfo();

$(function () {
	_uploadFile();
})
/**
 * 
 * 点击导航栏
 */
function onclickNvi(){
    $(function () {
        $("#side").find("li").each(function () {
             if (  $(this).attr("class") === "a1" ) {
                 $(this).attr("class", "active");
             } else {
                 $(this).removeClass("active");
             }
        });
    })
}	
/**
 * 获取当前员工的信息
 */
 function getEmployeeInfo(){
	var data;
	$.ajax({
			url : 'employeeController/getEmployeeinfo.do?',
			dataType : "json",
			async : false,
			success : function(o) {
				data = JSON.parse(o);
			},
			error : function() {
				return false;
			}
		});
	
	return data;
 }
 /**
  * 获取session中的ID
  */
 function getEmployeeID(){
	 var EmployeeID;
	 $.ajax({
		url:'employeeController/getEmployeeID.do',
		dataType : "json",
		success : function(o) {
			EmployeeID = JSON.parse(o);
		},
		error:function(){
			return null;
		}
	 });
	 return EmployeeID;
 }

 /* 密码验证 */
 function changePwd(){
	 var newpwd = $('#new_pwd').val();
	 if(newpwd.length < 6 || newpwd.length > 12){
		 $('#newpwd_ok').hide();
		 $('#newpwd_tip').show();
		 $('#newpwd_error').show();
		 
	 }
	 else{
		 $('#newpwd_tip').hide();
		 $('#newpwd_error').hide();
		 $('#newpwd_ok').show();
	 }
	 
	 if(newpwd.length>0 && $('#current_pwd').val().length>0){
		 if( $('#new_pwd').val() === $('#current_pwd').val()){
			 $('#currentpwd_tip').hide();
			 $('#currentpwd_error').hide();
			 $('#currentpwd_ok').show();
		 }
		 else{
			console.log("密码不一致");
			$('#currentpwd_ok').hide();
			$('#currentpwd_tip').show();
			$('#currentpwd_error').show();
		 }
	 }
 }
 /* 密码纠正 */
 function currentPwd(){
	if( $('#new_pwd').val() === $('#current_pwd').val()){
		$('#currentpwd_tip').hide();
		$('#currentpwd_error').hide();
		$('#currentpwd_ok').show();
		console.log("密码相同");
		return true;
	}
	else{
		console.log("密码不一致");
		$('#currentpwd_ok').hide();
		$('#currentpwd_tip').show();
		$('#currentpwd_error').show();
		return false;
	}
 }
 
 /* 密码修改 */
 function editPwd(){
	 if( !currentPwd()){
		 return;
	 }
	 else{
		 var employeeInfo = getEmployeeInfo();
		 if($('#old_pwd').val() === employeeInfo[0].password){
			 console.log("原密码为" + employeeInfo[0].password);
			 var parame = {};
			 parame.employeeID = EmployeeInfo[0].employeeID;
			 parame.newpwd =  $('#current_pwd').val();
			 $.ajax({
				  url:'employeeController/editEmployeePwd.do',
				  data:parame,
				  success:function(o){
					  if(o<=0){
						  swal({title:"出错l",type:"error"});
					  }
					  else{
						  swal({title:"保存成功",type:"success"});
						  setTimeout(function(){
							  window.location.href = "module/jsp/setting/personalData.jsp";
						  }, 1000);
					  }
				  }
			 });
		 }
		 else{
			 swal("原密码错误");
			 $('#oldpwd_error').show();
			 $('#old_pwd').text("");
			 $('#old_pwd').focus();
			 setTimeout("$('#oldpwd_error').hide();",10000);
		 }
	 }
 }
 
 /**
  * 展示基本信息
  * 
  */
 function basic(navli){
	 $(navli).parent().addClass("a1");
	 onclickNvi();
	 $('#table').hide();
	 $('.stamp').hide();
	 $('.signature').hide();
	 $('#tablebody').empty();
	 var data = getEmployeeInfo();
	 
	 
	 $('#tablebody').append(html);
	
	 $('#table').show();
	 console.log(data);
 }
 
 /**
  * 个人信息
  * 
  */
 function personal(navli){
//	 $(navli).parent().addClass("a1");
//	 onclickNvi();
	 $('#table').hide();
	 $('.stamp').hide();
	 $('.signature').hide();
	 $('#tablebody').empty();
	 var html="";
	 var data = getEmployeeInfo();
	 
	 html ="<tr><td>姓名</td>"+"<td> <input id ='edit_Name' type='text' class='form-control' value='"+data[0].employeeName+"' placeholder='请输入昵称'/></td></tr>"
		+"<tr><td>所属部门</td>"+"<td>"+data[0].departmentName+"</td></tr>"
		+"<tr><td>能力等级</td>"+"<td>"+data[0].level+"</td></tr>"
		+"<tr><td>职位名称</td>"+"<td>"+data[0].dutyName+"</td></tr>"
		+"<tr><td>性别</td>"+"<td><div id ='edit_sex'><input name ='sex' type='radio' value='1'><span>男</span><input type='radio' name ='sex' value='0'><span>女</span></div></td></tr>"
		+"<tr><td>邮箱</td>"+"<td><input id ='edit_email' type='text' class='form-control' value ='"+data[0].email+"' /></td></tr>"
		+"<tr><td>手机号码</td>"+"<td><input id ='edit_phone' type='text' class='form-control' value='"+data[0].phoneNumber+"' /></td></tr>"
		+"<tr><td>地址</td>"+"<td><textarea id ='edit_address' class='form-control' placeholder='填写的你的地址'>"+data[0].address+"</textarea></td></tr>"
		+"<tr><td><button  type='button' class='btn btn-success' id='submit' onclick='editInfo()'>保存</button></td><td></td></tr>"
	 $('#tablebody').append(html);
	 if(data[0].sex == 1){
		 $('#edit_sex input[value="1"]').attr("checked",true);
	 }
	 else{
		 $('#edit_sex input[value="0"]').attr("checked",true);
	 }
	 $('#table').show();
 }
 
 /**
  * 
  * 
  */
 function signature(navli){
	 _uploadFile('.singnatureImg');
	 var data = getEmployeeInfo();
	 if(data[0].signature !== null && data[0].signature !== undefined && data[0].signature !== ""){
		 $('#Img1').attr("src","upload/img/"+data[0].signature);
	 }
//	 $(navli).parent().addClass("a1");
//	 onclickNvi();
	 $('#table').hide();
	 $('.stamp').hide();
	 $('.signature').show();
 }
 function stamp(navli){
	 _uploadFile('.stampImg');
	 
	 var data = getEmployeeInfo();
	 if(data[0].stamp !== null && data[0].stamp !== undefined && data[0].stamp !== ""){
		 $('#Img2').attr("src","upload/img/"+data[0].stamp);
	 }
//	 $(navli).parent().addClass("a1");
//	 onclickNvi();
	 $('#table').hide();
	 $('.signature').hide();
	 $('.stamp').show();

 }
 /**
  * 个人信息修改
  * 
  */
 function editInfo(){
	 
	 var parame = {};
	 parame.employeeID = EmployeeInfo[0].employeeID;
	 parame.employeeName =  $('#edit_Name').val();
	 parame.sex =  $('#edit_sex input[name="sex"]:checked').val()
	 parame.phoneNumber = $('#edit_phone').val();
	 parame.email = $('#edit_email').val();
	 parame.address = $('#edit_address').val();
	 
	 $.ajax({
		  url:'employeeController/editInfo.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  swal("修改失败");
			  }
			  else{
				  swal({title:"保存成功",type:"success"});
				  setTimeout(function(){
					  window.location.href = "module/jsp/setting/personalData.jsp";
				  }, 1000);
			  }
			  
		  }
		});
 }
 /**
  * 密码修改
  * 
  */
 
 function editPWD(){
	 $('#table').hide();
	 $('.stamp').hide();
	 $('.signature').hide();
	 $('#tablebody').empty();
	 
	 html ="<tr><td>旧密码</td>"
		 +"<td><input type='password' id='old_pwd' name='pwd' required='required'  class='form-control'/></td>"
		 +"<td><div id='oldpwd_error'  style='display: none'><span style='color:red;'>密码错误，请确认无误</span></div></td></tr>"
		+"<tr><td>新密码</td>"
		+"<td><input type='password' id='new_pwd' name='newpwd'  required='required'  class='form-control' oninput='changePwd()'onpropertychange='changePwd()'/></td>"
		+"<td><div id='newpwd_tip'  style='display: none'><span style='color:red;'>至少6位或至多12位</span></div>"
		+"<div id='newpwd_ok'  style='display: none'><i class='glyphicon glyphicon-ok' style='color: rgb(0, 220, 229);'></i></div></td></tr>"
		+"<tr><td>确认密码</td>"
		+"<td><div><input type='password' id='current_pwd' name='currentpwd' required='required' class='form-control' oninput='currentPwd()'onpropertychange='currentPwd()'/></div></td>"
		+"<td><div id='currentpwd_tip' style='display: none'><span style='color:red;'>密码不一致</span></div>"
		+"<div id='currentpwd_ok'  style='display: none'><i class='glyphicon glyphicon-ok' style='color: rgb(0, 220, 229);'></i></div></td></tr>"
		+"<tr><td><button  type='button' class='btn btn-success' id='submit' onclick='editPwd()'>确认修改</button></td><td></td></tr>"

	 $('#tablebody').append(html);
	 
	 $('#table').show();
 }
 
 
 function _uploadFile(selectorName){
		//initEvent();
		$(selectorName).bind('fileuploadsubmit', function (e, data) {
	        data.formData = {};  
	    });
		$(selectorName).fileupload({
			 dataType:'json',
			 autoUpload : true,
		 	 url : 'fileOperateController/upload.do?TypeNumber=' + 3,
			 success:function(data){
				 console.log(data);
				 var parme = {}
				 parme.fileID = data;
				 parme.selectorName = selectorName;
				 $.ajax({
						url : 'employeeController/addSignatrueAndStamp.do?',
						dataType : "json",
						data:parme,
						async : false,
						success : function(o) {
							if(o <= 0){
								swal("上传 失败");
							}
							else{
								  swal({title:"保存成功",type:"success"});
							}
						},
						error : function() {
							return false;
						}
					});
			 },
			 done:function(e,data){
		//		 $(".fileSize").text((data.total / 1024).toFixed(2)+"kB");
			 },
			 fail:function(data){
				 alert("失败");
			 },
		 });
	}
 
 // 预览图片
 function previewImage(file, imgArea) {
 	if (file.files && file.files[0]) {
 		var fileSuffixName = file.value.toLowerCase();
 		if (fileSuffixName.indexOf('.jpg') < 0 && fileSuffixName.indexOf('.gif') < 0 &&  fileSuffixName.indexOf('.png') < 0) {
 			alert("不能将此类型文件作为电子签名上传");
 		}
 		var img = document.getElementById(imgArea);
 		var reader = new FileReader();
 		reader.onload = function(evt) {
 			img.src = evt.target.result;
 		}
 		reader.readAsDataURL(file.files[0]);
 	} else // 兼容IE
 	{
 		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
 		file.select();
 		var src = document.selection.createRange().text;
 		var img = document.getElementById(imgArea);
 		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
 	}
 }
 
