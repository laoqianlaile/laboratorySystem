var mydata=new Array();
var mydataID=new Array();

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
		pageSize: 3,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [1,3, 5, 9, 10, 20, 30],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'personconTrastController/getAuditPersonconTrastWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams : queryParams, // 参数
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		showRefresh : false, // 显示刷新按钮
		selectItemName:'',//radio or checkbox 的字段名
/*		onDblClickCell:onDblClickCell,//当用户双击某一列的时候触发
*/		columns:[{
			checkbox:true,
			width:'5'//宽度
				},{
					title : '序号',
					field: 'Number',
					width:'5',//宽度
					formatter: function (value, row, index) {
					return index+1;}
				},{
					field:'projectCode',//返回值名称
					title:'比对项目编号',//列名
					align:'center',//水平居中显示
					valign:'middle',//垂直居中显示
					width:'5',//宽度
					//visible:false
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
					field:'startTime',//返回值名称
					title:'执行时间',//列名
					align:'center',//水平居中显示
					valign:'middle',//垂直居中显示
					width:'5'//宽度
				},{
					field:'auditState',//返回值名称
					title:'审核',//列名
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
					width:'100',
				    visible:false,
				},{
					field:'departmentID',
					title:'',
					align:'center',
					valign:'middle',
					width:'100',
				    visible:false,
				}]//列配置项,详情请查看 列参数 表格
				/*事件*/
	});
   $.ajax({
		url:'personconTrastController/getdepartmentlist.do',
		data:{type:1},
		success:function(e){
			var myobj = eval(e);
			var dom1 = $('#list2');
			$('#pass1').html("");
			var str2 = "<li role='presentation' onclick='changevalue(1,\"\")'>&nbsp;&nbsp;</li>";
			dom1.append(str2);
			for(var i = 0;i< myobj.length;i++){
				var str = "<li role='presentation' onclick='changevalue(1,\""+myobj[i].departmentName+"\")'>"+myobj[i].departmentName+"</li>";
				dom1.append(str);
			};
			
		}
	});
});

//在下拉框上展示选中的值
function changevalue(type,value){
		if(type==1){
			$('#departmentID').html(value);
		}
}

//配置参数
function queryParams(params) { 
	
	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			qualityPlanID :$('#codevalue').val(),
			projectCode : $('#projectCode').val(),
			projectName : "",
			employeeID1 : "",
			testDevice : "",
			startTime : $('#startTime').val(),
			endTime :$('#endTime').val(),
			employeeID2 :"",
			auditState :passNum,
			departmentID :$('#departmentID').html(),
			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			sort : params.sort, // 排序列名
			order : params.order
	};
	console.log(temp);
	return temp;
}

var passNum = ""; //数字代替通过和不通过
//下拉框选中的值转换
function changgedata(i){
	if(i==0){
		$('#pass1').html("未审核");//通过
		passNum = "0";
	}
	else if(i==1){
		$('#pass1').html("通过");//通过
		passNum = "1";
	}
	else if(i==2){
		$('#pass1').html("不通过");//不通过
		passNum = "2";
	}
	else{
		$('#pass1').html("");
		passNum = "";
	}
		
}

//提交通过
function pass(){
	var selectobject = $('#table').bootstrapTable('getSelections');
	
	if(selectobject.length==1){
		
		var object={};
		object.ID = selectobject[0].ID;
		object.projectCode = selectobject[0].projectCode;
		object.projectName = selectobject[0].projectName;
		object.testDevice = selectobject[0].testDevice;
		object.departmentID = selectobject[0].departmentID;
		object.employeeID1 = selectobject[0].employeeID1;
		object.employeeID2 = selectobject[0].employeeID2;
		object.startTime = selectobject[0].startTime;
		object.state = "1";
		object.auditState = "1";
		object.reason = "无";
		console.info(object);
		$.ajax({
			data:object,
			url:'personconTrastController/auditPersonconTrastByID.do',
			success:function(msg){
				refresh();
				alert("审核成功");
			}
		});
	}else{
		showdiag("请只选择一条数据！");
	}
}

//展示弹窗
var selectobject2="";
function showModal(){
	 selectobject2 = $('#table').bootstrapTable('getSelections');
	 if(selectobject2.length == 1){
		 
		 $('#showModal').modal('show');
	 }else{
		 showdiag("只能选择一条数据！");
	 }
	
}

//展示提示框
function showdiag(data){
	$('#dequ').remove();
	document.getElementById("showdiv1").style.display = "none";
	var sentence = "<span id='dequ'>" + data + "</span>" ; 
	$('#showdiv1').append(sentence);
	var width=(document.body.clientWidth-300)/2;                    // 这里可以修改弹框显示的宽度
	//var height = (document.body.clientHeight-360-100)/2;          这里可以修改弹框显示的高度
	//document.getElementById("showdiv1").style.marginTop = height;  这里可以修改弹框显示的高度
	document.getElementById("showdiv1").style.marginLeft = width;    //这里可以修改弹框显示的宽度
	document.getElementById("showdiv1").style.display = "block";
	setTimeout("document.getElementById('showdiv1').style.display = 'none'",800);
}

//提交不通过原因
function unpass(){
	/*alert("222");*/
	
	var reason = $('#reason').val();
/*	alert(reason);*/
	var object={};
	object.ID = selectobject2[0].ID;
	object.projectCode = selectobject2[0].projectCode;
	object.projectName =  selectobject2[0].projectName;
	object.testDevice = selectobject2[0].testDevice;
	object.departmentID = selectobject2[0].departmentID;
	object.employeeID1 = selectobject2[0].employeeID1;
	object.employeeID2 = selectobject2[0].employeeID2;
	object.startTime = selectobject2[0].startTime;
	object.state =  "1";
	object.reason = reason;
	object.auditState = "2";
/*	console.info(object);*/
	$.ajax({
		data:object,
		url:'personconTrastController/auditPersonconTrastByID.do',
		success:function(msg){	
			$('#showModal').modal('hide');
			refresh();
			alert("审核成功");
		}
	});
}

//取消按钮
function disapper(){
	$('#showModal').modal('hide');
}

//刷新表格
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

function refreshAll(){
	$('#codevalue').val(""),
	$('#projectCode').val(""),
	$('#startTime').val(""),
	passNum="",
	$('#departmentID').html(""),
	$('#startTime').val(""),
	$('#endTime').val(""),
	
	$('#table').bootstrapTable('refresh', null);
	$(".disappear").css("display","none");
}