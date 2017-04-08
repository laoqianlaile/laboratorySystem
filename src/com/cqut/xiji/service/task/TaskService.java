package com.cqut.xiji.service.task;

import java.io.File;
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
import com.cqut.xiji.entity.message.Message;
import com.cqut.xiji.entity.messageNotice.MessageNotice;
import com.cqut.xiji.entity.receiptlist.Receiptlist;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.task.Task;
import com.cqut.xiji.entity.taskMan.TaskMan;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.entity.testReport.TestReport;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.service.fileEncrypt.IFileEncryptService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.PropertiesTool;
import com.cqut.xiji.tool.word.WordProcess;

@Service
public class TaskService extends SearchService implements ITaskService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;
	
	@Resource(name = "fileEncryptService")
	IFileEncryptService fileEncryptservice;
	
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
				//  如果修改是检测人员为空，则新增
				if (taskManID == null) {
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
				} else { // 检测人员不为空
					TaskMan taskMan = entityDao.getByID(taskManID, TaskMan.class);
					taskMan.setDetector(IDs);
					if (entityDao.updatePropByID(taskMan, taskManID) != 1) {
						result = -1;
					}
				}
			}
			
			addMessage(temp, taskID); // 添加消息
		}
		return result;
	}
	
	public void addMessage(String[] IDS, String taskID) {
		Task task = entityDao.getByID(taskID, Task.class);
		
		String content = task.getID() + "任务需要检测!"; // 消息记录内容
		
		// 设置消息记录
		Message message = new Message();
		String messageID = EntityIDFactory.createId();
		message.setID(messageID);
		message.setContent(content);
		message.setCreateTime(new Date());
		entityDao.save(message);
		
		// 设置消息通知
		int len = IDS.length;
		MessageNotice[] messageNotices = new MessageNotice[len];
		
		for(int i = 0; i < len; i++) {
			messageNotices[i] = new MessageNotice();
			messageNotices[i].setID(EntityIDFactory.createId());
			messageNotices[i].setMessageID(messageID);
			messageNotices[i].setEmployeeID(IDS[i]);
		}
		entityDao.saveEntities(messageNotices);
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
		int pageNum = offset / limit;
		int state;
		String tablename = "task";
		String condition = "testProjectID=" + "\"" + gettestprojectID + "\"";
		/* String condition="testProjectID=2345"; */
		String[] properties = new String[] { "detectstate" };
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tablename, null, null, condition, null, null,
				null, index, pageNum);
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
				"sample.specifications", "task.requires",
				"date_format(sample.createTime,'%Y-%m-%d') as createTime", };
		String joinEntity = " left join sample on task.sampleID =sample.ID ";
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
	public String updReceiptlistSampleInForInReturn(String ID,
			String factoryCode, String sampleName, String specifications, String createTime) {
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
		return entityDao.updatePropByID(sample, ID) == 1 ? "true"
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
				 "IF (c.detectstate = 0,'无报告',IF (c.detectstate = 1,'未提交',IF (c.detectstate = 2,'二审核中',IF (c.detectstate=3,'二审未通过',IF (c.detectstate = 4,'三审核中',"+
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
		String condition = " role.`name` = '报告审核人' AND employee.state = '1' ";
		String joinEntity = " LEFT JOIN role ON LOCATE(role.ID,employee.roleID) > 0 ";

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
	public boolean recoverFileCheck(String taskID){
		String tableName = "task";
		Map<String, Object> result = baseEntityDao.findByID(new String[] { "detectstate" }, taskID, "ID", tableName);
        if(result==null){
        	return true;
        }else{
        	String detectState = result.get("detectstate").toString();
        	if(detectState.equals("0")||detectState.equals("1")||detectState.equals("3")||detectState.equals("5")){
        		return true;
        	}else{
        		return false;
        	}
        }
	}
	
	@Override
	public List<Map<String, Object>> getProjectName(String taskID) {
		String filteCondition = "";
		if (taskID != null && !taskID.equals("") && !taskID.isEmpty()) {
			filteCondition += " where task.ID = '" + taskID + "'";
		}
		String baseEntiy = " ( " + " SELECT " + " task.receiptlistID "
				+ " FROM " + "task" + filteCondition + " ) AS a ";
		String[] properties = new String[] { "receiptlist.projectID AS NAME" };
		String joinEntity = " LEFT JOIN receiptlist ON a.receiptlistID = receiptlist.ID ";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				baseEntiy, joinEntity, null, null);
		return result;
	}
	
	@Override
	public boolean setTaskDetectState(String taskID) {
		Task tk = entityDao.getByID(taskID, Task.class);
		if (tk == null) {
			return false;
		} else {
			tk.setDetectstate(1);
			return baseEntityDao.updatePropByID(tk, taskID) > 0 ? true : false;
		}
	}
	
	@Override
	public boolean setTestReportInfo(String taskID, String remarks) {
		Map<String, Object> testreportInfo = baseEntityDao.findByID(
				new String[] { "testReportID,receiptlistID" }, taskID, "ID",
				"task");
		String condition = " fileinformation.belongtoID = '" + taskID + "'";
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				new String[] { "fileinformation.ID AS ID" }, "fileinformation",
				null, null, condition, null, "fileinformation.uploadTime",
				"DESC", 1, 0);
		String fileID = "";
		if (result != null && result.size() > 0) {
			fileID = result.get(0).get("ID").toString();
		}
		String testReportID = "";
		if (testreportInfo.get("testReportID") == null || testreportInfo.get("testReportID").toString().length() == 0) {
			TestReport tr = new TestReport();
			String receiptlistID = testreportInfo.get("receiptlistID").toString();
			testReportID = EntityIDFactory.createId().toString();
			tr.setID(testReportID);
			tr.setReceiptlistID(receiptlistID);
			tr.setTaskID(taskID);
			tr.setVersionNumber("1.0");
			//tr.setVersionInformation("");
			if (fileID != null && !fileID.isEmpty() && !fileID.equals("")) {
				tr.setState(0);
				tr.setFileID(fileID);
			}
			tr.setRemarks(remarks);
			tr.setSendState(0);
			Task tk = entityDao.getByID(taskID, Task.class);
			tk.setTestReportID(testReportID);
			int saveTereport = baseEntityDao.save(tr);
			int updateTask = baseEntityDao.updatePropByID(tk, taskID);
			int updateSuccessCount = saveTereport + updateTask;
			return (updateTask + updateSuccessCount) > 1 ? true : false;
		} else {
			testReportID = testreportInfo.get("testReportID").toString();
			TestReport tr = entityDao.getByID(testReportID, TestReport.class);
			tr.setFileID(fileID);
			tr.setRemarks(remarks);
			return baseEntityDao.updatePropByID(tr, testReportID) > 0 ? true
					: false;
		}
	}
	
	@Override
	public List<Map<String, Object>> getReportFileID(String taskID){
		String filteCondition = "";
		if (taskID != null && !taskID.equals("") && !taskID.isEmpty()) {
			filteCondition += " where task.ID = '" + taskID + "'";
		}
		String baseEntiy = " ( " + " SELECT " + 
		"testreport.fileID AS fileID"
				+ " FROM " + " ( " + " SELECT "
				+ "task.testReportID AS testReportID " + " FROM " + " task "
				+ filteCondition + " ) AS a "
				+ " LEFT JOIN testreport ON a.testReportID = testreport.ID "
				+ " ) AS b ";
		String[] properties = new String[] { "fileinformation.ID"};
		String joinEntity = " LEFT JOIN fileinformation ON b.fileID = fileinformation.ID ";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				baseEntiy, joinEntity, null, null);
		if (result == null) {
			return null;
		} else {
			return result;
		}
	}

	@Override
	public boolean submitReport(String taskID) {
		Task tk = entityDao.getByID(taskID, Task.class);
		Map<String, Object> result = baseEntityDao.findByID(
				new String[] { "receiptlistID,detectstate,testReportID,levelTwo" }, taskID,
				"ID", "task");
		if (result.get("levelTwo") == null) {
			return false;
		} else {
			String detectstate = result.get("detectstate").toString();
			if (detectstate.equals("1")) {
				tk.setDetectstate(2);
				String testReportID = result.get("testReportID").toString();
				TestReport tr = entityDao.getByID(testReportID,TestReport.class);
				String receiptlistID = result.get("receiptlistID").toString();
				Receiptlist rt = entityDao.getByID(receiptlistID,Receiptlist.class);
				if (tr != null) {
					tr.setState(1);
				}
				if (rt != null){
					rt.setState(1);
				}
				int updateTaskSuccessCount = baseEntityDao.updatePropByID(tk,taskID);
				int updateReportSuccessCount = baseEntityDao.updatePropByID(tr,testReportID);
				int updateReceiptlistCount = baseEntityDao.updatePropByID(rt,receiptlistID);
				return (updateTaskSuccessCount + updateReportSuccessCount + updateReceiptlistCount) > 2 ? true : false;

			} else {
				return false;
			}
		}
	}

	@Override
	public List<Map<String, Object>> getTaskByRelist(String receiptlistID) {
		
		String baseEntity = "task";
		String[] properties = {
			"task.ID as taskID",
			"testproject.nameCn"
		};
		String joinEntity = " LEFT JOIN testproject ON testproject.ID = task.testProjectID  ";
		String condition = " 1 = 1 and  task.receiptlistID = " + receiptlistID; 
		List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
		return result;
	}
	
	@Override
	public String getFileIdOfTask(String taskID){
		Map<String, Object> taskInfoResult = baseEntityDao.findByID(new String[] { "testReportID,receiptlistID" }, taskID, "ID",
				"task");
		Object map = taskInfoResult.get("testReportID");
		if (map == null || map.toString().length() == 0) {
			return null;
		} else {
			String testReportID = taskInfoResult.get("testReportID").toString();
			String baseEntiy = " fileinformation ";
			String[] properties = new String[] { "fileinformation.ID AS ID" };
			String joinEntity = " LEFT JOIN testreport ON fileinformation.ID = testreport.fileID ";
			String filteCondition = " testreport.ID = '" + testReportID + "'";
			List<Map<String, Object>> result = entityDao.searchForeign(
					properties, baseEntiy, joinEntity, null, filteCondition);
			if (result == null || result.size() == 0) {
				return null;
			} else {
				String fileID = result.get(0).get("ID").toString();
				return fileID;
			}
		}
	}

	@Override
	public String downReportTemplate(String taskID, String projectName,String UPLOADER) {
		String filteCondition = "";
		String testReportID = "";
		String baseEntiy = "";
		String[] properties = null;
		String joinEntity = "";
	    filteCondition = " where task.ID = '" + taskID + "'";
		baseEntiy = " ( " + " SELECT " + " template.fileID AS fileID "
				+ " FROM " + " ( " + " SELECT "
				+ " testproject.templateID AS templateID " + " FROM " + " ( "
				+ " SELECT " + " task.testProjectID AS testProjectID "
				+ " FROM " + " task " + filteCondition + " ) AS a "
				+ " LEFT JOIN testproject ON a.testProjectID = testproject.ID "
				+ " ) AS b "
				+ " LEFT JOIN template ON b.templateID = template.ID "
				+ " ) AS c ";
		properties = new String[] { "fileinformation.ID AS ID","fileinformation.path AS path",
				"fileinformation.pathPassword AS pathPassword" };
		joinEntity  = " LEFT JOIN fileinformation ON c.fileID = fileinformation.ID ";
		List<Map<String, Object>> result = entityDao.searchForeign(
				properties, baseEntiy, joinEntity, null, null);
		if (result == null) {
			return null;
		} else {
			try {
				baseEntiy = " ( "
						+ " SELECT "
						+ "b.sampleName AS sampleName,"
						+ "b.specifications AS specifications,"
						+ "b.requires AS requires,"
						+ "b.testProjectName AS testProjectName,"
						+ "b.accordingDoc AS accordingDoc,"
						+ "b.createTime AS createTime,"
						+ "contract.companyID AS companyID"
						+ " FROM "
						+ " ( "
						+ " SELECT "
						+ "a.sampleName AS sampleName,"
						+ "a.specifications AS specifications,"
						+ "a.requires AS requires,"
						+ "testproject.nameCn  AS testProjectName,"
						+ "receiptlist.contractID AS contractID,"
						+ "receiptlist.accordingDoc AS accordingDoc,"
						+ "DATE_FORMAT(receiptlist.createTime,'%Y-%m-%d %H:%i:%s') AS createTime"
						+ " FROM "
						+ " ( "
						+ " SELECT "
						+ "sample.sampleName AS sampleName,"
						+ "sample.specifications AS specifications,"
						+ "task.receiptlistID AS receiptlistID,"
						+ "task.testProjectID AS testProjectID,"
						+ "task.requires AS requires,"
						+ "task.ID AS ID"
						+ " FROM "
						+ " task "
						+ " LEFT JOIN sample ON task.sampleID = sample.ID "
						+ filteCondition
						+ " ) AS a "
						+ " LEFT JOIN testproject ON a.testProjectID = testproject.ID "
						+ " LEFT JOIN receiptlist ON a.receiptlistID = receiptlist.ID "
						+ " ) AS b "
						+ " LEFT JOIN contract ON b.contractID = contract.ID "
						+ " ) AS c ";
				properties = new String[] { "c.sampleName AS sampleName",
						"c.specifications AS specifications",
						"c.requires AS requires",
						"c.testProjectName AS testProjectName",
						"c.accordingDoc AS accordingDoc",
						"c.createTime AS createTime",
						"company.companyName AS companyName",
						"company.address AS address" };
				joinEntity = " LEFT JOIN company ON c.companyID = company.ID ";
				List<Map<String, Object>> wordData = entityDao
						.searchForeign(properties, baseEntiy, joinEntity,
								null, null);
				
				String fileInfoID = result.get(0).get("ID").toString();
				String filePath = result.get(0).get("path").toString();
				String pathPassword = result.get(0).get("pathPassword").toString();
				PropertiesTool pe = new PropertiesTool();
				
				filePath = fileEncryptservice.decryptPath(filePath, pathPassword);
				String path = pe.getSystemPram("filePath") + "\\" ;
				
				String fileName = "";
				String memoryName = "";
				if (wordData.get(0).get("sampleName") != null) {
					fileName += wordData.get(0).get("sampleName").toString();
					memoryName += wordData.get(0).get("sampleName").toString();
				}
				if (wordData.get(0).get("testProjectName") != null) {
					fileName += "的"+ wordData.get(0).get("testProjectName").toString()+"的检测报告";
					memoryName += "的"+ wordData.get(0).get("testProjectName").toString()+"的检测报告";
				}

				String cacheFilePath = pe.getSystemPram("cacheFilePath")+"\\"+fileName + ".docx";

				fileEncryptservice.decryptFile(path+filePath, cacheFilePath, fileInfoID);
				System.out.println("文件的路径1 ："+filePath);
				System.out.println("文件的路径2 ："+cacheFilePath);
				if (wordData != null) {
					WordProcess wp = new WordProcess(false);
					wp.openDocument(cacheFilePath);
					if (wordData.get(0).get("sampleName") != null)
						wp.replaceText("{样品名称}",
								wordData.get(0).get("sampleName")
										.toString());
					if (wordData.get(0).get("specifications") != null)
						wp.replaceText("{样品型号}",
								wordData.get(0).get("specifications")
										.toString());
					if (wordData.get(0).get("companyName") != null)
						wp.replaceText("{委托方}",
								wordData.get(0).get("companyName")
										.toString());
					if (wordData.get(0).get("address") != null)
						wp.replaceText("{委托方地址}",
								wordData.get(0).get("address").toString());
					if (wordData.get(0).get("createTime") != null)
						wp.replaceText("{接收日期}",
								wordData.get(0).get("createTime")
										.toString());
					if (wordData.get(0).get("requires") != null)
						wp.replaceText("{任务的要求描述}",
								wordData.get(0).get("requires").toString());
					if (wordData.get(0).get("testProjectName") != null)
						wp.replaceText("{检测项目的检测方法}",
								wordData.get(0).get("testProjectName")
										.toString());
					if (wordData.get(0).get("accordingDoc") != null)
						wp.replaceText("{交接单的依据文件}",
								wordData.get(0).get("accordingDoc")
										.toString());
					String relativePath = "项目文件" + "\\" + projectName
							+ "\\" + "报告文件" + "\\";

					path += relativePath;
					File targetFile = new File(path);
					if (!targetFile.exists()) {
						targetFile.mkdirs();
					}
				    testReportID = EntityIDFactory.createId();
					fileName += "_" + testReportID + ".docx";
					memoryName += ".docx";
					relativePath += fileName;
					path += fileName;
					wp.save(cacheFilePath);
					wp.close();
					Task tk = entityDao.getByID(taskID, Task.class);
					tk.setDetectstate(1);
					tk.setTestReportID(testReportID);
					baseEntityDao.updatePropByID(tk, taskID);
					
					FileInformation fi = new FileInformation();
					String fileID = EntityIDFactory.createId();
					fi.setID(fileID);
					fi.setBelongtoID(taskID);
					fi.setUploaderID(UPLOADER);
					fi.setFileName(memoryName);
					System.out.println("保存的相对路径是a: " + relativePath);
					fi.setPath(relativePath);
					Date now = new Date(System.currentTimeMillis());
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					fi.setUploadTime(dateFormat.parse(dateFormat.format(now)));
					fi.setState(0);
					fi.setType(2);
				    baseEntityDao.save(fi);
				    System.out.println("relativePath :"+relativePath);
				    System.out.println("cacheFilePath :"+cacheFilePath);
				    fileEncryptservice.encryptPath(relativePath, fileID);
					fileEncryptservice.encryptFile(cacheFilePath,path,fileID);
					
					TestReport tr = new TestReport();
					
					Map<String, Object> receiptlistIDInfo = baseEntityDao.findByID(new String[] { "receiptlistID" }, taskID, "ID",
							"task");
					String receiptlistID = receiptlistIDInfo.get("receiptlistID").toString();
					tr.setID(testReportID);
					tr.setReceiptlistID(receiptlistID);
					tr.setTaskID(taskID);
				    tr.setVersionNumber("1.0"); 
					// tr.setVersionInformation("");
					tr.setState(0);
					tr.setFileID(fileID);
					tr.setSendState(0);
					baseEntityDao.save(tr);
					return fileID;
					} 
				} catch (Exception e) {
					e.printStackTrace();
				}
				return null;
			}
	}

	/**
	 * @description 获取任务信息
	 * @author HZZ
	 * @date 2016年12月26日 17:23:23
	 */
	@Override
	public Map<String, Object> getTaskInfoWithPaging(int limit, int offset,
			String order, String sort) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset / limit;
		String[] properties = new String[] {
				"task.ID",
				"task.receiptlistID",
				"task.taskCode",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				"IF(testProject.nameEn IS  NULL , testProject.nameCn , "
						+ " if ( testProject.nameCn is null ,testProject.nameEn,"
						+ " CONCAT(testProject.nameEn,'(',testProject.nameCn,')') )) as testName ",
				"employee.employeeName",
				"case when task.detectState = 0 then '未领样' "
				+ "when task.detectState = 1 then '检测中'"
				+ "when task.detectState = 2 then '检测过程完成'"
				+ "when task.detectState = 3 then '录入原始数据'"
				+ "when task.detectState = 4 then '数据审核中'"
				+ "when task.detectState = 5 then '数据审核通过'"
				+ "when task.detectState = 6 then '录报告'"
				+ "when task.detectState = 7 then '报告二审中'"
				+ "when task.detectState = 8 then '报告三审中'"
				+ "when task.detectState = 9 then '驳回'"
				+ "when task.detectState = 10 then '签发'end as detectState",};
		
		String joinEntity = " left join sample on task.sampleID =sample.ID "
				+ "left join testProject on task.testProjectID = testProject.ID "
				+ " left join taskMan on taskMan.taskID = task.ID "
				+"left join employee on taskMan.detector=employee.ID";
		String condition = "1 = 1 ";
		List<Map<String, Object>> result = searchPagingWithJoin(properties,
				joinEntity, null, condition, false, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	/**
	 * @description 获取检测报告
	 * @author HZZ
	 * @date 2016年12月27日 晚上20:58:17
	 */
	@Override
	public Map<String, Object> getTaskTestReportWithPaging(int limit,
			int offset, String order, String sort) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset / limit;
		int detectState=4;
		String[] properties = new String[] {
				"task.ID",
				"task.taskCode",
				"receiptlist.receiptlistCode",
				"fileInformation.fileName",
				"sample.sampleName",
				"testReport.versionNumber",
		};
		String joinEntity = "left join receiptlist on task.receiptlistID=receiptlist.ID"
				+" left join sample on task.sampleID =sample.ID "
				 +"left join testReport on testReport.taskID = task.ID "
		         +"left join fileInformation on testReport.fileID=fileInformation.belongtoID";
		String condition = "1 = 1 and task.detectState = "+ detectState;
		
		List<Map<String, Object>> result = searchPagingWithJoin(properties,
				joinEntity, null, condition, false, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;
	}

	/**
	 * @description 获取指定任务信息
	 * @author HZZ
	 * @date 2016年12月29日 晚上19:35:04
	 */
	@Override
	public List<Map<String, Object>> getTaskInfor(String ID) {
		// TODO Auto-generated method stub
		String tableName = "task";
		String[] properties = new String[]{
			"receiptlist.receiptlistCode",
			"receiptlist.accordingDoc",	
		};
		String[] foreignEntitys = new String[]{
			"receiptlist",
		};
		String condition = "task.ID = " + ID
				+ " and task.receiptlistID = receiptlist.ID ";
		
		List<Map<String, Object>> result = entityDao.searchForeign(properties, tableName, null, foreignEntitys, condition);
		
		return result;

	}

}
