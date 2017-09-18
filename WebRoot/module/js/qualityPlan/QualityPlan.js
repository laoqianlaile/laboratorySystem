var object= {},
	pubtype = "",   //作为field的中间传递值
	datacount = -1,  //新增一行每次在顶部新增
	sbtjude = 0,   //判断表上的数据是否修改
	visture = "", // 值暂存的载体
	viscount = 0, //事件判断参数
	visture2 = "", //值暂存的载体
	viscount2 = 0, //事件判断参数
	judg= 0,       //后台方法判断参数
	judg2 = 0,    //后台方法判断参数
	judgHtml=0; //判断下拉选择是否选择完成
var mydata=new Array();  //暂存数组
var mydataID=new Array(); //暂存数组

function showdiag(data){
	$('#dequ').remove();
	document.getElementById("showdiv1").style.display = "none";
	var sentence = "<span id='dequ'>" + data + "</span>" ; 
	$('#showdiv1').append(sentence);
	var width=(document.body.clientWidth-300)/2;
	document.getElementById("showdiv1").style.marginLeft = width;
	document.getElementById("showdiv1").style.display = "block";
	setTimeout("document.getElementById('showdiv1').style.display = 'none'",800);
}

//表格初始化
$(function(){
	//综合管理室的人则是新增（提交），删除，修改，全部数据，详情
	//技术主管审核
	//其他各个科室则是新增建议页面
	//综合管理室+技术主管新增（提交），删除，修改，全部数据，详情，审核
	
	/*var dutyOrDepartment = "";
	$.ajax({
		url:'timeCheckController/getEmployeeID2.do',
		success:function(e){
			if(e == '0'){
				//只是综合管理室则只有新增（提交），删除，修改，全部数据，详情按钮
			}else if(e == '1'){
				//只是技术主管则只有审核按钮
			}else if(e == '2'){
				//
			}else if(e == '3'){
				
			}
		}
	});*/
	
	$('#table').bootstrapTable({
		pagination: true,//在表格底部显示分页条
		clickToSelect:true,
		classes:'table table-condensed',
		singleSelect : true,
		pageSize: 10,//页面数据条数	
		pageNumber:1,//首页页码
		pageList: [1,5, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		cache: false,//禁用 AJAX 数据缓存
		sortName:'ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'qualityPlanController/getQualityPlanWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams : queryParams, // 参数
		queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
		showRefresh : false, // 显示刷新按钮
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
	        field:'type',
	        title:'计划名称',
	        align:'center',
	        valign:'middle',
	        width:'15%',
	    },{
	        field:'code',
	        title:'计划编号',
	        align:'center',
	        valign:'middle',
	        width:'15%',
	    },{
	        field:'year',
	        title:'执行年度',
	        align:'center',
	        valign:'middle',
	        width:'15%',
	    },{
	        field:'state',
	        title:'状态',
	        align:'center',
	        valign:'middle',
	        width:'10%',
	    },{
	        field:'employeeName2',
	        title:'审核人',
	        align:'center',
	        valign:'middle',
	        width:'10%',
	    },{
	        field:'employeeName',
	        title:'制定人',
	        align:'center',
	        valign:'middle',
	        width:'10%',
	    },{
	        field:'remark',
	        title:'备注',
	        align:'center',
	        valign:'middle',
	        width:'12%',
	    }]
	});
	//下拉列表获取内容
	$.ajax({
		url:'timeCheckController/getEmployeeID2.do',
		success:function(e){
			var myobj = eval(e);
			var dom1 = $('#listul2');
			$('#textspan2').html("");
			var str2 = "<li role='presentation' onclick='changevalue(1,\"\")'>空</li>";
			dom1.append(str2);
			for(var i = 0;i< myobj.length;i++){ 	
				var str = "<li role='presentation' onclick='changevalue(1,\""+myobj[i].employeeName+"\")'>"+myobj[i].employeeName+"</li>";
				dom1.append(str);
			}
		}
	});
});

function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

		type : $('#type').val(),
		year : $('#year').val(),
		code : $('#code').val(),
		employeeName2 : $('#textspan1').html(),
		limit : params.limit, // 页面大小
		offset : params.offset, // 页码
		sort : params.sort, // 排序列名
		order : params.order
	// 排位命令（desc，asc）
	};
	return temp;
}
//下拉框选择
function changevalue(type,value){
	if(type==1){
		$('#textspan1').html(value);
	}
	else{	
		$('#textspan2').html(value);
	}
}

//刷新
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

//双击时触发的方法
function onDblClickCell(field,value,row,$element){
	object==null;
	if(row==object){	
	}else{
		visture = "";
		viscount = 0;
		visture2 = "";
		viscount2 = 0;
	}
	object = row ;
	var getvalue ="";
	//var receive = getfiled(field);
	if(field=="type"||field=="code"||field=="year"||field=="employeeName"||field=="employeeName2"){
		pubtype = field;
		switch(field){
		case "type":getvalue = row.type;
		$element[0].innerHTML="<div class=''>"
			+"<button class='btn btn-default dropdown-toggle' type='button' id='dropdowmlist' data-toggle='dropdown'>"
			+getvalue+"<span class='caret'></span></button>"
			+"<ul id='listdata2' class='dropdown-menu ' role='menu' aria-labelledby='dropdownMenu1'>"
			+"<li onclick ='updatatype(this,this.innerHTML)'>期间核查计划</li>"
			+"<li onclick ='updatatype(this,this.innerHTML)'>量值溯源计划</li>"
			+"<li onclick ='updatatype(this,this.innerHTML)'>人员比对计划</li>"
			+"</ul></div>";
		;break;
		case "code":getvalue = row.code;
		$element[0].innerHTML="<input onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'>";
		;break;
		case "year":getvalue = row.year;
		$element[0].innerHTML="<input onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'>";
		;break;
		case "employeeName2":if(viscount2==0)
			getvalue = $element[0].innerHTML;
		if(viscount2==1)
			getvalue = visture2;
		if(judgHtml==0){
			$element[0].innerHTML="<div class=''>"
				+"<button class='btn btn-default dropdown-toggle' type='button' id='dropdowmlist' data-toggle='dropdown'>"
				+getvalue+"<span class='caret'></span></button>"
				+"<ul id='listdata2' class='dropdown-menu ' role='menu' aria-labelledby='dropdownMenu1'>"
				+"</ul></div>";
				judgHtml=1;
				$.ajax({
					url:'timeCheckController/getEmployeeID2.do',
					data:{type:1},
					success:function(data){
						var myobj = eval(data);
						var listdata = $('#listdata2');
						for(var i = 0;i< myobj.length;i++){
							mydata[i] = myobj[i].employeeName;
							mydataID[i]= myobj[i].ID;
							var rstring = "<li role='presentation' onclick='getParentbutton2(this,"+"mydata["+i+"]"+","+"mydataID["+i+"]" + ")'>"+mydata[i]+"</li>";
							listdata.append(rstring);
						}
					}
				});
		}else{
			showdiag("请先完成之前的选择");
		}
		;break;
		}
	}else{
		showdiag("此项不能修改");
	};
}

function updatatype(dom,value){
	var parentdom = dom.parentNode;
	for(var i = 0;;i++){
		if(parentdom.nodeName == "TD"){
			parentdom.innerHTML=value;
			object.type=value;
			sbtjude = 1;
			break;
		}else{
			parentdom = parentdom.parentNode;
		}
	}
}
//修改存储值
function getParentbutton(dom,value,ID){
	var parentdom = dom.parentNode;
	for(var i = 0;;i++){
		if(parentdom.nodeName == "TD"){
			parentdom.innerHTML=value;
			visture = value ; 
			object.employeeName = ID;
			sbtjude = 1;
			viscount = 1;
			judgHtml=0;
			judg = 1;
			break;
		}else{
			parentdom = parentdom.parentNode;
		}
	}
}

//修改存储值
function getParentbutton2(dom,value,ID){
	var parentdom = dom.parentNode;
	for(var i = 0;;i++){
		if(parentdom.nodeName == "TD"){
			parentdom.innerHTML=value;
			visture2 = value,
			object.employeeName2= ID;
			sbtjude = 1;
			viscount2 = 1;
			judgHtml=0;
			judg2 = 1;
			break;
		}else{
			parentdom = parentdom.parentNode;
		}
	}
}

function getobject(dom,value,type){
	dom.parentNode.innerHTML=value;
	switch(type){
	case "type":if(object.type == value){
		sbtjude = sbtjude;
		}else{
			object.type =value;
			sbtjude = 1;
		};break;
	case "code":if(object.code == value){
		sbtjude = sbtjude;
		}else{
			object.code =value;
			sbtjude = 1;
		};break;
	case "year":if(object.year == value){
		sbtjude = sbtjude;
	}else{
			object.year =value;
			sbtjude = 1;
		};break;
	}
}

function getfiled(str){
	var result ="";
	switch(str){
	case "number":result="type";break;
	case "type":result="code";break;
	case "code":result="year";break;
	case "state":result="employeeName2";break;
	case "employeeName2":result="employeeName";break;
	}
	return result;
}

//新增一行
function addrow(){
	datacount = $('#table').bootstrapTable('getData').length;
	var name="";
	$.ajax({
		url:'timeCheckController/getEmployeeID1BySeeion.do',
		success:function(e){
			var count = e.length-1;
			name = e.substring(1,count);
			$('#table').bootstrapTable('insertRow',{index:1000,row:{
				ID:'',
				number:++datacount,
				type:'',
				code:'',
				year:'',
				state:'',
				employeeName:name,
				employeeName2:'',
			}});
			$("#table").find("tr").eq(1).attr("class","trbg");
			$(".thatbtn").css("display","block");
		}
	})
	
}
//修改
function updataqualityPlan(dom){
	var getdata = $('#table').bootstrapTable('getSelections');
	var dataobj={};
	if(getdata.length==1){
		dataobj.id = getdata[0].ID;
		dataobj.type = getdata[0].type;
		dataobj.code = getdata[0].code;
		dataobj.year = getdata[0].year;
		dataobj.employeeName = getdata[0].employeeName;
		dataobj.employeeName2 = getdata[0].employeeName2;
		dataobj.judg = judg;
		dataobj.judg2 = judg2;
		if(dataobj.id==null||dataobj.id==""){
			showdiag("请选择新增按钮");
		}
		else{
			if(sbtjude == 1){
				$.ajax({
					url:'qualityPlanController/updataQualityPlanById.do',
					  data:dataobj,
					  success:function(o){  
						  sbtjude=0;
						  judg =0;
						  judg2 =0;
						  showdiag("修改成功");
						  refresh();
					  }
				});
			}
		}
		
		
		
	}else{
		showdiag("请选择或者选择一条");
	}
	
}

//删除
function deletequalityPlan(){
	var getdata = $('#table').bootstrapTable('getSelections');
	var allid = "";
	if(getdata.length<=0){
		showdiag("请选择");
	}else{
		if(getdata[0].ID.length==0){
			refresh();
		}else{
			for (var i = 0 ; i < getdata.length ; i++){
				allid += getdata[i].ID+","; 
			}
			var dataobj={};
			dataobj.idstr = allid;
			$.ajax({
				  url:'qualityPlanController/deleteQualityPlanById.do',
				  data:dataobj,
				  success:function(e){
					  showdiag("删除成功");
					  refresh();
				  }
				});
		}
		
	}
	
	
}

//新增
function addQualityPlan(dom){
	var getdata = $('#table').bootstrapTable('getSelections');
	var dataobj={};
	dataobj.type = getdata[0].type;
	dataobj.code = getdata[0].code;
	dataobj.year = getdata[0].year;
	dataobj.employeeName = getdata[0].employeeName;
	dataobj.employeeName2 = getdata[0].employeeName2;
	if(getdata.length==1){
		for(var i =0 ;i<1;i++){
			if(dataobj.type==null||dataobj.type==""){
				showdiag("请填写计划名称");
				break;
			}
			if(dataobj.code==null||dataobj.code==""){
				showdiag("请填写计划编号");
				break;
			}
			if(dataobj.year==null||dataobj.year==""){
				showdiag("请填写执行年度");
				break;
			}
			if(dataobj.employeeName==null||dataobj.employeeName==""){
				showdiag("请填写审核人");
				break;
			}
			if(dataobj.id==undefined){
				$.ajax({
					url:'qualityPlanController/addQualityPlan.do',
					data:dataobj,
					success:function(e){
						judg =0;
						judg2 =0;
						showdiag("增加成功");
						refresh();
						$(".thatbtn").css("display","none");
					},
					});
			}else{
				showdiag("请选择修改按钮");
				}
		}
	}else{
		showdiag("请选择一条数据");
	}
	
};


function getTimeCheckPage(){
	var getdata = $('#table').bootstrapTable('getSelections');
	var name = getdata[0].type;
	if(name =="期间核查计划"){
		var employee2 = "<%=session.getAttribute('ID')%>";
		var tableemplyee2 = getdata[0].employee;
		window.location.href="http://localhost:8080/laboratorySystem/module/jsp/timecheck/TimeCheck.jsp?qualiyPlanId="+getdata[0].ID+"&&code="+getdata[0].code+"&&year="+getdata[0].year;
	}
	else if(name =="量值溯源计划"){
		window.location.href="http://localhost:8080/laboratorySystem/module/jsp/traceability/traceability.jsp?qualiyPlanId="+getdata[0].ID+"&&code="+getdata[0].code+"&&year="+getdata[0].year;
	}
	else if(name =="人员比对计划"){
		window.location.href="http://localhost:8080/laboratorySystem/module/jsp/personContrast/personContrast.jsp?qualiyPlanId="+getdata[0].ID+"&&code="+getdata[0].code+"&&year="+getdata[0].year;
	}else{
		showdiag("没有这个计划");
	}
}
	
function resetAlldata(){
	$('#type').val("");
	$('#year').val("");
	$('#code').val("");
	$('#textspan1').html("");
	refresh();
}	
function ToAuditJSP(){
	var getdata = $('#table').bootstrapTable('getSelections');
	if(getdata.length==1){
		var name = getdata[0].type;
		if(name=="期间核查计划")
			window.location.href="http://localhost:8080/laboratorySystem/module/jsp/timecheck/TimeCheckAudit.jsp?qualiyPlanId="+getdata[0].ID+"&&year="+getdata[0].year+"&&code="+getdata[0].code;
		else if(name=="量值溯源计划")
			window.location.href="http://localhost:8080/laboratorySystem/module/jsp/traceability/traceabilityAudit.jsp?qualiyPlanId="+getdata[0].ID+"&&year="+getdata[0].year+"&&code="+getdata[0].code;
		else if(name=="人员比对计划")
			window.location.href="http://localhost:8080/laboratorySystem/module/jsp/personContrast/personContrastAudit.jsp?qualiyPlanId="+getdata[0].ID+"&&year="+getdata[0].year+"&&code="+getdata[0].code;
		else{
			showdiag("没有这个计划");
		}
	}else{
		showdiag("请选择一条信息");
	}
	
}
function ToResultJSP(){
	var getdata = $('#table').bootstrapTable('getSelections');
	if(getdata.length==1){
		var name = getdata[0].type;
		if(name=="期间核查计划")
			window.location.href="http://localhost:8080/laboratorySystem/module/jsp/timecheck/TimeCheckResult.jsp?qualiyPlanId="+getdata[0].ID+"&&year="+getdata[0].year+"&&code="+getdata[0].code;
		else if(name=="量值溯源计划")
			window.location.href="http://localhost:8080/laboratorySystem/module/jsp/traceability/traceabilityResult.jsp?qualiyPlanId="+getdata[0].ID+"&&year="+getdata[0].year+"&&code="+getdata[0].code;
		else if(name=="人员比对计划")
			window.location.href="http://localhost:8080/laboratorySystem/module/jsp/personContrast/personContrastResult.jsp?qualiyPlanId="+getdata[0].ID+"&&year="+getdata[0].year+"&&code="+getdata[0].code;
		else{
			showdiag("没有这个计划");
		}
	}else{
		showdiag("请选择一条数据");
	}
	
}