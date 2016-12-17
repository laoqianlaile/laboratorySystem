
$(function() {
	initData();
});

//初始化数据
function initData(){
	$("#table").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
	//	pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5,10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
	//	sortName : 'ID',// 定义排序列
	//	sortOrder : 'asc',// 定义排序方式
		url:'equipmentController/getEquipmentWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: queryParams, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			width :5// 宽度
		},{
			field:'ID',//返回值名称
			title:'设备ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'equipmentCode',//返回值名称
			title:'设备编号',//列名
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
			field:'name',//返回值名称
			title:'设备类型',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'model',//返回值名称
			title:'型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'departmentName',//返回值名称
			title:'所属科室',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'buyTime',//返回值名称
			title:'购入时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'useYear',//返回值名称
			title:'使用年限(年)',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'factoryCode',//返回值名称
			title:'出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'credentials',//返回值名称
			title:'证书编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'effectiveTime',//返回值名称
			title:'有效期',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'employeeName',//返回值名称
			title:'经办人',//列名
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

//请求数据时的额外参数
function queryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'equipmentCode',
		order : 'asc',
		equipmentType : $.trim($('#schEquipmentType').val()),
		equipmentName : $.trim($('#schEquipmentName').val()),
		departmentName : $.trim($('#schDepartment').val()),
		buyTime : $.trim($('#schBuyTime').val()),
	};
    return searchCondition;
}

/**
 * 搜索方法
 */
function searchEquipment(){
	initData();
	refresh();
}

/* 刷新方法 */
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

/* 删除方法 */
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0){
		alert("请至少选中一条数据");
		return;
	}
	var Codes = "";
	for(var i=0; i<data.length; i++){
		Codes += "equipmentCode= '" + data[i].equipmentCode + "' or ";
	}
	alert(Codes.substring(0, (Codes.length-3)));
	var ajaxParameter = {
			equipmentCodes:Codes.substring(0, (Codes.length-3))	
	};
	
	$.ajax({
	  url:'equipmentController/delEquipment.do',
	  type:"post",
	  data:ajaxParameter,
	  success:function(o){
		  if(o<=0){
			  alert("删除失败");
		  }
		  refresh();
	  }
	});
}

/* 新增方法 */
function add(){
	alert("add");
	var name = $('#add_equipmentCode').val(); 
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		alert("仪器设备名称不能为空！"); 
	}else {
		var parame = {};
		var equipmentCode = $('#add_equipmentCode').val();
		var equipmentName = $('#add_equipmentName').val();
		var department = $('#add_departmentName').val();
		var equipmentType = $('#add_equipmentTypeName').val();
		var model = $('#add_model').val();
		var buyTime = $('#add_buyTime').val();
		var useYear = $('#add_useYear').val();
		var factoryCode = $('#add_factoryCode').val();
		var credentials = $('#add_credentials').val();
		var effectiveTime = $('#add_effectiveTime').val();
		var remarks = $('#add_remarks').val();
		
		if (!equipmentCode && typeof(equipmentCode)!="undefined" && equipmentCode=='') 
		{ 
			alert("仪器设备编号不能为空！"); 
			return;
		}
		if (!equipmentName && typeof(equipmentName)!="undefined" && equipmentName=='') 
		{ 
			alert("仪器设备名称不能为空！");
			return;
		}
		if (!department && typeof(department)!="undefined" && department=='') 
		{ 
			alert("仪器设备所属部门不能为空！");
			return;
		}
		if (!equipmentType && typeof(equipmentType)!="undefined" && equipmentType=='') 
		{ 
			alert("仪器设备类型不能为空！");
			return;
		}
		if (!model && typeof(model)!="undefined" && model=='') 
		{ 
			alert("仪器设备型号不能为空！");
			return;
		}if (!buyTime && typeof(buyTime)!="undefined" && buyTime=='') 
		{ 
			alert("仪器设备购买时间不能为空！");
			return;
		}
		if (!useYear && typeof(useYear)!="undefined" && useYear=='') 
		{ 
			alert("仪器设备使用年限不能为空！");
			return;
		}if (!factoryCode && typeof(factoryCode)!="undefined" && factoryCode=='') 
		{ 
			alert("出厂编号不能为空！"); 
			return;
		}
		if (!credentials && typeof(credentials)!="undefined" && credentials=='') 
		{ 
			alert("证书编号不能为空！");
			return;
		}
		if (!effectiveTime && typeof(effectiveTime)!="undefined" && effectiveTime=='') 
		{ 
			alert("有效期不能为空！");
			return;
		}
		if (!remarks && typeof(remarks)!="undefined" && remarks=='') 
		{ 
			alert("备注为空！");
			remarks = "";
		}
		
		parame.equipmentCode = equipmentCode;
		parame.equipmentName = equipmentName;
		parame.department = department;
		parame.equipmentType = equipmentType;
		parame.model = model;
		parame.buyTime = buyTime;
		parame.useYear = useYear;
		parame.factoryCode = factoryCode;
		parame.credentials = credentials;
		parame.effectiveTime = effectiveTime;
		parame.employeeID = "1";
		parame.remarks = remarks;
		
		$.ajax({
		  url:'equipmentController/addEquipment.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("新增失败");
			  }
			  $('#addModal').modal('hide');
			  refresh();
		  }
		});
	}
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
	    		 var htmlElement = "<option></option>";//定义HTML    
	    		 department=$("#add_departmentName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department.append(htmlElement);
 		    }
		}
	 });
	 $.ajax({  
	     url:'equipmentTypeController/getEquipmentTypeName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var equipmentType;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "<option></option>";//定义HTML    
	    		 equipmentType=$("#add_equipmentTypeName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].name + "</option>";
	    		 }
	    		 equipmentType.append(htmlElement);
 		    }
		}
	 });
}

/**
 * 新增时得到相关信息方法
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
	    		 var htmlElement = "<option class='depart'></option>";//定义HTML    
	    		 department=$("#edit_departmentName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department.append(htmlElement);
 		    }
		}
	 });
	 $.ajax({  
	     url:'equipmentTypeController/getEquipmentTypeName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var equipmentType;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "<option class='equip'></option>";//定义HTML    
	    		 equipmentType=$("#edit_equipmentTypeName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].name + "</option>";
	    		 }
	    		 equipmentType.append(htmlElement);
 		    }
		}
	 });
}

 //弹出修改弹框方法 
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	$('#edit_equipmentCode').val(data[0].equipmentCode);
	$('#edit_equipmentName').val(data[0].equipmentName);
	
	var depart = data[0].departmentName;
	switch (depart) {
	case "物理实验室": $('#edit_departmentName .depart').text(data[0].departmentName);
					$('#edit_departmentName .depart').val("1");break;
	case "化学实验室": $('#edit_departmentName .depart').text(data[0].departmentName);
					$('#edit_departmentName .depart').val("2");break;
	case "光学实验室": $('#edit_departmentName .depart').text(data[0].departmentName);
					$('#edit_departmentName .depart').val("3");break;
	default:
		break;
	}
	
	var equip = data[0].name;
	switch (equip) {
	case "A类检测/校准设备": $('#edit_equipmentTypeName .equip').text(data[0].name);
					$('#edit_equipmentTypeName .equip').val("1");break;
	case "B类检测/校准设备": $('#edit_equipmentTypeName .equip').text(data[0].name);
					$('#edit_equipmentTypeName .equip').val("2");break;
	case "C类检测/校准设备": $('#edit_equipmentTypeName .equip').text(data[0].name);
					$('#edit_equipmentTypeName .equip').val("3");break;
	default:
		break;
	}
	$('#edit_model').val(data[0].model);
	$('#edit_buyTime').val(data[0].buyTime);
	$('#edit_useYear').val(data[0].useYear);
	$('#edit_factoryCode').val(data[0].factoryCode);
	$('#edit_credentials').val(data[0].credentials);
	$('#edit_effectiveTime').val(data[0].effectiveTime);
	$('#edit_remarks').val(data[0].remarks);
	
	$('#editModal').modal('show');
}

 //修改方法 
function edit(){
	alert("edit");
	var data = $('#table').bootstrapTable('getSelections');
	var code = $('#edit_equipmentCode').val(); 
	if (!code && typeof(code)!="undefined" && code=='') 
	{ 
		alert("仪器设备编号不能为空！"); 
	}else {
		var parame = {};
		var equipmentCode = $('#edit_equipmentCode').val();
		var equipmentName = $('#edit_equipmentName').val();
		var department = $('#edit_departmentName').val();
		var equipmentType = $('#edit_equipmentTypeName').val();
		var model = $('#edit_model').val();
		var buyTime = $('#edit_buyTime').val();
		var useYear = $('#edit_useYear').val();
		var factoryCode = $('#edit_factoryCode').val();
		var credentials = $('#edit_credentials').val();
		var effectiveTime = $('#edit_effectiveTime').val();
		var remarks = $('#edit_remarks').val();
		
		if (!equipmentCode && typeof(equipmentCode)!="undefined" && equipmentCode=='') 
		{ 
			alert("仪器设备编号不能为空！"); 
			return;
		}
		if (!equipmentName && typeof(equipmentName)!="undefined" && equipmentName=='') 
		{ 
			alert("仪器设备名称不能为空！");
			return;
		}
		if (!department && typeof(department)!="undefined" && department=='') 
		{ 
			alert("仪器设备所属部门不能为空！");
			return;
		}
		if (!equipmentType && typeof(equipmentType)!="undefined" && equipmentType=='') 
		{ 
			alert("仪器设备类型不能为空！");
			return;
		}
		if (!model && typeof(model)!="undefined" && model=='') 
		{ 
			alert("仪器设备型号不能为空！");
			return;
		}if (!buyTime && typeof(buyTime)!="undefined" && buyTime=='') 
		{ 
			alert("仪器设备购买时间不能为空！");
			return;
		}
		if (!useYear && typeof(useYear)!="undefined" && useYear=='') 
		{ 
			alert("仪器设备使用年限不能为空！");
			return;
		}if (!factoryCode && typeof(factoryCode)!="undefined" && factoryCode=='') 
		{ 
			alert("出厂编号不能为空！"); 
			return;
		}
		if (!credentials && typeof(credentials)!="undefined" && credentials=='') 
		{ 
			alert("证书编号不能为空！");
			return;
		}
		if (!effectiveTime && typeof(effectiveTime)!="undefined" && effectiveTime=='') 
		{ 
			alert("有效期不能为空！");
			return;
		}
		if (!remarks && typeof(remarks)!="undefined" && remarks=='') 
		{ 
			alert("备注为空！");
			remarks = "";
		}
		
		parame.ID = data[0].ID;
		alert(data[0].ID);
		parame.equipmentCode = equipmentCode;
		parame.equipmentName = equipmentName;
		parame.department = department;
		parame.equipmentType = equipmentType;
		parame.model = model;
		parame.buyTime = buyTime;
		parame.useYear = useYear;
		parame.factoryCode = factoryCode;
		parame.credentials = credentials;
		parame.effectiveTime = effectiveTime;
		parame.employeeID = "1";
		parame.remarks = remarks;
		
		$.ajax({
		  url:'equipmentController/updEquipment.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("新增失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  }
		});
	}
}