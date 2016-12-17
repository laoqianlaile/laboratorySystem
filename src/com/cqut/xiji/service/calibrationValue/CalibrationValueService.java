package com.cqut.xiji.service.calibrationValue;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.calibrationValue.CalibrationValue;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class CalibrationValueService extends SearchService implements
		ICalibrationValueService {

	@Resource(name = "entityDao")
	EntityDao entityDao;

	@Resource(name = "searchDao")
	SearchDao searchDao;

	@Resource(name = "baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "calibrationValue";
	}

	@Override
	public String getBasePrimaryKey() {
		return "calibrationValue.ID";
	}

	@Override
	public String saveCalibrationValue(CalibrationValue calibrationValue) {
		if(calibrationValue.getID() == null || calibrationValue.getID().trim().toString().equals("")){
			calibrationValue.setID(EntityIDFactory.createId());
		}
		return entityDao.save(calibrationValue) == 1 ? "true" : "false";
	}

	@Override
	public String deleteCalibrationValueByIDs(String[] IDs) {
		// TODO Auto-generated method stub
		return entityDao.deleteEntities(IDs, CalibrationValue.class) == 1 ? "true"
				: "false";
	}

	@Override
	public String deleteCalibrationValueByID(String ID) {
		// TODO Auto-generated method stub
		return entityDao.deleteByID(ID, CalibrationValue.class) == 1 ? "true"
				: "false";
	}

	@Override
	public JSONArray getCalibrationValuesByCondition(String condition) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> ens = baseEntityDao.getByCondition(condition,
				"calibrationValue");
		return JSONArray.fromObject(ens);
	}

	@Override
	public int deleteCalibrationValueByCondition(String traceabilityID) {
		String condition = "traceabilityID='" + traceabilityID + "'";
		return baseEntityDao.deleteByCondition(condition, "calibrationValue");
	}

}
