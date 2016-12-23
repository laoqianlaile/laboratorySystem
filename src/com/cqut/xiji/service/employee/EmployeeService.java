package com.cqut.xiji.service.employee;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.service.base.SearchService;

@Service("employeeService")
public class EmployeeService extends SearchService implements IEmployeeService{

	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Override
	public String getBaseEntityName() {
		return "employee";
	}
	
	@Override
	public String getBasePrimaryKey() {
		return "employee.ID";
	}
	
		//员工登录，加入COOKIEs
		@Override
		public String employeeLogin(Boolean autoLogin,String LOGINNAME,String PASSWORD,String codeValue,HttpServletRequest request,HttpServletResponse response) throws Exception{
			 
			HttpSession session = request.getSession();
		    Object sessionCode = session.getAttribute("RANDOMCODEKEY");
		    System.out.println("进入判断是否存到cookie");
		  /*将数据存入Cookies
		 * if(autoLogin==true){
				String username = URLEncoder.encode(LOGINNAME, "utf-8");
				String password = URLEncoder.encode(PASSWORD, "utf-8");
				 Cookie user = new Cookie("user",LOGINNAME+"-"+PASSWORD);
				 user.setMaxAge(100);
				 response.addCookie(user);
				 System.out.println("存入ＣＯＯＫＩＥＳ");
			 }else{
				 System.out.println("不存到cookie");
			 }
			System.out.println("cookie判断成功进去下一步");*/
			//验证码有误
	       if(sessionCode == null){  //系统生成的验证码为0
	    	   return "-4";
	       }else{
	    	   if(!sessionCode.toString().equals(codeValue.toUpperCase())){ //系统生成的验证码与传过来的验证码不一样
	    		   return  "-4";
	    	   }
	       }
	       //加密密码
	       //PASSWORD = MD5.GetMD5Code(PASSWORD);
	       
	       //操作对应的操作员
	       String condition = "LOGINNAME = '"+LOGINNAME+"'";
	       List<Employee> employee = entityDao.getByCondition(condition, Employee.class);
	       
	       //没找到对应用户
	       if(employee.size()==0){
	    	   return "-1";
	       }
	       
	       Employee employee2 = employee.get(0);
	       //禁用
	       if(employee2 == null || employee2.getState() == 0){
	    	   return "-2";
	       }
	       //密码错误
	       if(employee2 == null||!employee2.getPassword().equals(PASSWORD.toString())){
	    	   return "-3";
	    	 
	       }
	       
	       //未分配用户
	       if( employee2.getID()==null){
	    	   return "-5";
	       }
	   
	       System.out.println("用户单次"+employee2.getEmployeeName()+"登录");
	       session.setAttribute("ID", employee2.getID());
	       session.setAttribute("EMPLOYEEID", employee2.getID());
	       session.setAttribute("LOGINNAME", employee2.getLoginName());
		
		return "1";
		
		}
		//用户注销
		@Override
		public  String employeeWithdraw(HttpServletRequest request) {
			  HttpSession session = request.getSession();
			  System.out.println("用户"+session.getAttribute("LOGINNAME")+"请求退出");
			  session.setAttribute("LOGINNAME", "");
			  session.setAttribute("EMPLOYEEID","");
			 
			return "1";
		}
		/**
		 * 获取员工角色
		 * @author wzj
		 * @date 2016年12月23日 上午11:12:21
		 * @param userID
		 * @return
		 */
		@Override
		public List<String> getEmployeeRole(String userID) {
			// TODO Auto-generated method stub
			String[] properties = {
					"roleID"
			};
			Employee employee = entityDao.getByID(userID, Employee.class);
			
			if(employee == null )
				return null;
			String roleIDS = employee.getRoleID();
			if(roleIDS != null && roleIDS.length() > 0)
			{
				String[]  roleID = 	entityDao.getByID(userID, Employee.class).getRoleID().split(",");
	            List<String> list =Arrays.asList(roleID);
	            return list;
			}
			else return null;
			
		}
		
		@Override
		public Map<String, Object> getEmployeeWithPagingInTaskAssign(String ID,int limit,int offset,String sort,String order){
			int index = limit;
			int pageNum = offset/limit;
			String[] properties = new String[]{
				"employee.ID",
				"employee.employeeCode",
				"employee.employeeName",
				"case when employee.sex =  0 then '女' "
				+ "when employee.sex =  1 then '男' end as sex",
				"duty.dutyName",
				"role.name as roleName",
				"case when employee.level =  0 then '初级' "
				+ "when employee.level =  1 then '中级' "
				+ "when employee.level =  2 then '高级' end as level",
				"case when employee.state =  0 then '启用' "
				+ "when employee.state =  1 then '禁用' end as state",
			};
			
			String joinEntity = " left join duty on employee.dutyID = duty.ID "
					+ " left join role on employee.roleID = role.ID ";
			
			String condition = " 1 = 1 and employee.departmentID = '" + ID + "'";
			
			List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), joinEntity, null, condition, false, null, sort, order, index, pageNum);
			int count = getForeignCountWithJoin(joinEntity, null, condition, false);
			
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("total", count);
			map.put("rows", result);
			
			return map;
			
		}
		
		@Override
		public List<Map<String, Object>> getEmployeeName(String employeeName) {
			String[] properties = new String[] {"ID","employeeName"};
			String condition = "employeeName like '%" + employeeName + "%'";
			List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Employee.class);
			return result;
		}
		
		@Override
		public String getDepartmentID(HttpSession session){
			String userID = (String) session.getAttribute("ID");//获取用户ID
			String condition = " ID = '" + userID + "'";
			List<Map<String,Object>> list =searchDao.searchForeign(new String[]{
					"employee.ID as employeeID",//用户ID
					"departmentID",//部门ID
					"departmentName",//部门名称
				}, "employee", 
				" join department on department.ID = employee.departmentID", null, null, condition);
			return JSONArray.fromObject(list).toString();
		}
		
		
		/**
		 * 
		 * @description 获取当前登录员工的ID
		 * @author chenyubo
		 * @created 2016年11月24日 下午3:39:15
		 * @param session
		 * @return
		 * @see com.cqut.xiji.service.employee.IEmployeeService#getEmployeeID(javax.servlet.http.HttpSession)
		 */
		@Override
		public String getEmployeeID(HttpSession session){
			String ID = (String) session.getAttribute("EMPLOYEEID");//获取用户ID
			return ID;
		}
		
		/**
		 * 
		 * @description 分配任务时获取当前人员所在部门的ID和名称
		 * @author chenyubo
		 * @created 2016年11月28日 下午10:12:06
		 * @param session
		 * @return
		 */
		@Override
		public List<Map<String,Object>> getDepartmentInfo(HttpSession session){
			String ID = (String) session.getAttribute("EMPLOYEEID");//获取用户ID
			String[] properties = {
					"department.ID",
					"department.departmentName"
			};
			
			String joinEntity =  " left join department on department.ID = employee.departmentID ";
			String condtion = " 1 = 1 and employee.ID = '" + ID +"' ";
			
			List<Map<String,Object>> result = this.searchForeignWithJoin(properties, joinEntity, null, condtion, false);
			return result;
		}
		
}
