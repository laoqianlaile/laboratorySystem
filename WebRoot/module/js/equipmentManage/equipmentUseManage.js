
$(function() {
	initData();
});

//初始化数据
function initData(){
	$("#table").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : true,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
	//	pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5,10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
	//	sortName : 'ID',// 定义排序列
	//	sortOrder : 'asc',// 定义排序方式
		url:'equipmentUseController/getEquipmentUseWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: queryParams, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [/* {
			checkbox : true,
			width :'3%'// 宽度
		},*/{
			field:'ID',//返回值名称
			title:'仪器设备使用记录ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'equipmentID',//返回值名称
			title:'仪器设备ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'equipmentCode',//返回值名称
			title:'设备编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'14%',//宽度
//			visible:false
		},{
			field:'equipmentName',//返回值名称
			title:'设备名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'12%'//宽度
		},{
			field:'model',//返回值名称
			title:'设备型号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'7%'//宽度
		},{
			field:'testProjectID',//返回值名称
			title:'检测项目ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'nameCn',//返回值名称
			title:'检测项目',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'sampleID',//返回值名称
			title:'样品ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'sampleName',//返回值名称
			title:'样品名',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%'//宽度
		},{
			field:'factoryCode',//返回值名称
			title:'样品出厂编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
//			visible:false
		},{
			field:'applyTime',//返回值名称
			title:'使用时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%'//宽度
		},{
			field:'application',//返回值名称
			title:'使用人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10',//宽度
			visible:false
		},{
			field:'employeeName',//返回值名称
			title:'使用人',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'7%'//宽度
		},{
			field:'departmentName',//返回值名称
			title:'使用人所属科室',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%'//宽度
		},{
			field:'',
			title:'操作',
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',
			 formatter:function(value,row,index){    
                 var a = "<button  onclick='delData(\""+row.ID+"\")'  title='删除' class='glyphicon glyphicon-remove' style='width:80px;cursor:pointer;color: rgb(10, 78, 143);margin-right:8px;'>&nbsp;删除</button> ";
                 return a;    
             }   
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//请求数据时的额外参数
function queryParams(){
	var searchCondition = {
		limit : 10,
		offset : 0,
		sort : 'equipmentCode',
		order : 'asc',
		sampleName : $.trim($('#schSampleName').val()),
		equipmentName : $.trim($('#schEquipmentName').val()),
		testProject : $.trim($('#schTestProject').val()),
		applicat : $.trim($('#schApplicat').val()),
		startTime : $.trim($('#schStartTime').val()),
		endTime : $.trim($('#schEndTime').val())
	};
    return searchCondition;
}

/**
 * 搜索方法
 */
function search(){
	initData();
	$('#table').bootstrapTable('refresh', null);
}

/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/equipmentManage/equipmentUseManage.jsp";
}


/* 删除方法 */
function delData(){
	var ID = "";
	ID = arguments[0];
	alert("将要删除ID=" +ID+"的仪器设备使用记录");
	if (!ID && typeof(ID)!="undefined" && ID=='') 
	{ 
		alert("仪器设备使用记录ID为空！");
	}else{
	
		var ajaxParameter = {
				equipmentUseId : ID	
		};
		
		$.ajax({
		  url:'equipmentUseController/delEquipmentUse.do',
		  type:"post",
		  data:ajaxParameter,
		  success:function(o){
			  if(o<=0){
				  alert("删除失败");
			  }
			  refresh();
		  }
		});
	}
	
}
