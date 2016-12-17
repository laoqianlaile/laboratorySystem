package com.cqut.xiji.controller.department;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;



import net.sf.json.JSONArray;
import net.sf.json.JSONObject;




import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.department.IDepartmentService;

@Controller
@RequestMapping("/departmentController")
public class DepartmentController {

	
	@Resource(name="departmentService")
	IDepartmentService service;
	
	/**
	 *@description 得到部门名称及ID
	 * @author hujiajun
	 * @created 2016-10-17 下午9:47:29
	 * @return
	 */
	@RequestMapping("/getDepartmentName")  
    @ResponseBody
	public String getDepartmentName(){
		List<Map<String, Object>> result = service.getDepartmentName();
		return JSONArray.fromObject(result).toString();
	}
	
	@RequestMapping("/getDepartmentWithPage")  
    @ResponseBody
	public JSONObject getDepartmentWithPage(String departmentCode,String departmentName,String employeeName,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getDepartmentWithPage(departmentCode,departmentName,employeeName,limit,offset,order,sort);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addDepartment")
	@ResponseBody
	public String addDepartment(String departmentName,String departmentCode,String remarks,String employeeID,String parent){
		String result = service.addDepartment(departmentName ,departmentCode, remarks, employeeID, parent);
		return result;
	}
	@RequestMapping("/delDepartment")
	@ResponseBody
	public String delDepartment(String IDs){
		String result = service.delDepartment(IDs);
		return result;
	}
	@RequestMapping("/updDepartment")
	@ResponseBody
	public String updDepartment(String ID,String departmentName,String departmentCode,String remarks,String employeeID,String parent){
		String result=service.updDepartment(ID, departmentName, departmentCode, remarks, employeeID, parent);
		return result;
		
	}
	/**
	 * @description 下拉
	 * @author wujie
	 * @param type
	 * @return
	 */
	@RequestMapping("/getdatalist")
	@ResponseBody
	public JSONArray getdatalist(int type){
		System.out.println("5555555555555555555555555"+type);
		return service.getdatalist(type);
	}
	@RequestMapping("/getTree")
	@ResponseBody
	public String getTree(String location) {
		String tree = "[{ icon: 'glyphicon glyphicon-th', text: '系统基本管理',nodes: [{ icon: 'glyphicon glyphicon-th-large',text: '基本管理',nodes: [{ icon: 'glyphicon glyphicon-euro',text: '权限分配'}, { icon: 'glyphicon glyphicon-th-list',text: '模块管理'}, { icon: 'glyphicon glyphicon-user', text: '角色管理'},]},]}]";   
    	return JSONArray.fromObject(service.getModuleTree()).toString();
		
	}
	

}
