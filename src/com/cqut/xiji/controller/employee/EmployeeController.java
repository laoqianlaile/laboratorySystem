package com.cqut.xiji.controller.employee;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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
		 *
		 * @description 根据部门ID获取所有员工ID和名字
		 * @author chenyubo
		 * @created 2017年05月26日21:27:02
		 * @param ID 部门ID
		 * @return
		 */
		@RequestMapping("/getEmployeeNameInPersonalTask")  
	    @ResponseBody
		public String getEmployeeNameInPersonalTask(String ID){
			List<Map<String, Object>> result = service.getEmployeeNameInPersonalTask(ID);
			return JSONArray.fromObject(result).toString();
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


		/**
		 * 账目管理支付详细 - 领取人数据提取
		 *
		 * @author zkl
		 * @return
		 */
		@RequestMapping("/getEmployeeData")
		@ResponseBody
		public String getEmployeeData(String matchName){
			List<Map<String, Object>> result = service.getEmployeeData(matchName);
			return JSONArray.fromObject(result).toString();
		}

		/**
		 *
		 * @description 获取员工信息
		 * @author Hzz
		 * @date 2016年12月7日 早上10:15:22
		 * @param employeeName
		 * @param employeeCode
		 * @param loginName
		 * @param phoneNumber
		 * @param departmentName
		 * @param limit
		 * @param offset
		 * @param order
		 * @param sort
		 * @return
		 */
		@RequestMapping("/getEmployeeWithPaging")
	    @ResponseBody
		public JSONObject getEmployeeWithPaging(String employeeName,
				String employeeCode, String loginName, String phoneNumber,
				String departmentName, int limit, int offset, String order,
				String sort){
			Map<String, Object> result =service.getEmployeeWithPaging(employeeName, employeeCode, loginName, phoneNumber, departmentName, limit, offset, order, sort);
			return JSONObject.fromObject(result);
		}

		/**
		 * @description 新增员工
		 * @author Hzz
		 * @date 2016年12月8日 早上10:49:17
		 * @param employeeName
		 * @param employeeCode
		 * @param sex
		 * @param email
		 * @param phoneNumber
		 * @param address
		 * @param dutyID
		 * @param roleID
		 * @param departmentID
		 * @return
		 * @throws UnsupportedEncodingException
		 */
		@RequestMapping("/addEmployee")
	    @ResponseBody
		public String addEmployee(String employeeName, String employeeCode,
				int sex, String email, String phoneNumber, String address,
				String dutyID, String roleID, String departmentID) throws UnsupportedEncodingException{
			employeeName=URLDecoder.decode(employeeName,"utf-8");
			address=URLDecoder.decode(address,"utf-8");
			String result = service.addEmployee(employeeName, employeeCode, sex, email, phoneNumber, address, dutyID, roleID, departmentID);
			return result;
		}

		/**
		 * @description 删除员工
		 * @author Hzz
		 * @date 2016年12月8日 早上10:54:05
		 * @param IDs
		 * @return
		 */
		@RequestMapping("/delEmployee")
	    @ResponseBody
		public String delEmployee(String IDs){
			String result = service.delEmployee(IDs);
			return result;
		}

		/**
		 * @description 更新员工信息
		 * @author Hzz
		 * @date 2016年12月8日 早上11:05:11
		 * @param ID
		 * @param employeeName
		 * @param employeeCode
		 * @param sex
		 * @param email
		 * @param phoneNumber
		 * @param address
		 * @param dutyID
		 * @param roleID
		 * @param departmentID
		 * @return
		 * @throws UnsupportedEncodingException
		 */
		@RequestMapping("/updEmployee")
	    @ResponseBody
		public String updEmployee(String ID,String employeeName, String employeeCode,
				int sex, String email, String phoneNumber, String address,
				String dutyID, String roleID, String departmentID) throws UnsupportedEncodingException{
			employeeName=URLDecoder.decode(employeeName,"utf-8");
			address=URLDecoder.decode(address,"utf-8");
			String result = service.updEmployee(ID, employeeName, employeeCode, sex, email, phoneNumber, address, dutyID, roleID, departmentID);
			return result;
		}

		/**
		 * @decription 更改员工状态
		 * @author Hzz
		 * @date 2016年12月8日 早上11:21:08
		 * @param ID
		 * @param state
		 * @return
		 */
		@RequestMapping("/updEmployeeState")
	    @ResponseBody
		public String updEmployeeState(String ID,int state){
			String result = service.updEmployeeState(ID, state);
			return result;
		}
		
		/**
		 * 
		 * 获取当前session值中员工信息
		 * 
		 * @author zkl
		 * @param employeeID 员工ID
		 * @return
		 */
		@RequestMapping("/getEmployeeinfo")
		@ResponseBody
		public String getEmployeeinfo(HttpSession session){
			List<Map<String, Object>> result = service.getEmployeeinfo(session);
			return JSONArray.fromObject(result).toString();
		}
		
		/**
		 * 
		 * 个人信息设置
		 * 
		 * @author zkl
		 * @param employeeID
		 * @param employeeName
		 * @param sex
		 * @param phoneNumber
		 * @param email
		 * @param address
		 * @return
		 */
		@RequestMapping("/editInfo")
		@ResponseBody
		public String editInfo(String employeeID,String employeeName,String sex,String phoneNumber,String email,String address){
			String result = service.editInfo(employeeID,employeeName,sex,phoneNumber,email,address);
			return result;
		}
		
		
		/**
		 * 
		 * 员工修改登录密码
		 * 
		 * @author zkl
		 * @param employeeID
		 * @param newpwd
		 * @return
		 */
		@RequestMapping("/editEmployeePwd")
		@ResponseBody
		public String editEmployeePwd(String employeeID,String newpwd){
			String result = service.editEmployeePwd(employeeID,newpwd);
			return result;
		}
		
		/**
		 * 电子盖章 电子签名
		 * 
		 * @author zkl
		 * @data 2017年4月10日 下午9:42:15
		 * @param fileID
		 * @param selectorName 
		 * @return
		 */
		@RequestMapping("/addSignatrueAndStamp")
		@ResponseBody
		public boolean addSignatrueAndStamp(String fileID,String selectorName){
			boolean result = service.addSignatrueAndStamp(fileID,selectorName);
			return result;
		}
		
		
}
