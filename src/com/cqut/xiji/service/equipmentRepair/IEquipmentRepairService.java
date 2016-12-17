package com.cqut.xiji.service.equipmentRepair;

import java.util.Map;


public interface IEquipmentRepairService {

	/**
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param model
	 * @param equipmentName
	 * @param employeeName
	 * @return
	 */
	public Map<String, Object> getEquipmentRepairWithPaging(int limit,
			int offset, String sort, String order, String model,
			String equipmentName, String employeeName);

	/**
	 * @param equipmentID
	 * @param repairTime
	 * @param employeeID
	 * @param beforeStatus
	 * @param afterStatus
	 * @param mounting
	 * @param money
	 * @param remarks
	 * @return
	 */
	public int addEquipmentRepair(String equipmentID, String repairTime,
			String employeeID, String beforeStatus, String afterStatus,
			String mounting, int money, String remarks);

	/**
	 * @param equipmentRepairIds
	 * @return
	 */
	public int delEquipmentRepair(String equipmentRepairIds);

	/**
	 * @param ID
	 * @param equipmentID
	 * @param repairTime
	 * @param employeeID
	 * @param beforeStatus
	 * @param afterStatus
	 * @param mounting
	 * @param money
	 * @param remarks
	 * @return
	 */
	public int updEquipmentRepair(String ID, String equipmentID, String repairTime,
			String employeeID, String beforeStatus, String afterStatus,
			String mounting, int money, String remarks);
	
}
