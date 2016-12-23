package com.cqut.xiji.service.role;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.role.Role;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

/**
 * @author zx
 * 角色 
 */
@Service
public class RoleService extends SearchService implements IRoleService{
	/*/*/
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "role";
	}

	@Override
	public String getBasePrimaryKey() {
		return "role.ID";
	}
	
	
	@Override
	public List<Role> getRolesByCondition(String condition) {
		return entityDao.getByCondition(condition,Role.class);
	}
	
	/**
	 * 角色管理
	 * roleName 角色名称
	 
	@Override
	public Map<String,Object> getRoleWithPaging(int rows, int page, String order, String sort,String roleName){
		String condition  = null;
		if(roleName != null)
			condition = "name like '%" + roleName + "%'";
		List<Map<String, Object>> ens = this.originalSearchWithpaging(new String[]{"roleID","name"}, this.getBaseEntityName(), null, null, condition, false, null, order, sort, rows, page);
		int count = this.getForeignCount(null, condition, false);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", ens);
		
		return map;
	}
	*/
	
	@Override
	public int saveRole(Role role){
		role.setID(EntityIDFactory.createId());
		return entityDao.save(role);
	}
	
	@Override
	public int updateRole(Role role,String ID){
		int result = entityDao.updatePropByID(role, ID);
		return result;
	}
	
	@Override
	public int deleteRole(String[] IDs){
		return entityDao.deleteEntities(IDs,Role.class);
	}

	@Override
	public NodeList getRoleTree() {
		// 按树级别CIUSERKIND进行查询
		List<Role> allRole = this.getRolesByCondition("  1=1 ");
		// 新建一个NodeList
		NodeList nodeTree = new NodeList();
		
		Node root = new Node("全部角色","");
		Node node;
		
		// 遍历User，处理
		for (Role role : allRole) {
			node = new Node(role.getName(), role.getID());
			
			root.addChildren(node);
		}
		
		nodeTree.addNode(root);
		return nodeTree;
	}

	@Override
	public List<Map<String,Object>> getNotSelectList(int rows, int page,String condition) {
		return this.originalSearchWithpaging(new String[]{"ID","name"},this.getBaseEntityName(),null,null, condition, false, null,null, null, rows, page);
	}

	@Override
	public int getNotSelectListCount(String condition){
		return this.getRolesCountByCondition(condition);
	}

	@Override
	public int getRolesCountByCondition(String condition) {
		return entityDao.getCountByCondition(condition, Role.class);
	}

	@Override
	public String getRole(String roleID) {
		// TODO Auto-generated method stub
		if(roleID == null || roleID.isEmpty()){
			return "error";
		}else{
			Role roleByRoleDao = entityDao.getByID(roleID,Role.class);
			System.out.println("RoleDao:   "+roleByRoleDao.toString());
			
			Role roleByEntityDao = entityDao.getByID(roleID, Role.class);
			System.out.println("EntityDao:  " + roleByEntityDao.toString());
	
			List<Map<String, Object>> roleBySearchDao = searchDao.searchForeign(new String[]{"*"}, "role", null, null, null, " 1=1 ");
			
			return JSONArray.fromObject(roleBySearchDao).toString();
		}
	}
	
	
	/**
	 * 角色分页查询
	 * @author wzj
	 * @date 2016年12月23日 上午11:07:33
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param roleName
	 * @return
	 */
	@Override
	public Map<String, Object> getRoleWithPaging(int limit, int offset,
			String order, String sort, String roleName) {
		// TODO Auto-generated method stub
		System.out.println("limit : "+limit+"  "+offset); //OFFEST 偏移量  首次为0 
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "role";
		String[] properties = new String[]{
				"role.ID",
				"role.name as roleName",
				"employeeName AS creator",
				"date_format(role.createTime, '%Y-%m-%d %H:%i:%s') as createTime",
				"description"
		};
		String contectString = "LEFT JOIN employee ON employee.ID = role.createID"; 
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tableName, contectString, null, " 1=1 ", null, order, sort, index, pageNum);
		int count = entityDao.getByCondition(" 1=1 ", Role.class).size();
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}

	@Override
	public String addRole(String NAME, String REMARKS, String CREATOR) {
		// TODO Auto-generated method stub
		Role role = new Role();
		
		role.setID(EntityIDFactory.createId());
		role.setName(NAME);
		role.setCreateID(CREATOR);
		role.setDescription(REMARKS);
		role.setCreateTime(new Date());

		int result = entityDao.save(role);
		return result + "";
		
	}

	@Override
	public String delRole(String roleIDs) {
		// TODO Auto-generated method stub
		if(roleIDs == null || roleIDs.isEmpty()){
			return 0+"";
		}
		String[] ids = roleIDs.split(",");
		int result = entityDao.deleteEntities(ids, Role.class);
		return result+"";
	}
	
	@Override
	public String updRole(String ROLEID, String NAME, String REMARKS) {
		// TODO Auto-generated method stub
		Role role = new Role();
		
		role.setName(NAME);
		role.setDescription(REMARKS);

		int result = entityDao.updatePropByID(role,ROLEID);
		return result + "";
	}
	
}
