<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>注册管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	 <link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
	<link rel="stylesheet" type="text/css" href="module/css/registerManage/registerManage.css">
	<style type="text/css">
	
	.input_top{
	 margin-left:20px;
	}
	.top{
	margin-buttom:20px;
	}
	#sty{
	  padding: 6px 12px;
      font-size: 14px;
      font-weight: normal;
      line-height: 1;
      color: #555;
      text-align: center;
      background-color: #eee;
      border: 1px solid #ccc;
      padding-left:2px;
      padding-right:2px;
	}
	.form_self-inline{
	  width:200px;
    display:inline;
	}
	.self_margin{
	margin-top: 5px;
    margin-bottom: 5px;
	}
	.input-self{
	width:200px;
	}
	/*#search{
	margin-left: 56px;
	}*/
	#self-company{
	margin-left: 20px;
	}
	#tableDiv{
	padding-top: 53px;
	}
	#opration_btn{
	padding-top: 48px;
    padding-left: 13px;
	}
	#tableDiv{
	  margin-top: -39px;
	}
	#businessLicence{
	margin:10px 0px;
	}
	#qulicationPic {
    margin: 16px 0px;
    }
	.self_padding{
	padding-left:0px;
	padding-right:0px;
	}
	
	.th-inner {
	height:40px;
	line-height:40px;
	padding:0px;
    background-color: #364760;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
	}
	
	.input-group-addon{
	papadd: 0 10px;
    padding: 0 10px;
    background: #fff;
    border: none;
    line-height: 32px;
    text-align: right;
    font-size: 16px;
    color: #333;
    width:100px;
	font-weight:bold;
	}

	.btn{
	margin-right:20px;
	width:106px;
	height:40px;
	padding:0px;
	}
	</style>
	
  </head>
  
  <body> 
 

<!--   <form class="bs-example bs-example-form" role="form"> -->
		<div class="col-xs-3 col-md-3">
	   <span class="input-group" >
			<span class="input-group-addon">公司名称:</span>
			<input id="companyName" type="text" class="form-control" style="width: 188px;">
		</span>
	 </div>
	 <div class="col-xs-3 col-md-3">
	        <span class="input-group" >
	          <span class="input-group-addon " id="self-company">登录名:</span>
			  <input id="clientNo"  type="text" class="form-control" style="width: 188px;">
	        </span>
	 </div>
	 <div class="col-xs-3 col-md-3">
	  <span class="input-group " >
	   <span class="input-group-addon ">审核状态:</span>
			<select id="reviewStatus" class="form-control"  style="width: 200px" onchange="changeIsTouchReviewStatus()">
              <option>全部</option>
              <option>未审核</option>
              <option>通过</option>
              <option>不通过</option>
            </select>
	  </span>
	  <div id="isTouchReviewStatus" style="display: none;"></div>
     </div>
     <div class="col-xs-3 col-md-3">
      <button class="btn btn-primary glyphicon glyphicon-search" id="search" onclick="formSearch1()">&nbsp;查询</button>
     </div>
	<!-- </form> -->
	<div  id="opration_btn" >
	<button class='btn btn-primary' onclick="registerModal()">查看</button>
	<button class='btn btn-primary' onclick="checkModal()">审核</button>
	</div>
	 <div id="tableDiv">
       <table id="table"></table> 
     </div>
     <hr/>
    
   	<!-- 查看弹框 -->
  	<div id="contactModal" class="modal fade"  role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <div class="modal-title">注册详情</div>
	      </div>
	      <div class="modal-body">
	      	<div class="row">
	      	 <div class="col-xs-6 col-md-6 ">
               <div class="col-xs-12 col-md-12 self_margin">
                         <div class="col-xs-3 col-md-3 self_padding"><label class="form_self-inline">公司名称</label></div>
                         <div class="col-xs-9 col-md-9"><input type="text" id="show_companyName" name="NAME" class="form-control form_self-inline"  aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                  <div class="col-xs-3 col-md-3 self_padding"> <label >通讯地址</label></div>
                  <div class="col-xs-9 col-md-9"><input type="text" id="address" name="REMARKS" class="form-control form_self-inline " aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>登录名</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="show_clientNo" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>密码</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="password" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>联系电话 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="phoneNumber" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>经营范围</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="scope" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>法定代表 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="legal" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>	
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>公司类型 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="type" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>备注</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="remarks" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
                <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>审核状态</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="reviewStatus1" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               
              </div>
              
               <div class="col-xs-6 col-md-6 ">
                 <img id="show_qulicationPic"  style="height:200px;width:100%;margin-top:5px;"/>
                 <img id="show_businessLicence" style="height:200px;width:100%;margin-top:60px;"/>
               </div>
             </div>
             
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary newButton" data-dismiss="modal">关闭</button>
	     <!--    <button type="button" class="btn btn-primary" onclick="add()">新增</button> -->
	      </div>
	    </div>
	  </div>
	</div>
 	
 	<!-- 审核弹框 -->
 	<div id="checkModal" class="modal fade"  role="dialog" aria-labelledby="gridSystemModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <div class="modal-title" style="text-align: center" >审核详情</div>
	      </div>
	      <div class="modal-body">
	      	<div class="row">
	      	 <div class="col-xs-6 col-md-6 ">
	      	   <div class="col-xs-12 col-md-12 self_margin">
                         <div class="col-xs-3 col-md-3 self_padding"><label class="form_self-inline">clientId</label></div>
                         <div class="col-xs-9 col-md-9"><input type="text" id="check_clientId" name="NAME" class="form-control form_self-inline"  aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                         <div class="col-xs-3 col-md-3 self_padding"><label class="form_self-inline">公司名称</label></div>
                         <div class="col-xs-9 col-md-9"><input type="text" id="check_companyName" name="NAME" class="form-control form_self-inline"  aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                  <div class="col-xs-3 col-md-3 self_padding"> <label >通讯地址</label></div>
                  <div class="col-xs-9 col-md-9"><input type="text" id="check_address" name="REMARKS" class="form-control form_self-inline " aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>登录名</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="check_clientNo" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>密码</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="check_password" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>联系电话 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="check_phoneNumber" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>经营范围</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="check_scope" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>法定代表 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="check_legal" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>	
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>公司类型 </label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="check_type" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                   <div class="col-xs-3 col-md-3 self_padding"><label>备注</label></div>
                   <div class="col-xs-9 col-md-9"><input type="text" id="check_remarks" name="REMARKS" class="form-control form_self-inline" aria-describedby="basic-addon1"/></div>
               </div>
               <div class="col-xs-12 col-md-12 self_margin">
                 <div class="col-xs-3 col-md-3 self_padding"><label>审核状态</label></div>
                  <div class="col-xs-9 col-md-9">
			      <select class="form-control" id="check_reviewStatus"  style="width: 200px">
                    <option>通过</option>
                    <option>不通过</option>
                  </select>
	             </div>
               </div>
              </div>
              
               <div class="col-xs-6 col-md-6 ">
                 <img id="check_qulicationPic" style="height:200px;width:100%;margin-top:5px;"/>
                 <img id="check_businessLicence" style="height:200px;width:100%;margin-top:60px;"/>
               </div>
             </div>
             
	      </div>
	      <div class="modal-footer">
	      <button type="button" class="btn btn-primary sure" data-dismiss="modal" onclick="updateStatus()">确认</button>
	        <button type="button" class="btn btn-primary newButton" data-dismiss="modal">关闭</button>
	      </div>
	    </div>
	  </div>
	</div>
 	
   
    </body>
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-treeview.js"></script>
    <script src="module/js/registerManage/registerManage.js" ></script>
  
</html>
