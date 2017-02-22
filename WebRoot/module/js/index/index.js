/**
 * 
 */
var obj ={
		userID:"1",
		level:2
		
}

var nodeId, // 节点id
	node, // 节点
	data = []; // breadcrumbs 数据

$(function(){
	initTree1();
	
	// 左侧菜单点击事件
	$(document).on('click', '.list-group-item', changeBreadCrumb);
});

// 左侧菜单点击改变breadcrumb
function changeBreadCrumb(){
	data = [];
	nodeId = $(this).attr('data-nodeid'); // 获取点击选项节点的id
	node = $('.tree').treeview('getNode', nodeId); // 获取点击选项节点
	
	// 循环向上寻找所有父节点，并获取每个节点的文字，链接地址和图标
	while(node.level0 >= '1'){
		data.push({
			text: node.text,
			href: node.href,
			icon: node.icon
		});
		
		node = $('.tree').treeview('getParent', node);
	};
	
	data.reverse(); // 由于添加数据时是从底层节点向上添加，这里反转数据以便后面使用
	
	var html = '';
	
	// 动态添加breadcrumb结构
	data.map((item, index) => {
		if(data.length === 1){
			html += '<li class="active"><i class="' + item.icon + '" style="padding-right:6px;"></i>' + item.text + '</li>';
		}else {
			if(index === data.length-1)
				html += '<li class="active"><i class="' + item.icon + '" style="padding-right:6px;"></i>' + item.text + '</li>';
			else 
				html += '<li><i class="' + item.icon + '"></i><a href="' + item.href + '">' + item.text + '</a></li>';
		}
	});
	
	$('.breadcrumb').html(html); // 设置breadcrumb结构
}

function initTree1(){  
	$('.tree').treeview({collapsed:false,data: getTree(),levels:1,enableLinks : true
		});   
}

function display(data){  
	
	for(var i = 0 ; i < data.length; i++){
	}
}

function getTree(){  
	var data ;
	$.ajax({
			type:"post",
			dataType:"json",
			data:obj,
			async: false,
			url:'permissionAssignController/getPermissionModule.do',
			success:function(result){
				if(result ){
			     data =  eval (result);
//			     console.log(data);
//			      return data;
				}
				else{
					alert("no data ");
					return ;
				}
			}
			
		});
	
	return data;
	
}
 function initTree(){
	
	 // 按照指定的根节点菜单 id，加载其相应的子菜单树面板数据；该方法定义如下参数：
	    // id: 表示根节点菜单的 id；
	    window.mainpage.loadMenu = function (id) {
	    	
	        $(navMenuList).find("a").attr("disabled", true);
	        $.easyui.loading({ locale: westCenterLayout });
	        var t = $(navMenuTree), root = $.extend({}, $.array.first(window.mainpage.navMenusData, function (val) { return val.id == id; }));
	        
	        $.post("permissionassignController/getPermissionMenu.do",{menuCode:id},function(data){
	        	if(!data.status){
	        		alert(data.messege);
	        		return ;
	        	}
	        	var menus=data.data;
	        	root.children = $.array.likeArrayNotString(menus) ? menus : [];
	            t.tree("loadData", [root]);
	        },'json');
	    };
 }
 /* 注销 */
 function exit(){
	 $.ajax({
		  url:'employeeController/employeeWithdraw.do',
		  success:function(o){
			  if(o<=0){
				  alert("注销失败");
			  }
			  window.location.href = window.location.href.replace('index.jsp','login.jsp');
		  }
		});
 }
/* 个人信息弹窗 */
 function openPersonModal(){
	 
	 var employeeInfo = getEmployeeInfo();
	 $('#edit_employeeCode').val(employeeInfo[0].employeeCode);
	 $('#edit_Name').val(employeeInfo[0].employeeName);
	 $('#edit_department').val(employeeInfo[0].departmentName);
	 $('#edit_level').val(employeeInfo[0].level);
	 $('#edit_duty').val(employeeInfo[0].dutyName);
	 
	 if(employeeInfo[0].sex == 1){
		 $('#edit_sex input[value="1"]').attr("checked",true);
	 }
	 else{
		 $('#edit_sex input[value="0"]').attr("checked",true);
	 }
	 $('#edit_phone').val(employeeInfo[0].phoneNumber);
	 $('#edit_email').val(employeeInfo[0].email);
	 $('#edit_address').val(employeeInfo[0].address);
	 
	 $('#PersonalModal').modal('show');
 }
 
 /* 个人信息修改 */
 function editInfo(){
	 
	 var parame = {};
	 parame.employeeID = $('#LoginID').val();
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
				  alert("修改失败");
			  }
			  $('#PersonalModal').modal('hide');
		  }
		});
 }
 /*　获取登录人信息　 */
 function getEmployeeInfo(){
	 var employeeID = $('#LoginID').val();
	 var data;
	$.ajax({
		url : 'employeeController/getEmployeeinfo.do?employeeID='+employeeID,
		dataType : "json",
		async : false,
		data : {},
		success : function(o) {
			data = JSON.parse(o);
		},
		error : function() {
			return false;
		}
	});
	return data;
 }
 /* 密码修改弹窗 */
 function openEditpwd(){
	 $('#editpwdModal').modal('show');
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
			 parame.employeeID = $('#LoginID').val();
			 parame.newpwd =  $('#current_pwd').val();
			 $.ajax({
				  url:'employeeController/editEmployeePwd.do',
				  data:parame,
				  success:function(o){
					  if(o<=0){
						  alert("出错了");
					  }
				  }
			 });
		 }
		 else{
			 alert("原密码错误");
			 $('#oldpwd_error').show();
			 $('#old_pwd').text("");
			 $('#old_pwd').focus();
			 setTimeout("$('#oldpwd_error').hide();",10000);
		 }
	 }
 }
 
 /* 登录跳转  */
 function login(){
	 window.location.href = "http://localhost:8080/laboratorySystem/login.jsp";
 }
 
