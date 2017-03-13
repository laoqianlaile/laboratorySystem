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
	public JSONObject getMessageByUserID(HttpServletRequest request,int limit,int offset,String sort,String order ,boolean isRead){
		
		 Map<String, Object>  result = service.getMessageByUserID((String)request.getSession().getAttribute("EMPLOYEEID"), limit,  offset,  sort,  order, isRead);
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
	 * 新增推送消息
	 * @author zkl
	 * @data 2017年2月15日 上午10:47:48
	 * @param content (接收人（例如：标准审核人）)
	 * @param remarks 备注
	 * @return
	 */
	@RequestMapping("/addMessage")
	@ResponseBody
	public String addMessage(String content,String remarks){
		String result = service.addMessage(content, remarks);
		return result;
	}
	
	
	/**
	 * 
     * @discription 新增报告二次审核通过信息
     * @author zt       
     * @created 2017-2-20 下午4:26:56     
     * @return
	 */
	@RequestMapping("/addReportSecondAuditPassMessage")
	@ResponseBody
	public String addReportSecondAuditPassMessage(String fileName) {
		String result = service.addReportSecondAuditPassMessage(fileName);
		return result;
	}
	
    /**
     * 
     * @discription 新增报告三次审核通过信息
     * @author zt       
     * @created 2017-2-20 下午4:54:12     
     * @return
     */
	@RequestMapping("/addReportThirdAuditPassMessage")
	@ResponseBody
	public String addReportThirdAuditPassMessage(String fileName){
		String result = service.addReportThirdAuditPassMessage(fileName);
		return result;
	}
	
	/**
	 * 
     * @discription 新增报告二次审核失败信息
     * @author zt       
     * @created 2017-2-20 下午7:55:06     
     * @return
	 */
	@RequestMapping("/addReportSecondAuditRejectMessage")
	@ResponseBody
	public String addReportSecondAuditRejectMessage(String fileName){
		String result = service.addReportSecondAuditRejectMessage(fileName);
		return result;
	}
	
	/**
	 * 
     * @discription 新增报告三次审核失败信息
     * @author zt       
     * @created 2017-2-20 下午7:58:12     
     * @return
	 */
	@RequestMapping("/addReportThirdAuditRejectMessage")
	@ResponseBody
	public String addReportThirdAuditRejectMessage(String fileName){
		String result = service.addReportThirdAuditRejectMessage(fileName);
		return result;
	}
	
	/**
	 * 
     * @discription 新增指定报告审核人信息
     * @author zt       
     * @created 2017-2-21 下午4:37:49     
     * @param fileName
     * @return
	 */
	@RequestMapping("/addReportAudiPersontMessage")
	@ResponseBody
	public String addReportAudiPersontMessage(String fileName){
		String result = service.addReportAudiPersontMessage(fileName);
		return result;
	}
	
	/**
	 * 
     * @discription 添加报告待三审的消息
     * @author zt       
     * @created 2017-2-21 下午7:05:48     
     * @param fileName
     * @return
	 */
	@RequestMapping("/addWaitThirdAuditReportMessage")
	@ResponseBody
	public String addWaitThirdAuditReportMessage(String fileName){
		String result = service.addWaitThirdAuditReportMessage(fileName);
		return result;
	}
	
}
