var key, ID, companyID, clientNo;
//加载修改密码界面
$(function() {
	var parame = {};
	var name = $('#name').val();
	parame.clientNo = $('#name').val();
	if (name == "null" || name == "" || name == undefined) {
		swal({
			title : "您还未登录",
			type : "error"
		});
	} else {
		$.ajax({
			url : 'clientController/getClientPassword.do',
			data : parame,
			type : 'POST',// 提交方式
			dataType : 'json',// 返回数据的类型
			success : function(o) {// 后台处理数据成功后的回调函数
				var json = eval(o);
				ID = json[0]['ID'];
				companyID = json[0]['companyID'];
				key = json[0]['password'];
				clientNo = json[0]['clientNo'];
				$("#clientNo1").val(clientNo);
			},
		});
	}
});

// 修改密码确定函数
function changePassword() {
	if (oldPasswordCase() && newPassword1Case() && newPassword2Case()) {
		var parame = {};
		parame.clientNo = clientNo;
		parame.clientID = ID;
		parame.password = $('#newPassword2').val();
		parame.companyID = companyID;
		$
				.ajax({
					url : 'clientController/changePassword.do',
					data : parame,
					type : 'POST',// 提交方式
					dataType : 'json',// 返回数据的类型
					success : function(o) {// 后台处理数据成功后的回调函数
						if (o == "true") {
							swal({title:"修改成功!", type:"success"});
							$('#oldPassword').val("");
							$('#newPassword1').val("");
							$('#newPassword2').val("");
//							window.location.href = "/laboratorySystem/Portal/jsp/homePage/homePage.jsp";
						} else
							swal({
								title : "修改失败!",
								type : "error"
							});
					},
				});
	} else {
		swal({
			title : "请检查是否填写错误！",
			type : "worning"
		});
		return;
	}
}
// 判断密码输入是否符合格式或是否正确
function oldPasswordCase() {
	var oldPassword = $('#oldPassword').val();
	if (typeof (password) == "undefined" || password == '') {
		$('#oldPasswordPrompt').html("*密码不能为空！");
	}
	if (key == oldPassword) {
		return true;
	} else {
		$('#oldPasswordPrompt').html("*您输入的密码有误！");
		return false;
	}
}
function oldPasswordInput() {
	$('#oldPasswordPrompt').html("");
}
function newPassword1Case() {
	var newPassword = $("#newPassword1").val();
	if ((!newPassword && typeof (newPassword) != "undefined" && newPassword == '')) {
		$('#newPassword1Prompt').html("*新密码输入有误");
		return false;
	}
	return true;
}
function newPassword1Input() {
	$('#newPassword1Prompt').html("");
}
function newPassword2Case() {
	var newPassword = $("#newPassword1").val();
	var newPassword2 = $("#newPassword2").val();
	if ((!newPassword && typeof (newPassword) != "undefined" && newPassword == '')) {
		$('#newPassword2Prompt').html("*新密码不能为空");
		return false;
	} else if (newPassword != newPassword2) {
		$('#newPassword2Prompt').html("*两次密码输入不相同");
		return false;
	}
	return true;
}
function newPassword2Input() {
	$('#newPassword2Prompt').html("");
}