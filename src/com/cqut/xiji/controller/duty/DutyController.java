package com.cqut.xiji.controller.duty;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.duty.IDutyService;

@Controller
@RequestMapping("/dutyController")
public class DutyController{
	
	@Resource(name="dutyService")
	IDutyService service;
	
	@RequestMapping("/getDutyWithPage")  
    @ResponseBody
    public JSONObject getDutyWithPage(String dutyCode,String dutyName,
			 int limit, int offset,String order, String sort){
		Map<String, Object> result = service.getDutyWithPage(dutyCode,dutyName,limit,offset,order,sort);
		return JSONObject.fromObject(result);
		
	}
	@RequestMapping("/addDuty")  
    @ResponseBody
	public String addDuty(String dutyCode,String dutyName,String introduction){
		String result = service.addDuty(dutyCode,dutyName,introduction);
		return result;
		
	}
	@RequestMapping("/delDuty")
	@ResponseBody
	public String delDuty(String IDs){
		String result = service.delDuty(IDs);
		return result;
	}
	@RequestMapping("/updDuty")
	@ResponseBody
	public String updDuty(String ID,String dutyCode,String dutyName,String introduction){
		String result=service.updDuty(ID, dutyCode, dutyName, introduction);
		return result;
		
	}
}
