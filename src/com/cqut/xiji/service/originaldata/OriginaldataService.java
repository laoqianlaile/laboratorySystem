package com.cqut.xiji.service.originaldata;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.service.base.SearchService;

@Service
public class OriginaldataService extends SearchService implements IOriginaldataService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "originaldata";
	}

	@Override
	public String getBasePrimaryKey() {
		return "originaldata.ID";
	}
	
}
