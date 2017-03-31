// 请求数据时的额外参数
var param = {};

$(function() {
	searchSth();
	initData();
});

//初始化数据
function initData(){
	$("#table").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 3,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 3,5,10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'factoryCode',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'equipmentVerifyController/getEquipmentVerifyWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.factoryCode = $.trim($('#schFactoryCode').val());
			param.equipmentName = $.trim($('#schEquipmentName').val());
			param.employeeName = $.trim($('#schEmployeeName').val());
			param.departmentName = $.trim($('#schDepartment').val());
			return param;
		}, //参数
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :'3%',// 宽度
			formatter : function(value, row, index) {
				checkData(row);	 //验证数据合理性					
			}
		},{
			field:'ID',//返回值名称
			title:'仪器设备检验记录ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'equipmentID',//返回值名称
			title:'仪器设备ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'factoryCode',//返回值名称
			title:'设备出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
//			visible:false
		},{
			field:'equipmentName',//返回值名称
			title:'设备名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'testProjectID',//返回值名称
			title:'检测项目ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'nameCn',//返回值名称
			title:'检验项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'accuracy',//返回值名称
			title:'精度',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'departmentID',//返回值名称
			title:'检验部门ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'departmentName',//返回值名称
			title:'检验部门',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'employeeID',//返回值名称
			title:'检验员工ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'检验员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'result',//返回值名称
			title:'检验结果',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	showSth();
	editSth();
}

//检查仪器检验数据是否合理并处理
function checkData(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null || dataObj.ID == undefined || dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("equipmentID") || dataObj.equipmentID == null || dataObj.equipmentID == undefined || dataObj.equipmentID.trim() == "") {
		dataObj.equipmentID = "";
	}
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null || dataObj.factoryCode == undefined || dataObj.factoryCode.trim() == "") {
		  dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("equipmentName") || dataObj.equipmentName == null || dataObj.equipmentName == undefined || dataObj.equipmentName.trim() == "") {
		dataObj.equipmentName = "";
	}
	if (!dataObj.hasOwnProperty("testProjectID") || dataObj.testProjectID == null || dataObj.testProjectID == undefined || dataObj.testProjectID.trim() == "") {
		dataObj.testProjectID = "";
	}
	if (!dataObj.hasOwnProperty("nameCn") || dataObj.nameCn == null || dataObj.nameCn == undefined || dataObj.nameCn.trim() == "") {
		dataObj.nameCn = "";
	}
	if (!dataObj.hasOwnProperty("departmentID") || dataObj.departmentID == null || dataObj.departmentID == undefined || dataObj.departmentID.trim() == "") {
		dataObj.departmentID = "";
	}
	if (!dataObj.hasOwnProperty("departmentName") || dataObj.departmentName == null || dataObj.departmentName == undefined  || dataObj.departmentName.trim() == "") {
		dataObj.departmentName = "";
	}
	if (!dataObj.hasOwnProperty("accuracy") || dataObj.accuracy == null || dataObj.accuracy == undefined || dataObj.accuracy.trim() == "") {
		dataObj.accuracy = "";
	}
	if (!dataObj.hasOwnProperty("result") || dataObj.result == null || dataObj.result == undefined || dataObj.result.trim() == "") {
		dataObj.result = "";
	}
	if (!dataObj.hasOwnProperty("employeeID") || dataObj.employeeID == null || dataObj.employeeID == undefined || dataObj.employeeID.trim() == "") {
		dataObj.employeeID = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null || dataObj.employeeName == undefined || dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null || dataObj.remarks == undefined || dataObj.remarks.trim() == "") {
		dataObj.remarks = "";
	}
}

/*//请求数据时的额外参数
function queryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'factoryCode',
		order : 'asc',
		equipmentName : $.trim($('#schEquipmentName').val()),
		departmentName : $.trim($('#schDepartment').val()),
		employeeName : $.trim($('#schEmployeeName').val()),
	};
    return searchCondition;
}*/

/**
 * 搜索方法
 */
function search(){
	initData();
	$('#table').bootstrapTable('refresh', null);
}

/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/equipmentManage/equipmentVerifyManage.jsp";
}

/* 删除方法 */
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0){
		swal("请至少选中一条数据");
		return;
	}
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += "ID = '" + data[i].ID + "' or ";
	}
	swal(ids.substring(0, (ids.length-3)));
	var ajaxParameter = {
			equipmentVerifyids:ids.substring(0, (ids.length-3))	
	};
	
	$.ajax({
	  url:'equipmentVerifyController/delEquipmentVerify.do',
	  type:"post",
	  data:ajaxParameter,
	  success:function(o){
		  if(o<=0){
			  swal("删除失败");
		  }
		  refresh();
	  }
	});
}

/**
 * 搜索时得到相关信息方法
 */
function searchSth(){ 
	 $.ajax({  
	     url:'departmentController/getDepartmentName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var department;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "<option value='0'>所有科室</option>";//定义HTML    
	    		 department=$("#schDepartment");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department.append(htmlElement);
 		    }
		}
	 });
}

/**
 * 改变信息触发相关提示信息的方法(add)
 */
function addGetEQName(){ 
	var name = $('#add_equipmentName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".equipmentName").hide();
	}else {
		var parame = {};
		parame.equipmentName = name;
		
		$.ajax({  
		    url:'equipmentController/getEquipmentByName.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var equipment,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		equipment = $(".equipmentName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].equipmentName + "' class='" + myobj[i].ID + "' title='" + myobj[i].factoryCode + "'>" + myobj[i].equipmentName + " | " + myobj[i].factoryCode + "</li></ul>";
		    		}
		    		 
		    		equipment.show();
		    		equipment.empty();
		    		equipment.append(htmlElement);
		    		addClick();
		    	}
		    }
		});
	}
}

/**
 * 改变信息触发相关提示信息的方法(add)
 * addGetTPName
 */
function addGetTPName(){ 
	var name = $('#add_testProjectName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".testProjectName").hide();
	}else {
		var parame = {};
		parame.testProjectName = name;
		
		$.ajax({  
		    url:'testProjectController/getTestProjectByName.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var testProject,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		testProject = $(".testProjectName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].nameCn + "' class='" + myobj[i].ID + "'>" + myobj[i].nameCn + " | " + myobj[i].nameEn + "</li></ul>";
		    		}
		    		 
		    		testProject.show();
		    		testProject.empty();
		    		testProject.append(htmlElement);
		    		addClick();
		    	}
		    }
		});
	}
}

/**
 * 改变信息触发相关提示信息的方法(add)
 */
function addGetEMName(){
	var name = $('#add_employeeName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{
		$(".employeeN").hide();
	}else {
		var parame = {};
		parame.employeeName = name;
		
		$.ajax({  
		    url:'employeeController/getEmployeeName.do',// 跳转到 action  
		    type:'post',
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var employee,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML    
		    		employee = $(".employeeN");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].employeeName + "' class='" + myobj[i].ID + "'>" + myobj[i].employeeName + "</li></ul>";
		    		}
		    		
		    		employee.show();
		    		employee.empty();
		    		employee.append(htmlElement);
		    		addClick();
			    }
			}
		});
	}
}

//点击事件(add)
function addClick(){ 
	//给input赋值
	$(".equipmentName ul li").click(function(){
		 var name = $(this).attr("value");
		 $("#add_equipmentName").val(name);
		 var ID =  $(this).attr("class");
		 var code =  $(this).attr("title");
		 $('#add_equipmentName').attr({'name' : "" + ID + ""});
		 $('#add_factoryCode').attr({'value' : "" + code + ""});
		 $('#add_factoryCode').attr("disabled",true);
		 $('#add_equipmentName').attr({'value' : "" + name + ""});
		 $(".equipmentName").hide();
	})
	
	//隐藏提示框
	$("#addContent").click(function(){
		 $(".equipmentName").hide();
	})
	
	//给input赋值
	$(".testProjectName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#add_testProjectName").val(name);
		 var ID =  $(this).attr("class");
		 $('#add_testProjectName').attr({'name' : "" + ID + ""});
		 $('#add_testProjectName').attr({'value' : "" + name + ""});
		 $(".testProjectName").hide();
	})

	//隐藏提示框
	$("#addContent").click(function(){
		 $(".testProjectName").hide();
	})
	
	//给input赋值
	$(".employeeN ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#add_employeeName").val(name);
		 var ID =  $(this).attr("class");
		 $('#add_employeeName').attr({'name' : "" + ID + ""});
		 $('#add_employeeName').attr({'value' : "" + name + ""});
		 $(".employeeN").hide();
	})

	//隐藏提示框
	$("#addContent").click(function(){
		 $(".employeeN").hide();
	})
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 * editGetTPName
 */
function editGetEQName(){ 
	var name = $('#edit_equipmentName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".equipmentName").hide();
	}else {
		var parame = {};
		parame.equipmentName = name;
		
		$.ajax({  
		    url:'equipmentController/getEquipmentByName.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var equipment,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		equipment = $(".equipmentName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].equipmentName + "' class='" + myobj[i].ID + "' title='" + myobj[i].factoryCode + "'>" + myobj[i].equipmentName + " | " + myobj[i].factoryCode + "</li></ul>";
		    		}
		    		 
		    		equipment.show();
		    		equipment.empty();
		    		equipment.append(htmlElement);
		    		editClick();
		    	}
		    }
		});
	}
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 * editGetTPName
 */
function editGetTPName(){ 
	var name = $('#edit_testProjectName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".testProjectName").hide();
	}else {
		var parame = {};
		parame.testProjectName = name;
		
		$.ajax({  
		    url:'testProjectController/getTestProjectByName.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var testProject,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		testProject = $(".testProjectName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].nameCn + "' class='" + myobj[i].ID + "'>" + myobj[i].nameCn + " | " + myobj[i].nameEn + "</li></ul>";
		    		}
		    		 
		    		testProject.show();
		    		testProject.empty();
		    		testProject.append(htmlElement);
		    		editClick();
		    	}
		    }
		});
	}
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editGetEMName(){
	var name = $('#edit_employeeName').val();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{
		$(".employeeN").hide();
	}else {
		var parame = {};
		parame.employeeName = name;
		
		$.ajax({  
		    url:'employeeController/getEmployeeName.do',// 跳转到 action  
		    type:'post',
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var employee,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML    
		    		employee = $(".employeeN");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].employeeName + "' class='" + myobj[i].ID + "'>" + myobj[i].employeeName + "</li></ul>";
		    		}
		    		
		    		employee.show();
		    		employee.empty();
		    		employee.append(htmlElement);
		    		editClick();
			    }
			}
		});
	}
}

//点击事件(edit)
function editClick(){ 
	//给input赋值
	$(".equipmentName ul li").click(function(){
		 var name = $(this).attr("value");
		 $("#edit_equipmentName").val(name);
		 var ID =  $(this).attr("class");
		 var code =  $(this).attr("title");
		 $('#edit_equipmentName').attr({'name' : "" + ID + ""});
		 $('#edit_factoryCode').attr({'value' : "" + code + ""});
		 $('#add_factoryCode').attr("disabled",true);
		 $('#edit_equipmentName').attr({'value' : "" + name + ""});
		 $(".equipmentName").hide();
	})
	
	//隐藏提示框
	$("#editContent").click(function(){
		 $(".equipmentName").hide();
	})
	
	//给input赋值
	$(".testProjectName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_testProjectName").val(name);
		 var ID =  $(this).attr("class");
		 $('#edit_testProjectName').attr({'name' : "" + ID + ""});
		 $('#edit_testProjectName').attr({'value' : "" + name + ""});
		 $(".testProjectName").hide();
	})

	//隐藏提示框
	$("#editContent").click(function(){
		 $(".testProjectName").hide();
	})
	
	//给input赋值
	$(".employeeN ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_employeeName").val(name);
		 var ID =  $(this).attr("class");
		 $('#edit_employeeName').attr({'name' : "" + ID + ""});
		 $('#edit_employeeName').attr({'value' : "" + name + ""});
		 $(".employeeN").hide();
	})

	//隐藏提示框
	$("#editContent").click(function(){
		 $(".employeeN").hide();
	})
}



/* 新增方法 */
function add(){
	
	var parame = {};
	var factoryCode = $('#add_factoryCode').val();
	var equipmentName = $('#add_equipmentName').val();
	var equipmentID = $('#add_equipmentName').attr("name");
	var testProjectID = $('#add_testProjectName').attr("name");
	var testProjectName = $('#add_testProjectName').val();
	var accuracy = $('#add_accuracy').val();
	var departmentID = $('#add_departmentName').val();
	var employeeID = $('#add_employeeName').attr("name");
	var employeeName = $('#add_employeeName').val();
	var result = $('#add_result').val();
	var remarks = $('#add_remarks').val();
		
	if (!factoryCode || typeof(factoryCode) == "undefined" || factoryCode.trim() == "") 
	{ 
		swal("仪器设备编号不能为空！"); 
		return;
	}
	if (!equipmentName || typeof(equipmentName) == "undefined" || equipmentName.trim() == "") 
	{ 
		swal("仪器设备名称不能为空！");
		return;
	}
	if (!testProjectName || typeof(testProjectName) == "undefined" || testProjectName.trim() == "") 
	{ 
		swal("检测项目不能为空！");
		return;
	}
	if (!accuracy || typeof(accuracy) == "undefined" || accuracy.trim() == "") 
	{ 
		swal("检测精度不能为空！");
		return;
	}
	if (!departmentID || typeof(departmentID) == "undefined" || departmentID.trim() == "") 
	{ 
		swal("检测部门不能为空！");
		return;
	}
	if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
	{ 
		swal("检测员不能为空！");
		return;
	}
	if (!result || typeof(result) == "undefined" || result.trim() == "") 
	{ 
		swal("检验结果不能为空！"); 
		return;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
		remarks = "";
	}
	
	parame.equipmentID = equipmentID;
	parame.testProjectID = testProjectID;
	parame.accuracy = accuracy;
	parame.departmentID = departmentID;
	parame.verifyID = employeeID;
	parame.result = result;
	parame.remarks = remarks;
		
	$.ajax({
		url:'equipmentVerifyController/addEquipmentVerify.do',
		data:parame,
		success:function(o){
			if(o<=0){
				swal("新增失败");
			}
			$('#addModal').modal('hide');
			refresh();
		}
	});
}

/**
 * 新增时得到相关信息方法
 */
function showSth(){ 
	 $.ajax({  
	     url:'departmentController/getDepartmentName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var department;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "";//定义HTML    
	    		 department=$("#add_departmentName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department.append(htmlElement);
 		    }
		}
	 });
}

/**
 * 修改时得到相关信息方法
 */
function editSth(){ 
	 $.ajax({  
	     url:'departmentController/getDepartmentName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var department;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "";//定义HTML    
	    		 department=$("#edit_departmentName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department.append(htmlElement);
 		    }
		}
	 });
}

 //弹出修改弹框方法 
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	$('#edit_factoryCode').val(data[0].factoryCode);
	
	$('#edit_equipmentName').attr({'name' : "" + data[0].equipmentID + ""});
	$('#edit_equipmentName').attr({'value' : "" + data[0].equipmentName + ""});
	
	
	
	var accuracy = data[0].accuracy;
	switch (accuracy) {
	case "低": $('#edit_accuracy').val("0");break;
	case "中": $('#edit_accuracy').val("1");break;
	case "高": $('#edit_accuracy').val("2");break;
	default:
		break;
	}
	
	$('#edit_departmentName').val(data[0].departmentID);
	
	$('#edit_testProjectName').attr({'name' : "" + data[0].testProjectID + ""});
	$('#edit_testProjectName').attr({'value' : "" + data[0].nameCn + ""});
	
	$('#edit_employeeName').attr({'name' : "" + data[0].verifyID + ""});
	$('#edit_employeeName').attr({'value' : "" + data[0].employeeName + ""});
	
	var result = data[0].result;
	switch (result) {
	case "不合格": $('#edit_result').val("0");break;
	case "合格": $('#edit_result').val("1");break;
	default:
		break;
	}
	
	$('#edit_remarks').val(data[0].remarks);
	
	$('#editModal').modal('show');
}

 //修改方法 
function edit(){
	var data = $('#table').bootstrapTable('getSelections');
	var ID = data[0].ID; 
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("仪器设备检验记录ID不能为空！"); 
	}else {
		var parame = {};
		var factoryCode = $('#edit_factoryCode').val();
		var equipmentName = $('#edit_equipmentName').val();
		var equipmentID = $('#edit_equipmentName').attr("name");
		var testProjectID = $('#edit_testProjectName').attr("name");
		var testProjectName = $('#edit_testProjectName').val();
		var accuracy = $('#edit_accuracy').val();
		var departmentID = $('#edit_departmentName').val();
		var employeeID = $('#edit_employeeName').attr("name");
		var employeeName = $('#edit_employeeName').val();
		var result = $('#edit_result').val();
		var remarks = $('#edit_remarks').val();
		
		if (!factoryCode || typeof(factoryCode) == "undefined" || factoryCode.trim() == "") 
		{ 
			swal("仪器设备出厂编号不能为空！"); 
			return;
		}
		if (!equipmentName || typeof(equipmentName) == "undefined" || equipmentName.trim() == "") 
		{ 
			swal("仪器设备名称不能为空！");
			return;
		}
		if (!testProjectName || typeof(testProjectName) == "undefined" || testProjectName.trim() == "") 
		{ 
			swal("检测项目不能为空！");
			return;
		}
		if (!accuracy || typeof(accuracy) == "undefined" || accuracy.trim() == "") 
		{ 
			swal("检测精度不能为空！");
			return;
		}
		if (!departmentID || typeof(departmentID) == "undefined" || departmentID.trim() == "") 
		{ 
			swal("检测部门不能为空！");
			return;
		}if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
		{ 
			swal("检测员不能为空！");
			return;
		}if (!result || typeof(result) == "undefined" || result.trim() == "") 
		{ 
			swal("检验结果不能为空！"); 
			return;
		}
		if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
		{ 
			remarks = "";
		}
		
		parame.ID = ID;
		parame.equipmentID = equipmentID;
		parame.testProjectID = testProjectID;
		parame.accuracy = accuracy;
		parame.departmentID = departmentID;
		parame.verifyID = employeeID;
		parame.result = result;
		parame.remarks = remarks;
		
		$.ajax({
		  url:'equipmentVerifyController/updEquipmentVerify.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  swal("新增失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  }
		});
	}
}