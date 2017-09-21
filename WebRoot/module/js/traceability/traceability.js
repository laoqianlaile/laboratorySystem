var object = {}, pubtype = "", datacount = -1, sbtjude = 0, visture = "", viscount = 0, visture2 = "", viscount2 = 0, visture3 = "", viscount3 = 0, judg = 0, judg1 = 0, judg2 = 0, judg3 = 0, visture1 = "", viscount1 = 0, logojuge = 1;
var obj = {};
var rowID;
var mydataID = new Array();
var mydata = new Array();
var mydata1 = new Array();
var mydataID1 = new Array();
var mydata2 = new Array();
var mydataID2 = new Array();
var fileParam = {};

function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	pageReqeust.equipmentName = encodeURI($("#equipmentName").val());
	pageReqeust.equipmentCode = encodeURI($("#equipmentCode").val());
	pageReqeust.model = encodeURI($("#model").val());
	if ($("#auditState").find("option:selected").text() == "未审核") {
		pageReqeust.auditState = "0";
	} else if ($("#auditState").find("option:selected").text() == "审核通过") {
		pageReqeust.auditState = "1";
	} else if ($("#auditState").find("option:selected").text() == "审核不通过") {
		pageReqeust.auditState = "2";
	} else if ($("#auditState").find("option:selected").text() == "全部") {
		pageReqeust.auditState = "";
	}
	pageReqeust.correctOrgan = encodeURI($("#correctOrgan").val());
	// pageReqeust.departmentName="null";
	pageReqeust.startTime = encodeURI($("#startTime").val());
	pageReqeust.endTime = encodeURI($("#endTime").val());
	// pageReqeust.qualityPlanID="1";
	return pageReqeust;
}

var index = new Array(100);
var ID;
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
						onClickRow : onClickRow,
						url : 'traceabilityController/getTraceabilityWithPaging.do',// 服务器数据的加载地址
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
								}, {
									title : 'ID',
									field : 'traceabilityID',
									visible : false,
									colspan : 1,
									rowspan : 2,
								}, {
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
									valign : 'middle',
									width : '5',
									colspan : 1,
									rowspan : 2
								}, {
									title : '仪器编号',
									field : 'equipmentCode',
									align : 'center',
									valign : 'middle',
									width : '5',
									colspan : 1,
									rowspan : 2
								}, {
									title : '规格型号',
									field : 'model',
									align : 'center',
									valign : 'middle',
									width : '5',
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
									formatter : function(value, row, index) {
										var content = "";
										if (value == "0") {
											content = "未审核";
										} else if (value == "1") {
											content = "审核通过";
										} else if (value == "2") {
											content = "审核不通过";
										}
										return content;
									}
								}, ],
								[ {
									title : '量值名称&nbsp;|&nbsp;测量范围',
									field : 'Name1',
									colspan : 1,
									rowspan : 1,
									formatter : function(value, row, index) {

										var content = "";
										/*
										 * $.ajax({ url :
										 * 'calibrationValueController/getCalibrationValuesByCondition.do',
										 * data :
										 * {tracebilityID:row.traceabilityID},
										 * success : function(e) { var myobj =
										 * eval(e); for(var i =0;i<myobj.length;i++){
										 * content += "<tr><td ondblclick='doubleclick(this)'>"+myobj[i].Name+"</td>"+ "<td ondblclick='doubleclick(this)'>"+myobj[i].Value+"</td>"+ "<td class='deletelogo' style='display:inline-block;width:11px;border-left:none;display:none;'>"+ "<span
										 * class='glyphicon glyphicon-remove'
										 * onclick='deletetd(this,"+index+")'></span></td></tr>"; } }
										 * });
										 */
										for (var i = 0; i < value.length; i++) {
											if ((value[i].Value == undefined)
													&& (value[i].Name == undefined)) {

												/*
												 * content += "<tr><td ondblclick='doubleclick(this)'>"+""+"</td>"+ "<td ondblclick='doubleclick(this)'>"+""+"</td>"+ "<td class='deletelogo' style='display:inline-block;width:11px;border-left:none;display:none;'>"+ "<span
												 * class='glyphicon
												 * glyphicon-remove'
												 * onclick='deletetd(this,"+index+")'></span></td></tr>";
												 */
												break;
											} else {
												content += "<tr><td ondblclick='doubleclick(this)'>"
														+ value[i].Name
														+ "</td>"
														+ "<td ondblclick='doubleclick(this)'>"
														+ value[i].Value
														+ "</td>"
														+ "<td class='deletelogo' style='display:inline-block;width:11px;border-left:none;display:none;'>"
														+ "<span class='glyphicon glyphicon-remove' onclick='deletetd(this,"
														+ index
														+ ")'></span></td></tr>";
											}

										}
										var div = "<table id=Ntable"
												+ index
												+ " class='Ntable' style='display:block;overflow:auto;height:45px'>"
												+ content + "</table>";
										var button1 = '<button style="background-color:#31b0d5;color:#FFF" class="mybtnstyle btn btn-sm glyphicon glyphicon-plus"  onclick="addNameAndRange(this,'
												+ index + ')"></button>';
										var button2 = '<button style="background-color:#31b0d5;color:#FFF" class="mybtnstyle btn btn-sm glyphicon glyphicon-minus"  onclick="delNameAndRange(this,'
												+ index + ')"></button>';
										return div + button1 + button2;
									}
								} ] ]
					});
}

function onClickRow(row) {
	rowID = row.traceabilityID;
	refreshfile();
}
function addNameAndRange(dom, index) {
	var str = "Ntable" + index;
	var dom2 = $("#" + str);
	var strS = "<tr><td ondblclick='doubleclick(this)'></td>"
			+ "<td ondblclick='dou"
			+ "bleclick(this)'></td><td class='deletelogo' style='display:inline-block;width:11px;border-left:none;display:none;'>"
			+ "<span class='glyphicon glyphicon-remove' onclick='deletetd(this,"
			+ index + ")'></span></td></tr>";
	dom2.append(strS);
}

function delNameAndRange(dom, index) {
	var str = "Ntable" + index;
	var length = $("#" + str).find("span").length;
	if (logojuge == 1) {
		for (var i = 0; i < length; i++) {
			$("#" + str).find("span").eq(i).css("display", "block");
		}
		logojuge = 0;
	} else {
		for (var i = 0; i < length; i++) {
			$("#" + str).find("span").eq(i).css("display", "none");
		}
		logojuge = 1;
	}
}

function deletetd(dom, index) {
	var parentdom = dom.parentNode;
	for (var i = 0;; i++) {
		if (parentdom.nodeName != "TR") {
			parentdom = parentdom.parentNode;
		} else {
			parentdom.remove();
			break;
		}
	}
}

function add() {
	$.ajax({
		datatype : 'json',
		url : 'traceabilityController/createTracebilityID.do',
		success : function(data) {
			var e = eval(data);
			obj.traceabilityID = e;
			addrow();
			$("#AddSubmit").css("display", "block");
		}
	});
}

function changvalue(dom, value) {
	dom.parentNode.innerHTML = value;

}

function doubleclick(dom) {
	var value = dom.innerHTML;
	dom.innerHTML = "<input class='tabletext' type='text' onblur='changvalue(this,this.value)' onkeydown='return disableEnter(event,this,this.value)'  />";
	var chidinput = dom.childNodes;
	if (value.length < 50) {
		chidinput[0].value = value;
	}
}

function disableEnter(event, dom, value) {
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which
			: event.charCode;
	if (keyCode == 13) {
		var dom2 = dom.parentNode;
		dom2.innerHTML = value;
	}
}

function addrow() {
	var datacount;
	datacount = $('#table').bootstrapTable('getData').length;
	var count = datacount;
	$('#table').bootstrapTable('insertRow', {
		index : 1000,
		row : {
			equipmentName : '',
			Number : ++datacount,
			equipmentCode : '',
			Name1 : '',
			correctOrgan : '',
			departmentName : '',
			period : '',
			model : '',
			nowCorrectYear : '',
			nextCorrectYear : '',
			reason : '',
			auditState : '',
		}
	});
}
function returnbtn(count) {
	var div = "<table id=Ntable"
			+ count
			+ " class='Ntable' style='display:block;overflow:auto;height:45px'></table>";
	var button1 = '<button class="mybtnstyle btn btn-sm btn-primary glyphicon glyphicon-plus"  onclick="addNameAndRange(this,'
			+ count + ')"></button>';
	var button2 = '<button class="mybtnstyle btn btn-sm btn-primary glyphicon glyphicon-minus"  onclick="delNameAndRange(this,'
			+ count + ')"></button>';
	return div + button1 + button2;
}
// 新增提交
function addSubmit() {
	var getdata = $("#table").bootstrapTable('getSelections');
	var dom;
	if (getdata.length == 1) {
		var getdata = $("#table").bootstrapTable('getSelections');
		var dataobj = {};
		dataobj.ID = obj.traceabilityID;
		if (getdata[0].equipmentName != null && getdata[0].equipmentName != "") {
			dataobj.equipmentName = getdata[0].equipmentName;
		} else {
			swal({title:"设备名称不能为空",  type:"warning",});
			return;
		}
		dataobj.equipmentID = getdata[0].equipmentID;
		if (getdata[0].equipmentCode != null && getdata[0].equipmentCode != "") {
			dataobj.equipmentCode = getdata[0].equipmentCode;
		} else {
			swal({title:"仪器编号不能为空",  type:"warning",});
			return;
		}
		if (getdata[0].model != null && getdata[0].model != "") {
			dataobj.model = getdata[0].model;
		} else {
			swal({title:"规格型号不能为空",  type:"warning",});
			return;
		}
		if (getdata[0].correctOrgan != null && getdata[0].correctOrgan != "") {
			dataobj.correctOrgan = getdata[0].correctOrgan;
		} else {
			swal({title:"校验服务机构不能为空",  type:"warning",});
			return;
		}
		dataobj.departmentName = getdata[0].departmentName;
		if (getdata[0].period != null && getdata[0].period != "") {
			dataobj.period = getdata[0].period;
		} else {
			swal({title:"本次校验周期不能为空",  type:"warning",});
			return;
		}
		if (getdata[0].nowCorrectYear != null
				&& getdata[0].nowCorrectYear != "") {
			dataobj.nowCorrectYear = getdata[0].nowCorrectYear;
		} else {
			swal({title:"本年度校验时间不能为空",  type:"warning",});
			return;
		}
		if (getdata[0].nextCorrectYear != null
				&& getdata[0].nextCorrectYear != "") {
			dataobj.nextCorrectYear = getdata[0].nextCorrectYear;
		} else {
			swal({title:"下次校验时间不能为空",  type:"warning",});
			return;
		}
		dataobj.reason = getdata[0].reason;
		dataobj.auditState = getdata[0].auditState;
		dataobj.correctOrgan = encodeURI(dataobj.correctOrgan);
		dataobj.period = encodeURI(dataobj.period);
		$.ajax({
			url : 'traceabilityController/saveTracebility.do',
			data : dataobj,
			success : function(e) {
				swal({title:"新增成功",  type:"success",});
				$("#AddSubmit").hide();
			}
		});
		var trlength = $('#table').find("tr").length;
		for (var i = 0; i < trlength; i++) {
			if ($('#table').find("tr").eq(i).attr("class") == "selected") {
				dom = $('#table').find("tr").eq(i).find("table").eq(0);
			}
		}
		var length = dom.find("tr").length;
		var myArray = new Array(length);
		for (var i = 0; i < length; i++) {
			myArray[i] = {
				Name : dom.find("tr").eq(i).find("td").eq(0).html(),
				Value : dom.find("tr").eq(i).find("td").eq(1).html(),
			}
		}

		for (var i = 0; i < length; i++) {

		}
		for (var i = 0; i < length; i++) {
			$.ajax({
				url : 'calibrationValueController/saveCalibrationValue.do',
				data : {
					Name : myArray[i].Name,
					Value : myArray[i].Value,
					traceabilityID : obj.traceabilityID,
				},
				success : function(e) {
					$("#AddSubmit").hide();
				}
			});
		}

	}

}

function get_dom(str) {
	var dom = $("#" + str);
	return dom;
}
// 修改
function Updatesubmit() {
	var getdata = $("#table").bootstrapTable('getSelections');
	var dom;
	if (getdata.length == 1) {
		var trlength = $('#table').find("tr").length;
		for (var i = 0; i < trlength; i++) {
			if ($('#table').find("tr").eq(i).attr("class") == "selected") {
				dom = $('#table').find("tr").eq(i).find("table").eq(0);
			}
		}
		var length = dom.find("tr").length;
		var myArray = new Array(length);
		for (var i = 0; i < length; i++) {
			myArray[i] = {
				Name : dom.find("tr").eq(i).find("td").eq(0).html(),
				Value : dom.find("tr").eq(i).find("td").eq(1).html(),
			}
		}

		$
				.ajax({
					url : 'calibrationValueController/deleteCalibrationValueByCondition.do',
					data : {
						traceabilityID : getdata[0].traceabilityID,
					},
					success : function(e) {
						for (var i = 0; i < length; i++) {
							$
									.ajax({
										url : 'calibrationValueController/saveCalibrationValue.do',
										data : {
											Name : myArray[i].Name,
											Value : myArray[i].Value,
											traceabilityID : getdata[0].traceabilityID,
										},
										success : function(e) {
											var dataobj = {};
											dataobj.equipmentName = getdata[0].equipmentName;
											dataobj.equipmentID = getdata[0].equipmentID;
											dataobj.equipmentCode = getdata[0].equipmentCode;
											dataobj.model = getdata[0].model;
											dataobj.correctOrgan = encodeURI(getdata[0].correctOrgan);
											dataobj.departmentName = getdata[0].departmentName;
											dataobj.period = encodeURI(getdata[0].period);
											dataobj.nowCorrectYear = getdata[0].nowCorrectYear;
											dataobj.nextCorrectYear = getdata[0].nextCorrectYear;
											dataobj.reason = getdata[0].reason;
											dataobj.auditState = getdata[0].auditState;
											dataobj.ID = getdata[0].traceabilityID;
											$
													.ajax({
														url : 'traceabilityController/updateTracebilityByID.do',
														data : dataobj,
														success : function(e) {
															swal({title:"修改成功",  type:"success",});
														}
													});
										},
									});
							// }
						}
					}
				})
	}

}
// 页面加载
window.onload = function() {
	inti();
	intiFileTable();
	uploadFile();
}

function getobject(dom, value, type) {
	dom.parentNode.innerHTML = value;
	switch (type) {
	case "correctOrgan":
		if (object.correctOrgan == value) {
			sbtjude = sbtjude;
		} else {
			object.correctOrgan = value;
			sbtjude = 1;
		}
		;
		break;
	case "period":
		if (object.period == value) {
			sbtjude = sbtjude;
		} else {
			object.period = value;
			sbtjude = 1;
		}
		;
		break;
	case "nextCorrectYear":
		if (object.nextCorrectYear == value) {
			sbtjude = sbtjude;
		} else {
			object.nextCorrectYear = value;
			sbtjude = 1;
		}
		;
		break;
	case "nowCorrectYear":
		if (object.nowCorrectYear == value) {
			sbtjude = sbtjude;
		} else {
			object.nowCorrectYear = value;
			sbtjude = 1;
		}
		;
		break;
	case "reason":
		if (object.reason == value) {
			sbtjude = sbtjude;
		} else {
			object.reason = value;
			sbtjude = 1;
		}
		;
		break;
	case "auditState":
		if (object.auditState == value) {
			sbtjude = sbtjude;
		} else {
			object.auditState = value;
			sbtjude = 1;
		}
		;
		break;
	}
}
function getfiled(str) {
	var result = "";
	switch (str) {
	case "number":
		result = "equipmentName";
		break;
	case "equipmentName":
		result = "equipmentName";
		break;
	case "equipmentCode":
		result = "equipmentCode";
		break;
	case "nowCorrectYear":
		result = "nowCorrectYear";
		break;
	case "nextCorrectYear":
		result = "nextCorrectYear";
		break;
	case "departmentName":
		result = "departmentName";
		break;
	case "period":
		result = "period";
		break;
	case "model":
		result = "model";
		break;
	case "Name1":
		result = "Name1";
		break;
	case "Range1":
		result = "Range1";
		break;
	case "correctOrgan":
		result = "correctOrgan";
		break;
	}
	return result;
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
	if (receive == "equipmentName" || receive == "equipmentCode"
			|| receive == "nowCorrectYear" || receive == "nextCorrectYear"
			|| receive == "period" || receive == "correctOrgan"
			|| receive == "model" || receive == "Name1" || receive == "Range1") {
		pubtype = receive;
		switch (receive) {
		case "equipmentName":
			if (viscount == 0)
				getvalue = row.equipmentName;
			if (viscount == 1) {
				getvalue = visture;
			}
			$element[0].innerHTML = "";
			$element[0].innerHTML = "<div class=''>"
					+ "<button class='btn btn-default dropdown-toggle' type='button' id='dropdowmlist' data-toggle='dropdown'>"
					+ getvalue
					+ "<span class='caret'></span></button>"
					+ "<ul id='listdata' class='dropdown-menu ' role='menu' aria-labelledby='dropdownMenu1'>"
					+ "</ul></div>";

			$
					.ajax({
						url : 'equipmentController/getEquipments.do',
						success : function(data) {
							var myobj = eval("(" + data + ")");
							var myobje = myobj.equipements;
							var listdata = $('#listdata');
							for (var i = 0; i < myobje.length; i++) {
								mydata[i] = myobje[i].equipmentName;// 设备名称
								mydataID[i] = myobje[i].equipmentID;// 设备ID
								var rstring = "<li role='presentation' onclick='getParentbutton(this,"
										+ "mydata["
										+ i
										+ "]"
										+ ","
										+ "mydataID["
										+ i
										+ "]"
										+ ")' "
										+ ">"
										+ mydata[i] + "</li>";
								listdata.append(rstring);
							}
						}
					});
			;
			break;
		case "equipmentCode":
			if (viscount2 == 0)
				getvalue = row.equipmentCode;
			if (viscount2 == 1)
				getvalue = visture2;
			$element[0].innerHTML = "";
			$element[0].innerHTML = "<div class=''>"
					+ "<button class='btn btn-default dropdown-toggle' type='button' id='dropdowmlist' data-toggle='dropdown'>"
					+ getvalue
					+ "<span class='caret'></span></button>"
					+ "<ul id='listdata1' class='dropdown-menu ' role='menu' aria-labelledby='dropdownMenu1'>"
					+ "</ul></div>";
			var equipmentID = encodeURI(object.equipmentID, "UTF-8");
			$
					.ajax({
						data : {
							equipmentID : equipmentID
						},
						url : 'equipmentController/getEquipmentsByID.do',
						success : function(data) {
							var myobj = eval("(" + data + ")");
							var myobje = myobj.equipements;
							var listdata = $('#listdata1');
							mydataID1.splice(0, mydataID1.length);
							mydata1.splice(0, mydata1);
							for (var i = 0; i < myobje.length; i++) {
								mydata1[i] = myobje[i].equipmentCode;
								mydataID1[i] = myobje[i].equipmentID;
								var rstring = "<li role='presentation' onclick='getParentbutton2(this,"
										+ "mydata1["
										+ i
										+ "]"
										+ ","
										+ "mydataID1["
										+ i
										+ "]"
										+ ")'>"
										+ mydata1[i] + "</li>";
								listdata.append(rstring);
							}
						}
					});
			;
			break;
		case "nowCorrectYear":
			getvalue = row.nowCorrectYear;
			$element[0].innerHTML = "<input class='form_datetime' onblur='getobject(this,this.value,"
					+ "pubtype"
					+ ")' type='date' class='form-control' value='"
					+ getvalue + "'>";
			;
			break;
		case "nextCorrectYear":
			getvalue = row.nextCorrectYear;
			$element[0].innerHTML = "<input class='form_datetime' onblur='getobject(this,this.value,"
					+ "pubtype"
					+ ")' type='date' class='form-control' value='"
					+ getvalue + "'>";
			;
			break;
			
		case "period":
			getvalue = row.period;
			$element[0].innerHTML = "<input onblur='getobject(this,this.value,"
					+ "pubtype" + ")' type='text' class='form-control' value='"
					+ getvalue + "'>";
			;
			break;
		case "correctOrgan":
			getvalue = row.correctOrgan;
			$element[0].innerHTML = "<input onblur='getobject(this,this.value,"
					+ "pubtype" + ")' type='text' class='form-control' value='"
					+ getvalue + "'>";
			break;
			
		case "Name1":
			getvalue = row.Name1;
			break;
			
		case "model":
			if (viscount1 == 0)
				getvalue = row.model;
			if (getvalue == undefined) {
				getvalue = "";
			}
			if (viscount1 == 1)
				getvalue = visture1;
			$element[0].innerHTML = "<div class=''>"
					+ "<button class='btn btn-default dropdown-toggle' type='button' id='dropdowmlist' data-toggle='dropdown'>"
					+ getvalue
					+ "<span class='caret'></span></button>"
					+ "<ul id='listdata2' class='dropdown-menu ' role='menu' aria-labelledby='dropdownMenu1'>"
					+ "</ul></div>";
			var equipmentID = encodeURI(object.equipmentID, "UTF-8");
			$
					.ajax({
						data : {
							equipmentID : equipmentID
						},
						url : 'equipmentController/getEquipmentsByID.do',
						success : function(data) {
							var myobj = eval("(" + data + ")");
							var myobje = myobj.equipements;
							var listdata = $('#listdata2');
							mydataID2.splice(0, mydataID2.length);
							mydata2.splice(0, mydata2.length);
							for (var i = 0; i < myobje.length; i++) {
								mydata2[i] = myobje[i].model;
								mydataID2[i] = myobje[i].equipmentID;
								var rstring = "<li role='presentation' onclick='getParentbutton1(this,"
										+ "mydata2["
										+ i
										+ "]"
										+ ","
										+ "mydataID2["
										+ i
										+ "]"
										+ ")'>"
										+ mydata2[i] + "</li>";
								listdata.append(rstring);
							}
						}
					});
			;
			break;
		}
	};
}
// 获取点击后的值
function getParentbutton(dom, value, ID) {
	var parentdom = dom.parentNode;
	for (var i = 0;; i++) {
		if (parentdom.nodeName == "TD") {
			parentdom.innerHTML = value;
			object.equipmentID = ID;
			object.equipmentName = value;
			sbtjude = 1;
			viscount = 1;
			judg = 1;
			break;
		} else {
			parentdom = parentdom.parentNode;
		}
	}
}
// 获取点击后的值
function getParentbutton1(dom, value, ID) {
	var parentdom = dom.parentNode;
	for (var i = 0;; i++) {
		if (parentdom.nodeName == "TD") {
			parentdom.innerHTML = value;
			object.equipmentTypeID = ID;
			object.model = value;
			sbtjude = 1;
			viscount1 = 1;
			judg1 = 1;
			break;
		} else {
			parentdom = parentdom.parentNode;
		}
	}
}
// 获取点击后的值
function getParentbutton2(dom, value, ID) {
	var parentdom = dom.parentNode;
	for (var i = 0;; i++) {
		if (parentdom.nodeName == "TD") {
			parentdom.innerHTML = value;
			object.equipmentID = ID;
			object.equipmentCode = value;
			sbtjude = 1;
			viscount2 = 1;
			judg2 = 1;
			break;
		} else {
			parentdom = parentdom.parentNode;
		}
	}
}
// 获取点击后的值
function getParentbutton3(dom, value, ID) {
	var parentdom = dom.parentNode;
	for (var i = 0;; i++) {
		if (parentdom.nodeName == "TD") {
			parentdom.innerHTML = value;
			object.departmentID = ID;
			object.departmentName = value;
			sbtjude = 1;
			viscount3 = 1;
			judg3 = 1;
			break;
		} else {
			parentdom = parentdom.parentNode;
		}
	}
}

function del() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0) {
		swal({title:"请选择至少一条数据",  type:"warning",});
	} else {
		var message = confirm("确定要删除这条建议吗？");
		if (message == true) {
			var ids = "";
			for (var i = 0; i < data.length; i++) {
				ids += data[i].traceabilityID + ",";
			}
			var ajaxParameter = {
				ID : ids.substring(0, (ids.length - 1))
			};
			$.ajax({
				url : 'traceabilityController/deleteTracebilityByID.do',
				data : ajaxParameter,
				success : function(o) {
					if (o <= 0) {
						swal({title:"删除失败",  type:"error",});
					}
					swal({title:"删除成功",  type:"success",});
					refresh();
				}
			});
		} else {
			refresh();
		}

	}
}

function refresh() {
	$('#table').bootstrapTable('refresh', null);
}
function refreshfile() {
	$('#filetable').bootstrapTable('refresh', null);
}

function search() {
	$('#table').bootstrapTable('refresh', queryParams);
}
// 传参
function Params(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	pageReqeust.belongtoID = rowID;
	return pageReqeust;
}

function intiFileTable() {
	$('#filetable')
			.bootstrapTable(
					{
						// height:500,
						striped : true,// 隔行变色效果
						classes : 'table table-hover table-bordered table-condensed',
						clickToSelect : true, // 设置true
						// 将在点击行时，自动选择rediobox 和
						// checkbox
						singleSelect : true,
						pagination : true,// 在表格底部显示分页条
						rownumbers : true,// 行数 .
						pageSize : 10,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 5, 10, 20, 50, 200, 500 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true
						// 将在点击行时，自动选择rediobox 和
						// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortOrder : 'asc',// 定义排序方式
//						url : 'fileOperateController/getFileInfoBybelongtoIDWithPaging.do',
						url : 'timeCheckController/getTimecheckFileWithPaging.do',
						sidePagination : 'server',// 设置在哪里进行分页
						contentType : 'application/json',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : Params,
						queryParamsType : "limit",
						selectItemName : '',// radio or checkbox
						// 的字段名//设置True
						// 将禁止多选
						columns : [
								{
									field : 'ck',
									checkbox : true,
									align : 'center'
								},
								{
							    	field:'ID',
							    	visible:false,
								},
								{
									title : '送检方式',
									field : 'type',
									align : 'center',
									formatter : function(value, row, index) {
										var content = "";
										if (value == "0") {
											content = "自检";
										} else if (value == "1") {
											content = "外检";
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
									visible : false
								},
								{
									title : '上传时间',
									field : 'uploadTime',
									align : 'center',
								},
								{
									title : '操作',
									formatter : function(value, row, index) {
										var submit = '<button style="background-color:#31b0d5;color:#FFF" class="btn glyphicon" onclick="fileDownload()">下载</button>';
										return submit;
									}
								}, {
									title : '备注',
									field : 'remarks',
									align : 'center',
								} ]
					});
}

// 下载文件
function fileDownload() {
	var getdata = $("#filetable").bootstrapTable('getSelections');
	var fileID=getdata[0].ID;
	window.location.href="timeCheckController/filedownload.do?ID="+fileID;
}
// 全部数据
function allData() {
	$('#equipmentName').val("");
	$('#model').val("");
	$("#auditState").val("全部");
	$('#equipmentCode').val("");
	$('#correctOrgan').val("");
	$('#startTime').val("");
	$('#endTime').val("");
	refresh();
}

function typeChange(){
	var filetype = document.getElementById("type").value;
	if(filetype === "自检"){
		fileParam.type = 0;
	}else{
		fileParam.type = 1;
	}
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
	
	typeChange();
}

//上传文件
function uploadFile() {
	$("#files").fileupload({
				autoUpload : true,
				url : 'timeCheckController/upload.do',
				dataType : 'json',
				add : function(e, data) {
					$("#ensure").click(function() {
						fileParam.secondDirectoryName = "核查记录文件";
						data.submit();
					});
				},
			}).bind('fileuploaddone',function(e, data) {
						var fileID = data.result;
						if (fileID != null && fileID != "null" && fileID != "") {
							$("#addModal").modal("hide");
							reload();
						} else {
							swal({title:"上传失败! 网路繁忙",  type:"error",});
						} 
					});

	// 文件上传前触发事件,如果需要额外添加参数可以在这里添加
	$('#files').bind('fileuploadsubmit', function(e, data) {
		data.formData = {
			secondDirectory : fileParam.secondDirectoryName,
			TypeNumber : fileParam.type,
			belongtoID : fileParam.belongtoID,
			remark : fileParam.remarks
		}
	});
}

//判空处理
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

function openModal() {
	if($('#table').bootstrapTable("getSelections").length == 1){
		$("#chooseFile").removeAttr("disabled");
		$("#fileName").html("");
		fileParam.type = 1 ;
		fileParam.remarks = $('#add_TemplateRemarks').val(); // 备注
		fileParam.belongtoID = rowID;
		$("#UploadModal").modal("show");
	}else{
		swal({title:"请选择一条数据",  type:"warning",});
	}
}

//重新加载页面
function reload() {
	window.location.reload();
}