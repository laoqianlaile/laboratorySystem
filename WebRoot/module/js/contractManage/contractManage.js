
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
		url:'contractController/getContractWithPaging2.do',//服务器数据的加载地址
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
			field:'ID',//返回值名称
			title:'合同ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'contractCode',//返回值名称
			title:'合同编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
//			visible:false
		},{
			field:'contractName',//返回值名称
			title:'合同名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'companyName',//返回值名称
			title:'甲方',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'oppositeMen',//返回值名称
			title:'甲方代表人/代理人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'employeeName',//返回值名称
			title:'乙方代表人/代理人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'linkPhone',//返回值名称
			title:'联系电话',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'signAddress',//返回值名称
			title:'签订地点',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'signTime',//返回值名称
			title:'签订时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'startTime',//返回值名称
			title:'履行开始时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'endTime',//返回值名称
			title:'履行结束时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'contractAmount',//返回值名称
			title:'合同金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'isClassified',//返回值名称
			title:'是否涉密',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'classifiedLevel',//返回值名称
			title:'涉密等级',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'state',//返回值名称
			title:'合同状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'viewpoint',//返回值名称
			title:'审核意见',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		}/*,{
			title : '操作',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : 10,// 宽度
			formatter : function(value, row, index) {
					return "<button type='button' class='btn btn-primary' onclick='writeModal1()'>"+
			     	"通过</button>&nbsp;"+
			     	"<button type='button' class='btn btn-primary ' onclick='writeModal2()'>驳回"+
					"</button>"
			}
		}*/]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//请求数据时的额外参数
function queryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'contractCode', 
		order : 'asc',
		contractCode : $.trim($('#schContractCode').val()),
		employeeName : $.trim($('#schEmployeeName').val()),
		companyName : $.trim($('#schCompanyName').val()),
		startTime : $.trim($('#schStartTime').val()),
		endTime : $.trim($('#schEndTime').val()),
		oppositeMen : $.trim($('#schOppositeMen').val()),
		linkPhone : $.trim($('#schLinkPhone').val()),
		state : $.trim($('#schState').val()),
	};
    return searchCondition;
}

/**
 * 搜索方法
 */
function searchContract(){
	initData();
	refresh();
}

/* 刷新方法 */
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

/* 删除方法 */
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0){
		alert("请至少选中一条数据");
		return;
	}
	var ID = "";
	for(var i=0; i<data.length; i++){
		ID += data[i].ID + ",";
	}
	alert(ID.substring(0, (ID.length-1)));
	var ajaxParameter = {
			ID:ID.substring(0, (ID.length-1))	
	};
	
	$.ajax({
	  url:'contractController/delContract.do',
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

/* 新增方法 */
function add(){
		var parame = {};
		var contractName = $('#add_contractName').val();
		var companyName = $('#add_companyName').val();
		var address = $('#add_Address').val();
		var oppositeMen = $('#add_oppositeMen').val();
		var linkPhone = $('#add_linkPhone').val();
		var employeeName = $('#add_employeeName').val();
		var signAddress = $('#add_signAddress').val();
		var signTime = $('#add_signTime').val();
		var startTime = $('#add_startTime').val();
		var endTime = $('#add_endTime').val();
		if (!contractName && typeof(contractName)!="undefined" && contractName=='') 
		{ 
			alert("合同名不能为空！"); 
			return;
		}
		if (!companyName && typeof(companyName)!="undefined" && companyName=='') 
		{ 
			alert("公司名不能为空！");
			return;
		}
		if (!address && typeof(address)!="undefined" && address=='') 
		{ 
			alert("签约地点地址不能为空！");
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
		}
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
		else {
			parame.contractName = contractName;
			parame.companyName = companyName;
			parame.oppositeMen = oppositeMen;
			parame.linkPhone = linkPhone;
			parame.employeeName = employeeName;
			parame.address = address;
			parame.signAddress = signAddress;
			parame.signTime = signTime;
			parame.startTime = startTime;
			parame.endTime = endTime;
			$.ajax({
				  url:'contractController/addContract.do',
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
 * 改变公司名触发修改相关信息的方法(新增时)
 *//*
function addChangeInfo(){ 
	var name = $('#add_companyName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		$(".companyName").hide();
		 
	}else {
		alert(name);
		var parame = {};
		parame.companyName = name;
		
		$.ajax({  
		    url:'companyController/getCompanyMsg.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var link,phone,address;
		    		var myobj = JSON.parse(data);
		    		var htmlElement1 = "";//定义HTML
		    		var htmlElement2 = "";//定义HTML
		    		var htmlElement3 = "";//定义HTML
		    		link = $("#add_LinkMen");
		    		phone = $("#add_Phone");
		    		address = $("#add_Address");
		    		 
		    		htmlElement1 += "<input type='text' id='add_oppositeMen' value='" + myobj[0].linkMan + "' name='oppositeMen' class='form-control' aria-describedby='basic-addon1'></input>";
		    		$("#add_oppositeMen").remove();
		    		link.append(htmlElement1);
		    		 
		    		htmlElement2 += "<input type='text' id='add_linkPhone' value='" + myobj[0].mobilePhone + "' name='linkPhone' class='form-control' aria-describedby='basic-addon1'></input>";
		    		$("#add_linkPhone").remove();
		    	    phone.append(htmlElement2);
		    	     
		    	    htmlElement3 += "<input type='text' id='add_signAddress' value='" + myobj[0].address + "' name='signAddress' class='form-control' aria-describedby='basic-addon1'></input>";
		    	    $("#add_signAddress").remove();
		    	    address.append(htmlElement3);
	 		    }
			}
		});
	}
}
*/
/**
 * 改变公司名触发修改相关信息的方法(修改时)
 */
function editChangeInfo(){ 
	var name = $('#edit_companyName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		$(".companyName").hide();
		 
	}else {
		alert(name);
		var parame = {};
		parame.companyName = name;
		
		$.ajax({  
		    url:'companyController/getCompanyMsg.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var link,phone,address;
		    		var myobj = JSON.parse(data);
		    		var htmlElement1 = "";//定义HTML
		    		var htmlElement2 = "";//定义HTML
		    		var htmlElement3 = "";//定义HTML
		    		link = $("#edit_LinkMen");
		    		phone = $("#edit_Phone");
		    		address = $("#edit_Address");
		    		 
		    		htmlElement1 += "<input type='text' id='edit_oppositeMen' value='" + myobj[0].linkMan + "' name='oppositeMen' class='form-control' aria-describedby='basic-addon1'></input>";
		    		$("#edit_oppositeMen").remove();
		    		link.append(htmlElement1);
		    		 
		    		htmlElement2 += "<input type='text' id='edit_linkPhone' value='" + myobj[0].mobilePhone + "' name='linkPhone' class='form-control' aria-describedby='basic-addon1'></input>";
		    		$("#edit_linkPhone").remove();
		    	    phone.append(htmlElement2);
		    	     
		    	    htmlElement3 += "<input type='text' id='edit_signAddress' value='" + myobj[0].address + "' name='signAddress' class='form-control' aria-describedby='basic-addon1'></input>";
		    	    $("#edit_signAddress").remove();
		    	    address.append(htmlElement3);
	 		    }
			}
		});
	}
}

/**
 * 改变信息触发相关提示信息的方法(add)
 *//*
function addShowMsg(){ 
	var name = $('#add_companyName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".companyName").hide();
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
		    		company = $(".companyName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].companyName + "'>" + myobj[i].companyName + "</li></ul>";
		    		}
		    		 
		    		company.show();
		    		company.empty();
		    		company.append(htmlElement);
		    		addClick();
		    	}
		    }
		});
	}
}
*/
/**
 * 改变信息触发相关提示信息的方法(edit)
 */
function editShowMsg(){ 
	var name = $('#edit_companyName').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{ 
		$(".companyName").hide();
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
		    		company = $(".companyName");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].companyName + "'>" + myobj[i].companyName + "</li></ul>";
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
		    			htmlElement += "<ul><li value='" + myobj[i].employeeName + "'>" + myobj[i].employeeName + "</li></ul>";
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
		    			htmlElement += "<ul><li value='" + myobj[i].employeeName + "'>" + myobj[i].employeeName + "</li></ul>";
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

//点击事件(edit)
function editClick(){ 
	//给input赋值
	$(".companyName ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_companyName").val(name);
		 addChangeInfo();
	});
	
	//隐藏提示框
	$("#editModal").click(function(){
		 $(".companyName").hide();
	});
	
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

/**
 * 使页面跳转到查看合同页面(管理)
 */
function showContractM(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	var ID = data[0].ID;
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID为空！"); 
	}else {
		window.location.href="module/jsp/contractManage/contractView.jsp?ID=" + ID + "&type=0";
	}
}

/**
 * 使页面跳转到修改合同页面
 */
function EditContract(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	if(data[0].state == "审核通过"){
		alert("该合同已经审核通过！");
		return;
	}
	var ID = data[0].ID;
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("合同ID为空！"); 
	}else {
		window.location.href="module/jsp/contractManage/EditContract.jsp?ID="+ ID;
	}
}


 /*//修改方法 
function edit(){
	var code = $('#edit_contractCode').val(); 
	if (!code && typeof(code)!="undefined" && code=='') 
	{ 
		alert("合同编号不能为空！"); 
	}else {
		var parame = {};
		parame.ID = $('#ContractID').val();
		parame.contractCode = $('#edit_contractCode').val();
		parame.state = $('#edit_state').val();
		parame.contractName = $('#edit_contractName').val();
		parame.signAddress = $('#edit_signAddress').val();
		parame.companyName = $('#edit_companyName').val();
		parame.oppositeMen = $('#edit_oppositeMen').val();
		parame.linkPhone = $('#edit_linkPhone').val();
		parame.startTime = $('#edit_startTime').val();
		parame.endTime = $('#edit_endTime').val();
		parame.employeeName = $('#edit_employeeName').val();
		parame.signTime = $('#edit_signTime').val();
		parame.contractAmount = $('#edit_contractAmount').val();
		parame.isClassified = $('#edit_isClassified').val();
		if($('#edit_isClassified').val() == 0){
			parame.classifiedLevel = 3;
		}
		else{
			parame.classifiedLevel = $('#edit_classifiedLevel').val();
		}
		//parame.classifiedLevel = $('#edit_classifiedLevel').val();
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
			  refresh();
		  },
		  error:function(o){
			  console.log(o);
		  }
		});
	}}*/
