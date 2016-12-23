$(function () {
	$('#table').bootstrapTable({
		/*height: 400,//定义表格的高度
*/		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 5,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'sampleRecord.ID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'sampleRecordController/getSampleRecordWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			width:'5%'//宽度
		},{
			field:'ID',//返回值名称
			title:'ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0%',//宽度
			visible:false
		},{
			field:'sampleID',//返回值名称
			title:'sampleID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'getManID',//返回值名称
			title:'getManID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'returnManID',//返回值名称
			title:'returnManID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'0',//宽度
			visible:false
		},{
			field:'factoryCode',//返回值名称
			title:'出厂编码',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'sampleName',//返回值名称
			title:'样品名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'specifications',//返回值名称
			title:'型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'state',//返回值名称
			title:'领样状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
		},{
			field:'getMan',//返回值名称
			title:'领样人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'getTime',//返回值名称
			title:'领样时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'17%'//宽度
		}
		,{
			field:'returnMan',//返回值名称
			title:'还样人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		}
		,{
			field:'returnTime',//返回值名称
			title:'还样时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'17%'//宽度
		},{
			field:'remarks',//返回值名称
			title:'备注',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		}
		]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

/* 刷新方法 */
function refresh(){
	$('#table').bootstrapTable('refresh', null);
}


//领样人选取
	$(document).on("click", "#addOver", function(event) {
		event.stopPropagation();
		$(".over").css("display", "none");
		$(".over").css("width", "0");
		$(".over").css("height", "0");
		$("#add_getMan1").val("");

	});
	
	$(document).on("click", ".chooseInput", function(event) {
	
		event.stopPropagation();
	
		
	});
	$(document).on("click", ".fontStyle", function(event) {
		event.stopPropagation();
		console.log($(this).text());
		$("#add_getMan1").val($(this).text());
		$("#add_getMan").val($(this).prev().val());
	
		// this == event.target
		$(event.target).prev().click();
		$(".overChoose").hide();
		
		
	});
	/*
	 * $(document).on("click",".choose .row .col-xs-12",function(event){
	 * $(this).children("input.chooseInput").click(); event.stopPropagation();
	 * });
	 */
	$(".choose  .row  .col-xs-12").click(function(event) {
		$(this).children("input.chooseInput").click();
		event.stopPropagation();
	});

	// 检测项目的选取
	$("#add_getMan1").focus(function(event) {
		var testNamevalue = $("#add_getMan").val();
		var data = getdataLisk(); // 获取检测项目列表
		var htmlP = "";
		if (data != false) {
			htmlP = playTestProjectHtml(data, testNamevalue, "add");// 拼装项目列表html
			$("#addOver .overChoose .choose .row ").empty(); // 清空子元素
			$("#addOver .overChoose .choose .row ").html(htmlP);
		}
		// 显示第二层遮罩
		$(".overChoose").css("display", "block");
		$(".over").css("display", "block");
		var docWidth = $("#addTaskModal .modal-dialog").width();
		var docHeight = $("#addTaskModal .modal-dialog").height();
		$(".over").css("width", docWidth);
		$(".over").css("height", docHeight);

	});
	
	
	
	//退样人选取
	$(document).on("click", "#addOver", function(event) {
		event.stopPropagation();
		$(".over").css("display", "none");
		$(".over").css("width", "0");
		$(".over").css("height", "0");
		$("#add_returnMan").val("");

	});
	
	$(document).on("click", ".chooseInput", function(event) {
	
		event.stopPropagation();
	
		
	});
	$(document).on("click", ".fontStyle1", function(event) {
		event.stopPropagation();
		$("#add_returnMan1").val($(this).text());
		$("#add_returnMan").val($(this).prev().val());
	
		// this == event.target
		$(event.target).prev().click();
		$(".overChoose").hide();
		
		
	});
	/*
	 * $(document).on("click",".choose .row .col-xs-12",function(event){
	 * $(this).children("input.chooseInput").click(); event.stopPropagation();
	 * });
	 */
	$(".choose  .row  .col-xs-12").click(function(event) {
		$(this).children("input.chooseInput").click();
		event.stopPropagation();
	});

	// 检测项目的选取
	$("#add_returnMan1").focus(function(event) {
		var testNamevalue = $("#add_returnMan").val();
		var data = getdataLisk(); // 获取检测项目列表
		var htmlP = "";
		if (data != false) {
			htmlP = playTestProjectHtml1(data, testNamevalue, "add");// 拼装项目列表html
			$("#addOver .overChoose .choose .row ").empty(); // 清空子元素
			$("#addOver .overChoose .choose .row ").html(htmlP);
		}
		// 显示第二层遮罩
		$(".overChoose").css("display", "block");
		$(".over").css("display", "block");
		var docWidth = $("#addTaskModal .modal-dialog").width();
		var docHeight = $("#addTaskModal .modal-dialog").height();
		$(".over").css("width", docWidth);
		$(".over").css("height", docHeight);

	});
	//修改领样人
	$(document).on("click", "#addOver", function(event) {
		event.stopPropagation();
		$(".over").css("display", "none");
		$(".over").css("width", "0");
		$(".over").css("height", "0");
		$("#edit_getMan").val("");

	});
	
	$(document).on("click", ".chooseInput", function(event) {
	
		event.stopPropagation();
	
		
	});
	
	$(document).on("click", ".fontStyle1", function(event) {
		event.stopPropagation();
		$("#edit_getMan1").val($(this).text());
		$("#edit_getMan").val($(this).prev().val());
	
		// this == event.target
		$(event.target).prev().click();
		$(".overChoose").hide();
		
		
	});
	/*
	 * $(document).on("click",".choose .row .col-xs-12",function(event){
	 * $(this).children("input.chooseInput").click(); event.stopPropagation();
	 * });
	 */
	$(".choose  .row  .col-xs-12").click(function(event) {
		$(this).children("input.chooseInput").click();
		event.stopPropagation();
	});

	// 检测项目的选取
	$("#edit_getMan1").focus(function(event) {
		var testNamevalue = $("#edit_getMan").val();
		var data = getdataLisk(); // 获取检测项目列表
		var htmlP = "";
		if (data != false) {
			htmlP = playTestProjectHtml1(data, testNamevalue, "add");// 拼装项目列表html
			$("#addOver .overChoose .choose .row ").empty(); // 清空子元素
			$("#addOver .overChoose .choose .row ").html(htmlP);
		}
		// 显示第二层遮罩
		$(".overChoose").css("display", "block");
		$(".over").css("display", "block");
		var docWidth = $("#addTaskModal .modal-dialog").width();
		var docHeight = $("#addTaskModal .modal-dialog").height();
		$(".over").css("width", docWidth);
		$(".over").css("height", docHeight);

	});
	//修改退样人
	$(document).on("click", "#addOver", function(event) {
		event.stopPropagation();
		$(".over").css("display", "none");
		$(".over").css("width", "0");
		$(".over").css("height", "0");
		//$("#edit_returnMan").val("");

	});
	
	$(document).on("click", ".chooseInput", function(event) {
	
		event.stopPropagation();
	
		
	});
	$(document).on("click", ".fontStyle", function(event) {
		event.stopPropagation();
		$("#edit_returnMan1").val($(this).text());
		$("#edit_returnMan").val($(this).prev().val());
	
		// this == event.target
		$(event.target).prev().click();
		$(".overChoose").hide();
		
		
	});
	/*
	 * $(document).on("click",".choose .row .col-xs-12",function(event){
	 * $(this).children("input.chooseInput").click(); event.stopPropagation();
	 * });
	 */
	$(".choose  .row  .col-xs-12").click(function(event) {
		$(this).children("input.chooseInput").click();
		event.stopPropagation();
	});

	// 检测项目的选取
	$("#edit_returnMan1").focus(function(event) {
		var testNamevalue = $("#edit_returnMan").val();
		var data = getdataLisk(); // 获取检测项目列表
		var htmlP = "";
		if (data != false) {
			htmlP = playTestProjectHtml(data, testNamevalue, "add");// 拼装项目列表html
			$("#addOver .overChoose .choose .row ").empty(); // 清空子元素
			$("#addOver .overChoose .choose .row ").html(htmlP);
		}
		// 显示第二层遮罩
		$(".overChoose").css("display", "block");
		$(".over").css("display", "block");
		var docWidth = $("#addTaskModal .modal-dialog").width();
		var docHeight = $("#addTaskModal .modal-dialog").height();
		$(".over").css("width", docWidth);
		$(".over").css("height", docHeight);

	});
	
	$(document).click(function(){
	    $(".overChoose").hide();

	});
	$("#add_getMan1").click(function(event){
	    event.stopPropagation();

	});
	$("#add_returnMan1").click(function(event){
	    event.stopPropagation();

	});
	$("#edit_getMan1").click(function(event){
	    event.stopPropagation();

	});
	$("#edit_returnMan1").click(function(event){
	    event.stopPropagation();

	});
	
	
	


	
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
	

function playTestProjectHtml(data, testNamevalue, isAdd) {

	var html = "";
	var checkName = "";
	
	for (var i = 0; i < data.length; i++) {
		html += "<div class='col-xs-12  col-md-12' style='text-align:center' >";
		if (isContains(testNamevalue, data[i].employeeName))
			html += '<input type="hidden"  checked="chenked" value="'
					+ data[i].ID + '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle">'
					+ data[i].employeeName + '</label></div>';
		else
			html += '<input type="hidden"   value="' + data[i].ID
					+ '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle" >'
					+ data[i].employeeName + '</label></div>';
	}
	return html;
}
function playTestProjectHtml1(data, testNamevalue, isAdd) {

	var html = "";
	var checkName = "";
	
	for (var i = 0; i < data.length; i++) {
		html += "<div class='col-xs-12  col-md-12' style='text-align:center' >";
		if (isContains(testNamevalue, data[i].employeeName))
			html += '<input type="hidden"  checked="chenked" value="'
					+ data[i].ID + '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle1">'
					+ data[i].testName + '</label></div>';
		else
			html += '<input type="hidden"   value="' + data[i].ID
					+ '" name="' + checkName + '"'
					+ 'class="chooseInput" ><label class="fontStyle1" >'
					+ data[i].employeeName + '</label></div>';
	}
	return html;
}
function getdataLisk() {
	var data;
	$.ajax({
		url:'sampleRecordController/getdatalist.do',
		dataType : "json",
		async : false,
		data : {},
		success : function(o) {
			data =o;
		},
		error : function() {
			return false;
		}
	});
	return data;
}



/* 新增方法 */
function add(){
	
	
	
	var parame = {};
	parame.factoryCode = $('#add_factoryCode').val();
	parame.sampleName = $('#add_sampleName').val();
	parame.specifications = $('#add_specifications').val();
	parame.getMan = $('#add_getMan').val();
	parame.getTime = $('#add_getTime').val();
	parame.returnMan = $('#add_returnMan').val();
	parame.returnTime = $('#add_returnTime').val();
	parame.remarks = $('#add_remarks').val();
	$("input").val("");
	$.ajax({
	  url:'sampleRecordController/addSampleRecord.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  alert("新增失败");
		  }
		  $('#addModal').modal('hide');
		  refresh();
	  }
	});
}
/* 查找方法 */
function find(){
	var parame = {};
	parame.factoryCode = $('#linkfactoryCode').val();
	parame.sampleName = $('#linksampleName').val();
	parame.specifications = $('#linkspecifications').val();
	parame.getMan = $('#linkgetMan').val();
	

	
	$('#table').bootstrapTable('refresh', {
		silent:true,
		url:"sampleRecordController/getSampleRecordWithPaging.do",
		query:parame
	});
}
function lookData(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}


   
	$('#look_ID').val(data[0].ID);
	$('#look_sampleInformationID').val(data[0].sampleInformationID);
	$('#look_factoryCode').val(data[0].factoryCode);
	$('#look_sampleName').val(data[0].sampleName);
	$('#look_specifications').val(data[0].specifications);
	$('#look_getMan').val(data[0].getMan);
	$('#look_getTime').val(data[0].getTime);
	$('#look_returnMan').val(data[0].returnMan);
	$('#look_returnTime').val(data[0].returnTime);
	$('#look_remarks').val(data[0].remarks);

	$('#lookModal input').attr("disabled", "disabled");
	$('#lookModal').modal('show');
}


/* 弹出修改弹框方法 */
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	$("div#only1 .form-control").attr({"disabled":false});
	$('#edit_ID').val(data[0].ID);
	$('#edit_sampleID').val(data[0].sampleID);
	$('#edit_factoryCode').val(data[0].factoryCode);
	$('#edit_sampleName').val(data[0].sampleName);
	$('#edit_specifications').val(data[0].specifications);
	$('#edit_getMan').val(data[0].getManID);
	$('#edit_getMan1').val(data[0].getMan);
	$('#edit_getTime').val(data[0].getTime);
	$('#edit_returnMan1').val(data[0].returnMan);
	$('#edit_returnMan').val(data[0].returnManID);
	$('#edit_returnTime').val(data[0].returnTime);
	$('#edit_remarks').val(data[0].remarks);
	$('#editModal').modal('show');
}

$("#edit_factoryCode").change(function upperCase(factoryCode){
	$('#edit_sampleName').val("");
	$('#edit_specifications').val("");
	if($("#edit_factoryCode").val()!=""&&$("#edit_factoryCode").val()!=null){
	var parame = {};
	parame.factoryCode=$('#edit_factoryCode').val();
	$.ajax({	
		  url:'sampleRecordController/getSample.do',
		  data:parame,
		  dataType:"json",
		  success:function(result){
			  alert("666666666");
			$('#edit_sampleName').val(result.sampleName);
			$('#edit_specifications').val(result.specifications);

			  },
			error:function(result){
					alert("没这个样品");
				}
		});	
	}
	if($("#edit_factoryCode").val()==""&&$("#edit_factoryCode").val()==null){
		$('#edit_sampleName').val("");
		$('#edit_specifications').val("");
	}
	
	

});
$("#add_factoryCode").change(function upperCase(factoryCode){
	$('#add_sampleName').val("");
	$('#add_specifications').val("");
	if($("#add_factoryCode").val()!=""&&$("#add_factoryCode").val()!=null){
	var parame = {};
	parame.factoryCode=$('#add_factoryCode').val();
	$.ajax({	
		  url:'sampleRecordController/getSample.do',
		  data:parame,
		  dataType:"json",
		  success:function(result){
			$('#add_sampleName').val(result.sampleName);
			$('#add_specifications').val(result.specifications);
		},
		error:function(result){
			alert("没这个样品");
		}
	
		});	
	
	}
	if($("#add_factoryCode").val()==""&&$("#add_factoryCode").val()==null){
		$('#add_sampleName').val("");
		$('#add_specifications').val("");
	}
	

});

function upperCase(factoryCode)
{
var y=document.getElementById(factoryCode).value;
document.getElementById(factoryCode).value=y.toUpperCase();
}


/* 修改方法 */
function edit(){

	var parame = {};
	parame.ID = $('#edit_ID').val();
	parame.sampleID = $('#edit_sampleID').val();
	parame.factoryCode = $('#edit_factoryCode').val();
	parame.sampleName = $('#edit_sampleName').val();
	parame.specifications = $('#edit_specifications').val();
	parame.getManID = $('#edit_getMan').val();
	parame.getTime = $('#edit_getTime').val();
	parame.returnManID = $('#edit_returnMan').val();
	parame.returnTime = $('#edit_returnTime').val();
	parame.remarks = $('#edit_remarks').val();
	
	
	$.ajax({	
	  url:'sampleRecordController/updSampleRecord.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  alert("修改失败");
		  }
		  $('#editModal').modal('hide');
		  refresh();
	  }
	});	
}