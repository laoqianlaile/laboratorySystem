<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- basic styles -->
<link href="assets/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="assets/css/font-awesome.min.css" />

<!-- <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" /> -->
<link rel="stylesheet" href="assets/css/font-OpenSans.css" />
<link rel="stylesheet" href="assets/css/ace.min.css" />
<link rel="stylesheet" href="assets/css/ace-rtl.min.css" />
<link rel="stylesheet" href="assets/css/ace-skins.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/fontello.css" />
<link rel="stylesheet" type="text/css" href="module/css/fontello-7275ca86/css/fontello.css" />
<link href="module/css/bootstrap-treeview.css" rel="stylesheet">
<!-- <link href="module/css/bootstrap.css" rel="stylesheet">
<link href="module/css/bootstrap.min.css" rel="stylesheet"> -->
<script src="assets/js/ace-extra.min.js"></script>
<style type="text/css">
.contairw {
	min-width: 1300px;
}

.sidebar {
	/* width: 190px;
	float: left;
	height: 100%;
	position: absolute;

	border: 1px solid #ccc;
	border-width: 0 1px 0 0;
	background-color: #f2f2f2; */
	top: 45px;
}

.sidebar.display {
	/* display: block;
	padding-bottom: 0; */
	
}

.sidebar-shortcuts {
	/*  margin-top: 45px; */
	
}

.page-header {
	height: 50px;
}

.ace-settings-container {
	top: 90px;
}

.treeview {
	margin-top: -21px;
	margin-bottom: -20px;
}

.list-group {
	margin-left: 0px;
	padding-left: 0;
}

#navName {
	font-size: 22px;
}
/* .tree {
    min-height:20px;
    padding:19px;
    margin-bottom:20px;
    background-color:#fbfbfb;
    border:1px solid #999;
    -webkit-border-radius:4px;
    -moz-border-radius:4px;
    border-radius:4px;
    -webkit-box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.05);
    -moz-box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow:inset 0 1px 1px rgba(0, 0, 0, 0.05)
}
.tree li {
    list-style-type:none;
    margin:0;
    padding:10px 5px 0 5px;
    position:relative
}
.tree li::before, .tree li::after {
    content:'';
    left:-20px;
    position:absolute;
    right:auto
}
.tree li::before {
    border-left:1px solid #999;
    bottom:50px;
    height:100%;
    top:0;
    width:1px
}
.tree li::after {
    border-top:1px solid #999;
    height:20px;
    top:25px;
    width:25px
}
.tree li span {
    -moz-border-radius:5px;
    -webkit-border-radius:5px;
    border:1px solid #999;
    border-radius:5px;
    display:inline-block;
    padding:3px 8px;
    text-decoration:none
}
.tree li.parent_li>span {
    cursor:pointer
}
.tree>ul>li::before, .tree>ul>li::after {
    border:0
}
.tree li:last-child::before {
    height:30px
}
.tree li.parent_li>span:hover, .tree li.parent_li>span:hover+ul li span {
    background:#eee;
    border:1px solid #94a0b4;
    color:#000
} */
</style>

</head>

<body>
	<div class="contairw">
		<!--  标题栏logo -->
		<div class="navbar navbar-default" id="navbar">
			<script type="text/javascript">
				try {
					ace.settings.check('navbar', 'fixed')
				} catch (e) {
				}
			</script>

			<div class="navbar-container" id="navbar-container">
				<div class="navbar-header pull-left">
					<a href="#" class="navbar-brand"> <small> <i
							class="icon-leaf"></i> 西计后台管理系统
					</small>
					</a>
				</div>
				<div class="navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">

						<li class="light-blue"><a data-toggle="dropdown" href="#"
							class="dropdown-toggle"> <img class="nav-user-photo"
								src="assets/avatars/user.jpg" alt="Jason's Photo" /> <span
								class="user-info"> <small>欢迎光临,</small> Jason
							</span> <i class="icon-caret-down"></i>
						</a>

							<ul
								class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li><a href="#"> <i class="icon-cog"></i> 设置
								</a></li>

								<li><a href="#"> <i class="icon-user"></i> 个人资料
								</a></li>

								<li class="divider"></li>

								<li><a href="#"> <i class="icon-off"></i> 退出
								</a></li>
							</ul></li>
					</ul>
					<!-- /.ace-nav -->
				</div>
				<!-- /.navbar-header -->
			</div>
		</div>
		<!-- 下面整体部分 -->
		<div class="main-container" id="main-container">
			<!-- 设置整体部分样式 -->
			<script type="text/javascript">
				try {
					ace.settings.check('main-container', 'fixed')
				} catch (e) {
				}
			</script>
			<!-- 设置整体部分-->
			<div class="main-container-inner">
				<!-- 菜单栏隐藏时候出现的工具 -->
				<a class="menu-toggler" id="menu-toggler" href="#"> <span
					class="menu-text"></span>
				</a>
				<!-- 左边菜单栏 -->
				<div class="sidebar" id="sidebar">
					<script type="text/javascript">
						try {
							ace.settings.check('sidebar', 'fixed')
						} catch (e) {
						}
					</script>
					<!-- 左边菜单栏上面的图标区域 -->
					<div class="sidebar-shortcuts" id="sidebar-shortcuts">
						<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
							<button class="btn btn-success">
								<i class="icon-signal"></i>
							</button>

							<button class="btn btn-info">
								<i class="icon-pencil"></i>
							</button>

							<button class="btn btn-warning">
								<i class="icon-group"></i>
							</button>

							<button class="btn btn-danger">
								<i class="icon-cogs"></i>
							</button>
						</div>

						<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
							<span class="btn btn-success"></span> <span class="btn btn-info"></span>

							<span class="btn btn-warning"></span> <span
								class="btn btn-danger"></span>
						</div>
					</div>
					<!-- #sidebar-shortcuts -->
					<!--  左边菜单栏树-->
					<ul class="nav nav-list">
						<label for="tree"></label>
						<div class="tree"></div>
						<li><a href="module/jsp/roleManage/roleManage.jsp"
							target="aa"> <i class="icon-dashboard"></i> <span
								class="menu-text">角色管理 </span>
						</a></li>

						<li><a href="typography.html" target="aa"> <i
								class="icon-text-width"></i> <span class="menu-text">
									部门管理 </span>
						</a></li>

						<li><a href="module/jsp/fileManage/fileManage.jsp"
							target="aa"> <i class="icon-text-width"></i> <span
								class="menu-text"> 文件管理 </span>
						</a></li>

						<li><a href="module/jsp/standardManage/standard.jsp"
							class="dropdown-toggle" target="aa"> <i class="icon-desktop"></i>
								<span class="menu-text"> 标准管理 </span>
						</a></li>
						<li><a href="www.baidu.com" class="dropdown-toggle"
							target="aa"> <i class="icon-desktop"></i> <span
								class="menu-text"> 权限分配 </span>
						</a></li>

						<li><a
							href="module/jsp/permissionAssign/permissionAssign.jsp"
							target="aa"> <i class="icon-desktop"></i> <span
								class="menu-text">角色权限分配管理 </span>
						</a></li>
						<li><a href="module/jsp/sampleRoom/sampleRoom.jsp"
							target="aa"> <i class="icon-desktop"></i> <span
								class="menu-text">样品库管理</span>
						</a></li>
						<li><a
							href="module/jsp/receiptlistManage/receiptlistManage.jsp"
							target="aa"> <i class="icon-desktop"></i> <span
								class="menu-text">交接单管理</span>
						</a></li>
						<li><a
							href="module/jsp/moduleManage/moduleManage.jsp"
							target="aa"> <i class="icon-desktop"></i> <span
								class="menu-text">模块管理</span>
						</a></li>
 

					</ul>
					<!-- 左边菜单栏下面，右藏功能 -->
					<div class="sidebar-collapse" id="sidebar-collapse">
						<i class="icon-double-angle-left"
							data-icon1="icon-double-angle-left"
							data-icon2="icon-double-angle-right"></i>
					</div>

					<script type="text/javascript">
						try {
							ace.settings.check('sidebar', 'collapsed')
						} catch (e) {
						}
					</script>
				</div>
				<!-- 文中主体  -->
				<div class="main-content">
					<div class="breadcrumbs" id="breadcrumbs">
						<script type="text/javascript">
							try {
								ace.settings.check('breadcrumbs', 'fixed')
							} catch (e) {
							}
						</script>

						<ul class="breadcrumb">
							<li><i class="icon-home home-icon"></i> <a href="#">首页</a></li>
							<li class="active">角色</li>
						</ul>

						<div class="nav-search" id="nav-search">
							<form class="form-search">
								<span class="input-icon"> <input type="text"
									placeholder="Search ..." class="nav-search-input"
									id="nav-search-input" autocomplete="off" /> <i
									class="icon-search nav-search-icon"></i>
								</span>
							</form>
						</div>
						<!-- #nav-search -->
					</div>

					<!-- 	<div class="page-content"> -->
					<div class="page-header">
						<h1>
							<label id="navName">角色</label> <small> <i
								class="icon-double-angle-right"></i> <label>查看</label>
							</small>
						</h1>
					</div>


					<div class="alert alert-block alert-success">
						<button type="button" class="close" data-dismiss="alert">
							<i class="icon-remove"></i>
						</button>

						<i class="icon-ok green"></i> 欢迎使用 <strong class="green">
							西计后台管理系统 <small>(v1.2)</small>
						</strong> ,轻量级好用的后台管理系统.
					</div>
					<div class="col-xs-12">
						<div class="datagrid">
							<iframe id="content_frame" name="aa" width=100% height=800
								frameborder=0 scrolling=auto></iframe>
						</div>
					</div>

				</div>
				<!-- 右边界面设置区域 -->
				<div class="ace-settings-container" id="ace-settings-container">
					<div class="btn btn-app btn-xs btn-warning ace-settings-btn"
						id="ace-settings-btn">
						<i class="icon-cog bigger-150"></i>
					</div>

					<div class="ace-settings-box" id="ace-settings-box">
						<div>
							<div class="pull-left">
								<select id="skin-colorpicker" class="hide">
									<option data-skin="default" value="#438EB9">#438EB9</option>
									<option data-skin="skin-1" value="#222A2D">#222A2D</option>
									<option data-skin="skin-2" value="#C6487E">#C6487E</option>
									<option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
								</select>
							</div>
							<span>&nbsp; 选择皮肤</span>
						</div>

						<div>
							<input type="checkbox" class="ace ace-checkbox-2"
								id="ace-settings-navbar" /> <label class="lbl"
								for="ace-settings-navbar"> 固定导航条</label>
						</div>

						<div>
							<input type="checkbox" class="ace ace-checkbox-2"
								id="ace-settings-sidebar" /> <label class="lbl"
								for="ace-settings-sidebar"> 固定滑动条</label>
						</div>

						<div>
							<input type="checkbox" class="ace ace-checkbox-2"
								id="ace-settings-breadcrumbs" /> <label class="lbl"
								for="ace-settings-breadcrumbs">固定面包屑</label>
						</div>

						<div>
							<input type="checkbox" class="ace ace-checkbox-2"
								id="ace-settings-rtl" /> <label class="lbl"
								for="ace-settings-rtl">切换到左边</label>
						</div>

						<div>
							<input type="checkbox" class="ace ace-checkbox-2"
								id="ace-settings-add-container" /> <label class="lbl"
								for="ace-settings-add-container"> 切换窄屏 <b></b>
							</label>
						</div>
					</div>
				</div>
				<!-- /#ace-settings-container -->
			</div>
			<!-- /.main-container-inner -->
			<!-- 设置整体部分-->
			<a href="#" id="btn-scroll-up"
				class="btn-scroll-up btn btn-sm btn-inverse"> <i
				class="icon-double-angle-up icon-only bigger-110"></i>
			</a>
		</div>
		<!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->

		<!-- <script
			src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script> -->
		<!-- 隐藏掉 -->

		<!-- <![endif]-->

		<!--[if IE]>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<![endif]-->

		<!--[if !IE]> -->

		<script type="text/javascript">
			window.jQuery
					|| document
							.write("<script src='assets/js/jquery-2.0.3.min.js'>"
									+ "<"+"script>");
		</script>

		<!-- <![endif]-->

		<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='assets/js/jquery-1.10.2.min.js'>"+"<"+"script>");
</script>
<![endif]-->

		<script type="text/javascript">
			if ("ontouchend" in document)
				document
						.write("<script src='assets/js/jquery.mobile.custom.min.js'>"
								+ "<"+"script>");
		</script>
		<script src="assets/js/bootstrap.min.js"></script>
		<script src="assets/js/typeahead-bs2.min.js"></script>

		<!-- page specific plugin scripts -->

		<!--[if lte IE 8]>
		  <script src="assets/js/excanvas.min.js"></script>
		<![endif]-->

		<script src="assets/js/jquery-ui-1.10.3.custom.min.js"></script>
		<script src="assets/js/jquery.ui.touch-punch.min.js"></script>
		<script src="assets/js/jquery.slimscroll.min.js"></script>
		<script src="assets/js/jquery.easy-pie-chart.min.js"></script>
		<script src="assets/js/jquery.sparkline.min.js"></script>
		<script src="assets/js/flot/jquery.flot.min.js"></script>
		<script src="assets/js/flot/jquery.flot.pie.min.js"></script>
		<script src="assets/js/flot/jquery.flot.resize.min.js"></script>

		<!-- ace scripts -->

		<script src="assets/js/ace-elements.min.js"></script>
		<script src="assets/js/ace.min.js"></script>
		<script src="module/js/index/index.js"></script>
		<!-- inline scripts related to this page -->

		<script type="text/javascript">
			jQuery(
					function($) {
						$('.easy-pie-chart.percentage')
								.each(
										function() {
											var $box = $(this).closest(
													'.infobox');
											var barColor = $(this)
													.data('color')
													|| (!$box
															.hasClass('infobox-dark') ? $box
															.css('color')
															: 'rgba(255,255,255,0.95)');
											var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)'
													: '#E2E2E2';
											var size = parseInt($(this).data(
													'size')) || 50;
											$(this)
													.easyPieChart(
															{
																barColor : barColor,
																trackColor : trackColor,
																scaleColor : false,
																lineCap : 'butt',
																lineWidth : parseInt(size / 10),
																animate : /msie\s*(8|7|6)/
																		.test(navigator.userAgent
																				.toLowerCase()) ? false
																		: 1000,
																size : size
															});
										})

						$('.sparkline')
								.each(
										function() {
											var $box = $(this).closest(
													'.infobox');
											var barColor = !$box
													.hasClass('infobox-dark') ? $box
													.css('color')
													: '#FFF';
											$(this)
													.sparkline(
															'html',
															{
																tagValuesAttribute : 'data-values',
																type : 'bar',
																barColor : barColor,
																chartRangeMin : $(
																		this)
																		.data(
																				'min') || 0
															});
										});

						var placeholder = $('#piechart-placeholder').css({
							'width' : '90%',
							'min-height' : '150px'
						});
						var data = [ {
							label : "social networks",
							data : 38.7,
							color : "#68BC31"
						}, {
							label : "search engines",
							data : 24.5,
							color : "#2091CF"
						}, {
							label : "ad campaigns",
							data : 8.2,
							color : "#AF4E96"
						}, {
							label : "direct traffic",
							data : 18.6,
							color : "#DA5430"
						}, {
							label : "other",
							data : 10,
							color : "#FEE074"
						} ]
						function drawPieChart(placeholder, data, position) {
							$.plot(placeholder, data, {
								series : {
									pie : {
										show : true,
										tilt : 0.8,
										highlight : {
											opacity : 0.25
										},
										stroke : {
											color : '#fff',
											width : 2
										},
										startAngle : 2
									}
								},
								legend : {
									show : true,
									position : position || "ne",
									labelBoxBorderColor : null,
									margin : [ -30, 15 ]
								},
								grid : {
									hoverable : true,
									clickable : true
								}
							})
						}
						drawPieChart(placeholder, data);

						/**
						we saved the drawing function and the data to redraw with different position later when switching to RTL mode dynamically
						so that's not needed actually.
						 */
						placeholder.data('chart', data);
						placeholder.data('draw', drawPieChart);

						var $tooltip = $(
								"<div class='tooltip top in'><div class='tooltip-inner'></div></div>")
								.hide().appendTo('body');
						var previousPoint = null;

						placeholder.on('plothover', function(event, pos, item) {
							if (item) {
								if (previousPoint != item.seriesIndex) {
									previousPoint = item.seriesIndex;
									var tip = item.series['label'] + " : "
											+ item.series['percent'] + '%';
									$tooltip.show().children(0).text(tip);
								}
								$tooltip.css({
									top : pos.pageY + 10,
									left : pos.pageX + 10
								});
							} else {
								$tooltip.hide();
								previousPoint = null;
							}

						});

						var d1 = [];
						for (var i = 0; i < Math.PI * 2; i += 0.5) {
							d1.push([ i, Math.sin(i) ]);
						}

						var d2 = [];
						for (var i = 0; i < Math.PI * 2; i += 0.5) {
							d2.push([ i, Math.cos(i) ]);
						}

						var d3 = [];
						for (var i = 0; i < Math.PI * 2; i += 0.2) {
							d3.push([ i, Math.tan(i) ]);
						}

						var sales_charts = $('#sales-charts').css({
							'width' : '100%',
							'height' : '220px'
						});
						$.plot("#sales-charts", [ {
							label : "Domains",
							data : d1
						}, {
							label : "Hosting",
							data : d2
						}, {
							label : "Services",
							data : d3
						} ], {
							hoverable : true,
							shadowSize : 0,
							series : {
								lines : {
									show : true
								},
								points : {
									show : true
								}
							},
							xaxis : {
								tickLength : 0
							},
							yaxis : {
								ticks : 10,
								min : -2,
								max : 2,
								tickDecimals : 3
							},
							grid : {
								backgroundColor : {
									colors : [ "#fff", "#fff" ]
								},
								borderWidth : 1,
								borderColor : '#555'
							}
						});

						$('#recent-box [data-rel="tooltip"]').tooltip({
							placement : tooltip_placement
						});
						function tooltip_placement(context, source) {
							var $source = $(source);
							var $parent = $source.closest('.tab-content')
							var off1 = $parent.offset();
							var w1 = $parent.width();

							var off2 = $source.offset();
							var w2 = $source.width();

							if (parseInt(off2.left) < parseInt(off1.left)
									+ parseInt(w1 / 2))
								return 'right';
							return 'left';
						}

						$('.dialogs,.comments').slimScroll({
							height : '300px'
						});

						//Android's default browser somehow is confused when tapping on label which will lead to dragging the task
						//so disable dragging when clicking on label
						var agent = navigator.userAgent.toLowerCase();
						if ("ontouchstart" in document
								&& /applewebkit/.test(agent)
								&& /android/.test(agent))
							$('#tasks').on(
									'touchstart',
									function(e) {
										var li = $(e.target).closest(
												'#tasks li');
										if (li.length == 0)
											return;
										var label = li.find('label.inline')
												.get(0);
										if (label == e.target
												|| $.contains(label, e.target))
											e.stopImmediatePropagation();
									});

						$('#tasks').sortable({
							opacity : 0.8,
							revert : true,
							forceHelperSize : true,
							placeholder : 'draggable-placeholder',
							forcePlaceholderSize : true,
							tolerance : 'pointer',
							stop : function(event, ui) {//just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
								$(ui.item).css('z-index', 'auto');
							}
						});
						$('#tasks').disableSelection();
						$('#tasks input:checkbox').removeAttr('checked').on(
								'click',
								function() {
									if (this.checked)
										$(this).closest('li').addClass(
												'selected');
									else
										$(this).closest('li').removeClass(
												'selected');
								});

					})
		</script>
		<script type="text/javascript">
			(
					function($) {
						var mainContentView = "";
						var allNavNode = $(".nav-list li a");
						allNavNode.each(function() {
							$(this).click(
									function() {
										mainContentView = $(this).attr("href");
										$("#content_frame").attr("src",
												mainContentView);
										$("#navName").text(
												$(this).find("span").html());
										$(".main-content .breadcrumb .active")
												.html(
														$(this).find("span")
																.html());
									})
						});
					})(jQuery)
		</script>
		<div style="display:none">
			<!-- <script src='http://v7.cnzz.com/stat.php?id=155540&web_id=155540'
				language='JavaScript' charset='gb2312'></script> -->
			<!-- 隐藏掉 -->
		</div>
	</div>

	<script src="module/js/bootstrap-treeview.js"></script>
	<!-- 	<script src="module/js/bootstrap-treeview.min.js"></script> -->
	<script src="module/js/index/index.js"></script>
</body>
</html>

