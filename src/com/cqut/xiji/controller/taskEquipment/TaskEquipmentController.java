package com.cqut.xiji.controller.taskEquipment;

import java.util.List;
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
	public String saveTaskEquipment(String[] equipmentIDs,String taskID) {
		String result = service.saveTaskEquipment(equipmentIDs,taskID);
		return result;
	}
	
	/**
	 * 
     * @discription 获取任务已登记的设备
     * @author zt       
     * @created 2017-5-2 下午8:33:32     
     * @param taskID
     * @return
	 */
	@RequestMapping("/getTaskEquipmentID")
	@ResponseBody
	public List<Map<String, Object>> getTaskEquipmentID(String taskID) {
		List<Map<String, Object>> result = service.getTaskEquipmentID(taskID);
		System.out.println("result :" + result);
		return result;
	}
}
