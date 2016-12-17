
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
		url:'equipmentScrapController/getEquipmentScrapWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: queryParams, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			width :'3%'// 宽度
		},{
			field:'ID',//返回值名称
			title:'仪器设备报废记录ID',//列名
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
			field:'equipmentCode',//返回值名称
			title:'设备编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'17%',//宽度
//			visible:false
		},{
			field:'equipmentName',//返回值名称
			title:'设备名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		},{
			field:'model',//返回值名称
			title:'设备型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'6%',//宽度
		},{
			field:'departmentID',//返回值名称
			title:'所属科室ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'departmentName',//返回值名称
			title:'所属科室',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%'//宽度
		},{
			field:'buyTime',//返回值名称
			title:'购入时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%'//宽度
		},{
			field:'checkinTime',//返回值名称
			title:'设备报废登记时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%'//宽度
		},{
			field:'useTime',//返回值名称
			title:'使用总时长',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'employeeID',//返回值名称
			title:'批准人ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'批准人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%'//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	//editSth();
	//showSth();
}

//请求数据时的额外参数
function queryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'equipmentCode',
		order : 'asc',
		model : $.trim($('#schModel').val()),
		equipmentName : $.trim($('#schEquipmentName').val()),
		departmentID : $.trim($('#schDepartment').val()),
	};
    return searchCondition;
}

/**
 * 搜索方法
 */
function search(){
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
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += "ID = '" + data[i].ID + "' or ";
	}
	alert(ids.substring(0, (ids.length-3)));
	var ajaxParameter = {
			equipmentScrapIds:ids.substring(0, (ids.length-3))	
	};
	
	$.ajax({
	  url:'equipmentScrapController/delEquipmentScrap.do',
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

/**
 * 改变信息触发相关提示信息的方法(add)
 * editGetTPName
 */
function addGetEQName(){ 
	var name = $('#add_equipmentName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
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
		    			htmlElement += "<ul><li value='" + myobj[i].equipmentName + "' class='" + myobj[i].ID + "'>" + myobj[i].equipmentName + myobj[i].equipmentCode + "</li></ul>";
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
 */
function addGetEMName(){
	var name = $('#add_employeeName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
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

/**
 * 填充设备信息的方法(add)
 * 
 */
function addFillEQName(){ 
	var ID = $('#add_equipmentName').attr("name");
	
	var parame = {};
	parame.ID = ID;
		
	$.ajax({  
		url:'equipmentController/getEquipmentById.do',// 跳转到 action
		type:'post', 
		data:parame,
		dataType:'json',
		success:function(data){  
			if (data) { 
				var myobj = JSON.parse(data);
				$("#add_equipmentCode").val(myobj[0].equipmentCode);
				$("#add_buyTime").val(myobj[0].buyTime);
		    }
		}
	});	
}

function addGetUseTime(){
	var buyTime = $('#add_buyTime').val();
	var checkinTime = $('#add_checkinTime').val();
	if (!buyTime && typeof(buyTime)!="undefined" && buyTime=='') 
	{ 
		alert("设备购入时间不能为空！");
		return;
	}
	if (!checkinTime && typeof(checkinTime)!="undefined" && checkinTime=='') 
	{ 
		alert("设备报销登记时间不能为空！");
		return;
	}
	var time = {};
	time.startTime = buyTime;
	time.endTime = checkinTime;
	time.format = "yyyy.MM.dd";
	time.str = "h";
	$.ajax({
		url:'equipmentController/dateDiff.do',
		data:time,
		success:function(hour){
			
			$('#add_remarks').attr({'name' : "" + hour + ""});
			tie = $('#add_remarks').attr("name");
			alert("2:"+tie);
			add();
		}
	});
}

//点击事件(add)
function addClick(){ 
	//给input赋值
	$(".equipmentName ul li").click(function(){
		 var name = $(this).attr("value");
		 $("#add_equipmentName").val(name);
		 var ID =  $(this).attr("class");
		 $('#add_equipmentName').attr({'name' : "" + ID + ""});
		 $('#add_equipmentName').attr({'value' : "" + name + ""});
		 addFillEQName();
		 $(".equipmentName").hide();
	})
	
	//隐藏提示框
	$("#addContent").click(function(){
		 $(".equipmentName").hide();
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
	if (!name && typeof(name)!="undefined" && name=='') 
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
		    			htmlElement += "<ul><li value='" + myobj[i].equipmentName + "' class='" + myobj[i].ID + "' title='" + myobj[i].equipmentCode + "'>" + myobj[i].equipmentName + "</li></ul>";
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
 */
function editGetEMName(){
	var name = $('#edit_employeeName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
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

/**
 * 改变信息触发相关提示信息的方法(add)
 */
function addGetEMName(){
	var name = $('#add_employeeName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
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

/**
 * 填充设备信息的方法(edit)
 * 
 */
function editFillEQName(){ 
	var ID = $('#edit_equipmentName').attr("name");
	
	var parame = {};
	parame.ID = ID;
		
	$.ajax({  
		url:'equipmentController/getEquipmentById.do',// 跳转到 action
		type:'post', 
		data:parame,
		dataType:'json',
		success:function(data){  
			if (data) { 
				var myobj = JSON.parse(data);
				$("#edit_equipmentCode").val(myobj[0].equipmentCode);
				$("#edit_buyTime").val(myobj[0].buyTime);
		    }
		}
	});	
}

function editGetUseTime(){
	var buyTime = $('#edit_buyTime').val();
	var checkinTime = $('#edit_checkinTime').val();
	if (!buyTime && typeof(buyTime)!="undefined" && buyTime=='') 
	{ 
		alert("设备购入时间不能为空！");
		return;
	}
	if (!checkinTime && typeof(checkinTime)!="undefined" && checkinTime=='') 
	{ 
		alert("设备报销登记时间不能为空！");
		return;
	}
	var time = {};
	time.startTime = buyTime;
	time.endTime = checkinTime;
	time.format = "yyyy.MM.dd";
	time.str = "h";
	$.ajax({
		url:'equipmentController/dateDiff.do',
		data:time,
		success:function(hour){
			
			$('#edit_remarks').attr({'name' : "" + hour + ""});
			tie = $('#edit_remarks').attr("name");
			alert("2:"+tie);
			edit();
		}
	});
}

//点击事件(edit)
function editClick(){ 
	//给input赋值
	$(".equipmentName ul li").click(function(){
		 var name = $(this).attr("value");
		 $("#edit_equipmentName").val(name);
		 var ID =  $(this).attr("class");
		 $('#edit_equipmentName').attr({'name' : "" + ID + ""});
		 $('#edit_equipmentName').attr({'value' : "" + name + ""});
		 editFillEQName();
		 $(".equipmentName").hide();
	})
	
	//隐藏提示框
	$("#editContent").click(function(){
		 $(".equipmentName").hide();
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

/**
 * 新增时得到相关信息方法
 *//*
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
}

*//**
 * 修改时得到相关信息方法
 *//*
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
}


/* 新增方法 */
function add(){
	alert("add");
	
	var parame = {};
	var equipmentCode = $('#add_equipmentCode').val();
	var equipmentName = $('#add_equipmentName').val();
	var equipmentID = $('#add_equipmentName').attr("name");
	alert("equipmentID" + equipmentID);
	var buyTime = $('#add_buyTime').val();
	var checkinTime = $('#add_checkinTime').val();
	var employeeID = $('#add_employeeName').attr("name");
	alert("employeeID" + employeeID);
	var employeeName = $('#add_employeeName').val();
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
	if (!buyTime && typeof(buyTime)!="undefined" && buyTime=='') 
	{ 
		alert("设备购入时间不能为空！");
		return;
	}
	if (!checkinTime && typeof(checkinTime)!="undefined" && checkinTime=='') 
	{ 
		alert("设备报销登记时间不能为空！");
		return;
	}
	if (!employeeName && typeof(employeeName)!="undefined" && employeeName=='') 
	{ 
		alert("批准人不能为空！");
		return;
	}
	if (!remarks && typeof(remarks)!="undefined" && remarks=='') 
	{ 
		alert("备注为空！");
		remarks = "";
	}
	
	
	
	var useTime = $('#add_remarks').attr("name");
	alert("1：" +useTime);
	
	parame.equipmentID = equipmentID;
	parame.useTime = useTime;
	parame.buyTime = buyTime;
	parame.checkinTime = checkinTime;
	parame.employeeID = employeeID;
	parame.remarks = remarks;
		
	$.ajax({
		url:'equipmentScrapController/addEquipmentScrap.do',
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

 //弹出修改弹框方法 
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	$('#edit_equipmentCode').val(data[0].equipmentCode);
	
	$('#edit_equipmentName').attr({'name' : "" + data[0].equipmentID + ""});
	$('#edit_equipmentName').attr({'value' : "" + data[0].equipmentName + ""});
	
	$('#edit_employeeName').attr({'name' : "" + data[0].employeeID + ""});
	$('#edit_employeeName').attr({'value' : "" + data[0].employeeName + ""});
	$('#edit_buyTime').val(data[0].buyTime);
	$('#edit_checkinTime').val(data[0].checkinTime);
	$('#edit_remarks').val(data[0].remarks);
	
	$('#editModal').modal('show');
}

 //修改方法 
function edit(){
	alert("edit");
	var data = $('#table').bootstrapTable('getSelections');
	var ID = data[0].ID; 
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("仪器设备检验记录ID不能为空！"); 
	}else {
		
		var parame = {};
		var equipmentCode = $('#edit_equipmentCode').val();
		var equipmentName = $('#edit_equipmentName').val();
		var equipmentID = $('#edit_equipmentName').attr("name");
		alert("equipmentID" + equipmentID);
		var buyTime = $('#edit_buyTime').val();
		var checkinTime = $('#edit_checkinTime').val();
		var employeeID = $('#edit_employeeName').attr("name");
		alert("employeeID" + employeeID);
		var employeeName = $('#edit_employeeName').val();
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
		if (!buyTime && typeof(buyTime)!="undefined" && buyTime=='') 
		{ 
			alert("设备购入时间不能为空！");
			return;
		}
		if (!checkinTime && typeof(checkinTime)!="undefined" && checkinTime=='') 
		{ 
			alert("设备报销登记时间不能为空！");
			return;
		}
		if (!employeeName && typeof(employeeName)!="undefined" && employeeName=='') 
		{ 
			alert("批准人不能为空！");
			return;
		}
		if (!remarks && typeof(remarks)!="undefined" && remarks=='') 
		{ 
			alert("备注为空！");
			remarks = "";
		}
		
		
		
		var useTime = $('#edit_remarks').attr("name");
		alert("1：" +useTime);
		
		parame.ID = ID;
		parame.equipmentID = equipmentID;
		parame.useTime = useTime;
		parame.buyTime = buyTime;
		parame.checkinTime = checkinTime;
		parame.employeeID = employeeID;
		parame.remarks = remarks;
			
		$.ajax({
			url:'equipmentScrapController/updEquipmentScrap.do',
			data:parame,
			success:function(o){
				if(o<=0){
					alert("修改失败");
				}
				$('#editModal').modal('hide');
				refresh();
			}
		});
	}
}