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
			title:'操作人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'getTime',//返回值名称
			title:'时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'17%'//宽度
		}
		,{
			field:'Type',//返回值名称
			title:'类别',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
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
function addGetfactoryCode(){
	var name = $('#add_factoryCode').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".employeeN3").hide();
	}else {
		var parame = {};
		parame.employeeName = name;
		$.post("sampleRecordController/getFactoryCode.do",{
			factoryCode : name
		},function(data){
			if (data) { 
	    		var employee,length;
	    		var myobj = JSON.parse(data);
	    		var htmlElement = "";//定义HTML    
	    		employee = $(".employeeN3");
	    		if(myobj.length > 4){
	    			length = 4;
	    		}else{
	    			length = myobj.length;
	    		}
	    		for(var i=0; i < length; i++){
	    			htmlElement += "<ul><li value='" + myobj[i].factoryCode + "'>" + myobj[i].factoryCode + "</li></ul>";
	    		}
	    		
	    		employee.show();
	    		employee.empty();
	    		employee.append(htmlElement);
	    		$('#add_sampleName').val("");
	    		$('#add_specifications').val("");
	    		addClickFactoryCode();
		    }
		});
	}
}

function addClickFactoryCode(){ 
	
	
	//给input赋值
	$(".employeeN3 ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#add_factoryCode").val(name);
		 $('#add_factoryCode').attr({'value' : "" + name + ""});
		 $(".employeeN3").hide();

	     aaa();
	})


}

function aaa(){
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
				Judge();
			},
			error:function(result){
				swal("没这个样品");
			}
		
			});	
		
		}
		if($("#add_factoryCode").val()==""&&$("#add_factoryCode").val()==null){
			$('#add_sampleName').val("");
			$('#add_specifications').val("");
		}

}
function editGetfactoryCode(){
	var name = $('#edit_factoryCode').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".employeeN4").hide();
	}else {
		var parame = {};
		parame.employeeName = name;
		$.post("sampleRecordController/getFactoryCode.do",{
			factoryCode : name
		},function(data){
			if (data) { 
	    		var employee,length;
	    		var myobj = JSON.parse(data);
	    		var htmlElement = "";//定义HTML    
	    		employee = $(".employeeN4");
	    		if(myobj.length > 4){
	    			length = 4;
	    		}else{
	    			length = myobj.length;
	    		}
	    		for(var i=0; i < length; i++){
	    			htmlElement += "<ul><li value='" + myobj[i].factoryCode + "'>" + myobj[i].factoryCode + "</li></ul>";
	    		}
	    		
	    		employee.show();
	    		employee.empty();
	    		employee.append(htmlElement);
	    		$('#edit_sampleName').val("");
	    		$('#edit_specifications').val("");
	    		addClickeditFactoryCode();
		    }
		});
	}
}

function addClickeditFactoryCode(){ 
	
	
	//给input赋值
	$(".employeeN4 ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_factoryCode").val(name);
		 $('#edit_factoryCode').attr({'value' : "" + name + ""});
		 $(".employeeN4").hide();

	     aaa1();
	})


}

function aaa1(){
		if($("#edit_factoryCode").val()!=""&&$("#edit_factoryCode").val()!=null){
		var parame = {};
		parame.factoryCode=$('#edit_factoryCode').val();
		$.ajax({	
			  url:'sampleRecordController/getSample.do',
			  data:parame,
			  dataType:"json",
			  success:function(result){
				$('#edit_sampleName').val(result.sampleName);
				$('#edit_specifications').val(result.specifications);
				EJudge();
			},
			error:function(result){
				swal("没这个样品");
			}
		
			});	
		
		}
		if($("#edit_factoryCode").val()==""&&$("#edit_factoryCode").val()==null){
			$('#edit_sampleName').val("");
			$('#edit_specifications').val("");
		}

}



function addGetEMName(){
	var name = $('#add_getMan').val();
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
		 $("#add_getMan").val(name);
		 var ID =  $(this).attr("class");
		 $('#add_getMan').attr({'name' : "" + ID + ""});
		 $('#add_getMan').attr({'value' : "" + name + ""});
		 $(".employeeN").hide();
	})

	//隐藏提示框
	$("#addContent").click(function(){
		 $(".employeeN").hide();
	})
	
}
function addGetEMName1(){
	var name = $('#add_returnMan').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".employeeN1").hide();
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
		    		employee = $(".employeeN1");
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
		    		addClick1();
			    }
			}
		});
	}
}
function addClick1(){ 
	
	
	//给input赋值
	$(".employeeN1 ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#add_returnMan").val(name);
		 var ID =  $(this).attr("class");
		 $('#add_returnMan').attr({'name' : "" + ID + ""});
		 $('#add_returnMan').attr({'value' : "" + name + ""});
		 $(".employeeN1").hide();
	})

	//隐藏提示框
	$("#addContent").click(function(){
		 $(".employeeN1").hide();
	})
}

function editGetEMName(){
	var name = $('#edit_getMan').val();
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
		 $("#edit_getMan").val(name);
		 var ID =  $(this).attr("class");
		 $('#edit_getMan').attr({'name' : "" + ID + ""});
		 $('#edit_getMan').attr({'value' : "" + name + ""});
		 $(".employeeN").hide();
	})

	//隐藏提示框
	$("#editContent").click(function(){
		 $(".employeeN").hide();
	})
}
function editGetEMName1(){
	var name = $('#edit_returnMan').val();
	if (!name && typeof(name)!="undefined" && name=='') 
	{
		$(".employeeN1").hide();
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
		    		employee = $(".employeeN1");
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
		    		editClick1();
			    }
			}
		});
	}
}
function editClick1(){ 
	//给input赋值
	$(".employeeN1 ul li").click(function(){
		 var name =  $(this).attr("value");
		 $("#edit_returnMan").val(name);
		 var ID =  $(this).attr("class");
		 $('#edit_returnMan').attr({'name' : "" + ID + ""});
		 $('#edit_returnMan').attr({'value' : "" + name + ""});
		 $(".employeeN1").hide();
	})

	//隐藏提示框
	$("#editContent").click(function(){
		 $(".employeeN1").hide();
	})
}




	
	

	
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
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
function Judge(){
	var parame = {};
	parame.factoryCode = $('#add_factoryCode').val();
	var fl=true;

	$.ajax({  
	    url:'sampleRecordController/addJudge.do',// 跳转到 action  
	    type:'post',
	    data:parame,
	    dataType:'json',
	    success:function(data){ 
	    
	    	if (data.state=="1") {
	    		$("#returnSample").click();
	    		// $('#type').attr({'name' : "1"});
	    		// $('#type').val("还样")
	    		//$("input[name='type'][value=1][type='radio']").prop("checked", true);
	    		//$("input[type=radio]").attr("checked",1);
		    }else {
		    	$("#getSample").click();
		    	// $('#type').attr({'name' : "0"});
	    		// $('#type').val("领样")
		    	//$("input[name='type'][value=0][type='radio']").prop("checked", true);
		    	//$("input[type=radio]").attr("checked",0);
		    }
	    	
	    	
		},
	   error:function(data){ 
		swal("没这个样品");
		} 
	
	});
	
}
function EJudge(){
	var parame = {};
	parame.factoryCode = $('#edit_factoryCode').val();
	var fl=true;

	$.ajax({  
	    url:'sampleRecordController/addJudge.do',// 跳转到 action  
	    type:'post',
	    data:parame,
	    dataType:'json',
	    success:function(data){ 
	    		
	    	if (data.state=="1"){
	    		//$('#Etype').attr({'name' : "1"});
	    		// $('#Etype').val("还样")

	    		$("#EreturnSample").click();
	    		//$("input[type=radio]").attr("checked",1);
		    }else {
		    	$("#EgetSample").click();
		    	//$("#EgetSample").prop("checked","checked");
		    	//$("input[type=radio]").attr("checked",0);
		    }
	    	
	    	
		},
	   error:function(data){ 
		swal("没这个样品");
		} 
	
	});
	
}
	
	



/* 新增方法 */
function add(){
	
	

		var parame = {};
		parame.factoryCode = $('#add_factoryCode').val();
		parame.sampleName = $('#add_sampleName').val();
		parame.specifications = $('#add_specifications').val();
		parame.getMan = $('#add_getMan').attr('name');
		parame.getTime = $('#add_getTime').val();
		parame.remarks = $('#add_remarks').val();
		parame.type = $('input[name=type2]:checked').val();

		if (parame.getMan != "") {
			$("input[type!=radio]").val("");
			
			if (parame.sampleName != "") {
				$.ajax({
					url : 'sampleRecordController/addSampleRecord.do',
					data : parame,
					success : function(o) {
						$('#addModal').modal('hide');
						refresh();
						//swal("新增成功");
					}
				});
			} else
				swal("没这个样品");
		} else
			swal("没操作人")
	
	
		
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
		swal("请选中一条数据");
		return;
	}


   
	$('#look_ID').val(data[0].ID);
	$('#look_sampleInformationID').val(data[0].sampleInformationID);
	$('#look_factoryCode').val(data[0].factoryCode);
	$('#look_sampleName').val(data[0].sampleName);
	$('#look_specifications').val(data[0].specifications);
	$('#look_getMan').val(data[0].getMan);
	$('#look_getTime').val(data[0].getTime);
	$('#look_remarks').val(data[0].remarks);
	$('#type').val(data[0].Type);
	$('#lookModal input').attr("disabled", "disabled");
	$('#lookModal').modal('show');
}


/* 弹出修改弹框方法 */
function openModal(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	
	$("div#only1 .form-control").attr({"disabled":false});
	$('#edit_ID').val(data[0].ID);
	$('#edit_sampleID').val(data[0].sampleID);
	$('#edit_factoryCode').val(data[0].factoryCode);
	$('#edit_sampleName').val(data[0].sampleName);
	$('#edit_specifications').val(data[0].specifications);
	$('#edit_getMan').val(data[0].getMan);
	$('#edit_getMan').attr({'name' : "" + data[0].getManID + ""});
	$('#edit_getTime').val(data[0].getTime);
	$('#edit_returnMan').val(data[0].returnMan);
	$('#edit_remarks').val(data[0].remarks);
	$('#Etype').val(data[0].Type);
	if(data[0].Type=="领样"){
		$("#EgetSample").click();
	}else{
		$("#EreturnSample").click();
	}
	$('#editModal').modal('show');
	
}

//$("#edit_factoryCode").change(function upperCase(factoryCode){
//	$('#edit_sampleName').val("");
//	$('#edit_specifications').val("");
//	if($("#edit_factoryCode").val()!=""&&$("#edit_factoryCode").val()!=null){
//	var parame = {};
//	parame.factoryCode=$('#edit_factoryCode').val();
//	$.ajax({	
//		  url:'sampleRecordController/getSample.do',
//		  data:parame,
//		  dataType:"json",
//		  success:function(result){
//			$('#edit_sampleName').val(result.sampleName);
//			$('#edit_specifications').val(result.specifications);
//
//			  },
//			error:function(result){
//					swal("没这个样品");
//				}
//		});	
//	}
//	if($("#edit_factoryCode").val()==""&&$("#edit_factoryCode").val()==null){
//		$('#edit_sampleName').val("");
//		$('#edit_specifications').val("");
//	}
//	
//	
//
//});


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
	parame.getManID =  $('#edit_getMan').attr('name');
	parame.getTime = $('#edit_getTime').val();
	parame.type = $('input[name=type1]:checked').val()
	parame.remarks = $('#edit_remarks').val();

	
	
	$.ajax({	
	  url:'sampleRecordController/updSampleRecord.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  swal("修改失败");
		  }
		  $('#editModal').modal('hide');
		  refresh();
	  }
	});	
}