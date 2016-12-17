var id ; 

function showdiag(data){
	$('#dequ').remove();
	document.getElementById("showdiv1").style.display = "none";
	var sentence = "<span id='dequ'>" + data + "</span>" ; 
	$('#showdiv1').append(sentence);
	var width=(document.body.clientWidth-300)/2;
	var height = (document.body.clientHeight-360)/2;
	document.getElementById("showdiv1").style.marginTop = height;
	document.getElementById("showdiv1").style.marginLeft = width;
	document.getElementById("showdiv1").style.display = "block";
	setTimeout("document.getElementById('showdiv1').style.display = 'none'",800);
}
 
$(function(){
	$('#table').bootstrapTable({
		height: 400,//定义表格的高度
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [5, 10, 20, 50, 200, 500],//设置可供选择的页面数据条数
		clickToSelect:true,//设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache: false,//禁用 AJAX 数据缓存
		sortName:'DEPARTMENTID',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'departmentController/getDepartWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
//		queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名
		columns:[{
			checkbox:true,
			width:'5'//宽度
		},{
			field:'DEPARTMENTID',//返回值名称
			title:'部门编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
//			visible:false
		},{
			field:'NAME',//返回值名称
			title:'部门名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'HEAD',//返回值名称
			title:'负责人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'INTRODUCTION',//返回值名称
			title:'部门简介',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'CREATTIME',//返回值名称
			title:'创建时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		},{
			field:'SUPERIOR',//返回值名称
			title:'上级部门',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10'//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
});

function addde(){
	var adddepart = {} ; 
	adddepart.DEPARTMENTID = $('#add_departmentid').val();
	adddepart.NAME = $('#add_name').val();
	adddepart.INTRODUCTION = $('#add_introduction').val();
	adddepart.HEAD = $('#add_head').val();
	adddepart.SUPERIOR = $('#add_superior').val();
	if(adddepart.DEPARTMENTID.length!=0){
		$.ajax({
			url:'departmentController/ifexist.do',
			data:{receid:adddepart.DEPARTMENTID},
			success:function(e){
				if(e>0)
					showdiag("ID存在");
				else{
					$.ajax({
						  url:'departmentController/addDepartment.do',
						  data:adddepart,
						  success:function(o){
								$('#addModal').modal('hide');
								showdiag("增加成功");
								refresh();
							  }
						});
					};
				}
		});
	}
	else{
		showdiag("请输入ID");
	}
		
}

function refresh(){
	$('#table').bootstrapTable('refresh', null);
}
/*$(function(){
	
	var check_ = document.getElementById("check_");
	check_.onclick = function(){
		var select = $('#table').bootstrapTable('getSelections');
		if(select.length<=0)
		{
			showdiag("请输入ID")
		}
	}

})*/

function check(){
	var select = $('#table').bootstrapTable('getSelections');
	if(select.length<=0)
	{
		showdiag("请至少选择一个");
	}
	else if(select.length == 1)
		{
			$('#check_departmentid').val(select[0].DEPARTMENTID);
			$('#check_name').val(select[0].NAME);
			$('#check_introduction').val(select[0].INTRODUCTION);
			$('#check_head').val(select[0].HEAD);
			$('#check_superior').val(select[0].SUPERIOR);
			
			$('#showModal').modal('show');
		}
	else
		showdiag("只能选择一个");
}

function showwindow(){
	var select = $('#table').bootstrapTable('getSelections');
	if(select.length<=0)
		showdiag("请至少选择一个");
	else if(select.length == 1)
	{
		$('#Bdepartmentid').val(select[0].DEPARTMENTID);
		$('#Bname').val(select[0].NAME);
		$('#Bintroduction').val(select[0].INTRODUCTION);
		$('#Bhead').val(select[0].HEAD);
		$('#Bsuperior').val(select[0].SUPERIOR);
		
		$('#checkModal').modal('show');
		id= $('#Bdepartmentid').val();
	}
	else
		showdiag("只能选择一个");
}

function changeway(){
	var changedepart = {};
	changedepart.ID = id ;
	changedepart.DEPARTMENTID = $('#Bdepartmentid').val();
	changedepart.NAME = $('#Bname').val();
	changedepart.INTRODUCTION = $('#Bintroduction').val();
	changedepart.HEAD = $('#Bhead').val();
	changedepart.SUPERIOR = $('#Bsuperior').val();
	$.ajax({
		  url:'departmentController/upddepart.do',
		  data:changedepart,
		  success:function(o){
			  $('#checkModal').modal('hide');
			  showdiag("成功修改");
			  refresh();
		  }
		});
}

function deletedepart(){
	var select = $('#table').bootstrapTable('getSelections');
	var departidlength="";
	for (var i = 0 ; i < select.length ; i++){
		departidlength += select[i].DEPARTMENTID+","; 
	}
	var iddata = {};
	iddata.departid=departidlength;
	if(select.length<=0)
		showdiag("请至少选择一个");
	else{
		$.ajax({
			  url:'departmentController/deletedepart2.do',
			  data:iddata,
			  success:function(o){
				  showdiag("成功删除");
				  refresh();
			  }
			});
	}
	
}

function chaxun(){
	var receive = {};
	var pd ;
	var pd2 ; 
	var pd3 ; 
	receive.departmentid = $('#chaxunid').val();
	receive.name = $('#chaxunname').val();
	receive.head = $('#chargep').val();
	pd = receive.departmentid.length ;
	pd2 = receive.name.length ;
	pd3 = receive.head.length;
	if(pd!=0||pd2!=0||pd3!=0)
	{
		$.ajax({
			url:'departmentController/judge.do',
			datatype:"json",
			data:receive,
			success:function(e){
					refresh();
			},
			error:function(){
				showdiag("file");
			}
		});
	}
	else
		refresh();
}












