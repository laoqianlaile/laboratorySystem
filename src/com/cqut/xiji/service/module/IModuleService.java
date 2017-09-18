package com.cqut.xiji.service.module;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.base.BootstrapTreeNode;
import com.cqut.xiji.entity.module.Module;

/**
 * @author zx
 * 报表引擎图表后台
 */
public interface IModuleService {
	public List<BootstrapTreeNode> getModuleTree();
	public List<Module> getModulesByCondition(String condition);
	public List<Module> getModulesById(String ID);
	
	
	public Map<String,Object> getModule(int rows, int page, String order,
			String sort, String moduleName,String condition);
	
	public boolean checkModuleWithHref(String url);
	public List<Module> getModule();
	/**
	 * 
	 * @author wzj
	 * @date 2016年11月30日 下午1:17:34
	 * @param text
	 * @param parent
	 * @param href
	 * @param icon
	 * @param isShow
	 * @return
	 */
	public String addModule(String text, String parent, String href,  //新增模块
			String icon, String isShow);
	int updateModule(String text, String parent, String href, String icon, //修改模块
			String isShow, String ID);
	public String deleteModule(String[] IDs);		//删除模块
	public Map<String,Object> getModuleWithPaging(int rows, int page, String order,
			String sort, String moduleName,String condition);
	public String getModuleIDByRoleID(String roleID);  //通过角色Id查询对应的模块ID
	String getModuleNum(String condition);  //通过条件查询所有的模块数
	
}
