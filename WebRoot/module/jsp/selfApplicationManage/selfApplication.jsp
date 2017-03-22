<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>自助申请管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/selfApplicationManage/selfApplication.css">
	
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
    <script src="module/js/selfApplication/selfApplicationManage.js" ></script>
	<!-- <link rel="stylesheet" type="text/css" href="module/css/moduleManage/moduleManage.css"> -->
	
  </head>
  
  <body> 
<!--   <form class="bs-example bs-example-form" role="form"> -->
		<div class="col-xs-3 col-md-3">
	   <span class="input-group" >
			<span class="input-group-addon">样品名称:</span>
			<input id="selfSampleName" type="text" class="form-control" style="width: 188px;">
		</span>
	 </div>
	 <div class="col-xs-3 col-md-3">
	        <span class="input-group" >
	          <span class="input-group-addon " id="self-company">公司名称:</span>
			  <input id="selfCompanyName" type="text" class="form-control" style="width: 188px;">
	        </span>
	 </div>
	 <div class="col-xs-3 col-md-3">
	  <span class="input-group " >
	   <span class="input-group-addon ">是否已联系:</span>
			<select class="form-control"  style="width: 200px" onchange="changeIsTouchReviewStatus()">
              <option>全部</option>
              <option>是</option>
              <option>否</option>
            </select>
	  </span>
	  <div id="isTouchReviewStatus" style="display: none;"></div>
     </div>
     <div class="col-xs-1 col-md-1">
      <button class="btn btn-primary glyphicon glyphicon-search" id="search" onclick="formSearch1()">&nbsp;查询</button>
     </div>
     <div class="col-xs-2 col-md-2">
       <button class="btn btn-primary" id="displayAll" onclick="displayAll()" style="margin-left:15px;">显示全部信息</button>
	</div>	
		
	<!-- </form> -->
	 <div id="tableDiv">
       <table id="table"></table> 
     </div>
     <hr/>
    
   	<!-- 联系弹框 -->
  	<div id="contactModal" class="modal fade"  role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <label class="modal-title" >申请内容详情</label>
	      </div>
	      <div class="modal-body">
	        <input type="text" id="selfApplyID" name="selfApplyID" style="display: none;"> 
	      	<div class="row">
               <div class="col-xs-12 col-md-12 self_margin">
                         <div class="col-xs-3 col-md-3"><label class="form_self-inline">公司名称</label></div>
                         <div class="col-xs-9 col-md-9"><input type="text" id="show_selfCompanyName" name="NAME" class="form-control form_self-inline"  aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                  <div class="col-xs-3 col-md-3"> <label >样品名称 </label></div>
                  <div class="col-xs-9 col-md-9"><input type="text" id="show_selfSampleName" name="REMARKS" class="form-control form_self-inline " aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3"><label>检测方法 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="selfDetection" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3"><label>联系人</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="selfContact" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3"><label>联系电话 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="selfContactPhone" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3"><label>录入日期 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="selfEntryData" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3"><label>是否已联系</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="selfHasContact" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3"><label>备注 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="selfRemork" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>	
             </div>
             
	      </div>
	      <div class="modal-footer">
    	    <button type="button" class="btn btn-primary sure" onclick="contact()">联系</button>
	        <button type="button" class="btn btn-default newButton" data-dismiss="modal">关闭</button>
	      </div>
	    </div>
	  </div>
	</div>
 	
   
    </body>
</html>
