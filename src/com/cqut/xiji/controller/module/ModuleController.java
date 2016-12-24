package com.cqut.xiji.controller.module;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.module.IModuleService;


/**
 * @author zx
 * 模块 
 */
@Controller
@RequestMapping("/moduleController")
public class ModuleController{
	
	@Resource(name="moduleService")
	IModuleService service;
	/**
	 * 
	 * @author wzj
	 * @date 2016年12月24日 下午5:22:30
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param moduleName
	 * @param condition
	 * @return
	 */
	@RequestMapping("/getModulesWithPaging")  
    @ResponseBody  	
	public  JSONObject getModulesWithPaging(int limit, int offset, String order, String sort,String moduleName,String condition) {
		Map<String, Object> result = service.getModuleWithPaging(limit, offset, sort, order, moduleName,condition);
	
		return JSONObject.fromObject(result);
	}

	@RequestMapping("/getModules")  
    @ResponseBody  	
	public JSONObject getModules(int limit, int offset, String order, String sort,String moduleName,String condition) {
		return JSONObject.fromObject(service.getModule(limit, offset, sort, order, moduleName,condition));
	}
	
	@RequestMapping("/getText")  
    @ResponseBody  	
	public JSONArray getTexts() {
		return JSONArray.fromObject(service.getModulesByCondition("level0 < 3"));
	}
	/**
	 * 添加模块
	 * @author wzj
	 * @date 2016年12月24日 下午5:21:25
	 * @param text
	 * @param parent
	 * @param href
	 * @param icon
	 * @param isShow
	 * @return
	 */
	@RequestMapping("/addModule")  
    @ResponseBody 
	public String addModule(String text,String parent, String href,String icon,String isShow){
		
		
		return service.addModule(text,parent,href,icon,isShow) ;
	}
	/**
	 * 更新模块
	 * @author wzj
	 * @date 2016年12月24日 下午5:21:12
	 * @param text
	 * @param parent
	 * @param href
	 * @param icon
	 * @param isShow
	 * @param ID
	 * @return
	 */
	@RequestMapping("/updateModule")  
	@ResponseBody 
	public String updateModule(String text,String parent, String href,String icon,String isShow,String ID){
	
		return service.updateModule( text, parent,  href, icon, isShow, ID) == 1 ? "true" : "false";
	}
   
	/**
	 * 删除模块
	 * @author wzj
	 * @date 2016年12月24日 下午5:20:59
	 * @param IDs
	 * @return
	 */
	@RequestMapping("/deleteModule")  
	@ResponseBody 
	public String deleteModule(String IDs){
		 if(IDs == null || IDs.length() == 0)
			 return "true";
		return service.deleteModule(IDs.split(",")) ;
	}
	/**
	 * 
	 * @author wzj
	 * @date 2016年12月24日 下午5:19:03
	 * @param location
	 * @return
	 */
	@RequestMapping("/getTree")
	@ResponseBody
	public String getTree(String location) {
		String tree = "[{ icon: 'glyphicon glyphicon-th', text: '系统基本管理',nodes: [{ icon: 'glyphicon glyphicon-th-large',text: '基本管理',nodes: [{ icon: 'glyphicon glyphicon-euro',text: '权限分配'}, { icon: 'glyphicon glyphicon-th-list',text: '模块管理'}, { icon: 'glyphicon glyphicon-user', text: '角色管理'},]},]}]";   
    	return JSONArray.fromObject(service.getModuleTree()).toString();
		
	}
	/**
	 * 获取角色对应的模块IDs
	 * @author wzj
	 * @date 2016年12月24日 下午5:19:00
	 * @param roleID
	 * @return
	 */
	@RequestMapping("/getModuleIDByRoleID")
	@ResponseBody
	public String getModuleIDByRoleID(String roleID) {
		return service.getModuleIDByRoleID(roleID);
	}
	/**
	 * //得到条件满足的模块数量
	 * @author wzj
	 * @date 2016年12月24日 下午5:18:56
	 * @param condition
	 * @return
	 */
	@RequestMapping("/getModuleNum")
	@ResponseBody
	public String getModuleNum(String condition) {
		return service.getModuleNum(condition);
	}
	
	
}
