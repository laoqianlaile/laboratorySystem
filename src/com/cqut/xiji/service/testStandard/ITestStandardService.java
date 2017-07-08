package com.cqut.xiji.service.testStandard;

import java.util.List;
import java.util.Map;

public interface ITestStandardService {

	
	/**
	 * @description 通过检测项目id获得检测标准
	 * @author LG.hujiajun
	 * @created 2017年7月4日 上午9:44:40
	 * @param testProjectID
	 * @return
	 */
	public List<Map<String, Object>> getTSdByTPID(String testProjectID);
	
}
