package com.cqut.xiji.controller.message;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.message.IMessageService;

@Controller
@RequestMapping("/messageController")
public class MessageController{
	
	@Resource(name="messageService")
	IMessageService service;
	
	/**
	 * 样品管理员获取自己的信息
	 * @author wzj
	 * @date 2016年12月28日 下午3:13:23
	 * @param contractID
	 * @return
	 */
	@RequestMapping("/getMessageByUserID")
	@ResponseBody
	public JSONObject getMessageByUserID(HttpServletRequest request,int limit,int offset,String sort,String order ){
		
		 Map<String, Object>  result = service.getMessageByUserID((String)request.getSession().getAttribute("EMPLOYEEID"), limit,  offset,  sort,  order);
		return JSONObject.fromObject(result);
	}
}
