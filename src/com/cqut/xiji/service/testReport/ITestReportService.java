package com.cqut.xiji.service.testReport;

import java.util.List;
import java.util.Map;

public interface ITestReportService {
	public Map<String, Object> getTestReportWithPaging(int limit, int offset,
			String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime,
			String selectPart);

	public Map<String, Object> getTestReporSecondtAuditWithPaging(int limit,
			int offset, String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime);

	public Map<String, Object> getTestReporThirdtAuditWithPaging(int limit,
			int offset, String order, String sort, String transitreceiptNumber,
			String client, String reportName, String beginTime, String endTime);

	public List<Map<String, Object>> getProjectName(String ID);

	public boolean updateTestReport(String ID, String fileID,
			String versionNumber, String versionInfo, String remarks);

	public boolean submitReportCheck(String ID);

	public boolean submitReport(String ID);

	public boolean setFileBelongID(String ID, String fileID);

	public String getFileID(String ID);

	public List<Map<String, Object>> getTemplateFileID(String ID);

	public List<Map<String, Object>> getCilentInfo(String testReportID);

	public Map<String, Object> getSampleInfoWithPaging(int limit, int offset, String order,String sort,String testReportID);

	public Map<String, Object>  getTestReportFileInfoWithPaging(int limit, int offset, String order,String sort,String testReportID);

	public boolean deleteOtherTableInfo(String fileID);

	public boolean secondPassReport(String ID);

	public boolean secondRejectReport(String ID, String dismissreason);

	public boolean thirdPassReport(String ID);

	public boolean thirdRejectReport(String ID, String dismissreason);

}
