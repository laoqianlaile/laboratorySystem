
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
			field:'equipmentCode',//返回值名称
			title:'设备编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
//			visible:false
		},{
			field:'ID',//返回值名称
			title:'设备ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'equipmentName',//返回值名称
			title:'设备名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'name',//返回值名称
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
function delData() {
	var data = $('#table').bootstrapTable('getSelections');
    //弹出确认框
	if (data.length == 0) {
		sweetAlert("请至少选中一条数据");
		return;
	}

	var ids = "";
	for (var i = 0; i < data.length; i++) {
		ids += data[i].ID + ",";
	}


	var sampleIDs = ids.substring(0, (ids.length - 1));
	deleEquipment(sampleIDs);
	
}

function deleEquipment(sampleIDs){
	
	$.ajax({
		url : '/laboratorySystem/equipmentController/delEquipment.do',
		dataType:"json",
		data : {
			equipmentIDs : sampleIDs
		},
		success : function(o) {
			if (o == "false") {
				alert("删除失败");
			}else{
				alert("删除成功");
		  }
			refresh();
		}
	});
	
}

/* 新增方法 */
function add(){
	var name = $('#add_equipmentCode').val(); 
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		alert("合同名不能为空！"); 
	}else {
		var parame = {};
		parame.equipmentCode = $('#add_equipmentCode').val();
		parame.equipmentName = $('#add_equipmentName').val();
		parame.department = $('#add_departmentName').val();
		parame.number = $('#add_number').val();
		parame.equipmentType = $('#add_equipmentTypeName').val();
		parame.buyTime = $('#add_buyTime').val();
		parame.useYear = $('#add_useYear').val();
		parame.state = "0";
		parame.remarks = $('#add_remarks').val();
		parame.employeeName = $('#add_employeeName').val();
		
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
	    		 department=$("#schDepartment");
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
	    		 equipmentType=$("#schEquipmentType");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].name + "</option>";
	    		 }
	    		 equipmentType.append(htmlElement);
 		    }
		}
	 });
}

/**
 * 改变信息触发相关提示信息的方法(add)
 */
function addGetEName(){
	var name = $('#add_employeeName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".employeeName").hide();
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
		    		employee = $(".employeeName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].ID + "'>" + myobj[i].employeeName + "</li></ul>";
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
	$(".employeeName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#add_employeeName").val(name);
	});
	
	//隐藏提示框
	$("#addModal").click(function(){
		 $(".employeeName").hide();
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
	    	 if (data) { 
	    		 var department1;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "<option class='depart'></option>";//定义HTML    
	    		 department1=$("#add_departmentName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department1.append(htmlElement);
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
	    	 if (data) { 
	    		 var equipmentType1;
	    		 var myobj = JSON.parse(data);
	    		 htmlElement = "<option class='equip'></option>";//定义HTML    
	    		 equipmentType1=$("#add_equipmentTypeName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].name + "</option>";
	    		 }
	    		 equipmentType1.append(htmlElement);
 		    }
		}
	 });
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editGetEName(){
	var name = $('#edit_employeeName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".employeeName").hide();
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
		    		employee = $(".employeeName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].ID + "'>" + myobj[i].employeeName + "</li></ul>";
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
	$(".employeeName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_employeeName").val(name);
	});
	
	//隐藏提示框
	$("#editModal").click(function(){
		 $(".employeeName").hide();
	});
}

 //弹出修改弹框方法 
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	if(data[0].state == "审核通过"){
		alert("该仪器已经审核通过！");
		return;
	}
	$('#edit_equipmentCode').val(data[0].equipmentCode);
	$('#edit_equipmentName').val(data[0].equipmentID);
	$('#EquipmentID').val(data[0].ID);
	
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
	$('#edit_number').val(data[0].number);
	
	var equip = data[0].name;
	switch (equip) {
	case "超大型": $('#edit_equipmentTypeName .equip').text(data[0].name);
					$('#edit_equipmentTypeName .equip').val("1");break;
	case "大型": $('#edit_equipmentTypeName .equip').text(data[0].name);
					$('#edit_equipmentTypeName .equip').val("2");break;
	case "中型": $('#edit_equipmentTypeName .equip').text(data[0].name);
					$('#edit_equipmentTypeName .equip').val("3");break;
	case "小型": $('#edit_equipmentTypeName .equip').text(data[0].name);
				$('#edit_equipmentTypeName .equip').val("3");break;
	default:
		break;
	}
	$('#edit_buyTime').val(data[0].buyTime);
	$('#edit_useYear').val(data[0].useYear);
	$('#edit_remarks').val(data[0].remarks);
	
	var employeeName = data[0].employeeName;
	GetEName(employeeName);
	
	$('#editModal').modal('show');
	getEquipmentID();
}
/**
 * 得到员工的ID(edit)
 */
function GetEName(employeeName){
	var name = employeeName;
	var parame = {};
	parame.employeeName = name;
		
		$.ajax({  
		    url:'employeeController/getEmployeeName.do',// 跳转到 action  
		    type:'post',
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var myobj = JSON.parse(data);
		    		$('#edit_employeeName').val(myobj[0].ID);
			    }else{
			    	alert("没有数据!");
			    }
			}
		});	
}


//得到需要修改的仪器的ID
function getEquipmentID(){
	var code = $('#edit_equipmentCode').val();
	if (!code && typeof(code)!="undefined" && code=='') 
	{ 
		alert("合同编号不能为空！"); 
	}else {
		var parame = {};
		parame.equipmentCode = code;
		$.ajax({  
		     url:'equipmentController/getIdByCode.do',// 跳转到 action
		     type:'post', 
		     data:parame,
		     dataType:'json',
		     success:getid=function(data){
		    	 if (data) {
		    		 var id,ID,htmlElement="";
		    		 var myobj = JSON.parse(data);
		    		 ID = myobj[0].ID;
		    		 id = $("#IDid");
		    		 $("#Equipmentid").remove();
		    		 htmlElement += "<div id='Equipmentid' style='display:none' class='col-xs-12 col-md-12'>" +
	                   "<h4>合同ID：</h4>" +
		    			 "<input type='text' id='EquipmentID' value='" + ID + "' name='ID' class='form-control' aria-describedby='basic-addon1'></input>"+
		    			"</div>";
		    		 id.append(htmlElement);
		    		 }
		    	 } 
		     });
		}
}

 //修改方法 
function edit(){
	var code = $('#edit_equipmentCode').val(); 
	if (!code && typeof(code)!="undefined" && code=='') 
	{ 
		alert("合同编号不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#EquipmentID').val();
		parame.equipmentCode = $('#edit_equipmentCode').val();
		parame.equipmentName = $('#edit_equipmentName').val();
		parame.department = $('#edit_departmentName').val();
		parame.number = $('#edit_number').val();
		parame.equipmentType = $('#edit_equipmentTypeName').val();
		parame.buyTime = $('#edit_buyTime').val();
		parame.useYear = $('#edit_useYear').val();
		parame.state = "0";
		parame.remarks = $('#edit_remarks').val();
		parame.employeeName = $('#edit_employeeName').val();
		
		$.ajax({
		  url:'equipmentController/updEquipment.do',
		  type:'post', 
		  data:parame,
		  dataType:'json',
		  success:function(o){
			  if(o<=0){
				  alert("修改失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  },
		  error:function(o){
			  console.log(o);
		  }
		});
	}
}