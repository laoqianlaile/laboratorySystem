var ID,//任务ID
	taskManID,
	factoryCode;//出厂编码
	
$(function () {
	receiptlistID = getUrlParam("receiptlistID");
	$('#receiptlistID').text(receiptlistID);
	ID = getUrlParam("ID");// 任务ID
	factoryCode = getUrlParam("factoryCode");// 出厂编号
	$('#factoryCode span').text(factoryCode);
	
	// 获取当前登录人员的部门ID和部门名称
	$.ajax({
		url:'employeeController/getDepartmentInfo.do',
		dataType:'json',
		success:function(o){
			var data = JSON.parse(o);
			console.log(data[0]);
			$('#departmentID').text(data[0].ID);
			$('#departmentPeople').text(data[0].departmentName);
	  	}
	});
	
	// 初始化表格
	$('#table').bootstrapTable({
		//定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数	
		pageNumber:1,//首页页码
		pageList: [5, 10],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'task.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'taskController/getTaskAssignPeople.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						var parame = {};
				        parame.limit = params.limit;
						parame.offset = params.offset;
						parame.search = "";
						parame.sort = params.sort;
						params.order = params.order;
						parame.ID = ID;
						return parame;   
		},
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,// 禁止多选
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'ID',//返回值名称
			title:'任务ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'taskManID',//返回值名称
			title:'任务检测表ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'factoryCode',//返回值名称
			title:'出厂编码',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		},{
			field:'sampleName',//返回值名称
			title:'样品名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		},{
			field:'specifications',//返回值名称
			title:'规格型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'15%'//宽度
		},{
			field:'nameCn',//返回值名称
			title:'检测/校准项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'state',//返回值名称
			title:'状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'detector',//返回值名称
			title:'检测/校准人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'custodian',//返回值名称
			title:'监督员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'operate',//返回值名称
			title:'操作',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
			formatter:function(value,row,index){
				var btn_editCustodian = '<span class="glyphicon glyphicon-glass" onclick="editCustodian()" data-toggle="tooltip" data-placement="top" title="修改监督人" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
		  		var btn_editDetector = '<span class="glyphicon glyphicon-user" onclick="editDetector(\'' + row.taskManID + '\')" data-toggle="tooltip" data-placement="top" title="修改检测人" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
		  		return btn_editDetector + '  ' + btn_editCustodian;
            } 
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

// 修改监督员弹框
function editCustodian(){
	$('#sampleCode').text(factoryCode);
	$('#assignType').text('0');
	
	var departmentID = $('#departmentID').text();
	
	$('#assignTable').bootstrapTable({
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1, 3, 5],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'employee.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'employeeController/getEmployeeWithPagingInTaskAssign.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		    			var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
		    				limit: params.limit, //页面大小  
		    				offset: params.offset, //偏移量
			    			search: "",//初始化搜索文字
			    			sort: params.sort, //排序列名  
			    			order: params.order, //排位命令（desc，asc）
			    			ID:departmentID
		    			};  
		    			return temp;  
		    	  	},
	  	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,// 禁止多选
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'ID',//返回值名称
			title:'员工ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
			visible:false
		},{
			field:'employeeCode',//返回值名称
			title:'员工编码',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'employeeName',//返回值名称
			title:'姓名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'sex',//返回值名称
			title:'性别',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'dutyName',//返回值名称
			title:'职位',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'roleName',//返回值名称
			title:'角色',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'level',//返回值名称
			title:'能力等级',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	
	$('#assignPeopleModal').modal('show');
}

// 修改检测人员弹框
function editDetector(data){
	taskManID = data;
	$('#sampleCode').text(factoryCode);
	$('#assignType').text('1');
	
	var departmentID = $('#departmentID').text();
	
	$('#assignTable').bootstrapTable({
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1, 3, 5],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'employee.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'employeeController/getEmployeeWithPagingInTaskAssign.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:function queryParams(params) { //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		    			var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
		    				limit: params.limit, //页面大小  
		    				offset: params.offset, //偏移量
			    			search: "",//初始化搜索文字
			    			sort: params.sort, //排序列名  
			    			order: params.order, //排位命令（desc，asc）
			    			ID:departmentID
		    			};  
		    			return temp;  
		    	  	},
	  	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,// 禁止多选
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'ID',//返回值名称
			title:'员工ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
			visible:false
		},{
			field:'employeeCode',//返回值名称
			title:'员工编码',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'employeeName',//返回值名称
			title:'姓名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'sex',//返回值名称
			title:'性别',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'dutyName',//返回值名称
			title:'职位',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'roleName',//返回值名称
			title:'角色',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'level',//返回值名称
			title:'能力等级',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
	
	$('#assignPeopleModal').modal('show');
}

//分配方法
$('#assign').click(function(){
	var assignType = $('#assignType').text();// 分配人员类型
	if(assignType === "1"){
		assignDetector();
	}else if(assignType === "0"){
		assignCustodian();
	}
});

// 修改监督员 
function assignCustodian(){
	var data = $('#assignTable').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		chen.alert("请选中一条数据");
		return;
	}
	
	var parame = {};
	
	parame.taskID = ID;
	parame.IDs = data[0].ID;
	parame.assignType = 0;
	parame.type = 2;
	console.log(parame);
	
	$.ajax({
		url:'taskController/assignTaskPeople.do',
		data:parame,
		dataType:'json',
		success:function(data){
			if(data === "1"){
				chen.alert("分配成功");
				$('#assignPeopleModal').modal('hide');
				$('#table').bootstrapTable('refresh');
			}
	  	}
	});
};

// 修改检测人员
function assignDetector(){
	var data = $('#assignTable').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		chen.alert("请选中一条数据");
		return;
	}
	
	var parame = {};
	
	parame.taskID = ID;
	parame.taskManID = taskManID;
	parame.IDs = data[0].ID;
	parame.assignType = 1;
	parame.type = 2;
	
	console.log(parame);
	
	$.ajax({
		url:'taskController/assignTaskPeople.do',
		data:parame,
		dataType:'json',
		success:function(data){
			if(data === "1"){
				chen.alert("分配成功");
				$('#assignPeopleModal').modal('hide');
				$('#table').bootstrapTable('refresh');
			}
	  	}
	});
};

//返回按钮
$('#return').click(function(){
	var receiptlistID = $('#receiptlistID').text();
	window.location.href = window.location.href.split('?')[0].replace('editAssignPeople.jsp','taskAssign.jsp') + "?ID=" + receiptlistID;
});

/*通过正则获取url中的参数*/
function getUrlParam(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURI(r[2]); return null;
}