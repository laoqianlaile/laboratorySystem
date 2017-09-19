var param = {
	factoryCode : $('#search_factoryCode').val(),// 初始化搜索文字
	sampleName : $('#search_sampleName').val(),
	specifications : $('#search_specifications').val()
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
						pageList : [ 3, 5, 10, 15, 20 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
						// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'ID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
						url : 'sampleController/getSampleWithPagingINmanhour.do',// 服务器数据的加载地址
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
									title : '样品ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '10',// 宽度
									visible : false
								},
								{
									field : 'factoryCode',// 返回值名称
									title : '样品编号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'sampleName',// 返回值名称
									title : '样品名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : '20%'// 宽度
								},
								{
									field : 'specifications',// 返回值名称
									title : '型号',// 列名
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
});

/* 查询方法 */
function search() {
	// 查询的时候 他的limit 会依据页面上的数保留 不会变0
	var parame = {};
	parame.factoryCode = $('#search_factoryCode').val();// 初始化搜索文字
	parame.sampleName = $('#search_sampleName').val();
	parame.specifications = $('#search_specifications').val();
	$('#table').bootstrapTable('refresh', {
		silent : true,
		url : "sampleController/getSampleWithPagingINmanhour.do",
		query : parame
	});
}

/* 刷新方法 */
function reflesh() {

	var parame = {};
	parame.factoryCode = "";// 初始化搜索文字
	parame.sampleName = "";
	parame.specifications = "";
	$('#table').bootstrapTable('refresh', {
		silent : false,
		url : "sampleController/getSampleWithPagingINmanhour.do",
		query : parame
	});
}

/* 查看方法 */
function view(data) {

	$('#factoryCode').val(data.factoryCode);
	$('#sampleName').val(data.sampleName);
	$('#specifications').val(data.specifications);
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

	var sampleIDs = ids.substring(0, (ids.length - 1))
	del(sampleIDs);
}

/* 删除方法 */
function del(sampleIDs) {
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
			url : 'sampleController/delSample.do',
			data : {
				sampleIDs : sampleIDs
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

function addByfactoryCode() {
	var factoryCode = $('#add_factoryCode').val();
	if (!factoryCode || typeof (factoryCode) == "undefined"
			|| factoryCode.trim() == "") {
		$(".factoryCode").hide();
	} else {
		var parame = {};
		parame.factoryCode = factoryCode;

		$.ajax({
					url : 'sampleController/getSampleImforByFactoryCode.do',// 跳转到// action
					type : 'post',
					data : parame,
					dataType : 'json',
					success : function(data) {
						if (data) {
							var html, length;
							var myobj = JSON.parse(data);
							var htmlElement = "<ul>";// 定义HTML
							html = $(".factoryCode");
							if (myobj.length == 0) {
								htmlElement += "<li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li>";
							} else {
								length = myobj.length;
							}

							for (var i = 0; i < length; i++) {
								htmlElement += "<li id='" + myobj[i].sampleName
										+ "' value='" + myobj[i].factoryCode
										+ "' name='" + myobj[i].specifications
										+ "' title='" + myobj[i].laborHour
										+ "' class='" + myobj[i].ID + "'>"
										+ myobj[i].factoryCode + "</li>";
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

function editByfactoryCode(){
	var factoryCode = $('#edit_factoryCode').val();
	if (!factoryCode || typeof (factoryCode) == "undefined"
			|| factoryCode.trim() == "") {
		$(".factoryCode").hide();
	} else {
		var parame = {};
		parame.factoryCode = factoryCode;

		$.ajax({
					url : 'sampleController/getSampleImforByFactoryCode.do',// 跳转到// action
					type : 'post',
					data : parame,
					dataType : 'json',
					success : function(data) {
						if (data) {
							var html, length;
							var myobj = JSON.parse(data);
							var htmlElement = "<ul>";// 定义HTML
							html = $(".factoryCode");
							if (myobj.length == 0) {
								htmlElement += "<li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li>";
							} else {
								length = myobj.length;
							}

							for (var i = 0; i < length; i++) {
								htmlElement += "<li id='" + myobj[i].sampleName
										+ "' value='" + myobj[i].factoryCode
										+ "' name='" + myobj[i].specifications
										+ "' title='" + myobj[i].laborHour
										+ "' class='" + myobj[i].ID + "'>"
										+ myobj[i].factoryCode + "</li>";
							}
							htmlElement += "</ul>";
							html.show();
							html.empty();
							html.append(htmlElement);
							editClickbyfactoryCode();
						}
					}
				});
	}
}

function addBysampleName() {
	var sampleName = $('#add_sampleName').val();
	if (!sampleName || typeof (sampleName) == "undefined"
			|| sampleName.trim() == "") {
		$(".sampleName").hide();
	} else {
		var parame = {};
		parame.sampleName = sampleName;

		$.ajax({
					url : 'sampleController/getSampleImforBySampleName.do',// 跳转到
																			// action
					type : 'post',
					data : parame,
					dataType : 'json',
					success : function(data) {
						if (data) {
							var html, length;
							var myobj = JSON.parse(data);
							var htmlElement = "<ul>";// 定义HTML
							html = $(".sampleName");
							if (myobj.length == 0) {
								htmlElement += "<li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li>";
							} else {
								length = myobj.length;
							}

							for (var i = 0; i < length; i++) {
								htmlElement += "<li id='"
										+ myobj[i].factoryCode + "' value='"
										+ myobj[i].sampleName + "' name='"
										+ myobj[i].specifications + "' title='"
										+ myobj[i].laborHour + "' class='"
										+ myobj[i].ID + "'>"
										+ myobj[i].sampleName + "</li>";
							}
							htmlElement += "</ul>";
							html.show();
							html.empty();
							html.append(htmlElement);
							addClickbysampleName();
						}
					}
				});
	}
}

function addByspecifications() {
	var specifications = $('#add_specifications').val();
	if (!specifications || typeof (specifications) == "undefined"
			|| specifications.trim() == "") {
		$(".specifications").hide();
	} else {
		var parame = {};
		parame.specifications = specifications;

		$.ajax({
					url : 'sampleController/getSampleImforBySpecifications.do',// 跳转到
																			// action
					type : 'post',
					data : parame,
					dataType : 'json',
					success : function(data) {
						if (data) {
							var html, length;
							var myobj = JSON.parse(data);
							var htmlElement = "<ul>";// 定义HTML
							html = $(".specifications");
							if (myobj.length == 0) {
								htmlElement += "<li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li>";
							} else {
								length = myobj.length;
							}

							for (var i = 0; i < length; i++) {
								htmlElement += "<li id='"
										+ myobj[i].factoryCode + "' value='"
										+ myobj[i].specifications + "' name='"
										+ myobj[i].sampleName + "' title='"
										+ myobj[i].laborHour + "' class='"
										+ myobj[i].ID + "'>"
										+ myobj[i].specifications + "</li>";
							}
							htmlElement += "</ul>";
							html.show();
							html.empty();
							html.append(htmlElement);
							addClickbyspecifications();
						}
					}
				});
	}
}

function addClickbyfactoryCode() {
	// 给input赋值
	$(".factoryCode ul li").click(
			function() {
				var name = $(this).attr("value");
				if (name == null || name.trim() == "" || name == "undefined") {
					name = "";
				}
				$("#add_factoryCode").val(name);
				var ID = $(this).attr("class");
				var sampleName = $(this).attr("id");
				var specifications = $(this).attr("name");
				var laborHour = $(this).attr("title");
				if (ID == null || ID.trim() == "" || ID == "undefined") {
					ID = "";
				}
				if (sampleName == null || sampleName.trim() == ""
						|| sampleName == "undefined") {
					sampleName = "";
				}
				if (specifications == null || specifications.trim() == ""
						|| specifications == "undefined") {
					specifications = "";
				}
				if (laborHour == null || laborHour == "undefined") {
					laborHour = "";
				}
				$('#add_ID').val(ID);
				$('#add_factoryCode').attr({'value' : "" + name + ""});
				$("#add_sampleName").val(sampleName);
				$("#add_specifications").val(specifications);
				$("#add_laborHour").val(laborHour);
				$(".factoryCode").hide();
			})

	// 隐藏提示框
	$(".row1").click(function() {
		$(".factoryCode").hide();
	})
}

function addClickbysampleName() {
	$(".sampleName ul li").click(
			function() {
				var name = $(this).attr("value");
				if (name == null || name.trim() == "" || name == "undefined") {
					name = "";
				}
				$("#add_sampleName").val(name);
				var ID = $(this).attr("class");
				var factoryCode = $(this).attr("id");
				var specifications = $(this).attr("name");
				var laborHour = $(this).attr("title");
				if (ID == null || ID.trim() == "" || ID == "undefined") {
					ID = "";
				}
				if (factoryCode == null || factoryCode.trim() == ""
						|| factoryCode == "undefined") {
					factoryCode = "";
				}
				if (specifications == null || specifications.trim() == ""
						|| specifications == "undefined") {
					specifications = "";
				}
				if (laborHour == null || laborHour == "undefined") {
					laborHour = "";
				}
				$('#add_sampleName').val(ID);
				$('#add_sampleName').attr({
					'value' : "" + name + ""
				});
				$("#add_factoryCode").val(factoryCode);
				$("#add_specifications").val(specifications);
				$("#add_laborHour").val(laborHour);
				$(".factoryCode").hide();
			})

	// 隐藏提示框
	$(".row1").click(function() {
		$(".sampleName").hide();
	})
}

function addClickbyspecifications() {
	$(".specifications ul li").click(
			function() {
				var name = $(this).attr("value");
				if (name == null || name.trim() == "" || name == "undefined") {
					name = "";
				}
				$("#add_specifications").val(name);
				var ID = $(this).attr("class");
				var factoryCode = $(this).attr("id");
				var sampleName = $(this).attr("name");
				var laborHour = $(this).attr("title");
				if (ID == null || ID.trim() == "" || ID == "undefined") {
					ID = "";
				}
				if (factoryCode == null || factoryCode.trim() == ""
						|| factoryCode == "undefined") {
					factoryCode = "";
				}
				if (sampleName == null || sampleName.trim() == ""
						|| sampleName == "undefined") {
					sampleName = "";
				}
				if (laborHour == null || laborHour == "undefined") {
					laborHour = "";
				}
				$('#add_ID').val(ID);
				$('#add_specifications').attr({
					'value' : "" + name + ""
				});
				$("#add_factoryCode").val(factoryCode);
				$("#add_sampleName").val(sampleName);
				$("#add_laborHour").val(laborHour);
				$(".factoryCode").hide();
			})

	// 隐藏提示框
	$(".row1").click(function() {
		$(".specifications").hide();
	})

}

function editClickbyfactoryCode() {
	// 给input赋值
	$(".factoryCode ul li").click(
			function() {
				var name = $(this).attr("value");
				if (name == null || name.trim() == "" || name == "undefined") {
					name = "";
				}
				$("#edit_factoryCode").val(name);
				var ID = $(this).attr("class");
				var sampleName = $(this).attr("id");
				var specifications = $(this).attr("name");
				var laborHour = $(this).attr("title");
				if (ID == null || ID.trim() == "" || ID == "undefined") {
					ID = "";
				}
				if (sampleName == null || sampleName.trim() == ""
						|| sampleName == "undefined") {
					sampleName = "";
				}
				if (specifications == null || specifications.trim() == ""
						|| specifications == "undefined") {
					specifications = "";
				}
				if (laborHour == null || laborHour == "undefined") {
					laborHour = "";
				}
				$('#edit_ID').val(ID);
				$('#edit_factoryCode').attr({'value' : "" + name + ""});
				$("#edit_sampleName").val(sampleName);
				$('#edit_sampleName').attr("disabled",true);
				$("#edit_specifications").val(specifications);
				$('#edit_specifications').attr("disabled",true);
				$("#edit_laborHour").val(laborHour);
				$(".factoryCode").hide();
			})

	// 隐藏提示框
	$(".row1").click(function() {
		$(".factoryCode").hide();
	})
}

function add() {
	$('#addModal').modal('show');
	$('input[type="text"]').val("");
}

function ensure(){
	var parame = {};
	var ID= $('#add_ID').val();
	parame.factoryCode = $('#add_factoryCode').val();
	parame.sampleName = encodeURI($('#add_sampleName').val());
	parame.specifications = $('#add_specifications').val();
	parame.laborHour = $('#add_laborHour').val();
	var re = /^[0-9]*[1-9][0-9]*$/;  
	if(!re.test(param.laborHour)){
		swal({
			title : "请输入非0正整数",
			type : 'warning'
		});
		return ;
	}
	if(ID==""){
		if (checkdata(parame)) {
			$.ajax({
						url : 'sampleController/addSampleInManHour.do',
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
							$('#addModal').modal('hide');
							$('#table').bootstrapTable('refresh', null);
							
						}
					});
		}
	}else {
		var param = {};
		param.ID = $('#add_ID').val();
		param.laborHour = $('#add_laborHour').val();
		if(checkdata(param)){
			$.ajax({
				url : 'sampleController/updateManHour.do',
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
	
}

function openedit(data) {
	$('#edit_factoryCode').val(data.factoryCode);
	$('#edit_sampleName').val(data.sampleName);
	$('#edit_specifications').val(data.specifications);
	$('#edit_laborHour').val(data.laborHour);
	$('#edit_ID').val(data.ID);
	$('#editModal').modal('show');
}

function edit(){
	var param = {};
	param.ID = $('#edit_ID').val();
	param.laborHour = $('#edit_laborHour').val();
	var re = /^[0-9]*[1-9][0-9]*$/;  
	if(!re.test(param.laborHour)){
		swal({
			title : "请输入非0正整数",
			type : 'warning'
		});
		return ;
	}
	if(checkdata(param)){
		$.ajax({
			url : 'sampleController/updateManHour.do',
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

function ckecklaborHour(data){
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


function checkdata(data){
	if (data.factoryCode == "" || data.factoryCode == "null") {
		swal("样品不能为空");
		return false;
	}

	if (data.sampleName == "" || data.sampleName == "null") {
		swal("样品名称不能为空");
		return false;
	}

	if (data.specifications == "" || data.specifications == "null") {
		swal("型号不能为空");
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

function checkData(dataObj) {
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null
			|| dataObj.factoryCode.trim() == "NULL") {
		dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("sampleName") || dataObj.sampleName == null
			|| dataObj.sampleName.trim() == "NULL") {
		dataObj.sampleName = "";
	}
	if (!dataObj.hasOwnProperty("specifications")
			|| dataObj.specifications == null
			|| dataObj.specifications.trim() == "NULL") {
		dataObj.specifications = "";
	}
}
