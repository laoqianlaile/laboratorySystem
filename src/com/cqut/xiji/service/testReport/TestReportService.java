package com.cqut.xiji.service.testReport;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
			String selectPart,String uploader) {
		int index = limit;
		int pageNum = offset / limit ;
		String baseEntity = " ( "
				+ " SELECT "
				+ "b.ID AS ID,"
				+ "b.receiptlistCode AS receiptlistCode,"
				+ "b.taskID AS taskID,"
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
				+ "a.taskID AS taskID,"
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
				+ "testreport.taskID AS taskID,"
				+ "testreport.fileID AS fileID,"
				+ "testreport.versionNumber AS versionNumber,"
				+ "testreport.state AS state,"
				+ "testreport.dismissreason2 AS dismissreason2,"
				+ "testreport.dismissreason3 AS dismissreason3,"
				+ "testreport.remarks AS remarks"
				+ " FROM "
				+ " testreport "
				+ " LEFT JOIN task ON testreport.taskID = task.ID  "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " ) AS a "
				+ " LEFT JOIN contract ON a.contractID = contract.ID "
				+ " ) AS b "
				+ " LEFT JOIN company ON b.companyID = company.ID " + " ) AS c";
		String[] properties = new String[] {
				"c.ID AS ID",
				"c.receiptlistCode AS receiptlistCode",
				"c.taskID AS taskID",
				"c.fileID AS fileID",
				"c.versionNumber AS versionNumber",
				"IF (c.state = 0,'未提交',IF (c.state = 1,'二审核中',IF (c.state = 2,'二审未通过',IF (c.state = 3,'三审核中',IF (c.state = 4,'三审未通过',IF (c.state = 5,'审核通过',IF(c.state = 6,'归档','其它'))))))) AS state",
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
		if (client != null && !client.isEmpty() && !client.equals("")) {
			condition += " and companyName like '%" + client + "%'";
		}
		if (reportName != null && !reportName.isEmpty() && !reportName.equals("")) {
			condition += " and fileName like '%" + reportName + "%'";
		}
		if (beginTime != null && !beginTime.isEmpty() && !beginTime.equals("")) {
			condition += " and uploadTime >'" + beginTime + "'";
		}
		if (endTime != null && !endTime.isEmpty() && !endTime.equals("")) {
			condition += " and uploadTime <'" + endTime + "'";
		}
		if (selectPart != null && !selectPart.isEmpty() && !selectPart.equals("")) {
			if (selectPart.equals("0")){
				condition += " and c.state = '0' ";
			}
			if (selectPart.equals("1")){
				condition += " and c.state in ( '1','3' )";
			}
			if (selectPart.equals("2")) {
				condition += " and c.state in ( '2','4' )";
			}
			if (selectPart.equals("3")) {
				condition += " and c.state = '5' ";
			}
			if (selectPart.equals("4")) {
				condition += " and c.state = '6' ";
			}
		}
		condition += " and fileinformation.uploaderID = '" + uploader + "'";
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, baseEntity, joinEntity, null, condition, null, sort,
				order, index, pageNum);
		System.out.println("List :" + result);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	@Override
	public Map<String, Object> getTestReporSecondtAuditWithPaging(int limit,
			int offset, String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime,String selectPart,String auditPerson) {
		int index = limit;
		int pageNum = offset / limit;
		String baseEntity = " ( "
				+ " SELECT "
				+ "b.ID AS ID,"
				+ "b.taskID AS taskID,"
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
				+ "a.taskID AS taskID,"
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
				+ "testreport.taskID AS taskID,"
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
				+ "receiptlist.contractID AS contractID,"
				+ "fileID,"
				+ "versionNumber,"
				+ "testreport.state  AS state,"
				+ "testreport.remarks AS remarks"
				+ " FROM "
				+ "testreport"
				+ " LEFT JOIN task ON testreport.taskID = task.ID "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " WHERE  testreport.state > 0 AND task.levelTwo = '"
				+ auditPerson + "'" + " ) AS a "
				+ " LEFT JOIN contract ON a.contractID = contract.ID "
				+ " ) AS b "
				+ " LEFT JOIN company ON b.companyID = company.ID "
				+ " ) AS c ";
		String[] properties = new String[] { 
				"c.ID AS ID",
				"c.taskID AS taskID",
				"c.receiptlistCode AS receiptlistCode",
				"c.fileID AS fileID",
				"c.versionNumber AS versionNumber",
				"IF (c.state = 1,'二审待审核',IF (c.state = 2,'二审驳回',IF (	c.state = 3,'二审通过',IF (c.state = 4,'三审驳回',IF (c.state = 5,'审核通过','其它'))))) AS state",
				"c.companyName AS companyName",
				"fileinformation.fileName AS fileName",
				"DATE_FORMAT(uploadTime,'%Y-%m-%d %H:%i:%s') AS uploadTime",
				"c.remarks AS remarks"
				};

		String joinEntity = " LEFT JOIN fileinformation ON c.fileID = fileinformation.ID ";
		String condition = " 1 = 1 AND (fileInformation.state = 0 OR fileInformation.state IS NULL)";
		if (receiptlistCode != null && !receiptlistCode.isEmpty() && !receiptlistCode.equals("")) {
			condition += " and receiptlistCode like '%" + receiptlistCode
					+ "%'";
		}
		if (client != null && !client.isEmpty()&& !client.equals("")) {
			condition += " and companyName like '%" + client + "%'";
		}
		if (reportName != null && !reportName.isEmpty()&& !reportName.equals("")) {
			condition += " and fileName like '%" + reportName + "%'";
		}
		if (beginTime != null && !beginTime.isEmpty()&& !beginTime.equals("")) {
			condition += " and uploadTime >'" + beginTime + "'";
		}
		if (endTime != null && !endTime.isEmpty()&& !endTime.equals("")) {
			condition += " and uploadTime <'" + endTime + "'";
		}
		if (selectPart != null && !selectPart.isEmpty() && !selectPart.equals("")) {
			if (selectPart.equals("0")){
				condition += " and c.state = '1' ";
			}
			if (selectPart.equals("1")) {
				condition += " and c.state in ( '3','5','6')";
			}
			if (selectPart.equals("2")) {
				condition += " and c.state in ( '2','4' )";
			}
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, baseEntity, joinEntity, null, condition, null, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	@Override
	public Map<String, Object> getTestReporThirdtAuditWithPaging(int limit,
			int offset, String order, String sort, String receiptlistCode,
			String client, String reportName, String beginTime, String endTime,String selectPart) {
		int index = limit;
		int pageNum = offset / limit;
		String baseEntity = " ( "
				+ " SELECT "
				+ "b.ID AS ID,"
				+ "b.taskID AS taskID,"
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
				+ "a.taskID as taskID,"
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
				+ "testreport.taskID AS taskID,"
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
				+ "receiptlist.contractID AS contractID,"
				+ "fileID,"
				+ "versionNumber,"
				+ "testreport.state AS state,"
				+ "testreport.remarks AS remarks"
				+ " FROM "
				+ "testreport"
				+ " LEFT JOIN task ON testreport.taskID = task.ID "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " WHERE " + " testreport.state > 2  " + " ) AS a "
				+ " LEFT JOIN contract ON a.contractID = contract.ID "
				+ " ) AS b "
				+ " LEFT JOIN company ON b.companyID = company.ID "
				+ " ) AS c ";
		String[] properties = new String[] { 
				"c.ID AS ID",
				"c.taskID AS taskID",
				"c.receiptlistCode AS receiptlistCode",
				"c.fileID AS fileID",
				"c.versionNumber AS versionNumber",
				"IF (c.state = 3,'待审核',IF (	c.state = 4,'驳回',IF (c.state = 5,'审核通过',IF (c.state = 6,'归档','其它')))) AS state",
				"c.companyName AS companyName",
				"fileinformation.fileName AS fileName",
				"DATE_FORMAT(uploadTime,'%Y-%m-%d %H:%i:%s') AS uploadTime",
				"c.remarks AS remarks"
				};

		String joinEntity = " LEFT JOIN fileinformation ON c.fileID = fileinformation.ID ";
		String condition = " 1 = 1  AND fileInformation.state = 0";
		if (receiptlistCode != null && !receiptlistCode.isEmpty() && !receiptlistCode.equals("")) {
			condition += " and receiptlistCode like '%" + receiptlistCode
					+ "%'";
		}
		if (client != null && !client.isEmpty() && !client.equals("")) {
			condition += " and companyName like '%" + client + "%'";
		}
		if (reportName != null && !reportName.isEmpty() && !reportName.equals("")) {
			condition += " and fileName like '%" + reportName + "%'";
		}
		if (beginTime != null && !beginTime.isEmpty() && !beginTime.equals("")) {
			condition += " and uploadTime >'" + beginTime + "'";
		}
		if (endTime != null && !endTime.isEmpty() && !endTime.equals("")) {
			condition += " and uploadTime <'" + endTime + "'";
		}
		if (selectPart != null && !selectPart.isEmpty() && !selectPart.equals("")) {
			if (selectPart.equals("0")) {
				condition += " and c.state = '3' ";
			}
			if (selectPart.equals("1")) {
				condition += " and c.state in ('5','6')";
			}
			if (selectPart.equals("2")) {
				condition += " and c.state = '4'";
			}
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, baseEntity, joinEntity, null, condition, null, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	public List<Map<String,Object>> getProjectName(String ID){
		String filteCondition = "";
		if (!ID.isEmpty() || ID != "" || ID != null) {
			filteCondition = " WHERE task.testReportID = " + ID;
		}
		String baseEntity = " ( " + " SELECT "
				+ "contract.fileTypeID AS fileTypeID" + " FROM " + " ( "
				+ " SELECT " + "receiptlist.contractID AS contractID"
				+ " FROM " + " ( " + " SELECT "
				+ "task.receiptlistID AS receiptlistID" + " FROM " + " task "
				+ filteCondition + " ) AS a"
				+ " LEFT JOIN receiptlist ON a.receiptlistID = receiptlist.ID "
				+ " )  AS b"
				+ " LEFT JOIN contract ON b.contractID = contract.ID "
				+ " ) AS c";
		
		String[] properties = new String[] { "filetype.name as name" };
		String joinEntity = " LEFT JOIN filetype ON c.fileTypeID = filetype.ID ";
		String condition = " 1=1 ";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				baseEntity, joinEntity, null, condition);
		return result;
	}
	
	@Override
	public boolean recoverCheck(String ID) {
		Map<String, Object> stateInfo = baseEntityDao.findByID(
				new String[] { "state" }, ID, "ID", "testreport");
		String state = stateInfo.get("state").toString();
		if (state.equals("0") || state.equals("2") || state.equals("4")) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean updateTestReport(String ID, String taskID,String versionNumber, String versionInfo, String remarks) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr == null) {
			return false;
		} else {
				String condition = " fileinformation.belongtoID = '" + taskID + "'";
				List<Map<String, Object>> result = entityDao.searchWithpaging(
						new String[] { "fileinformation.ID AS ID" },
						"fileinformation", null, null, condition, null,
						"fileinformation.uploadTime", "DESC", 1, 0);
				if (result != null && result.size() > 0) {
					Task tk = entityDao.getByID(taskID, Task.class);
					String fileID = result.get(0).get("ID").toString();
					tr.setFileID(fileID);
					tr.setVersionNumber(versionNumber);
					tr.setVersionInformation(versionInfo);
					tr.setRemarks(remarks);
					tr.setState(0);
					tk.setDetectstate(1);
					int updateTaskCount =  baseEntityDao.updatePropByID(tr, ID);
					int updateTestReportCount =  baseEntityDao.updatePropByID(tk, taskID);
					return (updateTaskCount + updateTestReportCount) > 1 ? true : false;
				} else {
					return false;
				}
			}
	}
	
	@Override
	public boolean submitReportCheck(String ID) {
		String baseEntity = "testreport";
		Map<String, Object> result = baseEntityDao.findByID(
				new String[] { "state" }, ID, "ID", baseEntity);
		String state = result.get("state").toString();
		String tanleName = " task ";
		String[] properties = new String[] { "task.levelTwo as levelTwo" };
		String joinEntity = " LEFT JOIN testreport ON task.ID = testreport.taskID ";
		String condition = " 1 = 1 AND testReport.ID ='" + ID + "'";
		List<Map<String, Object>> auditPersonIsExist = entityDao.searchForeign(
				properties, tanleName, joinEntity, null, condition);
		if (state.equals("0") && auditPersonIsExist != null
				&& auditPersonIsExist.size() > 0) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public String getFileID(String ID) {
		String baseEntity = "testreport";
		Map<String, Object> result = baseEntityDao.findByID(new String[] { "fileID" }, ID, "ID", baseEntity);
		if (result == null || result.size() == 0) {
			return null;
		} else {
			String fileID = result.get("fileID").toString();
			if (fileID == null || fileID.equals("") || fileID.isEmpty()) {
				return null;
			} else {
				return fileID;
			}
		}
	}

	@Override
	public List<Map<String, Object>> getTemplateFileID(String ID) {
		String baseEntity = " ( "
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
				baseEntity, joinEntity, null, condition);
		return result;
	}

	@Override
	public boolean submitReport(String ID, String taskID) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		Task tk = entityDao.getByID(taskID, Task.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(1);
			tk.setDetectstate(2);
			int updateReportCount = baseEntityDao.updatePropByID(tr, ID);
			int updateTaskCount = baseEntityDao.updatePropByID(tk, taskID);
			return (updateReportCount + updateTaskCount) > 1 ? true : false;
		}
	}

	@Override
	public List<Map<String, Object>> getCilentInfo(String testReportID) {
		String lefjionCondition = "";
		if (testReportID != null && !testReportID.equals("") && !testReportID.equals(" ") && !testReportID.isEmpty()) {
			lefjionCondition = " WHERE testreport.ID = " + testReportID;
		}
		String baseEntity = " ( SELECT "
				+ "b.createTime AS createTime,"
				+ "b.linkman AS linkman,"
				+ "b.receiptlistCode AS receiptlistCode,"
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
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
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
				"c.receiptlistCode AS receiptlistCode",
				"IF (c.isClassified  = 0,'不涉密','涉密') AS isClassified,"
						+ "IF (c.classifiedLevel = 0,'秘密',IF (c.classifiedLevel = 1,'机密',"
						+ "IF (c.classifiedLevel = 2,'绝密','无密级'))) AS classifiedLevel",
				"company.companyname AS companyname",
				"company.address AS address" };
		String joinEntity = " LEFT JOIN company ON c.companyID = company.ID ";
		String condition = " 1 = 1";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				baseEntity, joinEntity, null, condition);
		return result;

	}

	@Override
	public Map<String, Object> getSampleInfoWithPaging(int limit, int offset,
			String order, String sort, String testReportID) {
		int index = limit;
		int pageNum = offset / limit;
		String filterCondition = "";
		if (testReportID != null && !testReportID.equals("")
				&& !testReportID.equals(" ") && !testReportID.isEmpty()) {
			filterCondition = " WHERE testreport.ID = " + testReportID;
		}
		String baseEntity = " ( " 
		        + " SELECT "
				+ "b.testProjectID AS testProjectID," 
		        + "sample.ID AS ID,"
				+ "sample.specifications AS specifications,"
				+ "sample.sampleName AS sampleName,"
				+ "sample.factoryCode AS factoryCode,"
				+ "taskman.detector AS detector" 
				+ " FROM " 
				+ " ( "
				+ " SELECT "
				+ "task.testProjectID AS testProjectID,"
				+ "task.sampleID AS sampleID," 
				+ "task.ID AS ID" + " FROM "
				+ " ( " 
				+ " SELECT " 
				+ "testreport.taskID AS taskID" 
				+ " FROM "
				+ "testreport" 
				+ filterCondition 
				+ " ) AS a "
				+ " LEFT JOIN task ON a.taskID = task.ID " 
				+ " ) AS b "
				+ " LEFT JOIN sample ON b.sampleID = sample.ID "
				+ " LEFT JOIN taskMan ON b.ID = taskman.taskID " 
				+ " ) AS c ";
		String[] properties = new String[] {
				"IF (testproject.nameCn IS NULL,testproject.nameEn,IF (testproject.nameEn IS NULL,testproject.nameCn,CONCAT(testproject.nameCn,'(',testproject.nameEn,')'))) AS testProjectName",
				"c.factoryCode AS factoryCode", "c.ID AS ID",
				"c.sampleName AS sampleName",
				"c.specifications AS specifications",
				"employee.employeeName AS employeeName" };
		String joinEntity = " LEFT JOIN testproject ON c.testProjectID = testproject.ID "
				+ " LEFT JOIN employee ON c.detector = employee.ID ";
		String condition = " 1 = 1";
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, baseEntity, joinEntity, null, null, condition,
				sort, order, index, pageNum);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity,
				null, null).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;

	}

	@Override
	public Map<String, Object>  getTestReportFileInfoWithPaging(int limit, int offset, String order,String sort,String testReportID) {
		int index = limit;
		int pageNum = offset / limit;
		String filterCondition = "";
		if (testReportID != null && !testReportID.equals("") && !testReportID.equals(" ") && !testReportID.isEmpty()) {
			filterCondition = " WHERE testreport.ID = " + testReportID;
		}
		String baseEntity = " ( "
				+ " SELECT "
				+ "a.ID AS ID,"
				+ "a.fileID AS fileID,"
				+ "a.versionNumber AS versionNumber,"
				+ "a.versionInformation AS versionInformation,"
				+ "a.state AS state,"
				+ "a.remarks AS remarks,"
				+"task.ID as taskID,"
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
				+ "IF (testreport.state = 6,'归档',"
				+ "IF (testreport.state = 5,'审核通过',"
				+ "IF (testreport.state = 4,'三审未通过',"
				+ "IF (testreport.state = 3,'三审核中',"
				+ "IF (testreport.state = 2,'二审未通过',"
				+ "IF (testreport.state = 1,'二审核中',"
				+ "IF (testreport.state = 0,'未提交','其它'))))))) AS state,"
				+ "testreport.remarks AS remarks"
				+ " FROM "
				+ "testreport"
				+ filterCondition
				+ " ) AS a "
				+" LEFT JOIN task on a.ID = task.testReportID "
				+ " LEFT JOIN fileinformation ON a.fileID = fileinformation.ID WHERE fileinformation.state = 0"
				+ " ) AS b";
		String[] properties = new String[] { 
				"b.ID AS ID",
				"b.fileID AS fileID",
				"b.versionNumber AS versionNumber",
				"b.versionInformation AS versionInformation",
				"b.state AS state",
                "b.remarks AS remarks",
				"b.taskID as taskID", "b.uploadTime AS uploadTime",
				"b.fileName AS fileName",
				"employee.employeeName" };
		String joinEntity = " LEFT JOIN employee ON b.uploaderID = employee.ID ";
		String condition = " 1 = 1";
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, baseEntity, joinEntity, null, null, condition, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity,
				null, null).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;

	}

	@Override
	public boolean deleteCheck(String ID) {
		String baseEntity = "testreport";
		Map<String, Object> result = baseEntityDao.findByID(new String[] { "state" }, ID, "ID", baseEntity);
		if (result != null &&  result.size() > 0) {
			String testState = result.get("state").toString();
			if (testState.equals("0") || testState.equals("2")
					|| testState.equals("4")) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	@Override
	public boolean deleteOtherTableInfo(String ID, String taskID) {
		String baseEntity = "testreport";
		int deleteReportCount = baseEntityDao.deleteByID(ID, baseEntity, "ID");
		Task tk = entityDao.getByID(taskID, Task.class);
		if (tk != null) {
			tk.setDetectstate(0);
			tk.setTestReportID("");
		}
		int updateTaskCount = baseEntityDao.updatePropByID(tk, taskID);
		return (deleteReportCount + updateTaskCount) > 1 ? true : false;
	}

	@Override
	public boolean secndAuditOperateCheck(String ID) {
		String baseEntity = "testreport";
		Map<String, Object> result = baseEntityDao.findByID(new String[] { "state" }, ID, "ID", baseEntity);
		if (result != null && result.size() > 0) {
			String testState = result.get("state").toString();
			if (testState.equals("1")) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

	}
	
	@Override
	public boolean secondPassReport(String ID, String taskID,String auditPassAgreement) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		Task tk = entityDao.getByID(taskID, Task.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(3);
			tr.setDismissreason2(auditPassAgreement);
			tk.setDetectstate(4);
			int updateReportCount = baseEntityDao.updatePropByID(tr, ID);
			int updateTaskCount = baseEntityDao.updatePropByID(tk, taskID);
			return (updateReportCount + updateTaskCount) > 0 ? true : false;
		}
	}

	@Override
	public boolean secondRejectReport(String ID, String taskID,String dismissreason) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		Task tk = entityDao.getByID(taskID, Task.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(2);
			tr.setDismissreason2(dismissreason);
			tk.setDetectstate(3);
			int updateReportCount = baseEntityDao.updatePropByID(tr, ID);
			int updateTaskCount = baseEntityDao.updatePropByID(tk, taskID);
			return (updateReportCount + updateTaskCount) > 0 ? true : false;
		}
	}

	@Override
	public boolean thirdAuditOperateCheck(String ID) {
		String baseEntity = "testreport";
		Map<String, Object> result = baseEntityDao.findByID(new String[] { "state" }, ID, "ID", baseEntity);
		if (result != null && result.size() > 0) {
			String testState = result.get("state").toString();
			if (testState.equals("3")) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

	}
	
	@Override
	public boolean thirdPassReport(String ID, String taskID,String auditPassAgreement) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		Task tk = entityDao.getByID(taskID, Task.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(5);
			tr.setDismissreason3(auditPassAgreement);
			tk.setDetectstate(6);
			int updateReportCount = baseEntityDao.updatePropByID(tr, ID);
			int updateTaskCount = baseEntityDao.updatePropByID(tk, taskID);
			return (updateReportCount + updateTaskCount) > 0 ? true : false;
		}
	}
	
	@Override
	public boolean thirdRejectReport(String ID, String taskID,String dismissreason) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		Task tk = entityDao.getByID(taskID, Task.class);
		if (tr == null) {
			return false;
		} else {
			tr.setState(4);
			tr.setDismissreason3(dismissreason);
			tk.setDetectstate(5);
			int updateReportCount = baseEntityDao.updatePropByID(tr, ID);
			int updateTaskCount = baseEntityDao.updatePropByID(tk, taskID);
			return (updateReportCount + updateTaskCount) > 0 ? true : false;
		}
	}
	
	@Override
	public boolean setReportSendCheck(String ID) {
		String baseEntity = "testreport";
		Map<String, Object> result = baseEntityDao.findByID(
				new String[] { "state,sendState" }, ID, "ID", baseEntity);
		if (result != null && result.size() > 0) {
			String testState = result.get("state").toString();
			String sendState = result.get("sendState").toString();
			if (testState.equals("5") && sendState.equals("0")) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	@Override
	public boolean setReportSendInfo(String ID,String receiveMan,String uploader) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr == null) {
			return false;
		} else {
			tr.setSendState(1);
			tr.setSendMan(uploader);
			tr.setReceiveMan(receiveMan);
			Date now = new Date(System.currentTimeMillis());
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			try {
				tr.setSendTime(dateFormat.parse(dateFormat.format(now)));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return baseEntityDao.updatePropByID(tr, ID) > 0 ? true : false;
		}
	}
	
	@Override
	public Map<String, Object> getTestReportSendRecord(int limit, int offset,
			String order, String sort, String receiptlistCode, String client,
			String reportName, String beginTime, String endTime,
			String receiveManName) {
		int index = limit;
		int pageNum = offset / limit;
		String baseEntity = " ( "
				+ " SELECT "
				+ "c.ID AS ID,"
				+ "c.fileID AS fileID,"
				+ "c.versionNumber AS versionNumber,"
				+ "c.sendTime AS sendTime,"
				+ "c.receiveMan AS receiveMan,"
				+ "c.sendMan AS sendMan,"
				+ "c.receiptlistCode AS receiptlistCode,"
				+ "company.companyName AS companyName"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "b.ID AS ID,"
				+ "b.fileID AS fileID,"
				+ "b.versionNumber AS versionNumber,"
				+ "b.sendTime AS sendTime,"
				+ "b.receiveMan AS receiveMan,"
				+ "b.sendMan AS sendMan,"
				+ "b.receiptlistCode AS receiptlistCode,"
				+ "contract.companyID AS companyID"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "a.ID AS ID,"
				+ "a.fileID AS fileID,"
				+ "a.versionNumber AS versionNumber,"
				+ "a.sendTime AS sendTime,"
				+ "a.receiveMan AS receiveMan,"
				+ "a.sendMan AS sendMan,"
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
				+ "receiptlist.contractID AS contractID"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "testreport.ID AS ID,"
				+ "testreport.taskID AS taskID,"
				+ "testreport.fileID AS fileID,"
				+ "testreport.versionNumber AS versionNumber,"
				+ "testreport.sendTime AS sendTime,"
				+ "testreport.receiveMan AS receiveMan,"
				+ "testreport.sendMan AS sendMan"
				+ " FROM "
				+ " testreport "
				+ " WHERE "
				+ " testreport.sendState = 1 "
				+ " AND testreport.state = 5 "
				+ " ) AS a "
				+ " LEFT JOIN task ON a.taskID = task.ID "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " ) AS b "
				+ " LEFT JOIN contract ON b.contractID = contract.ID "
				+ " ) AS c "
				+ " LEFT JOIN company ON c.companyID = company.ID "
				+ " ) AS d ";
		String[] properties = new String[] { "d.ID AS ID",
				"d.fileID AS fileID", "d.versionNumber AS versionNumber",
				"DATE_FORMAT(d.sendTime,'%Y-%m-%d %H:%i:%s') AS sendTime",
				"d.receiveMan AS receiveMan", "d.sendMan AS sendMan",
				"d.receiptlistCode AS receiptlistCode",
				"d.companyName AS companyName",
				"fileinformation.fileName AS fileName" };
		String joinEntity = " LEFT JOIN fileinformation ON d.fileID = fileinformation.ID ";
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
		if (receiveManName != null && !receiveManName.isEmpty()) {
			condition += " and receiveMan like '%" + receiveManName + "%'";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, baseEntity, joinEntity, null, condition, null,
				sort, order, index, pageNum);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity,
				null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	@Override
	public boolean pigeonholeReport(String ID) {
		TestReport tr = entityDao.getByID(ID, TestReport.class);
		if (tr != null) {
			tr.setState(6);
			return baseEntityDao.updatePropByID(tr, ID) > 0 ? true : false;
		} else {
			return false;
		}
	}
	
	@Override
	public List<Map<String, Object>> getReportInfo(String taskID) {

		String filteCondition = "";
		if (!taskID.isEmpty() || !taskID.equals("") || taskID != null) {
			filteCondition = " WHERE task.ID  = '" + taskID + "'";
		}
		String baseEntity = " ( " + " SELECT " + "a.levelTwo AS levelTwo,"
				+ "testreport.fileID AS fileID" + " FROM " + " ( " + " SELECT "
				+ "task.testReportID," + "task.levelTwo" + " FROM " + " task "
				+ filteCondition + " ) AS a "
				+ " LEFT JOIN testreport ON a.testReportID = testreport.ID "
				+ " ) AS b ";

		String[] properties = new String[] { "fileinformation.fileName",
				"b.levelTwo AS levelTwo" };
		String joinEntity = " LEFT JOIN fileinformation ON b.fileID = fileinformation.ID ";
		String condition = " 1=1 ";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				baseEntity, joinEntity, null, condition);
		return result;
	}
}
