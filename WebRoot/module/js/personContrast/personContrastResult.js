 var rowID = "";
$(function () {
	
	//加载时间控件
	$(".form_datetime").datetimepicker({
        minView: 'month',            //设置时间选择为年月日 去掉时分秒选择
        format:'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        language: 'zh-CN'              //设置时间控件为中文
    }); 	
	
   //加载表格
   $('#table').bootstrapTable({
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		singleSelect : true,
		pageSize: 3,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1,5,10,15,20],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'personconTrastController/getAuditPersonconTrastWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		selectItemName:'',//radio or checkbox 的字段名
		queryParams : queryParams, // 参数
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		onClickRow:onClickRow,
		showRefresh : false, // 显示刷新按钮
		columns:[{
			checkbox:true,
			width:'5'//宽度
		},{
			title : '序号',
			field: 'Number',
			width:'5',
			formatter: function (value, row, index) {
			return index+1;
			}
		},{
			field:'projectCode',//返回值名称
			title:'比对项目编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5',//宽度
		},{
			field:'projectName',//返回值名称
			title:'比对项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'testDevice',//返回值名称
			title:'测试装置',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'departmentName',//返回值名称
			title:'比对人员科室',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'Name1',//返回值名称
			title:'比对标准人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'Name2',//返回值名称
			title:'待比对人员',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'diffierence',//返回值名称
			title:'比对差异',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'result',//返回值名称
			title:'比对人员结果',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'startTime',//返回值名称
			title:'执行时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'state',//返回值名称
			title:'状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5',//宽度
			formatter: function (value, row, index) {
				if(value=="0")
					value="未完成";
					else{
						value="完成";
					}
				return value;
			}
		},{
			field:'auditState',//返回值名称
			title:'审核状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5',//宽度
			formatter:function(value, row, index){
				if(value=="0")
					value="未审核";
				else if(value=="1")
					value="通过";
				else
					value="不通过";
				
				return value;
			}
		},{
			field:'reason',//返回值名称
			title:'原因',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5'//宽度
		},{
			field:'ID',
			title:'',
			align:'center',
			valign:'middle',
			width:'5',
		    visible:false,
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
   initTableFile();
   
});

//选中行展示文件
function onClickRow(row){
	rowID = row.ID;
	refreshfile();
}


//展示弹窗
var selectobject={};

function showpage(){
	
	 selectobject = $('#table').bootstrapTable('getSelections');
	 
	 if(selectobject==null||selectobject==""){
			swal({ title: "请选择一条数据!", type: "warning"});
		}
	 if(selectobject.length == 1){
		 
		 $('#showPage').modal('show');	
	 }else
		 {
		 swal({ title: "请选择一条数据!", type: "warning"});		 }
	 
}


//获取结果值
function changeValue(){
	
	if( $('#diffierence').val()<=0.7){
		$('#result').val("合格");
	}
	if($('#diffierence').val()<=1&&$('#diffierence').val()>0.7){
		$('#result').val("可疑，追查原因");
	}
	if($('#diffierence').val()>1){
		$('#result').val("不合格");
	}
}

//配置参数
function queryParams(params) { 

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

			projectCode : $('#projectCode').val(),
			projectName : $('#projectName').val(),
			employeeID1 : $('#employeeID1').val(),
			testDevice : $('#testDevice').val(),
			startTime : $('#startTime').val(),
			endTime :$('#endTime').val(),
			employeeID2 : $('#employeeID2').val(),
			state:"",
			departmentName:"",
			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			sort : params.sort, // 排序列名
			order : params.order
		// 排位命令（desc，asc）
		};
		return temp;
}

//提交结果
function check(){
	selectobject = $('#table').bootstrapTable('getSelections');
	if(selectobject.length == 1){
		
		$('#belongID').val(selectobject[0].ID);
		var date = new Date();  
		var object={};
		object.ID = selectobject[0].ID;
		object.projectCode = selectobject[0].projectCode;
		object.projectName =  selectobject[0].projectName;
		object.testDevice = selectobject[0].testDevice;
		object.departmentID = selectobject[0].departmentID;
		object.employeeID1 = selectobject[0].employeeID1;
		object.employeeID2 = selectobject[0].employeeID2;
		object.startTime = selectobject[0].startTime;
		object.state = selectobject[0].state;
		object.reason = selectobject[0].reason;
		object.auditState = selectobject[0].auditState;
		object.result = $('#result').val();
		object.diffierence = $('#diffierence').val();
		console.log(object);
		$.ajax({
			  data:object,
			  url:'personconTrastController/resultPersonconTrastByID.do',		 
			  success:function(e){
					swal({ title: "结果填写成功", type: "success"});
				  refresh();
				  },
			  error:function(){
					swal({ title: "失败", type: "error"});
				  }
		
			});
		$('#showPage').modal('hide');
	}else
		{
		swal({ title: "请选择一条数据!", type: "warning"});
		}
	
}

//获得文件
function getfiled(str){
	var result ="";
	switch(str){
	case "projectCode":result="projectName";break;
	case "projectName":result="projectPoint";break;
	case "departmentName":result="endTime";break;
	case "employeeName2":result="remark";break;
	}
	return result;
}

//展示文件上传
function uploadfile(){
	var getdata = $('#table').bootstrapTable('getSelections');
	if(getdata.length==1){
		$('#showfilepage').modal('show');	
		$('#belongID').val(getdata[0].ID);
	}else
		swal({ title: "请选择一条数据!", type: "warning"});}

//下载文件
function download(){
		var getdata = $('#table').bootstrapTable('getSelections');
		if(getdata.length == 1){
			var fileID;
			fileID=getdata[0].fileID;
			window.location.href="timeCheckController/filedownload.do?ID="+fileID;
		}
		if(getdata==null||getdata==""){
			swal({ title: "请选择一条数据!", type: "warning"});		}else
			{
				swal({ title: "请选择一条数据!", type: "warning"});
				}	
}

//刷新表格
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

//刷新文件表格
function refreshfile(){
	$('#tablefile').bootstrapTable('refresh', null);
}

function initTableFile(){
	$('#tablefile').bootstrapTable({
		height: '320',//定义表格的高度
		pagination: true,//在表格底部显示分页条
		classes:'table table-condensed',
		clickToSelect:true,
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [3,5,10,15,20],//设置可供选择的页面数据条数
		cache: false,//禁用 AJAX 数据缓存
		sortName:'fileName',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'timeCheckController/getTimecheckFileWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams : Params, // 参数
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		showRefresh : false, // 显示刷新按钮
	    columns:[{
	    	checkbox:true,
	    	align:'center',
	    	valign:'middle',			
	    },{
	    	field:'ID',
	    	visible:false,
		    },{
	    	field:'fileName',
	    	title:'文件名',
	    	align:'center',
	    	valign:'middle',
	    },{
	    	field:'uploadTime',
	    	title:'上传时间',
	    	align:'center',
	    	valign:'middle',
	    },{
	    	field:'remarks',
	    	title:'备注',
	    	align:'center',
	    	valign:'middle',
	    }]
	});
	
}
function Params(pageRequest){
	
	pageRequest.pageNo = this.offset;
	pageRequest.pageSize = this.pageNumber;
	pageRequest.length = 6;
	pageRequest.belongtoID = rowID;
	return pageRequest;
}			

//刷新全部
function refreshAll(){
	$('#projectCode').val("");
	$('#projectCode').val(""),
	$('#projectName').val(""),
	$('#employeeID1').val(""),
	$('#testDevice').val(""),
	$('#startTime').val(""),
	$('#endTime').val(""),
	$('#employeeID2').val(""),
	$('#table').bootstrapTable('refresh', null);
	$(".disappear").css("display","none");
}

