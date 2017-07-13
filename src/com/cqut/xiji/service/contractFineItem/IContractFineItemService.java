package com.cqut.xiji.service.contractFineItem;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public interface IContractFineItemService {
	
	// 科室任务统计
	Map<String, Object> getTestProjectInDepartmentTaskStatistical(String ID,int limit,int offset, String order, String sort);
	String getTotalMoneyInDepartmentTaskStatistical(String ID);
	
	// 大类任务统计
	Map<String, Object> getLargeclassTaskStatistical(String ID, int limit,int offset, String order, String sort);
	Map<String, Object> getLargeclassTaskStatisticalDetail(String ID, String departmentID, int limit, int offset,String order, String sort);
	
	// 个人任务统计
	Map<String, Object> getPersonalTaskStatistical(String ID, int type, String testProjectID,int limit,int offset, String order, String sort);
	
//	List<Map<String, Object>> getAllTestProjectInTaskStatistical(String ID);
//	Map<String, Object> getTaskStatisticalDetail(String ID,String contractCode,String receiptlistCode,String companyName,String startTime,String endTime,String sampleName,int limit,int offset, String order, String sort);
//	
	
//	List<Map<String, Object>> getAllTestProjectInDepartmentTaskStatistical(String ID);
//	Map<String, Object> getDepartmentTaskStatisticalDetail(String ID,String testProjectID,String contractCode,String companyName,String startTime,String endTime,int limit,int offset, String order, String sort);
//	Map<String, Object> getDepartmentTaskStatisticalDetailPage(String ID,String testProjectID,String contractID,String contractCode,String receiptlistCode,String companyName,String sampleName,String startTime,String endTime,int limit, int offset,String order, String sort);
	
	
	
	
	/**
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	public Map<String, Object> getContractFileItemWithPaging1(String ID, int limit,
			int offset, String order, String sort);
	
	/**
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	public Map<String, Object> getContractFileItemWithPaging2(String ID, int limit,
			int offset, String order, String sort);
	
	public int addContractFineItem1(int isOutsourcing,
			String testProjectID, String testProjectName,String standardID,int number, double price, double money,
			String remarks, String contractID);
	
	public int addContractFineItem2(String sampleID,String factoryCode,String sampleName,String specifications,
			double money,String remarks, String contractID);
	
	public int delContractFineItem(String itemID,String contractID);
	
	public int updContractFineItem1(String ID,int isOutsourcing,
			String testProjectID, String testProjectName,String standardID,int number, double price, double money,
			String remarks, String contractID);
	
	public int updContractFineItem2(String ID,String sampleID,String factoryCode,String sampleName,String specifications,
			double money,String remarks, String contractID);
	/*通过合同ID 获取合同所以有关的合同细项*/
	List<Map<String, Object>> getContractFineItemByContractIDs(String ContractID);
	
	/**
	 * @param contractID
	 * @return
	 */
	public int updateContractAmount(String contractID);
	
	/**
	 * @description 新增一个空的校准合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月1日 下午4:24:06
	 * @param contractID
	 * @return
	 */
	public int addNullFineItem(String contractID);
	
	/**
	 * @description 修改校准合同细项2
	 * @author LG.hujiajun
	 * @created 2017年7月1日 下午5:55:39
	 * @param ID
	 * @param factoryCode
	 * @param sampleName
	 * @param specifications
	 * @param money
	 * @param remarks
	 * @param contractID
	 * @return
	 */
	public int updFineItem2(String ID,String sampleID, String factoryCode,
			String sampleName, String specifications, double money,
			String remarks, String contractID);
	
	/**
	 * @description 导出合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月4日 下午9:46:36
	 * @param request
	 * @param response
	 */
	public boolean contractFineItemExportExcel1(HttpServletRequest request,
			HttpServletResponse response);
	
	/**
	 * @description 导出合同细项
	 * @author LG.hujiajun
	 * @created 2017年7月4日 下午9:46:36
	 * @param request
	 * @param response
	 */
	public boolean contractFineItemExportExcel2(HttpServletRequest request,
			HttpServletResponse response);
	/**
	 * @param request
	 * @param response
	 *//*
	public boolean contractFineItemImportExcel2(HttpServletRequest request,
			HttpServletResponse response);*/
	
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
	public int importExcelTemplate(CommonsMultipartFile file, HttpServletRequest req,
			HttpServletResponse response, int typeNumber, String belongtoID);
	
	
}
