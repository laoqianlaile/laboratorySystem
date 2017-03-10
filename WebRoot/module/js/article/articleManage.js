var allInfo = "";// 全部数据
var fileurl="" ;
function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，

	if ($("#search_artTitle").val() == "")
		pageReqeust.artTitle = "null";
	else
		pageReqeust.artTitle = encodeURI($("#search_artTitle").val());// 传递中文参数乱码的解决方法

	if (allInfo == "all") {
		pageReqeust.artColumn = "null";
	} else {
		pageReqeust.artColumn = encodeURI($("#search_artColumn").val());
	}
	
	if ($('#search_artPublisher').val() == "")
		pageReqeust.artPublisher = "null";
	else
		pageReqeust.artPublisher = encodeURI($('#search_artPublisher').val());
	pageReqeust.artCaseType = "null";
	return pageReqeust;
}
function init() {
	$('#table').bootstrapTable({
		striped : true,// 隔行变色效果
		sortName : 'articleID',// 定义排序列
		classes : 'table table-hover table-bordered table-condensed',
		clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect : true,
		pagination : true,// 在表格底部显示分页条
		rownumbers : true,// 行数 .
		pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10, 20, 50, 200, 500 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortOrder : 'asc',// 定义排序方式
		url : 'articleController/getArticleWithPaging.do',// 服务器数据的加载地址
		/*
		 * data : [ { status : "123", artTitle : "123", artColumn : "123",
		 * artCaseType : "123", artCregisattime : "123", artPublisher : "123",
		 * artRemark : '11' } ],
		 */
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams : queryParams,
		queryParamsType : "limit",
		// queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',// radio or checkbox 的字段名//设置True 将禁止多选
		columns : [ {
			field : 'ck',
			checkbox : true,
			align : 'center',
		// valign: 'middle'
		}, {
			title : '序号',
			field: 'Number',
			formatter: function (value, row, index) {
			return index+1;
			}
		// valign: 'middle',
		}, {
			title : '文章标题',
			field : 'artTitle',
			align : 'center',
		// valign: 'middle',
		}, {
			title : '文章栏目',
			field : 'artColumn',
			align : 'center'
		}, {
			title : '创建日期',
			field : 'artCregisattime',
			align : 'center',
		}, {
			title : '案例类型',
			field : 'artCaseType',
			align : 'center',
		}, {
			title : '发布者',
			field : 'artPublisher',
			align : 'center',
		}/*,{
			title : '图片',
			field : 'artPicturegis',
			align : 'center',
			hidden: "true",
		} */
		,
		{
			title : '备注',
			field : 'artRemark',
			align : 'center',
		} ]
	});
}

window.onload = function() {
	$('.add_artCaseType').hide();
	$('#rightFormDiv').hide();
	var flag=true;
	var ue= UE.getEditor('add_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       iframeCssUrl: 'PorUeditor/themes/iframe.css',// 引入css       
       enterTag:'br',
       initialFrameHeight :300,
       autoHeightEnabled: false,
        autoFloatEnabled: false,
        autoWidthEnabled:false
    });
	//var ue = UE.getEditor('add_artContent');
	modal();
	init();
	
	 /* $("#addarticle").click(function () {
         if(document.all.files.value==""){
        	 add();
        	 }
      });*/
};

function modal() {
	$("#show_artColumn").blur(function() {
		var show_artColumn = $('#show_artColumn').val();
		if (show_artColumn != "检测案例") {
			$('.show_artCaseType').hide();
		} else {
			$('.show_artCaseType').show();
		}
	});
	$("#edit_artColumn").blur(
			function() {
				var show_artColumn = $('#edit_artColumn').val();
				if (show_artColumn != "检测案例") {
					$('.edit_artCaseType').hide();
					$('#edit_artPicturegis').hide();
				} else {
					$('.edit_artCaseType').show();
					$('#edit_artPicturegis').show();
				}
			});
	$("#add_artColumn").blur(function() {
		var add_artColumn = $('#add_artColumn').val();
		if (add_artColumn != "检测案例") {
			$('.add_artCaseType').hide();
			$('#rightFormDiv').hide();
			$("#addarticle").click(function () {
           	  add();            	
         });} else {
    		$('.add_artCaseType').show();
			$('#rightFormDiv').show();
			$("#imgUpload").fileupload({  
				 autoUpload: true,
				 url: 'fileOperateController/imageUpload.do',  
				 dataType:'text',
				 add: function (e, data) {
			               $("#addarticle").click(function () {			            	  
			            		   data.submit();			                  	
			               });
				 },
			})/*.bind('fileuploadprogress', function (e, data) {  
			    var progress = parseInt(data.loaded / data.total * 100, 10);  
			    $("#weixin_progress").css('width',progress + '%');  
			    $("#weixin_progress").html(progress + '%');  
			})*/.bind('fileuploaddone', function (e, data) {  
				  fileurl=eval(data.result);
				 //fileurl = eval(data.result)[0].FileUrl;
				 flag=false;
				 add();
			    //$("#weixin_show").attr("src",eval(data.result)[0].FilUerl);  
			   
			});  
		}
	});	
}
// 查询
function search() {
	//alert($("#search_artColumn").val());
	$('#table').bootstrapTable('refresh', queryParams);
}
// 刷新表格
function refresh() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}
//刷新页面
function refreshWindow(){
    window.location.reload();//刷新当前页面.
}
// 新增
function add() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var str = date.getFullYear() + "-" + month + "-" + date.getDate() + " "
			+ date.getHours() + ":" + date.getMinutes() + ":"
			+ date.getSeconds();
	var addArticle = {};
	addArticle.artColumn = $('#add_artColumn').val();
	if( $('#add_artColumn').val()!=="检测案例"){
		addArticle.artCaseType="";
	}
	else{
		addArticle.artCaseType = $('#add_artCaseType').val();
	}
	addArticle.artTitle = $('#add_artTitle').val();
	addArticle.artContent = UE.getEditor('add_artContent').getContent();
	//alert(UE.getEditor('add_artContent').getContent());
	addArticle.artRemark = $('#add_artRemark').val();	
	addArticle.artPicturegis=fileurl;
	alert(fileurl);
	var val = Date.parse(str);
	var newDate = new Date(val);
	addArticle.artCregisattime = newDate;
	$.ajax({
		type : 'post',
		url : "articleController/addArticle.do",
		data : addArticle,
		success : function(o) {
			if (o <= 0) {
				alert("新增失败");
			}
			$('#addModal').modal('hide');
			refreshWindow();
		}
	});
}

function openModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	$("#edit_articleID").val(data[0].articleID);
	$("#edit_artColumn").val(data[0].artColumn);
	if(data[0].artColumn!="检测案例"){
		$('.edit_artCaseType').hide();
	    $("#edit_artPicturegis").hide();	
	}
	
	else{
		$('#edit_artCaseType').val(data[0].artCaseType);
		var artPicturegis=data[0].artPicturegis;
		var d1=document.getElementById("edit_artPicturegis");
		var img=document.createElement("img");
		img.src=artPicturegis;
		d1.appendChild(img);
	}
	$('#edit_artTitle').val(data[0].artTitle);
	
	
	//alert(artPicturegis);
	var ue2 = UE.getEditor('edit_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	
	//var ue2 = UE.getEditor('edit_artContent');
	ue2.ready(function() {		
		ue2.setContent(data[0].artContent);
		var html = ue2.getContent();
		var txt = ue2.getContentTxt();
	});
	$('#editModal').modal('show');
}
// 修改
function edit() {
	var parame = {};
	parame.articleID = $('#edit_articleID').val();
	parame.artColumn = $('#edit_artColumn').val();
	if($('#edit_artColumn').val()!="检测案例"){
		parame.artCaseType="";
		
	}else{
		parame.artCaseType = $('#edit_artCaseType').val();
	}	
	parame.artTitle = $('#edit_artTitle').val();	
	parame.artContent =UE.getEditor('edit_artContent').getContent();
	// parame.artPicturegis=$('#edit_artPicturegis').val();
	$.ajax({
		type : 'post',
		url : 'articleController/updateArticle.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				alert("修改失败");
			}
			$('#editModal').modal('hide');
			refresh();
		}
	});
}
// 删除
function del() {
	var data = $('#table').bootstrapTable("getSelections");

	if (data.length == 0) {
		alert("请选中至少一条数据");
		return;
	}
	confirm("确认要删除这篇文章？");
	var ids = "";
	for ( var i = 0; i < data.length; i++) {
		ids += data[i].articleID + ",";
	}

	var ajaxParameter = {
		articleID : ids.substring(0, (ids.length - 1))
	};

	$.ajax({
		url : 'articleController/deleteArticleByID.do',
		data : ajaxParameter,
		success : function(o) {
			if (o <= 0) {
				alert("删除失败");
			}
			refreshWindow();
		}
	});
}

// 全部数据
function view() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}

// 查看
function showModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	var ue1 = UE.getEditor('show_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	var artColumn = data[0].artColumn;
	var artCaseType = data[0].artCaseType;
	var artContent = data[0].artContent;
	var artPicturegis=data[0].artPicturegis;
	//var artContent =UE.getEditor('show_artContent').getPlainTxt();
	if(artColumn!="检测案例"){
		$('.show_artCaseType').hide();
		$('#show_artPicturegis').hide();
	}else{
		$('.show_artCaseTypse').show();
		$('#show_artPicturegis').show();
	}
	document.getElementById("show_artColumn")[0].innerText = artColumn;
	$("#show_artTitle").val(data[0].artTitle);
	var d1=document.getElementById("show_artPicturegis");
	var img=document.createElement("img");
	img.src=artPicturegis;
	d1.appendChild(img);
	/* src_0 = $("#img").attr("src");
     src_1 = src_0=="module/img/file/defaultPhoto.jpg"?artPicturegis:"module/img/file/defaultPhoto.jpg";
     $("#img").attr("src",src_1);*/
/*	document.getElementById("show_artPicturegis").innerHTML='<img src="artPicturegis" + height="150" width="250" />';
*/	//$("#show_artPicturegis").val(artPicturegis);
	//alert(artPicturegis);
	document.getElementById("show_artCaseType")[0].innerText = artCaseType;	

	//var ue1 = UE.getEditor('show_artContent');
	ue1.ready(function() {
		ue1.setContent(artContent);
		//var html =ue1.getPlainTxt();
	});
	$('#showModal').modal('show');
	// console.log($("#articleColumn"));
	
}

function previewImage(file,imgArea)
{	  
	  if (file.files && file.files[0])
	  {
	      var img = document.getElementById(imgArea);
	      var reader = new FileReader();
	      reader.onload = function(evt)
	      {
	    	  img.src = evt.target.result;
	      }
	      reader.readAsDataURL(file.files[0]);
	  }
	  else //兼容IE
	  {
		  var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
          file.select();
          var src = document.selection.createRange().text;
          var img = document.getElementById(imgArea);
          img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	  }
}
var allInfo = "";// 全部数据
var fileurl="" ;
function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，

	if ($("#search_artTitle").val() == "")
		pageReqeust.artTitle = "null";
	else
		pageReqeust.artTitle = encodeURI($("#search_artTitle").val());// 传递中文参数乱码的解决方法

	if (allInfo == "all") {
		pageReqeust.artColumn = "null";
	} else {
		pageReqeust.artColumn = encodeURI($("#search_artColumn").val());
	}
	
	if ($('#search_artPublisher').val() == "")
		pageReqeust.artPublisher = "null";
	else
		pageReqeust.artPublisher = encodeURI($('#search_artPublisher').val());
	pageReqeust.artCaseType = "null";
	return pageReqeust;
}
function init() {
	$('#table').bootstrapTable({
		striped : true,// 隔行变色效果
		sortName : 'articleID',// 定义排序列
		classes : 'table table-hover table-bordered table-condensed',
		clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect : true,
		pagination : true,// 在表格底部显示分页条
		rownumbers : true,// 行数 .
		pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10, 20, 50, 200, 500 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortOrder : 'asc',// 定义排序方式
		url : 'articleController/getArticleWithPaging.do',// 服务器数据的加载地址
		/*
		 * data : [ { status : "123", artTitle : "123", artColumn : "123",
		 * artCaseType : "123", artCregisattime : "123", artPublisher : "123",
		 * artRemark : '11' } ],
		 */
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams : queryParams,
		queryParamsType : "limit",
		// queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',// radio or checkbox 的字段名//设置True 将禁止多选
		columns : [ {
			field : 'ck',
			checkbox : true,
			align : 'center',
		// valign: 'middle'
		}, {
			title : '序号',
			field: 'Number',
			formatter: function (value, row, index) {
			return index+1;
			}
		// valign: 'middle',
		}, {
			title : '文章标题',
			field : 'artTitle',
			align : 'center',
		// valign: 'middle',
		}, {
			title : '文章栏目',
			field : 'artColumn',
			align : 'center'
		}, {
			title : '创建日期',
			field : 'artCregisattime',
			align : 'center',
		}, {
			title : '案例类型',
			field : 'artCaseType',
			align : 'center',
		}, {
			title : '发布者',
			field : 'artPublisher',
			align : 'center',
		}/*,{
			title : '图片',
			field : 'artPicturegis',
			align : 'center',
			hidden: "true",
		} */
		,
		{
			title : '备注',
			field : 'artRemark',
			align : 'center',
		} ]
	});
}

window.onload = function() {
	$('.add_artCaseType').hide();
	$('#rightFormDiv').hide();
	var flag=true;
	var ue= UE.getEditor('add_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       iframeCssUrl: 'PorUeditor/themes/iframe.css',// 引入css       
       enterTag:'br',
       initialFrameHeight :300,
       autoHeightEnabled: false,
        autoFloatEnabled: false,
        autoWidthEnabled:false
    });
	//var ue = UE.getEditor('add_artContent');
	modal();
	init();
	
	 /* $("#addarticle").click(function () {
         if(document.all.files.value==""){
        	 add();
        	 }
      });*/
};

function modal() {
	$("#show_artColumn").blur(function() {
		var show_artColumn = $('#show_artColumn').val();
		if (show_artColumn != "检测案例") {
			$('.show_artCaseType').hide();
		} else {
			$('.show_artCaseType').show();
		}
	});
	$("#edit_artColumn").blur(
			function() {
				var show_artColumn = $('#edit_artColumn').val();
				if (show_artColumn != "检测案例") {
					$('.edit_artCaseType').hide();
					$('#edit_artPicturegis').hide();
				} else {
					$('.edit_artCaseType').show();
					$('#edit_artPicturegis').show();
				}
			});
	$("#add_artColumn").blur(function() {
		var add_artColumn = $('#add_artColumn').val();
		if (add_artColumn != "检测案例") {
			$('.add_artCaseType').hide();
			$('#rightFormDiv').hide();
			$("#addarticle").click(function () {
           	  add();            	
         });} else {
    		$('.add_artCaseType').show();
			$('#rightFormDiv').show();
			$("#imgUpload").fileupload({  
				 autoUpload: true,
			    url: 'fileOperateController/imageUpload.do',  
				 dataType:'text',
				 add: function (e, data) {
			               $("#addarticle").click(function () {			            	  
			            		   data.submit();			                  	
			               });
				 },
			})/*.bind('fileuploadprogress', function (e, data) {  
			    var progress = parseInt(data.loaded / data.total * 100, 10);  
			    $("#weixin_progress").css('width',progress + '%');  
			    $("#weixin_progress").html(progress + '%');  
			})*/.bind('fileuploaddone', function (e, data) {  
				  fileurl=eval(data.result);
				 //fileurl = eval(data.result)[0].FileUrl;
				 flag=false;
				 add();
			    //$("#weixin_show").attr("src",eval(data.result)[0].FilUerl);  
			   
			});  
		}
	});	
}
// 查询
function search() {
	//alert($("#search_artColumn").val());
	$('#table').bootstrapTable('refresh', queryParams);
}
// 刷新表格
function refresh() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}
//刷新页面
function refreshWindow(){
    window.location.reload();//刷新当前页面.
}
// 新增
function add() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var str = date.getFullYear() + "-" + month + "-" + date.getDate() + " "
			+ date.getHours() + ":" + date.getMinutes() + ":"
			+ date.getSeconds();
	var addArticle = {};
	addArticle.artColumn = $('#add_artColumn').val();
	if( $('#add_artColumn').val()!=="检测案例"){
		addArticle.artCaseType="";
	}
	else{
		addArticle.artCaseType = $('#add_artCaseType').val();
	}
	addArticle.artTitle = $('#add_artTitle').val();
	addArticle.artContent = UE.getEditor('add_artContent').getContent();
	//alert(UE.getEditor('add_artContent').getContent());
	addArticle.artRemark = $('#add_artRemark').val();	
	addArticle.artPicturegis=fileurl;
	alert(fileurl);
	var val = Date.parse(str);
	var newDate = new Date(val);
	addArticle.artCregisattime = newDate;
	$.ajax({
		type : 'post',
		url : "articleController/addArticle.do",
		data : addArticle,
		success : function(o) {
			if (o <= 0) {
				alert("新增失败");
			}
			$('#addModal').modal('hide');
			refreshWindow();
		}
	});
}

function openModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	$("#edit_articleID").val(data[0].articleID);
	$("#edit_artColumn").val(data[0].artColumn);
	if(data[0].artColumn!="检测案例"){
		$('.edit_artCaseType').hide();
	    $("#edit_artPicturegis").hide();	
	}
	
	else{
		$('#edit_artCaseType').val(data[0].artCaseType);
		var artPicturegis=data[0].artPicturegis;
		var d1=document.getElementById("edit_artPicturegis");
		var img=document.createElement("img");
		img.src=artPicturegis;
		d1.appendChild(img);
	}
	$('#edit_artTitle').val(data[0].artTitle);
	
	
	//alert(artPicturegis);
	var ue2 = UE.getEditor('edit_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	
	//var ue2 = UE.getEditor('edit_artContent');
	ue2.ready(function() {		
		ue2.setContent(data[0].artContent);
		var html = ue2.getContent();
		var txt = ue2.getContentTxt();
	});
	$('#editModal').modal('show');
}
// 修改
function edit() {
	var parame = {};
	parame.articleID = $('#edit_articleID').val();
	parame.artColumn = $('#edit_artColumn').val();
	if($('#edit_artColumn').val()!="检测案例"){
		parame.artCaseType="";
		
	}else{
		parame.artCaseType = $('#edit_artCaseType').val();
	}	
	parame.artTitle = $('#edit_artTitle').val();	
	parame.artContent =UE.getEditor('edit_artContent').getContent();
	// parame.artPicturegis=$('#edit_artPicturegis').val();
	$.ajax({
		type : 'post',
		url : 'articleController/updateArticle.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				alert("修改失败");
			}
			$('#editModal').modal('hide');
			refresh();
		}
	});
}
// 删除
function del() {
	var data = $('#table').bootstrapTable("getSelections");

	if (data.length == 0) {
		alert("请选中至少一条数据");
		return;
	}if(!(confirm("确认要删除这篇文章？"))){
		return;
	}
	var ids = "";
	for ( var i = 0; i < data.length; i++) {
		ids += data[i].articleID + ",";
	}

	var ajaxParameter = {
		articleID : ids.substring(0, (ids.length - 1))
	};

	$.ajax({
		url : 'articleController/deleteArticleByID.do',
		data : ajaxParameter,
		success : function(o) {
			if (o <= 0) {
				alert("删除失败");
			}
			refreshWindow();
		}
	});
}

// 全部数据
function view() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}

// 查看
function showModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	var ue1 = UE.getEditor('show_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	var artColumn = data[0].artColumn;
	var artCaseType = data[0].artCaseType;
	var artContent = data[0].artContent;
	var artPicturegis=data[0].artPicturegis;
	//var artContent =UE.getEditor('show_artContent').getPlainTxt();
	if(artColumn!="检测案例"){
		$('.show_artCaseType').hide();
		$('#show_artPicturegis').hide();
	}else{
		$('.show_artCaseTypse').show();
		$('#show_artPicturegis').show();
	}
	document.getElementById("show_artColumn")[0].innerText = artColumn;
	$("#show_artTitle").val(data[0].artTitle);
	var d1=document.getElementById("show_artPicturegis");
	var img=document.createElement("img");
	img.src=artPicturegis;
	d1.appendChild(img);
	/* src_0 = $("#img").attr("src");
     src_1 = src_0=="module/img/file/defaultPhoto.jpg"?artPicturegis:"module/img/file/defaultPhoto.jpg";
     $("#img").attr("src",src_1);*/
/*	document.getElementById("show_artPicturegis").innerHTML='<img src="artPicturegis" + height="150" width="250" />';
*/	//$("#show_artPicturegis").val(artPicturegis);
	//alert(artPicturegis);
	document.getElementById("show_artCaseType")[0].innerText = artCaseType;	

	//var ue1 = UE.getEditor('show_artContent');
	ue1.ready(function() {
		ue1.setContent(artContent);
		//var html =ue1.getPlainTxt();
	});
	$('#showModal').modal('show');
	// console.log($("#articleColumn"));
	
}

function previewImage(file,imgArea)
{	  
	  if (file.files && file.files[0])
	  {
	      var img = document.getElementById(imgArea);
	      var reader = new FileReader();
	      reader.onload = function(evt)
	      {
	    	  img.src = evt.target.result;
	      }
	      reader.readAsDataURL(file.files[0]);
	  }
	  else //兼容IE
	  {
		  var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
          file.select();
          var src = document.selection.createRange().text;
          var img = document.getElementById(imgArea);
          img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	  }
}
var allInfo = "";// 全部数据
var fileurl="" ;
function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，

	if ($("#search_artTitle").val() == "")
		pageReqeust.artTitle = "null";
	else
		pageReqeust.artTitle = encodeURI($("#search_artTitle").val());// 传递中文参数乱码的解决方法

	if (allInfo == "all") {
		pageReqeust.artColumn = "null";
	} else {
		pageReqeust.artColumn = encodeURI($("#search_artColumn").val());
	}
	
	if ($('#search_artPublisher').val() == "")
		pageReqeust.artPublisher = "null";
	else
		pageReqeust.artPublisher = encodeURI($('#search_artPublisher').val());
	pageReqeust.artCaseType = "null";
	return pageReqeust;
}
function init() {
	$('#table').bootstrapTable({
		striped : true,// 隔行变色效果
		sortName : 'articleID',// 定义排序列
		classes : 'table table-hover table-bordered table-condensed',
		clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect : true,
		pagination : true,// 在表格底部显示分页条
		rownumbers : true,// 行数 .
		pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10, 20, 50, 200, 500 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortOrder : 'asc',// 定义排序方式
		url : 'articleController/getArticleWithPaging.do',// 服务器数据的加载地址
		/*
		 * data : [ { status : "123", artTitle : "123", artColumn : "123",
		 * artCaseType : "123", artCregisattime : "123", artPublisher : "123",
		 * artRemark : '11' } ],
		 */
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams : queryParams,
		queryParamsType : "limit",
		// queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',// radio or checkbox 的字段名//设置True 将禁止多选
		columns : [ {
			field : 'ck',
			checkbox : true,
			align : 'center',
		// valign: 'middle'
		}, {
			title : '序号',
			field: 'Number',
			formatter: function (value, row, index) {
			return index+1;
			}
		// valign: 'middle',
		}, {
			title : '文章标题',
			field : 'artTitle',
			align : 'center',
		// valign: 'middle',
		}, {
			title : '文章栏目',
			field : 'artColumn',
			align : 'center'
		}, {
			title : '创建日期',
			field : 'artCregisattime',
			align : 'center',
		}, {
			title : '案例类型',
			field : 'artCaseType',
			align : 'center',
		}, {
			title : '发布者',
			field : 'artPublisher',
			align : 'center',
		}/*,{
			title : '图片',
			field : 'artPicturegis',
			align : 'center',
			hidden: "true",
		} */
		,
		{
			title : '备注',
			field : 'artRemark',
			align : 'center',
		} ]
	});
}

window.onload = function() {
	$('.add_artCaseType').hide();
	$('#rightFormDiv').hide();
	var flag=true;
	var ue= UE.getEditor('add_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       iframeCssUrl: 'PorUeditor/themes/iframe.css',// 引入css       
       enterTag:'br',
       initialFrameHeight :300,
       autoHeightEnabled: false,
        autoFloatEnabled: false,
        autoWidthEnabled:false
    });
	//var ue = UE.getEditor('add_artContent');
	modal();
	init();
	
	 /* $("#addarticle").click(function () {
         if(document.all.files.value==""){
        	 add();
        	 }
      });*/
};

function modal() {
	$("#show_artColumn").blur(function() {
		var show_artColumn = $('#show_artColumn').val();
		if (show_artColumn != "检测案例") {
			$('.show_artCaseType').hide();
		} else {
			$('.show_artCaseType').show();
		}
	});
	$("#edit_artColumn").blur(
			function() {
				var show_artColumn = $('#edit_artColumn').val();
				if (show_artColumn != "检测案例") {
					$('.edit_artCaseType').hide();
					$('#edit_artPicturegis').hide();
				} else {
					$('.edit_artCaseType').show();
					$('#edit_artPicturegis').show();
				}
			});
	$("#add_artColumn").blur(function() {
		var add_artColumn = $('#add_artColumn').val();
		if (add_artColumn != "检测案例") {
			$('.add_artCaseType').hide();
			$('#rightFormDiv').hide();
			$("#addarticle").click(function () {
           	  add();            	
         });} else {
    		$('.add_artCaseType').show();
			$('#rightFormDiv').show();
			$("#imgUpload").fileupload({  
				 autoUpload: true,
			    url: 'fileOperateController/imageUpload.do',  
				 dataType:'text',
				 add: function (e, data) {
			               $("#addarticle").click(function () {			            	  
			            		   data.submit();			                  	
			               });
				 },
			})/*.bind('fileuploadprogress', function (e, data) {  
			    var progress = parseInt(data.loaded / data.total * 100, 10);  
			    $("#weixin_progress").css('width',progress + '%');  
			    $("#weixin_progress").html(progress + '%');  
			})*/.bind('fileuploaddone', function (e, data) {  
				  fileurl=eval(data.result);
				 //fileurl = eval(data.result)[0].FileUrl;
				 flag=false;
				 add();
			    //$("#weixin_show").attr("src",eval(data.result)[0].FilUerl);  
			   
			});  
		}
	});	
}
// 查询
function search() {
	//alert($("#search_artColumn").val());
	$('#table').bootstrapTable('refresh', queryParams);
}
// 刷新表格
function refresh() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}
//刷新页面
function refreshWindow(){
    window.location.reload();//刷新当前页面.
}
// 新增
function add() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var str = date.getFullYear() + "-" + month + "-" + date.getDate() + " "
			+ date.getHours() + ":" + date.getMinutes() + ":"
			+ date.getSeconds();
	var addArticle = {};
	addArticle.artColumn = $('#add_artColumn').val();
	if( $('#add_artColumn').val()!=="检测案例"){
		addArticle.artCaseType="";
	}
	else{
		addArticle.artCaseType = $('#add_artCaseType').val();
	}
	addArticle.artTitle = $('#add_artTitle').val();
	addArticle.artContent = UE.getEditor('add_artContent').getContent();
	//alert(UE.getEditor('add_artContent').getContent());
	addArticle.artRemark = $('#add_artRemark').val();	
	addArticle.artPicturegis=fileurl;
	alert(fileurl);
	var val = Date.parse(str);
	var newDate = new Date(val);
	addArticle.artCregisattime = newDate;
	$.ajax({
		type : 'post',
		url : "articleController/addArticle.do",
		data : addArticle,
		success : function(o) {
			if (o <= 0) {
				alert("新增失败");
			}
			$('#addModal').modal('hide');
			refreshWindow();
		}
	});
}

function openModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	$("#edit_articleID").val(data[0].articleID);
	$("#edit_artColumn").val(data[0].artColumn);
	if(data[0].artColumn!="检测案例"){
		$('.edit_artCaseType').hide();
	    $("#edit_artPicturegis").hide();	
	}
	
	else{
		$('#edit_artCaseType').val(data[0].artCaseType);
		var artPicturegis=data[0].artPicturegis;
		var d1=document.getElementById("edit_artPicturegis");
		var img=document.createElement("img");
		img.src=artPicturegis;
		d1.appendChild(img);
	}
	$('#edit_artTitle').val(data[0].artTitle);
	
	
	//alert(artPicturegis);
	var ue2 = UE.getEditor('edit_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	
	//var ue2 = UE.getEditor('edit_artContent');
	ue2.ready(function() {		
		ue2.setContent(data[0].artContent);
		var html = ue2.getContent();
		var txt = ue2.getContentTxt();
	});
	$('#editModal').modal('show');
}
// 修改
function edit() {
	var parame = {};
	parame.articleID = $('#edit_articleID').val();
	parame.artColumn = $('#edit_artColumn').val();
	if($('#edit_artColumn').val()!="检测案例"){
		parame.artCaseType="";
		
	}else{
		parame.artCaseType = $('#edit_artCaseType').val();
	}	
	parame.artTitle = $('#edit_artTitle').val();	
	parame.artContent =UE.getEditor('edit_artContent').getContent();
	// parame.artPicturegis=$('#edit_artPicturegis').val();
	$.ajax({
		type : 'post',
		url : 'articleController/updateArticle.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				alert("修改失败");
			}
			$('#editModal').modal('hide');
			refresh();
		}
	});
}
// 删除
function del() {
	var data = $('#table').bootstrapTable("getSelections");

	if (data.length == 0) {
		alert("请选中至少一条数据");
		return;
	}
	confirm("确认要删除这篇文章？");
	var ids = "";
	for ( var i = 0; i < data.length; i++) {
		ids += data[i].articleID + ",";
	}

	var ajaxParameter = {
		articleID : ids.substring(0, (ids.length - 1))
	};

	$.ajax({
		url : 'articleController/deleteArticleByID.do',
		data : ajaxParameter,
		success : function(o) {
			if (o <= 0) {
				alert("删除失败");
			}
			refreshWindow();
		}
	});
}

// 全部数据
function view() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}

// 查看
function showModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	var ue1 = UE.getEditor('show_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	var artColumn = data[0].artColumn;
	var artCaseType = data[0].artCaseType;
	var artContent = data[0].artContent;
	var artPicturegis=data[0].artPicturegis;
	//var artContent =UE.getEditor('show_artContent').getPlainTxt();
	if(artColumn!="检测案例"){
		$('.show_artCaseType').hide();
		$('#show_artPicturegis').hide();
	}else{
		$('.show_artCaseTypse').show();
		$('#show_artPicturegis').show();
	}
	document.getElementById("show_artColumn")[0].innerText = artColumn;
	$("#show_artTitle").val(data[0].artTitle);
	var d1=document.getElementById("show_artPicturegis");
	var img=document.createElement("img");
	img.src=artPicturegis;
	d1.appendChild(img);
	/* src_0 = $("#img").attr("src");
     src_1 = src_0=="module/img/file/defaultPhoto.jpg"?artPicturegis:"module/img/file/defaultPhoto.jpg";
     $("#img").attr("src",src_1);*/
/*	document.getElementById("show_artPicturegis").innerHTML='<img src="artPicturegis" + height="150" width="250" />';
*/	//$("#show_artPicturegis").val(artPicturegis);
	//alert(artPicturegis);
	document.getElementById("show_artCaseType")[0].innerText = artCaseType;	

	//var ue1 = UE.getEditor('show_artContent');
	ue1.ready(function() {
		ue1.setContent(artContent);
		//var html =ue1.getPlainTxt();
	});
	$('#showModal').modal('show');
	// console.log($("#articleColumn"));
	
}

function previewImage(file,imgArea)
{	  
	  if (file.files && file.files[0])
	  {
	      var img = document.getElementById(imgArea);
	      var reader = new FileReader();
	      reader.onload = function(evt)
	      {
	    	  img.src = evt.target.result;
	      }
	      reader.readAsDataURL(file.files[0]);
	  }
	  else //兼容IE
	  {
		  var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
          file.select();
          var src = document.selection.createRange().text;
          var img = document.getElementById(imgArea);
          img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	  }
}
var allInfo = "";// 全部数据
var fileurl="" ;
function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，

	if ($("#search_artTitle").val() == "")
		pageReqeust.artTitle = "null";
	else
		pageReqeust.artTitle = encodeURI($("#search_artTitle").val());// 传递中文参数乱码的解决方法

	if (allInfo == "all") {
		pageReqeust.artColumn = "null";
	} else {
		pageReqeust.artColumn = encodeURI($("#search_artColumn").val());
	}
	
	if ($('#search_artPublisher').val() == "")
		pageReqeust.artPublisher = "null";
	else
		pageReqeust.artPublisher = encodeURI($('#search_artPublisher').val());
	pageReqeust.artCaseType = "null";
	return pageReqeust;
}
function init() {
	$('#table').bootstrapTable({
		striped : true,// 隔行变色效果
		sortName : 'articleID',// 定义排序列
		classes : 'table table-hover table-bordered table-condensed',
		clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect : true,
		pagination : true,// 在表格底部显示分页条
		rownumbers : true,// 行数 .
		pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10, 20, 50, 200, 500 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortOrder : 'asc',// 定义排序方式
		url : 'articleController/getArticleWithPaging.do',// 服务器数据的加载地址
		/*
		 * data : [ { status : "123", artTitle : "123", artColumn : "123",
		 * artCaseType : "123", artCregisattime : "123", artPublisher : "123",
		 * artRemark : '11' } ],
		 */
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams : queryParams,
		queryParamsType : "limit",
		// queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',// radio or checkbox 的字段名//设置True 将禁止多选
		columns : [ {
			field : 'ck',
			checkbox : true,
			align : 'center',
		// valign: 'middle'
		}, {
			title : '序号',
			field: 'Number',
			formatter: function (value, row, index) {
			return index+1;
			}
		// valign: 'middle',
		}, {
			title : '文章标题',
			field : 'artTitle',
			align : 'center',
		// valign: 'middle',
		}, {
			title : '文章栏目',
			field : 'artColumn',
			align : 'center'
		}, {
			title : '创建日期',
			field : 'artCregisattime',
			align : 'center',
		}, {
			title : '案例类型',
			field : 'artCaseType',
			align : 'center',
		}, {
			title : '发布者',
			field : 'artPublisher',
			align : 'center',
		}/*,{
			title : '图片',
			field : 'artPicturegis',
			align : 'center',
			hidden: "true",
		} */
		,
		{
			title : '备注',
			field : 'artRemark',
			align : 'center',
		} ]
	});
}

window.onload = function() {
	$('.add_artCaseType').hide();
	$('#rightFormDiv').hide();
	var flag=true;
	var ue= UE.getEditor('add_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       iframeCssUrl: 'PorUeditor/themes/iframe.css',// 引入css       
       enterTag:'br',
       initialFrameHeight :300,
       autoHeightEnabled: false,
        autoFloatEnabled: false,
        autoWidthEnabled:false
    });
	//var ue = UE.getEditor('add_artContent');
	modal();
	init();
	
	 /* $("#addarticle").click(function () {
         if(document.all.files.value==""){
        	 add();
        	 }
      });*/
};

function modal() {
	$("#show_artColumn").blur(function() {
		var show_artColumn = $('#show_artColumn').val();
		if (show_artColumn != "检测案例") {
			$('.show_artCaseType').hide();
		} else {
			$('.show_artCaseType').show();
		}
	});
	$("#edit_artColumn").blur(
			function() {
				var show_artColumn = $('#edit_artColumn').val();
				if (show_artColumn != "检测案例") {
					$('.edit_artCaseType').hide();
					$('#edit_artPicturegis').hide();
				} else {
					$('.edit_artCaseType').show();
					$('#edit_artPicturegis').show();
				}
			});
	$("#add_artColumn").blur(function() {
		var add_artColumn = $('#add_artColumn').val();
		if (add_artColumn != "检测案例") {
			$('.add_artCaseType').hide();
			$('#rightFormDiv').hide();
			$("#addarticle").click(function () {
           	  add();            	
         });} else {
    		$('.add_artCaseType').show();
			$('#rightFormDiv').show();
			$("#imgUpload").fileupload({  
				 autoUpload: true,
				 url: 'fileOperateController/imageUpload.do',  
				 dataType:'text',
				 add: function (e, data) {
			               $("#addarticle").click(function () {			            	  
			            		   data.submit();			                  	
			               });
				 },
			}).bind('fileuploaddone', function (e, data) {  
				  fileurl=eval(data.result);
				 //fileurl = eval(data.result)[0].FileUrl;
				 flag=false;
				 add();
			    //$("#weixin_show").attr("src",eval(data.result)[0].FilUerl);  
			   
			});  
		}
	});	
}
// 查询
function search() {
	//alert($("#search_artColumn").val());
	$('#table').bootstrapTable('refresh', queryParams);
}
// 刷新表格
function refresh() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}
//刷新页面
function refreshWindow(){
    window.location.reload();//刷新当前页面.
}
// 新增
function add() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var str = date.getFullYear() + "-" + month + "-" + date.getDate() + " "
			+ date.getHours() + ":" + date.getMinutes() + ":"
			+ date.getSeconds();
	var addArticle = {};
	addArticle.artColumn = $('#add_artColumn').val();
	if( $('#add_artColumn').val()!=="检测案例"){
		addArticle.artCaseType="";
	}
	else{
		addArticle.artCaseType = $('#add_artCaseType').val();
	}
	addArticle.artTitle = $('#add_artTitle').val();
	addArticle.artContent = UE.getEditor('add_artContent').getContent();
	//alert(UE.getEditor('add_artContent').getContent());
	addArticle.artRemark = $('#add_artRemark').val();	
	addArticle.artPicturegis=fileurl;
	alert(fileurl);
	var val = Date.parse(str);
	var newDate = new Date(val);
	addArticle.artCregisattime = newDate;
	$.ajax({
		type : 'post',
		url : "articleController/addArticle.do",
		data : addArticle,
		success : function(o) {
			if (o <= 0) {
				alert("新增失败");
			}
			$('#addModal').modal('hide');
			refreshWindow();
		}
	});
}

function openModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	$("#edit_articleID").val(data[0].articleID);
	$("#edit_artColumn").val(data[0].artColumn);
	if(data[0].artColumn!="检测案例"){
		$('.edit_artCaseType').hide();
	    $("#edit_artPicturegis").hide();	
	}
	
	else{
		$('#edit_artCaseType').val(data[0].artCaseType);
		var artPicturegis=data[0].artPicturegis;
		var d1=document.getElementById("edit_artPicturegis");
		var img=document.createElement("img");
		img.src=artPicturegis;
		d1.appendChild(img);
	}
	$('#edit_artTitle').val(data[0].artTitle);
	
	
	//alert(artPicturegis);
	var ue2 = UE.getEditor('edit_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	
	//var ue2 = UE.getEditor('edit_artContent');
	ue2.ready(function() {		
		ue2.setContent(data[0].artContent);
		var html = ue2.getContent();
		var txt = ue2.getContentTxt();
	});
	$('#editModal').modal('show');
}
// 修改
function edit() {
	var parame = {};
	parame.articleID = $('#edit_articleID').val();
	parame.artColumn = $('#edit_artColumn').val();
	if($('#edit_artColumn').val()!="检测案例"){
		parame.artCaseType="";
		
	}else{
		parame.artCaseType = $('#edit_artCaseType').val();
	}	
	parame.artTitle = $('#edit_artTitle').val();	
	parame.artContent =UE.getEditor('edit_artContent').getContent();
	// parame.artPicturegis=$('#edit_artPicturegis').val();
	$.ajax({
		type : 'post',
		url : 'articleController/updateArticle.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				alert("修改失败");
			}
			$('#editModal').modal('hide');
			refresh();
		}
	});
}
// 删除
function del() {
	var data = $('#table').bootstrapTable("getSelections");

	if (data.length == 0) {
		alert("请选中至少一条数据");
		return;
	}
	confirm("确认要删除这篇文章？");
	var ids = "";
	for ( var i = 0; i < data.length; i++) {
		ids += data[i].articleID + ",";
	}

	var ajaxParameter = {
		articleID : ids.substring(0, (ids.length - 1))
	};

	$.ajax({
		url : 'articleController/deleteArticleByID.do',
		data : ajaxParameter,
		success : function(o) {
			if (o <= 0) {
				alert("删除失败");
			}
			refreshWindow();
		}
	});
}

// 全部数据
function view() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}

// 查看
function showModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	var ue1 = UE.getEditor('show_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	var artColumn = data[0].artColumn;
	var artCaseType = data[0].artCaseType;
	var artContent = data[0].artContent;
	var artPicturegis=data[0].artPicturegis;
	//var artContent =UE.getEditor('show_artContent').getPlainTxt();
	if(artColumn!="检测案例"){
		$('.show_artCaseType').hide();
		$('#show_artPicturegis').hide();
	}else{
		$('.show_artCaseTypse').show();
		$('#show_artPicturegis').show();
	}
	document.getElementById("show_artColumn")[0].innerText = artColumn;
	$("#show_artTitle").val(data[0].artTitle);
	var d1=document.getElementById("show_artPicturegis");
	var img=document.createElement("img");
	img.src=artPicturegis;
	d1.appendChild(img);
	/* src_0 = $("#img").attr("src");
     src_1 = src_0=="module/img/file/defaultPhoto.jpg"?artPicturegis:"module/img/file/defaultPhoto.jpg";
     $("#img").attr("src",src_1);*/
/*	document.getElementById("show_artPicturegis").innerHTML='<img src="artPicturegis" + height="150" width="250" />';
*/	//$("#show_artPicturegis").val(artPicturegis);
	//alert(artPicturegis);
	document.getElementById("show_artCaseType")[0].innerText = artCaseType;	

	//var ue1 = UE.getEditor('show_artContent');
	ue1.ready(function() {
		ue1.setContent(artContent);
		//var html =ue1.getPlainTxt();
	});
	$('#showModal').modal('show');
	// console.log($("#articleColumn"));
	
}

function previewImage(file,imgArea)
{	  
	  if (file.files && file.files[0])
	  {
	      var img = document.getElementById(imgArea);
	      var reader = new FileReader();
	      reader.onload = function(evt)
	      {
	    	  img.src = evt.target.result;
	      }
	      reader.readAsDataURL(file.files[0]);
	  }
	  else //兼容IE
	  {
		  var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
          file.select();
          var src = document.selection.createRange().text;
          var img = document.getElementById(imgArea);
          img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	  }
}
var allInfo = "";// 全部数据
var fileurl="" ;
function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，

	if ($("#search_artTitle").val() == "")
		pageReqeust.artTitle = "null";
	else
		pageReqeust.artTitle = encodeURI($("#search_artTitle").val());// 传递中文参数乱码的解决方法

	if (allInfo == "all") {
		pageReqeust.artColumn = "null";
	} else {
		pageReqeust.artColumn = encodeURI($("#search_artColumn").val());
	}
	
	if ($('#search_artPublisher').val() == "")
		pageReqeust.artPublisher = "null";
	else
		pageReqeust.artPublisher = encodeURI($('#search_artPublisher').val());
	pageReqeust.artCaseType = "null";
	return pageReqeust;
}
function init() {
	$('#table').bootstrapTable({
		striped : true,// 隔行变色效果
		sortName : 'articleID',// 定义排序列
		classes : 'table table-hover table-bordered table-condensed',
		clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和 checkbox
		singleSelect : true,
		pagination : true,// 在表格底部显示分页条
		rownumbers : true,// 行数 .
		pageSize : 10,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5, 10, 20, 50, 200, 500 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortOrder : 'asc',// 定义排序方式
		url : 'articleController/getArticleWithPaging.do',// 服务器数据的加载地址
		/*
		 * data : [ { status : "123", artTitle : "123", artColumn : "123",
		 * artCaseType : "123", artCregisattime : "123", artPublisher : "123",
		 * artRemark : '11' } ],
		 */
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParams : queryParams,
		queryParamsType : "limit",
		// queryParams:'',//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName : '',// radio or checkbox 的字段名//设置True 将禁止多选
		columns : [ {
			field : 'ck',
			checkbox : true,
			align : 'center',
		// valign: 'middle'
		}, {
			title : '序号',
			field: 'Number',
			formatter: function (value, row, index) {
			return index+1;
			}
		// valign: 'middle',
		}, {
			title : '文章标题',
			field : 'artTitle',
			align : 'center',
		// valign: 'middle',
		}, {
			title : '文章栏目',
			field : 'artColumn',
			align : 'center'
		}, {
			title : '创建日期',
			field : 'artCregisattime',
			align : 'center',
		}, {
			title : '案例类型',
			field : 'artCaseType',
			align : 'center',
		}, {
			title : '发布者',
			field : 'artPublisher',
			align : 'center',
		}/*,{
			title : '图片',
			field : 'artPicturegis',
			align : 'center',
			hidden: "true",
		} */
		,
		{
			title : '备注',
			field : 'artRemark',
			align : 'center',
		} ]
	});
}

window.onload = function() {
	$('.add_artCaseType').hide();
	$('#rightFormDiv').hide();
	var flag=true;
	var ue= UE.getEditor('add_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       iframeCssUrl: 'PorUeditor/themes/iframe.css',// 引入css       
       enterTag:'br',
       initialFrameHeight :300,
       autoHeightEnabled: false,
        autoFloatEnabled: false,
        autoWidthEnabled:false
    });
	//var ue = UE.getEditor('add_artContent');
	modal();
	init();
	
	 /* $("#addarticle").click(function () {
         if(document.all.files.value==""){
        	 add();
        	 }
      });*/
};

function modal() {
	$("#show_artColumn").blur(function() {
		var show_artColumn = $('#show_artColumn').val();
		if (show_artColumn != "检测案例") {
			$('.show_artCaseType').hide();
		} else {
			$('.show_artCaseType').show();
		}
	});
	$("#edit_artColumn").blur(
			function() {
				var show_artColumn = $('#edit_artColumn').val();
				if (show_artColumn != "检测案例") {
					$('.edit_artCaseType').hide();
					$('#edit_artPicturegis').hide();
				} else {
					$('.edit_artCaseType').show();
					$('#edit_artPicturegis').show();
				}
			});
	$("#add_artColumn").blur(function() {
		var add_artColumn = $('#add_artColumn').val();
		if (add_artColumn != "检测案例") {
			$('.add_artCaseType').hide();
			$('#rightFormDiv').hide();
			$("#addarticle").click(function () {
           	  add();            	
         });} else {
    		$('.add_artCaseType').show();
			$('#rightFormDiv').show();
			$("#imgUpload").fileupload({  
				 autoUpload: true,
			    url: 'fileOperateController/imageUpload.do',  
				 dataType:'text',
				 add: function (e, data) {
			               $("#addarticle").click(function () {			            	  
			            		   data.submit();			                  	
			               });
				 },
			})/*.bind('fileuploadprogress', function (e, data) {  
			    var progress = parseInt(data.loaded / data.total * 100, 10);  
			    $("#weixin_progress").css('width',progress + '%');  
			    $("#weixin_progress").html(progress + '%');  
			})*/.bind('fileuploaddone', function (e, data) {  
				  fileurl=eval(data.result);
				 //fileurl = eval(data.result)[0].FileUrl;
				 flag=false;
				 add();
			    //$("#weixin_show").attr("src",eval(data.result)[0].FilUerl);  
			   
			});  
		}
	});	
}
// 查询
function search() {
	//alert($("#search_artColumn").val());
	$('#table').bootstrapTable('refresh', queryParams);
}
// 刷新表格
function refresh() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}
//刷新页面
function refreshWindow(){
    window.location.reload();//刷新当前页面.
}
// 新增
function add() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var str = date.getFullYear() + "-" + month + "-" + date.getDate() + " "
			+ date.getHours() + ":" + date.getMinutes() + ":"
			+ date.getSeconds();
	var addArticle = {};
	addArticle.artColumn = $('#add_artColumn').val();
	if( $('#add_artColumn').val()!=="检测案例"){
		addArticle.artCaseType="";
	}
	else{
		addArticle.artCaseType = $('#add_artCaseType').val();
	}
	addArticle.artTitle = $('#add_artTitle').val();
	addArticle.artContent = UE.getEditor('add_artContent').getContent();
	//alert(UE.getEditor('add_artContent').getContent());
	addArticle.artRemark = $('#add_artRemark').val();	
	addArticle.artPicturegis=fileurl;
	alert(fileurl);
	var val = Date.parse(str);
	var newDate = new Date(val);
	addArticle.artCregisattime = newDate;
	$.ajax({
		type : 'post',
		url : "articleController/addArticle.do",
		data : addArticle,
		success : function(o) {
			if (o <= 0) {
				alert("新增失败");
			}
			$('#addModal').modal('hide');
			refreshWindow();
		}
	});
}

function openModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	$("#edit_articleID").val(data[0].articleID);
	$("#edit_artColumn").val(data[0].artColumn);
	if(data[0].artColumn!="检测案例"){
		$('.edit_artCaseType').hide();
	    $("#edit_artPicturegis").hide();	
	}
	
	else{
		$('#edit_artCaseType').val(data[0].artCaseType);
		var artPicturegis=data[0].artPicturegis;
		var d1=document.getElementById("edit_artPicturegis");
		var img=document.createElement("img");
		img.src=artPicturegis;
		d1.appendChild(img);
	}
	$('#edit_artTitle').val(data[0].artTitle);
	
	
	//alert(artPicturegis);
	var ue2 = UE.getEditor('edit_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	
	//var ue2 = UE.getEditor('edit_artContent');
	ue2.ready(function() {		
		ue2.setContent(data[0].artContent);
		var html = ue2.getContent();
		var txt = ue2.getContentTxt();
	});
	$('#editModal').modal('show');
}
// 修改
function edit() {
	var parame = {};
	parame.articleID = $('#edit_articleID').val();
	parame.artColumn = $('#edit_artColumn').val();
	if($('#edit_artColumn').val()!="检测案例"){
		parame.artCaseType="";
		
	}else{
		parame.artCaseType = $('#edit_artCaseType').val();
	}	
	parame.artTitle = $('#edit_artTitle').val();	
	parame.artContent =UE.getEditor('edit_artContent').getContent();
	// parame.artPicturegis=$('#edit_artPicturegis').val();
	$.ajax({
		type : 'post',
		url : 'articleController/updateArticle.do',
		data : parame,
		success : function(o) {
			if (o <= 0) {
				alert("修改失败");
			}
			$('#editModal').modal('hide');
			refresh();
		}
	});
}
// 删除
function del() {
	var data = $('#table').bootstrapTable("getSelections");

	if (data.length == 0) {
		alert("请选中至少一条数据");
		return;
	}
	confirm("确认要删除这篇文章？");
	var ids = "";
	for ( var i = 0; i < data.length; i++) {
		ids += data[i].articleID + ",";
	}

	var ajaxParameter = {
		articleID : ids.substring(0, (ids.length - 1))
	};

	$.ajax({
		url : 'articleController/deleteArticleByID.do',
		data : ajaxParameter,
		success : function(o) {
			if (o <= 0) {
				alert("删除失败");
			}
			refreshWindow();
		}
	});
}

// 全部数据
function view() {
	allInfo = "all";
	$('#table').bootstrapTable('refresh', null);
}

// 查看
function showModal() {
	var data = $('#table').bootstrapTable("getSelections");
	if (data.length == 0 || data.length > 1) {
		alert("请选择一条数据");
		return;
	}
	var ue1 = UE.getEditor('show_artContent', {
		 toolbars: [[/*"fullscreen",*/"source","undo","redo","bold","italic","underline","fontborder","strikethrough","superscript","subscript","insertunorderedlist","insertorderedlist","justifyleft","justifycenter","justifyright","justifyjustify","removeformat","simpleupload",/*"snapscreen",*/"emotion",/*"attachment",*/"fontfamily", 
	                    "fontsize"]],
       initialFrameHeight :300,
        autoHeightEnabled: false,
        autoFloatEnabled: false
    });
	var artColumn = data[0].artColumn;
	var artCaseType = data[0].artCaseType;
	var artContent = data[0].artContent;
	var artPicturegis=data[0].artPicturegis;
	//var artContent =UE.getEditor('show_artContent').getPlainTxt();
	if(artColumn!="检测案例"){
		$('.show_artCaseType').hide();
		$('#show_artPicturegis').hide();
	}else{
		$('.show_artCaseTypse').show();
		$('#show_artPicturegis').show();
	}
	document.getElementById("show_artColumn")[0].innerText = artColumn;
	$("#show_artTitle").val(data[0].artTitle);
	var d1=document.getElementById("show_artPicturegis");
	var img=document.createElement("img");
	img.src=artPicturegis;
	d1.appendChild(img);
	/* src_0 = $("#img").attr("src");
     src_1 = src_0=="module/img/file/defaultPhoto.jpg"?artPicturegis:"module/img/file/defaultPhoto.jpg";
     $("#img").attr("src",src_1);*/
/*	document.getElementById("show_artPicturegis").innerHTML='<img src="artPicturegis" + height="150" width="250" />';
*/	//$("#show_artPicturegis").val(artPicturegis);
	//alert(artPicturegis);
	document.getElementById("show_artCaseType")[0].innerText = artCaseType;	

	//var ue1 = UE.getEditor('show_artContent');
	ue1.ready(function() {
		ue1.setContent(artContent);
		//var html =ue1.getPlainTxt();
	});
	$('#showModal').modal('show');
	// console.log($("#articleColumn"));
	
}

function previewImage(file,imgArea)
{	  
	  if (file.files && file.files[0])
	  {
	      var img = document.getElementById(imgArea);
	      var reader = new FileReader();
	      reader.onload = function(evt)
	      {
	    	  img.src = evt.target.result;
	      }
	      reader.readAsDataURL(file.files[0]);
	  }
	  else //兼容IE
	  {
		  var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
          file.select();
          var src = document.selection.createRange().text;
          var img = document.getElementById(imgArea);
          img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
	  }
}
