package com.cqut.xiji.controller.equipmentVerify;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.equipmentVerify.IEquipmentVerifyService;

@Controller
@RequestMapping("/equipmentVerifyController")
public class EquipmentVerifyController{
	
	@Resource(name="equipmentVerifyService")
	IEquipmentVerifyService service;
	
	@RequestMapping("/getEquipmentVerifyWithPaging")  
    @ResponseBody
	public JSONObject getEquipmentVerifyWithPaging(int limit, int offset, String sort, String order, String equipmentName, String departmentName,String employeeName){
		Map<String, Object> result = service.getEquipmentVerifyWithPaging(limit,offset,sort,order,equipmentName,departmentName,employeeName);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addEquipmentVerify")  
    @ResponseBody
	public int addEquipmentVerify(String equipmentID, String testProjectID, int accuracy, String departmentID, int result,  String verifyID, String remarks){
		int results = service.addEquipmentVerify(equipmentID, testProjectID, accuracy, departmentID, result, verifyID, remarks);
		return results;
	}
	
	@RequestMapping("/delEquipmentVerify")  
    @ResponseBody
	public int delEquipmentVerify(String equipmentVerifyids){
		int result = service.delEquipmentVerify(equipmentVerifyids);
		return result;
	}
	
	@RequestMapping("/updEquipmentVerify")  
    @ResponseBody
	public int updEquipmentVerify(String ID, String equipmentID, String testProjectID, int accuracy, String departmentID, int result,  String verifyID, String remarks){
		int results = service.updEquipmentVerify(ID, equipmentID, testProjectID, accuracy, departmentID, result, verifyID, remarks);
		return results;
	}
}
