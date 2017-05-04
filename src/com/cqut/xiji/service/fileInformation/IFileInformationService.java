package com.cqut.xiji.service.fileInformation;

import java.util.Map;

public interface IFileInformationService {

	Map<String, Object> getWithPaging(int limit, int offset, String order,
			String sort, String tableName);

	int setcontractID(String contractID);

	Map<String, Object> getFileInTaskWithPaging(String ID, int limit,
			int offset, String sort, String order);

	/**
	 * 
	 * @author wzj
	 * @date 2016年11月20日 下午9:56:22
	 * @param fileID
	 * @param remarks
	 * @return
	 */
	String updateRemarksByID(String fileID, String remarks);

	String deleteFileByID(String fileID);

	Map<String, Object> getFileInReceiptlistWithPaging(String ID, int limit,
			int offset, String sort, String order);

	/**
	 * @description 初始化合同文件表
	 * @author hujiajun
	 * @created 2016-12-15 下午9:31:26
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param ID
	 * @return
	 */

	public Map<String, Object> getContractFileWithPaging(int limit, int offset,
			String order, String sort, String ID);

	public Map<String, Object> getFileInTaskViewWithPaging(String taskID,
			int limit, int offset, String sort, String order);

	public Map<String, Object> getFileWithPaging(int limit, int offset,
			String sort, String order, String fileName, String projectID,
			String uploadName, String beginTime, String endTime,
			String selectPart);

	public Map<String, Object> getContractTemplateFileWithPaging(int limit,
			int offset, String order, String sort);
}
