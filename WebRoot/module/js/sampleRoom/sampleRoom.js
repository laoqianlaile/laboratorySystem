/**
 * 
 */

var param =new Object();
	param.startTime= $('#schStartTime').val();//初始化搜索文字
	param.endTime=$('#schEndTime').val();
	param.sampleName=$("#schSampleName").val();
	param.sampleType=$('#schSampleType').val();
	param.takeMan = $('#schTakeMan').val();
	param.giveMan = $('#schGiveMan').val();
	param.factoryCode = $("#factoryCode").val();
	param.receiptlistCode =  "";
	
var sample_global ={};
    sample_global.isAddEdit = true;
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
			width : '5%',// 宽度
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
		},{
			field : 'factoryCode',// 返回值名称
			title : '出厂编码',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '15%'// 宽度
		},{
			field : 'sampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '15%'// 宽度
		}, {
			field : 'type',// 返回值名称
			title : '规格/型号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示 receiptlistCode
			width : '5%'// 宽度
		}, {
			field : 'unit',// 返回值名称
			title : '单位',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		},{
			field : 'createTime',// 返回值名称
			title : '创建时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '15%'// 宽度
		}, {
			field : 'state',// 返回值名称
			title : '状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		},{
			field : 'remarks',// 返回值名称
			title : '备注',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		},{
			field:'',//返回值名称
			title:'操作',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'25%',//宽度
			formatter : function(value, row, index) { //操作按钮的设置
				  var view = "", edit = "", dele = ""; 
				  	if(row.ID != ""){   //没有交接单---就没有任何编辑，查看，删除等功能
				  		view = "<img src=\"../../img/view_icon.png\"  alt=\"查看\" onclick='showModal("+JSON.stringify(row)+")'>";
				        edit = "<img src=\"../../img/edit_icon.png\"  alt=\"编辑\" onclick='openModal("+JSON.stringify(row)+")'>";
				        dele = "<img src=\"../../img/delete_icon.png\" alt=\"删除\" onclick='deleSample(\""+row.ID+"\")'>";
				 
					return view + edit + dele;
				  }
		     }
		}]
	// 列配置项,详情请查看 列参数 表格
	/* 事件 */
	});
	initEvent();
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
		chen.alert("请至少选中一条数据");
		return;
	}

	var ids = "";
	for (var i = 0; i < data.length; i++) {
		ids += data[i].ID + ",";
	}


	var sampleIDs = ids.substring(0, (ids.length - 1));
	deleSample(sampleIDs);
	
}
function deleSample(sampleIDs){
	$.ajax({
		url : '/laboratorySystem/sampleController/delSample.do',
		dataType:"json",
		data : {
			sampleIDs : sampleIDs
		},
		success : function(o) {
			if (o == "false") {
				chen.alert("删除失败");
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
	if (!factoryCode || typeof (factoryCode) == "undefined" || factoryCode == '' ) 
		chen.alert("样品编号不能为空！");
	else if (!name || typeof (name) == "undefined" || name == '' ) {
		chen.alert("样品名称不能为空！");
	} else if(!sampleType || typeof (sampleType) == "undefined" || sampleType == ''){
		chen.alert("样品型号规格不能为空！");
	}else  if(  sample_global.isAddEdit == true){
	//	parame.receiptlistCode =  $('#addReceiptlistCode').val();
		parame.sampleName = name;
		parame.sampleType =sampleType;  
		parame.remarks = $('#addRemarks').val();
		parame.unit= $('#addUnit').val();
		parame.factoryCode = factoryCode;
		console.log(parame);
		$.ajax({
			type:"post",
			url : '/laboratorySystem/sampleController/addSample.do',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",  //中文乱码
			dataType:"json",
			data : parame,
			success : function(o) {
				if (o == "false") {
					chen.alert("新增失败");
				}
				else {
					 $('#addModal').modal('hide');
					 refresh();
				}
				
			}
		});
		
	} else chen.alert("请重新输入出厂编码");
}

/* 弹出查看弹框方法 */
function showModal(data) {
	/*
	 * var frameSrc = "module/jsp/roleManage/testFrame.html";
	 * $("#NoPermissioniframe").attr("src", frameSrc);
	 * $('#NoPermissionModal').modal({ show: true, backdrop: 'static' });
	 */

/*	var data = $('#table').bootstrapTable('getSelections');

	if (data.length == 0 || data.length > 1) {
		chen.alert("请选中一条数据");
		return;
	}*/
	fillLookEdit(data,"look");
	//设置属性不可编辑 
	
	//显示页面
	$('#showModal').modal('show');
}

/* 弹出修改弹框方法 */
function openModal(data) {
 
	fillLookEdit(data,"edit");
	$('#editModal').modal('show');
}
function  initEvent(){ 
	 
}
function set_alert_wb_comment(the,state){
	chen.alert(state);
	chen.alert($(the).val());
	var html="";
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
	 else  {
		   factoryCode = $("#editFactoryCode").val();
		   var data= $('#table').bootstrapTable('getSelections')[0];
		   if(data.factoryCode == factoryCode){ //没有改变编码
			   sample_global.isAddEdit = true;
			   return ;
		   }
	 }
	 
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
					 chen.alert("出厂编码已经存在--请重新输入出厂编码");
					 sample_global.isAddEdit = false;
				}
				else  sample_global.isAddEdit = true;
				
			}
		});
 }
/* 修改方法 */
function edit(){


	var parame = {};
	var name = $('#editSampleName').val();
	var sampleType= $('#editSampleType').val();
	var factoryCode = $("#editFactoryCode").val();
	if (!name ||  typeof (name) == "undefined" || name == '' ) {
		chen.alert("样品名称不能为空！");
	} else if(!sampleType ||  typeof (sampleType) == "undefined" || sampleType == ''){
		chen.alert("样品型号规格不能为空！");
	}else if(  sample_global.isAddEdit == true){
	
		parame.sampleName = name;
		parame.sampleType =sampleType;
		parame.remarks = $('#editRemarks').val();
		parame.unit= $('#editUnit').val();
		parame.factoryCode = factoryCode;
		parame.ID =$("#editSampleID").val();
	/*	parame.linkID = data.linkID;
		parame.receiptlistCode =  $('#editReceiptlistCode').val();
		parame.reID = $('#editReceiptlistCode').val();*/
		console.log(parame);
		$.ajax({
			type:"post",
			url : '/laboratorySystem/sampleController/updateSample.do',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",  //中文乱码
			dataType:"json",
			data : parame,
			success : function(o) {
				if (o == "false") {
					chen.alert("修改失败");
				}
				else {
					 $('#editModal').modal('hide');
					 refresh();
				}
			}
		});
		
	} else chen.alert("请重新输入出厂编码");

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
function fillLookEdit(dataS,state){
	//var dataS = getOneDate(id);
	 console.log(dataS);
	 chenkData(dataS);
	if(state == "look"){
	   //填充查看页面的
	   $('#lookSampleName').val(dataS.sampleName);
	   $('#lookSampleType').val(dataS.type);
	   $('#lookUnit').val(dataS.unit);
	   $('#lookRemarks').val(dataS.remarks);
	 //$('#lookCreateTime').val(dataS.createTime);
	   $("#lookFactoryCode").val(dataS.factoryCode);
	   
	  //设置不可编辑
	    $("#lookFactoryCode").attr("disabled",true);
	    $('#lookSampleName').attr("disabled",true);
		$('#lookSampleType').attr("disabled",true);
		$('#lookUnit').attr("disabled","true");
		$('#lookRemarks').attr("disabled","true");
		
		//设置灰色
		$('#lookSampleName').addClass("backgray");
		$('#lookSampleType').addClass("backgray");
		//$('#lookUnit').addClass("backgray");
		$('#lookRemarks').addClass("backgray");
		$('#lookReceiptlistCode').addClass("backgray");
		$('#lookFactoryCode').addClass("backgray");
	}
	//填充编辑页面的
	else{
		$('#editSampleName').val(dataS.sampleName);
		$('#editSampleID').val(dataS.ID);
		$('#editSampleType').val(dataS.type);
		$('#editUnit').val(dataS.unit);
		$('#editRemarks').val(dataS.remarks);
		//$('#editCreateTime').val(dataS.createTime);
		$("#editFactoryCode").val(dataS.factoryCode);
		//  $('#editReceiptlistCode').text(dataS.receiptlistCode);
		//  $('#editReceiptlistCode').val(dataS.reID);
		$('#editRemarks').val(dataS.remarks);
	}
	
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
			
		//	dataS = eval("("+data+")");
			dataS = JSON.parse(data);
			console.log(dataS);
			
		}
	});
	return dataS;
}

