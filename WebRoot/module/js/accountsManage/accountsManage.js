var ContractInfo = {};
ContractInfo.data = getContract();//全局合同信息

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
			sortName:'accounts.ID',
			Order:'asc',
			url:'accountsController/getAccountWithPaging.do',
			sidePagination:'server',
			contentType : 'application/json',
			dataType : 'json',
			offset: 0,
			queryParams: queryParams, //参数  
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
				field:'contractCode',// 返回值名称
				title:'合同编码',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'15%',// 宽度
			},{
				field:'contractName',// 返回值名称
				title:'合同名称',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'15%'// 宽度
			},{
				field:'contractAmount',// 返回值名称
				title:'合同金额',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'18%'// 宽度
			},{
				field:'employeeName',// 返回值名称
				title:'报账专员',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'18%'// 宽度
			},{
				field:'checkinTime',// 返回值名称
				title:'录入时间 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'18%'// 宽度
			},{
				field:'',
				title:'操作',
				align:'center',
				valign:'middle',
				width:'20%',
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


function queryParams(params) {  //配置参数 

    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
    
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
  }  

/* 查询方法 */
function query(){
	init();
	refresh();		
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
function viewDetailed(){
	window.location.href = window.location.href.replace('accountsManage.jsp','jouranlAccounts.jsp') + '?ID='+arguments[0];
}
/* 新增弹窗  */
function delAccounts(){
	if(confirm("确定要删除？")){
		 accountsID = arguments[0];
		 $.ajax({
				url: 'accountsController/delAccounts.do',
				data:{
					accountsID : accountsID
				},
				success:function(o){
					if(o <= 0){
						alert("修改失败");
					}
					refresh();
				}
         });
	 }
}

/* 新增弹窗  */
function openAddModal(){
	fillContract("add_contractCode");
	$('#addModal').modal('show');
}
/* 新增账目  */
function addAccounts(){
	var parame = {};
	
	parame.contractID = $('#add_contractCode').val();
	parame.employeeID = $('#add_employeeName').val();
	parame.remarks = $('#add_remarks').val();
	$.ajax({
		  url:'accountsController/addAccounts.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("修改失败");
			  }
			  $('#addModal').modal('hide');
			  refresh();
		  }
		});
	
}
/* 合同信息html  */
function fillContract(id){
	var html = "";
	for(var i = 0 ; i < ContractInfo.data.length; i++){
		html += "<option value ='"+ ContractInfo.data[i].contractID +"'>"+ ContractInfo.data[i].contractCode +"</option>";
	}
	if($('#'+id+'').children().length == 0){
		$('#'+id+'').append(html);
	}
}

/* 修改弹窗  */
function openEditModal(){
	
	fillContract("edit_contractCode");
	$('#edit_accountsID').val(arguments[0].accountsID);
	$('#edit_contractName').val(arguments[0].contractName);
	$('#edit_contractAmount').val(arguments[0].contractAmount);
	$('#edit_employeeName').val(arguments[0].employeeName);
	$('#edit_checkinTime').val(arguments[0].checkinTime);
	
	var operator = $('#employeeID').val();
	
	if(operator === arguments[0].employeeID){
		$("div#edit .form-control").attr("disabled",false);
		
	}
	else{
		alert("不可操作");
		$("div#edit .form-control").attr("disabled","disabled");
	}
	
	$('#editModal').modal('show');
	
	
}
/* 合同信息填充  */
function contractCodeChange(type){
	if(type === "add"){
		var add_contractID = $('#add_contractCode').val();
		$("input[name^='edit_']").attr("value","");
		
		for(var i = 0; i < ContractInfo.data.length; i++){
			if(add_contractID === ContractInfo.data[i].contractID){
				$('#add_contractName').val(ContractInfo.data[i].contractName);
				$('#add_contractAmount').val(ContractInfo.data[i].contractAmount);
			}
		}
	}
	else{
		var edit_contractID = $('#edit_contractCode').val();
		$("input[name^='edit_']").attr("value","");
		
		for(var i = 0; i < ContractInfo.data.length; i++){
			if(edit_contractID === ContractInfo.data[i].contractID){
				$('#edit_contractName').val(ContractInfo.data[i].contractName);
				$('#edit_contractAmount').val(ContractInfo.data[i].contractAmount);
			}
		}
	}
	
}
/* 修改账目  */
function editAccounts(){
	var parame = {};
	
	parame.accountsID = $('#edit_accountsID').val();
	parame.contractID = $('#edit_contractCode').val();
	$.ajax({
		  url:'accountsController/upAccounts.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("修改失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  }
		});
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
