package com.cqut.xiji.service.task;

import java.util.List;
import java.util.Map;

public interface ITaskService {

	int setTestprojectId(String projectID);

	Map<String, Object> getWithPaging(int limit, int offset, String order,
			String sort, String taleName);

	Map<String, Object> getTaskWithPagingInTaskAssign(String ID, int limit,
			int offset, String sort, String order);

	int assignTaskPeople(String taskID, String taskManID, String IDs,
			int assignType, int type);

	Map<String, Object> getTaskProgressWithPaging(String ID, int limit,
			int offset, String sort, String order);

	Map<String, Object> getTaskAssignPeople(String ID, int limit, int offset,
			String sort, String order);

	Map<String, Object> getReceiptlistSampleInforWithPaging(String ID,
			int limit, int offset, String sort, String order);

	public String updReceiptlistSampleInForInReturn(String ID,
			String factoryCode, String sampleName, String specifications,
			String createTime);

	public String addTaskSample(String ID, String receiptlistID);

	public String deleteTaskByCondition(String reID);

	Map<String, Object> getWorkloadStatistical(String ID, int limit,
			int offset, String sort, String order, String detector,
			String sampleName, String factoryCode, String testProject);

	public Map<String, Object> getTaskWithPaging(int limit, int offset,
			String order, String sort, String receiptlistCode,
			String testProjectName, String sampleName, String beginTime,
			String endTime, String testProcess, String uploader);

	public Map<String, Object> getTaskAuditPersonWithPaging(int limit,
			int offset, String order, String sort);

	public boolean updateTaskAuditPerson(String taskID, String employeeID);

	public List<Map<String, Object>> checkTaskClientInfo(String taskID);

	public List<Map<String, Object>> getSampleManageInfo(String taskID);

	public Map<String, Object> getSampleInfoWithPaging(int limit, int offset,
			String order, String sort, String taskID);

	List<Map<String, Object>> getTaskByRelist(String receiptlistID);

	public List<Map<String, Object>> getProjectName(String taskID);

	public boolean setTaskDetectState(String taskID);

	public boolean recoverFileCheck(String taskID);

	public boolean setTestReportInfo(String taskID, String remarks);

	public List<Map<String, Object>> getReportFileID(String taskID);

	public boolean submitReport(String taskID);

	public String getFileIdOfTask(String taskID);

	public String downReportTemplate(String taskID, String projectName,
			String UPLOADER);

	public Map<String, Object> getTaskInfoWithPaging(int limit, int offset,
			String order, String sort);

	public Map<String, Object> getTaskTestReportWithPaging(int limit,
			int offset, String order, String sort);

	List<Map<String, Object>> getTaskInfor(String ID);

}
