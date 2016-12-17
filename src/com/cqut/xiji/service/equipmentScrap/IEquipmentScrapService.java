package com.cqut.xiji.service.equipmentScrap;

import java.util.Map;


public interface IEquipmentScrapService {

	/**
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param model
	 * @param equipmentName
	 * @param departmentID
	 * @return
	 */
	public Map<String, Object> getEquipmentScrapWithPaging(int limit, int offset,
			String sort, String order, String model, String equipmentName,
			String departmentID);

	/**
	 * @param equipmentID
	 * @param employeeID
	 * @param buyTime
	 * @param checkinTime
	 * @param useTime
	 * @param remarks
	 * @return
	 */
	public int addEquipmentScrap(String equipmentID, String employeeID,
			 String buyTime,String checkinTime, int useTime, String remarks);

	/**
	 * @param equipmentScrapIds
	 * @return
	 */
	public int delEquipmentScrap(String equipmentScrapIds);

	/**
	 * @param ID
	 * @param equipmentID
	 * @param employeeID
	 * @param number
	 * @param buyTime
	 * @param checkinTime
	 * @param useTime
	 * @param remarks
	 * @return
	 */
	public int updEquipmentScrap(String ID, String equipmentID,String employeeID,
			 String buyTime,String checkinTime, int useTime,String remarks);
	
}
