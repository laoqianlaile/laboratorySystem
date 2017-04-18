package com.cqut.xiji.service.standard;

import java.util.List;
import java.util.Map;

/**
 * 标准管理
 * 
 * @author zkl
 * 
 */

public interface IStandardService {

	public String getStandrad(String ID);

	public String delStandard(String standardIDs);

	public String addStandard(String uploaderID,String STANDARDCODE, String STANDARDNAME,
			String TYPE, String SCOPE, int APPLICATIONTYPE, int EDITSTATE,
			String DESCRIPTION, String fileID);

	public Map<String, Object> getStandardWithPaging(String STANDARDCODE,
			String STANDARDNAME, String TYPE, String STATE, String APPLICATIONTYPE, int limit, int offset,
			String sort, String order);

	public String upStandard(String ID,String STANDARDCODE, String STANDARDNAME,
			String TYPE, String SCOPE, String APPLICATIONTYPE,
			String EDITSTATE,String SUGGEST, String STATE, String ABANDONAPPLYMAN,
			 String ABANDONAPPLYREASON);

	public List<Map<String, Object>> getStandardType();

	public boolean recoverCheck(String standardID);

	public String upFileID(String standardID, String fileID);


}
