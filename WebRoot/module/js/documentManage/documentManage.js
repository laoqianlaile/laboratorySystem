
function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空
	if ($("#sdocumentCode").val() == "")
		pageReqeust.documentCode =null;
	else
		pageReqeust.documentCode = encodeURI($("#sdocumentCode").val());// 传递中文参数乱码的解决方法

	if ($("#sdocumentName").val() == "") {
		pageReqeust.documentName =null;
	} else {
		pageReqeust.documentName = encodeURI($("#sdocumentName").val());
	}
	
	if ($('#sdocumentTypeName').val() == "")
		pageReqeust.documentTypeID =null;
	else
		pageReqeust.documentTypeID = encodeURI($('#sdocumentTypeName').val());
	
	return pageReqeust;
}
$(function(){
	
/*加载分类*/
	var html = "";
	/*$("#sdocumentTypeName").find("option").remove();*/
	$.post("documentTypeController/getDocumentTypes.do", function(result) {
		result = JSON.parse(result);
		for ( var i = 0; i < result.length; i++) {
			html += "<option value=" + result[i].ID + ">" + result[i].documentTypeName
					+ "</option>";
		}
		$("#sdocumentTypeName").append(html);
	});
	
	/*加载表格*/
	$('#table').bootstrapTable({
		height: '377',//定义表格的高度
		pagination: true,//在表格底部显示分页条
		classes:'table table-condensed',
		clickToSelect:true,
		pageSize: 20,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5,10, 20,50],//设置可供选择的页面数据条数
		cache: false,//禁用 AJAX 数据缓存
		sortName:'document.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		queryParams : queryParams,
		queryParamsType : "limit",
		url:'documentController/getDocumentByConditionWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		success:function(){$('#table').bootstrapTable();},
	    columns:[{
	    	checkbox:true,
	    	align:'center',
	    	valign:'middle',
	    	width:'30',
	    },{
	    	field:'documentID',
	    	visible:false,
	    },{
	    	field:'documentCode',
	    	title:'编号',
	    	align:'center',
	    	valign:'middle',
	    	width:'30',
	    },{
	        field:'documentName',
	        title:'文档名称',
	        align:'center',
	        valign:'middle',
	        width:'200',
	    },{
	        field:'documentTypeName',
	        title:'类别',
	        align:'center',
	        valign:'middle',
	        width:'240',
	    },{
	        field:'saveTime',
	        title:'创建时间',
	        align:'center',
	        valign:'middle',
	        width:'140',
	    },{
	        field:'description',
	        title:'描述',
	        align:'center',
	        valign:'middle',
	        width:'140',
	    }]
	});
});
function search(){//查询
	/*
	var getdata={};
	getdata.documentCode = $('#sdocumentCode').val();
	getdata.documentName = $('#sdocumentName').val();
	getdata.documentTypeID = $('#sdocumentTypeName').val();alert(getdata.documentTypeID);
	var a=queryParams(getdata);*/
	$('#table').bootstrapTable('refresh', queryParams);
}
function agreementSubtypeOption(){
	$('#table').bootstrapTable('refresh', queryParams);
}
$('input').keypress(function(event){  
    var keycode = (event.keyCode ? event.keyCode : event.which);  
    if(keycode == '13'){  
    	$('#table').bootstrapTable('refresh', queryParams);   
    }  
}); 
function refresh() {	
	$('#table').bootstrapTable('refresh', null);
}
function showInfo(){
	var html = "";
	$("#documentTypeID").find("option").remove();
	$.post("documentTypeController/getDocumentTypes.do", function(result) {
		result = JSON.parse(result);
		for ( var i = 0; i < result.length; i++) {
			html += "<option value=" + result[i].ID + ">" + result[i].documentTypeName
					+ "</option>";
		}
		$("#documentTypeID").append(html);
		
	});
	$.ajax({
		url:'documentController/creatID.do',
		success:function(data, textStatus){
			
			$('#documentID').val(data.replace("\"","").replace("\"",""));
		}
	});
	
	
}
function add(){
	var getdata = {};
	getdata.ID=$('#documentID').val();
	alert(getdata.ID);
	getdata.documentCode=$('#documentCode').val();
	getdata.documentName=$('#documentName').val();
	getdata.documentTypeID=$('#documentTypeID').val();
	getdata.description=$('#description').val();
	$.ajax({
		type : 'post',
		url:'documentController/addDocument.do',
		data:getdata,
		success:function(e){
			refresh();
		}
	});
}

function download(){
	var fileID=new Array();
	var getdata = $('#table').bootstrapTable('getSelections');
	
	if(getdata.length==1){
		fileID=getdata[0].documentID;
		window.location.href="documentController/filedownload.do?ID="+fileID;
	}
	else if(getdata.length>1){	
		for(var i=0;i<getdata.length;i++){
		fileID[i]=getdata[i].documentID;	
		}
		window.location.href="documentController/downloadFiles.do?IDs="+fileID;
	}
	else{
		alert("请选择文档！");
	}	
}
function wordView(){
	
	var getdata = $('#table').bootstrapTable('getSelections');
	var frameSrc="";
	if(getdata.length==1){
		
		var ID = {
	            ID:getdata[0].documentID
	        };
		$("#NoPermissioniframe").attr("src", "module/jsp/documentManage/htmlView.jsp"); 
		$('#NoPermissionModal').modal({ show: true, backdrop: 'static' });
		$.ajax({
			type : 'post',
			url:'documentController/getWord.do',
			data:ID,
			success:function(data){
				frameSrc=data;
				frameSrc=frameSrc.replace("\"","").replace("\"","");
				frameSrc=frameSrc.replace("\\","");
				 $("#NoPermissioniframe").attr("src", frameSrc);  
			     
			}
		});
	
		
      
	}
	else{
		alert("请选择一个文档进行预览！");
	}	
}
function del() {
	var data = $('#table').bootstrapTable("getSelections");

	if (data.length == 0) {
		alert("请选中至少一条数据");
		return;
	}
	var msg=confirm("确认要删除这篇文章？");
	if(msg==true){
		var ids = "";
		for ( var i = 0; i < data.length; i++) {
			ids += data[i].documentID + ",";
		}
		var ajaxParameter = {
				IDs : ids
			};	
		$.ajax({
			url : 'documentController/deleteDocumentByIDs.do',
			data : ajaxParameter,
			success : function(o) {
				if (o <= 0) {
					alert("删除失败");
				}
				refresh();
			}
		});	
	}
	else{
		return;	
	}
		
}
