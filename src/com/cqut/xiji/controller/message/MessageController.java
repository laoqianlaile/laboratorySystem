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
	 * 登录人员获取自己的信息
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
	/**
	 * 确认查看信息
	 * @author wzj
	 * @date 2017年1月16日 上午11:15:55
	 * @param messageNoticeID
	 */
	@RequestMapping("/readedMessageByID")
	@ResponseBody
	public void readedMessageByID(String messageNoticeID ){
	
		 service.readedMessageByID(messageNoticeID);
	}
	/**
	 * 新增消息推送
	 * @author zkl
	 * @data 2017年2月13日 下午4:45:29
	 * @param content 信息内容
	 * @param remarks 备注
	 */
	@RequestMapping("/addMessage")
	@ResponseBody
	public String addMessage(String content,String remarks){
		String result = service.addMessage(content,remarks);
		return result;
	}
}
