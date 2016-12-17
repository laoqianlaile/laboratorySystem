package com.cqut.xiji.service.equipmentType;

import java.util.List;
import java.util.Map;

public interface IEquipmentTypeService {

	/**
	 * @return
	 */
	public List<Map<String, Object>> getEquipmentTypeName();

	/**
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param equipmentTypeCode
	 * @param equipmentTypeName
	 * @return
	 */
	public Map<String, Object> getEquipmentWithPaging(int limit, int offset,
			String sort, String order, String equipmentTypeCode,
			String equipmentTypeName);

	/**
	 * @param equipmentTypeCode
	 * @param equipmentTypeName
	 * @param remarks
	 * @return
	 */
	public int addEquipmentType(String equipmentTypeCode,
			String equipmentTypeName, String remarks);

	/**
	 * @param equipmentTypeCodes
	 * @return
	 */
	public int delEquipmentType(String equipmentTypeCodes);

	/**
	 * @param equipmentTypeCode
	 * @return
	 */
	public List<Map<String, Object>> getIdByCode(String equipmentTypeCode);

	/**
	 * @param iD
	 * @param equipmentTypeCode
	 * @param equipmentTypeName
	 * @param remarks
	 * @return
	 */
	public int updEquipmentType(String iD, String equipmentTypeCode,
			String equipmentTypeName, String remarks);
	
}
