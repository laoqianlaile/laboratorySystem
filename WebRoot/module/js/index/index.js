/**
 * 
 */
var obj ={
		userID:"1",
		level:2
};

var weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	seasons = ['春季', '夏季', '秋季' , '冬季'],
	periods = ['早上', '下午', '晚上'];

var nodeId, // 节点id
	node, // 节点
	currentNodeId, // 当前节点id
	currentNode, // 当前节点
	data = []; // breadcrumbs 数据

$(function(){
	initTree1();
	
	// 左侧菜单点击事件
	$(document).on('click', '.list-group-item', changeBreadCrumb);
	
	// 动态修改时间
	changeDateInfo();
	setInterval(changeDateInfo, 1000);
});

// 左侧菜单点击改变breadcrumb
function changeBreadCrumb(){
	data = [];
	currentNodeId = nodeId = $(this).attr('data-nodeid'); // 获取点击选项节点的id
	currentNode = node = $('.tree').treeview('getNode', nodeId); // 获取点击选项节点
	
	// 循环向上寻找所有父节点，并获取每个节点的文字，链接地址和图标
	while(node.level0 >= '1'){
		data.push({
			text: node.text,
			href: node.href
		});
		
		node = $('.tree').treeview('getParent', node);
	};
	
	data.reverse(); // 由于添加数据时是从底层节点向上添加，这里反转数据以便后面使用
	
	var html = '';
	var column = '';
	
	// 动态添加breadcrumb结构
	data.map((item, index) => {
		if(data.length === 1){
			html += '<li class="active">' + item.text + '</li>';
			column = '<span class = "column">' + item.text + '</span>';
		}else {
			if(index === data.length-1){
				html += '<li class="active">' + item.text + '</li>';
				column = '<span class = "column">' + item.text + '</span>';
			}
			else {
				html += '<li><a href="' + item.href + '">' + item.text + '</a></li>';
				column = '<span class = "column">' + item.text + '</span>';
			}
		}
	});
	
	$('.page-header').html('<img class="icon" alt="" src="module\\img\\word_icon.png">' + column);
	$('.breadcrumb').html(html); // 设置breadcrumb结构
	
	// 收缩其他节点
	collapseOtherNode();
}

// 收缩其他节点
function collapseOtherNode() {
	var siblingsNodes = $('.tree').treeview('getSiblings', currentNode);
	siblingsNodes.forEach((node) => {
		$('.tree').treeview('collapseNode', [ node, { silent: true, ignoreChildren: false } ]);
	});
}

function initTree1(){  
	$('.tree').treeview({
		collapsed:false,
		data: getTree(),
		levels:1,
		enableLinks : true,
		multiSelect: false
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

// 动态修改时间
function changeDateInfo() {
	
	var date = new Date();
 
    var year = date.getFullYear(),
	 	month = date.getMonth() + 1,
	 	day = date.getDate(),
	 	hour = date.getHours(),
	 	minute = date.getMinutes(),
	 	second = date.getSeconds();
   
    hour = hour < 10 ? '0' + hour : hour;
 	minute = minute < 10 ? '0' + minute : minute;
 	second = second < 10 ? '0' + second : second;
 	
 	// 2 3 4 | 5 6 7 | 8 9 10 | 11 0 1
 	// 0 1 2 | 3 4 5 | 6 7 8 | 9 -2 -1
	var week = weeks[date.getDay()];
	var	season = seasons[Math.floor(date.getMonth() / 3)];
	var period  = periods[Math.floor(date.getHours() / 8)];
	 	
    var time = period + ' ' + hour + ':' + minute + ':' + second;
	
	$('.year').text(year);
	$('.month').text(month);
	$('.day').text(day);
	
	$('.week').text(week);
	$('.season').text(season);
	$('.time').text(time);
}

//上传文件(覆盖上传)
function uploadFile() {
	$("#files").fileupload({
				autoUpload : true,
				url : 'fileOperateController/upload.do',
				dataType : 'json',
				add : function(e, data) {
					$("#ensure").click(function() {
						data.submit();
					});
				},
			}).bind('fileuploaddone',function(e, data) {
						var fileID = JSON.parse(data.result);
						if (fileID != null && fileID != "null" && fileID != "") {
							var rows = $("#table").bootstrapTable('getSelections'), 
							    fileVersionNumber = $("#fileVersionNumber").val(), 
							    fileVersionInfo = $("#fileVersionNumber").val(),
							    fileRemarks = $("#fileRemarks").val();
							$.post("testReportController/updateTestReport.do",
									{
										ID : rows[0].ID,
										taskID : rows[0].taskID,
										versionNumber : fileVersionNumber,
										versionInfo : fileVersionInfo,
										remarks : fileRemarks
									}, function(result) {
										reload();
									});
						} else {
							alert("上传失败");
						} 
					});

	// 文件上传前触发事件,如果需要额外添加参数可以在这里添加
	$('#files').bind('fileuploadsubmit', function(e, data) {
		data.formData = {
			filePath : param.path,
			TypeNumber : param.type,
			belongtoID : param.taskID
		}
	});
}
// 上传图片
function uploadImage(selectorName) {
	$(selectorName).fileupload({
		autoUpload : true,
		url : 'fileOperateController/upload.do?TypeNumber=' + 3,
		dataType : 'text',
		add : function(e, data) {
			$("#ensureUploadImg").click(function() {
				data.submit();
			});
		},
	}).bind('fileuploaddone', function(e, data) {
		var fileID = JSON.parse(data.result);
		if (fileID != null && fileID != "null" && fileID != "") {
			$.post("employeeController/addSignatrueAndStamp.do", {
				fileID : fileID,
				selectorName : selectorName
			});
		} else {
			alert("图片上传失败");
		}
	});
}
function upSignature(){
	console.log("上传电子签名图片");
}
function upStamp(){
	console.log("上传电子盖章图片");
}
