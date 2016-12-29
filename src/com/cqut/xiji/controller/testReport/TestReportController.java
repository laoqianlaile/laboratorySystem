package com.cqut.xiji.controller.testReport;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.testReport.ITestReportService;

@Controller
@RequestMapping("/testReportController")
public class TestReportController {

	@Resource(name = "testReportService")
	ITestReportService service;

	/**
	 * 
	 * @discription 检测报告管理页面数据
	 * @author zt
	 * @created 2016-11-21 下午9:12:22
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param transitreceiptNumber
	 * @param client
	 * @param reportName
	 * @param beginTime
	 * @param endTime
	 * @param selectPart
	 * @return
	 */
	@RequestMapping("/getTestReportWithPaging")
	@ResponseBody
	public JSONObject getTestReportWithPaging(int limit, int offset,
			String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime,
			String selectPart) {
		Map<String, Object> result = service.getTestReportWithPaging(limit,
				offset, order, sort, receiptlistCode , client, reportName,
				beginTime, endTime, selectPart);
		return JSONObject.fromObject(result);
	}

	/**
	 * 
	 * @discription 获取检测报告审核页面数据
	 * @author zt
	 * @created 2016-11-21 下午9:12:40
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param transitreceiptNumber
	 * @param client
	 * @param reportName
	 * @param beginTime
	 * @param endTime
	 * @return
	 */
	@RequestMapping("/getTestReporSecondtAuditWithPaging")
	@ResponseBody
	public JSONObject getTestReporSecondtAuditWithPaging(int limit, int offset,
			String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime,
			String selectPart) {
		Map<String, Object> result = service.getTestReporSecondtAuditWithPaging(
				limit, offset, order, sort, receiptlistCode, client,
				reportName, beginTime, endTime);
		return JSONObject.fromObject(result);
	}

	/**
	 * 
	 * @discription 获取签发人报告审核页面数据
	 * @author zt       
	 * @created 2016-11-23 下午2:13:27     
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param transitreceiptNumber
	 * @param client
	 * @param reportName
	 * @param beginTime
	 * @param endTime
	 * @return
	 */
	@RequestMapping("/getTestReporThirdtAuditWithPaging")
	@ResponseBody
	public JSONObject getTestReporThirdtAuditWithPaging(int limit, int offset,
			String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime ) {
		Map<String, Object> result = service.getTestReporThirdtAuditWithPaging(
				limit, offset, order, sort, receiptlistCode, client,
				reportName, beginTime, endTime);
		return JSONObject.fromObject(result);
	}
	
	
	/**
	 * 
     * @discription 检测是否可以重新覆盖
     * @author zt       
     * @created 2016-12-26 下午3:25:56     
     * @param ID
     * @return
	 */
	@RequestMapping("/recoverCheck")
	@ResponseBody
	public boolean recoverCheck(String ID) {
		boolean result = service.recoverCheck(ID);
		return result;
	}
	
	/**
	 * 
	 * @description 重新覆盖
	 * @author zt
	 * @created 2016-11-19 下午3:09:03
	 * @param ID
	 * @param fileID
	 * @param versionNumber
	 * @param versionInfo
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/updateTestReport")
	@ResponseBody
	public boolean updateTestReport(String ID,String taskID,String versionNumber,String versionInfo, String remarks) {
		boolean result = service.updateTestReport(ID,taskID,versionNumber,versionInfo, remarks);
		return result;
	}

	/***
	 * 
     * @discription 检查相应的检测报告是否能提交审核
     * @author zt       
     * @created 2016-12-10 下午2:11:01     
     * @param ID
     * @return
	 */
	@RequestMapping("/submitReportCheck")
	@ResponseBody
	public boolean submitReportCheck(String ID) {
		boolean result = service.submitReportCheck(ID);
		return result;

	}

	/***
	 * 
     * @discription 获取该检测报告所对应的项目名
     * @author zt       
     * @created 2016-12-10 下午2:10:20     
     * @param ID
     * @return
	 */
	@RequestMapping("/getProjectName")
	@ResponseBody
	public List<Map<String,Object>> getProjectName(String ID) {
		List<Map<String, Object>> result = service.getProjectName(ID);
		return result;

	}
	
	/**
	 * 
	 * @description 提交审核
	 * @author zt
	 * @created 2016-11-19 下午3:09:28
	 * @param ID
	 * @param fileID
	 * @return
	 */
	@RequestMapping("/submitReport")
	@ResponseBody
	public boolean submitReport(String ID) {
		boolean result = service.submitReport(ID);
		return result;

	}

	/**
	 * 
	 * @discription 设置文件的belongID
	 * @author zt
	 * @created 2016-11-21 下午9:13:06
	 * @param ID
	 * @param fileID
	 * @return
	 */
	@RequestMapping("/setFileBelongID")
	@ResponseBody
	public boolean setFileBelongID(String ID, String fileID) {
		boolean result = service.setFileBelongID(ID, fileID);
		return result;

	}

    /**
     * 
     * @discription 通过检测报告主键获取对应的文件ID
     * @author zt       
     * @created 2016-11-25 下午5:04:58     
     * @param ID
     * @return
     */
	@RequestMapping("/getFileID")
	@ResponseBody
	public String getFileID(String ID) {
		String result = service.getFileID(ID);
		return result;
	}
	
	/**
	 * 
     * @discription 根据检测报告主键获取对于的模版文件ID
     * @author zt       
     * @created 2016-11-25 下午5:52:27     
     * @param ID
     * @return
	 */
	@RequestMapping("/getTemplateFileID")
	@ResponseBody
	public List<Map<String, Object>> getTemplateFileID(String ID) {
		List<Map<String, Object>> result = service.getTemplateFileID(ID);
		return result;
	}
	
	/**
	 * 
	 * @description 查看检测报告详细信息
	 * @author zt
	 * @created 2016-11-19 下午3:09:44
	 * @param receiptlistID
	 * @return
	 */
	@RequestMapping("/getCilentInfo")
	@ResponseBody
	public List<Map<String, Object>> getCilentInfo(String testReportID) {
		List<Map<String, Object>> result = service.getCilentInfo(testReportID);
		return result;

	}

	/**
	 * 
	 * @description 查看样品信息
	 * @author zt
	 * @created 2016-11-19 下午3:09:59
	 * @param receiptlistID
	 * @param testReportID
	 * @return
	 */
	@RequestMapping("/getSampleInfoWithPaging")
	@ResponseBody
	public JSONObject getSampleInfoWithPaging(int limit, int offset, String order,String sort,String testReportID) {
		Map<String, Object> result = service.getSampleInfoWithPaging(limit,offset,order,sort,testReportID);
		return JSONObject.fromObject(result);
	}

	/**
	 * 
	 * @description 查看检测报告详细信息
	 * @author zt
	 * @created 2016-11-19 下午3:10:14
	 * @param receiptlistID
	 * @param testReportID
	 * @return
	 */
	@RequestMapping("/getTestReportFileInfoWithPaging")
	@ResponseBody
	public JSONObject getTestReportFileInfoWithPaging(int limit, int offset, String order,String sort,String testReportID) {
		Map<String, Object> result = service.getTestReportFileInfoWithPaging(limit,offset,order,sort,testReportID);
		return JSONObject.fromObject(result);
	}
	
	

	@RequestMapping("/deleteCheck")
	@ResponseBody
	public boolean deleteCheck(String ID) {
		boolean result = service.deleteCheck(ID);
		return result;
	}
	
	/**
	 * 
	 * @discription 删除对应的检测报告数据
	 * @author zt
	 * @created 2016-11-21 下午9:13:30
	 * @param ID
	 * @return
	 */
	@RequestMapping("/deleteOtherTableInfo")
	@ResponseBody
	public boolean deleteOtherTableInfo(String ID,String taskID) {
		boolean result = service.deleteOtherTableInfo(ID,taskID);
		return result;
	}

	/**
	 * 
	 * @discription 设置通过二审
	 * @author zt
	 * @created 2016-11-21 下午9:14:23
	 * @param ID
	 * @return
	 */
	@RequestMapping("/secondPassReport")
	@ResponseBody
	public boolean secondPassReport(String ID) {
		boolean result = service.secondPassReport(ID);
		return result;
	}

	/**
	 * 
	 * @discription 设置二审驳回
	 * @author zt
	 * @created 2016-11-21 下午9:17:49
	 * @param ID
	 * @param dismissreason
	 * @return
	 */
	@RequestMapping("/secondRejectReport")
	@ResponseBody
	public boolean secondRejectReport(String ID, String dismissreason) {
		boolean result = service.secondRejectReport(ID, dismissreason);
		return result;
	}

	/**
	 * 
	 * @discription 设置通过三审
	 * @author zt
	 * @created 2016-11-21 下午9:32:30
	 * @param ID
	 * @return
	 */
	@RequestMapping("/thirdPassReport")
	@ResponseBody
	public boolean thirdPassReport(String ID) {
		boolean result = service.thirdPassReport(ID);
		return result;
	}

	/**
	 * 
	 * @discription 设置驳回三审
	 * @author zt
	 * @created 2016-11-21 下午9:34:19
	 * @param ID
	 * @param dismissreason
	 * @return
	 */
	@RequestMapping("/thirdRejectReport")
	@ResponseBody
	public boolean thirdRejectReport(String ID, String dismissreason) {
		boolean result = service.thirdRejectReport(ID, dismissreason);
		return result;
	}
}
