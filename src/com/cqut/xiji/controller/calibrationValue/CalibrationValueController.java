package com.cqut.xiji.controller.calibrationValue;

import javax.annotation.Resource;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.entity.calibrationValue.CalibrationValue;
import com.cqut.xiji.service.calibrationValue.ICalibrationValueService;

@Controller
@RequestMapping("/calibrationValueController")
public class CalibrationValueController {

	@Resource(name = "calibrationValueService")
	ICalibrationValueService service;

	/**
	 * 
	 * 方法简述：新增(修改)校准量值
	 * 
	 * @param calibrationValue
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月16日 下午6:43:33
	 * 
	 */
	@RequestMapping("/saveCalibrationValue")
	@ResponseBody
	public String saveCalibrationValue(CalibrationValue calibrationValue) {
		return service.saveCalibrationValue(calibrationValue);
	}

	/**
	 * 
	 * 方法简述：删除多条校准量值
	 * 
	 * @param IDs
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月16日 下午6:43:37
	 * 
	 */
	@RequestMapping("/deleteCalibrationValueByIDs")
	@ResponseBody
	public String deleteCalibrationValueByIDs(String[] IDs) {
		return service.deleteCalibrationValueByIDs(IDs);
	}

	/**
	 * 
	 * 方法简述：删除校准量值
	 * 
	 * @param ID
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月16日 下午6:43:41
	 * 
	 */
	@RequestMapping("/deleteCalibrationValueByID")
	@ResponseBody
	public String deleteCalibrationValueByID(String ID) {
		return service.deleteCalibrationValueByID(ID);
	}

	/**
	 * 
	 * 方法简述：获取校准量值
	 * 
	 * @param tracebilityID
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月16日 下午6:43:46
	 * 
	 */
	@RequestMapping("/getCalibrationValuesByCondition")
	@ResponseBody
	public JSONArray getCalibrationValuesByCondition(String tracebilityID) {
		if (tracebilityID != null && !tracebilityID.trim().equals("")) {
			return service.getCalibrationValuesByCondition("traceabilityID = '"
					+ tracebilityID + "'");
		}
		return null;
	}

	@RequestMapping("/deleteCalibrationValueByCondition")
	@ResponseBody
	public int deleteCalibrationValueByCondition(String traceabilityID) {
		return service.deleteCalibrationValueByCondition(traceabilityID);
	}
}
