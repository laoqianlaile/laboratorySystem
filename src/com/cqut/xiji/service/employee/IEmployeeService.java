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

	Map<String, Object> getEmployeeWithPaging(String employeeName, String employeeCode,String loginName, String phoneNumber, String departmentName, int limit,
			int offset, String order, String sort);

	public String addEmployee(String employeeName, String employeeCode,
			int sex, String email, String phoneNumber, String address,
			String dutyID, String roleID, String departmentID,String birthday,int jobTitle,int eduLevel,String graduate,String IDCard,String password);

	public String delEmployee(String IDs);

	public String updEmployee(String ID,String employeeName, String employeeCode,
			int sex, String email, String phoneNumber, String address,
			String dutyID, String roleID, String departmentID,String birthday,int jobTitle,int eduLevel,String graduate,String IDCard);

	public String updEmployeeState(String ID,int state);

	List<Map<String, Object>> getEmployeeinfo(HttpSession session);

	String editInfo(String employeeID, String employeeName, String sex,
			String phoneNumber, String email, String address);

	String editEmployeePwd(String employeeID, String newpwd);
	
	public boolean addSignatrueAndStamp(String fileID,String selectorName);
	
	public List<Map<String, Object>> getEmployeeNameInPersonalTask(String ID);
	
	String updEmployeePassword(String ID, String password);
}




