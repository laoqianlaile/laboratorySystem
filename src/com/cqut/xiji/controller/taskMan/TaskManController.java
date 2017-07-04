package com.cqut.xiji.controller.taskMan;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.taskMan.ITaskManService;

@Controller
@RequestMapping("/taskManController")
public class TaskManController{
	
	@Resource(name="taskManService")
	ITaskManService service;
	
	/**
	 * 
	 * @description 任务分配下分配工时时获取检测人员列表
	 * @author chenyubo
	 * @created 2017年07月01日09:33:40
	 * @param ID task任务ID
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @return
	 */
	@RequestMapping("/getTaskManWithPaging")  
    @ResponseBody
	public JSONObject getTaskManWithPaging(String ID, int limit, int offset, String sort, String order){
		Map<String, Object> result = service.getTaskManWithPaging(ID,limit,offset,sort,order);
		return JSONObject.fromObject(result);
	}
	
	/**
	 * 
	 * @description 分配工时时修改具体检测人员的工时
	 * @author chenyubo
	 * @created 2017年07月01日14:16:51
	 * @param ID
	 * @param detector 
	 * @param laborhour
	 * @return
	 */
	@RequestMapping("/assignLaborHour")  
    @ResponseBody
	public String assignLaborHour(String ID, String detector, Double laborHour) {
		return service.assignLaborHour(ID, detector, laborHour) +"";
	}
	
	
}
