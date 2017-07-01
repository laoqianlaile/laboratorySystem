package com.cqut.xiji.controller.standard;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.standard.IStandardService;

@Controller
@RequestMapping("/standardController")
public class StandardController{
	
	@Resource(name="standardService")
	IStandardService service;
	

	/**
	 * 通过标准ID删除管理员信息（可删除多个）
	 * @author zkl
	 * @param IDs    多个标准ID构成的字符串
	 * @return               删除成功返回删除的管理员信息数，失败返回0
	 */
	@RequestMapping("/delStandard")
	@ResponseBody
	public String delStandard(String standardIDs){
		String result = service.delStandard(standardIDs);
		return result;
	}
	
	/**
	 * 新增标准
	 * @author zkl
	 * @param STANDARDCODE 
	 * @param STANDARDNAME
	 * @param TYPE
	 * @param SCOPE
	 * @param APPLICATIONTYPE
	 * @param EDITSTATE
	 * @param DESCRIPTION
	 * @return            新增成功返回1，失败返回0
	 */
	@RequestMapping("/addStandard")
	@ResponseBody
	public String addStandard(String uploaderID,String STANDARDCODE, String STANDARDNAME, String TYPE, String SCOPE, int APPLICATIONTYPE, int EDITSTATE, String DESCRIPTION,String fileID,String EquipmentIDs){
		String result = service.addStandard(uploaderID,STANDARDCODE, STANDARDNAME, TYPE, SCOPE, APPLICATIONTYPE, EDITSTATE, DESCRIPTION,fileID,EquipmentIDs);
		return result;
	}
	
	/**
	 * 分页获取标准信息
	 * @author zkl
	 * @param limit     每页数量
	 * @param offset    起始下标
	 * @param order     排序字段 
	 * @param sort      排序方式
	 * @return          多个管理员信息组成的JSON数组对应的字符串
	 */
	@RequestMapping("/getStandardWithPaging")  
    @ResponseBody
	public JSONObject getStandardWithPaging(String STANDARDCODE,String STANDARDNAME, String TYPE, String STATE, String APPLICATIONTYPE,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getStandardWithPaging(STANDARDCODE, STANDARDNAME, TYPE, STATE, APPLICATIONTYPE, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	
	
	/**
	 * 更新数据
	 * @author zkl
	 * @param ID
	 * @param STANDARDCODE
	 * @param STANDARDNAME
	 * @param TYPE
	 * @param SCOPE
	 * @param APPLICATIONTYPE
	 * @param EDITSTATE
	 * @param STATE
	 * @param ABANDONAPPLYMAN
	 * @param ABANDONAPPLYTIME
	 * @param ABANDONAPPLYREASON
	 * @return
	 */
	@RequestMapping("/upStandard")
	@ResponseBody
	public String upStandard(String ID ,String STANDARDCODE , String STANDARDNAME, String TYPE, String SCOPE, String APPLICATIONTYPE, String EDITSTATE, String SUGGEST , String STATE,String ABANDONAPPLYMAN, String ABANDONAPPLYREASON,String EquipmentIDs){
		String result = service.upStandard(ID,STANDARDCODE, STANDARDNAME, TYPE, SCOPE, APPLICATIONTYPE, EDITSTATE, SUGGEST,STATE,ABANDONAPPLYMAN,ABANDONAPPLYREASON,EquipmentIDs);
		return result;
	}
	
	/**
	 * 获取标准类型数据
	 * @return
	 */
	@RequestMapping("/getStandardType")
	@ResponseBody
	public List<Map<String, Object>> getStandardType(){
		List<Map<String, Object>> result = service.getStandardType();
		return result; 
	}
	
	/**
	 *  检查是否可以覆盖上传
	 * @author zkl
	 * @data 2017年4月17日 下午9:06:17
	 * @return
	 */
	@RequestMapping("/recoverCheck")
	@ResponseBody
	public boolean recoverCheck(String standardID){
		boolean result = service.recoverCheck(standardID);
		return result;
	}
	
	
	
	/**
	 * 覆盖上传后更新文件id
	 * 
	 * @author zkl
	 * @data 2017年4月17日 下午9:50:05
	 * @param standardID
	 * @param fileID
	 * @return
	 */
	@RequestMapping("/upFileID")
	@ResponseBody
	public String upFileID(String standardID,String fileID){
		String result = service.upFileID(standardID,fileID);
		return result;
	}
	
	
	/**
	 * 
	 * 提交审核
	 * 
	 */
	@RequestMapping("/upSubmitStandard")
	@ResponseBody
	public String upSubmitStandard(String standardIDs){
		String result = service.upSubmitStandard(standardIDs);
		
		return standardIDs;
		
		
	}
	
	/**
	 * 标准审核分页展示
	 * 
	 * @author zkl
	 * @data 2017年6月3日 下午3:23:00
	 * @param STANDARDCODE
	 * @param STANDARDNAME
	 * @param TYPE
	 * @param STATE
	 * @param APPLICATIONTYPE
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getStandardReviewWithPaging")  
    @ResponseBody
	public JSONObject getStandardReviewWithPaging(String STANDARDCODE,String STANDARDNAME, String TYPE, String STATE, String APPLICATIONTYPE,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getStandardReviewWithPaging(STANDARDCODE, STANDARDNAME, TYPE, STATE, APPLICATIONTYPE, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 通过输入名字或者标准代号模糊匹配查询
	 * 
	 * @author zkl
	 * @data 2017年7月1日 下午1:33:33
	 * @param standardName
	 * @return
	 */
	@RequestMapping("/getStandardByName")
    @ResponseBody
	public String getStandardByName(String matchName){
		List<Map<String, Object>> result = service.getTestProjectByName(matchName);
		return JSONArray.fromObject(result).toString();
	}
}
