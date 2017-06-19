/*window.onload=function(){
	加载蒙板弹窗
	var imask = document.getElementById("imask");
	var con = document.getElementById("contenttable");
	var usershowid = document.getElementById("usershowid");
	var loginshow = document.getElementById("h-loginshow");
	var loginbox = document.getElementById("login_box");
	var sHeight = document.documentElement.scrollHeight;
	var sWidth = document.documentElement.scrollWidth;
		wHeight = document.documentElement.clientHeight;
		
		imask.style.height=sHeight+"px";
		imask.style.width=sWidth+"px";
		
		dHeight = loginbox.offsetHeight;
		dWidth = loginbox.offsetWidth;
		lastwidth = sWidth - dWidth;
		lastheight = wHeight-dHeight;
		
	$(".fixed-table-pagination").addClass("IchangeStyle");

	loginbox.style.left=lastwidth/2 + "px";
	loginbox.style.top="202px";
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
	
	//判断是否有用户登录
	var id="${sessionScope.clientNo}";
	if(id==""||id==null){
		loginbox.style.display = "block";
		imask.style.display = "block";
	}else{
		loadingtable();
		usershowid.style.display="block";
		loginshow.style.display="none";
		usershowid.innerHTML=""+id+"";
	}
	
};*/


function login(){
	var password = $('#password').val(); 
	var clientNo = $('#clientNo').val(); 
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
				  imask.style.display="none";
				loadingtable();
			  }
			  refresh();
		  }
		});
	}
}

/*function loadingtable(){
	$('#table').bootstrapTable({
		height: '500',//定义表格的高度
		pagination: true,//在表格底部显示分页条
		striped : true,// 隔行变色效果
		classes:'table table-hover table-condensed',
		clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect:true,
		pageSize: 3,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [3,5,10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'contractController/getContractWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		onClickRow:onClickRow,
		selectItemName:'',//radio or checkbox 的字段名//设置True 将禁止多选	
	    columns:[{
	    	checkbox:true,
	    	visible:false
	    },{
	    	field:'ID',
	    	visible:false
	    },{
	        field:'nameCn',
	    }]
	});
//	$(".fixed-table-pagination").addClass("IchangeStyle");
}*/

//初始化表格方法
function getTable(){
	$('#table2s').bootstrapTable({
		height:500,
		classes:'table table-hover table-condensed',
		clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect:true,
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'testProjectController/getTestproWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名//设置True 将禁止多选
		onClickRow:onClickRow,
	    columns:[{
	    	checkbox:true,
	    	visible:false
	    },{
	        field: 'ID',
	        visible:false
	    },{
	        field: 'nameCn',
	    }]
	});
}
//初始化表格
/*$(function(){
	$('#table').bootstrapTable({
		height:500,
		classes:'table table-hover table-condensed',
		clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect:true,
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'testProjectController/getContractWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名//设置True 将禁止多选
		onClickRow:onClickRow,
	    columns:[{
	    	checkbox:true,
	    	visible:false
	    },{
	        field: 'ID',
	        visible:false
	    },{
	        field: 'nameCn',
	    }]
	});
});
*/

function refresh(){
	$('#table').bootstrapTable('refresh', null);
}
//表格行点击方法
function onClickRow(row){
	$.ajax({
		url:'taskController/setTestProjectId.do',
		data:{
			ID:row.ID
		},
		success:function(e){
			if(e==1){
				window.location.href="http://localhost:8080/laboratorySystem/Portal/jsp/onlineQuery/queryProcess.jsp";
				/*window.location.href("../jsp/onlineQuery/queryProcess.jsp");*/
			}else{
				alert("错误");
			}
		}
	});

}

