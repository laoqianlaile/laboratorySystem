
/**
 * 使页面跳转到查看合同页面(审核)
 */
function showContractA(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	var code = data[0].contractCode;
	if (!code && typeof(code)!="undefined" && code=='') 
	{ 
		alert("合同编号不能为空！"); 
	}else {
		window.location.href="module/jsp/contractManage/contractView.jsp?code="+ code + "&type=1";
	}
}
