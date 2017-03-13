var re = new RegExp("\"", "g");
var array =[];

$(function() {
	setID();
	getContractByID();
	updateContractFileID();
});

//初始化数据
function initContractFile(){
	$("#show_contractFile").bootstrapTable({
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
		url:'fileInformationController/getContractFileWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: fileQueryParams, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns:[{
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
			width:"18%",//宽度
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
                 var c = "<img src ='module/img/delete_icon.png' onclick='delFile(\""+ row.ID +"\")' title='删除合同文件' style='cursor:pointer;padding-right:8px;'></img>";
                 return a+b+c;
          }   
		}]////列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//请求数据时的额外参数
function fileQueryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'uploadTime', 
		order : 'asc',
		ID : $.trim($('#edit_contractID').val())
	};
    return searchCondition;
}

//请求数据时的额外参数
function itemQueryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'ID', 
		order : 'asc',
		ID : $.trim($('#edit_contractID').val())
	};
    return searchCondition;
}

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
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID不能为空！"); 
	}
	$('#edit_contractID').val(ID);
}

//得到合同的信息
function getContractByID(){
	var ID = $('#edit_contractID').val();
	//alert("ID:" +ID);
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		//alert("合同ID不能为空！"); 
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
		    		$('#edit_contractCode').val(myobj[0].contractCode);
		    		$('#edit_contractName').val(myobj[0].contractName);
		    		$('#edit_address').val(myobj[0].address);
		    		$('#edit_signAddress').val(myobj[0].signAddress);
		    		$('#edit_companyName').attr({'value' : "" + myobj[0].companyName + "",'name' : "" + myobj[0].companyID + ""});
		    		$('#edit_oppositeMen').val(myobj[0].oppositeMen);
		    		$('#edit_linkPhone').val(myobj[0].linkPhone);
		    		$('#edit_startTime').val(myobj[0].startTime);
		    		$('#edit_endTime').val(myobj[0].endTime);
		    		$('#edit_employeeName').attr({'value' : "" + myobj[0].employeeName + "",'name' : "" + myobj[0].employeeID + ""});
		    		$('#edit_signTime').val(myobj[0].signTime);
		    		$('#edit_contractAmount').val(myobj[0].contractAmount);
		    		if(myobj[0].isClassified == "1"){
		    			$('#r1').prop('checked','true');
		    			$('#r2').prop('checked','');
		    		}else if(myobj[0].isClassified == "0"){
		    			$('#r1').prop('checked','');
		    			$('#r2').prop('checked','true');
		    		}
		    		$('#edit_classifiedLevel').val(myobj[0].classifiedLevel);
		    		initContractFile();
		    		initContractFileItem();
		    		}
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
/*	$.post("testReportController/getFileID.do", {
		ID : id
	}, function(result) {
		var re = new RegExp("\"", "g");
		result = result.replace(re, "");
		if (result == null || result == "null") {
			if (confirm("未找到相应文件，是否下载默认模版")) {
				$.post("testReportController/getTemplateFileID.do", {
					ID : id
				}, function(result) {
					result = JSON.parse(result);
					if (result == null || result == "null") {
						alert("未找到相应文件");
					} else {
						downOneFile(result[0].fileID);
					}
				});
			}
		} else {
			downOneFile(result);
		}
	});*/
}

function openFile(id){
	$.post("fileOperateController/onlinePreview.do", {
		ID : id
	}, function(result) {
		if (result != null && result != "null") {
			window.location.href = "module/jsp/documentOnlineView.jsp";
		} else {
			alert("无法查看");
		}
	});
}

//删除合同的文件
function delFile(id) {
	alert(id);
	var data;
   $.ajax({
	url : 'fileInformationController/deleteFileByID.do',
	dataType : "json",
	async : false,
	data : {
		fileID : id
	},
	success : function(o) {
		 data = JSON.parse(o); // error
		 alert(data);
		if (data == true) {
			alert("delete sunceesul");
		} else {
			alert("delete faire");
		}
	},
	error : function() {
		return false;
	}
   });
   refresh();
   //$('#fileTable').bootstrapTable('refresh',null);

}

//初始化数据(合同细项)
function initContractFileItem(){
	$("#show_contractFileItem").bootstrapTable({
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
		url:'contractFineItemController/getContractFileItemWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: itemQueryParams, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns:[/*{
			checkbox:true,
			align:'center',//水平居中显示
			width:'5%'//宽度
		}*/{
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
			field:'hour',//返回值名称
			title:'小时',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'calculateType',//返回值名称
			title:'计算方式',//列名
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
			width:'12%',//宽度
		},{
			field:'',
			title:'操作',
			align:'center',
			valign:'middle',
			width:'20%',
			 formatter:function(value,row,index){    
                 var b = '<img src ="module/img/update_icon.png" onclick="openEditItemModal(\'' + row.ID + 
                 '\',\'' + row.fineItemCode + '\',\'' + row.testProjectID + '\',\'' + row.nameCn + '\',\'' + 
                 row.nameEn + '\',\'' + row.number + '\',\'' + row.price + '\',\'' + row.money + '\',\'' + 
                 row.departmentID + '\',\'' + row.departmentName + '\',\'' + row.calculateType + '\',\'' + 
                 row.isOutsourcing + '\',\'' + row.remarks + '\',\'' + row.hour + '\')"'+
                 ' title="修改" style="cursor:pointer;padding-right:8px;"></img>';
                 var c = "<img src ='module/img/delete_icon.png' onclick='delFileItem(\""+ row.ID +"\")'"+" title='删除' style='cursor:pointer;padding-right:8px;'></img>";
                 return b+c;    
             }   
		}]////列配置项,详情请查看 列参数 表格
	});
	showSth();
	editSth();
}

//上传文件预处理
function submitFile(){
	//loadingData();
//	fileObj.path = "E:/";//filePath; // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	fileObj.fileTypeNumber = "1";//fileTypeNumber; // 文件类型
	fileObj.firstDirectoryName = "项目文件";//fileFirstDirectory; // 一级目录
	fileObj.secondDirectoryName = "子项目具体文件";//fileSecondDirectory; // 二级目录
	fileObj.thirdDirectoryName = "合同文件";//fileThirdDirectory //三级目录
	fileObj.belongtoID = $('#edit_contractID').val();
 	fileObj.otherInfo = "没有";//fileOtherInfo; // 其他参数
	fileObj.remarks = "文件啊";//fileRemarks; // 备注
	//文件上传
	 fileUpload(fileObj.filePath, fileObj.fileTypeNumber, fileObj.firstDirectoryName, fileObj.secondDirectoryName,fileObj.thirdDirectoryName,
			 fileObj.belongtoID, fileObj.otherInfo, fileObj.remarks) ;
	 	 
	 refresh();
	 //旋转图片延缓
	//setTimeout("dealUploadFile()",5000);
	/* $.ajaxSetup({
			global:false,
			cache:false,
			beforeSend:function(){
				loadingData();
			},
			complete:function(){
				removeLoadingData();
				$('#fileTable').bootstrapTable('refresh',null);
			},
			timeout:10000,
		});*/
}

function updateContractFileID(){
	var contractID = $('#edit_contractID').val();
	if(!contractID && typeof(contractID)!="undefined" && contractID==''){
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



/*
 * 改变计算方式
 */
function calculateType(){
	var Type1 = $('input[name="calculateType1"]:checked').val();
	if(Type1 == "0"){
		$('.add_number').show();
		$('.add_hour').hide();
	}else if(Type1 == "1"){
		$('.add_hour').show();
		$('.add_number').hide();
	}
	
	var Type2 = $('input[name="calculateType2"]:checked').val();
	if(Type2 == "0"){
		$('.edit_number').show();
		$('.edit_hour').hide();
	}else if(Type2 == "1"){
		$('.edit_hour').show();
		$('.edit_number').hide();
	}
}

/*
 * 是否外包
 */
function outChange(){
	var out1 = $('input[name="isOutsourcing1"]:checked').val();
	if(out1 == "0"){
		$('.departmentName0').show();
		$('.departmentName1').hide();
	}else if(out1 == "1"){
		$('.departmentName1').show();
		$('.departmentName0').hide();
	}
	
	var out2 = $('input[name="isOutsourcing2"]:checked').val();
	if(out2 == "0"){
		$('.departmentName3').show();
		$('.departmentName4').hide();
	}else if(out2 == "1"){
		$('.departmentName4').show();
		$('.departmentName3').hide();
	}
}

/**
 * 改变信息触发相关提示信息的方法(add)
 * addGetTPName
 */
function addGetTPName(){ 
	var name = $('#add_testProjectName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
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
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].nameCn + " | " + myobj[i].nameEn + "' name='" + myobj[i].ID + "'>" + myobj[i].nameCn + " | " + myobj[i].nameEn + "</li></ul>";
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

//点击事件(add)
function addClick(){ 
	
	//给input赋值
	$(".testProjectName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#add_testProjectName").val(name);
		 var ID =  $(this).attr("name");
		 $('#add_testProjectName').attr({'name' : "" + ID + ""});
		 $('#add_testProjectName').attr({'value' : "" + name + ""});
		 $(".testProjectName").hide();
	})

	//隐藏提示框
	$("#addContent").click(function(){
		 $(".testProjectName").hide();
	})
	
}

/**
 * 改变信息触发相关提示信息的方法(edit)
 * editGetTPName
 */
function editGetTPName(){ 
	var name = $('#edit_testProjectName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
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
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].nameCn + " | " + myobj[i].nameEn + "' name='" + myobj[i].ID + "'>" + myobj[i].nameCn + " | " + myobj[i].nameEn + "</li></ul>";
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
	    		 department=$("#add_departmentName1");
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
	    		 department=$("#edit_departmentName1");
	    		 for(var i=0;i<myobj.length;i++){
	    			 htmlElement += "<option value='" + myobj[i].ID + "'>" + myobj[i].departmentName + "</option>";
	    		 }
	    		 department.append(htmlElement);
 		    }
		}
	 });
}

function openAddItemModal(){
	$('#addContractItemModal').modal('show');
}

function openEditItemModal(ID,fineItemCode,testProjectID,nameCn,nameEn,number,price,money,departmentID,departmentName,calculateType,isOutsourcing,remarks,hour){
	alert("openEditItemModal:" + ID);
	
	$('#edit_fineItemID').val(ID);
	$('#edit_fineItemCode').val(fineItemCode);
	$('#edit_testProjectName').attr({'name' : "" + testProjectID + ""});
	$('#edit_testProjectName').attr({'value' : "" + nameCn + " | " + nameEn + ""});
	$('#edit_number').val(number);
	$('#edit_hour').val(hour);
	$('#edit_money').val(money);
	$('#edit_departmentID').val(departmentID);
	//$('#edit_testProjectName').attr({'name' : "" + ID + ""});
	//$('#edit_departmentName').val(departmentName);
	if(calculateType == 0){
		$("input[type=radio][name=calculateType2][value=0]").attr("checked",'checked');
		$('#edit_price1').val(price);
		$('.edit_number').show();
		$('.edit_hour').hide();
	}
	if(calculateType == 1){
		$("input[type=radio][name=calculateType2][value=1]").attr("checked",'checked');
		$('#edit_price2').val(price);
		$('.edit_hour').show();
		$('.edit_number').hide();
	}
	if(isOutsourcing == "内测"){
		$("input[type=radio][name=isOutsourcing2][value=0]").attr("checked",'checked');
		$('.departmentName3').show();
		$('.departmentName4').hide();
	}
	if(isOutsourcing == "外包"){
		$("input[type=radio][name=isOutsourcing2][value=1]").attr("checked",'checked');
		$('.departmentName4').show();
		$('.departmentName3').hide();
	}
	$('#edit_remarks').val(remarks);
	
	
	$('#editContractItemModal').modal('show');
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
	alert(isClassified);
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

/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editShowMsg(){ 
	var name = $('#edit_companyName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
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
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li id='" + myobj[i].mobilePhone +"' value='" + myobj[i].companyName + "' name='" + myobj[i].linkMan + "' title='" + myobj[i].address + "' class='" + myobj[i].ID + "'>" + myobj[i].companyName + "</li></ul>";
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
	$(".companyN ul li").click(function(){
		 var name = $(this).attr("value");
		 $("#edit_companyName").val(name);
		 var ID =  $(this).attr("class");
		 var mobilePhone =  $(this).attr("id");
		 var linkMan =  $(this).attr("name");
		 var address =  $(this).attr("title");
		 $('#edit_companyName').attr({'name' : "" + ID + ""});
		 $('#edit_companyName').attr({'value' : "" + name + ""});
		 $("#edit_oppositeMen").val(linkMan);
		 //$('#edit_oppositeMen').attr("disabled",true);
		 $("#edit_linkPhone").val(mobilePhone);
		 //$('#edit_linkPhone').attr("disabled",true);
		 $("#edit_address").val(address);
		// $('#edit_address').attr("disabled",true);
		 $(".companyN").hide();
	})
	
	//隐藏提示框
	$("#showContract").click(function(){
		 $(".companyN").hide();
	})
	
	//给input赋值
	$(".testProjectName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_testProjectName").val(name);
		 var ID =  $(this).attr("name");
		 $('#edit_testProjectName').attr({'name' : "" + ID + ""});
		 $('#edit_testProjectName').attr({'value' : "" + name + ""});
		 $(".testProjectName").hide();
	})

	//隐藏提示框
	$("#editContent").click(function(){
		 $(".testProjectName").hide();
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
	$("#showContract").click(function(){
		 $(".employeeN").hide();
	})
}

//修改合同基本信息方法 
function edit(){
	alert("edit");
	var ID = GetQueryString("ID");; 
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID为空！"); 
	}else {
		var parame = {};
		parame.ID = ID;
		parame.state = 2;
		var contractCode = $('#edit_contractCode').val();
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
		var contractAmount = $('#edit_contractAmount').val();
		var isClassified = $("input[name='isClassified']:checked").val();
		var classifiedLevel = $('#edit_classifiedLevel').val();
		
		if (!contractCode && typeof(contractCode)!="undefined" && contractCode=='') 
		{ 
			alert("合同编号不能为空！"); 
			return;
		}
		if (!contractName && typeof(contractName)!="undefined" && contractName=='') 
		{ 
			alert("合同名不能为空！"); 
			return;
		}
		if (!companyName && typeof(companyName)!="undefined" && companyName=='') 
		{ 
			alert("签约单位不能为空！");
			return;
		}
		if (!address && typeof(address)!="undefined" && address=='') 
		{ 
			alert("单位地址不能为空！");
			return;
		}
		if (!signAddress && typeof(signAddress)!="undefined" && signAddress=='') 
		{ 
			alert("签约地点不能为空！");
			return;
		}
		if (!oppositeMen && typeof(oppositeMen)!="undefined" && oppositeMen=='') 
		{ 
			alert("甲方法定代表人或代理人不能为空！");
			return;
		}
		if (!linkPhone && typeof(linkPhone)!="undefined" && linkPhone=='') 
		{ 
			alert("联系电话不能为空！");
			return;
		}
		else {
			var reg = /^1(3|4|5|7|8)\d{9}$/;
			 if (!reg.test(linkPhone)) {
				 alert("联系电话格式错误！");
				 return;
			 }
		}
		if (!employeeName && typeof(employeeName)!="undefined" && employeeName=='') 
		{ 
			alert("乙方法定代表人或代理人不能为空！");
			return;
		}//bug 如果没在改变代表名时通过点击提示框的改变，修改后代表名不会变
		if (!signTime && typeof(signTime)!="undefined" && signTime=='') 
		{ 
			alert("签订日期不能为空！");
			return;
		}
		if (!startTime && typeof(startTime)!="undefined" && startTime=='') 
		{ 
			alert("合同开始执行日期不能为空！");
			return;
		}if (!endTime && typeof(endTime)!="undefined" && endTime=='') 
		{ 
			alert("合同截至日期不能为空！"); 
			return;
		}
		if (!contractAmount && typeof(contractAmount)!="undefined" && contractAmount=='') 
		{ 
			alert("合同金额不能为空！");
			return;
		}
		if (!isClassified && typeof(isClassified)!="undefined" && isClassified=='') 
		{ 
			alert("是否保密不能为空！");
			return;
		}
		if (!classifiedLevel && typeof(classifiedLevel)!="undefined" && classifiedLevel=='') 
		{ 
			alert("保密等级不能为空！");
			return;
		}
		else {
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
			parame.contractAmount = contractAmount;
			parame.isClassified = isClassified;
			parame.classifiedLevel = classifiedLevel;
			
			$.ajax({
			  url:'contractController/updContract.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  if(o<=0){
					  alert("修改失败");
				  }
				  $('#editModal').modal('hide');
				  window.location.href="module/jsp/contractManage/contractManage.jsp";
			  },
			  error:function(o){
				  console.log(o);
			  }
			});
		}
	}
}

//新增合同细项方法 
function addItem(){
	alert("addItem");
	
	var parame = {};
	var fineItemCode = $('#add_fineItemCode').val();
	var testProjectID = $('#add_testProjectName').attr("name");
	var testProjectName = $('#add_testProjectName').val();
	var isOutsourcing = $("input[name='isOutsourcing1']:checked").val();
	var calculateType = $("input[name='calculateType1']:checked").val();
	var number = $('#add_number').val();
	var price1 = $('#add_price1').val();
	var hour = $('#add_hour').val();
	var price2 = $('#add_price2').val();
	var departmentName1 = $('#add_departmentName1').val();
	var departmentName2 = $('#add_departmentName2').val();
	var remarks = $('#add_remarks').val();
		
	if (!fineItemCode && typeof(fineItemCode)!="undefined" && fineItemCode=='') 
	{ 
		alert("合同细项编号不能为空！"); 
		return;
	}
	if (!testProjectName && typeof(testProjectName)!="undefined" && testProjectName=='') 
	{
		alert("检测项目不能为空！"); 
		return;
	}
	if(isOutsourcing == 0){
		if (!departmentName1 && typeof(departmentName1)!="undefined" && departmentName1=='') 
		{
			alert("检测单位不能为空！");
			return;
		}
		parame.isOutsourcing = isOutsourcing;
		parame.departmentID = departmentName1;
	}
	if(isOutsourcing == 1){
		if (!departmentName2 && typeof(departmentName2)!="undefined" && departmentName2 =='') 
		{
			alert("外包单位不能为空！");
			return;
		}
		parame.isOutsourcing = isOutsourcing;
		parame.departmentID = departmentName2;
	}
	
	if(calculateType == 0){
		if (!number && typeof(number)!="undefined" && number=='') 
		{ 
			alert("数量/台不能为空！");
			return;
		}
		if (!price1 && typeof(price1)!="undefined" && price1=='') 
		{ 
			alert("每台单价/元不能为空！");
			return;
		}
		parame.calculateType = calculateType;
		parame.number = number;
		parame.price = price1;
		parame.hour = 0;
		parame.money = number * price1;
	}
	if(calculateType == 1){
		if (!hour && typeof(hour)!="undefined" && hour=='') 
		{ 
			alert("时间/时不能为空！");
			return;
		}
		if (!price2 && typeof(price2)!="undefined" && price2=='') 
		{ 
			alert("小时单价/元不能为空！");
			return;
		}
		parame.calculateType = calculateType;
		parame.hour = hour;
		parame.number = 0;
		parame.price = price2;
		parame.money = hour * price2;
	}
	if (!remarks && typeof(remarks)!="undefined" && remarks=='') 
	{ 
		alert("备注为空！");
	
		parame.contractID = $('#edit_contractID').val();
		parame.fineItemCode = fineItemCode;
		parame.testProjectID = testProjectID;
		parame.remarks = remarks;
		
		$.ajax({
			  url:'contractFineItemController/addContractFineItem.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  if(o<=0){
					  alert("新增失败");
				  }
				  refresh();
				  $('#addContractItemModal').modal('hide');
			  },
			  error:function(o){
				  console.log(o);
				  refresh();
			  }
		});	
	}
}

function delFileItem(id){
	alert("将要删除合同细项：" + id);
	var ID = " id = " + id;
	var ajaxParameter = {
			itemID:ID	
	};
	
	$.ajax({
		  url:'contractFineItemController/delContractFineItem.do',
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

//编辑合同细项方法 
function editItem(){
	alert("editItem");
	
	var parame = {};
	var fineItemCode = $('#edit_fineItemCode').val();
	var testProjectID = $('#edit_testProjectName').attr("name");
	var testProjectName = $('#edit_testProjectName').val();
	var isOutsourcing = $("input[name='isOutsourcing2']:checked").val();
	var calculateType = $("input[name='calculateType2']:checked").val();
	var number = $('#edit_number').val();
	var price1 = $('#edit_price1').val();
	var hour = $('#edit_hour').val();
	var price2 = $('#edit_price2').val();
	var departmentName1 = $('#edit_departmentName1').val();
	var departmentName2 = $('#edit_departmentName2').val();
	var remarks = $('#edit_remarks').val();
		
	if (!fineItemCode && typeof(fineItemCode)!="undefined" && fineItemCode=='') 
	{ 
		alert("合同细项编号不能为空！"); 
		return;
	}
	if (!testProjectName && typeof(testProjectName)!="undefined" && testProjectName=='') 
	{
		alert("检测项目不能为空！"); 
		return;
	}
	if(isOutsourcing == 0){
		if (!departmentName1 && typeof(departmentName1)!="undefined" && departmentName1=='') 
		{
			alert("检测单位不能为空！");
			return;
		}
		parame.isOutsourcing = isOutsourcing;
		parame.departmentID = departmentName1;
	}
	if(isOutsourcing == 1){
		if (!departmentName2 && typeof(departmentName2)!="undefined" && departmentName2 =='') 
		{
			alert("外包单位不能为空！");
			return;
		}
		parame.isOutsourcing = isOutsourcing;
		parame.departmentID = departmentName2;
	}
	
	if(calculateType == 0){
		if (!number && typeof(number)!="undefined" && number=='') 
		{ 
			alert("数量/台不能为空！");
			return;
		}
		if (!price1 && typeof(price1)!="undefined" && price1=='') 
		{ 
			alert("每台单价/元不能为空！");
			return;
		}
		parame.calculateType = calculateType;
		parame.number = number;
		parame.price = price1;
		parame.hour = 0;
		parame.money = number * price1;
	}
	if(calculateType == 1){
		if (!hour && typeof(hour)!="undefined" && hour=='') 
		{ 
			alert("时间/时不能为空！");
			return;
		}
		if (!price2 && typeof(price2)!="undefined" && price2=='') 
		{ 
			alert("小时单价/元不能为空！");
			return;
		}
		parame.calculateType = calculateType;
		parame.hour = hour;
		parame.number = 0;
		parame.price = price2;
		parame.money = hour * price2;
	}
	if (!remarks && typeof(remarks)!="undefined" && remarks=='') 
	{ 
		alert("备注为空！");
	
		parame.ID = $('#edit_fineItemID').val();
		parame.contractID = $('#edit_contractID').val();
		parame.fineItemCode = fineItemCode;
		parame.testProjectID = testProjectID;;
		parame.remarks = remarks;
		
		$.ajax({
			  url:'contractFineItemController/updContractFineItem.do',
			  type:'post', 
			  data:parame,
			  dataType:'json',
			  success:function(o){
				  if(o<=0){
					  alert("修改失败");
				  }
				  $('#editContractItemModal').modal('hide');
				  refresh();
			  },
			  error:function(o){
				  console.log(o);
			  }
		});	
	}
	
}