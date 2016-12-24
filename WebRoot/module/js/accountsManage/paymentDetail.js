var jouranlAccountID = window.location.search.match(/\d+/i)[0];

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
			sortName:'paymentDetail.ID',
			Order:'asc',
			url:'paymentDetailController/getPaymentDetailWithPaging.do',
			sidePagination:'server',
			contentType : 'application/json',
			dataType : 'json',
			offset: 0,
			queryParams: function queryParams(params) {  //配置参数 

			    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
			    
			      jouranlAccountsID:jouranlAccountID,
			      limit: params.limit,   //页面大小  
			      offset: params.offset,  //页码   
			      sort: params.sort,  //排序列名  
			      order: params.order//排位命令（desc，asc）  
			    };  
			    return temp;  
			  } , //参数  
			queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
			showRefresh: false,  // 显示刷新按钮
			
			columns:[
			 {
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
				field:'receiptlistCode',// 返回值名称
				title:'交接单号',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%',// 宽度
			},{
				field:'companyName',// 返回值名称
				title:'委托单位',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'contractCode',// 返回值名称
				title:'合同编号',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'contractName',// 返回值名称
				title:'合同名称',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'drawName',// 返回值名称
				title:'领取人员 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'invoice',// 返回值名称
				title:'发票编码 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'payMoney',// 返回值名称
				title:'支付金额 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'10%'// 宽度
			},{
				field:'employeeName',// 返回值名称
				title:'报账专员 ',// 列名
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
				width:'20%',
				 formatter:function(value,row,index){    
	                 var a = "<button  onclick='openEditModal("+JSON.stringify(row)+")'"+" title='修改'  class='glyphicon glyphicon-edit' style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'></button>";
	                 var d = "<button  onclick='delAccounts(\""+row.accountsID+"\")' data-toggle='tooltip'  title='删除'  class='glyphicon glyphicon-remove-sign' style='color: rgb(10, 78, 143);margin-right:8px;'></button>";
	                 return a+d;
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


/* 重置刷新 */
function reSetRefresh(){
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
/* 新增 弹窗 */
function openAddModal(){
	
	
	$('#addModal').modal('show');
}
function addPaymentDetail(){
	var parame = {};
	parame.receiptlistCode = $('#add_receiptlistCode').val();
	parame.jouranlAccountID = jouranlAccountID;
	parame.payMoney = $('#add_payMoney').val();
	
}
function openEditModal(){
	
	$('#edit_receiptlistCode').val(arguments[0].receiptlistCode);
	$('#edit_companyName').val(arguments[0].companyName);
	$('#edit_drawID').val(arguments[0].drawName);
	$('#edit_invoice').val(arguments[0].invoice);
	$('#edit_payMoney').val(arguments[0].payMoney);
	$('#edit_remarks').val(arguments[0].remarks);
	
	$('#editModal').modal('show');
}

function editPaymentDetail(){
	var parame = {};
	parame.receiptlistCode
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
