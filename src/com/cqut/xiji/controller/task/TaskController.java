package com.cqut.xiji.controller.task;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.cqut.xiji.service.task.ITaskService;
@Controller
@RequestMapping("/taskController")
public class TaskController{
	
	@Resource(name="taskService")
	ITaskService service;
	
	/**
	 * 
	 * @description 任务分配获取指定交接单下的分页任务
	 * @author chenyubo
	 * @created 2016年10月13日 下午11:37:03
	 * @param ID 交接单ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/getTaskWithPagingInTaskAssign")  
    @ResponseBody
	public JSONObject getTaskWithPagingInTaskAssign(String ID, int limit, int offset, String sort, String order){
		System.out.println("limit:"+limit+",offset:"+offset+",sort:"+sort+",order:"+order);
		Map<String, Object> result = service.getTaskWithPagingInTaskAssign(ID,limit,offset,sort,order);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 分配监督员或检测人员
	 * @author chenyubo
	 * @created 2016年10月13日 下午11:37:44
	 * @param IDs
	 * @return
	 */
	@RequestMapping("/assignTaskPeople")  
    @ResponseBody
	public String assignTaskPeople(String taskID,String taskManID,String IDs,int assignType,int type){
		return service.assignTaskPeople(taskID,taskManID,IDs,assignType,type)+"";
	}
	
	/**
	 * 
	 * @description 任务分配下查询交接单进度
	 * @author chenyubo
	 * @created 2016年10月17日 下午2:56:19
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/getTaskProgressWithPaging")  
    @ResponseBody
	public JSONObject getTaskProgressWithPaging(String ID,int limit, int offset, String sort, String order){
		Map<String, Object> result = service.getTaskProgressWithPaging(ID,limit,offset,sort,order);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 查询某任务下所有的检测人员和监督员
	 * @author chenyubo
	 * @created 2016年10月17日 下午2:56:19
	 * @param ID 任务ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/getTaskAssignPeople")  
    @ResponseBody
	public JSONObject getTaskAssignPeople(String ID,int limit, int offset, String sort, String order){
		Map<String, Object> result = service.getTaskAssignPeople(ID,limit,offset,sort,order);
		return JSONObject.fromObject(result);
	}
	
	
	/**
	 * @description  获取交接单中的信息
	 * @author hzz
	 * @date 2016年 10月19日 晚上19:20:05
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/getReceiptlistSampleInforWithPaging")
	@ResponseBody
	public JSONObject getReceiptlistSampleInforWithPaging(String ID, int limit,int offset, String sort, String order) {
		Map<String, Object> result = service.getReceiptlistSampleInforWithPaging(ID, limit, offset, sort,order);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 更新交接单中的样品信息
	 * @author hzz
	 * @date 2016年11月12日 早上 09：35:12
	 * @param ID
	 * @param factoryCode
	 * @param sampleName
	 * @param specifications
	 * @param createTime
	 * @param testID 
	 * @param nameCn 
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("/updReceiptlistSampleInForInReturn")  
    @ResponseBody
    public String updReceiptlistSampleInForInReturn(String ID, String factoryCode,
			String sampleName, String specifications,String createTime
			) throws UnsupportedEncodingException {
		System.out.println(sampleName);
		sampleName=URLDecoder.decode(sampleName,"utf-8");
		String result = service.updReceiptlistSampleInForInReturn(ID, factoryCode, sampleName, specifications,createTime);
		return result;
	}
	
	/**
	 * @description 录入样品
	 * @author hzz
	 * @date 2016年11月17日 晚上 20:3:09
	 * @param ID
	 * @param receiptlistID
	 * @param tastID
	 * @return
	 */
	@RequestMapping("/addTaskSample")  
    @ResponseBody
	public String addTaskSample(String ID, String receiptlistID){
		String result = service.addTaskSample(ID,receiptlistID);
		return result;
	}
	
	/**
	 * fujianfei
	 * @param ID
	 * @return
	 */
	@RequestMapping("/setTestProjectId")
	@ResponseBody
	public int setTestProjectId(String ID){
		System.out.println(ID);
		return service.setTestprojectId(ID); 
	}
	
	/**
	 * 
	 * @description 初始流程监测表
	 * @author fei
	 * @created 2016-10-8 下午8:02:32
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param tableName
	 * @return
	 */
	@RequestMapping("/getWithPaging")
	@ResponseBody
	public JSONObject getWithPaging(int limit, int offset,String order, String sort, String tableName){
		
		System.out.println("访问到了tascon "+ "<br />");
		Map<String, Object> result = service.getWithPaging(limit, offset, order, sort, tableName);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 删除交接单样品
	 * @author hzz
	 * @date 2016年11月30日 下午3:05:25
	 * @param reID
	 * @return
	 */
	@RequestMapping("/deleteTaskByCondition")
	@ResponseBody
	public String deleteTaskByCondition(String reID){
		String result = service.deleteTaskByCondition(reID);
		return result;
	}
	
	/**
	 * 
	 * @description 科室主管桌面查看工作量统计
	 * @author chenyubo
	 * @created 2016年12月12日 下午10:16:08
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/getWorkloadStatistical")  
    @ResponseBody
	public JSONObject getWorkloadStatistical(String ID, int limit, int offset, String sort, String order, String detector, String sampleName, String factoryCode, String testProject){
		Map<String, Object> result = service.getWorkloadStatistical(ID,limit,offset,sort,order,detector,sampleName,factoryCode,testProject);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
     * @discription 初始化任务管理界面的数据
     * @author zt       
     * @created 2016-12-20 上午11:13:03     
     * @param limit
     * @param offset
     * @param order
     * @param sort
     * @param receiptlistCode
     * @param testProjectName
     * @param sampleName
     * @param beginTime
     * @param endTime
     * @param testProcess
     * @return
	 */
	@RequestMapping("/getTaskWithPaging")  
    @ResponseBody
	public JSONObject getTaskWithPaging(int limit, int offset, String order,
			String sort, String receiptlistCode, String testProjectName,
			String sampleName, String beginTime, String endTime,
			String testProcess) {
		Map<String, Object> result = service.getTaskWithPaging(limit, offset,
				order, sort, receiptlistCode, testProjectName, sampleName,
				beginTime, endTime, testProcess);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
     * @discription 指定审核人
     * @author zt       
     * @created 2016-12-15 下午9:40:17     
     * @param taskID
     * @param employeeID
     * @return
	 */
	@RequestMapping("/updateTaskAuditPerson")
	@ResponseBody
	public boolean updateTaskAuditPerson(String taskID,String employeeID){
		boolean result = service.updateTaskAuditPerson(taskID,employeeID);
		return result;
	}
	
	/**
	 * 
     * @discription 查看任务对应的委托公司等信息
     * @author zt       
     * @created 2016-12-15 下午10:04:58     
     * @param taskID
     * @return
	 */
	@RequestMapping("/checkTaskClientInfo")
	@ResponseBody
	public List<Map<String, Object>> checkTaskClientInfo(String taskID){
		List<Map<String, Object>> result = service.checkTaskClientInfo(taskID);
		return result;
	}
	
	/**
	 * 
     * @discription 获取样品管理员和委托时间的信息
     * @author zt       
     * @created 2016-12-16 下午8:14:45     
     * @param taskID
     * @return
	 */
	@RequestMapping("/getSampleManageInfo")
	@ResponseBody
	public List<Map<String, Object>> getSampleManageInfo(String taskID){
		List<Map<String, Object>> result = service.getSampleManageInfo(taskID);
		return result;
	}
	
	/**
	 * 
     * @discription 获取任务所对应的样品信息
     * @author zt       
     * @created 2016-12-16 下午7:21:10     
     * @param limit
     * @param offset
     * @param order
     * @param sort
     * @return
	 */
	@RequestMapping("/getSampleInfoWithPaging")
	@ResponseBody
	public JSONObject getSampleInfoWithPaging(int limit, int offset, String order,String sort,String taskID) {
		Map<String, Object> result = service.getSampleInfoWithPaging(limit,offset,order,sort,taskID);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
     * @discription 获取任务审核人列表
     * @author zt       
     * @created 2016-12-20 上午11:12:30     
     * @param limit
     * @param offset
     * @param order
     * @param sort
     * @return
	 */
	@RequestMapping("/getTaskAuditPersonWithPaging")
	@ResponseBody
	public JSONObject getTaskAuditPersonWithPaging(int limit, int offset, String order,String sort) {
		Map<String, Object> result = service.getTaskAuditPersonWithPaging(limit,offset,order,sort);
		return JSONObject.fromObject(result);
	}
	
    /**
     * 
     * @discription 检查当前审核状态下是否可以上传检测报告
     * @author zt       
     * @created 2016-12-24 下午5:15:18     
     * @param taskID
     * @return
     */
	@RequestMapping("/recoverFileCheck")
	@ResponseBody
	public boolean recoverFileCheck(String taskID) {
		boolean result = service.recoverFileCheck(taskID);
		return result;
	}
	
	/**
	 * 
	 * @discription 通过任务ID获取对应的项目名字
	 * @author zt
	 * @created 2016-12-23 下午5:03:27
	 * @param taskID
	 * @return
	 */
	@RequestMapping("/getProjectName")
	@ResponseBody
	public List<Map<String, Object>> getProjectName(String taskID) {
		List<Map<String, Object>> result = service.getProjectName(taskID);
		return result;
	}
	
	/**
	 * 
	 * @discription 设置相应任务的检测状态
	 * @author zt
	 * @created 2016-12-23 下午9:32:11
	 * @param taskID
	 * @return
	 */
	@RequestMapping("/setTaskDetectState")
	@ResponseBody
	public boolean setTaskDetectState(String taskID) {
		boolean result = service.setTaskDetectState(taskID);
		return result;
	}
	
	/**
	 * 
     * @discription 设置检测报告信息
     * @author zt       
     * @created 2016-12-24 下午5:58:01     
     * @param taskID
     * @return
	 */
	@RequestMapping("/setTestReportInfo")
	@ResponseBody
	public boolean setTestReportInfo(String taskID,String remarks) {
		boolean result = service.setTestReportInfo(taskID,remarks);
		return result;
	}
	
	/**
	 * 
     * @discription 获取检测报告对应的文件ID
     * @author zt       
     * @created 2017-1-19 下午7:47:57     
     * @param taskID
     * @return
	 */
	@RequestMapping("/getReportFileID")
	@ResponseBody
	public List<Map<String, Object>> getReportFileID(String taskID) {
		List<Map<String, Object>> result = service.getReportFileID(taskID);
		return result;
	}
	
    /**
     * 
     * @discription 提交审核
     * @author zt       
     * @created 2016-12-25 下午5:48:27     
     * @param taskID
     * @return
     */
	@RequestMapping("/submitReport")
	@ResponseBody
	public boolean submitReport(String taskID) {
		boolean result = service.submitReport(taskID);
		return result;
	}
	
	/**
	 * 通过交接单获取任务列表（用于账目支付详细填写列表）
	 * 
	 * @author zkl
	 * @param ReceiptlistID
	 * @return
	 */
	@RequestMapping("/getTaskByRelist")
	@ResponseBody
	public String getTaskByRelist(String ReceiptlistID){
		List<Map<String,Object>> result = service.getTaskByRelist(ReceiptlistID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * 
     * @discription 获取任务对应的检测报告的文件ID
     * @author zt       
     * @created 2017-4-8 上午10:44:30     
     * @param taskID
     * @return
	 */
	@RequestMapping("/getFileIdOfTask")
	@ResponseBody
	public String getFileIdOfTask(String taskID) {
		String fileID = service.getFileIdOfTask(taskID);
		return fileID + "";
	}
	
    /**
     * 
     * @discription 下载报告模版
     * @author zt       
     * @created 2017-3-11 下午9:48:35     
     * @param taskID
     * @param projectName
     * @param req
     * @return
     */
	@RequestMapping("/downReportTemplate")
	@ResponseBody
	public String downReportTemplate(String taskID, String projectName,HttpServletRequest req) {
		Object obj = req.getSession().getAttribute("EMPLOYEEID");
		String UPLOADER = "";
		if (obj != null) {
			UPLOADER = (String) obj;// 员工ID,从session里面取出来
		}
		String result = service.downReportTemplate(taskID, projectName,UPLOADER);
		return result + "";
	}

    /**
	 * @description 获取任务信息
	 * @author HZZ
	 * @date 2016年12月26日 17:28:05
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getTaskInfoWithPaging")
	@ResponseBody
	public JSONObject getTaskInfoWithPaging(int limit, int offset,
			String order, String sort) {
		Map<String, Object> result = service.getTaskInfoWithPaging(limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	
	/**
	 * @description 获取检测报告
	 * @author HZZ
	 * @date 2016年12月27日 晚上21:00:20
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@RequestMapping("/getTaskTestReportWithPaging")
	@ResponseBody
	public JSONObject getTaskTestReportWithPaging(int limit, int offset,
			String order, String sort) {
		Map<String, Object> result = service.getTaskTestReportWithPaging(limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	
	/**
	 * @description 获取指定任务信息
	 * @author HZZ
	 * @date 2016年12月28日 晚上19:39:35
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getTaskInfor")  
	@ResponseBody
	public String getTaskInfor(String ID){
		System.out.println(ID);
		List<Map<String, Object>> result = service.getTaskInfor(ID);
		return JSONArray.fromObject(result).toString();
	}
}

