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
									width : '3%'// 宽度
								},
								{
									field : '',
									title : '序号',
									width : '1%',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row, index) {
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
									width : '8%'// 宽度
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
									valign :'middle',// 垂直居中显示
									width : '5%'// 宽度
								},
								{
									field : 'phoneNumber',// 返回值名称
									title : '电话号码',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%'// 宽度
								},
								{
									field : 'address',// 返回值名称
									title : '地址',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '9%'// 宽度
								},
								{
									field : 'name',// 返回值名称
									title : '角色',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								},
								{
									field : 'dutyName',// 返回值名称
									title : '职务',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								},
								{
									field : 'departmentName',// 返回值名称
									title : '部门',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								},
								{
									field : 'createTime',// 返回值名称
									title : '创建日期',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '7%'// 宽度
								},
								{
									field : 'state',// 返回值名称
									title : '状态',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '5%',// 宽度
									formatter:function(value,row,index){
									    var state=row.state;
									    var sapn;
									    if(state=="禁用"){
										   span='<span style="color:#ff6633;font-size:14px;">&nbsp;禁用</span>&nbsp';
										   return span;
									    }
									    
									    if(state=="启用"){
									    	span='<span style="color:#198ac8;font-size:14px;">&nbsp;启用</span>&nbsp';
									    	return span;
									    }
								}
											
								},{
									field : 'remarks',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '16%',// 宽度
									formatter : function(value, row, index) {
										var state = row.state;
										var btn_change;
										var btn_edit;
										var btn_view;
										var btn_dele;
										if(state=="启用"){
											btn_change ="<input type=\"image\" src=\"module/img/employeeManage/forbidden_icon.png\" onclick='changeState("+JSON.stringify(row)+")'>";
										}
										if(state=="禁用"){
											btn_change ="<input type=\"image\" src=\"module/img/employeeManage/enable_icon.png\" onclick='changeState("+JSON.stringify(row)+")'>";
										}
											btn_edit ="<input type=\"image\" src=\"module/img/employeeManage/edit_icon.png\" style=\"margin-left:10px;\"  onclick='openedit("+JSON.stringify(row)+")'>";
											btn_view ="<input type=\"image\" src=\"module/img/employeeManage/view_icon.png\" style=\"margin-left:10px;\"  onclick='view("+JSON.stringify(row)+")'>";
											btn_dele ="<input type=\"image\" src=\"module/img/employeeManage/delete_icon.png\" style=\"margin-left:10px;\"  onclick='del(\""+row.ID+"\")'>";
											return btn_change+btn_edit+btn_view+btn_dele;
										
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
function changeState(data){
	var state=data.state;
	if(state=="禁用"){
		states=1;
}
	
	if(state=="启用"){
		states=0;
	}
	
	var parame={};
	parame.ID=data.ID;
	parame.state=states;
	
	$.ajax({
		url : 'employeeController/updEmployeeState.do',
		scriptCharset : "utf-8",
		contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
		data : parame,
		dataType : 'json',
		success : function(o) {
			if (o <= 0) {
				alert("修改失败");
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
	$('#name').val(data.name);
	$('#departmentName').val(data.departmentName);
	var sex = data.sex;

	if (sex == "男") {
		$("input[name='sex1'][value=1]").attr("checked", true);
	}

	if (sex == "女") {
		$("input[name='sex1'][value=0]").attr("checked", true);
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
	var sex = data.sex;

	if (sex == "男") {
		$("input[name='sex2'][value=1]").attr("checked", true);
	}

	if (sex == "女") {
		$("input[name='sex2'][value=0]").attr("checked", true);
	}

	getDutyName(state);
	getRoleName(state);
	getDepartmentName(state);
	$('#editModal').modal('show');
}

/* 获取所有的职务 */
function getDutyName(state) {
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
			}
			if (state == "add") {
				$("#add_dutyName ").empty(); // 清空子元素
				$('#add_dutyName').append(html);
			}
		}
	});

}
/* 获取所有的角色 */
function getRoleName(state) {
	var html;
	$.ajax({
		url : 'roleController/getAllName.do',
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			for (var i = 0; i < data.length; i++) {
				html += '<option value = "' + data[i].ID + '">' + data[i].name
						+ '</option>';
			}
			if (state == "edit") {
				$("#edit_name ").empty(); // 清空子元素
				$('#edit_name').append(html);
			}
			if (state == "add") {
				$("#add_name ").empty(); // 清空子元素
				$('#add_name').append(html);
			}
		}
	});
}

/* 获取所有的部门 */
function getDepartmentName(state) {
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
	var parame={};
	parame.employeeName = encodeURI($('#edit_employeeName').val());
	parame.employeeCode = $('#edit_employeeCode').val();
	parame.email = $('#edit_email').val();
	parame.phoneNumber = $('#edit_phoneNumber').val();
	parame.departmentID = $('#edit_departmentName').val();
	parame.address = encodeURI($('#edit_address').val());
	parame.dutyID = $('#edit_dutyName').val();
	parame.roleID = $('#edit_name').val();
	parame.sex = $('input[name="sex2"]:checked ').val();
	parame.ID=$('#edit_ID').val();
	if (checkdata(parame)) {
		$.ajax({
			url : 'employeeController/updEmployee.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : parame,
			dataType : 'json',
			success : function(o) {
				if (o <= 0) {
					alert("修改失败");
				}
				$('#editModal').modal('hide');
				$('#table').bootstrapTable('refresh', null);
			}
		});
	}
}

function add() {
	var state = "add";
	$('#addModal').modal('show');
	getDutyName(state);
	getRoleName(state);
	getDepartmentName(state);
}

function save_continue(){
	var parame = {};
	parame.employeeName = encodeURI($('#add_employeeName').val());
	parame.employeeCode = $('#add_employeeCode').val();
	parame.sex = $('input[name="sex"]:checked ').val();
	parame.email = $('#add_email').val();
	parame.address = encodeURI($('#add_address').val());
	parame.phoneNumber = $('#add_phoneNumber').val();
	parame.departmentID = $('#add_departmentName').val();
	parame.dutyID = $('#add_dutyName').val();
	parame.roleID = $('#add_name').val();
	//$('input[type="text"]').val("");
	if (checkdata(parame)) {
		$.ajax({
			url : 'employeeController/addEmployee.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : parame,
			success : function(o) {
				if (o <= 0) {
					alert("新增失败");
				}
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
	parame.roleID = $('#add_name').val();
	//$('input[type="text"]').val("");
	if (checkdata(parame)) {
		$.ajax({
			url : 'employeeController/addEmployee.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : parame,
			success : function(o) {
				if (o <= 0) {
					alert("新增失败");
				}
				$('input[type="text"]').val("");
				$('#addModal').modal('hide');
				$('#table').bootstrapTable('refresh', null);
			}
		});
	}
}

function checkdata(data) {
	if (data.employeeName == "" || data.employeeName == "null") {
		alert("姓名不能为空");
		return false;
	}

	if (data.employeeCode == "" || data.employeeCode == "null") {
		alert("员工编号不能为空");
		return false;
	}

	if (data.sex == "" || data.sex == "null") {
		alert("性别需要选择");
		return false;
	}

	if (data.email == "" || data.email == "null") {
		alert("邮箱不能为空");
		return false;
	}

	var filter = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if (!filter.test(data.email)) {
		alert('您的邮箱格式不正确');
		return false;
	}

	if (data.phoneNumber == "" || data.phoneNumber == "null") {
		alert("手机号码不能为空");
		return false;
	}

	var phone = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
	if (!phone.test(data.phoneNumber)) {
		alert("手机号码格式不正确");
		return false;
	}

	if (data.address == "" || data.address == "null") {
		alert("地址不能为空");
		return false;
	}

	if (data.dutyName == "" || data.dutyName == "null") {
		alert("职务不能为空");
		return false;
	}

	if (data.name == "" || data.name == "null") {
		alert("角色不能为空");
		return false;
	}

	if (data.departmentName == "" || data.departmentName == "null") {
		alert("部门不能为空");
		return false;
	}

	return true;

}

/* 删除方法 */
function del(IDs) {
	
	$.ajax({
		url : 'employeeController/delEmployee.do',
		 data:{
			  IDs : IDs
		  },
		success : function(o) {
			if (o <= 0) {
				alert("删除失败");
			}
			$('#table').bootstrapTable('refresh', null);
		}
	});
}
