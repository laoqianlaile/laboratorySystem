package com.cqut.xiji.controller.testProject;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.testProject.ITestProjectService;

@Controller
@RequestMapping("/testProjectController")
public class TestProjectController{
	
	@Resource(name="testProjectService")
	ITestProjectService service;
	
	
	/**
	 * 分页获取项目检测信息
	 * @author zkl
	 * @param limit     每页数量
	 * @param offset    起始下标
	 * @param order     排序字段 
	 * @param sort      排序方式
	 * @return          多个管理员信息组成的JSON数组对应的字符串
	 */
	@RequestMapping("/getTestProjectWithPaging")  
    @ResponseBody
	public JSONObject getTestProjectWithPaging(String departmentID,String nameCnORnameEn,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getTestProjectWithPaging(departmentID,nameCnORnameEn, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * 添加新的检测项目
	 * 
	 * @author zkl
	 * @param NAMECN  中文名称
	 * @param NAMEEN  英文名称
	 * @param DEPARTMENTID 关联Department 
	 * @param ENVIRONMENTALREQUIREMENTS 环境要求
	 * @param STANDARDID 关联Standard
	 * @param EQUIPMENTID 关联Equipment
	 * @param DESCRIPTION 标准描述
	 * @return  成功返回3 失败返回小于3
	 */ 
	@RequestMapping("/addTestProject")
	@ResponseBody
	public String addTestProject(String NAMECN, String NAMEEN, String departmentID, String ENVIRONMENTALREQUIREMENTS, String standardID, String EQUIPMENTID,String describes,String remarks,String testTypeID,String uncertainty){
		String result = service.addTestProject(NAMECN, NAMEEN, departmentID, ENVIRONMENTALREQUIREMENTS, standardID, EQUIPMENTID,describes,remarks,testTypeID,uncertainty);
		return result;
	}
	
	/**
	 * 修改已有的项目检测
	 * 
	 * @author zkl
	 * @param TESTPROJECTID
	 * @param NAMECN
	 * @param NAMEEN
	 * @param DEPARTMENTID
	 * @param ENVIRONMENTALREQUIREMENTS
	 * @param STANDARDID
	 * @param EQUIPMENTID
	 * @param DESCRIPTION
	 * @return
	 */
	@RequestMapping("/editTestProject")
	@ResponseBody
	public String editTestProject(String testProjectID,String testStandardID,String testInstumentID,String testDepartmentID,String NAMECN, String NAMEEN, String departmentID, String ENVIRONMENTALREQUIREMENTS, String standardID, String EQUIPMENTID,String describes,String remarks,String testTypeID){
		String result = service.upTestProject(testProjectID,testStandardID,testInstumentID,testDepartmentID, NAMECN, NAMEEN, departmentID, ENVIRONMENTALREQUIREMENTS, standardID, EQUIPMENTID,describes,remarks,testTypeID);
		return result;
	}
	
	/**
	 * 通过检测项目ID删除信息（可删除多个）
	 * @author zkl
	 * @param IDs    多个检测项目ID构成的字符串
	 * @return               删除成功返回删除的检测项目信息数，失败返回0
	 */
	@RequestMapping("/delTestProject")
	@ResponseBody
	public String delTestProject(String TestProjectIDs){
		String result = service.delTestProject(TestProjectIDs);
		return result;
	}

	/**
	 * 查询Department表返回部门信息
	 * 
	 * @author zkl
	 * @return  部门名称信息
	 */
	
	@RequestMapping("/getDepartment")
	@ResponseBody
	public List<Map<String, Object>> getDepartment(){
		List<Map<String, Object>> result = service.getDepartment();
		return result; 
	}
	
	
	/**
	 * 查询Equipment表返回设备名称信息
	 * 
	 * @author zkl                                                                                                                                                                                                                                                                                                                                                     
	 * @return 返回设备名称信息
	 */
	@RequestMapping("/getEquipment")
	@ResponseBody
	public String getEquipment(){
		List<Map<String, Object>> result = service.getEquipment();
		return JSONArray.fromObject(result).toString();
	}
	
	
	/**
	 * 
	 * @author zkl
	 * @return 返回标准编码信息
	 */
	@RequestMapping("/getStandard")
	@ResponseBody
	public List<Map<String, Object>> getStandard(){
		List<Map<String, Object>> result = service.getStandard();
		return result;
	}
	/**
	 * 
	 * @author wzj
	 * @date 2016年11月19日 上午9:38:29
	 * @return
	 */
	@RequestMapping("/getTestProjectListByName")
	@ResponseBody
    public String getTestProjectListByName(String matchName,String contractID){
		if(contractID == null) 
			return null;
		List<Map<String, Object>> result = service.getTestProjectListByName(matchName,contractID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 通过检测项目名称得到检查项目信息
	 * @author hujiajun
	 * @created 2016年12月12日19:13:01
	 * @param testProjectName
	 * @return
	 */
	@RequestMapping("/getTestProjectByName")  
    @ResponseBody
	public String getTestProjectByName(String testProjectName){
		List<Map<String, Object>> result = service.getTestProjectByName(testProjectName);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 通过检测项目ID得到检查项目信息
	 * @author hujiajun
	 * @created 2016年12月12日19:13:01
	 * @param testProjectByID
	 * @return
	 */
	@RequestMapping("/getTestProjectById")  
    @ResponseBody
	public String getTestProjectById(String testProjectByID){
		List<Map<String, Object>> result = service.getTestProjectById(testProjectByID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * 
     * @discription 模糊查询获取检测项目名称
     * @author zt       
     * @created 2016-12-14 下午9:41:24     
     * @param testProjectNamae
     * @return
	 */
	@RequestMapping("/getTestProject")
	@ResponseBody
	public List<Map<String, Object>> getTestProject(String testProjectNamae){
      	List<Map<String, Object>> result = service.getTestProject(testProjectNamae);
		return result;
	}
	
	/**
	 * 
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param contract
	 * @return
	 */
	@RequestMapping("/getTestproWithPaging")
	@ResponseBody
	public JSONObject getTestproWithPaging(int limit, int offset,
			String order, String sort, String contract,HttpSession session) {
		Map<String, Object> result = service.getTestproWithPaging(limit, offset, order, sort, contract,session);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
     * @discription 获取所有的检测项目
     * @author zt       
     * @created 2017-5-23 下午8:40:54     
     * @return
	 */
	@RequestMapping("/getAllTestProject")
	@ResponseBody
	public List<Map<String, Object>> getAllTestProject(){
      	List<Map<String, Object>> result = service.getAllTestProject();
		return result;
	}

	/**
	 * 获取检测类别
	 * 
	 * @author zkl
	 * @data 2017年5月20日 下午5:41:28
	 * @return
	 */
	@RequestMapping("/getTestType")
	@ResponseBody
	public List<Map<String, Object>> getTestType(){
		List<Map<String, Object>> result = service.getTestType();
		return result;
	}

	/**
	 * @description 任务分配下修改工时
	 * @author chenyubo
	 * @date 2017-05-19 21:11:11
	 * @param ID 检测项目ID
	 * @return
	 */
	@RequestMapping("/editLaborHourInTaskAssign")  
	@ResponseBody
	public String editLaborHourInTaskAssign(String ID, double laborHour){
		return service.editLaborHourInTaskAssign(ID, laborHour);
	}
	
	/**
	 * @description 获取检测项目工时
	 * @param name
	 * @param testName
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getTestProjectManHour")
    @ResponseBody
	public JSONObject getTestProjectManHour(String name,
			String testName,  int limit, int offset, String order,String sort){
		Map<String, Object> result =service.getTestProjectManHour(name, testName, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 获取所有的检测类别
	 * @return
	 */
	@RequestMapping("/getAllTestType")
	@ResponseBody
	public String getAllTestType(){
		List<Map<String, Object>> result = service.getAllTestType();
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @descripton 删除检测工时中的检测项目
	 * @param IDs
	 * @return
	 */
	@RequestMapping("/delTestProjectInManHour")
    @ResponseBody
	public String delTestProjectInManHour(String IDs){
		String result = service.delTestProjectInManHour(IDs);
		return result;
	}
	
	/**
	 * @description 获取检测项目工时
	 * @param testName
	 * @return
	 */
	@RequestMapping("/getTestProjectByTestName")  
    @ResponseBody
	public String getTestProjectByTestName(String testName){
		List<Map<String, Object>> result = service.getTestProjectByTestName(testName);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 新增工时
	 * @param ID
	 * @param testTypeID
	 * @param laborHour
	 * @return
	 */
	@RequestMapping("/updateManHour")  
    @ResponseBody
	public String updateManHour(String ID,String testTypeID, double laborHour){
		String result = service.updateManHour(ID, testTypeID, laborHour);
		return result;
	}
	
}
