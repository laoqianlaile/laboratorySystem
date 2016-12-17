/*
function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，
	pageReqeust.artTitle = "null";
	pageReqeust.artColumn = "null";
	pageReqeust.artPublisher = "null";
	pageReqeust.artCaseType="null";
	pageReqeust.articleID=encodeURI("545");
	return pageReqeust;
}


//表格初始化
$(function(){
$('#rigTable').bootstrapTable({
	height: '500',//定义表格的高度
	pagination: true,//在表格底部显示分页条
	classes:'table table-hover table-condensed able-striped table-no-bordered',
	clickToSelect:true, //设置true 将在点击行时，自动选择rediobox 和 checkbox
	singleSelect:true,
	pageSize: 10,//页面数据条数
	pageNumber:1,//首页页码
	pageList: [1,2,3, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
	cache: false,//禁用 AJAX 数据缓存
	sortName:'',//定义排序列
	sortOrder:'asc',//定义排序方式
	url:'articleController/getArticleWithPaging.do',//服务器数据的加载地址
	sidePagination:'server',//设置在哪里进行分页
	contentType:'application/json',//发送到服务器的数据编码类型
	dataType:'json',//服务器返回的数据类型
	queryParams:queryParams,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
	selectItemName:'',//radio or checkbox 的字段名//设置True 将禁止多选	
	showHeader:false,
    columns:[{
    	field:'artContent',
		align : 'left',				
    }]	
});
});*/

function analysisUrl(data){
	var datas = data.split("&");
	var para ={};
	for (var i = 0 ; i < datas.length ; i++){
		var s = datas[i].split("=");
		if(s.length == 1){
			para[s[0]] = null;
		}else{
			para[s[0]] = s[1];
		}
	}
	return para;
}
//获取浏览器传入的参数并创建对象(这边未作异常处理)
function getURLParameter() {
	var _obj = {
		para:"",
		backInf:""
	}
	var data = decodeURIComponent(window.location.search);
	data = data.substring(1,data.length);
	var _array = data.split("|");
	if(_array.length >= 1){
		_obj.para = analysisUrl(_array[0]);
	}
	if(_array.length >= 2){
		_obj.backInf = analysisUrl(_array[1]);
	}
    return _obj;
}


$(document).ready(function(){
	var obj=getURLParameter().para;
	 $.ajax( {
		 data:obj,                  
	     url:'articleController/getArticle.do',// 跳转到 action  
	     type:'post',  
	     dataType:'json',
	     success:function(msg) {  
    	if(msg){    			    	
	    		var artcontent= "";
	    		var myobj=eval(msg);
	    			artcontent = "<div style='text-indent:20px;'>"+myobj[0].artContent+"</div>";
	    		var content = document.getElementById("artContent");
		    	content.innerHTML = artcontent; 
	    	}
	 		}
	 }); 	
});