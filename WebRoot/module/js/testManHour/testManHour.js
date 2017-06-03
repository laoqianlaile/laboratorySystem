var param = {
	name : $('#search_name').val(),// 初始化搜索文字
	nameCn : $('#search_testName').val()
}

/* 初始化数据 */
$(function() {
	initTestProject();
	getTestType();
});
function initTestProject() {
	$('#table')
			.bootstrapTable(
					{
						// 定义表格的高度height: 500,
						striped : false,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 10,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 3, 5, 10, 15, 20 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
						// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'ID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
						url : 'testProjectController/getTestProjectManHour.do',// 服务器数据的加载地址
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
									width : '2%',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row, index) {
										checkData(row);
										return index + 1;
									}
								},
								{
									field : 'ID',// 返回值名称
									title : '检测项目ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'name',// 返回值名称
									title : '实验类别',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'nameCn',// 返回值名称
									title : '检测项目中文名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'nameEn',// 返回值名称
									title : '检测项目英文名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'laborHour',// 返回值名称
									title : '工时',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'remarks',// 返回值名称
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '15%',// 宽度
									formatter : function(value, row, index) {
										var btn_edit;
										var btn_view;
										var btn_dele;
										btn_edit = "<input type=\"image\" src=\"module/img/edit_icon.png\" style=\"margin-left:5px;\"  title=\"编辑\" onclick='openedit("
												+ JSON.stringify(row) + ")'>";
										btn_view = "<input type=\"image\" src=\"module/img/view_icon.png\" style=\"margin-left:5px;\" title=\"查看\" onclick='view("
												+ JSON.stringify(row) + ")'>";
										btn_dele = "<input type=\"image\" src=\"module/img/delete_icon.png\" style=\"margin-left:5px;\" title=\"删除\" onclick='del(\""
												+ row.ID + "\")'>";
										return btn_edit + btn_view + btn_dele;

									}

								} ]
					// 列配置项,详情请查看 列参数 表格
					/* 事件 */
					});
}

function getTestType() {
	var html;
	$.ajax({
		url : 'testProjectController/getAllTestType.do',
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			for (var i = 0; i < data.length; i++) {
				html += '<option value = "' + data[i].ID + '">' + data[i].name
						+ '</option>';
			}
			// $("#search_name ").empty(); // 清空子元素
			$('#search_name').append(html);
		}
	});
}

/* 查询方法 */
function search() {
	// 查询的时候 他的limit 会依据页面上的数保留 不会变0
	var parame = {};
	parame.name = $('#search_name').val();// 初始化搜索文字
	parame.testName = $('#search_testName').val();
	$('#table').bootstrapTable('refresh', {
		silent : true,
		url : "testProjectController/getTestProjectManHour.do",
		query : parame
	});
}

/* 刷新方法 */
function reflesh() {
	var parame = {};
	parame.name = "";// 初始化搜索文字
	parame.testName = "";
	$('#table').bootstrapTable('refresh', {
		silent : false,
		url : "testProjectController/getTestProjectManHour.do",
		query : parame
	});
}

/* 查看方法 */
function view(data) {

	$('#name').val(data.name);
	$('#nameCn').val(data.nameCn);
	$('#nameEn').val(data.nameEn);
	$('#laborHour').val(data.laborHour);
	$('#showModal input').attr("disabled", "disabled");
	$('#showModal').modal('show');
}

function deleteData() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0) {
		sweetAlert("请至少选中一条数据");
		return;
	}

	var ids = "";
	for (var i = 0; i < data.length; i++) {
		ids += data[i].ID + ",";
	}

	var testProjectIDs = ids.substring(0, (ids.length - 1))
	del(testProjectIDs);
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
			url : 'testProjectController/delTestProjectInManHour.do',
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

function addByTestName() {
	var testName = $('#add_testName').val();
	if (!testName || typeof (testName) == "undefined" || testName.trim() == "") {
		$(".testName").hide();
	} else {
		var parame = {};
		parame.testName = testName;

		$
				.ajax({
					url : 'testProjectController/getTestProjectByTestName.do',// 跳转到//
					// action
					type : 'post',
					data : parame,
					dataType : 'json',
					success : function(data) {
						if (data) {
							var html, length;
							var myobj = JSON.parse(data);
							var htmlElement = "<ul>";// 定义HTML
							html = $(".testName");
							if (myobj.length == 0) {
								htmlElement += "<li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li>";
							} else {
								length = myobj.length;
							}

							for (var i = 0; i < length; i++) {
								htmlElement += "<li value='" + myobj[i].nameCn
										+ " | " + myobj[i].nameEn + "' title='"
										+ myobj[i].laborHour + "' class='"
										+ myobj[i].ID + "'>" + myobj[i].nameCn
										+ " | " + myobj[i].nameEn + "</li>";
							}
							htmlElement += "</ul>";
							html.show();
							html.empty();
							html.append(htmlElement);
							addClickbyfactoryCode();
						}
					}
				});
	}
}

function addClickbyfactoryCode() {
	// 给input赋值
	$(".testName ul li").click(function() {
		var name = $(this).attr("value");
		if (name == null || name.trim() == "" || name == "undefined") {
			name = "";
		}
		$("#add_testName").val(name);
		var ID = $(this).attr("class");
		var laborHour = $(this).attr("title");
		if (ID == null || ID.trim() == "" || ID == "undefined") {
			ID = "";
		}
		if (laborHour == null || laborHour == "undefined") {
			laborHour = "";
		}
		$('#add_ID').val(ID);
		$("#add_laborHour").val(laborHour);
		$(".testName").hide();
	})

	// 隐藏提示框
	$(".row1").click(function() {
		$(".testName").hide();
	})
}

function getTestType2(state) {
	var html;
	$.ajax({
		url : 'testProjectController/getAllTestType.do',
		dataType : 'json',
		success : function(o) {
			var data = JSON.parse(o);
			for (var i = 0; i < data.length; i++) {
				html += '<option value = "' + data[i].ID + '">' + data[i].name
						+ '</option>';
			}
			if (state == "add") {
				$("#add_name ").empty(); // 清空子元素
				$('#add_name').append(html);
			} else if (state == "edit") {
				$("#edit_name ").empty(); // 清空子元素
				$('#edit_name').append(html);
			}
		}
	});
}

function add() {
	$('#addModal').modal('show');
	$('input[type="text"]').val("");
	var state = "add";
	getTestType2(state);
}

function ensure() {
	var param = {};
	param.ID = $('#add_ID').val();
	param.laborHour = $('#add_laborHour').val();
	param.testTypeID = $('#add_name').val();
	if (checkdata(param)) {
		$.ajax({
			url : 'testProjectController/updateManHour.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : param,
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
				$('#addModal').modal('hide');
				$('#table').bootstrapTable('refresh', null);

			}
		});
	}
}

function checkdata(data) {
	if (data.ID == "" || data.ID == "null") {
		swal("检测项目不存在");
		return false;
	}

	if (data.laborHour == "" || data.laborHour == "null") {
		swal("工时不能为空");
		return false;
	}

	var filter = /^[0-9]*$/;
	if (!filter.test(data.laborHour)) {
		swal('请输入正确的数字');
		return false;
	}

	return true;
}

function openedit(data) {
	// $('#edit_factoryCode').val(data.factoryCode);
	$('#edit_testName').val(data.nameCn + " | " + data.nameEn);
	$('#edit_laborHour').val(data.laborHour);
	$('#edit_ID').val(data.ID);
	//$("#edit_name").val("1012");
	//$("#edit_name").selectmenu('refresh');  
	var state="edit";
	getTestType2(state);
	$('#editModal').modal('show');
}

function edit() {
	var param = {};
	param.ID = $('#edit_ID').val();
	param.laborHour = $('#edit_laborHour').val();
	param.testTypeID = $('#edit_name').val();
	if (checkdata(param)) {
		$.ajax({
			url : 'testProjectController/updateManHour.do',
			scriptCharset : "utf-8",
			contentType : "application/x-www-form-urlencoded; charset=utf-8", // 中文乱码
			data : param,
			success : function(o) {
				if (o <= 0) {
					swal({
						title : "修改失败",
						type : 'warning'
					});
				}
				swal({
					title : "修改成功",
					type : 'success'
				});
				$('input[type="text"]').val("");
				$('#editModal').modal('hide');
				$('#table').bootstrapTable('refresh', null);

			}
		});
	}
}

function checkData(dataObj) {
	if (!dataObj.hasOwnProperty("name") || dataObj.name == null
			|| dataObj.name.trim() == "NULL") {
		dataObj.name = "";
	}
	if (!dataObj.hasOwnProperty("nameCn") || dataObj.nameCn == null
			|| dataObj.nameCn.trim() == "NULL") {
		dataObj.nameCn = "";
	}
	if (!dataObj.hasOwnProperty("nameEn") || dataObj.nameEn == null
			|| dataObj.nameEn.trim() == "NULL") {
		dataObj.nameEn = "";
	}
}
