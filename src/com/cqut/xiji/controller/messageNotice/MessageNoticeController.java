package com.cqut.xiji.controller.messageNotice;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cqut.xiji.service.messageNotice.IMessageNoticeService;

@Controller
@RequestMapping("/messageNoticeController")
public class MessageNoticeController{
	
	@Resource(name="messageNoticeService")
	IMessageNoticeService service;
}
