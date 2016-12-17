package com.cqut.xiji.controller.employee;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.employee.IEmployeeService;
import com.cqut.xiji.tool.util.RandomValidateCode;


@Controller
@RequestMapping("/employeeController")
public class EmployeeController {

	@Resource(name="employeeService")
	IEmployeeService service;
	
		//生成图片验证码
		@RequestMapping("/getRandcode")
		@ResponseBody
		public void getRandcode(HttpServletRequest request,
				HttpServletResponse response) {
			RandomValidateCode randCode = new RandomValidateCode();
			randCode.getRandcode(request, response);
		}
		
		//用户登录页面，加入cookie
		@RequestMapping("/employeeLogin")  
	    @ResponseBody
		public String employeeLogin(Boolean autoLogin,String LOGINNAME,String PASSWORD,String codeValue,HttpServletRequest request,HttpServletResponse response) throws Exception{
			return service.employeeLogin(autoLogin,LOGINNAME, PASSWORD,codeValue, request,response);
			
		}
		//用户注销
		@RequestMapping("/employeeWithdraw")  
	    @ResponseBody
		public  String employeeWithdraw(HttpServletRequest request){
			return service.employeeWithdraw( request);
			
		}
		
		/**
		 * 
		 * @description 任务分配时根据部门获取所有员工
		 * @author chenyubo
		 * @created 2016年10月13日 下午3:06:03
		 * @param ID 部门ID
		 * @return
		 */
		@RequestMapping("/getEmployeeWithPagingInTaskAssign")  
	    @ResponseBody
		public JSONObject getEmployeeWithPagingInTaskAssign(String ID,int limit,int offset,String sort,String order){
			Map<String, Object> result = service.getEmployeeWithPagingInTaskAssign(ID,limit,offset,sort,order);
			return JSONObject.fromObject(result);
			
		}
		
		/**
		 * @description 得到公司名称及ID
		 * @author hujiajun
		 * @created 2016-10-17 下午9:47:29
		 * @return
		 */
		@RequestMapping("/getEmployeeName")  
	    @ResponseBody
		public String getEmployeeName(String employeeName){
			List<Map<String, Object>> result = service.getEmployeeName(employeeName);
			return JSONArray.fromObject(result).toString();
		}
		
		/**
		 * 
		 * 方法简述：获取部门信息
		 * @return  
		 * @author 蒋兴成
		 * @date 2016年11月17日 下午5:06:41
		 *
		 */
		@RequestMapping("/getDepartment")  
	    @ResponseBody
		public String getDepartmentID(HttpSession session){
			return service.getDepartmentID(session);
		}
		
		/**
		 * 
		 * @description 获取当前登录人员的ID
		 * @author chenyubo
		 * @created 2016年11月24日 下午3:37:41
		 * @param session
		 * @return
		 */
		@RequestMapping("/getEmployeeID")  
	    @ResponseBody
		public String getEmployeeID(HttpSession session){
			return service.getEmployeeID(session);
		}
		
		/**
		 * 
		 * @description 分配任务时获取当前人员所在部门的ID和名称
		 * @author chenyubo
		 * @created 2016年11月28日 下午10:12:06
		 * @param session
		 * @return
		 */
		@RequestMapping("/getDepartmentInfo")  
	    @ResponseBody
		public String getDepartmentInfo(HttpSession session){
			return JSONArray.fromObject(service.getDepartmentInfo(session)).toString();
		}
		
		
}
