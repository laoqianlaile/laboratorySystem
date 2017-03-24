package com.cqut.xiji.controller.equipmentScrap;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.equipmentScrap.IEquipmentScrapService;

@Controller
@RequestMapping("/equipmentScrapController")
public class EquipmentScrapController{
	
	@Resource(name="equipmentScrapService")
	IEquipmentScrapService service;
	
	@RequestMapping("/getEquipmentScrapWithPaging")  
    @ResponseBody
	public JSONObject getEquipmentScrapWithPaging(int limit, int offset, String sort, String order, String equipmentName, String model, String employeeName,String departmentID){
		Map<String, Object> result = service.getEquipmentScrapWithPaging(limit,offset,sort,order,equipmentName,model,employeeName,departmentID);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addEquipmentScrap")  
    @ResponseBody
	public int addEquipmentScrap(String equipmentID, String employeeID, String buyTime, String checkinTime, int useTime, String remarks){
		int results = service.addEquipmentScrap(equipmentID,employeeID,buyTime,checkinTime,useTime,remarks);
		return results;
	}
	
	@RequestMapping("/delEquipmentScrap")  
    @ResponseBody
	public int delEquipmentScrap(String equipmentScrapIds){
		int result = service.delEquipmentScrap(equipmentScrapIds);
		return result;
	}
	
	@RequestMapping("/updEquipmentScrap")  
    @ResponseBody
	public int updEquipmentScrap(String ID, String equipmentID, String employeeID, String buyTime, String checkinTime, int useTime, String remarks){
		int results = service.updEquipmentScrap(ID,equipmentID,employeeID,buyTime,checkinTime,useTime,remarks);
		return results;
	}
}
