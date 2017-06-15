var param = {
	employeeName : $('#search_employeeName').val(),// 初始化搜索文字
	employeeCode : $('#search_employeeCode').val(),
	loginName : $('#search_loginName').val(),
	phoneNumber : $('#search_phoneNumber').val(),
	departmentName : $('#search_departmentName').val()
}

/* 初始化数据 */

$(function() {
	$('#table')
			.bootstrapTable(
					{
						// 定义表格的高度height: 500,
						striped : false,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 10,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 3, 9, 13, 17, 200, 500 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
						// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'ID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
						url : 'employeeController/getEmployeeWithPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						method : "post",
						contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : function queryParams(params) {
							param.limit = params.limit;// 页面大小
							param.offset = params.offset; // 偏移量
							param.search = "";
							param.sort = params.sort; // 排序列名
							param.order = params.order; // 排位命令（desc，asc）
							return param;
						}, // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						// 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名
						onLoadSuccess : function(data) {
							console.log(data);
						},
						columns : [
								{
									checkbox : true,
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									formatter : function(value, row, index) {
										checkData(row);
										return index + 1;
									}
								},
								{
									field : 'ID',// 返回值名称
									title : '员工ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'roleID',// 返回值名称
									title : '角色ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'departmentID',// 返回值名称
									title : '部门ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false

								},
								{
									field : 'dutyID',// 返回值名称
									title : '职务ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'employeeName',// 返回值名称
									title : '姓名',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								},
								{
									field : 'employeeCode',// 返回值名称
									title : '员工编码',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'loginName',// 返回值名称
									title : '登录名',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'sex',// 返回值名称
									title : '性别',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '3%'// 宽度
								},
								{
									field : 'email',// 返回值名称
									title : '邮箱',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									visible : false
								},
								{
									field : 'phoneNumber',// 返回值名称
									title : '电话号码',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									visible : false
								},
								{
									field : 'address',// 返回值名称
									title : '地址',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'roleName',// 返回值名称
									title : '角色',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '9%'// 宽度
								},
								{
									field : 'dutyName',// 返回值名称
									title : '职务',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'departmentName',// 返回值名称
									title : '部门',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '8%'// 宽度
								},
								{
									field : 'createTime',// 返回值名称
									title : '创建日期',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%'// 宽度
								},
								{
									field : 'birthday',// 返回值名称
									title : '出生日期',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%',// 宽度
									visible : false
								},
								{
									field : 'IDCard',// 返回值名称
									title : '创建日期',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%',// 宽度
									visible : false
								},
								{
									field : 'jobTitle',// 返回值名称
									title : '创建日期',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%',// 宽度
									visible : false
								},
								{
									field : 'eduLevel',// 返回值名称
									title : '创建日期',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%',// 宽度
									visible : false
								},
								{
									field : 'graduate',// 返回值名称
									title : '创建日期',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%',// 宽度
									visible : false
								},{
									field : 'edu',// 返回值名称
									title : '文化程度',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%',// 宽度
									visible : false
								},{
									field : 'job',// 返回值名称
									title : '职称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%',// 宽度
									visible : false
								},
								{
									field : 'state',// 返回值名称
									title : '状态',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '6%',// 宽度
									formatter : function(value, row, index) {
										var state = row.state;
										var sapn;
										if (state == "禁用") {
											span = '<span style="color:#ff6633;font-size:14px;">&nbsp;禁用</span>&nbsp';
											return span;
										}

										if (state == "启用") {
											span = '<span style="color:#198ac8;font-size:14px;">&nbsp;启用</span>&nbsp';
											return span;
										}
									}

								},
								{
									field : 'remarks',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '12%',// 宽度
									formatter : function(value, row, index) {
										var state = row.state;
										var btn_change;
										var btn_edit;
										var btn_view;
										var btn_dele;
										if (state == "启用") {
											btn_change = "<input type=\"image\" src=\"module/img/employeeManage/forbidden_icon.png\"  title=\"禁用\" onclick='changeState("
													+ JSON.stringify(row)
													+ ")'>";
										}
										if (state == "禁用") {
											btn_change = "<input type=\"image\" src=\"module/img/employeeManage/enable_icon.png\" title=\"启用\" onclick='changeState("
													+ JSON.stringify(row)
													+ ")'>";
										}
										btn_edit = "<input type=\"image\" src=\"module/img/employeeManage/edit_icon.png\" style=\"margin-left:5px;\"  title=\"编辑\" onclick='openedit("
												+ JSON.stringify(row) + ")'>";
										btn_view = "<input type=\"image\" src=\"module/img/employeeManage/view_icon.png\" style=\"margin-left:5px;\" title=\"查看\" onclick='view("
												+ JSON.stringify(row) + ")'>";
										btn_dele = "<input type=\"image\" src=\"module/img/employeeManage/delete_icon.png\" style=\"margin-left:5px;\" title=\"删除\" onclick='del(\""
												+ row.ID + "\")'>";
										return btn_change + btn_edit + btn_view
												+ btn_dele;

									}

								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});

	$.ajax({
		url : 'departmentController/getAllDepartmentName.do',
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			var html;
			for (var i = 0; i < data.length; i++) {
				html += '<option value = "' + data[i].departmentName + '">'
						+ data[i].departmentName + '</option>';
			}
			$('#search_departmentName').append(html);
		}
	});

});

/* 查询方法 */
function search() {
	// 查询的时候 他的limit 会依据页面上的数保留 不会变0
	var parame = {};
	parame.employeeName = $('#search_employeeName').val();// 初始化搜索文字
	parame.employeeCode = $('#search_employeeCode').val();
	parame.loginName = $('#search_loginName').val();
	parame.phoneNumber = $('#search_phoneNumber').val();
	parame.departmentName = $('#search_departmentName').val();
	$('#table').bootstrapTable('refresh', {
		silent : true,
		url : "employeeController/getEmployeeWithPaging.do",
		query : parame
	});
}

/* 刷新方法 */
function reflesh() {
	var parame = {};
	parame.employeeName = "";// 初始化搜索文字
	parame.employeeCode = "";
	parame.loginName = "";
	parame.phoneNumber = "";
	parame.departmentName = "";
	$('#table').bootstrapTable('refresh', {
		silent : false,
		url : "employeeController/getEmployeeWithPaging.do",
		query : parame
	});
}

/* 改变状态 */
function changeState(data) {
	var state = data.state;
	if (state == "禁用") {
		states = 1;
	} else if (state == "启用") {
		states = 0;
	}

	var parame = {};
	parame.ID = data.ID;
	parame.state = states;

	$.ajax({
		url : 'employeeController/updEmployeeState.do',
		scriptCharset : "utf-8",
		contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
		data : parame,
		dataType : 'json',
		success : function(o) {
			if (o <= 0) {
				swal({
					title : "修改失败",
					type : 'warning'
				});
			} else {
				swal({
					title : "修改成功",
					type : 'success'
				});
			}
			$('#table').bootstrapTable('refresh', null);
		}
	});

}

/* 查看方法 */
function view(data) {

	$('#employeeName').val(data.employeeName);
	$('#employeeCode').val(data.employeeCode);
	$('#email').val(data.email);
	$('#phoneNumber').val(data.phoneNumber);
	$('#address').val(data.address);
	$('#dutyName').val(data.dutyName);
	$('#name').val(data.roleName);
	$('#departmentName').val(data.departmentName);
	$('#birthday').val(data.birthday);
	$('#jobTitle').val(data.jobTitle);
	$('#eduLevel').val(data.eduLevel);
	$('#graduate').val(data.graduate);
	$('#IDCard').val(data.IDCard);
	var sex = data.sex;
	if (sex == "男") {
		$("input[name='sex1'][value=1]").prop("checked", true);
	} else {
		$("input[name='sex1'][value=0]").prop("checked", true);
	}
	$('#showModal input').attr("disabled", "disabled");
	$('#showModal').modal('show');
}

/* 打开修改框 */
function openedit(data) {
	var state = "edit";
	$('#edit_employeeName').val(data.employeeName);
	$('#edit_employeeCode').val(data.employeeCode);
	$('#edit_email').val(data.email);
	$('#edit_phoneNumber').val(data.phoneNumber);
	$('#edit_address').val(data.address);
	$('#edit_ID').val(data.ID);
	$('#edit_birthday').val(data.birthday); 
	$('#edit_graduate').val(data.graduate);
	$('#edit_IDCard').val(data.IDCard);
	$("#edit_jobTitle option[value='"+data.job+"']").prop("selected", "selected"); 
	$("#edit_eduLevel option[value='"+data.edu+"']").prop("selected", "selected");
	var sex = data.sex;
	var roleIDs = data.roleID;
	var roleID = roleIDs.split(",");
	if (sex == "男") {
		$("input[name='sex2'][value=1]").prop("checked", true);
	}

	if (sex == "女") {
		$("input[name='sex2'][value=0]").prop("checked", true);
	}
	
	
	getDutyName(state,data.dutyID);
	getRoleName(state, roleID);
	getDepartmentName(state,data.departmentID);
	$('#editModal').modal('show');
}

/* 获取所有的职务 */
function getDutyName(state,dutyID) {
	var html;
	$.ajax({
		url : 'dutyController/getAllDutyName.do',
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			for (var i = 0; i < data.length; i++) {
				html += '<option value = "' + data[i].ID + '">'
						+ data[i].dutyName + '</option>';
			}
			if (state == "edit") {
				$("#edit_dutyName ").empty(); // 清空子元素
				$('#edit_dutyName').append(html);
			    $("#edit_dutyName option[value='"+dutyID+"']").attr("selected", "selected");  
			}
			if (state == "add") {
				$("#add_dutyName ").empty(); // 清空子元素
				$('#add_dutyName').append(html);
			}
		}
	});

}

function getRoleName(state, roleID) {

	$('.selectpicker').selectpicker({
		size : 4
	});

	$.ajax({
		url : 'roleController/getAllName.do',
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			if (state == "edit") {
				$('#edit_name').empty();
				for (var i = 0; i < data.length; i++) {
					$('#edit_name').append(
							"<option value=" + data[i].ID + ">" + data[i].name
									+ "</option>");
				}
				$('#edit_name').selectpicker('val', roleID);// 默认选中
				$('#edit_name').selectpicker('refresh');
				$('#edit_name').selectpicker('render');
			} else if (state == "add") {
				// $('#add_name').empty();
				for (var i = 0; i < data.length; i++) {
					$('#add_name').append(
							"<option value=" + data[i].ID + ">" + data[i].name
									+ "</option>");
				}
				$('#add_name').selectpicker('refresh');
				$('#add_name').selectpicker('render');
			}
		}
	});
}

/* 获取所有的部门 */
function getDepartmentName(state,departmentID) {
	var html;
	$.ajax({
		url : 'departmentController/getAllDepartmentName.do',
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			for (var i = 0; i < data.length; i++) {
				html += '<option value = "' + data[i].ID + '">'
						+ data[i].departmentName + '</option>';
			}
			if (state == "edit") {
				$("#edit_departmentName ").empty(); // 清空子元素
				$('#edit_departmentName').append(html);
				$("#edit_departmentName option[value='"+departmentID+"']").attr("selected", "selected"); 
			}
			if (state == "add") {
				$("#add_departmentName ").empty(); // 清空子元素
				$('#add_departmentName').append(html);
			}
		}
	});
}

/* 修改方法 */
function edit() {
	var parame = {};
	parame.employeeName = encodeURI($('#edit_employeeName').val());
	parame.employeeCode = $('#edit_employeeCode').val();
	parame.email = $('#edit_email').val();
	parame.phoneNumber = $('#edit_phoneNumber').val();
	parame.departmentID = $('#edit_departmentName').val();
	parame.address = encodeURI($('#edit_address').val());
	parame.dutyID = $('#edit_dutyName').val();
	parame.sex = $('input[name="sex2"]:checked ').val();
	parame.birthday = $('#edit_birthday').val();
	parame.jobTitle = $('#edit_jobTitle').val();
	parame.eduLevel =$('#edit_eduLevel').val();
	parame.graduate = encodeURI($('#edit_graduate').val());
	parame.IDCard = $('#edit_IDCard').val();
	parame.ID = $('#edit_ID').val();
	var data = $('#edit_name').val();
	var ids = "";
	if (data == null) {
		parame.roleID = "";
	} else {
		for (var i = 0; i < data.length; i++) {
			ids += data[i] + ",";
		}
		ids = ids.substring(0, ids.length - 1);
		parame.roleID = ids;
	}
	if (checkdata(parame)) {
		$.ajax({
			url : 'employeeController/updEmployee.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : parame,
			dataType : 'json',
			success : function(o) {
				if (o <= 0) {
					swal({
						title : "修改失败",
						type : 'warning'
					});
				} else {
					swal({
						title : "修改成功",
						type : 'success'
					});
				}
				$("input[type='radio']").removeAttr('checked');
				$('#editModal').modal('hide');
				$('#table').bootstrapTable('refresh', null);
			}
		});
	}
}

function add() {
	var state = "add";
	$('#addModal').modal('show');
	$('input[type="text"]').val("");
	$("input[type=radio][name='sex'][value=1]").prop("checked", 'checked');
	getDutyName(state);
	getRoleName(state);
	getDepartmentName(state);
}

function save_continue() {
	var parame = {};
	parame.employeeName = encodeURI($('#add_employeeName').val());
	parame.employeeCode = $('#add_employeeCode').val();
	parame.sex = $('input[name="sex"]:checked ').val();
	parame.email = $('#add_email').val();
	parame.address = encodeURI($('#add_address').val());
	parame.phoneNumber = $('#add_phoneNumber').val();
	parame.departmentID = $('#add_departmentName').val();
	parame.dutyID = $('#add_dutyName').val();
	parame.birthday = $('#add_birthday').val();
	parame.jobTitle = $('#add_jobTitle').val();
	parame.eduLevel = $('#add_eduLevel').val();
	parame.graduate = encodeURI($('#add_graduate').val());
	parame.IDCard = $('#add_IDCard').val();
	var data = $('#add_name').val();
	var password = $('#add_IDCard').val();
	var ids = "";
	if (data == null) {
		parame.roleID = "";
	} else {
		for (var i = 0; i < data.length; i++) {
			ids += data[i] + ",";
		}
		ids = ids.substring(0, ids.length - 1);
		parame.roleID = ids;
	}
	if (checkdata(parame)) {
		password = password.substring(password.length - 6, password.length);
		parame.password = password;
		$.ajax({
			url : 'employeeController/addEmployee.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : parame,
			success : function(o) {
				if (o <= 0) {
					swal({
						title : "新增失败",
						type : 'warning'
					});
				}
				swal({
					title : "新增成功",
					type : 'success'
				});
				$('input[type="text"]').val("");
				$('#table').bootstrapTable('refresh', null);
				add();
			}
		});

	}
}
function save() {
	var parame = {};
	parame.employeeName = encodeURI($('#add_employeeName').val());
	parame.employeeCode = $('#add_employeeCode').val();
	parame.sex = $('input[name="sex"]:checked ').val();
	parame.email = $('#add_email').val();
	parame.address = encodeURI($('#add_address').val());
	parame.phoneNumber = $('#add_phoneNumber').val();
	parame.departmentID = $('#add_departmentName').val();
	parame.dutyID = $('#add_dutyName').val();
	parame.birthday = $('#add_birthday').val();
	parame.jobTitle = $('#add_jobTitle').val();
	parame.eduLevel = $('#add_eduLevel').val();
	parame.graduate = encodeURI($('#add_graduate').val());
	parame.IDCard = $('#add_IDCard').val();
	var data = $('#add_name').val();
	var password = $('#add_IDCard').val();
	var ids = "";
	if (data == null) {
		parame.roleID = "";
	} else {
		for (var i = 0; i < data.length; i++) {
			ids += data[i] + ",";
		}
		ids = ids.substring(0, ids.length - 1);
		parame.roleID = ids;
	}
	if (checkdata(parame)) {
		password = password.substring(password.length - 6, password.length);
		parame.password = password;
		$.ajax({
			url : 'employeeController/addEmployee.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : parame,
			success : function(o) {
				if (o <= 0) {
					swal({
						title : "新增失败",
						type : 'warning'
					});
				}
				swal({
					title : "新增成功",
					type : 'success',
				});

				$('input[type="text"]').val("");
				$("input[type=radio][name='sex'][value=1]").prop("checked",
						'checked');
				$('#addModal').modal('hide');
				$('#table').bootstrapTable('refresh', null);
			}
		});
	}

}

function checkdata(data) {
	if (data.employeeName == "" || data.employeeName == "null") {
		swal("姓名不能为空");
		return false;
	}

	if (data.employeeCode == "" || data.employeeCode == "null") {
		swal("员工编号不能为空");
		return false;
	}

	if (data.sex == "" || data.sex == "null") {
		swal("性别需要选择");
		return false;
	}

	if (data.email == "" || data.email == "null") {
		swal("邮箱不能为空");
		return false;
	}

	var filter = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if (!filter.test(data.email)) {
		swal('您的邮箱格式不正确');
		return false;
	}

	if (data.phoneNumber == "" || data.phoneNumber == "null") {
		swal("手机号码不能为空");
		return false;
	}

	var phone = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
	if (!phone.test(data.phoneNumber)) {
		swal("手机号码格式不正确");
		return false;
	}

	if (data.address == "" || data.address == "null") {
		swal("地址不能为空");
		return false;
	}

	if (data.birthday == "" || data.birthday == "null") {
		swal("出生日期不能为空");
		return false;
	}

	if (data.jobTitle == "" || data.jobTitle == "null") {
		swal("职称不能为空");
		return false;
	}

	if (data.eduLevel == "" || data.eduLevel == "null") {
		swal("文化程度不能为空");
		return false;
	}

	if (data.graduate == "" || data.graduate == "null") {
		swal("毕业学校不能为空");
		return false;
	}

	if (data.IDCard == "" || data.IDCard == "null") {
		swal("身份证号不能为空");
		return false;
	}

	if (!checkIDCard(data.IDCard)) {
		return false;
	}

	return true;

}

/* 删除方法 */
function del(IDs) {
	swal({
		title : "操作提示", // 弹出框的title
		text : "确定删除吗？", // 弹出框里面的提示文本
		type : "warning", // 弹出框类型
		showCancelButton : true, // 是否显示取消按钮
		confirmButtonColor : "#DD6B55",// 确定按钮颜色
		cancelButtonText : "取消",// 取消按钮文本
		confirmButtonText : "是的，确定删除！",// 确定按钮上面的文档
		closeOnConfirm : false
	}, function() {
		$.ajax({
			url : 'employeeController/delEmployee.do',
			data : {
				IDs : IDs
			},
			success : function(o) {
				if (o <= 0) {
					swal({
						title : "删除失败",
						type : 'warning'
					});
				}
				swal({
					title : "删除成功",
					type : 'success'
				});
				$('#table').bootstrapTable('refresh', null);
			}
		});
	});
}

function exportReport() {
	window.location.href = "employeeController/employeeExportExcel.do";
}

function checkIDCard(IDCard) {
	var city = {11 : "北京",12 : "天津",13 : "河北",14 : "山西",15 : "内蒙古",21 : "辽宁",22 : "吉林",23 : "黑龙江 ",31 : "上海",
		32 : "江苏",33 : "浙江",34 : "安徽",35 : "福建",36 : "江西",37 : "山东",41 : "河南",42 : "湖北 ",43 : "湖南",44 : "广东",
		45 : "广西",46 : "海南",50 : "重庆",51 : "四川",52 : "贵州",53 : "云南",54 : "西藏 ",61 : "陕西",62 : "甘肃",63 : "青海",
		64 : "宁夏",65 : "新疆",71 : "台湾",81 : "香港",82 : "澳门",91 : "国外 "};
	var tip = "";
	var pass = true;

	if (!IDCard
			|| !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
					.test(IDCard)) {
		tip = "身份证号格式错误";
		pass = false;
	}

	else if (!city[IDCard.substr(0, 2)]) {
		tip = "身份证号错误";
		pass = false;
	} else {
		// 18位身份证需要验证最后一位校验位
		if (IDCard.length == 18) {
			IDCard = IDCard.split('');
			// ∑(ai×Wi)(mod 11)
			// 加权因子
			var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			// 校验位
			var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++) {
				ai = IDCard[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if (parity[sum % 11] != IDCard[17]) {
				tip = "身份证号错误";
				pass = false;
			}
		}
	}
	if (!pass)
		swal(tip);
	return pass;
}

function reset() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		sweetAlert("请选中一条数据");
		return;
	}

	var parame = {};
	var password = data[0].IDCard;
	parame.ID = data[0].ID;
	password = password.substring(password.length - 6, password.length);
	parame.password = password;
	$.ajax({
		url : 'employeeController/updEmployeePassword.do',
		scriptCharset : "utf-8",
		contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
		data : parame,
		dataType : 'json',
		success : function(o) {
			if (o <= 0) {
				swal({
					title : "重置失败",
					type : 'warning'
				});
			} else {
				swal({
					title : "重置成功",
					type : 'success'
				});
			}
			$('#table').bootstrapTable('refresh', null);
		}
	});
}

function checkData(dataObj) {
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null
			|| dataObj.employeeName.trim() == "NULL") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("employeeCode") || dataObj.employeeCode == null
			|| dataObj.employeeCode.trim() == "NULL") {
		dataObj.employeeCode = "";
	}
	if (!dataObj.hasOwnProperty("loginName") || dataObj.loginName == null
			|| dataObj.loginName.trim() == "NULL") {
		dataObj.loginName = "";
	}
	if (!dataObj.hasOwnProperty("sex") || dataObj.sex == null
			|| dataObj.sex.trim() == "NULL") {
		dataObj.sex = "";
	}
	if (!dataObj.hasOwnProperty("email") || dataObj.email == null
			|| dataObj.email.trim() == "NULL") {
		dataObj.email = "";
	}
	if (!dataObj.hasOwnProperty("phoneNumber") || dataObj.phoneNumber == null
			|| dataObj.phoneNumber.trim() == "NULL") {
		dataObj.phoneNumber = "";
	}
	if (!dataObj.hasOwnProperty("address") || dataObj.address == null
			|| dataObj.address.trim() == "NULL") {
		dataObj.address = "";
	}
	if (!dataObj.hasOwnProperty("roleName") || dataObj.roleName == null
			|| dataObj.roleName.trim() == "NULL") {
		dataObj.roleName = "";
	}
	if (!dataObj.hasOwnProperty("dutyName") || dataObj.dutyName == null
			|| dataObj.dutyName.trim() == "NULL") {
		dataObj.dutyName = "";
	}
	if (!dataObj.hasOwnProperty("departmentName")
			|| dataObj.departmentName == null
			|| dataObj.departmentName.trim() == "NULL") {
		dataObj.departmentName = "";
	}
	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null
			|| dataObj.createTime.trim() == "NULL") {
		dataObj.createTime = "";
	}
}

function focusNextInput(thisInput) {
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		// 如果是最后一个，则焦点回到第一个
		if (i == (inputs.length - 1)) {
			inputs[0].focus();
			break;
		} else if (thisInput == inputs[i]) {
			inputs[i + 1].focus();
			break;
		}
	}
}

$(function() {
	$(":radio").click(function() {
		$("#add_email").focus();
		$("#edit_email").focus();
	});
});
