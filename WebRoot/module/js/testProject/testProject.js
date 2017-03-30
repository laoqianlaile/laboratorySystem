$(function() {
	init();
	
	getDepartment("query_departmentID");
	
	$(document).on("click", "#addOver", function(event) {
		event.stopPropagation();
		$(".over").css("display", "none");
		$(".over").css("width", "0");
		$(".over").css("height", "0");
		var names = getTestTatol("add").names;
		var date = getTestTatol("add");
//		$("#addTestProject").val("");
//		$("#addTestProject").val(names.substring(0, names.length - 3));
		swal({title:names,type:"warning"});
		console.log(date);

	});
	
	$(document).on("click", "#editOver", function(event) {
		event.stopPropagation();
		$(".over").css("display", "none");
		$(".over").css("width", "0");
		$(".over").css("height", "0");
		var names = getTestTatol("edit").names;
		$("#editTestProject").val("");
		$("#editTestProject").val(names.substring(0, names.length - 3));

	});
	
	
	$(document).on("click", ".chooseInput", function(event) {
		event.stopPropagation();
	});
	$(document).on("click", ".fontStyle", function(event) {
		event.stopPropagation();
		// this == event.target
		$(event.target).prev().click();
	});
	
	
	$(".choose  .row  .col-xs-12").click(function(event) {
		$(this).children("input.chooseInput").click();
		event.stopPropagation();
	});
	
	
	$("#addTestProject").focus(function(event) {
		var testNamevalue = $("#addTestProject").val();
		var data = getTestLisk(); // 获取检测项目列表
		var htmlP = "";
		if (data != false) {
			htmlP = playTestProjectHtml(data, testNamevalue, "add");// 拼装项目列表html
			$("#addOver .overChoose .choose .row ").empty(); // 清空子元素
			$("#addOver .overChoose .choose .row ").html(htmlP);
		}
		// 显示第二层遮罩
		$(".overChoose").css("display", "block");
		$(".over").css("display", "block");
		var docWidth = $("#addModal .modal-dialog").width();
		var docHeight = $("#addModal .modal-dialog").height();
		$(".over").css("width", docWidth);
		$(".over").css("height", docHeight);

	});
	
	$("#editTestProject").focus(function(event) {
		var testNamevalue = $("#editTestProject").val();
		var data = getTestLisk(); // 获取检测项目列表
		var htmlP = "";
		if (data != false) {
			htmlP = playTestProjectHtml(data, testNamevalue, "edit");// 拼装项目列表html
			$("#editOver .overChoose .choose .row ").empty(); // 清空子元素
			$("#editOver .overChoose .choose .row ").html(htmlP);
		}
		// 显示第二层遮罩
		$(".overChoose").css("display", "block");
		$(".over").css("display", "block");
		var docWidth = $("#editModal .modal-dialog").width();
		var docHeight = $("#editModal .modal-dialog").height();
		$(".over").css("width", docWidth);
		$(".over").css("height", docHeight);

	});
});

//获取选择的检测项目ID和名字
function getTestTatol(isAdd) {
	var total = {};
	var checkboxName = "";
	if (isAdd == "add") {
		checkboxName = "addTask";
	} else
		checkboxName = "editTask";
	var cbs = $("input[name='" + checkboxName + "']:checked");
	var ids = "", names = "";
	for (var i = 0; cbs && i < cbs.length; i++) {
		ids += $(cbs[i]).val() + " , ";
		names += $(cbs[i]).next().text() + "  ,  ";
	}
	total.ids = ids;
	total.names = names;


	return total;
}

//拼装项目列表html
function playTestProjectHtml(data, testNamevalue, isAdd) {
	var html = "";
	var checkName = ""
	if (isAdd == "add")
		checkName = "addTask";
	else
		checkName = "editTask";
	for (var i = 0; i < data.length; i++) {
		html += '<div class="col-xs-12  col-md-12" >';
		if (isContains(testNamevalue, data[i].equipmentName))
			html += '<input type="checkbox"  checked="chenked" value="'
					+ data[i].ID + '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle">'
					+ data[i].equipmentName + '</label></div>';
		else
			html += '<input type="checkbox"   value="' + data[i].ID
					+ '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle">'
					+ data[i].equipmentName + '</label></div>';
	}
	return html;
}

//判断字符串是否包含字串
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}

function init() {

	$(function() {
		$('#table')
				.bootstrapTable(
						{
							striped : false, // 隔行变色效果
							pagination : true,// 在表格底部显示分页条
							pageSize : 10,// 页面数据条数
							pageNumber : 1,// 首页页码
							pageList : [ 3, 5, 10, 50, 200],// 设置可供选择的页面数据条数
							clickToSelect : true,// 设置true 将点击时，自动选择rediobox
							// 和 checkbox
							cache : false,// 禁用AJAX数据缓存
							sortName : 'testProject.createTime',
							order : 'desc',
							url : 'testProjectController/getTestProjectWithPaging.do',
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
										width : '1%'// 宽度
									},
									{
										field : '',
										title : '序号',
										width : '5%',
										align : 'center',
										valign : 'middle',
										formatter : function(value, row, index) {
											return index + 1;
										}
									},
									{
										field : 'testProjectID',// 返回值名称
										title : '检测项目id',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
									{
										field : 'testStandardID',// 返回值名称
										title : '检测标准id',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
									{
										field : 'testInstumentID',// 返回值名称
										title : '检测仪器id',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
									{
										field : 'DEPARTMENTID',// 返回值名称
										title : '部门ID',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
									{
										field : 'STANDARDID',// 返回值名称
										title : '标准ID',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},{
										field : 'EQUIPMENTID',// 返回值名称
										title : '设备ID',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
									{
										field : 'NAMECN',// 返回值名称
										title : '中文名称',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '8%',// 宽度
									},
									{
										field : 'NAMEEN',// 返回值名称
										title : '英文名称',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '8%'// 宽度
									},
									{
										field : 'ENVIRONMENTALREQUIREMENTS',// 返回值名称
										title : '环境要求',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '8%'// 宽度
									},
									{
										field : 'STANDARDCODE',// 返回值名称
										title : '所属标准',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '8%'// 宽度
									},
									{
										field : 'DEPARTMENTNAME',// 返回值名称
										title : '所属科室',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'describes',// 返回值名称
										title : '标准描述',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'EQUIPMENTNAME',// 返回值名称
										title : '所属仪器',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'createTime',// 返回值名称
										title : '创建时间',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '8%'// 宽度
									},
									{
										field : 'remarks',// 返回值名称
										title : '备注',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : '',
										title : '操作',
										align : 'center',
										valign : 'middle',
										width : '10%',
										formatter : function(value, row, index) {
											var d = "<img src ='module/img/download_icon.png' onclick='delTestProject(\""+row.testProjectID+"\")' title='删除' style='cursor:pointer;margin-right:8px;' />"
											var a = "<img src ='module/img/edit_icon.png' onclick='openEditModal("+JSON.stringify(row)+")'  title='修改'  style='cursor:pointer;margin-right:8px;' />"
											return  a + d;
										}
									} ]
						// 列配置项,详情请查看 列参数 表格
						/* 事件 */
						});
	});
}


/* 刷新方法 */
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}

/* 重置刷新 */
function reSetRefresh(){
	document.getElementById("query_nameCnORnameEn").value=""; 	
	document.getElementById("query_departmentID").value=""; 	
	
	query();
}


function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

		departmentID : $('#query_departmentID').val(),
		nameCnORnameEn : $('#query_nameCnORnameEn').val(),
		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort : params.sort, // 排序列名
		order : params.order
	// 排位命令（desc，asc）
	};
	return temp;
}

/* 查询方法 */
function query() {

	init();
	refresh();

}

function addModal() {
	
	getDepartment("add_DEPARTMENTID"); //从数据库里获取部门信息
	getStandard("add_STANDARDID");	// 从数据库里获取标准信息
	
	$('#addModal').modal('show');
	
}


function addTestProject() {

	var parame = {};
		
	parame.NAMECN = ($('#add_NAMECN').val());
	parame.NAMEEN = ($('#add_NAMEEN').val());
	parame.DEPARTMENTID = ($('#add_DEPARTMENTID').val());
	parame.ENVIRONMENTALREQUIREMENTS = ($('#add_ENVIRONMENTALREQUIREMENTS')
			.val());
	parame.STANDARDID = ($('#add_STANDARDID').val());
	
	parame.EQUIPMENTID = "";
	
	var total = getTestTatol("add").ids;
	
	parame.EQUIPMENTID = total;
	
	parame.describes = ($('#add_DESCRIBE').val());
	parame.remarks = ($('#add_REMARKS').val());
	
	$.ajax({
		url : 'testProjectController/addTestProject.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				alert("新增失败");
			}
			$('#addModal').modal('hide');

			refresh();
		}

	});
}

/**/
function delTestProject(){
	if(confirm("确定要删除？")){
		 TestProjectIDs = arguments[0];
		 $.ajax({
				url: 'testProjectController/delTestProject.do',
				data:{
					TestProjectIDs : TestProjectIDs
				},
				success:function(o){
					if(o <= 0){
						alert("修改失败");
					}
					$('#editModal').modal('hide');
					refresh();
				}
          });
	 }
}
/* 删除方法 */
function delData() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0) {
		alert("请至少选中一条数据");
		return;
	}

	var ids = "";
	for (var i = 0; i < data.length; i++) {
		console.log(data[i].testProjectID);
		ids += data[i].testProjectID + ",";
	}
	
	var ajaxParameter = {};
	ajaxParameter.TestProjectIDs = ids.substring(0, (ids.length - 1))

	console.log(ajaxParameter.TestProjectIDs);
	$.ajax({
		url : 'testProjectController/delTestProject.do',
		data : ajaxParameter,
		success : function(o) {
			if (o <= 0) {
				alert("删除失败");
			}
			refresh();
		}
	});
}

/* 修改方法 */
function openEditModal(){
	
	$("input#add_EQUIPMENT").removeAttr("checked");
	
	
	getDepartment("edit_DEPARTMENTID");	//从数据库里获取部门信息
	
	getEquipment("edit_EQUIPMENTID");// 从数据库里获取设备信息
	
	getStandard("edit_STANDARDID");// 从数据库里获取标准信息
	
	$('#edit_testProjectID').val(arguments[0].testProjectID);
	$('#edit_testStandardID').val(arguments[0].testStandardID);
	$('#edit_testInstumentID').val(arguments[0].testInstumentID);
	
	$('#edit_NAMECN').val(arguments[0].NAMECN);
	$('#edit_NAMEEN').val(arguments[0].NAMEEN);
	$('#edit_ENVIRONMENTALREQUIREMENTS').val(arguments[0].ENVIRONMENTALREQUIREMENTS);

	$('#edit_DEPARTMENTID').val(arguments[0].DEPARTMENTID);
	$('#edit_STANDARDID').val(arguments[0].STANDARDID);
	
	$('#edit_DESCRIBE').val(arguments[0].describes);
	$('#edit_REMARKS').val(arguments[0].remarks);
	
	$(".testProjectName").val(arguments[0].EQUIPMENTNAME);
//	var arr = arguments[0].EQUIPMENTID.split(',');
//	
//	for(var i = 0; i < arr.length; i++){
//		$("input:checkbox[value='"+ arr[i] +"']").attr("checked","checked");
//	}
	
	
	console.log(arguments[0].EQUIPMENTID);
	$('#editModal').modal('show');
}


function editTestProject(){
	
	var parame = {};
	
	parame.testProjectID = ($('#edit_testProjectID').val());
	parame.testStandardID = ($('#edit_testStandardID').val());
	parame.testInstumentID = ($('#edit_testInstumentID').val());
	parame.NAMECN = ($('#edit_NAMECN').val());
	parame.NAMEEN = ($('#edit_NAMEEN').val());
	parame.DEPARTMENTID = ($('#edit_DEPARTMENTID').val());
	parame.ENVIRONMENTALREQUIREMENTS = ($('#edit_ENVIRONMENTALREQUIREMENTS')
			.val());
	parame.STANDARDID = ($('#edit_STANDARDID').val());
	parame.DESCRIPTION = ($('#edit_DESCRIPTION').val());
	
	parame.EQUIPMENTID = "";
	
	var total = getTestTatol("edit").ids;
	
	parame.EQUIPMENTID = total;
	/*$('input[name="EQUIPMENTID"]:checked').each(function(){
		parame.EQUIPMENTID += ($(this).val()) + ",";
	});*/
	
	parame.describes = ($('#edit_DESCRIBE').val());
	parame.remarks = ($('#edit_REMARKS').val());
	$.ajax({
		url : 'testProjectController/editTestProject.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				alert("修改失败");
			}
			$('#editModal').modal('hide');

			refresh();
		}

	});
}

// 获取部门信息
function getDepartment(id) {
	$.ajax({
		url : 'testProjectController/getDepartment.do',
		success : function(o) {
			
			if($('#' + id + '').children().length == 0 || $('#' + id + '').children().length == 1 ){
				var data = JSON.parse(o);
				
				for (var i=0; i<data.length;i++)
				{	
					$('#' + id + '').append("<option value='" + data[i].ID + "' >" +data[i].departmentName + " </option>");
				}
			}
			
			
		}

	});
}

//获取设备信息
function getTestLisk() {
	var data;
	$.ajax({
		url : 'testProjectController/getEquipment.do',
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

// 获取设备信息
function getEquipment(id){
	$.ajax({
		url : 'testProjectController/getEquipment.do',
		success : function(o) {
			
			if($('#' + id + '').children().length == 1)
			{
				var data = JSON.parse(o);
				
				for (var i=0; i<data.length;i++)
				{
					$('#' + id + '').append("<input  type='checkbox'  value="+ data[i].ID +" id = 'add_EQUIPMENT' name='EQUIPMENTID' >"+ data[i].equipmentName+"");
				}
			}
			
		}

	}); 
}

// 获取标准信息
function getStandard(id){
	$.ajax({
		url : 'testProjectController/getStandard.do',
		success : function(o) {
			
			if($('#' + id + '').children().length == 0)
			{
				var data = JSON.parse(o);
				
				if(data.length === 0){
					sweetAlert("没有找到数据", "没有通过的标准或者没有标准数据", "error");
				}
				
				for (var i=0; i<data.length;i++)
				{
					$('#' + id + '').append("<option value='" + data[i].ID + "' >" +data[i].STANDARDCODE + " </option>");
				}
			}
		}

	});
}


// 填充设备数据
function fullEquipments(equipmentDate){
	var html = "<div class='form-control' >";
	if(equipmentDate.length < 5){
		for(var i = 0; i < equipmentDate.length ; i++){
			html += "<option class='form-control' value ='"+equipmentDate[i].ID+"' onclick='displayChecked(this)'>" + equipmentDate[i].equipmentName+ " </option>";
		}
	}
	else{
		for(var i = 0; i < 4 ; i++){
			html += "<option class='form-control' value ='"+equipmentDate[i].ID+"' onclick='displayChecked(this)'>" + equipmentDate[i].equipmentName+ " </option>";
		}
	}
	html +="</div>"
	$('#showEquipments').html(html);
	$('#showEquipments').show();
}
// 获得焦点展示部分设备
function showPartEquipment(date){
	fullEquipments(getTestLisk());
}
//搜索展示部分设备
function searchEquipment(){
	fullEquipments(matchEquipment());
}
// 展示被选中的设备
function displayChecked(equipmentInfo){

	console.log(equipmentInfo);
	
	if(isSameID(equipmentInfo.value)){
		html='<fieldset><legend align ="right">x</legend><span class= "singleE" onclick="moveSingleE(this)" id ="'+equipmentInfo.value+'">'+equipmentInfo.text+'</span></fieldset>';
		$('#displayChecked').append(html);
	}
	else{
		swal("请不要重复选中同一设备");
	}
}
//检测是否有重复的ID设备
function isSameID(checkID){
	var allEquipmentIDs =$('#displayChecked span.singleE');
	if(allEquipmentIDs.length == 0){
		return true;
	}
	else{
		for(var i=0;i<allEquipmentIDs.length;i++){
			if(allEquipmentIDs[i].id === checkID){
				return false;
			}
		}
		return true;
	}
	
}
// 删除点中的设备
function moveSingleE(SingleEInfo){
	$('span').remove('[id="'+SingleEInfo.id+'"]');
}
// 匹配设备名称 返回数据
function matchEquipment(){
	$('#showEquipments').css("display","block");
	var matchName = $('#searchEquipments').val();
	console.log(matchName);
	var date;
	$.ajax({
		url : 'equipmentController/getEquipmentByName.do?equipmentName=' + matchName,
		dataType : "json",
		async : false,
		data : {},
		success :function(o){
			date = JSON.parse(o);
		},
		error : function(){
			return false;
		}
	});
	if(date.length == 0){
		console.log("没有搜索到人员，请重新输入或检查是否有员工。");
	}
	return date;
	
}