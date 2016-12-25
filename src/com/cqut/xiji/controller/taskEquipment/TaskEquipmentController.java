package com.cqut.xiji.controller.taskEquipment;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.taskEquipment.ITaskEquipmentService;

@Controller
@RequestMapping("/taskEquipmentController")
public class TaskEquipmentController {

	@Resource(name = "taskEquipmentService")
	ITaskEquipmentService service;

	/**
	 * 
     * @discription 任务所使用的设备登记
     * @author zt       
     * @created 2016-12-21 下午9:19:48     
     * @param equipmentIDs
     * @param taskID
     * @return
	 */
	@RequestMapping("/saveTaskEquipment")
	@ResponseBody
	public boolean saveTaskEquipment(String[] equipmentIDs,String taskID) {
		boolean result = service.saveTaskEquipment(equipmentIDs,taskID);
		return result;
	}
}
