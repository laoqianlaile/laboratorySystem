var id="";

$(function(){
	$('#table').bootstrapTable({
		height: '377',//定义表格的高度
		pagination: true,//在表格底部显示分页条
		classes:'table table-condensed',
		clickToSelect:true,
		pageSize: 20,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5,10, 20,50],//设置可供选择的页面数据条数
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'documentTypeController/getdocumentWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
	    columns:[{
	    	field:'ID',
	    	visible:false,
	    },{
	    	checkbox:true,
	    	align:'center',
	    	valign:'middle',
	    	width:'30',
	    },{
	    	field:'number',
	    	title:'序号',
	    	align:'center',
	    	valign:'middle',
	    	width:'20',
	    },{
	        field:'documentTypeCode',
	        title:'编号',
	        align:'center',
	        valign:'middle',
	        width:'100',
	    },{
	        field:'documentTypeName',
	        title:'类别',
	        align:'center',
	        valign:'middle',
	        width:'140',
	    },{
	        field:'scope',
	        title:'适用范围',
	        align:'center',
	        valign:'middle',
	        width:'140',
	    },{
	        field:'createTime',
	        title:'创建时间',
	        align:'center',
	        valign:'middle',
	        width:'140',
	    }]
	});
});

function add(){
	var getdata = {};
	getdata.documentTypeCode=$('#documentTypeCode').val();
	getdata.documentTypeName=$('#documentTypeName').val();
	getdata.scope=$('#scope').val();
	$.ajax({
		url:'documentTypeController/add.do',
		data:getdata,
		success:function(e){
			refresh();
		}
	});
}

function showInfo(i){
	var dom = document.getElementById("surebtn");
	var upbtn = document.getElementById("upbtn");
	if(i==1){
		$('#myModalLabel').html('文档分类修改');
		var getdata = $('#table').bootstrapTable('getSelections');
		if(getdata.length==1){
			upbtn.setAttribute("data-target",".bs-example-modal-lg");
			id=getdata[0].ID;
			$('#documentTypeCode').val(getdata[0].documentTypeCode);
			$('#documentTypeName').val(getdata[0].documentTypeName);
			$('#scope').val(getdata[0].scope);
			dom.setAttribute("onclick", "updata()"); 
		}else{
			upbtn.setAttribute("data-target","null");
			alert("请选择或请单选");	
		}
	}else{
		$('#myModalLabel').html('文档分类新增');
		$('#documentTypeCode').val("");
		$('#documentTypeName').val("");
		$('#scope').val("");
		dom.setAttribute("onclick", "add()"); 
	}
	
}

function updata(){
	var getdata = {};
	getdata.documentTypeCode=$('#documentTypeCode').val();
	getdata.documentTypeName=$('#documentTypeName').val();
	alert(getdata.scope);
	getdata.ID = id;
	$.ajax({
		url:'documentTypeController/updata.do',
		data:getdata,
		success:function(e){
			refresh();
		}
	});
}

function detel(){
	var getdata = $('#table').bootstrapTable('getSelections');
	var idstr="";
	for (var i = 0 ; i < getdata.length ; i++){
		idstr += getdata[i].ID+","; 
	}
	var iddata = {};
	iddata.idstr=idstr;
	if(getdata.length<=0)
		alert("请至少选择一个");
	else{
		$.ajax({
			  url:'documentTypeController/delete.do',
			  data:iddata,
			  success:function(o){
				  refresh();
			  }
			});
	}
}

function search(){
	var getdata={};
	getdata.sdocumentCode = $('#sdocumentCode').val();
	getdata.sdocumenTypeName = $('#sdocumenTypeName').val();
	$.ajax({
		url:'documentTypeController/search.do',
		  data:getdata,
		  success:function(o){
			  refresh();
		  }
	})
}
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}