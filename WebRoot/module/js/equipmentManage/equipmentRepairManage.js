
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
		url:'equipmentRepairController/getEquipmentRepairWithPaging.do',//服务器数据的加载地址
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
			title:'仪器设备维修记录ID',//列名
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
			width:'10',//宽度
//			visible:false
		},{
			field:'equipmentName',//返回值名称
			title:'设备名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'model',//返回值名称
			title:'设备型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'useYear',//返回值名称
			title:'使用年限',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'beforeStatus',//返回值名称
			title:'维修前状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'afterStatus',//返回值名称
			title:'维修后状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'employeeID',//返回值名称
			title:'维修员工ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'维修人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'repairTime',//返回值名称
			title:'维修时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'mounting',//返回值名称
			title:'维修所用配件',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'money',//返回值名称
			title:'维修费用',//列名
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
		employeeName : $.trim($('#schEmployeeName').val()),
	};
    return searchCondition;
}

/**
 * 搜索方法
 */
function search(){
	initData();
	$('#table').bootstrapTable('refresh', null);
}

/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/equipmentManage/equipmentRepairManage.jsp";
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
			equipmentRepairIds:ids.substring(0, (ids.length-3))	
	};
	
	$.ajax({
	  url:'equipmentRepairController/delEquipmentRepair.do',
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
		    			htmlElement += "<ul><li value='" + myobj[i].equipmentName + "' class='" + myobj[i].ID + "' title='" + myobj[i].equipmentCode + "'>" + myobj[i].equipmentName + "</li></ul>";
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

//点击事件(add)
function addClick(){ 
	//给input赋值
	$(".equipmentName ul li").click(function(){
		 var name = $(this).attr("value");
		 $("#add_equipmentName").val(name);
		 var ID =  $(this).attr("class");
		 var code =  $(this).attr("title");
		 $('#add_equipmentName').attr({'name' : "" + ID + ""});
		 $('#add_equipmentCode').attr({'value' : "" + code + ""});
		 $('#add_equipmentName').attr({'value' : "" + name + ""});
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

//点击事件(edit)
function editClick(){ 
	//给input赋值
	$(".equipmentName ul li").click(function(){
		 var name = $(this).attr("value");
		 $("#edit_equipmentName").val(name);
		 var ID =  $(this).attr("class");
		 var code =  $(this).attr("title");
		 $('#edit_equipmentName').attr({'name' : "" + ID + ""});
		 $('#edit_equipmentCode').attr({'value' : "" + code + ""});
		 $('#edit_equipmentName').attr({'value' : "" + name + ""});
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



/* 新增方法 */
function add(){
	alert("add");
	
	var parame = {};
	var equipmentCode = $('#add_equipmentCode').val();
	var equipmentName = $('#add_equipmentName').val();
	var equipmentID = $('#add_equipmentName').attr("name");
	var beforeStatus = $('#add_beforeStatus').val();
	var mounting = $('#add_mounting').val();
	var employeeID = $('#add_employeeName').attr("name");
	var employeeName = $('#add_employeeName').val();
	var afterStatus = $('#add_afterStatus').val();
	var repairTime = $('#add_repairTime').val();
	var money = $('#add_money').val();
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
	if (!beforeStatus && typeof(beforeStatus)!="undefined" && beforeStatus=='') 
	{ 
		alert("维修前状态不能为空！");
		return;
	}
	if (!mounting && typeof(mounting)!="undefined" && mounting=='') 
	{ 
		alert("所用配件不能为空！");
		return;
	}
	if (!employeeName && typeof(employeeName)!="undefined" && employeeName=='') 
	{ 
		alert("维修员不能为空！");
		return;
	}
	if (!afterStatus && typeof(afterStatus)!="undefined" && afterStatus=='') 
	{ 
		alert("维修后状态不能为空！");
		return;
	}
	if (!repairTime && typeof(repairTime)!="undefined" && repairTime=='') 
	{ 
		alert("维修时间不能为空！");
		return;
	}
	if (!money && typeof(money)!="undefined" && money=='') 
	{ 
		alert("维修费用不能为空！"); 
		return;
	}
	if (!remarks && typeof(remarks)!="undefined" && remarks=='') 
	{ 
		alert("备注为空！");
		remarks = "";
	}
	
	parame.equipmentID = equipmentID;
	parame.beforeStatus = beforeStatus;
	parame.afterStatus = afterStatus;
	parame.employeeID = employeeID;
	parame.mounting = mounting;
	parame.money = money;
	parame.repairTime = repairTime;
	parame.remarks = remarks;
		
	$.ajax({
		url:'equipmentRepairController/addEquipmentRepair.do',
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
	
	$('#edit_beforeStatus').val(data[0].beforeStatus);
	$('#edit_mounting').val(data[0].mounting);
	$('#edit_employeeName').attr({'name' : "" + data[0].employeeID + ""});
	$('#edit_employeeName').attr({'value' : "" + data[0].employeeName + ""});
	$('#edit_afterStatus').val(data[0].afterStatus);
	$('#edit_repairTime').val(data[0].repairTime);
	$('#edit_money').val(data[0].money);
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
		var beforeStatus = $('#edit_beforeStatus').val();
		var mounting = $('#edit_mounting').val();
		var employeeID = $('#edit_employeeName').attr("name");
		var employeeName = $('#edit_employeeName').val();
		var afterStatus = $('#edit_afterStatus').val();
		var repairTime = $('#edit_repairTime').val();
		var money = $('#edit_money').val();
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
		if (!beforeStatus && typeof(beforeStatus)!="undefined" && beforeStatus=='') 
		{ 
			alert("维修前状态不能为空！");
			return;
		}
		if (!mounting && typeof(mounting)!="undefined" && mounting=='') 
		{ 
			alert("所用配件不能为空！");
			return;
		}
		if (!employeeName && typeof(employeeName)!="undefined" && employeeName=='') 
		{ 
			alert("维修员不能为空！");
			return;
		}
		if (!afterStatus && typeof(afterStatus)!="undefined" && afterStatus=='') 
		{ 
			alert("维修后状态不能为空！");
			return;
		}
		if (!repairTime && typeof(repairTime)!="undefined" && repairTime=='') 
		{ 
			alert("维修时间不能为空！");
			return;
		}
		if (!money && typeof(money)!="undefined" && money=='') 
		{ 
			alert("维修费用不能为空！"); 
			return;
		}
		if (!remarks && typeof(remarks)!="undefined" && remarks=='') 
		{ 
			alert("备注为空！");
			remarks = "";
		}
		
		parame.ID = ID;
		parame.equipmentID = equipmentID;
		parame.beforeStatus = beforeStatus;
		parame.afterStatus = afterStatus;
		parame.employeeID = employeeID;
		parame.mounting = mounting;
		parame.money = money;
		parame.repairTime = repairTime;
		parame.remarks = remarks;
			
		$.ajax({
			url:'equipmentRepairController/updEquipmentRepair.do',
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