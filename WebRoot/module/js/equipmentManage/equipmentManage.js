// 请求数据时的额外参数
var param = {};

$(function() {
	initData();
	searchSth();
});

//初始化数据
function initData(){
	$("#table").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 3,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 3, 5, 9, 15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'factoryCode',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'equipmentController/getEquipmentWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.equipmentType = $.trim($('#schEquipmentType').val());
			param.equipmentName = $.trim($('#schEquipmentName').val());
			param.departmentName = $.trim($('#schDepartment').val());
			param.buyTime = $.trim($('#schBuyTime').val());
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
			title:'设备ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'factoryCode',//返回值名称
			title:'设备出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'equipmentName',//返回值名称
			title:'设备名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'equipmentTypeID',//返回值名称
			title:'设备类型ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'name',//返回值名称
			title:'设备类型',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%'//宽度
		},{
			field:'model',//返回值名称
			title:'型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
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
			width:'8%'//宽度
		},{
			field:'buyTime',//返回值名称
			title:'购入时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%'//宽度
		},{
			field:'useYear',//返回值名称
			title:'使用年限(年)',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'6%'//宽度
		},{
			field:'credentials',//返回值名称
			title:'证书编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%'//宽度
		},{
			field:'effectiveTime',//返回值名称
			title:'有效期',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%'//宽度
		},{
			field:'employeeID',//返回值名称
			title:'经办人ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'经办人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'6%'//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%'//宽度
		},{
			field:'',
			title:'操作',
			align:'center',
			valign:'middle',
			width:"10%",
			formatter:function(value,row,index){    
				var a = '<img src ="module/img/update_icon.png" onclick="openEditModal(\'' + row.ID + '\',\'' +
				row.factoryCode + '\',\'' + row.equipmentName + '\',\'' + row.equipmentTypeID + '\',\'' + row.model +
				'\',\'' + row.departmentID + '\',\'' + row.buyTime + '\',\'' + row.useYear + '\',\'' + row.credentials +
				'\',\'' + row.effectiveTime + '\',\'' + row.remarks + '\')"'+ ' title="编辑设备" style="cursor:pointer;padding-right:8px;"></img>';
                 var b = "<img src ='module/img/delete_icon.png' onclick='delData(\""+ row.ID +"\",\"" + row.equipmentName +"\")' title='删除设备' style='cursor:pointer;padding-right:8px;'></img>";
                 return a+b;
                 }
          }]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	showSth();
	editSth();
}

//检查合同数据是否合理并处理
function checkData(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null || dataObj.ID == undefined || dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null || dataObj.factoryCode == undefined || dataObj.factoryCode.trim() == "") {
		  dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("equipmentName") || dataObj.equipmentName == null || dataObj.equipmentName == undefined || dataObj.equipmentName.trim() == "") {
		dataObj.equipmentName = "";
	}
	if (!dataObj.hasOwnProperty("equipmentTypeID") || dataObj.equipmentTypeID == null || dataObj.equipmentTypeID == undefined || dataObj.equipmentTypeID.trim() == "") {
		 dataObj.equipmentTypeID = "";
	}
	if (!dataObj.hasOwnProperty("name") || dataObj.name == null || dataObj.name == undefined || dataObj.name.trim() == "") {
		dataObj.name = ""; //能编辑
	}
	if (!dataObj.hasOwnProperty("model") || dataObj.model == null || dataObj.model == undefined || dataObj.model.trim() == "") {
		dataObj.model = "";
	}
	if (!dataObj.hasOwnProperty("departmentID") || dataObj.departmentID == null || dataObj.departmentID == undefined || dataObj.departmentID.trim() == "") {
		dataObj.departmentID = "";
	}
	if (!dataObj.hasOwnProperty("departmentName") || dataObj.departmentName == null || dataObj.departmentName == undefined  || dataObj.departmentName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("buyTime") || dataObj.buyTime == null || dataObj.buyTime == undefined || dataObj.buyTime.trim() == "") {
		dataObj.buyTime = "";
	}
	if (!dataObj.hasOwnProperty("useYear") || dataObj.useYear == null || dataObj.useYear == undefined) {
		dataObj.useYear = "";
	}
	if (!dataObj.hasOwnProperty("credentials") || dataObj.credentials == null || dataObj.credentials == undefined || dataObj.credentials.trim() == "") {
		dataObj.credentials = "";
	}
	if (!dataObj.hasOwnProperty("effectiveTime") || dataObj.effectiveTime == null || dataObj.effectiveTime == undefined || dataObj.effectiveTime.trim() == "") {
		dataObj.effectiveTime = "";
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
		equipmentType : $.trim($('#schEquipmentType').val()),
		equipmentName : $.trim($('#schEquipmentName').val()),
		departmentName : $.trim($('#schDepartment').val()),
		buyTime : $.trim($('#schBuyTime').val()),
	};
    return searchCondition;
}*/

/**
 * 搜索方法
 */
function searchEquipment(){
	initData();
	$('#table').bootstrapTable('refresh', null);
}
/**
 * 刷新表格
 */
function refrehTable() {
	$('#table').bootstrapTable('refresh', null);
}
/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/equipmentManage/equipmentManage.jsp";
}

/* 删除方法 */
function delData(id,equipmentName){
	swal({
		  title: "确认删除：" + equipmentName,
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "确定",
		  closeOnConfirm: false
		},
		function(){
			$.ajax({
			  url:'equipmentController/delEquipment.do',
			  type:"post",
			  data:{
					equipmentIds:id	
				},
			  success:function(o){
				  if(o > 0){
					  swal("删除成功！");
					  setTimeout(refresh, 1000);
				  }else if(o == 0){
					  swal("删除失败！");
				  }else if(o == -2){
					  swal("该设备与其他表数据有关联，请先删除关联！");
				  }else{
					  swal("出现未知错误，请重试！");
				  }
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
	 
	 $.ajax({  
	     url:'equipmentTypeController/getEquipmentTypeName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var equipmentType;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "<option value='0'>所有类型</option>";//定义HTML    
	    		 equipmentType=$("#schEquipmentType");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].name + "</option>";
	    		 }
	    		 equipmentType.append(htmlElement);
 		    }
		}
	 });
}

/* 新增方法 */
function add(){
	var parame = {};
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
	if (!equipmentName || typeof(equipmentName) == "undefined" || equipmentName.trim() == "") 
	{ 
		swal("仪器设备名称不能为空！");
		return;
	}
	if (!factoryCode || typeof(factoryCode) == "undefined" || factoryCode.trim() == "") 
	{ 
		swal("设备出厂编号不能为空！"); 
		return;
	}
	if (!department || typeof(department) == "undefined" || department.trim() == "") 
	{ 
		swal("仪器设备所属部门不能为空！");
		return;
	}
	if (!equipmentType || typeof(equipmentType) == "undefined" || equipmentType.trim() == "") 
	{ 
		swal("仪器设备类型不能为空！");
		return;
	}
	if (!model || typeof(model) == "undefined" || model.trim() == "") 
	{ 
		swal("仪器设备型号不能为空！");
		return;
	}
	if (!buyTime || typeof(buyTime) == "undefined" || buyTime.trim() == "") 
	{ 
		swal("仪器设备购买时间不能为空！");
		return;
	}
	if (!useYear || typeof(useYear) == "undefined" || useYear.trim() == "") 
	{ 
		swal("仪器设备使用年限不能为空！");
		return;
	}
	if (!credentials || typeof(credentials) == "undefined" || credentials.trim() == "") 
	{ 
		swal("证书编号不能为空！");
		return;
	}
	if (!effectiveTime || typeof(effectiveTime) == "undefined" || effectiveTime.trim() == "") 
	{ 
		swal("有效期不能为空！");
		return;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
		remarks = "";
	}
	if (effectiveTime <= buyTime) 
	{ 
		swal("时间先后顺序选择错误！"); 
		return;
	}
	parame.equipmentName = equipmentName;
	parame.department = department;
	parame.equipmentType = equipmentType;
	parame.model = model;
	parame.buyTime = buyTime;
	parame.useYear = useYear;
	parame.factoryCode = factoryCode;
	parame.credentials = credentials;
	parame.effectiveTime = effectiveTime;
	parame.remarks = remarks;
		
	$.ajax({
	  url:'equipmentController/addEquipment.do',
	  data:parame,
	  success:function(o){
		  if(o <= 0){
			  swal("新增失败!");
		  }else if(o == 1){
			  swal("新增成功!");
			  $('#addModal').modal('hide');
			  setTimeout(refresh, 1000);
		  }
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
	 $.ajax({  
	     url:'equipmentTypeController/getEquipmentTypeName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var equipmentType;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "";//定义HTML    
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
	 $.ajax({  
	     url:'equipmentTypeController/getEquipmentTypeName.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(data){  
	    	 if (data) { 
	    		 var equipmentType;
	    		 var myobj = JSON.parse(data);
	    		 var htmlElement = "";//定义HTML    
	    		 equipmentType=$("#edit_equipmentTypeName");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].name + "</option>";
	    		 }
	    		 equipmentType.append(htmlElement);
 		    }
		}
	 });
}

 //弹出修改弹框方法 ，
function openEditModal(id,factoryCode,equipmentName,equipmentTypeID,model,departmentID,
	    buyTime,useYear,credentials, effectiveTime,remarks){
	$('#edit_ID').val(id);
	$('#edit_factoryCode').val(factoryCode);
	$('#edit_equipmentName').val(equipmentName);
	$('#edit_departmentName').val(departmentID);
	$('#edit_equipmentTypeName').val(equipmentTypeID);
	$('#edit_model').val(model);
	$('#edit_buyTime').val(buyTime);
	$('#edit_useYear').val(useYear);
	$('#edit_credentials').val(credentials);
	$('#edit_effectiveTime').val(effectiveTime);
	$('#edit_remarks').val(remarks);
	
	$('#editModal').modal('show');
}

 //修改方法 
function edit(){
	var parame = {};
	var ID = $('#edit_ID').val();
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
		
	if (!equipmentName || typeof(equipmentName) == "undefined" || equipmentName.trim() == "") 
	{ 
		swal("仪器设备名称不能为空！");
		return;
	}
	if (!department || typeof(department) == "undefined" || department.trim() == "") 
	{ 
		swal("仪器设备所属部门不能为空！");
		return;
	}
	if (!equipmentType || typeof(equipmentType) == "undefined" || equipmentType.trim() == "") 
	{ 
		swal("仪器设备类型不能为空！");
		return;
	}
	if (!model || typeof(model) == "undefined" || model.trim() == "") 
	{ 
		swal("仪器设备型号不能为空！");
		return;
	}
	if (!buyTime || typeof(buyTime) == "undefined" || buyTime.trim() == "") 
	{ 
		swal("仪器设备购买时间不能为空！");
		return;
	}
	if (!useYear || typeof(useYear) == "undefined" || useYear.trim() == "") 
	{ 
		swal("仪器设备使用年限不能为空！");
		return;
	}
	if (!factoryCode || typeof(factoryCode) == "undefined" || factoryCode.trim() == "") 
	{ 
		swal("出厂编号不能为空！"); 
		return;
	}
	if (!credentials || typeof(credentials) == "undefined" || credentials.trim() == "") 
	{ 
		swal("证书编号不能为空！");
		return;
	}
	if (!effectiveTime || typeof(effectiveTime) == "undefined" || effectiveTime.trim() == "") 
	{ 
		swal("有效期不能为空！");
		return;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
		remarks = "";
	}
	if (effectiveTime <= buyTime) 
	{ 
		swal("时间先后顺序选择错误！"); 
		return;
	}
		parame.ID = ID;
		parame.equipmentName = equipmentName;
		parame.department = department;
		parame.equipmentType = equipmentType;
		parame.model = model;
		parame.buyTime = buyTime;
		parame.useYear = useYear;
		parame.factoryCode = factoryCode;
		parame.credentials = credentials;
		parame.effectiveTime = effectiveTime;
		parame.remarks = remarks;
		
		$.ajax({
		  url:'equipmentController/updEquipment.do',
		  data:parame,
		  success:function(o){
			  if(o <= 0){
					swal("修改失败!");
				}else if(o == 1){
					swal("修改成功!");
					$('#editModal').modal('hide');
					refrehTable();
				}
		  }
		});
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