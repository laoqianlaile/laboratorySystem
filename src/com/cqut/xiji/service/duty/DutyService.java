package com.cqut.xiji.service.duty;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.duty.Duty;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class DutyService extends SearchService implements IDutyService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "duty";
	}

	@Override
	public String getBasePrimaryKey() {
		return "duty.ID";
	}
	
	@Override
	public Map<String, Object> getDutyWithPage(String dutyCode,String dutyName,
			 int limit, int offset,String order, String sort){
		int index = limit;
		int pageNum = offset / limit;
		String tableName = "duty";
		String[] properties = new String[] { 
				"duty.ID",
				"duty.dutyName",
				"duty.dutyCode",
				"duty.introduction",	
				"DATE_FORMAT(duty.createTime,'%Y-%m-%d ') as createTime ",
						
				
		};

		String condition = " 1 = 1  ";
		if(dutyCode != null && !dutyCode.equals("")){
			 condition+=" and duty.dutyCode like '%"+dutyCode+"%'  ";
		}
		if(dutyName != null && !dutyName.equals("")){
			 condition+=" and duty.dutyName like '%"+dutyName+"%'  ";
		}
		
		
		
		String joinEntity = null;
		
		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null,
				sort, order, index, pageNum);


		//int count = getForeignCount(null, condition, false);
		//int count = entityDao.getByCondition(condition, Department.class).size();
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
			
		
	}
	@Override
	public String addDuty(String dutyCode,String dutyName,String introduction){
		Duty duty=new Duty();
		duty.setID(EntityIDFactory.createId());
		duty.setDutyCode(dutyCode);
		duty.setDutyName(dutyName);
		duty.setIntroduction(introduction);
		duty.setCreateTime(new Date());
	
		
		int result = entityDao.save(duty);
		return result+"";
		
	}
	@Override
	public String updDuty(String ID,String dutyCode,String dutyName,String introduction){
		Duty duty=entityDao.getByID(ID, Duty.class);
		duty.setDutyCode(dutyCode);
		duty.setDutyName(dutyName);
		duty.setIntroduction(introduction);
		int result = entityDao.updatePropByID(duty, ID);
		return result+"";
	}
	@Override
	public String delDuty(String IDs) {
		// TODO Auto-generated method stub
		if(IDs == null || IDs.isEmpty()){
			return 0+"";
		}
		String[] ids = IDs.split(",");
		int result = entityDao.deleteEntities(ids, Duty.class);
		return result+"";
	}
	
}
