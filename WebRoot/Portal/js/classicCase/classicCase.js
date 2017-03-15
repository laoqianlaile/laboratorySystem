//搜索案例
$("#mainsearch").typeahead();
$(document).ready(function() {
	var subjects = new Array();
	$.ajax({
		type : 'post',
		data : '',
		url : 'articleController/getArticle.do',
		success : function(msg) {
			if (msg) {
				var artTiTle = "";
				var myobj = eval(msg);
				for ( var i = 0; i < myobj.length; i++) {
					artTiTle = myobj[i].artTitle;
					subjects[i] = artTiTle;
				}
			}
		}
	});
	$('#mainsearch').typeahead({
		source : subjects
	});
});

function search() {
	var searchTitle = $("#mainsearch").val();
	window.location.href = "Portal/jsp/classicCase/CaseDetails.jsp?artTitle="
			+ searchTitle + "";
}

function queryParams(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，
	pageReqeust.artTitle = "null";
	pageReqeust.artColumn = "null";
	pageReqeust.artPublisher = "null";
	pageReqeust.artCaseType = encodeURI("典型案例");
	return pageReqeust;
}
// 表格初始化
$(function() {
	$('#midTable')
			.bootstrapTable(
					{
						height : '500',// 定义表格的高度
						pagination : true,// 在表格底部显示分页条
						classes : 'table table-hover table-condensed table-striped table-no-bordered',
						clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和
												// checkbox
						singleSelect : true,
						pageSize :3,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [3,5,10],// 设置可供选择的页面数据条数
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'articleID',// 定义排序列
						sortOrder : 'asc',// 定义排序方式
						url : 'articleController/getArticleWithPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						contentType : 'application/json',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : queryParams,// 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						/* onClickRow:onClickRow, */

						selectItemName : '',// radio or checkbox 的字段名//设置True
											// 将禁止多选
						showHeader : false,
						columns : [
								{
									field : 'articleID',
									align : 'left',
									visible : false,
								},
								{
									field : 'imgUrl',
									align : 'center',
									width : '3',
									formatter : function(value, row, index) {
										return '<img  src="Portal/images/point_triangle.png" class="img-rounded" >';
									}
								}, {
									field : 'artTitle',
									align : 'left',
								}, {
									field : 'artCregisattime',
									width : '150',
									align : 'right',
								} ],
						onClickRow : function(row) {
							var articleID = row.articleID;
							window.location.href = "Portal/jsp/classicCase/CaseDetails.jsp?articleID="
									+ articleID + "";
						}
					});
});

function queryParams2(pageReqeust) {
	pageReqeust.pageNo = this.offset;
	pageReqeust.pageSize = this.pageNumber;
	pageReqeust.length = 6;
	// 直接获取form表单的值，如果一直刷新页面，每次获取的值必定为空，
	pageReqeust.artTitle = "null";
	pageReqeust.artColumn = "null";
	pageReqeust.artPublisher = "null";
	pageReqeust.artCaseType = encodeURIComponent('案例');
	return pageReqeust;
}
// 表格初始化
$(function() {
	$('#rigTable')
			.bootstrapTable(
					{
						height : '500',// 定义表格的高度
						pagination : true,// 在表格底部显示分页条
						classes : 'table table-hover table-condensed able-striped table-no-bordered',
						clickToSelect : true, // 设置true 将在点击行时，自动选择rediobox 和
												// checkbox
						striped : true,   // 隔行变色效果
						singleSelect : true,
						pageSize : 3,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [3,5,10],// 设置可供选择的页面数据条数
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'artClick',// 定义排序列
						sortOrder : 'desc',// 定义排序方式
						url : 'articleController/getArticleWithPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						contentType : 'application/json',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : queryParams2,// 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
						selectItemName : '',// radio or checkbox 的字段名//设置True
											// 将禁止多选
						showHeader : false,
						columns : [
								{
									field : 'imgUrl',
									align : 'center',
									width : '1',
									formatter : function(value, row, index) {
										return '<img  src="Portal/images/point_triangle.png" class="img-rounded" >';
									}
								}, {
									field : 'artTitle',
									align : 'left',
								} ],
						onClickRow : function(row) {
							var articleID = row.articleID;
							window.location.href = "Portal/jsp/classicCase/CaseDetails.jsp?articleID="
									+ articleID + "";
						}
					});
});