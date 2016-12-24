package com.cqut.xiji.service.role;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.base.BootstrapTreeNode;
import com.cqut.xiji.entity.role.Role;
import com.cqut.xiji.tool.treeNode.NodeList;

/**
 * @author zx
 * 角色 
 */
public interface IRoleService {
	public List<Role> getRolesByCondition(String condition);
//	public Map<String,Object> getRoleWithPaging(int rows, int page, String order, String sort,String roleName);
	public Map<String, Object> getRoleWithPaging(int limit, int offset, String order, String sort, String roleName);
	public int saveRole(Role role);
	public int updateRole(Role role,String ID);
	public int deleteRole(String[] IDs);
	public NodeList getRoleTree();
	public List<Map<String,Object>> getNotSelectList(int rows, int page,String condition);
	public int getNotSelectListCount(String condition);
	public int getRolesCountByCondition(String condition);
	
	public String getRole(String roleID);
	
	public String addRole(String roleName, String description, String creator);
	public String delRole(String roleIDs);
	public String updRole(String roleID, String roleName, String description);
	List<BootstrapTreeNode> getRoleTree_w();
}
