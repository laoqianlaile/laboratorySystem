package com.cqut.xiji.service.contract;

import java.util.List;
import java.util.Map;

public interface IContractService {

	Map<String, Object> getContractWithPaging(int limit, int offset,
			String order, String sort, String taleName);

	public String addContract(String contractName, String companyName,
			String oppositeMen, String linkPhone, String employeeName,
			String signAddress, String startTime, String signTime, String endTime);
	
	public List<Map<String, Object>> getIdByCode(String contractCode);
	
	public String delContract(String contractCodes);
	
	public String updContract(String iD, String contractCode,
			String contractName, String companyName, String oppositeMen,
			String linkPhone, String employeeName, String signAddress,
			String startTime, String signTime, String endTime,
			double contractAmount, int isClassified, int classifiedLevel,
			int state);


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
	
}
