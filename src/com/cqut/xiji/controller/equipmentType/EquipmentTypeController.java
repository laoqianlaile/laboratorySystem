package com.cqut.xiji.controller.equipmentType;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.equipmentType.IEquipmentTypeService;

@Controller
@RequestMapping("/equipmentTypeController")
public class EquipmentTypeController{
	
	@Resource(name="equipmentTypeService")
	IEquipmentTypeService service;
	
	@RequestMapping("/getEquipmentTypeWithPaging")  
    @ResponseBody
	public JSONObject getEquipmentTypeWithPaging(int limit, int offset, String sort, String order, String equipmentTypeCode, String equipmentTypeName){
		Map<String, Object> result = service.getEquipmentTypeWithPaging(limit,offset,sort,order,equipmentTypeCode,equipmentTypeName);
		return JSONObject.fromObject(result);
	}
	
	/**
	 *@description 得到设备型号名称及ID
	 * @author hujiajun
	 * @created 2016-10-17 下午9:47:29
	 * @return
	 */
	@RequestMapping("/getEquipmentTypeName")  
    @ResponseBody
	public String getEquipmentTypeName(){
		List<Map<String, Object>> result = service.getEquipmentTypeName();
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 新增设备类型
	 * @author hujiajun
	 * @created 2016-10-17 下午9:31:59
	 * @param equipmentTypeCode
	 * @param equipmentTypeName
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/addEquipmentType")  
    @ResponseBody
	public int addEquipmentType(String equipmentTypeCode, String equipmentTypeName, String remarks){
		int result = service.addEquipmentType(equipmentTypeCode, equipmentTypeName, remarks);
		return result;
	}
	
	/**
	 * @description 删除仪器类型信息
	 * @author hujiajun
	 * @created 2016-11-17 下午9:31:59
	 * @param equipmentTypeIds
	 * @return
	 */
	@RequestMapping("/delEquipmentType")  
    @ResponseBody
	public int delEquipmentType(String equipmentTypeIds){
		int result = service.delEquipmentType(equipmentTypeIds);
		return result;
	}
	
	@RequestMapping("/isCodeExist")  
    @ResponseBody
	public int isCodeExist(String equipmentTypeCode){
		int result = service.isCodeExist(equipmentTypeCode);
		System.out.println("isCodeExist;"+result);
		return result;
	}
	
	@RequestMapping("/isTypeExist")  
    @ResponseBody
	public int isTypeExist(String equipmentTypeName){
		int result = service.isTypeExist(equipmentTypeName);
		System.out.println("isTypeExist;"+result);
		return result;
	}
	
	/**
	 * @description 通过code得到id
	 * @author hujiajun
	 * @created 2016-10-17 下午9:31:59
	 * @param equipmentTypeCode
	 * @return
	 */
	@RequestMapping("/getIdByCode")  
    @ResponseBody
	public String getIdByCode(String equipmentTypeCode){
		List<Map<String, Object>> result = service.getIdByCode(equipmentTypeCode);
		return JSONArray.fromObject(result).toString();
	}
	
	/**
	 * @description 修改仪器类型信息
	 * @author hujiajun
	 * @created 2016-10-17 下午9:31:59
	 * @param ID
	 * @param equipmentTypeCode
	 * @param equipmentTypeName
	 * @param remarks
	 * @return
	 */
	@RequestMapping("/updEquipmentType")  
    @ResponseBody
	public int updEquipmentType(String ID, String equipmentTypeCode, String equipmentTypeName, String remarks){
		int result = service.updEquipmentType(ID, equipmentTypeCode, equipmentTypeName, remarks);
		return result;
	}
}
