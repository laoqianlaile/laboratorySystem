package com.cqut.xiji.service.handleInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class HandleInterceptor implements  HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
		   System.out.println("==============执行顺序: 1、preHandle================");
		// TODO Auto-generated method stub
              
            String requestUri = request.getRequestURI();   //获取全路径
            String contextPath = request.getContextPath();  
            String url = requestUri.substring(contextPath.length());  
            
            String userID =  (String)request.getSession().getAttribute("EMPLOYEEID");    //获取用户
            if(userID == null){  
            	System.out.println("Interceptor：跳转到login页面！");  
                request.getRequestDispatcher("/login.jsp").forward(request, response);  
                return false;  
            }else  
                return true;   
            
            
            /*    System.out.println("requestUri:"+requestUri);    
            System.out.println("contextPath:"+contextPath);    
            System.out.println("url:"+url);    */
              
          
            //判断url是否是公开地址（实际使用时将公开地址配置配置文件中）  
            //这里公开地址是登陆提交的地址  
         /*   if(requestUri.indexOf("login.jsp")>0){   //访问login.jsp
                return true;  
            }  
            if(requestUri.indexOf("getRandcode.do")>0){  //获取验证码
                return true;  
            }  
            if(requestUri.indexOf("employeeLogin.do")>0){  //点击登录按钮验证
                return true;  
            }  
            if(requestUri.indexOf(".css")>0){  
                return true;  
            }  
            if(requestUri.indexOf(".jsp")>0){  
                return true;  
            }  
            if(requestUri.indexOf(".js")>0){  
                return true;  
            }  */
	    	
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		  System.out.println("==============执行顺序: 2、postHandle================");    
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		  System.out.println("==============执行顺序: 3、afterCompletion================");   
	}

}
