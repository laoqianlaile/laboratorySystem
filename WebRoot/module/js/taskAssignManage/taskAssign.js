$(function () {
	var ID = window.location.search.match(/\d+/i)[0];

	$('#receiptlistID').text(ID);

	// 得到交接单信息
	$.ajax({
		url:'receiptlistController/getReceiptlistInfoInTaskAssign.do',
		data:{"ID":ID},
		dataType:'json',
		success:function(o){
			var data = JSON.parse(o);
			$('#receiptlistCode span').text(data[0].receiptlistCode);
			$('#companyName span').text(data[0].companyName);
			$('#linkMan span').text(data[0].linkMan);
			$('#acceptSampleTime span').text(data[0].createTime);
			$('#endTime span').text(data[0].endTime);
			$('#linkPhone span').text(data[0].linkPhone);
			$('#address span').text(data[0].address);
			var isClassified = data[0].isClassified === 1 ? "是" : "否";
			$('#isClassified span').text(isClassified);
			$('#classifiedLevel span').text(data[0].classifiedLevel);
			$('#employeeName span').text(data[0].employeeName);
			$('#accordingDoc').text(data[0].accordingDoc);
	  	}
	});

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

	// 得到指定交接单下的任务
	$('#taskTable').bootstrapTable({
		striped: false,// 隔行变色效果
		pagination: true,// 在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1, 3, 5],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'task.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'taskController/getTaskWithPagingInTaskAssign.do',//服务器数据的加载地址
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
			    			ID:ID
		    			};
		    			return temp;
		    	  	},
		queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,//禁止多选
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
			field:'factoryCode',//返回值名称
			title:'出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'sampleName',//返回值名称
			title:'名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'specifications',//返回值名称
			title:'型号/规格',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'nameCn',//返回值名称
			title:'检测/校准项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'getMan',//返回值名称
			title:'领样人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'getTime',//返回值名称
			title:'领样时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'returnMan',//返回值名称
			title:'退样人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'returnTime',//返回值名称
			title:'退样时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'state',//返回值名称
			title:'状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%'//宽度
		},{
			field:'detector',//返回值名称
			title:'检测/校准人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
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
				var temp = '';

				if(!(row.detector === "无" && row.custodian === "无")){
					var btn_assignAgain = '<span class="glyphicon glyphicon-user" onclick="assignAgain(\'' + row.ID + '\',\'' + row.detector + '\',\'' + row.custodian + '\',\'' + row.factoryCode + '\')" data-toggle="tooltip" data-placement="top" title="重新分配" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
			  		var btn_edit = '<span class="glyphicon glyphicon-edit" onclick="edit(\'' + row.ID + '\',\'' + row.factoryCode + '\')" data-toggle="tooltip" data-placement="top" title="修改" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
					temp += btn_assignAgain + btn_edit;
				}
		  		return temp;
            }
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});

	// 得到与交接单相关的文件信息
	$('#fileTable').bootstrapTable({
		//定义表格的高度height: 500,
		striped: false,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1, 3, 5],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'fileInformation.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'fileInformationController/getFileInTaskWithPaging.do',//服务器数据的加载地址
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
			    			ID:ID
		    			};
		    			return temp;
		    	  	},
	  	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
		selectItemName:'',//radio or checkbox 的字段名
		singleSelect:true,//禁止多选
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'ID',//返回值名称
			title:'文件ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'fileName',//返回值名称
			title:'文件名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'30%'//宽度
		},{
			field:'uploadTime',//返回值名称
			title:'上传时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%'//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'35%'//宽度
		},{
			field:'path',//返回值名称
			title:'文件路径',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'operate',//返回值名称
			title:'操作',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'20%',//宽度
			formatter:function(value,row,index){
				var btn_download = '<span class="glyphicon glyphicon-download" onclick="download(\''+ row.ID +'\')" data-toggle="tooltip" data-placement="top" title="下载" style="cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;"></span>';
		  			return btn_download;
            }
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

//分配弹框方法
$("#btn-assign").click(function(){
	var data = $('#taskTable').bootstrapTable('getSelections');
	
	if (data.length === 0) {
		swal({
				title: "请选择一条数据!",
				type: 'warning'
			});
	} else if (data[0].detector != "无" && data[0].custodian != "无") {
		swal({
			title: "该任务已分配完成!",
			type: 'warning'
		});
	} else {
		$('#sampleCode').text(data[0].factoryCode);
		$('#taskID').text(data[0].ID);
		$('#type').text(0);

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
});

// 重新分配弹框方法
function assignAgain(ID,detector,custodian,factoryCode){

	$('#sampleCode').text(factoryCode);
	$('#taskID').text(ID);
	$('#type').text(1);

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
		},{
			field:'state',//返回值名称
			title:'状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});

	$('#assignPeopleModal').modal('show');
}

//修改方法
function edit(ID,factoryCode){
	var receiptlistID = $('#receiptlistID').text();
	window.location.href = window.location.href.split("?")[0].replace('taskAssign.jsp','editAssignPeople.jsp') + '?ID=' + ID + "&factoryCode="+ factoryCode + "&receiptlistID=" + receiptlistID ;
}

//分配方法
$('#assign').click(function(){
	var assignType = $("input[name='assignType']:checked").val();// 分配人员类型
	if(assignType === "1"){
		assignDetector();
	}else if(assignType === "0"){
		assignCustodian();
	}
});

//分配监督员
function assignCustodian(){
	var data = $('#assignTable').bootstrapTable('getSelections');

	if(data.length==0 || data.length>1){
		swal({
			title: "请选中一条数据",
			type: 'warning'
		});
		return;
	}

	var parame = {};

	parame.taskID = $('#taskID').text();
	parame.IDs = data[0].ID;
	parame.assignType = 0;
	parame.type = $('#type').text();

	$.ajax({
		url:'taskController/assignTaskPeople.do',
		data:parame,
		dataType:'json',
		success:function(data){
			if(data === "1"){
				swal({
					title: "分配成功",
					type: 'success'
				});
				$('#assignPeopleModal').modal('hide');
				$('#taskTable').bootstrapTable('refresh');
			}
	  	}
	});
}

// 分配检测人员
function assignDetector(){
	var data = $('#assignTable').bootstrapTable('getSelections');

	var parame = {};
	var IDs='';
	for(var i=0;i<data.length;i++){
		IDs += data[i].ID+',';
	}

	parame.taskID = $('#taskID').text();
	parame.IDs = IDs;
	parame.assignType = 1;
	parame.type = $('#type').text();

	$.ajax({
		url:'taskController/assignTaskPeople.do',
		data:parame,
		dataType:'json',
		success:function(data){
			if(data === "1"){
				swal({
					title: "分配成功",
					type: 'success'
				});
				$('#assignPeopleModal').modal('hide');
				$('#taskTable').bootstrapTable('refresh');
			}
	  	}
	});
};

// 返回按钮
$('#return').click(function(){
	window.location.href = window.location.href.split("?")[0].replace('taskAssign.jsp','taskAssignManage.jsp');
});

//下载文件按钮
function download(ID){
	swal('the file ID is : ' + ID);
		
	$.ajax({
		url:'fileOperateController/filedownload.do',
		data:ID,
		dataType:'json',
		success:function(data){
			
	  	}
	});
};
