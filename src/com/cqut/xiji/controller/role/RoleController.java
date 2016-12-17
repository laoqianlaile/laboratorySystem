package com.cqut.xiji.controller.role;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.role.IRoleService;

@Controller
@RequestMapping("/roleController")
public class RoleController {

	@Resource(name="roleService")
	IRoleService service;
	
	@RequestMapping("/getRole")  
    @ResponseBody  	
	public String getRole(String roleID) {
		return service.getRole(roleID);
	}
	
	@RequestMapping("/getRoleWithPaging")  
    @ResponseBody
	public JSONObject getRoleWithPaging(int limit, int offset, String order, String sort, String roleName){
		Map<String, Object> result = service.getRoleWithPaging(limit,offset,sort,order,roleName);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addRole")  
    @ResponseBody
	public String addRole(String NAME, String REMARKS, String CREATOR){
		String result = service.addRole(NAME,REMARKS,CREATOR);
		return result;
	}
	
	@RequestMapping("/delRole")  
    @ResponseBody
	public String delRole(String roleIDs){
		String result = service.delRole(roleIDs);
		return result;
	}
	
	@RequestMapping("/updRole")  
    @ResponseBody
	public String updRole(String ROLEID, String NAME, String REMARKS){
		String result = service.updRole(ROLEID,NAME,REMARKS);
		return result;
	}
	
}
