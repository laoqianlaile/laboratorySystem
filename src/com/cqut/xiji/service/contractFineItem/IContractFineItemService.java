package com.cqut.xiji.service.contractFineItem;

import java.util.List;
import java.util.Map;

public interface IContractFineItemService {

	Map<String, Object> getTestProjectInTaskStatistical(String ID, String testProjectID,int limit,int offset, String order, String sort);
	List<Map<String, Object>> getAllTestProjectInTaskStatistical(String ID);
	Map<String, Object> getTaskStatisticalDetail(String ID,String contractCode,String receiptlistCode,String companyName,String startTime,String endTime,String sampleName,int limit,int offset, String order, String sort);
	
	Map<String, Object> getTestProjectInDepartmentTaskStatistical(String ID, String testProjectID,int limit,int offset, String order, String sort);
	List<Map<String, Object>> getAllTestProjectInDepartmentTaskStatistical(String ID);
	Map<String, Object> getDepartmentTaskStatisticalDetail(String ID,String testProjectID,String contractCode,String companyName,String startTime,String endTime,int limit,int offset, String order, String sort);
	Map<String, Object> getDepartmentTaskStatisticalDetailPage(String ID,String testProjectID,String contractID,String contractCode,String receiptlistCode,String companyName,String sampleName,String startTime,String endTime,int limit, int offset,String order, String sort);
	
	Map<String, Object> getContentInDepartmentStatisticalManage(int limit,int offset, String order, String sort);
	Map<String, Object> getDepartmentStatisticalDetailPage(String ID,String testProjectID,String contractCode,String contractName,String startTime,String endTime,int limit, int offset,String order, String sort);
	
	/**
	 * @param ID
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	public Map<String, Object> getContractFileItemWithPaging(String ID, int limit,
			int offset, String order, String sort);
	
	public int addContractFineItem(String fineItemCode, String testProjectID,
			String testProjectName,int isOutsourcing, int calculateType, int number,
			double price, int hour, double money, String departmentID,
			String remarks, String contractID);
	
	public int delContractFineItem(String itemID,String contractID);
	
	public int updContractFineItem(String ID, String fineItemCode,
			String testProjectID,String testProjectName, int isOutsourcing, int calculateType,
			int number, double price, int hour, double money,
			String departmentID, String remarks, String contractID);
	/*通过合同ID 获取合同所以有关的合同细项*/
	List<Map<String, Object>> getContractFineItemByContractIDs(String ContractID);
	
	/**
	 * @param contractID
	 * @return
	 */
	public int updateContractAmount(String contractID);
}
