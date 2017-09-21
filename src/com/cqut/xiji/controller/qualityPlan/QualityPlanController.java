package com.cqut.xiji.controller.qualityPlan;

import java.net.URLDecoder;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.qualityPlan.IQualityPlanService;

@Controller
@RequestMapping("/qualityPlanController")
public class QualityPlanController{
	
	@Resource(name="qualityPlanService")
	IQualityPlanService service;
	
	/**
	 * @description 初始化表格
	 * @author fujianfei
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param type
	 * @param year
	 * @param code
	 * @param employeeName2
	 * @return
	 */
	@RequestMapping("/getQualityPlanWithPaging")
	@ResponseBody
	public JSONObject getQualityPlanWithPaging(int limit, int offset,String order, String sort, String type,String year,String code,String employeeName2,HttpSession session){
		String EMPLOYEEID = (String)session.getAttribute("EMPLOYEEID");
		Map<String, Object> result = service.getQualityPlanWithPaging(limit, offset, order, sort, type, year, code, employeeName2, EMPLOYEEID);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * @description 修改计划
	 * @author fujianfei
	 * @param id
	 * @param type
	 * @param code
	 * @param year
	 * @param employeeName
	 * @param employeeName2
	 * @param judg
	 * @param judg2
	 * @return
	 */
	@RequestMapping("/updataQualityPlanById")
	@ResponseBody
	public int updataQualityPlanById(String id,String type,String code,String year,String employeeName,String employeeName2,int judg,int judg2){
		try
		{
			type = new String(type.getBytes("iso-8859-1"),"UTF-8");
		}catch(Exception e){
			return 0;
		}
		return service.updataQualityPlanById(id, type, code, year,employeeName,employeeName2,judg,judg2);
	}
	
	/**
	 * @description 删除计划
	 * @author fujianfei
	 * @param idstr
	 * @return
	 */
	@RequestMapping("/deleteQualityPlanById")
	@ResponseBody
	public String deleteQualityPlanById(String idstr){
		return service.deleteQualityPlanById(idstr);
	}
	
	/**
	 * @description 新增计划
	 * @author fujianfei
	 * @param type
	 * @param code
	 * @param year
	 * @param employeeName
	 * @param employeeName2
	 * @return
	 */
	@RequestMapping("/addQualityPlan")
	@ResponseBody
	public String addQualityPlan(String type,String code,String year,String employeeName, String employeeName2,HttpSession session){
		try
		{
			type = new String(type.getBytes("iso-8859-1"),"UTF-8");
		}catch(Exception e){
			return null;
		}
		return service.addQualityPlan(type, code, year, employeeName ,employeeName2,session);
	}
}
