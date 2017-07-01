package com.cqut.xiji.service.taskMan;

import java.util.Map;

public interface ITaskManService {
	public Map<String, Object> getTaskManWithPaging(String ID, int limit, int offset, String sort, String order);
	public int assignLaborHour(String ID, String detector, Double laborHour);
}
