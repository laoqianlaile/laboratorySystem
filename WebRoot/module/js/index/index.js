/**
 * 
 */

var obj ={
		userID:"1",
		level:2
		
}

$(function(){
	initTree1();
	/*console.log('aaaa');
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : 'employeeController/getEmployeeID.do',
		success : function(result) {
			if (result) {
				data = JSON.parse(result);
				console.log(data);
			} else {
				alert(result.message);
			}
		}
	});
	
	*/
	
});
function initTree1(){  
	// console.log(getTree());
	$('#treeview').treeview({collapsed:false,data: getTree(),levels:1
		});   
	
	
}
function display(data){  
	
	for(var i = 0 ; i < data.length; i++){
		
		
	}
	
}
function getTree(){  
	var data ;
	$.ajax({
			type:"post",
			dataType:"json",
			data:obj,
			async: false,
			url:'permissionAssignController/getPermissionModule.do',
			success:function(result){
				if(result ){
			     data =  eval (result);
			    // display(data);
			     console.log(data);
			      return data;
				}
				else{
					alert(result.message);
					return ;
				}
			}
			
		});
	
	return data;
	
}
 function initTree(){
	
	 //  按照指定的根节点菜单 id，加载其相应的子菜单树面板数据；该方法定义如下参数：
	    //      id: 表示根节点菜单的 id；
	    window.mainpage.loadMenu = function (id) {
	    	
	        $(navMenuList).find("a").attr("disabled", true);
	        $.easyui.loading({ locale: westCenterLayout });
	        var t = $(navMenuTree), root = $.extend({}, $.array.first(window.mainpage.navMenusData, function (val) { return val.id == id; }));
	        
	        $.post("permissionassignController/getPermissionMenu.do",{menuCode:id},function(data){
	        	if(!data.status){
	        		alert(data.messege);
	        		return ;
	        	}
	        	var menus=data.data;
	        	root.children = $.array.likeArrayNotString(menus) ? menus : [];
	            t.tree("loadData", [root]);
	        },'json');
	    };
	 
 }