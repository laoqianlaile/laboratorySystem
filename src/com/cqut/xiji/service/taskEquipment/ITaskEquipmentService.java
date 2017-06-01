package com.cqut.xiji.service.taskEquipment;

import java.util.List;
import java.util.Map;

public interface ITaskEquipmentService {
	public String saveTaskEquipment(String[] equipmentIDs, String taskID);

	public List<Map<String, Object>> getTaskEquipmentID(String taskID);
	
	public boolean deleteTaskEquipmentID(String[] taskIDs);
}
