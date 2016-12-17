$(function() {
	initData();
	initAuditPerson();
	bindProjectChange();
});

//初始化页面数据
function initData(){
	$("#table").bootstrapTable({
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
   //	pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
   //	sortName : 'ID',// 定义排序列
   //	sortOrder : 'DESC',// 定义排序方式
		url : 'taskController/getTaskWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams: queryParams, //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			width :"1%"// 宽度
		},{
			field : 'ID',// 返回值名称
			title : '任务ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			visible : false
		},{
			field : 'receiptlistCode',// 返回值名称
			title : '交接单号',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			
		},{
			field : 'sampleName',// 返回值名称
			title : '样品名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
	    },{
			field : 'testProjectName',// 返回值名称
			title : '检测项目',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'detector',// 返回值名称
			title : '检测人',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			field : 'custodian',// 返回值名称
			title : '监督人',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :"10%"// 宽度
		},{
			field : 'levelTwo',// 返回值名称
			title : '审核人',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			field : 'detectstate',// 返回值名称
			title : '状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'startTime',// 返回值名称
			title : '开始时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			field : 'endTime',// 返回值名称
			title : '结束时间',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%"// 宽度
		},{
			title : '操作',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			formatter : function(value, row, index) {
				return "<span  onclick='taskView(\""+row.ID+"\")'  title='查看任务' class='glyphicon glyphicon-edit' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></span> "
				+"<span  onclick='taskAssign(\""+row.ID+"\",\""+row.sampleName+"\")'  title='指定审核人' class='glyphicon glyphicon-plus' style='cursor:pointer;color: rgb(10, 78, 143);padding-right:8px;'></span> "
				}
		}]
	});
}

//初始化审核人的数据
function initAuditPerson(){
	$('#taskAuditPersonTable').bootstrapTable({
		height : 450,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
     	pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
    	sortName : 'ID',// 定义排序列
    	sortOrder : 'DESC',// 定义排序方式
		url : 'taskController/getTaskAuditPersonWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [{
			checkbox : true,
			width :"1%"// 宽度
		},{
			field : 'ID',// 返回值名称
			title : '员工ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			visible : false
		},{
			field : 'employeeCode',// 返回值名称
			title : '员工编号',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'employeeName',// 返回值名称
			title : '员工姓名',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'sex',// 返回值名称
			title : '性别',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'roleName',// 返回值名称
			title : '角色',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'employeeLevel',// 返回值名称
			title : '能力等级',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		},{
			field : 'employeeState',// 返回值名称
			title : '状态',// 列名
			align : 'center',// 水平居中显示
		    valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		}
		]
	});
}

// 
function bindProjectChange() {
	var htmlElement = "";
	$('#testItem').on('input propertychange', function() {
		var testItem = $.trim($('#testItem').val());
		if (testItem != null && testItem != undefined && testItem != '') {
			$.post('testProjectController/getTestProject.do', {
				testProjectNamae : $.trim($('#testItem').val())
			}, function(result) {
				if (result != null && result != '') {
					result = JSON.parse(result);
					htmlElement = "";
					for ( var i = 0; i < result.length; i++) {
						htmlElement +="<li>"+
						result[i].testProjectName+
						"</li>"
					}
					$('#dropDownList').text('');
					$('#dropDownList').append(htmlElement);
					$('#dropDownList li').on('click',function(){
						$('#testItem').val(($(this).text()));
						$('#dropDownList').css('display', 'none');
					})
				}
			});
			$('#dropDownList').css('display', 'block');
		}
		else{
			$('#dropDownList').css('display', 'none');
		}
	});
}

//查询
function search(){
	initData();
	refresh();
}

//请求数据时的额外参数
function queryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'ID',
		order : 'asc',
		receiptlistCode : $.trim($('#schFactoryCode').val()),
		testProjectName : $.trim($('#testItem').val()),
		sampleName : $.trim($('#sampleName').val()),
		beginTime : $.trim($('#beginTime').val()),
		endTime : $.trim($('#endTime').val()),
		testProcess : $.trim($('#testProcess').val()),
	};
    return searchCondition;
}

//查看任务
function taskView() {
	var taskID = arguments[0];
	if (taskID != null && taskID != undefined && taskID != '') {
		window.location.href = "module/jsp/taskManage/taskView.jsp?taskID=" + taskID;
	}
}

//展示审核人弹窗
function taskAssign() {
	var taskID = arguments[0];
	var sampleCodeName = arguments[1];
	$('#taskID').text(taskID);
	$('#sampleCodeName').text('样品名称: ' + sampleCodeName);
	$('#taskAuditPerson').modal('show');
}

//指定审核人
function setAuditPerson(){
	var rows = $('#taskAuditPersonTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		alert("请选择相应的审核人");
		return;
	}
	if (rows.length > 1) {
		alert('请选择一条数据');
		return;
	} else {
		$.post('taskController/updateTaskAuditPerson.do',{
			taskID : $('#taskID').text(),
			employeeID : rows[0].ID
		},function(result){
			if(result == true || result == 'true'){
				alert('设置审核人成功');
			}else{
				alert('设置失败');
			}
		});
		$('#taskAuditPerson').modal('hide');
		refresh();
	}
}
//刷新页面
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}






