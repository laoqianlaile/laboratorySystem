var count = 60; //计数器变量
var deletDJ=0;	//判断事件变量
var setTID; //setTimeout容器
var allInfo = "";// 全部数据
function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，

	if ($("#search_artTitle").val() == "")
		pageReqeust.artTitle = "null";
	else
		pageReqeust.artTitle = encodeURI($("#search_artTitle").val());// 传递中文参数乱码的解决方法

	if (allInfo == "all") {
		pageReqeust.artColumn = "null";
	} else {
		pageReqeust.artColumn = encodeURI($("#search_artColumn").val());
	}
	
	if ($('#search_artPublisher').val() == "")
		pageReqeust.artPublisher = "null";
	else
		pageReqeust.artPublisher = encodeURI($('#search_artPublisher').val());
	pageReqeust.artCaseType = "null";
	return pageReqeust;
}

window.onload=function(){
	/*加载蒙板弹窗*/
	var showdiv = document.getElementById("showdiv");
	var imask = document.getElementById("imask");
	var loginbox = document.getElementById("login_box");
	var sHeight = document.documentElement.scrollHeight;
	var sWidth = document.documentElement.scrollWidth;
		wHeight = document.documentElement.clientHeight;
		
	var oMask = document.getElementById("imask");
		oMask.style.height=sHeight+"px";
		oMask.style.width=sWidth+"px";
		
		
	var oVerify = document.getElementById("showdiv");
		dHeight = oVerify.offsetHeight;
		dWidth = oVerify.offsetWidth;
		lastwidth = sWidth - dWidth;
		lastheight = wHeight-dHeight;
		
	$(".fixed-table-pagination").addClass("IchangeStyle");

	oVerify.style.left=lastwidth/2 + "px";
	oVerify.style.top=(lastheight-100)/2 + "px";
	loginbox.style.left=lastwidth/2 + "px";
	loginbox.style.top="202px";
	showdiv.style.display="none";
	imask.style.display="none";
	loginbox.style.display="none";

	$(".h-login").click(function(){
		
		loginbox.style.display = "block";
		imask.style.display = "block";
		});
	
	$(".close").click(function(){
		loginbox.style.display="none";
		imask.style.display="none";
	});
	
};
//登录方法
function login(){
	var password = $('#password').val(); 
	var clientNo = $('#clientNo').val(); 
	var showdiv = document.getElementById("showdiv");
	var imask = document.getElementById("imask");
	if(password == '' || typeof(password) == "undefined"
		|| clientNo == '' || typeof(clientNo) =="undefined"){ 
		alert("用户名或密码不能为空！"); 
	}else{
		var parame = {};
		parame.password = $('#password').val();
		parame.clientNo = $('#clientNo').val();
		$.ajax({
		  url:'clientController/clientLogin.do',
		  data:parame,
		  success:function(o){
			  if(o == "0"){
				  alert("用户名或密码错误！");
			  }else{
				  alert("登录成功，请继续操作！");
				  $('#login_box').hide();
				  loginbox.style.display="none";
				  imask.style.display="none";
			  }
			  refresh();
		  }
		});
	}
}


//表格初始化
$(function(){
	$('#table').bootstrapTable({
		striped : true,// 隔行变色效果
		sortName : 'articleID',// 定义排序列
		classes : 'table table-hover table-bordered table-condensed',
		clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect : true,
		pagination : true,// 在表格底部显示分页条
		rownumbers : true,// 行数 .
		pageSize :3,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [3,5,10],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortOrder : 'asc',// 定义排序方式
		url : 'articleController/getArticleWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams :queryParams,
		queryParamsType : "limit",
		// queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',// radio or checkbox 的字段名//设置True 将禁止多选	
	    columns:[{
	    	checkbox:true,
	    	visible:false
	    },{
	    	field:'articleID', //新闻ID
	    	visible:false
	    },{
	        field:'artTitle', //新闻标题
	        valign:'middle',//垂直居中显示
	        align:'left',
	    },{
	    	field:'artCregisattime', //新闻时间
	    	valign:'middle',//垂直居中显示
	    	align:'right',
	    }],
	    onClickRow:function(row){
			var articleID=row.articleID;
			window.location.href="Portal/jsp/newsPage/newDetailsPage.jsp?articleID="+articleID+"";	
		},
	    onLoadError: function () {
	    	alert("数据加载失败！");
	    },
	});
});
//第一行新闻详情加载
$(function(){
	var parame = {};
	parame.articleID = '新闻中心';
	
	$.ajax({
		url :'articleController/getFirstNews.do',
		data :parame,
		type : 'POST',// 提交方式
		dataType : 'json',// 返回数据的类型
		success:function(o) {// 后台处理数据成功后的回调函数
		  $('#newsTitle').html(o.artTitle);
		  $('#newsContent').html(o.artContent);
		  $('#firstNewsID').val(o.articleID);
		},
	});
});

function NewsDetails(){
	var articleID = $('#firstNewsID').val();
	window.location.href="Portal/jsp/newsPage/newDetailsPage.jsp?articleID="+articleID+"";	
}

function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，
	pageReqeust.artTitle = "null";
	pageReqeust.artCaseType = "null";
	pageReqeust.artPublisher = "null";
	pageReqeust.artColumn = encodeURI("新闻中心");
	return pageReqeust;
}