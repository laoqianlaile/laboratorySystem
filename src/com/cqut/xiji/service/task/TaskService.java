package com.cqut.xiji.service.task;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;


import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.base.BootstrapTreeNode;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.message.Message;
import com.cqut.xiji.entity.messageNotice.MessageNotice;
import com.cqut.xiji.entity.originaldata.Originaldata;
import com.cqut.xiji.entity.receiptlist.Receiptlist;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.task.Task;
import com.cqut.xiji.entity.taskMan.TaskMan;
import com.cqut.xiji.entity.taskTestProject.TaskTestProject;
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
	 * @param ID 交接单ID        
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
				"sample.laborHour as totalLaborHour",
				"sample.specifications",
				"testProject.ID as testProjectID",
				"testProject.nameCn",
				"task.departmentID",
				"case when task.allotState = 0 then '未分配' "
						+ "when task.allotState = 1 then '已分配'"
						+ " when task.allotState = 2 then '分配中' end as state",
				"IFnull( " + " (SELECT group_concat(employee.employeeName) "
						+ " FROM " + " taskMan, employee " + " WHERE "
						+ "	taskMan.taskID = task.ID "
						+ "	AND taskMan.detector = employee.ID " + " ORDER BY "
						+ "	taskMan.ID),'无'" + " ) AS detector",
				"IFnull(employee_1.employeeName,'无') as custodian",
				"CASE WHEN task.type = 0 THEN '检测' WHEN task.type = 1 THEN '校准' END AS type",
				"IFnull(taskman.laborHour, '?') as laborHour"
		};

		String joinEntity = " left join receiptlist on receiptlist.ID = task.receiptlistID "
				+ " left join sample on task.sampleID = sample.ID "
				+ " left join tasktestproject on task.ID = tasktestproject.taskID "
				+ " left join testProject ON taskTestProject.testProjectID = testProject.ID "
				+ " left join taskman on task.ID = taskman.taskID "
				+ " left join employee as employee_1 on task.custodian = employee_1.ID ";

		String condition = "1 = 1 and task.receiptlistID = '" + ID + "' and receiptlist.receiptlistType = 0";

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
				if(judgeAssignlaborHour(taskID)){
					task.setAllotstate(1);
				}else{
					task.setAllotstate(2);
				}
				entityDao.updatePropByID(task, taskID);
				
				String receiptlistID = task.getReceiptlistID(); // 得到交接单ID
				System.out.println("交接单ID为：" + receiptlistID);
				Receiptlist receiptlist = entityDao.getByID(receiptlistID, Receiptlist.class);
				
				// 判断该交接单下的任务是否全部分配
				if (judgeAssignState(taskID) == 1) {
					receiptlist.setAllotState(1);
				} else if (judgeAssignState(taskID) == 2) {
					receiptlist.setAllotState(2);
				}
				entityDao.updatePropByID(receiptlist, receiptlistID); // 更新交接单分配状态

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
			} else if (type == 2) { // 修改
				//  如果修改是检测人员为空，则新增
				if (taskManID == null) {
					// 更新分配状态
					Task task = entityDao.getByID(taskID, Task.class);
					if(judgeAssignlaborHour(taskID)){
						task.setAllotstate(1);
					}else{
						task.setAllotstate(2);
					}
					entityDao.updatePropByID(task, taskID);
					
					String receiptlistID = task.getReceiptlistID(); // 得到交接单ID
					System.out.println("交接单ID为：" + receiptlistID);
					Receiptlist receiptlist = entityDao.getByID(receiptlistID, Receiptlist.class);
					
					// 判断该交接单下的任务是否全部分配
					if (judgeAssignState(taskID) == 1) {
						receiptlist.setAllotState(1);
					} else if (judgeAssignState(taskID) == 2) {
						receiptlist.setAllotState(2);
					}
					entityDao.updatePropByID(receiptlist, receiptlistID); // 更新交接单分配状态

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
	
	public boolean judgeAssignlaborHour(String taskID)
	{
		String condition = " taskID = '" + taskID + "' ";
		return baseEntityDao.getCountByCondition(condition, "taskID", "taskman") > 0 ? true : false;
	}
	
	/**
	 * 
	 * features or effect
	 * @author cyb
	 * @date 2017年5月16日 下午9:22:41
	 * @param ID
	 * @return
	 */
	// 判断该交接单是否分配完全
	public int judgeAssignState(String ID) {
		Task task = entityDao.getByID(ID, Task.class);
		String receiptlistID = task.getReceiptlistID(); // 得到交接单ID
		
		// 获取所有任务的分配状态
		String[] properties = new String[] {
				"task.ID",
				"task.allotState"
		};

		String condition = "1 = 1 and task.receiptlistID = '" + receiptlistID + "'";

		List<Map<String, Object>> result = originalSearchForeign(properties, getBaseEntityName(), null, null, condition, false);
		int len = result.size();
		int allotNum = 0; // 已分配的任务数
		
		// 判断是否全部为已分配
		for (int i = 0; i < len; i++) {
			Map<String, Object> map = result.get(i);
			if ((int)map.get("allotState") == 1) {
				allotNum++;
			}
		}
		
		System.out.println("allotNum:" + allotNum);
		
		if (allotNum == 0) { // 未分配
			return 0;
		} else if (allotNum == len) { // 分配完成
			return 2;
		} else {
			return 1; // 分配中 
		}
	}
	
	/**
	 * features or effect
	 * @author cyb
	 * @date 2017年5月16日 下午9:22:41
	 * @param ID
	 * @return
	 */
	public void addMessage(String[] IDS, String taskID) {
		Task task = entityDao.getByID(taskID, Task.class);
		Sample sample = entityDao.getByID(task.getSampleID(), Sample.class);
		
		String content;
		if (sample != null) {
			content = sample.getSampleName() + "需要检测!"; // 消息记录内容
		} else {
			String[] properties = {
					"task.ID",
					"group_contact(testProject.nameCn) as name"
			};
			
			String condition = "left join taskTestProject on task.ID = taskTestProject.taskID "
					+ " left join testProject on testProject.ID = taskTestProject.testProjectID "
					+ " and task.ID = '" + taskID + "' "
					+ " group by task.ID ";
			
			List<Map<String, Object>> list = originalSearchForeign(properties, getBaseEntityName(), null, null, condition, false);

			content = list.get(0).get("name") + "需要检测!"; // 消息记录内容
		}
		
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
			entityDao.save(messageNotices[i]);
		}
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
				+ " left join tasktestproject on task.ID = tasktestproject.taskID "
				+ " left join testProject ON tasktestproject.testProjectID = testProject.ID ";

		String condition = " task.receiptlistID = '" + ID + "' ";

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
				"task.departmentID",
				"case when task.allotState = 0 then '未分配' "
						+ "when task.allotState = 1 then '已分配' end as state",
				"if(employee_2.employeeName is null,'无',employee_2.employeeName) as detector",
				"if(employee_1.employeeName is null,'无',employee_1.employeeName) as custodian" };

		String joinEntity = " left join sample on task.sampleID = sample.ID "
				+ " left join tasktestproject on task.ID = tasktestproject.taskID " 
				+ " left join testProject ON tasktestproject.testProjectID = testProject.ID " 
				+ " left join employee as employee_1 on task.custodian = employee_1.ID "
				+ " left join taskMan on taskMan.taskID = task.ID "
				+ " left join employee as employee_2 on taskMan.detector = employee_2.ID ";

		String condition = " task.ID = '" + ID + "' ";

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
	public Map<String, Object> getTaskWithPaging(int limit, int offset,
			String order, String sort, String receiptlistCode,
			String testProjectName, String sampleName, String beginTime,
			String endTime, String testProcess, String uploader) {
		int index = limit;
		int pageNum = offset / limit;
		String tableName = " ( "
				+ " SELECT "
				+ "b.ID AS ID,"
				+ "b.startTime AS startTime,"
				+ "b.completeTime AS completeTime,"
				+ "b.detectstate AS detectstate,"
				+ "b.receiptlistCode AS receiptlistCode,"
				+ "b.levelTwo AS levelTwo,"
				+ "b.sampleName AS sampleName,"
				+ "b.detecotorID AS detecotorID,"
				+ "b.detector AS detector,"
				+ "b.testProjectName AS testProjectName,"
				+ "employee.employeeName AS custodian"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "a.ID AS ID,"
				+ "a.custodian AS custodian,"
				+ "a.startTime AS startTime,"
				+ "a.completeTime AS completeTime,"
				+ "a.detectstate AS detectstate,"
				+ "a.receiptlistCode AS receiptlistCode,"
				+ "a.levelTwo AS levelTwo,"
				+ "a.sampleName AS sampleName,"
				+ "a.detector AS detecotorID,"
				+ " IFNULL( "
				+ " ( "
				+ " SELECT "
				+ "group_concat(employee.employeeName)"
				+ " FROM "
				+ "taskMan,"
				+ "employee"
				+ " WHERE "
				+ "taskMan.taskID = a.ID"
				+ " AND taskMan.detector = employee.ID "
				+ " ORDER BY "
				+ " taskMan.ID "
				+ "),'无' "
				+ " ) AS detector, "
				+ " IFNULL( "
				+ " ( "
				+ " SELECT "
				+ "group_concat(DISTINCT("
				+ " IF (testproject.nameEn IS NULL,testproject.nameCn,"
				+ " CONCAT(testproject.nameCn,'(',testproject.nameEn,')' "
				+ " ) "
				+ " ) "
				+ " ) "
				+ " ) "
				+ " FROM "
				+ "tasktestproject,"
				+ "testproject"
				+ " WHERE"
				+ " tasktestproject.taskID = a.ID "
				+ " AND tasktestproject.testProjectID = testproject.ID "
				+ " ), '无' "
				+ " ) AS testProjectName "
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "task.ID AS ID,"
				+ "task.custodian AS custodian,"
				+ "task.startTime AS startTime,"
				+ "task.completeTime AS completeTime,"
				+ "task.detectstate AS detectstate,"
				+ "task.levelTwo AS levelTwo,"
				+ "receiptlist.receiptlistCode AS receiptlistCode,"
				+ "sample.sampleName AS sampleName,"
				+ "taskman.detector AS detector"
				+ " FROM "
				+ " task "
				+ " LEFT JOIN taskman ON task.ID = taskman.taskID "
				+ " LEFT JOIN receiptlist ON task.receiptlistID = receiptlist.ID "
				+ " LEFT JOIN sample ON task.sampleID = sample.ID "
				+ " ) AS a "
				+ " LEFT JOIN employee ON a.detector = employee.ID "
				+ " ) AS b "
				+ " LEFT JOIN employee ON b.custodian = employee.ID "
				+ " ) AS c ";
		String[] properties = new String[] {
				"c.ID AS ID",
				"DATE_FORMAT(startTime,'%Y-%m-%d %H:%i:%s') AS startTime",
				"DATE_FORMAT(completeTime,'%Y-%m-%d %H:%i:%s') AS completeTime",
				"IF (c.detectstate = 0,'无报告',IF (c.detectstate = 1,'未提交',IF (c.detectstate = 2,'二审核中',IF (c.detectstate = 3,'二审未通过',IF (c.detectstate = 4,'三审核中',IF (c.detectstate = 5,'三审未通过','审核通过')))))) AS detectstate",
				"c.receiptlistCode AS receiptlistCode",
				"c.sampleName AS sampleName", "c.detector AS detecotor",
				"c.custodian AS custodian",
				"c.testProjectName AS testProjectName",
				"employee.employeeName AS levelTwo" };
		String joinEntity = " LEFT JOIN employee ON c.levelTwo = employee.ID ";
		String condition = " 1 = 1 AND c.detecotorID ='" + uploader + "'";

		if (receiptlistCode != null && !receiptlistCode.isEmpty()) {
			condition += " and receiptlistCode like '%" + receiptlistCode
					+ "%'";
		}
		if (testProjectName != null && !testProjectName.isEmpty()) {
			condition += " and testProjectName like '%" + testProjectName
					+ "%'";
		}
		if (sampleName != null && !sampleName.isEmpty()) {
			condition += " and sampleName like '%" + sampleName + "%'";
		}
		if (beginTime != null && !beginTime.isEmpty()) {
			condition += " and startTime >'" + beginTime + "'";
		}
		if (endTime != null && !endTime.isEmpty()) {
			condition += " and completeTime <'" + endTime + "'";
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
		int count = entityDao.searchForeign(properties, tableName, joinEntity,
				null, condition).size();
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
			filteConditon = " WHERE task.ID = '" + taskID + "'";
		}
		String tableName = " ( " + " SELECT " + "sample.ID AS sampleID,"
				+ "sample.factoryCode AS factoryCode,"
				+ "sample.sampleName AS sampleName,"
				+ "sample.specifications AS specifications,"
				+ "task.detectstate AS detectstate," + " IFNULL( " + " ( "
				+ " SELECT " + "group_concat(" + " IF ( "
				+ "standard.standardName IS NULL," + "'无',"
				+ "standard.standardName" + " ) " + " ) " + " FROM "
				+ "tasktestproject," + "standard" + " WHERE "
				+ " tasktestproject.taskID = '"
				+ taskID
				+ "'"
				+ " AND tasktestproject.testStandard = standard.ID "
				+ " ), "
				+ "'无'"
				+ " ) AS standardName, "
				+ " IFNULL("
				+ " ( "
				+ " SELECT "
				+ "group_concat(DISTINCT("
				+ " IF ( "
				+ "testproject.nameEn IS NULL,"
				+ "testproject.nameCn,"
				+ " CONCAT(testproject.nameCn,'(',testproject.nameEn,')' "
				+ " ) "
				+ " ) "
				+ " ) "
				+ " ) "
				+ " FROM "
				+ "tasktestproject,"
				+ "testproject"
				+ " WHERE "
				+ "tasktestproject.taskID = '"
				+ taskID
				+ "'"
				+ " AND tasktestproject.testProjectID = testproject.ID "
				+ " ), "
				+ "'无' "
				+ " ) AS testProjectName,"
				+ "task.ID AS ID "
				+ " FROM  "
				+ " task  "
				+ " LEFT JOIN sample ON task.sampleID = sample.ID  "
				+ filteConditon + " ) AS a ";
		String[] properties = new String[] {
				"a.sampleID AS sampleID",
				"a.ID AS ID",
				"a.factoryCode AS factoryCode",
				"a.sampleName AS sampleName",
				"a.specifications AS specifications",
				"IF (a.detectstate = 0,'无报告',IF (a.detectstate = 1,'未提交',IF (a.detectstate = 2,'二审中',IF (a.detectstate=3,'二审未通过',IF (a.detectstate = 4,'三审中',"
						+ "IF (a.detectstate = 5,'三审未通过',IF (a.detectstate = 6,'审核通过','其它'))))))) AS detectstate",
				"a.standardName AS standardName", "a.testProjectName", };
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, null, null, null, null, sort, order,
				index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, null, null,
				null).size();
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
				"employee.permission",
				"employee.employeeCode AS employeeCode",
				"employee.employeeName AS employeeName",
				"IF (employee.sex = 0, '女', '男') AS sex",
				"IF (employee.state = 0, '禁用', '启用') AS employeeState",
				"IF (employee.`level` = 0,'初级',IF (employee.`level` = 1,'中级',IF(employee.`level` = 2,'高级','其它'))) AS employeeLevel",
				"role.`name` AS roleName" };
		String condition = " role.`name` = '报告审核人' AND employee.state = '1'AND employee.permission=1";
		String joinEntity = " LEFT JOIN role ON LOCATE(role.ID, employee.roleID) > 0 ";

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
	public boolean taskDectstateCheck(String taskID){
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
		Object auditPersonIsExist = result.get("levelTwo");
		if (auditPersonIsExist == null) {
			return false;
		} else {
			String auditPerson = auditPersonIsExist.toString();
			if(auditPerson.equals("") || auditPerson.equals(" ")) {
				return false;
			} else {
				String detectstate = result.get("detectstate").toString();
				if (detectstate.equals("1")) {
					tk.setDetectstate(2);
					Date now = new Date(System.currentTimeMillis());
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					try {
						tk.setCompleteTime(dateFormat.parse(dateFormat.format(now)));
					} catch (ParseException e) {
						e.printStackTrace();
					}
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
	public String downReportTemplate(String taskID, String UPLOADER) {
		String tableName = "";
		String[] properties = null;
		String filterConditionString = "";

		// 查询任务对应的检测项目的相关信息
		filterConditionString = " WHERE tasktestproject.taskID = '" + taskID
				+ "'";
		tableName = " ( " + " SELECT " + " tasktestproject.testProjectID "
				+ " FROM " + " tasktestproject" + filterConditionString
				+ " ) AS a";
		properties = new String[] {
				"DISTINCT(a.testProjectID) AS testProjectID",
				"IF ( testproject.nameEn IS NULL, testproject.nameCn, CONCAT( testproject.nameCn, '(', testproject.nameEn, ')' ) ) AS testprojectName",
				"testproject.uncertainty AS uncertainty" };
		String joinEntity = " LEFT JOIN testproject ON a.testProjectID = testproject.ID ";
		List<Map<String, Object>> taskTestprojectData = entityDao
				.searchForeign(properties, tableName, joinEntity, null, null);

		System.out.println("所有检测项目 : " + taskTestprojectData);
		
		
		// 生成报告所需要的公共信息,如:样品编号、规格等
		filterConditionString = " where task.ID = '" + taskID + "'";
		tableName = " ( "
				+ " SELECT "
				+ "b.sampleName AS sampleName,"
				+ "b.specifications AS specifications,"
				+ "b.sampleID AS sampleID,"
				+ "b.sampleFactoryCode AS sampleFactoryCode,"
				+ "contract.ID AS contractID,"
				+ "b.createTime AS createTime,"
				+ "contract.companyID AS companyID"
				+ " FROM "
				+ " ( "
				+ " SELECT "
				+ "a.sampleName AS sampleName,"
				+ "a.specifications AS specifications,"
				+ "a.sampleID AS sampleID,"
				+ "a.sampleFactoryCode AS sampleFactoryCode,"
				+ "receiptlist.contractID AS contractID,"
				+ "receiptlist.accordingDoc AS accordingDoc,"
				+ "DATE_FORMAT(receiptlist.createTime,'%Y-%m-%d %H:%i:%s') AS createTime"
				+ " FROM " + " ( " + " SELECT "
				+ "sample.sampleName AS sampleName,"
				+ "sample.specifications AS specifications,"
				+ "sample.ID AS sampleID,"
				+ "sample.factoryCode AS sampleFactoryCode,"
				+ "task.receiptlistID AS receiptlistID,"
				+ "task.requires AS requires," + "task.ID AS ID" + " FROM "
				+ " task " + " LEFT JOIN sample ON task.sampleID = sample.ID "
				+ filterConditionString + " ) AS a "
				+ " LEFT JOIN receiptlist ON a.receiptlistID = receiptlist.ID "
				+ " ) AS b "
				+ " LEFT JOIN contract ON b.contractID = contract.ID "
				+ " ) AS c ";
		properties = new String[] { "c.sampleName AS sampleName",
				"c.specifications AS specifications", "c.sampleID AS sampleID",
				"c.sampleFactoryCode AS sampleFactoryCode",
				"c.contractID AS contractID", "c.createTime AS createTime",
				"company.companyName AS companyName",
				"company.address AS address" };
		joinEntity = " LEFT JOIN company ON c.companyID = company.ID ";
		List<Map<String, Object>> wordData = entityDao.searchForeign(
				properties, tableName, joinEntity, null, null);

		System.out.println("公共数据   : " + wordData);
		
		// 查询合同依据的技术文件
		String contractID = wordData.get(0).get("contractID").toString();
		
		filterConditionString = " WHERE technical.contractID = '" + contractID + "'";
		
		tableName = "technical";
		
		properties = new String[] {"technical.content AS content"};
		
		List<Map<String, Object>> contractContent = entityDao.searchForeign(
				properties, tableName, null, null, null);
		
		System.out.println("合同依据的技术文件 :" + contractContent);
		
		// 需要填写的标准信息
		List<Map<String, Object>> standardInfo = null; 
		
		// 需要填写设备信息
		List<Map<String, Object>> EquiInfo = null; 
		
		// 找到模版信息
		List<Map<String, Object>> fileInfo = null; 
		
		
		Map<String, Object> fileInfoMap = null; // 每一个模版信息
		
		PropertiesTool pe = new PropertiesTool();
		
		String testProjectID = "";

		String fileInfoID = "";
		
		String filePath = "";
		
		String systemPramPath = "";
		
		String relativePath = "";
		
		String fileName = "";
		
		String memoryName = "";
		
		String cacheFilePath = "";
		
		String standardName = "";

		String testProjectName = "";

		String contractContentText = "";

		Map<String, Object> EquitMap = null;

		Map<String, Object> standardMap = null;

		List<String> list = new ArrayList<String>();
		
		for (Map map : taskTestprojectData) {
			testProjectID = map.get("testProjectID").toString();
			filterConditionString = " WHERE teststandard.testProjectID = '"
					+ testProjectID + "'";
			tableName = " ( "
					+ " SELECT "
					+ "standardequipment.equipmentID AS equipmentID"
					+ " FROM "
					+ " ( "
					+ " SELECT "
					+ "teststandard.standardID "
					+ " FROM "
					+ "teststandard "
					+ filterConditionString
					+ " ) AS a "
					+ " LEFT JOIN standard ON a.standardID = standard.ID "
					+ " LEFT JOIN standardequipment ON a.standardID = standardequipment.standardID "
					+ " ) AS b";
			properties = new String[] {
					"equipment.equipmentName AS equipmentName",
					"equipment.model AS model",
					"equipment.factoryCode AS factoryCode",
					"equipment.credentials AS credentials",
					"DATE_FORMAT(equipment.effectiveTime,'%Y-%m-%d %H:%i:%s') AS effectiveTime"};

			joinEntity = " LEFT JOIN equipment ON b.equipmentID = equipment.ID ";
			
			EquiInfo = entityDao.searchForeign(properties,
					tableName, joinEntity, null, null);
			
			System.out.println("设备信息  : " + EquiInfo);
			
			filterConditionString = " WHERE tasktestproject.testProjectID = '"
					+ testProjectID + "' AND" + " tasktestproject.taskID = '" + taskID + "'";
			tableName = 	" ( "+
					" SELECT "+
					"tasktestproject.testStandard AS standardID "+
				" FROM "+
					"tasktestproject"+
					filterConditionString+
			" ) AS a ";
			properties = new String[]{"CONCAT(standard.standardName,'(',standard.standardCode,')') as standardName"};
			joinEntity = " LEFT JOIN standard ON a.standardID = standard.ID ";
			
			standardInfo = entityDao.searchForeign(properties,
					tableName, joinEntity, null, null);
			
			System.out.println("标准信息 :" + standardInfo);
			
			// 模版信息,暂时写死
			filterConditionString = " fileinformation.ID = '20170713152116338' ";  // 模版暂时写死
			tableName = "fileinformation";
			properties = new String[] { "fileinformation.ID AS ID",
					"fileinformation.path AS path",
					"fileinformation.pathPassword AS pathPassword" };
			fileInfo = entityDao.searchForeign(properties, tableName, null,
					null, filterConditionString);
			if (fileInfo == null) {
				return null;
			} else {
				try {
				    fileInfoMap = fileInfo.get(0);
					if (fileInfoMap == null) {
						return null;
					} else {
						fileInfoID = fileInfoMap.get("ID").toString();
						filePath = fileEncryptservice.decryptPath(fileInfoMap.get("path").toString(), fileInfoMap.get("pathPassword").toString());
						systemPramPath = pe.getSystemPram("filePath") + "\\";
						if (wordData.get(0).get("sampleName") != null) {
							fileName = wordData.get(0).get("sampleName").toString() + "的检测报告" + EntityIDFactory.createId();
						}
					    cacheFilePath = pe.getSystemPram("cacheFilePath") + "\\" + fileName + ".docx";

						fileEncryptservice.decryptFile(systemPramPath + filePath, cacheFilePath,
								fileInfoID);
						
						System.out.println("文件的路径1 ：" + filePath);
						System.out.println("文件的路径2 ：" + cacheFilePath);

						WordProcess wp = new WordProcess(false);
						wp.openDocument(cacheFilePath);
						if (wordData.get(0).get("sampleName") != null)
							wp.replaceText("{样品名称}", wordData.get(0).get("sampleName")
									.toString());
						if (wordData.get(0).get("specifications") != null)
							wp.replaceText("{样品型号}",
									wordData.get(0).get("specifications").toString());
						if (wordData.get(0).get("companyName") != null)
							wp.replaceText("{委托方}", wordData.get(0).get("companyName")
									.toString());
						if (wordData.get(0).get("address") != null)
							wp.replaceText("{委托方地址}", wordData.get(0).get("address")
									.toString());
						if (wordData.get(0).get("createTime") != null)
							wp.replaceText("{接收日期}", wordData.get(0).get("createTime")
									.toString());
						if (map.get("testprojectName") != null) {
						    testProjectName = map.get("testprojectName").toString();
							wp.moveStart();
							wp.replaceAllText("{检测项目名}",testProjectName);
						}
						if (contractContent.size() > 0 && contractContent != null) {
							wp.moveStart();
						    contractContentText = "";
							for (int contractContentIndex = 0, contractContentLen = contractContent.size(); 
									contractContentIndex < contractContentLen; contractContentIndex++) {
								contractContentText += contractContent.get(contractContentIndex).get("content") + "、";
							}
							contractContentText = contractContentText.substring(0,contractContentText.length() - 1);
							wp.replaceText("{合同的依据文件}", contractContentText);
						}

						if (wordData.get(0).get("sampleFactoryCode") != null) {
							wp.replaceText("{样品出厂编号}",
									wordData.get(0).get("sampleFactoryCode").toString());
						}
						if (wordData.get(0).get("sampleID") != null) {
							wp.replaceText("{样品编号}", wordData.get(0).get("sampleID")
									.toString());
							wp.moveStart();
						}
						
						for(int i = 0, len = EquiInfo.size(); i < len; i ++ ) {
							if(EquiInfo.get(i) != null) {
								EquitMap = EquiInfo.get(i) ;
								wp.putTxtToCell(5, i+7, 1, EquitMap.get("equipmentName").toString());
								wp.putTxtToCell(5, i+7, 2, EquitMap.get("model").toString());
								wp.putTxtToCell(5, i+7, 3, EquitMap.get("factoryCode").toString());
								wp.putTxtToCell(5, i+7, 4, EquitMap.get("credentials").toString());
								wp.putTxtToCell(5, i+7, 5, EquitMap.get("effectiveTime").toString());
							
							}
						}
						standardName = "";
						for (int standardIndex = 0, standardLen = standardInfo.size(); 
								standardIndex < standardLen; standardIndex++) {
							if(standardInfo.get(standardIndex) != null) {
								standardMap = standardInfo.get(standardIndex);
								standardName += standardMap.get("standardName").toString() +  "\r";
							}
						}
						
						wp.moveStart();
						wp.replaceText("{检测项目对应的标准}", standardName);
						wp.replaceText("{误差}", map.get("uncertainty").toString());
						wp.save(cacheFilePath);
						wp.close();
						list.add(cacheFilePath);
					}
				 }

				catch (Exception e) {
					return null;
				}
			}
		}
		try {
			String ID = EntityIDFactory.createId();
			fileName =  wordData.get(0).get("sampleName").toString() + "的检测报告" + "_" + ID + ".docx";
			cacheFilePath =  pe.getSystemPram("cacheFilePath") + "\\" + fileName ;
			WordProcess wp = new WordProcess(false);
			wp.comblineDocument(list, cacheFilePath);
			wp.close();
			
			cacheFilePath = pe.getSystemPram("cacheFilePath") + "\\" +fileName;
			relativePath = "报告文件" + "\\" + fileName;
			filePath = pe.getSystemPram("filePath") + "\\" + relativePath;
			
			fileName = wordData.get(0).get("sampleName").toString() + "的检测报告" + ".docx";
			
			// 插入文件表
			FileInformation fi = new FileInformation();
			fi.setID(ID);
			fi.setBelongtoID(taskID);
			fi.setUploaderID(UPLOADER);
			fi.setFileName(fileName);
			System.out.println("文件保存的相对路径是: " + relativePath);
			fi.setPath(relativePath);
			Date now = new Date(System.currentTimeMillis());
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			fi.setUploadTime(dateFormat.parse(dateFormat.format(now)));
			fi.setState(0);
			fi.setType(2);
			baseEntityDao.save(fi);
			
			System.out.println("relativePath :" + relativePath);
			System.out.println("cacheFilePath :" + cacheFilePath);
			
			fileEncryptservice.encryptPath(relativePath, ID);
			fileEncryptservice.encryptFile(cacheFilePath, filePath, ID);
			
			// 保存检测报告数据
			Map<String, Object> receiptlistIDInfo = baseEntityDao.findByID(
					new String[] { "receiptlistID" }, taskID, "ID", "task");
			String receiptlistID = receiptlistIDInfo.get("receiptlistID").toString();
			String testReportID = EntityIDFactory.createId();
			TestReport tr = new TestReport();
			tr.setID(testReportID);
			tr.setReceiptlistID(receiptlistID);
			tr.setTaskID(taskID);
			tr.setVersionNumber("1.0");
			tr.setState(0);
			tr.setFileID(ID);
			tr.setSendState(0);
			baseEntityDao.save(tr);
			
			// 更新任务信息
			Task tk = entityDao.getByID(taskID, Task.class);
			tk.setDetectstate(1);
			tk.setTestReportID(testReportID);
			baseEntityDao.updatePropByID(tk, taskID);
			
			File file = null;
			for (String str : list) {
				file = new File(str);
				if (file.exists()) {
					file.delete();
				}
			}
			return ID + "";
		} catch (Exception e) {
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
		String tableName = "taskTestProject";
		String[] properties = new String[] {
				"task.ID",
				"tasktestproject.taskID",
				"task.receiptlistID",
				"task.taskCode",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				"IF(testProject.nameEn IS  NULL , testProject.nameCn , "
						+ " if ( testProject.nameCn is null ,testProject.nameEn,"
						+ " CONCAT(testProject.nameEn,'(',testProject.nameCn,')') )) as testName ",
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
		
		String joinEntity = "left join task on tasktestproject.taskID = task.ID "
				+ "left join testProject on tasktestproject.testProjectID = testProject.ID "
				+" left join sample on task.sampleID =sample.ID ";
		String condition = "1 = 1 ";
		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null, sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();

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
	
	@Override
	public boolean deleteTaskTestproject(String[] testprojectIDs) {
		return baseEntityDao.deleteEntities(testprojectIDs, "tasktestproject", "testProjectID") > 0 ? true : false;
	}
	
	@Override
	public String checkTaskTypeIsCalibration(String taskID) {
		Map<String, Object> taskTypeInfo = baseEntityDao.findByID(
				new String[] { "type" }, taskID, "ID", "task");
		if (taskTypeInfo != null && taskTypeInfo.size() > 0) {
			String type = taskTypeInfo.get("type").toString();
			if (type.equals("1")) {
				return "true";
			} else {
				return "检测类型的任务不在此界面登记检测项目!";
			}
		} else {
			return "没有找到任务的类型信息!";
		}
	};
	
	@Override
	public List<BootstrapTreeNode> getTestProjectTree() {
		String ID = "";
		List<BootstrapTreeNode> list = new ArrayList<>();
		BootstrapTreeNode nodeName = new BootstrapTreeNode("", "所有检测项目");
		BootstrapTreeNode node = null;
		nodeName.setlevel0("0");
		nodeName.setBackColor("#fff");
		nodeName.setIcon("glyphicon glyphicon-th");
		nodeName.setColor("#238bc8");
		nodeName.setHref("javascript:void(0)");
		String[] testProjectProperties = new String[] { "ID",
				"CONCAT(nameCn, '(', nameEn, ')') AS testprojectName" };
		List<Map<String, Object>> testProjectList = entityDao.findByCondition(
				testProjectProperties, " 1 = 1 order by createTime ", TestProject.class);

		for (Map map : testProjectList) {
			node = new BootstrapTreeNode("", "所有检测项目");
			node.setText((String) map.get("testprojectName"));
			node.setHref("javascript:void(0)");
			ID = (String) map.get("ID");

			
			node.setId(ID);
			nodeName.setChecked(0);
			nodeName.addChilred(node);
		}
		list.add(nodeName);
		return list;
	}
	
	@Override
	public List<BootstrapTreeNode> getStandardByProjectID(String testProjectID,
			String testprojectName) {
		if (testProjectID != null && !testProjectID.equals("") && !testProjectID.equals("null")) {
			List<BootstrapTreeNode> list = new ArrayList<>();
			BootstrapTreeNode nodeName = new BootstrapTreeNode("",
					testprojectName + "的标准");
			BootstrapTreeNode node = null;
			nodeName.setlevel0("0");
			nodeName.setBackColor("#fff");
			nodeName.setIcon("glyphicon glyphicon-th");
			nodeName.setColor("#238bc8");
			nodeName.setHref("javascript:void(0)");
			String[] standarProperties = new String[] {
					"standard.standardName AS standardName",
					"a.standardID AS standardID" };
			String joinEntity = " LEFT JOIN standard ON a.standardID = standard.ID ";
			String condition = " 1=1 ";
			String baseEntity = " ( " + " SELECT DISTINCT "
					+ " (teststandard.standardID) AS standardID " + " FROM "
					+ "teststandard " + " WHERE "
					+ " teststandard.testProjectID = '" + testProjectID + "'"
					+ " ) AS a ";
			List<Map<String, Object>> standardList = entityDao.searchForeign(
					standarProperties, baseEntity, joinEntity, null, condition);

			if (standardList.size() > 0 && standardList != null) {
				for (Map map : standardList) {
					node = new BootstrapTreeNode("", "标准");
					node.setText((String) map.get("standardName"));
					node.setHref("javascript:void(0)");
					node.setId((String) map.get("standardID"));
					nodeName.addChilred(node);
				}
			}
			list.add(nodeName);
			return list;
		} else {
			return null;
		}
	}
	
	@Override
	public boolean registeTestPeojcetAndStandardOfTask(String taskID,
			String testProjectID, String[] standards) {
		String condition = " taskID = '" + taskID + "'" + " AND testProjectID = '"
				+ testProjectID + "'";
		
		baseEntityDao.deleteByCondition(condition, "tasktestproject");

		List<TaskTestProject> list = null;
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss");
		Date now = null;
		int registeSucssCount = 0;
		for (int i = 0, len = standards.length; i < len; i++) {
			list = entityDao.getByCondition(" taskID='" + taskID
					+ "' AND testProjectID='" + testProjectID + "'"
					+ " AND testStandard='" + standards[i] + "'",
					TaskTestProject.class);
			if (list != null && list.size() > 0) {
				continue;
			} else {

				TaskTestProject ttp = new TaskTestProject();
				ttp.setID(EntityIDFactory.createId());
				ttp.setTaskID(taskID);
				ttp.setTestProjectID(testProjectID);
				now = new Date(System.currentTimeMillis());
				try {
					ttp.setCheckInTime(dateFormat.parse(dateFormat.format(now)));
				} catch (ParseException e) {
					return false;
				}
				ttp.setTestStandard(standards[i]);
				if (entityDao.save(ttp) > 0) {
					registeSucssCount++;
				}
			}
		}
		if (registeSucssCount == standards.length) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public List<Map<String, Object>> getRegistedStandard(String taskID,
			String testProjectID) {
		String tableName = "tasktestproject";
		String[] properties = new String[] { "testStandard" };
		String condition = " tasktestproject.taskID = '" + taskID + "'"
				+ " AND testProjectID = '" + testProjectID + "'";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, null, condition);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getTestprojectOfTask(String taskID) {
		String tableName = "tasktestproject";
		String[] properties = new String[] { "testProjectID" };
		String condition = " tasktestproject.taskID = '" + taskID + "'";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, null, condition);
		return result;
	}
	
	@Override
	public String addOriginalDataImag(String taskID, String fileID,
			String mark, String originalName, String originaldataCode,
			String suggest, String codeOne, String codeTwo,
			String originalRemarks){
		String condition = " type = '3'";
		List<Map<String, Object>> fileInfo = entityDao.searchWithpaging(
				new String[] { "fileinformation.path AS path"},
				"fileinformation", null, null, condition, null,
				"fileinformation.uploadTime", "DESC", 1, 0);
		if(fileInfo.size() > 0 && fileInfo != null) {
			String tableNmae = "fileinformation";
			String[] properties = new String[] {
					"fileinformation.filePassword",
					"fileinformation.pathPassword", "fileinformation.path" };
		    condition = "fileinformation.ID = '" + fileID + "'";
			List<Map<String, Object>> result = entityDao.searchForeign(properties, tableNmae, null, null, condition);
			PropertiesTool pe = new PropertiesTool();
			String path = result.get(0).get("path").toString();
			String passWord = result.get(0).get("pathPassword").toString();
			String fileTruePath = pe.getSystemPram("filePath") + "\\" + fileEncryptservice.decryptPath(path, passWord);
			
			File file = new File(fileTruePath);
			if(!file.exists()) {
				return "报告真实文件已被删除";
			}
			
			int length = fileTruePath.length();
			int x = fileTruePath.lastIndexOf("\\");
			x++;

			String filedisplay = fileTruePath.substring(x, length);// 文件名

			String cachePath = pe.getSystemPram("cacheFilePath") + "\\" + filedisplay;

			System.out.println("cachePath  :" + cachePath);

			System.out.println("fileTruePath :" + fileTruePath);
			
			fileEncryptservice.decryptFile(fileTruePath, cachePath, fileID);
			
			String imgPath = pe.getSystemPram("imgPath") + "\\" + fileInfo.get(0).get("path");
		
			try {
				WordProcess wp = new WordProcess(false);
				wp.openDocument(cachePath);
				wp.find("{" + mark + "}");
				wp.insertImage(imgPath);
				wp.save(cachePath);
				wp.close();
				fileEncryptservice.encryptFile(cachePath, fileTruePath, fileID); // 将文件重新加密
				
			
				Originaldata od = new Originaldata();
				od.setID(EntityIDFactory.createId());
				od.setTaskID(taskID);
				od.setOriginaldataCode(originaldataCode);
				od.setFileID(fileID);
				od.setRemarks(originalRemarks);
				od.setSuggest(suggest);
				od.setName(originalName);
				od.setCodeOne(codeOne);
				od.setCodeTwo(codeTwo);
				baseEntityDao.save(od);
				
				return "true";
			} catch (Exception e) {
				return "程序运行出错";
			}
		}
		return "false";
	}
}
