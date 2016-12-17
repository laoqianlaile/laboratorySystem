package com.cqut.xiji.service.testReport;

import java.io.File;
import java.net.ConnectException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.task.Task;
import com.cqut.xiji.entity.testReport.TestReport;
import com.cqut.xiji.service.base.SearchService;

@Service
public class TestReportService extends SearchService implements
		ITestReportService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "testReport";
	}

	@Override
	public String getBasePrimaryKey() {
		return "testReport.ID";
	}

	@Override
	public Map<String, Object> getTestReportWithPaging(int limit, int offset,
			String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime,
			String selectPart) {
		int index = limit;
		int pageNum = offset / limit ;
		String tableName = " ( "
				+ " SELECT "
				+ "b.ID AS ID,"
				+ "b.receiptlistCode AS receiptlistCode,"
				+ "b.fileID AS fileID,"
				+ "b.versionNumber AS versionNumber,"
				+ "b.state AS state,"
				+ "b.dismissreason2 AS dismissreason2,"
				+ "b.dismissreason3 AS dismissreason3,"
				+ "b.remarks AS remarks,"
				+ "company.companyName AS companyName"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "a.ID AS ID,"
				+ "a.receiptlistCode AS receiptlistCode,"
				+ "a.fileID AS fileID,"
				+ "a.versionNumber AS versionNumber,"
				+ "a.state AS state,"
				+ "a.dismissreason2 AS dismissreason2,"
				+ "a.dismissreason3 AS dismissreason3,"
				+ "a.remarks AS remarks,"
				+ "contract.companyID AS companyID"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "testreport.ID AS ID,"
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
				+ "receiptlist.contractID AS contractID,"
				+ "testreport.fileID AS fileID,"
				+ "testreport.versionNumber AS versionNumber,"
				+ "testreport.state AS state,"
				+ "testreport.dismissreason2 AS dismissreason2,"
				+ "testreport.dismissreason3 AS dismissreason3,"
				+ "testreport.remarks AS remarks"
				+ " FROM "
				+ " task "
				+ " LEFT JOIN testreport ON task.ID = testreport.taskID "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " ) AS a "
				+ " LEFT JOIN contract ON a.contractID = contract.ID "
				+ " ) AS b "
				+ " LEFT JOIN company ON b.companyID = company.ID " + " ) AS c";
		String[] properties = new String[] {
				"c.ID AS ID",
				"c.receiptlistCode AS receiptlistCode",
				"c.fileID AS fileID",
				"c.versionNumber AS versionNumber",
				"IF (c.state = 0,'未提交',IF (c.state = 1,'审核中',IF (c.state = 2,'二审未通过',IF (c.state = 3,'三审未通过',IF (c.state = 4,'二审通过',IF (c.state = 5,'三审通过',IF(c.state = 6,'归档','报告未上传'))))))) AS state",
				"c.companyName AS companyName",
				"fileinformation.fileName AS fileName",
				"DATE_FORMAT(uploadTime,'%Y-%m-%d %H:%i:%s') AS uploadTime",
				"c.dismissreason2 AS dismissreason2",
				"c.dismissreason3 AS dismissreason3", "c.remarks AS remarks" };

		String joinEntity = " LEFT JOIN fileinformation ON c.fileID = fileinformation.ID   ";
		String condition = " 1 = 1 AND (fileInformation.state = 0 OR fileInformation.state IS NULL)";
		if (receiptlistCode != null && !receiptlistCode.isEmpty()) {
			condition += " and receiptlistCode like '%" + receiptlistCode
					+ "%'";
		}
		if (client != null && !client.isEmpty()) {
			condition += " and companyName like '%" + client + "%'";
		}
		if (reportName != null && !reportName.isEmpty()) {
			condition += " and fileName like '%" + reportName + "%'";
		}
		if (beginTime != null && !beginTime.isEmpty()) {
			condition += " and uploadTime >'" + beginTime + "'";
		}
		if (endTime != null && !endTime.isEmpty()) {
			condition += " and uploadTime <'" + endTime + "'";
		}
		if (selectPart != null && !selectPart.isEmpty()) {
			if (selectPart.equals("0") || selectPart.equals("1")) {
				condition += " and c.state  = '" + selectPart + "'";
			}
			if (selectPart.equals("2")) {
				condition += " and c.state in ( '2','3' )";
			}
			if (selectPart.equals("3")) {
				condition += " and c.state in ( '4','5' )";
			}
			if (selectPart.equals("4")) {
				condition += " and c.state = '6' ";
			}
			if (selectPart.equals("5")) {
				condition += " and c.state IS NULL";
				}
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	@Override
	public Map<String, Object> getTestReporSecondtAuditWithPaging(int limit,
			int offset, String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime) {
		int index = limit;
		int pageNum = offset / limit;
		String tableName = " ( "
				+ " SELECT "
				+ "b.ID AS ID,"
				+ "b.receiptlistCode AS receiptlistCode,"
				+ "b.fileID AS fileID,"
				+ "b.versionNumber AS versionNumber,"
				+ "b.state AS state,"
				+ "b.remarks AS remarks,"
				+ "company.companyName AS companyName"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "a.ID AS ID,"
				+ "a.receiptlistCode AS receiptlistCode,"
				+ "a.fileID AS fileID,"
				+ "a.versionNumber AS versionNumber,"
				+ "a.state AS state,"
				+ "a.remarks AS remarks,"
				+ "contract.companyID AS companyID"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "testreport.ID AS ID,"
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
				+ "receiptlist.contractID AS contractID,"
				+ "fileID,"
				+ "versionNumber,"
				+ "IF (testreport.state = 1,'未审核','其他') AS state,"
				+ "testreport.remarks AS remarks"
				+ " FROM "
				+ "testreport"
				+ " LEFT JOIN task ON testreport.taskID = task.ID "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " WHERE " + " testreport.state = 1 " + " ) AS a "
				+ " LEFT JOIN contract ON a.contractID = contract.ID "
				+ " ) AS b "
				+ " LEFT JOIN company ON b.companyID = company.ID "
				+ " ) AS c ";
		String[] properties = new String[] { 
				"c.ID AS ID",
				"c.receiptlistCode AS receiptlistCode",
				"c.fileID AS fileID",
				"c.versionNumber AS versionNumber",
				"c.state AS state",
				"c.companyName AS companyName",
				"fileinformation.fileName AS fileName",
				"DATE_FORMAT(uploadTime,'%Y-%m-%d %H:%i:%s') AS uploadTime",
				"c.remarks AS remarks"
				};

		String joinEntity = " LEFT JOIN fileinformation ON c.fileID = fileinformation.ID ";
		String condition = " 1 = 1  AND fileInformation.state = 0";
		if (receiptlistCode != null && !receiptlistCode.isEmpty()) {
			condition += " and receiptlistCode like '%" + receiptlistCode
					+ "%'";
		}
		if (client != null && !client.isEmpty()) {
			condition += " and companyName like '%" + client + "%'";
		}
		if (reportName != null && !reportName.isEmpty()) {
			condition += " and fileName like '%" + reportName + "%'";
		}
		if (beginTime != null && !beginTime.isEmpty()) {
			condition += " and uploadTime >'" + beginTime + "'";
		}
		if (endTime != null && !endTime.isEmpty()) {
			condition += " and uploadTime <'" + endTime + "'";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	@Override
	public Map<String, Object> getTestReporThirdtAuditWithPaging(int limit,
			int offset, String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime) {
		int index = limit;
		int pageNum = offset / limit;
		String tableName = " ( "
				+ " SELECT "
				+ "b.ID AS ID,"
				+ "b.receiptlistCode AS receiptlistCode,"
				+ "b.fileID AS fileID,"
				+ "b.versionNumber AS versionNumber,"
				+ "b.state AS state,"
				+ "b.remarks AS remarks,"
				+ "company.companyName AS companyName"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "a.ID AS ID,"
				+ "a.receiptlistCode AS receiptlistCode,"
				+ "a.fileID AS fileID,"
				+ "a.versionNumber AS versionNumber,"
				+ "a.state AS state,"
				+ "a.remarks AS remarks,"
				+ "contract.companyID AS companyID"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "testreport.ID AS ID,"
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
				+ "receiptlist.contractID AS contractID,"
				+ "fileID,"
				+ "versionNumber,"
				+ "IF (testreport.state = 4,'二审通过','其他') AS state,"
				+ "testreport.remarks AS remarks"
				+ " FROM "
				+ "testreport"
				+ " LEFT JOIN task ON testreport.taskID = task.ID "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " WHERE " + " testreport.state = 4 " + " ) AS a "
				+ " LEFT JOIN contract ON a.contractID = contract.ID "
				+ " ) AS b "
				+ " LEFT JOIN company ON b.companyID = company.ID "
				+ " ) AS c ";
		String[] properties = new String[] { 
				"c.ID AS ID",
				"c.receiptlistCode AS receiptlistCode",
				"c.fileID AS fileID",
				"c.versionNumber AS versionNumber",
				"c.state AS state",
				"c.companyName AS companyName",
				"fileinformation.fileName AS fileName",
				"DATE_FORMAT(uploadTime,'%Y-%m-%d %H:%i:%s') AS uploadTime",
				"c.remarks AS remarks"
				};

		String joinEntity = " LEFT JOIN fileinformation ON c.fileID = fileinformation.ID ";
		String condition = " 1 = 1  AND fileInformation.state = 0";
		if (receiptlistCode != null && !receiptlistCode.isEmpty()) {
			condition += " and receiptlistCode like '%" + receiptlistCode
					+ "%'";
		}
		if (client != null && !client.isEmpty()) {
			condition += " and companyName like '%" + client + "%'";
		}
		if (reportName != null && !reportName.isEmpty()) {
			condition += " and fileName like '%" + reportName + "%'";
		}
		if (beginTime != null && !beginTime.isEmpty()) {
			condition += " and uploadTime >'" + beginTime + "'";
		}
		if (endTime != null && !endTime.isEmpty()) {
			condition += " and uploadTime <'" + endTime + "'";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	public List<Map<String,Object>> getProjectName(String ID){
		String lefjionCondition = "";
		if (!ID.isEmpty() || ID != "" || ID != null) {
			lefjionCondition = " WHERE task.testReportID = " + ID;
		}
		String tableName = " ( " + " SELECT "
				+ "contract.fileTypeID AS fileTypeID" + " FROM " + " ( "
				+ " SELECT " + "receiptlist.contractID AS contractID"
				+ " FROM " + " ( " + " SELECT "
				+ "task.receiptlistID AS receiptlistID" + " FROM " + " task "
				+ lefjionCondition + " ) AS a"
				+ " LEFT JOIN receiptlist ON a.receiptlistID = receiptlist.ID "
				+ " )  AS b"
				+ " LEFT JOIN contract ON b.contractID = contract.ID "
				+ " ) AS c";
		
		String[] properties = new String[] { "filetype.name as name" };
		String joinEntity = " LEFT JOIN filetype ON c.fileTypeID = filetype.ID ";
		String condition = " 1=1 ";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, joinEntity, null, condition);
		return result;
	}
	
	@Override
	public boolean updateTestReport(String ID, String fileID,String versionNumber, String versionInfo, String remarks) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr == null) {
			return false;
		} else {
			tr.setFileID(fileID);
			tr.setVersionNumber(versionNumber);
			tr.setVersionInformation(versionInfo);
			tr.setRemarks(remarks);
			tr.setState(0);
			return baseEntityDao.updatePropByID(tr, ID) > 0 ? true : false;
		}
	}
	
	@Override
	public boolean submitReportCheck(String ID) {
		String tableName = "testreport";
		Map<String, Object> result1 = baseEntityDao.findByID(new String[] { "fileID" }, ID, "ID", tableName);
		if (result1 == null) {
			return false;
		} else {
			String fileID = result1.get("fileID").toString();
			if (fileID == null || fileID == "" || fileID.isEmpty()) {
				return false;
			} else {
				Map<String, Object> result = baseEntityDao.findByID(new String[] { "state" }, ID, "ID", tableName);
				String state = result.get("state").toString();
				if (state.equals("0")) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
			
	@Override
	public boolean setFileBelongID(String ID, String fileID) {
		FileInformation fr = entityDao.getByID(fileID, FileInformation.class);
		if (fr == null) {
			return false;
		} else {
			return baseEntityDao.updatePropByID(fr, fileID) > 0 ? true : false;
		}

	}

	@Override
	public String getFileID(String ID) {
		String tableName = "testreport";
		Map<String, Object> result = baseEntityDao.findByID(new String[] { "fileID" }, ID, "ID", tableName);
		if (result == null) {
			return "null";
		} else {
			String fileID = result.get("fileID").toString();
			if (fileID == null || fileID == "" || fileID.isEmpty()) {
				return "null";
			} else {
				return fileID;
			}
		}
	}

	@Override
	public List<Map<String, Object>> getTemplateFileID(String ID) {
		String tableName = " ( "
				+ " SELECT "
				+ "testreport.ID AS ID,"
				+ "testproject.templateID AS templateID"
				+ " FROM "
				+ "task"
				+ " LEFT JOIN testreport ON task.ID = testreport.taskID "
				+ " LEFT JOIN testproject ON task.testprojectID = testproject.ID "
				+ " ) AS a";
		String[] properties = new String[] { "template.fileID AS fileID" };
		String joinEntity = " LEFT JOIN template ON template.ID = a.templateID ";
		String condition = " 1=1 ";
		if (ID != "" && ID != null && !ID.isEmpty()) {
			condition += " AND a.ID = " + ID;
		}
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, joinEntity, null, condition);
		return result;
	}

	@Override
	public boolean submitReport(String ID) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(1);
			return baseEntityDao.updatePropByID(tr, ID) > 0 ? true : false;
		}
	}

	@Override
	public List<Map<String, Object>> checkTask(String testReportID) {
		String lefjionCondition = "";
		if (testReportID != null && !testReportID.equals("") && !testReportID.equals(" ") && !testReportID.isEmpty()) {
			lefjionCondition = " WHERE testreport.ID = " + testReportID;
		}
		String tableName = " ( SELECT "
				+ "b.createTime AS createTime,"
				+ "b.linkman AS linkman,"
				+ "b.receiptlistID AS receiptlistID,"
				+ "b.contractID AS contractID,"
				+ "b.completeTime AS completeTime,"
				+ "b.linkPhone AS linkPhone,"
				+ "isClassified,"
				+ "classifiedLevel,"
				+ "contract.companyID AS companyID"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "DATE_FORMAT(receiptlist.createTime,'%Y-%m-%d %H:%i:%s') AS createTime,"
				+ "receiptlist.linkman AS linkman,"
				+ "receiptlist.ID AS receiptlistID,"
				+ "receiptlist.contractID AS contractID,"
				+ "DATE_FORMAT(receiptlist.completeTime,'%Y-%m-%d %H:%i:%s') AS completeTime,"
				+ "receiptlist.linkPhone AS linkPhone" + " FROM " + " ( "
				+ " SELECT " + " testreport.receiptlistID AS receiptlistID "
				+ " FROM " + "testreport" + lefjionCondition + " ) AS a "
				+ " LEFT JOIN receiptlist ON a.receiptlistID = receiptlist.ID "
				+ " ) AS b "
				+ " LEFT JOIN contract ON b.contractID = contract.ID "
				+ " ) AS c";
		String[] properties = new String[] {
				"c.linkman AS linkman",
				"c.createTime AS createTime",
				"c.completeTime AS completeTime",
				"c.linkPhone AS linkPhone",
				"c.receiptlistID",
				"IF (c.isClassified  = 0,'不涉密','涉密') AS isClassified,"
						+ "IF (c.classifiedLevel = 0,'秘密',IF (c.classifiedLevel = 1,'机密',"
						+ "IF (c.classifiedLevel = 2,'绝密','无密级'))) AS classifiedLevel",
				"company.companyname AS companyname",
				"company.address AS address" };
		String joinEntity = " LEFT JOIN company ON c.companyID = company.ID ";
		String condition = " 1 = 1";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, joinEntity, null, condition);
		return result;

	}

	@Override
	public List<Map<String, Object>> checkSample(String testReportID) {
		String lefjionCondition = "";
		if (testReportID != null && !testReportID.equals("") && !testReportID.equals(" ") && !testReportID.isEmpty()) {
			lefjionCondition = " WHERE testreport.ID = " + testReportID;
		}
		String tableName = " ( " + " SELECT "
				+ "b.testProjectID AS testProjectID,"
				+ "sample.specifications AS specifications,"
				+ "sample.sampleName AS sampleName,"
				+ "sample.factoryCode AS factoryCode,"
				+ "taskman.detector AS detector" + " FROM " + " ( "
				+ " SELECT " + "task.testProjectID AS testProjectID,"
				+ "task.sampleID AS sampleID," + "task.ID AS ID" + " FROM "
				+ " ( " + " SELECT " + "testreport.taskID AS taskID" + " FROM "
				+ "testreport" + lefjionCondition + " ) AS a "
				+ " LEFT JOIN task ON a.taskID = task.ID " + " ) AS b "
				+ " LEFT JOIN sample ON b.sampleID = sample.ID "
				+ " LEFT JOIN taskMan ON b.ID = taskman.taskID " + " ) AS c ";
		String[] properties = new String[] {
				"testproject.nameCn AS nameCn",
				"c.factoryCode AS factoryCode",
				"c.sampleName AS sampleName",
				"c.specifications AS specifications",
				"employee.employeeName AS employeeName" 
				};
		String joinEntity = " LEFT JOIN testproject ON c.testProjectID = testproject.ID "
				+ " LEFT JOIN employee ON c.detector = employee.ID ";
		String condition = " 1 = 1";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,tableName, joinEntity, null, condition);
		return result;

	}

	@Override
	public List<Map<String, Object>> checkReport(String testReportID) {
		String lefjionCondition = "";
		if (testReportID != null && !testReportID.equals("") && !testReportID.equals(" ") && !testReportID.isEmpty()) {
			lefjionCondition = " WHERE testreport.ID = " + testReportID;
		}
		String tableName = " ( "
				+ " SELECT "
				+ "a.ID AS ID,"
				+ "a.fileID AS fileID,"
				+ "a.versionNumber AS versionNumber,"
				+ "a.versionInformation AS versionInformation,"
				+ "a.state AS state,"
				+ "a.remarks AS remarks,"
				+ "DATE_FORMAT(fileinformation.uploadTime,'%Y-%m-%d %H:%i:%s') AS uploadTime,"
				+ "fileinformation.fileName AS fileName,"
				+ "fileinformation.uploaderID AS uploaderID"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "testreport.taskID AS taskID,"
				+ "testreport.ID AS ID,"
				+ "fileID,"
				+ "versionNumber,"
				+ "versionInformation,"
				+ "IF (testreport.state = 5,'三审通过',"
				+ "IF (testreport.state = 4,'二审通过',"
				+ "IF (testreport.state = 3,'三审未通过',"
				+ "IF (testreport.state = 2,'二审未通过',"
				+ "IF (testreport.state = 1,'二审中','未提交'))))) AS state,"
				+ "testreport.remarks AS remarks"
				+ " FROM "
				+ "testreport"
				+ lefjionCondition
				+ " ) AS a "
				+ " LEFT JOIN fileinformation ON a.fileID = fileinformation.ID "
				+ " ) AS b";
		String[] properties = new String[] { 
				"b.ID AS ID",
				"b.fileID AS fileID",
				"b.versionNumber AS versionNumber",
				"b.versionInformation AS versionInformation",
				"b.state AS state",
				"b.remarks AS remarks",
				"b.uploadTime AS uploadTime",
				"b.fileName AS fileName",
				"employee.employeeName" };
		String joinEntity = " LEFT JOIN employee ON b.uploaderID = employee.ID ";
		String condition = " 1 = 1";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, joinEntity, null, condition);
		return result;

	}

	@Override
	public boolean deleteOtherTableInfo(String ID) {
		String tableName = "testreport";
		return baseEntityDao.deleteByID(ID, tableName, "ID") > 0 ? true : false;
	}

	@Override
	public boolean secondPassReport(String ID) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(4);
			return baseEntityDao.updatePropByID(tr, ID) > 0 ? true : false;
		}
	}

	@Override
	public boolean secondRejectReport(String ID, String dismissreason) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(2);
			tr.setDismissreason2(dismissreason);
			return baseEntityDao.updatePropByID(tr, ID) > 0 ? true : false;
		}
	}

	@Override
	public boolean thirdPassReport(String ID) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(5);
			return baseEntityDao.updatePropByID(tr, ID) > 0 ? true : false;
		}
	}
	
	@Override
	public boolean thirdRejectReport(String ID, String dismissreason) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(3);
			tr.setDismissreason3(dismissreason);
			return baseEntityDao.updatePropByID(tr, ID) > 0 ? true : false;
		}
	}
}
