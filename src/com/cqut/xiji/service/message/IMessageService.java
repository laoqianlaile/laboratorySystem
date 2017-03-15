package com.cqut.xiji.service.message;

import java.util.List;
import java.util.Map;

import com.cqut.xiji.entity.message.Message;

public interface IMessageService {

	Map<String, Object> getMessageByUserID(String attribute, int limit,
			int offset, String sort, String order, boolean isRead); // 获取登录人的消息通知

	void readedMessageByID(String messageNoticeID); // 确认查看信息

	String addMessage(String content, String remarks); // 新增消息推送

	public String addReportSecondAuditPassMessage(String fileName);

	public String addReportThirdAuditPassMessage(String fileName);

	public String addReportSecondAuditRejectMessage(String fileName);

	public String addReportThirdAuditRejectMessage(String fileName);

	public String addReportAudiPersontMessage(String fileName);

	public String addWaitThirdAuditReportMessage(String fileName);
}
