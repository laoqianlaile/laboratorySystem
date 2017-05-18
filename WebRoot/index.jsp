<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>西计实验室管理系统</title>
<!-- basic styles -->
<link href="assets/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="assets/css/font-awesome.min.css" />
<link rel="stylesheet" href="assets/css/font-awesome-4.7.min.css" />
<link rel="stylesheet" href="assets/css/font-OpenSans.css" />
<link rel="stylesheet" href="assets/css/ace.min.css" />
<link rel="stylesheet" href="assets/css/ace-rtl.min.css" />
<link rel="stylesheet" href="assets/css/ace-skins.min.css" />
<link rel="stylesheet" type="text/css" href="module/css/fontello.css" />
<link rel="stylesheet" type="text/css" href="module/css/fontello-7275ca86/css/fontello.css" />
<link rel="stylesheet" type="text/css" href="module/css/index/index.css" />

<link href="module/css/bootstrap-treeview.css" rel="stylesheet">
<script src="assets/js/ace-extra.min.js"></script>
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
					<a href="#" class="navbar-brand">
						<img src="module/img/logo.png" alt="logo" height="20px" class="navbar-logo"/>
						<img src="module/img/systemName.png" alt="systemName" height="23px" style="margin-left: 45px;"/>
					</small>
					</a>
				</div>
				<div class="navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav" style="float:right;">
						<li class="light-blue"><a data-toggle="dropdown" href="#"
							class="dropdown-toggle"> <img class="nav-user-photo"
								src="assets/avatars/user.jpg" alt="Jason's Photo" /> <span
								class="user-info"> 
								<%if(request.getSession().getAttribute("EMPLOYEENAME") == null || 
								request.getSession().getAttribute("EMPLOYEEID") == null||
								request.getSession().getAttribute("EMPLOYEENAME").equals("")||
								request.getSession().getAttribute("EMPLOYEEID").equals("")){ %>
									<small>请先登录！</small> 
										</span> <i class="icon-caret-down"></i>
							<ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li onclick = "login()"><a href="./login.jsp"> <i class="glyphicon glyphicon-log-in"></i> 登录</a></li>
							</ul>
								<%}
								else{%>
									<small>欢迎光临,</small> <%=request.getSession().getAttribute("EMPLOYEENAME")%>
									<input type="hidden" id="LoginID" value="<%=request.getSession().getAttribute("EMPLOYEEID")%>"/>
							</span> <i class="fa fa-caret-down"></i>
								<ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li onclick = "openEditpwd()"><a> <i class="icon-cog"></i> 修改密码</a></li>
								<li ><a target="aa" href="module/jsp/setting/personalData.jsp"><i class="icon-user"></i> 个人资料</a> </li>
							</ul>
							<%}%>
						</li>
					</ul>
					<!-- /.ace-nav -->
					<div class="navbar-cancel" onclick="exit()">
						<a href="#">
							<img src="module/img/cancel_icon.png" alt="注销" />&nbsp;注销
						</a>
					</div>
					<div class="navbar-date-info">
						<span class="year"></span>年
						<span class="month"></span>月
						<span class="day"></span>日&nbsp;&nbsp;
						<span class="week"></span>&nbsp;&nbsp;
						<span class="season"></span>&nbsp;&nbsp;
						<span class="time"></span>
					</div>
					
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
					
					<!-- 左边菜单栏上面的头像区域 -->
					<div class="sidebar-header" id="sidebar-header">
						<div class="avatar">
							<img src="module/img/person.png" alt="头像" width="80" height="80"/>
						</div>
						<span class="name"><%=request.getSession().getAttribute("EMPLOYEENAME")%><span>&nbsp;,&nbsp;您好！</span></span>
					</div>
					<!-- #sidebar-shortcuts -->
					
					<!--  左边菜单栏树-->
					<ul class="nav nav-list">
						<label for="tree"></label>
						<div class="tree"></div>
					</ul>
					<!-- 左边菜单栏下面，右藏功能 -->
					<!-- <div class="sidebar-collapse" id="sidebar-collapse">
						<i class="icon-angle-double-left"
							data-icon1="icon-angle-double-left"
							data-icon2="icon-angle-double-right"></i>
					</div> -->
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
						<img src="module/img/position_icon.png" width="14" alt="position_icon" style="margin-left: 10px;"/>
						<span>&nbsp;你的当前位置为：</span>
						<ul class="breadcrumb">
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
					</div>


				<!-- 	<div class="alert alert-block alert-success">
						<button type="button" class="close" data-dismiss="alert">
							<i class="fa fa-remove"></i>
						</button>
						<i class="icon-ok green"></i> 欢迎使用 <strong class="green">
							西计后台管理系统 <small>(v1.2)</small>
						</strong> ,轻量级好用的后台管理系统.
					</div> -->
					<div class="col-xs-12-w">
						<div class="datagrid">
							<iframe id="content_frame" name="aa"  height="500px"
								frameborder=0 scrolling=auto src="./welcome.jsp"></iframe>
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
				class="fa fa-angle-double-up fa-only bigger-110"></i>
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
		<script src="assets/js/flot/jquery.flot.min.js"></script><!--  -->
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
									});
						});
					})(jQuery);
		</script>
		<div style="display:none">
			<!-- <script src='http://v7.cnzz.com/stat.php?id=155540&web_id=155540'
				language='JavaScript' charset='gb2312'></script> -->
			<!-- 隐藏掉 -->
		</div>
	</div>
	<!--个人信息弹窗 -->
	<div id="PersonalModal" class="modal fade"">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">个人资料</h4>
				</div>
				<div class="modal-body">
					<div class="row" id="edit">
						<input type="hidden" id="edit_accountsID" name="accountsID"/>
						<div class ="col-xs-6 col-md-6">
							<label>姓名:</label>
							<input type="text" id="edit_Name" name="Name" class="form-control"/>
						</div>
						<div class ="col-xs-6 col-md-6">
							<label>所属部门：</label>
							<input type="text" id="edit_department" name="department" class="from-control" disabled="disabled"/>
						</div>
						<div class ="col-xs-6 col-md-6">
							<label>能力等级：</label>
							<input type="text" id="edit_level" name="level" class="from-control" disabled="disabled"/>
						</div>
						<div class ="col-xs-6 col-md-6">
							<label>职务名称：</label>
							<input type="text" id="edit_duty" name="duty" class="from-control" disabled="disabled"/>
						</div>
						<div id = "edit_sex" class ="col-xs-6 col-md-6">
							<label>性别:</label>
							<input type="radio"   name ="sex" value="0"/>女
							<input type="radio"   name ="sex" value="1"/>男
						</div>
						<div class ="col-xs-6 col-md-6">
							<label>手机号：</label>
							<input type="text" id="edit_phone" name="phone" class="from-control"/>
						</div>
						<div class ="col-xs-6 col-md-6">
							<label>邮箱：</label>
							<input type="text" id="edit_email" name="email" class="from-control"/>
						</div>
						<div class ="col-xs-6 col-md-6">
							<label>地址：</label>
							<input type="text" id="edit_address" name="address" class="from-control"/>
						</div>
						
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="editInfo()">确认</button>
				</div>
			</div>
		</div>
	</div>
	
	<!--密码修改-->
	<div id="editpwdModal" class="modal fade"">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="  close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">密码修改</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class ="col-xs-12 col-md-12">
							<div class ="col-xs-3 col-md-3">
								<label>旧密码</label>
							</div>
							<div class ="col-xs-6 col-md-6">
								<input type="password" id="old_pwd" name="pwd" required="required"  class="form-control"/>
							</div>
							<div id="oldpwd_error" class ="col-xs-3 col-md-3" style="display: none">
								<span style="color:red;">密码错误，请确认无误</span>
							</div>
						</div>
						<div class ="col-xs-12 col-md-12">
							<div class ="col-xs-3 col-md-3">
								<label>新密码</label>
							</div>
							<div class ="col-xs-6 col-md-6">
								<input type="password" id="new_pwd" name="newpwd"  required="required"  class="form-control" oninput="changePwd()"
									onpropertychange="changePwd()"/>
							</div> 
							<div id="newpwd_tip" class="col-xs-3 col-md-3" style="display: none">
								<span style="color:red;">至少6位或至多12位</span>
							</div>
							<div id="newpwd_ok" class ="col-xs-3 col-md-3" style="display: none">
								<i class="glyphicon glyphicon-ok" style="color: rgb(0, 220, 229);"></i>
							</div>
						</div>
						<div class ="col-xs-12 col-md-12">
							<div class ="col-xs-3 col-md-3">
								<label>确认密码</label>
							</div>
							<div class ="col-xs-6 col-md-6">
								<input type="password" id="current_pwd" name="currentpwd" required="required" class="form-control" oninput="currentPwd()"
									onpropertychange="currentPwd()"/>
							</div>
							<div id="currentpwd_tip" class="col-xs-3 col-md-3" style="display: none">
								<span style="color:red;">密码不一致</span>
							</div>
							<div id="currentpwd_ok" class ="col-xs-3 col-md-3" style="display: none">
									<i class="glyphicon glyphicon-ok" style="color: rgb(0, 220, 229);"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="editPwd()">确认</button>
				</div>
			</div>
		</div>
	</div>
<!--<div class="signature">
		<label>电子签名:</label>
	    <img id="Img1"  src="module/img/file/defaultPhoto.jpg"
			data-holder-rendered="true"/>
			
		 <input class="singnatureImg"
			type="file" name="files" id="files" onchange="previewImage(this,'Img1')"
			accept="image/png, image/gif, image/jpg, image/jpeg"
			style="width:66px;height:25px;position:absolute;left:10px;top:155px;opacity: 0;filter: alpha(opacity = 0);" />
       
	</div>
	<div class="stamp">
		<label>电子盖章:</label>
		 <img id="Img2"  src="module/img/file/defaultPhoto.jpg"
			data-holder-rendered="true""/>
		<input class="stampImg" type="file" name="files" id="files" onchange="previewImage(this,'Img2')"
			accept="image/png, image/gif, image/jpg, image/jpeg" 
			style="width:66px;height:25px;position:absolute;left:10px;top:155px;opacity: 0;filter: alpha(opacity = 0);" />
	</div> -->
	
	<script src="module/js/index/index.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
	<script src="module/js/testReportManage/testReportManage.js"></script>
	<script src="module/js/fileManage/fileManage.js"></script>
	<script type="text/javascript" src="assets/fileupload/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="assets/fileupload/jquery.ui.widget.js"></script> 
    <script type="text/javascript"src="assets/fileupload/jquery.fileupload.js"></script>
	<!-- 	<script src="module/js/bootstrap-treeview.min.js"></script> -->


<script>
	$('#Img1').on('click', function() {
		$('.singnatureImg').click();
	});
	</script>
</body>
</html>
