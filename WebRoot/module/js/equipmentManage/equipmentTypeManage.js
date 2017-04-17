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
		sortName : 'typeCode',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'equipmentTypeController/getEquipmentTypeWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.equipmentTypeCode = $.trim($('#schEquipmentTypeCode').val());
			param.equipmentTypeName = $.trim($('#schEquipmentName').val());
			return param;
		}, //参数
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :'5%',// 宽度
			formatter : function(value, row, index) {
				checkData(row);	 //验证数据合理性					
			}
		},{
			field:'ID',//返回值名称
			title:'设备类型ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
			visible:false
		},{
			field:'typeCode',//返回值名称
			title:'设备类型编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'22%',//宽度
//			visible:false
		},{
			field:'name',//返回值名称
			title:'设备类型名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'23%'//宽度
		},{
			field:'createTime',//返回值名称
			title:'登记时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'18%'//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'32%'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//检查仪器类型数据是否合理并处理
function checkData(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null || dataObj.ID == undefined || dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("name") || dataObj.name == null || dataObj.name == undefined || dataObj.name.trim() == "") {
		dataObj.name = "";
	}
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null || dataObj.factoryCode == undefined || dataObj.factoryCode.trim() == "") {
		  dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null || dataObj.createTime == undefined || dataObj.createTime.trim() == "") {
		dataObj.createTime = "";
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
		sort : 'typeCode',
		order : 'asc',
		equipmentType : $.trim($('#schEquipmentTypeCode').val()),
		equipmentName : $.trim($('#schEquipmentTypeName').val()),
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
/**
 * 刷新表格
 */
function refrehTable() {
	$('#table').bootstrapTable('refresh', null);
}
/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/equipmentManage/equipmentTypeManage.jsp";
}

/* 删除方法 */
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0){
		swal("请至少选中一条数据");
		return;
	}
	var ids = "";
	var message = "将要删除仪器类型：";
	for(var i=0; i<data.length; i++){
		ids += "ID = '" + data[i].ID + "' or ";
		message += data[i].name + " or ";
	}
	var ajaxParameter = {
		equipmentTypeIds:ids.substring(0, (ids.length-3))	
	};
	swal({
		title: message.substring(0, (message.length-3)),
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
		},
		function(){		
			$.ajax({
			  url:'equipmentTypeController/delEquipmentType.do',
			  type:"post",
			  data:ajaxParameter,
			  success:function(o){
				  if(o > 0){
					  swal("删除成功！");
					  setTimeout(refresh, 1000);
				  }else if(o == 0){
					  swal("删除失败！");
				  }else{
					  swal("出现未知错误，请重试！");
				  }
			  },
			  error : function() {
				return false;
			  }
		});
	});
}

/*
 * 判断设备类型名称是否存在(add)
 */
function isTypeExistA(){
	var name = $('#add_equipmentTypeName').val(); 
	if (name && typeof(name) != "undefined" && name.trim() != "") 
	{ 
		var parame = {};
		parame.equipmentTypeName = $('#add_equipmentTypeName').val();
		
		$.ajax({
			  url:'equipmentTypeController/isTypeExist.do',
			  data:parame,
			  success:function(o){
				  if(o>0){
					  swal("该设备类型名称已存档");
					  var n= "";
					  $('#add_equipmentTypeName').val(n);
				  }
			  }
			});
	}
}

/*
 * 判断设备类型编号是否存在(add)
 */
function isCodeExistA(){
	var code = $('#add_equipmentTypeCode').val(); 
	if (code && typeof(code) != "undefined" && code.trim() != "") 
	{
		var parame = {};
		parame.equipmentTypeCode = code;
		
		$.ajax({
			  url:'equipmentTypeController/isCodeExist.do',
			  data:parame,
			  success:function(o){
				  if(o>0){
					  swal("该设备类型名称编号已存档");
					  var n="";
					  $('#add_equipmentTypeCode').val(n);
				  }
			  }
			});
	}
}

/*
 * 判断设备类型名称是否存在(edit)
 */
function isTypeExistE(){
	var name1 = $('#edit_equipmentTypeName').val();
	var name2 = $('#edit_equipmentTypeName').attr("name");
	if (name1 && typeof(name1) != "undefined" && name1.trim() != "") 
	{
		if(name1 == name2){
			return;
		}
		var parame = {};
		parame.equipmentTypeName = name1;
		
		$.ajax({
			  url:'equipmentTypeController/isTypeExist.do',
			  data:parame,
			  success:function(o){
				  if(o>0){
					  swal("该设备类型名称已存档");
					  var n= "";
					  $('#add_equipmentTypeName').val(n);
				  }
			  }
			});
	}
}

/*
 * 判断设备类型编号是否存在(edit)
 */
function isCodeExistE(){
	var code1 = $('#edit_equipmentTypeCode').val();
	var code2 = $('#edit_equipmentTypeCode').attr("name");
	if (code1 && typeof(code1) != "undefined" && code1.trim() != "") 
	{
		if(code1 == code2){
			return;
		}
		var parame = {};
		parame.equipmentTypeCode = code1;
		
		$.ajax({
			  url:'equipmentTypeController/isCodeExist.do',
			  data:parame,
			  success:function(o){
				  if(o>0){
					  swal("该设备类型名称编号已存档");
					  var n="";
					  $('#add_equipmentTypeCode').val(n);
				  }
			  }
			});
	}
}

/* 新增方法  */
function add(){
	var equipmentTypeCode = $('#add_equipmentTypeCode').val();
	var equipmentTypeName = $('#add_equipmentTypeName').val();
    var remarks = $('#add_remarks').val();
    
    if(!equipmentTypeCode || typeof(equipmentTypeCode) == "undefined" || equipmentTypeCode.trim() == ""){
    	swal("设备类型编号不能为空！");
    	return;
    }
    if(!equipmentTypeName || typeof(equipmentTypeName) == "undefined" || equipmentTypeName.trim() == ""){
    	swal("设备类型名称不能为空！");
    	return;
    }
    if(!remarks || typeof(remarks) == "undefined" || remarks.trim() == ""){
    	remarks = "";
    }
    
	var parame = {};
	parame.equipmentTypeCode = equipmentTypeCode;
	parame.equipmentTypeName = equipmentTypeName;
	parame.remarks = remarks;

	$.ajax({
		url : 'equipmentTypeController/addEquipmentType.do',
		data : parame,
		success : function(o) {
			if(o == 0){
				swal("新增失败!");
			}else if(o == 1){
				swal("新增成功!");
				$('#addModal').modal('hide');
				setTimeout(refresh, 1000);
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
	var typeCode =  data[0].typeCode;
	var name =  data[0].name;
	if (typeCode == null || typeCode.trim() == "" || typeCode == "undefined") {
		typeCode = "";
	}
	if (name == null || name.trim() == "" || name == "undefined") {
		name = "";
	}
	 
	$('#edit_equipmentTypeCode').attr({'value' : "" + typeCode + ""});
	$('#edit_equipmentTypeCode').attr({'name' : "" + typeCode + ""});
	$('#edit_equipmentTypeName').attr({'value' : "" + name + ""});
	$('#edit_equipmentTypeName').attr({'name' : "" + name + ""});
	$('#edit_remarks').val(data[0].remarks);
	
	$('#editModal').modal('show');
	getEquipmentTypeID();
}

//得到需要修改的仪器的ID
function getEquipmentTypeID(){
	var code = $('#edit_equipmentTypeCode').val();
	if (!code || typeof(code) == "undefined" || code.trim() == "") 
	{ 
		swal("合同编号不能为空！"); 
	}else {
		var parame = {};
		parame.equipmentTypeCode = code;
		$.ajax({  
		     url:'equipmentTypeController/getIdByCode.do',// 跳转到 action
		     type:'post', 
		     data:parame,
		     dataType:'json',
		     success:getid=function(data){
		    	 if (data) {
		    		 var id,ID,htmlElement="";
		    		 var myobj = JSON.parse(data);
		    		 ID = myobj[0].ID;
		    		 id = $("#IDid");
		    		 $("#EquipmentTypeid").remove();
		    		 htmlElement += "<div id='EquipmentTypeid' style='display:none' class='col-xs-12 col-md-12'>" +
	                   "<h4>合同ID：</h4>" +
		    			 "<input type='text' id='EquipmentTypeID' value='" + ID + "' name='ID' class='form-control' aria-describedby='basic-addon1'></input>"+
		    			"</div>";
		    		 id.append(htmlElement);
		    		 }
		    	 } 
		     });
		}
}

 //修改方法 
function edit(){
	var equipmentTypeCode = $('#edit_equipmentTypeCode').val();
	var equipmentTypeName = $('#edit_equipmentTypeName').val();
    var remarks = $('#edit_remarks').val();
    
    if(!equipmentTypeCode || typeof(equipmentTypeCode) == "undefined" || equipmentTypeCode.trim() == ""){
    	swal("设备类型编号不能为空！");
    	return;
    }
    if(!equipmentTypeName || typeof(equipmentTypeName) == "undefined" || equipmentTypeName.trim() == ""){
    	swal("设备类型名称不能为空！");
    	return;
    }
    if(!remarks || typeof(remarks) == "undefined" || remarks.trim() == ""){
    	remarks = "";
    }
    
	var parame = {};
	parame.ID = $('#EquipmentTypeID').val();
	parame.equipmentTypeCode = equipmentTypeCode;
	parame.equipmentTypeName = equipmentTypeName;
	parame.remarks = remarks;

	$.ajax({
		url : 'equipmentTypeController/updEquipmentType.do',
		type : 'post',
		data : parame,
		dataType : 'json',
		success : function(o) {
			if(o == 0){
				swal("修改失败!");
			}else if(o == 1){
				swal("修改成功!");
				$('#editModal').modal('hide');
				refrehTable();
			}
		},
		error : function(o) {
			console.log(o);
		}
	});
}