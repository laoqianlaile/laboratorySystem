package com.cqut.xiji.service.department;


import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.base.BootstrapTreeNode;

import net.sf.json.JSONArray;

public interface IDepartmentService {
	
	Map<String, Object> getDepartmentWithPage(String departmentCode,String departmentName,String employeeName,
			 int limit, int offset,String order, String sort);
	public String addDepartment(String departmentName,String departmentCode,String remarks,String employeeID,String parent);
	public String delDepartment(String IDs);
	public String updDepartment(String ID,String departmentName,String departmentCode,String remarks,String employeeID,String parent);
	JSONArray getdatalist(int type);
	/**
	 * @return
	 */
	public List<Map<String, Object>> getDepartmentName();
	public List<BootstrapTreeNode> getModuleTree();
}
