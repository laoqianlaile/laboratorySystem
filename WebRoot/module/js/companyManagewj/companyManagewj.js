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
							sortName : 'company.ID',
							order : 'asc',
							url : 'companyController/getCompanyWithPage.do',
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
											width : '1%',
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
											field : 'companyName',// 返回值名称
											title : '公司名称',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%',// 宽度
										},
										{
											field : 'linkMan',// 返回值名称
											title : '代理人',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '10%'// 宽度
										},
										{
											field : 'mobilePhone',// 返回值名称
											title : '联系电话',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%'// 宽度
										},
										{
											field : 'address',// 返回值名称
											title : '详细地址',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '18%'// 宽度
										},{
											field : 'scope',// 返回值名称
											title : '经营范围',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%'// 宽度
										},{
											field : 'fax',// 返回值名称
											title : '传真',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%'// 宽度
										}
										,{
											field : 'emailbox',// 返回值名称
											title : '邮箱',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '8%'// 宽度
										},{
											field : 'createTime',// 返回值名称
											title : '创建时间',// 列名
											align : 'center',// 水平居中显示
											valign : 'middle',// 垂直居中显示
											width : '9%'// 宽度
										} ]
							// 列配置项,详情请查看 列参数 表格
							/* 事件 */
							});
		});
	}