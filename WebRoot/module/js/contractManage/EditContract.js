var re = new RegExp("\"", "g");
var array =[];

$(function() {
	setID();
	getContractByID();
	
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
		queryParams: queryParams, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns:[/*{
			checkbox:true,
			align:'center',//水平居中显示
			width:'5%'//宽度
		}*/{
			field:'ID',//返回值名称
			title:'文件ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'fileName',//返回值名称
			title:'文件名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'28%',//宽度
		},{
			field:'uploaderID',//返回值名称
			title:'上传人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'上传人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'uploadTime',//返回值名称
			title:'上传时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'14%',//宽度
		},{
			field:'state',//返回值名称
			title:'状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%',//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%',//宽度
		},{
			field:'',
			title:'操作',
			align:'center',
			valign:'middle',
			width:'16%',
			 formatter:function(value,row,index){    
                 var a = '<button  onclick="downFile('+row.ID+')"  title="下载" class="glyphicon glyphicon-save" style="cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;"></button>';
                 var b = "<button  onclick='openFile("+row.ID+")'"+" title='查看'  class='glyphicon glyphicon-edit' style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'>/button";
                 var c = "<button  onclick='delFile("+ row.ID +")'"+" title='删除'  class='glyphicon glyphicon-remove-sign' style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'></button>";
                 return a+b+c;    
             }   
		}]////列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//请求数据时的额外参数
function queryParams(){
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

function setID(){
	var ID = GetQueryString("ID");
	alert("ID:" +ID);
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID不能为空！"); 
	}
	$('#edit_contractID').val(ID);
}

//得到合同的信息
function getContractByID(){
	var ID = $('#edit_contractID').val();
	alert("ID:" +ID);
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID不能为空！"); 
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
		    		$('#edit_isClassified').val(myobj[0].isClassified);
		    		$('#edit_classifiedLevel').val(myobj[0].classifiedLevel);
		    		initContractFile();
		    		initContractFileItem();
		    		}
		    	 }
		});
	}
}

function openFile(){
	var ID = $('#edit_contractID').val();
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID为空！"); 
	}else {
		window.location.href="module/jsp/contractManage/contractView.jsp?ID=" + ID + "&type=0";
	}
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
		queryParams: queryParams, //参数
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
			width:'20%',//宽度
		},{
			field:'testProjectID',//返回值名称
			title:'检测项目ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'nameCn',//返回值名称
			title:'检测项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%',//宽度
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
			width:'10%',//宽度
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
                 var b = "<button  onclick='openEditModal("+ row.ID +")'"+" title='修改'  class='glyphicon glyphicon-edit' style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'></button>";
                 var c = "<button  onclick='delFile("+ row.ID +")'"+" title='删除'  class='glyphicon glyphicon-remove-sign' style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'></button>";
                 return b+c;    
             }   
		}]////列配置项,详情请查看 列参数 表格
	});
}

//返回函数
function goback(){
	window.location.href="module/jsp/contractManage/contractManage.jsp";
}
/*
//文件上传
function fileUpload(selectorName,filePath, fileTypeNumber,fileBelongID ,fileFirstDirectory, fileSecondDirectory,fileThirdDirectory,
		fileOtherInfo, fileRemarks) {
	array = [];
	path = filePath; // 文件上传路径，如果此参数没有值，则使用firstDirectoryName,secondDirectoryName,thirdDirectoryName
	type = fileTypeNumber; // 文件类型
	belongID = fileBelongID;//文件所属ID
	firstDirectoryName = fileFirstDirectory; // 一级目录
	secondDirectoryName = fileSecondDirectory; // 二级目录
	thirdDirectoryName = fileThirdDirectory //三级目录
	otherInfo = fileOtherInfo; // 其他参数
	remarks = fileRemarks; // 备注
	$(selectorName).uploadify('upload', '*');
}

//上传文件
function fileUploadInit(selectorName){

	 $(selectorName).uploadify({ 
         'async':false,
		 'method':'post',
	        'auto':false,// 是否自动上传 true or false
	        
	        'successTimeout':99999,// 超时时间上传成功后，将等待服务器的响应时间。在此时间后，若服务器未响应，则默认为成功(因为已经上传,等待服务器的响应)单位：秒
		    'onUploadStart':function(file) {
			$("#file_upload").uploadify("settings", "formData", {
				filePath : path, // 文件路径
				belongtoID : belongID,//文件所属ID
				// 如果文件路径为空，则使用下面的参数
				firstDirectory:firstDirectoryName, // 一级路径
				secondDirectory:secondDirectoryName,// 二级路径
				thirdDirectory:thirdDirectoryName,// 三级路径
				TypeNumber : type, // 文件类型,必须
				content : otherInfo,// 文件内容描述
				remark : remarks// 备注
			});
		},
		    
		    'swf':"module/js/uploadify.swf", //flash
		    
	        'queueID':'uploadfileQueue', //文件选择后的容器div的id值 
	        
	        'fileObjName':'files', //将要上传的文件对象的名称 必须与后台controller中抓取的文件名保持一致    
	        
            'uploader':'/laboratorySystem/fileOperateController/upload.do', //上传地址
            
            'width':'100', //浏览按钮的宽度
            
            'height':'32', //浏览按钮的高度 
            
            'fileTypeDesc':'支持的格式:', //在浏览窗口底部的文件类型下拉菜单中显示的文本 
            
            'fileTypeExts':'*.jpg;*.gif;*.png;*.doc;*.docx;*.xls;*.xlsx',//允许上传的文件后缀
            
            'queueSizeLimit':3,//允许上传的文件的最大数量。当达到或超过这个数字，onSelectError事件被触发。

            'onUploadSuccess' : function(file, data, response) {
    			data = data.replace(re, "");
    			array.push(data);
    		},
		    'onUploadError': function(file,errorCode,erorMsg,errorString){
            },
             
		    'onQueueComplete' : function(queueData) {
		}
	});
}

*//**
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
		    			htmlElement += "<ul><li value='" + myobj[i].companyName + "' class='" + myobj[i].ID + "'>" + myobj[i].companyName + "</li></ul>";
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
		 $('#edit_companyName').attr({'name' : "" + ID + ""});
		 $('#edit_companyName').attr({'value' : "" + name + ""});
		 $(".companyN").hide();
	})
	
	//隐藏提示框
	$("#showContract").click(function(){
		 $(".companyN").hide();
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

//修改方法 
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
		alert(employeeID);
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
			var reg = /^1[3|4|5|7|8][0-9]\\d{8}$/;
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
		}//employeeID，employeeName，contractAmount，isClassified，classifiedLevel
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