package com.cqut.xiji.service.employee;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder.In;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service("employeeService")
public class EmployeeService extends SearchService implements IEmployeeService{

	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;
	
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
	       session.setAttribute("EMPLOYEENAME", employee2.getEmployeeName());
		return "1";

		}
		//用户注销
		@Override
		public  String employeeWithdraw(HttpServletRequest request) {
			  HttpSession session = request.getSession();
			  System.out.println("用户"+session.getAttribute("LOGINNAME")+"请求退出");
			  session.setAttribute("LOGINNAME", "");
			  session.setAttribute("EMPLOYEEID","");
			  session.setAttribute("EMPLOYEENAME", "");
			return "1";
		}

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
				String[]  roleID = 	employee.getRoleID().split(",");
	            List<String> list =Arrays.asList(roleID);
	            return list;
			}
			else return null;

		}

		/**
		 *
		 * @description  任务分配时根据部门获取部门人员
		 * @author chenyubo
		 * @created 2016年11月24日 下午3:39:15
		 * @return
		 */
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
				+ "when employee.level =  2 then '高级' end as level"
			};

			String joinEntity = " left join duty on employee.dutyID = duty.ID "
					+ " left join role on employee.roleID = role.ID ";

			String condition = " 1 = 1 and employee.departmentID = '" + ID + "' and employee.state = 1";

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
			String condition = "employeeName like '%" + employeeName + "%'  and ID != '20170220super'";
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
			String baseEntity = "department";
			
			String[] properties = {
					"department.ID",
					"department.departmentName"
			};

			String joinEntity =  " left join employee on department.ID = employee.departmentID and employee.ID = '" + ID +"' ";

			List<Map<String,Object>> result = this.originalSearchForeign(properties, baseEntity, joinEntity, null, null, false);
			return result;
		}

		@Override
		public List<Map<String, Object>> getEmployeeData(String matchName) {
			String baseEntity = "employee";
			String[] properties = {
					"employee.ID",
					"employee.employeeName",
					"department.departmentName"
			};
			String joinEntity = " LEFT JOIN department ON department.ID = employee.departmentID ";
			String condition = " and employee.employeeName LIKE '%" + matchName + "%' AND employee.ID != '20170220super'  AND employee.ID !='20170220xiji'";
			List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
			return result;
		}


		/**
		 * @descriptlion 获取员工信息
		 * @author Hzz
		 * @date 2016年12月7日 早上10:10:12
		 */
		@Override
		public Map<String, Object> getEmployeeWithPaging(String employeeName,
				String employeeCode, String loginName, String phoneNumber,
				String departmentName, int limit, int offset, String order,
				String sort) {
			// TODO Auto-generated method stub
			int index = limit;
			int pageNum = offset/limit;
			String tableName = "employee";
			String[] properties = new String[]{
					"employee.ID",
					"employee.employeeName",
					"employee.employeeCode",
					"employee.loginName",
					"employee.email",
					"employee.phoneNumber",
					"employee.address",
					"date_format(employee.createTime,'%Y-%m-%d') as createTime",
					"employee.roleID",
					"employee.departmentID",
					"employee.dutyID",
					"(select GROUP_CONCAT(role.`name`) from role where FIND_IN_SET(role.ID,employee.roleID))as roleName",
					"department.departmentName",
					"duty.dutyName",
					"case when employee.sex = 0 then '女'"
					+ "when employee.sex = 1 then '男' end as sex",
					
					"case when employee.state = 0 then '禁用'"
					+ "when employee.state = 1 then '启用' end as state",
			};
			
			String joinEntity =  " left join department on employee.departmentID = department.ID "
					+ " left join duty on employee.dutyID = duty.ID ";
			int permission=1;
			String condition = "1 = 1 and employee.permission="+permission;
			
			if (employeeName != null && !employeeName.equals("")) {
				condition += " and employee.employeeName like '%"
						+ employeeName + "%'";
			}
			if (employeeCode != null && !employeeCode.equals("")) {
				condition += " and employee.employeeCode like '%" + employeeCode
						+ "%'";
			}
			if (loginName != null && !loginName.equals("")) {
				condition += " and employee.loginName like '%" + loginName
						+ "%'";
			}
			if (phoneNumber != null && !phoneNumber.equals("")) {
				condition += " and employee.phoneNumber like '%" + phoneNumber + "%'";
			}
			if (departmentName != null && !departmentName.equals("")) {
				condition += " and department.departmentName like '%" + departmentName + "%'";
			}
			
			
			List<Map<String, Object>> result = originalSearchWithpaging(properties,
					tableName, joinEntity, null, condition, false, null, sort,
					order, index, pageNum);
			
			int count = getForeignCountWithJoin(joinEntity, null, condition, false);

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", count);
			map.put("rows", result);

			return map;
		}

		/**
		 * @description 新增员工
		 * @author Hzz
		 * @date  2016年12月8日 早上10:46:09
		 */
		@Override
		public String addEmployee(String employeeName, String employeeCode,
				int sex, String email, String phoneNumber, String address,
				String dutyID, String roleID, String departmentID) {
			// TODO Auto-generated method stub
			Employee employee = new Employee();
			employee.setID(EntityIDFactory.createId());
			employee.setEmployeeName(employeeName);
			employee.setEmployeeCode(employeeCode);
			employee.setAddress(address);
			employee.setEmail(email);
			employee.setSex(sex);
			employee.setCreateTime(new Date());
			employee.setPhoneNumber(phoneNumber);
			employee.setDutyID(dutyID);
			employee.setDepartmentID(departmentID);
			employee.setRoleID(roleID);
			employee.setLoginName(employeeCode);
			employee.setPassword("123456");
			employee.setState(0);
			employee.setLevel(0);
			employee.setPermission(1);
			int result = entityDao.save(employee);
			return result + "";
		}
		
		/**
		 * @description 删除员工
		 * @author Hzz
		 * @date 2016年12月8日 早上10:52:43
		 */
		@Override
		public String delEmployee(String IDs) {
			// TODO Auto-generated method stub
			if(IDs == null || IDs.isEmpty()){
				return 0+"";
			}
			String[] ids = IDs.split(",");
			int result = entityDao.deleteEntities(ids, Employee.class);
			return result+"";
		}

		/**
		 * @description 更新员工信息
		 * @author Hzz
		 * @date 2016年12月8日 早上11:03:14
		 */
		@Override
		public String updEmployee(String ID,String employeeName, String employeeCode,
				int sex, String email, String phoneNumber, String address,
				String dutyID, String roleID, String departmentID) {
			// TODO Auto-generated method stub

			if(ID == null  || ID.equals("")){
				return "false";
			}
			Employee employee = entityDao.getByID(ID, Employee.class);
			if(employee == null )
				return "false";
			employee.setEmployeeName(employeeName);
			employee.setEmployeeCode(employeeCode);
			employee.setSex(sex);
			employee.setAddress(address);
			employee.setEmail(email);
			employee.setPhoneNumber(phoneNumber);
			employee.setDutyID(dutyID);
			employee.setDepartmentID(departmentID);
			employee.setRoleID(roleID);

			return entityDao.updatePropByID(employee,ID)==1?"true":"false";
		}

		/**
		 * @description 更改员工状态
		 * @author Hzz
		 * @date 2016年12月8日 早上11:19:54
		 */
		@Override
		public String updEmployeeState(String ID,int state) {
			// TODO Auto-generated method stub
			if(ID == null  || ID.equals("")){
				return "false";
			}
			Employee employee = entityDao.getByID(ID, Employee.class);
			if(employee == null )
				return "false";
			employee.setState(state);

			return entityDao.updatePropByID(employee,ID)==1?"true":"false";
		}

		@Override
		public List<Map<String, Object>> getEmployeeinfo(HttpSession session) {
			
			String employeeID = (String) session.getAttribute("EMPLOYEEID");
			
			String baseEntity = "employee";
			String[] properties = new String[] {
					"employee.ID as employeeID",
					"employee.employeeCode",
					"employee.loginName",
					"employee.`password`",
					"employee.employeeName",
					"employee.sex",
					"employee.phoneNumber",
					"employee.email",
					"employee.address",
					"case WHEN employee.`level` = 0 then '初级'"
					+ "when employee.`level` = 1 then '中级'"
					+ "	when employee.`level` = 2 then '高级' end as level",
					"department.departmentName",
					"duty.dutyName"
					
					};
			String joinEntity = " LEFT JOIN department ON department.ID = employee.departmentID "
					+" LEFT JOIN duty ON duty.ID = employee.dutyID ";
			if(employeeID == null || employeeID.isEmpty()){
				return null;
			}
			String condition = " 1 = 1 AND employee.ID = '" + employeeID+"'";
			List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
			return result;
		}

		@Override
		public String editInfo(String employeeID, String employeeName,
				String sex, String phoneNumber, String email, String address) {
			Employee employee = entityDao.getByID(employeeID, Employee.class);
			
			employee.setEmployeeName(employeeName);
			employee.setSex(Integer.parseInt(sex));
			employee.setPhoneNumber(phoneNumber);
			employee.setEmail(email);
			employee.setAddress(address);
			
			int result = entityDao.updatePropByID(employee, employeeID);
			return result+"";
		}

		@Override
		public String editEmployeePwd(String employeeID, String newpwd) {
			
			Employee  employee = entityDao.getByID(employeeID,Employee.class);
			employee.setPassword(newpwd);
			
			int result = entityDao.updatePropByID(employee,employeeID);

			return result +"";
		}
		
		@Override
	public boolean addSignatrueAndStamp(String fileID, String selectorName) {
		String condition = " fileinformation.ID = '" + fileID + "'";
		List<Map<String, Object>> fileInfo = entityDao.searchWithpaging(
				new String[] { "fileinformation.path AS path","fileinformation.belongtoID AS belongtoID"},
				"fileinformation", null, null, condition, null,
				"fileinformation.uploadTime", "DESC", 1, 0);
		if (fileInfo != null && fileInfo.size() > 0) {
			String employeeID = fileInfo.get(0).get("belongtoID").toString();
			String imagePath = fileInfo.get(0).get("path").toString();
			Employee ee = entityDao.getByID(employeeID, Employee.class);
			if (selectorName.equals(".singnatureImg")) {
				ee.setSingnature(imagePath);
				return baseEntityDao.updatePropByID(ee, employeeID) > 0 ? true
						: false;
			} else {
				ee.setStamp(imagePath);
				return baseEntityDao.updatePropByID(ee, employeeID) > 0 ? true
						: false;
			}
		} else {
			return false;
		}

	}
}
