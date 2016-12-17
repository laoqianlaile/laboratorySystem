package com.cqut.xiji.service.calibrationValue;

import net.sf.json.JSONArray;

import com.cqut.xiji.entity.calibrationValue.CalibrationValue;

public interface ICalibrationValueService {

	public String saveCalibrationValue(CalibrationValue calibrationValue);

	public String deleteCalibrationValueByIDs(String[] IDs);

	public String deleteCalibrationValueByID(String ID);

	public int deleteCalibrationValueByCondition(String condition);

	public JSONArray getCalibrationValuesByCondition(String condition);

}
