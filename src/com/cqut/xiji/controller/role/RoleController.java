
package com.cqut.xiji.controller.role;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.entity.base.BootstrapTreeNode;
import com.cqut.xiji.service.role.IRoleService;

@Controller
@RequestMapping("/roleController")
public class RoleController {

	@Resource(name="roleService")
	IRoleService service;
	/**
	 * 得到角色信息通过roleID
	 * @author wzj
	 * @date 2016年12月23日 下午1:20:13
	 * @param roleID
	 * @return
	 */
	@RequestMapping("/getRole")  
    @ResponseBody  	
	public String getRole(String roleID) {
		return service.getRole(roleID);
	}
	/**
	 * 分页取数据
	 * @author wzj
	 * @date 2016年12月23日 下午1:20:02
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param roleName
	 * @return
	 */
	@RequestMapping("/getRoleWithPaging")  
    @ResponseBody
	public JSONObject getRoleWithPaging(int limit, int offset, String order, String sort, String roleName){
		Map<String, Object> result = service.getRoleWithPaging(limit,offset,sort,order,roleName);
		return JSONObject.fromObject(result);
	}
	/**
	 * 新增角色
	 * @author wzj
	 * @date 2016年12月23日 下午1:19:15
	 * @param request
	 * @param roleName
	 * @param description
	 * @return
	 */
	@RequestMapping("/addRole")  
    @ResponseBody
	public String addRole(HttpServletRequest request ,String roleName, String description){
		//String CREATOR = (String) request.getSession().getAttribute("EMPLOYEEID");
		//
		String CREATOR = "1";
		String result = service.addRole(roleName,description,CREATOR);
		return result;
	}
	/**
	 * 删除角色
	 * @author wzj
	 * @date 2016年12月23日 下午1:19:29
	 * @param roleIDs
	 * @return
	 */
	@RequestMapping("/delRole")  
    @ResponseBody
	public String delRole(String roleIDs){
		String result = service.delRole(roleIDs);
		return result;
	}
	/**
	 * 更新角色
	 * @author wzj
	 * @date 2016年12月23日 下午1:19:44
	 * @param roleID
	 * @param roleName
	 * @param description
	 * @return
	 */
	@RequestMapping("/updRole")  
    @ResponseBody
	public String updRole( String roleID, String roleName, String description){
		String result = service.updRole(roleID,roleName,description);
		return result;
	}
	/**
	 * 获取角色树+头节点
	 * @author wzj
	 * @date 2016年12月23日 下午5:07:52
	 * @return
	 */
	@RequestMapping("/getRoleTree_w")  
    @ResponseBody
	public String getRoleTree_w(){
		List<BootstrapTreeNode> result =  service.getRoleTree_w();
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 获取所有的角色名
	 * @author Hzz
	 * @date 2016年12月7日  晚上20:12:40
	 * @return
	 */
	@RequestMapping("/getAllName")  
    @ResponseBody
	public String getAllName(){
		List<Map<String, Object>> result = service.getAllName();
		return JSONArray.fromObject(result).toString();
	}
	
}
