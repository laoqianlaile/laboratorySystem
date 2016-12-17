/**
 * 
 */

var param ={};
	param.startTime= $('#schStartTime').val();//初始化搜索文字
	param.endTime=$('#schEndTime').val();
	param.sampleName=$("#schSampleName").val();
	param.sampleType=$('#schSampleType').val();
	param.takeMan = $('#schTakeMan').val();
	param.giveMan = $('#schGiveMan').val();
	param.factoryCode = $("#factoryCode").val();
	param.receiptlistCode =  "";
/* 初始化数据 */
$(function() {
	
	$('#table').bootstrapTable({
		// 定义表格的高度height: 500,
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 3,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 3, 5, 9, 10 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'ID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url :'/laboratorySystem/sampleController/getSampleWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		method:"post",
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',// 发送到服务器的数据编码类型
		dataType :'json',// 服务器返回的数据类型
		queryParams: function queryParams(params) {
			 param.limit= params.limit;//页面大小  
			 param.offset= params.offset; //偏移量 
			 param.search = "";
			 param.sort= params.sort; //排序列名  
			 param.order= params.order; //排位命令（desc，asc）
			 return param;
		}, //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
                                      //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',// radio or checkbox 的字段名
		onLoadSuccess:function(data){
			console.log(data);
		},
		columns : [{
			checkbox : true,
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '5',// 宽度
			formatter:function(value, row, index){
				chenkData(row);
			}
		}, {
			field : 'ID',// 返回值名称
			title : '样品ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10',// 宽度
			visible : false
		}, {
			field : 'reID',// 返回值名称
			title : '交接单ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10',// 宽度
			visible : false
		}, {
			field : 'linkID',// 返回值名称
			title : '样品库ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10',// 宽度
			visible : false
		},{
			field : 'factoryCode',// 返回值名称
			title : '出厂编码',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		},{
			field : 'sampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'type',// 返回值名称
			title : '规格/型号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示 receiptlistCode
			width : '10'// 宽度
		}, {
			field : 'receiptlistCode',// 返回值名称
			title : '交接单号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		},{
			field : 'unit',// 返回值名称
			title : '单位',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		},{
			field : 'takeTime',// 返回值名称
			title : '取样时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		},{
			field : 'createTime',// 返回值名称
			title : '创建时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		}, {
			field : 'remarks',// 返回值名称
			title : '备注',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10'// 宽度
		} ]
	// 列配置项,详情请查看 列参数 表格
	/* 事件 */
	});
});

/* 查询方法 */
function seacher() { 
	//查询的时候 他的limit 会依据页面上的数保留 不会变0
	var param = {};
	param.startTime= $('#schStartTime').val();//初始化搜索文字
	param.endTime=$('#schEndTime').val();
	param.sampleName=$("#schSampleName").val();
	param.sampleType=$('#schSampleType').val();
	param.takeMan = $('#schTakeMan').val();
	param.giveMan = $('#schGiveMan').val();
	param.factoryCode = $("#schFactoryCode").val();
	param.receiptlistCode =  $('#schReceiptlistCode').val();
	$('#table').bootstrapTable('refresh', {
		silent:true,
		url:"/laboratorySystem/sampleController/getSampleWithPaging.do",
		query:param
	});
}

/* 刷新方法 */
function refresh() {
/*	$("#schSampleName").val("");
	$('#schSampleType').val("");
	 $('#schStartTime').val("");
	 $('#schEndTime').val("");*/

	$('#table').bootstrapTable('refresh', {
		silent:true,
		url:"/laboratorySystem/sampleController/getSampleWithPaging.do",
		query:{
			startTime:"",
			endTime:"",
			sampleName:"",
			giveMan:"",
			takeMan:"",
			factoryCode:"",
			receiptlistCode:"",
			sampleType:""
		}
	
	});
}

/* 删除方法 */
function delData() {
	var data = $('#table').bootstrapTable('getSelections');
    //弹出确认框
	if (data.length == 0) {
		alert("请至少选中一条数据");
		return;
	}

	var ids = "";
	for (var i = 0; i < data.length; i++) {
		ids += data[i].ID + ",";
	}

	var ajaxParameter = {
			roleIDs : ids.substring(0, (ids.length - 1))
	};

	$.ajax({
		url : '/laboratorySystem/sampleController/delSample.do',
		dataType:"json",
		data : ajaxParameter,
		success : function(o) {
			if (o == false) {
				alert("删除失败");
			}
			refresh();
		}
	});
}

/* 新增方法 */
function add() {
	var parame = {};
	var name = $('#addSampleName').val();
	var sampleType= $('#addSampleType').val();
	var factoryCode = $("#addFactoryCode").val();
	if (!name && typeof (name) != "undefined" && name == '' ) {
		alert("样品名称不能为空！");
	} else if(!sampleType && typeof (sampleType) != "undefined" && sampleType == ''){
		alert("样品型号规格不能为空！");
	}else {
		parame.receiptlistCode =  $('#addReceiptlistCode').val();
		parame.sampleName = name;
		parame.sampleType =sampleType;
		parame.remarks = $('#addRemarks').val();
		parame.unit= $('#addUnit').val();
		parame.factoryCode = factoryCode;
		console.log(parame);
		$.ajax({
			type:"post",
			url : '/laboratorySystem/sampleController/addLinkSample.do',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",  //中文乱码
			dataType:"json",
			data : parame,
			success : function(o) {
				if (o == "false") {
					alert("新增失败");
				}
				else if( o  == "codeExit")
					alert("出厂编码已经存在");
				else {
					 $('#addModal').modal('hide');
					 refresh();
				}
				
			}
		});
		
	}
}

/* 弹出查看弹框方法 */
function showModal() {
	/*
	 * var frameSrc = "module/jsp/roleManage/testFrame.html";
	 * $("#NoPermissioniframe").attr("src", frameSrc);
	 * $('#NoPermissionModal').modal({ show: true, backdrop: 'static' });
	 */

	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}
	fillLookEdit(data[0]);
	//设置属性不可编辑 ???
	
	$('#lookSampleName').css("readOnly","true");
	$('#lookSampleType').css("readOnly","true");
	$('#lookUnit').css("readOnly","true");
	$('#lookRemarks').css("readOnly","true");
	
	//设置灰色
	$('#lookSampleName').addClass("backgray");
	$('#lookSampleType').addClass("backgray");
	$('#lookUnit').addClass("backgray");
	$('#lookRemarks').addClass("backgray");
	$('#lookReceiptlistCode').addClass("backgray");
	$('#lookFactoryCode').addClass("backgray");
	//显示页面
	$('#showModal').modal('show');
}

/* 弹出修改弹框方法 */
function openModal() {
	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		alert("请选中一条数据");
		return;
	}
	// var ids = data[0].ROLEID;
	fillLookEdit(data[0]);
	$('#editModal').modal('show');
}
/**
 * 
 * @returns
 */
function isNoramlPhone(phone){
	if(phone == undefined || phone == null || phone ==""){
		return true ;
	}
	else {
		 var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
		 if (reg.test(phone)) {
		     return true;
		 }else{
			 return false;
		 }
	}
}
 function isExitFactory(who){
	 var factoryCode = "";
	 if(who == "add")
	  factoryCode = $("#addFactoryCode").val();
	 else  factoryCode = $("#editFactoryCode").val();
	 $.ajax({
			type:"post",
			url : '/laboratorySystem/sampleController/isExitFactory.do',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",  //中文乱码
			dataType:"json",
			data : {
				factoryCode :factoryCode
			},
			success : function(o) {
				if (o == "true") {
					 alert("出厂编码已经存在");
				}
				
			}
		});
 }
/* 修改方法 */
function edit(){
	var data= $('#table').bootstrapTable('getSelections')[0];
	console.log(data);
	var id = data.ID;
	var parame = {};
	var name = $('#editSampleName').val();
	var sampleType= $('#editSampleType').val();
	var factoryCode = $("#editFactoryCode").val();
	if (!name && typeof (name) != "undefined" && name == '' ) {
		alert("样品名称不能为空！");
	} else if(!sampleType && typeof (sampleType) != "undefined" && sampleType == ''){
		alert("样品型号规格不能为空！");
	}else {
		parame.receiptlistCode =  $('#editReceiptlistCode').val();
		parame.sampleName = name;
		parame.sampleType =sampleType;
		parame.remarks = $('#editRemarks').val();
		parame.unit= $('#editUnit').val();
		parame.factoryCode = factoryCode;
		parame.linkID = data.linkID;
		parame.reID = $('#editReceiptlistCode').val();
		console.log(parame);
		$.ajax({
			type:"post",
			url : '/laboratorySystem/sampleController/updateLinkSample.do',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",  //中文乱码
			dataType:"json",
			data : parame,
			success : function(o) {
				if (o == "false") {
					alert("修改失败");
				}
				else if( o == "codeExit")
					 alert("出厂编码已经存在");
				else {
					 $('#editModal').modal('hide');
					 refresh();
				}
			}
		});
		
	}

}
//检查数据是否合理
function chenkData(dataObj){  //后台数据字段为空就不会传上来
	var data = $('#table').bootstrapTable('getSelections')[0];
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("name") || dataObj.name == null
			|| dataObj.name.trim() == "NULL") {
		dataObj.name = "";
	}
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null
			|| dataObj.factoryCode.trim() == "NULL") {
		dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("type") || dataObj.type == null
			|| dataObj.type.trim() == "NULL") {
		dataObj.type = "";
	}
	if (!dataObj.hasOwnProperty("unit") || dataObj.unit == null
			|| dataObj.unit.trim() == "NULL") {
		dataObj.unit = "";
	}
	if (!dataObj.hasOwnProperty("receiptlistCode") || dataObj.receiptlistCode == null
			|| dataObj.receiptlistCode.trim() == "NULL") {
		dataObj.receiptlistCode = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks.trim() == "NULL") {
		dataObj.remarks = "";
	}
}
function fillLookEdit(dataS){
	//var dataS = getOneDate(id);
	 console.log(dataS);
	 chenkData(dataS);
	
	//填充查看页面的
	$('#lookSampleName').val(dataS.name);
	$('#lookSampleType').val(dataS.type);
	$('#lookUnit').val(dataS.unit);
	$('#lookRemarks').val(dataS.remarks);
	$('#lookCreateTime').val(dataS.createTime);
	 $("#lookFactoryCode").val(dataS.factoryCode);
	  $('#lookReceiptlistCode').text(dataS.receiptlistCode);
	  $('#lookReceiptlistCode').val(dataS.reID);
	  $('#lookRemarks').val(dataS.remarks);
	//填充编辑页面的
	  $('#editSampleName').val(dataS.name);
		$('#editSampleType').val(dataS.type);
		$('#editUnit').val(dataS.unit);
		$('#editRemarks').val(dataS.remarks);
		$('#editCreateTime').val(dataS.createTime);
		 $("#editFactoryCode").val(dataS.factoryCode);
		  $('#editReceiptlistCode').text(dataS.receiptlistCode);
		  $('#editReceiptlistCode').val(dataS.reID);
		  $('#editRemarks').val(dataS.remarks);
	
}
function getOneDate(id){
	var dataS ;
	$.ajax({
		type:"post",
		async: false,
		url : '/laboratorySystem/sampleController/getSample.do',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",  //中文乱码
		data :{
			sampleID:id
		},
		dataType:"json",
		success : function(data) {
			
			dataS = eval("("+data+")");
			
		}
	});
	return dataS;
}

