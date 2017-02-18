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
import com.cqut.xiji.entity.permissionAssign.PermissionAssign;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.service.employee.IEmployeeService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.mysql.fabric.xmlrpc.base.Data;

/**
 * @author zx 鏉冮檺鍒嗛厤
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
	 * //鏍规嵁 operatorCode鏉�鏌ユ壘涓�骇妯″潡
	 * 
	 * @Override public List<Node> getChiefMenu(String userID){
	 * 
	 * String ownerCondtion = getOwnerCondtion(userID);
	 * 
	 * if(ownerCondtion == null){ System.out.println("娌℃湁鎵惧埌瀵瑰簲瑙掕壊"); return null; }
	 * else {
	 * 
	 * ////SHOWMENUPAGE=0琛ㄧず涓嶅睍绀猴紝=1琛ㄧず灞曠ず List<Map<String, Object>> modules =
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
	 * ////////////////瀛愯彍鍗�//鏍规嵁 operatorCode鏉�鏌ユ壘瀵瑰簲module xiangjunchao
	 * 
	 * @Override public List<Node> getPermissionModule(String userID, String
	 * level) {
	 * 
	 * 
	 * String ownerCondtion = getOwnerCondtion(userID);
	 * 
	 * if(ownerCondtion == null){ System.out.println("   娌℃湁鎵惧埌鏉冮檺ID"); return
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
	 * if("1".equals(module.get("LEVEL0").toString())){ //绗簩绾�Node node = new
	 * Node(module.get("MODULECODE").toString(), module.get("text").toString(),
	 * null,null==module.get("iconCls")?"":module.get("iconCls").toString());
	 * node.setCreateID(false);
	 * 
	 * parents.put(module.get("MODULECODE").toString(), node);
	 * nodes.addNode(node); } else { //绗笁绾�
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
	 * System.out.println("鍑洪敊锛� + module.get("text").toString()); } } }
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
	 * 鑾峰彇鐖惰妭鐐筩ode
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

	// 鏍规嵁UserID寰楀埌瀵瑰簲鐨勬ā鍧楁煡璇㈣鍙�
	public String getOwnerCondtion(String userID) {
		// 鏌ユ壘瀵瑰簲鐨勮鑹�娉ㄦ剰锛氭牴鎹敤鎴稩D鏌ユ壘鐢ㄦ埛瀵瑰簲鐨勮鑹诧紝涓�釜鐢ㄦ埛鍙互鏈夊涓鑹�
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
   * 鏍规嵁 operatorCode鏉�鏌ユ壘瀵瑰簲module zhijun
   * @author wzj
   * @date 2016骞�1鏈�0鏃�涓嬪崍3:45:40
   *
   */
	@Override
	public List<BootstrapTreeNode> getPermissionModule(String userID,String level) {
		String ownerCondtion = getOwnerCondtion(userID);
		List<BootstrapTreeNode> TreeNode = new ArrayList<BootstrapTreeNode>();
		Map<String, BootstrapTreeNode> parentOne = new HashMap<String, BootstrapTreeNode>();
		Map<String, BootstrapTreeNode> parentTwo = new HashMap<String, BootstrapTreeNode>();
		// 鑾峰彇鎵�湁鍒楄〃
		if (ownerCondtion == null) {
			System.out.println("   娌℃湁鎮ㄦ壘鍒版潈闄愯处鎴�");
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
			
				if ("1".equals(levelString)) { // 绗竴绾�
					BootstrapTreeNode node = new BootstrapTreeNode("", module.get("text").toString());
					node.setId(module.get("ID").toString());
					node.setBackColor(module.get("backColor"));
					node.setlevel0(levelString);
					node.setIcon(module.get("icon"));
					node.setColor(module.get("color"));
					node.setHref(module.get("href"));
					TreeNode.add(node);
					parentOne.put(module.get("ID").toString(), node);

				} else if ("2".equals(levelString)) { // 绗簩绾�

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
/**
 * 
 *  鍒犻櫎瑙掕壊瀵瑰簲妯″潡
 * @author wzj
 * @date 2016骞�2鏈�4鏃�涓嬪崍5:37:20
 *
 */
@Override
public String deletePermission(String roleID, String moduleID) {
	// TODO Auto-generated method stub
	if(roleID != null && !roleID.equals("")){
		if(moduleID.equals("all")){
			return  entityDao.deleteByCondition(" ownerCode='"+roleID+"'", PermissionAssign.class) > 0 ? "true" : "false";
		}else {
			return entityDao.deleteByCondition(" ownerCode='"+roleID+"' and permissionCode = '"+moduleID+"' ", PermissionAssign.class) > 0 ? "true" : "false";
		}
	}
	return "true";
	
}
/**
 * 
 * 鏂板瑙掕壊瀵瑰簲妯″潡
 * @author wzj
 * @date 2016骞�2鏈�4鏃�涓嬪崍5:36:58
 *
 */
@Override
public String addPermission(String roleID, String moduleID) {
	// TODO Auto-generated method stub
List<PermissionAssign>  list = 	entityDao.getByCondition(" ownerCode='"+roleID+"' and permissionCode='"+moduleID+"'", PermissionAssign.class);
  if(list != null && list.size() > 0){
	 return "true" ; //宸茬粡鏈夛紝鏃犻渶鎿嶄綔
  }
  else if(roleID != null && !roleID.equals("")){
		  PermissionAssign permissionAssign = new PermissionAssign();
		  permissionAssign.setID(EntityIDFactory.createId());
		  permissionAssign.setOWNERCODE(roleID);
		  permissionAssign.setPERMISSIONCODE(moduleID);
		  permissionAssign.setREMARKS((new Data()).toString());
		  return entityDao.save(permissionAssign) == 1 ? "true"  : "false" ;
	}
  return "true";
}
}
