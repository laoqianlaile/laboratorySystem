package com.cqut.xiji.service.permissionAssign;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.base.BootstrapTreeNode;
import com.cqut.xiji.entity.permissionAssign.PermissionAssign;
import com.cqut.xiji.tool.treeNode.Node;


/**
 * @author zx
 * 权限分配
 */
public interface IPermissionAssignService {
   /*	public List<Node> getChiefMenu(String userID);
   	//public List<Node> getPermissionModule(String userID, String level) ;
	public List<Map<String, Object>> findPermissionAssignsByCondition(
			String[] properties, String condition);
	public boolean addPermission(String modulecode, String roleId, boolean isLeaf);
	public int deleteByCondition(String condition);
	public int save(PermissionAssign permissionAssign);
	public boolean delPermission(String modulecode, String roleId, boolean isLeaf);*/
	
	
	public List<BootstrapTreeNode> getPermissionModule(String userID, String level) ;
}
