$(function() {
	init();
});

function init() {

	$(function() {
		$('#table')
				.bootstrapTable(
						{
							striped : true, // 隔行变色效果
							pagination : true,// 在表格底部显示分页条
							pageSize : 10,// 页面数据条数
							pageNumber : 1,// 首页页码
							pageList : [ 3, 5,  9, 10, 200, 500 ],// 设置可供选择的页面数据条数
							clickToSelect : true,// 设置true 将点击时，自动选择rediobox
							// 和 checkbox
							cache : false,// 禁用AJAX数据缓存
							sortName : 'company.ID',
							order : 'asc',
							url : 'companyController/getCompanyWithPage.do',
							sidePagination : 'server',
							contentType : 'application/json',
							dataType : 'json',
							offset : 0,
							queryParams : queryParams, // 参数
							queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
							showRefresh : false, // 显示刷新按钮

							columns : [
										{
											checkbox : true,
											width : '3%'// 宽度
										},
										{
											field : '',
											title : '序号',
											width : '1%',
											align : 'center',
											valign : 'middle',
											formatter : function(value, row, index) {
												return index + 1;
											}
										},
										{
											field : 'ID',// 返回值名称
											title : '',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10',// 宽度
											visible : false
										},
										{
											field : 'companyName',// 返回值名称
											title : '公司名称',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%',// 宽度
										},
										{
											field : 'linkMan',// 返回值名称
											title : '代理人',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'mobilePhone',// 返回值名称
											title : '联系电话',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%'// 宽度
										},
										{
											field : 'address',// 返回值名称
											title : '详细地址',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '18%'// 宽度
										},{
											field : 'scope',// 返回值名称
											title : '经营范围',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%'// 宽度
										},{
											field : 'fax',// 返回值名称
											title : '传真',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%'// 宽度
										}
										,{
											field : 'emailbox',// 返回值名称
											title : '邮箱',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%'// 宽度
										},{
											field : 'createTime',// 返回值名称
											title : '创建时间',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '9%'// 宽度
										} ]
							// 列配置项,详情请查看 列参数 表格
							/* 事件 */
							});
		});
	}
function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			sort : params.sort, // 排序列名
			order : params.order
	// 排位命令（desc，asc）
	};
	return temp;
}

/* 全部数据方法 */
function query() {

	init();
	refresh();

}
/* 刷新方法 */
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0){
		swal("请至少选中一条数据");
		return;
	}
	
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += data[i].ID + ",";
	}
	
	var ajaxParameter = {
			COMPANYID:ids.substring(0, (ids.length-1))
	};
	swal({
		title : "是否删除?",
		text : "",
		type : "warning",
		showCancelButton : true,
		cancelButtonText:"NO",
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "Yes",
		closeOnConfirm : false
	}, function() {
		 swal("删除成功", "", "success");
		 $.ajax({
			  url:'companyController/delCompany.do',
			  data:ajaxParameter,
			  success:function(o){
				  if(o<=0){
					  swal("删除失败");
				  }
				  refresh();
				  departrefresh();
				  
			  }
			});
		
	});
	
}
//弹出修改框
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	//$("div#only1 .form-control").attr({"disabled":false});
	$('#edit_ID').val(data[0].ID);
	$('#edit_companyName').val(data[0].companyName);
	$('#edit_linkMan').val(data[0].linkMan);
	$('#edit_mobilePhone').val(data[0].mobilePhone);
	$('#edit_scope').val(data[0].scope);
	$('#edit_address').val(data[0].address);
	$('#edit_fax').val(data[0].fax);
	$('#edit_emailbox').val(data[0].emailbox);
	
	
	$('#editModal').modal('show');
}
function edit(){
	var data = $('#table').bootstrapTable('getSelections');
	var parame = {};
	parame.ID = $('#edit_ID').val();
	parame.companyName = $('#edit_companyName').val();
	parame.linkMan = $('#edit_linkMan').val();
	parame.mobilePhone = $('#edit_mobilePhone').val();
	parame.scope =$('#edit_scope').val();
	parame.address =$('#edit_address').val();
	parame.fax =$('#edit_fax').val();
	parame.emailbox =$('#edit_emailbox').val();
	if($('#edit_mobilePhone').val()!=""){
		if($('#edit_address').val()!=""){
		if($('#edit_linkMan').val()!=""){
		if($('#edit_companyName').val()!=""){
		if(checkPhone($('#edit_mobilePhone').val())){
		if(checkEmail($('#edit_emailbox').val())||$('#edit_emailbox').val()==""){
	    if(istel($('#edit_fax').val())||$('#edit_fax').val()==""){
		
		$("input").val("");
		$.ajax({
		  url:'companyController/updCompany.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  swal("修改失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
			  swal("修改成功");
		  }
		});
	    }else swal("传真格式有误");
		}else swal("邮箱错误");
		}else swal("电话有误");
		}else swal("公司名不能为空");
		}else swal("代理人不能为空");
		}else swal("地址不能为空");
		}else swal("电话不能为空");
	
	
}
/* 新增方法 */
function add(){
	var parame = {};
	parame.companyName = $('#add_companyName').val();
	parame.linkMan = $('#add_linkMan').val();
	parame.mobilePhone = $('#add_mobilePhone').val();
	parame.scope =$('#add_scope').val();
	parame.address =$('#add_address').val();
	parame.fax =$('#add_fax').val();
	parame.emailbox =$('#add_emailbox').val();
	if($('#add_mobilePhone').val()!=""){
	if($('#add_address').val()!=""){
	if($('#add_linkMan').val()!=""){
	if($('#add_companyName').val()!=""){
	if(checkPhone($('#add_mobilePhone').val())){
	if(checkEmail($('#add_emailbox').val())||$('#add_emailbox').val()==""){
    if(istel($('#add_fax').val())||$('#add_fax').val()==""){
	
	$("input").val("");
	$.ajax({
	  url:'companyController/addCompanywj.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  swal("新增失败");
		  }
		  $('#addModal').modal('hide');
		  refresh();
		  swal("新增成功");
	  }
	});
    }else swal("传真格式有误");
	}else swal("邮箱错误");
	}else swal("电话有误");
	}else swal("公司名不能为空");
	}else swal("代理人不能为空");
	}else swal("地址不能为空");
	}else swal("电话不能为空");
	
}
//判断邮箱正误
function checkEmail(str){
   var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
   if(re.test(str)){
	   
     return true;
   }else{
      return false;
   }
}
//查询方法
function find(){
	var parame = {};
	parame.companyName = $('#companyName').val();
	parame.address = $('#address').val();
	parame.linkMan = $('#linkMan').val();
	
	$('#table').bootstrapTable('refresh', {
		silent:true,
		url:"companyController/getCompanyWithPage.do",
		query:parame
	});
}
//判断电话正误
function checkPhone(str){
   var re = /^0\d{2,3}-?\d{7,8}$/;
   if(re.test(str)){
       return true;
   }else{
       var re1= /^1\d{10}$/;
    	   if (re1.test(str)) {
    		      return true;
    		   } else {
    		       return false;
    		   }
   }
}
//传真验证
function istel(s) {
	//var patrn = /^[+]{0,1}(d){1,3}[ ]?([-]?(d){1,12})+$/;
	var patrn = /^[+]{0,1}(d){1,3}[ ]?([-]?((d)|[ ]){1,12})+$/;
	if (!patrn.exec(s))
		return false
	return true
}

