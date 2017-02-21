package com.cqut.xiji.service.messageNotice;

import com.cqut.xiji.entity.messageNotice.MessageNotice;

public interface IMessageNoticeService {

	String addMessageNotice(String messageID, String recipient); // 新增消息

	public boolean addReportAuditMessageNotice(String messageID,
			String testreportID);

	public boolean addReportAuditPersonMessageNotice(String messageID,
			String employeeID);

	public boolean addReportThridAuditPersonMessageNotice(String messageID);
}
