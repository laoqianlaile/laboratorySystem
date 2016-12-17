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
	
	@RequestMapping("/addModule")  
    @ResponseBody 
	public String addModule(String text,String parent, String href,String icon,String isShow){
		
		
		return service.addModule(text,parent,href,icon,isShow) ;
	}
	
	@RequestMapping("/updateModule")  
	@ResponseBody 
	public String updateModule(String text,String parent, String href,String icon,String isShow,String ID){
	
		return service.updateModule( text, parent,  href, icon, isShow, ID) == 1 ? "true" : "false";
	}

	@RequestMapping("/deleteModule")  
	@ResponseBody 
	public String deleteModule(String IDs){
		 if(IDs == null || IDs.length() == 0)
			 return "true";
		return service.deleteModule(IDs.split(",")) ;
	}
	
	@RequestMapping("/getTree")
	@ResponseBody
	public String getTree(String location) {
		String tree = "[{ icon: 'glyphicon glyphicon-th', text: '系统基本管理',nodes: [{ icon: 'glyphicon glyphicon-th-large',text: '基本管理',nodes: [{ icon: 'glyphicon glyphicon-euro',text: '权限分配'}, { icon: 'glyphicon glyphicon-th-list',text: '模块管理'}, { icon: 'glyphicon glyphicon-user', text: '角色管理'},]},]}]";   
    	return JSONArray.fromObject(service.getModuleTree()).toString();
		
	}
}
