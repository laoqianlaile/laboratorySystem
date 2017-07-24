
var object={},
	pubtype = "";

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
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		onDblClickCell:onDblClickCell,
	    columns:[{
	    	checkbox:true,
	    	align:'center',
	    	valign:'middle',
	    	width:'5%',
	    },{
	    	field:'ID',
	    	visible:false,
	    },{
	    	field:'number',
	    	title:'序号',
	    	align:'center',
	    	valign:'middle',
	    	width:'5%',
	    },{
	        field:'projectCode',
	        title:'计划项目编号',
	        align:'center',
	        valign:'middle',
	        width:'9%',
	    },{
	        field:'projectName',
	        title:'质量监控/期间核查项目名称',
	        align:'center',
	        valign:'middle',
	        width:'14%',
	    },{
	        field:'projectPoint',
	        title:'比对核查点',
	        align:'center',
	        valign:'middle',
	        width:'7%',
	    },{
	        field:'departmentName',
	        title:'负责部门',
	        align:'center',
	        valign:'middle',
	        width:'7%',
	    },{
	        field:'endTime',
	        title:'计划完成时间',
	        align:'center',
	        valign:'middle',
	        width:'9%',
	    },{
	        field:'employeeName',
	        title:'审核人',
	        align:'center',
	        valign:'middle',
	        width:'7%',
	    },{
	        field:'auditState',
	        title:'审核状态',
	        align:'center',
	        valign:'middle',
	        width:'7%',
	    },{
	        field:'reason',
	        title:'不通过原因',
	        align:'center',
	        valign:'middle',
	        width:'12%',
	    },{
	        field:'remark',
	        title:'备注',
	        align:'center',
	        valign:'middle',
	        width:'10%',
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

function changevalue(type,value){
	if(type==1){
		$('#textspan1').html(value);
	}
	else{
		$('#textspan2').html(value);
	}
}

function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

function onDblClickCell(field,value,row,$element){
	object==null;
	object = row ;
	var getvalue="";
	//var receive = getfiled(field);
	if(field=="reason"){
		pubtype = field;
		switch(field){
		case "reason":getvalue = row.reason;
		$element[0].innerHTML="<input onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'>";
		;break;
		}
	}else{
		swal({title:"此项不能修改",  type:"warning",});
	};
}

function getfiled(str){
	var result ="";
	switch(str){
	case "auditState":result="reason";break;
	}
	return result;
}

function getobject(dom,value,type){
	dom.parentNode.innerHTML=value;
	switch(type){
	case "reason":object.reason =value;break;
	}
}

function onupdataaudit(str){
	var mydata={};
	var getdata = $('#table').bootstrapTable('getSelections');
		mydata.reason = getdata[0].reason;
		mydata.id=getdata[0].ID;
		mydata.i=str;
		if(str==2){
			if(getdata[0].reason!=null&&getdata[0].reason!=""){
				$.ajax({
					url:'timeCheckController/AuditAndResultUpdata.do',
					data:mydata,
					success:function(e){
						refresh();
					}
				});
			}else
				swal({title:"请填写不通过原因",  type:"warning",});
		}else
			if(getdata[0].reason==null||getdata[0].reason==""){
				$.ajax({
					url:'timeCheckController/AuditAndResultUpdata.do',
					data:mydata,
					success:function(e){
						refresh();
					}
				});
			}else
				swal({title:"请删除不通过原因",  type:"warning",});
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