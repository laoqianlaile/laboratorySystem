var object={},
	pubtype = "", //值传递载体
	datacount = -1, //保证新增行在顶部
	sbtjude = 0, //判断数据是否修改
	clickcount=1, 
	timedome, //保存节点对象
	icount=0; //计数
	
var mydata=new Array();
var mydataID=new Array();

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

//初始化表格
$(function(){
	
				$('#table').bootstrapTable({
					pagination: true,//在表格底部显示分页条
					classes:'table table-condensed',
					clickToSelect:true,
					pageSize: 10,//页面数据条数
					pageNumber:1,//首页页码
					pageList: [1,2,3, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
					cache: false,//禁用 AJAX 数据缓存
					sortName:'timeCheck.ID',//定义排序列
					sortOrder:'asc',//定义排序方式
					url:'timeCheckController/getTimeCheckWithPaging.do',//服务器数据的加载地址
					sidePagination:'server',//设置在哪里进行分页
					contentType:'application/json',//发送到服务器的数据编码类型
					dataType:'json',//服务器返回的数据类型
//					queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
					onDblClickCell:onDblClickCell,
					queryParams : queryParams2, // 参数
					onClickRow:onClickRow,
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
				        width:'12%',
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
				        field:'employeeName2',
				        title:'制定人',
				        align:'center',
				        valign:'middle',
				        width:'7%',
				    },{
				        field:'result',
				        title:'核查结果',
				        align:'center',
				        valign:'middle',
				        width:'6%',
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
				        width:'100',
				    },{
				        field:'remark',
				        title:'备注',
				        align:'center',
				        valign:'middle',
				        width:'',
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
});

$(function(){
	$(function(){
		$('#tablefile').bootstrapTable({
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
		    	width:'5%',
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

var $elementdom,rowID;
function onClickRow(row,$element,field){
	$elementdom = $element;
	rowID = row.ID;
	setTimeout("setTimeoutgetID($elementdom[0],rowID)","100");
}

function setTimeoutgetID(dom,rowID){
	var getdata = $('#table').bootstrapTable('getSelections');
	if((getdata.length==1)&&(dom.getAttribute("class")=="selected")){
		refreshfile();
	};
}
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
//双击事件
function onDblClickCell(field,value,row,$element){
	object==null;
	object = row ;
	var getvalue="";
	//var receive = getfiled(field);
	if(field=="projectName"||field=="projectPoint"||field=="endTime"||field=="remark"){
		pubtype = field;
		switch(field){
		case "projectName":getvalue = row.projectName;
		$element[0].innerHTML="<input onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'>";
		;break;
		case "projectPoint":getvalue = row.projectPoint;
		$element[0].innerHTML="<input onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'>";
		;break;
		case "endTime":getvalue = row.endTime;
		//$element[0].innerHTML="<input id='endtime2' onblur='showTimeDiv(this)' type='text' class='form-control text'>";
		$element[0].innerHTML="<input id='endtime2' type='text' class='form-control' value='"+getvalue+"'>";
		$('#endtime2').datetimepicker({
			minView:'month',
			format: 'yyyy-mm-dd',
			weekStart:1,
			todayBtn:1,
			autoclose:1,
			todayHighlight:1,
			startView:2,
			forceParse:0,
			showMeridian:1,
			language:'zh-CN',    //  此属性是显示顺序，还有显示顺序是mm-dd-yyyy
		}).on('changeDate', function(ev){
			if(object.endTime == $('#endtime2').val()){
				sbtjude = sbtjude;
			}else{
				object.endTime =$('#endtime2').val();
					sbtjude = 1;
			};
			$element[0].innerHTML=$('#endtime2').val();
		});
		;break;
		case "remark":getvalue = row.remark;
		$element[0].innerHTML="<input onblur='getobject(this,this.value,"+"pubtype"+")' type='text' class='form-control' value='"+getvalue+"'>";
		;break;
		}
	}else{
		showdiag("此项不能修改");
	};
}

function getobject(dom,value,type){
	dom.parentNode.innerHTML=value;
	switch(type){
	case "projectName":if(object.projectName == value){
		sbtjude = sbtjude;
		}else{
			object.projectName =value;
			sbtjude = 1;
		};break;
	case "projectPoint":if(object.projectPoint == value){
		sbtjude = sbtjude;
		}else{
			object.projectPoint =value;
			sbtjude = 1;
		};break;
	case "endTime":if(object.endTime == value){
		sbtjude = sbtjude;
	}else{
			object.endTime =value;
			sbtjude = 1;
		};break;
	case "remark":if(object.remark == value){
		sbtjude = sbtjude;
		}else{
			object.remark =value;
			sbtjude = 1;
		};break;
	}
}

function getsugestID(){
	var getdata = $('#table').bootstrapTable('getSelections');
	if(getdata.length==1){
		$('#asda').attr("data-target","#addModal");
		$('#belongID').val(getdata[0].ID);
	}else
		showdiag("请选择一条数据");
	
	
}

function refresh(){
	$('#table').bootstrapTable('refresh', null);
}

function refreshfile(){
	$('#tablefile').bootstrapTable('refresh', null);
}

function changevalue(type,value){
	if(type==1){
		$('#textspan1').html(value);
	}
	else{
		$('#textspan2').html(value);
	}
}

function addrow(){
	datacount = $('#table').bootstrapTable('getData').length;
	$('#table').bootstrapTable('insertRow',{index:0,row:{
		number:++datacount,
		projectCode:'',
		projectName:'',
		projectPoint:'',
		departmentName:'',
		endTime:'',
		reason:'',
		auditState:'',
		employeeName:'',
		remark:'',
		result:'',
	}});
	$("#table").find("tr").eq(1).attr("class","trbg");
	$(".thatbtn").css("display","block");
}

function add(dom){
	var getdata = $('#table').bootstrapTable('getSelections');
	var dataobj={};
	if(getdata.length==1){
		dataobj.datacount = $('#table').bootstrapTable('getData').length+1;
		dataobj.projectName = getdata[0].projectName;
		dataobj.projectPoint = getdata[0].projectPoint;
		dataobj.endTime = getdata[0].endTime;
		dataobj.remark = getdata[0].remark;
		if(getdata[0].ID==null||getdata[0].ID==""){
			if(dataobj.endTime!=null&&dataobj.endTime!=""){
				$.ajax({
					url:'timeCheckController/addTimeCheck.do',
					data:dataobj,
					success:function(e){
						//dom.setAttribute("onclick", "updatasuggest(this)"); 
						refresh();
						showdiag("新增成功");
						$(".thatbtn").css("display","none");
					},
				});
			}else
				showdiag("请填写计划完成时间");
		}else{
			showdiag("请点击修改该按钮");
		}
	}else
		showdiag("请选择数据或选择一条数据");
	
}

function updata(dom){
	var getdata = $('#table').bootstrapTable('getSelections');
	var dataobj={};
	if(getdata.length==1){
		dataobj.id=getdata[0].ID;
		dataobj.projectName = getdata[0].projectName;
		dataobj.projectPoint = getdata[0].projectPoint;
		dataobj.endTime = getdata[0].endTime;
		dataobj.remark = getdata[0].remark;
		if(getdata[0].ID==undefined){
			showdiag("请点击新增按钮");
		}else{
			if(sbtjude == 1){
				$.ajax({
					url:'timeCheckController/updataTimeCheck.do',
					  data:dataobj,
					  success:function(o){  
						  sbtjude=0;
						  refresh();
						  showdiag("修改成功");
					  }
				});
			}
		}
	}else{
		showdiag("请选择或者选择一条");
	}
	
}

function deleteTimeCheck(){
	var getdata = $('#table').bootstrapTable('getSelections');
	var allid = "";
	if(getdata.length<=0){
		showdiag("请选择");
	}else{
		for (var i = 0 ; i < getdata.length ; i++){
			allid += getdata[i].ID+","; 
		}
		var dataobj={};
		dataobj.idstr = allid;
		$.ajax({
			  url:'timeCheckController/deleteTimeCheck.do',
			  data:dataobj,
			  success:function(e){
				  refresh();
				  showdiag("删除成功");
				  $(".thatbtn").css("display","none");
			  }
			});
	}
	
	
}

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


function download(){
	var getdata = $('#tablefile').bootstrapTable('getSelections');
	var fileID;
	fileID=getdata[0].ID;
	window.location.href="fileOperateController/filedownload.do?ID="+fileID;
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

function ToAuditJSP(){
	window.location.href="http://localhost:8080/laboratorySystem/module/jsp/timecheck/TimeCheckAudit.jsp?year="+$('#yearvalue').html()+"&&code="+$('#codevalue').html();
}
function ToResultJSP(){
	window.location.href="http://localhost:8080/laboratorySystem/module/jsp/timecheck/TimeCheckResult.jsp?year="+$('#yearvalue').html()+"&&code="+$('#codevalue').html();
}