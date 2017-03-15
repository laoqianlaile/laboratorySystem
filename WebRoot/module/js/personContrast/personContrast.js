var object= {},
	pubtype = "",
	datacount = -1,
	sbtjude = 0,
	visture = "",
	clicked = 0,
	clicked1 = 0,
	clicked2 = 0,
	updatevalue = "",
	updatevalue1 = "",
	updatevalue2 = "",
	judg= 0,
	judg2 = 0;
var mydata=new Array();
var mydataID=new Array();

$(function(){
	init();
});

//初始化页面加载表格
function init(){
		
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
	
	$('#table').bootstrapTable({
			striped: true,// 隔行变色效果
			pagination: true,//在表格底部显示分页条
			pageSize: 3,//页面数据条数
			pageNumber:1,//首页页码
			singleSelect : true,
			pageList: [1, 5, 10, 15, 20],//设置可供选择的页面数据条数
			clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
			cache: false,//禁用 AJAX 数据缓存
			sortName:'personconTrast.ID',//定义排序列
			sortOrder:'asc',//定义排序方式
			url:'personconTrastController/getPersonconTrastWithPaging.do',//服务器数据的加载地址
			sidePagination:'server',//设置在哪里进行分页
			contentType:'application/json',//发送到服务器的数据编码类型
			dataType:'json',//服务器返回的数据类型
//			queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
			selectItemName:'',//radio or checkbox 的字段名
			queryParams : queryParams,
			queryParamsType : "limit",
			showRefresh : false,
			onClickRow:onClickRow,
			onDblClickCell:onDblClickCell,//当用户双击某一列的时候触发
			columns:[{
				checkbox:true,
				width:'5'//宽度
			},{
				title : '序号',
				field: 'Number',
				width:'5',//宽度
				formatter: function (value, row, index) {
				return index+1;
				}
			},{
				field:'projectCode',//返回值名称
				title:'比对项目编号',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
				width:'5',//宽度
//				visible:false
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
				field:'state',//返回值名称
				title:'状态',//列名
				align:'center',//水平居中显示
				valign:'middle',//垂直居中显示
				width:'5',//宽度
				formatter: function (value, row, index) {
					if(value=="1")
						value="完成";
					else{
						value="未完成";
					}
					return value;
				}
			},{
			    field:'ID',
			    title:'',
			    align:'center',
			    valign:'middle',
			    width:'100',
			    visible:false,
			},{
			    field:'employeeID1',
			    title:'',
			    align:'center',
			    valign:'middle',
			    width:'100',
			    visible:false,
			},{
			    field:'employeeID2',
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
	initTableFile();
}


//查询
function query() {
	init();
	refresh();
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


//全局变量
var clicked = '0';
var mydata=new Array();
var mydataID=new Array();

//双击事件

                   /*参数包括:field：点击列的 field 的名称，
							value：点击列的 value 值，
							row：点击列的整行数据，
							$element：td 元素。*/
function onDblClickCell(field,value,row,$element){
	
	object==null;
	if(row==object){
	}else{
		updatevalue = "";
		updatevalue1 = "";
		updatevalue2 = "";
		clicked = 0;
		clicked1 = 0;
		clicked2 = 0;
	}
	object = row ;
	var getvalue ="";
	var getvalue2 ="";
	if(field=="projectCode"||field=="projectName"||field=="testDevice"||field=="departmentName"||field=="Name1"||field=="Name2"||field=="startTime"){
		pubtype = field;
		switch(field){
		case "projectCode":
			getvalue = row.projectCode;
			$element[0].innerHTML="<form><input name='projectCode2' onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'></form>";
			
			break;
		case "projectName":
			getvalue = row.projectName;
			
			$element[0].innerHTML="<form><input name='projectName2' onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'></form>";
			
			break;
		case "testDevice":
			getvalue = row.testDevice;
			
			$element[0].innerHTML="<form><input name='testDevice2' onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'></form>";
			
			break;
		case "departmentName":
			if(clicked==0){
				getvalue2 = row.departmentName;
				clicked=1;
				
			}
				
			if(clicked==1){
				getvalue2 = updatevalue;
			};
			$element[0].innerHTML="<form><div class=''>"
				+"<button class='btn btn-default dropdown-toggle' type='button' id='dropdowmlist' data-toggle='dropdown'>"
				+getvalue2+"<span class='caret'></span></button>"
				+"<ul id='listdata' class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'>"
				+"</ul></div></form>";
				$.ajax({
					url:'personconTrastController/getdepartmentlist.do',
					success:function(data){
						var myobj = eval(data);
						var listdata = $('#listdata');
						for(var i = 0;i< myobj.length;i++){
							mydata[i] = myobj[i].departmentName;
							mydataID[i]= myobj[i].ID;
							var rstring = "<li class='choose' role='presentation' onclick='getParentbutton(this,"+"mydata["+i+"]"+","+"mydataID["+i+"]" + ")'>"+mydata[i]+"</li>";
							listdata.append(rstring);
						}
					}
				});
			
			break;
		case "Name1":
			if(clicked1==0){
				getvalue = row.Name1;
				clicked1=1;
			}
				
			if(clicked1==1){
				
				getvalue = updatevalue1;
			};
			$element[0].innerHTML="<div class=''>"
				+"<button class='btn btn-default dropdown-toggle' type='button' id='dropdowmlist' data-toggle='dropdown'>"
				+getvalue+"<span class='caret'></span></button>"
				+"<ul id='listdata' class='dropdown-menu ' role='menu' aria-labelledby='dropdownMenu1'>"
				+"</ul></div>";
			//还要加判断是否点击
			var departmentid = object.departmentName;	
				$.ajax({
					data:{departmentID:departmentid},
					url:'personconTrastController/getbydepartment.do',
					success:function(mag){
						var myobj = eval(mag);
						var listdata = $('#listdata');
						for(var i = 0;i< myobj.length;i++){
							mydata[i] = myobj[i].employeeName;
							mydataID[i]= myobj[i].ID;
							var rstring = "<li role='presentation' onclick='getParentbutton1(this,"+"mydata["+i+"]"+","+"mydataID["+i+"]" + ")'>"+mydata[i]+"</li>";
							listdata.append(rstring);
						}
					}
				});
			break;
		case "Name2":
			if(clicked2==0){
				getvalue = row.Name2;
				clicked2=1;
			}
				
			if(clicked2==1){
				getvalue = updatevalue2;
			};
			$element[0].innerHTML="<div class=''>"
				+"<button class='btn btn-default dropdown-toggle' type='button' id='dropdowmlist' data-toggle='dropdown'>"
				+getvalue+"<span class='caret'></span></button>"
				+"<ul id='listdata' class='dropdown-menu ' role='menu' aria-labelledby='dropdownMenu1'>"
				+"</ul></div>";
			var departmentid = object.departmentName;	
			$.ajax({
				data:{departmentID:departmentid},
				url:'personconTrastController/getbydepartment.do',
				success:function(mag){
					var myobj = eval(mag);
					var listdata = $('#listdata');
					for(var i = 0;i< myobj.length;i++){
						mydata[i] = myobj[i].employeeName;
						mydataID[i]= myobj[i].ID;
						var rstring = "<li role='presentation' onclick='getParentbutton2(this,"+"mydata["+i+"]"+","+"mydataID["+i+"]" + ")'>"+mydata[i]+"</li>";
						listdata.append(rstring);
					}
				}
			});
			
			
			break;
		case "startTime":
				getvalue = row.startTime;
				
			$element[0].innerHTML="<form><div class=''>"
				+"<input name='startTime123' id='startTime123' class='form_datetime form-control' type='text'></div></form>";
			
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
		    }).on('changeDate', function(ev){
		    	
					object.startTime =$('#startTime123').val();
					$element[0].innerHTML=$("#startTime123").val();
					sbtjude = 1;
			});
			break;
		}	
	}
	else{
		alert("此项不能修改");
	};
}
//获取点击后的值
function getParentbutton(dom,value,ID){
	/*alert(value);*/
	var parentdom = dom.parentNode;
/*	alert(parentdom);*/
	for(var i = 0;;i++){
		if(parentdom.nodeName == "TD"){
			parentdom.innerHTML=value;	
			updatevalue = value ; 
			object.departmentName = ID;
			sbtjude = 1;
			viscount = 1;
			judg = 1;
			break;
		}else{
			parentdom = parentdom.parentNode;
		}
	}
}
//获取点击后的值
function getParentbutton1(dom,value,ID){
	var parentdom = dom.parentNode;
	for(var i = 0;;i++){
		if(parentdom.nodeName == "TD"){
			parentdom.innerHTML=value;
			updatevalue1 = value ; 
			object.Name1 = ID;
			sbtjude = 1;
			viscount = 1;
			judg = 1;
			break;
		}else{
			parentdom = parentdom.parentNode;
		}
	}
}
//获取点击后的值
function getParentbutton2(dom,value,ID){
	var parentdom = dom.parentNode;
	for(var i = 0;;i++){
		if(parentdom.nodeName == "TD"){
			parentdom.innerHTML=value;
			updatevalue2 = value ; 
			object.Name2 = ID;
			sbtjude = 1;
			viscount = 1;
			judg = 1;
			break;
		}else{
			parentdom = parentdom.parentNode;
		}
	}
}
//获取当行的每格的value
function getobject(dom,value,type){
	dom.parentNode.innerHTML=value;
	switch(type){
	case "projectCode":if(object.projectCode == value){
		sbtjude = sbtjude;
		}else{
			object.projectCode =value;
			sbtjude = 1;
		};
		break;
	case "projectName":if(object.projectName == value){
		sbtjude = sbtjude;
		}else{
			object.projectName =value;
			sbtjude = 1;
		};
		break;
	case "testDevice":if(object.testDevice == value){
		sbtjude = sbtjude;
		}else{
			object.testDevice =value;
			sbtjude = 1;
		};
		break;
	case "startTime":if(object.startTime == value){
		sbtjude = sbtjude;
		}else{
			object.startTime =value;
			sbtjude = 1;
		};
		break;
	case "departmentName":if(object.departmentName == value){
		sbtjude = sbtjude;
	}else{
		object.departmentName =value;
		sbtjude = 1;
	};
	break;
	}
}

//表单验证
function Validator(){
	$('form').bootstrapValidator({
		　　　message: 'This value is not valid',
		        　feedbackIcons: {
		            　　　　　　　　valid: 'glyphicon glyphicon-ok',
		            　　　　　　　　invalid: 'glyphicon glyphicon-remove',
		            　　　　　　　　validating: 'glyphicon glyphicon-refresh'
		        　　　　　　　　   },
		        fields: {
		        	projectCode2: {
		                message: '比对项目编号',
		                validators: {
		                    notEmpty: {
		                        message: '比对项目编号不能为空'
		                    }
		                }
		            },
		            projectName2: {
		                validators: {
		                    notEmpty: {
		                        message: '比对项目不能为空'
		                    }
		                }
		            },
		            testDevice2: {
		                validators: {
		                    notEmpty: {
		                        message: '测试装置不能为空'
		                    }
		                }
		            },
		            startTime123: {
		                validators: {
		                    notEmpty: {
		                        message: '执行时间不能为空'
		                    }
		                }
		            }
		        }
		    });
}



//修改保存
function updataPersonContrast(dom){
	
	$(".disappear").css("display","none");
	var getdata = $('#table').bootstrapTable('getSelections');

	var personcontrast={};
	if(getdata.length==1){
		personcontrast.ID = getdata[0].ID;
		personcontrast.projectCode = getdata[0].projectCode;
		personcontrast.projectName = getdata[0].projectName;
		personcontrast.testDevice = getdata[0].testDevice;
		personcontrast.departmentID = getdata[0].departmentID;
		personcontrast.employeeID1 = getdata[0].employeeID1;
		personcontrast.employeeID2 = getdata[0].employeeID2;
		personcontrast.startTime = getdata[0].startTime;
		if(sbtjude == 1){
			$.ajax({				  
				  url:'personconTrastController/updatePersonconTrastByID.do',
				  data:personcontrast,
				  success:function(o){  
					  alert("成功");
					  sbtjude=0;
					  refresh();
					  }
			});
		}else{
			alert("更新出错，请重试或联系维护人员");
		}		
	}else{
		alert("请选择或者选择一条");
	}
	
}

//删除
function deletelist(dom){
	
	$(".disappear").css("display","none");
	var getdata = $('#table').bootstrapTable('getSelections');
	var allid = "";
	if(getdata.length<=0){
		alert("请选择");
	}else{
		
		for (var i = 0 ; i < getdata.length ; i++){
			allid += getdata[i].ID+","; 
		}
		var deleteid={};
		deleteid.id = allid;
		alert("确认删除？")
		$.ajax({
			  url:'personconTrastController/deletePersonconTrastByID.do',
			  data:deleteid,
			  success:function(e){
				  refresh();
			  }
			});
	}
}

//增加一行
function addrow(){
	$(".disappear").css("display","block");
	if(datacount<0)
		datacount = $('#table').bootstrapTable('getData').length;
	$('#table').bootstrapTable('insertRow',{index:1000,row:{
		number:++datacount,
		projectCode:'',
		projectName:'',
		testDevice:'',
		departmentName:'',
		Name1:'',
		Name2:'',
		startTime:'',
		auditState:"未完成",
		operation:'<button type=\'button\' class=\'btn btn-info\' onclick=\'addpersonconTrast(this)\'>提交</button>',
	}});
}

//增加人员比对计划
function addpersonconTrast(){
	var getdata = $('#table').bootstrapTable('getSelections');
	
	if(getdata.length<=0||getdata.length > 1){
		alert("请选择一条数据");
	}else{
		
		for(var i = 0;i < 1;i++){
			if(getdata[0].projectCode==null||getdata[0].projectCode==""){
				alert("请填写比对项目编号");
				break;
			}	
			if(getdata[0].projectName==null||getdata[0].projectName==""){
				alert("请填写比对项目名称");
			    break;
			}	
			if(getdata[0].testDevice==null||getdata[0].testDevice==""){
				alert("请填写测试装置");
			    break;
			}	
			if(getdata[0].departmentName==null||getdata[0].departmentName==""){
				alert("请选择比对人员科室");
				break;
			}
			if(getdata[0].Name1==null||getdata[0].Name1==""){
				alert("请选择比对标准人员");
			    break;
			}	
			if(getdata[0].Name2==null||getdata[0].Name2==""){
				alert("请选择待比对人员");
				break;
			}
			if(getdata[0].startTime==null||getdata[0].startTime==""){
				alert("请选择执行时间");
				break;
			}	
			if(getdata[0].Name2==getdata[0].Name1){
				alert("待比对人员不能和比对人员相同");
				break;
			}
			var personcontrast={};
			personcontrast.projectCode = getdata[0].projectCode;
			personcontrast.projectName =  getdata[0].projectName;
			personcontrast.testDevice = getdata[0].testDevice;
			personcontrast.departmentID = getdata[0].departmentName;		
			personcontrast.employeeID1 = getdata[0].Name1;	
			personcontrast.employeeID2 = getdata[0].Name2;	
			personcontrast.startTime = getdata[0].startTime;

			$.ajax({
				url:'personconTrastController/savePersonconTrast.do',
				data:personcontrast,
				success:function(e){
					refresh();
					$(".disappear").css("display","none");
					alert("新增成功!")
					},
				});
			}
		}
		
			
	}

//刷新表格
function refresh(){
	$('#table').bootstrapTable('refresh', null);
	$(".disappear").css("display","none");
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

//展示文件上传
function uploadfile(){
	var getdata = $('#table').bootstrapTable('getSelections');
	if(getdata.length==1){
		$('#showfilepage').modal('show');	
		$('#belongID').val(getdata[0].ID);
	}else
		showdiag("请选择一条数据");
}

//选中行展示文件
function onClickRow(row){
	rowID = row.ID;
	refreshfile();
}
//刷新文件表格
function refreshfile(){
	$('#tablefile').bootstrapTable('refresh', null);
}

var rowID = "";


function Params(pageRequest){
	
	pageRequest.pageNo = this.offset;
	pageRequest.pageSize = this.pageNumber;
	pageRequest.length = 6;
	pageRequest.planID = rowID;
	return pageRequest;
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
		//queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
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
