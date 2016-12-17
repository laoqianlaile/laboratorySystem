package com.cqut.xiji.controller.standardType;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.standardType.IStandardTypeService;

@Controller
@RequestMapping("/standardTypeController")
public class StandardTypeController{
	
	@Resource(name="standardTypeService")
	IStandardTypeService service;
	
	/**
	 * 分页处理
	 * @author zkl
	 * @param STANDARDTYPECODE  标准类型编码
	 * @param STANDARDTYPENAME  标准类型名称
	 * @param limit	 每页数量
	 * @param offset 起始下标
	 * @param order	 排序方式
	 * @param sort	 排序字段
	 * @return 返回标准类型信息的  JSON 字符串
	 */
	@RequestMapping("/getStandardTypeWithPaging")  
    @ResponseBody
	public JSONObject getStandardTypeWithPaging(String STANDARDTYPECODE,String STANDARDTYPENAME,int limit, int offset, String order, String sort){
		Map<String, Object> result = service.getStandardTypeWithPaging(STANDARDTYPECODE, STANDARDTYPENAME, limit, offset, order, sort);
		return JSONObject.fromObject(result);
	}
	
	@RequestMapping("/addStandardType")
	@ResponseBody
	public String addStandardType(String StandardTypeCode,String StandardTypeName){
		String result = service.addStandard(StandardTypeCode, StandardTypeName);
		return result;
	}
	
	@RequestMapping("/upStandardType")
	@ResponseBody
	public String upStandardType(String StandardTypeID ,String StandardTypeCode,String StandardTypeName){
		String result = service.upStandardType(StandardTypeID,StandardTypeCode, StandardTypeName);
		return result;
	}
	
	@RequestMapping("/delStandardType")
	@ResponseBody
	public String delStandardType(String StandardTypeIDs){
		String result = service.delStandardType(StandardTypeIDs);

		return result;
	}
	
}
