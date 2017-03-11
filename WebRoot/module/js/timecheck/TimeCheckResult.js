function showdiag(data){
	$('#dequ').remove();
	document.getElementById("showdiv1").style.display = "none";
	var sentence = "<span id='dequ'>" + data + "</span>" ; 
	$('#showdiv1').append(sentence);
	var width=(document.body.clientWidth-300)/2;
	//var height = (document.body.clientHeight-360-100)/2;
	//document.getElementById("showdiv1").style.marginTop = height;
	document.getElementById("showdiv1").style.marginLeft = width;
	document.getElementById("showdiv1").style.display = "block";
	setTimeout("document.getElementById('showdiv1').style.display = 'none'",800);
}

$(function(){
	$('#table').bootstrapTable({
		pagination: true,//在表格底部显示分页条
		classes:'table table-condensed',
		pageSize: 10,//页面数据条数
		clickToSelect:true,
		singleSelect : true,
		pageNumber:1,//首页页码
		pageList: [1,2,3, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		cache: false,//禁用 AJAX 数据缓存
		sortName:'timeCheck.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'timeCheckController/getTimeCheckWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:queryParams2,
		onClickRow:onClickRow,
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
	    columns:[{
	    	checkbox:true,
	    	align:'center',
	    	valign:'middle',
	    	width:'50',
	    },{
	    	field:'ID',
	    	visible:false,
	    },{
	    	field:'number',
	    	title:'序号',
	    	align:'center',
	    	valign:'middle',
	    	width:'20',
	    },{
	        field:'projectCode',
	        title:'计划项目编号',
	        align:'center',
	        valign:'middle',
	        width:'150',
	    },{
	        field:'projectName',
	        title:'质量监控/期间核查项目名称',
	        align:'center',
	        valign:'middle',
	        width:'200',
	    },{
	        field:'projectPoint',
	        title:'比对核查点',
	        align:'center',
	        valign:'middle',
	        width:'50',
	    },{
	        field:'departmentName',
	        title:'负责部门',
	        align:'center',
	        valign:'middle',
	        width:'110',
	    },{
	        field:'endTime',
	        title:'计划完成时间',
	        align:'center',
	        valign:'middle',
	        width:'160',
	    },{
	        field:'employeeName',
	        title:'审核人',
	        align:'center',
	        valign:'middle',
	        width:'100',
	    },{
	        field:'auditState',
	        title:'审核状态',
	        align:'center',
	        valign:'middle',
	        width:'110',
	    },{
	        field:'result',
	        title:'期间核查结果',
	        align:'center',
	        valign:'middle',
	        width:'150',
	    },{
	        field:'remark',
	        title:'备注',
	        align:'center',
	        valign:'middle',
	        width:'80',
	    }]
	});
	$.ajax({
		url:'timeCheckController/getDepartment.do',
		data:{type:1},
		success:function(e){
			var myobj = eval(e);
			var dom1 = $('#listul1');
			$('#textspan1').html("");
			var str2 = "<li role='presentation' onclick='changevalue(1,\"\")'>空</li>";
			dom1.append(str2);
			for(var i = 0;i< myobj.length;i++){
				var str = "<li role='presentation' onclick='changevalue(1,\""+myobj[i].departmentName+"\")'>"+myobj[i].departmentName+"</li>";
				dom1.append(str);
			};
			
		}
	});
	/*$.ajax({
		url:'timeCheckController/getDepartOrEmployeeID1.do',
		data:{type:2},
		success:function(e){
			var myobj = eval(e);
			var dom1 = $('#listul2');
			$('#textspan2').html("");
			var str2 = "<li role='presentation' onclick='changevalue(2,\"\")'>空</li>";
			dom1.append(str2);
			for(var i = 0;i< myobj.length;i++){ 	
				var str = "<li role='presentation' onclick='changevalue(2,\""+myobj[i].employeeName+"\")'>"+myobj[i].employeeName+"</li>";
				dom1.append(str);
			}
		}
	});*/
});

function queryParams2(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort : params.sort, // 排序列名
		order : params.order,
		projectcode:$('#projectcode').val(),
		projectpoint:$('#projectpoint').val(),
		starttime:$('#starttime').val(),
		endtime:$('#endtime').val(),
		projectname:$('#projectname').val(),
		department:$('#textspan1').html(),
		chargePer:$('#textspan2').html(),
	// 排位命令（desc，asc）
	};
	return temp;
}

var $elementdom,rowID;
function onClickRow(row,$element,field){
	$elementdom = $element;
	rowID = row.ID;
	setTimeout("setTimeoutgetID($elementdom[0],rowID)","100");
}
$(function(){
	$(function(){
		$('#tablefile').bootstrapTable({
			height: '320',//定义表格的高度
			pagination: true,//在表格底部显示分页条
			classes:'table table-condensed',
			clickToSelect:true,
			pageSize: 10,//页面数据条数
			pageNumber:1,//首页页码
			pageList: [1,2,3, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
			cache: false,//禁用 AJAX 数据缓存
			sortName:'fileName',//定义排序列
			sortOrder:'asc',//定义排序方式
			url:'timeCheckController/getTimecheckFileWithPaging.do',//服务器数据的加载地址
			sidePagination:'server',//设置在哪里进行分页
			contentType:'application/json',//发送到服务器的数据编码类型
			dataType:'json',//服务器返回的数据类型
//			queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
			queryParams : queryParams, // 参数
			queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
			showRefresh : false, // 显示刷新按钮
		    columns:[{
		    	checkbox:true,
		    	align:'center',
		    	valign:'middle',
		    	width:'50',
		    },{
		    	field:'ID',
		    	visible:false,
		    },{
		    	field:'fileName',
		    	title:'文件名',
		    	align:'center',
		    	valign:'middle',
		    	width:'400',
		    },{
		    	field:'uploadTime',
		    	title:'上传时间',
		    	align:'center',
		    	valign:'middle',
		    	width:'400',
		    },{
		    	field:'remarks',
		    	title:'备注',
		    	align:'center',
		    	valign:'middle',
		    	width:'',
		    }]
		});
		rowID="";
	});
})
function setTimeoutgetID(dom,rowID){
	var getdata = $('#table').bootstrapTable('getSelections');
	if((getdata.length==1)&&(dom.getAttribute("class")=="selected")){
		refreshfile();
	};
}

function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort : params.sort, // 排序列名
		order : params.order,
		planID:rowID,
	// 排位命令（desc，asc）
	};
	return temp;
}

function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort : params.sort, // 排序列名
		order : params.order,
		planID:rowID,
	// 排位命令（desc，asc）
	};
	return temp;
}

function download(){
	var getdata = $('#tablefile').bootstrapTable('getSelections');
	var fileID;
	fileID=getdata[0].ID;
	window.location.href="fileOperateController/filedownload.do?ID="+fileID;
}

function changevalue(type,value){
	if(type==1){
		$('#textspan1').html(value);
	}
	else{
		$('#textspan2').html(value);
	}
}

function refreshfile(){
	$('#tablefile').bootstrapTable('refresh', null);
}


function refresh(){
	$('#table').bootstrapTable('refresh', null);
}


function onupdataaudit(str){
	var mydata={};
	var getdata = $('#table').bootstrapTable('getSelections');
		mydata.id=getdata[0].ID;
		mydata.i=str;
		$.ajax({
			url:'timeCheckController/AuditAndResultUpdata.do',
			data:mydata,
			success:function(e){
				showdiag("成功");
				refresh();
			}
		});
}

function resetAlldata(){
	$('#projectcode').val("");
	$('#projectpoint').val("");
	$('#endtime').val("");
	$('#projectname').val("");
	$('#textspan1').html("");
	$('#textspan2').html("");
	refresh();
}