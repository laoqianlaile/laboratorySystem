package com.cqut.xiji.controller.equipmentRepair;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.equipmentRepair.IEquipmentRepairService;

@Controller
@RequestMapping("/equipmentRepairController")
public class EquipmentRepairController{
	
	@Resource(name="equipmentRepairService")
	IEquipmentRepairService service;
	
	@RequestMapping("/getEquipmentRepairWithPaging")  
    @ResponseBody
	public JSONObject getEquipmentRepairWithPaging(int limit, int offset, String sort, String order, String factoryCode, String equipmentName, String model, String employeeName){
		Map<String, Object> result = service.getEquipmentRepairWithPaging(limit,offset,sort,order,factoryCode,equipmentName,model,employeeName);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addEquipmentRepair")  
    @ResponseBody
	public int addEquipmentRepair(String equipmentID,String equipmentName, String repairTime, String employeeID,String employeeName, String beforeStatus, String afterStatus, String mounting, int money, String remarks){
		int results = service.addEquipmentRepair(equipmentID,equipmentName,repairTime,employeeID,employeeName,beforeStatus,afterStatus,mounting,money,remarks);
		return results;
	}
	
	@RequestMapping("/delEquipmentRepair")  
    @ResponseBody
	public int delEquipmentRepair(String equipmentRepairIds){
		int result = service.delEquipmentRepair(equipmentRepairIds);
		return result;
	}
	
	@RequestMapping("/updEquipmentRepair")  
    @ResponseBody
	public int updEquipmentRepair(String ID, String equipmentID,String equipmentName, String repairTime, String employeeID,String employeeName, String beforeStatus, String afterStatus, String mounting, int money, String remarks){
		int results = service.updEquipmentRepair(ID,equipmentID,equipmentName,repairTime,employeeID,employeeName,beforeStatus,afterStatus,mounting,money,remarks);
		return results;
	}
}
