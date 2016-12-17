package com.cqut.xiji.service.standardType;

import java.util.Map;

public interface IStandardTypeService {

	public Map<String, Object> getStandardTypeWithPaging(String sTANDARDTYPECODE,
			String sTANDARDTYPENAME, int limit, int offset, String order,
			String sort);

	public String addStandard(String standardTypeCode, String standardTypeName);

	public String upStandardType(String standardTypeCode,
			String standardTypeName, String standardTypeName2);

	public String delStandardType(String StandardTypeIDs);
	
}
