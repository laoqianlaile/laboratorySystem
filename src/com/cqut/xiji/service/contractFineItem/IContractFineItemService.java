package com.cqut.xiji.service.contractFineItem;

import java.util.List;
import java.util.Map;

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
	
	public int addContractFineItem1(int isOutsourcing,String departmentID, String fineItemCode,
			String testProjectID, String testProjectName,int number, double price, double money,
			String remarks, String contractID);
	
	public int addContractFineItem2(String sampleID,String factoryCode,String sampleName,String specifications,
			double money,String remarks, String contractID);
	
	public int delContractFineItem(String itemID,String contractID);
	
	public int updContractFineItem1(String ID,int isOutsourcing,String departmentID, String fineItemCode,
			String testProjectID, String testProjectName,int number, double price, double money,
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
}
