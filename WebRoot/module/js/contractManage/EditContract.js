// 请求数据时的额外参数
var param = {};

$(function() {
	setID();
	getContractByID();
	updateContractFileID();
	uploadFile();
});

//初始化数据
function initContractFile(){
	var num = 1;
	$("#show_contractFile").bootstrapTable({
		//height : 200,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 3,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 3 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'uploadTime',// 定义排序列
		sortOrder : 'desc',// 定义排序方式
		url:'fileInformationController/getContractFileWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			num = params.offset;
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.ID = $.trim($('#edit_contractID').val())
			return param;
		}, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		/*onLoadSuccess : function(data) {
			checkDate(data, "file");
			//console.log(data);
		},*/
		columns:[{
			title : '序号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '5%',// 宽度
			visible : true,
			formatter : function(value, row, index) {
				checkDate(row, "file");
				return num+1;
			}
		},{
			field:'ID',//返回值名称
			title:'文件ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"5%",//宽度
			visible:false
		},{
			field:'fileName',//返回值名称
			title:'文件名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"31%",//宽度
		},{
			field:'uploaderID',//返回值名称
			title:'上传人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"5%",//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'上传人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"12%",//宽度
		},{
			field:'uploadTime',//返回值名称
			title:'上传时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"19%",//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"17%",//宽度
		},{
			field:'',
			title:'操作',
			align:'center',
			valign:'middle',
			width:"20%",
			formatter:function(value,row,index){    
                 var a = "<img src ='module/img/download_icon.png' onclick='downFile(\""+ row.ID +"\")' title='下载合同文件' style='cursor:pointer;padding-right:8px;'></img>";
                 var b = "<img src ='module/img/view_icon.png' onclick='openFile(\""+ row.ID +"\")' title='查看合同文件' style='cursor:pointer;padding-right:8px;'></img>";
                 var c = "<img src ='module/img/delete_icon.png' onclick='delFile(\""+ row.ID +"\",\"" + row.fileName +"\")' title='删除合同文件' style='cursor:pointer;padding-right:8px;'></img>";
                 return a+b+c;
          }   
		}]////列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

/*//请求数据时的额外参数
function fileQueryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'uploadTime', 
		order : 'asc',
		ID : $.trim($('#edit_contractID').val())
	};
    return searchCondition;
}*/

/*//请求数据时的额外参数
function itemQueryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'ID', 
		order : 'asc',
		ID : $.trim($('#edit_contractID').val())
	};
    return searchCondition;
}*/

//得到地址栏参数的值
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)
    	 return  unescape(r[2]);
     return null;
}

/* 刷新方法 */
function refresh(){
	var ID = $('#edit_contractID').val();
	window.location.href="module/jsp/contractManage/EditContract.jsp?ID=" + ID;
}

function setID(){
	var ID = GetQueryString("ID");
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID不能为空！"); 
	}
	$('#edit_contractID').val(ID);
}

//得到合同的信息
function getContractByID(){
	var ID = $('#edit_contractID').val();
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID不能为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		$.ajax({  
		     url:'contractController/getContractByID.do',// 跳转到 action
		     type:'post', 
		     data:parame,
		     dataType:'json',
		     success:getid=function(data){
		    	 if (data) {
		    		var myobj = JSON.parse(data);
		    		checkDate(myobj, "con");
		    		if(myobj[0].contractCode == undefined){
		    			$('#edit_contractCode').text(myobj.contractCode);
		    			$('#edit_contractCode').attr({'value' : "" + myobj.contractCode + ""});
		    		}else{
		    			$('#edit_contractCode').text(myobj[0].contractCode);
		    			$('#edit_contractCode').attr({'value' : "" + myobj[0].contractCode + ""});
		    		}
		    		if(myobj[0].contractName == undefined){
		    			$('#edit_contractName').attr({'value' : "" + myobj.contractName + ""});
		    		}else{
		    			$('#edit_contractName').attr({'value' : "" + myobj[0].contractName + ""});
		    		}
		    		if(myobj[0].address == undefined){
		    			$('#edit_address').attr({'value' : "" + myobj.address + ""});
		    		}else{
		    			$('#edit_address').attr({'value' : "" + myobj[0].address + ""});
		    		}
		    		if(myobj[0].signAddress == undefined){
		    			$('#edit_signAddress').attr({'value' : "" + myobj.signAddress + ""});
		    		}else{
		    			$('#edit_signAddress').attr({'value' : "" + myobj[0].signAddress + ""});
		    		}
		    		if(myobj[0].companyName == undefined){
		    			$('#edit_companyName').attr({'value' : "" + myobj.companyName + "",'name' : "" + myobj[0].companyID + ""});
		    		}else{
		    			$('#edit_companyName').attr({'value' : "" + myobj[0].companyName + "",'name' : "" + myobj[0].companyID + ""});
		    		}
		    		if(myobj[0].oppositeMen == undefined){
		    			$('#edit_oppositeMen').attr({'value' : "" + myobj.oppositeMen + ""});
		    		}else{
		    			$('#edit_oppositeMen').attr({'value' : "" + myobj[0].oppositeMen + ""});
		    		}
		    		if(myobj[0].linkPhone == undefined){
		    			$('#edit_linkPhone').attr({'value' : "" + myobj.linkPhone + ""});
		    		}else{
		    			$('#edit_linkPhone').attr({'value' : "" + myobj[0].linkPhone + ""});
		    		}
		    		if(myobj[0].startTime == undefined){
		    			$('#edit_startTime').attr({'value' : "" + myobj.startTime + ""});
		    		}else{
		    			$('#edit_startTime').attr({'value' : "" + myobj[0].startTime + ""});
		    		}
		    		if(myobj[0].endTime == undefined){
		    			$('#edit_endTime').attr({'value' : "" + myobj.endTime + ""});
		    		}else{
		    			$('#edit_endTime').attr({'value' : "" + myobj[0].endTime + ""});
		    		}
		    		if(myobj[0].employeeName == undefined){
		    			$('#edit_employeeName').attr({'value' : "" + myobj.employeeName + "",'name' : "" + myobj[0].employeeID + ""});
		    		}else{
		    			$('#edit_employeeName').attr({'value' : "" + myobj[0].employeeName + "",'name' : "" + myobj[0].employeeID + ""});
		    		}
		    		if(myobj[0].signTime == undefined){
		    			$('#edit_signTime').attr({'value' : "" + myobj.signTime + ""});
		    		}else{
		    			$('#edit_signTime').attr({'value' : "" + myobj[0].signTime + ""});
		    		}
		    		if(myobj[0].contractAmount == undefined){
		    			$('#edit_contractAmount').attr({'value' : "" + myobj.contractAmount + ""});
		    		}else{
		    			$('#edit_contractAmount').attr({'value' : "" + myobj[0].contractAmount + ""});
		    		}
		    		if(myobj[0].isClassified == "1"){
		    			$('#r1').prop('checked','true');
		    			$('#r2').prop('checked','');
		    		}else if(myobj[0].isClassified == "0"){
		    			$('#r1').prop('checked','');
		    			$('#r2').prop('checked','true');
		    		}
		    		if(myobj[0].classifiedLevel == undefined){
		    			$('#edit_classifiedLevel').attr({'value' : "" + myobj.classifiedLevel + ""});
		    		}else{
		    			$('#edit_classifiedLevel').attr({'value' : "" + myobj[0].classifiedLevel + ""});
		    			$('#edit_classifiedLevel').val(myobj[0].classifiedLevel);
		    		}
		    		initContractFile();
		    		initContractFileItem();
		    		}
		    	 }
		});
	}
}

function openTemplateModal(){
	$('#templateModal').modal('show');
	initContractTemplateFile();
}

//初始化数据
function initContractTemplateFile(){
	$("#show_template").bootstrapTable({
		//height : 200,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 3,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 3 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'createTime',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'fileInformationController/getContractTemplateFileWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			return param;
		}, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :'3%',// 宽度
			formatter : function(value, row, index) {
				checkDate(row, "template");
			}
		},{
			field:'ID',//返回值名称
			title:'模版ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"5%",//宽度
			visible:false
		},{
			field:'fileID',//返回值名称
			title:'文件ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"5%",//宽度
			visible:false
		},{
			field:'name',//返回值名称
			title:'模版名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"25%",//宽度
		},{
			field:'fileName',//返回值名称
			title:'文件名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"30%",//宽度
		},{
			field:'createTime',//返回值名称
			title:'创建时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"12%",//宽度
		},{
			field:'templateType',//返回值名称
			title:'模版类型',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:"12%",//宽度
		}]////列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//新增成功后操作
function refrehContractTemplateTable() {
	$('#show_template').bootstrapTable('refresh', null);
}

/**
 * 生成合同文件
 */
function coverContractFile(){
	var data = $('#show_template').bootstrapTable('getSelections');
	if(data.length==0){
		swal("请至少选中一条数据");
		return;
	}
	var fileID = data[0].fileID;
	if (!fileID || typeof(fileID) == "undefined" || fileID.trim() == "") 
	{ 
		swal("合同文件ID为空！"); 
	}
	swal("正在生成合同，请等候！"); 
	var ID = GetQueryString("ID");; 
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		parame.fileID = fileID;
		
			$.ajax({
			  url:'contractController/coverContractFile.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  if(o == -3){
					  swal("不存在合同模板文件!");
				  }else if(o == -4){
					  swal("合同模板文件被删除!");
				  }else if(o == 1){
					  swal("合同已生成！"); 
					  setTimeout(refresh, 1000);
				  }
			  },
			  error:function(o){
				  console.log(o);
			  }
			});
	}
}

/**
 * 下载文件
 * @param id
 */
function downFile(id){
	downOneFile(id);
}

/**
 * 下载模版文件
 * @param id
 */
function tdownFile(){
	var data = $('#show_template').bootstrapTable('getSelections');
	if(data.length==0){
		swal("请至少选中一条数据");
		return;
	}
	var fileID = data[0].fileID;
	if (!fileID || typeof(fileID) == "undefined" || fileID.trim() == "") 
	{ 
		swal("合同文件ID为空！"); 
	}else{
		downOneFile(fileID);
	}
}

function openFile(id){
	$.post("fileOperateController/onlinePreview.do", {
		ID : id
	}, function(result) {
		result = eval(result);
		if (result != null && result != "null") {
			window.location.href = "module/jsp/documentOnlineView.jsp";
		} else {
			swal("无法查看");
		}
	});
}

//删除合同的文件
function delFile(id,fileName) {
	var data;
	swal({
		title: "确认删除：" + fileName,
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
		},
		function(){	 
		   $.ajax({
			url : 'fileInformationController/deleteFileByID.do',
			dataType : "json",
			async : false,
			data : {
				fileID : id
			},
			success : function(o) {
				 data = JSON.parse(o); // error
				if (data == true) {
					swal("delete sunceesul");
				} else {
					swal("delete faire");
				}
			},
			error : function() {
				return false;
			}
		});
		refresh();
		//$('#fileTable').bootstrapTable('refresh',null);  
	});  
}

//初始化数据(检测合同细项)
function initContractFileItem1(){
	var num = 1;
	$("#show_contractFileItem").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 4,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 4 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'ID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'contractFineItemController/getContractFileItemWithPaging1.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			num = params.offset;
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.ID = $.trim($('#edit_contractID').val())
			return param;
		}, //参数
	    queryParamsType: "limit", 	
		selectItemName : '',// radio or checkbox 的字段名
		columns:[{
			title : '序号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '5%',// 宽度
			formatter : function(value, row, index) {
				checkDate(row, "item1");
				return num+1;
			}
		},{
			field:'ID',//返回值名称
			title:'合同细项ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'fineItemCode',//返回值名称
			title:'合同细项编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'18%',//宽度
		},{
			field:'testProjectID',//返回值名称
			title:'检测项目ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'nameCn',//返回值名称
			title:'检测项目(中文)',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'nameEn',//返回值名称
			title:'检测项目(English)',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'isOutsourcing',//返回值名称
			title:'是否外包',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'money',//返回值名称
			title:'金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'price',//返回值名称
			title:'单价',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'number',//返回值名称
			title:'数量',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'departmentID',//返回值名称
			title:'检测部门ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'departmentName',//返回值名称
			title:'检测部门',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'12%',//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'13%',//宽度
		},{
			field:'',
			title:'操作',
			align:'center',
			valign:'middle',
			width:'20%',
			 formatter:function(value,row,index){    
                 var b = '<img src ="module/img/update_icon.png" onclick="openEditItemModal1(\'' + row.ID + 
                 '\',\'' + row.fineItemCode + '\',\'' + row.testProjectID + '\',\'' + row.nameCn + '\',\'' + 
                 row.nameEn + '\',\'' + row.number + '\',\'' + row.price + '\',\'' + row.money + '\',\'' + 
                 row.departmentID + '\',\'' + row.departmentName + '\',\'' + 
                 row.isOutsourcing + '\',\'' + row.remarks + '\')"'+
                 ' title="修改" style="cursor:pointer;padding-right:8px;"></img>';
                 var c = "<img src ='module/img/delete_icon.png' onclick='delFileItem(\""+ row.ID +"\",\"" + row.fineItemCode +"\")'"+" title='删除' style='cursor:pointer;padding-right:8px;'></img>";
                 return b+c;    
             }   
		}]////列配置项,详情请查看 列参数 表格
	});
	showSth();
	editSth();
}

//初始化数据(校准合同细项)
function initContractFileItem2(){
	var num = 1;
	$("#show_contractFileItem").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 4,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 4 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'ID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url:'contractFineItemController/getContractFileItemWithPaging2.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			num = params.offset;
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.ID = $.trim($('#edit_contractID').val())
			return param;
		}, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns:[{
			title : '序号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '5%',// 宽度
			formatter : function(value, row, index) {
				checkDate(row, "item2");
				return num+1;
			}
		},{
			field:'ID',//返回值名称
			title:'合同细项ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'sampleID',//返回值名称
			title:'样品ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'factoryCode',//返回值名称
			title:'样品编码',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%',//宽度
		},{
			field:'sampleName',//返回值名称
			title:'样品名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%',//宽度
		},{
			field:'specifications',//返回值名称
			title:'样品型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'12%',//宽度
		},{
			field:'money',//返回值名称
			title:'金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'13%',//宽度
		},{
			field:'',
			title:'操作',
			align:'center',
			valign:'middle',
			width:'20%',
			 formatter:function(value,row,index){    
                 var b = '<img src ="module/img/update_icon.png" onclick="openEditItemModal(\'' + row.ID + 
                 '\',\'' + row.sampleID + '\',\'' + row.factoryCode + '\',\'' + row.sampleName + '\',\'' + 
                 row.specifications + '\',\'' + row.money + '\',\'' + row.remarks + '\')"'+
                 ' title="修改" style="cursor:pointer;padding-right:8px;"></img>';
                 var c = "<img src ='module/img/delete_icon.png' onclick='delFileItem(\""+ row.ID +"\",\"" + row.factoryCode +"\")'"+" title='删除' style='cursor:pointer;padding-right:8px;'></img>";
                 return b+c;    
             }   
		}]////列配置项,详情请查看 列参数 表格
	});
}

//检查合同数据、合同文件数据和合同细项是否合理
function checkDate(data, who) {
	if (who == "con"){
		chenkDataCon(data);
	}else if (who == "file"){
		chenkDataFile(data);
	}else if (who == "item1"){
		chenkDataItem1(data);
	}else if (who == "item2"){
		chenkDataItem2(data);
	}else if (who == "template"){
		chenkDataTemplate(data);
	}
}
//检查合同文件数据是否合理
function chenkDataCon(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("contractCode") || dataObj.contractCode == null || dataObj.contractCode == undefined || dataObj.contractCode.trim() == "") {
		dataObj.contractCode = ""; //没有合同文件
	}
	if (!dataObj.hasOwnProperty("contractName") || dataObj.contractName == null || dataObj.contractName == undefined || dataObj.contractName.trim() == "") {
		 dataObj.contractName = "";
	}
	if (!dataObj.hasOwnProperty("companyID") || dataObj.companyID == null || dataObj.companyID == undefined || dataObj.companyID.trim() == "") {
		dataObj.companyID = ""; 
	}
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null || dataObj.companyName == undefined || dataObj.companyName.trim() == "") {
		dataObj.companyName = "没有该公司,请新增";
	}
	if (!dataObj.hasOwnProperty("oppositeMen") || dataObj.oppositeMen == null || dataObj.oppositeMen == undefined || dataObj.oppositeMen.trim() == "") {
		dataObj.oppositeMen = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null || dataObj.linkPhone == undefined ) {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("employeeID") || dataObj.employeeID == null || dataObj.employeeID == undefined || dataObj.employeeID.trim() == "") {
		dataObj.employeeID = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null || dataObj.contractCode == undefined || dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("address") || dataObj.address == null || dataObj.address == undefined || dataObj.address.trim() == "") {
		dataObj.address = "";
	}
	if (!dataObj.hasOwnProperty("signAddress") || dataObj.signAddress == null || dataObj.signAddress == undefined || dataObj.signAddress.trim() == "") {
		dataObj.signAddress = "";
	}
	if (!dataObj.hasOwnProperty("signTime") || dataObj.signTime == null || dataObj.signTime == undefined || dataObj.signTime.trim() == "") {
		dataObj.signTime = "";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null || dataObj.startTime == undefined || dataObj.startTime.trim() == "") {
		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("endTime") || dataObj.endTime == null || dataObj.endTime == undefined || dataObj.endTime.trim() == "") {
		dataObj.endTime = "";
	}
	if (!dataObj.hasOwnProperty("contractAmount") || dataObj.contractAmount == null || dataObj.contractAmount == undefined ) {
		dataObj.contractAmount = "0";
	}
	if (!dataObj.hasOwnProperty("isClassified") || dataObj.isClassified == null || dataObj.isClassified == undefined || dataObj.isClassified.trim() == "") {
		dataObj.isClassified = "0";
	}
	if (!dataObj.hasOwnProperty("classifiedLevel") || dataObj.classifiedLevel == null || dataObj.classifiedLevel == undefined || dataObj.classifiedLevel.trim() == "") {
		dataObj.classifiedLevel = "3";
	}
}

//检查合同文件数据是否合理
function chenkDataFile(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID == undefined 
			|| dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null
			|| dataObj.fileName == undefined 
			|| dataObj.fileName.trim() == "") {
		dataObj.fileName = "";
	}
	if (!dataObj.hasOwnProperty("uploaderID") || dataObj.uploaderID == null
			|| dataObj.uploaderID == undefined 
			|| dataObj.uploaderID.trim() == "") {
		dataObj.uploaderID = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null
			|| dataObj.employeeName == undefined 
			|| dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("uploadTime") || dataObj.uploadTime == null
			|| dataObj.uploadTime == undefined 
			|| dataObj.uploadTime.trim() == "") {
		dataObj.uploadTime = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks == undefined 
			|| dataObj.remarks.trim() == "") {
		dataObj.remarks = "";
	}
}

//检查检测合同细项是否合理
function chenkDataItem1(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID == undefined 
			|| dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fineItemCode") || dataObj.fineItemCode == null
			|| dataObj.fineItemCode == undefined 
			|| dataObj.fineItemCode.trim() == "") {
		dataObj.fineItemCode = "";
	}
	if (!dataObj.hasOwnProperty("testProjectID") || dataObj.testProjectID == null
			|| dataObj.testProjectID == undefined 
			|| dataObj.testProjectID.trim() == "") {
		dataObj.testProjectID = "";
	}
	if (!dataObj.hasOwnProperty("nameCn") || dataObj.nameCn == null
			|| dataObj.nameCn == undefined 
			|| dataObj.nameCn.trim() == "") {
		dataObj.nameCn = "";
	}
	if (!dataObj.hasOwnProperty("nameEn") || dataObj.nameEn == null
			|| dataObj.nameEn == undefined 
			|| dataObj.nameEn.trim() == "") {
		dataObj.nameEn = "";
	}
	if (!dataObj.hasOwnProperty("isOutsourcing") || dataObj.isOutsourcing == null
			|| dataObj.nameEn == undefined 
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.isOutsourcing = "";
	}
	if (!dataObj.hasOwnProperty("money") || dataObj.money == null
			|| dataObj.money == undefined) {
		dataObj.money = "";
	}
	if (!dataObj.hasOwnProperty("price") || dataObj.price == null
			|| dataObj.price == undefined) {
		dataObj.price = "";
	}
	if (!dataObj.hasOwnProperty("number") || dataObj.number == null
			|| dataObj.number == undefined) {
		dataObj.number = "";
	}
	if (!dataObj.hasOwnProperty("departmentID") || dataObj.departmentID == null
			|| dataObj.departmentID == undefined 
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.departmentID = "";
	}
	if (!dataObj.hasOwnProperty("departmentName") || dataObj.departmentName == null
			|| dataObj.departmentName == undefined 
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.departmentName = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks == undefined 
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.remarks = "";
	}
}
//检查校准合同细项是否合理
function chenkDataItem2(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID == undefined 
			|| dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("sampleID") || dataObj.sampleID == null
			|| dataObj.sampleID == undefined 
			|| dataObj.sampleID.trim() == "") {
		dataObj.sampleID = "";
	}
	if (!dataObj.hasOwnProperty("factoryCode") || dataObj.factoryCode == null
			|| dataObj.factoryCode == undefined 
			|| dataObj.factoryCode.trim() == "") {
		dataObj.factoryCode = "";
	}
	if (!dataObj.hasOwnProperty("sampleName") || dataObj.sampleName == null
			|| dataObj.sampleName == undefined 
			|| dataObj.sampleName.trim() == "") {
		dataObj.sampleName = "";
	}
	if (!dataObj.hasOwnProperty("specifications") || dataObj.specifications == null
			|| dataObj.specifications == undefined 
			|| dataObj.specifications.trim() == "") {
		dataObj.specifications = "";
	}
	if (!dataObj.hasOwnProperty("money") || dataObj.money == null
			|| dataObj.money == undefined) {
		dataObj.money = "";
	}
	if (!dataObj.hasOwnProperty("remarks") || dataObj.remarks == null
			|| dataObj.remarks == undefined 
			|| dataObj.isOutsourcing.trim() == "") {
		dataObj.remarks = "";
	}
}
//检查模版文件数据是否合理
function chenkDataTemplate(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID == undefined 
			|| dataObj.ID.trim() == "") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileName") || dataObj.fileName == null
			|| dataObj.fileName == undefined 
			|| dataObj.fileName.trim() == "") {
		dataObj.fileName = "";
	}
	if (!dataObj.hasOwnProperty("fileID") || dataObj.fileID == null
			|| dataObj.fileID == undefined 
			|| dataObj.fileID.trim() == "") {
		dataObj.fileID = "";
	}
	if (!dataObj.hasOwnProperty("name") || dataObj.name == null
			|| dataObj.name == undefined 
			|| dataObj.name.trim() == "") {
		dataObj.name = "";
	}
	if (!dataObj.hasOwnProperty("createTime") || dataObj.createTime == null
			|| dataObj.createTime == undefined 
			|| dataObj.createTime.trim() == "") {
		dataObj.createTime = "";
	}
	if (!dataObj.hasOwnProperty("templateType") || dataObj.templateType == null
			|| dataObj.templateType == undefined 
			|| dataObj.templateType.trim() == "") {
		dataObj.templateType = "";
	}
}

// 打开文件弹出框
function showFileUploadModal(){
	$("#chooseFile").removeAttr("disabled");
	$("#fileName").html("");
	param.type = 1;
	param.firstDirectory = "项目文件";
	param.secondDirectory = $('#edit_contractName').val();
	param.thirdDirectory = "合同文件";
	param.belongtoID = $('#edit_contractID').val();
	param.fileSummaryInfo = "";
	$("#file_uploadModal").modal("show");
	
}
//初始化上传文件的方法
function uploadFile() {
	$("#files").fileupload({
		autoUpload : true,
		url : 'fileOperateController/upload.do',
		dataType : 'json',
		add : function(e, data) {
			$("#submitFileBtn").click(function() {
				data.submit();
			});
		},
	}).bind('fileuploaddone', function(e, data) {
		var fileID = JSON.parse(data.result);
		if(fileID != null && fileID != "null" && fileID != ""){
			swal("上传文件成功","","success");
			setTimeout(updContractState,500);
			setTimeout(refresh, 1000);
		}
	});
	// 文件上传前触发事件
	$('#files').bind('fileuploadsubmit', function(e, data) {
		data.formData = {
			TypeNumber : param.type,
			belongtoID : param.belongtoID,
			firstDirectory : param.firstDirectory,
			secondDirectory : param.secondDirectory,
			thirdDirectory : param.thirdDirectory,
			remark : param.fileSummaryInfo = $('#fileRemarks').val()
		}
	});
}

//检查文件类型
function checkFile(o) {
	$("#chooseFile").attr("disabled", "disabled");
	var filePath = $(o).val();
	if (filePath != "" && filePath != undefined) {
		var arr = filePath.split('\\');
		var fileName = arr[arr.length - 1];
		$("#fileName").html(fileName);
	}
	if (o.value.indexOf('.doc') < 0 && o.value.indexOf('.docx') < 0) {
		swal("不能将此类型文档作为合同文件上传");
		setTimeout(refresh, 1000);
	}
} 
//文件上传成功后操作
function refrehFileTable() {
	$('#show_contractFile').bootstrapTable('refresh', null);
	$('#file_uploadModal').modal("hide");
}
//更新合同文件ID
function updateContractFileID(){
	var contractID = $('#edit_contractID').val();
	if(!contractID || typeof(contractID) == "undefined" || contractID.trim() == ""){
		return;
	}else{
		$.ajax({  
		    url:'contractController/updateContractFileID.do',// 跳转到 action
		    type:'post', 
		    data:{contractID:contractID},
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var myobj = JSON.parse(data);
		    	}
		    }
		});
	}
}
/**
 * 改变信息触发相关提示信息的方法(add)
 * addGetTPName
 */
function addGetTPName(){ 
	var name = $('#add_testProjectName').val().trim();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".testProjectName").hide();
	}else {
		var parame = {};
		parame.testProjectName = name;
		
		$.ajax({  
		    url:'testProjectController/getTestProjectByName.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var testProject,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		testProject = $(".testProjectName");
		    		if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    			htmlElement += "<ul>";
		    			for(var i=0; i < length; i++){
			    			htmlElement += "<li value='" + myobj[i].nameCn + " | " + myobj[i].nameEn + "' class='" + myobj[i].departmentID + "' title='" + myobj[i].nameCn + "' name='" + myobj[i].ID + "'>" + myobj[i].nameCn + " | " + myobj[i].nameEn + "</li>";
			    		}
		    			htmlElement += "</ul>";
		    		}
		    		 
		    		testProject.show();
		    		testProject.empty();
		    		testProject.append(htmlElement);
		    		addClick();
		    	}
		    }
		});
	}
}
/**
 * 改变信息触发相关提示信息的方法(add)
 */
function addGetSName(){ 
	var codeOrName = $('#add_factoryCode').val().trim();
	if (!codeOrName || typeof(codeOrName) == "undefined" || codeOrName.trim() == "") 
	{ 
		$(".sample").hide();
	}else {
		var parame = {};
		parame.codeOrName = codeOrName;
		
		$.ajax({  
		    url:'sampleController/getSampleMsg.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var sample,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		sample = $(".sample");
		    		if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到对应样品，将新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    			htmlElement += "<ul>";
		    			for(var i=0; i < length; i++){
		    				htmlElement += "<li value='" + myobj[i].sampleName + "' name='" + myobj[i].sampleID + "' title='" + myobj[i].specifications + "' class='" + myobj[i].factoryCode + "'>" + myobj[i].factoryCode + " | " + myobj[i].sampleName + "</li>";
			    		}
		    			htmlElement += "</ul>";
		    		}
	    			
		    		sample.show();
		    		sample.empty();
		    		sample.append(htmlElement);
		    		addClick();
		    	}
		    }
		});
	}
}
//点击事件(add)
function addClick(){ 
	
	//给input赋值
	$(".testProjectName ul li").click(function(){
		 var name =  $(this).attr("value");
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "";
			}
		 $("#add_testProjectName").val(name);
		 var departmentID =  $(this).attr("class");
		 if (departmentID == null || departmentID.trim() == "" || departmentID == "undefined") {
			 departmentID = "";
			}
		 $("#add_departmentName").val(departmentID);
		 var ID =  $(this).attr("name");
		 var nameCn =  $(this).attr("title");
		 if (ID == null || ID.trim() == "" || ID == "undefined") {
			 ID = "";
			}
		 if (nameCn == null || nameCn.trim() == "" || nameCn == "undefined") {
			 nameCn = "";
			}
		 $('#add_testProjectName').attr({'name' : "" + ID + ""});
		 $('#add_testProjectName').attr({'value' : "" + name + ""});
		 $('#add_testProjectName').attr({'title' : "" + nameCn + ""});
		 $(".testProjectName").hide();
	})

	//隐藏提示框
	$("#addContent").click(function(){
		 $(".testProjectName").hide();
	})
	
	//给input赋值
	$(".sample ul li").click(function(){
		 var sampleName =  $(this).attr("value");
		 if (sampleName == null || sampleName.trim() == "" || sampleName == "undefined") {
			 sampleName = "";
			}
		 $("#add_sampleName").val(sampleName);
		 var factoryCode =  $(this).attr("class");
		 if (factoryCode == null || factoryCode.trim() == "" || factoryCode == "undefined") {
			 factoryCode = "";
			}
		 $("#add_factoryCode").val(factoryCode);
		 var sampleID =  $(this).attr("name");
		 var specifications =  $(this).attr("title");
		 if (sampleID == null || sampleID.trim() == "" || sampleID == "undefined") {
			 sampleID = "";
			}
		 if (specifications == null || specifications.trim() == "" || specifications == "undefined") {
			 specifications = "";
			}
		 $('#add_factoryCode').attr({'name' : "" + sampleID + ""});
		 $('#add_specifications').val(specifications);
		 $(".sample").hide();
	})

	//隐藏提示框
	$(".row").click(function(){
		 $(".sample").hide();
	})
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
}

function openAddItemModal1(){
	$('#add_fineItemCode').val("");
	$('#add_testProjectName').attr("name","");
	$('#add_testProjectName').attr("title","");
	$('#add_testProjectName').val("");
	$('#add_number').val("");
	$('#add_price').val("");
	$('#add_departmentID').val("");
	$('#add_remarks1').val("");
	$('#addContractItemModal1').modal('show');
}

function openAddItemModal2(){
	$('#add_factoryCode').val("");
	$('#add_factoryCode').attr("name","");
	$('#add_sampleName').val("");
	$('#add_specifications').val("");
	$('#add_money').val("");
	$('#add_remarks2').val("");
	$('#addContractItemModal1').modal('show');
}

function openEditItemModal1(ID,fineItemCode,testProjectID,nameCn,nameEn,number,price,money,departmentID,departmentName,calculateType,isOutsourcing,remarks,hour){
	$('#edit_fineItemID1').val(ID);
	$('#edit_fineItemCode').val(fineItemCode);
	$('#edit_testProjectName').attr({'name' : "" + testProjectID + ""});
	$('#edit_testProjectName').attr({'title' : "" + nameCn + ""});
	$('#edit_testProjectName').attr({'value' : "" + nameCn + " | " + nameEn + ""});
	$('#edit_number').val(number);
	$('#edit_price').val(price);
	$('#edit_departmentID').val(departmentID);
	$('#edit_remarks1').val(remarks);
	
	$('#editContractItemModal1').modal('show');
}

function openEditItemModal2(ID,sampleID,factoryCode,sampleName,specifications,money,remarks){
	$('#edit_fineItemID2').val(ID);
	$('#edit_factoryCode').attr({'name' : "" + sampleID + ""});
	$('#edit_factoryCode').attr({'value' : "" + factoryCode + ""});
	$('#edit_sampleName').val(sampleName);
	$('#edit_specifications').val(specifications);
	$('#edit_money').val(money);
	$('#edit_remarks2').val(remarks);

	$('#editContractItemModal2').modal('show');
}

//返回函数
function goback(){
	window.location.href="module/jsp/contractManage/contractManage.jsp";
}

/*
 * 修改是否保密响应
 */
function classifiedSth(){
	var isClassified = $('input[name="isClassified"]:checked').val();
	if(isClassified == "0"){
		$('#edit_classifiedLevel').val("3");
		$('#edit_classifiedLevel #Level3').show();
		$('#edit_classifiedLevel .Level3').hide();
	}else if(isClassified == "1"){
		$('#edit_classifiedLevel').val("0");
		$('#edit_classifiedLevel .Level3').show();
		$('#edit_classifiedLevel #Level3').hide();
	}
}

function classifiedLevelSth(){
	var classifiedLevel = $('#edit_classifiedLevel').val();
	var isClassified = document.getElementsByName("isClassified");
	if(classifiedLevel == "3"){
		 isClassified[1].checked = "checked";
		 $('#edit_classifiedLevel').val(classifiedLevel);
		$('#edit_classifiedLevel #Level3').show();
		$('#edit_classifiedLevel .Level3').hide();
	}else{
		
		 isClassified[0].checked = "checked";
		 $('#edit_classifiedLevel').val(classifiedLevel);
		$('#edit_classifiedLevel .Level3').show();
		$('#edit_classifiedLevel #Level3').hide();
	}
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editShowMsg(){ 
	var name = $('#edit_companyName').val().trim();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".companyN").hide();
	}else {
		var parame = {};
		parame.companyName = name;
		
		$.ajax({  
		    url:'companyController/getCompanyMsg.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var company,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		company = $(".companyN");
		    		if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到对应公司，将新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    			htmlElement += "<ul>";
		    			for(var i=0; i < length; i++){
			    			htmlElement += "<li id='" + myobj[i].mobilePhone +"' value='" + myobj[i].companyName + "' name='" + myobj[i].linkMan + "' title='" + myobj[i].address + "' class='" + myobj[i].ID + "'>" + myobj[i].companyName + "</li>";
			    		}
		    			htmlElement += "</ul>";
		    		}
	    			
		    		company.show();
		    		company.empty();
		    		company.append(htmlElement);
		    		editClick();
		    	}
		    }
		});
	}
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editGetEName(){
	var name = $('#edit_employeeName').val().trim();
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
		    		if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据,请更改输入信息或新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    			htmlElement += "<ul>";
		    			for(var i=0; i < length; i++){
			    			htmlElement += "<li value='" + myobj[i].employeeName + "' name='" + myobj[i].employeeCode + "' class='" + myobj[i].ID + "'>" + myobj[i].employeeName + " | " + myobj[i].employeeCode + "</li>";
			    		}
		    			htmlElement += "</ul>";
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
 * 改变信息触发相关提示信息的方法(edit)
 * editGetTPName
 */
function editGetTPName(){ 
	var name = $('#edit_testProjectName').val().trim();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".testProjectName").hide();
	}else {
		var parame = {};
		parame.testProjectName = name;
		
		$.ajax({  
		    url:'testProjectController/getTestProjectByName.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var testProject,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		testProject = $(".testProjectName");
		    		if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    			htmlElement += "<ul>";
		    			for(var i=0; i < length; i++){
			    			htmlElement += "<li value='" + myobj[i].nameCn + " | " + myobj[i].nameEn + "' class='" + myobj[i].departmentID + "' title='" + myobj[i].nameCn + "' name='" + myobj[i].ID + "'>" + myobj[i].nameCn + " | " + myobj[i].nameEn + "</li>";
			    		}
		    			htmlElement += "</ul>";
		    		}
		    		
		    		testProject.show();
		    		testProject.empty();
		    		testProject.append(htmlElement);
		    		editClick();
		    	}
		    }
		});
	}
}
/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editGetSName(){ 
	var codeOrName = $('#edit_factoryCode').val().trim();
	if (!codeOrName || typeof(codeOrName) == "undefined" || codeOrName.trim() == "") 
	{ 
		$(".sample").hide();
	}else {
		var parame = {};
		parame.codeOrName = codeOrName;
		
		$.ajax({  
		    url:'sampleController/getSampleMsg.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var sample,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML
		    		sample = $(".sample");
		    		if(myobj.length == 0){
		    			htmlElement += "<ul><li class='noDate'>没有查到对应样品，将新增对应数据</li></ul>";
		    		}else{
		    			length = myobj.length;
		    			htmlElement += "<ul>";
		    			for(var i=0; i < length; i++){
		    				htmlElement += "<li value='" + myobj[i].sampleName + "' name='" + myobj[i].sampleID + "' title='" + myobj[i].specifications + "' class='" + myobj[i].factoryCode + "'>" + myobj[i].factoryCode + " | " + myobj[i].sampleName + "</li>";
			    		}
		    			htmlElement += "</ul>";
		    		}
	    			
		    		sample.show();
		    		sample.empty();
		    		sample.append(htmlElement);
		    		editClick();
		    	}
		    }
		});
	}
}
//点击事件(edit)
function editClick(){ 
	//给input赋值
	$(".companyN ul li").click(function(){
		 var name = $(this).attr("value");
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "edit_companyName";
			 $('#edit_companyName').attr({'name' : "" + name + ""});
			 $('#edit_address').attr("readOnly",false);
		}else{
			$("#edit_companyName").val(name);
			 var ID =  $(this).attr("class");
			 var mobilePhone =  $(this).attr("id");
			 var linkMan =  $(this).attr("name");
			 var address =  $(this).attr("title");
			 if (ID == null || ID.trim() == "" || ID == "undefined") {
				 ID = "";
				}
			 if (mobilePhone == null || mobilePhone.trim() == "" || mobilePhone == "undefined") {
				 mobilePhone = "";
				}
			 if (linkMan == null || linkMan.trim() == "" || linkMan == "undefined") {
				 linkMan = "";
				}
			 if (address == null || address.trim() == "" || address == "undefined") {
				 address = "";
				}
			 $('#edit_companyName').attr({'name' : "" + ID + ""});
			 $('#edit_companyName').attr({'value' : "" + name + ""});
			 $("#edit_oppositeMen").val(linkMan);
			 //$('#edit_oppositeMen').attr("disabled",true);
			 $("#edit_linkPhone").val(mobilePhone);
			 //$('#edit_linkPhone').attr("disabled",true);
			 $("#edit_address").val(address);
			 $('#edit_address').attr("readOnly",true);
		}
		$(".companyN").hide();
	})
	
	//隐藏提示框
	$(".showContract").click(function(){
		 $(".companyN").hide();
	})
	
	//给input赋值
	$(".testProjectName ul li").click(function(){
		 var name =  $(this).attr("value");
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "";
			}
		 $("#edit_testProjectName").val(name);
		 var departmentID =  $(this).attr("class");
		 if (departmentID == null || departmentID.trim() == "" || departmentID == "undefined") {
			 departmentID = "";
			}
		 $("#edit_departmentName").val(departmentID);
		 var ID =  $(this).attr("name");
		 var nameCn =  $(this).attr("title");
		 if (ID == null || ID.trim() == "" || ID == "undefined") {
			 ID = "";
			}
		 if (nameCn == null || nameCn.trim() == "" || nameCn == "undefined") {
			 nameCn = "";
			}
		 $('#edit_testProjectName').attr({'name' : "" + ID + ""});
		 $('#edit_testProjectName').attr({'value' : "" + name + ""});
		 $('#edit_testProjectName').attr({'title' : "" + nameCn + ""});
		 $(".testProjectName").hide();
	})

	//隐藏提示框
	$(".row").click(function(){
		 $(".testProjectName").hide();
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
	$(".showContract").click(function(){
		 $(".employeeN").hide();
	})
	
	//给input赋值
	$(".sample ul li").click(function(){
		 var sampleName =  $(this).attr("value");
		 if (sampleName == null || sampleName.trim() == "" || sampleName == "undefined") {
			 sampleName = "";
			}
		 $("#edit_sampleName").val(sampleName);
		 var factoryCode =  $(this).attr("class");
		 if (factoryCode == null || factoryCode.trim() == "" || factoryCode == "undefined") {
			 factoryCode = "";
			}
		 $("#edit_factoryCode").val(factoryCode);
		 var sampleID =  $(this).attr("name");
		 var specifications =  $(this).attr("title");
		 if (sampleID == null || sampleID.trim() == "" || sampleID == "undefined") {
			 sampleID = "";
			}
		 if (specifications == null || specifications.trim() == "" || specifications == "undefined") {
			 specifications = "";
			}
		 $('#edit_factoryCode').attr({'name' : "" + sampleID + ""});
		 $('#edit_specifications').val(specifications);
		 $(".sample").hide();
	})

	//隐藏提示框
	$(".row").click(function(){
		 $(".sample").hide();
	})
}
//修改合同状态
function updContractState(){
	var ID = GetQueryString("ID");
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		parame.state = 1;
		$.ajax({
			  url:'contractController/updContractState.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
					case 1:swal("修改成功！");
						setTimeout(goback, 1500);
						break;
					case 0:swal("修改失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
			  }
		});
	}
}
//提交审核
function submitAudit(){
	var ID = GetQueryString("ID");
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		parame.state = 2;
		$.ajax({
			  url:'contractController/updContractState.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
				  	case -2:swal("该合同没有合同文件,请添加！");
				  		break;
					case 1:swal("提交审核成功！");
						setTimeout(goback, 1500);
						break;
					case 0:swal("提交审核失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
			  }
		});
	}
}

//修改合同基本信息方法 
function edit(){
	var ID = GetQueryString("ID");
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		var contractCode = $('#edit_contractCode').html();
		var contractName = $('#edit_contractName').val();
		var signAddress = $('#edit_signAddress').val();
		var address = $('#edit_address').val();
		var companyID = $('#edit_companyName').attr("name");
		
		var companyName = $('#edit_companyName').val();
		var oppositeMen = $('#edit_oppositeMen').val();
		var linkPhone = $('#edit_linkPhone').val();
		var startTime = $('#edit_startTime').val();
		var endTime = $('#edit_endTime').val();
		var employeeID = $('#edit_employeeName').attr("name");
		var employeeName = $('#edit_employeeName').val();
		var signTime = $('#edit_signTime').val();
		var isClassified = $("input[name='isClassified']:checked").val();
		var classifiedLevel = $('#edit_classifiedLevel').val();
		
		if (!contractCode || typeof(contractCode) == "undefined" || contractCode.trim() == "") 
		{ 
			swal("合同编号不能为空！"); 
			return;
		}
		if (!contractName || typeof(contractName) == "undefined" || contractName.trim() == "") 
		{ 
			swal("合同名不能为空！"); 
			return;
		}
		if (!companyName || typeof(companyName) == "undefined" || companyName.trim() == "") 
		{ 
			swal("签约单位不能为空！");
			return;
		}
		if (!address || typeof(address) == "undefined" || address.trim() == "") 
		{ 
			swal("单位地址不能为空！");
			return;
		}
		if (!signAddress || typeof(signAddress) == "undefined" || signAddress.trim() == "") 
		{ 
			swal("签约地点不能为空！");
			return;
		}
		if (!oppositeMen || typeof(oppositeMen) == "undefined" || oppositeMen.trim() == "") 
		{ 
			swal("甲方法定代表人或代理人不能为空！");
			return;
		}
		if (!linkPhone || typeof(linkPhone) == "undefined" || linkPhone.trim() == "") 
		{ 
			swal("联系电话不能为空！");
			return;
		}
		else {
			var reg = /^1(3|4|5|7|8)\d{9}$/;
			 if (!reg.test(linkPhone)) {
				 swal("联系电话格式错误！");
				 return;
			 }
		}
		if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
		{ 
			swal("乙方法定代表人或代理人不能为空！");
			return;
		}
		if (!signTime || typeof(signTime) == "undefined" || signTime.trim() == "") 
		{ 
			swal("签订日期不能为空！");
			return;
		}
		if (!startTime || typeof(startTime) == "undefined" || startTime.trim() == "") 
		{ 
			swal("合同开始执行日期不能为空！");
			return;
		}if (!endTime || typeof(endTime) == "undefined" || endTime.trim() == "") 
		{ 
			swal("合同截至日期不能为空！"); 
			return;
		}
		if (endTime <= startTime) 
		{ 
			swal("时间先后顺序选择错误！"); 
			return;
		}
		if (!isClassified || typeof(isClassified) == "undefined" || isClassified.trim() == "") 
		{ 
			swal("是否保密不能为空！");
			return;
		}
		if (!classifiedLevel || typeof(classifiedLevel) == "undefined" || classifiedLevel.trim() == "") 
		{ 
			swal("保密等级不能为空！");
			return;
		}
		parame.contractCode = contractCode;
		parame.contractName = contractName;
		parame.signAddress = signAddress;
		parame.address = address;
		parame.companyID = companyID;
		parame.companyName = companyName;
		parame.oppositeMen = oppositeMen;
		parame.linkPhone = linkPhone;
		parame.startTime = startTime;
		parame.endTime = endTime;
		parame.employeeID = employeeID;
		parame.employeeName = employeeName;
		parame.signTime = signTime;
		//parame.contractAmount = contractAmount;
		parame.isClassified = isClassified;
		parame.classifiedLevel = classifiedLevel;
		if(companyID == "edit_companyName"){
			swal({
				title: "公司不存在，是否修改合同并新增对应公司记录！",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确定",
				closeOnConfirm: false
				},
				function(){	
					$.ajax({
						url:'contractController/updContract.do',
						type:'post', 
						data:parame,
						dataType:'json',
						success:function(o){
							switch (o) {
							case -2:swal("新增公司失败！");
								break;
							case -4:swal("公司名与公司ID不相符！");
						  		break;
							case 1:swal("保存成功！");
								setTimeout(refresh, 1000);
								break;
							case 0:swal("保存失败！");
								break;
							default:
								break;
							}
						},
						error:function(o){
							console.log(o);
						}
				});
			});
		}else {
			$.ajax({
			  url:'contractController/updContract.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
				  	case -2:swal("不存在该公司名的公司！");
				  		break;
				  	case -4:swal("公司名与公司ID不相符！");
			  			break;
					case 1:swal("保存成功！");
						setTimeout(refresh, 1000);
						break;
					case 0:swal("保存失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
			  }
			});
		}
	}
}

function checknum(obj)
{   
	if(/^\d+\.?\d{0,2}$/.test(obj.value)){
		obj.value = obj.value;
	}else{
    	obj.value = obj.value.substring(0,obj.value.length-1);
    }
}

//新增检测合同细项方法 
function addItem1(){
	edit();
	var parame = {};
	var fineItemCode = $('#add_fineItemCode').val();
	var testProjectID = $('#add_testProjectName').attr("name");
	var testProjectName = $('#add_testProjectName').attr("title");
	var number = $('#add_number').val();
	var price = $('#add_price').val();
	var departmentName = $('#add_departmentName').val();
	var remarks = $('#add_remarks1').val();
	
	if (!fineItemCode || typeof(fineItemCode) == "undefined" || fineItemCode.trim() == "") 
	{ 
		swal("合同细项编号不能为空！"); 
		return;
	}
	if (!testProjectName || typeof(testProjectName) == "undefined" || testProjectName.trim() == "") 
	{
		swal("检测项目不能为空！"); 
		return;
	}
	if(departmentName != 11){
		if (!departmentName || typeof(departmentName) == "undefined" || departmentName.trim() == "") 
		{
			swal("检测单位不能为空！请修改检测项目的所属单位或选择新的检测单位");
			return;
		}
		parame.isOutsourcing = 0;
		parame.departmentID = departmentName;
	}else{
		if (!departmentName || typeof(departmentName) == "undefined" || departmentName .trim() == "") 
		{
			swal("外包单位不能为空！");
			return;
		}
		parame.isOutsourcing = 1;
		parame.departmentID = departmentName;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
		parame.remarks = "";
	}
		parame.fineItemCode = fineItemCode;
		parame.testProjectID = testProjectID;
		parame.testProjectName = testProjectName;
		parame.number = number;
		parame.price = price;
		parame.money = number * price;
		parame.remarks = remarks;
		parame.contractID = $('#edit_contractID').val();
		
		$.ajax({
			  url:'contractFineItemController/addContractFineItem1.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
				  	case -2:swal("不存在该检测项目！");
			  			break;
			  		case -4:swal("检测项目名与检测项目ID不相符！");
			  			break;
					case 1:swal("新增成功！");
						$('#addContractItemModal1').modal('hide');
						setTimeout(refresh, 1000);
						break;
					case 0:swal("新增失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
				  refresh();
			  }
		});	
}

//新增校准合同细项方法 
function addItem2(){
	edit();
	var parame = {};
	var factoryCode = $('#add_factoryCode').val();
	var sampleID = $('#add_factoryCode').attr("name");
	var sampleName = $('#add_sampleName').val();
	var specifications = $('#add_specifications').val();
	var money = $('#add_money').val();
	var remarks = $('#add_remarks2').val();
	
	if (!factoryCode || typeof(factoryCode) == "undefined" || factoryCode.trim() == "") 
	{ 
		swal("样品编码不能为空！"); 
		return;
	}
	if (!sampleName || typeof(sampleName) == "undefined" || sampleName.trim() == "") 
	{
		swal("样品名不能为空！"); 
		return;
	}
	if (!specifications || typeof(specifications) == "undefined" || specifications.trim() == "") 
	{
		swal("样品型号不能为空！"); 
		return;
	}
	if (!money || typeof(money) == "undefined" || money.trim() == "") 
	{
		swal("金额不能为空！"); 
		return;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
		parame.remarks = "";
	}
		parame.sampleID = sampleID;
		parame.factoryCode = factoryCode;
		parame.sampleName = sampleName;
		parame.specifications = specifications;
		parame.money = money;
		parame.remarks = remarks;
		parame.contractID = $('#edit_contractID').val();
		
		if(sampleID == "add_factoryCode"){
			swal({
				title: "样品不存在，是否新增合同细项并新增对应样品记录！",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确定",
				closeOnConfirm: false
				},
				function(){	
					$.ajax({
						  url:'contractFineItemController/addContractFineItem2.do',
						  type:'post', 
						  data:parame,
						  dataType:'json',
						  success:function(o){
							  switch (o) {
							  	case -2:swal("新增失败！");
					  				break;
							  	case -4:swal("样品名与样品编码不相符！");
							  		break;
								case 1:swal("新增成功！");
									$('#addContractItemModal2').modal('hide');
									setTimeout(refresh, 1000);
									break;
								case 0:swal("新增失败！");
									break;
								default:
									break;
							  }
						  },
						  error:function(o){
							  console.log(o);
							  refresh();
						  }
					});
			});
		}else{
			$.ajax({
				  url:'contractFineItemController/addContractFineItem2.do',
				  type:'post', 
				  data:parame,
				  dataType:'json',
				  success:function(o){
					  switch (o) {
					  	case -2:swal("新增样品失败！");
				  			break;
				  		case -4:swal("样品名与样品编码不相符！");
				  			break;
						case 1:swal("修改成功！");
							$('#addContractItemModal2').modal('hide');
							setTimeout(refresh, 1000);
							break;
						case 0:swal("修改失败！");
							break;
						default:
							break;
					  }
				  },
				  error:function(o){
					  console.log(o);
					  refresh();
				  }
			});	
		}
}

//删除合同细项
function delFileItem1(id,fineItemCode){
	var parame = {};
	parame.itemID = id;
	parame.contractID = $('#edit_contractID').val();
	swal({
		title: "确认删除：" + fineItemCode,
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
		},
		function(){
			$.ajax({
				  url:'contractFineItemController/delContractFineItem.do',
				  type:"post",
				  data:parame,
				  success:function(o){
					  if(o == 1){
						  swal("删除成功！");
					  }else{
						  swal("删除失败");
					  }
					  setTimeout(refresh, 1000);
				  }
			});
	});
}

//编辑检测合同细项方法 
function editItem1(){
	edit();
	var parame = {};
	parame.ID = $('#edit_fineItemID').val();
	var fineItemCode = $('#edit_fineItemCode').val();
	var testProjectID = $('#edit_testProjectName').attr("name");
	var testProjectName = $('#edit_testProjectName').attr("title");
	var number = $('#edit_number').val();
	var price = $('#edit_price').val();
	var departmentName = $('#edit_departmentName').val();
	var remarks = $('#edit_remarks').val();
		
	if (!fineItemCode || typeof(fineItemCode) == "undefined" || fineItemCode.trim() == "") 
	{ 
		swal("合同细项编号不能为空！"); 
		return;
	}
	if (!testProjectName || typeof(testProjectName) == "undefined" || testProjectName.trim() == "") 
	{
		swal("检测项目不能为空！"); 
		return;
	}
	if(departmentName != 11){
		if (!departmentName || typeof(departmentName) == "undefined" || departmentName.trim() == "") 
		{
			swal("检测单位不能为空！");
			return;
		}
		parame.isOutsourcing = 0;
		parame.departmentID = departmentName;
	}else{
		if (!departmentName || typeof(departmentName) == "undefined" || departmentName .trim() == "") 
		{
			swal("外包单位不能为空！");
			return;
		}
		parame.isOutsourcing = 1;
		parame.departmentID = departmentName;
	}
		parame.fineItemCode = fineItemCode;
		parame.testProjectID = testProjectID;
		parame.testProjectName = testProjectName;
		parame.number = number;
		parame.price = price;
		parame.money = number * price;
		parame.remarks = remarks;
		parame.contractID = $('#edit_contractID').val();
		
		$.ajax({
			  url:'contractFineItemController/updContractFineItem1.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  switch (o) {
				  	case -2:swal("不存在该检测项目！");
				  		break;
				  	case -4:swal("检测项目名与检测项目ID不相符！");
			  			break;
					case 1:swal("修改成功！");
						$('#editContractItemModal1').modal('hide');
						setTimeout(refresh, 1000);
						break;
					case 0:swal("修改失败！");
						break;
					default:
						break;
				  }
			  },
			  error:function(o){
				  console.log(o);
			  }
		});	
}

//编辑校准合同细项方法 
function editItem2(){
	edit();
	var parame = {};
	parame.ID = $('#edit_fineItemID').val();
	var factoryCode = $('#edit_factoryCode').val();
	var sampleID = $('#edit_factoryCode').attr("name");
	var sampleName = $('#edit_sampleName').val();
	var specifications = $('#edit_specifications').val();
	var money = $('#edit_money').val();
	var remarks = $('#edit_remarks2').val();
	
	if (!factoryCode || typeof(factoryCode) == "undefined" || factoryCode.trim() == "") 
	{ 
		swal("样品编码不能为空！"); 
		return;
	}
	if (!sampleName || typeof(sampleName) == "undefined" || sampleName.trim() == "") 
	{
		swal("样品名不能为空！"); 
		return;
	}
	if (!specifications || typeof(specifications) == "undefined" || specifications.trim() == "") 
	{
		swal("样品型号不能为空！"); 
		return;
	}
	if (!money || typeof(money) == "undefined" || money.trim() == "") 
	{
		swal("金额不能为空！"); 
		return;
	}
	if (!remarks || typeof(remarks) == "undefined" || remarks.trim() == "") 
	{ 
		parame.remarks = "";
	}
		
		parame.sampleID = sampleID;
		parame.factoryCode = factoryCode;
		parame.sampleName = sampleName;
		parame.specifications = specifications;
		parame.money = money;
		parame.remarks = remarks;
		parame.contractID = $('#edit_contractID').val();
		
		if(sampleID == "edit_factoryCode"){
			swal({
				title: "样品不存在，是否修改合同细项并新增对应样品记录！",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确定",
				closeOnConfirm: false
				},
				function(){	
					$.ajax({
						  url:'contractFineItemController/editContractFineItem2.do',
						  type:'post', 
						  data:parame,
						  dataType:'json',
						  success:function(o){
							  switch (o) {
							  	case -2:swal("新增样品失败！");
					  				break;
							  	case -4:swal("样品名与样品编码不相符！");
							  		break;
								case 1:swal("修改成功！");
									$('#editContractItemModal2').modal('hide');
									setTimeout(refresh, 1000);
									break;
								case 0:swal("修改失败！");
									break;
								default:
									break;
							  }
						  },
						  error:function(o){
							  console.log(o);
							  refresh();
						  }
					});
			});
		}else{
			$.ajax({
				  url:'contractFineItemController/editContractFineItem2.do',
				  type:'post', 
				  data:parame,
				  dataType:'json',
				  success:function(o){
					  switch (o) {
					  	case -2:swal("新增样品失败！");
				  			break;
				  		case -4:swal("样品名与样品编码不相符！");
				  			break;
						case 1:swal("修改成功！");
							$('#editContractItemModal2').modal('hide');
							setTimeout(refresh, 1000);
							break;
						case 0:swal("修改失败！");
							break;
						default:
							break;
					  }
				  },
				  error:function(o){
					  console.log(o);
					  refresh();
				  }
			});	
		}
}
$('.form_datetime_edit_Time').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    format: 'yyyy年mm月dd日'
});
	
