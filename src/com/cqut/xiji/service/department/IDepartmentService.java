package com.cqut.xiji.service.department;


import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.base.BootstrapTreeNode;

import net.sf.json.JSONArray;

public interface IDepartmentService {
	/**
	 * 初始化部门页面
	 * @param departmentCode
	 * @param departmentName
	 * @param employeeName
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	
	Map<String, Object> getDepartmentWithPage(String departmentCode,String departmentName,String employeeName,
			 int limit, int offset,String order, String sort);
	/**
	 * 添加部门
	 * @param departmentName
	 * @param departmentCode
	 * @param remarks
	 * @param property
	 * @param employeeID
	 * @param parent
	 * @return
	 */
	public String addDepartment(String departmentName,String departmentCode,String remarks,
			String property,String employeeID,String parent);
	/**
	 * 删除部门
	 * @param IDs
	 * @return
	 */
	public String delDepartment(String IDs);
	/**
	 * 修改部门
	 * @param ID
	 * @param departmentName
	 * @param departmentCode
	 * @param remarks
	 * @param property
	 * @param employeeID
	 * @param parent
	 * @return
	 */
	public String updDepartment(String ID,String departmentName,String departmentCode,String remarks,String property,
			String employeeID,String parent);
	JSONArray getdatalist(int type);
	/**
	 * @return
	 */
	public List<Map<String, Object>> getDepartmentName();
	/**
	 * 获取树
	 */
	public List<BootstrapTreeNode> getModuleTree();
	
	List<Map<String, Object>> getAllDepartmentName();
	/**
	 * 检测数据
	 * @param departmentCode
	 * @param departmentName
	 * @return
	 */
	public String addText(String departmentCode,String departmentName);
}
