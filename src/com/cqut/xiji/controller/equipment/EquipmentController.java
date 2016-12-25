package com.cqut.xiji.controller.equipment;


import java.util.List;
import java.util.Map;


import java.util.HashMap;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.equipment.IEquipmentService;

@Controller
@RequestMapping("/equipmentController")
public class EquipmentController {

	@Resource(name = "equipmentService")
	IEquipmentService service;

	
	@RequestMapping("/getEquipmentWithPaging")  
    @ResponseBody
	public JSONObject getEquipmentWithPaging(int limit, int offset, String sort, String order, String equipmentName, String equipmentType, String departmentName, String buyTime){
		Map<String, Object> result = service.getEquipmentWithPaging(limit,offset,sort,order,equipmentName,equipmentType,departmentName,buyTime);
		return JSONObject.fromObject(result);
	}
	//equipmentCode equipmentName number equipmentType department buyTime useYear employeeName remarks
	
	/**
	 * 
	 * @param equipmentCode
	 * @param equipmentName
	 * @param number
	 * @param equipmentType
	 * @param department
	 * @param buyTime
	 * @param useYear
	 * @param employeeName
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/addEquipment")  
    @ResponseBody
	public int addEquipment(String equipmentCode, String equipmentName, String equipmentType, String model, String department, String buyTime, int useYear, String factoryCode, String credentials, String effectiveTime,  String employeeID, String remarks){
		int result = service.addEquipment(equipmentCode, equipmentName, equipmentType, model, department, buyTime, useYear, factoryCode, credentials, effectiveTime, employeeID, remarks);
		return result;
	}
	
	/**
	 * @description 删除设备
	 * @author hujiajun
	 * @created 2016-10-17 下午9:31:13
	 * @param contractCodes
	 * @return
	 */
	@RequestMapping("/delEquipment")  
    @ResponseBody
	public int delEquipment(String equipmentCodes){
		int result = service.delEquipment(equipmentCodes);
		return result;
	}
	
	/**
	 * @description 通过仪器编码得到ID
	 * @author hujiajun
	 * @created 2016-10-17 下午9:31:59
	 * @param equipmentCode
	 * @return
	 */
	@RequestMapping("/getIdByCode")  
    @ResponseBody
	public String getIdByCode(String equipmentCode){
		List<Map<String, Object>> result = service.getIdByCode(equipmentCode);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 通过设备名称得到设备信息
	 * @author hujiajun
	 * @created 2016年12月12日19:13:01
	 * @param equipmentName
	 * @return
	 */
	@RequestMapping("/getEquipmentByName")  
    @ResponseBody
	public String getEquipmentByName(String equipmentName){
		List<Map<String, Object>> result = service.getEquipmentByName(equipmentName);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 通过设备ID得到设备信息
	 * @author hujiajun
	 * @created 2016年12月14日19:13:01
	 * @param ID
	 * @return
	 */
	@RequestMapping("/getEquipmentById")  
    @ResponseBody
	public String getEquipmentById(String ID){
		List<Map<String, Object>> result = service.getEquipmentById(ID);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 修改仪器信息
	 * @author hujiajun
	 * @created 2016-10-17 下午9:31:59
	 * @param ID
	 * @param equipmentCode
	 * @param equipmentName
	 * @param number
	 * @param equipmentType
	 * @param department
	 * @param buyTime
	 * @param useYear
	 * @param employeeName
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/updEquipment")  
    @ResponseBody
	public String updEquipment(String ID, String equipmentCode, String equipmentName, String equipmentType, String model, String department, String buyTime, int useYear, String factoryCode, String credentials, String effectiveTime,  String employeeID, String remarks){
		String result = service.updEquipment(ID, equipmentCode, equipmentName, equipmentType, model, department, buyTime, useYear, factoryCode, credentials, effectiveTime, employeeID, remarks);
		return result;
	}


	/**
	 * 
	 * 方法简述：获取仪器设备信息
	 * 
	 * @return
	 * @author 蒋兴成
	 * @date 2016年11月15日 下午10:37:17
	 * 
	 */
	@RequestMapping("/getEquipments")
	@ResponseBody
	public JSONObject getEquipments() {
		List<Map<String, Object>> ens = service.getEquipments();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("equipements", ens);
		return JSONObject.fromObject(map);
	}

	/**
	 * 方法简述：根据设备ID获取仪器设备信息
	 * 
	 * @param equipmentID
	 * @return
	 */
	@RequestMapping("/getEquipmentsByID")
	@ResponseBody
	public JSONObject getEquipmentsByID(String equipmentID) {
		List<Map<String, Object>> ens = service.getEquipmentsByID(equipmentID);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("equipements", ens);
		return JSONObject.fromObject(map);
	}
	
	/**
	 * 
     * @discription 获取设备的名称、出厂编号信息
     * @author zt       
     * @created 2016-12-21 下午5:19:26     
     * @return
	 */
	@RequestMapping("/getEquipmentInfo")
	@ResponseBody
	public List<Map<String,Object>> getEquipmentInfo() {
		List<Map<String, Object>> result = service.getEquipmentInfo();
		return result;
	}
	
}
