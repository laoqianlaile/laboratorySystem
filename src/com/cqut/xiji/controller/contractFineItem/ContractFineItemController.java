package com.cqut.xiji.controller.contractFineItem;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.contractFineItem.IContractFineItemService;

@Controller
@RequestMapping("/contractFineItemController")
public class ContractFineItemController{
	
	@Resource(name="contractFineItemService")
	IContractFineItemService service;
	
	/**
	 * @description 任务统计初始化表格
	 * @author chenyubo
	 * @created 2016年10月18日 下午7:50:46
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getTestProjectInTaskStatistical")
	@ResponseBody
	public JSONObject getTestProjectInTaskStatistical(String ID,String testProjectID,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getTestProjectInTaskStatistical(ID,testProjectID,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 任务统计下查询所有该检测人员检测的检测项目
	 * @author chenyubo
	 * @created 2016年10月22日 上午10:38:38
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getAllTestProjectInTaskStatistical")
	@ResponseBody
	public String getAllTestProjectInTaskStatistical(String ID){
		List<Map<String, Object>> result = service.getAllTestProjectInTaskStatistical(ID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * 
	 * @description 任务统计下查看检测项目详情
	 * @author chenyubo
	 * @created 2016年10月22日 下午2:46:33
	 * @param ID
	 * @param testProjectID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getTaskStatisticalDetail")
	@ResponseBody
	public JSONObject getTaskStatisticalDetail(String ID,String contractCode,String receiptlistCode,String companyName,String startTime,String endTime,String sampleName,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getTaskStatisticalDetail(ID,contractCode,receiptlistCode,companyName,startTime,endTime,sampleName,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 科室任务统计下初始化表格
	 * @author chenyubo
	 * @created 2016年11月14日 上午9:56:49
	 * @param ID
	 * @param testProjectID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getTestProjectInDepartmentTaskStatistical")
	@ResponseBody
	public JSONObject getTestProjectInDepartmentTaskStatistical(String ID,String testProjectID,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getTestProjectInDepartmentTaskStatistical(ID,testProjectID,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 科室任务统计下获取该科室下的所有检测项目
	 * @author chenyubo
	 * @created 2016年11月14日 上午10:48:50
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getAllTestProjectInDepartmentTaskStatistical")
	@ResponseBody
	public String getAllTestProjectInDepartmentTaskStatistical(String ID){
		List<Map<String, Object>> result = service.getAllTestProjectInDepartmentTaskStatistical(ID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * 
	 * @description 科室任务统计下查看检测项目详情次数
	 * @author chenyubo
	 * @created 2016年11月14日 下午4:39:01
	 * @param ID
	 * @param contractCode
	 * @param receiptlistCode
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param sampleName
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getDepartmentTaskStatisticalDetail")
	@ResponseBody
	public JSONObject getDepartmentTaskStatisticalDetail(String ID,String testProjectID,String contractCode,String companyName,String startTime,String endTime,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getDepartmentTaskStatisticalDetail(ID,testProjectID,contractCode,companyName,startTime,endTime,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 科室任务统计下查看检测项目详情页面
	 * @author chenyubo
	 * @created 2016年11月14日 下午10:02:33
	 * @param ID
	 * @param testProjectID
	 * @param contractID
	 * @param contractCode
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getDepartmentTaskStatisticalDetailPage")
	@ResponseBody
	public JSONObject getDepartmentTaskStatisticalDetailPage(String ID,String testProjectID,String contractID,String contractCode,String receiptlistCode,String companyName,String sampleName,String startTime,String endTime,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getDepartmentTaskStatisticalDetailPage(ID,testProjectID,contractID,contractCode,receiptlistCode,companyName,sampleName,startTime,endTime,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	

	/**
	 * 
	 * @description 科室统计管理初始化表格
	 * @author chenyubo
	 * @created 2016年11月16日 下午3:42:54
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return 
	 */
	@RequestMapping("/getContentInDepartmentStatisticalManage")
	@ResponseBody
	public JSONObject getContentInDepartmentStatisticalManage(int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getContentInDepartmentStatisticalManage(limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 科室统计管理查询检测项目详细情况
	 * @author chenyubo
	 * @created 2016年11月16日 下午7:26:51
	 * @param ID
	 * @param testProjectID
	 * @param contractCode
	 * @param contractName
	 * @param startTime
	 * @param endTime
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getDepartmentStatisticalDetailPage")
	@ResponseBody
	public JSONObject getDepartmentStatisticalDetailPage(String ID,String testProjectID,String contractCode,String contractName,String startTime,String endTime,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getDepartmentStatisticalDetailPage(ID,testProjectID,contractCode,contractName,startTime,endTime,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	//
	@RequestMapping("/getContractFileItemWithPaging")
	@ResponseBody
	public JSONObject getContractFileItemWithPaging(String ID,int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getContractFileItemWithPaging(ID,limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addContractFineItem")  
    @ResponseBody
	public int addContractFineItem(String fineItemCode, String testProjectID, String testProjectName,
			int isOutsourcing, int calculateType, int number, double price, int hour, double money,
			String departmentID,String remarks, String contractID){
		int results = service.addContractFineItem(fineItemCode, testProjectID,testProjectName, isOutsourcing, calculateType, number, price, hour, money,departmentID, remarks, contractID);
		return results;
	}
	
	@RequestMapping("/delContractFineItem")  
    @ResponseBody
	public int delContractFineItem(String itemID,String contractID){
		int result = service.delContractFineItem(itemID,contractID);
		return result;
	}
	
	@RequestMapping("/updContractFineItem")  
    @ResponseBody
	public int updContractFineItem(String ID, String fineItemCode, String testProjectID,String testProjectName, int isOutsourcing,int calculateType, int number, double price, int hour, double money,  String departmentID, String remarks, String contractID){
		int results = service.updContractFineItem(ID, fineItemCode, testProjectID, testProjectName, isOutsourcing, calculateType, number, price, hour, money,departmentID, remarks, contractID);
		return results;
	}
	
	@RequestMapping("/updateContractAmount")  
    @ResponseBody
	public int updateContractAmount(String contractID){
		int result = service.updateContractAmount(contractID);
		return result;
	}
	
	@RequestMapping("/getContractFineItemByContractIDs")
	@ResponseBody
	public String getContractFineItemByContractIDs(String contractID){
		List<Map<String,Object>> result = service.getContractFineItemByContractIDs(contractID);
		return JSONArray.fromObject(result).toString();
	}
}
