package com.cqut.xiji.service.contractFineItem;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.contractFineItem.ContractFineItem;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class ContractFineItemService extends SearchService implements IContractFineItemService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "contractFineItem";
	}

	@Override
	public String getBasePrimaryKey() {
		return "contractFineItem.ID";
	}

	//*******************************************************************************************************
	// 个人任务统计
	
	/**
	 * @description 个人任务统计下查询初始化表格
	 * @author chenyubo
	 * @created 2016年10月21日 下午9:01:12
	 * @param ID
	 * @param type
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@Override
	public Map<String, Object> getPersonalTaskStatistical(String ID, int type, String testProjectID,int limit,int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
			"task.ID",
			"sample.sampleName",
			"testProject.nameCn",
			"testProject.nameEn",
			"case when task.type = 0 then testproject.laborHour when task.type = 1 then sample.laborHour end as laborHour",
			"case when task.type = 0 then '检测' when task.type = 1 then '校准' end as type"
		};
		
		String baseEntity = "task";
		
		String joinEntity = " left join sample on task.sampleID = sample.ID "
				+ " left join tasktestproject on task.ID = tasktestproject.taskID "
				+ " left join testproject on tasktestproject.testProjectID = testproject.ID "
				+ " left join taskman on task.ID = taskman.taskID "
				+ " left join employee on taskman.detector = employee.ID ";
		
		String condition = " task.detectstate = 6 "
				+ " and employee.ID = '" + ID + "' ";
		
		if(type != -1){
			condition += " and task.type = " + type + " ";
		}
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, null, sort, order, index, pageNum);
		int count = result.size();
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
//	/**
//	 * 
//	 * @description 任务统计下查询所有该检测人员检测的检测项目
//	 * @author chenyubo
//	 * @created 2016年10月22日 上午10:38:38
//	 * @param ID
//	 * @return
//	 */
//	@Override
//	public List<Map<String, Object>> getAllTestProjectInTaskStatistical(String ID) {
//		
//		String[] properties = new String[]{
//			"testProject.ID",
//			"testProject.nameCn",
//		};
//		
//		String baseEntity = "taskMan";
//		
//		String joinEntity = "left join task on taskMan.taskID = task.ID "
//				+ " left join testProject on task.testProjectID = testProject.ID "
//				+ " left join contractFineItem on contractFineItem.testProjectID = testProject.ID";
//		
//		String condition = "taskMan.detector = '" + ID + "' group by testProject.ID";
//		
//		List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
//		
//		return result;
//	}
//	
//	/**
//	 * 
//	 * @description 任务统计下查看检测项目详情
//	 * @author chenyubo
//	 * @created 2016年10月22日 下午7:35:11
//	 * @param ID
//	 * @param contractCode
//	 * @param receiptlistCode
//	 * @param companyName
//	 * @param startTime
//	 * @param endTime
//	 * @param sampleName
//	 * @param limit
//	 * @param offset
//	 * @param order
//	 * @param sort
//	 * @return
//	 */
//	@Override
//	public Map<String, Object> getTaskStatisticalDetail(String ID,String contractCode,String receiptlistCode,String companyName,String startTime,String endTime,String sampleName,int limit, int offset, String order, String sort) {
//		int index = limit;
//		int pageNum = offset/limit;
//		
//		String[] properties = new String[]{
//				"distinct(contract.contractCode)",
//				"receiptlist.receiptlistCode",
//				"company.companyName",
//				"receiptlist.linkMan",
//				"date_format(receiptlist.createTime,'%Y-%m-%e') as createTime",
//				"sample.factoryCode",
//				"sample.sampleName",
//				"sample.specifications",
//				" IFnull( "+
//				" ( "+
//					" SELECT "+
//						" group_concat(employee.employeeName) "+
//					" FROM "+
//						" taskMan, "+
//						" employee "+
//					" WHERE "+
//						" taskMan.taskID = task.ID "+
//					" AND taskMan.detector = employee.ID "+
//					" ORDER BY "+
//						" taskMan.ID "+
//				" ), "+
//				" '无' "+
//				" ) AS detector",
//				"date_format(task.startTime,'%Y-%m-%e') as startTime",
//				"date_format(task.completeTime,'%Y-%m-%e') as completeTime",
//		};
//		
//		String baseEntity = "taskMan";
//		String joinEntity =" LEFT JOIN task ON taskMan.taskID = task.ID "+
//				" LEFT JOIN testProject ON task.testProjectID = testProject.ID "+
//				" LEFT JOIN contractFineItem ON contractFineItem.testProjectID = testProject.ID "+
//				" LEFT JOIN contract on contract.ID = contractFineItem.contractID "+
//				" left join receiptlist on receiptlist.ID = task.receiptlistID "+
//				" left join company on company.ID = contract.companyID "+
//				" left join sample on sample.ID = task.sampleID "+
//				" left join employee on employee.ID = taskMan.detector ";
//		
//		String condition = "task.testProjectID = " + ID;
//		
//		if(contractCode!=null && !contractCode.equals("")){
//			condition += " and contract.contractCode like '%" + contractCode +"%'";
//		}
//		if(receiptlistCode!=null && !receiptlistCode.equals("")){
//			condition += " and receiptlist.receiptlistCode like '%" + receiptlistCode +"%'";
//		}
//		if(companyName!=null && !companyName.equals("")){
//			condition += " and company.companyName like '%" + companyName +"%'";
//		}
//		if(startTime!=null && !startTime.equals("") && endTime!=null && !endTime.equals("")){
//			condition += " and task.startTime between '" + startTime
//					+ "' and '" + endTime +"'";
//		}else if(startTime!=null && !startTime.equals("") && (endTime==null || endTime.equals(""))){
//			condition += " and task.startTime >= '" + startTime + "'";
//		}else if((startTime==null || startTime.equals("")) && endTime!=null && !endTime.equals("")){
//			condition += " and task.startTime <= '" + endTime + "'";
//		}
//		if(sampleName!=null && !sampleName.equals("")){
//			condition += " and sample.sampleName like '%" + sampleName +"%'";
//		}
//		
//		List<Map<String, Object>> result = originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, null, sort, order, index, pageNum);
//		int count = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false).size();
//		
//		Map<String,Object> map = new HashMap<String, Object>();
//		map.put("total", count);
//		map.put("rows", result);
//		
//		return map;
//	}
	
	//*******************************************************************************************************
	// 科室任务统计
	
	/**
	 * 
	 * @description 科室统计下初始化表格
	 * @author chenyubo
	 * @created 2016年11月14日 上午10:11:46
	 * @param ID
	 * @param testProjectID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getTestProjectInTaskStatistical(java.lang.String, java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getTestProjectInDepartmentTaskStatistical(String ID,int limit, int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
			"testProject.ID",
			"testProject.nameCn",
			"testProject.nameEn",
			"sum(contractFineItem.money) as money"
		};
		
		String baseEntity = "contractFineItem";
		
		String joinEntity = " left join testProject on contractFineItem.testProjectID = testProject.ID "
				+ " left join testdepartment on testproject.ID = testdepartment.testProjectID ";
		
		String condition = " testdepartment.departmentID = '" + ID + "' ";
		
		String groupField = "testProject.ID";
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, groupField, sort, order, index, pageNum);
		int count = originalGetForeignCount("testProject.ID", baseEntity, joinEntity, null, condition, false);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	/**
	 * 
	 * @description 科室统计获取总金额
	 * @author chenyubo
	 * @created 2017年05月24日16:54:21
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getTestProjectInTaskStatistical(java.lang.String, java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public String getTotalMoneyInDepartmentTaskStatistical(String ID) {
		
		String[] properties = new String[]{
			"sum(contractFineItem.money) as totalMoney"
		};
		
		String baseEntity = "contractFineItem";
		
		String joinEntity = " left join testProject on contractFineItem.testProjectID = testProject.ID "
				+ " left join testdepartment on testproject.ID = testdepartment.testProjectID ";
		
		String condition = " testdepartment.departmentID = '" + ID + "' group by testdepartment.departmentID ";
		
		List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
		
		String totalMoney = result.size() == 0 ? "0" : result.get(0).get("totalMoney") + "";
		return totalMoney;
	}
	
	
	
//	/**
//	 * 
//	 * @description 科室任务统计下获取该科室下所有检测项目
//	 * @author chenyubo
//	 * @created 2016年11月14日 上午10:50:16
//	 * @param ID
//	 * @return
//	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getAllTestProjectInTaskStatistical(java.lang.String)
//	 */
//	@Override
//	public List<Map<String, Object>> getAllTestProjectInDepartmentTaskStatistical(String ID) {
//		
//		String[] properties = new String[]{
//			"testProject.ID",
//			"testProject.nameCn",
//		};
//		
//		String baseEntity = "contractFineItem";
//		
//		String joinEntity = " left join testProject on contractFineItem.testProjectID = testProject.ID ";
//		
//		String condition = "contractFineItem.departmentID = '" + ID + "' group by testProject.ID";
//		
//		List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
//		
//		return result;
//	}
	
//	/**
//	 * 
//	 * @description 科室任务统计下查询检测项目详情次数
//	 * @author chenyubo
//	 * @created 2016年11月14日 下午4:42:52
//	 * @param ID
//	 * @param contractCode
//	 * @param receiptlistCode
//	 * @param companyName
//	 * @param startTime
//	 * @param endTime
//	 * @param sampleName
//	 * @param limit
//	 * @param offset
//	 * @param order
//	 * @param sort
//	 * @return
//	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getTaskStatisticalDetail(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int, int, java.lang.String, java.lang.String)
//	 */
//	@Override
//	public Map<String, Object> getDepartmentTaskStatisticalDetail(String ID,String testProjectID,String contractCode,String companyName,String startTime,String endTime,int limit, int offset, String order, String sort) {
//		int index = limit;
//		int pageNum = offset/limit;
//		
//		String[] properties = new String[]{
//				"distinct(contract.ID)",
//				"contract.contractCode",
//				"company.companyName",
//				"contract.oppositeMen",
//				"contractFineItem.number",
//				"contractFineItem.hour",
//				"contractFineItem.price",
//				"contractFineItem.money",
//				"date_format(contract.startTime,'%Y-%m-%e') as startTime",
//				"date_format(contract.endTime,'%Y-%m-%e') as endTime",
//		};
//		
//		String joinEntity = " left join contract on contract.ID = contractFineItem.contractID "+
//				" left join company on company.ID = contract.companyID "+
//				" left join testProject on contractFineItem.testProjectID = testProject.ID "+
//				" left join receiptlist on receiptlist.contractID = contract.ID "+
//				" left join employee on employee.ID = receiptlist.linkMan ";
//		
//		String condition = "contractFineItem.departmentID = " + ID + " and contractFineItem.testProjectID = " + testProjectID;
//		
//		if(contractCode!=null && !contractCode.equals("")){
//			condition += " and contract.contractCode like '%" + contractCode +"%'";
//		}
//		if(companyName!=null && !companyName.equals("")){
//			condition += " and company.companyName like '%" + companyName +"%'";
//		}
//		if(startTime!=null && !startTime.equals("") && endTime!=null && !endTime.equals("")){
//			condition += " and contract.startTime between '" + startTime
//					+ "' and '" + endTime +"'";
//		}else if(startTime!=null && !startTime.equals("") && (endTime==null || endTime.equals(""))){
//			condition += " and contract.startTime >= '" + startTime + "'";
//		}else if((startTime==null || startTime.equals("")) && endTime!=null && !endTime.equals("")){
//			condition += " and contract.startTime <= '" + endTime + "'";
//		}
//		
//		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), joinEntity, null, condition, false, null, sort, order, index, pageNum);
//		int count = originalGetForeignCount(getBasePrimaryKey(), getBaseEntityName(), joinEntity, null, condition, false);
//		
//		Map<String,Object> map = new HashMap<String, Object>();
//		map.put("total", count);
//		map.put("rows", result);
//		
//		return map;
//	}
//	
//	/**
//	 * 
//	 * @description 科室任务统计下查询检测项目详情次数
//	 * @author chenyubo
//	 * @created 2016年11月14日 下午10:13:56
//	 * @param ID
//	 * @param testProjectID
//	 * @param contractID
//	 * @param contractCode
//	 * @param receiptlistCode
//	 * @param companyName
//	 * @param sampleName
//	 * @param startTime
//	 * @param endTime
//	 * @param limit
//	 * @param offset
//	 * @param order
//	 * @param sort
//	 * @return
//	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getDepartmentTaskStatisticalDetailPage(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int, int, java.lang.String, java.lang.String)
//	 */
//	@Override
//	public Map<String, Object> getDepartmentTaskStatisticalDetailPage(String ID,String testProjectID,String contractID,String contractCode,String receiptlistCode,String companyName,String sampleName,String startTime,String endTime,int limit, int offset,String order, String sort) {
//		int index = limit;
//		int pageNum = offset/limit;
//		
//		String[] properties = new String[]{
//				"distinct(task.ID)",
//				"contract.contractCode",
//				"receiptlist.receiptlistCode",
//				"company.companyName",
//				"contract.oppositeMen",
//				"sample.factoryCode",
//				"sample.sampleName",
//				"sample.specifications",
//				" IFnull( "+
//				" ( "+
//					" SELECT "+
//						" group_concat(employee.employeeName) "+
//					" FROM "+
//						" taskMan, "+
//						" employee "+
//					" WHERE "+
//						" taskMan.taskID = task.ID "+
//					" AND taskMan.detector = employee.ID "+
//					" ORDER BY "+
//						" taskMan.ID "+
//				" ), "+
//				" '无' "+
//				" ) AS detector",
//				"date_format(contract.startTime,'%Y-%m-%e') as startTime",
//				"date_format(contract.endTime,'%Y-%m-%e') as endTime",
//		};
//		
//		String joinEntity = " left join contract on contract.ID = contractFineItem.contractID "+
//				" left join receiptlist on receiptlist.contractID = contract.ID "+
//				" left join company on company.ID = contract.companyID "+
//				" left join testProject on contractFineItem.testProjectID = testProject.ID "+
//				" left join task on task.testProjectID = testProject.ID "+
//				" left join sample on task.sampleID = sample.ID "+
//				" left join taskMan on taskMan.taskID = task.ID ";
//		
//		String condition = "contractFineItem.departmentID = " + ID + " and contractFineItem.testProjectID = " + testProjectID + " and contractFineItem.contractID = " + contractID; 
//		
//		if(contractCode!=null && !contractCode.equals("")){
//			condition += " and contract.contractCode like '%" + contractCode +"%'";
//		}
//		if(receiptlistCode!=null && !receiptlistCode.equals("")){
//			condition += " and receiptlist.receiptlistCode like '%" + receiptlistCode +"%'";
//		}
//		if(companyName!=null && !companyName.equals("")){
//			condition += " and company.companyName like '%" + companyName +"%'";
//		}
//		if(startTime!=null && !startTime.equals("") && endTime!=null && !endTime.equals("")){
//			condition += " and contract.startTime between '" + startTime
//					+ "' and '" + endTime +"'";
//		}else if(startTime!=null && !startTime.equals("") && (endTime==null || endTime.equals(""))){
//			condition += " and contract.startTime >= '" + startTime + "'";
//		}else if((startTime==null || startTime.equals("")) && endTime!=null && !endTime.equals("")){
//			condition += " and contract.startTime <= '" + endTime + "'";
//		}
//		if(sampleName!=null && !sampleName.equals("")){
//			condition += " and sample.sampleName like '%" + sampleName +"%'";
//		}
//		
//		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), joinEntity, null, condition, false, null, sort, order, index, pageNum);
//		int count = originalSearchForeign(properties, getBaseEntityName(), joinEntity, null, condition, false).size();
//		
//		Map<String,Object> map = new HashMap<String, Object>();
//		map.put("total", count);
//		map.put("rows", result);
//		
//		return map;
//	}
	
	// *******************************************************************************************************
	// 大类任务统计
	
	/**
	 * 
	 * @description 大类任务统计初始化表格
	 * @author chenyubo
	 * @created 2016年11月16日 下午3:45:42
	 * @param ID 科室ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getContentInDepartmentStatisticalManage(java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getLargeclassTaskStatistical(String ID, int limit, int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
			"testType.ID",
			"testType.name",
			"sum(contractFineItem.money) as money"
		};
		
		String joinEntity = " left join testProject on contractFineitem.testProjectID = testProject.ID "
				+ " left join testtype on testProject.testTypeID = testType.ID "
				+ " left join testdepartment on testproject.ID = testdepartment.testProjectID ";
		
		String condition = " 1 = 1 ";
		
		if(ID!=null && !ID.equals("") && !ID.equals("-1")){
			condition += " and testdepartment.departmentID = '" + ID + "' ";
		}
		
		String groupField = "testType.ID";
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), joinEntity, null, condition, false, groupField, sort, order, index, pageNum);
		int count = originalGetForeignCount("testType.ID", getBaseEntityName(), joinEntity, null, condition, false);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	/**
	 * 
	 * @description 大类任务统计查看具体大类检测项目
	 * @author chenyubo
	 * @created 2017年05月24日20:46:01
	 * @param ID
	 * @param departmentID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getDepartmentStatisticalDetailPage(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getLargeclassTaskStatisticalDetail(String ID, String departmentID, int limit, int offset,String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
			"testProject.ID",
			"testProject.nameCn",
			"testProject.nameEn",
			"contractFineItem.money"
		};
		
		String baseEntity = "contractFineItem";
		
		String joinEntity = " left join testProject on contractFineItem.testProjectID = testProject.ID "
				+ " left join testdepartment on testproject.ID = testdepartment.testProjectID ";
		
		String condition = " testProject.testTypeID = '" + ID + "' ";
		
		if(departmentID != null && !departmentID.equals("") && !departmentID.equals("-1")){
			condition += " and testdepartment.departmentID = '" + departmentID + "' ";
		}
		
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, null, sort, order, index, pageNum);
		int count = originalGetForeignCount("testProject.ID", baseEntity, joinEntity, null, condition, false);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	@Override
	public Map<String, Object> getContractFileItemWithPaging1(String ID,int limit, int offset,String order, String sort){
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "contractFineItem";
		String[] properties = new String[]{
			"contractFineItem.ID",
			"contractFineItem.fineItemCode",
			"case when contractFineItem.isOutsourcing = 0 then '内测' " + 
			"when contractFineItem.isOutsourcing = 1 then '外包' end as isOutsourcing",
			"contractFineItem.testProjectID",
			"testProject.nameCn",
			"testProject.nameEn",
			"contractFineItem.number",
			"contractFineItem.hour",
			"contractFineItem.price",
			"contractFineItem.money",
			"contractFineItem.calculateType",
			"contractFineItem.remarks"
		};
		String joinEntity = " LEFT JOIN testProject ON contractFineItem.testProjectID = testProject.ID ";
		
		String condition = "1 = 1 ";
		
		if(ID != null && !ID.isEmpty()){
			condition = " and contractFineItem.contractID = " + ID;
		}
		
		List<Map<String, Object>> result  = entityDao.searchWithpaging(properties, tableName, joinEntity, null, condition, null, sort, order, index, pageNum);
		int count = entityDao.getForeignCount(getBasePrimaryKey(), tableName, null, null, condition);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		updateContractAmount(ID);
		return map;
	}
	
	@Override
	public Map<String, Object> getContractFileItemWithPaging2(String ID,int limit, int offset,String order, String sort){
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "contractFineItem";
		String[] properties = new String[]{
			"contractFineItem.ID",
			"contractFineItem.sampleID",
			"sample.factoryCode",
			"sample.sampleName",
			"sample.specifications",
			"contractFineItem.money",
			"contractFineItem.remarks"
		};
		String joinEntity = " LEFT JOIN sample ON contractFineItem.sampleID = sample.ID ";
		
		String condition = "1 = 1 ";
		
		if(ID != null && !ID.isEmpty()){
			condition = " and contractFineItem.contractID = " + ID;
		}
		
		List<Map<String, Object>> result  = entityDao.searchWithpaging(properties, tableName, joinEntity, null, condition, null, sort, order, index, pageNum);
		int count = entityDao.getForeignCount(getBasePrimaryKey(), tableName, null, null, condition);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		updateContractAmount(ID);
		return map;
	}
	
	@Override
	public int delContractFineItem(String itemID,String contractID) {
		// TODO Auto-generated method stub
		if(itemID == null || itemID.isEmpty()){
			return 0;
		}
		
		String position = " ID = "+itemID;
		int result = entityDao.deleteByCondition(position, ContractFineItem.class);
		
		if(result > 0){
			updateContractAmount(contractID);
		}
		
		return result;
	}
	
	@Override
	public int addContractFineItem1(int isOutsourcing, String fineItemCode,
			String testProjectID, String testProjectName,int number, double price, double money,
			String remarks, String contractID){
		String[] properties1 = new String[] {"ID"};
		String condition1 = " nameCn = '" + testProjectName + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, TestProject.class);
		if(result1.isEmpty()){
			System.out.println("不存在该检测项目");
			return -2;
		}else{
			String testProjectID1 = result1.get(0).get("ID").toString();
			if(!testProjectID1.equals(testProjectID)){
				System.out.println("检测项目名与检测项目ID不相符");
				return -4;
			}
		}System.out.println("price:"+price);
		System.out.println("money:"+money);
		ContractFineItem contractFineItem = new ContractFineItem();
		String id = EntityIDFactory.createId();
		contractFineItem.setID(id);
		contractFineItem.setFineItemCode(fineItemCode);
		contractFineItem.setTestProjectID(testProjectID);
		contractFineItem.setIsOutsourcing(isOutsourcing);
		contractFineItem.setNumber(number);
		contractFineItem.setPrice(price);
		contractFineItem.setMoney(money);
		contractFineItem.setType(0);
		contractFineItem.setRemarks(remarks);
		//contractFineItem.setType(0);
		contractFineItem.setContractID(contractID);
		
		int results = entityDao.save(contractFineItem);
		
		if(results <= 0){
			String position = "ID =" + id;
			results = entityDao.deleteByCondition(position, ContractFineItem.class);
			return results;
		}
		
		updateContractAmount(contractID);
		return results;
	}
	
	@Override
	public int addContractFineItem2(String sampleID,String factoryCode,String sampleName,String specifications,
			double money,String remarks, String contractID){
		String[] properties1 = new String[] {"ID"};
		String condition1 = " factoryCode = '" + factoryCode + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Sample.class);
		if(result1.isEmpty()){
			System.out.println("不存在该样品名的样品,将新增对应样品记录");
			Sample sample = new Sample();
			sampleID = EntityIDFactory.createId();
			sample.setID(sampleID);
			sample.setFactoryCode(factoryCode);
			sample.setSampleName(sampleName);
			sample.setSpecifications(specifications);
			sample.setCreateTime(new Date());
			int result = entityDao.save(sample);
			if(result <= 0){
				String position = "ID =" + sample;
				entityDao.deleteByCondition(position,Sample.class);
				return -2;
			}
		}else{
			String sampleID1 = result1.get(0).get("ID").toString();
			if(!sampleID1.equals(sampleID)){
				System.out.println("样品名与样品ID不相符");
				return -4;
			}
		}
		System.out.println("money:"+money);
		ContractFineItem contractFineItem = new ContractFineItem();
		String id = EntityIDFactory.createId();
		contractFineItem.setID(id);
		contractFineItem.setSampleID(sampleID);
		contractFineItem.setMoney(money);
		contractFineItem.setRemarks(remarks);
		contractFineItem.setType(1);
		contractFineItem.setContractID(contractID);
		
		int results = entityDao.save(contractFineItem);
		
		if(results <= 0){
			String position = "ID =" + id;
			results = entityDao.deleteByCondition(position, ContractFineItem.class);
			return results;
		}
		
		updateContractAmount(contractID);
		return results;
	}
	
	@Override
	public int updateContractAmount(String contractID){
		String baseEntity = "contractFineItem";
		String[] properties = new String[]{
				"contractFineItem.money",
		};
		String joinEntity = "";
		String condition = " 1 = 1 and contractFineItem.contractID = " + contractID;
		List<Map<String, Object>> Monye1 = entityDao.searchForeign(properties,baseEntity,joinEntity,null,condition);
		
		double contractAmount = 0.0;
		for (Map<String, Object> m : Monye1)  
	    {  
	      for (String k : m.keySet())  
	      {  
	    	  contractAmount +=  (double)(m.get(k));
	      }  
	    }
		Contract contract = entityDao.getByID(contractID, Contract.class);
		contract.setContractAmount(contractAmount);
		int result = entityDao.updatePropByID(contract,contractID);
		
		return result;
	}
	
	@Override
	public int updContractFineItem1(String ID,int isOutsourcing, String fineItemCode,
			String testProjectID, String testProjectName,int number, double price, double money,
			String remarks, String contractID){
		// TODO Auto-generated method stub
		String[] properties1 = new String[] {"ID"};
		String condition1 = " nameCn = '" + testProjectName + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, TestProject.class);
		if(result1.isEmpty()){
			System.out.println("不存在该检测项目");
			return -2;
		}else{
			String testProjectID1 = result1.get(0).get("ID").toString();
			if(!testProjectID1.equals(testProjectID)){
				System.out.println("检测项目名与检测项目ID不相符");
				return -4;
			}
		}
		ContractFineItem contractFineItem = entityDao.getByID(ID, ContractFineItem.class);
		contractFineItem.setID(ID);
		contractFineItem.setFineItemCode(fineItemCode);
		contractFineItem.setTestProjectID(testProjectID);
		contractFineItem.setIsOutsourcing(isOutsourcing);
		contractFineItem.setNumber(number);
		contractFineItem.setPrice(price);
		contractFineItem.setMoney(money);
		contractFineItem.setType(0);
		contractFineItem.setRemarks(remarks);
				
		int results = entityDao.updatePropByID(contractFineItem,ID);
		updateContractAmount(contractID);
		return results;
	}

	@Override
	public int updContractFineItem2(String ID,String sampleID,String factoryCode,String sampleName,String specifications,
			double money,String remarks, String contractID){
		// TODO Auto-generated method stub
		String[] properties1 = new String[] {"ID"};
		String condition1 = " factoryCode = '" + factoryCode + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Sample.class);
		if(result1.isEmpty()){
			System.out.println("不存在该样品名的样品,将新增对应样品记录");
			Sample sample = new Sample();
			sampleID = EntityIDFactory.createId();
			sample.setID(sampleID);
			sample.setFactoryCode(factoryCode);
			sample.setSampleName(sampleName);
			sample.setSpecifications(specifications);
			sample.setCreateTime(new Date());
			int result = entityDao.save(sample);
			if(result <= 0){
				String position = "ID =" + sample;
				entityDao.deleteByCondition(position,Sample.class);
				return -2;
			}
		}else{
			String sampleID1 = result1.get(0).get("ID").toString();
			if(!sampleID1.equals(sampleID)){
				System.out.println("样品编码与样品ID不相符");
				return -4;
			}
		}
		ContractFineItem contractFineItem = entityDao.getByID(ID, ContractFineItem.class);
		contractFineItem.setSampleID(sampleID);
		contractFineItem.setMoney(money);
		contractFineItem.setRemarks(remarks);
		contractFineItem.setType(1);
		contractFineItem.setContractID(contractID);
				
		int results = entityDao.updatePropByID(contractFineItem,ID);
		updateContractAmount(contractID);
		return results;
	}
	
	@Override
	public List<Map<String, Object>> getContractFineItemByContractIDs(
			String ContractID) {
		String[] properties = new String[] {
				"contractfineitem.ID",
				"contractfineitem.fineItemCode",
				"contractfineitem.fineItemNameCn",
				"contractfineitem.isOutsourcing"
		};
		String condition = " 1 = 1 AND contractID = " + ContractID;
		List<Map<String, Object>> list = entityDao.findByCondition(properties,
				condition, ContractFineItem.class);
		return list;
		
	}
}
