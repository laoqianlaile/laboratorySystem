// 请求数据时的额外参数
var param = {};

$(function() {
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
		url:'equipmentRepairController/getEquipmentRepairWithPaging.do',//服务器数据的加载地址
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
			param.model = $.trim($('#schModel').val());
			param.employeeName = $.trim($('#schEmployeeName').val());
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
			field:'factoryCode',//返回值名称
			title:'设备出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%',//宽度
//			visible:false
		},{
			field:'equipmentName',//返回值名称
			title:'设备名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%'//宽度
		},{
			field:'model',//返回值名称
			title:'设备型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'6%',//宽度
		},{
			field:'useYear',//返回值名称
			title:'使用年限',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'6%'//宽度
		},{
			field:'beforeStatus',//返回值名称
			title:'维修前状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%'//宽度
		},{
			field:'afterStatus',//返回值名称
			title:'维修后状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%'//宽度
		},{
			field:'employeeID',//返回值名称
			title:'维修员工ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'维修人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%'//宽度
		},{
			field:'repairTime',//返回值名称
			title:'维修时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%'//宽度
		},{
			field:'mounting',//返回值名称
			title:'维修所用配件',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'money',//返回值名称
			title:'维修费用',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'7%'//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//检查仪器维修数据是否合理并处理
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
	if (!dataObj.hasOwnProperty("useYear") || dataObj.useYear == null || dataObj.useYear == undefined) {
		 dataObj.useYear = "";
	}
	if (!dataObj.hasOwnProperty("beforeStatus") || dataObj.beforeStatus == null || dataObj.beforeStatus == undefined || dataObj.beforeStatus.trim() == "") {
		dataObj.beforeStatus = ""; //能编辑
	}
	if (!dataObj.hasOwnProperty("model") || dataObj.model == null || dataObj.model == undefined || dataObj.model.trim() == "") {
		dataObj.model = "";
	}
	if (!dataObj.hasOwnProperty("afterStatus") || dataObj.afterStatus == null || dataObj.afterStatus == undefined || dataObj.afterStatus.trim() == "") {
		dataObj.afterStatus = "";
	}
	if (!dataObj.hasOwnProperty("mounting") || dataObj.mounting == null || dataObj.mounting == undefined  || dataObj.mounting.trim() == "") {
		dataObj.mounting = "";
	}
	if (!dataObj.hasOwnProperty("repairTime") || dataObj.repairTime == null || dataObj.repairTime == undefined || dataObj.repairTime.trim() == "") {
		dataObj.repairTime = "";
	}
	if (!dataObj.hasOwnProperty("money") || dataObj.money == null || dataObj.money == undefined) {
		dataObj.money = "";
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
		model : $.trim($('#schModel').val()),
		equipmentName : $.trim($('#schEquipmentName').val()),
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
	window.location.href="module/jsp/equipmentManage/equipmentRepairManage.jsp";
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
			equipmentRepairIds:ids.substring(0, (ids.length-3))	
	};
	
	$.ajax({
	  url:'equipmentRepairController/delEquipmentRepair.do',
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
 * 改变信息触发相关提示信息的方法(add)
 * editGetTPName
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
		 $('#edit_factoryCode').attr("disabled",true);
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
	swal("add");
	
	var parame = {};
	var factoryCode = $('#add_factoryCode').val();
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
		
	if (!factoryCode || typeof(factoryCode) == "undefined" || factoryCode.trim() == "") 
	{ 
		swal("设备出厂编号不能为空！"); 
		return;
	}
	if (!equipmentName || typeof(equipmentName) == "undefined" || equipmentName.trim() == "") 
	{ 
		swal("仪器设备名称不能为空！");
		return;
	}
	if (!beforeStatus || typeof(beforeStatus) == "undefined" || beforeStatus.trim() == "") 
	{ 
		swal("维修前状态不能为空！");
		return;
	}
	if (!mounting || typeof(mounting) == "undefined" || mounting.trim() == "") 
	{ 
		swal("所用配件不能为空！");
		return;
	}
	if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
	{ 
		swal("维修员不能为空！");
		return;
	}
	if (!afterStatus || typeof(afterStatus) == "undefined" || afterStatus.trim() == "") 
	{ 
		swal("维修后状态不能为空！");
		return;
	}
	if (!repairTime || typeof(repairTime) == "undefined" || repairTime.trim() == "") 
	{ 
		swal("维修时间不能为空！");
		return;
	}
	if (!money || typeof(money) == "undefined" || money.trim() == "") 
	{ 
		swal("维修费用不能为空！"); 
		return;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
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
				swal("新增失败");
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
		swal("请选中一条数据");
		return;
	}
	$('#edit_factoryCode').val(data[0].factoryCode);
	
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
	swal("edit");
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
		var beforeStatus = $('#edit_beforeStatus').val();
		var mounting = $('#edit_mounting').val();
		var employeeID = $('#edit_employeeName').attr("name");
		var employeeName = $('#edit_employeeName').val();
		var afterStatus = $('#edit_afterStatus').val();
		var repairTime = $('#edit_repairTime').val();
		var money = $('#edit_money').val();
		var remarks = $('#edit_remarks').val();
			
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
		if (!beforeStatus || typeof(beforeStatus) == "undefined" || beforeStatus.trim() == "") 
		{ 
			swal("维修前状态不能为空！");
			return;
		}
		if (!mounting || typeof(mounting) == "undefined" || mounting.trim() == "") 
		{ 
			swal("所用配件不能为空！");
			return;
		}
		if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
		{ 
			swal("维修员不能为空！");
			return;
		}
		if (!afterStatus || typeof(afterStatus) == "undefined" || afterStatus.trim() == "") 
		{ 
			swal("维修后状态不能为空！");
			return;
		}
		if (!repairTime || typeof(repairTime) == "undefined" || repairTime.trim() == "") 
		{ 
			swal("维修时间不能为空！");
			return;
		}
		if (!money || typeof(money) == "undefined" || money.trim() == "") 
		{ 
			swal("维修费用不能为空！"); 
			return;
		}
		if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
		{ 
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
					swal("修改失败");
				}
				$('#editModal').modal('hide');
				refresh();
			}
		});
	}
}
$('.form_datetime').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    format: 'yyyy.mm.dd'
});
$('.form_datetime_TR').datetimepicker({
	language: 'zh-CN',
	weekStart: 1,
	todayBtn: 1,
	autoclose: 1,
	todayHighlight: 1,
		startView: 2,
	minView: 2,
	forceParse: 0,
		pickerPosition: 'top-right',
	format: 'yyyy.mm.dd'
});