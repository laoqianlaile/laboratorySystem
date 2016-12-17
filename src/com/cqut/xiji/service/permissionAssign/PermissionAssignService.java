package com.cqut.xiji.service.permissionAssign;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.base.BootstrapTreeNode;
import com.cqut.xiji.entity.module.Module;
import com.cqut.xiji.entity.permissionAssign.PermissionAssign;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.service.employee.IEmployeeService;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

/**
 * @author zx 权限分配
 */
@Service
public class PermissionAssignService extends SearchService implements
		IPermissionAssignService {

	@Resource(name = "employeeService")
	IEmployeeService employeeService;

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "permissionAssign";
	}

	@Override
	public String getBasePrimaryKey() {
		return "permissionAssign.ID";
	}

	/*
	 * //根据 operatorCode来 查找一级模块
	 * 
	 * @Override public List<Node> getChiefMenu(String userID){
	 * 
	 * String ownerCondtion = getOwnerCondtion(userID);
	 * 
	 * if(ownerCondtion == null){ System.out.println("没有找到对应角色"); return null; }
	 * else {
	 * 
	 * ////SHOWMENUPAGE=0表示不展示，=1表示展示 List<Map<String, Object>> modules =
	 * this.searchForeign(new String[]{"MODULECODE","MODULENAME"} , new
	 * String[]{"Module"} , "OWNERCODE = '" + roleCodes +
	 * "' and LEVEL0 = '0' and SHOWMENUPAGE = 1 ORDER BY ModuleCode",true);
	 * 
	 * List<Map<String, Object>> modules = this.searchForeign(new
	 * String[]{"DISTINCT  MODULECODE as MODULECODE","text","icon as iconCls"} ,
	 * new String[]{"Module"} , ownerCondtion.toString()+
	 * " and LEVEL0 = '0' and SHOWMENUPAGE = 1  AND module.moduleCode=permissionassign.permissionCode ORDER BY ModuleCode"
	 * ,true);
	 * 
	 * NodeList nodes = new NodeList(); nodes.setCreateID(false);
	 * 
	 * for(Map<String,Object> module : modules) { Node node = new Node(
	 * module.get("MODULECODE").toString(), module.get("text").toString(),
	 * null,null==module.get("iconCls")?"":module.get("iconCls").toString());
	 * 
	 * nodes.addNode(node); }
	 * 
	 * return nodes.getNodes(); } }
	 * 
	 * 
	 * 
	 * ////////////////子菜单 //根据 operatorCode来 查找对应module xiangjunchao
	 * 
	 * @Override public List<Node> getPermissionModule(String userID, String
	 * level) {
	 * 
	 * 
	 * String ownerCondtion = getOwnerCondtion(userID);
	 * 
	 * if(ownerCondtion == null){ System.out.println("   没有找到权限ID"); return
	 * null; } else {
	 * 
	 * List<Map<String, Object>> allModules = this.searchForeign(new
	 * String[]{"DISTINCT MODULECODE as MODULECODE"
	 * ,"LEVEL0","text","URL","PARENT","icon as iconCls"}, new
	 * String[]{"Module"}, ownerCondtion.toString() + " and  ModuleCode like '"
	 * + level +
	 * "____%' and SHOWMENUPAGE = 1 AND module.moduleCode=permissionassign.permissionCode ORDER BY ModuleCode "
	 * , true);
	 * 
	 * List<Map<String, Object>> allModules = this.searchForeign(new
	 * String[]{"DISTINCT MODULECODE as MODULECODE"
	 * ,"LEVEL0","text","URL","PARENT","icon as iconCls"}, new
	 * String[]{"Module"}, ownerCondtion.toString() +
	 * "  and SHOWMENUPAGE = 1 AND module.moduleCode=permissionassign.permissionCode ORDER BY ModuleCode "
	 * , true);
	 * 
	 * NodeList nodes = new NodeList(); nodes.setCreateID(false);
	 * 
	 * Map<String, Node> parents = new HashMap<String, Node>();
	 * 
	 * List<Map<String, Object>> nohandleModule = new ArrayList<Map<String,
	 * Object>>();
	 * 
	 * for(Map<String, Object> module : allModules) {
	 * if("1".equals(module.get("LEVEL0").toString())){ //第二级 Node node = new
	 * Node(module.get("MODULECODE").toString(), module.get("text").toString(),
	 * null,null==module.get("iconCls")?"":module.get("iconCls").toString());
	 * node.setCreateID(false);
	 * 
	 * parents.put(module.get("MODULECODE").toString(), node);
	 * nodes.addNode(node); } else { //第三级
	 * if(parents.containsKey(module.get("PARENT").toString())) { Node node =
	 * new Node(module.get("URL") == null ? "":module.get("URL").toString()
	 * ,module.get("text") == null ? "" : module.get("text").toString(),
	 * null,null==module.get("iconCls")?"":module.get("iconCls").toString());
	 * node.setHref(module.get("URL") == null ?
	 * "":module.get("URL").toString()); node.setCreateID(false);
	 * 
	 * parents.get(module.get("PARENT").toString()).addChildren(node); } else {
	 * nohandleModule.add(module); } } }
	 * 
	 * if(!nohandleModule.isEmpty()) { for(Map<String, Object> module :
	 * nohandleModule) {
	 * if(parents.containsKey(module.get("PARENT").toString())) { Node node =
	 * new Node(module.get("URL").toString(), module.get("text").toString(),
	 * null,null==module.get("iconCls")?"":module.get("iconCls").toString());
	 * node.setCreateID(false);
	 * parents.get(module.get("PARENT").toString()).addChildren(node); } else {
	 * System.out.println("出错，" + module.get("text").toString()); } } }
	 * 
	 * return nodes.getNodes(); } }
	 * 
	 * @Override public List<Map<String, Object>>
	 * findPermissionAssignsByCondition( String[] properties, String condition)
	 * { return entityDao.findByCondition(properties, condition); }
	 * 
	 * @Override public boolean addPermission(String modulecode,String
	 * roleId,boolean isLeaf){ List<Object> list = new ArrayList<Object>();
	 * if(null == modulecode) modulecode = ""; else list.add(modulecode); String
	 * sqlCondition = getParentCode(modulecode, 4); while(true){
	 * if(!sqlCondition.equals("")){ list.add(sqlCondition); }else{ break; }
	 * sqlCondition = getParentCode(sqlCondition, 4); }
	 * if(list.size()>0||modulecode.equals("")){ sqlCondition =
	 * " ownercode='"+roleId+"'"; if(!modulecode.equals("")){ sqlCondition
	 * +=" and ("; for(int k=0;k<list.size();k++){ sqlCondition +=
	 * "permissioncode ='"+(String)list.get(k)+"'"; if(k<list.size()-1)
	 * sqlCondition +=" or "; } sqlCondition+=")"; }
	 * this.deleteByCondition(sqlCondition); } //sqlCondition =
	 * "  modulecode like '"+modulecode+"%'"; //List<Map<String, Object>> codes
	 * = moduleDao.findModulesByCondition(new String[]{"modulecode"},
	 * sqlCondition);
	 * 
	 * if(!isLeaf){ sqlCondition =
	 * "  modulecode like '"+modulecode+"%' AND modulecode != '"+modulecode+"'";
	 * List<Map<String, Object>> codes = moduleDao.findModulesByCondition(new
	 * String[]{"modulecode"}, sqlCondition);
	 * System.out.println(codes+"!!!!!!ss"); for(int i=0;i<codes.size();i++){
	 * list.add(codes.get(i).get("modulecode")); } }
	 * 
	 * 
	 * for(int i=0;i<list.size();i++){ PermissionAssign permissionAssign = new
	 * PermissionAssign(); permissionAssign.setOWNERCODE(roleId); modulecode =
	 * (String)list.get(i); System.out.println("add.modulecode:"+modulecode);
	 * permissionAssign.setPERMISSIONCODE(modulecode);
	 * if(this.save(permissionAssign)==0){ return false; } } return true; }
	 * 
	 * @Override public int deleteByCondition(String condition) { return
	 * dao.deleteByCondition(condition); }
	 * 
	 * @Override public int save(PermissionAssign permissionAssign) {
	 * permissionAssign.setID(EntityIDFactory.createId()); return
	 * dao.save(permissionAssign); }
	 *//**
	 * 获取父节点code
	 * 
	 * @author fm
	 */
	/*
	 * private static String getParentCode(String code,int length){ int rel =
	 * code.length(); if(rel>length){ return code.substring(0, rel-length); }
	 * return ""; }
	 * 
	 * @Override public boolean delPermission(String modulecode,String
	 * roleId,boolean isLeaf){ List<Object> list = new ArrayList<Object>();
	 * if(null == modulecode) modulecode = ""; else list.add(modulecode); String
	 * sqlCondition = ""; // String sqlCondition = getParentCode(modulecode, 4);
	 * // while(true){ // if(!sqlCondition.equals("")){ //
	 * list.add(sqlCondition); // }else{ // break; // } // sqlCondition =
	 * getParentCode(sqlCondition, 4); // }
	 * 
	 * if(!isLeaf){ sqlCondition = "  modulecode like '"+modulecode+"%'";
	 * List<Map<String, Object>> codes = moduleDao.findModulesByCondition(new
	 * String[]{"modulecode"}, sqlCondition); for(int i=0;i<codes.size();i++){
	 * list.add(codes.get(i).get("modulecode")); } }
	 * 
	 * if(list.size()>0||modulecode.equals("")){ sqlCondition =
	 * " ownercode='"+roleId+"'"; if(!modulecode.equals("")){ sqlCondition
	 * +=" and ("; for(int k=0;k<list.size();k++){ sqlCondition +=
	 * "permissioncode ='"+(String)list.get(k)+"'"; if(k<list.size()-1)
	 * sqlCondition +=" or "; } sqlCondition+=")"; }
	 * if(this.deleteByCondition(sqlCondition)==0){ return false; }; }
	 * 
	 * return true; }
	 */

	// 根据UserID得到对应的模块查询语句
	public String getOwnerCondtion(String userID) {
		// 查找对应的角色 注意：根据用户ID查找用户对应的角色，一个用户可以有多个角色
		List<String> roleCodes = employeeService.getEmployeeRole(userID);

		if (roleCodes == null || roleCodes.size() == 0)
			return "OWNERCODE in('')";

		StringBuilder ownerCondtion = new StringBuilder("OWNERCODE in(");

		for (int i = 0; i < roleCodes.size(); i++) {
			if (i != roleCodes.size() - 1) {
				ownerCondtion.append("'" + roleCodes.get(i) + "',");
			} else {
				ownerCondtion.append("'" + roleCodes.get(i) + "')");
			}
		}

		return ownerCondtion.toString();
	}
  /**
   * 
   * 根据 operatorCode来 查找对应module zhijun
   * @author wzj
   * @date 2016年11月30日 下午3:45:40
   *
   */
	@Override
	public List<BootstrapTreeNode> getPermissionModule(String userID,String level) {
		String ownerCondtion = getOwnerCondtion(userID);
		List<BootstrapTreeNode> TreeNode = new ArrayList<BootstrapTreeNode>();
		Map<String, BootstrapTreeNode> parentOne = new HashMap<String, BootstrapTreeNode>();
		Map<String, BootstrapTreeNode> parentTwo = new HashMap<String, BootstrapTreeNode>();
		// 获取所有列表
		if (ownerCondtion == null) {
			System.out.println("   没有您找到权限账户");
			return null;
		} else {
			String[]  properties = new String[]{ 
					" ID ",
					" MODULECODE",
					"LEVEL0",
					"text", 
					"href",
					"PARENT",
					"icon",
					"color", 
					"backColor",
					"hasChild",
					"isEndOfModuleLevel"
					};
			  String condition =" ( SELECT permissionassign.permissionCode FROM permissionassign "+
		  " WHERE "+ownerCondtion +"  ) b LEFT JOIN module ON module.ID = b.permissionCode "+
          "WHERE 1 = 1 AND isShow = 1 order by level0 , modulecode";
				 List<Map<String, Object>> allModules =	  originalSearchForeign(properties, condition, null, null, null, false);
			for (Map<String, Object> module : allModules) {
				String levelString = module.get("LEVEL0").toString();
				String modulParentID = module.get("PARENT").toString();
			
				if ("1".equals(levelString)) { // 第一级
					BootstrapTreeNode node = new BootstrapTreeNode("", module.get("text").toString());
					node.setId(module.get("ID").toString());
					node.setBackColor(module.get("backColor"));
					node.setlevel0(levelString);
					node.setIcon(module.get("icon"));
					node.setColor(module.get("color"));
					node.setHref(module.get("href"));
					TreeNode.add(node);
					parentOne.put(module.get("ID").toString(), node);

				} else if ("2".equals(levelString)) { // 第二级

					BootstrapTreeNode node = new BootstrapTreeNode("", module.get("text").toString());
					node.setId(module.get("ID").toString());
					node.setBackColor(module.get("backColor"));
					node.setlevel0(levelString);
					node.setIcon(module.get("icon"));
					node.setColor(module.get("color"));
					node.setHref(module.get("href"));

					if (parentOne.containsKey(modulParentID)) {
						parentOne.get(modulParentID).addChilred(node);
						parentTwo.put(module.get("ID").toString(), node);
					} else {
						TreeNode.add(node);
					}

				} else {

					BootstrapTreeNode node = new BootstrapTreeNode("", module.get("text").toString());
					node.setId(module.get("ID").toString());
					node.setBackColor(module.get("backColor"));
					node.setlevel0(levelString);
					node.setIcon(module.get("icon"));
					node.setColor(module.get("color"));
					node.setHref(module.get("href"));
					if (parentTwo.containsKey(modulParentID)) {
						parentTwo.get(modulParentID).addChilred(node);
					} else {
						TreeNode.add(node);
					}
				}
			}

		}
		System.out.println(TreeNode.toArray().toString());
		return TreeNode;
	}
}
