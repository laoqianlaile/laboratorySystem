package com.cqut.xiji.service.equipmentVerify;

import java.util.Map;

public interface IEquipmentVerifyService {

	/**
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param employeeName
	 * @param equipmentName
	 * @param departmentName
	 * @return
	 */
	public Map<String, Object> getEquipmentVerifyWithPaging(int limit, int offset,
			String sort, String order, String employeeName,
			String equipmentName, String departmentName);

	/**
	 * @param equipmentID
	 * @param equipmentName
	 * @param testProjectID
	 * @param accuracy
	 * @param departmentID
	 * @param result
	 * @param verifyID
	 * @param remarks
	 * @return
	 */
	public int addEquipmentVerify(String equipmentID, String testProjectID, int accuracy,
			String departmentID, int result, String verifyID, String remarks);

	/**
	 * @param equipmentVerifyids
	 * @return
	 */
	public int delEquipmentVerify(String equipmentVerifyids);

	/**
	 * @param ID
	 * @param equipmentID
	 * @param equipmentName
	 * @param testProjectID
	 * @param accuracy
	 * @param departmentID
	 * @param result
	 * @param verifyID
	 * @param remarks
	 * @return
	 */
	public int updEquipmentVerify(String ID, String equipmentID, String testProjectID, int accuracy,
			String departmentID, int result, String verifyID, String remarks);
	
}
