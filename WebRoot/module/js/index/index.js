/**
 * 
 */

var obj ={
		userID:"1",
		level:2
		
}

var nodeId, // 节点id
	node, // 节点
	data = []; // breadcrumbs 数据

$(function(){
	initTree1();
	
	// 左侧菜单点击事件
	$(document).on('click', '.list-group-item', changeBreadCrumb);
});

// 左侧菜单点击改变breadcrumb
function changeBreadCrumb(){
	data = [];
	nodeId = $(this).attr('data-nodeid'); // 获取点击选项节点的id
	node = $('.tree').treeview('getNode', nodeId); // 获取点击选项节点
	
	// 循环向上寻找所有父节点，并获取每个节点的文字，链接地址和图标
	while(node.level0 >= '1'){
		data.push({
			text: node.text,
			href: node.href,
			icon: node.icon
		});
		
		node = $('.tree').treeview('getParent', node);
	};
	
	data.reverse(); // 由于添加数据时是从底层节点向上添加，这里反转数据以便后面使用
	
	var html = '';
	
	// 动态添加breadcrumb结构
	data.map((item, index) => {
		if(data.length === 1){
			html += '<li class="active"><i class="' + item.icon + '" style="padding-right:6px;"></i>' + item.text + '</li>';
		}else {
			if(index === data.length-1)
				html += '<li class="active"><i class="' + item.icon + '" style="padding-right:6px;"></i>' + item.text + '</li>';
			else 
				html += '<li><i class="' + item.icon + '"></i><a href="' + item.href + '">' + item.text + '</a></li>';
		}
	});
	
	$('.breadcrumb').html(html); // 设置breadcrumb结构
}

function initTree1(){  
	$('.tree').treeview({collapsed:false,data: getTree(),levels:1,enableLinks : true
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
//			     console.log(data);
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
	
	 // 按照指定的根节点菜单 id，加载其相应的子菜单树面板数据；该方法定义如下参数：
	    // id: 表示根节点菜单的 id；
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
 