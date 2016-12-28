/**
 * 
 */
var permission_global ={
		
		roleID:"",
		isSelected : true, //所有的模块的头节点是否是自己点击的 默认是自己的
		danxuan : true,
		moduleIDs:""
};
$(document).ready(function() {
	
    initRoleTree();
    initModuleTree();
    initTreeEvent();
});
function initTreeEvent(){
	$('#treeRole').on('nodeSelected', function(event, data) {
		  // 事件代码...
		alert("tree");
		});  
	$('#treeRole').on('onNodeChecked', function(event, data) {
		  // 事件代码...
		alert("tree1");
		}); 
	
}
 
function getRoleTree(){
	var trees;
	$.ajax({
		type : 'POST',
		dataType : 'text',
		url : 'roleController/getRoleTree_w.do',
		async:false,
		success : function(value) {
			 trees = JSON.parse(value);
		}
	});
	return trees;
}
function getModuleTree(){
	var trees;
	$.ajax({
		type : 'POST',
		url : 'moduleController/getTree.do',
		async:false,
		dataType : 'text',
		success : function(value) {
			 trees = JSON.parse(value);
		}
	});
	return trees;
}
function initRoleTree(){
	$('#treeRole').treeview({
		collapsed:false,
		data: getRoleTree(),
		showIcon : true,
		levels:2,
		showCheckbox :true,
		onNodeChecked :function(event, node){//一个节点被checked
			//单选 
			if(node.id != null &&  node.id != "") //不是头节点
			{  
				  
					
					
				$('#treeRole').treeview('uncheckAll', { silent: false });
				$('#treeModule').treeview('uncheckAll', { silent: true }); //清楚以前的勾选数据
				$('#treeRole').treeview('checkNode', [ node.nodeId, { silent: true } ]);
				permission_global.roleID = node.id;
				   initSlecledByRoleId(node.id);
			}else{  //是头节点
				  permission_global.roleID = "";
			}
         
			//使有关的模块选中
		},
		onNodeUnchecked :function(event , node){ //一个节点取消选择  这个事件源竟然是整个tree 
    			 permission_global.roleID = "";
    			 $('#treeRole').treeview('uncheckAll', { silent: true });
		}
		
	});
}
function initSlecledByRoleId(roleID){
	var moduleIDs = getModuleIDByRoleID(roleID);
	var nodeIds = [];
	var moduleNum = getModuleNum()+1;
	var node ; 
	for(var i = 1 ; i < moduleNum ; i++){
		node =$('#treeModule').treeview('getNode',i);
		if(node != null  && node.id != null  && moduleIDs != null && moduleIDs != "" && isContains(moduleIDs,node.id))
			{
		    	$('#treeModule').treeview('checkNode', [ i, { silent: true } ]);  //怕把所有子节点的模块都选中
		    	$('#treeModule').treeview('expandNode', [ i, { levels: 5, silent: true } ]); //展开列表 默认5级 true false 暂时没有影响 没有定义展开事件
			} 
	}
	
}
function getModuleNum(){
	var moduleNums ;
	$.ajax({
		url : '/laboratorySystem/moduleController/getModuleNum.do',
		dataType : "json",
		async : false,
		data : { 
			
		},
		success : function(o) {
			alert("sucess 2");
			moduleNums = JSON.parse(o);
		},
		error : function() {
			alert("faire 1");
			return false;
		}
	});
	return moduleNums;
}
function getModuleIDByRoleID(roleID){
	var moduleIDs ;
	$.ajax({
		url : '/laboratorySystem/moduleController/getModuleIDByRoleID.do',
		dataType : "json",
		async : false,
		data : {
			roleID : roleID
		},
		success : function(o) {
			moduleIDs = o ;
			//moduleIDs = JSON.parse(o); //字符串 加上,解析失败
			console.log(moduleIDs);
		},
		error : function() {
			alert("faire 1");
			return false;
		}
	});
	return moduleIDs;
}
//初始化模块树
function initModuleTree(){
	// var treemoduleurl="permissionAssignController/getPermissionModule.do?level="+3;
		$('#treeModule').treeview({
			collapsed:false,
			data: getModuleTree(),
			showIcon : true,
			levels:2,
			showCheckbox :true,
			onNodeChecked :function(event, node){
				
				var thisId = node.nodeId;
				var thisParentId = node.parentId;
				var total = "";
				
				if(node.id == undefined || node.id == ""){ //是头节点
					 $('#treeModule').treeview('checkAll', { silent: false });
                     //没有父节点的不需要处理
				}else {  
					   //选中一个节点需要把父节点选中
					    if(thisParentId == 0)  //是头节点
					    {
					    	$('#treeModule').treeview('checkNode', [ thisParentId, { silent: true } ]); //防止父节点为头节点 又重新选中所有
					    }
					    else  {  //不是头节点
					    	var parentNode =  $('#treeModule').treeview('getNode', thisParentId);
					    	 if(isContains(permission_global.moduleIDs,parentNode.id))  //是否添加父节点
					    			 {
					    		         ;
					    			 }
					    	 else {
					    		 permission_global.moduleIDs+=parentNode.id+",";
					    		 addPermission(permission_global.roleID ,parentNode.id); //分配权限
					    	 }
					    	  $('#treeModule').treeview('checkNode', [ thisParentId, { silent: true } ]); //防止父节点又重新选中所有字节点
					    	  console.log(permission_global.moduleIDs);
					    }
					    if(node.id != undefined && node.id != ""){ //添加选中的节点的id
							 permission_global.moduleIDs +=node.id+ ","; 
							 addPermission(permission_global.roleID ,node.id); //分配权限
						}
					   
				        	//选中子节点
							total = "";
							var temp = node;
							while ( temp.nodes.length != 0){
								if(node.nodes != null && node.nodes.length != 0)//没有孩子节点却有孩子数组
								{    
									 console.log(node.nodes);
									 temp = node.nodes[temp.nodes.length-1]; //数组最后一个
									 console.log(temp);
									 total = temp.nodeId;
								}
								
							}
							$('#treeModule').treeview('expandNode', [ thisId, { levels: 5, silent: false } ]);  //自己选中的节点也展开
							selectedModuleChilred(thisId+1,total); //展开和选中
							

				}
		        },
		        onNodeUnchecked :function(event , node){
		        	var thisId = node.nodeId;
		        	console.log(permission_global);
					var thisParentId = node.parentId;
					var total = ""; //最后一个节点才用
					if(node.id == undefined || node.id == ""){ //所有节点
						$('#treeRole').treeview('uncheckAll', { silent: true }); //可以直接赋值空 
						 permission_global.moduleIDs = "";
						 deletePermission(permission_global.roleID ,"all"); //分配权限
	                     //没有父节点的不需要处理
					}else {      
						if(thisId != null && thisId != ""){
							  permission_global.moduleIDs.replace(node.id+",",""); //删除对应模块
							  console.log(permission_global.moduleIDs);
							  deletePermission(permission_global.roleID ,node.id); //分配权限
						}
						        //取消选中的字节点 
								console.log(node);
								total = "";
								var temp = node;
								while ( temp.nodes.length != 0){
									 console.log(node.nodes);
									 temp = node.nodes[temp.nodes.length-1]; //数组最后一个
									 console.log(temp);
									 total = temp.nodeId;
								}
								$('#treeModule').treeview('expandNode', [ thisId, { levels: 5, silent: true } ]);  //自己选中的节点也展开
								unSelectedModuleChilred(thisId+1,total); //展开和不选中
								
					
				} //else
		      } //事件
			
		});   
	
}
//展开和选中节点
function selectedModuleChilred(start,end){
	for(var i = start ; i <=  end ; i++ )
	{
		$('#treeModule').treeview('checkNode', [ i, { silent: false } ]); //继续执行
		$('#treeModule').treeview('expandNode', [ i, { levels: 5, silent: true } ]); //展开列表 默认5级 true false 暂时没有影响 没有定义展开事件
	}
}
//展开和不选中节点
function unSelectedModuleChilred(start,end){ 
	for(var i = start ; i <=  end ; i++ )
	{
		$('#treeModule').treeview('uncheckNode', [ i, { silent: false } ]); //继续执行
		$('#treeModule').treeview('expandNode', [ i, { levels: 5, silent: true } ]); //展开列表 默认5级 true false 暂时没有影响 没有定义展开事件
	}
}
//判断字符串是否包含字串
function isContains(str, substr) {
	return str.indexOf(substr) >= 0;
}
//分配权限
function addPermission(roleID,moduleID){
	$.ajax({
		url : '/laboratorySystem/permissionAssignController/addPermission.do',
		dataType : "json",
		async : false,
		data : {
			roleID : roleID,
			moduleID : moduleID
		},
		success : function(o) {
			moduleIDs = JSON.parse(o);
		},
		error : function() {
			alert("add faire");
			return false;
		}
	});
	
	
}
function deletePermission(roleID,moduleID){
	$.ajax({
		url : '/laboratorySystem/permissionAssignController/deletePermission.do',
		dataType : "json",
		async : false,
		data : {
			roleID : roleID,
			moduleID : moduleID
		},
		success : function(o) {
			moduleIDs = JSON.parse(o);
		},
		error : function() {
			alert("delete faire");
			return false;
		}
	});
}
function addSelectedsFun(){
	if(operatorcode && operatorcode!=null){
		var selrow = [];
		selrow = $('#dgNotSelect').datagrid('getSelections');
		if(selrow != null && selrow.length > 0){
			var selrows = [];
			for(var i = 0;i<selrow.length;i++){
				selrows.push(selrow[i].ID)
			}
			
			$.post("roleAssignController/batchAddAssigns.do",{operatorcode:operatorcode,rolIds:selrows}, function(data){
				if(data){
					$.prompt('添加分配信息成功！');
				}else{
					$.prompt('添加分配信息失败！');
				}
				$('#dgSelect').datagrid({ 
    				queryParams:{operatorcode:operatorcode}
    			});
    			$('#dgNotSelect').datagrid({ 
    				queryParams:{operatorcode:operatorcode}
    			});
			}); 
		}
	}else{
		$.alert("请选择人员");
	}
}

//取消权限
function deleteSelectedsFun(){
	if(operatorcode && operatorcode!=null){
		var selrow = [];
		selrow = $('#dgSelect').datagrid('getSelections');
		if(selrow != null && selrow.length > 0){
			var selrows = [];
			for(var i = 0;i<selrow.length;i++){
				selrows.push(selrow[i].ID)
			}
			
			$.post("roleAssignController/deleteSelectedsFun.do",{rolIds:selrows}, function(data){
				if(data){
					$.prompt('删除分配信息成功！');
				}else{
					$.prompt('删除分配信息失败！');
				}
				$('#dgSelect').datagrid({ 
    				queryParams:{operatorcode:operatorcode}
    			});
    			$('#dgNotSelect').datagrid({ 
    				queryParams:{operatorcode:operatorcode}
    			});
			}); 
		}
	}else{
		$.alert("请选择人员");
	}
}


