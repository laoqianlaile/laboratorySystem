package com.cqut.xiji.controller.permissionAssign;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.module.IModuleService;
import com.cqut.xiji.service.permissionAssign.IPermissionAssignService;
import com.cqut.xiji.service.role.IRoleService;


/**
 * @author zx 
 * 权限分配
 */
@Controller
@RequestMapping("/permissionAssignController")
public class PermissionAssignController{
	
	@Resource(name="permissionAssignService")
	IPermissionAssignService service;
	
	@Resource(name="roleService")
	IRoleService roleService;
	
	@Resource(name="moduleService")
	IModuleService moduleService;
	
	/**
	 * 读取权限树一级菜单
	 * @param userID
	 * @return
	 */
	/*@RequestMapping("/getChiefMenu")  
	@ResponseBody
	public String getChiefMenu(HttpServletRequest request){
		Object userIDObj = request.getSession().getAttribute("USERID");
		if(userIDObj==null){
			return null;
		} else {
			return "";
			return JSONArray.fromObject(service.getChiefMenu(userIDObj.toString())).toString();
		}
	}
	*/
	/**
	 * 读取权限树菜单 
	 *  wangzhijun
	 * @param operatorCode
	 * @param level
	 * @return   
	 */
	@RequestMapping("/getPermissionModule")  
	@ResponseBody
	public String getPermissionModule(HttpServletRequest request, String level) {
		//Object userIDObj = request.getSession().getAttribute("USERID");
		   System.out.println("jin xin dao ctroller");
		String  userIDObj = "1";
		if(userIDObj==null){
			return null;
		} else {
			return JSONArray.fromObject(service.getPermissionModule(userIDObj.toString(), level)).toString();
		}
	}
	
	/**
	 * 权限分配
	 * @return
	 */
	@RequestMapping("/getRoleTree")  
	@ResponseBody	
	public String getRoleTree(){
		return JSONArray.fromObject(roleService.getRoleTree().getNodes()).toString();
	}
	
	@RequestMapping("/getModuleTree")  
	@ResponseBody	
	public String getModuleTree(){
		return JSONArray.fromObject(moduleService.getModuleTree()).toString();
	}
	
	/*@RequestMapping("/getSelectPermission")  
	@ResponseBody	
	public String getSelectPermission(String roleId,String moduleCode){
		
		List<Map<String,Object>> ens = service.findPermissionAssignsByCondition(new String[]{"permissionCode"}, "ownerCode = '"+roleId+"' AND permissionCode = '"+moduleCode+"'");

		return ens.size()==0?"0":"1";
		
	}*/
	
	/*@RequestMapping("/addPermission")  
	@ResponseBody	
	public String addPermission(String modulecode,String roleId,boolean isLeaf){
		System.out.println("\n\n\n开始了吗"+modulecode+"=="+roleId);
		return String.valueOf(service.addPermission(modulecode, roleId,isLeaf));
	}
	@RequestMapping("/delPermission")  
	@ResponseBody	
	public String delPermission(String modulecode,String roleId,boolean isLeaf){
		return String.valueOf(service.delPermission(modulecode, roleId,isLeaf));
	}*/
}
