package com.cqut.xiji.service.equipmentUse;

import java.util.Map;


public interface IEquipmentUseService {

	/**
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param ID
	 * @param equipmentName
	 * @param model
	 * @param startTime
	 * @param departmentName
	 * @param employeeName
	 * @return
	 */
	public Map<String, Object> getEquipmentUseWithPaging(int limit, int offset, String sort, String order, String equipmentName, String testProject, String sampleName, String applicat, String startTime, String endTime);

	/**
	 * @param equipmentUseId
	 * @return
	 */
	public int delEquipmentUse(String equipmentUseId);
	
}
