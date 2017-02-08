$(function() {
	init();
});

function init() {

	$(function() {
		$('#table')
				.bootstrapTable(
						{
							striped : true, // 隔行变色效果
							pagination : true,// 在表格底部显示分页条
							pageSize : 10,// 页面数据条数
							pageNumber : 1,// 首页页码
							pageList : [ 3, 5,  9, 10, 200, 500 ],// 设置可供选择的页面数据条数
							clickToSelect : true,// 设置true 将点击时，自动选择rediobox
							// 和 checkbox
							cache : false,// 禁用AJAX数据缓存
							sortName : 'department.ID',
							order : 'asc',
							url : 'departmentController/getDepartmentWithPage.do',
							sidePagination : 'server',
							contentType : 'application/json',
							dataType : 'json',
							offset : 0,
							queryParams : queryParams, // 参数
							queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
							showRefresh : false, // 显示刷新按钮

							columns : [
										{
											checkbox : true,
											width : '3%'// 宽度
										},
										{
											field : '',
											title : '序号',
											width : '3%',
											align : 'center',
											valign : 'middle',
											formatter : function(value, row, index) {
												return index + 1;
											}
										},
										{
											field : 'ID',// 返回值名称
											title : '',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10',// 宽度
											visible : false
										},
										{
											field : 'departmentCode',// 返回值名称
											title : '部门编号',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%',// 宽度
										},
										{
											field : 'departmentName',// 返回值名称
											title : '部门名称',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'employeeName',// 返回值名称
											title : '负责人',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'remarks',// 返回值名称
											title : '部门简介',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '18%'// 宽度
										},
										{
											field : 'createTime',// 返回值名称
											title : '创建时间',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '9%'// 宽度
										},
										{
											field : 'Pdepartment',// 返回值名称
											title : '上级部门',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										} ]
							// 列配置项,详情请查看 列参数 表格
							/* 事件 */
							});
		});
	}
function getdepartment1(){
	$.ajax({
		url:'departmentController/getdatalist.do',
		data:{type:1},
		async:false,
		success:function(e){
			var myobj = eval(e);
			var dom1 = $('#listul2');
			$('#textspan2').html("");
			var str2 = "<li role='presentation' onclick='changevalue2(1,\"\")'>\"\"</li>";
			dom1.append(str2);
			for(var i = 0;i< myobj.length;i++){
				var str = "<li role='presentation' onclick='changevalue2(1,\""+myobj[i].departmentName+"\")'>"+myobj[i].departmentName+"</li>";
				dom1.append(str);
			};
			 refresh();
			
		}
	});
}
function getdepartment(){
	$.ajax({
		url:'departmentController/getdatalist.do',
		data:{type:1},
		success:function(e){
			$("#listul1 ").empty(); 
			var myobj = eval(e);
			var dom1 = $('#listul1');
			
			$('#textspan1').html("");
			var str2 = "<li role='presentation' onclick='changevalue(1,\"\")'>\"\"</li>";
			dom1.append(str2);
			for(var i = 0;i< myobj.length;i++){
				var str = "<li role='presentation' onclick='changevalue(1,\""+myobj[i].departmentName+"\")'>"+myobj[i].departmentName+"</li>";
				dom1.append(str);
			};
			 refresh();
			
		}
	});
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
function addGetEMName(){
	var name = $('#add_responsibleMan').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".employeeN").hide();
	}else {
		var parame = {};
		parame.employeeName = name;
		
		$.ajax({  
		    url:'employeeController/getEmployeeName.do',// 跳转到 action  
		    type:'post',
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var employee,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML    
		    		employee = $(".employeeN");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].employeeName + "' class='" + myobj[i].ID + "'>" + myobj[i].employeeName + "</li></ul>";
		    		}
		    		
		    		employee.show();
		    		employee.empty();
		    		employee.append(htmlElement);
		    		addClick();
			    }
			}
		});
	}
}
function addClick(){ 
	
	
	//给input赋值
	$(".employeeN ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#add_responsibleMan").val(name);
		 var ID =  $(this).attr("class");
		 $('#add_responsibleMan').attr({'name' : "" + ID + ""});
		 $('#add_responsibleMan').attr({'value' : "" + name + ""});
		 $(".employeeN").hide();
	})

	//隐藏提示框
	$("#addContent").click(function(){
		 $(".employeeN").hide();
	})
}


function editGetEMName(){
	var name = $('#edit_employee').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".employeeN").hide();
	}else {
		var parame = {};
		parame.employeeName = name;
		
		$.ajax({  
		    url:'employeeController/getEmployeeName.do',// 跳转到 action  
		    type:'post',
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var employee,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "";//定义HTML    
		    		employee = $(".employeeN");
		    		if(myobj.length > 4){
		    			length = 4;
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<ul><li value='" + myobj[i].employeeName + "' class='" + myobj[i].ID + "'>" + myobj[i].employeeName + "</li></ul>";
		    		}
		    		
		    		employee.show();
		    		employee.empty();
		    		employee.append(htmlElement);
		    		editClick();
			    }
			}
		});
	}
}
function editClick(){ 
	//给input赋值
	$(".employeeN ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_employee").val(name);
		 var ID =  $(this).attr("class");
		 $('#edit_employee').attr({'name' : "" + ID + ""});
		 $('#edit_employee').attr({'value' : "" + name + ""});
		 $(".employeeN").hide();
	})

	//隐藏提示框
	$("#editContent").click(function(){
		 $(".employeeN").hide();
	})
}






/* 刷新方法 */
function refresh() {
	$('#table').bootstrapTable('refresh', null);
}

function queryParams(params) { // 配置参数

	var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的

			limit : params.limit, // 页面大小
			offset : params.offset, // 页码
			sort : params.sort, // 排序列名
			order : params.order
	// 排位命令（desc，asc）
	};
	return temp;
}

/* 全部数据方法 */
function query() {

	init();
	refresh();

}
/* 弹出修改弹框方法 */
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		alert("请选中一条数据");
		return;
	}
	//$("div#only1 .form-control").attr({"disabled":false});
	$('#edit_ID').val(data[0].ID);
	$('#edit_departmentCode').val(data[0].departmentCode);
	$('#edit_departmentName').val(data[0].departmentName);
	$('#edit_remarks').val(data[0].remarks);
	$('#edit_employee').val(data[0].employeeName);
	$('#textspan2').text(data[0].Pdepartment);
	
	$('#editModal').modal('show');
}
function edit(){
	var parame = {};
	parame.ID=$('#edit_ID').val();
	parame.departmentName = $('#edit_departmentName').val();
	parame.departmentCode = $('#edit_departmentCode').val();
	parame.remarks = $('#edit_remarks').val();
	parame.employeeID = $('#edit_employee').attr('name');
	parame.parent = $('#textspan2').text();
	if($('#edit_departmentName').val()!=$('#textspan2').text()){
	if($('#edit_departmentName').val()!=""&&$('#edit_departmentCode').val()!=""){
	$.ajax({	
		  url:'departmentController/updDepartment.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("修改失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
			  departrefresh();
		  }
		});	
	}else alert("请把信息修改完整");
	}else alert("不能把自己作为上级部门");
}
function find(){
	var parame = {};
	parame.departmentCode = $('#linkdepartmentCode').val();
	parame.departmentName = $('#linkdepartmentName').val();
	parame.employeeName = $('#linkemployeeID').val();
	
	$('#table').bootstrapTable('refresh', {
		silent:true,
		url:"departmentController/getDepartmentWithPage.do",
		query:parame
	});
}
function departrefresh(){
	 $.ajax({
			type : 'POST',
			url : 'departmentController/getTree.do',
			success : function(value) {

				var trees = JSON.parse(value);
				$('#tree').treeview({
					data : trees,
					showIcon : true,
					levels : 5,
				});
			},
			dataType : 'text'
		});
}

/* 新增方法 */
function add(){
	var parame = {};
	parame.departmentName = $('#add_departmentName').val();
	parame.departmentCode = $('#add_departmentCode').val();
	parame.remarks = $('#add_remarks').val();
	parame.employeeID =  $('#add_responsibleMan').attr('name');
	parame.parent = $('#textspan1').text();
	if($('#add_departmentName').val()!=""&&$('#add_departmentCode').val()!=""){
	$('#add_remarks').val("");
	$('#textspan1').text("");
	alert($('#add_employeeID').val());
	$("input").val("");
	$.ajax({
	  url:'departmentController/addDepartment.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  alert("新增失败");
		  }
		  $('#addModal').modal('hide');
		  refresh();
		  departrefresh();
	  }
	});
	}else alert("请把信息填完");
}
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0){
		alert("请至少选中一条数据");
		return;
	}
	
	var ids = "";
	for(var i=0; i<data.length; i++){
		ids += data[i].ID + ",";
	}
	
	var ajaxParameter = {
			IDs:ids.substring(0, (ids.length-1))
	};
	
	$.ajax({
	  url:'departmentController/delDepartment.do',
	  data:ajaxParameter,
	  success:function(o){
		  if(o<=0){
			  alert("删除失败");
		  }
		  refresh();
		  departrefresh();
	  }
	});
}


