package com.cqut.xiji.service.testStandard;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.entity.testStandard.TestStandard;
import com.cqut.xiji.service.base.SearchService;

@Service
public class TestStandardService extends SearchService implements ITestStandardService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "testStandard";
	}

	@Override
	public String getBasePrimaryKey() {
		return "testStandard.ID";
	}
	
	/**
	 * @description 通过检测项目id获得检测标准
	 * @author LG.hujiajun
	 * @created 2017年7月4日 上午9:46:13
	 * @param testProjectID
	 * @return
	 * @see com.cqut.xiji.service.testStandard.ITestStandardService#getTSdByTPID(java.lang.String)
	 */
	@Override
	public List<Map<String, Object>> getTSdByTPID(String testProjectID){
		String baseEntity = "testStandard";
		String[] properties = new String[] {"standard.ID","standard.standardCode","standard.standardName"};
		String joinEntity = " LEFT JOIN standard ON testStandard.standardID = standard.ID ";
		String condition = " testStandard.testProjectID = '" + testProjectID + "'";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,baseEntity,joinEntity,null,condition);
		return result;
	}
	
}
