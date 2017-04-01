<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>西计实验室管理系统</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link href="module/css/bootstrap.css" rel="stylesheet">
<link href="./module/css/bootstrap-table.css" rel="stylesheet"
	type="text/css">
<link href="module/css/sampleDesktop/sampleDesktop.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script type="text/javascript" src="./module/js/bootstrap-table.js"></script>
<script type="text/javascript" src="./module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/sampleDesktop/sampleDesktop.js"></script>
<script src="assets/js/autoPage.js"></script>
<script src="module/js/sweetalert.min.js"></script>



</head>

<body>
	<div id="container">
		<div class="leftArea">
			<div class="row">
				<span index="0">当前合同编号：</span> <span index="1">XJHJ-226-14-1013-PAT</span>
			</div>
			<div class="list-button">
				<div class="row">
					<div class="sample_button sample_button_1" onclick="viewRe()">
						<img src="module/img/receiptDesktop/lookRe.png">
						<p><a href="javascript:void(0)">查看交接单</a></p>
					</div>
					<div class="sample_button sample_button_2" onclick="takeSample()">
						<img src="module/img/receiptDesktop/getSample_icon.png">
						<p><a href="javascript:void(0)">领样</a></p>
					</div>
				
					<div class="sample_button sample_button_4" onclick="addRe()">
						<img src="module/img/receiptDesktop/newReceipt_icon.png">
						<p><a href="javascript:void(0)">新增交接单</a></p>
					</div>
					<div class="sample_button sample_button_5" onclick="viewTestreport()">
						<img src="module/img/receiptDesktop/checkReport_icon.png">
						<p><a href="javascript:void(0)">查看报告列表</a></p>
					</div>
					<div class="sample_button sample_button_6">
						<img src="module/img/receiptDesktop/printReport_icon.png">
						<p><a href="javascript:void(0)">打印报告</a></p>
					</div>
					<div class="sample_button sample_button_3" onclick="takeSample()">
						<img src="module/img/receiptDesktop/withDrawSample_icon.png">
						<p><a href="javascript:void(0)">退样</a></p>
					</div>
				</div>
				<div class="row">
				<div class="sample_button sample_button_1">
						<img src="module/img/receiptDesktop/checkTestSchedule_icon.png">
						<p><a href="javascript:void(0)">查看检测进度</a></p>
					</div>
					<div class="sample_button sample_button_2" onclick="editRe()">
						<img src="module/img/receiptDesktop/updateReceipt_icon.png">
						<p><a href="javascript:void(0)">修改交接单</a></p>
					</div>
				<!-- 	<div class="sample_button sample_button_3">
						<img src="module/img/receiptDesktop/rebackSample_icon.png">
						<p><a href="javascript:void(0)">还样</a></p>
					</div> -->
					<div class="sample_button sample_button_4" onclick="sendTestreport()">
						<img src="module/img/receiptDesktop/sendReport_icon.png">
						<p><a href="module/jsp/testReportManage/testReportSendRecordManage.jsp">发报告</a></p>
					</div>
					
					<div class="sample_button sample_button_5" onclick="returnSample()">
						<img src="module/img/receiptDesktop/refundReceipt_icon.png">
						<p><a href="javascript:void(0)">退还交接单</a></p>
					</div>
					<div class="sample_button sample_button_6" onclick="addReNo()">
						<img src="module/img/receiptDesktop/noNewContract_icon.png">
						<p><a href="javascript:void(0)">无合同新增</a></p>
					</div>
				
				</div>
			</div>
			<div class="contractTable"></div>
		</div>
		<div class="RightArea">
			<div class="Right_content">
				<div class="row">
					<div class="col-xs-8 col-md-8 col-lg-8">
						<span index="0">当前文档名称：</span> <span index="1">XJHJ-226-14-1013-PAT</span>
					</div>
					<div class="col-xs-2 col-md-2 col-lg-2">
						<button class="btn btn-primary  ">查看</button>
					</div>
					<div class="col-xs-2 col-md-2 col-lg-2">
						<button class="btn btn-primary  ">下载</button>
					</div>
				</div>
				<div class="fileTable"></div>
				<div class="tidings">
					<div class="tidingHead">
					<ul>
						<li class=" selected ">提示信息</li>
						<li>已读信息</li>
					</ul>
					</div>
					<div class="tidingsTable"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
