package com.cqut.xiji.service.contract;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public interface IContractService {

	Map<String, Object> getContractWithPaging(int limit, int offset,
			String order, String sort, String taleName,HttpSession session);

	public int addContract(String contractCode,String contractName, String companyID,String companyName,
			String oppositeMen, String linkPhone,String employeeID, String employeeName,
			String address, String signAddress, String startTime,
			String signTime, String endTime, int isClassified, int classifiedLevel,int contractType,String technicalContent);
	
	public List<Map<String, Object>> getIdByCode(String contractCode);
	
	public int delContract(String ids);
	
	public int updContract(String ID, String contractCode, String contractName,
			String companyID, String companyName, String address,
			String oppositeMen, String linkPhone, String employeeID,
			String employeeName, String signAddress, String startTime,
			String signTime, String endTime,
			int isClassified, int classifiedLevel,String technicalID,String technicalContent);
	
			
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

	/**
	 * 
	 * @description 根据ID得到合同信息
	 * @author hujiajun
	 * @created 2017年3月29日 上午11:40:33
	 * @param ID
	 * @return
	 */
	public List<Map<String, Object>> getContractByID(String ID);

	/**
	 * 
	 * @description 更新合同表fileID
	 * @author hujiajun
	 * @created 2017年3月29日 上午11:39:52
	 * @param contractID
	 * @return
	 */
	public int updateContractFileID(String contractID);

	public int isContractFile(String ID);
	
	/**
	 * 
	 * @description 覆盖合同信息，生成新合同
	 * @author hujiajun
	 * @created 2017年3月16日 下午7:37:02
	 * @param ID
	 * @param fileID
	 * @return
	 */
	public int coverContractFile1(String ID, String fileID,HttpServletRequest request,HttpServletResponse response);
	
	public int coverContractFile2(String ID, String fileID,HttpServletRequest request,HttpServletResponse response);

	
	/**
	 * @description 更新合同状态
	 * @author hujiajun
	 * @created 2017年3月29日 上午11:38:52
	 * @param ID
	 * @param state
	 * @return
	 */
	public int updContractState(String ID, int state);

	/**
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param contractName
	 * @param contractCode
	 * @param employeeName
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param oppositeMen
	 * @param linkPhone
	 * @param state
	 * @return
	 */
	public Map<String, Object> getContractAuditWithPaging(int limit, int offset,
			String sort, String order, String contractName,
			String contractCode, String employeeName, String companyName,
			String startTime, String endTime, String oppositeMen,
			String linkPhone, int state);
/**
 * 
 * //获取合同的标准号和标准名称
 * @author wzj
 * @date 2017年5月20日 下午4:53:32
 * @param coID
 * @return
 */
	public String getStandardByContractID(String coID); 
	
	/**
	 * 合同补录初始化数据
	 * @param reCode
	 * @param coCode
	 * @param companyName
	 * @param reType
	 * @param linkMan
	 * @param startTime
	 * @param endTime
	 * @param state
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @return
	 */
	public Map<String, Object> getMakeContractPaging(String reCode,
			String coCode, String companyName, String reType, String linkMan,
			String startTime, String endTime, String state, int limit,
			int offset, String order, String sort);
	/**
	 * 允许补录合同
	 * @param ID
	 * @return
	 */
	public int passMakeContract(String ID);

	
	/**
	 * @description 复制合同
	 * @author LG.hujiajun
	 * @created 2017年6月30日 下午4:18:27
	 * @param ID
	 * @return
	 */
	public int cloneContractByID(String ID);

}
