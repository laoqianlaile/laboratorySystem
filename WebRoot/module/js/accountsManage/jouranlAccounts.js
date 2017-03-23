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
				field:'jouranlAccountID',// 返回值名称
				title:'流水账ID',// 列名
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
				width:'8%'// 宽度
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
				width:'5%'// 宽度
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
					 console.log(row.isIncome);
					 var a = "<img src = 'module/img/edit_icon.png'  onclick='openEditModal("+JSON.stringify(row)+")'"+" title='修改'  style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;' />"
					 var d = "<img src = 'module/img/delete_icon.png'   onclick='delJouranlAccounts(\""+row.jouranlAccountID+"\")'   title='删除'   style='cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'/>"
					 if(row.isIncome === "支出"){
						 var e = "<img src ='module/img/view_icon.png' onclick = 'viewDetailed(\""+row.jouranlAccountID+"\")' title='查看详细' style='cursor:pointer;margin-right:8px'/>"
						 return e + a + d;
					 }
	                
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

/* 删除流水账目 */
function delJouranlAccounts(){
	if(confirm("确定要删除？")){
		jouranlAccountsID = arguments[0];
		 $.ajax({
				url: 'jouranlAccountController/delJouranlAccounts.do',
				data:{
					jouranlAccountsID : jouranlAccountsID
				},
				success:function(o){
					if(o <= 0){
						alert("删除失败");
					}
					refresh();
				}
        });
	 }     
}

/* 新增选择  */

function  openChooseModal(){
	$('#addChooseModal').modal('show');
}

/* 新增收入  */
function addIncomeorPayment(type){
	if(type == 0){
		openAddModal("Income");
	}
	else{
		openAddModal("PayMent");
	}
}

/* 新增支出 */
function addPayMent(){
	
}
/* 拼接合同细项  */
function playFineItem(){
	var FineItemData = getContractFineItem();
	if(FineItemData === null || FineItemData === "" ||FineItemData.length === 0 ){
		return null;
	}
	var html = "";
	for(var i = 0; i < FineItemData.length; i++){
		html += "<option class= 'form-control' value='"+FineItemData[i].ID+"'>"+FineItemData[i].fineItemCode+"</option>"
	}
	return html;
}
/* 新增弹窗 */
function openAddModal(isIncome){
	for(var i = 0 ; i < ContractInfo.data.length; i++){
		if(ContractInfo.contractID === ContractInfo.data[i].contractID){ //填充数据;
			$('#add_contractCode').val(ContractInfo.data[i].contractCode);
			$('#add_contractName').val(ContractInfo.data[i].contractName);
			break;
		}
	}
	var FineItemhtml = playFineItem();
	if(isIncome !== "Income" && FineItemhtml === null ){
		alert("没有合同细项,请确认是否操作正确");
		return;
	}
	$('#add_contractFineItem').html(FineItemhtml);
	if(isIncome === "Income"){
		$("#displayFineItem").hide();
	}
	else{
		$('#displayFineItem').show();
	}
	
	$('#addModal').modal('show');
}

/* 新增流水账 */
function addJouranlAccounts(){
	var parame ={}
	
	parame.contractID = ContractInfo.contractID;
	parame.employeeID = $('#employeeID').val();
	parame.invoice = $('#add_invoice').val();
	parame.money = $('#add_money').val();
	//是否隐藏 
	if($("#displayFineItem").is(":hidden")){
		parame.isIncome = 0;
	}
	else{
		parame.isIncome = 1;
	}
	parame.remarks = $('#add_remarks').val();
	
	$.ajax({
	  url:'jouranlAccountController/addJouranlAccounts.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  alert("新增失败");
		  }
		  $('#addModal').modal('hide');
		  $('#addChooseModal').modal('hide');
		  refresh();
	  }
	});
}
/* 修改弹窗  */
function openEditModal(){
	for(var i = 0 ; i < ContractInfo.data.length; i++){
		if(ContractInfo.contractID === ContractInfo.data[i].contractID){ //填充数据;
			$('#edit_contractCode').val(ContractInfo.data[i].contractCode);
			$('#edit_contractName').val(ContractInfo.data[i].contractName);
			break;
		}
	}
	$('#jouranlAccountID').val(arguments[0].jouranlAccountID);
	$('#edit_invoice').val(arguments[0].invoice);
	$('#edit_money').val(arguments[0].money);
	//单选按钮
	if(arguments[0].isIncome === "收入"){
		$('#edit_isIncome').val(0);
		$("input:radio[value='0']").click();
	}
	else{
		$('#edit_isIncome').val(1);
		$("input:radio[value='1']").click();
	}
	
	$('#edit_remarks').val(arguments[0].remarks);
	
	$('#editModal').modal('show');
}

function editJouranlAccounts(){
	
	
	var parame = {};
	parame.jouranlAccountsID = $('#jouranlAccountID').val();
	parame.invoice= $('#edit_invoice').val();
	parame.money= $('#edit_money').val();
	parame.isIncome = $('input[name="edit_isIncome"]:checked').val();
	parame.remarks= $('#edit_remarks').val();
	
	$.ajax({
		  url:'jouranlAccountController/upJouranlAccounts.do',
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
/* 详细跳转 */
function viewDetailed(){
	window.location.href= window.location.href.split("?")[0].replace('jouranlAccounts.jsp','paymentDetail.jsp') + '?jouranlAccountID='+arguments[0]+'&contractIDs='+ContractInfo.contractID;
}
/* 回退操作 */
function backstep(){
	window.location.href= window.location.href.split("?")[0].replace('jouranlAccounts.jsp','accountsManage.jsp');
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
/* 获取合同细项  */
function getContractFineItem(){
	var data;
	$.ajax({
		url : 'contractFineItemController/getContractFineItemByContractIDs.do?ContractID='+ContractInfo.contractID,
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
