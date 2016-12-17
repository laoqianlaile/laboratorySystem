function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	pageReqeust.equipmentName = encodeURI($("#equipmentName").val());
	pageReqeust.equipmentCode = encodeURI($("#equipmentCode").val());
	//pageReqeust.equipmentTypeName = encodeURI($("#equipmentTypeName").val());	
	//pageReqeust.auditState = encodeURI($("#auditState").val());
	if($("#auditState").find("option:selected").text()=="未审核"){
		pageReqeust.auditState="0";
		}
	else if($("#auditState").find("option:selected").text()=="审核通过"){
		pageReqeust.auditState="1";
	}
	else if($("#auditState").find("option:selected").text()=="审核不通过"){
		pageReqeust.auditState="2";
	}else if ($("#auditState").find("option:selected").text() == "全部") {
		pageReqeust.auditState = "";
	}
	//pageReqeust.correctOrgan = encodeURI($("#correctOrgan").val());
	if($("#departmentName").find("option:selected").text()!=""||$("#departmentName").find("option:selected").text()!=null){
		pageReqeust.departmentName=$("#departmentName").find("option:selected").text();
	}else{
		pageReqeust.departmentName="";
	}	
	pageReqeust.startTime = encodeURI($("#startTime").val());
	pageReqeust.endTime = encodeURI($("#endTime").val());
	// pageReqeust.qualityPlanID="1";
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
/*						onDblClickCell : onDblClickCell,
						onClickRow:onClickRow,
*/						url : 'traceabilityController/getTraceabilityAuditWithPaging.do',// 服务器数据的加载地址
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
									title : 'ID',
							    	field:'traceabilityID',
							    	visible:false,
							    	colspan : 1,
									rowspan : 2,
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
								}, {
									title : '部门名称',
									field : 'departmentName',
									align : 'center',
									colspan : 1,
									rowspan : 2
								}, {
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
								}, {
									title : '不通过原因',
									field : 'reason',
									align : 'center',
									colspan : 1,
									rowspan : 2
								}, {
									title : '审核状态',
									field : 'auditState',
									align : 'center',
									colspan : 1,
									rowspan : 2,
									formatter : function(value, row,
											index) {
										var content="";
										if (value == "0") {
											content = "未审核";
										} else if (value == "1") {
											content= "审核通过";
										} else if (value== "2") {
											content = "审核不通过";
										}
										return content;
									}
								},
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
		/*$.ajax({    
			url : 'calibrationValueController/getCalibrationValuesByCondition.do',
			data : {tracebilityID:row.traceabilityID},
			success : function(e) {
				var myobj = eval(e);
				for(var i =0;i<myobj.length;i++){
					content += "<tr><td ondblclick='doubleclick(this)'>"+myobj[i].Name+"</td>"+
					"<td ondblclick='doubleclick(this)'>"+myobj[i].Value+"</td>"+
					"<td class='deletelogo' style='display:inline-block;width:11px;border-left:none;display:none;'>"+
					"<span class='glyphicon glyphicon-remove' onclick='deletetd(this,"+index+")'></span></td></tr>";
				}
			}
			});
		*/
		
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
window.onload=function(){
	inti();
	getDepartment();
	$("#updateReason").click(function(){
		var data = $('#table').bootstrapTable("getSelections");
		var obj={};
		obj.auditState="2";
		obj.reason=encodeURI($("#reason").val(),"utf-8");
		obj.ID = data[0].traceabilityID;
		$.ajax({
			data:obj,
			url:'traceabilityController/auditTracebilityByID.do',
			success:function(e){
			alert("此条建议不通过");
			$("#noPassModal").modal('hide');
				refresh();
			}			
		});		
	});
}

function refresh(){
	$('#table').bootstrapTable('refresh', null);
}
function search() {
	$('#table').bootstrapTable('refresh', queryParams);
}

function pass(){
	var data = $('#table').bootstrapTable("getSelections");
	if(data.length==0){
		alert("请选择一条建议");
		}
	else{
		    confirm("确定这条建议通过？");
			var obj={};
			obj.auditState="1";
			obj.reason="";
			obj.ID = data[0].traceabilityID;
			$.ajax({
				data:obj,
				url:'traceabilityController/auditTracebilityByID.do',
				success:function(e){
					alert("审核通过");
					refresh();
				}			
			});		
	}	
}
function noPass(){
	var data = $('#table').bootstrapTable("getSelections");
	if(data.length==0){
		alert("请选择一条建议");
		}
	else{
		confirm("确定这条数据不通过？");
		$("#noPassModal").modal('show');
	}	
}
function allData() {
	$('#equipmentName').val("");
	$('#equipmentCode').val("");
	$('#auditState').val("全部");
	$('#startTime').val("");
	$('#endTime').val("");
	$('#departmentName').val("");
	refresh();	
}
