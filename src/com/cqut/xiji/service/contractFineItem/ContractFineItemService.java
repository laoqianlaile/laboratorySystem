package com.cqut.xiji.service.contractFineItem;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.service.base.SearchService;

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
	// 任务统计
	
	/**
	 * @description 任务统计下查询初始化表格
	 * @author chenyubo
	 * @created 2016年10月21日 下午9:01:12
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@Override
	public Map<String, Object> getTestProjectInTaskStatistical(String ID,String testProjectID,int limit, int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
			"testProject.ID",
			"testProject.nameCn",
			"testProject.nameEn",
			"sum(contractFineItem.number) as amount"
		};
		
		String baseEntity = "taskMan";
		
		String joinEntity = "left join task on taskMan.taskID = task.ID "
				+ " left join testProject on task.testProjectID = testProject.ID "
				+ " left join contractFineItem on contractFineItem.testProjectID = testProject.ID ";
		
		String condition = "taskMan.detector = '" + ID + "'";
		
		if(testProjectID != null && !testProjectID.equals("-1")){
			condition += " and testProject.ID = '" + testProjectID + "'";
		}
		
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
	 * @description 任务统计下查询所有该检测人员检测的检测项目
	 * @author chenyubo
	 * @created 2016年10月22日 上午10:38:38
	 * @param ID
	 * @return
	 */
	@Override
	public List<Map<String, Object>> getAllTestProjectInTaskStatistical(String ID) {
		
		String[] properties = new String[]{
			"testProject.ID",
			"testProject.nameCn",
		};
		
		String baseEntity = "taskMan";
		
		String joinEntity = "left join task on taskMan.taskID = task.ID "
				+ " left join testProject on task.testProjectID = testProject.ID "
				+ " left join contractFineItem on contractFineItem.testProjectID = testProject.ID";
		
		String condition = "taskMan.detector = '" + ID + "' group by testProject.ID";
		
		List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
		
		return result;
	}
	
	/**
	 * 
	 * @description 任务统计下查看检测项目详情
	 * @author chenyubo
	 * @created 2016年10月22日 下午7:35:11
	 * @param ID
	 * @param contractCode
	 * @param receiptlistCode
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param sampleName
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	@Override
	public Map<String, Object> getTaskStatisticalDetail(String ID,String contractCode,String receiptlistCode,String companyName,String startTime,String endTime,String sampleName,int limit, int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
				"distinct(contract.contractCode)",
				"receiptlist.receiptlistCode",
				"company.companyName",
				"receiptlist.linkMan",
				"date_format(receiptlist.createTime,'%Y-%m-%e') as createTime",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				" IFnull( "+
				" ( "+
					" SELECT "+
						" group_concat(employee.employeeName) "+
					" FROM "+
						" taskMan, "+
						" employee "+
					" WHERE "+
						" taskMan.taskID = task.ID "+
					" AND taskMan.detector = employee.ID "+
					" ORDER BY "+
						" taskMan.ID "+
				" ), "+
				" '无' "+
				" ) AS detector",
				"date_format(task.startTime,'%Y-%m-%e') as startTime",
				"date_format(task.completeTime,'%Y-%m-%e') as completeTime",
		};
		
		String baseEntity = "taskMan";
		String joinEntity =" LEFT JOIN task ON taskMan.taskID = task.ID "+
				" LEFT JOIN testProject ON task.testProjectID = testProject.ID "+
				" LEFT JOIN contractFineItem ON contractFineItem.testProjectID = testProject.ID "+
				" LEFT JOIN contract on contract.ID = contractFineItem.contractID "+
				" left join receiptlist on receiptlist.ID = task.receiptlistID "+
				" left join company on company.ID = contract.companyID "+
				" left join sample on sample.ID = task.sampleID "+
				" left join employee on employee.ID = taskMan.detector ";
		
		String condition = "task.testProjectID = " + ID;
		
		if(contractCode!=null && !contractCode.equals("")){
			condition += " and contract.contractCode like '%" + contractCode +"%'";
		}
		if(receiptlistCode!=null && !receiptlistCode.equals("")){
			condition += " and receiptlist.receiptlistCode like '%" + receiptlistCode +"%'";
		}
		if(companyName!=null && !companyName.equals("")){
			condition += " and company.companyName like '%" + companyName +"%'";
		}
		if(startTime!=null && !startTime.equals("") && endTime!=null && !endTime.equals("")){
			condition += " and task.startTime between '" + startTime
					+ "' and '" + endTime +"'";
		}else if(startTime!=null && !startTime.equals("") && (endTime==null || endTime.equals(""))){
			condition += " and task.startTime >= '" + startTime + "'";
		}else if((startTime==null || startTime.equals("")) && endTime!=null && !endTime.equals("")){
			condition += " and task.startTime <= '" + endTime + "'";
		}
		if(sampleName!=null && !sampleName.equals("")){
			condition += " and sample.sampleName like '%" + sampleName +"%'";
		}
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, baseEntity, joinEntity, null, condition, false, null, sort, order, index, pageNum);
		int count = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false).size();
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	//*******************************************************************************************************
	// 科室任务统计
	
	/**
	 * 
	 * @description 科室任务统计下初始化表格
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
	public Map<String, Object> getTestProjectInDepartmentTaskStatistical(String ID,String testProjectID,int limit, int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
			"testProject.ID",
			"testProject.nameCn",
			"testProject.nameEn",
			"sum(contractFineItem.money) as money",
			"sum(contractFineItem.number) as amount"
		};
		
		String baseEntity = "contractFineItem";
		
		String joinEntity = " left join testProject on contractFineItem.testProjectID = testProject.ID ";
		
		String condition = "contractFineItem.departmentID = " + ID;
		
		if(testProjectID != null && !testProjectID.equals("-1")){
			condition += " and testProject.ID = " + testProjectID;
		}
		
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
	 * @description 科室任务统计下获取该科室下所有检测项目
	 * @author chenyubo
	 * @created 2016年11月14日 上午10:50:16
	 * @param ID
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getAllTestProjectInTaskStatistical(java.lang.String)
	 */
	@Override
	public List<Map<String, Object>> getAllTestProjectInDepartmentTaskStatistical(String ID) {
		
		String[] properties = new String[]{
			"testProject.ID",
			"testProject.nameCn",
		};
		
		String baseEntity = "contractFineItem";
		
		String joinEntity = " left join testProject on contractFineItem.testProjectID = testProject.ID ";
		
		String condition = "contractFineItem.departmentID = " + ID + " group by testProject.ID";
		
		List<Map<String, Object>> result = originalSearchForeign(properties, baseEntity, joinEntity, null, condition, false);
		
		return result;
	}
	
	/**
	 * 
	 * @description 科室任务统计下查询检测项目详情次数
	 * @author chenyubo
	 * @created 2016年11月14日 下午4:42:52
	 * @param ID
	 * @param contractCode
	 * @param receiptlistCode
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param sampleName
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getTaskStatisticalDetail(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getDepartmentTaskStatisticalDetail(String ID,String testProjectID,String contractCode,String companyName,String startTime,String endTime,int limit, int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
				"distinct(contract.ID)",
				"contract.contractCode",
				"company.companyName",
				"contract.oppositeMen",
				"contractFineItem.number",
				"contractFineItem.hour",
				"contractFineItem.price",
				"contractFineItem.money",
				"date_format(contract.startTime,'%Y-%m-%e') as startTime",
				"date_format(contract.endTime,'%Y-%m-%e') as endTime",
		};
		
		String joinEntity = " left join contract on contract.ID = contractFineItem.contractID "+
				" left join company on company.ID = contract.companyID "+
				" left join testProject on contractFineItem.testProjectID = testProject.ID "+
				" left join receiptlist on receiptlist.contractID = contract.ID "+
				" left join employee on employee.ID = receiptlist.linkMan ";
		
		String condition = "contractFineItem.departmentID = " + ID + " and contractFineItem.testProjectID = " + testProjectID;
		
		if(contractCode!=null && !contractCode.equals("")){
			condition += " and contract.contractCode like '%" + contractCode +"%'";
		}
		if(companyName!=null && !companyName.equals("")){
			condition += " and company.companyName like '%" + companyName +"%'";
		}
		if(startTime!=null && !startTime.equals("") && endTime!=null && !endTime.equals("")){
			condition += " and contract.startTime between '" + startTime
					+ "' and '" + endTime +"'";
		}else if(startTime!=null && !startTime.equals("") && (endTime==null || endTime.equals(""))){
			condition += " and contract.startTime >= '" + startTime + "'";
		}else if((startTime==null || startTime.equals("")) && endTime!=null && !endTime.equals("")){
			condition += " and contract.startTime <= '" + endTime + "'";
		}
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), joinEntity, null, condition, false, null, sort, order, index, pageNum);
		int count = originalGetForeignCount(getBasePrimaryKey(), getBaseEntityName(), joinEntity, null, condition, false);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	/**
	 * 
	 * @description 科室任务统计下查询检测项目详情次数
	 * @author chenyubo
	 * @created 2016年11月14日 下午10:13:56
	 * @param ID
	 * @param testProjectID
	 * @param contractID
	 * @param contractCode
	 * @param receiptlistCode
	 * @param companyName
	 * @param sampleName
	 * @param startTime
	 * @param endTime
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getDepartmentTaskStatisticalDetailPage(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getDepartmentTaskStatisticalDetailPage(String ID,String testProjectID,String contractID,String contractCode,String receiptlistCode,String companyName,String sampleName,String startTime,String endTime,int limit, int offset,String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
				"distinct(task.ID)",
				"contract.contractCode",
				"receiptlist.receiptlistCode",
				"company.companyName",
				"contract.oppositeMen",
				"sample.factoryCode",
				"sample.sampleName",
				"sample.specifications",
				" IFnull( "+
				" ( "+
					" SELECT "+
						" group_concat(employee.employeeName) "+
					" FROM "+
						" taskMan, "+
						" employee "+
					" WHERE "+
						" taskMan.taskID = task.ID "+
					" AND taskMan.detector = employee.ID "+
					" ORDER BY "+
						" taskMan.ID "+
				" ), "+
				" '无' "+
				" ) AS detector",
				"date_format(contract.startTime,'%Y-%m-%e') as startTime",
				"date_format(contract.endTime,'%Y-%m-%e') as endTime",
		};
		
		String joinEntity = " left join contract on contract.ID = contractFineItem.contractID "+
				" left join receiptlist on receiptlist.contractID = contract.ID "+
				" left join company on company.ID = contract.companyID "+
				" left join testProject on contractFineItem.testProjectID = testProject.ID "+
				" left join task on task.testProjectID = testProject.ID "+
				" left join sample on task.sampleID = sample.ID "+
				" left join taskMan on taskMan.taskID = task.ID ";
		
		String condition = "contractFineItem.departmentID = " + ID + " and contractFineItem.testProjectID = " + testProjectID + " and contractFineItem.contractID = " + contractID; 
		
		if(contractCode!=null && !contractCode.equals("")){
			condition += " and contract.contractCode like '%" + contractCode +"%'";
		}
		if(receiptlistCode!=null && !receiptlistCode.equals("")){
			condition += " and receiptlist.receiptlistCode like '%" + receiptlistCode +"%'";
		}
		if(companyName!=null && !companyName.equals("")){
			condition += " and company.companyName like '%" + companyName +"%'";
		}
		if(startTime!=null && !startTime.equals("") && endTime!=null && !endTime.equals("")){
			condition += " and contract.startTime between '" + startTime
					+ "' and '" + endTime +"'";
		}else if(startTime!=null && !startTime.equals("") && (endTime==null || endTime.equals(""))){
			condition += " and contract.startTime >= '" + startTime + "'";
		}else if((startTime==null || startTime.equals("")) && endTime!=null && !endTime.equals("")){
			condition += " and contract.startTime <= '" + endTime + "'";
		}
		if(sampleName!=null && !sampleName.equals("")){
			condition += " and sample.sampleName like '%" + sampleName +"%'";
		}
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), joinEntity, null, condition, false, null, sort, order, index, pageNum);
		int count = originalSearchForeign(properties, getBaseEntityName(), joinEntity, null, condition, false).size();
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	// *******************************************************************************************************
	// 科室统计管理
	
	/**
	 * 
	 * @description 科室统计管理初始化表格
	 * @author chenyubo
	 * @created 2016年11月16日 下午3:45:42
	 * @param testProjectID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getContentInDepartmentStatisticalManage(java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getContentInDepartmentStatisticalManage(int limit, int offset, String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
			"department.ID",
			"department.departmentName",
			"sum(contractFineItem.money) as money",
			"sum(contractFineItem.number) as number"
		};
		
		String joinEntity = " left join department on contractFineItem.departmentID = department.ID ";
		
		String condition = " 1 = 1 ";
		
		String groupField = "contractFineItem.departmentID";
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), joinEntity, null, condition, false, groupField, sort, order, index, pageNum);
		int count = originalGetForeignCount("department.ID", getBaseEntityName(), joinEntity, null, condition, false);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	/**
	 * 
	 * @description 科室统计管理查询检测项目详细情况
	 * @author chenyubo
	 * @created 2016年11月16日 下午7:29:03
	 * @param ID
	 * @param testProjectID
	 * @param contractCode
	 * @param contractName
	 * @param startTime
	 * @param endTime
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#getDepartmentStatisticalDetailPage(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int, int, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getDepartmentStatisticalDetailPage(String ID,String testProjectID,String contractCode,String contractName,String startTime,String endTime,int limit, int offset,String order, String sort) {
		int index = limit;
		int pageNum = offset/limit;
		
		String[] properties = new String[]{
				"distinct(contractFineItem.ID)",
				"contract.contractCode",
				"company.companyName",
				"contract.oppositeMen",
				"sample.sampleName",
				"sample.specifications",
				"contractFineItem.number",
				"contractFineItem.hour",
				"contractFineItem.price",
				"contractFineItem.money",
				"date_format(contract.endTime,'%Y-%m-%e') as endTime",
		};
		
		String joinEntity = " left join contract on contract.ID = contractFineItem.contractID "+
				" left join receiptlist on receiptlist.contractID = contract.ID "+
				" left join company on company.ID = contract.companyID "+
				" left join task on task.testProjectID = contractFineItem.testProjectID "+
				" left join sample on task.sampleID = sample.ID ";
		
		String condition = "contractFineItem.departmentID = " + ID + " and contractFineItem.testProjectID = " + testProjectID ;
		
		if(contractCode!=null && !contractCode.equals("")){
			condition += " and contract.contractCode like '%" + contractCode +"%'";
		}
		if(contractName!=null && !contractName.equals("")){
			condition += " and .contractName like '%" + contractName +"%'";
		}
		if(startTime!=null && !startTime.equals("") && endTime!=null && !endTime.equals("")){
			condition += " and contract.endTime between '" + startTime
					+ "' and '" + endTime +"'";
		}else if(startTime!=null && !startTime.equals("") && (endTime==null || endTime.equals(""))){
			condition += " and contract.endTime >= '" + startTime + "'";
		}else if((startTime==null || startTime.equals("")) && endTime!=null && !endTime.equals("")){
			condition += " and contract.endTime <= '" + endTime + "'";
		}
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), joinEntity, null, condition, false, null, sort, order, index, pageNum);
		int count = originalGetForeignCount("contractFineItem.ID", getBaseEntityName(), joinEntity, null, condition, false);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
	
	@Override
	public Map<String, Object> getContractFileItemWithPaging(String ID,int limit, int offset,String order, String sort){
		int index = limit;
		int pageNum = offset/limit + 1;
		String tableName = "contractFineItem";
		String[] properties = new String[]{
			"contractFineItem.ID",
			"contractFineItem.fineItemCode",
			"case when contractFineItem.isOutsourcing = 0 then '内测' " + 
			"when contractFineItem.isOutsourcing = 1 then '外包' end as isOutsourcing",
			"contractFineItem.testProjectID",
			"testProject.nameCn",
			"contractFineItem.departmentID",
			"department.departmentName",
			"contractFineItem.price",
			"contractFineItem.remarks"
		};
		String joinEntity = " LEFT JOIN testProject ON contractFineItem.testProjectID = testProject.ID " +
				" LEFT JOIN department ON contractFineItem.departmentID = department.ID ";
		
		String condition = "1 = 1 ";
		
		if(ID != null && !ID.isEmpty()){
			condition = " and contractFineItem.contractID = " + ID;
		}
		
		List<Map<String, Object>> result  = entityDao.searchWithpaging(properties, tableName, joinEntity, null, condition, null, sort, order, index, pageNum);
		int count = entityDao.getForeignCount(getBasePrimaryKey(), tableName, null, null, condition);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		
		return map;
	}
}
