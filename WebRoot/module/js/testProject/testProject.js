$(function() {
	init();
	getDepartment("query_departmentID");
});

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
							sortOrder : 'desc',
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
										width : '2%'// 宽度
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
										field : 'testDepartmentID',// 返回值名称
										title : '检测部门id',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
								/*	{
										field : 'testInstumentID',// 返回值名称
										title : '检测仪器id',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},*/
									{
										field : 'departmentID',// 返回值名称
										title : '部门ID',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},
									{
										field : 'standardID',// 返回值名称
										title : '标准ID',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},/*{
										field : 'EQUIPMENTID',// 返回值名称
										title : '设备ID',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '0',// 宽度
										visible : false
									},*/
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
									/*{
										field : 'ENVIRONMENTALREQUIREMENTS',// 返回值名称
										title : '环境要求',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '8%',// 宽度
										visible : false
									},*/
									{
										field : 'standardName',// 返回值名称
										title : '依据标准',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '8%'// 宽度
									},
									{
										field : 'departmentName',// 返回值名称
										title : '检测部门',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'describes',// 返回值名称
										title : '技术条件',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%'// 宽度
									},
									{
										field : 'testtypeID',// 返回值名称
										title : '检测类别ID',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%',// 宽度
										visible : false
									},
									{
										field : 'typeName',// 返回值名称
										title : '检测类别',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%',// 宽度
									},
									/*{
										field : 'EQUIPMENTNAME',// 返回值名称
										title : '所属仪器',// 列名
										align : 'center',// 水平居中显示
										valign : 'middle',// 垂直居中显示
										width : '10%',// 宽度
										visible : false
									},*/
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
										width : '8%'// 宽度
									},
									{
										field : '',
										title : '操作',
										align : 'center',
										valign : 'middle',
										width : '8%',
										formatter : function(value, row, index) {
											var d = "<img src ='module/img/delete_icon.png' onclick='delTestProject(\""+row.testProjectID+"\")' title='删除' style='cursor:pointer;margin-right:8px;' />"
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
	window.location.href = "module/jsp/testProject/testProject.jsp";
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
	$('#table').bootstrapTable('refresh', null);
}

function addModal() {
	
	getDepartment("add_DEPARTMENTID"); //从数据库里获取部门信息填充
	getStandard("add_STANDARDID");	// 从数据库里获取标准信息填充
	getType("add_type");
	
	$('#addModal').modal('show');
	
}

// 判空处理
function checkNull(){
	if(arguments[0].NAMECN == ""){
		swal({title:"中文名称不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].NAMEEN == ""){
		swal({title:"英文名称不能为空",  type:"warning",});
		return true;
	}
	/*if(arguments[0].DEPARTMENTID == "" || arguments[0].DEPARTMENTID == null){
		swal({title:"所属科室不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].ENVIRONMENTALREQUIREMENTS == ""){
		swal({title:"坏境要求不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].STANDARDID == "" || arguments[0].STANDARDID == null){
		swal({title:"所属标准不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].EQUIPMENTID == ""){
		swal({title:"所需仪器不能为空",  type:"warning",});
		return true;
	}*/
	if(arguments[0].describes == ""){
		swal({title:"标准描述不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].testtype == ""){
		swal({title:"检测类别不能为空",  type:"warning",});
		return true;
	}
	return false;
}

function addTestProject() {

	var parame = {};
		
	parame.NAMECN = ($('#add_NAMECN').val());
	parame.NAMEEN = ($('#add_NAMEEN').val());
	var data = $('#add_DEPARTMENTID').val();
	if (data == null) {
		swal("检测部门不能为空");
	} else {
		var ids = "";
		for (var i = 0; i < data.length; i++) {
			ids += data[i] + ",";
		}
		parame.departmentID = ids;
	}
	
	var data = $('#add_STANDARDID').val();
	if (data == null) {
		swal("依据标准不能为空");
	} else {
		var ids = "";
		for (var i = 0; i < data.length; i++) {
			ids += data[i] + ",";
		}
		parame.standardID = ids;
	}
	parame.describes = ($('#add_DESCRIBE').val());
	parame.remarks = ($('#add_REMARKS').val());
	parame.testTypeID = ($('#add_type').val());;
	
	if(checkNull(parame))return;
	
	$.ajax({
		url : 'testProjectController/addTestProject.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				swert("新增失败");
			}
			$('#addModal').modal('hide');

			refresh();
		}

	});
}

/* 删除一个*/
function delTestProject(){
	 TestProjectIDs = arguments[0];
	 swal({
		  title: "确定要删除 ?",
	  type: "warning",
	  showCancelButton: true,
	  confirmButtonColor: "#DD6B55",
	  confirmButtonText: "确定",
	  closeOnConfirm: false
	},
	function(){
		 $.ajax({
				url: 'testProjectController/delTestProject.do',
				data:{
					TestProjectIDs : TestProjectIDs
				},
				success:function(o){
					if (o <= 0) {
						swal({title:"删除失败",type:"error"});
					} else {
						swal({title:"删除成功",type:"success"});
						refresh();
					}
				}
	      });
	});
}
/* 删除多个 */
function delData() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0) {
		swal({title:"请至少选中一条数据",  type:"warning",});
		return;
	}

	var ids = "";
	for (var i = 0; i < data.length; i++) {
		console.log(data[i].testProjectID);
		ids += data[i].testProjectID + ",";
	}
	
	var ajaxParameter = {};
	ajaxParameter.TestProjectIDs = ids.substring(0, (ids.length - 1))

	swal({
		  title: "确定要删除 ?",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "确定",
		  closeOnConfirm: false
		},
		function(){
			$.ajax({
				url : 'testProjectController/delTestProject.do',
				data : ajaxParameter,
				success : function(o) {
					if (o <= 0) {
						swal({title:"删除失败",type:"error"});
					} else {
						swal({title:"删除成功",type:"success"});
						refresh();
					}
				}
			});
		});
}

//修改方法 
function openEditModal(){
	
	var departmentID = arguments[0].departmentID;
	var departmentIDs = departmentID.split(",");

	
	getDepartment("edit_DEPARTMENTID",departmentIDs);	//从数据库里获取部门信息
//	getEquipment("edit_EQUIPMENTID");// 从数据库里获取设备信息
	
	
	var standardID = arguments[0].standardID;
	var standardIDs = standardID.split(",");
	getStandard("edit_STANDARDID",standardIDs);// 从数据库里获取标准信息
	getType("edit_type");
	
	$('#edit_testProjectID').val(arguments[0].testProjectID);
	$('#edit_testStandardID').val(arguments[0].testStandardID);
	$('#edit_testDepartmentID').val(arguments[0].testDepartmentID);
	
	$('#edit_NAMECN').val(arguments[0].NAMECN);
	$('#edit_NAMEEN').val(arguments[0].NAMEEN);
	$('#edit_type').val(arguments[0].testtypeID);
//	$('#edit_ENVIRONMENTALREQUIREMENTS').val(arguments[0].ENVIRONMENTALREQUIREMENTS);

/*	$('#edit_DEPARTMENTID').val(arguments[0].DEPARTMENTID);
	$('#edit_STANDARDID').val(arguments[0].STANDARDID);*/
	
	$('#edit_DESCRIBE').val(arguments[0].describes);
	$('#edit_REMARKS').val(arguments[0].remarks);
	
	/*var equipmentInfo = [];
	
	if(arguments[0].EQUIPMENTID == "" || arguments[0].EQUIPMENTID == null || arguments[0].EQUIPMENTID == undefined){
		$('#editModal').modal('show');
		return ;
	}
	
	var EquipmentID = arguments[0].EQUIPMENTID.split(','); 
	var EquipmentName = arguments[0].EQUIPMENTNAME.split(',');
	if(EquipmentID === undefined || EquipmentID === null || EquipmentID === "" 
		|| EquipmentName === undefined || EquipmentName === null || EquipmentName ===""){
		return;
	}
	for(var i = 0 ; i < EquipmentID.length; i++){
		var ddd = {}
		ddd.ID = EquipmentID[i];
		ddd.equipmentName = EquipmentName[i];
		equipmentInfo[i] = ddd;
	}
	fulldisplayChecked(equipmentInfo);*/
	
	$('#editModal').modal('show');
}
function fulldisplayChecked(equipmentInfo){
	// 清空
	$('#displayChecked[name = "edit"]').empty();
	for(var i = 0; i <　equipmentInfo.length; i++){
		html='<span class = "spanTag"><span class= "singleE" id ="'+equipmentInfo[i].ID+'" >'+ equipmentInfo[i].equipmentName +'&nbsp;&nbsp;</span><a  onclick="moveSingleE(this)">x</a></span>'
		$('#displayChecked[name = "edit"]').append(html);
	}
}

function editTestProject(){
	
	var parame = {};
	
	parame.testProjectID = ($('#edit_testProjectID').val());
	parame.testStandardID = ($('#edit_testStandardID').val());
	parame.testDepartmentID = ($('#edit_testDepartmentID').val());
	
	parame.NAMECN = ($('#edit_NAMECN').val());
	parame.NAMEEN = ($('#edit_NAMEEN').val());
	
	parame.DESCRIPTION = ($('#edit_DESCRIPTION').val());
	
	var data = $('#edit_DEPARTMENTID').val();
	if (data == null) {
		swal("检测部门不能为空");
		return;
	} else {
		var ids = "";
		for (var i = 0; i < data.length; i++) {
			ids += data[i] + ",";
		}
		parame.departmentID = ids;
	}
	
	var data = $('#edit_STANDARDID').val();
	if (data == null) {
		swal("依据标准不能为空");
		return;
	} else {
		var ids = "";
		for (var i = 0; i < data.length; i++) {
			ids += data[i] + ",";
		}
		parame.standardID = ids;
	}
	
	parame.describes = ($('#edit_DESCRIBE').val());
	parame.remarks = ($('#edit_REMARKS').val());
	parame.testTypeID = ($('#edit_type').val());;
	if(checkNull(parame))return;
	
	$.ajax({
		url : 'testProjectController/editTestProject.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				swal("修改失败");
			}
			$('#editModal').modal('hide');

			refresh();
		}

	});
}
// 获取部门信息
function getDepartment(id,departments) {
	$('.selectpicker').selectpicker({
		size : 4
	});
	$.ajax({
		url : 'testProjectController/getDepartment.do',
		success : function(o) {
			if($('#' + id + '').children().length == 0){
				var data = JSON.parse(o);
				for (var i = 0; i < data.length; i++) {
					$('#' + id + '').append(
							"<option value=" + data[i].ID + ">" + data[i].departmentName
									+ "</option>");
				}
				
				$('#' + id + '').selectpicker('refresh');
				$('#' + id + '').selectpicker('render');
			}
			if(departments !== null && departments !== undefined){
				
				$('#' + id + '').selectpicker('val', departments);// 默认选
				$('#' + id + '').selectpicker('refresh');
				$('#' + id + '').selectpicker('render');
			}
			
			/*if($('#' + id + '').children().length == 0 || $('#' + id + '').children().length == 1 ){
				var data = JSON.parse(o);
				
				for (var i=0; i<data.length;i++)
				{	
					$('#' + id + '').append("<option value='" + data[i].ID + "' >" +data[i].departmentName + " </option>");
				}
			}*/
			
		}

	});
}

/*//获取设备信息
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
}*/

/*// 获取设备信息
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
}*/

// 获取标准信息
function getStandard(id,standardIDs){
	$('.selectpicker').selectpicker({
		size : 4
	});
	$.ajax({
		url : 'testProjectController/getStandard.do',
		success : function(o) {
		if($('#' + id + '').children().length == 0){
			var data = JSON.parse(o);
			for (var i = 0; i < data.length; i++) {
				$('#' + id + '').append(
						"<option value=" + data[i].ID + ">" + data[i].STANDARDNAME
								+ "</option>");
			}
			
			$('#' + id + '').selectpicker('refresh');
			$('#' + id + '').selectpicker('render');
		}
		if(standardIDs !== null && standardIDs !== undefined){
			
			$('#' + id + '').selectpicker('val', standardIDs);// 默认选
			$('#' + id + '').selectpicker('refresh');
			$('#' + id + '').selectpicker('render');
		}
		
			/*if($('#' + id + '').children().length == 0)
			{
				var data = JSON.parse(o);
				
				if(data.length === 0){
					sweetAlert("没有找到数据", "没有通过的标准或者没有标准数据", "error");
				}
				
				for (var i=0; i<data.length;i++)
				{
					$('#' + id + '').append("<option value='" + data[i].ID + "' >" +data[i].STANDARDNAME + " </option>");
				}
			}*/
		}

	});
}

/**
 * 获取填充检测类别
 * 
 */
function getType(id){
	$.ajax({
		url : 'testProjectController/getTestType.do',
		success : function(o) {
			if($('#' + id + '').children().length == 0)
			{
				var data = JSON.parse(o);
				
				for (var i=0; i<data.length;i++)
				{
					$('#' + id + '').append("<option value='" + data[i].ID + "' >" +data[i].name + " </option>");
				}
			}
		}
	}); 
}

/*// 填充设备数据
function fullEquipments(equipmentDate){
	
	var html = "<ul>";
	if(equipmentDate.length == 0){
		html += "<li class='noDate'>没有查到数据</li>"
	}
	else{
		for(var i = 0; i < equipmentDate.length; i++){
			html+="<li  id ='"+equipmentDate[i].ID+"' onclick='displayChecked(this)'>" + equipmentDate[i].equipmentName+ "</li>"
		}
	}
	html +="</ul>";
	if($("#editModal").is(":visible")){
		$('.showEquipments[name = "edit"]').html(html);
		$('.showEquipments[name = "edit"]').show();
	}
	if($("#addModal").is(":visible")){
		$('.showEquipments[name = "add"]').html(html);
		$('.showEquipments[name = "add"]').show();
	}
}

// 获得焦点展示部分设备
function showPartEquipment(date){
	fullEquipments(getTestLisk());
}
//搜索展示部分设备
function searchEquipment(type){
	fullEquipments(matchEquipment(type));
}
function hideSearch(type){
	setTimeout(function(){
		$('.showEquipments[name = "'+type+'"]').hide();
	},500); 
}
//删除点中的设备
function moveSingleE(SingleEInfo){
	console.log(SingleEInfo);
	$(SingleEInfo).parent().remove();
}
// 展示被选中的设备
function displayChecked(equipmentInfo){

	if(isSameID(equipmentInfo.id)){
		html='<span class = "spanTag"><span class= "singleE" id ="'+equipmentInfo.id+'" >'+ equipmentInfo.innerHTML +'&nbsp;&nbsp;</span><a  onclick="moveSingleE(this)">x</a></span>'
		if($("#editModal").is(":visible")){
			$('#displayChecked[name = "edit"]').append(html);
			$('.showEquipments[name = "edit"]').hide();
		}
		if($("#addModal").is(":visible")){
			$('#displayChecked[name = "add"]').append(html);
			$('.showEquipments[name = "add"]').hide();
		}
	}
	else{
		swal("请不要重复选中同一设备");
	}
}
//获取所有被选中仪器的id
function getEquipmentsID(){
	var total = ""
	if($("#editModal").is(":visible")){
		var allEquipmentIDs =$('#displayChecked[name= "edit"] span.singleE');
	}
	if($("#addModal").is(":visible")){
		var allEquipmentIDs =$('#displayChecked[name= "add"] span.singleE');
	}
	if(allEquipmentIDs.length == 0){
		swal("请至少选中一个仪器设备");
		return;
	}
	else{
		for(var i=0;i<allEquipmentIDs.length;i++){
			total += allEquipmentIDs[i].id+" , ";
		}
		return total;
	}
}
//检测是否有重复的ID设备
function isSameID(checkID){
	if($("#editModal").is(":visible")){
		var allEquipmentIDs =$('#displayChecked[name= "edit"] span.singleE');
	}
	if($("#addModal").is(":visible")){
		var allEquipmentIDs =$('#displayChecked[name= "add"] span.singleE');
	}
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

// 匹配设备名称 返回数据
function matchEquipment(type){
//	$('.showEquipments[name = "add"]').css("display","block");
	var matchName = $('#'+type+'searchEquipments').val();
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
		console.log("请重新输入");
	}
	return date;
	
}*/