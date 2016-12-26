
package com.cqut.xiji.service.employee;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public interface IEmployeeService {
  
    //员工注销
	String employeeWithdraw(HttpServletRequest request);
    //用户登录 加入cookies

	String employeeLogin(Boolean autoLogin, String lOGINNAME, String pASSWORD,
			String codeValue, HttpServletRequest request,
			HttpServletResponse response) throws  Exception;
	
	public String getBaseEntityName();

	public List<String> getEmployeeRole(String userID);
	
	Map<String, Object> getEmployeeWithPagingInTaskAssign(String ID,int limit,int offset,String sort,String order);

	public List<Map<String, Object>> getEmployeeName(String employeeName);
	
	public String getDepartmentID(HttpSession session);
	
	String getEmployeeID(HttpSession session);
	
	List<Map<String,Object>> getDepartmentInfo(HttpSession session);

	List<Map<String, Object>> getEmployeeData(String matchName);
}
	

	
	
