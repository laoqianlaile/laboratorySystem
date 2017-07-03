package com.cqut.xiji.service.receiptlist;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import javax.annotation.Resource;
import javax.enterprise.inject.New;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.junit.Test;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.contractFineItem.ContractFineItem;
import com.cqut.xiji.entity.department.Department;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.message.Message;
import com.cqut.xiji.entity.messageNotice.MessageNotice;
import com.cqut.xiji.entity.project.Project;
import com.cqut.xiji.entity.receiptlist.Receiptlist;
import com.cqut.xiji.entity.role.Role;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.task.Task;
import com.cqut.xiji.entity.taskTestProject.TaskTestProject;
import com.cqut.xiji.entity.template.Template;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.service.fileEncrypt.DES;
import com.cqut.xiji.service.fileEncrypt.FileEncryptService;
import com.cqut.xiji.service.fileEncrypt.IFileEncryptService;
import com.cqut.xiji.service.fileType.IFileTypeService;
import com.cqut.xiji.tool.util.CalendarTool;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.PropertiesTool;
import com.cqut.xiji.tool.word.WordProcess;

@Service
public class ReceiptlistService extends SearchService implements
		IReceiptlistService {
	@Resource(name = "entityDao")
	EntityDao entityDao;
	@Resource(name = "searchDao")
	SearchDao searchDao;
	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;
	@Resource(name="fileEncryptService")
	IFileEncryptService fileEncryptService;
	
	

	@Override
	public String getBaseEntityName() {
		return "receiptlist";
	}

	@Override
	public String getBasePrimaryKey() {
		return "receiptlist.ID";
	}

	/**
	 * 
	 * @description 任务分配模块查询所有交接单信息
	 * @author chenyubo
	 * @created 2016年9月24日 上午10:35:44
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 * @see com.cqut.xiji.service.receiptlist.IReceiptlistService#getReceiptlistWithPaging(int,
	 *      int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getReceiptlistWithPagingInTaskAssign(int limit,
			int offset, String sort, String order, String receiptlistCode,
			String contractCode, String companyName, String linkMan,
			String acceptSampleTime_start, String acceptSampleTime_end,
			int state, int assignState) {
		int index = limit;
		int pageNum = offset / limit;
		String tableName = "receiptlist";
		String[] properties = new String[] {
				"receiptlist.ID",
				"contract.contractCode",
				"receiptlist.receiptlistCode",
				"company.companyName",
				"receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%d') as createTime",
				"date_format(receiptlist.completeTime,'%Y-%m-%d') as completeTime",
				"employee.employeeName",
				"case when receiptlist.state = 0 then '未检测' "
						+ "when receiptlist.state = 1 then '检测中' "
						+ "when receiptlist.state = 2 then '检测完成' "
						+ "when receiptlist.state = 3 then '异常终止' end as state",
				"case when receiptlist.allotState = 0 then '未分配'"
						+ "when receiptlist.allotState = 1 then '分配中' "
						+ "when receiptlist.allotState = 2 then '分配完成' end as assignState " };
		String joinEntity = " left join contract on receiptlist.contractID = contract.ID "
				+ " left join company on contract.companyID = company.ID "
				+ " left join employee on receiptlist.employeeID = employee.ID ";
		String condition = "";
				
		if (receiptlistCode != null && !receiptlistCode.equals("")) {
			condition += " and receiptlist.receiptlistCode like '%"
					+ receiptlistCode + "%'";
		}
		if (contractCode != null && !contractCode.equals("")) {
			condition += " and contract.contractCode like '%" + contractCode
					+ "%'";
		}
		if (companyName != null && !companyName.equals("")) {
			condition += " and company.companyName like '%" + companyName
					+ "%'";
		}
		if (linkMan != null && !linkMan.equals("")) {
			condition += " and receiptlist.linkMan like '%" + linkMan + "%'";
		}
		if (acceptSampleTime_start != null
				&& !acceptSampleTime_start.equals("")
				&& acceptSampleTime_end != null
				&& !acceptSampleTime_end.equals("")) {
			condition += " and receiptlist.createTime between '"
					+ acceptSampleTime_start + "' and '" + acceptSampleTime_end
					+ "'";
		}
		if (state != -1) {
			condition += " and receiptlist.state =" + state;
		}
		if (assignState != -1) {
			if (assignState == 2) {// 已分配
				condition += " and receiptlist.isEditSample = 2";
			} else {// 已分配
				condition += " and (receiptlist.isEditSample = 0 or receiptlist.isEditSample = 1)";
			}
		}
		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null, sort,
				order, index, pageNum);

		int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}

	/**
	 * 
	 * 初始化交接单数据 --以合同为主表（存在合同有而交接单没有）
	 * 
	 * @author wzj
	 * @date 2016年10月22日 上午10:41:48
	 * 
	 */
	@Override
	public Map<String, Object> getReceiptlistWithPaging(String reCode,
			String coCode, String companyName, String reType, String linkMan,
			String startTime, String endTime, String state, int limit,
			int offset, String order, String sort) {
		int pageNum = limit;
		int pageIndex = offset / limit; // 分页查询数据限制
		System.out.println("limit : " + limit + "  " + offset);
		String[] properties = new String[] { // 查询的字段
		"a.ID", "project.ID AS proID", "a.contractCode as coCode",
				"a.isEditSample", "a.coID", "a.companyID AS comID", "a.reCode",
				"a.coState", "company.companyName", "a.linkMan", "a.startTime",
				"a.endTime", "a.employeeName", "a.linkPhone", "a.reType",
				"a.state" };
		// 连接关系表和一些删选条件
		String joinEntity = " "
				+ "( SELECT receiptlist.ID,"
				+ "contract.contractCode,"
				+ "contract.ID AS coID,"
				+ "contract.state AS coState,"
				+ "receiptlist.receiptlistCode AS reCode,"
				+ "contract.companyID,"
				+ "receiptlist.linkMan,"
				+ "receiptlist.isEditSample,"
				+ "receiptlist.linkPhone,"
				+ "date_format(receiptlist.createTime,'%Y-%m-%d') AS startTime,"
				+ "date_format(receiptlist.completeTime,'%Y-%m-%d') AS endTime,"
				+ "employee.employeeName,"
				+ "IF (receiptlist.state = 0,'未检测',IF (receiptlist.state = 1,'检测中',IF (receiptlist.state = 2,'检测完成',"
				+ "IF (receiptlist.state = 3,'异常终止','无')))) AS state,"
				+ " IF (receiptlist.receiptlistType = 0,'接受',IF (receiptlist.receiptlistType = 1,'退还','无' "
				+ " )) AS reType FROM contract LEFT JOIN  receiptlist ON receiptlist.contractID = contract.ID "
				+ " LEFT JOIN employee ON receiptlist.employeeID = employee.ID "
				+ " WHERE 1 = 1 ";
		// 异常数据判断 并加上搜索条件
		if (reCode != null && !reCode.equals("")) {
			joinEntity += " and receiptlistCode  like '%" + reCode + "%'  ";
		}
		// 异常数据判断 并加上搜索条件
		if (coCode != null && !coCode.equals("")) {
			joinEntity += " and  contract.contractCode like '%" + coCode
					+ "%'  ";
		}
		// 异常数据判断 并加上搜索条件
		if (reType != null && !reType.equals("")) {
			if (!reType.equals("2")) // 2--所有类型的交接单数据
				joinEntity += " and receiptlistType = " + reType + "  ";
		}
		// 异常数据判断 并加上搜索条件
		if (linkMan != null && !linkMan.equals("")) {
			joinEntity += " and linkMan like '%" + linkMan + "%'  ";
		}
		// 异常数据判断 并加上搜索条件
		if (state != null && !state.equals("")) {
			if (!state.equals("4")) // 4---看所有的交接单
				joinEntity += " and receiptlist.state = " + state + "  ";
		}
		// 时间的三种方式查询
		if (startTime != null && endTime != null && !startTime.equals("")
				&& !endTime.equals("")) { // 中间
			startTime.replaceAll(" ", "");
			endTime.replaceAll(" ", "");
			joinEntity += " and startTime between  '" + startTime + "' and '"
					+ endTime + "'  ";
		} else if ((startTime != null && !startTime.equals(""))
				&& (endTime == null || endTime.equals(""))) { // 从什么时候起
			startTime.replaceAll(" ", "");
			joinEntity += " and startTime >  '" + startTime + "'  ";
		} else if ((startTime == null || startTime.equals(""))
				&& (endTime != null && !endTime.equals(""))) { // 到什么时候至
			endTime.replaceAll(" ", "");
			joinEntity += " and startTime < '" + endTime + "'  ";
		}
		joinEntity += " ) AS a LEFT JOIN company ON company.ID = a.companyID "
				+ "  LEFT JOIN project on project.contractID = a.coID  and  project.state != 5";
		// 搜索条件 condition
		String condition = " 1 = 1    ";
		if (companyName != null && !companyName.equals("")) {
			condition += " and company.companyName like '%" + companyName
					+ "%' ";
		}
	
		// 获取数据
		List<Map<String, Object>> list = entityDao.searchWithpaging(properties,
				null, joinEntity, null, condition, null, " startTime DESC,ID ", " desc ", pageNum,
				pageIndex);
		// 获取总的记录数
		int count = entityDao.searchForeign(properties, null, joinEntity, null,
				condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}
	@Override
	public Map<String, Object> getsecretWithPaging(String reCode,
			String coCode, String companyName, String reType, String linkMan,
			String startTime, String endTime, String classifiedLevel, int limit,
			int offset, String order, String sort) {
		int pageNum = limit;
		int pageIndex = offset / limit; // 分页查询数据限制
		System.out.println("limit : " + limit + "  " + offset);
		String[] properties = new String[] { // 查询的字段
		"a.ID", "project.ID AS proID", "a.contractCode as coCode",
				"a.isEditSample", "a.coID", "a.companyID AS comID", "a.reCode",
				"a.coState", "company.companyName", "a.linkMan", "a.startTime",
				"a.endTime", "a.employeeName", "a.linkPhone",
				"a.classifiedLevel" };
		// 连接关系表和一些删选条件
		String joinEntity = " "
				+ "( SELECT receiptlist.ID,"
				+ "contract.contractCode,"
				+ "contract.ID AS coID,"
				+ "contract.state AS coState,"
				+ "receiptlist.receiptlistCode AS reCode,"
				+ "contract.companyID,"
				+ "receiptlist.linkMan,"
				+ "receiptlist.isEditSample,"
				+ "receiptlist.linkPhone,"
				+ "date_format(receiptlist.createTime,'%Y-%m-%d') AS startTime,"
				+ "date_format(receiptlist.completeTime,'%Y-%m-%d') AS endTime,"
				+ "employee.employeeName,"
				+ "IF (contract.classifiedLevel = 0,'秘密',IF (contract.classifiedLevel = 1,'机密',IF (contract.classifiedLevel = 2,'绝密',"
				+ "IF (contract.classifiedLevel = 3,'无密级','无')))) AS classifiedLevel FROM contract LEFT JOIN  receiptlist ON receiptlist.contractID = contract.ID "
				+ " LEFT JOIN employee ON receiptlist.employeeID = employee.ID "
				+ " WHERE 1 = 1 ";
		// 异常数据判断 并加上搜索条件
		if (reCode != null && !reCode.equals("")) {
			joinEntity += " and receiptlistCode  like '%" + reCode + "%'  ";
		}
		// 异常数据判断 并加上搜索条件
		if (coCode != null && !coCode.equals("")) {
			joinEntity += " and  contract.contractCode like '%" + coCode
					+ "%'  ";
		}
		// 异常数据判断 并加上搜索条件
		if (reType != null && !reType.equals("")) {
			if (!reType.equals("2")) // 2--所有类型的交接单数据
				joinEntity += " and receiptlistType = " + reType + "  ";
		}
		// 异常数据判断 并加上搜索条件
		if (linkMan != null && !linkMan.equals("")) {
			joinEntity += " and linkMan like '%" + linkMan + "%'  ";
		}
		// 异常数据判断 并加上搜classifiedLevel索条件
		if (classifiedLevel != null && !classifiedLevel.equals("")) {
			if (!classifiedLevel.equals("4")) // 4---看所有的交接单
				joinEntity += " and contract.classifiedLevel = " + classifiedLevel + "  ";
		}
		// 时间的三种方式查询
		if (startTime != null && endTime != null && !startTime.equals("")
				&& !endTime.equals("")) { // 中间
			startTime.replaceAll(" ", "");
			endTime.replaceAll(" ", "");
			joinEntity += " and startTime between  '" + startTime + "' and '"
					+ endTime + "'  ";
		} else if ((startTime != null && !startTime.equals(""))
				&& (endTime == null || endTime.equals(""))) { // 从什么时候起
			startTime.replaceAll(" ", "");
			joinEntity += " and startTime >  '" + startTime + "'  ";
		} else if ((startTime == null || startTime.equals(""))
				&& (endTime != null && !endTime.equals(""))) { // 到什么时候至
			endTime.replaceAll(" ", "");
			joinEntity += " and startTime < '" + endTime + "'  ";
		}
		joinEntity += " ) AS a LEFT JOIN company ON company.ID = a.companyID "
				+ "  LEFT JOIN project on project.contractID = a.coID  and  project.state != 5";
		// 搜索条件 condition
		String condition = " 1 = 1    ";
		if (companyName != null && !companyName.equals("")) {
			condition += " and company.companyName like '%" + companyName
					+ "%' ";
		}
		// 获取数据
		List<Map<String, Object>> list = entityDao.searchWithpaging(properties,
				null, joinEntity, null, condition, null, sort, order, pageNum,
				pageIndex);
		// 获取总的记录数
		int count = entityDao.searchForeign(properties, null, joinEntity, null,
				condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}


	public List<Map<String, Object>> getReceiptlistInfoInTaskAssign(String ID) {
		String tableName = "receiptlist";
		String[] properties = new String[] {
				"receiptlist.receiptlistCode",
				"company.companyName",
				"receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%d') as createTime",
				"date_format(contract.endTime,'%Y-%m-%d') as endTime",
				"receiptlist.linkPhone",
				"company.address",
				"contract.isClassified",
				"case when contract.classifiedLevel = 0 then '秘密' "
						+ "when contract.classifiedLevel = 1 then '机密' "
						+ "when contract.classifiedLevel = 2 then '绝密' end as classifiedLevel",
				"receiptlist.accordingDoc", "employee.employeeName", };
		String[] foreignEntitys = new String[] { "contract", "company",
				"employee" };
		String condition = "receiptlist.ID = " + ID
				+ " and receiptlist.contractID = contract.ID "
				+ " and contract.companyID = company.ID "
				+ " and receiptlist.employeeID = employee.ID";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, foreignEntitys, condition);
		return result;
	}

	/**
	 * 
	 * 通过交接单ID查询任务
	 * 
	 * @author wzj
	 * @date 2016年11月18日 上午8:58:54
	 * 
	 */
	@Override
	public Map<String, Object> getTasklistByReID(String reID, int limit,
			int offset, String order, String sort) {
		// TODO Auto-generated method stub
		int pageNum = limit;
		int pageIndex = offset / limit; // 分页查询数据限制
		System.out.println("limit : " + limit + "  " + offset);
		if (reID == null || reID.equals(""))
			return null;
		else {
			String[] properties = new String[] { // 查询字段
					"a.ID",
					"a.reID",
					"a.askFor",
					"a.sampleID",
					"a.startTime",
					"a.saveState",
					"sample.sampleName",
					"sample.factoryCode",
					"sample.specifications as sampleStyle",
					"sample.qrcode",
					"sample.unit",
					"department.departmentName",
					"testproject.ID AS testProjectID",
					"IF(testproject.nameCn IS  NULL , testproject.nameEn , "
							+ " if ( testproject.nameEn is null ,testproject.nameCn,"
							+ " CONCAT(testproject.nameCn,'(',testproject.nameEn,')') )) as testProjectName " };
			// 关联条件
			String joinEntity = "  "
					+ " ( SELECT "
					+ "task.ID,"
					+ "task.receiptlistID as reID,"
					+ "task.saveState as saveState,"
					+ "task.sampleID,"
					+ "task.departmentID,"
					+ " date_format(task.startTime,'%Y-%m-%d %H:%i:%s') as startTime , "
					+ " task.requires as askFor "
					+ " from task where  task.receiptlistID ='"
					+ reID
					+ "' ) as a "
					+ " left join sample on a.sampleID = sample.ID "
					+ "  LEFT JOIN tasktestproject ON tasktestproject.taskID = a.ID "
					+"  LEFT JOIN testproject ON testproject.ID = tasktestproject.testProjectID"
			        +" LEFT JOIN department ON department.ID = a.departmentID";
			
			List<Map<String, Object>> list = entityDao.searchWithpaging(
					properties, null, joinEntity, null, null, null,
					" factoryCode ", "  desc ,  a.startTime desc ", pageNum,
					pageIndex);
			int count = entityDao.searchForeign(properties, null, joinEntity,
					null, null).size();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", count);
			map.put("rows", list);
			return map;
		}
	}

	/**
	 * 
	 * 获取交接单文件通过交接单ID
	 * 
	 * @author wzj
	 * @date 2016年11月18日 上午8:59:30
	 * 
	 */
	@Override
	public Map<String, Object> getRelateFiletByReID(String reID, int limit,
			int offset, String order, String sort) {
		// TODO Auto-generated method stub
		int pageNum = limit;
		int pageIndex = offset / limit; // 分页查询数据限制
		if (reID == null || reID.equals(""))
			return null;
		String[] properties = new String[] { "fileinformation.ID", "fileName",
				"remarks", "employee.employeeName as uploadName",
				"date_format(fileinformation.uploadTime,'%Y-%m-%d %H:%i:%s') as uploadTime	" };
		String baseEntity = " fileinformation "; // 主表
		String joinEntity = " LEFT JOIN employee on fileinformation.uploaderID = employee.ID "; // 关联条件
		String condition = " fileinformation.belongtoID = '" + reID
				+ "' and fileinformation.state = 0"; // 查询条件
		List<Map<String, Object>> list = entityDao.searchWithpaging(properties,
				baseEntity, joinEntity, null, condition, null, " uploadTime ",
				"desc", pageNum, pageIndex);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity,
				null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}

	/**
	 * 
	 * 新增或者编辑任务
	 * 
	 * @author wzj
	 * @date 2016年11月22日 上午1:58:08
	 * 
	 */
	@Override
	public String addTaskAndSampleWithEdit(String taskID, String sampleID,
			String sampleCode, String sampleName, String sampleStyle,
			String testProjects,  String type,String departmentID,String unit, String require, String reID,
			String state) {
		System.out.println(departmentID);
		if(type == null || type.equals("")){
			type = "0";
		}else{
			type = "1";
		}
		if (sampleID == null || sampleID.equals("")) {
			// 样品还不存在
			Sample sample = new Sample();
			sample.setID(EntityIDFactory.createId());
			sample.setFactoryCode(sampleCode);
			sample.setSampleName(sampleName);
			sample.setCreateTime(new Date());
			sample.setSpecifications(sampleStyle);
			sample.setState(0);
			sample.setUnit(unit);
			sample.setQrcode(EntityIDFactory.createId());
			sampleID = sample.getID();
			if (entityDao.save(sample) != 1)
				return "false";
		} else {
			Sample sample = entityDao.getByID(sampleID, Sample.class); // 有样品更新数据
			sample.setFactoryCode(sampleCode);
			sample.setSampleName(sampleName);
			sample.setSpecifications(sampleStyle);
			sample.setUnit(unit);
			if (entityDao.updatePropByID(sample, sampleID) != 1)
				return "false";
		}
		// 不管是不是新增还是编辑
		if (state.equals("edit")) // 先删除后重新添加
			if (entityDao.deleteByID(taskID, Task.class) != 1)
				return "false";
		// 新增任务--选择了检测项目
		if (testProjects != null && !testProjects.equals("")) {
			String[] testProjectIDs = testProjects.replaceAll(" ", "")
					.split(",");
			int counter = 0;
			for (int i = 0; i < testProjectIDs.length; i++) {
				Task task = new Task();
				task.setID(EntityIDFactory.createId());
				task.setReceiptlistID(reID);
				task.setRequires(require);
				task.setSampleID(sampleID);
				task.setStartTime(new Date());
				task.setCompleteTime(new Date());
				task.setType(Integer.parseInt(type));
				task.setDepartmentID(departmentID);
				task.setSaveState(0);
				SimpleDateFormat format = new SimpleDateFormat("yy-MM-dd");
				format.format(new Date());
				task.setTaskCode(sampleCode + ":" + ""
						+ format.format(new Date()) + ":"
						+ (int) (Math.random() * 100));
				task.setAllotstate(0);
				task.setDetectstate(0);
				System.out.println("任务检测项目：" + i + "  " + testProjectIDs[i]);
				TaskTestProject taskTestProject = 	new TaskTestProject();
				taskTestProject.setID(EntityIDFactory.createId());
				taskTestProject.setTaskID(task.getID());
				taskTestProject.setTestProjectID(testProjectIDs[i]);
				taskTestProject.setCheckInTime(new Date());
				entityDao.save(taskTestProject);
				counter += entityDao.save(task);
			}
			
			//变动了任务：交接单文件需要重新生成
			Receiptlist receiptlist  = entityDao.getByID(reID, Receiptlist.class);
			receiptlist.setReFile("");
            entityDao.updatePropByID(receiptlist, reID);	
            
			//推送消息
            Department department  = entityDao.getByID(departmentID, Department.class);
        	String manage_MAN = department.getEmployeeID();
			for (int j = 0; j < testProjectIDs.length; j++) {
				TestProject testProject  = entityDao.getByID(testProjectIDs[j], TestProject.class);
				if(manage_MAN != null && ! manage_MAN.equals("")){
					Message message = new Message();
					message.setID(EntityIDFactory.createId());
					message.setCreateTime(new Date());
					message.setContent(sampleName+"需要用："+testProject.getNameCn()+"("+testProject.getNameEn()+")---检测");
				    MessageNotice messageNotice = new MessageNotice();
				    messageNotice.setState(0);
				    messageNotice.setID(EntityIDFactory.createId());
				    messageNotice.setEmployeeID(manage_MAN);
				}
			}
			
			
			return counter == testProjectIDs.length ? "true" : "false";
		} else { // 新增任务--没有选择了检测项目
			Task task = new Task();
			task.setID(EntityIDFactory.createId());
			task.setReceiptlistID(reID);
			task.setSampleID(sampleID);
			task.setStartTime(new Date());
			task.setRequires(require);
			task.setAllotstate(0);
			task.setType(Integer.parseInt(type));
			task.setDepartmentID(departmentID);
			task.setSaveState(0);
			task.setDetectstate(0);
			return entityDao.save(task) == 1 ? "true" : "false";
		}
		
		
	}

	/**
	 * 
	 * 通过TaskID删除任务
	 * 
	 * @author wzj
	 * @date 2016年11月22日 上午1:49:49
	 * 
	 */
	@Override
	public String deleteTaskByID(String taskID) {
		if (taskID == null || taskID.equals(""))
			return "false";
		int retur = entityDao.deleteByID(taskID, Task.class);
		return retur == 1 ? "true" : "fasle";
	}

	/**
	 * 
	 * 保存和提交交接单
	 * 
	 * @author wzj
	 * @date 2016年11月22日 上午1:57:43
	 * 
	 */
	@Override
	public String saveSubmitReceipt(String reID, String saveState,
			String addState, String companyName, String address,
			String linkMan, String startTime, String endTime, String linkPhone,
			String accordingDoc,String reCode, String coID ,String comID) {
		// TODO Auto-generated method stub
		Contract contract = null;
		
		if (addState == null || addState.equals("") || addState.equals("no") ||  addState.equals("edit") ) {
			contract = entityDao.getByID(coID, Contract.class); // 即使是编辑进来的addState也是No
		/*	company = new Company();
			company.setID(EntityIDFactory.createId());
			company.setCompanyName(companyName);
			company.setAddress(address);
			entityDao.save(company);*/
			contract.setCompanyID(comID);
			entityDao.updatePropByID(contract, coID);
		}
		Receiptlist receiptlist = entityDao.getByID(reID, Receiptlist.class);
		receiptlist.setLinkMan(linkMan);
		receiptlist.setContractID(coID);
		receiptlist.setLinkPhone(linkPhone);
		receiptlist.setCreateTime(StrToDate(startTime));
		receiptlist.setCompleteTime(StrToDate(endTime));
		receiptlist.setAccordingDoc(accordingDoc);
		receiptlist.setReceiptlistCode(reCode);
		receiptlist.setState(0);
		receiptlist.setReceiptlistType(0);
		if (saveState == null || saveState.equals("") || saveState.equals("save") ){ // 保存交接单
			receiptlist.setIsEditSample(1);
		} else { // 提交交接单
			receiptlist.setIsEditSample(0);
			receiptlist.setState(1);
			// 推送消息--给科室主管
			List<Role> listRole = entityDao.getByCondition(" name='科室主管' ",
					Role.class);
			if (listRole != null && listRole.size() > 0) {
				System.out.println("推送的科室主管角色ID为：" + listRole.toString());
				// 产生消息
				Message message = new Message();
				message.setID(EntityIDFactory.createId());
				message.setCreateTime(new Date());
				message.setContent("交接单编号：" + receiptlist.getReceiptlistCode()
						+ "需要查看");
				// 查询角色对应的人
				List<Employee> listemployee = entityDao.getByCondition(
						" roleID like '%" + listRole.get(0).getID().trim()
								+ "%' ", Employee.class);
				if (listemployee != null && listemployee.size() > 0) {
					for (int i = 0; i < listemployee.size(); i++) {
						MessageNotice messageNotice = new MessageNotice();
						messageNotice.setMessageID(message.getID());
						messageNotice.setID(EntityIDFactory.createId());
						messageNotice
								.setEmployeeID(listemployee.get(i).getID());
						messageNotice.setState(0);
						entityDao.save(messageNotice);
					}

				}
			}
		}
		//将任务改为保存状态--是正常退出页面的
		  String sql = "update task set task.saveState = 1 where task.receiptlistID ='"+reID+"' and  ( task.saveState = 0  or task.saveState is null )";
		  entityDao.runSql(sql);
		return entityDao.updatePropByID(receiptlist, reID) == 1 ? "true"
				: "false";
	}
	public static Date StrToDate(String str) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		try {
			date = format.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	// 新增交接单--各种类型
	@Override
	public Map<String, Object> addReceiptList(HttpSession session, String coID,
			String proID, String state, HttpServletRequest request) {
		// String employeeID = (String) request.getSession().getAttribute("ID");
		
		Map<String, Object> map = new HashMap<String, Object>();
		String employeeID = session.getAttribute("EMPLOYEEID").toString();
		// request.getSession().getAttribute("employeeid");
		Receiptlist receiptlist = new Receiptlist();
		receiptlist.setID(EntityIDFactory.createId());
		map.put("reID", receiptlist.getID());
		receiptlist.setCreateTime(new Date());
		receiptlist.setEmployeeID(employeeID);
		receiptlist.setState(0);
		receiptlist.setIsEditSample(1);
		receiptlist.setReceiptlistType(0);
		map.put("coID", coID);
		if (state.equals("yes")) { // 有合同新增交接单-接受
			//查询以前交接单号
			String recode = getCurrentRecode(coID,receiptlist.getID(),proID);
			receiptlist.setReceiptlistCode(recode);
			receiptlist.setContractID(coID);
			receiptlist.setProjectID(proID);
		} else if (state.equals("no")) { // 无合同新增交接单 --新增交接单和项目-接受
			
			 String yearAfterTwo  = CalendarTool.getYearAfterTwo();
			
			Contract contract_n = new Contract();
			contract_n.setID(EntityIDFactory.createId());
			contract_n.setContractCode("SCC-IMSTEC-479-"+yearAfterTwo+"-0000-TEC");
			contract_n.setContractName("暂无具体合同信息，先生成的委托单");
			contract_n.setOrderType(1);
			contract_n.setClassifiedLevel(3);
			contract_n.setIsClassified(0);
			contract_n.setType(0);
			contract_n.setOrderType(1);
			contract_n.setIsInput(1);
			contract_n.setState(0);
			receiptlist.setReceiptlistCode("SCC-IMSTEC-479-"+yearAfterTwo+"-0000-TEC-001");
			map.put("coID", contract_n.getID());
			map.put("coCode", contract_n.getContractCode());
			Project project = new Project();
			project.setID(EntityIDFactory.createId());
			project.setContractID(contract_n.getID());
			project.setState(0);
			project.setCreateTime(new Date());
			project.setRemarks("这是先接受的样品，后拟定合同的");
			receiptlist.setProjectID(project.getID());
			map.put("proID", project.getID());
			entityDao.save(project);
			entityDao.save(contract_n);
		} else { // 有合同新增交接单-退还
			receiptlist.setReceiptlistCode(getCurrentRecode(coID,receiptlist.getID(),proID));
			receiptlist.setContractID(coID);
			receiptlist.setProjectID(proID);
			receiptlist.setReceiptlistType(1);
		}
		map.put("reCode", receiptlist.getReceiptlistCode());
		entityDao.save(receiptlist);
		return map;
	}
   /**
    * 
    * 获取当前的交接单编码根据合同ID
    * @author wzj
    * @date 2017年6月30日 下午3:02:49
    * @param coID
    * @return
    */
	private String getCurrentRecode(String coID,String reID,String proID) {
		// TODO Auto-generated method stub
		Contract contract = entityDao.getByID(coID, Contract.class);
		String  new_recode = null;
		String condition = " receiptlist.contractID = '"+coID+"' ORDER BY receiptlistCode DESC LIMIT 0 , 1 "; 
		
    	if(contract.getType() == 1){ //是校准合同自动录入样品--包括退还和接受类型
			inputTaskByCoID(coID,reID,proID);
		}
		List<Receiptlist> receiptlist_list =  entityDao.getByCondition(condition, Receiptlist.class);
		if(receiptlist_list != null && receiptlist_list.size() > 0){
			Receiptlist  receiptlist = receiptlist_list.get(0);
			String recodeString = receiptlist.getReceiptlistCode();
			 String valueString = String.valueOf(Integer.parseInt(recodeString.substring(recodeString.length()-3,recodeString.length()))+1);
		    switch (valueString.length()) {
			case 0:
				valueString = "-001";
				break;
			case 1:
				valueString = "-00"+valueString;
				break;
			case 2:
				valueString = "-0"+valueString;
				break;
			case 3:
				valueString = "-"+valueString;
				break;
			default:
				valueString = "-"+valueString;
				break;
			}
		    new_recode = contract.getContractCode()+valueString;
		}else{
			 new_recode = contract.getContractCode()+"-001";
		}
		
		return new_recode;
	}
    @Override
	public void inputTaskByCoID(String coID, String reID, String proID) {
	// TODO Auto-generated method stub
    	String[] properties = new String[]{
    			"contractfineitem.sampleID "
    	};
    	String condition = " contractfineitem.contractID = '"+coID+"' ";
    	List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, ContractFineItem.class);
    	for (Map<String, Object> map : list) {
			    Task task = new Task();
			    task.setID(EntityIDFactory.createId());
			    task.setReceiptlistID(reID);
			    task.setSampleID((String)map.get("sampleID"));
			    task.setAllotstate(0);
			    task.setDetectstate(0);
			    task.setSaveState(0);
			    task.setType(1);
			    task.setProjectID(proID);
			    task.setContractID(coID);
			    entityDao.save(task);    
		}
	
}



	/**
	 * 
	 * 通过交接单IDH获取交接单一部分的信息 --编辑接受交接单的页面调用
	 * 
	 * @author wzj
	 * @date 2016年12月22日 下午10:18:35
	 * 
	 */
	@Override
	public Map<String, Object> getReceiptByReID(String reID) {
		// TODO Auto-generated method stub
		if (reID == null || reID.equals("")) // 传输错误返回
			return null;
		String[] properties = new String[] { // 选择字段
		                   "date_format(receiptlist.createTime,'%Y-%m-%d') as startTime",
				           "receiptlist.linkMan", 
				           "receiptlist.linkPhone",
				           "receiptlist.accordingDoc",
			               "date_format(receiptlist.completeTime,'%Y-%m-%d') as endTime" };
		Map<String, Object> map = entityDao.findByID(properties, reID,
				Receiptlist.class);
		return map;
	}

	/**
	 * @description 查看交接单信息
	 * @author hzz
	 * @date 2016年 10月20日 晚上 20:55:11
	 */
	@Override
	public List<Map<String, Object>> getReceiptlistInformationInView(String ID) {
		String tableName = "receiptlist";
		String[] properties = new String[] {
				// "receiptlist.ID",
				"contract.contractCode",
				"receiptlist.receiptlistCode",
				"company.companyName",
				"receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%d') as createTime",
				"date_format(receiptlist.completeTime,'%Y-%m-%d') as completeTime",
				"receiptlist.linkPhone",
				"company.address",
				"case when contract.classifiedLevel = 0 then '秘密' "
						+ "when contract.classifiedLevel = 1 then '机密' "
						+ "when contract.classifiedLevel = 2 then '绝密' end as classifiedLevel",
				"receiptlist.accordingDoc", };
		String[] foreignEntitys = new String[] { "contract", "company", };
		String condition = "receiptlist.ID = " + ID
				+ " and receiptlist.contractID = contract.ID "
				+ " and contract.companyID = company.ID ";

		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, foreignEntitys, condition);

		return result;
	}

	/**
	 * @description 查看退还交接单信息
	 * @author hzz
	 * @date 2016年 10月21日 晚上 19:30:12
	 */
	@Override
	public List<Map<String, Object>> getReceiptlistInforInReturn(String ID) {
		String tableName = "receiptlist";
		String[] properties = new String[] {
				// "receiptlist.ID",
				"contract.contractCode", "receiptlist.receiptlistCode",
				"company.companyName", "receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%d') as createTime",
				"receiptlist.linkPhone", };
		String[] foreignEntitys = new String[] { "contract", "company", };
		String condition = "receiptlist.ID = " + ID
				+ " and receiptlist.contractID = contract.ID "
				+ " and contract.companyID = company.ID ";

		List<Map<String, Object>> result = entityDao.searchForeign(properties,
				tableName, null, foreignEntitys, condition);

		return result;
	}

	/**
	 * @description 更新退还交接单信息
	 * @author hzz
	 * @date 2016年11月15日 下午 14:40:07
	 */
	@Override
	public String updReceiptlistInforInReturn(String ID, String linkMan,
			String createTime, String linkPhone) {
		if (ID == null || ID.equals("")) {
			return "false";
		}
		Receiptlist receiptlist = entityDao.getByID(ID, Receiptlist.class);
		if (receiptlist == null)
			return "false";
		receiptlist.setLinkMan(linkMan);
		receiptlist.setLinkPhone(linkPhone);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date createTime1 = null;
		try {
			createTime1 = sdf.parse(createTime);
			System.out.println(createTime1);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if (createTime1 != null) {
			receiptlist.setCreateTime(createTime1);
		}

		int receiptlistType = 1;
		receiptlist.setReceiptlistType(receiptlistType);
		return entityDao.updatePropByID(receiptlist, ID) == 1 ? "true"
				: "false";
	}

	/**
	 * 
	 * 删除交接单
	 * 
	 * @author wzj
	 * @date 2016年12月22日 下午10:28:05
	 * 
	 */
	@Override
	public String delReceiptlist(String reID) {
		System.out.println(reID);
		int count = 0;
		if(reID == null || reID.equals("")){
			return "true";
		}
		String[] idsStrings = reID.split(",");
		for (int i = 0; i < idsStrings.length; i++) {
			count += entityDao.deleteByID(idsStrings[i], Receiptlist.class);
		}
		return count  == idsStrings.length ? "true"
				: "false";
	}

	/**
	 * @description 新增退还交接单
	 * @author hzz
	 * @date 2016年11月30日 早上 10:28:05
	 */
	@Override
	public Map<String, Object> addReceiptListInReturn() {
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<String, Object>();
		Receiptlist receiptlist = new Receiptlist();
		receiptlist.setID(EntityIDFactory.createId());
		map.put("reID", receiptlist.getID());
		receiptlist.setReceiptlistCode("XJHJ-226-14-1058-TET");
		map.put("reCode", receiptlist.getReceiptlistCode());
		receiptlist.setCreateTime(new Date());
		receiptlist.setState(0);
		receiptlist.setIsEditSample(1);
		receiptlist.setReceiptlistType(0);
		entityDao.save(receiptlist);
		return map;
	}

	/**
	 * @description 更新退还交接单
	 * @author hzz
	 * @date 2016年11月30日 早上11:03:50
	 */
	@Override
	public String updRelistInforInReturn(String reID, String conID,
			String linkMan, String createTime, String linkPhone) {
		// TODO Auto-generated method stub
		if (reID == null || reID.equals("")) {
			return "false";
		}
		Receiptlist receiptlist = entityDao.getByID(reID, Receiptlist.class);
		if (receiptlist == null)
			return "false";
		receiptlist.setLinkMan(linkMan);
		receiptlist.setLinkPhone(linkPhone);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date createTime1 = null;
		try {
			createTime1 = sdf.parse(createTime);
			System.out.println(createTime1);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if (createTime1 != null) {
			receiptlist.setCreateTime(createTime1);
		}

		int receiptlistType = 1;
		receiptlist.setReceiptlistType(receiptlistType);
		receiptlist.setContractID(conID);

		return entityDao.updatePropByID(receiptlist, reID) == 1 ? "true"
				: "false";
	}

	/**
	 * 
	 * 样品管理员桌面--合同交接单信息
	 * 
	 * @author wzj
	 * @date 2016年12月27日 下午5:43:19
	 * 
	 */
	@Override
	public Map<String, Object> getReceiptlistAll(int limit, int offset,
			String sort, String order) {
		int pageNum = limit;
		int pageIndex = offset / limit; // 分页查询数据限制

		String[] properties = new String[] {

				"contract.ID AS coID",
				"contract.contractCode as coCode",
				"contract.contractName as cName",
				"receiptlist.ID as reID",
				"receiptlist.receiptlistCode AS reCode ",
				"receiptlist.allotState",
				"company.ID as comID",
				"project.ID as proID",
				"IF ( receiptlist.receiptlistType = 0,'接受',IF (receiptlist.receiptlistType = 1,'退还','接受')) AS reType ",
				"contract.state AS cState",
				"IF ( receiptlist.state IS NULL, '无交接单', "
						+ "IF ( receiptlist.state = 0 , '未检测', "
						+ "IF ( receiptlist.state = 1, '检测中', "
						+ "IF ( receiptlist.state = 2, '检测完成', '异常终止' )))) AS reState " };

		String baseEntity = " contract "; // 主表
		String joinEntity = " LEFT JOIN receiptlist ON contract.ID = receiptlist.contractID "
		+"  LEFT JOIN company ON contract.companyID = company.ID  "
		+"  LEFT JOIN project ON project.contractID = contract.ID "; // 关联条件
		String condition = null; // 查询条件
		List<Map<String, Object>> list = entityDao.searchWithpaging(properties,
				baseEntity, joinEntity, null, condition, null,
				" contract.signTime  ", " DESC ", pageNum, pageIndex);
		int count = entityDao.searchForeign(properties, baseEntity, joinEntity,
				null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
		return map;
	}

	@Override
	public List<Map<String, Object>> getReceiptlistInfo(String contractID) {
		String baseEntity = "receiptlist";

		String[] properties = { "receiptlist.ID", "receiptlist.receiptlistCode" };
		String joinEntity = "LEFT JOIN contract on contract.ID = receiptlist.contractID ";
		String condition = " 1 = 1 and receiptlist.contractID = " + contractID;
		List<Map<String, Object>> result = originalSearchForeign(properties,
				baseEntity, joinEntity, null, condition, false);

		return result;
	}
	
	@Test
	public void decr(){
		
	/*	DES des = new DES("nm1qllWz8W0i711ihjjFhqYWVrBUKugqDn1rKQNxb1h1gi7gzyEAzKGO");
	try{	des.decryptFile("F:\\upload\\file\\项目文件\\交接单文件\\交接单文件20170429155626989.docx", "F:\\upload\\file\\项目文件\\交接单文件\\交接单文件20170429155626989jiemi.docx");
	}
	catch(Exception ec){
		ec.printStackTrace();
	}*/
	//des3.decryptFile("E:\\liabrary\\XIJI\\testFileSources\\交接单模板加密.docx", "E:\\liabrary\\XIJI\\testFileSources\\交接单模板解密.docx"); //解密
	      
	}
	
	/**
	 * 
	 * 初始化交接单文件
	 * @author wzj
	 * @date 2017年3月20日 下午9:48:03
	 *
	 */
	@SuppressWarnings("static-access")
	@Override
	public String initReceiptFile( String reID ,String coID,String proID ) {
		// TODO Auto-generated method stub
		
		String fileID = "";
		String refileModule = getReFileModule();
		String reModulePath = "";
		String saveBasePath = "";
		String savePath = "";
		String cacheBasePathString = "";
		String reFileName = "";
		PropertiesTool pt = new PropertiesTool();
		if(refileModule == null || refileModule.equals("")){
			 return "false";
		}
		else{
			cacheBasePathString =  pt.getSystemPram("cacheFilePath") ;
			saveBasePath = pt.getSystemPram("filePath");
			reModulePath =saveBasePath+"\\"+fileEncryptService.getFileDecryPath(refileModule);
		}
		if (reID != null && !reID.equals("")) {
             
			try {
				
				
				//解密文件才能操作
				String cacheID = EntityIDFactory.createId();
				String cacheFilePath1 = cacheBasePathString+"\\"+cacheID+".docx";
				System.out.println("huangcong"+cacheID);
				File dectoryName = new File(cacheBasePathString);
				if(!dectoryName.exists()){
					dectoryName.mkdirs();
				}
				dectoryName = null;
				System.out.println("模板解密文件："+cacheFilePath1);
				System.out.println("模板文件："+reModulePath);
				fileEncryptService.decryptFile(reModulePath, cacheFilePath1, refileModule); //这个应该是模板文件的ID
			   
			
				
			
				// 获取甲方公司信息
				String[] properties = new String[] { 
						"companyName", 
						"linkman",
						"mobilephone",
						"a.isClassified",
						"a.classifiedLevel",
						"address", 
						"fax", 
						"emailbox" 
						};
				String baseEntity = " (  SELECT * FROM contract WHERE contract.ID = '"
						+ coID
						+ "'  "
						+ " ) AS a LEFT JOIN company on 	company.ID = a.companyID ";

				List<Map<String, Object>> companyInfo = originalSearchForeign(
						properties, baseEntity, null, null, null, false);
			
				
				//获取样品信息
				String[] properties1 = new String[] { 
						"sample.sampleName ", 
						"sample.factoryCode as sampleCode",
						"sample.specifications as style",
						"GROUP_CONCAT( testProject.nameCn,'-',testproject.nameEn) as testProjectName "
						};
			String baseEntity1 = " ( SELECT "
					+ " task.ID , "
					+ " task.sampleID "
			        + " FROM task WHERE "
			        + " task.receiptlistID = '"+reID+"' ) a "
			        +" LEFT JOIN sample ON sample.ID = a.sampleID "
			        +" LEFT JOIN tasktestproject on  tasktestproject.taskID = a.ID "
			        +" LEFT JOIN testproject on testProject.ID = tasktestproject.testProjectID "
			        +" GROUP BY a.ID ";
			     
			List<Map<String, Object>> sampleInfo = originalSearchForeign(
					properties1, baseEntity1, null, null, null, false);
			
			WordProcess wordProcess = new WordProcess(false);
			wordProcess.openDocument(cacheFilePath1);
			
			if (companyInfo != null && companyInfo.size() > 0) {
				   String companyName = (String)companyInfo.get(0).get("companyName") ;
				    String linkman = (String)companyInfo.get(0).get("linkman") ;
				    String mobilephone = (String)companyInfo.get(0).get("mobilephone") ;
				    String address = (String)companyInfo.get(0).get("address") ;
				    int classifiedLevel = (int)companyInfo.get(0).get("classifiedLevel") ;
				    String mijiString = "";
				  
                    	switch (classifiedLevel) {
						case 0:
							 mijiString = "秘密";
							break;
						case 1:
							 mijiString = "机密";
							break;
						case 2:
							 mijiString = "绝密";
							break;
                       case 3:
                    	   mijiString = " ";
                    	   break;
						default:
							  mijiString = " ";
							break;
						}
                    	
 
				 wordProcess.replaceText("{companyName-x}", companyName  == null ? " " :  companyName);
                 wordProcess.replaceText("{address-x}",  address  == null ? " " :  address);
                 wordProcess.replaceText("{classifiedLevel-x}",  mijiString  == null ? " " :  mijiString);
              
                
			}
			else{
				
			}
			
			int counter =  sampleInfo.size();
			for (int i = 0; i < counter; i++) {
				wordProcess.addTableRow(1, 5);
				Map<String, Object> map = sampleInfo.get(i);
				wordProcess.putTxtToCell(1, 5, 1, (counter-i)+"");
				wordProcess.putTxtToCell(1, 5, 2, map.get("sampleName").toString());
				wordProcess.putTxtToCell(1, 5, 3, map.get("style").toString());
				wordProcess.putTxtToCell(1, 5, 4, map.get("sampleCode").toString());
				String testProjectName = (String) map.get("testProjectName");
				wordProcess.putTxtToCell(1, 5, 5, testProjectName == null ? " ": testProjectName);  //检测项目
				wordProcess.putTxtToCell(1, 5, 7, "1");
				
			}
			//填充个人公司信息
		   /**
		    * 从配置取出数据
		    */
		
		/*	String ourCompanyName = pt.getSystemPram("ourCompanyName") ;
			String ourLinkCompanyName = pt.getSystemPram("ourLinkCompanyName") ;
			String ourCompanyAddress = pt.getSystemPram("ourCompanyAddress") ;
			String ourAccount = pt.getSystemPram("ourAccount") ;
			String ourAccountProxy = pt.getSystemPram("ourAccountProxy") ;
			String ourInvoiceType = pt.getSystemPram("ourInvoiceType");
			String ourFinancePhone = pt.getSystemPram("ourFinancePhone") ;
			String ourEmaile = pt.getSystemPram("ourEmaile") ;
			String ourFax = pt.getSystemPram("ourFax") ;
			String ourLinkMan = pt.getSystemPram("ourLinkMan") ;
			String ourLinkPhone = pt.getSystemPram("ourLinkPhone") ;*/
			
		/*	wordProcess.replaceText("{ourCompanyName}", ourCompanyName);
			wordProcess.replaceText("{ourAccount}", ourAccount);
			wordProcess.replaceText("{ourAccountProxy}", ourAccountProxy);
			wordProcess.replaceText("{ourInvoiceType}", ourInvoiceType);
			wordProcess.replaceText("{ourFinancePhone}", ourFinancePhone);
			wordProcess.replaceText("{ourLinkCompanyName}", ourLinkCompanyName);
			wordProcess.replaceText("{ourEmaile}", ourEmaile);
			wordProcess.replaceText("{ourLinkPhone}", ourLinkPhone);
			wordProcess.replaceText("{ourFax}", ourFax);
			wordProcess.replaceText("{ourLinkMan}", ourLinkMan);
			wordProcess.moveStart();
			wordProcess.replaceAllText("{ourCompanyAddress}", ourCompanyAddress);*/
			
			
			/*
			 * 2016年4月28日  插入时间
			 */
			SimpleDateFormat myFmt=new SimpleDateFormat("yyyy/MM/dd HH:mm");
	        
			/*
			 * 填出交接单编码
			 */
			Receiptlist receiptlist = entityDao.getByID(reID, Receiptlist.class);
			if(receiptlist != null){
				
			
				wordProcess.moveStart();
				wordProcess.replaceAllText("{reCode}", receiptlist.getReceiptlistCode());
				String linkman = receiptlist.getLinkMan();
	            wordProcess.replaceText("{linkman-x}",  linkman == null ? " " :  linkman);
	        	wordProcess.replaceAllText("{startTime}", myFmt.format(receiptlist.getCreateTime()));
	        	wordProcess.moveStart();
				wordProcess.replaceText("{endTime}", myFmt.format(receiptlist.getCompleteTime()));
				wordProcess.moveStart();
				String mobilephone = receiptlist.getLinkPhone();
			    wordProcess.replaceText("{mobilephone-x}",  mobilephone  == null ? " " :  mobilephone);
				wordProcess.moveStart();
				wordProcess.replaceText("{requires-x}", receiptlist.getAccordingDoc());			    
			}
			if(reFileName == null || reFileName.equals("")){
				reFileName = "交接单文件";
			}
			wordProcess.save(cacheFilePath1);  //先保存到缓冲文件区才能生成
			wordProcess.close();
			
			reFileName += EntityIDFactory.createId()+".docx";
			savePath = saveBasePath+"\\项目文件\\"+proID+"\\交接单文件\\"+reFileName;
		
			
			File dectoryName1 = new File(saveBasePath+"\\项目文件\\"+proID+"\\交接单文件\\");
			if(!dectoryName1.exists()){
				dectoryName1.mkdirs();
			} 
			dectoryName1 = null ;
			
			/* //生成文件信息并加密文件和路径
			 FileEncryptService  fileEncryptService = new FileEncryptService();*/
			
			 FileInformation fileInformation = new FileInformation();
			 fileInformation.setBelongtoID(reID);
			 fileInformation.setID(EntityIDFactory.createId());
			 fileInformation.setPath("项目文件\\"+proID+"\\交接单文件\\"+reFileName);
			 fileInformation.setUploaderID("系统生成");
			 fileInformation.setRemarks("系统生成");
			 fileInformation.setFileName(reFileName);
			 fileInformation.setUploadTime(new Date());
			 fileInformation.setState(0);
			 fileInformation.setType(2);
			 entityDao.save(fileInformation);
			 
			 fileEncryptService.encryptPath(fileInformation.getPath(), fileInformation.getID());
			 fileEncryptService.encryptFile(cacheFilePath1, savePath, fileInformation.getID());
		
			 
			 
			 //更新交接单--文件ID
			 fileID = fileInformation.getID();
		    receiptlist.setReFile(fileInformation.getID());
		    entityDao.updatePropByID(receiptlist, reID);
			
			 
		    
			} catch (Exception e) {
				e.printStackTrace();
			}
			return fileID;
		} else
			return null;
	}

	private String getReFileModule() {
		// TODO Auto-generated method stub
		/*PropertiesTool pt = new PropertiesTool();
		@SuppressWarnings("static-access")
		String filePath = pt.getSystemPram("filePath");*/
		String templateConditionnString  = " templateType = 2 and  state = 2 order by  createTime desc limit 0,1";
		List<Template> list = entityDao.getByCondition(templateConditionnString, Template.class);
		if(list != null && list.size() > 0){
			 Template template = list.get(0);
			 String fileID = template.getFileID() ;
			 if(fileID == null || fileID.equals("")){
				 return null;
			 }
			 else return fileID;
		
		}
		else return null;  //还没有模板
	}

	@Override
	public String downReceiptlist(String reID, String coID, String proID) {
		// TODO Auto-generated method stub
		//找交接单文件的fileID
		if(reID !=null && !reID.equals("")){
			 Receiptlist receiptlist = entityDao.getByID(reID, Receiptlist.class);
			 String reFileID = receiptlist.getReFile() ;
			 if(reFileID != null && !reFileID.equals("")){
				 return reFileID;
			 }else{
				 return initReceiptFile(reID,coID, proID);
			 }
		
		}
		else 
		{
			return "false";
		}
	}

	@Override
	public String deleteNewReceipt(String reID, String coID, String proID,String state) {
		// TODO Auto-generated method stub
		if(state != null && state.equals("no"))  //只有无合同新增的才删除合同和虚拟项目
		  {
		
		    entityDao.deleteByID(coID, Contract.class);
		    entityDao.deleteByID(proID, Project.class);
		  }
		   entityDao.deleteByID(reID, Receiptlist.class);
		  //删除任务
		  String taskCondition = " task.receiptlistID ='"+reID+"' and  ( task.saveState = 0  or task.saveState  is null )";
		  entityDao.deleteByCondition(taskCondition, Task.class);
		  //删除文件
		/*  String fileCondition = " belongtoID ='"+reID+"' ";
		  entityDao.deleteByCondition(fileCondition, FileInformation.class);*/
		return "true";
	}
}