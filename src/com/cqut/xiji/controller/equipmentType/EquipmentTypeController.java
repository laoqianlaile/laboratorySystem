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
	
	@RequestMapping("/getEquipmentWithPaging")  
    @ResponseBody
	public JSONObject getEquipmentWithPaging(int limit, int offset, String sort, String order, String equipmentTypeCode, String equipmentTypeName){
		Map<String, Object> result = service.getEquipmentWithPaging(limit,offset,sort,order,equipmentTypeCode,equipmentTypeName);
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
	 * @param equipmentTypeCodes
	 * @return
	 */
	@RequestMapping("/delEquipmentType")  
    @ResponseBody
	public int delEquipmentType(String equipmentTypeCodes){
		int result = service.delEquipmentType(equipmentTypeCodes);
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
