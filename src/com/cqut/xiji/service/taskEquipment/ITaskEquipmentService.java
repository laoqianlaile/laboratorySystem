package com.cqut.xiji.service.taskEquipment;

import java.util.List;
import java.util.Map;

public interface ITaskEquipmentService {
	public boolean saveTaskEquipment(String[] equipmentIDs, String taskID);

	public List<Map<String, Object>> getTaskEquipmentID(String taskID);
}
