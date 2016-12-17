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
}
