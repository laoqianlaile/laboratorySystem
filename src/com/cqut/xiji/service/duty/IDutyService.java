package com.cqut.xiji.service.duty;

import java.util.Map;

public interface IDutyService {
	Map<String, Object> getDutyWithPage(String dutyCode,String dutyName,
			 int limit, int offset,String order, String sort);
	public String addDuty(String dutyCode,String dutyName,String introduction);
	public String delDuty(String IDs);
	public String updDuty(String ID,String dutyCode,String dutyName,String introduction);
}
