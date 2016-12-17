var count = 60; //计数器变量
var deletDJ=0;	//判断事件变量
var setTID; //setTimeout容器
/*window.onload=function(){
	加载蒙板弹窗
	var showdiv = document.getElementById("showdiv");
	var imask = document.getElementById("imask");
	var con = document.getElementById("contenttable");
	var usershowid = document.getElementById("usershowid");
	var loginshow = document.getElementById("h-loginshow");
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
	
	//判断是否有用户登录
	var id='<%=session.getAttribute("clientNo")%>';
	//var id = '<%=Session["clientNo"] %>';
	if(id==""||id==null){
		loginbox.style.display = "block";
		imask.style.display = "block";
	}else{
		loadingtable();
		usershowid.style.display="block";
		loginshow.style.display="none";
		usershowid.innerHTML=""+id+"";

};*/
//登录方法
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

//消息提示弹出框方法
function showdiag(data){
	$('#dequ').remove();
	document.getElementById("showdiv1").style.display = "none";
	var sentence = "<span id='dequ'>" + data + "</span>" ; 
	$('#showdiv1').append(sentence);
	var width=(document.body.clientWidth-300)/2;
	//var height = (document.body.clientHeight-360-100)/2;
	//document.getElementById("showdiv1").style.marginTop = height;
	document.getElementById("showdiv1").style.marginLeft = width;
	document.getElementById("showdiv1").style.display = "block";
	setTimeout("document.getElementById('showdiv1').style.display = 'none'",800);
}

//关闭手机验证框
function colse123(){
	var re=document.getElementById("recesms");
		showdiv.style.display="none";
		imask.style.display="none";
		clearTimeout(setTID);
		initializeUI(re);
		}

function loadingtable(){
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
	        field:'contractName',
	    }]
	});
//	$(".fixed-table-pagination").addClass("IchangeStyle");
}
//表格初始化
/*$(function(){
	$('#table').bootstrapTable({
		height: '500',//定义表格的高度
		pagination: true,//在表格底部显示分页条
		classes:'table table-hover table-condensed',
		clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect:true,
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1,2,3, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'',//定义排序列
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
	        field:'contractName',
	    }]
	});
});*/

function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

//计数器
function setTime(val){
	if(count==0){
		var re=document.getElementById("recesms");
		val.style.background="#198ac8";
		val.style.color="#fff";
		val.value="获取验证码";
		deletDJ=count;
	}else{
		val.style.background="#DDDDDD";
		val.style.color="#AAAAAA";
		val.value="重新发送(" + count+")";
		count--;
	}
	setTID =setTimeout(function(){
		setTime(val);
	},1000);
}

//手机号验证方法
function checkMobile(phnumb){
    var sMobile = phnumb;
    if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(sMobile))){
        return false;
    }
    else
    	return true;
} 

//初始化按钮
function initializeUI(val){
	val.style.background="#198ac8";
	val.style.color="#fff";
	val.value="获取验证码";
	count = 60;
	deletDJ = 0;
}

//表格行点击事件
function onClickRow(row){
	imask.style.display="block";
	showdiv.style.display="block";
	var ph=document.getElementById("phonenumber");
	var vr = document.getElementById("verify");
	var re=document.getElementById("recesms");
	if(count==60||count==0){
		//获取验证点击事件
		$("#recesms").click(function(){
			var check = checkMobile(ph.value);
			if(deletDJ==0){
				if(check==true){
					clearTimeout(setTID);//清空setTimeout
					count=60;
					deletDJ = 1;
					setTime(re);
					$.ajax({
						url:'contractController/sendSms.do',
						data:{
							phnumber:ph.value
						},
						success:function(e){
							if(e=="\"200\"")
								showdiag("成功发送");
							else
								showdiag("发送错误");
						}
					});
				}else{
					showdiag("请输入正确的手机号");
				}
			}else{
				showdiag("信息已发送，请注意接收...");
			}
		});
	}else{
		showdiag("错误");
	};
	//确定按钮点击事件
	$("#determine").click(function(){
		if((ph.value!=null||ph.value!="")&&(!(/^1(3|4|5|7|8|9)\d{9}$/.test(ph.value))==false)){
		$.ajax({
			url:'contractController/checkver.do',
			data:{
				phnumber:ph.value,
				code:vr.value
			},
			success:function(e){
				if(e=="\"200\""){
					var onID = row.ID;
				  	$.ajax({
						url:'fileInformationController/setcontractID.do',
						data:{
							contractID:onID
						},
						success:function(e){
							if(e==1){
								//验证成功跳转页面
								imask.style.display="block";
								showdiv.style.display="block";
								window.location.href="http://localhost:8080/laboratorySystem/Portal/jsp/onlineQuery/queryDetail.jsp";
								}
						}
				  	});
				}else
					showdiag("验证码错误");
			}
		});}
		else
			showdiag("请输入正确的手机号");
	});
}


