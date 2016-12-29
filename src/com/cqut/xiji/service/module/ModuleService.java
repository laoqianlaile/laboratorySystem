package com.cqut.xiji.service.module;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.entity.base.BootstrapTreeNode;
import com.cqut.xiji.entity.module.Module;
import com.cqut.xiji.entity.permissionAssign.PermissionAssign;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;


/**
 * @author zx
 * 模块 
 */
@Service
public class ModuleService extends SearchService implements IModuleService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	
	@Override
	public String getBaseEntityName() {
		return "module";
	}

	@Override
	public String getBasePrimaryKey() {
		return "module.moduleCode";
	}
	
	
	/**
	 * 
	 * 
	 * @author wzj
	 * @date 2016年12月6日 下午4:37:21
	 *
	 */
	@Override
	public List<BootstrapTreeNode> getModuleTree() {
		BootstrapTreeNode TreeNode = null;
		Map<String, BootstrapTreeNode> parentOne = new HashMap<String, BootstrapTreeNode>();
		Map<String, BootstrapTreeNode> parentTwo = new HashMap<String, BootstrapTreeNode>();
		
		//头节点 
		BootstrapTreeNode node = new BootstrapTreeNode("", "所有模块");
		node.setBackColor("f2f2f2");
		node.setlevel0("0");
		node.setIcon("glyphicon glyphicon-th");
		node.setColor("green");
		node.setHref("javascript:void(0)");
		TreeNode= node;
		
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
		
		List<Map<String, Object>> allModules 	=	entityDao.findByCondition(properties, " 1 = 1 order by level0 , modulecode ", Module.class);
				
		for (Map<String, Object> module : allModules) {
			String levelString = module.get("LEVEL0").toString();
			String modulParentID = module.get("PARENT").toString();
			
			if ("1".equals(levelString)) { // 第一级
				node = new BootstrapTreeNode("", module.get("text").toString());
				node.setId(module.get("ID").toString());
				node.setBackColor(module.get("backColor"));
				node.setlevel0(levelString);
				node.setIcon(module.get("icon"));
				node.setColor(module.get("color"));
				node.setHref(module.get("href"));
				TreeNode.addChilred(node);
				parentOne.put(module.get("ID").toString(), node);

			} else if ("2".equals(levelString)) { // 第二级

				 node = new BootstrapTreeNode("", module
						.get("text").toString());
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
					TreeNode.addChilred(node);
				}

			} else {

				 node = new BootstrapTreeNode("", module
						.get("text").toString());
				 node.setId(module.get("ID").toString());
				node.setBackColor(module.get("backColor"));
				node.setlevel0(levelString);
				node.setIcon(module.get("icon"));
				node.setColor(module.get("color"));
				node.setHref(module.get("href"));

				if (parentTwo.containsKey(modulParentID)) {
					parentTwo.get(modulParentID).addChilred(node);
				} else {
					TreeNode.addChilred(node);
				}
			}
		}
	/*	String tree = "[{ icon: 'glyphicon glyphicon-th', text: '系统基本管理',nodes: [";

		// 按树级别LEVEL0进行查询
		List<Module>  allModule = this
				.getModulesByCondition("  1=1 ORDER BY level0,moduleCode ");
		

		// 遍历Sort，处理
		for (Module module : allModule) {
			// 第一级
			if ("1".equals(module.getLevel0())) {
				tree += "{icon:'" + module.getIcon() + "',text:'" + module.getText() + "',nodes:[";
				if (module.getHasChild()==1)
					for (Module module2 : allModule) {
						if (module.getModuleCode().equals(module2.getParent())) {
							tree += "{icon:'" + module2.getIcon() + "',text:'" + module2.getText() + "',nodes:[";
							if(module2 .getHasChild()==1)
								for (Module module3 : allModule) {
									if (module2.getModuleCode().equals(module3.getParent())) {
										tree += "{icon:'" + module3.getIcon() + "',text:'" + module3.getText() + "'},";
									}
								}
							tree += "]},";
						}
					}
				tree += "]},";
			}

		}

		tree += "]}]";*/
		List<BootstrapTreeNode> bootsrapTree = new ArrayList<>();
		bootsrapTree.add(TreeNode);
		return bootsrapTree;
	}
	

	/**
	 * 模块管理
	 * moduleName 模块名称
	 * condition 传的查询条件
	 * @author wzj
	 * @date 2016年12月6日 下午4:37:37
	 *
	 */
	@Override
	public Map<String,Object> getModuleWithPaging(int limit, int offset, String order, String sort,String text,String condition){
		int pageNum = limit;
		int pageIndex = offset/limit ;
		if(text != null){
			if(condition==null){
				condition="text like '%" + text + "%'";
			}else{
				condition += "AND text like '%" + text + "%'";
			}
		}
		String[] perptions = new String[]{
				"module.ID",
				"module.moduleCode",
				"module.text",
				"module.href",
				"module.icon",
				"if(module1.moduleCode is null , 0 , module1.moduleCode) as parentCode",
				"if(module1.text is null , '模块管理' , module1.text) as parentText",
				"module.parent as parentID",
				"module.level0",
				"module.isEndOfModuleLevel",
				"module.hasChild",
				"module.isShow"
		};
		String baseEntity = " module LEFT JOIN module as module1 on  module.parent = module1.ID ";
		List<Map<String, Object>> ens = this.originalSearchWithpaging(perptions, baseEntity, null, null, condition, false, null, order, sort, pageNum, pageIndex);
		int count = this.getForeignCount(null, condition, false);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", ens);
		return map;
	}
	
	@Override
	public Map<String,Object> getModule(int rows, int page, String order, String sort,String text,String condition){
		if(text != null){
			if(condition==null){
				condition="text like '%" + text + "%'";
			}else{
				condition += "AND text like '%" + text + "%'";
			}
		}
		List<Map<String, Object>> ens = this.originalSearchWithpaging(new String[]{"ID","moduleCode","text","href","icon","level0","isEndOfModuleLevel","hasChild","isShow"}, 
										this.getBaseEntityName(), null, null, condition, false, null, order, sort, rows, page);
		int count = this.getForeignCount(null, condition, false);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", ens);
		return map;
	}
	
	/**
	 * 获得模块信息
	 */
	@Override
	public List<Module> getModulesByCondition(String condition) {

		return entityDao.getByCondition(condition,Module.class);
	}
	/**
	 * 新增模块
	 * 
	 * @author wzj
	 * @date 2016年11月30日 下午1:21:14
	 *
	 */
	@Override
	public String addModule(String text,String parent, String href,String icon,String isShow){
		Module module = new Module();
		 Module parentModule = null;
		module.setText(text);
		module.setParent(parent);
		module.setHref(href);
		module.setIcon(icon);
		module.setIsShow(Integer.parseInt(isShow));
		String level = "";
		String moduleCode = "";
		if(parent == null || parent.equals("0") ||parent.equals(""))
			 level = "1";
		else  {
			  parentModule = entityDao.getByID(parent, Module.class);
			  level = parentModule.getLevel0()+1+"";
		}
		 
		
		/*if(parent == null || parent.length() == 0)
			level = "1";
		else switch (parent.length()) {
		case 1:
			level = "1";
			break;
		case 4:
			level = "2";
			break;
		case 8:
			level = "3";
			break;

		default:
			level = "3";
			break;
		}*/
		String[] properties = new String[]{"moduleCode"};
		String condition = " module.level0 = "+level+" ORDER BY moduleCode DESC LIMIT 0,1 ";
		List<Map<String, Object>> list  = entityDao.findByCondition(properties, condition, Module.class);
		if(list == null || list.size() == 0){
			switch (level) {
			case "1":
				moduleCode  = "0001";
				break;
			case "2":
				moduleCode  = "00010001";
				break;
			case "3":
				moduleCode  = "000100010001";
				break;

			default:
				break;
			}
		}else {
			
			moduleCode = "000"+String.valueOf(Integer.parseInt(list.get(0).get("moduleCode").toString())+1); //后面转换为数字的时候会把0去掉
		}
		module.setModuleCode(moduleCode);
		module.setLevel0(Integer.parseInt(level));
		module.setID(EntityIDFactory.createId());
		return entityDao.save(module) == 1 ? "true" : "false";
	}
	
	/**
	 * 
	 * 删除模块
	 * @author wzj
	 * @date 2016年12月6日 下午4:56:30
	 *
	 */
	@Override
	public String deleteModule(String[] IDs){
		String moudulID = "''";
		String permissCode = "''"; //这个模块删除后，权限分配的这个也要删除。
		
		for (int i = 0; i < IDs.length; i++) {
			moudulID +=" moduleCode like '"+IDs[i]+"%'";
			permissCode += " permissionCode like '"+IDs[i]+"%'";
			if(i !=IDs.length-1){
				moudulID += " or ";
				permissCode += " or ";
			}
		}
		
		
		return entityDao.deleteByCondition(moudulID, Module.class)+ entityDao.deleteByCondition(permissCode,PermissionAssign.class) == 2 ?  "true" : "false" ;
		
	/*	for(String id:IDs){
			entityDao.deleteByID(id, Module.class);
		}
		return 1;*/
	}
	
	/**
	 * 修改模块
	 * 
	 * @author wzj
	 * @date 2016年11月30日 下午1:20:55
	 *
	 */
	@Override
	public int updateModule(String text,String parent, String href,String icon,String isShow,String ID) {
		Module module = entityDao.getByID(ID, Module.class);
		Module parentModule = null;
		String level = "";
		String moduleCode = "";
		if(module == null )
			return 0;
		module.setText(text);
		module.setHref(href);
		module.setIcon(icon);
		module.setIsShow(Integer.parseInt(isShow));
		
		if( !module.getParent().equals(parent)){ //级数没有发生改变 就不操作
	
			if(parent == null || parent.equals("0") ||parent.equals(""))
				 level = "1";
			else  {
				  parentModule = entityDao.getByID(parent, Module.class);
				  level = parentModule.getLevel0()+1+"";
			}
		String[] properties = new String[]{"moduleCode"};
		String condition = " module.level0 = "+level+" ORDER BY moduleCode DESC LIMIT 0,1 ";
		List<Map<String, Object>> list  = entityDao.findByCondition(properties, condition, Module.class);
		if(list == null || list.size() == 0){
			switch (level) {
			case "1":
				moduleCode  = "0001";
				break;
			case "2":
				moduleCode  = "00010001";
				break;
			case "3":
				moduleCode  = "000100010001";
				break;

			default:
				break;
			}
		}else {
			
			moduleCode = "000"+String.valueOf(Integer.parseInt(list.get(0).get("moduleCode").toString())+1);
		}
		module.setModuleCode(moduleCode);
		module.setParent(parent);
		module.setLevel0(Integer.parseInt(level));
		}
		return entityDao.updatePropByID(module, ID);
	}
	
	/**
	 * 更具模块href查看此模块是否在本地存在
	 */
	@Override
	public boolean checkModuleWithHref(String href) {
		
		if(entityDao.getByCondition("href like '"+href+"%'", Module.class).size()>0){
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<Module> getModulesById(String ID) {
		// TODO Auto-generated method stub
		
		return (List<Module>) entityDao.getByID(ID, Module.class);
	}

	@Override
	public List<Module> getModule() {
		// TODO Auto-generated method stub
		
		return null;
	}
	/**
	 * 
	 * 获取角色对应的模块IDs
	 * @author wzj
	 * @date 2016年12月24日 下午5:20:19
	 *
	 */
	@Override
	public String getModuleIDByRoleID(String roleID) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
				"permissionCode"
		};
		String moduleIDsString = "";
		 List<Map<String, Object>> list = entityDao.findByCondition(properties, " ownerCode = '"+roleID+"'", PermissionAssign.class);
		 if( list != null && list.size() > 0){
			for(int i = 0 ; i < list.size() ; i++){
				  moduleIDsString+=(String)list.get(i).get("permissionCode")+",";
			}
			 moduleIDsString = moduleIDsString.substring(0, moduleIDsString.length()-1);
			 System.out.println("moduleIDsString : "+moduleIDsString);
			 return moduleIDsString;
		 }
		 else  return "";
	}
	
	/**
	 * 
	 * //得到条件满足的模块数量
	 * @author wzj
	 * @date 2016年12月24日 下午5:19:58
	 *
	 */
	@Override
	public String getModuleNum(String condition) {
		 int num = 0; 
		 if(condition == null){
			 return entityDao.getCountByCondition(" 1 = 1", Module.class)+"";
		 }
		 else  if(condition != null && !condition.equals("")){
			 return entityDao.getCountByCondition(condition, Module.class)+"";
		 }
		 
		 else return ""+num;
	}
}
