package com.cqut.xiji.service.contractFineItem;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.contractFineItem.ContractFineItem;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.entity.standard.Standard;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.POIEntity.DynamicLengthConfig;
import com.cqut.xiji.tool.POIXLSReader.ExcelReader;
import com.cqut.xiji.tool.POIXMLReader.XMLParser;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.PropertiesTool;

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
		
		String condition = " 1=1 ";
		if(!ID.equals("-1")){
			condition = " testdepartment.departmentID = '" + ID + "' ";
		}
		
//		if(ID.equals("-1")){
//			String condition = "1 = 1";
//		}
//		else
//		String condition = " testdepartment.departmentID = '" + ID + "' ";
		
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
	 * @modifiedBy heweikang 2017年9月9日17:01:03
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
				"testProject.testTypeID as ID",
				"testtype.`name`",
				"department.departmentName",
				"SUM(contractFineItem.money) as money"
		};
		
		String joinEntity = " LEFT JOIN testtype on testProject.testTypeID = testtype.ID "
				+ " LEFT JOIN testdepartment on testproject.id = testdepartment.ID "
				+ " left join department on testproject.ID = testdepartment.testProjectID ";
		
		String condition = " contractFineItem.testProjectID = testproject.ID ";
		
		if(ID!=null && !ID.equals("") && !ID.equals("-1")){
			condition += " and testdepartment.departmentID = '" + ID + "' ";
		}
		
		String groupField = "testtype.`name`";
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName()+",testproject ", joinEntity, null, condition, false, groupField, sort, order, index, pageNum);
//		int count = originalGetForeignCount("testType.ID", getBaseEntityName(), joinEntity, null, condition, false);
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", 1);
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
			"case when contractFineItem.isOutsourcing = 0 then '内测' " + 
			"when contractFineItem.isOutsourcing = 1 then '外包' end as isOutsourcing",
			"contractFineItem.testProjectID",
			"testProject.nameCn",
			"testProject.nameEn",
			"contractFineItem.number",
			"contractFineItem.price",
			"contractFineItem.money",
			"contractFineItem.standardID",
			"standard.standardCode",
			"standard.standardName",
			"contractFineItem.remarks"
		};
		String joinEntity = " LEFT JOIN testProject ON contractFineItem.testProjectID = testProject.ID " +
				" LEFT JOIN standard ON contractFineItem.standardID = standard.ID ";
		
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
	public int addContractFineItem1(int isOutsourcing,
			String testProjectID, String testProjectName,String standardID,int number, double price, double money,
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
		contractFineItem.setTestProjectID(testProjectID);
		contractFineItem.setIsOutsourcing(isOutsourcing);
		contractFineItem.setNumber(number);
		contractFineItem.setPrice(price);
		contractFineItem.setMoney(money);
		contractFineItem.setType(0);
		contractFineItem.setRemarks(remarks);
		contractFineItem.setStandardID(standardID);
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
	
	/**
	 * 
	 * @description 新增一个空的校准合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月1日 下午4:23:10
	 * @param contractID
	 * @return
	 */
	@Override
	public int addNullFineItem(String contractID){
		ContractFineItem contractFineItem = new ContractFineItem();
		String id = EntityIDFactory.createId();
		contractFineItem.setID(id);
		contractFineItem.setType(1);
		contractFineItem.setContractID(contractID);

		int results = entityDao.save(contractFineItem);
		if(results <= 0){
			String position = "ID =" + id;
			results = entityDao.deleteByCondition(position, ContractFineItem.class);
			return results;
		}
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
	public int updContractFineItem1(String ID,int isOutsourcing,
			String testProjectID, String testProjectName,String standardID,int number, double price, double money,
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
		contractFineItem.setTestProjectID(testProjectID);
		contractFineItem.setIsOutsourcing(isOutsourcing);
		contractFineItem.setNumber(number);
		contractFineItem.setPrice(price);
		contractFineItem.setMoney(money); 
		contractFineItem.setStandardID(standardID);
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
				String position = "ID =" + sampleID;
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
	public int updFineItem2(String ID,String sampleID, String factoryCode,
			String sampleName, String specifications, double money,
			String remarks, String contractID){
		// TODO Auto-generated method stub
		int results = 0;
		String[] properties1 = new String[] {"sample.ID as sampleId"};
		String condition1 = " sample.sampleName = '" + sampleName + "' AND "+
						" sample.specifications = '" + specifications + "' AND " +
						" sample.factoryCode = '" + factoryCode + "' ";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Sample.class);
		
		if(result1.isEmpty()){
			Sample sample = entityDao.getByID(sampleID, Sample.class);
			sample.setFactoryCode(factoryCode);
			sample.setSampleName(sampleName);
			sample.setSpecifications(specifications);
			sample.setCreateTime(new Date());
			int result2 = entityDao.updatePropByID(sample,sampleID);
			if(result2 < 0){
				return -2;
			}
			
			ContractFineItem contractFineItem = entityDao.getByID(ID, ContractFineItem.class);
			contractFineItem.setSampleID(sampleID);
			contractFineItem.setMoney(money);
			contractFineItem.setRemarks(remarks);
			contractFineItem.setType(1);
			contractFineItem.setContractID(contractID);
			results = entityDao.updatePropByID(contractFineItem,ID);
		}else{
			ContractFineItem contractFineItem = entityDao.getByID(ID, ContractFineItem.class);
			String sampleId = result1.get(0).get("sampleId").toString();
			contractFineItem.setSampleID(sampleId);
			contractFineItem.setMoney(money);
			contractFineItem.setRemarks(remarks);
			contractFineItem.setType(1);
			contractFineItem.setContractID(contractID);
					
			results = entityDao.updatePropByID(contractFineItem,ID);
		}
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
	/**
	 * 
	 * @description 导出合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月4日 下午9:47:44
	 * @param request
	 * @param response
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#contractFineItemExportExcel(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public boolean contractFineItemExportExcel1(HttpServletRequest request,
			HttpServletResponse response){
		String contractID = request.getParameter("contractID");//"20170607203548388";
		Class objClass = this.getClass(); 
		String strRealPath  = objClass.getClassLoader().getResource("").getFile(); 
		try {
			strRealPath = URLDecoder.decode(strRealPath, "UTF-8");
		} catch (UnsupportedEncodingException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		} 

		File objFile = new File(strRealPath); 

		strRealPath = objFile.getParent(); 
		String XMLPath = strRealPath;
		//String XMLPath = getClass().getResource("/").getFile().toString();
		XMLPath = XMLPath + "/classes/ReportXML/contractfineitem1.xml";
		String sheetName = "contractfineitem1";
		Map<String, DynamicLengthConfig> dynamicLengthMap = new HashMap<String, DynamicLengthConfig>();
		List<String> list1 = new ArrayList<String>();// 大标题
		List<Map<String, Object>> dataSource =getContractFileItemWithPaging3(contractID, null,
				 null);
		System.out.println("dataSource:"+dataSource);
		String fileName = "";
		//dataSource =null;
		fileName = "技术检测合同细项.xls";
		final String userAgent = request.getHeader("USER-AGENT");
		list1.add("技术检测合同细项");
		DynamicLengthConfig config1 = new DynamicLengthConfig(0, 0, 1, 9,
				list1);
		dynamicLengthMap.put("dynamicLengt1", config1);
		XMLParser parser = new XMLParser(XMLPath, sheetName, null,
				dynamicLengthMap, dataSource);
		parser.parse();
		try {
			if(StringUtils.contains(userAgent, "MSIE")){//IE浏览器
                fileName = URLEncoder.encode(fileName,"UTF8");
            }else if(StringUtils.contains(userAgent, "Mozilla")){//google,火狐浏览器
                fileName = new String(fileName.getBytes(), "ISO8859-1");
            }else{
                fileName = URLEncoder.encode(fileName,"UTF8");//其他浏览器
            }
			response.setHeader("content-disposition", "attachment;filename=\""
					+ fileName+"\"");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}

		try {
			OutputStream output = response.getOutputStream();
			parser.write(output);
			output.close();
			return true;

		} catch (IOException e) {
			e.printStackTrace();
		}
		return true;
	}
	
	/**
	 * 
	 * @description 导出合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月4日 下午9:47:44
	 * @param request
	 * @param response
	 * @see com.cqut.xiji.service.contractFineItem.IContractFineItemService#contractFineItemExportExcel(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public boolean contractFineItemExportExcel2(HttpServletRequest request,
			HttpServletResponse response){
		String contractID = request.getParameter("contractID");//"20170607203548388";
		Class objClass = this.getClass(); 
		String strRealPath  = objClass.getClassLoader().getResource("").getFile(); 
		try {
			strRealPath = URLDecoder.decode(strRealPath, "UTF-8");
		} catch (UnsupportedEncodingException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		} 

		File objFile = new File(strRealPath); 

		strRealPath = objFile.getParent(); 
		String XMLPath = strRealPath;
		//String XMLPath = getClass().getResource("/").getFile().toString();
		XMLPath = XMLPath + "/classes/ReportXML/contractfineitem2.xml";
		String sheetName = "contractfineitem2";
		Map<String, DynamicLengthConfig> dynamicLengthMap = new HashMap<String, DynamicLengthConfig>();
		List<String> list1 = new ArrayList<String>();// 大标题
		List<Map<String, Object>> dataSource =getContractFileItemWithPaging4(contractID, null,
				 null);
		System.out.println("dataSource:"+dataSource);
		String fileName = "";
		//dataSource =null;
		fileName = "校准合同细项.xls";
		final String userAgent = request.getHeader("USER-AGENT");
		list1.add("校准合同细项");
		DynamicLengthConfig config1 = new DynamicLengthConfig(0, 0, 1, 5,
				list1);
		dynamicLengthMap.put("dynamicLengt1", config1);
		XMLParser parser = new XMLParser(XMLPath, sheetName, null,
				dynamicLengthMap, dataSource);
		parser.parse();
		try {
			if(StringUtils.contains(userAgent, "MSIE")){//IE浏览器
                fileName = URLEncoder.encode(fileName,"UTF8");
            }else if(StringUtils.contains(userAgent, "Mozilla")){//google,火狐浏览器
                fileName = new String(fileName.getBytes(), "ISO8859-1");
            }else{
                fileName = URLEncoder.encode(fileName,"UTF8");//其他浏览器
            }
			response.setHeader("content-disposition", "attachment;filename=\""
					+ fileName+"\"");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}

		try {
			OutputStream output = response.getOutputStream();
			parser.write(output);
			output.close();
			return true;

		} catch (IOException e) {
			e.printStackTrace();
		}
		return true;
	}
	
	public List<Map<String, Object>> getContractFileItemWithPaging3(String contractID,String order,
			String sort) {
		// TODO Auto-generated method stub
		String tableName = "contractFineItem";
		String[] properties = new String[]{
				"testProject.nameCn",
				"testProject.nameEn",
				"contractFineItem.number",
				"contractFineItem.price",
				"contractFineItem.money",
				"standard.standardCode",
				"standard.standardName",
				"case when contractFineItem.isOutsourcing = 0 then '内测' " + 
				"when contractFineItem.isOutsourcing = 1 then '外包' end as isOutsourcing",
				"contractFineItem.remarks"
			};
			String joinEntity = " LEFT JOIN testProject ON contractFineItem.testProjectID = testProject.ID " +
					" LEFT JOIN standard ON contractFineItem.standardID = standard.ID ";
		String condition = "1 = 1 ";
		
		if(contractID != null && !contractID.isEmpty()){
			condition = " and contractFineItem.contractID = " + contractID;
		}
		
		int index=1;
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		index=count;
		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null, sort,
				order, index,0);
		
		return result;
	}
	
	public List<Map<String, Object>> getContractFileItemWithPaging4(String contractID,String order,
			String sort) {
		// TODO Auto-generated method stub
		String tableName = "contractFineItem";
		String[] properties = new String[]{
			"sample.factoryCode",
			"sample.sampleName",
			"sample.specifications",
			"contractFineItem.money",
			"contractFineItem.remarks"
		};
		String joinEntity = " LEFT JOIN sample ON contractFineItem.sampleID = sample.ID ";
		
		String condition = "1 = 1 ";
		
		if(contractID != null && !contractID.isEmpty()){
			condition = " and contractFineItem.contractID = " + contractID;
		}
		
		int index=1;
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);
		index=count;
		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null, sort,
				order, index,0);
		
		return result;
	}
	
	/**
	 * @description 导入合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月8日 下午4:36:47
	 * @param file
	 * @param req
	 * @param response
	 * @param typeNumber
	 * @param belongtoID
	 */
	@Override
	public int importExcelTemplate(CommonsMultipartFile file, HttpServletRequest req,
			HttpServletResponse response, int typeNumber, String belongtoID){
		
		if(typeNumber == 0){
			String nameCn = "";
			String nameEn = "";
			int number = 0;
			double price = 0;
			double money = 0;
			String standardCode = "";
			String standardName = "";
			int isOutsourcing = 0;
			String remarks = "";
			
			try {  
				List<ArrayList<String>> list = new ExcelReader().readExcel(file); 
				ArrayList<String> rowList = null;
		        //获得Excel表格的内容:
		        for (int i = 1; i < list.size(); i++) {
		        	rowList = list.get(i);
		        	for (int j = 0; j < rowList.size(); j++) {
		        		rowList.get(j);
		        		switch (j) {
		    			case 0:nameCn = rowList.get(j);
		    				break;
		    			case 1:nameEn = rowList.get(j);
							break;
		    			case 2:number = Integer.parseInt(rowList.get(j));
							break;
		    			case 3:price = Double.parseDouble(rowList.get(j));
							break;
		    			case 4:money = Double.parseDouble(rowList.get(j));;
							break;
		    			case 5:standardCode = rowList.get(j);
							break;
						case 6:standardName = rowList.get(j);
							break;
						case 7:if(rowList.get(j).equals("内测")){
									isOutsourcing = 0;
								}else{
									isOutsourcing = 1;
								}
							break;
						case 8:remarks = rowList.get(j);
							break;
		    			default:
		    				break;
		    			}
		        	}
		        	String testProjectID = "";
		        	String standardID = "";
		        	String[] properties1 = new String[] {"testProject.ID as testProjectID"};
		    		String condition1 = " testProject.nameCn = '" + nameCn + "' AND "+
		    						" testProject.nameEn = '" + nameEn + "'";
		    		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, TestProject.class);
		    		if(result1.isEmpty()){
		    			System.out.println("不存在该检测项目,将新增对应检测项目");
		    			//return -2;
		    			TestProject testProject = new TestProject();
		    			testProjectID = EntityIDFactory.createId();
		    			testProject.setID(testProjectID);
		    			testProject.setNameCn(nameCn);
		    			testProject.setNameEn(nameEn);
		    			testProject.setRemarks("系统新增");
		    			testProject.setCreateTime(new Date());
		    			int result = entityDao.save(testProject);
		    			if(result <= 0){
		    				String position = "ID =" + testProjectID;
		    				entityDao.deleteByCondition(position,TestProject.class);
		    				return -2;
		    			}
		    		}else{
		    			testProjectID = result1.get(0).get("testProjectID").toString();
		    		}
		    			
		    		String[] properties2 = new String[] {"standard.ID as standardID"};
		    		String condition2 = " standard.standardCode = '" + standardCode + "' AND "+
		    						" standard.standardName = '" + standardName + "'";
		    		List<Map<String, Object>> result2 = entityDao.findByCondition(properties2, condition2, Standard.class);
		    		if(result2.isEmpty()){
		    			System.out.println("不存在该检测项目,将新增对应检测项目");
		    			Standard standard = new Standard();
		    			standardID = EntityIDFactory.createId();
		    			standard.setID(standardID);
		    			standard.setStandardCode(standardCode);
		    			standard.setStandardName(standardName);
		    			standard.setRemarks("系统新增");
		    			int result = entityDao.save(standard);
		    			if(result <= 0){
		    				String position = "ID =" + standardID;
		    				entityDao.deleteByCondition(position,Standard.class);
		    				return -2;
		    			}
		    		}else{
		    			standardID = result2.get(0).get("standardID").toString();
		    		}
		    		
		    		ContractFineItem contractFineItem = new ContractFineItem();
		    		String id = EntityIDFactory.createId();
		    		contractFineItem.setID(id);
		    		contractFineItem.setTestProjectID(testProjectID);
		    		contractFineItem.setIsOutsourcing(isOutsourcing);
		    		contractFineItem.setNumber(number);
		    		contractFineItem.setPrice(price);
		    		contractFineItem.setMoney(money);
		    		contractFineItem.setType(0);
		    		contractFineItem.setRemarks(remarks);
		    		contractFineItem.setStandardID(standardID);
		    		contractFineItem.setContractID(belongtoID);
		    		
		    		int results = entityDao.save(contractFineItem);
		    		
		    		if(results <= 0){
		    			String position = "ID =" + id;
		    			results = entityDao.deleteByCondition(position, ContractFineItem.class);
		    			return results;
		    		}
		    		updateContractAmount(belongtoID);
		        }  
		    } catch (IOException e) {  
		        System.out.println("未找到指定路径的文件!");  
		        e.printStackTrace();  
		    }
			return 1;
		}else if(typeNumber == 1){
			String factoryCode = "";
			String sampleName = "";
			String specifications = "";
			double money = 0;
			String remarks = "";
			
			try {  
				List<ArrayList<String>> list = new ExcelReader().readExcel(file); 
				ArrayList<String> rowList = null;
		        //获得Excel表格的内容:
		        for (int i = 1; i < list.size(); i++) {
		        	rowList = list.get(i);
		        	for (int j = 0; j < rowList.size(); j++) {
		        		rowList.get(j);
		        		switch (j) {
		    			case 0:factoryCode = rowList.get(j);
		    				break;
		    			case 1:sampleName = rowList.get(j);
							break;
		    			case 2:specifications = rowList.get(j);
							break;
		    			case 3:money = Double.parseDouble(rowList.get(j));;
							break;
		    			case 4:remarks = rowList.get(j);
							break;
		    			default:
		    				break;
		    			}
		        	}
		        	String sampleID = "";
		        	String[] properties1 = new String[] {"sample.ID as sampleID"};
		    		String condition1 = " sample.sampleName = '" + sampleName + "' AND "+
		    						" sample.specifications = '" + specifications + "' AND " +
		    						" sample.factoryCode = '" + factoryCode + "' ";
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
		    			sampleID = result1.get(0).get("sampleID").toString();
		    		}
		    		
		    		ContractFineItem contractFineItem = new ContractFineItem();
		    		String id = EntityIDFactory.createId();
		    		contractFineItem.setID(id);
		    		contractFineItem.setSampleID(sampleID);
		    		contractFineItem.setMoney(money);
		    		contractFineItem.setRemarks(remarks);
		    		contractFineItem.setType(1);
		    		contractFineItem.setContractID(belongtoID);
		    		
		    		int results = entityDao.save(contractFineItem);
		    		
		    		if(results <= 0){
		    			String position = "ID =" + id;
		    			results = entityDao.deleteByCondition(position, ContractFineItem.class);
		    			return results;
		    		}
		    		updateContractAmount(belongtoID);
		        }  
		    } catch (IOException e) {  
		        System.out.println("未找到指定路径的文件!");  
		        e.printStackTrace();  
		    }
			return 1;
		}
		return 1;
	}
	
}
