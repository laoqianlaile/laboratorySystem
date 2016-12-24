$(function() {
	init();
});

function init() {

	$(function() {
		$('#table')
				.bootstrapTable(
						{
							striped : true, // 隔行变色效果
							pagination : true,// 在表格底部显示分页条
							pageSize : 10,// 页面数据条数
							pageNumber : 1,// 首页页码
							pageList : [ 3, 5,  9, 10, 200, 500 ],// 设置可供选择的页面数据条数
							clickToSelect : true,// 设置true 将点击时，自动选择rediobox
							// 和 checkbox
							cache : false,// 禁用AJAX数据缓存
							sortName : 'department.ID',
							order : 'asc',
							url : 'departmentController/getDepartmentWithPage.do',
							sidePagination : 'server',
							contentType : 'application/json',
							dataType : 'json',
							offset : 0,
							queryParams : queryParams, // 参数
							queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
							showRefresh : false, // 显示刷新按钮

							columns : [
										{
											checkbox : true,
											width : '3%'// 宽度
										},
										{
											field : '',
											title : '序号',
											width : '3%',
											align : 'center',
											valign : 'middle',
											formatter : function(value, row, index) {
												return index + 1;
											}
										},
										{
											field : 'ID',// 返回值名称
											title : '',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10',// 宽度
											visible : false
										},
										{
											field : 'departmentCode',// 返回值名称
											title : '部门编号',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%',// 宽度
										},
										{
											field : 'departmentName',// 返回值名称
											title : '部门名称',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'employeeName',// 返回值名称
											title : '负责人',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'remarks',// 返回值名称
											title : '部门简介',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '18%'// 宽度
										},
										{
											field : 'createTime',// 返回值名称
											title : '创建时间',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '9%'// 宽度
										},
										{
											field : 'Pdepartment',// 返回值名称
											title : '上级部门',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										} ]
							// 列配置项,详情请查看 列参数 表格
							/* 事件 */
							});
		});
	}
function getdepartment1(){
	$.ajax({
		url:'departmentController/getdatalist.do',
		data:{type:1},
		async:false,
		success:function(e){
			var myobj = eval(e);
			var dom1 = $('#listul2');
			$('#textspan2').html("");
			var str2 = "<li role='presentation' onclick='changevalue2(1,\"\")'>\"\"</li>";
			dom1.append(str2);
			for(var i = 0;i< myobj.length;i++){
				var str = "<li role='presentation' onclick='changevalue2(1,\""+myobj[i].departmentName+"\")'>"+myobj[i].departmentName+"</li>";
				dom1.append(str);
			};
			 refresh();
			
		}
	});
}
function getdepartment(){
	$.ajax({
		url:'departmentController/getdatalist.do',
		data:{type:1},
		success:function(e){
			$("#listul1 ").empty(); 
			var myobj = eval(e);
			var dom1 = $('#listul1');
			
			$('#textspan1').html("");
			var str2 = "<li role='presentation' onclick='changevalue(1,\"\")'>\"\"</li>";
			dom1.append(str2);
			for(var i = 0;i< myobj.length;i++){
				var str = "<li role='presentation' onclick='changevalue(1,\""+myobj[i].departmentName+"\")'>"+myobj[i].departmentName+"</li>";
				dom1.append(str);
			};
			 refresh();
			
		}
	});
}

function changevalue(type,value){
	
		$('#textspan1').html(value);
	
	
}
function changevalue2(type,value){
	
	$('#textspan2').html(value);


}
$(document).on("click", "#addOver", function(event) {
	event.stopPropagation();
	$(".over").css("display", "none");
	$(".over").css("width", "0");
	$(".over").css("height", "0");
	$("#add_responsibleMan").val("");
	$("#add_employeeID").val("");
	$("#edit_employeeID").val("");
	$("#edit_employee").val("");
	

});

$(document).on("click", ".chooseInput", function(event) {

	event.stopPropagation();

	
});
$(document).on("click", ".fontStyle", function(event) {
	event.stopPropagation();
	console.log($(this).text());
	$("#add_employeeID").val("");
	$("#add_responsibleMan").val($(this).text());
	$("#add_employeeID").val($(this).prev().val());

	// this == event.target
	$(event.target).prev().click();
	$(".overChoose").hide();
	
	
});

$(".choose  .row  .col-xs-12").click(function(event) {
	$(this).children("input.chooseInput").click();
	event.stopPropagation();
});

// 人的选取
$("#add_responsibleMan").focus(function(event) {
	var testNamevalue = $("#add_responsibleMan").val();
	var data = getdataLisk(); // 获取检测项目列表
	var htmlP = "";
	if (data != false) {
		htmlP = playTestProjectHtml(data, testNamevalue, "add");// 拼装项目列表html
		$("#addOver .overChoose .choose .row ").empty(); // 清空子元素
		$("#addOver .overChoose .choose .row ").html(htmlP);
	}
	// 显示第二层遮罩
	$(".overChoose").css("display", "block");
	$(".over").css("display", "block");
	var docWidth = $("#addTaskModal .modal-dialog").width();
	var docHeight = $("#addTaskModal .modal-dialog").height();
	$(".over").css("width", docWidth);
	$(".over").css("height", docHeight);

});
//修改负责人
$(document).on("click", ".fontStyle1", function(event) {
	event.stopPropagation();
	console.log($(this).text());

	$("#edit_employee").val($(this).text());
	$("#edit_employeeID").val($(this).prev().val());

	// this == event.target
	$(event.target).prev().click();
	$(".overChoose").hide();
	
	
});

$(".choose  .row  .col-xs-12").click(function(event) {
	$(this).children("input.chooseInput").click();
	event.stopPropagation();
});

// 人的选取
$("#edit_employee").focus(function(event) {
	var testNamevalue = $("#edit_employee").val();
	var data = getdataLisk(); // 获取检测项目列表
	var htmlP = "";
	if (data != false) {
		htmlP = playTestProjectHtml1(data, testNamevalue, "add");// 拼装项目列表html
		$("#addOver .overChoose .choose .row ").empty(); // 清空子元素
		$("#addOver .overChoose .choose .row ").html(htmlP);
	}
	// 显示第二层遮罩
	$(".overChoose").css("display", "block");
	$(".over").css("display", "block");
	var docWidth = $("#addTaskModal .modal-dialog").width();
	var docHeight = $("#addTaskModal .modal-dialog").height();
	$(".over").css("width", docWidth);
	$(".over").css("height", docHeight);

});





function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
	

function playTestProjectHtml(data, testNamevalue, isAdd) {

	var html = "";
	var checkName = "";
	
	for (var i = 0; i < data.length; i++) {
		html += "<div class='col-xs-12  col-md-12' style='text-align:center' >";
		if (isContains(testNamevalue, data[i].employeeName))
			html += '<input type="hidden"  checked="chenked" value="'
					+ data[i].ID + '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle">'
					+ data[i].employeeName + '</label></div>';
		else
			html += '<input type="hidden"   value="' + data[i].ID
					+ '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle" >'
					+ data[i].employeeName + '</label></div>';
	}
	return html;
}
function playTestProjectHtml1(data, testNamevalue, isAdd) {

	var html = "";
	var checkName = "";
	
	for (var i = 0; i < data.length; i++) {
		html += "<div class='col-xs-12  col-md-12' style='text-align:center' >";
		if (isContains(testNamevalue, data[i].employeeName))
			html += '<input type="hidden"  checked="chenked" value="'
					+ data[i].ID + '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle1">'
					+ data[i].testName + '</label></div>';
		else
			html += '<input type="hidden"   value="' + data[i].ID
					+ '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle1" >'
					+ data[i].employeeName + '</label></div>';
	}
	return html;
}
function getdataLisk() {
	var data;
	$.ajax({
		url:'sampleRecordController/getdatalist.do',
		dataType : "json",
		async : false,
		data : {},
		success : function(o) {
			data =o;
		},
		error : function() {
			return false;
		}
	});
	return data;
}
$(document).click(function(){
    $(".overChoose").hide();

});
$("#add_responsibleMan").click(function(event){
    event.stopPropagation();

});
$("#edit_employee").click(function(event){
    event.stopPropagation();

});





/* 刷新方法 */
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}

function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			sort : params.sort, // 排序列名
			order : params.order
	// 排位命令（desc，asc）
	};
	return temp;
}

/* 全部数据方法 */
function query() {

	init();
	refresh();

}
/* 弹出修改弹框方法 */
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	//$("div#only1 .form-control").attr({"disabled":false});
	$('#edit_ID').val(data[0].ID);
	$('#edit_departmentCode').val(data[0].departmentCode);
	$('#edit_departmentName').val(data[0].departmentName);
	$('#edit_remarks').val(data[0].remarks);
	$('#edit_employeeID').val(data[0].employeeID);
	$('#textspan2').text(data[0].Pdepartment);
	
	$('#editModal').modal('show');
}
function edit(){
	var parame = {};
	parame.ID=$('#edit_ID').val();
	parame.departmentName = $('#edit_departmentName').val();
	parame.departmentCode = $('#edit_departmentCode').val();
	parame.remarks = $('#edit_remarks').val();
	parame.employeeID = $('#edit_employeeID').val();
	parame.parent = $('#textspan2').text();
	if($('#edit_departmentName').val()!=$('#textspan2').text()){
	if($('#edit_departmentName').val()!=""&&$('#edit_departmentCode').val()!=""){
	$.ajax({	
		  url:'departmentController/updDepartment.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("修改失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  }
		});	
	}else alert("请把信息修改完整");
	}else alert("不能把自己作为上级部门");
}
function find(){
	var parame = {};
	parame.departmentCode = $('#linkdepartmentCode').val();
	parame.departmentName = $('#linkdepartmentName').val();
	parame.employeeName = $('#linkemployeeID').val();
	
	$('#table').bootstrapTable('refresh', {
		silent:true,
		url:"departmentController/getDepartmentWithPage.do",
		query:parame
	});
}


/* 新增方法 */
function add(){
	var parame = {};
	parame.departmentName = $('#add_departmentName').val();
	parame.departmentCode = $('#add_departmentCode').val();
	parame.remarks = $('#add_remarks').val();
	parame.employeeID = $('#add_employeeID').val();
	parame.parent = $('#textspan1').text();
	if($('#add_departmentName').val()!=""&&$('#add_departmentCode').val()!=""){
	$('#add_remarks').val("");
	$('#textspan1').text("");
	alert($('#add_employeeID').val());
	$("input").val("");
	$.ajax({
	  url:'departmentController/addDepartment.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  alert("新增失败");
		  }
		  $('#addModal').modal('hide');
		  refresh();
	  }
	});
	}else alert("请把信息填完");
}
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0){
		alert("请至少选中一条数据");
		return;
	}
	
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += data[i].ID + ",";
	}
	
	var ajaxParameter = {
			IDs:ids.substring(0, (ids.length-1))
	};
	
	$.ajax({
	  url:'departmentController/delDepartment.do',
	  data:ajaxParameter,
	  success:function(o){
		  if(o<=0){
			  alert("删除失败");
		  }
		  refresh();
	  }
	});
}


