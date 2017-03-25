package com.cqut.xiji.service.contract;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

public interface IContractService {

	Map<String, Object> getContractWithPaging(int limit, int offset,
			String order, String sort, String taleName,HttpSession session);

	public int addContract(String contractName, String companyID,String companyName,
			String oppositeMen, String linkPhone, String employeeName,
			String address, String signAddress, String startTime,
			String signTime, String endTime, int isClassified, int classifiedLevel);
	
	public List<Map<String, Object>> getIdByCode(String contractCode);
	
	public int delContract(String ids);
	
	public int updContract(String ID, String contractCode, String contractName,
			String companyID, String companyName, String address,
			String oppositeMen, String linkPhone, String employeeID,
			String employeeName, String signAddress, String startTime,
			String signTime, String endTime,
			int isClassified, int classifiedLevel, int state);
			
	public int auditContract(String ID, String viewpoint, int state);

	public Map<String, Object> getContractWithPaging2(int limit, int offset,
			String sort, String order, String contractName, String contractCode,
			String employeeName, String companyName, String startTime,
			String endTime, String oppositeMen, String linkPhone, int state);

	/**
	 * @param contractCode
	 * @return
	 */
	public List<Map<String, Object>> getContractByCode(String contractCode);
	
	public List<Map<String, Object>> getcompanyInforByCode(String contractCode);

	List<Map<String, Object>> getContract();

	public List<Map<String, Object>> getContractByID(String ID);

	/**
	 * @param fileID
	 * @return
	 */
	public int updateContractFileID(String contractID);

	/**
	 * 
	 * @description 覆盖合同信息，生成新合同
	 * @author hujiajun
	 * @created 2017年3月16日 下午7:37:02
	 * @param ID
	 * @param contractCode
	 * @param contractName
	 * @param companyName
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeName
	 * @param address
	 * @param signAddress
	 * @param startTime
	 * @param signTime
	 * @param endTime
	 * @return
	 */
	public int coverContractFile(String ID/*,String contractCode,String contractName, String companyName,
			String oppositeMen, String linkPhone, String employeeName,
			String address, String signAddress, String startTime,
			String signTime, String endTime*/);

}
