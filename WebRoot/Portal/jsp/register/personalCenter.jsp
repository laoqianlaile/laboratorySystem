<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>个人中心</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="Portal/css/register/register.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="Portal/css/comment/reset.css">
	<link rel="stylesheet" type="text/css" href="Portal/css/comment/comment.css">
	<link rel="stylesheet" type="text/css" href="module/css/uploadify.css">
	<link rel="stylesheet" type="text/css" href="module/css/fileManage/fileManage.css">
    
	<script src="module/js/jquery-2.1.1.min.js"></script>
	<script src="Portal/js/fileManage/fileManage.js"></script>
	<script src="module/js/jquery.uploadify.min.js"></script>
	<script src="module/js/bootstrap.js"></script>
	<script src="module/js/bootstrap-table.js"></script>
	<script src="module/js/bootstrap-table-zh-CN.js"></script>
	<script src="module/js/bootstrap-datetimepicker.fr.js"></script>
	<script src="module/js/bootstrap-datetimepicker.js"></script>
	<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="Portal/js/comment/comment.js"></script>
    <script type="text/javascript" src="Portal/js/register/personalCenter.js"></script>
  </head>
  
  <body>
  	  <!-- 隐藏的input -->
  	   <input type = "text" id="idCard1" name="idCard1" style="display: none" value=""></input> 
  	   <input type = "text" id ="idCard2" name="idCard2" style="display: none" value=""></input>
  	   <input type = "text" id = "name" name = "clientNo2" style="display: none;" value=<%=request.getSession().getAttribute("clientNo")%>>
  	   <input type = "text" id = "companyID" name = "companyID" style="display: none;" value="">
  	   <<input type = "password" id = "clientPassword" name = "password" style="display: none;" value="">
  	   <input type = "password" id = "clientID" name = "ID" style="display: none;" value="">
	  <div id="login_box" class="login_box">
	        <a class="close">×</a>
		    <div class="show_logo container2">
			    <a class="logo_small" href="Portal/jsp/homePage/homePage.jsp">
			    <img src="Portal/images/show_logo.png"/></a>
		    </div>
		 <form class="form-signin container2" role="form" action="#" method="post">
			<input type="text" class="form-control" id="clientNo" name="clientNo" placeholder="用户名" autocomplete="off" />
			<input type="text" class="form-control" id="password" name="password" placeholder="密码" onfocus="this.type='password'"/>
			<!--<div class="check_box">
			    <input type="checkbox" value="remember-me"> 记住密码
				<a href="Portal/jsp/register/findPassword.jsp" ><small>找回密码</small></a>
			</div>-->
		    <button class="btn btn-lg btn-block" type="button" onclick="login()">登录</button> 
		    <a href="Portal/jsp/register/findPassword.jsp" class="findPassword"><small>找回密码</small></a>
	    </form>
	  </div>
    <div id="imask"></div>
  <div class="main">
    <div class="header content">                               <!--头部图片加导航栏-->
	    <div class="logoline">
	        <a class="logo" href="Portal/jsp/homePage/homePage.jsp" ><img src="Portal/images/logo.png"/></a>
	    </div>
	    <div class="line">
	       <ul class="tittleline clearfloat">
	            <li class="item"><a class="item-inner" href="Portal/jsp/homePage/homePage.jsp">首页</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/classicCase/ClassicCase.jsp">典型案例</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/newsPage/newsPage.jsp">新闻中心</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/selfApplication/applied.jsp">自助申请</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/onlineQuery/onlineQuery.jsp">在线查询</a><span>|</span></li>
	            <li class="item"><a class="item-inner" href="Portal/jsp/aboutUs/Introduction.jsp">关于我们</a></li>
	        </ul>
	       <div class="right-linne clearfloat" id="loginDivOne">
	            <a class="register" href="Portal/jsp/register/register.jsp">注册</a>
		        <a class="h-login" href="javascript:void(0)">登录</a>
	        </div>
	        <div class="right-linne clearfloat" id="loginDivTwo" style="display: none;">
	            <p class="h-login"  onclick="logout()">注销</p>
	            <p class="register" id="loginA"></p>
	              <div class="ulDiv" id="ulDiv" style="display: none">
				   <ul>
				       <li><a href="Portal/jsp/register/personalCenter.jsp">个人信息</a></li>
				       <li><a href="Portal/jsp/register/changePassword.jsp">修改密码</a></li>
				       <li><a href="Portal/jsp/register/findPassword.jsp">找回密码</a></li>
				     </ul>
                  </div>
	        </div>
	    </div>
    </div>
    
   <div class="container">   
     <div class="title">                                                                 
         <h3>&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到个人中心:个人信息</h3>
      </div>  
     <div class="container1">
         <div class="form"> 
            <form class="form-horizontal" role="form" >
            	
            	
               <div class="form-group">
                     <label for="clientNo" class="col-sm-2 control-label"><p>账&nbsp;号</p></label>
                     <div class="col-sm-6">
                        <input type="text" class="form-control" id="clientNo1" name="clientNo1" placeholder="请输入账号" onblur="upperCase()" onclick="createInput()">
                     </div>
                      <label for="firstname1" class="col-sm-3 control-label1" id="clientNoPrompt"></label>
              </div>
        
               <div class="form-group">
                     <label for="companyID" class="col-sm-2 control-label"><p>公司名称</p></label>
                     <div class="col-sm-6">
                        <input type="text" class="form-control" id="companyName" placeholder="请输入公司名称" onblur="companyCase()" onclick="companyInput()">
                     </div>
                     <label for="firstname1" class="col-sm-3 control-label1" id="companyPrompt"></label>
              </div>
              
               <div class="form-group">
                     <label for="mobilePhone" class="col-sm-2 control-label"><p>通讯地址</p></label>
                     <div class="col-sm-6">
                        <input type="text" class="form-control" id="mobilePhone" placeholder="请输入通讯地址" onblur="mobileCase()" onclick="mobileInput()">
                     </div>
                     <label for="firstname1" class="col-sm-3 control-label1" id="mobilePrompt"></label>
              </div>
              
                <div class="form-group">
                     <label for="fixedTelephone" class="col-sm-2 control-label"><p>联系电话</p></label>
                     <div class="col-sm-6">
                        <input type="text" class="form-control" id="fixedTelephone" placeholder="请输入联系电话" onblur="fixedCase()" onclick="fixedInput()">
                     </div>
                      <label for="firstname1" class="col-sm-3 control-label1" id="fixedPrompt"></label>
              </div>
              
               <div class="form-group">
                     <label for="scope" class="col-sm-2 control-label" ><p>经营范围</p></label>
                       <div class="col-sm-6">
                        <input type="text" class="form-control" id="manage" placeholder="请输入经营范围" onblur="manageCase()" onclick="manageInput()">
                       </div>
                        <label for="firstname1" class="col-sm-3 control-label1" id="managePrompt"></label>
               </div>
               <div class="form-group">
                     <label for="linkMan" class="col-sm-2 control-label" ><p>法定代表</p></label>
                     <div class="col-sm-6">
                        <input type="text" class="form-control" id="representative" placeholder="请输入法定代表" onblur="representativeCase()" onclick="representativeInput()">
                       </div>
                        <label for="firstname1" class="col-sm-3 control-label1" id="representativePrompt"></label>
                      
              </div>
              
              
               <div class="form-group">
                     <label for="type" class="col-sm-2 control-label" maxlength="1"><p>公司类型</p></label>
                     <div class="col-sm-6">
                        <input type="text" class="form-control" id="companyType" placeholder="请输入公司类型" onblur="companyTypeCase()" onclick="companyTypeInput()">
                       </div>
                        <label for="firstname1" class="col-sm-3 control-label1" id="companyTypePrompt"></label>
                      
              </div>
              
              
	               <div class="form-group">
	                     <label for="remarks" class="col-sm-2 control-label"><p>备&nbsp;&nbsp;注</p></label>
	                     <div class="col-sm-6">
	                        <input type="text" class="form-control" id="remarks" placeholder="请输入备注">
	                     </div>
	                      <label for="firstname1" class="col-sm-3 control-label1" id="remarksPrompt"></label>
	              </div>
	              
	              
	                   
               <div class="form-group">
                     <label for="businessLicence" class="col-sm-2 control-label"><p>执照图</p></label>
                    <div class="col-sm-2"> 
                        <button class="btn btn-info" type="button" id="addmodel" onclick="openModal(1)">
						<em class="glyphicon glyphicon-plus"></em> 上传
						</button>
                     </div> 
                      <label for="firstname" class="col-sm-3 control-label1"></label>
                      <label for="firstname" class="col-sm-3 control-label1" id="licensePrompt" style="margin-left:50px;"></label>
             
              </div>
                   <img alt="执照图" src="" id="image1" style="width: 100px;height: 50px;border: 1px solid red;margin-left: 100px;margin-bottom:20px;">
	                   
	                   <div id="image_box" class="image_box">
	                     <p class="image_close" style="color:blue;float: right;font-size:60px;cursor: pointer;margin-right: 5px;">×</p>
	                     <div class="image_box1" id="image_box1">
	                        <img alt="放大的图片" src="" id="image_1">
	                     </div>
	                   </div>
                   
              <div class="form-group">
                     <label for="firstname" class="col-sm-2 control-label"><p>资质图</p></label>
                    <div class="col-sm-2"> 
                        <button class="btn btn-info" type="button" id="addmodel" onclick="openModal(2)">
						<em class="glyphicon glyphicon-plus"></em> 上传
						</button>
                     </div> 
                      <label for="firstname" class="col-sm-3 control-label1"></label>
                      <label for="firstname" class="col-sm-3 control-label1" id="aptitudePrompt" style="margin-left:50px;"></label>
              </div>
                <img alt="资质图" src="" id="image2" style="width: 100px;height: 50px;border: 1px solid red;margin-left: 100px; margin-bottom:20px;">        
	            
	         <div class="form-group"> 
				   <div class="col-sm-2 col-sm-offset-2"> 
				    <button type = "button" class="btn btn-primary btn-lg btn-block" onclick="change()">确定修改</button> 
				   </div>    
				  </div> 
              </form>
          </div>
      </div>
     <div class="container2"> <img src="Portal/images/woman_pic.png" ></div>
  </div>
         
   </div>
    <div class="footer content">    <!--尾部  -->
    <p class="btext">Copyright@2005-2006&nbsp;西南计算机软件测评中心&nbsp;&nbsp;总机：023-85681111&nbsp;传真：02385681111-8053</p>
    <p class="btext">Copyright@2005-2006&nbsp;Southwest&nbsp;Computer&nbsp;Software&nbsp;Testing&nbsp;Center,All&nbsp;Rights&nbsp;Reserved&nbsp;&nbsp;Tel:023-85681111&nbsp;Fax:023-85681111-8053</p>
    <div id="imask_2"></div>
<!-- 弹框 -->
	<div id="addModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">上传</h4>
				</div>
				<div class="modal-body">
					<input type= "hidden" id = "EMPLOYEEID" value = "<%=session.getAttribute("EMPLOYEEID")  %>" />
					<div class="row">
						<div class ="col-md-6 column">
							<label>图片名称：</label> <input type="text" id="add_TemplateName"
								name="TemplateName" class="form-control" />
						</div>
					</div>
					<div class="row">
						<div id="files">
							<div id="uploadfileQueue"></div>
							<input type="file" id="file_upload" name="file_upload"
								multiple="multiple">
							<div class="col-md-12 column">
								<label>备注信息</label>
								<textarea id="add_TemplateRemarks" name = "TemplateReamarks"class="form-control"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						onclick="javascript:$('#file_upload').uploadify('cancel','*')">取消</button>
					<button type="button" class="btn btn-primary" id="ensure"
						name="ensure" onclick="upfile();">确定</button>
				</div>
			</div>
		</div>
	</div>
</div>
<script>
    window.onload=function(){
    checsessoin();
	/*加载登陆蒙板弹窗*/
	var loginbox = document.getElementById("login_box");
	var imask = document.getElementById("imask");
	var oMask = document.getElementById("imask");
	var oVerify = document.getElementById("login_box");
	
	oMask.style.height = document.documentElement.offsetHeight + "px";
	oMask.style.width = window.innerWidth + "px";
	oVerify.style.left=(window.innerWidth - oVerify.offsetWidth)/2 + "px";
	oVerify.style.top=(window.innerHeight - oVerify.offsetHeight)/2 + "px";
	
	$(".h-login").click(function(){
	
		loginbox.style.display = "block";
		imask.style.display = "block";
		});
	
	$(".close").click(function(){
		loginbox.style.display="none";
		imask.style.display="none";
	});
	
  	
    window.addEventListener("resize", function(){
    	var strSession = '<%=session.getAttribute("clientNo")%>'.toString();
    	if(strSession == ""||strSession == "null"){
    		if(document.documentElement.offsetHeight > window.innerHeight){
            	oMask.style.height = document.documentElement.offsetHeight + "px";
        	}else{

            	oMask.style.height = window.innerHeight + "px";
        	}
        	oMask.style.width = window.innerWidth + "px";
        	oVerify.style.left=(window.innerWidth - oVerify.offsetWidth)/2 + "px";
        	oVerify.style.top=(window.innerHeight - oVerify.offsetHeight)/2 + "px";
    	}
    });
    checsessoin();
};
//判断是否有用户登录
function checsessoin()
  {
	var strSession = '<%=session.getAttribute("clientNo")%>'.toString();
    if(strSession == ""||strSession == "null")
      {
       login_box.style.display = "block";
       imask.style.display = "block";
       $("#table").html("");
       }else{
    	    table();
    	    loginbox.style.display="none";
    		imask.style.display="none";
       }
    /*  else{
  		usershowid.style.display="block";
  		usershowid.innerHTML="欢迎你："+strSession;
  		table();
  		};*/
   }
   
function logout1(){
	$.ajax({
		  url:'clientController/logout.do',
		  success:function(o){
			  if(o == 1){
				  $('#name').val("");
				  $("#table").html("");
				  window.location.reload();
			  }
			  else
				  alert("注销失败！");
		  }
		});
}
    </script>
  </body>
</html>
