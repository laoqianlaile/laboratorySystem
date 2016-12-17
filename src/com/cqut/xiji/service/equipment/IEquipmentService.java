package com.cqut.xiji.service.equipment;

import java.util.List;
import java.util.Map;

public interface IEquipmentService {

	/**
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param equipmentName
	 * @param equipmentType
	 * @param department
	 * @param buyTime
	 * @return
	 */
	public Map<String, Object> getEquipmentWithPaging(int limit, int offset,
			String sort, String order, String equipmentName,
			String equipmentType, String departmentName, String buyTime);

	/**
	 * @param equipmentCode
	 * @param equipmentName
	 * @param equipmentType
	 * @param model
	 * @param department
	 * @param buyTime
	 * @param useYear
	 * @param factoryCode
	 * @param credentials
	 * @param effectiveTime
	 * @param employeeName
	 * @param remarks
	 * @return
	 */
	public int addEquipment(String equipmentCode, String equipmentName,
			String equipmentType, String model, String department,
			String buyTime, int useYear, String factoryCode,
			String credentials, String effectiveTime, String employeeID,
			String remarks);
	
	/**
	 * @param equipmentCodes
	 * @return
	 */
	public int delEquipment(String equipmentCodes);

	/**
	 * @param equipmentCode
	 * @return
	 */
	public List<Map<String, Object>> getIdByCode(String equipmentCode);

	/**
	 * @param ID
	 * @param equipmentCode
	 * @param equipmentName
	 * @param equipmentType
	 * @param model
	 * @param department
	 * @param buyTime
	 * @param useYear
	 * @param factoryCode
	 * @param credentials
	 * @param effectiveTime
	 * @param employeeName
	 * @param remarks
	 * @return
	 */
	public String updEquipment(String ID, String equipmentCode,
			String equipmentName, String equipmentType, String model,
			String department, String buyTime, int useYear, String factoryCode,
			String credentials, String effectiveTime, String employeeID,
			String remarks);

	public List<Map<String, Object>> getEquipments();

	public List<Map<String, Object>> getEquipmentsByID(String equipmentID);

	/**
	 * @description 通过设备名称得到设备信息
	 * @author hujiajun
	 * @created 2016年12月12日19:13:01
	 * @param equipmentName
	 */
	public List<Map<String, Object>> getEquipmentByName(String equipmentName);

	/**
	 * @param ID
	 * @return
	 */
	public List<Map<String, Object>> getEquipmentById(String ID);

	/**
	 * @param startTime
	 * @param endTime
	 * @param format
	 * @param str
	 * @return
	 */
	public Long dateDiff(String startTime, String endTime, String format, String str);

}
