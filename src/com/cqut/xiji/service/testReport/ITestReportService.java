package com.cqut.xiji.service.testReport;

import java.util.List;
import java.util.Map;

public interface ITestReportService {
	public Map<String, Object> getTestReportWithPaging(int limit, int offset,
			String order, String sort, String receiptlistCode, String client,
			String reportName, String beginTime, String endTime,
			String selectPart, String uploader);

	public Map<String, Object> getTestReporSecondtAuditWithPaging(int limit,
			int offset, String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime,
			String selectPart, String auditPerson);

	public Map<String, Object> getTestReporThirdtAuditWithPaging(int limit,
			int offset, String order, String sort, String transitreceiptNumber,
			String client, String reportName, String beginTime, String endTime,
			String selectPart);

	public List<Map<String, Object>> getProjectName(String ID);

	public boolean recoverCheck(String ID);

	public boolean updateTestReport(String ID, String taskID,
			String versionNumber, String versionInfo, String remarks);

	public boolean submitReportCheck(String ID);

	public boolean submitReport(String ID, String taskID);

	public String getFileID(String ID);

	public List<Map<String, Object>> getTemplateFileID(String ID);

	public List<Map<String, Object>> getCilentInfo(String testReportID);

	public Map<String, Object> getSampleInfoWithPaging(int limit, int offset,
			String order, String sort, String testReportID);

	public Map<String, Object> getTestReportFileInfoWithPaging(int limit,
			int offset, String order, String sort, String testReportID);

	public boolean deleteCheck(String ID);

	public boolean deleteOtherTableInfo(String ID, String taskID);

	public boolean secndAuditOperateCheck(String ID);

	public boolean secondPassReport(String ID, String taskID,
			String auditPassAgreement);

	public boolean secondRejectReport(String ID, String taskID,
			String dismissreason);

	public boolean thirdAuditOperateCheck(String ID);

	public boolean thirdPassReport(String ID, String taskID,
			String auditPassAgreement);

	public boolean thirdRejectReport(String ID, String taskID,
			String dismissreason);

	public boolean setReportSendCheck(String ID);

	public boolean setReportSendInfo(String ID, String receiveMan,
			String uploader);

	public Map<String, Object> getTestReportSendRecord(int limit, int offset,
			String order, String sort, String receiptlistCode, String client,
			String reportName, String beginTime, String endTime,
			String receiveManName);

	public boolean pigeonholeReport(String ID);

	public List<Map<String, Object>> getReportInfo(String taskID);

	public boolean recoatCheck(String[] taskIDs, String fileIDs[], String[] projectIDs, String[] states);

	public String recoatReport(String[] fileIDs, String[] IDs, String[] taskIDs, String projectID, String uploader);

	public boolean updateTestReportFileID(String[] IDs, String fileID);
}
