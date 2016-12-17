package com.cqut.xiji.controller.equipmentUse;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.equipmentUse.IEquipmentUseService;

@Controller
@RequestMapping("/equipmentUseController")
public class EquipmentUseController{
	
	@Resource(name="equipmentUseService")
	IEquipmentUseService service;
	
	/**
	 * 
	 * @description 初始化设备使用记录
	 * @author hujiajun
	 * @created 2016-12-15 下午8:55:20
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param equipmentName
	 * @param testProject
	 * @param sampleName
	 * @param applicat
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	@RequestMapping("/getEquipmentUseWithPaging")  
    @ResponseBody
	public JSONObject getEquipmentUseWithPaging(int limit, int offset, String sort, String order, String equipmentName, String testProject, String sampleName, String applicat, String startTime, String endTime){
		Map<String, Object> result = service.getEquipmentUseWithPaging(limit,offset,sort,order,equipmentName,testProject,sampleName,applicat,startTime,endTime);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 删除设备使用记录
	 * @author hujiajun
	 * @created 2016年12月10日15:00:09
	 * @param equipmentUseId
	 * @return
	 */
	@RequestMapping("/delEquipmentUse")  
    @ResponseBody
	public int delEquipmentUse(String equipmentUseId){
		int result = service.delEquipmentUse(equipmentUseId);
		return result;
	}
}
