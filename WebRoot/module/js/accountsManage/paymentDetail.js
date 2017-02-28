/* 获取 地址栏参数值*/
function GetQueryString(sProp) {
	var re = new RegExp("[&,?]"+sProp + "=([^\\&]*)", "i");
	var a = re.exec(document.location.search); 
	if (a == null)
	return "";
	return a[1]; 
}
var jouranlAccountID = window.location.search.match(/\d+/i)[0];
var contractID = GetQueryString("contractIDs");
/* 全局数据  */
var  JouranlAccountDate = {};
JouranlAccountDate.data = getJouranlAccount(); // 流水账信息

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
				field:'paymentdetailID',// 返回值名称
				title:'支付详情ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'receiptlistID',// 返回值名称
				title:'交接单ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'drawID',// 返回值名称
				title:'领取人ID',// 列名
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
					 var a = "<img src ='module/img/edit_icon.png' onclick='openEditModal("+JSON.stringify(row)+")'  title='修改' style='cursor:pointer;margin-right:8px;' />"
					 var d = "<img src ='module/img/delete_icon.png' onclick='delPaymentDetail(\""+row.paymentdetailID+"\")'  title='删除' style='cursor:pointer;margin-right:8px;' />"
	                 return a+d;
	             }   
			}]// 列配置项,详情请查看 列参数 表格
			/* 事件 */
		});
	});
}
/* 删除方法 */
function delPaymentDetail(){
	if(confirm("确定要删除？")){
		paymentDetailID = arguments[0];
		 $.ajax({
				url: 'paymentDetailController/delPaymentDetail.do',
				data:{
					paymentDetailID : paymentDetailID
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
	$('#add_companyName').val(JouranlAccountDate.data[0].companyName);
	$('#add_invoice').val(JouranlAccountDate.data[0].invoice);
	data = getReceiptlistInfo();
	var html = "";
	for(var i = 0 ; i < data.length; i++){
		html += "<option class='form-control' value ='"+ data[i].ID+"'>" +data[i].receiptlistCode+"</option>"
	}
	$('#add_receiptlistID').html(html);
	
	$('#addModal').modal('show');
}
function addPaymentDetail(){
	var parame = {};
	
	parame.jouranlAccountID = jouranlAccountID; //流水账ID
	parame.employeeID = "";//创建人
	parame.drawID = $('#add_drawID').val();//领取人ID
	parame.receiptlistID = $('#add_receiptlistID').val();//交接单ID
	parame.payMoney = $('#add_payMoney').val(); // 支付金额
	parame.remarks = $('#add_remarks').val();
	
	$.ajax({
		  url:'paymentDetailController/addPaymentDetail.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("新增失败");
			  }
			  $('#addModal').modal('hide');
			  refresh();
		  }
		});
	
}
/* 得到焦点时显示数据 */
$('#add_drawName').focus(function(){
	matchEmployee("add");
});
$('#edit_drawName').focus(function(){
	matchEmployee("edit");
});
/* 失去焦点时隐藏数据  */
//$('#add_drawName').blur(function(){
//	$('#draw').css("display","none");
//});
/* 领取人  */
function matchEmployee(Type){
	$('#'+Type+'Draw').css("display","block");
	var matchName = $('#'+Type+'_drawName').val();
	drawName = matchName.split("-")[0];
	console.log(drawName);
	var data;
	$.ajax({
		url : 'employeeController/getEmployeeData.do?matchName=' + drawName,
		dataType : "json",
		async : false,
		data : {},
		success :　function(o){
			data = JSON.parse(o);
		},
		error : function(){
			return false;
		}
	});
	if(data.length == 0){
		console.log("没有搜索到人员，请重新输入或检查是否有员工。");
	}
	return fullDrawMan(data);
	
}

/* 生成Html */
function fullDrawMan(data){
	var html = "<div class='form-control' >";
	if(data.length < 4){
		for(var i = 0; i < data.length ; i++){
			html += "<option class='form-control' value ='"+data[i].ID+"' onclick='getDrawMan(this)'>" + data[i].employeeName +"-"+ data[i].departmentName  + " </option>";
		}
	}
	else{
		for(var i = 0; i < 4 ; i++){
			html += "<option class='form-control' value ='"+data[i].ID+"' onclick='getDrawMan(this)'>" + data[i].employeeName +"-"+ data[i].departmentName  + " </option>";
		}
	}
		
	html +="</div>"
	if($("#editModal").is(":visible")){
		$('#editDraw').html(html);
	}
	if($("#addModal").is(":visible")){
		$('#addDraw').html(html);
	}
}
/* 得到领取人  */
function getDrawMan(d){
	console.log("getDrawMan is used");
	if($("#editModal").is(":visible")){
		$('#editDraw').css("display","none");
		$('#edit_drawName').val(d.text);
		$('#edit_drawID').val(d.value);
	}
	if($("#addModal").is(":visible")){
		$('#addDraw').css("display","none");
		$('#add_drawName').val(d.text);
		$('#add_drawID').val(d.value);
	}
	
}
/* 修改弹窗 */
function openEditModal(){
	
	$('#payMentDetailID').val(arguments[0].paymentdetailID);
	$('#receiptlistID').val(arguments[0].receiptlistID);
	data = getReceiptlistInfo();
	var html = "";
	for(var i = 0 ; i < data.length; i++){
		html += "<option class='form-control' value ='"+ data[i].ID+"'>" +data[i].receiptlistCode+"</option>"
	}
	$('#edit_receiptlistCode').html(html);
	console.log();
	$("#edit_receiptlistCode option[text='"+arguments[0].receiptlistCode+"']").attr("selected", true); 
	$('#edit_companyName').val(arguments[0].companyName);
	$('#edit_invoice').val(arguments[0].invoice);
	$('#edit_payMoney').val(arguments[0].payMoney);
	$('#edit_drawName').val(arguments[0].drawName);
	$('#edit_drawID').val(arguments[0].drawID);
	$('#edit_remarks').val(arguments[0].remarks);
	
	$('#editModal').modal('show');
}

function editPaymentDetail(){
	var parame = {};
	parame.payMentDetailID = $('#payMentDetailID').val();
	parame.receiptlistID = $('#edit_receiptlistCode').val();
	parame.drawID = $('#edit_drawID').val();
	parame.PayMoney = $('#edit_payMoney').val();
	parame.remarks = $('#edit_remarks').val();
	$.ajax({
		  url:'paymentDetailController/upPaymentDetail.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("新增失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  }
		});
}

/* 回退操作 */
function backstep(){
	window.location.href= window.location.href.split("?")[0].replace('paymentDetail.jsp','jouranlAccounts.jsp')+'?ID='+contractID;
}

/* 获取合同数据 */
function getReceiptlistInfo(){
	var data;
	$.ajax({
		url : 'receiptlistController/getReceiptlistInfo.do?contractID=' + JouranlAccountDate.data[0].contractID,//合同ID
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
	if(data.length == 0){
		return alert("当前没有交接单！");
	}
	return data;
}

/* 获取 流水账数据*/
function getJouranlAccount(){
	var data;
	$.ajax({
		url : 'jouranlAccountController/getJouranlAccountDate.do?jouranlAccountID=' + jouranlAccountID,
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
	
	if(data.length == 0){
		return alert("没有支付详细，请添加！");
	}
	return data;
}

