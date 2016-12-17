function login() {
	var loginbox = document.getElementById("login_box");
	var imask = document.getElementById("imask");
	var password = $('#password').val();
	var clientNo = $('#clientNo').val();
	if (password == '' || typeof (password) == "undefined" || clientNo == ''
			|| typeof (clientNo) == "undefined") {
		alert("用户名或密码不能为空！");
	} else {
		var parame = {};
		parame.password = $('#password').val();
		parame.clientNo = $('#clientNo').val();
		$.ajax({
			url : 'clientController/clientLogin.do',
			data : parame,
			success : function(o) {
				if (o == "0") {
					alert("用户名或密码错误！");
				} else {
					alert("登录成功，请继续操作！");
					$('#login_box').hide();
					loginbox.style.display = "none";
					imask.style.display = "none";
					table();
				}
				window.location.reload();
			}
		});
	}
}

// 数据验证

function sampleName() {
	var sampleName = $("#selfSampleName").val();

	if (sampleName == "") {
		$("#sampleNamePrompt").html("*样品名称不能为空");
		return false;
	}

	return true;
}

function writeSampleName() {
	$("#sampleNamePrompt").html("");
}

function detection() {
	var detection = $("#selfDetection").val();
	if (detection == "") {
		$("#detectionPrompt").html("*测试方法不能为空");
		return false;
	}

	return true;
}

function writeDetection() {
	$("#detectionPrompt").html("");
}

function contact() {
	var contact = $("#selfContact").val();

	if (contact == "") {
		$("#contactPrompt").html("*联系人不能为空");
		return false;
	}
	return true;
}

function writeContact() {
	$("#contactPrompt").html("");
}

function contactPhone() {
	var contactPhone = $("#selfContactPhone").val();
	if (contactPhone == "") {
		$("#phonePrompt").html("*电话号码不能为空");
		return false;
	} else if (!(/^(13|15|18)\d{9}$/i.test(contactPhone))) {
		$("#phonePrompt").html("*电话号码格式不正确");
		return false;
	}

	return true;
}

function writePhone() {
	$("#phonePrompt").html("");
}

// 自助申请
function add() {
	
	var session = $("#name").val();
	console.log(session);
	if(session == '' || session =='null'){
		alert("请先登录后再进行自助申请");
		return;
	}
	
	if (!contact() | !contactPhone() | !sampleName() | !detection()) {
		alert("申请失败，请正确填写表单");
		return;
	}
	
	var selfSampleName = encodeURI($('#selfSampleName').val());
	var selfDetection = encodeURI($('#selfDetection').val());
	var selfContact = encodeURI($('#selfContact').val());
	var selfContactPhone = $('#selfContactPhone').val();
	var selfRemark = encodeURI($('#selfRemark').val());

	var parame = {};
	parame.selfSampleName = selfSampleName;
	parame.selfDetection = selfDetection;
	parame.selfContact = selfContact;
	parame.selfContactPhone = selfContactPhone;
	parame.selfRemork = selfRemark;
	/* console.log("ddd"); */
	$.ajax({
				url : 'selfapplicationController/addSelfApplication.do',
				data : parame,
				success : function(o) {
					var result = eval(o);
					if (result[0] == '1') {
						window.location.href = "Portal/jsp/selfApplication/applied.jsp";
					} else {
						alert("请先登录后再进行自助申请");
					}
				},
			});
}

function table() {
	$('#table').bootstrapTable({
		
		height : 400,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		singleSelect : true,
		pageSize : 3,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 3, 5, 10],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'selfApplyID',// 定义排序列
		sortOrder : 'asc',// 定义排序方式
		url : 'selfapplicationController/getSelfApplicationWithPaging2.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
//		queryParams:queryParams, 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			field : 'selfApplyID',
			visible : false
		}, {
			field : 'selfCompanyName',// 返回值名称
			title : '公司名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			visible : false
		}, {
			field : 'selfSampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
		}, {
			field : 'selfDetection',// 返回值名称
			title : '检测方法',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
		}, {
			field : 'selfContact',// 返回值名称
			title : '联系人',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
		}, {
			field : 'selfContactPhone',// 返回值名称
			title : '联系电话',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
		}, {
			field : 'selfEntryData',// 返回值名称
			title : '录入日期',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			visible : false
		}, {
			field : 'selfRemork',// 返回值名称
			title : '备注',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
		}, {
			field : 'selfHasContact',// 返回值名称
			title : '是否已联系',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
		} ]
	// 列配置项,详情请查看 列参数 表格
	});
};

/*
 * if($.cookie("username")==""||$.cookie("username")==null){ alert("ndjkfbk");
 * loginbox.style.display = "block"; imask.style.display = "block"; }else{
 * usershowid.style.display="block";
 * usershowid.innerHTML=""+$.cookie("username")+""; table(); }
 */
/*
 * function queryParams(pageReqeust) { //console.log("-----params-----");
 * pageReqeust.userName = "admin"; // pageReqeust.querys =
 * $(".input-outline").val(); pageReqeust.pageNo = this.offset;
 * pageReqeust.pageSize = this.pageNumber; pageReqeust.length = 6;
 * //直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，
 * 
 * if($("#isTouchReviewStatus").val()==""||$("#isTouchReviewStatus").val().length==0)
 * pageReqeust.isTouchReviewStatus = encodeURI("null"); else
 * pageReqeust.isTouchReviewStatus = encodeURI($("#isTouchReviewStatus").val()) ;
 * 
 * if($("#selfSampleName").val()=="") pageReqeust.selfSampleName = "null"; else
 * pageReqeust.selfSampleName = encodeURI($("#selfSampleName").val())
 * ;//传递中文参数乱码的解决方法
 * 
 * if($("#selfCompanyName").val()=="") pageReqeust.selfCompanyName = "null";
 * else pageReqeust.selfCompanyName = encodeURI($("#selfCompanyName").val());
 * if($('select').val()=="") pageReqeust.selfHasContact = "null"; else
 * pageReqeust.selfHasContact = encodeURI($('select').val());
 * console.log(pageReqeust); return pageReqeust; }
 */
function table(){
	   $('#table').bootstrapTable({
		   
			height: 400,//定义表格的高度
			striped: true,// 隔行变色效果
			pagination: true,//在表格底部显示分页条
			singleSelect:true,
			pageSize: 3,//页面数据条数
			pageNumber:1,//首页页码
			pageList: [3,5,10],//设置可供选择的页面数据条数
 		    clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
			cache: false,//禁用 AJAX 数据缓存
			sortName:'selfApplyID',//定义排序列
			sortOrder:'asc',//定义排序方式
			url:'selfapplicationController/getSelfApplicationWithPaging2.do',//服务器数据的加载地址
			sidePagination:'server',//设置在哪里进行分页
			contentType:'application/json',//发送到服务器的数据编码类型
			dataType:'json',//服务器返回的数据类型
		   /* queryParams:queryParams,*/
			selectItemName:'',//radio or checkbox 的字段名
			columns:[{
				checkbox:true,
				field:'selfApplyID',
				visible:false
			},{
				field:'selfCompanyName',//返回值名称
				title:'公司名称',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
				visible:false
			},{
				field:'selfSampleName',//返回值名称
				title:'样品名称',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
			},{
				field:'selfDetection',//返回值名称
				title:'检测方法',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
			},{
				field:'selfContact',//返回值名称
				title:'联系人',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
			},{
				field:'selfContactPhone',//返回值名称
				title:'联系电话',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
			},{
				field:'selfEntryData',//返回值名称
				title:'录入日期',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
				visible:false
			},{
				field:'selfRemork',//返回值名称
				title:'备注',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
			},{
				field:'selfHasContact',//返回值名称
				title:'是否已联系',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
			}]//列配置项,详情请查看 列参数 表格
		});
	};
	
/*	if($.cookie("username")==""||$.cookie("username")==null){
	alert("ndjkfbk");
	loginbox.style.display = "block";
	imask.style.display = "block";
}else{
	usershowid.style.display="block";
	usershowid.innerHTML=""+$.cookie("username")+"";
	table();
	}*/
/*function queryParams(pageReqeust) {  
    //console.log("-----params-----"); 
    pageReqeust.userName = "admin";  //
    pageReqeust.querys = $(".input-outline").val(); 
    pageReqeust.pageNo = this.offset;  
    pageReqeust.pageSize = this.pageNumber;  
    pageReqeust.length = 6;
//直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，
    
    if($("#isTouchReviewStatus").val()==""||$("#isTouchReviewStatus").val().length==0)
   	 pageReqeust.isTouchReviewStatus = encodeURI("null");
   else
    pageReqeust.isTouchReviewStatus =  encodeURI($("#isTouchReviewStatus").val()) ;
    
    if($("#selfSampleName").val()=="")
    	 pageReqeust.selfSampleName = "null";
    else
    pageReqeust.selfSampleName =  encodeURI($("#selfSampleName").val()) ;//传递中文参数乱码的解决方法
  
    if($("#selfCompanyName").val()=="")
    	pageReqeust.selfCompanyName = "null";
    else
    pageReqeust.selfCompanyName =  encodeURI($("#selfCompanyName").val());
    if($('select').val()=="")
    	 pageReqeust.selfHasContact = "null";
    else
    	pageReqeust.selfHasContact = encodeURI($('select').val());
    console.log(pageReqeust);
    return pageReqeust;  
}*/