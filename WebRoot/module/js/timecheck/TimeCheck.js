var fileParam = {};
var object={},
	pubtype = "", //值传递载体
	datacount = -1, //保证新增行在顶部
	sbtjude = 0, //判断数据是否修改
	clickcount=1, 
	timedome, //保存节点对象
	icount=0; //计数
	
var mydata=new Array();
var mydataID=new Array();

//初始化表格
$(function(){
	
				$('#table').bootstrapTable({
					pagination: true,//在表格底部显示分页条
					classes:'table table-condensed',
					clickToSelect:true,
					singleSelect : true,
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
		uploadFile();
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
		belongtoID:rowID,
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
		swal({title:"此项不能修改",  type:"warning",});
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
		swal({title:"请选择一条数据",  type:"warning",});

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
						swal({title:"新增成功",  type:"success",});
						$(".thatbtn").css("display","none");
					},
				});
			}else
				swal({title:"请填写计划完成时间",  type:"warning",});
		}else{
			swal({title:"请点击修改该按钮",  type:"warning",});
		}
	}else
		swal({title:"请选择数据或选择一条数据",  type:"warning",});
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
			swal({title:"请点击新增按钮",  type:"warning",});
		}else{
			if(sbtjude == 1){
				$.ajax({
					url:'timeCheckController/updataTimeCheck.do',
					  data:dataobj,
					  success:function(o){  
						  sbtjude=0;
						  refresh();
						  swal({title:"修改成功",  type:"success",});
					  }
				});
			}
		}
	}else{
		swal({title:"请选择或者选择一条",  type:"warning",});
	}
	
}

function deleteTimeCheck(){
	var getdata = $('#table').bootstrapTable('getSelections');
	var allid = "";
	if(getdata.length<=0){
		swal({title:"请选择",  type:"warning",});
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
				  swal({title:"删除成功",  type:"success",});
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
	window.location.href="timeCheckController/filedownload.do?ID="+fileID;
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

/*新增js方法*/
//检查文件类型
function checkFile(o) {
	$("#chooseFile").attr("disabled", "disabled");
	var filePath = $(o).val();
	if (filePath != "" && filePath != undefined) {
		var arr = filePath.split('\\');
		var fileName = arr[arr.length - 1];
		$("#fileName").html(fileName);
	}
	if (o.value.indexOf('.jpg') > 0 || o.value.indexOf('.png') > 0 || o.value.indexOf('.gif') > 0) {
		fileParam.type = 3;
	}
	if (o.value.indexOf('.doc') > 0 || o.value.indexOf('.docx') > 0) {
		fileParam.type = 2;
	}
} 

function openModal() {
	$("#chooseFile").removeAttr("disabled");
	$("#fileName").html("");
	fileParam.firstDirectoryName = $('#fileType option:checked').text();// 一级目录
	fileParam.type = 1 ;
	fileParam.remarks = $('#add_TemplateRemarks').val(); // 备注
	fileParam.belongtoID = rowID;
	$("#addModal").modal("show");
	
}

//上传文件
function uploadFile() {
	$("#files").fileupload({
				autoUpload : true,
				url : 'timeCheckController/upload.do',
				dataType : 'json',
				add : function(e, data) {
					$("#ensure").click(function() {
						fileParam.secondDirectoryName = "核查记录文件"; // 二级目录
						data.submit();
					});
				},
			}).bind('fileuploaddone',function(e, data) {
						var fileID = data.result;
						if (fileID != null && fileID != "null" && fileID != "") {
							// 传过来的fileID 与数据库不匹配
							swal({title:"上传成功",  type:"success",});
							$("#addModal").modal("hide");
							reload();
						} else {
							swal({title:"上传失败! 网路繁忙",  type:"error",});
						} 
					});

	// 文件上传前触发事件,如果需要额外添加参数可以在这里添加
	$('#files').bind('fileuploadsubmit', function(e, data) {
		data.formData = {
			firstDirectory : fileParam.firstDirectoryName,
			secondDirectory : fileParam.secondDirectoryName,
			TypeNumber : fileParam.type,
			belongtoID : fileParam.belongtoID,
			remark : fileParam.remarks
		}
	});
}

// 判空处理
function checkNull(){
	if(arguments[0].TemplateName == ""){
		swal({title:"文件名称不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].fileID == ""){
		swal({title:"请选择一个文件上传",  type:"warning",});
		return true;
	}
}

//重新加载页面
function reload() {
	window.location.reload();
}