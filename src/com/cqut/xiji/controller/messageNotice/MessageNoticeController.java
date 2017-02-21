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
	
	/**
	 * 
	 * @discription 添加报告审核状态消息通知
	 * @author zt
	 * @created 2017-2-20 下午5:43:57
	 * @param messageID
	 * @param testreportID
	 * @return
	 */
	@RequestMapping("addReportAuditMessageNotice")
	@ResponseBody
	public boolean addReportAuditMessageNotice(String messageID,String testreportID) {
		boolean result = service.addReportAuditMessageNotice(messageID,testreportID);
		return result;
	}
	
	/**
	 * 
     * @discription 添加报告审核人，提交审核后，为审核人推送消息
     * @author zt       
     * @created 2017-2-21 下午7:11:54     
     * @param messageID
     * @param employeeID
     * @return
	 */
	@RequestMapping("addReportAuditPersonMessageNotice")
	@ResponseBody
	public boolean addReportAuditPersonMessageNotice(String messageID,String employeeID) {
		boolean result = service.addReportAuditPersonMessageNotice(messageID,employeeID);
		return result;
	}
	
	
	/**
	 * 
     * @discription 二审通过过后，为所有角色为签发人的员工推送三审消息通知
     * @author zt       
     * @created 2017-2-21 下午7:17:01     
     * @param messageID
     * @return
	 */
	@RequestMapping("addReportThridAuditPersonMessageNotice")
	@ResponseBody
	public boolean addReportThridAuditPersonMessageNotice(String messageID) {
		boolean result = service.addReportThridAuditPersonMessageNotice(messageID);
		return result;
	}
}