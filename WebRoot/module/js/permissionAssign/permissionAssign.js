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
				$('#treeRole').treeview('checkNode', [ node.nodeId, { silent: true } ]);
				permission_global.roleID = node.id;
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
//角色权限查看
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
				if(thisId != null && thisId != ""){  //不是头节点
					permission_global.moduleIDs += node.id+",";
				}
				if(node.id == undefined || node.id == ""){ //是头节点
					if(permission_global.isSelected == true) //是自己点击触发的
					 $('#treeModule').treeview('checkAll', { silent: false });
					else {
						  permission_global.isSelected = true;
					}
                     //没有父节点的不需要处理
				}else {  
					   permission_global.isSelected = false; //点击了其他节点
					    if(node.id != null && node.id != "") //节点的主键没有设置
			                permission_global.moduleIDs += node.id+",";
					   //选中一个节点需要把父节点选中
					$('#treeModule').treeview('checkNode', [ thisParentId, { silent: true } ]); //防止父节点为头节点 又重新选中所有


					//选中子节点
					var siblings =   $('#treeModule').treeview('getSiblings', node.nodeId);//兄弟节点  就算子节点展开也不是兄弟节点不要误导(虽然页面上是同一级的)  但是上面的下面也算兄弟节点
					if(siblings == null ){
						console.log("没有兄弟");
					}else{
						console.log(siblings);
						var nextId = siblings[0].nodeId;
						console.log(node.nodeId);
						if(nextId  < thisId){ //说明已经回了一圈，已经是同级最后的一个 但是它的子节点也要选中
							console.log(node);
							total = "";
							var temp = node;
							while ( temp.nodes.length == 0){
								if(node.nodes != null && node.nodes.length != 0)//没有孩子节点却有孩子数组
								{ 
									 temp = node.nodes[length-1]; //数组最后一个
									 total = temp.nodeId;
								}
								
							}
							$('#treeModule').treeview('expandNode', [ thisId, { levels: 5, silent: true } ]);  //自己选中的节点也展开
							selectedModuleChilred(thisId+1,total); //展开和选中
						} else{  //有同级下面的节点
							$('#treeModule').treeview('expandNode', [ thisId, { levels: 5, silent: true } ]);   //自己选中的节点也展开
							selectedModuleChilred(thisId+1,nextId - 1); //展开和选中
							
						}
						
					} //else

				}
		        },
		        onNodeUnchecked :function(event , node){
		        	var thisId = node.nodeId;
		        	
					var thisParentId = node.parentId;
					var total = ""; //最后一个节点才用
					if(thisId != null && thisId != ""){
						permission_global.moduleIDs.replace(node.id+",",""); //删除对应模块
					}
					if(node.id == undefined || node.id == ""){ //所有节点
						$('#treeRole').treeview('uncheckAll', { silent: true }); //可以直接赋值空 
						permission_global.moduleIDs = "";
						 permission_global.isSelected = true;
	                     //没有父节点的不需要处理
					}else {
						 //不选中一个节点需要把子节点不选中
						//找子节点
						var siblings =   $('#treeModule').treeview('getSiblings', node.nodeId);//兄弟节点  就算子节点展开也不是兄弟节点不要误导(虽然页面上是同一级的)  但是上面的下面也算兄弟节点
						if(siblings == null ){
							console.log("没有兄弟");
						}else{
							console.log(siblings);
							var nextId = siblings[0].nodeId;
							console.log(node.nodeId);
							if(nextId  < thisId){ //说明已经回了一圈，已经是同级最后的一个 但是它的子节点也要选中
								console.log(node);
								total = "";
								var temp = node;
								while ( temp.nodes.length == 0){
									temp = node.nodes[length-1]; //数组最后一个
									total = temp.nodeId;
								}
								$('#treeModule').treeview('expandNode', [ thisId, { levels: 5, silent: true } ]);  //自己选中的节点也展开
								unSelectedModuleChilred(thisId+1,total); //展开和不选中
							} else{  //有同级下面的节点
								$('#treeModule').treeview('expandNode', [ thisId, { levels: 5, silent: true } ]);   //自己选中的节点也展开
								unSelectedModuleChilred(thisId+1,nextId - 1); //展开和不选中
							}
							
						}
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
//分配权限
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


