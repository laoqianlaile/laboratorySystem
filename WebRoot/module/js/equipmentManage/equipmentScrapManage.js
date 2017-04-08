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
		url:'equipmentScrapController/getEquipmentScrapWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.equipmentName = $.trim($('#schEquipmentName').val());
			param.model = $.trim($('#schModel').val());
			param.employeeName = $.trim($('#schEmployeeName').val());
			param.departmentID = $.trim($('#schDepartment').val());
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
			field:'factoryCode',//返回值名称
			title:'设备出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%',//宽度
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
			width:'8%',//宽度
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
	//showSth();
}

//检查仪器报废数据是否合理并处理
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
	if (!dataObj.hasOwnProperty("model") || dataObj.model == null || dataObj.model == undefined || dataObj.model.trim() == "") {
		dataObj.model = "";
	}
	if (!dataObj.hasOwnProperty("departmentID") || dataObj.departmentID == null || dataObj.departmentID == undefined || dataObj.departmentID.trim() == "") {
		dataObj.departmentID = "";
	}
	if (!dataObj.hasOwnProperty("departmentName") || dataObj.departmentName == null || dataObj.departmentName == undefined  || dataObj.departmentName.trim() == "") {
		dataObj.departmentName = "";
	}
	if (!dataObj.hasOwnProperty("buyTime") || dataObj.buyTime == null || dataObj.buyTime == undefined || dataObj.buyTime.trim() == "") {
		dataObj.buyTime = "";
	}
	if (!dataObj.hasOwnProperty("useTime") || dataObj.useTime == null || dataObj.useTime == undefined) {
		dataObj.useTime = "";
	}
	if (!dataObj.hasOwnProperty("checkinTime") || dataObj.checkinTime == null || dataObj.checkinTime == undefined || dataObj.checkinTime.trim() == "") {
		dataObj.checkinTime = "";
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
		departmentID : $.trim($('#schDepartment').val()),
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
	window.location.href="module/jsp/equipmentManage/equipmentScrapManage.jsp";
}
/**
 * 刷新表格
 */
function refrehTable() {
	$('#table').bootstrapTable('refresh', null);
}
/* 删除方法 */
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0){
		swal("请至少选中一条数据");
		return;
	}
	var ids = "";
	var message = "将要删除仪器：";
	for(var i=0; i<data.length; i++){
		ids += "ID = '" + data[i].ID + "' or ";
		message += data[i].equipmentName + " or ";
	}
	var ajaxParameter = {
		equipmentScrapIds:ids.substring(0, (ids.length-3))	
	};
	swal({
		title: "确认删除：" + message.substring(0, (message.length-3)),
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
		},
		function(){	
			$.ajax({
			  url:'equipmentScrapController/delEquipmentScrap.do',
			  type:"post",
			  data:ajaxParameter,
			  success:function(o){
				  switch (o) {
					case '1':swal("删除成功！");
						setTimeout(refresh, 1000);
						break;
					case '0':swal("删除失败！");
						break;
					default:swal("出现未知错误，请重试！");
						break;
				  }
			  },
			  error : function() {
				return false;
			  }
		});
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
		    		}else if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].equipmentName + "' class='" + myobj[i].ID + "'>" + myobj[i].equipmentName + " | " + myobj[i].factoryCode + "</li></ul>";
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
		    		}else if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li></ul>";
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
				$("#add_factoryCode").val(myobj[0].factoryCode);
				$('#add_factoryCode').attr("disabled",true);
				$("#add_buyTime").val(myobj[0].buyTime);
				$('#add_buyTime').attr("disabled",true);
		    }
		}
	});	
}

function addGetUseTime(){
	var buyTime = $('#add_buyTime').val();
	var checkinTime = $('#add_checkinTime').val();
	if (!buyTime || typeof(buyTime) == "undefined" || buyTime.trim() == "") 
	{ 
		swal("设备购入时间不能为空！");
		return;
	}
	if (!checkinTime || typeof(checkinTime) == "undefined" || checkinTime.trim() == "") 
	{ 
		swal("设备报销登记时间不能为空！");
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
			add();
		}
	});
}

//点击事件(add)
function addClick(){ 
	//给input赋值
	$(".equipmentName ul li").click(function(){
		 var name = $(this).attr("value");
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "";
			}
		 $("#add_equipmentName").val(name);
		 var ID =  $(this).attr("class");
		 if (ID == null || ID.trim() == "" || ID == "undefined") {
			 ID = "";
			}
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
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "";
			}
		 $("#add_employeeName").val(name);
		 var ID =  $(this).attr("class");
		 if (ID == null || ID.trim() == "" || ID == "undefined") {
			 ID = "";
			}
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
		    		}else if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li></ul>";
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
		    		}else if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li></ul>";
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
				$("#edit_factoryCode").val(myobj[0].factoryCode);
				$('#edit_factoryCode').attr("disabled",true);
				$("#edit_buyTime").val(myobj[0].buyTime);
				$('#edit_buyTime').attr("disabled",true);
		    }
		}
	});	
}

function editGetUseTime(){
	var buyTime = $('#edit_buyTime').val();
	var checkinTime = $('#edit_checkinTime').val();
	if (!buyTime || typeof(buyTime) == "undefined" || buyTime.trim() == "") 
	{ 
		swal("设备购入时间不能为空！");
		return;
	}
	if (!checkinTime || typeof(checkinTime) == "undefined" || checkinTime.trim() == "") 
	{ 
		swal("设备报销登记时间不能为空！");
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
			edit();
		}
	});
}

//点击事件(edit)
function editClick(){ 
	//给input赋值
	$(".equipmentName ul li").click(function(){
		 var name = $(this).attr("value");
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "";
			}
		 $("#edit_equipmentName").val(name);
		 var ID =  $(this).attr("class");
		 if (ID == null || ID.trim() == "" || ID == "undefined") {
			 ID = "";
			}
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
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "";
			}
		 $("#edit_employeeName").val(name);
		 var ID =  $(this).attr("class");
		 if (ID == null || ID.trim() == "" || ID == "undefined") {
			 ID = "";
			}
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
	var buyTime = $('#add_buyTime').val();
	var useTime = $('#add_remarks').attr("name");
	var checkinTime = $('#add_checkinTime').val();
	var employeeID = $('#add_employeeName').attr("name");
	var employeeName = $('#add_employeeName').val();
	var remarks = $('#add_remarks').val();
		
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
	if (!buyTime || typeof(buyTime) == "undefined" || buyTime.trim() == "") 
	{ 
		swal("设备购入时间不能为空！");
		return;
	}
	if (!useTime || typeof(useTime) == "undefined") 
	{ 
		swal("设备使用时间不能为空！");
		return;
	}
	if (!checkinTime || typeof(checkinTime) == "undefined" || checkinTime.trim() == "") 
	{ 
		swal("设备报销登记时间不能为空！");
		return;
	}
	if (checkinTime <= buyTime) 
	{ 
		swal("时间先后顺序选择错误！"); 
		return;
	}
	if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
	{ 
		swal("批准人不能为空！");
		return;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
		remarks = "";
	}
	
	parame.equipmentID = equipmentID;
	parame.equipmentName = equipmentName;
	parame.useTime = useTime;
	parame.buyTime = buyTime;
	parame.checkinTime = checkinTime;
	parame.employeeID = employeeID;
	parame.employeeName = employeeName;
	parame.remarks = remarks;
		
	$.ajax({
		url:'equipmentScrapController/addEquipmentScrap.do',
		data:parame,
		success:function(o){
			switch (o) {
			case '-2':swal("不存在该仪器！");
				break;
			case '-4':swal("仪器名与仪器ID不相符！");
				break;
			case '-6':swal("不存在该员工！");
				break;
			case '-8':swal("员工名与员工ID不相符！");
				break;
			case '1':swal("新增成功！");
				$('#addModal').modal('hide');
				refrehTable();
				break;
			case '0':swal("新增失败！");
				break;
			default:swal("出现未知错误，请重试！");
				break;
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
	
	$('#edit_employeeName').attr({'name' : "" + data[0].employeeID + ""});
	$('#edit_employeeName').attr({'value' : "" + data[0].employeeName + ""});
	$('#edit_buyTime').val(data[0].buyTime);
	$('#edit_checkinTime').val(data[0].checkinTime);
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
		var buyTime = $('#edit_buyTime').val();
		var checkinTime = $('#edit_checkinTime').val();
		var employeeID = $('#edit_employeeName').attr("name");
		var employeeName = $('#edit_employeeName').val();
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
		if (!buyTime || typeof(buyTime) == "undefined" || buyTime.trim() == "") 
		{ 
			swal("设备购入时间不能为空！");
			return;
		}
		if (!checkinTime || typeof(checkinTime) == "undefined" || checkinTime.trim() == "") 
		{ 
			swal("设备报销登记时间不能为空！");
			return;
		}
		if (checkinTime <= buyTime) 
		{ 
			swal("时间先后顺序选择错误！"); 
			return;
		}
		if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
		{ 
			swal("批准人不能为空！");
			return;
		}
		if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
		{ 
			remarks = "";
		}
		
		var useTime = $('#edit_remarks').attr("name");
		
		parame.ID = ID;
		parame.equipmentID = equipmentID;
		parame.equipmentName = equipmentName;
		parame.useTime = useTime;
		parame.buyTime = buyTime;
		parame.checkinTime = checkinTime;
		parame.employeeID = employeeID;
		parame.employeeName = employeeName;
		parame.remarks = remarks;
			
		$.ajax({
			url:'equipmentScrapController/updEquipmentScrap.do',
			data:parame,
			success:function(o){
				switch (o) {
				case '-2':swal("不存在该仪器！");
					break;
				case '-4':swal("仪器名与仪器ID不相符！");
					break;
				case '-6':swal("不存在该员工！");
					break;
				case '-8':swal("员工名与员工ID不相符！");
					break;
				case '1':swal("修改成功！");
					$('#editModal').modal('hide');
					refrehTable();
					break;
				case '0':swal("修改失败！");
					break;
				default:swal("出现未知错误，请重试！");
					break;
			 }
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