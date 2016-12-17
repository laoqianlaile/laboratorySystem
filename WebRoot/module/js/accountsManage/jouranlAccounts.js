var ContractInfo = {};
ContractInfo.data = getContract();//全局合同信息
ContractInfo.contractID= window.location.search.match(/\d+/i)[0];
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
			pageList: [3,5,9,10,200,500],// 设置可供选择的页面数据条数
			clickToSelect : false,// 设置true 将点击时，自动选择rediobox 和 checkbox
			cache:false,// 禁用AJAX数据缓存
			sortName:'jouranlAccount.ID',
			Order:'asc',
			url:'jouranlAccountController/getJouranlAccountsWithPaging.do',
			sidePagination:'server',
			contentType : 'application/json',
			dataType : 'json',
			offset: 0,
			queryParams: function queryParams(params) {  //配置参数 

			    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			    
			      contractID:ContractInfo.contractID,
			      contractCode: $('#query_contractCode').val(),  
			      contractName: $('#query_contractName').val(),  
			      checkinTime1: $('#query_checkTime1').val(),  
			      checkinTime2: $('#query_checkTime2').val(), 
			      limit: params.limit,   //页面大小  
			      offset: params.offset,  //页码   
			      sort: params.sort,  //排序列名  
			      order: params.order//排位命令（desc，asc）  
			    };  
			    return temp;  
			  }  , //参数  
			queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
			showRefresh: false,  // 显示刷新按钮
			
			columns:[{
				checkbox:true,
				width:'1%'// 宽度
			},{
				field:'accountsID',// 返回值名称
				title:'项目ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'contractID',// 返回值名称
				title:'合同ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'contractCode',// 返回值名称
				title:'合同编码',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%',// 宽度
			},{
				field:'contractName',// 返回值名称
				title:'合同名称',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'contractAmount',// 返回值名称
				title:'合同金额',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'employeeName',// 返回值名称
				title:'报账专员',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'invoice',// 返回值名称
				title:'发票编号 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'money',// 返回值名称
				title:'金额 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'isIncome',// 返回值名称
				title:'是否收入 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'checkinTime',// 返回值名称
				title:'录入时间 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'remarks',// 返回值名称
				title:'备注 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'',
				title:'操作',
				align:'center',
				valign:'middle',
				width:'10%',
				 formatter:function(value,row,index){    
	                 var e = '<button  onclick="viewDetailed('+row.contractID+')"  title="查看详细" class="glyphicon glyphicon-tasks" style="cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;"></button> ';
	                 var a = "<button  onclick='openEditModal("+JSON.stringify(row)+")'"+" title='修改'  class='glyphicon glyphicon-edit' style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'></button>";
	                 var d = "<button  onclick='delAccounts(\""+row.accountsID+"\")' data-toggle='tooltip'  title='删除'  class='glyphicon glyphicon-remove-sign' style='color: rgb(10, 78, 143);margin-right:8px;'></button>";
	                 return e+a+d;
	             }   
			}]// 列配置项,详情请查看 列参数 表格
			/* 事件 */
		});
	});
}

/* 刷新方法 */
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}




/* 查询方法 */
function query(){
	init();
	refresh();		
}

function openAddModal(){
	
}
/* 重置刷新 */
function reSetRefresh(){
	document.getElementById("query_contractCode").value=""; 	
	document.getElementById("query_contractName").value="";
	document.getElementById("checkTime1").value=""; 	
	document.getElementById("checkTime2").value="";
	query();
}
function isLogin(){
	 islogin = $('#uploaderID').val();
	 if(islogin === null || islogin === "" || islogin === "null"){
		 alert("您还没登录， 请先登录");
		 return false;
	 }
	 else{
		 return true;
	 }
}

/* 获取合同数据 */
function getContract(){
	var data;
	$.ajax({
		url : 'contractController/getContract.do',
		dataType : "json",
		async : false,
		data : {},
		success : function(o) {
			data = JSON.parse(o);
		},
		error : function() {
			return false;
		}
	});
	return data;
}
