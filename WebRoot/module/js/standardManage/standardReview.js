$(function(){
	init();
});


function init(){
	

	$(function(){
		$('#table').bootstrapTable({
			striped:true, // 隔行变色效果
			pagination:true,// 在表格底部显示分页条
			pageSize:10,// 页面数据条数
			pageNumber: 1,// 首页页码
			pageList: [3,5,,9,10,200,500],// 设置可供选择的页面数据条数
			clickToSelect : false,// 设置true 将点击时，自动选择rediobox 和 checkbox
			cache:false,// 禁用AJAX数据缓存
			sortName:'ID',
			sortOrder:'asc',
			url:'standardController/getStandardWithPaging.do',
			sidePagination:'server',
			contentType : 'application/json',
			dataType : 'json',
			offset: 0,
			queryParams: queryParams, //参数  
			queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
			showRefresh: false,  // 显示刷新按钮
			
			columns:[{
				checkbox:true,
				align:'center',
	            valign:'middle',
				width:'1%'// 宽度
			},{
				  field: '',
	              title: '序号',
	              width:'4%',
	              align:'center',
	              valign:'middle',
	              formatter: function (value, row, index) {
	                  return index+1;
	              }
			},{
				field:'ID',// 返回值名称
				title:'标准ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'fileID',// 返回值名称
				title:'文件ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'STANDARDCODE',// 返回值名称
				title:'标准编码',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'14%',// 宽度
			},{
				field:'STANDARDNAME',// 返回值名称
				title:'标准名称',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'20%'// 宽度
			},{
				field:'standardTypeName',// 返回值名称
				title:'类别',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'APPLICATIONTYPE',// 返回值名称
				title:'引用类型',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'SUGGEST',// 返回值名称
				title:'审核意见',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'17%'// 宽度
			},{
				field:'STATE',// 返回值名称
				title:'状态',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'',
				title:'操作',
				align:'center',
				valign:'middle',
				width:'12%',
				 formatter:function(value,row,index){ 
					 var e = "<img src = 'module/img/download_icon.png' onclick='downFile("+row.fileID+")' title='下载' style='cursor:pointer;margin-right:8px;' />"
					 if(row.STATE == "待审核"){
						 var a = "<button  onclick='openSuggest(1,"+row.ID+")' title='通过'  class='glyphicon glyphicon-log-in' style='color: rgb(10, 78, 143);margin-right:8px;'></button>";
						 var b = "<button  onclick='openSuggest(3,"+row.ID+")' title='驳回'  class='glyphicon glyphicon-log-out' style='color: rgb(10, 78, 143);margin-right:8px;'></button>";
		                 return e + a + b ;    
					 }
					 else{
						 return e
					 }
	             }   
			}]// 列配置项,详情请查看 列参数 表格
			/* 事件 */
		});
	});
}

function queryParams(params) {  //配置参数 

	  var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			    
		      STANDARDCODE: $('#query_STANDARDCODE').val(),  
		      STANDARDNAME: $('#query_STANDARDNAME').val(),  
		      TYPE: $('#query_TYPE').val(),  
		      STATE: $('#query_STATE').val(), 
		      APPLICATIONTYPE: $('#query_APPLICATIONTYPE').val(),
		      limit: params.limit,   //页面大小  
		      offset: params.offset,  //页码   
		      sort: params.offter,  //排序列名  
		      sortOrder: params.order//排位命令（desc，asc）  
		    };  
		    return temp;  
  }  
/* 判断是否登录  */
function isLogin(){
	islogin = $('#EMPLOYEEID').val();
	if(islogin === null || islogin === "" || islogin === "null"){
		 alert("您还没登录， 请先登录");
		 return false;
	}
	else{
		return true;
	}
}

/* 刷新方法 */
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

/* 重置刷新 */
function reSetRefresh(){
	document.getElementById("query_STANDARDCODE").value=""; 	
	document.getElementById("query_STANDARDNAME").value=""; 	
	document.getElementById("query_STATE").value=0;
	document.getElementById("query_TYPE").value=""; 	
	document.getElementById("query_APPLICATIONTYPE").value="";
	
	query();
}


window.onload = function(){
	getStandardType("query_TYPE");
}

/* 下载文件*/

function downFile(fileID){
	if(! isLogin()){
		return;
	}
	else{
		if(confirm("确定下载？")){
			if(fileID === null || fileID === "" || fileID === "null"){
				alert("该文件不存在");
				return;
			}
			else{
				downOneFile(fileID);
				return;
			}
		}
	}
}

/* 获取标准类型信息*/
function getStandardType(id){
	$.ajax({
		url : 'standardController/getStandardType.do',
		success : function(o) {
			
			if($('#' + id + '').children().length >= 0)
			{
				var data = JSON.parse(o);
				
				for (var i=0; i<data.length;i++)
				{
					$('#' + id + '').append("<option value='" + data[i].ID + "' >" +data[i].standardTypeName + " </option>");
				}
			}
			
		}

	});
}

/**/
function openSuggest(){
	if(! isLogin()){
		return;
	}
	else{
		 $('#Modal').modal('show');
		 $('#AuditStandard').attr("value",arguments[0]);
		 $('#StandardID').attr("value",arguments[1]);
	}
	 
}
function AuditStandard(){
	
	var parame = {};
	parame.ID = $('#StandardID').val();
	parame.STANDARDCODE = "";
	parame.STANDARDNAME = "";
	parame.TYPE = "";
	parame.SCOPE = "";
	parame.APPLICATIONTYPE = "";
	parame.EDITSTATE = "";
	parame.SUGGEST = $('#Suggest').val();
	parame.STATE = $('#AuditStandard').val();
	
	$.ajax({
	  url:'standardController/upStandard.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  alert("审核失败");
		  }
		  $('#Modal').modal('hide');
		  refresh();
	  }
	});
}

/* 查询方法 */
function query(){
	
	init();
	refresh();
}