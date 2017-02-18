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
	
	/**
	 * 
	 * @author zkl
	 * @data 2017年2月13日 下午4:54:19
	 * @param MessageID  
	 * @param recipient	接收人（信息接收的角色名 例 ：标准审核人）
	 * @return
	 */
	@RequestMapping("addMessageNotice")
	@ResponseBody
	public String addMessageNotice(String MessageID,String recipient){
		String result = service.addMessageNotice(MessageID,recipient);
		return result ;
	}
}
