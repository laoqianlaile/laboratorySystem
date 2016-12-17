package com.cqut.xiji.service.task;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.calibrationValue.CalibrationValue;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.linkReSample.LinkReSample;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.task.Task;
import com.cqut.xiji.entity.taskMan.TaskMan;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.service.tableCreator.ID;
import com.cqut.xiji.tool.treeNode.Node;
import com.cqut.xiji.tool.treeNode.NodeList;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class TaskService extends SearchService implements ITaskService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	public String gettestprojectID = "";

	@Override
	public String getBaseEntityName() {
		return "task";
	}

	@Override
	public String getBasePrimaryKey() {
		return "task.ID";
	}

	/**
	 * 
	 * @description 任务分配获取指定交接单下的分页任务
	 * @author chenyubo
	 * @created 2016年10月13日 下午11:37:03
	 * @param ID
	 *            交接单ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@Override
	public Map<String, Object> getTaskWithPagingInTaskAssign(String ID,
			int limit, int offset, String sort, String order) {
		int index = limit;
		int pageNum = offset / limit;
		String[] properties = new String[] {
				"task.ID",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				"testProject.nameCn",
				"IFnull(employee_2.employeeName, '无') AS getMan",// 领样人
				"date_format(sampleRecord.getTime,'%Y-%m-%e') as getTime",// 领样时间
				"IFnull(employee_3.employeeName, '无') AS returnMan",// 退样人
				"date_format(sampleRecord.returnTime,'%Y-%m-%e') as returnTime",// 退样时间
				"case when task.allotState = 0 then '未分配' "
						+ "when task.allotState = 1 then '已分配' end as state",
				"IFnull( " + " (SELECT group_concat(employee.employeeName) "
						+ " FROM " + " taskMan, employee " + " WHERE "
						+ "	taskMan.taskID = task.ID "
						+ "	AND taskMan.detector = employee.ID " + " ORDER BY "
						+ "	taskMan.ID),'无'" + " ) AS detector",
				"IFnull(employee_1.employeeName,'无') as custodian" };

		String joinEntity = " left join sample on task.sampleID = sample.ID "
				+ " left join sampleRecord on sampleRecord.sampleID = sample.ID "
				+ " left join testProject on task.testProjectID = testProject.ID "
				+ " left join employee as employee_1 on task.custodian = employee_1.ID "
				+ " left join employee as employee_2 on sampleRecord.getMan = employee_2.ID "
				+ " left join employee as employee_3 on sampleRecord.returnMan = employee_3.ID";

		String condition = "1 = 1 and task.receiptlistID = " + ID;

		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				getBaseEntityName(), joinEntity, null, condition, false, null,
				sort, order, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	/**
	 * 
	 * @description 分配监督员或检测人员
	 * @author chenyubo
	 * @created 2016年10月13日 下午11:37:44
	 * @param taskID
	 *            任务ID
	 * @param IDs
	 *            分配人员ID
	 * @param assignPeopleType
	 *            分配人员类型，0-监督员，1-检测人员
	 * @param type
	 *            分配方式 0-初次分配，1-重新分配，2-修改
	 * @return
	 */
	@Override
	public int assignTaskPeople(String taskID, String taskManID, String IDs,
			int assignPeopleType, int type) {
		int result = 1;
		// 分配监督员
		if (assignPeopleType == 0) {
			Task task = entityDao.getByID(taskID, Task.class);
			task.setCustodian(IDs);
			return entityDao.updatePropByID(task, taskID);
		}
		// 分配检测人员
		if (assignPeopleType == 1) {
			String[] temp = IDs.substring(0, IDs.length() - 1).split(",");

			if (type == 0) {// 初次分配
				// 更新分配状态
				Task task = entityDao.getByID(taskID, Task.class);
				task.setAllotstate(1);
				entityDao.updatePropByID(task, taskID);

				// 更新检测人员
				for (int i = 0; i < temp.length; i++) {
					TaskMan taskMan = new TaskMan();
					taskMan.setID(EntityIDFactory.createId());
					taskMan.setTaskID(taskID);
					taskMan.setDetector(temp[i]);
					if (entityDao.save(taskMan) != 1) {
						result = -1;
					}
				}
			} else if (type == 1) {// 重新分配
				// 重置检测人员
				String condition = "taskMan.taskID = " + taskID;
				entityDao.deleteByCondition(condition, TaskMan.class);

				for (int i = 0; i < temp.length; i++) {
					TaskMan taskMan = new TaskMan();
					taskMan.setID(EntityIDFactory.createId());
					taskMan.setTaskID(taskID);
					taskMan.setDetector(temp[i]);
					if (entityDao.save(taskMan) != 1) {
						result = -1;
					}
				}
			} else if (type == 2) {// 修改
				TaskMan taskMan = entityDao.getByID(taskManID, TaskMan.class);
				taskMan.setDetector(IDs);
				if (entityDao.updatePropByID(taskMan, taskManID) != 1) {
					result = -1;
				}
			}
		}
		return result;
	}

	/**
	 * 
	 * @description 设置testprojectID
	 * @author fujianfei
	 * @created 2016-10-8 下午8:03:06
	 * @param projectID
	 * @return
	 * @see com.cqut.xiji.service.task.ITaskService#setTestprojectId(java.lang.String)
	 */
	@Override
	public int setTestprojectId(String projectID) {
		System.out.println("到service");
		gettestprojectID = projectID;
		return 1;
	}

	/**
	 * 
	 * @description 初始化流程监测表
	 * @author fujianfei
	 * @created 2016-10-8 下午8:03:36
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param contract
	 * @return
	 * @see com.cqut.xiji.service.task.ITaskService#getWithPaging(int, int,
	 *      java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getWithPaging(int limit, int offset,
			String order, String sort, String contract) {
		System.out.println("222" + "<br />");
		System.out.println(gettestprojectID);
		int index = limit;
		int pageNum = offset / limit + 1;
		int state;
		String tablename = "task";
		String condition = "testProjectID=" + "\"" + gettestprojectID + "\"";
		/* String condition="testProjectID=2345"; */
		String[] properties = new String[] { "taskname", "detectstate" };
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tablename, null, null, condition, null, order,
				sort, index, pageNum);
		int count = entityDao.getByCondition(condition, Task.class).size();
		/* <span class="liucheng" name="liucheng"></span> */
		for (Map<String, Object> m : result) {
			state = (Integer) m.get("detectstate");
			System.out.println(state);
			for (int i = 1; i <= 9; i++) {
				if (i <= state)
					m.put("" + i + "",
							"<span class='liucheng' name='liucheng'></span>");
				else
					m.put("" + i + "", "");
			}
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	/**
	 * @description 任务分配下查询交接单进度
	 * @author chenyubo
	 * @created 2016年10月17日 下午2:58:05
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 * @see com.cqut.xiji.service.task.ITaskService#getTaskProgressWithPaging(java.lang.String,
	 *      int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getTaskProgressWithPaging(String ID, int limit,
			int offset, String sort, String order) {
		int index = limit;
		int pageNum = offset / limit;
		String[] properties = new String[] {
				"task.ID",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				"testProject.nameCn",
				"date_format(sample.createTime,'%Y-%m-%e') as createTime",
				"IFnull( " + " (SELECT group_concat(employee.employeeName) "
						+ " FROM " + " taskMan, employee " + " WHERE "
						+ "	taskMan.taskID = task.ID "
						+ "	AND taskMan.detector = employee.ID " + " ORDER BY "
						+ "	taskMan.ID),'无'" + " ) AS detector",
				"case when task.detectstate = 0 then '未领样' "
						+ "when task.detectstate = 1 then '检测中' "
						+ "when task.detectstate = 2 then '检测过程完成' "
						+ "when task.detectstate = 3 then '录入原始数据' "
						+ "when task.detectstate = 4 then '数据审核中' "
						+ "when task.detectstate = 5 then '数据审核通过' "
						+ "when task.detectstate = 6 then '录报告' "
						+ "when task.detectstate = 7 then '报告二审中' "
						+ "when task.detectstate = 8 then '报告三审中' "
						+ "when task.detectstate = 9 then '驳回' "
						+ "when task.detectstate = 10 then '签发' end as detectstate", };

		String joinEntity = " left join sample on task.sampleID = sample.ID "
				+ " left join testProject on task.testProjectID = testProject.ID ";

		String condition = "task.receiptlistID = " + ID;

		List<Map<String, Object>> result = searchPagingWithJoin(properties,
				joinEntity, null, condition, false, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	/**
	 * 
	 * @description 查询某任务下所有的检测人员和监督员
	 * @author chenyubo
	 * @created 2016年10月13日 下午11:37:03
	 * @param ID
	 *            任务ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@Override
	public Map<String, Object> getTaskAssignPeople(String ID, int limit,
			int offset, String sort, String order) {
		int index = limit;
		int pageNum = offset / limit;
		String[] properties = new String[] {
				"task.ID",
				"taskMan.ID as taskManID",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				"testProject.nameCn",
				"case when task.allotState = 0 then '未分配' "
						+ "when task.allotState = 1 then '已分配' end as state",
				"if(employee_2.employeeName is null,'无',employee_2.employeeName) as detector",
				"if(employee_1.employeeName is null,'无',employee_1.employeeName) as custodian" };

		String joinEntity = " left join sample on task.sampleID = sample.ID "
				+ " left join testProject on task.testProjectID = testProject.ID "
				+ " left join employee as employee_1 on task.custodian = employee_1.ID "
				+ " left join taskMan on taskMan.taskID = task.ID "
				+ " left join employee as employee_2 on taskMan.detector = employee_2.ID ";

		String condition = "task.ID = " + ID;

		List<Map<String, Object>> result = searchPagingWithJoin(properties,
				joinEntity, null, condition, false, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	/**
	 * @description 获取交接单中样品
	 * @author hzz
	 * @date 2016年 10月19日 晚上 19:15:49
	 */
	@Override
	public Map<String, Object> getReceiptlistSampleInforWithPaging(String ID,
			int limit, int offset, String sort, String order) {
		int index = limit;
		int pageNum = offset / limit;
		String[] properties = new String[] { "sample.ID", "task.ID as taskID",
				"sample.factoryCode", "sample.sampleName",
				"sample.specifications", "task.require",
				"testProject.ID AS testID", "testproject.nameCn as  testName",
				"date_format(sample.createTime,'%Y-%m-%d') as createTime", };

		String joinEntity = " left join sample on task.sampleID =sample.ID "
				+ " left join testProject on task.testProjectID = testProject.ID ";
		String condition = "1 = 1 and task.receiptlistID = " + ID;

		List<Map<String, Object>> result = searchPagingWithJoin(properties,
				joinEntity, null, condition, false, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	/**
	 * @description 更新交接单中样品信息
	 * @author hzz
	 * @date 2016年 11月12日 早上09:30:15
	 */
	@Override
	public String updReceiptlistSampleInForInReturn(String ID, String testID,
			String factoryCode, String sampleName, String specifications,
			String nameCn, String createTime) {
		if (ID == null || ID.equals("")) {
			return "false";
		}
		Sample sample = entityDao.getByID(ID, Sample.class);
		if (sample == null)
			return "false";
		sample.setFactoryCode(factoryCode);
		sample.setSampleName(sampleName);
		sample.setSpecifications(specifications);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date createTime1 = null;
		try {
			createTime1 = sdf.parse(createTime);
			System.out.println(createTime1);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if (createTime1 != null) {
			sample.setCreateTime(createTime1);
		}
		if (testID == null || testID.equals("")) {
			return "false";
		}
		System.out.println(testID);
		TestProject testproject = entityDao.getByID(testID, TestProject.class);
		if (testproject == null)
			return "false";
		testproject.setNameCn(nameCn);
		return entityDao.updatePropByID(sample, ID)
				+ entityDao.updatePropByID(testproject, testID) == 2 ? "true"
				: "false";

	}

	/**
	 * @description 录入样品
	 * @author hzz
	 * @date 2016年11月17日晚上 20:23:10
	 */
	@Override
	public String addTaskSample(String ID, String receiptlistID) {
		Task task = new Task();
		task.setID(EntityIDFactory.createId());
		task.setReceiptlistID(receiptlistID);
		task.setSampleID(ID);
		task.setStartTime(new Date());
		task.setAllotstate(0);
		task.setDetectstate(0);

		return entityDao.save(task) == 1 ? "true" : "false";
	}

	/**
	 * @description 删除交接单样品
	 * @author hzz
	 * @date 2016年11月30日 下午2:55:36
	 */
	@Override
	public String deleteTaskByCondition(String reID) {
		// TODO Auto-generated method stub
		String condition = "1 = 1 and task.receiptlistID = " + reID;
		return entityDao.deleteByCondition(condition, Task.class) == 1 ? "true" : "false";
	}

	
	/**
	 * @description 科室主管桌面下查看工作量统计
	 * @author chenyubo
	 * @created 2016年12月12日 下午10:16:55
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 * @see com.cqut.xiji.service.task.ITaskService#getWorkloadStatistical(java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getWorkloadStatistical(String ID, int limit,
			int offset, String sort, String order, String detector, String sampleName, String factoryCode, String testProject) {
		int index = limit;
		int pageNum = offset / limit;
		String[] properties = new String[] {
				"task.ID",
				"IFnull(employee.employeeName, '无') AS detector",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				"testProject.nameCn" };

		String joinEntity = " inner join taskMan on taskMan.taskID = task.ID "
				+ " inner join employee on employee.ID = taskMan.detector "
				+ " inner join sample on sample.ID = task.sampleID "
				+ " inner join testProject on task.testProjectID = testProject.ID ";

		String condition = "1 = 1 and task.receiptlistID = '" + ID + "'";
		
		if(detector != null && !detector.equals("")){
			condition += " and employeeName like '%" + detector + "%'";
		}
		if(sampleName != null && !sampleName.equals("")){
			condition += " and sampleName like '%" + sampleName + "%'";
		}
		if(factoryCode != null && !factoryCode.equals("")){
			condition += " and factoryCode like '%" + factoryCode + "%'";
		}
		if(testProject != null && !testProject.equals("")){
			condition += " and nameCn like '%" + testProject + "%'";
		}

		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				getBaseEntityName(), joinEntity, null, condition, false, null,
				sort, order, index, pageNum);
		int count = searchForeignWithJoin(properties, joinEntity, null, condition, false).size();

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}
	
	@Override
	public Map<String,Object> getTaskWithPaging(int limit, int offset, String order,
			String sort, String receiptlistCode, String testProjectName, String sampleName,
			String beginTime, String endTime, String testProcess){
		int index = limit;
		int pageNum = offset / limit ;
		String tableName = " ( "+
				" SELECT "+
				"b.ID AS ID,"+
				"b.startTime AS startTime,"+
				"b.endTime AS endTime,"+
				"b.detectstate AS detectstate,"+
				"b.receiptlistCode AS receiptlistCode,"+
				"b.levelTwo AS levelTwo,"+
				"b.testProjectName AS testProjectName,"+
				"b.sampleName AS sampleName,"+
				"b.detector AS detector,"+
				"employee.employeeName AS custodian"+
			" FROM "+
				" ( "+
					" SELECT "+
						"a.ID AS ID,"+
						"a.custodian AS custodian,"+
						"a.startTime AS startTime,"+
						"a.endTime AS endTime,"+
						"a.detectstate AS detectstate,"+
						"a.receiptlistCode AS receiptlistCode,"+
						"a.levelTwo AS levelTwo,"+
						"a.testProjectName AS testProjectName,"+
						"a.sampleName AS sampleName,"+
						"employee.employeeName AS detector"+
					" FROM "+
						" ( "+
							" SELECT "+
								"task.ID AS ID,"+
								"task.custodian AS custodian,"+
								"task.startTime AS startTime,"+
								"task.endTime AS endTime,"+
								"task.detectstate AS detectstate,"+
								"task.levelTwo AS levelTwo,"+
								"receiptlist.receiptlistCode AS receiptlistCode,"+
								"IF (testproject.nameEn IS NULL,testproject.nameCn,CONCAT(testproject.nameCn,'(',testproject.nameEn,')')) AS testProjectName,"+
								"sample.sampleName AS sampleName,"+
								"taskman.detector AS detector"+
							" FROM "+
								" task "+
							" LEFT JOIN taskman ON task.ID = taskman.taskID "+
							" LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "+
							" LEFT JOIN sample ON task.sampleID = sample.ID "+
							" LEFT JOIN testproject ON task.testProjectID = testproject.ID "+
						" ) AS a "+
					" LEFT JOIN employee ON a.detector = employee.ID "+
				" ) AS b "+
			" LEFT JOIN employee ON b.custodian = employee.ID "+
		" ) AS c " ;
		String[] properties = new String[] {
				 "c.ID AS ID",
				 "DATE_FORMAT(startTime,'%Y-%m-%d %H:%i:%s') AS startTime",
				 "DATE_FORMAT(endTime,'%Y-%m-%d %H:%i:%s') AS endTime",
				 "IF (c.detectstate = 0,'无报告',IF (c.detectstate = 1,'未提交',IF (c.detectstate = 2,'二审中',IF (c.detectstate=3,'二审未通过',IF (c.detectstate = 4,'三审中',"+
				 "IF (c.detectstate = 5,'三审未通过',IF (c.detectstate = 6,'审核通过','其它'))))))) AS detectstate",
				 "c.receiptlistCode AS receiptlistCode",
				 "c.testProjectName AS testProjectName",
				 "c.sampleName AS sampleName",
				 "c.detector AS detector",
				 "c.custodian AS custodian",
				 "employee.employeeName AS levelTwo"};
		String joinEntity = " LEFT JOIN employee ON c.levelTwo = employee.ID ";
		String condition = " 1 = 1 ";
		
		if (receiptlistCode != null && !receiptlistCode.isEmpty()) {
			condition += " and receiptlistCode like '%" + receiptlistCode + "%'";
		}
		if (testProjectName != null && !testProjectName.isEmpty()) {
			condition += " and testProjectName like '%" + testProjectName + "%'";
		}
		if (sampleName != null && !sampleName.isEmpty()) {
			condition += " and sampleName like '%" + sampleName + "%'";
		}
		if (beginTime != null && !beginTime.isEmpty()) {
			condition += " and startTime >'" + beginTime + "'";
		}
		if (endTime != null && !endTime.isEmpty()) {
			condition += " and endTime <'" + endTime + "'";
		}
		if (testProcess != null && !testProcess.isEmpty()) {
			if (!testProcess.equals("7")) {
				condition += " and detectstate ='" + testProcess + "'";
			} else {
				condition += "";
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
	public boolean updateTaskAuditPerson(String taskID,String employeeID){
			Task tk = entityDao.getByID(taskID, Task.class);
			if (tk == null) {
				return false;
			} else {
				tk.setLevelTwo(employeeID);
				return baseEntityDao.updatePropByID(tk, taskID) > 0 ? true : false;
			}
	}
	
	@Override
	public List<Map<String, Object>> checkTaskClientInfo(String taskID){
		String filteCondition = "";
		if (taskID != null && !taskID.equals("") && !taskID.isEmpty()) {
			filteCondition += " WHERE task.ID = " + taskID;
		}
		String tableName = " ( "
				+ " SELECT "
				+ "task.requires AS requires,"
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
				+ "receiptlist.createTime AS createTime,"
				+ "receiptlist.completeTime AS completeTime,"
				+ "receiptlist.linkMan AS linkMan,"
				+ "receiptlist.linkPhone AS linkPhone,"
				+ "contract.companyID AS companyID,"
				+ "IF(contract.isClassified = 0,'否','是') AS isClassified,"
				+ "IF(contract.classifiedLevel = 0,'秘密',"
				+ "IF (contract.classifiedLevel = 1,'机密',"
				+ "IF(contract.classifiedLevel = 2,'绝密',"
				+ "IF(contract.classifiedLevel = 3,'无密级','其它')))) AS classifiedLevel"
				+ " FROM "
				+ " task "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " LEFT JOIN contract ON receiptlist.contractID = contract.ID "
				+ filteCondition + " ) AS a ";
		String[] properties = new String[] {
				"a.requires AS requires",
				"a.receiptlistCode AS receiptlistCode",
				"DATE_FORMAT(a.createTime,'%Y-%m-%d %H:%i:%s') AS createTime",
				"DATE_FORMAT(a.completeTime,'%Y-%m-%d %H:%i:%s') AS completeTime",
				"a.linkMan AS linkMan", "a.linkPhone AS linkPhone",
				"a.isClassified AS isClassified",
				"a.classifiedLevel AS classifiedLevel",
				"company.companyName AS companyName",
				"company.address AS address" };
		String joinEntity = " LEFT JOIN company ON a.companyID = company.ID ";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, joinEntity, null, null);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getSampleManageInfo(String taskID) {
		String tableName = "task";
		String[] properties = new String[] {
				"DATE_FORMAT(receiptlist.createTime,'%Y-%m-%d %H:%i:%s') AS createTime",
				"employee.employeeName AS employeeName" };
		String joinEntity = " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " LEFT JOIN employee ON receiptlist.employeeID = employee.ID ";
		String condition = " 1 = 1 ";
		if (taskID != null && !taskID.equals("") && !taskID.isEmpty()) {
			condition += " AND task.ID = " + taskID;
		}
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, joinEntity, null, condition);
		return result;
	}
	
	@Override
	public Map<String, Object> getSampleInfoWithPaging(int limit, int offset,
			String order, String sort, String taskID) {
		int index = limit;
		int pageNum = offset / limit;
		String filteConditon = "";
		if (taskID != null && !taskID.equals("") && !taskID.equals(" ")
				&& !taskID.isEmpty()) {
			filteConditon = " WHERE task.ID = " + taskID;
		}
		String tableName = " ( "
				+ " SELECT "
				+ "sample.factoryCode AS factoryCode,"
				+ "sample.sampleName AS sampleName,"
				+ "sample.specifications AS specifications,"
				+ "samplerecord.getTime AS getTime,"
				+ "sampleRecord.getMan AS getMan,"
				+ "samplerecord.returnTime AS returnTime,"
				+ "samplerecord.returnMan AS returnMan,"
				+ "task.detectstate AS detectstate,"
				+ "task.testProjectID AS testProjectID,"
				+ "task.ID AS ID"
				+ " FROM "
				+ " task "
				+ " LEFT JOIN sample ON task.sampleID = sample.ID "
				+ " LEFT JOIN samplerecord ON sample.ID = samplerecord.sampleID "
				+ filteConditon + " ) AS a ";
		String[] properties = new String[] {
				"a.ID AS ID",
				"a.factoryCode AS factoryCode",
				"a.sampleName AS sampleName",
				"a.specifications AS specifications",
				"DATE_FORMAT(a.returnTime,'%Y-%m-%d %H:%i:%s') AS returnTime",
				"a.getMan AS getMan",
				"DATE_FORMAT(a.getTime,'%Y-%m-%d %H:%i:%s') AS getTime",
				"a.returnMan AS returnMan",
				"IF (a.detectstate = 0,'无报告',IF (a.detectstate = 1,'未提交',IF (a.detectstate = 2,'二审中',IF (a.detectstate=3,'二审未通过',IF (a.detectstate = 4,'三审中',"
						+ "IF (a.detectstate = 5,'三审未通过',IF (a.detectstate = 6,'审核通过','其它'))))))) AS detectstate",
				"IF (testproject.nameCn IS NULL,testproject.nameEn,IF (testproject.nameEn IS NULL,testproject.nameCn,CONCAT(testproject.nameCn,'(',testproject.nameEn,')'))) AS testProjectName", };
		String joinEntity = " LEFT JOIN testproject ON a.testProjectID = testproject.ID ";

		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, null, null, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity,
				null, null).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
	
	@Override
	public Map<String, Object> getTaskAuditPersonWithPaging(int limit, int offset,String order, String sort ) {
		int index = limit;
		int pageNum = offset / limit;
		
		String tableName = "employee";
		String[] properties = new String[] {
				"employee.ID AS ID",
				"employee.employeeCode AS employeeCode",
				"employee.employeeName AS employeeName",
				"IF (employee.sex = 0, '女', '男') AS sex",
				"IF (employee.state = 0, '禁用', '启用') AS employeeState",
				"IF (employee.`level` = 0,'初级',IF (employee.`level` = 1,'中级',IF(employee.`level` = 2,'高级','其它'))) AS employeeLevel",
				"role.`name` AS roleName" };
		String condition = " role.`name` = '报告审核人' ";
		String joinEntity = " LEFT JOIN role ON employee.roleID = role.ID ";

		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
}
