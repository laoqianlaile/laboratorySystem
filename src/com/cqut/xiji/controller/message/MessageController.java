package com.cqut.xiji.controller.message;

import javax.annotation.Resource;

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
}
