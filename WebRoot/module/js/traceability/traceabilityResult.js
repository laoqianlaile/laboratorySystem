var object = {}, pubtype = "", datacount = -1, sbtjude = 0, visture = "", viscount = 0;
//点击一行
var rowID="";
function queryParams(pageReqeust) {
	//alert(encodeURI($("#departmentName").val()));
	//alert(encodeURI($("#type").val()));
	pageReqeust.departmentName=$("#departmentName").val();
	if($("#type").val()=="自检"){
		pageReqeust.type=0;
	}else{
		pageReqeust.type=1;
	}	
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	pageReqeust.auditState="1";
	return pageReqeust;
}

function inti() {
	$('#table')
			.bootstrapTable(
					{
						striped : true,// 隔行变色效果
						sortName : 'traceability.ID',// 定义排序列
						classes : 'table table-hover table-bordered table-condensed',
						clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和
						// checkbox
						singleSelect : true,
						pagination : true,// 在表格底部显示分页条
						rownumbers : true,// 行数 .
						pageSize : 10,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 5, 10, 20, 50, 200, 500 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
						// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortOrder : 'asc',// 定义排序方式
						onDblClickCell : onDblClickCell,
						onClickRow:onClickRow,
						url : 'traceabilityController/getTraceabilityAuditWithPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						contentType : 'application/json',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : queryParams,
						queryParamsType : "limit",
						// queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名//设置True
						// 将禁止多选
						columns : [
								[ {
									field : 'ck',
									checkbox : true,
									align : 'center',
									colspan : 1,
									rowspan : 2
								},{
									title : '序号',
									field : 'Number',
									colspan : 1,
									rowspan : 2,
									formatter : function(value, row, index) {
										return index + 1;
									}
								}, {
									title : '设备名称',
									field : 'equipmentName',
									align : 'center',
									colspan : 1,
									rowspan : 2
								}, {
									title : '仪器编号',
									field : 'equipmentCode',
									align : 'center',
									colspan : 1,
									rowspan : 2
								}, {
									title : '规格型号',
									field : 'equipmentTypeName',
									align : 'center',
									colspan : 1,
									rowspan : 2
								}, {
									title : '需要校准的量值',
									align : 'center',
									colspan : 1,
									rowspan : 1
								}, {
									title : '校验服务机构',
									field : 'correctOrgan',
									align : 'center',
									colspan : 1,
									rowspan : 2
								},  {
									title : '本次校验周期',
									field : 'period',
									align : 'center',
									colspan : 1,
									rowspan : 2
								}, {
									title : '本年度校验时间',
									field : 'nowCorrectYear',
									align : 'center',
									colspan : 1,
									rowspan : 2
								}, {
									title : '下次计划校验时间',
									field : 'nextCorrectYear',
									align : 'center',
									colspan : 1,
									rowspan : 2
								},{
									title : '对溯源结果的确认',
									field : 'result',
									align : 'center',
									colspan : 1,
									rowspan : 2
								}, {
									title : '证书编号',
									field : 'certificateNumber',
									align : 'center',
									colspan : 1,
									rowspan : 2
								},	{
									title : '操作',
								align : 'center',
								colspan : 1,
								rowspan : 2,
								formatter : function(value, row,
										index) {								
									var button = '<button class="btn btn-sm btn-primary" onclick="submit()">提交</button>';
									return button;
								}
							}
								],
								[
{
	title : '量值名称&nbsp;|&nbsp;测量范围',
	field : 'Name1',
	colspan : 1,
	rowspan : 1,
	formatter : function(value, row,
			index) {
		
		var content="";
		
		for(var i =0;i<value.length;i++){
			content += "<tr><td ondblclick='doubleclick(this)'>"+value[i].Name+"</td>"+
			"<td ondblclick='doubleclick(this)'>"+value[i].Value+"</td>"+
			"<td class='deletelogo' style='display:inline-block;width:11px;border-left:none;display:none;'>"+
			"<span class='glyphicon glyphicon-remove' onclick='deletetd(this,"+index+")'></span></td></tr>";
		}
		var div = "<table id=Ntable"+index+" class='Ntable' style='display:block;overflow:auto;height:45px'>"+content+"</table>";
		/*var button1 = '<button class="mybtnstyle btn btn-sm btn-primary glyphicon glyphicon-plus"  onclick="addNameAndRange(this,'+index+')"></button>';
		var button2 = '<button class="mybtnstyle btn btn-sm btn-primary glyphicon glyphicon-minus"  onclick="delNameAndRange(this,'+index+')"></button>';
*/		if(content!=null&&content!=""){
			return div;
		}else{
			this;
		}
	}
}  ] ]
					});
}


function onClickRow(row){
	rowID=row.traceabilityID;
	refreshfile();
}
//完善提交
function submit(){
	var getdata=$("#table").bootstrapTable("getSelections");
	if(getdata.length==0){
		alert("请选择一条要提交的数据");
		}
	else{
		confirm("确定要提交这一条数据？");
		var data={};
		data=getdata[0];
		data.ID = getdata[0].traceabilityID;
		if(getdata[0].result!=null&&getdata[0].result!=""){
			data.result=getdata[0].result;
		}else{
			alert("确认结果不能为空");
			return;
		}
		if(getdata[0].certificateNumber!=null&&getdata[0].certificateNumber!=""){
			data.certificateNumber=getdata[0].certificateNumber;
		}else{
			alert("证书编号不能为空");
			return;
		}
		data.reason="";
		$.ajax({
			data:data,
			url:'traceabilityController/auditTracebilityByID.do',
			success:function(e){
				alert("提交成功");
			}
		});
	}	
}
function getfiled(str) {
	var result = "";
	switch (str) {
	case "result":
		result = "result";
		break;
	case "certificateNumber":
		result = "certificateNumber";
		break;
	}
	return result;
}
function getobject(dom, value, type) {
	dom.parentNode.innerHTML = value;
	switch (type) {
	case "result":
		if (object.result == value) {
			sbtjude = sbtjude;
		} else {
			object.result = value;
			sbtjude = 1;
		}
		;
		break;
	case "certificateNumber":
		if (object.certificateNumber == value) {
			sbtjude = sbtjude;
		} else {
			object.certificateNumber = value;
			sbtjude = 1;
		}
		;
		break;
	}
}
function onDblClickCell(field, value, row, $element) {
	object == null;
	if (row == object) {
	} else {
		visture = "";
		viscount = 0;
		visture = "";
		viscount = 0;
	}
	object = row;
	var getvalue = "";
	var receive = getfiled(field);
	if (receive == "result" || receive == "certificateNumber") {
		pubtype = receive;
		switch (receive) {
		case "certificateNumber":
			getvalue = row.certificateNumber;
			if(getvalue==undefined){
				getvalue="";
			}
			$element[0].innerHTML = "<input onblur='getobject(this,this.value,"
					+ "pubtype" + ")' type='text' class='form-control' value='"
					+ getvalue + "'>";
			;
			break;
		case "result":
			getvalue = row.result;
			if(getvalue==undefined){
				getvalue="";
			}
			$element[0].innerHTML = "<input onblur='getobject(this,this.value,"
					+ "pubtype" + ")' type='text' class='form-control' value='"
					+ getvalue + "'>";
			;
			break;
		}
	} else {
		alert("此项不能修改");
	}
	;
}
//传参
function Params(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	pageReqeust.belongtoID = rowID;
	return pageReqeust;
}
/*function setTimeoutgetID(dom,rowID){
	var getdata=$('table').bootstrapTable('getSelections');
	if((getdata.length==1)&&(dom.getAttribute("class")=="selected")){
		
		
		rowID="";
	}
	
}*/
window.onload = function() {
	getDepartment();
		inti();
		$("#departmentName").change(function(){
			refresh();
		});
		$("#type").change(function(){
			refresh();
		})
}
$(function(){
	$('#filetable').bootstrapTable(
			{
				// height:500,
				striped : true,// 隔行变色效果
				sortName : 'ID',// 定义排序列
				classes : 'table table-hover table-bordered table-condensed',
				clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和
				// checkbox
				singleSelect : true,
				pagination : true,// 在表格底部显示分页条
				rownumbers : true,// 行数 .
				pageSize : 5,// 页面数据条数
				pageNumber : 1,// 首页页码
				pageList : [ 3, 5, 10, 20, 50, 200, 500 ],// 设置可供选择的页面数据条数
				clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
				// checkbox
				cache : false,// 禁用 AJAX 数据缓存
				sortOrder : 'asc',// 定义排序方式
				url : 'fileOperateController/getFileInfoBybelongtoIDWithPaging.do',
				sidePagination : 'server',// 设置在哪里进行分页
				contentType : 'application/json',// 发送到服务器的数据编码类型
				dataType : 'json',// 服务器返回的数据类型
				queryParams : Params,
				queryParamsType : "limit",
				selectItemName : '',// radio or checkbox 的字段名//设置True
				// 将禁止多选
				columns : [
						{
							field : 'ck',
							checkbox : true,
							align : 'center'
						},
						{
							title : '送检方式',
							field : 'type',
							align : 'center',
							formatter : function(value, row,
									index) {
								var content="";
								if (value == "0") {
									content = "自检";
								} else if (value == "1") {
									content= "外检";
								}
								return content;
							}
						},

						{
							title : '文件名',
							field : 'fileName',
							align : 'center'
						},
						{
							title : 'ID',
							field : 'ID',
							align : 'center',
							visible:false
								
						},
						{
							title : '上传时间',
							field : 'uploadTime',
							align : 'center',
						},
						{
							title : '操作',
							formatter : function(value, row, index) {
								var submit = '<button class="btn btn-primary glyphicon" onclick="fileDownload()">下载</button>';
								return submit;
							}
						}, {
							title : '备注',
							field : 'remarks',
							align : 'center',
						}]
			});
});

function refresh() {
	$('#table').bootstrapTable('refresh', null);
}
function refreshfile() {
	$('#filetable').bootstrapTable('refresh', null);
}
//下载文件
function fileDownload() {
	var getdata = $("#filetable").bootstrapTable('getSelections');
	var fileID = getdata[0].ID;
	window.location.href="fileOperateController/filedownload.do?ID="+fileID;	
}

function getDepartment(){
	$.ajax({
		url:'departmentController/getDepartmentName.do',
		success:function(data){
			var obj=eval("("+data+")");	
			var obje=eval("("+obj+")");
			for(var i=0;i<obje.length;i++){
				 $("#departmentName").append("<option value='"+obje[i].departmentName+"'>"+obje[i].departmentName+"</option>");
			}
		}
	});
}
